# Reviews — canonical conceptual capability record

**Capability:** `reviews` · **Classification:** Platform capability (owner-approved concept) · **Review date:** 23 November 2026 · **Status:** **conceptual design approved**, not implemented or adopted as a governing standard.  
**Decisions approved:** REV-D01–REV-D08, REV-R01, REV-S01, REV-L01–REV-L02, REV-X01 and **REV-G01** (optional GUI and host composition), all approved by the owner on 23 November 2026.  
**Implementation evidence:** no published `nuxt-layers/reviews/CONTRACT.md` or executable API verified. This document describes **idealised public contracts**, not released exports or working screens. [Draft review PR #130](https://github.com/nuxt-layers/architecture-blueprint-review/pull/130).  
**Authority:** accepted `nuxt-layers/architecture-rules` ADRs and normative standards precede this blueprint. Initial governing baseline `d7f7c2ee051244b8c81325f5ff1267568d99aab1`. Follow review protocol (former document: review protocol).

## Purpose and ownership

Reviews manages attributable customer assessments of a specific product, service, seller, venue or experience. It owns review submissions and revisions, ratings and text, protected reviewer/guest references, invitation redemption, source-qualified **verification assessments**, review-specific publication and withdrawal decisions, merchant replies, dispute/referral receipts, provenance and explainable **review aggregates**. It also owns its transactional state and **durable outbox**. A provider-neutral, modular-monolith/headless implementation is sufficient; neither a separate deployment nor an external review platform is mandatory.

Reviews does **not** own purchases or fulfilment (Order/Booking/service owner), invoices (Invoice), source resource listings (Product/Marketplace/Publisher), actors or access decisions (IAM), platform-wide investigations (Moderation), privacy/legal rules (Privacy/Legal Compliance), external connectivity (Integrations), evidential custody (Audit), technical logs (Logging), saved analytical reports (Reporting), search indexing (Search) or personalised recommendations. A review or positive score is not proof of product quality, reviewer independence or a completed transaction.

## Native behaviour and integrity rules

- **Review lifecycle:** received → validated → pending screening/review → published, withheld or rejected; later revision, suspension or withdrawal remains traceable. Verification, business reply, dispute and provider-sync states are **separate tracks**, not one combined status. State changes require an attributable revision and explicit receipt.
- **Eligibility and authors:** permit signed-in users and controlled, invited guests; no unrestricted anonymous publication by default. Genuine unverified experience reviews may be allowed and honestly labelled. Resource/experience eligibility, review window, rating dimensions and duplicate-per-experience rules are governed by effective policy. Distinct genuine repeat experiences remain possible.
- **Verification:** reserve `verified purchase`/`verified service` for current, appropriate evidence from Order, Booking or the accountable fulfilment owner. An invitation, customer claim, provider badge or review-code possession does **not** prove fulfilment. Retain minimised source/version/checked-at/scope and reassess after cancellation, reversal or contradictory evidence; represent `pending`, `revoked` and `unknown` honestly.
- **REV-R01 receipt/invoice code:** the authoritative transaction/experience owner issues a high-entropy, purpose-, tenant-, resource- and experience-scoped, expiring claim token; Invoice may **display** it as code, QR or deep link. Reviews validates issuer/eligibility, rate-limits guessing, handles single-use claim/deduplication and revocation, and binds it to a review. No personal or order details are embedded in the code; do not log or retain redeemable codes in ordinary client storage. Reused, forwarded, expired, cancelled and uncertain codes have safe, non-disclosing outcomes. Issuance and redemption are not purchase verification.
- **Fair collection and publication:** apply consistent, sentiment-neutral invitation, screening and display rules; no fabricated reviews, preferential solicitation of positive feedback or covert suppression. Permitted incentives must be lawful, disclosed and sentiment-independent. Use proportionate anti-bot, conflict-of-interest, forged-receipt, spam and abuse controls. Flagging is not automatically a factual finding.
- **Moderation and response:** Reviews handles ordinary correction, withdrawal, review-specific rule enforcement and an accountable business reply; serious contested fraud/abuse and independent appeals belong to Moderation. Reviews alone applies its review-visibility transition and supplies a completed/refused/pending receipt. A subject representative cannot rewrite a customer's review.
- **Ratings:** default to five stars, an arithmetic mean, count and distribution, with separately labelled verified/unverified subsets. Publish the denominator, period, eligibility/exclusion and source rules, as-of/coverage information and applicable small-cohort suppression. Withdrawn, withheld and substantiated fraudulent reviews do not enter current public totals. Do not silently blend external ratings or imply a verified-only average is the all-review score.
- **External sources:** native operations work without Trustpilot. Integrations owns provider credentials and adapters; Reviews validates permitted provider claims, remote ID/revision, source rights, provenance and reconciliation. Local and external records retain separate authority and attribution. Imported claims cannot silently create locally verified purchase facts. Provider timeouts/conflicts stay pending/unknown and must not duplicate publication.
- **Data/rights:** use server-side tenant, resource, audience, author and merchant-representation checks for each action/read/export. Store minimised sensitive evidence references; protect personal identities, customer receipts, invitation tokens, private reports and investigation details. Apply source-qualified correction/erasure, retention and lawful holds with attributable history. Mandatory security and legal floors outrank tenant preferences.

## Planned public contract — inputs

These are logical **public ports**, not fixed names or endpoints. All commands take trusted tenant/actor or permitted guest context, source identifiers/revisions, effective policy, appropriate purpose/audience, idempotency and correlation; reject unauthorised or unsafe input without revealing protected resource existence.

| Port | Information received and owner | Intended result |
|---|---|---|
| **REV-IN1 — Submit/edit/withdraw** | Reviewer/host: resource reference, rating/schema, text, experience claim, disclosure/consent details, expected revision | Validated review transition and qualified receipt |
| **REV-IN2 — Resource context** | Product, Marketplace, Publisher or service owner: resource existence, tenant, visibility, subject-owner role, version and eligibility | Scope-safe eligibility and correct reviewed subject |
| **REV-IN3 — Source verification** | Order, Booking or fulfilled-service owner: minimal source evidence, completion/reversal, item/experience binding, time and revision | Independently versioned verification assessment |
| **REV-IN3A — Receipt-code redemption (REV-R01)** | Source-issued scoped entitlement/code, guest claim and source eligibility query | Safe consumed/expired/revoked/duplicate/pending claim; no assumed verification |
| **REV-IN4 — Business reply** | Authorised subject representative: review/revision, merchant role and reply content | Reviewed and revisioned reply state |
| **REV-IN5 — Effective policy and trust** | Host/IAM, Configuration, Privacy, Legal Compliance and Clock: scope, access/assurance, versioned rules, time, purpose and rights | Valid access, disclosure, retention and enforcement decisions |
| **REV-IN6 — Safety/moderation** | Content Security signals, Moderation case/outcome and qualified enforcement request | Accepted/refused/applied review action; evidence linked to case |
| **REV-IN7 — External provider** | Integrations: permitted connection, remote review/reply claim, provenance, sync checkpoint and provider rights | Attributed import and reconciled/unknown sync outcome |
| **REV-IN8 — Orchestration** | Workflow, Scheduler, Notifications, Message Queue: approved work results, deadlines, notice delivery and event transport | Reconciled tasks and delivery acknowledgements, without authority transfer |

A port is essential **only when its operation requires it**: authoritative source proof is compulsory for a **verified** label but not for a permitted unverified review; external providers, notifications and optional orchestration need not be present.

## Planned public contract — outputs

| Port | Supplied to authorised consumers |
|---|---|
| **REV-OUT1 — Command/claim receipts** | Review/claim reference, revision, accepted/rejected/duplicate/pending/unknown result and next action; acceptance is not publication or purchase verification |
| **REV-OUT2 — Review views/history** | Audience-filtered rating, text, provenance, source/verification label, reply, time, status and allowable revision history |
| **REV-OUT3 — Verification assessment** | Verification class, minimised evidence/source reference, scope, checked-at/revision, expiry/revocation and uncertainty |
| **REV-OUT4 — Replies/disputes** | Qualified business-response state, referral/case reference and actual visibility/enforcement receipt |
| **REV-OUT5 — Review aggregates** | Average, count, distribution, verified breakdown, eligible population, method version, time window, suppression and completeness |
| **REV-OUT6 — Committed change events** | ReviewSubmitted/Edited/Published/Withheld/Withdrawn, VerificationChanged, ReplyPublished/Withdrawn, AggregateRecomputed, ProviderReconciliationRequired; own-state outbox and event/revision identifiers |
| **REV-OUT7 — Operational/provider status** | Safe sync, source uncertainty, backlog/discrepancy and reconciliation status |
| **REV-OUT8 — Controlled export** | Authorised, purpose-scoped, versioned review/history data with privacy redactions, provenance and lawful holds |

**Illustrative commands:** `redeemReviewInvitation`, `submitReview`, `editReview`, `withdrawReview`, `reassessVerification`, `submitReply`, `withdrawReply`, `requestReviewVisibilityChange`, `referReviewDispute`, `applyQualifiedModerationDecision`, `reconcileExternalReview`, `recomputeAggregate`, `requestExport`. **Queries:** `getReviewInvitationEligibility`, `getReview`, `listReviewsForResource`, `listMyReviews`, `listReviewQueue`, `getVerificationProvenance`, `getReputationSummary`, `getReviewHistory`, `getProviderReconciliation`. Names are illustrative only.

Return stable `invalid`, `denied`, `not-found-or-not-disclosable`, `conflict/stale`, `duplicate`, `pending`, `unsupported`, `unavailable` or `unknown` where applicable. A timeout never proves commit or rollback. Commands check expected revisions and idempotency; events derive from committed Reviews-owned changes, with duplicate/out-of-order transport tolerated. Preserve effective and observed times, policy revision, source provenance and data coverage. Consumers must not query private Reviews tables or treat event transport as exactly-once.

## Reciprocal capabilities and their authority

These are **directional public information contracts**, not direct imports or newly mandated services. Preserve an acyclic dependency graph (ADR-0016).

| Partner | Reviews receives → Reviews supplies |
|---|---|
| **Product / Marketplace / Publisher / domain owners** | Resource identity, ownership, lifecycle and eligibility → review lists, safe reputation summaries, source-qualified publication changes. Owners retain their pages and resource state |
| **Order / Booking / Invoice** | Purchase/experience completion, reversal and review entitlement; Invoice presents source-issued code → eligible claim/redemption and review verification assessment. Invoice does not establish fulfilment |
| **IAM / Profile / Authorisation** | Actor/tenant, representation, assurance and access decisions → authorised reviewer/merchant references and audience-bound results |
| **Configuration / Clock / Privacy / Legal Compliance** | Effective options, time semantics and legal/rights constraints → policy decisions, rights action/disposition and provenance receipts |
| **Content Security / Moderation** | Detector signals, case findings and qualified action requests → bounded review context, referral, applied/refused/unknown enforcement receipts |
| **Comments Engine** | Optional safe reply conventions → review-owned response reference; no generic thread/methodology ownership transfer |
| **Integrations** | Provider permissions, attributed remote records/revisions and sync state → authorised sync intents, conflicts and reconciliation status |
| **Workflow / Scheduler / Notifications / Message Queue** | Case/work results, deadlines, notification and transport receipts → approved intents, due times, notice triggers and committed outbox events |
| **Search / SEO / Publisher** | Permitted indexing/display requirements → public source review/aggregate projections, structured metadata and retraction events; no ownership of ratings |
| **Localisation / Theme Manager / UI** | Language, accessibility and semantic theme vocabulary → accessible, translated view-models and optional review screens |

### Error Normalisation, Logging, Audit and Reporting — REV-X01

| Partner | Reviews supplies (partner input) | Partner returns (public output) | Boundary |
|---|---|---|---|
| **[Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md)** (pure stateless library) | Source-owned versioned error code/mapping, known or uncertain result, safe opaque correlation and disclosure policy for submission, expiry/replay, conflict, proof or provider faults | Stable sanitised category/code, `messageKey`, safe public/technical projection and **advisory** retry qualifier | No IO, logging, events, source-state or automatic retry. Reviews decides actual outcome, permission, reconciliation and safe presentation |
| **[Logging](../../services/logging/services-record.md)** | Trusted, bounded error/severity/latency, safe correlation, provider/persistence and redemption diagnostics; **no raw review text, receipt, redeemable token, secret or private identity** | Qualified accepted/rejected/throttled/unknown intake, permitted diagnostic query and sink delivery/lag/drop health | A log receipt is not business success or Audit custody; routine failure does not undo a valid review commit |
| **[Audit](../audit/capability-record.md)** | Risk-selected, attributable review publication/withdrawal, material verification changes, policy/privileged override, sensitive disclosure and qualified denial/abuse events, with trusted source ID/revision/checkpoint, actor, scope, true outcome and minimal evidence | Independently accepted/pending/rejected/unknown evidence receipt, integrity/coverage/gap results, authorised evidence history | Reviews owns source events and outbox; Audit owns custody. Risk-critical policy may require durable guarantee/hold before action completion; a receipt is not proof of business success |
| **[Reporting](../reporting/capability-record.md)** | Authorised review facts, scores, source/reply/verification state, corrections/events, populations/method version, as-of time, completeness and disclosure restrictions | Governed report run/definition, trends, analysis, exports, freshness, suppression and coverage | Reporting owns derived saved analysis, not original reviews, live aggregates or source verification; log/error counts do not establish business outcomes |

**Four separate truths:** (1) Reviews' actual business transition; (2) Logging diagnostic intake/delivery; (3) Audit's independently qualified evidential custody; (4) Reporting's derived analysis. Error Normalisation formats error representations but produces none of those facts. Logging/Reporting outages do not automatically block valid Reviews activity. Mandatory Audit capture is risk-tiered: durable-source-outbox continuation for standard capture; explicit hold/fail-safe for approved critical evidence requirements. No automatic cross-component dispatch or circular dependency is implied.

## Standards, legislation and technical evidence — REV-S01

The following are **approved conceptual design references**, not a claim of ISO certification, implementation conformance or legal compliance. Legal Compliance determines jurisdiction/service/effective-date duties; Reviews enforces their approved implications.

| Reference | Reviews design requirement |
|---|---|
| **[ISO 20488:2018](https://www.iso.org/standard/68193.html)** (primary voluntary review standard) | Neutral collection, moderation/publication, authenticity, clear review sourcing and transparency. A clause-level conformance assessment needs the full licensed text |
| **ISO 10002:2018 / 10003:2018 / 10004:2018** (complaints, external disputes, satisfaction measurement) | Fair correction/appeal pathways and meaningful rating/feedback statistics |
| **[UK DMCC Act 2024](https://www.legislation.gov.uk/ukpga/2024/13/contents) and [CMA fake reviews guidance](https://www.gov.uk/government/publications/fake-reviews)** (relevant provisions from **6 April 2025**) | Reasonable/proportionate fake-review prevention and removal, no concealed incentives or misleading display |
| **[UK GDPR / ICO privacy by design](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/guide-to-accountability-and-governance/data-protection-by-design-and-by-default)** | Purpose, minimisation, author disclosure, protected evidence, retention, rights and holds |
| **EU Unfair Commercial Practices Directive as amended by (EU) 2019/2161; conditional Digital Services Act obligations** | Transparent authenticity/verification claims, sourcing and, where a host is in scope, notice/action/appeal |
| **US FTC [16 CFR Part 465](https://www.govinfo.gov/content/pkg/CFR-2025-title16-vol1/xhtml/CFR-2025-title16-vol1-part465.html)** (effective **21 October 2024**) | False endorsements, undisclosed insiders, prohibited incentives and unlawful suppression |
| **[W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) AA; WAI-ARIA 1.2** | Accessible review/rating forms, moderation queues, status announcements and keyboard interactions |
| **W3C [PROV-O](https://www.w3.org/TR/prov-o/)** (optional encoding) | Model attributed versioned evidence and source lineage without requiring RDF |
| **[Schema.org Review](https://schema.org/Review), Rating and AggregateRating; [Google review snippet guidance](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)** | Publish truthful, visible, authorised source-linked metadata through SEO/Publisher; respect provider eligibility, including self-serving review limits |
| **[OWASP ASVS 5](https://asvs.owasp.org/) L2 (L3 for critical), ISO/IEC 27001:2022 and ISO/IEC 27701:2025** | Secure input, access, code redemption, privacy/security governance and attributable controls; no implied certification |

Acceptance evidence should link **applicable reference → qualified obligation → Reviews contract action → responsible owner → scenario/result**. Update versions, licensing and legal scope at implementation and release. Immutable law/security controls cannot be weakened by tenant Configuration.

## Open-source implementation choices — REV-L01 and REV-L02

**Owner-approved policy:** use mature, active, publicly available **complete** code under commercially permissive MIT, BSD, ISC, Apache-2.0 or equivalent licensing; no mandatory restricted-source flagship, paid tier, hosted dependency or delayed open-source core. Verify licence at the chosen release/tag and transitive dependency, maintenance/security, redistribution duties, compatibility with Node 26, TypeScript 6, Nuxt 4 and PostgreSQL 18 before adoption. Approval is of the **shortlist**, not a specific package release.

| Purpose | Preferred or conditional option, source and licence |
|---|---|
| Public input validation | **[Zod](https://github.com/colinhacks/zod)** (MIT), preferred; [Ajv](https://github.com/ajv-validator/ajv) (MIT) *only* for JSON Schema/event interoperability |
| PostgreSQL driver and queries | **[node-postgres (`pg`)](https://github.com/brianc/node-postgres)** (MIT), **[Kysely](https://github.com/kysely-org/kysely)** (MIT), preferred; [Drizzle ORM core](https://github.com/drizzle-team/drizzle-orm) (Apache-2.0) an *alternative*, not an additional required ORM |
| Review-code generation | **[Nano ID](https://github.com/ai/nanoid)** (MIT) or Node Web Crypto for high-entropy opaque codes; [jose](https://github.com/panva/jose) (MIT) only where signed tokens are justified. Signed tokens still require durable replay/revocation control |
| Safe text and abuse | [DOMPurify](https://github.com/cure53/DOMPurify) (Apache-2.0 OR MPL-2.0) if approved rich text/HTML is needed; otherwise prefer safe plain text and reuse Content Security. [rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible) (ISC), conditional where host limiter is insufficient |
| Optional Nuxt GUI | [VueUse](https://github.com/vueuse/vueuse) (MIT); [vee-validate](https://github.com/logaretm/vee-validate) (MIT) for complex forms; [TanStack Query](https://github.com/TanStack/query) (MIT) only if built-in `useFetch/useAsyncData` is inadequate |
| Acceptance | [Vitest](https://github.com/vitest-dev/vitest) (MIT) and [Playwright](https://github.com/microsoft/playwright) (Apache-2.0) through established CI |

No required Redis/Valkey, Elasticsearch/OpenSearch, Neo4j, hosted review SaaS, independent event broker or undisclosed enterprise-only feature. PostgreSQL holds the review store, own outbox and bounded aggregates. Search owns search indexing; Workflow/Scheduler own orchestration; Message Queue owns event delivery; Integrations owns external review adapters. Avoid separate AI sentiment/fraud scoring engines before explainable, governed evidence and human review exist.

## Optional GUI and host composition — REV-G01

**Owner-approved conceptual presentation:** the representative [application-test-template](https://github.com/nuxt-layers-test/application-test-template) offers `/` home, `/admin` test dashboard, collapsible responsive capability sidebar, and a Theme Manager link to `/theme-manager`. A derived host can add **Capabilities → Reviews**, pointing to its proposed `/reviews` dashboard, plus an optional Reviews tile on `/admin`. All listed paths are **illustrative**, not shipped exports. The reference host's **Not signed in** placeholder and Theme Manager's unauthenticated local **test** mode are **not production authorisation**.

| Screen/entry point | Audience and public-contract behaviour |
|---|---|
| `/reviews` — dashboard | Authorised operator sees queued/published/withheld reviews, verification and rating summaries, disputed count and provider health via bounded review/aggregate queries, each with completeness/as-of |
| `/reviews/queue` | Screen/review pending, withheld, flagged and disputed content; qualified safe moderation actions, without treating detector signals as findings |
| `/reviews/:id` | Audience-specific detail and revision history, verification provenance, business response, permitted edit/withdraw/visibility action |
| `/reviews/replies` | Authorised business replies, publish/withdraw status, merchant representation checked at each action |
| `/reviews/disputes` | Complaint referral, Moderation decision and independent application receipt/status |
| `/reviews/verification` | Source-backed verification, revoked/unknown labels and receipt-code failure counts; **never show live codes, raw receipts or customer evidence** |
| `/reviews/ratings` | Transparent aggregate method, denominator, verified split, source coverage; optional deeper Reporting trends |
| `/reviews/settings` | Privileged tenant rules, guest windows, incentives/disclosure, thresholds, suppression, provider status and policy/effective revision. Actual provider connections remain with Integrations |
| Public resource page embedding | Review list/summary, verified meaning, declared incentives and merchant reply under Product/Marketplace/Publisher ownership |
| Consumer submit/edit flow | Signed-in or approved guest review form, safe validation, claims, revision and accepted-versus-published state |
| `/reviews/redeem` | Guest receipt/QR redemption with safe eligibility/expiry/duplicate status and no unauthorised disclosure before validation |

**Presentation contract:** Reviews exposes optional capability-owned screens or documented view-models/headless ports; the **host** controls route mounting, dashboard tile, sidebar/breadcrumbs and feature availability, with one supported public composition operation and **≤50 lines of host-specific wiring**. Theme Manager supplies semantic tokens, shared UI/Localisation supplies accessibility and translations, Clock interprets date/time. Every route, list, action and export rechecks server-side Authorisation/tenant scope; hiding a menu grants no protection. Meet WCAG 2.2 AA, keyboard/screen-reader ratings, accessible focus/status/error/empty/loading/unknown states, mobile responsiveness and i18n/RTL. No local browser storage of redeemable codes. Native Reviews works headlessly with no GUI or external provider.

**Future acceptance host:** a derived `nuxt-layers-test/reviews-test` can use synthetic fixtures to check navigation, operator/merchant/guest modes, REV-R01 redemption, publication queues, provider failure, reporting, privacy and access denials; no such repo or executable test is asserted here.

## Acceptance scenarios and completion

| Scenario | Required authoritative outcome |
|---|---|
| Eligible signed-in review or invited-guest submission, without external provider | Correct pending/accepted review receipt, no automatic publication; native mode works |
| Customer claim without source purchase evidence | Explicit unverified/claimed; never a fabricated verified label |
| Source completes order/service, then later reverses it | Versioned verified → pending/revoked assessment; aggregate corrected with source provenance |
| REV-R01 redeemed; then guessed, forwarded, revoked, expired or replayed | Valid claim scoped to source entitlement; duplicate/invalid attempts safely denied; code alone never confers verification or leaks customer data |
| Duplicate command, stale review revision, cross-tenant read or denied merchant reply | Idempotent outcome, safe conflict/denial and no uncontrolled second state change or existence leak |
| Unsafe review content, disputed takedown or appeal | Risk flag is not final finding; Moderation owns contested case; Reviews owns actual qualified visibility receipt |
| External provider unavailable, delayed or conflicting | Native reviews remain usable; remote status pending/unknown with attribution and reconciliation |
| Withheld/withdrawn/very-small or incentivised review cohort | Transparent denominator, exclusion and incentive labels; suppressed or qualified public aggregate |
| Privacy erasure with lawful hold | Qualified disposition, not invented deletion or unlimited retention |
| Logging unavailable, Audit critical capture unavailable or event replayed | Normal review valid under noncritical diagnostic loss; risk-critical action held if evidence required; replays deduped against durable owner state |
| Reporting/SEO consumer receives corrected source rating or unverified claim | Recomputed authorised derivative with freshness/coverage; no independent purchase truth |
| Accessible host GUI and guest form | Sidebar/dashboard and contextual journey meet role checks, keyboard, screen reader, locale and safe error treatment |

**Conceptual scope complete:** approved ownership, native behaviour, verification/receipt codes, idealised inputs and outputs, reciprocal interfaces, legal/security/privacy/standards, permissive library criteria, GUI/headless integration and acceptance scenarios are covered in this **single current specification**. Historical proposals remain in Git/PR history, not as duplicated shadow requirements.

**Not implementation- or merge-complete:** a published independent root `CONTRACT.md`, concrete versioned ports/events, persistence and outbox, storage register, security and rights design, example one-call host, release-specific dependency/licence review and CI acceptance remain for development. Draft PR #130 still requires reconciliation against latest governing/blueprint `master`, concurrent Order/Product Shopping Basket reciprocal edits and Reporting PR #129, plus protected-branch/check status and **explicit owner merge approval**. No tests/builds or implementation repository edits were performed during this conceptual review.
