/**
 * XML Import module — parses ESPD Request/Response XML to pre-fill form state.
 * Supports basic UBL structure parsing.
 */

import { setRole, setAnswers, setCurrentStep } from './state.js';

/**
 * Import an ESPD XML file and populate the form state.
 * @param {File} file - The XML file to import
 * @returns {Promise<{role: string, success: boolean, message: string}>}
 */
export async function importXmlFile(file) {
  try {
    const text = await file.text();
    return importXmlString(text);
  } catch (e) {
    return { role: null, success: false, message: `Failed to read file: ${e.message}` };
  }
}

/**
 * Import from an XML string.
 */
export function importXmlString(xmlString) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'application/xml');

    // Check for parsing errors
    const parseError = doc.querySelector('parsererror');
    if (parseError) {
      return { role: null, success: false, message: 'Invalid XML format' };
    }

    // Determine document type (Request or Response)
    const root = doc.documentElement;
    const localName = root.localName || root.tagName;

    let role;
    if (localName.includes('Request')) {
      // Detect specific buyer role from PartyTypeCode
      role = detectBuyerRole(doc);
    } else if (localName.includes('Response')) {
      role = 'eo';
    } else {
      // Try the QualificationApplicationTypeCode element
      const typeCode = doc.querySelector('QualificationApplicationTypeCode');
      if (typeCode) {
        if (typeCode.textContent.includes('Request')) {
          role = detectBuyerRole(doc);
        } else {
          role = 'eo';
        }
      } else {
        return { role: null, success: false, message: 'Cannot determine ESPD document type' };
      }
    }

    setRole(role);
    setCurrentStep(0);

    // Extract answers from the XML
    const answers = extractAnswers(doc, role);
    setAnswers(answers);

    const isRequest = role === 'contracting-authority' || role === 'contracting-entity';
    return {
      role,
      success: true,
      message: `Successfully imported ESPD ${isRequest ? 'Request' : 'Response'} with ${Object.keys(answers).length} data fields.`
    };
  } catch (e) {
    return { role: null, success: false, message: `Import error: ${e.message}` };
  }
}

/**
 * Detect the specific buyer role from a Request XML by examining PartyTypeCode.
 * Falls back to 'contracting-authority' if the code cannot be determined.
 * @param {Document} doc - The parsed XML document
 * @returns {string} The role id ('contracting-authority' or 'contracting-entity')
 */
function detectBuyerRole(doc) {
  const partyTypeCode = getTextContent(doc, 'ContractingParty ContractingPartyType PartyTypeCode');
  if (partyTypeCode === 'cont-ent') {
    return 'contracting-entity';
  }
  // Default to contracting-authority (covers 'cont-auth' and missing element)
  return 'contracting-authority';
}

/**
 * Extract answers from a parsed XML document.
 */
function extractAnswers(doc, role) {
  const answers = {};

  if (role === 'contracting-authority' || role === 'contracting-entity') {
    extractRequestAnswers(doc, answers);
  } else {
    extractResponseAnswers(doc, answers);
  }

  return answers;
}

/**
 * Extract answers from an ESPD Request document.
 */
function extractRequestAnswers(doc, answers) {
  // Contracting Authority info
  const partyName = getTextContent(doc, 'ContractingParty Party PartyName Name');
  if (partyName) answers['PI02_proc-procurer-id/QG1/Q1/R1/RV'] = partyName;

  const country = getTextContent(doc, 'ContractingParty Party PostalAddress CountrySubentityCode');
  if (country) answers['PI02_proc-procurer-id/QG1/Q2/R1/RV'] = country;

  // Procurement project
  const projName = getTextContent(doc, 'ProcurementProject Name');
  if (projName) answers['PI03_proc-procedure-info/QG1/Q1/R1/RV'] = projName;

  const projDesc = getTextContent(doc, 'ProcurementProject Description');
  if (projDesc) answers['PI03_proc-procedure-info/QG1/Q3/R1/RV'] = projDesc;

  const procType = getTextContent(doc, 'ProcurementProject ProcurementTypeCode');
  if (procType) answers['PI03_proc-procedure-info/QG1/Q4/R1/RV'] = procType;
}

/**
 * Extract answers from an ESPD Response document.
 */
function extractResponseAnswers(doc, answers) {
  // Economic Operator info
  const eoName = getTextContent(doc, 'EconomicOperatorParty Party PartyName Name');
  if (eoName) answers['EO01_eo-info-general/QG1/Q1/R1/RV'] = eoName;

  const street = getTextContent(doc, 'EconomicOperatorParty Party PostalAddress StreetName');
  if (street) answers['EO01_eo-info-general/QG1/Q4/R1/RV'] = street;

  const city = getTextContent(doc, 'EconomicOperatorParty Party PostalAddress CityName');
  if (city) answers['EO01_eo-info-general/QG1/Q6/R1/RV'] = city;

  const postal = getTextContent(doc, 'EconomicOperatorParty Party PostalAddress PostalZone');
  if (postal) answers['EO01_eo-info-general/QG1/Q5/R1/RV'] = postal;

  const countryCode = getTextContent(doc, 'EconomicOperatorParty Party PostalAddress Country IdentificationCode');
  if (countryCode) answers['EO01_eo-info-general/QG1/Q7/R1/RV'] = countryCode;

  const phone = getTextContent(doc, 'EconomicOperatorParty Party Contact Telephone');
  if (phone) answers['EO01_eo-info-general/QG1/Q8/R1/RV'] = phone;

  const email = getTextContent(doc, 'EconomicOperatorParty Party Contact ElectronicMail');
  if (email) answers['EO01_eo-info-general/QG1/Q9/R1/RV'] = email;

  // Extract criteria responses
  extractCriterionResponses(doc, answers);
}

/**
 * Extract criterion response values from the XML.
 */
function extractCriterionResponses(doc, answers) {
  // Find all TenderingCriterionResponse elements
  const responses = doc.querySelectorAll('TenderingCriterionResponse, *|TenderingCriterionResponse');
  
  for (const response of responses) {
    const id = getTextContent(response, 'ValidatedCriterionPropertyID') ||
               getTextContent(response, 'ID');
    if (!id) continue;

    // Try to map the ID back to a contentpath
    const responseValue = response.querySelector('ResponseValue, *|ResponseValue');
    if (!responseValue) continue;

    const value = extractResponseValue(responseValue);
    if (value !== null && id) {
      // Store with the ID as key — the app will try to map these
      answers[id] = value;
    }
  }
}

/**
 * Extract the value from a ResponseValue element.
 */
function extractResponseValue(responseValueEl) {
  const indicator = getTextContent(responseValueEl, 'ResponseIndicator');
  if (indicator !== null) return indicator;

  const date = getTextContent(responseValueEl, 'ResponseDate');
  if (date !== null) return date;

  const amount = responseValueEl.querySelector('ResponseAmount, *|ResponseAmount');
  if (amount) {
    return {
      amount: amount.textContent.trim(),
      currency: amount.getAttribute('currencyID') || 'EUR'
    };
  }

  const quantity = getTextContent(responseValueEl, 'ResponseQuantity');
  if (quantity !== null) return quantity;

  const numeric = getTextContent(responseValueEl, 'ResponseNumeric');
  if (numeric !== null) return numeric;

  const uri = getTextContent(responseValueEl, 'ResponseURI');
  if (uri !== null) return uri;

  const code = getTextContent(responseValueEl, 'ResponseCode');
  if (code !== null) return code;

  const desc = getTextContent(responseValueEl, 'Description');
  if (desc !== null) return desc;

  return null;
}

/**
 * Utility: get text content by traversing a space-separated path of local names.
 */
function getTextContent(context, selectorPath) {
  const parts = selectorPath.split(' ');
  let current = context;

  for (const part of parts) {
    if (!current) return null;
    // Try both with and without namespace
    let found = current.querySelector(part);
    if (!found) {
      // Try namespace-agnostic approach
      const children = current.children;
      for (let i = 0; i < children.length; i++) {
        const localName = children[i].localName || children[i].tagName.split(':').pop();
        if (localName === part) {
          found = children[i];
          break;
        }
      }
    }
    current = found;
  }

  return current ? current.textContent.trim() : null;
}
