# Shopping Basket — capability record

**Identity:** `shopping-basket` · **Classification:** Domain capability (conceptual candidate).  
**Decision:** SB-01–SB-08 and the subsequent public-contract, standards, open-source, Error Normalisation/Logging/Audit/Reporting and GUI recommendations **owner-approved on 23 November 2026**. **Conceptual design complete**; implementation, independent acceptance, legal compliance, release and merge **not verified**.  
**Authority:** Accepted [Architecture Rules](../../../RESOURCES.md#ref-6d4a7ae1), [Capability Standard](../../capability-standard.md), ADR-0002, ADR-0008, ADR-0009, ADR-0012 and applicable privacy/policy ADRs. This record is a **planned conceptual contract**, not the published root `CONTRACT.md` of an implementation.  
**Review:** Initial concept merged in PR #140; approved refinements maintained in draft PR #141. Governing baseline `d7f7c2ee051244b8c81325f5ff1267568d99aab1`. Refer to version control for evolution, not separate competing specifications.

## 1. Purpose, ownership and release scope

Shopping Basket owns a customer's **persistent, non-binding intention to purchase**. From the first release it stores guest and authenticated personal baskets across sessions, restarts and, when authorised, devices. Its state includes holder proof/reference, owning tenant/channel and permitted seller scope; line IDs, source-qualified Product/variant/listing/offer references and chosen options/quantities; optional non-binding fulfilment preferences and observed display annotations; revisions, expiry, checkout-attempt/line correlations and recovery status.

Basket owns its business rules, PostgreSQL schema and persistence adapters, basket lifecycle, guest claim/merge, concurrency/idempotency and domain events in its **own transactional outbox**. The host supplies infrastructure and public composition ports; client cookies/localStorage are **never** the authoritative basket store.

**Clear exclusions:** Product owns item definitions and variants; Marketplace seller participation/listing approval; Pricing amounts, offers and valid quotes; Inventory/Booking stock, reservations and capacity; Order accepted seller commitments, changes and returns; Payment Gateway payment; Billing/Invoice/Accounting commercial and financial documents; Identity/Profile personal master records; Privacy/Legal Compliance specialist rules; Shop storefront composition; Reporting derived analysis. A saved item, displayed amount or `prepareCheckout` result is **not** a guaranteed price, stock hold, purchase, payment or seller agreement.

**Modes and deferrals:** Native, provider-neutral persistence is the default; no external basket service is required. Shop, mobile, marketplace and assisted-sales hosts can all consume the **headless public contract** independently of one another. Marketplace is optional for single-seller shops. Personal authenticated cross-device recovery is **in v1**. Collaborative multi-user basket editing and long-lived stock holds are **deferred**, not silently offered. Optional external import/synchronisation through Integrations needs explicit owner-of-record, consent/scope, conflict, provenance and reconciliation policies.

**Approved decision map (23 November 2026):** This is an index to the operative requirements below, not a competing design.

| Decision | Agreed rule |
|---|---|
| **SB-01** | Basket owns persistent, non-binding purchase intent, its schema and durable outbox. |
| **SB-02** | Native guest and account persistence, personal cross-device recovery and verified, explicit guest claim/merge. |
| **SB-03** | Seller-scoped line groups and independently accepted, partial or uncertain seller Orders. |
| **SB-04** | Optimistic revisions, idempotent commands/attempts and source freshness checks. |
| **SB-05** | Product, Marketplace, Pricing, Inventory and Order retain their source authority; no basket price/stock/payment promise. |
| **SB-06** | Tenant/holder privacy, secure guest proof and configurable 30/90-day inactivity defaults, subject to legal constraints. |
| **SB-07** | Defer collaborative editing and long-term stock holds; keep personal cross-device persistence in v1. |
| **SB-08** | Headless public contract with optional accessible screens and host-owned routes. |

## 2. Basket state and business invariants

- **Lifecycle:** active → checkout-in-progress → active/partially converted/converted, or abandoned, expired, closed or deleted as justified. State is seller- and line-aware: never declare an entire multi-seller checkout converted while any included line remains rejected, pending or **unknown**. Preserve unresolved purchase intent and link to source-owned Order results; retention and lawful holds apply to history.
- **Guest/account claim:** guest proof is an unpredictable, revocable credential, not an Identity membership. Claiming requires verified guest possession, independently authenticated account and an affirmative resource-specific access decision. Compare baskets and let the holder **keep the account basket, replace eligible lines or merge eligible lines**; explicit confirmation is required for every quantity/variant conflict. Never silently add quantities, cross tenants/seller permissions or expose another holder's data. Rotate/revoke guest proof upon successful claim.
- **Source freshness:** keep source owner, identifier, revision, observed/effective time and validity with item/listing/quote references. Restore intent even when a source is temporarily unavailable, marking lines changed/unknown/withdrawn. Before binding submission, Checkout refreshes all mandatory Product, seller, Pricing and stock/capacity evidence and obtains buyer reconfirmation where terms changed. Basket may independently refresh indicative facts. Unknown availability never means stock is guaranteed.
- **Concurrency:** every mutation checks expected basket revision and a stable idempotency key. Exact key/payload replay returns the earlier outcome; same key with different payload conflicts. Bound quantities, seller fanout, line count, rate and query size; no silent last-write-wins edits. Checkout owns stable attempt IDs; Basket owns line IDs and links to the Checkout attempt. an **unknown Order outcome is queried/reconciled before any permitted retry**, never submitted again speculatively. No cross-owner atomic transaction or exactly-once messaging claim.
- **Retention:** configurable **30-day guest and 90-day authenticated-personal inactivity defaults**; these are product defaults, **not statutory periods**. Record the exact qualifying activity, source/policy revision and time; bots may not silently renew retention. Legal/privacy constraints, rights, holds, backup disposal and possible shorter tenant rules take precedence. Expiry, deletion or export must produce scoped completed/partial/held/unknown receipts, not assume global erasure.
- **Authority and events:** commit owned state and minimal event in the **same database transaction**. Outbox transport, consumer deduplication, replay, ordering and reconciliation are distinct from source commit and from Order acceptance. The scheduler invokes Basket-owned expiry/reconciliation handlers; neither Scheduler nor Message Queue decides basket state.

## 3. Approved idealised public input and output contract

The following are **logical public operations**, not verified TypeScript exports, HTTP routes or a universal DTO. The eventual root implementation `CONTRACT.md` must publish exact signatures, schemas, permissions, versions, failures and host composition.

| Incoming operation and essential input | Authoritative Basket output |
|---|---|
| **Create or read/restore**: trusted tenant/channel, signed-in subject or proved guest holder, authorised seller scope; bounded cursor/filter if listing | Basket ID, holder kind, status, tenant/channel/seller scope, version, eligible lines, last update, expiry and source freshness, or scoped denial/not-found |
| **Add, edit, remove line/preference**: referenced Product/listing/variant/options, positive bounded quantity, expected revision, idempotency key, holder authority | Saved new revision and line status, or stable invalid/conflict/denied/expired/unknown outcome with safe recovery |
| **Claim or merge**: proven guest credential, authenticated account, access decision and explicit keep/replace/per-conflict choices | Resulting holder, revision, eligible/refused lines, credential revocation and claim result; no cross-scope disclosure |
| **Refresh/validate**: versioned basket plus permitted owner evidence | Per-line current/changed/unavailable/unknown status, source, revision and as-of time; any required buyer confirmation |
| **Prepare basket intent for checkout**: expected basket revision, selected seller groups, qualified source facts and stable correlation (Checkout attempt ID when allocated) | Immutable/version-pinned seller-specific **purchase intent**, per-line mappings, prerequisites and correlation; not accepted Order, firm price or reservation |
| **Record/reconcile basket conversion**: server-verified Order-owned seller result, source ID/revision, attempt and line correlation | Seller-wise accepted/rejected/pending/unknown and reconciled Order links; remaining unconverted intent, replay-safe revision |
| **Abandon, close, expire, export or erase**: holder proof/decision, effective Privacy/Legal policy/hold and expected revision where relevant | Scoped lifecycle status, subject-filtered export or justified deletion/hold/partial result and time |

**Common public conventions:** callers and source owners supply only the needed trusted tenant/subject/assurance, resource and decision, policy/revision, seller/channel, source ID/version, effective and observed times, causation/correlation and stable idempotency key. Reject inconsistent, missing, stale, untrusted or cross-scope authority. Distinguish **requested, accepted, committed, delivered, reconciled, rejected, held and unknown** where meaningful. Stable errors include invalid item/quantity, denied scope, expired/erased, revision or replay conflict, stale/withdrawn source, policy hold, unavailable provider and ambiguous checkout.

**Published reads and events:** owner-scoped basket summary/line status, mutation and claim status, checkout/expiry/export/erasure status, and authorised bounded operational aggregates. The Basket outbox publishes versioned created/line-changed/claimed/converted/abandoned/expired/erased facts with source event ID, tenant scope, basket ID, revision and time. Public events and analytics exclude guest bearer credentials, payment details, personal shopping histories and unnecessary buyer identifiers. Consumers may query/reconcile after duplicate, late or missing messages.

## 4. Required information from, and supplied to, other capabilities

All cooperation is via **public owner contracts or host-composed ports**. Source owners never read Basket's tables or import its private code; no reciprocal package cycle.

| Cooperating capability | Basket needs from it | Basket supplies to it or its consumer |
|---|---|---|
| **Shop / other host** | Authenticated context, tenant/channel, selected items and UI actions | Persisted holder-scoped basket, edit/merge results, source-qualified preview, seller-specific checkout intent and recovery; Shop controls storefront routes |
| **Product** | Item/variant identity, valid options/units, effective revision, retirement/restrictions | Product reference, chosen variant/options and quantity; no duplicated catalogue record |
| **Marketplace** (conditional) | Seller/venue/listing eligibility, publication, buyer visibility and revisions | Seller-qualified selected listing, line reference and checkout correlation; absent in single-seller mode |
| **Pricing** (conditional on a price/checkout) | Currency, exact quoted amount, tax/fees, discounts, validity/expiry and version | Selected seller/item/quantity/offer context, quote reference and refresh request; no Basket-owned price calculation |
| **Inventory / Booking** (conditional) | Source-qualified availability/capacity, and reservation ID/status/expiry **only when source actually reserves** | Intended demand and revalidation request; never fabricated hold |
| **Order** (required only for conversion) | Seller-wise accepted/rejected/pending/unknown status, contractual Order IDs/revisions, source quote/line attribution | Version-pinned seller/line intent and idempotent attempt correlation; no accepted contract declared by Basket |
| **Identity / Authentication / Authorisation** | Trusted holder/subject, guest/session assurance, live resource/action decision and revocation | Scoped resource, action and subject/guest proof requirements; deny if mandatory trust cannot be established |
| **Configuration / Privacy / Legal Compliance / Clock** | Approved limits and effective policy versions, subject rights/holds, legally qualified constraints, consistent time | Applied retention and scope, export/erasure/hold receipts, source-owned timestamps and policy enforcement evidence |
| **Scheduler / Message Queue** | Scheduled execution and transport/delivery results | Basket-owned expiry/reconciliation task handlers and committed outbox messages; no delegated business decisions |
| **Integrations** (optional) | Trusted connector/source receipts, mapping, import/sync conflicts and provenance | Authorised owner-qualified import/export/sync intent and reconciliation outcome |
| **Search, Reporting and other permitted consumers** | Scoped refresh/consumption requests; never publication authority | Permission-filtered basket projections/aggregates and minimal events; no unrestricted shopping histories |

**Availability rule:** ordinary intent may be saved without an optional quote or live stock answer; binding checkout cannot proceed without mandatory validated authorities. Missing IAM/Privacy/Legal decisions on protected operations **fail closed**. Unavailable Logging or Reporting cannot corrupt or undo a committed basket; mandatory risk-tiered Audit obligations remain enforceable.

## 5. Error Normalisation, Logging, Audit and Reporting

| Counterpart public input from Basket | Result Basket can consume | Responsibility and failure boundary |
|---|---|---|
| [Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs): source-owned versioned errors, safe mapping, purpose and trusted correlation | Safe public/technical codes, category, `messageKey`, qualified retry guidance or mapping failure | Pure, stateless transformation. It never changes a business outcome, sends events, retries or stores data. Unknown Order acceptance must not become `retry safely`. |
| [Logging](../../services/logging/services-record.md): minimised technical diagnostics, source/version, severity, latency, validation/storage/outbox failures and opaque correlation | Accepted/rejected/throttled/unavailable/uncertain intake, scoped technical query and sink/backlog health | Diagnostic record is neither Basket commit nor Audit custody. No guest secrets, raw purchases, card data or full identity. Ordinary Logging outage does not reverse basket state. |
| [Audit](../audit/capability-record.md): risk-selected accountable guest claims, privileged disclosure, important denials, retention/erasure/hold/override, sensitive checkout recovery; trusted actor/assurance, tenant, source event/revision, time and safe evidence reference | Evidence custody ID and accepted/pending/rejected/uncertain receipt, integrity/coverage and authorised review results | Audit protects **evidence**, not Basket or Order truth. For mandatory critical capture, meet the specified evidence guarantee or securely hold/refuse the sensitive operation; routine capture may reconcile asynchronously. |
| [Reporting](../reporting/capability-record.md): authorised source-revisioned counts and denominators for created/active/claimed/abandoned/expired baskets and partial/unknown seller conversion, with completeness, currency/seller distinctions and as-of time | Permission-filtered reports, trend/visualisation, refresh/partial/unknown and export status | Reporting owns derived analysis, never Basket or Order state. Stale/unavailable Reporting does not block basket writes and cannot authorise disclosure. |

A Basket commit, normalised error, Logging receipt, Message Queue delivery, Audit custody and Reporting refresh are **different outcomes**. No other capability can infer an accepted sale from basket conversion.

## 6. Security, privacy and operational requirements

**Threats and controls:** stolen/guessed guest proof, account takeover, CSRF, replay, item/quantity tampering, cross-tenant or cross-seller disclosure, support-agent curiosity, seller enumeration, malicious automation and ambiguous external outcomes. Apply OWASP ASVS 5 Level 2 baseline (Level 3 for assessed critical operations), strong server-side permissions on **every** read/write/export, least privilege, assurance and step-up as warranted, trusted context rather than client tenant IDs, rate/size limits, safe bounded errors, secure transport/storage, revision/idempotency guards, and privacy-minimised diagnostics/events. Never store card numbers/tokens or full Profile records.

**Guest storage:** server-owned state, high-entropy revocable bearer proof, server-side hashing where feasible, securely scoped `Secure`, `HttpOnly`, suitable `SameSite` cookies, CSRF protection and rotation/revocation; no token in URLs, referrers, logs or analytics. The 30-day *basket inactivity* policy is **not** an instruction to keep one credential unrotated for 30 days. Implement a root `STORAGE-REGISTER.md` for database state, cookies, browser caches, backups and optional providers, documenting fields, purpose, access, lifecycle and consent classification. Technical necessity does not by itself prove a lawful cookie exemption.

**Rights and recoverability:** data minimisation, holder-bound export/erasure, source-policy approval, legitimate legal holds, expiry policy revisions, delayed backup disposal and restore controls against resurrected access. Record partial/held/unknown results honestly. Ensure local commit/outbox consistency; recovery from provider timeouts, duplicate callbacks, delayed expiry tasks, cache invalidation and out-of-order events; monitoring must distinguish degraded source coverage from success.

**Configuration:** host/Configuration supplies tenant/channel settings and permitted limits, retention, presentation and optional providers, subject to non-weakenable security/legal floors. Clock governs reliable effective/observed time semantics; Pricing owns amounts/currency interpretation; Localisation/Theme Manager govern presentation. Standalone native mode needs no SaaS account or additional commerce server.

## 7. Established standards and applicable law

These guide **conceptual design** and later independent assessment; citing them is **not certification or automatic legal applicability**.

| Source | Shopping Basket design relevance |
|---|---|
| [W3C WCAG 2.2](../../../RESOURCES.md#ref-0d1f555e) AA and conditionally [EN 301 549](../../../RESOURCES.md#ref-19a33201) | Accessible basket edit, guest merge, recovery, errors, focus and responsive operator/customer pages; confirm deployment-specific law and edition |
| [OWASP ASVS 5.0](../../../RESOURCES.md#ref-a1c367d2) L2 baseline/L3 risk-based; [ISO/IEC 27001](../../../RESOURCES.md#ref-42fa42bb) and [ISO/IEC 27701](../../../RESOURCES.md#ref-b948c1e2) | Security and privacy management guidance, tenant isolation, proof/cookie controls, minimisation and accountable operations |
| [ISO 8601](../../../RESOURCES.md#ref-8bda6c42) and [ISO 4217](../../../RESOURCES.md#ref-262af923) | Source-qualified expiry/instant and currency identifiers; defer actual semantics to Clock/Pricing |
| [IETF RFC 9110](../../../RESOURCES.md#ref-5a7fc9e7) and [RFC 9457](../../../RESOURCES.md#ref-7754416d) | HTTP request semantics and safe problem details **if** an HTTP adapter is published |
| [GS1](../../../RESOURCES.md#ref-1bbbdbc6) / GTIN / Digital Link | Conditional Product/Marketplace-controlled merchandise identifiers; Basket preserves references, not authoritative identifiers |
| [PCI DSS](../../../RESOURCES.md#ref-3cb45b85) and [W3C WebAuthn](../../../RESOURCES.md#ref-389dc62a) | Conditional payment-card boundary and phishing-resistant Authentication integration; Basket owns neither card handling nor credentials |
| [UK GDPR / Data Protection Act 2018](../../../RESOURCES.md#ref-f4808d92) and [PECR/ICO storage guidance](../../../RESOURCES.md#ref-9cfff74f) | Lawful purposes, rights, basket history, justified retention, guest cookies and necessary/consent-dependent technologies; **30/90 days are not legal requirements** |
| [Consumer Contracts Regulations 2013](../../../RESOURCES.md#ref-5ffaf50f), [Consumer Rights Act 2015](../../../RESOURCES.md#ref-2e48fac8), [DMCC Act 2024/CMA](../../../RESOURCES.md#ref-f4839874) | Correct pre-contract disclosures, item/charge changes, price clarity and non-misleading checkout; Shop presents, Pricing calculates, Order accepts and Legal Compliance qualifies duties |
| [Equality Act 2010](../../../RESOURCES.md#ref-517049ab) | Accessibility and applicable reasonable-adjustment duties alongside platform WCAG baseline |

Applicable EU/other national consumer, privacy, accessibility and trade rules depend on selling jurisdiction, customer, activity and effective date. The host declares market context; Legal Compliance supplies qualified rules, not a hard-coded universal basket statute.

## 8. Complete-source, commercially permissive development choices

**Approved selection policy:** required functionality must have its **complete publicly available source** under a free commercially permissive licence (MIT, Apache-2.0, BSD/ISC or PostgreSQL Licence). No source-available restrictions, open-core essential paid features, delayed community releases or mandatory proprietary service. Verify **exact tags, published artefacts, transitive licences/SBOM, maintenance, advisories, compatibility and attribution before pinning**. This is a conceptual shortlist, not an installed dependency or runtime endorsement.

| Candidate | Licence | Decision |
|---|---|---|
| [PostgreSQL](../../../RESOURCES.md#ref-fa79609e) + [node-postgres / `pg`](../../../RESOURCES.md#ref-be910869) | PostgreSQL Licence + MIT | **Preferred core:** reuse existing infrastructure/ADR-0012 `pg` pool for schema, atomic revisions, retention and outbox |
| [Zod](../../../RESOURCES.md#ref-1e3efac4) | MIT | **Preferred** runtime validation of public commands, configuration and sources |
| [Kysely](../../../RESOURCES.md#ref-af839a5b) | MIT | **Optional**, only if typed SQL materially improves maintainability over parameterised `pg` |
| [Vitest](../../../RESOURCES.md#ref-c28ef17c) / [Playwright](../../../RESOURCES.md#ref-12180955) | MIT / Apache-2.0 | **Reuse** platform unit/contract and browser acceptance tooling; verify browser binary redistribution terms |
| [fast-check](../../../RESOURCES.md#ref-ca191d3a) | MIT | **Optional recommended dev tool** for property-based revisions, merges, replay and seller split |
| [OpenTelemetry JS](../../../RESOURCES.md#ref-8e380f73) / [H3](../../../RESOURCES.md#ref-21adf099) | Apache-2.0 / MIT | **Conditional** through shared Observability or existing Nuxt/Nitro adapter; no duplicate monitoring or HTTP framework |

Avoid Redis, Elasticsearch, Neo4j, full external commerce engines and additional basket database, queue, search, monetary-calculation, date or workflow service solely for Basket. Reuse the platform's existing IAM, Clock, Scheduler, Message Queue, Integrations, UI, Localisation and Theme Manager public surfaces. No fixed versions are selected here.

## 9. Presentation and navigation

**Headless first, optional reusable screens.** The host owns route paths, branding, permissions, menu entries and the public storefront; Basket screens/components use **only public Basket/owner contracts**. Verified reference: [`nuxt-layers-test/application-test-template`](../../../RESOURCES.md#ref-f1f7cc47) has an `/` homepage, `/admin` test dashboard/card, collapsible mobile **Capabilities** sidebar with **Theme Manager → `/theme-manager`**, appearance controls and an intentionally unauthenticated `Not signed in` placeholder. Its test-mode Theme Manager endpoints **must never be treated as production access control**.

**Recommended acceptance host navigation:** **Capabilities → Shopping Basket** and an `/admin` launch card to the optional admin/test dashboard; example `/shopping-basket` or `/admin/shopping-basket`. Shop instead displays a separate customer basket/cart link, example `/shop/basket`. **These are illustrative, host-configurable routes, not published or mandatory endpoints.** Hiding a menu never substitutes for server-side access control. Optional `presentation: false` disables contributed screens while retaining the full headless contract.

| Screen | Content and access |
|---|---|
| **Capability dashboard** | Protected, privacy-safe counts of active/abandoned/expired baskets, partial/unknown checkouts and expiry/reconciliation/outbox health; source freshness and exception links |
| **Basket management** | Authorised limited-scope searches, status/revision/expiry and minimal holder metadata; **no default browsing of customers' product selections** |
| **Checkout reconciliation** | Authorised per-seller attempt status, Order refs and source refresh/lookup; unknown status must not show a blind **retry purchase** action |
| **Retention and settings** | Effective 30/90-day policies, limits, scheduled expiry, holds and policy revision; privileged changes require qualified approval |
| **Customer basket** | Saved/empty items, seller groups, options and quantities, source freshness, indicative versus firm quoted amounts, revision/save and checkout preparation |
| **Guest claim/merge** | Verified guest/account comparison; keep/replace/eligible merge, per-conflict choices and accessible confirmation/cancellation |
| **Customer recovery and privacy** | Changed/withdrawn/repriced lines, revision conflicts, partial/unknown seller results, expiry, export/erase and safe restoration |

Use Theme Manager semantic tokens, WCAG 2.2 AA keyboard/focus/screen-reader status and error summaries, mobile/zoom/reduced motion, locale-aware numbers/dates, sensible loading/empty/saving/denied/stale/offline/unknown states and protection against losing unsaved edits. Never label an Order accepted without its owner's confirmation. Avoid leaking data via SSR prefetch or caches. A Nuxt adapter must demonstrate **one-call composition and at most 50 capability-specific host integration lines** under ADR-0012; no consumer-written Basket store or relay. The future root `CONTRACT.md` lists optional screens, message keys, configuration and disable behaviour.

## 10. Conceptual acceptance criteria and delivery boundary

| Acceptance case | Required independent evidence and result |
|---|---|
| Guest and authenticated persistence | Server restart/session recovery; permitted two-device signed-in read; revoked/incorrect guest proof or tenant denied without enumeration |
| Guest claim/merge | Verify two forms of authority, show explicit conflicting options/quantities, revoke guest proof and prevent unintended scope changes |
| Concurrent edit/replay | Two-device revision conflict without loss; identical key/payload returns prior outcome, inconsistent replay is rejected |
| Source validity and commerce authority | Withdrawn Product/listing, expired Pricing, unknown stock retained as flagged intent but cannot form unsupported checkout; changed terms reconfirmed |
| Seller-split checkout and provider uncertainty | Separate seller Order outcomes; partial/unknown retained, repeated callback deduped, authoritative lookup before retries |
| Privacy, retention and support access | Configurable 30/90 inactivity handling, legal holds, export/erasure and backup restore; no cross-tenant or unauthorised support disclosure |
| Outbox/operations and external sync | One committed Basket mutation, resumable/replayed events, provider unknown/reconciliation and truthful sink/coverage metrics |
| Error/diagnostic/evidence/reporting boundaries | Safe normalisation, non-blocking routine Logging/Reporting failures, risk-critical Audit capture hold/deny, authorised aggregates |
| Presentation and independent consumption | Headless-only works; optional Theme Manager-styled sidebar/dashboard and Shop route; WCAG 2.2 AA, mobile and keyboard/screen-reader tests; permission failure even with visible menu |
| Contract and composition | Root `CONTRACT.md` alone enables install/configuration/typed use, security and absence handling; CI measures Nuxt <=50-line host budget and schema/compatibility acceptance |

**Required implementation handover:** the independently published root `CONTRACT.md` must follow ADR-0012's sections **Install → Settings → Host passes → Client and server functions → Permissions → Screens → Headless surface → You will hit this**. It must specify exact imports/signatures, permissions, provider-neutral `pg` pool, structural `resolveCaller(event)`, `decide(caller, action, resource)`, `now()`, `tasks`, `relay()` where applicable, real cookie/storage and expiry rules, stable errors/messages, interface versions, migration, feature absence, tests and production restrictions. Maintain a matching `STORAGE-REGISTER.md`. The host must not implement Basket-owned adapters, schemas or business rules. Independent examples and CI/user evidence are required before claiming runtime compatibility or legal/accessibility/security conformance.

**Completion distinction:** **Conceptual architecture is complete and owner-approved.** The current record covers ownership, v1 scope, lifecycle, contract input/output, reciprocal dependencies, security/Privacy/Legal rules, standards, complete-source library policy, GUI and testable acceptance. **Not complete:** implementation, root runtime contract, exact versions and exported APIs, executed tests, integration/accessibility/privacy evidence, release and production operation. Draft PR #141 must be reconciled with the latest blueprint `master`, especially overlapping reciprocal records and the independently approved Shop composition, then rechecked for mergeability/CI under branch protection. **No merge without separate explicit approval.**

## Checkout reciprocal conceptual interface — 24 November 2026

**Status:** Checkout-side conceptual interface owner-approved (24 November 2026) in PR #151; existing approved decisions remain authoritative. See [Checkout conceptual contract](../checkout/capability-record.md). Basket supplies holder-authorised pinned basket revision/line intent to optional Checkout; receives checkout ID and source-verified seller/line conversion references. Basket retains saved intent, checkout-in-progress projection and conversion authority; approved Checkout design owns attempt lifecycle and recovery, not a second basket. Existing SB-01–08 correlation is preserved; basket attempt metadata is a link/projection rather than a duplicate checkout execution record. Public host-bound ports only; no private schema or circular package imports. A pinned basket revision supplies optional intent; a fresh Checkout confirmation is required for material changes. Basket records conversion only from qualified source acceptance and must preserve unrelated concurrent edits.
