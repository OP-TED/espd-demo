# Keeping `espd-edm.json` as the Primary Input

## Conclusion

The current EA-generated `espd-edm.json` can remain the authoritative
structural input, but it cannot be the sole input for the complete compiled
model. It must be joined with semantic enrichment, instance projections and
shared registries:

```text
espd-edm.json                  EA structure
        +
semantic-ID enrichment        stable business identity
        +
instance binding              reference-implementation JSON projection
        +
value-type registry           shapes and XML representation
        |
        v
compiled ESPD model
```

This information does not all need to be inserted directly into the generated
file. Sidecar sources are preferable where the information belongs to a
specific implementation or projection.

Strictly speaking, shared value types, provenance, artifact format and artifact
version belong to the compiled-model envelope. Each compiled criterion only
references those shared definitions.

## What is inferable and what is new

| Compiled information | Inferable from `espd-edm.json`? | Nature |
|---|---:|---|
| Criterion `id` equal to criterion `code` | Yes | Safe convention |
| Component semantic IDs | Not reliably | New semantic identity |
| `instanceModel` | No | New projection decision |
| `instanceBinding` | No | New projection decision |
| Value-type code used by a component | Yes | Already present as `propertydatatype` |
| Complete permitted value-type list | Not completely | Comes from `ResponseDataType.gc` |
| Value-type description and status | No | Comes from `ResponseDataType.gc` |
| JSON instance shape | No | New model/profile decision |
| Request/response XML representation | Partly | Recoverable from mappings and conventions, but not declared in the export |
| ResponseDataType provenance | From Genericode | Build metadata |
| Artifact format and version | No | Compiler-contract metadata |
| `requestpath` | Already present | Existing structural data |
| `responsepath` and `contentpath` | Mostly | Shared derivation convention |

## Semantic IDs are real new information

For a criterion, the model can safely default:

```text
id = code
```

For components, generating an identifier from an EA path would not provide a
stable semantic identity. The path:

```text
C31_slc-stand-to-spec-avg/RG1/RSG1/RQ3
```

changes when the hierarchy or tags change. The semantic ID:

```text
slc-stand-to-spec-avg.minimum-amount
```

expresses a model-maintainer decision that the node represents the concept
“minimum amount.” That decision cannot be inferred robustly from a tag,
description and datatype. A tool may suggest an ID from a description, but a
maintainer must approve and preserve it; wording corrections must not rename
the concept.

The complete assignment policy is documented in
[Semantic Identifiers in the ESPD EDM](espd-edm-semantic-identifiers.md).

## Instance bindings are real new information

The original export does not say that C31 should live at:

```text
partIV.selectionCriteria.slc-stand-to-spec-avg
```

or that `RQ3` maps to:

```text
requirement.minimumAmount
```

Those are decisions made by this reference implementation's JSON instance
model. Another implementation could use a different projection without
changing the underlying ESPD criterion.

The bindings are essential for generating this project's mappings and JSON
Schema, but they are not intrinsic ESPD criterion structure. They therefore
belong in a separate instance-projection file keyed by stable semantic IDs.

## Value-type references versus definitions

The original export already states which value-type code applies:

```json
{
  "propertydatatype": "MINIMUM_AMOUNT"
}
```

It does not define the corresponding instance shape:

```json
{
  "type": "object",
  "properties": {
    "value": { "type": "number" },
    "currency": { "type": "string" }
  }
}
```

Nor does it declare that the request representation uses
`cbc:MinimumAmount`, takes element text from `value`, and takes `currencyID`
from `currency`.

The permitted code and published description come from
`ESPD-EDM/codelists/ResponseDataType.gc`. JSON shapes and UBL representations
are additional profile decisions grounded in UBL and the existing mappings.
They are essential if the model is to generate JSON Schema and XML mappings.

## Derived information and compiler metadata

Some enrichment does not add business meaning:

- `responsepath` and `contentpath` can usually be derived from the request path
  and the shared node-kind convention;
- repeated `QUESTION`, `REQUIREMENT` and `ON*` codes can be expanded from node
  kinds; and
- artifact format/version let consumers recognize the compiled contract.

For example:

```json
{
  "format": "espd-edm-compiled",
  "formatVersion": "0.1.0"
}
```

does not change the meaning of C31. Likewise, recording
`ResponseDataType` version `5.0.0` is provenance rather than criterion
semantics.

## Recommended ownership

If `espd-edm.json` remains primary, divide responsibility as follows:

- Keep intrinsic reusable ESPD information upstream where practical:
  - stable semantic IDs;
  - value-type references;
  - criterion identity and structure;
  - cardinality and conditional semantics.
- Keep implementation-specific projections in sidecars:
  - JSON `instanceModel`;
  - component `instanceBinding`;
  - form and UI bindings.
- Keep shared external definitions in registries:
  - `ResponseDataType.gc`;
  - other code lists; and
  - UBL representation conventions.

The resulting build remains:

```text
EA / EAtoJSON
      |
      v
espd-edm.json
      |
      + semantic IDs
      + instance-data bindings
      + ResponseDataType.gc
      + value-shape/XML conventions
      |
      v
compiled espd-edm
```

Some enrichment is derivable normalization, but the most important additions—
component semantic IDs and instance projections—are real information that must
be intentionally authored and maintained.

## Candidates for moving upstream

Implementing the compiler surfaced specific pieces of information that are
currently authored in sidecars or registries but are **intrinsic ESPD
semantics** — they would be the same for any implementation consuming the model.
Applying the ownership rule above, these are candidates to carry upstream (an EA
tagged value exported into `espd-edm.json`, or a `ResponseDataType.gc` facet) so
they stop being authored per criterion. Each is cross-referenced to the compiler
task that documents the detail.

### Strong candidates (intrinsic, hand-authored today)

| Item | Lives now | How to move upstream | Retires |
|---|---|---|---|
| Per-property codelist for `CODE` (occupation / financial-ratio-type / eo-role-type) | sidecar leaf `codelist` | Populate the EA `cbc::CodeListID` tagged value — the exporter already reads it in `espd-tools/EAtoJSON/export-package.js` (`buildStandardFields`), it is simply unset today | the per-leaf `codelist` entries |
| Per-property value bound (e.g. "number of fiscal years" minimum 1) | `sources/<criterion>.hints.json` | New EA tagged value exported as a per-property `valuebounds` field. Must be per property — `QUANTITY_YEAR` is reused for a count, a calendar year, and a duration, so a single datatype-wide bound is wrong | the `minimum` hint |
| Datatype-wide facets (`QUANTITY_YEAR` non-negative; `PERIOD` needs at least one of start/end) | value-type registry `instanceConstraints` | Extra columns on `ResponseDataType.gc` (e.g. `minInclusive`) | datatype-level constraints |

The codelist case is the cleanest first step: the export plumbing already
exists, so it is an EA data change plus a compiler preference for the export
value, with the sidecar entry kept only as a fallback.

### Medium candidates (reduce ambiguity)

- **Repeatable-group intent.** EA cardinality `0..n`/`1..n` on a group conflates
  two different things: a genuine data array (convictions, periods, ratios) and
  per-lot scoping (the selection-criterion `RG1`). An explicit upstream marker
  would let the compiler decide "array vs flatten" without a per-criterion human
  judgment; today that decision is encoded as `repeatable: true` in the sidecar.
- **Overloaded `QUANTITY_YEAR`.** Splitting it into distinct datatypes
  (count / calendar year / duration) is a model-quality fix that would make the
  datatype facets above work cleanly. This is a breaking code-list change and
  should be raised on its own.

### Not candidates — implementation projections (keep in sidecars)

Consistent with "Recommended ownership", these are reference-implementation
decisions, not intrinsic ESPD structure, and must NOT move upstream:

- semantic IDs (a maintainer decision; not robustly inferable from a tag);
- `instanceModel` / `instanceBinding`, including the array names a repeatable
  group projects to (`periods`, `ratios`, `amountRequirements`);
- `uiType`, i18n label/title keys, and form grouping / group display names;
- lot flattening — lots are a document-level mechanism (one Request per
  procedure, one Response per lot), so the per-lot `RG1` is a projection choice,
  not an in-criterion array.
