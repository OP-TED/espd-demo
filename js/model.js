/**
 * Model module — loads and provides access to the ESPD-EDM data model.
 * Loads the decomposed model from espd-edm/index.json and its referenced parts.
 * Loads role definitions from roles.json for form behavior configuration.
 */

// Relative (no leading slash) so it works both at the domain root (local dev)
// and under a subpath deployment (e.g. GitLab Pages project sites).
const MODEL_BASE = 'espd-edm';

let espdModel = null;
let rolesData = null;

/**
 * Mapping of Part III section code prefixes to exclusion ground categories.
 */
const EXCLUSION_CATEGORY_MAP = {
  'exg-crim': 'criminal',
  'exg-pmt': 'payment',
  'exg-mis': 'misconduct',
  'exg-sitn': 'misconduct',
  'exg-natl': 'national'
};

/**
 * Load the ESPD-EDM model from the decomposed index + part files.
 */
export async function loadModel() {
  // Load the index manifest
  const indexResp = await fetch(`${MODEL_BASE}/index.json`);
  const index = await indexResp.json();

  // Load metadata
  const metaResp = await fetch(`${MODEL_BASE}/${index.metadata}`);
  const metadata = await metaResp.json();

  // Load roles if available
  if (index.roles) {
    try {
      const rolesResp = await fetch(`${MODEL_BASE}/${index.roles}`);
      rolesData = await rolesResp.json();
    } catch (e) {
      console.warn('Failed to load roles.json, falling back to default behavior', e);
      rolesData = null;
    }
  }

  // Load all parts in parallel
  const partEntries = await Promise.all(
    index.parts.map(async (entry) => {
      const resp = await fetch(`${MODEL_BASE}/${entry.$ref}`);
      const partData = await resp.json();
      return {
        key: entry.part,
        data: {
          title: partData.title,
          description: partData.description,
          filledBy: partData.filledBy,
          sections: partData.sections
        }
      };
    })
  );

  // Assemble into the same shape the rest of the app expects
  const parts = {};
  for (const { key, data } of partEntries) {
    parts[key] = data;
  }

  espdModel = { metadata, parts };
  return espdModel;
}

/**
 * Get the full model object.
 */
export function getModel() {
  return espdModel;
}

/**
 * Get metadata about the model.
 */
export function getMetadata() {
  return espdModel?.metadata || {};
}

/**
 * Get the roles registry data.
 * @returns {{ buyerTypes: Array, eoRoles: Array } | null}
 */
export function getRoles() {
  return rolesData;
}

/**
 * Find a role configuration by its id.
 * Searches both buyerTypes and eoRoles arrays.
 * @param {string} id - The role id (e.g., 'sole-tenderer', 'contracting-authority')
 * @returns {object|null} The role entry or null if not found
 */
export function getRoleById(id) {
  if (!rolesData) return null;

  const buyer = rolesData.buyerTypes.find(r => r.id === id);
  if (buyer) return buyer;

  const eo = rolesData.eoRoles.find(r => r.id === id);
  if (eo) return eo;

  return null;
}

/**
 * Get all parts as an ordered array.
 */
export function getParts() {
  if (!espdModel) return [];
  const partKeys = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  return partKeys.map(key => ({
    key,
    ...espdModel.parts[key]
  }));
}

/**
 * Get a specific part by its Roman numeral key.
 */
export function getPart(partKey) {
  if (!espdModel) return null;
  return espdModel.parts[partKey] || null;
}

/**
 * Get sections for a specific part.
 */
export function getSections(partKey) {
  const part = getPart(partKey);
  return part?.sections || [];
}

/**
 * Determine which parts are relevant for a given role.
 * Uses formBehavior.visibleParts from the role registry.
 * Falls back to showing all parts if role is not found.
 * @param {string} roleId - The role id
 * @returns {Array} Array of part objects with key property
 */
export function getPartsForRole(roleId) {
  const allParts = getParts();
  const role = getRoleById(roleId);

  if (!role) {
    // Fallback: show all parts
    return allParts;
  }

  const visibleKeys = role.formBehavior.visibleParts;
  return allParts.filter(part => visibleKeys.includes(part.key));
}

/**
 * Check if a part is editable for a given role.
 * Uses formBehavior.editableParts from the role registry.
 * @param {string} partKey - The part key (e.g., 'I', 'II')
 * @param {string} roleId - The role id
 * @returns {boolean}
 */
export function isPartEditable(partKey, roleId) {
  const role = getRoleById(roleId);

  if (!role) {
    // Fallback: all parts editable
    return true;
  }

  return role.formBehavior.editableParts.includes(partKey);
}

/**
 * Get the exclusion ground rules for a role.
 * @param {string} roleId - The role id
 * @returns {object|null} The exclusionGroundRules object or null
 */
export function getExclusionRules(roleId) {
  const role = getRoleById(roleId);
  if (!role) return null;
  return role.formBehavior.exclusionGroundRules;
}

/**
 * Determine the exclusion ground category for a section code.
 * @param {string} sectionCode - The section code (e.g., 'exg-crim-part', 'exg-pmt-bre-tax')
 * @returns {string|null} The category ('criminal', 'payment', 'misconduct', 'national') or null
 */
export function getExclusionCategory(sectionCode) {
  if (!sectionCode) return null;

  for (const [prefix, category] of Object.entries(EXCLUSION_CATEGORY_MAP)) {
    if (sectionCode.startsWith(prefix)) {
      return category;
    }
  }
  return null;
}

/**
 * Determine if a criterion is mandatory for a given role.
 * A criterion is mandatory if its exclusion category is mapped to "mandatory"
 * in the role's exclusionGroundRules.
 * @param {string} sectionCode - The section code (e.g., 'exg-crim-part')
 * @param {string} roleId - The role id (e.g., 'contracting-authority')
 * @returns {boolean} true if the criterion is mandatory for this role
 */
export function isCriterionMandatory(sectionCode, roleId) {
  const category = getExclusionCategory(sectionCode);
  if (!category) return false;

  const rules = getExclusionRules(roleId);
  if (!rules) return false;

  return rules[category] === 'mandatory';
}

// Export the category map for testing
export { EXCLUSION_CATEGORY_MAP };
