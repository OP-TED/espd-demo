// Task 2.3 test — Option B encoding profile encodes core nodes correctly.
//
// Usage: node encoding-profile.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { readStructuralCore, leavesOf } from './read-structural-core.mjs';
import { overlayEnrichment } from './overlay-enrichment.mjs';
import { loadValidatedRegistry } from './value-type-registry.mjs';
import { loadValidatedCodelistProfile } from './codelist-attributes.mjs';
import {
  loadEncodingProfile, validateEncodingProfile, encodeNode, profileKind,
} from './encoding-profile.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const edm = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const CODE = 'slc-stand-to-spec-avg';

const core = readStructuralCore(edm, CODE);
const sidecar = JSON.parse(fs.readFileSync(path.join(here, '..', 'model-sources', 'criteria', `${CODE}.sidecar.json`), 'utf8'));
const criterion = overlayEnrichment(core, sidecar);
const profile = loadEncodingProfile();
const { registry } = loadValidatedRegistry();
const { profile: codelistProfile } = loadValidatedCodelistProfile();

const leaves = leavesOf(criterion);
const leafById = Object.fromEntries(leaves.map(l => [l.id, l]));

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`\u2713 ${name}`); }
  catch (err) { failures++; console.error(`\u2717 ${name}: ${err.message.split('\n')[0]}`); }
}

check('profile is structurally valid (kinds + sameAs)', () => {
  assert.ok(validateEncodingProfile(profile));
});

check('criterion encodes to cac:TenderingCriterion with ID=uuid + CriterionTypeCode', () => {
  const enc = encodeNode({ profile, codelistProfile, registry, node: criterion, kind: 'criterion' });
  assert.equal(enc.element, 'cac:TenderingCriterion');
  const id = enc.children.find(c => c.element === 'cbc:ID');
  assert.equal(id.text, criterion.uuid);
  assert.equal(id.attributes.schemeID, 'criterion');
  const typeCode = enc.children.find(c => c.element === 'cbc:CriterionTypeCode');
  assert.equal(typeCode.text, CODE);
  assert.equal(typeCode.attributes.listID, 'http://publications.europa.eu/resource/authority/criterion');
});

check('top-level group encodes to TenderingCriterionPropertyGroup, ID=requestpath, PropertyGroupTypeCode=ON*', () => {
  const rg1 = criterion.children.find(c => c.requestpath?.endsWith('/RG1'));
  const enc = encodeNode({ profile, codelistProfile, registry, node: rg1, kind: profileKind(rg1, false) });
  assert.equal(enc.element, 'cac:TenderingCriterionPropertyGroup');
  assert.equal(enc.children.find(c => c.element === 'cbc:ID').text, rg1.requestpath);
  const pgtc = enc.children.find(c => c.element === 'cbc:PropertyGroupTypeCode');
  assert.equal(pgtc.text, 'ON*');
  assert.equal(pgtc.attributes.listID, 'property-group-type');
});

check('nested group encodes to SubsidiaryTenderingCriterionPropertyGroup', () => {
  const enc = encodeNode({ profile, codelistProfile, registry, node: { nodeKind: 'group', condition: 'false', requestpath: 'X/QSG1' }, kind: profileKind({ nodeKind: 'group' }, true) });
  assert.equal(enc.element, 'cac:SubsidiaryTenderingCriterionPropertyGroup');
  assert.equal(enc.children.find(c => c.element === 'cbc:PropertyGroupTypeCode').text, 'ONFALSE');
});

check('MINIMUM_AMOUNT requirement leaf (request) emits cbc:MinimumAmount + currencyID', () => {
  const leaf = leafById['slc-stand-to-spec-avg.minimum-amount'];
  const enc = encodeNode({ profile, codelistProfile, registry, node: leaf, kind: 'leaf', side: 'request', criterion });
  assert.equal(enc.element, 'cac:TenderingCriterionProperty');
  assert.equal(enc.children.find(c => c.element === 'cbc:TypeCode').text, 'REQUIREMENT');
  assert.equal(enc.children.find(c => c.element === 'cbc:ValueDataTypeCode').text, 'MINIMUM_AMOUNT');
  const value = enc.children.find(c => c.element === 'cbc:MinimumAmount');
  assert.ok(value, 'expected cbc:MinimumAmount value child');
  assert.ok(value.from.endsWith('requirement.minimumAmount'), `unexpected from: ${value.from}`);
  assert.deepEqual(value.attributes, ['currencyID']);
});

check('INDICATOR question leaf (response) emits ResponseValue/cbc:ResponseIndicator', () => {
  const leaf = leafById['slc-stand-to-spec-avg.fulfilled-by-itself'];
  const enc = encodeNode({ profile, codelistProfile, registry, node: leaf, kind: 'leaf', side: 'response', criterion });
  assert.equal(enc.children.find(c => c.element === 'cbc:TypeCode').text, 'QUESTION');
  const value = enc.children.find(c => c.element === 'cac:ResponseValue/cbc:ResponseIndicator');
  assert.ok(value, 'expected ResponseValue/ResponseIndicator value child');
  assert.ok(value.from.endsWith('response.fulfilledByItself'));
});

check('requirement leaf on response side has no value child (binding absent)', () => {
  const leaf = leafById['slc-stand-to-spec-avg.minimum-amount']; // MINIMUM_AMOUNT has no responseXml
  const enc = encodeNode({ profile, codelistProfile, registry, node: leaf, kind: 'leaf', side: 'response', criterion });
  const valueChildren = enc.children.filter(c => !['cbc:ID','cbc:Name','cbc:Description','cbc:TypeCode','cbc:ValueDataTypeCode'].includes(c.element));
  assert.equal(valueChildren.length, 0, 'expected no value child on response side for MINIMUM_AMOUNT');
});

if (failures) { console.error(`\n${failures} test(s) failed.`); process.exit(1); }
console.log('\nAll encoding-profile tests passed.');
