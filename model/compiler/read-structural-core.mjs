// Task 1.1 — lean structural-core reader.
//
// Reads ONLY the minimal structural core from espd-edm.json (design: "keep
// espd-edm.json as-is, consume it leanly"). It deliberately depends on NONE of
// the following, so that a future condensed espd-edm.json keeps working:
//   - encoding fields:   xmlElementName, xmlChildren
//   - derivable fields:  responsepath, contentpath
//   - restated codes:    the cbc:TypeCode / cbc:ValueDataTypeCode child values
//
// The returned core is a plain semantic tree:
//   criterion { id?, code, uuid, cardinality, children[] }
//   group     { nodeKind: 'group', condition, cardinality, children[] }
//   leaf      { nodeKind: 'requirement'|'question', valueType, cardinality,
//               requestpath, description }
//
// `requestpath` is kept as the correlation/identity key (criterion cbc:ID uses
// uuid; group/leaf cbc:ID uses requestpath). It is identity, not encoding.

/**
 * EA component `type` -> structural kind.
 * Groups are containers; requirement/question are value leaves. Everything else
 * (CRITERION child refs, SUBCRITERION, LEGISLATION, CAPTION, etc.) is classified
 * as 'structural' and carried through without a value binding.
 */
const GROUP_TYPES = new Set([
  'REQUIREMENT_GROUP', 'REQUIREMENT_SUBGROUP',
  'QUESTION_GROUP', 'QUESTION_SUBGROUP',
]);

function kindOfType(type) {
  if (type === 'REQUIREMENT') return 'requirement';
  if (type === 'QUESTION') return 'question';
  if (GROUP_TYPES.has(type)) return 'group';
  return 'structural';
}

/**
 * A component can be typed REQUIREMENT/QUESTION yet be a CAPTION — a label with
 * no response expected (cbc:TypeCode CAPTION, ValueDataTypeCode NONE). It carries
 * no value, so it is classified as 'structural' (no binding) like a type:CAPTION
 * node, rather than as a value leaf the overlay would demand be bound. The sole
 * occurrence in the model is C40 slc-abil-staff-tech-ctrl /RG1/RSG1/RSG1/QSG3/Q1.
 */
function isCaption(component) {
  return component.code === 'CAPTION' || component.propertydatatype === 'NONE';
}

/**
 * Map the raw EA group `code` (ON-star / ONTRUE / ONFALSE) to the structural
 * condition marker. The reader exposes the marker, not the encoded code.
 */
function conditionOfCode(code) {
  switch (code) {
    case 'ONTRUE': return 'true';
    case 'ONFALSE': return 'false';
    case 'ON*':
    case undefined:
    case null: return 'always';
    default: return 'always';
  }
}

/** Recursively read the minimal core for a component subtree. */
function readNode(component) {
  const kind = isCaption(component) ? 'structural' : kindOfType(component.type);
  const children = (component.components ?? []).map(readNode);

  if (kind === 'requirement' || kind === 'question') {
    return {
      nodeKind: kind,
      valueType: component.propertydatatype,
      cardinality: component.cardinality,
      requestpath: component.requestpath,
      description: component.description,
      ...(children.length ? { children } : {}),
    };
  }

  // group or other structural container
  const node = {
    nodeKind: kind === 'group' ? 'group' : 'structural',
    eaType: component.type,
    cardinality: component.cardinality,
    condition: conditionOfCode(component.code),
    requestpath: component.requestpath,
    children,
  };
  // A caption is a structural node (no value binding) but, unlike other
  // structural placeholders (SubCriterion/Legislation/LotReference), it carries
  // display text (its cbc:Description). Flag it and keep that text so the form
  // lens can surface it as a non-input note (task F1); the instance-data schema
  // and XML mappings still ignore it (no value, no binding).
  if (kind !== 'group' && isCaption(component)) {
    node.caption = true;
    node.description = component.description;
  }
  return node;
}

/**
 * Find a criterion by code anywhere in the parts/sections tree. When several
 * criteria share a code (the Part II/V 'OT' criteria all use code 'OT'), an
 * optional `tag` (e.g. 'OT65') disambiguates. Without a tag, the first match by
 * code is returned (the normal case: a unique code).
 */
export function findCriterion(edm, code, tag) {
  for (const part of edm) {
    for (const section of part.sections ?? []) {
      const found = (section.criteria ?? []).find(c =>
        c.type === 'CRITERION' && c.code === code && (tag === undefined || c.tag === tag));
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Read the minimal structural core of one criterion from a parsed espd-edm.json.
 * @param {Array} edm parsed espd-edm.json (array of parts)
 * @param {string} code criterion code, e.g. 'slc-stand-to-spec-avg'
 * @param {string} [tag] EA tag to disambiguate shared codes (e.g. 'OT65')
 * @returns the structural-core criterion tree
 */
export function readStructuralCore(edm, code, tag) {
  const criterion = findCriterion(edm, code, tag);
  if (!criterion) {
    throw new Error(`Criterion not found in espd-edm.json: ${code}${tag ? ` (tag ${tag})` : ''}`);
  }

  return {
    code: criterion.code,
    uuid: criterion.uuid,
    cardinality: criterion.cardinality,
    children: (criterion.components ?? []).map(readNode),
  };
}

/** Collect all value leaves (requirement/question) of a core tree. */
export function leavesOf(coreNode, acc = []) {
  for (const child of coreNode.children ?? []) {
    if (child.nodeKind === 'requirement' || child.nodeKind === 'question') acc.push(child);
    leavesOf(child, acc);
  }
  return acc;
}
