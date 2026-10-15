/**
 * E2E: Contracting Authority fills an ESPD Request and downloads the XML.
 *
 * REWRITTEN for Phase 0 against the CURRENT flow (home → path-selector → wizard)
 * and the current contentpaths (PI01_proc-pub-ref / PI02_proc-procurer-id /
 * PI03_proc-procedure-info). The previous version targeted a removed
 * `#btn-role-ca` button and stale `PI01_proc-publication-info` paths.
 *
 * Cannot run in the dev sandbox (Chromium won't launch). Run: `npm run test:e2e`.
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { startWizardAs, goToPart, visibleStepKeys, fillField, selectField, next } from './helpers.js';

test.describe('Contracting Authority — full ESPD Request flow', () => {
  test('fills Part I, walks all visible parts, downloads the Request XML', async ({ page }) => {
    await startWizardAs(page, 'contracting-authority');

    // The CA sees parts I, III, IV, V, VI (not II) — the role's visibleParts.
    expect(await visibleStepKeys(page)).toEqual(['I', 'III', 'IV', 'V', 'VI']);

    // ── Part I ─────────────────────────────────────────────
    await expect(page.locator('#form-content h2')).toContainText('Part I');

    // Publication reference (PI01)
    await fillField(page, 'PI01_proc-pub-ref/QG1/Q1/R1/RV', '2026/S 142-123456');
    await fillField(page, 'PI01_proc-pub-ref/QG1/Q2/R1/RV', 'https://ted.europa.eu/en/notice/-/detail/123456-2026');

    // Procurer identity (PI02)
    await fillField(page, 'PI02_proc-procurer-id/QG1/Q1/R1/RV', 'European Commission — DG DIGIT');
    await selectField(page, 'PI02_proc-procurer-id/QG1/Q2/R1/RV', 'BEL');
    await fillField(page, 'PI02_proc-procurer-id/QG1/Q4/R1/RV', 'BE-0123456789');

    // Procedure info (PI03)
    await fillField(page, 'PI03_proc-procedure-info/QG1/Q1/R1/RV', 'Supply of IT Equipment and Services 2026');
    await fillField(page, 'PI03_proc-procedure-info/QG1/Q2/R1/RV', 'DIGIT/2026/OP/0042');

    // ── Walk the remaining visible parts ───────────────────
    await next(page);
    await expect(page.locator('#form-content h2')).toContainText('Part III');
    // CA sees Part III as a criteria-selection checklist; C01 is present + mandatory.
    await expect(page.locator('[data-section-tag="C01"]')).toBeVisible();

    await next(page);
    await expect(page.locator('#form-content h2')).toContainText('Part IV');
    await expect(page.locator('[data-section-tag="C25"]')).toBeVisible();

    await next(page);
    await expect(page.locator('#form-content h2')).toContainText('Part V');

    await next(page);
    await expect(page.locator('#form-content h2')).toContainText('Part VI');

    // Last step → Download appears.
    await expect(page.locator('#btn-download')).toBeVisible();

    // ── Download + inspect ─────────────────────────────────
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btn-download').click(),
    ]);
    expect(download.suggestedFilename()).toBe('espd-request.xml');

    const outPath = path.join('e2e', 'test-output', download.suggestedFilename());
    await download.saveAs(outPath);
    const xml = fs.readFileSync(outPath, 'utf8');

    expect(xml).toContain('<?xml version="1.0"');
    expect(xml).toContain('QualificationApplicationRequest');
    expect(xml).toContain('ESPD Request');
    expect(xml).toContain('European Commission');
    expect(xml).toContain('Supply of IT Equipment and Services 2026');
    expect(xml).toContain('TenderingCriterion');
  });
});
