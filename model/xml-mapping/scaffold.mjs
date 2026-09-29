// EXPERIMENTAL — request-side criterion DECLARATION scaffold generator.
//
// The response mapping (part-*.response.mapping.json) emits only the properties
// the EO answered. The REQUEST document is different: the buyer DECLARES the
// whole criterion — the criterion head, its lot references, national
// sub-criteria, legislation, and the full recursive property-group tree of
// questions and requirements. That tree is fixed criterion metadata (owned by
// e-Certis), NOT instance data, so it is not something the instance→XML mapper
// produces. This generator projects it from the lean `criteria-scaffold.json`
// (itself distilled from the authoritative espd-edm.json) into UBL XML.
//
// It is EXPORT-ONLY: a request declaration is regenerated from the criterion
// definition, never parsed back into instance data (the criterion definition is
// fixed; only the buyer's Expected* values are instance data, and those are
// handled by part-*.request.mapping.json).
//
// Scope: probe for C31 (slc-stand-to-spec-avg). The node→element rules are
// generic (driven by node `type`), so other criteria should work, but only C31
// is verified (see scaffold-part-IV.test.mjs). Legislation and national
// sub-criterion CONTENT are emitted as the placeholders carried upstream
// (deferred TODOs — see docs/model-xml-mapping.md).
//
// Usage:
//   node scaffold.mjs slc-stand-to-spec-avg                 # print the request declaration XML
//   node scaffold.mjs slc-stand-to-spec-avg --instance ../instance-data/part-IV.example.json

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serialize } from './mapper.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const NS = {
  '': 'urn:oasis:names:specification:ubl:schema:xsd:QualificationApplicationRequest-2',
  cac: 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
  cbc: 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2'
};

// Scheme attributes reused across id/code elements (kept spec-local, matching
// the ESPD-criterion reference document).
const CRITERION_ID_ATTRS = { schemeID: 'criterion' };
const CRITERION_TYPE_ATTRS = { listID: 'http://publications.europa.eu/resource/authority/criterion' };
const GROUP_TYPE_ATTRS = { listID: 'property-group-type' };
const ELEMENT_TYPE_ATTRS = { listID: 'criterion-element-type' };
const DATA_TYPE_ATTRS = { listID: 'response-data-type' };

// ---- node tree helpers (same shape mapper.serialize expects) ----------------

function node(name, attributes = {}, children = [], text) {
  return { name, attributes, children, text };
}
function leaf(name, text, attributes = {}) {
  return node(name, attributes, [], text == null ? '' : String(text));
}

// ---- buyer requirement value injection --------------------------------------
//
// A REQUIREMENT leaf in the request carries the buyer's Expected / MinimumAmount
// value. The generator maps a property's ValueDataTypeCode + requestpath to the
// matching field in the instance `requirement` object. This table is C31-scoped
// for the probe (keyed by the trailing requirement tag); it is intentionally
// small and explicit rather than guessed from the datatype alone.

/** Resolve a dotted path against an object. */
function resolve(obj, dotted) {
  return dotted.split('.').reduce((a, k) => (a == null ? undefined : a[k]), obj);
}

/**
 * Emit the Expected / Minimum value element(s) for a REQUIREMENT property, given
 * its ValueDataTypeCode and the buyer `requirement` object. Returns an array of
 * child nodes (possibly empty when the buyer supplied no value). LOT_IDENTIFIER
 * is special: it repeats one property per lot id, handled by the caller.
 */
function requirementValueChildren(datatype, requirement, fieldMap) {
  const field = fieldMap;
  if (!field) return [];
  switch (datatype) {
    case 'QUANTITY_YEAR':
    case 'MINIMUM_QUANTITY_YEAR': {
      const v = resolve(requirement, field);
      return v == null ? [] : [leaf('cbc:ExpectedValueNumeric', v)];
    }
    case 'DESCRIPTION': {
      const v = resolve(requirement, field);
      return v == null || v === '' ? [] : [leaf('cbc:ExpectedDescription', v)];
    }
    case 'MINIMUM_AMOUNT': {
      const amt = resolve(requirement, field);
      if (amt == null) return [];
      return [leaf('cbc:MinimumAmount', amt.value, { currencyID: amt.currency })];
    }
    default:
      return [];
  }
}

// Per-criterion binding of REQUIREMENT requestpaths -> instance `requirement`
// fields. C31 only for the probe.
const REQUIREMENT_BINDINGS = {
  'slc-stand-to-spec-avg': {
    lotIdentifierPath: 'C31_slc-stand-to-spec-avg/RG1/RQ1',
    lotIdentifiersField: 'lotIdentifiers',
    fields: {
      'C31_slc-stand-to-spec-avg/RG1/RSG1/RQ1': 'numberOfYears',
      'C31_slc-stand-to-spec-avg/RG1/RSG1/RQ2': 'businessDomain',
      'C31_slc-stand-to-spec-avg/RG1/RSG1/RQ3': 'minimumAmount'
    }
  }
};

// ---- component tree -> element tree -----------------------------------------

function idLeaf(requestpath) {
  return leaf('cbc:ID', requestpath, { ...CRITERION_ID_ATTRS });
}

/**
 * The property `cbc:ID` form the request declaration uses. Empirically (from the
 * reference ESPD-criterion.xml): a QUESTION uses its bare `requestpath`, while a
 * REQUIREMENT appends the response-content suffix `/R1/R1`. CAPTION follows the
 * QUESTION form. (The scaffold's own `responsepath` is `…/R1` — a single R1 — so
 * we derive the id here rather than reuse responsepath.)
 */
function propertyId(comp) {
  return comp.type === 'REQUIREMENT' ? `${comp.requestpath}/R1/R1` : comp.requestpath;
}

/** A QUESTION / REQUIREMENT / CAPTION property leaf. */
function propertyNode(comp, ctx) {
  const children = [
    idLeaf(propertyId(comp)),
    leaf('cbc:Name', ''),
    leaf('cbc:Description', comp.description ?? ''),
    leaf('cbc:TypeCode', comp.type, { ...ELEMENT_TYPE_ATTRS }),
    leaf('cbc:ValueDataTypeCode', comp.propertydatatype ?? 'NONE', { ...DATA_TYPE_ATTRS })
  ];
  // Inject the buyer's Expected* value for a REQUIREMENT with a bound field.
  if (comp.type === 'REQUIREMENT' && ctx.requirement && ctx.binding) {
    const field = ctx.binding.fields[comp.requestpath];
    children.push(...requirementValueChildren(comp.propertydatatype, ctx.requirement, field));
  }
  return node('cac:TenderingCriterionProperty', {}, children);
}

/** A property group (top-level) or subsidiary group (nested). */
function groupNode(comp, ctx, subsidiary) {
  const name = subsidiary ? 'cac:SubsidiaryTenderingCriterionPropertyGroup' : 'cac:TenderingCriterionPropertyGroup';
  const children = [
    idLeaf(comp.requestpath),
    leaf('cbc:PropertyGroupTypeCode', comp.code ?? 'ON*', { ...GROUP_TYPE_ATTRS })
  ];
  for (const child of comp.components ?? []) {
    children.push(...componentNodes(child, ctx, /* insideGroup */ true));
  }
  return node(name, {}, children);
}

const GROUP_TYPES = new Set(['REQUIREMENT_GROUP', 'QUESTION_GROUP']);
const SUBGROUP_TYPES = new Set(['REQUIREMENT_SUBGROUP', 'QUESTION_SUBGROUP']);
const PROPERTY_TYPES = new Set(['QUESTION', 'REQUIREMENT', 'CAPTION']);

/**
 * Map one scaffold component to zero or more element nodes. `insideGroup`
 * distinguishes the top-level property group (TenderingCriterionPropertyGroup)
 * from nested ones (Subsidiary…). LOT_REFERENCE expands per buyer lot id.
 */
function componentNodes(comp, ctx, insideGroup) {
  const t = comp.type;

  // Lot reference: keyed by the PPLR* tag rather than `type`, because the
  // EAtoJSON export has labelled this node both LOT_REFERENCE and CRITERION
  // across versions — the tag is the stable signal. Emits one
  // cac:ProcurementProjectLotReference per buyer lot id (from instance data).
  if (/^PPLR\d*$/.test(comp.tag ?? '')) {
    const lots = ctx.requirement && ctx.binding
      ? (resolve(ctx.requirement, ctx.binding.lotIdentifiersField) ?? [])
      : [];
    return lots.map(id => node('cac:ProcurementProjectLotReference', {}, [idLeaf(id)]));
  }

  if (t === 'SUBCRITERION') {
    // National sub-criterion — placeholder content (deferred TODO). Emit the
    // shell with its (possibly empty) inner groups.
    const children = [
      idLeaf(comp.requestpath),
      leaf('cbc:Name', '[Name of the National Criterion]'),
      leaf('cbc:Description', '[Description of the National Criterion ]')
    ];
    for (const child of comp.components ?? []) {
      children.push(...componentNodes(child, ctx, true));
    }
    return [node('cac:SubTenderingCriterion', {}, children)];
  }

  if (t === 'LEGISLATION') {
    // Legislation — placeholder content (deferred TODO).
    return [node('cac:Legislation', {}, [
      idLeaf(comp.requestpath),
      leaf('cbc:Title', '[Legislation Title]'),
      leaf('cbc:Description', '[Legislation Description]'),
      leaf('cbc:JurisdictionLevel', 'EU'),
      leaf('cbc:Article', '[Article, e.g. Article 2.I.a]'),
      leaf('cbc:URI', 'http://eur-lex.europa.eu/'),
      node('cac:Language', {}, [
        leaf('cbc:LocaleCode', 'ENG', { listID: 'http://publications.europa.eu/resource/authority/language' })
      ])
    ])];
  }

  if (GROUP_TYPES.has(t)) return [groupNode(comp, ctx, false)];
  if (SUBGROUP_TYPES.has(t)) return [groupNode(comp, ctx, true)];
  if (PROPERTY_TYPES.has(t)) return [propertyNode(comp, ctx)];

  // Unknown node type — skip (keeps the generator forward-compatible).
  return [];
}

/** Build the full cac:TenderingCriterion node for a criterion definition. */
export function buildCriterionScaffold(criterion, requirement) {
  const binding = REQUIREMENT_BINDINGS[criterion.code];
  const ctx = { requirement, binding };

  const children = [
    leaf('cbc:ID', criterion.uuid, { ...CRITERION_ID_ATTRS }),
    leaf('cbc:CriterionTypeCode', criterion.code, { ...CRITERION_TYPE_ATTRS }),
    leaf('cbc:Name', criterion.name ?? ''),
    leaf('cbc:Description', criterion.description ?? '')
  ];
  for (const comp of criterion.components ?? []) {
    children.push(...componentNodes(comp, ctx, false));
  }
  return node('cac:TenderingCriterion', {}, children);
}

// ---- lookup + top-level ------------------------------------------------------

/** Find a criterion by code in the lean scaffold model. */
export function findCriterion(scaffold, code) {
  for (const part of scaffold.parts ?? []) {
    for (const section of part.sections ?? []) {
      const hit = (section.criteria ?? []).find(c => c.code === code);
      if (hit) return hit;
    }
  }
  return undefined;
}

/** Load the lean scaffold model. */
export function loadScaffold() {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'criteria-scaffold.json'), 'utf8'));
}

/**
 * Produce a full QualificationApplicationRequest containing just this one
 * criterion declaration, as a standalone XML string. `requirement` is the
 * buyer's requirement object for the criterion (may be undefined).
 */
export function generateRequestScaffold(code, requirement) {
  const scaffold = loadScaffold();
  const criterion = findCriterion(scaffold, code);
  if (!criterion) throw new Error(`Criterion not found in scaffold: ${code}`);

  const root = {
    name: 'QualificationApplicationRequest',
    attributes: Object.fromEntries(
      Object.entries(NS).map(([p, uri]) => [p === '' ? 'xmlns' : `xmlns:${p}`, uri])
    ),
    children: [buildCriterionScaffold(criterion, requirement)],
    text: undefined
  };
  return '<?xml version="1.0" encoding="UTF-8"?>\n' + serialize(root);
}

// ---- CLI ---------------------------------------------------------------------

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const code = process.argv[2] || 'slc-stand-to-spec-avg';
  const instIdx = process.argv.indexOf('--instance');
  let requirement;
  if (instIdx !== -1 && process.argv[instIdx + 1]) {
    const inst = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), process.argv[instIdx + 1]), 'utf8'));
    requirement = inst?.partIV?.selectionCriteria?.[code]?.requirement;
  }
  console.log(generateRequestScaffold(code, requirement));
}
