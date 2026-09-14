# 1. Defining the ESPD Application Profile over UBL

## The question

To define the ESPD Exchange Data Model (EDM) we need to define an **application
profile** over UBL. The current approach takes every information element (e.g.
`I68`, the identifier of the procurement notice) and every criterion (e.g.
`C01`, criminal conviction) and models how each is encoded in UBL XML.

`QualificationApplicationRequest` and `QualificationApplicationResponse` from
UBL are deliberately generic in their XSDs. So defining the ESPD profile is
really two activities:

1. Provide a model of **how each information element is encoded** under
   `QualificationApplicationRequest/Response`.
2. Define **Schematron rules** with tighter validation on those documents.

Is this the best way to define a subset / application profile of UBL? Are there
other ways?

## Short answer

Yes, UML model + Schematron is a legitimate and widely used pattern. It maps to
what OASIS/CEN call a **customization** or **conformant subset** of UBL. UBL
explicitly anticipates this: it distinguishes *conformance* (you may only subset
and constrain, never add) from *compatibility*, and Schematron is the sanctioned
mechanism for rules a plain XSD cannot express.

You are not off track. But two things are worth separating.

## The two concerns being mixed

1. **Structural subsetting** — which elements exist, their cardinality, which
   optional UBL elements are used.
2. **Value / co-occurrence constraints** — business rules ("if X then Y must be
   present"), code-list bindings.

Separating these is correct. The open question is what *formalism* to use for
each, because there are more formal options than UML prose + hand-written
Schematron.

## Options for defining the profile

Ordered roughly from most-bespoke to most-standardized.

### A. UML model + hand-written Schematron (current approach)
- **Pro:** UML documents the domain well and can drive code/schema generation;
  Schematron handles rules XSD cannot.
- **Con:** The UML-to-UBL-XML mapping is informal unless tied to something
  machine-checkable. Readers must trust that "I68 maps to `cac:X/cbc:Y`". There
  is no machine-verifiable link between the per-element model and the UBL schema.

### B. Genericode + Context/Value Association (CVA) files
- The OASIS-native way to bind code lists (the repo's `.gc` files) to specific
  contexts in the instance via XPath. CVA compiles to Schematron. If many
  constraints are "this element must draw from that code list", CVA is more
  declarative and standard than hand-written Schematron.

### C. UBL customization via NDR + a documented subset schema
- Produce a restricted schema (subset) plus Schematron. OASIS ships
  tooling/methodology for creating conformant UBL subsets. This makes the "which
  elements are allowed" part machine-enforceable at the **schema** level rather
  than living only in UML prose. (Covered in detail in
  [05-ubl-ndr-and-subset-schema.md](05-ubl-ndr-and-subset-schema.md).)

### D. CEN/BII-style transaction + business-rule modelling
- The European eProcurement world (BII → work feeding Peppol) models these as
  transactions with business rules expressed as Schematron, generated from a
  single model of "business terms". Each business term (I68, C01) gets an ID, a
  cardinality, a datatype, and a binding to the UBL path — all in one source
  model that generates both documentation and Schematron. (Covered in
  [03-cen-bii-peppol-methodology.md](03-cen-bii-peppol-methodology.md).)

### E. DCTAP / SHACL-style approaches (only if RDF/JSON-first)
- Not directly applicable to UBL XML, but relevant if the reference
  implementation validates a JSON representation. SHACL/JSON Schema give a
  declarative constraint language for the JSON instance model.

## Recommendation

The weak link in the current approach is not the choice of UML + Schematron —
it is the **traceability between them**. The strongest pattern is a **single
source-of-truth model** where each information element (I68, C01, ...) carries:

- a stable ID
- cardinality (min/max)
- datatype / code-list binding
- the exact UBL path under `QualificationApplicationRequest/Response`
- the business rule(s) that reference it

From that one model you **generate**:

- the documentation (UML views / tables)
- the Schematron (structural cardinality + co-occurrence rules)
- optionally a subset schema and the code-list bindings (Genericode/CVA)

This is the CEN/BII / Peppol methodology and it keeps "UML says X" and
"Schematron enforces Y" from drifting apart. This repository already has the
pieces: `.gc` code lists, an EA conceptual model, and an `EAtoJSON` tool
producing `espd-edm.json` — a natural home for the single-source model.

## Direct answers

- **Is UML + Schematron the best way?** It is good and standards-aligned. It is
  not the only thing needed. Keep it, but formalize the mapping so it is
  generated, not asserted.
- **Are there other ways?** Yes: Genericode+CVA for code-list binding, OASIS
  conformant-subset schemas for structural restriction, and the CEN/BII
  transaction+business-rule model for full traceability. These are not mutually
  exclusive with the current approach; they make specific parts more rigorous.
