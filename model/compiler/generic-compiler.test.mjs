// Task 7.1 — the compiler stays generic: NO criterion code may appear in the
// LOGIC of any transformation module.
//
// This is the durable, self-maintaining form of the R11.4 guarantee ("adding a
// criterion needs only data files"). The earlier probes (probe-c07,
// probe-nested-arrays) each hard-code a list of modules + a criterion code to
// check; this test instead:
//
//   - DISCOVERS the transformation modules by globbing model/compiler/*.mjs and
//     excluding tests + infrastructure, so a NEW generator module is covered
//     automatically (no list to update); and
//   - DISCOVERS the modeled criteria from the PUBLISHED model (the vendored
//     compiled/<key>.json files), so a NEW criterion is covered automatically.
//
// A transformation module is one that shapes per-node output. Since the model
// compiler moved to espd-tools/model-compiler (which has the same guard for the
// generators), the only ones left here are the form generator and its path helpers.
// Infrastructure modules (build loop, loaders, sync, validators) are excluded: they
// carry no per-criterion branching and may legitimately mention a criterion in a
// usage example.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const compiledDir = path.join(here, '..', 'generated', 'compiled');

// Infrastructure modules excluded from the "no criterion in logic" rule.
// Keep this list TIGHT: anything with per-node transformation logic must NOT be
// here. If you add a module, default to NOT excluding it (let the guard cover
// it); only add it here if it is pure loader/validator/CLI with no per-node
// branching, and say why.
const INFRA = new Set([
  'build-generated.mjs',      // build loop; discovers criteria from the published envelope
  'upstream.mjs',             // locates the published ESPD-EDM inputs
  'published-model.mjs',      // read access to the vendored published model
  'sync-published.mjs',       // verifies + vendors the published model
  'build-coverage-report.mjs', // renders the coverage report from the vendored model
  'schematron-validate.mjs',  // Saxon/Schematron runner + attribute expansion
  'parts.mjs',                // assembles the published administrative Parts I, II & VI
                              // (not EA-compiled criteria). It legitimately names partI/
                              // partVI because those parts are authored as data under
                              // model/generated/parts/<part>/ (published upstream), not discovered from sidecars; it does
                              // no per-criterion node shaping, so R11.4 does not apply.
  'roles.mjs',                // loads/validates the role registry + emits the UI role lens;
                              // pure loader/validator, no per-criterion branching.
  'build-ui-bundle.mjs',      // assembles the UI bundle from the EA section structure +
                              // generated form-structures + admin lenses. It names part
                              // containers (partI..partVI, exclusionGrounds, …) by design —
                              // it composes ALL parts, not per-criterion logic; adding a
                              // criterion needs no edit here (criteria come from the EA
                              // section structure + sidecars).
  'build-validators.mjs',     // precompiles the ALREADY-composed part-root + admin-section
                              // schemas into standalone Ajv validators. It enumerates the
                              // part roots (partII..partV) and admin sections (partI/partII/
                              // partVI) by design — one validator per part/section, not
                              // per-criterion logic. Criteria are pulled in via the part
                              // roots' $refs (discovered from instance-data/*.schema.json),
                              // so adding a criterion needs no edit here.
]);

/** The transformation modules the guard applies to (discovered, not listed). */
function transformationModules() {
  return fs.readdirSync(here)
    .filter(f => f.endsWith('.mjs') && !f.endsWith('.test.mjs') && !INFRA.has(f))
    .sort();
}

/** Modeled criterion keys, discovered from the vendored published model. */
function modeledCodes() {
  return fs.readdirSync(compiledDir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace(/\.json$/, ''))
    .sort();
}

/** Strip block + line comments so a criterion named in a JSDoc example is allowed. */
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
}

test('7.1 — the discovery sets are non-trivial (guards the guard)', () => {
  // If either discovery returned nothing, the assertions below would vacuously
  // pass. Fail loudly instead so a globbing/path regression cannot hide.
  assert.ok(transformationModules().length >= 2,
    `expected to discover the transformation modules, got ${transformationModules().join(', ')}`);
  assert.ok(modeledCodes().length >= 5,
    `expected to discover modeled criteria, got ${modeledCodes().length}`);
});

test('7.1 — no modeled criterion code appears in any transformation module\'s logic', () => {
  const codes = modeledCodes();
  for (const file of transformationModules()) {
    const logic = stripComments(fs.readFileSync(path.join(here, file), 'utf8'));
    for (const code of codes) {
      assert.ok(!logic.includes(code),
        `${file} logic must not name criterion '${code}' — adding a criterion must need data files only (R11.4)`);
    }
  }
});

test('7.1 — no transformation module hard-codes a part container key', () => {
  // Part containers (partI..partVI) come from the sidecar instanceModel; a
  // generator must not branch on a specific part. (build-generated's
  // PART_BY_CONTAINER table is infra and excluded.)
  const partKeys = ['partI', 'partII', 'partIII', 'partIV', 'partV', 'partVI'];
  for (const file of transformationModules()) {
    const logic = stripComments(fs.readFileSync(path.join(here, file), 'utf8'));
    for (const key of partKeys) {
      // Word-boundary match so 'partId'/'partition' etc. don't trip it.
      const re = new RegExp(`['"\\b]${key}['"\\b]`);
      assert.ok(!re.test(logic),
        `${file} logic must not hard-code the part container '${key}'`);
    }
  }
});
