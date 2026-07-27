import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fc from 'fast-check';
import { isValidNoticeNumber, deriveTedUrl, lookupNotice } from '../js/ted-lookup.js';

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

  it('valid numbers do not trigger format error in lookupNotice', async () => {
    await fc.assert(
      fc.asyncProperty(validNoticeArb, async (noticeNumber) => {
        const result = await lookupNotice(noticeNumber);
        // Should not contain a format error — it may fail for other reasons (stub)
        assert.ok(!result.error?.includes('Invalid notice number format'),
          `"${noticeNumber}" should not trigger format error`);
      }),
      { numRuns: 100 }
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

describe('Feature: part-i-ux-redesign, Property 5: Stub lookup always returns failure', () => {
  it('lookupNotice resolves with success=false for all valid notice numbers', async () => {
    await fc.assert(
      fc.asyncProperty(validNoticeArb, async (noticeNumber) => {
        const result = await lookupNotice(noticeNumber);
        assert.strictEqual(result.success, false,
          `Stub should never succeed for "${noticeNumber}"`);
        assert.ok(typeof result.error === 'string' && result.error.length > 0,
          'Should have a non-empty error message');
      }),
      { numRuns: 200 }
    );
  });

  it('lookupNotice always returns a Promise', () => {
    fc.assert(
      fc.property(validNoticeArb, (noticeNumber) => {
        const result = lookupNotice(noticeNumber);
        assert.ok(result instanceof Promise, 'lookupNotice must return a Promise');
      }),
      { numRuns: 50 }
    );
  });
});
