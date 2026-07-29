import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';
import { isValidNoticeNumber, deriveTedUrl, deriveTedLinks, TED_LINK_TYPE, lookupNotice, extractNoticeNumberFromUrl } from '../js/ted-lookup.js';

// Generators for valid notice number formats
const legacyNoticeArb = fc.tuple(
  fc.integer({ min: 1, max: 99999999 }),
  fc.integer({ min: 2000, max: 2099 })
).map(([num, year]) => `${num}-${year}`);

const uuidArb = fc.uuid().map(u => u.toLowerCase());

const validNoticeArb = fc.oneof(legacyNoticeArb, uuidArb);

// Generator for strings that don't match either format
const invalidNoticeArb = fc.string({ minLength: 1, maxLength: 50 })
  .filter(s => !/^\d{1,8}-\d{4}$/.test(s) && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s));

describe('Feature: part-i-ux-redesign, Property 2: TED URL derivation is deterministic', () => {
  it('deriveTedUrl returns the xml pattern by default for any valid notice number', () => {
    fc.assert(
      fc.property(validNoticeArb, (noticeNumber) => {
        const url = deriveTedUrl(noticeNumber);
        assert.strictEqual(url, `https://ted.europa.eu/en/notice/${noticeNumber.trim()}/xml`);
      }),
      { numRuns: 200 }
    );
  });

  it('deriveTedUrl supports all TED_LINK_TYPE variants', () => {
    fc.assert(
      fc.property(legacyNoticeArb, (noticeNumber) => {
        const trimmed = noticeNumber.trim();
        assert.strictEqual(deriveTedUrl(noticeNumber, TED_LINK_TYPE.NOTICE_PAGE),
          `https://ted.europa.eu/en/notice/-/detail/${trimmed}`);
        assert.strictEqual(deriveTedUrl(noticeNumber, TED_LINK_TYPE.HTML),
          `https://ted.europa.eu/en/notice/${trimmed}/html`);
        assert.strictEqual(deriveTedUrl(noticeNumber, TED_LINK_TYPE.PDF),
          `https://ted.europa.eu/en/notice/${trimmed}/pdf`);
        assert.strictEqual(deriveTedUrl(noticeNumber, TED_LINK_TYPE.PDFS),
          `https://ted.europa.eu/en/notice/${trimmed}/pdfs`);
        assert.strictEqual(deriveTedUrl(noticeNumber, TED_LINK_TYPE.XML),
          `https://ted.europa.eu/en/notice/${trimmed}/xml`);
      }),
      { numRuns: 100 }
    );
  });

  it('deriveTedLinks returns all five URL variants', () => {
    fc.assert(
      fc.property(validNoticeArb, (noticeNumber) => {
        const links = deriveTedLinks(noticeNumber);
        const trimmed = noticeNumber.trim();
        assert.strictEqual(links.noticePage, `https://ted.europa.eu/en/notice/-/detail/${trimmed}`);
        assert.strictEqual(links.html, `https://ted.europa.eu/en/notice/${trimmed}/html`);
        assert.strictEqual(links.pdf, `https://ted.europa.eu/en/notice/${trimmed}/pdf`);
        assert.strictEqual(links.pdfs, `https://ted.europa.eu/en/notice/${trimmed}/pdfs`);
        assert.strictEqual(links.xml, `https://ted.europa.eu/en/notice/${trimmed}/xml`);
      }),
      { numRuns: 100 }
    );
  });

  it('deriveTedUrl is pure — same input always produces same output', () => {
    fc.assert(
      fc.property(validNoticeArb, (noticeNumber) => {
        const url1 = deriveTedUrl(noticeNumber);
        const url2 = deriveTedUrl(noticeNumber);
        assert.strictEqual(url1, url2);
      }),
      { numRuns: 100 }
    );
  });
});

describe('Feature: part-i-ux-redesign, Property 3: Valid notice numbers pass format validation', () => {
  it('legacy format numbers pass validation', () => {
    fc.assert(
      fc.property(legacyNoticeArb, (noticeNumber) => {
        assert.strictEqual(isValidNoticeNumber(noticeNumber), true,
          `"${noticeNumber}" should be valid (legacy format)`);
      }),
      { numRuns: 200 }
    );
  });

  it('UUID format numbers pass validation', () => {
    fc.assert(
      fc.property(uuidArb, (noticeNumber) => {
        assert.strictEqual(isValidNoticeNumber(noticeNumber), true,
          `"${noticeNumber}" should be valid (UUID format)`);
      }),
      { numRuns: 200 }
    );
  });
});

describe('Feature: part-i-ux-redesign, Property 4: Invalid notice numbers are rejected', () => {
  it('invalid format strings fail validation', () => {
    fc.assert(
      fc.property(invalidNoticeArb, (badInput) => {
        assert.strictEqual(isValidNoticeNumber(badInput), false,
          `"${badInput}" should be invalid`);
      }),
      { numRuns: 200 }
    );
  });

  it('lookupNotice returns failure with format error for invalid inputs', async () => {
    await fc.assert(
      fc.asyncProperty(invalidNoticeArb, async (badInput) => {
        const result = await lookupNotice(badInput);
        assert.strictEqual(result.success, false);
        assert.ok(result.error && result.error.includes('Invalid notice number format'),
          `Expected format error message for "${badInput}"`);
      }),
      { numRuns: 100 }
    );
  });

  it('null and empty string fail validation', () => {
    assert.strictEqual(isValidNoticeNumber(null), false);
    assert.strictEqual(isValidNoticeNumber(''), false);
    assert.strictEqual(isValidNoticeNumber(undefined), false);
  });
});

describe('Feature: part-i-ux-redesign, Property 5: lookupNotice returns well-formed results', () => {
  it('lookupNotice always returns a Promise', () => {
    fc.assert(
      fc.property(validNoticeArb, (noticeNumber) => {
        const result = lookupNotice(noticeNumber);
        assert.ok(result instanceof Promise, 'lookupNotice must return a Promise');
      }),
      { numRuns: 50 }
    );
  });

  it('lookupNotice with invalid format returns synchronously-resolved failure', async () => {
    await fc.assert(
      fc.asyncProperty(invalidNoticeArb, async (badInput) => {
        const result = await lookupNotice(badInput);
        assert.strictEqual(result.success, false);
        assert.ok(result.error?.includes('Invalid notice number format'));
      }),
      { numRuns: 50 }
    );
  });
});


describe('Feature: part-i-ux-redesign, URL extraction', () => {
  it('extracts notice number from valid TED URLs', () => {
    fc.assert(
      fc.property(legacyNoticeArb, (noticeNumber) => {
        const url = `https://ted.europa.eu/en/notice/${noticeNumber}/html`;
        const extracted = extractNoticeNumberFromUrl(url);
        assert.strictEqual(extracted, noticeNumber,
          `Should extract "${noticeNumber}" from "${url}"`);
      }),
      { numRuns: 100 }
    );
  });

  it('extracts notice number from -/detail/ notice page URLs', () => {
    fc.assert(
      fc.property(legacyNoticeArb, (noticeNumber) => {
        const url = `https://ted.europa.eu/en/notice/-/detail/${noticeNumber}`;
        const extracted = extractNoticeNumberFromUrl(url);
        assert.strictEqual(extracted, noticeNumber,
          `Should extract "${noticeNumber}" from detail URL "${url}"`);
      }),
      { numRuns: 100 }
    );
  });

  it('extracts notice number from all supported URL formats', () => {
    const number = '310364-2026';
    const urls = [
      `https://ted.europa.eu/en/notice/-/detail/${number}`,
      `https://ted.europa.eu/en/notice/${number}/html`,
      `https://ted.europa.eu/en/notice/${number}/pdf`,
      `https://ted.europa.eu/en/notice/${number}/pdfs`,
      `https://ted.europa.eu/en/notice/${number}/xml`,
      `https://ted.europa.eu/en/notice/${number}`
    ];
    for (const url of urls) {
      assert.strictEqual(extractNoticeNumberFromUrl(url), number,
        `Should extract "${number}" from "${url}"`);
    }
  });

  it('extracts notice number from URLs without trailing path', () => {
    fc.assert(
      fc.property(legacyNoticeArb, (noticeNumber) => {
        const url = `https://ted.europa.eu/en/notice/${noticeNumber}`;
        const extracted = extractNoticeNumberFromUrl(url);
        assert.strictEqual(extracted, noticeNumber);
      }),
      { numRuns: 50 }
    );
  });

  it('returns null for non-TED URLs', () => {
    assert.strictEqual(extractNoticeNumberFromUrl('https://example.com'), null);
    assert.strictEqual(extractNoticeNumberFromUrl(''), null);
    assert.strictEqual(extractNoticeNumberFromUrl(null), null);
  });

  it('returns null for URLs with invalid notice number format', () => {
    assert.strictEqual(extractNoticeNumberFromUrl('https://ted.europa.eu/en/notice/invalid/html'), null);
    assert.strictEqual(extractNoticeNumberFromUrl('https://ted.europa.eu/en/notice/-/detail/invalid'), null);
  });
});
