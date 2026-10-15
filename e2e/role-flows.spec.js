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

  test('New ESPD opens a two-step path selector (Buyer / Economic Operator)', async ({ page }) => {
    await page.goto('/');
    await page.locator('#btn-new-espd').click();
    const cards = page.locator('#landing-page article');
    await expect(cards).toHaveCount(2); // Buyer, Economic Operator
    // Step 1 → pick Buyer → step 2 shows the buyer role radios.
    await cards.nth(0).locator('button').click();
    await expect(page.locator('input[name="espd-role"][value="contracting-authority"]')).toBeVisible();
    await expect(page.locator('input[name="espd-role"][value="contracting-entity"]')).toBeVisible();
  });

  for (const [roleId, parts] of Object.entries(VISIBLE_PARTS)) {
    test(`${roleId}: wizard shows parts ${parts.join(',')}`, async ({ page }) => {
      await startWizardAs(page, roleId);
      expect(await visibleStepKeys(page)).toEqual(parts);
    });
  }
});
