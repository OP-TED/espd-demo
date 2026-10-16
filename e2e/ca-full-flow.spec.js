/**
 * E2E: Contracting Authority fills an ESPD Request and downloads it.
 *
 * Model-driven UI: fields are addressed by their model dataPath
 * ([data-field="partI…"]), Part I publication is a plain {type, identifier, url}
 * group (no radio branch). Phase 6B-3: the official export is UBL XML
 * (#btn-download); this flow saves + inspects the JSON DRAFT (#btn-draft, the
 * lossless save-progress file). The UBL XML export is covered in
 * import-export.spec.js.
 *
 * Cannot run in the dev sandbox (Chromium won't launch). Run: `npm run test:e2e`.
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { startWizardAs, goToPart, visibleStepKeys, fillField, selectField, next } from './helpers.js';

test.describe('Contracting Authority — full ESPD Request flow', () => {
  test('fills Part I, walks all visible parts, downloads the instance document', async ({ page }) => {
    await startWizardAs(page, 'contracting-authority');

    // The CA sees parts I, III, IV, V, VI (not II) — the role's visibleParts.
    expect(await visibleStepKeys(page)).toEqual(['I', 'III', 'IV', 'V', 'VI']);

    // ── Part I ─────────────────────────────────────────────
    await expect(page.locator('#form-content h2')).toContainText('Part I');

    // Publication reference: a DocRefContentType dropdown + notice number/url.
    await selectField(page, 'partI.publication.type', 'TED_CN');
    await fillField(page, 'partI.publication.identifier', '2026/S 142-123456');

    // Identity of the procurer.
    await fillField(page, 'partI.contractingAuthority.officialName', 'European Commission — DG DIGIT');
    await selectField(page, 'partI.contractingAuthority.country', 'BEL');

    // Procurement procedure.
    await fillField(page, 'partI.procedure.fileReference.value', 'DIGIT/2026/OP/0042');
    await fillField(page, 'partI.project.name', 'Supply of IT Equipment and Services 2026');
    await selectField(page, 'partI.procedure.procedureType', 'open');

    // ── Walk the remaining visible parts ───────────────────
    await next(page);
    await expect(page.locator('#form-content h2')).toContainText('Part III');
    // CA sees Part III as a criteria-selection checklist of `.criterion-card`s,
    // each a checkbox with id `criterion-C01` …; C01 is mandatory.
    await expect(page.locator('#criterion-C01')).toBeVisible();
    await expect(page.locator('.criterion-card--mandatory #criterion-C01')).toBeDisabled();

    await next(page);
    await expect(page.locator('#form-content h2')).toContainText('Part IV');
    await expect(page.locator('#criterion-C25')).toBeVisible();

    await next(page);
    await expect(page.locator('#form-content h2')).toContainText('Part V');

    await next(page);
    await expect(page.locator('#form-content h2')).toContainText('Part VI');

    // Last step → the export buttons appear (official UBL + JSON draft).
    await expect(page.locator('#btn-download')).toBeVisible();
    await expect(page.locator('#btn-draft')).toBeVisible();

    // ── Save draft + inspect (the JSON instance document) ────
    // The lossless save-progress file; the official UBL XML is covered in
    // import-export.spec.js.
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btn-draft').click(),
    ]);
    expect(download.suggestedFilename()).toBe('espd-request-draft.json');

    const outPath = path.join('e2e', 'test-output', download.suggestedFilename());
    await download.saveAs(outPath);
    const doc = JSON.parse(fs.readFileSync(outPath, 'utf8'));

    expect(doc.format).toBe('espd-instance');
    expect(doc.documentType).toBe('request');
    expect(doc.role).toBe('contracting-authority');
    expect(doc.instance.partI.contractingAuthority.officialName).toBe('European Commission — DG DIGIT');
    expect(doc.instance.partI.project.name).toBe('Supply of IT Equipment and Services 2026');
  });
});
