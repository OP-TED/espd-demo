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
  // The EA tag (e.g. OT65, C01). Carried onto the compiled criterion so the form
  // generator can key i18n by the stable id — the tag disambiguates the "OT"
  // family (several criteria share code "OT"). Absent for criteria that declare
  // no tag (their code is already a unique stable id).
  if (sidecar.criterion.tag) compiled.tag = sidecar.criterion.tag;
  compiled.instanceModel = sidecar.criterion.instanceModel;
  // Enum-selector branch visibility (e.g. C36: a radio type-selector reveals one
  // of several mutually-exclusive branches). Carried through so the form
  // generator can emit value-equality visibleWhen rules the boolean condition
  // markers cannot express. Pure projection data; stripped before equivalence.
  if (sidecar.branchSelectors) compiled.branchSelectors = sidecar.branchSelectors;

  // Index leaves AND groups by correlation path. Groups are indexable so a
  // REPEATABLE group (EA cardinality 0..n / 1..n) can carry its own binding,
  // declaring the array container its leaves live inside (task 7.0).
  const leaves = leavesOf(compiled);
  const leafByPath = new Map();
  for (const leaf of leaves) {
    if (leaf.requestpath) leafByPath.set(leaf.requestpath, leaf);
  }
  const groupByPath = new Map();
  (function indexGroups(node) {
    for (const child of node.children ?? []) {
      if (child.nodeKind === 'group' && child.requestpath) groupByPath.set(child.requestpath, child);
      indexGroups(child);
    }
  })(compiled);

  const sidecarComponents = sidecar.components ?? {};
  const usedPaths = new Set();

  // Collect the instance-path segments that denote an array container, declared
  // by a repeatable group's binding. A leaf whose binding path passes through
  // such a segment is an element-field of that array.
  const arrayContainers = []; // array of { side, path: string[] }

  // Attach each sidecar entry. A leaf entry sets id + instanceBinding; a group
  // entry (for a repeatable group) registers its array container.
  for (const [reqpath, meta] of Object.entries(sidecarComponents)) {
    const leaf = leafByPath.get(reqpath);
    if (leaf) {
      leaf.id = meta.id;
      leaf.instanceBinding = meta.instanceBinding;
      // A per-leaf codelist (for a CODE value type whose list varies by use,
      // e.g. financial-ratio-type vs occupation). Attached to the leaf so the
      // generators can read it; the value type itself stays codelist-agnostic.
      if (meta.codelist) leaf.codelist = meta.codelist;
      // A per-leaf request-value override (DATA, not generator logic): overrides
      // how this leaf's buyer REQUIREMENT value serializes, for leaves whose EA
      // value type is wrong for them (e.g. the two CODE_BOOLEAN leaves whose
      // boolean-gui-control-type codelist is a GUI-render hint). Shape:
      //   { element, const? , valueMap? }  (see generate-request-mapping).
      // Kept as data so the generator stays criterion-agnostic (R11.4).
      if (meta.requestValue) leaf.requestValue = meta.requestValue;
      usedPaths.add(reqpath);
      continue;
    }
    const group = groupByPath.get(reqpath);
    if (group) {
      if (!meta.instanceBinding?.repeatable) {
        throw new Error(
          `Sidecar binds group '${reqpath}' in '${core.code}' but only REPEATABLE groups ` +
          `(cardinality 0..n/1..n) may carry a binding; mark instanceBinding.repeatable: true`);
      }
      const card = group.cardinality;
      if (!(typeof card === 'string' && /\.\.(n|[2-9]|\d{2,})$/.test(card))) {
        throw new Error(
          `Sidecar marks group '${reqpath}' repeatable, but its EA cardinality is '${card}' (not 0..n/1..n)`);
      }
      group.id = meta.id;
      group.instanceBinding = meta.instanceBinding;
      // A repeatable group can hold BOTH buyer (requirement) and EO (response)
      // leaves, which live under separate side roots in the instance data. Record
      // the container for EVERY side that has a leaf beneath this group, so the
      // generators treat the segment as an array on both sides. The binding's own
      // `side` is the primary one; additional sides are discovered from the
      // group's descendant leaves.
      const sides = new Set([meta.instanceBinding.side]);
      (function collectSides(node) {
        for (const child of node.children ?? []) {
          if ((child.nodeKind === 'requirement' || child.nodeKind === 'question')) {
            // The leaf's side is resolved from its own sidecar entry (attached in
            // a later pass or already present); fall back to scanning sidecar.
            const entry = sidecarComponents[child.requestpath];
            if (entry?.instanceBinding?.side) sides.add(entry.instanceBinding.side);
          }
          collectSides(child);
        }
      })(group);
      for (const side of sides) {
        arrayContainers.push({ side, path: meta.instanceBinding.path });
      }
      usedPaths.add(reqpath);
      continue;
    }
    throw new Error(`Sidecar correlation path not found in criterion '${core.code}': ${reqpath}`);
  }

  // Record array containers on the compiled criterion so the generators can
  // treat the relevant instance-path segment as an array of objects.
  if (arrayContainers.length) compiled.arrayContainers = arrayContainers;

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

  // Fail on duplicate semantic ids (across criterion + leaves + bound groups).
  const boundGroupIds = [...groupByPath.values()].filter(g => g.id).map(g => g.id);
  const ids = [compiled.id, ...leaves.map(l => l.id), ...boundGroupIds];
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
