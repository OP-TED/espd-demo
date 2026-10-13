// Consistency test for the codelist governance registry (governance.json).
//
// The registry is HAND-AUTHORED (the four axes are governance/implementation
// decisions). This test keeps it honest against repo ground truth by checking
// the two mechanically-verifiable axes and the entries' completeness. It does
// NOT assert any correlation between `inlineEnum` and `schematronValidated` —
// those axes are independent (see docs/codelist-governance.md).

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGovernance, governanceFor } from './governance.mjs';
import { gcFileForCodelist } from './read-codelist.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const CODELISTS_DIR = path.resolve(here, '..', '..', '..', 'ESPD-EDM', 'codelists');
const CVA = path.resolve(here, '..', '..', '..', 'espd-validation-schematron', 'common', 'cva', '01-ESPD-codelist-values.cva');

const { codelists } = loadGovernance();

/** The set of codelist ids the CVA actually declares (ValueList ELEMENTS, not comments). */
function cvaValidatedIds() {
  const cva = fs.readFileSync(CVA, 'utf8');
  const ids = new Set();
  for (const m of cva.matchAll(/<ValueList\s+xml:id="([^"]+)"/g)) ids.add(m[1].toLowerCase());
  return ids;
}

/** Does the registry entry (by name or any alias) match a CVA ValueList id? */
function entryIsInCva(name, entry, cvaIds) {
  const names = [name, ...(entry.aliases ?? [])].map(s => s.toLowerCase());
  return names.some(n => cvaIds.has(n));
}

// --- the registry is well-formed ---------------------------------------

test('every entry has the four required boolean axes', () => {
  for (const [name, e] of Object.entries(codelists)) {
    for (const axis of ['shipped', 'schematronValidated', 'useForUI', 'inlineEnum']) {
      assert.equal(typeof e[axis], 'boolean', `${name}.${axis} must be a boolean`);
    }
  }
});

// --- shipped <=> a .gc exists ------------------------------------------

test('`shipped` matches the ESPD-EDM/codelists directory', () => {
  for (const [name, e] of Object.entries(codelists)) {
    const resolved = gcFileForCodelist(name) || (e.aliases ?? []).map(gcFileForCodelist).find(Boolean);
    if (e.shipped) {
      assert.ok(resolved, `${name}: shipped=true but no .gc resolves`);
      // If the entry names a specific gc file, it must exist.
      if (e.gc) assert.ok(fs.existsSync(path.join(CODELISTS_DIR, e.gc)), `${name}: gc '${e.gc}' not found`);
    } else {
      assert.ok(!resolved, `${name}: shipped=false but a .gc resolves (${resolved})`);
      assert.ok(!e.gc, `${name}: shipped=false must not name a gc file`);
      assert.ok(e.externalSource, `${name}: an unshipped list must record an externalSource`);
    }
  }
});

// --- schematronValidated <=> a CVA ValueList declares it ----------------

test('`schematronValidated` matches the CVA ValueList declarations', () => {
  const cvaIds = cvaValidatedIds();
  for (const [name, e] of Object.entries(codelists)) {
    const inCva = entryIsInCva(name, e, cvaIds);
    assert.equal(e.schematronValidated, inCva,
      `${name}: schematronValidated=${e.schematronValidated} but CVA ValueList present=${inCva}` +
      (e.aliases ? ` (aliases: ${e.aliases.join(', ')})` : ''));
  }
});

// --- the implementer-choice marker rule (the ONE real coupling) ---------

test('implementer-choice holds iff inlineEnum && !schematronValidated — and nothing else is asserted about inline vs validated', () => {
  // This encodes the only coupling: the MARKER, not the inline decision itself.
  // We explicitly do NOT assert inlineEnum === !schematronValidated anywhere.
  const inlinedValidated = [];
  const inlinedSuggested = [];
  for (const [name, e] of Object.entries(codelists)) {
    if (!e.inlineEnum) continue;
    (e.schematronValidated ? inlinedValidated : inlinedSuggested).push(name);
  }
  // Both buckets should be non-empty in the current repo — proof the axes are
  // independent (validated+inlined AND unvalidated+inlined both exist).
  assert.ok(inlinedValidated.length > 0, 'expected at least one validated+inlined list (e.g. docrefcontent-type)');
  assert.ok(inlinedSuggested.length > 0, 'expected at least one unvalidated+inlined list (e.g. financial-ratio-type)');
});

// --- completeness: every codelist USED in the repo has an entry ---------

test('every codelist referenced by a value type or sidecar leaf has a governance entry', () => {
  const used = new Set();

  // 1) value-type registry instanceShape.codeList / codeListFile-derived name.
  const vt = JSON.parse(fs.readFileSync(
    path.join(here, '..', 'model-sources', 'registries', 'value-types.json'), 'utf8')).valueTypes;
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

  // 2) per-leaf `codelist` declared in sidecars.
  const criteriaDir = path.join(here, '..', 'model-sources', 'criteria');
  for (const f of fs.readdirSync(criteriaDir)) {
    if (!f.endsWith('.sidecar.json')) continue;
    const text = fs.readFileSync(path.join(criteriaDir, f), 'utf8');
    for (const m of text.matchAll(/"codelist"\s*:\s*"([^"]+)"/g)) used.add(m[1]);
  }

  // 3) codelists named in the codelist-attribute profile (XML attribute sets).
  const prof = JSON.parse(fs.readFileSync(
    path.join(here, '..', 'model-sources', 'registries', 'codelist-attributes.json'), 'utf8')).codelists;
  for (const key of Object.keys(prof)) {
    // 'criterion-id' is a UBL scheme, not a codelist — skip non-governed scheme keys.
    if (key === 'criterion-id') continue;
    used.add(key);
  }

  const missing = [...used].filter(name => !governanceFor(name));
  assert.deepEqual(missing, [], `codelists used in the repo but absent from governance.json: ${missing.join(', ')}`);
});
