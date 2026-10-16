/**
 * E2E: export → import → resume.
 *
 * Phase 6B-3 cutover: there are now TWO exports.
 *   - "Download XML" (#btn-download) → the OFFICIAL UBL ESPD Request/Response
 *     (.xml), assembled by the document composer.
 *   - "Save draft"   (#btn-draft)    → the JSON instance document
 *     (format "espd-instance", .json) — the lossless save-progress file.
 * Import (#btn-import-home / wizard import) accepts BOTH .xml and .json.
 *
 * These tests cover the lossless JSON draft round-trip (fill → save draft →
 * import → resume) and the official UBL export + re-import (role detected).
 *
 * Cannot run in the dev sandbox (Chromium won't launch). Run: `npm run test:e2e`.
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { startWizardAs, goToPart, fillField, selectField } from './helpers.js';

test.describe('Export → import → resume', () => {
  // Importing over an existing session shows a confirm(); accept it.
  test.beforeEach(async ({ page }) => {
    page.on('dialog', (dialog) => dialog.accept());
  });

  test('a saved JSON draft re-imports and resumes with its data (lossless)', async ({ page }) => {
    await startWizardAs(page, 'contracting-authority');
    await goToPart(page, 'I');
    await fillField(page, 'partI.contractingAuthority.officialName', 'Round-Trip Authority');
    await selectField(page, 'partI.contractingAuthority.country', 'BEL');
    await fillField(page, 'partI.project.name', 'Round-Trip Procurement 2026');

    // Jump to the last part so the export buttons are available, then save draft.
    await goToPart(page, 'VI');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btn-draft').click(),
    ]);
    expect(download.suggestedFilename()).toBe('espd-request-draft.json');
    const file = path.join('e2e', 'test-output', 'roundtrip-request-draft.json');
    await download.saveAs(file);
    const doc = JSON.parse(fs.readFileSync(file, 'utf8'));
    expect(doc.format).toBe('espd-instance');
    expect(doc.instance.partI.contractingAuthority.officialName).toBe('Round-Trip Authority');
    expect(doc.instance.partI.project.name).toBe('Round-Trip Procurement 2026');

    // Fresh load → import from Home → lands in the wizard with the data restored.
    await page.goto('/');
    await expect(page.locator('#landing-page')).toBeVisible();
    await page.locator('#import-file-home').setInputFiles(file);
    await page.locator('#btn-import-home').click();

    await expect(page.locator('#wizard-container')).toBeVisible();
    await goToPart(page, 'I');
    await expect(
      page.locator('[data-field="partI.contractingAuthority.officialName"] input')
    ).toHaveValue('Round-Trip Authority');
  });

  test('the official UBL export is a valid ESPD Request XML', async ({ page }) => {
    await startWizardAs(page, 'contracting-authority');
    await goToPart(page, 'I');
    await fillField(page, 'partI.contractingAuthority.officialName', 'UBL Authority');
    await selectField(page, 'partI.contractingAuthority.country', 'BEL');

    await goToPart(page, 'VI');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btn-download').click(),
    ]);
    expect(download.suggestedFilename()).toBe('espd-request.xml');
    const file = path.join('e2e', 'test-output', 'roundtrip-request.xml');
    await download.saveAs(file);
    const xml = fs.readFileSync(file, 'utf8');
    expect(xml).toContain('<QualificationApplicationRequest');
    expect(xml).toContain('<cbc:UBLVersionID');
    // The buyer's details are carried into the UBL ContractingParty.
    expect(xml).toContain('UBL Authority');
    // Shorthand codelist attributes were expanded to the full dated set.
    expect(xml).toMatch(/listVersionID="/);
  });

  test('a UBL Request re-imports with the buyer\'s criteria selection restored', async ({ page }) => {
    // Inclusion is encoded in UBL by the PRESENCE of a cac:TenderingCriterion;
    // the importer reconstructs the selection map from it. Select a NON-mandatory
    // selection criterion (so the choice is meaningful), export UBL, re-import,
    // and assert it is still checked.
    await startWizardAs(page, 'contracting-authority');
    await goToPart(page, 'IV');
    const criterion = page.locator('#criterion-C25');
    await expect(criterion).toBeVisible();
    if (!(await criterion.isChecked())) await criterion.check();
    await expect(criterion).toBeChecked();

    await goToPart(page, 'VI');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btn-download').click(),
    ]);
    expect(download.suggestedFilename()).toBe('espd-request.xml');
    const file = path.join('e2e', 'test-output', 'roundtrip-request-selection.xml');
    await download.saveAs(file);
    expect(fs.readFileSync(file, 'utf8')).toContain('slc-suit-reg-prof'); // C25's code

    // Fresh load → import → the selection is restored (C25 still checked).
    await page.goto('/');
    await page.locator('#import-file-home').setInputFiles(file);
    await page.locator('#btn-import-home').click();
    await expect(page.locator('#wizard-container')).toBeVisible();
    await goToPart(page, 'IV');
    await expect(page.locator('#criterion-C25')).toBeChecked();
  });

  test('an EO Response UBL export re-imports and is detected as a response', async ({ page }) => {
    await startWizardAs(page, 'sole-tenderer');
    await goToPart(page, 'II');
    await fillField(page, 'partII.economicOperator.name', 'Round-Trip Operator Ltd');

    await goToPart(page, 'VI');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btn-download').click(),
    ]);
    expect(download.suggestedFilename()).toBe('espd-response.xml');
    const file = path.join('e2e', 'test-output', 'roundtrip-response.xml');
    await download.saveAs(file);
    expect(fs.readFileSync(file, 'utf8')).toContain('<QualificationApplicationResponse');

    await page.goto('/');
    await page.locator('#import-file-home').setInputFiles(file);
    await page.locator('#btn-import-home').click();
    await expect(page.locator('#wizard-container')).toBeVisible();
    // An EO response makes Part II (economic operator) available in the nav.
    await expect(
      page.locator('.espd-steps li .espd-step__num').filter({ hasText: /^II$/ })
    ).toBeVisible();
  });
});
