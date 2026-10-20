// Numeric answers must be stored as NUMBERS, not strings.
//
// A <input type="number">'s .value is always a string; the renderer coerces it
// to a real number before storing (js/renderer.js inputControl). If that
// coercion regresses, the instance carries e.g. "1000000" where the schema
// types the field as number/integer, and the in-app validator reports
// "This value is the wrong type" (observed on partIV numberOfYears and
// minimumAmount.value, partIII minimumAmount.value). This test pins the schema
// side of that contract: string values fail the type check, numbers pass.

import test from 'node:test';
import assert from 'node:assert/strict';
import * as validators from '../model/generated/ui/validators/index.mjs';

/** The `type`-keyword errors for a given validator + doc. */
function typeErrors(fn, doc) {
  fn(doc);
  return (fn.errors ?? []).filter((e) => e.keyword === 'type').map((e) => e.instancePath);
}

test('partIV numberOfYears / minimumAmount.value reject strings, accept numbers', () => {
  const fn = validators.partIV;
  const req = (numberOfYears, amountValue) => ({
    partIV: { selectionCriteria: { 'slc-stand-to-gen': { requirement: {
      lotIdentifiers: ['LOT-0000'], numberOfYears, minimumAmount: { value: amountValue, currency: 'EUR' },
    } } } },
  });

  const strErrs = typeErrors(fn, req('3', '1000000'));
  assert.ok(strErrs.some((p) => p.endsWith('/numberOfYears')), 'string numberOfYears is a type error');
  assert.ok(strErrs.some((p) => p.endsWith('/minimumAmount/value')), 'string amount value is a type error');

  const numErrs = typeErrors(fn, req(3, 1000000));
  assert.equal(numErrs.length, 0, 'numeric values produce no type error');
});

test('partIII minimumAmount.value rejects a string, accepts a number', () => {
  const fn = validators.partIII;
  const doc = (amountValue) => ({
    partIII: { exclusionGrounds: { 'exg-pmt-bre-tax': { requirement: {
      minimumAmount: { value: amountValue, currency: 'EUR' },
    } } } },
  });
  assert.ok(typeErrors(fn, doc('1000000')).some((p) => p.endsWith('/minimumAmount/value')),
    'string amount value is a type error');
  assert.ok(!typeErrors(fn, doc(1000000)).some((p) => p.endsWith('/minimumAmount/value')),
    'numeric amount value is accepted');
});
