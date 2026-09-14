# 4. Encoding the Form-Structure Layer into the Model

Question: can the **form structure** layer also be encoded into the same model?

Short answer: **yes** — it fits naturally as *another binding layer* over the
same semantic core, exactly like the UBL/XML binding. But there is an important
design caveat about what belongs in the core model versus what belongs in the
form layer.

## What the repo already has

Three *lenses* over the same instance-data model, joined by `dataPath` / `from`
(both dotted paths into the instance model) and tagged with stable IDs in
comments (`PI01`, `PI02`, `PI03`):

- **Instance data** — the canonical, syntax-neutral shape
  (`partI.publication.reference.type`, ...).
- **XML mapping** (`model/xml-mapping/part-I.mapping.json`) — binds each data
  path to a UBL XPath (`from` → `to`).
- **Form structure** (`model/form-structure/part-I.form.json`) — binds each data
  path to UI presentation (`dataPath`, `uiType`, `labelKey`, `visibleWhen`,
  `filledBy`).

In CEN/BII terms: the instance-data model is the **information model (BTs/BGs)**,
the XML mapping is the **UBL syntax binding**, and the form structure is a
**presentation binding**. So the form layer is *already* just another binding
over the same core, exactly like the XML layer. The real question is how to
formalize and connect it better.

## The key design distinction

Currently `PI01/PI02/PI03` live only in `$comment` strings. The join key between
layers is the **dotted `dataPath`**, not a stable ID. That works, but has two
consequences:

1. **The dotted path does double duty** — it is both "location in the data tree"
   and "identity of the business term". If the instance shape is restructured,
   every form field and mapping rule breaks, even though the *business term*
   (I68, C01, PI01) did not change. In pure BII, the stable BT-ID is the join
   key precisely so structure can move without breaking bindings.
2. **Presentation concerns must not leak into the core.** The form file already
   states it "carries NO XML/serialization concerns and does NOT redeclare the
   data shape". Keep that discipline in the other direction too: section
   grouping, field ordering, `uiType`, `labelKey`, `visibleWhen` are
   **form-only** and should never migrate into the instance model or XML mapping.

So: the form layer can be encoded into the model **as a binding lens** (which it
already is), but **not** by folding UI concerns into the semantic core. The form
layer *references* the core; it does not live inside it.

## What "encoding it into the model" should mean

### Level 1 — keep three files, add a real join key (low effort, high payoff)

Promote the `PIxx` (and `I68`/`C01`) identifiers from comments into actual
fields, and make every layer reference the **element ID** plus the data path.

In the instance-data model, each leaf/group carries an `id`:

```json
{
  "id": "PI01.type",
  "dataPath": "partI.publication.reference.type",
  "datatype": "Code",
  "codeList": "docrefcontent-type",
  "cardinality": "1..1"
}
```

Then form fields and mapping rules reference `"element": "PI01.type"` instead of
repeating the dotted path. Benefits:

- Structure can move without breaking bindings.
- **Coverage** becomes mechanically checkable: every element ID should appear in
  the XML mapping (or be explicitly marked "not serialized"), and the form
  should only reference element IDs that exist. A cheap, powerful lint.
- Error messages, docs, form, and XML all trace to one ID — the BII
  traceability win.

### Level 2 — a single source model that generates all three lenses

Maintain one model per element:

```
element PI01.type
  ├─ semantic:    datatype=Code, cardinality=1..1, codeList=docrefcontent-type, definition="…"
  ├─ xml-binding: cac:AdditionalDocumentReference/cbc:DocumentTypeCode (+ listID/listAgencyID/listVersionID)
  ├─ form-binding: uiType=select, labelKey=part1.publication.type, section=publication, filledBy=contractingAuthority
  └─ rules:       [BR-COM-10-03 (mandatory), BR-OTH-01 (code attrs)]
```

From that one definition, generate the instance-data schema,
`part-I.mapping.json`, `part-I.form.json`, Schematron, and docs. Full BII/Peppol
rigor. More machinery (the `EAtoJSON` / `espd-edm.json` pipeline is the natural
home); the tradeoff is that a generator is more upfront work than three
hand-kept files cross-checked by a linter.

## Form-layer concerns that need a home

The form lens has concerns the XML lens does not:

- **Ordering and grouping** (`sections`, field order) — presentation-only. Fine
  where it is.
- **Conditional visibility** (`visibleWhen`) — UI logic, but it can *overlap*
  with semantic co-occurrence rules. Example: the identifier `scheme` field is
  visible only when identifier `value` `isPresent`. If a Schematron rule also
  says "`schemeID` requires an ID value", the *same business constraint* is
  expressed twice (UI visibility + validation) and can drift. In BII the
  constraint is authored **once** against the element, and both the form
  visibility and the Schematron are generated from it. Decide whether
  `visibleWhen` is derived from a rule or authored independently.
- **`filledBy` (role)** — arguably *semantic* (who is responsible for a datum:
  contracting authority vs economic operator) rather than purely presentational.
  In ESPD this distinction is real and important. Consider promoting `filledBy`
  into the core model as a semantic property, and letting the form layer merely
  *consume* it. A case of something currently in the form file that arguably
  belongs in the core.
- **i18n label keys** — presentation-only; keep in the form layer (or a separate
  i18n bundle the form references).

## Recommendation

The repo is closer to the ideal than most real projects. Two concrete moves:

1. **Adopt Level 1 now:** promote `PIxx`/`I68`/`C01` IDs out of `$comment` into
   real join keys, and write a small cross-check verifying coverage across the
   three lenses. Low cost; removes the "dotted-path-as-identity" fragility.
2. **Decide the home for two ambiguous properties:** `filledBy` (likely belongs
   in the core as semantics) and `visibleWhen` (decide whether it is derived
   from a co-occurrence rule or authored in the form). This prevents the classic
   drift where the same rule is stated in two places.

Level 2 (full generation) is worth it if the number of elements is large and
multiple teams / national profiles consume the model — an optimization to grow
into once the ID join key is in place.
