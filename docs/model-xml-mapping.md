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
- **C31 (`slc-stand-to-spec-avg`, Part IV) is now modeled COMPLETELY** — every
  QUESTION and REQUIREMENT in the criterion, both sides of the exchange:
  - **Buyer `requirement`** → request `cac:TenderingCriterionProperty[TypeCode=REQUIREMENT]`:
    the lot identifier(s) (`RG1/RQ1`, LOT_IDENTIFIER 1..n → repeated `cbc:ExpectedID`),
    number of fiscal years (`cbc:ExpectedValueNumeric`), business domain
    (`cbc:ExpectedDescription`), minimum amount (`cbc:MinimumAmount`).
  - **EO `response`** → response `cac:TenderingCriterionResponse`: fulfils-by-itself
    and the ONFALSE relied-upon-entity branch (`QSG1`); the turnover PERIOD +
    AMOUNT answer with its own electronic-evidence block (`QSG2`); the
    set-up/started-trading DATE fallback with its own evidence block (`QSG3`); and
    the criterion-level electronic-evidence block (`QSG4`). All three evidence
    blocks share the one document-level `cac:Evidence` list, cross-linked by id.
  Schema, example, form-structure and both mappings are roundtrip-verified across
  four cases. See "Two specs per part" below for how the two documents are wired.

### Two specs per part (request/response split)

The mapping engine has a single `target.root` per spec, so one spec produces one
UBL document. Parts that live in a single document (Part I → request, Part II /
Part III → response) have one spec, `part-N.mapping.json`. A **selection
criterion spans both documents**, so Part IV has two specs reading from the same
instance data:

- `part-IV.request.mapping.json` — the buyer `requirement.*` → `QualificationApplicationRequest`.
- `part-IV.response.mapping.json` — the EO `response.*` → `QualificationApplicationResponse`.

The round trip is verified per document and the two reconstructed halves merged
(`roundtrip-part-IV.test.mjs`). The generators (`sample.mjs`, `skeleton.mjs`,
`mapping-uml.mjs`, `xml-uml.mjs`) accept an explicit spec filename so they can
target either document; `instance-data/uml.mjs` and `validate.mjs` remain
per-part (one schema).

### Engine additions (generic, spec-driven)

Completing C31 required three generic engine capabilities, each usable by any
future part:

- **`"type": "number"` coercion** (alongside `"boolean"`) so numeric leaves
  (`ExpectedValueNumeric`, `ResponseAmount`, `MinimumAmount`) import back as real
  numbers rather than strings — needed by the BR-TCR-08 numeric datatypes.
- **Scalar-item `records` form** — `{ records, key: { to, key, attributes }, forEach, item: { path, attributes } }`
  emits one record wrapper per SCALAR array item, all sharing one fixed key id,
  the value in a single `item.path` element. Used for the lot identifiers
  (`RG1/RQ1`, LOT_IDENTIFIER 1..n → repeated `cac:TenderingCriterionProperty`
  each with one `cbc:ExpectedID`). On import the array is rebuilt from the records
  carrying that key, in document order.
- **Cross-referenced shared record sets** — `references.resolve` +
  `importVia: "references"`. When several answer blocks each reference their own
  subset of ONE shared document-level record set (C31 has three electronic-evidence
  blocks all pointing into the single `cac:Evidence` list), the `references` rule
  carries a `resolve` block ({ records, key, fields }) describing that set. On
  import each block rebuilds its own array by joining its `cac:EvidenceSupplied`
  ids to the shared `cac:Evidence` records — so the block, not the shared set, is
  authoritative for membership. The shared `cac:Evidence` `records` rules are
  marked `importVia: "references"` (export-only) so they don't merge all blocks'
  entries into every array. (Part III's single-evidence-set C01 predates this and
  still uses the simpler one-set import; both patterns coexist.)

## Round-trip requirement — status

A required capability is that the reference-implementation form can **encode**
instance data into a UBL request/response and **decode** a UBL request/response
back into instance data — a full round trip.

The engine is designed for this: a single spec drives both `map` and `unmap`.
Honest status of coverage:

- **Proven:** `instance JSON → XML → instance JSON` is stable (verified by
  `roundtrip*.test.mjs`) for Part I (publication, contracting authority,
  procedure), part of Part II (economic operator, lots, representatives),
  Part III criterion C01 (answer, repeating convictions, self-cleaning,
  electronic evidence with cross-linked `cac:Evidence`), and Part IV criterion
  C31 (`slc-stand-to-spec-avg`) — both its buyer `requirement` (→ request) and
  its EO `response` (→ response, including the turnover PERIOD + AMOUNT answer
  and cross-linked evidence).
  C31 is now covered in FULL (all QUESTIONs and REQUIREMENTs: lot ids, the three
  buyer requirements, fulfils/relied-upon, turnover period+amount, start-trading
  date, and all three electronic-evidence blocks over the shared `cac:Evidence`
  list).
- **Request side — now partly covered.** The engine can target
  `QualificationApplicationRequest` (Part I, and C31's `requirement`). C31's
  request mapping emits the whole generated `TenderingCriterion` declaration,
  including property groups, placeholder legislation and national subcriterion
  structures, plus the buyer's dynamic
  `Expected*`/`ExpectedID`/`MinimumAmount` values. Coverage remains partial
  because the other Part IV criteria and the remaining request sections are not
  yet modeled.
- **Not yet covered:**
  - **Scope** — only the above are mapped; the remaining Part II sections, the
    other ~50 criteria, and Part V are not. Part IV has only C31 so far.
  - **Decode from foreign XML** — tests start from instance data (JSON→XML→JSON).
    The reverse direction starting from a real/third-party ESPD XML
    (XML→JSON→XML) is not yet tested against the official example documents.
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

node instance-data/validate.mjs part-IV
node form-structure/check-paths.mjs part-IV
node xml-mapping/roundtrip-part-IV.test.mjs
```

## TODO: CPV codes (procurement subject classification) — Part I

**Status: NOT modeled. Documented finding, to be implemented later.**

CPV (Common Procurement Vocabulary) is the EU's standardized classification of
*what* is being procured — hierarchical 8-digit codes (e.g. `03111100` = "Soya
beans", `72000000` = "IT services"). Every EU tender is tagged with at least one
CPV code. The Slovenian ESPD service (https://ejn.gov.si/espd/) exposes an "Add
CPV codes" field in *Part I → Information about the procurement procedure*, and
surfaces "CPV codes" contextually next to the *specific (average) turnover*
selection criteria.

Note: the ESPD Implementing Regulation
([2016/7](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0007#anx_2))
does not itself mandate a CPV field on the standard form. CPV is a useful,
widely-implemented convenience carried in the surrounding UBL procurement-project
envelope, not a form question. Treat this as an optional enhancement, not a
compliance gap.

### Where CPV lives in the ESPD XML

`cbc:ItemClassificationCode` only ever appears inside a `cac:CommodityClassification`
wrapper, and the only such wrappers reachable from the ESPD request/response
roots are on the procurement project (top-level and per-lot). Valid paths, in
BOTH the request and the response document:

```
ProcurementProject/MainCommodityClassification/ItemClassificationCode        (listID="cpv")
ProcurementProject/AdditionalCommodityClassification/ItemClassificationCode  (listID="cpv")
ProcurementProjectLot/ProcurementProject/(Main|Additional)CommodityClassification/ItemClassificationCode
```

`MainCommodityClassification` and `AdditionalCommodityClassification` are both
`0..n` on `ProcurementProjectType`. The generic UBL library defines
`CommodityClassification` on many other types (Item, LineItem, Delivery, …) but
none of those are reachable from the ESPD roots — in an ESPD document CPV only
appears under the procurement project.

### Why CPV is absent from `espd-edm.json` and the EA criterion model

`espd-tools/EAtoJSON/outputs/espd-edm.json` is only the **criteria** slice of the
EA model — a role-agnostic tree of exclusion grounds and selection criteria made
of property groups, questions, and requirements. It has no `ProcurementProject`,
no classification, no procurement-type concept (verified: the only "classification"
hit is an unrelated free-text question, OT58). CPV lives in the
procurement-project **envelope** (`epo:Procedure` / `ProcurementProject` area of
the EA conceptual model), which is a different subtree that the EAtoJSON
extractor does not walk. So CPV is not *missing* from EA — it is simply outside
the slice `espd-edm.json` extracts. This is also why our Part I model is
hand-authored from the UBL examples rather than generated from `espd-edm.json`:
Part I is not in that file either. **Do not add CPV to `espd-edm.json`** — it is
not a criterion.

### Why the CPV code list is not copied into ESPD-EDM

`ESPD-EDM/codelists/` copies only the small, ESPD-specific lists it curates
(exclusion grounds, selection criteria, property/response types, country,
currency, …). There is no `Cpv.gc` and `codelists.json` does not reference it.
This is deliberate: the CPV vocabulary is ~9,500 hierarchical codes maintained
and versioned by the EU Publications Office, shared with eForms/TED. The ESPD
*references* it externally via `listID="cpv"` (like the country/language
authority lists) rather than embedding it. Services that offer a CPV picker
(e.g. Slovenia's "Add CPV codes" search) query it from a live service/dataset.
Any CPV support we add should **reference** the external authority list, not copy
it into the repo.

### Evidence from a real Slovenian export

A CPV-filled ESPD request downloaded from the Slovenian service
(`temp/espd_request.xml`, EDM v2.1.1 "EXTENDED" profile) resolves the earlier
open question — CPV is stored as **option (a): a real procedure-level
`ProcurementProject/MainCommodityClassification`**, NOT as a per-criterion field:

```xml
<ns3:ProcurementProject>
    <ProcurementTypeCode listID="ProjectType" ...>COMBINED</ProcurementTypeCode>
    <ns3:MainCommodityClassification>
        <ItemClassificationCode>(03111100) Soya beans</ItemClassificationCode>
    </ns3:MainCommodityClassification>
</ns3:ProcurementProject>
```

Findings:

- **(a) confirmed.** CPV sits in the top-level `ProcurementProject`; it is not
  attached to any `TenderingCriterion`. The "CPV codes" the UI shows next to the
  turnover criteria are the *same* procedure-level CPV surfaced contextually, not
  a distinct per-criterion value.
- **No lots.** The export has no `ProcurementProjectLot` and no lot references,
  so the hypothesized turnover-criterion → lot → per-lot-CPV linkage does not
  materialize here; the CPV is a single procedure-level classification.
- **Slovenian-specific deviations** (older EDM v2.1.1, not the v5 the rest of the
  workspace targets), to normalize if we model this:
  - `ItemClassificationCode` is missing `listID="cpv"`.
  - Its value is a display label `(03111100) Soya beans`, not the bare code
    `03111100` — UI presentation leaking into the payload.
  - `ProcurementTypeCode` = `COMBINED` with the old `listID="ProjectType"` rather
    than v5 `project-type` (services|supplies|works).

### Proposed implementation (when picked up)

CPV is a **Part I** concern (procurement-project envelope), not a Part IV /
criterion concern. Suggested scope:

1. Add a `procurementProject` object to `part-I.schema.json`:
   `objectType` (ProcurementTypeCode: services|supplies|works|combined),
   `mainClassification` / `additionalClassifications` (arrays of bare CPV codes),
   and — for the per-lot turnover linkage — optionally `lots[]` each with
   name/description and their own CPV codes.
2. Map it in `part-I.mapping.json` (buyer/request document; the same
   `ProcurementProject` also appears in the response, so the response spec can
   emit it too): a `forEach` over CPV codes → repeated
   `cbc:ItemClassificationCode` with a constant `attributes: { "listID": "cpv" }`.
   No engine change is required (the existing `forEach` + constant-attribute
   support covers it).
3. Store bare codes (`03111100`); resolve the human label from the external CPV
   authority list at render time. Do NOT copy the CPV list into the repo.
4. Add form-structure fields and a roundtrip case; leave `espd-edm.json` and the
   EA criterion extraction untouched.

## Criterion request-declaration — embedded `structure` in the mapping

The request document DECLARES the whole criterion: the criterion
`cbc:ID`/`Name`/`Description`, its `cac:ProcurementProjectLotReference`(s),
`cac:SubTenderingCriterion` (national sub-criteria), `cac:Legislation`, and the
recursive `cac:TenderingCriterionPropertyGroup` tree of questions and
requirements. This is fixed criterion metadata (not instance data).

Rather than a separate scaffold model + a separate XML generator, this
declaration is **embedded directly in the request mapping** as a single
`structure` rule, and the one mapper engine drives both directions. The design
mirrors the eForms SDK `xmlStructure` idea (a node/element tree with typed
leaves) rather than a hand-expanded rule list.

The generated mapping is the combined artifact, but `espd-edm.json` is not by
itself sufficient to generate all of it. The criterion declaration comes from
`espd-edm.json`; the correspondence to our chosen instance-data fields is a
separate, currently hand-authored input described below.

### The `structure` rule (engine, `mapper.mjs`)

A `structure` rule carries a nested tree that mirrors the target XML 1:1. Each
node is `{ element, attributes?, const?, from?, type?, forEach?, fromItem?,
children? }`:

- `element` — the XML element name; `children` — nested structure nodes.
- `const` — fixed leaf text (structure/metadata; ignored on import).
- `from` — data-bound leaf text (an instance path; roundtrips on import).
- `attributes` — a map of constant values or `{ from }` data-sourced attributes
  (e.g. `currencyID`), same convention as the value rules.
- `forEach` + `fromItem` — a repeated element, one per instance-array item; a
  scalar array uses a child leaf with `fromItem: "."` (e.g. lotIdentifiers →
  repeated `cac:ProcurementProjectLotReference/cbc:ID`).

Unlike the slash-path value rules, sibling elements are always distinct nodes, so
the many `cac:TenderingCriterionProperty` siblings coexist. On import the walker
matches same-named siblings POSITIONALLY (the Nth spec child consumes the Nth XML
sibling), so nested property groups line up. Only `from`/`fromItem` leaves and
`{ from }` attributes write back — `const` structure is export-only. So one
embedded tree drives both `map` and `unmap`.

### `build-request-mapping.mjs` — generate the embedded structure (option b)

`model/xml-mapping/build-request-mapping.mjs` walks a criterion's `components`
tree in the authoritative `espd-tools/EAtoJSON/outputs/espd-edm.json` and writes
the complete `part-IV.request.mapping.json`, whose single `structure` rule is the
generated tree. The only hand-specified criterion-specific part is the small
per-criterion `FIELD_MAPS` table in the generator, which says which REQUIREMENT
requestpath binds to which instance `requirement` field. The datatype-to-UBL
element correspondence is instead shared by all criteria in `DATATYPE_ELEMENT`.
Together these become the `from`/`forEach` leaves spliced onto the tree.
Regenerate after `espd-edm.json` changes:

```
node model/xml-mapping/build-request-mapping.mjs
```

The generated mapping is a normal spec — do not hand-edit its `structure`; edit
the generator or `FIELD_MAPS` and regenerate. The EDM owns criterion structure
and metadata, while `FIELD_MAPS` owns the correspondence to our instance-data
vocabulary; the mapping is their generated artifact.

Node → element rules (driven by node `type`/`tag`):

- `CRITERION` → `cac:TenderingCriterion` (ID = criterion UUID, type code, Name,
  Description).
- `PPLR*` tag → `cac:ProcurementProjectLotReference` per buyer lot id, keyed by
  tag because the EAtoJSON export has labelled this node both `LOT_REFERENCE` and
  `CRITERION` across versions.
- `SUBCRITERION` → `cac:SubTenderingCriterion` (placeholder content — deferred).
- `LEGISLATION` → `cac:Legislation` (placeholder content — deferred).
- `*_GROUP` / `*_SUBGROUP` → `cac:TenderingCriterionPropertyGroup` /
  `cac:SubsidiaryTenderingCriterionPropertyGroup`.
- `QUESTION`/`REQUIREMENT`/`CAPTION` → `cac:TenderingCriterionProperty`; a
  REQUIREMENT also carries the buyer's `Expected*`/`MinimumAmount` (`from`) value.

**Property `cbc:ID` form** (empirical, from `ESPD-criterion.xml`): a QUESTION uses
its bare `requestpath` (`…/QSG1/Q1`); a REQUIREMENT appends `/R1/R1`
(`…/RQ1/R1/R1`).

#### Build-time inputs versus runtime mapping

The XML mapping engine does **not** read or interpret `espd-edm.json`.
`build-request-mapping.mjs` is a build-time, ESPD-specific adapter which combines
three sources into `part-IV.request.mapping.json`. At runtime `mapper.mjs` reads
only that generated mapping and the instance JSON:

```text
espd-edm.json                        static criterion/component metadata
        +
build-request-mapping.mjs            ESPD node/datatype → UBL conventions
        +
FIELD_MAPS                           requestpath → instance-field binding
        │
        ▼
part-IV.request.mapping.json         compiled mapping artifact
        +
runtime instance JSON                actual buyer-entered values
        │
        ▼
mapper.mjs                            UBL XML (or the reverse on import)
```

The inputs have deliberately different responsibilities:

| Input | Information it supplies |
|---|---|
| `espd-edm.json` | Criterion UUID, stable code, name, description and the recursive `components` tree. Components supply such facts as `requestpath`, node `type`, group code, description and `propertydatatype`. |
| Generator conventions | The UBL element for each ESPD component type, fixed scheme/list attributes, requirement ID rules and the `ValueDataTypeCode` → `Expected*`/`MinimumAmount` translation. |
| `FIELD_MAPS` | The semantic correspondence between a requirement's EDM request path and the field chosen for it in our instance-data model. |
| Runtime instance JSON | The procedure-specific values, such as number of years, business domain, amount, currency and lot identifiers. |

The instance-data schema documents and validates the fields, but it is not an
input to the request-mapping generator. Consequently, agreement between
`part-IV.schema.json` and `FIELD_MAPS` is currently maintained manually.

`buildCriterionStructure()` obtains the criterion head directly from the EDM
(`uuid`, `code`, `name` and `description`). `componentNodes()` walks the nested
components and turns their types into groups, subgroups, properties, lot
references, subcriteria and legislation. The generator additionally contains
UBL conventions that are not generic mapping-engine behaviour. For example,
`DATATYPE_ELEMENT` says that `QUANTITY_YEAR` uses
`cbc:ExpectedValueNumeric`, `DESCRIPTION` uses `cbc:ExpectedDescription`, and
`MINIMUM_AMOUNT` uses `cbc:MinimumAmount` with a `currencyID` attribute.

#### How an instance binding is produced

The part which cannot currently be derived from `espd-edm.json` is where a
requirement value lives in our semantic instance JSON. `FIELD_MAPS` supplies a
common base path and maps relative EDM request paths to instance fields. For C31:

```js
'slc-stand-to-spec-avg': {
  base: 'partIV.selectionCriteria.slc-stand-to-spec-avg.requirement',
  fields: {
    'RG1/RQ1': 'lotIdentifiers',
    'RG1/RSG1/RQ1': 'numberOfYears',
    'RG1/RSG1/RQ2': 'businessDomain',
    'RG1/RSG1/RQ3': 'minimumAmount'
  }
}
```

The generator strips the criterion prefix from a component's full
`requestpath`, looks up the remainder in `FIELD_MAPS`, and joins the selected
field to the base. A REQUIREMENT absent from `FIELD_MAPS` is still emitted as
part of the static criterion declaration, but has no `from` binding and
therefore carries no buyer value.

For example, assume the EDM describes
`C31_slc-stand-to-spec-avg/RG1/RSG1/RQ3` as a REQUIREMENT with
`propertydatatype: "MINIMUM_AMOUNT"`:

```text
C31_slc-stand-to-spec-avg/RG1/RSG1/RQ3
                    strip prefix → RG1/RSG1/RQ3
FIELD_MAPS lookup                → minimumAmount
join with base                   → partIV.selectionCriteria.
                                    slc-stand-to-spec-avg.requirement.
                                    minimumAmount
DATATYPE_ELEMENT lookup          → cbc:MinimumAmount, kind = amount
```

This produces the generic structure leaf:

```json
{
  "element": "cbc:MinimumAmount",
  "from": "partIV.selectionCriteria.slc-stand-to-spec-avg.requirement.minimumAmount.value",
  "type": "number",
  "attributes": {
    "currencyID": {
      "from": "partIV.selectionCriteria.slc-stand-to-spec-avg.requirement.minimumAmount.currency"
    }
  }
}
```

`LOT_IDENTIFIER` is the main special case. Its mapped instance field is an
array, so the generator emits a `forEach` property containing a `fromItem: "."`
`cbc:ExpectedID`. `findLotPath()` also reuses that binding for the criterion's
`cac:ProcurementProjectLotReference` elements.

At runtime the mapper has no knowledge of criteria, request paths,
`ValueDataTypeCode`, `FIELD_MAPS` or `espd-edm.json`. On export it resolves the
generated `from`, `forEach`, `fromItem` and data-sourced attributes against the
instance JSON, while `const` leaves emit the static declaration. On import the
same data-bound leaves and attributes write values back to the specified
instance paths; constant metadata is ignored because it is not instance data.

The generated file is therefore best understood as a compiled join between the
EDM criterion definition and our instance-data vocabulary.

#### Reusable-component trade-off

The generated request mapping repeats many shapes, such as criterion heads,
property groups and properties. A small parameterized component/macro layer
could make the artifact substantially shorter, especially once all Part IV
criteria are included. It should expand deterministically to the existing
generic structure AST before `map()` or `unmap()` runs, keeping component
semantics out of the XML traversal code.

This primarily improves artifact size and human inspection. The maintained
source is already compact because `idNode()`, `groupNode()`, `propertyNode()` and
`buildCriterionStructure()` perform the same reuse in JavaScript. Components do
not solve the semantic binding problem: the correspondence currently expressed
by `FIELD_MAPS` is still required unless equivalent EDM request-path metadata is
added to the instance-data model and made machine-readable by the generator.

#### Proposed direction: make the EDM the complete authoritative model

`FIELD_MAPS` represents a domain decision rather than a generic transformation
algorithm: it defines how an ESPD business value is represented in our semantic
instance model. That information should therefore move into the authoritative
EDM instead of remaining embedded in generator code.

This does not mean that the EDM must contain executable mapping logic. The
division should be:

- The EDM contains semantic identities, instance-model projection, datatypes,
  value shapes, cardinalities, code-list associations and XML representation
  decisions.
- Generators contain generic mechanics such as walking component trees,
  composing paths, expanding templates and emitting JSON Schema or mapping AST
  syntax.
- `mapper.mjs` continues to interpret only the generated, domain-neutral mapping
  AST at runtime.

A useful ownership rule is: if a change alters the meaning or representation of
an ESPD business value, it belongs in the model; if it only changes how a model
is traversed or emitted, it belongs in generator code.

##### Lean maintained EDM versus compiled artifact

The current EA-generated `espd-edm.json` mixes three categories of information:

1. criterion-specific facts;
2. shared ESPD encoding conventions; and
3. mechanically derived output.

Only the first category needs to be repeated in every maintained criterion.
The generated file currently contains 1,321 nodes. Every node carries `tag`,
`type`, `cardinality`, `requestpath` and `responsepath`; 590 value nodes also
carry `propertydatatype` and `contentpath`. For all 590 question/requirement
value nodes, the response and content paths follow the same derivable pattern:

```text
responsepath = requestpath + "/R1"
contentpath  = responsepath + "/RV"
```

There are 505 question nodes but only a small number of question encodings, and
the 782 descriptions contain only 187 unique values. The roughly 716 KB export
therefore contains substantial repeated or derived information. This
information is not necessarily useless; much of it belongs in a compiled view
rather than in the maintained semantic source.

The lean criterion source should retain the facts which distinguish an
individual criterion:

- stable semantic criterion and component IDs;
- criterion code and the UBL criterion UUID where required by the exchange;
- criterion name/description, or references to their authoritative localized
  source;
- ordered component hierarchy and occurrence cardinalities;
- structural tags used to correlate with EA and reproduce ESPD XML IDs;
- each value node's value-type reference;
- conditional branch semantics such as `ONTRUE` and `ONFALSE`;
- criterion-specific business rules.

For example, the maintained representation of one C31 requirement can be as
small as:

```json
{
  "id": "slc-stand-to-spec-avg.minimum-amount",
  "kind": "requirement",
  "tag": "RQ3",
  "cardinality": "1",
  "valueType": "MINIMUM_AMOUNT"
}
```

Instance-model placement and component paths are a projection of the core EDM
into a particular JSON vocabulary, not intrinsic criterion structure. They are
maintained in a separate binding file keyed exclusively by the stable semantic
IDs from the criterion:

```json
{
  "criterion": "slc-stand-to-spec-avg",
  "instanceModel": {
    "containerPath": ["partIV", "selectionCriteria"],
    "key": { "source": "code" }
  },
  "components": {
    "slc-stand-to-spec-avg.minimum-amount": {
      "side": "requirement",
      "path": ["minimumAmount"]
    }
  }
}
```

The compiler rejects bindings whose semantic IDs are absent from the criterion
and semantic value nodes without a binding. EA `requestpath` values are not join
keys for this layer.

The XML meaning of a question or requirement should be declared once in a
shared node-kind registry rather than repeated on every occurrence. An
illustrative convention is:

```json
{
  "question": {
    "ublElement": "cac:TenderingCriterionProperty",
    "typeCode": "QUESTION",
    "responsePathSuffix": ["R1"],
    "contentPathSuffix": ["RV"]
  },
  "requirement": {
    "ublElement": "cac:TenderingCriterionProperty",
    "typeCode": "REQUIREMENT",
    "requestPropertyIdSuffix": ["R1", "R1"]
  }
}
```

The following fields are candidates for factoring or generation:

| Current information | Lean-source treatment |
|---|---|
| `type: "QUESTION"` plus `code: "QUESTION"` | One `kind: "question"` reference. |
| `type: "REQUIREMENT"` plus `code: "REQUIREMENT"` | One `kind: "requirement"` reference. |
| Group `code: "ON*"` | Make it the default and omit it; preserve `ONTRUE` and `ONFALSE`. |
| `requestpath` | Generate from criterion identity and tag ancestry. |
| `responsepath` and `contentpath` | Generate from the request path and node-kind convention. |
| Empty `components` arrays | Omit. |
| Placeholder descriptions such as `PPLR1` and titles such as `L1` | Omit; materialize only real content. |
| Value-type definitions | Define once in the registry led by `ResponseDataType.gc`; keep only the reference on a value node. |
| Question/requirement XML encoding | Define once in the node-kind registry. |
| Repeated evidence, legislation and national-subcriterion shapes | Define as reusable fragments/templates. |
| Localized names and descriptions | Keep in an authoritative text source and reference them, or materialize them only in compiled output. |

Some information must not be factored out blindly. Cardinality varies across
occurrences of the same node kind and therefore remains occurrence-specific
unless a template supplies a default with explicit overrides. `tag` is not a
semantic identity, but it remains necessary for EA correlation and path-like
ESPD XML IDs. Likewise, `valueType` remains on each value node even though its
definition is shared.

Repeated evidence branches are particularly suitable for reusable fragments:

```json
{
  "use": "electronic-evidence",
  "idPrefix": "slc-stand-to-spec-avg.turnover-evidence"
}
```

The shared fragment can define the availability indicator, evidence references,
conditions, value types and XML relationship once. The same technique can cover
lot references, legislation, national subcriteria and relied-upon entity
branches.

The resulting source/compiled separation is:

```text
ResponseDataType.gc
        |
        v
value-types.json                 shared value semantics and representation

node-kinds.json                  question/requirement/group conventions

fragments/
  electronic-evidence.json
  legislation.json
  national-subcriterion.json

criteria/
  slc-stand-to-spec-avg.json     lean criterion-specific structure

bindings/instance-data/
  slc-stand-to-spec-avg.json     semantic ID -> JSON instance projection
        |
        v
compiler
        |
        v
compiled espd-edm.json           expanded compatibility/consumer view
```

The maintained source should be lean; the compiled artifact may still expose
expanded request, response and content paths for existing consumers. Those
expanded fields should be generated and tested, not hand-maintained.

The executable C31 proof of this design is under `model/edm/poc/c31/`.
`compile-lean.mjs` expands its lean criterion, shared node-kind registry and
electronic-evidence fragment, then deep-compares the EA-compatible projection
with C31 from the original generated `espd-edm.json`.

##### Stable semantic IDs and relative bindings

`requestpath` is valuable for correlation with the ESPD criterion tree, but it
contains structural tags such as `C31`, `RG1` and `RQ3` and should not be the
primary semantic identity. Each meaningful component should also have a stable
ID which survives structural reorganization. For example:

```json
{
  "id": "slc-stand-to-spec-avg.minimum-amount",
  "tag": "RQ3",
  "type": "REQUIREMENT",
  "requestpath": "C31_slc-stand-to-spec-avg/RG1/RSG1/RQ3",
  "propertydatatype": "MINIMUM_AMOUNT",
  "instanceBinding": {
    "side": "requirement",
    "path": ["minimumAmount"]
  }
}
```

The two identifiers then have separate purposes:

- `id` joins semantic artifacts such as the instance schema, form definition,
  rules and documentation.
- `requestpath` identifies the component's position in the ESPD criterion/XML
  structure.

The separate instance-binding source declares the common instance-model
location once:

```json
{
  "criterion": "slc-stand-to-spec-avg",
  "instanceModel": {
    "containerPath": ["partIV", "selectionCriteria"],
    "key": { "source": "code" }
  }
}
```

`containerPath` identifies the keyed object which contains criteria. The name
does not imply array semantics: `selectionCriteria` is an object whose property
names are stable criterion codes. The generator composes the container path,
the key selected from the criterion, and the component's side and relative
path:

```text
[partIV, selectionCriteria]
  + slc-stand-to-spec-avg
  + requirement
  + minimumAmount

= partIV.selectionCriteria.slc-stand-to-spec-avg.requirement.minimumAmount
```

Nested response fields use the same representation without repeating a complete
dotted path:

```json
{
  "id": "slc-stand-to-spec-avg.turnover-amount",
  "type": "QUESTION",
  "propertydatatype": "AMOUNT",
  "instanceBinding": {
    "side": "response",
    "path": ["turnover", "amount"]
  }
}
```

Path arrays are preferred over dotted strings in the source model. They compose
cleanly, require no escaping convention for dots in field names and leave the
generator free to emit whatever physical path syntax a consumer requires.

##### Shared value-type definitions

A binding path alone is insufficient because ESPD datatypes have different
instance shapes and XML representations. Scalars, amounts, periods, repeated
lot IDs and evidence references all behave differently. These conventions
should be defined once in a reusable value-type registry rather than repeated on
each component:

`ESPD-EDM/codelists/ResponseDataType.gc` is the **leading source of truth for
the value-type list**: its active codes define the permitted
`propertydatatype` vocabulary, and its descriptions define their published
meaning. The model's value-type registry does not invent or rename those codes;
it enriches the Genericode entries with the instance shape and UBL request and
response representation needed for generation. A build-time check should fail
when a used type is absent or inactive in `ResponseDataType.gc`.

```json
{
  "valueTypes": {
    "MINIMUM_AMOUNT": {
      "instanceShape": {
        "type": "object",
        "properties": {
          "value": { "type": "number" },
          "currency": { "type": "string", "codeList": "currency" }
        },
        "required": ["value", "currency"]
      },
      "requestXml": {
        "element": "cbc:MinimumAmount",
        "text": { "instancePath": ["value"] },
        "attributes": {
          "currencyID": { "instancePath": ["currency"] }
        }
      }
    }
  }
}
```

A component then needs only its `propertydatatype` and `instanceBinding`. From
those two references a generator can derive both the JSON Schema fragment and
the XML mapping leaves. This is preferable to copying `valuePath` and attribute
bindings into every amount component.

##### Bindings beyond simple values

Some criterion semantics require more than a destination path:

- Conditional branches need a declarative condition, for example `reliedUpon`
  being relevant when `fulfilledByItself` is false.
- Repeated values need collection semantics; these should normally be inferred
  from EDM cardinality rather than repeated in the binding.
- Evidence requires a relationship definition because the instance model nests
  evidence under an answer while UBL stores shared `cac:Evidence` entities and
  references them by ID.

Illustrative conditional binding:

```json
{
  "instanceBinding": {
    "side": "response",
    "path": ["reliedUpon"],
    "when": {
      "path": ["fulfilledByItself"],
      "equals": false
    }
  }
}
```

Illustrative relationship binding:

```json
{
  "instanceBinding": {
    "side": "response",
    "path": ["turnover", "electronicEvidence", "evidence"],
    "relation": {
      "kind": "reference",
      "target": "evidence",
      "key": ["id"]
    }
  }
}
```

An EDM-level `entities.evidence` definition could then describe the identity and
fields of that shared entity. This would allow the response mapping's `records`,
`references.resolve` and JSON Schema evidence object to be generated from the
same declaration.

##### One logical source does not require one hand-maintained file

The authoritative source can be decomposed for maintainability and compiled to
one complete `espd-edm.json` artifact. For example:

```text
espd-edm/
  value-types.json
  entities.json
  parts/
    part-IV/
      slc-stand-to-spec-avg.json
          |
          v
compiled espd-edm.json
```

If criterion structure continues to originate in EA, bindings should not be
manually added to the generated JSON because regeneration would erase them. The
build should instead join the EA structural export, declarative semantic
bindings and shared value/entity definitions into the complete EDM:

```text
EA structural export
        +
semantic instance bindings
        +
value-type/entity definitions
        |
        v
complete espd-edm.json
        |
        +---> instance-data JSON Schema
        +---> request and response XML mappings
        +---> form bindings
        +---> validation coverage checks
        +---> diagrams and documentation
```

The compiled EDM is then the sole downstream input even if its maintainable
source is physically split across several files.

##### C31 at a glance

C31, `slc-stand-to-spec-avg`, expresses this requirement:

> The buyer requires the economic operator to have achieved a minimum average
> yearly turnover in the contract's specific business area over a stated number
> of years.

The buyer specifies the applicable lots, number of fiscal years, business area,
and minimum average turnover with its currency. The economic operator states
whether it meets the requirement itself, identifies any entity whose capacity
it relies upon, supplies its turnover and reporting period, provides its trading
start date when a complete history is unavailable, and references supporting
electronic evidence.

Stripped of UUIDs, request/response paths, descriptions and enrichment metadata,
the essential structure of C31 in the EA-generated `espd-edm.json` is:

```text
C31 — Specific average yearly turnover
│
├── PPLR1  Lot reference                          [1..n]
├── SBC1   National subcriterion                  [0..n]
├── L1     Legislation                            [0..n]
│
└── RG1    Requirement group                      [1..n]
    │
    ├── RQ1  Lot identifier                       [1..n] LOT_IDENTIFIER
    │
    └── RSG1 Requirement subgroup                 [1]
        │
        ├── RQ1  Number of fiscal years           [1] QUANTITY_YEAR
        ├── RQ2  Business-domain description      [1] DESCRIPTION
        ├── RQ3  Minimum amount                   [1] MINIMUM_AMOUNT
        │
        ├── QSG1 Fulfilment / relied-upon branch
        │   ├── Q1  Fulfilled by itself?              INDICATOR
        │   └── when false:
        │       ├── Q1  Relies on another entity?     INDICATOR
        │       └── when true:
        │           ├── Q1  Entity name               DESCRIPTION
        │           └── Q2  Entity identifier         ECONOMIC_OPERATOR_IDENTIFIER
        │
        ├── QSG2 Turnover answer
        │   ├── Q1  Reporting period                  PERIOD
        │   ├── Q2  Turnover amount                   AMOUNT
        │   └── Electronic evidence
        │       ├── Q1  Available electronically?     INDICATOR
        │       └── Q1  Evidence references           EVIDENCE_IDENTIFIER [1..n]
        │
        ├── QSG3 Incomplete turnover history
        │   ├── Q1  Started trading date              DATE
        │   └── Electronic evidence
        │       ├── Q1  Available electronically?     INDICATOR
        │       └── Q1  Evidence references           EVIDENCE_IDENTIFIER [1..n]
        │
        └── QSG4 Additional criterion evidence    [0..n]
            ├── Q1  Available electronically?         INDICATOR
            └── Q1  Evidence references               EVIDENCE_IDENTIFIER [1..n]
```

The four `RQ` nodes carry buyer requirements and the thirteen `Q` nodes carry
economic-operator answers. The `RG`, `RSG` and `QSG` nodes supply grouping and
conditional branching rather than business values of their own.

##### C31 migration slice

The design should be proven without first changing the runtime mapper:

1. Add stable semantic IDs to C31 requirements and questions.
2. Add its criterion-level `instanceModel` metadata.
3. Express the current request and response paths using component-level
   `instanceBinding.side` and relative `instanceBinding.path` values.
4. Define all C31 value types from the leading
   `ESPD-EDM/codelists/ResponseDataType.gc` vocabulary: `MINIMUM_AMOUNT`,
   `QUANTITY_YEAR`, `DESCRIPTION`, `LOT_IDENTIFIER`, `AMOUNT`, `PERIOD`,
   `INDICATOR`, `DATE`, `ECONOMIC_OPERATOR_IDENTIFIER` and
   `EVIDENCE_IDENTIFIER`.
5. Teach `build-request-mapping.mjs` to consume the enriched model and remove
   C31 from `FIELD_MAPS`.
6. Assert that the newly generated request mapping is structurally equivalent
   to the current mapping and run the existing scaffold and round-trip tests.
7. Generate the C31 portion of `part-IV.schema.json` from the same binding and
   value-type metadata.

The final step is the important proof: if the enriched EDM generates both the
instance schema and XML mappings, the instance binding is genuinely
authoritative rather than merely `FIELD_MAPS` relocated into another file.

##### Open source-path issue

`build-request-mapping.mjs` currently resolves
`espd-tools/EAtoJSON/outputs/espd-edm.json`, but that path is not present in this
workspace checkout. The available model is `../ESPD-EDM/criterion/espd-edm.json`.
The owner and production path of the compiled authoritative EDM must be settled
before implementing this pipeline; this documentation records the discrepancy
but does not change the generator yet.

**Verification** (`scaffold-part-IV.test.mjs`): the request declaration is
produced by running `part-IV.request.mapping.json` through `map()` and is checked
structurally against `espd-validation-schematron/ESPDRequest/xsl/ESPD-criterion.xml`
(the tree the ESPD validator treats as canonical). The RG1 property-group tree
(element + id + governing code, in order) must reproduce the reference as an exact
PREFIX; the generated tree may carry additional trailing nodes because the bundled
reference is an OLDER ESPD-EDM snapshot than the freshly-exported `espd-edm.json`
(e.g. C31 gained a QSG4 block). The buyer `Expected*` values also roundtrip
(`roundtrip-part-IV.test.mjs`).

### Source of truth for criterion Name and Description — confirmed

Per the ESPD-EDM common-criteria rules (BR-TC-05 for `cbc:Name`, BR-TC-06/-19 for
`cbc:Description`): both "should match the one from **e-Certis**", mirrored in the
EA `ESPD-criterion` spreadsheet. This applies to ALL tendering criteria —
exclusion grounds and selection criteria alike. The per-procurement buyer
thresholds (number of years, minimum amount, currency) are explicitly NOT from
e-Certis; they are procedure-specific and are exactly our `requirement` model.

Where each value actually lives in this workspace:

| Value | Authoritative source | In workspace |
|-------|----------------------|--------------|
| Criterion `Name` | e-Certis (multilingual) | Now in `espd-edm.json` (and the generated request mapping's embedded structure), populated by the EAtoJSON label fetch from the EU Publications Office SPARQL authority table (`skos:prefLabel`, `en`). Also in `SelectionCriterion.gc` and `ESPD-criterion.xml`. |
| Criterion `Description` | e-Certis | Now in `espd-edm.json` (and the embedded structure), from the same SPARQL fetch (`skos:definition`, `en`). Also in `ESPD-criterion.xml`. NOT carried by `SelectionCriterion.gc` (no definition column). |
| National `SubTenderingCriterion` name/description | e-Certis (Member-State-specific) | Placeholders only (`[Name of the National Criterion]`). |
| Legislation content (Title/Article/Jurisdiction/URI/Language) | e-Certis / criterion definition | Placeholders only (`[Legislation Title]`). |

**Name/Description language.** The fetch and the emitted scaffold use **English**
(`skos:prefLabel`/`skos:definition`, `lang = "en"`), matching `ESPD-criterion.xml`
and the rest of the workspace. The authority table carries all 24 EU languages,
so a localized emitter could select another `lang` from the same source.

### TODOs

1. **~~Name/Description gap~~ — RESOLVED.** The EAtoJSON label fetch
   (`fetch-labels.js`) now populates criterion `name`/`description` in
   `espd-edm.json` from the Publications Office SPARQL authority table (the
   e-Certis-aligned source). Two fixes made this work: (a) `loadFromCache()`
   treats an empty cache as a miss instead of short-circuiting the fetch;
   (b) the SPARQL request is proxy-aware (routes via the `https` module with
   `https-proxy-agent`, honouring `HTTPS_PROXY`/`NO_PROXY` with a proxy↔direct
   fallback), since node's global `fetch` ignores those env vars. Re-running
   `export.js criteria` then `build-request-mapping.mjs` gives real
   names/descriptions across all criteria — so no interim enrichment from
   `SelectionCriterion.gc` / `ESPD-criterion.xml` is needed.
2. **Legislation scaffold — TODO (deferred):** emit `cac:Legislation`
   (ID/Title/Description/JurisdictionLevel/Article/URI/Language). Content is not
   in `espd-edm.json`; needs upstream modelling. Structure only for now.
3. **National sub-criterion scaffold — TODO (deferred):** emit
   `cac:SubTenderingCriterion` (ID/Name/Description + its own property group).
   Member-State-specific content comes from e-Certis; structure only for now.
