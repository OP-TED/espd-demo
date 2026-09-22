// EXPERIMENTAL — roundtrip test for Part III (criterion C01, exg-crim-part).
//   instance JSON --(map)--> XML --(unmap)--> instance JSON  ==  original
//
// This increment maps the FLAT criterion-response model: the top-level answer,
// the self-cleaning / electronic-evidence indicators, and the scalar detail of
// the FIRST conviction (see part-III.mapping.json $notes). The roundtrip cases
// therefore cover exactly that subset — nested `evidence` documents, structured
// `exclusionPeriod` dates, and 2..n convictions are the documented next
// increment and are intentionally NOT exercised here.
//
// Usage: node roundtrip-part-III.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { map, unmap } from './mapper.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function load(rel) {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, rel), 'utf8'));
}

const spec = load('part-III.mapping.json');

const cases = [
  {
    name: 'ground answered NO — bare answer only',
    instance: {
      partIII: { exclusionGrounds: { 'exg-crim-part': { answer: false } } }
    }
  },
  {
    name: 'ground answered YES — one conviction, self-cleaning taken, evidence available',
    instance: {
      partIII: { exclusionGrounds: { 'exg-crim-part': {
        answer: true,
        convictions: [
          {
            dateOfConviction: '2021-06-15',
            reason: 'Participation in a criminal organisation.',
            whoConvicted: 'A former board member.',
            exclusionPeriod: { description: 'Two years from the final judgement.' },
            selfCleaning: { taken: true, description: 'Dismissed the individual; strengthened controls.' }
          }
        ],
        electronicEvidence: { availableElectronically: true }
      } } }
    }
  },
  {
    name: 'ground answered YES — one conviction, no self-cleaning, no e-evidence',
    instance: {
      partIII: { exclusionGrounds: { 'exg-crim-part': {
        answer: true,
        convictions: [
          {
            dateOfConviction: '2019-01-10',
            reason: 'Conviction reason.',
            whoConvicted: 'The economic operator itself.',
            selfCleaning: { taken: false }
          }
        ],
        electronicEvidence: { availableElectronically: false }
      } } }
    }
  }
];

let failures = 0;
for (const { name, instance } of cases) {
  const xml = map(spec, instance);
  const reconstructed = unmap(spec, xml);
  try {
    assert.deepEqual(reconstructed, instance);
    console.log(`✓ roundtrip stable: ${name}`);
  } catch (err) {
    failures++;
    console.error(`✗ roundtrip MISMATCH: ${name}`);
    console.error('  original:     ', JSON.stringify(instance));
    console.error('  reconstructed:', JSON.stringify(reconstructed));
  }
}

if (failures > 0) {
  console.error(`\n${failures} roundtrip case(s) failed.`);
  process.exit(1);
}
console.log(`\nAll ${cases.length} roundtrip case(s) stable.`);
