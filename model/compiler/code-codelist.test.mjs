// Per-leaf CODE codelist, as published.
//
// The CODE value type's codelist VARIES by use — the XSLT branches on a per-property
// codelist name (financial-ratio-type / occupation / eo-role-type). So the codelist is
// NOT intrinsic to the value type: it is declared per LEAF in the enrichment sidecar and
// carried on the compiled leaf. Proven with two criteria using DIFFERENT codelists:
//   C34 slc-stand-ratio   -> financial-ratio-type (OP, 5.0.0)
//   C25 slc-suit-reg-prof -> occupation           (EMPL, dated 20221214-0)
//
// This is the CONSUMER side: what the published model carries, and that the published
// request mapping and the form generator use it. (That the generator fails fast on a CODE
// leaf with no codelist is a generator property, tested in espd-tools/model-compiler.)

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { generateFormStructure } from './generate-form-structure.mjs';
import { expandCodelistAttributes } from './schematron-validate.mjs';
import { loadCodelistProfile } from '../mapping-engine/codelist-profile.mjs';
import { map } from '../mapping-engine/mapper.mjs';
import { generatedRoot, loadCompiled, loadValueTypeRegistry } from './published-model.mjs';

const compiledOf = (key) => loadCompiled(key).criterion;
function leafById(criterion, id) {
  let found;
  (function w(n){for(const c of n.children??[]){if(c.id===id)found=c;w(c);}})(criterion);
  return found;
}

test('CODE value type carries no intrinsic codelist (codelistFromLeaf)', () => {
  const vt = loadValueTypeRegistry().valueTypes.CODE;
  assert.equal(vt.requestXml.codelistFromLeaf, true);
  assert.equal(vt.requestXml.codelist, undefined);
  assert.equal(vt.instanceShape.codeList, undefined);
});

test('the compiled criterion carries a per-leaf codelist from the enrichment', () => {
  assert.equal(leafById(compiledOf('slc-suit-reg-prof'), 'slc-suit-reg-prof.occupation').codelist, 'occupation');
  assert.equal(leafById(compiledOf('slc-stand-ratio'), 'slc-stand-ratio.ratio-type').codelist, 'financial-ratio-type');
});

test('C25 request CODE expands to the occupation list (EMPL, dated)', () => {
  const request = JSON.parse(fs.readFileSync(path.join(generatedRoot, 'xml-mapping', 'slc-suit-reg-prof.request.mapping.json'), 'utf8'));
  const xml = expandCodelistAttributes(
    map(request, { partIV: { selectionCriteria: { 'slc-suit-reg-prof': { requirement: { lotIdentifiers: ['LOT-1'], occupation: 'occ' } } } } }),
    loadCodelistProfile());
  assert.match(xml, /<cbc:ExpectedCode[^>]*listID="http:\/\/publications\.europa\.eu\/resource\/authority\/occupation"/);
  assert.match(xml, /<cbc:ExpectedCode[^>]*listAgencyID="EMPL"/);
  assert.match(xml, /<cbc:ExpectedCode[^>]*listVersionID="20221214-0"/);
});

test('the form derives the codelist from the leaf for CODE', () => {
  const form = generateFormStructure(compiledOf('slc-suit-reg-prof'), loadValueTypeRegistry(), { partId: 'IV', presentation: null });
  const occ = form.criteria[0].groups.flatMap(g => g.fields).find(f => f.semanticId === 'slc-suit-reg-prof.occupation');
  assert.equal(occ.uiType, 'code');
  assert.equal(occ.codelist, 'occupation');
});

test('two criteria prove the SAME value type takes DIFFERENT codelists', () => {
  const c25 = compiledOf('slc-suit-reg-prof');
  const c34 = compiledOf('slc-stand-ratio');
  // Same registered value type...
  assert.equal(leafById(c25, 'slc-suit-reg-prof.occupation').valueType, 'CODE');
  assert.equal(leafById(c34, 'slc-stand-ratio.ratio-type').valueType, 'CODE');
  // ...different codelists, resolved per leaf.
  assert.notEqual(
    leafById(c25, 'slc-suit-reg-prof.occupation').codelist,
    leafById(c34, 'slc-stand-ratio.ratio-type').codelist);
});
