# Analysis: `xmlElementName` / `xmlChildren` in the EA export

## Context

The Enterprise Architect model was extended and the exporter updated so that
`espd-tools/EAtoJSON/outputs/espd-edm.json` now carries two new fields on
components:

- `xmlElementName` — the UBL element the component maps to (e.g.
  `cac::TenderingCriterionProperty`, `cac::PostalAddress`).
- `xmlChildren` — an ordered list of the element's direct children, each with
  `name`, `value`, and `kind`.

This note analyses what that adds, whether it is enough to fully encode ESPD
Request/Response UBL, and how it compares to the UBL XSDs
(`ESPD-EDM/schemas`) and the Schematron (`espd-validation-schematron`).

## What the new fields actually contain

Observed shape (from Parts I–VI, including C31 and OT65):

```json
"xmlElementName": "cac::TenderingCriterionProperty",
"xmlChildren": [
  { "name": "cbc:ID",                "value": null,       "kind": "scalar" },
  { "name": "cbc:Name",              "value": null,       "kind": "scalar" },
  { "name": "cbc:Description",       "value": "Turnover", "kind": "scalar" },
  { "name": "cbc:TypeCode",          "value": "QUESTION", "kind": "scalar" },
  { "name": "cbc:ValueDataTypeCode", "value": "AMOUNT",   "kind": "scalar" }
]
```

- `kind` takes exactly two values across the whole file: `scalar` (a leaf
  cbc:* element holding text) and `relationship` (a cac:* child that is itself
  an element with its own `xmlChildren` elsewhere).
- `value` is either `null` (filled at instance time) or a fixed string for
  elements whose content is constant metadata (`TypeCode`=`QUESTION`,
  `ValueDataTypeCode`=`AMOUNT`, `DocumentTypeCode`=`DocRefContentType`).
- `xmlElementName` uses a **double colon** namespace separator (`cac::`),
  whereas `xmlChildren[].name` uses a **single colon** (`cac:`/`cbc:`). This is
  an inconsistency to normalise before use.
- A few child names have casing typos vs. UBL (`cbc:Electronicmail` in the EO
  branch vs. `cbc:ElectronicMail` in the buyer branch; UBL defines
  `cbc:ElectronicMail`).

## What it does NOT contain

A full-file search confirmed the following are entirely absent:

1. **No XML attributes.** There is no `currencyID`, `listID`, `schemeID`,
   `unitCode`, `schemeAgencyID`, nor any `attributes` object anywhere. Yet valid
   ESPD XML requires them, e.g.:
   - `<cbc:ExpectedAmount currencyID="EUR">5000000</cbc:ExpectedAmount>`
   - `<cbc:TypeCode listID="criterion-element-type">REQUIREMENT</cbc:TypeCode>`
   - `<cbc:ValueDataTypeCode listID="response-data-type">AMOUNT</cbc:ValueDataTypeCode>`
   - `<cbc:ResponseQuantity unitCode="YEAR">5</cbc:ResponseQuantity>`
   - `<cbc:CriterionTypeCode listID="criterion">...`
   - `<cbc:ID schemeID="criterion">...`

2. **No response-side value elements.** The export models the *declaration*
   (criterion property) tree only. There is no `cac:TenderingCriterionResponse`,
   `cac:ValidatedCriterionPropertyID`, `cac:ResponseValue`,
   `cbc:ResponseIndicator`, `cbc:ResponseAmount`, `cbc:ResponseQuantity`,
   `cbc:ResponseDate`, `cbc:ResponseID`, nor `cac:EvidenceSupplied` /
   `cac:Evidence`. These are exactly the elements our response mapping must
   produce (see `ESPD-EDM/examples/espd-response-*.xml`).

3. **No request-side value element names on the property leaves.** A
   `TenderingCriterionProperty` leaf's `xmlChildren` lists `cbc:ID`, `cbc:Name`,
   `cbc:Description`, `cbc:TypeCode`, `cbc:ValueDataTypeCode` — but NOT the
   buyer value element (`cbc:ExpectedAmount` / `cbc:ExpectedValueNumeric` /
   `cbc:ExpectedDescription` / `cbc:ExpectedID` / etc.). Those elements, which
   our request mapping emits, are not present in the children list.

4. **No per-value-type binding.** The mapping from a `ValueDataTypeCode`
   (AMOUNT, PERIOD, INDICATOR, EVIDENCE_IDENTIFIER, ...) to its UBL element and
   JSON shape is still absent — it remains in our value-type registry.

## Can these fields fully encode ESPD Request and Response UBL?

**No.** They are sufficient for the *fixed container scaffold* of the ESPD
**Request declaration** (the TenderingCriterion / PropertyGroup / Property tree
and the Part I administrative containers), but not for a complete document:

- The **buyer value** per requirement is not in the children list, and the
  **attributes** that carry currency/code-list/unit information are absent, so
  even the request side cannot be fully serialised from these fields alone.
- The **entire response side** (responses, response values, supplied evidence,
  evidence records) is not modelled, so the Response document cannot be
  produced from these fields at all.

In short: the new fields are a faithful projection of the EA **declaration**
structure, not a complete UBL binding.

## Comparison with the UBL XSDs (`ESPD-EDM/schemas`)

- `xmlElementName` / `xmlChildren` agree with the UBL 2.4 content model for the
  elements they cover (child element names and their relative order match
  UBL-CommonAggregateComponents / maindoc), with the casing/`::` caveats above.
- The XSDs additionally define the **attributes** (e.g. `currencyID` on amount
  types, `unitCode` on quantity types, `listID` on code types) that the export
  omits. The XSDs also define the response aggregates
  (`TenderingCriterionResponse`, `ResponseValue`, `Evidence`) that the export
  does not touch.
- Net: the export is XSD-consistent as far as it goes, but is a strict subset of
  the information the XSDs require for a valid instance.

## Comparison with the Schematron (`espd-validation-schematron`)

- The Schematron asserts business rules the export does not express: presence
  and values of `listID`/`schemeID` attributes, lot references
  (BR-LOT rules), evidence cross-referencing, and response/requirement
  co-constraints. None of this attribute/relationship information is derivable
  from `xmlElementName` / `xmlChildren`.
- Therefore the Schematron remains the external validity gate (Requirement 12);
  the new fields neither satisfy nor replace it.

## Impact on our design

The new fields are **useful but not sufficient**, and they do not change the
architecture:

1. **Confirms, not replaces, the value-type registry.** Attributes, buyer value
   elements, and response/evidence elements still come from our value-type
   registry (`requestXml`/`responseXml` bindings). The registry stays the owner
   of UBL representation.

2. **Opportunity: cross-check the request declaration scaffold.** `xmlChildren`
   for the declaration containers (TenderingCriterion, PropertyGroup, Property,
   and the Part I `cac::...` administrative elements) is an authoritative,
   model-derived description of the fixed scaffold our request generator emits
   as `const`/`structure` nodes. We can **validate our generated scaffold
   against `xmlChildren`** (element names + order) as an extra correctness check,
   instead of hand-maintaining that scaffold knowledge. This is a strengthening
   of Requirement 4 generation, not a new input layer.

3. **No impact on the three leaner-probe findings.** `espd-edm.json` still stays
   as-is; no lean source, node-kinds, or fragments are reintroduced. The new
   fields are simply additional as-is data the compiler may read.

4. **Normalisation needed before use.** Any consumer of these fields must
   normalise `cac::` → `cac:` and reconcile the `Electronicmail`/`ElectronicMail`
   casing against UBL.

## Worked example: the "minimum amount" requirement leaf (C31/RG1/RSG1/RQ3)

### What the export emits today

```json
{
  "tag": "RQ3",
  "type": "REQUIREMENT",
  "propertydatatype": "MINIMUM_AMOUNT",
  "xmlElementName": "cac::TenderingCriterionProperty",
  "xmlChildren": [
    { "name": "cbc:ID",                "value": null,                          "kind": "scalar" },
    { "name": "cbc:Name",              "value": null,                          "kind": "scalar" },
    { "name": "cbc:Description",       "value": "Minimum amount requirement",  "kind": "scalar" },
    { "name": "cbc:TypeCode",          "value": "REQUIREMENT",                 "kind": "scalar" },
    { "name": "cbc:ValueDataTypeCode", "value": "MINIMUM_AMOUNT",              "kind": "scalar" }
  ]
}
```

### What valid request XML actually requires

```xml
<cac:TenderingCriterionProperty>
  <cbc:ID>bb22cc33-...</cbc:ID>
  <cbc:Description>Minimum specific average turnover required</cbc:Description>
  <cbc:TypeCode listID="criterion-element-type" listName="CriterionElementType"
                listVersionID="5.0.0" listSchemeURI="...CriterionElementType.gc"
                listURI="https://github.com/OP-TED/ESPD-EDM">REQUIREMENT</cbc:TypeCode>
  <cbc:ValueDataTypeCode listID="response-data-type" listName="ResponseDataType"
                         listVersionID="5.0.0" listSchemeURI="...ResponseDataType.gc"
                         listURI="https://github.com/OP-TED/ESPD-EDM">MINIMUM_AMOUNT</cbc:ValueDataTypeCode>
  <cbc:ExpectedAmount currencyID="EUR">5000000</cbc:ExpectedAmount>
</cac:TenderingCriterionProperty>
```

Two things in the XML are absent from the export:

1. **The value element** — `cbc:ExpectedAmount`, the element that carries the
   buyer's value. The export lists the four metadata children but not this one.
2. **The attributes** — `currencyID="EUR"` on the amount, and the mandatory
   code-list attributes (`listID`, `listName`, `listVersionID`, `listSchemeURI`,
   `listURI`, and for some lists `listAgencyID`/`listAgencyName`) on the two code
   elements. The export carries no attributes at all.

### "Emit the value element and attributes on leaves" would mean

```json
"xmlChildren": [
  { "name": "cbc:ID",                "value": null, "kind": "scalar" },
  { "name": "cbc:Name",              "value": null, "kind": "scalar" },
  { "name": "cbc:Description",       "value": "Minimum amount requirement", "kind": "scalar" },
  { "name": "cbc:TypeCode",          "value": "REQUIREMENT",    "kind": "code",
    "attributes": { "listID": "criterion-element-type" } },
  { "name": "cbc:ValueDataTypeCode", "value": "MINIMUM_AMOUNT", "kind": "code",
    "attributes": { "listID": "response-data-type" } },
  { "name": "cbc:ExpectedAmount",    "value": null, "kind": "amount",
    "attributes": { "currencyID": null } }
]
```

`cbc:ExpectedAmount` is the newly added **value element**; the `attributes`
objects carry the newly added **attributes** (`null` = filled at instance time;
a fixed string = constant).

## What the Schematron actually demands (grounds the recommendation)

`common/sch/01-ESPD-common-cl-attributes.sch` requires **every** code element to
carry a fixed, versioned set of code-list attributes. For
`cac:TenderingCriterionProperty/cbc:ValueDataTypeCode` it mandates all of:

```text
listName      = ResponseDataType
listID        = response-data-type
listVersionID = 5.0.0
listSchemeURI = https://raw.githubusercontent.com/OP-TED/ESPD-EDM/v5.0.0/codelists/gc/ResponseDataType.gc
listURI       = https://github.com/OP-TED/ESPD-EDM
```

Similar fixed sets apply to `cbc:TypeCode`, `cbc:CriterionTypeCode`,
`cbc:PropertyGroupTypeCode`, `cac:Country/cbc:IdentificationCode`,
`cbc:ValueCurrencyCode`, and others — several including dated
`listVersionID`s (e.g. `20250618-0`). These values are **codelist-level
constants**, identical for every element bound to that codelist; they are not
per-component data.

## Best-practice recommendation: where to model the XML

**Keep `espd-edm.json` lean on XML representation; model the UBL binding
separately in a small, layered registry.** Concretely:

1. **`espd-edm.json` owns structure + the codelist reference, not the UBL
   serialisation.** It already carries the one genuinely per-component XML fact
   that is not derivable: which element a node is
   (`xmlElementName`/`xmlChildren` for the declaration scaffold) and which
   codelist a value uses (`propertydatatype` / `ValueDataTypeCode`). That is the
   right amount of XML knowledge for the structural model.

2. **A value-type registry owns the per-value-type binding** (one entry per
   `ValueDataTypeCode`): the request value element (`cbc:ExpectedAmount`), the
   response value element (`cbc:ResponseAmount` and the surrounding
   `cac:ResponseValue`), their value-bearing attributes (`currencyID`,
   `unitCode`), and the JSON `instanceShape`. This is shared across all
   components of that type, so it belongs in one place — not repeated per leaf
   in `espd-edm.json`.

3. **A codelist-attribute profile owns the fixed six-attribute sets** keyed by
   element/codelist (ResponseDataType, CriterionElementType, PropertyGroupType,
   Criterion, Country, Currency, ...). These are constants defined by the
   Schematron version, change on codelist releases (dated `listVersionID`s), and
   are identical for every element. Modelling them once as a profile — rather
   than stamping them onto every node in `espd-edm.json` — keeps the structural
   model clean and makes a codelist version bump a one-line change.

### Why lean-plus-registry beats a "maximally complete" `espd-edm.json`

Making `espd-edm.json` carry every element, attribute, and fixed URI would:

- **duplicate codelist constants** onto hundreds of nodes (every `ValueDataTypeCode`
  would repeat the same five ResponseDataType attributes), so a codelist version
  bump becomes a mass edit and a drift risk;
- **couple the EA structural model to one serialisation and one Schematron
  version**, when the model's value is being serialisation-independent;
- still **not cover the response/evidence document**, which is a different tree
  the declaration structure does not contain — so a registry is needed anyway.

The lean-plus-registry split keeps each fact with exactly one owner:
`espd-edm.json` = structure + codelist reference; value-type registry =
per-type element/attribute/shape binding; codelist profile = fixed codelist
attribute constants. Composed at compile time they produce the fully
Schematron-satisfying XML, with every constant defined once.

### What "most complete XML modelling" looks like (composed, not inlined)

The compiler composes three layered inputs for the minimum-amount leaf:

```text
espd-edm.json      ->  element cac:TenderingCriterionProperty, child cbc:ValueDataTypeCode=MINIMUM_AMOUNT
value-type registry ->  MINIMUM_AMOUNT: requestXml cbc:ExpectedAmount @currencyID<-currency; instanceShape {value,currency}
codelist profile    ->  ValueDataTypeCode: {listName,listID,listVersionID,listSchemeURI,listURI}
                        ExpectedAmount:    {currencyID from instance}
```

...yielding the fully-attributed, Schematron-valid
`cac:TenderingCriterionProperty` shown above, while no single input repeats a
codelist constant.

## Recommendation

- Keep the value-type registry as the authority for UBL element/attribute
  bindings and for the entire response/evidence side.
- Add a small **codelist-attribute profile** that defines the Schematron's fixed
  six-attribute sets once per codelist, applied at compile time.
- Keep `espd-edm.json` lean on serialisation: structure + element identity
  (`xmlElementName`/`xmlChildren` scaffold) + codelist reference
  (`ValueDataTypeCode`), nothing more. Do **not** inline value elements,
  value-bearing attributes, or fixed codelist attributes into every node.
- Treat `xmlElementName` / `xmlChildren` as an **optional cross-check** for the
  request declaration scaffold (element presence and ordering), gated behind a
  normalisation step.
- Report the two data-quality issues upstream to the EA exporter: the `cac::`
  double-colon separator, and the `cbc:Electronicmail` casing. Reporting the
  request-side value element + value-bearing attributes to the exporter is
  **optional**; even if added, the registry and codelist profile remain
  necessary for the response/evidence side and the fixed codelist constants.
