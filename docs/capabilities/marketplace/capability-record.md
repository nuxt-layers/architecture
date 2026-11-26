# Marketplace — Capability Record

**Classification:** Domain candidate — multi-seller marketplace participation, product submissions, listings and venue-specific agreements.  
**Design status:** **Owner-approved conceptual specification** (MKT-01–MKT-10, plus seller catalogue submission, account reporting, specialist boundaries, standards, permissive OSS shortlist and advisory GUI). This does **not** establish an implemented or published runtime API, legal compliance, or production readiness.  
**Runtime status:** No Marketplace implementation repository or root `CONTRACT.md` was verified during this review. Availability, installation, configuration, operation, enablement and authorisation require separate implementation evidence.  
**Review:** Draft PR #91; opening governing baseline `b920ce0d8b361de000a6739a16123dbdc56df7a7`, blueprint `6dac83a03da8704f7945ee1bc894f2248300445a`. Recheck the latest `master` before merging.  
**Authority:** Accepted ADRs and [Capability Standard](../../standards/capability-standard.md) govern this non-normative blueprint. Relevant ADRs include 0001, 0009, 0012, 0016, 0017 and 0018.

## Purpose and ownership

Marketplace operates a configurable **multi-seller trading venue**. A seller can apply to participate, match or propose catalogue products, submit seller-specific offers, manage listings and view their own activity. Operators set venue policies, manage merchant eligibility, review submissions, restrict offers and handle marketplace appeals. A single-seller Shop remains independent of Marketplace.

**Marketplace owns:** venue identity and market-specific policy decisions; buyer/seller participation and eligibility within a venue; seller agreements and commission/fee **entitlement basis**; seller-to-venue catalogue submissions, reviews and publication decisions; offer/listing visibility, restrictions, withdrawal and history; marketplace-specific disputes/appeals; attribution of accepted Order lines to effective seller agreements; basic authorised account-activity summaries; committed events and its durable outbox.

**Other owners retain:** Identity/Authentication/Authorisation (principals, sessions, access); Verification (proof and qualified representation); Product (canonical item/service definitions, identity and matching); Pricing (authoritative price/tax/discounts); Inventory/Booking/service owners (availability); Order (accepted purchase, seller lines, changes and fulfilment); Billing (assessed charges and commission calculations), Invoice (issued documents), Payment Gateway (funds and settlements), Accounting (ledger); Communications/Notification (messages and delivery); Content Security (assessments), Moderation (reports/cases), Legal Compliance (applicable obligations), Search (index), Reporting (cross-domain analytics), Integrations (external connections) and Audit (independent evidence custody). **A listing is not an Order; commission entitlement is not an assessed charge or payment.**

Each venue has its own operator, scope, geography and effective policies. Sellers can participate in several venues without gaining another tenant's membership, authority, records or agreement. Seller identity/representation and resource access are independently checked. Marketplace is not a new tenant hierarchy, payment intermediary or duplicate product catalogue.

## Operation, configuration and lifecycle

**Native-first:** Marketplace can operate using its own PostgreSQL-backed data and durable outbox without a third-party marketplace provider. Without Order/payment capabilities, it offers only **catalogue and permitted enquiries**, never simulated purchases, fulfilment or settlement. With no communication capability, listing enquiries are unavailable; raw contact details are not exposed. Search and Reporting are optional: bounded native listing reads and basic own-account summaries still work.

**Seller participation:** request → evidence/review → approved, limited or rejected → suspended/reinstated/closed. A seller agreement is versioned, consented and effective for an explicit interval; changes never silently reprice historic Orders. Verification evidence may expire or be revoked. Marketplace interprets qualified evidence and applicable legal constraints; identity proof is not blanket merchant approval and universal KYC is not presumed.

**Catalogue submission:** choose a current matching Product, or request a new canonical Product through Product's public intake; add seller-specific description/condition/offer evidence; save draft → submit → request more information/hold → approve or reject with reason → publish a distinct venue listing, correct, appeal or withdraw. Product alone creates/matches the canonical item and confirms its revision; an ambiguous, pending or stale source cannot be treated as approved. Multiple sellers may list the same canonical Product independently. Support physical goods, digital products and services through a common source-reference contract, with category-specific requirements owned by relevant specialists. Explicitly refuse unsupported category/fulfilment combinations.

**Listing:** draft → submitted → held/approved → published → suspended/withdrawn/expired. Publication requires valid source identity, seller standing, applicable policy and safety evidence, current permission and market rules. Publication in an external provider is **not** confirmed merely because a local request was accepted. Revocation blocks new actions while preserving existing obligations and lawful history.

**Configuration:** operator-approved venue identity, regions/categories, role and eligibility rules, listing review, agreement/fees, moderation and appeals, consent, time windows, provider-authority maps, rate limits, data disclosure, retention and export. Configuration supplies versioned scoped settings; Marketplace applies domain constraints. Settings cannot weaken legal requirements, security baselines or access decisions. Clock owns time semantics; Scheduler/Workflow/Message Queue transport or orchestrate work but never establish business completion.

**Provider mode:** native Marketplace is authoritative initially. External publication/synchronisation is optional through Integrations. A future delegated-authority mode requires an approved **source-of-truth map per operation/object**, scoped grants, reconciliation/conflict handling, portability/export, revocation, provider costs and explicit local-versus-remote completion. Timeout or unverified provider response means **unknown**, not success. External authority is staged until security and reconciliation acceptance.

**Persistence and consistency:** Marketplace owns versioned records and a transactional outbox, not another capability's tables. Writes use server-side per-resource authorisation, scoped caller/representation, fresh evidence, expected revision, idempotency and attributable reason where relevant. Consumers tolerate repeated/out-of-order events and reconcile by owner event ID and source revision; no distributed exactly-once claim. Protected policy overrides require appropriate separation of duties. Seller/venue exit supports lawful history, erasure, access-controlled export and continuity for accepted Orders.

## Idealised public input contract

These are conceptual public **operations and evidence ports**, not implemented signatures. Required means required **when the particular business operation needs it**.

| Input and supplier | What Marketplace receives; ownership and failure rule |
|---|---|
| **Seller, buyer or authorised venue operator** | Create/configure venue, apply/restrict participation, accept agreements, submit/revise/withdraw catalogue items and listings, request reviews/appeals, export own data. Check current permission, tenant/venue/seller scope, revisions and idempotency; deny/hold invalid requests |
| **Identity, Authentication, Authorisation via host/IAM Integration** | Trusted actor, tenancy and representation, session assurance and `decide(caller, action, resource)`. Denied, unknown or expired protected permission fails closed |
| **Product, Pricing, Inventory and service/Booking owners** | Canonical item matches/creation outcome and revision, applicable verified prices/currency, stock or service availability with source freshness. Missing mandatory source information holds publication; unknown stock is not available stock |
| **Verification, Legal Compliance, Content Security, Moderation and Privacy** | Purpose-limited proofs, legal/age/trading obligations, content verdicts, case references and disclosure/retention limits. Necessary unresolved restrictions hold affected actions; specialists retain their records |
| **Order; Billing; Payment Gateway; Invoice; Accounting** | Seller-by-line accepted Order evidence, amendments/returns, assessed charges, payments, issued invoices and ledger outcomes. Marketplace only links market agreements and displays separately attributed statuses; absent outcome is unknown |
| **Configuration, Clock, Integrations, Scheduler/Workflow and MQ** | Effective scoped settings/time, verified provider connection and callbacks, scheduling/orchestration and transport receipts. None may assert Marketplace decisions or external completion |
| **Reporting / Communications, where composed** | Requested report result/run status or permitted buyer–seller enquiry/notification result. Reporting alone joins cross-owner business facts; Communications owns message content/transport |

## Idealised public output contract

All reads are versioned, permission-filtered and source-qualified, with appropriate venue/seller/tenant, effective time, completeness and provenance.

| Output and consumers | Marketplace publishes |
|---|---|
| **Venue/capability status** → host, Shop, sellers/operators | Active venue rules, policy version, operating mode, supported/disabled functions and effective restrictions |
| **Participation and agreements** → seller/operator, Order, Billing | Merchant eligibility, participation standing, approved seller agreement/commission basis and validity; never an IAM grant or financial charge |
| **Catalogue submissions** → seller, operator, Product intake | Draft/review status, product-match or creation request reference, source revision, outstanding evidence, approval/rejection reason, correction/appeal and linked publication |
| **Listings** → buyer UI, Shop, Search, Federation | Authorised, minimised, versioned public listing/search projection and committed publication, correction, visibility, expiry and withdrawal facts; includes venue/seller scope, canonical Product reference and permitted fields. Marketplace remains listing authority, Product owns item identity, Pricing current prices and Inventory/Booking availability; Search may return only qualified candidates and ingestion receipts. Actual transport requires approved public source contract, no private schema access. |
| **Commission attribution** → Billing, Reporting, authorised seller | Venue, seller, effective agreement, linked Order lines, disputed/corrected fee entitlement **evidence**, not posted invoices, assessed charges or payouts |
| **Actions/appeals and provider status** → seller/operator, Moderation, Integrations | Marketplace-enforceable restriction and appeal result; local versus external acceptance/unknown/reconciled receipt with recovery references |
| **Native account activity and qualified report sources** → authorised seller, Reporting | Own submissions, listings, holds and marketplace activity. Reporting receives versioned seller/venue facts to join separately authorised Order/Billing/Payment data and returns derived runs/exports |
| **Committed owned events and export** → Audit, Search, MQ, authorised consumers | Participation, agreement, catalogue submission, listing, appeal, attribution and external-reconciliation change facts through durable outbox; authorised history/export with redaction and retention |
| **Sanitised diagnostics** → Logging/Observability | Safe operation codes, latency, retries, revision conflicts, outbox backlog and provider failures, without raw seller credentials, proof dossiers or messages |

**Illustrative commands:** `createVenue`, `requestParticipation`, `approveOrRestrictParticipation`, `registerAgreement`, `submitCatalogueItem`, `requestProductCreation`, `reviseSubmission`, `approveOrRejectSubmission`, `submitOrPublishListing`, `suspendOrWithdrawListing`, `resolveAppeal`, `requestExternalPublication`, `reconcilePublication`, `requestExport`. Queries include `getVenuePolicyAndStatus`, `getParticipation`, `listMySubmissions`, `getListing`, `listListings`, `getCommissionAttribution`, `getMyMarketplaceAccountSummary`, `getMarketAction`, `getProviderSyncStatus`.

**Event classes:** participation requested/approved/restricted/closed; agreement activated/terminated; catalogue item submitted/held/approved/rejected; listing published/changed/suspended/withdrawn; market appeal resolved; attribution recorded/corrected; provider publication reconciled. Commands and event names are **illustrative**, not promised implementation APIs. Responses distinguish **accepted**, **held**, **completed**, **rejected**, **conflict** and **unknown**; an accepted local command is never proof of an external transaction. Use stable reason codes, revisions, source references, correlation/recovery IDs and policy/effective times. No private database/provider SDK type enters the public contract.

## Reciprocal capability relationships

| Partner | Information Marketplace needs ← / supplies → | Boundary |
|---|---|---|
| Product, Pricing, Inventory, Booking | Canonical identity, price and availability ← / submitted product intent, released venue-specific offers and restrictions → | Each specialist owns source truth; Product creation requires explicit confirmation |
| Identity, Authentication, Authorisation, IAM Integration, Verification | Caller/assurance/decision and qualified proofs ← / current venue participation and restriction → | Representation, verified identity and venue eligibility are distinct |
| Shop, Order, Billing, Invoice, Payment Gateway, Accounting | Order/fee/payment/doc outcomes ← / authorised listing, seller eligibility and agreement attribution → | No duplicate Orders, charges, settlement or ledger |
| Legal Compliance, Privacy, Content Security, Moderation | Qualified obligations, consent/disclosure, safety verdict and case ← / market action, hold, notice, appeal outcome → | Specialists own assessment; Marketplace enforces market action |
| Communications, Notification, Search, Federation, Media | Delivery/index/material provenance ← / listing-linked enquiry context, eligible public listing, withdrawal and notice request → | Optional integrations, no reownership of messages, index or assets |
| Configuration, Clock, Scheduler, Workflow, MQ, Integrations | Effective settings/time, orchestration, provider evidence ← / committed market actions, provider requests and reconciliation status → | Transport, configuration and provider responses never override domain authority |

### Logging, Audit and Reporting — three different public exchanges

| Specialist | Marketplace sends → | Specialist returns ← | Who owns what? |
|---|---|---|---|
| **Logging** | Sanitised structured errors, latency, retries, invalid transitions, provider timeouts and correlation | Technical intake/availability and diagnostic reference | Logging owns technical logs/retention, **not** Marketplace status or independent proof; no full private offers, credentials, personal evidence or raw enquiry content |
| **Audit** | Minimal, attributable **committed** seller/listing/agreement/privileged disclosure/restriction/appeal events, with source ID/revision, actor, reason, effective time and evidence references | Independent accepted/rejected custody receipt, integrity status and permitted review/gap results | Audit owns evidence custody/integrity and lawful review; Marketplace alone owns actual decision; replay-safe delivery and gap reconciliation; Logging is no substitute |
| **Reporting** | Authorised venue/seller-scoped submission, participation, listing activity, restrictions, agreement and attribution evidence, plus revision/as-of/completeness | Derived report/run status, aggregated results, trends and authorised export/snapshot references | Reporting joins **separate** Order/Billing/Payment/Accounting facts; never treat listings as sales or fee entitlement as paid earnings. Basic native Marketplace summary works without Reporting |

These are directional, host-composed public contracts, not circular package imports. A Reporting query cannot bypass source authorisation or disclose another seller through an aggregate. Revocation and corrections must revalidate access to stored report snapshots/exports. Audit delay or failure is explicit and reconciled; mandatory evidence preconditions fail safely. A successful technical log, audit receipt or Reporting run never changes Marketplace business state.

## Security, privacy, legal compliance and standards

**Threats:** fraudulent/impersonated sellers, unauthorised delegates, counterfeit/prohibited goods, manipulation of listing reviews and commission evidence, cross-seller leaks, malicious uploads, provider callback replay, stale public search results, access to historical reports, self-dealing and deceptive promotions. Apply server-side resource-specific IAM decisions, assurance freshness, separation of duties for sensitive overrides, anti-abuse/rate limits, payload validation, safe Media/Content Security paths, privacy minimisation, lawful evidence retention/export, redaction and auditable corrections. Withdrawn or legally restricted offers must not leak via caches, snippets, metadata or export.

| Standard/reference | Design application and qualification |
|---|---|
| **W3C WCAG 2.2 AA**, semantic HTML/WAI-ARIA; **ETSI EN 301 549** where applicable | Keyboard, mobile and assistive-technology-friendly catalogue forms, approvals, appeals and reports; accessible feedback, responsive tables and non-colour-only states. WCAG 2.2 AA is the platform baseline |
| **OWASP ASVS 5 Level 2** minimum; relevant **Level 3**; OWASP API Security Top 10 | Authorisation, seller/tenant isolation, content handling, replay resistance and protected financial/publication actions |
| **ISO/IEC 27001:2022; ISO/IEC 27701:2025; NIST CSF 2.0** | Security, supplier controls, privacy-management and risk governance guidance; not automatic certification |
| **GS1 GTIN / Global Data Model; Schema.org Product/Offer/Service/return/shipping vocabularies** | Catalogue matching and published structured offer metadata; GTIN is optional where inapplicable to handmade, unique or service listings; Schema.org is not internal authority |
| **OpenAPI 3.1, JSON Schema, IETF RFC 9457, CNCF CloudEvents 1.0** | Recommended interoperable API/schema/error/event representation when appropriate, without mandating HTTP or event transport |
| **IETF BCP 47, Unicode CLDR, ECMA-402, ISO 8601, ISO 4217, ISO 3166** | Language, locale, dates/timezones, currency, geography, provenance and reporting semantics |
| **W3C Verifiable Credentials 2.0** (optional) | Qualified issuer evidence exchanged via Verification, not a universal KYB mandate |
| **UK GDPR/ICO, UK Online Safety Act and consumer/product rules; EU GDPR, Digital Services Act, General Product Safety Regulation, European accessibility requirements** | **Conditional legislation, not technical standards.** Legal Compliance establishes whether each obligation applies by jurisdiction, product type, platform role and effective date; no universal compliance assertion |

Reference specifications: [W3C WCAG](../../../RESOURCES.md#ref-0d1f555e), [OWASP ASVS](../../../RESOURCES.md#ref-5303bf5b), [GS1](../../../RESOURCES.md#ref-cfd8716d), [Schema.org](../../../RESOURCES.md#ref-eeffaa51), [OpenAPI](../../../RESOURCES.md#ref-da6a3c81), [RFC 9457](../../../RESOURCES.md#ref-7754416d), [CloudEvents](../../../RESOURCES.md#ref-de31eb79), [ISO 27001](../../../RESOURCES.md#ref-42fa42bb), [EU DSA](../../../RESOURCES.md#ref-744b86ab) and [EU GPSR](../../../RESOURCES.md#ref-7dded1f0). Recheck effective editions/harmonisation before implementation. This list is a conceptual interoperability and applicability reference, not proof of certification or legal conformity.

## Open-source library selection — approved options, not dependencies

Require **complete publicly available required source**, mature active maintenance, commercially permissive licence, suitable transitive dependencies and redistribution notices; reject feature-gated or source-available enterprise substitutions for necessary functionality. Check exact versions, security advisories and compatibility at implementation. The approved shortlist is:

| Function | Candidate and licence | Selection |
|---|---|---|
| TypeScript runtime validation | [Zod](../../../RESOURCES.md#ref-1e3efac4) — MIT | Preferred where common validation is not already provided |
| Dynamic JSON Schema validation | [Ajv](../../../RESOURCES.md#ref-a164796d) — MIT | Conditional, for externally defined/category schemas |
| Marketplace-owned PostgreSQL access | [Kysely](../../../RESOURCES.md#ref-af839a5b) — MIT **or** [Drizzle ORM](../../../RESOURCES.md#ref-03cb5387) — Apache-2.0 | Choose one after platform convention check, not both by default |
| Exact commercial decimal values | [decimal.js](../../../RESOURCES.md#ref-992a7688) — MIT | Conditional; Billing retains assessed-charge maths |
| Optional tables and charts | [TanStack Table](../../../RESOURCES.md#ref-af94a8b1) — MIT; [Apache ECharts](../../../RESOURCES.md#ref-1aa1e4a8) — Apache-2.0 | Presentation only, with accessible text/table equivalents |
| File type hint | [file-type](../../../RESOURCES.md#ref-e88cf18e) — MIT | Advisory only; Media/Content Security own content safety |
| Existing infrastructure | [PostgreSQL](../../../RESOURCES.md#ref-fa79609e) — permissive PostgreSQL licence | Preferred Marketplace transactional storage and outbox |
| Optional Search-owned engine | [OpenSearch](../../../RESOURCES.md#ref-133dccf8) — Apache-2.0 | Not a Marketplace-owned service; use Search's selected provider |

Do **not** use Vendure (GPLv3) as a permissively licensed foundation, or presume that Medusa/Meilisearch enterprise-gated offerings meet the user's strict complete-source criterion. Do not introduce Redis, Elasticsearch, Neo4j or another partial-core/source-available product to meet a dependency. Do not add a second order, payment, reporting, IAM, search or workflow system. The shortlist does not mandate installation of any item.

## Advisory GUI and representative host

Marketplace benefits from **optional GUI screens** while remaining headless. The verified [application test template](../../../RESOURCES.md#ref-f1f7cc47) provides host-owned `/`, `/admin`, an expandable **Capabilities** sidebar with **Theme Manager → /theme-manager**, responsive mobile navigation, top bar and Theme Manager semantic styling. A derived test consumer may add **Marketplace → /marketplace** as a sibling entry, without copying the shell or importing private layer paths. The host owns menus, routing, branding, current venue/seller context and real IAM; Marketplace supplies permission-checked screen/data contributions. Theme Manager's `test` mode is **unauthenticated and local-only**, not production access. Its current root `CONTRACT.md` notes a public-production-composition blocker; do not copy internal providers.

| Screen family (advisory) | User task and contract |
|---|---|
| Marketplace overview | Authorised venue summary, account standing, submissions/listings needing attention, native activity |
| Browse catalogue / buyer offers | Public-only listings, seller identification, authorised search and source-qualified prices/availability |
| Guided submit product / listing | Match existing Product first; request a new one through Product, provide category-specific evidence, save draft, preview, track review/reasons, correct/withdraw |
| My listings / My Marketplace Account | Seller offer lifecycle, participation, agreement basis, native activity; optional Reporting-driven sales/commission/returns exports |
| Seller application / enquiries | Participation, qualified evidence, consent/agreements, optional communications through their owner |
| Operator review / appeals | Seller/listing decisions, requirements, hold/reinstatement, reason, second approval where relevant; specialist Moderation and Audit links |
| Venue admin / provider sync | Effective policies, permitted categories/agreements, integration status, remote unknown/reconciliation, controlled exports |
| Reporting administration (where installed) | Cross-source filters, reports, scheduled runs, snapshots and permissioned exports from Reporting |

Presentation is role/context sensitive and mobile-first, with WCAG 2.2 AA and Theme Manager tokens, keyboard/focus/screen-reader support, simple stepwise forms, visible saved state, plain-language status and errors. Context switches invalidate old seller/tenant data. Hidden navigation is **never** permission. Disabled functions clearly explain missing providers rather than inventing success. Screen count and routes are suggestions, not mandatory implementation choices. The host can present buyer pages separately.

## Conceptual acceptance and remaining gates

| Scenario | Required outcome |
|---|---|
| Existing Product match / novel product / duplicate ambiguity | Canonical Product owner confirms item identity or rejects/holds; Marketplace tracks seller submission and never silently creates/approves Product |
| Category coverage and safety | Physical, digital and service listings share contract but enforce applicable item/availability/legal checks; unsupported mode fails explicitly |
| Seller approvals, expired representation and appeals | Current evidence/authorisation required; attributable versioned reason and enforceable Marketplace action; Audit custody remains separate |
| Cross-tenant or revoked seller reads/commands | Deny with no state change, listing leak, indirect search facet or report disclosure |
| Concurrent publish, retry and webhook replay | Expected-revision/idempotency results; no duplicated listing, commission attribution or outbox facts; external uncertain stays unknown |
| Accepted order versus commission versus payment | Distinct versioned source outcomes; no claimed paid/posted amount from agreement or listing |
| Seller account reports with Reporting missing or source data stale | Native own-account information works; financial reports depend on separately authorised sources, mark missing/partial and as-of |
| Logging/Audit/Reporting delivery and corrections | Technical log not proof; Audit independently acknowledges/flags gaps; Reporting refreshes/restricts derived results without mutating domain records |
| Optional integrations and seller withdrawal | Native catalogue stays available; absent Communications disables enquiry; provider withdrawal/reconciliation and lawful export retain owned history |
| Independent Nuxt acceptance host | Sidebar and dashboard via public interfaces, theme/mobile/accessibility, headless fallback, role and tenant isolation; ADR-0012 one-call composition within 50 lines |

**Approved design decisions:** **MKT-01** independent multi-seller Domain; **02** authoritative participation, agreement and listing lifecycle; **03** commission attribution without financial charge ownership; **04** proportionate verification/safety and specialist boundaries; **05** native capability with catalogue/enquiry-only fallback where composed; **06** versioned public operations, scoped security, durable outbox and reconciliation; **07** separable accessible GUI; **08** shared contract for physical/digital/service offerings; **09** optional privacy-preserving buyer–seller enquiries; **10** native-first external-provider-neutral design with delegated authority staged. Owner also approved seller catalogue intake, self-service account reports, standards approach, permissive open-source shortlist, Logging/Audit/Reporting interactions and advisory GUI. **No outstanding owner-level conceptual design decision is known.**

**Implementation investigations, not conceptual blockers:** verify actual neighbouring root `CONTRACT.md` compatibility, item/source and provider mappings, jurisdictional trading duties, Billing rounding/merchant-of-record, tax and seller settlement responsibilities, event/error schema and migration, security/control coverage, exact dependency versions and platform conventions. Any new contradiction requires formal review; approval does not pre-approve an unsafe or inconsistent implementation.

**Release/merge distinction:** Conceptual record can be considered **content-complete and owner-approved** subject to final architecture/Git reconciliation. It is not a published runtime contract or implementation acceptance. The future implementation needs a self-contained root `CONTRACT.md`, public exports and composition, `STORAGE-REGISTER.md`, threat model and CI/contract/accessibility/replay/security tests. No implementation repo was edited, and no local build/test was run in this review. **Draft PR #91 must not be merged without the requested pre-merge architectural and Git checks and separate explicit merge approval.**

## Moderation — approved current reciprocal contract (PR #96)

**Moderation-side concept approved; not an implemented adapter or an independent approval of this capability.** Marketplace owns seller/listing records, business eligibility and actual sanctions. Moderation sends case-linked scoped revision-specific findings and action requests; Marketplace independently authorises changes and returns accepted/completed/refused/unknown receipts. Marketplace remedy rights and commercial outcomes stay Marketplace-owned. [Canonical Moderation specification](../moderation/capability-record.md). Public versioned, scoped ports preserve source ownership and acyclic package dependencies.


## Reciprocal interface — Order independent conceptual review (22 November 2026, draft PR #113)

**Status: Order-side conceptual contract ORD-01–ORD-11 owner-approved 22 November 2026; implementation and this neighbour's independent contract approval are not implied.** [Order's canonical public conceptual contract](../order/capability-record.md) owns versioned sales/purchase commitments, accepted seller-scoped order lines (multi-seller checkout uses shared correlation with distinct seller orders), amendments, cancellation, returns and commercial obligation status. A tenant-scoped Business Contacts/Parties authority supplies current counterparty facts (exact capability allocation remains subject to its own review); long-term contract terms and physical/service performance evidence have separate owners. Order exposes scoped commands, authorised queries and durable committed events. This neighbour retains its own authoritative decisions: an Order never proves stock, transport, charges, issued invoices, payment, postings, scheme rights or entitlements. Exchange only versioned, provenance-rich, tenant-authorised public information, with explicit stale/unknown outcomes. Preserve this neighbour's own decisions and reconcile any differing provisional PR before its approval or merge.

**Standards alignment (Order-side approved conceptual scope):** For marketplace transactions, Order's owner-approved standard alignment maps each seller-specific accepted order to optional OASIS UBL/Peppol/GS1 trading-partner representations; a shared checkout correlation is not a multi-seller EDI contract or publication authority. Marketplace retains venue/seller eligibility and attribution decisions.

## Payment Gateway reciprocal boundary — approved conceptual integration (22 November 2026)

**Status:** Payment Gateway boundary **owner-approved conceptually (PGW-01–PGW-12, 22 November 2026)** in draft PR #116, not a verified implementation contract or an override of this capability's previously approved authority. [Payment Gateway](../../services/payment-gateway/services-record.md) accepts only a current, separately authorised and source-revision-bound payment/refund intent, with tenant, merchant/legal-payee, amount, currency and idempotency reference. It returns verified provider authorisation/capture/refund/reversal/dispute evidence, explicit pending/unknown outcomes and stable operation references; redirects and duplicate webhooks do not prove collection. **Marketplace retains seller eligibility, line attribution and commission terms; split settlements, seller payouts and escrow require separate lawful financial authority and provider support.** Consumers handle asynchronous, replayed and reversed provider events using the Gateway's current versioned public status, without package-private coupling. This boundary is approved on the Gateway side and does not supersede the neighbouring capability's own authoritative contract.

## Product approved conceptual interface — 22 November 2026

**Product-side interface owner-approved (22 November 2026; Product draft PR #122); neighbouring capability's independent approval and published implementation remain unverified:** Marketplace may submit rights-qualified seller proposals and match evidence to Product; Product returns confirmed canonical item/revision, pending, ambiguity or refusal. Seller-specific terms, condition, eligibility and publication remain Marketplace-owned; Product's accepted draft does not authorise a listing. GTIN is optional when inapplicable; stale/contradictory source blocks automatic publication. See [Product's proposed public contract](../product/capability-record.md).

## Reciprocal conceptual interface — Pricing (22 November 2026, draft PR #119)

**Status: Pricing PRI-01–PRI-07 and five supplementary pricing solutions owner-approved conceptually on 22 November 2026; not implemented, and this does not approve the neighbouring capability review.** [Pricing](../pricing/capability-record.md) is the authority for versioned commercial tariffs, effective price lists, discounts, coupon rules, currency/rounding policy and attributable quote calculations; it does not own marketplace listings, seller admission, agreement/commission or publication. The partner supplies its own scoped, effective, revisioned source facts where relevant; Pricing returns qualified price/quote, source revision, calculation evidence, currency, tax/FX certainty and expiry. Missing, stale, unauthorised or contradictory mandatory input prevents a definitive claim; a quote, order, assessed charge, payment and posted invoice are distinct facts. Integrate through public acyclic contracts/ports/events, not private schemas or an inferred package import. Preserve existing independently approved partner decisions; proposals in active parallel PRs require reconciliation before merge.

## Reciprocal standards interface — Pricing (22 November 2026)

**Pricing standards application (approved conceptual direction, 22 November 2026):** [Pricing](../pricing/capability-record.md#security-compliance-internationalisation-and-standards) supplies effective currency/units, itemised unavoidable price components, qualifying price/discount history and expiry evidence; Marketplace remains responsible for what its listing displays or advertises, using Legal Compliance's applicable jurisdictional rules. For public offers, use accessible WCAG 2.2 AA presentation and eligible Schema.org Offer/PriceSpecification data without leaking private tariffs. Unknown mandatory fees or unsupported historical discount claims are held, not published as definitive.


## Reciprocal durable Shopping Basket seller listing selections — 23 November 2026

**Status:** SB-01–SB-08 **owner-approved conceptually on 23 November 2026**; no verified runtime Marketplace–Basket contract. [Shopping Basket](../shopping-basket/capability-record.md) holds a source-qualified seller/venue/listing ID and revision for each intended line, with seller-separated checkout groups and no independent seller approval or publication authority. Marketplace alone supplies effective seller standing, venue/listing visibility and restrictions by buyer/channel, including withdrawn or suspended status. A saved stale line may remain flagged; checkout for that seller fails closed on unknown or ineligible listing. Define exact listing/seller identity, revision, visibility and unknown response when public root contracts are published. No Marketplace import of Basket. Shop PR #134 remains a separate proposed storefront integration to reconcile, not an implementation guarantee.


## Reciprocal Shop composition boundary — 23 November 2026

**Status: Owner-approved Shop-side clarification in draft PR #134, not an amendment to approved Marketplace MKT decisions or an implemented API.** [Shop's approved conceptual composition contract](../../compositions/shop/compositions-record.md) keeps Shop a storefront/checkout presentation composition that consumes Marketplace's authorised venue, participation, listing, seller onboarding, product-submission and seller-account public outputs. Shop routes seller commands back to Marketplace, canonical item creation to Product and financial reporting to Reporting; it never approves merchants/listings, assesses fees, accepts Orders or settles payments. With Marketplace absent, Shop may offer single-seller retail composition. Shop-side classification and facades (SHOP-01–05) await owner approval; Marketplace's approved seller journeys remain intact.


## Verification independent contract alignment — 23 November 2026

**Status: proposed Verification-side interface in draft PR #148; preserves Marketplace's approved authority.** Verification VER-I04/VER-O05 proposes purpose-limited merchant identity, legal-representation/mandate and age/KYB evidence with issuer provenance, assurance, expiry/revocation and unknown states. Marketplace independently determines seller admission, listing eligibility and restrictions under its own jurisdiction/policy. An absent or stale required attestation holds/denies the action, never silently accepts; no blanket national-ID check or shared raw dossier. Compose one-way public ports.

## Checkout reciprocal conceptual interface — 24 November 2026

**Checkout-side conceptual interface owner-approved (24 November 2026):** Checkout PR #151, [conceptual contract](../checkout/capability-record.md). Marketplace supplies effective venue/listing/seller eligibility. Checkout correlates distinct seller commitments and eligible payment operations; explicit merchant-of-record model required. No assumed split or escrow. Existing approved decisions remain authoritative; host-bound public ports only, no circular imports.

## FAC-D01–04 — Approved reciprocal responsibility alignment

Party supplies qualified merchant/seller and representative references. Marketplace owns seller eligibility and listing decisions; Verification evidence and Party registration alone confer no marketplace standing. See [Party](../party/capability-record.md), [Payroll](../payroll/capability-record.md) and [Workforce Scheduling](../workforce-scheduling/capability-record.md) as applicable. Exchanges are purpose-scoped public ports, not mandatory imports.
