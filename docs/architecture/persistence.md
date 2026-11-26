# Persistence — approved architectural boundary

**Status:** Conceptual design approved 22 November 2026 (PERS-01–03 and subsequent refinements). **Classification:** cross-capability architectural responsibility, **not** an independent capability, runtime service, library or GUI. **Implementation:** no independent Persistence `CONTRACT.md` or verified implementation; each data-owning capability must publish its own root contract. This record is the single current blueprint specification; Git history preserves review evidence.

**Governing authority:** accepted [ADR-0002](../decisions/ADR-0002-composition-supplied-persistence-and-capability-owned-schemas.md), [ADR-0006](../decisions/ADR-0006-polyglot-persistence-and-data-store-security.md), ADR-0012, ADR-0015 and the Capability Standard, ahead of this non-normative blueprint. Baseline: governing `d7f7c2ee051244b8c81325f5ff1267568d99aab1`, blueprint `361566988ac53c55f6135e8acfa46cd5b013d7a0`.

## Purpose, decisions and authority

Persistence is the practice of retaining and recovering capability-owned information securely and reliably. It **does not** own data, schemas, policies, credentials, events, user permissions, global queries, migrations, operations or screens. Do not introduce a `PersistenceService`, shared business tables, cross-schema SQL, global CRUD API, central migration runner or mandatory ORM.

| Approved decision | Result |
|---|---|
| **PERS-01 — classification** | No standalone Persistence capability or public contract. Each stateful capability owns its authoritative data, schema, migrations, transactions, indexes, store port, outbox, lifecycle, retention, erasure and storage register. |
| **PERS-02 — operations** | The host/Infrastructure provides validated resources, connections, credentials, TLS, region, deployment and recovery. Optional administrative screens belong to Infrastructure, not Persistence. |
| **PERS-03 — documentation** | Retire `docs/capabilities/persistence/capability-record.md`; maintain this reference under `docs/architecture/`. Neither working nor governing capability catalogue lists Persistence. |
| **Supplementary safeguards** | Tenant isolation, server-side authorisation, least privilege, fail-closed absent resources, recoverable migrations, verified restores, source authority, provider-neutral ports and capability-owned durable outboxes. |

Each piece of information has **one authoritative owner and system of record**; caches, indexes and replicas are derived, rebuildable, scope-filtered and subject to retention, revocation, legal holds and erasure. Where PostgreSQL is used, give each owner its own schema and migrations, restricted roles and relevant row-level security; no direct cross-owner schema access or shared foreign keys. Other stores must preserve equivalent isolation and ownership.

## Distributed public input and output contracts

**Persistence exposes no independent commands, queries, events, endpoints or `CONTRACT.md`.** These are owner-specific integration responsibilities, **not** newly published function signatures. The host-composed interfaces and any source implementation are verified independently against their own published contracts.

| Public interface owner | Inputs received | Outputs supplied | Authority and failure |
|---|---|---|---|
| **Stateful capability** | Documented provider connection/pool; authenticated caller/tenant/assurance and access decision; validated domain commands, idempotency and expected version; effective legal/policy/retention constraints | Authorised records and results, source-owned committed domain events/outbox, schema/migration and backup requirements, scoped disposition evidence | Owner decides business truth and access. Invalid permission, wrong tenant, missing/unsafe store or unresolved hold fails closed. Commit may be confirmed, rejected or **unknown**, never guessed |
| **Host / Infrastructure** | Owner's schema/provider/region requirements, version compatibility, backup/recovery objectives and authorised operator commands | Validated scoped provider and connections; desired/applied readiness, schema compatibility, region, pool health, backup/restore verification, failure and recovery status | Host owns provider lifecycle, **not** other capabilities' records or migration meaning. Resource readiness does not prove transaction success |
| **Approved consumers** | Source-authorised, versioned read models/events and deletion/invalidation; applicable permission and disclosure context | Derived results, delivery state or evidence under their own contracts | No access to private tables, object buckets or unscoped raw records. Derived data never becomes authoritative |

### Interaction rules

**Commands:** Data owners validate subject, access scope, tenant, policy, expected revision and idempotency before changing state. The owner commits business change with its originating outbox in the same durable transaction where supported. If a timeout leaves commitment uncertain, reconcile through source status/idempotency rather than blind retry.

**Queries:** All filtering, including tenant/group and permitted resource scope, happens at the authoritative source **before** disclosure; return source/revision, consistency, as-of time, freshness, pagination, omissions and completeness where material.

**Events:** Only source-owned committed facts enter the source outbox. Message Queue transports them at-least-once; consumers handle duplicates, reordering and replay. A queue acknowledgement is not domain commitment, an Audit receipt or guaranteed downstream processing.

**Context and errors:** Carry proportionate trusted identity/tenant/resource, assurance, correlation, idempotency, version, time/Clock interpretation, policy/provenance and qualified outcomes, without imposing one universal request object. Treat missing evidence and unverified provider state as unknown; preserve useful safe error codes without exposing credentials or database details. Cross-capability distributed transactions and `migrateAll()` are unsupported; coordinate multi-owner actions through public contracts and workflows.

## Reciprocal capability relationships

These are **directional information exchanges**, not mandatory package imports.

| Related capability | Provides to data owners or Infrastructure | Receives back; retained ownership |
|---|---|---|
| [Infrastructure](../infrastructure/infrastructure/infrastructure-record.md) and host | Validated pool, region, credentials, backup/restore and operational readiness | Owner provider/migration requirements and owner-side integrity checks; Infrastructure controls only provider operations |
| [Identity](../capabilities/identity/capability-record.md), [Authentication](../capabilities/authentication/capability-record.md), [Authorisation](../capabilities/authorisation/capability-record.md) | Trusted tenant/person, assurance, verified access decisions and visible scopes | Authorised resource/action context and operation outcome; neither identity labels nor hierarchy bypass checks |
| [Configuration](../capabilities/configuration/capability-record.md), [Clock](../services/clock/services-record.md) | Valid effective settings and canonical time semantics | Qualified configuration/temporal state; settings cannot weaken legal/security floors |
| [Privacy](../capabilities/privacy/capability-record.md), [Legal Compliance](../capabilities/legal-compliance/capability-record.md), [Profile](../capabilities/profile/capability-record.md) | Applicable rights, residency, retention, hold and personal-data ownership | Scoped completion/blocked/unknown evidence; each owner executes its own lawful data lifecycle |
| [Storage](../services/storage/services-record.md), [Media](../capabilities/media/capability-record.md) | Authorised file and byte operations | Owner-approved file requests; object storage success never grants business rights |
| [Caching](../services/caching/services-record.md), [Search](../services/search/services-record.md) | Authorised derived search/cache results and lag/health | Source-owned projection, invalidation, revocation, erasure and correction signals; no new source truth |
| [Message Queue](../services/message-queue/services-record.md) | Delivery, replay and transport status | Committed owner outbox entries; transport neither owns nor creates source facts |
| [Logging](../services/logging/services-record.md), [Audit](../capabilities/audit/capability-record.md), [Reporting](../capabilities/reporting/capability-record.md), [Observability](../services/observability/services-record.md) | Distinct technical diagnostics, evidential receipts, qualified reports and telemetry | Independently authorised, minimised operational/source facts; no recipient gains database authority |

### Error Normalisation, Logging, Audit and Reporting

The [Error Normalisation library contract](../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) is **approved conceptually**, not verified as a shipped package root `CONTRACT.md`. Logging is conceptually approved, while Audit and Reporting interfaces cited here are conceptual and subject to their own reviews. None consumes an imaginary Persistence API.

| Recipient | Source/host supplies (input) | Recipient returns (output) | Limit |
|---|---|---|---|
| **Error Normalisation** | Recognised native/provider exception, approved versioned mapping, operation context, known/unknown outcome and disclosure profile | Safe stable code/category, `messageKey`, sanitised view, qualified retry `yes/no/conditional/unknown` | Pure, deterministic library: no retry, storage, logs, events or commitment decision |
| **Logging** | Safe structured connection/SQL failure **category** (not raw query values), migration/pool/retry diagnostic, source/severity, trusted scope and correlation | Accepted/rejected/uncertain intake, bounded diagnostics and qualified sink health/backlog/loss | Technical receipt does not prove business commitment, audit custody or remote delivery |
| **Audit** | Selected accountable security access/denial, sensitive modification, privileged migration, erasure, backup/restore verification or legal-hold action, with trusted actor, source event/outcome, provenance and idempotency/checkpoint | Accepted/pending/rejected/unknown evidence receipt, evidence identity, scoped integrity/completeness and review status | Audit owns custody, not source facts. Mandatory **critical** capture can require owner-enforced fail-closed/pending operation; ordinary source outbox may deliver later |
| **Reporting** | Authorised, versioned operation/incident/recovery facts, denominators, source corrections, coverage, as-of/freshness and permitted Audit/Logging/Observability aggregates | Scoped report/result/export, trends, exceptions, freshness, missing coverage and corrections | No private schema access, log-lines-as-business-totals or timeout-as-confirmed-failure; outage does not block source operations |

A provider timeout may be classified and logged, with a separately qualifying Audit event where policy requires it. Only the originating capability may confirm or reconcile business commitment; Reporting uses corrected authoritative outcomes. Each intake and receipt is independent.

## Security, privacy, provider and recovery controls

- **Security:** OWASP ASVS 5 Level 2 baseline (Level 3 for critical flows), per-owner database roles, encrypted connections and backups, strong secret/key custody, least privilege, prevention of tenant/group inference and server-side checks on each protected read and write. Use non-bypass PostgreSQL row-level security and transaction-local tenant context where appropriate; never rely on an unsanitised client-supplied tenant label.
- **Privacy:** privacy-by-design, lawful purpose, scoped retention, holds and erasure across derived copies/backups under assessed effective policy. Privacy/Legal Compliance own legal interpretation; technical architecture alone is not certification or GDPR compliance. Authentication retains its approved credential-ID exception.
- **Provider neutrality:** PostgreSQL is the default relational store, but justified polyglot storage is permitted. The host may share a cluster while keeping private schemas or deploy independent databases. No proprietary SaaS, platform-wide ORM, direct vendor SDK in owner public contracts or automatic extra datastore is required.
- **Deployment:** owner declares requirements → host provisions validated least-privilege resources/region → approved rollout applies owner-authored migrations → schema/tenant/isolation/readiness checks → operate, monitor, back up and **test restore** → reconcile source/outbox state on recovery. A partially applied migration blocks unsafe writes; backups without restore exercises are not proven recoverable. Agree and measure RPO/RTO for each deployment; distinguish desired, observed and unknown status.
- **Failure:** missing/wrong-version/wrong-region provider fails closed, with in-memory fallback only in explicit local/test mode. Mark remote-commit uncertainty, stale caches and incomplete event/audit/report coverage; do not invent durability or exactly-once distributed delivery.

## Established standards and regulatory guidance — approved conceptual mapping (22 November 2026)

The following references guide **data-owning capabilities and host Infrastructure**, not a non-existent central Persistence service. **Status:** owner-approved standards-selection recommendations for the blueprint; standards publication is verified against primary publishers, but implementation conformity, third-party certification and legal applicability are **not** established. Apply them proportionately to processing purpose, jurisdiction, threat model and provider. Accepted Nuxt Layers ADR-0002/0006/0012, the Capability Standard, OWASP ASVS 5 L2 (L3 for critical operations) and WCAG 2.2 AA remain governing platform floors; an external standard does not silently override a binding ADR.

| Authority / reference | Use within this architecture | Owner / applicability |
|---|---|---|
| [ISO/IEC 27001:2022](../../RESOURCES.md#ref-42fa42bb) and [ISO/IEC 27002:2022](../../RESOURCES.md#ref-d1765e3f) | Risk-based management and security controls: privileged access, encryption, change control, supplier assurance, incident response | Host/security governance; each source owner implements relevant controls; certification is a **separate** undertaking |
| [ISO/IEC 27040:2024](../../RESOURCES.md#ref-fbbdfd70) | Specialist storage-security design: media, encryption/key protection, access isolation and lifecycle | Source-owner storage ports and Infrastructure/provider environment |
| [ISO/IEC 27701:2025](../../RESOURCES.md#ref-b948c1e2) | Privacy information management, controller/processor responsibilities, information lifecycle | Privacy and Legal Compliance coordinate applicable policy; each source owner implements scoped processing |
| [ISO 22301:2019](../../RESOURCES.md#ref-85e985cf) | Continuity planning, service recovery objectives, exercises and evidence | Host/Infrastructure operates resilient services; data owners establish acceptable loss/restore and reconciliation objectives |
| [ISO/IEC 27017:2026](../../RESOURCES.md#ref-48fc8ac4) | Cloud security control guidance for hosted databases and providers | Host/operator and infrastructure supplier; avoid treating certification as an automatic requirement |
| [ISO/IEC 9075:2023](../../RESOURCES.md#ref-b335bb8b) (SQL family) | Relational database semantics/portability reference; assess actual PostgreSQL features and documented deviations | Each relational source owner; not a ban on PostgreSQL-specific capabilities or non-SQL stores |
| [UK NCSC Cloud Security Principles](../../RESOURCES.md#ref-ca1f56e2) | Provider assessment, protected data at rest, separation, service resilience and secure disposal | Infrastructure/host and supplier assurance |
| [ICO Guide to Data Security](../../RESOURCES.md#ref-223a59b6) / UK GDPR Articles 5(1)(f), 25 and 32 | Integrity/confidentiality, protection by design, appropriate security and recoverability; complementary retention, lawful erasure and residency obligations apply according to assessed circumstances | Privacy/Legal Compliance establish applicable duties; owning capabilities and host fulfil their assigned measures. Guidance notes pending legal updates, so recheck current law before use |
| [NIST SP 800-53 Rev. 5](../../RESOURCES.md#ref-3fd80945) | Supplementary control catalogue: AC, AU, CP, SC, SI and privacy controls | Security and audit risk-assessment crosswalk, not universally mandatory US federal certification |
| [NIST SP 800-88 Rev. 2](../../RESOURCES.md#ref-ee67b17c) | Sanitisation/disposal of physical, virtual and cloud storage media; establish provider-supported verification and backup lifecycle | Infrastructure/provider disposal with source-owner deletion/hold decisions |
| [OWASP ASVS 5.0.0](../../RESOURCES.md#ref-a1c367d2) | Application/server-side access, data protection, input validation and defensible verification criteria | Each source-owner implementation and host-facing service; mandatory project baseline L2 and relevant L3 |
| [W3C WCAG 2.2](../../RESOURCES.md#ref-0d1f555e) Level AA | Accessibility of optional Infrastructure operator screens, not a storage-engine protocol | Infrastructure presentation; preserve existing WAI accessibility, i18n and Theme Manager requirements |
| [PCI DSS 4.0.1](../../RESOURCES.md#ref-b32c0c68) | Specific controls for stored cardholder data and any system in the payment-card data environment | **Conditional** on actual cardholder-data scope and contractual applicability, with Payment Gateway/owning domain and Legal Compliance determining boundaries |

### Design and acceptance implications

1. **Minimum risk-based baseline:** source owners must document their owned store, tenant/group filtering, RBAC/row security as appropriate, TLS/encryption/key custody, migration/backward-compatibility controls, retention/erasure across copies, outbox consistency and provider-failure behaviour. Infrastructure documents provider trust, least-privilege credentials, backups, restore drills and data region.
2. **Evidence instead of assumed compliance:** each owner defines verifiable security and recovery acceptance, with provenance, applied versions, tested restore outcomes and scoped Audit/Logging/Observability evidence. No ISO certification, PCI attestation, GDPR compliance or successful production recovery is inferred from adopting a reference.
3. **Conditional regulatory rules:** qualified Legal Compliance/Privacy determine effective UK/EU and sector obligations, jurisdiction, effective date, legal holds and contractual supplier conditions; source owners apply them. No generic Persistence policy engine or global data-deletion operation is created.
4. **Operator presentation:** any datastore health/admin screen is an Infrastructure function accessible only to explicitly authorised **host super-administrators** under INF-02, meeting WCAG 2.2 AA; it cannot expose domain tables or privileged generic SQL.
5. **Version governance:** track the published edition and later amendments at each implementation review; new standards are assessed for relevance instead of automatically becoming new mandatory package dependencies.

## Complete-source, commercially permissive open-source technology selection (22 November 2026)

**Owner-approved selection criteria:** prefer mature maintained projects whose entire *recommended component* is publicly available at current upstream revisions under an OSI-compatible permissive licence, free for commercial deployment, modification and self-hosting; no open-core dependencies, feature-locked community distributions, delayed community-only releases or compulsory proprietary managed control planes. Licence, dependency and release reviews must be performed on the exact pinned revision before adoption. Commercial support sold separately does not disqualify a fully free community codebase. **This is an approved technology shortlist, not a mandatory cross-capability package or a claim of implemented integration.**

### Primary minimal stack and placement

| Project / upstream source | Licence | Intended role and choice | Boundary / evidence |
|---|---|---|---|
| [PostgreSQL](../../RESOURCES.md#ref-fa79609e) | PostgreSQL License (permissive) | **Default open-source relational engine** operated by host Infrastructure; keep the existing PostgreSQL 18 environment baseline while assessing newly released major versions separately | Complete community source; owner-specific schemas, policies, transactions, RLS and migrations remain with their respective capability |
| [node-postgres / pg](../../RESOURCES.md#ref-be910869) | MIT | **Default Node/TypeScript driver** and ADR-0012 `pg`-compatible host pool | Host provides connection; each data-owning capability implements its own published store port |
| [Kysely](../../RESOURCES.md#ref-af839a5b) | MIT | Preferred **optional** type-safe SQL query builder when a source owner needs one | Internal tool, not a platform-mandated runtime API, business policy engine or schema owner |
| [node-pg-migrate](../../RESOURCES.md#ref-5221a10b) | MIT | Preferred **optional** migration authoring/execution tool per source-owner schema | Capability ships and versions its own migrations; approved host/operator rollout executes them |
| [PgBouncer](../../RESOURCES.md#ref-dd9ecc22) | ISC | Optional Infrastructure connection pooler when load/capacity warrants | Host lifecycle; check session/transaction pooling, prepared statements, `SET LOCAL` and transaction assumptions |
| [pgBackRest](../../RESOURCES.md#ref-82a8bc20) | MIT | Preferred Infrastructure backup, PITR and restore candidate | Backups require real restore exercises and source-owner verification; do not assume object-store features replace DB recovery |

### Approved alternatives and narrowly scoped optional extensions

| Project / source | Licence | Use only if justified |
|---|---|---|
| [Postgres.js](../../RESOURCES.md#ref-624c1eac) | Unlicense | Alternative driver; not the ADR-0012 default `pg`-compatible pool, so avoid imposing it on consumers |
| [Drizzle ORM](../../RESOURCES.md#ref-03cb5387) | Apache-2.0 | Alternative owner-local SQL/ORM tooling; choose it **instead of**, not automatically alongside, Kysely; assess tooling/dependency licences separately |
| [pgvector](../../RESOURCES.md#ref-863156a4) | PostgreSQL License | Owner-authorised vector indexing; Search or the owning source defines permissions, lifecycle and invalidation |
| [Apache AGE](../../RESOURCES.md#ref-0f60ec0d) | Apache-2.0 | Optional graph extension for genuine graph workloads; verify exact PostgreSQL-major-version support and source/packaging compatibility |
| [pg_cron](../../RESOURCES.md#ref-54c57554) | PostgreSQL License | Database-local housekeeping or TTL under Infrastructure/owner policy; not platform Scheduler's business workflow |
| [PGMQ](../../RESOURCES.md#ref-c40afaea) | PostgreSQL License | Message Queue's provider choice for PostgreSQL-backed transport; originating capability still owns outbox/events |
| [libpg_query](../../RESOURCES.md#ref-7d7aa078) | BSD-3-Clause / PostgreSQL | Optional internal SQL parsing/analysis tools; not a normal query runtime requirement |

### Exclusions and selection safeguards

- **Exclude** software whose required functionality is withheld in proprietary/paid editions, whose public source is materially stale relative to the required production implementation, or whose licence restricts commercial modification/distribution. Do not build the baseline on Neo4j, Redis, Elasticsearch or similar open-core/licensing compromises merely because partial community source exists.
- Prefer the **smallest necessary subset**: PostgreSQL + `pg` is sufficient for many owners. Kysely and migration tooling are deliberate *owner-local* choices; PgBouncer and pgBackRest are *host operating* choices; search, graph, scheduling and queue extensions retain their own capability boundaries.
- Full project source availability **does not imply** all bundled binaries, plugins, fonts, example data, dependencies or third-party hosted services share its licence. Capture exact upstream repository, revision, SPDX and transitive dependency/SBOM evidence, security maintenance, release cadence, supported Node/PostgreSQL versions, and whether any recommended feature depends on a nonfree service.
- **No mandatory universal ORM, migration service, shared DB client SDK or schema registry.** Preserve ADR-0012's documented pool shape, per-owner schema/data responsibility and 50-line Nuxt host composition budget.
- The current infrastructure acceptance baseline uses PostgreSQL 18. PostgreSQL 19 was announced on 19 November 2026; a new major release is **not automatically a validated production upgrade**. Evaluate compatibility and extensions separately, without replacing established baseline by declaration.
- **Do not select WAL-G as an unqualified all-permissive recommendation:** upstream documents optional LZO support licensed GPL-3.0+. Its core may be Apache-2.0 but the complete selected build and dependency licences must be reviewed. pgBackRest is the simpler fully permissive backup default.
- **Implementation acceptance:** use CI/user-executed integration, privilege isolation, extension compatibility, migration rollback/fail-closed, backup/restore and operational security verification. Selection is not certification or production proof.

## GUI and test-host integration

**No Persistence menu, routes, dashboard or screens.** Ordinary business data is managed through its owning capability. Operational presentation, if needed, belongs to Infrastructure under approved INF-02; even its status pages and deep links are visible only to **explicitly authorised host-application super-administrators**, never ordinary users, tenant/group administrators or lesser host administrators. The role does not bypass tenant business-data protection.

The actual [application-test-template](../../RESOURCES.md#ref-8c941ad8) supplies homepage `/`, an admin/test area `/admin`, responsive sidebar and Theme Manager `/theme-manager`. Its [Nuxt config](../../RESOURCES.md#ref-68dbcd7d) enables **local-only** unauthenticated Theme Manager test mode, which must never serve production operations.

| Infrastructure page (proposed, not shipped) | Input via authorised public contracts | Presentation / permitted output |
|---|---|---|
| **Infrastructure overview** (e.g. host-defined `/admin/infrastructure`) | Host provider readiness, checked-at time, region, health/uncertainty | Healthy/degraded/unavailable/**unknown** status and navigation; never claim domain success |
| **Database services** | Version, connection/pool capacity and provider region | Read-only bounded operational inventory, no credentials, raw SQL or domain rows |
| **Schema and migrations** | Per-owner published version prerequisites and verified applied/migration status | Read-only compatible/blocked/failed view; no cross-capability `migrateAll()` |
| **Backups and recovery** | Host backup/restore evidence, RPO/RTO, test result and retention | Verified vs unverified recovery and evidence links; sensitive actions only under recent strong assurance and recorded approvals |
| **Diagnostics / controlled maintenance** (optional) | Independently authorised Logging/Observability/Audit context and specific host maintenance requests | Scoped links or approved pending/completed/failed/unknown workflow; no general table explorer or arbitrary queries |

Host controls sidebar/menu and routes; Infrastructure owns future operating status/management interfaces; Theme Manager supplies semantic styling. Server-side authorisation applies to menu, APIs, deep links and exports. Require responsive design, keyboard support, WCAG 2.2 AA, localisation, safe redaction and accurate partial/missing evidence. CLI/bootstrap and recovery **must** remain usable without a GUI.

## Conceptual acceptance criteria

| Scenario | Expected behaviour and authoritative proof |
|---|---|
| Owner receives a valid provider/tenant-scoped command | Authorised durable source result and atomic owner outbox; result distinguishes commit from pending/unknown |
| Missing provider, wrong region, schema incompatibility or partial migration | Owner refuses unsafe operations; host reports qualified readiness/failure; no implicit in-memory fallback |
| Tenant A requests tenant B data, including via Reporting/GUI | Denied before disclosure; no sensitive count, cross-schema access or parent-admin bypass |
| Duplicate command, outbox relay outage or reordered event | Idempotent owner outcome and eventual replay without duplicate business effects; no exactly-once claim |
| Timeout after possible write | Source reconciles through idempotency/status; Error Normalisation and Logging never assert transaction rollback |
| Privacy erasure collides with hold, cached copies or backup retention | Owner enforces effective constraints, revokes derived views and reports completed/blocked/unknown state with evidence |
| Important security change with mandatory Audit capture | Source emits attributable evidence and honours its approved capture tier; Audit receipt and source commit remain distinct |
| Backup exists but restore test missing/fails | Infrastructure does not assert verified recoverability; source owner validates restored invariants |
| Reporting source facts are incomplete/stale or corrected | Report labels gap/as-of/freshness, reconciles corrections and protects aggregate disclosure |
| Host super-admin opens Infrastructure dashboard | Only authorised scoped provider/status, truthful unknowns and evidence links; no raw business tables |
| Tenant admin or direct URL accesses operations dashboard | Server-side denial, no private metadata leaks, no menu entry |
| Host has no GUI or test template's unauthenticated mode is exposed | Headless recovery still works; production test-mode exposure is prohibited |
| Consumer asks for universal persistence CRUD, global SQL or atomic cross-owner transaction | Explicitly unsupported; use owner public contracts and cross-owner orchestration |

These are **design acceptance requirements**, not executed test results.

## Completion and implementation handover

**Conceptually complete for the approved classification:** PERS-01–03, authority and exclusions, owner/host public handover, reciprocal relationships, security, lifecycle and failure, standards, eligible complete-source permissive libraries, GUI disposition and acceptance criteria. No independent Persistence `capability-record.md` or `CONTRACT.md` should be regenerated: the approved directory retirement is intentional.

**Not an implementation/merge sign-off:** check each actual capability root `CONTRACT.md`, host integration, version-pinned licence/SBOM, PostgreSQL 18/driver/extension/pool semantics, tenant/RLS/migration/outbox and backup/restore tests through user/CI; reconcile concurrent conceptual PRs; re-check latest governing/blueprint masters, protected checks and conflicts. This architectural reference does not change normative ADRs or prove compliance. Keep the review PR draft and unmerged until separately authorised.

## Architectural relationships

- [infrastructure](../infrastructure/infrastructure/infrastructure-record.md): Infrastructure supplies validated resources and operates provider recovery; source owners validate restored invariants.
- [application-composition](application-composition.md): Host supplies scoped provider connections through documented ports.
- [identity](../capabilities/identity/capability-record.md): Protected owner operations use trusted scope, assurance and access decisions.
- [authentication](../capabilities/authentication/capability-record.md): Protected owner operations use trusted scope, assurance and access decisions.
- [authorisation](../capabilities/authorisation/capability-record.md): Protected owner operations use trusted scope, assurance and access decisions.
- [configuration](../capabilities/configuration/capability-record.md): Effective settings and canonical time semantics remain independently owned.
- [clock](../services/clock/services-record.md): Effective settings and canonical time semantics remain independently owned.
- [privacy](../capabilities/privacy/capability-record.md): Applicable rights, retention, holds and personal-data authority remain separate.
- [legal-compliance](../capabilities/legal-compliance/capability-record.md): Applicable rights, retention, holds and personal-data authority remain separate.
- [profile](../capabilities/profile/capability-record.md): Applicable rights, retention, holds and personal-data authority remain separate.
- [storage](../services/storage/services-record.md): File and byte operations preserve source ownership.
- [media](../capabilities/media/capability-record.md): File and byte operations preserve source ownership.
- [caching](../services/caching/services-record.md): Derived projections, invalidation and erasure do not establish source truth.
- [search](../services/search/services-record.md): Derived projections, invalidation and erasure do not establish source truth.
- [message-queue](../services/message-queue/services-record.md): Transport delivers source-owned outbox entries without owning events.
- [error-normalisation](../libraries/error-normalisation/stateless-library-record.md): Independent error, diagnostic, evidence and reporting boundaries; no shared persistence API.
- [logging](../services/logging/services-record.md): Independent error, diagnostic, evidence and reporting boundaries; no shared persistence API.
- [audit](../capabilities/audit/capability-record.md): Independent error, diagnostic, evidence and reporting boundaries; no shared persistence API.
- [reporting](../capabilities/reporting/capability-record.md): Independent error, diagnostic, evidence and reporting boundaries; no shared persistence API.
- [observability](../services/observability/services-record.md): Independent error, diagnostic, evidence and reporting boundaries; no shared persistence API.
