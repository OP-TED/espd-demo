// EXPERIMENTAL — roundtrip test for Part IV (criterion C31, slc-stand-to-spec-avg).
//
// Unlike Part I/II/III (a single document per part), a selection criterion spans
// BOTH ESPD documents: the buyer's `requirement` maps to the REQUEST and the
// economic operator's `response` maps to the RESPONSE. So this part has TWO
// mapping specs and the round trip is verified per document:
//
//   requirement --(map req spec)--> REQUEST xml  --(unmap)--> { requirement }
//   response    --(map res spec)--> RESPONSE xml --(unmap)--> { response }
//
// The two reconstructed halves are then deep-merged and compared to the original
// instance. This is the first test to exercise the REQUEST/buyer side of the
// engine (cac:TenderingCriterionProperty with Expected*/MinimumAmount values) as
// well as data-sourced value attributes (currencyID) and the generic period
// object body on the response.
//
// Usage: node roundtrip-part-IV.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { map, unmap } from './mapper.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function load(rel) {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'legacy', rel), 'utf8'));
}

const requestSpec = load('xml-mapping/part-IV.request.mapping.json');
const responseSpec = load('xml-mapping/part-IV.response.mapping.json');

const CODE = 'slc-stand-to-spec-avg';

/** Deep-merge two plain-object trees (arrays and scalars replace). */
function merge(a, b) {
  if (Array.isArray(a) || Array.isArray(b) || typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return b === undefined ? a : b;
  }
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) {
    out[k] = k in a ? merge(a[k], v) : v;
  }
  return out;
}

/** Build an instance with only the `requirement` half of the criterion. */
function requirementOnly(instance) {
  const crit = instance.partIV.selectionCriteria[CODE];
  if (crit.requirement === undefined) return undefined;
  return { partIV: { selectionCriteria: { [CODE]: { requirement: crit.requirement } } } };
}

/** Build an instance with only the `response` half of the criterion. */
function responseOnly(instance) {
  const crit = instance.partIV.selectionCriteria[CODE];
  if (crit.response === undefined) return undefined;
  return { partIV: { selectionCriteria: { [CODE]: { response: crit.response } } } };
}

const cases = [
  {
    name: 'requirement only — buyer thresholds (multiple lots), no EO response yet',
    instance: {
      partIV: { selectionCriteria: { [CODE]: {
        requirement: {
          lotIdentifiers: ['LOT-0000', 'LOT-0001'],
          numberOfYears: 3,
          businessDomain: 'IT consulting and semantic interoperability.',
          minimumAmount: { value: 1000000, currency: 'EUR' }
        }
      } } }
    }
  },
  {
    name: 'full response — fulfils by itself; turnover (period+amount+evidence), startTrading (+evidence), criterion-level evidence',
    instance: {
      partIV: { selectionCriteria: { [CODE]: {
        requirement: {
          lotIdentifiers: ['LOT-0000'],
          numberOfYears: 3,
          businessDomain: 'IT consulting and semantic interoperability.',
          minimumAmount: { value: 1000000, currency: 'EUR' }
        },
        response: {
          fulfilledByItself: true,
          turnover: {
            period: { startDate: '2021-01-01', endDate: '2023-12-31' },
            amount: { value: 6200000, currency: 'EUR' },
            electronicEvidence: {
              availableElectronically: true,
              evidence: [
                { id: 'ev-turnover-1', url: 'https://reg.example.eu/accounts/1', identifier: 'ACC-1', description: 'Audited accounts.' }
              ]
            }
          },
          startTrading: {
            date: '2019-04-01',
            electronicEvidence: {
              availableElectronically: true,
              evidence: [
                { id: 'ev-start-1', url: 'https://reg.example.eu/registration', identifier: 'REG-1', description: 'Registration extract.' }
              ]
            }
          },
          electronicEvidence: {
            availableElectronically: true,
            evidence: [
              { id: 'ev-overall-1', url: 'https://reg.example.eu/overall', identifier: 'OV-1', description: 'Overall supporting document.' }
            ]
          }
        }
      } } }
    }
  },
  {
    name: 'response — EO relies on another entity; no evidence anywhere',
    instance: {
      partIV: { selectionCriteria: { [CODE]: {
        requirement: {
          lotIdentifiers: ['LOT-0002'],
          numberOfYears: 2,
          minimumAmount: { value: 500000, currency: 'SEK' }
        },
        response: {
          fulfilledByItself: false,
          reliedUpon: true,
          reliedUponEntity: { name: 'Parent Holding AB', id: 'SE556000000001' },
          turnover: {
            amount: { value: 900000, currency: 'SEK' },
            electronicEvidence: { availableElectronically: false }
          },
          startTrading: {
            date: '2020-02-02',
            electronicEvidence: { availableElectronically: false }
          },
          electronicEvidence: { availableElectronically: false }
        }
      } } }
    }
  },
  {
    name: 'full response — multiple evidence per block sharing the one cac:Evidence list',
    instance: {
      partIV: { selectionCriteria: { [CODE]: {
        requirement: {
          lotIdentifiers: ['LOT-0000', 'LOT-0003', 'LOT-0004'],
          numberOfYears: 5,
          businessDomain: 'Construction of public infrastructure.',
          minimumAmount: { value: 25000000, currency: 'EUR' }
        },
        response: {
          fulfilledByItself: true,
          turnover: {
            amount: { value: 31000000, currency: 'EUR' },
            electronicEvidence: {
              availableElectronically: true,
              evidence: [
                { id: 'ev-t-a', url: 'https://reg.example.eu/t-a', identifier: 'T-A', description: 'Turnover doc A.' },
                { id: 'ev-t-b', url: 'https://reg.example.eu/t-b', identifier: 'T-B', description: 'Turnover doc B.' }
              ]
            }
          },
          startTrading: {
            date: '2015-06-01',
            electronicEvidence: {
              availableElectronically: true,
              evidence: [
                { id: 'ev-s-a', url: 'https://reg.example.eu/s-a', identifier: 'S-A', description: 'Start doc A.' }
              ]
            }
          },
          electronicEvidence: {
            availableElectronically: true,
            evidence: [
              { id: 'ev-o-a', url: 'https://reg.example.eu/o-a', identifier: 'O-A', description: 'Overall doc A.' },
              { id: 'ev-o-b', url: 'https://reg.example.eu/o-b', identifier: 'O-B', description: 'Overall doc B.' }
            ]
          }
        }
      } } }
    }
  }
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
    console.log(`\u2713 roundtrip stable: ${name}`);
  } catch (err) {
    failures++;
    console.error(`\u2717 roundtrip MISMATCH: ${name}`);
    console.error('  original:     ', JSON.stringify(instance));
    console.error('  reconstructed:', JSON.stringify(reconstructed));
  }
}

if (failures > 0) {
  console.error(`\n${failures} roundtrip case(s) failed.`);
  process.exit(1);
}
console.log(`\nAll ${cases.length} roundtrip case(s) stable.`);
