// Task 3.1 — request-mapping generator (Option D output).
//
// Walks the compiled criterion tree and emits the explicit mapper.mjs
// `structure`-rule spec for the REQUEST document. Scaffold/metadata children come
// from the encoding profile; the buyer value element for each REQUIREMENT leaf
// comes from the value-type registry `requestXml`. QUESTION leaves carry no
// request value (declaration only).
//
// Attribute shorthand: this generator emits the same shorthand the hand-authored
// mapping and mapper.mjs use (bare codelist key, e.g. "listID":"response-data-type";
// value attributes as { from: <path> }). Expanding shorthand into the full
// Schematron attribute set is a separate serialization concern (task 3.4).

import { leafInstancePath, arrayContainerPrefix } from './encoding-profile.mjs';
import { leavesOf } from './read-structural-core.mjs';

const REQUEST_TARGET = {
  root: 'QualificationApplicationRequest',
  namespaces: {
    '': 'urn:oasis:names:specification:ubl:schema:xsd:QualificationApplicationRequest-2',
    cac: 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
    cbc: 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
  },
};

const CONDITION_CODE = { always: 'ON*', true: 'ONTRUE', false: 'ONFALSE' };

/** cbc:ID node bound to a const path-like id with schemeID shorthand. */
function idNode(constValue) {
  return { element: 'cbc:ID', const: constValue, attributes: { schemeID: 'criterion' } };
}

/** The five fixed property metadata children + optional value child. */
function propertyMetadata(leaf) {
  const typeCode = leaf.nodeKind === 'requirement' ? 'REQUIREMENT' : 'QUESTION';
  return [
    idNode(leaf.requestpath),
    { element: 'cbc:Name', const: '' },
    { element: 'cbc:Description', const: leaf.description ?? '' },
    { element: 'cbc:TypeCode', const: typeCode, attributes: { listID: 'criterion-element-type' } },
    { element: 'cbc:ValueDataTypeCode', const: leaf.valueType, attributes: { listID: 'response-data-type' } },
  ];
}

/** Build the request value child for a REQUIREMENT leaf from the registry. */
function requestValueChild(criterion, leaf, registry) {
  const binding = registry.valueTypes[leaf.valueType]?.requestXml;
  if (!binding) return undefined;
  const base = leafInstancePath(criterion, leaf).join('.');

  if (binding.kind === 'repeatedProperty') {
    // handled at the property level via forEach; see leafPropertyNode
    return undefined;
  }
  if (binding.kind === 'amount') {
    const valuePath = `${base}.${binding.text.instancePath.join('.')}`;
    const node = { element: binding.element, from: valuePath, type: 'number' };
    if (binding.attributes) {
      node.attributes = {};
      for (const [attr, spec] of Object.entries(binding.attributes)) {
        if (spec.instancePath) node.attributes[attr] = { from: `${base}.${spec.instancePath.join('.')}` };
        else if (spec.const !== undefined) node.attributes[attr] = spec.const;
      }
    }
    return node;
  }
  if (binding.kind === 'scalar') {
    // Numeric vs string follows the registry instanceShape, not a per-code list.
    const shape = registry.valueTypes[leaf.valueType]?.instanceShape;
    const type = (shape?.type === 'integer' || shape?.type === 'number') ? 'number' : 'string';
    const node = { element: binding.element, from: base, type };
    // A code-valued requirement (e.g. CODE_BOOLEAN) carries its codelist
    // shorthand, expanded to the full attribute set by expandCodelistAttributes.
    if (binding.codelist) node.attributes = { listID: binding.codelist };
    return node;
  }
  return undefined;
}

/**
 * Build the cac:TenderingCriterionProperty node for a leaf. For a repeated
 * LOT_IDENTIFIER requirement the property itself repeats via forEach with the
 * value as fromItem; otherwise it is a single property with an optional value.
 */
function leafPropertyNode(criterion, leaf, registry) {
  const binding = leaf.nodeKind === 'requirement' ? registry.valueTypes[leaf.valueType]?.requestXml : undefined;

  if (binding?.kind === 'repeatedProperty') {
    const base = leafInstancePath(criterion, leaf).join('.');
    const itemNode = { element: binding.element, fromItem: '.' };
    if (binding.attributes) {
      itemNode.attributes = {};
      for (const [attr, spec] of Object.entries(binding.attributes)) {
        if (spec.const !== undefined) itemNode.attributes[attr] = spec.const;
      }
    }
    return {
      element: 'cac:TenderingCriterionProperty',
      forEach: base,
      children: [...propertyMetadata(leaf), itemNode],
    };
  }

  const children = [...propertyMetadata(leaf)];
  const value = leaf.nodeKind === 'requirement' ? requestValueChild(criterion, leaf, registry) : undefined;
  if (value) children.push(value);
  return { element: 'cac:TenderingCriterionProperty', children };
}

/** Build a group/subgroup node and recurse. */
function groupNode(criterion, node, registry, nested) {
  const element = nested ? 'cac:SubsidiaryTenderingCriterionPropertyGroup' : 'cac:TenderingCriterionPropertyGroup';
  const children = [
    idNode(node.requestpath),
    { element: 'cbc:PropertyGroupTypeCode', const: CONDITION_CODE[node.condition] ?? 'ON*', attributes: { listID: 'property-group-type' } },
    ...childNodes(criterion, node, registry, true),
  ];
  return { element, children };
}

/** Recurse into a node's children, emitting group/leaf nodes (skips empties). */
function childNodes(criterion, node, registry, insideGroup) {
  const out = [];
  for (const child of node.children ?? []) {
    if (child.nodeKind === 'group') {
      out.push(groupNode(criterion, child, registry, insideGroup));
    } else if (child.nodeKind === 'requirement' || child.nodeKind === 'question') {
      out.push(leafPropertyNode(criterion, child, registry));
    }
    // 'structural' nodes (SubCriterion/Legislation placeholders) are omitted
    // from the generated request structure for now (declaration placeholders).
  }
  return out;
}

/**
 * Generate the full request mapping spec for a compiled criterion.
 */
export function generateRequestMapping(criterion, registry) {
  // A repeatable group is DECLARED once in the request (it is the buyer's
  // template, not a per-answer structure), so the request scaffold is unchanged
  // by repeatability. The one case we cannot yet encode is a REQUIREMENT leaf
  // (a buyer VALUE) INSIDE a repeatable group, since its value `from` would need
  // to iterate the array; fail fast on that narrow case only.
  for (const leaf of leavesOf(criterion)) {
    if (leaf.nodeKind === 'requirement'
      && registry.valueTypes[leaf.valueType]?.requestXml
      && arrayContainerPrefix(criterion, leaf)) {
      throw new Error(
        `Criterion '${criterion.code}': REQUIREMENT leaf '${leaf.id}' carries a buyer value inside a ` +
        `repeatable group, which the request mapping generator does not yet support (task 7.0b). ` +
        `Response answers inside repeatable groups ARE supported.`);
    }
  }

  const criterionChildren = [
    idNode(criterion.uuid), // criterion cbc:ID is the uuid (overridden below)
    { element: 'cbc:CriterionTypeCode', const: criterion.code, attributes: { listID: 'http://publications.europa.eu/resource/authority/criterion' } },
    { element: 'cbc:Name', const: criterion.name ?? '' },
    { element: 'cbc:Description', const: criterion.description ?? '' },
    ...childNodes(criterion, criterion, registry, false),
  ];
  // criterion cbc:ID uses the uuid, not a requestpath
  criterionChildren[0] = { element: 'cbc:ID', const: criterion.uuid, attributes: { schemeID: 'criterion' } };

  return {
    $comment: `GENERATED by model/compiler/generate-request-mapping.mjs for criterion ${criterion.code}. Structure mirrors the UBL request declaration; const = fixed metadata, from/forEach = buyer Expected* values. Do not hand-edit; regenerate from the compiler.`,
    target: REQUEST_TARGET,
    rules: [{ structure: { element: 'cac:TenderingCriterion', children: criterionChildren } }],
  };
}
