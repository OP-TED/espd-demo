/**
 * E2E: export → import → resume round-trip on the JSON instance document.
 *
 * REWRITTEN for the Phase 4/5 cutover: export/import now round-trip the JSON
 * instance document (format "espd-instance"), not UBL XML. UBL via the mapping
 * engine returns in Phase 6; this proves the data round-trip (fill → download →
 * import → resume) holds on the instance document itself.
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

  test('a downloaded ESPD Request re-imports and resumes with its data', async ({ page }) => {
    await startWizardAs(page, 'contracting-authority');
    await goToPart(page, 'I');
    await fillField(page, 'partI.contractingAuthority.officialName', 'Round-Trip Authority');
    await selectField(page, 'partI.contractingAuthority.country', 'BEL');
    await fillField(page, 'partI.project.name', 'Round-Trip Procurement 2026');

    // Jump to the last part so Download is available, then download.
    await goToPart(page, 'VI');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btn-download').click(),
    ]);
    expect(download.suggestedFilename()).toBe('espd-request.json');
    const file = path.join('e2e', 'test-output', 'roundtrip-request.json');
    await download.saveAs(file);
    const doc = JSON.parse(fs.readFileSync(file, 'utf8'));
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

  test('importing an EO Response is detected as a response document', async ({ page }) => {
    await startWizardAs(page, 'sole-tenderer');
    await goToPart(page, 'II');
    await fillField(page, 'partII.economicOperator.name', 'Round-Trip Operator Ltd');

    await goToPart(page, 'VI');
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btn-download').click(),
    ]);
    expect(download.suggestedFilename()).toBe('espd-response.json');
    const file = path.join('e2e', 'test-output', 'roundtrip-response.json');
    await download.saveAs(file);

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
