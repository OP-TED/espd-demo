# `legacy/` — pre-compiler artifacts and tooling

Everything here predates the compiler and is kept for parity/reference only.

- `xml-mapping/`, `instance-data/`, `form-structure/` — the original,
  hand-authored per-part model files (XML mappings, instance-data
  schemas/examples, form-structure lenses). The compiler's tests compare
  generated output against these to prove it faithfully reproduces the
  hand-authored model (e.g. C01 → `form-structure/part-III.form.json`,
  C31 → `instance-data/part-IV.schema.json`). `xml-mapping/` also holds the
  roundtrip/scaffold tests that exercise those specs through the mapping engine.

Once the compiler fully reproduces a part's hand-authored artifacts, the
corresponding legacy files can be removed. Until then the per-part files are
load-bearing parity references — do not delete piecemeal without updating the
tests that read them.

New/compiled artifacts live in `../generated/`, authored inputs in
`../model-sources/`.
