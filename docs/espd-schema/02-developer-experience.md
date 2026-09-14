# 2. Developer Experience of the Approaches

Perspective: a developer arriving cold at ESPD who must implement an ESPD
service, or otherwise encode data from their system into a compliant UBL XML
`QualificationApplicationRequest`.

Three axes:

- **Human straightforwardness** — can a developer read it and know what to produce?
- **Machine automatability** — can code, bindings, and validators be generated from it?
- **Discoverability** — can a developer find "how do I encode I68" without asking a human?

## Rating the approaches

### A. UML model + hand-written Schematron (current)
- **Human:** Medium. UML aids domain understanding but does not tell you the
  exact XML to emit; you end up reverse-engineering paths from examples.
- **Machine:** Low–medium. UML (as XMI) is parseable, but the informal
  UML→UBL-path mapping is not machine-consumable. Schematron runs, but only
  validates *after* the XML is built; it does not guide construction.
- **Discoverability:** Medium, heavily dependent on doc quality. "Which
  `cac`/`cbc` path is I68" is often tribal knowledge.
- **Verdict:** Good for spec authors, weaker for implementers. Schematron is a
  great gate, a poor guide.

### B. Genericode + CVA (code-list binding)
- **Human:** Medium–high for the value-binding slice.
- **Machine:** High for that slice (`.gc` is structured; CVA→Schematron is automatable).
- **Discoverability:** High but narrow (code lists only).
- **Verdict:** Strong for what it addresses; not a whole-profile solution.

### C. Conformant subset schema (restricted XSD) + Schematron
- **Human:** Medium. A subset XSD states exactly what is allowed structurally —
  more actionable than UML prose.
- **Machine:** High. XSD drives codegen (JAXB, `xsd.exe`, `xjc`) and IDE autocomplete.
- **Discoverability:** High (autocomplete + schema validation in the editor).
- **Verdict:** Best "structural" DX because it plugs into existing tooling.

### D. CEN/BII single-source model → generate docs + Schematron (+ subset + bindings)
- **Human:** High. Each business term (I68, C01) has ID, cardinality, datatype,
  UBL path, and rules in one place.
- **Machine:** Highest. One model generates everything; nothing drifts.
- **Discoverability:** High if published as a browsable/searchable artifact.
- **Verdict:** Best overall, at the cost of building/maintaining the generator.

### E. SHACL / DCTAP (only if JSON/RDF-first)
- Relevant to validating the JSON representation, not the UBL XML wire format. A
  parallel track, not the UBL profile itself.

**Ranking for implementer DX:** D > C > (A + B together) > A alone.

Headline: **Schematron validates but does not help build.** The biggest DX win
is providing something that *guides construction* — a subset schema for
autocomplete/codegen, plus a per-element mapping table, plus worked examples —
with Schematron as the final gate.

## Guide vs. gate

Constraints can **gate** (reject bad XML after the fact) or **guide** (help
produce correct XML in the first place). Schematron and XSD-validation are
gates. Good DX is mostly about **guides**:

- A **mapping table**: business term → UBL path → cardinality → datatype → code
  list → rule refs. This repo already has raw material for this
  (`model/xml-mapping/part-I.mapping.json`, `espd-edm.json`).
- **Canonical examples** for every part (`part-I.example.json`,
  `part-II.example.json`) — the #1 thing developers copy from.
- **Codegen-friendly schema** so the IDE does the work.

## Important aspects beyond the three axes

1. **Versioning and stability.** UBL versions, ESPD versions, code-list
   versions. Stable business-term IDs (I68, C01) that survive version changes
   are a major DX asset. Version negotiation between two ESPD services is a real
   interop concern.
2. **Round-trip / interop testing.** Can a request from system A be consumed by
   system B? A **conformance test suite** (sample instances + expected
   validation outcomes) is often more valuable than spec text.
3. **Error / diagnostic quality.** Schematron assertion *messages* are a DX
   surface. "`cbc:X` required when `cac:Y` present (rule BR-042)" with a link
   beats a bare XPath failure. Rule IDs that trace to the model close the loop.
4. **Two directions.** Encoding (system → UBL) and parsing (UBL → system). A
   profile easy to write but ambiguous to read hurts consumers. Constrain
   optionality to reduce variant encodings.
5. **Semantic identity of elements.** Given UBL's genericity, the hard part is
   often "which repeated `cac:` block *is* criterion C01?" Typing via code lists
   and stable IDs makes both encoding and parsing deterministic.
6. **Governance and feedback loop.** Where do implementers report ambiguity? An
   issue tracker + `CHANGELOG.md` is part of DX.
7. **Multiple serializations.** If a JSON representation exists alongside UBL
   XML, developers will ask which is authoritative. The mapping between them
   must be authoritative, or drift results.

## Who are the consumers of ESPD-EDM?

1. **Contracting authority (buyer) systems** — generate the Request, then
   consume the Response to evaluate economic operators. Both directions.
2. **Economic operator (supplier) / ESPD service systems** — consume the
   Request, present a form, produce the Response. The repo's
   `form-structure/part-I.form.json` targets exactly this UI-generation use case.
3. **eProcurement platform vendors and integrators** — build reusable
   libraries/components; care most about codegen, schemas, conformance suites.
4. **Validators / conformance-checking services** — direct consumers of the
   Schematron and code lists.
5. **National / regional profile authorities** — further *restrict* ESPD-EDM for
   their country; they consume the model as a base to subset again, so a
   machine-processable model matters to them.
6. **The spec / model maintainers** — the `EAtoJSON` pipeline consumers.

Key insight: consumers 1–3 want **guides, examples, codegen**; consumer 4 wants
**runnable rules**; consumer 5 wants a **machine-processable base model**. The
single-source model (approach D) is the only one that serves all of them
without maintaining parallel, drift-prone documents.
