/**
 * E2E golden snapshots: the rendered DOM of each (role × part), normalized to
 * remove volatile bits (generated UUIDs, timestamps). These are the PARITY
 * REFERENCE the rebuilt renderer is diffed against in Phase 7 — if the rebuild
 * produces the same user-facing structure, these stay green.
 *
 * First run (locally/CI) WRITES the goldens; commit them. Thereafter they assert
 * no drift. Cannot run in the dev sandbox (Chromium won't launch).
 * Run: `npm run test:e2e`  (first time add `--update-snapshots`).
 */
import { test, expect } from '@playwright/test';
import { startWizardAs, goToPart, visibleStepKeys } from './helpers.js';

/** Capture #form-content's HTML with volatile values masked, for stable diffs. */
async function snapshotForm(page) {
  const html = await page.locator('#form-content').innerHTML();
  return html
    // mask UUIDs
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '{UUID}')
    // mask ISO timestamps/dates
    .replace(/\d{4}-\d{2}-\d{2}T[\d:.]+Z?/g, '{TS}')
    // collapse insignificant whitespace between tags
    .replace(/>\s+</g, '><')
    .trim();
}

// One golden per (role × part) across the full matrix.
const MATRIX = {
  'contracting-authority': ['I', 'III', 'IV', 'V', 'VI'],
  'sole-tenderer': ['I', 'II', 'III', 'IV', 'V', 'VI'],
  'group-mem': ['I', 'II', 'III', 'IV', 'VI'],
  'oeron': ['I', 'II', 'III', 'VI'],
};

test.describe('Rendered-form DOM goldens', () => {
  for (const [role, parts] of Object.entries(MATRIX)) {
    for (const part of parts) {
      test(`${role} · Part ${part}`, async ({ page }) => {
        await startWizardAs(page, role);
        // Sanity: the part is actually in this role's nav before navigating.
        const keys = await visibleStepKeys(page);
        test.skip(!keys.includes(part), `Part ${part} not visible for ${role}`);
        await goToPart(page, part);
        const dom = await snapshotForm(page);
        expect(dom).toMatchSnapshot(`${role}--part-${part}.html`);
      });
    }
  }
});
