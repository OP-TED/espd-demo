// "State of the model" coverage report.
//
// Reads the model's actual sources — the EA export, the per-criterion sidecars,
// the hand-authored parts, the value-type registry, and the codelist governance
// registry — and compiles every criterion through the real pipeline, then emits
// a deterministic Markdown report to docs/coverage-report.md.
//
// GENERATED, never hand-edited: a test (coverage-report.test.mjs) regenerates it
// and fails if docs/coverage-report.md is out of date, so it cannot drift from
// the model. Wired into `model:compile`.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadEdm, loadSidecar, loadHints, compile, loadPresentation } from './compile.mjs';
import { leavesOf } from './read-structural-core.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..', '..');
const edmPath = path.resolve(repoRoot, '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const criteriaDir = path.resolve(repoRoot, 'model', 'model-sources', 'criteria');
const partsDir = path.resolve(repoRoot, 'model', 'parts');
const registriesDir = path.resolve(repoRoot, 'model', 'model-sources', 'registries');
const governancePath = path.resolve(repoRoot, 'model', 'codelists', 'governance.json');
const generatedDir = path.resolve(repoRoot, 'model', 'generated');
const reportPath = path.resolve(repoRoot, 'docs', 'coverage-report.md');

const PART_BY_CONTAINER = { partI: 'I', partII: 'II', partIII: 'III', partIV: 'IV', partV: 'V', partVI: 'VI' };
const PART_NAME = {
  I: 'Procedure & contracting authority',
  II: 'Economic operator',
  III: 'Exclusion grounds',
  IV: 'Selection criteria',
  V: 'Reduction of candidates',
  VI: 'Concluding statements (signature)',
};

/** Count caption notes (structural + caption flag) in a compiled criterion. */
function countCaptions(node, acc = { n: 0 }) {
  for (const c of node.children ?? []) {
    if (c.nodeKind === 'structural' && c.caption) acc.n++;
    countCaptions(c, acc);
  }
  return acc.n;
}

/** Collect the model's data into a plain object (pure; no I/O side effects). */
export function collectModel() {
  const edm = loadEdm(edmPath);

  // EA inventory: CRITERION + INFORMATION entries, by part.
  const eaCriteria = [];
  const eaInfo = [];
  edm.forEach((part, i) => {
    const partNo = i + 1;
    for (const sec of part.sections ?? []) {
      for (const c of sec.criteria ?? []) {
        if (c.type === 'CRITERION') eaCriteria.push({ partNo, code: c.code, tag: c.tag, name: c.name });
        else if (c.type === 'INFORMATION') eaInfo.push({ partNo, code: c.code, tag: c.tag });
      }
    }
  });

  // Modeled criteria (one sidecar each), compiled through the real pipeline.
  const sidecarFiles = fs.readdirSync(criteriaDir).filter(f => f.endsWith('.sidecar.json')).sort();
  const criteria = [];
  const valueTypeUsage = new Map(); // valueType -> count of criteria using it
  for (const f of sidecarFiles) {
    const id = f.replace('.sidecar.json', '');
    const sidecar = loadSidecar(id);
    const { compiled, registry } = compile(edm, id, sidecar);
    const leaves = leavesOf(compiled);
    const vts = new Set(leaves.map(l => l.valueType));
    for (const vt of vts) valueTypeUsage.set(vt, (valueTypeUsage.get(vt) ?? 0) + 1);
    const part = PART_BY_CONTAINER[sidecar.criterion.instanceModel.containerPath[0]];
    criteria.push({
      id,
      eaCode: sidecar.criterion.code,
      tag: sidecar.criterion.tag,
      part,
      name: compiled.name ?? '',
      leaves: leaves.length,
      valueTypes: [...vts].sort(),
      repeatableGroups: (compiled.arrayContainers ?? []).length,
      captions: countCaptions(compiled),
      hasHints: !!loadHints(id),
      hasPresentation: !!loadPresentation(id),
      registryShortName: registry.source.shortName,
      registryVersion: registry.source.version,
    });
  }
  criteria.sort((a, b) => a.part.localeCompare(b.part) || a.id.localeCompare(b.id));

  // Hand-authored parts (administrative blocks).
  const parts = [];
  for (const d of fs.readdirSync(partsDir)) {
    const full = path.join(partsDir, d);
    if (!fs.statSync(full).isDirectory()) continue;
    const sections = fs.readdirSync(full)
      .filter(f => f.endsWith('.schema.json'))
      .map(f => f.replace('.schema.json', ''))
      .sort();
    parts.push({ dir: d, part: d.replace(/^part/, ''), sections });
  }
  parts.sort((a, b) => a.dir.localeCompare(b.dir));

  // Value-type registry + codelist governance.
  const valueTypes = JSON.parse(fs.readFileSync(path.join(registriesDir, 'value-types.json'), 'utf8'));
  const governance = JSON.parse(fs.readFileSync(governancePath, 'utf8'));

  // Generated output file counts (per layer).
  const generated = {};
  for (const sub of ['instance-data', 'xml-mapping', 'form-structure', 'codelists']) {
    const d = path.join(generatedDir, sub);
    generated[sub] = fs.existsSync(d) ? fs.readdirSync(d).filter(f => f.endsWith('.json')).length : 0;
  }

  return { partsCount: edm.length, eaCriteria, eaInfo, criteria, parts, valueTypes, governance, generated, valueTypeUsage };
}

/** Render the collected model as deterministic Markdown. */
export function renderReport(model) {
  const { partsCount, eaCriteria, eaInfo, criteria, parts, valueTypes, governance, generated, valueTypeUsage } = model;
  const L = [];
  const prov = criteria[0] ? `${criteria[0].registryShortName} ${criteria[0].registryVersion}` : 'n/a';

  L.push('<!-- GENERATED by model/compiler/build-coverage-report.mjs — do not hand-edit. Regenerate with `npm run model:compile`. -->');
  L.push('# espd-demo — model coverage report');
  L.push('');
  L.push('A generated snapshot of what the model covers: every ESPD criterion and');
  L.push('administrative block, the value types and codelists they use, and the');
  L.push('generated output. Regenerated by `model:compile`; a test keeps it in sync.');
  L.push('');

  // --- Summary -------------------------------------------------------------
  const distinctCodes = new Set(eaCriteria.map(c => c.code)).size;
  const byPart = {};
  for (const c of criteria) byPart[c.part] = (byPart[c.part] ?? 0) + 1;
  L.push('## Summary');
  L.push('');
  L.push('| Metric | Count |');
  L.push('|---|---:|');
  L.push(`| ESPD parts | ${partsCount} |`);
  L.push(`| EA criteria (CRITERION entries) | ${eaCriteria.length} |`);
  L.push(`| — distinct criterion codes | ${distinctCodes} |`);
  L.push(`| Modeled criteria (sidecars) | ${criteria.length} |`);
  L.push(`| Hand-authored administrative blocks | ${parts.reduce((n, p) => n + p.sections.length, 0)} |`);
  L.push(`| Value types registered | ${Object.keys(valueTypes.valueTypes).length} |`);
  L.push(`| Codelists in governance | ${Object.keys(governance.codelists).length} |`);
  L.push(`| Generated instance-data files | ${generated['instance-data']} |`);
  L.push(`| Generated XML-mapping files | ${generated['xml-mapping']} |`);
  L.push(`| Generated form-structure files | ${generated['form-structure']} |`);
  L.push(`| Generated UI codelist files | ${generated['codelists']} |`);
  L.push('');
  L.push('Value types validated against **' + prov + '** (`ResponseDataType.gc`).');
  L.push('');

  // --- Criterion coverage by part -----------------------------------------
  L.push('## Criterion coverage');
  L.push('');
  L.push(`All **${eaCriteria.length}** EA criteria are modeled (one sidecar each). ` +
    'Counts by part:');
  L.push('');
  L.push('| Part | Name | Modeled criteria |');
  L.push('|---|---|---:|');
  for (const p of Object.keys(PART_NAME)) {
    if (byPart[p]) L.push(`| ${p} | ${PART_NAME[p]} | ${byPart[p]} |`);
  }
  L.push('');

  // Per-part criterion tables.
  for (const p of Object.keys(PART_NAME)) {
    const inPart = criteria.filter(c => c.part === p);
    if (!inPart.length) continue;
    L.push(`### Part ${p} — ${PART_NAME[p]}`);
    L.push('');
    L.push('| Criterion (id) | EA code | Tag | Leaves | Repeatable groups | Captions | Value types |');
    L.push('|---|---|---|---:|---:|---:|---|');
    for (const c of inPart) {
      L.push(`| ${c.id} | ${c.eaCode} | ${c.tag ?? ''} | ${c.leaves} | ${c.repeatableGroups} | ${c.captions} | ${c.valueTypes.join(', ')} |`);
    }
    L.push('');
  }

  // --- Administrative blocks ----------------------------------------------
  L.push('## Administrative blocks (hand-authored)');
  L.push('');
  L.push('EA `INFORMATION` blocks are modeled by hand under `model/parts/` (party');
  L.push('aggregates and the signature), not as compiler sidecars.');
  L.push('');
  L.push('| Part dir | Sections |');
  L.push('|---|---|');
  for (const p of parts) L.push(`| ${p.dir} | ${p.sections.join(', ')} |`);
  L.push('');
  L.push('EA `INFORMATION` blocks in the export:');
  L.push('');
  L.push('| Tag | Code | Part |');
  L.push('|---|---|---:|');
  for (const b of eaInfo) L.push(`| ${b.tag ?? ''} | ${b.code} | ${b.partNo} |`);
  L.push('');

  // --- Value types ---------------------------------------------------------
  L.push('## Value types');
  L.push('');
  L.push('Registered in `model/model-sources/registries/value-types.json`; the ');
  L.push('authoritative code set is `ResponseDataType.gc`. "Used by" counts the ');
  L.push('modeled criteria whose leaves use the type.');
  L.push('');
  L.push('| Value type | request | response | Used by (criteria) |');
  L.push('|---|:--:|:--:|---:|');
  for (const vt of Object.keys(valueTypes.valueTypes).sort()) {
    const def = valueTypes.valueTypes[vt];
    const req = def.requestXml ? 'yes' : '—';
    const res = def.responseXml ? 'yes' : '—';
    L.push(`| ${vt} | ${req} | ${res} | ${valueTypeUsage.get(vt) ?? 0} |`);
  }
  L.push('');

  // --- Codelists -----------------------------------------------------------
  L.push('## Codelists (governance)');
  L.push('');
  L.push('The four governance axes are independent (see');
  L.push('`docs/codelist-governance.md`). `inlineEnum && !schematronValidated`');
  L.push('means the inlined enum is a suggested set (implementer choice).');
  L.push('');
  L.push('| Codelist | shipped | schematronValidated | useForUI | inlineEnum |');
  L.push('|---|:--:|:--:|:--:|:--:|');
  const yn = b => (b ? 'yes' : '—');
  for (const name of Object.keys(governance.codelists).sort()) {
    const g = governance.codelists[name];
    L.push(`| ${name} | ${yn(g.shipped)} | ${yn(g.schematronValidated)} | ${yn(g.useForUI)} | ${yn(g.inlineEnum)} |`);
  }
  L.push('');

  return L.join('\n') + '\n';
}

/** Build and (optionally) write the report. Returns the Markdown string. */
export function buildCoverageReport({ write = true } = {}) {
  const md = renderReport(collectModel());
  if (write) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, md);
  }
  return md;
}

export { reportPath };

// Run directly: node model/compiler/build-coverage-report.mjs
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  buildCoverageReport({ write: true });
  process.stderr.write(`Wrote ${path.relative(process.cwd(), reportPath)}\n`);
}
