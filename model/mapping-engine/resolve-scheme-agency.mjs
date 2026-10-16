// Resolve scheme-agency PROFILE references in a mapping spec into the inlined
// { path?, map, default } form the mapping engine (mapper.mjs resolveAttr)
// understands. Keeps the single source of truth in one registry file
// (model/model-sources/registries/scheme-agency-profile.json) while leaving the
// mapper itself data-only and environment-neutral.
//
// A mapping rule declares a derived @schemeAgencyID as:
//   "attributes": { "schemeAgencyID": { "fromMap": { "path": "<field>", "profile": "<name>" } } }
// or, when there is no scheme field to derive from (the agency is the default):
//   "attributes": { "schemeAgencyID": { "fromMap": { "profile": "<name>" } } }
//
// This module replaces each such { fromMap: { profile, path? } } with
// { fromMap: { path?, map, default } }, reading `map`/`default` from the named
// profile. Any already-inlined fromMap (carrying its own map/default) is left
// untouched, so the mapper never needs the registry at runtime.
//
// Dependency-free and browser-safe: the caller supplies the parsed profile
// object (fs in Node, fetch in the browser); this module only transforms specs.

/** The { map, default } for a named profile; throws if the profile is unknown. */
function profileEntry(profileDoc, name) {
  const entry = profileDoc?.profiles?.[name];
  if (!entry) {
    throw new Error(`scheme-agency profile "${name}" not found in the registry`);
  }
  return { map: entry.map ?? {}, default: entry.default };
}

/** Expand one attribute value if it is a { fromMap: { profile } } reference. */
function resolveAttrValue(value, profileDoc) {
  if (!value || typeof value !== 'object' || !('fromMap' in value)) return value;
  const fm = value.fromMap;
  // Already inlined (has its own map/default): leave as-is.
  if (!fm || fm.profile === undefined) return value;
  const { map, default: dflt } = profileEntry(profileDoc, fm.profile);
  const resolved = { map, default: dflt };
  if (fm.path !== undefined) resolved.path = fm.path;
  return { fromMap: resolved };
}

/** Resolve every `attributes` map found anywhere in a rules/fields subtree. */
function resolveNode(node, profileDoc) {
  if (Array.isArray(node)) {
    for (const item of node) resolveNode(item, profileDoc);
    return;
  }
  if (!node || typeof node !== 'object') return;

  if (node.attributes && typeof node.attributes === 'object') {
    for (const [name, value] of Object.entries(node.attributes)) {
      node.attributes[name] = resolveAttrValue(value, profileDoc);
    }
  }
  // Recurse into the shapes a mapping spec nests attributes under: rules,
  // forEach item fields, records entries/items, and embedded structure subtrees.
  for (const key of ['rules', 'fields', 'entries', 'children', 'childRecords']) {
    if (node[key] !== undefined) resolveNode(node[key], profileDoc);
  }
  if (node.item !== undefined) resolveNode(node.item, profileDoc);
  if (node.structure !== undefined) resolveNode(node.structure, profileDoc);
}

/**
 * Return a COPY of `spec` with all { fromMap: { profile } } references resolved
 * against `profileDoc`. The input spec is not mutated.
 * @param {object} spec       a mapping spec (as loaded from JSON)
 * @param {object} profileDoc the parsed scheme-agency-profile.json
 * @returns {object} the resolved spec
 */
export function resolveSchemeAgency(spec, profileDoc) {
  const copy = structuredClone(spec);
  resolveNode(copy, profileDoc);
  return copy;
}
