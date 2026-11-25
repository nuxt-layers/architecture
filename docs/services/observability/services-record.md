# Observability — Service Record

**Artefact classification:** Technical service (CLS-09, approved 24 November 2026); any historical Foundation/Platform capability label below refers to governing/review responsibility, not blueprint placement.

**Identity:** `observability`; proposed **Platform capability** (governing catalogue classification remains a candidate until separately adopted). **Conceptual status:** owner-approved OBS-01–OBS-10 and refinements on 22 November 2026. **Implementation status:** no verified `nuxt-layers/observability` repository, root `CONTRACT.md`, running service or independently tested consumer. This is an **approved conceptual specification, not a published executable API or a claim of certification**.

**Authority and evidence:** Accepted ADRs and the normative [Capability Standard](../../capability-standard.md) prevail over this blueprint. Opening/current checked governing `architecture-rules/master`: `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint `master`: `361566988ac53c55f6135e8acfa46cd5b013d7a0`. draft PR #111. An organisation name search found no implementation repository; this does not prove global absence. Separate implementation, CI, compliance and merge evidence remains outstanding.

## Purpose, ownership and boundary

Observability gives authorised operators an accurate view of **technical performance, reliability, distributed traces, monitoring coverage and operational alerts**. It owns signal/instrument definitions, accepted minimised measurements and spans, retention/aggregation rules, SLI/SLO evaluation, derived health, alert rules and lifecycle, operational alert acknowledgements/silences, source-qualified monitoring coverage and its own administrative history. This durable technical lifecycle makes it a service, **not** a stateless library or merely a Nuxt screen.

**It does not own** source transactions or business outcomes; infrastructure operation or repair; Clock's time semantics and time-source correction; Logging's diagnostic records and sink receipts; Audit's evidential custody and integrity; Reporting's authored reports; Notifications' recipient/channel delivery; IAM permissions; provider credentials; or formal incident investigation, case management, escalation, remediation or legal conclusions. An alert is a **technical interpretation**, never evidence that a payment failed, a business decision was made or an Audit record was accepted.

The core is framework-independent and **headless**; a Nuxt Layer may supply an optional presentation adapter. A host composes public ports without private imports, mandatory cross-capability cycles or a universal request object.

## Native service, lifecycle and reliability

1. **Configure:** register monitored service/source, versioned metric or trace definition, unit, safe labels, expected coverage, source/tenant scope, retention/sampling/cardinality budget, health/SLI/SLO rules, thresholds, missing-data policy, maintenance window and optional provider. Configuration supplies effective policy where composed; Observability validates its own monitoring semantics.
2. **Ingest:** authenticate trusted producer and scope; validate schema/version, IDs, units, timestamps, size, sensitivity, label count and tenant authority. Return qualified intake status; reject or count malformed, unauthorised, over-budget or sensitive data without storing secrets.
3. **Process:** retain bounded samples/spans and checkpoints, aggregate observation windows, correlate using opaque trace IDs, and calculate qualified latency, traffic, error rate, saturation, SLI/SLO and error budget with source, count, cut-off, freshness, sampling, time quality and known gaps.
4. **Evaluate:** apply versioned thresholds, durations, hysteresis, deduplication, missing-data and suppression rules; emit committed Observability alert transitions when state truly changes. **Condition** (`normal/pending/firing/resolved/unknown/stale`) is separate from **operator annotation** (`acknowledged/silenced` with actor, reason, expiry). Acknowledging or silencing **never** resolves the underlying firing condition; silence affects delivery policy, not source truth.
5. **Operate:** expose authorised health/alerts, optional notification intent and history. Notifications owns who receives messages and whether they were delivered. Unavailable telemetry, a failed collector or missing instrumentation is **unknown/degraded**, never silently green. Self-monitor drops, ingestion backlog, evaluation faults and exporter state.
6. **Recover and retire:** deduplicate by trusted source and sample/operation identity; handle late/out-of-order measurements within bounded correction windows and preserve versions of already emitted alerts. On source retirement, export/erasure, provider withdrawal and TTL expiry, enforce scope and policy, disclose residual pending delivery and inability to reconstruct expired/sampled history.

**Native minimum:** in-process bounded ingestion, lightweight metric/tracing storage or deliberately restricted ephemeral buffers, rolling health evaluation, basic rules/alert lifecycle, read/query/administration, policy and monitoring-pipeline status. **Durability is conditional:** persistent mode uses capability-owned durable state and an outbox for committed events; ephemeral mode expressly cannot promise durable alert history, replay or delivery. Refuse startup where the selected policy demands durability but none is available. No mandatory SaaS, collector, Prometheus, Jaeger, broker, Temporal service, monitoring cluster or GUI. Monitoring failure must not block unrelated business transactions, except where independently defined security/evidential risk controls require a safe failure by the source owner.

## Approved idealised public input contract

These are **business-level ports**, not asserted method names, routes or released TypeScript types.

| Input / owner | Required information and purpose | Validation, absence and authority |
|---|---|---|
| **Submit telemetry** — instrumented capability or approved adapter | Bounded counters, gauges, durations, trace/span relationships, error codes, correlation, trusted resource/producer and observation time | Verify version, units, sample identity, time, classification, origin, tenant scope, quotas and labels. Source remains authoritative for its operation. No producer means `unknown/no data` for that service |
| **Supply source health** — Infrastructure, Logging, Audit, MQ, Scheduler, Workflow, Caching, Reporting, domain owner | Sanitised readiness, backlog, drops, processing delays, error/failure/coverage status and qualified source time | Optional per source; preserve provenance, freshness and gaps. No private table or bulk log/evidence ingestion |
| **Set monitoring configuration** — authorised host/operator | Create, revise, retire instruments, thresholds, SLI/SLO, maintenance, sampling, retention, exporter and budget policy | Request-time authorisation, validated scope, safe defaults, optimistic revision and idempotency; deny invalid/unsafe changes |
| **Manage alert annotation** — authorised operator | Acknowledge, silence, unsilence and inspect an alert, with reason/expiry and expected revision | Operator permission and audit-worthy actor context; never change actual fault condition |
| **Supply time and protection context** — host/Clock/Infrastructure, IAM and Privacy/Legal Compliance | Trusted elapsed time and wall-time quality; authenticated principal, current decision, tenant/resource, permitted purpose, retention, disclosure and legal hold | Underlying trusted time and server permission are essential; named capability packages are optional. Fail closed when a required decision cannot be made |
| **Supply provider evidence** — optional telemetry/storage/export adapter | Qualified provider availability, stage-specific acknowledgements, quotas, fault, residency and supported version | No undocumented provider trust; missing external confirmation stays `unknown`, not delivered |

No default capture of credentials, raw request/response bodies, payment data, stack traces, session secrets, personal health records, private IAM predicates or unrestricted user labels. Telemetry context and tracing baggage are **not** identity or permission evidence.

## Approved idealised public output contract

| Output / consumer | Promise and limitations |
|---|---|
| **Ingestion receipt** → producing source | Accepted, rejected, duplicate, queued, limited, degraded or unknown with safe reason/receipt and **stage**; local acceptance does not prove durable persistence, remote export or business success |
| **Metrics, trace and SLI/SLO queries** → authorised host/operators and qualified Reporting | Time-bounded/paginated measurements and sanitised span relations, unit, count/denominator, source revision, sampling, coverage, freshness, gaps and uncertainty; not complete causality or business accounting |
| **Health/readiness/coverage** → operators and eligible host/source consumers | Healthy, degraded, unavailable, stale or unknown by source/window; collector drops, lag, missing data, last observation and monitoring's own status explicitly shown |
| **Alert queries and transitions** → operator UI, optional Notifications/incident consumer | Rule, severity, source scope, measurement window, condition, annotation, revision and correlation/evidence pointer; Notification hand-off is not delivery or incident resolution |
| **Administrative commands/results** → authorised operator/Privacy/Configuration | Effective settings, revisions, export/retention/erasure/replay results and pending/blocked/unknown stages with redacted provenance; not legal clearance |
| **Committed Observability events** → optional Audit/MQ and authorised subscribers | Source-owned material rule changes, monitoring admin actions, protected exports, acknowledgement/silence and alert transitions using a durable outbox when configured; never re-label source business events as Observability events |

All reads and exports are server-authorised for tenant, resource, purpose and sensitivity, including rows, labels, groupings and correlations. Each result distinguishes **empty, denied, unknown, withheld, stale, sampled and incomplete**. Small-group or cross-tenant aggregates need explicit disclosure review; no default inference across tenants.

**Commands:** authorised, revision-checked, idempotent, with accepted versus completed status, bounded retries, safe errors and no direct remote repair or business action. **Queries:** bounded period, pagination, permitted grouping and clear provenance/time quality. **Events:** committed own state transitions, versioned and delivered at least once when a durable transport is configured; consumers handle duplicates, replay and ordering. No distributed exactly-once promise. Use shared caller, tenancy, resource, correlation, classification and time fields **only where relevant**, not a forced platform-wide envelope.

## Cooperating capabilities — public-contract exchange

Each source owns the original operational fact. Observability owns only the **derived technical measurement or alert**. Absence of an optional source/consumer disables that integration, not the native core, and never means `healthy`. Ports are host-composed and directional, not required package imports.

| Counterpart | Observability receives | Observability supplies / authority boundary |
|---|---|---|
| [Infrastructure](../../infrastructure/infrastructure/infrastructure-record.md) | Resources, capacity/readiness, provider/storage health, time-sync offset/uncertainty | Qualified trends, health and alerts; Infrastructure operates and repairs providers |
| [Clock](../clock/services-record.md) | Instant/duration/window semantics (or host equivalent); Infrastructure owns actual time-source quality | Freshness/time-skew warnings; does not certify NTP |
| [Logging](../logging/services-record.md) | Sink drops, throttling, lag, readiness, permitted correlation | Log-pipeline metrics/alerts and trace reference; Logging owns diagnostics and sink receipts |
| [Audit](../../capabilities/audit/capability-record.md) | Safe capture gaps, verifier health and backlog | Operational alerts and risk-selected committed Observability admin evidence; Audit owns receipts, integrity and investigation |
| [Reporting](../../capabilities/reporting/capability-record.md) | Optional report-job delay/error/refresh health | Authorised technical aggregates, alert/coverage trends; Reporting owns reports, derived joins, distribution and publication |
| [Message Queue](../message-queue/services-record.md) | Queue depth, age, retries, lease/failure/DLQ and source delivery status | Queue metrics/alerts; MQ owns transport, source owns durable outbox/event meaning |
| Scheduler / Workflow | Task, worker and execution lag, failures and readiness | Execution-health trends and alerts; no workflow retries/compensation authority |
| Caching | Hit/miss, eviction, freshness, invalidation lag and provider faults | Cache-health monitoring; no cache key/value access |
| [Notifications](../notifications/services-record.md) | Optional routing and delivery outcome/unknown | Alert intent with severity/reference; Notifications owns recipients, channel, actual delivery |
| [Configuration](../../capabilities/configuration/capability-record.md) | Effective scoped settings and governance/policy revision | Applied/denied monitoring settings and health, not a second configuration source |
| Identity / [Authentication](../../capabilities/authentication/capability-record.md) / [Authorisation](../../capabilities/authorisation/capability-record.md) | Trusted principal/assurance/tenant/decision and limited IAM health | Protected monitoring reads plus safe IAM latency/failure/revocation monitoring, never raw decisions or credentials |
| Privacy / Legal Compliance | Purpose, classification, retention, erasure, disclosure, provider and jurisdiction limits | Monitoring data inventory and scoped operations with explicit evidence/uncertainty; no legal opinion |
| Asset and other domain owners | Approved source processing latency, outbox/backlog and technical failure/readiness indicators | Scoped operational health/alerts only, not the domain's authoritative outcome |

**Error Normalisation** is a [pure stateless library](../../libraries/error-normalisation/stateless-library-record.md) with a [separate conceptual contract](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs): the **originating capability** supplies an error plus its source-owned mapping and receives a stable safe code, category, optional severity, retry qualification, message key and explicitly uncertain outcome. That caller independently submits minimised diagnostics to Logging, required accountable evidence to Audit, safe metric/span attributes to Observability and authoritative business outcomes to Reporting. The library owns **no telemetry, log, evidence or report feed**, no events, calls or dependency on these services. Observability never treats a normalised timeout as proof of a failed payment. Logging diagnostic intake, Audit evidential custody, Observability telemetry processing and source business completion are **four separate outcomes**, none inferred from another.

An optional error-rate example: Payment Gateway reports an uncertain provider timeout. It may log an allowed technical code, send risk-selected source evidence to Audit and submit a bounded metric to Observability. Observability may alert on an elevated timeout rate; Reporting combines qualified technical rates with **Payment Gateway-confirmed** settlement outcomes. No automated claim of remote non-commitment, no private payment details or raw exception crosses the monitoring port.

## Configuration, infrastructure, providers and protection

**Storage and service profiles:** (1) native bounded in-process/ephemeral for local or low-volume use; (2) native durable storage with own rule/alert/outbox schema for accountable state and replay; (3) optional self-hosted collection/metrics/trace adapters for larger volume; (4) explicitly consented, policy-approved external export. Provider selection and credential management remain host-controlled, with replaceable interfaces and no provider query language or storage schema in public contracts. Before migration, check data format, compatibility, supported retention and measurement meaning; on provider withdrawal/revocation stop new exports, account for retries and prior-provider copies, report partial transfer, and preserve provenance. Sampled/expired data is never declared reconstructible.

**Threat model and policy:** Governing OWASP ASVS 5 Level 2, risk-appropriate Level 3 for privileged telemetry/administration; validated producer identity, request-time server authorisation, strict tenant isolation (ingest, storage, cache, query, trace search, export and erasure), controlled correlations, output sanitisation, TLS/secret protection, injection defence and limits on volume/cardinality/CPU/network/storage. Admin actions use source-owned outbox and Audit cooperation when required. Configurable safe default budgets, retry/backpressure, collection latency, trace/signal TTL and cost/volume visibility prevent the monitor from harming the system it measures.

**Privacy:** document captured fields, purposes, lawful basis/consent, sensitivity, source identity, sampling and retention, third-party recipients, export/erasure/hold and cookies/storage in the future `STORAGE-REGISTER.md`. Optional behavioural collection is off without justified authority; pseudonymous trace IDs may still be personal data. Apply relevant UK GDPR, PECR and other jurisdictional constraints with Privacy/Legal Compliance; no implied legal exemption for technical telemetry and no employee surveillance/marketing by default. Legal hold takes an explicit authorised, scoped path; erasure results must not falsely certify third-party deletion.

**Error and failure semantics:** distinguish unsupported schema, untrusted source, forbidden scope, stale/unknown measurements, wrong time quality, quota exhaustion, dropped/sampled data, evaluator fault, storage full, delayed outbox and failed/unknown external export. Show source coverage and monitor pipeline health independently. If an essential security decision fails, protected operations fail closed; a dashboard exception cannot weaken authorisation.

## Standards, interoperability and open-source technology

**Approved design baseline:** Prefer interoperable, widely maintained specifications, safe defaults and complete-source, commercially permissive software. These choices **guide** the concept; they do not imply ISO certification, legal compliance, an installed stack or approval of every dependency. Accepted Nuxt Layers ADRs, the Capability Standard, OWASP ASVS 5 Level 2 (higher assurance where justified), WCAG 2.2 AA and jurisdiction-specific obligations take priority. Review specification stability and licence/NOTICE/transitive obligations before implementation.

| Source / standard | Design use |
|---|---|
| [OpenTelemetry](https://opentelemetry.io/docs/specs/otel/overview/) and [semantic conventions](https://opentelemetry.io/docs/specs/semconv/) | Preferred vendor-neutral metric, trace, resource and export semantics; pin compatible **stable** component/convention versions rather than assuming all modules are stable |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/) | Cross-service trace identifiers only, never tenant identity or access authority; minimise baggage and sensitive correlations |
| ISO/IEC 25010:2023; ISO/IEC 20000-1:2018 (applicable amendment) | Define measurable software quality, reliability, efficiency and service-level management, not a compulsory ITSM platform |
| ISO/IEC 27001:2022, 27002:2022 and 27035-1:2023 | Map proportionate security monitoring and incident detection; leave formal response cases and evidence custody to their owners |
| [NIST SP 800-137](https://csrc.nist.gov/pubs/sp/800/137/final), [800-53](https://csrc.nist.gov/pubs/sp/800/53/rev-5/upd1/final), [800-92](https://csrc.nist.gov/pubs/sp/800/92/final) | Continuous security monitoring and control coverage, respecting separate Logging and Audit duties |
| [UK NCSC](https://www.ncsc.gov.uk/guidance/introduction-logging-security-purposes) and [ICO](https://ico.org.uk/for-organisations/) | Risk-based protective monitoring, purpose limitation, retention, lawful disclosure and minimisation |
| [IETF RFC 3339](https://www.rfc-editor.org/info/rfc3339/) and [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) | Portable timestamps and HTTP problem details **when HTTP is used**; do not require HTTP in the core interface |
| [W3C WCAG 2.2 AA](https://www.w3.org/TR/wcag/), BCP 47, CLDR/ECMA-402 | Accessible, multilingual, timezone-aware monitoring screens |
| [Google SRE monitoring guidance](https://sre.google/sre-book/monitoring-distributed-systems/) | Latency, traffic, errors and saturation as useful defaults; service-specific SLI/SLO, error-budget, window and missing-data rules. Engineering guidance, **not a formal standard** |

**Fully published source and permissive licence shortlist** — licences below refer to the named upstream repositories, not an unchecked collection of dependencies:

| Candidate / code | Licence | Preferred role and caveat |
|---|---|---|
| [OpenTelemetry JS](https://github.com/open-telemetry/opentelemetry-js); [JS Contrib](https://github.com/open-telemetry/opentelemetry-js-contrib) | Apache-2.0 | **First choice** for Nuxt/Nitro/Node instrumentation; opt into mature modules only and review auto-capture for secrets |
| [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector); [Collector Contrib](https://github.com/open-telemetry/opentelemetry-collector-contrib) | Apache-2.0 | Optional filtering, batching and export pipeline; verify individual component maturity |
| [Prometheus](https://github.com/prometheus/prometheus) | Apache-2.0 | Optional mature metrics storage, queries and evaluations; not a compulsory separate service |
| [Jaeger](https://github.com/jaegertracing/jaeger) | Apache-2.0 | Optional trace storage/search; validate its selected storage backend and operational overhead |
| [Prometheus Alertmanager](https://github.com/prometheus/alertmanager) | Apache-2.0 | Optional alert grouping/silencing adapter, **not** the final owner of Observability alert decisions or Notifications delivery |
| [Node Exporter](https://github.com/prometheus/node_exporter); [Blackbox Exporter](https://github.com/prometheus/blackbox_exporter) | Apache-2.0 | Optional host/endpoint monitoring sources; require scoped deployment access |
| [prom-client](https://github.com/siimon/prom-client) | Apache-2.0 | Optional Prometheus-native Node instrumentation alternative; avoid duplicating signal models |
| [Apache SkyWalking](https://github.com/apache/skywalking) | Apache-2.0 | Complete-source alternative integrated observability platform, **not** another mandatory parallel stack |

**Exclusions:** Do not make Redis, Elasticsearch, Neo4j, VictoriaMetrics or SigNoz open-core/proprietary enterprise features part of the required design. [Grafana](https://github.com/grafana/grafana) and [Tempo](https://github.com/grafana/tempo) have publicly licensed AGPL code, which is genuine open source but **not permissive** and therefore falls outside the user's selected licence policy; do not call it closed-source. Each candidate still requires a current review of full upstream source versus released features, licence, security maintenance, notices, component maturity and source-to-release consistency.

**Recommended deployment:** Start with OpenTelemetry JS and a bounded native backend. Add Collector, Prometheus and Jaeger only if monitoring volume and cross-service tracing warrant them; add Alertmanager/exporters when justified. Keep external vendors, query languages, TS SDK types and physical database design out of public contracts. No requirement to run a separate monitoring cluster, SaaS subscription or message broker on a small host.

## Presentation and host integration

**Optional GUI, headless by default.** The public Observability service never depends on Nuxt, Theme Manager, a browser or the dashboard. The host controls navigation, route mounting, branding, authentication and permissions. An optional presentation layer consumes only public Observability commands/queries and Theme Manager's **public semantic tokens**, not private implementations.

**Verified representative:** [`nuxt-layers-test/application-test-template` README](https://github.com/nuxt-layers-test/application-test-template/blob/master/README.md), [`app/app.vue`](https://github.com/nuxt-layers-test/application-test-template/blob/master/app/app.vue), [`app/pages/admin.vue`](https://github.com/nuxt-layers-test/application-test-template/blob/master/app/pages/admin.vue) and [Theme Manager `CONTRACT.md`](https://github.com/nuxt-layers/theme-manager/blob/master/CONTRACT.md) (read-only, 22 November 2026). Home is `/`, the test dashboard `/admin`; a responsive, collapsible sidebar has **Capabilities → Theme Manager**, a shared top bar and Theme Manager **Appearance** control. A derived Observability test application adds **Capabilities → Observability**, an optional `/admin` card and suggested `/observability` landing route without changing the shared shell. Paths below are **illustrative**, host-configurable, not implemented APIs.

| Suggested screen / route | Public contract and user task | Permission |
|---|---|---|
| **Overview**, `/observability` | Current scoped health, impact, critical alerts, SLI/SLO, latency/traffic/errors/saturation, last update, sampling and blind spots | Operator read |
| **Services**, `/observability/services` and detail `/:id` | Filter monitored services; service metric graphs **and equivalent tables**, source status, SLO/error budget, safe correlated trace/log links | Scoped operator read |
| **Traces**, `/observability/traces` | Sanitised sampled span timelines, bounded search, uncertainty/missing spans, independently authorised Logging link | Technical operator |
| **Alerts**, `/observability/alerts` | Active/pending/acknowledged/silenced/recovered views; guarded acknowledge/silence/unsilence with reason, revision and duration; delivery hand-off versus Notifications delivery | Operator read; elevated commands |
| **Rules**, `/observability/settings` | Edit instruments, thresholds, maintenance, sampling, TTL, budgets, provider rules; validate and show version/diff | Monitoring administrator |
| **Pipeline**, `/observability/pipeline` | Collection drops, backlog, export, storage/quota cost, time-quality and monitoring blind spots; owner-specific remediation links | Operator, selected admin actions |
| **Data**, `/observability/data` | Scoped export, retention, erasure/hold and migration status with accepted versus completed stage | Privileged administrator |

**UX requirements:** Put impact, blind spots, health and alerts first; keep detailed configuration secondary. Indicate healthy/degraded/unavailable/stale/unknown and empty/unsampled/withheld/denied distinctly. Show timestamps, source, uncertainty and refresh state, including partial/failed data and retry options. Optional refresh must not imply guaranteed real-time delivery. Alerts never appear resolved merely because someone acknowledged them. Hide unauthorised UI actions **and** enforce request-time access server-side. Production requires real access authority: the template's **unauthenticated Theme Manager test mode and `Not signed in` placeholder are not production security**.

**Presentation standards:** WCAG 2.2 AA, keyboard/screen reader/focus, mobile reflow, reduced motion, labels rather than colour-only severity, charts with text/table equivalents, accessible configuration forms, localisable message keys (BCP 47/CLDR/ECMA-402), Clock/host time formatting and consistent theme tokens (`bg-fill-*`, `text-pen-*`, `border-edge-*`). Respect host-selected light/dark/system presentation; do not implement a second theme or leak tenant/trace secrets in URLs, titles or analytics.

## Conceptual acceptance cases

These are **design scenarios, not executed tests**.

| Scenario / input | Expected output and owner |
|---|---|
| No SaaS or broker; valid small metric stream | Qualified time-window metrics/health from native mode; durable history only when configured (Observability) |
| No telemetry from expected service; stale NTP-qualified source | `unknown/stale` with coverage/time uncertainty, never green (Observability, source/time owner) |
| A high-age MQ backlog | Versioned threshold creates one deduplicated firing alert; recovery uses actual queue health (MQ owns queue, Observability alert) |
| Operator acknowledges or silences a firing alert | Annotation/notification behaviour changes, **condition stays firing** until measured recovery; privileged admin transition eligible for Audit (Observability) |
| Tenant A requests Tenant B metrics/traces/export | Server denies, including grouped inference/correlation routes; no data leakage (Authorisation + Observability enforcement) |
| Untrusted source sends oversized labels, secret or unsupported event | Reject/minimise with safe reason and bounded loss accounting; never retain secret (Observability) |
| Duplicate or late sample/replay, corrected history | Deduplicated accepted stage, qualified correction within bounds and versioned alert history, no doubled event (Observability) |
| Exporter/provider offline after local receipt | Preserve local-versus-remote processing distinction, bounded retries/backpressure, explicit unknown/failed export (Observability/provider) |
| Logging sink drops logs, Audit verifier unavailable | Separate operational alerts and neither false log delivery nor Audit evidence guarantee (Logging/Audit source; Observability evaluator) |
| Notification fails after alert raised | Alert remains active, hand-off and actual message-delivery failure separately visible (Observability/Notifications) |
| Reporting consumes metrics plus payment outcome | Report marks sampling and coverage; confirmed business outcomes come from payment source, not timeout metric (Reporting/source) |
| Retired instrument or retention/erasure/export request | Policy-qualified expiry or blocked/pending outcome; no invented lost-history reconstruction or third-party deletion (Observability/Privacy) |
| Dashboard attempts infrastructure repair | Unsupported; only links to separately authorised Infrastructure operation (Infrastructure) |
| Derived test host, no GUI package, inaccessible user, light/dark/mobile | Native core works headlessly; `/observability` is optional; protected views denied; accessible themed presentation when installed (host/Observability) |

## Decision register, completeness and next gate

**Approved by owner on 22 November 2026:** OBS-01 ownership and separate domain authorities; OBS-02 headless native/provider neutrality; OBS-03 honest unknown/stale status; OBS-04 trust/isolation/minimisation/budgets; OBS-05 Notifications/Logging/Audit boundaries; OBS-06 versioned commands/queries/events and outbox; OBS-07 acyclic public source status ports; OBS-08 optional accessible sidebar/dashboard; OBS-09 SLI/SLO, freshness, correction and alert annotation distinction; OBS-10 optional provider export/migration/withdrawal. Later owner-approved recommendations are integrated above: formal incident cases outside Observability; low-overhead self-hosted deployment, complete-source permissively licensed OSS candidates, standards mapping, error-normalisation/logging/audit/reporting separation and representative test-host GUI.

**No outstanding conceptual decision blocks this capability record.** Whether a distinct formal incident-management capability should exist is a **separate future classification review**, not an Observability prerequisite. Particular package versions, metric/trace storage, exporter implementations, physical schema, SLO thresholds, numeric retention/sampling budgets, real URL mounts and exact TypeScript exports are **deferred technical/host choices**, not architecture omissions.

**Before implementation/publication:** define an independently usable root `CONTRACT.md`, stable names/types/errors, common host caller/access composition and ~50-line composition budget, chosen storage and `STORAGE-REGISTER.md`, accepted event/outbox design, version compatibility, provider/licence/NOTICE supply-chain checks, deployment security/privacy/legal assessment, resource budgets and resilient native-mode behaviour. User/CI must validate independent host integration, accessibility, tenant isolation, provider outage, failure/replay, cost, policy and authorisation. No current runtime or acceptance evidence is asserted.

**Before merging draft PR #111:** refresh governing and blueprint `master` and relevant parallel reviews, verify accepted ADR status, reciprocal contracts, classification/catalogue/register, link integrity, actual Git mergeability and CI/branch protections; resolve conflicts without discarding parallel approved work. Obtain **separate explicit owner merge approval** and follow protected squash-only policy. No implementation repository edits, local builds/tests or merge have been carried out in this conceptual review.

## Reporting reciprocal conceptual interface — 23 November 2026

**Status:** Proposed in Reporting draft PR #129; not an implemented public API or approval of Reporting's full independent review. See [Reporting canonical conceptual contract](../../capabilities/reporting/capability-record.md).

Reporting consumes separately authorised operational metric series, traces/SLI aggregates and coverage/freshness metadata, and supplies measured report execution/refresh lag, source query burden, export throughput and delivery reliability telemetry to Observability through a purpose-scoped public port. Observability owns operational measurements and alert conditions; Reporting owns only derived report definitions and snapshots. Missing telemetry produces unknown—not zero or verified uptime—and both must avoid personal, tenant and small-cohort inference.

## `site-hosting` reciprocal interface — 23 November 2026 (SH-01–SH-06 owner-approved concept; integration unverified; PR #135)

Site Hosting supplies qualified domain verification and request-resolution health, rejection/latency counts, planned versus applied proxy-route readiness and last-observed timestamps. Observability owns metrics/traces/alerts, not the domain claim source, Audit accountability or provider TLS authority. Unverified/stale provider evidence is not healthy-by-default. [Proposed Site Hosting contract](../site-hosting/services-record.md).
