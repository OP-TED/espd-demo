// Every i18n key the generated form lenses and the UI bundle use must resolve in the
// English catalogue (i18n/i18n/en/*.json).
//
// Form labels are keyed by criterion code (or tag) and the EA path, so when the model
// changes upstream (an EA code renamed, a leaf added) the keys change and the catalogue has
// to follow. Nothing checked that across ALL criteria before; this does.
//
// KNOWN_GAPS lists keys that are deliberately unresolved, with the reason. The test fails if
// a listed key starts to resolve, so the list cannot go stale.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const generated = path.join(here, '..', 'generated');
const i18nDir = path.join(here, '..', '..', 'i18n', 'i18n', 'en');
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

const KNOWN_GAPS = new Map([
  ['caption.label.slc-abil-staff-tech-ctrl.RG1.RSG1.RSG1.QSG3.Q1',
    "the EA model has a caption node here whose text is literally 'Q1' (a modelling artefact); fix it in the EA model, not by inventing a label"],
]);

const catalogue = {};
for (const f of fs.readdirSync(i18nDir).filter((x) => x.endsWith('.json'))) Object.assign(catalogue, readJson(path.join(i18nDir, f)));

/** Collect every `...Key` string value in a JSON tree. */
function collectKeys(node, out = new Set()) {
  if (Array.isArray(node)) node.forEach((x) => collectKeys(x, out));
  else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (typeof v === 'string' && /Key$/.test(k) && /^[a-zA-Z]+(\.[A-Za-z0-9_-]+)+$/.test(v)) out.add(v);
      else collectKeys(v, out);
    }
  }
  return out;
}

const used = new Set();
for (const f of fs.readdirSync(path.join(generated, 'form-structure')).filter((x) => x.endsWith('.json'))) {
  collectKeys(readJson(path.join(generated, 'form-structure', f)), used);
}
for (const f of fs.readdirSync(path.join(generated, 'ui')).filter((x) => /^part-.*\.json$/.test(x))) {
  collectKeys(readJson(path.join(generated, 'ui', f)), used);
}

test('the discovery is non-trivial (guards the guard)', () => {
  assert.ok(used.size > 500, `expected hundreds of keys, found ${used.size}`);
  assert.ok(Object.keys(catalogue).length > 1000, 'expected the English catalogue to be loaded');
});

test('every i18n key used by the generated forms and UI bundle resolves in the catalogue', () => {
  const missing = [...used].filter((k) => !(k in catalogue) && !KNOWN_GAPS.has(k)).sort();
  assert.deepEqual(missing, [],
    `${missing.length} key(s) used by the generated model are missing from i18n/i18n/en/*.json:\n  ${missing.slice(0, 20).join('\n  ')}`);
});

test('a key listed in KNOWN_GAPS is still actually unresolved and still used', () => {
  for (const [key, why] of KNOWN_GAPS) {
    assert.ok(used.has(key), `${key} is no longer used; remove it from KNOWN_GAPS (${why})`);
    assert.ok(!(key in catalogue), `${key} now resolves; remove it from KNOWN_GAPS`);
  }
});
