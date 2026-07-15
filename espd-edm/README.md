# ESPD-EDM Data Model

A structured representation of the full ESPD (European Single Procurement Document) standard form, split into manageable, self-contained files organized by concern.

## Structure

```
espd-edm/
├── index.json                     # Manifest linking all parts together
├── metadata.json                  # Version, title, legal basis, generation date
├── parts/
│   ├── part-I-procedure.json      # 3 sections — publication, procurer ID, procedure info
│   ├── part-II-operator.json      # 9 sections — general info, lots, representatives, SME, etc.
│   ├── part-III-exclusion.json    # 25 sections — criminal, tax, insolvency, conflicts, etc.
│   ├── part-IV-selection.json     # 30 sections — suitability, financial, technical capacity
│   ├── part-V-reduction.json      # 1 section — candidate reduction criteria
│   └── part-VI-concluding.json    # 4 sections — declarations + signature
└── schemas/
    └── datatypes.json             # 23 unique property datatypes extracted across all parts
```

## Design Rationale

The model is split along the natural Part boundaries (I–VI) defined by EU regulation (Commission Implementing Regulation (EU) 2016/7 and Directive 2014/24/EU), making it easier to:

- **Navigate**: Load only the part you're working on
- **Maintain**: Changes to exclusion grounds don't touch selection criteria
- **Diff/review**: Smaller files produce cleaner version control diffs
- **Lazy-load**: Tooling can load parts on demand via `index.json`

## Data Perspectives Encoded

Each part file encodes multiple perspectives simultaneously:

| Perspective | What it captures |
|---|---|
| **Form structure** | Hierarchical sections → question groups → questions → subgroups |
| **Workflow / roles** | `filledBy` declares whether Buyer or Economic Operator fills each part |
| **Data typing** | `propertydatatype` on each question (INDICATOR, AMOUNT, DATE, etc.) |
| **Path addressing** | `requestpath`, `responsepath`, `contentpath` for XML serialization mapping |
| **Legal content** | Criteria text mapping directly to EU Directive 2014/24/EU |
| **Structural metadata** | `tag`, `type`, `uuid`, `code`, `cardinality` for classification |
| **Conditional logic** | Subgroup codes (ONTRUE, ONFALSE, ON*) for form branching |

## Part File Shape

Each part file follows the same structure:

```json
{
  "part": "III",
  "title": "Exclusion grounds",
  "description": "...",
  "filledBy": {
    "request": "...",
    "response": "..."
  },
  "sections": [ ... ]
}
```

## Datatypes

The `schemas/datatypes.json` file lists all 23 unique property datatypes used across the model:

`AMOUNT`, `CODE`, `CODE_BOOLEAN`, `CODE_COUNTRY`, `DATE`, `DESCRIPTION`, `ECONOMIC_OPERATOR_IDENTIFIER`, `EVIDENCE_IDENTIFIER`, `IDENTIFIER`, `INDICATOR`, `LOT_IDENTIFIER`, `MINIMUM_AMOUNT`, `MINIMUM_QUANTITY`, `MINIMUM_QUANTITY_INTEGER`, `MINIMUM_QUANTITY_YEAR`, `NONE`, `PERCENTAGE`, `PERIOD`, `QUAL_IDENTIFIER`, `QUANTITY`, `QUANTITY_INTEGER`, `QUANTITY_YEAR`, `URL`

## Legal Basis

This model implements the ESPD standard form as defined by Commission Implementing Regulation (EU) 2016/7, establishing the standard form for the European Single Procurement Document under Directive 2014/24/EU.
