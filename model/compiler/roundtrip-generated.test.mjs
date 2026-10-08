// Task 3.3 — combined roundtrip for the GENERATED C31 request + response specs.
//
// Proves the generated specs are consumed by mapper.mjs with NO manual editing:
// both specs are produced by the compiler at runtime from the compiled criterion.
// Mirrors the existing roundtrip-part-IV approach:
//
//   requirement --(gen req spec)--> REQUEST xml  --(unmap)--> { requirement }
//   response    --(gen res spec)--> RESPONSE xml --(unmap)--> { response }
//   merge(reconstructed halves) === original instance
//
// Usage: node roundtrip-generated.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { readStructuralCore } from './read-structural-core.mjs';
import { overlayEnrichment } from './overlay-enrichment.mjs';
import { loadValidatedRegistry } from './value-type-registry.mjs';
import { generateRequestMapping } from './generate-request-mapping.mjs';
import { generateResponseMapping } from './generate-response-mapping.mjs';
import { map, unmap } from '../xml-mapping/mapper.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const edm = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const CODE = 'slc-stand-to-spec-avg';

const core = readStructuralCore(edm, CODE);
const sidecar = JSON.parse(fs.readFileSync(path.join(here, '..', 'model-sources', 'criteria', `${CODE}.sidecar.json`), 'utf8'));
const criterion = overlayEnrichment(core, sidecar);
const { registry } = loadValidatedRegistry();

// Generated at runtime — NO manual editing, NO files.
const requestSpec = generateRequestMapping(criterion, registry);
const responseSpec = generateResponseMapping(criterion, registry);

/** Deep-merge (arrays/scalars replace). */
function merge(a, b) {
  if (Array.isArray(a) || Array.isArray(b) || typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return b === undefined ? a : b;
  }
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = k in a ? merge(a[k], v) : v;
  return out;
}
function requirementOnly(instance) {
  const crit = instance.partIV.selectionCriteria[CODE];
  if (crit.requirement === undefined) return undefined;
  return { partIV: { selectionCriteria: { [CODE]: { requirement: crit.requirement } } } };
}
function responseOnly(instance) {
  const crit = instance.partIV.selectionCriteria[CODE];
  if (crit.response === undefined) return undefined;
  return { partIV: { selectionCriteria: { [CODE]: { response: crit.response } } } };
}

const cases = [
  {
    name: 'requirement only — buyer thresholds (multiple lots)',
    instance: { partIV: { selectionCriteria: { [CODE]: {
      requirement: {
        lotIdentifiers: ['LOT-0000', 'LOT-0001'],
        numberOfYears: 3,
        businessDomain: 'IT consulting and semantic interoperability.',
        minimumAmount: { value: 1000000, currency: 'EUR' },
      },
    } } } },
  },
  {
    name: 'full requirement + response — fulfils by itself=false, relied-upon branch, turnover, startTrading, criterion evidence',
    instance: { partIV: { selectionCriteria: { [CODE]: {
      requirement: {
        lotIdentifiers: ['LOT-0000'],
        numberOfYears: 3,
        businessDomain: 'Construction works.',
        minimumAmount: { value: 5000000, currency: 'EUR' },
      },
      response: {
        fulfilledByItself: false,
        reliedUpon: true,
        reliedUponEntity: { name: 'Partner Co', id: 'EO-9' },
        turnover: {
          period: { startDate: '2021-01-01', endDate: '2023-12-31' },
          amount: { value: 2500000, currency: 'EUR' },
          electronicEvidence: { availableElectronically: true, evidence: [
            { id: 'ev-t-a', url: 'https://e/t-a', identifier: 'T-A', description: 'Turnover A' },
            { id: 'ev-t-b', url: 'https://e/t-b', identifier: 'T-B', description: 'Turnover B' },
          ] },
        },
        startTrading: {
          date: '2015-06-01',
          electronicEvidence: { availableElectronically: true, evidence: [
            { id: 'ev-s-a', url: 'https://e/s-a', identifier: 'S-A', description: 'Start A' },
          ] },
        },
        electronicEvidence: { availableElectronically: true, evidence: [
          { id: 'ev-o-a', url: 'https://e/o-a', identifier: 'O-A', description: 'Overall A' },
        ] },
      },
    } } } },
  },
];

let failures = 0;
for (const { name, instance } of cases) {
  const req = requirementOnly(instance);
  const res = responseOnly(instance);
  let reconstructed = {};
  if (req) reconstructed = merge(reconstructed, unmap(requestSpec, map(requestSpec, req)));
  if (res) reconstructed = merge(reconstructed, unmap(responseSpec, map(responseSpec, res)));
  try {
    assert.deepEqual(reconstructed, instance);
    console.log(`\u2713 generated specs roundtrip: ${name}`);
  } catch (err) {
    failures++;
    console.error(`\u2717 ${name}:\n${err.message}`);
  }
}

if (failures) { console.error(`\n${failures} roundtrip case(s) failed.`); process.exit(1); }
console.log('\nAll generated-spec roundtrip tests passed.');
