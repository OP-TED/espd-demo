// EXPERIMENTAL — declarative mapping interpreter (PoC).
// Reads a mapping spec + a canonical instance, produces UBL XML.
// Dependency-free and environment-neutral: builds an intermediate tree of plain
// objects, then serializes. The same tree builder could target the browser DOM.
//
// Usage: node map.mjs ../part-I.example.json part-I.mapping.json

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- helpers --------------------------------------------------------------

/** Resolve a dotted path (e.g. "partI.procedure.title") against the instance. */
function resolve(data, dottedPath) {
  return dottedPath.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), data);
}

/** Evaluate a rule's `when` guard, if present. */
function guardPasses(rule, data) {
  if (!rule.when) return true;
  return resolve(data, rule.when.path) === rule.when.equals;
}

/** Resolve an attribute value that may be a constant or a { from } reference. */
function resolveAttr(attrValue, data) {
  if (attrValue && typeof attrValue === 'object' && 'from' in attrValue) {
    return resolve(data, attrValue.from);
  }
  return attrValue;
}

// --- intermediate tree ----------------------------------------------------
// A node: { name, attributes: {}, children: [], text: string|undefined }

function makeNode(name) {
  return { name, attributes: {}, children: [], text: undefined };
}

/**
 * Descend/create a path of elements under `root`, reusing existing element
 * nodes with the same name so shared parents (e.g. Party) are not duplicated.
 * Returns the leaf node.
 */
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

function buildTree(spec, data) {
  const root = makeNode(spec.target.root);
  root.attributes = namespaceAttributes(spec.target.namespaces);

  for (const rule of spec.rules) {
    if (rule.$comment && !rule.from) continue;
    if (!guardPasses(rule, data)) continue;

    const value = resolve(data, rule.from);
    if (value === undefined || value === null || value === '') continue;

    const segments = rule.to.split('/');
    const leaf = ensurePath(root, segments);
    leaf.text = String(value);

    if (rule.attributes) {
      for (const [attrName, attrValue] of Object.entries(rule.attributes)) {
        const resolved = resolveAttr(attrValue, data);
        if (resolved !== undefined && resolved !== null) {
          leaf.attributes[attrName] = String(resolved);
        }
      }
    }
  }
  return root;
}

function namespaceAttributes(namespaces) {
  const attrs = {};
  for (const [prefix, uri] of Object.entries(namespaces || {})) {
    attrs[prefix === '' ? 'xmlns' : `xmlns:${prefix}`] = uri;
  }
  return attrs;
}

// --- serialization --------------------------------------------------------

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeAttr(s) {
  return escapeXml(s).replace(/"/g, '&quot;');
}

function serialize(node, indent = '') {
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

// --- run ------------------------------------------------------------------

const instancePath = process.argv[2] || '../part-I.example.json';
const mappingPath = process.argv[3] || 'part-I.mapping.json';

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, instancePath), 'utf8'));
const spec = JSON.parse(fs.readFileSync(path.resolve(__dirname, mappingPath), 'utf8'));

const tree = buildTree(spec, data);
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + serialize(tree);
console.log(xml);
