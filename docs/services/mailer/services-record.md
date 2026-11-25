# Mailer — Service Record

**Artefact classification:** Technical service (CLS-09, approved 24 November 2026); any historical Foundation/Platform capability label below refers to governing/review responsibility, not blueprint placement.

**Status:** Conceptual design complete and owner-approved on 21 November 2026 (MLR-01–MLR-10, approved standards, commercially permissive library recommendations, Logging/Audit/Reporting relationships and advisory GUI). **Implementation, runtime contract, legal conformity and merge readiness are not verified.**

**Review:** Draft PR #90 · Review protocol (former document: review protocol). The authoritative baseline remains accepted ADRs and the [governing Capability Standard](../../capability-standard.md). This working blueprint does not amend governing rules.

## 1. Purpose and ownership

**Mailer** is an independent, provider-neutral **outbound email transport capability**. It accepts approved instructions, validates sending eligibility, submits mail through configured SMTP/API adapters, records dispatch and attempt outcomes, and offers safe retry, reconciliation and operational status. It can run headlessly without Notifications, a GUI or a particular commercial provider. Its durable dispatch state makes it a responsibility-owning service, not merely a stateless formatting library; its implementation may be framework-independent with an optional Nuxt presentation adapter.

**Mailer owns:** dispatch/request and attempt identities, validated sender/recipient envelope for transmission, selected route under approved policy, transport state and time-limited payload references, provider-evidence qualification, suppression enforcement at the transport boundary, permitted retry/expiry/reconciliation, and Mailer-originated committed technical events/outbox. It retains only the personal data required for these duties.

**Other owners retain:** Notifications decides *whether, whom and through which channel* to notify and manages channel preferences; originating domains approve content and retain their booking, invoice, security and other business outcomes; authorised template/content owners render and approve messages; IAM members own identities, authentication and access decisions; Configuration owns approved settings; Privacy/Legal Compliance define applicable constraints; Message Queue transports published events; Audit owns evidential custody; Logging owns diagnostics; Observability owns telemetry; Reporting owns derived reports. Mailer never owns those records or decisions.

**Excluded:** receiving mail; hosted mailboxes, inboxes, folders, conversations, drafts and general email-client functions; generic marketing campaign management or CRM; independent legal authorisation; proof of human receipt/read; business notification orchestration. A separate mailbox/client may be considered later but is **not** a prerequisite now. SMTP delivery and API transport may be supplied by external providers; Mailer does not have to run a mail server.

**Classification and implementation evidence:** Conceptual platform transport capability with headless core and optional administrator views. No separate `nuxt-layers/mailer` implementation repository or published root `CONTRACT.md` was verified in the connected organisation search. Interfaces below are **approved conceptual public interfaces**, not implemented exports, HTTP paths or verified service guarantees. Related capability contracts remain authoritative for their own actual interfaces.

## 2. Native service and lifecycle

The minimal internal records are **MailDispatch** (approved request and current state), **MailAttempt** (route, time, error and provider reference), **MailTransportEvidence** (verified/qualified provider assertion), **MailRecoveryCase** (uncertain or failed operation) and a capability-owned **durable outbox** for committed technical events when persistent operation is claimed. Source business content need not be retained as raw MIME or copied into long-lived records.

A request is validated and **rejected** or **accepted** with a stable dispatch identity. Accepted mail may be **queued**, **attempting**, **provider-accepted**, **provider-rejected**, **retryable**, **outcome-unknown**, **expired** or **cancelled while pending**. Subsequent provider delivery reports, bounces or complaints are separately timestamped **evidence**, which may qualify or revise an earlier technical assessment without erasing the attempt history. Provider acceptance is **not** proof of inbox delivery or human receipt. An accepted request is not proof that the provider has accepted it.

Retries are bounded by purpose-specific expiry, quotas, back-off, idempotency and provider capabilities. If a timeout may have occurred **after** remote acceptance, record **unknown** and reconcile before resend or failover; neither exactly-once delivery nor cancellation of already-submitted mail can be guaranteed. A direct-send mode is allowed only with clearly stated weaker persistence and recovery guarantees; durable processing is mandatory where reliable asynchronous retries are promised. Tenant and sender-domain failures, provider outages and unavailable mandatory policies must produce explicit blocked/degraded states. A mail outage never reverses a committed Booking, Invoice or other source-domain transaction.

## 3. Approved conceptual public contract

The following names are descriptive, not fixed TypeScript signatures. Each protected command, query and event carries only necessary trusted tenant, caller, purpose, source, revision, correlation and time context; the implementation will publish versioned types and errors in its own future `CONTRACT.md`.

### Inputs: commands, facts and provider evidence

| Interface / source | Supplied information and requirement |
|---|---|
| **`submitMail`** — Notifications or explicitly authorised domain | Approved sender and recipient/envelope, subject, plain-text or safe HTML/MIME, permitted attachment references, purpose, source record, expiry, priority and idempotency identity. Validate tenant, access, sender, recipient syntax, content safety, applicable preferences and lawful purpose. Reject unsafe, unapproved or ambiguous requests; never permit an open relay. |
| **`cancelPendingDispatch`, `retryDispatch`, `reconcileAttempt`** — authorised operator or domain | Dispatch/attempt ID, current revision, reason and caller authority. Recheck state and duplicate risk. Cancellation cannot unsend mail already accepted by a provider. |
| **`pauseTransportRoute`, `resumeTransportRoute`, `applySuppression`** — privileged operator | Scoped route/sender or recipient policy reference, reason, current policy version and permission. Enforce owner-approved limits, retention and applicable holds. |
| **Host-composed IAM public ports** | Trusted tenant, subject or service principal, assurance and Authorisation-owned resource/action decision via IAM Integration; deny, unavailable and required step-up fail closed. Mailer separately enforces lawful-send and transport rules. |
| **Configuration and host secrets** | Effective per-tenant provider route, approved sender/domain status, limits, retry, retention and credential *handles*. Missing mandatory route or sender approval means not ready; never publish secrets. |
| **Notifications, Privacy and Legal Compliance** | Preference, suppression, purpose-specific sending eligibility, retention/hold and jurisdictional restrictions where applicable. Unknown mandatory restrictions prevent sending. A recipient address alone proves no consent or identity. |
| **Template/content owner, Localisation, Clock** | Approved resolved content/format, locale and date/time information where required; Mailer preserves meaning without taking template ownership. |
| **Provider adapter and authenticated callback** | API/SMTP response, remote identifier, delivery/bounce/complaint claim, capability and signature/replay evidence. Unverified or cross-tenant callbacks are rejected/quarantined; contradictory or missing evidence remains uncertain. |

### Outputs: results, queries and technical events

| Interface / consumer | Returned information and limit |
|---|---|
| **`submitMail` result** — authorised originating caller | Rejected with typed reason or accepted with stable dispatch ID, current state and relevant policy/source revision. Accepted never means delivered. |
| **`getDispatch`, `listDispatches`, `getAttemptHistory`, `listFailures`, `getProviderEvidence`** — authorised consumers/operators | Scoped, redacted state, route/attempt history, verified evidence, typed retryability/unknown status, qualified timestamps, freshness and completeness. No unauthorised cross-tenant disclosure. |
| **`getTransportReadiness`** — host, operator, Notifications | Approved route and sender availability, provider capacity/limits and degraded/paused states. Readiness is not permission or legal approval. |
| **Technical committed events** — Message Queue and authorised subscribers | Illustrative: `MailDispatchAccepted`, `MailAttemptRecorded`, `MailProviderAccepted`, `MailTransportRejected`, `MailDeliveryReportRecorded`, `MailReconciliationRequired`, `MailDispatchExpired`. Each bears source, tenant, revision, qualified time, schema version and idempotent event identity. Outbox delivery is replayable and at-least-once, never proof of recipient receipt. |
| **Audit, Logging, Observability and Reporting feeds** | Distinct minimised evidence, diagnostics, telemetry and reporting projections defined below. No full message bodies, credentials or unapproved recipient details. |
| **Authorised export and retention results** — administrator, Privacy | Tenant/purpose-filtered provenance and evidence, lawful retention/hold status, applied deletion and incomplete outcomes; never an unrestricted data dump. |

**Public-contract guarantees:** Runtime validation; deny-by-default permission and tenant boundaries; no provider SDK or private database types in public signatures; versioned schemas and explicit errors; idempotent commands and consumers; ordered source revisions where relevant but no false global event ordering; source and observation times distinguished. Data minimisation, storage encryption and lawful expiry/holds apply to all surfaces. Queries never trigger sends. A provider webhook is untrusted evidence until validated and committed as a Mailer fact. Direct callers outside Notifications are allowed **only** for an explicitly approved purpose and action; they cannot bypass applicable notification preferences.

## 4. Cooperation and dependency direction

| Capability | Mailer receives | Mailer supplies | Dependency |
|---|---|---|---|
| [Notifications](../notifications/services-record.md) | Approved email-channel notice intent and delivery requirements | Stable dispatch reference, accepted/rejected/unknown, transport evidence and failures | Default *optional* orchestrator; Mailer also supports authorised direct callers |
| [IAM Integration](../../compositions/iam-integration/compositions-record.md) (Identity, Authentication, Authorisation) | Verified caller, tenant, assurance and resource decision | Scoped command/query outcomes and denial evidence | **Essential trusted host ports**; IAM Integration composes, Authorisation decides |
| [Configuration](../../capabilities/configuration/capability-record.md) and host | Effective approved sender, provider, limits, credential handles, policy version | Readiness, validation and degraded status | **Essential effective configuration**, not Configuration-owned mail state |
| [Privacy](../../capabilities/privacy/capability-record.md), [Legal Compliance](../../capabilities/legal-compliance/capability-record.md) | Applicable legal/purpose/suppression/hold/retention rules | Minimised source and retention evidence | **Conditional mandatory** according to purpose and jurisdiction |
| [Integrations](../integrations/services-record.md) or host provider port | Optional provider connection, response verification and availability | Scoped submission/technical provider results | Optional coordination; no mandatory Integrations layer |
| [Localisation](../../capabilities/localisation/capability-record.md), [Clock](../clock/services-record.md), content/template owner | Approved content, locale and time semantics | Transport results, not content approval | Conditional according to mail type |
| [Scheduler](../scheduler/services-record.md), [Message Queue](../message-queue/services-record.md) | Host-composed execution and transport where enabled | Mailer-owned retry task descriptors and committed outbox events | Optional infrastructure adapters; Mailer retains state/outbox authority |
| [Logging](../logging/services-record.md) | Optional sink acceptance, unavailable/failure feedback | Sanitised SMTP/API errors, timeouts, retry, throttling, callback failures and opaque correlations | Logging owns diagnostic retention and sinks; does **not** prove send or Audit acceptance |
| [Audit](../../capabilities/audit/capability-record.md) | Independent evidence receipt, integrity, coverage and hold state | Attributable, classified dispatch denial, sender-policy, privileged retry, suppression and material exception assertions with source-event provenance | Audit owns tamper-evident custody/review, not transport facts; high-risk capture failure follows approved policy |
| [Observability](../observability/services-record.md) | Instrumentation/health interfaces | Queue lag, provider readiness, latency, error metrics and permitted traces | Optional monitoring, separate from Logging and Audit |
| [Reporting](../../capabilities/reporting/capability-record.md) | Report status/reference and qualified refresh information | Authorised counts/outcomes, latency, route/provider performance, period, source revision, freshness and unknown coverage | Optional derived analysis, protected against small-cohort inference; reporting outage never blocks mail |
| [Booking](../../capabilities/booking/capability-record.md), Invoice, Billing, Authentication/Credentials and other owners | Authorised business correspondence via Notifications or direct public command | Technical delivery status, never source business status | Optional callers; email failure never reverses their committed business record |

**Three information boundaries:** Logging diagnoses *what failed*; Audit preserves *who did what and the integrity of accepted evidence*; Reporting derives *how the service performed*. Mailer alone owns *what it attempted and the qualified transport outcome*. Audit receipt, log success, report publication and provider acceptance are four different results. A normal Logging or Reporting outage must not stop sending. Missing compulsory Audit capture is handled by explicit risk-tier policy, not by substituting debug logs. Read-only report queries must enforce tenant/resource permission at source and destination; incomplete, delayed or replayed events must not silently overstate delivery rates.

**Composition:** Host-supplied public ports rather than private imports; directional, acyclic dependencies and ADR-0012 single-operation composition budget where applicable. No shared private database, forced message broker or mandatory external provider SDK.

## 5. Security, policy and operational requirements

**Mandatory invariants:** OWASP ASVS 5 Level 2 baseline and Level 3 where security-critical; server-authorised sender/tenant/purpose; sender identity/domain verification and SPF/DKIM/DMARC posture; authenticated encrypted submission; TLS/provider certificate validation; strict header/MIME/content and attachment constraints; safe file retrieval and SSRF protection; authenticated callbacks with replay prevention; suppression and anti-abuse quotas; secure secret rotation and restricted egress; explicit audit/security evidence; no open or click tracking by default. An email address does not grant identity or permission. Authentication codes and security notices require high-risk controls and alternative escalation where email cannot be confirmed.

**Governed policy:** Mailer enforces non-negotiable transport/security floors. Approved purpose-, risk- and tenant-scoped settings may refine routing, rate limits, retry/expiry, optional provider failover, retention and evidence; Configuration stores effective settings and provenance, but never overrides Mailer invariants. A policy change carries a valid owner, scope, approval, version, effective time and enforceable failure behaviour. Legal Compliance and Privacy provide applicable rules; being authorised to send does **not** automatically make sending lawful. UK GDPR/Data Protection Act/PECR and EU rules apply according to actual purpose, location and law; service messages and marketing are not interchangeable. Processors, international transfers, DSAR, holds and expiry need qualified handling.

**Operations:** Health/readiness, rate and quota awareness, bounded exponential retries, circuit breaking, dead-letter/recovery, duplicate-risk-aware failover and operator alerts; redact personal data, secrets and sensitive mail contents from default results and telemetry. Storage and committed technical outbox remain Mailer-owned behind host-composed persistence. No Redis, Elasticsearch, Neo4j or other proprietary engine is required. Postgres may implement durable state. User-facing content accessibility remains the approved content owner's responsibility; any Mailer operator views meet WCAG 2.2 AA.

## 6. Standards reference baseline — approved

These are **design references**, not a claim of certification or universal legal applicability. Apply each standard only to the parts of delivery controlled by Mailer or its selected provider.

| Area | Standards and relevance |
|---|---|
| Message/submission format | IETF RFC 5321 SMTP, 5322 message format, 6409 message submission, 2045–2049 MIME, 6531/6532 internationalisation: proper headers/envelopes, safe UTF-8 and attachments |
| Technical delivery results | RFC 3463/3464: classify replies, failures and delivery-status evidence without claiming human receipt |
| Sender authentication | RFC 7208 SPF, 6376 DKIM, **9989 DMARC** (supersedes RFC 7489); 9990/9991 reporting where applicable: sender alignment and controlled evidence |
| Transport security | RFC 8314 secure submission; 8461 MTA-STS, 8460 TLS reporting, 7672 DANE and 8689 REQUIRETLS where provider/route supports them; NIST SP 800-177 Rev. 1 and UK NCSC email guidance |
| Security governance | OWASP ASVS 5; ISO/IEC 27001:2022 and 27002:2022 risk/control guidance. ISO certification is not inferred |
| Privacy and electronic communications | UK GDPR, Data Protection Act 2018, PECR as amended, applicable EU GDPR/ePrivacy and ICO guidance; RFC 8058 only if separately authorised list/marketing uses need compliant unsubscribe |
| Accessibility and locale | W3C WCAG 2.2 AA / ISO/IEC 40500:2025; BCP 47, Unicode/CLDR and ECMA-402 where used; accessible approved email templates and admin views |

**Primary references:** [RFC Editor](https://www.rfc-editor.org/) · [NIST SP 800-177 Rev. 1](https://csrc.nist.gov/pubs/sp/800/177/r1/final) · [OWASP ASVS](https://asvs.owasp.org/) · [UK NCSC](https://www.ncsc.gov.uk/collection/email-security-and-anti-spoofing) · [ICO](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/) · [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/). Pin and check applicable editions during implementation; a provider's older RFC support is not automatically a Mailer breach if the contracted safeguards are met.

## 7. Approved commercially permissive library options

Only independently maintained **full-codebase** open-source libraries with usable commercial licences are appropriate; verify each exact version, transitive dependencies, advisories, Node compatibility and notices before pinning. A free library does not guarantee a free external email provider. This is approved **conceptual selection**, not a dependency manifest or runtime acceptance.

| Candidate | Licence | Role and adoption |
|---|---|---|
| [Nodemailer](https://github.com/nodemailer/nodemailer) | MIT-0 | **Preferred** SMTP/MIME/DKIM submission behind replaceable provider port |
| [Zod](https://github.com/colinhacks/zod) | MIT | **Preferred** TypeScript boundary validation where not host-provided |
| [node-postgres / pg](https://github.com/brianc/node-postgres) | MIT | **Preferred** host-composed PostgreSQL adapter for dispatch/attempt/outbox |
| [Pino](https://github.com/pinojs/pino) | MIT | Optional implementation under Logging's contract, not a second logging authority |
| [OpenTelemetry JS](https://github.com/open-telemetry/opentelemetry-js) | Apache-2.0 | Optional instrumentation via Observability |
| [MJML](https://github.com/mjmlio/mjml) / [html-to-text](https://github.com/html-to-text/node-html-to-text) | MIT | Optional template/plain-text work owned by content/template flow, not Mailer |
| [mailauth](https://github.com/postalsys/mailauth) | MIT | Optional sender-authentication diagnostics as needed |
| [Ajv](https://github.com/ajv-validator/ajv) | MIT | Optional JSON Schema validator, avoid competing contract schemas |
| [pg-boss](https://github.com/timgit/pg-boss) / [pgmq](https://github.com/pgmq/pgmq) | MIT / PostgreSQL Licence | **Conditional**, only if existing Scheduler/MQ/host infrastructure does not satisfy needed execution/transport; neither owns Mailer's events |
| [DOMPurify](https://github.com/cure53/DOMPurify) | Apache-2.0 OR MPL-2.0 | Optional HTML sanitisation in the trusted rendering boundary, not a replacement for attachment or transport validation |

**Preferred minimal design:** Nodemailer + Zod + host-supplied PostgreSQL/`pg` plus existing IAM, Scheduler/MQ, Logging/Audit/Observability/Reporting public ports. No BullMQ/Redis dependency, separate mandatory job broker, proprietary provider SDK or full mail-hosting stack.

## 8. Optional presentation — advisory, not prescriptive

Mailer works **without any UI**. If enabled, its operational screens follow the inspected [application-test-template](https://github.com/nuxt-layers-test/application-test-template): a host-owned responsive sidebar with **Capabilities → Mailer**, opening an optional dashboard (illustrative `/mailer` route) in the shared Nuxt content area, as Theme Manager does. The host owns navigation, feature enablement, test-mode composition and route placement; Mailer owns only its public-contract-backed views. The [Theme Manager](https://github.com/nuxt-layers/theme-manager) implementation is an illustrative pattern, not a private dependency or a Mailer implementation.

| Proposed view | Audience and content | Public surface |
|---|---|---|
| **Dashboard** | Operator: sender/provider readiness, queued/failure/unknown counts, degraded state and freshness | `getTransportReadiness`, scoped summaries |
| **Dispatches** | Operator: permitted filters, statuses and redacted errors | `listDispatches`, `listFailures` |
| **Dispatch detail and recovery** | Privileged operator: safe timeline, attempt evidence, permitted retry/reconcile/cancel pending with explicit confirmation | `getDispatch`, `getAttemptHistory`, `getProviderEvidence`, authorised commands |
| **Sender and route settings** | Tenant admin: approved domains/senders, quotas, policy and secret *status* (no secret contents) | Mailer readiness and Configuration public ports; authorised route commands |
| **Provider health** | Platform operator: throttling, availability, queue lag, remediation | Redacted readiness/Observability |
| **Suppression and retention** | Optional tightly restricted administration of applicable restriction/hold classes | `applySuppression`, Privacy/Legal Compliance controls |

Ordinary users generally see no Mailer link. The host must hide disabled/unavailable navigation **and** recheck access server-side for every query/command; visibility alone grants nothing. Apply tenant isolation, minimal disclosure, per-action assurance/step-up and additional control for high-risk recovery. Show queued, provider-accepted, delivery-unconfirmed, bounced and unknown distinctly; never mark delivery complete merely because a page action succeeded. Keyboard/screen reader, responsive navigation, Theme Manager public tokens, i18n, Clock-aware timestamps and WCAG 2.2 AA apply. No mailbox, inbox or generic compose screen.

## 9. Conceptual acceptance cases

| Scenario | Required outcome |
|---|---|
| Authorised send and repeated request | Stable dispatch ID; no intentional second dispatch for the same idempotency identity |
| Denied caller, wrong tenant/sender, unsafe content or missing compulsory legal policy | Reject before provider submission; no information leak or open relay |
| Accepted by provider / reported delivered / bounced | Distinct, time-qualified states; neither provider acceptance nor evidence implies human receipt |
| Timeout after possible send | Explicit **unknown** with safe reconciliation, never blind resend or silent failover |
| Retry, expiry, cancellation or privileged admin action | Version/permission/risk checks; no attempt to unsend mail; attributable history |
| Provider down or absent; direct-send selected | Defined degraded/failure behaviour; direct-send reduced guarantees remain explicit |
| Booking confirmed while mail fails | Booking remains confirmed; Mailer/Notifications report a separate delivery problem |
| Replay/reordering of event or delayed provider report | No double counting; source revision/history retained and qualified correction visible |
| Audit unavailable for a high-risk message | Approved capture/failure risk policy enforced; diagnostic log is not evidence receipt |
| Reporting/Logging absent | Native dispatch remains available where no mandatory operational constraint is violated |
| Tenant export or deletion with legal hold | Scoped disclosure and explicit retention/hold outcome |
| Headless host, optional GUI or denied recovery request | Works without screens; optional sidebar/dashboard uses public ports; server still rejects denied action |
| Request for inbound mailbox or proof-of-read | Explicitly unsupported |

## 10. Approved decisions and remaining acceptance

**Owner approval: MLR-01–MLR-10 (21 November 2026).** They establish: outbound-only headless-first scope and optional admin UI (01), Notifications responsibility split (02), durable/uncertain provider lifecycle (03), replaceable SMTP/API ports (04), access/privacy/sender safeguards (05), public technical status/outbox and diagnostic GUI (06), controlled authorised direct calls (07), independent optional future mailbox (08), risk-tier retention/failover/evidence (09), and durable async versus limited-guarantee direct mode (10). The subsequent standards, open-source candidates, Logging/Audit/Reporting contracts and advisory screen set were also explicitly approved. Their substance is integrated above rather than repeated as historical appendices.

**No unresolved conceptual decision identified within this approved scope.** Implementation-stage work still includes: exact root `CONTRACT.md` signatures and semantic versioning; authenticated provider adapter/callback and DNS readiness evidence; confidentiality, retention and provider transfer review; classified security-mail escalation; defined risk-tier defaults and error codes; host composition with ADR-0012 constraints; source/outbox reconciliation; documented optional absence modes; security and accessibility verification; independent consumer acceptance and CI. These are **acceptance/evidence tasks**, not approval to change ownership, create a mailbox or assume a proprietary service.

**Review boundary:** Conceptual completion does **not** establish an implemented `mailer` repository, published runtime API, provider certification or merged PR. Before any permitted squash merge, reconcile this branch and reciprocal notes against **current** governing and blueprint `master`, newly merged and active overlapping reviews, Git mergeability, CI checks and branch policy. Obtain **separate explicit authorisation** for merge. No implementation repositories were changed and no local tests/builds were run.


## Notifications reciprocal conceptual interface — 19 November 2026

**Status: Notifications NOT-01–NOT-10 owner-approved 22 November 2026 (conceptual only), not implemented or independently acceptance-verified.** Notifications delegates only channel email send/qualified provider status to Mailer; Notifications owns source-scoped notice intent, recipient-policy routing, inbox, retry coordination and notification lifecycle. Mailer must not treat provider acceptance as human receipt; callback evidence and idempotency/reconciliation are proposed public channel ports. Mailer PR #90 has since merged; its approved conceptual channel boundary is preserved. This bounded reciprocal note preserves the independent mailer review and creates no direct package import.

**Integrated refinement (21 November 2026, now conceptually approved):** Initial Notifications channels are in-app and Mailer email. Mailer records qualified provider hand-off, bounce and status evidence, without claiming human receipt; Notifications keeps per-channel lifecycle and reconciles ambiguous outcomes, so Mailer does not own notice inbox/read or cross-channel policy.
