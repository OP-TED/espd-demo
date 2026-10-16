// Codelist-attribute expansion — the shorthand → full-attribute-set string pass.
//
// The mapping generators and admin sidecars emit SHORTHAND code attributes
// (e.g. listID="response-data-type", schemeID="criterion") that round-trip
// through mapper.mjs. The ESPD Schematron requires the FULL dated attribute set
// per codelist. This module rewrites a serialized XML string, replacing a
// shorthand attribute on a known code element with the full set from the loaded
// codelist-attribute profile.
//
// Dependency-free (pure string/regex) so it runs in BOTH Node (the Schematron
// harness) and the browser (the UBL document composer). model/compiler/
// schematron-validate.mjs re-exports these for its existing Node callers; the
// browser imports them directly. The profile JSON
// (model/model-sources/registries/codelist-attributes.json) is passed in, so
// this module reads no files and has no environment coupling.

// Shorthand marker attribute -> profile codelist key, by local element name.
// (schemeID shorthand "criterion" on cbc:ID -> the criterion-id scheme set.)
export const SHORTHAND = {
  'cbc:CriterionTypeCode': { marker: 'listID', key: 'criterion' },
  'cbc:TypeCode': { marker: 'listID', key: 'criterion-element-type' },
  'cbc:ValueDataTypeCode': { marker: 'listID', key: 'response-data-type' },
  'cbc:PropertyGroupTypeCode': { marker: 'listID', key: 'property-group-type' },
  // cbc:ID carries the criterion identifier scheme — but ONLY inside the
  // criterion tree, where the generators emit the shorthand schemeID="criterion".
  // `only` scopes the rewrite to that exact shorthand value, so a cbc:ID
  // elsewhere (e.g. cac:PartyIdentification/cbc:ID, whose @schemeID is an
  // EOIDType code such as VAT) is left untouched.
  'cbc:ID': { marker: 'schemeID', key: 'criterion-id', only: 'criterion' },
  // cac:TenderingCriterionResponse/cbc:ValidatedCriterionPropertyID cross-refs a
  // criterion property id and carries the SAME identifier scheme as the criterion
  // cbc:IDs (schemeID="criterion"). The response generator emits the shorthand
  // schemeID="criterion"; expand it to the full criterion-id attribute set so
  // @schemeAgencyID/@schemeVersionID are present (BR-OTH-02, fatal). Scoped by
  // `only:'criterion'` like cbc:ID.
  'cbc:ValidatedCriterionPropertyID': { marker: 'schemeID', key: 'criterion-id', only: 'criterion' },
  // A code-valued response. The shorthand listID carries the codelist KEY
  // ('country'), expanded to that codelist's full dated attribute set — which
  // differs from response-data-type (the C07 CODE_COUNTRY probe).
  'cbc:ResponseCode': { marker: 'listID', key: null },
  // A code-valued REQUIREMENT (e.g. CODE_BOOLEAN 'Threshold per year' in C29).
  // Same dynamic-key handling: the shorthand listID names the codelist.
  'cbc:ExpectedCode': { marker: 'listID', key: null },
  // Part I publication type. Dynamic-key: the shorthand listID ('docrefcontent-type')
  // names the codelist, expanded to the full 5-attribute set from the profile.
  'cbc:DocumentTypeCode': { marker: 'listID', key: null },
  // Part I buyer country (cac:Country/cbc:IdentificationCode). Dynamic-key on
  // the 'country' codelist.
  'cbc:IdentificationCode': { marker: 'listID', key: null },
  // Part I procedure type. Dynamic-key on 'procurement-procedure-type'.
  'cbc:ProcedureCode': { marker: 'listID', key: null },
  // Part II economic-operator role (eo-role-type) and size (economic-operator-size).
  'cbc:RoleCode': { marker: 'listID', key: null },
  'cbc:IndustryClassificationCode': { marker: 'listID', key: null },
};

function attrsToString(attrs) {
  return Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
}

/**
 * Expand shorthand codelist attributes in generated XML to full Schematron sets.
 * @param {string} xml
 * @param {object} codelistProfile the loaded codelist-attribute profile
 *   ({ codelists: { <key>: { listID, listAgencyID, … } } })
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
  for (const [element, { marker, key, only }] of Object.entries(SHORTHAND)) {
    // A fixed-key element (e.g. cbc:TypeCode -> criterion-element-type) resolves
    // once. A dynamic-key element (key === null, e.g. cbc:ResponseCode) carries
    // the codelist KEY as the shorthand marker's own value, so resolve per match.
    const re = new RegExp(`<${element}\\b([^>]*?)\\s${marker}="([^"]*)"([^>]*)>`, 'g');
    result = result.replace(re, (m, before, shorthand, after) => {
      // `only` scopes a fixed-key rewrite to one shorthand value, so the same
      // element name used elsewhere with a real (already-final) attribute value
      // is left alone.
      if (only !== undefined && shorthand !== only) return m;
      const profileKey = key !== null ? key : shorthand;
      // Leave anything the profile does not know rather than corrupting it.
      if (!codelistProfile.codelists[profileKey]) return m;
      return `<${element}${before} ${attrsToString(resolve(profileKey))}${after}>`;
    });
  }
  return result;
}
