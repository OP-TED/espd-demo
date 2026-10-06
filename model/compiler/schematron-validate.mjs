// Task 3.4 — ESPD Schematron validation of generated XML.
//
// Runs the SHIPPED, pre-compiled Schematron XSLT validators (ESPDRequest/xsl/*
// and ESPDResponse/xsl/*) against a given XML file using the bundled Saxon-HE
// jar, then parses the SVRL output for failed assertions. Fatal (flag="fatal")
// findings are errors; others are warnings (R12).
//
// Requires: Java on PATH + espd-validation-schematron/common/lib/saxon-he-12.5.jar.
// Callers should checkSaxonAvailable() and skip gracefully if absent.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = path.dirname(fileURLToPath(import.meta.url));
const SCH_ROOT = path.resolve(here, '..', '..', '..', 'espd-validation-schematron');
const SAXON = path.join(SCH_ROOT, 'common', 'lib', 'saxon-he-12.5.jar');

// The pre-compiled validator XSLs, per document kind (from espd-schematron.sh
// PHASE 3). Paths are relative to SCH_ROOT.
const VALIDATORS = {
  request: [
    'ESPDRequest/xsl/01-ESPD-codelist-values.xsl',
    'ESPDRequest/xsl/02-ESPD-req-cardinality-br.xsl',
    'ESPDRequest/xsl/04-ESPD-common-other-br.xsl',
    'ESPDRequest/xsl/05-ESPD-req-procurer-br.xsl',
    'ESPDRequest/xsl/04-ESPD-req-other-br.xsl',
    'ESPDRequest/xsl/03-ESPD-common-criterion-br.xsl',
    'ESPDRequest/xsl/03-ESPD-req-criterion-br.xsl',
    'ESPDRequest/xsl/01-ESPD-common-cl-attributes.xsl',
    'ESPDRequest/xsl/05-ESPD-req-specific-br.xsl',
    'ESPDRequest/xsl/01-ESPD-common-cl-values-restrictions.xsl',
  ],
  response: [
    'ESPDResponse/xsl/01-ESPD-codelist-values.xsl',
    'ESPDResponse/xsl/02-ESPD-resp-cardinality-br.xsl',
    'ESPDResponse/xsl/04-ESPD-common-other-br.xsl',
    'ESPDResponse/xsl/05-ESPD-resp-eo-br.xsl',
    'ESPDResponse/xsl/04-ESPD-resp-other-br.xsl',
    'ESPDResponse/xsl/03-ESPD-common-criterion-br.xsl',
    'ESPDResponse/xsl/05-ESPD-resp-role-br.xsl',
    'ESPDResponse/xsl/03-ESPD-resp-criterion-br.xsl',
    'ESPDResponse/xsl/05-ESPD-resp-qualification-br.xsl',
    'ESPDResponse/xsl/05-ESPD-resp-specific-br.xsl',
    'ESPDResponse/xsl/01-ESPD-common-cl-attributes.xsl',
    'ESPDResponse/xsl/01-ESPD-common-cl-values-restrictions.xsl',
  ],
};

// --------------------------------------------------------------------------
// Shorthand -> full codelist-attribute expansion.
//
// The mapping generators emit shorthand code attributes (e.g.
// listID="response-data-type", schemeID="criterion") that roundtrip through
// mapper.mjs. The Schematron requires the FULL attribute set per codelist. This
// expander rewrites the generated XML, replacing a shorthand attribute on a
// known code element with the full set from the codelist-attribute profile.
// --------------------------------------------------------------------------

// Shorthand marker attribute -> profile codelist key, by local element name.
// (schemeID shorthand "criterion" on cbc:ID -> the criterion-id scheme set.)
const SHORTHAND = {
  'cbc:CriterionTypeCode': { marker: 'listID', key: 'criterion' },
  'cbc:TypeCode': { marker: 'listID', key: 'criterion-element-type' },
  'cbc:ValueDataTypeCode': { marker: 'listID', key: 'response-data-type' },
  'cbc:PropertyGroupTypeCode': { marker: 'listID', key: 'property-group-type' },
  'cbc:ID': { marker: 'schemeID', key: 'criterion-id' },
};

function attrsToString(attrs) {
  return Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
}

/**
 * Expand shorthand codelist attributes in generated XML to full Schematron sets.
 * @param {string} xml
 * @param {object} codelistProfile the loaded codelist-attribute profile
 */
export function expandCodelistAttributes(xml, codelistProfile) {
  const resolve = (key) => {
    const entry = codelistProfile.codelists[key];
    if (!entry) throw new Error(`codelist profile missing '${key}'`);
    const out = {};
    for (const [k, v] of Object.entries(entry)) if (!k.startsWith('$')) out[k] = v;
    return out;
  };

  let result = xml;
  for (const [element, { marker, key }] of Object.entries(SHORTHAND)) {
    const full = resolve(key);
    // Match the opening tag of this element that carries the shorthand marker.
    const re = new RegExp(`<${element}\\b([^>]*?)\\s${marker}="[^"]*"([^>]*)>`, 'g');
    result = result.replace(re, (m, before, after) => {
      // Drop any other value-bearing attrs already present (e.g. currencyID) —
      // keep them; only replace the shorthand marker with the full set.
      return `<${element}${before} ${attrsToString(full)}${after}>`;
    });
  }
  return result;
}

/** True if Java + the Saxon jar are available for Schematron validation. */
export function checkSaxonAvailable() {
  if (!fs.existsSync(SAXON)) return false;
  try {
    execFileSync('java', ['-version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// --------------------------------------------------------------------------
// Document wrapping.
//
// The generators emit a single criterion fragment. The Schematron validates a
// COMPLETE ESPD document (envelope + party + project + criteria). We reuse the
// shipped BASE documents as the envelope and splice our generated criterion/
// responses in, so the result is a full, validatable document.
// --------------------------------------------------------------------------

const BASE = {
  request: path.join(SCH_ROOT, 'common', 'xml', 'ESPD-Request-BASE.xml'),
  response: path.join(SCH_ROOT, 'common', 'xml', 'ESPD-Response-BASE.xml'),
};

/** Extract the generated `<cac:TenderingCriterion>…</cac:TenderingCriterion>`. */
function extractCriterion(xml) {
  const m = /<cac:TenderingCriterion>[\s\S]*<\/cac:TenderingCriterion>/.exec(xml);
  if (!m) throw new Error('generated request XML has no cac:TenderingCriterion');
  return m[0];
}

/**
 * Wrap a generated REQUEST criterion fragment into the BASE request document,
 * replacing the BASE document's own criteria with ours.
 */
export function wrapRequestDocument(generatedXml, codelistProfile) {
  const base = fs.readFileSync(BASE.request, 'utf8');
  const criterion = expandCodelistAttributes(extractCriterion(generatedXml), codelistProfile);
  // Insert before the first BASE <cac:TenderingCriterion> and drop BASE criteria.
  const firstIdx = base.indexOf('<cac:TenderingCriterion>');
  const lastEnd = base.lastIndexOf('</cac:TenderingCriterion>') + '</cac:TenderingCriterion>'.length;
  if (firstIdx === -1) throw new Error('BASE request has no criteria to replace');
  return base.slice(0, firstIdx) + criterion + base.slice(lastEnd);
}

/** Parse SVRL text into failed-assert findings. */
export function parseSvrl(svrl, validatorName) {
  const findings = [];
  for (const m of svrl.matchAll(/<svrl:failed-assert\b([^>]*)>([\s\S]*?)<\/svrl:failed-assert>/g)) {
    const attrs = m[1];
    const body = m[2];
    const flag = /\bflag="([^"]*)"/.exec(attrs)?.[1] ?? '';
    const location = /\blocation="([^"]*)"/.exec(attrs)?.[1] ?? '';
    const test = /\btest="([^"]*)"/.exec(attrs)?.[1] ?? '';
    const text = (/<svrl:text>([\s\S]*?)<\/svrl:text>/.exec(body)?.[1] ?? '')
      .replace(/\s+/g, ' ').trim();
    findings.push({ validator: validatorName, flag, location, test, text });
  }
  return findings;
}

/** Run one XSL validator over the XML file, returning its SVRL findings. */
function runValidator(xmlPath, xslRelPath) {
  const xslPath = path.join(SCH_ROOT, xslRelPath);
  const svrl = execFileSync('java', [
    '-jar', SAXON, `-s:${xmlPath}`, `-xsl:${xslPath}`,
  ], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return parseSvrl(svrl, path.basename(xslRelPath));
}

/**
 * Validate an XML string against the ESPD Schematron for the given document kind.
 * @param {string} xml the XML document
 * @param {'request'|'response'} kind
 * @returns {{errors:Array, warnings:Array, findings:Array}}
 */
export function validateXml(xml, kind) {
  const validators = VALIDATORS[kind];
  if (!validators) throw new Error(`Unknown document kind: ${kind}`);

  const tmp = path.join(os.tmpdir(), `espd-${kind}-${process.pid}-${Date.now()}.xml`);
  fs.writeFileSync(tmp, xml, 'utf8');
  try {
    const findings = [];
    for (const xsl of validators) findings.push(...runValidator(tmp, xsl));
    const errors = findings.filter(f => f.flag === 'fatal');
    const warnings = findings.filter(f => f.flag !== 'fatal');
    return { errors, warnings, findings };
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

/**
 * Assert the XML passes the ESPD Schematron (no fatal findings). Throws with a
 * readable report of the failing rules + locations. Surfaces warnings via the
 * returned object.
 */
export function assertSchematronValid(xml, kind) {
  const { errors, warnings } = validateXml(xml, kind);
  if (errors.length) {
    const report = errors.slice(0, 20).map(
      e => `  [${e.validator}] ${e.location}\n      ${e.text}`
    ).join('\n');
    throw new Error(
      `ESPD Schematron (${kind}) reported ${errors.length} error-level finding(s):\n${report}`
    );
  }
  return { warnings };
}
