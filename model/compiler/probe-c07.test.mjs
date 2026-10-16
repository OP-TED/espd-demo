// Task 6.2 — C07 generalization probe.
//
// Proves the central R11.4 claim: a second criterion compiles end-to-end
// (structural equivalence, mapping generation, instance-data, form-structure)
// with ONLY data files added — a sidecar and, for a newly encountered value
// type, a registry entry — and NO criterion-specific compiler code.
//
// C07 (exg-pmt-bre-tax) was chosen because it exercises what C31 does not:
//   - a code-valued answer (CODE_COUNTRY) with its own dated country code list;
//   - REQUIREMENT leaves directly under the top-level group (C31 has none);
//   - a Part III exclusion ground that nonetheless carries buyer REQUIREMENTs,
//     proving the request/response split is per-leaf by kind, not per-part;
//   - ONTRUE/ONFALSE subgroups nested 6 levels deep.
//
// The only non-test additions this probe required: the C07 sidecar and the
// CODE_COUNTRY registry entry. If this file ever needs a change to a generator
// to pass, the generalization claim has regressed.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEdm, loadSidecar, compile, generateMappings, generateForm } from './compile.mjs';
import { generateInstanceSchema, generateExample } from './generate-instance-schema.mjs';
import { leavesOf } from './read-structural-core.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const CODE = 'exg-pmt-bre-tax';
const edmPath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const P = `partIII.exclusionGrounds.${CODE}`;

function compileC07() {
  const edm = loadEdm(edmPath);
  const { compiled, registry } = compile(edm, CODE, loadSidecar(CODE));
  return { compiled, registry };
}

test('C07 compiles and passes the structural-equivalence gate', () => {
  // compile() runs assertStructuralEquivalence internally; reaching here is pass.
  const { compiled } = compileC07();
  assert.equal(compiled.code, CODE);
  assert.equal(compiled.uuid, 'b61bbeb7-690e-4a40-bc68-d6d4ecfaa3d4');
});

test('C07 introduces CODE_COUNTRY, resolved from the value-type registry', () => {
  const { compiled, registry } = compileC07();
  const country = leavesOf(compiled).find(l => l.valueType === 'CODE_COUNTRY');
  assert.ok(country, 'expected a CODE_COUNTRY leaf');

  const vt = registry.valueTypes.CODE_COUNTRY;
  assert.ok(vt, 'CODE_COUNTRY must be registered');
  // Response-side code element bound to the (dated) country code list — a
  // DIFFERENT list and version from response-data-type.
  assert.equal(vt.responseXml.element, 'cac:ResponseValue/cbc:ResponseCode');
  assert.equal(vt.responseXml.codelist, 'country');
  assert.equal(vt.instanceShape.codeList, 'country');
});

test('C07 has REQUIREMENT leaves directly under the top-level group (a pattern C31 lacks)', () => {
  const { compiled } = compileC07();
  const rg1 = compiled.children.find(c => c.requestpath?.endsWith('/RG1'));
  const directRequirements = (rg1.children ?? []).filter(c => c.nodeKind === 'requirement');
  assert.equal(directRequirements.length, 2, 'RG1 should hold minimumAmount + additionalInformation');
  assert.deepEqual(directRequirements.map(r => r.valueType), ['MINIMUM_AMOUNT', 'DESCRIPTION']);
});

test('C07 request+response mapping specs generate without criterion-specific code', () => {
  const { compiled, registry } = compileC07();
  const { request, response } = generateMappings(compiled, registry);

  // Request carries the buyer REQUIREMENTs; response carries the EO answers.
  assert.equal(request.target.root, 'QualificationApplicationRequest');
  assert.equal(response.target.root, 'QualificationApplicationResponse');

  // The CODE_COUNTRY answer appears as a response entry with the country-codelist
  // shorthand on its value element.
  const responseRule = response.rules.find(r => r.records === 'cac:TenderingCriterionResponse');
  // Entries are keyed by the answered property id (ValidatedCriterionPropertyID,
  // …/Q1 — the requestpath), per BR-TCR-01-02.
  const countryEntry = responseRule.entries.find(
    e => e.key === `${CODE === 'exg-pmt-bre-tax' ? 'C07_exg-pmt-bre-tax' : CODE}/RG1/QSG1/QSG1/Q1`);
  assert.ok(countryEntry, 'expected a response entry for the country question');
  assert.equal(countryEntry.value.to, 'cac:ResponseValue/cbc:ResponseCode');
  assert.deepEqual(countryEntry.value.attributes, { listID: 'country' });
});

test('C07 instance-data schema generates and its example validates', async () => {
  const { compiled, registry } = compileC07();
  const schema = generateInstanceSchema(compiled, registry, { partId: 'III' });
  const example = generateExample(compiled, registry);

  const { default: Ajv } = await import('ajv');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const ok = validate(example);
  assert.ok(ok, `generated C07 example must validate: ${JSON.stringify(validate.errors)}`);
});

test('C07 schema places the buyer REQUIREMENTs on the requirement side', () => {
  const { compiled, registry } = compileC07();
  const schema = generateInstanceSchema(compiled, registry, { partId: 'III' });
  const crit = schema.properties.partIII.properties.exclusionGrounds.properties[CODE];

  assert.ok(crit.properties.requirement, 'C07 must carry a requirement side');
  assert.ok(crit.properties.requirement.properties.minimumAmount, 'minimumAmount on requirement side');
  assert.ok(crit.properties.requirement.properties.additionalInformation, 'additionalInformation on requirement side');
  assert.ok(crit.properties.response, 'C07 must carry a response side');
});

test('C07 deep ONTRUE/ONFALSE nesting becomes conditional visibility in the form', () => {
  const { compiled, registry } = compileC07();
  const form = generateForm(compiled, registry, { partId: 'III', presentation: null });
  const fields = new Map();
  for (const g of form.criteria[0].groups) for (const f of g.fields) fields.set(f.dataPath, f);

  // The whole breach block is gated by the top-level answer (ONTRUE).
  assert.deepEqual(fields.get(`${P}.response.breach.country`).visibleWhen, {
    path: `${P}.response.answer`, equals: true,
  });

  // A deeper branch gated by its OWN nearest sibling indicator, not the outer
  // answer. The decision date sits in QSG2/QSG1 (ONTRUE) whose nearest gate is
  // the finalAndBinding indicator in QSG2 — proving the gate is the nearest
  // preceding sibling leaf at each depth, however deep.
  const date = fields.get(`${P}.response.breach.decision.date`);
  assert.ok(date.visibleWhen, 'decision date must be conditional');
  assert.ok(date.visibleWhen.path.endsWith('.finalAndBinding'),
    `expected the nearest gate (finalAndBinding), got ${date.visibleWhen.path}`);
  assert.equal(date.visibleWhen.equals, true, 'decision date appears when the decision is final and binding');
});

test('C07 CODE_COUNTRY field carries uiType=code and the country codelist', () => {
  const { compiled, registry } = compileC07();
  const form = generateForm(compiled, registry, { partId: 'III', presentation: null });
  const country = form.criteria[0].groups
    .flatMap(g => g.fields)
    .find(f => f.semanticId === `${CODE}.country`);

  assert.equal(country.uiType, 'code');
  assert.equal(country.codelist, 'country');
  assert.equal(country.filledBy, 'economicOperator');
});

test('C07 form has no duplicate group ids', () => {
  const { compiled, registry } = compileC07();
  const form = generateForm(compiled, registry, { partId: 'III', presentation: null });
  const ids = form.criteria[0].groups.map(g => g.id);
  assert.equal(new Set(ids).size, ids.length, `duplicate group id in [${ids.join(', ')}]`);
});

test('C07 label keys resolve against the shipped Part III i18n catalogue', () => {
  const { compiled, registry } = compileC07();
  const form = generateForm(compiled, registry, { partId: 'III', presentation: null });
  const cataloguePath = path.join(here, '..', '..', 'i18n', 'i18n', 'en', 'espd.part3.json');

  // Only assert if the catalogue carries C07 keys (it may not be modeled in i18n
  // yet); when present, every emitted key must resolve.
  const catalogue = JSON.parse(fs.readFileSync(cataloguePath, 'utf8'));
  const hasC07 = Object.keys(catalogue).some(k => k.includes(CODE));
  if (!hasC07) {
    console.log(`    (Part III i18n catalogue has no ${CODE} keys yet — skipping resolution check)`);
    return;
  }
  for (const g of form.criteria[0].groups) {
    for (const f of g.fields) {
      assert.ok(f.labelKey in catalogue, `labelKey ${f.labelKey} missing from Part III catalogue`);
    }
  }
});

test('R11.4 — no criterion code is hard-coded in generator LOGIC', () => {
  const c31 = ['slc', 'stand', 'to', 'spec', 'avg'].join('-'); // avoid literal in this file
  // Strip comments: a criterion code may legitimately appear in a JSDoc example
  // (e.g. "@param code criterion code, e.g. '<c31>'"), but must not drive logic.
  const stripComments = s => s
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');

  for (const file of [
    'read-structural-core.mjs', 'overlay-enrichment.mjs', 'generate-request-mapping.mjs',
    'generate-response-mapping.mjs', 'generate-instance-schema.mjs', 'generate-form-structure.mjs',
  ]) {
    const code = stripComments(fs.readFileSync(path.join(here, file), 'utf8'));
    assert.ok(!code.includes(CODE), `${file} logic must not name ${CODE}`);
    assert.ok(!code.includes(c31), `${file} logic must not name C31 either`);
  }
});

// --------------------------------------------------------------------------
// Schematron validation (task 6.2) — guarded by Saxon availability.
// --------------------------------------------------------------------------

import { map } from '../mapping-engine/mapper.mjs';
import { loadValidatedCodelistProfile } from './codelist-attributes.mjs';
import {
  checkSaxonAvailable, validateXml, expandCodelistAttributes, wrapRequestDocument,
} from './schematron-validate.mjs';

test('C07 request passes ESPD Schematron attribute rules; CODE_COUNTRY gets the dated country list', (t) => {
  if (!checkSaxonAvailable()) { t.skip('Saxon/Java not available'); return; }

  const { compiled, registry } = compileC07();
  const { request } = generateMappings(compiled, registry);
  const { profile: codelistProfile } = loadValidatedCodelistProfile();

  const requirement = { minimumAmount: { value: 1000, currency: 'EUR' }, additionalInformation: 'x' };
  const requestXml = map(request, { partIII: { exclusionGrounds: { [CODE]: { requirement } } } });
  const doc = wrapRequestDocument(requestXml, codelistProfile);
  const { errors } = validateXml(doc, 'request');

  // No attribute-rule failures on our generated criterion.
  const attrErrors = errors.filter(e =>
    e.validator.includes('cl-attributes') || /attribute .* is mandatory/.test(e.text));
  assert.equal(attrErrors.length, 0,
    `attribute rules must pass:\n${attrErrors.map(e => '  ' + e.text.slice(0, 90)).join('\n')}`);

  // Residual fatals are the SAME documented in-isolation artifacts as C31:
  //   - e-Certis UUID lookups (our IDs are path-like, like the EA export);
  //   - the cross-criterion "Part III A and B both required" composition rule;
  //   - BR-TC-17 group-count rules, which compare against the e-Certis reference
  //     definition that is absent for a spliced single criterion.
  const residual = errors.filter(e => !attrErrors.includes(e));
  const unexpected = residual.filter(e =>
    !/e-Certis/i.test(e.text) &&
    !/Part III/.test(e.text) &&
    // BR-TC-16/17 group/property-count rules compare against the e-Certis
    // reference definition, absent for a spliced single criterion.
    !/missing 'cac:(Subsidiary)?TenderingCriterion(Property)?(Group)?' element/.test(e.text));
  assert.equal(unexpected.length, 0,
    `unexpected fatal findings:\n${unexpected.map(e => '  ' + e.text.replace(/\s+/g, ' ').slice(0, 110)).join('\n')}`);
});

test('C07 response XML runs through the ESPD Schematron (diagnostic)', (t) => {
  if (!checkSaxonAvailable()) { t.skip('Saxon/Java not available'); return; }

  const { compiled, registry } = compileC07();
  const { response } = generateMappings(compiled, registry);
  const { profile: codelistProfile } = loadValidatedCodelistProfile();

  const responseData = {
    answer: true,
    breach: { country: 'BEL', amount: { value: 5000, currency: 'EUR' } },
  };
  const responseXml = map(response, { partIII: { exclusionGrounds: { [CODE]: { response: responseData } } } });
  const expanded = expandCodelistAttributes(responseXml, codelistProfile);

  // The CODE_COUNTRY answer must carry the dated country list, not 5.0.0.
  assert.match(expanded, /cbc:ResponseCode[^>]*listID="http:\/\/publications\.europa\.eu\/resource\/authority\/country"/);
  assert.match(expanded, /cbc:ResponseCode[^>]*listVersionID="20250618-0"/);

  const { errors, warnings, findings } = validateXml(expanded, 'response');
  console.log(`    C07 response (fragment): ${findings.length} findings (${errors.length} fatal, ${warnings.length} warn)`);
});
