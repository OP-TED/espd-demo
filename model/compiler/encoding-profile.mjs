// Task 2.3 — Option B encoding profile.
//
// Promotes the probe's hard-coded kind walk into a declarative encoding profile
// and provides the per-node encoding primitive the generators (task 3) use.
//
// For a structural-core node + its depth + a side (request/response), encodeNode
// returns the element name and the ordered scaffold children, each resolved as:
//   - fromCore: compile-time text from the core node (optionally via `map`)
//   - codelist: fixed attribute set from the codelist-attribute profile
//   - valueBinding: the single runtime value child (element from the value-type
//     registry for the given side; `from` = the leaf's instance path). Omitted
//     when the registry has no binding for that side (e.g. a QUESTION on request).
//
// This module intentionally encodes ONE node's element + scaffold; walking the
// tree and nesting child elements is the generator's job.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { attributesFor } from './codelist-attributes.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

export function loadEncodingProfile(profilePath = path.join(here, 'encoding-profile.json')) {
  return JSON.parse(fs.readFileSync(profilePath, 'utf8'));
}

/**
 * Resolve a profile kind entry. `sameAs` inherits the referenced kind's
 * `children` but keeps THIS kind's own `element` (e.g. subgroup reuses group's
 * children but has element cac:SubsidiaryTenderingCriterionPropertyGroup).
 */
function kindSpec(profile, kind) {
  const spec = profile.kinds[kind];
  if (!spec) throw new Error(`Encoding profile has no kind '${kind}'`);
  if (spec.sameAs) {
    const base = profile.kinds[spec.sameAs];
    if (!base) throw new Error(`Encoding profile kind '${kind}' sameAs unknown '${spec.sameAs}'`);
    return { element: spec.element ?? base.element, children: spec.children ?? base.children };
  }
  return spec;
}

/**
 * Map a structural-core node + depth to a profile kind name.
 *   criterion               -> 'criterion' (handled by the criterion root)
 *   group at top level      -> 'group'
 *   group nested in a group  -> 'subgroup'
 *   requirement/question    -> 'leaf'
 */
export function profileKind(node, isNestedGroup) {
  if (node.nodeKind === 'requirement' || node.nodeKind === 'question') return 'leaf';
  if (node.nodeKind === 'group') return isNestedGroup ? 'subgroup' : 'group';
  return node.nodeKind; // 'structural' etc. — generators decide handling
}

/** Instance path for a leaf: containerPath + criterion key + side + binding path. */
export function leafInstancePath(criterion, leaf) {
  const m = criterion.instanceModel;
  const b = leaf.instanceBinding;
  return [...m.containerPath, criterion[m.key.source], b.side, ...b.path];
}

/**
 * Task 7.0 — which of a leaf's binding-path segments are ARRAY CONTAINERS
 * introduced by repeatable groups? Returns a SORTED array of prefix lengths
 * (number of leading binding-path segments) — one per matching container — so
 * NESTED repeatable groups (C34/C36) are all reported, e.g. `[1, 2]` means both
 * the 1st and 2nd segments open an array. Empty if the leaf is in no array.
 *
 * `criterion.arrayContainers` is the list of { side, path } the overlay recorded
 * from repeatable-group bindings. A container matches when it is on the same
 * side and is a proper prefix of the leaf's binding path.
 */
export function arrayContainerDepths(criterion, leaf) {
  const containers = criterion.arrayContainers ?? [];
  const b = leaf.instanceBinding;
  const depths = [];
  for (const c of containers) {
    if (c.side !== b.side) continue;
    if (c.path.length >= b.path.length) continue; // proper prefix only
    if (c.path.every((seg, i) => seg === b.path[i])) depths.push(c.path.length);
  }
  return [...new Set(depths)].sort((a, b2) => a - b2);
}

/**
 * Deepest array-container prefix length for a leaf (0 if none). Kept for callers
 * that only need the innermost container; prefer arrayContainerDepths for the
 * full nested set.
 */
export function arrayContainerPrefix(criterion, leaf) {
  const depths = arrayContainerDepths(criterion, leaf);
  return depths.length ? depths[depths.length - 1] : 0;
}

/** Dotted instance path for a leaf with `[]` after every array-container segment. */
export function leafDataPath(criterion, leaf) {
  const base = [...criterion.instanceModel.containerPath, criterion[criterion.instanceModel.key.source], leaf.instanceBinding.side];
  const depths = new Set(arrayContainerDepths(criterion, leaf));
  const segs = leaf.instanceBinding.path.map((s, i) => (depths.has(i + 1) ? `${s}[]` : s));
  return [...base, ...segs].join('.');
}

/**
 * Encode one node's element + ordered scaffold children.
 * @param {object} opts
 * @param {object} opts.profile encoding profile
 * @param {object} opts.codelistProfile codelist-attribute profile
 * @param {object} opts.registry value-type registry
 * @param {object} opts.node structural-core node (criterion/group/leaf)
 * @param {string} opts.kind profile kind ('criterion'|'group'|'subgroup'|'leaf')
 * @param {string} [opts.side] 'request' | 'response' (leaf value binding side)
 * @param {object} [opts.criterion] compiled criterion (for leaf instance paths)
 * @returns {{element:string, children:Array}}
 */
export function encodeNode({ profile, codelistProfile, registry, node, kind, side, criterion }) {
  const spec = kindSpec(profile, kind);
  const children = [];

  for (const c of spec.children ?? []) {
    if (c.valueBinding === 'value-type-registry') {
      const binding = side === 'request'
        ? registry.valueTypes[node.valueType]?.requestXml
        : registry.valueTypes[node.valueType]?.responseXml;
      if (!binding) continue; // no value element on this side (e.g. QUESTION on request)
      const encoded = {
        element: binding.element,
        from: leafInstancePath(criterion, node).join('.'),
        binding: binding.kind,
      };
      if (binding.attributes) encoded.attributes = Object.keys(binding.attributes);
      children.push(encoded);
      continue;
    }

    // scaffold / metadata child
    let text = c.fromCore !== undefined ? node[c.fromCore] : undefined;
    if (text !== undefined && c.map) text = c.map[text] ?? text;
    const child = { element: c.element };
    if (c.fromCore !== undefined) { child.fromCore = c.fromCore; child.text = text ?? null; }
    if (c.codelist) child.attributes = attributesFor(codelistProfile, c.codelist);
    children.push(child);
  }

  return { element: spec.element, children };
}

/** Validate the profile shape (kinds present; sameAs resolvable). */
export function validateEncodingProfile(profile) {
  for (const required of ['criterion', 'group', 'subgroup', 'leaf']) {
    if (!profile.kinds[required]) throw new Error(`Encoding profile missing kind '${required}'`);
  }
  for (const [name, spec] of Object.entries(profile.kinds)) {
    if (spec.sameAs && !profile.kinds[spec.sameAs]) {
      throw new Error(`Encoding profile kind '${name}' sameAs '${spec.sameAs}' which does not exist`);
    }
    if (!spec.sameAs && !spec.element) {
      throw new Error(`Encoding profile kind '${name}' has no element`);
    }
  }
  return true;
}
