// Task 3.1 test — request-mapping generator produces a valid structure spec
// whose value-carrying nodes match the hand-authored part-IV.request.mapping.json.
//
// Usage: node generate-request-mapping.test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { readStructuralCore } from './read-structural-core.mjs';
import { overlayEnrichment } from './overlay-enrichment.mjs';
import { loadValidatedRegistry } from './value-type-registry.mjs';
import { generateRequestMapping } from './generate-request-mapping.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const edm = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const CODE = 'slc-stand-to-spec-avg';

const core = readStructuralCore(edm, CODE);
const sidecar = JSON.parse(fs.readFileSync(path.join(here, '..', 'model-sources', 'criteria', `${CODE}.sidecar.json`), 'utf8'));
const criterion = overlayEnrichment(core, sidecar);
const { registry } = loadValidatedRegistry();
const spec = generateRequestMapping(criterion, registry);

// Collect every { element, from, const, fromItem, type } leaf across the structure.
function* walk(node, pathStr = node.element) {
  yield { pathStr, node };
  for (const c of node.children ?? []) yield* walk(c, `${pathStr}/${c.element}`);
}
const all = [...walk(spec.rules[0].structure)];
const byFrom = new Map(all.filter(x => x.node.from).map(x => [x.node.from, x.node]));

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`\u2713 ${name}`); }
  catch (err) { failures++; console.error(`\u2717 ${name}: ${err.message.split('\n')[0]}`); }
}

check('target root is QualificationApplicationRequest', () => {
  assert.equal(spec.target.root, 'QualificationApplicationRequest');
});

check('single top-level structure rule rooted at cac:TenderingCriterion', () => {
  assert.equal(spec.rules.length, 1);
  assert.equal(spec.rules[0].structure.element, 'cac:TenderingCriterion');
});

check('criterion cbc:ID = uuid; CriterionTypeCode = code', () => {
  const children = spec.rules[0].structure.children;
  const id = children.find(c => c.element === 'cbc:ID');
  assert.equal(id.const, criterion.uuid);
  assert.equal(children.find(c => c.element === 'cbc:CriterionTypeCode').const, CODE);
});

check('lotIdentifiers -> repeated cac:TenderingCriterionProperty with cbc:ExpectedID fromItem', () => {
  const forEachNode = all.find(x => x.node.forEach && x.node.forEach.endsWith('requirement.lotIdentifiers'));
  assert.ok(forEachNode, 'expected a forEach property for lotIdentifiers');
  const expectedId = (forEachNode.node.children ?? []).find(c => c.element === 'cbc:ExpectedID');
  assert.equal(expectedId.fromItem, '.');
  assert.equal(expectedId.attributes.schemeAgencyID, 'OP');
});

check('numberOfYears -> cbc:ExpectedValueNumeric type number', () => {
  const n = byFrom.get('partIV.selectionCriteria.slc-stand-to-spec-avg.requirement.numberOfYears');
  assert.ok(n, 'numberOfYears value node present');
  assert.equal(n.element, 'cbc:ExpectedValueNumeric');
  assert.equal(n.type, 'number');
});

check('minimumAmount -> cbc:MinimumAmount with currencyID from currency', () => {
  const n = byFrom.get('partIV.selectionCriteria.slc-stand-to-spec-avg.requirement.minimumAmount.value');
  assert.ok(n, 'minimumAmount value node present');
  assert.equal(n.element, 'cbc:MinimumAmount');
  assert.equal(n.type, 'number');
  assert.equal(n.attributes.currencyID.from, 'partIV.selectionCriteria.slc-stand-to-spec-avg.requirement.minimumAmount.currency');
});

check('businessDomain -> cbc:ExpectedDescription type string', () => {
  const n = byFrom.get('partIV.selectionCriteria.slc-stand-to-spec-avg.requirement.businessDomain');
  assert.ok(n, 'businessDomain value node present');
  assert.equal(n.element, 'cbc:ExpectedDescription');
});

check('QUESTION leaves carry NO request value element (declaration only)', () => {
  // fulfilledByItself is a response-only question; must not appear as a `from` on request.
  assert.ok(!byFrom.has('partIV.selectionCriteria.slc-stand-to-spec-avg.response.fulfilledByItself'));
  // Its property node still exists with metadata (TypeCode QUESTION) though.
  const q1 = all.find(x => x.node.element === 'cbc:ID' && x.node.const?.endsWith('/QSG1/Q1'));
  assert.ok(q1, 'QSG1/Q1 declaration property present');
});

check('every data-bound node resolves to a requirement instance path', () => {
  for (const [fromPath] of byFrom) {
    assert.ok(fromPath.includes('.requirement.'), `request value must bind to requirement side: ${fromPath}`);
  }
});

if (failures) { console.error(`\n${failures} test(s) failed.`); process.exit(1); }
console.log('\nAll request-mapping generator tests passed.');
