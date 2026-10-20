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
│   │   └── form-profile.json        presentation conventions (filledBy, uiType, i18n keys)
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
│
└── legacy/              PRE-COMPILER artifacts kept as parity references the
    │                    compiler tests compare against. Removable per part once
    │                    the compiler fully reproduces it.
    ├── xml-mapping/           part-*.json mapping specs + roundtrip-part-*.test.mjs,
    │                          scaffold-part-IV.test.mjs (exercise the hand-authored specs)
    ├── instance-data/         part-*.schema.json + part-*.example.json originals
    ├── form-structure/        part-*.form.json originals
    └── README.md
```

## Build & test

```
npm run model:compile   # node model/compiler/build-generated.mjs  -> rewrites generated/
npm run model:test      # node --test model/compiler/ model/mapping-engine/ model/legacy/xml-mapping/
```

## Where things belong (ownership rule)

- **Structure** (parts/sections/criteria, cardinality, conditions) — intrinsic
  ESPD, lives upstream in `espd-edm.json`.
- **Codes & descriptions** — from `ESPD-EDM/codelists/*.gc`.
- **Projection decisions** (semantic IDs, instance bindings, uiType, i18n keys,
  presentation) — hand-authored in `model-sources/`.

See `../docs/reference/espd-edm-primary-input-enrichment.md` for the full rationale.

## Notes

- `mapping-engine/mapper.mjs` is **runtime** code, not legacy: the compiler
  imports it to run generated mapping specs, and the UI will import it to export
  form data to UBL XML (and import it back). It lives in its own module so both
  consumers share one copy. Everything under `legacy/` — the per-part originals
  and their roundtrip tests — is pre-compiler and slated for removal per part as
  the compiler reproduces each one.
```
