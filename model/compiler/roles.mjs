// Phase 1 — role registry: loading, validation, and the generated UI lens.
//
// The role registry (model-sources/registries/roles.json) is the authored source
// of truth for the ESPD role model: buyer types (create a Request) and
// economic-operator roles (create a Response), each with its form behaviour and
// UBL party-role binding, plus the Part III section-code -> exclusion-category
// prefix map. It is a first-class compiler input alongside the value-type,
// codelist-attribute, encoding and form registries.
//
// This module:
//   - loads the registry;
//   - validates it (ids unique; parts/categories/dispositions from the declared
//     vocabularies; editableParts subset of visibleParts; xmlMapping present;
//     exclusionGroundRules complete; category map values are known categories);
//   - builds the GENERATED UI lens (model/generated/ui/roles.json) following the
//     structure/text split the codelist service data uses: the lens carries ids +
//     formBehavior + documentType + xmlMapping + exclusionCategoryMap + i18n
//     label/description KEYS, while the English TEXT goes to the i18n catalogue
//     (i18n/i18n/en/espd.roles.json), keyed role.label.<id> / role.description.<id>.
//
// Nothing here reads the EA export: roles are an authored projection, not derived
// from espd-edm.json.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

const defaultRegistryPath = path.join(here, '..', 'model-sources', 'registries', 'roles.json');
const outDir = path.resolve(here, '..', 'generated', 'ui');
const outPath = path.join(outDir, 'roles.json');
const i18nPath = path.resolve(here, '..', '..', 'i18n', 'i18n', 'en', 'espd.roles.json');

/** The i18n key for a role's display label. */
export function roleLabelKey(id) {
  return `role.label.${id}`;
}

/** The i18n key for a role's description. */
export function roleDescriptionKey(id) {
  return `role.description.${id}`;
}

/** Load the role registry JSON. */
export function loadRoleRegistry(registryPath = defaultRegistryPath) {
  return JSON.parse(fs.readFileSync(registryPath, 'utf8'));
}

/** Every role (buyer types + EO roles) as a flat ordered array. */
export function allRoles(registry) {
  return [...registry.buyerTypes, ...registry.eoRoles];
}

/**
 * Validate the registry. Throws on the first problem. Returns the full set of
 * declared vocabularies for downstream consistency checks.
 */
export function validateRoleRegistry(registry) {
  const parts = registry.parts;
  const categories = registry.exclusionCategories;
  const dispositions = registry.exclusionDispositions;

  if (!Array.isArray(parts) || parts.length === 0) {
    throw new Error('roles.json: "parts" vocabulary is missing or empty');
  }
  if (!Array.isArray(categories) || categories.length === 0) {
    throw new Error('roles.json: "exclusionCategories" vocabulary is missing or empty');
  }
  if (!Array.isArray(dispositions) || dispositions.length === 0) {
    throw new Error('roles.json: "exclusionDispositions" vocabulary is missing or empty');
  }

  const partSet = new Set(parts);
  const categorySet = new Set(categories);
  const dispositionSet = new Set(dispositions);

  // exclusionCategoryMap: every mapped value must be a declared category.
  const map = registry.exclusionCategoryMap ?? {};
  for (const [prefix, category] of Object.entries(map)) {
    if (prefix.startsWith('$')) continue; // skip $comment etc.
    if (!categorySet.has(category)) {
      throw new Error(`roles.json: exclusionCategoryMap["${prefix}"] -> unknown category "${category}"`);
    }
  }

  const seen = new Set();
  for (const role of allRoles(registry)) {
    const where = role.id ? `role "${role.id}"` : 'a role (no id)';
    if (!role.id) throw new Error('roles.json: a role is missing "id"');
    if (seen.has(role.id)) throw new Error(`roles.json: duplicate role id "${role.id}"`);
    seen.add(role.id);

    if (!role.label) throw new Error(`roles.json: ${where} is missing "label"`);
    if (!role.description) throw new Error(`roles.json: ${where} is missing "description"`);
    if (role.documentType !== 'request' && role.documentType !== 'response') {
      throw new Error(`roles.json: ${where} has invalid documentType "${role.documentType}" (expected request|response)`);
    }

    const fb = role.formBehavior;
    if (!fb) throw new Error(`roles.json: ${where} is missing "formBehavior"`);

    for (const p of fb.visibleParts ?? []) {
      if (!partSet.has(p)) throw new Error(`roles.json: ${where} visibleParts has unknown part "${p}"`);
    }
    const visibleSet = new Set(fb.visibleParts ?? []);
    for (const p of fb.editableParts ?? []) {
      if (!partSet.has(p)) throw new Error(`roles.json: ${where} editableParts has unknown part "${p}"`);
      if (!visibleSet.has(p)) {
        throw new Error(`roles.json: ${where} editableParts includes "${p}" which is not in visibleParts`);
      }
    }

    const rules = fb.exclusionGroundRules ?? {};
    for (const category of categories) {
      if (!(category in rules)) {
        throw new Error(`roles.json: ${where} exclusionGroundRules is missing category "${category}"`);
      }
    }
    for (const [category, disposition] of Object.entries(rules)) {
      if (!categorySet.has(category)) {
        throw new Error(`roles.json: ${where} exclusionGroundRules has unknown category "${category}"`);
      }
      if (!dispositionSet.has(disposition)) {
        throw new Error(`roles.json: ${where} exclusionGroundRules["${category}"] = "${disposition}" is not a declared disposition`);
      }
    }

    // xmlMapping serialises a role into the UBL document. EO roles (response)
    // require it — it is the cac:EconomicOperatorRole/cbc:RoleCode the Part II §A
    // mapping emits. BUYER roles (request) carry NONE: the buyer/EO split is
    // structural (ContractingParty vs EconomicOperatorParty) and the CA/CE
    // sub-distinction has no grounded ESPD serialization. So xmlMapping is
    // OPTIONAL for buyers; when present (on any role) it must be well-formed.
    const xm = role.xmlMapping;
    if (role.documentType === 'response' && !xm) {
      throw new Error(`roles.json: ${where} (an economic-operator role) is missing xmlMapping`);
    }
    if (xm && (!xm.element || !xm.code)) {
      throw new Error(`roles.json: ${where} xmlMapping is present but missing .element or .code`);
    }
  }

  return { partSet, categorySet, dispositionSet };
}

/** Project one authored role entry to its generated UI shape (keys, not text). */
function toUiRole(role) {
  return {
    id: role.id,
    labelKey: roleLabelKey(role.id),
    descriptionKey: roleDescriptionKey(role.id),
    documentType: role.documentType,
    formBehavior: {
      visibleParts: role.formBehavior.visibleParts,
      editableParts: role.formBehavior.editableParts,
      exclusionGroundRules: role.formBehavior.exclusionGroundRules,
    },
    xmlMapping: role.xmlMapping,
  };
}

/** The exclusionCategoryMap, stripped of $-prefixed annotation keys. */
function cleanCategoryMap(map = {}) {
  const out = {};
  for (const [prefix, category] of Object.entries(map)) {
    if (prefix.startsWith('$')) continue;
    out[prefix] = category;
  }
  return out;
}

/**
 * Build the generated UI lens + English i18n catalogue from the registry.
 * Pure w.r.t. inputs; writes to disk only when { write: true }.
 * Returns { lens, catalogue }.
 */
export function buildRolesLens({ registry = loadRoleRegistry(), write = true } = {}) {
  validateRoleRegistry(registry);

  const lens = {
    $comment: 'GENERATED by model/compiler/roles.mjs from model-sources/registries/roles.json. UI role lens: role ids + formBehavior + documentType + xmlMapping + exclusionCategoryMap, with i18n label/description KEYS. English text lives in i18n/i18n/en/espd.roles.json keyed role.label.<id> / role.description.<id>. Do not hand-edit; regenerate.',
    parts: registry.parts,
    exclusionCategories: registry.exclusionCategories,
    exclusionDispositions: registry.exclusionDispositions,
    exclusionCategoryMap: cleanCategoryMap(registry.exclusionCategoryMap),
    buyerTypes: registry.buyerTypes.map(toUiRole),
    eoRoles: registry.eoRoles.map(toUiRole),
  };

  const catalogue = {
    _comment: 'GENERATED by model/compiler/roles.mjs. English labels + descriptions for ESPD roles, keyed role.label.<id> / role.description.<id>. Source: model-sources/registries/roles.json. Do not hand-edit; regenerate.',
  };
  for (const role of allRoles(registry)) {
    catalogue[roleLabelKey(role.id)] = role.label;
    catalogue[roleDescriptionKey(role.id)] = role.description;
  }

  if (write) {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(lens, null, 2) + '\n');
    fs.mkdirSync(path.dirname(i18nPath), { recursive: true });
    fs.writeFileSync(i18nPath, JSON.stringify(catalogue, null, 2) + '\n');
  }

  return { lens, catalogue };
}

export const rolesOutPath = outPath;
export const rolesI18nPath = i18nPath;

// Run directly: node model/compiler/roles.mjs
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { lens, catalogue } = buildRolesLens({ write: true });
  const roleCount = lens.buyerTypes.length + lens.eoRoles.length;
  const keys = Object.keys(catalogue).filter(k => k !== '_comment').length;
  console.log(`Generated UI role lens (${roleCount} roles: ${lens.buyerTypes.length} buyer + ${lens.eoRoles.length} EO; ${keys} English catalogue entries) under model/generated/ui/roles.json.`);
}
