# Codelist governance in this app

The axes of codelist governance (shipped, Schematron-validated, inlined as an enum), the team's per-list
decisions and what is checked where are described upstream, next to the registry they explain:
`espd-conceptual-model/enrichment/docs/codelist-governance.md`. The registry itself,
`codelist-governance.json`, is published with the model (`ESPD-EDM/model/registries`) and vendored here
under `model/generated/registries/` by `npm run model:sync`. Do not copy the decisions into this repository.

This page only records what the app adds.

## What is this app's own

One decision: **whether the app offers a list as a UI pick list** (`useForUI`). It is in
`model/codelists/ui-codelists.json`, one explicit entry per list of the published registry.

`model/codelists/governance.mjs` merges the two (`loadGovernance()`), so the rest of the app reads one
entry per list: `{ shipped, schematronValidated, useForUI, inlineEnum, gc?, aliases?, excludedCodes?,
externalSource? }`. `shipped` is derived: a list is shipped when the registry names its `.gc`. The merge is
strict: a list in the registry without a UI decision, or the reverse, is an error, so a list added upstream
cannot silently get a default.

## What the app does with it

- **Pick lists.** `model/codelists/build-codelist-service-data.mjs` emits the codelist service data for
  every list that is shipped and `useForUI`, from the shipped `.gc` files, English labels only. Codes in a
  list's `excludedCodes` are left out. A list that is not shipped (`procurement-procedure-type`) has no
  `.gc` to read, so it is not emitted.
- **Coverage report.** `docs/coverage-report.md` has a "Codelists (governance)" table built from the merged
  entries.
- **Tests.** `model/codelists/governance.test.mjs` checks the merge and that every offered list has its
  `.gc`. The consistency of the registry with the shipped files and the Schematron is tested upstream
  (`espd-tools/model-compiler/codelist-governance.test.mjs`), and the enums of the administrative parts by
  `espd-tools/model-compiler/parts-codelists.test.mjs`.
