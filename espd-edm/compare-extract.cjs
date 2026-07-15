/**
 * Extracts criteria from the source file into the same shape as the enhanced parts,
 * producing comparable files you can diff visually.
 *
 * Usage:
 *   node compare-extract.cjs
 *
 * Produces:
 *   _diff/source-part-III.json   (criteria C01-C24,C67 from source, same shape)
 *   _diff/source-part-IV.json    (criteria C25-C56,C66 from source, same shape)
 *   _diff/enhanced-part-III.json (sections from part-III-exclusion.json, sections only)
 *   _diff/enhanced-part-IV.json  (sections from part-IV-selection.json, sections only)
 *
 * Then use your preferred diff tool:
 *   - VS Code: right-click file → "Select for Compare", then right-click other → "Compare with Selected"
 *   - CLI: diff _diff/source-part-III.json _diff/enhanced-part-III.json
 *   - GUI: Beyond Compare, WinMerge, or any JSON-aware diff tool
 */

const fs = require('fs');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '..');
const sourceFile = path.resolve(workspaceRoot, '..', 'ESPD-EDM', 'criterion', 'espd-edm.json');
const partIIIFile = path.join(__dirname, 'parts', 'part-III-exclusion.json');
const partIVFile = path.join(__dirname, 'parts', 'part-IV-selection.json');
const diffDir = path.join(__dirname, '_diff');

fs.mkdirSync(diffDir, { recursive: true });

const source = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
const partIII = JSON.parse(fs.readFileSync(partIIIFile, 'utf8'));
const partIV = JSON.parse(fs.readFileSync(partIVFile, 'utf8'));

// Part III tags
const partIIITags = new Set(partIII.sections.map(s => s.tag));
// Part IV tags
const partIVTags = new Set(partIV.sections.map(s => s.tag));

// Extract matching criteria from source into arrays
const sourcePartIII = source.filter(s => partIIITags.has(s.tag));
const sourcePartIV = source.filter(s => partIVTags.has(s.tag));

// Write comparable files (just the sections arrays, sorted by tag)
const sortByTag = (a, b) => a.tag.localeCompare(b.tag, undefined, { numeric: true });

fs.writeFileSync(
  path.join(diffDir, 'source-part-III.json'),
  JSON.stringify(sourcePartIII.sort(sortByTag), null, 2)
);
fs.writeFileSync(
  path.join(diffDir, 'source-part-IV.json'),
  JSON.stringify(sourcePartIV.sort(sortByTag), null, 2)
);
fs.writeFileSync(
  path.join(diffDir, 'enhanced-part-III.json'),
  JSON.stringify(partIII.sections.sort(sortByTag), null, 2)
);
fs.writeFileSync(
  path.join(diffDir, 'enhanced-part-IV.json'),
  JSON.stringify(partIV.sections.sort(sortByTag), null, 2)
);

console.log('Extracted comparable files into _diff/:');
console.log('  source-part-III.json   ← criteria from ESPD-EDM/criterion/espd-edm.json');
console.log('  enhanced-part-III.json ← sections from parts/part-III-exclusion.json');
console.log('  source-part-IV.json    ← criteria from ESPD-EDM/criterion/espd-edm.json');
console.log('  enhanced-part-IV.json  ← sections from parts/part-IV-selection.json');
console.log('');
console.log('Compare with:');
console.log('  VS Code: right-click → "Select for Compare" → right-click other → "Compare with Selected"');
console.log('  CLI:     diff _diff/source-part-III.json _diff/enhanced-part-III.json');
