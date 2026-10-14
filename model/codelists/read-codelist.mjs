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

// Lazily-built index: codelist NAME (as used in our profiles / sidecar `codelist`
// values, e.g. 'financial-ratio-type') -> .gc file name. A .gc declares both a
// ShortName ('FinancialRatioType') and a LongName ('financial-ratio-type' or
// sometimes the same as ShortName), so we index by both, case-insensitively.
let _nameIndex = null;
function nameIndex() {
  if (_nameIndex) return _nameIndex;
  _nameIndex = new Map();
  for (const file of fs.readdirSync(CODELISTS_DIR)) {
    if (!file.endsWith('.gc')) continue;
    const xml = fs.readFileSync(path.join(CODELISTS_DIR, file), 'utf8');
    // Index by: the file stem, the ShortName, and EVERY <LongName> — the
    // kebab-case list id lives in <LongName Identifier="listId">...</LongName>,
    // which the ShortName/first-LongName alone would miss. Only index the Identification
    // block's names (agency LongName would wrongly map 'Publications Office...').
    const keys = new Set([file.replace(/\.gc$/, '')]);
    const idBlock = xml.match(/<Identification>([\s\S]*?)<\/Identification>/)?.[1] ?? xml;
    const short = idBlock.match(/<ShortName>([^<]+)<\/ShortName>/)?.[1];
    if (short) keys.add(short);
    for (const m of idBlock.matchAll(/<LongName(?:\s+Identifier="[^"]*")?>([^<]+)<\/LongName>/g)) {
      // The agency ShortName/LongName sits in a nested <Agency> block; skip the
      // human agency name by only taking LongNames that look like identifiers
      // (no spaces).
      if (!/\s/.test(m[1])) keys.add(m[1]);
    }
    for (const key of keys) _nameIndex.set(key.toLowerCase(), file);
  }
  return _nameIndex;
}

/**
 * Resolve a codelist NAME (as used in the codelist-attribute profile or a
 * sidecar leaf `codelist`) to its shipped .gc file name, or undefined if the
 * list is not shipped in ESPD-EDM/codelists.
 */
export function gcFileForCodelist(name) {
  if (!name) return undefined;
  return nameIndex().get(name.toLowerCase());
}

/** Codes for a codelist by NAME, or undefined if the list is not shipped. */
export function codesForCodelist(name) {
  const file = gcFileForCodelist(name);
  return file ? readCodelistCodes(path.join(CODELISTS_DIR, file)) : undefined;
}

/**
 * Extract code + multilingual labels from a Genericode .gc file, for building
 * the UI codelist service data (UX1). Handles the two shapes shipped in
 * ESPD-EDM/codelists:
 *   - EU authority lists (Country, Currency, EoRoleType, …): a `Name` column
 *     plus one `<lang>_label` column per language (ISO 639-3, e.g. `eng_label`,
 *     `fra_label`). Currency also has `<lang>_currency.subunit` columns, which
 *     are NOT labels and are ignored.
 *   - ESPD-internal lists (FinancialRatioType, EOIDType, DocrefcontentType, …):
 *     a `Name` column and an English-only `name-eng` column, no per-language set.
 *
 * Returns, per row: { code, labels: { <lang3>: <text> } } with `labels` keyed by
 * ISO 639-3 language code. English always resolves (from `eng_label`, else
 * `name-eng`, else `Name`); other languages are included when present.
 * @param {string} gcPath absolute or relative path to the .gc file
 * @returns {{code:string, labels:Record<string,string>}[]} in document order
 */
export function readCodelistEntries(gcPath) {
  const xml = fs.readFileSync(gcPath, 'utf8');
  const entries = [];
  const rows = xml.split(/<Row>/);
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split('</Row>')[0];
    const cells = new Map();
    for (const m of row.matchAll(
      /<Value\s+ColumnRef\s*=\s*"([^"]+)"[^>]*>\s*<SimpleValue>([\s\S]*?)<\/SimpleValue>/g
    )) {
      cells.set(m[1], m[2].trim());
    }
    const code = cells.get('code');
    if (code === undefined) continue;

    const labels = {};
    for (const [col, text] of cells) {
      const m = /^([a-z]{3})_label$/.exec(col); // ISO 639-3 language label column
      if (m && text) labels[m[1]] = text;
    }
    // English-only fallback for the ESPD-internal shape (no per-language columns).
    if (labels.eng === undefined) {
      const eng = cells.get('name-eng') ?? cells.get('Name');
      if (eng) labels.eng = eng;
    }
    entries.push({ code, labels });
  }
  return entries;
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
