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

test.describe('Two-role home + role-driven wizard', () => {
  test('home shows the Buyer and Economic Operator panels with their actions', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#landing-page')).toBeVisible();
    await expect(page.locator('#btn-buyer-create')).toBeVisible();
    await expect(page.locator('#btn-buyer-reuse')).toBeVisible();
    await expect(page.locator('#btn-eo-create')).toBeVisible();
    await expect(page.locator('#btn-eo-import')).toBeVisible();
  });

  test('Buyer "Create new ESPD request" enters the wizard directly (no sub-role step)', async ({ page }) => {
    await page.goto('/');
    await page.locator('#btn-buyer-create').click();
    await expect(page.locator('#wizard-container')).toBeVisible();
    await expect(page.locator('input[name="espd-role"]')).toHaveCount(0);
  });

  test('EO "Create new ESPD" shows the sub-role picker', async ({ page }) => {
    await page.goto('/');
    await page.locator('#btn-eo-create').click();
    await expect(page.locator('input[name="espd-role"][value="sole-tenderer"]')).toBeVisible();
    await expect(page.locator('input[name="espd-role"][value="group-lead"]')).toBeVisible();
  });

  test('EO "Import ESPD" shows the sub-role picker before the file dialog', async ({ page }) => {
    await page.goto('/');
    await page.locator('#btn-eo-import').click();
    // The sub-role picker appears first; the file dialog opens only after Continue.
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
