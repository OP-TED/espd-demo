// Build script: derive this app's layers from the PUBLISHED ESPD model.
//
//   npm run model:compile
//
// The app no longer compiles the ESPD model. ESPD-EDM publishes it (model/), and this
// script
//   0. vendors it into model/generated/ (sync-published.mjs; --no-sync to skip when the
//      published model is already vendored), then builds the layers that are the app's own:
//   1. form-structure/<key>.form.json   from the published compiled criteria + the value-type
//                                       registry + the app's presentation files
//   2. codelists/                       UI pick lists from the shipped code lists
//   3. ui/roles.json                    the role lens (published roles + the app's role UI)
//   4. parts lenses, ui/ bundle, ui/validators/, docs/coverage-report.md
//
// Inputs: ESPD_EDM_ROOT (default ../ESPD-EDM) with criterion/espd-edm.json, model/ and
// codelists/ (see upstream.mjs).
//
// Usage: node model/compiler/build-generated.mjs [--no-sync]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateFormStructure, loadPresentation } from './generate-form-structure.mjs';
import { syncPublished } from './sync-published.mjs';
import { generatedRoot, loadEnvelope, loadCompiled, loadValueTypeRegistry } from './published-model.mjs';
import { buildCodelistServiceData } from '../codelists/build-codelist-service-data.mjs';
import { buildCoverageReport, reportPath } from './build-coverage-report.mjs';
import { buildRolesLens } from './roles.mjs';
import { buildPartsLens } from './parts.mjs';
import { buildUiBundle } from './build-ui-bundle.mjs';
import { buildValidators } from './build-validators.mjs';

const hereDir = path.dirname(fileURLToPath(import.meta.url));
const formStructureDir = path.join(generatedRoot, 'form-structure');
const criteriaDir = path.join(hereDir, '..', 'model-sources', 'criteria');

if (!process.argv.includes('--no-sync')) {
  const env = syncPublished();
  process.stderr.write(`Synced the published model: ${env.counts.criteria} criteria, ESPD ${env.espdVersion}, UBL ${env.ublVersion}.\n`);
}

// 1. Form-structure lenses, one per published criterion. The directory is rebuilt so a
//    criterion removed from the model does not leave a stale lens behind.
const envelope = loadEnvelope();
const registry = loadValueTypeRegistry();
fs.rmSync(formStructureDir, { recursive: true, force: true });
fs.mkdirSync(formStructureDir, { recursive: true });
let ok = 0, failed = 0;
for (const { key } of envelope.criteria) {
  try {
    const { partId, criterion, hints } = loadCompiled(key);
    // Presentation overrides are the app's own, keyed by the criterion's output key.
    const presentation = loadPresentation(key, criteriaDir);
    const form = generateFormStructure(criterion, registry, { partId, hints, presentation });
    fs.writeFileSync(path.join(formStructureDir, `${key}.form.json`), JSON.stringify(form, null, 2) + '\n');
    ok++;
    process.stderr.write(`✓ ${key}\n`);
  } catch (err) {
    failed++;
    process.stderr.write(`✗ ${key}: ${err.message.split('\n')[0]}\n`);
  }
}
process.stderr.write(`\nGenerated ${ok}/${envelope.criteria.length} form lenses` +
  (failed ? `; ${failed} failed` : '') + ` under ${path.relative(process.cwd(), formStructureDir)}.\n`);

// UI codelist service data (UX1): per-codelist pick lists with multilingual
// labels, derived from the same shipped .gc files as the inlined enums.
const { index } = buildCodelistServiceData({ write: true });
const codelistCodeCount = index.codelists.reduce((n, c) => n + c.count, 0);
process.stderr.write(`Generated ${index.codelists.length} UI codelists (${codelistCodeCount} codes) under model/generated/codelists.\n`);

// UI role lens (Phase 1): role ids + form behaviour + UBL party-role bindings +
// exclusion-category map, with i18n label/description keys (English text to the
// espd.roles.json catalogue). Validated against the authored role registry.
const { lens: rolesLens } = buildRolesLens({ write: true });
process.stderr.write(`Generated UI role lens (${rolesLens.buyerTypes.length + rolesLens.eoRoles.length} roles) under model/generated/ui/roles.json.\n`);

// UI part lenses (Phase 2): the administrative Parts I & VI assembled from their
// hand-authored section lenses into model/generated/ui/part-*.json, with the
// Part I TED-lookup affordance carried as declarative uiHints. English text to
// the espd.parts.json catalogue.
const { lenses: adminLenses } = buildPartsLens({ write: true });
process.stderr.write(`Validated ${adminLenses.length} admin part lenses; wrote the espd.parts.json catalogue.\n`);

// UI assembly bundle (Phase 3): the part -> ordered sections -> ordered members
// structure (criterion form-structures + admin lenses, grouped by the EA section
// structure) + the composed $ref JSON Schemas (per-part roots + document root).
// Must run AFTER the form lenses and the sync (needs form-structure + instance-data).
const { partLenses, criteriaByPart } = buildUiBundle({ write: true });
const bundledCriteria = [...criteriaByPart.values()].reduce((n, c) => n + c.length, 0);
const bundledSections = partLenses.reduce((n, l) => n + l.sections.length, 0);
process.stderr.write(`Assembled UI bundle: ${partLenses.length} parts, ${bundledSections} sections, ${bundledCriteria} criteria under model/generated/ui/{index.json, part-*.json, schema/*}.\n`);

// Standalone Ajv validators (Phase 6A): precompiled validate() functions for the
// four part roots + six admin sections, emitted as a self-contained ESM module
// (no Ajv compiler/eval, no runtime require) for client-side validation. Must run
// AFTER the UI bundle (it compiles the composed $ref schemas the bundle emits).
const { names: validatorNames } = buildValidators({ write: true });
process.stderr.write(`Generated ${validatorNames.length} standalone validators under model/generated/ui/validators/index.mjs.\n`);

// "State of the model" coverage report (generated from the sources above).
buildCoverageReport({ write: true });
process.stderr.write(`Wrote ${path.relative(process.cwd(), reportPath)}\n`);

if (failed) process.exit(1);
