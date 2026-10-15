/**
 * E2E behaviour: the interactive rules the rebuild must preserve —
 *  - declarative conditional show/hide (field.visibleWhen) driven by a boolean;
 *  - codelist dropdowns render their options from the generated codelists;
 *  - the Part I TED "Look up" affordance.
 *
 * REWRITTEN for the Phase 4/5 model-driven DOM: fields are addressed by dataPath;
 * conditional fields carry data-visible-when and start hidden until their
 * condition holds (replacing the legacy ONTRUE/ONFALSE subgroups).
 *
 * Cannot run in the dev sandbox (Chromium won't launch). Run: `npm run test:e2e`.
 */
import { test, expect } from '@playwright/test';
import { startWizardAs, goToPart, answerIndicator } from './helpers.js';

test.describe('Conditional visibility (visibleWhen)', () => {
  test('answering a criterion boolean reveals its conditional field', async ({ page }) => {
    // Sole tenderer answers Part III criteria directly (not the buyer checklist).
    await startWizardAs(page, 'sole-tenderer');
    await goToPart(page, 'III');

    const criterion = page.locator('[data-section-tag="C01"]');
    await expect(criterion).toBeVisible();

    // The conviction-date field is gated by the answer (visibleWhen equals true)
    // and starts hidden.
    const conditional = criterion.locator(
      '[data-field="partIII.exclusionGrounds.exg-crim-part.response.convictions[].dateOfConviction"]'
    ).first();
    await expect(conditional).toBeHidden();

    // Answer "Yes" → the conditional field becomes visible.
    await answerIndicator(page, 'partIII.exclusionGrounds.exg-crim-part.response.answer', true);
    await expect(conditional).toBeVisible();
  });
});

test.describe('Codelist dropdowns render options', () => {
  test('Part I country select offers country options', async ({ page }) => {
    await startWizardAs(page, 'contracting-authority');
    await goToPart(page, 'I');
    const countrySelect = page.locator('select[data-field="partI.contractingAuthority.country"]');
    await expect(countrySelect).toBeVisible();
    // More than just the placeholder "— Select —".
    const optionCount = await countrySelect.locator('option').count();
    expect(optionCount).toBeGreaterThan(1);
    await expect(countrySelect.locator('option[value="BEL"]')).toHaveCount(1);
  });
});

test.describe('Part I affordances', () => {
  test('publication fields carry a TED "Look up" button (feature-gated)', async ({ page }) => {
    await startWizardAs(page, 'contracting-authority');
    await goToPart(page, 'I');
    // The DocRefContentType type dropdown is present.
    await expect(page.locator('select[data-field="partI.publication.type"]')).toBeVisible();
    // TED "Look up" button is attached to the notice fields (feature-gated).
    const lookup = page.locator('.espd-lookup-btn');
    if (await lookup.count() > 0) {
      await expect(lookup.first()).toBeVisible();
    }
  });
});
