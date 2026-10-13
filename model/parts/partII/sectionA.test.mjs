// Part II Section A — economic operator identity.
// Schema validation, map/unmap roundtrip, UBL structure against BR-RESP-10,
// codelist-attribute expansion, and enum sync for the two inlined code lists.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { map, unmap } from '../../mapping-engine/mapper.mjs';
import { readCodelistCodes, codelistPath } from '../../codelists/read-codelist.mjs';

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

test('all five BR-RESP-10 fields are required', async () => {
  const validate = await compile();
  const base = () => ({
    role: 'group-mem', name: 'X', size: 'sme', country: 'BEL',
    identifier: { value: 'ID-1', schemeAgency: 'OP' },
  });
  assert.ok(validate({ partII: { economicOperator: base() } }), 'complete EO must validate');
  for (const drop of ['role', 'name', 'size', 'country', 'identifier']) {
    const eo = base(); delete eo[drop];
    assert.ok(!validate({ partII: { economicOperator: eo } }), `missing ${drop} must fail`);
  }
});

test('the identifier requires value AND a non-empty scheme agency', async () => {
  const validate = await compile();
  const eo = (identifier) => ({ partII: { economicOperator: {
    role: 'group-mem', name: 'X', size: 'sme', country: 'BEL', identifier } } });
  assert.ok(validate(eo({ value: 'ID-1', schemeAgency: 'OP' })), 'complete identifier validates');
  assert.ok(!validate(eo({ value: 'ID-1' })), 'missing schemeAgency fails (BR-OTH-02)');
  assert.ok(!validate(eo({ value: 'ID-1', schemeAgency: '' })), 'empty schemeAgency fails');
});

// --- roundtrip ----------------------------------------------------------

test('the mapping roundtrips the example', () => {
  assert.deepEqual(unmap(spec, map(spec, example)), example);
});

// --- UBL structure ------------------------------------------------------

test('generated XML nests the EO under EconomicOperatorParty per BR-RESP-10', () => {
  const xml = map(spec, example);
  assert.match(xml, /<cac:EconomicOperatorParty>/);
  // role on EconomicOperatorRole, NOT on Party.
  assert.match(xml, /<cac:EconomicOperatorRole>\s*<cbc:RoleCode[^>]*>group-mem<\/cbc:RoleCode>/);
  assert.match(xml, /<cac:Party>/);
  assert.match(xml, /<cac:PartyName>\s*<cbc:Name>Constructora del Norte S\.A\.<\/cbc:Name>/);
  assert.match(xml, /<cbc:IndustryClassificationCode[^>]*>sme<\/cbc:IndustryClassificationCode>/);
  assert.match(xml, /<cac:PostalAddress>\s*<cac:Country>\s*<cbc:IdentificationCode[^>]*>ESP<\/cbc:IdentificationCode>/);
  assert.match(xml, /<cac:PartyIdentification>\s*<cbc:ID[^>]*schemeAgencyID="OP"[^>]*>AD123456789<\/cbc:ID>/);
});

test('the response document root is QualificationApplicationResponse', () => {
  const xml = map(spec, example);
  assert.match(xml, /<QualificationApplicationResponse\b/);
});

// --- codelist-attribute expansion ---------------------------------------

test('role, size and country expand to their Schematron-mandated attribute sets', async () => {
  const { expandCodelistAttributes } = await import('../../compiler/schematron-validate.mjs');
  const { loadValidatedCodelistProfile } = await import('../../compiler/codelist-attributes.mjs');
  const { profile } = loadValidatedCodelistProfile();
  const expanded = expandCodelistAttributes(map(spec, example), profile);

  assert.match(expanded, /RoleCode[^>]*listID="http:\/\/publications\.europa\.eu\/resource\/authority\/eo-role-type"/);
  assert.match(expanded, /IndustryClassificationCode[^>]*listID="http:\/\/publications\.europa\.eu\/resource\/authority\/economic-operator-size"/);
  assert.match(expanded, /IdentificationCode[^>]*listID="http:\/\/publications\.europa\.eu\/resource\/authority\/country"/);
  for (const shorthand of ['listID="eo-role-type"', 'listID="economic-operator-size"', 'listID="country"']) {
    assert.ok(!expanded.includes(shorthand), `${shorthand} should be expanded`);
  }
});

// --- codelist enums -----------------------------------------------------

test('the role enum is in sync with EoRoleType.gc', () => {
  const codes = readCodelistCodes(codelistPath('EoRoleType.gc'));
  assert.deepEqual([...schema.$defs.economicOperator.properties.role.enum].sort(), [...codes].sort());
  assert.equal(schema.$defs.economicOperator.properties.role.$codelist, 'eo-role-type');
});

test('the size enum is in sync with EconomicOperatorSize.gc', () => {
  const codes = readCodelistCodes(codelistPath('EconomicOperatorSize.gc'));
  assert.deepEqual([...schema.$defs.economicOperator.properties.size.enum].sort(), [...codes].sort());
  assert.equal(schema.$defs.economicOperator.properties.size.$codelist, 'economic-operator-size');
});

test('country is referenced by name, not inlined (341 codes)', () => {
  assert.equal(schema.$defs.economicOperator.properties.country.$codelist, 'country');
  assert.equal(schema.$defs.economicOperator.properties.country.enum, undefined);
});

// --- form lens ----------------------------------------------------------

test('the form lens covers all six fields, all required', () => {
  const byPath = new Map(form.fields.map(f => [f.dataPath, f]));
  assert.deepEqual([...byPath.keys()], [
    'partII.economicOperator.role',
    'partII.economicOperator.name',
    'partII.economicOperator.size',
    'partII.economicOperator.country',
    'partII.economicOperator.identifier.value',
    'partII.economicOperator.identifier.schemeAgency',
  ]);
  for (const f of form.fields) assert.equal(f.required, true, `${f.dataPath} must be required`);
  assert.equal(byPath.get('partII.economicOperator.role').codelist, 'eo-role-type');
  assert.equal(byPath.get('partII.economicOperator.size').codelist, 'economic-operator-size');
  assert.equal(byPath.get('partII.economicOperator.country').codelist, 'country');
});
