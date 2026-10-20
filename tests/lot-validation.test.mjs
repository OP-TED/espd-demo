// Lot ≥1 validation (BR-LOT-41, client side).
//
// A selection criterion must reference at least one lot. The generated instance
// schema enforces this (lotIdentifiers is required with minItems:1 on the
// criterion's requirement). This test pins the two things the UI relies on:
//   1. the partIV validator flags an empty OR absent lot list;
//   2. ajvErrorDataPath maps those errors to the SAME dotted dataPath the
//      renderer puts on the lot-select wrapper (…requirement.lotIdentifiers,
//      WITHOUT the array `[]` marker), so showValidationErrors can highlight it.
// If these drift, the "choose at least one lot" error would silently fail to
// surface on the field.

import test from 'node:test';
import assert from 'node:assert/strict';
import * as validators from '../model/generated/ui/validators/index.mjs';
import { ajvErrorDataPath } from '../js/validation.js';

const CODE = 'slc-stand-to-spec-avg';
const LOT_FIELD_PATH = `partIV.selectionCriteria.${CODE}.requirement.lotIdentifiers`;

/** Run the partIV validator and return its errors array. */
function validate(doc) {
  const fn = validators.partIV;
  fn(doc);
  return fn.errors ?? [];
}

test('empty lot array fails with a minItems error on lotIdentifiers', () => {
  const errors = validate({
    partIV: { selectionCriteria: { [CODE]: { requirement: {
      lotIdentifiers: [], numberOfYears: 3, businessDomain: 'x', minimumAmount: { value: 5, currency: 'EUR' },
    } } } },
  });
  const lotErr = errors.find(e => e.keyword === 'minItems' && e.instancePath.endsWith('/lotIdentifiers'));
  assert.ok(lotErr, 'expected a minItems error on lotIdentifiers');
  assert.equal(ajvErrorDataPath(lotErr), LOT_FIELD_PATH, 'error dataPath must match the lot-select wrapper (no [])');
});

test('absent lot list fails with a required error naming lotIdentifiers', () => {
  const errors = validate({
    partIV: { selectionCriteria: { [CODE]: { requirement: {
      numberOfYears: 3, businessDomain: 'x', minimumAmount: { value: 5, currency: 'EUR' },
    } } } },
  });
  const lotErr = errors.find(e => e.keyword === 'required' && e.params?.missingProperty === 'lotIdentifiers');
  assert.ok(lotErr, 'expected a required error for lotIdentifiers');
  assert.equal(ajvErrorDataPath(lotErr), LOT_FIELD_PATH, 'error dataPath must match the lot-select wrapper (no [])');
});

test('a criterion with at least one lot passes the lot rule', () => {
  const errors = validate({
    partIV: { selectionCriteria: { [CODE]: { requirement: {
      lotIdentifiers: ['LOT-0000'], numberOfYears: 3, businessDomain: 'x', minimumAmount: { value: 5, currency: 'EUR' },
    } } } },
  });
  assert.ok(!errors.some(e => e.instancePath.endsWith('/lotIdentifiers')), 'no lot error when a lot is chosen');
});
