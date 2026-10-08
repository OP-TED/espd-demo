# `generated/` — compiler output (do NOT hand-edit)

Every file here is produced by the model compiler from the hand-authored inputs
in `../model-sources/`. It is committed so consumers can read the compiled
artifacts directly and so changes are reviewable in diffs — but it is **not a
source of truth**: edit the inputs and regenerate, never edit these files.

## Layout

- `instance-data/<code>.schema.json` — canonical instance-data JSON Schema per criterion
- `instance-data/<code>.example.json` — a minimal valid example that validates against the schema
- `form-structure/<code>.form.json` — the presentation lens per criterion
- `xml-mapping/<code>.request.mapping.json` — buyer (ESPD Request) mapping spec
- `xml-mapping/<code>.response.mapping.json` — economic-operator (ESPD Response) mapping spec

Files are per-CRITERION (keyed by criterion code), not per-part; per-part
assembly is a later build step (compiled-model envelope).

## Regenerate

```
node model/compiler/build-generated.mjs
```

This compiles every criterion that has a `.sidecar.json` in
`../model-sources/criteria/` and rewrites this directory.

## Related directories

- `../model-sources/` — hand-authored inputs (registries + per-criterion sidecars)
- `../legacy/` — the pre-compiler hand-authored artifacts, kept as a parity
  reference while the compiler is proven against them
- `../compiler/` — the compiler code and its tests
