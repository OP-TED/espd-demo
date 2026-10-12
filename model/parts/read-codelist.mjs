// Utility: read code values from an ESPD-EDM Genericode (.gc) file.
// Returns the list of code strings from the `code` column.
//
// Usage:
//   import { readCodelistCodes } from './read-codelist.mjs';
//   const codes = readCodelistCodes('path/to/DocrefcontentType.gc');

import fs from 'node:fs';

/**
 * Extract all code values from a Genericode .gc file.
 * Parses the XML just enough to pull <SimpleValue> from the `code` ColumnRef
 * in each Row — no XML library dependency.
 * @param {string} gcPath absolute or relative path to the .gc file
 * @returns {string[]} the code values, in document order
 */
export function readCodelistCodes(gcPath) {
  const xml = fs.readFileSync(gcPath, 'utf8');
  const codes = [];

  // Split on <Row> and extract the code column's SimpleValue from each.
  // The code column is identified by ColumnRef="code".
  const rows = xml.split(/<Row>/);
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split('</Row>')[0];
    // Find the Value element with ColumnRef="code"
    const match = row.match(
      /<Value\s+ColumnRef\s*=\s*"code"[^>]*>\s*<SimpleValue>([\s\S]*?)<\/SimpleValue>/
    );
    if (match) codes.push(match[1].trim());
  }
  return codes;
}
