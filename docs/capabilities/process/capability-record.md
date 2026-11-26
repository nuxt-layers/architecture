# Process — conceptual capability record

**Classification:** Platform capability candidate; responsibility-owning, potentially stateful, headless-first with optional presentation. **Status:** PROC-01–PROC-07 and supplementary safeguards **owner-approved conceptually (22 November 2026)**; separate capability packaging remains conditional on demonstrated independent consumers. Not implemented, installed or verified. This is an idealised public contract, **not** a published implementation `CONTRACT.md`. Governing accepted ADRs and Capability Standard take precedence.

## Purpose and classification decision

Process describes, versions, starts, tracks and concludes **business processes**, including their business stages, obligations, applicability, accountable owners, checkpoints, dependencies, exceptions and outcome evidence. Examples include organisational onboarding, supplier qualification, complaint handling and internal change control. It gives a consistent, domain-neutral account of *which business process is being followed and what outcome is recorded* without owning each participating domain's transactions.

**Owner-approved conceptual classification (PROC-01):** retain as a Platform capability, not a pure stateless library or merely a host composition. Independent business process definitions, active instances, cross-stage evidence and process-level finality justify a coherent domain-independent source of truth and optional persistence. However, deployment as a separate package is conditional on demonstrating repeated independent consumers; an initial implementation MAY embed the public Process boundary in a composition rather than creating unnecessary infrastructure. Pure process templates without independent business state should remain Configuration/templates until these responsibilities are needed.

**Critical separation:** Process owns the *business process model*, instance progression and **process-level** outcomes. [Workflow](../workflow/capability-record.md) owns human approval routing, delegation, step execution/coordination and their checkpoint evidence. [Scheduler](../../services/scheduler/services-record.md) owns timed trigger execution/retries. [Task](../task/capability-record.md) owns individually assigned work; [Project](../project/capability-record.md) owns a bounded body of work, milestones and budgets. Process is neither an unrestricted orchestration engine nor a second approval service, task board or operational scheduler. Its completion never substitutes for a domain owner's binding result.

## Owned information, decisions and lifecycle

| Owned concern | Process authority |
|---|---|
| Definition and version | Tenant-scoped process type, name/purpose, eligibility, version-pinned stage/transition graph, entry/exit conditions, required evidence and referenced authoritative domain result types; draft → validated → approved/published → superseded/retired |
| Process instance | Instance identity, initiating source and subject/resource refs, selected definition/policy revision, context and accountable process owner; requested → admitted/active → waiting/blocked/paused → completed, failed, cancelled or withdrawn; exceptional reopen/correction explicitly governed |
| Stage and gate ledger | Stage eligibility, requested/confirmed checkpoint status, independently sourced attestations and timestamps, revision, failure/expiry, compensating/corrective links; no fabrication of dependent completion |
| Process outcome | Process-owned synthesis: completed/unsuccessful/cancelled/contested/unknown, evaluation basis, effective and recorded times, version, supporting domain/approval evidence and unresolved obligations |
| Exceptions and history | Waivers within permissible floors, escalations, re-evaluations, transitions, correlation, provenance, retention and replay-safe evidence; immutable prior decisions with corrective revisions |

A definition must have valid identities, bounded transitions, explicit termination semantics and no unguarded cycles or impossible entry/exit conditions. Loops may be intentional and bounded by policy. Active instances pin their definition and governing context; changes require explicit migration approval or retain the pinned version. Archive never means delete evidence subject to retention or hold.

**Native minimum:** register/validate/publish/retire definitions; admit/start an instance; evaluate an allowed transition against current evidence; hold/resume/escalate/cancel; record accepted third-party checkpoint evidence; reconcile uncertain results; conclude a process with explicit outstanding requirements; query history and export authorised process evidence. Manual service/API-only operation is valid without Workflow, Scheduler, external vendors or GUI where a process requires no such optional service. Where a mandatory stage has no qualified provider, the process remains blocked and does not invent an approval.

## Public contract at a glance

**Agreed conceptual interfaces, not shipped APIs.** Process accepts commands to define/publish processes, start and control instances, attach evidence, handle exceptions and reconcile uncertain results. It returns authorised definition and instance queries, allowed next actions, version-pinned outcomes, evidence/history views and committed lifecycle events. It can request approvals from Workflow, assigned work from Task and timed actions from Scheduler, but never takes ownership of those results. Exact endpoints, TypeScript names and wire schemas belong in a future root `CONTRACT.md`.

## Idealised public inbound contract

All inputs are conceptual semantic surfaces, not exact endpoints or wire types.

| Source | Input facts, command or context | Validation, mandatory status and unavailable behaviour |
|---|---|---|
| Authorised caller / host + IAM | Tenant, subject/resource, trustworthy caller and assurance, requested action, scope, revocable authorisation decision | Required on protected operations; unknown or denied authority fails closed, no implicit access from group or tenant parentage |
| Process administrator / Configuration | Definition draft, stage structure, allowed transitions, registered scoped options and approved effective policy revision | Definition must validate; Configuration stores setting values, Process interprets process rules; no tenant override of mandatory floors |
| Initiating domain / caller | Process type, subject's authoritative identity/revision, initiating event/decision, business correlation, idempotency and purpose | Required for that process; confirm reference/tenant/authority, reject stale, contradictory or out-of-scope requests |
| Domain owners (Order, Recruitment, Billing, Manufacturing etc.) | Qualified domain state, eligibility, signed/attributable completion or refusal, revision, expiry and revocation | Conditional per stage; domain remains sole authority for its facts, ambiguous status blocks dependent transition |
| Workflow | Versioned approval route status, approver decision/evidence, effective period, delegation/expiry and execution status | Conditional if approval required; pending/failed Workflow is not approval; revalidate qualified standing |
| Task / Project | Assigned-work or milestone references, completion/exception evidence and revisions | Optional/conditional; work completion is evidence, not automatic domain or process approval |
| Scheduler / Clock | Due trigger identity, scheduled versus actual time, trusted canonical instants, zone/rule version | Conditional for time-dependent stages; late/missing/duplicate trigger never changes substantive eligibility |
| Legal Compliance / Privacy | Qualified legal constraints/holds, lawful-purpose, disclosure and retention requirements, provenance/effective period | Mandatory where applicable; conflicting or unknown critical restriction holds unsafe transition |
| Operator / external Integrations | Evidence claim, callback, attachment reference or provider acknowledgement | Validate origin, consent, contract, freshness and idempotency; external claims remain unverified pending authoritative reconciliation |

No input event, provider callback, assignment or success response confers authorisation. Reject unknown definition versions, prohibited cross-tenant references, forged evidence, state conflicts and unsupported transitions with stable refusal reasons and safe disclosure.

## Idealised public outbound contract

| Consumer | Output and authoritative meaning | Limits |
|---|---|---|
| Initiator / domain owner | Accepted/declined process start, instance reference, applicable version, current gates, process outcome and evidence references | Process conclusion is **not** the source domain's final commercial, legal, employment or stock transition |
| Workflow / Task / Scheduler | Qualified requests for approval route, human work or due trigger; cancellation/reconciliation hints and correlation | These owners decide and record execution/work/approval attempts; requests may be pending or refused |
| Authorised human / host GUI | Scoped definitions, active instances, timeline, blockers, obligations, current stage and process-level outcome | Completeness/freshness, source provenance and uncertain states must be visible; no leaked unrelated tenant data |
| Audit / Reporting / Search | Attributable transition evidence, authorised read models and committed process events | Audit owns independent retained audit evidence, Reporting derives aggregates, Search owns replaceable indexes |
| Notifications | Authorised notification intents about required intervention or final status | Notification delivery is not proof of approval or receipt |
| Integrations / exporting consumers | Versioned, minimally disclosed process history/evidence and reconciliation status | No transfer of origin-domain ownership; export obeys applicable rights, holds and provider restrictions |

Every outcome distinguishes **request accepted**, **action dispatched**, **evidence observed**, **verified/committed result**, and **unknown/failed**. Include tenant, process/definition and instance identifiers, source reference/revision, decision policy/version, effective/recorded time, provenance, assurance where justified, and redaction/access scope; no mandatory universal envelope is proposed.

### Commands, queries, events

**Commands (owner-approved conceptual):** validate/publish/retire definition, start instance, request transition, attach evidence by reference, acknowledge/resolve exception, pause/resume, migrate pinned definition, cancel/close/reopen under correction authority and reconcile uncertain checkpoint. Each validates current resource state, tenant, actor, assurance and policy; supports stable idempotency keys and expected revisions; returns accepted, refused, pending, conflict or unknown rather than pretending distributed completion.

**Queries (owner-approved conceptual):** list/describe definitions, permitted transitions, process instances, required evidence, stage/exception timeline, provenance, final/outstanding outcomes and authorised export. Filters and pagination are bounded, views state freshness/completeness and provenance, and historic read rights remain enforced.

**Events (owner-approved conceptual):** definition published/retired, instance admitted/transitioned/blocked/resumed/closed, checkpoint evidence accepted/revoked, outcome recorded/corrected and reconciliation required. Publish **only after** Process commits its owned state via its durable outbox; Message Queue transports at-least-once and consumers deduplicate/reconcile. A Process event cannot assert that another owner committed an unconfirmed change. No global exactly-once guarantee.

## Cooperation and direction of public contracts

| Neighbour | Process receives | Process supplies | Dependency and authority rule |
|---|---|---|---|
| Identity / Authentication / Authorisation | Tenant/resource/identity references, effective assurance and per-action access decisions | Request-specific resource/action context and attributable process references | Essential security services supplied by host; no process ownership of identity or rights |
| Configuration / Legal Compliance / Privacy | Approved scoped settings, effective legal and privacy constraints | Candidate process requirement/use and risk evidence | Conditional by use case, never overrides mandatory/legal floors |
| Workflow | Approval/route outcome and evidence | Approval request and expected checkpoint/policy revision | Optional generally, required for a process whose mandatory gate needs Workflow; Workflow is approval coordinator, Process evaluates business-process progression |
| Scheduler / Clock | Trigger attempt and trustworthy temporal semantics | Due-work request and process-specific idempotent handler | Scheduler optional except configured timed steps; Clock semantics used for all time-sensitive checks |
| Task / Project | Accepted work/progress, completion and milestone evidence | Proposed work obligation, instance linkage, stage need/outcome | Optional; Task owns tasks, Project owns project milestones/budgets |
| Domain source owners | Validated source facts, actual domain completion/refusal/expiry | Process progress, checklist obligations and process outcome references | Conditional; domains retain state and irreversible effects, no invented domain-level general process wrapper |
| Audit / Logging / Observability / Reporting | Optional collection/availability evidence | Committed business evidence, sanitised diagnostic telemetry and reportable read model | Independent consumers with distinct authority; Process is still responsible for its own operation/outbox |
| Message Queue / Notifications / Integrations | Transport/provider acknowledgements | Source-owned committed messages and constrained notification/connector intents | Optional provider-neutral adapters, no private table coupling or false delivery finality |

Use host-supplied ports and contract-level directional interfaces; business events are information flow, **not** package imports. Prevent dependency cycles when Workflow is also called by domains. Hosts bind a Process interface to interested owners, not a circular Process–Workflow implementation import. Provider removal, outages and recovered replays preserve checkpoints and expose uncertainty; no committed domain action is silently rolled back or automatically retried if unsafe. External engines, including Temporal, are optional behind execution ports, never the business authority.

## Open-source library choices

**Agreed design shortlist, not an instruction to install dependencies.** On 22 November 2026, public source, repository activity and licence metadata were checked. Recheck exact releases, bundled and transitive licences, vulnerabilities and Node/TypeScript/Nuxt compatibility before adoption. MIT and Apache-2.0 permit commercial use subject to their notice requirements; no paid cloud product is necessary.

| Candidate | Licence and source | Intended use and decision |
|---|---|---|
| [XState](../../../RESOURCES.md#xstate) | MIT | **Preferred stable v5** state/transition evaluation. Process still owns definitions, persistence, policies and outcomes; avoid v6 beta and proprietary visual tooling. |
| [Ajv](../../../RESOURCES.md#ajv) | MIT | **Preferred JSON Schema validator** for versioned process definitions and imported data. Schema acceptance is not authorisation. |
| [Zod](../../../RESOURCES.md#zod) | MIT | Optional TypeScript boundary validation only if it does not duplicate the Ajv-owned canonical definition schema. |
| [bpmn-moddle](../../../RESOURCES.md#bpmn-moddle) / [moddle-xml](../../../RESOURCES.md#moddle-xml) | MIT | Optional, validated BPMN XML interchange for a documented subset; no execution-engine or full-conformance claim. |
| [dmn-moddle](../../../RESOURCES.md#dmn-moddle) | MIT | Optional DMN interchange, not autonomous business decision authority. |
| [diagram-js](../../../RESOURCES.md#diagram-js) | MIT | Preferred optional visual editor toolkit with a keyboard-operable structured form/table equivalent. |
| [Rete.js](../../../RESOURCES.md#retejs) / [Mermaid](../../../RESOURCES.md#mermaid) | MIT | Alternative rich editor / optional read-only diagrams respectively; avoid installing competing editors without need. |
| [Temporal](../../../RESOURCES.md#temporal-server) and [TypeScript SDK](../../../RESOURCES.md#temporal-typescript-sdk) | MIT | Already planned through temporal-gateway/Workflow/Scheduler; optional durable execution, **never** Process's business authority. |
| [Flowable community engine](../../../RESOURCES.md#flowable-community-engine) | Apache-2.0 | Fully open community engine, but **not recommended**: separate Java orchestration overlaps the chosen gateway/Workflow. Proprietary Flowable modules are out of scope. |
| [OpenTelemetry JS](../../../RESOURCES.md#opentelemetry-js) | Apache-2.0 | Optional Observability instrumentation, not process history or Audit custody. |

**Excluded:** [Vue Flow](../../../RESOURCES.md#vue-flow) was archived at verification, failing active-maintenance requirements. [bpmn-js](../../../RESOURCES.md#bpmn-js) has a custom watermark licence rather than simple MIT/Apache-2.0 terms. Do not depend on proprietary Stately/Flowable/Camunda features, hosted-only services or open-core substitutes. MIT [JSONata](../../../RESOURCES.md#jsonata) is not the default user-authored rules engine because untrusted expression evaluation needs additional threat modelling and confinement. Scheduler, Message Queue, storage, search and caching already have assigned owners; do not add cron, Redis, Elasticsearch or Neo4j to Process.

**Smallest justified starting stack:** XState v5 + Ajv. Add BPMN interchange, editing, diagrams and external execution adapters **only for demonstrated consumers**. Restrict hostile XML, expressions, labels and graph complexity; enforce import limits and explicit supported subsets.

## Errors, diagnostics, audit evidence and reporting

[Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md) is a **pure library**; [Logging](../../services/logging/services-record.md), [Audit](../audit/capability-record.md) and [Reporting](../reporting/capability-record.md) own separate records and public contracts.

| Neighbour | Process supplies | Process receives | Critical boundary |
|---|---|---|---|
| Error Normalisation | Source-owned code, known or uncertain failure state, trusted context, approved mapping/disclosure profile | Safe versioned error code/category, public and diagnostic projections, message key and **advisory** retry property | No automatic logging, retry or business-status change; unknown stays unknown. |
| Logging | Sanitised technical codes, severity, latency, operation/stage reference and opaque correlation | Accepted/rejected/throttled/unavailable/uncertain intake receipt, diagnostics and health | Ordinary logging outage does not undo a valid transition; log acceptance proves neither delivery nor Audit custody. |
| Audit | Risk-selected significant attempts/denials, definition changes, gate/approval evidence, decisions, outcomes, corrections and privileged disclosures with provenance and source-event identity | Accepted/pending/rejected/uncertain receipt, evidence reference, integrity and coverage assessment | When **required capture** cannot be assured, hold the protected operation; Audit stores the evidence assertion, not Process's business truth. |
| Reporting | Authorised versioned process status, stages, duration, exception/outcome facts, revisions, timestamps, provenance, denominators and missing-data markers | Derived reports, trends, exports, scope/freshness/completeness and report execution status | Reporting cannot advance Process, infer success from log counts or make unknown outcomes complete; its outage does not block Process. |

**Distinguish:** command accepted ≠ work dispatched ≠ source-owner result verified ≠ log accepted ≠ Audit evidence accepted ≠ report complete. Process owns reconciliation and the committed outbox. Duplicate delivery must not duplicate evidence or report counts. Protect every consumer read and export against cross-tenant and small-cohort disclosure.

## Standards and external guidance

**Design references, not certification or a promise of full parser/engine conformance.** Governing ADRs and applicable law override optional technical guidance. Recheck current standards editions before implementation.

| Source | How Process uses it |
|---|---|
| [OMG BPMN 2.0.2](../../../RESOURCES.md#omg-bpmn-202), [ISO/IEC 19510:2013](../../../RESOURCES.md#isoiec-195102013) | Recognised process stages, activities and gateways; **ISO/IEC 19510 standardises BPMN 2.0.1**, not 2.0.2. Keep native model simpler and BPMN interchange optional. |
| [OMG DMN 1.5](../../../RESOURCES.md#omg-dmn-15), [CMMN 1.1](../../../RESOURCES.md#cmmn-11) | Optional decision tables and flexible evidence-led cases, without a second decision or case execution engine. |
| [ISO 9001:2026](../../../RESOURCES.md#iso-9001), [ISO/IEC/IEEE 15288:2023](../../../RESOURCES.md#isoiecieee-152882023), [ISO/IEC 25010:2023](../../../RESOURCES.md#isoiec-250102023) | Accountable inputs/outputs, controlled revisions, quality, lifecycle and testable reliability. No organisational ISO certification inferred. |
| [W3C PROV-DM/PROV-O](../../../RESOURCES.md#prov-o), [JSON-LD 1.1](../../../RESOURCES.md#w3c-json-ld-11) | Preserve provenance; optional linked-data export. No mandated RDF database. |
| [W3C WCAG 2.2](../../../RESOURCES.md#w3c-wcag-22), [WAI-ARIA 1.2](../../../RESOURCES.md#wai-aria) | **Mandatory WCAG 2.2 AA** for optional screens; semantic controls first and ARIA when necessary. |
| [OWASP ASVS 5.0](../../../RESOURCES.md#owasp-asvs-500), [ISO/IEC 27001:2022](../../../RESOURCES.md#isoiec-270012022), [NIST SP 800-53 Rev. 5](../../../RESOURCES.md#nist-sp-800-53-rev-5-au-2au-3au-6au-9au-11) | Existing ASVS L2 floor (applicable L3 for critical actions); IAM, safe error handling, least privilege, integrity and evidence. ISO/NIST are supplementary control mappings. |
| [ISO/IEC 27701:2025](../../../RESOURCES.md#isoiec-277012025), [UK ICO privacy by design](../../../RESOURCES.md#ico) | Conditional lawful purpose, minimisation, disclosure, erasure and retention requirements under relevant jurisdictions. |
| [ISO 22301:2019](../../../RESOURCES.md#iso-223012019), [ISO 31000:2018](../../../RESOURCES.md#iso-310002018-2), [UK NCSC guidance](../../../RESOURCES.md#uk-ncsc-guidance) | Business continuity, risk-based exception handling, recovery and secure delivery. |
| [OpenAPI](../../../RESOURCES.md#openapi-3), [CloudEvents](../../../RESOURCES.md#cloudevents-2) | Optional interoperability descriptions for HTTP and event adapters, not required host-level formats. |

## Policy, trust, security and operational controls

- Governing floor: accepted ADR-0001/0002/0009/0012/0016/0017/0018, OWASP ASVS 5.0 L2 (L3 where warranted) and WCAG 2.2 AA. Protect every command and sensitive query server-side; step-up, separation of duties, non-self-approval and delegation are process-specific policy constraints but cannot replace Authorisation or qualified legal competence.
- Tenant isolation, resource ownership and accountable digital governance remain with Identity and originating owners; parent tenants receive no implicit child records. Minimise evidence to typed references, provenance and appropriate proof rather than copying full personal documents. Protect secret material and provider credentials through host services.
- Privacy and Legal Compliance qualify purpose, lawful handling, retention, hold, disclosure and legal duty. Deletion/export operates on Process-owned records only; domain records remain with their owner. Configurable expiry/retention may strengthen but cannot undercut binding rules.
- Process owns its persistence port and schema if stateful and fails closed without required storage; the host provides connections. Every state change uses optimistic revision checks, an outbox for committed events, protected read/write audit evidence and reconciliation for partial failures. Process does not own the Audit store or technical log/trace sinks.
- Provider-neutral optional integrations disclose capability, status, costs/terms where known, revision, effective policy, rate limits and inability to verify remote outcomes. Migration/export preserves version pins, evidence provenance and confidentiality; no automated unsafe cross-tenant data relocation.
- Business deadlines are interpreted with Clock's canonical instants/time zones; wall clock changes and delayed scheduler execution do not create approval, bypass expiry or imply completion.
- Host composition remains one documented operation with declared services under ADR-0012's 50-line Nuxt budget; optional screens are separable, and no new universally imposed runtime manifest or request DTO is assumed.

## Optional GUI and headless presentation

**Verified example:** [`nuxt-layers-test/application-test-template`](../../../RESOURCES.md#application-test-template) on `master` contains `/` (homepage), `/admin` (test dashboard), an app-owned responsive sidebar in `app/app.vue` with **Capabilities → Theme Manager**, and a Theme Manager entry/card linking to `/theme-manager`. The top bar contains Appearance controls, branding and a **Not signed in** placeholder; Theme Manager runs in **local-only test mode**. A derived test host may add **Capabilities → Process** and a dashboard card, mounting an illustrative `/process` route **inside the same shell**. These Process routes and screens do **not yet exist** and are **not published API paths**.

**Decision:** Process is headless-first. The host owns sidebar, routes, branding, authenticated context and optional screen selection; Process owns its business-aware presentation through **public commands and queries**, `ui` owns generic accessible controls, and Theme Manager supplies semantic tokens. A host may disable all Process presentation without losing business operations. Only **Process** needs a top-level capability link; subsidiary pages live within its workspace.

| Screen | Audience and function | Public-contract source |
|---|---|---|
| **Dashboard** | Authorised owners/operators: active, blocked, overdue and completed summaries, recent changes, outstanding interventions and stale/unknown warnings | Scoped status, outcome and exception queries |
| **Definitions and editor** | Designers/publishers: draft, inspect, validate, compare versions, approve/publish/retire definitions; edit stages, gates and evidence needs | Definition queries and versioned validation/publish commands |
| **Instances and timeline** | Initiators/participants: start, filter, inspect, progress, pause/cancel and review history, source facts, stages and accountable owners | Authorised instance/allowed-transition/history queries and commands |
| **Work and exceptions** | Participants/operators: pending manual evidence, blocked/overdue steps, escalation and safe reconciliation | Process exception queries/commands, links to Task/Workflow's **own** assignments and approval evidence |
| **Evidence and reports** | Auditors/managers: revisions, corrections, provenance, authorised export and links to Audit/Reporting | Process history/evidence and independently authorised Audit/Reporting read contracts |
| **Settings and integration health** | Tenant operators: allowed settings, effective policies, provider availability, unknown/degraded state and privacy restrictions | Process/Configuration and provider status contracts; no credentials exposed |

**Delivery priority:** dashboard, definitions plus **accessible structured editor**, instance views and exceptions. Diagram editing (e.g. diagram-js), BPMN XML interchange, analytics and advanced administration are optional; a diagram must always have equivalent keyboard-usable table/form controls.

**Security and usability:** menu visibility or test-mode fixture is never authorisation. The template is **not production-safe** for Process IAM; protected actions require real server-side tenant/resource/assurance checks. Preserve loading, empty, denied, stale, partial, blocked, unknown and unavailable states; announce changes accessibly and never blindly retry consequential operations. Support WCAG 2.2 AA, keyboard/focus, reduced motion, mobile layouts, Theme Manager tokens, localised strings and Clock formatting. Host composition must remain within the documented single-operation, 50-line Nuxt budget. GUI acceptance requires authorised dashboard-to-instance and definition journeys, denial of unrelated records, correct Workflow/Task links and fully functional headless mode; no tests or real routes are claimed here.

## Conceptual acceptance scenarios

| Input | Expected result | Authoritative owner |
|---|---|---|
| Valid published definition, permitted initiation, qualified source reference | One admitted instance pinned to effective definition, accepted result and committed event | Process |
| Duplicate initiate/transition with same idempotency identity | Same existing result or explicit conflict; never duplicate instance/effect | Process |
| Tenant A requests tenant B's instance | Denied without disclosing protected existence | Authorisation + Process |
| Invalid transition/expired evidence or stale source revision | Refusal or hold with attributable reason, no false advancement | Process, source owner for referenced fact |
| Required Workflow approval pending, denied or unreachable | Process blocked; no inferred approval | Workflow for approval, Process for gate |
| Scheduler delivers late or repeated due trigger | Process re-evaluates current time/revision and applies at most one valid transition | Scheduler for trigger; Process for stage |
| Domain commits own action after process dispatch | Process waits for verified owner evidence; status may remain unknown pending reconciliation | Domain for action; Process for checkpoint |
| Definition revision while instances active | Existing pins retained or explicit approved migration, historical decisions preserved | Process |
| Mandatory legal hold or privacy restriction | Affected transition/export/delete held despite tenant configuration | Legal Compliance / Privacy qualification; Process enforcement |
| GUI disabled, no optional Workflow and manual non-approval process | API-based start/progress/close still works; no invented approval | Process |
| Process-level completion while domain finalisation unconfirmed | Clearly separate completed process checklist from pending domain result; do not report domain success | Process vs domain owner |
| Unsupported attempt to pay, alter stock, grant access or issue credential | Explicit unsupported/refused result; call the authoritative domain contract instead | Payment/Inventory/Authorisation/Credentials |

## Decisions, evidence and remaining acceptance

**Owner-approved (22 November 2026):** PROC-01 Platform responsibility for reusable process definitions/instances, with separate packaging **conditional on two genuinely independent, non-duplicative consumers**; PROC-02 process-level business progression/outcomes only; PROC-03 preserve Workflow (approval/execution), Task (assigned work), Scheduler (timed work), Project (milestones) and source-domain final authority; PROC-04 native manual/headless operation; PROC-05 validated public commands/queries/events and explicit pending/unknown status; PROC-06 optional accessible host-mounted GUI; PROC-07 verified source evidence, safe reconciliation, immutable version-pinned history and corrective revisions.

**Approved safeguards:** never create another generic execution engine; validate and publish definitions before use, pin active versions unless explicitly migrated; apply server-side IAM, tenant isolation, assurance, mandatory legal/privacy floors and risk-selected independent Audit evidence. The standards and dependency shortlist are **design guidance**, not mandatory installations, certifications or automatic license approvals.

**Conceptual completeness:** purpose, independent ownership, native behaviour, inbound/outbound contracts, cooperating capability directions, error/diagnostic/evidence/reporting separation, command/query/event failure states, trust/privacy, provider neutrality, standards, permissive OSS options, optional GUI/headless mode and acceptance scenarios are documented. Reciprocal notes exist for Workflow, Task, Project, Scheduler, Configuration, Message Queue, Error Normalisation, Logging, Audit, Reporting, UI, Theme Manager and Application Compositions. Neighbouring reviews retain their own authority; a Process-side agreement does not automatically approve their separate drafts.

**Remaining evidence, not new conceptual design decisions:** demonstrate two independent Process consumers before a separate package; verify actual related root `CONTRACT.md` surfaces and no overlap with Workflow; choose exact interface types, storage/provider adapters, safe migration and runtime versions; publish a root Process `CONTRACT.md` when an implementation exists; demonstrate security, durability/outbox, reconciliation, headless and GUI acceptance in CI/user-run tests. No `nuxt-layers/process` implementation or published root contract was verified in this review.

**Merge gate:** reconcile parallel PRs and changed master before review completion; compare Git conflicts and current governance, check required CI/protection, then obtain **separate explicit owner approval to merge**. Conceptual approval does not authorise implementation or merge. Draft PR #121 remains the working review.

## Project reciprocal conceptual interface — 22 November 2026

**Status: PROJECT-01–06 and supplementary boundaries owner-approved 22 November 2026, conceptual only; not a published implementation contract, governing adoption or completion of this adjacent capability's review.** Process may expose versioned process definitions/qualified outcomes used as evidence for Project gates; Project owns project charter, milestones, baseline and decisions. Project approval does not redefine Process outcomes and a Process completion does not automatically close a Project. This is provisional alongside Process draft PR #121; reconcile competing edits before integration and do not imply mutual package dependencies. See [Project proposed conceptual contract](../project/capability-record.md).


## Task conceptual review — reciprocal public boundary (23 November 2026)

**Status: Task TASK-01–08 and operating safeguards owner-approved conceptually 23 November 2026 in draft PR #138; TASK-09–14 extensions are now owner-approved conceptually (23 November 2026), not implemented or a completed review of process.** [Task canonical conceptual contract](../task/capability-record.md). Process may request a versioned individual work obligation and consume a Task-owned qualified assignment/progress/completion receipt; Process alone decides stage progression and process outcome. Task completion does not establish source-domain finality. Optional public ports prevent cyclic package dependencies. Task PR #138 now establishes owner-approved conceptual single accountable assignment plus contributors, reported/verified completion and preserved source-withdrawal history and do not advance Process automatically. Preserve prior approvals and provisional neighbouring work; reconcile overlaps against latest master before merging.

## Scheduler reciprocal conceptual interface — 23 November 2026 (draft PR #131)

**Status: Scheduler concept and reciprocal boundaries owner-approved on 23 November 2026; implementation adapter unverified.** [Scheduler conceptual record](../../services/scheduler/services-record.md). Process owns stage state, transitions and present eligibility; Scheduler accepts Process-owned due commands and reports actual/late/failed/unknown attempt outcomes. Process revalidates current revision, Clock time and access before any transition. A scheduled tick is not approval, human action or evidence of completion. Preserve the provisional status of Process PR #121.

## Temporal Gateway technical adaptation — reciprocal note (23 November 2026)

**TG-01–TG-05 owner-approved conceptual infrastructure boundary under accepted ADR-0015 (23 November 2026); not an implemented dependency or a new approval of Process.** [Temporal Gateway conceptual infrastructure library](../../adapters/temporal-gateway/adapters-record.md) may adapt Temporal SDK execution/signal/cancellation behind Process's provider-neutral host-bound technical port. Process owns instance progression, policy gates, business state, idempotency and reconciliation; the adapter returns provider-accepted/rejected/unknown technical evidence only. A completed Temporal run neither confirms a Process step nor proves approval or external commercial finality. Avoid any direct dependency cycle or private schema access.



## Workflow conceptual review — reciprocal alignment (23 November 2026; draft PR #150)

**Status: Proposed Workflow-side consolidation, not new approval of this neighbouring capability or an implemented integration.** [Workflow's idealised public contract](../workflow/capability-record.md) keeps human review-route definitions, approver eligibility/assignment, delegation and qualified approval evidence with Workflow; each originator retains its own authoritative source record and final decision. Process supplies a business stage/subject revision and consumes versioned approval outcomes; Process alone advances business-process stages. Neither package owns the other's instances or requires mutual imports.

Dependencies are host-composed public ports/events, not private storage or automatic package imports. Resolve concurrent draft changes against latest master before merging.

## Checkout reciprocal conceptual interface — 24 November 2026

**Status:** Checkout-side conceptual interface owner-approved (24 November 2026) in PR #151; existing approved decisions remain authoritative. See [Checkout conceptual contract](../checkout/capability-record.md). Checkout owns domain-specific confirmation and disposition; Process optionally owns generic process definition/instance progression and its own checkpoints. Checkout supplies required actions/outcome refs and consumes generic progression without duplicating stage history or granting authority to Process. Direct native simple Checkout remains possible; no package cycle. Public host-bound ports only; no private schema or circular package imports. Checkout profiles are bounded purchase-specific policies, not generic executable process definitions. Optional Process retains its own progression; no duplicated execution authority or stage history.
