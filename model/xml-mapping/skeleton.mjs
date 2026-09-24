// EXPERIMENTAL — generate a STRUCTURAL SKELETON of the UBL XML from the
// xml-mapping spec alone (Interpretation A: shape, not data).
//
// Unlike sample.mjs (which synthesizes an instance and runs the real mapper),
// this walks the mapping RULES directly and emits every element the mapping can
// produce, with placeholders that name what fills each leaf:
//   {from: <instance path>}   a value taken from the instance data
//   {const}                   a fixed constant emitted by the mapping
//   {key: <property id>}      a record key (e.g. the ValidatedCriterionPropertyID)
//   {ref: <array>.<field>}    a cross-reference value (repeated per array entry)
//
// Repeating structures (forEach / records-with-entries) are shown ONCE with a
// repeat marker, since the count depends on runtime data. This makes the output
// a documentation-friendly template of the XML shape.
//
// Usage: node skeleton.mjs part-III

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = process.argv[2] || 'part-III';
const spec = JSON.parse(fs.readFileSync(path.resolve(__dirname, `${part}.mapping.json`), 'utf8'));

// ---- minimal tree helpers (same node shape mapper.serialize expects) ---------

function makeNode(name) {
  return { name, attributes: {}, children: [], text: undefined };
}
function ensurePath(root, segments) {
  let cur = root;
  for (const name of segments) {
    let next = cur.children.find(c => c.name === name);
    if (!next) { next = makeNode(name); cur.children.push(next); }
    cur = next;
  }
  return cur;
}
function appendPath(root, segments) {
  const container = segments.length > 1 ? ensurePath(root, segments.slice(0, -1)) : root;
  const node = makeNode(segments[segments.length - 1]);
  container.children.push(node);
  return node;
}
function namespaceAttributes(namespaces) {
  const attrs = {};
  for (const [prefix, uri] of Object.entries(namespaces || {})) {
    attrs[prefix === '' ? 'xmlns' : `xmlns:${prefix}`] = uri;
  }
  return attrs;
}

// ---- placeholders ------------------------------------------------------------

const ph = {
  from: (p) => `{from: ${p}}`,
  const: () => `{const}`,
  key: (k) => k,                       // record keys are literal property ids
  ref: (forEach, key) => `{ref: ${forEach}[].${key}}`,
};

/** Mark a node's text as a repeat placeholder comment on its parent. */
function repeatNote(node, forEachPath) {
  node.attributes['_repeat'] = forEachPath; // rendered as a pseudo-attribute note
}

// ---- walk the rules ----------------------------------------------------------

function buildValueLeaf(node, toPath, text) {
  ensurePath(node, toPath.split('/')).text = text;
}

function buildSkeleton(spec) {
  const root = makeNode(spec.target.root);
  root.attributes = namespaceAttributes(spec.target.namespaces);

  for (const rule of spec.rules) {
    if (rule.const !== undefined && rule.to) {
      buildValueLeaf(root, rule.to, ph.const());
      continue;
    }
    if (rule.to && rule.from) {
      buildValueLeaf(root, rule.to, ph.from(rule.from));
      continue;
    }
    if (rule.forEach && rule.to) {
      // plain forEach value/object rule
      const inst = appendPath(root, rule.to.split('/'));
      repeatNote(inst, rule.forEach);
      if (rule.item?.fields) {
        for (const f of rule.item.fields) if (f.to) buildValueLeaf(inst, f.to, ph.from(f.from));
      } else if (rule.item?.path) {
        ensurePath(inst, rule.item.path.split('/')).text = ph.from('<item>');
      } else {
        inst.text = ph.from('<item>');
      }
      continue;
    }
    if (rule.records) {
      buildRecordsSkeleton(root, rule);
      continue;
    }
  }
  return root;
}

function buildEntryBody(node, entry) {
  if (entry.value) buildValueLeaf(node, entry.value.to, ph.from(entry.value.from));
  if (entry.object) {
    const wrap = ensurePath(node, entry.object.to.split('/'));
    for (const f of entry.object.fields || []) {
      if (f.to) ensurePath(wrap, f.to.split('/')).text = ph.from(`${entry.object.from}.${f.from}`);
    }
  }
  if (entry.references) {
    const refNode = appendPath(node, entry.references.to.split('/'));
    refNode.text = ph.ref(entry.references.forEach, entry.references.key);
    repeatNote(refNode, entry.references.forEach);
  }
}

function buildRecordSkeleton(root, rule, entry) {
  const node = appendPath(root, rule.records.split('/'));
  // key element (+ scheme attributes)
  const keyLeaf = ensurePath(node, rule.key.to.split('/'));
  keyLeaf.text = entry ? ph.key(entry.key) : ph.from(rule.key.from);
  for (const [a, v] of Object.entries(rule.key.attributes || {})) keyLeaf.attributes[a] = String(v);
  if (entry) buildEntryBody(node, entry);
  return node;
}

function buildRecordsSkeleton(root, rule) {
  if (rule.forEach && rule.item?.fields) {
    // aggregate-record form (e.g. cac:Evidence): one record per array item
    const node = buildRecordSkeleton(root, rule, null);
    repeatNote(node, rule.forEach);
    for (const f of rule.item.fields) if (f.to) buildValueLeaf(node, f.to, ph.from(f.from));
    return;
  }
  if (rule.forEach) {
    // per-item entries form (e.g. repeating convictions): show each entry once,
    // marked as repeating over the array.
    for (const entry of rule.entries) {
      const node = buildRecordSkeleton(root, rule, entry);
      repeatNote(node, rule.forEach);
    }
    return;
  }
  // fixed entries form: one record per entry
  for (const entry of rule.entries) buildRecordSkeleton(root, rule, entry);
}

// ---- render ------------------------------------------------------------------
// Render the tree, turning each `_repeat` pseudo-attribute into an XML comment
// before its element, so the output reads as documentation.

const tree = buildSkeleton(spec);

function render(node, indent = '') {
  const attrs = Object.entries(node.attributes)
    .filter(([k]) => k !== '_repeat')
    .map(([k, v]) => ` ${k}="${v}"`)
    .join('');
  const note = node.attributes['_repeat'] ? `${indent}<!-- repeats per ${node.attributes['_repeat']} entry -->\n` : '';
  if (node.children.length === 0) {
    const text = node.text != null ? node.text : '';
    return `${note}${indent}<${node.name}${attrs}>${text}</${node.name}>`;
  }
  const inner = node.children.map(c => render(c, indent + '  ')).join('\n');
  return `${note}${indent}<${node.name}${attrs}>\n${inner}\n${indent}</${node.name}>`;
}

console.log('<?xml version="1.0" encoding="UTF-8"?>');
console.log(render(tree));
