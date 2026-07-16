/**
 * End-to-end test: Contracting Authority fills the complete ESPD Request form
 * and downloads the resulting XML.
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('Contracting Authority — full ESPD Request flow', () => {

  test('fills out all parts and downloads ESPD Request XML', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    await expect(page.locator('#landing-page')).toBeVisible();

    // Select Contracting Authority role
    await page.click('#btn-role-ca');
    await expect(page.locator('#wizard-container')).toBeVisible();

    // ─────────────────────────────────────────────────────
    // PART I — Procedure information
    // ─────────────────────────────────────────────────────
    await expect(page.locator('#form-content h2')).toContainText('Part I');

    // PI01: Publication info
    await fillField(page, 'PI01_proc-publication-info/QG1/Q1/R1/RV', 'OJ S 142/2026, 2026-07-15, Supply of IT equipment');
    await fillField(page, 'PI01_proc-publication-info/QG1/Q2/R1/RV', '2026/S 142-123456');
    await fillField(page, 'PI01_proc-publication-info/QG1/Q3/R1/RV', 'https://ted.europa.eu/notice/123456-2026');

    // PI02: Procurer identity
    await fillField(page, 'PI02_proc-procurer-id/QG1/Q1/R1/RV', 'European Commission — DG DIGIT');
    await selectField(page, 'PI02_proc-procurer-id/QG1/Q2/R1/RV', 'BE');
    await fillField(page, 'PI02_proc-procurer-id/QG1/Q3/R1/RV', 'BE-0123456789');

    // PI03: Procedure info
    await fillField(page, 'PI03_proc-procedure-info/QG1/Q1/R1/RV', 'Supply of IT Equipment and Services 2026');
    await fillField(page, 'PI03_proc-procedure-info/QG1/Q2/R1/RV', 'DIGIT/2026/OP/0042');
    await fillField(page, 'PI03_proc-procedure-info/QG1/Q3/R1/RV', 'Procurement of desktop computers, laptops, monitors and related IT services for DG DIGIT offices across Brussels.');

    // PI03 Q4 is a CODE field (procedure type) — try selecting if available
    const procTypeSelect = page.locator(`select[data-contentpath="PI03_proc-procedure-info/QG1/Q4/R1/RV"]`);
    if (await procTypeSelect.count() > 0) {
      // Select first non-empty option
      const options = await procTypeSelect.locator('option').all();
      if (options.length > 1) {
        const val = await options[1].getAttribute('value');
        await procTypeSelect.selectOption(val);
      }
    }

    // Navigate to Part II
    await page.click('#btn-next');
    await expect(page.locator('#form-content h2')).toContainText('Part II');

    // ─────────────────────────────────────────────────────
    // PART II — Economic Operator info (CA doesn't fill much here, but navigate through)
    // ─────────────────────────────────────────────────────
    // CA role: Part II is mostly for EO, just advance
    await page.click('#btn-next');
    await expect(page.locator('#form-content h2')).toContainText('Part III');

    // ─────────────────────────────────────────────────────
    // PART III — Exclusion grounds
    // ─────────────────────────────────────────────────────
    // The CA sees the criteria rendered. The mandatory ones (C01-C08) are always
    // included. For this test, we just confirm the page rendered and move on.
    // In a real flow, the CA might toggle optional criteria on/off.
    // Let's verify that C01 (participation in criminal org) is visible.
    await expect(page.locator('[data-section-tag="C01"]')).toBeVisible();

    await page.click('#btn-next');
    await expect(page.locator('#form-content h2')).toContainText('Part IV');

    // ─────────────────────────────────────────────────────
    // PART IV — Selection criteria
    // ─────────────────────────────────────────────────────
    // CA selects applicable criteria. Just confirm it rendered.
    await expect(page.locator('[data-section-tag="C25"]')).toBeVisible();

    await page.click('#btn-next');
    await expect(page.locator('#form-content h2')).toContainText('Part V');

    // ─────────────────────────────────────────────────────
    // PART V — Reduction of candidates
    // ─────────────────────────────────────────────────────
    await page.click('#btn-next');
    await expect(page.locator('#form-content h2')).toContainText('Part VI');

    // ─────────────────────────────────────────────────────
    // PART VI — Concluding statements (last step)
    // ─────────────────────────────────────────────────────
    // The download button should now be visible (last step)
    await expect(page.locator('#btn-download')).toBeVisible();

    // ─────────────────────────────────────────────────────
    // DOWNLOAD the XML
    // ─────────────────────────────────────────────────────
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#btn-download'),
    ]);

    // Verify the download
    expect(download.suggestedFilename()).toBe('espd-request.xml');

    // Save and inspect the downloaded XML
    const downloadPath = path.join('e2e', 'test-output', download.suggestedFilename());
    await download.saveAs(downloadPath);

    const xml = fs.readFileSync(downloadPath, 'utf8');

    // Verify XML structure
    expect(xml).toContain('<?xml version="1.0"');
    expect(xml).toContain('QualificationApplicationRequest');
    expect(xml).toContain('ESPD Request');

    // Verify our Part I data made it into the XML
    expect(xml).toContain('European Commission');
    expect(xml).toContain('Supply of IT Equipment and Services 2026');
    expect(xml).toContain('Procurement of desktop computers');

    // Verify criteria are present
    expect(xml).toContain('TenderingCriterion');

    console.log(`✓ ESPD Request XML downloaded (${(xml.length / 1024).toFixed(1)} KB)`);
  });
});

// ─────────────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────────────

/**
 * Fill a text/url/number input by its data-contentpath attribute.
 */
async function fillField(page, contentpath, value) {
  const selector = `[data-contentpath="${contentpath}"] input, [data-contentpath="${contentpath}"] textarea, input[data-contentpath="${contentpath}"], textarea[data-contentpath="${contentpath}"]`;
  const field = page.locator(selector).first();

  if (await field.count() === 0) {
    // Try finding within the parent div that has the contentpath as dataset
    const parent = page.locator(`[data-contentpath="${contentpath}"]`).first();
    const input = parent.locator('input, textarea').first();
    if (await input.count() > 0) {
      await input.fill(value);
      return;
    }
    console.warn(`Field not found: ${contentpath}`);
    return;
  }
  await field.fill(value);
}

/**
 * Select an option in a select dropdown by contentpath.
 */
async function selectField(page, contentpath, value) {
  const selector = `[data-contentpath="${contentpath}"] select, select[data-contentpath="${contentpath}"]`;
  const field = page.locator(selector).first();

  if (await field.count() === 0) {
    const parent = page.locator(`[data-contentpath="${contentpath}"]`).first();
    const select = parent.locator('select').first();
    if (await select.count() > 0) {
      await select.selectOption(value);
      return;
    }
    console.warn(`Select not found: ${contentpath}`);
    return;
  }
  await field.selectOption(value);
}
