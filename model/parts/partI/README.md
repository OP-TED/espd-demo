# Part I — Information concerning the procurement procedure and the contracting authority

**Status: complete** (all three sections modelled, mapped, form-lensed, and
tested; 42 tests). Every Schematron-mandated field is covered. Remaining items
are deliberate, documented deferrals — see "Deferred" below.

Part I is administrative, not a criterion. In `espd-edm.json` it appears as three
`type: INFORMATION` entries whose leaves are UBL element skeletons (no
`propertydatatype`); we model it here as semantic instance data mapped to UBL.

## Sections

| Section | EA (`espd-edm.json`) | What we model | UBL target |
|---|---|---|---|
| **A** publication | `I68 info-pub` → `AdditionalDocumentReference` | `{ type, identifier, url? }` | `cac:AdditionalDocumentReference` |
| **B** contracting authority | `I69 info-buyer` → `ContractingParty/Party` | `officialName`, `country`, `identifier{value, scheme, schemeAgency}` | `cac:ContractingParty/cac:Party` |
| **C** procedure/project/lots | `I70 info-pp` + document header | `procedure{type, fileReference}`, `project{name, description}`, `lots[]` | `cbc:ProcedureCode`, `cbc:ContractFolderID`, `cac:ProcurementProject`, `cac:ProcurementProjectLot` |

## Schematron rules honoured

- **A:** `DocumentTypeCode` codelist attributes (`docrefcontent-type`, 5 attrs,
  01-cl-attributes line 74).
- **B:** BR-REQ-20-02 name (fatal), BR-REQ-20-03 country (fatal), BR-REQ-20-04
  identifier (warning); `@schemeID` ∈ `EOIDType` (CVA); `@schemeAgencyID`
  mandatory on every `cbc:ID` (BR-OTH-02, fatal).
- **C:** BR-SC-10 `ProcedureCode` present (fatal); BR-OTH-01 three code attrs on
  `ProcedureCode` (fatal); BR-OTH-02 `@schemeAgencyID` on `ContractFolderID`
  (fatal); lot `cbc:ID` carries the criterion scheme (matches BASE sample);
  BR-LOT-41 (selection criteria reference these lots).

## Codelists used

Per `docs/codelist-governance.md`:

| Field | Codelist | Shipped | Validated | Schema |
|---|---|---|---|---|
| A `type` | `docrefcontent-type` (10) | yes | yes | enum (marker false) |
| B `country` | `country` (341) | yes | yes | by name |
| B `identifier.scheme` | `eoid-type` (5) | yes | yes | enum (marker false) |
| C `procedureType` | `procurement-procedure-type` | **no** (issue #308) | no | by name (no `.gc` to derive from) |

## Deferred (optional — not debt)

All grounded in `docs/improvement-ideas.md`; none required for a conformant ESPD:

- **A2** — multiple publication references (EA cardinality is `1..n`; we model one).
- **A** `Attachment/Name` — a human-readable notice title; present in EA, not modelled.
- **B2** — optional buyer fields the EA model carries but no Schematron rule
  requires: postal address (street/city/zone/building), contact
  (name/phone/email/fax), `WebsiteURI`, `EndpointID` (needs its own
  `@schemeID`/`@schemeAgencyID`), `BuyerProfileURI`.
- **B1** — identifier lookup from a business register (VIES/GLEIF/national).
- **A1** — TED notice lookup to prefill Part I.
- **C1 / C2** — CPV classification and procurement type (works/supplies/services);
  neither is in the EA Part I model today.

## Known upstream flags (not Part I-specific)

- `procurement-procedure-type` is not shipped as a `.gc` → its enum can't be
  derived; carried by name until shipped (improvement-ideas X1).
- The `ESPD-Request-BASE.xml` sample still carries 3.x-era `ProcedureCode`
  placeholders (improvement-ideas X2).
