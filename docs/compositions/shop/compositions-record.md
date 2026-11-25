# Shop — Application Composition Record

**Identity:** `shop` · **Classification:** Application composition with optional reusable presentation, **not a data-owning Domain capability**.  
**Conceptual status:** **Complete — SHOP-01–05 and subsequent contract, standards, library, operational-boundary and GUI recommendations owner-approved on 23 November 2026.** Completeness means the *conceptual design* is settled; it does **not** mean the runtime, published implementation contracts, test evidence, legal compliance or merge have been approved.  
**Implementation status:** No `nuxt-layers/shop` repository, executable Shop API, deployed screens or root `CONTRACT.md` has been verified. This specification describes **planned logical interfaces**, not shipped functions or routes.  
**Review:** Shop draft PR #134. Opening governing `architecture-rules/master` `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; opening blueprint `master` `85c67c33e3e93d12bed5ffc14f78fb7d7bff8995`. Governing accepted ADRs, the [Capability Standard](../../capability-standard.md) and approved source-owner public contracts take precedence.

## 1. Purpose, ownership and modes

Shop assembles authorised commerce journeys: product discovery, merchandising, persistent basket presentation, checkout, purchase outcomes, customer service, and optional seller and operator screens. **Shop owns only composition and presentation**, including source-qualified views, owner-directed actions, temporary UI state and a reference to the Checkout-owned attempt. The host owns channel identity, branding, routes, audience separation, tenant/merchant context, available integrations and deployment. Shop does **not** own a product, seller, price, stock, basket, accepted order, payment, delivery, invoice, financial ledger or authoritative commerce event. It must not introduce a second database or commercial decision engine.

- **Single seller:** Product and published content can be browsed independently of Marketplace. Pricing is needed to show a valid price, and Order plus any sale-specific qualifying owners are needed to accept purchases. Without Order, use catalogue/enquiry-only mode for ordinary sales. Any alternative commercial source must satisfy Checkout's approved independent commitment and collection-authority requirements. Without Checkout, disable the reusable checkout journey; browsing and saved intent can remain available.
- **Multi-seller:** optional Marketplace supplies seller eligibility, venue policy and released listings. An aggregated checkout may produce **separate, seller-specific Order outcomes**. There is no implied atomic multi-seller purchase or consolidated legal commitment.
- **Persistent baskets from initial release:** [Shopping Basket](../../capabilities/shopping-basket/capability-record.md) alone owns durable guest/account baskets, selected lines, revision, holder claim/merge, expiry, recovery and conversion references. Its initial design merged via PR #140; owner-approved **SB-01–08** and technical refinements are documented in follow-on draft PR #141. Guest/account inactivity defaults are configurable **30/90 days**, subject to Privacy/Legal limits. Personal cross-device saving is in scope; collaborative multi-user editing and long-lived stock holds are deferred. **No Shop basket store or localStorage-based substitute** is permitted.
- **Headless and optional presentation:** a host may compose the same owner contracts without Shop screens or a distinct Shop package. A separate reusable Nuxt adapter/presentation kit requires independently demonstrated cross-host value and a stable public surface. Do not invent an independent Shop lifecycle to justify one.

The main rule is **one owner for each business fact**, regardless of whether Shop displays several owners' data on one page. Source facts retain identity, revision, effective/observed time, provenance and disclosure entitlement; the host cannot elevate a user-supplied tenant, seller or role.

## 2. Planned public input and output contract

These are **logical host/composition surfaces**, not current exported TypeScript names, endpoints, a universal payload or an implemented root `CONTRACT.md`. The host invokes published owner contracts, not private code or databases.

### Inputs to Shop

| Supplier | Information / required handling |
|---|---|
| **Host, Configuration, Theme Manager, UI, Localisation, Clock** | Trusted channel/tenant/merchant, routes, enabled ports, display preferences, approved settings, locale, theme and effective time. Missing optional presentation choices use documented safe defaults; host controls routing and context |
| **Identity, Authentication, Authorisation, Privacy, Legal Compliance** | Trusted guest/caller/representation, assurance, resource-specific access decisions, consent, selling duties and restrictions. Unknown/expired/denied protected decisions **fail closed** |
| **Product, Publisher, Media** | Released product IDs, variants/revisions, text and permitted assets; withdrawn or missing mandatory facts prevent a purchase promise |
| **Pricing; Inventory, Booking or other stock/capacity owners** | Display amount versus valid firm quote, currency, tax/discount qualifications, quote expiry and available/reserved/unknown source status. Shop never recalculates authority, presumes availability or treats intent as a reservation |
| **Shopping Basket** | Authorised durable basket ID, holder/scope, selected lines, revision, expiry, guest claim and merge, checkout attempt and per-seller conversion references |
| **Order** | Source-qualified accepted, rejected, amended, returned, pending or unknown seller-specific commitments and immutable references. Submission receipt alone is not acceptance |
| **Marketplace, Payment Gateway, Billing, Invoice, Logistics, Subscription/Membership** | Optional seller/listing rules, payment/charge/invoice/shipping/entitlement outcomes and permitted owner actions. Absence disables only dependent features, without fabricated states |
| **Search, Reviews, SEO, Reporting, Integrations and platform operations** | Optional discovery, verified ratings, public-indexing guidance, authorised metrics, provider status and safe technical/evidential outputs |
| **Shopper, seller, operator** | Browse and presentation requests; basket mutations; quote/checkout initiation; owner-routed returns/support, seller participation and administration. Validate server-side scope, revisions, consent, quantity, policy and idempotency |

### Outputs from Shop

| Consumer | Proposed result / limit |
|---|---|
| **Customer and public host** | Permission-filtered storefront/product/category/search descriptors with seller, released content, qualified amounts, availability freshness, clear missing/withdrawn states and SEO-safe publication metadata |
| **Basket holder** | Saved-basket read, edit/restore/merge feedback and provisional preview **from Shopping Basket and other owners**; never a Shop-owned basket or guaranteed quote |
| **Checkout customer and host** | Validated submission intent, safe correlation/idempotency, each seller's Order ID and authoritative accepted/rejected/**unknown** state, explicit recovery route; payment/fulfilment shown separately |
| **Customer account and seller** | Authorised source-qualified order, return, delivery, invoice, payment and listing/account links and states; no duplicate decisions |
| **Operators** | Protected dashboard/navigation descriptors, installed/disabled feature status, source health, safe exceptions and owner-management links |
| **Specialist consumers** | Allowed context for source-owned evidence/diagnostic submission and authorised reporting requests, **not** independently asserted domain business events |

**Illustrative actions:** browse/select; route a Shopping Basket add/change/restore/claim operation; preview/submit/reconcile checkout; request an Order return; open Marketplace seller participation. **Illustrative reads:** storefront, basket/checkout preview, seller-qualified order status, account overview and feature status. Actual operations, permissions, payloads and absence modes must be taken from each owner's future or existing published `CONTRACT.md`. Shop emits **no authoritative domain events**; owners commit their changes and supply their own outboxes under accepted ADR-0012. Client UI events can be privacy-limited telemetry but cannot prove a sale.

**Reliability:** late, replayed or duplicate provider results are reconciled by owner ID, revision and idempotency. A timeout is **unknown** until its owner checks. Missing Pricing, stock, policy, access or Order evidence never degrades into an invented confirmed price, reservation, payment or purchase. Optional discovery/reporting may degrade to permitted owner queries or an unavailable notice.

## 3. Cooperating capabilities and dependency direction

| Owner | Information **to** Shop | Requests / information **from** Shop |
|---|---|---|
| **Shopping Basket** | Persistent holder-scoped basket, versions, expiry, checkout attempt and per-line conversion | Authorized intended line changes, claim/merge, preview and recovery requests |
| **Product; Publisher; Media** | Canonical catalogue and approved editorial/media | Product selection, published-content reads and owner-directed editing links |
| **Pricing** | Indicative/firm price, promotion, currency/tax, expiry | Scoped quantities, customer/seller context and quote requests |
| **Inventory; Booking** | Source-qualified stock/capacity and reservation status | Availability enquiries and authorised owner actions |
| **Order** | Per-seller commitment, revision, cancellation/return and unknown reconciliation | Idempotent purchase/return/status requests; source-qualified basket attempt |
| **Marketplace** | Released listings, venue and seller eligibility/account state | Optional seller onboarding/listing/product-match actions; absent in native single-seller |
| **Payment Gateway; Billing; Invoice; Accounting; Logistics** | Actual payment, charge, issued document, ledger and shipment facts | Owner-directed payment, invoice, fulfilment and refund references/requests; no Shop accounting |
| **IAM; Configuration; Privacy; Legal Compliance; Clock** | Caller/assurance/authorisation, approved settings, time and limits | Trusted action/resource context and policy-evaluation requests |
| **Search; SEO; Reviews; Reporting** | Qualified discovery, indexed presentation rules, verified reviews and authorised reports | Public released source references, authorised queries and contextual filters |
| **Integrations; Scheduler; Workflow; MQ; Notifications; platform operations** | Qualified provider/transport/workflow/notification and health statuses | Authorised routed requests, correlation, safe diagnostic context only |
| **Application Compositions, Site Hosting, UI, Theme Manager** | Host layout, routes, branding, navigation, semantic styling | Optional shop screen/view descriptors and selected owner-backed actions |

**Dependencies are directed:** host/Shop consumes public owner ports; Product, Order, Shopping Basket, Marketplace and others **do not import Shop**. Reciprocal documentation describes information exchange, not a build-time dependency or shared database. Seller, customer, merchant and administrator disclosures are independently authorised. The [Application Compositions reciprocal record](../../architecture/application-composition.md) documents host navigation.

## 4. Error Normalisation, Logging, Audit and Reporting

Their inputs, outputs and authority are separate:

| Component | Shop / originating host supplies | Shop / host receives | It must not claim |
|---|---|---|---|
| [**Error Normalisation**](../../libraries/error-normalisation/stateless-library-record.md) — stateless library | Source-owned error, **known or uncertain** outcome, versioned mapping/disclosure policy, permitted opaque correlation | Safe code/category, message key, sanitised public/diagnostic projections and **advisory** retry hint | Completion, rollback, automatic retry, storage, events, evidence or reports |
| [**Logging**](../../services/logging/services-record.md) — diagnostics | Allowlisted technical code, severity, operation, time, permitted context and correlation | Accepted/rejected/throttled/unavailable/uncertain diagnostic intake, protected diagnostic view and qualified delivery/health | Order/payment result, stored evidence or complete commercial metrics |
| [**Audit**](../../capabilities/audit/capability-record.md) — accountable evidence | Independently authorised, risk-selected **Shop/host-originated** privileged/denied/administrative actions, source-known outcome, actor/tenant, resource and event reference. Domain owners submit their own committed business evidence | Accepted/pending/rejected/uncertain evidence receipt, protected integrity/coverage/review references | Business transaction truth, guaranteed completeness without source evidence or promotion of ordinary log lines |
| [**Reporting**](../../capabilities/reporting/capability-record.md) — derived analysis | Authorised scope, period, parameters, presentation context and optional explicitly non-authoritative funnel facts; business sources submit/serve their own qualified facts | Report/job/results/export references, lineage, source cutoff, freshness, completeness, unknown and revocation states | Sales or revenue derived solely from clicks, log counts, stale Basket intent or provider timeout |

**Example:** checkout times out. Shop displays a safe *status unknown* message from the source outcome and error projection; logs a minimal technical diagnostic; routes any required accountable assertion under the *source's* Audit policy; asks Checkout to reconcile the original idempotent attempt through the appropriate source owners; and displays Reporting's source-backed result only when qualified. Neither Logging unavailability nor a reporting failure reverses a committed transaction. Mandatory evidence obligations cannot be waived because a diagnostic sink is down.

No raw baskets, credentials, session tokens, provider exceptions, payment instruments or confidential seller details go to broad diagnostic feeds. Protect evidence, reporting queries and exports with current server-side authorisation, tenant/seller isolation, minimisation and retention. Four bounded reciprocal notes are documented in their respective canonical records; no shipped adapters are asserted.

## 5. GUI and representative application test host

Shop **needs storefront screens** and normally a **protected shop administration entry point**; neither requires a standalone Shop service. The verified [application test template](../../../RESOURCES.md#ref-f1f7cc47) provides homepage `/` (no admin sidebar), `/admin` dashboard, responsive/collapsible **Capabilities → Theme Manager** sidebar and top-bar Appearance/theme controls. Its `Not signed in` placeholder and Theme Manager's unauthenticated local `test` mode are **not suitable for public Shop management**. The [Theme Manager host contract](../../../RESOURCES.md#ref-484ee610) has an existing ADR-0012 integration gap; do not infer Shop runtime readiness from the local template.

**Recommended host-owned navigation:** sibling **Capabilities → Shop** sidebar item and optional `/admin` capability card, opening a protected, illustrative `/admin/shop` dashboard; separately `/shop` for the customer-facing storefront. These are **example routes, not published API paths**. The host controls identity/branding, theme and route mounting; server-side owners enforce access on every protected action. Avoid using `/shop` for both public and administration.

| Management screen / group | Responsibility |
|---|---|
| **Overview** | Channel/merchant context, permission-filtered status, owner-qualified summary and alerts |
| **Storefront / publication** | Preview released vs draft Publisher/Product/Media/SEO content and open the public shop |
| **Commerce** | Product management links, Pricing/promotion links, restricted Basket support/health, seller-qualified Order and payment reconciliation |
| **Sellers** (optional) | Marketplace participation, listing/product match, reviews/appeals and seller account |
| **Insights** (optional) | Reporting-backed sales/operational views and separately authorised Logging/Audit diagnostics |
| **Settings** | Configuration-owned channel policies, Theme Manager appearance, locales, navigation and publication links |

**Public journey:** home → categories/search → product/listing detail → direct purchase or Shopping Basket-backed persistent basket (guest/account recovery and explicit merge choices) → Checkout-owned preparation and confirmation → seller-qualified accepted/rejected/pending/**unknown** outcome → account/orders/returns. Display tax/fees, seller identity, delivery, return rights, quote validity and owner freshness before binding requests. Do not show invented ratings, stock or payment confirmation.

**Idealised GUI contract:** host inputs are trusted channel/tenant/merchant, enabled owner ports, branding/theme/locale and permissions; presentation outputs are safe menu/card/page descriptors, owner-sourced views, validation/message references, routed interaction intents and incomplete/degraded/unknown states. There is **no automatic menu registration** or separate Shop persistence.

**Accessibility/UX:** shared Theme Manager semantic styling, WCAG 2.2 AA, keyboard/screen-reader status, contrast/focus, responsive mobile, clear partial checkout, localisation and appropriate server rendering/SEO. On tenant switches discard stale view responses and re-authorise. The host should avoid duplicate data loads, slow client-only product content and private data in public cache or search metadata.

## 6. Security, privacy, legal duties and standards

**Mandatory platform floors:** OWASP ASVS 5 Level 2 (Level 3 for critical cases), WCAG 2.2 AA, accepted public-contract/host-composition ADRs, server-side Authorisation, least privilege, cross-tenant and seller isolation, safe output encoding, CSRF/injection/redirect and payment-page script protections. Shop stores no card credentials. Shopping Basket owns its persistent data, guest proof, 30/90-day configurable inactivity defaults, erasure/retention and its own storage register; Shop declares only any **actual** temporary UI cookies/storage, consented marketing tracking and diagnostics. Avoid declaring compliance, legal applicability or certification without evidence.

| Standard / law | Conceptual design use and ownership |
|---|---|
| **W3C WCAG 2.2 AA, semantic HTML, WAI-ARIA 1.2** ([W3C](../../../RESOURCES.md#ref-0d1f555e)) | Accessible browsing, filtering, checkout, recovery and management; native HTML first, ARIA where needed |
| **OWASP ASVS 5, ISO/IEC 27001:2022** ([OWASP](../../../RESOURCES.md#ref-a1c367d2)) | Adopt platform security governance and source-owner controls; no Shop-owned parallel policy engine |
| **ISO/IEC 27701:2025, UK GDPR/GDPR, UK PECR** ([ICO](../../../RESOURCES.md#ref-6086d074)) | Privacy by design, lawful data use, basket/cookie separation, purpose, sharing, erasure and retention through Privacy/Legal |
| **PCI DSS v4.x, PCI SSC ecommerce payment-page guidance** ([PCI SSC](../../../RESOURCES.md#ref-eb8cbb26)) | Payment-provider/Gateway controls and host-page scripts; actual card-data scope must be assessed |
| **UK Consumer Rights Act 2015; Consumer Contracts Regulations 2013; UK DMCC Act 2024/CMA guidance** ([UK legislation](../../../RESOURCES.md#ref-472de5bf)) | Qualified seller, total price/fees, delivery, confirmation, cancellation/returns, honest reviews/discounts and non-deceptive checkout |
| **ETSI EN 301 549, EU European Accessibility Act and Digital Services Act** ([ETSI](../../../RESOURCES.md#ref-19a33201), [EUR-Lex](../../../RESOURCES.md#ref-c887e4a3)) | Conditional accessibility/trader disclosures when the deployment and marketplace role fall within scope; standard publication and legally harmonised edition are not interchangeable |
| **Schema.org Product/Offer/OfferShippingDetails/MerchantReturnPolicy, relevant search guidelines** ([Schema.org](../../../RESOURCES.md#ref-30a88a32)) | SEO/Publisher present only public, current and visually consistent authoritative product, seller, price, shipping and return facts |
| **IETF RFC 9110 and 9457; OpenAPI/JSON Schema for actual HTTP interfaces** ([RFC 9457](../../../RESOURCES.md#ref-7754416d)) | Typed public errors, correct HTTP/caching/idempotency and versioned contracts; no new API required solely for documentation |
| **ISO 4217; ISO 8601/Clock; BCP 47/Unicode** | Qualified currency/time/language semantics; Pricing, Clock and Localisation retain their authority |

Legal Compliance determines applicability by seller, channel, jurisdiction, buyer and product; regulations for marketplaces, subscriptions or regulated products are **conditional**, not universally mandatory. Preserve visible evidence and qualified uncertainty. No standard transfers authoritative business ownership into Shop.

## 7. Open-source implementation selection

**Approved policy:** use only **complete publicly available community source**, free use and commercially permissive licence for selected functionality; prefer MIT, BSD, ISC or Apache-2.0. No open-core/paywalled essential runtime, delayed community code, field-of-use/source-available restrictions or mandatory proprietary service. Check **exact installed version, assets and transitive licences** and maintenance before adoption. These are candidates, not installed packages or mandatory dependencies.

| Candidate | Licence | Decision |
|---|---|---|
| [Nuxt 4](../../../RESOURCES.md#ref-b554353a), [Vue 3](../../../RESOURCES.md#ref-cf2779ac), [Tailwind CSS](../../../RESOURCES.md#ref-d67bae77) | MIT | **Existing foundation**; reuse rather than add Shop infrastructure |
| [Nuxt UI v4](../../../RESOURCES.md#ref-b0f34541) | MIT | Prefer shared UI/Theme Manager; add only if not already supplied. Check actual package, accessibility and CSS integration |
| [Zod](../../../RESOURCES.md#ref-1e3efac4) | MIT | Prefer a common contract-validation layer; never use shape validation in place of domain rules or authorisation |
| [VeeValidate](../../../RESOURCES.md#ref-bd5a7590) | MIT | Optional complex checkout/management form state and errors |
| [TanStack Vue Query](../../../RESOURCES.md#ref-51cb5e45) | MIT | Optional server-state cache only where Nuxt data utilities are insufficient; never cache stale commitments as promises |
| [ofetch](../../../RESOURCES.md#ref-e2925973), [Unhead](../../../RESOURCES.md#ref-1a0ac221) | MIT | Prefer Nuxt built-ins for HTTP/SSR head/metadata |
| [Vue I18n](../../../RESOURCES.md#ref-4941c780) | MIT | Via shared Localisation rather than a second language store |
| [Reka UI](../../../RESOURCES.md#ref-12355446), [VueUse](../../../RESOURCES.md#ref-9507482e), [Floating UI](../../../RESOURCES.md#ref-07622d6a) | MIT | Optional accessibility/composition helpers only if existing UI does not already include them |
| [Lucide](../../../RESOURCES.md#ref-c5624441) | ISC | Optional icons through existing UI abstraction |

Do **not** add a complete external ecommerce engine, competing design system, Shop database or extra graph/cache/search server solely for the composition. Avoid Neo4j, Redis and Elasticsearch under the owner's specified complete-source/no-open-core restrictions. Keep provider integrations in Integrations or their owning capabilities. Evaluate SSR performance, WCAG, tree-shaking, dependency advisories, maintenance and commercial attribution; no global installs or implementation changes follow from this shortlist.

## 8. Conceptual acceptance criteria

| Scenario | Required result / owner |
|---|---|
| Single-seller without Marketplace | Shop browses released Product facts, optionally Pricing amounts; Marketplace screens absent; checkout works only with qualified Order and sale dependencies |
| Order or mandatory sale dependency absent | Catalogue/enquiry-only or explicit hold; no fake accepted purchase |
| Customer restores saved basket on another device | Holder-authorised durable state and revision through **Shopping Basket**; no Shop store |
| Guest signs in and merges | Shopping Basket verifies possession and access; user resolves conflicts without cross-tenant disclosure |
| Price expires, listing withdrawn, stock unknown or law changes | Refresh/revalidate through owner; visible hold/changed terms; no price/availability guarantee |
| Seller A accepts and seller B rejects or remains unknown | Distinct Order IDs and outcomes; remaining basket intent recoverable; no false overall acceptance |
| Checkout submission replay, provider timeout or lost callback | Stable owner idempotency/correlation and reconciliation, never duplicate a transaction or infer failure/paid |
| Seller/tenant switch or denied/stale rights | Server-side reauthorisation, no cross-scope result, stale cached view discarded |
| Payment, shipment, return or invoice action | Actual Payment Gateway/Logistics/Order/Invoice state presented with source; no Shop financial assertion |
| Logging or Reporting unavailable | Only diagnostics/analytics degrade; source operations and mandated Audit policy remain correctly enforced |
| Security-relevant privileged change / Audit unavailable | Originating owner applies risk-selected accountable evidence, pending/fail-closed policy and explicit receipt semantics |
| Derived local acceptance host | Protected sidebar/dashboard and separate public route, Theme Manager semantics, WCAG/i18n/mobile, correct feature absence/unknown states; **no unauthenticated test-mode production exposure** |
| SEO, search and review presentation | Released/public source facts only; no invented metadata, false rating or private index leakage |

**Verification is outstanding:** there is no demonstrated Shop package, shipped public host adapter, linked source `CONTRACT.md` integration, executed contract/security/accessibility/UX acceptance, documented deployment legality, runtime budget or CI result in this review. The future implementation must prove the accepted ADR-0012 single-operation host composition and **50-line capability-specific host budget if a Shop Nuxt adapter is introduced**. Source APIs and availability may require versioned alignment; no independent Shop service or new dependency is justified by these tests.

## 9. Approved decisions, completion and review gate

- **SHOP-01 — Approved:** application composition only, optional reusable presentation; no independent business data authority.
- **SHOP-02 — Approved, refined:** Shopping Basket owns persistent initial-release intent, holder/lines/revisions, expiry and recovery; Shop routes its requests, Checkout owns attempt coordination and aggregate disposition, and Order owns seller-specific commercial acceptance and its own idempotent results.
- **SHOP-03 — Approved:** native single-seller operation, Marketplace as optional multi-seller listing and participation owner.
- **SHOP-04 — Approved, elaborated:** host owns public/admin routes, optional Capabilities sidebar/card and protected themed accessible UI; example split `/shop` public and `/admin/shop` protected.
- **SHOP-05 — Approved:** provider-neutral Integrations, source-qualified Search/SEO/Reviews/Reporting, and no duplicate financial, event or payment records.
- **Further owner-approved design:** idealised input/output and reciprocal contracts; Error Normalisation/Logging/Audit/Reporting distinction; standards and conditional legal application; commercially permissive **complete-source** OSS-only selection; customer/operator GUI and test-template pattern.

**Conceptual design: complete and owner-approved.** Classification, scope, absence behaviour, contracts, counterpart ownership, security/privacy/standards, OSS policy, GUI and examples have been specified. This conclusion **does not** approve runtime implementation, production readiness, legal certification or a merge.

**Documentation location:** retain `docs/capabilities/shop/capability-record.md` temporarily for existing links, even though its content is an **Application Composition Record**. Moving to a dedicated composition path and updating references is an editorial/governance migration, not a reason to reopen conceptual business ownership.

**Pre-merge:** reconcile the latest blueprint `master` with this draft PR (including merged Shopping Basket PR #140, follow-on #141 and other overlapping Product/Pricing/Order/Marketplace/Reporting/Search/SEO drafts); recheck accepted governing `master`, shared reciprocal notes, links, conflicts, CI and protected branch policy. Owner approval of conceptual recommendations is **not** permission to merge. No implementation repositories or tests have been changed/run here.

## Checkout reciprocal conceptual interface — 24 November 2026

**Status:** Checkout-side conceptual interface owner-approved (24 November 2026) in PR #151; existing approved decisions remain authoritative. See [Checkout conceptual contract](../../capabilities/checkout/capability-record.md). Shop consumes Checkout's headless session/prepare/confirm/submit/reconcile contract and optional customer presentation. Shop supplies trusted channel and holder context and shows attributed outcomes. Checkout owns purchase confirmation, attempt coordination and recovery; Shop invokes the public contract. SHOP-01–05 presentation/ownership exclusions remain. No Shop requirement for Checkout. Public host-bound ports only; no private schema or circular package imports. Shop must not implement checkout profiles, confirmation or recovery; it may display the optional Checkout presentation or consume the same headless commands.
