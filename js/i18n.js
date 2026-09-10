/**
 * i18n module — loads and resolves translation keys.
 * Follows the key convention defined in i18n/i18n/translations.json.
 */

const translations = {};
let currentLanguage = 'en';
const namespaces = [
  'espd.common',
  'espd.part1',
  'espd.part2',
  'espd.part3',
  'espd.part4',
  'espd.part5',
  'espd.part6'
];

/**
 * Load all translation namespaces for the given language.
 */
export async function loadLanguage(lang = 'en') {
  currentLanguage = lang;
  const promises = namespaces.map(async (ns) => {
    // Relative (no leading slash) so it resolves against the page directory,
    // working both at the domain root and under a subpath deployment.
    const url = `i18n/i18n/${lang}/${ns}.json`;
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        translations[ns] = await resp.json();
      }
    } catch (e) {
      console.warn(`Failed to load translation: ${ns} for ${lang}`, e);
    }
  });
  await Promise.all(promises);
}

/**
 * Look up a translation key across all loaded namespaces.
 * Returns the translated string or the fallback (or key itself).
 */
export function t(key, fallback) {
  for (const ns of namespaces) {
    if (translations[ns] && translations[ns][key] !== undefined) {
      return translations[ns][key];
    }
  }
  return fallback || key;
}

/**
 * Derive the i18n key for a question/caption/legislation from the model element.
 * Uses the convention from translations.json:
 *   question.label.{stableId}.{pathSegments}
 */
export function deriveQuestionKey(section, element) {
  const stableId = getStableId(section);
  const requestpath = element.requestpath || '';
  // Path segments after the first segment (which is the section name)
  const segments = requestpath.split('/');
  const pathAfterFirst = segments.slice(1).join('.');
  return `question.label.${stableId}.${pathAfterFirst}`;
}

export function deriveCriterionNameKey(section) {
  const stableId = getStableId(section);
  return `criterion.name.${stableId}`;
}

export function deriveCriterionDescKey(section) {
  const stableId = getStableId(section);
  return `criterion.description.${stableId}`;
}

export function deriveLegislationKey(section, element) {
  const stableId = getStableId(section);
  const requestpath = element.requestpath || '';
  const segments = requestpath.split('/');
  const pathAfterFirst = segments.slice(1).join('.');
  return `legislation.title.${stableId}.${pathAfterFirst}`;
}

export function deriveCaptionKey(section, element) {
  const stableId = getStableId(section);
  const requestpath = element.requestpath || '';
  const segments = requestpath.split('/');
  const pathAfterFirst = segments.slice(1).join('.');
  return `caption.label.${stableId}.${pathAfterFirst}`;
}

export function deriveRequirementKey(section, element) {
  const stableId = getStableId(section);
  const requestpath = element.requestpath || '';
  const segments = requestpath.split('/');
  const pathAfterFirst = segments.slice(1).join('.');
  return `requirement.label.${stableId}.${pathAfterFirst}`;
}

/**
 * Get the stable ID from a section, following the convention:
 * - For sections with unique code (not 'OT'), use the code field.
 * - For OT-type entries (shared code 'OT'), use the tag field.
 */
export function getStableId(section) {
  if (section.code && section.code !== 'OT') {
    return section.code;
  }
  return section.tag;
}

export function getCurrentLanguage() {
  return currentLanguage;
}
