// EXPERIMENTAL — generate a PlantUML class diagram of the canonical instance-data
// model from its JSON Schema. One class per object type (`$defs` entry + the root
// part object + inline object properties). Scalar properties become attributes;
// object/array-of-object properties become associations with cardinality.
//
// This documents the DATA MODEL (what data exists and how it nests), analogous to
// the EA-derived UBL class diagrams but for our canonical model. Unlike those, a
// referenced type is shown ONLY as an association, not also duplicated as an
// attribute.
//
// Usage:
//   node uml.mjs part-III            # print PlantUML to stdout
//   node uml.mjs part-III > out.puml # save

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = process.argv[2] || 'part-III';
const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'instance-data', `${part}.schema.json`), 'utf8'));

const classes = new Map();   // className -> { attrs: string[], seen: bool }
const relations = [];        // { from, to, card, label }

/** Register (once) a class with the given name. */
function ensureClass(name) {
  if (!classes.has(name)) classes.set(name, { attrs: [] });
  return classes.get(name);
}

/**
 * A PlantUML-safe alias for a class name. A dot in a class name is interpreted
 * by PlantUML as package qualification (package.Class), which breaks inline
 * names like "representative.contact". Map any non-word char to '_' and prefix
 * to guarantee a valid identifier.
 */
function alias(name) {
  return 'C_' + name.replace(/[^A-Za-z0-9]/g, '_');
}

/** A short type annotation for a scalar schema node. */
function scalarType(node) {
  if (node.const !== undefined) return `const ${JSON.stringify(node.const)}`;
  if (node.enum) return `enum {${node.enum.join(', ')}}`;
  if (node.format) return `${node.type}:${node.format}`;
  return node.type || 'any';
}

function isRef(node) { return node && typeof node.$ref === 'string'; }
function refName(node) { return node.$ref.replace(/^#\/\$defs\//, ''); }

/** Cardinality string for a property, given whether it is required / an array. */
function cardinality({ required, isArray }) {
  if (isArray) return required ? '1..*' : '0..*';
  return required ? '1' : '0..1';
}

/**
 * Walk an object schema node, producing a class `name`. Scalar props -> attrs;
 * $ref / array-of-$ref props -> associations; inline object props -> a nested
 * class named `${name}.${prop}`.
 */
function walkObject(name, node) {
  const cls = ensureClass(name);
  const required = new Set(node.required || []);
  for (const [prop, sub] of Object.entries(node.properties || {})) {
    const req = required.has(prop);
    const marker = req ? '*' : ''; // required marker

    if (isRef(sub)) {
      const target = refName(sub);
      walkDef(target);
      relations.push({ from: name, to: target, card: cardinality({ required: req, isArray: false }), label: prop });
    } else if (sub.type === 'array') {
      const items = sub.items || {};
      if (isRef(items)) {
        const target = refName(items);
        walkDef(target);
        relations.push({ from: name, to: target, card: cardinality({ required: req, isArray: true }), label: prop });
      } else if (items.type === 'object') {
        const inline = `${name}.${prop}`;
        walkObject(inline, items);
        relations.push({ from: name, to: inline, card: cardinality({ required: req, isArray: true }), label: prop });
      } else {
        cls.attrs.push(`${marker}${prop} : ${scalarType(items)}[]`);
      }
    } else if (sub.type === 'object' && sub.properties) {
      const inline = `${name}.${prop}`;
      walkObject(inline, sub);
      relations.push({ from: name, to: inline, card: cardinality({ required: req, isArray: false }), label: prop });
    } else if (sub.type === 'object') {
      // object with no declared properties (e.g. reserved `requirement`)
      cls.attrs.push(`${marker}${prop} : object (unspecified)`);
    } else {
      cls.attrs.push(`${marker}${prop} : ${scalarType(sub)}`);
    }
  }
}

/** Resolve and walk a $defs entry by name (once). */
function walkDef(name) {
  if (classes.has(name)) return; // already walked (guard against cycles)
  ensureClass(name);
  const def = schema.$defs?.[name];
  if (!def) return;
  if (def.type === 'object' || def.properties) walkObject(name, def);
}

// Root: walk the top-level part object (e.g. `partIII`).
const rootProp = Object.keys(schema.properties || {})[0];
if (rootProp) {
  walkObject(rootProp, schema.properties[rootProp]);
}

// ---- render PlantUML ---------------------------------------------------------

const lines = [];
lines.push(`@startuml ${part}-model`);
lines.push(`title Canonical instance-data model - ${part}`);
lines.push('hide empty members');
lines.push('');

for (const [name, cls] of classes) {
  // Use a safe alias as the class identifier; keep the original as display name.
  lines.push(`class "${name}" as ${alias(name)} {`);
  for (const attr of cls.attrs) lines.push(`  ${attr}`);
  lines.push('}');
  lines.push('');
}

for (const r of relations) {
  lines.push(`${alias(r.from)} --> "${r.card}" ${alias(r.to)} : ${r.label}`);
}

lines.push('');
lines.push("note bottom : '*' marks a required property. Cardinality is on the association.");
lines.push('@enduml');

const output = lines.join('\n') + '\n';
const outArg = process.argv.indexOf('--out');
if (outArg !== -1 && process.argv[outArg + 1]) {
  // Write clean UTF-8 directly (avoids shell-redirect encoding issues on Windows).
  fs.writeFileSync(path.resolve(process.cwd(), process.argv[outArg + 1]), output, 'utf8');
} else {
  process.stdout.write(output);
}
