# Improvement ideas

A backlog of possible enhancements, organised by part and section. These are
*ideas*, not commitments — nothing here is required for a conformant ESPD.

Several items are inspired by the Slovenian ESPD service
([ejn.gov.si/espd](https://ejn.gov.si/espd/)), which is a useful reference for
how a production ESPD service presents Part I.

Each item records **what** it is, **why** it helps, and **where it lands** in the
model (instance-data / mapping / form / codelist profile), so an idea can be
picked up without re-doing the investigation.

---

## ESPD-EDM modelling concerns (feedback for the EDM team)

Items in this section are not about *our* implementation — they question whether
something is modelled the right way **upstream** in ESPD-EDM, for the EDM
maintainers to consider.

### M1. `CODE_BOOLEAN` / `BooleanGUIControlType` encodes a GUI control in the data model

**What it is.** `BooleanGUIControlType.gc` is a 6-code list —
`CHECK_BOX_TRUE`, `CHECK_BOX_FALSE`, `CHECK_BOX_UNCHECKED`,
`RADIO_BUTTON_TRUE`, `RADIO_BUTTON_FALSE`, `RADIO_BUTTON_UNSELECTED` — behind the
`CODE_BOOLEAN` value type. It is used by two buyer REQUIREMENTs: C29
`slc-stand-to-gen` ("Threshold per year") and C36 `slc-stand-other` ("Select the
type of requirement"). In UBL it serialises as the buyer's `cbc:ExpectedCode`.

**The concern.** This is a **presentation decision encoded as exchanged data**.
Whether a yes/no choice is drawn as a checkbox or a radio button, and whether it
starts ticked/unticked/unselected, is a *rendering* concern — exactly the kind of
thing a form/presentation layer should decide, not something that belongs in the
interoperability payload. Two independent systems exchanging an ESPD do not need
to agree on *widget type*; they need to agree on the buyer's intent (e.g. "this
is a mutually-exclusive choice among these branches"). Mixing the two means:

- The same semantic intent can be expressed in several ways
  (`CHECK_BOX_TRUE` vs `RADIO_BUTTON_TRUE`), so consumers must treat distinct
  codes as equivalent — a classic sign the distinction is not semantic.
- A renderer that wants a different control (accessibility, mobile, a wizard
  step) is now contradicting the document, or must ignore the field it carries.
- The two real uses are actually two *different* intents wearing the same list:
  C36 is a genuine mutually-exclusive branch selector (the ENUM-SELECTOR /
  `branchSelectors` mechanism we model), while C29 is a per-year threshold
  toggle. The GUI-control vocabulary is standing in for "this is a selector" vs
  "this is a flag", which is a *structural* fact better expressed structurally.

**What we do today.** We model it faithfully (it is in ESPD-EDM, so a conformant
document carries it): the value-type registry maps `CODE_BOOLEAN` to
`cbc:ExpectedCode` + the `boolean-gui-control-type` codelist, and the instance
schema now derives the 6-code enum from the `.gc` (see X6 / the enum-derivation
mechanism). Our *form* layer, meanwhile, derives the actual UI control from
structure independently — which is the layering this code list arguably
duplicates.

**Suggestion for the EDM team.** Consider whether the buyer's intent could be
represented structurally instead — e.g. a mutually-exclusive branch group is
already expressible via the group/condition model, and a plain flag is just an
`INDICATOR`. If the GUI-control distinction is genuinely needed, it reads more
naturally as a *presentation profile* alongside the model than as a value inside
it. At minimum, if it stays, it should be **CVA-validated** (see X1's note:
`cbc:ExpectedCode` carrying this list is currently unvalidated), because an
invalid control code would mis-drive a renderer.

*Not blocking:* we interoperate with it as-is. This is a model-quality
observation, in the same category as the overloaded `QUANTITY_YEAR` finding
(task 4.3.3) — flagged, not urgent.

### M2. Data-quality nits in the Part II EA export (`espd-edm.json`)

Found while surveying Part II for modelling. All are small source-data defects in
the EA model as exported — none block us (we model the correct UBL element
names), but they are worth fixing upstream so the export is clean.

- **Wrong section description on `I71 info-eo`** (Part II Section A, the economic
  operator): its `description` reads `"I70_info-eo"` — it references **I70**
  (which is Part I Section C's `info-pp`) and should be `I71`. Looks like a
  copy-paste from the Part I block.
- **`ElectronicMail` element-name typos**, inconsistent across the two Part II
  party blocks:
  - `I71 info-eo` → `CTC1 [CONTACT]` has a child `cbc:Electronicmail`
    (lower-case `m`).
  - `I72 info-poa` → `CTC1 [CONTACT]` has a child `cbc:ElectronicaMail`
    (extra `a`).
  - The correct UBL element is `cbc:ElectronicMail` (as used correctly in the
    Part I buyer block and in `ESPD-Request-BASE.xml` / `ESPD-Response-BASE.xml`).
  Two different misspellings of the same element in adjacent blocks strongly
  suggests hand-entry drift in the EA model.

*Impact on us:* none — our Part II mapping targets the correct `cbc:ElectronicMail`
regardless of the export's typo, since the mapping is hand-authored against UBL,
not generated from these element names. Recorded here purely as upstream feedback.

### M3. `C40 slc-abil-staff-tech-ctrl` additional-evidence slot typed `INDICATOR` (should be `EVIDENCE_IDENTIFIER`)

**What it is.** In C40 (technicians/technical bodies for quality control), the
top-level additional-evidence leaf `RG1/RSG1/RSG1/QSG4/QSG1/Q1` ("Evidence
Supplied") is typed `INDICATOR` with cardinality `1..n`. Every other
"Evidence Supplied" leaf in the model — including the directly analogous leaf in
its sibling **C41 `slc-abil-staff-tech-work`** (`QSG4/QSG1/Q1`, "Supplied
Evidence") — is typed `EVIDENCE_IDENTIFIER`.

**The concern.** A `1..n` `INDICATOR` is self-contradictory: `INDICATOR` is a
single boolean, so "repeat it 1..n times" has no meaning, and it certainly cannot
*point at* a piece of evidence the way `EVIDENCE_IDENTIFIER` does. Reading the two
sibling criteria side by side, C40 is near-certainly a copy-paste/type-pick error
and should be `EVIDENCE_IDENTIFIER` like C41.

**What we do today.** We model it faithfully: C40's leaf binds to
`response.electronicEvidence.supplied` as a boolean (what `INDICATOR` says). Our
instance-schema generator derives if/then array bounds (`minItems`/`maxItems`)
from the `1..n` cardinality; on a boolean these are inert JSON-Schema no-ops, so
the schema still validates and round-trips — but the pairing of a scalar type
with array-cardinality bounds is a visible symptom of the upstream nit. C41's
equivalent leaf correctly renders as an `evidence[]` array of
`EVIDENCE_IDENTIFIER` objects.

**Suggestion for the EDM team.** Change C40 `QSG4/QSG1/Q1`'s
`ValueDataTypeCode` from `INDICATOR` to `EVIDENCE_IDENTIFIER` to match C41 and
every other evidence slot. Once fixed, our sidecar binding needs no change — the
leaf would simply start rendering as the standard evidence array.

*Not blocking:* we interoperate with it as-is.

---

## Form lens

### F1. RESOLVED — Caption text is now surfaced in the generated form lens

**Update (resolved).** The form lens now emits each caption as a non-input
"note" field. `read-structural-core.mjs` flags caption structural nodes
(`caption: true`) and keeps their `cbc:Description`; `generate-form-structure.mjs`
emits a `{ kind: "caption", labelKey, $derivedFrom, visibleWhen? }` field in
document order within its group, with no `dataPath`/`filledBy`/`uiType`. The
label key follows the same code-stem convention as sibling leaves
(`caption.label.<code>.<EA tag path>`), matching the already-shipped
`caption.label.*` catalogue entries. A caption inside a conditional branch
inherits that branch's `visibleWhen` (verified on OT58's ONFALSE caption). The
instance-data schema and XML mappings are untouched — captions remain
presentation-only (verified: only `form.json` files changed on regeneration). 4
tests in `generate-form-structure.test.mjs`. The original note is retained below.

**What it is.** ~25 criteria carry CAPTION nodes (`cbc:TypeCode` CAPTION,
`ValueDataTypeCode` NONE) — e.g. OT58's "The country of the economic operator
does not have an official list of approved economic operators..." They are
label-only: `responsepath` == `requestpath`, no answer value, so they carry **no
exchanged data** and correctly produce no instance-data field and no XML value
mapping.

**The gap.** Our form-structure generator collects only `requirement`/`question`
leaves; captions are classified `structural` and walked through without emitting
anything. So the explanatory prose a caption carries (its `cbc:Description`) is
not available to a UI built from our lens — a renderer would be missing the
section headings / guidance text the buyer form is meant to show.

**Where it would land.** A presentation-only addition to the form lens: emit a
non-input "caption"/"note" element (carrying the caption's i18n label key and
`$derivedFrom` requestpath) at its position in the group, with no `dataPath`,
`filledBy`, or `uiType`. The instance-data schema and the XML mappings stay
untouched — this is purely about not dropping display text. Needs a caption
label-key convention (the shipped i18n catalogue is keyed per data leaf; whether
it also keys captions needs checking).

*Not blocking:* captions are guidance text, not data; the model is correct
without them. This is a fidelity improvement for the UI layer.

---

## Part I Section A — publication reference

Current model: a single `{ type, identifier, url? }` mapped to one
`cac:AdditionalDocumentReference`. See `model/parts/partI/sectionA.*`.

### A1. "Look up notice from TED" button

Let the buyer paste a TED notice number (or URL) and have the service fetch the
notice, then prefill the publication reference — and potentially Part I Section B
(buyer) and Section C (procedure type, project, lots) from the same notice.

*Why:* the Regulation's own Part I text says that for procedures published in the
OJEU "the information required under Part I will be automatically retrieved,
provided that the electronic ESPD-service is used". So this is not a convenience
feature bolted on — it is the behaviour the standard form anticipates. The
Slovenian service implements exactly this.

*Where:* a UI/service concern, not a model change. The form lens already marks
`partI.publication.identifier` and `.url` as the fields to fill. The old
`espd-edm/parts/part-I-procedure.json` has a `"lookup": true` flag on its TED
fields — a precedent worth reusing when the compiled form drives the UI.

*Notes:* needs a TED API client and a mapping from the TED notice payload to our
instance paths. Decide the failure mode when the notice cannot be fetched
(offline / unknown number) — the fields must stay manually editable.

### A2. Multiple publication references

Allow more than one publication reference (e.g. a prior information notice *and*
the contract notice, or an OJEU notice *and* a national one).

*Why:* both the EA model and UBL already allow it, so our single-reference model
is the narrower one:

- EA `espd-edm.json`: `I68_info-pub/ADR1` has cardinality **`1..n`**.
- UBL 2.4 `QualificationApplicationRequest`: `cac:AdditionalDocumentReference`
  is `minOccurs="0" maxOccurs="unbounded"`.
- The `DocrefcontentType` codelist distinguishes notice *kinds*
  (`TED_CN` contract notice vs `TED_PIN` prior information notice, plus national
  / regional / local variants), which only makes sense if several can coexist.

*Where:* `sectionA.schema.json` becomes an array (`partI.publication[]`), the
mapping becomes a `records`/`forEach` rule over repeated
`cac:AdditionalDocumentReference` wrappers (the same shape Section C already uses
for lots), and the form field becomes `repeatable`.

*Notes:* a small, well-grounded change. Worth doing together with A1, since a
TED lookup naturally produces one reference among possibly several.

---

## Part I Section B — contracting authority

Current model: the Schematron-mandated minimum — `officialName`, `country`, and
an optional `identifier { value, scheme, schemeAgency }`. See
`model/parts/partI/sectionB.*`.

### B1. Identifier lookup from a business register

A button next to the identifier that resolves it against an authoritative
register and prefills the buyer's name (and address, if B2 is implemented).

*Why:* removes transcription errors on the one field that machine-identifies the
buyer. The Slovenian service does this against **PRS** (the Slovenian business
register).

*Where:* UI/service concern. The model already carries the `scheme` that says
*which* register to query — this is what `EOIDType` is for:

| `scheme` | Register to query |
|---|---|
| `VAT` | **VIES** (EU-wide VAT validation service) |
| `NATIONAL` | the member state's business register (e.g. PRS for SI) |
| `LEI` | GLEIF |
| `BRIS` | the EU Business Registers Interconnection System |
| `DUNS` | Dun & Bradstreet |

*Notes:* the scheme → register mapping is a genuine piece of configuration worth
adding to the model (a per-scheme lookup endpoint), because it is stable
reference data, not UI code. `NATIONAL` is the awkward one: the register depends
on the country, so it needs a country → register table. Only VIES and GLEIF have
straightforward public APIs.

### B2. Optional address, contact and web fields for the buyer

Add the rest of the UBL party block as optional data: street, city, postal zone,
building number, contact name / phone / email / fax, website URI, endpoint,
buyer profile URI.

*Why:* we deliberately modelled only what the Schematron mandates (BR-REQ-20-02
name, BR-REQ-20-03 country, BR-REQ-20-04 identifier). But the EA model **and**
the authoritative `ESPD-Request-BASE.xml` both carry the full party tree, and a
real buyer record is more useful with contact details — practical for the EO
reading the request.

*Where:* `sectionB.schema.json` gains an optional `address` and `contact` object;
the mapping gains value rules to the existing UBL paths, all already present in
the sample:

```
cac:ContractingParty/cbc:BuyerProfileURI
cac:ContractingParty/cac:Party/cbc:WebsiteURI
cac:ContractingParty/cac:Party/cbc:EndpointID        (BR-OTH-08: needs @schemeID)
cac:ContractingParty/cac:Party/cac:PostalAddress/cbc:StreetName
                                               .../cbc:CityName
                                               .../cbc:PostalZone
                                               .../cbc:BuildingNumber
cac:ContractingParty/cac:Party/cac:Contact/cbc:Name
                                       .../cbc:Telephone
                                       .../cbc:ElectronicMail
                                       .../cbc:Telefax
```

*Notes:* no Schematron rule constrains any of these except `cbc:EndpointID`,
which needs `@schemeID` (BR-OTH-08, error) and `@schemeAgencyID` (BR-OTH-02,
fatal) — so if the endpoint is added, it needs the same structured treatment as
the party identifier. Everything else is plain optional text. Keep them optional:
making them required would reject valid ESPDs.

---

## Part I Section C — procedure and project

Current model: `procedureType`, `fileReference { value, schemeAgency }`,
`project { name, description }`, and `lots[]`. See `model/parts/partI/sectionC.*`.

### C1. CPV codes, with lookup

Model the procurement subject classification (CPV) with a code picker / search.

*Why:* CPV is how the subject of a procurement is machine-classified, and it is
what EOs filter on. The Slovenian service offers it. This was already
investigated and written up as a TODO on the legacy Part I schema, including
confirmation against a real Slovenian export.

*Where:* `cac:ProcurementProject`, alongside the `name`/`description` we already
map:

```
cac:ProcurementProject/cac:MainCommodityClassification/cbc:ItemClassificationCode        (listID='cpv')
cac:ProcurementProject/cac:AdditionalCommodityClassification/cbc:ItemClassificationCode  (listID='cpv', repeating)
```

*Notes:*
- Confirmed procedure-level (one classification for the project), **not**
  per-criterion.
- Not mandated by Regulation 2016/7 — an optional convenience feature.
- No CPV codelist ships in `ESPD-EDM/codelists/`, and no Schematron or CVA rule
  references `CommodityClassification`. So like `procurement-procedure-type`
  (see X1), the values would have to come from the external EU authority list.
  Store bare codes and reference the authority list rather than embedding ~9 500
  CPV entries in the repo.
- CPV is hierarchical (division → group → class → category), so a usable picker
  needs tree search, not a flat dropdown.

### C2. Procurement type (works / supplies / services)

Model `objectType` — whether the procurement is for works, supplies, services,
or a combination.

*Why:* it is basic procedure metadata, it sits right next to CPV conceptually,
and `cbc:ProcurementTypeCode` is already in the Schematron's BR-OTH-01 code list
(so the attribute rules are defined for it) even though nothing currently emits
it.

*Where:* `cac:ProcurementProject/cbc:ProcurementTypeCode`.

*Notes:* same missing-codelist situation as CPV and procedure type — no `.gc`
ships for it. Pairs naturally with C1.

---

## Part II — economic operator

### P2-1. TODO — validate Part II Section B (power of attorney) against real XML

**Section B is modelled WITHOUT a trustworthy reference and must be validated
against a real instance before it can be considered confirmed.**

Unlike Section A (grounded in BR-RESP-10 and the EO block of
`ESPD-Response-BASE.xml`), the power-of-attorney block has **no corroborating
source** in the repo:

- **No Schematron rule** mentions `cac:PowerOfAttorney` or `cac:AgentParty`
  (confirmed by a full search of `espd-validation-schematron/**/*.sch`).
- **No instance** in `ESPD-Request-BASE.xml` or `ESPD-Response-BASE.xml` contains
  either element (0 occurrences in both).
- So the model (`model/parts/partII/sectionB.*`) is derived only from the EA
  `I72 info-poa` tree and the UBL 2.4 `PowerOfAttorneyType` definition
  (`Description` optional, `AgentParty` mandatory). Field choices
  (name/identifier/country on the agent, all-optional-but-name) are an informed
  guess, not a verified shape.

This is **exactly the situation Part I Section A was in** before a real Slovenian
ESPD export was supplied — at which point the publication-reference model was
corrected against the actual XML. Section B needs the same treatment.

**What to do:**
1. Obtain a real ESPD Response that carries a `cac:PowerOfAttorney` (e.g. from a
   production ESPD service, as was done for Part I §A).
2. Compare its structure to `sectionB.mapping.json`: confirm the
   `AgentParty` sub-elements used, their nesting, any attributes, and whether a
   mandate reference (`cac:MandateDocumentReference`), notary, or witness party
   appears in practice.
3. Update the schema/mapping/example and turn the roundtrip tests into
   assertions against the real sample (as `sectionA.test.mjs` does with
   `310364-2026`).
4. Remove the ⚠ caveats in `sectionB.schema.json` and `partII/README.md` once
   verified.

Until then, treat Section B as **provisional**. The caveat is recorded in the
schema `$comment`, in `model/parts/partII/README.md`, and here.

---

## Part VI — concluding statements / signature

### P6-1. RESOLVED — Part VI (signature block) is now modelled

**Update:** Part VI is now modelled in `model/parts/partVI/` (schema, example,
form, mapping, test — 7 tests), following the `model/parts/` administrative
pattern with the explicit "provisional — no reference XML" caveat below, exactly
like Part II §B. The single optional field `partVI.signatory.physicalLocationName`
maps to `cac:Signature/cac:SignatoryParty/cac:PhysicalLocation/cbc:Name` in the
response. The no-sample caveat (resolve-when conditions below) still stands and is
recorded in `model/parts/partVI/README.md`. The rest of this entry is retained as
the original assessment.

Part VI (`I73 info-signature`, `type: INFORMATION` — administrative, so
`model/parts/` territory, not compiler) was assessed and originally deferred.

**What the EA model exposes** is a single optional chain:

```
cac:Signature [0..1]
└── cac:SignatoryParty [0..1]
    └── cac:PhysicalLocation [0..1]
        └── cbc:Name        (the place the declaration is signed, e.g. a city)
```

So in practice the EA export surfaces **one optional free-text field** (the
signing place). The real UBL `cac:Signature` is far richer (signatory party,
digital-signature info, validation date), but the EA model only carries the
place-name.

**Why deferred:**
- **Nothing is required** — every node is `0..1`, and **no Schematron rule**
  mentions `cac:Signature` / `SignatoryParty` / `PhysicalLocation`.
- **No instance to verify against** — neither `ESPD-Request-BASE.xml` nor
  `ESPD-Response-BASE.xml` contains a `cac:Signature`. Same unverified situation
  as the power-of-attorney block (P2-1).
- **Low value** — modelling it is five files to carry one optional
  `signature.place` string. Actual signing of an ESPD is handled at the
  document/submission layer (digital signature), which is why the samples omit
  this field and no rule requires it.

**Resolve when:** (a) a real ESPD instance carrying `cac:Signature` is available
to verify the shape against, AND (b) a decision is made on whether the reference
implementation needs to carry the signatory place at all, versus leaving signing
to the document layer. If modelled, follow the `model/parts/` pattern with an
explicit "provisional — no reference XML" caveat, exactly like Part II §B.

With this, all six parts are accounted for: I, II (admin), III, IV, V (criteria)
and VI (signature) are modelled; the only remaining caveats are the "no
reference XML" provisional note on Part II §B and Part VI, and the mapping-engine
gap in E1 below.

### P6-2. Explore modelling the signature more fully (XML + UI)

**What it is.** The modelled Part VI (P6-1) carries only what the EA export
exposes: one optional field, the signatory party's physical-location name
(`cac:Signature/cac:SignatoryParty/cac:PhysicalLocation/cbc:Name`). The real UBL
`cac:Signature` (and the broader signing story) is much richer, and the ESPD is a
*declaration* whose whole point is to be signed — so the signature is worth a
deeper look than the EA model's single field suggests.

**Two distinct layers to explore, kept separate:**

1. **Fuller UBL `cac:Signature` data (XML).** UBL `SignatureType` carries more
   than a place name — e.g. `cbc:ID`, `cbc:Note`, `cbc:ValidationDate` /
   `cbc:ValidationTime`, `cbc:CanonicalizationMethod`, `cbc:SignatureMethod`, the
   `SignatoryParty` (a full `cac:Party`: name, identifier, postal address,
   contact), and `cac:DigitalSignatureAttachment` (an `ExternalReference` to the
   detached signature document). Worth checking: which of these the ESPD actually
   intends to use, whether the authoritative `ESPD-Response-BASE.xml` (or any real
   service output) populates a `cac:Signature`, and whether the EA model *should*
   expose more than the place-name leaf (likely an upstream EA gap — the envelope
   is hand-maintained outside the EA model, same root cause as X1).

2. **Cryptographic signing + signature UI (beyond the data model).** The actual
   act of signing an ESPD (XML-DSig / XAdES over the document, or an eIDAS
   e-signature / e-seal) is a transport/packaging concern that the current model
   deliberately does not touch. A production ESPD service needs a *signature UI*:
   who is signing, in what capacity, with which certificate; invoking a signing
   service; displaying/validating an existing signature on an imported ESPD. This
   is UI/service work, not instance-data modelling, but it is the part end users
   actually experience.

**Why explore.** The gap between "one place-name string" and "a signed legal
declaration" is large. Before investing, it is worth establishing: (a) what the
Regulation and the ESPD service guidance actually require at signing time;
(b) what real ESPD instances carry in `cac:Signature`; (c) where the boundary
should sit between ESPD-EDM *data* and the signing/packaging layer. The outcome
may be "the EA model's single field is genuinely all the *data* needs, and
everything else is the document layer" — but that should be a verified
conclusion, not an assumption inherited from a thin EA export.

**Where it lands.** (1) extends `model/parts/partVI/` (schema/mapping/form) and
may feed an upstream EA-model request; (2) is a UI/service concern alongside the
form lens, like the TED-lookup (A1) and register-lookup (B1) ideas. Both depend
on getting a real signed ESPD instance to work from (ties into the Part II §B /
Part VI "no reference XML" caveat).

---

## Cross-cutting — codelist infrastructure

### X1. Publish `procurement-procedure-type` as part of ESPD-EDM

`cbc:ProcedureCode` is **fatally mandatory** (BR-SC-10) and its
`listID`/`listAgencyID`/`listVersionID` attributes are **fatally mandatory**
(BR-OTH-01-10/20/30) — yet no `.gc` for the list ships in
`ESPD-EDM/codelists/`, and the CVA has no context for `cbc:ProcedureCode`. So it
is the one mandatory code element whose **value is never validated** and whose
allowed values an implementation cannot discover from the distribution.

*Why it is missing (likely cause, verified mechanically):* codelists are exported
from **EA enumeration objects** — `extractEnumerations()` in
`espd-tools/EAtoJSON/export-code-lists.js` filters the EA model's enumerations,
splitting them into ESPD-internal (generated from EA values) and external EU
vocabularies (downloaded). A list only ships if something in the EA model is
typed to it. And `ProcedureCode` is **not in the EA model at all** — it occurs
**zero** times in `espd-edm.json`, as do `ProcurementTypeCode` and
`CommodityClassification`. The EA model covers *criteria*; the document envelope
(`cbc:ProcedureCode`, `cbc:ContractFolderID`, `cac:ProcurementProject`, …) is
hand-maintained in the sample XML and in `espd-tools/modules/espd_constants.cjs`.
So the gap is a side effect of the envelope being outside the EA model, not a
deliberate exclusion.

*Recommendation: yes, add it.* There is direct precedent — `DocrefcontentType` is
exactly analogous (an OP authority list, not ESPD-specific) and it **is** shipped
as a `.gc` **and** CVA-validated. The same is true of `Country`, `Currency`,
`Language` and `Occupation`. Treating `procurement-procedure-type` differently
looks like an oversight rather than a decision.

Concretely, two changes that are independent and both worth having:

1. **Ship `ProcurementProcedureType.gc`** alongside the other external lists, so
   implementations can populate the picker and derive an enum. Our own Section C
   model would then gain an enum exactly as Section A did from
   `DocrefcontentType.gc` — the test for that is already written to assert we do
   *not* claim an enum we cannot derive, so it would be a small, guarded change.
2. **Add a CVA context** for `cac:...` / `cbc:ProcedureCode` in
   `01-ESPD-codelist-values.cva`, closing the value-validation gap. (While there:
   the CVA's own comment notes `BooleanGUIControlType.gc` is *"Missing from this
   list"* — the same class of omission.)

The attribute values to use are already settled in the repo's tooling
(`espd_constants.cjs`, versions 4.0.0 / 4.1.0), and are what our codelist profile
now carries:

```
listID        = http://publications.europa.eu/resource/authority/procurement-procedure-type
listAgencyID  = OP
listVersionID = 20250924-0
```

#### Concrete proposal

**(a) Shipping the `.gc` — one EA change, no code change.**

The exporter already knows how to fetch external EU vocabulary lists; it just
needs an EA enumeration to hang off. From
`espd-tools/EAtoJSON/export-code-lists.js`:

- `extractEnumerations()` collects EA enumeration objects and splits them by name
  prefix: `const EXTERNAL_VOCABULARY_PREFIXES = ['at-voc:', 'esco:']`.
- An **external** list is not generated from EA values — it is **downloaded**.
  `downloadGcXml()` takes the URL from `enumeration.locationUri`, an EA attribute
  on the enumeration object.
- The downloaded `.gc` is written to the codelists output, and the list is
  registered in `codelists.json` with its `ShortName` and `Version` read back
  out of the fetched file.

So the change is:

1. Add an EA enumeration object named **`at-voc:procurement-procedure-type`**
   (the `at-voc:` prefix is what marks it as an EU authority table — this is how
   `country`, `currency`, `docrefcontent-type` etc. are already declared).
2. Set its **`locationUri`** to the OP genericode distribution for the list.
   Follow the pattern of the lists already shipped, e.g. `DocrefcontentType.gc`
   carries
   `http://publications.europa.eu/resource/distribution/docrefcontent-type/20250319-0/xml/gc/DocrefcontentType.gc`.
   The equivalent for this list is the `procurement-procedure-type` distribution
   at version `20250924-0` — **look the exact URL up on the EU Vocabularies
   e-procurement authority-tables page rather than hand-constructing it**, since
   the filename casing and the current version both need confirming.
3. Re-run the codelist export. `ProcurementProcedureType.gc` appears alongside
   the other 17 lists, and `codelists.json` picks up its version automatically.

Nothing in the exporter needs modifying — this is purely declaring the list in
the model, which is also why the omission was easy to miss.

*Cross-reference:* this list is an **eForms** codelist (the comment in
`excel2espd.js` says the procedure type "is provided by eForms and the concrete
notice per procedure"). The eForms SDK already distributes it in genericode, so
there is a second possible source if the OP distribution URL proves awkward —
but the `at-voc:` route keeps ESPD consistent with how it obtains every other
authority table.

**(b) The CVA context — three lines.**

`espd-validation-schematron/common/cva/01-ESPD-codelist-values.cva` needs the
list registered and a context bound to the element, mirroring the
`DocRefContentType` entry exactly.

In `<ValueLists>`:

```xml
<ValueList xml:id="ProcurementProcedureType"
           uri="../../gc/ProcurementProcedureType.gc"/><!-- /cbc:ProcedureCode -->
```

In `<Contexts>`:

```xml
<Context address="cbc:ProcedureCode" values="ProcurementProcedureType">
    <Message>Invalid value: '<sch:value-of select="."/>' for the element 'cbc:ProcedureCode'.</Message>
</Context>
```

Notes on this:

- `cbc:ProcedureCode` is a **document-root child**, so the address has no parent
  path — same as the existing `cbc:ConfidentialityLevelCode` and
  `cbc:ProfileExecutionID` contexts, which are also unqualified.
- The CVA is compiled into `ESPDRequest/sch/01-ESPD-codelist-values.sch` and
  `.../xsl/01-ESPD-codelist-values.xsl` (and the Response equivalents). That XSL
  is already the **first** validator our pipeline runs
  (`VALIDATORS` in `model/compiler/schematron-validate.mjs`), so once the CVA is
  regenerated the new check is picked up with no change on our side.
- Add it for **both** Request and Response: the Response sample also carries
  `cbc:ProcedureCode`.
- Doing (b) without (a) is possible but pointless — the compiled Schematron
  inlines the permitted values from the `.gc`, so the file has to exist first.

**While in the CVA**, two adjacent omissions are worth closing in the same pass:

- `BooleanGUIControlType.gc` — the CVA's own comment says *"Missing from this
  list"*. Do **not** add it: per [`codelist-governance.md`](./codelist-governance.md)
  this is a deliberately *unvalidated* suggestion list (see CVA1, superseded).
  The comment is an authoring note, not a confirmed TODO.
- `cbc:ResponseCode` referencing `eo-role-type` — the CVA validates
  `cac:EconomicOperatorParty/cac:EconomicOperatorRole/cbc:RoleCode` but not a
  `ResponseCode` carrying the same list, which is how the Response sample ends up
  with a `dummy-value` role code (see X2). This one **is** a real gap:
  `eo-role-type` is an authoritative/validated list, so the `ResponseCode` use
  should be validated too.

### X2. TODO — produce better BASE samples, without dummy placeholders

**Goal: the two BASE samples should be exemplary, copy-pasteable reference
documents with realistic, resolvable, conformant values throughout.**

`espd-validation-schematron/common/xml/ESPD-Request-BASE.xml` and
`ESPD-Response-BASE.xml` are the canonical conformance documents: implementers
copy them, and our own Schematron tests wrap generated criteria into them. Both
currently carry placeholder content. A placeholder in the canonical sample
propagates into real implementations.

The placeholders fall into two classes, and the first class is the one that
actually matters.

**Class 1 — unresolvable or invalid identifiers (should be fixed).**

| Where | Current value | Problem |
|---|---|---|
| `cbc:ProcedureCode/@listID` (both samples) | `Dummy_procurement-procedure-type` | not a resolvable codelist identifier |
| `cbc:ProcedureCode/@listVersionID` (both) | `yyyymmdd-0` | literal placeholder, not a dated version |
| `cbc:ResponseCode` with `eo-role-type` list (Response) | `dummy-value` | **not a valid code** in the referenced codelist |
| `cbc:EndpointID/@schemeID` (Request) | `DV` | not a real electronic-address scheme (see X3) |
| `cbc:UUID/@schemeAgencyID`, `cbc:ResponseID/@schemeAgencyID` | `XXXESPD-SERVICEXXX`, `XXXQUALIDXXX` | substitution tokens left in place |
| `cbc:BuyerProfileURI`, `cbc:WebsiteURI` | `DV` | URI-typed elements holding a non-URI |
| `cbc:ElectronicMail` | `DV` | not a valid email address |

The `ProcedureCode` ones are **3.3.0-era values**: `espd_constants.cjs` carries
exactly those two strings under its `"3.3.0"` entry, while `"4.0.0"` and
`"4.1.0"` already use the real authority-list URI and the dated version
`20250924-0`. The tooling moved on; the samples did not.

They survive because of the X1 gap — nothing validates this element's attribute
*values*: no CVA context, and no per-codelist rule in
`01-ESPD-common-cl-attributes.sch`. BR-OTH-01 only asserts the three attributes
are *present*, which placeholders satisfy. Same for the `dummy-value` role code:
the CVA validates `cac:EconomicOperatorParty/cac:EconomicOperatorRole/cbc:RoleCode`
but **not** a `cbc:ResponseCode` that happens to reference the same list.

**Class 2 — filler data (cosmetic, but worth improving).**

`DV` as party name / street / city / postal zone / phone, and `Dummy Description`
(29 occurrences in the Response), `Dummy QUAL_ID`. These are valid strings, so
they break nothing — but they make the samples poor illustrations. A realistic
fictional buyer and economic operator would make the documents far more useful as
a starting point, and would exercise things like non-ASCII names and plausible
address formats.

**Proposed approach:**

1. Fix Class 1 first — it is a small, bounded set and these are the values that
   are actually wrong rather than merely bland.
2. Do the `ProcedureCode` fix together with X1, so the corrected value is
   validated from then on and cannot silently rot again.
3. Replace Class 2 filler with one coherent fictional scenario (a named buyer, a
   named EO, a real-looking procedure and lots) used consistently across both
   samples, so Request and Response tell the same story.
4. Add a guard so this does not regress: a check that the samples contain no
   `Dummy`/`yyyymmdd`/`XXX…XXX` tokens. Cheap to run in CI, and it is exactly the
   kind of drift that is invisible until someone copies it.

*Note:* our own `schematron-validate.mjs` wraps generated criteria into these
samples, so improving them also improves the fixtures our compiler tests validate
against.

### X3. No codelist for the endpoint scheme (`cbc:EndpointID/@schemeID`)

BR-OTH-08 (error) requires `@schemeID` on `cbc:EndpointID`, and BR-OTH-02 (fatal)
requires `@schemeAgencyID` — but no codelist ships for the scheme, there is no
CVA context for it, and the Request sample fills it with the placeholder `DV`.

The Schematron's own comment suggests the intended list ("e.g. eSENS Party
Identifier Scheme"), i.e. an electronic-address-scheme list of the kind eForms
and Peppol use.

*Where:* only relevant if the buyer endpoint is modelled (see B2). Flagged here
because it is the **second** envelope codelist gap of the same shape as X1 (see
the full inventory in X4), and the two are best resolved together.

### X4. Envelope codelist inventory — what else is missing?

Asked directly: *are there other codelists needed outside the criteria that are
not yet in the EA model?* Scanning every `listID`- and `schemeID`-bearing element
in both BASE samples **outside** the criterion trees gives the full picture:

| Element (envelope) | Codelist | `.gc` shipped? | CVA-validated? |
|---|---|---|---|
| `cac:Country/cbc:IdentificationCode` | `country` | ✅ | ✅ |
| `cbc:IndustryClassificationCode` | `economic-operator-size` | ✅ | ✅ |
| `cac:EconomicOperatorRole/cbc:RoleCode` | `eo-role-type` | ✅ | ✅ |
| `cbc:ConfidentialityLevelCode` | `access-right` | ✅ | ✅ |
| `cbc:ProfileExecutionID` | `profile-execution-id` | ✅ | ✅ |
| `cac:PartyIdentification/cbc:ID/@schemeID` | `EOIDType` | ✅ | ✅ |
| `cbc:ValueCurrencyCode`, `@currencyID` | `currency` | ✅ | ✅ |
| `@languageID` | `language` | ✅ | ✅ |
| `cac:AdditionalDocumentReference/cbc:DocumentTypeCode` | `docrefcontent-type` | ✅ | ✅ |
| **`cbc:ProcedureCode`** | **`procurement-procedure-type`** | ❌ | ❌ |
| **`cbc:EndpointID/@schemeID`** | **(none defined)** | ❌ | ❌ |
| `cbc:UUID/@schemeID` | *not a codelist* (ISO/IEC 9834-8) | n/a | n/a |

**So: only two gaps, both already captured above — X1 (`ProcedureCode`) and X3
(`EndpointID`).** Everything else the envelope uses is shipped and validated.

An important nuance this makes clear: **a codelist can be in the EA model even
when the element that uses it is not.** `Country`, `EoRoleType`,
`EconomicOperatorSize`, `AccessRight`, `EOIDType` and friends all ship, even
though Part I/II party elements are not in the criterion component tree at all.
That is because the codelist export reads EA **enumeration objects**, a separate
part of the model from the criterion structure. `procurement-procedure-type` is
missing as an *enumeration*, which is a smaller and more easily fixed omission
than modelling the envelope itself.

### X5. `ProcurementTypeCode` and CPV — needed, or not?

Asked directly: *do we also need to add `ProcurementTypeCode` and
`CommodityClassification`?*

Current state — neither is used anywhere today:

| | in `espd-edm.json` | in BASE samples | Schematron |
|---|---|---|---|
| `cbc:ProcurementTypeCode` | 0 occurrences | 0 occurrences | listed in BR-OTH-01 (attribute rules defined) |
| `cac:*CommodityClassification` (CPV) | 0 occurrences | 0 occurrences | no rule at all |

**Answer: not needed for conformance — only if we adopt C1/C2.** Nothing requires
either element; no document emits them; no rule demands them. They are purely
the enabling work for the two optional Section C features:

- Adopt **C1 (CPV)** → need a CPV source. CPV is ~9 500 hierarchical codes, so
  **do not ship it as a `.gc` in ESPD-EDM**: reference the external authority
  list and have the UI query it. (This also matches the existing written-up
  recommendation to "store bare codes and reference the external CPV authority
  list rather than embedding it".)
- Adopt **C2 (procurement type)** → a small list (works / supplies / services /
  combined) that *would* be a sensible `at-voc:` addition, exactly like X1(a).

Note the asymmetry worth keeping in mind: `ProcurementTypeCode` already appears
in the Schematron's BR-OTH-01 element list, so the moment anything emits it, its
three code attributes become **fatally mandatory** — an implementation cannot add
the element casually without also deciding its codelist attributes. CPV has no
rule at all, so it is unconstrained but also unvalidated.

*Recommendation:* treat both as **deferred until C1/C2 are actually wanted**, and
if they are, add `procurement-type` via the `at-voc:` route while leaving CPV
external. Neither should block X1, which is a real gap in a *mandatory* element.

### X6. Derive enums for the remaining code-valued fields

> **The governing model now lives in [`codelist-governance.md`](./codelist-governance.md)**
> and its machine form `model/codelists/governance.json`. Read that for the four
> independent axes (shipped / Schematron-validated / use-for-UI / inline-as-enum)
> and the per-codelist decisions. This section only covers the enum-derivation
> *mechanics*.

The shared reader is `model/codelists/read-codelist.mjs`:
`readCodelistCodes(path)` plus a name resolver (`gcFileForCodelist` /
`codesForCodelist`) that indexes every shipped `.gc` by its ShortName and its
identifier-style LongNames (the kebab list id lives in
`<LongName Identifier="listId">`).

**Two independent decisions** (NOT a single coupled rule — see the governance
page; an earlier draft wrongly tied these together):

- **Inline vs reference-by-name** is *our* schema decision, driven mainly by
  **size/stability**: small, stable lists are inlined as an `enum`; large lists
  carry only the `codeList` marker ("reference by name" — the UI picker and the
  Schematron/CVA supply and check the values). Today the generator uses a size
  gate (`MAX_INLINE_ENUM = 60`); the governance registry proposes replacing that
  with an explicit per-list `inlineEnum` flag.
- **Schematron validation** is the *standard's* decision (we read it from the
  CVA), independent of inlining. A list can be validated-and-inlined,
  validated-and-referenced, or unvalidated-and-inlined — all occur.

The one real coupling is the **marker**: an inlined enum carries
`$codelistEnumIsImplementerChoice: true` **iff** the list is *not*
Schematron-validated (the values are our suggestion). A validated+inlined list is
inlined for convenience but its values are enforced, so the marker is **false**.

**Current state:**

| Field | Codelist | Size | Our schema | Schematron | Implementer-choice marker |
|---|---|---|---|---|---|
| Section A `type` | `docrefcontent-type` | 10 | enum ✅ | ✅ | false (validated) |
| Section B `scheme` | `eoid-type` | 5 | enum ✅ | ✅ | false (validated) |
| `CODE_BOOLEAN` | `boolean-gui-control-type` | 6 | enum ✅ | ❌ (by design) | **true** |
| per-leaf `CODE` (C34) | `financial-ratio-type` | 40 | enum ✅ | ❌ (by design) | **true** |
| per-leaf `CODE` (C25) | `occupation` | 4046 | by name | ✅ (scoped to C25) | — |
| Section B `country`, `CODE_COUNTRY` | `country` | 341 | by name | ✅ | — |
| `AMOUNT` currency | `currency` | 290 | by name | ✅ | — |
| Section C `procedureType` | `procurement-procedure-type` | — | by name | ❌ (not shipped — X1) | — |

The ❌ for `boolean-gui-control-type` / `financial-ratio-type` is **intentional**,
not a gap: they are shipped-but-not-validated suggestion lists (see the governance
page and the superseded CVA1). A sync test keeps each inlined enum aligned with
its `.gc`.

**RESOLVED — no remaining enum-derivation work.** The former remaining
candidate, `eo-role-type`, is now in the governance registry (shipped, validated,
inlined — marker false) and used by OT59 (`ot-group-participation`) and OT63;
`economic-operator-size` likewise. Every code-valued field that needs a derived
enum has one, and the sync tests keep each inlined enum aligned with its `.gc`.

---

## Codelist validation & presentation — to resolve later

### CVA1. ~~Add `financial-ratio-type` and `boolean-gui-control-type` to the CVA~~ — SUPERSEDED

> **Superseded by [`codelist-governance.md`](./codelist-governance.md).** This
> item originally proposed *adding* these two lists to the Schematron/CVA. The
> team's governance model makes clear that would be **wrong**: both are
> deliberately **shipped-but-not-Schematron-validated** — the stated meaning is
> *"we suggest these values, but implementers may use others."* Validating them
> would convert a suggestion into a hard interop constraint and reject other
> implementations' legitimate values.
>
> **Resolution: won't do.** Keep both unvalidated at the XML layer. Our inlined
> enums carry `$codelistEnumIsImplementerChoice: true` precisely to record that
> they are our suggested pick list, not an enforced set. Reopen only if the team
> deliberately decides these lists should become authoritative (which also ties
> to M1 — whether `boolean-gui-control-type` belongs in the data model at all).

The earlier observation that these were "missing from the CVA" was a
misreading: their absence is intentional, not a gap. (The CVA's own
*"Missing from this list"* comment on `BooleanGUIControlType.gc` is, under this
model, better read as an unresolved authoring note than a confirmed TODO.)

One genuinely separate CVA item remains (NOT about these two suggestion lists):
`cbc:ResponseCode` carrying `eo-role-type` is unvalidated, which is how the
Response BASE sample ends up with a `dummy-value` role code — see X2. That is a
real gap for an *authoritative* list (`eo-role-type` is Schematron-validated
elsewhere), unlike the two suggestion lists here.

### UX1. PARTLY RESOLVED — codelist service DATA is built; the UI control is still a front-end task

**Update (data layer done).** The codelist **service data** is now generated:
`model/codelists/build-codelist-service-data.mjs` reads every governance list
with `shipped && useForUI` and emits `model/generated/codelists/<name>.json`
(`{ codelist, listId, source, count, languages, codes:[{code, labels}] }`) plus
an `index.json`, derived from the same shipped `.gc` files as the inlined enums
(so they cannot drift). 11 lists, 12,941 codes. EU authority lists carry the full
24-language label set (`labels.{eng,fra,bul,…}`); ESPD-internal lists
(`financial-ratio-type`, `eoid-type`, `boolean-gui-control-type`) fall back to
English-only. Wired into `model:compile`; 9 tests in
`build-codelist-service-data.test.mjs`.

**Still open (front-end):** actually *rendering* the pickers — matching the
control to list size (radio / select / typeahead / search-as-you-type), showing
locale labels while storing the bare code, and the ESCO hierarchy browse for
`occupation`. That is UI/service work in the app layer; this item provided the
data it consumes.

**Data-quality note surfaced while building:** the `language` list is 8187 codes
of which ~7054 have NO label in the source `.gc` (neither `eng_label` nor
`Name`). It is `useForUI: true` in governance only as a speculative "REVIEW"
default and no modelled field uses it. Before any UI consumes `language`, revisit
whether it should be `useForUI` at all, or filtered to the labelled subset. The
build emits it faithfully (codes are valid even when unlabelled); the tests
assert full English labelling only on the small curated lists and >95% on
country/currency, not on `language`.

**Original design (for the front-end work that remains):**

How should the UI give users good values to pick from — especially for the large
lists (`occupation` 4046, `country` 341, `currency` 290) that we deliberately do
**not** inline as enums?

The JSON Schema is the wrong place to feed a picker: a 4046-entry enum would
bloat every schema, is unreadable in diffs, and still goes stale. The right
design is a **runtime codelist service**, decoupled from the schema:

- **Ship the `.gc` codes as UI-consumable JSON.** The codelist export already
  emits `codelists.json` metadata; extend it (or add a build step) to emit, per
  codelist, a `{ code, labels }` list the front-end loads on demand. The `.gc`
  files carry **multilingual labels** (24 languages), so a picker can show
  "Belgium" / "Belgique" / "België" by locale rather than the raw code `BEL`.
- **The field already names the list.** The instance schema carries `$codelist`
  and the form lens carries `codelist` + `uiType: "code"`. The UI reads the list
  name from the field and fetches *that* list from the service. This is exactly
  why "reference by name" is the right move for large lists: the name is the key
  the UI resolves against the service; the values never need to live in the
  schema.
- **Match the control to the list size:**

  | List | Size | Control |
  |---|---|---|
  | `boolean-gui-control-type` | 6 | radio group / plain select |
  | `financial-ratio-type` | 40 | plain select (optionally grouped) |
  | `currency` | ~290 | searchable / typeahead combobox |
  | `country` | 341 | searchable / typeahead combobox |
  | `occupation` | 4046 | search-as-you-type, service-backed; expose the ESCO hierarchy for browsing |

- **Labels, not codes, in the UI.** Users pick "Belgium", the model stores `BEL`.
  The code↔label mapping is the codelist service's job, so the stored instance
  stays code-only (what the XML needs) while the UI stays human-friendly.

**Division of responsibility that falls out of this:**

| Concern | Where |
|---|---|
| validation | schema (inline enum for small lists; name-reference for large) + Schematron/CVA |
| picker data (codes + labels + locale) | codelist service, built from the `.gc` |
| which control, which list | form-structure lens (`uiType`, `codelist`) |

The `.gc` is the single source for both the inlined enum and the service data, so
they cannot drift from each other.

---

## Mapping engine

### E1. RESOLVED — XML mapping of a repeatable group nested directly inside another repeatable group

**Update (resolved).** The one remaining case below is now implemented and
tested. `generate-response-mapping.mjs` nests containers: an inner repeatable
group whose instance path extends a parent container's path (same side) becomes
a `childRecords` entry on the parent's `forEach` records rule, with an
item-relative `forEach` (e.g. `recipients`) — rather than the former broken
top-level sibling rule. `mapper.mjs` emits each item's `childRecords` as flat
`cac:TenderingCriterionResponse` siblings interleaved after that item's own
records (matching the authoritative `ESPD-Response-YearlyTurnoverMultyPeriod.xml`
ordering), and on import runs a two-level document-order state machine — parent
and child key sets are disjoint, so each child record attaches to the current
parent item and splits into its own sub-array by key reappearance. C37/C38/C39
`references[].recipients[]` now round-trip exactly (deep-equal, including a
reference that has no recipients staying recipient-less); 3 tests added in
`probe-nested-arrays.test.mjs`. The original assessment is retained below.

**What works today.** The mapping engine round-trips, on both request and
response sides:

- a **single-level** repeatable group — C01 `convictions[]` (response), C36
  `amountRequirements[]` (request);
- **nested** repeatable **requirement** groups — C34 `periods[].ratios[]`
  (request), via nested structure nodes;
- an **evidence array nested inside** a repeatable group — C34/C36, and C40/C41
  `technicians[]`/`bodies[]` each with a per-row `electronicEvidence.evidence[]`.
  This uses the document-level `cac:Evidence` set with a FLATTENED `forEach`
  (`container[].evidence`), so each row's evidence is collected correctly
  (verified: C40 round-trips exactly, nested per-technician evidence included).

**The remaining gap.** A repeatable **response** group whose rows each contain
**another repeatable group of plain fields** — i.e. a `forEach` that must emit,
inside each outer record, a *nested* `forEach` of repeated XML sub-records. The
one shape that hits this is the Part IV "references list" (**C37 / C38 / C39**):
`references[].recipients[]`. The outer `references[]` round-trips; the inner
`recipients[]` is **dropped** on `unmap` (verified: `recipients` comes back
`undefined` while the two parent `references` survive).

Note this is *different* from the evidence case: `electronicEvidence.evidence[]`
is handled by the document-level flattened evidence set, but `recipients[]` is an
ordinary repeated sub-group with no such document-level collector, so it needs
genuine nested-`forEach` emission.

**Where it lands.** `generate-response-mapping.mjs` must emit a nested `forEach`
inside the outer records rule's entries (item-relative, as the single-level rule
already is), and `mapper.mjs` `map`/`unmap` must recurse through a `forEach`
whose items are themselves `forEach` containers. The instance-data schema,
example, and form lens for C37/C38/C39 are already correct — this is purely the
XML round-trip for the nested sub-group.

**Impact.** C37/C38/C39 instance data validates, and their forms render, today;
only the XML mapping of the `recipients[]` sub-list is incomplete (the rest of
each criterion — lots, minimum references, requirement, fulfilled/relied-upon,
the reference rows themselves, evidence — maps fine). Low practical urgency
(recipients are optional contact details), but it is the last known
repeatable-group mapping case not yet covered.
