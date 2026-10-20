# Part VI — Concluding statements (signature)

Part VI is an **administrative block** (`type: INFORMATION`, EA `I73
info-signature`), not a criterion — so it is modelled **here** in
`model/parts/partVI/`, the same track as Part I and Part II's administrative
sections, not as a compiler sidecar.

It is **response-only**: it lives under `cac:Signature` of the
`QualificationApplicationResponse`.

## What we model

| Section | EA | What we model | UBL target | Doc |
|---|---|---|---|---|
| **A** signature | `I73 info-signature` → `SIG1/SP1/PL1` | `signatory{ physicalLocationName? }` | `cac:Signature/cac:SignatoryParty/cac:PhysicalLocation/cbc:Name` (RESPONSE) | `sectionA.*` |

The EA model is deliberately minimal: `SIGNATURE` (0..1) → `SignatoryParty`
(0..1) → `PhysicalLocation` (0..1), whose only leaf is `cbc:Name`. So the one
data-bearing field is the signatory party's physical-location name (the place of
signing). The whole block and its single field are optional — an unsigned
response is structurally valid.

## NOT grounded (caveat)

No Schematron rule and no `ESPD-Response-BASE.xml` instance constrain or
exemplify this block. The shape is derived from the EA `I73` model and UBL 2.4
`SignatureType`. **REVIEW against a real signed instance** when one is available
— the same situation Part I §A and Part II §B were in before samples existed.

This supersedes the earlier **P6-1** deferral in the `espd-notes` repo (`notes/improvement-ideas.md`)
(Part VI was previously parked as "one optional field, no sample"): it is now
modelled, with the no-sample caveat recorded here.

## Note on cryptographic signatures

This models the ESPD-EDM *data* for the signatory (a UBL `cac:Signature` party
block), **not** a cryptographic/digital signature (XML-DSig / XAdES) over the
document. Actual signing is a transport/packaging concern outside the
instance-data model.
