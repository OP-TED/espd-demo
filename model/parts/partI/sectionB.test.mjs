// Part I Section B — contracting authority (buyer).
// Validates the schema/example, roundtrips through mapper.mjs, checks the UBL
// structure against the Schematron-mandated minimum (BR-REQ-20), and guards the
// codelist-derived enums against their .gc sources.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { map, unmap } from '../../mapping-engine/mapper.mjs';
import { readCodelistCodes } from '../read-codelist.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const read = (f) => JSON.parse(fs.readFileSync(path.join(here, f), 'utf8'));

const schema = read('sectionB.schema.json');
const example = read('sectionB.example.json');
const spec = read('sectionB.mapping.json');
const form = read('sectionB.form.json');

const CODELISTS = path.join(here, '..', '..', '..', '..', 'ESPD-EDM', 'codelists');

const compile = async () => {
  const { default: Ajv } = await import('ajv');
  return new Ajv({ allErrors: true, strict: false }).compile(schema);
};

// --- schema -------------------------------------------------------------

test('the example validates against the schema', async () => {
  const validate = await compile();
  assert.ok(validate(example), `example invalid: ${JSON.stringify(validate.errors)}`);
});

test('the Schematron-mandated minimum (name + country) is required; identifier is not', async () => {
  const validate = await compile();
  // BR-REQ-20-02/03 are fatal -> required.
  assert.ok(validate({ partI: { contractingAuthority: { officialName: 'X', country: 'BEL' } } }),
    'name + country alone must validate (identifier is only a warning-level rule)');
  // Missing either fatal field must fail.
  assert.ok(!validate({ partI: { contractingAuthority: { country: 'BEL' } } }), 'missing officialName must fail');
  assert.ok(!validate({ partI: { contractingAuthority: { officialName: 'X' } } }), 'missing country must fail');
});

test('an identifier requires a value, a scheme AND a scheme agency', async () => {
  const validate = await compile();
  const ca = (identifier) => ({ partI: { contractingAuthority: { officialName: 'X', country: 'BEL', identifier } } });
  assert.ok(validate(ca({ value: 'B82387770', scheme: 'VAT', schemeAgency: 'VIES' })),
    'complete identifier must validate');
  assert.ok(!validate(ca({ value: 'B82387770', scheme: 'VAT' })),
    'identifier without schemeAgency must fail — BR-OTH-02 makes @schemeAgencyID mandatory on cbc:ID');
  assert.ok(!validate(ca({ value: 'B82387770', schemeAgency: 'VIES' })), 'identifier without scheme must fail');
  assert.ok(!validate(ca({ scheme: 'VAT', schemeAgency: 'VIES' })), 'identifier without value must fail');
  assert.ok(!validate(ca({ value: 'B82387770', scheme: 'VAT', schemeAgency: '' })),
    'an empty schemeAgency must fail');
});

// --- roundtrip ----------------------------------------------------------

test('the mapping roundtrips the full example (with identifier)', () => {
  const xml = map(spec, example);
  assert.deepEqual(unmap(spec, xml), example);
});

test('the mapping roundtrips a minimal buyer (no identifier)', () => {
  const minimal = { partI: { contractingAuthority: { officialName: 'Agence des Marchés', country: 'FRA' } } };
  const xml = map(spec, minimal);
  assert.deepEqual(unmap(spec, xml), minimal);
});

test('the identifier scheme roundtrips through the @schemeID attribute', () => {
  for (const scheme of readCodelistCodes(path.join(CODELISTS, 'EOIDType.gc'))) {
    const doc = {
      partI: {
        contractingAuthority: {
          officialName: 'X', country: 'BEL',
          identifier: { value: 'ID-1', scheme, schemeAgency: 'AGENCY' },
        },
      },
    };
    const back = unmap(spec, map(spec, doc));
    assert.equal(back.partI.contractingAuthority.identifier.scheme, scheme, `scheme ${scheme} must roundtrip`);
    assert.equal(back.partI.contractingAuthority.identifier.schemeAgency, 'AGENCY');
  }
});

test('the party identifier carries @schemeAgencyID, mandatory per BR-OTH-02', () => {
  // Every cbc:ID is in the BR-OTH-02 element list, so a party identifier without
  // a non-empty @schemeAgencyID is fatally invalid. Guard against regressing to
  // emitting only @schemeID.
  const xml = map(spec, example);
  const idTag = xml.match(/<cbc:ID[^>]*>/)[0];
  assert.match(idTag, /schemeAgencyID="VIES"/);
  assert.match(idTag, /schemeID="VAT"/);
});

// --- UBL structure ------------------------------------------------------

test('generated XML nests the buyer under ContractingParty/Party per BR-REQ-20', () => {
  const xml = map(spec, example);
  assert.match(xml, /<cac:ContractingParty>/);
  assert.match(xml, /<cac:Party>/);
  // BR-REQ-20-02 official name.
  assert.match(xml, /<cac:PartyName>\s*<cbc:Name>Ministerio de Hacienda<\/cbc:Name>/);
  // BR-REQ-20-03 country, inside PostalAddress/Country.
  assert.match(xml, /<cac:PostalAddress>\s*<cac:Country>\s*<cbc:IdentificationCode[^>]*>ESP<\/cbc:IdentificationCode>/);
  // BR-REQ-20-04 identifier: the EOIDType code goes on @schemeID (NOT on
  // @schemeAgencyID, which names the maintaining agency instead).
  assert.match(xml, /<cac:PartyIdentification>\s*<cbc:ID[^>]*schemeID="VAT"[^>]*>B82387770<\/cbc:ID>/);
});

test('the country carries the country codelist shorthand for attribute expansion', () => {
  const xml = map(spec, example);
  assert.match(xml, /cbc:IdentificationCode[^>]*listID="country"/);
});

test('country codelist-attribute expansion produces the Schematron-mandated set', async () => {
  const { expandCodelistAttributes } = await import('../../compiler/schematron-validate.mjs');
  const { loadValidatedCodelistProfile } = await import('../../compiler/codelist-attributes.mjs');
  const { profile } = loadValidatedCodelistProfile();

  const expanded = expandCodelistAttributes(map(spec, example), profile);
  assert.match(expanded, /listID="http:\/\/publications\.europa\.eu\/resource\/authority\/country"/);
  assert.match(expanded, /listVersionID="20250618-0"/);
  assert.ok(!expanded.includes('listID="country"'), 'shorthand should be expanded');
});

// --- codelist enums -----------------------------------------------------

test('the identifier scheme enum is in sync with EOIDType.gc (regenerate if this fails)', () => {
  const codes = readCodelistCodes(path.join(CODELISTS, 'EOIDType.gc'));
  const inSchema = schema.$defs.partyIdentifier.properties.scheme.enum;
  assert.deepEqual([...inSchema].sort(), [...codes].sort(),
    'schema `scheme` enum drifted from EOIDType.gc — update sectionB.schema.json');
  assert.equal(schema.$defs.partyIdentifier.properties.scheme.$codelist, 'EOIDType');
});

test('the schema rejects a scheme outside EOIDType', async () => {
  const validate = await compile();
  // Otherwise complete, so the failure isolates the enum.
  const bad = {
    partI: {
      contractingAuthority: {
        officialName: 'X', country: 'BEL',
        identifier: { value: 'ID-1', scheme: 'NONSENSE', schemeAgency: 'VIES' },
      },
    },
  };
  assert.ok(!validate(bad), 'a non-codelist scheme must be rejected');
});

test('country is codelist-referenced and accepts real Country.gc codes', async () => {
  const validate = await compile();
  // Country has 341 codes, too many to inline — the field carries a $codelist
  // marker instead and the CVA validates the value at the XML layer.
  assert.equal(schema.$defs.contractingAuthority.properties.country.$codelist, 'country');
  const codes = readCodelistCodes(path.join(CODELISTS, 'Country.gc'));
  assert.ok(codes.length > 200, `expected the full country list, got ${codes.length}`);
  for (const code of [codes[0], codes[50], codes.at(-1)]) {
    assert.ok(validate({ partI: { contractingAuthority: { officialName: 'X', country: code } } }),
      `country code '${code}' should be accepted`);
  }
});

// --- form lens ----------------------------------------------------------

test('the form lens covers the buyer fields with severity-matched requiredness', () => {
  const byPath = new Map(form.fields.map(f => [f.dataPath, f]));
  assert.deepEqual([...byPath.keys()], [
    'partI.contractingAuthority.officialName',
    'partI.contractingAuthority.country',
    'partI.contractingAuthority.identifier.value',
    'partI.contractingAuthority.identifier.scheme',
    'partI.contractingAuthority.identifier.schemeAgency',
  ]);

  // Fatal rules -> required; warning-level identifier -> optional.
  assert.equal(byPath.get('partI.contractingAuthority.officialName').required, true);
  assert.equal(byPath.get('partI.contractingAuthority.country').required, true);
  assert.equal(byPath.get('partI.contractingAuthority.identifier.value').required, false);

  // Country + scheme are codelist pickers.
  assert.equal(byPath.get('partI.contractingAuthority.country').codelist, 'country');
  assert.equal(byPath.get('partI.contractingAuthority.identifier.scheme').codelist, 'EOIDType');

  // The scheme only makes sense once a value is being entered.
  assert.deepEqual(byPath.get('partI.contractingAuthority.identifier.scheme').visibleWhen, {
    path: 'partI.contractingAuthority.identifier.value',
    isPresent: true,
  });
});

test('every form dataPath exists in the schema', () => {
  const resolveInSchema = (dataPath) => {
    // partI.contractingAuthority.identifier.scheme -> walk the $defs chain.
    const segs = dataPath.split('.').slice(1); // drop 'partI'
    let node = schema.properties.partI.properties;
    for (let i = 0; i < segs.length; i++) {
      let prop = node[segs[i]];
      if (!prop) return false;
      if (prop.$ref) {
        const key = prop.$ref.replace('#/$defs/', '');
        prop = schema.$defs[key];
      }
      if (i === segs.length - 1) return true;
      node = prop.properties;
      if (!node) return false;
    }
    return true;
  };
  for (const f of form.fields) {
    assert.ok(resolveInSchema(f.dataPath), `form field ${f.dataPath} is not in the schema`);
  }
});
