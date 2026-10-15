# `model-sources/` — hand-authored compiler inputs

The authored source of truth the compiler consumes. Nothing here is generated.

## Layout

- `registries/` — shared, criterion-independent inputs:
  - `value-types.json` — per-ValueDataTypeCode JSON instance shapes + UBL value bindings (validated against `ResponseDataType.gc`)
  - `codelist-attributes.json` — fixed code-list attribute sets the Schematron requires, one per codelist
  - `encoding-profile.json` — kind → element XML conventions
  - `form-profile.json` — presentation conventions (filledBy, uiType defaults, i18n key derivation)
  - `roles.json` — role registry: buyer types + economic-operator roles with form behaviour (visible/editable parts, exclusion-ground dispositions), UBL party-role bindings, and the Part III section-code → exclusion-category prefix map (compiled by `../compiler/roles.mjs` → `../generated/ui/roles.json`)
- `criteria/` — per-criterion enrichment, keyed by criterion code:
  - `<code>.sidecar.json` — semantic IDs + instance bindings (required to model a criterion)
  - `<code>.hints.json` — optional instance-data constraint hints
  - `<code>.presentation.json` — optional form presentation overrides

A criterion is "modeled" when it has a `<code>.sidecar.json` here. The build
(`node model/compiler/build-generated.mjs`) compiles each and writes
`../generated/`.

See `../../docs/espd-edm-primary-input-enrichment.md` for the rationale behind
what lives here (implementation projections) versus upstream in `espd-edm.json`.
