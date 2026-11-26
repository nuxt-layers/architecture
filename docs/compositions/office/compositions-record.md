# Office — Organisational Archetype and Application Composition

**Status:** **Conceptual design complete and owner-approved** on 22 November 2026 (OFF-01–OFF-05 and subsequent contract, standards, library, reciprocal-interface and GUI recommendations). This is not an implemented capability, published Office API, verified integration or permission to merge.  
**Classification:** Organisational **archetype and optional host composition**, not an independent data-owning capability, stateless library or mandatory Nuxt layer. Retain the catalogue name and this conceptual directory.  
**Evidence:** No `nuxt-layers/office` implementation repository or published root `CONTRACT.md` was verified. Relevant actual source interfaces must be taken from each owner's published root `CONTRACT.md`. Office draft PR #112; review protocol (former document: review protocol).  
**Opening baselines:** `architecture-rules/master` `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; `architecture-blueprint-review/master` `361566988ac53c55f6135e8acfa46cd5b013d7a0`. Governing [Capability Standard](../../standards/capability-standard.md) and accepted ADR-0003, -0009, -0012, -0016, -0017 and -0018 take precedence.

## Purpose, scope and authority

An **office** is an authorised view of an organisational group and its work, optionally associated with one or more physical places and operational spaces. It may be **remote, physical, shared or entirely logical**. Organisational identity, geographical place, operational room, asset custody, legal premises rights and employment are separate concepts; never infer one from another.

A host configures an `office` archetype, selects permitted modules and presents a joined-up dashboard and links to source-owned work. Office **owns no** authoritative group/member register, premises register, asset, room, reservation, personnel file, permission engine, business lifecycle, durable business event or outbox. It makes no ownership/tenancy, legal-use, health-and-safety or employment assertion. A new genuinely independent workplace/lease domain would need a separate ownership review; it is not justified by the word *office*.

**Owners:** Identity owns tenants, groups, hierarchy and memberships; Authentication/Authorisation own caller assurance and permissions; Configuration owns effective approved settings and their revisions, while the host owns composition and navigation; Location owns place references; Facility owns operational premises, spaces, layouts and restrictions; Asset owns equipment and custody; Booking owns reservations; Employment, Project, Task and Publisher own their respective records. Privacy/Legal Compliance govern disclosure and duties; Logging, Audit, Observability and Reporting each own their distinct records and output, not office facts.

The host's Office preset has a **configuration lifecycle**, not a new business-record lifecycle: propose → validate → approve where required → become effective → revise/withdraw. A disabled preset removes its navigation and presentation but does **not** delete or revoke the underlying group, membership, asset, booking, legal record or evidence. Reassignment of group/place references checks authorisation, current version and dependent links.

## Approved conceptual public contract

**Contract status:** The following are **semantic host-composition inputs and outputs**, not exported Office functions, DTOs, URLs or an implemented root `CONTRACT.md`. There is no mandated universal request object or Office-only service. Implementation must align with each current source owner's published contract.

### Inputs and validation

| Input and owner | Accepted facts or request | Required and failure rule |
|---|---|---|
| **Host / Configuration** | Validated `office` archetype/schema version, label, group/place references, module selection, visibility, display defaults and effective revision | **Essential** for an active preset; reject unknown modules, incompatible revisions and unauthorised changes; pending approval is not activation |
| **Identity** | Trusted tenant and group reference, membership/standing, status and revision | **Essential** for group-backed views; absent, revoked or closed group cannot be replaced with a fabricated office group |
| **Authentication / Authorisation** | Trusted current caller, assurance and fresh permission decisions for source reads/actions | **Essential** for protected functions; deny, stale or unknown fails closed |
| **Location / Facility** | Optional qualified place and geometry; conditional site/room/layout and current operational restrictions | **Optional / conditional**; unknown or stale access/safety never becomes 'safe' or 'open'; remote offices need no physical place |
| **Asset / Booking / Employment / Project / Task / Publisher and other selected owners** | Authorised source resource IDs, status, revision, source-qualified summaries and operations | **Conditional** on enabled modules; absent data is explicitly empty/unavailable, not guessed |
| **Privacy / Legal Compliance / Profile; Clock / Localisation / Theme Manager** | Applicable purpose/retention/disclosure policy and approved presentation semantics | **As applicable**; unresolved mandatory constraints prevent unsafe disclosure/action, not harmless navigation |
| **Integrations / Search / Workflow / Notifications** | Optional provider-qualified data, search, approval or delivery state through source-owned contracts | **Optional**; unavailable integration does not overwrite native authority |
| **Error Normalisation** | Safe, stateless error interpretation using source-owned codes/catalogues and approved disclosure rules | Optional utility; never provides commit status, permission, automatic retry or evidence |

All protected source commands validate actor, tenant, target, assurance, status/version and legal/operational constraints. Idempotency applies to mutations; a timeout or external callback cannot prove completion or authorise a retry.

### Outputs and consumers

| Conceptual output | Consumer and permitted meaning |
|---|---|
| **`OfficeContext`** | Host and authorised presentation modules: selected group/tenant, display label, optional place and enabled modules, effective configuration version. **Derived context only**, not group or property authority |
| **`OfficeDashboardView`** | Host/UI: permission-filtered cards, source-qualified counts, links, freshness, completeness and unknown/partial/unavailable states; source owners retain their records |
| **`AvailableOfficeActions`** | UI: owner/action/target references for possible actions. An enabled control **does not grant access**; source reauthorises on execution |
| **`OfficeConfigurationResult`** | Host administrators: Configuration's accepted, pending, effective, rejected or conflicting version and provenance; accepted request is not completed change |
| **Source-owned operation result** | UI/host: actual Asset, Booking, Identity, Task, Facility or other owner outcome, with qualified pending/committed/failed/uncertain state and correlation |
| **Diagnostics, evidence and reporting references** | Logging/Audit/Reporting via appropriate source or host ports; Office does not create their records or own analytics datasets |

**Queries:** resolve an authorised context, read source projections and report provenance, effective time, revision and missing data. **Commands:** host/Configuration edits its preset; business actions are submitted to their **owning capability's** protected command. **Events:** Office has **no** `OfficeCreated`, `OfficeMemberAdded` or business outbox. Committed Configuration/domain changes use each owner's event/outbox and replay-safe subscribers; menu selection is not an event.

**Shared guarantees:** owner references remain opaque; source time/revision and uncertainty are preserved; confidentiality, tenant isolation, purpose, consent/retention where applicable, and current permissions apply to direct reads, links, counts and exports. No cross-tenant inference or bulk 'all Office data' bypass. An uncertain source result is never relabelled as complete.

## Cooperating capabilities — reciprocal input/output

The host calls source owners through **public interfaces**. Sources do **not** import Office, and Office does not supply their authoritative facts.

| Cooperating service | Office receives | Office supplies back | Need |
|---|---|---|---|
| **Identity** | Tenant/group standing and membership projection | Selected group/tenant references and authorised lookup intent | Required for group-backed Office |
| **Authentication / Authorisation** | Trusted caller and per-resource decisions | Target, action, scope and trusted caller context | Required for protected work |
| **Configuration / host** | Approved preset/schema, modules and revision | Scoped setting proposals, version, approval and withdrawal intent | Required |
| **Location** | Qualified places, entrances, geometry and uncertainty | Selected place reference and permitted view intent | Optional |
| **Facility** | Rooms, layouts, effective closures and restrictions | Selected room/site and protected action request | Conditional for spaces |
| **Asset** | Equipment, assigned custody, status, revision | Source resource reference and assignment/query intent | Optional |
| **Booking** | Availability and reservation outcomes | Space/time/actor and booking request | Optional |
| **Employment / Project / Task** | Authorised worker, assignment and work summaries | Scoped resource references, filters and owner actions | Optional |
| **Publisher** | Documents, notices and publication status | Scoped document/navigation/publishing intent | Optional |
| **Privacy / Legal Compliance / Profile** | Applicable disclosure, processing and retention constraints | Purpose, audience, scope and requested use | Conditional |
| **Workflow / Notifications / Integrations / Search** | Optional approvals, delivery, provider or indexed results | Source-authorised process, query and connection context | Optional |
| **Error Normalisation** | Versioned safe code/category/message key, uncertainty and advisory retry classification | Source error, approved mapping/disclosure and trusted correlation | Optional pure library |
| **Logging** | Sanitised technical intake/health status and scoped diagnostics | Host panel/adapter faults, safe code, severity and correlation | Optional diagnostic |
| **Audit** | Evidence receipt, integrity/coverage and permitted history | Only genuine **host-owned** attributable administrative action facts; source owners submit their own actions | Risk-selected evidence |
| **Reporting** | Report catalogue, execution/result, source cut-off, freshness, completeness and export status | Authorised office/group filter, period and report intent; datasets come **directly from source owners** | Optional analytics |
| **Observability** | Permitted health and performance signals | Sanitised host latency/fault/correlation signals | Optional |
| **Clock / Localisation / Theme Manager** | Date/time, language/direction and semantic design vocabulary | Display preferences and context | Presentation |

**Error and evidence separation:** Error Normalisation is stateless and dispatches nothing. Logging accepts technical diagnostics, not business proof; a logging receipt is neither committed source state nor Audit evidence. Audit records significant attributable, source-proven decisions; Configuration and business owners submit their own evidence and committed events, while genuine host-owned preset administration may submit host evidence. Reporting independently controls definitions, derived reports and disclosure, fetching factual data from each owner rather than from Office cards. Report snapshots require fresh viewing/export authorisation, including small-group and revoked-access checks.

**Failure containment:** independent modules degrade separately; unknown, denied, empty, stale, pending and unavailable are different. Fail closed on access or mandatory legal/safety restrictions. Recover a timed-out mutation by querying the source owner's idempotent outcome before retrying. Ordinary Logging or Reporting outages do not falsify or undo domain state; any mandatory Audit capture requirements remain enforced by the relevant authoritative source.

**Reciprocal documentation:** [Identity](../../capabilities/identity/capability-record.md), [Configuration](../../capabilities/configuration/capability-record.md), [Location](../../capabilities/location/capability-record.md), [Facility](../../capabilities/facility/capability-record.md), [Asset](../../capabilities/asset/capability-record.md), [Logging](../../services/logging/services-record.md), [Audit](../../capabilities/audit/capability-record.md), [Reporting](../../capabilities/reporting/capability-record.md), and [Error Normalisation record](../../libraries/error-normalisation/stateless-library-record.md) / [proposed contract](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs). These conceptual relationships do not change a source owner's published runtime interface.

## Optional GUI, host integration and headless mode

**Verified reference (22 November 2026):** [`nuxt-layers-test/application-test-template`](../../../RESOURCES.md#ref-f1f7cc47) `master` provides a home page `/` without a sidebar, an administrative `/admin` test dashboard, a collapsible **Capabilities** sidebar, responsive mobile navigation, header Appearance menu and a deliberate `Not signed in` placeholder. `app/app.vue` contains **hard-coded navigation**, not a public capability-menu registry. The template composes Theme Manager only in **local, unauthenticated test mode**, never suitable for public deployment. [Theme Manager](../../../RESOURCES.md#ref-484ee610) currently provides `/theme-manager` library and edit pages, public semantic theme tokens and a logo; its root contract also documents unresolved ADR-0012 production host-integration gaps. Do not import private Theme Manager utilities or infer production IAM from its test fixture.

**Approved UI approach:** the **host**, not a new Office layer, adds a conditional, accessible **Capabilities → Office** sidebar item leading to an illustrative `/office` dashboard. The route is *proposed*, not published. The host checks enabled configuration/group context; **every route, panel and action also checks source permissions**, even if the sidebar link is hidden.

| Screen | User purpose | Responsibility |
|---|---|---|
| **Office dashboard / context selector** | Selected office and group, optional remote/physical/shared-place context; authorised people, work, rooms, assets, documents, tasks, alerts and reports as independent cards | **Host** composition using source read models |
| **People & roles / work** | Authorised membership, engagement, projects and tasks | **Identity / Employment / Project / Task** public screens or links |
| **Spaces & bookings** | Site/room status and restrictions, distinct from reservable availability | **Facility / Location / Booking** |
| **Assets & documents** | Assigned equipment, conditions, notices and documents | **Asset / Publisher** |
| **Settings** | Label, group/place references, module selection, default view, visibility, proposals and history | Host + **Configuration**; illustrative `/office/settings` only if warranted |
| **Reports & attributable activity** | Permitted derived reports and protected audit history | **Reporting / Audit**; Logging is not activity history |

Only the dashboard/context selector and composition settings need Office-specific **host presentation**. Use existing owning-capability routes/components and public contracts rather than duplicate business forms. Avoid creating one compulsory Office route for each card. A user with no permitted Office gets no sensitive summaries; multi-office switching affects only authorised presentation context, not Identity membership. A remote Office has no compulsory Location; shared buildings confer no cross-group permissions.

**UX and safety:** clearly distinguish no-data, denied, loading, offline, stale, partial and uncertain; show source and effective-time information. Load panels independently, use bounded queries/server-side pagination, avoid N+1 queries, invalidate permission-sensitive caches on membership/resource/config changes and reauthorise each action. Provide confirmation/unsaved-edit protection, pending versus effective configuration status and a clear 'remove Office view, retain source data' explanation. Respect WCAG 2.2 AA, semantic HTML, appropriate ARIA, keyboard/focus/mobile/reduced-motion access, Localisation/Clock semantics and Theme Manager's `fill`/`pen`/`edge` presentation vocabulary. Host chooses navigation/logo and retains storage responsibility; add no unregistered client persistence.

**Headless:** Office views and routes may be omitted entirely. Host/source contracts work without an Office-specific UI, store, provider credential, scheduled worker or outbox. If packaging is reconsidered later, first prove an independent responsibility and comply with ADR-0009/0012/0016 and the 50-line composition budget; do not create a package merely to ship a menu link.

## Standards and compliance guidance

Normative platform rules govern first. External standards guide the **host or owning capability**; citing them does not prove conformity, certification or legal applicability.

| Standard / body | Application |
|---|---|
| **[W3C WCAG 2.2 AA](../../../RESOURCES.md#ref-0d1f555e)**, [WAI-ARIA 1.2](../../../RESOURCES.md#ref-67eee3fb), [W3C i18n](../../../RESOURCES.md#ref-7ea69d75)/BCP 47 | Accessible navigation, forms, dynamic dashboard states, language and direction; use semantic HTML first |
| **[OWASP ASVS 5](../../../RESOURCES.md#ref-a1c367d2)** L2 baseline (L3 for critical), **[ISO/IEC 27001:2022](../../../RESOURCES.md#ref-42fa42bb)** | Validate tenant isolation, source authorisation, secure defaults and diagnostic disclosure; IAM and source owners enforce |
| **[ISO/IEC 27701:2025](../../../RESOURCES.md#ref-b948c1e2)**; **UK GDPR**, Data Protection Act 2018 and [ICO privacy by design](../../../RESOURCES.md#ref-4ec87ed3) | Purpose limitation, minimisation, staff information controls, rights and retention through Privacy/Legal Compliance and source owners |
| **ISO 9241-210:2019, ISO/IEC 25010:2023, ISO/IEC/IEEE 42010:2022** | Human-centred navigation, reliability/performance/quality and explicit architecture/ownership interfaces |
| **Equality Act 2010; EN 301 549** where applicable; [UK NCSC secure design](../../../RESOURCES.md#ref-c1b4f35f) | Accessible ICT and secure operation; check current legal applicability and applicable standard edition rather than assuming harmonisation |
| **ISO 41001:2018 (2024 amendment), ISO 41011:2024, ISO 45001:2018** | Facility management and occupational-safety context **for Facility/qualified safety owners**, not Office safety certification |

## Fully open-source library strategy

**Select from complete, commercially permissive public source trees only.** No mandatory open-core, source-available-but-restricted, withheld enterprise module or provider SaaS dependency is acceptable for the Office baseline. These are **conceptual host options, not installed Office dependencies**; check exact versions, licences, transitive code/assets, security and Nuxt/Node/SSR compatibility before adoption.

| Repository | Licence | Scope and decision |
|---|---|---|
| [Vue](../../../RESOURCES.md#ref-cf2779ac), [Nuxt](../../../RESOURCES.md#ref-b554353a) | MIT | **Retain** existing frontend/host baseline |
| [Reka UI](../../../RESOURCES.md#ref-12355446) | MIT | Use only for missing accessible UI primitives beyond shared `ui` |
| [TanStack Query](../../../RESOURCES.md#ref-51cb5e45) | MIT | Consider only if Nuxt/native fetching cannot handle complex independent panels/caching |
| [TanStack Table](../../../RESOURCES.md#ref-af94a8b1) | MIT | Optional authorised complex tables |
| [Zod](../../../RESOURCES.md#ref-1e3efac4) | MIT | Conditional runtime schema validation; no duplicate Configuration authority |
| [VueUse](../../../RESOURCES.md#ref-9507482e), [vee-validate](../../../RESOURCES.md#ref-bd5a7590) | MIT | Optional reusable composition/form utilities |
| [Apache ECharts](../../../RESOURCES.md#ref-1aa1e4a8) | Apache-2.0 | Optional Reporting-owned charts with equivalent text/tabular information |
| [Lucide](../../../RESOURCES.md#ref-c5624441) | ISC | Reuse existing icon set, always with accessible names |
| [Vue I18n](../../../RESOURCES.md#ref-4941c780) | MIT | Consume through Localisation, not a parallel translation authority |

Keep relevant licence/NOTICE obligations (including Apache-2.0 patent and notice provisions), use reviewed stable pinned releases and CI dependency review. Do not introduce Redis, Neo4j, Elasticsearch or any new Office database, broker, index or cache service: existing host/domain infrastructure provides those functions where appropriate. Public source and licence were reviewed as conceptual candidates on 22 November 2026; no package integration or entire dependency tree is certified.

## Conceptual acceptance scenarios

| Scenario | Required behaviour |
|---|---|
| Host enables Office for a permitted group | Configured sidebar/dashboard reflects effective revision; Identity remains group authority |
| Remote office; multiple places; shared building | Place optional, multiple references permitted and tenants/groups remain isolated; no inferred occupancy rights |
| Missing/closed group or revoked membership | Protected reads/actions fail closed; menu/caches cannot leak labels, counts or resource details |
| Invalid settings revision, repeated submission or pending approval | Configuration rejects conflict, deduplicates as applicable or labels pending; no duplicate owner records |
| Facility restriction stale or zone closed | No inferred safe/available route; use source-qualified restricted/unknown state |
| Asset assignment/Booking reservation from Office | Owner alone validates and commits; Office shows source result rather than inventing completion |
| Source timeout or provider outage | Query idempotent source outcome before retry; unaffected cards remain usable and unavailable data is labelled |
| Logging/Reporting outage or uncertain Audit receipt | Distinct diagnostic, report and accountability semantics; comply with source evidence policy without changing business truth |
| Office deactivated or reassigned | Remove/update host view only; preserve source membership, assets, reservations, legal data and audit history |
| Report export, small-group analytics or saved snapshot after revocation | Fresh scope and disclosure checks; no leaked counts or stale exports |
| Replay or delayed owner event | Idempotent projection refresh; event alone never grants access |
| Local test host Office sidebar and Theme Manager appearance | Access dashboard, switch permitted Office, navigate owner screen, edit settings with appropriate IAM fixture; keyboard/mobile/i18n/theme and partial errors work. Never publicly deploy test mode |

These are **not executed tests**; CI/user acceptance must exercise them.

## Approved decisions, completion and remaining work

| Decision | Approved rule |
|---|---|
| **OFF-01** | Office is an archetype/host composition, not a separate data owner, service or mandatory package |
| **OFF-02** | Logical, remote, physical and shared Offices use separate group, place and operational-resource references without asserting legal/physical rights |
| **OFF-03** | Source-owner public contracts, versions, freshness, policy and uncertainty govern all facts and writes |
| **OFF-04** | Optional host-owned sidebar/dashboard; delegate business screens and actions to source owners |
| **OFF-05** | Versioned approved settings; deactivation preserves underlying source records, rights and evidence |

**Approved safeguards:** per-operation IAM and privacy checks; strict shared-premises isolation; Facility-owned safety restrictions; independent loading and truthful degraded states; scoped cache invalidation and source freshness; accessible, localised, themed and responsive presentation. The standards, fully open-source shortlist, Error Normalisation–Logging–Audit–Reporting separation and inspected GUI pattern are integrated design guidance.

**Conceptual conclusion:** **Complete** as an owner-approved, non-normative Office composition blueprint; there is no unresolved substantive Office classification or ownership decision. **Not implementation-ready by assertion:** actual host archetype/schema, production IAM and Theme Manager integration, source adapters/public contracts, CI checks, user acceptance, current legal applicability and security/accessibility evidence require implementation verification. There is no independently published Office root `CONTRACT.md`, released `OfficeContext` API or installed Office route. No new Office service, database, deployment or normative ADR is authorised.

**PR status:** draft #112, awaiting current-`master` governing/architecture/reciprocal/branch-policy/CI review and **explicit merge authorisation**. No implementation change or local tests were made for this conceptual review.
