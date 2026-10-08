// EXPERIMENTAL — quick validator for the instance-data model.
// Usage: node validate.mjs part-I
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from '../../node_modules/ajv/dist/2020.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = process.argv[2] || 'part-I';

// The pre-compiler per-part schemas live in model/legacy/instance-data/.
const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'legacy', 'instance-data', `${part}.schema.json`), 'utf8'));
const example = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'legacy', 'instance-data', `${part}.example.json`), 'utf8'));

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);
const valid = validate(example);

if (valid) {
  console.log(`✓ ${part}.example.json is valid against ${part}.schema.json`);
} else {
  console.error(`✗ ${part}.example.json failed validation:`);
  console.error(JSON.stringify(validate.errors, null, 2));
  process.exit(1);
}
