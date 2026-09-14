# 3. The CEN/BII and Peppol Methodology

A layered modelling approach that evolved over ~15 years of European
eProcurement standardization. This document describes the layers, the artifacts,
how they generate runnable validators, and how it maps to ESPD.

> The content below is a synthesis / paraphrase of how the methodology works,
> not a quotation of the specifications.

## Lineage in one paragraph

**CEN/ISSS WS/BII** (Business Interoperability Interfaces, ~2007 onward, phases
BII1/BII2/BII3) produced a methodology and a library of *profiles* and
*transactions* for pan-European eProcurement. **OpenPEPPOL** turned BII's models
into operational, maintained specifications (the Peppol BIS — Business
Interoperability Specifications) running over a real network. **EN 16931** (the
European e-invoicing standard) is the most mature descendant of this line. ESPD
sits in the same family and borrows the same modelling ideas.

## The layered model

Core idea: **separation of semantics from syntax**, in stacked layers, most
abstract to most concrete.

### 1. Process / choreography
Who exchanges what, in what order. BII called these *processes* and *profiles*
(a profile = a named collection of transactions supporting a business process).
Each profile has an identifier that can travel in the instance so a receiver
knows which ruleset applies.

### 2. Transaction
A single business document exchange (e.g. "submit an invoice", "request
qualification"), defined semantically, independent of UBL. ESPD's *Request* and
*Response* live here.

### 3. Business Information Requirements — the information model
The heart of the method. Each transaction is decomposed into **Business Terms
(BTs)** and **Business Groups (BGs)**. Every term gets:

- a **stable ID** (e.g. EN 16931 `BT-1` = invoice number, `BG-25` = invoice line)
- a **business name and definition** (semantic, syntax-free)
- a **cardinality** (min..max, e.g. `1..1`, `0..n`)
- a **datatype / semantic datatype** (Amount, Code, Identifier, Text, Date, ...)
- a **relationship** to its parent group

This yields a hierarchical, syntax-neutral information model, usually maintained
as a spreadsheet or UML model. ESPD's `I68`, `C01` identifiers are exactly this
concept.

### 4. Syntax binding
Each Business Term is mapped to a concrete path in a syntax (for ESPD, UBL):

```
BT-ID → UBL XPath → syntax datatype → code list
e.g. BT-1 → /Invoice/cbc:ID
```

Critically, the binding is a **separate, explicit, machine-readable artifact**,
not prose in UML notes. One information model can bind to multiple syntaxes
(EN 16931 binds to both UBL and UN/CEFACT CII). The repo's
`part-I.mapping.json` is conceptually this layer.

### 5. Business rules
Two kinds, kept distinct:

- **Integrity / co-occurrence rules** ("if BG-25 present then BT-126 mandatory").
  Semantic, expressed against Business Terms.
- **Code-list / value rules** (a term must draw from a specified list, often
  maintained as Genericode).

Rules get **stable rule IDs** (`BR-01`, `BR-CO-10`, ...) and human-readable
messages.

### 6. Validation artifacts (generated)
Rules + bindings are compiled into **Schematron**, so assertion messages carry
the rule ID and business text. Because the rule is authored against business
terms and the binding supplies the XPath, a failure ties back to a named
business rule. Code lists become Genericode + (optionally) CVA → Schematron.

## The pipeline

Most concrete artifacts are **generated from the model**, not hand-maintained:

```
Information model (BTs/BGs: IDs, cardinality, datatype)   ← single source
        │
        ├── + Syntax binding (BT → UBL XPath)
        │
        ├──► Human-readable specification (tables, the "BIS" document)
        ├──► Schematron (structure + co-occurrence rules, with BR-IDs)
        ├──► Code lists (Genericode) + value-binding Schematron
        └──► Test / conformance instances
```

In EN 16931 concretely: a normative spreadsheet lists every BT/BG with
cardinality and datatype; a separate set of Schematron files holds the rules;
code lists are maintained separately. The identifiers (BT-x, BG-x, BR-x) are the
glue that makes it traceable. Peppol BIS then *further restricts* EN 16931 —
adding tighter rules and its own `CustomizationID` — demonstrating that a
profile can be subset again downstream without forking the base.

## Key design principles worth adopting

1. **Semantics before syntax.** The BT/BG model says nothing about XML, which is
   why one model produced both UBL and CII bindings. A syntax-neutral core lets
   you add a serialization (JSON, RDF) rather than re-model.
2. **Stable identifiers everywhere.** BT/BG/BR IDs survive version changes and
   are the join key between model, binding, rules, docs, and error messages.
   ESPD's `I68`/`C01` is the same instinct.
3. **Explicit, machine-readable binding layer.** The BT→XPath mapping is a
   first-class artifact, not a comment.
4. **Rules authored against business terms, compiled to syntax.** Humans reason
   semantically; machines validate syntactically.
5. **`CustomizationID` / `ProfileID` in the instance.** The document declares
   which ruleset it conforms to, so a receiver auto-selects the right validator.
6. **Conformance = subset-and-constrain, never extend.** Downstream profiles
   only restrict, keeping the ecosystem interoperable.

## How this maps to ESPD

- **Information elements (I68) and criteria (C01)** = BII **Business
  Terms/Groups**.
- **UML model** = the information-model layer — but BII insists the UBL binding
  be a **separate machine-readable table** (which `xml-mapping/part-I.mapping.json`
  may already be).
- **Schematron** = the generated validation layer — but in BII it is *generated
  from* the model + rules with **stable BR-IDs**, not hand-authored independently.
- **`.gc` code lists** = the Genericode value-binding layer.
- **`EAtoJSON` pipeline** (`espd-edm.json`) is the natural host for the
  single-source model and generator input.

ESPD is already shaped like a BII/Peppol stack. The DX question is whether the
binding, rules, and docs are all generated from one identified model (full BII
rigor) or maintained as parallel documents that can drift (the common failure
mode).

## Primary sources to consult

- **EN 16931** e-invoicing artifacts (clearest public example of the full
  pipeline: semantic model spreadsheet + Schematron + code lists).
- **OpenPEPPOL BIS** specifications and their Schematron repositories.
- Older **CEN BII** deliverables (BII2/BII3 profiles + methodology documents)
  for the conceptual foundation.
