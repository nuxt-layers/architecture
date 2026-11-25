# Payment Gateway — Service Record

**Canonical path:** `docs/services/payment-gateway/services-record.md`; public identifier `payment-gateway`.
**Artefact classification:** technical payment execution service (CLS-14, approved 24 November 2026); provider-neutral execution and evidence with optional presentation. PGW-01's Domain classification is superseded only; all financial ownership and execution requirements remain approved.
**Decision status:** **PGW-01–PGW-12 and subsequent contract, standards, library, reciprocal and GUI recommendations approved by the owner, 22 November 2026.** This is a complete **conceptual specification**, not an implemented or publicly published package contract, PCI/regulatory certification or merge authorisation.  
**Authority/baseline:** accepted `architecture-rules/master@d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint `master@361566988ac53c55f6135e8acfa46cd5b013d7a0` at review opening and latest recheck. Draft PR #116.

## 1. Purpose, ownership and first-release scope

**Purpose:** securely initiate, verify, reconcile and reverse **external payment operations** for a verified legal merchant through an eligible provider. Gateway owns the **payment operation and provider-sourced execution evidence**, including uncertainty; it does not become a bank or payment-service provider merely by being installed.

**Owns:** tenant/merchant-scoped `PaymentOperation` and `PaymentAttempt`, immutable requested money terms, original source and stable idempotency identity; provider account/operation binding, challenge/authorisation state, authorised/captured/refunded/reversed balances, dispute observations, verification/reconciliation, technical payment-method token references, capability-specific risk/eligibility checks, historical revisions and a **capability-owned durable outbox**. Provider transaction and settlement evidence must retain its provenance and qualified meaning. It owns the semantics of its payment adapter but not a generic connector service or secret vault.

**Core first release:** one-off payment requests, authorisation, full/partial capture where supported, void, provider-supported cancellation, full/partial refund, verified current/history status, unknown-outcome recovery, reconciliation, merchant/provider eligibility and **read-only provider dispute/chargeback evidence**.

**Conditional/deferred:** recurring mandates/charges require independently evidenced consent, contractual authority and provider eligibility; supported token references do not confer a standing right to charge. Provider-side dispute adjudication/action APIs, marketplace split/payout execution, escrow and custody of funds are **not** part of the first release. Future split/payout features need separately authorised legal/financial ownership, supported rails and a new scope decision.

**Does not own:** [Order](../../capabilities/order/capability-record.md) commitments/fulfilment; [Billing](../../capabilities/billing/capability-record.md) charges/collection policy; [Invoice](../../capabilities/invoice/capability-record.md) fiscal documents/allocations; [Accounting](../../capabilities/accounting/capability-record.md) journals, bank receipt and settlement allocation; [Subscription](../../capabilities/subscription/capability-record.md) entitlement; [Pricing](../../capabilities/pricing/capability-record.md) prices; [Marketplace](../../capabilities/marketplace/capability-record.md) seller/commission rules. IAM decides access; Audit preserves independent accountable evidence; Reporting derives analysis. No payment request, browser redirect, invoice or order by itself proves funds have moved.

### Approved decision index

The principles below are implemented throughout this record; IDs remain stable for cross-capability traceability rather than creating a second version of the rules.

| ID | Approved decision |
|---|---|
| **PGW-01** | Independent, headless-first payment execution service; optional UI (classification superseded by CLS-14) |
| **PGW-02** | Separate collection/capture/refund authority and verified payment proof |
| **PGW-03** | One designated legal merchant/provider per operation; stable identity and safe reconciliation, no silent failover |
| **PGW-04** | Provider-neutral adapters and token references; no card-data vault |
| **PGW-05** | Durable operation/outbox; distinguish provider outcome, settlement and ledger/bank receipt |
| **PGW-06** | Split payouts and escrow require future explicit legal/rail approval, excluded from initial execution |
| **PGW-07** | Optional merchant Payments dashboard and contextual customer checkout |
| **PGW-08** | Core one-off payment/capture/void/refund/reconciliation; observe disputes; conditional recurring mandates |
| **PGW-09** | Independently verified legal merchant/payee; no authority inferred from organisation membership |
| **PGW-10** | Preserve the `payment-gateway` catalogue identifier; former documentation-directory preservation superseded by CLS-14 only |
| **PGW-11** | Scoped provider adapter, hosted tokenisation, secrets isolation and qualified PCI/regulatory assessment |
| **PGW-12** | Durable revision/idempotency/evidence, explicit unknown states and read-back before unsafe retries |

## 2. Financial and provider lifecycle

| Lifecycle | States and hard constraints |
|---|---|
| **Merchant/provider connection** | Unconfigured → requested → independently verified/eligible → active, suspended, expired or revoked. Scope by legal merchant, tenant, account, rail, market/currency and operation. Group membership or administrator status alone does not establish legal merchant authority |
| **Payment** | Requested → validated → submitted → customer action required / authorised / declined / unknown → partially or fully captured, expired or voided. **Request accepted ≠ authorised ≠ captured ≠ provider-reported settled ≠ bank received** |
| **Refund/reversal** | Separately approved full/partial refund → pending → provider-verified refunded, rejected or unknown. Dispute/chargeback and reversal are separate versioned observations; a credit note alone is never a refund command |
| **Recovery** | Provider timeout, conflicting webhook or lost response → **unknown/pending reconciliation** until authenticated provider read-back or verified evidence. Maintain original provider-operation/idempotency identity; do not generate a new charge or silently fail over to a different provider |
| **Provider migration** | Explicitly approve new provider for new operations; old in-flight attempts remain with their original provider and must be reconciled with historical mapping |
| **Money and durability** | Exact decimal/minor-unit amounts, ISO 4217 code/scale and explicit rounding; immutable original amount/currency; enforce rail-specific cumulative capture/refund limits and pending-versus-confirmed amounts. Persist operation and its outbox atomically before announcing a committed state; never promise exactly-once execution across an external payment network |

**Unavailable conditions:** no eligible merchant/provider, trusted caller, suitable legal/payment policy, secure durable store, provider confirmation or authorised capture/refund authority means **no money-moving command**. The headless service may still report unavailable or verified historical state as safely possible. Logging, Reporting, Notifications or GUI availability must never manufacture a successful payment.

## 3. Public input contract — planned, not exported TypeScript APIs

Every protected input carries trusted tenant, merchant/payee and resource context, version/expected revision, operation identity, approved policy and caller assurance as needed. Command names below express **logical surfaces**, not asserted function names or HTTP endpoints.

| Public input | Origin and required information | Validation and failure behaviour |
|---|---|---|
| **Request payment** (`requestPayment`) | Authorised Order/Billing/Invoice/Subscription workflow or host supplies source type/ID/revision, **independent collection authority**, verified legal merchant/payee, approved amount/currency, payer context, method, expiry/capture policy and stable idempotency key | Deny missing, stale or conflicting commercial/merchant approval; same key + changed terms is a conflict; accepted request is not executed payment |
| **Execute or reverse** (`capture`, `void`, `refund`, provider-supported `cancel`) | Authorised operator/domain service supplies payment ID, intended amount, reason, expected version, eligible merchant and independent operation-specific approval | Check resource access, amount/rail rules, step-up/Workflow approval where needed; a credit note or order cancellation does not authorise a refund |
| **Recover or verify** (`retry`, `reconcile`) | Authorised actor or Scheduler requests original operation read-back, using stable provider reference and reason | Safe read-back/recovery first; retries only after provider-specific duplicate-safety proof; missing evidence remains unknown |
| **Provider results and callbacks** | Provider adapter/Integrations supplies verified signatures, remote operation/account/event IDs, observed/effective time, capture/refund/fee/settlement/dispute evidence, read-back and supported capabilities | Treat all external bodies and browser redirects as untrusted until verified; deduplicate/reconcile out-of-order events, never derive proof from checkout success |
| **Merchant configuration and effective policy** | Configuration, authorised legal merchant owner, Privacy and Legal Compliance supply connection approval, rail/currency/region, mandate/consent, legal permissions, retention, policy version and restrictions | Missing or disputed mandatory authority blocks execution; secret values stay in host secret management |
| **Caller, time and infrastructure** | Identity/Authentication/Authorisation or host supplies trusted caller, decision and assurance; Clock supplies effective/expiry times; host supplies durable `pg`-compatible persistence/outbox and optional scheduling/transport ports | Server resolves tenant/merchant and checks all actions; inaccessible durable state fails closed |
| **Conditional marketplace/mandate details** | Marketplace/source owner supplies authorised seller attribution; Subscription supplies valid recurring mandate if enabled | Seller listing alone never confers payee/payout authority; split payout and escrow execution remain deferred |

**Commands** return accepted/rejected/pending/unknown outcomes independently of eventual movement. **Queries** below must enforce scope, as-of time, freshness, pagination and redaction. **Events** come from committed source changes and may be delayed, duplicated or out of order; subscribers recheck authoritative current status.

## 4. Public output contract

| Planned output | Consumers and permitted conclusion |
|---|---|
| **`PaymentRequestResult`** | Initiating domain/checkout: accepted, rejected, unsupported, pending, unknown or customer action required; opaque ID and safe client hand-off/expiry. **Not proof of capture** |
| **`PaymentStatus` / `PaymentHistory`** | Authorised Order, Billing, Invoice, Subscription and operators: verified/unknown provider state, versions, evidence references, separately authorised/captured/refunded/reversed amounts, corrections, source/provider times and freshness |
| **`PaymentMovementEvidence`** | Accounting, Billing, Invoice and Reporting: verified provider movement, fee, reversal and provider-reported settlement references, source merchant/currency/amount and provenance. Does **not** assert invoice allocation, ledger posting or bank receipt |
| **`PaymentMethodReference` / optional `MandateStatus`** | Eligible caller: opaque provider-bound token/status, permitted method, expiry and externally established mandate evidence; never card details or credentials |
| **`ProviderConnectionStatus`** | Authorised merchant admin/host: supported rails/methods/currencies, scoped merchant eligibility, restrictions, provider health and freshness, without credentials |
| **`PaymentException` / `DisputeStatus`** | Operators, Billing, Accounting and permitted audit/reports: mismatch, uncertainty, exception and provider-reported dispute deadlines/status with provenance; no gateway adjudication |
| **Durable `PaymentEvent`** | MQ relay and authorised domain subscribers: versioned `payment.authorised`, `payment.captured`, `payment.refund_confirmed`, `payment.reversed`, `payment.disputed`, `payment.unknown`, `payment.reconciled` and analogous committed changes; event ID, source revision, tenant-safe references, correlation and times |

Gateway output is not a universal entitlement, receipt, invoice or ledger. No consumer may treat an old `captured` event as current after a later reversal.

## 5. Cooperating capability boundaries

These are **public-contract exchanges**, not necessarily mandatory package imports. The originating business capability remains the source of its own decisions.

| Partner | Gateway obtains | Gateway supplies / boundary |
|---|---|---|
| **Order** | Approved commitment/source revision, payer, merchant and separate collection authority | Verified operation/reversal status; Order alone decides fulfilment |
| **Billing** | Finalised charge, permitted collection and refund authority | Captures/declines/refunds/unknown evidence; Billing owns charge/dunning |
| **Invoice** | Issued document and due amount as optional context | Verified movement/reversal references; Invoice owns document and allocations |
| **Accounting** | Authorised reconciliation/financial context when needed | Movement, fee and provider settlement evidence; Accounting owns journals and bank reconciliation |
| **Subscription** | Authorised renewal/mandate when recurring feature exists | Payment outcomes; Subscription owns terms, grace and entitlement |
| **Marketplace / Pricing** | Legally approved merchant/seller attribution; immutable approved quote through originator | Ordinary payment evidence; no gateway-directed payouts or repricing |
| **IAM / Authorisation** | Trusted identity, assurance, delegated service and resource decision | Protected action outcomes and correlation; fail closed if decision is absent |
| **Configuration / Privacy / Legal Compliance** | Scoped provider choices, allowed processing and retention, effective legal restrictions | Connection/processing status and accountable exceptions; policy cannot dilute statutory floors |
| **Integrations / host secrets** | Authenticated provider transport/webhooks and secret injection | Provider-specific adapter requests/results without leaking provider SDK types into shared contract |
| **Clock / Persistence** | Reliable instants and expiring mandates; durable operation/outbox store | Versioned timestamped records; no business truth outside Gateway |
| **Scheduler / Workflow / MQ** | Approved job/approval execution and event transport | Reconciliation jobs, workflow outcomes and gateway-owned durable events; no external transport reowns payment facts |
| **Notifications / UI / Localisation** | Authorised delivery/presentation and message lookup | Minimal customer/operator-safe status and notification context; delivery/wording are not payment proof |

### Error Normalisation, Logging, Audit and Reporting

| Partner | Gateway supplies | Gateway receives | Authority and failure behaviour |
|---|---|---|---|
| [`error-normalisation`](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) **pure library** | Source-owned stable payment/provider error, explicitly known or unknown outcome, approved code catalogue/mapping and redaction policy | Deterministic safe code, category, message key, technical/public projection, optional **advisory** retry classification | Gateway alone determines remote commitment and retry; no library persistence, events, logging or recovery |
| [Logging](../logging/services-record.md) | **Redacted diagnostics**: provider/webhook/reconciliation error codes, safe correlation, time, severity and trusted producer context | Intake accepted/rejected/throttled/unavailable/uncertain, optional receipt, scoped diagnostic read and sink health | Log receipt ≠ payment or Audit success; diagnostic outage does not retroactively fail payment; no payment secrets |
| [Audit](../../capabilities/audit/capability-record.md) | Independent accountable refund/capture/void decisions, denials, merchant changes, disputes and reconciliation evidence, stable source event, actor, time and coverage checkpoints | Evidential accepted/pending/rejected/uncertain receipt, evidence ID, integrity/completeness and authorised review | Audit owns custody/review, Gateway owns payment truth. Where a mandatory evidence control cannot be preserved/recovered safely, high-risk operation must be held |
| [Reporting](../../capabilities/reporting/capability-record.md) | Authorised revisioned status, captured/refunded amounts, currency, dispute/unknown state, as-of time, corrections, completeness and events | Authorised report definitions/results, counts/trends, execution status, lineage, cut-off, freshness, export and invalidation | Reporting derives analysis; Accounting supplies financial-statement truth. Missing or uncertain payments are not confirmed captures. Reporting outage does not block payments |

**Error safety:** stable source-owned errors distinguish validation refusal, denied authority, provider declined, provider unavailable, unknown outcome and reconciliation required. Normalisation may describe a timeout as `uncertain` but cannot order a retry. Error messages and HTTP representations must not leak payer, provider secrets or protected resource existence.

## 6. Security, privacy, standards and regulatory applicability

**Baseline:** accepted governing security/privacy/presentation rules (OWASP ASVS 5 L2; applicable L3 for high-risk payments; WCAG 2.2 AA); server-side tenant/merchant separation, risk-sensitive step-up, replay-safe authenticated webhook verification, safe secret rotation, idempotency, cryptographic/provenance and auditable privileged changes.

**Payment data:** prefer hosted payment entry and provider tokenisation; do not put PAN/CVV, raw payment credentials, secrets, bearer tokens or unnecessary personal information into generic services, URLs, logs, traces, browser storage or exported reports. Record all relevant stores and cookies in future `STORAGE-REGISTER.md`. Apply lawful purpose, minimisation, subject rights, retention, preservation and cross-border controls through Privacy and Legal Compliance.

**Legal role:** validate merchant-of-record, payment-service activity, provider permissions, SCA/PSD2 or applicable successor and scheme rules per jurisdiction. UK Payment Services Regulations/FCA, UK GDPR/ICO, applicable payment-network obligations, and EU/other jurisdiction rules must be assessed independently. The gateway is not by default a PSP, acquirer, payment custodian or authorised money transmitter; conceptual design does not establish PCI, legal or regulatory compliance.

### Applicable national, international and specialist standards

| Standard/source | Design application |
|---|---|
| [PCI DSS v4.0.1](../../../RESOURCES.md#ref-a1ea0e98), [PCI Secure Software](../../../RESOURCES.md#ref-fce3c8df) | Assess cardholder environment/provider responsibilities, security, payment-page integrity; Software Standard only if applicable |
| [EMVCo 3-D Secure](../../../RESOURCES.md#ref-c2950d2a), [Payment Tokenisation](../../../RESOURCES.md#ref-cde18d45) | Provider-mediated authentication, challenge evidence and tokenised references |
| [ISO 4217](../../../RESOURCES.md#ref-e1f7a7d3), [ISO 20022](../../../RESOURCES.md#ref-6150761d), [ISO 8583:2023](../../../RESOURCES.md#ref-eb08ffb2) | Correct currency/scale always; bank and direct card network messages only in applicable provider adapters |
| [UK Payment Services Regulations 2017](../../../RESOURCES.md#ref-23a0a60a), [FCA SCA](../../../RESOURCES.md#ref-26f2dc21) | Assess regulated role, SCA, exemptions and financial permissions for each merchant and rail |
| [PSR / Pay.UK](../../../RESOURCES.md#ref-1aaf2ddd), [UK Open Banking Standard](../../../RESOURCES.md#ref-7eef8d31) | Conditional bank-transfer, reimbursement and approved payment-initiation requirements |
| [ICO privacy by design](../../../RESOURCES.md#ref-4ec87ed3), [ISO/IEC 27001](../../../RESOURCES.md#ref-42fa42bb) | Privacy, governance and proportionate information-security controls; no claim of certification |
| [OWASP ASVS 5](../../../RESOURCES.md#ref-a1c367d2), [OpenID FAPI 2.0](../../../RESOURCES.md#ref-9cedeefb), [IETF RFC 9457](../../../RESOURCES.md#ref-7754416d) | Secure application baseline; optional high-assurance financial OAuth profile; safe HTTP error projection when HTTP is exposed |
| [W3C WCAG 2.2](../../../RESOURCES.md#ref-0d1f555e), [Payment Request](../../../RESOURCES.md#ref-ea124a00), [Payment Handler](../../../RESOURCES.md#ref-790384d0) | Accessible screens; browser payment drafts optional and **not** authoritative payment evidence; BCP 47/CLDR/ECMA-402 for localisation |

**Adoption policy:** mandatory law and provider/network contracts apply by scope; standards and draft W3C browser interfaces do not automatically impose an implementation dependency. Record actual rail, provider, merchant/jurisdiction, applicable version, control owner and qualified validation evidence before live operation.

## 7. Fully open-source, commercially permissive development options

The following are **approved candidate choices**, not installed or version-pinned dependencies. Review current licences, upstream maintenance, source/build parity, transitive licensing, CVEs and Node/TypeScript compatibility before selection. Avoid open-core, delayed community editions, restricted enterprise gates and duplicate platform stacks.

| Candidate (source) | Licence | Intended use |
|---|---|---|
| [decimal.js](../../../RESOURCES.md#ref-992a7688) | MIT | Preferred exact money arithmetic; [big.js](../../../RESOURCES.md#ref-fcbb731f) (MIT) is a mutually exclusive smaller alternative |
| [Zod](../../../RESOURCES.md#ref-1e3efac4) | MIT | Preferred public input/config/provider adapter validation; [Ajv](../../../RESOURCES.md#ref-a164796d) (MIT) only when JSON Schema interoperation genuinely needs it |
| [node-postgres (`pg`)](../../../RESOURCES.md#ref-be910869) | MIT | `pg`-compatible transactional persistence and durable outbox; host provides database connection |
| [jose](../../../RESOURCES.md#ref-1841a1db) | MIT | Conditional JOSE/JWS/JWK verification when required by provider; do not replace provider-specific signature rules |
| [Undici](../../../RESOURCES.md#ref-edd6cbb9) | MIT | Optional provider HTTP client; prefer built-in Node `fetch` if sufficient |
| [Stripe Node](../../../RESOURCES.md#ref-cfa45325), [Adyen Node](../../../RESOURCES.md#ref-11522612), [PayPal TypeScript](../../../RESOURCES.md#ref-8d3327af), [Braintree Node](../../../RESOURCES.md#ref-1cda7aeb) | MIT SDK code | **Conditional individual adapters only**, never shared core model. Processing services and provider-hosted scripts remain proprietary/fee-bearing; a permissive SDK is not a fully open-source payment-processing service |
| [Temporal TypeScript SDK](../../../RESOURCES.md#ref-83603142), [pg-boss](../../../RESOURCES.md#ref-fc345c0f) | MIT | Reuse existing Temporal/Scheduler composition; pg-boss is only an alternative for a documented unmet need, not a second default queue |
| [Pino](../../../RESOURCES.md#ref-5f05d959), [OpenTelemetry JS](../../../RESOURCES.md#ref-8e380f73) | MIT / Apache 2.0 | Use through Logging / Observability public contracts, without payment-sensitive attributes |

Avoid Redis/BullMQ solely for scheduled payment reconciliation, custom card-data vaults, unproven one-stop payment frameworks, and proprietary or open-core server requirements. A hosted provider UI (including MIT wrapper/loader packages) does not meet a requirement for **all** downstream hosted runtime code to be open source; its use requires separate informed PCI/provider decisions. No client library or gateway SDK may make the core depend on a named commercial payment service.

## 8. Optional presentation and representative host

**Headless first:** the core provides all public commands, queries and recovery without routes or UI. A separable Payments GUI owns payment-specific views and forms; the **host** owns branding, authentication, top bar, sidebar and route exposure. Theme Manager owns the visual token vocabulary; `ui` owns generic presentation; neither controls financial truth.

**Inspected test host:** `nuxt-layers-test/application-test-template` includes a public homepage `/`, admin dashboard `/admin`, host-coded collapsible **Capabilities → Theme Manager** link to `/theme-manager`, mobile navigation, Appearance control and a **Not signed in** placeholder (verified in `README.md`, `app/app.vue`, `app/pages/admin.vue`, `app/pages/index.vue`, `app/app.config.ts`, `nuxt.config.ts`). A **derived** local test app should add **Capabilities → Payments → `/payments`** and a Payments tile on `/admin`. There is **no verified generic sidebar-registration API** in this host; a host-owned link/extension must be implemented. Do not copy Theme Manager private providers (its root `CONTRACT.md` documents an ADR-0012 integration gap). Never modify the shared test template as part of this review.

### Screen and public-data plan

| Proposed route / screen | Function and contract | Permission |
|---|---|---|
| `/payments` — dashboard | Captured/pending/refunded/unknown/disputed separately, provider health, freshness and reconciliation queue; Gateway current status and exceptions, optional Reporting link | Scoped payment read |
| `/payments/transactions` — list | Filters, pagination, explicit merchant/tenant isolation, currency/source status and coverage | Scoped payment read |
| `/payments/transactions/:id` — detail/actions | Authorisation/capture/refund/reversal timeline and evidence; preview separately approved `capture`, `void`, `cancel`, `refund` with expected revision, limits, step-up and confirmation | Read plus action-specific authorisation |
| `/payments/exceptions` — reconciliation | Unknown/late/invalid provider events; safe `reconcile`, no blind charge-again action | Reconciliation authority |
| `/payments/disputes` — provider observation | Chargeback case/status/deadline/evidence, no initial dispute-action API | Dispute read |
| `/payments/providers` — merchant configuration | Verified legal payee, eligible account, currencies, methods, suspension, approved cut-over; never reveal secrets | Merchant/provider management with step-up |
| Contextual customer checkout | Order/Invoice/Subscription launches provider-hosted payment/challenge; always verify server-side after redirect; recurring mandate only if enabled | Source-authorised collection, not admin sidebar |
| Optional Reporting view | Trends and aggregates through Reporting's own protected output contract | Reporting access |

**Security and UX:** visual route guard **and** server-side resource checks on every read/command; never grant data access from a sidebar link or role name. Unknown/pending states and provider-reported settlement must be textually distinct. Refunds and captures need clear amounts, remaining limits, risks and deliberate confirmation. Use Theme Manager semantic utilities, keyboard/focus/live-region support, responsive mobile layout, colour-independent statuses, WCAG 2.2 AA, BCP 47, CLDR/ECMA-402 and Clock time semantics. No raw card entry, credentials or identifying payer details in the generic shell, URL or browser storage.

**Local-only acceptance:** derived test application may simulate payment provider, legal merchant and caller scenarios with **SIMULATED — NO MONEY MOVED** visible; never use real financial operations or expose unauthenticated Theme Manager test mode publicly. The routes, screens, permission strings and optional decorative logo are **conceptual conventions**, not verified shipped exports.

## 9. Acceptance scenarios and implementation alignment

| Scenario | Required result |
|---|---|
| Valid collection mandate, merchant and provider; duplicate command | Stable operation identity, correct verified outcome, no duplicate charge or outbox business movement |
| Charge finalised, order accepted or invoice/credit note issued **without** separate payment/refund authority | No capture/refund; safe `missing_authority` response |
| Browser checkout success, unsigned/duplicated/out-of-order webhook | Never infer paid; verify provider, deduplicate and reconcile |
| Provider timeout, in-flight provider replacement or lost callback | Preserve unknown and original provider identity, safe read-back, no silent failover or unsafe retry |
| Partial/multiple captures or partial refund plus dispute/reversal | Apply provider/currency limits, distinguish pending/confirmed totals, preserve history/evidence |
| Cross-tenant, revoked merchant, insufficient assurance or stale permission | Server-side deny without revealing protected existence or records |
| Required Audit degraded; Logging/Reporting unavailable | Enforce mandatory evidence protection or hold action; optional diagnostics/reports cannot invent completion |
| Event duplication, replay after reversal, unexpected source revision | Idempotent consumer semantics; current status supersedes old event; historical corrections retained |
| GUI absent, browser route denied, mobile/accessibility/i18n checks | Headless operation continues; UI observes server security and WCAG/locale semantics |
| Synthetic test checkout and reconciliation | Visible simulated labels, no money moved, no public deployment of unsafe test mode |

**Implementation still to prove:** implementation repository/root `CONTRACT.md` and exact exports; provider adapter contract, supported payment rails, legal merchant verification source, money scale/rounding, transactional Postgres/outbox and encrypted secrets, policy and PCI/regulatory applicability, threat model, privacy retention/`STORAGE-REGISTER.md`, one-operation host composition within governing budget, schema compatibility, non-duplication and webhook/uncertain-result tests, derived host GUI, CI acceptance and version-pinned licence audit. Local tests/builds and implementation edits are intentionally outside this blueprint review.

**Completion:** the conceptual scope, authority, contracts, cooperation, standards, library guidance, security, GUI and acceptance direction are **owner-approved and documented**. No outstanding **conceptual policy** decision is known. Implementation and legal/compliance acceptance evidence are **not** completed or claimed. Reconcile concurrent Order review #113 and other relevant pending changes, validate current governing/blueprint `master`, PR checks/branch protection and reciprocal consistency before requesting **separate explicit merge approval**. PR #116 remains **draft and unmerged**.

## Reciprocal conceptual interface — Pricing (22 November 2026, draft PR #119)

**Status: Pricing PRI-01–PRI-07 and five supplementary pricing solutions owner-approved conceptually on 22 November 2026; not implemented, and this does not approve the neighbouring capability review.** [Pricing](../../capabilities/pricing/capability-record.md) is the authority for versioned commercial tariffs, effective price lists, discounts, coupon rules, currency/rounding policy and attributable quote calculations; it does not own payment authorisation, capture, refund or dispute state. The partner supplies its own scoped, effective, revisioned source facts where relevant; Pricing returns qualified price/quote, source revision, calculation evidence, currency, tax/FX certainty and expiry. Missing, stale, unauthorised or contradictory mandatory input prevents a definitive claim; a quote, order, assessed charge, payment and posted invoice are distinct facts. Integrate through public acyclic contracts/ports/events, not private schemas or an inferred package import. Preserve existing independently approved partner decisions; proposals in active parallel PRs require reconciliation before merge.

### Subscription reciprocal contract — conceptual review PR #137 (23 November 2026)

**Owner-approved Subscription conceptual direction; not an implemented interface:** [Subscription](../../capabilities/subscription/capability-record.md) owns effective versioned recurring agreements, lifecycle and scoped commercial entitlements; it does not own charges, tariffs, payment execution, scheme membership, financial postings, analytics or security access decisions. Partner consumption must use the Subscription public plan/term/status/entitlement snapshots with scope, revision, effective time, provenance and explicit pending/unknown results, and must recheck authoritative current state after delayed or duplicate events. Partners supply their own independently authoritative facts; no direct cyclic package dependency or private schema access is approved. Preserve each partner's existing approved decisions; the complete interfaces and unresolved boundaries are in Subscription's draft record.

**SUB-11/SUB-15/SUB-16 owner-approved conceptual decisions (23 November 2026):** Gateway continues to own verified payment attempts/captures/refunds, mandate eligibility and their pending/unknown/reversed evidence; Subscription alone evaluates paid or trial/grace entitlements. Native/provider-led subscription integrations must name one lifecycle authority and preserve the original provider-operation and mandate references. A migration never duplicates collection or silently transfers a recurring mandate; requires eligibility, explicit cutover, read-back and reconciliation.

## Checkout reciprocal conceptual interface — 24 November 2026

**Status:** Checkout-side conceptual interface owner-approved (24 November 2026) in PR #151; existing approved decisions remain authoritative. See [Checkout conceptual contract](../../capabilities/checkout/capability-record.md). Checkout is an optional initiating coordinator, supplying independently approved source/collection or reversal authority, eligible merchant, amount/currency and stable original operation ID. Payment Gateway returns qualified challenge/authorisation/capture/void/refund/unknown status; it alone verifies provider evidence. No new payment key on unknown, no split/escrow scope extension, no raw card data in Checkout. Public host-bound ports only; no private schema or circular package imports. Checkout passes a separately qualified collection authority and stable operation identity; unknown outcomes remain pending until verified read-back. A changed amount/currency requires renewed confirmation and a separately authorised operation.

## FAC-D01 — Party authority

[Party](../../capabilities/party/capability-record.md) supplies qualified legal merchant/payee/payer references and scoped representation evidence. Gateway retains merchant/provider eligibility and payment execution; Party registration is not provider onboarding, permission to charge or settlement. Wage disbursement is not implied by the approved Gateway scope.
