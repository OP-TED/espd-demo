// Task 4.1 test — generated instance-data schema accepts a valid C31 instance
// and rejects a malformed one. Uses the project's Ajv (2020).
//
// Usage: node generate-instance-schema.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import Ajv from '../../node_modules/ajv/dist/2020.js';
import { readStructuralCore } from './read-structural-core.mjs';
import { overlayEnrichment } from './overlay-enrichment.mjs';
import { loadValidatedRegistry } from './value-type-registry.mjs';
import { generateInstanceSchema, generateExample } from './generate-instance-schema.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const edm = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const CODE = 'slc-stand-to-spec-avg';

const core = readStructuralCore(edm, CODE);
const sidecar = JSON.parse(fs.readFileSync(path.join(here, '..', 'model-sources', 'criteria', `${CODE}.sidecar.json`), 'utf8'));
const criterion = overlayEnrichment(core, sidecar);
const { registry } = loadValidatedRegistry();
const hints = JSON.parse(fs.readFileSync(path.join(here, '..', 'model-sources', 'criteria', `${CODE}.hints.json`), 'utf8'));
// Baseline (no hints) and refined (with hints) schemas. Distinct $ids so Ajv
// can compile both in one instance.
const baselineSchema = generateInstanceSchema(criterion, registry, { partId: 'part-IV-baseline' });
const schema = generateInstanceSchema(criterion, registry, { partId: 'part-IV', hints });

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`\u2713 ${name}`); }
  catch (err) { failures++; console.error(`\u2717 ${name}: ${err.message.split('\n')[0]}`); }
}

check('schema compiles under Ajv 2020', () => {
  assert.equal(typeof validate, 'function');
});

check('schema places the criterion under partIV.selectionCriteria.<code>', () => {
  const crit = schema.properties.partIV.properties.selectionCriteria.properties[CODE];
  assert.ok(crit, 'criterion node present at the container path');
  assert.ok(crit.properties.requirement, 'requirement side present');
  assert.ok(crit.properties.response, 'response side present');
});

check('requirement side has lotIdentifiers (array of string), numberOfYears (int), minimumAmount (object)', () => {
  const req = schema.properties.partIV.properties.selectionCriteria.properties[CODE].properties.requirement;
  assert.equal(req.properties.lotIdentifiers.type, 'array');
  assert.equal(req.properties.numberOfYears.type, 'integer');
  assert.equal(req.properties.minimumAmount.type, 'object');
  assert.ok(req.required.includes('lotIdentifiers'), 'lotIdentifiers required (1..n)');
  assert.ok(req.required.includes('numberOfYears'), 'numberOfYears required (1)');
});

check('response side nests turnover.period and turnover.amount under a turnover object', () => {
  const res = schema.properties.partIV.properties.selectionCriteria.properties[CODE].properties.response;
  assert.equal(res.properties.turnover.type, 'object');
  assert.ok(res.properties.turnover.properties.period, 'turnover.period present');
  assert.ok(res.properties.turnover.properties.amount, 'turnover.amount present');
});

check('a valid C31 instance validates against the generated schema', () => {
  const instance = { partIV: { selectionCriteria: { [CODE]: {
    requirement: {
      lotIdentifiers: ['LOT-0000', 'LOT-0001'],
      numberOfYears: 3,
      businessDomain: 'IT consulting.',
      minimumAmount: { value: 1000000, currency: 'EUR' },
    },
    response: {
      fulfilledByItself: false,
      reliedUpon: true,
      reliedUponEntity: { name: 'Partner Co', id: 'EO-9' },
      turnover: {
        period: { startDate: '2021-01-01', endDate: '2023-12-31' },
        amount: { value: 2500000, currency: 'EUR' },
        electronicEvidence: { availableElectronically: true, evidence: [{ id: 'e1', url: 'https://x/1' }] },
      },
      startTrading: { date: '2015-06-01', electronicEvidence: { availableElectronically: false } },
      electronicEvidence: { availableElectronically: false },
    },
  } } } };
  const ok = validate(instance);
  assert.ok(ok, `expected valid, got errors: ${JSON.stringify(validate.errors)}`);
});

check('a malformed instance (missing required numberOfYears) is rejected', () => {
  const bad = { partIV: { selectionCriteria: { [CODE]: {
    requirement: { lotIdentifiers: ['LOT-0000'], minimumAmount: { value: 1, currency: 'EUR' } },
  } } } };
  assert.ok(!validate(bad), 'expected invalid due to missing numberOfYears');
});

check('a malformed instance (wrong type for numberOfYears) is rejected', () => {
  const bad = { partIV: { selectionCriteria: { [CODE]: {
    requirement: { lotIdentifiers: ['LOT-0000'], numberOfYears: 'three', minimumAmount: { value: 1, currency: 'EUR' } },
  } } } };
  assert.ok(!validate(bad), 'expected invalid due to numberOfYears type');
});

// -------- Task 4.2: hints add finer constraints beyond the baseline --------

// Complete, otherwise-valid requirement side; each test perturbs ONE field so
// the assertion isolates the constraint under test.
const goodReq = () => ({ lotIdentifiers: ['LOT-0000'], numberOfYears: 3, businessDomain: 'IT', minimumAmount: { value: 1, currency: 'EUR' } });
const vBaseline = ajv.compile(baselineSchema);

check('4.3.1 derived: lotIdentifiers minItems:1 comes from 1..n cardinality (no hint needed)', () => {
  const inst = { partIV: { selectionCriteria: { [CODE]: { requirement: { ...goodReq(), lotIdentifiers: [] } } } } };
  // Derivation is part of the BASELINE now — both schemas reject an empty array,
  // and the hints file no longer declares minItems for this leaf.
  assert.ok(!vBaseline(inst), 'baseline (derived) rejects empty lotIdentifiers');
  assert.ok(!validate(inst), 'refined schema rejects empty lotIdentifiers');
  assert.ok(!('slc-stand-to-spec-avg.lot-identifiers' in (hints.leafConstraints ?? {})),
    'lotIdentifiers minItems must no longer be hand-authored');
  const lot = schema.properties.partIV.properties.selectionCriteria.properties[CODE]
    .properties.requirement.properties.lotIdentifiers;
  assert.equal(lot.minItems, 1, 'minItems derived onto the schema');
});

check('4.3.2 derived: conditionals come from condition markers (no hand-authored conditionals)', () => {
  assert.ok(!hints.conditionals, 'hints must no longer declare conditionals');
  const res = schema.properties.partIV.properties.selectionCriteria.properties[CODE].properties.response;
  const derivedClauses = (res.allOf ?? []).filter(c => c.$derived);
  assert.ok(derivedClauses.length >= 1, 'expected derived conditional clauses on the response side');
  const ev = res.properties.electronicEvidence;
  assert.ok((ev.allOf ?? []).some(c => c.$derived), 'expected a derived conditional on electronicEvidence');
});

check('hint: numberOfYears minimum:1 bites (0 rejected)', () => {
  const inst = { partIV: { selectionCriteria: { [CODE]: { requirement: { ...goodReq(), numberOfYears: 0 } } } } };
  assert.ok(!validate(inst), 'refined schema rejects numberOfYears 0');
});

check('hint: PERIOD anyOf bites (empty period rejected)', () => {
  const inst = { partIV: { selectionCriteria: { [CODE]: {
    requirement: goodReq(),
    response: { fulfilledByItself: true, turnover: { period: {}, amount: { value: 1, currency: 'EUR' } } },
  } } } };
  assert.ok(!validate(inst), 'refined schema rejects period with neither start nor end date');
});

check('hint: electronicEvidence conditional bites (available=true but no evidence rejected)', () => {
  const inst = { partIV: { selectionCriteria: { [CODE]: {
    requirement: goodReq(),
    response: { fulfilledByItself: true, electronicEvidence: { availableElectronically: true } },
  } } } };
  assert.ok(!validate(inst), 'refined schema requires evidence when availableElectronically=true');
});

check('hint: fulfilledByItself=true suppresses reliedUpon (present reliedUpon rejected)', () => {
  const inst = { partIV: { selectionCriteria: { [CODE]: {
    requirement: goodReq(),
    response: { fulfilledByItself: true, reliedUpon: true },
  } } } };
  assert.ok(!validate(inst), 'refined schema forbids reliedUpon when fulfilledByItself=true');
});

check('generated example validates against the refined schema', () => {
  const example = generateExample(criterion, registry);
  const ok = validate(example);
  assert.ok(ok, `generated example invalid: ${JSON.stringify(validate.errors)}`);
  // Sanity: the example actually populated the required requirement fields.
  const req = example.partIV.selectionCriteria[CODE].requirement;
  assert.ok(Array.isArray(req.lotIdentifiers) && req.lotIdentifiers.length >= 1);
  assert.ok(Number.isInteger(req.numberOfYears));
});

if (failures) { console.error(`\n${failures} test(s) failed.`); process.exit(1); }
console.log('\nAll instance-schema generator tests passed.');
