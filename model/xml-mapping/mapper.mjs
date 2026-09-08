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

/** Set a value at a dotted path, creating intermediate objects as needed. */
export function setPath(target, dottedPath, value) {
  const keys = dottedPath.split('.');
  let current = target;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] == null || typeof current[key] !== 'object') current[key] = {};
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

/** A rule is "real" (not just a comment placeholder) if it has from + to. */
function isRealRule(rule) {
  return rule && rule.from && rule.to;
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

function guardPasses(rule, data) {
  if (!rule.when) return true;
  return resolve(data, rule.when.path) === rule.when.equals;
}

function resolveAttr(attrValue, data) {
  if (attrValue && typeof attrValue === 'object' && 'from' in attrValue) {
    return resolve(data, attrValue.from);
  }
  return attrValue;
}

export function buildTree(spec, data) {
  const root = makeNode(spec.target.root);
  root.attributes = namespaceAttributes(spec.target.namespaces);

  for (const rule of spec.rules) {
    if (!isRealRule(rule)) continue;
    if (!guardPasses(rule, data)) continue;

    const value = resolve(data, rule.from);
    if (value === undefined || value === null || value === '') continue;

    const leaf = ensurePath(root, rule.to.split('/'));
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

/** Full import: XML string -> instance data, driven by the SAME spec. */
export function unmap(spec, xml) {
  const root = parseXml(xml);
  const data = {};

  for (const rule of spec.rules) {
    if (!isRealRule(rule)) continue;

    const leaf = findPath(root, rule.to.split('/'));
    if (!leaf || leaf.text === undefined) continue;

    // Constant attributes act as discriminators: when several rules target the
    // same element path, a constant attribute (e.g. schemeID) tells them apart.
    // Skip this rule if its constant attributes don't match the XML element.
    if (rule.attributes && !constantAttributesMatch(rule.attributes, leaf.attributes)) {
      continue;
    }

    // Reconstruct the instance value from the element text.
    setPath(data, rule.from, leaf.text);

    // Reverse the `when` discriminator: if this rule fired, its guard condition
    // must have held, so restore the tag on import.
    if (rule.when) {
      setPath(data, rule.when.path, rule.when.equals);
    }

    // Reverse attributes that were sourced from instance data.
    if (rule.attributes) {
      for (const [attrName, attrValue] of Object.entries(rule.attributes)) {
        if (attrValue && typeof attrValue === 'object' && 'from' in attrValue) {
          const attr = leaf.attributes[attrName];
          if (attr !== undefined) setPath(data, attrValue.from, attr);
        }
      }
    }
  }
  return data;
}
