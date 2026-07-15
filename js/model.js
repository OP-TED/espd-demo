/**
 * Model module — loads and provides access to the ESPD-EDM data model.
 * Loads the decomposed model from espd-edm/index.json and its referenced parts.
 */

const MODEL_BASE = '/espd-edm';

let espdModel = null;

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
 * CA (Contracting Authority): fills Part I (procedure info)
 * EO (Economic Operator): fills Parts I (read-only), II-VI
 */
export function getPartsForRole(role) {
  const allParts = getParts();
  if (role === 'ca') {
    // CA fills Part I and defines criteria for III and IV
    return allParts;
  }
  // EO fills all parts
  return allParts;
}

/**
 * Check if a part is editable for a given role.
 */
export function isPartEditable(partKey, role) {
  if (role === 'ca') {
    // CA primarily edits Part I (procedure info); Parts III-IV (selecting criteria)
    return ['I', 'III', 'IV', 'V'].includes(partKey);
  }
  // EO edits Parts II-VI; Part I is read-only (from the request)
  return ['II', 'III', 'IV', 'V', 'VI'].includes(partKey);
}
