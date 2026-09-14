# 9. Can the Subset Schema Really Be Generated from the BII Semantic Layer?

Doc 08 claims: *"BII gives you the source model; the subset schema is one of the
things you can generate from it."* Is that actually true, or is it hand-waving?

**Short answer: yes, but with important qualifications.** You can generate the
*structural skeleton* of a subset schema mechanically. You cannot generate a
*complete, tight* schema from the semantic model alone — some information the
schema needs simply does not live in the semantic layer, and some constraints
cannot be expressed in XSD at all. Below is exactly what is generatable, what is
not, and what is missing from this repo's model today.

## What "generate the subset schema" really means

A UBL subset schema is a restricted XSD that says, for the ESPD slice:

1. **Which elements exist** under `QualificationApplicationRequest/Response`.
2. **Their nesting** (the containment tree).
3. **Their cardinality** (`minOccurs` / `maxOccurs`).
4. **Their datatypes** and any **enumerations** (code-list value restrictions).
5. Element **order** (XSD sequences are ordered).

Generation is possible to the extent the semantic model carries (1)–(5). It does
not carry all of them.

## What the current model *does* contain

From `espd-tools/EAtoJSON/outputs/espd-edm.json`, each business term is a
hierarchy of components like:

```json
{
  "tag": "I69", "type": "INFORMATION", "cardinality": "1",
  "components": [
    { "tag": "CP1", "type": "CONTRACTING_PARTY", "cardinality": "1",
      "components": [
        { "tag": "PAR1", "type": "PARTY", "cardinality": "1",
          "components": [
            { "tag": "PI1",  "type": "PARTY_IDENTIFICATION", "cardinality": "1..n" },
            { "tag": "PN1",  "type": "PARTY_NAME",           "cardinality": "1..n" },
            { "tag": "PA1",  "type": "POSTAL_ADDRESS",       "cardinality": "1..n",
              "components": [ { "tag": "CTR1", "type": "COUNTRY", "cardinality": "1" } ] }
          ] } ] } ]
}
```

That gives us, mechanically:

- **(1) Which elements** — via `type` (semantic UBL type: `CONTRACTING_PARTY`,
  `PARTY`, `POSTAL_ADDRESS`, `COUNTRY`, ...). These map to UBL `cac`/`cbc` names.
- **(2) Nesting** — the `components` tree is exactly the containment hierarchy.
- **(3) Cardinality** — the `cardinality` strings (`1`, `1..n`) convert directly
  to `minOccurs`/`maxOccurs`.

So **the structural skeleton — items (1), (2), (3) — is generatable today.** The
`requestpath`/`responsepath` values (`I69_info-buyer/CP1/PAR1/PA1/CTR1`) are the
containment path already spelled out. This is genuinely most of a subset schema's
*shape*.

## What the model does *not* contain (the gaps)

A workspace check confirmed the model has **no** `datatype`, `listID`,
`codeList`, `valueDataType`, or `responseDataType` fields. That means:

- **(4) Datatypes and enumerations are missing.** The model knows a `COUNTRY`
  element exists, but not that its value is a code drawn from the `Country`
  Genericode list, nor that a value node is `cbc:IdentificationCode`. Without
  this, a generated schema can place the element but cannot restrict its value
  type or enumerate allowed codes.
- **(5) Element order is not explicit.** UBL XSD sequences are ordered, and a
  conformant restriction must respect the base UBL order. The `components` array
  has *an* order, but nothing guarantees it matches UBL's required sequence.

There is also a subtler point about **the `type` → UBL name mapping**. The model
uses semantic type names (`ADDITIONAL_DOCUMENT_REFERENCE`) rather than UBL
element names (`cac:AdditionalDocumentReference`). Generating a schema needs a
resolver from these type tokens to concrete UBL `cac`/`cbc` element and type
names. That resolver is a fixed lookup (it does not change per element), so it is
cheap to build, but it *is* a required piece that is not in the model itself.

## The hard limit: XSD cannot express the interesting constraints

Even a perfect, fully-annotated semantic model cannot generate a schema that
enforces ESPD's real business rules, because **XSD structurally cannot express
them**:

- "If criterion C01 is present, response group X is required."
- "Element A is mandatory only when code B has value V."
- "This repeated block is *the* C01 criterion (identified by its code)."

These are co-occurrence / conditional / identity rules. They are generatable —
but as **Schematron**, not XSD. So "generate the subset schema from the model" is
true for structure, and the remaining (and most valuable) constraints are generated
as Schematron from the same model. The two outputs together cover the profile;
neither alone does.

## Where the base UBL schema comes in

One more nuance: a conformant subset is a **restriction of the base UBL XSD**,
not a freshly-invented schema. Practically, generation is one of:

1. **Emit a standalone restricted schema** from the model — simplest to produce,
   but you must get datatypes/order right yourself to stay UBL-conformant.
2. **Emit an XSD `restriction` layered on the UBL types** — more faithful to the
   "conformant subset" definition (an instance valid against the subset is valid
   against full UBL), but XSD particle-restriction rules are strict and require
   the base UBL type definitions as input.

Either way, the generator needs the **base UBL schemas as a second input**
alongside the semantic model. The model supplies "what ESPD uses"; UBL supplies
"the datatypes and legal order to restrict."

## Verdict

| Schema ingredient | Generatable from the model? | Status in this repo |
|---|---|---|
| Which elements exist | Yes | Present (`type`) |
| Nesting / containment | Yes | Present (`components`, `*path`) |
| Cardinality (min/max) | Yes | Present (`cardinality`) |
| `type` → UBL element name | Yes, via a fixed resolver | Resolver not built yet |
| Datatypes | Only if added to the model | **Missing** |
| Code-list / enum restriction | Only if added to the model | **Missing** |
| Element order | Needs UBL base schema as input | Not guaranteed by the model |
| Business / co-occurrence rules | Not as XSD — as Schematron | N/A (belongs in rules) |

**So, honestly:**

- **Yes**, you can generate the subset schema's structural skeleton from the BII
  semantic layer today — the repo's model already carries elements, nesting, and
  cardinality.
- **Not completely** — you must first (a) add datatype and code-list bindings to
  the model, (b) build a `type`→UBL-name resolver, and (c) feed the base UBL
  schemas in to get datatypes and legal element order.
- **The most valuable constraints don't go in the XSD at all** — they generate as
  Schematron from the same model.

This is why doc 08 frames the subset schema as *one generated output among
several* (JSON Schema, Schematron, docs, code-list bindings), all produced from
one enriched source model — rather than as a hand-authored artifact or a
free lunch.

## Concrete next step to make it fully generatable

Enrich the element model with the two missing fields, per leaf component:

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
the same model can drive: the restricted XSD (structure + datatypes + enums),
the Schematron (rules + code-list value checks), the JSON Schema, and the docs —
which is the single-source-generation goal from docs 03, 04, and 08.
