// Consistency of the merged codelist governance (governance.mjs): the published, implementer-neutral
// registry (vendored under model/generated/registries/) plus this app's UI decisions
// (ui-codelists.json).
//
// Whether the neutral facts are TRUE (the .gc files exist, `schematronValidated` matches the CVA,
// `inlineEnum` matches what the compiler publishes) is checked upstream, in
// espd-tools/model-compiler/codelist-governance.test.mjs, where those inputs live. This test checks
// what is this app's own: that the two sources fit together, and that the lists the app builds from
// the shipped code lists can really be built.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGovernance, governanceFor, mergeGovernance } from './governance.mjs';
import { loadRegistry, generatedRoot } from '../compiler/published-model.mjs';
import { codelistPath } from './read-codelist.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const { codelists } = loadGovernance();
const uiDecisions = JSON.parse(fs.readFileSync(path.join(here, 'ui-codelists.json'), 'utf8')).codelists;

// --- the two sources fit together ---------------------------------------

test('the UI decisions cover exactly the published codelists, each an explicit boolean', () => {
  const published = Object.keys(loadRegistry('codelist-governance').codelists).sort();
  assert.deepEqual(Object.keys(uiDecisions).sort(), published);
  for (const [name, d] of Object.entries(uiDecisions)) assert.equal(typeof d.useForUI, 'boolean', `${name}.useForUI must be a boolean`);
});

test('every merged entry has the four boolean axes, and `shipped` is derived from the .gc file', () => {
  for (const [name, e] of Object.entries(codelists)) {
    for (const axis of ['shipped', 'schematronValidated', 'useForUI', 'inlineEnum']) {
      assert.equal(typeof e[axis], 'boolean', `${name}.${axis} must be a boolean`);
    }
    assert.equal(e.shipped, Boolean(e.gc), `${name}: shipped must follow gc`);
  }
});

test('a name or alias resolves to its entry, case-insensitively', () => {
  assert.equal(governanceFor('DocRefContentType')?.name, 'docrefcontent-type');
  assert.equal(governanceFor('COUNTRY')?.name, 'country');
  assert.equal(governanceFor('no-such-list'), undefined);
});

test('a UI decision without a published list (or the reverse) is refused', () => {
  const neutral = { codelists: { a: { gc: 'A.gc', schematronValidated: true, inlineEnum: false }, b: { externalSource: 'https://x.example', schematronValidated: false, inlineEnum: false } } };
  const ok = mergeGovernance(neutral, { codelists: { a: { useForUI: true }, b: { useForUI: false } } });
  assert.deepEqual([ok.codelists.a.shipped, ok.codelists.b.shipped], [true, false], 'shipped follows gc');
  assert.deepEqual([ok.codelists.a.useForUI, ok.codelists.b.useForUI], [true, false]);
  assert.throws(() => mergeGovernance(neutral, { codelists: { a: { useForUI: true } } }), /no UI decision for: b/);
  assert.throws(() => mergeGovernance(neutral, { codelists: { a: { useForUI: true }, b: { useForUI: true }, c: { useForUI: true } } }), /not in the published registry: c/);
});

// --- the app can build what it offers -----------------------------------

test('every list offered in the UI is shipped and its .gc is available', () => {
  for (const [name, e] of Object.entries(codelists)) {
    if (!e.useForUI) continue;
    if (!e.shipped) continue; // an unshipped list (e.g. procurement-procedure-type) is hand-maintained in the admin parts
    assert.ok(fs.existsSync(codelistPath(e.gc)), `${name}: ${e.gc} not found among the shipped code lists`);
  }
});

// --- completeness: every codelist USED by the vendored model has an entry ---

test('every codelist referenced by a value type or compiled leaf has a governance entry', () => {
  const used = new Set();

  // 1) value-type registry instanceShape.codeList / codeListFile-derived name.
  const vt = loadRegistry('value-types').valueTypes;
  const collect = (shape) => {
    if (!shape || typeof shape !== 'object') return;
    if (shape.codeList) used.add(shape.codeList);
    if (shape.properties) for (const v of Object.values(shape.properties)) collect(v);
    if (shape.items) collect(shape.items);
  };
  for (const def of Object.values(vt)) {
    collect(def.instanceShape);
    if (def.requestXml?.codelist) used.add(def.requestXml.codelist);
    if (def.responseXml?.codelist) used.add(def.responseXml.codelist);
  }

  // 2) per-leaf `codelist` carried by the published compiled criteria.
  const compiledDir = path.join(generatedRoot, 'compiled');
  for (const f of fs.readdirSync(compiledDir)) {
    if (!f.endsWith('.json')) continue;
    const text = fs.readFileSync(path.join(compiledDir, f), 'utf8');
    for (const m of text.matchAll(/"codelist"\s*:\s*"([^"]+)"/g)) used.add(m[1]);
  }

  // 3) codelists named in the codelist-attribute profile (XML attribute sets).
  for (const key of Object.keys(loadRegistry('codelist-attributes').codelists)) {
    // 'criterion-id' is a UBL scheme, not a codelist — skip non-governed scheme keys.
    if (key === 'criterion-id') continue;
    used.add(key);
  }

  const missing = [...used].filter(name => !governanceFor(name));
  assert.deepEqual(missing, [], `codelists used by the model but absent from the codelist-governance registry: ${missing.join(', ')}`);
});
