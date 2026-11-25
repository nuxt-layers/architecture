# Temporal Gateway — canonical conceptual integration-library record

**Conceptual status:** Complete for owner review; **TG-01–TG-05 and the standards, open-source, reciprocal-contract and optional host GUI recommendations approved on 23 November 2026**. **Implementation status:** Not verified; the implementation's root `CONTRACT.md` was unavailable. **Merge status:** Draft PR #139; no merge approval.

**Identity:** `temporal-gateway`; independent server-side TypeScript **infrastructure integration library**, governed by [accepted ADR-0015](../../decisions/ADR-0015-infrastructure-integration-libraries.md). It is neither a Nuxt capability layer nor an ADR-0011 stateless library. Historical review location: `docs/capabilities/temporal_gateway` (former compatibility pointer) (pointer only). This record describes the *agreed ideal*, not proven exports of [the implementation repository](../../../RESOURCES.md#ref-b86d6231).

## 1. Purpose and ownership

Provide one maintained adapter to the open-source Temporal SDK for connections, technical scheduling/execution operations, workers and status observations. The host selects/deploys Temporal and supplies configuration, secrets and trusted scopes. Other capabilities use provider-neutral, host-composed ports; they never need gateway private code.

**The library owns:** technical SDK adaptation, connection/worker lifecycle, validation, provider identifier mapping, technical operation receipts, uncertainty and reconciliation observations, and sanitised readiness/errors. **It does not own:** business tasks or schedules (Scheduler); human approvals (Workflow); process progression (Process); events, outboxes or message custody (Message Queue); domain decisions, authorisation, tenancy, business records or durable schemas; platform Logging, Audit, Reporting or Observability; infrastructure provisioning; generic network routes or screens. Provider-held Temporal histories are *infrastructure state*, not gateway-owned data.

**Independent operating mode:** the library is usable as a Node.js package without Nuxt. Temporal operations require a configured, reachable Temporal service; without it they report unavailable/unsupported, never success. A caller may independently provide another executor; this library is not a fallback execution engine or universal provider-agnostic workflow service.

## 2. Idealised public input contract (TG-01)

| Source → gateway | Required input and validation | If missing, stale or invalid |
|---|---|---|
| **Trusted host:** connect/configure | Endpoint, namespace, authentication/TLS, bounded timeouts, allowed queues/scopes, compatible SDK/server and deployment role | Reject/fail closed; never infer a tenant's authority from a namespace |
| **Host worker deployment:** register/start/drain/stop | Registered handler names, queue, code/build version, concurrency, drain/heartbeat limits | Reject unknown, duplicate or incompatible handlers; failed drain remains explicit |
| **Scheduler:** technical schedule commands | Caller-owned stable schedule reference, revision, interpreted timing, registered target, operation/idempotency key, safe payload reference; create/update/pause/resume/delete | Reject conflicting revision or unsupported time form; ambiguous provider result needs reconciliation |
| **Scheduler, Workflow or Process:** dispatch/run/signal/cancel | Authorised source-owned execution reference and revision, requested technical operation, registered handler, safe bounded arguments, correlation, deadline and idempotency context | Reject unauthorised, unsupported, contradictory or malformed operation; never decide business eligibility |
| **Clock via host:** time semantics | Trusted instants, time zones/deadlines or explicit clock service | Preserve semantics and provider representation; do not silently invent an effective time |
| **Authorised host/operator:** inspect/reconcile | Scope-limited technical query, correlation, operation identity, permitted tenant/resource context | Reject unknown/forbidden scope; unavailable is not an empty list |
| **Temporal provider:** observations | Connection, schedule, run and worker acknowledgements, changes, failures, timeouts and recovery evidence | Treat as potentially delayed, partial or inconsistent; never infer business finality |

Configuration is runtime-validated. Every operation carries *only the fields needed* from trusted tenant/resource scope, revision, correlation, operation ID, time, provider version and audience/disclosure policy; no mandatory universal request object. Signals and provider events never grant permission.

## 3. Idealised public output contract (TG-01–TG-02)

| Gateway → authorised consumer | Guaranteed meaning and boundary |
|---|---|
| **Host:** client/worker lifecycle | Technical readiness/degraded/draining/closed state, current compatibility/version and last observation; readiness is not task completion |
| **Scheduler:** schedule/dispatch receipt | Versioned provider operation reference, `accepted`, `rejected` or `unknown`, safe code and correlation; Scheduler alone owns intended due-time, catch-up, retries and business schedule status |
| **Workflow/Process:** execution/signal/cancel receipt | Provider technical reference, acknowledged/unknown disposition, observed progress; never an approval, completed process stage or domain transaction |
| **Registered handler/owner:** attempt callback | Technical invocation, attempt/deadline/heartbeat/cancel context and observation; handler rechecks domain eligibility and prevents duplicate business effects |
| **Host/operator:** query and reconciliation | Scoped provider state, source and observed-at time, provider/adapter version, freshness/completeness and explicit absent/unknown distinctions |
| **Error Normalisation / Logging / Audit / Reporting via separate bounded interfaces** | Safe technical error facts, diagnostics, qualifying accountable evidence references and authorised aggregate observations as detailed in §5; no new authority transferred |

**Always distinguish:** submitted request → provider accepted/rejected/unknown → provider-observed outcome → *source-owner-confirmed business result*. An accepted receipt cannot establish worker completion; a timeout cannot establish failure or rollback. Redacted views preserve source, tenant scope, revision, effective/observation time, correlation and freshness. Historical evidence never overrides a newer domain revision.

## 4. Commands, queries, technical callbacks and recovery (TG-02, TG-04)

**Commands:** connect, start/drain worker, submit/update/pause/resume/delete technical schedule, start/signal/cancel execution and reconcile a prior request. Check trusted host/owner authorisation, namespace/queue and revision before calling Temporal; return accepted/rejected/unknown plus safe failure reason, ID and recovery guidance. A cancellation request is not proof of cancellation; client close is not work cancellation.

**Queries:** authorised technical health, worker/queue status, schedule/run observation and uncertainty reconciliation. Label source and observation time, revision, data coverage and staleness. A missing provider, unknown ID and denied scope must not collapse to the same success/empty response.

**Callbacks:** worker attempts and provider observations can be duplicated, delayed or reordered. They are *technical* notifications only; gateway owns no business-event outbox. Owner handlers must be idempotent and reconcile their own committed state. Never promise distributed exactly-once business delivery, automatic compensation or seamless state migration.

**Lifecycle:** client `unconfigured → configured → connecting → ready/degraded → draining → closed`; worker `registered → starting → polling → draining/stopped/failed`. Timeout, loss of connectivity, incompatible worker versions, conflicting revisions or shutdown failure can leave `unknown`; use stable scoped IDs and fresh provider evidence before unsafe retry. Technical retries are bounded; originators alone decide business retry/catch-up. Migrating SDK, server, namespace or worker code requires versioned mappings, compatible rollout/drain, staged cutover and reconciliation; rollback is not assumed possible.

**Common safe failures:** invalid configuration, unauthenticated provider, forbidden scope, unavailable, timeout/unknown, unsupported feature, stale revision, handler mismatch, resource exhaustion, inconsistent provider result and incomplete drain. Never disclose raw provider errors, secrets, personal payloads or stack traces through public ports.

## 5. Cooperating interfaces and reciprocal ownership

Each connection is **through published host-composed contracts**, not an implicit package import. No cyclic implementation dependencies.

| Partner | Inputs **to gateway** / outputs **from gateway** | Owner and outage semantics |
|---|---|---|
| [Host / infrastructure](../../../RESOURCES.md#ref-d90cb4c3) | Credentials, endpoint, deployment and worker registration → health, operation receipts, safe failures | Host owns Temporal/PostgreSQL, secrets, backups, capacity, security and deployment. Without provider, fail unavailable |
| [Scheduler](../../services/scheduler/services-record.md) | Scheduled technical actions, target/revision/idempotency → provider receipts, run/worker observations | Scheduler owns due/catch-up/retry/business schedule |
| [Workflow](../../capabilities/workflow/capability-record.md), [Process](../../capabilities/process/capability-record.md) | Eligible execution, signal/cancel and source revision → technical run state | Workflow owns approval routing/evidence; Process owns process advancement; neither accepts technical completion as business finality |
| [Message Queue](../../services/message-queue/services-record.md) | Optional host technical signalling only → technical evidence | MQ alone owns committed outbox transport, subscriptions and custody; provider signal is not MQ acknowledgement |
| [Clock](../../services/clock/services-record.md) | Trusted clock/zone/deadline interpretation → provider-compatible observations | Clock owns time meaning, not Temporal execution |
| [Configuration](../../capabilities/configuration/capability-record.md), [Authorisation](../../capabilities/authorisation/capability-record.md) | Host-resolved effective settings, trusted caller, scoped server-side access decision → validated status/rejection | Never let infrastructure identifiers replace a permission check; required decision outage fails closed |
| [Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md) | **Pure local call:** recognised source-owned technical error/code, known-or-unknown disposition, mapping revision, disclosure policy and correlation → safe code/category/message key, public/diagnostic projection and *advisory* retry qualifier | Pure stateless library does not retry, log, audit, report, persist or determine provider result; safe fallback if unavailable |
| [Logging](../../services/logging/services-record.md) | **Independent diagnostic intake:** sanitised worker/provider failure, severity, safe context, known/unknown and correlation → intake/delivery status, authorised diagnostic query, sink health | Logging owns technical records, retention and diagnostics; its receipt proves neither Audit custody nor business success. Outage does not rewrite execution result |
| [Audit](../../capabilities/audit/capability-record.md) | **Source/host-mediated accountable evidence:** privileged worker/schedule changes, denials, manual retry/cancel/recovery; trusted actor, resource, revision, outcome and event ID → accepted/pending/rejected/uncertain custody, integrity/coverage and evidence reference | Operator/host or originating capability owns asserted action and risk-selected outbox; Audit owns evidential custody. Mandatory capture can gate high-risk actions under source policy. Ordinary polling is not Audit evidence |
| [Reporting](../../capabilities/reporting/capability-record.md) | **Authorised technical projections:** unique executions **separate from attempts**, worker readiness, duration, retries/failures/uncertain outcomes, denominators, period, revision, as-of, source, freshness and completeness → derived trends, report/run/export references and lineage for authorised consumers | Reporting owns reports, not technical or business truth. Missing ≠ zero; provider completion ≠ business completion; outage cannot stop execution |
| [Observability](../../services/observability/services-record.md), [Notifications](../../services/notifications/services-record.md) | Optional redacted spans/metrics and operational failure facts → qualified telemetry/alert state through their owners | No hard integration dependency, no default notification recipient |
| [Privacy](../../capabilities/privacy/capability-record.md), [Legal Compliance](../../capabilities/legal-compliance/capability-record.md) | Host/domain-supplied minimisation, disclosure, retention/hold and lawful-scope requirements → safe technical processing/status | Domain, Privacy and Legal Compliance own their decisions, not gateway |

**Receipt boundaries:** error classification ≠ confirmed failure; Logging acceptance ≠ Audit custody; Audit custody ≠ provider or domain success; Reporting output ≠ authoritative state. Never make a failure of optional Logging/Reporting/Observability alter a committed provider operation. No private database reads by cooperating capabilities.

## 6. Configuration, security and privacy (TG-04)

- **Server-side only.** Validate untrusted endpoint, namespace, credentials, queue/worker registrations, payload sizes and timeouts. Host provides scoped TLS/authentication and secrets rotation; prefer current secure transport. Separate development fixtures from production.
- **Tenant isolation.** Trusted caller/assurance and Authorisation apply to every protected operation; task queues and namespaces are *not permissions*. Use opaque, deterministic, versioned, collision-resistant and namespace-scoped resource mappings; bound error disclosures and history/search-attribute access.
- **Replay and resilience.** Idempotency/revision checks at technical boundary; owner handlers commit business state exactly according to their own invariants and handle repeated attempts. Bounded retry/heartbeats, explicit unknown, reconciliation and graceful drain protect continuity.
- **Personal data and retention.** Do not write personal data, secrets or raw provider payloads into metrics/logging by default. Temporal histories/search attributes and infrastructure backups can persist sensitive material: host/domain enforce UK GDPR where applicable, retention, access, holds, residency and deletion. Gateway has no owned SQL schema; assess `STORAGE-REGISTER.md` for any package-created storage. No legal certification implied.
- **Operational responsibility.** Host manages Temporal persistence (including PostgreSQL if selected), deployment, network, backups/disaster recovery, upgrades and operational permissions. Gateway exposes scoped health and evidence; it cannot replace Logging, Audit or Observability.

## 7. Approved standards and open-source policy

**Standards baseline approved by owner.** Apply proportionately; distinguish binding Nuxt Layers governance from supporting control guidance and conditional legal duties:

| Source | Application |
|---|---|
| [ADR-0015](../../decisions/ADR-0015-infrastructure-integration-libraries.md), [ADR-0012](../../decisions/ADR-0012-trivial-composition.md), Capability Standard | Independent compiled library/root consumer contract, ownership, provider-neutral host ports, security and acceptance |
| [OWASP ASVS 5](../../../RESOURCES.md#ref-a1c367d2), [NIST SP 800-53](../../../RESOURCES.md#ref-3fd80945), [NIST SSDF SP 800-218](../../../RESOURCES.md#ref-10dcdd0a) | Platform ASVS L2 baseline, relevant L3 security-sensitive operations, secure controls/development/supply chain |
| ISO/IEC 27001:2022, 27002:2022, 27017:2026 (cloud), 27701:2025 (privacy), ISO 22301:2019, ISO/IEC 25010:2023 | Security, cloud shared responsibility, privacy where applicable, continuity and quality — not library certification |
| [NCSC cloud principles](../../../RESOURCES.md#ref-ca1f56e2), UK GDPR/[ICO guidance](../../../RESOURCES.md#ref-ec0bfbca) | UK cloud security guidance and applicable privacy obligations, qualified by host/domain/legal owner |
| [W3C Trace Context](../../../RESOURCES.md#ref-e45806bf), [OpenTelemetry](../../../RESOURCES.md#ref-de6a7a46), [RFC 8446](../../../RESOURCES.md#ref-0296369e), [RFC 3339](../../../RESOURCES.md#ref-9e9b8c6e) | Redacted distributed correlation, optional telemetry, secure transport, timestamp interchange; Clock owns time semantics |
| [Temporal TypeScript SDK docs](../../../RESOURCES.md#ref-5ba4ac29), [W3C WCAG 2.2 AA](../../../RESOURCES.md#ref-0d1f555e) | SDK version/operation/worker compatibility evidence; accessibility applies to host-owned operator UI only |

**Approved selection principles:** complete publicly available **current** community source, unrestricted free commercial self-host/use/modification/redistribution under a permissive licence, active maintenance, stable releases, version-specific licence/transitive dependency review, security/SBOM and compatibility acceptance. Avoid open-core flagship restrictions, source-available or intentionally delayed community editions, mandatory paid services and redundant workflow/MQ/database engines.

| Role | Approved recommendation | Scope |
|---|---|---|
| **Core** | [Temporal TypeScript SDK](../../../RESOURCES.md#ref-83603142) (MIT), [Zod](../../../RESOURCES.md#ref-1e3efac4) (MIT) | SDK integration and runtime validation; select only necessary SDK packages |
| **Optional adapters** | [OpenTelemetry JS](../../../RESOURCES.md#ref-8e380f73) (Apache-2.0); [Pino](../../../RESOURCES.md#ref-5f05d959) (MIT); [Ajv](../../../RESOURCES.md#ref-a164796d) (MIT); [prom-client](../../../RESOURCES.md#ref-e1a3131d) (Apache-2.0) | Existing host telemetry/logging ports first; Ajv only if JSON Schema needed; avoid duplicate validators |
| **Host infrastructure** | [Temporal Server](../../../RESOURCES.md#ref-77f2db20) (MIT); [PostgreSQL](../../../RESOURCES.md#ref-fa79609e) (PostgreSQL); optional [Temporal UI](../../../RESOURCES.md#ref-5d38eb94) (MIT) | Host-managed services; **not** gateway-owned persistence or GUI |
| **CI/user acceptance** | [Vitest](../../../RESOURCES.md#ref-c28ef17c) (MIT), [Testcontainers Node](../../../RESOURCES.md#ref-68d019ff) (MIT) | Development/testing only, not library runtime |

These are **approved design recommendations**, not assertions of installed versions, licensing audits, completed release compatibility or implemented API. Inspect exact released dependencies, bundled/enterprise terms and maintenance/security posture before implementation acceptance. Avoid the archived old Temporal Web UI.

## 8. GUI and host presentation (TG-03; additional design approved)

**The library always remains headless.** No Nuxt routes, Vue components, capability menu, logo, dashboard or independent network service. **Approved optional host UI:** authorised **Infrastructure → Temporal** operations dashboard, *view-only first*, as part of the host's secured administration area.

The inspected [application-test-template](../../../RESOURCES.md#ref-f1f7cc47) has `/` homepage (no sidebar), `/admin` test dashboard, a collapsible/responsive sidebar with Capabilities/Theme Manager and the top bar/Appearance menu. Derived tests add their own navigation; **do not edit the shared template**. Its Theme Manager `test` mode exposes unauthenticated development APIs, and 'Not signed in' is a placeholder, **not real IAM**. Theme Manager's own [published contract](../../../RESOURCES.md#ref-484ee610) illustrates screen integration but notes current composition limitations.

**Host UX:** a protected `/admin/infrastructure/temporal` route is illustrative, not an implemented gateway route. The first page has **Overview**, **Workers**, **Executions/Schedules** and **Failures/Reconciliation** tabs or sections. Display connection/worker health, queue/version/drain status, scoped provider observations, retries/uncertain outcomes, source/correlation, freshness, and authorised links to the owning domain dashboard. Optional redacted **Connections/Compatibility** details and links to Reporting-owned trends; no second reporting engine. Start read-only; any host-provided retry, cancel, drain or change action demands server-side scope/permission, step-up where warranted, owner policy/revision/idempotency check, confirmation and Audit capture. Never offer 'force success'. Host owns navigation, translations and Theme Manager semantic tokens; apply WCAG 2.2 AA and responsive keyboard-accessible interfaces. No confidential payloads, raw stacks or secrets. The headless API works without screens.

## 9. Conceptual acceptance scenarios

| Input / condition | Required result; authority |
|---|---|
| Trusted host/Temporal available | Scoped connection/worker readiness; gateway technical state only |
| Invalid settings, missing credentials or forbidden tenant | Fail closed, no worker/provider action; host/Authorisation scope |
| Scheduler sends valid due schedule and revision | Provider accepted/rejected/unknown receipt; Scheduler retains business schedule |
| Provider times out after submission | `unknown`; reconcile provider before unsafe retry; gateway technical state |
| Same operation replayed or worker crashes after domain commit | Stable operation correlation; handler prevents duplicate business effect; source owner |
| Workflow run reaches technical completion | Does not approve business action; Workflow/Process recheck current authority and revision |
| Worker drain or server outage | Readiness degraded/draining; no false cancellation or success |
| Error normalisation or Logging unavailable | Safe fallback/error; independent diagnostic health, no false provider outcome |
| High-risk operator change with mandatory Audit requirement | Authorised source/host applies its required capture gate; Audit owns evidential receipt |
| Reporting queries partial/unknown provider data | Authorised, versioned technical coverage; missing not zero and attempts not unique runs |
| User opens optional operations UI | Read-only scoped views through host permissions; risky action unavailable without independent authorisation |
| Caller requests business approval, event transport or gateway-owned persistence | Explicitly unsupported; relevant domain/MQ/host owns action |

## 10. Decisions, evidence and completion

**Approved conceptual decisions (owner, 23 November 2026):** **TG-01** small versioned technical contract; **TG-02** explicit known/rejected/unknown, reconciliation and idempotent handlers; **TG-03** headless library and optional host-owned view-first operator GUI; **TG-04** trusted isolation, versioned mappings and safe migration; **TG-05** this canonical infrastructure-library record, with historical capability pointer. Owner also approved the standards guidance, fully permissive open-source shortlist and the Error Normalisation/Logging/Audit/Reporting boundaries. No opposing provisional statement supersedes these approvals.

**Conceptually resolved:** purpose/classification; owner/exclusion map; native lifecycle; input/output contracts and command/query/callback meaning; uncertainty; provider/dependency direction; isolation/security/privacy; standards and libraries; reciprocal contracts; GUI/headless mode; acceptance examples. No further conceptual decision is presently identified.

**Technical evidence remaining (owner agreed, separate implementation authorisation required):** obtain or publish actual implementation root `CONTRACT.md` (not retrievable in this review); verify exports, required settings, TypeScript/Node/SDK/server versions, worker registrations/versions/drain, schedule/cancel semantics, failure codes, compatibility and storage register. CI/user to verify independent Node consumer, real provider execution, retries/reconciliation, cross-tenant security, supply-chain licences and recovery. No implementation changes or tests in this blueprint PR.

**Pre-merge gate:** compare latest accepted governing and blueprint `master`, concurrent PRs (especially Scheduler #131 and Reporting), ownership/cycles, all reciprocal edits, links, revised base, Git mergeability, checks and protected-branch policy. Owner must **explicitly authorise merge**; use protected squash-only workflow and verify resulting state. A conceptually complete specification is not a deployed, certified or accepted implementation.

**Maintenance:** revise this *single* canonical specification and affected reciprocal records **in place** on PR #139, preserving agreed decisions and replacing outdated text, not appending disconnected review history. Git/PR history preserves evolution. No implementation repository, normative governing ADR or shared test template is changed by this review.
