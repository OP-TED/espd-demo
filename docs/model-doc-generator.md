# Design note: traversable model → UBL documentation

Status: **proposed / not yet implemented.** This captures the design for a
documentation generator that turns the canonical instance-data model plus the
xml-mapping into human-browsable documentation, and the plan for enriching the
schema with more semantics. See `model-xml-mapping.md` for the model itself.

## Goal

Give users and developers a way to understand the canonical ESPD model and how
each part of it maps to UBL XML. For every element in the model, show:

- its name and description (and metadata: type, enum, format, required, cardinality),
- its children, traversable (expand/collapse),
- an example of how that element (or subtree) is mapped to UBL XML.

Illustrative shape:

```
partIII — "Information concerning exclusion grounds and (later) selection criteria."
  maps to: <QualificationApplicationResponse> (document root)
  Children >
    exclusionGrounds — "Exclusion-ground criteria keyed by the stable criterion code ..."
      maps to: (container; children map individually)
      Children >
        exg-crim-part — "Participation in a criminal organisation"
          maps to: <cac:TenderingCriterion><cbc:ID>005eb9ed-...</cbc:ID> ... + response records
          Children >
            response > answer / convictions / electronicEvidence ...
```

## Approach

A generator (`docgen.mjs`, proposed) walks the instance-data JSON Schema and,
for each element, correlates it to the xml-mapping to show the XML output.

### Correlating a schema element to its mapping

The mapping's `from` paths are the same dotted semantic paths the schema
describes, with one wrinkle: inside a `forEach`/`records` rule, `from` is
RELATIVE to the array item (e.g. `dateOfConviction`, `selfCleaning.taken`),
while the `forEach` base is ABSOLUTE (e.g.
`partIII.exclusionGrounds.exg-crim-part.response.convictions`). So to find the
mapping for a schema path:

- absolute leaf paths match a rule's `value.from` / `key.from` directly;
- paths inside an array match `<forEach base> + "." + <entry-relative from>`.

### XML shown at every level (not just leaves)

- **Leaf element** → show its single mapping rule (`from → to`, with datatype
  and, for criterion responses, the property key / `ValidatedCriterionPropertyID`).
- **Aggregate element** (e.g. `exg-crim-part`, `response`) → show the SKELETON of
  the subtree it produces — i.e. the slice of `skeleton.mjs`'s output for that
  subtree. This reuses the existing skeleton generator rather than a new XML path.

### Output format

Self-contained **HTML** using native `<details>`/`<summary>` for the
collapsible tree (no JS, no dependencies, commit under `docs/`). Markdown is a
fallback but only GitHub renders `<details>`, and the tree experience is weaker.

### Reuse

- Element structure, descriptions, metadata: the JSON Schema (`instance-data/`).
- XML skeleton per subtree: `xml-mapping/skeleton.mjs` (already built).
- Cardinality caveats: as documented in `model-xml-mapping.md` (mapping-derived,
  not authoritative — see that file).

## Enhancing the schema for richer documentation

Descriptions currently live only in `description` on each property / `$def`.
That is the standard place and the generator will use it. To add more semantics,
in priority order:

1. **Fill gaps where there is no human description.** Dynamically-keyed elements
   lack one. Example: `exg-crim-part` is a property key under
   `exclusionGrounds.properties` whose node is just
   `{ "$ref": "#/$defs/convictionCriterion" }`, so the human name
   "Participation in a criminal organisation" is NOT in the schema (it lives in
   the reference-implementation part definition). Add per-criterion `title` +
   `description` at that property.

2. **Use `title` (short label) alongside `description` (long text).** JSON Schema
   supports both. Docs would show `title` as the heading and `description` as the
   body. Today only `description` is used.

3. **Custom annotation keywords** (additive; ignored by validation — ajv runs
   with `strict:false`, so unknown keywords do not affect validation):
   - `x-espdRef` / `x-requestPath` — the ESPD form path / e-Certis reference
     (e.g. `C01_exg-crim-part/QG1/Q1`), tying the element to the standard.
   - `x-regulation` — a legal citation (e.g. Directive 2014/24/EU Art. 57(1)).
   - `x-ublNote` — a prose note on a UBL mapping nuance (e.g. ONTRUE gating).
   - `x-example` — a canonical example value for the field.

4. **`examples`** (standard JSON Schema keyword) on leaf properties — sample
   values the generator can display; also improves `sample.mjs`.

## Suggested sequencing

1. Build `docgen.mjs` against the CURRENT schema (using `description`) + the
   mapping, to get the traversable doc immediately.
2. Decide which enhancements (title, `x-espdRef`, `x-regulation`, `examples`) are
   wanted; enrich the Part III schema as a template; the generator reads them.

## Open questions

- HTML vs Markdown output (recommended: HTML for the collapsible tree).
- Whether to define the annotation keyword set before building the generator, or
  build first and layer annotations after.
- Whether cardinalities in the doc should stay mapping-derived or be sourced from
  the schema's `required` / `minItems` / `maxItems` for accuracy (see the
  cardinality caveat in `model-xml-mapping.md`).
