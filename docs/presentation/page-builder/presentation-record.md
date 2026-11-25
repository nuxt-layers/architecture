# Page Builder — Presentation Record

**Artefact classification:** Presentation (CLS-10, approved 24 November 2026); existing governing responsibility labels and conditional future service proposals do not alter this blueprint placement.

**Identity:** `page-builder` · **Classification:** Presentation artefact candidate. **Status:** Conceptual design complete and owner-approved (24 November 2026): PB-01–PB-37 and STD-PB-01–07. Implementation, governing adoption, published root `CONTRACT.md`, independent acceptance and merge are separate and unverified. Review PR #152.

**Authority:** [Capability Standard](../../capability-standard.md) (master blob 0c2b9fe03534796041fd0bb240c1c088ccf0b7ee, checked 24 November 2026), governing catalogue and applicable accepted ADRs, including 0001, 0002, 0009, 0011, 0012 and 0016. Apply governing tenant and policy requirements (ADR-0017/0018). [Working catalogue](../../catalogue.md) · [Register](../../architecture-index.json). Pre-merge reconciliation: governing master d7f7c2ee051244b8c81325f5ff1267568d99aab1; blueprint master 666a08c8e77375e2124f856077e8f808abde483e. The governing catalogue does not yet list Page Builder; this is a non-normative candidate, not governing adoption.

## 1. Purpose, ownership and scope

Page Builder lets authors assemble websites, shops, portals and application pages using registered components, responsive layouts and safe data bindings. It owns the composition schema, component registration and validation, editing experience and rendering integration. Its distinct, reusable presentation behaviour justifies the candidate boundary; independent packaging and acceptance remain implementation matters.

**Publisher owns all saved page, template and reusable-section definitions**, as registered structured document types. It owns persistence, versions, approvals, publication, scheduling, addresses, restoration and the transactional outbox. Page Builder has no independent database, durable business state, outbox, scheduler, workflow engine or publication lifecycle. Unsaved editor state is temporary; a saved draft is a Publisher document.

Theme Manager owns the effective theme, semantic token vocabulary, validation and preferences. UI supplies generic components and accessible interaction primitives. Content Editor supplies editorial controls; Rich Text owns the safe text format. Template Engine owns stateless expression evaluation. Source domains retain data, permission checks and business operations. The host owns application routes, navigation, branding, trusted context and delivery.

Use native, provider-neutral composition, not an external website-builder service. The default remains a modular monolith. No private imports, direct cross-owner database access or cyclic dependencies, including Nuxt extension edges. Reciprocal documentation does not establish reverse runtime dependencies.

## 2. Composition, templates and delivery

### Page structure and layout

Store a versioned structured tree, not generated HTML. Pages contain sections, containers and blocks with stable IDs, registered component keys and versions, typed properties, approved child/slot constraints, layout and token references, and bindings. Registrations declare schemas, validation, compatible versions, data needs and trusted rendering entry points. Hosts and source capabilities contribute approved blocks through public interfaces.

Use CSS Grid and Flexbox with bounded responsive rules for nesting, ordering, columns, alignment, spacing and visibility; avoid unrestricted pixel positioning. Preserve meaningful DOM order, reflow and accessible interactions. Use Theme Manager tokens and approved variants for colour, typography, spacing, borders and shadows. Page Builder owns layout, not arbitrary CSS or competing theme values. Compatible effective-theme changes restyle pages without changing saved definitions. Validate compatibility and accessibility; use safe fallbacks for incompatible values.

Reject unknown or incompatible blocks at publication. Retain supported older versions or migrate explicitly and review the changed revision; never silently alter published pages. Reusable sections and templates use explicit version references or copies. Portable imports validate schemas, source mappings and provenance before Publisher saves them; exports contain no credentials or protected data.

### Liquid and data binding

Use a restricted, versioned Liquid-compatible profile owned by the existing stateless Template Engine library. Visual authoring works without Liquid. Support substitution, conditions, bounded iteration, approved filters and reusable fragments. Shopify-specific objects and filters require explicit supported adapters; compatibility is not Shopify feature parity. No parallel interpreter, arbitrary JavaScript or Vue template compilation.

Source owners supply typed, bounded, authorised read projections. Resolve these before evaluation, checking trusted tenant, resource, purpose and disclosure authority. Templates cannot query databases, access network/filesystem, traverse prototypes, use ambient credentials or execute business mutations. Reject unknown helpers and unsupported contexts; escape output by context, validate URLs and structured results, and bound depth, loops, CPU/time, memory and output. Supply locale and time explicitly for deterministic rendering. Rich-text output requires safe-tree validation rather than implicit trust.

### Publication and rendering

Author and validate → Publisher saves a revision → Publisher applies approval/scheduling/publication rules → host resolves the published revision, effective theme, approved components and current authorised bindings → render. Use static, parameterised (such as product details), dynamic and appropriately authorised personalised pages. SSR or safe pre-rendering, progressive enhancement and compatible hydration support accessibility, SEO and speed.

Preview is separately authorised, revision-pinned and excluded from public caches and indexing. Current source access and freshness are checked even when a template is published. Preview or render success does not establish publication. Publisher owns canonical public addresses and publication events; SEO and host own their respective search projections and delivery. Production rendering does not require editor code, administration routes, sidebar or test fixtures.

### Navigation and Menu Builder — PB-29–PB-37 approved

Include a reusable Menu Builder within Page Builder, not a separate capability (PB-29). Support manual, automatic and hybrid menus (PB-30). Manual entries reference published pages, host-approved routes or validated external links. Dynamic sections use explicitly configured selectors against Metadata taxonomies, assignments and qualified semantic relationships, Publisher collections or other authoritative source projections (PB-31). Metadata is optional; manual menus and non-Metadata discovery continue without it. Metadata does not own menu ordering, addresses, resource visibility or access decisions. Distinguish inferred from asserted relationships and their freshness.

Publisher stores menu definitions as registered versioned documents (PB-32). Page Builder defines the schema: stable item IDs, nested ordered entries, localised labels, target references, discovery selector and scope, depth/count limits, ordering, exclusions and empty-result policy (PB-33). Menus may be reused in headers, footers, sidebars, contextual navigation and breadcrumbs through explicit pinned versions or copies. Published dynamic rules may intentionally resolve changing eligible results without republishing the rules; no silent changes to the rule revision itself. Detect cycles, duplicates and broken/retired targets; use deterministic order and bounded traversal. Internal references resolve current canonical addresses from Publisher or approved host route registrations; external URLs require scheme/target validation. Breadcrumbs use explicit path/context, not an assumed unique taxonomy parent.

Source owners qualify publication, eligibility, availability and addresses; Authorisation checks protected disclosure in the actual visitor context (PB-34). A taxonomy relationship, route registration, hidden menu item or author permission cannot grant visitor access. Exclude unauthorised or unknown protected targets without leaking names/counts. Use source-qualified empty/unavailable states, bounded scoped caching and source-driven invalidation on relevant publication, taxonomy, permission and route changes (PB-37). Never share personal/preview menu results through public caches; fail closed for uncertain protected disclosure. No independent menu persistence or outbox.

Navigation editor and renderer follow ATAG/WCAG: accessible hierarchy editing, keyboard reorder, semantic navigation landmarks, meaningful links, current-page indication, disclosure controls and responsive behaviour (PB-35). The host retains administrative/capability sidebar, dashboard and route registration (PB-36). It may consume separately approved navigation contributions, but neither Metadata nor Page Builder automatically exposes installed/admin routes. Public/site navigation is distinct from privileged application-shell navigation.

## 3. Idealised public contract

These are approved logical interfaces, not verified TypeScript exports or HTTP routes. The eventual root `CONTRACT.md` must be independently usable and specify installation, configuration, exact schemas/signatures, public client/server entry points, versions, permissions, errors, operational limits, screens and absence behaviour.

| Input | Output |
|---|---|
| Host configuration, trusted scope, registrations and dependency ports | Composed services, approved registry and compatibility diagnostics |
| Component key/version, property/slot schema, binding needs and trusted renderer | Registered definition and supported capabilities |
| Page tree, layout, tokens, expected revision and edit intent | Validated revised composition, diagnostics or conflict; Publisher owns saved result |
| Liquid expression, profile, variables, filters and limits | Validated expression or typed rejection via Template Engine |
| Approved source/field mapping and trusted context | Validated binding definition; source owner supplies runtime values |
| Composition and applicable constraints | Structural, accessibility and compatibility diagnostics |
| Authorised draft revision, theme, locale, viewport and scoped data | Isolated safe preview |
| Published revision, theme, locale and authorised source projections | Responsive rendered page, qualified freshness and diagnostics |
| Pattern/template reference, version and parameters | Validated composition with explicit reference or copy |
| Portable definition and approved component/source mappings | Validated import candidate, provenance and incompatibilities |
| Authorised page definition | Portable structured export |
| Validated composition and revision-bound lifecycle intent | Publisher-owned actual result or qualified refusal/unknown |
| Registered component interaction and permitted parameters | Typed intent for host/source owner, not evidence of a committed act |
| Trusted host context and permitted actions | Optional dashboard, editor and preview components |
| Menu definition, revision, manual entries, approved discovery selectors and visitor context (approved PB-29–37) | Validated menu, bounded authorised resolved navigation tree, target/freshness diagnostics; Publisher owns save/publication |

Full authoring/publishing requires Publisher, Theme Manager, UI and server-side Authorisation through documented host composition. Template Engine is required for expression-enabled pages and other ports are conditional on selected features and policy. Rendering-only consumers need not load the editor or hold editing permission. Missing required authority, unsafe input or incompatible mandatory renderer fails closed. Missing optional features yield explicit safe fallbacks or disabled controls.

Use one documented integration operation; a Nuxt adapter meets the governing one-install, one-server-plugin-call and 50-line host budget. Provide an independently usable consumer, public dependency/entry-point metadata and applicable capability manifest. The host supplies documented connections, trusted context and application decisions, not private business adapters or stores. No universal request DTO or exposed provider SDK types.

### Reciprocal information flows

| Cooperator | Supplies to Page Builder | Receives from Page Builder |
|---|---|---|
| Host/application | Trusted caller/site/tenant, routes, registration and ports | Services, registry, editor/renderer, validated definitions and interaction intents |
| Publisher | Authorised documents/revisions, patterns, status, addresses, transition results | Type/schema registration, validated content, component/version refs and revision-bound lifecycle requests |
| Theme Manager | Effective theme, semantic tokens, variants and compatibility checks | Token/variant references and appearance requirements |
| UI | Generic accessible components and safe presentation primitives | Typed props, variants, layout/content and local interaction handlers |
| Authorisation | Resource/purpose-specific decisions | Trusted actor/context, resource, operation and purpose |
| Template Engine | Supported grammar/helpers, bounded validation/evaluation | Expression, typed authorised values, output context, limits and explicit locale/time |
| Content Editor / Rich Text | Editorial controls, profiles and validated safe trees | Editable content, field schema and validation context |
| Media | Authorised assets, variants, alt text and availability | Scoped asset/variant requirements |
| Configuration | Approved site settings and permitted values | Declared setting needs and scoped reads |
| Identity / Authentication | Trusted identity/group/tenant and session assurance via host | Minimum scoped context requests; no identity or credential changes |
| Localisation | Locale/direction and approved translations | Stable translatable field references and source revision; Publisher retains document locale versions |
| Clock | Explicit temporal values and formatting semantics | Scoped temporal/formatting requests |
| SEO | Metadata services and constraints | Authorised derived headings, links, content and structured data; not competing publication events |
| Site Hosting | Site/domain resolution via host | Rendering contribution to host; no domain management |
| Privacy / Legal Compliance | Applicable consent, disclosure, retention and legal restrictions | Scoped resource/purpose requests |
| Caching | Scoped cache, expiry and invalidation | Revision/theme/locale/scope/freshness keys and dependencies |
| Metadata (optional; approved PB-31) | Scoped taxonomy terms, assignments, semantic relationships, provenance/revision and qualified discovery results | Approved selector, term references, scope, limits and purpose; no menu records or access grants |
| Source domains | Approved blocks, bounded read projections, supported actions and qualified outcomes | Scoped binding requests, resource references and validated interaction intents |

For example, Product supplies item details, Pricing qualified prices and Inventory availability. Page Builder does not calculate or own those facts. Source owners independently authorise and commit their operations.

## 4. Errors, operational evidence and reporting

| Cooperator | Page Builder supplies | Returns |
|---|---|---|
| Error Normalisation | Source-qualified validation, template, component, access, revision or render error; mapping/version, operation, observed outcome and safe correlation | Stable code/category, safe message key, permitted field hint, separate public/diagnostic projections and advisory retry |
| Logging | Selected registration/template/render/hydration/dependency failures, safe code, severity, time, correlation and minimal component/version | Technical intake status, diagnostic reference where supported, authorised queries |
| Audit | Policy-selected privileged registration/configuration, sensitive preview/export, prohibited template attempts, denied privileged acts or overrides; trusted actor/scope/resource, observed outcome/time and correlation | Independent accepted/pending/rejected/unknown intake, evidence ID, integrity/coverage and authorised review |
| Observability | Sanitised render latency, failures, traces and correlation | Qualified operational metrics and diagnostics where supported |
| Reporting | Authorised bounded composition, component/version usage, validation/accessibility and template compatibility projections with scope, revision, as-of and coverage | Derived reports, findings, freshness/coverage and explicit gaps |

Normalisation is pure and advisory. Routine editing mistakes produce accessible actionable feedback, not automatic error logs. Do not log raw definitions, unpublished text, bindings, credentials or protected personal/source data. No routine audit of keystrokes, drag/drop, ordinary previews or formatting.

Publisher supplies authoritative committed document creation, revision, approval, publication, withdrawal and deletion evidence. Page Builder supplies only qualifying observed actions of its own. Required evidence must gate the act or follow an approved recoverable pending pattern through the host/source owner. A log or transport acknowledgement does not establish Audit custody. No Page Builder outbox is introduced.

Reporting obtains inventory and lifecycle facts from Publisher, performance metrics from Observability and evidence from Audit via authorised source contracts. Distinguish automated accessibility findings from manual review and incomplete coverage. No separate reporting store, unrestricted log access, visitor analytics, conversion tracking or behavioural profiling.

Keep composition/render, source commit, log intake, Audit custody and report generation outcomes independent. Show unknown or pending outcomes honestly. Source owners reconcile uncertain mutations before retry; advisory retry guidance is not authority. Optional operational ports may degrade safely; mandatory evidence or security policy may not be bypassed.

## 5. Security, quality and standards

Treat authored definitions, imports and bindings as untrusted. Validate component versions, trees, nesting, types, URLs, safe trees and output. Enforce resource authorisation server-side, trusted tenant/group isolation, contextual escaping, XSS/SSRF prevention and bounded queries/rendering. An authoring role grants no source data or mutation rights. No parent-tenant access inference. Separate public, personalised and preview caches by relevant scope, revision, theme, locale and freshness; never leak protected content through shared caches.

Publisher handles optimistic revisions, restoration and exact-revision approvals; no stale approval or silent last-write-wins. Configuration supplies approved scoped settings and provenance, not overrides of mandatory security floors. Legal Compliance qualifies applicable restrictions; Privacy supplies relevant consent/disclosure/retention policy. Distinguish immutable safety rules, configurable policies and legal constraints. Published policy text alone does not activate controls. Respect applicable storage/access requirements before enabling tracking or embeds. Record relevant policy version, scope and failure behaviour. Support accessibility statements through Publisher/host.

| Approved standard decision | Design and acceptance requirement |
|---|---|
| STD-PB-01 — Accessibility | [ATAG 2.0 AA](https://www.w3.org/TR/ATAG20/) Part A accessible editor and Part B support accessible output, plus [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) / ISO/IEC 40500:2025. ATAG formally references WCAG 2.0; retain its requirements and separately apply 2.2. Use WAI-ARIA, ARIA Authoring Practices and ACT rules as appropriate. ISO/IEC 30071-1:2019, ISO 9241-210:2019 and 9241-20:2021 guide human-centred accessibility. Provide accessible defaults, alt-text and heading guidance, repair support and preservation of accessibility metadata. Test editor and authored pages separately, with keyboard, assistive technology and representative users. |
| STD-PB-02 — Security | [OWASP ASVS 5](https://owasp.org/projects/asvs/) Level 2, applicable Level 3, and secure coding guidance. Threat-model authoring, import, preview, publication and delivery separately; test template injection, unsafe URLs, XSS, SSRF, access, resource limits and dependency trust. CSP is defence in depth, not a substitute for validation. |
| STD-PB-03 — Legal/procurement | Assess BS EN/EN 301 549, including ETSI V4.1.1 (September 2026); verify the edition actually required by law/contract. Consider Equality Act 2010 (Great Britain), DDA 1995 (Northern Ireland), UK public-sector accessibility regulations 2018, EU Directive 2019/882 where applicable, UK GDPR/DPA 2018 as amended and PECR. Legal Compliance and Privacy qualify applicability; no universal legal-compliance assertion. |
| STD-PB-04 — Interoperability | WHATWG HTML/DOM; W3C CSS Grid/Flexbox and CSP; IETF RFC 8259 JSON, RFC 3986 URI, RFC 9110 HTTP and RFC 9111 caching; [JSON Schema 2020-12](https://json-schema.org/draft/2020-12). Version portable schemas; validate semantic constraints as well as syntax. Schema validation cannot replace authorisation. |
| STD-PB-05 — Internationalisation | Unicode/UTF-8, BCP 47 (RFC 5646/4647), Unicode bidi and CLDR/LDML, W3C i18n guidance and ITS 2.0 where useful. Preserve language/direction, translatable fields, locale-aware values and responsive RTL layouts. |
| STD-PB-06 — SEO/performance | Schema.org, W3C JSON-LD 1.1, RFC 9309 robots, RFC 6596 canonical links and Sitemaps protocol. [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) industry targets: LCP <=2.5 s, INP <=200 ms, CLS <=0.1 at the 75th percentile, mobile and desktop separately. Measure representative pages; isolate contributor costs, use bounded queries, optimised media and lazy loading. No blanket performance guarantee for arbitrary deployments. |
| STD-PB-07 — Engineering | ISO/IEC 25010:2023, ISO/IEC 27001:2022 and 27002 guidance, NIST SP 800-218 SSDF, SemVer 2.0.0, SPDX/ISO/IEC 5962. [Liquid](https://shopify.github.io/liquid/) is an industry language, not a formal ISO/W3C standard; the Template Engine compatibility profile specifies supported syntax, types, escaping, limits and rejection semantics. |

Formal standards, industry guidance and deployment-specific legal duties are distinct. Automated checks support, but do not prove, ATAG/WCAG conformance. Block structurally unsafe output, provide actionable diagnostics and use manual review where judgement is required. Record applicable versions, exceptions, coverage and evidence. No certification or implementation compliance is claimed.

## 6. GUI and application composition

The host adds a Page Builder entry to its Capabilities sidebar and admin dashboard, following the Theme Manager pattern. Representative entry: `/page-builder` (host may remount). Page Builder supplies screens and optional navigation icon; host retains shell, routes, branding and trusted context. Navigation visibility is not access control.

**Reference:** [application-test-template README](https://github.com/nuxt-layers-test/application-test-template/blob/master/README.md) (blob 9f7c3c72d71589b4fc81fa28f784f796c8918913), [app/app.vue](https://github.com/nuxt-layers-test/application-test-template/blob/master/app/app.vue) (67ad085db71118cdf88616b2e843411b1903ab97), [app/pages/admin.vue](https://github.com/nuxt-layers-test/application-test-template/blob/master/app/pages/admin.vue) (69a042d4296c1eae834f4387b0d94b4dd5f6f054), [nuxt.config.ts](https://github.com/nuxt-layers-test/application-test-template/blob/master/nuxt.config.ts) (ab80ccd33c7ad216c6ba30043f230a4afefe16a2), inspected 24 November 2026. Existing homepage /, admin /admin, collapsible sidebar, Theme Manager /theme-manager link/card, shared Appearance and branding, mobile overlay. Local test mode has unauthenticated management endpoints and placeholder authentication; never deploy it publicly.

The visual editor uses three panels: searchable palette/patterns and outline on the left, selectable responsive canvas centrally, properties/layout/tokens/data/expressions on the right. Toolbar: save, undo/redo, viewport preview, validation and permitted Publisher controls. Status area reports actual save/revision, conflict/unknown and diagnostics. Provide keyboard add/move/reorder/delete and structured property editing as first-class alternatives to drag/drop. Preserve focus, announcements, accessible names, reduced motion and DOM order. Use semantic tokens in light, dark and high-contrast modes, respect operating-system preferences, own a localisable presentation message catalogue with host overrides, and verify the normative presentation checklist. On small screens use drawers or sequential views; preview is separate from editor controls.

| Screen or panel | Purpose |
|---|---|
| Dashboard | Pages, Templates, Sections, Components, Page Quality and Settings; authorised derived summaries |
| Page management | Search/filter/create/edit; Publisher title, address, language, revision and status |
| Visual editor | Registered blocks, responsive layout, token selection, content and local undo/redo; Publisher saves |
| Preview | Revision-pinned desktop/tablet/mobile, static/dynamic and authorised sample data |
| Templates/sections | Browse, create, preview, copy or explicitly pin versions; Publisher documents |
| Component catalogue | Registered versions, properties, constraints and compatibility; no executable plugin uploads |
| Data binding inspector | Approved source projections, types, scope and missing-value diagnostics |
| Liquid workspace | Syntax highlighting, approved variable/filter help, validation and safe sample preview |
| Page quality | Accessibility, structural, reference, binding and compatibility checks; focus affected node, repair and manual-review guidance |
| Publication/history | Publisher save, approvals, schedule, publish, withdraw, restore and conflict status |
| Import/export | Portable definitions, explicit mapping, validation and preview; Publisher saves approved import |
| Navigation (approved PB-29–37) | Menu list/editor, nested manual and dynamic items, properties, discovery rules, preview, validation and Publisher lifecycle; dashboard Navigation card |
| Settings | Permitted Configuration values only |
| Operational reporting (optional) | Authorised quality/compatibility/performance views from Reporting |

All except operational reporting are initial-release functions, including navigation; contextual panels may combine functions without separate routes. Reuse UI and Content Editor/Rich Text controls. Link or embed public authorised panels for Theme Manager, Media, Publisher, SEO, Localisation, IAM/User, Audit, Logging/Observability and Reporting. Do not duplicate their administration, stores or engines. Safe sample data must not disclose drafts or protected source values.

## 7. Release and acceptance

Initial release: native structured composition, responsive primitives, registry, Theme Manager and Publisher integration, accessible visual editing/preview, reusable sections/patterns, portable import/export, reusable manual/hybrid/dynamic menus and restricted Liquid expressions. Defer live collaboration, advanced animation, component/template marketplaces, external website import, AI generation, broader Liquid compatibility and additional deployment integrations.

Evaluate permissively licensed open-source libraries for security, accessibility, maintenance, bundle size and contract fit. Exact editor/rendering libraries and Liquid grammar/implementation, numerical execution/query budgets, detailed threat model, API signatures and applicable deployment-specific conformance evidence remain implementation work. No library selection or implementation asserted.

Use a future independent acceptance application, provisionally `nuxt-layers-test/page-builder-test`, derived from the inspected template; not provisioned here. Add host navigation/card, fixtures and public composition only. Provide an applicable minimal host/independent consumer, contract/unit/integration/security/compatibility tests and CI smoke tests. Acceptance must demonstrate:

- Independent authoring and delivery without editor bundle; host integration budget and supported Nuxt contribution precedence/disablement, duplicate registration and acyclic dependencies.
- Publisher save, version, conflict, approval, publication, withdrawal and restoration; reusable versions, theme changes and incompatible blocks.
- Portable import/export, safe Liquid limits, denied bindings, source outage/unknown results, tenant isolation, preview cache/indexing isolation and mandatory evidence failure behaviour.
- Keyboard and screen-reader authoring, mobile layout, RTL, accessible defaults, manual/automatic quality checks and representative Core Web Vitals.
- Correct source-owned outcomes, sanitised diagnostics and independently qualified audit/report results.

CI or authorised local platform executes tests. No tests run or acceptance evidence claimed during this conceptual review.

## 8. Approved decision coverage

PB-01 ownership; PB-02 structured composition; PB-03 responsive layout; PB-04 theme authority; PB-05 optional editor; PB-06 Liquid; PB-07 publication/delivery; PB-08 security/quality; PB-09 public surfaces; PB-10 release strategy; PB-11 versioned schemas; PB-12 separated interfaces; PB-13 typed bindings; PB-14 Publisher persistence; PB-15 safe diagnostics; PB-16 portable definitions; PB-17 error normalisation; PB-18 logging; PB-19 audit; PB-20 reporting; PB-21 independent outcomes; PB-22 dashboard; PB-23 accessible three-panel editor; PB-24 screens; PB-25 expression/binding editors; PB-26 reciprocal presentation; PB-27 separated delivery; PB-28 independent acceptance host. STD-PB-01–07 are incorporated in section 5. PB-01–28 and STD-PB-01–07 are owner-approved. PB-29 Menu Builder boundary; PB-30 manual/automatic/hybrid; PB-31 optional Metadata/source discovery; PB-32 Publisher persistence; PB-33 reusable nested localised menus; PB-34 source addresses/visibility/permissions; PB-35 accessible editing/rendering; PB-36 host administrative navigation; PB-37 bounded resolution/cache/invalidation are owner-approved. Acceptance includes manual/hybrid/dynamic menus, taxonomy/source changes, denied target non-disclosure, cycles, broken links, deterministic ordering, locale, keyboard/mobile navigation and source outage. This index preserves decision identifiers without competing specifications.
