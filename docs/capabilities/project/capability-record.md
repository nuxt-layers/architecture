# Project — capability conceptual specification

**Name:** `project` · **Class:** Platform · **Status:** Owner-approved conceptual design (22 November 2026); non-normative blueprint, not governing adoption, implemented service or operational acceptance. **Implementation:** no verified `nuxt-layers/project` repository or published root `CONTRACT.md`. **Evidence:** consistency review (former review: project consistency review), review protocol (former document: review protocol). Accepted `architecture-rules` ADRs and normative standards take precedence.

## Purpose and ownership

Project manages an accountable body of work from proposed charter to authorised completion. It **owns** tenant-scoped project identity, objective and scope, charter, project roles by reference, versioned plans and baselines, milestone definitions and *Project acceptance*, typed dependencies, decisions and approvals, project-specific risks/issues, project budget **plans** and forecasts, qualified progress, closure and the historical evidence/revision trail. This independent decision-and-record lifecycle justifies a Platform capability (PROJECT-01), not a stateless library or presentation-only composition. Its native service works without Task, Process, Workflow, Accounting, Reporting or an external project-management provider.

Project **does not own** Identity tenants/groups/membership, personal Profile data, Authentication sessions, Authorisation decisions, Task assignments/completion, Process definitions/outcomes, Workflow execution, Scheduler timers, Message Queue transport, Accounting ledger/actual costs/financial authority, contracts/orders/payments, employment, assets/stock/bookings, specialist risk cases, source documents/bytes, published material or legal interpretation. Use authorised source references and qualified snapshots; never copy another owner's decisions into Project authority. Project roles neither create group membership nor grant permissions. Creator, sponsor, tenant parent or programme parentage grants no automatic rights.

Programme/portfolio **grouping is a versioned relationship**, not another capability or implicit authority hierarchy. Milestone/inter-project/external-work dependency edges identify owner, kind, strength (blocking/advisory), version and effective period. Reject cycles among blocking dependencies, dangling required links and contradictory baseline revisions; do not assume advisory links block delivery. Separate planned, self-reported, source-verified and Project-accepted progress, plus stale, unknown and contradictory states.

## Native operations and lifecycle

Create draft → propose charter/baseline → independently approve and activate → revise, monitor and decide milestones → pause/resume as needed → complete/close or cancel. Closing may require current mandatory evidence and financial qualification; completion does not close external Tasks or post costs. Reopen only by an authorised, traceable new revision, preserving the prior closure. Milestones progress through planned → ready/evidenced → accepted, rejected or waived under current criteria and approval policy. Every significant decision records who/what/when, owner revision, policy/assurance, source evidence and effective time. Correction or withdrawal is an attributable later change, not history rewriting.

Project natively supports charter, deliverables and acceptance criteria, milestone and dependency management, authorised sponsor/manager/contributor/reviewer reference assignments, baseline and change approval, issue/risk/decision register, qualified progress and forecast summaries, safe export and closure/reopen. Manual input remains available and is marked **self-reported**, not falsely verified. Protected changes require current server-side permission, appropriate recency/assurance and independent approval when policy requires. A failed or uncertain source call never silently becomes approval, zero actual spend or accepted completion.

## Idealised public input contract

Logical operations, not implemented TypeScript exports, endpoint paths or separate packages. Inputs must be tenant/resource-scoped, authorised, runtime-validated and versioned; source facts retain their owner.

| Source / requirement | Inputs to Project and intended use | Requiredness and failure rule |
|---|---|---|
| Host/user and trusted IAM | Create/update/approve/close commands; caller tenant, subject, assurance, owner-group reference, specific access decision | **Required:** validate action/resource/actor, expected revision and separation of duties; denied/unknown decision fails closed; no implicit tenant/group inheritance |
| Clock and host infrastructure | Current time, calendars/time zones and declared database connection/operational ports | **Required semantics** and persistence for durable state; invalid/ambiguous time rejected or qualified; Project owns schema, stores and outbox |
| Configuration / governance / Privacy / Legal Compliance | Registered effective settings, independently approved policy and legal/retention/disclosure constraints | **Conditional** to action, jurisdiction and configured obligations; missing mandatory authority holds protected change; configuration cannot reduce security floors |
| Task / Process | Task progress, blockers, completion evidence; independently owned process definitions/outcomes | **Optional:** qualify source/revision/as-of, never automatically accept milestone or replace source truth |
| Workflow | Routed review, approvals, rejections and escalation evidence | **Optional:** Project rechecks current authority, policy and baseline; native protected review when permitted; stale/pending result is not approval |
| Accounting and other financial owners | Approved funding envelope, commitments, actuals, currency/effective period, exchange evidence | **Conditional for certified finance decisions/views:** Project only owns planned budgets; unknown/stale actuals cannot be treated as zero or as spend authority |
| Storage/Publisher and specialist sources | Authorised references to files, revisions, source evidence and published artefacts | **Optional/conditional:** missing or revoked evidence marked unavailable; source owns bytes and source status |
| Integrations/external provider | External PM data, mappings, sync cursors, signed/qualified provider results | **Optional:** local charter/baseline is primary; conflicts, withdrawal and remote uncertainty held for reconciliation, never silent overwrite |

Inputs distinguish source-owned fact, user proposal, policy, external evidence and derived observation. They carry source identity, schema/record revision, effective/observed times, completeness, disclosure scope and qualified unknown/conflict states. Receiving a message never grants permission.

## Idealised public output contract

| Logical public surface | Authoritative Project output and consumers |
|---|---|
| **ProjectService** | Scoped project ID, objective/charter, lifecycle, versioned project decisions, create/activate/pause/resume/cancel/close/reopen results; used by authorised host, managers and consumers |
| **ProjectPlanningService** | Approved plans/baselines, milestones and current acceptance criteria, dates, work/dependency constraints, programme relationships, planned budget targets and forecasts; Task/Process/Workflow, Accounting and Reporting may consume qualified references |
| **ProjectGovernanceService** | Revisioned change/approval outcome, project-specific risk/issue decisions, attributable milestone acceptance/rejection/waiver and evidence links; downstream owners still make their own decisions |
| **ProjectQueryService** | Authorised list/detail, status, milestone graph, planned vs reported vs verified vs accepted progress, risk/decision register, history, planned financial view, exports; with scope, as-of, completeness, provenance and redaction |
| **ProjectEvents** | After commit: `ProjectCreated`, `ProjectBaselineApproved`, `ProjectMilestoneAccepted`, `ProjectPaused`, `ProjectClosed`, `ProjectCancelled`, `ProjectReopened` and other justified versioned owner facts through Project's durable outbox; subscribers receive no new permissions |

Public **commands** include create/propose/activate, revise scope/baseline, define/accept milestone, assign role reference, update project risk, pause/resume, close/cancel/reopen. Return accepted committed, denied, invalid, conflict, pending or **uncertain** with stable source codes and safe `messageKey`. Expected revision and idempotency/correlation references prevent duplicate transitions and lost updates; uncertain commit requires status/reconciliation before replay. **Queries** enforce current tenant/resource/field disclosure, pagination and snapshot freshness. **Events** carry tenant/project IDs, event/revision IDs, effective time and minimised source provenance; subscribers must handle duplicate, delayed and out-of-order delivery. An outbox event is not an Audit custody receipt or a distributed exactly-once guarantee.

Every operation describes trusted caller/assurance, action/resource, authority of inputs, validation, scope, policy/effective time, lifecycle preconditions, expected revision, disclosure limits, compatibility/versioning, provider uncertainty and recovery. No mandatory universal request envelope or private persistence types. A future root `CONTRACT.md` must describe one composition entry point; Nuxt host integration must meet ADR-0012's one-call and **50-line** capability-specific host budget.

## Cooperating capability contracts and failure modes

| Partner | Project takes from partner | Project supplies to partner | Direction and absence |
|---|---|---|---|
| Identity, Authentication, Authorisation | Tenant/organisation references, session assurance and resource-specific decisions | Scoped project/resource and action references | Required trust/decision semantics; fail closed, no automatic role privileges |
| Clock, Configuration | Time interpretation, effective validated settings | Time/deadline references, project setting requirements | Clock semantics required; Configuration conditional; Project owns domain policy enforcement |
| Task | Actual task state and evidence | Project scope, linked milestones and constraints | Optional, no duplicate task state; manual Project remains functional |
| Process / Workflow | Versioned Process definitions/instance outcomes and approval-route/sign-off evidence | Project gates, approval requests, programme/outcome links and project constraints | Optional; Process retains cross-stage eligibility/synthesis, Workflow retains routing and Project retains milestone acceptance; revalidate before commit, no mutual package imports |
| Accounting / other finance owners | Approved financial authority/actuals/commitments | Project reference, approved **plan** and forecasts | Conditional; accounting actuals remain external |
| Reporting / Search | Authorised derived analysis and search results | Scoped, revisioned project records, status, events, planned budget, complete/partial metadata | Optional; Project native views work without them |
| Scheduler / Notifications | Schedule and delivery/attempt state | Deadline/reminder requests, approved notices | Optional; acknowledgement is not Project progress |
| Storage / Publisher / Integrations | Source document refs/status; external qualified observations | Scoped references, authorised sync/change requests | Optional; owner retains bytes/publication/provider facts |
| Privacy / Legal Compliance | Applicable rights, disclosure, retention, holds and qualified legal constraints | Minimised project data and evidence references | Conditional, fail safely on mandatory unknown constraints |
| Asset, Booking, Employment and other domains | Source-specific activity/resource facts where needed | Project reference, approved scope/milestone constraints | Conditional, never overwrite specialist state |

**Error Normalisation, Logging, Audit and Reporting are distinct public exchanges:**

| Partner | Project supplies | Return to Project; responsibility |
|---|---|---|
| [`error-normalisation`](../../libraries/error-normalisation/stateless-library-record.md) | Project-owned stable error/outcome, mapping/version, safe context and audience | Pure bounded classification, safe message/field references, diagnostic projection and **advisory** retry; Project retains outcome/recovery/commit authority; no store/event/log service |
| [Logging](../../services/logging/services-record.md) | Sanitised validation, sync, timeout, revision conflict, latency and operational correlation codes | Accepted/rejected/throttled/unknown diagnostic intake, log reference and sink health; no source truth or Audit custody; routine outage does not undo commit |
| [Audit](../audit/capability-record.md) | Attributable, risk-selected committed project/baseline/role/milestone/budget-plan/closure changes, significant denials and protected exports with provenance | Accepted/pending/rejected/uncertain independent evidence receipt, integrity/coverage; where current policy requires confirmed custody, protected operation stays held/failed under recoverable rules |
| [Reporting](../reporting/capability-record.md) | Authorised source project states and revisioned outcome counts, plans, milestones, progress classes, risks and source completeness | Report definitions/run status, portfolio metrics, exports, cut-off/freshness/coverage and disclosure status; no certification of Project milestones or Accounting actuals |

The normaliser dispatches nothing; Logging is technical evidence only; Audit independently owns accountable custody; Reporting owns derived analysis, not business outcomes. Do not count logs as complete business outcomes, or infer approved milestones from Task/Workflow results. Never transmit raw charters, private budgets, user details, source documents, secrets or unredacted stacks to general diagnostics. All recipients perform their own authorised access checks; no recipient reads Project's private database.

## Security, policy, privacy, persistence and external providers

Server-side tenant/resource access is mandatory; meet OWASP ASVS 5 L2 (L3 where appropriate), accepted ADR-0012 and ADR-0016–0018. Approved project-role labels do not replace Identity membership or Authorisation. Strong assurance, separation of duties and protected effective policy changes apply to high-risk approvals. Auditable project evidence is independent of Logging. Minimise personal/contact data, budgets and other confidential project information; apply source-scoped field disclosure, retention, legal holds, redacted export and revocation-aware stored/report data. Legal applicability is qualified by Legal Compliance and specialist Privacy—not presumed from a standard name.

Project owns its schema/migrations and transactional outbox, with infrastructure connections supplied via documented ports. External PM integrations are optional and provider-neutral: describe field authority, per-tenant credentials, import/export/migration, permitted costs/terms, sync cursor/version, conflict/duplicate resolution, removal and recovery. Local Project charter/baseline remain authoritative; an external-primary mode requires a separate authority review. Missing optional providers mean degraded source views, not loss of local decisions or invented completion. No mandatory Redis, Neo4j, Elasticsearch, external workflow engine or SaaS dependency.

## Standards and library choices

**Design guidance, not certification:** [ISO 21502:2020](../../../RESOURCES.md#iso-215022020) primary project lifecycle; ISO 21500:2021 (project/programme/portfolio vocabulary), ISO 21503:2022/21504:2022 (grouping), ISO 21505:2017 (governance), ISO 21511:2018 (deliverable breakdown), ISO 31000:2018 (risk), ISO 15489-1:2016 (records). Optional ISO 21508:2026/21512:2024 for earned value where financial evidence qualifies. UK [APM Body of Knowledge 8](../../../RESOURCES.md#apm-body-of-knowledge-8), [PMI PMBOK 8](../../../RESOURCES.md#pmi-pmbok-8), configurable PRINCE2 7 and conditional [GovS 002](../../../RESOURCES.md#govs-002) may guide methods; none may become a mandatory methodology or package. Recheck published editions and jurisdictional applicability before adoption.

**Binding ecosystem requirements:** accepted governing ADRs, [OWASP ASVS 5](../../../RESOURCES.md#owasp-asvs-500), [W3C WCAG 2.2 AA](../../../RESOURCES.md#w3c-wcag-22-aa), WAI-ARIA where appropriate, BCP 47/CLDR/ECMA-402 via Clock/Theme Manager. Guidance where applicable: ISO/IEC 27001/27002 and 27701, EN 301 549, IETF RFC 3339/5545, W3C PROV-O and OpenAPI/JSON Schema for chosen adapters. No assertion of ISO certification, government eligibility, accessibility audit completion or statutory compliance.

**Complete public-source, commercially permissive candidates only** (licence/version/transitive and supply-chain validation before adoption): [Zod](../../../RESOURCES.md#zod) (MIT, Project input validation); [node-postgres](../../../RESOURCES.md#node-postgres--pg) (MIT, existing `pg` port); optional [Kysely](../../../RESOURCES.md#kysely) (MIT SQL builder, not parallel ORM); [@dagrejs/graphlib](../../../RESOURCES.md#dagrejsgraphlib) (MIT graph/cycle detection) **or** Graphology (MIT alternative); [decimal.js](../../../RESOURCES.md#decimaljs) (MIT precision for plans where needed); optional [TanStack Vue Table](../../../RESOURCES.md#tanstack-table) and [Frappe Gantt](../../../RESOURCES.md#frappe-gantt) (MIT GUI); optional Cytoscape.js/Vue Flow (MIT advanced graph/editor) and Ajv (MIT JSON Schema alternative). Use Pino only behind Logging; reuse Clock instead of rival date utilities. PostgreSQL's permissive licence aligns with the existing infrastructure baseline. Avoid source-available/open-core/restricted flagship products, needless duplicates and paid enterprise feature dependencies. These are **uninstalled candidates**, not approved exact releases or implementation choices.

## Project Documents & Evidence view — Task reciprocal proposal (23 November 2026)

**Status: Task TASK-14 evidence projections owner-approved conceptually; proposed optional Project-owned document-index presentation from Task draft PR #138, not an amendment to approved PROJECT-01–06, not a published Project API and not a separate `projects` software library.** The existing Project design already owns revisioned project plans, milestone/acceptance evidence and project history, and references documents through Storage/Publisher; it has not specified a separately governed project-wide document library or document catalogue contract.

**Recommended public Project-owned index/view:** an authorised Project Documents & Evidence register with project ID, classification/folder-like group or milestone association, source capability/resource ID, authoritative source revision or immutable evidence digest as applicable, title/type, creator/provenance, effective/as-of time, disclosure classification, validation status and availability. Allow Project to categorise and link charters, approved plans, meeting decisions, deliverables, milestone proof and Task-generated attachments/work history **by reference**. The Project view must not import Task's private tables, copy Task history or duplicate file bytes. Task owns task execution facts and attachment association history; Storage owns bytes; Publisher owns published document lifecycle; other source domains retain their records. A document link is neither a new access grant nor milestone acceptance.

**Conceptual inbound contract:** source-qualified Task/project document link, task ID/tree/milestone relation, task revision, proof/scan/verification state and provenance; separately, authorised Project user creates/removes categorisation or milestone evidence association under expected Project revision. **Outbound contract:** filtered `listProjectEvidence`/`getProjectDocumentIndex` projection and `getProjectEvidenceAssociations` (logical names only), with Project-owned grouping and approvals plus source-owned facts explicitly distinguished. Resolve current source permissions, retention/holds and link availability when displaying/downloading; cache only authorised minimised metadata with revocation-aware freshness. If source unavailable, label stale/unavailable and do not certify completion. User-visible Project document browser should offer filter by milestone, task, owner, category and date, plus qualified preview/download and source-history link. Headless consumers use the same public projections.

**History separation:** Task owns complete immutable-in-meaning execution history, Project owns Project-specific baseline/milestone/acceptance and document-association history; independent Audit retains required evidential custody. A Project timeline may **federate** Task and Project events by source/provenance without a second authoritative transaction log. Neither copies all operational events into a new library. Any standalone `projects` document library/package requires separate justification, ownership and approval.

**Resource relation:** Project owns project plans and budget forecasts; Task declares task-level resource needs and observed utilisation by reference; Asset, Inventory, Booking, Employment, Accounting and other specialists own real stock, capacity, staff, reservations and costs. Project must not count a declared need as confirmed allocation or actual cost.

**Approval distinction:** Task's supply of source-qualified Task evidence to Project is owner-approved in TASK-14. A Project-owned Documents & Evidence view remains a proposed Project presentation/read-model refinement (recommended), not a standalone library or approved replacement for Project's existing history. This request does not reopen approved Project milestone finality, native operating mode or PROJECT-01–06.

## GUI, host navigation and headless mode

**Owner-approved:** optional separable GUI, headless core. Inspection of [`nuxt-layers-test/application-test-template`](../../../RESOURCES.md#application-test-template) `master` showed public home `/`, test dashboard `/admin`, responsive collapsible/mobile-overlay sidebar with **Capabilities → Theme Manager**, Theme Manager-based Appearance menu and placeholder **Not signed in** status. A **derived** Project test host should add **Capabilities → Project** plus optional card on `/admin`, opening an illustrative host-owned `/project` dashboard within the same themed shell. That path is not a required/implemented API or automatic menu registration. The template is local test-only; its test-mode unauthenticated Theme Manager endpoints and authentication placeholder are not production security.

| Screen | User purpose and relevant contract |
|---|---|
| **Project list and dashboard** | Authorised sponsor, manager, contributor or viewer: visible projects, qualified progress, upcoming milestones, risks, approval counts; ProjectQueryService, optional Reporting |
| **Create/charter and settings** | Authorised sponsor/manager creates drafts, proposes scope/baseline, views contextual roles/policy; ProjectService, ProjectPlanningService, Configuration |
| **Project detail, milestones and dependencies** | Overview, versioned timeline/Gantt and accessible table, blocked/advisory links, milestones and evidence; ProjectPlanningService, ProjectQueryService |
| **Changes and approval inbox** | Baseline comparison, proposer/approver/evidence, pending versus committed decisions; ProjectGovernanceService, Authorisation |
| **Risks, issues and decisions** | Scoped project governance and references to specialist cases; ProjectGovernanceService, ProjectQueryService |
| **Progress, resource and budget planning** | Planned/reported/verified/accepted status and plan against qualified Task/Accounting inputs; ProjectQueryService plus authorised source ports |
| **History, closure and export** | Revisions, audited evidence links, qualified closure, reopen and redacted export; ProjectQueryService, ProjectService |
| **Project Documents & Evidence (proposed)** | Permission-filtered catalogue of project documents, Task attachments/deliverables and milestone evidence by source-owned reference, with provenance, current-access validation, categorisation and no duplicate bytes or task history |
| **Optional integration administration** | Source health, mappings and reconciliation, scoped settings; Integrations/Configuration public contracts |

The host owns route, branding, navigation and trusted context; Project owns only domain contracts and optional reusable presentation. One global Project sidebar entry, contextual project detail tabs and permission-checked deep links are preferable to listing all screens/projects globally. Meet WCAG 2.2 AA, keyboard/screen reader use, accessible timeline equivalent, reduced motion, responsive operation, Theme Manager semantic tokens, i18n and correct date/currency formatting. Server-side permission rechecks apply to every query/command/export even for hidden controls. Show loading, empty, denied (without existence leakage), conflict, pending approval, stale/partial/unknown source, provider offline, mandatory Audit hold and qualified successful commit. Disable UI without affecting server services.

## Conceptual contract acceptance

| Input / situation | Required output and owner |
|---|---|
| Create/activate project without Task/Process/Workflow | Project maintains native charter, milestones, protected decision and revision |
| Approve baseline or milestone using current evidence | Project validates policy/caller/source revision, commits once, emits outbox fact; Audit separately confirms required custody |
| Task complete or Workflow decision for obsolete baseline | Project does **not** automatically accept milestone or stale approval |
| Parent tenant attempts child project read or role escalation | Authorisation/Project deny; no parentage or role-title privilege |
| Duplicate command, late event or uncertain provider outcome | Idempotent result, conflict or pending reconciliation; no duplicate approval |
| Accounting actual unavailable, budget view requested | Planned amount remains labelled plan; actual/variance unknown, no false zero or spend authority |
| Provider disconnected, critical source evidence withdrawn | Native Project persists; impacted certification held/qualified |
| Close then reopen project | Retain prior closure, actor, evidence and new versioned decision |
| Logging or Reporting down; mandatory Audit down | Routine log/report outage does not undo Project commit; protected action with required Audit custody holds/fails safely |
| Disabled UI or disabled integrations | Public Project headless interfaces and native queries/commands still work |
| Derived test host selects Capabilities → Project | Same responsive themed dashboard, role-scoped actions, accessible mobile navigation; unauthorised direct route fails |
| Project asked to pay invoice, hire employee or assign Identity membership | Explicit unsupported operation; relevant domain alone owns transaction |

## Approved decisions and remaining evidence

**Owner-approved 22 November 2026 (concept only):** **PROJECT-01** independent Platform ownership; **PROJECT-02** planning budgets vs Accounting actuals; **PROJECT-03** Project milestone acceptance; **PROJECT-04** complete native operation and optional providers; **PROJECT-05** project-only risk/issue decisions; **PROJECT-06** optional GUI and headless core. Also approved: programme/portfolio grouping by reference; typed acyclic blocking dependencies; independent resource Authorisation and approval; progress provenance; budget authority separation; one-way contracts; immutable lifecycle history and uncertainty reconciliation. Approved follow-on design covers the five logical public interface groups, standards profiles, permissive-library shortlist, Error Normalisation/Logging/Audit/Reporting boundaries and representative test-host GUI.

**No outstanding substantive Project conceptual decision identified.** Remaining work belongs to implementation/acceptance: establish actual root `CONTRACT.md` and exported shapes, choose versioned schemas and precise dependency algorithm, select/verify library releases, prove native and security scenarios, threat model/storage register, decide adapter/runtime and evidence of Nuxt 50-line host composition, run CI and GUI/accessibility acceptance by the implementation team. Reconcile provisional adjacent Task/Process and other active blueprint PRs before integration. This record is the **current specification**; amend its relevant sections when evidence changes rather than append isolated notes. The conceptual review may be treated as **complete for owner sign-off**, but not as an implemented, normative, certified or merge-approved capability.


## Task conceptual review — reciprocal public boundary (23 November 2026)

**Status: Task TASK-01–08 and operating safeguards owner-approved conceptually 23 November 2026 in draft PR #138; TASK-09–14 extensions are now owner-approved conceptually (23 November 2026), not implemented or a completed review of project.** [Task canonical conceptual contract](../task/capability-record.md). Project may supply versioned milestone/plan constraints and consume qualified Task progress/completion evidence. Project alone accepts milestones, budgets and closure; Task owns assignments and work evidence. Both remain usable independently; stale Task evidence never automatically satisfies a revised milestone. A single accountable task owner with optional contributors and a separate self-reported/verified status are recommended in Task PR #138, pending approval; Project still independently accepts milestones. Source withdrawal preserves completed work history. Preserve prior approvals and provisional neighbouring work; reconcile overlaps against latest master before merging.


## Time & Attendance reciprocal conceptual note — 23 November 2026

**Status: Time & Attendance TA-01–TA-06 owner-approved conceptually on 23 November 2026; draft PR #143. This does not approve a published project interface or implementation.** Time & Attendance owns approved actual-time evidence, while Project owns project scope, milestone acceptance and allocation rules. Project may reconcile purpose-scoped, revisioned approved working-time references with separately Task-owned actual effort and its own project allocation rules for cost analysis; neither reference by itself establishes work acceptance, billability or accounting. No second editable Project or Time & Attendance effort ledger is proposed. See [the proposed source-of-truth and input/output contract](../time-attendance/capability-record.md). Existing approved decisions remain authoritative.

## FAC-D04 — Financial budget boundary

Project owns plan/target baselines and attributable work evidence. Accounting owns approved legal-entity/book budget allocations and authoritative reservation/commitment-control evidence. Project may request scoped allocation with source revision, amount/currency, period and mandate; consume qualified allocation/reservation receipts and reconcile unknowns, never infer budget authority from a project plan or reported actual cost.
