# Model diagrams (generated)

PlantUML diagrams of the experimental `model/`. **These files are generated — do
not edit by hand.** Regenerate with the commands below (run from
`espd-edm-reference-implementation/`).

| File | View | Generator |
|------|------|-----------|
| `part-*.model.puml` | Canonical instance-data model (class diagram from the JSON Schema) | `model/instance-data/uml.mjs` |
| `part-*.mapping.puml` | XML mapping correspondence (instance paths ↔ UBL elements) | `model/xml-mapping/mapping-uml.mjs` |

Regenerate:

```
node model/instance-data/uml.mjs part-III --out docs/diagrams/part-III.model.puml
node model/xml-mapping/mapping-uml.mjs part-III --out docs/diagrams/part-III.mapping.puml
```

(Repeat for `part-I` and `part-II`.)

Render with the PlantUML VS Code extension, `plantuml <file>.puml`, or the
plantuml.com server. See `../model-xml-mapping.md` for what the diagrams mean.
