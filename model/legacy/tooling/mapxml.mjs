#!/usr/bin/env node
// EXPERIMENTAL — CLI wrapper over the mapping engine (mapper.mjs).
// A thin front-end that runs the correspondence spec in either direction.
//
// The legacy per-part artifacts now live under model/legacy/: mapping specs in
// ../xml-mapping/ and example instances in ../instance-data/ (relative to this
// tooling dir). A bare filename argument is resolved against those dirs; a path
// containing a separator is honored as given (relative to cwd).
//
// Export (instance JSON -> UBL XML):
//   node mapxml.mjs export <instance.json> [mapping.json]
//   node mapxml.mjs export part-I.example.json part-I.mapping.json
//
// Import (UBL XML -> instance JSON):
//   node mapxml.mjs import <input.xml> [mapping.json]
//
// Defaults: mapping.json defaults to part-I.mapping.json; with no args at all,
// exports the Part I example (handy for a quick look).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { map, unmap } from '../../mapping-engine/mapper.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const specsDir = path.resolve(__dirname, '..', 'xml-mapping');
const examplesDir = path.resolve(__dirname, '..', 'instance-data');

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

// A bare filename is resolved against the given legacy dir; a path with a
// separator is used as-is (relative to cwd).
const resolveIn = (dir, arg) => (arg.includes('/') || arg.includes('\\'))
  ? path.resolve(arg)
  : path.join(dir, arg);

// Sensible default input so `node mapxml.mjs export` alone still does something useful.
const input = inputArg || (direction === 'export' ? 'part-I.example.json' : undefined);
if (!input) usage('import requires an input .xml file');

const spec = JSON.parse(fs.readFileSync(resolveIn(specsDir, mappingArg), 'utf8'));

if (direction === 'export') {
  const data = JSON.parse(fs.readFileSync(resolveIn(examplesDir, input), 'utf8'));
  console.log(map(spec, data));
} else {
  const xml = fs.readFileSync(resolveIn(examplesDir, input), 'utf8');
  console.log(JSON.stringify(unmap(spec, xml), null, 2));
}
