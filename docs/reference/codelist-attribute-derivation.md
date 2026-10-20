# Deriving codelist attributes from the `.gc` files (opportunity)

## Current state

The compiler names 8 of the 17 `ESPD-EDM/codelists/*.gc` codelists but only
*reads* one of them: `ResponseDataType.gc`, which the value-type registry parses
to validate every value type (exists + ACTIVE + description match).

For every other codelist, the fixed UBL attribute set a code element must carry
(`listID`, `listName`, `listVersionID`, `listSchemeURI`, `listURI`,
`listAgencyID`, `listAgencyName`) is **hand-copied** into
`model/model-sources/registries/codelist-attributes.json`. Those constants are
cross-checked against the Schematron (`01-ESPD-common-cl-attributes.sch`) by
`validateCodelistProfile`, NOT against the `.gc` files. So the `.gc` codelists
are cited in `$note`s but are not load-bearing inputs.

This duplicates data and leaves a drift risk: if a published codelist bumps its
version, the Schematron and the hand-copied profile must both be updated by hand,
and nothing ties either back to the `.gc`.

## Opportunity

The attribute values the profile hand-copies are present in each `.gc` file's
`<Identification>` block. Confirmed against `Country.gc`:

| Profile attribute | `.gc` `<Identification>` source |
|---|---|
| `listID` | `LongName[@Identifier='listId']` (e.g. `http://.../authority/country`) |
| `listVersionID` | `Version` (e.g. `20250618-0`) |
| `listSchemeURI` | `LocationUri` |
| `listURI` | `CanonicalUri` |
| `listAgencyID` | `Agency/Identifier/@Identifier` (e.g. `OP`) |
| `listAgencyName` | `Agency/LongName` |
| `listName` | `ShortName` or `LongName` (needs a per-list convention — see caveat) |

So the codelist-attribute profile could be **derived** from the `.gc`
`<Identification>` rather than hand-authored, making the `ESPD-EDM/codelists/`
files genuinely load-bearing and catching version drift automatically. The
hand-authored profile would shrink to only the few attributes a `.gc` does not
express.

## Caveats to resolve before implementing

1. **`listName` convention is inconsistent.** `Country.gc` has
   `ShortName=Country` / `LongName=country`, and the profile uses
   `listName=country` (the LongName). `PropertyGroupType.gc` has
   `ShortName=PropertyGroupType` and the profile uses
   `listName=PropertyGroupType` (the ShortName). So `listName` cannot be taken
   from one fixed element across all lists — a per-list rule or a small override
   is needed.
2. **Two copies of the codelists exist.** The registry's `source.path` points at
   `ESPD-EDM/codelists/ResponseDataType.gc`, but the EA export was built from
   `espd-tools/EAtoJSON/outputs/code-lists/code-lists/`. Confirm the two are in
   sync (or pick one authoritative source) before deriving from either.
3. **Schematron is the hard constraint.** `01-ESPD-common-cl-attributes.sch`
   dictates which attributes are *mandatory* per code element and their exact
   values. Any derivation must still satisfy that cross-check — the `.gc` is the
   source of the values, the Schematron remains the validator. Where a `.gc`
   value and the Schematron disagree, that is a real upstream inconsistency to
   report, not to paper over.
4. **Not every "codelist" in the profile is a `.gc`.** `criterion-id` is a UBL
   identifier scheme (not a codelist); `boolean-gui-control-type` /
   `financial-ratio-type` currently carry only the generic
   `listID`/`listAgencyID`/`listVersionID` — their `.gc`
   (`BooleanGUIControlType.gc`, `FinancialRatioType.gc`) could supply the rest.

## Suggested approach

Add a `deriveCodelistAttributes(gcXml)` that reads `<Identification>`, keep the
hand-authored profile as an override layer for `listName` and non-`.gc` entries,
and keep `validateCodelistProfile` (Schematron cross-check) as the gate. Net
effect: the `.gc` files become the source of codelist attribute values, the
Schematron stays the validator, and the hand-authored profile shrinks to
genuine overrides.

See also the upstream-candidates list in
[Keeping espd-edm.json as the Primary Input](espd-edm-primary-input-enrichment.md).
