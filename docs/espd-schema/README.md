# Defining the ESPD Exchange Data Model as an Application Profile over UBL

This folder documents the design discussion around **how to define the ESPD
Exchange Data Model (EDM) as an application profile (a conformant subset) over
UBL**, specifically over `QualificationApplicationRequest` and
`QualificationApplicationResponse`.

It captures the reasoning, the options considered, their developer-experience
tradeoffs, and how they relate to the artifacts already present in this
repository (the JSON instance model, the XML mapping, the form structure, and
the Genericode code lists).

## Contents

| Document | What it covers |
|---|---|
| [01-defining-the-application-profile.md](01-defining-the-application-profile.md) | The core question: is UML + Schematron the best way to define a UBL subset, and what alternatives exist. |
| [02-developer-experience.md](02-developer-experience.md) | Rating each approach on human-straightforwardness, machine-automatability, and discoverability. Guide vs. gate. Consumers of ESPD-EDM. |
| [03-cen-bii-peppol-methodology.md](03-cen-bii-peppol-methodology.md) | How the CEN/BII and Peppol layered modelling methodology works, and how it maps to ESPD. |
| [04-encoding-the-form-layer.md](04-encoding-the-form-layer.md) | How the form-structure lens fits as another binding over the same semantic core, grounded in the repo's actual files. |
| [05-ubl-ndr-and-subset-schema.md](05-ubl-ndr-and-subset-schema.md) | The UBL customization / NDR + restricted-subset-schema approach and its DX implications. |
| [06-ubl-extensions-in-espd.md](06-ubl-extensions-in-espd.md) | Whether ESPD uses `UBLExtensions`, and whether extensions are defined for `QualificationApplicationResponse`. |
| [07-hands-on-examples.md](07-hands-on-examples.md) | Public repositories where the Peppol / BII / EN 16931 methodology can be seen and run in practice. |
| [08-comparison-ndr-vs-bii.md](08-comparison-ndr-vs-bii.md) | Comparing the NDR + subset-schema approach with CEN/BII modeling for ESPD. |
| [09-generating-the-subset-schema.md](09-generating-the-subset-schema.md) | Whether the subset schema can really be generated from the BII semantic layer — what is and isn't generatable. |
| [10-recommendation-and-next-steps.md](10-recommendation-and-next-steps.md) | The consolidated recommendation and the single best next step to make ESPD maximally useful. |
| [11-eforms-efx-and-bii-scope.md](11-eforms-efx-and-bii-scope.md) | How eForms and EFX relate to BII/Peppol, and what concrete formats/specs the lineage defines. |

## Status

These documents are **design notes / rationale**, not normative specification.
They are intended to inform decisions about how the ESPD-EDM profile is
authored, validated, and published.

## One-paragraph summary

The current ESPD approach — a UML model describing how each information element
is encoded under `QualificationApplicationRequest/Response`, plus Schematron
rules for tighter validation — is a legitimate, standards-aligned way to define
a UBL application profile. The strongest improvement is not changing that
approach but **formalizing traceability**: giving every information element a
stable ID and treating the UBL binding, the form binding, the code-list
binding, and the business rules as artifacts **generated from (or cross-checked
against) one identified source model**. This is the CEN/BII and Peppol pattern,
and this repository is already structured very close to it.
