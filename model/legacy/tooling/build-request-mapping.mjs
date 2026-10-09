// EXPERIMENTAL — generate the `structure` block of a Part IV request mapping
// from the authoritative espd-edm.json, and write the complete mapping file.
//
// SCOPE: this is an ESPD-EDM-SPECIFIC adapter, not generic infrastructure. It
// knows ESPD/UBL element names, scheme attributes, datatype->element rules and
// the ESPD-EDM node-type vocabulary. The generic, reusable layer is the mapper
// engine (mapper.mjs), which hardcodes none of that. See the "NOTE ON SCOPE"
// near componentNodes() for the full breakdown.
//
// The request document DECLARES the whole criterion: the criterion head, lot
// references, national sub-criteria, legislation, and the full recursive
// property-group tree. That structure is fixed criterion metadata owned by
// espd-edm.json — NOT hand-authored. This generator walks a criterion's
// `components` tree and emits an embedded `structure` node tree (mirroring the
// UBL XML 1:1) that the mapper's `structure` rule consumes directly.
//
// The buyer-value binding is almost entirely DERIVED: which Expected* element a
// REQUIREMENT uses is dictated by its ValueDataTypeCode (the generic
// DATATYPE_ELEMENT table). The ONLY hand-specified part is WHERE each
// requirement's value lives in the instance data — a small per-criterion
// FIELD_MAPS entry ({ base, fields: tag-path -> instance field }). Those become
// `from`/`forEach` leaves spliced onto the tree, so the one embedded structure
// drives both map (instance -> request XML) and unmap (request XML -> instance).
//
// This keeps a SINGLE source of truth (espd-edm.json) and a SINGLE artifact per
// part (the mapping file) — no separate scaffold model, no separate XML
// generator. Regenerate after espd-edm.json changes:
//
//   node build-request-mapping.mjs
//
// Options:
//   --stdout            print the mapping JSON instead of writing the file
//   --code <code>       criterion code (default: slc-stand-to-spec-avg)
//   --out <file>        output path (default: part-IV.request.mapping.json)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EDM_PATH = path.resolve(__dirname, '..', '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');

// ---- constant scheme attributes (match the reference ESPD-criterion.xml) ----
const A_CRITERION_ID = { schemeID: 'criterion' };
const A_CRITERION_TYPE = { listID: 'http://publications.europa.eu/resource/authority/criterion' };
const A_GROUP_TYPE = { listID: 'property-group-type' };
const A_ELEMENT_TYPE = { listID: 'criterion-element-type' };
const A_DATA_TYPE = { listID: 'response-data-type' };

// ---- GENERIC datatype -> Expected element table (shared by all criteria) ----
//
// A REQUIREMENT's buyer value element is dictated by its ValueDataTypeCode
// (BR-TCR-08 and the ESPD examples), NOT by the criterion. This table encodes
// that mapping once. `kind` selects how the value binds:
//   - 'scalar'  : element text = the instance value at the bound field.
//   - 'amount'  : element text = field.value, currencyID attribute = field.currency.
//   - 'lot'     : repeated element, one per entry of an instance array (ExpectedID).
// Unlisted datatypes fall back to a scalar cbc:ExpectedValue* by convention.
const DATATYPE_ELEMENT = {
  LOT_IDENTIFIER:  { element: 'cbc:ExpectedID', kind: 'lot', attributes: { schemeAgencyID: 'OP' } },
  QUANTITY_YEAR:   { element: 'cbc:ExpectedValueNumeric', kind: 'scalar', type: 'number' },
  QUANTITY:        { element: 'cbc:ExpectedValueNumeric', kind: 'scalar', type: 'number' },
  QUANTITY_INTEGER:{ element: 'cbc:ExpectedValueNumeric', kind: 'scalar', type: 'number' },
  PERCENTAGE:      { element: 'cbc:ExpectedValueNumeric', kind: 'scalar', type: 'number' },
  MINIMUM_AMOUNT:  { element: 'cbc:MinimumAmount', kind: 'amount', type: 'number' },
  AMOUNT:          { element: 'cbc:ExpectedAmount', kind: 'amount', type: 'number' },
  DESCRIPTION:     { element: 'cbc:ExpectedDescription', kind: 'scalar', type: 'string' },
  INDICATOR:       { element: 'cbc:ExpectedIndicator', kind: 'scalar', type: 'boolean' },
  DATE:            { element: 'cbc:ExpectedDate', kind: 'scalar', type: 'string' },
  CODE:            { element: 'cbc:ExpectedCode', kind: 'scalar', type: 'string' },
  CODE_BOOLEAN:    { element: 'cbc:ExpectedCode', kind: 'scalar', type: 'string' },
  URL:             { element: 'cbc:ExpectedURI', kind: 'scalar', type: 'string' }
};

// ---- per-criterion instance-field map (the ONLY hand-specified part) --------
//
// The only thing NOT derivable from espd-edm.json is WHERE each REQUIREMENT's
// value lives in the instance data (the semantic key we chose, e.g.
// `numberOfYears`). So per criterion we supply just `base` (the instance path to
// the requirement object) and `fields`: requirement tag-path -> instance field.
// The tag-path is the requestpath with the criterion prefix stripped (e.g.
// `RG1/RSG1/RQ1`). A REQUIREMENT with no entry is DECLARED (structure only) but
// carries no buyer value — valid, and the common case for most criteria.
const FIELD_MAPS = {
  'slc-stand-to-spec-avg': {
    base: 'partIV.selectionCriteria.slc-stand-to-spec-avg.requirement',
    fields: {
      'RG1/RQ1': 'lotIdentifiers',
      'RG1/RSG1/RQ1': 'numberOfYears',
      'RG1/RSG1/RQ2': 'businessDomain',
      'RG1/RSG1/RQ3': 'minimumAmount'
    }
  }
};

/** The tag-path of a requestpath: strip the leading `C<nn>_<code>/`. */
function tagPath(requestpath) {
  const i = requestpath.indexOf('/');
  return i === -1 ? '' : requestpath.slice(i + 1);
}

// ---- structure node builders -------------------------------------------------

const idNode = (requestpath) => ({ element: 'cbc:ID', const: requestpath, attributes: { ...A_CRITERION_ID } });

/**
 * Build the buyer-value leaf(s) for a REQUIREMENT, derived from its datatype
 * (which element) and the per-criterion field map (where in the instance).
 * Returns [] when the requirement has no bound field (declared, no value).
 */
function requirementValueNodes(comp, fieldMap) {
  if (!fieldMap) return [];
  const field = fieldMap.fields[tagPath(comp.requestpath)];
  if (!field) return [];
  const dt = DATATYPE_ELEMENT[comp.propertydatatype];
  if (!dt) return [];
  const fromBase = `${fieldMap.base}.${field}`;

  if (dt.kind === 'amount') {
    return [{
      element: dt.element,
      from: `${fromBase}.value`,
      type: dt.type,
      attributes: { currencyID: { from: `${fromBase}.currency` } }
    }];
  }
  // 'lot' repeats one ExpectedID per array entry; handled at the property level
  // (see propertyNode) because the repetition is on the property, not the leaf.
  if (dt.kind === 'lot') return []; // emitted by propertyNode's forEach path
  return [{ element: dt.element, from: fromBase, type: dt.type }];
}

/** A QUESTION/REQUIREMENT/CAPTION property -> cac:TenderingCriterionProperty. */
function propertyNode(comp, fieldMap) {
  // Property id form: QUESTION uses bare requestpath, REQUIREMENT appends /R1/R1
  // (empirical, from ESPD-criterion.xml).
  const id = comp.type === 'REQUIREMENT' ? `${comp.requestpath}/R1/R1` : comp.requestpath;

  // LOT_IDENTIFIER requirement repeats one property per lot id (a forEach on the
  // property element itself), each carrying one cbc:ExpectedID.
  const field = fieldMap?.fields[tagPath(comp.requestpath)];
  if (comp.type === 'REQUIREMENT' && comp.propertydatatype === 'LOT_IDENTIFIER' && field) {
    const dt = DATATYPE_ELEMENT.LOT_IDENTIFIER;
    return {
      element: 'cac:TenderingCriterionProperty',
      forEach: `${fieldMap.base}.${field}`,
      children: [
        { element: 'cbc:ID', const: id, attributes: { ...A_CRITERION_ID } },
        { element: 'cbc:Name', const: '' },
        { element: 'cbc:Description', const: comp.description ?? '' },
        { element: 'cbc:TypeCode', const: comp.type, attributes: { ...A_ELEMENT_TYPE } },
        { element: 'cbc:ValueDataTypeCode', const: comp.propertydatatype, attributes: { ...A_DATA_TYPE } },
        { element: dt.element, fromItem: '.', attributes: { ...dt.attributes } }
      ]
    };
  }

  const children = [
    { element: 'cbc:ID', const: id, attributes: { ...A_CRITERION_ID } },
    { element: 'cbc:Name', const: '' },
    { element: 'cbc:Description', const: comp.description ?? '' },
    { element: 'cbc:TypeCode', const: comp.type, attributes: { ...A_ELEMENT_TYPE } },
    { element: 'cbc:ValueDataTypeCode', const: comp.propertydatatype ?? 'NONE', attributes: { ...A_DATA_TYPE } }
  ];
  if (comp.type === 'REQUIREMENT') {
    children.push(...requirementValueNodes(comp, fieldMap));
  }
  return { element: 'cac:TenderingCriterionProperty', children };
}

const GROUP_TYPES = new Set(['REQUIREMENT_GROUP', 'QUESTION_GROUP']);
const SUBGROUP_TYPES = new Set(['REQUIREMENT_SUBGROUP', 'QUESTION_SUBGROUP']);
const PROPERTY_TYPES = new Set(['QUESTION', 'REQUIREMENT', 'CAPTION']);

/** A property group -> Tendering / Subsidiary TenderingCriterionPropertyGroup. */
function groupNode(comp, ctx, subsidiary) {
  const element = subsidiary
    ? 'cac:SubsidiaryTenderingCriterionPropertyGroup'
    : 'cac:TenderingCriterionPropertyGroup';
  const children = [
    { element: 'cbc:ID', const: comp.requestpath, attributes: { ...A_CRITERION_ID } },
    { element: 'cbc:PropertyGroupTypeCode', const: comp.code ?? 'ON*', attributes: { ...A_GROUP_TYPE } }
  ];
  for (const child of comp.components ?? []) children.push(...componentNodes(child, ctx));
  return { element, children };
}

/** Map one criterion component to zero or more structure nodes. `ctx` carries
 * the field map and the precomputed lot instance-path (see buildCriterionStructure). */
function componentNodes(comp, ctx) {
  const t = comp.type;

  // Lot reference: keyed by PPLR* tag (type has been both LOT_REFERENCE and
  // CRITERION across EAtoJSON versions). Repeats per buyer lot id, using the
  // same instance array as the RG1/RQ1 LOT_IDENTIFIER requirement.
  if (/^PPLR\d*$/.test(comp.tag ?? '')) {
    if (!ctx.lotPath) return [];
    return [{
      element: 'cac:ProcurementProjectLotReference',
      forEach: ctx.lotPath,
      children: [{ element: 'cbc:ID', fromItem: '.', attributes: { ...A_CRITERION_ID } }]
    }];
  }

  if (t === 'SUBCRITERION') {
    // National sub-criterion — placeholder content (deferred TODO).
    const children = [
      idNode(comp.requestpath),
      { element: 'cbc:Name', const: '[Name of the National Criterion]' },
      { element: 'cbc:Description', const: '[Description of the National Criterion ]' }
    ];
    for (const child of comp.components ?? []) children.push(...componentNodes(child, ctx));
    return [{ element: 'cac:SubTenderingCriterion', children }];
  }

  if (t === 'LEGISLATION') {
    // Legislation — placeholder content (deferred TODO).
    return [{
      element: 'cac:Legislation',
      children: [
        idNode(comp.requestpath),
        { element: 'cbc:Title', const: '[Legislation Title]' },
        { element: 'cbc:Description', const: '[Legislation Description]' },
        { element: 'cbc:JurisdictionLevel', const: 'EU' },
        { element: 'cbc:Article', const: '[Article, e.g. Article 2.I.a]' },
        { element: 'cbc:URI', const: 'http://eur-lex.europa.eu/' },
        { element: 'cac:Language', children: [
          { element: 'cbc:LocaleCode', const: 'ENG', attributes: { listID: 'http://publications.europa.eu/resource/authority/language' } }
        ] }
      ]
    }];
  }

  if (GROUP_TYPES.has(t)) return [groupNode(comp, ctx, false)];
  if (SUBGROUP_TYPES.has(t)) return [groupNode(comp, ctx, true)];
  if (PROPERTY_TYPES.has(t)) return [propertyNode(comp, ctx.fieldMap)];
  return [];
}

// NOTE ON SCOPE: this generator is intentionally ESPD-EDM-SPECIFIC. All the
// element names (cac:TenderingCriterion*, cbc:Expected*), scheme attributes
// (schemeID='criterion', the criterion/property-group/element/data-type list
// IDs), the DATATYPE_ELEMENT table (ESPD ValueDataTypeCode -> UBL element), the
// node-type vocabulary (REQUIREMENT_GROUP, QUESTION_SUBGROUP, SUBCRITERION, …)
// and the id-form rules encode ESPD knowledge. Only the tree-walk itself is
// generic. The generic, domain-neutral layer is the mapper engine (mapper.mjs),
// whose `structure` rule hardcodes no ESPD names. This file is the ESPD adapter
// that translates the ESPD-EDM criterion model into that generic rule format;
// reusing the engine for a non-ESPD document would mean writing a different
// generator, not changing mapper.mjs.

/** Find the instance path of the LOT_IDENTIFIER requirement, for lot references. */
function findLotPath(criterion, fieldMap) {
  if (!fieldMap) return undefined;
  let path;
  (function walk(comps) {
    for (const c of comps ?? []) {
      if (c.type === 'REQUIREMENT' && c.propertydatatype === 'LOT_IDENTIFIER') {
        const field = fieldMap.fields[tagPath(c.requestpath)];
        if (field) path = `${fieldMap.base}.${field}`;
      }
      walk(c.components);
    }
  })(criterion.components);
  return path;
}

/** Build the full cac:TenderingCriterion structure node for a criterion. */
function buildCriterionStructure(criterion, fieldMap) {
  const ctx = { fieldMap, lotPath: findLotPath(criterion, fieldMap) };
  const children = [
    { element: 'cbc:ID', const: criterion.uuid, attributes: { ...A_CRITERION_ID } },
    { element: 'cbc:CriterionTypeCode', const: criterion.code, attributes: { ...A_CRITERION_TYPE } },
    { element: 'cbc:Name', const: criterion.name ?? '' },
    { element: 'cbc:Description', const: criterion.description ?? '' }
  ];
  for (const comp of criterion.components ?? []) children.push(...componentNodes(comp, ctx, false));
  return { element: 'cac:TenderingCriterion', children };
}

// ---- criterion lookup --------------------------------------------------------

function findCriterion(edm, code) {
  for (const part of edm) {
    for (const section of part.sections ?? []) {
      const hit = (section.criteria ?? []).find(c => c.code === code);
      if (hit) return hit;
    }
  }
  return undefined;
}

// ---- main --------------------------------------------------------------------

const args = process.argv.slice(2);
const toStdout = args.includes('--stdout');
const code = args.includes('--code') ? args[args.indexOf('--code') + 1] : 'slc-stand-to-spec-avg';
const outFile = args.includes('--out') ? args[args.indexOf('--out') + 1] : 'part-IV.request.mapping.json';

const edm = JSON.parse(fs.readFileSync(EDM_PATH, 'utf8'));
const criterion = findCriterion(edm, code);
if (!criterion) { console.error(`Criterion not found in espd-edm.json: ${code}`); process.exit(1); }

const fieldMap = FIELD_MAPS[code];
const structure = buildCriterionStructure(criterion, fieldMap);

const mapping = {
  $comment: `GENERATED by build-request-mapping.mjs from espd-tools/EAtoJSON/outputs/espd-edm.json (criterion ${code}). Do not hand-edit the structure; edit the FIELD_MAPS in the generator and regenerate. The embedded 'structure' rule mirrors the UBL request declaration 1:1 — const nodes are fixed criterion metadata, from/forEach nodes carry the buyer's Expected* values (roundtrip). The Expected* element for each REQUIREMENT is derived from its ValueDataTypeCode (DATATYPE_ELEMENT); FIELD_MAPS only says where each value lives in the instance. Regenerate: node build-request-mapping.mjs`,
  target: {
    root: 'QualificationApplicationRequest',
    namespaces: {
      '': 'urn:oasis:names:specification:ubl:schema:xsd:QualificationApplicationRequest-2',
      cac: 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
      cbc: 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2'
    }
  },
  rules: [{ structure }]
};

const json = JSON.stringify(mapping, null, 2) + '\n';
if (toStdout) {
  process.stdout.write(json);
} else {
  fs.writeFileSync(path.resolve(__dirname, '..', 'xml-mapping', outFile), json, 'utf8');
  console.log(`Wrote ${outFile} — criterion ${code} (${criterion.name}).`);
}
