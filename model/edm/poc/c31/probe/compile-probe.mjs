import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// --------------------------------------------------------------------------
// C31 probe compiler.
//
// Design under test (leaner than the original POC):
//   * espd-edm.json stays AS-IS (full EA structure). No lean source.
//   * No node-kinds.json  -> type/code/*path/propertydatatype already present.
//   * No fragments        -> evidence branches already expanded in EA.
//   * Semantic IDs + instance bindings come from a single sidecar (id-map.json),
//     joined to the EA structure by correlation path (requestpath).
//
// It then GENERATES the layer artifacts straight from the enriched EA node:
//   * compiled model      (c31.compiled.json)
//   * request mapping      (c31.request.mapping.json)
//   * response mapping     (c31.response.mapping.json)
// to prove the leaner inputs are sufficient to drive the layers.
// --------------------------------------------------------------------------

const here = path.dirname(fileURLToPath(import.meta.url));
const defaultSource = path.resolve(
  here, '..', '..', '..', '..', '..', '..',
  'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json'
);
const idMapPath = path.join(here, 'id-map.json');
const valueTypesPath = path.resolve(here, '..', 'value-types.json');

function option(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

const sourcePath = path.resolve(option('--source') ?? defaultSource);
const outDir = path.resolve(option('--outdir') ?? path.join(here, 'out'));

const edm = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const idMap = JSON.parse(fs.readFileSync(idMapPath, 'utf8'));
const valueTypeModel = JSON.parse(fs.readFileSync(valueTypesPath, 'utf8'));
const valueTypes = valueTypeModel.valueTypes;

// --- locate the criterion in espd-edm.json (as-is) ------------------------
function findCriterion(parts, code) {
  for (const part of parts) {
    for (const section of part.sections ?? []) {
      const found = (section.criteria ?? []).find(c => c.code === code);
      if (found) return found;
    }
  }
  return undefined;
}

const sourceCriterion = findCriterion(edm, idMap.criterion.code);
if (!sourceCriterion) throw new Error(`Criterion not found: ${idMap.criterion.code}`);

// --- overlay the sidecar by correlation path (no mutation of espd-edm) -----
const criterion = structuredClone(sourceCriterion);
criterion.id = idMap.criterion.id;
criterion.instanceModel = idMap.criterion.instanceModel;

const byPath = new Map();
const leaves = [];
(function walk(components) {
  for (const c of components ?? []) {
    if (c.requestpath) byPath.set(c.requestpath, c);
    if (c.type === 'REQUIREMENT' || c.type === 'QUESTION') leaves.push(c);
    walk(c.components);
  }
})(criterion.components);

for (const [reqpath, meta] of Object.entries(idMap.components)) {
  const node = byPath.get(reqpath);
  if (!node) throw new Error(`Sidecar path not found in espd-edm.json: ${reqpath}`);
  node.id = meta.id;
  node.instanceBinding = meta.instanceBinding;
}

const unenriched = leaves.filter(c => !c.id || !c.instanceBinding);
if (unenriched.length) {
  throw new Error(`Leaves without id/instanceBinding:\n${unenriched.map(c => '- ' + c.requestpath).join('\n')}`);
}
const ids = [criterion.id, ...leaves.map(c => c.id)];
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) throw new Error(`Duplicate semantic IDs: ${[...new Set(dupes)].join(', ')}`);

for (const leaf of leaves) {
  if (!valueTypes[leaf.propertydatatype]) {
    throw new Error(`No value-type definition for ${leaf.propertydatatype} (${leaf.id})`);
  }
}

// --- instance path helper --------------------------------------------------
function instancePath(leaf) {
  const m = criterion.instanceModel;
  const b = leaf.instanceBinding;
  return [...m.containerPath, criterion[m.key.source], b.side, ...b.path];
}

// --- GENERATE request mapping ---------------------------------------------
// Walk the EA tree; const nodes carry fixed metadata, requirement leaves with
// a requestXml binding carry buyer Expected* values at their instance path.
function requestChildrenFor(node) {
  const children = [];
  for (const c of node.components ?? []) {
    if (c.type === 'REQUIREMENT') {
      const vt = valueTypes[c.propertydatatype];
      if (vt?.requestXml) {
        children.push(requestLeaf(c, vt.requestXml));
      }
    } else if ((c.components ?? []).length) {
      const nested = requestChildrenFor(c);
      if (nested.length) children.push({ group: c.requestpath, children: nested });
    }
  }
  return children;
}

function requestLeaf(leaf, binding) {
  const ip = instancePath(leaf).join('.');
  return { element: binding.element, from: ip, binding: binding.kind };
}

// --- GENERATE response mapping --------------------------------------------
function responseChildrenFor(node) {
  const children = [];
  for (const c of node.components ?? []) {
    if (c.type === 'QUESTION') {
      const vt = valueTypes[c.propertydatatype];
      if (vt?.responseXml) {
        children.push({ element: vt.responseXml.element, from: instancePath(c).join('.'), binding: vt.responseXml.kind });
      }
    } else if ((c.components ?? []).length) {
      const nested = responseChildrenFor(c);
      if (nested.length) children.push({ group: c.requestpath, condition: c.code, children: nested });
    }
  }
  return children;
}

const requestMapping = {
  $comment: 'PROBE-GENERATED request mapping from espd-edm.json (as-is) + id-map.json. No node-kinds, no fragments.',
  criterion: criterion.code,
  rootUuid: criterion.uuid,
  rules: requestChildrenFor(criterion)
};

const responseMapping = {
  $comment: 'PROBE-GENERATED response mapping from espd-edm.json (as-is) + id-map.json. No node-kinds, no fragments.',
  criterion: criterion.code,
  rootUuid: criterion.uuid,
  rules: responseChildrenFor(criterion)
};

// --- write outputs ---------------------------------------------------------
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'c31.compiled.json'), JSON.stringify(criterion, null, 2) + '\n');
fs.writeFileSync(path.join(outDir, 'c31.request.mapping.json'), JSON.stringify(requestMapping, null, 2) + '\n');
fs.writeFileSync(path.join(outDir, 'c31.response.mapping.json'), JSON.stringify(responseMapping, null, 2) + '\n');

const reqLeafCount = JSON.stringify(requestMapping).match(/"from"/g)?.length ?? 0;
const resLeafCount = JSON.stringify(responseMapping).match(/"from"/g)?.length ?? 0;

process.stderr.write(
  `Probe OK: espd-edm.json as-is + sidecar, no node-kinds, no fragments.\n` +
  `  enriched leaves: ${leaves.length}\n` +
  `  request value leaves: ${reqLeafCount}\n` +
  `  response value leaves: ${resLeafCount}\n` +
  `  wrote: ${path.relative(process.cwd(), outDir)}\n`
);
