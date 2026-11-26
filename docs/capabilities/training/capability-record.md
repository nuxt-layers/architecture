# Capability Record — Training

**Capability:** `training` · **Classification:** Domain capability candidate (distinct authoritative learning records and decisions).  
**Status:** **Conceptual review documented and owner-approved in principle; draft PR #145 remains unmerged.** TRAIN-01–08 and COURSE-08–12 retain their owner-approved status; subsequent public-contract, standards, Error Normalisation/Logging/Audit/Reporting and GUI recommendations have also been approved in this review conversation. Attendance coordination resolved by FAC-D07; exact implementation interface shapes and operating evidence remain pending. No available, installed, configured, operational, enabled or authorised implementation is evidenced.  
**Authority:** [governing catalogue](../../catalogue.md), [Capability Standard](../../standards/capability-standard.md), accepted ADR-0001/0002/0008/0009/0012/0016/0017/0018, review protocol (former document: review protocol). Governing `master` at review opening: `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint `master`: `8874cccf2f4faaa23b765a9a0a377a77951bc3da`.

## Purpose, independence and source of truth

Training provides an attributable, independently reviewable account of **learning actually undertaken, evidence assessed, learning outcomes or defined competencies demonstrated, and training programme completion**. It supports in-person, blended, supervised, self-directed, workplace, offline, external and prior learning. A durable record and decision lifecycle, including corrections, disputes and withdrawal, justifies a distinct Domain responsibility; it is neither a pure library nor merely a Course or presentation component. Headless, native operation remains possible without a third-party learning system.

**Training owns:** learner-scoped educational activity/evidence records; validation of learning participation and educational relevance; accepted/rejected attestations; verification of learning evidence; version-bound outcome/competency findings against an authorised standard; completion determinations under a particular programme revision; training-specific correction/dispute/reconciliation and history. It must distinguish claims, source-verified presence, verified educational participation and demonstrated learning; these are not interchangeable.

**Others own:** [Course](../course/capability-record.md) programme curriculum, criteria and revisions; [Assessment](../assessment/capability-record.md) test instruments, marks, results, grading appeals; [Enrolment](../enrolment/capability-record.md) admission, learner standing and cohorts; [Qualification](../qualification/capability-record.md) formal eligibility and awards; [Credentials](../credentials/capability-record.md) issuance, verification and revocation; [Attendance](../attendance/capability-record.md) approved generic participation/physical presence register; [Events](../events/capability-record.md) event/occurrence schedules; [Time & Attendance](../time-attendance/capability-record.md) worktime/timesheets. Identity/Profile own person identifiers/personal data; source file owners retain bytes; Audit retains independent custody evidence; Logging retains technical diagnostics.

**Attendance boundary requiring reconciliation:** owner-approved TRAIN-01 retains Training's *specialist* verified learning attendance and participation findings. Generic Attendance may supply a provenance-rich physical presence observation or generic verified presence, but does not decide educational relevance, engagement, competence or programme completion; Training must not create a competing generic all-purpose attendance register. Attendance's detailed ownership remains provisional; no implied transfer of TRAIN-01 or required package dependency. Events EVT-15 does not make Events an attendance ledger. A course completion never constitutes a formal qualification award, professional licence, credential issuance, enrolment decision or paid working time.

## Native information and decision lifecycles

| Record owned by Training | Minimal meaning and state transitions |
|---|---|
| Learning activity/context | Scoped learner, resource owner and programme/course revision (or externally defined competency standard), authorised activity and effective period; context is version-bound |
| Learning participation observation | Referenced activity/occurrence, interval, attestor and evidence: claimed/submitted → pending review → verified/rejected/disputed → corrected/superseded; missing evidence means **unknown**, not absent |
| Evidence item | Original source reference, type, integrity, evaluator/source provenance and permissible scope: received → validated/held/rejected → verified or disputed → revoked/superseded |
| Outcome/competency finding | Standard and rule revision, evaluator, evidence set: not evaluated → pending → achieved/not demonstrated/inconclusive → reviewed/superseded |
| Programme completion | Frozen applicable criteria, exemptions, required outcome/assessment findings: in progress → evidence pending/eligible → completed/incomplete/disputed → corrected/withdrawn/superseded |
| Review history | Immutable references to previous determinations, reasons, effective versus recorded time, authorised decision makers and notification/reconciliation outcomes |

**Minimum native services:** create activity context; capture/verify educational attendance; accept/evaluate evidence; map outcomes and competencies against effective criteria; compute **non-authoritative** progress; authorise completion; review/correct/dispute and reconcile; query scoped history/export. Independently authorised learning outcomes outside a Course are supported under TRAIN-07 when a defined versioned standard, sufficient verifiable evidence and a competent authorised evaluator exist. This grants no external professional award.

Only **objectively deterministic, explicitly approved** evidence/policy errors may be corrected automatically with a recorded rule and audit trail (TRAIN-08). Disputed, judgement-based or consequential achievement/completion decisions require competent human review. A provider outage, unavailable mandatory evidence, stale criteria, uncertain authority or contradictory sources results in **pending/unknown/denied**, never a fabricated achievement or a successful decision. Existing lawful historical reads may remain available.

## Idealised public inbound contract

Business meanings only: no claimed endpoint, package export, universal request object, database type or implemented API. Each source must be authenticated or trusted, correctly scoped and versioned.

| Source, owning authority | Supplied input; purpose | Requirement and validation/absence |
|---|---|---|
| Course | Fixed learning outcomes, prerequisites, completion/attendance thresholds, assessment requirements and immutable programme revision | **Required** for Course-defined completion; exact approved revision/effective dates; mismatch, missing or withdrawal → pending review |
| Enrolment | Approved learner standing, cohort/participation eligibility, enrolment revision and withdrawal | **Conditional** for enrolment-governed delivery; invalid/suspended → block affected new actions, retain history; not mandatory for prior learning |
| Assessment | Versioned appropriately final mark/result, outcome mapping, appeal/correction status | **Conditional mandatory** when criteria require graded assessment; disputed/provisional/revoked cannot be final proof |
| Authorised learner/instructor/supervisor/evaluator | Activity observation, work/evidence claim, evaluated competency, signed attestation, challenge or correction request | Validate caller permissions/assurance, competence, date, source, consistency and integrity; learner self-claim is provisional |
| Attendance (candidate), Events | Generic presence observation/correction and scheduled occurrence/version respectively | **Optional/conditional**: presence is not learning, event completion is not attendance; absent source → other evidence or unknown |
| Integrations / external LMS or skill provider | Provider-bound observations, verification responses, remote status/revisions and sync cursor | **Optional**; verify tenant agreement, trust/signatures, source mapping, freshness/replay and conflicting corrections; missing proof stays provisional |
| Identity, Authentication, Authorisation | Opaque subject/owner, actor/session assurance and resource-scoped policy decision | **Required for protected operations**; no implicit parent-tenant or group access; deny on unknown/expired proof |
| Configuration; Privacy; Legal Compliance; Clock | Scoped approved evidence and disclosure rules, lawful retention/holds, effective times/time-zone semantics | **Applicable operation-specific constraints**; cannot weaken mandatory floors or silently reinterpret historic policies |
| Verification / Content Security / Workflow | Attestation trust, safe submitted material, optional approval route | **Conditional** where mandated by policy/risk; a scan or identity check is not a learning outcome decision |
| Direct command | Subject/tenant/resource/standard reference, requested transition, evidence, reason, expected revision and idempotency key | Validate authorisation, frozen criteria, permitted action, provenance and duplicate/conflict conditions; report accepted versus completed distinctly |
| Audit and Logging | Audit receipt/integrity/completeness status; technical diagnostic sink status, respectively | **Conditional operational feedback**: Audit custody is not Training truth, Logging delivery not Audit custody; mandatory evidence capture must fail safely or use explicitly approved recoverable pending policy |

Protected commands must not trust an inbound event as authorisation. Mandatory external evidence is a conditional dependency for a particular rule, not a universal dependency on that package.

## Idealised public outbound contract

| Output and authority | Consumer and permissible inference |
|---|---|
| Learning activity and progress view — **Training** | Learner, instructor, administrator, Enrolment or Reporting with scoped permission: versioned verified/provisional participation and projected progress, **not** a completion |
| Verified educational participation/attendance — **Training** | Learner, programme/Course operators, authorised Qualification evidence intake: educational observation accepted by Training, **not** paid hours or generic presence authority |
| Competency/outcome finding — **Training** | Learner, Qualification, authorised development/Reporting: specific standard revision, evaluator, verification level and evidence basis; no universal licence |
| Programme completion determination — **Training** | Enrolment, Qualification, limited Credentials issuance context, Reporting: status, criteria and source revisions, appeal/review state; no independent awarding authority |
| Review/dispute/correction lineage — **Training** | Learner, reviewers, compliance and authorised downstream consumers: former and successor status, reason and effective/recorded time, without silently rewriting history |
| Authorised minimal evidence reference/export — **Training** | Learner portability, Qualification/approved verification: purpose-bound facts and source links, never indiscriminate raw submissions |
| Committed lifecycle events — **Training** | Qualified subscribers, Audit intake and Message Queue transport: evidence received, participation verified, achievement/completion determined, disputed, corrected or withdrawn. These signal Training changes; receivers decide their own actions |
| Structured bounded diagnostic — **Training source, Logging sink** | Logging/Observability: code, category, severity, correlation, safe provider name and retry/error class; not learner transcript, grade, raw material or secret |
| Audit evidence payload — **Training source, Audit custody** | Audit: attributable decision and change metadata, immutable source event ID, version, result/correction reason, effective/recorded time and safe references; no raw educational/private health evidence |

All authorised outputs describe **tenant, owner and opaque subject**, source standard/course version, record revision, decision status (including negative, unknown and provisional), provenance, data classification, disclosure permission, effective/recorded/as-of time, completeness and freshness. Training guarantees only its own final decisions and verification processes, never a neighbour's award, legal interpretation or permanent external-provider accuracy. Downstream recipients must re-check authorisation for sensitive details and cannot use events as permissions.

### Commands, queries, events and invariants

- **Conceptual commands:** register activity; record participation; submit/verify/reject evidence; determine achievement; determine completion; request review/dispute; correct/supersede/withdraw finding; reconcile provider; export authorised history. Validate state transition, expected revision, source authority and idempotency. Return stable decision reference and `accepted/pending/completed/rejected/indeterminate` with reason; identical-key replay returns same logical result, conflicting reuse fails.
- **Queries:** scoped progress, participation/evidence matrix, achieved competencies, completion status, disputes/history, source trust and export eligibility. Include revision, as-of, staleness, completeness and pagination where applicable. Bulk/reporting reads are not an authorisation bypass.
- **Events:** emitted **only after committed owner-state changes** using a Training-owned durable outbox with at-least-once transport/replay and idempotent consumers, under accepted ADR-0012. Versioned event ID, subject/tenant, provenance, outcome, sensitivity and correction lineage; never claim exactly-once distributed effect. Submission and rejected attempts may require separate safe security/Audit reporting even without a committed business transition.
- **Invariants:** resource- and tenant-specific server Authorisation; no implicit tenant-tree access (ADR-0017); domain ownership of schema, persistence and migrations; host-supplied ports; immutable evidence/criteria lineage; deterministic Clock semantics; no retroactive replacement of source revisions; source and consumer permissions; narrowly constrained data export; acyclic documented contract/Nuxt extension edges; thin host composition under ADR-0012.

## Cross-capability relationship register

| Neighbour | Training requires/consumes → supplies | Authority and integration/failure |
|---|---|---|
| [Course](../course/capability-record.md) | Frozen programme criteria → proven outcome and completion references | Essential for Course-based completion; Course never declares learning achievements |
| [Assessment](../assessment/capability-record.md) | Final assessment evidence/revisions → completion/competency evidence | Conditional; changed marks trigger Training re-evaluation, not grade mutation |
| [Enrolment](../enrolment/capability-record.md) | Authorised standing/cohort → progress and completion | Conditional; Enrolment retains admission decisions, never absorbs learning evidence |
| [Qualification](../qualification/capability-record.md) | Qualification reads authorised Training findings → separate awards | Consumer only; no Training dependency on awards |
| [Credentials](../credentials/capability-record.md) | Credentials reads suitable authoritative claim → independently issues/revokes | A permitted training achievement credential is not an accredited qualification |
| [Attendance](../attendance/capability-record.md) / [Events](../events/capability-record.md) | Presence and schedule version/evidence → verified *learning* relevance | Optional; FAC-D07 preserves TRAIN-01 and independent native learning evidence |
| [Time & Attendance](../time-attendance/capability-record.md) | Approved cross-referenced time facts where lawful ↔ distinct learning evidence | Work hours/payroll remain outside Training; PR #143 is concurrent and provisional |
| [Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md), [Audit](../audit/capability-record.md), [Logging](../../services/logging/services-record.md) | Safe pure error projections; attributable evidence receipt; bounded diagnostics | Separate error processing, Audit custody and technical sinks; no shared source authority |
| [Reporting](../reporting/capability-record.md) / Search | Training supplies permissioned versioned learning facts; receives optional derived run/status and reports | No secondary authoritative transcript or inferred completion |
| [Configuration](../configuration/capability-record.md), IAM, Profile, Privacy, Legal Compliance, Clock | Scope, identity/assurance/authorisation, privacy/legal constraints and time interpretation | Mandatory per protected action; each retains its own policy and identity source |
| Workflow, Scheduler, Notifications, Message Queue | Optional approval/orchestration/timing/notice/transport services ← task and domain change signals | Never own evidence or final completion; absent optional service degrades only its function |
| Integrations, Storage, Publisher, Media, Content Security, Verification | External trust/material/evidence services ← narrow permitted requests | Under source and data protection rules; external provider does not silently become authority |

**Composition:** these arrows are *information flows*, not unconditional compile-time imports. The host wires provider-neutral typed public ports and event subscriptions to avoid bidirectional package dependencies. Tenant service entitlements, capability enablement, resource access and data disclosure are separate decisions under ADR-0017/0018. No new generic policy/learning repository follows solely from these relationships.

## Provider handling, policies, security and compliance

Native manual verification and authorised completion work without any external LMS. Provider selection and data export/import require approved tenant binding, documented source authority, contract/version mapping, evidential trust, provenance, minimum permissions, consent/legal basis where applicable, expense/usage rules, provider outage and replay handling, withdrawal, source revocation, migration and reconciliation. Imported observations start provisional unless their verification is independently acceptable; contradictory evidence enters review rather than last-write-wins.

Training interprets its own domain rules; Course owns the programme criteria. Configuration registers approved bounded settings and their scope/precedence, not substantive course rules. Effective authorised instruments, evaluator competence, approver identity, policy version, applicable legal/Privacy constraints and permitted exceptions must be distinguishable from published policy documents (ADR-0018). Unknown mandatory compliance/authorisation context blocks unsafe finalisation; an administrator cannot weaken security or retroactively alter decisions through preferences.

Protect learner, child/vulnerable-person, disability/accommodation and sensitive evaluation information using purpose limitation, least disclosure, tenant separation and authorised history/rights workflows. Apply OWASP ASVS 5 L2 (L3 where warranted), WCAG 2.2 AA and locale/internationalisation requirements. Server Authorisation and assurance apply to reads, corrections, exports, bulk actions and events. Legal applicability, educational/employment regulation, safeguarding, UK GDPR, retention and holds require jurisdiction/effective-date review by Legal Compliance and Privacy; no blanket compliance claim. Disallow untrusted material until required content/security evaluation. Record consequential decisions with bounded Audit evidence; sanitise Logging/Observability, preserve separate receipt and health statuses; maintain a recoverable outbox rather than equating log success with evidence custody. No provider secret or private data may enter generic logs.

## Error handling, diagnostics, accountable evidence and reporting

These are **separate published conceptual boundaries**, not a shared record store or implemented APIs.

| Neighbour public surface | Training supplies (input to neighbour) | Training receives (output from neighbour) | Who decides what |
|---|---|---|---|
| [Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md) — pure functions | Source-owned typed error (invalid evidence, denied request, stale revision, duplicate/conflict, provider timeout), mapping version, known/uncertain operation outcome and permitted disclosure/correlation | Versioned safe code, category, message key, bounded public/diagnostic projections and **advisory** retry classification | Training determines commit status, authorisation, idempotency, retry and reconciliation. The library never logs, stores evidence, emits events or proves rollback |
| [Logging](../../services/logging/services-record.md) — diagnostic intake/health | Sanitised structured code, severity, operation, safe error category, duration and opaque correlation; **no** submissions, transcripts, grades, accommodations or secrets | Intake accepted/rejected/uncertain and sink health when supported | Logging owns technical diagnostic delivery; receipt cannot confirm Training success or Audit custody |
| [Audit](../audit/capability-record.md) — evidence intake/integrity/read | Risk-selected committed evidence verification, competency/completion decisions, corrections, disputes, privileged access/export and safe security attempts; actor, scope, reason, revision, time, source event ID | Evidence accepted/pending/rejected/uncertain receipt; permitted integrity and coverage references | Training owns learner findings. Audit owns accountable custody/completeness, not learning outcomes |
| [Reporting](../reporting/capability-record.md) — authorised source intake / reports | Purpose-scoped progress, verified versus provisional participation, achieved outcomes, completion, status history, corrections, denominators, revisions, as-of and completeness | Optional report/run/export status, derived aggregate and freshness/partial coverage; no source decision changes | Training owns source facts; Reporting owns report definitions, derived analysis and delivery |

**Failure separation:** a normalised error is not a business outcome; a Logging receipt is not Audit evidence; an Audit receipt is not proof that Training's result is correct; a report is not a Training decision. Routine Logging/Reporting outage must not invalidate committed training state. Where Audit evidence is mandatory, secure producer-owned outbox/reconciliation or hold the high-risk decision under the approved failure policy. Reporting cannot infer attendance from event bookings, missing learners as zero, or qualification from completion. All exchange is via public surfaces with tenant, purpose and disclosure controls; optional cooperation must not introduce cyclic package imports.

## Applicable standards and interoperability

Use recognised standards to guide the **conceptual design**, not as claims of conformity, certification or mandatory implementation dependencies.

| Guidance / standard | Training design consequence |
|---|---|
| ISO 21001 (educational organisation management); ISO 29993 (learning services); ISO 29992 (assessment of learning outcomes) | Learner-centred process, defined outcomes, qualified evaluation, quality assurance and corrections; organisational standards do not certify Training software |
| ISO/IEC 40180 (technology-supported learning quality); ISO/IEC 19788 family (learning resource metadata) | Quality and traceability of digital learning contexts; Course/Publisher remain resource and curriculum authorities |
| 1EdTech CASE | Stable versioned competency/learning-outcome references; useful for Course/standard exchange, not Training-owned curriculum |
| ISO/IEC/IEEE xAPI family, 1EdTech Caliper Analytics and LTI | Optional provider-neutral activity/evidence interchange and tool integration; external statements stay unverified until accepted under Training's evidence rules |
| 1EdTech Comprehensive Learner Record and Open Badges; W3C Verifiable Credentials | Portable claims through authorised export, Qualification and Credentials/Verification; Training never silently becomes an issuer of accredited awards |
| W3C WCAG 2.2 AA | Accessible optional evidence capture, review, tables, navigation and feedback |
| ISO/IEC 27001, ISO/IEC 27701; OWASP ASVS 5 L2 baseline | Secure, minimised and privacy-preserving evidence handling, privileged decision protection and accountable correction |
| UK GDPR / Data Protection Act 2018; Ofqual conditions, UK occupational and apprenticeship standards where applicable | Jurisdiction-, learner- and programme-specific duties, versioned knowledge/skills/behaviours and permitted evidence; Legal Compliance determines applicability, Qualification owns regulated awards |

**Adoption rule:** keep the native domain contract vendor-neutral. Prefer standard-mapped adapters/exports over making xAPI, LTI, external LMS or digital badges mandatory; preserve original source version, independent verification and field-level disclosure. Regulatory compliance needs qualified review for each programme and jurisdiction.

## Presentation and host integration (optional)

**Headless Training is complete without a GUI.** When presentation is enabled, the host provides a **Training** entry under its **Capabilities** sidebar, alongside Theme Manager, opening an authorised `/training` dashboard. A derived test host may also link from `/admin`. These are proposed host routes, **not shipped interfaces**.

**Verified reference:** [application-test-template README](../../../RESOURCES.md#application-test-template-2), [app shell](../../../RESOURCES.md#appappvue) and [test dashboard](../../../RESOURCES.md#apppagesadminvue) (inspected 23 November 2026). Its homepage has no sidebar; the internal area has a responsive collapsible sidebar, Theme Manager link, appearance selector and reserved sign-in status. Derived applications provide their own routes and fixtures. Its unauthenticated Theme Manager **test mode is local-only**, not evidence of secure production operation.

| Screen / suggested host route | Audience | Public Training contract consumed |
|---|---|---|
| Dashboard `/training` | Authorised learners, instructors, reviewers and administrators | Scoped progress, pending actions, completed/uncertain findings and as-of status |
| My learning and record `/training/my-learning` | Learner, assigned reviewer | Learning history, evidence verification, competency/completion status and source revisions |
| Evidence submission `/training/evidence/new` | Learner, instructor, supervisor | Submit evidence; show receipt/pending/rejection rather than assumed verification |
| Participation `/training/participation` | Instructor, supervisor | Record and verify educational participation, not general attendance or paid hours |
| Evidence/appeal review `/training/reviews` | Competent authorised reviewer | Review, reject, dispute and correct observations with reason, provenance and revision |
| Competencies and completion `/training/competencies` | Learner, evaluator, approver | Outcome evidence matrix and separately authorised competency/completion decision |
| Administration/reconciliation `/training/settings` | Scoped programme administrator | Provider status/mapping, approved policies, source conflicts, manual reconciliation |
| History, exports and reports `/training/history` | Permitted learner, reviewer, administrator | Authorised revision history/export; link to Reporting-owned reports |

**Minimum initial GUI:** dashboard; learner records and submission; instructor participation and evidence review; separate completion decision. Other views are optional progressive additions once their public contracts and access rules are available. Prefer **one** global sidebar link with dashboard cards and in-capability tabs/links, not many shell navigation items.

**Screen rules:** Host owns navigation, routes, tenant context, branding and composition; Training owns business rules and domain-facing presentation; `ui` and Theme Manager supply accessible semantic components/tokens. Server-side Authorisation protects every query, command and export even when a menu item is hidden; tenant parentage grants no implicit access. Learner, instructor and administrator views must respect separate purposes and resource scopes. Course, Assessment, Enrolment, Qualification, Credentials, Events and Attendance are linked via their own authorised public read contracts, never editable in Training.

Show **submitted, pending, verified, inconclusive, disputed, corrected, withdrawn, unknown, stale and source unavailable** distinctly. Long operations distinguish command accepted from completed. Do not silently interpret missing observation as absence. Provide loading, empty, error, conflict and reconciliation states, as-of time and source provenance; never disclose private evidence in URLs or diagnostics. Apply WCAG 2.2 AA, keyboard/focus access, screen-reader status, responsive layouts, non-colour-only meanings, localisation and Clock-aware times. The GUI acceptance criteria include authorised learner submission → pending receipt; reviewer verification → attributable new revision; denied direct URL for an unauthorised/parent-tenant user; provider outage → unknown, never false completion; accessible mobile/keyboard use; headless operation with no UI routes. Production host authentication/authorisation and CI acceptance remain unverified.

## Conceptual acceptance matrix (not executed tests)

| Input → condition | Expected output and responsible owner |
|---|---|
| Valid supervised activity, current Course rule, authorised evaluator | Provenance-rich verified participation; Training decides competence/completion only if evidence meets Course criteria |
| Attendance check-in or Events occurrence ended without assessed learning | Generic observation only; Training reports educational participation unknown/pending |
| Learner self-attests competency or provider supplies invalid signature | Provisional/rejected evidence, no achieved outcome or completion; Training |
| Required Assessment result is under appeal or later corrected | No final dependent completion until rule met; revised Training decision and downstream notice, Assessment retains mark |
| Prior learning under a versioned skill standard with authorised verifier | Training can achieve scoped competency without Course/Enrolment, never award qualification |
| Cross-tenant requester or parent tenant without scoped delegation | Denied read/export/decision; Authorisation and Training |
| Duplicate offline webhook and later contradictory provider revision | Idempotent observation with explicit dispute/reconciliation, no duplicate hours or silent success; Training |
| Course transferred to later revision | Original criteria retained, authorised mapping/gap review before new completion claim; Course and Training |
| Deterministic metadata correction versus disputed competence | Approved reproducible correction with audit lineage versus competent human adjudication; Training |
| Audit down / Logging up, then reverse; replay and restart | Training owner state remains distinct from Audit custody and Logging sink; required evidence captured/reconciled or decision held safely |
| Lawful learner export or historical correction under hold | Authorised minimised provenance; preserve applicable lawful retention/holds; Training, Privacy and Legal Compliance |
| Completion supplied to Qualification or Credentials | Evidence only; each consumer independently decides award or authorised credential |
| Training validation error, provider timeout or duplicate request | Training decides actual/unknown outcome; Error Normalisation supplies safe message/retry advice without inferring commit or repeating a consequential decision |
| Training facts used for a report, then source finding corrected | Reporting refreshes authorised versioned derived views with correction, provenance, freshness and incomplete-data warnings; Training remains authoritative |
| Request for professional licence, work timesheet or payroll | Unsupported; route to respective owner without pretending Training may act |

## Decision register, open reconciliation and handover

**Owner-approved 18 November 2026:** TRAIN-01 specialist verified learning participation/attendance (not paid work time); TRAIN-02 distinct version-bound competency and completion; TRAIN-03 provisional externally supplied evidence; TRAIN-04 native/headless optional providers and conditional Course/Enrolment/Assessment; TRAIN-05 downstream reassessment without automatic award/credential mutations; TRAIN-06 optional learner/instructor/admin GUI; TRAIN-07 independently verified competencies outside formal courses; TRAIN-08 objectively deterministic corrections only, consequential/judgement-based decisions reviewed by competent humans. **Related owner-approved:** COURSE-08–12 preserve separate Assessment marks, Enrolment standing, Course criteria, historical integrity and Qualification awards.

**Established governing obligations:** authoritative domain-owned contract and storage, least privilege and server permission, provider-neutral thin composition, acyclic dependencies, security/privacy/accessible UI and accepted ADR-0017/0018 tenant/policy authority. **Owner-approved review guidance:** standards-aware, vendor-neutral learning evidence and portable results; safe pure Error Normalisation; separate Logging, Audit and Reporting contracts; optional role-aware sidebar/dashboard screens via host public integration. **Not yet published:** exact names/shapes for commands, queries, events, provider bindings or GUI routes; these remain conceptual even where principles are owner-approved.

**Open reconciliation (not pre-approved):** whether and how generic Attendance source verification will be reused without weakening TRAIN-01 or duplicating a presence ledger; appropriate domain-specific training completion policy for external evidence disputes and legally consequential automated decisions; changes from concurrent Time & Attendance PR #143. These are contracts/decision gates, not reason to transfer authority silently.

**Implementation alignment deferred:** target repository/root `CONTRACT.md` (none verified), concrete schemas/permissions, course/standard registry binding, provider adapters, durable outbox, source evidence trust, minimum-host consumer acceptance, data migrations, risk/threat modelling and runtime/CI evidence. No local tests executed. **Documentation-level conceptual coverage is complete subject to explicitly open cross-capability reconciliation; this does not establish implementation readiness or authorise merge. Immediately before any merge, repeat current-master Git, CI and architectural review and obtain explicit merge approval.**


## FAC-D07 — approved Attendance reciprocity

[Attendance](../attendance/capability-record.md) owns generic activity participation, factual presence observations, corrections and scoped provenance. Training owns educational interpretation, verified learning participation, competencies and completion; may reference exact Attendance observation/revision/coverage/attestor or collect specialist instructor evidence independently. No duplicate generic roster, mandatory Attendance package or automatic learning achievement from check-in. Corrections trigger qualified review, not automatic award or credential mutation.
