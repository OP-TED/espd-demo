# `model/` — the compiled ESPD-EDM model subsystem

This directory holds the **compiler** that turns the EA export (`espd-edm.json`)
plus hand-authored enrichment into three generated model layers (XML mapping,
instance-data, form-structure).

## Pipeline at a glance

```
espd-tools/EAtoJSON/outputs/espd-edm.json   (EA structure — source of truth)
            +
model-sources/   (hand-authored enrichment: registries + per-criterion sidecars)
            |
            v
compiler/        (reads core, overlays enrichment, gates on structural
            |     equivalence, generates the three layers)
            v
generated/       (committed output: instance-data / form-structure / xml-mapping)
```

## Tree

```
model/
├── compiler/            Compiler CODE + tests. Reads espd-edm.json + model-sources/,
│   │                    emits generated/. Nothing hand-authored lives here.
│   ├── compile.mjs            entry point + loaders + emitAll()
│   ├── build-generated.mjs    build script: compile every modeled criterion -> generated/
│   ├── read-structural-core.mjs   lean reader of espd-edm.json
│   ├── overlay-enrichment.mjs     joins sidecar enrichment by requestpath
│   ├── structural-equivalence.mjs correctness gate (compiled -> EA projection == source)
│   ├── value-type-registry.mjs    loads/validates value-types.json vs ResponseDataType.gc
│   ├── codelist-attributes.mjs    loads/validates codelist-attributes.json vs Schematron
│   ├── encoding-profile.mjs       kind->element conventions + path/array helpers
│   ├── generate-instance-schema.mjs   instance-data schema + example generator
│   ├── generate-request-mapping.mjs   ESPD Request mapping-spec generator
│   ├── generate-response-mapping.mjs  ESPD Response mapping-spec generator
│   ├── generate-form-structure.mjs    form-structure (presentation lens) generator
│   ├── schematron-validate.mjs    Saxon/Schematron validation + attribute expansion
│   └── *.test.mjs                 unit tests + probes (C07, criteria, nested arrays, UI parity)
│
├── model-sources/       Hand-authored compiler INPUTS (source of truth for enrichment).
│   ├── registries/            shared, criterion-independent:
│   │   ├── value-types.json         JSON shapes + UBL value bindings per ValueDataTypeCode
│   │   ├── codelist-attributes.json fixed code-list attribute sets per codelist
│   │   ├── encoding-profile.json    kind -> element XML conventions
│   │   ├── scheme-agency-profile.json  @schemeAgencyID derivation policy
│   │   ├── roles.json               role facts: ids, exclusion dispositions, UBL role mapping
│   │   ├── role-ui.json             DEMO: per-role label/description + visible/editable Parts
│   │   ├── form-profile.json        DEMO: presentation conventions (filledBy, uiType, i18n keys)
│   │   └── ui-hints.json            DEMO: vocabulary of UI affordances (e.g. TED lookup)
│   └── criteria/              per-criterion, keyed by criterion code:
│       ├── <code>.sidecar.json       semantic IDs + instance bindings (required to model)
│       ├── <code>.hints.json         optional instance-data constraint hints
│       └── <code>.presentation.json  optional form presentation overrides
│
├── generated/           COMMITTED compiler OUTPUT (do NOT hand-edit; regenerate).
│   ├── instance-data/         <code>.schema.json + <code>.example.json
│   ├── form-structure/        <code>.form.json
│   └── xml-mapping/           <code>.request.mapping.json + <code>.response.mapping.json
│
├── mapping-engine/      The shared, domain-neutral XML MAPPING ENGINE (runtime).
│   ├── mapper.mjs             bidirectional map()/unmap() — imported by the compiler
│   │                          to run generated specs, and the engine the UI uses to
│   │                          export form data to UBL XML and import it back
│   └── records-value-attributes.test.mjs   the engine's own unit test
```

## Build & test

```
npm run model:compile   # node model/compiler/build-generated.mjs  -> rewrites generated/
npm run model:test      # node --test model/compiler/ model/mapping-engine/ model/parts/ model/codelists/
```

## Where things belong (ownership rule)

- **Structure** (parts/sections/criteria, cardinality, conditions) — intrinsic
  ESPD, lives upstream in `espd-edm.json`.
- **Codes & descriptions** — from `ESPD-EDM/codelists/*.gc`.
- **Projection decisions** (semantic IDs, instance bindings, uiType, i18n keys,
  presentation) — hand-authored in `model-sources/`.

### Moving upstream

The implementer-neutral half of this compiler (`read-structural-core`, `overlay-enrichment`,
`structural-equivalence`, `value-type-registry`, `codelist-attributes`, `encoding-profile`,
`generate-instance-schema`, `generate-request-mapping`, `generate-response-mapping`, plus
`read-codelist`) now also exists as `espd-tools/model-compiler`, with all sibling paths replaced by
explicit inputs. It produces byte-identical `generated/instance-data` and `generated/xml-mapping`
for all criteria. This app keeps its own copy until it consumes the published model, so change
generators in both places in the meantime. The presentation half (`generate-form-structure`,
`build-ui-bundle`, `build-validators`, `parts`, `roles`) and the tests that run mapping specs
through `mapping-engine/` stay here.

The implementer-neutral part of `model-sources/` (value types, encoding profile,
codelist attributes, scheme-agency profile, `roles.json`, all `*.sidecar.json` and
`*.hints.json`) now has its canonical home in
`espd-conceptual-model/enrichment/` (validated by JSON Schemas). The copies here
are temporary: this compiler still reads them, so **until the compiler moves to
espd-tools and this app consumes the published model, edit both copies**. Files
marked DEMO above (`role-ui.json`, `form-profile.json`, `ui-hints.json`,
`*.presentation.json`) are presentation and stay in this repo.

See `../docs/reference/espd-edm-primary-input-enrichment.md` for the full rationale.

## Notes

- `mapping-engine/mapper.mjs` is **runtime** code: the compiler's tests import it
  to run generated mapping specs, and the UI imports it to export form data to
  UBL XML (and import it back). It lives in its own module so both consumers
  share one copy. It is a candidate for later extraction into a standalone package.
- The pre-compiler per-part artifacts (`model/legacy/`) have been removed. They
  remain available in git history.
