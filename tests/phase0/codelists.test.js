// Phase 0 characterization — codelist availability for the UI.
//
// UPDATED at the Phase 4/5 cutover. The former js/codelists.js hard-coded
// tables (COUNTRY_CODES/PROCEDURE_TYPES/… + getCodelist(propertydatatype)) were
// replaced by a loader that fetches model/generated/codelists/<name>.json and
// resolves labels via i18n. The browser-facing getCodelist(name) now depends on
// fetch + the i18n catalogue, so it is exercised in the E2E layer; here we assert
// the DATA-LEVEL contract that backs it — the generated lists + the English
// catalogue still offer every code/label the UI relied on. This preserves the
// original parity intent (same options available) against the new source.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const read = (p) => JSON.parse(readFileSync(resolve(here, p), 'utf8'));
const clDir = '../../model/generated/codelists';
const list = (name) => read(`${clDir}/${name}.json`).codes;
const catalogue = read('../../i18n/i18n/en/espd.codelists.json');
const common = read('../../i18n/i18n/en/espd.common.json');
const labelOf = (labelKey) => catalogue[labelKey] ?? common[labelKey];

describe('phase0: codelists — the generated lists back the UI pickers', () => {
  it('the generated index lists the UI codelists', () => {
    const index = read(`${clDir}/index.json`);
    const names = index.codelists.map((c) => c.codelist);
    for (const n of ['country', 'eoid-type', 'economic-operator-size', 'eo-role-type', 'currency', 'docrefcontent-type']) {
      assert.ok(names.includes(n), `index includes ${n}`);
    }
  });

  it('every code carries a resolvable English label', () => {
    for (const name of ['country', 'eoid-type', 'economic-operator-size', 'eo-role-type', 'docrefcontent-type']) {
      for (const { code, labelKey } of list(name)) {
        assert.ok(code && code.length > 0, `${name} code non-empty`);
        const label = labelOf(labelKey);
        assert.ok(label && label.length > 0, `${name}.${code} has a label (${labelKey})`);
      }
    }
  });

  it('codes within a list are unique', () => {
    for (const name of ['country', 'eoid-type', 'economic-operator-size', 'eo-role-type', 'currency']) {
      const codes = list(name).map((e) => e.code);
      assert.equal(new Set(codes).size, codes.length, `${name} codes unique`);
    }
  });
});

describe('phase0: codelists — representative members the UI relies on', () => {
  it('country includes the EU member states the UI uses (alpha-3), BEL = Belgium', () => {
    const codes = new Set(list('country').map((e) => e.code));
    for (const c of ['BEL', 'FRA', 'DEU', 'ESP', 'ITA', 'NLD', 'POL', 'SWE']) {
      assert.ok(codes.has(c), `country has ${c}`);
    }
    assert.equal(labelOf('codelist.label.country.BEL'), 'Belgium');
  });

  it('eoid-type offers the five identifier-scheme codes', () => {
    const codes = list('eoid-type').map((e) => e.code).sort();
    assert.deepEqual(codes, ['BRIS', 'DUNS', 'LEI', 'NATIONAL', 'VAT']);
  });

  it('currency includes EUR', () => {
    assert.ok(list('currency').some((e) => e.code === 'EUR'));
    assert.equal(labelOf('codelist.label.currency.EUR'), 'Euro');
  });

  it('procurement-procedure-type (not shipped as .gc) still offers open/restricted via the common catalogue', () => {
    // Carried inline by js/codelists.js UNSHIPPED fallback; labels in espd.common.json.
    assert.equal(common['codelist.label.procurement-procedure-type.open'], 'Open procedure');
    assert.equal(common['codelist.label.procurement-procedure-type.restricted'], 'Restricted procedure');
  });
});
