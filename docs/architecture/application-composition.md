# Application composition — architectural specification

**Classification:** Architecture (CLS-12, approved 24 November 2026). This is the shared conceptual assembly specification, not a separately installed application, navigation service or domain owner. Existing reciprocal approvals retain their scope; implementation and governing adoption are separate.

## Purpose and ownership

A host explicitly selects reusable capabilities, services, libraries, adapters and optional presentation to form an application or suite. The host owns assembly, routes, branding, navigation, trusted context, deployment choices and authorised feature selection. Source owners retain authoritative state, policy decisions, transactions and outboxes. Prefer a modular monolith, provider-neutral public ports and independently usable headless cores.

## Composition contract and lifecycle

| Input | Host responsibility / output |
|---|---|
| Selected artefact identities, versions, documented public contracts and required/optional ports | Validate compatibility, declared directed dependencies and combined acyclicity; reject missing mandatory providers |
| Trusted installation, tenant, caller, assurance, configuration and locale/theme context | Supply bounded context to each public surface; absence or denial fails closed for protected operations |
| Optional screen descriptors, approved route declarations and feature availability | Assemble explicit navigation and accessible shell; no automatic exposure or entitlement inference |
| Provider connections and qualified readiness | Initialise selected artefacts through documented composition operations; distinguish configured, operational, enabled and authorised |
| Source results and partial failures | Present source-qualified outcomes, uncertainty and owner-routed recovery; never invent business success |

Select → validate → supply ports → initialise → mount optional presentation → verify complete journeys → operate/reconcile → withdraw or upgrade. Apply accepted ADR-0012's 50-line Nuxt integration budget and ADR-0016's acyclic public dependencies. The proposed Composition Standard and ADR-0019 remain subject to governing adoption. No hidden wiring, private-schema access, generic navigation registry or global authorisation flag.

## Conceptual acceptance

Verify independently usable public contracts; required-provider refusal and optional-provider absence; tenant switching, revocation and denied deep links; no duplicate routes or reverse dependencies; accessible and localisable journeys; explicit partial/unknown outcomes and recovery; headless use without GUI. Report actual integration cost and evidence rather than claiming implementation readiness.

## Approved and proposed reciprocal assembly requirements

**[Page Builder](../presentation/page-builder/presentation-record.md) reciprocal interface:** PB-01–28 and STD-PB-01–07 approved: Page Builder supplies optional dashboard/editor/preview and separate production renderer; host supplies routes/sidebar, trusted site/caller, component registrations, public Publisher/Theme Manager/UI/Template Engine and applicable policy ports through one documented composition operation within budget. Host adds the representative /page-builder sidebar link and admin dashboard card, following the inspected application-test-template. A future page-builder-test consumer proves independent authoring and delivery; local test mode is not for production. Host owns shell and delivery; authoring is separately authorised and excluded from public runtime bundles. Use ATAG/WCAG and measurable performance targets; no new business state or generic navigation API.

**Navigation extension (PB-29–37 approved):** Page Builder may compose reusable public/site navigation from Publisher-owned menu definitions, optional Metadata discovery and approved host routes. The host retains administrative/capability navigation, route registration and shell placement; no automatic exposure of installed or privileged routes, and no permission granted by menu visibility.

## Cross-capability note — Capability dashboard navigation (15 November 2026)

**Status: Proposed composition relationship, not a completed Application Compositions capability or generic navigation API.** The shared `nuxt-layers-test/application-test-template` uses an application-owned sidebar Capabilities entry and host-owned dashboard cards to open Theme Manager in its shared shell. **Proposed for [Audit](../capabilities/audit/capability-record.md#presentation-and-application-navigation-concept-15-november-2026):** a host may add an Audit sidebar link and dashboard entry when it selects Audit's optional presentation, while the Audit headless core remains independently usable and the host retains route placement, branding and trusted user/tenant context. Visibility is not a substitute for server-side Authorisation. Audience-specific Audit screens must not mingle tenant review with privileged platform operations. No automatic discovery/menu registry, cross-capability UI dependency or changes to the shared test template are implied. Application Compositions is an architectural specification (CLS-12); the historical review status does not imply a separate runtime artefact.


## Cross-capability note — Tenancy, policy and commercial onboarding (16 November 2026)

**Status:** ORG-01–ORG-08 owner-approved, TEN/COM/OWN and policy details proposed; no implementation assertion.

Host owns onboarding navigation, service-selection checkbox/tier GUI, paywall, context selector and orchestration across source capabilities. Installation is not itself a tenant; operator business tenant separately pays/receives platform transactions.

References: tenancy (former proposal: organisational tenancy and governance), commercial onboarding (former proposal: commercial onboarding and entitlements), policy (former proposal: policy and governance boundaries), recovery (former review: organisational ownership and recovery). Conceptual relationship, not mandatory package dependency.


## Classification reconciliation — Reusable organisational administration presentation (17 November 2026)

**Transferred from the legacy Company Console candidate, preserving its earlier conceptual requirements:** An authorised, shared-shell organisational context selector and dashboard may present tenant/group governance and owners, invitations, subscriptions and tariff tiers, licensed seats, purchased quotas and usage, approved policy documents and pending decisions, permitted reports, and owned business capabilities. These screens use the affected capability's documented public contracts. They do not store transactional/domain data, create a second hierarchy, derive owner standing from a menu label or grant resource access merely because a route is visible.

**Classification direction:** Generic host/application composition and optional capability-specific presentation are preferred to a company-only business-state service. Host owns sidebar/navigation, audience/context resolution, route placement, branding and capability assembly; Identity/Authorisation retain identity/governance/access decisions, commercial domains retain subscription/billing/usage, Publisher governs policy documents. Reuse `ui`, Theme Manager and optional presentations, respecting ADR-0009, ADR-0012 and ADR-0016. A separate reusable organisational administration *presentation kit* would require independent reuse/ownership evidence and must not gain authoritative persistence. This preserves Company Console intent without deciding to rename or create a runtime layer.

**GUI acceptance:** A person can choose among independently authorised organisation/tenant contexts; a permitted administrator sees relevant owner and service management pages, a limited member sees only their authorised activities, and a platform operator does not automatically see private child-tenant data. Host navigation controls are not server-side permission checks. The eventual interface must be accessible, localisable and work through the application test template's sidebar/dashboard approach.


## Reciprocal conceptual note — Help review (18 November 2026)

**Status:** Proposed in [Help draft PR #72](https://github.com/nuxt-layers/architecture-blueprint-review/pull/72); not approved, implemented or an amendment to published `CONTRACT.md`. See [Help conceptual contract](../presentation/help/presentation-record.md).

The host may expose an accessible Help sidebar/dashboard link and optional context-sensitive Help controls on documented fields/actions/errors, supplying trusted site/caller, installed version, locale and screen context. Help UI must not discover private domain internals, grant feature rights or displace current workflows. Routes/branding and enablement stay with the host; Help content remains Publisher's, and Help mapping is a proposed optional specialised responsibility.


## Reciprocal conceptual note — Organisation Console (22 November 2026)

**Status:** Owner-approved conceptual presentation/host boundaries (22 November 2026), documented in [draft PR #114](https://github.com/nuxt-layers/architecture-blueprint-review/pull/114); not a published runtime contract. [Organisation Console conceptual record](../presentation/organisation-console/presentation-record.md) defines an optional, authority-free organisational overview, contextual navigation and owner-routed action presentation. Application composition retains sidebar, route placement, trusted context switching, branding and capability assembly. Domain contracts retain all data and decisions. **Approved public interaction direction:** the host provides trusted context, route/navigation ownership, available owner adapters and locale/theme integration; Organisation Console returns optional section/dashboard descriptors, context-switch intent, owner-directed commands and source-preserving results. No new host-owned business API or authoritative event stream is introduced. **OC-01 approved 22 November 2026:** composition-first classification; a separately packaged presentation kit is deferred pending independent cross-host evidence; there is no automatic menu registry, business-state service or required Nuxt inheritance. Ensure stale responses never cross tenant switches and server-side permission checks remain source-owned. **Approved standards alignment (22 November 2026):** the host must validate the complete composed dashboard and navigation journey against the governing WCAG 2.2 AA, i18n and ASVS baselines; source capabilities retain domain security and privacy decisions. Apply UK public-sector accessibility obligations when the deployed service is in scope; other international/ISO/NCSC references are design guidance, not automatic certification. See the [Organisation Console standards mapping](../presentation/organisation-console/presentation-record.md#applicable-standards-and-design-evidence). **Test-host evidence and GUI composition (22 November 2026):** Verified `nuxt-layers-test/application-test-template` `master` provides homepage `/`, `/admin` dashboard card, shared sidebar `Capabilities → Theme Manager` link, mobile/collapsible sidebar and Theme Manager-backed top-bar Appearance menu. The proposed Organisation Console is a host-owned sibling link and optional dashboard card with illustrative `/organisation-console` route, consuming the console's public presentation descriptors and owner-contract read/action surfaces. The template deliberately shows `Not signed in` and uses unauthenticated local Theme Manager test mode: protected organisation management requires separate authenticated IAM fixtures/host composition; the template must not be deployed publicly. Host retains navigation, route and branding; source domains enforce permissions, step-up and business outcomes. See [detailed screen concept](../presentation/organisation-console/presentation-record.md#verified-representative-host-integration-and-screen-architecture-22-november-2026). **Approved OSS selection (22 November 2026):** prefer existing host `ui` and Theme Manager contracts before adopting MIT-licensed Nuxt UI v4 or Reka UI primitives; optional MIT/Apache-2.0 table, query, form and chart libraries must remain presentation-only with source-owned data. Avoid installing two competing component systems or creating an independent console package. Full list and licence checks: [Organisation Console open-source selection](../presentation/organisation-console/presentation-record.md#open-source-library-selection-and-reuse).

## Process optional GUI — approved reciprocal composition (22 November 2026)

**Status:** Process-side conceptual GUI approved in [draft PR #121](https://github.com/nuxt-layers/architecture-blueprint-review/pull/121), not proof of an installed package, published screen API or independent approval of this adjacent capability. See [Process GUI and headless presentation](../capabilities/process/capability-record.md#optional-gui-and-headless-presentation--owner-approved-conceptual-design). Process's owner-approved optional management UI fits the verified `nuxt-layers-test/application-test-template` pattern: derived hosts add a Process link under the collapsible **Capabilities** sidebar and optionally a Process card on `/admin`, routing into a themed `/process` dashboard within the shared shell. Host controls navigation, authentication, branding and route mounting; Process supplies optional public contract-backed screens; neither sidebar presence nor the template's unauthenticated Theme Manager test mode grants Process access. The illustrative route is not an actual published endpoint or universal auto-registration API. No implementation repository or shared template edits are authorised by this note.

## Reciprocal Shop host/presentation composition — 23 November 2026

**Status: Shop SHOP-01–05 approved; GUI recommendations documented in [Shop draft PR #134](https://github.com/nuxt-layers/architecture-blueprint-review/pull/134), not yet independently approved as installed routes or shipped screen exports.** [Shop application composition record](../compositions/shop/compositions-record.md#5-gui-and-representative-application-test-host) uses the verified `nuxt-layers-test/application-test-template` pattern: homepage `/` has no administration sidebar; existing `/admin` dashboard and `Capabilities → Theme Manager` sidebar provide a shared-shell precedent. A derived host may add sibling **Capabilities → Shop** and optional overview card. **Recommend protected `/admin/shop`** for management and separate **`/shop`** for the public storefront to avoid an audience/route collision; these paths are illustrative, host-selected and never automatic. Dashboard sections are Overview, Storefront, Commerce/Product/Pricing/Basket/Order, optional Sellers, Insights and Settings. Shop assembles presentation and source-qualified results using independent Product, Pricing, Shopping Basket, Order, Marketplace, Reporting and other owner public contracts. Host owns routes, sidebar, branding, trusted context, installed ports and authentication; source owners enforce permissions and business decisions. The template is local-only, deliberately `Not signed in`, with unauthenticated Theme Manager test mode **unsuitable for public Shop protection**. Theme Manager's currently published host contract itself flags an ADR-0012 integration gap; do not infer Shop implementation acceptance. Require WCAG 2.2 AA, responsive keyboard/mobile UX, localised disclosures, explicit unknown/partial checkout and server protection. Headless and single-seller operation remain available; no Shop data-owning service is created.

## Subscription dashboard navigation — reciprocal conceptual integration (23 November 2026)

**Status:** Owner-approved Subscription GUI design (23 November 2026) documented in [draft PR #137](https://github.com/nuxt-layers/architecture-blueprint-review/pull/137); not an implemented route or independently approved Application Compositions interface. Following the [application-test-template](https://github.com/nuxt-layers-test/application-test-template) shared local shell, a derived host adds an accessible **Subscriptions** entry to its collapsible **Capabilities** sidebar and optionally an admin dashboard card linking to a host-chosen Subscription dashboard route (illustratively `/subscriptions`). Theme Manager already illustrates the navigation pattern at `/theme-manager`; this is not a permission or composition contract copied from Theme Manager.

The host retains navigation, layout, trusted context, route selection and single-operation documented integration; Subscription retains its headless agreement/entitlement state and optional subscriber/administrator/exception screens, consuming only public contracts. Conditional tenant-commercial and operator links require distinct server-side permissions/assurance; public subscription enrolment and cancellation may appear in customer-facing host journeys, not necessarily the admin sidebar. No central menu registry, duplicate subscription records, required route strings or test-template edits are implied. See [Subscription presentation specification](../capabilities/subscription/capability-record.md#presentation-and-host-integration).

## Shared conceptual interoperability and usage evidence (FAC-06, FAC-11)

These semantic requirements reconcile the existing public contracts; they do not introduce a universal request type, an implementation SDK or a new service. Accepted ADR-0012 public shapes take priority; implementation-specific schemas belong in each owner's independently published contract.

| Semantic concern | Required interoperability |
|---|---|
| Caller, authority and scope | Host-supplied trusted caller and current resource-aware access decision; distinguish initiating actor, executing service, delegation, assurance and recency; preserve tenant/group/resource scope; never trust client-supplied authority |
| Identity and reference | Opaque owner-issued ID, owner/contract identity, type where necessary, scope, source revision and permitted disclosure; Party, Identity and Profile identities are not interchangeable |
| Money and quantities | Exact decimal representation, explicit currency/unit, scale and rounding rule/version; never infer unit conversion or financial recognition from quantity or payment status |
| Time | Distinguish instant, local date, zone, effective interval, observation and recording time; Clock interprets temporal semantics; use explicit interval boundary conventions and ambiguous/non-existent local time handling |
| Commands and outcomes | Stable operation/idempotency reference, expected revision and request digest where consequential; distinguish accepted, rejected, pending, committed, partial and unknown; reconcile original operation before retry; transport receipts never prove source commit |
| Events and evidence | Source-owned event ID/type/version, source scope/revision, effective/recorded time, correlation/causation and minimised evidence; source transaction and outbox atomic where durable mutation requires an event; transport custody and consumer effect independently acknowledged |
| Errors | Source-qualified error code/category, safe message and explicit outcome certainty; Error Normalisation provides advisory projection only; no automatic retry or rollback |
| Provenance and disclosure | Source authority, observation/validity, completeness, policy/effective version, purpose and audience; redact independently, propagate stale/unknown; no evidence or rights transfer by reference alone |

### FAC-06 — Consumption evidence

Resource owners (including Storage, Inventory, Warehouse, Booking, Logistics and other metered services where applicable) own actual measurement, its quality and corrections. Subscription owns contractual allowance/seat allocation; Billing owns rating and assessed charges; Reporting owns derived analytical views. No central Usage capability or duplicated metering ledger.

| Logical field | Semantics |
|---|---|
| Source owner, resource and measurement ID | Stable scoped identity, no inferred customer or party |
| Metric/definition version, quantity and unit | Exact quantity; distinguish cumulative counter, delta, duration and snapshot; declared conversion/rounding and reset semantics |
| Period and timestamps | Explicit effective interval (prefer start-inclusive/end-exclusive), zone where required, observed/recorded instant |
| Scope and attribution | Trusted tenant, eligible resource, attributable beneficiary/allocation reference and authorised purpose |
| Quality and lineage | Measurement source, revision, evidence, coverage, provisional/confirmed/unknown status; supersedes or corrects exact prior revision |
| Receipt and correction | Consumer acknowledges exact evidence revision as accepted/held/rejected/unknown; no implied charge or entitlement; reconcile duplicates, late arrival, resets, corrections and missing coverage |

Resource owner validates measurement and applies its own atomic capacity control where required. Subscription supplies allowance and allocation policy/revision; a measurement is not a capacity reservation. Billing validates applicability, rating period and duplicate evidence, then owns charge adjustment; Reporting exposes qualified completeness and freshness. Never silently turn missing usage into zero. Avoid personal activity detail unless separately justified. No common physical meter store is mandated.

Acceptance: duplicate delivery does not double charge, late correction changes only the appropriate subsequent owner revision, incompatible units are rejected, counter reset is explicit, missing coverage is unknown, stale allowance does not authorise allocation, tenant switching cannot expose another tenant's usage, and each consumer independently qualifies its receipt. These are conceptual acceptance requirements, not verified implementation conformance.

### Interface reconciliation cases

| Exchange | Producer truth | Consumer decision / boundary |
|---|---|---|
| Party → Order/Invoice/Employment | Qualified scoped party snapshot and evidence | Domain role, immutable transaction snapshot or engagement, independently authorised |
| Employment/Time & Attendance → Payroll | Terms, leave, exact approved actual-time revision | Pay calculation and correction; never automatic entitlement from shift |
| Workforce Scheduling → Time & Attendance | Planned shift and revision | Actual presence/work evidence independently qualified |
| Order → Billing → Invoice → Accounting | Commitment, charge, issued document, respectively | Independently accepted owner outcome; no implied ledger recognition |
| Payment Gateway → Checkout/Accounting | Provider execution evidence | Checkout coordination / Accounting settlement recognition |
| Source outbox → Message Queue → consumer | Committed event, transport custody | Independent effect/deduplication; no business completion from delivery |
| Attendance → Training → Qualification → Credentials | Presence, learning finding, formal award | Independent specialist decision and issuance; no automatic award/revocation |
| Content Security → Moderation → source owner | Assessment evidence, case finding | Source enforcement; no independent publication authority |
| Workflow → requesting owner | Qualified approval outcome tied to revision | Source owner validates current authority and commits; no emergency bypass |
| Legal Compliance/Privacy → source owners | Qualified duties, constraints, rights/hold instructions | Owner applies disposition and returns qualified receipt; unknown is not global completion |

The table establishes semantic compatibility requirements for these high-risk exchanges, not proof that every consumer's eventual TypeScript/API schema is compatible. Validate all declared contract versions and required inputs at implementation acceptance, using the discovery graph and independent consumer fixtures.
