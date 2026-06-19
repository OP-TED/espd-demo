/**
 * Codelists module — provides EU country codes, procedure types, and other enums.
 * Based on EU Vocabularies / ESPD-EDM codelists.
 */

/**
 * EU Member States + EEA countries (ISO 3166-1 alpha-2).
 */
export const COUNTRY_CODES = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czechia' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'GR', name: 'Greece' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MT', name: 'Malta' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RO', name: 'Romania' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  // EEA
  { code: 'IS', name: 'Iceland' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'NO', name: 'Norway' },
  // Other commonly included
  { code: 'CH', name: 'Switzerland' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'AL', name: 'Albania' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'GE', name: 'Georgia' },
  { code: 'MD', name: 'Moldova' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MK', name: 'North Macedonia' },
  { code: 'RS', name: 'Serbia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'UA', name: 'Ukraine' }
];

/**
 * Procedure types used in ESPD Part I.
 */
export const PROCEDURE_TYPES = [
  { code: 'OPEN', name: 'Open procedure' },
  { code: 'RESTRICTED', name: 'Restricted procedure' },
  { code: 'COMPETITIVE_NEGOTIATION', name: 'Competitive procedure with negotiation' },
  { code: 'COMPETITIVE_DIALOGUE', name: 'Competitive dialogue' },
  { code: 'INNOVATION_PARTNERSHIP', name: 'Innovation partnership' },
  { code: 'NEGOTIATED_WO_PUBLICATION', name: 'Negotiated procedure without prior publication' },
  { code: 'OTHER', name: 'Other' }
];

/**
 * Boolean codelist for CODE_BOOLEAN property data type.
 */
export const BOOLEAN_CODES = [
  { code: 'TRUE', name: 'Yes' },
  { code: 'FALSE', name: 'No' },
  { code: 'NOT_APPLICABLE', name: 'Not applicable' }
];

/**
 * Currency codes (most common in EU procurement).
 */
export const CURRENCY_CODES = [
  { code: 'EUR', name: 'Euro (€)' },
  { code: 'BGN', name: 'Bulgarian Lev (лв)' },
  { code: 'CZK', name: 'Czech Koruna (Kč)' },
  { code: 'DKK', name: 'Danish Krone (kr)' },
  { code: 'GBP', name: 'British Pound (£)' },
  { code: 'HUF', name: 'Hungarian Forint (Ft)' },
  { code: 'PLN', name: 'Polish Zloty (zł)' },
  { code: 'RON', name: 'Romanian Leu (lei)' },
  { code: 'SEK', name: 'Swedish Krona (kr)' },
  { code: 'CHF', name: 'Swiss Franc (CHF)' },
  { code: 'NOK', name: 'Norwegian Krone (kr)' },
  { code: 'ISK', name: 'Icelandic Króna (kr)' },
  { code: 'USD', name: 'US Dollar ($)' }
];

/**
 * Get a codelist by the property data type name.
 */
export function getCodelist(propertydatatype) {
  switch (propertydatatype) {
    case 'CODE_COUNTRY':
      return COUNTRY_CODES;
    case 'CODE':
      return PROCEDURE_TYPES;
    case 'CODE_BOOLEAN':
      return BOOLEAN_CODES;
    default:
      return null;
  }
}
