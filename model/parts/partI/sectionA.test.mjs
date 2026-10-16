// Part I Section A — publication reference.
// Validates the schema/example, roundtrips through mapper.mjs, and checks the
// codelist-attribute expansion produces Schematron-compliant XML.

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

test('the example validates against the schema', async () => {
  const { default: Ajv } = await import('ajv');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  assert.ok(validate(example), `example invalid: ${JSON.stringify(validate.errors)}`);
});

test('a minimal example (no url) validates', async () => {
  const { default: Ajv } = await import('ajv');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const minimal = { partI: { publication: { type: 'ROJCN', identifier: 'NAT-2026-001' } } };
  assert.ok(validate(minimal), `minimal invalid: ${JSON.stringify(validate.errors)}`);
});

test('the mapping roundtrips the full example (with url)', () => {
  const xml = map(spec, example);
  const back = unmap(spec, xml);
  assert.deepEqual(back, example);
});

test('the mapping roundtrips a minimal example (no url)', () => {
  const minimal = { partI: { publication: { type: 'NOJCN', identifier: 'BOE-2026-123' } } };
  const xml = map(spec, minimal);
  const back = unmap(spec, xml);
  assert.deepEqual(back, minimal);
});

test('generated XML has the correct UBL structure', () => {
  const xml = map(spec, example);
  assert.match(xml, /<cac:AdditionalDocumentReference>/);
  // cbc:ID carries @schemeAgencyID (BR-OTH-02, mandatory on every cbc:ID).
  assert.match(xml, /<cbc:ID schemeAgencyID="OP">310364-2026<\/cbc:ID>/);
  assert.match(xml, /<cbc:DocumentTypeCode[^>]*>TED_CN<\/cbc:DocumentTypeCode>/);
  assert.match(xml, /<cac:Attachment>\s*<cac:ExternalReference>\s*<cbc:URI>/);
  assert.match(xml, /https:\/\/ted\.europa\.eu\/en\/notice\/-\/detail\/310364-2026<\/cbc:URI>/);
});

test('DocumentTypeCode carries the docrefcontent-type shorthand for attribute expansion', () => {
  const xml = map(spec, example);
  assert.match(xml, /cbc:DocumentTypeCode[^>]*listID="docrefcontent-type"/);
});

test('codelist-attribute expansion produces the full Schematron-mandated set', async () => {
  const { expandCodelistAttributes } = await import('../../compiler/schematron-validate.mjs');
  const { loadValidatedCodelistProfile } = await import('../../compiler/codelist-attributes.mjs');
  const { profile } = loadValidatedCodelistProfile();

  const xml = map(spec, example);
  const expanded = expandCodelistAttributes(xml, profile);

  // The 5 mandated attributes on DocumentTypeCode (from 01-ESPD-common-cl-attributes.sch).
  assert.match(expanded, /listName="DocrefcontentType"/);
  assert.match(expanded, /listID="http:\/\/publications\.europa\.eu\/resource\/authority\/docrefcontent-type"/);
  assert.match(expanded, /listVersionID="20250319-0"/);
  assert.match(expanded, /listSchemeURI="http:\/\/publications\.europa\.eu\/resource\/distribution\/docrefcontent-type/);
  assert.match(expanded, /listURI="http:\/\/publications\.europa\.eu\/resource\/dataset\/docrefcontent-type"/);

  // The shorthand is replaced, not left alongside the expanded set.
  assert.ok(!expanded.includes('listID="docrefcontent-type"'), 'shorthand should be expanded');
});

test('the form lens covers all three publication fields', () => {
  const paths = form.fields.map(f => f.dataPath);
  assert.deepEqual(paths, [
    'partI.publication.type',
    'partI.publication.identifier',
    'partI.publication.url',
  ]);
  // The type field references the codelist.
  const typeField = form.fields.find(f => f.dataPath === 'partI.publication.type');
  assert.equal(typeField.uiType, 'code');
  assert.equal(typeField.codelist, 'docrefcontent-type');
  assert.equal(typeField.required, true);
  // URL is optional.
  const urlField = form.fields.find(f => f.dataPath === 'partI.publication.url');
  assert.equal(urlField.required, false);
});

// --- Codelist-derived enum: the schema's `type` enum is the source-of-truth
//     DocrefcontentType.gc codes. These tests keep the committed enum honest. ---

import { readCodelistCodes, codelistPath } from '../../codelists/read-codelist.mjs';

const GC = codelistPath('DocrefcontentType.gc');

test('the type enum is in sync with DocrefcontentType.gc (regenerate if this fails)', () => {
  const codes = readCodelistCodes(GC);
  const enumInSchema = schema.$defs.publicationReference.properties.type.enum;
  assert.deepEqual(
    [...enumInSchema].sort(),
    [...codes].sort(),
    'schema `type` enum drifted from DocrefcontentType.gc — update sectionA.schema.json');
  // The $codelist marker names the source list.
  assert.equal(schema.$defs.publicationReference.properties.type.$codelist, 'docrefcontent-type');
});

test('the schema rejects a type value not in the codelist', async () => {
  const { default: Ajv } = await import('ajv');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const bad = { partI: { publication: { type: 'NONSENSE', identifier: 'x' } } };
  assert.ok(!validate(bad), 'a non-codelist type must be rejected by the enum');
});

test('the schema accepts every real codelist code as a type', async () => {
  const { default: Ajv } = await import('ajv');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  for (const code of readCodelistCodes(GC)) {
    const doc = { partI: { publication: { type: code, identifier: 'x' } } };
    assert.ok(validate(doc), `code '${code}' should be accepted: ${JSON.stringify(validate.errors)}`);
  }
});
