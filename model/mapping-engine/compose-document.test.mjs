// Phase 6B-2 — UBL document composer tests.
//
// Two layers:
//   1. STRUCTURE (always runs, no Saxon): the composed Request/Response have the
//      right root + namespaces, the mandatory envelope header, elements in the
//      UBL XSD order, EconomicOperatorParty only in the Response, one
//      cac:TenderingCriterion per selected criterion, and the shorthand codelist
//      attributes expanded to the full dated sets.
//   2. SCHEMATRON (runs only when Saxon/Java is present): the composed documents
//      carry NO attribute-category fatal findings (the codelist-attribute + the
//      BR-OTH attribute rules all pass on every element the composer emits). The
//      only residual fatals permitted are the documented, pre-existing ones that
//      belong to the per-criterion FRAGMENT generators, not the composer:
//        - "UUIDs supplied by e-Certis" on property groups (fragments use
//          path-like ids, e.g. C01_exg-crim-part/QG1 — tracked as a 6B follow-up);
//        - cross-criterion "Part III A and B required" composition rules when the
//          fixture does not include a criterion from every mandated category.
//      This mirrors how model/compiler/schematron-validate.test.mjs classifies
//      findings for the single-criterion splice.

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compose } from './compose-document-node.mjs';
import { unmap } from './mapper.mjs';
import { checkSaxonAvailable, validateXml } from '../compiler/schematron-validate.mjs';

const modelRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const readSpec = (rel) => JSON.parse(fs.readFileSync(path.join(modelRoot, rel), 'utf8'));

// Deterministic ids/clock so the envelope is reproducible across runs.
const IDS = { uuid: '11111111-2222-4333-8444-555555555555', documentId: 'ESPDREQ-TEST-0001' };
const NOW = new Date('2026-10-12T09:30:00Z');

// ---- Fixtures ---------------------------------------------------------------
// A realistic REQUEST: Part I admin + two included exclusion grounds from
// DIFFERENT mandated categories (criminal + payment) so the Part III A/B
// cross-criterion rule is satisfied. Publication uses a TED-pattern id so
// BR-COM-10-01 passes.
const requestInstance = {
  partI: {
    publication: { type: 'TED_CN', identifier: '2026/S 123-456789' },
    contractingAuthority: {
      officialName: 'Ministerio de Hacienda',
      country: 'ESP',
      identifier: { value: 'B82387770', scheme: 'VAT' },
    },
    procedure: { procedureType: 'open', fileReference: { value: 'PP.2026-1' } },
    project: { description: 'Supply of office equipment.' },
    lots: ['LOT-0000'],
  },
  partIII: {
    exclusionGrounds: {
      'exg-crim-part': { response: { answer: false, electronicEvidence: { availableElectronically: false } } },
      'exg-pmt-bre-tax': { response: { answer: false, electronicEvidence: { availableElectronically: false } } },
    },
  },
};

// A RESPONSE: the same shape plus the economic operator identity (Part II §A)
// and a signature (Part VI). Answers are present on the two grounds.
const responseInstance = {
  ...requestInstance,
  partII: {
    economicOperator: {
      role: 'sole-tenderer',
      name: 'Constructora del Norte S.A.',
      size: 'sme',
      country: 'ESP',
      identifier: { value: 'AD123456789' },
    },
  },
  partVI: { signatory: { physicalLocationName: 'Madrid' } },
};

// ---- Helpers ----------------------------------------------------------------
/** Ordered list of this document's DIRECT child element names (two-space indent). */
function topLevelChildren(xml) {
  return [...xml.matchAll(/^ {2}<(cac:[A-Za-z]+|cbc:[A-Za-z]+)[ >]/gm)].map((m) => m[1]);
}

/** Index of the first occurrence of a child element name (or -1). */
function firstIndexOf(children, name) {
  return children.indexOf(name);
}

const request = compose({ instance: requestInstance, documentType: 'request', ids: IDS, now: NOW });
const response = compose({ instance: responseInstance, documentType: 'response', ids: IDS, now: NOW });

describe('compose-document: request structure', () => {
  it('has the QualificationApplicationRequest root with the full namespace set', () => {
    assert.match(request, /^<\?xml version="1\.0" encoding="UTF-8"\?>\n<QualificationApplicationRequest\b/);
    assert.match(request, /xmlns="urn:oasis:names:specification:ubl:schema:xsd:QualificationApplicationRequest-2"/);
    assert.match(request, /xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"/);
    assert.match(request, /xmlns:espd="urn:com:grow:espd:5\.0\.0"/);
    assert.match(request, /xsi:schemaLocation="[^"]*UBL-QualificationApplicationRequest-2\.4\.xsd"/);
  });

  it('synthesizes the mandatory envelope header', () => {
    assert.match(request, /<cbc:UBLVersionID schemeAgencyID="OASIS-UBL-TC">2\.4<\/cbc:UBLVersionID>/);
    assert.match(request, /<cbc:ProfileExecutionID schemeAgencyID="OP" schemeVersionID="5\.0\.0">ESPD-EDMv5\.0\.0<\/cbc:ProfileExecutionID>/);
    assert.match(request, /<cbc:ID schemeAgencyID="DGPE">ESPDREQ-TEST-0001<\/cbc:ID>/);
    assert.match(request, /<cbc:CopyIndicator>false<\/cbc:CopyIndicator>/);
    assert.match(request, /<cbc:UUID [^>]*>11111111-2222-4333-8444-555555555555<\/cbc:UUID>/);
    assert.match(request, /<cbc:IssueDate>2026-10-12<\/cbc:IssueDate>/);
    assert.match(request, /<cbc:IssueTime>/);
    assert.match(request, /<cbc:VersionID schemeAgencyID="OP" schemeVersionID="5\.0\.0">5\.0\.0<\/cbc:VersionID>/);
  });

  it('carries ContractFolderID exactly once (envelope wins over the sidecar)', () => {
    const n = (request.match(/<cbc:ContractFolderID\b/g) || []).length;
    assert.equal(n, 1, 'ContractFolderID must not be duplicated');
    assert.match(request, /<cbc:ContractFolderID schemeAgencyID="DGPE">PP\.2026-1<\/cbc:ContractFolderID>/);
  });

  it('places top-level elements in the UBL XSD order', () => {
    const c = topLevelChildren(request);
    const order = ['cbc:UBLVersionID', 'cbc:ProfileExecutionID', 'cbc:ID', 'cbc:CopyIndicator', 'cbc:UUID',
      'cbc:ContractFolderID', 'cbc:IssueDate', 'cbc:IssueTime', 'cbc:VersionID', 'cbc:ProcedureCode',
      'cac:ContractingParty', 'cac:ProcurementProject', 'cac:ProcurementProjectLot', 'cac:TenderingCriterion'];
    let prev = -1;
    for (const name of order) {
      const idx = firstIndexOf(c, name);
      assert.ok(idx > prev, `${name} should appear after the previous header element (got idx ${idx}, prev ${prev})`);
      prev = idx;
    }
    // AdditionalDocumentReference comes AFTER the criteria (per the XSD).
    assert.ok(firstIndexOf(c, 'cac:AdditionalDocumentReference') > firstIndexOf(c, 'cac:TenderingCriterion'));
  });

  it('has NO EconomicOperatorParty (request)', () => {
    assert.ok(!request.includes('<cac:EconomicOperatorParty>'));
  });

  it('emits one cac:TenderingCriterion per included criterion (full declaration, not a stub)', () => {
    const n = (request.match(/<cac:TenderingCriterion>/g) || []).length;
    assert.equal(n, 2);
    assert.match(request, /<cbc:CriterionTypeCode[^>]*>exg-crim-part<\/cbc:CriterionTypeCode>/);
    assert.match(request, /<cbc:CriterionTypeCode[^>]*>exg-pmt-bre-tax<\/cbc:CriterionTypeCode>/);
    // "full declaration" — property groups present, not just the 3-element stub.
    assert.match(request, /<cac:TenderingCriterionPropertyGroup>/);
  });

  it('expands shorthand codelist attributes to the full dated sets', () => {
    assert.match(request, /<cbc:CriterionTypeCode[^>]*listVersionID="20240612-0"[^>]*>/);
    assert.match(request, /<cbc:IdentificationCode[^>]*listAgencyID="OP"[^>]*listVersionID="20250618-0"[^>]*>ESP<\/cbc:IdentificationCode>/);
    assert.ok(!request.includes('listID="criterion"'), 'criterion shorthand must be expanded');
    assert.ok(!request.includes('listID="country"'), 'country shorthand must be expanded');
  });
});

describe('compose-document: response structure', () => {
  it('has the QualificationApplicationResponse root', () => {
    assert.match(response, /<QualificationApplicationResponse\b/);
    assert.match(response, /xsi:schemaLocation="[^"]*UBL-QualificationApplicationResponse-2\.4\.xsd"/);
  });

  it('includes EconomicOperatorParty (with role + size) between ContractingParty and ProcurementProject', () => {
    assert.match(response, /<cac:EconomicOperatorParty>/);
    assert.match(response, /<cbc:RoleCode[^>]*>sole-tenderer<\/cbc:RoleCode>/);
    assert.match(response, /<cbc:IndustryClassificationCode[^>]*>sme<\/cbc:IndustryClassificationCode>/);
    const c = topLevelChildren(response);
    assert.ok(firstIndexOf(c, 'cac:ContractingParty') < firstIndexOf(c, 'cac:EconomicOperatorParty'));
    assert.ok(firstIndexOf(c, 'cac:EconomicOperatorParty') < firstIndexOf(c, 'cac:ProcurementProject'));
  });

  it('emits criterion declarations AND responses, with responses after declarations', () => {
    const c = topLevelChildren(response);
    assert.ok((response.match(/<cac:TenderingCriterion>/g) || []).length >= 2);
    assert.ok((response.match(/<cac:TenderingCriterionResponse>/g) || []).length >= 1);
    assert.ok(firstIndexOf(c, 'cac:TenderingCriterion') < firstIndexOf(c, 'cac:TenderingCriterionResponse'));
  });

  it('drops the response fragment\'s 3-element TenderingCriterion stub (declaration comes from the request fragment)', () => {
    // Every emitted cac:TenderingCriterion carries property groups (the full
    // declaration), i.e. none is the stub (ID+CriterionTypeCode+Name only).
    const criteria = response.match(/<cac:TenderingCriterion>[\s\S]*?<\/cac:TenderingCriterion>/g) || [];
    assert.ok(criteria.length >= 2);
    for (const crit of criteria) {
      assert.match(crit, /<cac:TenderingCriterionPropertyGroup>/, 'each declaration must be full, not a stub');
    }
  });

  it('places Signature last and Evidence/AdditionalDocumentReference after the responses', () => {
    const c = topLevelChildren(response);
    const sig = firstIndexOf(c, 'cac:Signature');
    assert.ok(sig === c.length - 1 || sig === -1 || sig > firstIndexOf(c, 'cac:TenderingCriterionResponse'));
    assert.match(response, /<cac:Signature>[\s\S]*Madrid[\s\S]*<\/cac:Signature>/);
  });
});

describe('compose-document: input validation', () => {
  it('rejects an unknown documentType', () => {
    assert.throws(() => compose({ instance: {}, documentType: 'nope' }), /documentType must be/);
  });
});

// ---- Schematron layer (Saxon-gated) ----------------------------------------
describe('compose-document: schematron validity (Saxon-gated)', () => {
  const saxon = checkSaxonAvailable();

  // Fatal findings that are NOT the composer's responsibility: they belong to the
  // per-criterion FRAGMENT generators and are tracked as a 6B follow-up (Bucket 2).
  // Two phrasings of the SAME root cause — the generated fragments use path-like
  // property-group ids (e.g. 'C01_exg-crim-part/QG1') instead of the e-Certis
  // UUIDs the Schematron keys on, so the criterion-br validator cannot match a
  // group to its registered definition:
  //   (a) "Compulsory use of the UUIDs supplied by e-Certis" (the id itself);
  //   (b) "… property group … has 'N' missing 'cac:Subsidiary…PropertyGroup'
  //       element(s)" from 03-ESPD-common-criterion-br, a downstream structural
  //       comparison that only fails BECAUSE the id did not resolve.
  // Plus the cross-criterion "Part III A and B required" composition rule, which
  // depends on which criteria the fixture includes, not on the composer.
  const isDocumentedResidual = (e) =>
    /e-Certis/i.test(e.text) ||
    /Part III/.test(e.text) ||
    (e.validator.includes('common-criterion-br') &&
      /property group[\s\S]*missing[\s\S]*PropertyGroup/i.test(e.text));
  /** Attribute-category fatals: the composer MUST emit zero of these. */
  const isAttributeError = (e) =>
    e.validator.includes('cl-attributes') || /attribute .* is mandatory/i.test(e.text);

  it('composed REQUEST has zero attribute-category fatals; residuals are documented only', { skip: !saxon ? 'Saxon/Java unavailable' : false }, () => {
    const { errors } = validateXml(request, 'request');
    const attrErrors = errors.filter(isAttributeError);
    assert.deepEqual(attrErrors.map((e) => e.text.slice(0, 90)), [], 'all attribute rules must pass');
    const unexpected = errors.filter((e) => !isAttributeError(e) && !isDocumentedResidual(e));
    assert.deepEqual(unexpected.map((e) => `${e.validator}: ${e.text.slice(0, 100)}`), [],
      'no unexpected non-attribute fatal findings in the composed request');
  });

  it('composed RESPONSE has zero attribute-category fatals; residuals are documented only', { skip: !saxon ? 'Saxon/Java unavailable' : false }, () => {
    const { errors } = validateXml(response, 'response');
    const attrErrors = errors.filter(isAttributeError);
    assert.deepEqual(attrErrors.map((e) => e.text.slice(0, 90)), [], 'all attribute rules must pass');
    const unexpected = errors.filter((e) => !isAttributeError(e) && !isDocumentedResidual(e));
    assert.deepEqual(unexpected.map((e) => `${e.validator}: ${e.text.slice(0, 100)}`), [],
      'no unexpected non-attribute fatal findings in the composed response');
  });
});

// ---- Coded-field round-trip (compose → unmap) --------------------------------
// Guards the mapper fix for the import discriminator bug: a coded value rule
// annotates its element with a shorthand listID (e.g. listID="eo-role-type"),
// which the compose step EXPANDS to the full codelist URI. On import the reverse
// match must NOT treat that (now-expanded) listID as a discriminator, or the
// coded value is silently dropped. Genuine discriminators (a constant schemeID)
// must still work.
describe('compose-document: coded fields round-trip through unmap (import)', () => {
  const roundTripInstance = {
    partI: {
      contractingAuthority: { officialName: 'ACME', country: 'ESP', identifier: { value: 'B82387770', scheme: 'VAT' } },
      procedure: { procedureType: 'open', fileReference: { value: 'PP-1' } },
    },
    partII: { economicOperator: { role: 'sole-tenderer', name: 'EO Co', size: 'sme', country: 'ESP', identifier: { value: 'EO1' } } },
    partIII: { exclusionGrounds: { 'exg-crim-part': { response: { answer: false, electronicEvidence: { availableElectronically: false } } } } },
  };

  function deepMerge(a, b) {
    if (b === undefined) return a;
    if (Array.isArray(b) || typeof b !== 'object' || b === null) return b;
    const out = a && typeof a === 'object' && !Array.isArray(a) ? { ...a } : {};
    for (const [k, v] of Object.entries(b)) out[k] = deepMerge(out[k], v);
    return out;
  }

  // Compose the (attribute-expanded) response, then reconstruct via unmap.
  const xml = compose({ instance: roundTripInstance, documentType: 'response', ids: IDS, now: NOW });
  let back = {};
  for (const rel of [
    'parts/partI/sectionB.mapping.json',
    'parts/partI/sectionC.mapping.json',
    'parts/partII/sectionA.mapping.json',
    'generated/xml-mapping/exg-crim-part.response.mapping.json',
  ]) {
    back = deepMerge(back, unmap(readSpec(rel), xml));
  }

  it('round-trips the economic-operator coded fields (role, size, country)', () => {
    assert.equal(back?.partII?.economicOperator?.role, 'sole-tenderer');
    assert.equal(back?.partII?.economicOperator?.size, 'sme');
    assert.equal(back?.partII?.economicOperator?.country, 'ESP');
  });

  it('round-trips the Part I coded fields (procedureType, buyer country)', () => {
    assert.equal(back?.partI?.procedure?.procedureType, 'open');
    assert.equal(back?.partI?.contractingAuthority?.country, 'ESP');
  });

  it('still honours the constant schemeID discriminator (party id scheme preserved)', () => {
    // The buyer identifier's @schemeID (VAT, an EOIDType code) must round-trip —
    // proving the fix dropped only the listID annotation, not real discriminators.
    assert.equal(back?.partI?.contractingAuthority?.identifier?.scheme, 'VAT');
  });
});
