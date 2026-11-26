# Task — conceptual capability specification

**Identity:** `task` · **Class:** Platform capability · **Design status:** owner-approved conceptual specification, 23 November 2026 (TASK-01–14 and agreed refinements). **Implementation:** no verified `nuxt-layers/task` repository or published root `CONTRACT.md`; the names below are *idealised public operations*, not shipped APIs. **Authority:** [architecture-rules](../../../RESOURCES.md#ref-6d4a7ae1), accepted ADRs including [ADR-0012](../../decisions/ADR-0012-trivial-composition.md), and the [Capability Standard](../../standards/capability-standard.md).

## Purpose and boundaries

Task owns **durable, accountable work**: what must be done, who is accountable, progress and deadlines, required resources, supporting evidence and an attributable history. It supports personal tasks, team assignments and work requested by Project, Process, Workflow or another domain. It remains usable alone, with no Project, Process, Workflow, Scheduler, external provider or GUI.

**Task does not own:** background jobs or cron handlers (Scheduler), business-process stages/outcomes (Process), routed approvals (Workflow), project milestones/acceptance/budget baselines (Project), membership and permissions (Identity/Authorisation), resource inventory/reservations/costs (their respective owners), file bytes (Storage), published documents (Publisher), independent evidence custody (Audit), technical logs (Logging), or derived analytics (Reporting). ADR-0012's background `tasks: { name, every, run }` are **not** Task's assigned work records.

Completing work is **not** the same as verifying it or accepting a Project milestone, Workflow approval, Process stage or financial transaction. Interfaces convey *qualified evidence*, never transfer decision authority.

## Authoritative model and operating rules

Task owns tenant- and resource-scoped IDs, revisions and durable persistence; requester/source references; title, instructions, acceptance checklist, priority; one accountable person or accountable team/queue with optional contributors; assignment offers and acceptance; planned/actual times; recursive task structure; typed dependencies; resource requirements; attachments **by reference**; progress, blockers, completion assertions, verification state, source-withdrawal disposition and full work history.

| Concern | Current approved rule |
|---|---|
| **Work lifecycle** | Draft, open, in progress, blocked, completed, cancelled, archived; authorised reopening creates a new attributable revision, not a rewritten past. The state model distinguishes worker assertion, awaiting verification and verified work. |
| **Accountability** | Exactly one accountable assignee or designated accountable queue/team at a time; optional contributors. Assigning a team may require an identified accepted individual by policy. Assignment accepted/offered/declined/released is independent from work status. Delegation does not grant access. |
| **Completion** | Low-risk standalone work may be finalised by an authorised worker assertion; source-sensitive work requires current policy, evidence and independent verification where mandated. Verification belongs to Task's work evidence; the originating domain decides its own acceptance. |
| **Withdrawal/correction** | Cancel unfinished work when authorised; source withdrawal **after completion** records a separate disposition without deleting evidence. False completion is reopened/corrected by a new revision. Retention and legal holds prevail. |
| **Source outage** | Standalone work continues. Source-linked requests/progress may be recorded as pending or unverified, but no source authority, final verification or downstream acceptance may be asserted without current source proof. Reconcile idempotently; surface conflicts. Missing mandatory Authorisation or persistence fails closed. |
| **Provider independence** | Task's native record is authoritative. Optional external task systems import, export or synchronise via Integrations with explicit source, cursor, field direction, versions, conflict and recovery. External-primary authority requires a separate design approval. |
| **Retry and history** | Optimistic concurrency, expected revisions, idempotency keys, stable committed event IDs and a Task-owned durable outbox. Late/duplicate events are reconciled; an uncertain timeout is not proof of failure or success. |

**Approved extensions (TASK-09–14):**

- **TASK-09 — Attachments:** multiple authorised documents, links and evidence handles per task/subtask; Task owns associations, evidence metadata and attribution, not bytes or malware verdicts. Source revision/digest, scan status, disclosure and retention govern use. Evidence-critical completion requires safe verified attachments.
- **TASK-10 — Recursive subtasks:** one current parent per child, arbitrary *practical* depth with configured query/edit limits; no self-parenting, cycles, cross-tenant links or implicit permission inheritance. Each child has independent assignee/status/evidence; parent progress is a qualified projection, not automatic completion. Reparenting/cancellation is explicitly authorised and revisioned.
- **TASK-11 — Time:** planned start/finish, deadline, estimated effort/duration, actual start/completion and optional qualified work intervals; date-only versus exact instant, elapsed versus working-calendar effort and time zones remain distinct. Clock governs interpretation/DST; actual timestamps do not certify attendance/payroll.
- **TASK-12 — Dependencies:** finish-to-start default; optionally start-to-start, finish-to-finish and start-to-finish; lead/lag, blocking versus advisory, and version-qualified external prerequisites. Reject blocking cycles and impossible hierarchy/dependency combinations; unknown external status cannot satisfy a block. A policy-authorised override is attributable. Derived Gantt/critical-path is not Project authority.
- **TASK-13 — Resource declarations:** typed people/skills/capacity, equipment/assets, materials/stock, services and facilities with units, quantities, period, role and estimated effort/cost. Task owns *requirements* and reported usage evidence; Employment, Asset, Inventory, Booking, Procurement and Accounting own actual availability, allocation, stock, purchases, timesheets and financial amounts. Declaration never reserves or pays.
- **TASK-14 — Task history:** source-owned durable, immutable-in-meaning revisions of material actions, actor and assurance, effective/recorded times, source/policy version, correlation, change summary and evidence references. Corrections are new events. Human timeline, authoritative history and independent Audit custody are distinct. Retention, legal holds, redaction and subject rights apply.

**Project documents:** Task publishes authorised, versioned progress/history/attachment evidence **references** to Project. Project owns its own planning, milestones, association history and acceptance. A proposed Project-owned **Documents & Evidence** view/index may gather Task, Storage and Publisher references with source access checks; it must not copy Task's full history or file bytes. **The Project view is a separate proposed Project-side presentation refinement, not independently approved as a Project decision or a new `projects` library.** Standalone Task requires none of it.

## Idealised public input contract

Public calls include authenticated caller, trusted tenant/resource/action and permitted field scope, expected Task/source revision, idempotency/correlation, relevant effective time, policy and provenance. Every protected read/write is independently authorised server-side; a caller-provided reference grants no permissions.

| Producer / essentiality | Input to Task | Checks and degraded behaviour |
|---|---|---|
| **User/host — required** | Create/edit, assign/accept/decline/reassign, start/progress/block, assert/verify completion, reopen/withdraw/cancel/archive; parent/dependency, timing, checklist, resource and evidence changes | Caller and field rights, permitted transition, source/version and idempotency; denied/conflict/unknown safely reported |
| **Identity, Authentication, Authorisation — required for protected use** | Caller, assurance, group/membership references, resource/action decision | No implicit tenant, assignee or source privilege; deny unknown/revoked permissions |
| **Persistence — required** | Host-provided connection/transaction and Task-owned durable store/outbox | Never silently fall back to browser/local memory as authoritative storage |
| **Clock, Configuration — conditional semantics** | Trusted instant, timezone/calendar; effective assignment, due, template, notification, retention and risk policy | Reject ambiguous/invalid time or unavailable mandatory policy; preferences do not rewrite source instants |
| **Project, Process, Workflow, business domain — optional/conditional** | Versioned work request, source task/instance/milestone/approval link, constraints, acceptance/evidence policy, source revision or withdrawal | Unavailable/stale source leaves pending/unverified; Task never confirms an external decision |
| **Scheduler, Notifications — optional** | Trigger identity, scheduled/actual time, task revision and notice delivery status | Revalidate current Task before a reminder; delivery does not mean worker received or accepted it |
| **Storage, Publisher, Content Security — conditional for evidence** | File/document handle and version, permitted type, scanning result and source disposition | Reject unsafe/inaccessible evidence, especially policy-required proof; Task does not own bytes |
| **Resource owners — conditional for confirmed allocation** | Qualified asset/stock/skill/facility reference, capacity/reservation/actual-use facts and period | Requirements may be declared locally; unverified resources are *not* reserved or costed |
| **Integrations — optional** | External task mapping, consent, remote revision/cursor, webhook and qualified provider outcome | Replay-safe conflicts/reconciliation; no fabricated remote success |
| **Privacy / Legal Compliance — applicable conditions** | Disclosure, subject rights, holds, retention and lawful handling constraints | Block destructive/protected acts if mandatory decision is unavailable |

### Public operations

These are logical groups, not concrete export signatures:

- **Commands:** create/revise; offer/accept/decline/reassign; start/progress/block/unblock; assert/verify/complete; cancel/withdraw/reopen/archive; create/reparent subtask; change planned/actual time; add/remove typed dependencies; declare/update resource needs and qualified usage; attach/detach evidence; reconcile source/provider; correct by new revision.
- **Queries:** get/list assigned and assignable tasks, by owner/source/status; detail, bounded recursive tree, dependency graph, timeline/schedule, resource plan, evidence/attachment index, authorised historical revisions, aggregates and Project evidence projection.
- **Returns:** committed receipt and current revision, accepted/pending/denied/invalid/conflict/uncertain with stable safe codes, `messageKey`, qualified verification and source status. A submitted request, remote attempt, notice or event is never proof that another owner's outcome occurred.

## Idealised public output contract

| Surface / recipient | Task supplies | Important limitation |
|---|---|---|
| **Task status / worker, requester, source owner** | Task ID, assignment, work state, assertion and verification, blocker, revision, source/correlation, safe command result | Task verification is not Project/Process/Workflow or business-domain acceptance |
| **Inbox, task tree, schedule / authorised UI and headless users** | Scoped lists, recursive children, parent summary, typed graph, planned/actual instants, due/overdue, resource requirements and current source qualifications | Bounded, paginated, freshness/field-filtered; no implied resource reservation |
| **Evidence and history / user, Project, Process, Workflow** | Attributable work timeline, corrections, scans/status, file references, completion evidence, effective source and policy versions | No raw files, cross-tenant data, forged independent verification or duplicated Project history |
| **Committed events / MQ, Audit, authorised subscribers** | TaskCreated/Assigned/Progressed/Blocked/ReportedComplete/Verified/Reopened/Cancelled/Withdrawn and justified attachment/hierarchy/dependency/resource changes, stable IDs/revision/time | Sent via Task-owned durable outbox after commit; at-least-once/out-of-order possible; recipients deduplicate |
| **Due/reminder intents / Scheduler and Notifications** | Current deadlines, relevant task revision, eligible recipient and delivery intent | Scheduler owns trigger attempt, Notifications owns delivery; neither changes Task status |
| **Analysis/search/export / Reporting, Search, Export** | Authorised, source-qualified task facts, counts, lead times, overdue/blocked/verification classes, redacted evidence refs and corrections | Recipients own derived output/index/format, not work authority |
| **Integration status / provider adapter** | Scoped local task mapping, confirmed/pending/conflicting remote reconciliation and sync revision | Unknown remains unknown; export does not transfer authoritative ownership |

Every output enforces purpose/tenant/resource disclosure, revision, provenance, completeness and recipient permissions. Do not publish private task notes, raw attachments, secrets or unrestricted identity in events or diagnostics.

## Directed cooperation and availability

| Neighbour | Information to Task → information from Task | Authority / requiredness |
|---|---|---|
| Identity / Authentication / Authorisation | Trusted actor, group/assurance/access decision → scoped work assignment and evidence | **Essential** on protected operations; Task assigns work, never Identity roles |
| Configuration / Clock | Effective policy and temporal semantics → task time/status projections | **Conditional**; Clock and Configuration retain their roles |
| Project | Project/source/milestone/resource constraints → qualified progress, resource needs, attachment/evidence links | **Optional**; Project alone accepts milestones and owns project document index |
| Process / Workflow | Stage/request or approval-linked obligation → Task work receipt, qualified evidence | **Optional/conditional**; Process stages and Workflow approval remain theirs |
| Scheduler / Notifications | Trigger/delivery status → due/reminder/escalation intents | **Optional**; absence does not remove overdue queries or stop work |
| Storage / Publisher / Content Security | File/doc handle/version, scan/trust result → Task evidence association | **Conditional for files**; never own bytes, publication or malware decision |
| Asset / Inventory / Booking / Employment / Procurement / Accounting | Source availability, allocation, movements, actual costs → Task declared needs and usage evidence | **Optional/conditional**; Task cannot book, transfer stock, employ or pay |
| Integrations | Versioned external observation/reconciliation → scoped native Task mapping/status | **Optional**; native Task is the authority |
| Privacy / Legal Compliance | Retention, rights, hold/disclosure duties → Task compliance-action evidence | **Conditional legal obligation**; source scope protected |
| Message Queue / Search / Export / UI / Theme Manager | Transport/index/output/presentation services → Task events and authorised read models | **Optional adapters**; no private state or second theme system |

### Error Normalisation, Logging, Audit and Reporting

Each receives different, purpose-limited information through its **own** approved conceptual public interface.

| Counterpart | Task sends or invokes | Counterpart returns | Rules |
|---|---|---|---|
| [`error-normalisation`](../../libraries/error-normalisation/stateless-library-record.md) — **pure library** | Task error code, known/unknown operation outcome, approved mapping/disclosure and safe correlation | Consistent category/code, `messageKey`, field hint, sanitised public/diagnostic projection, **advisory** retry hint | Stateless: no events, storage, logs, audit or reports. Task retains commit/retry authority; unknown timeout remains uncertain |
| [Logging](../../services/logging/services-record.md) — **technical diagnostics** | Minimal sanitised error, operation/latency, scope and correlation | Accepted/rejected/throttled/uncertain intake and authorised sink health | No business history or Audit custody; routine outage cannot undo task work |
| [Audit](../audit/capability-record.md) — **independent accountable evidence** | Policy-selected, attributable assignments, assertion/verification, overrides, withdrawal/reopen, protected access/export and significant denials with event/revision, actor/assurance and provenance | Accepted/pending/rejected/uncertain independent receipt, integrity/coverage and authorised evidence read | Task history is **not** Audit evidence. For mandatory capture, sensitive changes hold/fail safely or use explicitly authorised pending/reconciliation; MQ/log receipts do not substitute |
| [Reporting](../reporting/capability-record.md) — **derived analysis** | Permission-filtered, revisioned Task facts, completion class, schedules, hierarchy, resource demand, unique event/correction ID, completeness and as-of | Authorised report results, execution/refresh status, derived throughput, overdue, lead times, resource demand, export, source coverage | No task decision, milestone certification or inferred resource allocation. Reporting outage does not interrupt work |

No cross-schema reads, hidden two-way runtime imports or shared authority. Delayed, repeated or lost events require idempotent replay/coverage checks. Normalised errors and logs are not committed business events; Reporting cannot count them as complete Task work.

## Security, data and recovery

Use server-enforced tenant/resource/action and field-level permission for every create, tree query, assignment, evidence download, status change, export or admin setting. Source requests are authenticated and independently rechecked; team/project membership does not automatically grant another scope. Separation of requester, worker and verifier applies where policy requires it; sensitive actions demand suitable assurance and recency. Descriptions, comments, links and filenames are untrusted. Require allowed attachment types and Content Security scanning before mandatory use, signed/opaque Storage references and bounded exports.

Task owns its schema/migrations and transactional outbox, with documented host persistence ports; use durable retries with idempotency and source reconciliation. Distinguish failure, timeout, unknown remote commit and authoritative cancellation. Preserve deletion/retention evidence subject to Privacy and Legal Compliance; never promise immutable personal data beyond legal rights or confirmed external erasure without proof. Browser storage/cookies must be declared in Task's future `STORAGE-REGISTER.md` if used; native headless authority cannot depend on a browser.

Clock supplies time-zone and DST rules. Configuration holds effective tenant policies and notification preferences; mandatory security/legal floors cannot be weakened. Follow OWASP ASVS 5 L2 and L3 for applicable critical actions, WCAG 2.2 AA for optional UI, i18n and accepted governing ADRs. Standards guidance is **not** proof of compliance or certification.

## Standards and full-source permissive libraries

**Owner-approved recommendations (23 November 2026), not mandatory certification, implemented dependencies or approved exact releases.**

| Body / reference | Relevance and priority |
|---|---|
| [IETF RFC 5545](../../../RESOURCES.md#ref-65b641d1) `VTODO`, [RFC 9253](../../../RESOURCES.md#ref-65b0873b), [RFC 10051](../../../RESOURCES.md#ref-d6226711) (2026) | **Preferred optional task interchange profile**: structured work, status, assignment, timing and relationships; map unknown/lossy fields explicitly, do not replace native authority |
| [ISO 15489-1:2016](../../../RESOURCES.md#ref-cbe31bfd), [ISO 23081-1:2017](../../../RESOURCES.md#ref-36977534), [ISO 16175-1:2020](../../../RESOURCES.md#ref-0260c838) | **Strong history/evidence guidance**: attributable revisions, retention, metadata and records retrieval |
| [ISO 21502:2020](../../../RESOURCES.md#ref-3ab1f251), ISO 21500:2021, ISO 21511:2018, ISO 21508:2026, ISO 21512:2024, [ISO 31000](../../../RESOURCES.md#ref-a5666aad) | **Optional Project/work-planning profile**: breakdown structures, schedules, resource and qualified risk/earned-value information; not a mandatory project methodology |
| [PMI PMBOK 8](../../../RESOURCES.md#ref-1336ea6a), [APM BoK 8](../../../RESOURCES.md#ref-de28455b), PRINCE2 7, [UK GovS 002](../../../RESOURCES.md#ref-fde4cde0) | Optional organisational guidance, UK public-sector rules where applicable, not a Task package dependency |
| [OMG BPMN 2.0.2](../../../RESOURCES.md#ref-c5383867) / ISO/IEC 19510 | Optional Process/Workflow human-task integration vocabulary, not approval authority |
| [ISO 8601-1](../../../RESOURCES.md#ref-bea40961), [RFC 3339](../../../RESOURCES.md#ref-3519482a), [RFC 9557](../../../RESOURCES.md#ref-0ad4fc7e) | Date/time exchange guidance through Clock, preserving zone and instant meaning |
| [W3C WCAG 2.2 AA](../../../RESOURCES.md#ref-0d1f555e), [WAI-ARIA](../../../RESOURCES.md#ref-67eee3fb), [ARIA APG](../../../RESOURCES.md#ref-f076dce5), [PROV-O](../../../RESOURCES.md#ref-20aa2e25) | WCAG AA is **binding baseline**; ARIA/APG guide accessible UI, PROV-O is optional provenance vocabulary without graph-database requirement |
| [OWASP ASVS 5](../../../RESOURCES.md#ref-a1c367d2), ISO/IEC 27001:2022, ISO/IEC 27701:2025, [ICO UK GDPR guidance](../../../RESOURCES.md#ref-f4808d92) | ASVS baseline governs security; ISO management guidance optional; actual applicable UK GDPR duties determined by context and specialist owners |

**Library selection policy:** complete public source, commercially permissive MIT/BSD/Apache-2.0/PostgreSQL licence, no gated flagship capability, no mandatory paid enterprise plugins. Verify precise version, transitive licences, release integrity, Node/TS/Nuxt compatibility, security advisories and maintenance before installing.

| Preferred / optional | Licence and role |
|---|---|
| [Zod](../../../RESOURCES.md#ref-1e3efac4) **preferred** | MIT, public command/query validation |
| [PostgreSQL](../../../RESOURCES.md#ref-fa79609e) + [node-postgres `pg`](../../../RESOURCES.md#ref-be910869) **reuse platform** | PostgreSQL licence / MIT, Task-owned durable records and outbox |
| [Kysely](../../../RESOURCES.md#ref-af839a5b) **preferred if SQL abstraction needed** | MIT, typed SQL/query layer; **do not** combine with a second ORM unnecessarily |
| [@dagrejs/graphlib](../../../RESOURCES.md#ref-6629c3fb) **preferred if DB recursion insufficient** | MIT, dependency/parent graph traversal/cycle checks; PostgreSQL remains authoritative |
| [TanStack Table](../../../RESOURCES.md#ref-af94a8b1) **optional GUI priority** | MIT, headless list/tree/grid state; accessibility belongs to the rendered UI |
| [Graphology](../../../RESOURCES.md#ref-9126475c), [Drizzle ORM](../../../RESOURCES.md#ref-03cb5387), [Ajv](../../../RESOURCES.md#ref-a164796d) **alternatives/conditional** | MIT / Apache-2.0 / MIT; choose Graphology **instead of** Graphlib if needed, Drizzle **instead of** Kysely; Ajv only for JSON Schema interchange |
| [Frappe Gantt](../../../RESOURCES.md#ref-35a3dd1c), [Cytoscape.js](../../../RESOURCES.md#ref-b58f56eb), [Vue Flow](../../../RESOURCES.md#ref-1c63f8c8), [SortableJS](../../../RESOURCES.md#ref-e7023281) **optional GUI** | MIT core; timetable, graph or drag/drop only where useful; avoid simultaneous graph editors, paid extras and pointer-only actions |
| [Yjs](../../../RESOURCES.md#ref-22280e1e) **defer** | MIT, only if simultaneous co-editing is demonstrated; does not replace Task revisions |

Do **not** introduce Neo4j, Redis, Elasticsearch/open-core flagship platforms or paid FullCalendar Premium features as Task dependencies. PostgreSQL, public graph algorithms, and existing platform capabilities suffice. The shortlist is **owner-approved as guidance**, not selected pinned packages.

## Optional Task GUI and representative host

**Owner-approved GUI design (23 November 2026):** host-owned sidebar **Capabilities → Tasks**, optionally a **Tasks** card on the host `/admin` test dashboard, opening a Task dashboard (illustrative `/tasks` route) inside the shared themed app. The route is host-configured, not a claimed Task runtime API. Reference: [`nuxt-layers-test/application-test-template` README](../../../RESOURCES.md#ref-8c941ad8), [`app/pages/admin.vue`](../../../RESOURCES.md#ref-96cb2d87), `nuxt.config.ts`, `app/app.config.ts`. Reference master uses home `/`, `/admin`, responsive collapsible/mobile-overlay sidebar, Theme Manager dashboard card and Appearance controls. It uses Theme Manager local **test** mode and **Not signed in** placeholder; **never** deploy that unauthenticated template as production security.

| Screen | Purpose and public surface |
|---|---|
| **Tasks dashboard** | My tasks, Assigned by me, overdue/blocked, authorised team/all counts, filters, contextual create; scoped `listMine`, assignment and summary reads |
| **My tasks / Team queue** | Worker inbox; authorised manager offers, reassigns, escalates, views workload; list, accept, reassign, progress commands |
| **Task detail / create/edit** | Work instructions, one accountable assignee, contributors, state, planned/actual time, nested children, checklist, typed dependencies, resources, attachment/evidence, verification and actions; version-aware detail/commands |
| **Timeline/dependencies / resource plan** | Optional Gantt/graph, accessible equivalent tables/tree, source-qualified available vs requested resources; task projections only |
| **History and evidence** | Scan/availability, versioned timeline, self-reported vs verified work, provenance, source document links, authorised export; Task public history, never a second Audit store |
| **Templates and settings** | Role-authorised policy defaults, assignment, notices, retention references; Configuration and Task public settings |
| **External integration health** | Only when provider enabled, permitted mapping/conflict/retry status, no credential disclosure |

The host owns navigation, branding, routes, authentication context and server composition. Optional Task presentation consumes only public Task exports, uses Theme Manager semantic tokens and Clock/i18n formatting and fits ADR-0012's one-call/50-line host-specific integration budget. Project/Process/Workflow links deep-link only where independently authorised. Avoid global sidebar proliferation; use dashboard tabs and responsive detail drawers/pages.

**GUI requirements:** WCAG 2.2 AA; keyboard/screen-reader equivalence for tree, drag/drop, dependency editor, calendar, attachments, actions; reduced motion; mobile layout; visible source-status and validation/conflict announcements; role- and field-level authorisation enforced **on server**, not by hidden buttons. Distinguish self-reported, awaiting verification, verified, withdrawn, blocked, overdue, missing resource proof, stale provider and mandatory Audit hold. No implementation of these screens is claimed. Disable all Task UI without disabling headless service.


**Todo collection composition (23 November 2026; owner clarification; interface refinements proposed):** The [Todo conceptual record](../../compositions/todo/compositions-record.md) defines sparse, durable Todo-native collection/items that work **without** Task and optional Task-linked entries when Task is composed. Task stays authoritative for rich work, completion qualification, deadlines, assignees and history; Todo owns only its native checkbox items and collection membership/order. Todo may request idempotent promotion of a native item into Task through Task's published create contract, preserving provenance and avoiding two active work authorities. A Task outage never silently downgrades linked tasks to native items. Task does **not** depend on Todo. The owner approved the minimal native Todo contract, optional Task-link/promotion semantics and conditional native Todo events (TODO-05–06, 23 November 2026). Todo's reviewed optional GUI uses the representative test host's host-owned **Capabilities → To-dos** sidebar → Todo dashboard → collection checklist; alternatively the host can place **Tasks → My To-dos** when Task is composed. Task owns the rich detail view, verification and completion, while Todo owns only its native item controls and collection/link presentation. The `/admin` capability card is a derived-host acceptance aid, not a mandated Task route or an implemented template modification. Future published Task CONTRACT.md reconciliation remains necessary; TASK-01–14 remain unchanged. Optional IETF RFC 5545 VTODO/JSCalendar interchange belongs to Task or Integrations when required; no Todo-owned substitute for Task's authoritative task history or completion.

## Conceptual acceptance and completion status

| Scenario | Required result |
|---|---|
| Native standalone create/assign/complete without Project/Workflow/Scheduler/Reporting | Durable, authorised Task revision, stable status and history |
| Cross-tenant request, revoked assignee, wrong role/assurance | Denied, no leaked task/resource existence or file access |
| Cyclic parent/dependency, blocking prerequisite, stale revision or invalid time | Clear safe validation/conflict; no unauthorised transition |
| Deep child tree, hidden descendant, parent completion | Bounded permission-filtered views; no automatic child/parent authority |
| Unscanned file or external evidence withdrawn | Evidence-critical verification held, preserved historical attribution |
| Planned resource unavailable or Accounting missing | Still a requirement, not confirmed allocation/spend |
| External source/provider offline, task completion pending verification | Explicit pending/unknown; no fabricated source approval |
| Same command/event retried, or timed-out provider later confirms | No duplicate authoritative change; reconcile by ID/revision |
| Completed task withdrawn or reopened | Previous work and evidence retained; new revision/disposition |
| Logging/Reporting/Notifications down; policy-mandatory Audit down | Native work normally continues without optional services; risk-critical action safely held/failed for missing required evidence |
| Project consumes Task evidence | Qualified reference only; Project alone accepts milestones, no copied history or file bytes |
| GUI on local derived template / disabled GUI | Sidebar-to-dashboard, accessible full workflows and verified server restrictions in derived host; all Task operations independently available headless |

### Approved decisions and remaining checks

**Owner-approved on 23 November 2026:** TASK-01–08 (independent durable work, qualified completion, versioned lifecycle, essential IAM/persistence, bounded public ports/outbox, cross-cutting evidence, optional GUI, source-outage safeguards); TASK-02A independent verification; TASK-03A single accountable owner plus contributors; TASK-03B preservation on withdrawal; TASK-04A native primary/external optional; TASK-09 attachments; TASK-10 recursive subtasks; TASK-11 planned/actual time; TASK-12 typed acyclic dependencies; TASK-13 resource declarations; TASK-14 history and project-facing evidence. Standards guidance, full-source permissive candidate strategy, Error Normalisation/Logging/Audit/Reporting public boundaries and representative host GUI recommendations **also owner-approved**.

**Project-side exception:** Project's proposed Documents & Evidence **view** needs independent Project owner sign-off if adopted; it does not block Task's public evidence output. No new project-document library, paid product, extra database or mandatory PM methodology is approved.

**Conceptual review assessment:** complete *for Task's approved design scope*, pending current-master reconciliation and final owner confirmation of the consolidated document; not a governing adoption, deployed capability or verified root `CONTRACT.md`. Implementation must publish real exports, versioned schemas/permissions/errors, root contract and storage register; prove durable outbox, audit-gated transitions, failure/recovery, threat model, accessibility, provider mapping, CI and independent test-host acceptance. The assistant does **not** run tests/builds. Do not merge before protected-branch and concurrent-PR review plus explicit owner approval.

## Time & Attendance reciprocal conceptual note — 23 November 2026

**Status: Time & Attendance TA-01–TA-06 owner-approved conceptually on 23 November 2026; draft PR #143. This does not approve a published task interface or implementation.** Time & Attendance owns authoritative qualified **worked-time intervals and approval**, whereas Task's already approved TASK-11 owns task-specific **planned and actual effort**. Neither may duplicate the other's master time record: exchange scoped ID/revision, activity evidence and an explicit reconciliation of discrepancy or unallocated working time. A Task timer alone cannot prove worked hours; a punch cannot prove task effort, task completion, milestone acceptance or billability. This is a proposed interoperability contract, not a change to TASK-11. See [the proposed source-of-truth and input/output contract](../time-attendance/capability-record.md). Existing approved decisions remain authoritative.

## Workflow conceptual review — reciprocal alignment (23 November 2026; draft PR #150)

**Status: Workflow-side conceptual design owner-approved (WF-01–08, 23 November 2026); not new approval of this neighbouring capability or an implemented integration.** [Workflow's idealised public contract](../workflow/capability-record.md) keeps human review-route definitions, approver eligibility/assignment, delegation and qualified approval evidence with Workflow; each originator retains its own authoritative source record and final decision. Task owns accountable work, work verification and its history; a verified or completed Task is not a Workflow vote. Workflow may request work and consume evidence without allowing assignment to grant permission.

Dependencies are host-composed public ports/events, not private storage or automatic package imports. Resolve concurrent draft changes against latest master before merging.
