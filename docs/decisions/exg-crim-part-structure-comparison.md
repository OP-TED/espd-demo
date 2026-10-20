# `exg-crim-part` — EA model vs e-Certis: structure comparison

A one-page example of how our EA model export and the e-Certis reference describe
the **same** criterion ("Participation in a criminal organisation", C01) with
**different** tree structures. This is why the exported UBL fails the ESPD
Schematron's criterion rules.

Both sources agree on the criterion itself: code `exg-crim-part`, UUID
`005eb9ed-1347-4ca3-bb29-9bc0db64e1ab`. They disagree on the property-group tree.

## Side by side (property-group / property ids)

```
e-Certis reference (ESPD-criterion.xml)        EA model export (espd-edm.json)
──────────────────────────────────────         ──────────────────────────────────
SBC1                     (national sub-crit.)   SBC1                  (EMPTY shell)
  SBC1/QG1                                       (no children)
    SBC1/QG1/CA1          (caption)
    SBC1/QG1/Q1           (question)
L1                       (legislation + text)   L1                    (title "L1", no text)
QG1                                             QG1
  QG1/Q1   "Your answer" (Yes/No)                 QG1/Q1   "Your answer" (Yes/No)
  QG1/QSG1   (shown when Yes)                      QG1/QSG1   (shown when Yes)
    QG1/QSG1/Q1  Date of conviction                 QG1/QSG1/Q1  Date of conviction
    QG1/QSG1/Q2  Reason                              QG1/QSG1/Q2  Reason
    QG1/QSG1/Q3  Who was convicted                   QG1/QSG1/Q3  Who was convicted
    QG1/QSG1/Q4  Period of exclusion                 QG1/QSG1/Q4  Period of exclusion
    QG1/QSG1/QSG1  Self-cleaning?                     QG1/QSG1/QSG1  Self-cleaning?
      QG1/QSG1/QSG1/Q1  Describe measures               QG1/QSG1/QSG1/Q1  Describe measures
    QG1/QSG1/QSG2  (evidence, nested here)        ← ── moved out ──┐
      QG1/QSG1/QSG2/Q1  Available electronically?                  │
      QG1/QSG1/QSG2/QSG1/Q1  Evidence reference                    │
                                                 QG2            ───┘ (evidence, top level)
                                                   QG2/Q1   Available electronically?
                                                   QG2/QSG1/Q1  Evidence reference
```

## The three differences

1. **National sub-criterion (`SBC1`).**
   e-Certis defines a populated group under `SBC1` (a caption + a question).
   The EA export has `SBC1` as an **empty placeholder** — the children don't exist
   in our data.

2. **Legislation (`L1`).**
   e-Certis carries Title / Description / Jurisdiction / Article / URI / Language.
   The EA export has only `title: "L1"` with no sub-elements. (A Legislation block
   without a Title is itself invalid per the Schematron.)

3. **"Is this information available electronically?" (the evidence sub-group).**
   This is the clearest divergence. It is the **same question** in both
   (a Yes/No INDICATOR plus an evidence reference), but:
   - e-Certis **nests** it as `QG1/QSG1/QSG2` (inside the "Yes" branch), and
   - the EA model places it as a **separate top-level group `QG2`**.

   Because the Schematron looks each group up by its id and parent, the EA ids
   `QG2` / `QG2/QSG1` are "not found in e-Certis", and `QG1/QSG1` looks like it is
   "missing a subsidiary group". No value is wrong — only the shape.

## Why it matters

The ESPD validators (Schematron `BR-TC-*`) check each submitted criterion against
the e-Certis reference structure by id, parent, type code, and child count. A
document built from the EA structure therefore cannot pass those rules unless the
criterion tree is first reconciled to e-Certis.

**The underlying content is equivalent** (same questions, same answer types, same
conditional behaviour). The divergence is in **how the tree is organised** and in
**placeholder nodes that are populated in e-Certis but empty in the EA model**.

## The decision this surfaces

We currently treat both the EA model and e-Certis as sources of truth. For
criterion *structure* they disagree, so we should pick one:

- adopt **e-Certis** structure for what we put on the wire (validator-clean), or
- keep the **EA** structure and accept documented deviations from e-Certis.

See `ea-ecertis-divergence.md` for the full 62-criterion analysis and options.
