# UI — Presentation Record

**Artefact classification:** Presentation (CLS-10, approved 24 November 2026); existing governing responsibility labels and conditional future service proposals do not alter this blueprint placement.

**Capability:** `ui` · **Class:** presentation artefact · **Conceptual status:** Owner-approved, 23 November 2026; implementation and acceptance evidence outstanding. **Review:** draft PR #146.

**Authority:** [Accepted ADR-0009](../../decisions/ADR-0009-headless-capability-layers.md) (presentation), [ADR-0011](../../decisions/ADR-0011-shared-rich-text-and-configurable-copy.md) (safe rich text), [ADR-0012](../../decisions/ADR-0012-trivial-composition.md) (consumer contract/composition) and the [normative presentation standard](../../standards/presentation-standard.md). This blueprint does not supersede accepted governance or prove runtime compliance.

## Purpose, ownership and exclusions

`ui` supplies generic, styled, accessible and localisable Vue/Nuxt presentation components. Capability screens, optional kits and applications reuse these components without importing another domain's private code. It remains a **presentation artefact**, not a stateless utility-library relocation or a business service.

**UI owns** its public component interfaces, generic interaction and accessibility behaviour, local message catalogue, safe structured-rich-text rendering and temporary client-side state (such as focus, draft input, menu visibility and selection). Its lifecycle is mount → interact → update → unmount. UI has **no business source of truth**, persisted records, provider accounts, database, migrations, durable outbox, scheduled tasks, independent domain commands or evidence custody.

Ownership boundaries:

| Owner | Responsibility — never transferred to UI |
|---|---|
| **[Page Builder](../page-builder/presentation-record.md) (candidate; PB-01–PB-10 approved)** | Composition-specific schemas, registered block assembly, layout and visual authoring; consumes generic UI public components; approved conceptual interface supplies typed props, content, layout, approved variants and interaction handlers (PB-11–PB-16 approved). UI does not own page definitions, the block registry, template evaluation or the editor. Approved STD-PB-01–07 apply ATAG/WCAG to integrated authoring; generic controls preserve accessible semantics. Approved PB-22–28 use generic accessible controls for the three-panel editor, keyboard alternatives, responsive drawers and quality diagnostics; Page Builder owns the editor. No reverse runtime dependency |
| **Theme Manager** | Semantic token vocabulary, theme definitions, effective theme, validation/application, contrast rules and preference persistence. UI consumes its public vocabulary; it defines no competing theme |
| **Host application** | Tenant/caller integration, routing, branding, top bar, sidebar, navigation, component mounting and optional screen replacement |
| **Source/domain capability** | Records, authoritative outcomes, business rules, access and disclosure decisions, revisions, event/outbox, retry, historical evidence and server enforcement |
| **Each capability's presentation part / optional kit** | Domain-specific screens or cross-capability journeys, built through published headless contracts |
| **Rich Text / Content Editor** | Rich Text owns syntax, profiles and safe-tree validation; Content Editor owns authoring widgets and editorial workflows; UI draws safe trees and generic controls |
| **Localisation, Clock, Configuration, Profile** | Respectively language services, temporal semantics, registered operational settings and personal context; UI owns none of their authoritative values |

A rendered button or disabled control is **not an access decision**. A callback is not evidence that an operation committed. Production capability screens are owned by their presenting capability or host, not by UI.

**Navigation extension (PB-29–37 approved):** Page Builder consumes generic accessible navigation landmarks, link/disclosure/menu primitives and keyboard interaction controls; supplies authorised resolved items, labels, current-page state and layout. UI owns neither menu definitions nor discovery/permissions.

## Native presentation services

The initial public design covers labelled inputs, buttons/links, validation and statuses, menus/dialogues/tabs/disclosures, tables/lists/selection, navigation building blocks, responsive layouts, progress/loading/empty/failure states, accessible images and a safe-tree renderer. Trees, advanced data grids, charts and other complex controls are added only where genuine consumers justify them; no domain-specific editor, business graph model, report engine or navigation registry is embedded in UI.

Each component exposes stable props, slots and typed local interaction events, with semantic HTML, keyboard support, visible focus, accessible names, reduced motion, responsive reflow and locale-aware presentation. Local component state can be reset without losing business records. UI must not perform direct protected data fetches or automatically repeat uncertain business mutations.

**Safe rich text:** accept supported, bounded, validated `RichTextNode[]` structures, including version/profile context where relevant. Revalidate external trees. Render text as text, never raw HTML. Resolve `doc:` and `asset:` references only via host-supplied, source-authorised references; missing, revoked, malformed or unsupported items produce non-disclosing safe fallbacks. SSR and hydration must preserve safe output and accessible meaning. Other export formats are deferred until an identified consumer justifies them and ownership with `export` is agreed.

## Idealised public input contract

These are conceptual inputs, **not claims about shipped function signatures**.

| Provider and need | Information supplied | Validation, absence and authority |
|---|---|---|
| **Host / presenting screen — essential** | Component content, labels, descriptions, variant, state, stable item keys, event callbacks, permitted actions, loading/unknown/error flags | Check props and supported variants, require accessible names; render safely when partial; host/source owns all data and permission truth |
| **Theme Manager through host — conditional on styling** | Effective semantic tokens and presentation preferences: colour, type, size, focus, density, contrast and motion | Apply public token vocabulary only; without Theme Manager, controls remain usable but may be unstyled; UI cannot validate or persist themes |
| **Presentation catalogue/locale — essential when wording appears** | BCP 47 locale, direction, UI-owned `messageKey` translations, approved overrides and formatted values | Missing keys fail visibly in development; escape interpolation, support RTL; Clock/source owner supplies time meaning |
| **Authorised source read model — conditional** | Records, status, provenance/freshness, known or uncertain outcomes, revision, permitted action callback | Refuse unsafe disclosure or unsupported shapes; preserve stale/partial/unknown; never infer permission from browser-supplied tenant IDs |
| **Rich Text and host resolution — conditional** | Validated bounded safe tree, profile/version, approved document/asset resolution result | Reject or render inert malformed/unsafe nodes and URLs; a syntactically safe link does not prove access |
| **Browser/assistive environment — interactive use** | Pointer/keyboard input, viewport, reduced-motion and relevant platform support | Progressive behaviour and meaningful SSR; degrade safely where APIs are unavailable |

Only necessary context travels through each surface: locale/direction, theme state, accessible identifiers, qualified owner status and optional sanitised correlation. **No universal request object or UI-owned tenant/permission model** is required.

## Idealised public output contract

| Recipient | Output and permitted conclusion |
|---|---|
| **Presenting application / capability / kit** | Versioned public generic components, prop/event types, slots, message keys and documented supported variants; UI's library contract, not a guarantee of whole-page conformance |
| **Browser and assistive technology** | Semantic responsive HTML/SSR content, accessible focus/keyboard behaviour, safe rich-text content and localised status/error messages |
| **Host / source owner** | Typed **interaction intents** (change, submit, select, sort, filter, paginate, request confirmation, dismiss or retry request), not completed business commands |
| **Host diagnostic adapter** | Optional bounded safe rendering/validation/hydration diagnostics and explicit unsupported states; never raw input or private data |

**No independent domain commands, queries, business events, durable outbox, report records or job surfaces.** The host or presenting owner converts UI intents into separately authorised public-domain commands and reads their results; the owner handles idempotency, concurrency, retries, reversals and disclosure. UI may see repeated interaction events. It must display pending, failed, stale, partial and unknown outcomes honestly, rather than claiming success. Component API, safe-tree, token compatibility and message-key changes are versioned; breaking revisions require downstream compatibility checks.

## Cross-capability public relationships

| Cooperator | Inputs/UI consumes | Outputs/UI supplies; ownership and absence |
|---|---|---|
| **Theme Manager** | Semantic token vocabulary and effective values via host | Styled, accessible components; without it, safe usable unstyled display; no package import cycle or competing theme store |
| **Host/application** | Routes, shell, trusted scope, locale, owner-authorised props and handlers | Components and local event intents; host owns routing, server composition and permissions |
| **Rich Text / Content Editor / Publisher** | Validated safe tree; field constraints and authorised document read model through the presenting owner | Accessible safe rendering, forms and input events; Rich Text owns format, editor owns authoring and Publisher owns document state |
| **Identity / Authentication / Authorisation** | Trusted scope and outcome from server/host | Accessible UI affordances, never a grant or session assertion; protected operations remain server-authorised |
| **Localisation / Clock** | Message catalogue/locale and qualified formatted values supplied through host | Localised controls and time display, no translation/time-source authority |
| **Configuration / Profile** | Approved display context where supplied by host | Presentation only; personal and registered settings stay with their owners |
| **Media / Storage / Export** | Authorised image/link references, alt descriptions, permitted safe-tree/export status | Safe accessible content display and action intents; source owns permissions, Storage bytes, Export conversion |
| **Metadata / Process / Pricing / other domain screens** | Domain-owned read models and permitted callbacks through each presentation part | Generic tables/forms/dialogues, structured keyboard alternatives and event intents; no direct domain imports |

These are conceptual **public-contract exchanges**, not automatic mandatory package dependencies. Consumers depend on generic UI; UI does not import their domains. No directed package dependency cycle is introduced. Reciprocal notes for Content Editor, Rich Text and other consumers retain their independently recorded status.

## Error Normalisation, Logging, Audit and Reporting — reciprocal public interfaces (23 November 2026)

**Owner-approved conceptual separation; not evidence of implemented adapters.**

| Cooperator | Public input to UI / presentation | Public output from UI and non-transferable authority |
|---|---|---|
| [`error-normalisation`](../../libraries/error-normalisation/stateless-library-record.md) | Source-approved safe code, `messageKey`, field hint, qualified outcome and **advisory** retry classification | Accessible error/field/status presentation; originator alone knows commit outcome and controls retry; pure library receives no UI log/audit event |
| [`logging`](../../services/logging/services-record.md) | Optional intake status or authorised scoped operational health | UI/host submits only sanitised component/render/hydration code, severity and trusted opaque correlation through Logging's public intake; Logging returns accepted/rejected/throttled/unavailable/uncertain. Not business success or Audit proof |
| [`audit`](../../capabilities/audit/capability-record.md) | Only owner-authorised redacted evidence and receipt/integrity/coverage/review/unknown status | UI renders accessible timeline/status/review **intents**; source owner emits selected attributable assertions, Audit owns evidence custody; UI never creates a receipt or claims approval |
| [`reporting`](../../capabilities/reporting/capability-record.md) | Authorised report tables/chart specifications, parameters, provenance, completeness, freshness and permitted export states | Accessible table/chart and equivalent structured view; filtering/run/refresh/export **requests** go through Reporting's public contract; Reporting owns measures, execution, privacy and results |

Logging submission, Audit evidence receipt, Reporting execution receipt and a domain business result remain **four separate assertions**. Their failure modes are not interchangeable. Routine logging loss does not undo a valid domain action; required risk-based Audit capture must be enforced by its originator, not by the UI. No sensitive form contents, credentials or raw exception stacks go into routine diagnostics.

## Security, accessibility, privacy and recovery

**Engineering floors:** OWASP ASVS 5.0 Level 2 (applicable Level 3 for critical interfaces); WCAG 2.2 AA; semantic HTML and WAI-ARIA where needed; BCP 47/Unicode CLDR/ECMA-402 internationalisation; accessible SSR; safe text/URL handling, reflow, visible focus, labelled controls, target size, zoom, keyboard, contrast, reduced motion, touch and RTL. UI's component catalogue owns its messages; host may override them. Missing translations fail visibly in development.

The server-side owner independently verifies every protected read and command, including any action reached through a disabled/hidden or manipulated UI. Do not put secrets, user text or protected personal identifiers into DOM attributes, links, URLs or telemetry. Retention, consent, legal hold, disclosure and subject-rights responsibilities remain with domain/Privacy/Legal Compliance owners. UI holds only ephemeral drafts unless an explicit source owner persists them. Host and source owner apply anti-framing, no-store, referrer, secure input/autocomplete and other page-level controls on administrative/credential screens. Provider error, stale state or unknown outcome must not become a false success or unsafe automatic retry.

**Supporting references and status:**

| References | Role in conceptual design |
|---|---|
| [W3C WCAG 2.2](../../../RESOURCES.md#wcag-22) and ISO/IEC 40500:2025; [WAI-ARIA](../../../RESOURCES.md#wai-aria-12), [APG](../../../RESOURCES.md#aria-apg); [WHATWG HTML](../../../RESOURCES.md#whatwg-html), W3C CSS | Mandatory accessibility/web engineering baseline where normative; APG informs widget patterns, not an additional binding standard |
| [BCP 47](../../../RESOURCES.md#bcp-47-2), [Unicode CLDR](../../../RESOURCES.md#unicode-cldr), [ECMA-402](../../../RESOURCES.md#ecma-402-2), [W3C internationalisation](../../../RESOURCES.md#w3c-internationalisation) | Governing language, direction and locale formatting |
| [OWASP ASVS 5.0](../../../RESOURCES.md#owasp-asvs-50), frontend and XSS guidance | Mandatory governing security floor plus practical defensive guidance |
| ISO 9241-210:2019, 9241-110:2020, 9241-115:2024; ISO/IEC 30071-1:2019; [GOV.UK Design System](../../../RESOURCES.md#govuk-design-system) | Recommended human-centred interaction, navigation, accessibility-process and tested UI-pattern guidance |
| [Design Tokens Community Group format 2025.10](../../../RESOURCES.md#w3c-design-tokens-community-group-202510) | Optional token interchange guidance for Theme Manager; **not** a W3C Recommendation |
| [UK Public Sector Accessibility Regulations](../../../RESOURCES.md#uk-public-sector-accessibility-regulations), Equality Act 2010, UK GDPR/Data Protection Act 2018, EN 301 549 | Jurisdiction- and service-specific legal duties determined by Legal Compliance; not blanket UI certification. EN 301 549 v4.1.1 published Sep 2026; legal harmonisation/citation must be rechecked before reliance |

Passing individual component checks does **not** establish a compliant composed page. Test automated and manual assistive-technology behaviour in both light and dark modes, and relevant high-contrast, mobile and locale combinations.

## Open-source development options

**Owner-approved selection direction, not approved package versions or implemented dependencies:** use complete publicly available, commercially permissive source with active maintained current releases; no paid flagship dependency or delayed free edition.

| Preferred role | Candidate (upstream licence) |
|---|---|
| Accessible headless interaction foundation | [Reka UI](../../../RESOURCES.md#reka-ui) (MIT), **preferred** |
| Semantic-token-compatible styling | [Tailwind CSS](../../../RESOURCES.md#tailwind-css) (MIT) |
| Optional browser utilities | [VueUse](../../../RESOURCES.md#vueuse) (MIT) |
| Optional popover positioning | [Floating UI](../../../RESOURCES.md#floating-ui) (MIT); avoid duplication with Reka |
| Optional advanced tables | [TanStack Table](../../../RESOURCES.md#tanstack-table) (MIT) |
| Optional icons and schema validation | [Lucide](../../../RESOURCES.md#lucide) (ISC); [Zod](../../../RESOURCES.md#zod) (MIT) |

**Alternatives, not cumulative stacks:** [Ark UI](../../../RESOURCES.md#ark-ui)/[Zag.js](../../../RESOURCES.md#zagjs) (MIT), [Nuxt UI](../../../RESOURCES.md#nuxt-ui-v4) (MIT) or [shadcn-vue](../../../RESOURCES.md#shadcn-vue) (MIT). Select one primary primitives foundation. [PrimeVue](../../../RESOURCES.md#primevue) is excluded as the preferred long-term base owing to its commercial-licensing direction; [OpenVue](../../../RESOURCES.md#openvue) is currently too new for the stated maturity criterion. [axe-core](../../../RESOURCES.md#axe-core) (MPL-2.0) is free open source but **not MIT/ISC-style permissive**; separate licence approval is required if the strict rule applies.

Before implementation, verify exact release and **all transitive/asset licences**, full current source/release parity, Nuxt/Vue/TypeScript/Tailwind compatibility, SSR/hydration, keyboard/assistive behaviour, RTL, contrast, bundle/performance cost, upstream security history and substitutability. Keep external APIs behind UI-owned public wrappers; pin reproducible releases. No proprietary runtime or online-licensing service is required by design. The user/CI, not this review, runs tests.

## GUI and representative host

**Owner-approved:** UI needs **no production user or administrator dashboard**; it has no records or operational controls. A **derived local-only test application** may expose a **component showcase at host-owned `/ui`**, reached via the existing **Capabilities** sidebar and a card on `/admin`. This is a demonstration/acceptance route, not a UI package route, mandatory screen or second Theme Manager.

**Verified representative:** [`nuxt-layers-test/application-test-template`](../../../RESOURCES.md#application-test-template) `master` has a standalone homepage `/`, dashboard `/admin`, collapsible responsive Capabilities sidebar, Theme Manager at `/theme-manager`, top-bar Appearance control, branding and a **Not signed in** placeholder. The derived test host adds its own navigation and route without modifying the shared template. The template uses unauthenticated local Theme Manager test mode and is **not** a production IAM example.

Prefer a single `/ui` route with six sections:

| Section | What the showcase demonstrates |
|---|---|
| Overview | Public component catalogue, versions, variants, unsupported states |
| Controls | Buttons, menus, dialogues, tabs, tooltip, keyboard/focus/close |
| Forms | Labelled fields, errors, validation, select/checkbox, pending and confirmation |
| Data display | Table/list/tree, filtering/pagination, status, chart and equivalent accessible data |
| Content | Valid/host-authorised rich text, images and links; invalid/inaccessible fallbacks |
| Accessibility/localisation | Light/dark/high contrast, keyboard and screen-reader scenarios, zoom/RTL, reduced motion, missing translations |

Host fixtures provide sample values and local callbacks; they never call unapproved protected services. Existing Theme Manager Appearance and mobile navigation continue to operate. In production, domain-owned presentation parts use UI components in their **own** host-mounted dashboards; a host may replace UI with equivalent accessible components.

## Conceptual acceptance scenarios

| Input / circumstance | Expected UI result; external authority |
|---|---|
| Valid labelled form + user submit | Keyboard/focus works; emits intent and pending state, not success. Domain owner decides result |
| Light/dark/high-contrast theme or Theme Manager absent | Uses semantic values/accessibility constraints; remains usable unstyled if absent. Theme Manager owns effective values |
| Valid safe tree with authorised `doc:`/`asset:` | Accessible escaped output; source/host authorises references |
| Hostile tree, unsafe URL, unsupported node, missing asset | Bounded inert or non-disclosing fallback; no executable HTML |
| RTL, missing message, zoom, keyboard-only and assistive technology | Proper direction/reflow/focus/status and visible missing key in development |
| Cross-tenant data, tampered disabled control or missing server authority | UI cannot grant access; server/source refuses protected operation |
| Duplicate submit, stale revision, timeout or unknown outcome | No fake completion or silent retry; source handles idempotency/reconciliation |
| Logging unavailable, Audit evidence pending, Reporting data incomplete | Distinct truthful states; no cross-service receipt substitution |
| Host switches off/replaces UI or source capability screens | Source headless contract continues; alternative presentation meets owner screen checklist |
| Derived test host sidebar/overview | Optional `/ui` and `/admin` card work with responsive shell and Theme Manager; test-only security never becomes production mode |

Component and composed-screen acceptance must cover SSR/hydration, performance, keyboard/assistive technology, sanitisation, theme compatibility, translations, error/disclosure states and a minimal independent consumer.


## Theme Manager approved reciprocal alignment — 23 November 2026

[Theme Manager's canonical conceptual record](../theme-manager/presentation-record.md) (TM-01–TM-06, merged review #142) confirms that Theme Manager alone owns the effective theme, semantic role/channel/state/mode tokens, accessible token validation and application. UI consumes the published vocabulary; the host owns routing and colour-mode shell integration. Theme Manager without management screens still supplies a safe default theme; if Theme Manager is wholly absent, UI can remain usable but unstyled under ADR-0009. UI components must preserve keyboard, focus, non-text contrast, reflow, forced-colour and reduced-motion accessibility. Theme Manager's proposed **Inspect colours** specimen editor with keyboard-accessible advanced matrix belongs to Theme Manager's optional editing UI, not generic UI. No reverse package import or token-definition duplication.

## Decisions, evidence and outstanding work

**Owner-approved conceptual decisions (23 November 2026):**
- **UI-01:** A generic presentation artefact without authoritative business state, business lifecycle, independent production dashboard or domain-specific services; include safe-tree rendering.
- **UI-02:** Public component props, rendering and typed interaction intents; business commands, queries, errors, permissions and durable events remain source-owned.
- **UI-03:** Theme Manager vocabulary only; accessible, localised host composition and optional **test** component showcase; no theme authority or persistence.
- **UI-04:** Reciprocal public-contract boundaries and future alignment of implementation theme ownership and complete consumer `CONTRACT.md`.

Also owner-approved in this conversation: standards/assurance guidance, **Reka UI-first permissive-library shortlist** (version selection conditional), Error Normalisation/Logging/Audit/Reporting separation, and the derived-host six-section GUI pattern. These are conceptual decisions, not permission to change implementations or merge.

**Established authority:** governing ADRs and presentation requirements; the blueprint catalogue/register both name `ui` as a presentation artefact with fully styled generic components consuming Theme Manager's vocabulary.

**Documented implementation, not independently accepted:** [`nuxt-layers/ui`](../../../RESOURCES.md#nuxt-layersui) `master` previously checked at `00953556de5335b0df85ef9e84518dfac8886dac`; README describes legacy `@nuxt4-layers/ui`, `@nuxt4-layers/ui/theme` and `UiSurface`, while `docs/contracts.md` claims UI-owned token/theme validation/application. **No root `CONTRACT.md` was found.** This conflicts with Theme Manager's accepted exclusive authority; actual component exports, safe renderer and host acceptance are **not established**. Do not present proposed interfaces as shipped.

**Implementation alignment / technical investigation (deferred):** correct theme ownership, package scope and published root consumer contract; specify actual component exports, safe-tree renderer, version migration, style/unstyled mode and token compatibility; select and audit dependency versions; demonstrate ADR-0012 self-contained consumer/minimal host and 50-line budget where applicable; validate SSR, performance, security and accessibility in CI/manual review. Theme Manager PR #142 has merged and its approved reciprocal design is reconciled above. No independent unresolved **conceptual ownership** choice is identified; technical implementation evidence is outstanding.

**Completion status:** Conceptual specification **complete for owner review**, including public input/output contracts, relationships, GUI, standards, library criteria and acceptance. This is **not** a runtime-ready, independently verified or legally certified UI capability. Keep PR #146 as the single draft review and obtain explicit approval before any squash merge, after a refreshed technical **and** architectural consistency check against current `master`.
