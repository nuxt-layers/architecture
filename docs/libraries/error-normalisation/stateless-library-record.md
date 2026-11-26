# Error Normalisation — Canonical Stateless Library Record

**Name:** `error-normalisation`  
**Classification:** Framework-independent **stateless library candidate**, not a stateful capability, Nuxt Layer or service.  
**Conceptual status:** Owner-approved ERR-01–ERR-08 and subsequent contract, standards, reciprocal-boundary and GUI recommendations (22 November 2026); this specification is conceptually complete, subject to pre-merge reconciliation.  
**Authority:** Accepted ADRs and the [governing Capability Standard](../../standards/capability-standard.md) take priority over this conceptual specification.


**Todo consumer (23 November 2026; conceptual reciprocity):** [Todo](../../compositions/todo/compositions-record.md#error-normalisation-logging-audit-and-reporting--conceptual-public-interfaces-23-november-2026) supplies owner-defined versioned item/collection validation, conflict, permission, persistence or optional Task-link errors, known/unknown commit outcome, safe mapping/disclosure and opaque correlation to the library's pure normalise/classify/sanitise functions. It receives safe category/code/message key, public/diagnostic projections and advisory retry guidance. Todo alone owns commit/reconciliation and any separate Logging, Audit or Reporting submissions; the library never stores, emits or calls a service. No runtime contract asserted.

**Checkout reciprocal interface (24 November 2026; detailed Checkout-side interface owner-approved; CHK-07/09 approved):** [Checkout conceptual contract](../../capabilities/checkout/capability-record.md#error-normalisation-logging-audit-and-reporting--public-exchanges). Checkout supplies stable source error definitions, approved mappings/disclosure, explicit observed outcome and opaque correlation; pure functions return bounded versioned public/diagnostic projections, message keys and advisory retry characteristics. Checkout alone decides retry, reconciliation, compensation and separate evidence submissions. Unknown remains unknown; no library storage, events or service calls. No shipped integration asserted.


## Purpose, justification and ownership

**Profile reciprocal contract (owner-approved Profile conceptual direction, 22 November 2026):** Profile may pass source-owned stable error definitions, safe disclosure policy, known/unknown operation outcome and opaque correlation to the library's pure normalise/classify/sanitise functions, then consume a versioned safe code, message key and qualified retry *advice*. Profile retains transaction, permission, retry/idempotency and disclosure decisions; this library does not emit logs, Audit evidence, reporting facts or events. Current Profile `ProfileErrorBody` remains its published contract until versioned alignment. [Profile canonical contract](../../capabilities/profile/capability-record.md#error-normalisation-logging-audit-and-reporting--approved-public-boundaries).


Provide one consistent, safe vocabulary for application, infrastructure and provider errors without centralising business decisions. Given an error and explicit caller-owned definitions, deterministically **normalise, classify, validate and sanitise** it; return a versioned result suitable for controlled use in APIs, diagnostics and presentation.

**The source capability owns** its error codes and meanings, operation outcome, access decisions, business recovery, idempotency and retry policy, reconciliation, committed events and durable records. **This library owns** only its reusable data shapes and pure interpretation/projection rules. It creates no authoritative facts or stored state.

It does not collect logs, metrics or audit evidence; manage incidents, notifications, reports or exceptions as cases; run retries or compensation; own translations, provider credentials, HTTP routes or dashboards; or call another capability's private code/tables.

**Page Builder reciprocal contract (PB-17 approved):** [Page Builder](../../presentation/page-builder/presentation-record.md) supplies source-qualified validation, component, template, access, revision and render failures, approved mappings, known/unknown outcome and safe correlation. Returns stable code, message key, field hint, distinct sanitised projections and advisory retry guidance. No logging, audit, retries or publication authority; Publisher remains source of durable outcomes.

## Conceptual public contract: inputs and outputs

**Theme Manager advisory reciprocity (23 November 2026; [Theme Manager PR #142](../../presentation/theme-manager/presentation-record.md)):** Theme Manager may pass its source-owned versioned theme-validation, permission, save/load or persistence errors, explicitly known/uncertain command outcome, mapping and safe correlation to this pure library. It receives bounded public/diagnostic projections, stable safe code, message reference and qualified retry advice. Theme Manager alone decides theme state, publication success, reconciliation, logging and accountable evidence; the library emits none. Conceptual only; no shipped adapter or mandatory library usage. 


The table defines *logical operations*, **not shipped function names**. Exact TypeScript exports are implementation work.

| Operation | Caller supplies | Safe output |
|---|---|---|
| **Normalise** | Native exception, provider/API response or typed domain error, an approved mapping and optional trusted context | Versioned standard error or safe unclassified/invalid result |
| **Classify** | Source namespace, code, operation context and caller policy | Category, optional severity and *advisory* retry characteristic |
| **Resolve and validate** | Immutable source-owned code catalogue, schema and version | Recognised/unknown/incompatible definition and safe compatibility details |
| **Sanitise and project** | Error, disclosure purpose, approved allowlist/profile | Distinct bounded public/API and technical diagnostic views with omissions; no raw provider text or stacks by default |
| **Prepare message reference** | Validated message key and explicitly approved parameters/field targets | Safe message reference, optional field/correction hint for UI/Localisation; no translated text lookup |
| **Correlate** | Trusted opaque trace/operation/cause references | Bounded, sanitised references where justified; no invented tenant, actor or trace identity |

**Result concept:** schema version, source namespace, stable code, category, optional severity, safe `messageKey`, optional field/correlation/cause references, qualified retry (`yes`, `no`, `conditional`, `unknown`) and observed outcome (`rejected`, `failed`, `cancelled`, `timed_out`, `uncertain`, `unknown` or source-defined qualified value). Source time may be supplied explicitly; the library is not a Clock authority. A normalised result is **not** evidence that a transaction committed, was rolled back, reached a provider or was logged/audited.

**Failure behaviour:** unrecognised input remains unclassified. Malformed, cyclic, oversized, hostile or incompatible values return a bounded safe result; avoid recursive failure handling. Do not infer commitment or automatic retry eligibility from a timeout or HTTP status. A source may assert `not_committed` only using its own authoritative evidence. Stable codes and schemas require versioned compatibility rules.

**Interaction shape:** pure function calls and data results only. No owned durable commands, queries, subscriptions, events, outbox, configuration store, persistence port or service deployment. Any caller-provided policies/catalogues are immutable inputs, not centrally managed library records.

## Persistence architecture — reciprocal contract boundary (22 November 2026)

**Owner-approved Persistence design; this library's conceptual contract remains its own authority.** [Persistence architecture](../../architecture/persistence.md#error-normalisation-logging-audit-and-reporting) is not a separate service or error producer. A data-owning capability or Infrastructure supplies recognised, safe, versioned database/provider/migration exceptions, source mapping, known transaction result, operation scope and permitted correlation to the pure Error Normalisation functions. The library returns a deterministic, sanitised code/category, safe message reference, qualified retry hint and explicit unknown/uncertain classification; it cannot establish whether a timed-out transaction committed, automatically retry, write records or emit Logging/Audit/Reporting messages. Originators choose independent downstream submissions through their respective public contracts. No new library dependency or runtime evidence is implied.

**Publisher (owner-approved Publisher-side conceptual reciprocity, 22 November 2026):** Publisher supplies its own stable domain error code, explicitly known/unknown operation outcome, mapping version, trusted correlation and approved disclosure profile to the library's pure normalise/validate/sanitise functions. It receives safe code/category/message key, restricted diagnostic/public projection and **advisory** retry qualification. Publisher alone decides actual publication state, permission, idempotency, reconciliation and outbox; library errors cannot prove rollback or publication. No package/API implementation or changes to the library's owner-approved decisions are implied. [Publisher canonical contract](../../capabilities/publisher/capability-record.md).

## Search — reciprocal conceptual contract (23 November 2026)

**Search reciprocal (23 November 2026; Search PR #132; owner-approved Search-side contract):** Search passes its own versioned errors, known/uncertain index/query outcomes, approved mappings, safe purpose and opaque correlation to this pure library; it receives a stable safe code/message key, diagnostic/public projections and advisory retry classification. Search alone owns index state, retries, reconciliation and any separate Logging/Audit/Reporting submissions. No library state, event or runtime dependency is introduced.

**Task reciprocal public library use (TASK-01–14 owner-approved, 23 November 2026):** Task supplies source-owned, versioned task validation/assignment/dependency/time/evidence/provider errors, explicitly known or uncertain operation outcome, trusted opaque correlation and a permitted disclosure policy to the **pure** Normalise/Classify/Sanitise/Message operations. Library returns safe code/category/message key, field hint, bounded diagnostic/public projections and **advisory** retry qualification; Task alone owns commit, idempotency, retry/reconciliation and source results. No library-side event, Logging, Audit, Reporting, state or network dependency. See [Task's canonical contract](../../capabilities/task/capability-record.md#error-normalisation-logging-audit-and-reporting--public-inputoutput-boundaries-23-november-2026). No shipped Task/root library API is asserted.

## Cooperating public contracts

**Temporal Gateway — approved TG-01–TG-05 reciprocal boundary (23 November 2026):** Temporal Gateway supplies a bounded provider error, a source-owned stable technical code/mapping revision, explicitly known/rejected/unknown operation disposition, safe disclosure profile and opaque correlation to Error Normalisation's pure local contract. It receives deterministic sanitised code, category, message key, public/diagnostic projections and advisory retry qualifier. Gateway alone determines provider reconciliation/technical disposition; the library makes no provider calls, logs, events, Audit submissions or reports. [Approved Temporal Gateway conceptual record](../../adapters/temporal-gateway/adapters-record.md). This is conceptual interoperability, not a verified published SDK import.

**SEO reciprocal consumer (SEO draft PR #133; proposed cooperation, 23 November 2026):** [SEO's conceptual public contract](../../services/seo/services-record.md#seo-error-diagnostics-accountable-evidence-and-analytical-reporting--public-contract) supplies owner-defined versioned error codes for metadata/indexability validation, sitemap rebuild and provider uncertainty, explicit known/uncertain outcomes, trusted correlation and approved public/technical disclosure profiles. The pure library returns safe classifications, message keys, bounded projections and advisory retry status only. SEO independently decides its committed state, idempotency, recovery, outbox and whether to submit separate diagnostics to Logging, evidence to Audit or source facts to Reporting; no implicit dispatcher, stored library state or dependency cycle arises.


These exchanges occur **through the originating caller or host**, not through automatic library dispatch. No other capability is required at runtime.

| Neighbour | Caller/library input | Result available to neighbour; retained authority |
|---|---|---|
| **Source capabilities** (IAM, Inventory, Payment Gateway, Accounting, Manufacturing and others) | Codes, known source outcomes, safe metadata, approved mappings, trust context and disclosure rules | Standard error and safe projections; originator alone decides business truth, recovery and committed events |
| **Project** (owner-approved Project conceptual boundary, draft PR #124) | Project-owned validation, baseline revision conflicts, milestone decision and provider-uncertainty codes, known source outcomes, qualified policy, bounded metadata and safe disclosure maps | Pure error category, stable message reference, safe API/diagnostic projections and advisory retry classification; Project alone determines committed state, audit/reporting submission and recovery (see [Project contract](../../capabilities/project/capability-record.md#error-normalisation-operational-logging-accountable-audit-and-reporting)) |
| **Integrations/adapters** | Versioned provider codes, permitted response attributes and operation/idempotency context | Provider-neutral classification with explicit uncertainty; adapter/source reconciles remote outcome |
| **Logging** | No inbound operational dependency | Source may submit a minimised code, severity, category, context and correlation through Logging's diagnostic intake; Logging supplies **to that source** intake receipt, scoped diagnostic read model and delivery health, not a business or audit outcome |
| **Audit** | No inbound operational dependency | Source may submit **independently authorised** accountable failure/denial/uncertainty evidence to Audit's intake; Audit supplies **to that source** accepted/pending/rejected/uncertain evidence receipt, evidence reference and verification/coverage; Logging receipt is not Audit receipt |
| **Reporting** | No inbound operational dependency | Source may expose classified failures with source revisions/outcomes; Reporting gathers **authoritative source facts**, not normaliser calls or log counts alone, and supplies authorised trends, reports, freshness and completeness to report consumers |
| **Observability** | No inbound operational dependency | Source may emit safe metric/trace error attributes; Observability owns telemetry, health and alert decisions |
| **UI and Localisation** | No inbound runtime dependency | Caller passes safe message keys, permitted parameters and field/recovery hints; UI owns presentation and accessibility, Localisation owns actual translated wording |
| **Notifications** | No inbound runtime dependency | Source/operator authorises safe notice content; Notifications decides channel and delivery evidence |
| **Workflow, Scheduler, Message Queue** | No inbound runtime dependency | Source may use qualified outcomes to decide approval/retry/reconciliation; these services retain execution and transport, source retains idempotency/commitment truth |
| **Clock, Configuration, Privacy, Legal Compliance, Authorisation** | Explicit caller-supplied time, policy or trusted decision only if necessary. Privacy passes stable source-owned consent/rights/retention codes, trusted scoped context, an actual (including uncertain) source outcome and audience-specific disclosure policy | Returns safe, versioned error classification, message key, bounded public/diagnostic projection and advisory retry hint **only to the Privacy caller**; no logging, accountable evidence, report, rights decision, retry, or emitted event is generated |

**Availability:** Library use remains local and headless. The source can return a safe fallback if its mapping is missing. A Logging/Reporting/Observability outage must not block safe error return. Mandatory Audit requirements and fail-closed behaviour remain independently enforced by the source owner and its risk policy. Cross-capability links do not create package imports or dependency cycles.

**Observability integration clarification (OBS-01–OBS-10 approved, 22 November 2026):** The pure library has no Observability input, output callback, telemetry producer or dependency. Its caller may independently project source-approved safe code/category/severity, retry qualification and uncertain outcome into Observability's bounded metric/span ingestion and receives Observability's own acceptance/status only as that caller. Logging receives separate technical diagnostic submissions; Audit separate risk-selected accountable source evidence; Reporting separately obtains authoritative source facts and may combine qualified technical measurements. Never infer a confirmed business failure from a timeout, duplicate an Audit receipt or require telemetry to return an error safely. This clarifies the existing [conceptual library contract](#conceptual-public-contract-inputs-and-outputs) without adding library state or routes.

### Qualification error contract — approved reciprocal boundary (22 November 2026)

[Qualification](../../capabilities/qualification/capability-record.md#error-normalisation-logging-audit-and-reporting) supplies source-owned versioned error definitions, mandate/evidence/award-case failure or unknown outcome, context and approved disclosure mappings to this **pure** library. It receives only a safe code/category/message key, validation result, restricted projection and *advisory* retry qualifier. Qualification alone confirms committed awards, external provider uncertainty and recovery. The library does not emit Logging, Audit or Reporting records, cannot infer regulatory recognition and has no runtime dependency on these capabilities. QUAL-01–17 conceptual approval does not establish a shipped library API.

## Security, privacy and correctness

- Treat arbitrary thrown values, nested `cause`, `AggregateError`, driver/provider responses and status text as untrusted. Avoid executing getters, unsafe serialisation, prototype traversal, unbounded recursion or arbitrary extension code.
- Bound size, depth, strings and cause chains. Allowlist fields by audience; never expose stack traces, credentials, tokens, private resource existence or sensitive payloads by default. External `detail` is not raw exception text.
- Distinguish invalid, unauthenticated, forbidden, not-found, conflict, throttled, unavailable and internal errors when the originating contract can safely disclose the difference. Protected-resource existence may need deliberately indistinguishable public responses.
- Preserve unknown, timeout and uncertain states; an advisory retry hint is **not** an instruction to retry, especially for payments. No false exactly-once or provider-commit guarantees.
- Keep source namespaces, stable codes, message keys, mapping revisions and schema versions explicit. Do not reassign source codes or silently change meaning.
- No ambient logging, global mutable registry, storage, networking, automatic outbox events, asynchronous job, secret lookup or unauthorised data discovery.
- The caller/host owns authorisation, tenant isolation, purpose and disclosure policy. A correlation reference never grants access or cross-tenant linkage.

## Standards and compliance guidance

| Source | Application |
|---|---|
| [IETF RFC 9457](../../../RESOURCES.md#ref-7754416d), replacing RFC 7807 | Optional safe HTTP Problem Details projection with controlled `type`, `title`, `status`, `detail`, `instance` and extensions; no internal exception leakage |
| [IETF RFC 9110](../../../RESOURCES.md#ref-5a7fc9e7) | Accurate HTTP status semantics; no inference of business commitment |
| [OWASP ASVS 5.0, ch. 16](../../../RESOURCES.md#ref-f0c6e4e1) | Secure error handling and diagnostic minimisation; ASVS Level 2 baseline, applicable Level 3 for critical uses |
| [OpenTelemetry error conventions](../../../RESOURCES.md#ref-a60f637a) | Safe error attributes for callers' metrics and traces; no internal telemetry emission |
| [W3C WCAG 2.2](../../../RESOURCES.md#ref-0d1f555e) | Downstream SC 3.3.1, 3.3.3, 4.1.3, and where applicable 3.3.4; host presents and announces accessible errors |
| [ISO/IEC 25010:2023](../../../RESOURCES.md#ref-0b5d630d) | Reliability, fault tolerance, recoverability and testability |
| [ISO/IEC 29100:2024](../../../RESOURCES.md#ref-f7fc907f) | Privacy framework and minimised disclosure |
| [ECMA-262](../../../RESOURCES.md#ref-a2caee72) | JavaScript exception and cause semantics |
| [UK NCSC secure design](../../../RESOURCES.md#ref-c1b4f35f), [ICO data protection by design](../../../RESOURCES.md#ref-4ec87ed3), [UK Software Security Code of Practice](../../../RESOURCES.md#ref-6d9f6678) | National security and privacy guidance; voluntary code where applicable, not automatic certification |

Applicable law and accepted governing architecture take precedence. Standards and guidance apply to their actual scope; neither library compliance nor safe formatting establishes legal compliance.

## GUI and test presentation (advisory)

**No production GUI, sidebar item, dashboard or operator console.** The library has no user-managed data or incident lifecycle. Consuming applications use `ui` and `localisation` for accessible validation messages, alerts and recovery actions. Logging, Observability, Audit and Reporting own their respective operational/evidential/analytical screens.

Optionally, a derived local-only test host may add **Error Normalisation** under the collapsible **Capabilities** navigation of [`nuxt-layers-test/application-test-template`](../../../RESOURCES.md#ref-f1f7cc47), following Theme Manager's existing dashboard route pattern. A single synthetic-fixture workbench can demonstrate source error, normalised result, public versus technical projection, redaction, retry qualification, unknown codes and incompatible versions. The host owns navigation, Theme Manager-based appearance, WCAG/i18n presentation and test fixtures. Do not add a production route, change the shared template or introduce Nuxt dependencies into the library.

## Conceptual acceptance and remaining work

1. Known errors from distinct sources normalise consistently; unknown inputs remain safely unclassified.
2. Provider payment timeout yields `uncertain`, not confirmed failure or unconditional retry.
3. Malformed, cyclic, oversized and hostile exceptions fail safely without leaks, recursion or getter side effects.
4. Public views omit secrets/stacks while bounded diagnostics retain only allowlisted technical information.
5. Stable codes, versions, message keys and source meanings survive compatible updates; breaking changes are detected.
6. No trusted identity, authorisation, tenant scope, time or outcome is fabricated; optional correlation does not broaden access.
7. Library works deterministically in standalone TypeScript/Node without Nuxt, network, storage or Logging/Observability/Audit/Reporting.
8. The source may independently submit diagnostics, selected Audit evidence and authoritative Reporting facts; each recipient returns its **own** outcomes without conflation.
9. Optional synthetic test screen uses public library functions and does not imply a production dashboard.

**Conceptual decision:** ERR-01–ERR-08 and the later approved standards, reciprocity and GUI boundaries are reflected in this record. A separate stateful `incident-management` capability is **deferred** until the Observability review establishes whether it has a distinct durable case lifecycle. No unresolved conceptual choice presently prevents this library specification being considered complete.

**Implementation and acceptance outstanding:** independently developed package (suggested name `@nuxt-layers/error-normalisation`), root `CONTRACT.md` with concrete exports/mapping versions/limits, optional adapters, dependency/licence choices, security tests, independent consumer acceptance and CI. No implementation readiness or merge approval is inferred. All changes remain subject to current-`master` architectural and Git reconciliation.


## Message Queue — approved local library cooperation (22 November 2026)

**Owner-approved MQ-side conceptual interface only; not a runtime package/API claim.** Message Queue passes trusted, versioned queue/adapter error codes, explicit rejected/failed/uncertain/unknown transport outcome, source-owned mapping and redaction purpose to the pure Error Normalisation library. The library returns a safe category/code, message key, bounded correlation and **advisory** retry qualifier; Queue independently resolves custody, idempotency, acknowledgment, retry and replay. The library does not emit logs, Audit evidence, reports, events or transport calls. [Canonical Message Queue public contract](../../services/message-queue/services-record.md#error-normalisation-logging-audit-and-reporting). This reciprocal note does not alter the separately owner-approved library contract.


## Notifications reciprocal integration — 22 November 2026

**Notifications reciprocal public-contract integration (22 November 2026; Notifications-side concept approved):** Notifications supplies its source-owned error definitions, provider/attempt uncertainty, trusted correlation and explicit disclosure policy to pure Normalise/Classify/Sanitise operations. It consumes stable safe codes, message keys, projections and advisory retry qualification, but alone decides notice outcome, idempotent retry and provider reconciliation. The library neither dispatches notices nor emits Logging, Audit or Reporting records; Notification errors are never proof a recipient received a message. See [Notifications contract](../../services/notifications/services-record.md). This is not an implemented API.

## Office composition reciprocal contract — 22 November 2026

**Status:** Office conceptual direction approved; documented in Office PR #112 (former blueprint PR #112), not a published adapter or runtime API. Office host composition consumes pure error normalisation for source-owned errors and its own presentation/adapter failures. It supplies explicit owner code/catalogue, trusted correlation, disclosure profile and safe context; it receives a versioned safe result and message reference, not authoritative commitment, retry permission, a log, Audit evidence or report. The host optionally sends purpose-minimised projections onward through Logging, Audit (only independently proven accountable source facts) and Reporting. Office creates no library store, outbox or Office-specific error authority. See [Office canonical contract](../../compositions/office/compositions-record.md).

### Organisation Console — approved presentation consumer (22 November 2026)

**Status:** Approved conceptual relationship in Organisation Console PR #114 (former blueprint PR #114), not an implemented direct dependency. The host/source passes a source-owned, versioned error code, mapping, safe disclosure profile and trusted opaque correlation to the pure normaliser. It receives a bounded, safe code, `messageKey`, optional field/recovery hints and explicit uncertain outcome for accessible GUI presentation. The console never treats a retry hint as permission to retry or an error status as proof of business commitment. No Logging/Audit/Reporting submission, persistent event or record is created by the library. See [console public boundary](../../presentation/organisation-console/presentation-record.md#error-normalisation-diagnostics-accountability-and-reporting--approved-cooperation).

## Order consumer — approved conceptual contract (22 November 2026)

[Order's approved interface](../../capabilities/order/capability-record.md#error-diagnostics-accountability-and-analytics--approved-reciprocal-contract) supplies stable, versioned source-owned validation, revision-conflict, authorisation, provider-uncertain and reconciliation error meanings, known business outcome, approved mapping, disclosure and opaque correlation. Error Normalisation returns deterministic safe error category/code, message key, sanitised public/technical projections and a *qualified* retry hint or safe unclassified result. **Order alone** decides committed business state, authorisation, idempotency, retry and compensation; this pure library never logs, audits, reports, retries or persists. This owner-approved Order-side conceptual exchange does not assert an implemented package or change the library's approved stateless boundary.

### Policy Map / Legal Compliance mapped-view integration (22 November 2026; agreed conceptual)

Legal Compliance's approved read-only [Policy Map contract](../../capabilities/legal-compliance/capability-record.md#policy-map-4-operational-and-cross-capability-interactions) supplies source-defined typed mapping/query/provider errors, explicit versioned definitions, trusted opaque correlation and disclosure rules to the pure Normalise/Classify/Sanitise operations. It consumes safe codes, categories, `messageKey` and advisory retry qualification while Legal Compliance alone decides the actual mapping completeness, unknown/uncertain state and owner-authorised recovery. The library does not emit Logging, Audit or Reporting outputs, and none is mandatory. No independent Policy Map runtime API is implied.

## Organisation Model — reciprocal contract (22 November 2026)

**Status:** Owner-approved conceptual boundary from [Organisation Model](../../architecture/organisation-model.md), not a shipped library/API. Organisation Model supplies its own versioned schema/publication validation and error codes, source outcome, approved mappings, disclosure policy and trusted correlation to pure normalise/classify/sanitise operations. Error Normalisation returns safe code/category/messageKey, public and technical projections and advisory retry/uncertain status; **Model** determines whether a revision was committed, whether retry is safe, and which facts are eligible for Logging, Audit and Reporting. The library neither transmits records nor issues business, log or Audit receipts. No dependency cycle or new runtime service.
Payment Gateway (approved conceptual integration, 22 November 2026)** | Gateway supplies stable payment/provider error codes, explicit confirmed/unknown business outcome, idempotency/correlation, vetted mappings and audience disclosure policy | Pure normalisation returns safe versioned category, message key and advisory retry/unknown result; Gateway alone owns provider read-back, commitment, retry/reconciliation, events and recovery. See [Payment Gateway public contract](../../services/payment-gateway/services-record.md). |
| **

## Process — reciprocal conceptual public contract (22 November 2026)

**Status:** Process-side owner-approved conceptual alignment in draft PR #121 (former blueprint PR #121); neighbouring implementation/public API not asserted. See [canonical Process contract](../../capabilities/process/capability-record.md). The caller Process passes its own versioned source code, known/uncertain outcome, approved mapping and disclosure profile to pure normalise/classify/project functions and consumes a safe standard code, message reference, sanitised diagnostic view and advisory retry indicator. Process alone decides whether an instance progresses, holds, retries or reconciles. No library log/audit/report dispatch, durable records, automatic retry or new runtime dependency. This does not complete or replace the neighbouring review, and contract information flow does not imply a direct package-import edge.

## Product public-contract reciprocal relationship

**Product approved conceptual reciprocity (22 November 2026; Product PR #122):** Product may pass versioned Product-owned error codes/definitions, safe operation context, approved mappings and redaction policy to this pure library and receive deterministic safe error categories, public/technical projections, `messageKey` and advisory retry status. Product still owns commit status, retry/idempotency/reconciliation, permissions, durable events and domain meanings. The library never logs, audits, reports, persists or changes Product facts. This confirms Product-side use, not a shipped library export.

## Pricing consumer interface — approved conceptual direction (22 November 2026)

[Pricing](../../capabilities/pricing/capability-record.md#errors-diagnostics-accountable-evidence-and-analytics) provides its own versioned price/quote/promotion error catalogue, raw error or known operation result, approved mapping, trusted correlation and audience-based disclosure rules. This stateless library returns a safe stable code/category, message key, public/diagnostic projections, advisory retry qualification or bounded unknown. Pricing alone owns transaction/quote truth, reconciliation, idempotency and retries. Normalisation does not write Logging, Audit or Reporting; caller separately sends minimised facts through their contracts. No package/runtime dependency is asserted.

## Reviews source-side contract (23 November 2026)

**Status:** REV-X01 Reviews-side conceptual public interface owner-approved on 23 November 2026 in draft PR #130 (former blueprint PR #130); not an implemented library/API or a change to independent library governance. [Reviews](../../capabilities/reviews/capability-record.md#error-normalisation-diagnostics-accountable-evidence-and-analytics--conceptual-public-contract) can supply versioned source-owned submission/verification/receipt-code/reply/publication failures, explicitly known or uncertain outcomes, approved mappings, trusted opaque correlation and audience disclosure policy to stateless pure normalise/classify/sanitise operations; it receives stable safe codes, message keys, restricted projections and **advisory** retry classification. Reviews alone owns actual review outcome, idempotency, recovery, Logging/Audit/Reporting submission and committed outbox. The library performs no IO or writes and is neither evidence custody nor telemetry.

## Scheduler reciprocal input/output boundary — 23 November 2026

**Scheduler SCH-01–08 and its four-way Error Normalisation/Logging/Audit/Reporting input-output relationships explicitly owner-approved (23 November 2026); not an implemented library adapter.** Scheduler supplies source-owned stable error meaning, safe provider/exception context, known/unknown outcome, disclosure profile and trusted correlation to the pure Error Normalisation functions. The library returns deterministic code/category/messageKey, safe public/technical projections and an **advisory** retry hint or safe unclassified result. Scheduler alone determines occurrence status, actual retries and recovery; the library never logs, audits, reports, emits events or stores state. Scheduler separately sends purpose-limited safe diagnostics to Logging, accountable evidence to Audit and authorised read models to Reporting; none can infer domain completion from a scheduling receipt. [Scheduler public ports](../../services/scheduler/services-record.md#error-normalisation-logging-audit-and-reporting).

## Shop composition reciprocal safe-error projection — 23 November 2026

**Shop-side approved conceptual direction; no new library implementation or published TypeScript export claimed.** [Shop](../../compositions/shop/compositions-record.md#4-error-normalisation-logging-audit-and-reporting), as a host composition, passes source-owned classified errors, known/unknown domain outcomes, approved mapping/schema and disclosure policy, optional safe correlation to Error Normalisation's **pure** normalise/classify/sanitise/message-reference operations. It receives a versioned safe code, category, message key/field hint, permitted diagnostic view and **advisory** retry classification. The library does not call Shop/Logging/Audit/Reporting, persist anything, emit business/audit events, translate text, determine Order/payment completion or authorise retry. The originating Order/Payment Gateway/Basket owner alone knows transaction truth and idempotent reconciliation. Host separately routes sanitised diagnostics to Logging, risk-selected source-owned evidence to Audit, and authorised owner projections to Reporting.

### `site-hosting` source error contract — 23 November 2026 (Site Hosting-side owner-approved; implementation unverified)

`site-hosting` passes its own versioned domain/verification/routing error definitions, known or uncertain operation outcome, bounded safe context, approved disclosure policy and opaque correlation into the library's pure normalise/classify/sanitise functions. It receives deterministic safe error code/category, public and technical message projections and **advisory** retry status. The library neither decides whether a DNS/host operation committed nor emits Logging/Audit/Reporting records; source-owned Site Hosting separately submits those outputs through their own interfaces. Domain transfer rejection, DNS timeout, active-binding conflict and unconfirmed TLS must remain distinguishable without revealing a claimant or secrets. The `site-hosting` contract is [defined conceptually here](../../services/site-hosting/services-record.md#error-normalisation-logging-audit-and-reporting); no implementation is claimed.

### Storage — approved dependency and error boundary (23 November 2026)

Storage may supply its published source-owned `StorageError` code and `messageKey`, a versioned mapping, safe operation context, known/uncertain provider outcome, authorised disclosure purpose and opaque correlation to the **pure** normalise/classify/sanitise functions. The library returns safe API versus technical projections and qualified retry advice, never a decision to retry, change an object, assert committed bytes, write a log, submit Audit evidence or publish Reporting data. Storage retains its real operation/idempotency/tenant semantics, and can function with its documented error codes if this optional library is absent. The library's root public contract is still conceptual, not a shipped runtime package. [Storage contract](../../services/storage/services-record.md).

## Subscription consumer interface — conceptual alignment (23 November 2026)

**Subscription consumer boundary (23 November 2026, PR #137; Subscription-side owner-approved conceptual design, not a shipped library interface):** Subscription supplies source-owned stable error definitions, verified known/unknown transaction outcomes, approved mapping/version, trusted opaque correlation and disclosure policies to the library's pure interface. The library returns safe public/diagnostic projections, code/category, `messageKey`, qualified retry hint or bounded unknown; it does not establish renewal commitment, decide entitlement, call Logging/Audit/Reporting, emit events or retry payments. Source owners separately authorise and send any diagnostics, accountable evidence or reporting facts. [Subscription public exchange](../../capabilities/subscription/capability-record.md#error-normalisation-logging-audit-and-reporting--public-contract-interactions).

## UI reciprocal presentation contract — 23 November 2026 (draft PR #146)

**Status:** UI-side owner-approved conceptual direction; no implementation integration or independent change to this counterpart's previously approved public contract. [UI contractual boundaries](../../presentation/ui/presentation-record.md#error-normalisation-logging-audit-and-reporting--reciprocal-public-interfaces-23-november-2026).

**UI consuming presentation:** UI receives safe versioned code/messageKey, permitted field hints and advisory retry classification from a source-owned Error Normalisation projection. UI renders accessible, localised failure states; it supplies neither source business outcome nor retries, Logging submissions, Audit evidence or Reporting records to this pure stateless library. Source owner decides commitment, disclosure and recovery.

## User presentation reciprocal consumer — 23 November 2026

**Status:** User-side owner-approved conceptual interaction, not a shipped package API. [User presentation's public-boundary review](../../presentation/user/presentation-record.md#5-error-diagnostics-audit-and-reporting-contracts) supplies source-owner error codes, trusted/explicitly uncertain outcome, approved mapping and disclosure profile, safe field/correlation context to the **pure** normalise/classify/sanitise/message functions. The library returns stable safe error category/code, optional `messageKey`/field hints, distinct public/diagnostic projections and **advisory** retry qualification. User renders the safe message; the originating Identity, Profile, Authorisation, Authentication or host operation retains state, permission, commit and actual retry/reconciliation authority. The library never records UI logs, sends Audit evidence, creates Reporting facts or initiates retries. Missing owner facts, incompatible definitions and hostile provider text yield safe unknown/unclassified presentation rather than a fabricated business outcome. No dependency cycle or implementation assertion follows.

## Warehouse reciprocal interface — 23 November 2026 (PR #149)

**Warehouse (owner-approved Warehouse-side conceptual design, 23 November 2026; draft PR #149):** Warehouse supplies source-owned stable work/scan/provider error meanings, explicitly known or uncertain operation outcome, a versioned mapping and approved disclosure/correlation context to pure normalisation. The library returns safe codes, message references, distinct public/technical projections and advisory retry classification. Warehouse alone determines committed work, reconciliation, logging/audit submissions and retry; no library state or shipped integration is asserted.


## Consolidated conceptual contract qualifications

### Additional consumer relationships and absence

**Shopping Basket reciprocal (SB-01–SB-08 approved concept, 23 November 2026):** [Shopping Basket](../../capabilities/shopping-basket/capability-record.md#5-error-normalisation-logging-audit-and-reporting) supplies its own stable versioned invalid-line, revision-conflict, denied, expired, merge-conflict, source-unavailable and checkout-unknown codes with the **actual source-known or uncertain outcome**, allowlisted mapping, audience policy and trusted opaque correlation. Error Normalisation returns safe public versus technical projections, category, `messageKey` and **qualified** retry guidance. An unknown Order result must never be converted into a blanket retry instruction. This stateless library has no basket authority, stores, transport or Audit intake. This conceptual interface is not a verified runtime export.

**SEO consumer (SEO draft PR #133, conceptual; 23 November 2026):** SEO supplies its own versioned validation, sitemap-generation, provider-submission and policy-denial codes, source-confirmed or uncertain operation outcome, trusted safe correlation, approved mapping and audience-specific disclosure profile to the library's existing pure normalise/classify/sanitise/message functions. The library returns stable safe codes, categorisation, message keys, separate public/technical projections and *advisory* retry classification. SEO alone controls original business state, durable SEO outbox, authorised retry/reconciliation and independent submissions to Logging, Audit and Reporting. The library generates no log, evidence receipt, report, transport action or proof of indexing. See [SEO canonical conceptual contract](../../services/seo/services-record.md#seo-error-diagnostics-accountable-evidence-and-analytical-reporting--public-contract). No implementation API is asserted.


**Office host composition:** its host supplies source-owned error codes, approved versioned mappings, disclosure intent and trusted correlation for Office panel/configuration-adapter failures. The library returns only sanitised, qualified error/message references; Office remains a non-data-owning composition, while each source retains business outcomes and recovery. No direct Office integration package or event is implied. See [Office conceptual contract](../../compositions/office/compositions-record.md).

**Time & Attendance conceptual consumer (TA-01–TA-06 owner-approved; PR #143):** Time & Attendance passes its source-owned versioned codes for invalid time, stale revision, forbidden approval, provider uncertainty, incomplete periods and disputed corrections, plus approved mappings, trusted opaque correlation, disclosure profile and the authoritative known/unknown operation outcome. The pure library returns safe user/API and technical projections, stable message keys and advisory retry guidance. It performs no time command, retry, Logging submission, Audit delivery or Reporting aggregation; Time & Attendance retains those responsibilities.

The library **requires no other capability**. For Privacy consumers, inputs comprise source-owned consent/rights/retention error definitions, approved mapping, observed (or uncertain) operation outcome and disclosure context; outputs are bounded safe API/user and separate technical error projections, stable codes and optional advisory retry characteristics. Privacy controls actual rights/consent state and may separately send the minimised technical projection to Logging, a distinct accountable source event to Audit, and authorised case facts to Reporting. The normaliser never delivers to those capabilities itself. Domain services and external adapters supply recognised errors, source-owned code definitions, operation truth, safe context, mappings and disclosure policy. It returns normalised error results to those callers. Callers may then pass minimised projections through **Logging** (diagnostics), **Observability** (metrics/traces), **Audit** (selected accountable source facts), **UI/Localisation** (accessible wording), **Notifications** (delivery), **Reporting** (analysis) or **Workflow/Scheduler** (source-authorised recovery). Each retains its own published contract and authority. None is a hard dependency.

### Semantic constraints

- Distinguish `rejected`, `failed`, `cancelled`, `timed_out`, `uncertain` and `unknown`; only the authoritative caller can assert committed/not-committed business state.
- Do not assume an HTTP status, provider timeout or thrown exception proves whether a remote transaction committed. Retry hints require idempotency and source policy.
- Input is untrusted; bounded validation, redaction, depth/size limits and no unexpected getter execution are required. Never expose exception messages/stacks or protected source existence by default.
- Codes and message keys are stable and versioned; safe representation may be adapted to RFC 9457 for HTTP, without exposing internal error implementation types.
- Pure, synchronous and deterministic for the same explicit inputs; no network access, file access, persistence, background side effects or ambient configuration.


### Order consumer example — approved conceptual direction

Order may supply its source-owned error code/version, qualified acceptance/rejection/unknown outcome, safe context, allowlisted mapping and disclosure purpose to **normalise/classify/sanitise** and receive safe API/diagnostic projections and qualified retry hints. Order retains outcome truth and retry/idempotency policy. The library does not emit a log, Audit record or Reporting event, does not interpret a provider timeout as non-commit and has no network/store dependency. [Order's reciprocal contract](../../capabilities/order/capability-record.md#error-diagnostics-accountability-and-analytics--approved-reciprocal-contract) is owner-approved conceptually, not a verified exported interface.

### Organisation Model consumer example (conceptual; 22 November 2026)

[Organisation Model](../../architecture/organisation-model.md) may supply its own versioned validation/publication codes and approved mapping, trusted correlation, source-confirmed outcome and disclosure profile. This library returns safe public and technical normalised projections with qualified retry/unknown status. Model alone owns schema decisions, publication/revision truth, recovery, and which minimised outputs it sends independently to Logging, Audit or Reporting. An error timeout is **not** proof of commit or rollback. This is an illustration of the proposed pure function contract, not an implemented integration.

### `site-hosting` consumer illustration — 23 November 2026 (owner-approved conceptual consumer; implementation unverified)

`site-hosting` supplies source-owned, versioned hostname-claim/verification/routing error codes and definitions, actual/uncertain outcome, bounded disclosure-specific metadata and opaque correlation to the pure normalise/classify/sanitise operations. It receives versioned safe code/category/message key, public/diagnostic projections and advisory retry classification; it alone determines commitment, replay safety, access and provider reconciliation. The library does not send Logging, Audit or Reporting messages or turn DNS/proxy timeouts into confirmed domain-state changes. This is an approved Site Hosting-side conceptual use, not a shipped integration. [Source record](../../services/site-hosting/services-record.md#error-normalisation-logging-audit-and-reporting).
