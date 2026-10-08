# `legacy/` — pre-compiler hand-authored artifacts

These are the original, hand-authored model files that predate the compiler:
per-part XML mappings, instance-data schemas/examples, and form-structure lenses.

They are kept for ONE reason: the compiler's tests compare generated output
against them to prove the compiler faithfully reproduces the hand-authored model
(e.g. C01 → `form-structure/part-III.form.json`, C31 → `instance-data/part-IV.schema.json`).

Once the compiler fully reproduces a part's hand-authored artifacts, the
corresponding legacy files can be removed. Until then they are load-bearing
parity references — do not delete piecemeal without updating the tests that read
them.

New/compiled artifacts live in `../generated/`, authored inputs in
`../model-sources/`.
