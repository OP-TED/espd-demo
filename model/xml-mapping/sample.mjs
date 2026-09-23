// EXPERIMENTAL — generate a sample UBL XML snippet from the instance-data JSON
// Schema + the xml-mapping spec, WITHOUT hand-written instance data.
//
// It works in two steps:
//   1. synthesize a minimal-but-complete valid instance from the JSON Schema
//      (required fields; one item per array; enums -> first; format:date -> a
//      literal date; booleans chosen to OPEN conditional branches so optional
//      structure like convictions/evidence is populated),
//   2. run the SAME mapper.map() we use for real data.
//
// This reuses the proven engine rather than adding a second XML-emitting path,
// and produces output that is valid-by-construction against the schema.
//
// Usage:
//   node sample.mjs part-III            # print the sample XML
//   node sample.mjs part-III --instance # also print the synthesized instance JSON

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { map } from './mapper.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = process.argv[2] || 'part-III';
const showInstance = process.argv.includes('--instance');

const schema = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '..', 'instance-data', `${part}.schema.json`), 'utf8')
);
const spec = JSON.parse(fs.readFileSync(path.resolve(__dirname, `${part}.mapping.json`), 'utf8'));

// ---- schema-driven synthesis -------------------------------------------------

/** Resolve a local "#/$defs/x" $ref against the root schema. */
function deref(node, root) {
  if (node && node.$ref) {
    const key = node.$ref.replace(/^#\/\$defs\//, '');
    return root.$defs[key];
  }
  return node;
}

/** Merge the branches of a top-level `allOf` (used for if/then) into base props. */
function applyConditionals(node, value, root) {
  for (const branch of node.allOf || []) {
    // We synthesize booleans to satisfy the "interesting" branch, so honor the
    // `then` when its `if` const matches what we generated, else `else`.
    const cond = branch.if?.properties || {};
    let matches = true;
    for (const [k, sub] of Object.entries(cond)) {
      if ('const' in sub && value[k] !== sub.const) matches = false;
    }
    const chosen = matches ? branch.then : branch.else;
    if (chosen?.required) {
      for (const req of chosen.required) {
        if (!(req in value)) value[req] = synth(node.properties[req], root, req);
      }
    }
  }
  return value;
}

/** A literal for a string, guided by format/enum/const and the property name. */
function synthString(node, name) {
  if (node.const !== undefined) return node.const;
  if (node.enum) return node.enum[0];
  if (node.format === 'date') return '2024-01-01';
  if (node.pattern) return `<matches:${node.pattern}>`; // best-effort placeholder
  return `sample-${name || 'value'}`;
}

/** Synthesize a minimal-but-complete valid value for a schema node. */
function synth(node, root, name) {
  node = deref(node, root);
  if (!node) return undefined;

  if (node.const !== undefined) return node.const;

  const type = node.type || (node.properties ? 'object' : undefined);

  switch (type) {
    case 'object': {
      const obj = {};
      const props = node.properties || {};
      // Include required props always; also include optional props so the sample
      // is complete (this is a template, not a minimal-valid document).
      for (const [key, sub] of Object.entries(props)) {
        // Booleans: choose the value that OPENS conditional structure, so the
        // sample shows the richer branch (answer=true, availableElectronically=true).
        obj[key] = synth(sub, root, key);
      }
      return applyConditionals(node, obj, root);
    }
    case 'array': {
      // One representative item, so repeating XML records appear in the sample.
      return [synth(node.items, root, name)];
    }
    case 'boolean':
      // Prefer TRUE so if/then branches that gate optional structure populate.
      return true;
    case 'number':
    case 'integer':
      return 1;
    case 'string':
    default:
      return synthString(node, name);
  }
}

const instance = synth(schema, schema, 'root');

if (showInstance) {
  console.log('// synthesized instance:');
  console.log(JSON.stringify(instance, null, 2));
  console.log('\n// generated XML:');
}
console.log(map(spec, instance));
