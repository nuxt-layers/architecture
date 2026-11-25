# Notifications — Service Record

**Artefact name:** `notifications`  
**Artefact classification:** technical service (CLS-04, owner-approved 24 November 2026); established Platform responsibility in the governing catalogue, pending governing reconciliation.  
**Conceptual status:** NOT-01–NOT-10 explicitly owner-approved 22 November 2026; implementation/public API and operational acceptance remain unverified.  
**Availability / installation / configuration / operation / enablement / authorisation:** Not independently verified; these are distinct statuses, not synonyms.  
**Version:** Conceptual contract only; no public contract version asserted.  
**Evidence:** Review protocol (former document: review protocol); governing `architecture-rules/master` at `b920ce0d8b361de000a6739a16123dbdc56df7a7`; blueprint opening `master` at `6dac83a03da8704f7945ee1bc894f2248300445a`. Governing Capability Standard and ADR-0012, ADR-0017, ADR-0018 are accepted. `nuxt-layers/notifications` exists; root `CONTRACT.md` was not retrievable as of review. Accordingly no callable implementation API or operating status is asserted.

## Purpose, justification and ownership

Notifications is the reusable, tenant-scoped **human-attention and notification orchestration** owner: accept a legitimate notice intent from an authorised origin, decide permitted audience/channel/timing under policy and preferences, produce an approved minimal rendering, coordinate channel delivery and retries, and expose an independently comprehensible notification lifecycle. Its value is channel-independent, recoverable notice delivery across many domains, not originating their business decisions. Operates in headless mode without a required GUI; optional inbox and operator consoles consume its public contract.

**Authoritative owned records:** accepted/rejected notice intents and immutable deduplication identity; notice purpose/class, source reference/revision and bounded payload snapshot; target recipient references resolved for a particular context; routing selection and policy/application versions; per-notice/per-channel attempts, retries, suppression, expiry and provider qualification; in-app inbox entry with read/dismiss state *when the channel is configured*; template registrations/notification rendering revisions where not owned as published content elsewhere; notification-specific administrative configuration and delivery evidence. Protect historical provenance and tenant separation. The source domain retains its own event and durable outbox, its records, legal effectiveness and correctness. Notifications owns its own committed lifecycle events/outbox; Message Queue only transports.

**Does not own:** Identity tenants/memberships, Profile contact details, Authentication assurance, Authorisation grants, Privacy consent, Configuration's approved settings, Legal Compliance interpretation, Billing/Booking/Credentials/Workflow decisions, Scheduler task execution, Mailer's email transport or channel-provider credentials, Message Queue's transport receipts, Audit's independent audit record, Reporting derivatives, user-facing published domain content, nor evidence that a human actually read/understood a third-party-channel message. A user-supplied destination address is not a recipient-authorisation decision. Sending is not statutory service without separately evidenced applicable legal rules.

## Native services and lifecycle

1. Register validated notification purpose, eligible originating source, bounded template/content version, allowed channels, data schema, classification and mandatory-versus-optional handling. Do not allow arbitrary untrusted HTML, recipient enumeration or unauthorised domain claims.
2. Receive a scoped intent with stable source event/reference/revision, authorised audience reference, purpose, safe locale/template data, time/expiry, deduplication key and correlation. Verify source legitimacy, tenant, current rights, policy and consent/allowed preference before a sensitive disclosure or delivery attempt. Revalidate at deferred send.
3. Resolve recipient eligibility via relevant public IAM/Profile/Privacy contracts without retaining unnecessary personal contact records. Derive channel choice, quiet hours and alternate paths by governing rules; mandatory notices may override *optional preferences* only where lawful and explicitly approved, never override privacy/security floors.
4. Record accepted/suppressed/rejected/held with reason and version; create eligible channel tasks; render escaped, localised, accessible messages with safe links and no secrets or excess personal information. Acknowledged acceptance means durable custody only, not successful dispatch.
5. Coordinate an attempt through a public Mailer/channel/provider port. Record qualified provider accepted, handed-off, rejected, bounced, failed, rate-limited or indeterminate evidence. Retry with bounded backoff and idempotency where supported; reconcile ambiguous provider outcomes to avoid avoidable duplicates. **No exactly-once or guaranteed-human-receipt promise.**
6. Expose status such as `received → validated → accepted | rejected | suppressed | held → scheduled | ready → attempting → provider-accepted | delivered-evidence | failed | delivery-unknown | expired | cancelled`. Actual status is multi-dimensional by channel; read/dismiss is separate from transport receipt; partial success may coexist with a failed alternate channel. Cancellation cannot retract a message already sent.
7. Preserve bounded history, access-controlled audit evidence and retention/erasure/hold decisions. Replays reuse stable identity; corrections require a new source revision/replacement notice, never silent mutation of a delivered record. Unknown required dependencies hold the notice rather than pretending delivery.
8. **Independent native mode:** support an in-application inbox with persisted pending/read state and no external mail/SMS/push provider, where the application has the required IAM, persistence and delivery context. External delivery is conditional on configured providers; the inbox alone must never be described as an external legal notice.

## Idealised public inbound contract

*These are conceptual authority-level interfaces, not names of implemented functions or a universal request object.*

| Input / source | Supplied facts or instruction; owner | Validation, absence and failure |
|---|---|---|
| Notice intent from Booking/Billing/Identity/Configuration/Credentials/other authorised source (required per notice) | Source event ID, tenant, purpose, recipient/audience reference, source resource+revision, approved data class and expiry; originating domain owns meaning | Confirm registered source/purpose, authorised scope, revision and dedup key; reject untrusted domain assertions, invalid or unknown recipient and cross-tenant intents; staleness => hold/re-resolve |
| Trusted caller and scoped access decision (required for protected commands/reads) | Authentication/IAM caller assurance, Authorisation decision on exact resource; source domain remains responsible for emission permission | Server-side fail closed; an event alone is not permission; privileged resend/export and recipient changes require fresh authorisation |
| Identity and Profile recipient resolution (conditional per delivery) | Current eligible identity/group/role and verified contact destination with permitted disclosure; never Notifications-owned directory | Missing/deactivated/revoked/ineligible recipient suppresses or holds; no fallback to stale personal addresses or tenant parent |
| Privacy and Legal Compliance constraints (conditional, mandatory if applicable) | Consent, opt-out, purpose/retention limits, holds, jurisdiction/effective legal requirements | Uncertain lawful basis or statutory-channel requirement => hold/escalate; preference override must be lawful, not implicit |
| Configuration and user preference context (conditional) | Approved routing rules, channel availability, locale/quiet hours, user channel choice; owners retain source values | Stale/contradictory values => safe hold or allowed default only for explicitly optional choice; cannot disable mandatory floors |
| Template/content registration (required for rendering) | Approved versioned safe content schema/locale/purpose; Publisher/Localisation where applicable own source copy/translations | Reject unsafe placeholders/links, unsupported languages or unapproved claims; fallback only with approved accessible copy |
| Clock and Scheduler (time required; Scheduler conditional on delayed/retry) | Trusted instant, time-zone/expiry semantics and executed task triggers | No local-clock guess for critical deadlines; missed invocation remains pending and observable; replay safe |
| Mailer/channel adapter and Integrations connection (optional per channel) | Provider readiness, configured host secrets, send operation, qualified status callbacks/evidence | Unconfigured channel => unavailable, not sent; provider timeout => delivery-unknown; callback authenticated and correlated |
| Operator commands and authorised recipient actions (conditional) | Cancel pending, permitted resend, mark in-app read/dismiss, resolve hold, view/export scoped history | Expected revision/idempotency, policy, tenant checks; disallow rewriting delivery evidence or cancelling already transmitted message |

## Idealised public outbound contract

| Output / consumer | Authoritative meaning and lifecycle | Provenance, privacy and uncertainty |
|---|---|---|
| Accept/suppress/reject/hold result to originating domain/host | Durable notice custody or explicit refusal, stable notice reference and reason; **not** delivery, consent or domain completion | Include tenant, source event/revision, decision/version and recorded instant; never leak another tenant's recipient |
| Scoped notification status query to source, recipient, authorised operator | Current notification and per-channel lifecycle, next eligible action, attempted/scheduled timing | Bounded freshness and recorded evidence; provider acceptance ≠ end-user delivery; unknown distinct from failed |
| Recipient inbox/read query to authorised recipient and host UI | In-app message visible/acknowledged/dismissed according to Notifications' own state | Viewing an inbox item ≠ receiving third-party message or legally effective acknowledgment; disclosure individually authorised |
| Delivery attempt/qualified provider outcome to originating domain, Audit and operations | Which channel attempted, provider result and evidence reference; does not authorise originating domain transition | Minimise addresses and provider IDs; state time, source, evidence quality, possible duplicates and partial status |
| Committed Notifications lifecycle events via owned durable outbox to Message Queue/subscribers | Accepted, held, suppressed, attempted, status-changed, exhausted, expired, inbox-read facts after local commit | Stable event ID, tenant, notice ID/revision, minimal status/provenance; at-least-once downstream transport, dedup required |
| Scoped operational metrics/exports to Reporting/Audit/authorised operators | Count, backlog, expiry, failure/uncertainty and policy history; not billing/legal business data | Aggregation with tenant isolation; redact message body, recipients, secrets and high-cardinality personal identifiers |
| Provider/channel health and configuration read to host/operator | Configured, unavailable, degraded and last-verified evidence, not an invented healthy status | No secrets; differentiate configured from operational and provider hand-off from actual delivery |

### Command, query and event invariants

**Commands:** submit intent, register/revise notification definition, resolve permitted recipient route, cancel pending, retry/reconcile unknown, scoped recipient read/dismiss and authorised export. Each validates tenant, source/policy version, permission and immutable origin; returns stable previous result for idempotent repeats. **Queries:** by notice ID/source event, authorised recipient inbox, operator queue/channel health and scoped metrics; disclose only current permitted scope with freshness/completeness markers. **Events:** only after Notifications-owned durable commit; never assert that originator's business action occurred simply because a notification was queued. Consumers tolerate duplicate, delayed and out-of-order deliveries and reconcile via authorised queries.

Context is deliberately operation-specific: tenant and optional group, caller/assurance, originating capability/resource/revision, intended recipient reference, purpose, classification, correlation/dedup ID, configuration/consent/policy versions, Clock instant, channel/provider evidence and result uncertainty. No universal object or direct package import is mandated. Sensitive payloads and links must be reauthorised, short-lived and non-enumerating; unsubscribe and suppression may be mandatory depending on purpose/law.

## Cross-capability contracts and dependency direction

| Peer | Input Notifications consumes / output it supplies | Ownership and absence |
|---|---|---|
| Identity, Authentication, Authorisation, Profile | Tenant/eligible target, session assurance, decision, contact/locale → scoped notice status | IAM/Profile own source; protection required; no cross-tenant parent access |
| Privacy, Legal Compliance | Purpose/consent, retention, mandatory notice applicability → delivery evidence to lawful owner | Qualified constraints required where relevant; unknown legal requirement held |
| Configuration, Clock | Approved routing preferences/policy, time semantics → notice of effective policy change, status | Values/time owned by peers; do not overwrite setting or time authority |
| Mailer and optional SMS/push/Integrations | Validated channel send request → qualified hand-off/error status | Mailer/adapter owns transport; unavailable external channel explicit; no circular import |
| Message Queue | Own committed outbox messages → transport acknowledgement/replay data | Transport owner does not own notice intent or domain event; queue failure leaves committed notice pending |
| Scheduler, Workflow | Due-work invocation and separately authorised escalation/approval → pending/failed notice result | Scheduler executes; Workflow decides its own process, never driven by presumed receipt |
| Booking, Billing, Invoice, Course, Assessment, Credentials, Comments Engine | Minimised committed-domain notice intents → status/attempt evidence | Each source owns booking, charge, invoice, award, publication, moderation or appeal decisions |
| Audit, Logging, Reporting, Observability | Independent audit append and sanitised diagnostic/metric context → authorised evidence/read models | Notifications history is not the Audit log; diagnostics are not independent audit proof |
| Localisation, Publisher, Theme Manager/UI | Approved locale/message copy and semantic presentation → rendered, accessible message or inbox feed | Translation/content/theme owned by peers; host provides routes and menu |
| Verification, Moderation, Content Security | Conditional verified contact/recipient and approved safe-content result → notice of independently committed outcome | No accidental disclosure of rejected/hidden sensitive evidence |

Conceptual cooperation is via published ports and host composition; required, optional and conditional status is **per operation**, not an invented hard compile-time dependency. No cyclic direct imports or private schema access. Mailer PR #90 is merged and conceptually approved; Message Queue MQ-01–MQ-10 are owner-approved and now incorporated on blueprint master, with transport-only authority unchanged. Their public contracts are consumed through host composition.

## Configuration, provider neutrality and safeguards

Host chooses supported channels and injects provider secrets only through host secret management. Notifications owns validation and channel-policy interpretation, Configuration owns approved scoped values, Profile owns personal contact/preferences where assigned, Privacy owns consent constraints and Legal Compliance supplies applicable legal-duty evidence. Support native inbox without external providers; adding/removing or switching providers does not rewrite historic evidence or resend without a deliberate policy. External callback authenticity, correlation, spoofing, replay, template injection, phishing links, recipient enumeration, message amplification, cross-tenant data leakage, BCC-like disclosure, contact reassignment, provider account suspension, spam abuse and dead-letter recovery require threat controls. Rate limits/circuit breaking, safe rendering, request-time access decisions and high-risk step-up are conceptual obligations. Follow OWASP ASVS 5 Level 2 (L3 for critical security actions), WCAG 2.2 AA, UK GDPR/Privacy applicability and jurisdiction-specific notice rules without claiming legal compliance. Retention and storage inventory require future implementation `STORAGE-REGISTER.md` reconciliation.

## Optional GUI and test-host integration — approved 22 November 2026

**Presentation:** optional, role-aware and accessible; the notification service and its public contract operate with `presentation: false`. The reviewed [application test template](https://github.com/nuxt-layers-test/application-test-template) has `/` home, `/admin` dashboard, a collapsible **Capabilities** side menu, Theme Manager at `/theme-manager`, responsive mobile overlay and a shared Appearance menu. A derived Notifications test app adds its own side-menu entry and dashboard card **without editing the shared template**. The template's unauthenticated local test mode must not be deployed publicly.

| Screen (illustrative host route) | Purpose | Public contract / permission |
|---|---|---|
| **Notifications** (`/notifications`) | Role-aware landing dashboard: status counts, unknown/failed queue, channel health and next actions; non-operators see their inbox | Authorised status and scoped metrics queries |
| **My Notifications** (`/notifications/inbox`) | Inbox with read/unread, urgency, safe preview, mark-read/dismiss | Self-scoped inbox, detail and state-changing commands |
| **Notice details** (`/notifications/:id`) | Purpose, allowed content, authorised source link and qualified attempt timeline | Recipient-minimal or privileged status/history query, reauthorised on every view |
| **Delivery queue** (`/notifications/queue`) | Held, failed, expired and delivery-unknown notices; reconcile/retry/cancel with reason and revision | Operator-only, idempotent protected queue commands |
| **Definitions and rules** (`/notifications/definitions`) | Versioned purpose/template definitions, channel rules, localised preview and effective policy references | Privileged registry; Configuration and Localisation/Publisher retain their source values and content |
| **Preferences** (`/notifications/preferences`) | Personal channels and quiet hours; links to consent and tenant rules | Profile, Privacy and Configuration **public contracts**, not duplicate Notifications-owned settings |
| **Reports** (`/notifications/reports`) | Delivery trends, failures, evidence limits and authorised exports | Reporting-owned analytics, using Notifications' scoped read models |

**Recommended minimal UI:** one side-menu entry, an inbox, an operator queue and a contextual details view. Use tabs for Definitions/Reports where permitted, and link to existing preference screens. All routes are examples, not mandatory package exports or a second application shell. Host controls navigation, branding, visibility and routes. Notifications offers optional public presentation components/composables and server-side protected commands/queries; direct-route access, export and every mutation must independently enforce Authorisation (no parent-tenant implicit access).

Use Theme Manager's public semantic styles and the host's light/dark mode; meet WCAG 2.2 AA with keyboard access, focus, contrast, reduced motion, accessible status feedback, safe announcement throttling, responsive tables, understandable empty/unknown states, Clock/Localisation formatting and i18n. Do not expose secrets, contact directories, raw provider payloads or unauthorised message bodies. If Mailer is absent, the native inbox still works; if Reporting is absent, hide reports rather than block delivery. A derived **local-only** acceptance application should simulate recipient/operator roles, tenant isolation, provider timeout/bounce, duplicate retries, inaccessible routes, mobile navigation and `presentation: false`, without introducing unauthenticated production permissions.



## Conceptual acceptance scenarios

| Input → expected behaviour | Public output / authoritative owner |
|---|---|
| Valid Booking cancellation event with verified recipient → persist idempotently, render allowed content, route inbox/email as configured | Accepted notice ID; later qualified channel status. Booking owns cancellation |
| Duplicate/out-of-order Billing charge notice → same original result, source revision check, no unbounded repeat send | Prior notice/status or held stale revision; Billing owns charge |
| Authorisation revokes a user's tenant access before deferred send → revalidate and suppress disclosure | Suppressed/rejected with minimised reason; IAM owns revocation |
| Parent tenant admin requests child inbox → no implicit right | Denied without disclosure; Authorisation/Identity own access |
| Optional channel consent withdrawn → no fresh optional channel send | Suppressed/alternate permitted channel status; Privacy owns consent |
| Mandatory jurisdiction-specific notice rule unknown → hold and escalate; no false compliance or override | Held/unknown status; Legal Compliance supplies applicability |
| Mailer timeout after hand-off → preserve unknown, reconcile before retry, allow safe duplicate tolerance | Delivery-unknown then evidence-backed outcome; Mailer owns hand-off |
| Scheduler invocation repeats and queue replays event → task/idempotency prevents duplicate owned transition | Same committed notification revision and outbox fact; Scheduler/Message Queue only execute/transport |
| Provider says accepted but no receipt → don't claim human read or domain success | Provider-accepted status only; Notifications owns qualified evidence |
| Template contains unsafe URL or secret placeholder → reject definition/send | Stable invalid-template error; Notifications enforces rendering security |
| Approved in-app-only host with no email provider → notice visible and read state maintained | Inbox status, external channel unavailable; Notifications owns inbox |
| Already sent message cancellation request → reject impossible retraction, optionally initiate new corrective notice | Already-transmitted result; original domain owns correction decision |
| Retention expiry under legal hold → retain minimal evidence per authorised policy, no arbitrary erase | Scoped retention/held status; Privacy/Legal Compliance own constraints |

## Fully open-source library choices — owner-approved 22 November 2026

**Policy:** Use only current public complete codebases under genuinely commercial-use-permissive licences; pin and verify exact licences, maintenance, supply-chain security, transitive dependencies and runtime compatibility before implementation. An open-source client does not make a hosted provider open-source. Avoid duplicating Mailer, Message Queue, Scheduler, Localisation, Content Security or Observability.

| Library / source | Licence | Decision and owner |
|---|---|---|
| [Zod](https://github.com/colinhacks/zod) | MIT | **Conditional core candidate:** Notifications validates input/outputs and mappings; use existing approved schema validation instead if sufficient |
| [p-limit](https://github.com/sindresorhus/p-limit) | MIT | **Optional Notifications-local** concurrency back-pressure only; never durable jobs, distributed retry or transport |
| [FormatJS](https://github.com/formatjs/formatjs) (`intl-messageformat`) | BSD-3-Clause | **Via Localisation**, if locale/ICU message formatting is not already provided |
| [DOMPurify](https://github.com/cure53/DOMPurify) | Apache-2.0/MPL-2.0 | **Via Content Security**, only for approved HTML and correctly configured secure server-side DOM; prefer escaped plain text |
| [OpenTelemetry JS](https://github.com/open-telemetry/opentelemetry-js) | Apache-2.0 | **Via Observability/Logging**, never a second telemetry store; sanitise traces and labels |
| [VueUse](https://github.com/vueuse/vueuse) | MIT | **Optional UI** helper; not notification state authority |
| [Nodemailer](https://github.com/nodemailer/nodemailer), [MJML](https://github.com/mjmlio/mjml) | MIT-0, MIT | **Mailer-owned only**, not direct Notifications dependencies |
| [web-push](https://github.com/web-push-libs/web-push) | MIT | **Optional future channel adapter**, only if Web Push is added |
| [pg-boss](https://github.com/timgit/pg-boss), [Graphile Worker](https://github.com/graphile/worker), [pgmq](https://github.com/pgmq/pgmq) | MIT, MIT, PostgreSQL Licence | **Scheduler/Message Queue infrastructure alternatives**, not Notifications-owned queue engines; do not introduce competing implementations |

**Excluded/deferred:** Redis-dependent BullMQ, open-core or restricted/proprietary products, archived original `sanitize-html` upstream, the old Handlebars release line as a new actively maintained default, and React Email as an unnecessary React dependency in the Nuxt/Vue core. A provider's SMTP/SMS/push service may still cost money or require external terms. No exact versions, deployment or test acceptance are claimed.



## Standards and specialist guidance

The **governing platform minimum** is OWASP ASVS 5 L2 (L3 for critical operations), WCAG 2.2 AA, accepted architecture/ADR rules and applicable Privacy/Legal Compliance obligations. Other standards are supporting or conditional **by channel and jurisdiction**, not blanket certifications or mandatory dependency packages.

| References | What they guide |
|---|---|
| W3C [WCAG 2.2](https://www.w3.org/TR/wcag22/), [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/); [ETSI EN 301 549](https://www.etsi.org/technologies/ict-accessibility) | Accessible inbox, notification controls, keyboard/focus/status announcements, responsive operator UI; verify the legally relevant ETSI edition/harmonisation separately |
| [ISO/IEC 27001](https://www.iso.org/standard/27001), [27002](https://www.iso.org/standard/75652.html), [NIST SP 800-53](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [OWASP ASVS](https://asvs.owasp.org/) | Access, transport/callback integrity, tamper resistance, abuse/rate-limit safeguards, recovery and sensitive security alerts |
| [ISO/IEC 27701](https://www.iso.org/standard/27701), [ICO UK GDPR principles](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/), [ICO PECR marketing guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/) | Lawful purpose, minimisation, consent/opt-outs, retention and **service-versus-marketing content** distinction; mandatory classifications cannot override legal/privacy constraints without qualification |
| [ISO 22301](https://www.iso.org/standard/75106.html), [ISO 15489-1](https://www.iso.org/standard/62542.html) | Continuity, recovery, durable evidence, records and holds; no automatic proof of statutory service |
| [CNCF CloudEvents](https://github.com/cloudevents/spec), [IETF RFC 3339](https://www.rfc-editor.org/info/rfc3339/), [RFC 9557](https://www.rfc-editor.org/info/rfc9557/), [BCP 47](https://www.rfc-editor.org/info/rfc5646/), [Unicode CLDR](https://unicode.org/reports/tr35/) | Optional event interchange, unambiguous time/zone semantics, localisation; retain Clock/Localisation authority |
| [WHATWG Notifications](https://notifications.spec.whatwg.org/), [W3C Push API](https://www.w3.org/TR/push-api/), IETF [RFC 8030](https://www.rfc-editor.org/info/rfc8030/), [8291](https://www.rfc-editor.org/info/rfc8291/), [8292](https://www.rfc-editor.org/info/rfc8292/) | **Optional Web Push only:** permissions, encryption, subscription/revocation and VAPID; push provider acceptance does not prove reading; Push API remains a Working Draft rather than a W3C Recommendation |
| Email [RFC 5322](https://www.rfc-editor.org/info/rfc5322/), [6376](https://www.rfc-editor.org/info/rfc6376/), [7208](https://www.rfc-editor.org/info/rfc7208/), [7489](https://www.rfc-editor.org/info/rfc7489/), [8058](https://www.rfc-editor.org/info/rfc8058/), [NCSC email security](https://www.ncsc.gov.uk/collection/email-security-and-anti-spoofing) | **Mailer-owned** message format, DKIM/SPF/DMARC and applicable one-click list unsubscribe; Notifications supplies purpose, recipient and policy, not SMTP operations |
| [OASIS CAP 1.2](https://www.oasis-open.org/standard/cap/) | Optional specialist public-warning exchange, not a default capability or claim of emergency-alerting authority |

**Resulting acceptance requirements:** versioned purpose and audience classification; accessible safe content; approved provider channels and legally qualified marketing/urgent exceptions; redacted evidence and authenticated callbacks; explicit accepted/provider-accepted/delivery-evidenced/unknown distinctions; recovery, retention and provenance. Follow local law only as qualified by Legal Compliance; standards do not themselves establish compliance.



## Error Normalisation, Logging, Audit and Reporting

These **separate** public exchanges do not change the delivery owner. The approved [stateless Error Normalisation contract](../../libraries/error-normalisation/CONTRACT.md) describes pure functions, not an independently deployed logging/queue service.

| Cooperator | Input supplied by Notifications | Output received; authority |
|---|---|---|
| **Error Normalisation** | Recognised Notifications/provider error, owned code map/version and safe disclosure context | Pure normalised code, category, message key, redacted views and **advisory** retry classification; Notifications alone decides actual failure, unknown outcome and next action |
| **Logging** | Bounded diagnostics for validation, rendering, provider timeout, callback, retry and queue errors, with safe correlation | Qualified diagnostic receipt/query/health; Logging stores technical diagnostics, not delivery evidence or an Audit record |
| **Audit** | Risk-based, attributable notice-policy changes, privileged read/export, override, resend/cancel, and source-owned committed evidence references | Independent evidence receipt, custody/integrity/coverage; mandatory capture is policy-gated and may hold unsafe actions; not proof of legal service |
| **Reporting** | Authorised versioned notice/attempt/read models, status measures, latency, backlog and committed refresh events | Derived reports, trends, completeness/freshness and authorised exports; does not own notice records or change delivery |

**Example:** A Mailer timeout is safely classified as **delivery unknown**, not confirmed failure. Logging receives a redacted diagnostic; Audit receives only applicable accountable facts; Reporting counts unknown separately. None of their receipts proves provider delivery or human reading. Normal Logging/Reporting outages do not roll back a committed notice. No private data access or circular package imports.



## Approved decisions and completion boundary

**NOT-01–NOT-10 approved 22 November 2026; optional detailed GUI also approved.** The following is the definitive decision register; explanations above implement each decision without separate competing drafts.

| Decision | Approved rule |
|---|---|
| NOT-01 | Notifications owns notice custody, routing, inbox, attempts, evidence and its outbox, not domain facts, Mailer transport or queue transport |
| NOT-02 | Native in-app inbox works without external delivery providers; unavailable channels report this accurately |
| NOT-03 | Durable idempotency, revision checks, bounded retries/reconciliation and distinct accepted, attempted, provider-accepted, delivery-evidenced, unknown and read states; no exactly-once/human receipt claim |
| NOT-04 | Mandatory notice handling follows source purpose and qualified Legal Compliance/Privacy rules, never a blanket bypass of consent or restrictions |
| NOT-05 | Recheck eligible identity, verified contact, revocation and disclosure before deferred sends and sensitive views |
| NOT-06 | Optional role-aware, accessible GUI and host contextual views; headless mode and host-owned navigation remain complete |
| NOT-07 | Profile owns personal channel/quiet-hours, Configuration organisation rules, Privacy consent; Notifications owns effective route/evidence snapshots |
| NOT-08 | First channels: in-app and Mailer email; other versioned adapters optional; channel-specific evidence is qualified |
| NOT-09 | Source domain/Legal Compliance own statutory obligations and legal effectiveness; Notifications supplies dispatch evidence only |
| NOT-10 | Registered, approved emergency/security/legal-purpose exception classes may qualify preference overrides, never legal/privacy floor bypass |

**Complete at conceptual level:** classification, purpose, excluded ownership, native lifecycle, idealised public commands/queries/events and inputs/outputs, provider neutrality, security/privacy/legal/policy constraints, standards, fully open-source library choices, all material reciprocal interfaces, accessible optional GUI and test-host composition, acceptance scenarios, and approved decisions have been documented. No unresolved **Notifications owner-level conceptual decision** is identified.

**Not verified or complete at implementation/merge level:** `nuxt-layers/notifications` exists, but its root `CONTRACT.md` could not be retrieved. Published callable exports, Nuxt host one-call composition/50-line budget, storage register, provider adapter behaviour, authentication and permissions, implementation tests/security/accessibility/CI, actual deployment/availability, qualified legal compliance and release evidence remain implementation/acceptance tasks. Compare newest governance and blueprint `master`, reconcile independent parallel capability PRs and Git/CI/branch policies before merging. No local builds/tests or implementation repository edits were performed; no squash merge is authorised by conceptual approval. Historical drafts remain in the branch's Git history, not as a second competing specification.

## Moderation — approved current reciprocal contract (PR #96)

**Moderation-side concept approved; not an implemented adapter or an independent approval of this capability.** Moderation supplies authorised, privacy-minimised recipient intent, safe decision message references and case/appeal notification requirements. Notifications owns channel selection, suppression and delivery/unknown receipts, never case decision, actual source enforcement or legally proven receipt. [Canonical Moderation specification](../../capabilities/moderation/capability-record.md). Public versioned, scoped ports preserve source ownership and acyclic package dependencies.


## Reciprocal interface — Profile conceptual review (22 November 2026)

**Status: proposed in [Profile draft PR #123](https://github.com/nuxt-layers/architecture-blueprint-review/pull/123); not independently approved or implemented.** Notifications must obtain an authorised current, preferably verified destination and personal channel/quiet-hour preference through Profile's purpose-scoped public projection at send time; Privacy determines consent/suppression and Notifications owns delivery outcome. A stale or revoked contact route must not be used as fallback; verification code delivery is evidence of transport attempt, not proof of human receipt. Profile does not own message dispatch or destination caches. See [Profile's idealised public contract](../../capabilities/profile/capability-record.md#idealised-public-inbound-contracts). This bounded note does not supersede this capability's approved decisions; reconcile any concurrent unmerged work before integration.


## Profile approved decisions — bounded reciprocal alignment (22 November 2026)

**Owner-approved Profile PRO-02/05, 22 November 2026.** Profile owns personal contact destinations, channel/quiet-hour preferences and verification; Privacy owns consent/suppression; Notifications owns delivery attempts and provider outcomes. Resolve a currently permitted destination at send time with no stale fallback. Account-claim/recovery notices require purpose-scoped authority, careful anti-enumeration and protection of existing account owners; delivery is not proof of receipt. See [Profile's canonical contract](../../capabilities/profile/capability-record.md#approved-conceptual-decisions-and-remaining-verification). This records approved principles, not implemented new APIs or a completed review of this neighbour.

## Reciprocal interface — Observability review (22 November 2026)

**Status: Observability conceptual interface owner-approved (OBS-01–OBS-10, 22 November 2026); does not alter NOT-01–10 or assert an implemented port.** [Observability](../../services/observability/services-record.md) supplies an authorised, deduplicated alert intent and its revision/severity/source evidence. Notifications controls audience, preferences, channels, message sending and recipient delivery outcomes, optionally returning qualified outcome status. Alert acknowledgement and source recovery are Observability-owned and distinct from notification read/delivery state.


## Task conceptual review — reciprocal public boundary (23 November 2026)

**Status: Task TASK-01–08 and operating safeguards owner-approved conceptually 23 November 2026 in [draft PR #138](https://github.com/nuxt-layers/architecture-blueprint-review/pull/138); TASK-09–14 extensions are now owner-approved conceptually (23 November 2026), not implemented or a completed review of notifications.** [Task canonical conceptual contract](../../capabilities/task/capability-record.md). Task may request recipient-scoped assignment/due/blocker notices through a public intent, with revision and minimised payload. Notifications owns orchestration and channel delivery evidence, not Task assignment/acknowledgement/completion. Absent delivery must not alter authoritative Task state. Preserve prior approvals and provisional neighbouring work; reconcile overlaps against latest master before merging.

## Scheduler reciprocal conceptual interface — 23 November 2026 (draft PR #131)

**Status: Scheduler concept and reciprocal boundaries owner-approved on 23 November 2026; implementation adapter unverified.** [Scheduler conceptual contract](../../services/scheduler/services-record.md). **Scheduler SCH-01–08 and the five operating defaults were owner-approved conceptually on 23 November 2026; no implemented port is asserted.** Notifications owns recipient channels/preferences, provider attempts and qualified delivery evidence. Scheduler owns the detection, durable unresolved status and deduplicated alert intent for retry exhaustion, missed/overdue work, material time-rule intervention, unknown recovery and retention actions requiring attention. At send time, Identity and Authorisation must establish suitable tenant/account administrators **with permission to take the specific corrective action**; mere admin labels or stale group membership are insufficient. Scheduler provides safe scoped issue references, severity, action/deadline and correlation; Notifications returns accepted, rejected or unknown delivery status, not proof of administrator action. Delivery failure or no eligible recipient leaves the Scheduler incident pending/visible for secure operator escalation, avoiding loops and cross-tenant disclosure. Ordinary successful runs and mechanically resolved DST transitions do not trigger noisy notices. Separately, Scheduler may trigger Notifications-owned due/reminder work; a scheduled acknowledgement does not prove a notice reached a recipient.


## Workflow conceptual review — reciprocal alignment (23 November 2026; draft PR #150)

**Status: Proposed Workflow-side consolidation, not new approval of this neighbouring capability or an implemented integration.** [Workflow's idealised public contract](../../capabilities/workflow/capability-record.md) keeps human review-route definitions, approver eligibility/assignment, delegation and qualified approval evidence with Workflow; each originator retains its own authoritative source record and final decision. Notifications owns delivery channels and receipts. Workflow may request invitations/reminders and track their uncertain delivery, but a delivered notice is not a vote and a failure is not a rejection.

Dependencies are host-composed public ports/events, not private storage or automatic package imports. Resolve concurrent draft changes against latest master before merging.
