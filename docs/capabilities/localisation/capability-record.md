# Capability Record — Localisation

**Capability:** `localisation` · **Classification:** Platform candidate · **Review:** [draft PR #86](https://github.com/nuxt-layers/architecture-blueprint-review/pull/86) · **Updated:** 21 November 2026.  
**Conceptual status:** The capability boundary and decisions **LOC-D01–LOC-D10 and LOC-R01–LOC-R07 are owner-approved**. The further clarification separating this service from routine i18n rendering and direct Logging/Audit/Reporting dependencies is also approved. Detailed GUI navigation and screen grouping are documented as **recommended conceptual design**, not an implemented user interface.  
**Implementation status:** No independent operational `nuxt-layers/localisation` repository or published root `CONTRACT.md` was verified when reviewed; all operations below describe an **idealised public contract**, not existing callable APIs. The blueprint is non-normative and does not override accepted governing rules, actual published contracts or implementation evidence. **No merge is authorised.**

**Authority and review evidence:** Follow review protocol (former document: review protocol), governing [architecture-rules](https://github.com/nuxt-layers/architecture-rules), standards assessment (former review: localisation standards assessment 2026 11 21), permissive open-source library assessment (former review: localisation permissive oss libraries 2026 11 21). Opening governing SHA `b920ce0d8b361de000a6739a16123dbdc56df7a7`; opening blueprint SHA `6dac83a03da8704f7945ee1bc894f2248300445a`. Reverify both current masters before merge. The name `localisation` supersedes the empty `translate` candidate; it does not introduce a second Translate service.

## 1. Purpose, users and distinct value

**Localisation provides a reusable, secure, provider-neutral service for producing, checking, managing and reusing translations** of authorised application resources and domain-owned content. It supports application authors, readers of multilingual Nodes/Hubs/forums, translators, qualified reviewers, language managers and content owners. Its distinctive responsibilities are **on-demand translation, contextual risk policy, translation jobs and corrections, terminology and scoped memory, provenance, review, secure reuse, and source-owner handoff**.

It is **not** another rendering framework. JavaScript `Intl`, Vue I18n, Nuxt i18n and equivalent proven libraries already render approved messages, handle pluralisation, local language switching and multilingual routing. Existing approved labels or navigation text **must not call Localisation on every page view**. The host or producing capability retains its application message-key catalogue and translations; Localisation may assist with missing variants and resource export. A single-language application continues to work without Localisation installed. Clock owns date/time interpretation and formatting; financial/domain owners retain canonical amounts, currency, taxes and jurisdiction-specific meaning.

**Classification:** A Platform **candidate** is justified by multi-actor stateful translation work, qualified decisions, provenance, terminology governance and safe reuse shared across independent applications. A pure language-tag parser, message formatter or file converter is a **library**, not a separately authoritative Platform capability. Core services are framework-neutral and headless; any Nuxt screens are separately enabled. No separate process, database or framework dependency is mandated at conceptual stage.

## 2. Authority, data ownership and storage

| Record or decision | Authority and persistence boundary |
|---|---|
| **Original document, message catalogue, product facts and published variants** | **Publisher or the originating domain/host** owns originals, their revisions, publication, visibility, withdrawal, legal/business meaning and durable adopted translations. Source records are never rewritten by Localisation. |
| **Translation requests, attempts, candidates and decisions** | **Localisation** owns the workflow, idempotency, method/provider/version references, quality evidence, reviewer dispositions, source-revision binding and protected, minimum necessary candidate material. |
| **On-demand translation cache** | **Localisation** may hold short-lived, policy-allowed derived translations. It is neither a second source master nor proof that a locale variant is published; some protected content may prohibit caching entirely. |
| **User ratings, error reports and proposed corrections** | **Localisation** owns version-specific, minimised feedback, triage, correction review and authorised aggregate indicators. Feedback does not certify accuracy or alter published content. |
| **Glossaries and translation memory** | **Localisation** owns purpose-, tenant-, project- and source-scoped resources, permitted reuse, versions, correction, expiry and erasure. No unrestricted global translation memory. |
| **Locale preferences and policy** | **Configuration** and **Profile** retain organisational/application and individual preferences. Host resolves effective precedence; Legal Compliance/Privacy and content owners retain applicable restrictions. Localisation enforces the effective constraints; it does not become the policy or preference master. |
| **Evidence, diagnostics and reports** | **Audit** retains accepted accountable evidence, **Logging** retains technical diagnostics, and **Reporting** owns analytical definitions, results and exports. None owns Localisation jobs or feedback cases. |

**Owner-side language variants:** Model one logical document with revisioned BCP 47 language variants and explicit source-revision linkage, not proliferating columns such as `title_fr` and `body_de`. This is the **desired conceptual owner contract**, not an asserted Publisher database schema. The owner validates any proposed translation and independently decides whether to retain, approve, publish, unpublish or withdraw it. Source change must make earlier review/delivery assumptions stale. Search and Federation use **owner-verified published availability only**; they cannot reveal cached private candidates.

**Minimum owned persistent state:** source-owner reference and immutable source revision/field, request/attempt identifiers and bounded status, candidate digest and appropriately protected content if retention is permitted, policy/review/terminology versions, reviewer decisions, scoped feedback, correction history, retention/erasure evidence and **Localisation-owned durable outbox**. Derived coverage measures are rebuildable. Store only justified source excerpts, not duplicate entire Publisher or Product records. Implementing caches, job records and memories within the platform's existing persistence foundation is preferred; no extra database service is presumed.

## 3. Translation policy and lifecycle

**Risk is based on the content and its intended use, not whether the page is public or private.** Source-owner restrictions and statutory/security minimums override permissive organisation or user settings. A general forum message may be low risk, but dangerous advice embedded in that forum may not be. Language is not legal jurisdiction.

| Risk tier | Permitted route | User-facing assurance |
|---|---|---|
| **Low** — general posts, regatta reports, ordinary community notices and approved dynamic labels | **Automated/on-demand** translation without prior human approval where policy permits; a human route remains available. | Mark machine-generated output, identify original language, offer **Show original**, and disclose limitations. |
| **Moderate** — product descriptions, marketplace copy, support material or technical advice | Automation **only with context-specific safeguards**, terminology/structure protection, limitations, escalation and owner policy. | Clearly distinguish an informal reading aid from authoritative terms, prices, warranties or instructions. |
| **High** — legal, regulated, safety-critical, medical or materially consequential financial text | **Qualified human approval** before the translation may be presented as approved or authoritative. A strictly labelled, non-authoritative reading aid is available **only if owner/legal policy explicitly allows it**. | No machine-confidence score or reader rating can replace qualified review or certification. |

**Native mode:** Without any external machine provider Localisation can accept authorised human translation and review. Without a qualified reviewer for an applicable high-risk item, approval remains pending/refused; never silently downgrade the control. Low-risk automation is not artificially blocked by a universal human-first rule.

**Lifecycle:** request → validate/authorise → queued or permitted on-demand execution → machine attempt or human assignment → source-revision-bound candidate → automatic checks and, when required, qualified review → approved/rework/refused → optional explicit owner handoff and receipt. **Source or policy change** can mark any pending/cached result obsolete. Owner acceptance and publication are **separate downstream states**. A machine timeout, duplicate delivery, uncertain provider response or missing owner receipt is **unknown/pending**, not successful. Cancellation and erasure honour legal holds and retention rules.

**Qualified review binds:** exact source revision, candidate identity/digest, target locale, relevant glossary and policy versions, reviewer qualification/assurance and decision time. Where policy requires separation of duties, one actor cannot complete every stage. A material source change invalidates prior approval.

## 4. Idealised public contract — inbound information

These are **conceptual surfaces**, not implementation method names. All protected inputs require a trusted tenant/caller/resource scope, purpose and effective authorisation.

| Inbound surface | Information and authoritative source | Requirement, validation and failure |
|---|---|---|
| **I-01 Locale context** | Supported languages and application defaults (host), effective tenant/application preference (Configuration), permitted individual preference (Profile), locale precedence resolved by host. | BCP 47 validation; preserve script/region, explicit fallback and unsupported/absent/invalid distinctions. Localisation never changes preferences. |
| **I-02 Request or resolve translation** | Source owner or permitted viewer: owner/resource/field reference, exact immutable revision, authorised text/safe structured representation, original and requested languages, intended audience, purpose, risk and sensitivity. | Validate current source/visibility, caller, consent/policy, translation structure, locale support, rate/cost limits and scoped idempotency. A viewer's access to private text **does not authorise external provider disclosure**. |
| **I-03 Terminology and memory administration** | Authorised language managers: terms, context, prohibited equivalents, versions, rights, reuse scopes and correction/retention decisions. | Reject unqualified changes, conflicting versions and cross-tenant/source reuse; no glossary is a valid explicit state. |
| **I-04 Translation-provider execution** | Optional host/Integrations-approved local or remote provider port: allowed data subset, model/engine, approved location/scope, quotas, budget and correlation; returns candidate, failure or uncertainty. | External calls require explicit confidentiality/transfer approval. No implicit fallback to another provider; no unapproved raw content or secrets disclosure. |
| **I-05 Candidate review and feedback** | Qualified reviewer or authorised reader: exact candidate/revision/digest, language, findings, rating/error category, proposed correction or qualified sign-off. | Reader usefulness ≠ bilingual accuracy ≠ formal approval. Validate reviewer assurance, policy, version, anti-abuse and privacy restrictions. |
| **I-06 Source-owner handoff** | Publisher or other owner publishes a documented acceptance port; receives revision-bound, permitted reviewed or policy-automatable candidate and returns accepted/rejected/unknown receipt. | Owner validates freshness, permissions and publication policy; Localisation never writes to private owner tables or infers publication from transport receipt. |
| **I-07 Source/variant change and withdrawal** | Versioned owner query or committed events for changes, withdrawals, accepted/published variants, visibility and authority scope. | Handle out-of-order/duplicate/gapped events; invalidate caches and stale approvals. Unknown owner status ≠ current/public. |
| **I-08 Effective security, legal and temporal rules** | Host-composed IAM caller/access decision, source restrictions, Legal Compliance/Privacy, Content Security/Moderation and qualified Verification evidence; canonical time from Clock. | Mandatory protected-operation authorisation; stronger applicable restrictions govern; unresolved critical legal/security conditions fail closed. |
| **I-09 Optional execution/diagnostic ports** | Host-composed Scheduler/Workflow/Message Queue relay, diagnostic sink, and **only if mandated** critical-evidence acceptance port. | No hard-coded direct dependencies on Logging, Audit or Reporting; work and outbox remain Localisation-owned. Optional service outage never creates false success. |

**Common context:** owner namespace, tenant/resource ID, source revision/field, locale pair and direction, sensitivity/visibility, caller assurance, purpose, applicable policy versions, idempotency/correlation and time provenance **where needed**—not one mandatory universal request object. Keep scripts, plural/placeholder metadata, non-translatable spans and protected identifiers intact.

## 5. Idealised public contract — outbound information

| Outbound surface | Consumer and meaning | Boundaries and conditions |
|---|---|---|
| **O-01 Locales/fallback** | Host and authorised applications: supported languages, resolved locale, fallback sequence, language/script/direction and absent/unsupported reasons. | No implied publication or ownership of preference settings. |
| **O-02 Translation result and job state** | Viewer, requester, translator/reviewer or source owner: safe translated segment/candidate or source fallback, operation/job ID, progress, pending, failed, denied, obsolete or unknown, method and observed freshness. | Permission-checked **on every read**, including cache hits; viewers do not receive private queue or reviewer metadata. |
| **O-03 Versioned candidate and provenance** | Authorised reviewers and owners: structured output, candidate digest, exact source revision, language pair, machine/human/post-edited method, provider/model/version when disclosable, limitations, validation and review state. | Not authoritative domain truth, a legal guarantee or public publication. Preserve placeholders, numbers, names and embedded structure. |
| **O-04 Quality and correction outcome** | Reviewer, owner and permitted editor: terminology findings, assessment/rework/approval/refusal and reviewer-qualified, revision-specific disposition; user-feedback aggregate/correction-review outcomes. | Ratings alone confer no quality certification; protected reporter/reviewer identities stay scoped. |
| **O-05 Owner handoff/reconciliation** | Owner and original requester: idempotent candidate delivery, source freshness, accepted/rejected/pending/unknown handoff receipt. | Only Publisher/domain owner confirms stored/published variant; Localisation does not issue permanent public URLs. |
| **O-06 Coverage and published availability advice** | Editors, host, permitted Search/Federation indexers: missing/stale/cached/reviewed variants and **separately owner-verified published variants**, with timestamps. | Public discovery is based solely on owning domain's authorised published facts. Unknown availability is not treated as published. |
| **O-07 Committed events** | Host event relay, selected Audit evidence intake, authorised projections/consumers: request, candidate, review, stale source, handoff, glossary/feedback decision, sensitive administrative changes. | Localisation-owned durable outbox; minimal versioned source/tenant references, stable IDs and at-least-once/replay-safe delivery. No raw private texts; event delivery ≠ Audit acceptance. |
| **O-08 Operational data** | Optional diagnostic sink and authorised metrics/Reporting consumers: typed error codes, correlation, provider latency/availability, translation volumes, costs, coverage, review time, feedback trends, cache efficiency and projection freshness. | Logging owns diagnostic sinks; Reporting owns reports/exports and disclosure checks; no mandatory direct runtime calls. Unknown/incomplete metrics must stay explicit. |

**Interaction models:**  
**Commands** request/resolve/cancel/retry permitted translation, manage terminology, submit/triage feedback, make qualified reviewer decisions and request authorised owner handoff. Commands are version-conditioned, idempotent or explicitly reconcilable, and may return accepted/pending instead of completed.  
**Queries** read supported locales/fallback, source-scoped result, job, review, glossary, feedback summary, provenance, cache status and coverage with tenant/role restrictions, freshness and completeness.  
**Events** describe committed authoritative Localisation state transitions through its durable outbox; subscribers independently handle duplicate, late and missing messages. Neither outbox nor transport provides distributed exactly-once delivery.

**Error vocabulary:** invalid input/locale/structure, unsupported, absent, denied, conflict, stale source/candidate/policy, policy-prohibited transfer, rate/cost limit, provider unavailable, remote outcome unknown, delivery pending/unknown and retained/legal hold. Return stable safe codes/message keys; never leak confidential provider payloads or rewrite unknown into success.

## 6. Cooperation and dependency direction

A conceptual interface exchange **does not imply a package import**. The host connects independent public ports and preserves an acyclic implementation and Nuxt-extension graph.

| Cooperating capability | Localisation consumes | Localisation supplies / non-ownership |
|---|---|---|
| **Publisher**; domain owners including **Products/Marketplace** and application catalogue owners | Authorised content/revisions, structure, publication policy, acceptance port, changes/withdrawals, verified published variants. | Revision-bound candidates, quality/provenance, staleness and handoff. Owner alone stores/publishes adopted translations, keeps pricing/terms and source truth. |
| **Content Editor** | Permitted translation/review actions and contextual presentation needs. | Source comparison, suggestions, status, feedback and review UI components; editor continues generic Publisher-backed authoring. |
| **Configuration / Profile / host** | Effective language and fallback choices, tenant/individual settings and provider/risk settings. | Available locales and advice; never owns preferences or site navigation. |
| **Identity / Authentication / Authorisation / Verification** | Trusted resolved caller, membership/tenant/assurance, resource access decision and specialist review credentials. | Scoped operation outcomes and attributable decision references, no identity master or permission grants. |
| **Legal Compliance / Privacy** | Applicable statutory wording, consent/retention, residency/transfer, disclosures and human-review requirements. | Processing provenance, rule-applied state, restricted evidence and approved data-rights/export information; no legal interpretation or implied regulatory certification. |
| **Moderation / Content Security** | Content risk/hold classifications, restricted passages, review constraints and withdrawal status. | Translation-related risk metadata and restricted case/review references; never overrides safety blocks or source moderation. |
| **Integrations / translation provider ports** | Approved connections, capabilities, execution/identity scopes, cost/rate limits and remote results. | Minimised work request and correlation; external engine doesn't own candidate approval or publishing. Local/manual mode works without connector. |
| **Clock / monetary or financial owners** | Authoritative time/zone and numeric/financial meaning where required. | Linguistic interpretation assistance only; no independent business calculations or canonical temporal state. |
| **Workflow / Scheduler / Message Queue** | Optional host-supplied execution, time and relay services. | Owned task/work checkpoints and durable events; their transports don't own decisions or outbox facts. |
| **Logging / Audit / Reporting / Observability** | **No routine direct service calls.** Host may supply optional diagnostic sink; critical evidence acceptance is conditional on a published policy-gated acknowledgement port. | Typed redacted diagnostics; selected attributable committed events; authorised measurement/query surfaces consumed independently by Reporting. No evidential, sink or report ownership. |
| **Search / Federation** | Owner-verified published locale and visibility status. | Authorised coverage and fallback hints only. Never distribute a private translation or equate delivery with publication. |

**Operational separation:** Diagnostic delivery status is not translation success; committed source event is not Audit intake; Audit intake is not integrity proof; and a Reporting chart is not an authoritative domain record. Ordinary Logging/Reporting outages do not block translation. If an applicable critical-evidence policy requires verified Audit acknowledgement **before completion**, the host composes that distinct gate and Localisation fails closed on uncertainty. Reporting must reauthorise aggregates and exports, including small-cohort disclosure; no raw feedback/source text in routine telemetry.

## 7. Confidentiality, caching, feedback and operational resilience

- **Translation disclosure:** A public page may use an approved external translation engine; a private forum, closed Hub, direct message or personal/sensitive document **may not** be sent externally merely because its reader is authorised. Check processing purpose, consent where required, location, processor terms, provider, source-owner policy and permitted content subset. If no compliant engine exists, use permitted local/human work or show unavailable/original.
- **Cache security:** An optional cache entry is scoped by tenant, owner/resource, immutable revision/digest, locale, visibility and policy, engine/model/version and other permissions needed to prevent audience leakage. Policy bounds TTL/retention. **Reauthorise every cache hit**, invalidate or restrict immediately on source edit, withdrawal, entitlement revocation, policy change or stronger restriction, and never blindly share private cache content across Nodes, groups or users. Sensitive content may require no cache.
- **Feedback:** Optional useful/not-useful rating, issue category and proposed corrected text bind the **exact rendered candidate/version**. Rate-limit, minimise personal identifiers, protect against manipulation and respect privacy deletion/retention. High-volume ratings may be aggregated; specialist correction is reviewed before glossary/memory promotion or source-owner candidate handoff. A negative rating never edits a document or proves a machine translation harmful/incorrect without investigation.
- **Safety and rendering:** Source and machine output are untrusted. Protect structural placeholders, plural variables, identifiers, URLs, units and formatting markers; safely render markup and isolate bidirectional text. Translation cannot bypass Moderation or legally operative wording.
- **Cost/availability:** Per-purpose limits, provider rate/budget caps, concurrency, timeouts and safe fallback to source or approved human mode. Distinguish queue delay, provider uncertainty, partial source coverage, stale candidates and failed owner handoffs. Durable job/outbox state survives optional relay/provider outages; no silent repeated paid dispatch or unauthorised alternative-provider failover.
- **Evidence and rights:** Limit retained text, protect drafts and reviewer identifiers, support jurisdiction-specific retention, correction, lawful erasure and hold mechanisms, and track who was permitted to disclose data. Accepted security baseline is OWASP ASVS 5 L2 (L3 for critical cases) and WCAG 2.2 AA for applicable presentation; privacy law obligations are evaluated by Legal Compliance.

## 8. Standards and open-source technology policy

**Baseline design standards:** IETF BCP 47 (RFC 5646/4647), Unicode/CLDR (including script/direction/plural processing), W3C internationalisation guidance and ITS 2.0 where structured content needs translation annotations, WCAG 2.2 AA, and the platform's accepted security/architecture rules. **Conditional** translation-service and assessment references: ISO 17100, ISO 11669, ISO 5060, ISO 18587, specialist ISO 20771 legal translation and ISO 24495 plain language; format interchange may use versioned OASIS XLIFF/ISO 21720, TBX or TMX. ETSI EN 301 549, UK accessibility/privacy law and jurisdiction-specific language obligations apply where legally relevant. AI-assisted translation additionally requires appropriate security/privacy, ISO/IEC 42001/23894 and NIST AI risk assessment. **A published technical standard does not itself certify compliance**; identify exact editions and applicable legal version during implementation. Full standards/evidence: standards assessment (former review: localisation standards assessment 2026 11 21).

**Permissive code policy:** Use genuinely complete, actively maintained, commercially permissive OSS, not proprietary/open-core/source-available or lagging limited community editions. Preferred evaluation candidates include **Vue I18n / Nuxt i18n** for optional presentation, native ECMA-402 `Intl` where sufficient, **FormatJS or MessageFormat** (choose one appropriate version/schema), **xliff** for XLIFF interchange, and optional `franc`/Lingua for advisory language detection. Optional local translation ports may evaluate **Argos Translate**, **CTranslate2** or **Marian NMT** subject to separately audited translation-model weights, data and transitive licences; Okapi is a specialist optional interchange/QA tool, not a required Node dependency. **No specific library or provider is approved as a mandatory implementation dependency.** Test format round-trips, runtime compatibility, security, performance and complete licence obligations before adoption. Full evidence and excluded copyleft/open-core cases: permissive OSS assessment (former review: localisation permissive oss libraries 2026 11 21).

## 9. Presentation and GUI — host-owned navigation, optional capability screens

**Reference inspected:** [`nuxt-layers-test/application-test-template`](https://github.com/nuxt-layers-test/application-test-template), including `README.md`, `app/app.vue`, `app/pages/admin.vue`, `app/pages/index.vue`, `nuxt.config.ts` and `app/app.config.ts` on `master` (21 November 2026). Its local-only application has a public `/` homepage, an `/admin` test dashboard, a shared shell with host-owned **Capabilities** sidebar, mobile overlay and Theme Manager at `/theme-manager`. The test host has an unauthenticated placeholder; it is **not a production IAM example or automatic navigation API**.

**Proposed host integration:** Host may add one **Localisation** sidebar entry and test-dashboard card pointing to an illustrative `/localisation` overview **inside the shared shell**, matching Theme Manager's usage pattern. Host owns actual routes, logo/branding, menu exposure, page registration and composition. Localisation supplies optional headless-backed presentation contributions and no independent shell or theme system. If presentation is disabled, it contributes **no pages, styles or sidebar links**; headless operations remain available. These routes and screens are conceptual, not current implementations.

| Screen / feature | Core interaction and authorised audience |
|---|---|
| **Overview** | Translator/language-manager/administrator-specific queue, coverage, review backlog, provider incidents, stale content and costs, with appropriately scoped summaries. |
| **Requests and queue** | Request, assign, filter, cancel/retry, prioritise or reconcile permitted jobs; translators see only authorised/assigned resources. |
| **Translation workspace** | Side-by-side source and target, language/provenance/validation, source revision, terminology issues and correction; specialist reviewer can approve/refuse only with required qualification. |
| **Terminology and memory** | Scoped glossary/memory versions, prohibited terms, reuse permissions, correction, expiry and deletion, restricted to authorised managers. |
| **Quality and feedback** | Version-bound usefulness ratings, error reports, proposed corrections, review triage and Moderation referral; never direct publication. |
| **Language coverage and variants** | Distinguish machine candidate, reviewed candidate and **Publisher-verified published variant**, plus missing/stale/withdrawn states. Source publication links use owner contract. |
| **Provider, policy and operations** | Administer language/risk/quality rules, approved provider references, quotas, caching, retention, failures and evidence needs; Integrations/host retains credentials and connection lifecycle. |
| **Contextual reader controls** | Embedded in blog/forum/Node/Hub content: permitted **Translate**, marked machine-generated output, original → target language, accessible provenance details, **Show original**, and optional usefulness/error feedback; **not** an admin dashboard. |

**GUI requirements:** Role, tenant, owner-resource and assurance are checked on **each server operation**; hiding a menu item is not authorisation. Use Theme Manager's semantic tokens, existing application i18n for labels, responsive/mobile navigation, keyboard navigation, screen-reader and touch-accessible provenance (not hover-only), language-of-parts markup, RTL/bidirectional isolation, focus/live-status management, reduced motion, and WCAG 2.2 AA. Never equate a rendered machine candidate with a certified or published document. Show explicit loading, denied, empty, stale, blocked, failed and unknown states. The UI can be absent entirely.

## 10. Representative conceptual acceptance scenarios

These specify **expected outcomes**, not tests performed.

| Input / scenario | Expected result and authority |
|---|---|
| Single-language host without Localisation; ordinary Nuxt/Vue labels already translated | Host renders normally; no Localisation call/dependency; source catalogue owner remains authoritative. |
| Allowed public low-risk post requested in another language | Bounded on-demand machine candidate, disclosure label, source-language/provenance and Show original; no pre-approval requirement. Localisation owns candidate, post owner owns content. |
| Private Hub member requests translation; remote processing disallowed | No external disclosure; approved local/human mode or safe unavailable/original; no cross-audience cached data. Source owner/IAM enforce read eligibility. |
| Cached translation requested after membership removal | Deny at read time and prevent content leakage despite cached bytes. Owner/access policy governs. |
| Public source revision A translated and reviewed; revision B replaces it | Candidate/approval of A becomes stale; Publisher does not silently adopt as B. |
| User rates displayed candidate or proposes correction | Exact translation version referenced; scoped feedback recorded; reviewed correction only, never automatic canonical edit. |
| Low-risk candidate offered for permanent French edition | Publisher validates and decides adoption/approval/publication; cache or Localisation delivery ≠ published availability. |
| Qualified legal/safety translation presented to unqualified reviewer | No qualified approval or authoritative publication; specialist decision and evidence policy remain pending/denied. |
| Provider timeout or ambiguous remote response; idempotent retry | Unknown/reconciliation state, bounded cost, no unauthorised new-provider transfer and no falsely completed output. |
| Changed plural placeholder, malformed BCP 47 tag or invalid structure | Safe invalid/incompatible result and no handoff. |
| Source withdrawn; public search/federation requests French | Only owner-verified public availability; withheld/private/stale candidate not disclosed. |
| Duplicate/out-of-order source/outbox events, event relay unavailable | Idempotent reconciliation and durable committed state; observable lag/unknown, no exactly-once fiction. |
| Logging or Reporting unavailable | Core permitted translation continues; diagnostic/reporting completeness explicitly degraded, not mistaken for failed translation. |
| Critical audit-evidence requirement cannot be acknowledged | Policy-gated action fails closed or remains pending; ordinary work remains separate. Audit owns evidence receipt, not job completion. |
| Reader/editor/reviewer attempts another tenant's work, glossary or aggregate | Server denies and does not leak private counts, labels or payloads. |
| Test-host menu, mobile interaction and presentation-off mode | Optional host sidebar entry opens overview, accessible scoped screens in existing shell; with presentation disabled there is no Localisation route/UI while headless contract works. |

## 11. Decisions, readiness and remaining evidence

**Owner-approved conceptual decisions (21 November 2026):**

| ID | Approved decision |
|---|---|
| **LOC-D01** | Independent Platform-candidate translation workflow; basic i18n formatting remains a library/presentation responsibility. |
| **LOC-D02** | Application/layer retains ownership of message keys and source catalogues. |
| **LOC-D03** | Qualified human review is mandatory for consequential/regulated content when applicable; routine low-risk translation can be automated. |
| **LOC-D04** | Exact source-revision-bound candidate with validated, explicit owner handoff; no unilateral publication. |
| **LOC-D05** | Manual native baseline and optional approved provider-neutral external/local translation ports. |
| **LOC-D06** | Only owner-verified published language variants enter public Search/Federation discovery. |
| **LOC-D07** | Governed, purpose/tenant/source-scoped translation memory with privacy, correction and erasure. |
| **LOC-D08** | Runtime, formats and package selections follow later standards, licensing, maturity, portability and acceptance evidence. |
| **LOC-D09** | Host resolves effective language precedence without transferring Configuration/Profile preference ownership. |
| **LOC-D10** | Verify actual public contracts, dependency/extension graph and acceptance before implementation. |
| **LOC-R01** | Contextual risk tiers; low-risk automation with qualified review where consequences demand it. |
| **LOC-R02** | On-demand translation for authorised public/private content **subject to LOC-R06/R07 storage, confidentiality, access and cache safeguards**. |
| **LOC-R03** | Visible source language, machine status, accessible provenance details and Show original. |
| **LOC-R04** | Optional user usefulness ratings, error reports and corrections; feedback is not certification or automatic content approval. |
| **LOC-R05** | Owner-approved stable interface catalogues by default; policy-permitted low-risk dynamic label automation. |
| **LOC-R06** | Separate temporary Localisation cache, durable Localisation feedback/workflow and owner-managed durable published variants, with explicit promotion. |
| **LOC-R07** | Version-specific feedback and minimum retention; protected scope-aware cache with reauthorisation and revision/permission invalidation. |

**Additional owner-approved clarification:** Avoid routine direct imports/calls from Localisation to Logging, Audit or Reporting. Use host-composed diagnostic sinks, committed durable events and authorised reporting reads. Distinguish Localisation's translation-management value from the existing render/route responsibilities of Nuxt i18n and Vue I18n.

**Conceptually specified but not individually signed off as implementation choices:** the seven optional operator screens and reader UI pattern; exact tenant-specific policy profiles, storage schema/cache TTL, provider ranking, choice of message/XLIFF/TBX formats, queue/scheduler, translation-model assets and interfaces. These do not undermine the agreed capability boundary. Separate legal assessment, actual contract signatures and acceptance are still required.

**Completion criteria and outstanding work:** This record covers the capability's principles, authority, storage, risk policy, native flow, inbound/outbound public information, commands/queries/events, reciprocals, privacy/security, relevant standards, permissive OSS selection, GUI and conceptual acceptance. It may be assessed as a **conceptually documented design**, subject to final contradiction and current-master reconciliation. It is **not** an implemented capability, a verified Publisher or Localisation `CONTRACT.md`, proof of legal compliance, an accepted governing catalogue/ADR amendment or a tested integration. The review branch and parallel reciprocal PRs require pre-merge **Git conflict, latest accepted ADR/standards, architectural ownership/interface/cycle, links/decision-status, protected CI and mergeability checks** against current `master`. CI/user—not the assistant—runs implementation tests. **Do not merge without explicit owner approval.**

## Cross-capability note — Mailer conceptual interface (19 November 2026)

**Status: Mailer-side conceptual boundaries owner-approved (MLR-01–MLR-10, 21 November 2026); neighbouring capability approval/implementation not implied; [Mailer PR #90](https://github.com/nuxt-layers/architecture-blueprint-review/pull/90). No public runtime adapter verified.** [Mailer conceptual record](../../services/mailer/services-record.md): Mailer (approved conceptual design) transports only approved content with declared locale/template version; Localisation may supply qualified language/translation results, while the source/template owner approves meaning and Clock handles temporal formatting. Mailer must not silently machine-translate legal/security-critical messages or overwrite their authoritative content. Concurrent Localisation PR is provisional.


## Reciprocal conceptual note — Metadata review (19 November 2026)

**Status: Owner-approved conceptual Metadata scope in [Metadata draft PR #95](https://github.com/nuxt-layers/architecture-blueprint-review/pull/95), not a published implementation contract or completed review of this adjacent capability.** [Metadata conceptual contract](../metadata/capability-record.md).

Metadata owns stable term identifiers, reference labels and classification relationships; Localisation may supply translated term labels and review status via public interfaces. A translated display string is not a new term or an authorised assignment; absent translation uses a declared source-locale fallback without cross-tenant leakage. Conceptual cooperation is optional and host-wired through public contracts; avoid circular required package dependencies.

## Publisher canonical review — reciprocal conceptual interface (22 November 2026; draft PR #125)

**Status: Publisher-side direction approved 22 November 2026; no claim that the cross-capability interface is implemented.** [Publisher canonical conceptual contract](../publisher/capability-record.md).

Localisation supplies reviewed locale candidates bound to Publisher source revision, provenance, jurisdiction and quality status; Publisher validates adoption, owns durable locale variants and their independent approval/publication/withdrawal/address outcomes (approved LOC-R06/R07). The published Publisher root contract does not currently prove a locale acceptance call. Unknown/stale acceptance does not publish, and the source's withdrawn state constrains downstream variants.
