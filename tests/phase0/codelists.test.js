// Phase 0 characterization — js/codelists.js (hard-coded tables + getCodelist).
// Locks down the CURRENT codelist resolution so the rebuild (which will fetch
// model/generated/codelists/*.json and resolve labels via i18n keys) can be
// proven to preserve the same codes/options the UI shows today.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getCodelist,
  COUNTRY_CODES,
  PROCEDURE_TYPES,
  BOOLEAN_CODES,
  CURRENCY_CODES,
  EOID_TYPES,
} from '../../js/codelists.js';

describe('phase0: codelists — getCodelist(propertydatatype) resolution', () => {
  it('maps each code-valued datatype to its table (current behaviour)', () => {
    assert.equal(getCodelist('CODE_COUNTRY'), COUNTRY_CODES);
    assert.equal(getCodelist('CODE'), PROCEDURE_TYPES);
    assert.equal(getCodelist('CODE_BOOLEAN'), BOOLEAN_CODES);
    assert.equal(getCodelist('CODE_EOID_TYPE'), EOID_TYPES);
  });

  it('returns null for datatypes with no hard-coded table', () => {
    // Characterization: today the UI has no table for these; the rebuild will
    // resolve them from the field.codelist name instead.
    assert.equal(getCodelist('DESCRIPTION'), null);
    assert.equal(getCodelist('INDICATOR'), null);
    assert.equal(getCodelist('AMOUNT'), null);
    assert.equal(getCodelist(undefined), null);
  });
});

describe('phase0: codelists — table shape + representative members', () => {
  const tables = { COUNTRY_CODES, PROCEDURE_TYPES, BOOLEAN_CODES, CURRENCY_CODES, EOID_TYPES };

  it('every table entry is a { code, name } pair with non-empty strings', () => {
    for (const [tableName, table] of Object.entries(tables)) {
      assert.ok(Array.isArray(table) && table.length > 0, `${tableName} is a non-empty array`);
      for (const entry of table) {
        assert.equal(typeof entry.code, 'string', `${tableName} entry has a string code`);
        assert.ok(entry.code.length > 0, `${tableName} code is non-empty`);
        assert.equal(typeof entry.name, 'string', `${tableName} entry has a string name`);
        assert.ok(entry.name.length > 0, `${tableName} name is non-empty`);
      }
    }
  });

  it('codes within a table are unique', () => {
    for (const [tableName, table] of Object.entries(tables)) {
      const codes = table.map(e => e.code);
      assert.equal(new Set(codes).size, codes.length, `${tableName} codes are unique`);
    }
  });

  // Representative members the current UI relies on — the rebuild must still
  // offer these (resolved from the richer generated codelists).
  it('country table includes the EU member states the UI uses (alpha-3)', () => {
    const codes = new Set(COUNTRY_CODES.map(e => e.code));
    for (const c of ['BEL', 'FRA', 'DEU', 'ESP', 'ITA', 'NLD', 'POL', 'SWE']) {
      assert.ok(codes.has(c), `country table has ${c}`);
    }
    assert.equal(COUNTRY_CODES.find(e => e.code === 'BEL').name, 'Belgium');
  });

  it('EOID types are the five scheme codes the identifier field offers', () => {
    assert.deepEqual(EOID_TYPES.map(e => e.code), ['VAT', 'NATIONAL', 'LEI', 'BRIS', 'DUNS']);
  });

  it('boolean codelist offers the three current options', () => {
    assert.deepEqual(BOOLEAN_CODES.map(e => e.code), ['TRUE', 'FALSE', 'NOT_APPLICABLE']);
  });

  it('procedure types include open and restricted', () => {
    const codes = new Set(PROCEDURE_TYPES.map(e => e.code));
    assert.ok(codes.has('open') && codes.has('restricted'));
  });

  it('currency table includes EUR', () => {
    assert.ok(CURRENCY_CODES.some(e => e.code === 'EUR'));
  });
});
