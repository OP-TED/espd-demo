# EA export vs e-Certis reference: criterion-structure divergence report

**Status:** analysis / decision input — no code change made.
**Date:** 2026-10-12
**Scope:** the 62 modelled ESPD criteria, request declaration structure.

## Why this report exists

Phase 6B (UBL export) composes a full ESPD Request/Response and validates it with
the shipped ESPD Schematron. The composed documents are **structurally well-formed
and attribute-clean**, but a set of **fatal `BR-TC-*` findings** remain on the
criterion declarations. This report explains their root cause: the two sources we
currently treat as authoritative disagree about criterion structure.

## The two sources of truth (today)

1. **The EA model export** — `espd-tools/EAtoJSON/outputs/espd-edm.json`.
   Our compiler reads this as the structural source of truth: it drives the UI
   form, the instance-data JSON Schemas, and the UBL mapping fragments.

2. **The e-Certis reference** — `espd-validation-schematron/.../ESPD-criterion.xml`.
   The ESPD Schematron (`03-ESPD-common-criterion-br.sch`, rules `BR-TC-02/04/07/13/
   15/16/17`) loads this file via `document()` and cross-references **every**
   `cac:TenderingCriterionPropertyGroup` / `cac:TenderingCriterionProperty` /
   `cac:SubsidiaryTenderingCriterionPropertyGroup` `cbc:ID` in the submitted document
   against it, and compares child **counts** and **type codes**. So e-Certis — via
   this bundled reference — is the de-facto source of truth for *what a valid
   criterion looks like on the wire*.

A document validates only if its criterion tree matches `ESPD-criterion.xml`. Our
compiler faithfully reproduces `espd-edm.json`. **When the two disagree, the output
cannot be made Schematron-valid without choosing one over the other.**

## What the Schematron actually checks (correcting an earlier assumption)

The rule family is named "Compulsory use of the UUIDs supplied by e-Certis", which
suggested the fix was to emit per-node UUIDs. **That was a misreading.** Verified
against the `.sch` source:

- It is **not** a UUID *format* check. Property-group / property ids are **path-like
  strings** (e.g. `C01_exg-crim-part/QG1/QSG1/Q1`) in **both** the submitted document
  **and** `ESPD-criterion.xml`. Only the *criterion-level* `cbc:ID` is a real UUID
  (e.g. `005eb9ed-…`), which our compiler already emits.
- The rule is a **cross-reference + count check**: each id must *exist in the
  reference under the same parent*, with matching `PropertyGroupTypeCode` /
  `TypeCode` / `ValueDataTypeCode`, and the submitted node must have **at least as
  many** child groups/properties as the reference (`BR-TC-07/16/17` are `<=`
  comparisons).
- The per-node e-Certis UUIDs **do not exist anywhere in our source data** (not in
  `espd-edm.json`, not in the BASE samples, not in any `.gc` codelist, not in the
  reference). They were never the issue.

So the residual fatals (`"… does not exist in e-Certis"`, `"has 'N' missing
cac:Subsidiary…PropertyGroup element(s)"`) are **structural**: our criterion trees
differ from the reference's.

## The divergence, quantified

Comparing the structural id set of each criterion (groups + properties +
subcriterion + legislation + caption; response tails stripped):

| Bucket | Count | Meaning |
|---|---:|---|
| **EXACT** (EA == reference) | **0** | no criterion matches the reference exactly |
| **EA ⊇ reference** (EA has everything the ref needs, plus extras) | **4** | only the four criteria the reference does **not** define at all (code mismatches — see below) |
| **DIVERGE** (reference has ids EA lacks) | **55** | the common case: EA is missing structure the reference requires |

**Not one of the 59 comparable criteria matches the reference.** This is a
systematic, not incidental, divergence.

### The recurring divergence patterns

The 55 diverging criteria fall into a small number of repeating shapes:

1. **Empty `SubTenderingCriterion` (SBC1).**
   The reference defines a national sub-criterion with a populated group:
   `…/SBC1/QG1`, `…/SBC1/QG1/CA1` (caption), `…/SBC1/QG1/Q1` (question).
   In the EA export, `SBC1` exists but is an **empty shell** —
   `"components": []`, `"xmlChildren": []`. The sub-structure the reference
   requires is simply **not present in the EA data**. (Affects ~all criteria.)

2. **Missing / placeholder `Legislation` (L1).**
   The reference carries `cbc:Title`, `cbc:Description`, `cbc:JurisdictionLevel`,
   `cbc:Article`, `cbc:URI`, `cac:Language/cbc:LocaleCode` (placeholder text like
   `[Legislation Title]`). In the EA export, `L1` has `title: "L1"`,
   `description: ""`, and empty `xmlChildren`. (`cbc:Title` is mandatory —
   `BR-TC-09`, fatal — so an empty L1 would itself be invalid.)

3. **Evidence sub-group placed differently.**
   "Is this information available electronically?" (+ its evidence reference):
   - **e-Certis:** nested, e.g. `C01_exg-crim-part/QG1/QSG1/QSG2`.
   - **EA export:** a **separate top-level group**, e.g. `C01_exg-crim-part/QG2`.
   Same question (INDICATOR, same text), different tree position → the EA ids
   (`QG2`, `QG2/QSG1`) **do not exist** in the reference, and `QG1` looks like it
   is "missing" a subsidiary group.

4. **EA-only mechanics the reference doesn't carry as criterion children.**
   `…/PPLR1` (ProcurementProjectLotReference) and `…/RG1/RQ1` appear in the EA
   export but not in the reference's criterion subtree.

5. **Criterion code / tag mismatches** (the 4 non-overlapping criteria):
   - `C18` — EA `exg-mis-exg-mis-misconduct` vs reference `exg-mis-misconduct`.
   - `C27` / `C28` / `C66` — three EA `slc-suit-auth-mbrshp` tags vs the
     reference's single definition.
   - `C67 exg-mis-unrel-sec` — present in EA, absent from the reference.
   These never cross-reference at all (different code ⇒ different criterion).

## Why this cannot be fixed in the compiler alone

The content the reference requires — a populated `SBC1/QG1`, real `Legislation`
text, the nested evidence-group shape — **is not in `espd-edm.json`**. The compiler
can only emit what the EA export contains. Concretely:

- Emitting the EA's `SubTenderingCriterion` / `Legislation` nodes would produce
  **empty elements** that (a) still fail the count checks and (b) introduce **new**
  fatals (`BR-TC-09` requires a Legislation Title).
- Reshaping the evidence group from `QG2` to `QG1/QSG1/QSG2` would mean the compiler
  **overriding the EA structure** with the e-Certis structure — i.e. choosing
  e-Certis as the source of truth for structure.

The one safe, data-backed partial improvement is emitting the **CAPTION** properties
the EA export genuinely carries (e.g. `C37_slc-abil-ref-work/RG1/RSG1/CA1` =
"[Description provided by the Buyer]"), which the generator currently drops. This is
faithful to the EA data but, on its own, does **not** make any criterion
Schematron-clean (the structural divergences above remain), so it was **not** applied
as part of this analysis — it belongs with a deliberate structural decision.

## The source-of-truth decision

The project currently treats **both** `espd-edm.json` **and** the e-Certis
`ESPD-criterion.xml` as authoritative. For criterion *structure* they are mutually
inconsistent, so a single document cannot satisfy both. Options:

- **A. e-Certis is the structural SoT.** Derive the criterion declaration from
  `ESPD-criterion.xml` (or an e-Certis export) rather than from `espd-edm.json`.
  Pros: Schematron-valid by construction; e-Certis is the official registry the
  validators enforce. Cons: the EA model (and everything we derived from it — the
  UI form, instance-data schemas) would need re-basing on e-Certis structure, or a
  reconciliation layer that maps EA ⇄ e-Certis per criterion.

- **B. EA export is the structural SoT; accept Schematron deltas.** Keep the current
  pipeline; treat the `BR-TC-*` findings as known deviations between our model and
  e-Certis, documented and tracked. Pros: no disruption; our UI/model stay cohesive.
  Cons: exported UBL is not Schematron-clean against the official e-Certis structure.

- **C. Reconcile the EA model to e-Certis upstream.** Fix `espd-edm.json` (or the EA
  `.eapx`) so its criterion trees match e-Certis (populate SBC1, add Legislation
  text, nest the evidence group, fix the code mismatches). Pros: one coherent model
  that is both our SoT and Schematron-valid. Cons: upstream EA modelling work, per
  criterion; must be kept in sync with e-Certis revisions.

**Recommendation:** converge on **one** structural SoT. If Schematron-valid UBL
export is a hard requirement, that SoT must be e-Certis (option A or C). Option B is
viable only if we accept that our exported documents intentionally differ from the
e-Certis-registered structure.

## Appendix — how to reproduce

The per-criterion id-set diff was produced by extracting `C\d+_<code>/…` ids from
`espd-edm.json` (requestpath values, response tails stripped) and from
`ESPD-criterion.xml` (`cbc:ID` values), grouping by criterion prefix, and taking the
set difference each way. The full per-criterion REF-only / EA-only id lists are
available on request (the script is throwaway; the method is above).
