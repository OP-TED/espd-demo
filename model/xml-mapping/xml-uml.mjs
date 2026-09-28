// EXPERIMENTAL — generate a PlantUML class diagram of the UBL XML ELEMENT
// STRUCTURE produced by a mapping spec, in the style of the EA "Technical View"
// diagrams (e.g. .../plantuml/...I68 info-pub.puml):
//
//   - a CLASS per aggregate element (one that has child elements),
//   - BASIC/leaf children (elements carrying only text) shown as ATTRIBUTES,
//   - AGGREGATE children shown as ASSOCIATIONS with cardinality.
//
// The element tree and cardinalities are derived from the mapping spec alone:
//   - a `records` rule or a `forEach` rule produces a REPEATING element,
//   - `references` targets are 0..* / 1..* (a repeated cross-reference),
//   - everything else is 1 (or 0..1 for an optional single value; the spec does
//     not distinguish optional here, so single values default to 1).
//
// Usage:
//   node xml-uml.mjs part-III
//   node xml-uml.mjs part-III --out ../../docs/diagrams/part-III.xml.puml

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// The argument is either a part name (resolved to `<part>.mapping.json`) or an
// explicit spec filename ending in `.mapping.json` (for parts split across a
// REQUEST and a RESPONSE spec, e.g. selection criteria).
const arg = process.argv[2] || 'part-III';
const specFile = arg.endsWith('.mapping.json') ? arg : `${arg}.mapping.json`;
const part = specFile.replace(/\.mapping\.json$/, '');
const spec = JSON.parse(fs.readFileSync(path.join(__dirname, specFile), 'utf8'));

// ---- element tree ------------------------------------------------------------
// node: { name, path, children: Map<name,node>, leaf: bool, repeating: '1'|'0..*'|'1..*'|... }

function makeNode(name, nodePath) {
  return { name, path: nodePath, children: new Map(), leaf: true, repeating: '1' };
}
const root = makeNode(spec.target.root, spec.target.root);

/**
 * Add an element path (e.g. "cac:Foo/cac:Bar/cbc:Baz") under the root. The final
 * segment is a leaf unless later found to have children of its own. `rootCard`
 * sets the cardinality of the FIRST segment under root (the record/forEach
 * element); deeper segments are 1.
 */
function addPath(segments, rootCard) {
  let cur = root;
  segments.forEach((name, i) => {
    let next = cur.children.get(name);
    if (!next) {
      next = makeNode(name, `${cur.path}/${name}`);
      cur.children.set(name, next);
    }
    // The node has a child -> it is an aggregate (not a leaf).
    cur.leaf = cur === root ? false : cur.leaf;
    if (i === 0 && rootCard) next.repeating = rootCard;
    cur = next;
  });
  // Mark aggregates: any node that gained children is not a leaf.
  markAggregates(root);
  return cur;
}

function markAggregates(node) {
  if (node.children.size > 0) node.leaf = false;
  for (const c of node.children.values()) markAggregates(c);
}

/** Add all element paths a value/period/reference target contributes. Returns
 *  the node map keyed by depth so callers can set a specific segment's card. */
function addTarget(toPath, rootCard) {
  return addPath(toPath.split('/'), rootCard);
}

/** Set the cardinality on the node at the exact element path (dotted by '/'). */
function setCard(fullPath, card) {
  let cur = root;
  const segs = fullPath.split('/').slice(1); // drop the root element name
  for (const name of segs) {
    cur = cur.children.get(name);
    if (!cur) return;
  }
  cur.repeating = card;
}

// ---- walk the spec into the element tree ------------------------------------

for (const rule of spec.rules) {
  if (rule.to && (rule.const !== undefined || rule.from)) {
    addTarget(rule.to, '1');
    continue;
  }
  if (rule.forEach && rule.to) {
    // plain forEach: the `to` element repeats
    const card = '0..*';
    if (rule.item?.fields) for (const f of rule.item.fields) { if (f.to) addTarget(`${rule.to}/${f.to}`, card); }
    else if (rule.item?.path) addTarget(`${rule.to}/${rule.item.path}`, card);
    else addTarget(rule.to, card);
    continue;
  }
  if (rule.records) {
    const wrap = rule.records;
    const card = rule.forEach ? '0..*' : '1'; // record set: repeating if forEach-driven
    // key element
    addTarget(`${wrap}/${rule.key.to}`, card);
    if (rule.forEach && rule.item?.fields) {
      for (const f of rule.item.fields) if (f.to) addTarget(`${wrap}/${f.to}`, card);
      continue;
    }
    for (const entry of rule.entries || []) {
      if (entry.value) addTarget(`${wrap}/${entry.value.to}`, card);
      if (entry.object) {
        for (const f of entry.object.fields || []) {
          if (f.to) addTarget(`${wrap}/${entry.object.to}/${f.to}`, card);
        }
      }
      // A `references` body emits one cross-reference element PER referenced
      // entry, so the reference element itself is 1..* within its record. The
      // reference element is the aggregate parent of the cbc:ID leaf.
      if (entry.references) {
        addTarget(`${wrap}/${entry.references.to}`, card);
        const refAggregate = `${spec.target.root}/${wrap}/${entry.references.to}`.split('/').slice(0, -1).join('/');
        setCard(refAggregate, '1..*');
      }
    }
  }
}

// ---- classify & render -------------------------------------------------------
// A class = an aggregate element (has children). Basic children (leaves) become
// attributes on their parent class. Aggregate children become associations.

const aliasOf = new Map();
let counter = 0;
function alias(nodePath) {
  if (!aliasOf.has(nodePath)) aliasOf.set(nodePath, `E${counter++}`);
  return aliasOf.get(nodePath);
}

const classLines = [];
const relLines = [];

function render(node) {
  // Gather this node's basic (leaf) children as attributes, aggregate children
  // as associations.
  const attrs = [];
  const assocs = [];
  for (const child of node.children.values()) {
    if (child.children.size === 0) attrs.push(child);
    else assocs.push(child);
  }

  classLines.push(`class "${node.path}" as ${alias(node.path)} {`);
  for (const a of attrs) classLines.push(`  +${a.name}`);
  classLines.push('}');
  classLines.push('');

  for (const child of assocs) {
    // Cardinality goes on the TARGET end (E0 --> "1" E1). Placing it after the
    // target (E0 --> E1 "1") is rejected by current PlantUML.
    relLines.push(`${alias(node.path)} --> "${child.repeating}" ${alias(child.path)}`);
    render(child);
  }
}

render(root);

const out = [];
out.push(`@startuml ${part}-xml`);
out.push(`title UBL XML element structure - ${part}`);
out.push('hide empty members');
out.push('');
out.push(...classLines);
out.push(...relLines);
// Only add the collapsed-wrapper caveat when a record set with multiple entries
// actually shares a wrapper element (the situation the note describes).
const hasCollapsedWrapper = spec.rules.some(r => r.records && (r.entries?.length > 1));
if (hasCollapsedWrapper) {
  const wrapper = spec.rules.find(r => r.records && r.entries?.length > 1).records;
  out.push('');
  out.push('note as N1');
  out.push(`  Elements sharing a wrapper name (e.g. ${wrapper})`);
  out.push('  are collapsed into ONE class showing ALL possible bodies. At runtime');
  out.push('  each instance carries exactly one body (Schematron BR-TCR-03).');
  out.push('end note');
}
out.push('@enduml');

const output = out.join('\n') + '\n';
const outArg = process.argv.indexOf('--out');
if (outArg !== -1 && process.argv[outArg + 1]) {
  fs.writeFileSync(path.resolve(process.cwd(), process.argv[outArg + 1]), output, 'utf8');
} else {
  process.stdout.write(output);
}
