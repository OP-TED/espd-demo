// Phase 3 — assemble the UI bundle: the single part -> ordered sections -> ordered
// members structure a model-driven renderer consumes, plus the composed JSON
// Schemas (per-part roots + a document root) built by $ref over the per-criterion
// schemas.
//
// Section grouping and member ORDER are taken from the EA export
// (espd-edm.json): each part has `sections[]`, each section a letter and an
// ordered `criteria[]` whose entries are either `type: INFORMATION` (a
// hand-authored administrative block) or `type: CRITERION` (an EA-compiled
// criterion). This is the single source of truth — the bundle does not reorder
// or regroup.
//
// Member resolution:
//   - INFORMATION -> the admin section of the same letter from parts.mjs
//     (model/parts/<part>/section<Letter>.form.json), already validated there.
//   - CRITERION  -> the generated form-structure for the modeled criterion,
//     found by mapping the EA `tag` to the sidecar `id` (OT65 -> ot-eo-size;
//     for non-OT criteria the tag's criterion maps to code == id).
//
// Section titles come from the i18n catalogue (section.title.<part>.<letter>),
// already present; the bundle carries only the key.
//
// Sole writer of model/generated/ui/{index.json, part-*.json} and the composed
// schemas under model/generated/ui/schema/. parts.mjs provides admin lenses
// in-memory and owns only the espd.parts.json catalogue.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadEdm } from './compile.mjs';
import { adminLensesByPart } from './parts.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const edmPath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const criteriaDir = path.join(here, '..', 'model-sources', 'criteria');
const formStructureDir = path.join(here, '..', 'generated', 'form-structure');
const instanceDataDir = path.join(here, '..', 'generated', 'instance-data');
const uiDir = path.resolve(here, '..', 'generated', 'ui');
const schemaDir = path.join(uiDir, 'schema');

const MODEL_VERSION = '5.0.0';

// Part roman numeral <-> EA part key.
const PART_KEYS = ['I', 'II', 'III', 'IV', 'V', 'VI'];
const EA_PART_BY_ROMAN = {
  I: 'partI', II: 'partII', III: 'partIII', IV: 'partIV', V: 'partV', VI: 'partVI',
};
// Instance container per criterion-bearing part (the key under partX in the schema).
const CONTAINER_BY_ROMAN = {
  II: 'economicOperatorCriteria',
  III: 'exclusionGrounds',
  IV: 'selectionCriteria',
  V: 'otherCriteria',
};

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

/**
 * Resolve an EA section member { tag, code } to its modeled sidecar id.
 * Built from the sidecars: a sidecar id equals its EA `code` for the normal case
 * (III/IV, so C01's code `exg-crim-part` is the id), while the Part II/V 'OT'
 * criteria share code "OT" and disambiguate by `tag` (OT65 -> ot-eo-size). So we
 * index by both tag (when the sidecar carries one) and code, and resolve a member
 * by tag first, then code.
 */
function memberIdResolver() {
  const byTag = new Map();
  const byCode = new Map();
  for (const f of fs.readdirSync(criteriaDir).filter((x) => x.endsWith('.sidecar.json'))) {
    const id = f.replace('.sidecar.json', '');
    const c = readJson(path.join(criteriaDir, f)).criterion ?? {};
    if (c.tag) byTag.set(c.tag, id);
    if (c.code && c.code !== 'OT') byCode.set(c.code, id);
  }
  return (member) => byTag.get(member.tag) ?? byCode.get(member.code) ?? null;
}

/** The single criterion entry from a generated form-structure file (one per file). */
function criterionForm(id) {
  const form = readJson(path.join(formStructureDir, `${id}.form.json`));
  if (!Array.isArray(form.criteria) || form.criteria.length !== 1) {
    throw new Error(`form-structure ${id}: expected exactly one criterion entry`);
  }
  return form.criteria[0];
}

/** The inner container key a criterion schema uses (id minus the ot- prefix for OT). */
function criterionInnerKey(id, roman) {
  const schema = readJson(path.join(instanceDataDir, `${id}.schema.json`));
  const container = CONTAINER_BY_ROMAN[roman];
  const inner = Object.keys(schema.properties?.[`part${roman}`]?.properties?.[container]?.properties ?? {});
  if (inner.length !== 1) {
    throw new Error(`schema ${id}: expected one criterion under part${roman}.${container}, got ${inner.length}`);
  }
  return inner[0];
}

/**
 * Assemble all six part lenses from the EA section structure. Returns
 * { parts: Map<roman, lens>, criteriaByPart: Map<roman, [{id, innerKey}]> }.
 */
export function assembleParts({ edm = loadEdm(edmPath) } = {}) {
  const admin = adminLensesByPart();
  const resolveId = memberIdResolver();
  const parts = new Map();
  const criteriaByPart = new Map();

  for (const roman of PART_KEYS) {
    const eaPart = edm.find((p) => p.part === EA_PART_BY_ROMAN[roman]);
    if (!eaPart) throw new Error(`EA export missing ${EA_PART_BY_ROMAN[roman]}`);
    const adminLens = admin.get(roman);
    const adminSectionById = new Map((adminLens?.sections ?? []).map((s) => [s.id, s]));
    const usedAdmin = new Set();
    const partCriteria = [];

    const sections = eaPart.sections.map((eaSec) => {
      const letter = eaSec.section;
      const members = [];
      for (const member of eaSec.criteria ?? []) {
        if (member.type === 'INFORMATION') {
          const adminSec = adminSectionById.get(letter);
          if (!adminSec) {
            throw new Error(`part ${roman} section ${letter}: EA has an INFORMATION block (${member.tag}) but no hand-authored admin section ${letter}`);
          }
          usedAdmin.add(letter);
          members.push({
            kind: 'administrative',
            tag: member.tag,
            filledBy: adminSec.filledBy,
            fields: adminSec.fields,
          });
        } else if (member.type === 'CRITERION') {
          const id = resolveId(member);
          if (!id) throw new Error(`part ${roman} section ${letter}: no modeled criterion for EA tag ${member.tag} / code ${member.code}`);
          const form = criterionForm(id);
          const innerKey = criterionInnerKey(id, roman);
          partCriteria.push({ id, innerKey });
          members.push({
            kind: 'criterion',
            id,
            tag: member.tag,
            code: form.code,
            nameKey: form.nameKey,
            descriptionKey: form.descriptionKey,
            filledBy: form.filledBy,
            dataPath: form.dataPath,
            groups: form.groups,
          });
        } else {
          throw new Error(`part ${roman} section ${letter}: unexpected member type ${member.type} (${member.tag})`);
        }
      }
      return { id: letter, titleKey: `section.title.${roman}.${letter}`, members };
    });

    // Every hand-authored admin section must have been placed by the EA structure.
    for (const s of adminLens?.sections ?? []) {
      if (!usedAdmin.has(s.id)) {
        throw new Error(`part ${roman}: admin section ${s.id} is not referenced by the EA section structure`);
      }
    }

    parts.set(roman, {
      part: roman,
      titleKey: adminLens?.titleKey ?? `part.title.${roman}`,
      descriptionKey: adminLens?.descriptionKey ?? `part.description.${roman}`,
      shortKey: `part.short.${roman}`,
      filledBy: adminLens?.filledBy ?? null,
      sections,
    });
    criteriaByPart.set(roman, partCriteria);
  }

  return { parts, criteriaByPart };
}

/**
 * Compose per-part root schemas ($ref each included criterion schema under its
 * container, criterion sub-schemas optional) + a document root ($ref the part
 * roots). Composes over the per-criterion schema files; never merges them.
 */
export function composeSchemas(criteriaByPart) {
  const partSchemas = [];
  for (const roman of ['II', 'III', 'IV', 'V']) {
    const container = CONTAINER_BY_ROMAN[roman];
    const crits = criteriaByPart.get(roman) ?? [];
    const criterionProps = {};
    for (const { id, innerKey } of crits) {
      // $ref the criterion's existing schema by its (now unique) $id +
      // JSON-Pointer to the sub-schema under its container. Referencing by $id
      // (not a relative file path) means resolution does not depend on the
      // referrer's base URI — the loader registers each criterion schema under
      // its own $id (`<id>.schema.json`).
      criterionProps[innerKey] = {
        $ref: `${id}.schema.json#/properties/part${roman}/properties/${container}/properties/${innerKey}`,
      };
    }
    const schema = {
      $id: `part-${roman}.schema.json`,
      $comment: `GENERATED by model/compiler/build-ui-bundle.mjs. Part ${roman} root: composes the included criterion schemas by $ref under part${roman}.${container}. Criterion sub-schemas are OPTIONAL (present-if-included). Composes the per-criterion schemas — never merges them. No $schema keyword: compiled with the project's Ajv 2020, matching the per-criterion schemas.`,
      type: 'object',
      properties: {
        [`part${roman}`]: {
          type: 'object',
          properties: {
            [container]: {
              type: 'object',
              properties: criterionProps,
              additionalProperties: false,
            },
          },
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    };
    partSchemas.push({ roman, schema });
  }

  // Document root: $ref the criterion-bearing part roots + the hand-authored
  // administrative part schemas (Parts I, II, VI). All parts optional.
  const docProps = {};
  for (const { roman } of partSchemas) {
    docProps[`part-${roman}`] = { $ref: `part-${roman}.schema.json` };
  }
  const adminSchemaRefs = {
    I: ['partI/sectionA', 'partI/sectionB', 'partI/sectionC'],
    II: ['partII/sectionA', 'partII/sectionB'],
    VI: ['partVI/sectionA'],
  };
  const documentRoot = {
    $id: 'espd.schema.json',
    $comment: 'GENERATED by model/compiler/build-ui-bundle.mjs. Document root: $refs the per-part root schemas (criterion-bearing parts) and the hand-authored administrative part schemas. Composition only; the per-criterion and per-section schemas remain the single source.',
    type: 'object',
    properties: {
      ...docProps,
      $administrativeParts: {
        $comment: 'Hand-authored administrative part/section schemas live under model/parts/<part>/section*.schema.json; referenced here for discoverability.',
        parts: adminSchemaRefs,
      },
    },
  };

  return { partSchemas, documentRoot };
}

/** Build the whole bundle. Pure w.r.t. inputs; writes only when { write: true }. */
export function buildUiBundle({ write = true } = {}) {
  const { parts, criteriaByPart } = assembleParts();
  const { partSchemas, documentRoot } = composeSchemas(criteriaByPart);

  const partLenses = PART_KEYS.map((roman) => parts.get(roman));

  const index = {
    $comment: 'GENERATED by model/compiler/build-ui-bundle.mjs. Manifest for the model-driven UI: the ordered parts, the role lens, the codelist service data, and the composed schema roots. Do not hand-edit; regenerate.',
    version: MODEL_VERSION,
    parts: PART_KEYS.map((roman) => ({ part: roman, $ref: `./part-${roman}.json` })),
    roles: './roles.json',
    codelists: '../codelists/index.json',
    schema: {
      document: './schema/espd.schema.json',
      parts: partSchemas.map(({ roman }) => ({ part: roman, $ref: `./schema/part-${roman}.schema.json` })),
    },
  };

  if (write) {
    fs.mkdirSync(uiDir, { recursive: true });
    fs.mkdirSync(schemaDir, { recursive: true });
    for (const lens of partLenses) {
      const doc = {
        $comment: `GENERATED by model/compiler/build-ui-bundle.mjs. Assembled UI lens for Part ${lens.part}: EA-ordered sections, each with ordered members (administrative blocks and/or criteria). Do not hand-edit; regenerate.`,
        ...lens,
      };
      fs.writeFileSync(path.join(uiDir, `part-${lens.part}.json`), JSON.stringify(doc, null, 2) + '\n');
    }
    fs.writeFileSync(path.join(uiDir, 'index.json'), JSON.stringify(index, null, 2) + '\n');
    for (const { roman, schema } of partSchemas) {
      fs.writeFileSync(path.join(schemaDir, `part-${roman}.schema.json`), JSON.stringify(schema, null, 2) + '\n');
    }
    fs.writeFileSync(path.join(schemaDir, 'espd.schema.json'), JSON.stringify(documentRoot, null, 2) + '\n');
  }

  return { parts, partLenses, index, partSchemas, documentRoot, criteriaByPart };
}

export const uiBundleDir = uiDir;
export const uiSchemaDir = schemaDir;

// Run directly: node model/compiler/build-ui-bundle.mjs
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { partLenses, criteriaByPart } = buildUiBundle({ write: true });
  const totalCriteria = [...criteriaByPart.values()].reduce((n, c) => n + c.length, 0);
  const totalSections = partLenses.reduce((n, l) => n + l.sections.length, 0);
  console.log(`Assembled UI bundle: ${partLenses.length} parts, ${totalSections} sections, ${totalCriteria} criteria placed. Wrote model/generated/ui/{index.json, part-*.json, schema/*}.`);
}
