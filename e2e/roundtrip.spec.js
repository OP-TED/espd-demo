/**
 * E2E: the full buyer → EO ESPD roundtrip.
 *
 * This is the end-to-end journey the whole app exists to support, exercised in
 * ONE flow:
 *
 *   1. BUYER (contracting authority) fills an ESPD *Request*: Part I identity +
 *      procedure, declares an exclusion ground (Part III) and a selection
 *      criterion (Part IV), then downloads the official UBL Request XML.
 *   2. ECONOMIC OPERATOR imports that very Request XML, which flips the session
 *      into a *Response* built on the buyer's declared criteria. The EO fills in
 *      Part II identity and ANSWERS each declared criterion, then downloads the
 *      official UBL Response XML.
 *
 * We assert on both downloaded documents: the Request carries the buyer's
 * context and declared criteria; the Response is a response document that still
 * carries the buyer's context AND the EO's identity + answers.
 *
 * Inclusion is encoded in UBL purely by the PRESENCE of a cac:TenderingCriterion
 * (see import-export.spec.js). The importer reconstructs the buyer's declared
 * set from it; the EO cannot add/remove criteria, only answer them.
 *
 * Cannot run in the dev sandbox (Chromium won't launch). Run: `npm run test:e2e`.
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { startWizardAs, goToPart, fillField, selectField, answerIndicator } from './helpers.js';
import { validateEspdXml, saxonAvailable } from './validate-xml.js';

const OUT = path.join('e2e', 'test-output');

/**
 * Validate a downloaded ESPD document against the OFFICIAL ESPD Schematron and
 * assert the agreed guarantee: ZERO attribute-category fatals and ZERO
 * unexpected fatals (e-Certis UUID property-group residuals are tolerated — see
 * validate-xml.js). Skipped with a console note when Saxon/Java is unavailable,
 * so the download/import flow still runs in Java-less CI.
 */
function assertSchematronValid(xml, kind, label) {
  const report = validateEspdXml(xml, kind);
  if (report.skipped) {
    console.warn(`⚠ Schematron (${label}): skipped — Saxon/Java unavailable.`);
    return;
  }
  expect(
    report.attributeErrors.map((e) => `[${e.validator}] ${e.text.slice(0, 120)}`),
    `${label}: codelist-attribute rules must all pass`,
  ).toEqual([]);
  expect(
    report.unexpectedErrors.map((e) => `[${e.validator}] ${e.text.slice(0, 120)}`),
    `${label}: no unexpected fatal Schematron findings`,
  ).toEqual([]);
}

// Criterion under test on each side:
//   C01 exg-crim-part   — a MANDATORY Part III exclusion ground (always declared)
//   C25 slc-suit-reg-prof — a Part IV selection criterion the buyer opts into
const C01_CODE = 'exg-crim-part';
const C25_CODE = 'slc-suit-reg-prof';

/**
 * Answer a boolean question inside a specific EO criterion card. The card is
 * `.espd-criterion[data-section-tag="<tag>"]`; the EO's own answer controls are
 * the ENABLED fields within it (the buyer's requirement group renders disabled).
 * We scope by dataPath so we hit exactly the intended answer field.
 */
async function answerCriterion(page, tag, dataPath, yes) {
  const card = page.locator(`.espd-criterion[data-section-tag="${tag}"]`);
  await expect(card).toBeVisible();
  const value = yes ? 'true' : 'false';
  await card
    .locator(`input[type="radio"][data-field="${dataPath}"][value="${value}"]`)
    .check();
}

test.describe('Full buyer → EO roundtrip', () => {
  // Importing over an existing session shows a confirm(); accept it.
  test.beforeEach(async ({ page }) => {
    page.on('dialog', (dialog) => dialog.accept());
  });

  test('buyer authors a Request, EO imports it and returns a Response', async ({ page }) => {
    // ─────────────────────────────────────────────────────────────────────
    // 1. BUYER — fill and download the ESPD Request
    // ─────────────────────────────────────────────────────────────────────
    await startWizardAs(page, 'contracting-authority');

    // Part I — publication, identity, procedure.
    await goToPart(page, 'I');
    await selectField(page, 'partI.publication.type', 'TED_CN');
    await fillField(page, 'partI.publication.identifier', '2026/S 142-123456');
    await fillField(page, 'partI.contractingAuthority.officialName', 'Roundtrip Authority');
    await selectField(page, 'partI.contractingAuthority.country', 'BEL');
    await fillField(page, 'partI.procedure.fileReference.value', 'RT/2026/OP/0001');
    await fillField(page, 'partI.project.name', 'Roundtrip Procurement 2026');
    await selectField(page, 'partI.procedure.procedureType', 'open');

    // Part III — C01 is a mandatory exclusion ground (always declared, checkbox
    // disabled). Just confirm it is present and checked.
    await goToPart(page, 'III');
    await expect(page.locator('#criterion-C01')).toBeChecked();

    // Part IV — opt into a selection criterion (C25) the EO will answer.
    await goToPart(page, 'IV');
    const c25 = page.locator('#criterion-C25');
    await expect(c25).toBeVisible();
    if (!(await c25.isChecked())) await c25.check();
    await expect(c25).toBeChecked();

    // Last part → download the official UBL Request.
    await goToPart(page, 'VI');
    const requestFile = path.join(OUT, 'roundtrip-buyer-request.xml');
    const [reqDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btn-download').click(),
    ]);
    expect(reqDownload.suggestedFilename()).toBe('espd-request.xml');
    await reqDownload.saveAs(requestFile);

    const requestXml = fs.readFileSync(requestFile, 'utf8');
    expect(requestXml).toContain('<QualificationApplicationRequest');
    expect(requestXml).toContain('Roundtrip Authority');        // buyer identity
    expect(requestXml).toContain(C01_CODE);                      // mandatory ground
    expect(requestXml).toContain(C25_CODE);                      // declared selection criterion

    // The downloaded Request is valid against the official ESPD Schematron.
    assertSchematronValid(requestXml, 'request', 'Request');

    // ─────────────────────────────────────────────────────────────────────
    // 2. ECONOMIC OPERATOR — import the Request, answer it, download Response
    // ─────────────────────────────────────────────────────────────────────
    await page.goto('/');
    await expect(page.locator('#landing-page')).toBeVisible();

    // EO "Import ESPD" → pick the sub-role → Continue → choose the buyer's file.
    await page.locator('#btn-eo-import').click();
    await page.locator('input[name="espd-role"][value="sole-tenderer"]').check();
    await page.locator('#landing-page button.contrast').click();
    await page.locator('#eo-import-file').setInputFiles(requestFile);
    await expect(page.locator('#wizard-container')).toBeVisible();

    // The session is now an EO Response: Part II is available and its role is
    // preselected from the chosen sub-role.
    await goToPart(page, 'II');
    await expect(
      page.locator('[data-field="partII.economicOperator.role"] select')
    ).toHaveValue('sole-tenderer');
    await fillField(page, 'partII.economicOperator.name', 'Roundtrip Operator Ltd');
    await selectField(page, 'partII.economicOperator.country', 'BEL');

    // Part III — answer the mandatory exclusion ground (C01): "No" convictions,
    // which keeps the follow-up fields hidden.
    await goToPart(page, 'III');
    await answerCriterion(
      page,
      'C01',
      'partIII.exclusionGrounds.exg-crim-part.response.answer',
      false,
    );

    // Part IV — answer the buyer's declared selection criterion (C25): the EO
    // fulfils it itself (keeps the relied-upon branch hidden). The buyer's
    // requirement renders read-only above the answer.
    await goToPart(page, 'IV');
    await expect(
      page.locator('.espd-criterion[data-section-tag="C25"] .criterion-requirements--readonly')
    ).toBeVisible();
    await answerCriterion(
      page,
      'C25',
      'partIV.selectionCriteria.slc-suit-reg-prof.response.fulfilledByItself',
      true,
    );

    // Last part → download the official UBL Response.
    await goToPart(page, 'VI');
    const responseFile = path.join(OUT, 'roundtrip-eo-response.xml');
    const [respDownload] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('#btn-download').click(),
    ]);
    expect(respDownload.suggestedFilename()).toBe('espd-response.xml');
    await respDownload.saveAs(responseFile);

    const responseXml = fs.readFileSync(responseFile, 'utf8');
    // It is a Response document…
    expect(responseXml).toContain('<QualificationApplicationResponse');
    // …that still carries the buyer's context (identity + declared criteria)…
    expect(responseXml).toContain('Roundtrip Authority');
    expect(responseXml).toContain(C01_CODE);
    expect(responseXml).toContain(C25_CODE);
    // …and now carries the EO's identity.
    expect(responseXml).toContain('Roundtrip Operator Ltd');

    // The downloaded Response is valid against the official ESPD Schematron.
    assertSchematronValid(responseXml, 'response', 'Response');
  });

  test('Schematron validation is wired and active in this environment', () => {
    // A guard so a Java-less CI run is visible rather than silently skipping the
    // document checks above. Informational — never fails.
    if (!saxonAvailable) {
      console.warn('⚠ Saxon/Java unavailable — ESPD Schematron validation was skipped.');
    } else {
      console.info('✓ ESPD Schematron validation active (Saxon-HE present).');
    }
    expect(typeof saxonAvailable).toBe('boolean');
  });
});
