/**
 * Custom fast-check arbitraries for persistent-navigation-ux property tests.
 *
 * Generators for SessionState, RolesRegistry, and RoleId — used across all
 * property-based tests for this feature.
 */
import fc from 'fast-check';

// ─── Constants ───────────────────────────────────────────────────────────────

/** All valid role IDs from the roles registry */
export const VALID_ROLE_IDS = [
  'contracting-authority',
  'contracting-entity',
  'sole-tenderer',
  'group-lead',
  'group-mem',
  'oeron',
  'subcont'
];

/** Buyer (request) role IDs */
export const BUYER_ROLE_IDS = ['contracting-authority', 'contracting-entity'];

/** Economic Operator (response) role IDs */
export const EO_ROLE_IDS = ['sole-tenderer', 'group-lead', 'group-mem', 'oeron', 'subcont'];

/** Valid ESPD document types */
export const DOCUMENT_TYPES = ['request', 'response'];

/** Valid form part identifiers */
const VALID_PARTS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

// ─── RoleId Arbitrary ────────────────────────────────────────────────────────

/**
 * Generates a valid role ID drawn uniformly from the known registry.
 */
export const roleIdArb = fc.constantFrom(...VALID_ROLE_IDS);

/**
 * Generates a buyer role ID.
 */
export const buyerRoleIdArb = fc.constantFrom(...BUYER_ROLE_IDS);

/**
 * Generates an economic operator role ID.
 */
export const eoRoleIdArb = fc.constantFrom(...EO_ROLE_IDS);

// ─── ISO Timestamp Arbitrary ─────────────────────────────────────────────────

/**
 * Generates a valid ISO 8601 timestamp string.
 * Constrains to reasonable date ranges (2020–2030).
 */
export const isoTimestampArb = fc
  .date({
    min: new Date('2020-01-01T00:00:00.000Z'),
    max: new Date('2030-12-31T23:59:59.999Z')
  })
  .map((d) => d.toISOString());

// ─── Answers Arbitrary ───────────────────────────────────────────────────────

/**
 * Generates a content path key (e.g., "part-II/section-A/question-1").
 */
const contentPathArb = fc
  .tuple(
    fc.constantFrom('part-I', 'part-II', 'part-III', 'part-IV', 'part-V', 'part-VI'),
    fc.constantFrom('section-A', 'section-B', 'section-C'),
    fc.nat({ max: 20 })
  )
  .map(([part, section, idx]) => `${part}/${section}/question-${idx}`);

/**
 * Generates an answer value (string, boolean, or number — typical form answers).
 */
const answerValueArb = fc.oneof(
  fc.string({ minLength: 0, maxLength: 100 }),
  fc.boolean(),
  fc.integer({ min: 0, max: 1000000 })
);

/**
 * Generates an answers object with 0–10 entries.
 */
export const answersArb = fc
  .array(fc.tuple(contentPathArb, answerValueArb), { minLength: 0, maxLength: 10 })
  .map((entries) => Object.fromEntries(entries));

/**
 * Generates a non-empty answers object (at least 1 entry).
 */
export const nonEmptyAnswersArb = fc
  .array(fc.tuple(contentPathArb, answerValueArb), { minLength: 1, maxLength: 10 })
  .map((entries) => Object.fromEntries(entries));

// ─── SessionState Arbitrary ──────────────────────────────────────────────────

/**
 * Generates a valid SessionState object with a role set.
 * Shape: { role, currentStep, answers, metadata: { createdAt, lastModified } }
 */
export const sessionStateArb = fc.record({
  role: roleIdArb,
  currentStep: fc.nat({ max: 10 }),
  answers: answersArb,
  metadata: fc.record({
    createdAt: isoTimestampArb,
    lastModified: isoTimestampArb
  })
});

/**
 * Generates a SessionState with no role (empty/new session).
 */
export const emptySessionStateArb = fc.record({
  role: fc.constant(null),
  currentStep: fc.constant(0),
  answers: fc.constant({}),
  metadata: fc.record({
    createdAt: isoTimestampArb,
    lastModified: isoTimestampArb
  })
});

/**
 * Generates any SessionState — either with a role or empty.
 */
export const anySessionStateArb = fc.oneof(sessionStateArb, emptySessionStateArb);

// ─── Role Entry Arbitrary ────────────────────────────────────────────────────

/**
 * Generates a single role entry as found in roles.json.
 */
const roleEntryArb = (docType) =>
  fc.record({
    id: fc.string({ minLength: 3, maxLength: 20 }).filter((s) => /^[a-z-]+$/.test(s)),
    label: fc.string({ minLength: 2, maxLength: 40 }),
    description: fc.string({ minLength: 10, maxLength: 200 }),
    documentType: fc.constant(docType),
    formBehavior: fc.record({
      visibleParts: fc.subarray(VALID_PARTS, { minLength: 1 }),
      editableParts: fc.subarray(VALID_PARTS, { minLength: 1 }),
      exclusionGroundRules: fc.record({
        criminal: fc.constantFrom('mandatory', 'optional'),
        payment: fc.constantFrom('mandatory', 'optional'),
        misconduct: fc.constantFrom('mandatory', 'optional'),
        national: fc.constantFrom('mandatory', 'optional')
      })
    }),
    xmlMapping: fc.record({
      element: fc.constant('cac:ContractingParty/cbc:PartyTypeCode'),
      code: fc.string({ minLength: 2, maxLength: 15 })
    })
  });

// ─── RolesRegistry Arbitrary ─────────────────────────────────────────────────

/**
 * Generates a valid RolesRegistry object.
 * Shape: { buyerTypes: [...], eoRoles: [...] }
 * Each group has 1–4 role entries with the correct documentType.
 */
export const rolesRegistryArb = fc.record({
  buyerTypes: fc.array(roleEntryArb('request'), { minLength: 1, maxLength: 4 }),
  eoRoles: fc.array(roleEntryArb('response'), { minLength: 1, maxLength: 5 })
});

/**
 * The actual roles registry as loaded from roles.json — useful when tests need
 * the real data rather than random instances.
 */
export const REAL_ROLES_REGISTRY = {
  buyerTypes: [
    {
      id: 'contracting-authority',
      label: 'Contracting Authority',
      description: 'A contracting authority subject to Directive 2014/24/EU creating an ESPD Request.',
      documentType: 'request'
    },
    {
      id: 'contracting-entity',
      label: 'Contracting Entity',
      description: 'A contracting entity subject to Directive 2014/25/EU (utilities) creating an ESPD Request.',
      documentType: 'request'
    }
  ],
  eoRoles: [
    { id: 'sole-tenderer', label: 'Sole Tenderer', description: 'An economic operator submitting a tender individually.', documentType: 'response' },
    { id: 'group-lead', label: 'Group Leader', description: 'The lead member of a group of economic operators.', documentType: 'response' },
    { id: 'group-mem', label: 'Group Member', description: 'A non-lead member of a group of economic operators.', documentType: 'response' },
    { id: 'oeron', label: 'Other Entity (Relied Upon)', description: 'An entity whose capacities the main tenderer relies on.', documentType: 'response' },
    { id: 'subcont', label: 'Subcontractor', description: 'A subcontractor who will carry out part of the contract.', documentType: 'response' }
  ]
};
