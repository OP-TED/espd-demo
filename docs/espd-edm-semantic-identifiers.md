# Semantic Identifiers in the ESPD EDM

## Purpose

A semantic identifier is a stable join key for the same business concept across
the core criterion model, instance-data bindings, JSON Schema, XML mappings,
forms, validation rules and documentation.

The assignment rule used by the C31 proof of concept is:

> Give semantic IDs to criteria and value-bearing business components, but not
> to purely structural or compatibility nodes.

## Which elements receive an ID

The criterion itself receives an ID. Every `REQUIREMENT` and `QUESTION` also
receives one because it represents a business value which can participate in a
binding or downstream artifact.

C31 has:

- one criterion ID;
- four requirement IDs; and
- thirteen question IDs.

The component naming convention is:

```text
<criterion-code>.<business-meaning>
```

Examples include:

```text
slc-stand-to-spec-avg.minimum-amount
slc-stand-to-spec-avg.fulfilled-by-itself
slc-stand-to-spec-avg.turnover-amount
slc-stand-to-spec-avg.trading-start-date
slc-stand-to-spec-avg.additional-evidence-id
```

The ID deliberately contains neither an EA tag nor a structural location. For
example, `slc-stand-to-spec-avg.minimum-amount` remains stable if `RQ3` is
renumbered, a group is inserted, or C31 moves within the EA hierarchy.

## Which elements do not receive an ID

Purely structural nodes do not currently receive semantic IDs:

- `REQUIREMENT_GROUP` and `REQUIREMENT_SUBGROUP`;
- `QUESTION_GROUP` and `QUESTION_SUBGROUP`; and
- tags such as `RG1`, `RSG1` and `QSG1` which organize values or conditional
  branches.

Compatibility and scaffold nodes also have no independent semantic ID:

- `PPLR1`, the lot-reference projection;
- `SBC1`, the national-subcriterion placeholder; and
- `L1`, the legislation placeholder.

`PPLR1` does not own a second lot value. It is an XML projection of the value
identified by `slc-stand-to-spec-avg.lot-identifiers`. Likewise, an electronic-
evidence group has no ID of its own; its availability question and evidence
reference question have separate value-bearing IDs.

This policy may be extended if a structural group later needs to be targeted
independently by a business rule or documentation link. An ID should be added
because the node has acquired a stable semantic role, not merely because it
exists in the tree.

### Extension: repeatable groups own an array container (adopted)

A `REQUIREMENT_SUBGROUP`/`QUESTION_SUBGROUP` with EA cardinality `0..n` / `1..n`
that holds value leaves is a **repeatable group**: in the instance data it
becomes an array of objects (for example C01 `convictions[]`, C34 `periods[]`
each containing `ratios[]`). Such a group has acquired exactly the "stable
semantic role" this policy anticipates — it owns the array container that its
leaves are elements of — so it receives a semantic ID and an instance binding:

```json
"C01_exg-crim-part/QG1/QSG1": {
  "id": "exg-crim-part.convictions",
  "instanceBinding": { "side": "response", "path": ["convictions"], "repeatable": true }
}
```

This is the one case where a group node is bound. Non-repeatable structural
groups (the common case) still receive no ID. The binding's `repeatable: true`
flag and the EA cardinality must agree; the overlay enforces this. A repeatable
group that carries both buyer and economic-operator leaves records its array
container on both the `requirement` and `response` sides.

Note the per-lot `RG1 1..n` is NOT such a case: lots are a document-level
reference mechanism (one Request per procedure, one Response per lot), so `RG1`
is flattened rather than treated as a repeatable group — it keeps no ID.

## Relationship to other identifiers

| Identifier | Responsibility |
|---|---|
| `id` | Stable semantic identity and cross-artifact join key. |
| `code` | Normative ESPD criterion code used in the exchange. |
| `uuid` | Criterion identifier emitted in UBL XML. |
| `tag` | EA-local structural label such as `RQ3` or `QSG1`. |
| `requestpath` | Complete structural location used by ESPD path-like XML IDs. |

The criterion `id` currently equals its `code`, but the concepts remain
separate. Requirements and questions do not have equivalent normative criterion
codes, which makes their semantic IDs especially important.

An EA path such as:

```text
C31_slc-stand-to-spec-avg/RG1/RSG1/RQ3
```

describes where a component currently appears. It is useful for EA correlation
and XML IDs but is not a stable semantic identity.

## Joining projection artifacts

The core criterion owns the identity and meaning:

```json
{
  "id": "slc-stand-to-spec-avg.minimum-amount",
  "kind": "requirement",
  "valueType": "MINIMUM_AMOUNT"
}
```

The separate instance-data projection uses that ID as its key:

```json
{
  "slc-stand-to-spec-avg.minimum-amount": {
    "side": "requirement",
    "path": ["minimumAmount"]
  }
}
```

The same ID can join a JSON Schema property, XML mapping, form field,
validation rule and documentation entry without depending on an EA path.

## Validation policy

The proof-of-concept validator enforces that:

- every `QUESTION` and `REQUIREMENT` has a semantic ID;
- semantic IDs are unique (across criterion, value leaves, and any bound
  repeatable groups);
- every semantic value node has an instance binding;
- every binding refers to an existing semantic ID;
- no binding is unused;
- requirements bind to the `requirement` side;
- questions bind to the `response` side;
- a bound GROUP is a repeatable group (its binding carries `repeatable: true`
  and its EA cardinality is `0..n` / `1..n`); and
- every semantic value node refers to a defined value type.

The executable implementation is under `model/edm/poc/c31/`. The broader
question of which enrichment can be inferred from the EA export is covered in
[Keeping espd-edm.json as the Primary Input](espd-edm-primary-input-enrichment.md).
