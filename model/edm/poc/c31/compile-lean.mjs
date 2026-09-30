import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.join(here, 'source');
const criterionPath = path.join(sourceRoot, 'criteria', 'slc-stand-to-spec-avg.json');
const instanceBindingPath = path.join(
  sourceRoot, 'bindings', 'instance-data', 'slc-stand-to-spec-avg.json'
);
const nodeKindsPath = path.join(sourceRoot, 'node-kinds.json');
const fragmentsPath = path.join(sourceRoot, 'fragments');
const defaultEdmPath = path.resolve(
  here, '..', '..', '..', '..', '..',
  'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json'
);

function option(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const leanCriterion = readJson(criterionPath);
const instanceBindingModel = readJson(instanceBindingPath);
const conventions = readJson(nodeKindsPath);
const valueTypeModel = readJson(path.join(here, 'value-types.json'));
const semanticEnrichment = readJson(path.join(here, 'semantic-enrichment.json'));
const edmPath = path.resolve(option('--source') ?? defaultEdmPath);
const outputPath = option('--out');

const fragments = new Map();
let fragmentExpansionCount = 0;
for (const name of fs.readdirSync(fragmentsPath).filter(name => name.endsWith('.json'))) {
  const fragment = readJson(path.join(fragmentsPath, name));
  fragments.set(fragment.id, fragment);
}

function substitute(value, parameters) {
  if (Array.isArray(value)) {
    return value.map(item => substitute(item, parameters));
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, substitute(item, parameters)]));
  }
  if (typeof value !== 'string') return value;
  return value.replace(/\$\{([^}]+)\}/g, (_, name) => {
    if (!(name in parameters)) throw new Error(`Missing fragment parameter: ${name}`);
    return parameters[name];
  });
}

function expandLeanNode(node) {
  if (node.use) {
    fragmentExpansionCount += 1;
    const fragment = fragments.get(node.use);
    if (!fragment) throw new Error(`Unknown fragment: ${node.use}`);
    return expandLeanNode(substitute(fragment.node, node.with ?? {}));
  }
  return {
    ...node,
    children: (node.children ?? []).map(expandLeanNode)
  };
}

const expandedLeanCriterion = {
  ...leanCriterion,
  children: leanCriterion.children.map(expandLeanNode)
};

function metadataValue(rule, node) {
  if (!rule) return undefined;
  if ('const' in rule) return rule.const;
  if (rule.source === 'tag') return node.tag;
  throw new Error(`Unsupported metadata rule: ${JSON.stringify(rule)}`);
}

function compileNode(node, parentPath) {
  const convention = conventions.nodeKinds[node.kind];
  if (!convention) throw new Error(`Unknown node kind: ${node.kind}`);
  if (!node.tag || !node.cardinality) throw new Error(`${node.kind} requires tag and cardinality`);

  const requestpath = `${parentPath}/${node.tag}`;
  const compiled = {
    tag: node.tag,
    type: convention.type,
    cardinality: node.cardinality
  };

  if (node.children.length || convention.emitEmptyComponents) {
    compiled.components = node.children.map(child => compileNode(child, requestpath));
  }
  compiled.requestpath = requestpath;

  const description = node.description ?? metadataValue(convention.description, node);
  const title = node.title ?? metadataValue(convention.title, node);
  if (title !== undefined) compiled.title = title;
  if (description !== undefined) compiled.description = description;

  if (convention.pathMode === 'value') {
    compiled.propertydatatype = node.valueType;
    compiled.code = convention.code;
    compiled.responsepath = [requestpath, ...conventions.paths.responseValueSuffix].join('/');
    compiled.contentpath = [compiled.responsepath, ...conventions.paths.contentValueSuffix].join('/');
  } else {
    compiled.responsepath = requestpath;
    if (convention.defaultCode) {
      compiled.code = node.condition
        ? conventions.conditions[node.condition]
        : convention.defaultCode;
      if (!compiled.code) throw new Error(`Unknown condition ${node.condition} on ${requestpath}`);
    }
  }

  if (node.id) {
    compiled.id = node.id;
    const binding = instanceBindingModel.components[node.id];
    if (binding) compiled.instanceBinding = binding;
  }
  return compiled;
}

const rootPath = `${leanCriterion.tag}_${leanCriterion.code}`;
const criterion = {
  tag: leanCriterion.tag,
  type: 'CRITERION',
  uuid: leanCriterion.uuid,
  code: leanCriterion.code,
  cardinality: leanCriterion.cardinality,
  components: expandedLeanCriterion.children.map(node => compileNode(node, rootPath)),
  name: leanCriterion.name,
  description: leanCriterion.description,
  requestpath: rootPath,
  responsepath: rootPath,
  id: leanCriterion.id,
  instanceModel: instanceBindingModel.instanceModel
};

function findCriterion(parts, code) {
  for (const part of parts) {
    for (const section of part.sections ?? []) {
      const found = (section.criteria ?? []).find(criterion => criterion.code === code);
      if (found) return found;
    }
  }
  return undefined;
}

function eaProjection(value) {
  if (Array.isArray(value)) return value.map(eaProjection);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value)
    .filter(([key]) => key !== 'id' && key !== 'instanceBinding' && key !== 'instanceModel')
    .map(([key, item]) => [key, eaProjection(item)]));
}

const originalCriterion = findCriterion(readJson(edmPath), leanCriterion.code);
if (!originalCriterion) throw new Error(`Criterion not found in ${edmPath}: ${leanCriterion.code}`);
assert.deepStrictEqual(eaProjection(criterion), originalCriterion,
  'Lean C31 does not compile to the original EA criterion');

const valueTypes = valueTypeModel.valueTypes;
const compiledSemanticNodes = new Map();
const usedBindingIds = new Set();
let semanticNodeCount = 0;
(function validate(nodes) {
  for (const node of nodes) {
    if (node.type === 'QUESTION' || node.type === 'REQUIREMENT') {
      semanticNodeCount += 1;
      if (!node.id || !node.instanceBinding) throw new Error(`Missing semantic metadata: ${node.requestpath}`);
      if (!valueTypes[node.propertydatatype]) throw new Error(`Unknown value type: ${node.propertydatatype}`);
      usedBindingIds.add(node.id);
      compiledSemanticNodes.set(node.requestpath, {
        id: node.id,
        instanceBinding: node.instanceBinding
      });
    }
    validate(node.components ?? []);
  }
})(criterion.components);

if (instanceBindingModel.criterion !== criterion.id) {
  throw new Error(`Instance binding targets ${instanceBindingModel.criterion}, expected ${criterion.id}`);
}
const unusedBindingIds = Object.keys(instanceBindingModel.components)
  .filter(id => !usedBindingIds.has(id));
if (unusedBindingIds.length) {
  throw new Error(`Instance bindings reference missing semantic IDs: ${unusedBindingIds.join(', ')}`);
}

assert.deepStrictEqual(criterion.instanceModel, semanticEnrichment.criterion.instanceModel,
  'Lean C31 instanceModel differs from the validated semantic enrichment');
assert.deepStrictEqual(Object.fromEntries(compiledSemanticNodes), semanticEnrichment.components,
  'Lean C31 semantic IDs or bindings differ from the validated semantic enrichment');

const json = `${JSON.stringify(criterion, null, 2)}\n`;
if (outputPath) {
  fs.writeFileSync(path.resolve(outputPath), json, 'utf8');
  process.stderr.write(`Wrote lean-compiled C31 to ${path.resolve(outputPath)}\n`);
} else {
  process.stdout.write(json);
}

process.stderr.write(
  `Lean C31 matches the original EA structure exactly; validated ${semanticNodeCount} semantic nodes and expanded ${fragments.size} shared fragment ${fragmentExpansionCount} times.\n`
);
