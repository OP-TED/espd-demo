# `generated/` — committed output (do NOT hand-edit)

Everything here is committed so the app can ship from files (GitHub Pages builds no model) and so
changes are reviewable in diffs. None of it is a source of truth. It has two origins.

## Vendored from the published model (`npm run model:sync`)

Copied verbatim from `ESPD-EDM/model`, after verifying it. Change the model upstream and re-sync.

- `instance-data/<key>.schema.json` and `<key>.example.json` — canonical instance-data JSON Schema and a minimal valid example per criterion
- `xml-mapping/<key>.request.mapping.json` and `<key>.response.mapping.json` — declarative UBL mapping specs (buyer Request / economic-operator Response)
- `compiled/<key>.json` — the criterion as joined from the EA structure and the enrichment, plus its hints; the form generator's input
- `parts/<part>/` — the administrative parts (I, II, VI): per section the instance-data schema, an example, the UBL mapping and the form (fields, input types, labels, code lists); `index.json` is the part manifest
- `registries/` — value types, encoding profile, codelist attributes, scheme-agency profile, roles, codelist governance, UI hints
- `compiled-model.json` — the manifest: ESPD/UBL versions, provenance hashes, inventory
- `structure.json` — a small projection (parts, sections, ordered members) of the structure export the model was verified against; drives the UI section layout

`<key>` is the criterion's output identity: its EA code, or `ot-<id>` for the Part II/V "other" criteria.

## Built by this app (`npm run model:compile`)

- `form-structure/<key>.form.json` — the presentation lens per criterion (from `compiled/` + `../model-sources/`)
- `ui/` — the UI bundle (`index.json`, `part-I..VI.json`, `roles.json`), composed JSON Schemas (`ui/schema/`) and the standalone Ajv validators (`ui/validators/`)
- `codelists/` — UI pick lists from the shipped code lists

## Regenerate

```
npm run model:sync       # vendor the published model (ESPD_EDM_ROOT, default ../ESPD-EDM)
npm run model:compile    # sync, then rebuild everything the app derives
```

## Related directories

- `../model-sources/` — this app's presentation inputs
- `../compiler/` — sync, build code and tests
