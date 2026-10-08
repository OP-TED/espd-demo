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

import { leafInstancePath } from './encoding-profile.mjs';

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

/**
 * The instance path a leaf's request value resolves against. Normally the leaf's
 * absolute instance path; but when the leaf sits inside a repeatable requirement
 * group, the value lives inside a `forEach` structure node that iterates the
 * array, so the path is RELATIVE to the array item (the binding-path segments
 * after the innermost array container). `itemPrefixLen` is the binding-path
 * length consumed by the enclosing array container(s), 0 when not in an array.
 */
function leafValueBase(criterion, leaf, itemPrefixLen) {
  if (!itemPrefixLen) return leafInstancePath(criterion, leaf).join('.');
  return leaf.instanceBinding.path.slice(itemPrefixLen).join('.');
}

/** Build the request value child for a REQUIREMENT leaf from the registry. */
function requestValueChild(criterion, leaf, registry, itemPrefixLen = 0) {
  const binding = registry.valueTypes[leaf.valueType]?.requestXml;
  if (!binding) return undefined;
  const base = leafValueBase(criterion, leaf, itemPrefixLen);

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
    // Codelist shorthand (expanded by expandCodelistAttributes). A fixed codelist
    // comes from the binding (CODE_BOOLEAN); a per-leaf codelist (CODE, whose list
    // varies by use) comes from the leaf via `codelistFromLeaf`.
    const codelist = binding.codelistFromLeaf ? leaf.codelist : binding.codelist;
    if (binding.codelistFromLeaf && !codelist) {
      throw new Error(
        `CODE leaf '${leaf.id}' needs a per-leaf 'codelist' in the sidecar ` +
        `(its list varies by use); none was declared.`);
    }
    if (codelist) node.attributes = { listID: codelist };
    return node;
  }
  return undefined;
}

/**
 * Build the cac:TenderingCriterionProperty node for a leaf. For a repeated
 * LOT_IDENTIFIER requirement the property itself repeats via forEach with the
 * value as fromItem; otherwise it is a single property with an optional value.
 */
function leafPropertyNode(criterion, leaf, registry, itemPrefixLen = 0) {
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
  const value = leaf.nodeKind === 'requirement' ? requestValueChild(criterion, leaf, registry, itemPrefixLen) : undefined;
  if (value) children.push(value);
  return { element: 'cac:TenderingCriterionProperty', children };
}

/**
 * Innermost array-container prefix length that applies to the subtree rooted at
 * a group — i.e. how many binding-path segments any leaf under it shares as an
 * array container. Returns 0 when the group is not a repeatable container.
 * The container matches a group by its own instanceBinding (set by the overlay).
 */
function groupContainerPrefix(group) {
  return group.instanceBinding?.repeatable ? group.instanceBinding.path.length : 0;
}

/**
 * Build a group/subgroup node and recurse. `itemPrefixLen` is the binding-path
 * length already consumed by enclosing repeatable containers (so descendant leaf
 * values resolve relative to the current array item). A repeatable group emits a
 * `forEach` over its array and raises itemPrefixLen for its subtree.
 */
function groupNode(criterion, node, registry, nested, itemPrefixLen = 0) {
  const element = nested ? 'cac:SubsidiaryTenderingCriterionPropertyGroup' : 'cac:TenderingCriterionPropertyGroup';
  const myPrefix = groupContainerPrefix(node);
  const childPrefix = myPrefix || itemPrefixLen;

  const spec = {
    element,
    children: [
      idNode(node.requestpath),
      { element: 'cbc:PropertyGroupTypeCode', const: CONDITION_CODE[node.condition] ?? 'ON*', attributes: { listID: 'property-group-type' } },
      ...childNodes(criterion, node, registry, true, childPrefix),
    ],
  };

  if (myPrefix) {
    // Repeatable requirement group: the whole subgroup repeats once per array
    // item. For the OUTERMOST array (itemPrefixLen 0) the `forEach` is the
    // array's absolute instance path. For a NESTED array (we are already inside
    // an outer item) the mapper resolves this node's `forEach` against the outer
    // ITEM, so the path must be RELATIVE to it — the binding-path segments after
    // the enclosing prefix (task 7.0c, e.g. periods[].ratios -> `ratios`).
    spec.forEach = itemPrefixLen
      ? node.instanceBinding.path.slice(itemPrefixLen).join('.')
      : [
          ...criterion.instanceModel.containerPath,
          criterion[criterion.instanceModel.key.source],
          node.instanceBinding.side,
          ...node.instanceBinding.path,
        ].join('.');
  }
  return spec;
}

/** Recurse into a node's children, emitting group/leaf nodes (skips empties). */
function childNodes(criterion, node, registry, insideGroup, itemPrefixLen = 0) {
  const out = [];
  for (const child of node.children ?? []) {
    if (child.nodeKind === 'group') {
      out.push(groupNode(criterion, child, registry, insideGroup, itemPrefixLen));
    } else if (child.nodeKind === 'requirement' || child.nodeKind === 'question') {
      out.push(leafPropertyNode(criterion, child, registry, itemPrefixLen));
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
  // Nested repeatable REQUIREMENT groups (C34 periods[].ratios[]) are supported:
  // groupNode emits item-relative `forEach` paths at each nesting level (7.0c).
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
