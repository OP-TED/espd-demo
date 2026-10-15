// Phase 6A — standalone validator compiler tests.
//
// Four concerns:
//   1. Module shape: the emitted module imports as ESM, exports the expected 10
//      validate() functions, and contains no CommonJS `require` (the bug that
//      the ucs2length inline fixes) — so it loads in Node and the browser alike.
//   2. Accepts valid data: every generated criterion example validates `true`
//      against its part root (selected by the example's top-level key), and a
//      representative admin-section slice validates `true`.
//   3. Rejects invalid data: unknown criterion keys, additional properties, and
//      missing required fields are each caught (with populated `.errors`).
//   4. Staleness guard: the committed model/generated/ui/validators/index.mjs
//      matches a fresh in-memory build (a source edit without a recompile is
//      caught, as the rest of the generated model is guarded).

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  buildValidatorsSource,
  inlineAjvRuntimeRequires,
  validatorsOutPath,
} from './build-validators.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const instanceDataDir = resolve(here, '..', 'generated', 'instance-data');

const EXPECTED_EXPORTS = [
  'partII', 'partIII', 'partIV', 'partV',
  'partI_sectionA', 'partI_sectionB', 'partI_sectionC',
  'partII_sectionA', 'partII_sectionB', 'partVI_sectionA',
  'espd',
];

// The validators module is generated code; load it once for the whole suite via
// top-level await (ESM), so every subtest sees the resolved exports — a top-level
// `before()` hook does not reliably gate standalone describe blocks under node:test.
const V = await import(pathToFileURL(validatorsOutPath).href);

describe('validators: module shape', () => {
  it('exports the expected 11 validate() functions (10 part/section + 1 document)', () => {
    for (const name of EXPECTED_EXPORTS) {
      assert.equal(typeof V[name], 'function', `missing export: ${name}`);
    }
    assert.equal(Object.keys(V).length, EXPECTED_EXPORTS.length);
  });

  it('emitted module contains no CommonJS require (ESM-safe in Node and browser)', () => {
    const src = readFileSync(validatorsOutPath, 'utf8');
    assert.ok(!/\brequire\((["'])[^"')]+\1\)/.test(src),
      'emitted validators module still contains a bare require(...)');
  });
});

describe('validators: inlineAjvRuntimeRequires', () => {
  it('rewrites the ucs2length runtime require into an inline function', () => {
    const input = 'const func5 = require("ajv/dist/runtime/ucs2length").default;';
    const out = inlineAjvRuntimeRequires(input);
    assert.ok(!out.includes('require('), 'require not removed');
    assert.ok(out.includes('function ucs2length'), 'inline not substituted');
  });

  it('throws loudly on an un-inlined runtime require (future-proofing)', () => {
    assert.throws(
      () => inlineAjvRuntimeRequires('const f = require("ajv/dist/runtime/equal").default;'),
      /un-inlined runtime require/,
    );
  });
});

describe('validators: accepts valid data (every generated criterion example)', () => {
  const exampleFiles = readdirSync(instanceDataDir)
    .filter((f) => f.endsWith('.example.json'))
    .sort();

  it('there are criterion examples to check', () => {
    assert.ok(exampleFiles.length >= 60, `expected many examples, found ${exampleFiles.length}`);
  });

  for (const file of exampleFiles) {
    it(`${file} validates against its part root`, () => {
      const data = JSON.parse(readFileSync(join(instanceDataDir, file), 'utf8'));
      const topKey = Object.keys(data)[0]; // partII | partIII | partIV | partV
      const validate = V[topKey];
      assert.equal(typeof validate, 'function',
        `no validator for top-level key "${topKey}" in ${file}`);
      const ok = validate(data);
      assert.equal(ok, true,
        `${file} should validate; errors: ${JSON.stringify(validate.errors)}`);
    });
  }
});

describe('validators: accepts valid admin-section slices', () => {
  it('partI_sectionB accepts a minimal contracting-authority slice', () => {
    const ok = V.partI_sectionB({ partI: { contractingAuthority: { officialName: 'ACME', country: 'BEL' } } });
    assert.equal(ok, true, JSON.stringify(V.partI_sectionB.errors));
  });

  it('partVI_sectionA accepts an empty (unsigned) partVI block', () => {
    const ok = V.partVI_sectionA({ partVI: {} });
    assert.equal(ok, true, JSON.stringify(V.partVI_sectionA.errors));
  });
});

describe('validators: whole-document validator (espd)', () => {
  it('accepts a flat multi-part document (admin + criteria)', () => {
    const exg = JSON.parse(readFileSync(join(instanceDataDir, 'exg-crim-part.example.json'), 'utf8'));
    const doc = {
      partI: {
        publication: { type: 'TED_CN', identifier: '310364-2026' },
        contractingAuthority: { officialName: 'ACME', country: 'BEL' },
      },
      partIII: { ...exg.partIII },
      partVI: { signatory: { physicalLocationName: 'Brussels' } },
    };
    assert.equal(V.espd(doc), true, JSON.stringify(V.espd.errors));
  });

  it('accepts an empty document (every part optional)', () => {
    assert.equal(V.espd({}), true, JSON.stringify(V.espd.errors));
  });

  it('rejects an unknown top-level part key', () => {
    assert.equal(V.espd({ partZ: {} }), false);
  });

  it('rejects an unknown sub-key within a part', () => {
    assert.equal(V.espd({ partI: { nope: 1 } }), false);
  });

  it('rejects an unknown criterion inside a flat document', () => {
    assert.equal(V.espd({ partIII: { exclusionGrounds: { 'not-a-criterion': {} } } }), false);
  });
});

describe('validators: rejects invalid data', () => {
  it('rejects an unknown criterion key (additionalProperties)', () => {
    const ok = V.partIII({ partIII: { exclusionGrounds: { 'not-a-criterion': { response: { answer: true } } } } });
    assert.equal(ok, false);
    assert.ok(Array.isArray(V.partIII.errors) && V.partIII.errors.length > 0);
  });

  it('rejects an unknown top-level key', () => {
    const ok = V.partIII({ partIII: { exclusionGrounds: {} }, bogus: 1 });
    assert.equal(ok, false);
  });

  it('rejects a missing required admin field', () => {
    const ok = V.partI_sectionB({ partI: { contractingAuthority: { country: 'BEL' } } });
    assert.equal(ok, false);
    assert.ok(V.partI_sectionB.errors.some((e) => e.keyword === 'required'));
  });
});

describe('validators: generated module is up to date (staleness guard)', () => {
  it('committed model/generated/ui/validators/index.mjs matches a fresh build', () => {
    const onDisk = readFileSync(validatorsOutPath, 'utf8');
    const fresh = buildValidatorsSource();
    assert.equal(onDisk, fresh,
      'validators/index.mjs is stale — run `node model/compiler/build-validators.mjs`');
  });
});
