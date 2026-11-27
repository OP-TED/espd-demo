// The fixed codelist-attribute profile, as published in ESPD-EDM's model/registries and
// vendored into model/generated/registries/codelist-attributes.json.
//
// Loader only. The profile is defined upstream (enrichment registry, cross-checked against
// the Schematron by espd-tools/model-compiler); this app just reads it.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

/** Default location: the vendored published registry. */
export const defaultProfilePath = path.resolve(here, '..', 'generated', 'registries', 'codelist-attributes.json');

export function loadCodelistProfile(profilePath = defaultProfilePath) {
  return JSON.parse(fs.readFileSync(profilePath, 'utf8'));
}
