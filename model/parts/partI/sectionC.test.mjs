// Part I Section C — procurement procedure and project.
// Validates the schema/example, roundtrips through mapper.mjs, and checks the
// Schematron-mandated attribute sets (BR-SC-10, BR-OTH-01, BR-OTH-02, BR-LOT-41).

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { map, unmap } from '../../mapping-engine/mapper.mjs';
import { resolveSchemeAgency } from '../../mapping-engine/resolve-scheme-agency.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const read = (f) => JSON.parse(fs.readFileSync(path.join(here, f), 'utf8'));
const schemeAgencyProfile = read('../../model-sources/registries/scheme-agency-profile.json');

const schema = read('sectionC.schema.json');
const example = read('sectionC.example.json');
// Resolve the { fromMap: { profile } } @schemeAgencyID references the same way
// the composer's loadSpec does, so map() sees the inlined { map, default }.
const spec = resolveSchemeAgency(read('sectionC.mapping.json'), schemeAgencyProfile);
const form = read('sectionC.form.json');

const compile = async () => {
  const { default: Ajv } = await import('ajv');
  return new Ajv({ allErrors: true, strict: false }).compile(schema);
};

// --- schema -------------------------------------------------------------

test('the example validates against the schema', async () => {
  const validate = await compile();
  assert.ok(validate(example), `example invalid: ${JSON.stringify(validate.errors)}`);
});

test('procedureType is required (BR-SC-10 is fatal); project and lots are not', async () => {
  const validate = await compile();
  assert.ok(validate({ partI: { procedure: { procedureType: 'Open' } } }),
    'procedureType alone must validate');
  assert.ok(!validate({ partI: { procedure: {} } }), 'missing procedureType must fail');
  assert.ok(!validate({ partI: {} }), 'missing procedure must fail');
});

test('a file reference requires only its value (the @schemeAgencyID is a constant at export)', async () => {
  const validate = await compile();
  const withRef = (fileReference) => ({ partI: { procedure: { procedureType: 'Open', fileReference } } });
  assert.ok(validate(withRef({ value: 'PP-1' })), 'a value alone must validate');
  assert.ok(!validate(withRef({})), 'reference without value must fail');
  assert.ok(!validate(withRef({ value: 'PP-1', schemeAgency: 'DGPE' })),
    'a stray schemeAgency property must be rejected (it is no longer part of the model)');
});

test('lots must be a non-empty array of non-empty strings when present', async () => {
  const validate = await compile();
  const withLots = (lots) => ({ partI: { procedure: { procedureType: 'Open' }, lots } });
  assert.ok(validate(withLots(['LOT-0000'])), 'one lot must validate');
  assert.ok(!validate(withLots([])), 'an empty lot array must fail');
  assert.ok(!validate(withLots([''])), 'an empty lot id must fail');
});

// --- roundtrip ----------------------------------------------------------

test('the mapping roundtrips the full example', () => {
  const xml = map(spec, example);
  assert.deepEqual(unmap(spec, xml), example);
});

test('the mapping roundtrips a minimal procedure (type only)', () => {
  const minimal = { partI: { procedure: { procedureType: 'Open' } } };
  assert.deepEqual(unmap(spec, map(spec, minimal)), minimal);
});

test('the lot list roundtrips, preserving order and count', () => {
  const doc = {
    partI: { procedure: { procedureType: 'Restricted' }, lots: ['LOT-0000', 'LOT-0001', 'LOT-0002', 'LOT-0003'] },
  };
  const back = unmap(spec, map(spec, doc));
  assert.deepEqual(back.partI.lots, doc.partI.lots);
});

test('the file reference @schemeAgencyID is the constant OP and does not round-trip into the instance', () => {
  const back = unmap(spec, map(spec, example));
  // The agency is a derived constant, not instance data.
  assert.ok(!('schemeAgency' in back.partI.procedure.fileReference),
    'the derived agency must not reappear in the instance');
});

// --- UBL structure ------------------------------------------------------

test('procedure fields land on DOCUMENT-HEADER elements, not in a cac: aggregate', () => {
  const xml = map(spec, example);
  // ContractFolderID + ProcedureCode are direct children of the root.
  assert.match(xml, /<cbc:ContractFolderID[^>]*schemeAgencyID="OP"[^>]*>PP\.20170419\.1024-9<\/cbc:ContractFolderID>/);
  assert.match(xml, /<cbc:ProcedureCode[^>]*>Open<\/cbc:ProcedureCode>/);
});

test('the project maps to cac:ProcurementProject with name and description', () => {
  const xml = map(spec, example);
  assert.match(xml, /<cac:ProcurementProject>/);
  assert.match(xml, /<cbc:Name>Supply of office equipment for regional offices<\/cbc:Name>/);
  assert.match(xml, /<cbc:Description>Framework agreement[^<]*<\/cbc:Description>/);
});

test('each lot becomes its own cac:ProcurementProjectLot wrapper', () => {
  const xml = map(spec, example);
  const wrappers = (xml.match(/<cac:ProcurementProjectLot>/g) || []).length;
  assert.equal(wrappers, 3, 'three lots -> three distinct wrappers');
  for (const id of ['LOT-0000', 'LOT-0001', 'LOT-0002']) {
    assert.ok(xml.includes(`>${id}</cbc:ID>`), `lot ${id} must be emitted`);
  }
});

// --- Schematron-mandated attribute expansion ----------------------------

test('ProcedureCode expands to the BR-OTH-01 three-attribute set', async () => {
  const { expandCodelistAttributes } = await import('../../compiler/schematron-validate.mjs');
  const { loadValidatedCodelistProfile } = await import('../../compiler/codelist-attributes.mjs');
  const { profile } = loadValidatedCodelistProfile();

  const expanded = expandCodelistAttributes(map(spec, example), profile);
  const tag = expanded.match(/<cbc:ProcedureCode[^>]*>/)[0];
  // BR-OTH-01-10/20/30: all three are fatal.
  assert.match(tag, /listID="http:\/\/publications\.europa\.eu\/resource\/authority\/procurement-procedure-type"/);
  assert.match(tag, /listAgencyID="OP"/);
  assert.match(tag, /listVersionID="20250924-0"/);
  assert.ok(!tag.includes('listID="procurement-procedure-type"'), 'shorthand should be expanded');
});

test('each lot cbc:ID expands to the criterion identifier scheme (matching the BASE sample)', async () => {
  const { expandCodelistAttributes } = await import('../../compiler/schematron-validate.mjs');
  const { loadValidatedCodelistProfile } = await import('../../compiler/codelist-attributes.mjs');
  const { profile } = loadValidatedCodelistProfile();

  const expanded = expandCodelistAttributes(map(spec, example), profile);
  const idTags = expanded.match(/<cbc:ID[^>]*>/g) || [];
  assert.equal(idTags.length, 3, 'one cbc:ID per lot');
  for (const tag of idTags) {
    assert.match(tag, /schemeID="criterion"/);
    // BR-OTH-02 (fatal) on every cbc:ID.
    assert.match(tag, /schemeAgencyID="OP"/);
    assert.match(tag, /schemeVersionID="5\.0\.0"/);
  }
});

test('the ContractFolderID @schemeAgencyID survives expansion (BR-OTH-02, fatal)', async () => {
  const { expandCodelistAttributes } = await import('../../compiler/schematron-validate.mjs');
  const { loadValidatedCodelistProfile } = await import('../../compiler/codelist-attributes.mjs');
  const { profile } = loadValidatedCodelistProfile();

  const expanded = expandCodelistAttributes(map(spec, example), profile);
  // ContractFolderID is in the BR-OTH-02 element list; its agency (the constant
  // 'OP') must not be rewritten by the cbc:ID criterion-scheme rule.
  assert.match(expanded, /<cbc:ContractFolderID[^>]*schemeAgencyID="OP"/);
});

// --- form lens ----------------------------------------------------------

test('the form lens covers all Section C fields with severity-matched requiredness', () => {
  const byPath = new Map(form.fields.map(f => [f.dataPath, f]));
  assert.deepEqual([...byPath.keys()], [
    'partI.procedure.procedureType',
    'partI.procedure.fileReference.value',
    'partI.project.name',
    'partI.project.description',
    'partI.lots',
  ]);

  // BR-SC-10 is fatal -> required. Everything else is unconstrained -> optional.
  assert.equal(byPath.get('partI.procedure.procedureType').required, true);
  assert.equal(byPath.get('partI.procedure.fileReference.value').required, false);
  assert.equal(byPath.get('partI.project.name').required, false);

  // Lots are collected via a "Number of lots" count control that generates the
  // canonical partI.lots array; it is optional and not a repeatable row field.
  assert.equal(byPath.get('partI.lots').uiType, 'lot-count');
  assert.equal(byPath.get('partI.lots').required, false);
  assert.equal(byPath.get('partI.lots').repeatable, undefined);
});

test('the procedureType field documents the missing-codelist caveat', () => {
  // The procurement-procedure-type .gc is NOT shipped, so unlike Section A the
  // picker cannot be populated locally. The lens must say so rather than imply
  // a codelist is available.
  const field = form.fields.find(f => f.dataPath === 'partI.procedure.procedureType');
  assert.equal(field.codelist, 'procurement-procedure-type');
  assert.match(field.description, /not shipped/i);
  // And the schema must not claim an enum it cannot derive.
  assert.equal(schema.$defs.procedure.properties.procedureType.enum, undefined);
  assert.equal(schema.$defs.procedure.properties.procedureType.$codelist, 'procurement-procedure-type');
});
