// The coverage report must stay in sync with the model: regenerate it in memory
// and compare against the committed docs/coverage-report.md. Also sanity-check a
// few invariants so an accidental mis-render is caught, not just drift.

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildCoverageReport, reportPath, collectModel, renderReport } from './build-coverage-report.mjs';

test('docs/coverage-report.md is up to date (regenerate with `npm run model:compile`)', () => {
  const fresh = buildCoverageReport({ write: false });
  const onDisk = fs.readFileSync(reportPath, 'utf8');
  assert.equal(onDisk, fresh,
    'docs/coverage-report.md is stale — run `npm run model:compile` and commit the result.');
});

test('the report is deterministic (same output across two renders)', () => {
  assert.equal(renderReport(collectModel()), renderReport(collectModel()));
});

test('every modeled criterion appears exactly once in the report body', () => {
  const model = collectModel();
  const md = renderReport(model);
  for (const c of model.criteria) {
    const occurrences = md.split(`| ${c.id} | `).length - 1;
    assert.equal(occurrences, 1, `${c.id} should appear once as a criterion row`);
  }
});

test('the summary reflects the real counts', () => {
  const model = collectModel();
  const md = renderReport(model);
  assert.match(md, new RegExp(`\\| Modeled criteria \\(sidecars\\) \\| ${model.criteria.length} \\|`));
  assert.match(md, new RegExp(`\\| EA criteria \\(CRITERION entries\\) \\| ${model.eaCriteria.length} \\|`));
  assert.match(md, /\| ESPD parts \| 6 \|/);
});

test('every registered value type is listed with its usage count', () => {
  const model = collectModel();
  const md = renderReport(model);
  for (const vt of Object.keys(model.valueTypes.valueTypes)) {
    assert.ok(md.includes(`| ${vt} |`), `value type ${vt} is listed`);
  }
});

test('every governance codelist is listed', () => {
  const model = collectModel();
  const md = renderReport(model);
  for (const name of Object.keys(model.governance.codelists)) {
    assert.ok(md.includes(`| ${name} |`), `codelist ${name} is listed`);
  }
});
