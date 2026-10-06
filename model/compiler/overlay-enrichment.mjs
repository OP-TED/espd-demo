// Task 1.2 — enrichment-sidecar overlay.
//
// Joins a per-criterion enrichment sidecar onto the structural core by EA
// correlation path (requestpath). The sidecar carries the information that is
// NOT in espd-edm.json: the criterion id + instanceModel, and each value leaf's
// stable semantic id + instanceBinding (side + relative instance path).
//
// Produces a "compiled criterion": the structural core with
//   criterion.id, criterion.instanceModel
//   leaf.id, leaf.instanceBinding
// attached. The core is cloned, never mutated.
//
// Fail-fast (design R1.2/R1.3, R3.1-R3.5):
//   - stale correlation path            (sidecar path not present in the core)
//   - un-enriched requirement/question  (a value leaf with no sidecar entry)
//   - duplicate semantic id             (two components share an id)
//   - unused sidecar entry              (sidecar entry no leaf uses)

import { leavesOf } from './read-structural-core.mjs';

function clone(value) {
  return structuredClone(value);
}

/**
 * @param {object} core  structural-core criterion (from readStructuralCore)
 * @param {object} sidecar  parsed enrichment sidecar
 * @returns {object} compiled criterion (core + id/instanceModel/instanceBinding)
 */
export function overlayEnrichment(core, sidecar) {
  if (sidecar.criterion?.code !== core.code) {
    throw new Error(
      `Sidecar criterion code '${sidecar.criterion?.code}' does not match core code '${core.code}'`
    );
  }

  const compiled = clone(core);
  compiled.id = sidecar.criterion.id ?? core.code;
  compiled.instanceModel = sidecar.criterion.instanceModel;

  // Index leaves by correlation path.
  const leaves = leavesOf(compiled);
  const leafByPath = new Map();
  for (const leaf of leaves) {
    if (leaf.requestpath) leafByPath.set(leaf.requestpath, leaf);
  }

  const sidecarComponents = sidecar.components ?? {};
  const usedPaths = new Set();

  // Attach each sidecar entry; fail on stale correlation paths.
  for (const [reqpath, meta] of Object.entries(sidecarComponents)) {
    const leaf = leafByPath.get(reqpath);
    if (!leaf) {
      throw new Error(`Sidecar correlation path not found in criterion '${core.code}': ${reqpath}`);
    }
    leaf.id = meta.id;
    leaf.instanceBinding = meta.instanceBinding;
    usedPaths.add(reqpath);
  }

  // Fail on un-enriched value leaves.
  const unenriched = leaves.filter(l => !l.id || !l.instanceBinding);
  if (unenriched.length) {
    throw new Error(
      `Un-enriched value leaves in '${core.code}':\n` +
      unenriched.map(l => `  - ${l.requestpath}`).join('\n')
    );
  }

  // Fail on unused sidecar entries.
  const unused = Object.keys(sidecarComponents).filter(p => !usedPaths.has(p));
  if (unused.length) {
    throw new Error(
      `Unused sidecar entries in '${core.code}' (no leaf uses them):\n` +
      unused.map(p => `  - ${p}`).join('\n')
    );
  }

  // Fail on duplicate semantic ids (across criterion + leaves).
  const ids = [compiled.id, ...leaves.map(l => l.id)];
  const seen = new Set();
  const dupes = new Set();
  for (const id of ids) {
    if (seen.has(id)) dupes.add(id);
    seen.add(id);
  }
  if (dupes.size) {
    throw new Error(`Duplicate semantic IDs in '${core.code}': ${[...dupes].join(', ')}`);
  }

  return compiled;
}
