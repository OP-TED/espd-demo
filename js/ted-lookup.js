/**
 * TED Lookup module — validates TED notice numbers and provides a stub
 * for retrieving procurement metadata from the TED Search API.
 *
 * MVP: The lookup always returns failure (stub mode).
 * Future: Replace the stub body with a real TED API fetch.
 */

/**
 * Legacy TED notice number format: 1-7 digits, dash, 4-digit year.
 * Examples: "123456-2024", "1-2024", "87654321-2024"
 */
const LEGACY_FORMAT = /^\d{1,8}-\d{4}$/;

/**
 * UUID-style format used in newer eForms notices.
 * Example: "abcdef01-1234-5678-9abc-def012345678"
 */
const UUID_FORMAT = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Validate a TED notice number format.
 * Accepts legacy numeric format (e.g. "123456-2024") or UUID format.
 * @param {string} noticeNumber - The raw user-entered notice number
 * @returns {boolean} true if the format is valid
 */
export function isValidNoticeNumber(noticeNumber) {
  if (!noticeNumber || typeof noticeNumber !== 'string') return false;
  const trimmed = noticeNumber.trim();
  return LEGACY_FORMAT.test(trimmed) || UUID_FORMAT.test(trimmed);
}

/**
 * Derive the TED publication URL from a notice number.
 * @param {string} noticeNumber - A valid notice number
 * @returns {string} The TED notice URL
 */
export function deriveTedUrl(noticeNumber) {
  const trimmed = noticeNumber.trim();
  return `https://ted.europa.eu/en/notice/${trimmed}/xml`;
}

/**
 * @typedef {object} LookupResult
 * @property {boolean} success - Whether the lookup succeeded
 * @property {object} [data] - Retrieved metadata (on success)
 * @property {string} [data.officialName] - Name of the contracting authority
 * @property {string} [data.country] - Country code
 * @property {string} [data.title] - Title of the procurement
 * @property {string} [data.procedureType] - Type of procedure code
 * @property {string} [error] - Error message (on failure)
 */

/**
 * Look up a TED notice by its number.
 *
 * 1. Validates the notice number format.
 * 2. (MVP stub) Always returns failure with an informational message.
 * 3. (Future) Calls the TED Search API and returns the metadata.
 *
 * @param {string} noticeNumber - The notice number to look up
 * @returns {Promise<LookupResult>}
 */
export async function lookupNotice(noticeNumber) {
  // Step 1: Format validation
  if (!isValidNoticeNumber(noticeNumber)) {
    return {
      success: false,
      error: 'Invalid notice number format. Expected format: "123456-2024" or a UUID.'
    };
  }

  // Step 2: Stub — always returns failure for MVP
  // Future: Replace this with a real TED API call:
  //   const resp = await fetch(`https://ted.europa.eu/api/v3/notices/${noticeNumber.trim()}`);
  //   const data = await resp.json();
  //   return { success: true, data: { officialName: ..., country: ..., title: ..., procedureType: ... } };
  return {
    success: false,
    error: 'TED lookup is not available yet. Please enter the details manually.'
  };
}
