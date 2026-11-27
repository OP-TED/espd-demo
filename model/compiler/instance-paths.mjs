// Instance-data path helpers for a compiled criterion.
//
// Pure functions over a compiled criterion (the joined EA structure + enrichment that
// ESPD-EDM publishes as model/compiled/<key>.json). They mirror the helpers of the same
// name in espd-tools/model-compiler/encoding-profile.mjs, which produce the published
// instance-data schemas and mappings; the form generator needs the identical rules so
// that a field's `dataPath` addresses the published instance data. If the rule for
// array containers or instance paths ever changes upstream, change it here too (the
// published-model tests compare the generated form paths with the published schemas).

/** Instance path for a leaf: containerPath + criterion key + side + binding path. */
export function leafInstancePath(criterion, leaf) {
  const m = criterion.instanceModel;
  const b = leaf.instanceBinding;
  return [...m.containerPath, criterion[m.key.source], b.side, ...b.path];
}

/**
 * Which of a leaf's binding-path segments are ARRAY CONTAINERS introduced by repeatable
 * groups? Returns a SORTED array of prefix lengths (number of leading binding-path
 * segments), one per matching container, so NESTED repeatable groups are all reported:
 * `[1, 2]` means both the 1st and 2nd segments open an array. Empty if the leaf is in no
 * array. `criterion.arrayContainers` lists the { side, path } the overlay recorded from
 * repeatable-group bindings; a container matches when it is on the same side and is a
 * proper prefix of the leaf's binding path.
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
