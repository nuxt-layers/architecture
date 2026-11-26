# Legal Compliance — Capability Record

**Canonical capability:** `legal-compliance` (Foundation in governing catalogue)  
**Blueprint directory:** `docs/capabilities/legal-compliance/`  
**Conceptual revision:** 21 November 2026 — LC-01–LC-13 and LEA-01/COV-01/REV-01/RULE-01 approved by capability owner; deployment-specific profiles remain to be qualified  
**Review:** draft PR #85  
**Authority:** Accepted ADRs and normative standards in [architecture-rules](../../../RESOURCES.md#architecture-rules-2); this blueprint is non-normative.  
**Opening governing baseline:** `b920ce0d8b361de000a6739a16123dbdc56df7a7`; **opening blueprint baseline:** `6dac83a03da8704f7945ee1bc894f2248300445a`. Blueprint subsequently advanced to `d39df23e087cd0510c82ba2cea78996c7624850f`; final reconciliation remains required.  
**Evidence classification:** Governing responsibility **established**; LC-01–LC-13 **owner-approved for the conceptual specification** (21 November 2026); LEA-01, COV-01, REV-01 and RULE-01 **owner-approved** on 21 November 2026; deployment profiles, verified coverage and implementation conformity remain outside conceptual sign-off. Previously approved neighbouring principles are reflected only where relevant to the current interaction contracts; their source records and Git history retain their original decision evidence.

> **Implementation evidence and limits:** `nuxt-layers/legal-compliance` exists, but its inspected `master` README is only a heading and a root `CONTRACT.md` was not found. The services, schemas, ports and screens described below are an **idealised conceptual contract**, not verified implemented APIs, regulated-service coverage, legal advice, legal certification or evidence of passing acceptance tests.

## Executive definition

Legal Compliance owns the **qualified meaning, applicability, scope, provenance, temporal validity and unresolved status of legal/regulatory duties**, plus **legal-hold instruction authority**, and a governed relationship between **applicable obligations → required controls → source-domain implementation → independently verifiable evidence → monitoring and improvement**. Other capabilities own the underlying facts, operational controls, transactions, customer data, permission decisions, messages, approval processes, audit evidence and filing outcomes.

The operating principle is: **a reviewed legal interpretation is reusable; its applicability to a particular subject/activity is a separate, attributable decision; enforcement belongs to the domain owner; delivery of a message is not enforcement.** Legal Compliance does not issue a general `compliant=true` certificate. Its working modes are native/headless, synchronous decision requests, event-driven reassessment, scheduled obligation review and human-assisted qualification. The default architectural form is a bounded Foundation service composed into the modular monolith, with optional separable presentation. Independent deployment or specialised legal providers are not presumed.

### Users, jobs and successful journeys

| Person / consumer | Job to be done | How success is presented |
|---|---|---|
| Tenant / organisation administrator | Declare operating activities and see what actions or evidence are needed | Contextual onboarding, clearly scoped obligations and unresolved areas, without requiring knowledge of legislation |
| Compliance officer | Maintain obligation ownership, monitor control coverage, deadlines and exceptions | Obligation dashboard and **Legal Review Worklist** |
| Qualified legal reviewer | Validate sources and interpretation; adjudicate difficult scope, holds, conflicts and releases | Source/version comparison, privileged evidence, recorded decision, competent authority and reason |
| Business manager | Carry out allowed operations without interpreting statute | Domain-level requirements/blockers, clear next action and review route |
| Records manager / privacy officer | Preserve covered records while honouring data rights and other retention rules | Narrow hold and erasure disposition, separate legal/physical outcomes |
| Auditor / regulator liaison | Reconstruct historical assessment, control and evidence history | Authorised as-of reporting and evidence references, not fabricated completeness |
| Service capability | Determine lawful conditions for a specific action | Typed, versioned, bounded-latency applicability result with explicit unknowns |
| Platform operator | See health, missed tasks and source freshness | Operational view without unrestricted tenant legal advice or evidence |

## 1. Authority, owned information and exclusions

**Legal Compliance owns:**
1. **Legal-source register:** source reference, issuing authority, class (binding legislation / delegated instrument / regulator obligation / guidance / voluntary standard / contractual requirement), jurisdiction/territorial reach, effective dates, amendments, source provenance, licence/access limitations, verification/review and change detection.
2. **Qualified interpretation / approved rule:** immutable version, reviewer authority, approvals, legal scope and predicates, evidence, date knowledge was obtained, legal effective period, limitations and retirement/supersession; review of legal content is not merely syntactic rule approval.
3. **Coverage and applicability:** declared supported jurisdictions/activities/service categories, missing coverage, conflicts, qualified determination, factual snapshot references, source/revision, reason, expiry and historical as-of explanation.
4. **Obligation register:** law-derived responsibility, scoped accountable role, trigger, duty/required outcomes, governing source/interpretation, period, deadlines, review criteria, risk and fulfilment references. The factual filing/action remains with its owner.
5. **Control requirement mapping:** obligation → prescribed safeguards/expected outputs → implementing **domain control owner** → control evidence contract. It is a map of duties, **not** a second engine performing all domain actions.
6. **Legal-hold instruction lifecycle:** authorised basis, scope, competent requester, restrictions, records/classes, required review and release; the domain retains actual records, derivative copies, enforcement and deletion.
7. **Compliance assessment/exception:** qualified issue, risk/impact, unresolved facts, case status, review finding and improvement/corrective-action requirement. Workflow may own tasks, and Audit owns independent evidential preservation.

**Does not own:** Identity tenant/group or digital-control relationships; corporate register, ownership adjudication or legal-person master not separately established; Authentication, Authorisation, Verification; Privacy consent, subject rights and specialist privacy retention decisions; Configuration's approved user settings; Publisher's notices or policy document lifecycle; operating domain rules/records or statutory tax calculations; regulator decisions and source-domain filing content; Workflow approval choreography; Scheduler execution; Message Queue message transport; Notifications channels; Integrations credentials/transmission; Audit tamper-evident records; Logging technical logs; Observability metrics; Reporting report definitions. No universal policy service and no automatic legal interpretation by AI or provider output.

**Boundary requirement:** An authorised operation may still be legally prohibited; a legally permitted operation may still be unauthorised. Domain owners independently verify both, enforce any mandatory relevant restriction and return actual completion or failure evidence. Neither holds nor regulatory uncertainty automatically grant unrestricted platform operator access.

### IAM Integration and Authorisation — public composition boundary

**Architectural authority:** [IAM Integration](../../compositions/iam-integration/compositions-record.md) is the owner-approved IAM suite **composition, façade and coordination** layer for Identity, Authentication, Authorisation and Profile (ADR-0005/ADR-0012). It is **not** an additional identity, access-policy, credential or profile data owner. The application composition root supplies Legal Compliance with the *documented IAM public caller/access ports*, rather than permitting Legal Compliance to import member internals, query IAM tables, duplicate roles/grants or recreate the IAM suite.

| Contract concern | Provider through composed façade | Legal Compliance responsibility |
|---|---|---|
| Trusted caller | `resolveCaller` semantics from Identity principal and tenant/group standing plus Authentication assurance, session recency, phishing resistance and revocation state | Use only verified server context and needed provenance; never trust browser-asserted tenant, role or caller |
| Permission to view or change a legal resource | `decide` backed **only by Authorisation** policies, roles, resource-scoped grants and assurance requirements; host/domain supplies authoritative resource descriptor | Require a valid decision for each privileged query, review, source revision, hold/hold-release and export; preserve deny, step-up, unavailable and scope semantics |
| Competence to render legal judgement | Verification/competent external source confirms professional claim and delegation, Authorisation permits the operation | **Separately** check applicable legal jurisdiction, competence, mandate, conflicts/independence, current case/rule/evidence version and dual control (REV-01). Access permission is neither legal competence nor a waiver |
| IAM member lifecycle | IAM Integration coordinates Identity, Authentication, Authorisation, Profile public lifecycle operations and collects member-owned results | Publish only narrow effective legal retention/hold conditions and accept attributable per-member applied/partial/failed/unknown receipts |
| IAM-owned resource protections | Source member and Authorisation enforce their own invariants, with IAM Integration coordination | A legally permissible action is not an access grant; an authorised action is not automatically lawful |

**Mandatory decision combination:** a protected legal operation must pass the independently applicable **Authorisation** access decision *and* Legal Compliance's scoped legal preconditions. A denied, unavailable or insufficient-assurance IAM result does not disclose case existence or become allow. A favourable access decision cannot release a hold where another legal duty survives. Domains (including IAM members) perform their own final state changes and report actual results.

**Direction and ports:** Host composition connects IAM Integration's published caller/decision façade to Legal Compliance. For IAM lifecycle operations, an IAM member consumes Legal Compliance's legal-hold/retention/qualification *public port* through the host/IAM suite composition. IAM Integration correlates member status and recovery; no Legal Compliance → IAM Integration → Legal Compliance import cycle, shared store or façade reownership of Authorisation decisions is permitted. Events may notify and trigger reassessment, but message delivery is not enforcement.

**Implementation limitation:** The existing [IAM Integration root CONTRACT.md](../../../RESOURCES.md#iam-integration--contractmd) states its intended single composition call returning `resolveCaller`, `decide` and `tasks` is **not yet built** and documents transitional member wiring. The conceptual interface is approved as the target, not verified deployed. Until implemented, the application host can provide contract-compatible, verified member adapters with the same authority and isolation guarantees; absence of required IAM assurances fails the protected act safely. This is not approval for new IAM direct dependency edges.

**Operational examples:**
1. **Privileged legal reviewer:** IAM Integration resolves the actor, permission, tenant and resource, with assurance and independent-approver checks; Legal Compliance then verifies qualification/competence and exact legal authority, rechecks current version and commits a case decision. Both checks are mandatory, even when Workflow shows a completed task.
2. **Legal hold release:** Authorisation permits a reviewer to request/approve the release; Legal Compliance checks statutory basis, competent independence and any remaining overlapping holds. Only a legally valid release is sent to each data-owning domain; the domain independently confirms physical preservation/deletion outcomes.
3. **Account/tenant closure:** IAM Integration coordinates Identity, Authentication, Authorisation and Profile state changes. Legal Compliance supplies narrow holds/retention restrictions to member owners; partial deletion or uncertain revocation remains explicit until member reconciliation. Audit and Reporting read appropriate evidence without acquiring IAM authority.
4. **Corporate control dispute:** Verification establishes evidence provenance for company representation; Legal Compliance qualifies legally relevant restrictions; IAM Integration coordinates Identity digital-control and Authorisation access governance. Neither a corporate-office claim nor a Legal Compliance opinion can independently transfer a tenant or bypass last-owner protections.

**Acceptance implications:** a legally competent but unauthorised reviewer is denied; an authorised but legally unqualified reviewer cannot approve; IAM unavailable/stale/step-up is never an allow; legal hold propagation and account closure can be partial; cross-tenant resource checks are mandatory; incomplete IAM façade deployment is clearly classified rather than misreported as implemented.

## 2. Canonical conceptual information model

### Approved LEA-01 — verified legal entities and control

**Authority chain:** the originating official register, company instrument or independently competent legal authority owns the real-world fact; `verification` owns qualified attestation, provider/issuer trust, source-binding, freshness, revocation and disclosure for organisation and representative claims; `identity` owns local principals, tenants, human digital owners and memberships; `authorisation` owns permissions and digital change approval; **Legal Compliance qualifies the legal consequences**, statutory restrictions and necessary holds. Nothing in a local principal, parent tenant, verified company officer, beneficial owner, email domain or paid subscription independently establishes a mandate to control a tenant.

**Required authority evidence reference:** legal-entity identifier and source jurisdiction, entity type, registration/status, fact/claim type (officer, shareholder, person with significant control, agent or authorised signatory), capacity, effective period, issuer/register, source record reference and revision, verification/knowledge time, challenge/revocation status, verified subject binding and permitted relying purpose. Do **not** assume a corporate register proves every mandate: where the instrument or law is decisive, require separate competent evidence.

**Governance change procedure:** (1) requester declares the intended company/tenant action and presents evidence; (2) Verification validates authenticity/current claim status and identifies gaps; (3) Legal Compliance qualifies the legally relevant authority/restrictions and any dispute/hold; (4) Identity and Authorisation separately confirm human digital control, permissions, independent review and last-owner protection; (5) the owning IAM operation commits or refuses the change; (6) Audit receives evidence and invalidation events trigger reassessment. Conflict, stale authority, missing instrument or provider outage returns `unresolved` for the sensitive action, with protected recovery/appeal. It does not silently transfer control or make Legal Compliance a company register. Create a new legal-entity capability only following a separately justified independent source-of-truth/lifecycle review.


| Object | Mandatory conceptual attributes | Authority and lifecycle |
|---|---|---|
| `LegalSource` | source ID, authority, official reference/URI, category, geographic and temporal reach, amendments, verification/known-at, provenance | Legal Compliance indexes external authority; cannot claim the text's legal validity solely from receipt |
| `InterpretationVersion` | source refs, interpretation/predicate, qualification, reviewer competence/approval, dates, scope, status, supersedes | Draft → qualified review → approved/scheduled → effective → superseded/withdrawn, no overwriting effective versions |
| `FactDefinition` | stable typed key, owner, scope, validation, trust/freshness policy, sensitivity, permissible asserted/verified states | Legal Compliance defines fact *consumption* semantics; source owner retains values |
| `FactEvidenceRef` | owner resource ID, source revision, observed/valid time, asserted/verified trust, reference/digest | Usually borrowed input; sensitive values held transiently/minimally |
| `ApplicabilityAssessment` | tenant/entity/activity/resource, jurisdiction(s), as-of/known-at, rule+fact versions, status, reasons, expiry, decision provenance | Legal Compliance owns consequence if persisted; factual origin unchanged |
| `Obligation` | legal interpretation ref, trigger/scope, duty, deadline condition/time zone, accountable party, state, review, conditions | Legal Compliance owns obligation meaning and tracking, not actual domain action |
| `ControlRequirement` | obligation ref, implementing owner, expected safeguard/outcome, evidence/verification criteria, assurance level | Legal Compliance maps duty to named public domain control; domain validates/enforces |
| `ControlEvidenceRef` | owner/operation, evidence type, applied decision version, accepted/completed/failed/unknown, timestamps, provenance | Domain owns outcome; Audit retains independent evidential record; Legal Compliance stores minimal linked status |
| `LegalHold` | competent authority, legal basis, narrow target references, scope, effective/review/release dates, approvals, propagation acknowledgements | Legal Compliance owns instruction; domain owns physical preservation/disposal |
| `ReviewCase` | reason, subject/scope, source versions, missing evidence, assigned competent reviewer, decision, timestamps, confidentiality | Legal Compliance owns legal review case; Workflow owns optional task routing |
| `Exception/ImprovementRequirement` | deviation, consequence/risk, corrective action owner, due date, evidence, independent evaluation status | Legal Compliance tracks legal requirement; domain/Workflow own remedy/action |
| `CoverageProfile` | supported jurisdiction/service/activity, source currency, validated date, exclusions, qualified responsible reviewers | Absence means unsupported/unresolved, never legal approval |

**Relationship:** `LegalSource → InterpretationVersion → ApplicabilityAssessment → Obligation → ControlRequirement → ControlEvidenceRef → Assessment/Exception/Improvement`. A hold can restrict any affected source record independently of the primary obligation chain. The graph is traceable by stable references, not shared foreign-key access to private databases. Provenance can be modelled using W3C PROV concepts (entity/activity/agent); this does not require an RDF store.

**Temporal model:** distinguish enacted/published, legally effective, observed, known-to-system, approved, applied and completed times. Historical queries specify legal **as-of** and knowledge **known-at**; retroactive changes result in linked reassessments, never silent rewriting of historical knowledge.

### Status vocabulary and certainty

- Applicability: `applicable`, `not_applicable`, `unresolved`, `unsupported`. Distinguish `stale` and `conflicting` as explicit evidence/validity qualifiers. No unknown state maps to Boolean `false`.
- Legal qualification: `draft`, `under_review`, `approved`, `scheduled`, `effective`, `superseded`, `withdrawn`.
- Enforcement: `not_requested`, `requested`, `accepted`, `completed`, `partial`, `failed`, `unknown`, `not_applicable`. Transport receipt and provider submission do not satisfy `completed`.
- Obligation: `awaiting_evidence`, `due`, `submitted`, `receipt_unconfirmed`, `fulfilled`, `overdue`, `contested`, `closed` as applicable, without assuming an external authority accepted a filing.
- Hold: `requested`, `authority_pending`, `authorised`, `effective`, `partially_enforced`, `under_review`, `released`; hold legal state and domain preservation state are orthogonal.

Every status-bearing read identifies scope, source/version, freshness/coverage, conclusion limitations and allowed next action. Account for appeals, qualified overrides permitted by law, correction, revocation and incompatible jurisdictions without a single global override flag.

## 3. Variables, flags and decision rules (LC-08 / LC-10)

### Approved RULE-01 — restricted portable decision language and compatibility

**Default model:** a versioned, documented, typed, side-effect-free JSON expression/decision-table profile, **informed by DMN 1.6 concepts**, with no claim of complete DMN or FEEL conformance. Inputs are schema-validated catalogue variables with source, scope, trust, effective time and revision. Supported initial *conceptual* operations are `eq`, `ne`, `in`, `notIn`, `lt`, `lte`, `gt`, `gte`, `between`, `all`, `any`, `not`, and explicit date/time interval checks; types include Boolean, string, finite decimal/number, enumerations, date/time and lists of supported primitive values. No arbitrary functions, network, I/O, code evaluation, hidden current-time access or mutable global state.

**Decision-table policy:** `unique` when at most one outcome is allowed, `collect` for independently accumulated obligations and `priority` only where the approved legal interpretation states justified precedence. Overlapping `unique` rows are a validation conflict; incompatible `collect` obligations cannot be resolved by source order. Unknown/missing/stale/conflicted/unsupported critical values propagate as typed non-permissive uncertainty, not `false` or skipped rows; explicit null and absent values differ. Jurisdiction/effective-date/known-at contexts are input facts rather than evaluator ambient defaults.

**Three independently versioned surfaces:** `ruleLanguageVersion` fixes parsing, typing, operators, hit policies and unknown/date/time semantics; `ruleBundleVersion` identifies immutable approved legal sources and decision tables; `decisionContractVersion` fixes the public request/result interface and error meanings. Bundles declare minimum/maximum supported evaluator versions, dependency keys, hash/signature/provenance and approved migration metadata. Adding/removing operators or changing null/time/hit semantics requires language-compatibility review; changing approved legal obligations yields a new bundle and impact analysis; changing response shape/meaning follows public-contract compatibility rules.

**Conformance and migration procedure:** schema/type/semantic validation → compile/check decision graph, conflicting rows and dependency references → representative golden-case results including unknowns, dates, overlapping obligations and historical rules → competent legal approval of meaning → immutable version activation with effective-time boundaries → bounded requalification of affected subjects. Retain previous interpreter/bundle versions or deterministic historical artefacts for authorised as-of replay. Unknown language/feature versions fail with `unsupported_rule_language` rather than executing permissively. Optional DMN XML/FEEL or OSCAL exchange must declare an exact supported subset and versions; no automatic lossless import/export promise.


**Typed variable catalogue** records stable key, type/allowed values, units, source of truth, tenant/resource scope, purpose, sensitivity, valid/fresh period, revision, provenance, validation, permitted asserted versus verified value, fallback and legal relevance. Examples:
- `tenant.id`: Identity/host-trusted isolation context; never browser authority.
- `entity.registered_country`: authoritative entity verification evidence, **not** a mere unverified Configuration assertion.
- `service.category`: Marketplace/Publisher/other source capability; authoritative actual feature taxonomy.
- `service.allows_user_content`: relevant business owner’s effective service state.
- `audience.includes_children`: sourced fact with verified/declared level, not assumed from marketing.
- `activity.effective_at`: domain owner with Clock semantics.
- `rule.version`: Legal Compliance approved decision corpus.
- `hold.active`: derived from a scoped Legal Compliance hold, not tenant-configurable.
- `control.completed`: explicit evidence from the enforcing owner, not inferred from legal applicability.

**Flags are different from legal conclusions:** Feature switches belong to Configuration/domain owners, fact flags reflect evidenced source states, legal requirement flags are derived from qualified legal results, and fulfilment flags come from enforcement evidence. No editable `legal.enabled=false` switch can waive an applicable mandatory duty. Unknown/stale sources cannot return `not_applicable` by default.

**Rule representation:** prefer a small, schema-validated, side-effect-free declarative condition/decision-table model with named variables, typed operators, explicit conflict/hit policy and output obligations. Align concepts with current OMG **DMN 1.6 (September 2026)** but do **not** promise full DMN/FEEL interchange, embed a heavy BPM suite, execute arbitrary tenant JavaScript or let rule documents call network endpoints. If later consumer requirements justify full DMN compatibility, assess import/export subset, version compatibility and deterministic evaluation separately. Rule source/qualification/approval is distinct from parse/type validation.

**Risk-aware but law-bound:** ISO 31000 can inform review criticality; organisational tolerance cannot override legal floors. Candidate automated legal interpretation and AI-assisted source extraction always require review under an appropriate competence policy and cannot self-approve.

## 4. Automation procedure and operational modes

**Shared deterministic evaluation procedure:**
1. Trigger via an authorised direct request, committed source event, Scheduler due task or qualified human review.
2. Via host-composed IAM Integration caller/decision ports, resolve trusted tenant, actor, assurance, resource and purpose; the **Authorisation-owned** permission decision must permit the operation before privileged data access or write, and domain-owned resource facts must be independently verified.
3. Resolve supported jurisdiction/service/activity and legal effective/as-of and known-at periods; choose only reviewed active rule versions with source provenance.
4. Extract rule-variable dependencies; select minimal authoritative source ports; obtain scope-limited facts with source revision, observed/valid dates, trust grade and expiry (never private database reads).
5. Normalise and validate type, canonical identifiers, evidence, temporal consistency, source/tenant scope, contradictions, completeness and confidentiality. Missing/stale/unsupported/conflicting critical fact → precise unresolved/unsupported response.
6. Evaluate **all** applicable rule groups deterministically, combining obligations/conditions without allowing weaker tenant preferences to defeat statutory restrictions. Refuse to invent precedence in conflicting laws.
7. Return scoped applicability decision, obligations/controls, restrictions, supported coverage, missing facts, evidence and rule/fact version refs, evaluated and review-by times. Read-only queries need not always persist a durable decision.
8. For consequential decisions, holds and obligations, commit versioned state and capability-owned transactional outbox atomically; use optimistic concurrency and idempotency keys; distinguish accepted request from completed owner action.
9. Coordinate downstream enforcement via public ports/event subscriptions; accept domain receipts, reconcile missing/partial confirmations, publish changed status and retain accountable audit references.
10. Repeat on impacted fact/rule change, scheduled check, explicit qualified review or recovery reconciliation; never treat delivery/replay or cached result alone as final legal clearance.

**Execution channels:**
- **On demand:** bounded-latency synchronous assessment for a domain's legally gated action; source lookup timeout or unsupported scope holds only the affected unsafe act.
- **Event-driven:** source-owned durable outbox event carries source ID and revision; Message Queue transports at-least-once; Legal Compliance deduplicates, re-fetches current authoritative facts, invalidates only dependent assessments and requalifies.
- **Scheduled:** Legal Compliance specifies rule/hold review, filing/reconciliation deadlines with Clock semantics; Scheduler executes due tasks and recovery; Notifications communicates, Workflow may route approvals.
- **Human-assisted:** qualified evidence/review case with revision checks and optional dual control. Native protected reviewer commands and pending-list query work without Workflow.
- **Recovery:** durable checkpoints and periodic reconciliation identify lost/out-of-order events, expired evidence and unconfirmed holds; no impossible claim of globally exactly-once outcomes or unlimited live legal-source availability.

**Performance:** index rule dependencies and impact scope; immutable approved rule bundles and bounded derived assessments may be cached by tenant/activity/jurisdiction/fact+rule revisions/time. Cache is never authority, cannot cross tenancy/privacy boundaries, and high-risk finalisation revalidates freshness/concurrency. Prefer incremental impact matching, bounded batching and observable lag over expensive full scans. Stateful Legal Compliance owns its schemas/migrations/storage port and durable outbox; host provides infrastructure, never business tables.

## 5. Human review, worklist and message-queue boundary

**Legal Review Worklist** is a protected filtered view of Legal Compliance’s **pending legal cases**: candidate interpretations, evidence deficiencies, holds/releases, disputes, conflicts, regulatory change impacts and requalification. It is not a message queue, not a second Workflow engine and not an authority to grant business permissions.

**Workflow (optional)** provides reviewer task routing, assignment, escalation, separation-of-duty sign-off and multi-person process state; Legal Compliance checks competence, caller assurance, current case/interpretation revision and authorisation before it commits a qualified legal decision. A Workflow step marked complete is not a legal conclusion. Without Workflow, minimal `submitForReview`, `requestEvidence`, `decideReview` and `listReviewCases` remain native.
**Message Queue** transports committed domain/outbox events, controls delivery/retries/dead letters/replay and owns no human legal dossier or review approval. Event delivered ≠ review approved ≠ domain hold enforced ≠ external filing accepted.
**Scheduler** executes due-time work; **Notifications** sends communications; **Audit** receives proportionate evidential assertions; **Logging** records sanitised diagnostics; **Observability** measures service health. None becomes a legal interpretive authority.

## 6. Idealised published public input contract (not implemented)

| Interface (illustrative semantic name) | Authoritative source/input | Preconditions, validation, failure semantics |
|---|---|---|
| `evaluateApplicability` | Trusted host/domain: subject/activity, jurisdic­tion, legal entity, service facts/refs, effective/as-of time and purpose | Required for legally gated action; fact versions/provenance and tenant/permission verified; returns scope-specific typed `unresolved` or `unsupported`, never default permission |
| `describeCoverage` | Authorised tenant/host, jurisdiction/service scope | Returns coverage, review freshness, source/rule versions and limitations, not implied full legal support |
| `proposeSource`, `proposeRuleRevision` | Source curator/Integrations: official reference, amendment, jurisdiction, source dates, candidate rule and legal rationale | Untrusted feeds/AI cannot self-approve; validate licence, source trust and code-free rule grammar |
| `submitReview`, `recordReviewDecision` | Competent legal reviewer, optionally Workflow approval evidence | Protected role, recency, separation of duties if applicable; stale version conflicts or unverified competence refuse |
| `requestHold`, `reviewHold`, `releaseHold` | Authorised requester and qualified legal evidence of scope, competent basis and effective period | Reject overbroad/unsupported hold, prevent unauthorised release, preserve other independent holds and rights |
| `registerObligation`, `reassessRequirements` | Approved interpretation and trusted entity/activity trigger, source changes or scheduled event | Validate legal authority and subject facts; do not let ordinary tenant admin create “statutory” obligation by unchecked assertion |
| `recordControlReceipt`, `recordFilingOutcome` | Enforcing domain or authorised Integrations filing evidence: applied rule ID, resource, revision, completion and evidence ref | Authenticated producer, correlation/idempotency, duplicate/out-of-order handling; provider success != regulator acceptance |
| `submitException`, `recordCorrectiveOutcome` | Domain/control owner, Audit findings or authorised reviewer | Evidence and actual owner action required; risk acceptance cannot waive mandatory duty |
| `requalifyFromEvent`, `executeDueAssessment` | Source outbox, Scheduler, Workflow callback under host-composed ports | Idempotent, scoped, versioned; missing critical dependency yields pending/unresolved and recoverable task |
| IAM caller/access ports | Host-composed IAM Integration `resolveCaller` and `decide` semantics backed by Identity/Authentication/Authorisation, resource-scoped and assurance-aware | Required for protected operations; deny, step-up or unavailable cannot be treated as permit; façade currently conceptual, host-composed verified adapters are transitional |
| Other host ports | Clock, owned persistence/outbox, authorised fact resolver and optional Workflow/Scheduler/Integrations | Required ports fail closed; missing optional provider uses manual/native alternative with explicit loss of functionality |

**Common context where needed:** source/tenant/actor assurance, public resource reference, source revision, correlation and idempotency, rule/effective/known-at dates, evidence provenance, disclosure class and outcome. This is a set of semantics, **not** an imposed universal request object or fixed HTTP route.

## 7. Idealised public output contract (not implemented)

| Output | Intended consumer and meaning | Non-guarantees / lifecycle |
|---|---|---|
| `ApplicabilityDecision` | Domain, Privacy, specialised service: jurisdiction- and time-qualified applicable/not-applicable/unresolved/unsupported outcome, obligations, restrictions and source versions | Not Authorisation, tax calculation, permission grant, complete legal certification or proof of domain enforcement |
| `ObligationCatalogue/Status` | Compliance staff, Scheduler, Workflow, Reporting: duty, owner, trigger, due date, required control/evidence and qualification | Due reminder, sent form and “completed workflow” do not equal regulator acceptance |
| `ControlRequirementMap` | Domain owner and Audit/Reporting: required safeguards, applicability, evidence contract and expected control outcome | Domain owns actual implementation and efficacy; Legal Compliance should not assert coverage without receipt |
| `HoldInstruction/Status` | Data owners/Privacy: precise restriction, scope/authority and review/release status | Legal instruction differs from actual preservation; domain must report partial/failed outcome |
| `Source/Qualification/Coverage` | Competent reviewer and authorised domain: approved source version, effective/known-at dates, evidence, exclusions and review-by | Unknown and stale must be visible; privileged advice redacted for ordinary users |
| `ReviewCase/Decision` | Worklist and optional Workflow adapter: case version, reviewer competence, request, approval/decline and legal decision | Task routing never grants legal validity automatically |
| `Exception/Impact/Effectiveness` | Compliance officers, Reporting, control owners: gaps, risk context, corrective requirements, evidence quality, remediation and freshness | No single “compliant” boolean or unsupported quantitative assurance |
| `HistoricalAssessment/ExportRefs` | Authorised auditors / Reporting / Export workflow: as-of and known-at provenance references | Domain originals, Audit integrity, Publisher documents and exporter bytes stay with their owners |
| `legal.*` committed events | Message Queue to authorised subscribers: source change, rule activation/withdrawal, hold, obligation, review, impact and corrective status change | At-least-once/replay; delivery receipt does not prove downstream commit or statutory acceptance |

All outputs include stable versioning and reason/message keys, tenant/purpose disclosure filtering, supported completeness and safe distinction of accepted, pending, applied and confirmed outcomes. Source operations, not a generic event, grant business permissions. Changes to contract members require independent compatibility review.

## 8. Cross-capability coordination and absence

| Capability | Inputs received by Legal Compliance | Outputs / boundary with that capability |
|---|---|---|
| IAM Integration (Identity, Authentication, Authorisation, Profile) | Trusted principal/tenant/group standing, verified session assurance, resource-scoped Authorisation decision and IAM lifecycle status via one host-supplied façade | Legal constraints, holds and reviewer qualification; IAM Integration coordinates but does not own the four members' records or decisions, and collects partial/failed/unknown member receipts |
| Verification and legal-entity authority (open) | Attestation/provenance, credential and company authority evidence | Qualify age/KYB/recognition duties; cannot infer corporate legal standing from platform role |
| Configuration / Privacy / Profile | Approved activity/site assertions and privacy rights/retention context | Mandatory legal floors, hold exceptions; Configuration owns settings, Privacy specialist decisions, Profile personal data |
| Accounting, Billing, Invoice, Order, Payment and finance | Place of supply, transaction, entity, dates and regulated activity | Legal requirements/filing/retention conditions; financial owner calculates, records and files |
| Marketplace, Publisher, Comments, Content Security, Moderation, Search, Federation, Media | Actual service/audience/activity content and enforcement evidence | Qualified content/online safety/child protections; domain performs takedown, moderation owns case |
| Recruitment, Employment, Job, Course, Qualification, Credentials, Assets | Regulated purpose, jurisdiction, role/resource and accountable evidence | Labour/safeguarding/credential/licensing/retention requirements; operational owners enforce |
| Integrations | Source/regulator feeds, provider provenance and delivery/receipt evidence | Provider-neutral lawful transfer/filing conditions; provider delivery != regulator acceptance |
| Audit, Logging, Observability, Reporting | Audit references, secure diagnostics/health, control evidence | Risk-based evidence assertions; authorised compliance read models, never replacement of legal truth |
| Clock / Scheduler / Workflow / Message Queue / Notifications | Trusted time, due-work receipt, approval evidence, committed transport acknowledgements | Legal obligation/assessment triggers, human work requests, change events and scoped alerts |
| Storage / Caching / source domain persistence | File/class refs, retention/derivative preservation/disposal receipts | Narrow hold/legal transfer constraints; source owners control bytes, backup/derivative lifecycle |
| UI / Theme Manager / host | Presentation tokens and navigation/authorised caller context | Optional legal dashboard, filters and workflow actions using public contracts only |

**Dependency rule:** these are conceptual public information-flow edges, not reciprocal direct package imports. Hosts resolve directional ports to avoid cyclic dependencies. Only required verified infrastructure and authority ports fail closed; optional services have specified degraded/manual modes. In a modular monolith, logical separation suffices; a remote legal database, notification service or legal feed is not compulsory.

## 9. Enterprise compliance-management operation (LC-09 / LC-11 / LC-12)

### Approved REV-01 — reviewer competence and sign-off controls

**Independent checks:** Authorisation establishes that the caller may use a review action; Verification or accepted evidence establishes professional credentials/organisation claims where necessary; Legal Compliance determines whether that person's competence, jurisdiction, subject specialism, mandate and independence meet **this particular legal review requirement**. A Workflow task marked completed is not a legal decision.

**Reviewer qualification profile:** verified principal/reference; competence class and documented basis; professional register/accreditation when legally required; subject and jurisdiction scope; delegator/mandate source; effective/expiry/revocation status; independence/conflicts; assurance/step-up recency and evidence permitted for disclosure. External counsel may review with purpose-scoped access without blanket tenant membership. Where professional title/activity is legally restricted, enforce the independently validated qualification requirement; do not imply every compliance specialist must be a solicitor.

**Recommended approval routing matrix:** repeat deterministic applicability of a *previously approved* rule — no new human sign-off; clerical evidence correction — authorised caseworker with attribution; new/amended binding legal interpretation — competent qualified reviewer; cross-border conflict, significant prohibition, contested corporate mandate, high-consequence hold or release — independent second reviewer under risk/legal policy; emergency action — only a legally justified narrow time-limited route with mandatory retrospective review, never an unchecked permanent exception. This is the architectural starting matrix; statutory category-specific floors and threshold figures belong to legally qualified deployment profiles.

**Commit validation:** re-read case, rule and evidence revisions; check caller and independent approver are different where required, competence/current delegation/assurance, conflicts, statutory mandatory steps and recorded rationale; refuse stale approval, self-approval, expired or revoked mandate. Record approved/refused/awaiting-evidence with attributable evidence and qualified scope; Workflow may route, but Legal Compliance commits; Audit preserves independent review evidence. An unavailable professional register/provider produces explicitly pending/indeterminate proof, not silently qualified approval.


Use **ISO 37301:2021** as the principal CMS design reference, not an assertion of certification. Model a lifecycle: **identify legal context and obligations → qualify and assign responsibility → map controls → implement via domains → monitor outcomes and evidence → assess effectiveness → correct/improve → requalify changes**. Each organisation can see its scoped responsibilities and control coverage while legal interpretation versions may be shared where licensed and qualified.

Use **ISO 37302:2025** to assess whether controls operate effectively. Distinguish: (i) rule understood, (ii) required control implemented by owner, (iii) evidence received, (iv) effect tested/observed, (v) deficiency remediated and independently verified. Do not count ticked tasks or “no known incidents” as evidence of legal compliance. Control effectiveness indicators may include verified coverage, review overdue rates, time to apply holds, percentage unconfirmed domain receipts, evidence staleness, recurrent control failures and effectiveness of corrective action. Reporting owns presentations/aggregates; Legal Compliance owns qualified obligation/control mappings and interpretations.

Use **ISO 31000:2018** for risk-based worklist prioritisation, likelihood/consequence and proportionate assurance. Legal significance overrides any user-tuned risk score. Use **ISO 19011:2026** to inform competence, independence, audit programme and evidence-based assessment; Audit retains evidence ownership, and professional legal interpretation remains with competent reviewers. Periodic management review and operational corrective actions are real lifecycle steps, not generic “approved” flags.

**Evidence lineage and records:** use W3C PROV-O concepts (source entity, evaluating activity, responsible agent) and **ISO 15489-1:2016** records principles for attributable creation, preservation, confidentiality, lawful disposal, supersession, historical reconstruction and controlled evidence access. No automatic RDF/triple store or immutable-forever policy; preservation restrictions remain lawfully bounded.

## 10. Security, privacy, regulatory and standards mapping

### Approved COV-01 — supported jurisdiction and activity coverage

**Coverage is a qualified product of jurisdiction × territorial reach × regulated activity/service features × legal subject × rule/source effective interval × competent review**, not a global country-enabled Boolean. The initial **UK-first reference profile** treats England and Wales, Scotland and Northern Ireland separately where extent/application/commencement differ; UK-wide provisions are identified explicitly. UK-first is a *curation priority*, not a claim that any UK law or regulated activity is already implemented, legally verified or sufficient for a deployment.

**Coverage entry contract:** `coverageProfileId`, jurisdiction and territorial applicability, activity/service taxonomy, legal subject, official source and amendment/commencement refs, optional regulator guidance, supported/excluded operations, approved interpretation/bundle version, reviewer's qualified scope, `legalEffectiveAt`, `knownAt`, last verified and review-by, freshness/source-license conditions and coverage result (`supported`, `limited`, `unresolved`, `unsupported`, `stale`). Limited coverage lists exclusions and returns qualification per obligation rather than broad clearance. Public disclosures never imply worldwide or whole-jurisdiction compliance.

**Initial curation candidates** (each requires individually competent source qualification before activation): organisational identity/representation; UK GDPR/data rights interactions; preservation and legal holds; online trading/marketplace disclosure; recruitment/employment; online safety/safeguarding. The service may operate with reviewed native/local bundles when external legal feeds are absent; an unreviewed source import is a candidate only. Managed centrally curated bundles and tenant-specific qualified extensions have separate origin, licence, trust and approval evidence. A tenant can never waive an applicable statutory requirement with a feature flag.

**Coverage activation procedure:** identify exact applicable regulator/source and constituent jurisdiction, assess legislation/current amendments/commencement, establish regulated activity and exclusions, independently qualify interpretation and competence, validate restricted rule semantics/golden scenarios, approve version, activate effective schedule, publish explicit coverage entry and consumer conditions, schedule periodic review and source-change invalidation, and reconcile domain enforcement. A new market or activity outside the profile is returned as `unsupported` or `unresolved` and routed to legal review only for the affected legally gated operation. The project can close its *conceptual* review without predetermining every licensed source, professional reviewer or date of future deployment readiness.


| Reference | Design use | Status/limitations |
|---|---|---|
| [ISO 37301:2021](../../../RESOURCES.md#iso-373012021) | Compliance system responsibilities, obligations, operational monitoring, improvement | Principal non-normative design reference; does not certify platform/tenant |
| [ISO 37302:2025](../../../RESOURCES.md#iso-373022025) | Evaluate effectiveness using independent evidence and corrective feedback | Non-normative guidance, not a boolean conformity test |
| [ISO 31000:2018](../../../RESOURCES.md#iso-310002018) | Risk-driven prioritisation, escalation and review | Never reduces mandatory legal floor |
| [OMG DMN 1.6](../../../RESOURCES.md#omg-dmn-16) | Decision-table/typed rule modelling and possible interoperability | Adopt restricted concepts; no full runtime compliance claimed |
| [W3C PROV-O](../../../RESOURCES.md#prov-o) | Source/reviewer/evaluation lineage and provenance references | No compulsory RDF store |
| [ISO 15489-1:2016](../../../RESOURCES.md#iso-15489-12016) | Evidence/records lifecycle and accountability | Not identical to statutory records-retention schedule |
| [ISO 19011:2026](../../../RESOURCES.md#iso-190112026) | Audit competence, review independence, programme design | Guidelines, not a product certification |
| [ISO/IEC 27001:2022](../../../RESOURCES.md#isoiec-270012022) + 2024 amendment | Confidentiality, integrity, access, change and incident assurance | Management-system reference; no ISO certificate asserted |
| [ISO/IEC 27701:2025](../../../RESOURCES.md#isoiec-277012025) | Privacy governance, rights/evidence coordination | Privacy capability retains specialist ownership |
| [NIST SP 800-53 Rev. 5](../../../RESOURCES.md#nist-sp-800-53-rev-5-au-2au-3au-6au-9au-11) | Appropriate AC/AU/CM/RA/SI/CP control mappings | Reference catalogue; jurisdiction/project applicability assessed separately |
| [NIST OSCAL](../../../RESOURCES.md#nist-oscal) | Optional machine-readable control profiles, assessment mapping/export | No mandatory full OSCAL native data format |
| [OWASP ASVS 5](../../../RESOURCES.md#owasp-asvs-500) | Authentication, access control, validation, logging, secure APIs | **Existing governing ASVS Level 2 baseline**, Level 3 where critical |
| [WCAG 2.2 AA](../../../RESOURCES.md#w3c-wcag-22) | Review/editing dashboards, colour/keyboard/screen readers | **Existing governing accessibility baseline** |
| [ISO/IEC 42001:2023](../../../RESOURCES.md#isoiec-420012023) | Optional AI governance for assisted legal-source extraction and review | AI remains an untrusted assistant to competent reviewer |
| [ISO 22301:2019](../../../RESOURCES.md#iso-223012019) | Continuity/recovery for deadlines, holds and required controls | Host/infrastructure recovery remains independently owned |

**Legal sources are not replaced by technical standards.** For actual statutory applicability inspect effective legislation and regulators for the legal entity, nexus, service, audience and relevant time: e.g. [UK legislation.gov.uk](../../../RESOURCES.md#uk-legislationgovuk), [ICO](../../../RESOURCES.md#ico-2), [Ofcom](../../../RESOURCES.md#ofcom). Existence of an Online Safety Act feature, UK GDPR process, file scan, ISO mapping, publication of a notice, or third-party provider licence is never a universal compliance claim.

**Threats and controls:** spoofed legal sources and regulator demands, malicious legal-text prompt injection, rule poisoning, compromised reviewers, self-approval/policy capture, stale cached favourable decisions, cross-tenant legal-case disclosure, hold denial or indefinite preservation, evidence forgery, missed deadlines, provider uncertainty and cross-domain confused-deputy execution. Require strong scope/authorisation, minimum necessary disclosure, source attestation, reviewer independence, trusted time, least privilege, tamper-evident audit references, secure key/secrets boundary, backup/recovery and protected rule activation. Legal source documents are untrusted data; no arbitrary code or AI-authorised decisions.

**International operation:** support explicit jurisdictional coverage matrix rather than universal country “on/off”. Territorial scope, law types, cross-border conflicts, mandatory translations, evidence localisation, regulator relationship, authority competence, effective dates and legal-text redistribution licences require qualified verification. Unsupported markets return `unsupported`, not approval.

## 11. GUI, headless and hosted composition

An optional host-owned sidebar entry `Capabilities → Legal Compliance` opens a role-restricted dashboard. It includes: supported-jurisdiction/activity coverage, evidence freshness, obligations/deadlines, legal source register and interpretation diffs, controls/effectiveness, legal holds with **legal versus actual enforcement** state, impact/exception review, **Legal Review Worklist**, qualified approval/sign-off evidence, corrective action monitoring, regulator submission provenance, as-of historical lookup, safe audit export, and integration/provider health.

Tenant administrators get business-language activity onboarding and scoped instructions; ordinary domain operators see only contextual blocking reason/action to take. Competent reviewers see fuller legal citations and privileged evidence; host operators see operational health only. Reject unauthorised cross-tenant worklist searches and undue disclosure through autocomplete, export or notifications.

All presentation consumes published conceptual contracts (no private table import); host owns navigation/routing and server caller context; optional independent headless mode provides the same legal decision/hold/review semantics. Theme Manager semantic vocabulary, internationalisation (without changing authoritative source text), responsive layouts, keyboard operation, screen-reader labels, clear unknown/degraded states and WCAG 2.2 AA are required. `nuxt-layers-test/application-test-template` is a representative future acceptance host, not an implementation change.

## 12. Operating interactions and use cases

This section is part of the **current conceptual design**. The following relationships are deliberately expressed through authoritative public inputs and outputs, not assumed package imports. Real-world legal duties, source dates, approval competence and enforcement must be qualified for the affected jurisdiction and service. **Source event delivered**, **legal decision approved**, **domain action completed** and **external authority accepted** are separate outcomes.

### 12.1 Detailed cross-capability interactions

| Source / cooperating capability | Trigger and facts provided to Legal Compliance | Qualified Legal Compliance output | Owning action, evidence and absence behaviour |
|---|---|---|---|
| **IAM Integration (composed Identity, Authentication, Authorisation and Profile)** | Caller/tenant/group scope, assurance recency, resource-specific permission/step-up result, and lifecycle operation progress from authoritative IAM owners | Holds/retention conditions, qualified reviewer constraints and governance restrictions; members enforce their own changes and return actual receipts | IAM Integration coordinates and supplies trusted public ports, not IAM data/decision ownership. Missing required access/assurance fails safely; no direct database access to members |
| **Authorisation behind the IAM façade** | Role/grant and permission decisions for each specific protected legal action, including `deny`, `step_up`, `unavailable` | Legal conditions and professional competence are **additional** checks, not Authorisation policy replacement | An authorised user may lack legal competence and a legally permissible action may be unauthorised; never infer privilege from group standing or legal opinion |
| **Verification / external corporate authority** | Verified legal-person/capacity and professional standing evidence, with source provenance | Legally relevant governance and review constraints, not an IAM grant | Verification authenticates claims; corporate facts remain with independent competent sources |
| **Configuration / Organisation onboarding** | Approved service assertions, operating regions, controller descriptions, tenant/site revisions, proposed governance policies and effective dates | Mandatory legal boundaries, uncertainty/coverage and rule-change impact | Configuration stores approved settings but cannot override statutory/security floors. Unverified assertions never automatically qualify the organisation |
| **Privacy / Profile / source data owners** | Purpose, right-of-access/correction/erasure request, record classes and lawful-purpose/retention assessment | Jurisdiction-qualified preservation exception, legal-hold status, disclosure/transfer duty and necessary reasons | Privacy owns data rights/consent and its specialist retention policy; source owner acts on actual data and supplies complete/partial/deferred receipts. A hold covers only justified records, not a blanket block on unrelated erasure |
| **Accounting / Billing / Invoice / Order** | Place of supply, entity/party, activity, taxable/relevant event, financial instrument/transaction and effective date, evidence references | Tax/regulatory framework and disclosure/retention/filing constraints, statutory minima, uncertainty and conflict; **not** a calculated tax amount | Accounting owns ledger and statutory return facts, Billing charge assessment, Invoice issued legal document; Integrations transports filings. Missing mandatory classification holds only impacted finalisation; successful transmission is not authority acceptance |
| **Integrations / regulator and government portals** | Official source update, provider legal/source provenance, processor/residency details, transmission/receipt and external acknowledgement | Lawful transfer/filing conditions, approved source candidate status, destination restrictions and unresolved obligations | Integrations handles connection credentials, authenticated transport and retries. External feed alone does not approve legal interpretation; acknowledgement alone is not statutory acceptance |
| **Publisher / Content Editor / Export** | Planned publication/notice, document source/version, jurisdiction, disclosure context and output purpose | Statutory notice/disclosure, licensing, preservation, accessibility and effective-date constraints | Publisher owns authored notices and publication lifecycle, Content Editor is presentation, Export statelessly renders supported output; published statement or technically valid PDF does not prove compliance |
| **Media / Comments Engine / Content Security / Moderation** | Service category, audience/age context, content/action references, moderation reports and detector provenance | Qualified online-safety/child-protection/notice/retention duties, service-specific risk and reporting requirements | Content Security owns detection evidence, Moderation cases/appeals, domains visibility/removal and enforced restrictions. Never assert universal scanning obligation, an exemption for closed groups or automatic regulator conformity |
| **Search / Federation / external index** | Public content visibility and distribution/retraction scope; actual service classification | Applicable publication, disclosure and withdrawal obligations with dates/source | Originating domains own content and restrictions; Search/Federation maintain derived indexes or replication. Takedown instruction is not proven across remote copies without acknowledgements |
| **Job / Recruitment / Employment** | Job advert, applicant processing purpose, employer jurisdiction, worker classification or verified recruitment circumstance | Applicable employment, equality, safeguarding, working-eligibility, anti-discrimination, agency/background-check, protected-data and automated decision restrictions, privacy, evidential and publication requirements | Job owns vacancy facts, Recruitment applicant lifecycle, Employment workforce records; each enforces and reports outcomes. Qualifications and local legal classifications require evidence, not generic worldwide assumptions |
| **Course / Assessment / Qualification / Credentials** | Learner age, jurisdiction, scheme, issuer/accreditor delegation, claims and award lifecycle | Safeguarding, education/accreditation, recognised award authority, retention/withdrawal and disclosure requirements | Course owns learning content, Qualification award decisions, Credentials claim issuance. Platform role is not external accreditation; external recognition must be independently evidenced and time-scoped |
| **Asset / Inventory / Storage / Caching** | Asset/custody type, record class, file/derivative/backup retention and physical enforcement progress | Narrow lifecycle, inspection, disposal/retention, legal-hold and transfer constraints | Each source owner implements restriction/disposal; Storage owns bytes and provider operations; Caching owns derived-copy eviction. Hold release is not automatic deletion; backup/provider uncertainty must remain explicit |
| **Audit / Logging / Observability / Reporting** | Source-domain completion evidence, anomaly/diagnostic metrics, authorised reporting request and scope | Legally qualified decision/obligation/control/effectiveness provenance and review outcomes | Audit preserves independent tamper-evident evidence; Logging sanitised operational diagnostics; Observability metrics/health; Reporting derived measures and exports. Neither a dashboard nor audit receipt confers legal validity |
| **Workflow / Scheduler / Message Queue / Notifications / Clock** | Approval provenance/reviewer identity, due-time receipts, committed source events, delivery acknowledgements and canonical temporal semantics | Legal review cases, obligations/deadlines, events, review triggers, safe recipient/reference notifications | Workflow coordinates human sign-off routing; Scheduler timed execution; Message Queue delivery/retries; Notifications communication; Clock temporal semantics. Legal Compliance alone commits legal review/hold state. Transport and workflow completion cannot stand in for actual enforcement |

**Dependency/authority discipline:** source owners authenticate producers, provide minimal verifiable facts and revisions, and apply their own business invariants. A Legal Compliance consumer may subscribe to an event for invalidation, but must re-fetch authoritative facts through a documented port. Cross-capability communication is host-composed to keep the dependency graph acyclic. **Missing critical legal evidence is an unresolved result for that unsafe operation, not an entire tenant shutdown by default.**

### 12.2 User-driven end-to-end journeys

**UC-01 — New online marketplace or content service.** The tenant administrator declares business activities and regions in a business-language form. The service-owning capability supplies effective content, seller and audience behaviour. Legal Compliance loads the relevant approved jurisdictional rule versions and checks qualified evidence. The result is an obligations/control list with conditions and a provenance/review date; uncertain classifications become a Legal Review Worklist case. The domain gates only relevant unsafe activation, reports its actual safeguards, and ordinary operators see an actionable reason rather than raw legal advice.

**UC-02 — New law, amendment or regulator guidance.** A curator or Integrations supplies a verified candidate primary-source citation with publication, amendment, commencement and territorial context. Legal Compliance marks it *candidate*, compares previous interpretations, maps affected variable dependencies and creates a qualified-review case. An independent reviewer approves only the supported interpretation; activation and scope-specific requalification then run by effective date. Historical known-at decisions are retained. Provider feed failure, unavailable legal text or licensing limitations remain explicit; none creates a new binding rule automatically.

**UC-03 — Regulated financial operation.** Billing/Invoice sends trusted entity, service, counterparty region, transaction and effective-time references. Legal Compliance returns relevant qualified statutory reporting, disclosure or retention constraints and uncertainty, not the tax computation or journal. Billing/Invoice/Accounting independently validate and commit their own outcomes; a missing mandatory condition blocks the affected operation rather than all financial activity. Integrations delivers any authorised filing and distinct regulator acceptance evidence is reconciled later.

**UC-04 — Legal preservation demand.** An authorised records/legal requester submits legal basis, competent authority evidence, narrow records/classes, start/review time and reason. Legal Compliance verifies scope, competence and proportionality, requires independent approval where appropriate and commits the hold. A committed hold event is transported to affected source owners, which report preservation as \`completed\`, \`partial\`, \`failed\` or \`unknown\`; worklist and incident escalation surface incomplete propagation. Release is reviewed independently and cannot silently cancel other lawful restrictions.

**UC-05 — Erasure request during a hold.** Privacy/Profile receives a rights request and identifies affected classes/owners. Legal Compliance returns narrow statutory/legal-claim preservation constraints with effective period and competence provenance. Privacy and data owners complete erasure of unaffected material and restrict/preserve covered material as lawfully justified, reporting partial completion and downstream-copy limitations. Expiry triggers reassessment, not unconditional release or indefinite retention.

**UC-06 — Disputed company or tenant control.** A claimant presents a challenged controlling-party relationship or governance instrument. IAM Integration supplies Identity-owned digital governance and the Authorisation-owned access decision through host composition; Verification supplies source authenticity but cannot adjudicate legal corporate control. Legal Compliance qualifies legal authority, restrictions, preservation and appeal safeguards. IAM Integration coordinates the authorised member-owned governance process, optionally using Workflow; only the owning IAM member commits a permitted digital transfer. No company title or legal opinion bypasses IAM.

**UC-07 — Upcoming filing, statutory notice or periodic obligation.** An effective qualified obligation registers trigger, due time/timezone, accountable owner, source revision and expected evidence. Scheduler raises due checks, Notifications sends reminders and Workflow routes reviews where configured. Domain owner prepares the filing or notice; Integrations transmits it if needed. Legal Compliance sees \`submitted\` versus \`receipt_unconfirmed\` versus \`fulfilled\` distinctly, records corrective needs for overdue or failed outcomes and never treats a successful MQ delivery as completion.

**UC-08 — Cross-border service and conflicting obligations.** Authoritative activity facts identify multiple jurisdictions, or a customer opens in an unsupported market. Each supported regime is qualified separately, with scope, effective law, exemptions and missing proof. Unresolved conflict or unsupported mandatory qualification causes a narrowly targeted restriction and competent legal review; there is no implicit worldwide legal support or automatic selection of the weakest requirement.

**UC-09 — Employee/learner/credential safeguarding.** Recruitment or Course sends actual service, age/eligibility, country, issuer/accreditor and purpose-relevant facts, not unnecessary personal dossiers. Legal Compliance returns employment, safeguarding, accessibility, recognition and retention conditions for that precise scenario. Recruitment/Qualification/Credentials enforce their own steps and supply completed outcomes. A platform-admin role cannot create an external professional licence or accredited award.

**UC-10 — External publication and downstream removal.** Publisher/Comments proposes public content; Moderation or a regulator later raises a restriction. Legal Compliance qualifies service-specific disclosure, takedown, retention and reporting obligations. The source owner commits a visibility/removal transition; Search/Federation and caches acknowledge their own derived-copy updates. If remote removal is unconfirmed, the review status remains partial rather than declaring universal takedown.

### 12.3 Concise example of the full interface exchange

1. A domain supplies \`tenantScope\`, \`resourceRef\`, \`activity\`, \`effectiveAt\`, source fact revisions and \`purpose\` in a server-authorised \`evaluateApplicability\` request.
2. Legal Compliance returns \`decisionId\` (if persisted), \`applicability\`, \`sourceAndRuleVersions\`, \`requiredControls\`, \`missingFacts\`, \`reviewBy\` and a minimised reason. If outside coverage or critical evidence is stale, the result is \`unsupported/unresolved\`, not \`false\`.
3. If legally gated, the domain rechecks current state and enforces the decision within its own invariant transaction; the domain owns the business result.
4. Its committed event and \`recordControlReceipt\` report applied rule version, affected resource, source revision and \`accepted / completed / partial / failed / unknown\`. Message Queue may transport events; it never becomes a human review queue.
5. Legal Compliance reconciles an obligation/control state and, when appropriate, raises a review or corrective-action requirement; Audit records independent evidence and Reporting derives authorised summaries.

## 13. Conceptual end-to-end acceptance scenarios


| ID | Input / trigger | Expected observable result and distinct owners |
|---|---|---|
| ACC-01 | Administrator creates a new marketplace activity with fully verified supporting facts | Legal Compliance evaluates approved rules, gives applicable conditions; Marketplace enforces; ordinary admin cannot approve new law |
| ACC-02 | New legal amendment imported from external feed | Candidate remains unapproved; reviewer verifies source/effective reach; impact index identifies affected tenants and services; no silent activation |
| ACC-03 | Domain asks to finalise a regulated transaction with insufficient critical facts | Typed `unresolved`, missing-fact reasons and only affected unsafe action withheld, no permissive default |
| ACC-04 | Reviewer approves source version, but underlying facts changed during sign-off | Revision/concurrency conflict forces renewed assessment; no stale approval |
| ACC-05 | Law amended retroactively | Original historical known-at decision preserved; linked current legal as-of requalification explains difference |
| ACC-06 | Legal hold approved for narrow records; event delivered but domain fails preservation | Hold is effective; physical enforcement remains partial/failed, urgent exception/evidence and retry; no false compliance |
| ACC-07 | Hold release proposed while separate lawful duty still prevents erasure | Review release; other restrictions remain; domain/Privacy decides disposal and confirms actual copies |
| ACC-08 | Subject rights request with disputed retention/legal hold | Privacy and Legal Compliance qualify narrow exceptions; unrelated data processed; no indefinite blanket retention |
| ACC-09 | Two-country service has contradictory duties | Separate scoped determinations with explicit conflict; qualified review; no weakest-rule shortcut |
| ACC-10 | External regulator gateway accepts transport but not filing | Integrations status sent; filing remains receipt-unconfirmed; legal obligation not marked fulfilled |
| ACC-11 | Message Queue duplicates/replays or delivers out of order | Event identity/revision deduplication; authoritative refetch; no duplicate reviews/holds; independent decision history |
| ACC-12 | Scheduler misses a deadline then resumes | Reconciliation flags overdue obligation, preserves original due timestamp and triggers attributable escalation |
| ACC-13 | Tenant owner, platform operator or parent tenant attempts another tenant's privileged legal dossier | Authorisation denies; redaction and audit evidence; no implicit tenant-parent access |
| ACC-14 | Optional Workflow or external legal feed unavailable | Native minimal legal review remains usable; verified local source may continue within freshness bounds; missing critical evidence returns unresolved |
| ACC-15 | Configured feature flag disables an operational control despite mandatory legal duty | Domain refuses unsafe state; Legal Compliance qualification remains effective; no tenant waiver |
| ACC-16 | Effectiveness review discovers control configured but not enforced | Distinct control implementation/evidence/observed-effectiveness states, accountable corrective requirement and independent confirmation |
| ACC-17 | Qualified interpretation reused for a second organisation | Shared rule version reused only after separate fact-supported tenant-specific applicability; no cross-tenant evidence leakage |
| ACC-18 | Optional OSCAL/DMN exchange requested outside supported subset | Explicit supported-format/version contract and rejection, not false full standards-conformance claim |
| ACC-19 | Legal text includes malicious instruction or attempts arbitrary code execution | Treat as untrusted source content; deterministic parser prevents executable side effects; reviewer examines cited text safely |
| ACC-20 | Domain attempts to infer age-assurance completed from legal requirement | Reject inference; required condition and Verification's actual completion evidence separate |

No local tests/builds were run. These are contract acceptance scenarios requiring future CI, contract tests, security assessment, minimal consumer and real-world legal qualification evidence.

## 14. Approved decisions and deployment qualification

| ID | Approved conceptual decision | Status |
|---|---|---|
| LC-01 | Qualified versioned source, interpretation, coverage and organisation-specific applicability with explicit unknowns | **Approved — 21 November 2026** |
| LC-02 | Legal Compliance owns narrow legally authorised holds; source-domain owns actual preservation, release and deletion results | **Approved — 21 November 2026** |
| LC-03 | Stable qualified applicability/obligation/control/receipt public contract; affected unsafe operations fail safely | **Approved — 21 November 2026** |
| LC-04 | Native approved local rule corpus and manual review; external legal providers optional evidence feeds | **Approved — 21 November 2026** |
| LC-05 | Separable role-aware GUI and **Legal Review Worklist**, not a technical message queue; headless parity | **Approved — 21 November 2026** |
| LC-06 | Legal-person/control adjudication remains a separately justified boundary and verified evidence source, not silently reowned | **Approved — 21 November 2026; clarified by LEA-01** |
| LC-07 | Legal hold/statutory constraints reconcile with Privacy rights and domain preservation without duplicating Privacy authority | **Approved — 21 November 2026** |
| LC-08 | Typed evidence variables, restricted deterministic policy evaluation and automatic reassessment, caching, replay-safe recovery | **Approved — 21 November 2026** |
| LC-09 | ISO 37301-inspired obligation/control/evidence/improvement lifecycle and ISO 37302 effectiveness assessment | **Approved — 21 November 2026** |
| LC-10 | DMN 1.6-aligned restricted decision tables/semantics, without requiring full DMN implementation | **Approved — 21 November 2026** |
| LC-11 | W3C PROV-O/ISO 15489-aligned source → interpretation → applicability → control → evidence traceability | **Approved — 21 November 2026** |
| LC-12 | ISO 31000 risk-based prioritisation; ISO 19011-informed independent review, competent approval and measured control assurance | **Approved — 21 November 2026** |
| LC-13 | Security/privacy/records/continuity control mapping and optional OSCAL/GRC exchange; do not claim certification | **Approved — 21 November 2026** |
| LEA-01 | Reuse Verification for qualified legal-entity attributes and representation attestations; authoritative company/control facts derive from competent external or domain evidence; Identity/Authorisation exclusively own digital governance. Create a separate legal-entity capability only when its independent lifecycle is justified | **Approved — 21 November 2026** |
| COV-01 | UK-first, explicitly qualified reference coverage by constituent jurisdiction, regulated activity, authority/source, time and competent reviewer; unsupported coverage never becomes clearance; deployment coverage expands only with legal review | **Approved — 21 November 2026** |
| REV-01 | Scope and verify reviewer competence, jurisdiction, delegation, recency and independence; apply risk-based competent legal review and independent dual control for high-consequence matters, with current-version revalidation | **Approved — 21 November 2026** |
| RULE-01 | Use restricted, deterministic typed, side-effect-free declarative JSON/decision-table rules aligned with DMN 1.6 concepts; independently version grammar, approved bundles and public contract, specify compatibility and unknown states; no full DMN runtime conformance claimed | **Approved — 21 November 2026** |

**Approval:** The capability owner explicitly approved LC-01–LC-13 and the four complementary operating boundaries LEA-01, COV-01, REV-01 and RULE-01 on 21 November 2026. The following are **implementation/profile qualification tasks**, not unapproved architectural boundary decisions.

**Deployment and implementation profile work:** enumerate the first legally validated UK jurisdictions/activities and source licences, appoint competent source reviewers and operational approvers, document professional-counsel confidentiality/appeals and verification methods, set risk/independence thresholds within REV-01, publish the precise RULE-01 operator/hit-policy/unknown/time-zone compatibility subset, qualify filing and hold/retention rules, and specify regulator acceptance/reconciliation per domain. These tasks must precede any claim of actual supported legal coverage or production safety. No blanket international legal validity, full DMN interchange, universal retention schedule or product certification is assumed.

**Future implementation alignment:** published independently usable root `CONTRACT.md` (there is currently none verified), threat model, versioned schemas/events/ports, evidence minimisation, storage register, permitted module/classification packaging, simple single-call Nuxt host composition or independent consumer as appropriate, CI/ASVS/WCAG acceptance, supplier/legal-source licence review, scoped legal validation and rollback/compatibility. A conceptual specification does not approve changing governing ADRs or implementing new repositories.

**Documentation history:** The original conceptual review was merged through PR #85. This canonical specification incorporates approved decisions LC-01–LC-13 and LEA-01/COV-01/REV-01/RULE-01; further implementation and IAM Integration contract alignment remain distinct from conceptual design approval.

---

## Localisation reciprocal conceptual interface — 19 November 2026

**Status: Proposed in Localisation draft PR #86; not independently approved or implemented.** Legal Compliance supplies jurisdiction/effective-date obligations, contractual and safety-warning review restrictions, provider transfer/residency and retention/hold decisions where applicable; Localisation validates those constraints on protected inputs, reviewer qualifications, external disclosure and candidate handoff. A language or region tag does not establish jurisdiction or legal validity; specialist owner approval remains necessary. Legal Compliance does not become a translation-document store. See [Localisation's proposed public contract](../localisation/capability-record.md). This note creates no private import or mutual package dependency and preserves this capability's prior decisions.

## Cross-capability note — Mailer conceptual interface (19 November 2026)

**Status: Mailer-side conceptual boundaries owner-approved (MLR-01–MLR-10, 21 November 2026); neighbouring capability approval/implementation not implied; Mailer PR #90. No public runtime adapter verified.** [Mailer conceptual record](../../services/mailer/services-record.md): Mailer (approved conceptual design) accepts purpose/jurisdiction-specific lawful-send restrictions, mandatory delivery/retention conditions and legal holds as qualified external constraints, enforcing unresolved mandatory restrictions by failing closed. Legal Compliance owns statutory interpretation, not technical email delivery. Email transport/provider acceptance never alone proves compliant service or legal notice. PECR/ePrivacy and UK GDPR/GDPR applicability require qualified jurisdictional review; concurrent Legal Compliance PR is provisional.

**Marketplace standards and regulation — approved Marketplace design context (21 November 2026; PR #91):** Marketplace follows W3C WCAG 2.2 AA, OWASP ASVS 5, ISO/IETF/GS1/Schema.org interoperability where relevant. Legal Compliance, not Marketplace's standards checklist, qualifies which UK/EU/other laws apply by geography, operator role, product/service class, effective date and jurisdiction, including EU DSA trader traceability, EU GPSR product safety, UK GDPR and UK online safety/consumer-product rules. Return versioned effective constraints/qualified evidence; Marketplace executes its own merchant/listing holds, notices, appeal and disclosures. Regulatory duties are not universal technical standards or proof of compliance.


## Reciprocal conceptual interface — Membership (19 November 2026; draft PR #93)

**Status: MEM-01–MEM-10 owner-approved conceptual direction (22 November 2026); not implemented and this does not complete the legal_compliance review.** [Membership](../membership/capability-record.md) is a candidate *scheme participation* domain distinct from Identity group membership, Subscription plan entitlements, commercial settlement and application access. Legal Compliance qualifies applicable cancellation, refund, age/qualification, retention, disclosure and hold duties, with jurisdiction and effective time; Membership applies those restrictions to its own scheme lifecycle. No generic programme rule can override mandatory law. Consume only published public interfaces; no direct package dependency is inferred. Missing, stale, contradictory or unauthorised evidence must not be promoted into confirmed outcomes.

## Moderation — approved current reciprocal contract (PR #96)

**Moderation-side concept approved; not an implemented adapter or an independent approval of this capability.** Legal Compliance supplies qualified service/jurisdiction-specific reporting duties, lawful disclosure, holds and retention rules. Moderation prepares a minimised case handoff; a separately authorised filing actor submits, with transport and regulator acknowledgements distinguished. Neither claims statutory completion without independent evidence. [Canonical Moderation specification](../moderation/capability-record.md). Public versioned, scoped ports preserve source ownership and acyclic package dependencies.


## Policy and Control Map

**Classification:** Legal Compliance-owned read projection and optional presentation, not a standalone artefact. **Approved:** PM-01, PM-02 and supplementary recommendations, 22 November 2026; CLS-06, 24 November 2026, consolidates the former standalone documentation. Implementation and public contract remain unverified.

**Authority:** Governing catalogue, Capability Standard and accepted ADRs apply. Original conceptual baseline: governing `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint `361566988ac53c55f6135e8acfa46cd5b013d7a0`. The Legal Compliance root implementation contract was not found at that review; the interfaces below are idealised, not shipped API names.

### Policy Map: 1. Purpose, ownership and decisions

Policy Map helps an authorised person answer: **which qualified obligation applies, which control addresses it, who is responsible, and what evidence or gap exists?** Legal Compliance may provide an optional, read-only, source-linked **obligation → required control → responsible capability → evidence reference** projection. It must not become an exhaustive directory of every business rule, permission or setting.

**PM-01 — approved, with documentation disposition superseded by CLS-06:** Legal Compliance remains the sole owner of qualified obligations, applicability and obligation-to-control mappings. CLS-06 removes the former compatibility directory after migrating its requirements and references. There will be **no Policy Map package, database, provider adapter, mutation service, outbox, event stream, policy engine, permission system or separate dashboard**. 

**PM-02 — approved:** Legal Compliance may publish a server-authorised read projection and optional **Policy & Control Map** screen in its existing dashboard. The principal view is an accessible table/list; an optional graph uses the same filtered data. Every change opens the relevant owning capability's authorised process.

**Source-of-truth boundaries:** Legal Compliance qualifies legal source and applicability and maintains its own obligation/control mapping; **Authorisation** decides access; **Identity** owns tenant/groups/membership; **Authentication** owns assurance; **Privacy** owns consent and retention policy; **Configuration** owns approved scoped settings; **domains** own actual controls and enforcement; **Publisher** owns policy notices/documents; **Audit** owns accepted evidence; **Reporting** owns derived reports. No map relationship changes these facts or grants lawful authority. Workflow, Scheduler and Message Queue coordinate their own work/transport, never interpret legal duties or make domain decisions.

### Policy Map: 2. Information model and behaviour

An authorised mapping row contains: stable source and relation references; the owner and type of each node; tenant/subject/activity and applicable jurisdiction; qualified interpretation and source revision; effective and observed/as-of times; required control and its responsible owner; permitted evidence reference; data quality, freshness, completeness and disclosure classification. It should link to source records, **not copy their private content**.

The view resolves current or historical source references, checks qualification and access, constructs permitted relationships, and labels **complete for stated scope, partial, not assessed, stale, conflicting, unavailable, unknown or denied** as appropriate. “No visible rows” does not establish that no obligation exists; “control present” does not establish effectiveness or legal compliance. A historical answer must distinguish retained source facts from unreconstructable gaps. Conflicting or invalid source evidence remains unresolved, not silently resolved in favour of permission.

Legal Compliance owns the lifecycle of its obligations/mappings; contributing capabilities own theirs. The view has **no independent write lifecycle**. A source change invalidates or refreshes derived results through owner queries or owner outbox notifications. Notifications can be duplicated or delayed: consumers deduplicate, check revisions and re-query authoritative sources. No exactly-once delivery is presumed. A cache is replaceable and never a decision authority.

### Policy Map: 3. Idealised public input/output contract

These are proposed **Legal Compliance public read surfaces**, not a separate Policy Map contract or established runtime exports.

| Read operation | Caller provides | Returned result |
|---|---|---|
| **Coverage** | Trusted authorised tenant/subject/activity, jurisdiction, optional as-of time, relation/status filters and paging | Permitted obligation–control–owner–evidence links; scope, source/revision, effective time, freshness and explicit gaps |
| **Detail and history** | Authorised obligation/mapping reference; optional revision or as-of time | Qualified source relationship, changes and permitted evidence references; historical unknowns shown |
| **Unresolved coverage** | Authorised scope and optional problem/status filter | Missing or conflicting controls/evidence, stale sources, unassessed areas and owner-routed review links |
| **Snapshot/export** | Authorised scope, as-of/cut-off, filters and disclosure purpose | Redacted, bounded snapshot with provenance, coverage limits and warnings; Reporting/Export may format it |

**Inbound information from other public contracts:**

| Source owner | Input and condition |
|---|---|
| **Identity, Authentication, host and Authorisation** | Trusted tenant/group/caller/assurance and server-side read/disclosure decision. **Essential for protected access**; invalid or unavailable context denies access. |
| **Legal Compliance** | Qualified obligations, jurisdiction/activity applicability, controlled mappings, effective versions and known coverage gaps. **Essential to legal mapping**; unresolved qualification remains unknown. |
| **Privacy / Configuration** | Applicable retention, consent, disclosure restrictions and approved scoped settings with provenance. **Conditional**; never assume missing settings override legal/security floors. |
| **Domain owners** | Control reference, real enforcement/assessment result, revision and supporting facts/evidence references. **Conditional on mapped control**; unavailable yields a gap, not assumed success. |
| **Audit / Publisher** | Independently accepted evidence metadata and published notice/version status. **Conditional**; evidence custody cannot be claimed if unverified, and publication never grants permission. |
| **Clock** | Canonical time semantics for effective/as-of queries. **Conditional** on temporal operations; ambiguous time fails validation or remains unresolved. |

**Outbound consumers:** Legal Compliance's own dashboard/review worklist; authorised domain UIs showing a safe “why/where” reference; Reporting for coverage, gaps, trends and redacted export; Audit users following independently permitted evidence links; Workflow/source-owner administration following protected review links. The map returns **references and qualified coverage**, never a permission grant, standalone legal determination, enforcement receipt, evidential custody promise or blanket `compliant=true` verdict.

**Commands/events:** there are **no Policy Map mutation commands or committed Policy Map events**. Owners manage changes using their authorised, versioned, idempotent commands and emit their own committed outbox events. Accepted requests are not necessarily completed source changes. A view/deep link is not a token to authorise an edit. Consumers must handle stale data, replay, unavailability and source withdrawal.

**Shared invariants:** trusted scope, source identity/revision, tenant separation, qualified applicability/effective time, correlation only when appropriate, permission per node/edge/aggregate, bounded pagination and disclosure, explicit unknown state. No mandatory universal request shape or private-schema reads. Remove inaccessible nodes **and** relationships, counts, side-channel hints and report aggregates before returning data. Protected action execution always rechecks current source facts and permissions.

### Policy Map: 4. Operational and cross-capability interactions

| Partner | Policy/Legal Compliance supplies | Partner supplies back | Boundary |
|---|---|---|---|
| [Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md) | Typed error, source-owned versioned code definitions, trusted correlation, sanitisation policy | Safe code/category/message key and *advisory* retry classification | Pure library; no retries, storage, logging, decisions or events |
| [Logging](../../services/logging/services-record.md) | Sanitised query/source failure codes, latency and opaque correlation | Qualified intake receipt, restricted diagnostics and health | Technical record only; a log receipt is not Audit custody |
| [Audit](../audit/capability-record.md) | Source owners provide selected accountable mapping decisions/revisions and significant access/security events | Accepted/pending/rejected/uncertain evidence custody, integrity and authorised references | Audit owns evidence, not source outcome or legal correctness; ordinary map reading need not create an audit event unless risk rules require it |
| [Reporting](../reporting/capability-record.md) | Authorised source-qualified coverage/gap snapshot, as-of cut-off, incompleteness and redaction | Derived reports, trends, execution/export status and provenance | Derived statistics do not certify compliance; report owners protect rows and aggregates |
| [Workflow](../workflow/capability-record.md) | Permitted unresolved owner-side review reference | Process/review status where selected | The authoritative owner approves decisions; Workflow only coordinates |
| [Observability](../../services/observability/services-record.md) | Safe availability/latency signals via normal public diagnostics | Service metrics/traces/health as authorised | Not a legal coverage or evidence authority |

**Failure example:** a control evidence source times out → the Legal Compliance view returns **partial / source unavailable** → Error Normalisation may provide a safe presentation error → Logging receives a minimal diagnostic → Audit receives an accountable event only where its catalogue requires one → Reporting may show the scoped incomplete result. None may turn an unknown into successful compliance. Each consumer separately enforces tenant, purpose, sensitivity, retention and permissions. These exchanges do **not** mandate direct package dependencies; the host composes acyclic public ports.

**Provider and recovery:** no mandatory SaaS, special graph store or separate persistence. Reuse Legal Compliance's owner-controlled persistence, chosen provider-neutral adapters and source public contracts. Any optional external legal-source or evidence integration is owned by the relevant capability/Integrations and must expose provenance, access terms, withdrawal and unknown status. Reconcile failed/late queries against source revisions rather than inventing fallback authority.

### Policy Map: 5. Security, privacy and compliance

Apply accepted server-side Authorisation, OWASP ASVS 5 Level 2 (appropriate Level 3 for sensitive actions), privacy minimisation, UK GDPR and other applicable qualified legal duties. Mandatory security/legal constraints cannot be weakened via Configuration. Separate **permissions** (Authorisation), **lawful restrictions** (Legal Compliance/Privacy), **domain enforcement** and **evidence acceptance** (Audit). Do not disclose identities, hidden source existence, forbidden links, small-cohort totals, raw provider responses or log stacks. Use versioned, sanitised errors; a technical timeout says nothing conclusive about a remote source's committed state.

Retain only source references needed for authorised purposes; source owners apply retention, erasure and legal holds. History is bounded by legitimate retention and visibility; export/download remains separately authorised. The projection requires no browser cookies or local storage by default. No technical conformance claim substitutes for a qualified jurisdiction-specific legal assessment.

### Policy Map: 6. GUI and host integration

**One host sidebar entry: Compliance → Legal Compliance dashboard → Policy & Control Map tab.** No second Policy Map app, sidebar link or shell. The representative [application-test-template](../../../RESOURCES.md#application-test-template) README and `app/pages/admin.vue` were inspected during the original review. The template provides `/`, `/admin`, a collapsible desktop/mobile sidebar and a Theme Manager entry; derived test apps own new navigation. It supplies no Policy Map pages. `/legal-compliance` is a **suggested host route**, not a published API. The host owns routes/context, Legal Compliance optional screens and server-side reads; source owners retain all edit screens and approvals.

| Screen | Minimum interaction |
|---|---|
| **Legal Compliance overview** | Qualified obligations, assessed scope, gaps, freshness and links to map |
| **Policy & Control Map (primary)** | Accessible search/filter/sort/page table of obligation → control → owner → evidence; jurisdiction/activity/date/status filters |
| **Details/history** | Source and interpretation, effective/revision dates, evidence and permitted as-of comparison |
| **Gaps/reviews** | Missing, stale, conflicting or unassessed links; protected “Review at source” navigation, no inline edits |
| **Reports/export** | Preview authorised cut-off, provenance, redactions and incompleteness |
| **Optional graph** | Same already-authorised nodes/edges as table, with an equivalent keyboard-accessible list; no graph-only facts |

The interface distinguishes loading, denied, empty-within-assessed-scope, not assessed, partial, stale, conflicting, unavailable and historical gaps. Meet **WCAG 2.2 AA**, Theme Manager semantic tokens, responsive layout, keyboard and non-colour cues, localisation and Clock-based formatting. UI concealment is not authorisation. The optional presentation must be separable: headless Legal Compliance still works. The template's Theme Manager `test` mode is **local-only and unauthenticated**; it is not a production precedent for this sensitive feature.

A derived test host should validate sidebar/dashboard navigation, explicit tenant/test fixtures, protected queries/actions, partial sources, history, export, graph/table parity, keyboard/mobile use and headless absence. **No test app or runnable GUI was created or executed here.**

### Policy Map: 7. Standards and permissive implementation choices

**Standards guidance** (design mapping; not claims of certification): [ISO 37301:2021](../../../RESOURCES.md#iso-373012021) including applicable amendment and British adoption for obligation/control accountability; [ISO 37302:2025](../../../RESOURCES.md#iso-31000) for control effectiveness assessment; [ISO 31000](../../../RESOURCES.md#iso-31000) for risk-based review; ISO/IEC **27001/27002** security, **27701** privacy, **15489** records/provenance; W3C [PROV](../../../RESOURCES.md#prov-o) for source lineage and [WCAG 2.2](../../../RESOURCES.md#wcag-22) AA / [WAI-ARIA](../../../RESOURCES.md#wai-aria) for presentation; applicable UK ICO accountability and NCSC secure-design guidance. Optional interchange: W3C [SKOS](../../../RESOURCES.md#skos), [SHACL](../../../RESOURCES.md#shacl), [ODRL](../../../RESOURCES.md#odrl), [NIST OSCAL](../../../RESOURCES.md#nist-oscal) and OASIS [Akoma Ntoso](../../../RESOURCES.md#akoma-ntoso) only where a real external consumer needs them. The UK government Technology Code of Practice applies where deployment scope warrants. Legal Compliance reviews source currency, UK GDPR and other jurisdiction-specific applicability/effective dates. **No mandatory RDF, ontology, graph database, external policy engine or certification.**

**Eligible free, complete-source, commercially permissive candidates** (not installed or dependency approvals):

| Need | Candidate and licence | Decision |
|---|---|---|
| TypeScript contract validation | [Zod](../../../RESOURCES.md#zod), MIT | Prefer if not already standardised by Legal Compliance |
| External JSON Schema | [Ajv](../../../RESOURCES.md#ajv), MIT | Conditional, avoid redundant validation |
| Existing SQL/persistence | [PostgreSQL](../../../RESOURCES.md#postgresql) (permissive); [Kysely](../../../RESOURCES.md#kysely) or [node-postgres](../../../RESOURCES.md#node-postgres--pg), MIT | Reuse owner's existing stack; **no map-owned store** |
| Optional Vue table | [TanStack Table](../../../RESOURCES.md#tanstack-table), MIT | Preferred table-first UI, integrated with platform UI/theme |
| Optional graph | [Cytoscape.js](../../../RESOURCES.md#cytoscapejs), MIT; alternatively [xyflow Vue](../../../RESOURCES.md#xyflow-vue), MIT | Choose one only if needed; preserve accessible table |
| Optional complex graph queries | [Apache AGE](../../../RESOURCES.md#apache-age), Apache-2.0 | Defer until proved necessary within owner's existing PostgreSQL |

Exclude archived original `bcakmakoglu/vue-flow` (use active xyflow successor if selected), open-core/source-restricted Neo4j/Redis/Elasticsearch variants, and unnecessary new queues, search engines, OPA/Casbin policy engines or SaaS. xyflow's upstream requests an attribution-removal support subscription but acknowledges MIT does not legally compel purchase. Verify exact release maintenance, source completeness, notices, transitive licences and supply-chain risk at implementation time. No dependencies were installed.

### Policy Map: 8. Conceptual acceptance criteria

These are **scenarios to verify**, not executed tests:

| Situation | Required result |
|---|---|
| Authorised reviewer views a supported jurisdiction/activity | Correct, scoped mapping with owner/source/version/effective time and known coverage limitations |
| Required control absent, or evidence missing | Clearly labelled gap; never “compliant” |
| Protected node/edge, count or evidence inaccessible | No direct or indirect disclosure; independently guarded Reporting/export |
| Cross-tenant request or missing trusted assurance | Denied without fallback to another tenant |
| Historical as-of request after revisions | Source-supported history or explicit irrecoverable gap |
| Source unavailable, stale, contradictory or withdrawn | Partial/unknown state with source attribution, no fictitious legal or enforcement outcome |
| Duplicated or late owner event | Revision-aware refresh; no duplicated authoritative change |
| User selects an edit/review link | Reauthorise in source owner's workflow with concurrency and approval checks |
| Published notice says allowed but Authorisation denies | Denial still governs access |
| Audit or Logging unavailable | Distinct, accurate evidence/diagnostic status; neither receipt is substituted for the other |
| Reporter requests mapping snapshot | Redacted, dated, scoped output with gap/completeness disclosure, not a compliance score |
| Optional GUI absent or graph inaccessible | Headless queries and equivalent accessible table remain usable |

### Policy Map: 9. Approval, evidence and completion

**Conceptual decisions approved:** PM-01, PM-02 and supplementary recommendations covering contracts, source authority, recovery, security, standards, permissive library candidates and GUI. This section is the canonical conceptual specification of Legal Compliance's Policy & Control Map feature, not an independent package specification. CLS-06 confirms that no separate artefact boundary is required.

**Implementation/acceptance not verified:** Legal Compliance's implementation root `CONTRACT.md`, stable exported queries/types/errors, actual source adapters and contract revisions, data-freshness bounds, historical availability, edge/aggregate redaction, operational security, CI and host acceptance. Its wider Legal Compliance review remains independent. Absence of a root contract is **not** proof the conceptual operations are implemented. Exact UI routes and optional formats require later implementation-level agreement, not a new conceptual policy authority.

## Publisher canonical review — reciprocal conceptual interface (22 November 2026; draft PR #125)

**Status: Proposed Publisher-side alignment; does not override this capability's approved decisions or assert an implemented integration.** [Publisher canonical conceptual contract](../publisher/capability-record.md).

Legal Compliance qualifies applicability, jurisdiction, statutory disclosures, retention and holds; Publisher authors/versions/publishes legal/policy notices and enforces applicable document constraints, not regulatory correctness or activation of executable rules. Unresolved effective-date or conflicting legal holds block unsafe publication/deletion; final legal interpretation requires qualified review.

## Reciprocal standards interface — Pricing (22 November 2026)

**Pricing standards application (approved conceptual direction, 22 November 2026):** [Pricing](../pricing/capability-record.md#security-compliance-internationalisation-and-standards) supplies attributable price/discount revisions, merchant-specific advertised-price history, tax/fee/FX certainty and unit-price evidence. Legal Compliance determines which UK/EU/other consumer price-display, promotion prior-price, VAT and privacy obligations apply by jurisdiction, product, audience, channel and effective date; Pricing enforces the qualified business constraint, while offer/checkout owners present the lawful claim. Missing legal qualification prevents definitive regulated pricing claims. This does not confer tax assessment, merchant publication or implementation approval.

## Reciprocal boundary — Privacy conceptual review (22 November 2026)

**Status: Owner-approved conceptual boundary (PRIV-01–08 and eight refinements, 22 November 2026); not a verified implemented API.**

**Privacy conceptual review — 22 November 2026 (draft PR #120, owner-approved conceptual direction on 22 November 2026; not an implemented contract).** [Privacy's canonical conceptual interfaces](../privacy/capability-record.md) receive legally qualified jurisdiction/activity, binding restrictions, transfer requirements, deadlines and scoped legal-hold instructions from Legal Compliance; Privacy returns purpose/consent/rights and source-qualified disposition context. Legal Compliance owns interpretation and legal-hold authority; Privacy owns specialist privacy decisions and case coordination; data custodians execute retention, restriction and erasure. Missing mandatory legal qualification blocks only the affected unsafe action. Preserve existing LC-01–13 approvals.

**Owner-approved Privacy refinement (22 November 2026; PR #120, conceptual only):** For each processing activity, qualify controller/processor or joint-controller role, applicable jurisdiction, lawful basis, record-category deadline, exception and hold before Privacy applies specialist rules. Legal Compliance remains authoritative for legal meaning and holds; Privacy owns consent and rights coordination; each data owner executes disposal and returns independently attributable receipts. Unknown mandatory legal qualification cannot become a permissive default.


## Workflow conceptual review — reciprocal alignment (23 November 2026; draft PR #150)

**Status: Proposed Workflow-side consolidation, not new approval of this neighbouring capability or an implemented integration.** [Workflow's idealised public contract](../workflow/capability-record.md) keeps human review-route definitions, approver eligibility/assignment, delegation and qualified approval evidence with Workflow; each originator retains its own authoritative source record and final decision. Legal Compliance determines applicability, mandatory legal competence and final legal case conclusions; Workflow optionally routes sign-off and returns revision-bound evidence, never adjudicating legal validity itself.

Dependencies are host-composed public ports/events, not private storage or automatic package imports. Resolve concurrent draft changes against latest master before merging.

## FAC-D01–04 — Approved reciprocal responsibility alignment

Party consumes qualified applicability, hold and representation-evidence constraints; Payroll consumes qualified pay-regime and filing rules; Workforce Scheduling consumes qualified working-time and rest constraints. Legal Compliance owns applicability findings, not source business execution or blanket legal certification. See [Party](../party/capability-record.md), [Payroll](../payroll/capability-record.md) and [Workforce Scheduling](../workforce-scheduling/capability-record.md) as applicable. Exchanges are purpose-scoped public ports, not mandatory imports.
