// Task 2.2 test — codelist-attribute profile + Schematron cross-check.
//
// Usage: node codelist-attributes.test.mjs

import assert from 'node:assert/strict';
import {
  loadCodelistProfile, attributesFor, validateCodelistProfile,
  loadValidatedCodelistProfile, parseSchematronAttributeRules,
} from './codelist-attributes.mjs';

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`\u2713 ${name}`); }
  catch (err) { failures++; console.error(`\u2717 ${name}: ${err.message.split('\n')[0]}`); }
}
function expectThrow(name, fn, snippet) {
  try { fn(); failures++; console.error(`\u2717 ${name}: expected error, none thrown`); }
  catch (err) {
    if (snippet && !err.message.includes(snippet)) {
      failures++; console.error(`\u2717 ${name}: error missing '${snippet}' (got: ${err.message.split('\n')[0]})`);
    } else console.log(`\u2713 ${name}`);
  }
}

// Profile matches the Schematron exactly for every mapped codelist.
check('profile validates against the real Schematron', () => {
  const { checked } = loadValidatedCodelistProfile();
  assert.ok(checked >= 4, `expected several codelists cross-checked, got ${checked}`);
});

// attributesFor returns the fixed set without annotation keys.
check('attributesFor(response-data-type) returns the fixed Schematron set', () => {
  const profile = loadCodelistProfile();
  const a = attributesFor(profile, 'response-data-type');
  assert.equal(a.listID, 'response-data-type');
  assert.equal(a.listVersionID, '5.0.0');
  assert.ok(!('$note' in a), 'annotation keys must be stripped');
});

// criterion-id (UBL scheme) resolves even though it is not a Schematron rule.
check('attributesFor(criterion-id) returns schemeID/schemeAgencyID/schemeVersionID', () => {
  const profile = loadCodelistProfile();
  const a = attributesFor(profile, 'criterion-id');
  assert.deepEqual(a, { schemeID: 'criterion', schemeAgencyID: 'OP', schemeVersionID: '5.0.0' });
});

// Fail: a drifted value is rejected by the cross-check.
expectThrow('drifted listVersionID is rejected', () => {
  const profile = loadCodelistProfile();
  profile.codelists['response-data-type'].listVersionID = '9.9.9';
  validateCodelistProfile(profile);
}, "requires '5.0.0'");

// Fail: a missing required attribute is rejected.
expectThrow('missing required attribute is rejected', () => {
  const profile = loadCodelistProfile();
  delete profile.codelists['criterion'].listID;
  validateCodelistProfile(profile);
}, 'missing required attribute');

// Fail: unknown codelist key.
expectThrow('unknown codelist key is rejected', () => {
  const profile = loadCodelistProfile();
  attributesFor(profile, 'no-such-list');
}, "no entry for 'no-such-list'");

// Schematron parser sanity.
check('schematron parser extracts the ValueDataTypeCode listID', () => {
  const rules = parseSchematronAttributeRules(
    `<rule context="cac:TenderingCriterionProperty/cbc:ValueDataTypeCode">` +
    `<assert test="(false() or not(@listID != 'response-data-type'))" flag="fatal">x</assert></rule>`
  );
  assert.equal(rules.get('cac:TenderingCriterionProperty/cbc:ValueDataTypeCode').get('listID'), 'response-data-type');
});

if (failures) { console.error(`\n${failures} test(s) failed.`); process.exit(1); }
console.log('\nAll codelist-attribute tests passed.');
