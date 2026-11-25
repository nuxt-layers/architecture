# Workflow — conceptual capability specification

**Capability:** `workflow` · **Class:** Platform · **Status:** owner-approved conceptual direction (WF-01–08, 23 November 2026); no verified implementation contract or acceptance evidence. **Review:** [draft PR #150](https://github.com/nuxt-layers/architecture-blueprint-review/pull/150). Accepted [architecture-rules](https://github.com/nuxt-layers/architecture-rules) ADRs and the normative Capability Standard take precedence over this non-normative blueprint.

## 1. Purpose and authoritative boundary

Workflow coordinates **human review, sign-off and approval**. It defines permitted approval routes; establishes who may decide; manages assignment, delegation, quorum, escalation and expiry; records attributable decisions; and returns qualified approval evidence to the capability that requested it. It works independently for standalone approvals without Process, Task, Scheduler, Temporal or a GUI.

Workflow owns:
- Tenant/site-scoped **route definitions**, versions, stage/quorum rules and their approval/activation history.
- **Approval cases**, stage/participant assignments, human votes, recusals, delegations, exceptions and decision history.
- **Route outcomes** (pending, approved, rejected, expired, withdrawn, cancelled, contested or unknown), their source revision/digest, supporting provenance and evidence.
- Its own persistence, recoverable worklist, operational checkpoints and **committed outbox**.

It **does not own** business-process models/stage progression (Process); work completion/verification (Task); business transactions, publication, bookings, finance or awards (originating domains); permission decisions, identities or sessions (IAM); legal applicability (Legal Compliance); independent evidential custody (Audit); technical logs (Logging); derived reports (Reporting); scheduled execution (Scheduler); event transport (Message Queue); notice delivery (Notifications); or external worker SDKs (Temporal Gateway).

**Key rule:** *an approved route is evidence, not execution of the requested business action*. The originating owner must independently recheck its resource revision, current permissions, applicable policy and any required legal constraints, then commit its own transaction. No Workflow response grants an access role, reserves stock, pays an invoice, publishes material or issues a qualification.

This is a responsibility-owning, durable capability, **not** a stateless library or a general workflow/Process engine. It may use a framework-independent core and an optional Nuxt presentation. The default deployment is a modular monolith. Partners connect via host-composed public ports or events; conceptual cooperation never authorises private-table access or circular package imports.

## 2. Native model and lifecycle

| Record | Owned states and rules |
|---|---|
| **Route definition** | Draft → validated → activated → superseded/retired. Versioned subject types, permitted requester/approver selection, ordered or parallel stages, conditions, quorum/veto, separation of duties, delegation, deadlines, expiry and escalation. Changes never silently rewrite an active case. |
| **Approval case** | Submitted/accepted → pending/active/blocked/paused/escalated → approved/rejected/expired/withdrawn/cancelled/contested; uncertain technical receipts remain **unknown** until reconciled. Stores requester, opaque source reference, source revision/digest, action, risk, route/policy version, identity, correlation and expiry. |
| **Participant decision** | Assignment/invitation/acceptance, eligible approval/rejection/abstention, recusal, valid delegation and attributable reason/evidence. A vote is distinct from a Task completion, notice receipt or technical acknowledgement. |
| **Decision evidence** | Case and route revisions, matched subject/digest, actor and qualification, stage/quorum proof, decision/effective/recorded time, expiry, policy and evidence handles, correction/successor references. Prior decisions remain traceable. |
| **Operational record** | Durable request/command IDs, expected revisions, event IDs, due checkpoints, retries, provider uncertainty, incidents and corrective actions. |

The **native minimum** is to register, validate and activate a route; admit and query a request; show a protected worklist; accept qualified human decisions; check quorum and independence; delegate/recuse where permitted; expire, cancel, withdraw or escalate; reconcile unknown results; and expose attributable history and events. Required persistence must be available before claiming durable acceptance. The core operates headlessly and can provide its own worklist without Task or Notifications.

**Invariants:** routes have bounded, unambiguous transitions and terminal rules; sequential steps follow their prerequisites; parallel steps declare all/any/n-of-m quorum and veto semantics; prohibited self-approval, conflicting roles or invalid delegation never count. Active cases pin the route/policy revision unless a separately authorised migration is recorded. Revocation, subject edits or policy changes require fresh checks; completed evidence is not retroactively rewritten. Appeal or correction creates a linked successor. A timer, callback or worker acknowledgement never approves a case by itself.

**Failure and recovery:** distinguish rejected, unavailable, stale, conflicting, blocked and unknown. A timeout is not proof of failure or success. Use idempotency, optimistic revisions, source-qualified reconciliation, safe bounded retries and a transactional outbox; delivery can repeat or arrive out of order. Never promise cross-service exactly-once effects. An untrusted or out-of-date source, denied IAM decision, missing mandatory legal condition or unknown critical audit evidence keeps the relevant action blocked. Restoration must not invent approval or replay a financial/business action.

## 3. Idealised public input contract

These are **business-level surfaces**, not exported TypeScript signatures, endpoints or a universal request DTO.

| Source | Input Workflow needs | Validation and absence |
|---|---|---|
| Host, caller, Identity, Authentication, Authorisation and conditional Verification | Tenant/site, trusted caller, subject, assurance, resource-aware `decide` result, current eligibility and step-up proof | Required for protected actions; deny missing, stale, cross-tenant or insufficient authority. Received events do not grant permission. |
| Source-owning capability or Process | Approval request: opaque resource/action, immutable revision/digest, risk/policy, deadline, requester, correlation and idempotency; change/withdrawal or reconciliation evidence | Required for source-linked cases; authenticate issuer, check revision and source scope. Missing/changed evidence blocks qualification. |
| Administrator and Configuration | Route definition and authorised policy/settings versions, allowed roles, stages, quorum, deadline and delegation/escalation rules | Required to create/activate a route; reject invalid, impossible, ambiguous or floor-weakening rules. Configuration owns effective settings, Workflow owns route interpretation. |
| Approver or delegate | Accept, approve, reject, abstain, recuse, delegate or contest; actor, reason, evidence and expected case revision | Verify current qualification, independence, assurance, stage and revision at decision time; reject duplicate conflicting votes. |
| Clock; optionally Scheduler | Trusted instants, local zone and calendar semantics; scheduled/actual occurrence and identity for reminders or expiry | Clock semantics essential; Scheduler optional. A repeated/late occurrence triggers re-evaluation, never a favourable vote. |
| Optional Task, Notifications, Integrations or Temporal Gateway | Work evidence, delivery/worker receipts, attested provider callback and provenance | Receipts alone are not approval; verify origin, scope, signature/mapping, version and replay safety. Optional unavailability must not silently change policy. |
| Legal Compliance, Privacy; optional Storage/Content Security | Applicable legal competence, signatures/retention/holds; authorised evidence references and safety result | Mandatory rule unknown ⇒ block; Workflow does not own legal interpretation, file bytes or malware findings. |

Inputs must distinguish **absent**, **not applicable**, **unknown/unavailable**, **invalid**, **stale**, **contradictory** and **not authorised** when those conditions affect outcome. Do not automatically accept source claims, cached permission decisions or provider callbacks as final.

## 4. Idealised public output contract

| Consumer | Output and meaning |
|---|---|
| Originating domain / Process | **Request receipt**: accepted, rejected, duplicate or uncertain, with case/version, pinned source revision and correlation. Acceptance is **not** approval. |
| Originating domain / Process | **Qualified outcome**: pending/approved/rejected/expired/withdrawn/cancelled/contested/unknown, subject revision/digest, route and policy version, approval/quorum and separation evidence, effective time, expiry and provenance. The consumer decides its own binding effect. |
| Authorised approver, requester or administrator | **Queries**: permitted actions, assigned worklist, case status, active route, revisions, history and evidence references. Include freshness, completeness, disclosure scope and pagination. Revalidate actions server-side. |
| Audit / Legal Compliance | Attributable, minimised approval and administrative evidence, decision corrections, qualified intake provenance and retention/hold context; Audit owns independent custody and intake receipts. |
| Message Queue and subscribed consumers | **Committed lifecycle events** for case, assignment, vote, route and conclusion, each with source event ID, revision/schema version, tenant, timestamp, correlation and disclosure class. Workflow owns the outbox; MQ owns transport. Replays are possible. |
| Logging / Observability / Reporting | Sanitised diagnostics and technical health; authorised workflow case/outcome facts for downstream analysis. Logs and reports do not change approval state. |

**Commands:** route management, request/withdraw/cancel, decision/delegation/recusal, exceptional corrections and scoped reconciliation. Require authenticated authority, assurance, policy, expected revision, idempotency and explicit **accepted versus completed** response.

**Queries:** scoped route, case, permitted-action, history, worklist and operational status; declare freshness, partial/unknown state and authorisation. Avoid exposing private persistence records.

**Events:** only committed changes, emitted through Workflow's durable outbox. Consumers deduplicate and independently authorise business actions. Event delivery is not the approval decision.

**Errors:** Workflow defines its own business meanings (invalid route, denied/step-up required, stale subject, conflict, expired, unavailable, unknown outcome). The stateless `error-normalisation` library may return a safe code, message key, correlation and qualified retry guidance; it never changes the underlying outcome or decides whether to retry.

## 5. Relationships and reciprocal interfaces

| Partner (requirement) | Inputs to Workflow | Outputs supplied by Workflow; source-of-truth boundary |
|---|---|---|
| **IAM / Verification** (essential for protected operations) | Caller/assurance, eligibility, identity and access decisions | Qualified decision actor references; **Authorisation** alone controls permissions and grants. |
| **Configuration** (when policies configurable) | Approved setting values and effective version | Route governance/approval evidence; Configuration alone activates its own change. |
| **Process** (optional) | Business stage and source revision needing approval | Qualified gate outcome; Process alone progresses business instances. |
| **Task** (optional) | Work completion and verification evidence | Assigned approval-related work; Task evidence never substitutes for a human vote. |
| **Scheduler / Clock** (Clock semantics required, Scheduler optional) | Temporal interpretation and named occurrence | Reminder/expiry eligibility and handler; Scheduler owns execution attempts. |
| **Message Queue** (optional distribution; outbox remains essential) | Transport custody/delivery status | Committed Workflow outbox messages; MQ delivery is not decision finality. |
| **Notifications** (optional) | Delivery receipt or failure/unknown | Review invitation and reminder request; delivery never signifies a vote. |
| **Legal Compliance / Privacy** (conditional legal/privacy controls) | Applicable competence, policy, retention, disclosure and holds | Attributable evidence; legal decisions remain with Legal Compliance. |
| **Audit** (conditional critical-evidence gate) | Intake/integrity receipt or explicit unknown | Material decisions, route changes, delegations and security-relevant acts; Audit owns evidential custody. |
| **Logging / Observability** (operational cooperation) | Diagnostic intake/telemetry facilities and status | Sanitised technical failure, latency, correlation, health and reconciliation details; never secrets or evidence payloads. |
| **Reporting** (optional consumer) | No required input; optional authorised report references | Source-qualified status, duration, outcome and historical records; Reporting owns report definitions/derived measures. |
| **Time & Attendance** (conditional) | Reviewed worked-time approval request with scoped actual-time evidence, version and authority | Qualified route result only; Time & Attendance owns worked-time truth, approval rules and final decision; native review remains possible without Workflow. |
| **Publisher, Content Editor, Course, Qualification** (as requested) | Revision/digest-bound review cases | Approval evidence; originating owner publishes content, certifies or issues awards. |
| **Billing, Booking, Project, Accounting, Integrations, organisational onboarding** (as requested) | Risk-scoped financial, capacity, project, grant or onboarding cases | Time/version-qualified approval; originating capability checks current balance, capacity, entitlement, policy and commits its own transaction. |
| **Storage / Content Security** (optional) | Authorised evidence handle and scan/safety result | Evidence associations; bytes and safety judgments stay with respective owners. |
| **Temporal Gateway / Infrastructure** (optional adapter) | Provider-run technical receipts, status and uncertain operations | Opaque execution/signal/cancellation intents; no human, business or persistence authority transfers. |

**Four-way operational rule:** Error Normalisation is a pure in-process transform; Logging is diagnostic evidence; Audit is attributable independent custody; Reporting is derived interpretation. Their receipts cannot manufacture Workflow success, and their components must not import Workflow internals. Where policy makes critical Audit intake a prerequisite, Workflow checks the actual receipt/recovery status before returning a qualified final decision.

No partner is forced to import the other partner's implementation. The host connects declared directional public contracts; dependency and Nuxt extension edges remain acyclic. See reciprocal notes in [Process](../process/capability-record.md), [Task](../task/capability-record.md), [Scheduler](../../services/scheduler/services-record.md), [Message Queue](../../services/message-queue/services-record.md), [Authorisation](../authorisation/capability-record.md), [Configuration](../configuration/capability-record.md), [Notifications](../../services/notifications/services-record.md), [Audit](../audit/capability-record.md), [Legal Compliance](../../capabilities/legal-compliance/capability-record.md) and [Publisher](../publisher/capability-record.md).


**Time & Attendance reciprocal alignment (merged PR #143, 23 November 2026):** [Time & Attendance](../time-attendance/capability-record.md) owns the rules for approving qualified worked time and its final attendance outcome. Workflow may coordinate an optional review route and return attributable evidence; route completion cannot manufacture attendance truth. A source capability may retain native review without Workflow.

## 6. Security, information governance and provider boundaries

Follow OWASP ASVS 5 Level 2 minimum, with applicable Level 3 controls for privileged, financial, recovery or legally consequential sign-offs. Enforce server-side resource authorisation, step-up, least privilege, tenant isolation, bounded route inputs and independent approver/separation checks. Avoid hidden tenant-parent access inheritance and implicit delegated powers. **FAC-12 (owner-approved resolution, 24 November 2026):** Workflow cannot independently bypass mandatory approvals. Accepted ADR-0007 is a narrowly scoped IAM emergency mechanism, not a business approval override. Any exceptional business procedure requires separately approved, bounded source-owner authority, applicable legal justification, attributable evidence and independent review; absent such authority, fail closed. No new emergency privilege is created.

Workflow stores minimal participant references, reasons, evidence metadata and lineage; **Profile** owns personal details, **Storage** file bytes, **Privacy** consent/retention policy, **Legal Compliance** applicable duties and holds. Restrict data export, external providers, searches and worklists by purpose, tenant and permission. Never log confidential approval content or secrets. Record corrections and erasure/hold outcomes without silently falsifying evidence. Time handling distinguishes date-only obligations, exact instants, zones, DST and policy-effective time.

**Provider neutrality:** capability-owned schema, stores, outbox and decision rules are independent of Temporal, external approval vendors or notification transports. The host supplies infrastructure and secrets; any optional adapter must verify supported source/target mapping, version, durability, residency, limits and costs. Migration or withdrawal requires export, drain/fencing, in-flight reconciliation, unknown-state resolution, audit lineage and rollback. Do not claim a configured or acknowledged provider has completed business approval. Required persistence absent ⇒ fail closed.

## 7. Optional GUI and host presentation

A usable headless service is **essential**; the graphical interface is **optional**. The actual [application-test-template](https://github.com/nuxt-layers-test/application-test-template) shows the intended pattern: host-owned `app/app.vue` sidebar under **Capabilities**, shared top bar/Appearance, `/admin` test cards, and a capability-owned page displayed through `<NuxtPage />`. Theme Manager appears at `/theme-manager`; a derived Workflow test application would add **Approvals** → `/workflow`, while the host retains its shell and menu.

| Conceptual route | Screen and core actions | Audience |
|---|---|---|
| `/workflow` | **Dashboard**: waiting on me, my requests, overdue, completed and blocked/unknown; source-qualified case links | Authorised users |
| `/workflow/inbox` | **My approvals**: filtered worklist, due dates, permissible next actions | Approvers |
| `/workflow/cases/:id` | **Decision detail**: source revision/evidence, route stages, quorum, timeline, approve/reject/abstain/recuse/delegate, step-up, reason and explicit receipt/reconcile | Eligible approvers |
| `/workflow/requests` | **My requests**: create where permitted, monitor, withdraw and link to source-owned context | Requesters |
| `/workflow/history` | **Approval history**: source-qualified decision evidence, corrections and protected export | Authorised users/reviewers |
| `/workflow/routes` and `/workflow/routes/:id/design` | **Route administration/designer**: draft, validate, preview, version, activate/retire, stage/quorum/SoD, escalation. Text/form editor first; accessible diagram optional, not a Process modeller | Route managers |
| `/workflow/operations` | **Operator console**: blocked/uncertain cases, due/notification/provider issues, safe reconciliation | Operators |

Route paths and named UI operations remain **conceptual** until a published root `CONTRACT.md` defines them. The host owns menu visibility, path registration and composition; Workflow owns capability pages and public data access. Notifications and source domains may deep-link to cases. An optional presentation switch disables screens without disabling the headless contract. Theme Manager owns tokens; UI components do not duplicate its styling authority. The template's Theme Manager **test mode** is local and unauthenticated: no production-ready IAM or permission to expose Workflow test actors is inferred.

WCAG 2.2 AA, accessible semantics/keyboard navigation, focus and error summaries, plain-English statuses, non-colour-only cues, reduced-motion and responsive views apply throughout. Localise text with BCP 47/CLDR and Clock semantics. Server authorisation is mandatory even when controls are hidden. A stale revision or uncertain submit must show refresh/reconcile, not falsely show success. A visual route diagram cannot be the only editing surface.

## 8. Standards and open-source library guidance

**Standards (design references, not automatic certification):** [OMG BPMN 2.0.2 / ISO/IEC 19510](https://www.omg.org/spec/BPMN/2.0.2) for human steps/gateways without taking Process ownership; [OMG DMN 1.6](https://www.omg.org/spec/DMN/1.6) for explainable rule decisions; OASIS WS-HumanTask 1.1/BPEL4People 1.1 for human worklists and delegation (not mandatory legacy protocols); ISO/IEC 27001:2022, 27002:2022 and 27701:2025 for security/privacy; ISO 15489-1:2016 for record provenance and retention; ISO 37301:2021 and ISO 9001 for organisational process governance. Apply [OWASP ASVS 5](https://asvs.owasp.org/), relevant NIST SP 800-53 access/audit controls and SP 800-63-4 assurance guidance; [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/), WAI-ARIA 1.2 and ATAG 2.0 where the GUI edits routes. UK GDPR/Data Protection Act 2018, UK/EU eIDAS, Electronic Communications Act 2000 and ETSI EN 319 401 apply **only when the relevant data, jurisdiction, signature/trust service and transaction call for them**. A Workflow vote is **not automatically a legally valid electronic signature**; Legal Compliance and specialist providers establish that claim. Sector requirements require separate review.

**Library admission rule:** prefer complete, current, publicly available code under commercially permissive MIT/Apache-2.0/ISC/PostgreSQL-type licences, including all functionality needed in production; reject hidden paid features, intentionally lagging open-core releases and proprietary design/runtime obligations. Evaluate source, release provenance, transitive licences/SBOM, security and the Node 26/TypeScript 6 support matrix before choosing exact versions.

| Candidate | Use and recommendation |
|---|---|
| [XState v5](https://github.com/statelyai/xstate) (MIT) | Preferred evaluation for deterministic case/route transitions; commercial Stately tools are not required. |
| [json-rules-engine](https://github.com/CacheControl/json-rules-engine) (ISC) | Optional rule evaluator when configured conditions justify it; bound and validate expressions, do not replace Authorisation. |
| [Ajv](https://github.com/ajv-validator/ajv) (MIT) | Preferred route/contract JSON Schema validation; [Zod](https://github.com/colinhacks/zod) or [Valibot](https://github.com/open-circle/valibot) (MIT) are alternatives, not an automatic second stack. |
| [node-postgres / pg](https://github.com/brianc/node-postgres) (MIT), optional [Kysely](https://github.com/kysely-org/kysely) (MIT) | Host-passed PostgreSQL pool, capability-owned schema/outbox. |
| [OpenTelemetry JS](https://github.com/open-telemetry/opentelemetry-js) (Apache-2.0); [fast-check](https://github.com/dubzzz/fast-check) (MIT) | Optional shared Observability instrumentation and property-based CI acceptance. |
| [JSON Forms](https://github.com/eclipsesource/jsonforms) (MIT) | Optional Vue-capable route form rendering, subject to accessibility and design-token checks. |
| [Temporal Server/SDK](https://github.com/temporalio/temporal) (MIT) | Optional **only through Temporal Gateway**; [PGMQ](https://github.com/pgmq/pgmq) belongs with Message Queue, and [pg-boss](https://github.com/timgit/pg-boss) with Scheduler, not directly in Workflow. |

Avoid mandatory bpmn-js/dmn-js editor watermark terms, commercial/open-core additions (including Graphile Worker Pro and BullMQ Pro), Redis requirements and a second generic workflow engine. **These are evaluation candidates, not adopted dependencies**, and no local tests or implementation changes have occurred.

## 9. Conceptual acceptance scenarios

| Input | Required behaviour and output | Authority |
|---|---|---|
| Standalone two-person route; two eligible independent votes | Admit, pin revision/policy, qualify votes and return attributable approval evidence | Workflow |
| Process, Billing or Publisher requests review | Return accepted case and qualified outcome; source revalidates capacity, value, digest or process gate and commits its own action | Originating capability |
| Source subject changes or approver loses authority mid-route | Reject stale decision, hold/revalidate case; old evidence remains traceable | Source/IAM + Workflow |
| Task completed, notice delivered, MQ acknowledged, Temporal worker completed | Do **not** infer approval | Workflow |
| Self-approval where prohibited, cross-tenant query or forged callback | Deny without leaking data; record relevant protected security evidence | Workflow / IAM |
| Invalid route, impossible quorum, expired subject or mandatory legal status unknown | Reject or block with safe, specific error; do not weaken required floor | Workflow / Legal Compliance |
| Duplicate or out-of-order command/event, provider timeout | Return idempotent receipt or conflict/unknown with safe reconciliation, no extra vote or domain effect | Workflow |
| Late Scheduler tick; changed route definition | Re-evaluate eligible case time; pin original route version unless explicitly migrated | Workflow |
| Rejected/contested case, appeal or correction | Preserve original decision and create authorised successor evidence | Workflow |
| Audit intake unavailable for a mandatory critical decision | Hold according to critical evidence policy; surface recovery path, never claim evidence archived | Workflow + Audit |
| GUI disabled, or optional Notifications/Task/Temporal unavailable | Headless worklist and approval service remain usable where required security/infrastructure is available | Workflow |
| Arbitrary background job, publication, grant or payment requested | Refuse as unsupported; originating capability or Scheduler owns the action | Correct domain owner |

## 10. Decision status and remaining evidence

**Owner-approved (23 November 2026):**
- **WF-01:** durable, independent human-approval boundary, distinct from Process and Temporal.
- **WF-02:** native headless route, case and decision history with unknown/recovery handling.
- **WF-03:** digest/revision-bound multi-stage and quorum approvals, current eligibility, separation, delegation and source-owned finality.
- **WF-04:** public commands, queries, outcomes, committed events and provider-neutral composition; own outbox and replay safety.
- **WF-05:** fail-closed IAM, assurance, legal and source-version gates.
- **WF-06:** optional scheduler, task, messaging, notifications, integrations and Temporal; no hidden mandatory coupling.
- **WF-07:** optional accessible Approvals dashboard and operator/route screens using host-owned sidebar and headless alternative.
- **WF-08:** provenance, privacy, legal holds, migration/unknown recovery and separate error-normalisation/Logging/Audit/Reporting boundaries.

**Other approved conceptual boundaries remain with their owners:** PROC-01–07, TASK-01–14, SCH-01–08, MQ-01–10, TG-01–05 and specific neighbouring capability decisions. Their individual runtime contracts, package readiness and merge state are not inferred here.

**Open product decisions (do not silently resolve):** (1) which quorum/veto patterns ship initially, (2) whether tenant users can publish approval routes themselves or need protected operators, (3) authorised override/appeal mechanisms and limits, and (4) whether specialist electronic signatures are a first-release integration. These do not negate the reviewed architectural boundary but must be settled before affected implementation contracts.

**Unverified implementation:** `nuxt-layers/workflow` exists on `master` (opening observation `f31193022186f70a9bdcf8c64690b726611a76b2`), with only a minimal README and no retrievable root `CONTRACT.md`. The conceptual interfaces above are not claimed as shipped APIs. Future work must publish a complete root consumer contract, evidence of typed errors and security permissions, owned schemas and `STORAGE-REGISTER.md`, provider/health contracts, and an independently composed minimal host within ADR-0012's **50-line** budget. CI/user must verify security, business, failure/replay, privacy, accessibility, i18n and provider compatibility. No certified legal compliance or operational readiness is claimed.

**Conceptual completion:** this specification consolidates the approved ownership, interfaces, collaborations, standards, libraries, GUI and acceptance principles. Open implementation/product choices and the mandatory fresh-master technical **and** architectural pre-merge validation remain explicit. **Do not merge without separate owner approval.**

## Checkout reciprocal conceptual interface — 24 November 2026

**Checkout-side conceptual interface owner-approved (24 November 2026):** [Checkout PR #151](https://github.com/nuxt-layers/architecture-blueprint-review/pull/151), [conceptual contract](../checkout/capability-record.md). Checkout requests scoped approval and consumes verified approval evidence; Workflow owns routing/checkpoints, not acceptance or payment authority. Existing approved decisions remain authoritative; host-bound public ports only, no circular imports.
