# Canonical instance-data model and XML mapping

This document describes the EXPERIMENTAL model under `model/` — a canonical
instance-data model for the ESPD form and a declarative engine that maps it
to and from UBL XML. It is not yet wired into the reference-implementation UI;
it lives in `model/` as a separate experiment.

## Three layers

The model is deliberately split into three independent layers:

- **`model/instance-data/`** — the canonical data a user enters, as a JSON
  Schema + example pair per part (`part-I`, `part-II`, `part-III`). Semantic
  keys, no form or XML concerns. Validated with `node validate.mjs part-III`.
- **`model/form-structure/`** — a presentation lens (sections, ordering, UI
  hints, conditional visibility, criterion order). References instance data by
  dotted `dataPath`. Carries no XML concerns.
- **`model/xml-mapping/`** — a declarative spec per part plus a shared engine
  (`mapper.mjs`) that converts instance data to/from UBL XML.

The connection between a question and its answer differs by layer: in the
**instance data** it is **structural** (the value's position in the tree), while
in the **UBL XML** it is by **identifier cross-reference** (see below). The
mapping engine translates between these two linking styles.

## The mapping engine

One declarative spec drives both directions:

- `map(spec, instance)` — instance JSON → UBL XML
- `unmap(spec, xml)` — UBL XML → instance JSON

The engine hardcodes no UBL element names; every element path is supplied by the
spec. Constructs:

- **value rule** `{ from, to }` — a dotted instance path ↔ an XML element path,
  with optional `attributes` (constant or `{ from }`-sourced), a `when` guard,
  and `const` (a fixed value with no instance source).
- **`forEach` rule** — a JSON array ↔ repeated same-named XML siblings.
- **`records` rule** — a repeated keyed record (for the ESPD criterion model):
  each record has a `key` (identifier element + optional scheme attribute) and a
  body that is exactly one of `value`, `period`, or `references` (repeated
  cross-reference elements linked by key). See `part-III.mapping.json`.

## The three ID types in the UBL criterion model

An ESPD request declares the questions; a response supplies the answers. Three
different identifiers appear, and they are handled differently:

| # | Element | Meaning | Source | In our mapping |
|---|---------|---------|--------|----------------|
| 1 | `cac:TenderingCriterion/cbc:ID` | The criterion's identity (e.g. C01) | **Fixed, from e-Certis.** C01 is always `005eb9ed-1347-4ca3-bb29-9bc0db64e1ab`, identical across request and response. | A `const` rule. |
| 2 | `cac:TenderingCriterionResponse/cbc:ID` | The response element's own handle (e.g. `resp-001`) | **Generated locally**, document-unique only; no cross-document meaning. | **Not emitted** (optional per the response Schematron rules; see note). |
| 3 | `cac:ValidatedCriterionPropertyID/cbc:ID` | The link: which question this answer responds to | **Copies** a `cac:TenderingCriterionProperty/cbc:ID`; must match one in the document (Schematron BR-TCR-01-02). | A `const` per question (the record `key`). |

**Why type 1 and 3 are constants.** The criterion UUID, its type code, the
property-group UUIDs and the property UUIDs are all owned by e-Certis and are
rejected by the Schematron if not defined there (BR-TC-02-02, BR-TC-04,
BR-TC-13). They are fixed lookups, not values a producer invents, so the mapping
expresses them as constants.

**Property-id scheme.** The current v5 examples use per-property UUIDs for
type 3. The EA-derived criterion definition we build from carries only the
`requestpath` (e.g. `C01_exg-crim-part/QG1/Q1`), which is the authentic
"XML Path like ID" the Schematron supports (with `schemeID="criterion"`). We
emit that path form. When per-property UUIDs are available upstream, only the
`key` values in the spec change.

**Note on type 2.** `cac:TenderingCriterionResponse/cbc:ID` is not required by
the response criterion Schematron rules (which mandate
`cac:ValidatedCriterionPropertyID` and exactly one response body). We currently
omit it. If strict UBL XSD validation requires it, it can be added to the
`records` construct as a locally-generated value (produced on export, ignored on
import — it need not be stable across a round trip).

## Round-trip requirement — status

A required capability is that the reference-implementation form can **encode**
instance data into a UBL request/response and **decode** a UBL request/response
back into instance data — a full round trip.

The engine is designed for this: a single spec drives both `map` and `unmap`.
Honest status of coverage:

- **Proven:** `instance JSON → XML → instance JSON` is stable (verified by
  `roundtrip*.test.mjs`) for Part I (publication, contracting authority,
  procedure), part of Part II (economic operator, lots, representatives), and
  Part III criterion C01 (answer, repeating convictions, self-cleaning,
  electronic evidence with cross-linked `cac:Evidence`).
- **Not yet covered:**
  - **Scope** — only the above are mapped; the remaining Part II sections, the
    other ~50 criteria, and Parts IV–V are not.
  - **Decode from foreign XML** — tests start from instance data (JSON→XML→JSON).
    The reverse direction starting from a real/third-party ESPD XML
    (XML→JSON→XML) is not yet tested against the official example documents.
  - **Request side** — the engine currently targets
    `QualificationApplicationResponse`; the request document (which declares the
    questions and property groups) is not mapped.
  - **UI integration** — the engine is standalone in `model/`; the form app does
    not call it yet.

So the architecture supports the requirement, but full coverage, verified
decoding of externally-produced XML, the request document, and UI wiring remain
open work.

## Verifying

From `model/`:

```
node instance-data/validate.mjs part-III
node form-structure/check-paths.mjs part-III
node xml-mapping/roundtrip-part-III.test.mjs
```
