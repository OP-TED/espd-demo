/**
 * Validates all ESPD-EDM data files against their JSON Schemas.
 *
 * Usage:
 *   node validate.cjs
 *
 * Exit codes:
 *   0 = all files valid
 *   1 = one or more validation errors
 */

const Ajv = require('ajv/dist/2020');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

// Load all schemas
const schemasDir = path.join(baseDir, 'schemas');
const metadataSchema = JSON.parse(fs.readFileSync(path.join(schemasDir, 'metadata.schema.json'), 'utf8'));
const componentSchema = JSON.parse(fs.readFileSync(path.join(schemasDir, 'component.schema.json'), 'utf8'));
const sectionSchema = JSON.parse(fs.readFileSync(path.join(schemasDir, 'section.schema.json'), 'utf8'));
const partSchema = JSON.parse(fs.readFileSync(path.join(schemasDir, 'part.schema.json'), 'utf8'));
const indexSchema = JSON.parse(fs.readFileSync(path.join(schemasDir, 'index.schema.json'), 'utf8'));

// Configure AJV with $ref resolution
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// Register schemas by $id so $ref resolution works
ajv.addSchema(componentSchema, 'component.schema.json');
ajv.addSchema(sectionSchema, 'section.schema.json');
ajv.addSchema(partSchema, 'part.schema.json');
ajv.addSchema(metadataSchema, 'metadata.schema.json');
ajv.addSchema(indexSchema, 'index.schema.json');

let errors = 0;

function validate(filePath, schemaId) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const validate = ajv.getSchema(schemaId);
  const valid = validate(data);
  const relative = path.relative(baseDir, filePath);

  if (valid) {
    console.log(`  ✓ ${relative}`);
  } else {
    console.log(`  ✗ ${relative}`);
    validate.errors.forEach(err => {
      console.log(`    → ${err.instancePath || '/'} ${err.message}`);
    });
    errors++;
  }
}

console.log('Validating ESPD-EDM data model...\n');

// Validate metadata
validate(path.join(baseDir, 'metadata.json'), 'metadata.schema.json');

// Validate index
validate(path.join(baseDir, 'index.json'), 'index.schema.json');

// Validate each part file
const partsDir = path.join(baseDir, 'parts');
const partFiles = fs.readdirSync(partsDir)
  .filter(f => f.endsWith('.json'))
  .sort();

partFiles.forEach(f => {
  validate(path.join(partsDir, f), 'part.schema.json');
});

console.log(`\n${errors === 0 ? 'All files valid.' : `${errors} file(s) had validation errors.`}`);
process.exit(errors === 0 ? 0 : 1);
