// Task 4.1 — instance-data JSON Schema generator.
//
// Builds the per-part JSON Schema from the compiled criterion by placing each
// value leaf's instanceShape (from the value-type registry) at its instance
// path, nested under the criterion's instanceModel container and the leaf side
// (requirement/response).
//
// This is the looser, STRUCTURE-DERIVED baseline (design R9): object nesting
// from binding paths, scalar/array/object shapes from the registry, and
// required/optional derived from cardinality. Finer constraints (minItems,
// anyOf, if/then/else, side-specific required nuances) are added from declared
// hints in task 4.2.
//
// Task 7.0: a repeatable group binds an array container; leaves inside it are
// placed under `{ type: array, items: {...} }` via insertShape's arrayAtDepth.

import { arrayContainerDepths } from './encoding-profile.mjs';
import { readCodelistCodes, codelistPath } from '../codelists/read-codelist.mjs';

/** Deep-clone a registry instanceShape (plain JSON). */
function cloneShape(shape) {
  return structuredClone(shape);
}

/**
 * Derive a JSON Schema `enum` from a shipped .gc codelist, in place, when a
 * shape opts in via `codeListFile`. The non-standard `codeListFile` marker is
 * removed from the emitted schema (the human-facing `codeList` name stays).
 * Only small, enumerable lists should opt in — a large list (e.g. 341 countries)
 * is better referenced by name than inlined.
 */
function deriveCodelistEnum(shape) {
  if (!shape || typeof shape !== 'object') return shape;
  // Recurse into object properties (object-shaped value types).
  if (shape.properties) {
    for (const key of Object.keys(shape.properties)) deriveCodelistEnum(shape.properties[key]);
  }
  if (shape.items) deriveCodelistEnum(shape.items);
  if (!shape.codeListFile) return shape;
  const codes = readCodelistCodes(codelistPath(shape.codeListFile));
  if (codes.length === 0) {
    throw new Error(`codeListFile '${shape.codeListFile}' yielded no codes`);
  }
  shape.enum = codes;
  delete shape.codeListFile;
  return shape;
}

/**
 * Collect value leaves with the context needed for structure-derived
 * required-ness: whether the leaf sits inside a CONDITIONAL branch (a group with
 * condition 'true'/'false'). Leaves inside a conditional branch are optional at
 * the baseline level — their presence depends on the gating answer, which only
 * finer hints (R9/task 4.2) can express precisely.
 */
function leavesWithContext(node, insideConditional = false, acc = []) {
  for (const child of node.children ?? []) {
    const childConditional = insideConditional ||
      (child.nodeKind === 'group' && (child.condition === 'true' || child.condition === 'false'));
    if (child.nodeKind === 'requirement' || child.nodeKind === 'question') {
      acc.push({ leaf: child, insideConditional });
    }
    leavesWithContext(child, childConditional, acc);
  }
  return acc;
}

/**
 * Insert a leaf shape at a nested object path, creating intermediate object
 * schemas. `required` segments are tracked per object level by cardinality.
 * @param {object} objectSchema a { type:'object', properties, required } node
 * @param {string[]} segs relative path segments under this object
 * @param {object} shape the leaf's instanceShape
 * @param {boolean} isRequired whether the leaf is required at its parent
 */
function insertShape(objectSchema, segs, shape, isRequired, arrayDepths = EMPTY_SET, depth = 0) {
  const [head, ...rest] = segs;
  objectSchema.properties ??= {};
  objectSchema.required ??= [];

  if (rest.length === 0) {
    objectSchema.properties[head] = cloneShape(shape);
    if (isRequired && !objectSchema.required.includes(head)) objectSchema.required.push(head);
    return;
  }

  // Task 7.0 — a segment that is an array container (its 1-based depth is in
  // arrayDepths) becomes an array of objects; its leaves are properties of the
  // item schema. NESTED repeatable groups (C34/C36) have several such depths.
  // A repeatable group's presence is instance-dependent, so the container is
  // NOT required.
  const isArrayContainer = arrayDepths.has(depth + 1);
  let child = objectSchema.properties[head];

  if (isArrayContainer) {
    if (!child || child.type !== 'array') {
      child = { type: 'array', items: { type: 'object', properties: {}, required: [], additionalProperties: false } };
      objectSchema.properties[head] = child;
    }
    insertShape(child.items, rest, shape, isRequired, arrayDepths, depth + 1);
    return;
  }

  if (!child || child.type !== 'object') {
    child = { type: 'object', properties: {}, required: [], additionalProperties: false };
    objectSchema.properties[head] = child;
  }
  // An intermediate container is required if any required leaf lives under it.
  if (isRequired && !objectSchema.required.includes(head)) objectSchema.required.push(head);
  insertShape(child, rest, shape, isRequired, arrayDepths, depth + 1);
}

const EMPTY_SET = new Set();

/** Cardinality -> required at parent (1 or 1..n => required; 0.. => optional). */
function isRequiredCardinality(card) {
  return typeof card === 'string' && /^1(\.\.|$)/.test(card);
}

/**
 * Task 4.3.1 — derive array bounds from EA cardinality. A `1..n` leaf whose
 * shape is an array must carry at least one item, so `minItems: 1` follows
 * mechanically from the model and needs no hand-authored hint.
 */
function arrayBoundsFromCardinality(card) {
  if (typeof card !== 'string') return null;
  const m = /^(\d+)\.\.(\d+|n)$/.exec(card);
  if (!m) return null;
  const bounds = {};
  const min = Number(m[1]);
  if (min > 0) bounds.minItems = min;
  if (m[2] !== 'n') bounds.maxItems = Number(m[2]);
  return Object.keys(bounds).length ? bounds : null;
}

/** Clean up empty `required: []` arrays recursively for tidy output. */
function pruneEmptyRequired(node) {
  if (node && typeof node === 'object') {
    if (Array.isArray(node.required) && node.required.length === 0) delete node.required;
    for (const v of Object.values(node)) pruneEmptyRequired(v);
  }
  return node;
}

/**
 * Task 4.3.2 — derive conditional (if/then/else) constraints from the `condition`
 * markers already present in espd-edm.json.
 *
 * A group with condition 'true'/'false' is gated by its nearest PRECEDING SIBLING
 * value leaf (the INDICATOR answer). The derived constraint is applied to the
 * object that is the common parent of the gate and the gated leaves:
 *   if   { <gateProp>: const true|false }
 *   then { required: [<innerProps>], <arrays>: minItems from cardinality }
 *   else { <arrays>: maxItems 0, and inner props not required }
 *
 * Only derives when the gate and the gated leaves share a parent object path, so
 * the test and the constrained properties are siblings in the instance (the case
 * for every C31/C07 conditional).
 */
function deriveConditionals(criterion) {
  const derived = { requirement: [], response: [] };

  function parentPath(segs) { return segs.slice(0, -1); }
  function leafName(segs) { return segs[segs.length - 1]; }
  function samePath(a, b) { return a.length === b.length && a.every((x, i) => x === b[i]); }

  function walk(node) {
    const kids = node.children ?? [];
    for (let i = 0; i < kids.length; i++) {
      const group = kids[i];
      if (group.nodeKind === 'group' && (group.condition === 'true' || group.condition === 'false')) {
        // nearest preceding sibling value leaf acts as the gate
        let gate = null;
        for (let j = i - 1; j >= 0; j--) {
          const k = kids[j];
          if (k.nodeKind === 'question' || k.nodeKind === 'requirement') { gate = k; break; }
        }
        const inner = (group.children ?? []).filter(
          x => x.nodeKind === 'question' || x.nodeKind === 'requirement');

        if (gate?.instanceBinding && inner.length) {
          const side = gate.instanceBinding.side;
          const gParent = parentPath(gate.instanceBinding.path);
          const gProp = leafName(gate.instanceBinding.path);

          // Only the inner leaves that live in the SAME parent object as the gate.
          const siblings = inner.filter(x =>
            x.instanceBinding.side === side &&
            samePath(parentPath(x.instanceBinding.path), gParent));

          if (siblings.length) {
            const thenClause = { required: [], properties: {} };
            const elseClause = { properties: {} };
            for (const s of siblings) {
              const name = leafName(s.instanceBinding.path);
              thenClause.required.push(name);
              const bounds = arrayBoundsFromCardinality(s.cardinality);
              if (bounds?.minItems) {
                thenClause.properties[name] = { minItems: bounds.minItems };
                elseClause.properties[name] = { maxItems: 0 };
              }
            }
            if (!Object.keys(thenClause.properties).length) delete thenClause.properties;

            const clause = {
              $derived: `from condition '${group.condition}' at ${group.requestpath}`,
              if: { properties: { [gProp]: { const: group.condition === 'true' } } },
              then: thenClause,
            };
            if (Object.keys(elseClause.properties).length) clause.else = elseClause;
            derived[side].push({ at: gParent.join('.'), clause });
          }
        }
      }
      walk(group);
    }
  }

  walk(criterion);
  return derived;
}

/** Strip $-annotation keys from a hint object. */
function cleanHint(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) if (!k.startsWith('$')) out[k] = v;
  return out;
}

/** Navigate to the object schema at a dotted `at` path within a side root. */
function objectAt(sideSchema, at) {
  if (!at) return sideSchema;
  let node = sideSchema;
  for (const seg of at.split('.')) {
    node = node?.properties?.[seg];
    if (!node) return undefined;
  }
  return node;
}

/**
 * Generate the criterion's instance-data schema fragment:
 *   { type:object, properties:{ requirement:{…}, response:{…} } }
 * Each side holds the shapes of its leaves at their binding paths.
 *
 * `hints` (optional, design R9) refine the structure-derived baseline:
 *   - value-type `instanceConstraints` (merged into each leaf shape of that type)
 *   - hints.leafConstraints[semanticId] (merged into that leaf's shape)
 *   - hints.conditionals[side][] (if/then/else applied at an `at` path)
 */
export function generateCriterionSchema(criterion, registry, hints = null) {
  const sides = {
    requirement: { type: 'object', properties: {}, required: [], additionalProperties: false },
    response: { type: 'object', properties: {}, required: [], additionalProperties: false },
  };

  const leafConstraints = hints?.leafConstraints ? cleanHint(hints.leafConstraints) : {};
  const optionalIds = new Set(hints?.optionalLeaves?.ids ?? []);

  for (const { leaf, insideConditional } of leavesWithContext(criterion)) {
    const vt = registry.valueTypes[leaf.valueType];
    if (!vt?.instanceShape) throw new Error(`No instanceShape for value type ${leaf.valueType} (${leaf.id})`);
    let shape = cloneShape(vt.instanceShape);
    // Derive an enum from the shipped .gc for shapes that opt in (codeListFile).
    deriveCodelistEnum(shape);
    // 4.3.1: array bounds derived from EA cardinality (no hint needed).
    if (shape.type === 'array') {
      const bounds = arrayBoundsFromCardinality(leaf.cardinality);
      // Only apply minItems when the leaf is not gated by a conditional branch:
      // a gated array is absent entirely rather than non-empty.
      if (bounds && !insideConditional) Object.assign(shape, bounds);
    }
    // value-type-level constraints (e.g. PERIOD anyOf)
    if (vt.instanceConstraints) Object.assign(shape, cleanHint(vt.instanceConstraints));
    // per-leaf constraints by semantic ID (explicit hints win over derivation)
    if (leafConstraints[leaf.id]) Object.assign(shape, leafConstraints[leaf.id]);

    const side = leaf.instanceBinding.side;
    const segs = leaf.instanceBinding.path;
    // Required if cardinality says so, not gated by a conditional branch, and
    // not explicitly relaxed to optional by a hint.
    const required = isRequiredCardinality(leaf.cardinality) && !insideConditional && !optionalIds.has(leaf.id);
    // 7.0: the 1-based depths at which array containers sit (several for nested
    // repeatable groups); empty if the leaf is in no repeatable group.
    const arrayDepths = new Set(arrayContainerDepths(criterion, leaf));
    insertShape(sides[side], segs, shape, required, arrayDepths);
  }

  // 4.3.2: conditionals DERIVED from the model's condition markers.
  const derived = deriveConditionals(criterion);
  for (const side of ['requirement', 'response']) {
    for (const { at, clause } of derived[side]) {
      const target = objectAt(sides[side], at);
      if (!target) continue;
      target.allOf ??= [];
      target.allOf.push(clause);
    }
  }

  // Hand-authored conditional hints (for cases the derivation cannot express).
  for (const side of ['requirement', 'response']) {
    for (const cond of hints?.conditionals?.[side] ?? []) {
      const target = objectAt(sides[side], cond.at);
      if (!target) continue;
      const clause = cleanHint(cond);
      delete clause.at;
      target.allOf ??= [];
      target.allOf.push(clause);
    }
  }

  const properties = {};
  const required = [];
  for (const side of ['requirement', 'response']) {
    if (Object.keys(sides[side].properties).length) {
      properties[side] = sides[side];
      // requirement side is present whenever the criterion has buyer fields;
      // response presence is instance-dependent, so only requirement is required.
      if (side === 'requirement') required.push('requirement');
    }
  }

  const schema = { type: 'object', properties, additionalProperties: false };
  if (required.length) schema.required = required;
  return pruneEmptyRequired(schema);
}

/**
 * Generate the full per-part schema, placing the criterion schema under its
 * instanceModel container path keyed by the criterion key.
 */
export function generateInstanceSchema(criterion, registry, { partId, hints } = {}) {
  const criterionSchema = generateCriterionSchema(criterion, registry, hints);
  const containerPath = criterion.instanceModel.containerPath; // e.g. [partIV, selectionCriteria]
  const key = criterion[criterion.instanceModel.key.source];   // e.g. the code

  // Build from the innermost container outward.
  let node = { type: 'object', properties: { [key]: criterionSchema }, additionalProperties: false };
  for (let i = containerPath.length - 1; i >= 1; i--) {
    node = { type: 'object', properties: { [containerPath[i]]: node }, required: [containerPath[i]], additionalProperties: false };
  }
  const root = {
    $id: partId ? `${partId}.schema.json` : undefined,
    $comment: `GENERATED by model/compiler/generate-instance-schema.mjs for criterion ${criterion.code}. Structure-derived baseline (design R9); finer constraints added from hints.`,
    type: 'object',
    properties: { [containerPath[0]]: node },
    required: [containerPath[0]],
    additionalProperties: false,
  };
  if (!partId) delete root.$id;
  return root;
}

// --------------------------------------------------------------------------
// Example generator — produce a minimal VALID instance from the compiled
// criterion. Covers the non-conditional (always-present) leaves so the example
// validates against the generated schema regardless of hint strictness.
// --------------------------------------------------------------------------

function sampleForShape(shape, constraints = null) {
  // A codelist-derived (or hand-authored) enum: pick a real member, never the
  // generic 'sample' placeholder, so the example validates against its schema.
  if (Array.isArray(shape?.enum) && shape.enum.length > 0) return shape.enum[0];
  const s = constraints ? { ...shape, ...cleanHint(constraints) } : shape;
  switch (s.type) {
    case 'string': return s.format === 'date' ? '2023-01-01' : 'sample';
    case 'integer': return 1;
    case 'number': return 1000;
    case 'boolean': return false;
    case 'array': return s.items ? [sampleForShape(s.items)] : [];
    case 'object': {
      const obj = {};
      for (const [k, v] of Object.entries(s.properties ?? {})) {
        if ((s.required ?? []).includes(k)) obj[k] = sampleForShape(v);
      }
      // Satisfy an anyOf-of-required (e.g. PERIOD: at least one of start/end):
      // if no required props populated it, add the first anyOf branch's requireds.
      if (Array.isArray(s.anyOf) && Object.keys(obj).length === 0) {
        for (const req of s.anyOf[0]?.required ?? []) {
          if (s.properties?.[req]) obj[req] = sampleForShape(s.properties[req]);
        }
      }
      return obj;
    }
    default: return 'sample';
  }
}

/**
 * Generate a minimal valid example instance. Only ALWAYS-present leaves
 * (cardinality required, not inside a conditional branch) are populated, and
 * `availableElectronically` indicators default to false so no evidence is
 * required — keeping the example valid under the conditional hints.
 */
export function generateExample(criterion, registry) {
  const sideData = { requirement: {}, response: {} };

  // Set a value at a binding path, opening a single-element ARRAY at each
  // array-container depth (task 7.0 / nested C34). `arrayDepths` is the set of
  // 1-based binding-path depths that are array containers for this leaf; a
  // minimal example uses element [0] of each.
  function setAt(obj, segs, value, arrayDepths = EMPTY_SET) {
    let cur = obj;
    for (let i = 0; i < segs.length - 1; i++) {
      const seg = segs[i];
      if (arrayDepths.has(i + 1)) {
        cur[seg] ??= [{}];
        if (!Array.isArray(cur[seg])) cur[seg] = [cur[seg]];
        cur[seg][0] ??= {};
        cur = cur[seg][0];
      } else {
        cur[seg] ??= {};
        cur = cur[seg];
      }
    }
    cur[segs[segs.length - 1]] = value;
  }

  // A minimal example should not trigger any conditional branch. For each derived
  // conditional, the gate must take the value that does NOT activate `then`.
  // Map "side|dotted-gate-path" -> the non-triggering boolean.
  const nonTriggering = new Map();
  for (const side of ['requirement', 'response']) {
    for (const { at, clause } of deriveConditionals(criterion)[side]) {
      const gateProp = Object.keys(clause.if.properties)[0];
      const triggerValue = clause.if.properties[gateProp].const;
      const key = `${side}|${[...(at ? at.split('.') : []), gateProp].join('.')}`;
      nonTriggering.set(key, !triggerValue);
    }
  }

  for (const { leaf, insideConditional } of leavesWithContext(criterion)) {
    if (insideConditional) continue; // skip gated leaves for a minimal example
    if (!isRequiredCardinality(leaf.cardinality)) continue;
    const vt = registry.valueTypes[leaf.valueType];
    const side = leaf.instanceBinding.side;
    const key = `${side}|${leaf.instanceBinding.path.join('.')}`;
    // Derive the codelist enum (if any) so the sampler can pick a real member;
    // on a clone, leaving the registry shape untouched.
    const sampleShape = deriveCodelistEnum(cloneShape(vt.instanceShape));
    const value = nonTriggering.has(key)
      ? nonTriggering.get(key)
      : sampleForShape(sampleShape, vt.instanceConstraints);
    const arrayDepths = new Set(arrayContainerDepths(criterion, leaf));
    setAt(sideData[side], leaf.instanceBinding.path, value, arrayDepths);
  }

  const crit = {};
  if (Object.keys(sideData.requirement).length) crit.requirement = sideData.requirement;
  if (Object.keys(sideData.response).length) crit.response = sideData.response;

  const containerPath = criterion.instanceModel.containerPath;
  const key = criterion[criterion.instanceModel.key.source];
  let node = { [key]: crit };
  for (let i = containerPath.length - 1; i >= 1; i--) node = { [containerPath[i]]: node };
  return { [containerPath[0]]: node };
}
