# Codelist governance — sources of truth and how we use each list

This page records, per codelist, **where its authority lives** and **how our
reference implementation is expected to treat it**. It is the alignment artifact
for the team discussion: the ESPD-EDM documentation, the shipped `.gc` files, the
Schematron/CVA, and our model all need to agree, and this is where that agreement
is written down.

> **Status: DRAFT for team review.** The per-codelist decisions below reflect the
> current team assessment (see sources). Open points are marked ⚠.

## Sources we are aligning

Four sources touch codelists, with different authority:

| Source | What it is | Authority |
|---|---|---|
| **ESPD-EDM documentation** | [code-lists page](https://docs.acceptance.ted.europa.eu/ESPD-EDM/latest/technical/code-lists.html) — the human-readable catalogue of which lists ESPD ships | states intent: which lists exist and their role |
| **`ESPD-EDM/codelists/*.gc`** | the shipped Genericode files (codes + 24-language labels) | the **values** a shipped list provides |
| **Schematron + CVA** | `espd-validation-schematron/` — XML-layer validation | the **enforced** value set, when a list is validated |
| **This reference implementation** | `model/` — instance schema, mapping, form lens | how we *use* a list (enum vs reference, UI picker) |

## The four axes

Every codelist is characterised by four **independent** yes/no properties, each
owned by a different concern. Do **not** infer one from another:

1. **Shipped in ESPD-EDM** — is there a `.gc` under `ESPD-EDM/codelists/`?
   *(Property of ESPD-EDM.)*
2. **Validated in Schematron** — does the CVA/Schematron enforce the value set at
   the XML interchange layer? *(Property of the STANDARD — set by ESPD
   governance; we only read it.)*
3. **Should be used for UI** — should the service offer these codes as the pick
   list? *(UI/UX decision.)*
4. **Should be inlined as Enum** — should our JSON Schema carry the values as an
   `enum`, or only reference the list by name? *(OUR implementation decision.)*

### The axes are independent — all four combinations are legitimate

An earlier draft of this page claimed inlining and validation were inversely
coupled (*"inline ⇔ not validated"*). **That was wrong** — it over-generalised
from the team's five-list sample. The repo already contains counterexamples:
`docrefcontent-type` and `eoid-type` are **both validated and inlined**. The two
axes answer different questions:

- **Validated** = "does the *standard* enforce this set at the XML layer?" — a
  governance property we read from the CVA.
- **Inline** = "does *our* JSON Schema carry the values, for authoring/UI
  convenience?" — driven mainly by **size/stability** (small, stable lists are
  convenient to inline; large lists are referenced by name).

All four combinations occur:

| | inline = yes | inline = no |
|---|---|---|
| **validated = yes** | `docrefcontent-type` (10), `eoid-type` (5) — small closed list, inlined for authoring feedback *and* enforced at the XML layer | `country` (341), `occupation` (4046) — validated but too large to inline → reference by name |
| **validated = no** | `financial-ratio-type` (40), `boolean-gui-control-type` (6) — suggested set, inlined as implementer choice | a large *suggested* list would land here — reference by name, no XML enforcement |

**The one real coupling** is narrow and about *labelling*, not *whether* to
inline: an inlined enum is an **implementer choice**
(`$codelistEnumIsImplementerChoice`) **iff** the list is *not* validated. When a
list is both validated and inlined, the inlined values are the standard's
enforced set, so the marker is false.

> **"Shipped but not Schematron-validated"** carries a distinct meaning the team
> stated explicitly: *we suggest these values, but implementers may use others.*
> That is a property of **validation**, independent of whether we also inline.

## Per-codelist decisions (team assessment)

| Codelist | Shipped | Schematron-validated | Use for UI | Inline as Enum | Source |
|---|:---:|:---:|:---:|:---:|---|
| `country` | yes | **yes** | yes | **no** | [doc](https://docs.acceptance.ted.europa.eu/ESPD-EDM/latest/technical/code-lists.html#country-table) |
| `occupation` | yes | **yes** | yes | **no** | [doc](https://docs.acceptance.ted.europa.eu/ESPD-EDM/latest/technical/code-lists.html#occupation-table) |
| `financial-ratio-type` | yes | **no** | yes | **yes** | [doc](https://docs.acceptance.ted.europa.eu/ESPD-EDM/latest/technical/code-lists.html#financial-ratio-type-table) |
| `boolean-gui-control-type` | yes | **no** | yes | **yes** | [doc](https://docs.acceptance.ted.europa.eu/ESPD-EDM/latest/technical/code-lists.html#boolean-gui-control-type-table) |
| `procurement-procedure-type` | **no** | no | yes | **yes** | [OP dataset](https://op.europa.eu/en/web/eu-vocabularies/dataset/-/resource?uri=http://publications.europa.eu/resource/dataset/procurement-procedure-type), [issue #308](https://github.com/OP-TED/ESPD-EDM/issues/308) |

Verified against the repo at time of writing: `country` and `occupation` have CVA
contexts; `financial-ratio-type` and `boolean-gui-control-type` do not;
`procurement-procedure-type` has no `.gc` shipped. (These five happen not to show
the validated+inlined case — but the Part I lists below do; see the independence
discussion above.)

The remaining shipped lists, recorded in `governance.json` from repo ground truth
(⚠ pending team review), include two that are **both validated and inlined** —
the counterexamples to the discarded coupling:

| Codelist | Shipped | Validated | Use for UI | Inline | Note |
|---|:---:|:---:|:---:|:---:|---|
| `docrefcontent-type` | yes | **yes** | yes | **yes** | Part I §A; small closed list, inlined for authoring + enforced at XML |
| `eoid-type` | yes | **yes** | yes | **yes** | Part I §B; same validated+inlined case |
| `currency` | yes | yes | yes | no | ~290, reference by name |
| `eo-role-type` | yes | yes | yes | no | 5 codes; could be inlined when EO role is modelled — revisit |
| `access-right`, `economic-operator-size`, `language` | yes | yes | yes | no | validated; not yet used by a modelled field |
| `criterion-element-type`, `property-group-type`, `response-data-type`, `profile-execution-id`, `selection-criterion`, `exclusion-ground` | yes | yes | **no** | no | internal/structural codes, not user pickers |

### Notes and open points

- **`procurement-procedure-type` is the special case:** NOT shipped (tracked
  upstream as [ESPD-EDM issue #308](https://github.com/OP-TED/ESPD-EDM/issues/308)),
  yet needed for UI and to be inlined. Until the `.gc` ships we cannot derive the
  enum from a shipped source — so our inlined set would be sourced directly from
  the [OP dataset](https://op.europa.eu/en/web/eu-vocabularies/dataset/-/resource?uri=http://publications.europa.eu/resource/dataset/procurement-procedure-type)
  and carried as a hand-maintained list until the shipping gap is closed. See
  `improvement-ideas.md` X1 for the shipping proposal.
- **"Shipped but not validated" is a deliberate category**, not an oversight for
  `financial-ratio-type` / `boolean-gui-control-type`. They are *intentionally*
  unvalidated because the values are suggestions. (This supersedes the
  `improvement-ideas.md` CVA1 framing of adding them to the CVA — see ⚠ below.)
- ⚠ **CVA1 superseded.** `improvement-ideas.md` CVA1 proposed *adding*
  `financial-ratio-type` and `boolean-gui-control-type` to the Schematron. That
  would turn a *suggested* list into an *enforced* one, contradicting the team's
  "implementers may use others" statement. CVA1 is marked superseded there; keep
  these lists unvalidated unless the team deliberately makes them authoritative.
- ⚠ **M1 (GUI control type in the data model) still stands** as a separate model
  concern: whether `boolean-gui-control-type` belongs in the exchanged data at
  all is orthogonal to how we validate/inline it.
- ⚠ **The lists beyond the team's five are repo-ground-truth, pending review.**
  Their `useForUI`/`inlineEnum` values are our current best assessment, not a
  team decision yet — the `$note`/`REVIEW` markers in `governance.json` flag each.

## How this maps to our modeling and implementation

The governance table is **data**, so our implementation should read it rather
than re-derive the decisions. See `improvement-ideas.md` X6/UX1 for the mechanics;
the structural proposal is in the next section.
### Proposal: a single governance registry, read everywhere

**Problem with today's code:** the generator decides inlining by a **size gate**
(`MAX_INLINE_ENUM = 60` in `generate-instance-schema.mjs`). Size is a reasonable
*heuristic* for the inline axis (small lists are convenient to inline), but it is
not a governance record: it cannot capture a deliberate decision to inline (or
not) a borderline list, it says nothing about the other three axes, and it is
invisible to the UI service. Making `inlineEnum` an explicit per-list decision in
one registry replaces the implicit heuristic with a reviewable contract — while
still, in practice, following size for the inline axis.

**Proposed structure:** make the four axes explicit, in one place, and have the
compiler + UI read it.

1. **A governance registry** — `model/codelists/governance.json`, one entry per
   codelist, keyed by codelist name:

   ```json
   {
     "country":                   { "shipped": true,  "schematronValidated": true,  "useForUI": true, "inlineEnum": false },
     "occupation":                { "shipped": true,  "schematronValidated": true,  "useForUI": true, "inlineEnum": false },
     "docrefcontent-type":        { "shipped": true,  "schematronValidated": true,  "useForUI": true, "inlineEnum": true  },
     "eoid-type":                 { "shipped": true,  "schematronValidated": true,  "useForUI": true, "inlineEnum": true  },
     "financial-ratio-type":      { "shipped": true,  "schematronValidated": false, "useForUI": true, "inlineEnum": true  },
     "boolean-gui-control-type":  { "shipped": true,  "schematronValidated": false, "useForUI": true, "inlineEnum": true  },
     "procurement-procedure-type":{ "shipped": false, "schematronValidated": false, "useForUI": true, "inlineEnum": true, "externalSource": "<OP dataset URL>" }
   }
   ```
   (`docrefcontent-type` and `eoid-type` show the validated+inlined case the
   discarded coupling could not represent.)

   This file *is* the alignment artifact in machine form — the same table as
   above. It is hand-authored (the decisions are governance, not derivable), and
   it is the single source our code consults.

2. **The generator reads `inlineEnum`, not a size gate.** Replace the
   `MAX_INLINE_ENUM` check in `deriveCodelistEnum()` with a lookup:
   `governance[codeListName].inlineEnum`. When `true`, inline the enum (marked
   `$codelistEnumIsImplementerChoice` *iff* `schematronValidated === false` — the
   one real coupling); when `false`, reference by name. The decision is now an
   explicit registry value rather than an implicit size threshold.

3. **A consistency test** that cross-checks the registry against reality, so the
   governance file cannot silently drift from the repo:
   - `shipped` ⇔ a `.gc` exists for the name.
   - `schematronValidated` ⇔ the name appears as a CVA `ValueList`/context.
   - every codelist referenced by a value type or sidecar leaf has an entry.
   This turns "do the four sources agree?" into a CI check rather than a manual
   audit.

4. **UI/codelist service reads `useForUI` + `externalSource`.** The service
   (UX1 in `improvement-ideas.md`) builds its pick lists from the shipped `.gc`
   for `useForUI` lists, and from `externalSource` for a not-yet-shipped list
   like `procurement-procedure-type`.

5. **`$codelistEnumIsImplementerChoice` is derived, narrowly.** It is set on an
   inlined enum iff `inlineEnum && !schematronValidated` — the enum is our
   *suggested* set. A list that is both validated and inlined (`docrefcontent-type`,
   `eoid-type`) is inlined for convenience but its values are the standard's
   enforced set, so the marker is **false**. This is the only place validation
   and inlining interact.

**Why a registry rather than keep inferring:** the four axes are a governance
contract between teams (EDM, Schematron, UI, this implementation). Encoding them
as data makes the contract explicit, reviewable in one diff, and testable —
instead of scattered across a size constant, the CVA, and the `.gc` directory.
The consistency test is what keeps the four sources honest over time.

**Migration note:** this is a refactor of existing behaviour, not a change to
current outputs — the registry's `inlineEnum` values are set to match what the
repo inlines today (financial-ratio-type, boolean-gui-control-type, and the Part I
docrefcontent-type / eoid-type), so regenerating should yield identical artifacts.
The value is an explicit, shared, testable contract and correctness for the
*next* list, where size alone might mislead.
