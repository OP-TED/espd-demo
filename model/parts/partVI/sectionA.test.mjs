// Part VI — signature (EA I73 'info-signature').
// No Schematron/sample reference exists for this block, so tests focus on
// schema validation, the map/unmap roundtrip, and UBL structure against
// UBL 2.4 SignatureType. The whole block is optional.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { map, unmap } from '../../mapping-engine/mapper.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const read = (f) => JSON.parse(fs.readFileSync(path.join(here, f), 'utf8'));

const schema = read('sectionA.schema.json');
const example = read('sectionA.example.json');
const spec = read('sectionA.mapping.json');
const form = read('sectionA.form.json');

const compile = async () => {
  const { default: Ajv } = await import('ajv');
  return new Ajv({ allErrors: true, strict: false }).compile(schema);
};

// --- schema -------------------------------------------------------------

test('the example validates against the schema', async () => {
  const validate = await compile();
  assert.ok(validate(example), `example invalid: ${JSON.stringify(validate.errors)}`);
});

test('the whole signature block is optional (empty partVI is valid)', async () => {
  const validate = await compile();
  assert.ok(validate({ partVI: {} }), 'no signatory is valid');
  assert.ok(validate({ partVI: { signatory: {} } }), 'empty signatory is valid');
});

test('unknown properties are rejected', async () => {
  const validate = await compile();
  assert.ok(!validate({ partVI: { signatory: { place: 'x' } } }), 'unknown signatory field must fail');
  assert.ok(!validate({ partVI: { signature: {} } }), 'unknown partVI field must fail');
});

// --- roundtrip ----------------------------------------------------------

test('the mapping roundtrips the full example', () => {
  assert.deepEqual(unmap(spec, map(spec, example)), example);
});

test('an empty signatory roundtrips to nothing (no spurious elements)', () => {
  const back = unmap(spec, map(spec, { partVI: { signatory: {} } }));
  // With no physical-location name, the mapping emits no cac:Signature content,
  // so unmap yields an empty document rather than an empty signatory shell.
  assert.deepEqual(back, {});
});

// --- UBL structure ------------------------------------------------------

test('the signatory maps to cac:Signature/cac:SignatoryParty/cac:PhysicalLocation/cbc:Name', () => {
  const xml = map(spec, example);
  assert.match(xml, /<cac:Signature>\s*<cac:SignatoryParty>\s*<cac:PhysicalLocation>\s*<cbc:Name>Brussels<\/cbc:Name>/);
});

// --- form lens ----------------------------------------------------------

test('the form lens is a single optional, non-repeatable field', () => {
  assert.equal(form.fields.length, 1);
  const f = form.fields[0];
  assert.equal(f.dataPath, 'partVI.signatory.physicalLocationName');
  assert.equal(f.required, false);
  assert.ok(!f.repeatable, 'the signature field is not repeatable');
});
