// EXPERIMENTAL — roundtrip test proving one spec drives both directions.
//   instance JSON --(map)--> XML --(unmap)--> instance JSON  ==  original
//
// Usage: node roundtrip.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { map, unmap } from './mapper.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function load(rel) {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'legacy', rel), 'utf8'));
}

const spec = load('xml-mapping/part-I.mapping.json');

const cases = [
  { name: 'TED_CN with number + url (default example)', instance: load('instance-data/part-I.example.json') },
  {
    name: 'TED_CN without url (identifier only)',
    instance: {
      partI: {
        publication: { reference: { type: 'TED_CN', identifier: '2024/S 200-654321' } },
        contractingAuthority: {
          officialName: 'Agence des Marchés',
          country: 'FR',
          identifier: { value: 'FR-12345', scheme: 'NATIONAL' }
        },
        procedure: { title: 'Travaux de rénovation', fileReference: 'AO-2024-77', procedureType: 'restricted' }
      }
    }
  },
  {
    name: 'NOJCN national journal reference',
    instance: {
      partI: {
        publication: { reference: { type: 'NOJCN', identifier: 'BOE-2024-99', url: 'https://boe.es/notice/2024-99' } },
        contractingAuthority: {
          officialName: 'Ayuntamiento de Madrid',
          country: 'ES',
          identifier: { value: 'ES-P2807900B', scheme: 'NATIONAL' }
        },
        procedure: { title: 'Servicios de limpieza', fileReference: 'CL-2024-11', procedureType: 'open' }
      }
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
