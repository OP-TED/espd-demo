# ESPD Part I — Procedure and Contracting Authority

This document describes how selected Part I business concepts are represented in
the underlying UBL XML (the OASIS UBL `QualificationApplicationRequest` /
`QualificationApplicationResponse` documents).

Paths are given relative to the document root unless stated otherwise. Namespace
prefixes follow UBL convention:

- `cac:` — `urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2`
- `cbc:` — `urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2`

## Notice ID

**Definition.** The notice ID is the publication reference of the procurement
procedure — either a notice published on TED (Tenders Electronic Daily) or a
reference to a national publication. It identifies the procedure the ESPD relates
to.

**Location.** The reference is expressed as a `cac:AdditionalDocumentReference`
under the request document root:

```
/QualificationApplicationRequest
  └─ cac:AdditionalDocumentReference          [0..n]
       ├─ cbc:ID                              the notice identifier (or URL)
       ├─ cbc:DocumentTypeCode                TED_CN | NATIONAL
       └─ cac:Attachment                      [0..1]
            └─ cac:ExternalReference
                 └─ cbc:URI                   the notice URL
```

**Ordering.** Per the XSD, `cac:AdditionalDocumentReference` must appear *after*
the criteria (Parts III–V) in the request. Hand-authored XML that places it
earlier will fail schema validation.

**Distinguishing TED vs national.** The two cases use the same element and are
distinguished only by `cbc:DocumentTypeCode`:

| Reference type | `DocumentTypeCode` |
| -------------- | ------------------ |
| TED notice     | `TED_CN`           |
| National notice| `NATIONAL`         |

`cbc:DocumentTypeCode` is mandatory (Schematron `BR-COM-10-03`) and, being a
code, requires the `listID` / `listAgencyID` / `listVersionID` attributes
(`BR-OTH-01`). The codes come from the `DocRefContentType` codelist
(`ESPD-EDM/codelists`).

### TED notice reference

The notice number goes in `cbc:ID`, the type is `TED_CN`, and the TED URL, when
available, is carried in a nested `cac:Attachment`:

```xml
<cac:AdditionalDocumentReference>
  <cbc:ID schemeAgencyID="EU-COM-OP">123456-2024</cbc:ID>
  <cbc:DocumentTypeCode listID="DocRefContentType" listAgencyID="EU-COM-OP" listVersionID="5.0.0">TED_CN</cbc:DocumentTypeCode>
  <cac:Attachment>
    <cac:ExternalReference>
      <cbc:URI>https://ted.europa.eu/en/notice/123456-2024/xml</cbc:URI>
    </cac:ExternalReference>
  </cac:Attachment>
</cac:AdditionalDocumentReference>
```

The `cac:Attachment` block is emitted only when a URL is present; with just a
notice number you get `cbc:ID` and `cbc:DocumentTypeCode` alone.

### National notice reference

A national publication uses `DocumentTypeCode` `NATIONAL` and carries only the
identifier (no attachment):

```xml
<cac:AdditionalDocumentReference>
  <cbc:ID schemeAgencyID="EU-COM-OP">BOE-B-2024-12345</cbc:ID>
  <cbc:DocumentTypeCode listID="DocRefContentType" listAgencyID="EU-COM-OP" listVersionID="5.0.0">NATIONAL</cbc:DocumentTypeCode>
</cac:AdditionalDocumentReference>
```

(The `cbc:ID` value shown is an illustrative national reference format.)

### Model mapping

The form fields feeding this structure (form group `PI01`) map as follows
(`model/legacy/xml-mapping/part-I.mapping.json`):

| Form field | UBL target |
| ---------- | ---------- |
| `partI.publication.reference.identifier` | `cac:AdditionalDocumentReference/cbc:ID` |
| `partI.publication.reference.type` | `cac:AdditionalDocumentReference/cbc:DocumentTypeCode` |
| `partI.publication.reference.url` | `cac:AdditionalDocumentReference/cac:Attachment/cac:ExternalReference/cbc:URI` |

The mapping treats the notice identifier and URL as two facets of the *same*
reference — they map together into one `cac:AdditionalDocumentReference`, not as
alternatives.

### Implementation note

The current XML exporter (`js/xml-export.js`) emits these three cases as a
mutually exclusive chain — notice number, then a bare TED URL (used as the
`cbc:ID`), then a national reference. As a result a single export produces at
most **one** `AdditionalDocumentReference` from these fields, and cannot emit a
TED reference and a national reference together, even though the element's
cardinality is `0..n`. If both need to be represented in the same document, the
exporter's `else if` chain would need to become independent blocks.
