# UX Decisions: Navigation & Session Management

This document captures the user-experience decisions behind espd-demo's navigation, headers, and session handling. It exists so future contributors understand *why* the layout is structured the way it is, not just *how*.

## Context

espd-demo helps two kinds of users produce two different documents:

- **Buyers** (Contracting Authority, Contracting Entity) create an **ESPD Request**.
- **Economic Operators** (Sole tenderer, Group leader, Group member, Other entity relied upon, Subcontractor) create an **ESPD Response**.

The form is a multi-step wizard across Parts I–VI, where the visible parts depend on the selected role.

## Decisions

### 1. Always land on the Home page

**Decision:** On every load, show the Home page — never auto-jump into the wizard, even when a saved session exists.

**Why:** The previous behavior restored the wizard silently from `localStorage`, trapping the user with no obvious way to restart, switch roles, or import a file. Always showing Home gives the user a clear choice of what to do.

**How:** When a saved session exists, Home shows a **Continue card** (document type, role, last-modified time, answered count). Otherwise it shows only "New ESPD" and Import.

### 2. Two-step role selection

**Decision:** Choosing a role happens in two steps — first pick a path (Buyer or Economic Operator), then pick the specific role within that path.

**Why:** There are seven roles. Showing all seven at once is overwhelming and blurs the Buyer/EO distinction, which is the most important first decision. A path-first flow keeps each screen focused.

### 3. Actions are always accessible

**Decision:** "Home", "New", and "Import" are available at all times from the wizard, not just from the landing page.

**Why:** Users — especially Economic Operators who start from a received Request XML — should never be blocked from restarting or importing. Import in particular used to be hidden inside a collapsed element that disappeared once the wizard opened.

### 4. Clear document-type context

**Decision:** A badge always shows whether the user is editing an **ESPD Request** or an **ESPD Response**, with distinct colors (Request = blue tone, Response = green tone) plus the role label.

**Why:** Request and Response are fundamentally different documents. The user must always be able to tell, at a glance, what they are working on.

### 5. Confirm before discarding work

**Decision:** Starting a "New" ESPD prompts for confirmation only when the current session has answers. An empty session proceeds straight to role selection.

**Why:** Protect work in progress without nagging users who have nothing to lose.

### 6. Site header and wizard navigation are separate

**Decision:** The site header (espd-demo / ESPD branding + language selector) is a distinct, always-visible component. It is **not** merged with the wizard navigation.

**Why:** The site header is application-level chrome (branding, language). The wizard navigation is task-level context (which document, which role, which step). They are semantically different, so they are visually separate. The site header is kept compact to conserve vertical space.

### 7. Wizard header and step progress are one component

**Decision:** The wizard context (badge + role + actions) and the Part step navigation are grouped into a single bordered card — the **wizard navigation bar**.

**Why:** Both are wizard-level navigation. The header answers *what am I editing?* and the steps answer *where am I in the process?*. Grouping them into one visual unit reinforces that they belong together and reduces the number of separate bars competing for attention.

Layout:

```
┌──────────────────────────────────────────────────────────┐
│ [ESPD Request] Contracting Authority   [Home][New][Import]│
├──────────────────────────────────────────────────────────┤
│  Part I    Part III    Part IV    Part V    Part VI        │
└──────────────────────────────────────────────────────────┘
```

### 8. Part labels are shown in full

**Decision:** Step links display the full Part label ("Part I", "Part III", …) with no numeric prefix and no ellipsis truncation.

**Why:** The earlier design prepended a CSS counter ("1. Part I") which duplicated the Roman numeral, and forced equal-width items that truncated text to "Part…". Both hurt readability. Labels now size to their content and are always fully legible.

### 9. Scroll keeps the navigation visible

**Decision:** When navigating between steps, the view scrolls to the top of the wizard navigation bar, not to the form content below it.

**Why:** Scrolling to the form content pushed the navigation bar out of view, hiding the user's context and controls. Keeping the nav bar in view preserves orientation.

## Source of role labels and definitions

Role labels and definitions come from the official **EU Vocabularies `eo-role-type` codelist**
(`http://publications.europa.eu/resource/authority/eo-role-type`), the same authority the
ESPD-EDM references. Definitions are the codelist's `skos:definition` values, used verbatim
rather than paraphrased, to stay aligned with the legal/standard source.

| Code | Label | Definition |
|------|-------|-----------|
| `sole-tenderer` | Sole tenderer | Economic operator which has submitted a tender without being part of a group of economic operators. |
| `group-lead` | Group leader | Economic operator which is the leader of a group of economic operators. |
| `group-mem` | Group member | Economic operator, which is a member of a group of economic operators, without being the leader. |
| `oeron` | Other entity (relied upon) | Economic operator (who is not a subcontractor) on which the tenderer relies upon, to meet selection criteria. |
| `subcont` | Subcontractor | Economic operator to whom the contractor assigns a share of the contract. |

## Related files

- `index.html` — page structure (site header, wizard navigation bar, dialogs)
- `js/home.js` — Home page (Continue card, New, Import)
- `js/path-selector.js` — two-step role selection
- `js/wizard-header.js` — wizard context row (badge, role, actions)
- `js/app.js` — navigation orchestration between Home, path selector, and wizard
- `css/espd.css` — layout and styling for the above
- `model/generated/ui/roles.json` — role definitions and per-role form behavior
