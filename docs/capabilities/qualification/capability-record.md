# Capability Record — Qualification

**Classification:** Independent Domain capability candidate (`qualification`). A separately deployed service or repository is **not** required by this conceptual decision.  
**Approval:** COURSE-12, QUAL-01–17 and supplementary public-contract, standards, library, cross-cutting and optional GUI recommendations are owner-approved as conceptual design (22 November 2026). **QUAL-10** names required technical investigations; **QUAL-11** names future implementation/acceptance work. Approval of these obligations does **not** mean they are complete.  
**Implementation status:** No verified `nuxt-layers/qualification` implementation repository or published root `CONTRACT.md`; interfaces below are idealised business contracts, **not shipped APIs**. No regulatory recognition, legal conformance, CI acceptance or release is claimed.  
**Review:** Draft PR #126 · review baseline (former review: qualification 20261122 review baseline). Governing `architecture-rules/master@d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint opening `master@361566988ac53c55f6135e8acfa46cd5b013d7a0`. Recheck before merge.

## Purpose and responsibility

Qualification defines qualification schemes and their revisions; evaluates evidence from permitted learning pathways and credit-transfer arrangements; verifies the *scope* of issuing and delegated authority; and owns authorised **local** formal award cases and decisions, appeals, corrections, withdrawal and teach-out. It may record source-qualified external qualifications and the decisions of external awarding bodies, but does not appropriate their authority.

It **does not own** courses, raw assessment marks, training, enrolment, personal identity, the regulator's recognition decision, an external issuer's decision, portable credential issuance, professional licensing, job requirements, applicant selection or employment contracts. No separate universal Awarding capability is needed. A direct assessment, recognition of prior learning or external evidence pathway can work without Course, Training or Enrolment when the scheme allows it.

Keep these concepts separate: **scheme definition**, **recognition of the scheme/issuer**, **centre delegation and permitted act**, **evidence admissibility**, **individual eligibility**, **formal award decision**, **portable credential**, **external verification**, and **fitness for a particular job or regulated profession**. A platform administrator role, cryptographically valid signature or course completion grants none of the other authorities by itself.

## Owned records, source authority and lifecycle

Qualification owns versioned scheme definitions (framework, jurisdiction, level, credit/learning outcomes, requirements, pathways and as-of rules), effective recognition/mandate *evidence assertions*, individual award cases, admissibility and credit assessments, local decisions and their append-only challenge/correction history, teach-out restrictions and its own durable event outbox. Original learner facts and remote regulator/issuer records remain with their owners. Retain source identifiers and revisions rather than cloning protected academic history.

**Four recognised routes:**

1. **Local issuer:** verified issuing body, scheme and permitted award act with current scope, independent empowered decision actor and applicable requirements.
2. **Delegated centre:** prove the real awarding body's permission, allowed actions, scope, restrictions, expiration and any mandatory ratification. A recommendation is not necessarily an award.
3. **External awarding body:** submit evidence through an authorised adapter and retain source decision/status. A provider acknowledgement or local recommendation is not a formal award; verify the external outcome before representing it as such.
4. **Direct, prior-learning or mixed pathway:** use multiple courses, assessments, competencies, external awards or direct evidence under the scheme's accepted routes; no compulsory Course, Training or Enrolment dependency.

**Scheme lifecycle:** draft → governed review → approved published immutable revision → amended/new revision, suspended or retired, with explicit legally permitted teach-out. Publication, recognition, first delivery and formal awarding authority are separate statuses. Old scheme/case versions remain attributable.

**Authority lifecycle:** unverified/pending → independently verified for the *specific act, issuer, scheme, cohort, jurisdiction and time* → limited, disputed, expired, suspended or revoked. Record real source, verification method, evidence/proof version, observed time, freshness limit, effective-from/to, permitted activities, full delegation chain, accountable reviewer and restriction. Outage or missing proof means **unknown**, not permission or proven revocation; block new acts requiring positive authority.

**Award case lifecycle:** open → source-evidence checks and credit mapping → eligibility outcome (`eligible / ineligible / incomplete / disputed`) → mandated recommendation/independent final local decision **or** pending external request → verified award, refused or unresolved external outcome → possible appeal, correction, replacement, suspension, withdrawal or reinstatement by a duly authorised actor. Preserve all original decisions and legal effective-time history. Corrected grades prompt reviewed re-evaluation, **not** automatic cancellation of awards or certificates.

**Governance:** qualification-specific policy owns pathways, credit thresholds, equivalence methods, teaching and delegated rules, approval roles and controlled transitions, under external legal/regulatory constraints. Configuration may store only permissible settings and approved values. Expiry, revocation, disputed comparability, evidence retention, case reassignment and teach-out are scoped by scheme and jurisdiction; they are not universal constants. No qualified source/mandate means no regulated formal award.

## Approved conceptual public contract

All commands check resource/tenant/subject/purpose access and relevant awarding mandate server-side. Business operation names are illustrative; no actual TypeScript exports, HTTP routes, payloads or universal request object are asserted.

### Inbound — commands, source facts and authority

| Public input | Authoritative supplier and required information | Validation and absence behaviour |
|---|---|---|
| **Scheme governance** | Authorised scheme governor: new/revised definition, qualification/framework/credit/outcome/pathway rules, publication and teach-out intent, source revision and effective time | Check actor, compatible scheme revision, regulatory floor, separation of duties and idempotency; invalid or conflicting change is refused, not partly published |
| **Identity, permission and legal policy** | Identity/Authentication/Authorisation, Privacy and Legal Compliance: trusted subject/caller/tenant, purpose, assurance, resource permission, mandatory local policy and disclosure | Required decision missing, stale or denied → reject/hold only the affected protected act; no cross-tenant/organisation permission inherited |
| **Course / Assessment / Training / Enrolment** | Source-owned immutable course outcomes; final moderated results and correction status; verified competencies/completion; admissions or cohort only if the scheme requires them | **Conditional on selected pathway**; pending/disputed/retracted evidence cannot silently become credit; missing optional owner does not block another legitimate pathway |
| **Prior learning, credit and external evidence** | Applicant/reviewer and trusted Verification/Integrations: justified subject/evidence reference, independent proof, permitted reuse, source version and comparability context | Verify provenance, legitimacy, consent/purpose, conflicts and source freshness; retain incomplete/disputed/unknown rather than invent a result |
| **Recognition and delegated authority** | Competent registry, issuer or independently verified delegate through Verification/Integrations: identity, scope, permitted act, jurisdiction, restrictions, effective dates, suspension/revocation | Source proof and delegation chain required for formal acts; outage/contradiction blocks unsafe awards and creates a reconciliation path |
| **Award cases and adjudication** | Authorised case worker, empowered issuer/reviewer or verified external body: case, recommendation, final local decision, external acknowledgement/verified decision, challenge/correction/withdrawal | Verify independent mandate, legal policy, subject, expected revision, evidence and decision provenance; pending remote outcome stays pending/unknown |
| **Operational coordination** | Clock, Configuration, Workflow/Scheduler: effective-time, approved settings, routing/status and deadline signals | Workflow approval or a tenant setting cannot create awarding powers; missing compulsory review remains pending |
| **Scoped verification and export requests** | Permitted learner, issuer, registrar, Credentials, Verification, Recruitment or Employment: award reference, precise purpose, as-of time, comparability question or export scope | Authorise purpose and disclosure independently; no general academic transcript, global hiring inference or raw private records |

### Outbound — queries, decisions, events and exports

| Public output and primary consumers | Authoritative meaning and limitations |
|---|---|
| **Scheme catalogue/revisions** — Course, Assessment, Training, permitted public/host readers | Published scheme identity, revision, framework, levels/outcomes/credits, accepted paths, effective dates, retirement and teach-out. Qualification owns content, not regulator accreditation |
| **Recognition/mandate query** — case decision, issuer and Verification/Credentials | Issuer/centre scope, permitted act, jurisdiction, effective interval, source/method, verification freshness and explicit `valid / limited / disputed / expired / revoked / unknown` |
| **Eligibility/credit evaluation** — reviewer or authorised learner | Per-criterion coverage, accepted sources and revisions, gaps, conflicting/outstanding evidence, effective rule revision and `eligible / ineligible / incomplete / disputed`. **Eligibility is not an award** |
| **Case and formal award decision** — learner, issuer, Credentials and protected consumers | Case/award identifier, real local empowered issuer or verified external issuer, scope, decision, as-of/effective time, provenance, corrections and appeal chain; remote pending is not a completed award |
| **Verification/comparability** — limited relying parties | Source-qualified award status, issuer, verified recognition, equivalence/learning outcome comparison and caveats. **Recruitment**, not Qualification, evaluates an individual applicant against Job requirements; neither infers a licence or right to practise |
| **Committed events** — Credentials, Audit, Notification, Reporting, reconciliation | Versioned `qualification.revisionPublished`, `recognitionChanged`, `teachOutChanged`, `awardDecisionRecorded`, `awardCorrected`, `awardStatusChanged`, `appealResolved`; only minimal identifiers and status/provenance, **no broadcast raw academic evidence** |
| **Authorised reporting/export** — Reporting, issuer, subject, authorised external registry | Scoped records or aggregates with source revision, denominator, effective/observed times, coverage, retention and disclosure limitations; not permission to redistribute |
| **Operation outcomes and safe errors** — initiating caller and host | Accepted/pending/completed/rejected/uncertain, safe versioned code, reason/message key, correlation, reconciliation guidance. Provider acceptance is not confirmed award completion |

**Interaction guarantees:** Commands are versioned and idempotent with expected revisions and distinct accepted/committed/unknown states. Queries are scope-checked, paginated where needed, version/freshness/completeness-labelled. Qualification writes authoritative transitions and a **capability-owned transactional outbox in the same committed transaction**; Message Queue transports at least once, and consumers deduplicate/reconcile after duplicates, late or reordered events. An untrusted external callback is only an *input* until verified and committed. Do not claim cross-capability distributed exactly-once or atomic award-and-credential issuance.

Shared context is assembled **as needed**, not a mandated platform-wide DTO: trusted tenant and actor/assurance, issuer/delegation, subject/resource, purpose and authorisation, scheme and evidence revisions, effective and observed times, source confidence, policy version, correlation and idempotency. All public information respects restricted disclosure, correction rights, retention and legal holds.

## Relationships and reciprocal information

These are business-level, host-composed public interfaces, not required package import edges. Each owner retains its original records and independent operation.

| Capability | Qualification receives | Qualification supplies |
|---|---|---|
| **Course** | Published course/outcome revisions (conditional) | Qualifications, accepted pathways and credit requirements |
| **Assessment** | Final moderated results, appeal/correction status (conditional) | Evidence admissibility and eligibility/award results |
| **Training / Enrolment** | Verified competencies/completion, cohort or participation where scheme requires | Scheme requirements and purpose-scoped qualification case/award status |
| **Credentials** | Issuance/verification reconciliation and independent certificate status | Authoritative local award or qualified external reference, real issuer, corrections/withdrawals and source events; certificate issuance remains Credentials-owned |
| **Identity, Authentication, Authorisation / Profile** | Trusted caller/learner identity, assurance, subject attributes and resource access decisions | Scoped protected resource/decision context and permitted case results |
| **Verification / Integrations** | Regulator/issuer/award proof, authenticity, external submissions and callbacks | Verifiable evidence requirements, external applications/rechecks and qualified status results |
| **Privacy / Legal Compliance** | Jurisdictional restrictions, data rights, disclosure and retention/hold rules | Minimal decision/purpose/disposition evidence and protected record references |
| **Configuration / Clock** | Permitted settings, effective dates and reliable time semantics | Scheme-specific configuration constraints and applied effective version |
| **Workflow / Scheduler** | Authorised review routing and deadline status | Case/appeal approval tasks, expiring delegation and reconciliation triggers; final adjudication stays here |
| **Events / Message Queue** | Transport and replay acknowledgement where relevant | Own outbox of committed scheme/mandate/award/appeal changes |
| **Notification** | Delivery-status receipts where needed | Permissioned award/appeal/expiry notification requests; sending remains Notification-owned |
| **Quality** | Qualified role/inspection requirement or permitted verification context; Quality retains method-specific competence and inspection decisions | Privacy-scoped award, recognition, expiry/revocation and comparability with effective date/provenance; an award is not permission to sign off or legal accreditation |\n| **Job / Recruitment / Employment** | Purpose-scoped verification context; Job supplies frozen position requirements *to Recruitment* | Verified award/recognition and comparability primitives. Recruitment owns applicant-specific comparison/selection; Employment owns engagement and later entitlement action |
| **Publisher / Export and other optional consumers** | Approved publication/export context and provider receipt where required | Qualified catalogue metadata, safe notices or authorised portable record packages |

**Dependency rule:** Only the sources needed by the selected **operation and scheme** are compulsory. Qualification can run natively without Course, Training, Enrolment, Recruitment, Reporting or an external connector. Regulated decisions still require *verified* external authority evidence even when network connectivity is temporarily absent. Use contracts/ports only, maintain directed acyclic composition and do not share private databases.

### Error Normalisation, Logging, Audit and Reporting

| Contract | Qualification supplies | It returns; retained responsibility |
|---|---|---|
| [Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md) — **stateless library** | Domain/versioned error definitions, failed/pending/unknown outcomes, mapped provider errors and approved redaction context | Pure safe code/category/message key, diagnostic/public projections and advisory retry. It **does not** log, audit, report, create events or decide award commit/recovery |
| [Logging](../../services/logging/services-record.md) — diagnostics | Bounded sanitised technical event, severity, time, operation and opaque correlation; never grades, raw evidence or secrets | Accepted/rejected/throttled/unknown diagnostic receipt, protected logs and sink health. Routine log loss does not undo an award and is not Audit custody |
| [Audit](../audit/capability-record.md) — evidential custody | Registered, risk-selected **committed** scheme, delegated authority, award, refusal, appeal, correction, withdrawal and teach-out facts; separately identified denied attempts, actor, source revision and evidence reference | Accepted/pending/rejected/uncertain receipt, durable evidence reference, integrity/coverage/gaps and protected review. No independent awarding authority. Mandatory capture policies hold the **affected** high-risk action pending safe evidence/reconciliation; no claim that mere logging suffices |
| [Reporting](../reporting/capability-record.md) — derived analysis | Authorised source facts, unique awards and cases, correction history, denominator, time, completeness, provenance and scope | Aggregate awarded/eligible/pending/appeal/recognition trends, controlled report/export, freshness and lineage. No private source truth; **do not** count log messages, event retries or Credential issuances as extra awards |

Qualification normalises errors locally; it **separately** submits diagnostic/evidential information and publishes authorised report facts. Audit intake, business commit and MQ delivery acknowledgements are distinct. An external issuer timeout is `unknown`, not a failed or successful award. Logging and Reporting outages do not block native decisions; mandatory Audit capture and verified mandate are governed by the applicable risk policy.

## Standards and external authority

**Priority:** accepted governing ADRs and Capability Standard govern architecture; actual national law and regulator/issuer conditions govern qualifications **where applicable**; industry standards guide data interchange and controls but cannot confer accreditation. Select jurisdiction- and scheme-specific policy versions via Legal Compliance, verify real registries and apply qualified evidence.

| Reference | Relevant guidance; use and boundary |
|---|---|
| **England: Ofqual General Conditions of Recognition**; **Qualifications Wales**; **CCEA Regulation (Northern Ireland)** | Recognised body, regulatory scope, regulated qualification, awarding/appeals/withdrawal. Applicable conditions differ by UK nation, issuer, scheme and effective date |
| **Scotland: SCQF**; **European Qualifications Framework (EQF)** | Distinct national/reference level and credit frameworks; persist source framework, revision, levels/credit and evidence. **Numerical level similarity is not automatic legal equivalence** |
| **UNESCO ISCED 2011 and ISCED-F 2013** | Education and study-field classifications for comparison/reporting, **not** award authority |
| **European Learning Model (ELM)**; **ESCO** | European descriptions of learning, qualifications, skills and occupations; optional versioned exchange mapping, not a universal internal model |
| **Lisbon Recognition Convention; ENIC-NARIC** | Qualified foreign higher-education recognition and trusted competent-source comparisons; actual jurisdictional obligations still apply |
| **ISO 21001:2025 / ISO 29993:2017** | Educational organisation management and non-formal learning service quality. These do not create individual awarding powers |
| **ISO/IEC 17024:2026** | Certification of persons where the qualification is a professional/person certification scheme; not a blanket academic requirement |
| **1EdTech CASE / Credential Engine CTDL** | Optional outcome/competency framework identifiers and discoverable qualification catalogue metadata; original source owners remain authoritative |
| **W3C Verifiable Credentials Data Model 2.0 / securing profiles; 1EdTech Open Badges 3.0, Comprehensive Learner Record 2.0; European Digital Credentials for Learning** | Optional portable achievement/credential interchange **through Credentials and Verification**, not a second award issuer |
| **ISO 15489-1:2016; ISO/IEC 27001:2022; ISO/IEC 27701:2025; UK GDPR / applicable data-protection law** | Evidence records, security/privacy management and lawful retention/disclosure. Actual legal applicability and any certification require independent evidence |
| **WCAG 2.2 AA; BCP 47/Unicode CLDR; OWASP ASVS 5** | Accessible, multilingual, security-reviewed public interfaces under the governing platform baseline |

**Required representation:** qualification scheme/reference, source body and jurisdiction, original framework/version/level/credit, outcomes, permitted awarding acts and delegation, verification time and freshness, immutable award decision and as-of effective time, source evidence revisions, provenance and qualified comparability. Do not silently convert one national level to another or treat a signed but unrecognised credential as a recognised award.

**Optional data profiles:** CASE for competencies, CTDL for catalogues, ELM for European educational exchange, W3C VC/Open Badges/CLR/European Digital Credentials via Credentials. Map versions, validate imports, authorise disclosure and keep source references. No standards-format adapter is compulsory for native operation.

## Free, fully open-source implementation candidates

**Design preference:** select the complete publicly available implementation under a commercially permissive OSI-style licence, not a delayed/limited community edition. This is a *shortlist*, not installed dependencies, complete licence verification or proof of future maintenance. Before selection verify the actual version, complete selected functionality/source, licence/SPDX/NOTICE and **transitive** obligations, no proprietary runtime or mandatory paid service, security/release support, Node/TypeScript compatibility, pinned reproducible build and CI.

| Component and public source | Licence | Decision / boundary |
|---|---|---|
| [Zod](https://github.com/colinhacks/zod) | MIT | Preferred TypeScript command/result validation; maintain one source schema |
| [Ajv](https://github.com/ajv-validator/ajv) | MIT | External JSON Schema validation and compatibility where needed, not a competing duplicate business rule engine |
| [json-rules-engine](https://github.com/CacheControl/json-rules-engine) | ISC | Conditional deterministic credit/eligibility evaluation; first prefer simple owned predicates, assess maintenance/explainability and historical replay |
| [XState](https://github.com/statelyai/xstate) | MIT | Optional complex case state machine, **stable v5** rather than v6 beta; persistent domain decisions remain Qualification-owned |
| [Kysely](https://github.com/kysely-org/kysely) / [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) | MIT / Apache-2.0 | Choose **one**, if an approved shared PostgreSQL approach does not already meet the need |
| [jsonld.js](https://github.com/digitalbazaar/jsonld.js) / [N3.js](https://github.com/rdfjs/N3.js) | BSD-3-Clause / MIT | Optional JSON-LD/RDF metadata adapters; do not require graph storage |
| [1EdTech OpenCASE](https://github.com/1EdTech/OpenCASE) | Apache-2.0 | Optional CASE reference/adapter; **not established as a mature core library** and must not duplicate Course/Assessment/Qualification tenancy and state |
| [Credo](https://github.com/openwallet-foundation/credo-ts) / [Digital Bazaar vc-js](https://github.com/digitalbazaar/vc) | Apache-2.0 / BSD-3-Clause | **Credentials/Verification** only: interoperable credential issuance/proofs, never Qualification award powers |
| [Temporal TypeScript SDK](https://github.com/temporalio/sdk-typescript) | MIT | Existing Workflow/Scheduler/Temporal Gateway's durable execution adapter, not a second orchestrator inside Qualification |
| [Casbin](https://github.com/apache/casbin-node-casbin) / [CASL](https://github.com/stalniy/casl) | Apache-2.0 / MIT | Existing **Authorisation** policy engine candidates; separate from external issuer/centre mandate |

No comprehensively mature permissive open-source engine is established that can safely own all jurisdiction-specific recognition, award, appeals and teach-out rules. Build those domain decisions in Qualification. Do not introduce Neo4j/Redis/Elasticsearch style restricted core/community editions, new unneeded search/queue/cache/graph infrastructure, legacy SSI-SDK or vendor-only credentials tooling.

## Security, privacy, configuration and provider neutrality

Enforce server-side subject/tenant/issuer/resource and purpose-scoped access using Identity, Authentication, Authorisation and qualification-specific independently verified awarding powers. Use higher assurance, separation of duties and accountable human review when law/scheme demands. Validate source revisions and effective intervals; keep evidence and source-of-authority provenance, lawful legal holds and corrections with immutable attributable decisions. Reject unsupported cross-tenant or invalid actor actions with safe codes and no existence leak. Avoid unrestricted direct learner-data exports, automated adverse hiring or professional licensing conclusions.

Privacy and Legal Compliance set applicable rights/retention/disclosure floors; Configuration holds permitted preferences but cannot override awarding recognition; Clock supplies time semantics; Audit holds separate evidential custody; Logging diagnostics never substitutes for Audit; reporting projections are not source records. Each provider adapter must validate identity/callback signature, version/format, terms, rate-limit and timeouts, consent/purpose, idempotency and status freshness; support connection retirement, export, switch and reconciliation. A provider outage is degraded/unknown, not permission to issue or automatic revocation. Preserve native operation if no optional provider is configured, but never waive a required authoritative mandate.

## Optional GUI, host composition and screen contract

**Headless-first:** No screen is required for an API-only consumer. Optional separable Nuxt presentation must use the same Qualification public commands/queries and never private SQL or provider tables. The application owns the menus, route names, fixtures, identity context, Theme Manager design vocabulary and feature selection; Qualification owns validations and adjudication. A role-hidden button is no replacement for server-side denial.

**Verified representative template:** `nuxt-layers-test/application-test-template/master` uses a shared `app/app.vue` shell, collapsible **Capabilities** sidebar and Theme Manager route `/theme-manager`; `app/pages/admin.vue` contains the test dashboard `/admin`, while `/` is separate. Mobile navigation overlays the shell. Derived capability tests add their own navigation and scenarios, rather than editing the shared template. Its Theme Manager `test` mode and `Not signed in` placeholder are **not production authentication or deployment**.

**Proposed host navigation:** `/admin` → **Capabilities** → **Qualifications** → `/qualifications` dashboard. Route strings below are examples, **not published endpoints**.

| Screen / proposed route | Audience and public contract interaction |
|---|---|
| **Dashboard** `/qualifications` | Authorised status and actionable queues: schemes, decisions awaiting approval, missing evidence, expiring mandates, unknown external cases and appeals; last refresh and coverage |
| **Scheme catalogue/editor** `/qualifications/schemes` | Scheme governor: catalogue/revision queries; validate, draft, compare, review, publish, suspend and teach-out with approval |
| **Issuing authority** `/qualifications/authority` | Governor: source registry and delegation proof, freshness, scope, expiry, history and verified mandate checks |
| **Cases/evidence/credit mapping** `/qualifications/cases` | Case worker: privacy-scoped evidence references, accepted credit pathways, unknown/disputed gaps and eligibility evaluation |
| **Formal decision workspace** `/qualifications/decisions` | Separately mandated award officer: recommendation, approval/refusal and attributable decision; required step-up and independent checks |
| **External reconciliation** `/qualifications/reconciliation` | Issuer operations: submitted/acknowledged/pending/unknown/verified source status, safe retry and independent reconciliation |
| **Appeals and corrections** `/qualifications/appeals` | Independent reviewer: contested evidence, immutable old decision, corrected new decision, privacy-safe disposition |
| **Teach-out/withdrawal** `/qualifications/teach-out` | Governor: effective cohort rules, historical awards, scope, deadlines and transitions |
| **My Qualifications** (host-selected learner route) | Subject/representative: own permitted case/award status, appeal, safe export and Credentials hand-off, not all learner records |
| **History and reporting** (host-selected authorised route) | Auditor/administrator: Qualification history, separate Audit receipts, Logging diagnostics and Reporting aggregates under their own permissions |

Render case lists with accessible filters, pagination and clear textual statuses; distinguish source freshness from event processing. No colour-only badges or implicit approval from an optimistic client state. Show real issuer, accepted evidence, qualification version, effective/as-of time and consequences before irreversible decisions. Support WCAG 2.2 AA, keyboard and screen readers, responsive tables/cards, BCP 47/CLDR, locale/Clock handling and Theme Manager tokens. Deep links independently authorise subject/tenant/case and actual external mandate.

**Integration acceptance:** An independently created `nuxt-layers-test/qualification-test` derived app (future work) should use synthetic cases and the common shell, without altering the template or other implementation repos. The optional adapter must support one host composition operation and **at most 50 lines of capability-specific host glue** (ADR-0012); no duplicate app shell or required Nuxt import in headless services. Verify restricted menu, denied deep-link, expired authority, separate reviewer, unknown callback, safe learner view, mobile accessibility and headless operation in future CI. The test host's unauthenticated local test mode cannot serve as production security evidence.

## Conceptual acceptance and completeness gates

| Representative input / scenario | Expected authoritative output or safe refusal |
|---|---|
| Authorised local issuer with verified current mandate and final eligible evidence | Attributable formally committed award and outbox event; Credentials issuance remains independent |
| Valid scheme but expired, disputed or unverified delegation | Hold/refuse new formal award with reason and reconciliation; preserve valid historical awards |
| Final corrected Assessment mark or successful appeal after local award | New impact review and attributable corrected decision when empowered; no silent grade rewrite, automatic revocation or erasure |
| External awarding submission acknowledged, then provider timeout or duplicated callback | External state pending/unknown until verified; idempotent reconciliation and source reference, no fabricated local award |
| Prior-learning-only, multi-course or internationally recognised evidence path | Evaluate only against scheme's approved versioned requirements; accept legitimate direct routes and explicitly limited comparability |
| Foreign qualification with similar framework level but no competent recognition finding | Return verified source claim and qualified comparison/unknown, **not** legal equivalence, licence or hiring suitability |
| Recruitment asks whether applicant meets role requirements | Supply limited award/comparability evidence; **Recruitment** owns the requirement decision |
| Cross-tenant access, unsupported awarding act, unauthorised export or unsafe upload | Server-side refusal, no protected existence or records leaked, stable safe error |
| Audit mandatory receipt unavailable, Logging/Reporting unavailable | Risk-specific high-impact operation held/reconciled as required; routine diagnostics/derived reports do not reverse completed decisions |
| Credential issuance fails after an award | Award remains authoritative, emit/replay source event and reconcile; do not claim certificate delivery |
| Manual local operation without Course/Training/Enrolment/optional external integration or GUI | Valid independent headless workflow where scheme and verified required mandate permit |
| GUI path or applicant status requested without permissions | No data disclosure even by direct URL; accessible authorised screen or safe denial |

**Conceptual completeness:** Business ownership, four award routes, authority chain, scheme/case lifecycles, source-to-public contracts, reciprocal interfaces, security/privacy/legal boundaries, error/diagnostics/audit/reporting, standards, full-source permissive library shortlist, optional GUI/headless composition and acceptance scenarios are documented. **No unresolved core conceptual ownership decision remains** under QUAL-01–17.

**Still outstanding—not barriers to agreeing the abstract design:** **QUAL-10** independently verify actual national regulator/issuer register APIs and mandate/delegation rules, jurisdictional legal/appeal/retention/teach-out requirements, supported evidence/security profiles and external provider terms/freshness; **QUAL-11** establish the eventual independently usable root `CONTRACT.md`, exported ports/types, repository/persistence/outbox, storage register, threat model, migrations, source adapter/OSS licence checks, test host and CI/security/accessibility acceptance. Actual standards compliance, provider capability, authority to award and deployment readiness cannot be inferred.

**Review / merge gate:** This approved **conceptual design** does not itself authorise a merge. Recheck the latest governing and blueprint `master`, accepted ADRs and parallel/reciprocal PR changes; verify internal links, change scope, mergeability, protected-branch checks and CI; then obtain separate explicit owner permission to squash-merge. No implementation repo changes, builds or tests are part of this review.

## Decision register

| Decision(s) | Owner-approved outcome |
|---|---|
| **QUAL-01–05** (COURSE-12) | Independent scheme definitions, multi-pathway credit/evidence, real issuer/centre mandates, formal individual awarding decisions, appeals/version retirement/withdrawal and teach-out |
| **QUAL-06** | Keep scheme recognition, individual mandate, evidence eligibility, formal award decision and portable credential states separate; four authority modes; fail closed where mandate is required |
| **QUAL-07** | Immutable decisions, source corrections causing reviewed re-evaluation rather than automatic revocation |
| **QUAL-08** | Headless, provider-neutral native responsibility with optional separable dashboard; no universal awarding service |
| **QUAL-09** | Verify external trust/recognition chain with scoped, versioned policies; local jurisdiction/issuer details require authoritative confirmation |
| **QUAL-10** | Approved **technical investigation obligation**, not a claim that registries/proofs/local law have been tested |
| **QUAL-11** | Approved **implementation and independent acceptance obligation**, not a published package or root `CONTRACT.md` |
| **QUAL-12** | Versioned verified regulator/issuer/delegation scope by permitted action, jurisdiction, scheme and effective time |
| **QUAL-13** | Official-source/proof preference, freshness/recheck, explicit limited/disputed/unknown/expired/revoked with reconciliation |
| **QUAL-14** | Append-only appeal/correction/withdrawal and historical as-of rules, empowered reviewer and legal teach-out |
| **QUAL-15** | Multiple source-owned pathways, prior learning and conditional foreign comparability; no universal equivalence or right-to-practise |
| **QUAL-16** | Qualification supplies recognition/award/comparability primitives; Job defines role requirements; Recruitment evaluates applicants and selects; Employment owns engagements |
| **QUAL-17** | Minimal source references, tenant/purpose disclosure, lawful retention/holds and provider-neutral export/correction |

**Status:** Approved conceptual specification, drafted in PR #126; **draft/unmerged**, implementation and independent verification deferred.


### Training conceptual contract alignment — 23 November 2026 (PR #145)

**Status: reciprocal proposal; Training decisions TRAIN-01–08 owner-approved, implementation unverified.** **Training → Qualification:** Qualification may consume permissioned versioned Training competency/completion findings and evidence provenance as one source of eligibility; Qualification independently decides awards, validity and revocation. Training completion is not an award and neither source correction nor an event automatically mutates Qualification state. See [Training's canonical conceptual contract](../training/capability-record.md). This note does not complete or supersede the neighbouring capability review.
