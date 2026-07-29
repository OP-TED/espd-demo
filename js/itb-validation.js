/**
 * ITB Validation module — integrates with the Interoperability Test Bed
 * ESPD Validator REST API to validate generated ESPD XML.
 *
 * API: POST https://www.itb.ec.europa.eu/espd/api/validate
 * Proxied locally via: POST /api/itb/validate
 */

const ITB_PROXY_URL = '/api/itb/validate';

/**
 * Version fallback chain for ITB validation types.
 * The ITB validator may not support the latest ESPD-EDM version.
 */
const VERSION_FALLBACK = ['4_1_0', '3_3_0'];

/**
 * Resolve the ITB validation type string from document type.
 * @param {'request'|'response'} documentType
 * @returns {string} e.g. 'request_4_1_0'
 */
export function resolveValidationType(documentType) {
  if (documentType !== 'request' && documentType !== 'response') {
    return `request_${VERSION_FALLBACK[0]}`;
  }
  return `${documentType}_${VERSION_FALLBACK[0]}`;
}

/**
 * @typedef {object} ValidationItem
 * @property {string} description
 * @property {string} location - XPath location
 * @property {string} test - Schematron assertion
 * @property {'error'|'warning'|'info'} level
 */

/**
 * @typedef {object} ValidationResult
 * @property {boolean} success
 * @property {string} status - 'SUCCESS' | 'FAILURE' | 'ERROR'
 * @property {ValidationItem[]} errors
 * @property {ValidationItem[]} warnings
 * @property {number} errorCount
 * @property {number} warningCount
 * @property {string} message
 */

/**
 * Parse an ITB validation report JSON into a normalized ValidationResult.
 * Never throws — handles malformed input gracefully.
 * @param {*} report - Raw ITB API response (may be null/undefined/malformed)
 * @returns {ValidationResult}
 */
export function parseValidationReport(report) {
  if (!report || typeof report !== 'object') {
    return {
      success: false,
      status: 'ERROR',
      errors: [{ description: 'Invalid response from validation service', location: '', test: '', level: 'error' }],
      warnings: [],
      errorCount: 1,
      warningCount: 0,
      message: 'Unexpected API response format.'
    };
  }

  const result = report.result || 'FAILURE';
  const items = report.reportItems || [];
  const errors = [];
  const warnings = [];

  for (const item of items) {
    const normalized = {
      description: item.description || 'Unknown issue',
      location: item.location || '',
      test: item.test || '',
      level: item.level || 'error'
    };

    if (normalized.level === 'warning' || normalized.level === 'info') {
      warnings.push(normalized);
    } else {
      errors.push(normalized);
    }
  }

  return {
    success: result === 'SUCCESS',
    status: result,
    errors,
    warnings,
    errorCount: errors.length,
    warningCount: warnings.length,
    message: result === 'SUCCESS'
      ? 'Validation passed — the XML document is valid.'
      : `Validation failed with ${errors.length} error(s) and ${warnings.length} warning(s).`
  };
}

/**
 * Validate an ESPD XML string against the ITB validator.
 * Never throws — all errors are returned as a ValidationResult.
 * @param {string} xmlString - The raw XML to validate
 * @param {'request'|'response'} documentType - From role config
 * @returns {Promise<ValidationResult>}
 */
export async function validateXml(xmlString, documentType) {
  if (!xmlString) {
    return {
      success: false,
      status: 'ERROR',
      errors: [{ description: 'No XML content to validate. Please fill in the form first.', location: '', test: '', level: 'error' }],
      warnings: [],
      errorCount: 1,
      warningCount: 0,
      message: 'No XML content to validate.'
    };
  }

  try {
    // Base64-encode the XML (UTF-8 safe)
    const encoded = btoa(unescape(encodeURIComponent(xmlString)));
    const validationType = resolveValidationType(documentType);

    const payload = {
      contentToValidate: encoded,
      embeddingMethod: 'BASE64',
      validationType
    };

    const response = await fetch(ITB_PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return {
        success: false,
        status: 'ERROR',
        errors: [{ description: `Validation service returned HTTP ${response.status}.`, location: '', test: '', level: 'error' }],
        warnings: [],
        errorCount: 1,
        warningCount: 0,
        message: `Failed to reach the validation service (HTTP ${response.status}).`
      };
    }

    const report = await response.json();
    console.info('[ITB Validation] Request payload:', JSON.stringify({ validationType: payload.validationType, embeddingMethod: payload.embeddingMethod, contentLength: payload.contentToValidate.length }));
    console.info('[ITB Validation] Response:', JSON.stringify(report).substring(0, 2000));
    return parseValidationReport(report);

  } catch (err) {
    return {
      success: false,
      status: 'ERROR',
      errors: [{ description: `Network error: ${err.message || 'Unknown error'}`, location: '', test: '', level: 'error' }],
      warnings: [],
      errorCount: 1,
      warningCount: 0,
      message: 'Could not reach the validation service. Please check your network connection.'
    };
  }
}
