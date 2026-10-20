// UX1 — tests for the UI codelist service-data build (i18n-key based, English-only).

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCodelistServiceData, codelistLabelKey } from './build-codelist-service-data.mjs';
import { readCodelistEntries, codelistPath } from './read-codelist.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const governance = JSON.parse(fs.readFileSync(path.join(here, 'governance.json'), 'utf8'));

// Build in-memory (write:false) so tests don't depend on disk state.
const { index, files, catalogue } = buildCodelistServiceData({ write: false });
const byName = new Map(files.map(f => [f.name, f.doc]));

test('every shipped + useForUI governance list is emitted, and nothing else', () => {
  const expected = Object.entries(governance.codelists)
    .filter(([, d]) => d.shipped && d.useForUI && d.gc)
    .map(([name]) => name)
    .sort();
  const got = [...byName.keys()].sort();
  assert.deepEqual(got, expected);
  // Internal/structural lists (useForUI:false) must NOT be emitted.
  assert.ok(!byName.has('response-data-type'));
  assert.ok(!byName.has('criterion-element-type'));
  // `language` is useForUI:false (used nowhere) — must NOT be emitted.
  assert.ok(!byName.has('language'));
  // Not-shipped lists must NOT be emitted even if useForUI.
  assert.ok(!byName.has('procurement-procedure-type'));
});

test('service data lists codes with an i18n labelKey, carrying NO literal label', () => {
  const country = byName.get('country');
  assert.ok(country, 'country emitted');
  assert.equal(country.listId, 'http://publications.europa.eu/resource/authority/country');
  const and = country.codes.find(c => c.code === 'AND');
  assert.equal(and.labelKey, 'codelist.label.country.AND');
  // No literal label text embedded in the service data (it lives in the catalogue).
  assert.equal(and.label, undefined);
  assert.equal(and.labels, undefined);
});

test('the English catalogue resolves every emitted labelKey (English-only)', () => {
  for (const [name, doc] of byName) {
    for (const c of doc.codes) {
      assert.equal(c.labelKey, codelistLabelKey(name, c.code));
      assert.ok(catalogue[c.labelKey], `${c.labelKey} has an English label in the catalogue`);
    }
  }
  // The catalogue carries ONLY the comment + the emitted keys (no stray entries).
  const keyCount = Object.keys(catalogue).filter(k => k !== '_comment').length;
  const emitted = [...byName.values()].reduce((n, d) => n + d.codes.length, 0);
  assert.equal(keyCount, emitted);
});

test('labels are the English column only (multilingual columns ignored)', () => {
  assert.equal(catalogue['codelist.label.country.AND'], 'Andorra');     // eng_label
  assert.equal(catalogue['codelist.label.eo-role-type.group-lead'], 'Group leader');
  // A country whose English name differs from other languages proves we took eng.
  assert.equal(catalogue['codelist.label.country.FRA'] ?? 'France', 'France');
});

test('XML character entities in .gc labels are decoded (no &amp; in the UI text)', () => {
  // EOIDType DUNS is "Duns &amp; Bradstreet number" in the .gc; the catalogue
  // must carry the real ampersand so the dropdown shows "&", not "&amp;".
  // (The renderer sets option text via textContent, which re-escapes for display.)
  const label = catalogue['codelist.label.eoid-type.DUNS'];
  assert.equal(label, 'Duns & Bradstreet number');
  assert.ok(!label.includes('&amp;'), 'the stored label must not keep the XML escape');
});

test('counts match the underlying .gc row counts (minus governance exclusions)', () => {
  for (const [name, doc] of byName) {
    const def = governance.codelists[name];
    const gc = def.gc;
    const excluded = new Set(def.excludedCodes ?? []);
    const entries = readCodelistEntries(codelistPath(gc));
    const expected = entries.length - excluded.size;
    assert.equal(doc.count, expected, `${name} count`);
    assert.equal(doc.codes.length, expected, `${name} codes length`);
    // No excluded code may survive into the emitted service data.
    for (const ex of excluded) {
      assert.ok(!doc.codes.some(c => c.code === ex), `${name} excludes ${ex}`);
    }
  }
});

test('the curated lists used by the model are fully labelled', () => {
  const curated = ['financial-ratio-type', 'boolean-gui-control-type', 'eoid-type',
    'docrefcontent-type', 'eo-role-type', 'economic-operator-size', 'access-right',
    'country', 'currency'];
  for (const name of curated) {
    const doc = byName.get(name);
    assert.ok(doc, `${name} emitted`);
    assert.equal(doc.labelled, doc.count, `${name} fully labelled`);
  }
});

test('the index lists every emitted codelist with size + labelled count', () => {
  assert.equal(index.codelists.length, byName.size);
  for (const row of index.codelists) {
    const doc = byName.get(row.codelist);
    assert.ok(doc, `${row.codelist} has a doc`);
    assert.equal(row.count, doc.count);
    assert.equal(row.labelled, doc.labelled);
  }
});

test('the build is deterministic (idempotent in memory)', () => {
  const a = JSON.stringify(buildCodelistServiceData({ write: false }).index);
  const b = JSON.stringify(buildCodelistServiceData({ write: false }).index);
  assert.equal(a, b);
});
