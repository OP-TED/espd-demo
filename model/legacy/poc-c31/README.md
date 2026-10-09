# C31 authoritative-model proof of concept

This proof of concept enriches criterion `slc-stand-to-spec-avg` (C31) with
stable semantic IDs, criterion-level instance-model placement, and relative
component bindings while leaving the EA-generated source untouched.

It now contains two stages of the experiment:

1. `compile.mjs` overlays semantic metadata onto the original EA structure.
2. `compile-lean.mjs` starts from a lean maintained C31 source, expands shared
   conventions/fragments, and proves that the result preserves the original EA
   structure exactly.

The criterion placement uses a `containerPath` array. `selectionCriteria` is a
keyed object container, not an array; the criterion's `code` selects its entry.

## Inputs and outputs

- Structural input: `../../../../../espd-tools/EAtoJSON/outputs/espd-edm.json`
- Maintained enrichment: `semantic-enrichment.json`
- Shared value-type definitions: `value-types.json`
- Original-source enrichment and coverage check: `compile.mjs`
- Lean maintained criterion:
  `source/criteria/slc-stand-to-spec-avg.json`
- Semantic-ID-keyed instance projection:
  `source/bindings/instance-data/slc-stand-to-spec-avg.json`
- Shared node encodings: `source/node-kinds.json`
- Reusable evidence branch:
  `source/fragments/electronic-evidence.json`
- Lean compiler and exact-equivalence check: `compile-lean.mjs`
- Compiled C31: written to stdout, or to the path passed with `--out`

The generated `requestpath` remains the correlation key used to apply this
first overlay. It is deliberately not used as the semantic ID: paths and EA
tags can change while IDs should continue to identify the same business value.

## Run

From the repository root:

```sh
node model/legacy/poc-c31/compile.mjs > /tmp/c31.enriched.json
node model/legacy/poc-c31/compile-lean.mjs > /tmp/c31.lean.json
```

The compiler fails when the source criterion is missing, an overlay path no
longer exists, IDs are duplicated, a C31 requirement/question lacks enrichment,
or a composed binding path does not exist in `part-IV.schema.json`.

`ESPD-EDM/codelists/ResponseDataType.gc` is the leading source of truth for
which response data-type codes exist, their status, and their descriptions.
The POC registry adds the instance-data shape and request/response UBL binding
needed by generators. The compiler checks every C31 `propertydatatype` against
both sources.

## Lean-source proof

The lean criterion contains only core criterion facts: identity, ordered
hierarchy, cardinalities, descriptions and value-type references. It does not
maintain instance-model placement or paths, `requestpath`, `responsepath`,
`contentpath`, EA `type`/`code` duplication, placeholder
legislation/subcriterion content, or three copies of the electronic-evidence
branch.

The reference implementation's JSON projection is maintained separately under
`source/bindings/instance-data/`. Its criterion-level `instanceModel` and all 17
component paths are joined to the core model by stable semantic ID. It contains
no EA `requestpath` keys.

`node-kinds.json` defines once how requirements, questions and groups expand to
the current EA vocabulary and how value paths are derived. The
`electronic-evidence` fragment is instantiated three times with different tags,
cardinalities and IDs. Its instance paths come from the separate binding file.

`compile-lean.mjs`:

1. expands fragment uses;
2. applies the shared node-kind conventions;
3. derives all request, response and content paths;
4. restores the current EA compatibility fields;
5. joins criterion placement and relative instance bindings by semantic ID;
6. compares the EA-compatible projection with the original generated C31 using
   deep structural equality; and
7. compares all semantic IDs and bindings with the separately validated
   `semantic-enrichment.json` overlay.

The maintained core C31 criterion is about 6.8 KB versus about 16 KB for the
pretty-printed original C31. Its separate instance binding is about 2.3 KB. The
shared convention and fragment files add about 2.7 KB for this one-criterion
POC and are intended to be amortized across every criterion.

This directory is intentionally a POC. The next production step is to extract
generic compiler modules and apply the same source format to another criterion,
not to copy criterion-specific compiler code.
