// EXPERIMENTAL — roundtrip test for Part III (criterion C01, exg-crim-part).
//   instance JSON --(map)--> XML --(unmap)--> instance JSON  ==  original
//
// This increment maps the full flat criterion-response model for C01:
//   - top-level answer + electronic-evidence indicator,
//   - repeating conviction groups (0..n), each with self-cleaning,
//   - cross-linked evidence documents (cac:Evidence <- cac:EvidenceSupplied).
// exclusionPeriod maps structured startDate/endDate to cac:ApplicablePeriod
// (BR-TCR-08-09); a description-only period has no ApplicablePeriod home and is
// a documented gap, so cases use start/end dates.
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
    name: 'YES — one conviction, self-cleaning taken, one evidence document',
    instance: {
      partIII: { exclusionGrounds: { 'exg-crim-part': {
        answer: true,
        convictions: [
          {
            dateOfConviction: '2021-06-15',
            reason: 'Participation in a criminal organisation.',
            whoConvicted: 'A former board member.',
            exclusionPeriod: { startDate: '2021-06-15', endDate: '2023-06-15' },
            selfCleaning: { taken: true, description: 'Dismissed the individual; strengthened controls.' }
          }
        ],
        electronicEvidence: {
          availableElectronically: true,
          evidence: [
            { id: 'ev-1', url: 'https://ecris.example.eu/records/12345', identifier: 'ECRIS-12345', description: 'ECRIS extract.' }
          ]
        }
      } } }
    }
  },
  {
    name: 'YES — three convictions (mixed self-cleaning), two evidence documents',
    instance: {
      partIII: { exclusionGrounds: { 'exg-crim-part': {
        answer: true,
        convictions: [
          {
            dateOfConviction: '2019-03-01',
            reason: 'First conviction reason.',
            whoConvicted: 'Former director A.',
            selfCleaning: { taken: true, description: 'Measures for conviction one.' }
          },
          {
            dateOfConviction: '2020-07-22',
            reason: 'Second conviction reason.',
            whoConvicted: 'Former director B.',
            exclusionPeriod: { startDate: '2020-07-22', endDate: '2023-07-22' },
            selfCleaning: { taken: false }
          },
          {
            dateOfConviction: '2022-11-30',
            reason: 'Third conviction reason.',
            whoConvicted: 'A subsidiary entity.'
          }
        ],
        electronicEvidence: {
          availableElectronically: true,
          evidence: [
            { id: 'ev-a', url: 'https://reg.example.eu/a', identifier: 'DOC-A', description: 'Document A.' },
            { id: 'ev-b', url: 'https://reg.example.eu/b', identifier: 'DOC-B', description: 'Document B.' }
          ]
        }
      } } }
    }
  },
  {
    name: 'YES — one conviction, no self-cleaning, evidence not available electronically',
    instance: {
      partIII: { exclusionGrounds: { 'exg-crim-part': {
        answer: true,
        convictions: [
          {
            dateOfConviction: '2018-05-05',
            reason: 'Conviction reason.',
            whoConvicted: 'The economic operator itself.'
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
