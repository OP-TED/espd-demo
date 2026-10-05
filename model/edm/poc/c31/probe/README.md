# C31 probe — espd-edm.json stays as-is, sidecar-only enrichment

This probe experiments with the **leaner POC design** agreed with the maintainer:

- **`espd-edm.json` stays as-is** (full EA structure, not leanified). It remains the
  structural source of truth and may later be *enhanced* (e.g. with semantic IDs),
  but is not replaced by a lean per-criterion source.
- **No `node-kinds.json`.** Because the structure is already in full EA form,
  there is nothing to re-inflate: `type`, `code`, `requestpath`, `responsepath`,
  `contentpath`, `propertydatatype`, `cardinality` are already present per node.
- **No fragments.** The three electronic-evidence branches are already expanded
  in `espd-edm.json`; there is nothing to de-duplicate at author time.
- **Semantic IDs live in a sidecar** (`id-map.json`), keyed by EA correlation path.
  This keeps `espd-edm.json` untouched for now; embedding IDs into `espd-edm.json`
  is a later proposal to colleagues.

## What stays from the original POC

- The value-type registry (`../value-types.json`) — shared external bindings.
- Instance bindings (`../source/bindings/instance-data/...`) — implementation
  projection keyed by semantic ID.

## Artifacts the probe reads

- Structure (as-is): `espd-tools/EAtoJSON/outputs/espd-edm.json`
- Semantic-ID + instance-binding sidecar: `id-map.json` (this folder)
- Value-type registry: `../value-types.json`

## Artifacts the probe writes (to `--outdir`, default `./out`)

- `c31.compiled.json` — the enriched compiled criterion (EA structure + ids + bindings)
- `c31.request.mapping.json` — generated request mapping spec
- `c31.response.mapping.json` — generated response mapping spec

## Run

From the repository root:

```sh
node model/edm/poc/c31/probe/compile-probe.mjs
```
