# Scheduler — Service Record

**Artefact classification:** Technical service (CLS-09, approved 24 November 2026). **Prior governing/review classification:** Platform capability (`scheduler`).  
**Conceptual status:** Complete and owner-approved, 23 November 2026 (SCH-01–SCH-08, operating defaults, administrator alerts, external standards mapping, LIB-SCH-01 evaluation direction, four-way diagnostics/evidence/reporting cooperation and optional GUI).  
**Authority:** Approved conceptual design; accepted governing ADRs and standards prevail.

## Purpose, ownership and exclusions

Scheduler reliably **plans and coordinates when capability-owned background work is attempted**. It owns schedule registration and revisions, due-time planning, occurrence identity, durable execution checkpoints, attempts, worker claims/leases, retry/quarantine, reconciliation, administrator incidents and its own committed events/outbox.

The **originating capability** owns its handler, business eligibility, current source revision, authorisation at execution, idempotency of side effects and final business outcome. A scheduled trigger or worker acknowledgement is **not** proof of a domain transaction, sent notification, successful charge or completed workflow. Scheduler is not human **Task** management, Calendar, Events, Workflow, Message Queue, Notifications, Audit, Reporting or a general-purpose business-rules engine. No arbitrary user-supplied scripts or private cross-capability table access.

Scheduler is a framework-independent, provider-neutral, **headless** technical service with an optional Nuxt administrative presentation. Its own persistent state remains authoritative even if a worker or execution adapter changes. Use the modular-monolith default; the host provides infrastructure and composes public ports.

**Governing compatibility:** Accepted [ADR-0012](../../decisions/ADR-0012-trivial-composition.md) already defines `tasks: { name, every, run }[]` and the one-operation, 50-line Nuxt-host composition budget. This record **does not change** that shared shape. One-off and zoned calendar schedules, control commands and operational queries are separate versioned Scheduler public interfaces, to be aligned with future implementation contracts. Accepted [ADR-0015](../../decisions/ADR-0015-infrastructure-integration-libraries.md) treats Temporal Gateway as an infrastructure integration **library**, not Scheduler's policy owner.

## Native lifecycle and approved operating rules

1. **Register and revise.** A trusted host/capability registers an approved named handler, tenant/owner scope, interval or supported richer rule, limits and revision. Re-registration is versioned and idempotent. Reject unknown handlers, unsupported persistence, cross-tenant control and invalid schedules.
2. **Plan due work.** Use **Clock** for trusted instants, IANA zones, DST and calendar-versus-elapsed semantics. Preserve schedule policy, source/zone rule version, planned instant and deterministic occurrence identity. The approved default **skips nonexistent local times** and uses the **earlier** instant once when local time repeats; explicit permitted policy may differ. Incompatible or uncertain time rules must not cause blind dispatch.
3. **Claim and dispatch.** Use durable, atomic claims, short renewable leases, fencing/attempt tokens, bounded per-tenant concurrency, fair backpressure and minimal authorised handler context. The preferred default backing store is host PostgreSQL; optional Temporal is behind the gateway. Precise firing time and exactly-once business effects are **not** guaranteed.
4. **Observe and retry.** Record scheduled/actual instants, attempt identity, handler/provider acknowledgement, classification and source reference. The approved default is **three total attempts with exponential backoff and jitter**, then quarantine with actionable status. An `unknown` timeout or uncertain acknowledgement stays unknown until evidence-based reconciliation; never blindly replay a potentially non-idempotent effect.
5. **Handle missed work.** On outages or time changes, reconcile recorded due identities. Skip missed routine ticks by default; allow **one coalesced catch-up only when the owner declares it safe**. Keep overdue one-off deadlines pending explicit source eligibility review, not automatically renewed. A late Booking hold expiry, for example, never resurrects the hold.
6. **Control and recover.** Authorised operators may pause, resume, retire, quarantine, reconcile or request bounded redrive with an accountable reason, expected revision and fresh source checks. Stopping future claims cannot retract an already committed external side effect. No universal replay deadline overrides source expiry, privacy or legal hold.
7. **Cut over and retain.** Provider changes require pause/fencing, drain or preservation of in-flight work, export/checkpoint, unknown-state reconciliation and verified rollback. Retain minimal operational data within purpose, legal/evidential floors and applicable holds; no invented global retention period. Never silently downgrade a requested durable mode to best-effort.

Preserve distinct `registrationId`, `revision`, `occurrenceId` and `attemptId`, plus tenant/owner, scheduled/actual time, correlation/causation, idempotency, lease/attempt evidence and state completeness. A repeated attempt keeps the same occurrence identity and gets a new attempt identity. Delivery may repeat, reorder or be delayed; each domain handler must deduplicate effects at its authoritative boundary. Scheduler owns infrastructure execution retry, while Message Queue owns transport retry.

## Idealised public contract

The following are **approved conceptual inputs and outputs**, not verified names of exported TypeScript operations.

### Inputs accepted by Scheduler

| Source | Public input | Required checks |
|---|---|---|
| Trusted host / owning capability | `tasks` registration; owner, handler, supported interval; separately versioned one-off or zoned-calendar rule, limits, revision and scoped identity | Trusted handler provenance, unique owner/tenant, supported rule, valid revision and durable adapter where promised |
| Owner/domain request | Due-work or deadline request, source reference, expected revision, stable occurrence/idempotency key | Source ownership, bounded payload, time-of-use eligibility and business authority remain with owner |
| Clock / host infrastructure | Canonical instant and zone rules, PostgreSQL connection, worker claim/dispatch and optional gateway evidence | Trusted freshness; fail explicitly on missing guarantees, clock shifts or uncertain provider result |
| Identity / Authentication / Authorisation / Configuration | Trusted caller, service, tenant/account scope, assurance, resource decision, validated concurrency/retry/catch-up/retention policy | Deny unknown or unqualified access; never trust browser-supplied tenant or inferred account-admin rights |
| Authorised operator | Pause/resume/revise/retire, inspect, retry/reconcile/redrive, quarantine, export, cutover and retention controls with reason | Server-side fresh resource permission, scope, revision, confirmation, source checks and required Audit custody |
| Handler / worker / Notifications | Qualified attempt outcome, source-owned result reference, provider acceptance/unknown, alert delivery disposition | Validate attempt/fencing evidence; don't infer business completion from acknowledgements or notice delivery |

### Outputs supplied by Scheduler

| Recipient | Public output | Meaning |
|---|---|---|
| Host / registering capability | Qualified accepted/rejected/pending/unknown registration and control receipts; revision and next-due hint | Next due is a plan, not an exact timing guarantee |
| Approved handler | Minimal scheduled execution envelope: tenant/owner, source reference, occurrence/attempt IDs, revision, planned/actual instants, deadline and correlation | A request to **revalidate** and perform owner-authorised work, not permission or a completed outcome |
| Operator / authorised consumer | Paginated, redacted schedules; due/missed/overdue occurrences; execution history; leases, quarantine, unknowns, actionable incidents, provider health, as-of and completeness | Authoritative **Scheduler** state only; show domain completion solely on independent source evidence |
| Notifications | Deduplicated tenant-scoped actionable alert intent with issue/severity, safe occurrence reference, recommended remedy/deadline and correlation | Notifications owns recipient/channel resolution and delivery; alert receipt never means incident resolved |
| Audit / Logging / Observability | Distinct accountable control evidence, safe diagnostics, qualified timings/backlog/health and trace information | Each downstream owner establishes its own acceptance/custody, not Scheduler business finality |
| Reporting | Authorised records, committed source-event references, metrics, time range, provenance and completeness | Reporting creates derived analysis, never Scheduler's authoritative job facts |
| Message Queue / subscribers | Committed **Scheduler-owned** lifecycle events through Scheduler's source-owned durable outbox | MQ transports events, not scheduled domain work or its business result |
| Provider / worker | Portable claim/dispatch, observe, cancel/stop-claims, health and reconciliation intents | Provider acknowledgement may be unknown; it is not proof of domain success |

**Command families:** register/revise/retire, schedule due, pause/resume, claim/ack attempt, retry/quarantine/reconcile/redrive, configure policy and authorised cutover/export. **Query families:** schedules, occurrences, attempts, operational health, incidents and qualified notification status. **Event families:** Scheduler-owned committed registration/control, due/attempt, failure/quarantine/recovery and alert-condition changes. Each exposes stable revision/idempotency, status, tenant scope and error codes; events are never conflated with business-domain completion. Cross-capability contracts use public ports, not a universal shared DTO.

## Cooperating capabilities and reciprocal information

| Capability | Scheduler receives | Scheduler supplies / ownership limit |
|---|---|---|
| **Clock** | Canonical instant, time-zone/DST and temporal-rule interpretation | Due/actual timestamps; **Clock never runs jobs** |
| **Configuration** | Validated operating policies, enabled status and limits | Timed Configuration-owned expiry/activation handler requests; Configuration revalidates |
| **Identity, Authentication and Authorisation** | Trusted scope, membership and **current permission for the exact remedy**; caller assurance | Scoped protected operations and minimal safe alert/action references. An admin label is not an unconditional grant |
| **Notifications** | Delivery channel/outcome and qualified alert disposition | Actionable operational alerts and domain-owner-approved reminder triggers. Notifications owns recipients, delivery and preferences |
| **Message Queue** | Qualified delivery of Scheduler-owned outbox events | Committed lifecycle events. MQ owns transport, not timed execution |
| **Workflow, Process, Task** | Owner-defined deadlines/escalation or reminder handlers, expected revision | Due attempts and delay evidence. Their human task, approval, stage or workflow outcome remains theirs |
| **Booking, Billing, Events, Course, Publisher, Recruitment and other domain owners** | Registered handlers, due/expiry rules, source revision, idempotency eligibility | Occurrence/attempt/status; owners alone authorise and commit effects |
| **Privacy / Legal Compliance** | Purpose, disclosure, retention, erasure and hold constraints | Minimized scoped history and implementation of lawful limits; no invented legal basis |
| **Infrastructure / Temporal Gateway** | Host-provisioned storage, worker claims and optional technical provider | Portable execution/recovery intentions; gateway is an adapter library, never source of schedule policy |
| **Error Normalisation / Logging / Audit / Observability / Reporting** | Safe error projections, qualified diagnostic/evidence receipts, monitored/reporting consumption | Separate purpose-limited error, diagnostics, accountable evidence, metrics and reporting source models; detail below |

For a deadline, Scheduler supplies an **attempt**, not a right to execute an expired operation. No private imports, cross-capability write authority or dependency cycles are implied.

### Error Normalisation, Logging, Audit and Reporting

The four distinct public input/output relationships are **owner-approved**:

| Cooperating owner | Scheduler provides | Scheduler gets back / cannot assume |
|---|---|---|
| **[Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md)** — stateless library | Scheduler-owned stable error meaning, safe exception/provider context, known or unknown state, approved disclosure and correlation | Safe code, category, message key, public/technical projection and **advisory** retry hint. The library never stores facts, logs, audits or changes Scheduler retry decisions |
| **[Logging](../logging/services-record.md)** | Redacted error/attempt/retry/lease/provider diagnostics, timing, severity and trace IDs | Qualified log intake/reference or unavailable status; **not** business completion or Audit custody |
| **[Audit](../../capabilities/audit/capability-record.md)** | Attributable schedule/policy changes, elevated pause/retry/redrive/cutover, denials, accountable recovery with actor, tenant, version/time and reason | Accepted/pending/rejected/**unknown** evidence custody, qualified reference and coverage. Hold or deny a protected action when mandatory prior custody is uncertain |
| **[Reporting](../../capabilities/reporting/capability-record.md)** | Authorised source occurrence/attempt/incident records, failure/unknown states, timings, revisions, as-of, provenance/completeness | Aggregates, trends, authorised reports/exports with qualified freshness. No state changes, no invented zeros for missing data, and no inference of domain success from job acknowledgement |

Scheduler first commits its own authoritative state/outbox. It then supplies separate safe diagnostics to Logging and accountable evidence to Audit; neither receipt substitutes for the other. Error Normalisation is pure transformation, not a failure-policy owner. Reporting is an optional derived consumer; its outage cannot block headless schedule queries. A Logging outage does not reverse legitimate domain effects. **Mandatory Audit acceptance** for sensitive actions is different: unknown custody blocks/holds that action until reconciled.

## Actionable administrator notifications — approved

The five operating-default areas — **retry exhaustion**, **missed/overdue work**, **material DST/time-rule intervention**, **uncertain recovery** and **retention/hold action** — must generate an **actionable alert when human intervention is needed**. Routine successes, harmless skipped ticks and deterministically handled DST transitions must not flood administrators.

Scheduler owns detection, deduplication, severity, safe incident reference, next action and durable unresolved status. Identity establishes tenant/account membership; Authorisation confirms current permission for the **specific corrective action**; Notifications selects eligible recipients/channels, sends and returns qualified delivery status. Notify all suitable administrators or a policy-approved authorised on-call subset. Never disclose another tenant's incidents or treat an alert deep link as permission. No eligible recipient, provider outage, bounce or uncertain delivery leaves the incident **open in a secured operator queue**, with bounded retry/escalation, appropriate Audit/monitoring and no self-triggering notification loop. Only evidence-backed authorised resolution closes the underlying issue.

## Security, privacy, accessibility and operations

Apply **OWASP ASVS 5 Level 2** at least, Level 3 where appropriate for sensitive privileged controls. Enforce service credential isolation, least privilege, trusted authorisation at registration **and execution**, per-tenant worker/query separation, bounded payloads/timeouts/concurrency, safe error codes, secret redaction, protection against arbitrary handler injection and operator action confirmation. Evidence, monitoring and provider health cannot replace source-domain checks.

Minimise personal/task metadata; distinguish operational, diagnostic and accountable evidence, and enforce purpose-specific retention and legal holds through Privacy/Legal Compliance. Avoid claiming any certification, legal assessment or operational availability without evidence. Every persistent storage/cookie use belongs in the implementation's `STORAGE-REGISTER.md`. A provider migration must preserve pending/unknown evidence and idempotency. Operational integrations are optional unless a specific security/evidence or administrator-notification policy requires them; unsupported mandatory functionality must be made visibly unavailable, not silently omitted.

Any optional GUI meets **WCAG 2.2 AA**, keyboard/focus and screen-reader status handling, BCP 47/CLDR localisation, responsive/reduced-motion behaviour and public Theme Manager semantic tokens.

## Optional administrative GUI and representative host

**Approved principle (SCH-07):** headless core; separable optional administration screens. **Proposed implementation details**, not existing routes or SDK exports:

The verified [`nuxt-layers-test/application-test-template` README](https://github.com/nuxt-layers-test/application-test-template/blob/master/README.md), [`app/app.vue`](https://github.com/nuxt-layers-test/application-test-template/blob/master/app/app.vue), [`app/pages/admin.vue`](https://github.com/nuxt-layers-test/application-test-template/blob/master/app/pages/admin.vue) and [`nuxt.config.ts`](https://github.com/nuxt-layers-test/application-test-template/blob/master/nuxt.config.ts) provide a shared responsive shell, collapsible **Capabilities** sidebar, Theme Manager link at `/theme-manager`, `/admin` dashboard and Appearance toolbar. A **derived Scheduler test app** adds the **Capabilities → Scheduler** link, optional dashboard card and pages. The suggested `/scheduler` route prefix is host-configurable and **not** a published registration API. No changes to the shared template, no extra navigation framework, and no headless dependence on Nuxt.

| Proposed screen | Public Scheduler read model | Protected action |
|---|---|---|
| **Overview** (`/scheduler`) | Due/overdue, attempts, unknown/quarantined, readiness, actionable count, as-of/completeness | Read-only authorised links |
| **Schedules** (`/scheduler/schedules`) | Owner, revision, approved recurrence, Clock zone policy, next due, pause state | Approved-handler revision, pause/resume/retire; no executable scripts |
| **Execution history/details** (`/scheduler/executions`, schedule detail) | Planned versus actual instant, occurrence/attempt, lease/retry, qualified source outcome | Filter, inspect and navigate with tenant-scoped access |
| **Action required** (`/scheduler/incidents`) | Quarantine, unknown, overdue one-offs, relevant time/retention issues and alert status | Permission-checked, reasoned reconcile/retry/redrive with source revalidation and required Audit evidence |
| **Configuration** (`/scheduler/settings`) | Validated policy/adapter readiness, concurrency, retention, alert settings | Elevated policy/cutover/retention changes with revision, confirmation and rollback safeguards |

The host owns navigation/branding. Hide optional menu items where the caller has no read permission, **but always enforce permission on routes and public server ports**, including deep links from administrator notifications. Distinguish planned, attempted, acknowledged, unknown and **independently domain-confirmed** work. Show loading, partial, stale, unavailable and permission-denied states clearly; never expose secrets or invented completeness. Theme Manager owns appearance only, not scheduling or rights. The reference template's Theme Manager **test** mode has unauthenticated management endpoints and “Not signed in” placeholder: it does **not** establish production IAM security. Derived acceptance needs actual server-side tenant/permission fixtures. GUI omission must never change headless availability.

## External standards and specialist references

Apply only the relevant parts of each standard. These are **owner-approved design references**, not claims of whole-standard certification:

| Reference | Design impact / status |
|---|---|
| **[ISO 8601-1:2019](https://www.iso.org/standard/70907.html)**, [RFC 3339](https://www.rfc-editor.org/info/rfc3339/), [RFC 9557](https://www.rfc-editor.org/info/rfc9557/) | Unambiguous API instants and explicit time-zone information where needed |
| **[IANA time-zone database](https://www.iana.org/time-zones)**, [RFC 5545](https://www.rfc-editor.org/info/rfc5545/) | Clock-owned zone/DST rules, recorded interpretation version, bounded optional recurrence grammar; **not** blanket iCalendar compatibility |
| **[RFC 9562](https://www.rfc-editor.org/info/rfc9562/)** | Optional portable ID convention; occurrence/attempt distinction is mandatory regardless of UUID version |
| **[OWASP ASVS 5](https://asvs.owasp.org/)**, [ISO/IEC 27001](https://www.iso.org/standard/27001), UK BS EN ISO/IEC 27001 adoption, [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) | Governing OWASP security baseline is mandatory; ISO/BS/NIST provide relevant access, audit, recovery and incident-control guidance, not automatic certification |
| **[ISO 22301](https://www.iso.org/standard/75106.html)**, [ISO 22313](https://www.iso.org/standard/75107.html) | Business continuity, outage recovery, reconciling missed/uncertain work; no invented recovery SLA |
| **[W3C WCAG 2.2](https://www.w3.org/TR/wcag/)**, [WAI-ARIA](https://www.w3.org/TR/wai-aria/), [W3C Trace Context](https://www.w3.org/TR/trace-context/) | WCAG 2.2 AA required for GUI; ARIA where useful; trace propagation as optional interoperable diagnostic convention |
| **[OpenTelemetry semantic conventions](https://opentelemetry.io/docs/specs/semconv/)**, [CloudEvents](https://cloudevents.io/) | Optional portable telemetry/event envelope conventions, subject to Logging/MQ public contracts; no platform lock-in |
| **UK GDPR and Data Protection Act 2018**, [UK NCSC cloud audit/alert guidance](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles/principle-13-audit-information-and-alerting-for-customers) | Applicable privacy law constrains processing; NCSC guides customer-visible security logging, alerts and evidence. Privacy/Legal Compliance decide case-specific lawful basis and retention |

## Fully open-source development libraries — LIB-SCH-01 approved

**Owner-approved evaluation direction, not installed dependencies or verified version pins.** Require complete relevant source freely available under a commercially permissive licence, no essential feature locked in closed flagship editions and no compulsory hosted service. Check tagged licences, transitive packages, security maintenance and actual compatibility before implementation.

| Candidate | Licence | Architectural use |
|---|---|---|
| **[pg-boss](https://github.com/timgit/pg-boss)** | MIT | **Preferred first evaluation** for durable PostgreSQL-backed execution, claims, retries and worker recovery; never expose its private schema in Scheduler's public contract |
| **[node-postgres / pg](https://github.com/brianc/node-postgres)** | MIT | Reuse host PostgreSQL driver/pool for Scheduler-owned persistent records and outbox |
| **[cron-parser](https://github.com/harrisiirak/cron-parser)** | MIT | Add **only if** pg-boss/approved Clock port cannot supply required separate cron rule grammar; one recurrence parser at most |
| **[Croner](https://github.com/Hexagon/croner)** / [node-cron](https://github.com/node-cron/node-cron) | MIT / ISC | Alternative lightweight triggers/parsers, **not** durable multi-worker execution on their own |
| **[rrule](https://github.com/jkbrzt/rrule)** | BSD-3-Clause | Optional RFC 5545 recurrence subset only when actually required |
| **[pg_cron](https://github.com/citusdata/pg_cron)** | PostgreSQL Licence | Database maintenance tasks; do not create a competing Scheduler for capability handlers |
| **[PGMQ](https://github.com/pgmq/pgmq)** | PostgreSQL Licence | Optional **Message Queue** transport implementation, not Scheduler's domain execution owner |
| **[Temporal server](https://github.com/temporalio/temporal)** / [TypeScript SDK](https://github.com/temporalio/sdk-typescript) | MIT | Optional provider through Temporal Gateway, not compulsory to operate Scheduler |
| **[Pino](https://github.com/pinojs/pino)** | MIT | Optional through Logging; do not create a second Scheduler logging subsystem |

Do **not** select [Graphile Worker](https://github.com/graphile/worker) under the owner's stricter preference because, although its community worker is genuinely MIT-licensed, separately sponsored Worker Pro code is not equally open. Do not add Redis/BullMQ solely for Scheduler or pick SSPL, source-restricted, mandatory cloud-only or commercially restricted products. This is an owner-specific selection rule, not an assertion that every excluded community core violates open-source definitions. Prefer the smallest set: **pg-boss + existing pg + Clock**, with one optional parser and optional Temporal Gateway.

**Implementation acceptance:** verify exact release-tag source/licences and notices, maintenance/advisories, Node 26 and PostgreSQL 18 compatibility, claimed lease/fencing/crash/duplicate/unknown behaviour, DST via Clock, tenant separation, migrations, alert routing, resource consumption and the ADR-0012 minimal consumer. CI or the user performs builds/tests, not this conceptual review.

## Conceptual acceptance scenarios (not executed tests)

| Case | Required observation / authority |
|---|---|
| Trusted ADR-0012 task registered, durable provider ready | Scheduler returns scoped version/next due; handler owner retains all business decisions |
| Booking hold expires while workers are offline | Due occurrence reconciled; Booking still treats the hold as expired |
| Billing repeats after uncertain timeout / lease expiry | Same occurrence ID, new attempt ID; Billing independently deduplicates any charge |
| DST local time absent, repeated or tzdb revision changes | Approved skip/earlier-instance policy; explicit safe reconciliation without silent double execution |
| Worker/provider returns uncertain outcome | Scheduler records `unknown`; avoids blind replay and invented domain completion |
| Pause during active task or provider migration | Future claims blocked; in-flight uncertainty and rollback visible, no retraction of external effects |
| Three attempts exhausted | Quarantine, safe error, diagnostic intake, necessary Audit evidence and actionable alert to suitably authorised administrators |
| No eligible recipient or alert delivery fails | Unresolved issue remains in secured operator queue; no claim of notification success |
| Cross-tenant read/redrive or unsafe script registration | Server denies with safe code and relevant accountable evidence |
| Required Audit custody unknown during privileged recovery | Protected operation held/denied; Logging intake cannot stand in for Audit |
| Reporting delayed or absent | Native Scheduler operational queries remain available; no fabricated zero counts or completed business effects |
| Scheduler presentation omitted | Supported headless execution continues; Nuxt host's 50-line composition and public exports remain the eventual acceptance constraints |
| Scheduler optional GUI enabled in test host | Host-owned Capabilities → Scheduler sidebar/dashboard; permissions, incident actions, accessibility and as-of/unknown displays verified by user/CI, not presumed from test-mode sign-in |

## Implementation acceptance requirements

SCH-01–SCH-08 and the approved operating defaults, administrator alerts, cooperation boundaries and optional presentation apply. Validate concurrency, lease duration, retention floors and provider limits during implementation. Establish the actual public contract, provider semantics and licence compatibility, applicable storage register, presentation exports, worker/Clock and other consumer compatibility, production IAM, notification delivery and independent acceptance under the development protocol. Conceptual approval does not establish operational readiness.

## Storage reciprocal interface — 23 November 2026 (STO-01–07 owner-approved concept, PR #136)

Storage provides named backup and usage maintenance tasks via the published ADR-0012 task shape; Scheduler owns dispatch and retries but not the underlying file-byte state, provider credentials, backup semantics or successful restore evidence. A scheduled invocation is not proof that object backup/usage completed. Reconcile this note with the concurrent Scheduler conceptual PR #131. See [Storage conceptual contract](../storage/services-record.md). STO-01–07 are owner-approved Storage conceptual direction, not a published runtime contract change or completion of this capability's independent review.

## Task conceptual review — reciprocal public boundary (23 November 2026)

**Status: Task TASK-01–08 and operating safeguards owner-approved conceptually 23 November 2026 in draft PR #138 (historical review); TASK-09–14 extensions are now owner-approved conceptually (23 November 2026), not implemented or a completed review of scheduler.** [Task canonical conceptual contract](../../capabilities/task/capability-record.md). Scheduler may run due reminder/escalation triggers for Task through an idempotent public handler with task ID/revision, due/actual time and correlation. Task alone owns human assignment, deadline context, overdue projection and work progress. Late/duplicate executions do not complete/reopen a task. ADR-0012 scheduled `tasks` port remains a distinct background handler concept. Task PR #138 now establishes conceptually approved self-reported versus verified work states and source-withdrawal history; Scheduler retries/reminders must never fabricate verification, change the accountable assignee or undo completed evidence. Preserve prior approvals and provisional neighbouring work; reconcile overlaps against latest master before merging.

## Temporal Gateway infrastructure integration reciprocal note — 23 November 2026

**Status: TG-01–TG-05 owner-approved conceptual technical boundary under accepted ADR-0015 (23 November 2026); not a completed review of this neighbouring capability or a verified implementation API.** [Temporal Gateway approved conceptual infrastructure library contract](../../adapters/temporal-gateway/adapters-record.md); draft PR #139 (historical review).

Scheduler owns authorised scheduled tasks, due/catch-up/retry policy and business status; Temporal Gateway is only an optional ADR-0015 technical SDK/worker/schedule adapter. Scheduler supplies validated schedule/handler references and revision/idempotency context; the adapter returns technical accepted/rejected/unknown receipts and observations, never a domain completion guarantee. Provider timeout requires owner-led reconciliation, and absence must not invent success. This is the owner-approved Temporal Gateway boundary; Scheduler's independently approved design and later master changes are preserved.



## Time & Attendance reciprocal conceptual note — 23 November 2026

**Status: Time & Attendance TA-01–TA-06 owner-approved conceptually on 23 November 2026; draft PR #143 (historical review). This does not approve a published scheduler interface or implementation.** Time & Attendance may register background reconciliation tasks for platform Scheduler. Platform Scheduler executes timed tasks, not employee shift rostering or evidence of actual attendance; prospective Workforce Scheduling owns planned shifts. [Proposed contract](../../capabilities/time-attendance/capability-record.md). Existing approved decisions remain authoritative.

## Workflow conceptual review — reciprocal alignment (23 November 2026; draft PR #150)

**Status: Workflow-side conceptual design owner-approved (WF-01–08, 23 November 2026); not new approval of this neighbouring capability or an implemented integration.** [Workflow's idealised public contract](../../capabilities/workflow/capability-record.md) keeps human review-route definitions, approver eligibility/assignment, delegation and qualified approval evidence with Workflow; each originator retains its own authoritative source record and final decision. Scheduler runs bounded, identified deadline/reminder occurrences. Workflow interprets due events only after fresh revision/authority checks, and never approves from a timer alone.

Dependencies are host-composed public ports/events, not private storage or automatic package imports. Resolve concurrent draft changes against latest master before merging.

## Checkout reciprocal conceptual interface — 24 November 2026

**Checkout-side conceptual interface owner-approved (24 November 2026):** Checkout PR #151 (historical review), [conceptual contract](../../capabilities/checkout/capability-record.md). Checkout requests time-bound expiry/reconciliation triggers with attempt and operation identity; Scheduler owns technical execution and retries, Checkout checks current owner status before action. Existing approved decisions remain authoritative; host-bound public ports only.
