// Roundtrip of the PUBLISHED request + response mapping specs through the mapper.
//
// The mapping specs are produced upstream (espd-tools/model-compiler) and published in
// ESPD-EDM/model; this app vendors them under model/generated/xml-mapping/. This test is
// the CONTRACT check from the consumer's side: the published specs are consumed by
// mapper.mjs with no manual editing.
//
//   requirement --(request spec)--> REQUEST xml  --(unmap)--> { requirement }
//   response    --(response spec)--> RESPONSE xml --(unmap)--> { response }
//   merge(reconstructed halves) === original instance
//
// 1. Two hand-written cases for the widest criterion (C31), with lots, a relied-upon
//    branch and evidence.
// 2. EVERY published criterion: its published example survives the same roundtrip.
//
// Usage: node roundtrip-generated.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { map, unmap } from '../mapping-engine/mapper.mjs';
import { generatedRoot, criterionKeys, loadCompiled } from './published-model.mjs';

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(generatedRoot, rel), 'utf8'));
const specOf = (key, side) => {
  const rel = `xml-mapping/${key}.${side}.mapping.json`;
  return fs.existsSync(path.join(generatedRoot, rel)) ? readJson(rel) : null;
};

/** Deep-merge (arrays/scalars replace). */
function merge(a, b) {
  if (Array.isArray(a) || Array.isArray(b) || typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return b === undefined ? a : b;
  }
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) out[k] = k in a ? merge(a[k], v) : v;
  return out;
}

/** Roundtrip one instance through the criterion's request and response specs. */
function roundtrip(instance, requestSpec, responseSpec, containerPath, key) {
  const dig = (o) => [...containerPath, key].reduce((x, k) => x?.[k], o);
  const wrap = (v) => [...containerPath, key].reduceRight((acc, k) => ({ [k]: acc }), v);
  const crit = dig(instance);
  let reconstructed = {};
  if (crit.requirement !== undefined && requestSpec) {
    const half = wrap({ requirement: crit.requirement });
    reconstructed = merge(reconstructed, unmap(requestSpec, map(requestSpec, half)));
  }
  if (crit.response !== undefined && responseSpec) {
    const half = wrap({ response: crit.response });
    reconstructed = merge(reconstructed, unmap(responseSpec, map(responseSpec, half)));
  }
  return reconstructed;
}

let failures = 0;
const ok = (name) => console.log(`\u2713 ${name}`);
const fail = (name, err) => { failures++; console.error(`\u2717 ${name}:\n${err.message}`); };

// --- 1. C31, hand-written cases ----------------------------------------------
const CODE = 'slc-stand-to-spec-avg';
const c31 = [
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
for (const { name, instance } of c31) {
  try {
    assert.deepEqual(roundtrip(instance, specOf(CODE, 'request'), specOf(CODE, 'response'), ['partIV', 'selectionCriteria'], CODE), instance);
    ok(`published specs roundtrip (C31): ${name}`);
  } catch (err) { fail(name, err); }
}

// --- 2. Every published criterion --------------------------------------------
// Criteria whose published example is known NOT to roundtrip, with the reason. An entry
// here is a documented limitation of the published mapping, not a licence to skip: the
// test also fails if a listed criterion starts to pass, so the list cannot go stale.
//
// All three are limitations of the published mapping generator (espd-tools/model-compiler),
// to be fixed there; they were found by this generic roundtrip, which no hand-picked probe
// covered.
const KNOWN_NOT_ROUNDTRIPPING = new Map([
  ['slc-stand-ratio',
    'a numeric QUANTITY answer comes back as a string (ratioAnswer 1000 -> "1000"): the response mapping has no numeric type'],
  ['slc-suit-reg-trade',
    "the buyer's registerUrl (value type URL) has no REQUEST binding in the value-type registry (URL is response-only), so it is not written to the Request"],
  ['slc-stand-other',
    'the branching criterion (rating / descriptive / amountRequirements) loses requirement leaves (requirementType, rating.description, rating.minimumRating, descriptive.requirement), gains extra amountRequirements items, and returns rating.rating as a string'],
]);

const keys = criterionKeys();
const notRoundtripping = [];
const noMappings = [];
for (const key of keys) {
  const { criterion } = loadCompiled(key);
  const m = criterion.instanceModel;
  const requestSpec = specOf(key, 'request');
  const responseSpec = specOf(key, 'response');
  if (!requestSpec && !responseSpec) { noMappings.push(key); continue; }
  const example = readJson(`instance-data/${key}.example.json`);
  try {
    assert.deepEqual(roundtrip(example, requestSpec, responseSpec, m.containerPath, criterion[m.key.source]), example);
  } catch (err) {
    notRoundtripping.push({ key, message: err.message.split('\n').slice(0, 8).join('\n') });
  }
}

const unexpected = notRoundtripping.filter(f => !KNOWN_NOT_ROUNDTRIPPING.has(f.key));
const stale = [...KNOWN_NOT_ROUNDTRIPPING.keys()].filter(k => !notRoundtripping.some(f => f.key === k));
if (unexpected.length) {
  failures++;
  console.error(`\u2717 ${unexpected.length} published criteria do not roundtrip their example:`);
  for (const f of unexpected) console.error(`   - ${f.key}\n${f.message.split('\n').map(l => '       ' + l).join('\n')}`);
} else {
  ok(`every published example roundtrips through its published specs (${keys.length - noMappings.length - notRoundtripping.length}/${keys.length}${noMappings.length ? `; ${noMappings.length} without mappings` : ''}${notRoundtripping.length ? `; ${notRoundtripping.length} known limitations` : ''})`);
}
if (stale.length) { failures++; console.error(`\u2717 listed as not roundtripping but now pass: ${stale.join(', ')} — remove from KNOWN_NOT_ROUNDTRIPPING`); }
if (noMappings.length) console.log(`  note: no mappings published for: ${noMappings.join(', ')}`);

if (failures) { console.error(`\n${failures} roundtrip check(s) failed.`); process.exit(1); }
console.log('\nAll published-spec roundtrip tests passed.');
