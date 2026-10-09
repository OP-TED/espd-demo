# ESPD UBL Profile

This document describes how selected ESPD business concepts are represented in
the underlying UBL XML (the OASIS UBL 2.4 `QualificationApplicationRequest` /
`QualificationApplicationResponse` documents). It exists so contributors
understand *where* each concept lives in the XML tree, *which* elements the
ESPD-EDM actually uses, and *what* validation rules apply — not just the abstract
form questions.

Paths are given relative to the document root unless stated otherwise. Namespace
prefixes follow UBL convention:

- `cac:` — `urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2`
- `cbc:` — `urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2`

## Economic Operator Party

The economic operator is represented by `cac:EconomicOperatorParty`, a child of
the response document root. Its main identity and contact data sit under
`cac:EconomicOperatorParty/cac:Party` (name, identifier, postal address, contact,
website). Representatives of the economic operator are modeled in two related but
distinct ways:

- as `cac:Person` elements directly under `cac:EconomicOperatorParty/cac:Party`
  (the representatives captured by form group EO06), and
- as `cac:PowerOfAttorney` elements, described below, when a formal mandate to
  represent the economic operator needs to be expressed.

### Power of Attorney

**Definition.** A `cac:PowerOfAttorney` represents an official or legal mandate
issued by an authority (for example an attorney or a notary) authorising a
natural person to represent the economic operator in a public procurement
procedure.

**Location.** Power of Attorney is attached to the economic operator's party:

```
/QualificationApplicationResponse
  └─ cac:EconomicOperatorParty
       └─ cac:Party
            └─ cac:PowerOfAttorney            [0..n]
```

A single `cac:Party` may carry multiple `cac:PowerOfAttorney` elements
(cardinality `0..n`), one per mandated representative.

**Type structure (`PowerOfAttorneyType`).** The UBL type provides the following
elements, in document order:

| Element | Card | Description |
|---|---|---|
| `cbc:ID` | 0..1 | Identifier for this power of attorney. |
| `cbc:IssueDate` | 0..1 | Date on which it was issued. |
| `cbc:IssueTime` | 0..1 | Time at which it was issued. |
| `cbc:Description` | 0..n | Free text describing the representative's role and the details of the representation. |
| `cac:NotaryParty` | 0..1 | The party notarizing the power of attorney. |
| `cac:AgentParty` | **1** | The party acting as agent/representative on behalf of the economic operator (mandatory). |
| `cac:WitnessParty` | 0..n | Witness parties. |
| `cac:MandateDocumentReference` | 0..n | Reference to a mandate document (e.g. a register where the mandate is recorded). |

**What the ESPD-EDM actually uses.** In practice the ESPD-EDM relies on a small
subset. The natural person representing the economic operator is carried in
`cac:AgentParty/cac:Person`. The expected elements (paths relative to
`cac:PowerOfAttorney`) are:

| Path | Card | Purpose |
|---|---|---|
| `cac:AgentParty/cac:Person/cbc:FirstName` | **1** | First name of the natural person. |
| `cac:AgentParty/cac:Person/cbc:FamilyName` | **1** | Family name of the natural person. |
| `cac:AgentParty/cac:Person/cbc:BirthDate` | 0..1 | Date of birth. |
| `cac:AgentParty/cac:Person/cbc:BirthplaceName` | 0..1 | Place of birth. |
| `cac:AgentParty/cac:Person/cac:ResidenceAddress/cac:AddressLine` | 0..1 | Street name and number (one line). See the data-protection note below. |
| `cac:AgentParty/cac:Person/cac:ResidenceAddress/cbc:PostalZone` | 0..1 | Post code / ZIP. |
| `cac:AgentParty/cac:Person/cac:ResidenceAddress/cbc:CityName` | 0..1 | City. |
| `cac:AgentParty/cac:Person/cac:ResidenceAddress/cac:Country/cbc:IdentificationCode` | **1** | Country code (Country codelist). |
| `cac:AgentParty/cac:Person/cac:ResidenceAddress/cac:Country/cbc:Name` | 0..1 | Country name (prefer the Country codelist name, in the user's language). |
| `cac:AgentParty/cac:Person/cac:Contact/cbc:ElectronicMail` | 0..1 | E-mail address of the contact point. |
| `cac:AgentParty/cac:Person/cac:Contact/cbc:Telephone` | 0..1 | Telephone number of the contact point. |
| `cbc:Description` | 0..n | Short description of the representative's role and other details of the representation. |

The two elements most likely to be needed beyond the person's identity are:

- **Place of registration of the representative** — complementary to place of
  birth, elements such as `cac:Person/cac:IdentityDocumentReference` (e.g. a
  residence certificate), `cac:Person/cbc:NationalityID`, and/or
  `cac:Person/cbc:CitizenshipCountry` can be used.
- **Proof of an authentic mandate** — a reference to the register or document
  demonstrating the mandate, via
  `cac:PowerOfAttorney/cac:MandateDocumentReference`.

> **Data protection.** Specifying the residence address of a natural person may
> conflict with applicable data-protection rules. Include address detail only
> when necessary and permitted.

**Validation rules (BR-RESP-20).** The following mandatory business rules are
enforced by Schematron (`ESPDResponse/sch/05-ESPD-resp-eo-br.sch`), each with
context `cac:PowerOfAttorney`:

| Rule | Requirement |
|---|---|
| BR-RESP-20-01 | `cac:AgentParty/cac:Person/cbc:FirstName` must always be provided. |
| BR-RESP-20-02 | `cac:AgentParty/cac:Person/cbc:FamilyName` must always be provided. |
| BR-RESP-20-03 | `cac:AgentParty/cac:Person/cac:ResidenceAddress/cac:Country/cbc:IdentificationCode` must always be provided. |

**Information architecture.** In the ESPD-EDM tooling this concept is the
information block **I72** (`info-poa`). Its hierarchy is:

```
I72_info-poa
  └─ EOP1  cac:EconomicOperatorParty
       └─ PAR1  cac:Party
            └─ POA1  cac:PowerOfAttorney            [0..n]
                 ├─ cbc:Description
                 └─ PAR1  cac:AgentParty            [1]
                      ├─ PI1   cac:PartyIdentification / cbc:ID
                      ├─ PN1   cac:PartyName / cbc:Name
                      ├─ PA1   cac:PostalAddress → CTR1 cac:Country
                      └─ CTC1  cac:Contact (e-mail, telephone, fax)
```

**Relationship to EO06 representatives.** The reference implementation currently
models EO06 representatives as `cac:Person` elements directly under
`cac:EconomicOperatorParty/cac:Party` (see
`model/legacy/xml-mapping/part-II.mapping.json`), not as `cac:PowerOfAttorney`. Power of
Attorney is the UBL construct for expressing a *formal mandate* for a
representative; the two share the same underlying person data
(`cac:Person`), so an implementation that needs to assert a mandate can move or
mirror that person data into `cac:PowerOfAttorney/cac:AgentParty/cac:Person`.

## Sources

- UBL 2.4 `PowerOfAttorneyType` — OASIS UBL Common Aggregate Components schema.
- Schematron business rules — `ESPDResponse/sch/05-ESPD-resp-eo-br.sch`
  (BR-RESP-20-01/02/03).
- ESPD-EDM information architecture — information block I72 (`info-poa`).
