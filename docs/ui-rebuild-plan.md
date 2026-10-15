# Rebuilding the UI as a model-driven renderer

**Goal.** Replace the UI's data layer, renderer, **and hand-rolled XML export/import**
with a thin, **generic, model-driven binder** over the generated `model/` lenses + the
shared mapping engine; port `roles.json` into `model/` as a first-class input; validate
instance data against composed, precompiled schemas; and retire the hand-authored
`espd-edm/` directory. Reuse UI *infrastructure* (TED design system CSS/shell, i18n,
TED/ITB clients, dev server, wizard/home chrome) — rebuild only the data-shaped parts.

> See [`model-architecture.md`](./model-architecture.md) for artifact definitions.

## Core idea: the form/schema/example triple is the UI contract

The model carries everything a renderer needs, joined by the instance **`dataPath`**:

```
form field                          instance data              schema
dataPath: partI.publication.type ─► partI.publication.type ─►  { type:string, enum:[…] }
uiType:   code                      = "TED_CN"                  (validates the value)
codelist: docrefcontent-type        (bind read/write here)
labelKey: partI.publication.type
visibleWhen? / required / repeatable
```

A model-driven renderer is a **small generic engine**: walk `form.fields[]` → read/write
the **instance JSON** at `field.dataPath` → render from `field.uiType` (+ `codelist`) →
label from `labelKey` → show/hide from `visibleWhen` → array add/remove where `dataPath`
has `[]` → **validate against the composed schema** → **export/import UBL via the mapping
engine**. The `*.example.json` instances are the binding fixtures.

## Rebuild, not migrate (and why)

The current data layer is coupled to the old `espd-edm/` shape — `contentpath` string
keys, `ONTRUE`/`ONFALSE` subgroup codes, nested `components[]`, a `propertydatatype`
switch, hard-coded codelists — and, critically, **re-implements the entire UBL mapping by
hand** in `xml-export.js` (string building) and `xml-import.js` (lossy regex parsing that
maps ~8 fields and dumps the rest under raw property-id keys). Every one of those concepts
is replaced by a model concept (`dataPath` / `visibleWhen` / `uiType` / codelist-ref /
`mapper.mjs`). Rebuilding the data layer is *less* code and makes export/import **lossless**
via the already-tested engine.

**Reuse (infrastructure):** the TED design system (`css/tokens.css` + `css/espd.css`),
`js/i18n.js`, `js/ted-lookup.js`, `js/itb-validation.js`, `js/ecertis.js`, `dev-server.js`,
and the app chrome: `app.js` wizard orchestration, `home.js`, `path-selector.js`,
`wizard-header.js`, `site-header.js`, `state.js` session/resume shell.

**Rebuild (data-shaped):** `js/model.js`, `js/renderer.js`, `js/codelists.js`,
`js/conditional.js`, the `state.js` answer store (key model), `js/xml-export.js`,
`js/xml-import.js`, `js/validation.js`.

> **Note:** `js/renderer.js` was modified by the TED design-system merge (`7ad04d8`); any
> prior analysis of it is partly stale. The rebuilt renderer MUST emit the **same TED
> markup/class vocabulary** the merged CSS targets (`.grid`, `article`, `hgroup`,
> `<dialog>`, button variants `.contrast` / `.secondary outline`, `.espd-*` classes) so the
> design system applies unchanged.

## Three gaps in `model/` to close first

1. No role registry equivalent to `roles.json` → port it in (Phase 1).
2. No assembled **part → ordered sections** structure, and no generated form-structure for
   **Parts I & VI** → assemble + compile them (Phases 2–3).
3. Part I affordances (`radio-input-group`, TED `lookup`) live only in `espd-edm/` → port
   as model data (`uiHints`) (Phase 2).

---

## Step-by-step plan

### Phase 0 — Safety net (before any change)
- **0.1** Extend the existing Playwright setup (`playwright.config.js`, `test:e2e`) with
  smoke/behaviour tests against the CURRENT UI: for each role, run home → path-selector →
  wizard; render each part; assert key fields, conditional show/hide, codelist options,
  the Part I TED lookup, **import an ESPD and resume**, and **export** round-trips.
- **0.2** Capture golden snapshots (rendered DOM + the post-TED-merge styling) per
  (role × part). This is the parity oracle the rebuild is proven against — doubly important
  now that the design system just changed.

### Phase 1 — Port the role registry into `model/` (gap #1)
- **1.1** `model/model-sources/roles.json` — owned copy (buyerTypes, eoRoles, `formBehavior`
  with `visibleParts`/`editableParts`/`exclusionGroundRules`, `documentType`, `xmlMapping`).
- **1.2** `model/compiler/roles.mjs` — load + validate (unique ids; parts ⊆ {I..VI}; valid
  exclusion categories; `documentType` ∈ {request,response}).
- **1.3** Emit `model/generated/ui/roles.json`; add a roles summary to `compiled-model.json`.
  Test + staleness guard.

### Phase 2 — Compile Parts I & VI + port Part I affordances (gaps #2, #3)
- **2.1** Bring Parts I & VI into the per-section form/schema/example lens shape (extend the
  hand-authored `model/parts/partI`+`partVI`), so every part is first-class.
- **2.2** Port the Part I affordances as **model data**: a `uiHints` block on the relevant
  fields (`control: "radio-input-group"`, `lookup: "ted-notice"`). The renderer reads these
  from the model instead of hard-coding `PI01_…` paths.

### Phase 3 — UI assembly bundle + composed schemas
- **3.1** `model/compiler/build-ui-bundle.mjs` — compose per-criterion form-structure +
  hand-authored parts + roles into the assembled **part → ordered sections** structure:
  ```
  model/generated/ui/
    index.json      manifest: version, parts[], roles ref, codelists ref, schema refs
    roles.json
    part-I.json … part-VI.json   per-part { title, filledBy, sections:[ {id, title, fields:[…]} ] }
  ```
  Each field is the form-structure field (`dataPath`/`uiType`/`labelKey`/`codelist`/
  `visibleWhen`/`required`/`repeatable`/`uiHints?`). Deterministic; wired into
  `model:compile`; staleness-guarded.
- **3.2** Ordering/grouping: criteria in coverage order; administrative sections in document
  order; carry section titles + `filledBy`.
- **3.3** **Composed JSON Schemas (document root + part roots).** Generate:
  - per-part root schemas (`part-III.schema.json` …) that `$ref` each included criterion
    schema under its container (`partIII.exclusionGrounds.<code>`), criterion sub-schemas
    optional (present-if-included); and
  - a document-level root (`espd.schema.json`) that `$ref`s the part roots.
  Per-criterion schemas keep their `$id`s and remain the single source — this composes,
  never merges.

### Phase 4 — Rebuild the UI data layer
- **4.1** `js/model.js` → load `model/generated/ui/index.json` + `part-*.json` +
  `roles.json`. Keep the role-helper API (`getPartsForRole`, `isPartEditable`,
  `isCriterionMandatory`) — it maps cleanly onto the ported roles and already drives the
  wizard/path-selector/home flows.
- **4.2** `js/state.js` answer store → an **instance-data document keyed by `dataPath`**
  (nested JSON, not flat `contentpath` strings), with array (`[]`) read/write for repeatable
  groups. This store IS the ESPD instance — the thing the schema validates, the mapper
  exports, and session-resume persists/restores.
- **4.3** `js/codelists.js` → fetch `model/generated/codelists/<name>.json`; resolve labels
  via the `espd.codelists` i18n namespace (add it to `i18n.js`'s load list). `getCodelist`
  keys on the field's `codelist` name, not `propertydatatype`.
- **4.4** `js/conditional.js` → evaluate `field.visibleWhen {path, equals}` against the
  store (replaces `ONTRUE`/`ONFALSE`).

### Phase 5 — Build the generic renderer (TED markup)
- **5.1** `renderField(field, store)` dispatching on `field.uiType`; bind via `field.dataPath`;
  label via `labelKey`; options via `codelist`. Emit **TED design-system markup/classes**.
- **5.2** Repeatable groups: array add/remove from `[]` in `dataPath` — new capability.
- **5.3** `visibleWhen`-driven show/hide, re-evaluated on store changes.
- **5.4** Part I radio-group + TED lookup driven by `uiHints` (Phase 2.2); reuse
  `ted-lookup.js`.
- **5.5** Wizard integration (explicit): the rebuilt renderer must plug into the EXISTING
  flows unchanged in spirit — `home.js` landing + Continue/resume, `path-selector.js`
  buyer/EO two-step role pick (reads `getRoles()`), `wizard-header.js`, stepped parts from
  `getPartsForRole()`, and the buyer criteria-selection view sourced from the ported roles.

### Phase 6 — Instance-data validation (precompiled, client-side)
- **6.1** At BUILD time, precompile the composed schemas (Phase 3.3) into **standalone Ajv
  validators** (`ajv/dist/standalone`) emitted to `model/generated/` — plain-JS validator
  functions, no Ajv compiler shipped to the browser, no `eval`/CSP issue. Wired into
  `model:compile`; staleness-guarded.
- **6.2** `js/validation.js` → import the precompiled validators; validate the live instance
  store on field change (debounced) and on save/export. Map validator errors to fields by
  instance path → `dataPath` and surface inline (required / enum / derived `if/then/else`).
- **6.3** Use `*.example.json` as validation fixtures and preview/seed data.
- **6.4** Export/import via the **mapping engine**: `generateXml()` → `mapper.map(store)`;
  `importXmlFile()` → `mapper.unmap(xml)` → store → re-validate. Import becomes lossless and
  "resume from imported ESPD" works because import lands in the same store the renderer binds.
  Gate export on a valid instance.

### Phase 7 — Cut over & retire the legacy data path
- **7.1** Run the Phase-0 harness against the rebuilt UI; diff vs. goldens (DOM + styling);
  fix deltas.
- **7.2** Delete `espd-edm/` (data + `*.cjs` tooling), the hard-coded codelist tables, and
  the hand-rolled `xml-export.js`/`xml-import.js` internals (replaced by the engine wrappers).
  Update build/deploy + docs.

---

## Risks / watch-items

- **Answer-store key model** (`contentpath` → nested `dataPath` JSON) is the central change;
  it is also what makes schema validation + the mapping engine "just work" (both speak
  `dataPath`). Do it once, behind the Phase-0 harness.
- **TED design system** just merged: the rebuilt renderer must emit matching markup/classes,
  and goldens must capture the new styling.
- **Parts I & VI** are the least-covered by `model/` — Phase 2 is the real new modeling work.
- **Export/import** moving onto the engine is a big correctness win but changes XML output;
  validate against ITB + the Phase-0 round-trip goldens.
- **Repeatable groups** are genuinely new UI behavior.
- **Validation UX**: map precompiled-validator errors to fields by instance path; don't dump
  raw output.

## Execution order

Phase 0 → 1 → 2 → 3 are additive and do **not** touch the running UI. The UI moves in 4 + 5
(together, behind the harness), with 6 layered on the new store. The legacy data path
(`espd-edm/`, hand-rolled export/import) is deleted last, in 7, once the harness is green.
