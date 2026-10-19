/**
 * Phase 0 E2E helpers — shared navigation + field utilities for the CURRENT UI.
 *
 * These drive the REAL flow (home → path-selector two-step → wizard), so the
 * behaviour/golden suite stays consistent and does not re-encode selectors.
 *
 * NOTE: These specs cannot run in the current dev sandbox (Chromium fails to
 * launch: `browserType.launch: spawn UNKNOWN`). Run with `npm run test:e2e` in
 * CI or locally. See tests/phase0/README.md.
 *
 * Selectors (model-driven UI, Phase 4/5):
 *   home:          #btn-new-espd, #btn-continue-session,
 *                  #import-file-home + #btn-import-home
 *   path-selector: step 1 = two <article> cards each with a <button>;
 *                  Buyer enters the wizard directly; Economic Operator shows
 *                  step 2 = radios input[name="espd-role"] + a Continue <button>
 *   wizard:        #wizard-container, #form-content, #btn-prev, #btn-next,
 *                  #btn-download, #btn-validate
 *   fields:        [data-field="<dataPath>"] (input/select/textarea within or on it)
 *   criteria:      .espd-criterion[data-section-tag][data-section-code];
 *                  buyer checklist: .criterion-card + #criterion-<tag>
 */

import { expect } from '@playwright/test';

/** Role id → index of its <article> path card in step 1 (0 = Buyer, 1 = EO). */
const PATH_OF_ROLE = {
  'contracting-authority': 0,
  'contracting-entity': 0,
  'sole-tenderer': 1,
  'group-lead': 1,
  'group-mem': 1,
  'oeron': 1,
  'subcont': 1,
};

/**
 * From the loaded app, go home → New ESPD → pick path → pick role → enter wizard.
 * Leaves the page on the wizard, first visible part rendered.
 */
export async function startWizardAs(page, roleId) {
  await page.goto('/');
  await expect(page.locator('#landing-page')).toBeVisible();

  // Home → New ESPD opens the path selector (into the landing container).
  await page.locator('#btn-new-espd').click();

  // Step 1: pick Buyer (card 0) or Economic Operator (card 1).
  const pathIndex = PATH_OF_ROLE[roleId];
  if (pathIndex === undefined) throw new Error(`Unknown role for path selection: ${roleId}`);
  await page.locator('#landing-page article button').nth(pathIndex).click();

  // The Buyer path enters the wizard directly (no sub-role step — the UI treats
  // all buyers as one "Buyer"). The Economic Operator path shows step 2: pick the
  // specific role radio, then Continue.
  if (pathIndex === 1) {
    await page.locator(`input[name="espd-role"][value="${roleId}"]`).check();
    // The step-2 Continue button is the primary (.contrast) action button.
    await page.locator('#landing-page button.contrast').click();
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
