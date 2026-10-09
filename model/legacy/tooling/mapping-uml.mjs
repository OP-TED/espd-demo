// EXPERIMENTAL — generate a PlantUML diagram of the XML MAPPING (the
// correspondence between canonical instance-data paths and UBL target elements),
// from the mapping spec alone.
//
// This is the "mapping view": unlike instance-data/uml.mjs (which draws the data
// model), this shows WHICH instance path maps to WHICH UBL element, grouped by
// mapping rule. It uses PlantUML classes as two columns — an "instance" side and
// a "UBL" side — linked by correspondence arrows labelled with the datatype /
// kind of each mapping.
//
// Usage: node mapping-uml.mjs part-III
//        node mapping-uml.mjs part-IV.response.mapping.json   # explicit spec file

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
const spec = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'xml-mapping', specFile), 'utf8'));

// Each correspondence: { instance, ubl, kind }
const links = [];

function add(instance, ubl, kind) {
  links.push({ instance, ubl, kind });
}

for (const rule of spec.rules) {
  if (rule.const !== undefined && rule.to) {
    add('(const)', rule.to, 'const');
    continue;
  }
  if (rule.to && rule.from) {
    add(rule.from, rule.to, 'value');
    continue;
  }
  if (rule.forEach && rule.to) {
    const base = rule.forEach;
    if (rule.item?.fields) {
      for (const f of rule.item.fields) if (f.to) add(`${base}[].${f.from}`, `${rule.to}/${f.to}`, 'value');
    } else if (rule.item?.path) {
      add(`${base}[]`, `${rule.to}/${rule.item.path}`, 'value');
    } else {
      add(`${base}[]`, rule.to, 'value');
    }
    continue;
  }
  if (rule.records) {
    const wrap = rule.records;
    const base = rule.forEach ? `${rule.forEach}[].` : '';
    if (rule.forEach && rule.item?.fields) {
      // aggregate record
      if (rule.key?.from) add(`${base}${rule.key.from}`, `${wrap}/${rule.key.to}`, 'key');
      for (const f of rule.item.fields) if (f.to) add(`${base}${f.from}`, `${wrap}/${f.to}`, 'value');
      continue;
    }
    for (const entry of rule.entries || []) {
      const keyTarget = `${wrap}/${rule.key.to} = ${entry.key}`;
      if (entry.value) add(`${base}${entry.value.from}`, `${wrap}/${entry.value.to}`, entry.value.type || 'value');
      if (entry.object) {
        for (const f of entry.object.fields || []) {
          if (f.to) add(`${base}${entry.object.from}.${f.from}`, `${wrap}/${entry.object.to}/${f.to}`, 'object');
        }
      }
      if (entry.references) {
        add(`${entry.references.forEach}[].${entry.references.key}`, `${wrap}/${entry.references.to}`, 'ref');
      }
    }
  }
}

// ---- render as two-column correspondence ------------------------------------

const instancePaths = [...new Set(links.map(l => l.instance))];
const ublPaths = [...new Set(links.map(l => l.ubl))];

// Stable, unique, valid PlantUML aliases: one per distinct path, index-based.
const alias = new Map();
instancePaths.forEach((p, i) => alias.set('i:' + p, `I${i}`));
ublPaths.forEach((p, i) => alias.set('u:' + p, `U${i}`));
const id = (side, p) => alias.get(side + ':' + p);

const lines = [];
lines.push(`@startuml ${part}-mapping`);
lines.push(`title XML mapping correspondence - ${part}`);
lines.push('left to right direction');
lines.push('skinparam nodesep 8');
lines.push('');
lines.push('package "instance data" {');
for (const p of instancePaths) lines.push(`  class "${p}" as ${id('i', p)}`);
lines.push('}');
lines.push('');
lines.push('package "UBL XML" {');
for (const p of ublPaths) lines.push(`  class "${p}" as ${id('u', p)}`);
lines.push('}');
lines.push('');
for (const l of links) {
  lines.push(`${id('i', l.instance)} --> ${id('u', l.ubl)} : ${l.kind}`);
}
lines.push('@enduml');

const output = lines.join('\n') + '\n';
const outArg = process.argv.indexOf('--out');
if (outArg !== -1 && process.argv[outArg + 1]) {
  // Write clean UTF-8 directly (avoids shell-redirect encoding issues on Windows).
  fs.writeFileSync(path.resolve(process.cwd(), process.argv[outArg + 1]), output, 'utf8');
} else {
  process.stdout.write(output);
}
