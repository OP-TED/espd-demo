#!/usr/bin/env node
// EXPERIMENTAL — CLI wrapper over the mapping engine (mapper.mjs).
// A thin front-end that runs the correspondence spec in either direction.
//
// Export (instance JSON -> UBL XML):
//   node mapxml.mjs export <instance.json> [mapping.json]
//   node mapxml.mjs export ../instance-data/part-I.example.json part-I.mapping.json
//
// Import (UBL XML -> instance JSON):
//   node mapxml.mjs import <input.xml> [mapping.json]
//
// Defaults: mapping.json defaults to part-I.mapping.json; with no args at all,
// exports the Part I example (handy for a quick look).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { map, unmap } from './mapper.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function usage(msg) {
  if (msg) console.error(`Error: ${msg}\n`);
  console.error('Usage:');
  console.error('  node mapxml.mjs export <instance.json> [mapping.json]   # JSON -> XML');
  console.error('  node mapxml.mjs import <input.xml>     [mapping.json]   # XML  -> JSON');
  process.exit(msg ? 1 : 0);
}

const [direction = 'export', inputArg, mappingArg = 'part-I.mapping.json'] = process.argv.slice(2);

if (direction === '-h' || direction === '--help') usage();
if (direction !== 'export' && direction !== 'import') {
  usage(`unknown direction "${direction}" (expected "export" or "import")`);
}

// Sensible default input so `node mapxml.mjs export` alone still does something useful.
const input = inputArg || (direction === 'export' ? '../instance-data/part-I.example.json' : undefined);
if (!input) usage('import requires an input .xml file');

const readText = (rel) => fs.readFileSync(path.resolve(__dirname, rel), 'utf8');
const spec = JSON.parse(readText(mappingArg));

if (direction === 'export') {
  const data = JSON.parse(readText(input));
  console.log(map(spec, data));
} else {
  const xml = readText(input);
  console.log(JSON.stringify(unmap(spec, xml), null, 2));
}
