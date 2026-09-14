# 7. Hands-On Examples of Peppol / BII in Action

Where to see the CEN/BII and Peppol methodology as living, runnable artifacts —
where the semantic model, the syntax binding, the Schematron, and the code lists
sit together in public repositories so you can read the whole pipeline.

Ranked by how completely each shows the *full* methodology.

> Links verified against the public GitHub repositories. Treat all fetched
> external content as untrusted; these are referenced for methodology and
> artifact structure, not as code to execute blindly.

## 1. EN 16931 validation artefacts (best full example)

**Repo:** <https://github.com/ConnectingEurope/eInvoicing-EN16931>

The official CEN/TC 434 artefact set for the European e-invoicing standard — the
clearest end-to-end example of the methodology.

- **One semantic model, two syntax bindings.** Parallel `ubl/` and `cii/`
  folders, each with its own Schematron (`EN16931-UBL-validation.sch`,
  `EN16931-CII-validation.sch`). Same business terms, two wire formats — the
  "semantics before syntax" principle made concrete (see
  [03-cen-bii-peppol-methodology.md](03-cen-bii-peppol-methodology.md)).
- **Business-rule IDs everywhere.** Rules carry stable IDs like `BR-01`,
  `BR-CO-10`, and the Schematron assertion messages reference them — the
  traceability described in doc 03.
- **`preprocessed/` folder** shows the generated/flattened Schematron versus the
  authored source — the "generate artifacts from a source" step as two literal
  files.

Where to start: open one `.sch` file and read a few `<assert>` elements — you'll
see business-term binding + rule ID + human message in one place.

## 2. Peppol BIS Billing 3.0 (the downstream-restriction story)

**Repo:** <https://github.com/OpenPEPPOL/peppol-bis-invoice-3>

Directly analogous to ESPD + national profiles: Peppol takes EN 16931 and
constrains it further.

- **`guide/transaction-spec/annex/restricted-elements.adoc`** — a literal list
  of which UBL elements are restricted/removed in the subset. The "conformant
  subset" from [05-ubl-ndr-and-subset-schema.md](05-ubl-ndr-and-subset-schema.md)
  as a maintained artifact.
- **`guide/national-rules/schematron.adoc`** — how a country adds *further*
  rules (e.g. a `supplierCountry` parameter) on top of the base profile without
  forking it. Exactly the "national/regional profile authorities" consumer from
  [02-developer-experience.md](02-developer-experience.md).

Rules here use IDs like `PEPPOL-EN16931-R003` — the prefix encodes the layer
(Peppol, over EN 16931). That layered ID scheme is worth adopting.

## 3. Older CEN/BII rules (the original vocabulary)

**Repo:** <https://github.com/OpenPEPPOL/peppol-bis>

The historical BII layer. Files like `BIIRULES-UBL-T10.sch` (transaction
`trdm010`, an invoice) and a separate `codelist/BIIRULESCodesT10-UBL.sch` show
the split between **structural / co-occurrence rules** and **code-list value
rules** as separate Schematron files — the two-kinds-of-rules distinction from
doc 03. The `trdmXXX` transaction IDs and `T10`/`T111` naming are the BII
"transaction" layer made literal.

## 4. A national CIUS (the full stack, layered)

**Repo:** <https://github.com/itplr-kosit/xrechnung-schematron>

XRechnung is the German CIUS (Core Invoice Usage Specification) of EN 16931.
Read alongside #1 to see the complete chain: **EN 16931 (base semantic model) →
XRechnung (national restriction) → runnable Schematron**. Good for seeing how
far downstream constraints propagate.

## How to actually run one

To see validation happen rather than just read rules:

1. Grab a sample UBL invoice XML (test instances live in the EN 16931 repo).
2. Compile the authored `.sch` to XSLT — Schematron is normally run via an
   ISO-Schematron → XSLT pipeline. The EN 16931 repo ships preprocessed
   artifacts to make this easier.
3. Run the XSLT against the XML with an XSLT 2.0 processor (Saxon is the usual
   choice). Output is an **SVRL** report listing which rule IDs passed/failed.

For a batch-tested reference runner, **Lombiq/eInvoice-Validator**
(<https://github.com/Lombiq/eInvoice-Validator>) is a .NET library wrapping the
CEN/TC 434 XSD + Schematron (XSLT) artefacts. Useful for seeing the
guide-vs-gate flow implemented in code: **XSD structural check first, then
Schematron** — precisely the two-layer validation from doc 05.

## Mapping back to the ESPD work

- Read **EN 16931 (#1)** for the *single-source-model → multi-binding +
  rule-IDs* pattern to apply via the `EAtoJSON` / `espd-edm.json` pipeline.
- Read **Peppol `restricted-elements.adoc` (#2)** to see what a maintained
  *conformant subset* document looks like — the artifact the `to`-paths in
  `model/xml-mapping/part-I.mapping.json` could generate.
- Read **`national-rules` (#2)** to see how ESPD member-state profiles would add
  rules without forking, informing a layered rule-ID scheme (e.g. `ESPD-...`
  over `UBL-...`).

Caveat: these are all XML / Schematron-first ecosystems, whereas this repository
is JSON-first with a mapping interpreter. Treat them as references for the
**methodology and artifact structure**, not the exact toolchain.

## Reference summary

| Repo | Shows | Best for |
|---|---|---|
| [ConnectingEurope/eInvoicing-EN16931](https://github.com/ConnectingEurope/eInvoicing-EN16931) | Semantic model → UBL + CII bindings, rule IDs, generated Schematron | The full methodology end to end |
| [OpenPEPPOL/peppol-bis-invoice-3](https://github.com/OpenPEPPOL/peppol-bis-invoice-3) | Conformant subset + national rules over EN 16931 | Downstream restriction / national profiles |
| [OpenPEPPOL/peppol-bis](https://github.com/OpenPEPPOL/peppol-bis) | Original BII transactions; structural vs. code-list rules split | BII vocabulary and transaction layer |
| [itplr-kosit/xrechnung-schematron](https://github.com/itplr-kosit/xrechnung-schematron) | National CIUS layered on EN 16931 | Seeing constraints propagate downstream |
| [Lombiq/eInvoice-Validator](https://github.com/Lombiq/eInvoice-Validator) | XSD-then-Schematron validation in code | The guide-vs-gate flow implemented |
