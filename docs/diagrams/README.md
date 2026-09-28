# Model diagrams (generated)

PlantUML diagrams of the experimental `model/`. **These files are generated — do
not edit by hand.** Regenerate with the commands below (run from
`espd-edm-reference-implementation/`).

| File | View | Generator |
|------|------|-----------|
| `part-*.model.puml` | Canonical instance-data model (class diagram from the JSON Schema) | `model/instance-data/uml.mjs` |
| `part-*.mapping.puml` | XML mapping correspondence (instance paths ↔ UBL elements) | `model/xml-mapping/mapping-uml.mjs` |
| `part-*.xml.puml` | UBL XML element structure (class per aggregate element, cardinalities), EA "Technical View" style | `model/xml-mapping/xml-uml.mjs` |

Regenerate:

```
node model/instance-data/uml.mjs part-III --out docs/diagrams/part-III.model.puml
node model/xml-mapping/mapping-uml.mjs part-III --out docs/diagrams/part-III.mapping.puml
node model/xml-mapping/xml-uml.mjs part-III --out docs/diagrams/part-III.xml.puml
```

(Repeat for `part-I` and `part-II`.)

Part IV (selection criteria) spans **two** UBL documents — the buyer REQUEST and
the EO RESPONSE — so it has one `model` diagram (from the single schema) but a
`request` and a `response` variant of the mapping and xml diagrams. The mapping
and xml generators accept an explicit spec filename for this:

```
node model/instance-data/uml.mjs part-IV --out docs/diagrams/part-IV.model.puml
node model/xml-mapping/mapping-uml.mjs part-IV.request.mapping.json  --out docs/diagrams/part-IV.request.mapping.puml
node model/xml-mapping/mapping-uml.mjs part-IV.response.mapping.json --out docs/diagrams/part-IV.response.mapping.puml
node model/xml-mapping/xml-uml.mjs     part-IV.request.mapping.json  --out docs/diagrams/part-IV.request.xml.puml
node model/xml-mapping/xml-uml.mjs     part-IV.response.mapping.json --out docs/diagrams/part-IV.response.xml.puml
```

Render with the PlantUML VS Code extension, `plantuml <file>.puml`, or the
plantuml.com server. See `../model-xml-mapping.md` for what the diagrams mean.
