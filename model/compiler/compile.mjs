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

export function loadSidecar(code, dir = path.join(here, 'sources')) {
  const sidecarPath = path.join(dir, `${code}.sidecar.json`);
  return JSON.parse(fs.readFileSync(sidecarPath, 'utf8'));
}

export function loadHints(code, dir = path.join(here, 'sources')) {
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

  const emitDir = option('--emit-mappings');
  const emitFormDir = option('--emit-form');
  if (emitDir && compiled) {
    const { request, response } = generateMappings(compiled, registry);
    const dir = path.resolve(emitDir);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${code}.request.mapping.json`), JSON.stringify(request, null, 2) + '\n');
    fs.writeFileSync(path.join(dir, `${code}.response.mapping.json`), JSON.stringify(response, null, 2) + '\n');
    process.stderr.write(`Emitted request + response mappings to ${path.relative(process.cwd(), dir)}\n`);
  } else if (emitFormDir && compiled) {
    const form = generateForm(compiled, registry, { partId: option('--part'), hints: loadHints(code) });
    const dir = path.resolve(emitFormDir);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${code}.form.json`), JSON.stringify(form, null, 2) + '\n');
    process.stderr.write(`Emitted form structure to ${path.relative(process.cwd(), dir)}\n`);
  } else {
    process.stdout.write(JSON.stringify(out, null, 2) + '\n');
  }
}
