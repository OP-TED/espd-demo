/**
 * XML Export module — generates ESPD UBL XML from collected form state.
 * Based on the ESPD-EDM UBL 2.3 structure.
 */

import { getState, getAnswers } from './state.js';
import { getModel } from './model.js';

const UBL_NS = 'urn:oasis:names:specification:ubl:schema:xsd:QualificationApplicationResponse-2';
const CAC_NS = 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2';
const CBC_NS = 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2';
const ESPD_REQ_NS = 'urn:oasis:names:specification:ubl:schema:xsd:QualificationApplicationRequest-2';

/**
 * Generate ESPD XML document from the current state.
 * @returns {string} XML string
 */
export function generateXml() {
  const state = getState();
  const model = getModel();
  const answers = getAnswers();
  const role = state.role;

  if (role === 'ca') {
    return generateRequestXml(model, answers);
  } else {
    return generateResponseXml(model, answers);
  }
}

/**
 * Generate ESPD Request XML (Contracting Authority).
 */
function generateRequestXml(model, answers) {
  const now = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<espd:QualificationApplicationRequest
  xmlns:espd="${ESPD_REQ_NS}"
  xmlns:cac="${CAC_NS}"
  xmlns:cbc="${CBC_NS}">

  <cbc:UBLVersionID>2.3</cbc:UBLVersionID>
  <cbc:CustomizationID>urn:fdc:espd:ver3.1.0</cbc:CustomizationID>
  <cbc:ProfileID>ESPD-EDMv3.1.0</cbc:ProfileID>
  <cbc:ID schemeAgencyID="EU-COM-OP">${generateUUID()}</cbc:ID>
  <cbc:IssueDate>${now}</cbc:IssueDate>
  <cbc:IssueTime>${new Date().toISOString().split('T')[1].substring(0, 8)}</cbc:IssueTime>
  <cbc:QualificationApplicationTypeCode listID="QualificationApplicationType">ESPD Request</cbc:QualificationApplicationTypeCode>

  <!-- Contracting Authority -->
  <cac:ContractingParty>
    <cac:Party>
      <cac:PartyName>
        <cbc:Name>${escXml(answers['PI02_proc-procurer-id/QG1/Q1/R1/RV'] || '')}</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:CountrySubentityCode>${escXml(answers['PI02_proc-procurer-id/QG1/Q2/R1/RV'] || '')}</cbc:CountrySubentityCode>
      </cac:PostalAddress>
    </cac:Party>
  </cac:ContractingParty>

  <!-- Procurement Project -->
  <cac:ProcurementProject>
    <cbc:Name>${escXml(answers['PI03_proc-procedure-info/QG1/Q1/R1/RV'] || '')}</cbc:Name>
    <cbc:Description>${escXml(answers['PI03_proc-procedure-info/QG1/Q3/R1/RV'] || '')}</cbc:Description>
    <cbc:ProcurementTypeCode>${escXml(answers['PI03_proc-procedure-info/QG1/Q4/R1/RV'] || '')}</cbc:ProcurementTypeCode>
  </cac:ProcurementProject>

`;

  // Render criteria (Parts III, IV, V)
  xml += renderCriteriaXml(model, answers, 'request');

  xml += `</espd:QualificationApplicationRequest>`;
  return xml;
}

/**
 * Generate ESPD Response XML (Economic Operator).
 */
function generateResponseXml(model, answers) {
  const now = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<espd:QualificationApplicationResponse
  xmlns:espd="${UBL_NS}"
  xmlns:cac="${CAC_NS}"
  xmlns:cbc="${CBC_NS}">

  <cbc:UBLVersionID>2.3</cbc:UBLVersionID>
  <cbc:CustomizationID>urn:fdc:espd:ver3.1.0</cbc:CustomizationID>
  <cbc:ProfileID>ESPD-EDMv3.1.0</cbc:ProfileID>
  <cbc:ID schemeAgencyID="EU-COM-OP">${generateUUID()}</cbc:ID>
  <cbc:IssueDate>${now}</cbc:IssueDate>
  <cbc:IssueTime>${new Date().toISOString().split('T')[1].substring(0, 8)}</cbc:IssueTime>
  <cbc:QualificationApplicationTypeCode listID="QualificationApplicationType">ESPD Response</cbc:QualificationApplicationTypeCode>

  <!-- Economic Operator -->
  <cac:EconomicOperatorParty>
    <cac:Party>
      <cac:PartyName>
        <cbc:Name>${escXml(answers['EO01_eo-info-general/QG1/Q1/R1/RV'] || '')}</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>${escXml(answers['EO01_eo-info-general/QG1/Q4/R1/RV'] || '')}</cbc:StreetName>
        <cbc:CityName>${escXml(answers['EO01_eo-info-general/QG1/Q6/R1/RV'] || '')}</cbc:CityName>
        <cbc:PostalZone>${escXml(answers['EO01_eo-info-general/QG1/Q5/R1/RV'] || '')}</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>${escXml(answers['EO01_eo-info-general/QG1/Q7/R1/RV'] || '')}</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:Contact>
        <cbc:Telephone>${escXml(answers['EO01_eo-info-general/QG1/Q8/R1/RV'] || '')}</cbc:Telephone>
        <cbc:ElectronicMail>${escXml(answers['EO01_eo-info-general/QG1/Q9/R1/RV'] || '')}</cbc:ElectronicMail>
      </cac:Contact>
    </cac:Party>
  </cac:EconomicOperatorParty>

`;

  // Render criteria responses
  xml += renderCriteriaXml(model, answers, 'response');

  xml += `</espd:QualificationApplicationResponse>`;
  return xml;
}

/**
 * Render all criteria as XML elements.
 */
function renderCriteriaXml(model, answers, mode) {
  let xml = '';
  const parts = ['III', 'IV', 'V'];

  for (const partKey of parts) {
    const part = model.parts[partKey];
    if (!part) continue;

    for (const section of part.sections) {
      if (section.type === 'CRITERION') {
        xml += renderSingleCriterionXml(section, answers, mode);
      }
    }
  }

  return xml;
}

/**
 * Render a single criterion to XML.
 */
function renderSingleCriterionXml(section, answers, mode) {
  let xml = `  <cac:TenderingCriterion>
    <cbc:ID schemeID="CriteriaTaxonomy">${escXml(section.uuid || section.tag)}</cbc:ID>
    <cbc:Name>${escXml(section.name || section.description || '')}</cbc:Name>
    <cbc:Description>${escXml(section.description || '')}</cbc:Description>
`;

  // Render property groups
  if (section.components) {
    xml += renderPropertyGroupsXml(section.components, answers, mode);
  }

  xml += `  </cac:TenderingCriterion>\n`;
  return xml;
}

/**
 * Recursively render property groups and their questions/responses.
 */
function renderPropertyGroupsXml(components, answers, mode, indent = '    ') {
  let xml = '';

  for (const comp of components) {
    if (comp.type === 'QUESTION_GROUP' || comp.type === 'REQUIREMENT_GROUP') {
      xml += `${indent}<cac:TenderingCriterionPropertyGroup>
${indent}  <cbc:ID>${escXml(comp.responsepath || comp.requestpath || '')}</cbc:ID>
`;
      if (comp.components) {
        xml += renderPropertiesXml(comp.components, answers, mode, indent + '  ');
      }
      xml += `${indent}</cac:TenderingCriterionPropertyGroup>\n`;
    } else if (comp.type === 'QUESTION_SUBGROUP' || comp.type === 'REQUIREMENT_SUBGROUP') {
      xml += `${indent}<cac:SubsidiaryTenderingCriterionPropertyGroup>
${indent}  <cbc:ID>${escXml(comp.responsepath || comp.requestpath || '')}</cbc:ID>
`;
      if (comp.components) {
        xml += renderPropertiesXml(comp.components, answers, mode, indent + '  ');
      }
      xml += `${indent}</cac:SubsidiaryTenderingCriterionPropertyGroup>\n`;
    }
  }

  return xml;
}

/**
 * Render properties (questions/requirements) as XML.
 */
function renderPropertiesXml(components, answers, mode, indent) {
  let xml = '';

  for (const comp of components) {
    if (comp.type === 'QUESTION') {
      xml += `${indent}<cac:TenderingCriterionProperty>
${indent}  <cbc:ID>${escXml(comp.responsepath || comp.requestpath || '')}</cbc:ID>
${indent}  <cbc:Description>${escXml(comp.description || '')}</cbc:Description>
`;

      if (mode === 'response' && comp.contentpath) {
        const value = answers[comp.contentpath];
        if (value !== undefined && value !== null && value !== '') {
          xml += renderResponseValueXml(comp.propertydatatype, value, indent + '  ');
        }
      }

      xml += `${indent}</cac:TenderingCriterionProperty>\n`;
    } else if (comp.type === 'REQUIREMENT') {
      xml += `${indent}<cac:TenderingCriterionProperty>
${indent}  <cbc:ID>${escXml(comp.responsepath || comp.requestpath || '')}</cbc:ID>
${indent}  <cbc:Description>${escXml(comp.description || '')}</cbc:Description>
${indent}  <cbc:TypeCode>REQUIREMENT</cbc:TypeCode>
${indent}</cac:TenderingCriterionProperty>\n`;
    } else if (comp.type === 'QUESTION_SUBGROUP' || comp.type === 'QUESTION_GROUP' ||
               comp.type === 'REQUIREMENT_GROUP' || comp.type === 'REQUIREMENT_SUBGROUP') {
      xml += renderPropertyGroupsXml([comp], answers, mode, indent);
    }
  }

  return xml;
}

/**
 * Render a response value element based on data type.
 */
function renderResponseValueXml(datatype, value, indent) {
  let xml = `${indent}<cac:ResponseValue>\n`;

  switch (datatype) {
    case 'INDICATOR':
      xml += `${indent}  <cbc:ResponseIndicator>${value === 'true' || value === true ? 'true' : 'false'}</cbc:ResponseIndicator>\n`;
      break;
    case 'DATE':
      xml += `${indent}  <cbc:ResponseDate>${escXml(String(value))}</cbc:ResponseDate>\n`;
      break;
    case 'AMOUNT':
    case 'MINIMUM_AMOUNT':
      if (typeof value === 'object') {
        xml += `${indent}  <cbc:ResponseAmount currencyID="${escXml(value.currency || 'EUR')}">${escXml(String(value.amount || '0'))}</cbc:ResponseAmount>\n`;
      } else {
        xml += `${indent}  <cbc:ResponseAmount currencyID="EUR">${escXml(String(value))}</cbc:ResponseAmount>\n`;
      }
      break;
    case 'QUANTITY_INTEGER':
    case 'MINIMUM_QUANTITY_INTEGER':
      xml += `${indent}  <cbc:ResponseQuantity unitCode="INTEGER">${escXml(String(value))}</cbc:ResponseQuantity>\n`;
      break;
    case 'QUANTITY':
    case 'MINIMUM_QUANTITY':
    case 'QUANTITY_YEAR':
    case 'MINIMUM_QUANTITY_YEAR':
      xml += `${indent}  <cbc:ResponseQuantity>${escXml(String(value))}</cbc:ResponseQuantity>\n`;
      break;
    case 'PERCENTAGE':
      xml += `${indent}  <cbc:ResponseNumeric>${escXml(String(value))}</cbc:ResponseNumeric>\n`;
      break;
    case 'URL':
      xml += `${indent}  <cbc:ResponseURI>${escXml(String(value))}</cbc:ResponseURI>\n`;
      break;
    case 'PERIOD':
      if (typeof value === 'object') {
        xml += `${indent}  <cac:Period>\n`;
        if (value.start) xml += `${indent}    <cbc:StartDate>${escXml(value.start)}</cbc:StartDate>\n`;
        if (value.end) xml += `${indent}    <cbc:EndDate>${escXml(value.end)}</cbc:EndDate>\n`;
        xml += `${indent}  </cac:Period>\n`;
      }
      break;
    case 'CODE_COUNTRY':
    case 'CODE':
    case 'CODE_BOOLEAN':
      xml += `${indent}  <cbc:ResponseCode>${escXml(String(value))}</cbc:ResponseCode>\n`;
      break;
    default:
      xml += `${indent}  <cbc:Description>${escXml(String(typeof value === 'object' ? JSON.stringify(value) : value))}</cbc:Description>\n`;
      break;
  }

  xml += `${indent}</cac:ResponseValue>\n`;
  return xml;
}

/**
 * Trigger download of the generated XML file.
 */
export function downloadXml() {
  const xml = generateXml();
  const state = getState();
  const filename = state.role === 'ca' ? 'espd-request.xml' : 'espd-response.xml';

  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generate a UUID v4.
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * XML escape utility.
 */
function escXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
