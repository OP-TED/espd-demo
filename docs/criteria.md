# ESPD Criteria Structure

This document explains how ESPD criteria components are structured, how they define
dependencies and conditional logic, how they are rendered in the UI, and which parts
tend to be the most complicated to implement.

## Overview

The ESPD criterion model is a deeply nested tree. At the top level sits a **CRITERION**,
and inside it lives a recursive composition of groups, requirements, and questions. The
same building blocks repeat at every depth, which is what gives the model both its
flexibility and its complexity.

```
CRITERION (e.g. C07 "Breach of tax obligations")
├── SUBCRITERION            national-level sub-criteria (optional)
├── LEGISLATION             legal reference (0..n)
├── REQUIREMENT_GROUP (RG)  buyer-defined constraints
│   ├── REQUIREMENT (RQ)            values set by the buyer in the Request
│   ├── REQUIREMENT_SUBGROUP (RSG)  nested buyer constraints
│   └── QUESTION_SUBGROUP (QSG)     questions for the Economic Operator
│       ├── QUESTION (Q)                response fields
│       └── QUESTION_SUBGROUP (QSG)     nested conditional questions
└── QUESTION_GROUP (QG)     standalone question groups
    ├── QUESTION (Q)
    └── QUESTION_SUBGROUP (QSG)
```

## Node anatomy

Each node in the tree carries a common set of fields:

| Field | Meaning |
|-------|---------|
| `tag` | Local identifier within its parent (e.g. `RG1`, `QSG2`, `Q1`) |
| `type` | One of the element types (see below) |
| `cardinality` | How many instances are allowed: `1`, `0..1`, `1..n`, `0..n` |
| `code` | For groups: `ON*`, `ONTRUE`, `ONFALSE` (conditional logic). For leaves: `REQUIREMENT` or `QUESTION` |
| `propertydatatype` | For requirements/questions: the expected response data type |
| `requestpath` | Path of this node's value in the ESPD **Request** document |
| `responsepath` | Path of this node's value in the ESPD **Response** document |
| `contentpath` | Path to the actual content/value leaf |

### Element types

`CRITERION`, `SUBCRITERION`, `LEGISLATION`, `REQUIREMENT_GROUP`, `REQUIREMENT_SUBGROUP`,
`REQUIREMENT`, `QUESTION_GROUP`, `QUESTION_SUBGROUP`, `QUESTION`, plus presentational
types such as `CAPTION` and `ADDITIONAL_DESCRIPTION_LINE`.

## Requirements vs Questions (two audiences)

This is the key conceptual split.

- **Requirements** (`REQUIREMENT`, `REQUIREMENT_GROUP`, `REQUIREMENT_SUBGROUP`) are
  authored by the **Buyer** in the ESPD Request. They define thresholds, constraints,
  and context — for example "Minimum Amount Threshold", "Number of fiscal years", or
  "LOT Identifier". On the Economic Operator's side they are shown **read-only**; the EO
  does not fill them in.

- **Questions** (`QUESTION`, `QUESTION_GROUP`, `QUESTION_SUBGROUP`) are answered by the
  **Economic Operator** in the ESPD Response. These are the interactive form fields —
  "Your answer?", "Amount concerned", "Date of conviction", and so on.

The distinction is encoded three ways in the data:

1. **`type` / `code`** — `REQUIREMENT` vs `QUESTION` is the primary signal.
2. **`requestpath` vs `responsepath`** — a requirement's value originates in the Request
   (buyer). It still carries a `responsepath` because the requirement is echoed into the
   Response so that document is self-contained, but the EO does not author a new value
   there. A question's meaningful value only exists in the Response.
3. **`buyervalue` / `sellervalue`** — the schema defines optional fields to hold each
   side's data separately. In the structural model export these are empty; they get
   populated in filled Request/Response instances.

> Note: "Requirement = buyer only" is the correct general rule. Some requirements are
> purely informational (e.g. a free-text note), while others are functional constraints
> the EO's answer is evaluated against (e.g. a minimum amount threshold). In all cases
> the EO reads but does not author the requirement value.

## Response data types

Each question or requirement declares a `propertydatatype` that determines which UI
control is rendered:

| Type | UI widget |
|------|-----------|
| `INDICATOR` | Yes/No toggle (drives conditional logic) |
| `DESCRIPTION` | Free text input |
| `AMOUNT` | Numeric with currency |
| `DATE` | Date picker |
| `PERIOD` | Start date + end date |
| `URL` | URL input |
| `CODE_COUNTRY` | Country dropdown |
| `CODE` / `CODE_BOOLEAN` | Codelist selector |
| `QUANTITY_YEAR` | Numeric (years) |
| `PERCENTAGE` | Numeric (%) |
| `EVIDENCE_IDENTIFIER` | Reference to an evidence document |
| `LOT_IDENTIFIER` | Multi-lot selector |
| `ECONOMIC_OPERATOR_IDENTIFIER` | EO reference |

## Conditional logic — ON* / ONTRUE / ONFALSE

Dependencies between questions are expressed through the `code` property on groups.

- **`ON*`** — process the group always (shown unconditionally).
- **`ONTRUE`** — process the group only if the preceding `INDICATOR` question was answered **YES**.
- **`ONFALSE`** — process the group only if the preceding `INDICATOR` question was answered **NO**.

The "preceding question" is the first `QUESTION` of type `INDICATOR` in the **parent**
group. This produces branching decision trees:

```
QSG1 (code: "ON*")                       always show
├── Q1: "Your answer?" (INDICATOR)        yes/no toggle
├── QSG1 (code: "ONTRUE")                show if Q1 = YES
│   ├── Q1: "Country concerned"
│   ├── Q2: "Amount"
│   └── QSG1 (code: "ON*")
│       ├── Q1: "Established by other means?" (INDICATOR)
│       ├── QSG1 (code: "ONTRUE")        show if YES
│       │   └── Q1: "Describe which means"
│       └── QSG2 (code: "ONFALSE")       show if NO
│           ├── Q1: "Was decision final?" (INDICATOR)
│           └── QSG1 (code: "ONTRUE")
│               ├── Q1: "Date of conviction"
│               └── Q2: "Period of exclusion"
```

In the UI this maps directly to conditional rendering driven by the state of the
INDICATOR toggle (e.g. a `v-if` bound to the toggle's value).

## How the UI uses this

The service model defines parts (I through VI), each containing sections that reference
criteria. A rendering client:

1. Iterates over the criteria in each part/section.
2. Recursively walks each criterion's `components` tree.
3. Renders `REQUIREMENT` nodes as buyer-prefilled, read-only context.
4. Renders `QUESTION` nodes as interactive form fields based on `propertydatatype`.
5. Applies conditional visibility using the `code` property (`ON*`, `ONTRUE`, `ONFALSE`).
6. Handles `cardinality: "1..n"` / `"0..n"` by allowing repeating instances to be
   added and removed.

## Complications

1. **Deep nesting.** Some criteria reach six levels of nested subgroups. Each INDICATOR
   at any level can spawn its own conditional branches, so the renderer must track
   independent toggle state at every depth.
2. **Mixed ONTRUE + ONFALSE siblings.** A single INDICATOR can have both an ONTRUE and an
   ONFALSE sibling group — "show A if yes, show B if no" — requiring mutually exclusive
   branch handling.
3. **Requirements and questions in the same group.** Selection criteria mix buyer-set
   requirements with EO questions inside one structure, so the UI must clearly separate
   read-only context from editable fields.
4. **Cardinality `1..n` with nested conditionals.** When a `1..n` requirement (such as
   `LOT_IDENTIFIER`) repeats, the entire conditional structure beneath it repeats too,
   multiplying UI state.
5. **The "fulfil by itself" cascade.** Nearly every selection criterion includes a
   3-level pattern: "Does the EO fulfil the criteria by itself?" → ONFALSE → "Relied upon
   or not?" (INDICATOR) → ONTRUE → "Name of entity" + "ID of entity". This ONFALSE→ONTRUE
   chain inverts the default expectation and is a common source of rendering bugs.
6. **Path addressing.** `requestpath` / `responsepath` encode the tree position. Correct
   serialization and deserialization requires walking these paths accurately, especially
   once cardinality introduces repetition.

## The most complicated component

**C07 (`exg-pmt-bre-tax`) — "Breaching obligation relating to payment of taxes"** is the
most complex single criterion. It combines:

- A `REQUIREMENT_GROUP` with buyer-set thresholds (`MINIMUM_AMOUNT` and a `DESCRIPTION`
  "Additional Information" note).
- A first-level INDICATOR ("Your answer?") whose ONTRUE branch opens Country + Amount
  questions.
- A second INDICATOR ("Established by means other than a judicial decision?") that
  branches into:
  - **ONTRUE**: "Describe which means"
  - **ONFALSE**: another INDICATOR ("Was the decision final and binding?") → ONTRUE →
    Date + Period fields
  - **ON\***: "Has the EO fulfilled its obligations?" → ONTRUE → "Describe them"
- A separate top-level `QUESTION_GROUP` for electronic evidence availability.

This produces six levels of nesting with both ONTRUE and ONFALSE branches at the same
level, multiple INDICATOR-driven decision points, and a mix of requirements and
questions. It is essentially a legal decision tree mapped onto a form, making it the
hardest to render, validate, and serialize correctly.

**C29 (`slc-stand-to-gen`) — "General yearly turnover"** is a close second, combining the
lot-repetition pattern, buyer-defined thresholds (number of fiscal years, minimum amount,
per-year toggle), year-by-year amount entry, the "fulfil by itself" cascade, and an
evidence group — all within a single criterion.
