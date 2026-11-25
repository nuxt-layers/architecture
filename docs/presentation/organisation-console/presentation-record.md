# Organisation Console — Presentation Record

**Artefact classification:** Presentation (CLS-10, approved 24 November 2026); existing governing responsibility labels and conditional future service proposals do not alter this blueprint placement.

**Catalogue name:** `organisation-console` · **Directory:** `docs/presentation/organisation-console/`.  
**Classification:** Reusable **presentation/application composition**, not an independently data-owning capability.  
**Decision:** **OC-01 approved, 22 November 2026:** compose from the host's existing `ui`, Theme Manager and domain-owned presentation. Do **not** create a separate package or Nuxt `extends` dependency without demonstrated cross-host reuse, an independent presentation contract and renewed approval.  
**Status:** **Conceptual design owner-approved** (name/purpose, classification, proposed public presentation responsibilities, cooperation, security, standards, OSS-selection principles and GUI). **Not implemented:** No separately published Organisation Console root `CONTRACT.md`, independent implementation or acceptance evidence verified. This blueprint is non-normative.  
**Authority:** [Capability Standard](../../capability-standard.md), [Presentation](../../presentation.md), [Security](../../security.md) and accepted ADR-0009, ADR-0012, ADR-0016, ADR-0017, ADR-0018. Baseline: governing `master` `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint `master` `361566988ac53c55f6135e8acfa46cd5b013d7a0`. The accepted hierarchy takes precedence over this record.

## Purpose and authority

Provide one accessible, role-aware organisational dashboard and authorised journeys for companies, charities, clubs, sole traders, councils and other supported organisation types. A person may manage multiple independent groups or tenants, but their information and authority must remain separate. `organisation-console` supersedes the narrower `company-console` label.

**Owns:** the presentation contract; optional section and action descriptors; arrangement of source-owned views; explanatory labels/message keys; navigation intentions; loading, partial, denied and error states; and disposable screen state (such as an open tab or filter).

**Does not own:** business records or decisions concerning tenants, groups, identities, governance owners, permissions, organisational archetypes, billing, subscriptions, payments, quotas, documents, compliance, tasks, audit evidence or reports. No authoritative business datastore, event stream, policy engine, report engine, provider connector, platform-operator console, or general workflow orchestrator is justified. The host owns routes, sidebar, application shell, branding, session integration and assembled capability availability. Domains own their operations, durable events/outboxes and evidence. A menu item is never an entitlement or permission grant.

**Critical distinctions:** installation ≠ tenant ≠ group ≠ real-world organisation ≠ payer; organisational parentage gives no implicit access; payment ≠ entitlement ≠ technical enablement ≠ authorisation; a published legal notice does not prove applicable compliance. Routine platform-operator authority is not permission to browse customer data.

## Native presentation lifecycle

1. The host supplies a trusted **candidate** organisation/tenant/group context and supported public adapters. Identity and Authorisation supply **permitted** context choices and access decisions; the console never derives them from a raw login or a client-provided identifier.
2. Selecting a context clears earlier scoped view models, forms, caches, cursors, action tokens and in-flight results. Late responses must not repaint the new context. Restored context is revalidated.
3. The console displays only configured and authorised sections using source-provenanced reads. Distinguish disabled, not enabled, not entitled, not authorised, unavailable, pending, restricted and unknown when the source can substantiate the distinction. Missing required rights fail closed; an unavailable optional section does not disable unrelated work.
4. A confirmed user action is forwarded **to the owning capability**, with the necessary trusted identity/scope, resource, revision, assurance, operation/correlation and idempotency references. The owning service reauthorises and determines the result; a client form or visual control cannot enforce a business rule.
5. Display the source's `accepted`, `pending`, `completed`, `rejected` or `unknown/uncertain` result, with safe recovery guidance and owner status lookup. Timeouts, duplicate requests and remote-provider ambiguity do not establish success or failure.

Presentation views may be `loading`, `available`, `empty`, `partial`, `denied` or `error`. This is **disposable UI state**, not a second business lifecycle. Host/console failure cannot roll back or complete an owner transaction.

## Idealised public contract — inputs

These are **approved conceptual information surfaces**, not deployed endpoints or exact exported signatures.

| Source (need) | Input to console | Validation/absence |
|---|---|---|
| **Host/Application Compositions** (essential) | Application/audience, trusted candidate context, installed capability adapters, navigation/shell choices, theme/locale and feature selection | Host owns assembly; absent adapter hides or links its section; no fabricated permissions |
| **Authentication, Identity, Authorisation/IAM Integration** (essential for protected views) | Verified session/assurance/recency, allowed tenant/group/resource contexts, current governance/recovery state and server-checked operations | Deny stale/absent rights; high-risk changes require fresh owner-side assurance and independent approval |
| **Organisation Model, Configuration** (conditional) | Versioned type/archetype, labels, features and permitted settings | Archetype does not grant membership, legal authority or entitlements; classification of Organisation Model remains independently under review |
| **Subscription, Pricing, Billing, Invoice, Payment Gateway and provisioning owners** (conditional) | Versioned plans/prices, payer, seats, entitlement, settlement, invoices, provisioning and grace/restriction status | Preserve separate source truths and provider uncertainty |
| **Storage and resource owners** (optional) | Quota policy, actual enforcement and measured use, with scope and as-of time | Measured use is not an admission or allocation decision |
| **Workflow, Task, Notifications** (optional) | Scoped pending approvals, tasks and notices | Source owns queue, delivery and state changes |
| **Publisher, Privacy, Legal Compliance** (conditional) | Approved documents, publication and separately qualified disclosure, retention, hold and jurisdiction restrictions | A document's publication is not legal certification or operative access policy |
| **Audit, Reporting** (optional) | Independently authorised evidence and report projections, freshness, coverage, export and review status | Partial/unavailable feeds remain labelled; the console never infers empty success |
| **Other domain screens** (optional) | Published permitted read models, actions and optional view descriptors | No private database/schema imports or undeclared business operations |

All source views carry the **applicable** tenant/resource scope, provenance, source version/revision, effective or observed time, completeness and disclosure qualifications. Do not mandate one universal request object; validate user-supplied context, resource IDs and form inputs as untrusted.

## Idealised public contract — outputs

| Recipient | Output and meaning |
|---|---|
| **Host and sidebar** | Optional landing/section descriptors, supported navigation intents, locale/message keys, presentation and availability information; the host alone places routes and menus |
| **Authorised user** | Context-labelled dashboard, permitted actions and read models showing source, freshness, incompleteness, denial or uncertainty |
| **Owning domain/API adapter** | **User intent**, not authoritative command completion: target, parameters, selected scope, expected revision, assurance and idempotency/correlation where needed; owner may reject or require approval |
| **User and host** | Source-preserving operation reference, accepted/pending/completed/rejected/unknown state, safe error/message key, recovery/status lookup and next permitted step |
| **Logging/Observability, Audit** (conditional) | Minimised technical diagnostics and separately accountable **console-originated** actions through trusted host/owner interfaces; domains produce evidence for their own business decisions |
| **Reporting/exports** (optional) | Authorised report, refresh, preview or export **requests** to the Reporting owner; not independent analytics, files or retention |

**Five presentation responsibilities:** (1) describe available sections, (2) render an authorised dashboard, (3) request a context change, (4) forward an action intent to its owner and (5) display the owner's result. Suggested labels `describeSections`, `renderDashboard`, `requestContextSelection`, `submitOwnerIntent`, `mapOwnerResult` are **illustrative**, not a published API.

There is **no console-owned authoritative business command/query API or committed business event**. Domain outbox consumers tolerate duplicates, late delivery and replay; a notification may prompt a scoped authorised refresh but cannot grant access. No exactly-once or implicit transaction guarantee is promised.

## Reciprocal information and ownership

Cooperation is at **public contracts through host composition**, not a mandatory package import or dependency cycle.

| Cooperating responsibility | Console receives | Console sends; retained owner |
|---|---|---|
| Host, `ui`, Theme Manager | Routes/shell, semantic tokens, responsive/accessibility primitives, locale | Dashboard/section descriptors and navigation intentions; host owns routes/appearance |
| Authentication, Identity, Authorisation | Caller, allowed contexts, governance/assurance/decisions | Scoped read, context-change and governance intents; IAM owns identities, access and transfer |
| Organisation Model, Configuration | Optional archetypes, effective settings and display declarations | Permitted edit intents; Configuration/Model retain their definitions |
| Commercial and resource capabilities | Subscription/billing/payment/provisioning/usage facts | Authorised service/change requests; source owns amounts, settlement and enforcement |
| Workflow, Task, Notifications | Work/decision/notice states | Approved intents/acknowledgements; owners retain queues and deliveries |
| Publisher, Privacy, Legal Compliance | Approved documents and restrictions | Document/navigation/approval intents; owners retain policy and applicable legal assessments |
| Error Normalisation, Logging, Audit, Reporting | Safe errors, diagnostics, authorised evidence and derived reports | See the precise exchange and non-substitution rules below |

### Error Normalisation, Logging, Audit and Reporting

| Neighbour | Information sent **to** it | Information received **from** it | Boundary |
|---|---|---|---|
| [`error-normalisation`](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) | Source error/code and approved versioned mapping, trusted correlation and public/technical disclosure profile | Pure safe standard code, optional category, `messageKey`, field/recovery hint and explicit uncertainty | Stateless library; cannot infer commitment, authorise retries, log or audit |
| [Logging](../../services/logging/services-record.md) | Trusted host/server technical failures: dashboard/adapter/load errors with minimal code, severity, source/scope and correlation | Intake `accepted/rejected/throttled/unavailable/uncertain`, authorised diagnostic records and qualified sink health | Technical diagnostics, not proof of business completion, sink delivery or Audit receipt; browser telemetry requires protected adapter |
| [Audit](../../capabilities/audit/capability-record.md) | Selected, independently authorised **console-originated** sensitive access/export/admin attempt evidence with verified actor, scope, source and actual outcome | Scoped, redacted timelines, integrity/coverage/review and accepted/pending/rejected/uncertain evidence receipt | **Domain owner** submits evidence of domain decisions; a click, log line or Audit receipt never proves a business transaction committed |
| [Reporting](../../capabilities/reporting/capability-record.md) | Authorised report selection, scoped parameters, preview/generation/refresh/export request | Derived report, reference, execution/export status, source cut-off, freshness, completeness and provenance | Reporting owns analysis; sources own business facts, Audit owns evidence; unavailable reporting does not block core administration |

A normalised error is a **safe description**; a log is a **technical diagnostic**; an Audit record is **accountable evidence**; a report is **derived analysis**. None substitutes for another. A Logging outage normally cannot invalidate an otherwise valid operation. If risk policy mandates Audit capture, the **owning** service determines the safe blocking/recovery behaviour. Correlation references do not grant access.

## Security, privacy, configuration and infrastructure

- **Authorise at execution:** server-side and per resource, tenant, subject, action and purpose; check again after revocation, context change or assurance expiry. A visible button is only a UI affordance. Separate roles, entitlements, effective configuration and technical availability.
- **Privileged governance:** support verified human owners, phishing-resistant/recency assurance where required, separation of duties, independent approval, last-owner safeguards, disputes and safe recovery. The console cannot self-authorise ownership changes.
- **Privacy:** minimise fields, prevent cross-tenant/small-group inference, redact confidential data and sensitive errors, avoid secrets/personal data in URLs, browser persistence, analytics and logs; obey qualified legal holds/retention and disclosure limits. Clear scoped state on logout or context change; avoid SSR/hydration leakage.
- **Configuration:** use approved labels, optional sections, presentation preferences and safe defaults. No tenant setting can weaken governing security/privacy requirements. The host owns enabled capability selection.
- **Providers and infrastructure:** no separate database, external provider, search engine, queue or service is needed for native UI composition. External payment/identity/storage systems remain behind their owner adapters. Display effective/reconciled timestamps and uncertainty. Underlying headless owner capabilities operate when the console is disabled.
- **Performance:** avoid N+1 dashboard reads and unbounded sensitive data fetches. Bound, defer and paginate optional sections; isolate failures; ensure useful initial render, safe caching and accessible live status without sacrificing authorisation, freshness or SEO/UX requirements.

## GUI and verified test-host model

**A GUI is the primary deliverable.** Read-only inspection of [`nuxt-layers-test/application-test-template`](../../../RESOURCES.md#ref-f1f7cc47) `master` tree `8b7b142b84b5ec2379d4e2e727914fe344187d64`: `/` is the public-style homepage, `/admin` is a host-owned capability test dashboard, and the collapsible sidebar's **Capabilities → Theme Manager** link opens `/theme-manager` in the same shell. The host supplies branding, mobile overlay, Theme Manager-backed Appearance and an explicit **Not signed in** status.

**Recommended composition:** a host-owned sibling **Capabilities → Organisation Console** entry and optional `/admin` card, opening a console dashboard in the shared shell. `/organisation-console` is an **illustrative host route**, not a contract endpoint. Host retains route placement, context integration and branding; optional management pages are source-owned. The reference test host runs **local, unauthenticated Theme Manager test mode** and is **not** evidence of safe production IAM. Protected console screens require separate authenticated fixtures and owner contracts.

| Optional screen | Primary content; owned capability |
|---|---|
| **Overview** (initial landing) | Selected permitted context, source-verified statuses/alerts, dashboard cards and links |
| **Context switcher** | Independently authorised organisation/tenant/group choices, visible role/boundary and state invalidation; Identity/Authorisation |
| **People and governance** | Members/invitations, owners, delegation, transfer/recovery approvals; Identity/IAM/Workflow |
| **Subscriptions and billing** | Plans, seats, entitlements, payment/provisioning, invoices; Subscription/Pricing/Billing/Invoice/Payment |
| **Resources and operations** | Enforced quota versus measured usage and source service-health links; Storage/domain owners |
| **Policies and documents** | Approved settings, publications, legal applicability qualified separately; Configuration/Publisher/Privacy/Legal Compliance |
| **Work and approvals** | Assigned work, pending approvals, notifications; Workflow/Task/Notifications |
| **Reports and evidence** | Authorised views/exports, provenance and coverage; Reporting/Audit |

**Minimum useful first composition:** Overview + authorised context selection + links to capability-owned screens. Add other screens only with actual public owner contracts, need and permissions. Use one accessible responsive shell, keyboard/focus/dialog semantics, screen-reader announcements, no sensitive flash on SSR, theme tokens and internationalisation. A no-GUI host still uses the domain capabilities directly.

## Standards and complete-source open-source libraries

**Mandatory governing floors:** [W3C WCAG 2.2 AA](../../../RESOURCES.md#ref-0d1f555e) (also ISO/IEC 40500:2025); [OWASP ASVS 5 Level 2](../../../RESOURCES.md#ref-a1c367d2) and relevant Level 3 requirements for sensitive administration; accepted ADRs, security/privacy and presentation rules. Follow WAI-ARIA 1.2 for appropriate custom widgets; [ARIA Authoring Practices](../../../RESOURCES.md#ref-f076dce5) are guidance, not an additional mandatory certification.

**Recommended design references:** ISO 9241-210:2019 (human-centred journeys); ISO/IEC 25010:2023 (quality); ISO/IEC 27001/27002:2022 and 27701:2025 (security/privacy management); NIST SP 800-63-4 and UK NCSC design guidance (assurance/recovery); IETF BCP 47, Unicode CLDR and ECMA-402 (locale, dates, numbers/currency). Existing Clock/Localisation owners retain time and translation rules.

**Conditional legal/procurement requirements:** UK GDPR/Data Protection Act 2018, Equality Act 2010, UK Public Sector Bodies Accessibility Regulations 2018 and EN 301 549 where the deployed application and audience are in scope. Privacy and Legal Compliance determine qualified jurisdiction, effective rules and DPIA needs. A referenced standard or published notice is **not** proof of certification or legal compliance.

**Library gate:** only complete, community-available source under commercially permissive terms for required functionality—prefer MIT, BSD or Apache-2.0. No paid-only core functionality, delayed public source, restricted source-available editions or mandatory external hosted service.

| Candidate | Licence | When justified |
|---|---|---|
| [Nuxt UI v4](../../../RESOURCES.md#ref-b0f34541) **or** [Reka UI](../../../RESOURCES.md#ref-12355446) | MIT / MIT | Accessible styled components **or** unstyled primitives through the **existing** `ui`/Theme Manager contract, not two competing UI systems |
| [TanStack Table](../../../RESOURCES.md#ref-af94a8b1) | MIT | Complex, source-scoped member/invoice/approval tables |
| [TanStack Query](../../../RESOURCES.md#ref-51cb5e45) | MIT | Optional read coordination if existing Nuxt fetch/caching is insufficient; partition and clear sensitive caches |
| [vee-validate](../../../RESOURCES.md#ref-bd5a7590), [Zod](../../../RESOURCES.md#ref-1e3efac4) | MIT / MIT | Complex forms and schema feedback; owner still validates server-side |
| [VueUse](../../../RESOURCES.md#ref-9507482e), [Pinia](../../../RESOURCES.md#ref-e0010fdc), [Vue I18n](../../../RESOURCES.md#ref-4941c780) | MIT | Selective interaction, disposable UI state or localisation only when host contracts lack it |
| [Chart.js](../../../RESOURCES.md#ref-54c6128e) **or** [Apache ECharts](../../../RESOURCES.md#ref-1aa1e4a8) | MIT / Apache-2.0 | Optional accessible reporting/usage charts, preferably with tabular alternatives |
| [Vitest](../../../RESOURCES.md#ref-c28ef17c), [Playwright](../../../RESOURCES.md#ref-12180955) | MIT / Apache-2.0 | CI-based unit, integration and browser accessibility verification; not runtime dependencies |

**Before adoption:** verify the particular release, current maintenance and security, complete public source and feature availability, transitive licences/notices/assets, Nuxt/Vue/Node/TypeScript and SSR compatibility, performance/bundle impact and replacement path. These are **candidate libraries**, not installed/approved package versions. Reuse what the platform already supplies; avoid an independent UI framework or storage service for this composition.

## Conceptual acceptance criteria

| Scenario | Required behaviour and authority |
|---|---|
| Two unrelated tenant memberships; switching or revocation mid-request | Show only separately authorised contexts; clear old caches/actions; reject late SSR/client results. IAM/host own security context |
| Restricted user follows a privileged direct link or tampers with an ID | No confidential view or action; authoritative server denial. Authorisation/domain owners |
| Parent pays for a child organisation | May see approved payer facts, **not** private child data without explicit grant. Commercial/Authorisation owners |
| Owner transfer, disputed governance or independent recovery | Require verified governance, current assurance, separation of duties and independent approval; preserve pending/blocked state. IAM/Workflow |
| Subscription requested, payment uncertain or provisioner delayed | Display requested/settled/entitled/enabled/authorised **separately**; never fabricate completion. Commercial owners |
| Measured storage usage disagrees with upload refusal | Report source discrepancy; do not override source quota enforcement. Storage |
| Form has stale revision, unavailable access check or unknown owner error | Fail closed for protected action, show safe message and recovery route; no leaked details. Owner + error-normalisation |
| Retry/duplicate submit or delayed event | Preserve idempotency/operation reference and refresh source; do not double-execute or assume success. Domain owner |
| Logging or optional Reporting unavailable | Show safe degraded technical/reporting view; unrelated authorised screens work. Logging/Reporting/host |
| Audit required for high-risk action; evidence service fails | No fabricated audit receipt; authoritative owner applies its required evidence policy. Audit/owner |
| Published notice or export request | Do not assert legal compliance, completed report or delivered export merely from publication/acceptance. Publisher/Reporting/Legal Compliance |
| Console disabled; unsupported section; mobile/keyboard/locale modes | Underlying domain APIs still work; no fake functionality; accessible WCAG 2.2 AA responsive themed and localised screen. Host and owners |

These are **conceptual tests**, not assertions that implementation or CI has passed.

## Decision status, dependencies and completion

**Agreed:** neutral `organisation-console` name (17 November); **OC-01** composition-first classification (22 November); five conceptual presentation responsibilities, authorised owner-contract cooperation, safe diagnostics/Audit/Reporting boundaries, GUI pattern, standards hierarchy and full-source permissive-library selection principles (22 November). No outstanding **Organisation Console classification or ownership decision** is identified.

**Conditional external dependencies:** protected views require trusted host, authenticated IAM and server Authorisation. Everything else is included only when the host enables the owning capability and its published interface supports a screen. No console-owned external provider or business store. `organisation_model` has a **separate active conceptual review (PR #115)**; its exact archetype/public contract remains provisional and must not be preapproved here. Other concurrent capability reviews may update interfaces before integration.

**Deferred implementation and acceptance:** map actual cooperating published root `CONTRACT.md` types and versions; agree optional interface packaging **only if** reuse merits it; compose authenticated acceptance host (the reference template alone has no IAM); verify server access, SSR/hydration/context clearance, recovery, idempotency, accessibility, i18n, performance and CI/security evidence. No `nuxt-layers/organisation-console` or `nuxt-layers/organisation_console` root contract/repository was found on review recheck. No code/tests/builds are claimed.

**Conceptual verdict:** **Complete for design/ownership and idealised contract review**, subject to consistency reconciliation with separately reviewed neighbours and the mandatory latest-`master` architecture/Git/CI checks. **Not** a shipped, accepted runtime capability, security certification or permission to merge. Draft PR #114 needs explicit merge approval. Related [Application Compositions](../../architecture/application-composition.md), [Organisation Model](../../architecture/organisation-model.md), tenancy (former proposal: organisational tenancy and governance), commercial onboarding (former proposal: commercial onboarding and entitlements), policy boundaries (former proposal: policy and governance boundaries) and recovery (former review: organisational ownership and recovery) remain authoritative in their respective scopes.

## Organisation Model — approved reciprocal definition/presentation boundary (23 November 2026)

**Status:** Organisation Model OM-D01–OM-D06 and its idealised OM-I01–I08/OM-O01–O07 contract are owner-approved conceptual guidance in [Organisation Model's canonical record](../../architecture/organisation-model.md), not verified implementation exports. The Console may consume authorised Model archetype names, structural field definitions, version/effectivity, position/reporting **types** and feature/menu **suggestions** through OM-O01/O03/O04/O07. It obtains the **applied** selected archetype/version from Configuration and trusted actual tenant/group/member context from Identity; Authorisation, Subscription and the host independently supply permissions, entitlement and enablement. The Console continues to own only composed navigation and organisation-management presentation, not the Model's optional guarded **definition authoring/editor** dashboard (`/organisation-models` is an illustrative host-remappable route). A missing Model service affects only definition-dependent views; it cannot create a fallback grant or invalidate unrelated Console actions. Host navigation is based on `nuxt-layers-test/application-test-template` and Theme Manager's published presentation contract. No direct package cycle or independent durable store is implied. This reciprocal clarification supersedes any earlier note claiming OM-D01–OM-D06 remain awaiting conceptual approval.
