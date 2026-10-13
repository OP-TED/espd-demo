# Part II — Information concerning the economic operator

**Part II is a hybrid**, unlike Part I. It mixes two kinds of content that are
handled by two different tracks:

- **Administrative blocks** (`type: INFORMATION`) — the economic operator's
  identity and its representatives. These are UBL party aggregates, modelled
  **here** in `model/parts/partII/`. **Status: both modelled (22 tests).**
- **Criteria** (`type: CRITERION`, `code: "OT"`) — six `OT*` tendering criteria
  embedded in Part II. These are compiler territory (`model/compiler/` + a
  sidecar each), **NOT** modelled here. **Status: not yet modelled** — see
  "Criteria track" below.

This split is why the earlier criterion coverage scan undercounted: the `OT*`
criteria use `code: "OT"`, not the `exg-`/`slc-` prefixes the scan filtered on.

## Administrative track (modelled here)

| Section | EA | What we model | UBL target | Doc |
|---|---|---|---|---|
| **A** economic operator | `I71 info-eo` → `EconomicOperatorParty/Party` | `role`, `name`, `size`, `country`, `identifier{value, schemeAgency}` | `cac:EconomicOperatorParty` (RESPONSE) | `sectionA.*` |
| **B** power of attorney | `I72 info-poa` → `PowerOfAttorney/AgentParty` | `powersOfAttorney[]{ description?, agent{name, identifier?, country?} }` | `cac:EconomicOperatorParty/cac:Party/cac:PowerOfAttorney` | `sectionB.*` |

### Section A — grounded in Schematron (BR-RESP-10, all error-level)
Every field is mandated: `role` (10-02/03), `identifier` (10-04), `name`
(10-05), `size` (10-06), `country` (10-07). Codelists: `eo-role-type` (5) and
`economic-operator-size` (5) are small+validated, so **inlined** as enums
(marker false — validated); `country` (341) is referenced by name. See
`docs/codelist-governance.md`.

### Section B — NOT grounded (caveat)
No Schematron rule and no `ESPD-Request/Response-BASE.xml` instance constrain or
exemplify `PowerOfAttorney`/`AgentParty`. The shape is derived from the EA `I72`
model and UBL 2.4 `PowerOfAttorneyType` (`Description` optional, `AgentParty`
mandatory). Fields are modelled as what UBL allows, all optional except an agent
`name`. **REVIEW against a real instance** when one is available — the same
situation Part I §A was in before a sample was supplied.

## Criteria track (NOT modelled here — compiler work)

Six `OT*` criteria live in Part II, to be modelled as compiler sidecars like the
exclusion/selection criteria:

| Section | Tag | Subject | Notable |
|---|---|---|---|
| A | `OT65` | SME size (employees, turnover) | QUANTITY_INTEGER + AMOUNT |
| A | `OT57` | reserved-procurement participation | PERCENTAGE |
| A | `OT58` | registration on an official list | deep 5-level nested conditional tree |
| A | `OT59` | participating as a group | uses the `eo-role-type` CODE list |
| C | `OT60` | relying on other entities' capacities | ECONOMIC_OPERATOR_IDENTIFIER |
| D | `OT61` | subcontracting | ECONOMIC_OPERATOR_IDENTIFIER |

These should be batched into the criterion waves (they reuse the compiler and
would exercise the `eo-role-type` enum via `OT59`). Part V also has an `OT`
criterion (`staff-red`); the whole-model criterion count should be recomputed
with an `OT`-inclusive filter.

## Deferred (administrative, optional — in `docs/improvement-ideas.md`)

- Section A optional party fields the EA model carries but no Schematron rule
  requires: postal address (street/city/zone/building), contact
  (name/phone/email/fax), `WebsiteURI`, and the `QualifyingParty` /
  `IndustryClassificationCode` sub-party. (Same category as Part I B2.)
- Section B optional agent address/contact fields.

## Upstream data-quality nits (logged as M2)

- `I71 info-eo` description reads `"I70_info-eo"` (wrong section ref).
- `cbc:Electronicmail` (I71) and `cbc:ElectronicaMail` (I72) — two misspellings
  of `cbc:ElectronicMail`. No impact on us (we map the correct element).
