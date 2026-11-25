# Time & Attendance — Capability Record

**Identifier:** `time-attendance` · **Classification:** Domain capability candidate · **Design status:** **conceptually complete for owner-approved scope**, 23 November 2026 (Employment EMP-03; TA-01–TA-06; subsequent approved standards, permissive-library, cross-cutting and GUI recommendations). **Delivery status:** no verified implementation repository, released package, published root `CONTRACT.md`, tested GUI or operational acceptance. **Merge status:** draft PR #143, **not merged**; separate owner approval and pre-merge validation required.

**Authority:** [governing architecture-rules](https://github.com/nuxt-layers/architecture-rules), accepted ADRs and [Capability Standard](../../capability-standard.md) prevail. Initial governing baseline `d7f7c2ee051244b8c81325f5ff1267568d99aab1`, blueprint `8874cccf2f4faaa23b765a9a0a377a77951bc3da`; [Employment EMP-03](../employment/capability-record.md). This record specifies **idealised public business interfaces**, not exported functions, fixed routes, implemented providers, conformity certification or legal advice.

## Purpose, ownership and exclusions

Record overtime as a measured quantity, not automatically approved or payable. Reconcile travel, absence, cross-border work and external consulting/billable time under qualified applicable policy; avoid double counting for payroll and billing. **Own** attributable evidence of actual work, including clock and break observations, independently declared periods, source confidence, incomplete and disputed intervals, submitted timesheets, reviewed and approved time, corrections, history and downstream handoff acknowledgements. The capability decides what constitutes *qualified and approved working time*, not what is payable, billable or contractually expected.

**Support** employees, contractors, volunteers and other authorised participants. An Employment record is **not mandatory**, but an independently verified, dated participation/engagement basis, permission and valid reviewer authority are. A membership label alone does not establish that basis.

**Do not duplicate neighbouring records:**

| Other owner | Its responsibility, not this capability's |
|---|---|
| Employment | Employment relationship, contracted hours, leave, entitlements and employment conditions. |
| Generic `attendance` | Event/activity participant register, invitations, expected presence and generic check-in verification; check-in alone does not prove worked time. |
| Training | Learning participation, competence and completion evidence. |
| Task / Project | Task-specific planned and actual **effort**, work verification, project acceptance and allocations. An approved work interval is not proof of task completion. |
| Workforce Scheduling **candidate** | Planned shifts and rostering; the platform `scheduler` only runs background jobs. |
| Payroll / Accounting / Billing | Payable hours and wages, ledger/cost entries, chargeability and invoices respectively. |
| IAM / Privacy / Audit / Reporting | Identity and access, privacy governance, independent evidential custody and derived reports, respectively. |

Task effort and actual worked-time intervals remain **different authoritative facts**. Exchange scoped IDs and revisions and publish discrepancies (missing, overlapping, unallocated or overallocated time). Do not copy either ledger or infer pay, work acceptance or legal compliance from a punch.

## Native operation and evidence lifecycle

**Minimum standalone service:** trusted manual entry and direct observations, interval and break validation, period submission, authorised review, dispute and correction, scoped queries and durable history. It works without Employment, roster, Task, Payroll, Workflow, Reporting, external provider or GUI; necessary caller/access, temporal semantics, policy and persistence still must be supplied.

1. **Capture:** preserve observed versus declared status; actor, participant and engagement, source/device trust and original event ID, observed instant, source zone/offset, received time, evidence references and revision. Prevent forged/replayed entries and unsupported clock confidence.
2. **Interpret:** use Clock for canonical instants, DST ambiguity, overnight intervals, elapsed versus local/civil-time meanings. Flag missing punches, overlaps, implausible or conflicting data; never invent a clock-out or turn a roster into actual attendance.
3. **Review:** drafts may be attested/submitted, held for clarification, approved or rejected by an independently authorised reviewer; identify approved intervals and quantities exactly. Apply source-, engagement-, jurisdiction- and effective-date-qualified policies.
4. **Dispute/correct:** preserve prior approval and original evidence. Append attributable, reasoned superseding revisions; amendments after Payroll/Accounting handoff create separate revised statements and acknowledgement/reconciliation work, never silent edits to their outcomes.
5. **Recover:** duplicate device/offline/provider messages are idempotent. Out-of-order or uncertain external outcomes remain explicitly pending. Durable business writes and the source-owned outbox commit together; consumer receipts identify the exact revision they accepted.

**Orthogonal states:** observations `received/validated/held/rejected/superseded`; timesheet/interval `draft/submitted/under_review/approved/rejected/disputed/corrected`; handoff `not_sent/pending_ack/acknowledged/reconciliation_required`. Incompleteness, possible legal breach and provider uncertainty remain visible flags, not false approvals. Closed history remains accessible only within applicable permissions/retention.

**Provider authority:** native/manual is always available. Optional signed trusted terminals, offline queues or external provider adapters may be authoritative for specifically declared source + scope + effective period, with **one designated source of event authority** at a time. Preserve import versions, mapping, cutover, revocation, drift, outages, replay, export and reconciliation. Integrations handles connections; this capability owns qualification and approval. A provider webhook alone is never an approval.

## Idealised public input contract

Inputs are independently validated, source-scoped and purpose-limited. “Required” is specific to the operation; not every command carries every field.

| Input/source | Data or command supplied | Requiredness and failure |
|---|---|---|
| Host/IAM, Identity and Authorisation | Trusted tenant, caller/assurance, participant reference, operation/resource/field decision | **Essential** for protected operations; missing/stale/denied access fails closed, including before detailed read. |
| Employment **or** another approved participation owner | Effective engagement, lawful eligibility, reviewer/delegation source and constraints | **Essential basis**, Employment itself optional; unknown eligibility/delegation holds regulated changes. |
| Worker, authorised reviewer or trusted device | Clock and break observations; manual claims; submission, review, dispute or correction, reasons and evidence | Core service; validate actor, range, evidence trust, revision, duplicate ID and source authority. |
| Clock | Instant, time zone, DST resolution and elapsed/civil period semantics | **Essential temporal interpretation**; ambiguous time held for clarification. |
| Configuration, Privacy and Legal Compliance | Versioned effective rules, breaks/rounding, monitoring purpose, retention/hold and jurisdiction | Applicable rule mandatory for regulated decision; unresolved statutory qualification means hold, not fabricated compliance. |
| Workforce Scheduling; generic Attendance; Task/Project | Planned shifts; event presence; independent task effort/activity references | **Optional** evidence/comparison, never substitutes for actual worked-time proof. |
| Integrations/provider | Verified external source payload, remote ID/revision, observed/received time, signature, completeness and callback status | **Optional**; wrong authority/duplicates rejected or quarantined; unknown outcome reconciled. |
| Workflow / Notifications | Optional delegated approval orchestration and notice/delivery status | Optional; native approval stays authoritative; notice failure cannot undo it. |
| Payroll / Accounting / other downstream consumers | Accepted exact statement revision, rejection, amendment reconciliation and receipt | Conditional after handoff; transport success is **not** business acceptance. |

**Business error categories:** `forbidden`, `invalid_time`, `source_untrusted`, `conflict`, `stale_revision`, `incomplete`, `policy_unqualified`, `provider_uncertain`, `unsupported`. Return safe stable codes and observed versus unknown outcome, not private exception text.

## Idealised public output contract

| Public output | Authorised recipient and meaning |
|---|---|
| Observations, intervals and timesheets | Participant/approved reviewer: source, claim versus verification, breaks, zone, completeness, version, submission and approval state. |
| Approved actual-time statement | Payroll and engagement owner: participant/period, approved quantity and break meaning, approval evidence, effective rule, exact source revision and supersession. **Not** an instruction to pay. |
| Reconciliation and exception views | Worker, reviewer/operator and permitted Task/Project consumers: missing/overlapping time, roster differences, Task-owned effort references, incomplete/overallocated work and dispute/recovery state. Neither party gains authority over the other's facts. |
| Correction/dispute history | Qualified former and current facts, reasons, decision actor, source revision, supporting evidence reference and pending downstream amendment. |
| Provider and downstream acknowledgements | Operators/consumers: accepted, rejected, uncertain, pending or reprocessing status for precise remote and statement revisions. |
| Authorised reporting projections | Reporting and authorised management: submitted/approved/disputed hours, breaks, counts, units, period, as-of/effective times, completeness, provenance and correction signals. Reporting owns aggregation. |
| Committed change events | Subscribed consumers: minimised tenant/scope, source event and revision, event kind, effective time and correlation; detailed reads independently reauthorised. |
| Rights/portable export | Permitted participant or Privacy/Legal Compliance: redacted, purpose-specific records with retention, legal hold and erasure/restriction status. |

No cross-tenant read or unrestricted personal/location/biometric payload. Consumers may conclude only the meaning their own public authority allows; a source event is neither a permission grant nor a downstream completion receipt.

### Commands, queries, events and guarantees

**Commands (conceptual):** `recordObservation`, `declareInterval`, `submitTimesheet`, `reviewIntervalOrPeriod`, `openDispute`, `correctEvidence`, `reconcileProvider`, `acknowledgeHandoff`, `requestExportOrRightsAction`. Validate identity, scope, policy, exact expected revision, source authority and idempotency; return committed/held/refused/conflict/unknown with source revision.

**Queries:** `getObservations`, `getIntervals`, `getTimesheet`, `getApprovedTimeStatement`, `getExceptions`, `getDisputeHistory`, `getReconciliationStatus`. Enforce server-side row/field permissions before read and label freshness, provenance and incomplete/unknown results.

**Events:** `ObservationRecorded`, `TimesheetSubmitted`, `TimeApproved`, `TimeRejected`, `TimeDisputed`, `TimeCorrected`, `ApprovedTimeSuperseded`, `ProviderReconciliationChanged`, `HandoffStatusChanged`. Business changes and capability-owned durable outbox are atomic; Message Queue transports **at least once**. Consumers handle duplicate, late or reordered events and reconcile by source revision; no cross-service exactly-once promise.

**Shared context as needed:** trusted tenant/organisation, participant/engagement, actor/assurance, resource/access decision, source event, source trust, period, policy jurisdiction/version, canonical and source times, correlation/idempotency and expected revision. Do **not** mandate a universal request DTO. Adapters use published contracts and provider-neutral host ports.

## Cross-capability interfaces

All dependencies are directional **public contracts or host-composed ports**; no cyclic imports or access to another capability's private store.

| Counterparty | Information supplied to Time & Attendance | Information received / authority and absence |
|---|---|---|
| Identity / Authentication / Authorisation | Trusted identity, participant reference, caller assurance and resource/field permission | Scoped time records and decisions; essential access, fail closed. |
| Employment or other participation owner | Effective terms, eligibility, delegations and labour category | Approved hours and corrections; a qualifying participation owner essential, Employment optional. |
| Clock | Time-zone/DST, instant and duration interpretation | No time ledger; Clock semantics essential. |
| Configuration / Legal Compliance / Privacy | Effective policies, lawful purpose, jurisdiction, retention/hold and disclosure constraints | Restricted records, corrections and rights handling; hold unsafe legal conclusions. |
| Workforce Scheduling | Optional planned shifts and amendments | Actual-versus-planned exceptions; no roster requirement. Platform Scheduler owns background triggers only. |
| Generic Attendance / Training | Optional verified event presence or learning references | No automatic work-hour or educational finding; each owner retains its own evidence. |
| Task / Project | Independent actual task effort, activity references and project rules | Scoped approved work-time references and discrepancy; do not reown Task effort or project acceptance. |
| Payroll / Accounting / Billing | Period context and downstream statement receipts | Approved-time revision and amendments; consumers own pay, ledger and billability. |
| Integrations / trusted devices | Verified remote events, provider versions and status | Qualified source reconciliation; optional provider. |
| Workflow / Notifications | Optional approval coordination and delivery results | Source-authoritative approval decisions and notice requests; optional. |
| Search / Export / Profile | Authorised indexing/rendering/display preferences | Minimal permitted references and exports; no duplicate master worker/person record. |
| Scheduler / Message Queue / Storage | Background triggers, outbox transport and evidence-byte storage | Delivery work and metadata references; no domain authority or new infrastructure. |

### Error Normalisation, Logging, Audit and Reporting — exact contract split

| Consumer or library | Input from Time & Attendance | Response / limitation |
|---|---|---|
| [`error-normalisation`](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) | Recognised source-owned error code, mapping/version, trusted correlation, disclosure profile and known/unknown operation outcome | **Pure/stateless** safe code, message key, public versus technical projection and *advisory* retry class; never retries, logs or changes time. |
| [Logging](../../services/logging/services-record.md) | Minimise structured technical error/operation codes, provider latency/faults, safe timestamps and opaque correlation; no raw timesheet by default | Accepted/rejected/throttled/unavailable/uncertain diagnostic intake, scope-limited queries and health. Logging outage does not undo committed time. |
| [Audit](../audit/capability-record.md) | Risk-selected approvals, denials, corrections, overrides, disputes and sensitive access with source revision, actor/assurance, actual outcome and provenance | Separate evidence intake, custody/integrity/coverage status and authorised review; receipt is not proof of a worked hour. Mandatory risk-critical evidence must use an approved hold or durable recovery gate. |
| [Reporting](../reporting/capability-record.md) | Purpose-authorised hours/breaks/exceptions, status, unit/period, source revision, freshness, incomplete data and committed correction notice | Governed reports, totals, snapshots, invalidation/refresh and authorised export; Reporting never approves hours or reads private tables. |

Error Normalisation produces no events, Audit receipts, log submissions or reports. Time & Attendance sends these independently where applicable; technical errors and reports must not become a second source of business truth.

## Security, privacy, law and standards

**Threat model:** forged/buddy-punched events, stolen terminal credentials, offline/device replay, coerced adjustments, inappropriate self-approval, overcollection, insider access, cross-tenant inference and failed source/provider provenance. Apply server-enforced least privilege, assurance/recency where justified, source validation, dual-control approvals when policy mandates, restricted exports, safe errors and independent Audit. Technical Logging and Observability are not monitoring permission.

**Worker rights and legal qualification:** Legal Compliance and Privacy qualify working time, rest/breaks, travel/standby, young workers, national/sector exclusions, lawful monitoring, proportionality, retention, legal hold and rights by **jurisdiction, worker category and effective date**. No universal overtime, rounding, rest, fixed retention or legal classification rule is asserted. Avoid biometric and precise-location capture by default; require separate necessity, lawful basis, DPIA and safeguards if ever justified. A policy or worker consent cannot waive statutory protections. Unknown mandatory compliance input holds regulated approval and reports uncertainty.

**Standards and their practical uses** (guidance unless independently made binding by law/approved governance):

| Reference | Design use |
|---|---|
| [ISO 8601-1:2019](https://www.iso.org/standard/70907.html), [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339), [RFC 9557](https://www.rfc-editor.org/rfc/rfc9557) | Portable time interchange; retain original zone/offset and occurrence versus receipt times through Clock. |
| [ISO 15489-1:2016](https://www.iso.org/standard/62542.html) | Reliable, authentic, attributable source/approval history, correction lineage, controlled retention/disposal. |
| [ISO 30414](https://www.iso.org/standard/30414), [ISO 45001](https://www.iso.org/standard/45001), [ILO NORMLEX](https://normlex.ilo.org/) | Qualified workforce indicators, fatigue/rest evidence and international working-time principles; not universal mandatory law or assumed ILO ratification. |
| [ISO/IEC 27001](https://www.iso.org/standard/27001), [ISO/IEC 27701](https://www.iso.org/standard/27701), [NIST SP 800-63-4](https://csrc.nist.gov/pubs/sp/800/63/4/final), [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) | Security/privacy governance, identity assurance, audit and control evidence, minimised disclosure. |
| [OWASP ASVS 5](https://asvs.owasp.org/), [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/), [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/), [ETSI EN 301 549](https://www.etsi.org/standards) | Existing ASVS L2 (L3 where risk-critical) and WCAG 2.2 AA platform baselines; accessible screens and deployment-specific ICT obligations. |
| [UK Working Time Regulations](https://www.legislation.gov.uk/uksi/1998/1833/contents), [Acas](https://www.acas.org.uk/working-time-rules), [ICO workplace monitoring](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/employment/monitoring-workers/) | UK-specific hours/rest and proportionate employee monitoring as applicable; guidance is not itself law. |
| [EU Directive 2003/88/EC](https://eur-lex.europa.eu/eli/dir/2003/88/oj/eng); [US FLSA/29 CFR Part 516](https://www.dol.gov/general/topic/workhours/hoursrecordkeeping) | Jurisdiction- and coverage-qualified working-time, weekly hours and records; national/state rules may differ. |

Use native accessible HTML before ARIA, Theme Manager semantic tokens, Clock/Localisation and responsive keyboard/screen-reader error/status handling. Citation of a standard does not establish certification or legislative compliance.

## Optional GUI and representative host

**Approved TA-06:** headless core remains complete; optional presentation provides worker, reviewer and operator views. [`application-test-template`](https://github.com/nuxt-layers-test/application-test-template) demonstrates the host-owned `/` home, `/admin` test workspace, collapsible **Capabilities** sidebar with `/theme-manager` entry, branded toolbar and Theme Manager Appearance controls. Its `themeManager.mode='test'` and **Not signed in** label are development fixtures, **not** real IAM. [Theme Manager root contract](https://github.com/nuxt-layers/theme-manager/blob/master/CONTRACT.md) describes the existing screen ownership and limits.

**Recommended host navigation:** one **Capabilities → Time & Attendance** entry and optional `/admin` card → capability-owned `/time-attendance` dashboard. Routes below are **proposed defaults**, not shipped URLs. The **host** owns sidebar, routing mount, brand and real caller composition. The **capability** owns its screen content and invokes only authorised public time contracts; other capabilities retain IAM, theme and reporting authority.

| Logical screen | User task / public operations | Access |
|---|---|---|
| **Dashboard** `/time-attendance` | Own current status, draft/awaiting-approval periods, missing punches, disputes and reconciliation; scoped read models | Each role sees only permitted summaries. |
| **My Time** `/my-time` | Clock/break action, manual interval, source/zone/uncertainty; `recordObservation`, `declareInterval` | Eligible participant. |
| **Timesheets** `/timesheets` | Daily/period view, submission, approval/revision history, permitted export; `getTimesheet`, `submitTimesheet` | Own or explicitly delegated records. |
| **Approvals** `/approvals` | Scoped queue, evidence, approve/reject/request change against exact revision; `reviewIntervalOrPeriod` | Authorised independent reviewer; no prohibited self-approval. |
| **Disputes** `/disputes` | Challenge, correction reason/evidence, former/current time and handoff status; `openDispute`, `correctEvidence` | Participant or case reviewer. |
| **Exceptions** `/exceptions` | Overlaps, missing punches, source drift, replay, external and downstream reconciliation; `reconcileProvider` | Supervisor/operator with verified scope. |
| **Reports** `/reports` | Restricted summaries, qualified trends and exports via Reporting | Optional Reporting; no duplicate analytics engine. |
| **Settings** `/settings` | Source/device authority, policy versions, connections, retention/rights links | Operator/admin; actual policies/permissions owned elsewhere. |

Views may be **dashboard panels**, not eight compulsory route components. First release can prioritise My Time, Timesheets, Approvals and Exceptions with contextual Disputes. Show loading, empty, denied, partial, stale, offline queued, submitted, disputed, approved, superseded and provider-unknown states plainly; never render a pending callback as confirmed.

**Derived test app acceptance:** add sidebar and `/admin` links *in the derived app*, not the shared template; compose future public Time & Attendance entry with one-operation ADR-0012 integration and the Nuxt 50-line host budget. Exercise controlled test users, authorised/non-authorised approvals, mobile/keyboard/screen reader, theme modes, offline replay, correction after Payroll, reporting invalidation and **GUI-off headless** operation. The template's unauthenticated Theme Manager test mode must never be exposed as production IAM. No screen implementation or host acceptance is claimed.

## Permissive, fully open-source candidate libraries

**Owner-approved selection direction; no packages installed or versions frozen.** Select complete publicly available source under commercially permissive licences, then check the exact release and **all transitive licences**, security, maintenance and compatibility before adoption.

| Need | Preferred candidate | Role and condition |
|---|---|---|
| Database | [node-postgres `pg`](https://github.com/brianc/node-postgres) (MIT) | ADR-0012 PostgreSQL pool; capability owns transaction, records, atomic outbox. |
| Query complexity | [Kysely](https://github.com/kysely-org/kysely) (MIT) | Optional if plain parameterised SQL becomes unwieldy; no second ORM by default. |
| Contract validation | [Zod](https://github.com/colinhacks/zod) (MIT) | One runtime validator; [Valibot](https://github.com/open-circle/valibot) or [Ajv](https://github.com/ajv-validator/ajv) (MIT) only if a specific alternative is better. |
| Temporal processing | Existing Clock capability / [Temporal polyfill](https://github.com/js-temporal/temporal-polyfill) | Reuse Clock public API, not another time calculation authority. |
| Accessible data screens | [TanStack Table](https://github.com/TanStack/table) (MIT), optional [Reka UI](https://github.com/unovue/reka-ui) (MIT) / [Vue Datepicker](https://github.com/Vuepic/vue-datepicker) (MIT) | Only when the existing UI/Theme Manager does not already supply an adequate control; accessibility must be verified. |
| Testing | [fast-check](https://github.com/dubzzz/fast-check) (MIT), existing [Playwright](https://github.com/microsoft/playwright) (Apache-2.0) | Property tests for overlaps/DST/revision/replay; CI/user performs acceptance. |
| Technical diagnostics | [OpenTelemetry JS](https://github.com/open-telemetry/opentelemetry-js) (Apache-2.0), [Pino](https://github.com/pinojs/pino) (MIT) | Only via platform Observability/Logging, not a parallel attendance pipeline. |
| Jobs | [pg-boss](https://github.com/timgit/pg-boss) (MIT) | An *alternative for platform Scheduler/MQ evaluation*, not a Time & Attendance direct dependency. |

Reject open-core or proprietary attendance platforms and paid scheduler plugins as core dependencies; standard [FullCalendar](https://fullcalendar.io/license) is MIT but its premium scheduling plugins are differently licensed. No Redis, Elasticsearch, Neo4j or second data store is justified by this design.

## Conceptual acceptance, completion and handover

The following are **unexecuted design acceptance criteria**:

| Situation | Expected authoritative outcome |
|---|---|
| Volunteer has valid participation but no Employment | Native/manual work recorded and reviewed without fabricated Employment; invalid eligibility held. |
| Clock pair crosses midnight or DST; missing punch or overlap | Clock-qualified elapsed time with zone provenance; ambiguous/incomplete interval held, not silently approved. |
| Planned shift or generic event check-in without punches | Comparison/presence evidence only, never inferred approved worked hours. |
| Task effort exceeds approved worked time | Versioned discrepancy/unallocated effort exposed; no automatic project acceptance, billing or pay. |
| Unauthorised reviewer, self-approval, expired delegation or cross-tenant export | Denied without source mutation or information leak; risk-selected security evidence. |
| Duplicate offline replay, provider outage or unknown callback | At most one canonical source revision per idempotency key; explicit uncertainty and durable reconciliation. |
| Approved period corrected after Payroll accepted older revision | Original history retained; new statement/revision and pending exact-revision Payroll/Accounting acknowledgement. |
| Mandatory legal rule unknown, Audit evidence mandatory but unavailable | Hold affected regulated/critical action or approved durable recovery; do not claim compliance or custody. |
| Logging or Reporting unavailable; optional GUI disabled | Core capture, review and time history still available; optional diagnostic/report/UI limitations reported. |
| Correction affects a Reporting snapshot | Event marks derived report stale; Reporting re-queries authorised current source revisions. |
| Rights request intersects lawful retention hold | Permitted restricted response and traceable lawful retention/disposition, not unqualified deletion. |
| Mobile/desktop host with real authorised and test users | Role-scoped sidebar/dashboard, accessible actions/feedback; no reliance on local unauthenticated test mode. |

**Approved conceptual decisions — stable IDs:**

| Decision | Approved rule |
|---|---|
| **EMP-03** | Employment owns terms and leave; independent Time & Attendance owns actual worked time, with Workforce Scheduling's planned rosters separate. |
| **TA-01** | One owner of qualified actual worked time; generic Attendance, Task effort, Training, Project and Payroll remain distinct. |
| **TA-02** | Native/manual independent mode; external and offline capture optional with one scoped source authority and reconciliation. |
| **TA-03** | Revisioned attributable evidence, reviews, disputes and non-destructive historical corrections; amendments require downstream acknowledgement. |
| **TA-04** | Verified engagement, delegated independent approval, least privilege and jurisdiction-qualified rules; uncertain mandatory qualification holds approval. |
| **TA-05** | Public commands/queries/events, idempotent revisions, safe unknown outcomes, atomic owned outbox and at-least-once transport. |
| **TA-06** | Complete headless service with separable, accessible, role-scoped dashboard and host-owned navigation. |

**Decision status:** EMP-03 and TA-01–TA-06 are **owner-approved conceptual rules**. Subsequent owner approvals cover standards-informed guidance, permissive-library direction, Error Normalisation/Logging/Audit/Reporting boundary and optional GUI sidebar-to-dashboard refinement. No further material **conceptual ownership decision** is presently identified. Remaining integration matters below do not reopen these approved choices.

**Future external-contract alignment (does not block conceptual completion):** confirm the precise non-employee engagement/reviewer port; generic Attendance and Task effort interoperability; separate Workforce Scheduling catalogue/contract if developed; Payroll/Accounting amendment acknowledgements; jurisdiction-specific qualified Legal Compliance and Privacy contracts. Adjacent conceptual documents are not automatically published or operational APIs. Do not invent these interfaces.

**Implementation and evidence required later:** independent published root `CONTRACT.md`, stable versioned exports/schemas/errors and declared ports, `STORAGE-REGISTER.md`, threat/privacy and jurisdiction qualification, PostgreSQL source and durable outbox, provider/offline migration and replay, Audit risk gates, controlled permissions, acceptance tests/CI, accessible host journeys, and measured ADR-0012 one-operation/50-line Nuxt composition. No implementation edit, test result, deployment, certified legal compliance or package adoption is asserted.

**Review closure versus merge:** **Conceptual content is complete for the approved design scope**, subject to owner acceptance of this consolidated record and final current-master/concurrent-PR architectural, link and CI checks. This is **not** an implementation-complete capability or permission to merge. PR #143 stays draft until separately approved for squash merge.

## FAC-D02/D03 — Approved Payroll and Workforce Scheduling boundaries

[Workforce Scheduling](../workforce-scheduling/capability-record.md) supplies versioned planned shifts and changes; compare against independently observed/approved actual time, never infer attendance from plan. [Payroll](../payroll/capability-record.md) consumes exact approved actual-time revision, effective period, units and correction evidence; returns accepted/held/rejected or unknown handoff and reconciliation references. Time & Attendance owns corrections to actual-time evidence, Payroll owns pay-run adjustments.
