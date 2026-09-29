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

This decision was revised after **empirical testing** (see "What reverse-ejs CAN
do" below): reverse-ejs is more capable than a first read suggested — cross-
references and conditionals are in fact solvable — so the decision rests on a
tradeoff, not on the feature being impossible.

## How reverse templating works, and its inherent limit

Reverse templating is fundamentally **regex/pattern reconstruction**: the
template's static text becomes anchors, and interpolation slots become capture
groups. Its known theoretical wall is that a template like `{{foo}}{{bar}}`
**cannot be reversed** — two adjacent slots with no static separator give no way
to know where one value ends and the next begins (reverse-ejs's `strict` mode
even fails loudly on such cases). More generally, template programs are "not
injective, not affine, erasing" (see
[Reverse Template Processing using Abstract Interpretation](https://cliplab.org/jd1mOkw/SAS2023/142840395/142840395.pdf)),
so reversing is ambiguous except for restricted template shapes. Our XML always
has static separators (element tags) between slots, so this specific wall does
not block us — the reason to keep the current engine is the tradeoff below, not
this limit.

## What reverse-ejs CAN do (verified empirically)

We tested reverse-ejs@3.1.0 + ejs@6 against the actual patterns before deciding.
Correcting earlier over-claims — the following DO work:

- **Type coercion** — reverse-ejs has a `types` option (`number`/`boolean`/`date`)
  that coerces on extraction, so `"3"` → `3` and `"true"` → `true` roundtrip.
- **Loops → arrays** — a `forEach` over an array reverses back into an array of
  objects, including deep repeated siblings, as long as each iteration has static
  separators (our XML element tags provide these).
- **Conditionals / empty case** — an `<% if (flag) { %>…<% } %>` block roundtrips
  in both the populated and absent case (verified: `availableElectronically`
  true → refs extracted; false → block absent, no refs). So the ONTRUE/ONFALSE
  branches are expressible.
- **Cross-references** — the C01/C31 evidence link IS recoverable. reverse-ejs
  refuses to iterate the *same* array twice in one template (it errors:
  "Array … is iterated more than once"), but with two DISTINCT variables
  (`evidenceRefs` + `evidenceRecords`) both arrays extract cleanly and a tiny
  post-join by id reconstructs the single evidence array `{id,url,description}`.
  Verified working.

So the blanket "not possible" for cross-references was wrong.

## Why we still keep the correspondence engine

The evaluation is now a TRADEOFF, not an impossibility. The costs of the
reverse-ejs approach, for OUR documents specifically:

1. **The reverse direction is the sensitive one, and it is text/position-based.**
   reverse-ejs reconstructs by regex from static-text anchors. It is sensitive to
   whitespace (needs `flexibleWhitespace` / `rmWhitespace` tuning) and to any two
   adjacent interpolations lacking a static separator. Our XML has separators, so
   it works — but correctness now depends on template formatting, not on tree
   structure. Our current engine parses the XML tree, so formatting cannot break
   it.

2. **Cross-references require splitting one logical array into two template
   variables** (`evidenceRefs` + `evidenceRecords`) plus a hand-written post-join
   by id. Our engine expresses the same link declaratively in the spec
   (`references.resolve`) and rejoins automatically. The template approach pushes
   that join into per-criterion glue code — exactly the kind of scattered logic
   the declarative model was meant to avoid.

3. **The instance shape gets coupled to the template's needs.** To make the
   two-loop cross-reference work, the *forward* data must be pre-split into
   `evidenceRefs`/`evidenceRecords` views of what is semantically one array. So
   the readable template comes at the cost of a less clean instance-data shape,
   or an adapter layer that splits/rejoins around every template.

4. **Discriminator-driven branch selection** (choose which response body a record
   carries based on a `schemeID`/`TypeCode`, per Schematron) is awkward to express
   as template conditionals and to reverse unambiguously; our `records`/`when`
   construct handles it directly.

5. **Maturity/risk** — reverse-ejs is a single-author, recently-published project.
   The engine we have is small, in-repo, and tailored to these documents.

## The underlying distinction

Our `structure` rule is already a **bidirectional template — but a structured,
tree-aware one**, not a text one. reverse-ejs reconstructs from flat text by
regex anchors, which is powerful (it handles loops, conditionals, type coercion,
and even cross-references with a two-variable split) but trades tree-level
determinism for readability. That trade is excellent for its intended use
(extracting data from loosely-structured, formatting-varied HTML into a schema).
For schema-constrained UBL XML with a strict roundtrip requirement, where we
already control the model and want the join/discriminator logic declared rather
than scattered, the tree-based engine fits better.

| | reverse-ejs (text template) | our `structure` / `mapper.mjs` |
|---|---|---|
| Substrate | flat text + regex anchors | parsed XML element tree |
| Reverse reliability | works with static separators; whitespace/adjacency-sensitive | deterministic (walks the tree) |
| Repetition | `forEach` → array (verified) | `forEach` over child elements by name |
| Conditionals | `if` block roundtrips (verified) | `when` guard |
| Cross-refs / joins | possible via 2 vars + hand post-join (verified) | declarative `references.resolve`, auto-rejoin |
| Type round-trip | `types` option (verified) | `type: number` / `boolean` |
| Discriminators | awkward to reverse unambiguously | constant attributes / `when` |
| Instance-data shape | may need pre-split views for cross-refs | clean semantic keys |
| Readability | high (looks like the output) | medium (JSON tree) |
| Maturity | single-author, recent | in-repo, tailored |

## Consequences

- The mapping layer stays as-is: `mapper.mjs` (generic engine) + the embedded
  `structure` rule + the ESPD-specific generator (`build-request-mapping.mjs`).
- We accept slightly lower readability than a text template in exchange for a
  tree-deterministic engine, declarative cross-reference joins, and clean
  semantic instance keys.
- This is a considered TRADEOFF, not "reverse-ejs can't do it." The empirical
  tests showed it can handle loops, conditionals, type coercion, and (with a
  two-variable split + post-join) cross-references. We chose against it because
  the reverse direction is text/whitespace-sensitive, cross-references push join
  logic into per-criterion glue and pre-split instance shapes, and discriminator
  branch selection is awkward to reverse — all of which our declarative engine
  handles more cleanly for these specific documents.
- If the balance shifts (e.g. readability becomes the dominant concern, or the
  document set simplifies), this decision is worth revisiting — the empirical
  groundwork here shows it is technically viable.

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
