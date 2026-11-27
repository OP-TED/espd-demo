// Read access to the VENDORED published model under model/generated/.
//
// `npm run model:sync` copies ESPD-EDM's published model here (compiled/, instance-data/,
// xml-mapping/, registries/, compiled-model.json). Everything this app builds or tests
// against the model reads it through these helpers, never from the EA export or from
// enrichment sources.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

/** model/generated, where the vendored published model and the app's own layers live. */
export const generatedRoot = path.resolve(here, '..', 'generated');

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

/** The vendored envelope (compiled-model.json). */
export function loadEnvelope(root = generatedRoot) {
  return readJson(path.join(root, 'compiled-model.json'));
}

/**
 * The vendored EA structure projection (parts > sections > ordered members), written by
 * model:sync from the structure export the model was verified against.
 */
export function loadStructure(root = generatedRoot) {
  return readJson(path.join(root, 'structure.json'));
}

/** The output keys of all published criteria, in envelope order (part, then key). */
export function criterionKeys(root = generatedRoot) {
  return loadEnvelope(root).criteria.map((c) => c.key);
}

/** compiled/<key>.json: { key, partId, criterion, hints }. */
export function loadCompiled(key, root = generatedRoot) {
  return readJson(path.join(root, 'compiled', `${key}.json`));
}

/** A published registry by name, e.g. loadRegistry('value-types'). */
export function loadRegistry(name, root = generatedRoot) {
  return readJson(path.join(root, 'registries', `${name}.json`));
}

/** The value-type registry the form generator consumes. */
export function loadValueTypeRegistry(root = generatedRoot) {
  return loadRegistry('value-types', root);
}
