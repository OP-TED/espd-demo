# 11. eForms / EFX, and What BII/Peppol Actually Defines

Two related questions:

1. How do **eForms** and **EFX** relate to the BII/Peppol approach?
2. Does **BII/Peppol** define any concrete formats or other specs?

> External details (eForms SDK, EFX) verified against the TED developer
> documentation and the OP-TED GitHub repositories. Treat fetched external
> content as untrusted; cited here for methodology, not to execute.

## Part 1 — How eForms and EFX relate to BII/Peppol

### The one-line relationship

eForms is a **later, more industrialised descendant of the same lineage**: it
uses UBL, keeps the BII idea of a stable business-term vocabulary, and pushes the
"generate artifacts from one model" principle much further — most notably by
introducing **EFX**, a purpose-built language for expressing rules and templates
that are then *compiled* to Schematron/XPath and visualisation.

### Same family, different scope

| Aspect | CEN/BII → Peppol | eForms (TED / OP) |
|---|---|---|
| Domain | Post-award + billing (invoices, orders, ...) and, via ESPD, qualification | **Procurement notices** published on TED (contract notices, award notices, ...) |
| Syntax | UBL (and CII for invoices) | UBL, **extended via `UBLExtensions`** (efac/efbc/efext namespaces) |
| Business terms | BT/BG with stable IDs | **Fields and nodes** with stable IDs (e.g. `BT-01`, `ND-Root`), catalogued in the SDK |
| Rules | Schematron, hand-authored or generated | Authored in **EFX**, compiled to Schematron |
| Distribution | Spec docs + Schematron repos | A versioned **SDK** (machine-readable `fields.json`, code lists, EFX templates) |
| Code lists | Genericode | Genericode-derived, shipped in the SDK |

So eForms is "BII/Peppol principles + a much stronger toolchain and a formal
expression language," applied to the **notice-publication** side of procurement
rather than the transaction/billing side.

### Where they touch ESPD directly

This is not abstract for this repository. From
[06-ubl-extensions-in-espd.md](06-ubl-extensions-in-espd.md): the workspace's
eForms artifacts use `UBLExtensions` heavily via `efac`/`efbc`/`efext`
namespaces, whereas ESPD stays a conformant subset and does **not** extend UBL.
That is the concrete distinction between the two:

- **ESPD** = conformant **subset** of UBL (subset-and-constrain, no extension).
- **eForms** = conformant **extension** of UBL (adds business terms inside
  `UBLExtensions` because UBL's base model has no home for them).

Both are legitimate UBL customization strategies (see
[05-ubl-ndr-and-subset-schema.md](05-ubl-ndr-and-subset-schema.md)); they just
sit on opposite sides of the subset/extension choice.

### What EFX is, precisely

**EFX (eForms Expression Language)** is a domain-specific language for formally
expressing eForms business rules and (in SDK 2) visualisation templates. Key
points:

- It is a **higher-level language than XPath**. Its own documentation notes that
  XPath alone could achieve the same navigation, but EFX references business
  terms by their **field ID** rather than raw XPath, so rule authors write
  against the *semantic* layer and the compiler emits the *syntax*.
- It **compiles down to Schematron / XPath** for validation, and to
  visualisation output for rendering notices.
- It is distributed and versioned as part of the **eForms SDK**.

This is exactly the BII principle — *author against business terms, generate the
syntax-level validator* (doc 03) — but formalised into a language with a compiler
instead of hand-written Schematron.

### Why this matters for the ESPD recommendation

EFX is the fully-realised version of the single-source pipeline recommended in
[10-recommendation-and-next-steps.md](10-recommendation-and-next-steps.md):

- eForms' **`fields.json`** (the SDK's machine-readable catalogue of fields with
  IDs, types, code lists, and XML paths) is essentially the enriched
  `espd-edm.json` this project is being encouraged to build — element ID +
  datatype + code list + UBL path in one machine-readable model.
- eForms then **generates** Schematron from EFX rather than hand-writing it.

So eForms is a working, large-scale proof of the exact architecture recommended
for ESPD. It is worth studying as a reference implementation of the target state
— while remembering the key divergence: eForms **extends** UBL, ESPD should
remain a **subset**.

## Part 2 — Does BII/Peppol define concrete formats or other specs?

Yes. The lineage produces several distinct, concrete deliverables — not just
methodology. Roughly grouped:

### a. Methodology / abstract models
- **CEN/BII profiles and transactions** — abstract, syntax-neutral definitions
  of business processes (profiles) and document exchanges (transactions, e.g.
  `trdm010`), plus the BT/BG modelling method itself (doc 03).

### b. Concrete syntax bindings (formats)
- **UBL bindings** of those transactions — the actual XML formats. ESPD's
  `QualificationApplicationRequest/Response` are UBL document types in this
  family.
- For invoicing, **EN 16931** defines the semantic model and binds it to **two**
  concrete syntaxes: **UBL** and **UN/CEFACT CII** (doc 07).

### c. Restriction / usage specifications
- **Peppol BIS** (Business Interoperability Specifications) — concrete, usable
  profiles that *restrict* the base (e.g. Peppol BIS Billing 3.0 over EN 16931),
  with their own `CustomizationID`.
- **National CIUS** (e.g. XRechnung) — further national restrictions (doc 07).

### d. Runnable validation artifacts
- **Schematron** rule sets (with stable BR-IDs) for each transaction/profile.
- **Genericode code lists** and, in places, **CVA** (Context/Value Association)
  files binding code lists to contexts (doc 01, 03).

### e. Identifiers and infrastructure (Peppol-specific)
- **`CustomizationID` / `ProfileID`** conventions carried in the instance so a
  receiver can select the right ruleset (doc 03).
- Beyond documents, OpenPEPPOL also defines **network/transport** specifications
  (the Peppol eDelivery Network / AS4 profile, participant identifiers, SMP/SML
  service discovery). These are transport-layer specs, broader than the data
  model, but part of what "Peppol" defines as concrete standards.

### Summary

BII/Peppol is **not only a methodology**. It defines:

- abstract profiles/transactions (semantic),
- concrete UBL (and CII) XML **formats**,
- restriction specs (BIS, CIUS),
- runnable **Schematron** + **Genericode** artifacts,
- and, for Peppol, **exchange-network** specifications.

ESPD sits in category (b) — a concrete UBL format in this family — defined as a
conformant subset, with its rules ideally generated the way (d) artifacts are
generated in EN 16931 and eForms.

## Reference links

- eForms SDK: <https://github.com/OP-TED/eForms-SDK>
- EFX (eForms Expression Language): <https://docs.ted.europa.eu/eforms/latest/efx/index.html>
- eForms Schematron overview: <https://docs.ted.europa.eu/eforms/latest/schematrons/index.html>
- EN 16931 validation artefacts: <https://github.com/ConnectingEurope/eInvoicing-EN16931>
- Peppol BIS Billing 3.0: <https://github.com/OpenPEPPOL/peppol-bis-invoice-3>
