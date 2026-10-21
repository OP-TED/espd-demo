/**
 * Shared helper: validate a downloaded ESPD document against the OFFICIAL ESPD
 * Schematron, reusing the project's Node validator
 * (model/compiler/schematron-validate.mjs → Saxon-HE XSLT over the shipped
 * ESPDRequest/ESPDResponse rule sets).
 *
 * The e2e roundtrip saves the real XML the app downloads (#btn-download); this
 * runs it through the same business-rule validator the model tests use, so the
 * roundtrip asserts the output is not just well-formed but SCHEMATRON-valid.
 *
 * Finding classification mirrors compose-document.test.mjs exactly (the agreed
 * contract):
 *   - ATTRIBUTE-category fatals: the composer MUST emit zero of these.
 *   - DOCUMENTED residuals: e-Certis UUID property-group ids + the cross-
 *     criterion "Part III A and B required" composition rule. These belong to
 *     the per-criterion fragment generators (tracked as a 6B follow-up), not to
 *     the document composer, so the roundtrip tolerates them while still failing
 *     on anything NEW.
 *
 * Saxon/Java is optional: when absent, validation is reported as skipped rather
 * than failing the roundtrip (same gate the model suite uses). CI that wants the
 * hard guarantee must provide Java + espd-validation-schematron/common/lib.
 */
import { checkSaxonAvailable, validateXml } from '../model/compiler/schematron-validate.mjs';

export const saxonAvailable = checkSaxonAvailable();

/** Attribute-category fatals: the composed document MUST have none. */
const isAttributeError = (e) =>
  e.validator.includes('cl-attributes') || /attribute .* is mandatory/i.test(e.text);

/**
 * Fatals that belong to the per-criterion FRAGMENT generators, not the document
 * composer (tracked as a 6B follow-up). All share one root cause: the generated
 * fragments use path-like property-group ids (e.g. 'C25_slc-suit-reg-prof/RG1')
 * instead of the e-Certis UUIDs the Schematron keys on, so criterion-br cannot
 * resolve a group to its registered definition. That surfaces in three phrasings:
 *   (a) "Compulsory use of the UUIDs supplied by e-Certis" (the id itself);
 *   (b) "… property group … has N missing 'cac:Subsidiary…PropertyGroup'" — a
 *       downstream structural comparison that only fails because the id didn't
 *       resolve;
 *   (c) "… property group … has N missing 'cac:TenderingCriterionProperty'" —
 *       the same comparison, one level down.
 * Plus the cross-criterion "Part III A and B required" composition rule, which
 * depends on the fixture's criterion set, not on the composer.
 */
const isDocumentedResidual = (e) =>
  /e-Certis/i.test(e.text) ||
  /Part III/.test(e.text) ||
  (e.validator.includes('common-criterion-br') &&
    /property group[\s\S]*missing[\s\S]*(PropertyGroup|TenderingCriterionProperty)/i.test(e.text));

/**
 * Validate an ESPD XML string. Returns a structured report:
 *   { skipped, attributeErrors[], unexpectedErrors[], warnings[], findings[] }
 * `skipped` is true when Saxon/Java is unavailable (no validation ran).
 */
export function validateEspdXml(xml, kind) {
  if (!saxonAvailable) {
    return { skipped: true, attributeErrors: [], unexpectedErrors: [], warnings: [], findings: [] };
  }
  const { errors, warnings, findings } = validateXml(xml, kind);
  const attributeErrors = errors.filter(isAttributeError);
  const unexpectedErrors = errors.filter(
    (e) => !isAttributeError(e) && !isDocumentedResidual(e),
  );
  return { skipped: false, attributeErrors, unexpectedErrors, warnings, findings };
}
