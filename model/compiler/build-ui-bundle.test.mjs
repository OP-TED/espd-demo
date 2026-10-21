// Phase 3 — UI bundle assembly + composed-schema tests.
//
// Four concerns:
//   1. Completeness: every modeled criterion is placed in exactly one section; no
//      dangling criterion ids; every placed id is a real sidecar.
//   2. Assembled bundle shape: all six parts, EA-ordered sections, member kinds
//      and ordering intact (incl. Part II admin+criteria interleave), criterion
//      groups/fields carried through unflattened.
//   3. Composed schemas: part roots + document root compile under Ajv 2020 via
//      $ref over the per-criterion schemas; a good example validates, an unknown
//      criterion key is rejected, an empty part is allowed (present-if-included).
//   4. Staleness: the committed ui/{index,part-*}.json + schema/* match a fresh build.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from '../../node_modules/ajv/dist/2020.js';
import { buildUiBundle, assembleParts, uiBundleDir, uiSchemaDir } from './build-ui-bundle.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const criteriaDir = path.join(here, '..', 'model-sources', 'criteria');
const instanceDataDir = path.join(here, '..', 'generated', 'instance-data');
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

const { parts, partLenses, index, partSchemas, documentRoot, criteriaByPart } = buildUiBundle({ write: false });

const modeledIds = fs.readdirSync(criteriaDir)
  .filter((f) => f.endsWith('.sidecar.json'))
  .map((f) => f.replace('.sidecar.json', ''))
  .sort();

/** All criterion members across every assembled part, in order. */
function allCriterionMembers() {
  const out = [];
  for (const lens of partLenses) {
    for (const sec of lens.sections) {
      for (const m of sec.members) if (m.kind === 'criterion') out.push({ part: lens.part, section: sec.id, ...m });
    }
  }
  return out;
}

describe('ui-bundle: criterion placement completeness', () => {
  it('every modeled criterion is placed exactly once', () => {
    const placed = allCriterionMembers().map((m) => m.id).sort();
    assert.deepEqual(placed, modeledIds, 'placed criteria must equal the modeled sidecar set');
  });

  it('no criterion id is placed twice', () => {
    const placed = allCriterionMembers().map((m) => m.id);
    assert.equal(new Set(placed).size, placed.length);
  });

  it('criteriaByPart ids are all real sidecars', () => {
    for (const [, crits] of criteriaByPart) {
      for (const { id } of crits) assert.ok(modeledIds.includes(id), `${id} is a modeled criterion`);
    }
  });
});

describe('ui-bundle: assembled shape', () => {
  it('emits all six parts in order', () => {
    assert.deepEqual(partLenses.map((l) => l.part), ['I', 'II', 'III', 'IV', 'V', 'VI']);
  });

  it('Part II interleaves admin + OT criteria across A/B/C/D (EA order)', () => {
    const partII = parts.get('II');
    assert.deepEqual(partII.sections.map((s) => s.id), ['A', 'B', 'C', 'D']);
    const a = partII.sections[0];
    assert.equal(a.members[0].kind, 'administrative');
    assert.equal(a.members[0].tag, 'I71');
    assert.deepEqual(
      a.members.slice(1).map((m) => m.id),
      ['ot-eo-size', 'ot-sheltered-workshop', 'ot-registered-official-list', 'ot-group-participation']
    );
    assert.deepEqual(partII.sections[2].members.map((m) => m.id), ['ot-relied-on-entities']);
    assert.deepEqual(partII.sections[3].members.map((m) => m.id), ['ot-subcontractors']);
  });

  it('Part III sections A/B/C/D carry criteria in EA tag order', () => {
    const partIII = parts.get('III');
    assert.deepEqual(partIII.sections.map((s) => s.id), ['A', 'B', 'C', 'D']);
    assert.deepEqual(
      partIII.sections[0].members.map((m) => m.id),
      ['exg-crim-part', 'exg-crim-corrpt', 'exg-crim-fraud', 'exg-crim-terror', 'exg-crim-laund', 'exg-crim-traffick']
    );
    assert.deepEqual(partIII.sections[3].members.map((m) => m.id), ['exg-natl-bre-nat-law']);
  });

  it('criterion members carry groups/dataPath/tag unflattened', () => {
    const m = allCriterionMembers().find((x) => x.id === 'exg-crim-part');
    assert.ok(m.dataPath && Array.isArray(m.groups) && m.groups.length >= 1);
    assert.ok(m.groups[0].fields.length >= 1, 'group fields preserved');
    assert.ok(m.nameKey && m.descriptionKey, 'i18n keys carried');
    assert.equal(m.tag, 'C01', 'EA tag carried (stable id for the criterion card)');
  });

  it('admin members carry flat fields; Part I lookup hint survives', () => {
    const partI = parts.get('I');
    const adminA = partI.sections.find((s) => s.id === 'A').members.find((m) => m.kind === 'administrative');
    const idField = adminA.fields.find((f) => f.dataPath === 'partI.publication.identifier');
    assert.equal(idField.uiHints.lookup.name, 'ted-notice');
  });

  it('section titleKeys follow section.title.<part>.<letter>', () => {
    for (const lens of partLenses) {
      for (const s of lens.sections) {
        assert.equal(s.titleKey, `section.title.${lens.part}.${s.id}`);
      }
    }
  });

  it('an admin section that authored a description carries its descriptionKey', () => {
    const sectionA = parts.get('I').sections.find((s) => s.id === 'A');
    assert.equal(sectionA.descriptionKey, 'partI.sectionA.description');
  });

  it('a criterion-only section carries no descriptionKey', () => {
    // Part III section A is all exclusion-ground criteria, no admin block.
    const sectionA = parts.get('III').sections.find((s) => s.id === 'A');
    assert.equal(sectionA.descriptionKey, undefined);
  });
});

describe('ui-bundle: composed schemas ($ref, never merge)', () => {
  const ajv = new Ajv({ allErrors: true, strict: false, logger: false });
  // Register per-criterion schemas (keyed by their unique $id) + the part roots
  // + the hand-authored admin section schemas (the document root $refs these).
  for (const f of fs.readdirSync(instanceDataDir).filter((x) => x.endsWith('.schema.json'))) {
    ajv.addSchema(read(path.join(instanceDataDir, f)));
  }
  for (const { schema } of partSchemas) ajv.addSchema(schema);
  const partsRoot = path.join(here, '..', 'parts');
  for (const [dir, section] of [['partI', 'sectionA'], ['partI', 'sectionB'], ['partI', 'sectionC'], ['partII', 'sectionA'], ['partII', 'sectionB'], ['partVI', 'sectionA']]) {
    ajv.addSchema(read(path.join(partsRoot, dir, `${section}.schema.json`)));
  }

  it('every part root compiles under Ajv 2020', () => {
    for (const { roman } of partSchemas) {
      assert.ok(ajv.getSchema(`part-${roman}.schema.json`), `part-${roman} resolves`);
    }
  });

  it('the document root compiles ($refs the part roots + admin sections)', () => {
    assert.doesNotThrow(() => ajv.compile(documentRoot));
  });

  it('the document root is FLAT (partI…partVI keys matching the instance document)', () => {
    assert.deepEqual(
      Object.keys(documentRoot.properties).sort(),
      ['partI', 'partII', 'partIII', 'partIV', 'partV', 'partVI']
    );
    assert.equal(documentRoot.additionalProperties, false);
    // partII merges the criteria container + both admin sub-keys.
    assert.deepEqual(
      Object.keys(documentRoot.properties.partII.properties).sort(),
      ['economicOperator', 'economicOperatorCriteria', 'powersOfAttorney']
    );
    // Every leaf is a $ref (nothing inlined/merged).
    for (const partProp of Object.values(documentRoot.properties)) {
      for (const sub of Object.values(partProp.properties)) {
        assert.ok(sub.$ref, 'document-root sub-key is a $ref');
      }
    }
  });

  it('the document root validates a FLAT whole document', () => {
    const validate = ajv.compile(documentRoot);
    const exg = read(path.join(instanceDataDir, 'exg-crim-part.example.json'));
    const doc = {
      partI: { publication: { type: 'TED_CN', identifier: '2026/S 142-123456' }, contractingAuthority: { officialName: 'ACME', country: 'BEL' } },
      partIII: { ...exg.partIII },
    };
    assert.ok(validate(doc), JSON.stringify(validate.errors?.slice(0, 3)));
  });

  it('the document root rejects an unknown top-level part and an unknown sub-key', () => {
    const validate = ajv.compile(documentRoot);
    assert.ok(!validate({ partZ: {} }), 'unknown part rejected');
    assert.ok(!validate({ partI: { nope: 1 } }), 'unknown sub-key rejected');
  });

  it('part roots $ref criteria (do not inline/merge)', () => {
    const partIII = partSchemas.find((p) => p.roman === 'III').schema;
    const prop = partIII.properties.partIII.properties.exclusionGrounds.properties['exg-crim-part'];
    assert.ok(prop.$ref && prop.$ref.startsWith('exg-crim-part.schema.json#/'), 'is a $ref, not an inlined schema');
    assert.ok(!prop.properties, 'criterion sub-schema is not inlined');
  });

  it('a good criterion example validates against its part root', () => {
    const validate = ajv.getSchema('part-III.schema.json');
    const good = read(path.join(instanceDataDir, 'exg-crim-part.example.json'));
    assert.ok(validate(good), JSON.stringify(validate.errors?.slice(0, 2)));
  });

  it('an unknown criterion key is rejected', () => {
    const validate = ajv.getSchema('part-III.schema.json');
    assert.ok(!validate({ partIII: { exclusionGrounds: { 'nope': { response: { answer: true } } } } }));
  });

  it('an empty part validates (criterion sub-schemas are optional)', () => {
    const validate = ajv.getSchema('part-III.schema.json');
    assert.ok(validate({ partIII: { exclusionGrounds: {} } }));
  });
});

describe('ui-bundle: generated artifacts are up to date (staleness guard)', () => {
  const fresh = buildUiBundle({ write: false });

  for (const lens of fresh.partLenses) {
    it(`committed ui/part-${lens.part}.json matches a fresh build`, () => {
      const onDisk = fs.readFileSync(path.join(uiBundleDir, `part-${lens.part}.json`), 'utf8');
      const expected = JSON.stringify({ $comment: `GENERATED by model/compiler/build-ui-bundle.mjs. Assembled UI lens for Part ${lens.part}: EA-ordered sections, each with ordered members (administrative blocks and/or criteria). Do not hand-edit; regenerate.`, ...lens }, null, 2) + '\n';
      assert.equal(onDisk, expected, `part-${lens.part}.json is stale — run \`node model/compiler/build-ui-bundle.mjs\``);
    });
  }

  it('committed ui/index.json matches a fresh build', () => {
    const onDisk = fs.readFileSync(path.join(uiBundleDir, 'index.json'), 'utf8');
    assert.equal(onDisk, JSON.stringify(fresh.index, null, 2) + '\n', 'index.json is stale — regenerate');
  });

  for (const { roman, schema } of (buildUiBundle({ write: false })).partSchemas) {
    it(`committed ui/schema/part-${roman}.schema.json matches a fresh build`, () => {
      const onDisk = fs.readFileSync(path.join(uiSchemaDir, `part-${roman}.schema.json`), 'utf8');
      assert.equal(onDisk, JSON.stringify(schema, null, 2) + '\n', `part-${roman}.schema.json is stale — regenerate`);
    });
  }

  it('committed ui/schema/espd.schema.json matches a fresh build', () => {
    const onDisk = fs.readFileSync(path.join(uiSchemaDir, 'espd.schema.json'), 'utf8');
    assert.equal(onDisk, JSON.stringify(documentRoot, null, 2) + '\n', 'espd.schema.json is stale — regenerate');
  });
});
