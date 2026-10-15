// Build script: compile every modeled criterion and emit all three layers into
// model/generated/. The list of modeled criteria is derived from the sidecar
// files present in model-sources/criteria/ (a criterion is "modeled" when it has
// a .sidecar.json). Part IDs come from the sidecar's instanceModel container.
//
// Usage: node model/compiler/build-generated.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEdm, loadSidecar, compile, emitAll, generatedRoot } from './compile.mjs';
import { buildCodelistServiceData } from '../codelists/build-codelist-service-data.mjs';
import { buildCoverageReport, reportPath } from './build-coverage-report.mjs';
import { buildCompiledModel, envelopePath } from './build-compiled-model.mjs';
import { buildRolesLens } from './roles.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const edmPath = path.resolve(here, '..', '..', '..', 'espd-tools', 'EAtoJSON', 'outputs', 'espd-edm.json');
const criteriaDir = path.join(here, '..', 'model-sources', 'criteria');

// Map the instanceModel container's first segment to a part id.
const PART_BY_CONTAINER = { partI: 'I', partII: 'II', partIII: 'III', partIV: 'IV', partV: 'V', partVI: 'VI' };

const codes = fs.readdirSync(criteriaDir)
  .filter(f => f.endsWith('.sidecar.json'))
  .map(f => f.replace('.sidecar.json', ''))
  .sort();

const edm = loadEdm(edmPath);
let ok = 0, failed = 0, totalFiles = 0;

for (const code of codes) {
  try {
    const sidecar = loadSidecar(code);
    const { compiled, registry } = compile(edm, code, sidecar);
    const partId = PART_BY_CONTAINER[sidecar.criterion.instanceModel.containerPath[0]];
    const written = emitAll(code, compiled, registry, { root: generatedRoot, partId });
    totalFiles += written.length;
    ok++;
    process.stderr.write(`✓ ${code} (${written.length} files)\n`);
  } catch (err) {
    failed++;
    process.stderr.write(`✗ ${code}: ${err.message.split('\n')[0]}\n`);
  }
}

process.stderr.write(`\nGenerated ${totalFiles} files for ${ok}/${codes.length} criteria` +
  (failed ? `; ${failed} failed` : '') + ` under ${path.relative(process.cwd(), generatedRoot)}.\n`);

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

// "State of the model" coverage report (generated from the sources above).
buildCoverageReport({ write: true });
process.stderr.write(`Wrote ${path.relative(process.cwd(), reportPath)}\n`);

// Compiled-model envelope (machine-readable manifest: version + provenance +
// value types + criterion inventory + codelist digest).
buildCompiledModel({ write: true });
process.stderr.write(`Wrote ${path.relative(process.cwd(), envelopePath)}\n`);

if (failed) process.exit(1);
