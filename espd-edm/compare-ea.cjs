/**
 * Compares the EAtoJSON output (new conceptual model export) against the
 * reference implementation espd-edm model (structured part files).
 *
 * Usage:
 *   node compare-ea.cjs [options]
 *
 * Options:
 *   --json         Output as JSON (for tooling)
 *   --summary      Only show high-level summary (no field details)
 *   --part <N>     Only compare a specific part (I, II, III, IV, V)
 *   --deep         Deep-compare component trees recursively
 *
 * Sources:
 *   - EA output:  espd-tools/EAtoJSON/outputs/espd-edm.json
 *   - reference implementation:    espd-edm-reference-implementation/espd-edm/parts/*.json
 */

const fs = require('fs');
const path = require('path');

// --- CLI args ---
const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const summaryOnly = args.includes('--summary');
const deepMode = args.includes('--deep');
const partFilter = args.includes('--part') ? args[args.indexOf('--part') + 1] : null;

// --- Resolve paths ---
const workspaceRoot = path.resolve(__dirname, '..', '..');
const eaFile = path.resolve(workspaceRoot, 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const partsDir = path.join(__dirname, 'parts');

// --- Part mapping: EA uses "partI", reference implementation uses "I" ---
const EA_PART_MAP = {
  partI: 'I',
  partII: 'II',
  partIII: 'III',
  partIV: 'IV',
  partV: 'V',
  partVI: 'VI'
};

const PART_FILES = {
  I: 'part-I-procedure.json',
  II: 'part-II-operator.json',
  III: 'part-III-exclusion.json',
  IV: 'part-IV-selection.json',
  V: 'part-V-reduction.json',
  VI: 'part-VI-concluding.json'
};

// --- Load EA output ---
if (!fs.existsSync(eaFile)) {
  console.error(`ERROR: EA output not found at ${eaFile}`);
  process.exit(1);
}
const eaData = JSON.parse(fs.readFileSync(eaFile, 'utf8'));

// --- Flatten EA data: extract all criteria keyed by tag ---
function flattenEA(eaParts) {
  const result = new Map(); // tag -> { ...criterion, _eaPart, _eaSection }
  for (const partObj of eaParts) {
    const partLabel = EA_PART_MAP[partObj.part] || partObj.part;
    for (const section of partObj.sections || []) {
      for (const criterion of section.criteria || []) {
        result.set(criterion.tag, {
          ...criterion,
          _eaPart: partLabel,
          _eaSection: section.section
        });
      }
    }
  }
  return result;
}

// --- Load reference implementation parts and flatten ---
function loadSandboxParts(filter) {
  const result = new Map(); // tag -> { ...section, _sandboxPart }
  const partsToLoad = filter ? [filter] : Object.keys(PART_FILES);

  for (const partKey of partsToLoad) {
    const filename = PART_FILES[partKey];
    if (!filename) continue;
    const filePath = path.join(partsDir, filename);
    if (!fs.existsSync(filePath)) {
      continue; // Part file doesn't exist yet
    }
    const partData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const section of partData.sections || []) {
      result.set(section.tag, {
        ...section,
        _sandboxPart: partKey
      });
    }
  }
  return result;
}

// --- Deep compare component trees ---
function compareComponentTrees(eaComps, sandboxComps, parentPath, depth = 0) {
  const diffs = [];
  eaComps = eaComps || [];
  sandboxComps = sandboxComps || [];

  // Build maps by tag+type for matching (tags can repeat across different types)
  const eaByKey = new Map();
  for (const c of eaComps) {
    const key = `${c.tag}:${c.type}`;
    eaByKey.set(key, c);
  }
  const sandboxByKey = new Map();
  for (const c of sandboxComps) {
    const key = `${c.tag}:${c.type}`;
    sandboxByKey.set(key, c);
  }

  // Components only in EA
  for (const [key, comp] of eaByKey) {
    if (!sandboxByKey.has(key)) {
      diffs.push({
        path: `${parentPath}/${comp.tag}`,
        type: 'only-in-ea',
        tag: comp.tag,
        componentType: comp.type
      });
    }
  }

  // Components only in sandbox
  for (const [key, comp] of sandboxByKey) {
    if (!eaByKey.has(key)) {
      diffs.push({
        path: `${parentPath}/${comp.tag}`,
        type: 'only-in-sandbox',
        tag: comp.tag,
        componentType: comp.type
      });
    }
  }

  // Components in both — compare fields and recurse
  for (const [key, eaComp] of eaByKey) {
    if (!sandboxByKey.has(key)) continue;
    const sbComp = sandboxByKey.get(key);
    const compPath = `${parentPath}/${eaComp.tag}`;

    // Compare scalar fields
    const fieldDiffs = compareScalarFields(eaComp, sbComp);
    if (fieldDiffs.length > 0) {
      diffs.push({
        path: compPath,
        type: 'field-diff',
        tag: eaComp.tag,
        componentType: eaComp.type,
        fields: fieldDiffs
      });
    }

    // Recurse into nested components
    if (eaComp.components || sbComp.components) {
      const childDiffs = compareComponentTrees(
        eaComp.components, sbComp.components, compPath, depth + 1
      );
      diffs.push(...childDiffs);
    }
  }

  return diffs;
}

// --- Compare scalar fields between two objects ---
function compareScalarFields(ea, sandbox) {
  const diffs = [];
  const skipKeys = new Set(['components', '_eaPart', '_eaSection', '_sandboxPart',
    '$schema', 'part', 'partTitle', 'sectionTitle', 'uiType', 'lookup', 'mandatory']);
  // Fields that only exist in sandbox (expected additions) are noted but not flagged as errors
  const sandboxOnlyFields = new Set(['part', 'partTitle', 'sectionTitle', 'uiType',
    'lookup', 'mandatory', 'name']);

  const allKeys = new Set([...Object.keys(ea), ...Object.keys(sandbox)]);

  for (const key of allKeys) {
    if (skipKeys.has(key)) continue;
    if (key.startsWith('_')) continue;

    const eaVal = ea[key];
    const sbVal = sandbox[key];

    // Skip deep objects (components handled separately)
    if (typeof eaVal === 'object' && eaVal !== null && !Array.isArray(eaVal)) continue;
    if (typeof sbVal === 'object' && sbVal !== null && !Array.isArray(sbVal)) continue;

    if (eaVal === undefined && sbVal !== undefined) {
      if (!sandboxOnlyFields.has(key)) {
        diffs.push({ field: key, ea: '(missing)', sandbox: sbVal });
      }
    } else if (eaVal !== undefined && sbVal === undefined) {
      diffs.push({ field: key, ea: eaVal, sandbox: '(missing)' });
    } else if (JSON.stringify(eaVal) !== JSON.stringify(sbVal)) {
      diffs.push({ field: key, ea: eaVal, sandbox: sbVal });
    }
  }

  return diffs;
}

// --- Main comparison ---
const eaCriteria = flattenEA(eaData);
const sandboxCriteria = loadSandboxParts(partFilter);

const results = {
  summary: {
    eaFile: path.relative(workspaceRoot, eaFile),
    sandboxDir: path.relative(workspaceRoot, partsDir),
    eaCriteriaCount: eaCriteria.size,
    sandboxCriteriaCount: sandboxCriteria.size,
    partFilter: partFilter || '(all)'
  },
  onlyInEA: [],
  onlyInSandbox: [],
  matched: [],
  fieldDiffs: [],
  componentDiffs: []
};

// Tags only in EA
for (const [tag, criterion] of eaCriteria) {
  if (partFilter && criterion._eaPart !== partFilter) continue;
  if (!sandboxCriteria.has(tag)) {
    results.onlyInEA.push({
      tag,
      type: criterion.type,
      code: criterion.code,
      part: criterion._eaPart,
      section: criterion._eaSection
    });
  }
}

// Tags only in sandbox
for (const [tag, section] of sandboxCriteria) {
  if (!eaCriteria.has(tag)) {
    results.onlyInSandbox.push({
      tag,
      type: section.type,
      code: section.code,
      name: section.name,
      part: section._sandboxPart
    });
  }
}

// Tags in both — compare
for (const [tag, eaEntry] of eaCriteria) {
  if (partFilter && eaEntry._eaPart !== partFilter) continue;
  if (!sandboxCriteria.has(tag)) continue;

  const sbEntry = sandboxCriteria.get(tag);
  results.matched.push(tag);

  // Scalar field comparison at criterion level
  const fieldDiffs = compareScalarFields(eaEntry, sbEntry);
  if (fieldDiffs.length > 0) {
    results.fieldDiffs.push({
      tag,
      code: eaEntry.code,
      part: eaEntry._eaPart,
      diffs: fieldDiffs
    });
  }

  // Deep component comparison
  if (deepMode) {
    const compDiffs = compareComponentTrees(
      eaEntry.components, sbEntry.components, tag
    );
    if (compDiffs.length > 0) {
      results.componentDiffs.push({
        tag,
        code: eaEntry.code,
        part: eaEntry._eaPart,
        diffs: compDiffs
      });
    }
  }
}

// --- Output ---
if (jsonMode) {
  console.log(JSON.stringify(results, null, 2));
} else {
  printReport(results);
}

function printReport(r) {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║   ESPD-EDM: EA Conceptual Model vs Sandbox Comparison      ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`EA source:      ${r.summary.eaFile}`);
  console.log(`Sandbox parts:  ${r.summary.sandboxDir}`);
  console.log(`Part filter:    ${r.summary.partFilter}`);
  console.log(`EA criteria:    ${r.summary.eaCriteriaCount}`);
  console.log(`Sandbox entries: ${r.summary.sandboxCriteriaCount}`);
  console.log('');

  // --- Only in EA ---
  console.log(`── Only in EA output (${r.onlyInEA.length}) ${'─'.repeat(40)}`);
  if (r.onlyInEA.length === 0) {
    console.log('  (none)');
  } else {
    const byPart = groupBy(r.onlyInEA, 'part');
    for (const [part, items] of Object.entries(byPart)) {
      console.log(`  Part ${part}:`);
      items.forEach(i => console.log(`    ${i.tag} [${i.type}] ${i.code || ''} (section ${i.section})`));
    }
  }
  console.log('');

  // --- Only in Sandbox ---
  console.log(`── Only in Sandbox (${r.onlyInSandbox.length}) ${'─'.repeat(37)}`);
  if (r.onlyInSandbox.length === 0) {
    console.log('  (none)');
  } else {
    const byPart = groupBy(r.onlyInSandbox, 'part');
    for (const [part, items] of Object.entries(byPart)) {
      console.log(`  Part ${part}:`);
      items.forEach(i => console.log(`    ${i.tag} [${i.type}] ${i.code || ''} — ${i.name || ''}`));
    }
  }
  console.log('');

  // --- Matched ---
  console.log(`── Matched by tag (${r.matched.length}) ${'─'.repeat(38)}`);
  console.log('');

  // --- Field diffs ---
  if (!summaryOnly) {
    console.log(`── Field-level differences (${r.fieldDiffs.length} criteria) ${'─'.repeat(22)}`);
    if (r.fieldDiffs.length === 0) {
      console.log('  No field-level differences in matched criteria.');
    } else {
      for (const { tag, code, part, diffs } of r.fieldDiffs) {
        console.log(`  ${tag} [Part ${part}] (${code}):`);
        for (const d of diffs) {
          const eaStr = d.ea === undefined ? '(missing)' : JSON.stringify(d.ea);
          const sbStr = d.sandbox === undefined ? '(missing)' : JSON.stringify(d.sandbox);
          console.log(`    ${d.field}:`);
          console.log(`      EA:      ${truncate(eaStr, 80)}`);
          console.log(`      Sandbox: ${truncate(sbStr, 80)}`);
        }
      }
    }
    console.log('');

    // --- Component tree diffs (deep mode) ---
    if (deepMode) {
      console.log(`── Component tree differences (${r.componentDiffs.length} criteria) ${'─'.repeat(18)}`);
      if (r.componentDiffs.length === 0) {
        console.log('  No component-tree differences in matched criteria.');
      } else {
        for (const { tag, code, part, diffs } of r.componentDiffs) {
          console.log(`  ${tag} [Part ${part}] (${code}): ${diffs.length} diff(s)`);
          for (const d of diffs.slice(0, 20)) { // limit output
            if (d.type === 'only-in-ea') {
              console.log(`    + EA only:     ${d.path} [${d.componentType}]`);
            } else if (d.type === 'only-in-sandbox') {
              console.log(`    - Sandbox only: ${d.path} [${d.componentType}]`);
            } else if (d.type === 'field-diff') {
              console.log(`    ~ ${d.path}:`);
              for (const f of d.fields.slice(0, 5)) {
                console.log(`        ${f.field}: EA=${truncate(JSON.stringify(f.ea), 40)} | SB=${truncate(JSON.stringify(f.sandbox), 40)}`);
              }
              if (d.fields.length > 5) console.log(`        ... and ${d.fields.length - 5} more fields`);
            }
          }
          if (diffs.length > 20) console.log(`    ... and ${diffs.length - 20} more diffs`);
        }
      }
      console.log('');
    }
  }

  // --- Summary stats ---
  console.log('── Summary ─────────────────────────────────────────────────────');
  console.log(`  Matched:           ${r.matched.length}`);
  console.log(`  Only in EA:        ${r.onlyInEA.length}`);
  console.log(`  Only in Sandbox:   ${r.onlyInSandbox.length}`);
  console.log(`  With field diffs:  ${r.fieldDiffs.length}`);
  if (deepMode) {
    console.log(`  With comp diffs:   ${r.componentDiffs.length}`);
  }
  console.log('');
}

// --- Utilities ---
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key] || '?';
    (acc[group] = acc[group] || []).push(item);
    return acc;
  }, {});
}

function truncate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.substring(0, maxLen - 3) + '...';
}
