# Order — Canonical Capability Record

**Capability:** `order` · **Classification:** Domain capability candidate (conceptually approved; catalogue promotion and implementation separate).  
**Approval:** Owner-approved Order conceptual design, **ORD-01–ORD-11**, 22 November 2026, including later approved contract, standards, full-source library, cross-cutting and GUI refinements.  
**Implementation:** No independently verified `nuxt-layers/order` root `CONTRACT.md`, exported API, deployment or runtime acceptance. All interfaces below are approved **business-level contract requirements**, not invented routes, functions or wire schemas.  
**Review:** [Draft PR #113](https://github.com/nuxt-layers/architecture-blueprint-review/pull/113). Opening governing `architecture-rules/master`: `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint `master`: `361566988ac53c55f6135e8acfa46cd5b013d7a0`. Accepted ADRs and the governing Capability Standard take precedence. **Approval of the design is not approval to merge.**

## Purpose and authority

Order records **the commercial commitment accepted between buyer and seller: which goods or services, quantities, parties, prices and terms apply, when they took effect, and what remains owed**. It serves sales orders, supplier purchase orders, pure-service orders, guests and authorised onboarding purchases, independent of a marketplace, checkout application or payment provider.

**Order owns** scoped order and line identities; seller-specific acceptance, rejection and approval; accepted-time party and offer snapshots; effective and immutable revisions; amendment, cancellation, contractual return/dispute acknowledgement; remaining commercial obligations and commercial closure; reconciliation state; its domain events and **transactional durable outbox**. The source-owned commitment is not a second stock, payment or invoice ledger.

**Other owners retain their authority:**

| Owner | What Order must not re-own |
|---|---|
| Product and Pricing | Catalogue/service definitions, current prices, quotations, discounts, tax and rate decisions |
| Tenant-scoped Business Contacts/Parties; Identity/Profile; Authentication/Authorisation/Verification | Current customer/supplier records; personal identities and profiles; identity proof, delegated representation and access decisions |
| Inventory, Warehouse, Booking, Logistics and service performer | Stock/reservation/movement, handling, time/resource booking, transport/delivery proof and performed-work evidence |
| Marketplace | Venue, listing, seller eligibility and fee-entitlement attribution |
| Billing, Invoice, Payment Gateway and Accounting | Charges, issued invoices/credits, payment/refund execution and ledger/revenue recognition |
| Membership, Subscription and Tenancy | Scheme rights, subscriptions and actual tenant provisioning |
| Audit, Logging, Observability, Reporting and Search | Accountable evidence custody, diagnostics, metrics/traces, derived analyses and indexes |
| Configuration, Clock, Privacy, Legal Compliance, Integrations and Message Queue | Effective global policy/time and jurisdiction rules, provider connection management and event transport |

**Invariant:** Order acceptance does **not** prove stock availability, payment, invoicing, dispatch, delivery, title transfer, accounting recognition, subscription/membership rights or tenant creation. A source's evidence is attributed, not silently adopted as Order-owned fact.

## Approved business model and lifecycle

1. **Draft → submitted / awaiting approval → accepted, rejected or expired.** The submitting buyer does not accept on behalf of an independent seller. Validate current seller representation, quote/item version, terms, effective rules and authorised acceptance before committing.
2. **Accepted → partially performed, fulfilled, disputed, amended, cancelled or exception → explicitly closed.** Track each line's accepted quantity, qualified external performance evidence, returned quantity and remaining obligation. Closure is Order's commercial decision under effective terms; external delivery does not close it automatically.
3. **Every amendment has a new revision and effective time.** Preserve immutable original acceptance, agreed amounts, party roles and referenced agreement versions. Cancellation of unperformed balances does not erase delivered stock, money paid, an issued invoice or retained evidence. Cross-owner compensation is explicit rather than a distributed rollback.
4. **ORD-09 — counterparties:** A tenant-scoped Business Contacts/Parties *responsibility* supplies current qualified buyer/supplier role, contact and representation facts. Its eventual capability/package allocation requires separate review. Order retains only necessary accepted-time snapshots and provenance. Guests need no Identity account; optional verified, consented Identity association can be revoked without rewriting historic attribution.
5. **ORD-10 — multiple legal sellers:** One customer checkout/reference correlates **separate seller-scoped accepted orders**. Every seller controls its own acceptance, changes, fulfilment, returns and permitted disclosure. Aggregate checkout status may be partial; pricing, taxes, fees, shipping, invoices and refunds remain attributable by seller. A genuine joint legal contract requires a separately qualified exception.
6. **ORD-11 — supply/framework agreements:** An order is a **bounded purchase/sale commitment** and may reference a separately owned long-term agreement, effective revision, schedule and milestones. The agreement authority owns durable framework terms; Inventory/Logistics/performers own receipt or performance. Order records commercial acknowledgement or dispute, not fabricated physical proof. Whether a dedicated Contract capability is needed remains an independent classification question.
7. **Recovery:** Same-key/same-payload command replay returns the recorded result; a different payload or stale expected revision conflicts. A remote timeout can mean **unknown whether committed**; do not invent success/failure or retry without idempotency and reconciliation. Supported provider changeover must expose authority and pending discrepancies.

The minimum commercial record contains order type and tenant/seller/buyer references, optional checkout correlation, source/channel, accepted lines (item/service, unit, quantity), agreed amounts/currency/tax and discount provenance, terms/quote/agreement revisions, effective time, acceptance/approval and actor context, amendments, obligation states, external references, evidence attribution and domain-event identities. Sensitive customer details are minimised.

## Approved public input contract

The public interface comprises **commands**, **authoritative source facts**, **external evidence** and **effective policies**—not private tables.

| Source / interface | Information Order receives | Required condition / failure behaviour |
|---|---|---|
| Buyer, seller, procurement user or authorised operator: **commands** | Create, submit, approve/accept/reject, amend, cancel, acknowledge performance, request/record return or dispute; scope, reason, expected version and idempotency key | Always validate server-side role, representation, legal/business rules, transition and payload. Reject unauthorised, contradictory, replayed-different or stale commands |
| Product + Pricing | Effective item/service definition, quantity unit, applicable price/quote revision, discounts, currency, tax and offer validity | **Essential for an applicable item/offer**. Missing, withdrawn, stale or conflicting authoritative facts prevent acceptance |
| Business Contacts/Parties + IAM/Legal Compliance | Qualified buyer/supplier roles/contact/representation; acting principal, tenant/seller scope, assurance, delegated permission, guest eligibility and applicable restrictions | **Essential qualified counterparties and access decisions**; fail closed on missing/denied authority; never infer identity from a guest contact |
| Contract/agreement authority and Marketplace | Valid framework terms/version where invoked; venue/seller/listing/commission attribution for marketplace orders | **Conditional** on agreement or marketplace origin; unverified seller/terms prevent relevant acceptance |
| Inventory, Booking, Warehouse, Logistics and service performer | Confirmed reservations, issue/receipt, capacity, dispatch/delivery/performance proofs, revisions and exceptions | **Conditional** on the goods/service workflow; lack of proof is unknown/pending, not fulfilment |
| Billing, Invoice, Payment Gateway, Accounting | Source-attributed charge, issued document/credit, payment/refund and ledger status references | **Downstream/optional for core acceptance**, never grounds for silently changing agreed terms |
| Configuration, Clock, Privacy, Legal Compliance, Integrations | Effective policy and timing, retention/disclosure rules, provider selection, provenance/receipts and sync quality | Essential policy must be known; optional adapters may be absent. Provider-uncertain outcome remains explicit |

Every inbound fact must carry sufficient **source, version, tenant/seller scope, observed and effective time, correlation, completeness and trust context**. Client-submitted prices, statuses, seller rights and provider results are untrusted until validated by their authoritative owners.

## Approved public output contract

| Public surface / consumers | Information Order supplies and its limit |
|---|---|
| **Command results** to authorised caller | Rejected, accepted, pending or unknown outcome; stable scoped order/line IDs, revision, safe reason and correlation. A submitted command is not a completed downstream operation |
| **Authorised queries** to buyers, sellers, operators and applications | Current and accepted-time orders, revision history, per-line remaining obligations and attributed external statuses, with **as-of time, source, freshness and missing/uncertain indicators**. Filter by tenant, party, seller, action and sensitivity |
| **Versioned commitment evidence** to Inventory, Warehouse, Logistics, Booking and performers | Authoritative ordered goods/services and quantities, delivery/service constraints, amendments, cancellations and return intentions; receivers independently decide whether they can act or have acted |
| **Commercial source facts** to Billing, Invoice, Accounting, Marketplace, Membership/Subscription and Reporting | Accepted/revised/cancelled/returned line snapshots, agreed currency/terms and effective dates; no implied charge, invoice, payment, posting, entitlement or revenue |
| **Committed events**, via Order's durable outbox and Message Queue | Illustrative meanings: `OrderSubmitted`, `OrderAccepted`, `OrderRejected`, `OrderAmended`, `OrderCancelled`, `OrderFulfilmentRecorded`, `OrderReturnRecorded`, `OrderClosed`. Event identity, schema/source version, tenant/seller scope, subject revision, causation and time. **Names are not fixed wire/API exports**; consumers deduplicate and accept replay/reordering |
| **Retained evidence/export** to authorised parties and Audit | Redacted history, accepted-time provenance and legally permissible export with disclosure/retention/hold controls; never alters Order state |

Commands are guarded transitions; queries enforce current permissions and explain completeness; events follow **committed source state** at least-once-compatibly. There is no cross-capability exactly-once or distributed atomicity guarantee.

## Cooperating interfaces: exact ownership and exchange

| Cooperating capability | Order needs from it | It may receive from Order |
|---|---|---|
| Product / Pricing | Approved definition, quote/rules and version | Immutable accepted order line and commercial snapshot |
| Business Contacts/Parties / Identity / Authorisation | Qualified party/role, representation and per-resource decision | Transaction reference and resource/action context; no Identity ownership |
| Inventory / Warehouse / Logistics / Booking / performer | Independently confirmed reservation, stock/movement, physical delivery, capacity or performance | Seller-scoped line obligations, due dates, releases, cancellations and changes |
| Marketplace | Listing/venue/seller eligibility and attribution | Separate seller-accepted orders and shared checkout correlation |
| Billing / Invoice / Payment Gateway / Accounting | Charge, issued document, payment/refund and posting **references** | Accepted commercial obligations, amendments, returns and reconciled source evidence |
| Membership / Subscription / Tenancy | Eligibility, entitlement/provisioning status | Qualified purchase and cancellation evidence only |
| Privacy / Legal Compliance / Notifications | Effective rights/retention and delivery results | Minimal allowed evidence, notice/notification intent; no implied actual delivery |
| Integrations / Message Queue / Search | External provider receipts/sync or transport/index status | Qualified committed events and permitted projections |
| Reporting / Audit / Logging / error-normalisation | Their own independent results, as detailed below | Scoped source facts, evidence or safe errors, never Order state authority |

**Dependency rule:** Only qualified parties, offer/terms, effective policy and server-side decision context are fundamental to acceptance. Marketplace, stock, booking and agreement sources are required **only for applicable order types**. Downstream finance, transport, Reporting and optional providers are not universal installation requirements. Use host-supplied public ports and independently subscribed committed events: no private-table access, duplicate ledgers or circular package imports.

### Error, diagnostics, accountability and analytics — approved reciprocal contract

| Cooperating contract | Order sends | Order receives | Non-negotiable distinction |
|---|---|---|---|
| [error-normalisation](../../libraries/error-normalisation/CONTRACT.md) (**stateless library**) | Source-owned stable versioned error code, known/unknown order outcome, approved mappings, safe context and disclosure purpose | Deterministic category, message key, safe public/technical projection and **qualified** retry hint or safe unclassified response | Normalisation never decides whether acceptance committed, retries, persists, audits or logs; absent library requires an equivalent safe fallback |
| [Logging](../../services/logging/services-record.md) | Bounded, allowlisted diagnostics: invalid input, permissible denial, revision conflict, adapter timeout, outbox lag, recovery and opaque correlation | Intake/delivery status, lost/late/unknown diagnostics and authorised technical health/read results | Technical logs never prove an order outcome; logging outage is reported separately without corrupting committed state |
| [Audit](../audit/capability-record.md) | Registered significant order accept/reject/approval, terms/party/price changes, cancellations, returns, overrides and sensitive access; source event ID/revision, actor, policy and times | Evidence receipt (accepted/rejected/pending/unknown), evidence reference, verification/integrity/coverage and review/export outcomes | Audit owns custody **of an assertion**, not contract truth. Source outbox is atomic with Order state; critical capture may impose an explicitly approved fail-closed or hold policy |
| [Reporting](../reporting/capability-record.md) | Permitted tenant/seller-scoped versioned order/line facts, outstanding commitments, original currency, amendments and source-event IDs | Authorised report references, derived counts/trends, as-of time, lineage, freshness/completeness, refresh/export status | Reporting cannot modify orders, infer revenue/payment, bypass seller isolation or treat incomplete projections as full totals |

Shared context is **minimal and purpose-specific**: trusted tenant/seller scope, source/operation, event and order revision, permitted opaque references, actor where warranted, time, correlation/idempotency and sensitivity. Each recipient makes its own access and disclosure decision. Distinguish validation rejection, uncommitted submission, pending approval, accepted order, cancelled commitment, external timeout and **unknown commitment**. Neither HTTP status, log receipt, Audit receipt nor report count can prove acceptance. Reporting refresh/Logging outage does not block normal ordering; critical Audit capture policy may gate a defined high-risk operation.

## Security, operational policy and provider neutrality

- **Security:** OWASP ASVS 5 L2 minimum, with relevant L3 assurance for sensitive/financial/privileged transactions; strong server-side resource- and line-level authorisation, tenant and per-seller isolation, verified delegated authority, anti-enumeration, fraud/abuse safeguards, safe guest tokens and heightened approval where risk warrants. UI visibility never substitutes for permission.
- **Privacy and legal:** Minimise party/payment/contact replication and diagnostics; qualified purpose, consent, information notices, effective jurisdiction, retention/erasure exceptions, legal holds, redaction, export and disclosure. Preserve the accepted-time record without maintaining an uncontrolled duplicate contacts directory. Legal Compliance determines applicable protections and rights.
- **Configuration and Clock:** Organisation/seller policies may select numbering, supported order types, quotes, approval thresholds, cancellation/return windows, service/fulfilment, channel and provider rules subject to non-optional legal/security floors. Retain effective policy version, instants, time-zone/offset context and locale.
- **Native-first and external primary:** Order has its own bounded durable store and outbox. A configured ERP/commerce provider is a **replaceable adapter** with explicit exclusive authority per declared scope, identity/credentials through host/Integrations, read/write routing, source revision, importer provenance, reconciliation, duplicate handling, sync lag, manual correction, export, cutover/withdrawal and recovery. Local state is clearly labelled a projection when an approved provider is primary; never two silently authoritative ledgers.
- **Reliability:** Atomic source/outbox commit, optimistic version checks, idempotent requests, replay-tolerant delivery, observable pending/unknown outcomes and explicit compensation. Provider failure cannot silently become accepted, fulfilled or cancelled business state. Optional external services do not disable native order processing.

## Standards and UK/international obligations

**These are reference standards, not blanket legal mandates or certification claims.** Pin exact applicable versions and trading-network profiles at integration time. Governing accepted ADR/WCAG/OWASP requirements prevail.

| Body / standard | Agreed Order use and authority limit |
|---|---|
| [OASIS UBL 2.4](https://docs.oasis-open.org/ubl/UBL-2.4.html) | Preferred *semantic reference* for external Order, response, change and cancellation messages, without forcing UBL XML into the native contract |
| [OpenPeppol BIS Ordering](https://docs.peppol.eu/poacc/upgrade-3/profiles/28-ordering/) and [GS1 EANCOM/XML](https://ref.gs1.org/standards/) / UN/EDIFACT | **Conditional** partner-specific procurement/EDI profiles handled by documented Integrations adapters; validate actual published and stable profile, codes and signatures |
| [CEN EN 16931](https://single-market-economy.ec.europa.eu/single-market/public-procurement/digital-procurement/einvoicing_en) | Adjacent structured invoice semantics: **Invoice** owns compliant issued documents; Order supplies order references and historic terms |
| ISO 4217; UN/CEFACT Recommendation 20; ISO 3166-1; ISO 8601 / IETF RFC 3339 and RFC 9557; IETF BCP 47 | Interoperable currency, units, country, temporal and language representations; qualified Product/Pricing/Clock/Parties definitions remain authoritative |
| [ISO 15489-1](https://www.iso.org/standard/62542.html) | Evidential records, traceability, retrieval, version history, retention and controlled disposal; no universal retention duration implied |
| [W3C WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/); [OWASP ASVS 5](https://asvs.owasp.org/); ISO/IEC 27001/27002 | Accessible optional GUI, security verification and organisational security controls; no claim of ISO certification |
| UK Consumer Rights Act 2015; Consumer Contracts Regulations 2013; applicable Electronic Commerce Regulations 2002; UK GDPR/Data Protection Act 2018 and ICO guidance | **Jurisdiction- and transaction-dependent laws, not technical standards**. Qualified pre-contract information, payment acknowledgement, correction/confirmation, cancellation remedies, retention/privacy constraints. The legal distinction between *order receipt* and *seller acceptance* must be clear |

For other countries, consumer, procurement, invoicing, tax, data and signature requirements require independent Legal Compliance evaluation. Order never interprets all jurisdictions itself.

## Fully source-available permissive library shortlist

**Approved conceptual candidates, not mandated or tested dependencies.** Prefer a small replaceable TypeScript implementation with publicly accessible full released core source, MIT or Apache-2.0 licence, commercially usable without an enterprise-only core or paid SaaS. Before selecting a version: inspect current **tagged release**, licence and third-party notices, transitive licences, advisories, maintenance, Node/TypeScript/PostgreSQL compatibility and exit path. Do not assume every commercial extension shares the core licence.

| Need | Option / public source | Disposition |
|---|---|---|
| PostgreSQL SQL and transactions | [Kysely](https://github.com/kysely-org/kysely) (MIT); [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) (Apache-2.0) | **Prefer Kysely**, evaluate Drizzle as an **alternative**; not both. Only Order's private persistence adapter uses them |
| PostgreSQL driver | [node-postgres (`pg`)](https://github.com/brianc/node-postgres) (MIT) | Only if the host's persistence port does not already provide it |
| Domain validation | [Zod](https://github.com/colinhacks/zod) (MIT); [Ajv](https://github.com/ajv-validator/ajv) (MIT) | Prefer Zod; add Ajv only for externally published JSON Schema interoperability |
| Decimal precision | [decimal.js](https://github.com/MikeMcl/decimal.js) (MIT), alternative [big.js](https://github.com/MikeMcl/big.js) (MIT) | Prefer decimal.js, not both; actual legal/tax rounding policy remains Pricing-owned |
| Complex lifecycle modelling | [XState](https://github.com/statelyai/xstate) (MIT) | Optional stable release, only if hand-written guarded transitions become unwieldy; no hosted editor or second workflow authority |
| External XML exchange | [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) (MIT); optional [xmlbuilder2](https://github.com/oozcitak/xmlbuilder2) (MIT) | Adapter-only; parser/generator is **not** a UBL/Peppol validator. Check update/security posture and protect against hostile/oversized input |
| Testing | [Vitest](https://github.com/vitest-dev/vitest), [fast-check](https://github.com/dubzzz/fast-check) (both MIT) | CI/user-run contract, model, property-based and security tests; none executed here |
| Durable cross-owner orchestration | [Temporal TypeScript SDK](https://github.com/temporalio/sdk-typescript) (MIT) | Only through existing Temporal gateway/Workflow/Scheduler when needed; no separate Order-owned engine |

Do **not** add Redis, Elasticsearch, Neo4j, paid commerce engines or restricted community editions as essential Order infrastructure. Existing PostgreSQL and source-owned outbox are sufficient at conceptual level; any search, queue or scheduling integration retains its own capability boundary.

## Optional GUI and representative application host

**Approved:** Headless Order core is mandatory; its first-party **management presentation is optional and separable**, not a competing application shell. An external consumer may use Order via its public interfaces alone.

**Verified reference:** `nuxt-layers-test/application-test-template/master` has separate `/` home and `/admin` test dashboard, a responsive collapsible **Capabilities** sidebar containing **Theme Manager → `/theme-manager`**, host-owned Appearance/header, an admin capability tile and mobile overlay. **A derived test application**, not the generic template, adds an accessible **Orders** sidebar entry and optional `/admin` card. This points to an authorised, capability-owned **Orders dashboard** inside the shared shell. Theme Manager supplies semantic tokens; host supplies brand, authentication/authorisation, navigation, route placement and active capabilities. The existing Theme Manager `test` mode is **unauthenticated local-only** and is not production IAM or Order test evidence.

| Screen (illustrative remappable route) | Audience / public contract purpose |
|---|---|
| **Dashboard** `/orders` | Authorised seller, sales/procurement and operator work queues: approvals, unfulfilled/exception orders, recent change, freshness and unknowns |
| **Sales and purchase orders** `/orders/list` | Paged scoped lists, filters, status, seller/tenant isolation, permitted exports and shared-checkout correlation with **separate seller orders** |
| **Order detail/history** `/orders/:id` | Accepted-time terms, revisions, per-line obligations, qualified external Inventory/Logistics/Billing/Invoice/Payment references, permitted Audit timeline and source attribution |
| **Create/review/submit** `/orders/new` | Qualified parties, Product/Pricing evidence and policies; draft, validation, accessible confirmation, clear submitted versus accepted result |
| **Approval queue** `/orders/approvals` | Accept/reject/return for correction with server-authorised actor, current expected revision and adequate assurance |
| **Change, cancel, return, dispute** contextual forms | Explain downstream effects, partial performance, legal policy, version conflicts and pending reconciliation; preserve accepted originals |
| **Fulfilment and exceptions** `/orders/exceptions` | Attribute shortages, delivery/service delays, unknown external providers and approved corrective actions to their source owners |
| **Operator settings** `/orders/settings` | Scoped approval thresholds, policies, provider/queue/reconciliation health, legal retention and access rules; no exposed secrets |
| **Guest order status** host-selected limited route | Expiring narrow access, minimal confirmation/tracking and anti-enumeration; never unlock account or other sellers' orders |
| **Optional reports** via Reporting | Link to independently authorised order analytics; basic Order dashboard works without Reporting |

**UI rules:** Theme Manager semantic tokens and host Appearance controls, responsive mobile/desktop, WCAG 2.2 AA, keyboard navigation, contrast/focus, accessible labels/errors, localisation/Clock/accepted-currency preservation, non-colour-only statuses and reduced-motion support. Show *empty*, *not configured*, *unauthorised*, *loading*, *pending*, *partially completed*, *stale*, *external unavailable* and *unknown* separately. Server-side policy always governs; a hidden button is no permission guarantee. Optional Order presentation offers documented public routes/components only, without host-written private domain logic. Stay within accepted ADR-0012 host one-operation/50-line capability composition constraints.

**Derived test-host acceptance:** Sidebar → dashboard and deep-link access; homepage versus admin shell; mobile collapse/overlay; Theme Manager Appearance; WCAG keyboard flows; sales/purchase guest and seller isolation; qualified quote expiry; submitted/accepted/pending distinction; amend/cancel/return history; expected-version conflict; provider timeout and audit-critical-capture policy; Reporting/Logging absence; and **headless operation when GUI disabled**. These are acceptance *requirements*, not tests claimed as run.

## Conceptual acceptance matrix

| Situation | Required observable behaviour |
|---|---|
| Authorised direct sale with verified parties and valid quote | Exactly one accepted source revision and committed outbox event; money/stock remain independently unknown |
| Supplier purchase with approval policy | Pending until authorised decision; expired/stale quote or unauthorised actor cannot accept |
| Pure service with no stock layer | Valid service obligations without invented stock reservations |
| Multiple sellers, one checkout | Separate seller-order acceptance, visibility, changes, invoicing/returns and possibly partial aggregate outcome |
| Duplicate idempotency key; changed payload; concurrent amendment | Identical retry returns original result; changed payload or stale revision conflicts |
| Inventory shortage / delivery exception / remote provider timeout | Source-attributed shortage/pending/unknown, never false confirmation; reconcile/compensate explicitly |
| Invoice issued, payment settled, service performed | Show attributed evidence but never infer all other states or automatic commercial closure |
| Partial return/cancellation | Preserve historic accepted lines, remaining obligations and linked cross-owner corrections |
| Audit down on critical operation; Logging/Reporting down | Apply configured high-risk Audit gate; ordinary diagnostics/reports do not alter committed business truth |
| Replayed/late Order event; cross-seller report query | Idempotent projection/reconciliation, current resource-level authorisation and explicit incompleteness |
| Retention hold or data subject request | Minimise/redact where lawful without destroying held commercial acceptance evidence |
| Optional adapter removed or GUI disabled | Native qualified Order services remain available; unknown external writes and unavailable UI are not silently successful |

## Recorded decisions, unresolved allocation and completion boundary

**ORD-01–ORD-11: owner-approved** (22 November 2026), now expressed directly in the authority, lifecycle, public contracts and safeguards above:

| IDs | Approved principle |
|---|---|
| ORD-01–02 | Order alone owns accepted sales/purchase commitments, immutable per-line accepted-time snapshots, revisioned changes and closure |
| ORD-03–04 | Native-first/guest support; declared provider primary and reconciliation; no inference of payment, stock, delivery or entitlements |
| ORD-05–06 | Source-owned commands/queries/events, outbox/idempotency/uncertainty, tenant/seller-specific verified access and narrow guest use |
| ORD-07–08 | Optional accessible host-integrated GUI, effective policy, jurisdiction, time, retention and provider-neutral safeguards |
| ORD-09 | Tenant-scoped Business Contacts/Parties responsibility, separate from Identity; no forced registration or historical reassignment |
| ORD-10 | One checkout correlation, **separate seller-accepted orders** and independent seller authority |
| ORD-11 | Bounded purchase/sale orders versus distinct long-lived agreement and qualified performance owners |

**Independent allocation, not a reopened Order choice:** Which existing or separate capability formally hosts Business Contacts/Parties; which owner holds long-lived agreements; exact non-Order collaborator root contracts and package naming. These must be reconciled during those reviews. The blueprint catalogue/register remain **candidate** inventories until separately promoted.

**Implementation and validation still required:** Publish and independently verify `nuxt-layers/order/CONTRACT.md` with exact callable schemas, exported symbols, permissions, error code catalogue, lifecycle versions, routes/absence/host provider requirements, storage register and minimal host acceptance. Verify applicable national/international legal interpretation, source libraries/versions, provider mappings, high-volume concurrency, outbox/audit reliability, security/accessibility and CI. No local tests or builds were performed, no implementation repositories modified, and no operational/legal certification asserted.

**Independent architectural challenge:** No dual-ledger/order authority, hidden private-table dependency, inferred success from receipt/transport, cross-seller disclosure, non-deterministic financial rounding, unverifiable critical evidence, compulsory optional providers or cyclic Nuxt composition. Reconcile any newer **merged** neighbour decisions before merging this review; open Product/Pricing/Payment Gateway and other concurrent PRs are not `master` authority even when owner-approved conceptually.

**Review conclusion:** The **conceptual Order design is complete and owner-approved** to the extent of its defined boundary, contract and safeguards; the **implementation/publication/operational acceptance and protected Git merge are not complete**. The same draft PR remains open. Before any separately authorised squash merge, repeat current-governing/current-blueprint, reciprocal architectural, changed-file, conflict, branch-protection and CI checks.

## Payment Gateway reciprocal boundary — approved conceptual integration (22 November 2026)

**Status:** Payment Gateway boundary **owner-approved conceptually (PGW-01–PGW-12, 22 November 2026)** in [draft PR #116](https://github.com/nuxt-layers/architecture-blueprint-review/pull/116), not a verified implementation contract or an override of this capability's previously approved authority. [Payment Gateway](../../services/payment-gateway/services-record.md) accepts only a current, separately authorised and source-revision-bound payment/refund intent, with tenant, merchant/legal-payee, amount, currency and idempotency reference. It returns verified provider authorisation/capture/refund/reversal/dispute evidence, explicit pending/unknown outcomes and stable operation references; redirects and duplicate webhooks do not prove collection. **Order retains customer commitment, acceptance and fulfilment decisions; checkout redirect or authorisation hold alone cannot prove capture, and uncertain/reversed funds must be assessed under Order policy.** Consumers handle asynchronous, replayed and reversed provider events using the Gateway's current versioned public status, without package-private coupling. This boundary is approved on the Gateway side and does not supersede the neighbouring capability's own authoritative contract.

## Product approved conceptual interface — 22 November 2026

**Product-side interface owner-approved (22 November 2026; Product draft PR #122); Order's conceptual review has merged (#113); a published implementation remains unverified:** Product resolves approved product/variant/service and effective eBOM/bundle revision and permissible units. Order owns accepted line/obligation snapshots and must pin the selected Product revision; later catalogue edits do not silently change an accepted order. Product does not warrant stock, price or fulfilment. See [Product's proposed public contract](../product/capability-record.md).

## Reciprocal conceptual interface — Pricing (22 November 2026, draft PR #119)

**Status: Pricing PRI-01–PRI-07 and five supplementary pricing solutions owner-approved conceptually on 22 November 2026; not implemented, and this does not approve the neighbouring capability review.** [Pricing](../pricing/capability-record.md) is the authority for versioned commercial tariffs, effective price lists, discounts, coupon rules, currency/rounding policy and attributable quote calculations; it does not own order acceptance, commitment, line fulfilment or sale settlement. The partner supplies its own scoped, effective, revisioned source facts where relevant; Pricing returns qualified price/quote, source revision, calculation evidence, currency, tax/FX certainty and expiry. Missing, stale, unauthorised or contradictory mandatory input prevents a definitive claim; a quote, order, assessed charge, payment and posted invoice are distinct facts. Integrate through public acyclic contracts/ports/events, not private schemas or an inferred package import. Preserve existing independently approved partner decisions; proposals in active parallel PRs require reconciliation before merge.


## Reciprocal persistent Shopping Basket boundary — 23 November 2026

**Status:** SB-01–SB-08 **owner-approved conceptually on 23 November 2026**, preserving approved ORD-01–11; runtime contracts/acceptance remain unverified. [Shopping Basket](../shopping-basket/capability-record.md) owns seller-grouped uncommitted line intent, immutable version-pinned prepare-checkout reference, stable basket correlation and per-line mapping; Checkout owns checkout attempt identity and recovery. Order alone authenticates/validates and records a separate commercial commitment **per legal seller**, including qualified Product/quote/terms and accepted amounts, and returns seller-specific accepted/rejected/pending/**unknown** status, authoritative Order ID and revision. Retry of an unknown submission MUST first reconcile against Order's idempotent attempt status; Basket's update cannot accept an Order or erase unresolved intent. Partial checkout does not imply distributed atomic commit. Root contracts must reconcile attempt identity, line attribution, statuses, events, disclosure and duplicate/replay handling. No circular package import; original Order approval remains unchanged.


## Reciprocal conceptual interface — Reviews purchase review code (23 November 2026)

**Status: REV-D01–REV-D08 and REV-R01 owner-approved conceptually on 23 November 2026; not an implemented public API or governing adoption.** [Reviews conceptual contract](../reviews/capability-record.md) permits an authoritative Order/Booking/fulfilled-service owner to offer a unique, high-entropy, limited-scope review invitation/claim code for an eligible purchase/experience; a host may show that code or QR/deep link on an invoice/receipt. The transaction owner retains eligibility, fulfilment, cancellation/reversal and provenance authority. Reviews owns redemption, replay/deduplication, submission and source-backed verification assessment; **code possession is not proof of completed purchase/service**. Do not expose order/customer identifiers through the token or public review. Use public versioned ports/receipts with pending/unknown states, rather than private persistence or circular package imports. Invoice only displays an authorised source-provided code; it does not issue review entitlement or attest fulfilment.

## Reciprocal Shop checkout composition — 23 November 2026

**Status: Owner-approved Shop-side integration in [draft PR #134](https://github.com/nuxt-layers/architecture-blueprint-review/pull/134), preserving approved ORD-01–11.** [Shop](../../compositions/shop/compositions-record.md) presents Shopping Basket-owned persistent intent or direct purchase, delegates checkout confirmation and coordination to Checkout, and presents accepted, declined, partial or unknown per-seller outcomes from **Order's** authoritative public commands/queries. Shop's submission receipt, basket total or Payment Gateway status never substitutes for seller-specific Order acceptance. A multi-seller checkout correlates independent seller-scoped Orders, with source-qualified IDs, revisions and idempotency/recovery. This is a conceptual consumer relationship, not an Order dependency on Shop or a published Shop API.


## Warehouse reciprocal interface — 23 November 2026 (draft PR #149)

**Status: proposed Warehouse-side conceptual contract; not independently approved or implemented.** [Warehouse](../warehouse/capability-record.md) owns physical receiving, inspection/count evidence, bin/staging work, put-away, picking, packing, occupancy and physical custody acknowledgements. Order owns commercial obligations and acceptance/cancellation; Warehouse consumes versioned fulfilment demand and supplies partial/physical readiness evidence, never Order finality. Consumers must use versioned authorised public contracts, distinguish observed/queued/physically completed from independently confirmed source-owner outcomes, and reconcile duplicate/unknown provider results. This note **does not approve or complete** the neighbouring capability's independent review; see Warehouse draft PR #149.

## Checkout reciprocal conceptual interface — 24 November 2026

**Status:** Checkout-side conceptual interface owner-approved (24 November 2026) in [PR #151](https://github.com/nuxt-layers/architecture-blueprint-review/pull/151); existing approved decisions remain authoritative. See [Checkout conceptual contract](../checkout/capability-record.md). Checkout supplies confirmed proposal, seller scope, source versions, correlation and idempotency to Order submission, and receives qualified submitted/accepted/rejected/unknown outcome and separate collection authority where applicable. Order retains seller acceptance, immutable terms, amendments and cancellation; direct ordering remains independent. Checkout cannot authorise itself to collect. Public host-bound ports only; no private schema or circular package imports. Ordinary sales use a pending Order as the default source; customer confirmation is not seller acceptance or collection authority. Checkout completion may precede capture under explicitly qualified credit or dispatch-capture policy.

## FAC-D01/D05 — Approved party and commercial commitment allocation

[Party](../party/capability-record.md) supplies qualified buyer/seller/supplier/representative references, not role authority or accepted terms. Order owns versioned purchase requests that mature into sales/purchase commitments, approved source-specific terms, amendments, cancellation, fulfilment and return obligations. Under FAC-D06 Order owns purchase/sale framework terms; other general agreements remain qualified externally authoritative references until independent native ownership is justified. Subscription, Employment and Membership retain their specialist agreement lifecycles. No generic procurement master.


## FAC-D06 — approved purchase and sale framework terms

Order owns framework identity, qualified Party buyer/supplier references, representation and assent evidence, immutable accepted term revisions, price/quantity references, currency, call-off limits, effective dates, amendment, expiry/withdrawal and linked order commitments. Register/approve/amend/withdraw with scope, authority, expected revision and idempotency; return qualified revision/status and remaining permitted call-off capacity. Reserve/release call-off capacity atomically against an authorised order request, reconcile uncertain outcomes before retry, never imply financial budget reservation or fulfilment. Pricing supplies qualified price calculations; Accounting owns financial allocations; Publisher owns document versions; Workflow supplies approval evidence, not assent. Historic orders retain accepted term snapshots. Other general leases/licences/financing/partnership agreements remain qualified references to designated external authorities, with source revision, effective scope, provenance and permitted terms. Unsupported native general agreement management fails closed; no independent Contracts or Procurement capability is introduced.
