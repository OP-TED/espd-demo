// Per-leaf CODE codelist (task 7.0d).
//
// The CODE value type's codelist VARIES by use — the XSLT branches on a
// per-property codelist name (financial-ratio-type / occupation / eo-role-type).
// So the codelist is NOT intrinsic to the value type: it is declared per LEAF in
// the sidecar, attached by the overlay, and read by the generators. Proven with
// two criteria using DIFFERENT codelists with no compiler change:
//   C34 slc-stand-ratio  -> financial-ratio-type (OP, 5.0.0)
//   C25 slc-suit-reg-prof -> occupation          (EMPL, dated 20221214-0)

import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEdm, loadSidecar, compile } from './compile.mjs';
import { generateRequestMapping } from './generate-request-mapping.mjs';
import { generateFormStructure } from './generate-form-structure.mjs';
import { expandCodelistAttributes } from './schematron-validate.mjs';
import { loadValidatedCodelistProfile } from './codelist-attributes.mjs';
import { map } from '../mapping-engine/mapper.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const edmPath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');

function compileC(code) {
  return compile(loadEdm(edmPath), code, loadSidecar(code));
}
function leafById(criterion, id) {
  let found;
  (function w(n){for(const c of n.children??[]){if(c.id===id)found=c;w(c);}})(criterion);
  return found;
}

test('CODE value type carries no intrinsic codelist (codelistFromLeaf)', () => {
  const { registry } = compileC('slc-suit-reg-prof');
  const vt = registry.valueTypes.CODE;
  assert.equal(vt.requestXml.codelistFromLeaf, true);
  assert.equal(vt.requestXml.codelist, undefined);
  assert.equal(vt.instanceShape.codeList, undefined);
});

test('the overlay attaches a per-leaf codelist from the sidecar', () => {
  const { compiled: c25 } = compileC('slc-suit-reg-prof');
  const { compiled: c34 } = compileC('slc-stand-ratio');
  assert.equal(leafById(c25, 'slc-suit-reg-prof.occupation').codelist, 'occupation');
  assert.equal(leafById(c34, 'slc-stand-ratio.ratio-type').codelist, 'financial-ratio-type');
});

test('C25 request CODE expands to the occupation list (EMPL, dated)', () => {
  const { compiled, registry } = compileC('slc-suit-reg-prof');
  const { profile } = loadValidatedCodelistProfile();
  const request = generateRequestMapping(compiled, registry);
  const xml = expandCodelistAttributes(
    map(request, { partIV: { selectionCriteria: { 'slc-suit-reg-prof': { requirement: { lotIdentifiers: ['LOT-1'], occupation: 'occ' } } } } }),
    profile);
  assert.match(xml, /<cbc:ExpectedCode[^>]*listID="http:\/\/publications\.europa\.eu\/resource\/authority\/occupation"/);
  assert.match(xml, /<cbc:ExpectedCode[^>]*listAgencyID="EMPL"/);
  assert.match(xml, /<cbc:ExpectedCode[^>]*listVersionID="20221214-0"/);
});

test('the form derives the codelist from the leaf for CODE', () => {
  const { compiled, registry } = compileC('slc-suit-reg-prof');
  const form = generateFormStructure(compiled, registry, { partId: 'IV', presentation: null });
  const occ = form.criteria[0].groups.flatMap(g => g.fields).find(f => f.semanticId === 'slc-suit-reg-prof.occupation');
  assert.equal(occ.uiType, 'code');
  assert.equal(occ.codelist, 'occupation');
});

test('a CODE leaf with no per-leaf codelist fails fast in request mapping', () => {
  const { compiled, registry } = compileC('slc-suit-reg-prof');
  const stripped = structuredClone(compiled);
  (function w(n){for(const c of n.children??[]){if(c.id==='slc-suit-reg-prof.occupation')delete c.codelist;w(c);}})(stripped);
  assert.throws(() => generateRequestMapping(stripped, registry), /needs a per-leaf 'codelist'/i);
});

test('two criteria prove the SAME value type takes DIFFERENT codelists', () => {
  const { compiled: c25, registry } = compileC('slc-suit-reg-prof');
  const { compiled: c34 } = compileC('slc-stand-ratio');
  // Same registered value type...
  assert.equal(leafById(c25, 'slc-suit-reg-prof.occupation').valueType, 'CODE');
  assert.equal(leafById(c34, 'slc-stand-ratio.ratio-type').valueType, 'CODE');
  // ...different codelists, resolved per leaf.
  assert.notEqual(
    leafById(c25, 'slc-suit-reg-prof.occupation').codelist,
    leafById(c34, 'slc-stand-ratio.ratio-type').codelist);
});
