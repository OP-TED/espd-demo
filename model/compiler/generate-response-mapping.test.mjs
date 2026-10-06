// Task 3.2 test — response-mapping generator produces a valid spec that
// roundtrips the full C31 response half through mapper.mjs.
//
// Usage: node generate-response-mapping.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { readStructuralCore } from './read-structural-core.mjs';
import { overlayEnrichment } from './overlay-enrichment.mjs';
import { loadValidatedRegistry } from './value-type-registry.mjs';
import { generateResponseMapping } from './generate-response-mapping.mjs';
import { map, unmap } from '../xml-mapping/mapper.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const edm = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const CODE = 'slc-stand-to-spec-avg';

const core = readStructuralCore(edm, CODE);
const sidecar = JSON.parse(fs.readFileSync(path.join(here, 'sources', `${CODE}.sidecar.json`), 'utf8'));
const criterion = overlayEnrichment(core, sidecar);
const { registry } = loadValidatedRegistry();
const spec = generateResponseMapping(criterion, registry);

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`\u2713 ${name}`); }
  catch (err) { failures++; console.error(`\u2717 ${name}: ${err.message.split('\n')[0]}`); }
}

const responseRecord = spec.rules.find(r => r.records === 'cac:TenderingCriterionResponse');
const entriesByKey = Object.fromEntries(responseRecord.entries.map(e => [e.key, e]));

check('target root is QualificationApplicationResponse', () => {
  assert.equal(spec.target.root, 'QualificationApplicationResponse');
});

check('one TenderingCriterionResponse record with entries keyed by responsepath (/R1)', () => {
  assert.ok(responseRecord, 'response record present');
  assert.ok(responseRecord.entries.length >= 13, `expected 13 answer entries, got ${responseRecord.entries.length}`);
  for (const e of responseRecord.entries) assert.ok(e.key.endsWith('/R1'), `entry key must end /R1: ${e.key}`);
});

check('INDICATOR -> value cac:ResponseValue/cbc:ResponseIndicator (boolean)', () => {
  const e = entriesByKey['C31_slc-stand-to-spec-avg/RG1/RSG1/QSG1/Q1/R1'];
  assert.equal(e.value.to, 'cac:ResponseValue/cbc:ResponseIndicator');
  assert.equal(e.value.type, 'boolean');
  assert.ok(e.value.from.endsWith('response.fulfilledByItself'));
});

check('AMOUNT -> value cac:ResponseValue/cbc:ResponseAmount with currencyID from currency', () => {
  const e = entriesByKey['C31_slc-stand-to-spec-avg/RG1/RSG1/QSG2/Q2/R1'];
  assert.equal(e.value.to, 'cac:ResponseValue/cbc:ResponseAmount');
  assert.equal(e.value.attributes.currencyID.from, 'partIV.selectionCriteria.slc-stand-to-spec-avg.response.turnover.amount.currency');
});

check('PERIOD -> object cac:ApplicablePeriod with StartDate/EndDate fields', () => {
  const e = entriesByKey['C31_slc-stand-to-spec-avg/RG1/RSG1/QSG2/Q1/R1'];
  assert.equal(e.object.to, 'cac:ApplicablePeriod');
  const tos = e.object.fields.map(f => f.to);
  assert.ok(tos.includes('cbc:StartDate') && tos.includes('cbc:EndDate'));
});

check('EVIDENCE_IDENTIFIER -> references with resolve to cac:Evidence', () => {
  const e = entriesByKey['C31_slc-stand-to-spec-avg/RG1/RSG1/QSG2/QSG1/QSG1/Q1/R1'];
  assert.equal(e.references.to, 'cac:EvidenceSupplied/cbc:ID');
  assert.equal(e.references.resolve.records, 'cac:Evidence');
});

check('three export-only cac:Evidence record rules (importVia references)', () => {
  const evRules = spec.rules.filter(r => r.records === 'cac:Evidence');
  assert.equal(evRules.length, 3);
  for (const r of evRules) assert.equal(r.importVia, 'references');
});

// Strongest check: full response half roundtrips through mapper.mjs.
check('full C31 response roundtrips through mapper.mjs', () => {
  const response = {
    fulfilledByItself: false,
    reliedUpon: true,
    reliedUponEntity: { name: 'Partner Co', id: 'EO-9' },
    turnover: {
      period: { startDate: '2021-01-01', endDate: '2023-12-31' },
      amount: { value: 2500000, currency: 'EUR' },
      electronicEvidence: { availableElectronically: true, evidence: [{ id: 'ev-t-a', url: 'https://e/t-a', identifier: 'T-A', description: 'Turnover A' }] },
    },
    startTrading: {
      date: '2015-06-01',
      electronicEvidence: { availableElectronically: true, evidence: [{ id: 'ev-s-a', url: 'https://e/s-a', identifier: 'S-A', description: 'Start A' }] },
    },
    electronicEvidence: { availableElectronically: true, evidence: [{ id: 'ev-o-a', url: 'https://e/o-a', identifier: 'O-A', description: 'Overall A' }] },
  };
  const instance = { partIV: { selectionCriteria: { [CODE]: { response } } } };
  const xml = map(spec, instance);
  const back = unmap(spec, xml);
  assert.deepEqual(back.partIV.selectionCriteria[CODE].response, response);
});

if (failures) { console.error(`\n${failures} test(s) failed.`); process.exit(1); }
console.log('\nAll response-mapping generator tests passed.');
