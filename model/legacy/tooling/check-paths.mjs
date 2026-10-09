// EXPERIMENTAL — sanity check: every path a form field references must resolve
// against the instance-data example. This keeps the form-structure lens honest
// (it may only point at data that actually exists in the model).
//
// Usage: node check-paths.mjs part-I
//        node check-paths.mjs part-III

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = process.argv[2] || 'part-I';

// The pre-compiler per-part artifacts moved to model/legacy/; this utility
// checks them. (The compiler's generated form/example are checked by the
// compiler's own tests.)
const form = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'form-structure', `${part}.form.json`), 'utf8'));
const example = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'instance-data', `${part}.example.json`), 'utf8')
);

// Recursively collect every instance path the form references, wherever it
// appears in the form tree (dataPath, valuePath, choicePath, visibleWhen.path).
// This walks the whole structure so it works regardless of whether the form is
// organized as sections/fields (Part I) or criteria/groups/fields (Part III).
const paths = new Set();
(function collect(node) {
  if (Array.isArray(node)) {
    node.forEach(collect);
    return;
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if ((key === 'dataPath' || key === 'valuePath' || key === 'choicePath') && typeof value === 'string') {
        paths.add(value);
      } else if (key === 'visibleWhen' && value && typeof value.path === 'string') {
        paths.add(value.path);
      } else {
        collect(value);
      }
    }
  }
})(form);

// A relative path (contains a `[]` array segment, or its first segment isn't a
// top-level `partN` key) is resolved against the array's item shape, not the
// example root. For those we verify only the ABSOLUTE prefix (up to the first
// `[]`) resolves, then that at least one array item carries the remaining leaf.
function resolveSegments(dotted) {
  return dotted.split('.');
}

// Walk the example following segments; `[]` means "descend into array items".
// Returns true if the path resolves for the example (leaf may be absent when
// optional, handled by the `optional` allow-list).
function pathResolves(obj, dotted) {
  const segments = resolveSegments(dotted);
  let cursors = [obj];
  for (let i = 0; i < segments.length; i++) {
    let seg = segments[i];
    const isArrayLeaf = seg.endsWith('[]');
    if (isArrayLeaf) seg = seg.slice(0, -2);

    const next = [];
    for (const cur of cursors) {
      if (cur == null || typeof cur !== 'object') continue;
      if (!(seg in cur)) continue;
      let v = cur[seg];
      if (isArrayLeaf) {
        if (!Array.isArray(v)) continue;
        for (const item of v) next.push(item);
      } else {
        next.push(v);
      }
    }
    if (next.length === 0) {
      // Nothing matched at this segment. Acceptable only if we're past the
      // absolute prefix (i.e. an optional leaf on an item that isn't present).
      return { resolved: false, depth: i };
    }
    cursors = next;
  }
  return { resolved: true, depth: segments.length };
}

// Optional leaves that legitimately may not be in the default example.
const optional = new Set([
  'partI.contractingAuthority.identifier.scheme',
  // Part IV C31: the default example has the EO fulfilling the criterion by
  // itself, so the ONFALSE relied-upon branch is legitimately absent.
  'partIV.selectionCriteria.slc-stand-to-spec-avg.response.reliedUpon',
  'partIV.selectionCriteria.slc-stand-to-spec-avg.response.reliedUponEntity.name',
  'partIV.selectionCriteria.slc-stand-to-spec-avg.response.reliedUponEntity.id'
]);

let problems = 0;
for (const p of [...paths].sort()) {
  const { resolved } = pathResolves(example, p);
  const ok = resolved || optional.has(p);
  console.log(`${ok ? '✓' : '✗'} ${p}`);
  if (!ok) problems++;
}

if (problems > 0) {
  console.error(`\n${problems} form path(s) do not resolve against the instance model.`);
  process.exit(1);
}
console.log(`\nAll form paths reference the instance model.`);
