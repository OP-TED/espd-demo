/**
 * Compares the original ESPD-EDM criterion file against the decomposed part files.
 *
 * Usage:
 *   node compare.cjs [--json] [--tags-only]
 *
 * Options:
 *   --json       Output full diff as JSON (for tooling)
 *   --tags-only  Only show tag-level presence/absence (quick overview)
 *
 * Compares:
 *   - ESPD-EDM/criterion/espd-edm.json (source, flat array)
 *   - espd-service-sandbox/espd-edm/parts/part-III-exclusion.json (Part III)
 *   - espd-service-sandbox/espd-edm/parts/part-IV-selection.json (Part IV)
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const tagsOnly = args.includes('--tags-only');

// Resolve paths relative to workspace root (one level up from espd-edm)
const workspaceRoot = path.resolve(__dirname, '..');
const sourceFile = path.resolve(workspaceRoot, '..', 'ESPD-EDM', 'criterion', 'espd-edm.json');
const partIIIFile = path.join(__dirname, 'parts', 'part-III-exclusion.json');
const partIVFile = path.join(__dirname, 'parts', 'part-IV-selection.json');

// Load files
const source = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
const partIII = JSON.parse(fs.readFileSync(partIIIFile, 'utf8'));
const partIV = JSON.parse(fs.readFileSync(partIVFile, 'utf8'));

// Extract only CRITERION entries from source (C01-C67)
const sourceCriteria = source.filter(s => s.type === 'CRITERION');
const sourceByTag = new Map(sourceCriteria.map(s => [s.tag, s]));

// Build maps for enhanced parts
const partIIIByTag = new Map(partIII.sections.map(s => [s.tag, s]));
const partIVByTag = new Map(partIV.sections.map(s => [s.tag, s]));
const enhancedByTag = new Map([...partIIIByTag, ...partIVByTag]);

// --- Analysis ---

const results = {
  summary: {
    sourceTotal: source.length,
    sourceCriteriaCount: sourceCriteria.length,
    sourceAdditionalInfoCount: source.filter(s => s.type === 'ADDITIONAL_INFORMATION').length,
    enhancedPartIIICount: partIII.sections.length,
    enhancedPartIVCount: partIV.sections.length
  },
  onlyInSource: [],
  onlyInEnhanced: [],
  inBoth: [],
  fieldDiffs: []
};

// Tags only in source
for (const [tag, section] of sourceByTag) {
  if (!enhancedByTag.has(tag)) {
    results.onlyInSource.push({ tag, name: section.name, type: section.type });
  }
}

// Tags only in enhanced
for (const [tag, section] of enhancedByTag) {
  if (!sourceByTag.has(tag)) {
    results.onlyInEnhanced.push({ tag, name: section.name, part: section.part });
  }
}

// Tags in both — compare fields
for (const [tag, sourceSection] of sourceByTag) {
  if (!enhancedByTag.has(tag)) continue;
  results.inBoth.push(tag);

  if (!tagsOnly) {
    const enhanced = enhancedByTag.get(tag);
    const diffs = compareObjects(sourceSection, enhanced, tag);
    if (diffs.length > 0) {
      results.fieldDiffs.push({ tag, name: sourceSection.name, diffs });
    }
  }
}

function compareObjects(source, enhanced, prefix) {
  const diffs = [];

  // Compare top-level scalar fields
  const allKeys = new Set([...Object.keys(source), ...Object.keys(enhanced)]);
  const skipKeys = new Set(['components', '$schema']); // components compared separately
  const addedInEnhanced = new Set(['part', 'partTitle', 'sectionTitle']); // expected additions

  for (const key of allKeys) {
    if (skipKeys.has(key)) continue;
    if (addedInEnhanced.has(key) && !(key in source)) continue; // expected new field

    const sv = source[key];
    const ev = enhanced[key];

    if (typeof sv !== 'object' && typeof ev !== 'object') {
      if (sv !== ev) {
        diffs.push({ field: key, source: sv, enhanced: ev });
      }
    }
  }

  // Compare component counts
  const srcComps = source.components || [];
  const enhComps = enhanced.components || [];
  if (srcComps.length !== enhComps.length) {
    diffs.push({
      field: 'components.length',
      source: srcComps.length,
      enhanced: enhComps.length
    });
  }

  return diffs;
}

// --- Output ---

if (jsonMode) {
  console.log(JSON.stringify(results, null, 2));
} else {
  console.log('=== ESPD-EDM Comparison: Source vs Enhanced ===\n');
  console.log('Source file: ESPD-EDM/criterion/espd-edm.json');
  console.log(`  Total entries: ${results.summary.sourceTotal}`);
  console.log(`  CRITERION entries: ${results.summary.sourceCriteriaCount}`);
  console.log(`  ADDITIONAL_INFORMATION entries: ${results.summary.sourceAdditionalInfoCount}`);
  console.log(`\nEnhanced files:`);
  console.log(`  Part III (exclusion): ${results.summary.enhancedPartIIICount} sections`);
  console.log(`  Part IV (selection):  ${results.summary.enhancedPartIVCount} sections`);

  console.log(`\n--- Tags only in SOURCE (not in enhanced) ---`);
  if (results.onlyInSource.length === 0) {
    console.log('  (none)');
  } else {
    results.onlyInSource.forEach(s => console.log(`  ${s.tag} | ${s.name}`));
  }

  console.log(`\n--- Tags only in ENHANCED (not in source) ---`);
  if (results.onlyInEnhanced.length === 0) {
    console.log('  (none)');
  } else {
    results.onlyInEnhanced.forEach(s => console.log(`  ${s.tag} | ${s.name} (Part ${s.part})`));
  }

  console.log(`\n--- Tags in BOTH: ${results.inBoth.length} ---`);

  if (!tagsOnly && results.fieldDiffs.length > 0) {
    console.log(`\n--- Field-level differences (${results.fieldDiffs.length} criteria) ---`);
    results.fieldDiffs.forEach(({ tag, name, diffs }) => {
      console.log(`\n  ${tag} - ${name}:`);
      diffs.forEach(d => {
        const sv = d.source === undefined ? '(missing)' : JSON.stringify(d.source);
        const ev = d.enhanced === undefined ? '(missing)' : JSON.stringify(d.enhanced);
        console.log(`    ${d.field}: ${sv} → ${ev}`);
      });
    });
  } else if (!tagsOnly) {
    console.log('\n  No field-level differences found in shared criteria.');
  }

  console.log('');
}
