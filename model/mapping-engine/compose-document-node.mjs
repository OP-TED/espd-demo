// Node environment wiring for the UBL document composer.
//
// compose-document.mjs is environment-neutral: it takes a `deps` object that
// supplies spec/envelope loading and codelist-attribute expansion. This module
// provides the Node implementation (fs reads + the real codelist profile) and a
// convenience composeRequest/composeResponse. The browser (Phase 6B-3) will
// provide an equivalent deps object backed by fetch + a shipped profile.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { composeDocument } from './compose-document.mjs';
import { loadCodelistProfile } from '../compiler/codelist-attributes.mjs';
import { expandCodelistAttributes } from '../compiler/schematron-validate.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const modelRoot = path.join(here, '..'); // model/

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

/** Build the Node deps object (fs loaders + a profile-bound attribute expander). */
export function nodeDeps({ codelistProfile = loadCodelistProfile() } = {}) {
  return {
    loadSpec: (rel) => readJson(path.join(modelRoot, rel)),
    loadEnvelope: () => readJson(path.join(here, 'envelope.json')),
    expandCodelistAttributes: (xml) => expandCodelistAttributes(xml, codelistProfile),
  };
}

/** Compose a document in Node. Accepts the same opts as composeDocument minus deps. */
export function compose(opts) {
  return composeDocument({ ...opts, deps: opts.deps ?? nodeDeps() });
}
