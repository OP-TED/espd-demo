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

/** Coerce an instance value to XML text; only booleans need care on import. */
function valueToText(value) {
  return String(value);
}
function textToValue(text, type) {
  if (type === 'boolean') return text === 'true';
  return text;
}

// =========================================================================
// Generic `records` construct
//
// A `records` rule emits a repeated "record" wrapper element. Each record has:
//   - a `key`: an identifier element (rule.key.to) with an optional scheme
//     attribute set (rule.key.attributes) — the record's cross-reference id.
//   - a `body`: exactly one of (per Schematron BR-TCR-03 for ESPD, but the
//     engine does not know that): a typed `value`, a `period`, or `references`
//     (repeated cross-reference elements pointing at another record set by key).
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

/** Emit one entry's body branch (value | period | references) under `node`. */
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
  if (entry.period) {
    const period = resolve(context, entry.period.from);
    if (!period || (period.startDate === undefined && period.endDate === undefined)) return false;
    const wrap = ensurePath(node, entry.period.to.split('/'));
    if (period.startDate) ensurePath(wrap, [entry.period.startElement]).text = period.startDate;
    if (period.endDate) ensurePath(wrap, [entry.period.endElement]).text = period.endDate;
    return true;
  }
  if (entry.references) {
    const items = resolve(data, entry.references.forEach);
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
function buildRecords(root, rule, data) {
  if (rule.forEach && rule.item?.fields) {
    // Aggregate-record form: one record per array item, all fields inside it.
    const items = resolve(data, rule.forEach);
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

/** Read one entry's body from a record node into `target`. Returns true if present. */
function readEntryBody(node, entry, target) {
  if (entry.references) {
    // References carry only cross-reference ids; the referenced records are
    // reconstructed from their own record set, so nothing unique is read here.
    // Return true so occurrence grouping still counts this record as present.
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
  if (entry.period) {
    const wrap = findPath(node, entry.period.to.split('/'));
    if (!wrap) return false;
    const start = findPath(wrap, [entry.period.startElement])?.text;
    const end = findPath(wrap, [entry.period.endElement])?.text;
    if (start === undefined && end === undefined) return false;
    const obj = {};
    if (start !== undefined) obj.startDate = start;
    if (end !== undefined) obj.endDate = end;
    setPath(target, entry.period.from, obj);
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
      if (readEntryBody(node, entry, current)) filled.add(keyText);
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
    if (node) readEntryBody(node, entry, data);
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
