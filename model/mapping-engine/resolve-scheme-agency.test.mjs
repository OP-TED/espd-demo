// Tests for the scheme-agency profile resolver: it expands
// { fromMap: { profile } } references in a mapping spec into the inlined
// { path?, map, default } the mapping engine consumes, reading the policy from
// the committed registry (one source of truth).

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveSchemeAgency } from './resolve-scheme-agency.mjs';
import { map } from './mapper.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const read = (p) => JSON.parse(fs.readFileSync(path.join(here, p), 'utf8'));
const profileDoc = read('../model-sources/registries/scheme-agency-profile.json');

test('the committed registry defines the identifier-scheme-agency profile', () => {
  const p = profileDoc.profiles['identifier-scheme-agency'];
  assert.ok(p, 'profile must exist');
  assert.equal(p.default, 'OP', 'the documented default is OP');
  assert.deepEqual(p.map, { VAT: 'VIES', LEI: 'GLEIF', DUNS: 'D&B' });
});

test('a profile reference WITH a path resolves to { path, map, default }', () => {
  const spec = {
    target: { root: 'R', namespaces: {} },
    rules: [{
      from: 'id.value', to: 'cbc:ID',
      attributes: { schemeAgencyID: { fromMap: { path: 'id.scheme', profile: 'identifier-scheme-agency' } } },
    }],
  };
  const resolved = resolveSchemeAgency(spec, profileDoc);
  const fm = resolved.rules[0].attributes.schemeAgencyID.fromMap;
  assert.equal(fm.path, 'id.scheme');
  assert.equal(fm.default, 'OP');
  assert.deepEqual(fm.map, { VAT: 'VIES', LEI: 'GLEIF', DUNS: 'D&B' });
  assert.equal(fm.profile, undefined, 'the profile reference is replaced, not kept');
});

test('a profile reference WITHOUT a path resolves to the default only', () => {
  const spec = {
    target: { root: 'R', namespaces: {} },
    rules: [{
      from: 'ref.value', to: 'cbc:ContractFolderID',
      attributes: { schemeAgencyID: { fromMap: { profile: 'identifier-scheme-agency' } } },
    }],
  };
  const resolved = resolveSchemeAgency(spec, profileDoc);
  const fm = resolved.rules[0].attributes.schemeAgencyID.fromMap;
  assert.equal(fm.path, undefined);
  assert.equal(fm.default, 'OP');
});

test('the resolver does not mutate the input spec', () => {
  const spec = {
    target: { root: 'R', namespaces: {} },
    rules: [{ from: 'x', to: 'cbc:ID', attributes: { schemeAgencyID: { fromMap: { profile: 'identifier-scheme-agency' } } } }],
  };
  const before = JSON.stringify(spec);
  resolveSchemeAgency(spec, profileDoc);
  assert.equal(JSON.stringify(spec), before, 'input must be untouched (works on a clone)');
});

test('an unknown profile name throws', () => {
  const spec = {
    target: { root: 'R', namespaces: {} },
    rules: [{ from: 'x', to: 'cbc:ID', attributes: { schemeAgencyID: { fromMap: { profile: 'nope' } } } }],
  };
  assert.throws(() => resolveSchemeAgency(spec, profileDoc), /profile "nope" not found/);
});

test('resolver reaches attributes nested in forEach item fields and records entries', () => {
  const spec = {
    target: { root: 'R', namespaces: {} },
    rules: [
      {
        records: 'cac:Thing', forEach: 'things',
        item: { fields: [{ from: 'id', to: 'cbc:ID', attributes: { schemeAgencyID: { fromMap: { profile: 'identifier-scheme-agency' } } } }] },
      },
    ],
  };
  const resolved = resolveSchemeAgency(spec, profileDoc);
  const fm = resolved.rules[0].item.fields[0].attributes.schemeAgencyID.fromMap;
  assert.equal(fm.default, 'OP');
  assert.equal(fm.profile, undefined);
});

test('end-to-end: a resolved spec derives the agency from the scheme via map()', () => {
  const spec = resolveSchemeAgency({
    target: {
      root: 'QualificationApplicationRequest',
      namespaces: { '': 'urn:x', cac: 'urn:cac', cbc: 'urn:cbc' },
    },
    rules: [{
      from: 'id.value',
      to: 'cac:PartyIdentification/cbc:ID',
      attributes: {
        schemeID: { from: 'id.scheme' },
        schemeAgencyID: { fromMap: { path: 'id.scheme', profile: 'identifier-scheme-agency' } },
      },
    }],
  }, profileDoc);

  const agencyFor = (scheme) => {
    const xml = map(spec, { id: { value: 'X', scheme } });
    return xml.match(/<cbc:ID[^>]*schemeAgencyID="([^"]*)"/)?.[1];
  };
  assert.equal(agencyFor('VAT'), 'VIES');
  assert.equal(agencyFor('LEI'), 'GLEIF');
  assert.equal(agencyFor('DUNS'), 'D&amp;B'); // '&' XML-escaped in the attribute
  assert.equal(agencyFor('BRIS'), 'OP');       // unmapped scheme → default
});
