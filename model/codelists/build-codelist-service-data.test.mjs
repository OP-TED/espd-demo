// UX1 — tests for the UI codelist service-data build.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCodelistServiceData } from './build-codelist-service-data.mjs';
import { readCodelistEntries, codelistPath } from './read-codelist.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const governance = JSON.parse(fs.readFileSync(path.join(here, 'governance.json'), 'utf8'));

// Build in-memory (write:false) so tests don't depend on disk state.
const { index, files } = buildCodelistServiceData({ write: false });
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
  // Not-shipped lists must NOT be emitted even if useForUI.
  assert.ok(!byName.has('procurement-procedure-type'));
});

test('an EU authority list carries multilingual labels and its listId', () => {
  const country = byName.get('country');
  assert.ok(country, 'country emitted');
  assert.equal(country.listId, 'http://publications.europa.eu/resource/authority/country');
  const and = country.codes.find(c => c.code === 'AND');
  assert.equal(and.labels.eng, 'Andorra');
  assert.equal(and.labels.fra, 'Andorre');
  assert.ok(country.languages.includes('eng') && country.languages.includes('fra'));
  assert.ok(country.languages.length >= 24, 'EU authority list has the full language set');
});

test('an ESPD-internal list falls back to English-only labels', () => {
  const fr = byName.get('financial-ratio-type');
  assert.ok(fr, 'financial-ratio-type emitted');
  assert.deepEqual(fr.languages, ['eng']);
  for (const c of fr.codes) {
    assert.deepEqual(Object.keys(c.labels), ['eng'], `${c.code} is English-only`);
    assert.ok(c.labels.eng.length > 0);
  }
});

test('counts match the underlying .gc row counts', () => {
  for (const [name, doc] of byName) {
    const gc = governance.codelists[name].gc;
    const entries = readCodelistEntries(codelistPath(gc));
    assert.equal(doc.count, entries.length, `${name} count`);
    assert.equal(doc.codes.length, entries.length, `${name} codes length`);
  }
});

test('every emitted code has a non-empty code value', () => {
  for (const [name, doc] of byName) {
    for (const c of doc.codes) {
      assert.ok(typeof c.code === 'string' && c.code.length > 0, `${name} code present`);
      assert.ok(c.labels && typeof c.labels === 'object', `${name}/${c.code} has a labels map`);
    }
  }
});

test('the lists actually used by the model are fully English-labelled', () => {
  // The small, curated lists our schema/forms reference must have a usable label
  // for every code. (The giant OP authority lists — notably `language`, 8187
  // codes — legitimately carry unlabelled entries in the source; we do not
  // invent labels for them. See the governance REVIEW note on `language`.)
  const curated = ['financial-ratio-type', 'boolean-gui-control-type', 'eoid-type',
    'docrefcontent-type', 'eo-role-type', 'economic-operator-size', 'access-right'];
  for (const name of curated) {
    const doc = byName.get(name);
    assert.ok(doc, `${name} emitted`);
    for (const c of doc.codes) {
      assert.ok(c.labels.eng && c.labels.eng.length > 0, `${name}/${c.code} has an English label`);
    }
  }
});

test('country and currency are overwhelmingly labelled (sanity on the big authority lists)', () => {
  for (const name of ['country', 'currency']) {
    const doc = byName.get(name);
    const labelled = doc.codes.filter(c => c.labels.eng).length;
    assert.ok(labelled / doc.codes.length > 0.95, `${name}: ${labelled}/${doc.codes.length} English-labelled`);
  }
});

test('the index lists every emitted codelist with size + languages', () => {
  assert.equal(index.codelists.length, byName.size);
  for (const row of index.codelists) {
    const doc = byName.get(row.codelist);
    assert.ok(doc, `${row.codelist} has a doc`);
    assert.equal(row.count, doc.count);
    assert.deepEqual(row.languages, doc.languages);
  }
});

test('the build is deterministic (idempotent in memory)', () => {
  const a = JSON.stringify(buildCodelistServiceData({ write: false }).index);
  const b = JSON.stringify(buildCodelistServiceData({ write: false }).index);
  assert.equal(a, b);
});
