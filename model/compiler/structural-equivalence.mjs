// Task 1.3 — structural-equivalence gate.
//
// Proves the compiled criterion is a faithful, lossless projection of the EA
// criterion: enrichment never silently alters the authoritative ESPD structure.
//
// In the lean design the compiler does not retain the full EA node; it reads a
// minimal structural core and overlays semantic fields (id, instanceModel,
// instanceBinding). So the gate works by normalising BOTH sides into the same
// canonical structural form and asserting deep equality:
//
//   normaliseEa(rawEaCriterion)          ->  canonical structure
//   projectCompiled(compiledCriterion)   ->  canonical structure  (semantic
//                                             fields removed)
//
// Canonical structure is exactly what read-structural-core.mjs produces, so a
// faithful read + overlay round-trips to the EA structure.

import { readStructuralCore, findCriterion, leavesOf } from './read-structural-core.mjs';

/** Strip the semantic-overlay fields the compiler adds, leaving pure structure. */
function stripNode(node) {
  const { id, instanceBinding, codelist, ...rest } = node;
  if (rest.children) rest.children = rest.children.map(stripNode);
  return rest;
}

/**
 * Project a compiled criterion back to canonical structural form by removing the
 * semantic-only fields (criterion id/instanceModel, leaf id/instanceBinding).
 */
export function projectCompiled(compiled) {
  // arrayContainers and branchSelectors are compiler-derived projection data
  // (from repeatable-group bindings / enum-selector sidecar), not EA structure,
  // so they are dropped alongside id/instanceModel.
  const { id, instanceModel, arrayContainers, branchSelectors, ...rest } = compiled;
  return {
    code: rest.code,
    uuid: rest.uuid,
    cardinality: rest.cardinality,
    children: (rest.children ?? []).map(stripNode),
  };
}

/**
 * Normalise the raw EA criterion into canonical structural form. This reuses the
 * reader so the gate verifies the SAME transformation the compiler relies on.
 */
export function normaliseEa(edm, code) {
  return readStructuralCore(edm, code);
}

/** Deep structural equality, returning the first differing path or null. */
export function firstDiff(a, b, pathStr = '$') {
  if (a === b) return null;
  if (typeof a !== typeof b || a === null || b === null || typeof a !== 'object') {
    return `${pathStr}: ${JSON.stringify(a)} !== ${JSON.stringify(b)}`;
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return `${pathStr}: array/non-array mismatch`;
    if (a.length !== b.length) return `${pathStr}: length ${a.length} !== ${b.length}`;
    for (let i = 0; i < a.length; i++) {
      const d = firstDiff(a[i], b[i], `${pathStr}[${i}]`);
      if (d) return d;
    }
    return null;
  }
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    const d = firstDiff(a[k], b[k], `${pathStr}.${k}`);
    if (d) return d;
  }
  return null;
}

/**
 * Assert the compiled criterion is structurally equivalent to its EA source.
 * Throws with a readable diff on mismatch. Returns the canonical structure.
 */
export function assertStructuralEquivalence(edm, code, compiled) {
  if (!findCriterion(edm, code)) {
    throw new Error(`Criterion '${code}' is absent from espd-edm.json`);
  }
  const eaCanonical = normaliseEa(edm, code);
  const projected = projectCompiled(compiled);
  const diff = firstDiff(projected, eaCanonical);
  if (diff) {
    throw new Error(
      `Structural-equivalence check FAILED for '${code}'.\n` +
      `The compiled criterion's structure differs from espd-edm.json:\n  ${diff}`
    );
  }
  return eaCanonical;
}

export { leavesOf };
