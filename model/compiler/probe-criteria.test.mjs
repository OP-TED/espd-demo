// Section 6 (extended) — probe 4 more criteria: 2 exclusion grounds + 2
// selection criteria, each added with ONLY data files (sidecar; registry/profile
// entries for newly encountered value types). No criterion-specific compiler
// code. This is the breadth complement to the C07 probe (probe-c07.test.mjs).
//
// Chosen for coverage:
//   exclusion:
//     exg-crim-part          C01 — Part III archetype (DATE + PERIOD, self-
//                            cleaning ONTRUE); matches the hand-authored
//                            part-III.form.json, used here as a reference.
//     exg-mis-misrepresent   minimal ground (INDICATOR + evidence only).
//   selection:
//     slc-stand-to-gen       C29 — widest coverage; introduces CODE_BOOLEAN.
//     slc-abil-staff-yrly-avg-mp
//                            C50 — quantity-with-unit family: MINIMUM_QUANTITY_YEAR
//                            (request) + QUANTITY_YEAR/QUANTITY_INTEGER answers
//                            serialized as cbc:ResponseQuantity with unitCode.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEdm, loadSidecar, compile, generateMappings, generateForm } from './compile.mjs';
import { generateInstanceSchema, generateExample } from './generate-instance-schema.mjs';
import { leavesOf } from './read-structural-core.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const edmPath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');

const CRITERIA = [
  { code: 'exg-crim-part', part: 'III', container: 'exclusionGrounds' },
  { code: 'exg-mis-misrepresent', part: 'III', container: 'exclusionGrounds' },
  { code: 'slc-stand-to-gen', part: 'IV', container: 'selectionCriteria' },
  { code: 'slc-abil-staff-yrly-avg-mp', part: 'IV', container: 'selectionCriteria' },
];

function compileCriterion(code) {
  const edm = loadEdm(edmPath);
  return compile(edm, code, loadSidecar(code));
}

async function ajvInstance() {
  const { default: Ajv } = await import('ajv');
  return new Ajv({ allErrors: true, strict: false });
}

for (const { code, part, container } of CRITERIA) {
  test(`${code}: compiles and passes the structural-equivalence gate`, () => {
    const { compiled } = compileCriterion(code);
    assert.equal(compiled.code, code);
    assert.ok(leavesOf(compiled).length > 0);
  });

  test(`${code}: all value types resolve from the registry`, () => {
    const { compiled, registry } = compileCriterion(code);
    for (const leaf of leavesOf(compiled)) {
      assert.ok(registry.valueTypes[leaf.valueType], `${leaf.valueType} must be registered (${leaf.requestpath})`);
    }
  });

  test(`${code}: request+response mappings generate`, () => {
    const { compiled, registry } = compileCriterion(code);
    const { request, response } = generateMappings(compiled, registry);
    assert.equal(request.target.root, 'QualificationApplicationRequest');
    assert.equal(response.target.root, 'QualificationApplicationResponse');
  });

  test(`${code}: generated example validates against the generated schema`, async () => {
    const { compiled, registry } = compileCriterion(code);
    const schema = generateInstanceSchema(compiled, registry, { partId: part });
    const example = generateExample(compiled, registry);
    const ajv = await ajvInstance();
    const validate = ajv.compile(schema);
    assert.ok(validate(example), `${code} example invalid: ${JSON.stringify(validate.errors)}`);
  });

  test(`${code}: form lens has a complete contract and no duplicate group ids`, () => {
    const { compiled, registry } = compileCriterion(code);
    const form = generateForm(compiled, registry, { partId: part, presentation: null });
    const crit = form.criteria[0];
    assert.equal(crit.dataPath, `part${part}.${container}.${code}`);

    const ids = crit.groups.map(g => g.id);
    assert.equal(new Set(ids).size, ids.length, `duplicate group id in [${ids.join(', ')}]`);

    for (const g of crit.groups) {
      for (const f of g.fields) {
        assert.ok(f.uiType, `${f.dataPath} has no uiType`);
        assert.ok(f.labelKey, `${f.dataPath} has no labelKey`);
        assert.ok(f.filledBy, `${f.dataPath} has no filledBy`);
        if (f.uiType === 'code') assert.ok(f.codelist, `${f.dataPath} code control without codelist`);
      }
    }
  });
}

// --- Criterion-specific coverage assertions -------------------------------

test('exg-crim-part reproduces the hand-authored Part III form (modulo the repeatable-group gap)', () => {
  const { compiled, registry } = compileCriterion('exg-crim-part');
  const generated = new Map();
  for (const g of generateForm(compiled, registry, { partId: 'III', presentation: null }).criteria[0].groups) {
    for (const f of g.fields) generated.set(f.dataPath, f);
  }

  const hand = JSON.parse(fs.readFileSync(
    path.join(here, '..', 'form-structure', 'part-III.form.json'), 'utf8'));
  const reference = hand.criteria[0].groups.flatMap(g => g.fields);

  // 7.0: the conviction subgroup is 0..n, modeled as 'convictions[]'. With the
  // repeatable-group binding the generator now reproduces these array fields, so
  // nothing is skipped.
  let comparedArray = 0;
  for (const ref of reference) {
    const gen = generated.get(ref.dataPath);
    assert.ok(gen, `hand-authored field ${ref.dataPath} was not generated`);
    if (ref.visibleWhen) assert.deepEqual(gen.visibleWhen, ref.visibleWhen, `${ref.dataPath} visibleWhen`);
    if (ref.codelist) assert.equal(gen.codelist, ref.codelist, `${ref.dataPath} codelist`);
    if (ref.dataPath.includes('.convictions[]')) comparedArray++;
  }
  assert.ok(comparedArray >= 5, 'the repeatable convictions[] fields must now be reproduced');
});

test('exg-mis-misrepresent is the minimal ground: one answer + evidence, no new value types', () => {
  const { compiled, registry } = compileCriterion('exg-mis-misrepresent');
  const vts = new Set(leavesOf(compiled).map(l => l.valueType));
  assert.deepEqual([...vts].sort(), ['EVIDENCE_IDENTIFIER', 'INDICATOR']);
  // Sidecar is tiny: 3 leaf bindings.
  const sidecar = loadSidecar('exg-mis-misrepresent');
  assert.equal(Object.keys(sidecar.components).length, 3);
});

test('slc-stand-to-gen introduces CODE_BOOLEAN as a buyer requirement', () => {
  const { compiled, registry } = compileCriterion('slc-stand-to-gen');
  const codeBool = leavesOf(compiled).find(l => l.valueType === 'CODE_BOOLEAN');
  assert.ok(codeBool, 'expected a CODE_BOOLEAN leaf');
  assert.equal(codeBool.nodeKind, 'requirement');

  const vt = registry.valueTypes.CODE_BOOLEAN;
  assert.equal(vt.requestXml.element, 'cbc:ExpectedCode');
  assert.equal(vt.requestXml.codelist, 'boolean-gui-control-type');

  // General turnover has NO businessDomain (unlike specific C31/C32).
  assert.ok(!leavesOf(compiled).some(l => l.id.endsWith('.business-domain')));
});

test('slc-abil-staff-yrly-avg-mp maps the quantity-with-unit answers', () => {
  const { compiled, registry } = compileCriterion('slc-abil-staff-yrly-avg-mp');
  const { response } = generateMappings(compiled, registry);
  const entries = response.rules.find(r => r.records === 'cac:TenderingCriterionResponse').entries;

  const byTo = to => entries.filter(e => e.value?.to === to);
  const quantityEntries = byTo('cac:ResponseValue/cbc:ResponseQuantity');
  assert.equal(quantityEntries.length, 2, 'YEAR + INTEGER answers both map to ResponseQuantity');

  const units = quantityEntries.map(e => e.value.attributes.unitCode).sort();
  assert.deepEqual(units, ['INTEGER', 'YEAR'], 'each carries its fixed unitCode');

  // MINIMUM_QUANTITY_YEAR is a buyer-only requirement (no response binding).
  assert.equal(registry.valueTypes.MINIMUM_QUANTITY_YEAR.responseXml, undefined);
});

// --------------------------------------------------------------------------
// Schematron (guarded by Saxon) for the criteria carrying new value types.
// --------------------------------------------------------------------------

import { map } from '../xml-mapping/mapper.mjs';
import { loadValidatedCodelistProfile } from './codelist-attributes.mjs';
import {
  checkSaxonAvailable, validateXml, expandCodelistAttributes, wrapRequestDocument,
} from './schematron-validate.mjs';

// Residuals that are documented in-isolation artifacts, not generator defects
// (same set accepted by the C07 probe): e-Certis UUID lookups, the cross-
// criterion Part III/IV composition rules, and BR-TC-16/17 group-count rules
// that compare against absent e-Certis reference data.
function unexpectedErrors(errors) {
  const attr = errors.filter(e =>
    e.validator.includes('cl-attributes') || /attribute .* is mandatory/.test(e.text));
  const residual = errors.filter(e => !attr.includes(e));
  return {
    attr,
    unexpected: residual.filter(e =>
      !/e-Certis/i.test(e.text) &&
      !/Part III|Part IV/.test(e.text) &&
      !/missing 'cac:(Subsidiary)?TenderingCriterion(Property)?(Group)?' element/.test(e.text)),
  };
}

test('slc-stand-to-gen request: CODE_BOOLEAN expands to the boolean-gui-control-type list; attribute rules pass', (t) => {
  if (!checkSaxonAvailable()) { t.skip('Saxon/Java not available'); return; }

  const { compiled, registry } = compileCriterion('slc-stand-to-gen');
  const { request } = generateMappings(compiled, registry);
  const { profile } = loadValidatedCodelistProfile();

  const requirement = {
    lotIdentifiers: ['LOT-0001'], numberOfYears: 3, thresholdPerYear: 'CHECK_BOX_TRUE',
    minimumAmount: { value: 1000000, currency: 'EUR' },
  };
  const xml = map(request, { partIV: { selectionCriteria: { 'slc-stand-to-gen': { requirement } } } });

  // CODE_BOOLEAN requirement expanded to the right (dated) list attributes.
  const expanded = expandCodelistAttributes(xml, profile);
  assert.match(expanded, /cbc:ExpectedCode[^>]*listID="boolean-gui-control-type"[^>]*listVersionID="5\.0\.0"/);

  const { attr, unexpected } = unexpectedErrors(validateXml(wrapRequestDocument(xml, profile), 'request').errors);
  assert.equal(attr.length, 0, `attribute rules must pass:\n${attr.map(e => '  ' + e.text.slice(0, 90)).join('\n')}`);
  assert.equal(unexpected.length, 0,
    `unexpected fatal findings:\n${unexpected.map(e => '  ' + e.text.replace(/\s+/g, ' ').slice(0, 110)).join('\n')}`);
});

test('slc-abil-staff-yrly-avg-mp response: quantity answers carry unitCode YEAR/INTEGER', (t) => {
  if (!checkSaxonAvailable()) { t.skip('Saxon/Java not available'); return; }

  const { compiled, registry } = compileCriterion('slc-abil-staff-yrly-avg-mp');
  const { response } = generateMappings(compiled, registry);
  const { profile } = loadValidatedCodelistProfile();

  const responseData = { answer: true, manpower: { year: 2000, number: 42 } };
  const xml = map(response, { partIV: { selectionCriteria: { 'slc-abil-staff-yrly-avg-mp': { response: responseData } } } });
  const expanded = expandCodelistAttributes(xml, profile);

  assert.match(expanded, /cbc:ResponseQuantity unitCode="YEAR">2000<\/cbc:ResponseQuantity>/);
  assert.match(expanded, /cbc:ResponseQuantity unitCode="INTEGER">42<\/cbc:ResponseQuantity>/);

  const { errors, warnings, findings } = validateXml(expanded, 'response');
  console.log(`    C50 response (fragment): ${findings.length} findings (${errors.length} fatal, ${warnings.length} warn)`);
});
