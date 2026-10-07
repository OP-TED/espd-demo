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
// validating example, and form lens, for arbitrarily nested arrays; and the XML
// REQUEST mapping for a single-level repeatable requirement group (C36).
//
// Deferred, failing fast with precise messages (tasks 7.0c): nested repeatable
// REQUIREMENT groups in request mapping (C34), and EVIDENCE inside a repeatable
// group in response mapping (C34 + C36).

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
import { map, unmap } from '../xml-mapping/mapper.mjs';

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

test('C34 request mapping fails fast on nested repeatable REQUIREMENT groups (7.0c)', () => {
  const { compiled, registry } = compileC('slc-stand-ratio');
  assert.throws(() => generateRequestMapping(compiled, registry), /nested repeatable REQUIREMENT groups/i);
});

test('C34 response mapping fails fast on evidence inside a repeatable group (7.0c)', async () => {
  const { compiled, registry } = compileC('slc-stand-ratio');
  // Call the response generator directly: generateMappings would hit the request
  // nested-group guard first (C34 has both deferred patterns).
  const { generateResponseMapping } = await import('./generate-response-mapping.mjs');
  assert.throws(() => generateResponseMapping(compiled, registry), /EVIDENCE_IDENTIFIER .* repeatable group/i);
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

test('C36 response mapping fails fast on evidence inside a repeatable group (7.0c)', () => {
  const { compiled, registry } = compileC('slc-stand-other');
  assert.throws(() => generateMappings(compiled, registry), /EVIDENCE_IDENTIFIER .* repeatable group/i);
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
