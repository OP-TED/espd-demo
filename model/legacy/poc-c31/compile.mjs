import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const defaultSource = path.resolve(
  here,
  '..', '..', '..', '..', '..',
  'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json'
);
const enrichmentPath = path.join(here, 'semantic-enrichment.json');
const valueTypesPath = path.join(here, 'value-types.json');
const instanceSchemaPath = path.resolve(here, '..', '..', '..', 'instance-data', 'part-IV.schema.json');

function option(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

const sourcePath = path.resolve(option('--source') ?? defaultSource);
const outputPath = option('--out');
const edm = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const enrichment = JSON.parse(fs.readFileSync(enrichmentPath, 'utf8'));
const valueTypeModel = JSON.parse(fs.readFileSync(valueTypesPath, 'utf8'));
const instanceSchema = JSON.parse(fs.readFileSync(instanceSchemaPath, 'utf8'));
const responseDataTypePath = path.resolve(here, valueTypeModel.source.path);
const responseDataTypeGc = fs.readFileSync(responseDataTypePath, 'utf8');

function findCriterion(parts, code) {
  for (const part of parts) {
    for (const section of part.sections ?? []) {
      const criterion = (section.criteria ?? []).find(item => item.code === code);
      if (criterion) return criterion;
    }
  }
  return undefined;
}

const sourceCriterion = findCriterion(edm, enrichment.criterion.code);
if (!sourceCriterion) {
  throw new Error(`Criterion not found: ${enrichment.criterion.code}`);
}

const criterion = structuredClone(sourceCriterion);
criterion.id = enrichment.criterion.id;
criterion.instanceModel = enrichment.criterion.instanceModel;

const componentsByPath = new Map();
const semanticComponents = [];

function walk(components) {
  for (const component of components ?? []) {
    if (component.requestpath) componentsByPath.set(component.requestpath, component);
    if (component.type === 'REQUIREMENT' || component.type === 'QUESTION') {
      semanticComponents.push(component);
    }
    walk(component.components);
  }
}

walk(criterion.components);

for (const [requestpath, metadata] of Object.entries(enrichment.components)) {
  const component = componentsByPath.get(requestpath);
  if (!component) throw new Error(`Enrichment path not found in source: ${requestpath}`);
  component.id = metadata.id;
  component.instanceBinding = metadata.instanceBinding;
}

const missing = semanticComponents.filter(component => !component.id || !component.instanceBinding);
if (missing.length) {
  throw new Error(
    `Missing semantic IDs or instance bindings:\n${missing.map(component => `- ${component.requestpath}`).join('\n')}`
  );
}

const allIds = [criterion.id, ...semanticComponents.map(component => component.id)];
const duplicateIds = allIds.filter((id, index) => allIds.indexOf(id) !== index);
if (duplicateIds.length) {
  throw new Error(`Duplicate semantic IDs: ${[...new Set(duplicateIds)].join(', ')}`);
}

function resolveReference(node) {
  if (!node?.$ref) return node;
  const prefix = '#/$defs/';
  if (!node.$ref.startsWith(prefix)) throw new Error(`Unsupported schema reference: ${node.$ref}`);
  const resolved = instanceSchema.$defs?.[node.$ref.slice(prefix.length)];
  if (!resolved) throw new Error(`Schema reference not found: ${node.$ref}`);
  return resolved;
}

function assertSchemaPath(segments, component) {
  let schemaNode = instanceSchema;
  for (const segment of segments) {
    schemaNode = resolveReference(schemaNode);
    const next = schemaNode?.properties?.[segment];
    if (!next) {
      throw new Error(`Instance binding for ${component.id} is absent from schema: ${segments.join('.')}`);
    }
    schemaNode = next;
  }
  return resolveReference(schemaNode);
}

function genericodeRows(xml) {
  const rows = new Map();
  for (const row of xml.matchAll(/<Row>([\s\S]*?)<\/Row>/g)) {
    const values = new Map();
    for (const value of row[1].matchAll(/<Value ColumnRef="([^"]+)">[\s\S]*?<SimpleValue>([\s\S]*?)<\/SimpleValue>[\s\S]*?<\/Value>/g)) {
      values.set(value[1], value[2].trim());
    }
    if (values.has('code')) rows.set(values.get('code'), values);
  }
  return rows;
}

function assertShape(expected, actual, location) {
  actual = resolveReference(actual);
  if (expected.type && actual.type !== expected.type) {
    throw new Error(`${location}: expected schema type ${expected.type}, found ${actual.type}`);
  }
  if (expected.format && actual.format !== expected.format) {
    throw new Error(`${location}: expected schema format ${expected.format}, found ${actual.format}`);
  }
  for (const required of expected.required ?? []) {
    if (!(actual.required ?? []).includes(required)) {
      throw new Error(`${location}: schema does not require ${required}`);
    }
  }
  for (const [name, property] of Object.entries(expected.properties ?? {})) {
    if (!actual.properties?.[name]) throw new Error(`${location}: schema property ${name} is missing`);
    assertShape(property, actual.properties[name], `${location}.${name}`);
  }
  if (expected.items) {
    if (!actual.items) throw new Error(`${location}: schema array items are missing`);
    assertShape(expected.items, actual.items, `${location}[]`);
  }
}

const model = criterion.instanceModel;
if (!Array.isArray(model?.containerPath) || model.containerPath.length === 0) {
  throw new Error('C31 instanceModel must have a non-empty containerPath array');
}
if (model.key?.source !== 'code') {
  throw new Error('C31 instanceModel must select its container key from criterion.code');
}

const sourceRows = genericodeRows(responseDataTypeGc);
const valueTypes = valueTypeModel.valueTypes;
const sourceShortName = responseDataTypeGc.match(/<Identification>[\s\S]*?<ShortName>([^<]+)<\/ShortName>/)?.[1];
const sourceVersion = responseDataTypeGc.match(/<Identification>[\s\S]*?<Version>([^<]+)<\/Version>/)?.[1];
if (sourceShortName !== valueTypeModel.source.shortName) {
  throw new Error(`Expected ${valueTypeModel.source.shortName} Genericode, found ${sourceShortName ?? 'no ShortName'}`);
}
if (sourceVersion !== valueTypeModel.source.version) {
  throw new Error(`Expected ResponseDataType ${valueTypeModel.source.version}, found ${sourceVersion ?? 'no Version'}`);
}
for (const [code, definition] of Object.entries(valueTypes)) {
  const source = sourceRows.get(code);
  if (!source) throw new Error(`Value type is absent from ResponseDataType.gc: ${code}`);
  if (source.get('status') !== 'ACTIVE') throw new Error(`Value type is not active: ${code}`);
  if (source.get('Name')?.trim() !== definition.sourceDescription.trim()) {
    throw new Error(`Value-type description differs from ResponseDataType.gc: ${code}`);
  }
}

for (const component of semanticComponents) {
  const binding = component.instanceBinding;
  const expectedSide = component.type === 'REQUIREMENT' ? 'requirement' : 'response';
  if (binding.side !== expectedSide) {
    throw new Error(`${component.id} must bind to the ${expectedSide} side`);
  }
  if (!Array.isArray(binding.path) || binding.path.length === 0) {
    throw new Error(`${component.id} must have a non-empty instanceBinding.path array`);
  }
  const resolvedPath = [
    ...model.containerPath,
    criterion[model.key.source],
    binding.side,
    ...binding.path
  ];
  const schemaNode = assertSchemaPath(resolvedPath, component);
  const valueType = valueTypes[component.propertydatatype];
  if (!valueType) throw new Error(`No value-type definition for ${component.propertydatatype}`);
  assertShape(valueType.instanceShape, schemaNode, component.id);
}

const json = `${JSON.stringify(criterion, null, 2)}\n`;
if (outputPath) {
  fs.writeFileSync(path.resolve(outputPath), json, 'utf8');
  process.stderr.write(`Wrote enriched C31 to ${path.resolve(outputPath)}\n`);
} else {
  process.stdout.write(json);
}

process.stderr.write(
  `Validated ${semanticComponents.length} C31 components and ${Object.keys(valueTypes).length} active ResponseDataType value types.\n`
);
