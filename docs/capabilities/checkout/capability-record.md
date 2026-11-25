# Checkout — conceptual capability record

**Identity:** `checkout` · **Class:** independent Domain capability candidate. **Status:** conceptual design complete and owner-approved (24 November 2026), including CHK-01–09, scope, contracts, standards, library selection and presentation. No implementation repository or published root `CONTRACT.md` verified. Governing adoption, implementation, independent acceptance, legal compliance and merge remain separate.

Review PR #151. Governing master `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint master `39a9f2b5f795cc8cab2890baf658b07e3d71451b`. Accepted governing ADRs and Capability Standard prevail over this non-normative specification.

## Purpose and ownership

Checkout provides a reusable purchase journey from a qualified proposal to customer confirmation, submission and verified results. Any authorised application can use it, including Shop, Booking, Membership and external consumers. Neither Shop nor Shopping Basket is mandatory.

Checkout merits independent Domain ownership because its confirmation, attempt and recovery lifecycle is distinct from saved purchase intent, accepted orders and generic process progression. A stateless helper cannot provide durable recovery. A Process-only solution would move purchase-specific decisions into a generic capability. Independent packaging remains subject to implementation justification; the default deployment is a modular monolith.

Checkout owns:

- Mutable sessions: stable identity, revision, holder binding, initiating channel, tenant/seller scope, selections, preparation validity and profile revision.
- Immutable confirmed attempts: source proposal and quote revisions, minimum evidence of the terms actually shown and agreed, seller attribution, currency, confirmation time, completion criteria and submission key.
- Coordination: durable operation intents, stable owner-operation identifiers, source-qualified results, per-group disposition, recovery history and compensation requests.

Checkout does not own the basket, product, price, discounts, tax, exchange rate, seller/listing eligibility, reservations, accepted order, charge, invoice, ledger, payment, fulfilment, entitlement, personal profile or generic process/approval state. It is not a merchant of record, payment intermediary, legal interpreter, escrow or payout service.

Use host-supplied PostgreSQL infrastructure, Checkout-owned schema, migrations, persistence adapters and transactional outbox. Keep minimum snapshots and opaque source references; never access another owner's private schema. Optional Process retains its own generic instance and checkpoints. Checkout owns only its purchase-specific confirmation, operation correlation and disposition.

## Native lifecycle and coordination

**Session:** open → prepared → awaiting confirmation → submitted, abandoned or expired. A submitted session links to an immutable attempt. Changing material terms invalidates preparation. Expiry or browser closure never abandons submitted work.

**Attempt:** submitted → processing / customer action required / approval pending → completed, partially completed, rejected or cancelled; recovery required is an unresolved state, not final failure. Source operation outcomes remain distinct from the overall checkout result.

### Approved first-release profiles and execution

Use validated profiles, not arbitrary scripts. Each profile identifies the source offer/commitment authority, required checks, payment/fulfilment modes, seller grouping, completion criteria, permitted compensation and policy revision. Record the effective profile at confirmation. Current mandatory source restrictions still apply.

Support direct and basket-based checkout, guest and authenticated buyers, authorised representatives, physical and digital purchases, bookings, subscription initiation, zero-price and approved credit purchases, ordinary one-off payments and qualified seller-separated transactions. Recurring collection belongs to Subscription/Billing and execution to Payment Gateway; financing, escrow and split payouts are deferred.

1. Start from a qualified proposal or pinned basket revision. Verify holder, scope, seller, eligibility, current quote, terms and availability.
2. Present seller identity, goods/services, quantities, mandatory fees/taxes, exact payable amount and currency, delivery/collection, expiry, material terms and payment obligation. Use source-supplied amounts, checking arithmetic consistency without calculating price rules, taxes, FX or delivery charges. Never combine currencies into one total. Buyer, payer, recipient and payee may differ where authorised.
3. Obtain attributable confirmation of the exact prepared revision. Keep purchase agreement separate from marketing/privacy consent and recurring mandates. Reconfirm changes to amount, currency, seller, quantity, terms or fulfilment commitments before further affected irreversible acts.
4. Obtain applicable owner reservations or promotion holds. A pending Order is the normal commercial source for retail; another source may substitute only if its public contract establishes equivalent commitment and independent collection authority. Checkout cannot confer collection authority itself.
5. Coordinate eligible owner operations. A typical card journey holds stock, submits a pending Order, obtains collection authority, authorises payment, obtains seller acceptance and captures immediately or at dispatch as policy permits. Other profiles may accept before payment, require approval, use immediate-only rails, credit or free purchase. Buyer confirmation is not seller acceptance; authorisation is not capture; capture is not settlement.
6. Verify results against the profile. Return qualified owner references and notify the customer through the appropriate service. Returns, amendments and refunds after completion remain with source owners.

### Expiry, concurrency and recovery

Preparation validity ends at the earliest applicable quote, hold or policy expiry. Session inactivity is configurable within source constraints. Reopen expired unsubmitted sessions only after refreshing facts and confirmation. Persist operation intent before dispatch; use stable attempt/step/seller keys, expected revisions and worker fencing. Repeating a key with changed payload is a conflict.

On timeout, cancellation, decline or interrupted execution, read back the original operation. Retry only if its owner establishes duplicate safety; never retry unknown money movement with a fresh key or silently switch providers. Use bounded backoff and escalate unresolved operations. Request void, refund, cancellation or release only under independent owner authority. Preserve committed facts and residual obligations; no distributed rollback, manual mark-paid override or automatic refund for browser closure.

### Seller groups and completion

Each seller has separate terms, commercial commitments, eligible merchant/payment operations, taxes and line outcomes. Disclose possible partial completion before confirmation. Do not offer purported atomic multi-seller checkout without owner guarantees. Use seller-separated collection in v1; unsupported consolidated collection is blocked. A single payment across sellers would require a separately qualified merchant-of-record and collection/allocation model. Restrict seller visibility to permitted groups.

Complete only when all required groups meet profile criteria. Partial completion requires at least one completed group and known non-complete results for the others. Unknown mandatory outcomes take precedence as pending/recovery required; show confirmed groups separately. Terminal rejection/cancellation requires known results and resolved obligations or an explicitly recorded residual exception. Accepted orders with deferred capture may satisfy checkout only when the profile allows it; label payment authorised/deferred, not paid. Resubmit failed groups only with fresh confirmation and duplicate protection. After submission, cancellation is a request pending owner reconciliation.

### Illustrative completion policies

| Journey | Required evidence (conditional on offer) |
|---|---|
| Physical goods | Seller-accepted Order, required reservation and payment authorisation/capture or approved credit terms; dispatch later |
| Booking/event/course | Applicable capacity/eligibility hold and source confirmation plus required payment; no automatic admission or qualification |
| Subscription/membership/hosted service | Authorised agreement/admission/source commitment and required initial charge/payment; provisioning and recurring mandate separately authorised |
| Free | Qualified zero payable amount and source acceptance; no payment operation |
| Procurement | Buyer representation, seller acceptance and applicable approval/credit terms; no immediate payment required |
| Digital | Qualified commercial acceptance and required verified payment; entitlement owner independently grants access |

## Idealised public contract

The approved conceptual contract describes business meaning, not shipped exports or endpoints. A future root `CONTRACT.md` must document installation, composition, dependency versions, operations, permissions, errors, settings, optional presentation and acceptance evidence.

| Public surface | Input | Output |
|---|---|---|
| Start/resume | Trusted caller/holder, channel, source proposal or basket reference/revision, supported profile, operation key | Session ID/revision, expiry, allowed actions and resume status |
| Prepare/update | Session ID, expected revision, qualified selections and fulfilment choices | Prepared seller groups, quote/hold references, exact totals/terms, expiry and blockers |
| Confirm | Prepared revision and explicit customer agreement | Immutable confirmation reference and evidence, or changed-term/conflict result |
| Submit | Confirmed revision, eligible payment/credit/free route and stable submission key | Durable attempt ID, accepted/pending/rejected/conflict/unknown result, owner references and next action |
| Status/history/list | Authorised session/attempt or scoped filter, holder proof and purpose | Paginated, source-qualified per-group/line status, current vs observed facts, freshness and safe recovery guidance |
| Cancel/reconcile/exception resolution | Scope, attempt/operation reference, expected revision, reason, source evidence, independent authority and key | Attributable request and verified results, outstanding obligations; no implied reversal |
| Policy/composition | Host-supplied public ports, store, access, time and approved settings | Validated settings, supported profiles, availability and dependency diagnostics |
| Events/evidence/privacy | Authorised subscription, evidence/export or rights scope | Committed checkout facts, scoped history, correction/retention status and rights response |
| Optional presentation | Trusted host context, session and enabled features | Customer/operator components consuming the same contract |

Confirmation and submission may be one guarded operation. All commands check caller, scope, revision, authority, policy and idempotency on the server. Owner-directed requests include confirmed proposal, source revision, action, operation key, correlation and independent authority evidence. Owners revalidate and commit their own decisions.

Stable errors distinguish invalid input, denial, stale revision, expired quote, changed terms, missing authority, unavailable dependency, unsupported profile/rail, idempotency conflict, customer action required and unknown outcome. Supply safe code/message key and qualified recovery guidance, not raw provider payloads.

### Committed events and common guarantees

Illustrative events: CheckoutConfirmed, CheckoutSubmitted, CheckoutActionRequired, CheckoutDispositionChanged, CheckoutRecoveryRequired and CheckoutClosed. Include stable event ID, schema/source revision, scope, causation, effective/observed times and safe references. Checkout events are not OrderAccepted or PaymentCaptured.

Commit owned transitions and outbox atomically. Consumers tolerate at-least-once delivery, duplicates and reordering; re-read owners where needed. No distributed exactly-once or cross-owner atomic commit. Purpose-specific context includes tenant/channel/merchant, actor/holder/assurance, source and policy revisions, quote/operation IDs, correlation/idempotency, sensitivity and completeness. No universal DTO. Required missing/stale/denied facts block affected actions; optional ports may be absent only when the selected profile does not require them.

## Cooperating capabilities — inputs and outputs

| Partner | Checkout consumes → supplies |
|---|---|
| [Shop](../../compositions/shop/compositions-record.md) | Trusted channel and customer intent → reusable checkout UI/headless operations and qualified outcomes; Shop owns presentation only |
| [Shopping Basket](../shopping-basket/capability-record.md) | Pinned line intent → checkout/line correlation and verified conversion facts; Basket owns saved intent and conversion status |
| [Product](../product/capability-record.md) | Saleable item, variant, options and revision → qualified item selection and enquiry; no product master |
| [Pricing](../pricing/capability-record.md) | Firm quote, tax/discount breakdown, promotion hold and expiry → scoped quote/hold requests and accepted source references; no recalculation |
| [Inventory](../inventory/capability-record.md), [Booking](../booking/capability-record.md) | Qualified hold/availability/outcome → scoped reserve/confirm/release intent; no capacity ledger |
| [Order](../order/capability-record.md) | Seller commitment and collection authority as applicable → confirmed proposal and qualified seller-scoped submission; no acceptance authority |
| [Payment Gateway](../../services/payment-gateway/services-record.md) | Verified payment/challenge/unknown outcome → authorised execution request, source and operation identity; no payment data or provider adapter |
| [Billing](../billing/capability-record.md) | Approved charge and collection authority where applicable → qualified purchase context and operation references; no automatic charge |
| [Invoice](../invoice/capability-record.md), [Accounting](../accounting/capability-record.md) | Optional document/financial references for permitted status views → qualified commercial references where authorised; no automatic issue, journal or revenue assertion |
| [Marketplace](../marketplace/capability-record.md) | Venue/listing/seller standing → seller-scoped checkout correlation and permitted outcomes |
| Subscription, Membership, Enrolment, Course, Events and other initiating domains | Offer, eligibility, capacity/admission or agreement policy → source-qualified checkout result; domain decides admission, agreement or entitlement |
| [Process](../process/capability-record.md), [Workflow](../workflow/capability-record.md) | Generic checkpoints and approval evidence → checkout-specific action requests and outcomes; no second engine |
| Scheduler, Message Queue, Temporal Gateway | Timed triggers, delivered source events and execution results → scoped scheduled work, committed events and execution/recovery requests; no domain authority |
| Logistics or applicable delivery/service owner | Eligible delivery/collection options, fees, constraints and availability → selected option, scoped delivery context and commitment references; no dispatch authority |
| Identity / Authentication / Authorisation | Trusted actor, tenant, assurance and resource-access decision → scoped permission requests and accountable actor references; no identity/session ownership |
| Profile / Verification | Purpose-limited party/contact information and verified eligibility claims where required → scoped requests and qualified references; no profile or identity master |
| Configuration / Privacy / Legal Compliance / Clock | Effective settings, lawful purpose and retention/rights requirements, applicable legal constraints and trusted time → setting validation, scoped applicability/rights requests and evidence; no legal interpretation or policy override |

Dependency edges are host-bound public ports, explicit and acyclic, not reciprocal package imports. Consumer can depend on Checkout's contract; Checkout depends only on abstract owner interfaces supplied by composition, never on the consumer's package. Required: durable store, clock/access/qualified commercial source and applicable policy; Pricing/Order or equivalent source authority and payment/capacity ports are conditional on journey. Optional Basket/Shop/Marketplace, generic process engine, reporting and GUI have documented absence modes. Native execution supports simple journeys without Temporal. Complex execution may use the existing gateway through a declared public adapter, with one active execution authority per attempt and recoverable handover. No direct external provider integration, new broker, Redis or shared persistence. Provider replacement/migration is through the relevant owner; preserve operation identity, pending status and reconciliation, no silent dual authority.

## Security, policy, privacy and operational behaviour

Apply governing OWASP ASVS 5 L2 and applicable L3 for financial, privileged and sensitive operations; WCAG 2.2 AA. Threat model: cross-tenant or seller leakage, guest session theft, price/merchant tampering, duplicate submission, replay, reservation races, malicious redirects, forged callbacks, confused deputy, approval bypass, insecure recovery and excessive data retention. Server checks every command/query; opaque revocable holder credentials, secure cookie/token handling, CSRF protection where applicable, rate/quantity limits, expected revisions, step-up when risk requires, bounded external callbacks via owning service, secret management and least privilege. Guest does not imply an Identity account. Require proof of both holder and account for claim; no automatic cross-scope merge.

Under ADR-0017/0018 distinguish immutable security/legal floors, checkout-owned orchestration rules, source-owner commercial/collection policies, approved Configuration values, and published terms. Record effective scope/version/approval and expiry; protected policy changes cannot immediately weaken controls for the requester. Legal Compliance supplies applicability, Privacy lawful purpose/retention/rights; Checkout enforces its own obligations. Minimise snapshots and logs, retain confirmation evidence only as justified, support scoped access/export/correction/erasure and legal holds. Expiry does not erase unresolved financial operations. Card data belongs in provider-hosted/tokenised payment boundary; no PAN/CVV or secret credentials in Checkout, events, logs or analytics. PCI DSS scope must be assessed for the actual integration, not claimed eliminated. Applicable consumer disclosures, order correction, cancellation, acknowledgement, payment authentication, tax and privacy rules depend on jurisdiction and merchant model; no universal legal interpretation. UK Consumer Contracts Regulations, Consumer Rights Act, applicable e-commerce rules, UK GDPR and payment rules are implementation legal-review references, not certification.

### Error Normalisation, Logging, Audit and Reporting — public exchanges

**Status:** detailed reciprocal contract alignment owner-approved on 24 November 2026; CHK-07/09 safeguards and each neighbour's authority remain binding. These are logical interfaces, not verified runtime exports.

| Component | Checkout supplies | Component returns / supplies |
|---|---|---|
| [error-normalisation](../../libraries/error-normalisation/stateless-library-record.md) | Source-owned stable error code/namespace, mapping and disclosure policy, operation context, explicitly observed outcome, opaque correlation and source retry information | Pure versioned category/code/message key, safe public and diagnostic projections, advisory retry characteristic; unknown remains unknown. No network, store, event or evidence intake |
| [Logging](../../services/logging/services-record.md) | Allowlisted technical diagnostic event, severity, operation, safe error code, trusted scope, duration, dependency/attempt correlation and recovery diagnostics | Accepted/rejected/throttled/unavailable/uncertain intake, authorised diagnostic reads and sink/health status; acceptance is not persistence, Audit custody or checkout success |
| [Audit](../audit/capability-record.md) | Policy-selected significant action evidence: confirmation/submission, scoped access denial, material policy/authority changes, cancellation/compensation, privileged reconciliation and disposition changes; stable source event/revision, actor/assurance, tenant/seller scope, policy and source references, occurrence time, outcome and sensitivity/retention class | Independent accepted/pending/rejected/uncertain receipt, evidence ID, integrity/coverage and permitted review/export status; independent custody is not proof of payment or Order acceptance |
| [Reporting](../reporting/capability-record.md) | Authorised versioned session, attempt and seller-group facts; preparation/submission/completion times, disposition, partial/unknown outcomes, abandonment, action/recovery age, denominators, corrections, source/as-of/freshness/completeness and scope; optional committed refresh events | Authorised derived measures, funnel, latency, exception and recovery reports, filters, lineage and qualified partial/unknown results where consumed; Reporting owns definitions, calculations and snapshots, not Checkout state |
| Observability | Latency, error/unknown rates, outbox lag and reconciliation age | Health indicators; no raw customer/payment data |
| Notifications | Authorised purpose, recipient reference and template context | Delivery status; no notice proves purchase |

**Failure and authority:** Checkout owns transaction decisions, idempotency, retry eligibility, source reconciliation and disclosure. A normalised error or diagnostic receipt is not evidence of commitment; never retry money movement solely from an error category. Routine Logging/Reporting failure does not undo committed checkout or trigger compensation; use bounded diagnostics and explicit unavailable status without recursive logging. Audit intake/custody is separate from Checkout's outbox, deduplicated by source event identity. Where mandatory evidence capture applies, enforce a policy-defined gate or explicitly approved recoverable pending pattern before the affected act; do not equate outbox delivery or Logging receipt with Audit acceptance. Reporting uses authorised source queries and optional refresh events, not private schemas or unqualified log counts. Never treat missing facts as zero, unknown as failed, or completed checkout as captured payment/revenue. Use explicit session/attempt/seller-group denominators; source-owner financial measures come from Payment Gateway, Order, Billing or Accounting as appropriate. Reporting is optional for checkout execution; a host may consume derived reports without a circular dependency. No raw card data, secrets, full customer details or unbounded provider payloads in any exchange; minimise evidence and apply purpose/scope/retention independently. 

### Operational and policy defaults

Configuration supplies supported profile settings, inactivity/expiry limits, channels and merchant-approved options. Checkout validates its orchestration rules; each source enforces its own policy. Retention follows purpose and applicable authority: short justified unsubmitted retention, necessary submitted evidence, protected unresolved operations and lawful holds. Customer recovery is scoped, time-limited and revocable; no bearer credentials in URL logs or analytics. Notifications distinguish receipt, acceptance and payment status.

## Standards and regulatory guidance

**Status:** existing governing WCAG 2.2 AA and OWASP ASVS 5 Level 2 with applicable Level 3 controls remain mandatory. The following additional standards alignment is owner-approved (24 November 2026); it does not assert certification, legal conformity or implementation. Applicable legal duties depend on jurisdiction, merchant, customer, offering and effective date, determined through Legal Compliance and qualified advisers.

| Reference / issuing body | Applicability and design consequence |
|---|---|
| [ISO 10008:2022](https://www.iso.org/standard/80594.html) | Primary B2C electronic commerce guidance: transparent purchase information, confirmation, transaction reliability, customer support and continuous improvement |
| ISO 9001, [ISO 10002:2018](https://www.iso.org/standard/10002), ISO 31000 | Quality, complaint referral and risk-based design; complaints and binding remedies remain with relevant owners |
| [ISO/IEC 27001:2022](https://www.iso.org/standard/27001), ISO/IEC 27002:2022, [ISO/IEC 27701:2025](https://www.iso.org/standard/27701) | Security and privacy management/control guidance; risk, access, minimisation, retention, incident evidence |
| ISO 22301, [ISO/IEC 25010:2023](https://www.iso.org/standard/78176.html) | Continuity, recovery and product quality; test interrupted and uncertain attempts |
| ISO 4217, ISO 8601, IETF RFC 3339, BCP 47 | Exact source-qualified currency/scale, trusted time and language representations; Pricing and Clock remain authoritative |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), WAI-ARIA and internationalisation | Mandatory AA; review/correct financial submissions (3.3.4), avoid redundant entry (3.3.7), accessible authentication (3.3.8), accessible status messages (4.1.3), timing adjustment (2.2.1, applicable exceptions); semantic HTML first, responsive and localised input |
| [W3C Web Payments](https://www.w3.org/groups/wg/payments/publications/) | Payment Request API and Payment Method Identifiers optional; Secure Payment Confirmation subject to specification maturity, browser/provider support and fallbacks; no mandatory browser API |
| [OWASP ASVS 5](https://asvs.owasp.org/), NIST [SP 800-63-4](https://pages.nist.gov/800-63-4/sp800-63.html), SP 800-53 Rev.5, FIDO2/WebAuthn | Governing ASVS baseline; risk-based identity assurance, replay protection, resource access, audit and step-up through IAM. Payment authentication remains with payment owner |
| PCI SSC PCI DSS 4.0.1 and [payment-page security guidance](https://blog.pcisecuritystandards.org/new-information-supplement-payment-page-security-and-preventing-e-skimming) | Conditional card environment; assess actual scope, script authorisation/integrity and tamper monitoring where applicable (6.4.3/11.6.1); hosted or embedded payment forms do not automatically eliminate obligations. [SAQ A eligibility guidance](https://www.pcisecuritystandards.org/faqs/1588/) |
| [EMVCo EMV 3-D Secure](https://www.emvco.com/emv-technologies/3-d-secure/), EMV Payment Tokenisation/Secure Remote Commerce, ISO 20022 | Conditional provider/rail standards through Payment Gateway; support challenge, safe hand-off and qualified results, not direct implementation in Checkout |
| [OECD consumer protection in e-commerce (2016)](https://legalinstruments.oecd.org/en/instruments/336), [UNCITRAL electronic commerce model texts](https://uncitral.un.org/en/texts/ecommerce) | Fair disclosures, explicit confirmation, payment protection and redress; technology-neutral evidence. Model laws and guidance are not universally binding |
| IETF RFC 9110, [RFC 9457](https://datatracker.ietf.org/doc/html/rfc9457), RFC 9562; OpenAPI/JSON Schema where appropriate | HTTP semantics, safe structured errors and identifiers; business idempotency still requires durable operation identity, not HTTP method alone |
| OASIS UBL, Peppol, GS1 | Conditional trading-partner interoperability through Order, Invoice, Product and Logistics; no checkout-owned EDI or invoice authority |
| BSI BS 8878 (withdrawn; use ISO/IEC 30071-1), BS EN 301 549 / ETSI EN 301 549 | Accessibility process and applicable ICT procurement requirements; confirm relevant edition and jurisdiction; not a substitute for WCAG or legal accessibility assessment |

### National and regional legal design constraints

- UK: [Consumer Contracts Regulations 2013, regulation 14](https://www.legislation.gov.uk/uksi/2013/3134/regulation/14), Consumer Rights Act 2015, Electronic Commerce Regulations 2002 and applicable DMCC Act 2024 requirements. Present trader identity, material terms, total payable amount and relevant fees, correction and explicit payment obligation immediately before commitment; retain confirmation evidence and support owner-led cancellation/redress and durable acknowledgement where applicable. [CMA209 price transparency guidance](https://www.gov.uk/government/publications/price-transparency-cma209) and [CMA mandatory delivery fee guidance](https://www.gov.uk/government/publications/online-retailers-including-mandatory-delivery-fees-in-the-total-price) reinforce source-qualified total prices at all applicable purchase stages; no drip pricing or preselected paid extras. Pricing supplies amounts; Checkout presents them and blocks missing required evidence.
- UK: UK GDPR/Data Protection Act 2018 as amended, PECR where applicable, [ICO privacy by design guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/guide-to-accountability-and-governance/data-protection-by-design-and-by-default/), Equality Act 2010, applicable Payment Services Regulations 2017 and [FCA SCA requirements](https://www.fca.org.uk/firms/strong-customer-authentication). No forced marketing consent, unnecessary personal collection or self-authorised payment exemptions. Payment Gateway/provider determines payment challenge and exemption eligibility under applicable rules.
- EU/EEA: GDPR, Consumer Rights Directive 2011/83/EU as amended and national transpositions, [European Accessibility Act (Directive 2019/882)](https://eur-lex.europa.eu/eli/dir/2019/882/oj), applicable payment services/SCA rules and marketplace obligations. Qualify country-specific scope and exceptions, including accessibility obligations for covered e-commerce services. Other markets require local consumer, privacy, tax and payment applicability; do not export UK assumptions.
- Subscription-specific renewal/cancellation duties, digital-content consent and cancellation exceptions, age or product restrictions, regulated finance and marketplace trader disclosures require relevant owner/legal qualification. No generic checkout policy may waive a statutory requirement.

**Acceptance implications:** prove full price and seller disclosure, correction before confirmation, explicit payment obligation, no preselected extras, accessible timeout/challenge/status handling, optional browser payment fallback, no raw card data, safe hosted return, source-authorised cancellation and evidence of actual confirmation. Retain policy/version/source attribution, qualified legal applicability and minimal evidence. Map mandatory controls to tests and owner responsibility; implementation must verify current editions, applicable laws, actual provider PCI scope and evidence, not claim certification. No new external service or protocol dependency is mandated.

## Implementation alignment and library evaluation

Conceptual preference: framework-independent TypeScript headless service with optional Nuxt adapter if independent consumer evidence warrants; one documented composition entry and independent minimal consumer. Nuxt adapter must meet one install/one server composition call/50-line host budget. Own persistence adapters and test fakes; publish concise root CONTRACT.md, storage register and threat model at implementation. No runtime package chosen.

### Permissive open-source library shortlist

**Owner-approved library selection approach (24 November 2026).** The selected upstream library must publish the complete current usable source under a commercially permissive licence (MIT, BSD or Apache-2.0), without a feature-restricted or deliberately delayed community edition, mandatory hosted service, usage cap or paid runtime extension. This is a package-level assessment, not a guarantee of every product offered by its maintainers. Verify the selected stable tag, licence and transitive notices, source/package correspondence, maintenance, vulnerabilities and compatibility before adoption; no dependencies installed.

| Library and source / release evidence | Licence | Recommended role |
|---|---|---|
| [Zod](https://github.com/colinhacks/zod) ([licence](https://github.com/colinhacks/zod/blob/main/LICENSE), [releases](https://github.com/colinhacks/zod/releases)) | MIT | Preferred runtime validation of commands, profiles, owner responses and configuration; stable v4 |
| [node-postgres (pg)](https://github.com/brianc/node-postgres) ([licence](https://github.com/brianc/node-postgres/blob/master/LICENSE), [package versions](https://www.npmjs.com/package/pg?activeTab=versions)) | MIT | Existing host-supplied PostgreSQL pool, transactions, private schema and outbox; stable v8 |
| [Kysely](https://github.com/kysely-org/kysely) ([licence](https://github.com/kysely-org/kysely/blob/master/LICENSE), [releases](https://github.com/kysely-org/kysely/releases)) | MIT | Optional typed SQL over existing pg; maintained 0.x release line, not a 1.x compatibility promise; omit if native pg is sufficient |
| [decimal.js](https://github.com/MikeMcl/decimal.js) ([releases](https://github.com/MikeMcl/decimal.js/releases)) | MIT | Conditional exact representation checks/conversion only; prefer existing owner-supplied integer/decimal amounts and native BigInt where adequate. No price/tax rule engine |
| [XState](https://github.com/statelyai/xstate) ([licence](https://github.com/statelyai/xstate/blob/main/LICENSE), [releases](https://github.com/statelyai/xstate/releases)) | MIT | Conditional complex local transition modelling, stable supported v5; v6 beta excluded. Public runtime is distinct from commercial Stately visual tooling; no paid tooling required. If simple explicit transition guards suffice, omit entirely. Never rely on in-memory actors for durable recovery or duplicate Process/Temporal |
| [Ajv](https://github.com/ajv-validator/ajv) ([licence](https://github.com/ajv-validator/ajv/blob/master/LICENSE), [releases](https://github.com/ajv-validator/ajv/releases)) | MIT | Alternative when externally supplied JSON Schema validation is required; not a second default validator alongside Zod |
| [VeeValidate](https://github.com/logaretm/vee-validate) ([releases](https://github.com/logaretm/vee-validate/releases)) | MIT | Optional Vue form interaction and error presentation, only if shared UI/native Vue cannot meet needs; authoritative validation remains server-side |
| [Vitest](https://github.com/vitest-dev/vitest) ([licence](https://github.com/vitest-dev/vitest/blob/main/LICENSE), [releases](https://github.com/vitest-dev/vitest/releases)) | MIT | Existing test framework, development only |
| [fast-check](https://github.com/dubzzz/fast-check) ([licence](https://github.com/dubzzz/fast-check/blob/main/packages/packaged/LICENSE), [releases](https://github.com/dubzzz/fast-check/releases)) | MIT | Property-based tests for lifecycle invariants, duplicate/reordered events and seller coverage, development only |
| [Playwright](https://github.com/microsoft/playwright) ([licence](https://github.com/microsoft/playwright/blob/main/LICENSE), [releases](https://github.com/microsoft/playwright/releases)) | Apache-2.0 | Existing independent host acceptance and browser interaction tests, development only; accessibility still needs manual evaluation |

Prefer native Node crypto.randomUUID and cryptographically secure tokens, AbortSignal and exact BigInt where sufficient; use the platform Clock, error-normalisation, UI and Theme Manager contracts, and existing Temporal Gateway for optional durable execution. No additional UUID, retry, date, payment SDK, ORM, broker, cache or commerce engine by default. Retry semantics are Checkout-owned and source-authorised, not generic blanket retries. Payment provider SDKs belong exclusively to Payment Gateway or its adapters. Avoid full ecommerce stacks, open-core/source-available editions, proprietary workflow engines and duplicate commerce ownership. Reuse existing platform dependency baseline rather than pinning arbitrary current versions during conceptual review. CI/user performs acceptance; no local tests run.

## Presentation and host integration

Mandatory headless public contract; optional reusable customer checkout presentation and separate authorised operator dashboard. Host owns branding, routes, navigation, authentication/context and feature selection; no Shop shell required. Verified application-test-template master README, app/app.vue and app/pages/admin.vue show public homepage, /admin test dashboard, responsive Capabilities sidebar with Theme Manager link, shared appearance/top bar and mobile overlay. Derived checkout test host may add Checkout → /checkout/admin and admin tile, plus a direct purchase demo and optional basket demo; shared template unchanged. Local test mode is not production security.

### Host application placement and entry points (owner-approved)

Checkout is a shared transactional journey, not a storefront, a permanent customer menu section or a second orders/payments dashboard. The host composes it once and makes it available from whichever enabled capability initiates a qualified purchase. The initiating screen supplies an authorised proposal/reference and permitted return context; Checkout prepares and confirms it using source-owner facts. All routes below are illustrative host decisions, not fixed public endpoints.

| Host application area | Entry action | Checkout use and return destination |
|---|---|---|
| Shop product detail or listing | Buy now | Direct purchase without a basket; return to order detail or storefront |
| Shopping Basket | Proceed to checkout | Prepare selected basket revision; return to remaining basket or qualified order outcomes |
| Marketplace listing/basket | Purchase / checkout | Seller-separated review and transactions; return to marketplace purchase history or seller-specific order detail |
| Booking / appointments / facilities | Confirm reservation and pay | Selected resource/time and qualified capacity/fee; return to booking detail |
| Events | Buy tickets / register for paid event | Qualified tickets, capacity and applicable fees; return to event registration or ticket owner |
| Course / Enrolment | Enrol / pay course fee | Qualified course offer and admission context; return to enrolment status, not automatic course access |
| Membership | Join / renew / upgrade | Scheme offer, eligibility and fee; return to membership application or status |
| Subscription / service plans | Subscribe / purchase upgrade | Initial or explicitly authorised one-off purchase; return to agreement/service status; ongoing billing remains outside Checkout |
| Hosted service onboarding | Select and purchase a plan | Commercial confirmation and payment as required; return to onboarding/provisioning status; no automatic tenant enablement |
| Procurement / purchasing | Submit purchase / confirm approved purchase | Authorised organisational buyer, approvals and payment/credit terms; return to purchase order or requisition status |
| Customer account or secure guest recovery | Resume checkout / action required | Recover a permitted unfinished session or submitted attempt; link to owner records after completion |
| Administration / Capabilities sidebar | Checkout | Operator dashboard for authorised attempts, exceptions and reconciliation; not a replacement for Order, Billing or Payment Gateway administration |
| External application or automated process | Public service command | Headless initiation, confirmation evidence, submission and status/event consumption; no GUI required |

**Navigation pattern:** originating capability → Checkout review/details → payment hand-off if applicable → qualified result or pending/recovery screen → originating capability or authoritative order/booking/agreement page. Cancel/back before submission returns to the origin without inventing a commitment; after submission, cancellation is a request and pending operations remain recoverable. Provider returns lead to a Checkout status/reconciliation view, never directly to a success assertion. Return targets are host-validated internal destinations or explicitly allowed integrations; no arbitrary redirect URLs or trusted commercial facts in query parameters. The host preserves correlation and safe navigation context, while Checkout persists its own session/attempt state. A secure recovery link or account action is scoped and revocable; guest recovery does not require installing Shop.

**Presentation placement:** customer checkout is a contextual page or embedded multi-step journey in the host's customer-facing shell; optional admin navigation is separate, capability-enabled and permission-controlled. Customer accounts may show resumable checkouts or links from order/booking history, but completed commercial records remain in their owner screens. Do not force an admin sidebar, global Checkout menu, standalone shop or basket into every host. A derived test host should demonstrate direct initiation, basket initiation, interrupted payment recovery, seller-specific partial outcomes, admin reconciliation and headless operation with the customer/admin GUI independently disabled. The host owns route mounting, branding, navigation and trusted context; Checkout owns reusable components and their public service interactions. All entry points apply the same server-side scope, confirmation and idempotency rules.

### Screen inventory and interaction design

**Owner-approved presentation design (24 November 2026).** Prefer a short, adaptive checkout, not a compulsory fixed wizard. Customer and operator presentation can be enabled independently. All routes are illustrative and host-remappable.

| Audience / screen | Content and actions | Initial scope |
|---|---|---|
| Customer — review and details (`/checkout/:session`) | Seller-grouped items, quantities and qualified totals by currency; buyer/contact and delivery or service choices only as required; source expiry, restrictions and errors; amend permitted selections or return to origin. | Essential customer component |
| Customer — payment selection (`/checkout/:session/payment`) | Eligible card/other payment hand-off, approved credit or free route; disclose applicable charges; never collect raw card data in Checkout. Skip if not required. | Essential when applicable |
| Customer — final review and confirmation | Seller identity, material terms, complete amount and explicit payment obligation; accessible correction and confirmation; changed terms require fresh confirmation. May share page with review/payment selection. | Essential |
| Customer — processing / action required / return | Pending status, safe provider challenge hand-off, retry only when owner-qualified, resume or leave safely. Browser return triggers authoritative read-back, not success. | Essential |
| Customer — result / recovery (`/checkout/:session/result`) | Per-seller accepted, rejected, pending and unknown outcomes; source-qualified payment status; link to relevant Order/Booking/agreement and secure recovery. Cancellation is a request after submission. | Essential |
| Operator — dashboard (`/checkout/admin`) | Scope selector where authorised; active, awaiting customer/approval, recovery required, completed and expired attempt counts with as-of time and denominators; exception queue preview; navigation to attempts. Native scoped counts, optional Reporting enrichment; no inferred revenue. | Essential operator component |
| Operator — attempt list / exception queue (`/checkout/admin/attempts`) | Filter by permitted tenant/seller, status, period, channel, source reference, age; paginated results, unknown/stale indicators, prioritised unresolved operations. No cross-tenant global access by default. | Essential |
| Operator — attempt detail (`/checkout/admin/attempts/:id`) | Confirmation revision, grouped outcomes, attributed owner references, operation timeline, source freshness and recovery evidence; authorised reconcile/cancel/compensation request with reason, expected revision and assurance. No mark paid/accepted override, raw provider payload or direct record editing. | Essential |
| Operator — settings/profile summary | View supported profiles, effective source/merchant policy and dependency availability; link to Configuration or relevant policy owner for authorised changes. No generic workflow designer or duplicated merchant/payment settings. | Read-only summary initially; separate editor not required |

**Customer layout:** shared host branding and responsive content; desktop may show purchase details beside a persistent order summary, mobile uses a single column with visible total and accessible expandable summary. Present the applicable seller and currency groups separately. Progress labels reflect actual required stages, not arbitrary fixed steps. The final action states the applicable payment obligation; prevent duplicate interaction without relying on the UI for idempotency. A free/credit journey omits unnecessary payment forms. Preserve entered data when permitted, announce errors/status, move focus to meaningful headings or error summary, allow review/correction, and show expiry with a safe refresh/reconfirmation path. Provider hand-off must have accessible fallback and secure return.

**Operator layout:** derived host sidebar **Capabilities → Checkout**, using the same host-owned navigation pattern as Theme Manager at `/theme-manager`. The selected link opens the dashboard in the existing `NuxtPage` region; optional admin test card links to the same destination. Dashboard presents a small set of scoped operational counts and an exception queue, not a second storefront, Order or Payment Gateway console. Attempt details use an attributable chronological timeline and seller/operation status table; action controls reflect server-granted permissions and require explicit confirmation for significant requests. Separate permissions for view, sensitive evidence, reconcile, cancel, compensation and configuration; no hidden reliance on menu visibility. Reporting absence leaves native operational queries available, with unavailable/stale enrichment labelled. Customer account/guest recovery is contextual, not an administrative route.

**Shared implementation boundaries:** use UI components and Theme Manager semantic vocabulary (no private imports or hard-coded independent theme), localisation message keys and Clock/source money presentation. Meet WCAG 2.2 AA including keyboard focus, error prevention, accessible status/challenge, non-colour state indicators, responsive reflow and reduced motion; show loading, empty, denied, expired, partial and unavailable states. Host selects and mounts optional presentation, branding, navigation and trusted caller; no universal menu registration or second host shell. Public presentation consumes the same scoped session/prepare/confirm/submit/read/cancel/reconcile contracts, including authoritative version and outcome checks. Derived `checkout-test` may be created later from the existing template, not as part of this conceptual PR. The template's local unauthenticated Theme Manager test mode is never a production security model.

## Contract acceptance scenarios (future CI/user evidence)

| Scenario | Required proof |
|---|---|
| Direct course/booking purchase without Shop/Basket | Headless consumer composes with applicable source only; verified result; no hidden dependency |
| Basket purchase and concurrent edit | Pinned attempt, stale confirmation rejected, line conversion attributed without overwriting other intent |
| Free/credit versus card | No gratuitous payment; verified independent collection authority and explicit completion criteria |
| Price/terms/hold expire or seller withdrawn | Revalidate and reconfirm; fail closed before unsafe action |
| Double submit, replay and concurrent workers | Stable operation identity, same payload returns prior result, changed payload conflicts; no duplicate charge/order |
| Provider timeout, callback reorder or browser closure | Recover original operation, verified owner read-back; unknown never displayed as success |
| Authorisation succeeds but seller rejects; capture fails after acceptance | Explicit owner-approved compensation/recovery and retained residual obligation |
| Multi-seller partial result | Separate seller scope, payment eligibility and line coverage; no unsupported split or false aggregate completion |
| Tenant/guest takeover, forged client price or redirect | Denied and safe audit/diagnostics; no disclosure or financial action |
| Process/Workflow absent or delayed | Documented native safe mode; approval-required operation holds; no duplicate process history |
| Privacy, reporting, outbox and audit failure | Minimal evidence, scoped rights, replay tolerance, accurate completeness; critical gate only where approved |
| GUI disabled/enabled | Headless independent consumer, independently selectable customer/admin presentation, accessible direct and basket journeys, server access, Nuxt composition budget |
| Operator dashboard, queue and detail | Scoped native counts and paginated attempts, permitted links, stale/unknown states, independently authorised recovery; no false paid override; Reporting absent still usable |
| Responsive customer review and challenge | Mobile/desktop, keyboard and screen reader, exact currency/seller totals, correction, explicit confirmation, free/credit skip, changed terms and accessible pending/recovery; no duplicate submit |
| Host entry and return navigation | Direct purchase from non-Shop domain, optional basket, safe guest/account recovery, verified payment return and source-owner destination; no open redirect or duplicate submission |

## Approved decisions and remaining work

Owner-approved 24 November 2026: CHK-01–09, including the refined first-release scope, execution profiles and recommendations. The following are conceptual decisions, not published implementation contracts.

| ID | Recommendation / decision |
|---|---|
| CHK-01 | Independent Domain checkout-specific session, confirmation and recovery authority; packaging conditional; Process-only is not the default |
| CHK-02 | Direct proposal and optional Basket; immutable confirmation and source-qualified seller/line outcomes |
| CHK-03 | Explicit per-journey completion criteria and seller/collection authority; no mandatory payment/Order when a different qualified commercial source applies |
| CHK-04 | Native durable lifecycle, idempotency and owner read-back; explicit compensation and uncertainty |
| CHK-05 | Separate Checkout business disposition from Process generic progression, Workflow approvals, Scheduler timing and execution infrastructure |
| CHK-06 | Seller-specific multi-seller outcomes; defer unsupported split/payout/escrow |
| CHK-07 | Scoped security/privacy/legal policy and source-owned payment boundary; no weakened floors |
| CHK-08 | Mandatory headless contract, optional customer and operator GUI, host navigation and independent acceptance |
| CHK-09 | Reciprocal contract alignment, operational interfaces and minimal existing library shortlist; no new infrastructure or unverified implementation |

Open implementation investigations: exact source authority for order-less collection; supported merchant/payment models and jurisdiction applicability; published owner ports and state reconciliation, durable execution adapter and recovery fencing; exact retention/expiry limits and checkout completion profiles; payment provider hand-off and PCI scope; tagged library/security review and contract/CI evidence. These are not permission to invent a source authority or treat missing facts as optional. Reconcile approved adjacent records and any newer master before merge; no implementation or governing changes. Conceptual review complete. Remaining work is implementation design and independent acceptance, not unresolved conceptual choices. Governing catalogue adoption and merge require separate approval; no merge authorisation.

## FAC-D01–04 — Approved reciprocal responsibility alignment

Party supplies purpose-qualified buyer, seller and payer references through the owning domain's public port. Checkout owns attempt orchestration, not party identity, payment execution or order commitment. See [Party](../party/capability-record.md), [Payroll](../payroll/capability-record.md) and [Workforce Scheduling](../workforce-scheduling/capability-record.md) as applicable. Exchanges are purpose-scoped public ports, not mandatory imports.
