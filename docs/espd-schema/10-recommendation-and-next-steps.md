# 10. Recommendation and Best Next Step

This document pulls together the whole discussion (docs 01–09) into a single
recommendation for making ESPD as useful as possible, and names the one best
next step.

## The through-line of the whole discussion

One theme recurs across every topic:

> ESPD is **already shaped like a BII/Peppol single-source model**, but its
> layers are joined by fragile keys and the model is **missing the two fields**
> that would let it generate everything else.

Every comparison points the same way:

- The hard part of ESPD is **semantic and rule-based**, not structural
  ([08](08-comparison-ndr-vs-bii.md)).
- There are already three lenses over one core — instance data, XML mapping, form
  structure — joined by dotted paths, with business-term IDs living only in
  `$comment`s ([04](04-encoding-the-form-layer.md)).
- `espd-edm.json` carries elements, nesting, and cardinality, but **no datatype
  and no code-list binding** ([09](09-generating-the-subset-schema.md), verified
  by search).
- The subset XSD, Schematron, JSON Schema, and docs are all **generatable** from
  one enriched model — but only once those two fields exist and a **stable ID**
  is the join key.

So the most useful move is not to add another artifact. It is to **close the gap
that unlocks all the artifacts**: turn `espd-edm.json` into a true single source
of truth with stable IDs and complete leaf bindings.

## Best overall recommendation

Make `espd-edm.json` (fed by `EAtoJSON`) the **single source model** and generate
every downstream artifact from it:

```
espd-edm.json  (stable IDs + cardinality + datatype + codeList + ublElement + rules)
        │
        ├──► restricted UBL XSD        (structure + datatypes + enums)
        ├──► Schematron (BR-IDs)       (co-occurrence + code-list value rules)
        ├──► JSON Schema               (for the JSON-first consumers)
        ├──► xml-mapping / form lenses (referencing element IDs, not dotted paths)
        └──► human docs / tables
```

This serves *all* the consumers identified in
[02](02-developer-experience.md): buyers and suppliers get guides + examples +
codegen, validators get runnable rules, and national profile authorities get a
machine-processable base to re-subset.

## The single best next step

**Enrich the element model with the two missing fields — `datatype` and
`codeList` — and promote the business-term IDs from `$comment`s into real join
keys.** This is the "Level 1 + doc 09 enrichment" step, and it is the keystone:
nothing else can be generated cleanly until it exists.

Why this step first, ranked against alternatives:

- **Prerequisite for everything else.** No tight subset XSD (needs
  datatypes/enums), cleaner Schematron (needs code-list bindings), or JSON Schema
  without it — exactly the gaps doc 09 identified.
- **Low-risk and additive.** Annotating an existing generated model, not
  restructuring instances or rewriting mappings.
- **Immediate cheap win.** Once IDs are real, a small **coverage lint** can
  verify every element is mapped in `part-I.mapping.json` and every form field
  points at a real element (the lint from doc 04). Catches drift today, before
  any generator exists.
- **Verifiable.** The asserted datatypes/code lists can be checked against
  `part-I.example.json` and the `.gc` files, so annotations are grounded, not
  guessed.

Everything bigger (XSD generator, Schematron generator, conformance suite)
becomes straightforward *after* this and is blocked or hacky *before* it.

## Concrete first slice (prove it end to end)

Rather than boil the ocean, do one vertical slice, then roll out:

1. Pick **Part I** — its mapping, form, and example already exist (richest
   evidence base).
2. Add `id`, `datatype`, `codeList`, and `ublElement` to each leaf in the Part I
   portion of `espd-edm.json`, cross-checking values against
   `part-I.example.json`, the `part-I.mapping.json` paths, and the `.gc` code
   lists so they are grounded in reality.
3. Write the **coverage lint** (small script): fail if a Part I element is not
   mapped, or a form field references a missing element.
4. Generate the first artifact — the **JSON Schema** first, because the pipeline
   is JSON-first, so it delivers value to the project's own developers
   immediately and is simpler than XSD restriction.

Each step is independently useful even if work stops after it.

## Enriched leaf example (target shape)

```json
{
  "tag": "CTR1",
  "type": "COUNTRY",
  "cardinality": "1",
  "ublElement": "cac:Country/cbc:IdentificationCode",
  "datatype": "Code",
  "codeList": "country"
}
```

Once every leaf has `ublElement`, `datatype`, and (where applicable) `codeList`,
one model drives the restricted XSD, the Schematron, the JSON Schema, and the
docs — the single-source-generation goal from docs 03, 04, and 08.

## What NOT to do first

- Do not hand-author a subset XSD as a standalone deliverable — it would
  immediately drift from the model and cannot express the business rules
  ([08](08-comparison-ndr-vs-bii.md), [09](09-generating-the-subset-schema.md)).
- Do not add more hand-written Schematron independent of the model — it
  re-creates the traceability gap the whole approach is meant to close.
- Do not fold UI concerns (`uiType`, labels) into the core model — keep the form
  as a binding lens ([04](04-encoding-the-form-layer.md)).
