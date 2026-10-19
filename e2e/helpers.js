/**
 * Phase 0 E2E helpers — shared navigation + field utilities for the CURRENT UI.
 *
 * These drive the REAL flow (two-role home → [EO sub-role picker] → wizard), so
 * the behaviour/golden suite stays consistent and does not re-encode selectors.
 *
 * NOTE: These specs cannot run in the current dev sandbox (Chromium fails to
 * launch: `browserType.launch: spawn UNKNOWN`). Run with `npm run test:e2e` in
 * CI or locally. See tests/phase0/README.md.
 *
 * Selectors (model-driven UI):
 *   home:          two role panels. Buyer: #btn-buyer-create (new Request),
 *                  #btn-buyer-reuse + #buyer-reuse-file (reuse a Request).
 *                  Economic Operator: #btn-eo-create (new response),
 *                  #btn-eo-import (import a Request/response). #btn-continue-session.
 *   eo picker:     radios input[name="espd-role"] + a Continue <button> (.contrast)
 *   wizard:        #wizard-container, #form-content, #btn-prev, #btn-next,
 *                  #btn-download, #btn-validate
 *   fields:        [data-field="<dataPath>"] (input/select/textarea within or on it)
 *   criteria:      .espd-criterion[data-section-tag][data-section-code];
 *                  buyer checklist: .criterion-card + #criterion-<tag>
 */

import { expect } from '@playwright/test';

/** The five Economic Operator sub-roles (the rest are buyer roles). */
const EO_ROLES = new Set(['sole-tenderer', 'group-lead', 'group-mem', 'oeron', 'subcont']);

/**
 * From the loaded app, enter the wizard as `roleId` via the two-role home page.
 * Buyer: "Create a new ESPD" enters directly. Economic Operator: "Create
 * response" → pick the sub-role → Continue. Leaves the page on the wizard, first
 * visible part rendered.
 *
 * NOTE: the UI presents a single "Buyer", so both buyer role ids enter the
 * wizard as the default buyer role — pass 'contracting-authority' for buyers.
 */
export async function startWizardAs(page, roleId) {
  await page.goto('/');
  await expect(page.locator('#landing-page')).toBeVisible();

  if (EO_ROLES.has(roleId)) {
    // Economic Operator → "Create response" opens the sub-role picker.
    await page.locator('#btn-eo-create').click();
    await page.locator(`input[name="espd-role"][value="${roleId}"]`).check();
    await page.locator('#landing-page button.contrast').click(); // Continue
  } else {
    // Buyer → "Create a new ESPD" enters the wizard directly.
    await page.locator('#btn-buyer-create').click();
  }

  await expect(page.locator('#wizard-container')).toBeVisible();
  await expect(page.locator('#form-content h2')).toBeVisible();
}

/** The Roman-numeral keys of the parts shown in the wizard step nav, in order. */
export async function visibleStepKeys(page) {
  return page.locator('.espd-steps li .espd-step__num').allTextContents();
}

/** Navigate the wizard to the step whose part key matches (e.g. 'III'). */
export async function goToPart(page, partKey) {
  const keys = await visibleStepKeys(page);
  const idx = keys.indexOf(partKey);
  if (idx === -1) throw new Error(`Part ${partKey} not in step nav: ${keys.join(',')}`);
  await page.locator('.espd-steps li').nth(idx).locator('a').click();
  await expect(page.locator('#form-content h2')).toContainText(`Part ${partKey}`);
}

/** Fill a text/url/number/textarea field addressed by its model dataPath. */
export async function fillField(page, dataPath, value) {
  const field = page.locator(
    `[data-field="${dataPath}"] input, [data-field="${dataPath}"] textarea, ` +
    `input[data-field="${dataPath}"], textarea[data-field="${dataPath}"]`
  ).first();
  await field.fill(value);
}

/** Select an option in a code dropdown addressed by its model dataPath. */
export async function selectField(page, dataPath, value) {
  const sel = page.locator(
    `[data-field="${dataPath}"] select, select[data-field="${dataPath}"]`
  ).first();
  await sel.selectOption(value);
}

/** Answer a boolean (Yes/No radio) addressed by its model dataPath. */
export async function answerIndicator(page, dataPath, yes) {
  const value = yes ? 'true' : 'false';
  await page.locator(`input[type="radio"][data-field="${dataPath}"][value="${value}"]`).check();
}

/** Advance to the next wizard step. */
export async function next(page) {
  await page.locator('#btn-next').click();
}
