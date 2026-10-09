// EXPERIMENTAL — focused test for `value` body attributes in the `records`
// construct (added for BR-TCR-08 numeric datatypes used by selection criteria):
//   - a CONSTANT attribute (e.g. QUANTITY_YEAR -> cbc:ResponseQuantity@unitCode="YEAR")
//   - a DATA-SOURCED attribute (e.g. AMOUNT -> cbc:ResponseAmount@currencyID from data)
// C01 has no such fields, so this uses a small synthetic spec + instance to prove
// the engine handles both attribute kinds and roundtrips them.
//
// Usage: node records-value-attributes.test.mjs

import assert from 'node:assert/strict';
import { map, unmap } from './mapper.mjs';

const spec = {
  target: {
    root: 'QualificationApplicationResponse',
    namespaces: {
      '': 'urn:oasis:names:specification:ubl:schema:xsd:QualificationApplicationResponse-2',
      cac: 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
      cbc: 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2'
    }
  },
  rules: [
    {
      records: 'cac:TenderingCriterionResponse',
      key: { to: 'cac:ValidatedCriterionPropertyID/cbc:ID', attributes: { schemeID: 'criterion' } },
      entries: [
        {
          // QUANTITY_YEAR — constant unit attribute fixed by the question.
          key: 'C30/QG1/Q1',
          value: {
            from: 'partX.years',
            to: 'cac:ResponseValue/cbc:ResponseQuantity',
            type: 'string',
            attributes: { unitCode: 'YEAR' }
          }
        },
        {
          // AMOUNT — currency is entered by the EO, so it is data-sourced.
          key: 'C30/QG1/Q2',
          value: {
            from: 'partX.turnover.amount',
            to: 'cac:ResponseValue/cbc:ResponseAmount',
            type: 'string',
            attributes: { currencyID: { from: 'partX.turnover.currency' } }
          }
        }
      ]
    }
  ]
};

const instance = {
  partX: {
    years: '5',
    turnover: { amount: '45000000', currency: 'EUR' }
  }
};

const xml = map(spec, instance);

// The constant attribute must be present on the wire.
assert.ok(/<cbc:ResponseQuantity unitCode="YEAR">5<\/cbc:ResponseQuantity>/.test(xml),
  'constant unitCode attribute not emitted correctly');
// The data-sourced attribute must be present on the wire.
assert.ok(/<cbc:ResponseAmount currencyID="EUR">45000000<\/cbc:ResponseAmount>/.test(xml),
  'data-sourced currencyID attribute not emitted correctly');

// Roundtrip: the data-sourced attribute comes back; the constant one carries no
// instance data (it is not represented in the instance model), so the roundtrip
// target omits it — which is exactly the original instance.
const reconstructed = unmap(spec, xml);
assert.deepEqual(reconstructed, instance);

console.log('✓ value-body constant attribute emitted (unitCode="YEAR")');
console.log('✓ value-body data-sourced attribute emitted and roundtripped (currencyID)');
console.log('\nAll value-attribute case(s) stable.');
