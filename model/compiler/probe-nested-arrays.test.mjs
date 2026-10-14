// Nested repeatable groups — C34 (slc-stand-ratio) and C36 (slc-stand-other).
//
// These two criteria force the patterns the whole-model scan flagged as real
// (not merely per-lot RG1 scoping):
//   - NESTED repeatable groups: C34 periods[].ratios[]
//   - REQUIREMENT values inside repeatable arrays: C34 ratios[].ratioType,
//     C36 amountRequirements[].description
//   - EVIDENCE_IDENTIFIER inside a repeatable group: C34 evidenceBlocks[].evidence,
//     C36 amountRequirements[].evidence
//
// Supported with data only (sidecar + registry entries): instance-data schema +
// validating example, and form lens, for arbitrarily nested arrays.
//
// XML mapping (task 7.0c) now covers: nested repeatable REQUIREMENT groups in
// the request mapping (C34 periods[].ratios[]); EVIDENCE inside a repeatable
// group in the response mapping (C34 + C36); and a nested repeatable RESPONSE
// group in the response mapping (C37/C38/C39 references[].recipients[], emitted
// as item-relative `childRecords` and split back by document order on import).

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEdm, loadSidecar, compile, generateMappings } from './compile.mjs';
import { generateInstanceSchema, generateExample } from './generate-instance-schema.mjs';
import { generateFormStructure } from './generate-form-structure.mjs';
import { generateRequestMapping } from './generate-request-mapping.mjs';
import { arrayContainerDepths } from './encoding-profile.mjs';
import { map, unmap } from '../mapping-engine/mapper.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const edmPath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');

function compileC(code) {
  return compile(loadEdm(edmPath), code, loadSidecar(code));
}
async function ajv() {
  const { default: Ajv } = await import('ajv');
  return new Ajv({ allErrors: true, strict: false });
}
function fieldPaths(form) {
  return form.criteria[0].groups.flatMap(g => g.fields).map(f => f.dataPath);
}

// --- C34: nested requirement arrays periods[].ratios[] --------------------

test('C34 compiles with nested requirement array containers', () => {
  const { compiled } = compileC('slc-stand-ratio');
  const paths = compiled.arrayContainers.map(c => `${c.side}.${c.path.join('.')}`);
  assert.ok(paths.includes('requirement.periods'), 'periods container');
  assert.ok(paths.includes('requirement.periods.ratios'), 'nested ratios container');
});

test('C34 schema nests array-of-objects two deep and the example validates', async () => {
  const { compiled, registry } = compileC('slc-stand-ratio');
  const schema = generateInstanceSchema(compiled, registry, { partId: 'IV' });
  const periods = schema.properties.partIV.properties.selectionCriteria
    .properties['slc-stand-ratio'].properties.requirement.properties.periods;
  assert.equal(periods.type, 'array');
  assert.equal(periods.items.properties.ratios.type, 'array');
  assert.deepEqual(
    Object.keys(periods.items.properties.ratios.items.properties).sort(),
    ['definition', 'minimumRatio', 'ratioType']);

  const validate = (await ajv()).compile(schema);
  assert.ok(validate(generateExample(compiled, registry)), `C34 example invalid: ${JSON.stringify(validate.errors)}`);
});

test('C34 form emits doubly-nested [] dataPaths', () => {
  const { compiled, registry } = compileC('slc-stand-ratio');
  const paths = fieldPaths(generateFormStructure(compiled, registry, { partId: 'IV', presentation: null }));
  assert.ok(paths.some(p => p.endsWith('requirement.periods[].ratios[].ratioType')), paths.join('\n'));
});

test('C34 arrayContainerDepths reports both nesting levels for a deep leaf', () => {
  const { compiled } = compileC('slc-stand-ratio');
  const ratioType = [];
  (function w(n){for(const c of n.children??[]){if(c.id==='slc-stand-ratio.ratio-type')ratioType.push(c);w(c);}})(compiled);
  assert.deepEqual(arrayContainerDepths(compiled, ratioType[0]), [1, 2]);
});

test('C34 request mapping round-trips NESTED repeatable requirement groups (7.0c)', () => {
  const { compiled, registry } = compileC('slc-stand-ratio');
  const request = generateRequestMapping(compiled, registry);
  const data = { partIV: { selectionCriteria: { 'slc-stand-ratio': { requirement: {
    lotIdentifiers: ['LOT-1'],
    periods: [
      { ratios: [{ ratioType: 'RT-A', definition: 'defA', minimumRatio: 0.5 }, { ratioType: 'RT-B', definition: 'defB', minimumRatio: 0.3 }] },
      { ratios: [{ ratioType: 'RT-C', definition: 'defC', minimumRatio: 0.7 }] },
    ],
  } } } } };
  const back = unmap(request, map(request, data)).partIV.selectionCriteria['slc-stand-ratio'].requirement;
  assert.equal(back.periods.length, 2);
  assert.equal(back.periods[0].ratios.length, 2);
  assert.equal(back.periods[1].ratios.length, 1);
  assert.equal(back.periods[0].ratios[0].ratioType, 'RT-A');
  assert.equal(back.periods[1].ratios[0].minimumRatio, 0.7);
});

test('C34 response mapping round-trips evidence inside a repeatable group (7.0c)', () => {
  const { compiled, registry } = compileC('slc-stand-ratio');
  const { response } = generateMappings(compiled, registry);
  const data = { partIV: { selectionCriteria: { 'slc-stand-ratio': { response: {
    evidenceBlocks: [
      { availableElectronically: true, evidence: [{ id: 'EV-1', url: 'http://a' }] },
    ],
  } } } } };
  const back = unmap(response, map(response, data)).partIV.selectionCriteria['slc-stand-ratio'].response;
  assert.equal(back.evidenceBlocks.length, 1);
  assert.equal(back.evidenceBlocks[0].evidence[0].id, 'EV-1');
  assert.equal(back.evidenceBlocks[0].evidence[0].url, 'http://a');
});

// --- C36: single-level requirement array + evidence-in-array --------------

test('C36 compiles; amountRequirements container spans BOTH sides', () => {
  const { compiled } = compileC('slc-stand-other');
  const paths = compiled.arrayContainers.map(c => `${c.side}.${c.path.join('.')}`);
  assert.ok(paths.includes('requirement.amountRequirements'), 'buyer side');
  assert.ok(paths.includes('response.amountRequirements'), 'EO side');
});

test('C36 schema + example validate with the repeatable amount block on both sides', async () => {
  const { compiled, registry } = compileC('slc-stand-other');
  const schema = generateInstanceSchema(compiled, registry, { partId: 'IV' });
  const crit = schema.properties.partIV.properties.selectionCriteria.properties['slc-stand-other'];
  assert.equal(crit.properties.requirement.properties.amountRequirements.type, 'array');
  assert.equal(crit.properties.response.properties.amountRequirements.type, 'array');

  const validate = (await ajv()).compile(schema);
  assert.ok(validate(generateExample(compiled, registry)), `C36 example invalid: ${JSON.stringify(validate.errors)}`);
});

test('C36 shape (A): three independent branches gated by the type selector', () => {
  const { compiled, registry } = compileC('slc-stand-other');
  const form = generateFormStructure(compiled, registry, { partId: 'IV', presentation: null });
  const fields = new Map();
  for (const g of form.criteria[0].groups) for (const f of g.fields) fields.set(f.semanticId, f);

  const P = 'partIV.selectionCriteria.slc-stand-other.requirement.requirementType';
  // Each branch's fields are gated by requirementType = its branch value.
  assert.deepEqual(fields.get('slc-stand-other.amount-description').visibleWhen,
    { path: P, equals: '[Economic or Financial]' });
  assert.deepEqual(fields.get('slc-stand-other.rating-description').visibleWhen,
    { path: P, equals: '[Rating]' });
  assert.deepEqual(fields.get('slc-stand-other.descriptive-requirement').visibleWhen,
    { path: P, equals: '[Descriptive]' });
  // The selector itself is ungated.
  assert.equal(fields.get('slc-stand-other.requirement-type').visibleWhen, undefined);
});

test('C36 branch-selector gate wins over an inner boolean gate', () => {
  const { compiled, registry } = compileC('slc-stand-other');
  const form = generateFormStructure(compiled, registry, { partId: 'IV', presentation: null });
  const fields = new Map();
  for (const g of form.criteria[0].groups) for (const f of g.fields) fields.set(f.dataPath, f);

  // The amount answer sits in the amount branch; its visibleWhen is the branch
  // selector (outermost), not any inner condition.
  const amountAnswer = [...fields.values()].find(f => f.semanticId === 'slc-stand-other.amount-answer');
  assert.ok(amountAnswer.visibleWhen.path.endsWith('.requirementType'));
  assert.equal(amountAnswer.visibleWhen.equals, '[Economic or Financial]');
});

test('C36 branchSelectors is stripped by the structural-equivalence projection', async () => {
  const { compiled } = compileC('slc-stand-other');
  assert.ok(compiled.branchSelectors, 'carried on the compiled criterion');
  const { projectCompiled } = await import('./structural-equivalence.mjs');
  assert.equal(projectCompiled(compiled).branchSelectors, undefined, 'not in the EA projection');
});

test('C36 request mapping round-trips the single-level repeatable requirement group', () => {
  const { compiled, registry } = compileC('slc-stand-other');
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
  assert.deepEqual(back.amountRequirements.map(a => a.description), ['d1', 'd2']);
});

test('C36 response mapping round-trips evidence inside a repeatable group (7.0c)', () => {
  const { compiled, registry } = compileC('slc-stand-other');
  const { response } = generateMappings(compiled, registry);
  const data = { partIV: { selectionCriteria: { 'slc-stand-other': { response: {
    amountRequirements: [
      { amount: { value: 50000, currency: 'EUR' }, evidenceAvailableElectronically: true, evidence: [{ id: 'EV-1', url: 'http://a', description: 'd1' }] },
      { amount: { value: 60000, currency: 'EUR' }, evidenceAvailableElectronically: true, evidence: [{ id: 'EV-2', url: 'http://b', description: 'd2' }] },
    ],
  } } } } };
  const back = unmap(response, map(response, data)).partIV.selectionCriteria['slc-stand-other'].response;
  assert.equal(back.amountRequirements.length, 2);
  assert.equal(back.amountRequirements[0].evidence[0].id, 'EV-1');
  assert.equal(back.amountRequirements[1].evidence[0].url, 'http://b');
});

test('C34 and C36 added NO criterion-specific code to the generators', () => {
  for (const file of [
    'overlay-enrichment.mjs', 'encoding-profile.mjs', 'generate-instance-schema.mjs',
    'generate-form-structure.mjs', 'generate-request-mapping.mjs', 'generate-response-mapping.mjs',
  ]) {
    const code = fs.readFileSync(path.join(here, file), 'utf8')
      .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
    assert.ok(!code.includes('slc-stand-ratio'), `${file} must not name C34`);
    assert.ok(!code.includes('slc-stand-other'), `${file} must not name C36`);
  }
});

// --------------------------------------------------------------------------
// Schematron (guarded by Saxon) — the nested-evidence response validates.
// --------------------------------------------------------------------------

test('7.0c — C36 nested-evidence response runs through the ESPD Schematron', async (t) => {
  const { checkSaxonAvailable, validateXml, expandCodelistAttributes } =
    await import('./schematron-validate.mjs');
  if (!checkSaxonAvailable()) { t.skip('Saxon/Java not available'); return; }

  const { compiled, registry } = compileC('slc-stand-other');
  const { response } = generateMappings(compiled, registry);
  const { loadValidatedCodelistProfile } = await import('./codelist-attributes.mjs');
  const { profile } = loadValidatedCodelistProfile();

  const data = { partIV: { selectionCriteria: { 'slc-stand-other': { response: {
    amountRequirements: [
      { amount: { value: 50000, currency: 'EUR' }, evidenceAvailableElectronically: true, evidence: [{ id: 'EV-1', url: 'http://a' }] },
      { amount: { value: 60000, currency: 'EUR' }, evidenceAvailableElectronically: true, evidence: [{ id: 'EV-2', url: 'http://b' }] },
    ],
  } } } } };
  const expanded = expandCodelistAttributes(map(response, data), profile);

  // Two amount blocks -> two cac:Evidence records at document level.
  assert.equal((expanded.match(/<cac:Evidence>/g) || []).length, 2);

  const { errors, warnings, findings } = validateXml(expanded, 'response');
  console.log(`    C36 nested-evidence response (fragment): ${findings.length} findings (${errors.length} fatal, ${warnings.length} warn)`);
});

// --- C37: nested repeatable RESPONSE group references[].recipients[] (7.0c) ---

test('C37 response mapping nests recipients[] under references[] via childRecords', () => {
  const { compiled, registry } = compileC('slc-abil-ref-work');
  const { response } = generateMappings(compiled, registry);
  const refRule = response.rules.find(r =>
    r.forEach && r.forEach.endsWith('.response.references'));
  assert.ok(refRule, 'a forEach records rule for references[] exists');
  assert.ok(Array.isArray(refRule.childRecords), 'references rule carries childRecords');
  const recRule = refRule.childRecords.find(c => c.forEach === 'recipients');
  assert.ok(recRule, 'recipients child rule has an item-relative forEach');
  // The recipients child must NOT also appear as a top-level sibling rule.
  const topRecipients = response.rules.find(r => r.forEach && r.forEach.endsWith('.response.references.recipients'));
  assert.equal(topRecipients, undefined, 'recipients is not emitted as a top-level rule');
});

test('C37 references[].recipients[] round-trips through map/unmap', () => {
  const { compiled, registry } = compileC('slc-abil-ref-work');
  const { response } = generateMappings(compiled, registry);
  const data = { partIV: { selectionCriteria: { 'slc-abil-ref-work': { response: {
    fulfilledByItself: true,
    references: [
      { description: 'Ref A', activity: 'Build', recipients: [{ name: 'R1', contactEmail: 'r1@x' }, { name: 'R2' }] },
      { description: 'Ref B', recipients: [{ name: 'R3' }] },
      { description: 'Ref C' },
    ],
  } } } } };
  const back = unmap(response, map(response, data));
  const r = back.partIV.selectionCriteria['slc-abil-ref-work'].response.references;
  assert.equal(r.length, 3);
  assert.deepEqual(r[0].recipients, [{ name: 'R1', contactEmail: 'r1@x' }, { name: 'R2' }]);
  assert.deepEqual(r[1].recipients, [{ name: 'R3' }]);
  assert.equal(r[2].recipients, undefined, 'a reference with no recipients stays recipient-less');
  assert.deepEqual(back, data, 'full nested round-trip');
});

test('C38 and C39 (same shape) also round-trip references[].recipients[]', () => {
  for (const code of ['slc-abil-ref-supply', 'slc-abil-ref-services']) {
    const { compiled, registry } = compileC(code);
    const { response } = generateMappings(compiled, registry);
    const data = { partIV: { selectionCriteria: { [code]: { response: {
      fulfilledByItself: false,
      references: [
        { description: 'D1', recipients: [{ name: 'A' }, { name: 'B' }] },
        { description: 'D2', recipients: [{ name: 'C' }] },
      ],
    } } } } };
    const back = unmap(response, map(response, data));
    assert.deepEqual(back, data, `${code} nested round-trip`);
  }
});
