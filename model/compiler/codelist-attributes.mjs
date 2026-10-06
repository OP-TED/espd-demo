// Task 2.2 — codelist-attribute profile.
//
// Provides the fixed code-list attribute sets the Schematron requires on code
// elements, defined once per codelist. The compiler stamps these onto code
// elements (encoding-profile entries name the codelist). Values are the exact,
// often dated, constants from 01-ESPD-common-cl-attributes.sch.
//
// This module also VALIDATES the profile against the Schematron so the constants
// cannot silently drift: it parses the asserted (attribute, value) pairs per
// rule context and confirms the profile matches. 'criterion-id' is a UBL
// identifier scheme (not a codelist rule) and is skipped by the cross-check.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

/** Map a Schematron rule @context to the profile codelist key we use. */
const CONTEXT_TO_CODELIST = {
  'cbc:CriterionTypeCode': 'criterion',
  'cbc:TypeCode': 'criterion-element-type',
  'cac:TenderingCriterionProperty/cbc:ValueDataTypeCode': 'response-data-type',
  'cac:TenderingCriterionPropertyGroup/cbc:PropertyGroupTypeCode': 'property-group-type',
  'cac:Country/cbc:IdentificationCode': 'country',
  'cbc:ValueCurrencyCode': 'currency',
};

/** Strip $-prefixed annotation keys ($note, $comment) from an attribute set. */
function cleanAttrs(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) if (!k.startsWith('$')) out[k] = v;
  return out;
}

export function loadCodelistProfile(profilePath = path.join(here, 'codelist-attributes.json')) {
  return JSON.parse(fs.readFileSync(profilePath, 'utf8'));
}

/** Resolve the fixed attribute set for a codelist key. Throws if unknown. */
export function attributesFor(profile, codelistKey) {
  const entry = profile.codelists[codelistKey];
  if (!entry) throw new Error(`Codelist-attribute profile has no entry for '${codelistKey}'`);
  return cleanAttrs(entry);
}

/**
 * Parse 01-ESPD-common-cl-attributes.sch into
 *   Map<context, Map<attrName, requiredValue>>
 * by reading each <rule context="..."> and its asserts of the form
 *   not(@attr != 'value')
 * (uncommented asserts only).
 */
export function parseSchematronAttributeRules(sch) {
  // Remove XML comments first: commented-out asserts (e.g. the country rule's
  // listAgencyName/listAgencyID) must NOT count as required.
  const uncommented = sch.replace(/<!--[\s\S]*?-->/g, '');
  const rules = new Map();
  for (const rule of uncommented.matchAll(/<rule context="([^"]+)">([\s\S]*?)<\/rule>/g)) {
    const context = rule[1];
    const body = rule[2];
    const attrs = new Map();
    for (const a of body.matchAll(/<assert test="\(false\(\) or not\(@([A-Za-z]+) != '([^']*)'\)\)"/g)) {
      attrs.set(a[1], a[2]);
    }
    rules.set(context, attrs);
  }
  return rules;
}

/**
 * Validate the profile against the Schematron: for every codelist we both map
 * and that the Schematron constrains, each profile attribute must equal the
 * Schematron's required value, and the profile must not omit a required
 * attribute. Returns the number of codelists cross-checked.
 */
export function validateCodelistProfile(profile, schPath) {
  const resolved = schPath ?? path.resolve(path.dirname(path.join(here, 'codelist-attributes.json')), profile.source.schematron);
  const sch = fs.readFileSync(resolved, 'utf8');
  const rules = parseSchematronAttributeRules(sch);

  let checked = 0;
  for (const [context, codelistKey] of Object.entries(CONTEXT_TO_CODELIST)) {
    const required = rules.get(context);
    if (!required) continue; // context not asserted in this Schematron file
    const profileAttrs = attributesFor(profile, codelistKey);

    for (const [attr, value] of required) {
      if (!(attr in profileAttrs)) {
        throw new Error(`Profile '${codelistKey}' missing required attribute '${attr}' (Schematron context ${context})`);
      }
      if (profileAttrs[attr] !== value) {
        throw new Error(
          `Profile '${codelistKey}' attribute '${attr}' = '${profileAttrs[attr]}' ` +
          `but Schematron requires '${value}' (context ${context})`
        );
      }
    }
    checked++;
  }
  return checked;
}

export function loadValidatedCodelistProfile(profilePath) {
  const profile = loadCodelistProfile(profilePath);
  const checked = validateCodelistProfile(profile);
  return { profile, checked };
}
