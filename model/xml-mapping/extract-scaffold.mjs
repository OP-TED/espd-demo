// EXPERIMENTAL — extract a LEAN criteria-scaffold model from the authoritative
// EA-derived espd-edm.json.
//
// espd-edm.json (espd-tools/EAtoJSON/outputs/espd-edm.json) is the source of
// truth for the ESPD form structure. It grew to cover all six parts, but only
// Parts III (exclusion grounds), IV (selection criteria) and V (other criteria)
// are actual *criteria* — a recursive tree of property groups, questions and
// requirements. The request document must DECLARE that whole tree (the
// "scaffold"), which is fixed criterion metadata, not instance data.
//
// This script distills espd-edm.json into `criteria-scaffold.json`: the criteria
// parts only, and per node only the fields the request-declaration scaffold
// needs (see FIELD SELECTION below). It is a GENERATED artifact — do not edit by
// hand; regenerate when espd-edm.json changes:
//
//   node model/xml-mapping/extract-scaffold.mjs
//
// Usage:
//   node extract-scaffold.mjs            # write criteria-scaffold.json
//   node extract-scaffold.mjs --stdout   # print to stdout instead
//   node extract-scaffold.mjs --code slc-stand-to-spec-avg   # single criterion (debug)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// espd-edm.json lives in the espd-tools sibling repo. Resolve relative to this
// file: model/xml-mapping -> up to workspace root -> espd-tools/…
const EDM_PATH = path.resolve(__dirname, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const OUT_PATH = path.resolve(__dirname, 'criteria-scaffold.json');

// Only these parts hold criteria (a recursive property-group tree). Parts I, II
// and VI are procedure / economic-operator / declaration structures, not
// criteria, and are intentionally excluded from the scaffold model.
const CRITERIA_PARTS = new Set(['partIII', 'partIV', 'partV']);

// FIELD SELECTION — the request-declaration scaffold needs only a subset of each
// node's fields. Kept: `tag`, `type`, `code`, `description`, `propertydatatype`,
// `requestpath`, `responsepath`, `title` (legislation), and recursively
// `components`. Dropped: `contentpath` (the …/RV value slot, derivable and not
// serialized in the declaration) and `cardinality` (not serialized in the
// declaration; may be reintroduced later for validation). Criterion heads also
// keep `uuid` and `name`.
const NODE_FIELDS = ['tag', 'type', 'code', 'title', 'description', 'propertydatatype', 'requestpath', 'responsepath'];
const CRITERION_FIELDS = ['tag', 'type', 'uuid', 'code', 'name', 'description', 'requestpath', 'responsepath'];

/** Pick only the listed keys that are present (and non-empty) on `node`. */
function pick(node, keys) {
  const out = {};
  for (const k of keys) {
    if (node[k] !== undefined && node[k] !== '') out[k] = node[k];
  }
  return out;
}

/** Lean-copy a component subtree (a property group / question / requirement). */
function leanComponent(node) {
  const out = pick(node, NODE_FIELDS);
  if (Array.isArray(node.components)) {
    out.components = node.components.map(leanComponent);
  }
  return out;
}

/** Lean-copy a criterion head plus its component tree. */
function leanCriterion(crit) {
  const out = pick(crit, CRITERION_FIELDS);
  if (Array.isArray(crit.components)) {
    out.components = crit.components.map(leanComponent);
  }
  return out;
}

function extract(edm, filterCode) {
  const parts = [];
  for (const part of edm) {
    if (!CRITERIA_PARTS.has(part.part)) continue;
    const sections = [];
    for (const section of part.sections || []) {
      const criteria = (section.criteria || [])
        .filter(c => !filterCode || c.code === filterCode)
        .map(leanCriterion);
      if (criteria.length > 0) {
        sections.push({ section: section.section, criteria });
      }
    }
    if (sections.length > 0) parts.push({ part: part.part, sections });
  }
  return parts;
}

const args = process.argv.slice(2);
const toStdout = args.includes('--stdout');
const codeIdx = args.indexOf('--code');
const filterCode = codeIdx !== -1 ? args[codeIdx + 1] : undefined;

const edm = JSON.parse(fs.readFileSync(EDM_PATH, 'utf8'));
const scaffold = extract(edm, filterCode);

const banner = {
  $comment: 'GENERATED — do not edit by hand. A lean criteria-scaffold distilled from espd-tools/EAtoJSON/outputs/espd-edm.json by model/xml-mapping/extract-scaffold.mjs. Contains ONLY the criteria parts (III, IV, V) and only the fields the request-declaration scaffold needs. Regenerate with: node model/xml-mapping/extract-scaffold.mjs',
  $source: 'espd-tools/EAtoJSON/outputs/espd-edm.json',
  parts: scaffold
};

const json = JSON.stringify(banner, null, 2) + '\n';

if (toStdout) {
  process.stdout.write(json);
} else {
  fs.writeFileSync(OUT_PATH, json, 'utf8');
  const critCount = scaffold.reduce((n, p) => n + p.sections.reduce((m, s) => m + s.criteria.length, 0), 0);
  console.log(`Wrote ${path.relative(process.cwd(), OUT_PATH)} — ${scaffold.length} part(s), ${critCount} criteria.`);
}
