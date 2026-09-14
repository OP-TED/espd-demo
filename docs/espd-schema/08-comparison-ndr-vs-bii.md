# 8. Comparison: NDR + Subset Schema vs. CEN/BII Modeling

Comparing two approaches for defining the ESPD profile:

- **UBL customization via NDR + a documented subset schema**
- **Adopting CEN/BII-style Transaction / Core Component modeling**

## The key reframing: they answer different questions

These are often presented as alternatives, but they operate at **different
layers** and are largely **complementary**.

- **NDR + subset schema** answers: *"What is the exact allowed shape of the XML
  on the wire?"* A **syntax-layer** artifact. Output: a restricted UBL XSD (plus
  the conformance discipline of never extending UBL).
- **CEN/BII Transaction/Core Component modeling** answers: *"What are the
  business terms, their semantics, cardinality, and rules, independent of
  syntax?"* A **semantic-layer** methodology. Output: a syntax-neutral model
  that then binds to UBL (and generates Schematron, docs, code lists).

So the honest comparison is not "which one." BII gives you the **source model**;
the subset schema is one of the **things you can generate from it**. Choosing
"only NDR + subset" means hand-maintaining the syntax artifact with no semantic
model behind it. Choosing "only BII" means you have a great model but might not
ship the XSD that XML toolchains love.

## Side-by-side

| Dimension | NDR + subset schema | CEN/BII Transaction/CC modeling |
|---|---|---|
| Layer | Syntax (XSD over UBL) | Semantics (BT/BG + rules), then binds to syntax |
| Primary artifact | Restricted UBL XSD | Business-term model → generates binding, Schematron, docs, code lists |
| What it enforces | Structure, cardinality, datatypes, enums | Everything: structure *and* co-occurrence / business rules |
| IDE autocomplete / codegen | Yes (main strength) | Only via the XSD/JSON Schema it generates |
| Business rules ("if C01 then…") | No (XSD cannot) | Yes (Schematron generated from rules) |
| Stable IDs / traceability | No inherent ID scheme | Yes — BT/BG/BR IDs are the backbone |
| Multiple serializations (XML + JSON) | XSD is XML-only | Syntax-neutral core binds to many |
| Downstream national profiles | Each re-subsets the XSD (painful) | Re-restrict the model, regenerate (clean) |
| Authoring cost | High if hand-written; medium if generated | High upfront (model + generators) |
| Maintenance across UBL versions | Redo restrictions | Rebind + regenerate |
| Fit to this JSON-first repo | Partial — helps external XML consumers only | Strong — `espd-edm.json` already hosts the model |

## Where each wins for ESPD

**NDR + subset schema wins on:**
- Giving external XML consumers a schema their existing tooling validates and
  generates typed classes from — a DX win Schematron cannot provide.
- A crisp, machine-checkable statement of "these are the only UBL elements ESPD
  touches" — the conformant-subset guarantee.
- Lower conceptual overhead: one artifact, no methodology to adopt.

**CEN/BII modeling wins on:**
- Capturing what actually makes ESPD hard: criteria logic, conditional
  requirements, "which repeated `cac:` block is C01," code-list bindings. These
  live in rules, not structure — XSD cannot express them.
- Traceability: stable `I68`/`C01`/`BR-xx` IDs joining model → binding →
  Schematron → docs → error messages. The biggest long-term maintainability and
  DX lever.
- Serving the JSON-first reality: `part-I.mapping.json` (BT→UBL path) and
  `espd-edm.json` are already BII-shaped. A subset XSD does nothing for JSON
  consumers; a syntax-neutral model serves both JSON and XML.
- Clean downstream profiling for national authorities (re-restrict + regenerate,
  no forking).

## The decisive point for ESPD

ESPD's complexity is overwhelmingly **semantic and rule-based**, not structural.
The distinctive difficulty is "criterion C01 requires response group X under
condition Y," and UBL's genericity means the same information can often be
encoded multiple ways. A subset XSD tightens the shape but cannot resolve any of
that — those constraints all land in Schematron regardless. Therefore:

- Adopting **only** NDR + subset leaves the hard ~80% (business rules) unmodeled
  and hand-written.
- Adopting **BII modeling** addresses the hard part *and* can generate the
  subset XSD as one of its outputs.

They are not equal-weight alternatives. BII is the foundation; the subset schema
is a valuable *output* of it.

## Recommendation

Adopt **CEN/BII-style modeling as the backbone**, and treat the **NDR + subset
schema as a generated output artifact** for external XML consumers:

1. Make `espd-edm.json` (fed by the `EAtoJSON` pipeline) the single source
   model: every element gets a stable ID, cardinality, datatype, code-list
   binding, UBL path, and rule references (the Level-2 model from
   [04-encoding-the-form-layer.md](04-encoding-the-form-layer.md)).
2. Generate from it: Schematron (with BR-IDs), JSON Schema (the real subset-
   schema analogue for JSON-first consumers), docs, and code-list bindings.
3. Generate the **restricted UBL XSD** too, as the conformance artifact and
   codegen surface for external XML integrators. The UBL paths in play are
   already enumerated (`to` paths in `part-I.mapping.json`), so the subset
   skeleton is largely derivable.
4. Follow **NDR conformance discipline** (subset-and-constrain, never extend —
   consistent with ESPD not using `UBLExtensions`, see
   [06-ubl-extensions-in-espd.md](06-ubl-extensions-in-espd.md)) as the *rule*
   the generated XSD obeys, not a separate hand-authored track.

The one scenario to lean harder on NDR + subset as a primary deliverable: if the
dominant audience is external teams consuming UBL XML who mainly need
codegen/validation, and business rules are few. Given ESPD's rule-heavy nature
and the JSON-first pipeline, that is not the case here.

See [09-generating-the-subset-schema.md](09-generating-the-subset-schema.md) for
a detailed answer to "can the subset schema really be generated from the BII
semantic layer?"
