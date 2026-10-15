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
//   - DISCOVERS the modeled criterion codes from the sidecar filenames, so a NEW
//     criterion is covered automatically.
//
// A transformation module is one that shapes per-node output (readers, overlay,
// encoding, generators). Infrastructure modules (CLI/build loop, registry +
// codelist + schematron validators/loaders, the equivalence gate) are excluded:
// they carry no per-criterion branching and may legitimately mention a criterion
// in a usage example.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const criteriaDir = path.join(here, '..', 'model-sources', 'criteria');

// Infrastructure modules excluded from the "no criterion in logic" rule.
// Keep this list TIGHT: anything with per-node transformation logic must NOT be
// here. If you add a module, default to NOT excluding it (let the guard cover
// it); only add it here if it is pure loader/validator/CLI with no per-node
// branching, and say why.
const INFRA = new Set([
  'compile.mjs',              // CLI entry + loaders; usage comment names a criterion
  'build-generated.mjs',      // build loop; discovers criteria from sidecar filenames
  'value-type-registry.mjs',  // loads/validates value-types.json vs ResponseDataType.gc
  'codelist-attributes.mjs',  // loads/validates codelist-attributes.json vs Schematron
  'schematron-validate.mjs',  // Saxon/Schematron runner + attribute expansion
  'structural-equivalence.mjs', // the EA-projection correctness gate (no per-node shaping)
  'parts.mjs',                // assembles the HAND-AUTHORED administrative Parts I & VI
                              // (not EA-compiled criteria). It legitimately names partI/
                              // partVI because those parts are authored as data under
                              // model/parts/<part>/, not discovered from sidecars; it does
                              // no per-criterion node shaping, so R11.4 does not apply.
  'roles.mjs',                // loads/validates the role registry + emits the UI role lens;
                              // pure loader/validator, no per-criterion branching.
]);

/** The transformation modules the guard applies to (discovered, not listed). */
function transformationModules() {
  return fs.readdirSync(here)
    .filter(f => f.endsWith('.mjs') && !f.endsWith('.test.mjs') && !INFRA.has(f))
    .sort();
}

/** Modeled criterion codes, discovered from sidecar filenames. */
function modeledCodes() {
  return fs.readdirSync(criteriaDir)
    .filter(f => f.endsWith('.sidecar.json'))
    .map(f => f.replace(/\.sidecar\.json$/, ''))
    .sort();
}

/** Strip block + line comments so a criterion named in a JSDoc example is allowed. */
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
}

test('7.1 — the discovery sets are non-trivial (guards the guard)', () => {
  // If either discovery returned nothing, the assertions below would vacuously
  // pass. Fail loudly instead so a globbing/path regression cannot hide.
  assert.ok(transformationModules().length >= 5,
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
