# Decision: keep the correspondence/`structure` mapping engine (not a reverse template engine)

Status: **Decided — keep the current engine.** Date: 2026-09.
Scope: the `model/xml-mapping/` layer (instance JSON ↔ UBL XML).

## Question

Could a bidirectional **template engine** replace our correspondence mapping
engine? Forward template engines (e.g. EJS) render text from data + a template.
Some projects reverse this — given a template and rendered text, extract the data
— which would let one readable template drive both directions. The specific
candidates evaluated were [reverse-ejs](https://github.com/lucasrainett/reverse-ejs)
and the write-up
["What if you could reverse a template engine?"](https://dev.to/lucasrainett/what-if-you-could-reverse-a-template-engine-5nk).
The motivation is legitimate: a template that looks like the target XML would be
more readable than our JSON mapping files.

## Decision

**Keep the correspondence engine (`mapper.mjs`) and the embedded `structure`
rule.** Do not adopt a text-based reverse template engine for the mapping layer.

## How reverse templating works, and its inherent limit

Reverse templating is fundamentally **regex/pattern reconstruction**: the
template's static text becomes anchors, and interpolation slots become capture
groups. Its well-known theoretical wall is that a template like `{{foo}}{{bar}}`
**cannot be reversed** — two adjacent slots with no static separator give no way
to know where one value ends and the next begins. More generally, template
programs are "not injective, not affine, erasing" (see
[Reverse Template Processing using Abstract Interpretation](https://cliplab.org/jd1mOkw/SAS2023/142840395/142840395.pdf)),
so reversing is ambiguous except for restricted template shapes. reverse-ejs is
also a single-author experimental project, framed as a "what if" — not something
to base the mapping layer's correctness on.

## Why it does not fit our XML mapping

1. **We need the REVERSE direction, and that is the fragile one.** Forward
   (JSON → XML) via a template is trivial and readable. But our roundtrip
   requirement is `unmap` (XML → instance), which is exactly where reverse
   templating is fragile. The readability win only pays off if reverse works
   reliably for our documents — and it does not.

2. **Deep repeated siblings are our common case.** Our mappings are full of
   repeated same-named elements (N `cac:TenderingCriterionProperty` under one
   group, N `cac:ProcurementProjectLotReference`, N `cac:Evidence`, repeating
   convictions/lots). A template loop over these is the adjacency/re-segmentation
   problem; reverse parsing must correctly split nested, variable-count loops.
   That is the fragile heart of reverse templating.

3. **Our hardest features have no template equivalent at all** — forward or
   reverse. A template only "interpolates a value into a slot"; these are not
   slot fills:
   - **Cross-references** — e.g. `cac:EvidenceSupplied/cbc:ID` →
     `cac:Evidence/cbc:ID`, reconstructed by joining ids across the document
     (`references.resolve`). Re-linking on import is a graph/join operation.
   - **Discriminator-driven imports** — the `records`/`when`/constant-attribute
     logic that decides which body branch fired from a `schemeID`/`TypeCode`.
   - **Type coercion** — `"3"` → `3`, `"true"` → `true` (`type: number/boolean`).
     Templates are text-only, so this round-trip would be lost.
   - **Positional sibling disambiguation** across a deep tree (the `structure`
     importer matches the Nth spec child to the Nth XML sibling).

## The underlying distinction

Our `structure` rule is already a **bidirectional template — but a structured,
tree-aware one**, not a text one. reverse-ejs trades determinism for readability,
which is a reasonable trade for its intended use (scraping loosely-structured,
mostly-unique HTML into a schema). For schema-constrained UBL XML with deep
repetition, cross-references and a strict roundtrip requirement, the determinism
we would give up is the whole point.

| | reverse-ejs (text template) | our `structure` / `mapper.mjs` |
|---|---|---|
| Substrate | flat text + regex anchors | parsed XML element tree |
| Reverse reliability | ambiguous for adjacent / repeated slots | deterministic (walks the tree) |
| Repetition | fragile re-segmentation | `forEach` over child elements by name |
| Cross-refs / joins | not possible | `references.resolve` |
| Type round-trip | text only | `type: number` / `boolean` |
| Discriminators | none | constant attributes / `when` |
| Readability | high (looks like the output) | medium (JSON tree) |

## Consequences

- The mapping layer stays as-is: `mapper.mjs` (generic engine) + the embedded
  `structure` rule + the ESPD-specific generator (`build-request-mapping.mjs`).
- We accept slightly lower readability than a text template in exchange for a
  deterministic, roundtrip-correct engine that already handles our real cases.
- Adopting reverse-ejs would regress correctness on features that have no
  template representation (evidence cross-linking, discriminators, type coercion,
  positional siblings), so it is rejected — not merely deferred.

## If readability becomes a priority later (not adopted now)

The readability goal is valid and can be pursued WITHOUT giving up determinism:

1. **Template-like authoring that compiles to `structure`.** A thin
   "annotated-XML → `structure`" front-end: authors write near-XML with
   `{{from:path}}` / `{{const}}` / `{{forEach:path}}` markers; a small compiler
   emits the `structure` JSON the engine already runs. Template *look*,
   structured *semantics*, deterministic both directions.
2. **Render the generated mapping more legibly** — since the mapping is generated
   from `espd-edm.json`, show a compact XML preview alongside the JSON rather than
   changing the runtime format.

Either keeps the current engine as the execution substrate; only the authoring
surface changes. Neither is implemented yet.
