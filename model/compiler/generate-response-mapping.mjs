// Task 3.2 — response-mapping generator (Option D output).
//
// Emits the explicit mapper.mjs spec for the RESPONSE document — the
// economic-operator side. Unlike the request (a nested declaration tree), the
// response is:
//   - a few const criterion-metadata rules;
//   - ONE `records: cac:TenderingCriterionResponse` rule whose `entries[]` has
//     one entry per QUESTION leaf (keyed by the leaf's responsepath = .../R1),
//     the entry body chosen by the value type's responseXml.kind
//     (value | object | references);
//   - one export-only `records: cac:Evidence` rule per EVIDENCE_IDENTIFIER leaf
//     (importVia: references), reconstructed on import by the references.resolve.
//
// responsepath is derived (requestpath + "/R1"), consistent with the EA export.

import { leavesOf } from './read-structural-core.mjs';
import { leafInstancePath } from './encoding-profile.mjs';

const RESPONSE_TARGET = {
  root: 'QualificationApplicationResponse',
  namespaces: {
    '': 'urn:oasis:names:specification:ubl:schema:xsd:QualificationApplicationResponse-2',
    cac: 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
    cbc: 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
  },
};

// JSON "type" hint for scalar response values, by value type.
const SCALAR_TYPE = {
  INDICATOR: 'boolean',
  DESCRIPTION: 'string',
  DATE: 'string',
  ECONOMIC_OPERATOR_IDENTIFIER: 'string',
  URL: 'string',
  CODE: 'string',
  CODE_COUNTRY: 'string',
  QUANTITY_YEAR: 'number',
  QUANTITY_INTEGER: 'number',
  PERCENTAGE: 'number',
};

const EVIDENCE_RESOLVE_FIELDS = [
  { from: 'description', to: 'cbc:Description' },
  { from: 'identifier', to: 'cac:DocumentReference/cbc:ID' },
  { from: 'url', to: 'cac:DocumentReference/cac:Attachment/cac:ExternalReference/cbc:URI' },
];

/** Derived response path for a leaf (…/R1). */
function responsePath(leaf) {
  return `${leaf.requestpath}/R1`;
}

/** Build one `cac:TenderingCriterionResponse` entry for a QUESTION leaf. */
function responseEntry(criterion, leaf, registry) {
  const binding = registry.valueTypes[leaf.valueType]?.responseXml;
  if (!binding) return undefined; // not an answerable response leaf
  const base = leafInstancePath(criterion, leaf).join('.');
  const key = responsePath(leaf);

  if (binding.kind === 'scalar') {
    const value = { from: base, to: binding.element, type: SCALAR_TYPE[leaf.valueType] ?? 'string' };
    // A code-valued answer carries its codelist attributes (shorthand listID,
    // expanded to the full dated set by expandCodelistAttributes). The codelist
    // may differ from response-data-type and carry its own version — the point
    // of the C07 CODE_COUNTRY probe.
    if (binding.codelist) value.attributes = { listID: binding.codelist };
    // Fixed value-bearing attributes, e.g. the quantity unitCode (YEAR/INTEGER)
    // on cbc:ResponseQuantity.
    if (binding.attributes) {
      value.attributes = value.attributes ?? {};
      for (const [attr, spec] of Object.entries(binding.attributes)) {
        if (spec.const !== undefined) value.attributes[attr] = spec.const;
        else if (spec.instancePath) value.attributes[attr] = { from: `${base}.${spec.instancePath.join('.')}` };
      }
    }
    return { key, value };
  }
  if (binding.kind === 'amount') {
    const valuePath = `${base}.${binding.text.instancePath.join('.')}`;
    const value = { from: valuePath, to: binding.element, type: 'number' };
    if (binding.attributes) {
      value.attributes = {};
      for (const [attr, spec] of Object.entries(binding.attributes)) {
        if (spec.instancePath) value.attributes[attr] = { from: `${base}.${spec.instancePath.join('.')}` };
        else if (spec.const !== undefined) value.attributes[attr] = spec.const;
      }
    }
    return { key, value };
  }
  if (binding.kind === 'object') {
    const fields = Object.entries(binding.fields).map(([from, to]) => ({ from, to }));
    return { key, object: { from: base, to: binding.element, fields } };
  }
  if (binding.kind === 'reference') {
    return {
      key,
      references: {
        forEach: base,
        key: binding.key[0],
        to: binding.element,
        resolve: {
          records: 'cac:Evidence',
          key: { to: 'cbc:ID', from: binding.key[0] },
          fields: EVIDENCE_RESOLVE_FIELDS,
        },
      },
    };
  }
  return undefined;
}

/** Build the export-only cac:Evidence record rule for an evidence leaf. */
function evidenceRecordRule(criterion, leaf, registry) {
  const binding = registry.valueTypes[leaf.valueType]?.responseXml;
  if (binding?.kind !== 'reference') return undefined;
  const base = leafInstancePath(criterion, leaf).join('.');
  return {
    records: 'cac:Evidence',
    importVia: 'references',
    key: { to: 'cbc:ID', from: binding.key[0] },
    forEach: base,
    item: { fields: EVIDENCE_RESOLVE_FIELDS },
  };
}

/**
 * Generate the full response mapping spec for a compiled criterion.
 */
export function generateResponseMapping(criterion, registry) {
  const leaves = leavesOf(criterion);
  const questionLeaves = leaves.filter(l => l.nodeKind === 'question');

  const entries = [];
  const evidenceRules = [];
  for (const leaf of questionLeaves) {
    const entry = responseEntry(criterion, leaf, registry);
    if (entry) entries.push(entry);
    const ev = evidenceRecordRule(criterion, leaf, registry);
    if (ev) evidenceRules.push(ev);
  }

  const rules = [
    { to: 'cac:TenderingCriterion/cbc:ID', const: criterion.uuid },
    { to: 'cac:TenderingCriterion/cbc:CriterionTypeCode', const: criterion.code, attributes: { listID: 'criterion' } },
    { to: 'cac:TenderingCriterion/cbc:Name', const: criterion.name ?? '' },
    {
      records: 'cac:TenderingCriterionResponse',
      key: { to: 'cac:ValidatedCriterionPropertyID/cbc:ID', attributes: { schemeID: 'criterion' } },
      entries,
    },
    ...evidenceRules,
  ];

  return {
    $comment: `GENERATED by model/compiler/generate-response-mapping.mjs for criterion ${criterion.code}. Economic-operator answers as cac:TenderingCriterionResponse entries (one per QUESTION leaf, keyed by responsepath …/R1); evidence cross-linked to export-only cac:Evidence records. Do not hand-edit; regenerate from the compiler.`,
    target: RESPONSE_TARGET,
    rules,
  };
}
