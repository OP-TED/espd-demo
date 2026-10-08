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
import { leafInstancePath, arrayContainerPrefix, leafDataPath } from './encoding-profile.mjs';

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

/**
 * Build one `cac:TenderingCriterionResponse` entry for a QUESTION leaf.
 *
 * `base` is the instance path the entry's `from` resolves against. For a flat
 * leaf it is the leaf's absolute instance path. For a leaf inside a repeatable
 * group it is the leaf's path RELATIVE to the array item (the segments after the
 * array container), because the entry lives inside a `forEach` records rule that
 * iterates the array — the engine resolves `forEach` item fields against each
 * item (task 7.0b).
 */
function responseEntry(criterion, leaf, registry, baseOverride) {
  const binding = registry.valueTypes[leaf.valueType]?.responseXml;
  if (!binding) return undefined; // not an answerable response leaf
  const base = baseOverride ?? leafInstancePath(criterion, leaf).join('.');
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
  // The document-level cac:Evidence set must collect evidence objects even when
  // the evidence array is nested inside a repeatable group. leafDataPath inserts
  // `[]` at each enclosing array-container segment; the EVIDENCE leaf itself is
  // array-shaped, so its own final segment is also flattened. The mapper then
  // flattens across every `[]` level (task 7.0c). For a flat leaf with no
  // enclosing container this reduces to `<path>[]`, still a correct single-level
  // flatten of the evidence array.
  const inArray = arrayContainerPrefix(criterion, leaf) > 0;
  const base = inArray ? `${leafDataPath(criterion, leaf)}[]` : leafInstancePath(criterion, leaf).join('.');
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

  // Partition answerable leaves into FLAT (not inside a repeatable group) and
  // per-container groups (inside a repeatable group). Flat leaves go in the main
  // records rule; each container becomes a `forEach` records rule whose entries
  // resolve against each array item (task 7.0b).
  const containers = criterion.arrayContainers ?? [];
  const containerKey = leaf => {
    const prefix = arrayContainerPrefix(criterion, leaf);
    if (!prefix) return null;
    return leaf.instanceBinding.side + '|' + leaf.instanceBinding.path.slice(0, prefix).join('.');
  };

  const flatEntries = [];
  const byContainer = new Map(); // key -> { container, entries }
  const evidenceRules = [];

  for (const leaf of questionLeaves) {
    const ev = evidenceRecordRule(criterion, leaf, registry);
    // Evidence inside a repeatable group is now supported (7.0c): the document-
    // level cac:Evidence set uses a FLATTENED forEach (`container[].evidence`),
    // and the per-item references entry resolves item-relative.
    if (ev) evidenceRules.push(ev);

    const ckey = containerKey(leaf);
    if (!ckey) {
      const entry = responseEntry(criterion, leaf, registry);
      if (entry) flatEntries.push(entry);
      continue;
    }
    // Item-relative base: segments of the binding path AFTER the array container.
    const prefix = arrayContainerPrefix(criterion, leaf);
    const relBase = leaf.instanceBinding.path.slice(prefix).join('.');
    const entry = responseEntry(criterion, leaf, registry, relBase);
    if (!entry) continue;
    if (!byContainer.has(ckey)) {
      const [side, dotted] = ckey.split('|');
      const containerPath = [...criterion.instanceModel.containerPath, criterion[criterion.instanceModel.key.source], side, ...dotted.split('.')].join('.');
      byContainer.set(ckey, { forEach: containerPath, entries: [] });
    }
    byContainer.get(ckey).entries.push(entry);
  }

  const repeatableRecordRules = [...byContainer.values()].map(({ forEach, entries }) => ({
    records: 'cac:TenderingCriterionResponse',
    key: { to: 'cac:ValidatedCriterionPropertyID/cbc:ID', attributes: { schemeID: 'criterion' } },
    forEach,
    entries,
  }));

  const rules = [
    { to: 'cac:TenderingCriterion/cbc:ID', const: criterion.uuid },
    { to: 'cac:TenderingCriterion/cbc:CriterionTypeCode', const: criterion.code, attributes: { listID: 'criterion' } },
    { to: 'cac:TenderingCriterion/cbc:Name', const: criterion.name ?? '' },
    {
      records: 'cac:TenderingCriterionResponse',
      key: { to: 'cac:ValidatedCriterionPropertyID/cbc:ID', attributes: { schemeID: 'criterion' } },
      entries: flatEntries,
    },
    ...repeatableRecordRules,
    ...evidenceRules,
  ];

  return {
    $comment: `GENERATED by model/compiler/generate-response-mapping.mjs for criterion ${criterion.code}. Economic-operator answers as cac:TenderingCriterionResponse entries (one per QUESTION leaf, keyed by responsepath …/R1); evidence cross-linked to export-only cac:Evidence records. Do not hand-edit; regenerate from the compiler.`,
    target: RESPONSE_TARGET,
    rules,
  };
}
