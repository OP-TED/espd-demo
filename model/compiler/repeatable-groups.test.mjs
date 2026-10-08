// Task 7.0 — repeatable groups.
//
// A group with EA cardinality 0..n / 1..n may carry its own sidecar binding
// (repeatable:true) declaring an ARRAY CONTAINER. Its leaves bind to paths
// through that container, and the compiler renders the container segment as an
// array of objects in the instance-data schema and example, and as a `[]`
// segment in the form lens. XML mapping of repeatable groups is deferred (7.0b):
// the mapping generators fail fast rather than emit a flattened mapping.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEdm, loadSidecar, compile, generateMappings } from './compile.mjs';
import { generateInstanceSchema, generateExample, generateCriterionSchema } from './generate-instance-schema.mjs';
import { generateFormStructure } from './generate-form-structure.mjs';
import { overlayEnrichment } from './overlay-enrichment.mjs';
import { readStructuralCore } from './read-structural-core.mjs';
import { arrayContainerPrefix } from './encoding-profile.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const edmPath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const CODE = 'exg-crim-part';

function compileC01() {
  const edm = loadEdm(edmPath);
  return compile(edm, CODE, loadSidecar(CODE));
}

test('the overlay records an array container from the repeatable-group binding', () => {
  const { compiled } = compileC01();
  assert.ok(Array.isArray(compiled.arrayContainers), 'arrayContainers must be recorded');
  const conv = compiled.arrayContainers.find(c => c.path.join('.') === 'convictions');
  assert.ok(conv, 'convictions container present');
  assert.equal(conv.side, 'response');
});

test('arrayContainerPrefix flags leaves inside the repeatable group', () => {
  const { compiled } = compileC01();
  const leaves = [];
  (function w(n) { for (const c of n.children ?? []) { if (c.instanceBinding && c.nodeKind !== 'group') leaves.push(c); w(c); } })(compiled);

  const inside = leaves.find(l => l.id === 'exg-crim-part.conviction-date');
  const outside = leaves.find(l => l.id === 'exg-crim-part.answer');
  assert.equal(arrayContainerPrefix(compiled, inside), 1, 'convictions is a 1-segment container prefix');
  assert.equal(arrayContainerPrefix(compiled, outside), 0, 'answer is not inside any repeatable group');
});

test('the instance-data schema renders the container as an array of objects', () => {
  const { compiled, registry } = compileC01();
  const schema = generateCriterionSchema(compiled, registry, loadHintsSafe());
  const conv = schema.properties.response.properties.convictions;
  assert.equal(conv.type, 'array');
  assert.equal(conv.items.type, 'object');
  // The conviction leaf-fields live in the ITEM schema, not the container.
  for (const prop of ['dateOfConviction', 'reason', 'whoConvicted', 'exclusionPeriod', 'selfCleaning']) {
    assert.ok(conv.items.properties[prop], `item should carry ${prop}`);
  }
  // The repeatable group's presence is instance-dependent -> container optional.
  assert.ok(!(schema.properties.response.required ?? []).includes('convictions'));
});

test('a conviction example element validates against the array item schema', async () => {
  const { compiled, registry } = compileC01();
  const schema = generateInstanceSchema(compiled, registry, { partId: 'III' });
  const example = generateExample(compiled, registry);

  // Build a non-minimal example that actually populates one conviction, to prove
  // the array shape accepts a real element.
  const crit = example.partIII.exclusionGrounds[CODE];
  crit.response.answer = true;
  crit.response.convictions = [{
    dateOfConviction: '2020-01-01',
    reason: 'x',
    whoConvicted: 'y',
    selfCleaning: { taken: false },
  }];

  const { default: Ajv } = await import('ajv');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  assert.ok(validate(example), `populated conviction must validate: ${JSON.stringify(validate.errors)}`);
});

test('the form lens emits the container segment with a [] marker', () => {
  const { compiled, registry } = compileC01();
  const form = generateFormStructure(compiled, registry, { partId: 'III', presentation: null });
  const paths = form.criteria[0].groups.flatMap(g => g.fields).map(f => f.dataPath);

  assert.ok(paths.includes(`partIII.exclusionGrounds.${CODE}.response.convictions[].dateOfConviction`));
  assert.ok(paths.includes(`partIII.exclusionGrounds.${CODE}.response.convictions[].selfCleaning.taken`));
  // The non-repeating answer carries no array marker.
  assert.ok(paths.includes(`partIII.exclusionGrounds.${CODE}.response.answer`));
});

test('conditional visibility still resolves inside the repeatable group', () => {
  const { compiled, registry } = compileC01();
  const form = generateFormStructure(compiled, registry, { partId: 'III', presentation: null });
  const fields = new Map();
  for (const g of form.criteria[0].groups) for (const f of g.fields) fields.set(f.dataPath, f);

  // self-cleaning description (ONTRUE) is gated by selfCleaning.taken, both
  // inside convictions[].
  const desc = fields.get(`partIII.exclusionGrounds.${CODE}.response.convictions[].selfCleaning.description`);
  assert.ok(desc.visibleWhen, 'description must be conditional');
  assert.ok(desc.visibleWhen.path.endsWith('selfCleaning.taken'));
  assert.equal(desc.visibleWhen.equals, true);
});

test('7.0b — response mapping round-trips a repeatable group as a forEach records rule', async () => {
  const { compiled, registry } = compileC01();
  const { response } = generateMappings(compiled, registry);
  const { map, unmap } = await import('../xml-mapping/mapper.mjs');

  // The convictions answers become a `forEach` records rule over the array.
  const convRule = response.rules.find(r => r.records === 'cac:TenderingCriterionResponse' && r.forEach);
  assert.ok(convRule, 'expected a forEach records rule for the repeatable group');
  assert.ok(convRule.forEach.endsWith('.response.convictions'), convRule.forEach);
  // Its entry `from` paths are RELATIVE to the array item.
  const dateEntry = convRule.entries.find(e => e.key.endsWith('/QSG1/Q1/R1'));
  assert.equal(dateEntry.value.from, 'dateOfConviction', 'item-relative path');

  const data = { partIII: { exclusionGrounds: { [CODE]: { response: {
    answer: true,
    convictions: [
      { dateOfConviction: '2020-01-01', reason: 'r1', whoConvicted: 'w1', selfCleaning: { taken: false } },
      { dateOfConviction: '2021-06-15', reason: 'r2', whoConvicted: 'w2', selfCleaning: { taken: true, description: 'remedied' } },
    ],
  } } } } };

  const back = unmap(response, map(response, data)).partIII.exclusionGrounds[CODE].response;
  assert.equal(back.convictions.length, 2, 'both convictions round-trip');
  assert.deepEqual(back.convictions[0], data.partIII.exclusionGrounds[CODE].response.convictions[0]);
  assert.deepEqual(back.convictions[1], data.partIII.exclusionGrounds[CODE].response.convictions[1]);
});

test('a single-level REQUIREMENT value inside a repeatable group round-trips (request)', async () => {
  // C36's amountRequirements[] is a repeatable REQUIREMENT group; its buyer
  // values round-trip through a `forEach` structure node (task 7.0c).
  const edm = loadEdm(edmPath);
  const { compiled, registry } = compile(edm, 'slc-stand-other', loadSidecar('slc-stand-other'));
  const { generateRequestMapping } = await import('./generate-request-mapping.mjs');
  const { map, unmap } = await import('../xml-mapping/mapper.mjs');

  const request = generateRequestMapping(compiled, registry);
  const data = { partIV: { selectionCriteria: { 'slc-stand-other': { requirement: {
    lotIdentifiers: ['LOT-1'],
    requirementType: 'CHECK_BOX_TRUE',
    amountRequirements: [
      { description: 'd1', minimumAmount: { value: 1000, currency: 'EUR' } },
      { description: 'd2', minimumAmount: { value: 2000, currency: 'EUR' } },
    ],
  } } } } };
  const back = unmap(request, map(request, data)).partIV.selectionCriteria['slc-stand-other'].requirement;
  assert.equal(back.amountRequirements.length, 2);
  assert.equal(back.amountRequirements[0].description, 'd1');
  assert.equal(back.amountRequirements[1].minimumAmount.value, 2000);
});

test('structural equivalence still holds with a group binding present', () => {
  // compile() runs the gate; a separate explicit check documents intent.
  const edm = loadEdm(edmPath);
  const core = readStructuralCore(edm, CODE);
  const compiled = overlayEnrichment(core, loadSidecar(CODE));
  assert.ok(compiled.arrayContainers.length, 'binding attached');
  // Re-compiling through compile() asserts equivalence internally.
  assert.doesNotThrow(() => compile(edm, CODE, loadSidecar(CODE)));
});

// A criterion with no repeatable groups must be unaffected.
test('non-repeatable criteria carry no arrayContainers', () => {
  const edm = loadEdm(edmPath);
  const { compiled } = compile(edm, 'exg-mis-misrepresent', loadSidecar('exg-mis-misrepresent'));
  assert.ok(!compiled.arrayContainers || compiled.arrayContainers.length === 0);
});

function loadHintsSafe() {
  const p = path.join(here, '..', 'model-sources', 'criteria', `${CODE}.hints.json`);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null;
}

// --------------------------------------------------------------------------
// Schematron (guarded by Saxon): the repeated response records validate.
// --------------------------------------------------------------------------

test('7.0b — C01 repeatable-group response runs through the ESPD Schematron', async (t) => {
  const { checkSaxonAvailable, validateXml, expandCodelistAttributes } =
    await import('./schematron-validate.mjs');
  if (!checkSaxonAvailable()) { t.skip('Saxon/Java not available'); return; }

  const { compiled, registry } = compileC01();
  const { response } = generateMappings(compiled, registry);
  const { map } = await import('../xml-mapping/mapper.mjs');
  const { loadValidatedCodelistProfile } = await import('./codelist-attributes.mjs');
  const { profile } = loadValidatedCodelistProfile();

  const data = { partIII: { exclusionGrounds: { [CODE]: { response: {
    answer: true,
    convictions: [
      { dateOfConviction: '2020-01-01', reason: 'r1', whoConvicted: 'w1', selfCleaning: { taken: false } },
      { dateOfConviction: '2021-06-15', reason: 'r2', whoConvicted: 'w2', selfCleaning: { taken: true, description: 'remedied' } },
    ],
  } } } } };
  const expanded = expandCodelistAttributes(map(response, data), profile);

  // Two convictions -> two repeated response records for each conviction leaf.
  const dateRecords = (expanded.match(/QG1\/QSG1\/Q1\/R1/g) || []).length;
  assert.equal(dateRecords, 2, 'one date-of-conviction response per conviction');

  const { errors, warnings, findings } = validateXml(expanded, 'response');
  console.log(`    C01 repeatable response (fragment): ${findings.length} findings (${errors.length} fatal, ${warnings.length} warn)`);
});
