# `model/` — the ESPD model, consumed

This app does **not** compile the ESPD model. ESPD-EDM publishes it (`ESPD-EDM/model`, built by
`espd-tools/model-compiler` from the EA model plus the enrichment in `espd-conceptual-model`), and
this directory vendors that published model and builds the layers that are the app's own on top of it.

## Pipeline at a glance

```
ESPD-EDM  (ESPD_EDM_ROOT, default ../ESPD-EDM)
  ├── criterion/espd-edm.json   the EA structure (parts, sections, criteria)
  ├── model/                    the published model: compiled criteria, instance-data
  │                             schemas, XML mapping specs, registries, compiled-model.json
  └── codelists/*.gc            the shipped code lists
            |
            |  npm run model:sync     (verify, then copy; also projects the structure)
            v
generated/   vendored published model            (instance-data/ xml-mapping/ compiled/ parts/
            |                                     registries/ compiled-model.json structure.json)
            |  npm run model:compile  (the app's own layers)
            +   model-sources/  presentation: form-profile, role-ui, *.presentation.json
            v
generated/   form-structure/  ui/ (bundle, roles, validators)  codelists/   + docs/coverage-report.md
```

Everything under `generated/` is committed (GitHub Pages builds no model), and none of it is a
source of truth: re-sync or recompile, never hand-edit.

## Tree

```
model/
├── compiler/            This app's build code + tests. It derives the app's layers from the
│   │                    vendored published model; it does not compile the model.
│   ├── upstream.mjs           where the published ESPD-EDM inputs are (ESPD_EDM_ROOT)
│   ├── sync-published.mjs     verify the published model, then vendor it into generated/
│   ├── published-model.mjs    read access to the vendored model (envelope, compiled criteria, registries)
│   ├── build-generated.mjs    build script: sync, then every app layer below
│   ├── generate-form-structure.mjs   form-structure (presentation lens) generator
│   ├── instance-paths.mjs     path helpers mirroring the upstream rules (guarded by a test)
│   ├── build-ui-bundle.mjs    UI bundle: parts > sections > members + composed JSON Schemas
│   ├── build-validators.mjs   standalone Ajv validators
│   ├── parts.mjs, roles.mjs   admin part lenses; role lens (published roles + role-ui.json)
│   ├── build-coverage-report.mjs   docs/coverage-report.md
│   ├── schematron-validate.mjs     Saxon/Schematron validation + attribute expansion (test utility)
│   └── *.test.mjs             tests, incl. contract tests over the published model
│
├── model-sources/       The app's OWN hand-authored inputs: presentation only.
│   ├── registries/            form-profile.json (filledBy, uiType, i18n keys), role-ui.json
│   │                          (role labels, visible/editable Parts)
│   └── criteria/              <code>.presentation.json  optional form presentation overrides
│
├── generated/           COMMITTED output (do NOT hand-edit). See generated/README.md.
│
├── mapping-engine/      The shared, domain-neutral XML MAPPING ENGINE (runtime): mapper.mjs does
│                        bidirectional map()/unmap(); the UI uses it to export form data to UBL XML
│                        and import it back.
│
├── parts-tests/         Tests of the published administrative parts (I, II, VI), which are vendored
│                        under generated/parts/ (schema, example, mapping, form per section).
└── codelists/           UI codelist service data; ui-codelists.json (which lists the UI offers) merged with the
                         published codelist-governance registry by governance.mjs.
```

## Build & test

```
npm run model:sync      # verify + vendor the published model (and the structure projection)
npm run model:compile   # model:sync, then rebuild every app layer; --no-sync to skip the sync
npm run model:test      # node --test model/compiler/ model/mapping-engine/ model/parts-tests/ model/codelists/
```

`model:sync` and `model:compile` read the published ESPD-EDM from `ESPD_EDM_ROOT` (default: the sibling
`../ESPD-EDM`): `criterion/espd-edm.json`, `model/` and `codelists/`. The sync refuses to copy a model
that does not verify: schema (shipped with the model), listed files, no strays, and a SHA-256 match
with the structure export. After a sync, the tests and the Pages build need nothing outside this
repository except the shipped code lists. Resolving ESPD-EDM without the sibling-checkout assumption
is the open cross-repo coupling item.

TODO: the mapping engine (`mapping-engine/`) and the tests that exercise the published specs through it are not
specific to this app. They are meant to move to `espd-tools`, which would run them against `ESPD-EDM/model`; see "Open
TODOs" in `espd-tools/model-compiler/README.md`. Until then they live here.

## Where things belong (ownership rule)

- **Structure** (parts/sections/criteria, cardinality, conditions) — intrinsic ESPD, in the EA model,
  published as `ESPD-EDM/criterion/espd-edm.json`.
- **The model** (semantic ids, instance bindings, value types, UBL bindings, roles, instance-data
  schemas, mappings) — implementer-neutral, from the enrichment in `espd-conceptual-model/enrichment`,
  compiled by `espd-tools/model-compiler`, published in `ESPD-EDM/model`. Change it there, not here.
- **Codes & descriptions** — from `ESPD-EDM/codelists/*.gc`.
- **Presentation** (form layout, `uiType`, i18n keys and text, role labels, UI hints) — this app,
  in `model-sources/` and `i18n/`.

See `../docs/reference/espd-edm-primary-input-enrichment.md` for the rationale.

## Notes

- **i18n follows the model.** Form labels are keyed by criterion code (or EA tag) and the EA path, so
  when the model changes upstream (a code renamed, a leaf added) the English catalogues under
  `i18n/i18n/en/` have to follow. `model/compiler/i18n-keys.test.mjs` fails on any key the generated
  forms use that the catalogue lacks.
- The form generator mirrors two small path rules from the upstream compiler (`instance-paths.mjs`);
  `published-model.test.mjs` checks that every form field addresses a real property of the published
  instance-data schemas.
- The published specs are exercised through `mapping-engine/mapper.mjs` by
  `compiler/roundtrip-generated.test.mjs` (every published example) and
  `compiler/schematron-validate.test.mjs`.
- The pre-compiler per-part artifacts (`model/legacy/`) and the in-repo model compiler have been removed;
  both remain in git history.
