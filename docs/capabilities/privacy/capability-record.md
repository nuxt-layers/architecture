# Privacy — Capability Record

**Identity:** `privacy` · **Classification:** Foundation · **Directory:** `docs/capabilities/privacy/` · **Conceptual status:** PRIV-01–08 and eight supplementary refinements owner-approved on 22 November 2026; not implemented · **Review:** draft PR #120 · **22 November 2026**.

**Opening evidence:** [governing architecture-rules `d7f7c2ee0512`](../../../RESOURCES.md#governing-architecture-rules-d7f7c2ee0512), [blueprint `361566988ac5`](../../../RESOURCES.md#blueprint-361566988ac5), normative [privacy baseline](../../standards/privacy-standard.md), [capability standard](../../standards/capability-standard.md) and accepted ADRs, notably ADR-0012, ADR-0017 and ADR-0018. The implementation repository `nuxt-layers/privacy` exists at `master` `e72e335f222e3c56229f6cafd78100fd1b3bdc4c`, but has only a minimal README and no root `CONTRACT.md` verified. **All interfaces below are idealised, not published runtime APIs.** Existing neighbouring conceptual decisions retain their individual approval statuses.

## Purpose and independent responsibility

Privacy makes purpose-limited collection, consent where actually required, permissible disclosure and transfer, retention, and individual data rights manageable across capabilities **without absorbing their personal records**. It owns the specialist privacy decision and coordination lifecycle, not an omnibus database of people, a generic access policy engine or a universal legal-compliance guarantee. It is a responsibility-owning Foundation capability: authoritative policy/choice/request state and accountable decisions make the stateless-library classification inappropriate. A native, headless service can operate without any optional provider or GUI, provided mandatory jurisdictional qualification and owner interfaces are available for the proposed action.

Privacy-by-design also remains a duty of **every** capability. The Privacy service is not permission to process by default, a substitute for data protection impact assessments or a banner that purports to establish compliance.

## Authority, state and exclusions

**Privacy owns:** (1) purpose and personal-data processing categories, policy/notice linkage and qualified applicable specialist processing constraints; (2) consent/withdrawal choices where legally appropriate, their subject, scope, purpose, provenance, notice version, validity and evidence; (3) specialist retention/disposal rule decisions and approved exceptions with effective/version history; (4) privacy rights cases and decisions, scope, verified representative authority, review/appeal and evidence of coordination; (5) a reference-based processing/recipient and owner coverage directory to locate responsible data custodians; (6) privacy processing assessments, disclosure/transfer constraints and unresolved risks; and (7) source-qualified receipts of actual owner enforcement, including partial, failed and unverified results. Minimise stored personal evidence; separate case identity/verification data from subject-facing results and audit material.

**Other authoritative owners remain distinct:** Identity owns opaque principals, groups and tenant membership; Profile owns person attributes and its own access/correction/erasure record actions; Authentication owns credentials/sessions; Authorisation owns permission decisions; Legal Compliance owns qualified legal source/applicability, obligations and hold instructions; Publisher/Content Editor own authored notice content/publication; Configuration owns authorised non-personal operational settings; original domains own transactions, content, processing facts and their storage registers; Audit owns independent evidence; Logging and Observability own diagnostic and service-operational telemetry. Privacy retains **specialist policy/consent/rights decisions** and attributed orchestration outcomes only. It does not rewrite law, grant access, issue identity credentials, own every third-party consent record, erase another capability's data directly or declare a regulator-approved outcome.

**Lawful basis is not synonymous with consent.** Consent collection, withdrawal and evidence apply where that basis or a storage/access rule requires it; other lawful grounds demand distinct qualified constraints. Legitimate-interest claims, children's data, special categories, profiling, transfers and exemptions require appropriately qualified jurisdiction- and activity-specific review; an unchecked setting is not a legal conclusion. Applicable mandatory legal instructions take priority over optional tenant choices; a legal hold does not create unlimited access or retention.

## Native services and information lifecycle

1. **Processing/purpose registry:** register controller/processor role, tenant or responsible entity, processing activity, category, purpose, lawful-basis determination reference, subject categories, source data owners, recipient classes, geographic and transfer restrictions, and effective versions. Registry is a *map of documented processing*, not a copy of underlying records. Missing coverage is explicit.
2. **Consent/choice service:** register the permitted scope, capture an informed affirmative action where required, validate notice and policy versions and subject/representative assurance, query effective decisions and withdraw prospectively. Record exact scope and provenance; revocation can initiate source-owner cessation and derivative cleanup but is not proof that every copy vanished. A new purpose, materially changed use or expired/invalid choice cannot silently inherit an old choice.
3. **Retention service:** resolve per-record-category purpose, triggering event, applicable jurisdiction, qualified obligations/holds, review interval and disposal restriction. No universal numeric retention default and no indefinite security-log exemption. Each source owner executes lifecycle changes and reports partial/complete status; deletion from primary data is distinct from backups, search, caches and providers.
4. **Data-subject rights coordination:** accept access, portability, correction, restriction, objection, erasure and relevant automated-decision requests; verify subject/representative standing, classify lawful exemptions and applicable deadlines; discover custodians; dispatch scoped requests; aggregate independently attributable owner responses; redact third-party material; provide authorised completion and appeal/review outcome. Account closure and rights fulfilment are related but different workflows. A submitted request is not an immediately fulfilled right.
5. **Disclosure and transfer assessment:** expose purpose, recipient, subject, jurisdiction, data classification, minimum attributes and transfer constraints before source-domain disclosure/export/remote processing. Source owner and Authorisation each still enforce their own restrictions.
6. **Assurance and reconciliation:** detect missing owner coverage, outdated decisions, invalidated receipts, overdue tasks, provider-unknown custody and unresolved partial erasure; retain minimum proof necessary for challenge and remediation. No false `compliant=true` aggregate.

**Lifecycle:** draft processing definition → qualified/reviewed → effective → revised/suspended → retired with preserved necessary decision history. Consent: not-required / required-but-absent / valid / invalid / withdrawn / expired / disputed; unknown is never positive consent. Rights case: received → identity/authority qualification → scoped assessment → owner actions pending → fully resolved, partly resolved, legally restricted or failed → closed only with accurate attributable outcome; reopening and appeal preserve history. Retention hold: qualified instruction active/review due/released, with source-owner applied status separately recorded.

For lawful non-consent processing, absence of a consent artefact is not itself a deny; missing **required** purpose/lawful basis or unresolved mandatory restriction blocks the affected unsafe processing. A generic privacy approval cannot override server-side denial.

## Owner-approved conceptual public inbound contract

**Published implementation status:** The current `nuxt-layers/privacy/master` does not expose a verified root `CONTRACT.md`; these are approved business-level inputs awaiting publication as concrete interfaces. Privacy accepts processing/purpose declarations, consent and withdrawal, qualified legal constraints, trusted subject/caller authority, rights requests, retention/disclosure assessments, notice/provider evidence and owner action receipts. It does not accept a data-owner's private persistence model as its contract.

All inbound exchanges are server-side, validated and tenant/resource scoped. The contract describes semantic ports, **not** a universal request DTO.

| Input surface and source | Supplied facts, command or evidence; use | Authority and requirement | Unknown/invalid semantics |
|---|---|---|---|
| Processing declaration — source capability/controller | Purpose, personal-data categories, processing operation, subjects, owners, recipients, storage-register reference and lawful-basis assessment request | Source owns actual processing facts; declaration required for covered operations | Missing/unverified processing cannot be labelled approved; refuse affected restricted processing |
| Legal qualification — Legal Compliance/competent reviewer | Applicability by jurisdiction/activity/date, binding constraints, rights exceptions, deadline, transfers and hold instruction with source/version | Legal Compliance authoritative for legal qualification; conditional mandatory for applicable legal decisions | Expired, disputed or absent mandatory qualification → pending review/fail closed for unsafe act |
| Subject and delegation — Identity, Authentication, Profile, Verification/authorised representative source | Stable opaque subject identifier, verified authority, assurance/recency, guest correlation and minimally necessary contact channel | Each named source owns its facts; required when processing a subject-specific request | Cross-tenant or unproved representative → do not disclose whether protected records exist |
| Access decision — Authorisation via host/IAM Integration | Action/resource-scoped allow/deny/step-up, caller and decision provenance | Authorisation owns access; required for protected reads/writes | Deny, unknown or unavailable → no privileged disclosure or mutation |
| Policy inputs — tenant controller, Configuration, Privacy officer | Reviewed purposes, optional choices, durations and regional processing constraints within mandatory floors | Controller owns declarations; Privacy validates specialist constraints; optional preferences cannot waive law | Conflicts return qualified review issue; no permissive fallback |
| Choice evidence — subject/authorised actor or trusted consent adapter | Purpose-specific affirmative action, notice version, channel, timestamp, assurance and withdrawal request | Privacy validates and owns consent decision; needed only where consent is required | Ambiguous/unticked/stale/out-of-scope cannot establish positive consent |
| Custodian status — Profile, domain records, Caching, Search, Storage and external processors through owner ports | Identified data categories, derived copies, hold/restriction application, deletion/export/correction progress and failure evidence | Each custodian owns the factual outcome; required for a claimed completion | Missing/ambiguous response = unverified/partial, never erased |
| Notice evidence — Publisher/Content Editor | Version and effective publication of privacy/cookie notice, purpose disclosures and accessible languages | Content owner owns publication, Privacy owns choice-to-notice binding; conditional | Published notice alone is not consent |
| Time and workflow evidence — Clock, Workflow, Scheduler, Notifications, Audit | Qualified effective instants, deadlines, coordinated task/delivery status, independent evidence references | Providers retain execution/evidence authority; optional mechanisms unless required for service-level reliability | Late/failed delivery does not silently advance rights-case status |

Every source declares tenant/controller scope, revision, provenance, purpose, effective/recorded times, responsible owner and any known incompleteness. A received event is **not** a verified request or permission. Commands affecting another owner are forwarded only via its documented public port; no private storage inspection.

## Owner-approved conceptual public outbound contract

Privacy supplies qualified processing/consent decisions, retention/disclosure and transfer restrictions, rights-case progress and results, processing-owner coverage, scoped enforcement requests, committed privacy events and minimised assurance views. **Its decision is not a permission grant or proof of another owner's completed deletion; recipients must separately enforce their own duties.** The following surfaces are approved in concept, not verified public runtime exports.

| Output surface and authorised consumer | Semantics and guarantee | Limit and lifecycle |
|---|---|---|
| Effective privacy decision — host, processing owner, Integrations | Qualified allowed/restricted/consent-required/unknown assessment for an exact purpose, activity, subject, recipient and effective time; rule and evidence versions | Privacy guarantees its specialist decision only; never an Authorisation grant or legal certainty outside qualified coverage |
| Consent status and receipt — subject and authorised source controller | Purpose-scoped valid/absent/withdrawn/expired decision, provenance and notice revision | Only necessary details; withdrawal receipt ≠ every processing copy deleted |
| Retention/disposal instruction — data owner, backup/cache/search custodian | Record-category rule, trigger, earliest/latest allowed action where qualified, hold/review condition, effective revision | Source owner actually retains/deletes and supplies result; hold must be independently qualified |
| Rights case and authorised result — subject/representative/controller | Case reference, subject scope, checked standing, deadline, per-owner result, redactions, restrictions, partial completion and recourse | Export aggregates only authorised releasable data; no cross-tenant search or accidental third-party disclosure |
| Processing and recipient coverage — controller/officer/Audit/Reporting | Versioned registry of declared purposes, owner references, coverage gaps and risk assessment status | Declaration is not proof every data store/processor was discovered or lawful |
| Enforcement/reconciliation request — cooperating owner, Workflow | Narrow scope, owner data-category, requested disposition, idempotency reference, obligation/version and deadline | No direct alteration of remote records; execution owner must acknowledge and report outcome |
| Committed privacy events — Message Queue subscribers via durable outbox | Choice recorded/withdrawn, rule activated/revised, rights case advanced, request issued, owner receipt accepted, critical coverage invalidated | Minimise identifiers and payload; at-least-once-compatible replay/ordering by aggregate, no exactly-once promise |
| Qualified operational/assessment view — officers, Audit, Logging, Observability, Reporting | Backlogs, deadline risks, policy provenance, holds, failure status and minimised audit references | Least privilege; no raw personal export to logs/metrics; never blanket `compliant=true` |

All outputs identify their authoritative owner, scope, version, effective date, decision time, evidence/reference, and if relevant supersession, freshness, partiality and appeal status. A previous favourable decision cannot authorise a new purpose, changed recipient, withdrawn consent or newly active restriction. A safe denial need not reveal the existence of a protected person or case.

## Commands, queries, events and invariants

**Commands:** propose/review/publish/retire processing purpose; record/withdraw choice; request/review/dispatch/close rights case; qualify/update specialist retention rule; request a scoped custodian disposition; reconcile owner receipts. Each command validates caller, tenant/controller, permission, source revision, lawful purpose, policy freshness and idempotency; duplicate keys with conflicting intent are rejected. Sensitive access, export, disclosure, hold exceptions and rule changes require appropriate assurance, separation of duties where justified and explicit reason. Acceptance, dispatch and completion are distinct outcomes.

**Queries:** resolve the effective purpose/consent/disclosure/retention decision; list authorised processing coverage, cases, unresolved custodians and historical versions; query one's own case/status through verified subject/representative authority. Support bounded, redacted and paginated read models; as-of results identify known-at versus effective-at time, omitted coverage and staleness.

**Events:** emitted from Privacy-owned committed state via its durable outbox, transported by Message Queue without transfer of authority. Consumers validate event versions, ownership and target, deduplicate/replay safely and obtain up-to-date decisions when necessary. No event alone grants access, removes a hold or proves downstream deletion. Distribution can be delayed or repeated.

**Invariants:** tenant/controller isolation; purpose-specific consent rather than global opt-in; no consent for processing under an unrelated lawful basis; secure server-side action gating; minimal identifiers; qualified jurisdiction and controller/processor responsibility; no secret/private key in events; applicable access and privacy conditions both pass; retention applies to copies, backups, telemetry, imports and third parties; unknown legal qualification is not silently permissive; provider success is not complete erasure; historic receipts are attributable without unnecessary raw subject data; no indefinitely held record merely because it might be useful; withdrawal changes future eligible processing, not lawful records automatically; avoid dependency cycles by injecting small public ports at the host.

## Cross-capability contracts and reciprocal boundaries

All exchanges use authorised **public contracts**, host-supplied narrow ports or owner-committed events. No direct private-table access, automatic package dependency or cyclic import is implied. Absence or failure of a required source is explicit.

| Counterpart | Privacy needs (input) | Privacy provides (output); owner remains authoritative |
|---|---|---|
| **Legal Compliance** | Qualified jurisdiction, lawful-basis interpretation, deadlines, rights exceptions, disclosure/transfer conditions and holds | Processing context, specialist consent/rights/retention decisions and source receipt references; **Legal Compliance owns legal interpretation** |
| **Identity, Authentication, Authorisation, Verification, IAM Integration** | Scoped subject/tenant membership, trusted session and representative assurance, resource-specific access decisions | Privacy restrictions and scoped case/action requests; **Authorisation grants or denies access**, not Privacy |
| **Profile** | Subject data references and Profile-owned access, correction, export, restriction and disposal results | Purpose/consent/retention decisions and coordinated rights actions; **Profile owns personal attributes** |
| **Configuration; Publisher, Content Editor, Localisation; Theme Manager** | Reviewed organisational declarations; published effective notices, versions and language; semantic styling | Validated privacy constraints and consent-to-notice binding; **Configuration owns settings, Publisher owns publication, Localisation text, Theme Manager styling** |
| **Business data owners** — Booking, Attendance, Recruitment, Employment, Course, Assessment, Training, Qualification, Credentials, Membership, Order, Comments, Gaming, Moderation and others | Processing purpose, subjects/data classes, authoritative activity/record references, source storage register and actual rights/retention results | Purpose, minimisation, child/sensitive data, sharing, retention and subject-right instructions; **original owners decide and execute their record actions** |
| **Shopping Basket** (SB-01–08 owner-approved concept, 23 November 2026) | Holder and guest proof classification, purposes, server/cookie storage register, policy version, actual inactivity/expiry/export/erasure and hold receipts; shopping interests are potentially sensitive in context | Qualified purpose, rights, disclosure and retention instructions including legal-hold exceptions; approved **configurable 30-day guest / 90-day authenticated inactivity defaults** apply only if permissible under effective law and policy. Basket owns basket changes, cookie revocation and its own deletion evidence; no Privacy ownership of purchase intent or automatic blanket consent exemption. Runtime integration unverified. |
| **Caching, Search, Storage, Persistence, backups/recovery** | Derived-copy inventory, deletion, expiry, restore, hold and verification receipts | Scoped purge/preservation/residency conditions; **each custodian attests only to its own copy** |
| **Integrations, Federation and external processors** | Recipient, processor and subprocessor scope, location/transfer terms, imported choice/withdrawal/disposal evidence | Permitted processing, sharing and transfer constraints; **provider acknowledgements do not prove whole-system compliance** |
| **Content Security and Moderation** | Risk/evidence classification, qualified investigation/custody status and dispositions | Bounded disclosure, retention and relevant rights restrictions; **safety owners retain their cases** |
| **Workflow, Scheduler, Clock, Message Queue, Notifications** | Effective time, task and delivery outcomes, transport status | Deadlines, narrowly scoped tasks and owner-committed facts; **none decides lawful basis or owns Privacy state** |
| **Error Normalisation** — [stateless contract](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) | Privacy supplies its own code/observed outcome, explicit mapping, trusted context and disclosure policy to a local pure function | Safe, versioned code, public/technical error projection, message reference and advisory retry; **no side effects or background delivery** |
| **Logging** | Privacy supplies minimised failure/timeout diagnostics and purpose-specific handling constraints | Logging-owned intake status, diagnostic references and sink/drop/retention health; **not proof of decision or Audit custody** |
| **Audit** | Privacy submits risk-selected consent, withdrawal, rule-change, privileged access/export, case decision and custodian-result assertions, each with source ID/provenance and minimal evidence | Independent evidence receipt, verification/integrity, authorised records and qualified evidence-disposal result; **Audit holds evidence, not Privacy decisions** |
| **Reporting** | Privacy exposes authorised, versioned coverage, consent/rights outcomes, deadlines, partiality, revisions and safe denominators | Report definitions, execution/output references, derived aggregates, freshness/completeness and protected export; **Reporting neither grants rights nor certifies compliance** |
| **Observability** | Privacy exposes limited metrics, trace context and service failures | Technical health and degraded-service signals; **not Audit evidence or rights fulfilment** |

**Error/diagnostic/evidence/reporting flow:** Privacy decides the actual consent or case outcome. It may use Error Normalisation locally to produce safe user and technical errors; separately send bounded technical diagnostics to Logging, accountable source assertions to Audit where capture policy requires, and authorised source summaries to Reporting. Each recipient gives an independent receipt or read model. Ordinary Logging/Reporting downtime must not reverse a valid privacy decision. Mandatory Audit capture failure follows a defined secure persistence/recovery or refusal policy. No report, log or accepted Audit assertion proves another custodian erased data.

**Profile PRO-01–05 reconciliation:** Profile is authoritative for person attributes, verification and its own rights/erasure part. IAM Integration may route and correlate an identity-wide rights or account-closure journey, but it does not decide lawful privacy eligibility or replace Privacy's specialist rights case and instructions; Privacy cannot mutate Profile or silently link accounts across installations. Duplicate/orphan claims remain Identity/IAM-controlled with anti-enumeration, evidence minimisation, dispute and lawful transfer checks. Source holds, backups and disposal remain source-owned. See [Profile's approved record](../profile/capability-record.md).

**Adjacent approval status:** Existing owner-approved contracts for Booking/Attendance accountless subjects, Caching, Comments Engine, Credentials, Export (headless stateless rich-text renderer), Legal Compliance, Logging, Notifications and Moderation remain authoritative within their scope. Recruitment and concurrent Organisation Model, Order, Payment Gateway, Policy Map, Persistence and Observability proposals are not automatically approved by this Privacy review. Reconcile conflicting future contracts openly.

**Dependency policy:** Trustworthy Authorisation and applicable legal qualification are required for protected decisions, but host ports avoid mutual package dependencies. The optional GUI, provider, scheduler, workflow and notification interfaces may be absent only where Privacy can still meet its obligations. Otherwise mark that specific operation unavailable; never claim successful service.

## Configuration, security, standards and implementation choices

**Configuration and legal scope.** A controller declares purposes, responsible legal entity/controller or processor role, reviewed optional settings, jurisdictions, response responsibilities and qualified retention proposals. Privacy records effective, versioned rules; Legal Compliance resolves applicable obligations and exceptions. No tenant can override a mandatory legal floor or access denial. Do not embed universal retention periods, rights deadlines, children's age thresholds or transfer mechanisms.

**Security and privacy controls.** Apply the platform's OWASP ASVS 5 Level 2 baseline (Level 3 where justified) and WCAG 2.2 AA. Threats include forged consent, dark patterns, subject enumeration, representative impersonation, cross-tenant exports, staff misuse, false deletion receipts, stale notices/law, excessive diagnostics/analytics and backup resurrection. Use verified authority, server-side access decisions, least privilege, rate limits, minimised evidence, encryption, versioned provenance, step-up and risk-based independent or two-person review. Redact unauthorised case and legal-hold existence; audit protected access. The Privacy Centre must make rejection and withdrawal as easy as acceptance.

**External providers.** Native Privacy remains authoritative and usable without a hosted consent or case-management supplier. Optional providers connect through Integrations: validate controller role, terms, lawful transfer, location, accessibility, subprocessors, export/erasure and revocation support before use. Import/migration requires evidence reconciliation. A provider outage cannot prevent recording a local withdrawal; downstream cessation remains pending until source confirmation. One Privacy decision source of truth must survive migration.

### Established standards and specialist guidance

These guide the **conceptual** design; they do not demonstrate legal compliance or certification. Legal Compliance must qualify applicability and effective law per controller, place, activity and date.

| Source | Use in the Privacy contract |
|---|---|
| [UK GDPR and ICO guidance](../../../RESOURCES.md#uk-gdpr-and-ico-guidance) and **Data Protection Act 2018** | Lawful basis, transparency, minimisation, accountability, rights, controller responsibility and processing records |
| [Data (Use and Access) Act 2025](../../../RESOURCES.md#data-use-and-access-act-2025) | UK amendments, effective-date policy revision and rights/electronic-communications qualification |
| [PECR and ICO storage/access guidance](../../../RESOURCES.md#pecr-and-ico-storageaccess-guidance) | Cookie/storage classification and qualified consent/exemptions before optional tracking |
| [EU GDPR](../../../RESOURCES.md#eu-gdpr) and EDPB guidance | EU controller/processor roles, rights, DPIA, processors and transfers, **when applicable** |
| [ISO/IEC 27701:2025](../../../RESOURCES.md#isoiec-277012025) | Primary privacy-management/accountability reference |
| [ISO/IEC 29100:2024](../../../RESOURCES.md#isoiec-291002024) | Common privacy terminology and principles |
| [ISO/IEC TS 27560:2023](../../../RESOURCES.md#isoiec-ts-275602023) | Consent scope, proof, provenance, version and withdrawal record |
| [ISO/IEC 29134:2023](../../../RESOURCES.md#isoiec-291342023) | PIA/DPIA triggers, scope, review and risk evidence |
| [ISO/IEC 27001:2022](../../../RESOURCES.md#isoiec-270012022), [NIST SP 800-53 Rev. 5](../../../RESOURCES.md#nist-sp-800-53-rev-5) | Security, privacy controls, evidence and review |
| [ISO 31700-1:2023](../../../RESOURCES.md#iso-31700-12023), [NIST Privacy Framework](../../../RESOURCES.md#nist-privacy-framework) | Privacy by design, risk governance and controls |
| [W3C WCAG 2.2](../../../RESOURCES.md#w3c-wcag-22) | Mandatory project accessibility baseline, AA |
| [W3C DPV Community Group](../../../RESOURCES.md#w3c-dpv-community-group) | Optional shared vocabulary for processing/purposes; **not a W3C Recommendation** |
| [W3C ODRL 2.2](../../../RESOURCES.md#odrl), [IETF RFC 6265](../../../RESOURCES.md#ietf-rfc-6265) | Optional machine-readable obligations and browser-cookie semantics; neither replaces privacy law |

### Commercially permissive, complete-source development candidates

**Candidate evaluation, not installed dependencies.** Recheck tagged complete source, licence, dependency tree, active maintenance, advisories, build provenance and WCAG behaviour before selecting. Reuse existing platform libraries and interfaces rather than adding a privacy management suite or proprietary edition.

| Candidate (source) | Licence | Recommended place |
|---|---|---|
| [orestbida/cookieconsent](../../../RESOURCES.md#orestbidacookieconsent) | MIT | Preferred optional **browser consent UI**, never authoritative consent storage |
| [tarteaucitron.js](../../../RESOURCES.md#tarteaucitronjs) | MIT | Alternative consent UI with more service integrations |
| [Klaro](../../../RESOURCES.md#klaro) | BSD-3-Clause | Reserve UI candidate; recheck maintenance/security before use |
| [Zod](../../../RESOURCES.md#zod) / [Ajv](../../../RESOURCES.md#ajv) | MIT / MIT | Choose **one** runtime public-input validator; Ajv where JSON Schema is authoritative |
| [Kysely](../../../RESOURCES.md#kysely) / [Drizzle ORM](../../../RESOURCES.md#drizzle-orm) | MIT / Apache-2.0 | Choose existing approved PostgreSQL persistence convention; no database types in public contract |
| [Temporal TypeScript SDK](../../../RESOURCES.md#temporal-typescript-sdk) and [server](../../../RESOURCES.md#temporal-server) | MIT | Reuse existing Workflow/Temporal gateway for durable coordination; no second privacy engine |
| [OpenTelemetry JS](../../../RESOURCES.md#opentelemetry-js) | Apache-2.0 | Reuse Observability with personal-data-safe trace/metric attributes |
| [jose](../../../RESOURCES.md#jose) | MIT | Optional verification of imported signed evidence; do not replace Authentication |
| [json-rules-engine](../../../RESOURCES.md#json-rules-engine) | ISC | Only if approved privacy-specific rule evaluation requires it; not a universal legal/authorisation engine |
| [pg-boss](../../../RESOURCES.md#pg-boss) | MIT | Reserve job runner if platform scheduler/workflow unavailable; **not needed with current Temporal direction** |

Prefer CookieConsent, a single validator and the platform's established persistence, Temporal, IAM, Audit, Logging and Observability contracts. No all-in-one complete-source privacy framework is established here as meeting every required specialist public interface. No mandatory Redis, Elasticsearch, Neo4j, commercial SaaS, new generic policy engine or parallel orchestrator.

## Presentation, navigation and headless operation

**Approved conceptual UI; not implemented.** The Privacy service works headlessly. An optional, accessible presentation consumes its published public ports, never private tables. The host owns navigation, authentication composition and route registration; Theme Manager owns visual tokens.

**Verified reference:** [`nuxt-layers-test/application-test-template`](../../../RESOURCES.md#application-test-template) `master` exposes a separate home `/`, test dashboard `/admin`, responsive collapsible **Capabilities** sidebar in `app/app.vue`, and Theme Manager link `/theme-manager`. Its `/admin` page displays a Theme Manager card; derived test applications supply their own pages, menus and fixtures. **The template's `Not signed in` placeholder and Theme Manager test-mode APIs provide no production user security.**

| Proposed derived-host route | Screen and relevant public contract | Audience and safety |
|---|---|---|
| **`/privacy`** | Privacy Dashboard: scoped coverage, consent/rights counts, deadline risks, partial/failed custodian results | Authorised officers; entry **Capabilities → Privacy** and optional `/admin` card; no subject enumeration |
| `/privacy/processing` | Processing Register: entities, roles, purposes, owners, recipients, storage inventory and gaps | Officer edits require scope, reviewed qualifications and source revisions |
| `/privacy/consent` | Consent and Notices: purpose choices, notice versions, withdrawal reconciliation | Publisher owns notices; Privacy owns consent binding; no implied opt-in |
| `/privacy/requests` and `/privacy/requests/:caseId` | Rights worklist and case detail: proof, deadlines, custodian tasks, redaction, review, authorised results | Case handlers; case IDs unguessable, unrelated existence concealed, step-up for exports |
| `/privacy/retention` | Retention and Disposal: qualified rules, legal holds and backup/provider reconciliation | Officers; partial, failed and unknown remain visible, custodian owns execution |
| `/privacy/transfers` | Transfers and Assessments: recipients, jurisdictions, DPIAs, disclosure conditions, exceptions | Privileged reviewers; independent/dual sign-off when justified |
| `/privacy/centre` or `/account/privacy` | Personal Privacy Centre: notice/consent choices, access, correction, portability, objection, restriction, erasure and case status | Subject or verified representative; **separate from administrative sidebar**, accessible to verified guests without compulsory account |
| Contextual consent control | Cookie/storage purpose preferences and later withdrawal | Appears before optional tracking and remains revisit-able; no independent authority in the browser widget |

Use the host's semantic Theme Manager tokens, existing mobile navigation, WCAG 2.2 AA, keyboard/screen reader support, visible focus, accessible errors, reduced motion, localisation and Clock date/time. Explain accepted, queued, partial, failed, held and verified completion accurately. Server-side Authorisation checks protect **each** query, command and download; hiding a menu is not protection. Link to independent Audit/Reporting views where authorised, do not duplicate their evidence or report stores.

**Acceptance approach:** A future derived `nuxt-layers-test/privacy-test` application can compose Privacy using the root `CONTRACT.md`, add a Privacy sidebar link and dashboard card, and demonstrate synthetic consent, guest proof, rights cases, partial deletion, provider outage, cross-tenant refusal and accessible mobile/theme flows. Use a secured IAM test composition or synthetic no-personal-data fixtures; do **not** alter or publicly deploy the shared test template as-is. Verify deep links, server-side denial despite hidden menus, headless operation and governance composition budget. No screens or tests were built during this review.

## Conceptual contract acceptance examples (not executable tests)

| Input / situation | Expected behaviour and output | Authority |
|---|---|---|
| New optional analytics purpose with no prior choice | Deny consent-dependent activation; request clear purpose-specific affirmative consent and publish pending status | Privacy decision; source owner enforces |
| Strictly necessary storage declared with qualified exemption | Permit only within necessity and transparency conditions without pretending optional tracking is necessary | Qualified Legal Compliance + Privacy; source storage owner |
| Consent withdrawal after a valid earlier choice | Record durable effective withdrawal and notify impacted owners; return pending/partial receipts until cessation confirmed | Privacy choice; original owners implement |
| Authenticated person requests complete portable data | Verify scope/standing, enumerate owners, redact another person's data, aggregate authorised owner results and clearly mark incomplete replies | Privacy coordination; Profile/domain owners supply data |
| Guest asks to delete Booking/Attendance details | Verify purpose-limited guest claim; source returns deletion or justified restricted retention without a new permanent Profile | Booking/Attendance, Privacy and Legal Compliance |
| Legal hold covers only specified evidence | Preserve only narrowly covered subset; continue unrelated disposal; report actual hold enforcement | Legal Compliance instruction; source owners |
| Stale provider deletion receipt, restored cache or backup | Mark outcome unverified, retry/queue reconciliation, prevent false complete-erasure declaration | Data owner/custodian; Privacy reconciliation |
| Tenant B guesses tenant A's case reference | Deny without existence disclosure, record minimised evidence | IAM/Authorisation and Privacy |
| Identical rights command retried / conflicting replay | Return same accepted case for identical idempotency intent; reject conflicting intent; event replay does not double-dispatch | Privacy |
| Processor offline while consent is withdrawn | Local withdrawal becomes effective; covered onward processing suspended or restricted; provider cessation remains pending | Privacy; source/provider owners |
| Mandatory legal qualification missing for new international transfer | Hold affected transfer, expose qualified review action rather than global compliance assertion | Legal Compliance qualification; Privacy/source decision |
| Independent headless host / disabled Privacy UI | Same service-side consent, rights and retention enforcement; host can supply alternative accessible entry points | Privacy and host |
| Attempt to erase immutable independent audit evidence | Apply a qualified, proportionate restriction/redaction/disposal policy through Audit; never mutate Audit's evidence privately | Audit, Privacy and Legal Compliance |

## Approved decisions, assurance and completion status

**Governing requirements:** Privacy-by-design, storage-register discovery, appropriate consent, subject rights, isolated ownership, public one-way composition, source-owned outboxes, server-side security, accessibility and accurate evidence take priority. This blueprint does not change accepted ADRs or the governing Capability Standard.

**Owner-approved on 22 November 2026:**
- **PRIV-01:** Foundation capability owns specialist purpose/choice/rights-case decisions and reference-based coordination, not source personal data or law.
- **PRIV-02:** Consent and withdrawal are purpose- and notice-version-specific only when required; no universal or implied opt-in.
- **PRIV-03:** Source owners and derived custodians perform retention, correction, export, restriction and erasure, each reporting evidence; Privacy does not promise global deletion.
- **PRIV-04:** Privacy coordinates verified subject/representative rights, third-party protections, exceptions, holds, appeals and truthful outcomes.
- **PRIV-05:** Sharing, transfers, children, sensitive data and retention require activity/jurisdiction-qualified constraints and safe failure when mandatory checks are unknown.
- **PRIV-06:** Native provider-neutral headless service; optional accessible subject/administrator UI and replaceable provider adapters.
- **PRIV-07:** The inbound/outbound commands, queries, events, provenance, replay and reciprocal interfaces above are agreed **conceptual targets**, not implemented APIs.
- **PRIV-08:** Source-owner storage registers and coverage gaps are explicit, including processor, backup and derived copies; partial/unknown is never marked compliant.

**Eight approved refinements, integrated throughout this record:**
1. **Organisation responsibility:** declare each controller/processor/joint-controller entity, purpose, recipient and responsible contact. Shared tenancy never implies data access.
2. **Guest and representative proof:** proportionate expiring proof of a relevant channel/transaction; scoped independently verified delegated authority; no forced permanent Profile.
3. **Policy timing:** versioned jurisdiction/activity/record-category retention and rights deadlines, qualified by Legal Compliance; no invented global period.
4. **Evidence custody:** Privacy keeps only necessary choice/case decisions, instructions and owner receipt references; Audit and source custodians retain their own protected evidence under separately justified retention.
5. **Approvals:** automate low-risk validated requests; independently review sensitive, disputed and exceptional cases; dual approval only when risk demands.
6. **Notices/localisation:** Publisher owns effective notice versions; Privacy binds choices to notice/purpose; clear equally usable accept, reject, withdraw, reviewed materially changed translations.
7. **Provider continuity:** one Privacy decision authority and reconciled import/export; local withdrawal effective during processor outage while downstream action remains pending.
8. **Public source coverage:** each owner exposes scoped rights/retention/disclosure ports and storage inventory; Privacy coordinates copies by reference, with real receipts and no package cycles.

**Conceptual completeness:** The decisions above resolve the architectural alternatives and document purpose, native state, public input/output contract, contracts with neighbours, risk controls, lawful-provider boundaries, standards, candidate libraries, optional GUI and representative acceptance cases. Future implementation details do **not** reopen these approved ownership decisions. The **owner-approved conceptual design is complete in scope** as of this review, subject to final cross-PR and technical checks before merge; it is **not** ready for implementation acceptance or deployment.

**Still unverified or deferred:** The `nuxt-layers/privacy` implementation repository had no verified root `CONTRACT.md` and only a minimal README at last check. Future work must publish actual package interfaces and `STORAGE-REGISTER.md`, select/pin/recheck dependencies, create source-owner adapters and durable outbox, implement secure idempotency/recovery, qualify real jurisdictions/processor terms, test permissions and adverse cases, deliver accessible presentation if selected, and obtain independent security, UI and CI acceptance. No claim of certification, lawful operation in a particular jurisdiction, implemented functionality, successful tests or completed deletion follows from this specification.

**Pre-merge gate:** Recheck current `architecture-rules/master` and blueprint `master`, newly merged/open PRs, reciprocal owner boundaries and valid links, branch conflict status, required checks/CI and protected-branch policy. Only a separate **explicit owner approval** authorises merge; prefer the protected squash-only workflow. The review remains open until those checks and approval are satisfied.

## Publisher canonical review — reciprocal conceptual interface (22 November 2026; draft PR #125)

**Status: Publisher-side conceptual direction owner-approved 22 November 2026; implementation interoperation remains unverified.** [Publisher canonical conceptual contract](../publisher/capability-record.md).

Under approved Publisher PUB-01 and PUB-04, Privacy supplies qualified purpose-specific consent, erasure/retention constraints, effective policy provenance and rights-case instructions. Publisher independently enforces its document visibility, retention and deletion operations; a legal hold on deletion does not force public exposure. Unsafe or unknown checks fail closed, and Publisher returns actual completed/refused/pending/unknown receipts. Audit evidence custody is separate and minimised; a published notice never asserts enforcement or compliance.


## Search review — reciprocal conceptual interface (23 November 2026; draft PR #132)

**Status: Proposed Search-side specification, not an implemented or independently approved adapter.** [Search conceptual contract](../../services/search/services-record.md) defines a replaceable, tenant- and scope-filtered derived index. The originating capability retains authoritative resource and disclosure decisions; Search accepts only minimised revisioned projections, permission/withdrawal evidence and scoped reconciliation, and returns candidate references, qualified freshness/coverage and index-application receipts rather than source finality. All sensitive snippets, suggestions, counts, facets, vector results and caches require visibility-safe query-time filtering; source action/detail requests must be reauthorised. Interfaces are host-composed and directional, with no circular package import. Existing approved decisions remain unchanged; differences must be reconciled before PR #132 merges.

## Reporting reciprocal conceptual interface — 23 November 2026

**Status:** Proposed in Reporting draft PR #129; not an implemented public API or approval of Reporting's full independent review. See [Reporting canonical conceptual contract](../reporting/capability-record.md).

Reporting needs purpose-specific minimisation, consent where applicable, lawful disclosure, retention, erasure, legal hold and re-identification constraints at source query, aggregation, snapshot, export and recipient-delivery time; Privacy owns the applicable specialist decisions and rights constraints, Reporting implements them and records actual outcomes. Report suppression and access rechecks persist after creation and before re-use; aggregation is not automatically anonymisation. Revoked or erased source data requires qualified invalidation/rebuild, permitted deletion/hold outcomes and honest limits on previously downloaded files. Reporting cannot issue privacy compliance certificates.

## Reciprocal conceptual interface — Reviews (23 November 2026)

**Status: Reviews REV-D01–REV-D08 owner-approved conceptually on 23 November 2026 in draft PR #130; not a published implementation contract or governing adoption.** [Reviews](../reviews/capability-record.md) processes reviewer attribution, submitted review text, source purchase/service verification evidence references, replies and reputation summaries only under applicable purpose/disclosure/retention rules. Privacy supplies qualified consent/purpose, rights-case, retention/erasure and minimisation constraints, not permission to publish or source transaction truth. Reviews returns scoped accepted/completed/refused/pending/unknown processing disposition, redaction/withdrawal/hold context and source revision, while Audit owns independent evidence custody. A lawful retention hold is not a requirement to keep a review publicly visible; public aggregates and exports must avoid reidentification and respect erased/withdrawn status.

## `site-hosting` reciprocal interface — 23 November 2026 (SH-01–SH-06 owner-approved concept; integration unverified; PR #135)

Site Hosting retains minimally scoped domain-claim evidence and tenant/site binding history for safe transfer, rollback and fraud investigation; Privacy supplies applicable minimisation, retention, rights and consent constraints while source-side Site Hosting applies them, respecting qualified Legal Compliance holds. Domain verification must not publicly expose a tenant claimant, personal account or other private linkage. [Proposed Site Hosting contract](../../services/site-hosting/services-record.md).

## Storage reciprocal interface — 23 November 2026 (STO-01–07 owner-approved concept, PR #136)

Privacy supplies effective consent, retention/erasure policy and authorised rights-case disposition; the owning Media/Publisher/domain capability decides file eligibility and instructs Storage about specific bytes. Storage must execute scoped deletion and provide accurate live/backup/cache residual status with provenance, including restore-erasure replay, without asserting legal completion from a live delete alone. Retention conflicts and statutory holds remain source/legal decisions. See [Storage's idealised public contract](../../services/storage/services-record.md). Storage design directions STO-01–07 are owner-approved; published implementation contracts and this capability's independent review are unchanged.

**Storage conceptual approval, 23 November 2026:** STO-03 and STO-07 approved as design boundaries: file-owning domains and Privacy/Legal Compliance determine authorised erasure and holds; Storage supplies separately evidenced access-grant cessation, live/replica/cache deletion, backup expiry and restore-erasure replay status. A live delete is not conclusive whole-system erasure.


## Time & Attendance reciprocal conceptual note — 23 November 2026

**Status: Time & Attendance TA-01–TA-06 owner-approved conceptually on 23 November 2026; draft PR #143. This does not approve a published privacy interface or implementation.** Time & Attendance processes sensitive worker activity evidence; Privacy supplies lawful-purpose, retention, rights and legal-hold policy. Proposed outputs support scoped access, correction, export, data minimisation and qualified erasure/retention; no default biometric or precise-location monitoring. See [the proposed source-of-truth and input/output contract](../time-attendance/capability-record.md). Existing approved decisions remain authoritative.

## Theme Manager reciprocal privacy boundary — 23 November 2026 (draft PR #142)

**Status: Theme Manager TM-03/TM-05 owner-approved conceptual privacy boundary (23 November 2026), not a change to Privacy's approved design or implementation evidence.** [Theme Manager](../../presentation/theme-manager/presentation-record.md) may persist optional browser-selected theme identifiers, managed theme ownership/provenance and (subject to a future interface) personal preference references. Privacy supplies applicable consent, purpose, retention and erasure constraints; Theme Manager supplies storage purpose/register entries and enforces decisions on collection, export, share and deletion. Its published `active-theme-id` cookie lasts up to one year and is written on activation without explicit Secure/HttpOnly flags; assess lawful exemption/consent and alternative nonpersistent operation before relying on it. **Under owner-approved TM-03/TM-05:** permit session-only/default operation where preference persistence lacks a valid legal basis; obtain Privacy's applicable consent/exemption and retention requirements before browser or cross-device persistence. Profile, not Theme Manager, should own the optional personal cross-device reference. No theme-level legal interpretation, automatic exemption or independent Profile store is established. **Owner-approved standards alignment (23 November 2026):** the ICO's current storage/access-technology guidance and UK GDPR data-protection-by-design guidance inform assessment of optional browser and cross-device theme preferences, including purpose, notice, consent or documented statutory exception, retention and withdrawal. A preference cookie is not presumed automatically exempt or automatically unlawful; Privacy/Legal Compliance determine the applicable purpose and jurisdiction. Theme Manager retains safe default/session-only operation.

## FAC-D01–04 — Approved reciprocal responsibility alignment

Party, Payroll and Workforce Scheduling each own their own purpose-bound records and disposition receipts. Privacy coordinates rights, purpose and consent; no global party matching, unrestricted payroll disclosure or roster inference. Each owner independently applies holds, retention, redaction and verified erasure. See [Party](../party/capability-record.md), [Payroll](../payroll/capability-record.md) and [Workforce Scheduling](../workforce-scheduling/capability-record.md) as applicable. Exchanges are purpose-scoped public ports, not mandatory imports.
