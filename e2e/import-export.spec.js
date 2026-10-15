/**
 * E2E: export → import → resume round-trip.
 *
 * Characterizes the CURRENT export/import behaviour (hand-rolled in
 * js/xml-export.js + js/xml-import.js, keyed on contentpath). Phase 6 replaces
 * these with the mapping engine; this round-trip is the parity oracle — the
 * rebuilt lossless path must at least preserve what today's path round-trips.
 *
 * The fixture is produced BY the test (fill → download) so there is no large
 * committed XML to drift. Cannot run in the dev sandbox (Chromium won't launch).
 * Run: `npm run test:e2e`.
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { startWizardAs, goToPart, fillField, selectField } from './helpers.js';

test.describe('Export → import → resume', () => {
  // The CURRENT UI warns before importing over an existing session:
  // handleImportFile() calls confirm('Importing will replace your current
  // session…') whenever hasSession() && hasAnswers(). After step 1 fills + the
  // state persists to localStorage, a fresh load restores that session, so the
  // confirm fires on import. Accept it so the import proceeds.
  test.beforeEach(async ({ page }) => {
    page.on('dialog', (dialog) => dialog.accept());
  });

  test('a downloaded ESPD Request re-imports and resumes with its data', async ({ page }) => {
    // 1) Fill a minimal Part I as the Contracting Authority and download.
    await startWizardAs(page, 'contracting-authority');
    await goToPart(page, 'I');
    await fillField(page, 'PI02_proc-procurer-id/QG1/Q1/R1/RV', 'Round-Trip Authority');
    await selectField(page, 'PI02_proc-procurer-id/QG1/Q2/R1/RV', 'BEL');
    await fillField(page, 'PI03_proc-procedure-info/QG1/Q1/R1/RV', 'Round-Trip Procurement 2026');

    // Jump to the last part so Download is available, then download.
    await goToPart(page, 'VI');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btn-download').click(),
    ]);
    const file = path.join('e2e', 'test-output', 'roundtrip-request.xml');
    await download.saveAs(file);
    const xml = fs.readFileSync(file, 'utf8');
    expect(xml).toContain('Round-Trip Authority');
    expect(xml).toContain('Round-Trip Procurement 2026');

    // 2) Fresh load → import the downloaded file from the Home page.
    await page.goto('/');
    await expect(page.locator('#landing-page')).toBeVisible();
    await page.locator('#import-file-home').setInputFiles(file);
    await page.locator('#btn-import-home').click();

    // 3) Import lands in the wizard; the imported data is present (resume).
    await expect(page.locator('#wizard-container')).toBeVisible();
    await goToPart(page, 'I');
    await expect(
      page.locator('[data-contentpath="PI02_proc-procurer-id/QG1/Q1/R1/RV"] input')
    ).toHaveValue('Round-Trip Authority');
  });

  test('importing an EO Response is detected as a response document', async ({ page }) => {
    // Produce a Response via a sole tenderer, then re-import and confirm the
    // wizard comes back in Response mode (EO parts visible).
    await startWizardAs(page, 'sole-tenderer');
    await goToPart(page, 'II');
    await fillField(page, 'EO01_eo-info-general/QG1/Q1/R1/RV', 'Round-Trip Operator Ltd');

    await goToPart(page, 'VI');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btn-download').click(),
    ]);
    expect(download.suggestedFilename()).toBe('espd-response.xml');
    const file = path.join('e2e', 'test-output', 'roundtrip-response.xml');
    await download.saveAs(file);

    await page.goto('/');
    await page.locator('#import-file-home').setInputFiles(file);
    await page.locator('#btn-import-home').click();
    await expect(page.locator('#wizard-container')).toBeVisible();
    // An EO response makes Part II (economic operator) available in the nav.
    // Exact-match the step number so 'II' does not also match 'III'/'IV'.
    await expect(
      page.locator('.espd-steps li .espd-step__num').filter({ hasText: /^II$/ })
    ).toBeVisible();
  });
});
