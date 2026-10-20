# Model architecture — artifacts, purpose, and semantics

This document defines **what each modeling artifact is, what it means, and how the
artifacts relate**. It is the conceptual map of the `model/` subsystem — read it
before changing the pipeline or building anything (e.g. the UI) on top of the model.

For the directory layout and build commands see [`../../model/README.md`](../../model/README.md).
For the ownership rule (what lives where) see
[`espd-edm-primary-input-enrichment.md`](./espd-edm-primary-input-enrichment.md).

---

## 1. The big picture

The model is a **compiler**: it turns one authoritative structural input plus
hand-authored enrichment into several generated "lenses", each a projection of the
same underlying ESPD model for a different consumer (validation, XML interchange, UI).

```
  espd-tools/EAtoJSON/outputs/espd-edm.json      ← STRUCTURE (what fields exist, nesting,
            (EA export — the source of truth)        cardinality, conditions). Not ours.
                        +
  model/model-sources/   ← ENRICHMENT (our projection decisions: semantic ids,
            (hand-authored inputs)                 instance bindings, ui/i18n, codelist
                        |                           governance). Hand-authored, reviewed.
                        v
  model/compiler/        ← the COMPILER (reads structure, overlays enrichment, gates on
            (code only, no data)                   structural equivalence, generates lenses)
                        v
  model/generated/       ← GENERATED LENSES (committed output; never hand-edited)
       ├── instance-data/   schema + example   (data contract + sample)
       ├── form-structure/  form               (presentation lens)
       ├── xml-mapping/     request + response  (UBL interchange)
       ├── codelists/        UI pick lists      (codes + i18n keys)
       └── compiled-model.json                  (manifest / envelope)
                        +
  model/parts/           ← HAND-AUTHORED administrative blocks (Parts I/II/VI),
            (same lens shapes, written by hand)    which are not EA criteria
```

Two things are **not** generated and are deliberately hand-authored:

- `model/model-sources/` — the compiler's *inputs* (enrichment).
- `model/parts/` — the administrative INFORMATION blocks (Part I publication/buyer/
  procedure, Part II economic-operator identity + power of attorney, Part VI
  signature). These are not criteria, so the criterion compiler does not produce
  them; they are authored directly in the same lens shapes the compiler emits.

---

## 2. The ownership rule (where a fact belongs)

Every fact about the model has exactly one home. This is the invariant that keeps
the system coherent:

| Kind of fact | Lives in | Example |
|---|---|---|
| **Structure** — which fields exist, nesting, cardinality, conditional branches | `espd-edm.json` (EA export, upstream) | C02 has a `QG1/Q1` indicator gating a `QSG1` convictions subgroup |
| **Codes & human text** | `ESPD-EDM/codelists/*.gc` | `country` = {AND: "Andorra", …} |
| **Projection decisions** — semantic ids, instance paths, uiType, i18n keys, codelist governance | `model/model-sources/` (hand-authored) | the C02 answer binds to `partIII.exclusionGrounds.exg-crim-corrpt.response.answer`, rendered as a `boolean` |
| **Interchange encoding** — UBL element names, value bindings | `model/model-sources/registries/` | `INDICATOR` → `cac:ResponseValue/cbc:ResponseIndicator` |

A corollary used throughout: the compiler must stay **generic** — no criterion code
or part key may appear in compiler *logic* (guarded by `generic-compiler.test.mjs`).
Everything criterion-specific is data in `model-sources/`.

---

## 3. The inputs (`model/model-sources/`)

Hand-authored, reviewed, the source of truth for enrichment.

### 3.1 Registries (shared, criterion-independent)

- **`value-types.json`** — one entry per `ValueDataTypeCode` (INDICATOR, AMOUNT,
  PERIOD, …). Each entry declares the JSON `instanceShape` (what the data looks
  like), and the UBL `requestXml` / `responseXml` value bindings (how it serializes
  on each side). The authoritative code set is `ResponseDataType.gc`; the registry
  is validated against it (provenance = ResponseDataType 5.0.0).
- **`codelist-attributes.json`** — the fixed code-list attribute sets (dated
  `listID`/`listAgencyID`/`listVersionID`) per codelist, as the Schematron expects.
- **`encoding-profile.json`** — kind → XML element conventions (group/subgroup/leaf).
- **`form-profile.json`** — presentation conventions: `filledBy` by node kind,
  default `uiType` per value type, i18n key prefixes. Criterion-independent defaults;
  per-criterion overrides live in a presentation sidecar.

### 3.2 Per-criterion sidecars (keyed by criterion code)

- **`<code>.sidecar.json`** — **required to model a criterion.** Joins each EA value
  leaf (by its `requestpath`) to a stable **semantic id** and an **instance binding**
  (`{ side: requirement|response, path: [...] }`). Also declares repeatable-group
  array containers (`repeatable: true`). This is the file that says "EA leaf X is
  instance field Y."
- **`<code>.hints.json`** — *optional.* Finer instance-data constraints the structure
  cannot derive (e.g. an explicit `optionalLeaves` relaxation).
- **`<code>.presentation.json`** — *optional.* Form presentation overrides (uiType per
  semantic id, group relabelling).

### 3.3 Codelist governance (`model/codelists/governance.json`)

One entry per codelist with the four **independent** axes — `shipped`,
`schematronValidated`, `useForUI`, `inlineEnum` — plus the derived
"implementer-choice" marker. Drives enum inlining (instance schema) and UI pick-list
emission. See [`codelist-governance.md`](../codelist-governance.md).

---

## 4. The generated lenses (`model/generated/`)

All committed, all regenerated by `npm run model:compile`, none hand-edited. Each is
a projection of the same model for a different consumer. **The binding key across all
lenses is the instance `dataPath`.**

### 4.1 instance-data — the DATA CONTRACT

Per criterion: **`<code>.schema.json`** + **`<code>.example.json`**.

- The **schema** is a JSON Schema the user's answers (the "instance data") must
  conform to. It is structure-derived: object nesting from the binding paths,
  scalar/array/object shapes from the value-type registry, required/optional from EA
  cardinality, and `if/then/else` conditionals **derived from the EA condition
  markers** (an `ONTRUE` subgroup becomes "if gate=true then these are required").
- The **example** is a minimal **conforming instance** — a real document fragment
  that validates against the schema.

This is the heart of the model: the schema says *what valid answer data looks like*,
addressed by dotted path (`partIII.exclusionGrounds.exg-crim-corrpt.response.answer`).

**Composition, not a monolith.** There is deliberately *no* single giant schema for the
whole ESPD. A real ESPD instance is sparse — it carries only the criteria selected for
that procedure/role — so a monolithic schema (which would imply every criterion is always
present) is the wrong shape. Instead the per-criterion schemas stay the single source and
are **composed by `$ref`**: each keeps its own `$id`, and generated **root schemas**
(a per-part root and a document-level root) reference the criterion schemas, keyed under
their container (e.g. `partIII.exclusionGrounds.<code>`), with each criterion sub-schema
optional (present-if-included). A validator loads all sub-schemas + a root and validates
the whole document in one pass without a merged file. See the browser-validation note in
§6.

### 4.2 form-structure — the PRESENTATION LENS

Per criterion: **`<code>.form.json`**. A flat-ish list of **fields**, each carrying
everything a renderer needs and nothing it does not:

| field property | meaning |
|---|---|
| `dataPath` | **the binding key** — the path into the instance data (and into the schema). `[]` marks a repeatable array segment. |
| `uiType` | which control: `boolean`, `text`, `textarea`, `date`, `url`, `code`, `number`, `amount`, … |
| `labelKey` | i18n key for the field label (English text in `i18n/i18n/en/espd.part*.json`) |
| `codelist` | for `uiType: code`, the pick-list name (resolved against `generated/codelists/`) |
| `required` | required-when-visible, derived from cardinality |
| `repeatable` | the field belongs to a repeatable group (array add/remove) |
| `visibleWhen` | `{ path, equals }` — show the field only when the instance value at `path` equals a value. Derived from the EA condition markers; this replaces the old `ONTRUE`/`ONFALSE` subgroup mechanism. |

Fields are grouped (`groups[]`) and ordered; captions are emitted as non-input notes.
The form carries **no XML concerns** — it references data by `dataPath` only.

### 4.3 xml-mapping — the INTERCHANGE LENS

Per criterion: **`<code>.request.mapping.json`** + **`<code>.response.mapping.json`**.
Declarative, bidirectional mapping specs between the instance data and UBL XML
(ESPD Request = buyer side, ESPD Response = economic-operator side). They are **run
by the shared mapping engine** (`model/mapping-engine/mapper.mjs`): `map()` exports
instance data → XML, `unmap()` imports XML → instance data. The specs never contain
XML-shaping *logic* — only correspondences the engine interprets.

### 4.4 codelists — the UI PICK-LIST LENS

Per codelist: **`<name>.json`** (+ `index.json`). Codes with an i18n `labelKey`
(`codelist.label.<name>.<code>`); English text lives in
`i18n/i18n/en/espd.codelists.json`. English-only by project policy. Generated from
the same `.gc` files as the inlined enums, so they cannot drift.

### 4.5 compiled-model.json — the MANIFEST / ENVELOPE

One file tying it together: model version + EDM provenance, the value-type set with
usage, the criterion inventory, the codelist governance digest, and generated-layer
counts. A machine-readable sibling of [`coverage-report.md`](../coverage-report.md).

---

## 5. How the artifacts bind together (the key relationship)

For any field the user fills in, three generated artifacts describe it, joined by the
**`dataPath`**:

```
form field                               instance data (example)            schema
──────────────────────────────────       ───────────────────────────        ─────────────────────
dataPath: partI.publication.type   ──►    partI.publication.type:            partI.publication.type:
uiType:   code                            "TED_CN"                            { type:string, enum:[…] }
codelist: docrefcontent-type        ◄──── (binds here) ────►                  (validates here)
labelKey: partI.publication.type
```

- The **form** tells the renderer *how to show* the field and *where its value lives*
  (`dataPath`).
- The **instance data** is the actual value, addressed by that same `dataPath`.
- The **schema** validates that value (type, enum, required, conditionals).
- The **example** is a ready-made conforming instance — a fixture / seed / preview.
- The **mapping** converts the whole instance to/from UBL XML for interchange.

So a model-driven UI is, in essence: *walk the form fields; read/write the instance
data at each `dataPath`; render from `uiType`; label from `labelKey`; options from
`codelist`; show/hide from `visibleWhen`; validate the instance against the schema;
export/import via the mapping engine.* No criterion-specific UI code is needed —
the lenses carry the structure.

---

## 6. Runtime vs. build-time code

- **Build-time:** everything in `model/compiler/`. Runs under `npm run model:compile`,
  reads `espd-edm.json` + `model-sources/`, writes `generated/`. Never shipped to the
  browser.
- **Runtime (shared):** `model/mapping-engine/mapper.mjs` — imported by the compiler
  (to run generated specs in tests) **and** by the UI (to export/import UBL XML). One
  copy, two consumers.
- **The generated lenses** are data, consumed at runtime by the UI (and by anything
  else that needs the model).

**Instance-data validation is client-side.** The app is a static, no-build browser app
(the dev server only serves files + proxies TED/ITB). Validation of the instance document
against the composed schema (§4.1) therefore runs in the browser. The chosen approach is to
**precompile the validators at build time** (Ajv standalone mode) into `model/generated/`
and import the plain-JS validators in the browser — no Ajv compiler shipped to the client,
no `eval`/CSP issue, and the validators stay generated-and-in-sync like every other lens.
(This is distinct from ITB Schematron validation, which is XML-level and delegated to a
remote service via the dev-server proxy.)

---

## 6b. The UI data path

The browser UI is driven by the generated model. `js/model.js` loads the UI bundle
from `model/generated/ui/` (`index.json` + per-part lenses + `roles.json`), and UBL
export/import goes through the shared mapping engine: `js/xml-export.js` calls
`composeInBrowser` from `model/mapping-engine/compose-document-browser.mjs` rather
than building XML strings by hand.

> **Historical note.** An earlier UI generation read a hand-authored `espd-edm/`
> directory and re-implemented the UBL mapping by hand in `js/xml-export.js` /
> `js/xml-import.js`. That directory has been removed and the mapping consolidated
> onto the shared engine. The original migration plan was moved to the separate
> `espd-notes` repository (`notes/ui-rebuild-plan.md`).

---

## 7. `model/legacy/` — what it is and is not

`legacy/` holds the **pre-compiler** per-part artifacts (hand-authored originals) and
dev tooling, kept only as **parity references** the compiler tests compare against.
It is slated for removal per part as the compiler reproduces each one. Do not build
new work on `legacy/`. (Note: `mapping-engine/` is NOT legacy — it is live runtime
code.)

---

## 8. Glossary

- **Criterion** — an ESPD exclusion ground or selection criterion (Parts III/IV, plus
  the Part II/V `OT` criteria). Modeled by a sidecar + compiled to the lenses.
- **Administrative block** — an EA `INFORMATION` block (Parts I/II/VI): party/
  publication/signature data, not a criterion. Hand-authored in `model/parts/`.
- **Instance data** — a user's filled-in ESPD answers, as a JSON document addressed by
  `dataPath`, conforming to the instance-data schema.
- **Lens** — a generated projection of the model for one consumer (schema, form,
  mapping, codelist).
- **`dataPath`** — the dotted instance path that is the single binding key across the
  form, the schema/example, and (via the engine) the XML mapping.
- **Value type** — a `ValueDataTypeCode` (INDICATOR, AMOUNT, PERIOD, …) with a JSON
  shape and UBL bindings, registered in `value-types.json`.
