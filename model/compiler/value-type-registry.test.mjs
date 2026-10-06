// Task 2.1 test — value-type registry validation + provenance.
//
// Usage: node value-type-registry.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { readStructuralCore } from './read-structural-core.mjs';
import {
  loadRegistry, validateRegistry, loadValidatedRegistry,
  validateCriterionValueTypes, parseGenericode,
} from './value-type-registry.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const edm = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`\u2713 ${name}`); }
  catch (err) { failures++; console.error(`\u2717 ${name}: ${err.message.split('\n')[0]}`); }
}
function expectThrow(name, fn, snippet) {
  try { fn(); failures++; console.error(`\u2717 ${name}: expected error, none thrown`); }
  catch (err) {
    if (snippet && !err.message.includes(snippet)) {
      failures++; console.error(`\u2717 ${name}: error missing '${snippet}' (got: ${err.message.split('\n')[0]})`);
    } else console.log(`\u2713 ${name}`);
  }
}

// Registry validates cleanly against ResponseDataType.gc, with correct provenance.
check('registry validates against ResponseDataType.gc; provenance = 5.0.0', () => {
  const { provenance, registry } = loadValidatedRegistry();
  assert.equal(provenance.shortName, 'ResponseDataType');
  assert.equal(provenance.version, '5.0.0');
  assert.ok(Object.keys(registry.valueTypes).length >= 10);
});

// Every value type C31 uses is defined in the registry.
check('all C31 value types are defined in the registry', () => {
  const core = readStructuralCore(edm, 'slc-stand-to-spec-avg');
  const { registry } = loadValidatedRegistry();
  validateCriterionValueTypes(core, registry); // throws if any unknown
});

// Fail: a tampered description is rejected.
expectThrow('wrong sourceDescription is rejected', () => {
  const loaded = loadRegistry();
  loaded.registry.valueTypes.INDICATOR.sourceDescription = 'totally wrong';
  validateRegistry(loaded);
}, 'description differs');

// Fail: an unknown value type code is rejected.
expectThrow('unknown value-type code is rejected', () => {
  const loaded = loadRegistry();
  loaded.registry.valueTypes.NOT_A_REAL_TYPE = { sourceDescription: 'x', instanceShape: {} };
  validateRegistry(loaded);
}, 'absent from ResponseDataType.gc');

// Fail: a criterion using an undefined value type is reported.
expectThrow('criterion using an undefined value type is reported', () => {
  const core = readStructuralCore(edm, 'slc-stand-to-spec-avg');
  const { registry } = loadValidatedRegistry();
  const stripped = structuredClone(registry);
  delete stripped.valueTypes.MINIMUM_AMOUNT;
  validateCriterionValueTypes(core, stripped);
}, 'Unknown value types');

// Genericode parser sanity.
check('genericode parser extracts ACTIVE rows', () => {
  const { gcRows } = { gcRows: parseGenericode(fs.readFileSync(
    path.resolve(here, '..', '..', '..', 'ESPD-EDM', 'codelists', 'ResponseDataType.gc'), 'utf8')) };
  assert.equal(gcRows.get('INDICATOR')?.get('status'), 'ACTIVE');
});

if (failures) { console.error(`\n${failures} test(s) failed.`); process.exit(1); }
console.log('\nAll value-type-registry tests passed.');
