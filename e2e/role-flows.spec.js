/**
 * E2E behaviour: home → path-selector → wizard for every role, and the
 * role-driven visible-part set. The parity oracle for Phases 1/4 (role port +
 * data-layer rebuild): the rebuilt UI must show the same parts per role and
 * reach the wizard the same way.
 *
 * Cannot run in the dev sandbox (Chromium won't launch). Run: `npm run test:e2e`.
 */
import { test, expect } from '@playwright/test';
import { startWizardAs, visibleStepKeys } from './helpers.js';

// Golden: visibleParts per role (mirrors espd-edm/roles.json formBehavior).
const VISIBLE_PARTS = {
  'contracting-authority': ['I', 'III', 'IV', 'V', 'VI'],
  'contracting-entity': ['I', 'III', 'IV', 'V', 'VI'],
  'sole-tenderer': ['I', 'II', 'III', 'IV', 'V', 'VI'],
  'group-lead': ['I', 'II', 'III', 'IV', 'V', 'VI'],
  'group-mem': ['I', 'II', 'III', 'IV', 'VI'],
  'oeron': ['I', 'II', 'III', 'VI'],
  'subcont': ['I', 'II', 'III', 'VI'],
};

test.describe('Path selector + role-driven wizard', () => {
  test('home shows the New ESPD action and an import area', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#landing-page')).toBeVisible();
    await expect(page.locator('#btn-new-espd')).toBeVisible();
    await expect(page.locator('#import-file-home')).toBeVisible();
  });

  test('New ESPD opens the path selector with Buyer and Economic Operator', async ({ page }) => {
    await page.goto('/');
    await page.locator('#btn-new-espd').click();
    const cards = page.locator('#landing-page article');
    await expect(cards).toHaveCount(2); // Buyer, Economic Operator
  });

  test('picking Buyer enters the wizard directly (no sub-role step)', async ({ page }) => {
    await page.goto('/');
    await page.locator('#btn-new-espd').click();
    // Buyer is card 0. The UI no longer differentiates buyer sub-types, so there
    // is no step-2 role radio — selecting Buyer goes straight to the wizard.
    await page.locator('#landing-page article').nth(0).locator('button').click();
    await expect(page.locator('#wizard-container')).toBeVisible();
    await expect(page.locator('input[name="espd-role"]')).toHaveCount(0);
  });

  test('picking Economic Operator shows the EO sub-role step', async ({ page }) => {
    await page.goto('/');
    await page.locator('#btn-new-espd').click();
    // Economic Operator is card 1 → step 2 with the EO role radios.
    await page.locator('#landing-page article').nth(1).locator('button').click();
    await expect(page.locator('input[name="espd-role"][value="sole-tenderer"]')).toBeVisible();
  });

  for (const [roleId, parts] of Object.entries(VISIBLE_PARTS)) {
    // The buyer path enters as a single default buyer role, so both buyer ids
    // resolve to the same wizard; exercise only one (contracting-authority) to
    // avoid asserting a contracting-entity selection the UI no longer offers.
    if (roleId === 'contracting-entity') continue;
    test(`${roleId}: wizard shows parts ${parts.join(',')}`, async ({ page }) => {
      await startWizardAs(page, roleId);
      expect(await visibleStepKeys(page)).toEqual(parts);
    });
  }
});
