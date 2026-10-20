# Documentation

Documentation for espd-demo, organised by kind.

## `reference/` — how the shipped system works

Read these to understand the implementation as it is.

- [`model-architecture.md`](reference/model-architecture.md) — the conceptual map of the `model/` subsystem. Start here.
- [`model-xml-mapping.md`](reference/model-xml-mapping.md) — the instance-data ↔ UBL XML mapping model and engine.
- [`criteria.md`](reference/criteria.md) — how ESPD criterion component trees and conditional logic are structured.
- [`espd-ubl-profile.md`](reference/espd-ubl-profile.md) — where each ESPD concept lives in the UBL XML tree, and the validation rules.
- [`part-I.md`](reference/part-I.md) — Part I business concepts and their UBL representation.
- [`espd-edm-primary-input-enrichment.md`](reference/espd-edm-primary-input-enrichment.md) — the ownership rule: what is intrinsic ESPD structure vs. hand-authored enrichment.
- [`codelist-attribute-derivation.md`](reference/codelist-attribute-derivation.md) — how codelist attributes relate to the `.gc` files.

## `decisions/` — why it is built this way

Decision records and analyses that justify the design.

- [`decision-reverse-template-engine.md`](decisions/decision-reverse-template-engine.md) — why the correspondence mapping engine was kept over a reverse template engine.
- [`decision-ea-xml-export-fields.md`](decisions/decision-ea-xml-export-fields.md) — analysis of the EA export's `xmlElementName`/`xmlChildren` fields.
- [`espd-edm-semantic-identifiers.md`](decisions/espd-edm-semantic-identifiers.md) — the semantic-ID assignment policy.
- [`ea-ecertis-divergence.md`](decisions/ea-ecertis-divergence.md) — the EA-vs-e-Certis criterion-structure divergence report and source-of-truth options.
- [`exg-crim-part-structure-comparison.md`](decisions/exg-crim-part-structure-comparison.md) — a one-criterion worked example feeding that analysis.
- [`ux-navigation.md`](decisions/ux-navigation.md) — the UX/navigation decision record for the UI.

## Generated / registry docs (repo root of `docs/`)

- [`coverage-report.md`](coverage-report.md) — **generated** by `npm run model:compile`; a model coverage snapshot. Do not hand-edit (a test keeps it in sync).
- [`codelist-governance.md`](codelist-governance.md) — the human-readable form of `model/codelists/governance.json`.

## Notes and work-in-progress

Backlog ideas, proposals, design discussions, and the pre-generated model
diagrams have been moved to the separate **`espd-notes`** repository.
