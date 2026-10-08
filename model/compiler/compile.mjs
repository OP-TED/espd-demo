// Task 1.1 — compiler skeleton.
//
// At this stage the compiler only loads espd-edm.json and extracts the minimal
// structural core for a criterion (via read-structural-core.mjs). Later tasks
// add: sidecar overlay (1.2), structural-equivalence gate (1.3), and the three
// layer generators (3–5).
//
// Usage:
//   node compile.mjs --code slc-stand-to-spec-avg [--source <espd-edm.json>]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readStructuralCore, leavesOf } from './read-structural-core.mjs';
import { overlayEnrichment } from './overlay-enrichment.mjs';
import { assertStructuralEquivalence } from './structural-equivalence.mjs';
import { loadValidatedRegistry, validateCriterionValueTypes } from './value-type-registry.mjs';
import { generateRequestMapping } from './generate-request-mapping.mjs';
import { generateResponseMapping } from './generate-response-mapping.mjs';
import { generateFormStructure, loadPresentation } from './generate-form-structure.mjs';
import { generateInstanceSchema, generateExample } from './generate-instance-schema.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const defaultSource = path.resolve(
  here, '..', '..', '..',
  'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json'
);

function option(name, fallback) {
  const i = process.argv.indexOf(name);
  return i === -1 ? fallback : process.argv[i + 1];
}

export function loadEdm(sourcePath) {
  return JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
}

const CRITERIA_DIR = path.join(here, '..', 'model-sources', 'criteria');

export function loadSidecar(code, dir = CRITERIA_DIR) {
  const sidecarPath = path.join(dir, `${code}.sidecar.json`);
  return JSON.parse(fs.readFileSync(sidecarPath, 'utf8'));
}

export function loadHints(code, dir = CRITERIA_DIR) {
  const hintsPath = path.join(dir, `${code}.hints.json`);
  if (!fs.existsSync(hintsPath)) return null;
  return JSON.parse(fs.readFileSync(hintsPath, 'utf8'));
}

export function compile(edm, code, sidecar) {
  const core = readStructuralCore(edm, code);
  if (!sidecar) return { core, leaves: leavesOf(core) };
  const compiled = overlayEnrichment(core, sidecar);
  assertStructuralEquivalence(edm, code, compiled);
  const { registry, provenance } = loadValidatedRegistry();
  validateCriterionValueTypes(compiled, registry);
  return { core, compiled, leaves: leavesOf(compiled), registry, provenance };
}

/** Generate both XML mapping specs for a compiled criterion. */
export function generateMappings(compiled, registry) {
  return {
    request: generateRequestMapping(compiled, registry),
    response: generateResponseMapping(compiled, registry),
  };
}

/** Generate the form-structure lens for a compiled criterion (tasks 5.1 + 5.2). */
export function generateForm(compiled, registry, { partId, hints, presentation } = {}) {
  return generateFormStructure(compiled, registry, { partId, hints, presentation });
}

export { loadPresentation };

/** Default root for committed, generated artifacts (one subdir per layer). */
export const generatedRoot = path.resolve(here, '..', 'generated');

/**
 * Emit all three layers for a compiled criterion as per-CRITERION files under
 * `root` (default: model/generated/). Instance-data schema + example,
 * request/response mappings, and the form lens. Returns the written paths.
 * XML mappings are skipped (with a note) when the criterion has a shape the
 * mapping generators do not yet support, so instance-data + form still emit.
 */
export function emitAll(code, compiled, registry, { root = generatedRoot, partId } = {}) {
  const written = [];
  const write = (sub, name, obj) => {
    const dir = path.join(root, sub);
    fs.mkdirSync(dir, { recursive: true });
    const p = path.join(dir, name);
    fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
    written.push(path.relative(process.cwd(), p));
  };

  const hints = loadHints(code);
  write('instance-data', `${code}.schema.json`, generateInstanceSchema(compiled, registry, { partId, hints }));
  write('instance-data', `${code}.example.json`, generateExample(compiled, registry));
  write('form-structure', `${code}.form.json`, generateForm(compiled, registry, { partId, hints }));

  try {
    const { request, response } = generateMappings(compiled, registry);
    write('xml-mapping', `${code}.request.mapping.json`, request);
    write('xml-mapping', `${code}.response.mapping.json`, response);
  } catch (err) {
    process.stderr.write(`  (xml-mapping skipped for ${code}: ${err.message.split('\n')[0]})\n`);
  }
  return written;
}

// CLI entry
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('compile.mjs')) {
  const code = option('--code');
  if (!code) {
    process.stderr.write('Usage: node compile.mjs --code <criterion-code> [--source <path>]\n');
    process.exit(2);
  }
  const sourcePath = path.resolve(option('--source', defaultSource));
  let sidecar;
  try { sidecar = loadSidecar(code); } catch { /* optional at this stage */ }
  const { core, compiled, leaves, registry, provenance } = compile(loadEdm(sourcePath), code, sidecar);
  const out = compiled ?? core;
  process.stderr.write(
    `Compiled ${code}: ${leaves.length} value leaves` +
    (compiled ? ' (enriched)' : ' (core only, no sidecar)') +
    (provenance ? `; value types validated against ${provenance.shortName} ${provenance.version}` : '') +
    '.\n'
  );

  // --emit [dir]  writes all three layers per-criterion into generated/ (or dir).
  const emitIdx = process.argv.indexOf('--emit');
  if (emitIdx !== -1 && compiled) {
    const next = process.argv[emitIdx + 1];
    const root = next && !next.startsWith('--') ? path.resolve(next) : generatedRoot;
    const written = emitAll(code, compiled, registry, { root, partId: option('--part') });
    process.stderr.write(`Emitted ${written.length} file(s) under ${path.relative(process.cwd(), root)}\n`);
  } else {
    process.stdout.write(JSON.stringify(out, null, 2) + '\n');
  }
}
