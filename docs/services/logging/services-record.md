# Logging — Service Record

**Artefact classification:** Technical service (CLS-09, approved 24 November 2026). **Prior governing/review classification:** Foundation capability (conceptually approved; governing catalogue still lists a candidate).  
**Conceptual status:** Complete and owner-approved, 21 November 2026. **Implementation status:** Unverified; no published root `CONTRACT.md` found. **Merge status:** Draft PR #88; no merge approval.  
**Governance checked:** `nuxt-layers/architecture-rules/master` at `d7f7c2ee051244b8c81325f5ff1267568d99aab1`. **Blueprint master checked:** `df7df2762569e04e4a3e9d2e6773695e4e5ed080`. **Original review bases:** governing `b920ce0d8b361de000a6739a16123dbdc56df7a7`; blueprint `6dac83a03da8704f7945ee1bc894f2248300445a`.  
**Authority:** Accepted ADRs and normative governing documents take priority. This blueprint is a conceptual specification, not a claim of a shipped API, security assurance, certification, or legal compliance. Superseded drafts and individual reciprocal discussions are preserved in Git history, not repeated here.


**Todo producer (23 November 2026; conceptual reciprocity):** [Todo](../../compositions/todo/compositions-record.md#error-normalisation-logging-audit-and-reporting--conceptual-public-interfaces-23-november-2026) submits minimal sanitised native collection/link/promotion operation diagnostics, safe code, latency, trusted scope and opaque correlation through Logging's public diagnostic intake. Logging returns accepted/rejected/throttled/unavailable/uncertain intake and authorised sink/health projections, **not** Todo work completion or independent Audit custody. No raw checklist text, secrets or restricted linked Task details in normal technical logs; ordinary Logging failure cannot undo a committed Todo mutation.

**Checkout reciprocal interface (24 November 2026; detailed Checkout-side interface owner-approved; CHK-07/09 approved):** [Checkout conceptual contract](../../capabilities/checkout/capability-record.md#error-normalisation-logging-audit-and-reporting--public-exchanges). Checkout supplies sanitised technical operation, latency, dependency failure, safe code and recovery diagnostics with trusted scope and opaque correlation. Logging returns its independent intake status, authorised diagnostics and sink/health status, not transaction success or Audit custody. Routine failure does not undo checkout or trigger payment retry. No raw payment credentials, secrets or unnecessary personal data. No shipped integration asserted.


## Purpose and boundary

**Theme Manager advisory reciprocity (23 November 2026; [Theme Manager PR #142](../../presentation/theme-manager/presentation-record.md)):** Theme Manager may submit minimised theme validation, storage, fallback and management diagnostics through Logging's public intake, with safe code, operation, severity and opaque correlation rather than private theme contents or credentials. Logging returns its own accepted/rejected/uncertain receipt, permitted diagnostics and health, never proof that the theme state committed. Ordinary logging failure does not undo an authorised theme change; no current integration is asserted. 


Logging is the common, secure way for Nuxt Layers capabilities and hosts to record **technical diagnostics**. It accepts small, structured events, validates and sanitises them, attaches trusted context, routes them to bounded sinks, exposes permitted records and reports delivery failures. The headless core runs without an external service; its administration GUI is optional.

Logging owns **its accepted sanitised diagnostic records, processing rules, delivery/retention state, access-controlled diagnostic queries and technical health**. The producer remains authoritative for the operation that caused a diagnostic.

Logging **does not own**:
- **Audit's** accountable event intake, evidential integrity, investigation/review or Audit receipts;
- **Observability's** metric histories, distributed traces, health alert decisions or alerting;
- **Reporting's** report definitions, derived analysis or report publication;
- source business facts, permissions, Identity membership, credentials, domain outboxes, external provider accounts, or host infrastructure.

A log receipt is never proof that a business transaction succeeded, an Audit record was accepted, or a remote sink stored the record. Logging can be implemented as a framework-independent service with an optional Nuxt adapter; the capability boundary does not require a new deployment or repository.

## Native service and lifecycle

Logging provides a versioned, typed diagnostic envelope; trusted producer validation; allowlist-first sanitisation; source/severity/category and rate controls; safe correlation; bounded local collection; provider-neutral routing; scoped reading; retention and protected export; and loss/degradation reporting.

**Lifecycle:** submitted → trusted-context and shape validation → sanitisation and classification → rejected or **accepted for processing** → buffered/persisted (if configured) → delivered, retrying, dropped, exhausted or uncertain → expired, erased or legally restricted. Receipt, persistence and destination delivery are separate facts with separate times. A sink timeout after a possible write is **uncertain**, not definitely failed or delivered.

Native mode requires a **host-supplied bounded local sink** and trusted clock/context services but not PostgreSQL, a SaaS account, a collector, a search engine or a mandatory GUI. If no safe sink or processing capacity exists, report unavailable rather than pretending to accept. Ordinary diagnostic failure does not undo valid business operations. Critical security/Audit conditions remain enforceable independently by the producing owner and Audit. Finite queues, bounded retries, drop counters, safe shutdown and non-recursive emergency health reporting prevent the logger from causing unbounded work or self-amplifying failures.

## Search — reciprocal conceptual contract (23 November 2026)

**Search reciprocal (23 November 2026; Search PR #132; owner-approved Search-side contract):** Search submits bounded structured ingestion/query/provider/rebuild diagnostics, safe codes, severity and trusted opaque correlation, without raw query strings, private snippets, credentials or indexed documents by default. Logging answers its own accepted/rejected/throttled/unavailable/uncertain receipt, controlled reads and sink health. A log receipt never proves index application or Audit custody; Logging outage does not ordinarily undo Search operations. No implemented adapter asserted.

## Approved idealised public input contract

These are **business-level surfaces**, not actual exported function names, routes or provider types. Every input is validated at its trust boundary.

| Input | Source and supplied information | Validation and failure rule |
|---|---|---|
| **Submit diagnostic** | Trusted server producer supplies versioned event code/category/severity, safe structured attributes, source/operation, occurrence time, opaque correlation and purpose | Authenticate producer; validate schema, size, purpose, sensitivity, rate and source scope. Reject unsafe/invalid input with a safe reason. A browser may submit only through a separately enabled, protected, throttled host adapter |
| **Trusted execution context** | Host and IAM Integration supply authenticated service/caller, server-resolved tenant/group, authorised scopes and applicable assurance; Clock supplies receipt-time semantics and source quality | Untrusted tenant or actor labels confer no access; missing trusted context is unknown or rejected as appropriate. Protected operations fail closed when Authorisation cannot decide |
| **Set effective logging policy** | Authorised operator and Configuration supply approved classification, levels, routes, sampling, minimisation, retention, scope, revision and effective time; Privacy/Legal Compliance qualify constraints | Validate against mandatory floors; deny weaker or contradictory instructions; do not assume an unverified legal basis or preservation right |
| **Sink delivery result** | Host-composed local or optional external sink reports bounded attempt, target, successful acknowledgement, refusal, timeout and provider status | Verify source and receipt meaning; preserve uncertain delivery; never convert attempted delivery to confirmed storage |
| **Query/request diagnostics** | Authorised reader specifies permitted tenant/source, bounded date range, severity, event code and correlation | Authorise **before** lookup, enforce isolation in the query, reject unbounded or disallowed filtering and disclose neither another tenant's records nor counts |
| **Export, retention or recovery command** | Specifically authorised operator/rights workflow supplies scope, decision, applicable retention/hold context, idempotency/revision where needed | Distinguish accepted request from completed deletion/export; refuse unsafe erasure, legal-hold conflict and stale/unknown permissions |

**Task diagnostic producer reciprocity (TASK-01–14 owner-approved concept, 23 November 2026):** Task sends only authenticated, minimised source codes, correlation, task operation/latency and sanitised validation, persistence, dependency, attachment-scan and optional provider failures through Logging's **Submit diagnostic** public input. Logging returns accepted/rejected/throttled/unavailable/uncertain intake and scoped sink-health/read data via its **public output**; it neither records authoritative Task completion/evidence nor acts as Audit custody. Raw notes, file bytes, secrets and personal data are not general diagnostic payload. Task independently normalises errors through a pure library; the library does not invoke Logging. Routine Logging outage does not alter a committed Task lifecycle transition.

**Time & Attendance conceptual producer (TA-01–TA-06 owner-approved; PR #143):** Time & Attendance uses Logging's existing `Submit diagnostic` input for minimised, authenticated error/operation codes, provider import/reconciliation failures, latency, correlation, safe source/receipt time and technical context. Logging's public output returns intake accepted/rejected/throttled/unavailable/uncertain and authorised diagnostic/health views. It must not receive full worker timesheets, punch trails, biometric/location evidence or salaries by default; it cannot confirm work, approval or Audit custody. Routine Logging outage does not reverse a committed time correction. This is conceptual alignment, not an implemented adapter.

## Approved idealised public output contract

**Shopping Basket reciprocal (SB-01–SB-08 approved concept, 23 November 2026):** [Shopping Basket](../../capabilities/shopping-basket/capability-record.md#5-error-normalisation-logging-audit-and-reporting) sends trusted, bounded diagnostics for basket read/mutation validation, storage, guest claim/merge error, expiry, checkout reconciliation and outbox delivery, with versioned source code, classification, latency and opaque correlation. Logging returns accepted/rejected/throttled/unavailable/uncertain intake, permitted technical reads and sink backlog/delivery health. Raw guest proof, personal shopping line content, card details or profile fields must not enter general logs. A Logging receipt is **not** a successful Basket commit or Audit custody; routine Logging outages do not roll back a committed Basket operation. Exact published integration remains unverified.

| Output | Consumer and guarantee | Must not imply |
|---|---|---|
| **Diagnostic submission result** | Producer receives accepted, rejected, throttled, unavailable or uncertain; safe code and optional opaque intake receipt | Business success, persistence, remote delivery or Audit custody |
| **Sanitised diagnostic read model** | Authorised support/operations receive scoped, paginated records, source and receipt timestamps, origin, correlation, applied policy/schema version, classification and freshness/completeness warnings | Access to raw payloads, protected source facts or other tenants |
| **Delivery and health read model** | Producer, host and Observability receive sink ready/degraded/unknown state, retry/backlog age, drops, loss and qualified coverage | Zero loss, complete collection, healthy business process or valid Audit evidence |
| **Effective policy read model** | Authorised administrators receive approved routing/retention/classification and effective revision, without secrets | Permission to weaken mandatory security/legal floors |
| **Export and lifecycle result** | Authorised requester, Privacy or Legal Compliance receives scoped export and completed/pending/blocked/uncertain deletion, retention, restriction or retry outcome | Compliance certification, confirmed provider deletion without evidence or unrestricted evidence-grade export |
| **Committed Logging lifecycle events** | Approved host-composed Audit/Observability consumers receive relevant config/security change, protected export, retention, sink degradation and recovery facts with provenance | Domain business events; routine debug lines are not Audit submissions |

### Interaction guarantees

- **Commands** validate permission, version and intent; support safe idempotency where meaningful; expose accepted, completed, refused and uncertain outcomes.
- **Queries** enforce scope at source, provide bounded pagination and state their freshness, omissions and unknowns.
- **Events** concern Logging-owned committed changes and use its own transactional outbox when reliable cross-capability delivery is required. Consumers tolerate duplicate, late and reordered delivery. Exactly-once distributed delivery is **not promised**.
- **Shared context** is composed from public ports, not a mandated universal request object: trusted tenant/owner scope, source/actor, assurance, correlation/causation, time quality, sensitivity/purpose, policy and schema version, provider evidence, and qualified lifecycle state.
- **Compatibility** requires stable versioned event codes, result categories, semantic fields and error codes; breaking meaning/schema changes require a published contract revision.
- Protected records, operations and exports enforce server-side resource-aware Authorisation via IAM Integration. Host administrator status and parent-tenant relationships never automatically permit customer-data access.

## Manufacturing reciprocal public contract — 21 November 2026

**Status:** Owner-approved division of diagnostic, accountable and analytical authority; planned direction of Manufacturing's independent public integration, not a new shipped adapter or permission to merge this review. See [Manufacturing's canonical contract](../../capabilities/manufacturing/capability-record.md). Manufacturing remains the source of work orders, production operations, resource assignments, approved production dispositions, materials **requests** and production-cost/yield evidence; it does not own Quality's test finding, Inventory's committed movement, Facility's network or Accounting's journal. Per-tenant/project/resource authorisation, safe omission and provenance apply to each recipient independently.

**Logging receives from Manufacturing:** bounded, structured technical diagnostics such as invalid input, scanner/offline synchronisation errors, equipment adapter timeouts, failed solver execution, production-API latency and provider failures. Include safe event code, severity, source, operation, occurrence time, opaque work-order/correlation reference (only if authorised), tenant context from a trusted host and minimal sanitised fields. Do **not** log customer engineering drawings, recipes, health/personal data, raw credentials, measurements or privileged authorisation context by default.

**Logging supplies back:** accepted/rejected/throttled/unavailable/uncertain diagnostic intake result, qualified sink health, backlog/drop warnings, scoped diagnostic queries and technical incident correlation. Logging does **not** confirm a production transaction, make stock/quality state authoritative or replace Audit. Ordinary logger outage must not silently reverse valid production activity or create false success; critical security/evidence requirements are enforced separately by source owners/Audit. Logging's own policy and lifecycle changes are Logging-owned events.

## Persistence architecture — reciprocal technical diagnostic boundary (22 November 2026)

**Status: owner-approved Persistence-side design; Logging's own owner-approved conceptual contract remains authoritative and its implementation unverified.** Each data owner or trusted Infrastructure producer—not a shared Persistence layer—may submit bounded, structured, sanitised database connection, migration, query, pool, recovery or provider errors to Logging's authorised diagnostic intake, with source/code/severity, server-trusted tenant context and opaque correlation. Logging returns its own accepted/rejected/throttled/unavailable/uncertain intake result, scoped diagnostic reads and qualified sink delivery/health, never transaction commitment, Audit evidence receipt or Reporting completeness. The producer must not leak raw SQL bindings, credentials, protected row contents or full provider failures. Logging failure normally does not undo committed business state; any separately mandated critical Audit guarantee remains source enforced. See [approved Persistence exchange](../../architecture/persistence.md#error-normalisation-logging-audit-and-reporting).

**Publisher reciprocal contract (22 November 2026; Publisher-side approved):** Publisher offers bounded diagnostic submissions for technical scheduling, persistence, outbox relay and external-delivery faults (safe code, severity, site scope, operation/time and opaque correlation; never full document content). Logging returns independent accepted/rejected/throttled/uncertain intake, scoped diagnostic read and sink/retention/loss health; it never attests publication, evidence custody or external delivery. Routine logging failure must not undo a committed publication; required security/Audit control remains source-enforced. [Publisher canonical conceptual contract](../../capabilities/publisher/capability-record.md). This does not change Logging's separate conceptual approval or assert a shipped cross-capability adapter.

**Page Builder (PB-18/21 approved):** [Page Builder](../../presentation/page-builder/presentation-record.md) sends selected technical registration/template/render/hydration/dependency errors, safe code/severity/time/correlation and minimal component version; Logging returns independent intake and authorised diagnostic references/query results. Exclude raw templates, bindings, drafts, credentials and protected personal/source data; routine author corrections are not logs. Logging does not establish Publisher success or Audit custody.

## Cooperating capabilities and reciprocal public interfaces

**SEO reciprocal producer (draft PR #133, 23 November 2026):** [SEO's proposed public contract](../seo/services-record.md#seo-error-diagnostics-accountable-evidence-and-analytical-reporting--public-contract) submits bounded, sanitised technical events for sitemap/robots generation, metadata validation, source-revision invalidation, retry/latency and optional provider timeouts, with server-trusted site/tenant, error category, operation, occurrence time and correlation. Logging returns its existing accepted/rejected/throttled/unknown intake receipt, permitted diagnostic query and sink/drop/backlog health. It never claims SEO policies committed, a crawler indexed a URL or accountable Audit acceptance; ordinary Logging loss cannot undo a committed SEO change. No private metadata, domain secrets or cross-tenant enumeration is allowed.


**Profile reciprocal input/output (owner-approved Profile conceptual direction, 22 November 2026):** Logging accepts only Profile's bounded technical error codes, operation latency, degraded port/relay status and opaque permitted context; it returns sanitised intake status and authorised health/diagnostics. It never receives personal attributes, decrypted exports, contact or verification secrets, never certifies Profile mutation success or supplies Audit custody. [Profile canonical contract](../../capabilities/profile/capability-record.md#error-normalisation-logging-audit-and-reporting--approved-public-boundaries).


**The direction below describes information exchange, not automatic build-time dependencies.** Host composition and public ports preserve an acyclic dependency graph. The listed adjacent capabilities remain authoritative for their own records and policies.

| Capability or group | Logging receives | Logging supplies and separation |
|---|---|---|
| **IAM Integration; Identity; Authentication; Authorisation** | Trusted resolved caller, tenant/group and access decision/assurance; sanitised access/authentication failure categories | Safe failure/correlation and intake/delivery outcomes; no credentials or permission authority. IAM Integration composes IAM boundaries |
| **Clock** | Canonical time semantics, server receipt clock and quality/uncertainty | Timestamp anomalies, safe timing diagnostics; not authoritative UTC synchronisation |
| **Configuration** | Approved, versioned scoped settings | Applied/denied settings and operational failures; Logging enforces its own safe policy floors |
| **Privacy; Legal Compliance** | Applicable purpose, rights, retention, disclosure, hold and jurisdiction constraints, with source/effective version. Privacy additionally submits bounded diagnostics for consent validation, rights workflow retries, custodian timeouts and provider failures via Logging's public intake, after caller-side Error Normalisation and allowlist sanitisation where useful | Logging returns its own accepted/rejected/throttled/unavailable/uncertain intake, diagnostic reference, sink/drop/health and scoped lifecycle/erasure status. This cannot prove a Privacy decision, an Audit submission or a custodian's deletion; legal applicability remains with the specialist owner |
| **Infrastructure / host** | Sink/store, capacity, secrets, region, lifecycle and recovery mechanisms | Sink/queue/retention status; deployment/provider control stays with the host |
| **Audit** | Optional sanitised Audit pipeline faults and approved correlations | Logging-owned significant administrative changes through independent evidence-qualified event flow; **Audit owns receipt, custody, verification and completeness**; no bulk promotion of debug lines |
| **Observability** | Optional trace reference and alert/health context | Qualified sink health, lag/loss and correlation; **Observability owns metrics, traces, alerts and their history** |
| **Reporting; Search** | Authorised bounded query/aggregate specification and disclosure scope | Sanitised records/aggregates, provenance, freshness and gaps; **Reporting owns derived reports**, Search derived indexes |
| **Integrations / external sinks** | Provider adapter, routing status, receipt and transfer constraints | Sanitised delivery attempts/failures, retries and reconciliation; remote delivery not business success |
| **Message Queue; Scheduler; Workflow** | Optional durable relay, scheduled retention or orchestrated operations via public ports | Technical retries, execution faults and state; native Logging requires none of these |
| **Domain producers (including Facility)** | Structured, permitted technical errors, timing, severity, correlation, and source context. Facility submits safe plan-import/topology/routing/provider error codes without confidential geometry | Intake results, scoped diagnostics and delivery/health outcomes; originating Facility layout/closure decisions, Audit obligations and outbox remain Facility-owned |

**Localisation:** emits only bounded, sanitised provider/translation-processing diagnostics via an optional host port; Logging supplies intake/delivery/retention status but never takes translation job state, source text, review authority or Audit evidence. Translation completion does not depend on an ordinary log receipt. This Localisation-side boundary was approved on 21 November 2026 and reconciled with current master.

**Representative domain-specific boundaries:** Asset and Inventory send validation/concurrency or storage failures but not private asset histories/stock payloads; Billing and Invoice send rate, provider, numbering and reconciliation codes but not financial documents, bank details or payment instruments; Booking/Events send contention/time/provider errors but not guest/attendance details; Caching sends hit/miss/expiry/invalidation failures but no keys or cached values; Comments Engine, Content Security and Content Editor send safe pipeline failures but not comments, submissions, drafts or reporter identities; Course/Training/Credentials send processing/issuance errors but not learner evidence; Export sends rendering failures without document content; Federation/Help/Integrations send safe connection/sync faults without peer secrets or support text; Job and Recruitment send revision/provider faults but not confidential pay, CVs or protected characteristics. Existing approvals in these capabilities apply to **their** decisions; unmerged reciprocal proposals are not automatically endorsed.

**Absence:** Producers may function without the optional Logging port; Logging operates without Audit, Observability, Reporting, remote sinks and business-domain packages. Mandatory security evidence must still meet the originating owner's Audit obligations regardless of diagnostic-sink availability. If an optional integration fails, expose its specific degraded/unknown state rather than creating a dependency cycle or substituting another capability's data.

## Security, privacy, configuration and provider governance

**Mandatory platform controls:** OWASP ASVS 5.0 Level 2 minimum (relevant Level 3 for privileged operations), WCAG 2.2 AA for optional UI, accepted ADR-0012 one-call Nuxt composition with at most 50 lines of capability-specific host code if a Nuxt adapter is supplied, ADR-0016 directional dependencies, ADR-0017 tenant separation, ADR-0018 immutable policy floors, governing Security §16 storage/isolation and Privacy storage-register rules.

- **Never log** passwords, credential verifiers, bearer/session tokens, passkeys, recovery codes, API secrets, private signing keys or payment instruments. Exclude raw request/response bodies, query strings, documents, free-text submissions, URLs containing secrets, personal identifiers and private policy predicates by default. IP/device identifiers are personal data when identifiable; permit only where necessary, lawful and bounded.
- **Allowlist-first structured fields**, safe error codes, output encoding, anti-log-forging protection, payload/rate limits and protection against high-cardinality/cost amplification are applied before any external sink. A failed redaction is a restricted incident, not an invitation to preserve the unsafe line.
- **Tenant isolation** applies to collection, persistence, indexes, read/aggregate/export, backup, and erasure; implement server-side Authorisation before retrieval, plus store containment as appropriate. Privileged access, settings and destructive operations require risk-appropriate assurance and independently attributable Audit evidence.
- **Governed retention** varies by data purpose and classification, with minimised defaults, approved scope, versions/effective dates, data-region controls, verified deletion where possible, backup expiry, preservation holds and transparent uncertainty. A legal hold is not a licence to retain unrelated data forever.
- **Provider neutrality:** host supplies credentials, stores and local bounded sink; external collectors, cloud platforms, SIEM and analytics indexes are optional, with approved data transfers, residency, withdrawal and reconciliation. Keep logging usable locally without paid services.
- **Reliability and recovery:** finite queues and retry windows, safe degradation, observable loss, restart/replay handling, no silent acceptance on failure, separate emergency health channel to avoid recursive logging. Technical delivery is not an Audit receipt.
- **Future implementation evidence:** root `CONTRACT.md`, `STORAGE-REGISTER.md`, threat model/control register, store isolation and region mapping, privacy/retention decisions, redaction/secret-canary tests, replay/fault/clock tests, minimal consumer and UI acceptance must be supplied before operational claims.

## Standards and open-source implementation guidance

The following are **design references**, not separate certifications or new external obligations. Use whichever verified control matches the deployed risk and jurisdiction.

| Scope | Guidance and intended role | Status for Logging |
|---|---|---|
| Application security | OWASP ASVS 5.0; OWASP Logging Cheat Sheet; NIST CSF 2.0 and SP 800-53 AU family | ASVS floor is governing; others support security design/control mapping |
| Security event management | ISO/IEC 27001:2022 and 27002:2022 controls 8.15 (logging), 8.16 (monitoring) and 8.17 (clock synchronisation); NIST SP 800-92; UK NCSC logging guidance/CAF | Recommended complementary control references, not certification |
| Privacy and regulatory context | UK GDPR, Data Protection Act 2018, ICO storage-limitation guidance, ISO/IEC 27701; PCI DSS Requirement 10 only where relevant | Applicable law/contract is mandatory when qualified; specific technical mapping is risk/jurisdiction-dependent |
| Structured interoperability | OpenTelemetry Logs Data Model and stable semantic conventions; W3C Trace Context; IETF RFC 3339, optional RFC 5424/5425 syslog | Recommended data/correlation guidance; no mandatory collector or proprietary protocol |
| Presentation | WCAG 2.2 AA, BCP 47 and CLDR/ECMA-402 with Theme Manager/Clock | Governing accessibility and internationalisation baseline |

**Candidate tools — not approved implementation dependencies:** Pino (MIT) for Node.js structured logging; stable OpenTelemetry JavaScript interfaces/SDK and Collector (Apache 2.0); Fluent Bit (Apache 2.0) for optional container collection; PostgreSQL (PostgreSQL Licence) for optional durable local history. Winston (MIT) is an alternative logger; ClickHouse and OpenSearch (Apache 2.0) are optional scale-driven stores, **not** baseline infrastructure. Select versions only after checking current source availability, entire runtime/transitive licence graph, active maintenance, complete free self-hosted functionality and compatibility. Do not make a feature dependent on a proprietary paid edition or restricted source release.

## Optional GUI and host integration — approved

**Presentation is optional; headless operation is fully supported.** The owner approved the six-screen design on 21 November 2026, including the sidebar-to-capability-dashboard pattern.

The `nuxt-layers-test/application-test-template` `master` README documents a public homepage `/` without admin sidebar, an `/admin` test dashboard with collapsible responsive sidebar, and a `/theme-manager` capability entry. Theme Manager's root `CONTRACT.md` documents its management presentation and semantic styling. These demonstrate a **composition pattern**, not an existing Logging route. The host owns navigation, top bar, Appearance menu and route exposure; Logging owns optional capability screens drawing on its own **public** queries/commands and Theme Manager's tokens. No alternative theme or unauthorised test-mode production access.

| Screen (illustrative host-remappable route) | Purpose and public contract used |
|---|---|
| **Overview** `/logging` | Scoped volume/severity, recent errors, sink health, backlog, drops and uncertainty via `readPipelineHealth` / `readDeliveryState` |
| **Diagnostic explorer** `/logging/records` | Bounded filter/pagination and safe correlation navigation via `readDiagnostics` |
| **Record detail** `/logging/records/:id` | Sanitised source/receipt/delivery/provenance/attributes, using scoped diagnostic read; may be a responsive detail panel within Explorer |
| **Delivery and sinks** `/logging/delivery` | Read provider status, retry, loss and unknown states; permitted bounded retry through public command |
| **Settings and retention** `/logging/settings` | View/effectively change approved filtering, sink routes, policy versions and retention; no browser credentials |
| **Exports and data management** `/logging/data-management` | Protected scoped export, erasure, restrictions and holds with completed/pending/blocked/unknown status |

Operational issues appear on Overview or Delivery rather than needing a seventh page. Sidebar → Logging → Overview, then contextual drill-down is the default route. The host may hide or replace optional pages without disabling core Logging.

**Roles:** tenant-scoped diagnostic reader; restricted support/operator; deployment administrator for sinks/policy; privacy/compliance officer for qualified rights operations. Infrastructure-origin management and infrastructure log views are restricted to explicitly authorised host super-administrators under INF-02. Being a platform administrator does **not** imply customer diagnostic access. Exceptional cross-tenant access requires explicit scoped, expiring, attributable Authorisation and assurance. Every protected operation rechecks access server-side, regardless of hidden links.

**Presentation baseline:** WCAG 2.2 AA, keyboard and mobile overlay/focus support, visible focus, non-colour severity/health indicators, meaningful empty/loading/degraded/unknown states, accessible paginated tables, Theme Manager semantic tokens, BCP 47 localisation and Clock formatting. Do not display secrets, raw request content or another owner's data. Privileged exports/changes require confirmation and separate Audit accountability. The template's unauthenticated local Theme Manager test mode is **never** a production permission pattern.

## Conceptual acceptance scenarios

| Input / condition | Expected behaviour and authoritative output |
|---|---|
| Trusted producer submits safe diagnostic | Validated/sanitised accepted or refused intake result; Logging owns that receipt, not source business result |
| Unsafe/oversize/untrusted payload | Reject or safely sanitise under allowed schema; never emit prohibited values to sink, UI or error |
| Authorisation missing, caller probes another tenant or privileged export | Deny protected read/command before disclosure; Authorisation decides, Logging enforces |
| Local sink full or remote exporter down | Bound work and retries, report drops/backlog/uncertainty and degraded health; no invented persisted receipt |
| Replayed or reordered submissions / provider timeout after possible delivery | Idempotency/deduplication or explicit duplicate treatment; delivery remains uncertain until qualified proof |
| Logging works, Audit fails (or reverse) | Independently visible statuses; neither success proves the other |
| Clock source degraded | Preserve provenance and distinguish occurrence, receipt and delivery times, with quality warning |
| Retention expiry, rights erasure, unresolved legal hold | Apply approved scope and return completed, pending, blocked or unknown, with compliant audit-worthy changes separately recorded |
| Privileged setting change or cross-tenant attempt | Server decision, step-up where required, bounded effect and independent attributable evidence |
| Local test host sidebar/navigation and mobile display | Logging dashboard from sidebar; home and Theme Manager Appearance preserved; accessibility and unauthorised direct-route refusal verified |
| GUI disabled / optional integrations missing | Headless native diagnostic contract continues; documented optional absence and failure semantics |
| Request to log credentials, write Audit evidence, reverse billing or certify regulatory compliance | Explicit unsupported/refused result; no transfer of domain authority |

## Decisions, completeness and remaining work

**Owner-approved conceptual decisions (21 November 2026):**
- **LOG-01:** Distinct Foundation diagnostic capability; packaging/deployment independently chosen.
- **LOG-02:** Bounded local native sink; external destinations optional.
- **LOG-03:** Strict Logging / Audit / Observability separation; Reporting owns analysis.
- **LOG-04:** Versioned typed, sanitised, trusted diagnostic intake.
- **LOG-05:** Finite best-effort normal delivery, transparent loss and separate mandatory Audit guarantees.
- **LOG-06:** Purpose-based minimised retention, tenant/privacy/legal constraints and policy provenance.
- **LOG-07:** Headless core and optional restricted GUI; **six-screen/sidebar design subsequently approved**.
- **LOG-08:** Scoped public query/export and Logging-owned committed lifecycle notifications, not general business event bus.

**Further owner-approved refinements:** IAM Integration façade with server Authorisation and no blanket platform-admin access; accepted ≠ delivered and visible unknown/loss; conservative purpose/class-based retention and independent Audit-relevant events; independent, acyclic Logging/Audit/Reporting cooperation.

**Conceptual outcome:** **Complete for owner-approved blueprint design.** Purpose, authority, native service, six input and six output surfaces, command/query/event semantics, cross-capability directions and absence, security/privacy/policy, provider neutrality, standards, GUI and conceptual acceptance are covered. No outstanding *conceptual* policy decision is asserted. Any new architectural choice arising during implementation must return for separate approval.

**Not implementation-ready or merged:** No verified `nuxt-layers/logging` repository or root published `CONTRACT.md`; exact TypeScript signatures, schema/error registry, store inventory/retention schedules, provider/licence selections, threat model, tests and host integration are future engineering and acceptance. **PR #88 requires final current-master verification, repository checks and an authorised protected squash merge.** No implementation repositories or tests have been modified/run during this conceptual review.


## Location reciprocity — 20 November 2026 (Location-side approved; counterpart boundaries independently governed)

[Location conceptual public contract](../../capabilities/location/capability-record.md) defines approved conceptual versioned, tenant-authorised place references, geometry, accuracy, provenance and lifecycle queries/events, with no implied resource rights. **Logging** remains authoritative for its own domain decisions and records; any placement, routing, eligibility, attendance, report, evidential or diagnostic conclusion must use Logging's own published contract and its actual authoritative sources, not treat proximity or a coordinate as proof. Logging receives redacted technical errors, provider failures and correlation IDs; it is not the authoritative record of place mutations, precise personal coordinates or access decisions. No direct private schema access or implied hard package dependency. This note does not complete or approve the independent Logging review.


## Logistics public contract reciprocity — 21 November 2026 (PR #89)

**Primary direction: Logistics → Logging.** Logistics submits sanitised technical diagnostics through Logging's public intake. Logging returns submission receipt and permitted health/diagnostic queries, not control of Logistics state. **Owner-approved Logistics-side conceptual exchange; not a separate approval of this capability's own contract and not an implemented API.** Logistics provides sanitised technical diagnostics for solver failures, dispatch scheduling, carrier adapter errors, transport retries and operational correlation; Logging returns intake status, safe query and sink-health information. Do not pass delivery addresses, signatures, credentials or raw tracking payloads. Logging acceptance never proves business dispatch, shipment delivery or Audit custody; routine logging outage does not undo Logistics commits. Logging's own independently approved conceptual public contract controls diagnostics and sanitisation. See [Logistics canonical record](../../capabilities/logistics/capability-record.md#cooperating-capability-boundaries). Preserve public-contract isolation and independent source ownership.

## Quality reciprocal contract — 21 November 2026 (Quality draft PR #109)

**Quality → Logging (optional diagnostics):** Quality submits bounded, sanitised technical event codes, severity, operation/correlation, measurement-import or laboratory-adapter faults and retry/validation errors through Logging's approved intake contract. Logging returns accepted/rejected/throttled/unavailable/uncertain status, permitted scoped diagnostics and qualified sink-health/loss information. Logging owns diagnostic processing/delivery, **never** Quality's inspection, non-conformance or CAPA facts. No raw sensitive designs, test reports or unredacted person/customer records. A diagnostic receipt neither certifies a quality result nor replaces Audit evidence; an ordinary log outage cannot make a failed mandatory inspection pass. **Status:** Quality QTY-06/07 and these reciprocal interface details owner-approved on 21 November 2026, not evidence of an implemented adapter.

## Cross-capability interface — Mailer operational diagnostics

**Status:** Mailer-side conceptual contract approved 21 November 2026 (MLR-01–MLR-10; Mailer PR #90); Logging's own published implementation contract is not asserted. [Mailer](../mailer/services-record.md) supplies sanitised, typed provider SMTP/API errors, timeouts, throttling, retry causes, callback-verification failures, queue lag and latency, with tenant-scoped opaque dispatch/correlation references. Logging receives only needed, classified diagnostics and owns severity, technical log storage, permitted retention, sink-routing and acceptance/failure/availability results. Logging never owns Mailer's dispatch/attempt record or source event/outbox; it does not provide Audit custody or Reporting's derived business metrics. Exclude message bodies, recipient addresses unless strictly necessary and authorised, raw headers, attachments, credentials and tokens. Normal diagnostic outages should not reverse an already committed mail state; critical security-evidence duties remain separately governed by Audit.

## Marketplace — reciprocal diagnostic public contract (22 November 2026)

**Approved Marketplace-side conceptual direction; Logging's independent contract and implementation remain separate.** [Marketplace's canonical cooperation specification](../../capabilities/marketplace/capability-record.md#logging-audit-and-reporting--three-different-public-exchanges) supplies only bounded, redacted technical codes, operation/correlation IDs, duration, retry, invalid-input, revision-conflict, provider-unknown and outbox-lag signals through Logging's public diagnostic intake. Logging supplies sink acceptance/availability and diagnostic reference, and owns log storage/retention; it neither changes listing state nor establishes accountable Audit proof. Never copy seller evidence dossiers, secrets, raw enquiry content or financial records. Source operation success/unknown is decided by Marketplace, regardless of Logging health.

## Media reciprocal input/output contract — 21 November 2026

**Status:** Media owner-approved conceptual cooperation, not a verified published implementation contract for either capability. **Media ↔ Logging (approved Media design, 21 November 2026):** Media sends bounded structured diagnostics (upload/parser errors, sanitisation and preview failures, Storage/outbox/scheduler health, retries and latency) with permitted correlation, tenant and opaque resource references. No file contents, signed URLs, raw sensitive metadata or unnecessary personal data. Logging supplies sink acceptance/failure and technical diagnostic availability, not authoritative Media lifecycle facts or audit receipts. Logging outages must not change Media's authorisation, safety or processing decision; Media emits significant accountable changes separately through its own durable outbox to Audit. Logging's own complete contract remains unverified. [Media contract](../../capabilities/media/capability-record.md#public-contract-interaction--logging-audit-and-reporting).

### Qualification technical diagnostics — approved reciprocal contract (22 November 2026)

[Qualification](../../capabilities/qualification/capability-record.md#error-normalisation-logging-audit-and-reporting) sends bounded, sanitised technical codes, operation and severity, source/observed timestamps and opaque correlation for invalid inputs, unavailable issuer registries, remote award retries, reconciliation failures and operational latency; not raw marks, personal evidence, credentials or protected source payloads. Logging returns accepted/rejected/throttled/unknown intake, authorised diagnostic queries and sink health/coverage. Its acknowledgement does not mean Audit evidence custody, an award was issued or an external issuer decided; routine Logging unavailability never reverses committed Qualification decisions. This is a public contract relationship, not implementation or private-schema access.

**Temporal Gateway — approved TG-01–TG-05 reciprocal boundary (23 November 2026):** The gateway/host supplies Logging's published diagnostic intake with minimal, sanitised Temporal connection/worker/provider error, operation and attempt correlation, severity, known/unknown disposition and safe tenant scope. Logging validates and owns diagnostic records, retention, sinks, permitted queries and intake/delivery health, returning accepted/rejected/uncertain diagnostic receipt and authorised lookup only. A log does not prove business success, Audit custody or reporting completeness. Logging outage does not rewrite provider or business status. [Temporal Gateway conceptual contract](../../adapters/temporal-gateway/adapters-record.md). No verified runtime adapter or package import is asserted.

## Error Normalisation reciprocal boundary — 22 November 2026

**Status:** Approved conceptual integration guidance, not a new Logging implementation, package dependency or change to Logging's completed review. [Error Normalisation canonical library record](../../libraries/error-normalisation/stateless-library-record.md).

A producing capability may use the pure `error-normalisation` library locally to supply Logging's existing diagnostic intake with a **sanitised**, versioned source-owned error code, category, qualified severity, operation and permitted opaque correlation. Logging validates this submission under its own access, minimisation, receipt, sink, retention and scope policies; its receipt states **diagnostic acceptance only**. Logging returns to the producing capability accepted/rejected/throttled/unavailable/uncertain intake, authorised diagnostic records and qualified delivery/health state. The library does not call Logging, own stored logs or need Logging to work. Logging does not classify business outcomes, decide retries or prove Audit evidence or Reporting completeness.


## Message Queue — approved reciprocal public contract (22 November 2026)

**Owner-approved Message Queue concept (MQ-01–10); no claim of implemented interfaces or new approval of this neighbouring capability.** MQ sends minimised technical fault codes, attempt/correlation IDs, retry/provider/worker diagnostics to Logging's public intake. Logging returns log-specific receipt, scoped diagnostic access and sink/loss status; it does not own source custody, transport outcome or Audit evidence. Routine Logging failure does not lose a durable message. Public directional host-composed ports avoid private data coupling. [Message Queue canonical record](../message-queue/services-record.md). This current note supersedes any older MQ-specific proposal status in this record.


## Reciprocal Membership public interface — 22 November 2026 (draft PR #93)

**Status:** Membership conceptual decisions MEM-01–MEM-10 and implementation-library selection owner-approved; logging's independent contract/implementation status unchanged. [Membership's public contract and cross-cutting boundary](../../capabilities/membership/capability-record.md#error-handling-logging-audit-and-reporting--public-contract-boundary). Membership emits purpose-limited structured technical diagnostics (sanitised error category/message key, correlation, retry/outbox/provider failures, latency and operational health). Logging returns sink/diagnostic status where exposed and never owns participation changes, business decisions or Audit evidence. Its outage cannot change committed Membership outcomes or suppress necessary evidential capture. Error Normalisation supplies stable safe error classifications, not a logging sink. Secrets, raw eligibility documents, payment details and identifiable beneficiary records are not logged. This is a public contract relationship, not a direct required package import, private-store access or completed implementation.


## Reciprocal conceptual contract — Metadata (22 November 2026)

**Status:** Metadata owner-approved conceptual direction in draft PR #95, not a published implementation adapter or a completed review of this cooperating capability. [Metadata public contract](../../capabilities/metadata/capability-record.md).

Metadata submits only bounded, structured technical diagnostics for taxonomy/assignment/ontology validation faults, reasoning timeouts, AGE/PostgreSQL availability, provider or query faults and safe correlation references. Logging's public diagnostic intake returns accepted/rejected/throttled/unavailable/uncertain and sink health/delivery status; none confirms a Metadata change, ontology truth or Audit receipt. No raw restricted terms/axioms, SQL/Cypher or detailed personal records. Metadata retains core operation during ordinary Logging failure and handles mandatory evidence separately through Audit. All edges use public contracts/host composition; no direct private-storage access or mutual package import.


## Notifications reciprocal integration — 22 November 2026

**Notifications reciprocal public-contract integration (22 November 2026; Notifications-side concept approved):** Notifications may submit minimised, source-classified template, provider, timeout, callback, queue/attempt or retry diagnostics with opaque tenant/correlation context. Logging returns a qualified accepted/rejected/throttled/unavailable/unknown diagnostic receipt and protected diagnostic/health queries. Logging owns its records, not notice status, provider dispatch, recipient inbox or Audit evidence; avoid message bodies, addresses, secrets and raw callbacks. Normalised errors are input data, not automatic writes. Diagnostics failure cannot falsely reverse a committed notification.

## Moderation — approved current reciprocal contract (PR #96)

**Moderation-side concept approved; not an implemented adapter or an independent approval of this capability.** Moderation supplies only bounded, sanitised technical diagnostic codes, correlation, latency and degraded adapter outcomes; Logging returns its own intake and delivery state. Logging records neither case truth nor evidential Audit custody; routine logging loss does not undo a valid case decision. [Canonical Moderation specification](../../capabilities/moderation/capability-record.md). Public versioned, scoped ports preserve source ownership and acyclic package dependencies.

**Cross-service error and analysis clarification (OBS-01–OBS-10 approved, 22 November 2026):** Producing capabilities may first use the pure [Error Normalisation library](../../libraries/error-normalisation/stateless-library-record.md); Logging receives only their separately authorised sanitised diagnostic submissions and returns intake/sink status, not a business outcome. Its qualified sink drop/lag/availability and correlation read port may feed [Observability](../observability/services-record.md) for health/alert evaluation. Audit still needs independently authorised source events and retains evidence custody, while Reporting uses permitted metrics/diagnostic extracts and source facts to produce derived reports. No direct normaliser-to-Logging invocation, mandatory Observability subscription or implicit promotion of log counts into complete business/evidential outcomes.

## Reciprocal interface — Observability review (22 November 2026)

**Status: OBS-01–OBS-10 owner-approved on 22 November 2026; no new Logging approval or implemented adapter asserted.** Logging owns sanitised technical records, delivery receipts and sink health. Its public status port can provide scoped backlog, lag, drops, delivery failures and safe correlation to [Observability](../observability/services-record.md), which computes operational histories, traces and alerts without owning logs. Health is not proof of delivery or Audit receipt; permissions, provenance, freshness and tenant isolation apply.

## Office composition reciprocal contract — 22 November 2026

**Status:** Office conceptual direction approved; documented in Office PR #112, not a published adapter or runtime API. The Office host may supply minimal structured panel-loading, configuration-adapter or provider error diagnostics, with approved codes, trusted scope/correlation and sanitised projections from Error Normalisation. Logging supplies bounded intake/health status and permitted diagnosis; never office state, completed business outcomes, Audit proof or authorisation. Source capabilities remain producers of their own service diagnostics. Optional Logging outage must be shown or reconciled under the applicable Logging/source policy, not silently described as an Office business failure. See [Office canonical contract](../../compositions/office/compositions-record.md).

### Organisation Console — approved diagnostic consumer/producer boundary (22 November 2026)

**Status:** Approved conceptual cooperation in Organisation Console PR #114; no adapter implementation asserted. The trusted host/server may send minimal sanitised console load, hydration, adapter and context-switch diagnostics with authenticated producer, scoped actor/tenant context and opaque correlation. Browser messages require a protected, throttled host adapter. Logging returns accepted/rejected/throttled/unavailable/uncertain intake status, scoped diagnostic reads and qualified delivery health; a receipt is not business completion, durable Audit evidence or guaranteed delivery. Only authorised operators can view diagnostics. Logging failure must not normally prevent safe console display or a valid domain transaction; mandatory evidence checks remain with the responsible domain/Audit. See [console contract](../../presentation/organisation-console/presentation-record.md#error-normalisation-diagnostics-accountability-and-reporting--approved-cooperation).

## Order reciprocity — approved Order-side public input/output (22 November 2026)

[Order's approved conceptual contract](../../capabilities/order/capability-record.md#error-diagnostics-accountability-and-analytics--approved-reciprocal-contract) submits strictly allowlisted, structured **technical** diagnostics for invalid inputs, access denials where permitted, revision conflicts, provider timeouts, outbox lag and recovery, with safe error code/severity, operation, trusted scope and opaque order/correlation references. **Logging returns** accepted/rejected/pending or uncertain diagnostic intake, qualified delivery/loss/lag/health and authorised bounded diagnostic reads. No raw order lines, buyer data, payment information, tokens or free text by default. Logging owns sanitised diagnostic records, **not Order acceptance, Audit evidence or Reporting totals**. Its outage is operational degradation, not proof of order failure and not a basis for silently rewriting a committed order. This note does not claim an implemented interface or supersede Logging's independent conceptual approvals.

## Policy Map reciprocal public-contract boundary — 22 November 2026

**Status:** owner-authorised conceptual integration in [Policy Map's approved classification and contract](../../capabilities/legal-compliance/capability-record.md#policy-and-control-map); no independently implemented Policy Map service or new runtime dependency. The read-only mapping function belongs to **Legal Compliance** and reuses each participant's public interfaces.

- **Error Normalisation (stateless library):** Legal Compliance provides source-owned errors, versioned definitions, trusted opaque correlation and a disclosure profile; the pure library returns safe codes, categories, message keys and *advisory* retry characteristics. It owns no write, transport, log, audit, report, timer or business outcome.
- **Logging:** Legal Compliance emits minimised technical diagnostics (failure code, source availability, latency, correlation) through Logging's public intake. Logging returns accepted/rejected/throttled/unavailable or uncertain diagnostic status and authorised diagnostic/health queries. Technical receipts never prove policy compliance, committed business state or Audit custody.
- **Audit:** Legal Compliance and source owners supply attributable, risk-selected events for meaningful mapping/obligation decisions, revisions and significant access/security actions, under Audit intake rules. Audit supplies independent accepted/pending/rejected/uncertain custody, integrity and authorised evidence references. Policy Map exposes permitted references, not duplicated audit records; a mapped control is not proof of effectiveness.
- **Reporting:** Legal Compliance supplies authorised scoped mapping/coverage/gap snapshots with sources, revision, effective/as-of time, incompleteness and disclosure constraints. Reporting returns governed report definitions, execution state, derived aggregates/trends and exports with provenance and freshness; it does not create legal or control truth. No percentage of mapped controls automatically measures percentage legal compliance.

**Failure and privacy:** source/query errors are classified without inventing outcomes; unknown/unavailable evidence remains explicit. Permission checks precede reading source records, links, aggregates and exports. Each consumer enforces its own tenant/sensitivity and retention policy. No direct private imports, new Policy Map outbox or package dependency follows from conceptual cooperation; none of these relationships is verified as a shipped interface.

## Organisation Model — reciprocal conceptual diagnostic interface (22 November 2026)

**Owner-approved source-side direction; not an implemented adapter.** [Organisation Model](../../architecture/organisation-model.md) sends permitted minimised technical faults (schema validation, dependency failures, version conflict, publication latency and uncertain recovery) with Model-owned stable code, severity, correlation and vetted tenant/operation context, optionally projected through Error Normalisation. Logging returns intake status (accepted/rejected/throttled/unavailable/uncertain), technical sink/delivery status and authorised diagnostic reads. Raw schemas, credentials and identifiable private payloads are excluded by default. The source owns whether a definition actually committed; a Logging receipt is never an Audit evidence receipt or Reporting metric fact. Normal operations survive optional Logging outages; mandatory separate Audit controls still apply. No direct package dependency implied.
# Payment Gateway reciprocal public contract (approved conceptual integration, 22 November 2026)

[Payment Gateway](../payment-gateway/services-record.md) submits only **redacted technical diagnostic events**—provider connectivity, rejected webhook verification, timeout, reconciliation processing errors—with source code/severity, safe structured fields, operation correlation, source/observation time and trusted tenant context. Logging returns accepted/rejected/throttled/unavailable/uncertain intake, receipt where available, source-scoped authorised diagnostic query and sink health/loss signals. Logging owns diagnostic retention and delivery, **not** payment authorisation, capture, refund, provider truth or independently verified Audit evidence. A log receipt is never evidence of payment success. Its failure does not convert a confirmed payment into an unsuccessful payment; mandatory security/evidence capture is handled under the owning controls. No raw card data, credentials, provider secrets or unnecessary payer information. Source payment errors may first use [Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) for safe code projections, without requiring Logging to invoke the library.


##

## Process — reciprocal conceptual public contract (22 November 2026)

**Status:** Process-side owner-approved conceptual alignment in draft PR #121; neighbouring implementation/public API not asserted. See [canonical Process contract](../../capabilities/process/capability-record.md). Process submits bounded technical diagnostics (source event/code, stage/operation reference, severity, latency, opaque correlation, minimised fields) via Logging's trusted public intake and receives a qualified accepted/rejected/throttled/unavailable/uncertain receipt and delivery/health data. Process maintains its own business truth and Audit obligations. Logging absence does not invalidate a committed process decision; a diagnostic receipt is not Audit custody or domain success. This does not complete or replace the neighbouring review, and contract information flow does not imply a direct package-import edge.

## Product public-contract reciprocal relationship

**Product approved conceptual reciprocity (22 November 2026; Product PR #122):** Product supplies bounded, minimised technical diagnostics (catalogue validation, eBOM cycles, revision conflicts, importer/provider faults, performance) with trusted source/scope and opaque correlation, not engineering drawings, secrets or unredacted supplier payloads. Logging returns qualified intake status, authorised diagnostics and sink/backlog/drop health, never a Product commit or Audit receipt. Ordinary Logging outage does not reverse a valid Product transaction; independently mandatory security/evidence controls remain effective. Product's own published codes and outcomes remain authoritative; Logging's independent contract approval is unchanged.

## Pricing technical-diagnostic reciprocity — approved conceptual direction (22 November 2026)

[Pricing](../../capabilities/pricing/capability-record.md#errors-diagnostics-accountable-evidence-and-analytics) supplies trusted, minimised price/quote/promotion operation codes, technical severity, attempts, correlation, coarse revision and safe diagnostics. Logging validates/sanitises, returns accepted/rejected/uncertain intake receipt plus delivery/health and scoped diagnostic reads. It never establishes that a tariff was published, a coupon redeemed, or an Audit record stored. Logging outage ordinarily cannot undo a valid price operation; no secret tariff logic or private customer price data in logs. This note does not change Logging's independently approved contract.

## Project reciprocal public diagnostics — 22 November 2026

**Status:** owner-approved Project conceptual interface, not independent Logging contract adoption or implemented integration. [Project contract](../../capabilities/project/capability-record.md#error-normalisation-operational-logging-accountable-audit-and-reporting). Project submits minimised operation/error code, severity, correlation, latency, provider and reconciliation diagnostics (including baseline conflicts and failed graph validation); Logging returns qualified intake receipt, diagnostic reference and sink/coverage health through its public ports. No raw charter, budgets, personnel, credentials or protected evidence. Logging retains operational log authority but never commits a Project change, certifies milestone acceptance or substitutes for Audit; routine sink failure does not undo Project decisions.


## Search review — reciprocal conceptual interface (23 November 2026; draft PR #132)

**Status: Proposed Search-side specification, not an implemented or independently approved adapter.** [Search conceptual contract](../search/services-record.md) defines a replaceable, tenant- and scope-filtered derived index. The originating capability retains authoritative resource and disclosure decisions; Search accepts only minimised revisioned projections, permission/withdrawal evidence and scoped reconciliation, and returns candidate references, qualified freshness/coverage and index-application receipts rather than source finality. All sensitive snippets, suggestions, counts, facets, vector results and caches require visibility-safe query-time filtering; source action/detail requests must be reauthorised. Interfaces are host-composed and directional, with no circular package import. Existing approved decisions remain unchanged; differences must be reconciled before PR #132 merges.

## Reporting reciprocal conceptual interface — 23 November 2026

**Status:** Proposed in Reporting draft PR #129; not an implemented public API or approval of Reporting's full independent review. See [Reporting canonical conceptual contract](../../capabilities/reporting/capability-record.md).

Reporting sends scrubbed technical execution, query-budget, source timeout, export/render, provider, retry and distribution diagnostics with stable normalised code, correlation and latency; never raw report rows, candidate/personal records, report tokens or credentials. Logging returns its own qualified acceptance and sink health only. Reporting can use authorised diagnostic aggregates with explicit denominators/coverage, but log lines never establish completed business transactions, disclosure permissions or evidence custody; Logging failures cannot silently reclassify run success.

## Reviews reciprocal diagnostics interface (23 November 2026)

**Status:** REV-X01 Reviews-side conceptual relationship owner-approved on 23 November 2026 in draft PR #130; not an implemented Logging adapter or independent capability reapproval. [Reviews](../../capabilities/reviews/capability-record.md#error-normalisation-diagnostics-accountable-evidence-and-analytics--conceptual-public-contract) submits only trusted, minimised technical operation/error category/severity, latency, safe correlation and processing/provider/review-code failures. Never log redeemable codes, raw review text, receipts, personal identifiers or secrets. Logging returns qualified intake, permitted diagnostics and sink health/lag/drop status, not review commit, verified purchase or Audit evidence. Routine diagnostic unavailability does not roll back an already committed review; critical evidence requirements are separately enforced via Audit.

## Scheduler reciprocal conceptual interface — 23 November 2026

**Scheduler SCH-01–08 and the four-way Error Normalisation/Logging/Audit/Reporting input-output relationships explicitly owner-approved (23 November 2026); published runtime adapter not verified.** Scheduler supplies source-owned, safe structured execution diagnostics (operation, failure category, severity, tenant-scoped registration/occurrence/attempt references, trace/correlation, delay/lease/retry/provider uncertainty) after pure Error Normalisation returns safe code/messageKey and advisory classification. Logging accepts technical diagnostic intake and returns qualified intake/reference/health status, not proof of task completion, domain effect, Audit custody or notification delivery. Logging outage may not fabricate a successful run; required operational issue remains visible in Scheduler. Logger must not receive secrets/raw task payload by default. [Scheduler public ports](../scheduler/services-record.md#error-normalisation-logging-audit-and-reporting).

## Shop composition reciprocal diagnostic boundary — 23 November 2026

**Shop-side approved conceptual recommendation; Logging's independent public contract remains authoritative.** [Shop](../../compositions/shop/compositions-record.md#4-error-normalisation-logging-audit-and-reporting) supplies only server-approved, allowlisted technical codes, severity, operation, time, tenant/channel scope, opaque correlation and safe failure/latency classifications for storefront, Basket and checkout orchestration. No raw basket/order details, payment credentials, provider exceptions, customer profile, session tokens or private seller records. Logging returns its own accepted/rejected/throttled/unavailable/uncertain intake, authorised diagnostic reads and qualified sink/drop/health; it never confirms an Order, payment, Audit evidence or Reporting completeness. Error Normalisation is an optional pure producer-side projection, not a logging source of business truth. Ordinary diagnostics outage must not reverse committed domain results. No runtime adapter is claimed.

## `site-hosting` reciprocal interface — 23 November 2026 (SH-01–SH-06 owner-approved concept; integration unverified; PR #135)

Site Hosting is authoritative for verified hostname claim, binding and trusted request resolution. Logging receives sanitised structured diagnostics for verification attempts, DNS/provider errors, ingress rejection, route reconciliation and correlation; it does not establish binding state, Audit acceptance or TLS readiness. Avoid challenge secrets, raw credentials and personal identifiers in routine logs; preserve explicit unknown/degraded states. [Proposed Site Hosting contract](../site-hosting/services-record.md).

### `site-hosting` diagnostic exchange — 23 November 2026 (Site Hosting-side owner-approved; implementation unverified)

`site-hosting` supplies server-trusted, tenant/site-scoped, sanitised structured diagnostics for DNS lookup/verification failures, trusted-ingress rejections, proxy/TLS provider uncertainty and reconciliation, with stable code, severity, operation, timestamp and opaque correlation. Logging returns accepted/rejected/throttled/uncertain intake, scoped diagnostic queries, sink health and loss indicators; it does not validate domain control, prove committed routing, accept Audit custody or provide business reporting truth. Sensitive challenges, credentials, raw forwarding headers, private domain-claim associations and another tenant's data must not leak. Routine Logging outages do not reverse committed site bindings. [Site Hosting's conceptual contract](../site-hosting/services-record.md#error-normalisation-logging-audit-and-reporting).

### Storage — approved public diagnostic boundary (23 November 2026)

Logging may **receive** only sanitised Storage technical diagnostics: bounded error and severity codes, latency, provider failures, quota/admission/reconciliation failures, authorised source/tenant context, operation time and opaque correlation. No file bytes, signed URLs, object keys, provider credentials or raw exception stacks. Logging **returns** qualified accepted/rejected/throttled/unavailable/uncertain intake, scoped diagnostic queries and sink readiness/drop evidence; neither an accepted log nor an error-normalised message proves that a Storage write, deletion or Audit evidence capture completed. Storage continues its core operation if optional logging is unavailable, except separately defined security escalation. Use the host-composed public Logging contract, not a direct mandatory import. [Storage contract](../storage/services-record.md).

**Storage optional GUI (STO-01):** An authorised Storage operator may consume Logging's scoped diagnostic query/read model and sink-health status for failed transfers/reconciliation; the host must obtain separate Logging access permission. Render sanitised technical records only, not raw URLs/keys or evidence claims. Storage owns the dashboard and its custody results, not Logging.

### Subscription reciprocal public diagnostics — 23 November 2026

**Subscription-side refinement (23 November 2026, PR #137; owner-approved Subscription integration direction, not a change to Logging's separate approved contract):** Subscription sends trusted, allowlisted technical operation, renewal/reconciliation and provider-failure diagnostics with stable source-owned code, severity, opaque correlation, time and scope. Logging returns qualified intake receipt and delivery/health/read projections, not confirmation that a subscription committed, entitlement exists, or Audit accepted evidence. A log outage does not normally roll back a committed subscription; exclude raw agreement terms, payment credentials and personal data. [Subscription public exchange](../../capabilities/subscription/capability-record.md#error-normalisation-logging-audit-and-reporting--public-contract-interactions).

### Training conceptual contract alignment — 23 November 2026 (PR #145)

**Status: reciprocal proposal; Training decisions TRAIN-01–08 owner-approved, implementation unverified.** **Training → Logging:** Training publishes bounded operational diagnostics (safe event code, severity, correlation, latency/retry and source status), never raw learner work, grades, accommodations or private transcript. Logging health or acknowledgement is separate from Audit custody and cannot itself confirm or invalidate Training's domain result. See [Training's canonical conceptual contract](../../capabilities/training/capability-record.md). This note does not complete or supersede the neighbouring capability review.

## UI reciprocal presentation contract — 23 November 2026 (draft PR #146)

**Status:** UI-side owner-approved conceptual direction; no implementation integration or independent change to this counterpart's previously approved public contract. [UI contractual boundaries](../../presentation/ui/presentation-record.md#error-normalisation-logging-audit-and-reporting--reciprocal-public-interfaces-23-november-2026).

**UI diagnostic producer:** UI/host may supply bounded sanitised component/render/SSR/hydration fault codes, severity and trusted opaque correlation through Logging's published diagnostic intake. Logging returns accepted/rejected/throttled/unavailable/uncertain intake and scoped health. No raw user input, credentials or protected data; a log receipt never attests business success or Audit custody, and routine Logging failure does not block an otherwise valid user action.

## User presentation reciprocal public boundary — 23 November 2026

**Status: User-side owner-approved conceptual cooperation, not a new implemented API or independent approval of this capability's unfinished work.** [User conceptual presentation](../../presentation/user/presentation-record.md#5-error-diagnostics-audit-and-reporting-contracts) owns only transient group-scoped administrative UI. It may submit a minimised, sanitised **presentation-only diagnostic** (technical code, route/action class, safe time and opaque correlation) and receive intake/diagnostic status; authoritative IAM operations send their own logs. Logging receipts do not prove a domain change or Audit evidence. Missing, denied or uncertain outcomes are explicit; preserve tenant/purpose disclosure controls and acyclic public-port composition. Reciprocal design is proposed for this neighbour until its own contract is reconciled; no mandatory package import.

## Warehouse reciprocal interface — 23 November 2026 (PR #149)

**Warehouse (owner-approved Warehouse-side conceptual design, 23 November 2026; draft PR #149):** Warehouse submits authorised, sanitised handling/scan/provider technical diagnostics, severity and opaque correlation through Logging's public intake; Logging returns its own intake/delivery status and protected diagnostic views. Logging neither owns work completion nor Audit custody. Ordinary logging unavailability does not reverse a committed Warehouse operation; no live integration is asserted.
