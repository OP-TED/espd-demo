/**
 * TED Lookup module — validates TED notice numbers and retrieves
 * procurement metadata from the TED Search API.
 *
 * API endpoint: POST https://api.ted.europa.eu/v3/notices/search
 * No authentication required for searching published notices.
 */

const TED_API_URL = '/api/ted/v3/notices/search';
const TED_NOTICE_BASE_URL = 'https://ted.europa.eu/en/notice';

/**
 * Override the TED API URL (for testing or production deployment).
 * In the browser with the dev server proxy: '/api/ted/v3/notices/search' (default)
 * In production behind a reverse proxy: could be a different path
 * Direct (server-side): 'https://api.ted.europa.eu/v3/notices/search'
 */
let tedApiUrl = TED_API_URL;

/**
 * Legacy TED notice number format: 1-8 digits, dash, 4-digit year.
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
  return `${TED_NOTICE_BASE_URL}/${trimmed}/xml`;
}

/**
 * Extract a notice number from a TED URL.
 * Supports formats like:
 *   https://ted.europa.eu/en/notice/123456-2024
 *   https://ted.europa.eu/en/notice/123456-2024/html
 *   https://ted.europa.eu/en/notice/123456-2024/xml
 * @param {string} url - The TED URL
 * @returns {string|null} The extracted notice number or null if not parseable
 */
export function extractNoticeNumberFromUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/\/notice\/([^/]+)/);
  if (match && match[1]) {
    const candidate = match[1].trim();
    if (isValidNoticeNumber(candidate)) return candidate;
  }
  return null;
}

/**
 * @typedef {object} LookupResult
 * @property {boolean} success - Whether the lookup succeeded
 * @property {object} [data] - Retrieved metadata (on success)
 * @property {string} [data.officialName] - Name of the contracting authority
 * @property {string} [data.country] - Country code
 * @property {string} [data.title] - Title of the procurement
 * @property {string} [data.procedureType] - Type of procedure
 * @property {string} [error] - Error message (on failure)
 */

/**
 * Look up a TED notice by its number using the TED Search API.
 *
 * 1. Validates the notice number format.
 * 2. Queries the TED Search API (POST /v3/notices/search).
 * 3. Extracts buyer name, country, title, and procedure type from the response.
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

  const trimmed = noticeNumber.trim();

  // Step 2: Query the TED Search API
  try {
    const response = await fetch(tedApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: `publication-number = "${trimmed}"`,
        fields: [
          'publication-number',
          'buyer-name',
          'buyer-country',
          'notice-title',
          'procedure-type',
          'contract-nature'
        ],
        page: 1,
        limit: 1,
        scope: 'ALL'
      })
    });

    if (!response.ok) {
      return {
        success: false,
        error: `TED API returned status ${response.status}. Please enter details manually.`
      };
    }

    const result = await response.json();

    // Debug: log the raw API response structure
    console.debug('[TED Lookup] API response:', JSON.stringify(result).substring(0, 1000));

    // Step 3: Extract data from the response
    // TED Search API v3 returns { notices: [...] } or { results: [...] }
    const notices = result.notices || result.results || [];
    if (notices.length === 0) {
      return {
        success: false,
        error: `Notice "${trimmed}" not found on TED. Please verify the number or enter details manually.`
      };
    }

    const notice = notices[0];
    console.debug('[TED Lookup] Notice data:', JSON.stringify(notice).substring(0, 1000));

    const data = {
      officialName: extractField(notice, 'buyer-name'),
      country: extractField(notice, 'buyer-country'),
      title: extractField(notice, 'notice-title'),
      procedureType: mapProcedureType(extractField(notice, 'procedure-type'))
    };

    return { success: true, data };

  } catch (err) {
    // Network error, CORS issue, timeout, etc.
    return {
      success: false,
      error: `Could not reach TED API: ${err.message || 'Network error'}. Please enter details manually.`
    };
  }
}

/**
 * Extract a field value from a TED search result notice.
 * TED API returns fields in various formats:
 * - Simple string: "open"
 * - Array: ["BEL"]
 * - Multilingual object: { "eng": ["value"], "fra": ["value"], ... }
 * @param {object} notice - A notice object from the search results
 * @param {string} fieldName - The field name to extract
 * @returns {string} The field value (English preferred) or empty string
 */
function extractField(notice, fieldName) {
  const value = notice[fieldName];
  if (!value) return '';

  // Simple string (e.g., procedure-type: "open")
  if (typeof value === 'string') return value;

  // Array of strings (e.g., buyer-country: ["BEL"])
  if (Array.isArray(value)) return value[0] || '';

  // Multilingual object (e.g., buyer-name: { "eng": ["..."], "fra": ["..."] })
  if (typeof value === 'object') {
    // Prefer English, then fall back to first available language
    const eng = value.eng || value.ENG;
    if (eng) return Array.isArray(eng) ? eng[0] : eng;

    // Fallback: first language found
    const firstLang = Object.values(value)[0];
    if (firstLang) return Array.isArray(firstLang) ? firstLang[0] : firstLang;
  }

  return '';
}


/**
 * Map TED API procedure type to our codelist values.
 * TED returns eForms codes (e.g., "open"), our codelist uses the same codes.
 * @param {string} tedValue - Procedure type from TED API
 * @returns {string} The code value for our dropdown
 */
function mapProcedureType(tedValue) {
  if (!tedValue) return '';
  // TED API returns lowercase eForms codes which match our codelist directly
  return tedValue.toLowerCase();
}
