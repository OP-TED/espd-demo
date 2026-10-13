// Part II Section B — power(s) of attorney.
// No Schematron/sample reference exists for this block, so tests focus on
// schema validation, the repeatable map/unmap roundtrip, and UBL structure
// against UBL 2.4 PowerOfAttorneyType.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { map, unmap } from '../../mapping-engine/mapper.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const read = (f) => JSON.parse(fs.readFileSync(path.join(here, f), 'utf8'));

const schema = read('sectionB.schema.json');
const example = read('sectionB.example.json');
const spec = read('sectionB.mapping.json');
const form = read('sectionB.form.json');

const compile = async () => {
  const { default: Ajv } = await import('ajv');
  return new Ajv({ allErrors: true, strict: false }).compile(schema);
};

// --- schema -------------------------------------------------------------

test('the example validates against the schema', async () => {
  const validate = await compile();
  assert.ok(validate(example), `example invalid: ${JSON.stringify(validate.errors)}`);
});

test('an empty powers-of-attorney list is valid (the block is optional data)', async () => {
  const validate = await compile();
  assert.ok(validate({ partII: { powersOfAttorney: [] } }));
});

test('each power of attorney requires an agent, and an agent requires a name', async () => {
  const validate = await compile();
  assert.ok(!validate({ partII: { powersOfAttorney: [{ description: 'x' }] } }), 'PoA without agent must fail');
  assert.ok(!validate({ partII: { powersOfAttorney: [{ agent: {} }] } }), 'agent without name must fail');
  assert.ok(validate({ partII: { powersOfAttorney: [{ agent: { name: 'A' } }] } }), 'agent name alone is enough');
});

test('an agent identifier requires value AND a non-empty scheme agency', async () => {
  const validate = await compile();
  const poa = (identifier) => ({ partII: { powersOfAttorney: [{ agent: { name: 'A', identifier } }] } });
  assert.ok(validate(poa({ value: 'ID-1', schemeAgency: 'OP' })), 'complete identifier validates');
  assert.ok(!validate(poa({ value: 'ID-1' })), 'missing schemeAgency fails (BR-OTH-02)');
});

// --- roundtrip ----------------------------------------------------------

test('the mapping roundtrips the full example', () => {
  assert.deepEqual(unmap(spec, map(spec, example)), example);
});

test('multiple powers of attorney roundtrip, preserving order', () => {
  const doc = {
    partII: {
      powersOfAttorney: [
        { description: 'Sign', agent: { name: 'Alice', identifier: { value: 'A-1', schemeAgency: 'OP' }, country: 'BEL' } },
        { description: 'Submit', agent: { name: 'Bob', identifier: { value: 'B-2', schemeAgency: 'OP' }, country: 'FRA' } },
      ],
    },
  };
  assert.deepEqual(unmap(spec, map(spec, doc)), doc);
});

test('a minimal power of attorney (agent name only) roundtrips', () => {
  const doc = { partII: { powersOfAttorney: [{ agent: { name: 'Solo Agent' } }] } };
  assert.deepEqual(unmap(spec, map(spec, doc)), doc);
});

// --- UBL structure ------------------------------------------------------

test('each power of attorney becomes a cac:PowerOfAttorney with a nested AgentParty', () => {
  const xml = map(spec, example);
  assert.match(xml, /<cac:EconomicOperatorParty>\s*<cac:Party>\s*<cac:PowerOfAttorney>/);
  assert.match(xml, /<cbc:Description>Authority to sign[^<]*<\/cbc:Description>/);
  assert.match(xml, /<cac:AgentParty>\s*<cac:PartyName>\s*<cbc:Name>María López García<\/cbc:Name>/);
  assert.match(xml, /<cac:AgentParty>[\s\S]*<cbc:ID[^>]*schemeAgencyID="OP"[^>]*>ES-99887766X<\/cbc:ID>/);
});

test('two powers of attorney produce two distinct cac:PowerOfAttorney wrappers', () => {
  const doc = {
    partII: { powersOfAttorney: [
      { agent: { name: 'Alice' } },
      { agent: { name: 'Bob' } },
    ] },
  };
  const xml = map(spec, doc);
  assert.equal((xml.match(/<cac:PowerOfAttorney>/g) || []).length, 2);
});

test('the agent country expands to the country codelist attribute set', async () => {
  const { expandCodelistAttributes } = await import('../../compiler/schematron-validate.mjs');
  const { loadValidatedCodelistProfile } = await import('../../compiler/codelist-attributes.mjs');
  const { profile } = loadValidatedCodelistProfile();
  const expanded = expandCodelistAttributes(map(spec, example), profile);
  assert.match(expanded, /IdentificationCode[^>]*listID="http:\/\/publications\.europa\.eu\/resource\/authority\/country"/);
});

// --- form lens ----------------------------------------------------------

test('the form lens is a repeatable PoA block with an agent name required', () => {
  const byPath = new Map(form.fields.map(f => [f.dataPath, f]));
  assert.ok(byPath.has('partII.powersOfAttorney[].agent.name'));
  assert.equal(byPath.get('partII.powersOfAttorney[].agent.name').required, true);
  for (const f of form.fields) assert.equal(f.repeatable, true, `${f.dataPath} must be repeatable`);
  // scheme agency gated by the identifier value.
  assert.deepEqual(byPath.get('partII.powersOfAttorney[].agent.identifier.schemeAgency').visibleWhen, {
    path: 'partII.powersOfAttorney[].agent.identifier.value',
    isPresent: true,
  });
});
