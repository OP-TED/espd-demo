/**
 * Model module — loads and provides access to the generated UI model bundle.
 * Loads model/generated/ui/index.json, the per-part lenses it references, and
 * the role lens (roles.json). Exposes the helper API the rest of the UI depends
 * on (parts, role form-behaviour, criterion mandatoriness).
 *
 * The part lens shape is { part, titleKey, descriptionKey, shortKey, filledBy,
 * sections:[ { id, titleKey, members:[ administrative | criterion ] } ] }.
 * Role entries carry labelKey/descriptionKey (English text in espd.roles.json),
 * so callers resolve display text through i18n.
 */

// Relative (no leading slash) so it works both at the domain root (local dev)
// and under a subpath deployment (e.g. GitHub Pages project sites).
const MODEL_BASE = 'model/generated/ui';

const PART_KEYS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

let espdModel = null;   // { version, parts: { <roman>: partLens } }
let rolesData = null;   // the roles.json lens (buyerTypes/eoRoles/exclusionCategoryMap/…)

/**
 * Fallback Part III section-code → exclusion-category prefix map, used only if
 * the role lens fails to load. The authoritative map is roles.json's
 * exclusionCategoryMap (see getExclusionCategory).
 */
const FALLBACK_EXCLUSION_CATEGORY_MAP = {
  'exg-crim': 'criminal',
  'exg-pmt': 'payment',
  'exg-mis': 'misconduct',
  'exg-sitn': 'misconduct',
  'exg-natl': 'national'
};

/**
 * Load the generated UI bundle: the index manifest, the per-part lenses, and the
 * role lens. Sets module state; callers use the getters below.
 */
export async function loadModel() {
  const index = await (await fetch(`${MODEL_BASE}/index.json`)).json();

  // Role lens.
  try {
    const rolesRef = index.roles || './roles.json';
    rolesData = await (await fetch(`${MODEL_BASE}/${stripDot(rolesRef)}`)).json();
  } catch (e) {
    console.warn('Failed to load roles.json; role-driven behaviour falls back to defaults', e);
    rolesData = null;
  }

  // Per-part lenses, in the manifest order.
  const parts = {};
  await Promise.all(
    (index.parts || []).map(async (entry) => {
      const lens = await (await fetch(`${MODEL_BASE}/${stripDot(entry.$ref)}`)).json();
      parts[entry.part] = lens;
    })
  );

  espdModel = { version: index.version, parts };
  return espdModel;
}

/** Normalise a manifest "./x.json" ref to a path under MODEL_BASE. */
function stripDot(ref) {
  return ref.replace(/^\.\//, '');
}

/** Get the full model object ({ version, parts }). */
export function getModel() {
  return espdModel;
}

/** Metadata about the model (the bundle carries a version). */
export function getMetadata() {
  return espdModel ? { version: espdModel.version } : {};
}

/** The role lens ({ buyerTypes, eoRoles, exclusionCategoryMap, … }) or null. */
export function getRoles() {
  return rolesData;
}

/**
 * Find a role lens entry by id (searches buyerTypes then eoRoles).
 * Entries carry labelKey/descriptionKey (resolve display text via i18n).
 */
export function getRoleById(id) {
  if (!rolesData) return null;
  const buyer = rolesData.buyerTypes?.find(r => r.id === id);
  if (buyer) return buyer;
  const eo = rolesData.eoRoles?.find(r => r.id === id);
  if (eo) return eo;
  return null;
}

/** All parts as an ordered array of { key, ...partLens } over I..VI. */
export function getParts() {
  if (!espdModel) return [];
  return PART_KEYS
    .filter(key => espdModel.parts[key])
    .map(key => ({ key, ...espdModel.parts[key] }));
}

/** A specific part lens by its Roman-numeral key. */
export function getPart(partKey) {
  if (!espdModel) return null;
  return espdModel.parts[partKey] || null;
}

/** The ordered sections of a part. */
export function getSections(partKey) {
  const part = getPart(partKey);
  return part?.sections || [];
}

/**
 * Every criterion member across all parts, in part/section/member order.
 * Each entry is the bundle's criterion member ({ id, tag, code, dataPath, … }).
 * Used by the UBL exporter to decide which criteria a Request declares
 * (mandatory ∪ buyer-included), independent of whether they were answered.
 */
export function allCriterionMembers() {
  const out = [];
  for (const part of getParts()) {
    for (const section of part.sections || []) {
      for (const member of section.members || []) {
        if (member.kind === 'criterion') out.push(member);
      }
    }
  }
  return out;
}

/**
 * Which parts are relevant for a role (role.formBehavior.visibleParts).
 * Falls back to all parts if the role is not found.
 * @returns {Array} part objects with a `key` property
 */
export function getPartsForRole(roleId) {
  const allParts = getParts();
  const role = getRoleById(roleId);
  if (!role) return allParts;
  const visibleKeys = role.formBehavior.visibleParts;
  return allParts.filter(part => visibleKeys.includes(part.key));
}

/** Whether a part is editable for a role (role.formBehavior.editableParts). */
export function isPartEditable(partKey, roleId) {
  const role = getRoleById(roleId);
  if (!role) return true;
  return role.formBehavior.editableParts.includes(partKey);
}

/** The exclusion-ground rules for a role, or null. */
export function getExclusionRules(roleId) {
  const role = getRoleById(roleId);
  if (!role) return null;
  return role.formBehavior.exclusionGroundRules;
}

/**
 * The exclusion-ground category for a criterion code, by longest-prefix match
 * against the role lens's exclusionCategoryMap (fallback map if roles absent).
 */
export function getExclusionCategory(sectionCode) {
  if (!sectionCode) return null;
  const map = rolesData?.exclusionCategoryMap || FALLBACK_EXCLUSION_CATEGORY_MAP;
  for (const [prefix, category] of Object.entries(map)) {
    if (sectionCode.startsWith(prefix)) return category;
  }
  return null;
}

/**
 * Whether a criterion is mandatory for a role: its exclusion category is marked
 * "mandatory" in the role's exclusionGroundRules.
 */
export function isCriterionMandatory(sectionCode, roleId) {
  const category = getExclusionCategory(sectionCode);
  if (!category) return false;
  const rules = getExclusionRules(roleId);
  if (!rules) return false;
  return rules[category] === 'mandatory';
}

/**
 * Back-compat export of the exclusion-category map. Prefer getExclusionCategory;
 * this reflects the role lens when loaded, else the fallback.
 */
export function getExclusionCategoryMap() {
  return rolesData?.exclusionCategoryMap || FALLBACK_EXCLUSION_CATEGORY_MAP;
}

// Legacy named export kept for tests/consumers that imported the constant.
export const EXCLUSION_CATEGORY_MAP = FALLBACK_EXCLUSION_CATEGORY_MAP;
