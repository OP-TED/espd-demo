/**
 * E2E behaviour: the interactive rules the rebuild must preserve —
 *  - conditional show/hide (ONTRUE/ONFALSE subgroups) driven by an INDICATOR;
 *  - codelist dropdowns render their options;
 *  - the Part I radio-input-group + TED "Look up" affordance.
 *
 * Cannot run in the dev sandbox (Chromium won't launch). Run: `npm run test:e2e`.
 */
import { test, expect } from '@playwright/test';
import { startWizardAs, goToPart } from './helpers.js';

test.describe('Conditional visibility (ONTRUE/ONFALSE)', () => {
  test('answering a criterion indicator reveals its conditional subgroup', async ({ page }) => {
    // Sole tenderer answers Part III criteria directly (not the buyer checklist).
    await startWizardAs(page, 'sole-tenderer');
    await goToPart(page, 'III');

    const criterion = page.locator('[data-section-tag="C01"]');
    await expect(criterion).toBeVisible();

    // The ONTRUE/ONFALSE subgroups start hidden.
    const conditional = criterion.locator('.espd-question-subgroup[data-code="ONTRUE"], .espd-question-subgroup[data-code="ONFALSE"]').first();
    await expect(conditional).toBeHidden();

    // Answer the first indicator "Yes" → an ONTRUE subgroup becomes visible.
    const yesRadio = criterion.locator('input[type="radio"][value="true"]').first();
    await yesRadio.check();
    await expect(criterion.locator('.espd-question-subgroup[data-code="ONTRUE"]').first()).toBeVisible();
  });
});

test.describe('Codelist dropdowns render options', () => {
  test('Part I country select offers country options', async ({ page }) => {
    await startWizardAs(page, 'contracting-authority');
    await goToPart(page, 'I');
    const countrySelect = page.locator('select[data-contentpath="PI02_proc-procurer-id/QG1/Q2/R1/RV"]');
    await expect(countrySelect).toBeVisible();
    // More than just the placeholder "— Select —".
    const optionCount = await countrySelect.locator('option').count();
    expect(optionCount).toBeGreaterThan(1);
    await expect(countrySelect.locator('option[value="BEL"]')).toHaveCount(1);
  });
});

test.describe('Part I affordances', () => {
  test('publication reference renders as a radio-input-group with a Look up button', async ({ page }) => {
    await startWizardAs(page, 'contracting-authority');
    await goToPart(page, 'I');
    // The radio-input-group enhancement runs for Part I buyer view.
    await expect(page.locator('.espd-radio-input-group, .espd-radio-input-row').first()).toBeVisible();
    // TED "Look up" button is attached to the notice-number field (feature-gated).
    const lookup = page.locator('.espd-lookup-btn');
    if (await lookup.count() > 0) {
      await expect(lookup.first()).toBeVisible();
    }
  });
});
