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
spec. `from` is a dotted instance path; `to` is a slash-separated XML element
path relative to the current container. A rule is one of three kinds.

### value rule

`{ from, to }` — maps a single instance value to an XML element's text. Options:

- `const` — a fixed value emitted with no instance source (e.g. criterion
  metadata). If a rule has both `from` and `const`, the resolved `from` value
  wins when present, otherwise `const`.
- `attributes` — a map of attribute name → value on the target element. Each
  value is either a constant (e.g. `{ "listID": "criterion" }`) or a
  data-sourced reference `{ "from": "<instance path>" }`. Constant attributes
  act as discriminators on import; data-sourced attributes roundtrip back into
  the instance data.
- `when` — a guard `{ "path": "<instance path>", "equals": <value> }`; the rule
  applies only when the instance value at `path` equals `equals`. On import, a
  fired guard restores the discriminating value.
- `type` — `"boolean"` coerces the text back to a real boolean on import
  (otherwise values import as strings). Absent = string.

Empty/`null`/`undefined` values emit nothing.

### forEach rule

`{ forEach, to, item }` — maps a JSON array to repeated same-named XML sibling
elements (named by `to`), one per array entry. Three `item` shapes:

- `item.fields` — array of objects; each field `{ from, to }` is applied under
  the repeated element, resolved against that one entry (e.g. representatives).
- `item.path` — array of scalars; each value goes into a fixed child element
  named by `item.path` under the repeated element (e.g. lots → `cbc:ID`).
- neither — array of scalars; each value becomes the repeated element's own text.

On import the array is reconstructed from the repeated elements, in document
order.

### records rule

`{ records, key, ... }` — a repeated keyed "record" wrapper (the ESPD criterion
model). `records` is the wrapper element path; `key` is
`{ to, attributes?, from? }` — the identifier element (with optional scheme
attributes). Three forms:

- **fixed `entries`** — a fixed list of records; each `entry` has a literal
  `key` and one body.
- **`forEach` + `entries`** — the entries-set is expanded once per instance-array
  item (`from` inside each body resolves against the item). Repeated records
  share their key ids deliberately; on import they are split back into array
  items by document order.
- **`forEach` + `item.fields`** — one aggregate record per array item, all fields
  inside it; `key.from` maps an item field to the key element.

Each record body (in `entries`) is exactly ONE of:

- `value` — `{ from, to, type?, attributes? }` — a typed value element (same
  options as the value rule).
- `object` — `{ from, to, fields }` — a nested instance object whose `fields`
  (`{ from, to }`, relative to the object / wrapper) become child elements under
  the wrapper `to`. Generic (not domain-specific); used for the exclusion PERIOD
  (`{startDate,endDate}` → `cac:ApplicablePeriod/{cbc:StartDate,cbc:EndDate}`)
  and suitable for AMOUNT `{value,currency}`, MEASURE `{value,unit}`, etc.
- `references` — `{ forEach, key, to }` — a key cross-reference: resolves the
  array at `forEach`, and emits one `to` element per entry valued by that
  entry's `key` field. This is how a response links to separate records (e.g.
  `cac:EvidenceSupplied/cbc:ID` → `cac:Evidence/cbc:ID`); the referenced records
  are reconstructed from their own record set on import.

See `part-III.mapping.json` for a worked example of all three body kinds, and its
`$notes` for the ESPD-specific rationale.

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

## Buyer and economic-operator data (the request/response split)

The canonical model is intended to hold **both** sides of the exchange: the
buyer's request data and the economic operator's response data. In UBL these
live in two different documents — the request declares the questions (and, for
some criteria, buyer-set requirements), and the response supplies the answers.
Verified against the examples:

- A criterion property has a `TypeCode` of either **`REQUIREMENT`** (buyer) or
  **`QUESTION`** (economic operator).
- A `REQUIREMENT` carries an `Expected*` value the buyer sets — e.g.
  `cbc:ExpectedAmount currencyID="EUR">5000000` (minimum turnover),
  `cbc:ExpectedValueNumeric>3` (number of years). These appear only in the
  **request**.
- A `QUESTION` is answered by the EO with a `Response*` value in the
  **response**. The response document carries **no** `Expected*` / `REQUIREMENT`
  values (confirmed: none appear in the example responses).
- **Exclusion grounds carry no buyer data.** They have only `QUESTION`
  properties — the buyer merely selects that the ground applies, which is fixed
  criterion metadata (from e-Certis), not instance data. **Selection criteria**
  do carry buyer thresholds.

### Canonical shape

Each criterion object is split into two semantic sub-objects mirroring the
document boundary:

```jsonc
"slc-stand-to-spec-avg": {           // a selection criterion (example)
  "requirement": {                    // BUYER side — maps to/from the REQUEST
    "minimumAmount": { "value": 5000000, "currency": "EUR" },
    "numberOfYears": 3
  },
  "response": {                       // EO side — maps to/from the RESPONSE
    "amount": { "value": 6200000, "currency": "EUR" }
  }
}
```

For exclusion grounds, `requirement` is **absent** (no buyer data) and the EO
answer lives under `response`:

```jsonc
"exg-crim-part": {
  "response": { "answer": true, "convictions": [ ... ], "electronicEvidence": { ... } }
}
```

Rationale for this shape over the alternatives:

- It mirrors the real request/response document boundary, so each sub-object
  maps to a different UBL document — making the mapping's routing explicit.
- It is honest about optionality: exclusion grounds simply omit `requirement`,
  rather than carrying an empty or misleading buyer field.
- It keeps semantic keys and does not reintroduce process-metadata envelopes
  (`filledBy`/`data`) that were previously rejected — `requirement`/`response`
  are semantic, not process, sub-objects.
- The split is a **criterion-level** pattern (Parts III–V). Part I
  (buyer-authored procedure/CA) and Part II (EO-authored operator info) are not
  criteria and are not forced into this shape.

### Status

- **C01 (exclusion ground) now uses this shape**: its EO data lives under
  `response`; `requirement` is absent. Schema, example, form-structure and
  mapping are updated and roundtrip-verified.
- **The `requirement` (buyer) mapping is not yet built.** It will be introduced
  with the first **selection criterion** that has a real threshold (e.g.
  `slc-stand-to-spec-avg`), mapping `requirement.*` to the request's
  `TenderingCriterionProperty[TypeCode=REQUIREMENT]/Expected*`. Because buyer and
  EO data map to different documents, this also relates to the open "request
  document" gap below (we currently emit only the response).

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

## Generating samples and skeletons

Two helpers in `model/xml-mapping/` produce XML from the model without a
hand-written instance, for documentation and fixtures:

- **`skeleton.mjs`** — a structural *skeleton* of the XML from the mapping spec
  alone: every element the mapping can produce, with placeholders naming what
  fills each leaf (`{const}`, `{from: <instance path>}`, `{ref: <array>[].<field>}`)
  and `<!-- repeats per ... -->` comments on repeating records. No values are
  invented; it is a shape/template reference.

  ```
  node xml-mapping/skeleton.mjs part-III
  ```

- **`sample.mjs`** — a realistic *sample* document: it synthesizes a
  minimal-but-complete valid instance from the JSON Schema (required fields; one
  item per array; booleans chosen to open conditional branches) and runs the
  real `map()`. `--instance` also prints the synthesized instance.

  ```
  node xml-mapping/sample.mjs part-III --instance
  ```

  Note: `sample.mjs` does not yet honor `pattern` constraints (e.g. the Part I
  TED-notice id), so a pattern-constrained field gets a visible placeholder
  rather than a conforming value.

## UML diagrams

Two generators emit PlantUML for documentation (render with the PlantUML VS Code
extension, `plantuml file.puml`, or the plantuml.com server). Pre-generated
examples for all parts live in `docs/diagrams/` (see its README); pass `--out
<file>` to write clean UTF-8 directly rather than shell-redirecting.

- **`instance-data/uml.mjs`** — a class diagram of the canonical DATA MODEL from
  the JSON Schema. One class per object type (`$defs` entry, the root part
  object, and inline object properties); scalar properties are attributes
  (`*` marks required), and object/array properties are associations with
  cardinality. A referenced type is shown ONLY as an association — not also
  duplicated as an attribute.

  ```
  node instance-data/uml.mjs part-III > part-III.model.puml
  ```

- **`xml-mapping/mapping-uml.mjs`** — a correspondence diagram of the MAPPING:
  two packages ("instance data" and "UBL XML") with an arrow per mapping rule,
  labelled by kind (value / const / object / ref / key).

  ```
  node xml-mapping/mapping-uml.mjs part-III > part-III.mapping.puml
  ```

- **`xml-mapping/xml-uml.mjs`** — a class diagram of the UBL XML ELEMENT
  STRUCTURE produced by the mapping, in the style of the EA "Technical View"
  diagrams: a class per aggregate (`cac:*`) element, basic (`cbc:*`) children as
  attributes, aggregate children as associations with cardinality. Repeating
  elements (from `records`/`forEach`) show `0..*` / `1..*`. Where several records
  share a wrapper element (e.g. `cac:TenderingCriterionResponse`) they are
  collapsed into one class showing all possible bodies, with a note (each runtime
  instance carries exactly one body per BR-TCR-03).

  ```
  node xml-mapping/xml-uml.mjs part-III > part-III.xml.puml
  ```

## Verifying

From `model/`:

```
node instance-data/validate.mjs part-III
node form-structure/check-paths.mjs part-III
node xml-mapping/roundtrip-part-III.test.mjs
```
