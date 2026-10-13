// Utility: read code values from an ESPD-EDM Genericode (.gc) file, and resolve
// the shipped codelist directory. Shared by the compiler (enum derivation in the
// instance-schema generator) and the hand-authored part models (model/parts).
//
// Usage:
//   import { readCodelistCodes, codelistPath } from '../codelists/read-codelist.mjs';
//   const codes = readCodelistCodes(codelistPath('DocrefcontentType.gc'));

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

// model/codelists/ -> repo root (espd) -> ESPD-EDM/codelists
// here = <ws>/espd-edm-reference-implementation/model/codelists
const CODELISTS_DIR = path.resolve(here, '..', '..', '..', 'ESPD-EDM', 'codelists');

/** Absolute path to a shipped .gc codelist by file name (e.g. 'EOIDType.gc'). */
export function codelistPath(gcFileName) {
  return path.join(CODELISTS_DIR, gcFileName);
}

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
    const match = row.match(
      /<Value\s+ColumnRef\s*=\s*"code"[^>]*>\s*<SimpleValue>([\s\S]*?)<\/SimpleValue>/
    );
    if (match) codes.push(match[1].trim());
  }
  return codes;
}
