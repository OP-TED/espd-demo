import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';
import { isValidNoticeNumber, deriveTedUrl, lookupNotice, extractNoticeNumberFromUrl } from '../js/ted-lookup.js';

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
  it('deriveTedUrl returns the expected pattern for any valid notice number', () => {
    fc.assert(
      fc.property(validNoticeArb, (noticeNumber) => {
        const url = deriveTedUrl(noticeNumber);
        assert.strictEqual(url, `https://ted.europa.eu/en/notice/${noticeNumber.trim()}/xml`);
      }),
      { numRuns: 200 }
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
  });
});
