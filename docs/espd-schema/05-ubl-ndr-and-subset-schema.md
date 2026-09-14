# 5. UBL Customization via NDR + a Documented Subset Schema

This is the approach that plugs most directly into existing developer tooling:
UBL's own conformance methodology, the OASIS Naming and Design Rules (NDR), and
the mechanism UBL provides for making a subset.

> Paraphrase / synthesis of the specifications, not a quotation.

## The core idea

UBL ships a large set of XSD schemas defining every document type and every
reusable component (`cac:*` aggregates, `cbc:*` basics). Almost everything is
optional and repeatable, because UBL serves every industry. A real application
uses only a slice. **Customization** is UBL's sanctioned way to define your
slice, in two flavours:

- **Conformant subset** — you may *remove* optional elements and *tighten*
  cardinality/optionality, but **never add** and never loosen. An instance valid
  against your subset is still valid against full UBL. This is the
  interoperability guarantee.
- **Compatible extension** — you add data in designated extension points
  (`ext:UBLExtensions`). A different track, generally discouraged for
  interoperability.

For an application profile like ESPD, the **conformant subset** is what you
want: pin down which `QualificationApplicationRequest/Response` elements are in
play and make "not allowed here" enforceable by a schema, not just prose.

## What OASIS NDR is

The **UBL Naming and Design Rules** is the ruleset OASIS uses to *build* UBL
itself from underlying data models (ISO 11179 naming, UN/CEFACT Core
Components). For a profile author it matters in two ways:

1. It explains why UBL schemas look the way they do (the `cac`/`cbc` split, the
   ABIE/BBIE/ASBIE structure, names like `ContractFolderID`). This helps you
   read the schema.
2. It defines how a conformant customization is allowed to behave — the rules
   you must follow so your subset stays conformant (subset-and-constrain only,
   keep the same namespaces, do not rename, do not reorder in a way that breaks
   the model).

You usually do not re-run the full NDR machinery yourself; you follow its
conformance rules while producing your subset.

## Producing a subset schema

Routes, in increasing formality:

### 1. XSD restriction / hand-authored subset schema
Author a schema that imports or redefines UBL types and restricts them: mark
unused optional elements prohibited, raise `minOccurs`, cap `maxOccurs`, narrow
simple types. An XML parser enforces the result directly. UBL has historically
been maintained via large model spreadsheets, and OASIS has published tooling to
generate customization schemas from a "subset" definition. Practical upshot:
developers point their XML tooling at *your* schema and get autocomplete +
validation for the ESPD slice only.

### 2. Genericode + a subset definition spreadsheet → generated schema
Because UBL's own model is spreadsheet-based, the tidy way is to express the
subset as data (which elements in, cardinalities, code-list bindings) and
generate the restricted XSD. Same "single-source model generates artifacts"
idea, applied to producing the schema.

### 3. Just-enough subset via Schematron only (no restricted XSD)
Some profiles skip the restricted XSD and enforce everything — presence,
absence, cardinality — via Schematron against full UBL. Simpler to maintain, but
gives up XSD tooling benefits (no autocomplete, no codegen from your subset).

## Why the XSD subset is a distinct DX lever

XSD and Schematron do different jobs:

| Concern | XSD subset | Schematron |
|---|---|---|
| Which elements exist / are allowed | Yes, natively | Possible but verbose |
| Cardinality (min/max) | Yes | Yes |
| Datatypes, enumerations | Yes | Yes |
| Co-occurrence ("if X then Y") | No | Yes |
| Cross-field / conditional logic | No | Yes |
| **IDE autocomplete** | **Yes** | No |
| **Code generation (JAXB, xsd.exe, xjc)** | **Yes** | No |

The last two rows are the DX payoff. With a restricted XSD, a developer can run
`xjc`/`xsd.exe`/equivalent for **typed classes** of exactly the ESPD slice, get
**autocomplete** showing only ESPD-valid elements, and catch structural errors
at compile/parse time before Schematron runs. Schematron then handles what XSD
cannot: "if a criterion of type C01 is present, its response group must contain
BT-X", code-list value bindings, conditional requirements. **Complementary, not
alternatives.** XSD = guide + structural gate; Schematron = semantic gate.

## Tradeoffs and caveats

- **Hand-authoring XSD restriction is painful.** `xsd:restriction` over deep UBL
  types is verbose and error-prone; particle-restriction rules are strict.
  Prefer generating from a model over hand-editing.
- **Maintenance across UBL versions.** When UBL revs, you regenerate. If
  hand-authored, you redo painful edits.
- **XSD cannot express the interesting rules.** Almost every *business*
  constraint in ESPD lands in Schematron anyway. XSD buys structure + tooling,
  not business validation.
- **Two artifacts to keep in sync** unless both are generated from one source —
  looping back to the single-source-model recommendation.
- **JSON-first reality.** A restricted XSD only benefits *XML* consumers. For a
  JSON instance model, the equivalent lever is a **JSON Schema** (structure,
  cardinality, code-list enums → JSON-side autocomplete, validation, codegen).

## How this maps to the repo

Given `part-I.mapping.json`, this repo generates UBL XML from a canonical JSON
instance model via a small interpreter (`map.mjs`). That shifts the calculus:

- The **JSON instance model is the real source of truth**, and the XML is a
  projection. So the "subset schema" most valuable to *these* developers is a
  **JSON Schema** over the instance model (JSON-side autocomplete + validation).
- A **restricted UBL XSD** is still valuable — as an **output artifact** for
  *external* consumers who receive the XML and want to validate/codegen against
  the ESPD slice without trusting the generator. It also serves as
  machine-checkable documentation of exactly which UBL elements ESPD touches.
- Both the JSON Schema and the restricted XSD could be **generated from the same
  element model** (the Level 2 idea). The mapping rules already enumerate the
  UBL paths ESPD uses — that set of `to` paths is essentially the skeleton of
  the subset. The repo is closer to being able to *generate* a subset schema
  than it might seem.

## Primary sources

- **OASIS UBL specification**, the *Conformance* section (defines subset vs.
  extension and the rules).
- **UBL Naming and Design Rules (NDR)** document.
- **UBL customization guidance** and the model spreadsheets / customization
  tooling published alongside UBL releases.

## Bottom line

The NDR + subset-schema approach gives the one thing Schematron and UML prose
cannot: **structural constraints that existing XML toolchains enforce and
generate code from** — a major DX win for XML consumers. Weaknesses: authoring
pain (mitigated by generating from a model) and structure-only coverage
(business rules still need Schematron). For this JSON-first pipeline, the direct
analogue that helps the project's own developers most is a generated **JSON
Schema**, with a restricted **UBL XSD** as a valuable output for external XML
consumers — both generatable from the element model the repo is halfway to
having.
