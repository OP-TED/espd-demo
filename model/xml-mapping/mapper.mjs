// EXPERIMENTAL — correspondence-style mapping engine (PoC).
//
// A single mapping spec drives BOTH directions:
//   export (map):   instance JSON --> UBL XML
//   import (unmap):  UBL XML      --> instance JSON
//
// Each rule is a correspondence between a source path in the instance data
// (`from`) and a target element path in the UBL tree (`to`). The engine reads
// rules left-to-right for export and right-to-left for import.
//
// Dependency-free and environment-neutral: export builds an intermediate tree
// of plain objects; import parses XML into the same intermediate tree. The tree
// <-> string serialization is the only piece that would be swapped for the
// browser DOM (DOMParser / XMLSerializer).

// =========================================================================
// Shared path helpers
// =========================================================================

/** Resolve a dotted path (e.g. "partI.procedure.title") against an object. */
export function resolve(data, dottedPath) {
  return dottedPath.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), data);
}

/**
 * Set a value at a dotted path, creating intermediate containers as needed.
 * A numeric segment (e.g. the `0` in `convictions.0.reason`) creates/uses an
 * ARRAY at the parent, so array-indexed paths reconstruct real arrays rather
 * than objects with numeric string keys.
 */
export function setPath(target, dottedPath, value) {
  const keys = dottedPath.split('.');
  const isIndex = (k) => /^\d+$/.test(k);
  let current = target;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextIsIndex = isIndex(keys[i + 1]);
    if (current[key] == null || typeof current[key] !== 'object') {
      current[key] = nextIsIndex ? [] : {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

/** A rule is "real" (not just a comment placeholder) if it can emit output. */
function isRealRule(rule) {
  if (!rule) return false;
  if (rule.structure) return true;                         // embedded XML-structure subtree
  if (rule.records) return true;                           // generic keyed record set
  if (rule.to && (rule.from || rule.forEach)) return true; // value / forEach rule
  if (rule.to && rule.const !== undefined) return true;    // constant value rule
  return false;
}

// =========================================================================
// Intermediate element tree
//   node: { name, attributes: {}, children: [], text: string|undefined }
// =========================================================================

function makeNode(name) {
  return { name, attributes: {}, children: [], text: undefined };
}

/** Descend/create a path of elements, reusing existing same-named children. */
function ensurePath(root, segments) {
  let current = root;
  for (const name of segments) {
    let next = current.children.find(c => c.name === name);
    if (!next) {
      next = makeNode(name);
      current.children.push(next);
    }
    current = next;
  }
  return current;
}

/** Find a node at a path without creating anything. Returns node or undefined. */
function findPath(root, segments) {
  let current = root;
  for (const name of segments) {
    if (!current) return undefined;
    current = current.children.find(c => c.name === name);
  }
  return current;
}

/**
 * Append a brand-new sibling node at `segments`, WITHOUT reusing an existing
 * same-named node for the final segment (unlike ensurePath). Intermediate
 * segments still reuse/create via ensurePath. Used for repeatable elements,
 * where each occurrence must be a distinct node rather than merged into one.
 */
function appendPath(root, segments) {
  const containerSegments = segments.slice(0, -1);
  const repeatingName = segments[segments.length - 1];
  const container = containerSegments.length ? ensurePath(root, containerSegments) : root;
  const node = makeNode(repeatingName);
  container.children.push(node);
  return node;
}

/**
 * Find ALL sibling nodes matching `segments` (not just the first), for the
 * final segment only. Intermediate segments are navigated as a single path
 * (reused container), matching how appendPath builds repeated elements under
 * one shared container.
 */
function findAllPaths(root, segments) {
  const containerSegments = segments.slice(0, -1);
  const repeatingName = segments[segments.length - 1];
  const container = containerSegments.length ? findPath(root, containerSegments) : root;
  if (!container) return [];
  return container.children.filter(c => c.name === repeatingName);
}

function namespaceAttributes(namespaces) {
  const attrs = {};
  for (const [prefix, uri] of Object.entries(namespaces || {})) {
    attrs[prefix === '' ? 'xmlns' : `xmlns:${prefix}`] = uri;
  }
  return attrs;
}

// =========================================================================
// EXPORT: instance JSON --> intermediate tree --> XML string
// =========================================================================

function guardPasses(rule, context) {
  if (!rule.when) return true;
  return resolve(context, rule.when.path) === rule.when.equals;
}

function resolveAttr(attrValue, context) {
  if (attrValue && typeof attrValue === 'object' && 'from' in attrValue) {
    return resolve(context, attrValue.from);
  }
  return attrValue;
}

/**
 * Apply one {from, to, attributes?, when?} rule under `container`, resolving
 * paths against `context`. This is the single-value export step, and it is
 * intentionally context-agnostic: `context` is the full instance data for a
 * top-level rule, or one array entry for a field nested inside a `forEach`
 * item — the rule shape and logic are identical either way.
 */
function applyValueRule(container, rule, context) {
  if (!guardPasses(rule, context)) return;

  // A `const` rule emits a fixed value (criterion metadata such as the type
  // code or name) that is not sourced from instance data. When a rule has both
  // `const` and `from`, the `from` value wins if present, else the const.
  const value = rule.from !== undefined ? resolve(context, rule.from) : undefined;
  const effective = value !== undefined && value !== null && value !== '' ? value : rule.const;
  if (effective === undefined || effective === null || effective === '') return;

  const leaf = ensurePath(container, rule.to.split('/'));
  leaf.text = String(effective);

  if (rule.attributes) {
    for (const [attrName, attrValue] of Object.entries(rule.attributes)) {
      const resolved = resolveAttr(attrValue, context);
      if (resolved !== undefined && resolved !== null) {
        leaf.attributes[attrName] = String(resolved);
      }
    }
  }
}

export function buildTree(spec, data) {
  const root = makeNode(spec.target.root);
  root.attributes = namespaceAttributes(spec.target.namespaces);

  for (const rule of spec.rules) {
    if (!isRealRule(rule)) continue;

    if (rule.structure) {
      buildStructure(root, rule.structure, data);
      continue;
    }

    if (rule.records) {
      buildRecords(root, rule, data);
      continue;
    }

    if (rule.forEach) {
      buildForEach(root, rule, data);
      continue;
    }

    applyValueRule(root, rule, data);
  }
  return root;
}

// =========================================================================
// Embedded `structure` subtree
//
// A `structure` rule carries a nested tree that mirrors the target XML 1:1 —
// each node names its `element`, optional `attributes`, and is either a fixed
// leaf (`const`), a data-bound leaf (`from`), a repeated element (`forEach` +
// `fromItem`/children), or a container (`children`). Unlike the slash-path
// value rules, sibling elements are always created as DISTINCT nodes, so the
// same element name can repeat. Structure/const nodes carry no instance data;
// only `from`/`fromItem` leaves and data-sourced attributes roundtrip.
//   node: { element, attributes?, const?, from?, type?, forEach?, fromItem?, children? }
// =========================================================================

/** Set constant + data-sourced attributes on a node from a spec `attributes` map. */
function setStructureAttributes(node, attributes, context) {
  for (const [name, value] of Object.entries(attributes || {})) {
    const resolved = resolveAttr(value, context);
    if (resolved !== undefined && resolved !== null) node.attributes[name] = String(resolved);
  }
}

/** Resolve a structure leaf's text value against `context` (from wins over const). */
function structureLeafText(specNode, context) {
  if (specNode.fromItem !== undefined) {
    const v = specNode.fromItem === '.' ? context : resolve(context, specNode.fromItem);
    return v;
  }
  if (specNode.from !== undefined) {
    const v = resolve(context, specNode.from);
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return specNode.const;
}

/** EXPORT one structure node (and its subtree) as a NEW child of `parent`. */
function buildStructure(parent, specNode, context) {
  // A repeated element: one instance per array item; descendant from/fromItem
  // resolve against the item.
  if (specNode.forEach !== undefined) {
    const items = resolve(context, specNode.forEach);
    if (!Array.isArray(items)) return;
    for (const item of items) {
      buildStructureOne(parent, specNode, item);
    }
    return;
  }
  buildStructureOne(parent, specNode, context);
}

/** Emit exactly one element node for `specNode` under `parent`. */
function buildStructureOne(parent, specNode, context) {
  const el = makeNode(specNode.element);
  parent.children.push(el);
  setStructureAttributes(el, specNode.attributes, context);

  if (specNode.children) {
    for (const child of specNode.children) buildStructure(el, child, context);
    return;
  }

  // Leaf: constant or data-bound text.
  const value = structureLeafText(specNode, context);
  if (value !== undefined && value !== null && value !== '') {
    el.text = valueToText(value);
  }
}

/** Coerce an instance value to XML text; only booleans need care on import. */
function valueToText(value) {
  return String(value);
}
function textToValue(text, type) {
  if (type === 'boolean') return text === 'true';
  if (type === 'number') return Number(text);
  return text;
}

// =========================================================================
// Generic `records` construct
//
// A `records` rule emits a repeated "record" wrapper element. Each record has:
//   - a `key`: an identifier element (rule.key.to) with an optional scheme
//     attribute set (rule.key.attributes) — the record's cross-reference id.
//   - a `body`: exactly one of (per Schematron BR-TCR-03 for ESPD, but the
//     engine does not know that): a typed `value`, a nested `object` (its fields
//     mapped to child elements under a wrapper), or `references` (repeated
//     cross-reference elements pointing at another record set by key).
//
// The engine hardcodes NO element names: the record wrapper, key element, key
// attributes, and all body target paths are supplied by the spec. Two forms:
//   - `entries`: a fixed list of records (each entry has its own key + body).
//   - `forEach` + `entries`: the entries-set is expanded once per instance-array
//     item; records then share key ids across occurrences and are split back into
//     array items by DOCUMENT ORDER on import.
//   - `forEach` + `item.fields`: one record per array item, all fields inside it
//     (the "aggregate record" form, e.g. evidence documents). `key` may map a
//     field to the key element via `key.from`.
// =========================================================================

/** Set the key identifier element (+ scheme attributes) on a record node. */
function emitKey(node, keySpec, keyValue) {
  const leaf = ensurePath(node, keySpec.to.split('/'));
  leaf.text = String(keyValue);
  for (const [attrName, attrValue] of Object.entries(keySpec.attributes || {})) {
    leaf.attributes[attrName] = String(attrValue);
  }
}

/** Emit one entry's body branch (value | object | references) under `node`. */
function emitEntryBody(node, entry, context, data) {
  if (entry.value) {
    const value = resolve(context, entry.value.from);
    if (value === undefined || value === null || value === '') return false;
    const leaf = ensurePath(node, entry.value.to.split('/'));
    leaf.text = valueToText(value);
    // Optional attributes on the value leaf: a constant (e.g. unitCode="YEAR")
    // or a data-sourced { from } (e.g. currencyID from the instance data).
    for (const [attrName, attrValue] of Object.entries(entry.value.attributes || {})) {
      const resolved = resolveAttr(attrValue, context);
      if (resolved !== undefined && resolved !== null) leaf.attributes[attrName] = String(resolved);
    }
    return true;
  }
  if (entry.object) {
    // Generic nested-object body: map an object's fields to child elements under
    // a wrapper. `from` is the object; `to` is the wrapper element; `fields` map
    // sub-paths to child element paths. Emitted only if at least one field has a
    // value (so an all-empty object produces nothing). Replaces the former
    // period-specific branch (a period is just {startDate,endDate} -> children).
    const obj = resolve(context, entry.object.from);
    if (obj === undefined || obj === null) return false;
    const wrap = ensurePath(node, entry.object.to.split('/'));
    let any = false;
    for (const field of entry.object.fields || []) {
      if (!field.from || !field.to) continue;
      const value = resolve(obj, field.from);
      if (value === undefined || value === null || value === '') continue;
      ensurePath(wrap, field.to.split('/')).text = valueToText(value);
      any = true;
    }
    return any;
  }
  if (entry.references) {
    // Resolve the evidence array against `context`: for a flat entry `context`
    // IS the document data (so an absolute path works); for an entry inside a
    // `forEach` records rule `context` is the current array ITEM, so the path is
    // item-relative (task 7.0c — evidence inside a repeatable group).
    const items = resolve(context, entry.references.forEach);
    if (!Array.isArray(items)) return false;
    const values = items
      .map(item => resolve(item, entry.references.key))
      .filter(v => v !== undefined && v !== null && v !== '');
    if (values.length === 0) return false;
    const segments = entry.references.to.split('/');
    for (const value of values) {
      const ref = appendPath(node, segments.slice(0, -1));
      ensurePath(ref, segments.slice(-1)).text = String(value);
    }
    return true;
  }
  return false;
}

/** Emit one record (wrapper + key + one entry body) if the body is present. */
function emitEntryRecord(root, rule, entry, context, data) {
  // Peek whether the body will produce output before creating the wrapper,
  // so absent optional fields don't emit empty records.
  const probe = makeNode('probe');
  if (!emitEntryBody(probe, entry, context, data)) return;

  const node = appendPath(root, rule.records.split('/'));
  emitKey(node, rule.key, entry.key);
  emitEntryBody(node, entry, context, data);
}

/** EXPORT one `records` rule. */
/**
 * Resolve an array that may be reached THROUGH one or more enclosing arrays. A
 * path segment `foo[]` means "for each element of foo, descend"; the results are
 * flattened. So `a[].b[].c` collects every `c` across all a-items and b-items.
 * A plain dotted path (no `[]`) resolves normally. Used for document-level record
 * sets whose source array is nested inside a repeatable group (task 7.0c).
 */
function resolveFlattened(data, dottedPath) {
  const segs = dottedPath.split('.');
  let current = [data];
  for (const seg of segs) {
    const isArray = seg.endsWith('[]');
    const name = isArray ? seg.slice(0, -2) : seg;
    const next = [];
    for (const ctx of current) {
      const v = ctx == null ? undefined : ctx[name];
      if (v === undefined || v === null) continue;
      if (isArray) { if (Array.isArray(v)) next.push(...v); }
      else next.push(v);
    }
    current = next;
  }
  return current;
}

function buildRecords(root, rule, data) {
  if (rule.forEach && rule.item?.fields) {
    // Aggregate-record form: one record per array item, all fields inside it.
    // A `[]` in the forEach path flattens across enclosing arrays (7.0c).
    const items = rule.forEach.includes('[]')
      ? resolveFlattened(data, rule.forEach)
      : resolve(data, rule.forEach);
    if (!Array.isArray(items) || items.length === 0) return;
    for (const item of items) {
      const node = appendPath(root, rule.records.split('/'));
      if (rule.key?.from !== undefined) emitKey(node, rule.key, resolve(item, rule.key.from));
      for (const field of rule.item.fields) {
        if (!field.from || !field.to) continue;
        applyValueRule(node, field, item);
      }
    }
    return;
  }

  if (rule.forEach && rule.item?.path) {
    // Scalar-item form: one record per SCALAR array item, all records sharing
    // the same fixed `key`, the item's value in a single body element named by
    // `item.path`. Used for repeated same-id requirement properties such as the
    // lot identifiers (C31/RG1/RQ1, LOT_IDENTIFIER 1..n) -> repeated
    // cac:TenderingCriterionProperty each with one cbc:ExpectedID.
    const items = resolve(data, rule.forEach);
    if (!Array.isArray(items) || items.length === 0) return;
    for (const item of items) {
      if (item === undefined || item === null || item === '') continue;
      const node = appendPath(root, rule.records.split('/'));
      if (rule.key?.to !== undefined && rule.key.key !== undefined) emitKey(node, rule.key, rule.key.key);
      const leaf = ensurePath(node, rule.item.path.split('/'));
      leaf.text = valueToText(item);
      for (const [attrName, attrValue] of Object.entries(rule.item.attributes || {})) {
        const resolved = resolveAttr(attrValue, item);
        if (resolved !== undefined && resolved !== null) leaf.attributes[attrName] = String(resolved);
      }
    }
    return;
  }

  if (rule.forEach) {
    // Per-item entries form: expand the entries-set once per array item.
    const items = resolve(data, rule.forEach);
    if (!Array.isArray(items)) return;
    for (const item of items) {
      for (const entry of rule.entries) emitEntryRecord(root, rule, entry, item, data);
    }
    return;
  }

  // Fixed entries form.
  for (const entry of rule.entries) emitEntryRecord(root, rule, entry, data, data);
}

/** Read one entry's body from a record node into `target`. Returns true if present.
 * `root` is the document root, needed to resolve `references.resolve` against the
 * shared referenced record set (e.g. cac:Evidence). */
function readEntryBody(node, entry, target, root) {
  if (entry.references) {
    // Read the cross-reference ids in THIS record (e.g. cac:EvidenceSupplied/cbc:ID).
    const segments = entry.references.to.split('/');
    const refNodes = findAllPaths(node, segments.slice(0, -1));
    const leafName = segments[segments.length - 1];
    const ids = refNodes
      .map(r => findPath(r, [leafName])?.text)
      .filter(v => v !== undefined);
    if (ids.length === 0) return false;

    if (entry.references.resolve && root) {
      // Rebuild the full objects for THIS block by joining the referenced ids to
      // the shared record set (e.g. cac:Evidence). This makes each `references`
      // block authoritative for which records belong to it — necessary when
      // several blocks share one document-level record set.
      const rr = entry.references.resolve;
      const recordNodes = findAllPaths(root, rr.records.split('/'));
      const byId = new Map();
      for (const rn of recordNodes) {
        const idText = findPath(rn, rr.key.to.split('/'))?.text;
        if (idText !== undefined) byId.set(idText, rn);
      }
      const items = ids.map(id => {
        const obj = {};
        setPath(obj, rr.key.from, id);
        const rn = byId.get(id);
        if (rn) {
          for (const field of rr.fields || []) {
            if (!field.from || !field.to) continue;
            const leaf = findPath(rn, field.to.split('/'));
            if (leaf && leaf.text !== undefined) setPath(obj, field.from, leaf.text);
          }
        }
        return obj;
      });
      setPath(target, entry.references.forEach, items);
    }
    return true;
  }
  if (entry.value) {
    const leaf = findPath(node, entry.value.to.split('/'));
    if (!leaf || leaf.text === undefined) return false;
    setPath(target, entry.value.from, textToValue(leaf.text, entry.value.type));
    // Restore any data-sourced ({ from }) attributes; constant attributes carry
    // no instance data and are left as-is.
    for (const [attrName, attrValue] of Object.entries(entry.value.attributes || {})) {
      if (attrValue && typeof attrValue === 'object' && 'from' in attrValue) {
        const attr = leaf.attributes[attrName];
        if (attr !== undefined) setPath(target, attrValue.from, attr);
      }
    }
    return true;
  }
  if (entry.object) {
    // Reverse of the generic object body: read each field's child element back
    // into the object at `from`.
    const wrap = findPath(node, entry.object.to.split('/'));
    if (!wrap) return false;
    const obj = {};
    for (const field of entry.object.fields || []) {
      if (!field.from || !field.to) continue;
      const leaf = findPath(wrap, field.to.split('/'));
      if (leaf && leaf.text !== undefined) setPath(obj, field.from, leaf.text);
    }
    if (Object.keys(obj).length === 0) return false;
    setPath(target, entry.object.from, obj);
    return true;
  }
  return false;
}

/** The key text of a record node for a given rule. */
function recordKeyText(node, rule) {
  return findPath(node, rule.key.to.split('/'))?.text;
}

/** IMPORT one `records` rule. */
function unmapRecords(root, rule, data) {
  // A record set imported via cross-references (e.g. cac:Evidence, reconstructed
  // per-block by the `references` rules that point at it) is export-only here;
  // importing it directly would merge all blocks' entries into every array.
  if (rule.importVia === 'references') return;

  const nodes = findAllPaths(root, rule.records.split('/'));
  if (nodes.length === 0) return;

  if (rule.forEach && rule.item?.fields) {
    // Aggregate-record form: rebuild the array, one entry per record.
    const items = nodes.map(node => {
      const entry = {};
      if (rule.key?.from !== undefined) {
        const keyText = recordKeyText(node, rule);
        if (keyText !== undefined) setPath(entry, rule.key.from, keyText);
      }
      for (const field of rule.item.fields) {
        if (!field.from || !field.to) continue;
        applyValueRuleReverse(node, field, entry);
      }
      return entry;
    });
    setPath(data, rule.forEach, items);
    return;
  }

  if (rule.forEach && rule.item?.path) {
    // Scalar-item form: rebuild the array from the records carrying THIS rule's
    // fixed key id (other records share the same wrapper element, so filter by
    // key), reading each item.path element's text in document order.
    const values = [];
    for (const node of nodes) {
      if (rule.key?.key !== undefined && recordKeyText(node, rule) !== rule.key.key) continue;
      const leaf = findPath(node, rule.item.path.split('/'));
      if (leaf && leaf.text !== undefined) values.push(leaf.text);
    }
    if (values.length > 0) setPath(data, rule.forEach, values);
    return;
  }

  if (rule.forEach) {
    // Per-item entries form: records share key ids across occurrences, so split
    // by DOCUMENT ORDER — a new array item begins whenever a key already filled
    // in the current item reappears.
    const keyToEntry = new Map(rule.entries.map(e => [e.key, e]));
    const items = [];
    let current = null;
    const filled = new Set();
    for (const node of nodes) {
      const keyText = recordKeyText(node, rule);
      const entry = keyToEntry.get(keyText);
      if (!entry) continue;
      if (current === null || filled.has(keyText)) {
        current = {};
        items.push(current);
        filled.clear();
      }
      if (readEntryBody(node, entry, current, root)) filled.add(keyText);
    }
    if (items.length > 0) setPath(data, rule.forEach, items);
    return;
  }

  // Fixed entries form: match each entry by its key (first occurrence wins).
  const byKey = new Map();
  for (const node of nodes) {
    const keyText = recordKeyText(node, rule);
    if (keyText === undefined || byKey.has(keyText)) continue;
    byKey.set(keyText, node);
  }
  for (const entry of rule.entries) {
    const node = byKey.get(entry.key);
    if (node) readEntryBody(node, entry, data, root);
  }
}

/**
 * Handle a `forEach` rule: resolve the array at `rule.forEach`, and emit one
 * repeated element named `rule.to` per array entry. Three shapes for an item:
 *   - `item.fields`: array of objects — each field rule is applied under the
 *     new instance, resolved against that one array entry (e.g. representatives).
 *   - `item.path`: repeating scalar with a fixed wrapper child (e.g. lots).
 *   - neither: repeating scalar, value goes directly on the instance's text.
 */
function buildForEach(root, rule, data) {
  const items = resolve(data, rule.forEach);
  if (!Array.isArray(items) || items.length === 0) return;

  const segments = rule.to.split('/');
  for (const item of items) {
    const instance = appendPath(root, segments);

    if (rule.item?.fields) {
      for (const field of rule.item.fields) {
        if (!field.from || !field.to) continue;
        applyValueRule(instance, field, item);
      }
    } else if (rule.item?.path) {
      const child = ensurePath(instance, rule.item.path.split('/'));
      child.text = String(item);
    } else {
      instance.text = String(item);
    }
  }
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeAttr(s) {
  return escapeXml(s).replace(/"/g, '&quot;');
}

export function serialize(node, indent = '') {
  const attrs = Object.entries(node.attributes)
    .map(([k, v]) => ` ${k}="${escapeAttr(v)}"`)
    .join('');

  if (node.children.length === 0) {
    const text = node.text != null ? escapeXml(node.text) : '';
    return `${indent}<${node.name}${attrs}>${text}</${node.name}>`;
  }
  const inner = node.children.map(c => serialize(c, indent + '  ')).join('\n');
  return `${indent}<${node.name}${attrs}>\n${inner}\n${indent}</${node.name}>`;
}

/** Full export: instance data -> XML string. */
export function map(spec, data) {
  const tree = buildTree(spec, data);
  return '<?xml version="1.0" encoding="UTF-8"?>\n' + serialize(tree);
}

// =========================================================================
// IMPORT: XML string --> intermediate tree --> instance JSON
// =========================================================================

/**
 * Minimal XML parser into the intermediate tree. Handles elements, attributes,
 * and text content — sufficient for the UBL we emit. Not a general XML parser;
 * in the browser this would be replaced by DOMParser.
 */
export function parseXml(xml) {
  // strip a leading UTF-8/UTF-16 BOM (common when files are written by shells),
  // then the XML declaration and comments
  let s = xml.replace(/^\uFEFF/, '').replace(/<\?xml[\s\S]*?\?>/g, '').replace(/<!--[\s\S]*?-->/g, '');
  let pos = 0;
  const stack = [];
  let root = null;

  const readAttributes = (attrStr) => {
    const attrs = {};
    const re = /([\w:.-]+)\s*=\s*"([^"]*)"/g;
    let m;
    while ((m = re.exec(attrStr)) !== null) attrs[m[1]] = decodeEntities(m[2]);
    return attrs;
  };
  const decodeEntities = (t) =>
    t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

  while (pos < s.length) {
    const lt = s.indexOf('<', pos);
    if (lt === -1) break;

    // text between tags
    if (lt > pos) {
      const text = s.slice(pos, lt).trim();
      if (text && stack.length) stack[stack.length - 1].text = decodeEntities(text);
    }

    const gt = s.indexOf('>', lt);
    const tag = s.slice(lt + 1, gt).trim();
    pos = gt + 1;

    if (tag.startsWith('/')) {
      // closing tag
      stack.pop();
    } else {
      const selfClose = tag.endsWith('/');
      const inner = selfClose ? tag.slice(0, -1).trim() : tag;
      const spaceIdx = inner.search(/\s/);
      const name = spaceIdx === -1 ? inner : inner.slice(0, spaceIdx);
      const attrStr = spaceIdx === -1 ? '' : inner.slice(spaceIdx + 1);

      const node = makeNode(name);
      node.attributes = readAttributes(attrStr);

      if (!root) root = node;
      if (stack.length) stack[stack.length - 1].children.push(node);
      if (!selfClose) stack.push(node);
    }
  }
  return root;
}

/** Do the rule's CONSTANT attributes (not { from } refs) match the element? */
function constantAttributesMatch(ruleAttributes, elementAttributes) {
  for (const [name, value] of Object.entries(ruleAttributes)) {
    const isConstant = !(value && typeof value === 'object' && 'from' in value);
    if (isConstant && elementAttributes[name] !== String(value)) return false;
  }
  return true;
}

/**
 * Reverse of applyValueRule: read one {from, to, attributes?, when?} rule
 * out of `container` (an XML tree node), writing the result into `context`
 * at `rule.from`. Like applyValueRule, `context` is either the full instance
 * data (top-level rule) or one array entry under construction (a `forEach`
 * item field) — same logic either way.
 */
function applyValueRuleReverse(container, rule, context) {
  const leaf = findPath(container, rule.to.split('/'));
  if (!leaf || leaf.text === undefined) return;

  // Constant attributes act as discriminators: when several rules target the
  // same element path, a constant attribute (e.g. schemeID) tells them apart.
  if (rule.attributes && !constantAttributesMatch(rule.attributes, leaf.attributes)) return;

  // A pure `const` rule (no `from`) is fixed metadata with no instance-data
  // home, so nothing is written back on import.
  if (rule.from === undefined) return;

  setPath(context, rule.from, leaf.text);

  // Reverse the `when` discriminator: if this rule fired, its guard condition
  // must have held, so restore the tag on import.
  if (rule.when) {
    setPath(context, rule.when.path, rule.when.equals);
  }

  // Reverse attributes that were sourced from instance data.
  if (rule.attributes) {
    for (const [attrName, attrValue] of Object.entries(rule.attributes)) {
      if (attrValue && typeof attrValue === 'object' && 'from' in attrValue) {
        const attr = leaf.attributes[attrName];
        if (attr !== undefined) setPath(context, attrValue.from, attr);
      }
    }
  }
}

/**
 * Handle a `forEach` rule on import: find ALL repeated elements named
 * `rule.to` and reconstruct the array at `rule.forEach`. Mirrors buildForEach:
 * `item.fields` reconstructs one object per repeated element; `item.path`
 * reads a fixed wrapper child; otherwise the instance's own text is the value.
 */
function unmapForEach(root, rule, data) {
  const instances = findAllPaths(root, rule.to.split('/'));
  if (instances.length === 0) return;

  let items;
  if (rule.item?.fields) {
    items = instances.map(instance => {
      const entry = {};
      for (const field of rule.item.fields) {
        if (!field.from || !field.to) continue;
        applyValueRuleReverse(instance, field, entry);
      }
      return entry;
    });
  } else if (rule.item?.path) {
    items = instances.map(instance => findPath(instance, rule.item.path.split('/'))?.text)
      .filter(v => v !== undefined);
  } else {
    items = instances.map(instance => instance.text).filter(v => v !== undefined);
  }

  setPath(data, rule.forEach, items);
}

/** Full import: XML string -> instance data, driven by the SAME spec. */
export function unmap(spec, xml) {
  const root = parseXml(xml);
  const data = {};

  for (const rule of spec.rules) {
    if (!isRealRule(rule)) continue;

    if (rule.structure) {
      unmapStructure(root, rule.structure, data);
      continue;
    }

    if (rule.records) {
      unmapRecords(root, rule, data);
      continue;
    }

    if (rule.forEach) {
      unmapForEach(root, rule, data);
      continue;
    }

    applyValueRuleReverse(root, rule, data);
  }
  return data;
}

// =========================================================================
// IMPORT for the embedded `structure` subtree — mirror of buildStructure.
// Walks the parsed XML in parallel with the structure spec, writing back only
// the data-bound bits: `from`/`fromItem` leaf text and data-sourced attributes.
// `const` nodes carry no instance data and are skipped. A `forEach` node
// reconstructs its instance array from the repeated XML elements in order.
// =========================================================================

/** Reverse data-sourced attributes ({from}) from an XML node into `context`. */
function readStructureAttributes(xmlNode, attributes, context) {
  for (const [name, value] of Object.entries(attributes || {})) {
    if (value && typeof value === 'object' && 'from' in value) {
      const attr = xmlNode.attributes[name];
      if (attr !== undefined) setPath(context, value.from, attr);
    }
  }
}

/** Find the child XML nodes of `parent` whose element name matches `name`. */
function childrenNamed(parent, name) {
  return parent.children.filter(c => c.name === name);
}

/**
 * Walk a spec node's `children` against an XML node's children, matching
 * same-named siblings POSITIONALLY. A per-name counter ensures the Nth spec
 * child of a given element name consumes the Nth XML sibling of that name — so
 * the repeated cac:TenderingCriterionProperty / cac:Subsidiary… groups line up
 * correctly instead of all reading the first sibling.
 */
function unmapStructureChildren(xmlParent, specChildren, context) {
  const cursor = {}; // elementName -> next sibling index
  for (const child of specChildren) {
    const siblings = childrenNamed(xmlParent, child.element);
    if (child.forEach !== undefined) {
      // A forEach consumes ALL remaining same-named siblings from the cursor on.
      const start = cursor[child.element] || 0;
      const rest = siblings.slice(start);
      cursor[child.element] = siblings.length;
      unmapStructureForEach(rest, child, context);
      continue;
    }
    const idx = cursor[child.element] || 0;
    cursor[child.element] = idx + 1;
    const xmlNode = siblings[idx];
    if (xmlNode) unmapStructureNode(xmlNode, child, context);
  }
}

/** Reconstruct a forEach node's instance array from its repeated XML elements. */
function unmapStructureForEach(xmlNodes, specNode, context) {
  const scalarChild = (specNode.children || []).find(c => c.fromItem === '.');
  const items = [];
  for (const xmlNode of xmlNodes) {
    readStructureAttributes(xmlNode, specNode.attributes, context);
    if (scalarChild) {
      const leaf = childrenNamed(xmlNode, scalarChild.element)[0];
      if (leaf && leaf.text !== undefined) items.push(textToValue(leaf.text, scalarChild.type));
    } else if (specNode.children) {
      const item = {};
      unmapStructureChildren(xmlNode, specNode.children, item);
      if (Object.keys(item).length > 0) items.push(item);
    } else if (xmlNode.text !== undefined) {
      items.push(textToValue(xmlNode.text, specNode.type));
    }
  }
  if (items.length > 0) setPath(context, specNode.forEach, items);
}

/** IMPORT one already-matched XML node against its structure spec node. */
function unmapStructureNode(xmlNode, specNode, context) {
  readStructureAttributes(xmlNode, specNode.attributes, context);

  if (specNode.children) {
    unmapStructureChildren(xmlNode, specNode.children, context);
    return;
  }

  // Leaf: only `from`/`fromItem` leaves carry instance data back.
  const dest = specNode.fromItem !== undefined && specNode.fromItem !== '.'
    ? specNode.fromItem
    : specNode.from;
  if (dest !== undefined && xmlNode.text !== undefined) {
    setPath(context, dest, textToValue(xmlNode.text, specNode.type));
  }
}

/** IMPORT the top-level structure rule: match its root element under the doc root. */
function unmapStructure(root, specNode, context) {
  const xmlNode = childrenNamed(root, specNode.element)[0];
  if (xmlNode) unmapStructureNode(xmlNode, specNode, context);
}
