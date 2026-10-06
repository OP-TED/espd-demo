// Task 2.1 — value-type registry: loading, Genericode validation, provenance.
//
// The registry (value-types.json) adds, per ValueDataTypeCode: the JSON
// instanceShape and the request/response UBL value bindings. ResponseDataType.gc
// remains authoritative for which codes exist, their status, and descriptions.
//
// This module:
//   - loads the registry and the Genericode source;
//   - validates every registry value type against the gc (exists + ACTIVE +
//     description match) -> R4.4 / R8.1;
//   - checks the gc ShortName/Version match the declared provenance;
//   - validates that every value type a criterion USES is defined;
//   - exposes provenance (shortName + version) for the compiled-model envelope.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { leavesOf } from './read-structural-core.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

/** Parse a Genericode <SimpleCodeList> into a Map<code, Map<column, value>>. */
export function parseGenericode(xml) {
  const rows = new Map();
  for (const row of xml.matchAll(/<Row>([\s\S]*?)<\/Row>/g)) {
    const values = new Map();
    for (const v of row[1].matchAll(
      /<Value ColumnRef="([^"]+)">[\s\S]*?<SimpleValue>([\s\S]*?)<\/SimpleValue>[\s\S]*?<\/Value>/g
    )) {
      values.set(v[1], v[2].trim());
    }
    if (values.has('code')) rows.set(values.get('code'), values);
  }
  return rows;
}

function gcProvenance(xml) {
  const shortName = xml.match(/<Identification>[\s\S]*?<ShortName>([^<]+)<\/ShortName>/)?.[1];
  const version = xml.match(/<Identification>[\s\S]*?<Version>([^<]+)<\/Version>/)?.[1];
  return { shortName, version };
}

/** Load the registry + its Genericode source. */
export function loadRegistry(registryPath = path.join(here, 'value-types.json')) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const gcPath = path.resolve(path.dirname(registryPath), registry.source.path);
  const gcXml = fs.readFileSync(gcPath, 'utf8');
  return { registry, gcXml, gcRows: parseGenericode(gcXml) };
}

/**
 * Validate every registry value type against the Genericode source and confirm
 * provenance. Throws on the first problem. Returns provenance for the envelope.
 */
export function validateRegistry({ registry, gcXml, gcRows }) {
  const prov = gcProvenance(gcXml);
  if (prov.shortName !== registry.source.shortName) {
    throw new Error(`Genericode ShortName '${prov.shortName}' != declared '${registry.source.shortName}'`);
  }
  if (prov.version !== registry.source.version) {
    throw new Error(`Genericode Version '${prov.version}' != declared '${registry.source.version}'`);
  }

  for (const [code, def] of Object.entries(registry.valueTypes)) {
    const row = gcRows.get(code);
    if (!row) throw new Error(`Value type absent from ResponseDataType.gc: ${code}`);
    if (row.get('status') !== 'ACTIVE') throw new Error(`Value type is not ACTIVE: ${code}`);
    const gcName = (row.get('Name') ?? '').trim();
    if (gcName !== (def.sourceDescription ?? '').trim()) {
      throw new Error(
        `Value-type description differs from ResponseDataType.gc for ${code}:\n` +
        `  registry: ${def.sourceDescription}\n  gc:       ${gcName}`
      );
    }
  }

  return { shortName: prov.shortName, version: prov.version };
}

/**
 * Ensure every value type used by a criterion's value leaves is defined in the
 * registry (R4.4). Reports all unknown types at once.
 */
export function validateCriterionValueTypes(compiledOrCore, registry) {
  const leaves = leavesOf(compiledOrCore);
  const unknown = [];
  for (const leaf of leaves) {
    if (!registry.valueTypes[leaf.valueType]) {
      unknown.push(`${leaf.requestpath} (${leaf.valueType})`);
    }
  }
  if (unknown.length) {
    throw new Error(
      `Unknown value types (absent from registry):\n` +
      unknown.map(u => `  - ${u}`).join('\n')
    );
  }
}

/** Convenience: load + validate the registry and return it with provenance. */
export function loadValidatedRegistry(registryPath) {
  const loaded = loadRegistry(registryPath);
  const provenance = validateRegistry(loaded);
  return { registry: loaded.registry, gcRows: loaded.gcRows, provenance };
}
