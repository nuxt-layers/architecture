# Message Queue — Service Record

**Artefact classification:** Technical service (CLS-09, approved 24 November 2026); any historical Foundation/Platform capability label below refers to governing/review responsibility, not blueprint placement.

**Catalogue name:** `message-queue` · **Directory:** `docs/services/message-queue/` · **Classification:** Platform  
**Conceptual status:** **Complete and owner-approved** (MQ-01–MQ-10, standards, permissive-library evaluation policy, cross-capability interfaces and optional operator GUI, 22 November 2026). **Design review:** PR #94; completed with explicit owner approval. Merge and deployment states are tracked by GitHub, not inferred here.  
**Implementation status:** Unverified. `nuxt-layers/message-queue` has only a minimal README; no root `CONTRACT.md` was retrievable on 22 November 2026. No implemented API, deployment, contract version, operational health, security compliance or test result is asserted.  
**Authority:** Accepted `architecture-rules` ADRs and [Capability Standard](../../capability-standard.md) take precedence. This is a non-normative design specification, not the implementation's published contract. Reconcile the latest `master` before merge.

## Purpose, authority and scope

Message Queue delivers **committed, source-owned outbox messages** to authorised subscribers, with recoverable custody, routing, attempts, acknowledgements and administrative controls. The approved Event Bus consolidation (former review: event bus consolidation) (EB-05) means there is **one** message-transport capability, not a separate `event_bus`.

**Message Queue owns:** scoped subscription/routing definitions and revisions; transport message references; durable custody and producer hand-off checkpoints; consumer leases, attempts, acknowledgements, bounded retry and backpressure; dead-letter/quarantine, controlled replay; transport/provider state and its own operational read models and committed administrative events. Store the minimum payload/reference and metadata needed to provide documented delivery guarantees.

**Other owners retain:** producing capabilities own transactions, event definitions/schema meanings and **their own durable outboxes**; consumers own business effects, deduplication and authorisation; Scheduler owns due-time work; Workflow owns approvals and orchestration; Notifications owns recipient/channel policy and user-notice outcomes; Audit owns evidential custody; Logging owns technical diagnostics; Reporting owns derived reports; Observability owns telemetry; Infrastructure/host owns provisioned databases, workers, connections and secrets; Federation/Integrations own external trust, mappings and exchange outcomes. Events (the domain capability) owns organised activities, not transport events. No private data-sharing, second source of truth, hidden host relay, direct dependency cycle or implied business completion.

**Initial supported scope:** committed source-owned outbox distribution only (MQ-07). Direct non-outbox publication is deferred until its source authority, durable acceptance and recovery model are separately justified. Headless operation is complete; optional administration screens do not change core behaviour. Prefer one provider-neutral framework-independent core with an optional Nuxt adapter and separable presentation; deployment begins as a modular monolith unless justified otherwise.

## Native lifecycle, reliability and provider boundaries

1. **Register and validate:** accept only approved producers, event schemas/versions, consumer subscriptions and scoped routing policy. Verify origin, tenant and resource disclosure rights, payload bounds, idempotency, version and effective configuration. A received event is never permission to perform a business operation.
2. **Recoverable hand-off:** ingest only committed producer-outbox items through public recoverable claim/ack/checkpoint or equivalent ports. Do not release a producer item until the specifically agreed, **durable transport custody** boundary is proven. On transport outage, the producer's outbox remains recoverable; MQ does not reverse the source transaction or claim acceptance.
3. **Transport state:** distinguish source pending, transport accepted, dispatch pending, in-flight/leased, acknowledged, retry-wait, quarantined/dead-letter, expired/retired and **unknown** receipt. An acknowledgement means only the consumer's documented transport boundary was met, not that the business effect, Audit intake, external provider action or notification succeeded.
4. **Failure and recovery:** use stable source-message and distinct attempt identities, bounded backoff/jitter, lease recovery, consumer deduplication, poison-message quarantine, fair tenant quotas, circuit-breaking/backpressure and version-safe scoped replay. Provider timeout or ambiguous acknowledgement stays **unknown** pending evidence/reconciliation; retry must respect idempotency. **At-least-once-compatible**, not distributed exactly-once, delivery is the approved baseline. Ordering, retention, throughput and recovery guarantees are stated only for verified modes and partitions.
5. **Provider withdrawal and migration:** validate adapter compatibility, pause/drain or reconcile backlog, preserve source and transport checkpoints, record uncertain hand-off and verify cutover/rollback before claiming success. A provider setting is not evidence the connection is ready. An absent durable adapter fails before any successful custody receipt.
6. **Transport-owned events:** publish committed changes to MQ's own routing, control and lifecycle through its own durable outbox where needed. Do not convert producer domain events into MQ-owned facts or create recursive uncontrolled fan-out.

**Infrastructure selection (approved evaluation direction, not installed dependency):** assess PostgreSQL **PGMQ** with the existing SQL driver first, compare `pg-boss` only if Node worker ergonomics justify it, and retain **NATS JetStream/NATS.js** as a provider-neutral dedicated-broker alternative. Kafka/Pulsar are conditional scale options. No broker, Temporal gateway or PostgreSQL extension type leaks into the public contract; evaluate actual PostgreSQL 18 support, backups, WAL/retention, performance, migration and operational load. Temporal Gateway is an infrastructure adapter, **not** Message Queue ownership.

## Idealised public contract

The interfaces below describe **business meaning and ownership**, not existing exports, method names, HTTP routes or broker SDK types. A future root implementation `CONTRACT.md` must publish concrete versions, operations, permissions, failure codes and supported guarantees.

### Inputs: what Message Queue accepts

| Source | Input / use | Required validation and absence |
|---|---|---|
| **Producer capability** | Committed outbox item: source event ID, owner, event type/schema version, resource reference/revision, tenant/disclosure scope, minimal payload or pointer, trace/correlation, causation and recoverable checkpoint | Validate commitment provenance, idempotency, scope, limits, compatibility and trusted origin. Unsupported/forged/invalid inputs are refused or quarantined; absent transport leaves source outbox pending |
| **Authorised consumer** | Scoped registration/change/revocation, supported message versions and delivery target; delivery acknowledgement, negative acknowledgement and stable attempt/token | Authenticate and re-authorise registration **and dispatch**; reject revoked, cross-tenant, stale, mismatched or unsupported subscriptions; an ack cannot assert business success |
| **Operator** | Pause/resume, quarantine/release, bounded retry/redrive/replay, inspection, approved provider cutover and permissible retention changes | Separate privilege per action; fresh assurance, explicit scope and confirmation; conditional Workflow approval and mandatory Audit/recovery rules; deny on unknown critical authority |
| **Host and context owners** | Durable transport/store and worker ports; trusted Clock time; validated Configuration and Infrastructure health; IAM Integration caller/tenant and Authorisation decisions; Privacy/Legal Compliance purpose, retention/hold and disclosure constraints | Required ports fail closed when missing. Do not accept browser claims, untrusted time, tenant-parent inheritance or settings that weaken security floors |

### Outputs: what Message Queue publishes

| Recipient | Output and meaning | Limit |
|---|---|---|
| **Producer** | Accepted/rejected/**unknown** durable custody receipt, transport/message ID, source checkpoint, refusal reason, pending/pressure status | Transport receipt only; never implies source or subscriber business completion |
| **Subscriber** | Authorised versioned delivery envelope, source event identity/revision, minimal permitted data/reference, attempt/lease, replay flag, scope, provenance and correlation | Source retains event meaning; duplicates and reordering possible; subscriber checks fresh business authority |
| **Consumer/operator/host** | Subscription and delivery status; attempt history; backlog, retry, dead-letter, lease, replay and adapter/worker health; command accepted/pending/refused/uncertain results | Respect tenant scope, permissions, time/version, completeness, redaction and provider uncertainty |
| **Audit / Logging / Observability / Reporting** | Separately qualified accountable control events; sanitised diagnostics; lag/depth/attempt metrics; authorised source transport counts and read models | Their receipts and interpretations are independent; no raw sensitive payload by default |
| **Other authorised listeners** | Committed **MQ-owned transport control/lifecycle** events when supported | Never reinterpret transport state as an originating domain event or application outcome |

**Operations:** public commands cover subscription registration/change/revocation, recoverable message intake, acknowledgement/nack, queue pause/resume, quarantining, bounded replay/redrive and adapter hand-over; every command states permission, idempotency, preconditions and committed/pending/unknown/refused result. Queries cover authorised status, attempts, subscription/configuration version, backlog, redacted failures and provider state with observation time, completeness and provenance. Events cover only committed **MQ-owned** transport changes. The contract does not impose a universal request DTO or common provider SDK.

**Cross-cutting invariants:** trusted tenant/caller/service and assurance, owner resource/revision, source event/attempt/idempotency identity, policy/version/effective time, trusted Clock instant, privacy classification, permitted recipients, provider evidence freshness and bounded retention. Reject unknown security-critical context safely; preserve explicit unknown/partial outcomes and historical traceability; allow independently authorised recovery/export without violating legal holds.

## Cross-capability inputs and outputs

These are **directional public contract relationships**, not direct package imports or mandatory installation of every neighbour.

| Cooperating owner | MQ needs from them | MQ supplies to them |
|---|---|---|
| **Domain producers** (Identity, Authentication, Booking, Events, Configuration, Invoice, Integrations, Legal Compliance and others) | Their committed versioned outbox messages and producer-custody checkpoint | Accepted/unknown receipt, scoped routing, delivery attempts/failures; source meaning remains theirs |
| **Consuming domain capabilities / Search / Notifications** | Authorised subscriptions, compatibility, acknowledgement and processing policy | Scoped message deliveries and transport-only receipts, never business effect or user-notice outcome |
| **IAM Integration / Identity / Authentication / Authorisation** | Trusted caller, service/tenant identity and assurance; request-time permission verdict | Access/control refusals and accountable administration facts, never new grants |
| **Configuration / Clock / Infrastructure** | Approved effective settings/policy version, trusted times, durable provider/worker ports and health | Applied configuration, schedule/lease/expiry dispositions, transport and provider readiness |
| **Privacy / Legal Compliance** | Purpose, disclosure, qualified retention/hold constraints and jurisdiction/effective-time evidence where relevant | Minimised processing, retention/control and transport evidence; never legal adjudication or human worklists |
| **Scheduler / Workflow** | Conditional scheduled-work source messages or independent approval for sensitive MQ controls | Ordinary transport status and authorised events; no execution, due-time or approval ownership |
| **Federation / Integrations** | Approved external exchange trust, webhook mapping and local source-event instructions | Local transport/custody receipts only; not remote acknowledgement, peer trust or provider completion |
| **Error Normalisation, Logging, Audit, Reporting, Observability** | Pure error interpretation; diagnostic/evidence/reporting/telemetry public ports as needed | Qualified error/diagnostic/evidence/analytical inputs as described immediately below |

### Error Normalisation, Logging, Audit and Reporting

| Partner | MQ supplies to their input | MQ gets back from their output | Authority / outage behaviour |
|---|---|---|---|
| **[Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md)** (stateless library) | Local call: MQ-owned stable error code, namespace/mapping version, known or uncertain transport outcome, trusted context, disclosure rules | Versioned, sanitised code/category, `messageKey`, bounded correlation, optional severity and **advisory** retry qualifier | Library performs no persistence, logging or transport. MQ alone decides custody, retry, replay and provider reconciliation; safe local fallback on unknown error |
| **[Logging](../logging/services-record.md)** | Redacted attempt/worker/provider failure, severity, code, correlation and safe operational context | Log-specific receipt, permitted diagnostic lookup and sink/loss/health status | Technical diagnostics only; loss never rewrites durable queue state or substitutes for Audit |
| **[Audit](../../capabilities/audit/capability-record.md)** | Eligible **committed MQ-owned** privileged replay, subscription/policy, security, purge, routing and cutover facts through owned outbox/approved Audit intake, with actor, tenant, policy and revision | Evidence accepted/pending/rejected/unknown, custody ID, integrity and completeness/coverage | Audit alone owns evidence; mandatory high-risk intake must have explicit hold or durable recovery, never invented acceptance |
| **[Reporting](../../capabilities/reporting/capability-record.md)** | Authorised versioned counts, unique messages versus delivery attempts, retry/dead-letter, lag/age, throughput/provider health, period, denominator, provenance and completeness | Derived authorised KPIs, reports, trends, export and as-of/refresh/lineage limitations | Reporting cannot infer business completion or Audit coverage; outage cannot block MQ transport |

**Example:** broker acknowledgement times out. MQ records **uncertain**, uses Error Normalisation for a safe public error, emits redacted technical details to Logging and metrics to Observability, and exposes qualified performance counts to Reporting. If an operator subsequently authorises a replay, MQ records a new attempt under the **same source event ID**, and separately submits any required privileged control evidence to Audit. None of these secondary outcomes changes the underlying source business event.

## Security, privacy, governance and failure controls

**Default security:** OWASP ASVS 5 Level 2, Level 3 for critical risks; W3C WCAG 2.2 AA for optional screens. Validate untrusted event content and source identity, minimise payloads, protect encryption/secrets, isolate tenant queues/subscriptions, enforce least-privilege service and operator access, quotas, replay rate limits, schema validation, redaction, revocation-aware dispatch, versioned policy floors and recoverable unknown outcomes. No parent-tenant access or unrestricted host-super-admin payload inspection. High-risk control changes need fresh assurance, independent approval where required, and auditable evidence.

**IAM and policy:** use host-composed IAM Integration context where appropriate. Identity owns principal/tenant truth, Authentication assurance, Authorisation access verdicts and MQ its own transport invariants. A queued event never grants standing permission. Configuration may provide approved scope/precedence and effective revision, but cannot disable mandatory floors. Neither a setting nor a broker receipt is proof of operational readiness.

**Privacy/legal:** apply purpose, tenancy, UK GDPR/Data Protection Act 2018 where applicable, minimisation, retention and deletion/right-to-restrict policies, encryption, lawful disclosure and qualified legal holds. Legal Compliance owns applicable obligations and legal review cases, not Queue transport or human-review dossiers. Record data created or caused in the eventual `STORAGE-REGISTER.md`; no certification is claimed.

**Safe degraded operation:** unavailable broker leaves producer outbox pending; lost consumer acknowledgement remains unknown/retriable; poison messages quarantine; removed subscription stops further unauthorised dispatch; unavailable ordinary Logging/Reporting is signalled but does not undo transport. Mandatory Audit intake or unresolved critical permission/retention law follows a defined fail/hold/durable-recovery rule. Never claim success on uncertain provider state.

## Optional GUI and presentation

**Decision: optional operator-only presentation, headless by default.** The [application-test-template](https://github.com/nuxt-layers-test/application-test-template) README describes `/admin`, a collapsible **Capabilities** sidebar, and Theme Manager at `/theme-manager`; the host has a top-bar Appearance selector and a **Not signed in** placeholder, **not actual security**. Theme Manager's root [`CONTRACT.md`](https://github.com/nuxt-layers/theme-manager/blob/master/CONTRACT.md) documents semantic styling and pages but also flags incomplete ADR-0012 composition. This is a **representative local-only test pattern**, not proof MQ pages exist. Host owns routing/navigation; MQ owns its own public optional views/actions.

**Navigation:** host **Capabilities → Message Queue** → conceptual `/message-queue` dashboard (path is illustrative, not a published route), with links to:

| Screen | Information and permitted action |
|---|---|
| **Dashboard** | Tenant-authorised health, backlog, oldest pending age, accepted/in-flight/acknowledged/retrying/dead-letter/**unknown** status, last observation and degraded/no-access/empty states |
| **Queues and subscriptions** | Scope, consumers, event versions, limits, active/paused status and permitted registration/update/revocation |
| **Deliveries and failures** | Safe ID/time/status search, redacted attempt timeline, normalised errors, freshness and retry state; no raw payload by default |
| **Dead-letter and recovery** | Quarantine and version-safe bounded retry/replay, impact/scope preview, reason and confirmation, explicit pending/unknown result; no unrestricted replay-all shortcut |
| **Administration** | Provider/worker/lease health, applied configuration version, backpressure, protected pause/cutover/purge only for appropriately authorised operators |
| **Operational reports** (optional) | Reporting-owned derived trends, throughput and exports with denominator and completeness disclosures |

**Permissions:** conceptually separate status read, delivery read, subscription manage, replay and provider/retention manage; concrete action names belong in implementation `CONTRACT.md`. The sidebar does not grant access. Enforce fresh server-side IAM/Authorisation, protected Workflow approvals and Audit/recovery guarantees. UI reads only authorised MQ public contracts; no direct database, broker admin credentials or private source tables.

**Presentation quality:** responsive/keyboard/screen-reader accessible, WCAG 2.2 AA in light/dark modes, localised labels and Clock-aware dates, clear status announcements, contrast and focus, reduced motion, Theme Manager semantic vocabulary and `ui` components. Distinguish source event ID from attempt/replay ID, and accepted from acknowledged or independently confirmed consumer processing. A derived local **synthetic-fixture** application may test all states without modifying the shared template or exposing production credentials. No GUI is required when presentation is disabled.

## Standards and technical references

Standards are **design guidance within their actual scope**, not claimed certifications, mandatory vendor selections or substitutes for applicable law.

| Issuer / reference | Purpose and applicability |
|---|---|
| [ISO/IEC 19464:2014 / OASIS AMQP 1.0](https://www.iso.org/standard/64955.html) | Optional interoperable wire protocol for an AMQP 1.0 adapter; **not required** and distinct from AMQP 0-9-1 |
| [ISO/IEC 27001:2022](https://www.iso.org/standard/27001), [27002:2022](https://www.iso.org/standard/75652.html) | Security management and technical control guidance: access, crypto, supplier and operations |
| [ISO/IEC 27701:2025](https://www.iso.org/standard/27701), [ISO 22301:2019](https://www.iso.org/standard/75106.html) | Privacy management and business continuity/restoration controls |
| [CNCF CloudEvents 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) | **Preferred** portable metadata/envelope mapping; event ownership, authorisation and delivery are separate |
| [AsyncAPI 3.x](https://www.asyncapi.com/docs/reference/specification/v3.0.0) | **Preferred** machine-readable message/operation/schema contract complementing human-readable `CONTRACT.md` |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/), [OpenTelemetry messaging conventions](https://opentelemetry.io/docs/specs/semconv/messaging/messaging-spans/) | Correlation, traces, metrics and redacted diagnostics; external trace context is **not** trusted IAM |
| [W3C WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/), [IETF RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) | Accessible optional UI; conditional HTTP Problem Details representation, not mandatory HTTP transport |
| [UK NCSC Cloud Security Principles](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles), [ICO security guidance](https://ico.org.uk/for-organisations/uk-GDPR-guidance-and-resources/security/a-guide-to-data-security/) | UK security and privacy guidance; applicable UK GDPR is **law**, not a technical specification |
| [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [OWASP ASVS 5.0](https://asvs.owasp.org/) | Risk-based US control catalogue and specialist application verification; apply platform ASVS L2/L3 baseline |

**Traceability:** CloudEvents/AsyncAPI support MQ-01/02/04/10; ISO 22301 and NIST continuity inform MQ-03/08/09; ISO 2700x/27701, NCSC, ICO and ASVS inform MQ-05/07; W3C and OpenTelemetry inform MQ-06/10. Confirm editions during implementation. No AMQP or ISO certification requirement is introduced.

## Fully open-source, commercially permissive implementation candidates

**Approved policy:** all **required** runtime features and source must be available without payment, proprietary extensions, delayed community snapshots or non-OSI source-available restrictions. Validate current upstream releases, reproducible build, complete feature set, transitive licences, advisories and distribution terms **at adoption**. This is a shortlist for implementation evaluation, not proof of installed software.

| Component / source | Licence | Approved disposition |
|---|---|---|
| [PGMQ](https://github.com/pgmq/pgmq) | PostgreSQL License | **Initial PostgreSQL queue candidate**: durable messages/visibility/acknowledgement/archive; MQ must still provide domain-neutral routing, fan-out, authorisation, checkpoint, dead-letter and operational semantics |
| [pg-boss](https://github.com/timgit/pg-boss) | MIT | **Secondary PostgreSQL/Node comparison** for worker ergonomics; do not duplicate Scheduler or Workflow job authority |
| [NATS JetStream](https://github.com/nats-io/nats-server) + [NATS.js](https://github.com/nats-io/nats.js) | Apache 2.0 | **Preferred independent dedicated-broker alternative** when real throughput/distribution needs justify it |
| [Apache Kafka](https://github.com/apache/kafka), [Apache Pulsar](https://github.com/apache/pulsar) | Apache 2.0 | **Conditional large-scale alternatives**; defer unnecessary broker complexity |
| [amqplib](https://github.com/amqp-node/amqplib) | MIT | Conditional Node client for **AMQP 0-9-1 only**, not AMQP 1.0, if that adapter is justified |

**Excluded from the preferred strict shortlist:** RabbitMQ's community core is real MPL-2.0 open source but commercial editions have additional features and MPL is weak copyleft; Graphile Worker and BullMQ have MIT cores but optional paid Pro capabilities (BullMQ also ordinarily uses Redis-compatible storage). [Valkey](https://github.com/valkey-io/valkey) is genuinely BSD-3-Clause open source but adds an unnecessary stateful service for the PostgreSQL-first design. None is falsely labelled closed-source; the exclusion reflects the approved **complete required feature set, commercial permissiveness and operational simplicity** policy. Never depend on edition-exclusive HA/replay/security or closed control planes.

**Provider selection acceptance:** benchmark representative payload size, bursts, consumer fairness, lag, failure and recovery, PostgreSQL 18 compatibility, WAL/storage, cluster/worker operation, migration, backups and exact SDK/licence coverage. Do not assert performance or SLA from marketing/version claims. Hetzner VPS/Coolify and existing PostgreSQL are the deployment baseline; no new broker is required merely because it is available.

## Conceptual acceptance scenarios

| Case / input | Required observable output and owner |
|---|---|
| Committed source event + healthy Queue | Durable custody receipt; authorised dispatch; source remains owner of its event |
| Broker offline at commit | Source outbox pending; no false acceptance or business rollback |
| Duplicate, stale, unordered or replayed event | Stable source ID, distinct attempts; consumer deduplicates/rechecks own current state |
| Forged source, invalid schema or wrong tenant | Reject/quarantine with sanitised error and no cross-scope disclosure |
| Provider times out after send | **Unknown** custody/delivery until reconciliation; bounded idempotent retry |
| Consumer fails, unsubscribes or is revoked | Stop unsafe dispatch; retry or dead-letter as appropriate; no claim of consumer business completion |
| Privileged replay or retention/policy change | Fresh IAM/Authorisation, conditional independent approval, scoped confirmation, durable MQ control event and separate Audit eligibility/receipt |
| Logging or Reporting unavailable | Continue safe core transport, disclose diagnostic/reporting gaps |
| Mandatory Audit intake unavailable | Hold or preserve independently recoverable evidence under risk policy; never invent Audit acceptance |
| Provider migration with retained backlog | Pause/drain or reconcile, explicit checkpoint and uncertainty; version-safe cutover/rollback |
| Optional GUI absent or authorised viewer denied | Headless service still usable; server-side denial even if sidebar link is visible |
| Unsupported direct publish, cross-tenant broadcast or distributed exactly-once claim | Stable explicit not-supported/refused result |

These are **conceptual acceptance cases**, not executed tests or evidence of published interfaces.

## Decisions, remaining implementation obligations and sign-off

- **MQ-01–06 — approved:** one Platform transport owner; source-owned outboxes; at-least-once-compatible semantics; provider-neutral public ports; mandatory security and recovery; optional operator-only GUI and no standalone Event Bus.
- **MQ-07 — approved:** direct non-outbox publishing is **outside initial scope**.
- **MQ-08 — approved:** evaluate PostgreSQL/PGMQ first; retain replaceable broker ports and independent evidence before claiming durability or production SLOs.
- **MQ-09 — approved engineering obligation:** prove durable hand-off/checkpoint, replay/idempotency, crash/ambiguous acknowledgement recovery and provider migration. Approval does **not** mean validation has passed.
- **MQ-10 — approved implementation acceptance obligation:** publish independently usable root `CONTRACT.md` (real exports, supported modes, permissions, errors and failure semantics), `STORAGE-REGISTER.md`, threat model, provider/compatibility proof, independent consumer and CI acceptance; if a Nuxt adapter is supplied, meet ADR-0012's one-call/50-line host budget and applicable minimal-host tests.

**Also owner-approved:** cross-capability boundaries (including Error Normalisation/Logging/Audit/Reporting), national/international/specialist standards guidance, complete-source permissive-library evaluation and the optional sidebar-based GUI design.

**Conceptual conclusion:** **complete and owner-approved**, subject to continuing precedence of accepted governing architecture and later reciprocal changes. **Not implementation-ready or legally certified by conceptual approval alone.** Before any merge, check current governing/master, approved contracts, reciprocal records, links, CI, mergeability and protected squash policy. This record does not authorise implementation repository edits or local tests.


## Notifications reciprocal conceptual interface — 19 November 2026

**Status: Notifications NOT-01–NOT-10 owner-approved 22 November 2026 (conceptual only), not implemented or independently acceptance-verified.** Notifications owns its committed notice state, attempts and durable outbox; Message Queue transports Notification-owned lifecycle facts with duplicates/replay and does not own notices, recipient choices or channel provider deliveries. Transport acknowledgement is not provider hand-off or human receipt. Message Queue PR #94 is approved conceptually but remains open; preserve its outbox/transport boundary. This bounded reciprocal note preserves the independent message_queue review and creates no direct package import.

**Integrated refinement (21 November 2026, now conceptually approved):** Message Queue transports the Notifications-owned durable lifecycle outbox, not the business-origin event or channel delivery evidence. At-least-once delivery, replay and consumer deduplication are expected; an MQ acknowledgement never proves a notice was sent.

## Reciprocal interface — Observability review (22 November 2026)

**Status: Observability interface owner-approved (OBS-01–OBS-10, 22 November 2026); MQ-01–10 approvals remain intact and adapter unverified.** MQ's bounded public status of depth, lag, attempts, lease, DLQ, failure and readiness may feed [Observability](../observability/services-record.md) for derived health and alerts. MQ owns transport custody and retry semantics, originating domains own outboxes and event meaning. Telemetry does not prove consumer effect or transport delivery; tenant scope, freshness and loss must be explicit.

## Process conceptual review — reciprocal interface (22 November 2026)

**Status: Process PROC-01–PROC-07 and supplementary safeguards owner-approved conceptually (22 November 2026) in draft PR #121; this neighbouring capability's design and public runtime integration remain independently unapproved/unverified.** [Process canonical conceptual contract](../../capabilities/process/capability-record.md). Process publishes committed source-owned process-definition and instance transition facts via its own durable outbox; Message Queue transports/retries/deduplicates according to its own contract, never owns Process records or authorises a transition. Delivery acknowledgement is not business completion; Process reconciles uncertain downstream responses. This additive note does not complete the message_queue review or alter its approved authority.

## Publisher canonical review — reciprocal conceptual interface (22 November 2026; draft PR #125)

**Status: Proposed Publisher-side alignment; does not override this capability's approved decisions or assert an implemented integration.** [Publisher canonical conceptual contract](../../capabilities/publisher/capability-record.md).

Publisher owns committed document lifecycle events and its durable outbox, and emits at-least-once transport-ready messages with event IDs and no content bodies; Message Queue handles delivery, retry and acknowledgement, not approval or document state. Delivery acknowledgement does not prove a consumer reconciled or a remote publication occurred. Outbox retention and replay must preserve source authority.

## Scheduler reciprocal conceptual interface — 23 November 2026 (draft PR #131)

**Status: Scheduler concept and reciprocal boundaries owner-approved on 23 November 2026; implementation adapter unverified.** [Scheduler conceptual record](../scheduler/services-record.md). Scheduler owns durable scheduled registrations, due occurrence/attempt/retry history and its own committed lifecycle outbox. Message Queue may deliver those outbox events and owns transport custody, subscription, leases and delivery retries. MQ acknowledgement neither executes the job nor proves a source-domain outcome. This keeps owner-approved MQ-01–10 intact and proposes no provider-specific coupling.

## Temporal Gateway infrastructure integration reciprocal note — 23 November 2026

**Status: TG-01–TG-05 owner-approved conceptual technical boundary under accepted ADR-0015 (23 November 2026); not a completed review of this neighbouring capability or a verified implementation API.** [Temporal Gateway approved conceptual infrastructure library contract](../../adapters/temporal-gateway/adapters-record.md); draft PR #139.

Temporal Gateway does not own transport subscriptions, source outboxes, event custody or MQ acknowledgement semantics. MQ owns committed-message delivery and retry; a technical Temporal signal/worker receipt can be transported or observed through public host ports but cannot substitute for an authoritative MQ delivery receipt or business event. Neither imports the other's private implementation.



## Workflow conceptual review — reciprocal alignment (23 November 2026; draft PR #150)

**Status: Proposed Workflow-side consolidation, not new approval of this neighbouring capability or an implemented integration.** [Workflow's idealised public contract](../../capabilities/workflow/capability-record.md) keeps human review-route definitions, approver eligibility/assignment, delegation and qualified approval evidence with Workflow; each originator retains its own authoritative source record and final decision. Message Queue transports Workflow's committed outbox events with at-least-once-compatible delivery; transport acceptance, replay or acknowledgement neither grants approval nor commits a source transaction.

Dependencies are host-composed public ports/events, not private storage or automatic package imports. Resolve concurrent draft changes against latest master before merging.
