# `model/parts/` — hand-authored non-criteria part models

The compiler (`model/compiler/`) generates the model layers for **criteria**
(Parts III/IV/V) from `espd-edm.json`. The **administrative** parts — I (procedure
+ buyer), II (economic operator), VI (signature/declaration) — are *not* criteria:
they are UBL party/document aggregates, not the `CRITERION/QUESTION/REQUIREMENT`
component tree the compiler consumes. They are modelled here, by hand.

See `docs/model-xml-mapping.md` and the three-way comparison that led to this
split (the EA model and the live UI each shoehorn Part I into the criterion tree
in different, incompatible ways; this directory models it as what it actually is).

## Layout

```
parts/
├── partI/                   procedure + contracting authority (DONE — see partI/README.md)
│   ├── sectionA.*           publication reference
│   ├── sectionB.*           contracting authority (buyer)
│   └── sectionC.*           procurement procedure, project, lots
└── partII/                  economic operator (NEXT)
```

Each section is five files: `.schema.json` (instance-data), `.example.json`,
`.mapping.json` (instance → UBL), `.form.json` (presentation lens), `.test.mjs`.

## Conventions (as established by Part I)

- **Scope to the Schematron-mandated minimum**, then add optional fields
  deliberately. A field is `required` in the schema/form iff a Schematron rule
  makes it fatal; warning-level and unconstrained fields are optional. Document
  the scoping choice so it is not mistaken for an omission.
- **Codelists** follow `docs/codelist-governance.md`: a code field carries a
  `$codelist` / `codelist` marker; small lists are inlined as an enum (with
  `$codelistEnumIsImplementerChoice` iff not Schematron-validated), large lists
  are referenced by name. Enums are derived from the `.gc` via
  `../codelists/read-codelist.mjs` and guarded by a sync test.
- **Attribute sets** on code/identifier elements come from the codelist-attribute
  profile and expand via `expandCodelistAttributes` (shared with the compiler).
- Tests cover: schema validation, map/unmap roundtrip, UBL structure against the
  authoritative `ESPD-Request-BASE.xml`, codelist-attribute expansion, and enum
  sync.

Run: `npm run model:test` (includes `model/parts/`).
