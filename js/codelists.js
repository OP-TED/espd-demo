/**
 * Codelists module — provides EU country codes, procedure types, and other enums.
 * Based on EU Vocabularies / ESPD-EDM codelists.
 */

/**
 * EU Member States + EEA countries (ISO 3166-1 alpha-3).
 * Source: EU Vocabularies authority table
 * http://publications.europa.eu/resource/authority/country
 * Matches ESPD-EDM/codelists/Country.gc
 */
export const COUNTRY_CODES = [
  { code: 'AUT', name: 'Austria' },
  { code: 'BEL', name: 'Belgium' },
  { code: 'BGR', name: 'Bulgaria' },
  { code: 'HRV', name: 'Croatia' },
  { code: 'CYP', name: 'Cyprus' },
  { code: 'CZE', name: 'Czechia' },
  { code: 'DNK', name: 'Denmark' },
  { code: 'EST', name: 'Estonia' },
  { code: 'FIN', name: 'Finland' },
  { code: 'FRA', name: 'France' },
  { code: 'DEU', name: 'Germany' },
  { code: 'GRC', name: 'Greece' },
  { code: 'HUN', name: 'Hungary' },
  { code: 'IRL', name: 'Ireland' },
  { code: 'ITA', name: 'Italy' },
  { code: 'LVA', name: 'Latvia' },
  { code: 'LTU', name: 'Lithuania' },
  { code: 'LUX', name: 'Luxembourg' },
  { code: 'MLT', name: 'Malta' },
  { code: 'NLD', name: 'Netherlands' },
  { code: 'POL', name: 'Poland' },
  { code: 'PRT', name: 'Portugal' },
  { code: 'ROU', name: 'Romania' },
  { code: 'SVK', name: 'Slovakia' },
  { code: 'SVN', name: 'Slovenia' },
  { code: 'ESP', name: 'Spain' },
  { code: 'SWE', name: 'Sweden' },
  // EEA
  { code: 'ISL', name: 'Iceland' },
  { code: 'LIE', name: 'Liechtenstein' },
  { code: 'NOR', name: 'Norway' },
  // Other commonly included
  { code: 'CHE', name: 'Switzerland' },
  { code: 'GBR', name: 'United Kingdom' },
  { code: 'ALB', name: 'Albania' },
  { code: 'BIH', name: 'Bosnia and Herzegovina' },
  { code: 'GEO', name: 'Georgia' },
  { code: 'MDA', name: 'Moldova' },
  { code: 'MNE', name: 'Montenegro' },
  { code: 'MKD', name: 'North Macedonia' },
  { code: 'SRB', name: 'Serbia' },
  { code: 'TUR', name: 'Türkiye' },
  { code: 'UKR', name: 'Ukraine' }
];

/**
 * Procedure types used in ESPD Part I.
 * Source: EU Vocabularies authority table
 * http://publications.europa.eu/resource/authority/procurement-procedure-type
 * Codes match eForms and TED API values.
 */
export const PROCEDURE_TYPES = [
  { code: 'open', name: 'Open procedure' },
  { code: 'restricted', name: 'Restricted procedure' },
  { code: 'neg-w-call', name: 'Negotiated with prior call for competition' },
  { code: 'comp-dial', name: 'Competitive dialogue' },
  { code: 'innovation', name: 'Innovation partnership' },
  { code: 'neg-wo-call', name: 'Negotiated without prior call for competition' },
  { code: 'comp-tend', name: 'Competitive tendering' }
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
