// Phase 2 — administrative parts (I & VI) compiler tests.
//
// Three concerns, mirroring roles.test.mjs:
//   1. Validation: the authored sources pass; representative malformations are rejected.
//   2. Assembled lens shape: ordered sections; the Part I publication fields carry the
//      ted-notice lookup uiHint; Part VI carries its single signatory field.
//   3. Staleness guard: committed model/generated/ui/part-*.json + the i18n catalogue
//      match a fresh in-memory build.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  loadPartsSources,
  validatePartsSources,
  buildPartsLens,
  partsI18nPath,
} from './parts.mjs';

const sources = loadPartsSources();
const { lenses, catalogue } = buildPartsLens({ sources, write: false });

const lensOf = (part) => lenses.find((l) => l.part === part);
const fieldOf = (lens, dataPath) =>
  lens.sections.flatMap((s) => s.fields).find((f) => f.dataPath === dataPath);

// Deep clone so mutations don't leak between cases.
const clone = (x) => structuredClone(x);

describe('parts: source validation', () => {
  it('the authored Part I/VI sources are valid', () => {
    assert.doesNotThrow(() => validatePartsSources(sources));
  });

  it('rejects a field with an unknown codelist', () => {
    const bad = clone(sources);
    bad.parts[0].sections[0].fields[0].codelist = 'not-a-list';
    assert.throws(() => validatePartsSources(bad), /unknown codelist "not-a-list"/);
  });

  it('rejects a code field with no codelist', () => {
    const bad = clone(sources);
    delete bad.parts[0].sections[0].fields[0].codelist; // partI.publication.type is code
    assert.throws(() => validatePartsSources(bad), /requires a codelist/);
  });

  it('rejects an unknown uiType', () => {
    const bad = clone(sources);
    bad.parts[0].sections[0].fields[1].uiType = 'slider';
    assert.throws(() => validatePartsSources(bad), /unknown uiType "slider"/);
  });

  it('rejects a field missing dataPath', () => {
    const bad = clone(sources);
    delete bad.parts[0].sections[0].fields[1].dataPath;
    assert.throws(() => validatePartsSources(bad), /missing dataPath/);
  });

  it('rejects a field missing its inline label', () => {
    const bad = clone(sources);
    delete bad.parts[0].sections[0].fields[1].label;
    assert.throws(() => validatePartsSources(bad), /missing inline label/);
  });

  it('rejects an unknown uiHints.lookup name', () => {
    const bad = clone(sources);
    bad.parts[0].sections[0].fields[1].uiHints = { lookup: { name: 'bogus-lookup' } };
    assert.throws(() => validatePartsSources(bad), /unknown uiHints\.lookup "bogus-lookup"/);
  });

  it('rejects a lookup inputKind not allowed for that lookup', () => {
    const bad = clone(sources);
    bad.parts[0].sections[0].fields[1].uiHints = { lookup: { name: 'ted-notice', inputKind: 'carrier-pigeon' } };
    assert.throws(() => validatePartsSources(bad), /inputKind "carrier-pigeon" not allowed/);
  });

  it('rejects an unknown uiHint key', () => {
    const bad = clone(sources);
    bad.parts[0].sections[0].fields[1].uiHints = { wiggle: true };
    assert.throws(() => validatePartsSources(bad), /unknown uiHint "wiggle"/);
  });

  it('rejects a malformed visibleWhen', () => {
    const bad = clone(sources);
    bad.parts[0].sections[1].fields[3].visibleWhen = { path: 'x' }; // missing isPresent
    assert.throws(() => validatePartsSources(bad), /visibleWhen must be/);
  });

  it('rejects a manifest/section part mismatch', () => {
    const bad = clone(sources);
    bad.parts[0].sections[0].part = 'IX';
    assert.throws(() => validatePartsSources(bad), /section\.part is "IX"/);
  });
});

describe('parts: assembled lens shape', () => {
  it('emits the admin parts I, II, VI', () => {
    assert.deepEqual(lenses.map((l) => l.part), ['I', 'II', 'VI']);
  });

  it('Part I carries sections A, B, C in order', () => {
    assert.deepEqual(lensOf('I').sections.map((s) => s.id), ['A', 'B', 'C']);
  });

  it('Part VI carries a single section A with the signatory field', () => {
    const vi = lensOf('VI');
    assert.deepEqual(vi.sections.map((s) => s.id), ['A']);
    assert.ok(fieldOf(vi, 'partVI.signatory.physicalLocationName'));
  });

  it('the publication identifier and url carry the ted-notice lookup hint', () => {
    const partI = lensOf('I');
    const id = fieldOf(partI, 'partI.publication.identifier');
    const url = fieldOf(partI, 'partI.publication.url');
    assert.equal(id.uiHints.lookup.name, 'ted-notice');
    assert.equal(id.uiHints.lookup.inputKind, 'notice-number');
    assert.equal(url.uiHints.lookup.name, 'ted-notice');
    assert.equal(url.uiHints.lookup.inputKind, 'notice-url');
  });

  it('no three-way publication radio-group survives (Option A: type codelist replaces it)', () => {
    const partI = lensOf('I');
    for (const field of partI.sections.flatMap((s) => s.fields)) {
      assert.notEqual(field.uiHints?.control, 'radio-input-group');
    }
    // The DocRefContentType `type` is a plain code field (the picker that chooses the kind).
    assert.equal(fieldOf(partI, 'partI.publication.type').uiType, 'code');
  });

  it('fields carry i18n label KEYS, not inline text', () => {
    for (const lens of lenses) {
      for (const field of lens.sections.flatMap((s) => s.fields)) {
        assert.ok(field.labelKey, `${field.dataPath} labelKey`);
        assert.ok(!('label' in field), `${field.dataPath} must not carry inline label`);
        assert.ok(catalogue[field.labelKey], `${field.dataPath} label text present`);
      }
    }
  });

  it('visibleWhen is carried through to the built lens when a field declares one', () => {
    // No admin field currently uses visibleWhen (the identifier type is shown
    // unconditionally), so inject one into a cloned source and confirm the
    // projection preserves it verbatim.
    const src = clone(sources);
    const field = src.parts[0].sections[1].fields[3]; // partI.contractingAuthority.identifier.scheme
    field.visibleWhen = { path: 'partI.contractingAuthority.identifier.value', isPresent: true };
    const { lenses: built } = buildPartsLens({ sources: src, write: false });
    const scheme = built
      .find((l) => l.part === 'I')
      .sections.flatMap((s) => s.fields)
      .find((f) => f.dataPath === 'partI.contractingAuthority.identifier.scheme');
    assert.deepEqual(scheme.visibleWhen, {
      path: 'partI.contractingAuthority.identifier.value',
      isPresent: true,
    });
  });

  it('the lots field is a lot-count control (generates the canonical lots array)', () => {
    const lots = fieldOf(lensOf('I'), 'partI.lots');
    assert.equal(lots.uiType, 'lot-count');
    assert.equal(lots.repeatable, undefined);
  });
});

describe('parts: generated artifacts are up to date (staleness guard)', () => {
  // parts.mjs owns only the English catalogue; the assembled part-*.json are
  // written by build-ui-bundle.mjs and guarded in build-ui-bundle.test.mjs.
  it('committed i18n/en/espd.parts.json matches a fresh build', () => {
    const onDisk = readFileSync(partsI18nPath, 'utf8');
    const fresh = JSON.stringify(catalogue, null, 2) + '\n';
    assert.equal(onDisk, fresh, 'espd.parts.json is stale — run `node model/compiler/parts.mjs`');
  });
});
