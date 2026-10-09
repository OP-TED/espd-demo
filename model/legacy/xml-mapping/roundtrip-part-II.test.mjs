// EXPERIMENTAL — roundtrip test for Part II, covering the new `forEach` rule
// for repeating scalars (EO05 lots).
//   instance JSON --(map)--> XML --(unmap)--> instance JSON  ==  original
//
// Usage: node roundtrip-part-II.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { map, unmap } from '../../mapping-engine/mapper.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// This test lives in model/legacy/; paths resolve against the legacy root.
const legacy = (rel) => path.resolve(__dirname, '..', rel);

function load(rel) {
  return JSON.parse(fs.readFileSync(legacy(rel), 'utf8'));
}

const spec = load('xml-mapping/part-II.mapping.json');

const cases = [
  { name: 'default example (2 lots)', instance: load('instance-data/part-II.example.json') },
  {
    name: 'single lot',
    instance: {
      partII: {
        economicOperator: {
          officialName: 'Solo Corp',
          address: { street: 'Main St 1', postCode: '1000', city: 'Brussels', country: 'BE' }
        },
        lots: ['LOT-001']
      }
    }
  },
  {
    name: 'no lots (procedure not divided into lots) — lots key absent',
    instance: {
      partII: {
        economicOperator: {
          officialName: 'Solo Corp',
          address: { street: 'Main St 1', postCode: '1000', city: 'Brussels', country: 'BE' }
        }
      }
    }
  },
  {
    name: 'many lots (5)',
    instance: {
      partII: {
        economicOperator: {
          officialName: 'Consortium NV',
          address: { street: 'Havenlaan 9', postCode: '1080', city: 'Brussels', country: 'BE' }
        },
        lots: ['LOT-001', 'LOT-002', 'LOT-003', 'LOT-004', 'LOT-005']
      }
    }
  },
  {
    name: 'two representatives, one with full details, one minimal',
    instance: {
      partII: {
        economicOperator: {
          officialName: 'GreenOffice Supplies NV',
          address: { street: 'Industrieweg 42', postCode: '2000', city: 'Antwerp', country: 'BE' }
        },
        representatives: [
          {
            givenName: 'Jan',
            familyName: 'Van Acker',
            dateOfBirth: '1975-03-12',
            placeOfBirth: 'Antwerp',
            residenceAddress: { street: 'Lange Nieuwstraat 10', postCode: '2000', city: 'Antwerp', country: 'BE' },
            contact: { telephone: '+32 3 234 56 78', email: 'jan.vanacker@greenoffice-supplies.eu' },
            position: 'Managing Director'
          },
          {
            givenName: 'Sofie',
            familyName: 'Peeters',
            residenceAddress: { street: 'Meirstraat 3', postCode: '2018', city: 'Antwerp', country: 'BE' },
            position: 'Sales Director, procurement matters'
          }
        ]
      }
    }
  },
  {
    name: 'no representatives, no lots — only economicOperator present',
    instance: {
      partII: {
        economicOperator: {
          officialName: 'Solo Corp',
          address: { street: 'Main St 1', postCode: '1000', city: 'Brussels', country: 'BE' }
        }
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
