// EXPERIMENTAL — sanity check: every path a form field references must resolve
// against the instance-data example. This keeps the form-structure lens honest
// (it may only point at data that actually exists in the model).
//
// Usage: node check-paths.mjs part-I

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = process.argv[2] || 'part-I';

const form = JSON.parse(fs.readFileSync(path.join(__dirname, `${part}.form.json`), 'utf8'));
const example = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'instance-data', `${part}.example.json`), 'utf8')
);

// Collect every instance path the form references.
const paths = new Set();
for (const section of form.sections) {
  if (section.control) {
    if (section.control.choicePath) paths.add(section.control.choicePath);
    if (section.control.valuePath) paths.add(section.control.valuePath);
  }
  for (const field of section.fields || []) {
    if (field.dataPath) paths.add(field.dataPath);
    if (field.visibleWhen?.path) paths.add(field.visibleWhen.path);
  }
}

// A path is considered resolvable if every prefix segment exists as a key in the
// example (the leaf itself may be absent when it's an optional/one-of branch).
function pathExists(obj, dotted) {
  const keys = dotted.split('.');
  let cur = obj;
  for (const key of keys) {
    if (cur == null || typeof cur !== 'object' || !(key in cur)) return false;
    cur = cur[key];
  }
  return true;
}

// Optional leaves that legitimately may not be in the default example:
// the identifier scheme and any non-selected one-of value.
const optional = new Set(['partI.contractingAuthority.identifier.scheme']);

let problems = 0;
for (const p of [...paths].sort()) {
  const ok = pathExists(example, p) || optional.has(p);
  console.log(`${ok ? '✓' : '✗'} ${p}`);
  if (!ok) problems++;
}

if (problems > 0) {
  console.error(`\n${problems} form path(s) do not resolve against the instance model.`);
  process.exit(1);
}
console.log(`\nAll form paths reference the instance model.`);
