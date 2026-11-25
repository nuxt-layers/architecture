# Pricing — Capability Record

**Identity:** `pricing` · **Classification:** Domain capability **candidate** in the governing catalogue; owner-approved conceptual Domain design (22 November 2026). **Status:** conceptual specification complete, subject to cross-review reconciliation and separate PR/merge approval. No implementation repository or published root `CONTRACT.md` verified; no code, tests, deployment, certification or legal compliance claimed.

**Authority and evidence:** [Architecture Rules](https://github.com/nuxt-layers/architecture-rules), [Capability Standard](../../capability-standard.md), [governing catalogue](../../catalogue.md), review protocol (former document: review protocol). Governing `master` checked at `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint `master` at `361566988ac53c55f6135e8acfa46cd5b013d7a0`. This record is the current conceptual source; Git history retains earlier discussion and superseded drafts. Accepted ADRs and normative governance prevail.

## Purpose and ownership

Pricing is the authoritative **commercial price decision** for a specified product/service, quantity, eligible audience or agreement, currency, territory/channel and effective time. It supports native, deterministic pricing without an external provider.

**Pricing owns:** merchant-scoped price books, tariffs and rates (including volume/usage tiers); their immutable approved revisions and effective periods; commercial adjustment and discount priority/stacking rules; Pricing-issued conditional firm and indicative quotes, calculation evidence and expiry; Pricing-owned promotion/coupon budgets and their reservation/redemption lifecycle; source reconciliation, price-history and committed change events.

**Pricing does not own:** Product identity, attributes or availability; Membership eligibility or scheme quotas; Subscription entitlements; Order acceptance and commercial commitment; Marketplace listings, seller commission or publication; Billing assessed period charges and proration; tax-law interpretation; externally published FX rates; Payment Gateway authorisation/capture/refund; Invoice documents; Accounting ledger entries; identity, access decisions, legal policy, Audit evidence custody or Reporting artefacts. A quote is not an order, payment, tax return or invoice. No other capability may independently recalculate an authoritative Pricing quote from private rule tables.

## Native lifecycle and commercial decisions

1. **Define and publish:** An authorised editor drafts price books/rules with owner, audience, product references, units, currency, effective dates and explicit priority. Overlapping ambiguous rules are rejected or held. Validated approval, with separation of duties and step-up assurance where required, publishes an immutable revision. Withdrawal prevents future use, not historic reconstruction.
2. **Calculate:** Given validated source facts, Pricing chooses the applicable version and calculates **base tariff → contractual adjustments → eligible priority-ordered promotions (with explicit exclusions/stacking) → qualified tax calculation → documented decimal rounding boundaries**. Rate, quantity unit, precision, version and component breakdown remain reproducible. Tax classification comes from qualified legal/tax input; conversion requires a versioned trusted FX source. Unknown mandatory evidence forbids a definitive tax-inclusive or converted total.
3. **Quote:** An **indicative** quote explains a provisional price without guarantee. A **firm** quote protects stated price and conditions until explicit expiry, only with verified eligibility, necessary source evidence and promotion reservations. It is not by itself proof of legal enforceability; Order owns offer acceptance/commitment. Quote states include indicative, held-for-evidence, firm-until-expiry, expired, withdrawn and superseded. Price-at-calculation, price-at-commitment and price-currently-displayed are distinct. A **simulation** evaluates pricing without consuming coupons or silently issuing a firm offer.
4. **Limited promotions:** Pricing-owned limited offers progress **available → reserved → redeemed or released**. Reserve atomically within per-subject/aggregate caps using an idempotency key and expiry; redeem only after qualified, authoritative commercial completion evidence, otherwise retain uncertainty and reconcile. Expired/cancelled reservations release safely. Membership-owned limits remain with Membership. A payment retry or ambiguous provider acknowledgement never redeems twice.
5. **Correct and recover:** Never overwrite a published revision. Corrections create attributable revisions with reason, effective date and risk-based independent approval; retrospective changes require affected-consumer reconciliation and must not silently alter committed Orders, Billing charges or Accounting entries. Stale, unauthorised, conflicting or unavailable data produces a stable rejected/held/stale/unknown result, not an invented zero price or silent fallback.

**Operating modes:** Native pricing is primary by default. A configured external tariff source may become authoritative for an explicitly selected scope through Integrations, but must be validated, versioned, imported/exported with provenance and reconciled on drift, outage, correction or withdrawal. Never change source of truth automatically during failure. Currency conversion and legally qualified tax inputs are conditional external facts, not mandatory third-party pricing engines. Host-provided persistence, Clock, policy, secrets and durable outbox adapters do not transfer Pricing authority.

## Conceptual public contract

The following are **approved logical surfaces**, not claimed TypeScript exports, HTTP endpoints or a shipped root contract. All protected operations require a trusted caller, tenant/merchant/resource scope, effective time, version and server-side authorisation. Include source/provenance, policy revision and correlation/idempotency when relevant. Do not require a single universal DTO.

### Inputs — commands and evidence received

| Public input | Supplier; required information | Validation / missing input |
|---|---|---|
| **Manage price books** | Authorised editor/approver and Configuration: scoped lists, rates, tier/discount rules, priorities, rounding, effective dates and approval evidence | Deny unauthorised changes, self-approval where prohibited, ambiguous rules or stale expected revisions. |
| **Calculate or issue quote** | Order, Product/Shop, Marketplace, Booking or permitted caller: product/service references and source-owned units, quantity, market/channel, audience, currency, effective time, contract/eligibility context | Missing product facts or mandatory qualifying evidence holds or rejects; optional benefits simply do not apply without eligibility proof. |
| **Manage promotions** | Authorised merchant, Order or onboarding: offer scope, limits, subject evidence, reservation/idempotency/expiry, confirmed redemption or cancellation evidence | Enforce caps atomically; unknown completion is held/reconciled, never guessed. |
| **Commercial partner evidence** | Product facts/revision; Order commitment/cancellation; Membership benefit and term; Subscription plan/term; Marketplace seller/venue; Billing period/agreement feedback | Each partner retains authority for its facts; conditional facts must be current and attributable. |
| **Qualified policy/time and providers** | Identity/Authentication/Authorisation, Legal Compliance/Privacy, Clock, Workflow, Configuration, Integrations: trusted permission/assurance, tax duty, FX rate, approval and provider tariff | Protected actions fail closed on missing permission; definitive regulated/conversion claims need valid evidence. External rates require chosen source, timestamp and revision. |
| **Reconciliation requests** | Authorised operator/Integrations: source receipts, conflicts, revocations, previous attempts, corrective intention | Recheck source truth, idempotency, permissions and affected committed consumers. |

### Outputs — authoritative information supplied

| Public output | Consumers and meaning | What it does **not** prove |
|---|---|---|
| **Effective tariff/offer query** | Product/Shop, Marketplace, Order, Subscription, Billing: scope, price book/revision, currency, unit, effective interval, eligibility restrictions, source/freshness | Product availability, Membership entitlement, final tax or accepted sale. |
| **Calculate/issue/get quote** | Order, Booking, Shop/Marketplace and authorised customer: itemised base, adjustment/discount, eligible and rejected reasons, tax/FX certainty, rounding, effective time, expiry, revision trace, indicative/firm status | Order acceptance, captured payment or Billing assessment. |
| **Promotion eligibility and lifecycle** | Order/onboarding: available, reserved, redeemed or released result; capacity/expiry, authoritative idempotency outcome and reason/status | Membership quota movement or payment success. |
| **History and price comparison** | Authorised merchant, Billing, Audit, Reporting: original and corrected revisions, historical quote calculation, reasons, effective/observation times and **separate advertised-prior-price evidence** | Another capability's financial correction or legal determination. |
| **Committed domain events** | Message Queue and permitted consumers: published/withdrawn tariff, revised rule, activated/ended promotion, issued/expired quote, reserved/redeemed/released coupon, with source event/revision IDs | Exactly-once cross-system delivery, consumer authorisation or completion of an unrelated transaction. |
| **Reconciliation, diagnostic and reporting projections** | Operator, Integrations, Logging, Observability, Audit and Reporting as separately authorised: discrepancy/source health, qualified pricing facts, safe error references, freshness/completeness | A log, audit receipt, provider acknowledgement or derived report as business truth. |

**Interaction rules:** Commands validate actor, approval, expected revision, policy, state transitions and idempotency; return accepted/committed/held/rejected/uncertain distinctly. Queries are tenant-, purpose- and audience-scoped with completeness, cutoff, effective revision and freshness. Events leave Pricing's **capability-owned transactional outbox only after local commitment**; transport is at-least-once, so consumers deduplicate, tolerate reordering and requery Pricing before making their own decisions. Never grant permission based on an event. Backdating, withdrawal, correction and replay cannot rewrite previously accepted commitments.

## Cooperating capability contracts

These are **logical public ports and events**, not private imports or universal runtime requirements.

| Capability / link | Pricing needs from it | Pricing supplies; ownership boundary |
|---|---|---|
| [Product](../product/capability-record.md) | Identity, sellable facts, units, variants, bundles and revision | Effective prices and qualifying unit-price facts; Product owns goods and eligibility for sale. |
| [Order](../order/capability-record.md) | Cart, commitment/cancellation, attribution and coupon-use evidence | Indicative/firm quote, expiry and promotion reservation; Order retains each accepted seller-scoped line/snapshot; multi-seller checkout has separate seller orders under shared correlation. |
| [Billing](../billing/capability-record.md) | Billing period, contract reference and tariff-use reconciliation | Effective rate and original revision; Billing owns period-rated charge and proration (**BIL-01**). |
| [Membership](../membership/capability-record.md) | Member benefit, valid period and scheme quota evidence | Eligibility-adjusted quote, not membership benefit entitlement or quota (**MEM-01–10**). |
| [Subscription](../subscription/capability-record.md) | Plan, tier, entitlement and dates | Rates and quotations, never entitlement activation. |
| [Marketplace](../marketplace/capability-record.md) | Seller/channel, listing restrictions and agreement | Displayable price/conditions; Marketplace owns listing and commission. |
| [Payment Gateway](../../services/payment-gateway/services-record.md) | Verified outcome only where coupon settlement depends on it | Immutable quote/promotion reference, never instruction to infer completed payment. |
| [Accounting](../accounting/capability-record.md), [Invoice](../invoice/capability-record.md) | Qualified agreement/tax context if relevant | Original rate/discount evidence, not accounting postings or fiscal documents. |
| [Configuration](../configuration/capability-record.md), IAM, [Clock](../../services/clock/services-record.md), [Workflow](../workflow/capability-record.md) | Scoped approved configuration, trusted identities/permissions/assurance, time, applicable approval decisions | Pricing validation/approval outcomes; no transfer of those authorities. |
| [Legal Compliance](../../capabilities/legal-compliance/capability-record.md), [Privacy](../privacy/capability-record.md), Integrations | Qualified tax/disclosure/retention policy and optional external tariffs/FX/source evidence | Price components, advertised-price history, reconciled source status; legally required display belongs to the channel/host. |
| Message Queue, Observability, Search | Event transport, telemetry and discoverability where configured | Committed price-change facts, safe metrics and permitted price projections; no price authority transfer. |

**Dependency strength:** Native calculation requires an authorised Pricing price book, valid scoped request, trusted Clock semantics and applicable security checks; Product is needed for a product-linked quote. Order, Membership, Subscription, Marketplace, Booking, Payment Gateway, Workflow, tax/FX and external tariff sources are **conditional** on the use case. Billing, Invoice and Accounting primarily consume Pricing's evidence and are not prerequisites for normal calculation. Optional provider failure degrades only affected functions; mandatory qualification cannot be bypassed. Source-owned records are accessed only through public contracts; composition must remain acyclic. Order PR #113 is merged into master and its seller-scoped commitment boundary has been reconciled here; Payment Gateway PR #116 has merged into master; its payment-operation and uncertain-outcome boundaries are reconciled here.

### Errors, diagnostics, accountable evidence and analytics

| Partner | Pricing sends → | Pricing receives ← | Boundary |
|---|---|---|---|
| [`error-normalisation`](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) (pure library) | Domain code catalogue/mapping, raw error, **known** outcome, trusted correlation and approved disclosure rules | Stable, versioned safe code/category/message key, public/technical projections and **advisory** retry classification or bounded unknown | Normaliser does not store events, log, audit, retry or assert commercial completion. |
| [Logging](../../services/logging/services-record.md) | Sanitised technical code, severity, attempt, correlation, performance/context | Diagnostic intake receipt, delivery/health and permitted troubleshooting views | Log receipt ≠ successful pricing action or accepted Audit evidence. Logging outage ordinarily does not block native pricing. |
| [Audit](../audit/capability-record.md) | Accountable approvals, publication, backdating, sensitive override/denial, coupon outcomes and source checkpoints with actor/assurance, event/revision IDs | Accepted/pending/rejected/uncertain evidence receipt, identifier, integrity, coverage and gap status | Audit owns evidence custody, not commercial price. Required evidence capture uses configured risk-based hold/fail-closed rules. |
| [Reporting](../reporting/capability-record.md) | Authorised revisioned tariffs/quotes/promotions, usage, corrections, effective/observation times and completeness | Derived report definitions, status, trends, cutoff, freshness, export/refresh evidence | A quote is not revenue: actual sales, payments, charges or ledger measures must come from their own source owners. Reporting outage does not block native Pricing. |

Errors distinguish denied, invalid, conflicted, expired, budget-exhausted, provider-unknown, failed and uncertain. A timeout or normaliser retry suggestion does not prove commitment or permit automatic retry. Apply independently authorised, minimal disclosure for diagnostics, Audit and Reporting; no raw credentials, private formulae or customer-specific rates by default. Recipients' acknowledgements have separate meanings.

## Security, compliance, internationalisation and standards

- **Financial correctness:** exact decimal amounts, explicit ISO 4217 currency/unit/precision and recorded rounding boundaries; never binary floating-point money. Reconstruct historical prices from effective records, not today's price. Reject conflicting rules and prevent coupon races, enumeration, unauthorised stacking, stale writes and replay; preserve distinct event, operation and revision IDs.
- **Security and privacy:** enforce tenant/merchant/subject/resource boundaries and server-side authorisation for every query, export and mutation; separated approvals, high-risk assurance, minimisation, retention/erasure subject to lawful holds and protected price disclosure. Meet governing **OWASP ASVS 5 L2**, applicable L3 for critical operations, and **WCAG 2.2 AA** for presentation.
- **Legal scope:** Legal Compliance interprets applicable consumer-pricing, VAT/tax, promotional prior-price, fee-transparency, privacy and unit-price duties for jurisdiction, product, audience, channel and effective date. Pricing preserves the inputs/history for compliance and supplies itemised mandatory fees, tax certainty, discounts and unit-price facts to the authorised storefront; it does not independently interpret legislation or guarantee compliance. Never silently treat EU law as UK law.
- **International formats:** Agreed external trade unit codes may use [UN/CEFACT Recommendation 20](https://unece.org/trade/uncefact/cl-recommendations) where relevant; Product/Order retain their source units.  [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) currency; [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) date/time interchange; [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) country codes; [IETF BCP 47](https://www.rfc-editor.org/info/bcp47), [Unicode CLDR](https://cldr.unicode.org/) and [ECMA-402](https://402.ecma-international.org/) for locale/currency display, never calculations.
- **Specialist and web:** [GS1 GTIN](https://www.gs1.org/standards/id-keys/gtin) where Product uses trade identifiers; [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/) for accessible controls; [Schema.org Offer/PriceSpecification](https://schema.org/PriceSpecification) as optional machine-readable public offers under Shop/Marketplace/SEO control.
- **Assurance guidance:** [OWASP ASVS](https://github.com/OWASP/ASVS), [ISO/IEC 27001](https://www.iso.org/standard/27001), [ISO/IEC 27701](https://www.iso.org/standard/27701). These are controls and assessment frameworks, not claims of certification.
- **National/regional obligations (conditional):** [UK Digital Markets, Competition and Consumers Act 2024](https://www.legislation.gov.uk/ukpga/2024/13/contents) and [CMA price transparency guidance](https://www.gov.uk/government/publications/price-transparency-cma209); [Price Marking Order 2004](https://www.legislation.gov.uk/uksi/2004/102/contents) **as amended** and applicable official guidance; UK VAT/HMRC rules; [UK GDPR and ICO data protection by design](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/guide-to-accountability-and-governance/data-protection-by-design-and-by-default/); and [EU Price Indication Directive 98/6/EC Article 6a](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A31998L0006), including qualified prior-price history (generally the lowest applicable advertised price in the preceding 30 days, subject to local exceptions). Rule versions and jurisdictional applicability require ongoing Legal Compliance review.

## Optional open-source libraries

**Fully public-source, commercially permissive candidates** checked 22 November 2026; adoption remains subject to current licence/transitive, security, compatibility and maintenance review. Libraries support Pricing; they never own price rules, approval, tax interpretation, persistent records or external services.

| Library | Licence; intended use | Selection |
|---|---|---|
| [decimal.js](https://github.com/MikeMcl/decimal.js) | MIT; exact decimal arithmetic, controlled rounding | **Preferred runtime calculation dependency** behind Pricing money types. |
| [Zod](https://github.com/colinhacks/zod) | MIT; input/output and configuration schema validation | **Preferred public-boundary validation**; not a substitute for business checks/permission. |
| [fast-check](https://github.com/dubzzz/fast-check) | MIT; property-based arithmetic, rounding, eligibility, replay and tenant-isolation scenarios | **Preferred CI/development-only** dependency. |
| [Dinero.js v2](https://github.com/dinerojs/dinero.js) | MIT; immutable monetary values and minor-unit representation | **Conditional**, assess first to avoid conflicting money models alongside decimal.js. |
| [json-rules-engine](https://github.com/CacheControl/json-rules-engine) | ISC; declarative eligibility/rules | **Conditional**, only if native rule evaluation becomes too complex; last identified GitHub stable release was 2023. Public contract must not depend on its syntax. |

Defer [json-logic-js](https://github.com/jwadhams/json-logic-js) because the original project had slower maintenance; do not duplicate the existing Clock capability with date-fns. Exclude open-core/hosted-paywall platforms and mandatory commercial pricing engines. The above is a library shortlist, not a pinned installation or CI result.

## Optional GUI and representative Nuxt host

The **headless service is mandatory; the GUI is optional**. A derived Pricing test application follows [`nuxt-layers-test/application-test-template`](https://github.com/nuxt-layers-test/application-test-template): homepage `/`, test dashboard `/admin`, responsive collapsible **Capabilities** sidebar already linking to `/theme-manager`, and Theme Manager-backed Appearance in the header. The **derived app**, not the shared template, adds a **Pricing** sidebar entry and optional dashboard tile. Illustrative host-owned routes are `/pricing`, `/pricing/price-books`, `/pricing/quotes`, `/pricing/promotions` and `/pricing/exceptions`; these are not shipped routes or mandated public API paths.

| Screen | Main purpose and public contract |
|---|---|
| **Pricing dashboard** (essential with GUI) | Authorised summary of effective/future tariffs, approvals, expiring quotes, promotion budgets and issues; link to public detail queries. |
| **Price books/tariffs** (essential) | Draft, compare, validate, approve, schedule, publish and withdraw immutable revisions; independently authorise high-risk actions. |
| **Quote simulator/history** (essential) | Safe non-committing indicative calculations, conditional firm-quote issuance as a separate authorised action, discount trace, tax/FX uncertainty and historic reconstruction. |
| **Promotions/coupons** (when enabled) | Eligibility, stacking, budgets, reservation/release/redemption and status; no manual cap bypass. |
| **Exceptions/providers** (conditional) | Stale source data, conflicted imports, expired reservations and uncertain provider outcomes; safe reconciliation/retry, not assumed settlement. |
| **Settings/access** (conditional) | Scoped Configuration and Pricing policy values, approved thresholds, provider source and permissions; mandatory legal/security floors immutable to ordinary operators. |
| **Audit/history and Reporting links** (optional) | Authorised Pricing source history and links to Audit evidence and Reporting-owned analytics, without duplicating their records. |

Host retains layout, branding, top bar, navigation, route placement, responsive overlay, sign-in and Theme Manager. Pricing supplies optional screens/navigation metadata and reads/writes only its public contract; UI provides accessible reusable controls. Reader, editor, approver, promotions and reconciliation permissions are independently enforced **on the server**; hidden links are not access control. Use Theme Manager semantic tokens, WCAG 2.2 AA, BCP 47/CLDR formatting, accessible status/errors/focus, keyboard operation and explicit loading/empty/stale/held/uncertain states. Customer-facing prices are rendered by Shop/Product/Marketplace/Order/Booking from authorised Pricing projections, not a second storefront. The template's Theme Manager `test` mode is unauthenticated and must **never** be deployed publicly.

## Conceptual acceptance criteria (not executed tests)

| Scenario / input | Expected response and authoritative owner |
|---|---|
| Approved GBP tariff effective tomorrow | Immutable published revision, prior tariff remains effective until change; Pricing. |
| Three units, tier discount and verified Membership benefit | Deterministic component price and source revisions; Pricing calculates, Membership determines eligibility. |
| Guest with no Membership evidence versus mandatory restricted offer | General offer without member discount; restricted offer held without qualifying evidence. |
| Quote just before tariff change, later accepted by Order | Order preserves attributable prior firm quote where valid; no silent repricing. |
| Simulator requests firm offer or uses coupon | Simulation is non-committing; firm issue and reservation require separate authorised command. |
| Concurrent/replayed coupon reservation and later cancellation | Idempotent one-time cap reservation, verified redemption or release; no double use. |
| Tenant B requests tenant A's confidential rate; editor self-approves | Both denied with safe error and accountable evidence where required. |
| Missing FX/tax evidence or conflicting source tariff | Indicative/held or quarantined with reason; never definitive converted/tax-inclusive total or silent provider fallback. |
| Retroactive correction after an invoice | New attributable revision; no mutation of prior commitment, Billing or Accounting record. |
| Price reduction is advertised in a relevant EU market | Sufficient attributable advertised-prior-price history and qualified legal rule; display owner determines lawful claim. |
| Outbox duplicate/reordering; unavailable Logging/Reporting | Consumers deduplicate/requery; native Pricing continues, mandatory Audit policy remains enforced. |
| Failed/uncertain provider redemption or audit evidence | Hold/reconcile, explicit outcome, never infer commit or bypass mandatory evidence. |
| Pricing screens enabled/disabled in derived test host | Sidebar/dashboard, theme and mobile navigation work with server permissions; headless contract works without GUI. |
| Caller asks Pricing to take a payment, issue invoice or post ledger entries | Explicit unsupported operation; respective domain owner retains authority. |

## Decisions, completion and implementation gap

**Owner-approved (22 November 2026):** `PRI-01` independent Domain price authority; `PRI-02` native deterministic revisioned arithmetic; `PRI-03` Pricing-owned promotions, Membership-owned benefit limits; `PRI-04` conditional firm/indicative quotes with Order-owned commitment; `PRI-05` optional qualified external tariff authority and reconciliation; `PRI-06` headless core and optional host-sidebar dashboard; `PRI-07` public commands/queries/events and reconstructible history. Supplementary approvals are fully incorporated above: expiring idempotent reservations, qualified tax/FX, fixed pricing/rounding sequence, immutable corrective revisions with risk-based approval, standards, libraries, diagnostics/Audit/Reporting and GUI. Related accepted conceptual decisions: Billing `BIL-01`, Membership `MEM-01–10`, organisation governance `ORG-01–08` as relevant. **The governing catalogue still says candidate**; conceptual owner approval does not itself change it.

**No remaining owner-level conceptual Pricing decision is identified.** Implementation choices still to validate: published root `CONTRACT.md` and exact exported types, selected providers and regional legal rules, numeric caps/expiry/rounding thresholds, store/outbox/Clock and IAM/approval adapters, provider/source reconciliation, package licences/versions, minimal Nuxt host composition (one operation, at most 50 host-specific lines), security/financial/permission/race/accessibility/contract CI and real production authorisation. Recheck the merged Order contract and the now-merged Payment Gateway conceptual contract, updating reciprocal interfaces if they change. No implementation, tests or compliance are asserted.

**Review outcome:** Conceptual specification complete; implementation unverified. The owner authorised the protected squash merge on 23 November 2026; verify its final state on GitHub. Before any merge, recheck current governing and blueprint `master`, competing reviews, catalogue/register, docs/links, protected-branch checks, CI, mergeability and policy; apply the separately granted owner merge approval under repository policy. No assistant-run tests or implementation changes.


## Reciprocal persistent Shopping Basket pricing — 23 November 2026

**Status:** SB-01–SB-08 **owner-approved conceptually on 23 November 2026**; runtime integration remains unverified. [Shopping Basket](../shopping-basket/capability-record.md) stores selected quantity/offer and optional quote ID, revision, observed amount/currency and freshness, **not** Pricing rules, legally committed price, coupon budgets or promotion reservations. Pricing alone returns qualified indicative/firm quote, exact decimal amount, tax/fee breakdown, eligibility, expiry and promotion state for seller/channel/buyer context. Basket may save without an available quote; on checkout stale/changed/contradictory evidence demands new Pricing calculation and explicit buyer acceptance, with final acceptance owned by Order. Future published contracts must align quote scope, version, expiry and fail/unknown result. Pricing need not import Basket; existing Pricing approvals remain intact.


## Reciprocal Shop price/checkout presentation — 23 November 2026

**Status: Owner-approved Shop-side direction in Shop draft PR #134; Pricing's approved decisions remain unchanged.** [Shop](../../compositions/shop/compositions-record.md) consumes source-qualified display prices, effective tax/currency and Pricing-owned indicative/firm quotes through public contracts. Basket amounts are non-binding previews; only Pricing establishes authoritative amounts/expiry/promotion eligibility, and only Order accepts the commercial commitment. Stale, invalid or unknown mandatory price evidence blocks a definitive checkout. Shop must not reimplement Pricing calculation rules or invent zero-price fallbacks. No runtime API asserted.

### Subscription reciprocal contract — conceptual review PR #137 (23 November 2026)

**Owner-approved Subscription conceptual direction; not an implemented interface:** [Subscription](../subscription/capability-record.md) owns effective versioned recurring agreements, lifecycle and scoped commercial entitlements; it does not own charges, tariffs, payment execution, scheme membership, financial postings, analytics or security access decisions. Partner consumption must use the Subscription public plan/term/status/entitlement snapshots with scope, revision, effective time, provenance and explicit pending/unknown results, and must recheck authoritative current state after delayed or duplicate events. Partners supply their own independently authoritative facts; no direct cyclic package dependency or private schema access is approved. Preserve each partner's existing approved decisions; the complete interfaces and unresolved boundaries are in Subscription's draft record.

**SUB-10/SUB-14/SUB-16 owner-approved conceptual decisions (23 November 2026):** Pricing owns effective/versioned tariffs and qualified quotes, not subscription acceptance, recurring contract terms or lifecycle. Subscription must pin accepted agreement terms/quote revision, independently verify authorised price/term changes and follow applicable advance-notice/consent policies. Provider-led imports preserve original accepted tariff/terms provenance and reconcile effective price before any renewal/change; a quote does not establish contract agreement.

## Checkout reciprocal conceptual interface — 24 November 2026

**Checkout-side conceptual interface owner-approved (24 November 2026):** Checkout PR #151, [conceptual contract](../checkout/capability-record.md). Checkout requests firm quotes, expiry and promotion holds; Pricing owns calculation, rounding and quote authority; material changes require reconfirmation. Existing approved decisions remain authoritative; host-bound public ports only, no circular imports.
