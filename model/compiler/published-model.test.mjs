// Consistency of the VENDORED published model (model/generated/) and of the layers this app
// derives from it.
//
// The model itself is verified when it is synced (sync-published.mjs: schema, files, hash). These
// tests guard what can go wrong afterwards, in the committed files:
//   - the vendored copy is complete and has no stray or stale files,
//   - every published criterion has exactly one form lens, and every lens is CURRENT (regenerating it
//     from the published compiled criterion reproduces the committed file),
//   - every form field addresses a real property of the published instance-data schema (this also
//     keeps instance-paths.mjs, which mirrors the upstream rules, honest).

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { generatedRoot, loadEnvelope, loadCompiled, loadValueTypeRegistry } from './published-model.mjs';
import { generateFormStructure, loadPresentation } from './generate-form-structure.mjs';
import { VENDORED_DIRS, filesUnder } from './sync-published.mjs';

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const envelope = loadEnvelope();
const keys = envelope.criteria.map((c) => c.key);
const criteriaDir = path.join(generatedRoot, '..', 'model-sources', 'criteria');

test('every file the vendored envelope lists exists, and nothing else is vendored', () => {
  const listed = new Set();
  for (const c of envelope.criteria) for (const rel of Object.values(c.files)) if (rel) listed.add(rel);
  for (const rel of envelope.registries) listed.add(rel);
  for (const p of envelope.parts) {
    listed.add(p.manifest);
    for (const s of p.sections) for (const k of ['schema', 'example', 'mapping', 'form']) listed.add(s[k]);
  }
  for (const rel of listed) assert.ok(fs.existsSync(path.join(generatedRoot, rel)), `missing vendored file: ${rel}`);
  for (const dir of VENDORED_DIRS) {
    for (const rel of filesUnder(generatedRoot, dir)) {
      assert.ok(listed.has(rel), `vendored file not in the envelope (stale or hand-added): ${rel}`);
    }
  }
});

test('the inventory is consistent: counts match, keys match the compiled files', () => {
  assert.equal(envelope.counts.criteria, keys.length);
  assert.equal(new Set(keys).size, keys.length, 'criterion keys are unique');
  for (const key of keys) assert.equal(loadCompiled(key).key, key, `compiled/${key}.json names its own key`);
});

test('exactly one form lens per published criterion, none stale', () => {
  const lenses = fs.readdirSync(path.join(generatedRoot, 'form-structure')).filter((f) => f.endsWith('.form.json')).map((f) => f.replace('.form.json', '')).sort();
  assert.deepEqual(lenses, [...keys].sort());
});

test('every form lens is current: regenerating it from the published criterion reproduces the committed file', () => {
  const registry = loadValueTypeRegistry();
  for (const key of keys) {
    const { partId, criterion, hints } = loadCompiled(key);
    const fresh = generateFormStructure(criterion, registry, { partId, hints, presentation: loadPresentation(key, criteriaDir) });
    const committed = readJson(path.join(generatedRoot, 'form-structure', `${key}.form.json`));
    assert.deepStrictEqual(JSON.parse(JSON.stringify(fresh)), committed, `${key}: form lens is stale — run npm run model:compile`);
  }
});

/** Resolve a local `#/...` $ref inside one schema document. */
function deref(root, node) {
  let n = node;
  for (let i = 0; i < 10 && n && n.$ref; i++) {
    assert.ok(n.$ref.startsWith('#/'), `unsupported $ref ${n.$ref}`);
    n = n.$ref.slice(2).split('/').reduce((x, seg) => x?.[seg.replace(/~1/g, '/').replace(/~0/g, '~')], root);
  }
  return n;
}
/** All property sub-schemas named `name` directly on `node` or inside its allOf/if/then/else/anyOf branches. */
function propertyOf(root, node, name) {
  node = deref(root, node);
  if (!node || typeof node !== 'object') return undefined;
  if (node.properties?.[name]) return deref(root, node.properties[name]);
  for (const k of ['allOf', 'anyOf', 'oneOf']) for (const b of node[k] ?? []) { const r = propertyOf(root, b, name); if (r) return r; }
  for (const k of ['then', 'else', 'if']) { const r = node[k] && propertyOf(root, node[k], name); if (r) return r; }
  return undefined;
}

test('every form field addresses a real property of the published instance-data schema', () => {
  const unresolved = [];
  for (const key of keys) {
    const schema = readJson(path.join(generatedRoot, 'instance-data', `${key}.schema.json`));
    const form = readJson(path.join(generatedRoot, 'form-structure', `${key}.form.json`));
    for (const c of form.criteria) for (const g of c.groups) for (const f of g.fields) {
      if (!f.dataPath) continue; // caption notes have none
      let node = schema, ok = true;
      for (const seg of f.dataPath.split('.')) {
        const isArray = seg.endsWith('[]');
        node = propertyOf(schema, node, isArray ? seg.slice(0, -2) : seg);
        if (!node) { ok = false; break; }
        if (isArray) { node = deref(schema, node.items); if (!node) { ok = false; break; } }
      }
      if (!ok) unresolved.push(`${key}: ${f.dataPath}`);
    }
  }
  assert.deepEqual(unresolved, [], `${unresolved.length} form field(s) do not address a property of the published schema:\n  ${unresolved.slice(0, 12).join('\n  ')}`);
});
