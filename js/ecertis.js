/**
 * eCertis integration module — placeholder for future integration with
 * the EU eCertis database (https://ec.europa.eu/tools/ecertis/).
 *
 * eCertis provides:
 * - National criteria mappings per member state
 * - Evidence types required per criterion per country
 * - Links to national certificate databases
 *
 * TODO: Implement API integration when ready.
 * API base URL: https://ec.europa.eu/tools/ecertis/api/
 */

/**
 * Placeholder: Fetch evidence types for a given criterion and country.
 * @param {string} criterionId - The ESPD criterion UUID
 * @param {string} countryCode - ISO 3166-1 alpha-2 country code
 * @returns {Promise<Array>} Array of evidence type objects
 */
export async function getEvidenceTypes(criterionId, countryCode) {
  // TODO: Implement eCertis API call
  // GET /api/criteria/{criterionId}/evidences?country={countryCode}
  console.info('[eCertis] Placeholder: getEvidenceTypes called with', { criterionId, countryCode });
  return [];
}

/**
 * Placeholder: Fetch national criteria for a country.
 * @param {string} countryCode - ISO 3166-1 alpha-2 country code
 * @returns {Promise<Array>} Array of national criterion objects
 */
export async function getNationalCriteria(countryCode) {
  // TODO: Implement eCertis API call
  // GET /api/criteria?country={countryCode}&type=national
  console.info('[eCertis] Placeholder: getNationalCriteria called with', { countryCode });
  return [];
}

/**
 * Placeholder: Check if a criterion is applicable in a given country.
 * @param {string} criterionId - The ESPD criterion UUID
 * @param {string} countryCode - ISO 3166-1 alpha-2 country code
 * @returns {Promise<boolean>}
 */
export async function isCriterionApplicable(criterionId, countryCode) {
  // TODO: Implement eCertis API call
  console.info('[eCertis] Placeholder: isCriterionApplicable called with', { criterionId, countryCode });
  return true;
}
