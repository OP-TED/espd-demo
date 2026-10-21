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

// The ESPD-allowed publication-reference types are the .gc codes MINUS the
// governance exclusions (codes that are not valid as the publication launching
// the procedure in the ESPD context). governance.json is the single source.
const governance = JSON.parse(
  fs.readFileSync(path.join(here, '..', '..', 'codelists', 'governance.json'), 'utf8'));
const EXCLUDED = new Set(governance.codelists['docrefcontent-type'].excludedCodes ?? []);
const allowedCodes = () => readCodelistCodes(GC).filter((c) => !EXCLUDED.has(c));

test('governance excludes the ESPD-request types from docrefcontent-type', () => {
  assert.ok(EXCLUDED.has('ESPD_REQUEST') && EXCLUDED.has('epo-acc-espd-request'),
    'the two ESPD-request codes must be declared excluded in governance.json');
});

test('the type enum is the .gc codes minus the governance exclusions (regenerate if this fails)', () => {
  const enumInSchema = schema.$defs.publicationReference.properties.type.enum;
  assert.deepEqual(
    [...enumInSchema].sort(),
    [...allowedCodes()].sort(),
    'schema `type` enum drifted from (DocrefcontentType.gc − governance.excludedCodes) — update sectionA.schema.json');
  // None of the excluded codes may appear in the enum.
  for (const bad of EXCLUDED) {
    assert.ok(!enumInSchema.includes(bad), `excluded code '${bad}' must not be in the type enum`);
  }
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
  // TED notice types (TED_CN/TED_PIN) carry a format constraint on the
  // identifier (BR-COM-10-01), so use a valid TED publication number for those;
  // the other types have no identifier format and accept any string.
  const TED_TYPES = new Set(['TED_CN', 'TED_PIN']);
  for (const code of allowedCodes()) {
    const identifier = TED_TYPES.has(code) ? '310364-2026' : 'x';
    const doc = { partI: { publication: { type: code, identifier } } };
    assert.ok(validate(doc), `code '${code}' should be accepted: ${JSON.stringify(validate.errors)}`);
  }
});

test('the schema rejects the excluded ESPD-request types', async () => {
  const { default: Ajv } = await import('ajv');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  for (const code of EXCLUDED) {
    const doc = { partI: { publication: { type: code, identifier: 'x' } } };
    assert.ok(!validate(doc), `excluded code '${code}' must be rejected by the enum`);
  }
});

// --- BR-COM-10-01: TED notice identifier format (TED_CN / TED_PIN) ----------
//     When the publication is a TED notice, the identifier must be a TED OJ S
//     publication number — the new eForms form 'NNNNNNNN-YYYY' (1–8 digits) OR
//     the legacy 'YYYY/S NNN-NNNNNN' (the 0000/S 000-000000 placeholder matches
//     the legacy form). Other publication types have no EU-standard format and
//     are left unconstrained. Mirrors the Schematron rule of the same id.

async function compileSectionA() {
  const { default: Ajv } = await import('ajv');
  const ajv = new Ajv({ allErrors: true, strict: false });
  return ajv.compile(schema);
}

const docOf = (type, identifier) => ({ partI: { publication: { type, identifier } } });

test('TED notice types accept the new eForms publication number NNNNNNNN-YYYY', async () => {
  const validate = await compileSectionA();
  for (const type of ['TED_CN', 'TED_PIN']) {
    for (const id of ['310364-2026', '19849-2023', '00676595-2024', '1-2024']) {
      assert.ok(validate(docOf(type, id)),
        `${type} '${id}' should be accepted: ${JSON.stringify(validate.errors)}`);
    }
  }
});

test('TED notice types still accept the legacy OJ S scheme and the temporary placeholder', async () => {
  const validate = await compileSectionA();
  for (const type of ['TED_CN', 'TED_PIN']) {
    for (const id of ['2015/S 252-461137', '0000/S 000-000000']) {
      assert.ok(validate(docOf(type, id)),
        `${type} '${id}' should be accepted: ${JSON.stringify(validate.errors)}`);
    }
  }
});

test('TED notice types reject identifiers that match neither scheme', async () => {
  const validate = await compileSectionA();
  for (const type of ['TED_CN', 'TED_PIN']) {
    for (const id of ['310364/2026', '123456789-2026', 'not-a-notice', '2026-S-1']) {
      assert.ok(!validate(docOf(type, id)),
        `${type} '${id}' must be rejected by the identifier pattern`);
    }
  }
});

test('non-TED publication types do not constrain the identifier format', async () => {
  const validate = await compileSectionA();
  for (const type of ['NOJCN', 'NOJPIN', 'ROJCN', 'ROJPIN', 'LOJCN', 'LOJPIN']) {
    assert.ok(validate(docOf(type, 'any-national-reference/42')),
      `${type} should accept a free-form identifier: ${JSON.stringify(validate.errors)}`);
  }
});
