# Storage — Service Record

**Artefact classification:** Technical service (CLS-09, approved 24 November 2026). **Prior governing/review classification:** Platform capability · **Conceptual status:** approved 23 November 2026 (STO-01–07 and subsequent standards, permissive-library, integration and GUI recommendations). **Implementation status:** published source contract inspected; conceptual additions not verified as implemented. **Merge status:** draft PR #136, not merged or merge-authorised.

**Authority and evidence:** accepted `nuxt-layers/architecture-rules` ADRs and normative Capability Standard prevail. Governing `master` checked at `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint `master` reconciled at `5f8f33ce5ddef318561c0aaaab1e6f0ce4f1ba61` (23 November 2026). Actual implementation: [`nuxt-layers/storage/CONTRACT.md`](../../../RESOURCES.md#ref-a32b30e2), inspected blob `746aad63a038ee59cee2860e65c3e2b3fb619e1c`; its behaviour is **documented, not independently tested here**. Distinguish this approved blueprint from the existing runtime contract throughout.

## Purpose and authoritative ownership

Storage is the **provider-neutral, server-controlled custody service for file bytes**. It owns scoped object placement, immutable keys, staged transfers, byte integrity checks, delivery, copy and deletion operations, technical usage measurements, provider lifecycle and object-level recovery coordination. Its source of truth for bytes is the configured object store. It is a technical service, not a stateless library, even though it does **not** own a business file-record database.

The consuming capability (for example Media, Publisher, Audit or Reporting) owns each file's **business identity, references, metadata, access rights, classification, scanning/eligibility, publication, retention/hold and lawful disposal decisions**. Storage does not own file catalogues, document versions, Audit evidence, reporting jobs, commercial entitlements, billing, database/Temporal backups or user-facing file management. Possession of a storage key or URL never proves disclosure permission. Host composition uses the accepted ADR-0012 public Files shape and stays within the governing 50-line integration budget. The provider adapter is replaceable; no vendor or host-specific contract leaks into consumers.

## Current published contract versus approved design

The existing, **server-only** API exports `storageFor(consumer, { contentTypes? })`, `storageTasks()`, `StorageService` and development/test configuration helpers. Consumers supply scope `{ caller, tenantId, groupId, dataRegion }`; signing also receives a consumer-obtained authorisation decision. Storage creates opaque `tenant/group/consumer/object` keys.

| Published operation | Input | Output / meaning |
|---|---|---|
| `put` | Scope, visibility, type, expected SHA-256/size, byte stream | New immutable object key |
| `signUpload`, `claim` | Scope, signing decision, expected upload facts; then staged key and visibility | Short-lived PUT URL/headers/expiry; verified claimed key |
| `multipart.start/signPart/complete/abort` | Scoped multipart intent, approved signing decisions, parts/IDs | Upload ID, part grants, completed key or abort; then `claim` |
| `get`, `head`, `list` | Scoped key or paginated listing | Byte stream and/or technical object facts; owned-namespace key listing |
| `copy`, `remove` | Scope, object key, desired copy visibility | New key or completed/idempotent live removal |
| `signDownload`, `publicUrl` | Scope, authorised private key or public key | Temporary private URL/expiry; constructed public address |
| `usage` | Trusted tenant and optional group/region scope | `{ bytes, objects }` — **observation, not quota admission** |
| `storageTasks()` | Host registers maintenance tasks | `storage.backup` and `storage.usage`, currently each scheduled every 24 hours |

Errors are published `StorageError` codes including `not-configured`, `adapter-refused`, `tenant-mismatch`, `region-not-honoured`, `not-authorised`, `validation-failed`, `checksum-mismatch`, `not-found`, and `provider-unavailable`; `already-exists` and `expired` are reserved. A safe `messageKey` accompanies each published error. The published contract states **no built-in permission policy, no screens, no business item records and no enforced quotas**.

Current host configuration provides an S3 provider in production, filesystem only in development, memory only in tests; a single configured region and four pre-provisioned buckets (**uploads, private, public, backup**). Unconfigured operations fail. Its documented signed URL default is 300 seconds (maximum 900). Upload staging and incomplete multipart operations expire after one day by configured lifecycle. The current root contract describes live deletion immediately and backup removal within 30 days, with the file owner responsible for replaying erasure decisions after restoration. These are **published claims awaiting operational verification**, not universal cloud-provider guarantees. The reported 70%/90% limits are warnings, not write admission.

**Owner-approved conceptual extensions, not shipped methods:** STO-02 concurrency-safe quota reservation/commit/release; STO-03 granular revocation/deletion/backup/restore evidence; STO-04 exact-action signing and trusted decision binding; STO-05 operation/reconciliation status and reliable event delivery where required; optional STO-01 operator presentation/health and effective policy read models. An implementation change must separately version/publish these ports and demonstrate host acceptance.

## Native lifecycle and key guarantees

1. **Configure:** the host/Infrastructure provisions one approved-region provider, buckets, restricted credentials, secret rotation, transport protection and explicit lifecycle policies. Refuse missing/mismatched configuration; never silently relocate or fall back to another region/provider.
2. **Stage and reserve:** an authorised owner requests a direct, signed or multipart upload with size, checksum, type, visibility and tenant/group/consumer scope. Approved STO-02 admission first reserves bytes and object count against an authoritative owner-supplied allowance. Signed grants are temporary and operation-bound. Staged bytes do **not** constitute a business file.
3. **Verify and claim:** check actual length and content SHA-256 independently of an S3 `ETag`; complete/claim idempotently, settle or release reservation and return a verified byte receipt. The owner separately commits the business file record and arranges orphan cleanup if it cannot commit; Storage does **not** attest malware safety or content legality.
4. **Read, copy or publish:** enforce current trusted, resource-specific domain decisions for protected operations. An immutable revision or change of visibility produces a new key; the owner changes its reference. `publicUrl` builds an address, **not** publication permission. Issued URLs and CDN caches may persist until expiry/purge.
5. **Delete and recover:** source owners resolve retention, references, holds and erasure authority. Storage performs approved deletion and distinguishes **access disabled / live objects removed / staged or replica copies removed / caches invalidated / backups expired / restore-erasure replay verified**. Each stage is completed, pending, blocked or unknown with time and evidence. Never re-expose restored data before replaying authoritative deletion instructions and checking region/permissions.
6. **Measure and reconcile:** report scoped bytes/count, usage freshness, reservation state, provider/backup health, orphan uploads, partial claims and unknown outcomes. Retry ambiguous provider writes only through idempotent reconciliation. Scheduled maintenance runs through the host's Scheduler/Clock; no execution or message broker is inherently owned by Storage.

**Invariants:** strict tenant/group/consumer isolation; no untrusted caller scope, decision, URL or region; server-side authorisation with purpose/assurance; no arbitrary visibility escalation; no file content, raw keys, credentials or signed grants in logs; digest equality is not content safety; unknown completion remains unknown; no instant revocation or exactly-once distributed delivery promise; no silent legal/compliance claim. Apply provider limits and rate/cost protection.

## Idealised public inbound interfaces

| Source and dependency | Information / command received | Authority and missing/invalid behaviour |
|---|---|---|
| **Host, Infrastructure — essential** | Selected provider, one allowed region, bucket roles, secrets/rotation, network/backup readiness and health | Host owns provisioning; Storage validates, otherwise fails closed |
| **Media, Publisher, Audit, Reporting and other file owners — essential per use** | Operation, consumer namespace, trusted tenant/group and resource context, type/size/SHA-256, required visibility, key/revision, idempotency/correlation and owner-approved lifecycle action | Source owns file meaning and permission; reject unscoped, conflicting or stale intents |
| **Identity, Authentication and Authorisation through trusted host — essential for protected actions** | Verified caller, tenant/group, assurance, current action/resource permission and policy version | Reject missing, stale, denied or merely client-asserted decisions |
| **Configuration, entitlement/Subscription, Privacy and Legal Compliance — conditional** | Region and policy limits, authoritative storage allowance, effective/versioned retention/hold/erasure instructions | Storage enforces technical limits; policy/domain owners decide entitlement and legal conflicts. Missing mandatory facts block relevant operations |
| **Client and S3 provider — essential for transfer** | Untrusted bytes/parts, headers, provider observations and checksums | Validate scope, observed bytes and completion; a provider timeout may be uncertain |
| **Clock, Scheduler and source restore/erasure record — conditional** | Trusted time, due task execution and durable authoritative deletion manifest/replay instructions | Expired grants rejected; unresolved restore/erasure evidence blocks re-exposure |

No browser obtains general provider credentials. Necessary shared facts include source and version, trusted tenant/group/actor, permitted operation, object revision, correlation/idempotency, policy effective time, data-region and observed/unknown state; **there is no mandatory universal request object**.

## Idealised public outbound interfaces

| Recipient | Storage provides | Authority, protection and completeness |
|---|---|---|
| **Initiating owner/client** | One-purpose staging grant, method/headers, signed expiry and constrained object key | Bearer capability for transfer only; not a file-record or disclosure decision |
| **File-owning domain** | Verified put/claim/copy/delete receipt, digest, byte size, revision, technical metadata and completed/pending/unknown state; authorised get/head/list | Storage proves only observed byte custody; owner controls file records, public disclosure, retention and derivatives |
| **Media, entitlements, Reporting and operators** | Scoped bytes/objects, observation time, reservations and applied technical admission status (once implemented), freshness/coverage | Current `usage()` only reports counts; consumption does not create prices, allowances or billing charges |
| **Infrastructure, Observability and authorised operations UI** | Provider/region readiness, incomplete transfers, backup checkpoints, recovery stages and reconciliation status (conceptual) | Explicit missing/partial/unknown evidence; never pretend unavailable measurements are zero |
| **Error Normalisation / Logging** | Source-owned stable errors, minimal safe technical diagnostic fields, occurrence/correlation and qualified operation outcome | No content, URLs, raw keys, secrets or untrusted stacks |
| **Audit / authorised MQ subscribers** | Selected typed, source-owned verified custody/security events: integrity failures, forbidden scopes, privileged changes, significant grants/deletions/restores | Events describe Storage observations, not legal erasure, authorised publication or an Audit receipt; sensitive event delivery requires durable reconciliation |

**Interaction model:** commands validate authority and idempotency, returning refused/completed/pending/uncertain; queries are bounded, source-scoped, timed and marked for partial coverage; events are versioned facts with stable source IDs, possible duplicates, delay or reordering. The published contract does **not** claim a durable event outbox; ADR-0012-aligned delivery is a future implementation concern where evidence guarantees demand it.

## Cross-capability cooperation and boundaries

| Partner | Storage needs | Storage supplies / definitive boundary |
|---|---|---|
| **Media** | Authorised file identity, expected bytes/type, region, visibility, deletion and allowance context | Byte custody, grants, verified claim, technical usage/admission. Media owns catalogue, scanning, derivatives and publication |
| **Publisher, Content Editor, Gallery** | Domain-owned resource, revision, disclosure or delegated Media decision | Scoped delivery only; no document version or user-facing file browser |
| **Audit** | Authorised evidence-attachment request, retention constraints and evidence intake policy | Protected attachment bytes and selected custody/security assertions; Audit owns evidential records, verification, receipt and holds |
| **Reporting and Export** | Authorised generated stream and source-owned saved artefact lifecycle | Persistence, retrieval, measured technical usage; Reporting owns reports/exports, Export is a stateless renderer |
| **Identity, Authentication, Authorisation** | Trusted caller, scope, assurance and action/resource decision | Protected byte operation result, not independent business access policy |
| **Configuration, Subscription, Privacy, Legal Compliance** | Effective policy, commercial allowance or legally resolved erasure/hold instruction | Technical admission, measurement and deletion/recovery evidence, not pricing or legal judgement |
| **Infrastructure / host** | S3 resources, credentials, region, lifecycle, optional PostgreSQL transactional admission port | Provider-neutral byte operations and object-level status; database/Temporal disaster recovery stays with Infrastructure |
| **Clock, Scheduler, Message Queue** | Time, due maintenance execution and optional transport contracts | Registered technical jobs and selected owned events; no Scheduler, MQ or Workflow job authority |
| **Content Security, Moderation** | Eligibility decision via file owner; scoped access to inspection bytes when approved | Custody and protected access only; no malware or moderation verdict |
| **Search, Federation, Location, SEO** | Source-owner-approved disclosure context where relevant | No searchable business identity, durable permalink, file access or index permission directly |
| **Accounting/Billing** | Optional commercial limits only via authority-owning domain | Usage evidence; no invoices, payments or billing decisions |

### Error Normalisation, Logging, Audit and Reporting

These are **independent** public-contract relationships, not a required `Storage → Logging → Audit → Reporting` chain.

| Component | Storage sends | Storage receives | Distinct authority |
|---|---|---|---|
| [**Error Normalisation**](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) | `StorageError` code/`messageKey`, owner-approved mapping, safe outcome/context and correlation | Pure safe API/technical error projections, classification and conditional retry **advice** | Stateless conceptual library, no records, retries, event delivery or authority over provider outcomes |
| [**Logging**](../logging/services-record.md) | Sanitised provider failures, timeouts, latency, capacity/reconciliation diagnostics | Diagnostic intake accepted/rejected/uncertain, authorised technical queries, sink health | Technical records only; log acceptance does not prove operation completion or Audit custody |
| [**Audit**](../../capabilities/audit/capability-record.md) | Registered significant scope denial, integrity, privileged configuration, grant, erasure and recovery facts, with source/actor/outcome evidence | Audit's independent accepted/pending/unknown evidence receipt, integrity and coverage query | Evidential custody, not debug messages; mandatory captures need source-owned durable outbox/reconciliation or approved fail-closed/pending semantics |
| [**Reporting**](../../capabilities/reporting/capability-record.md) | Approved aggregate byte/object/allowance/health/backup measurements, timestamps and known omissions | Authorised derived trends, capacity reports, queries and exports | Derived analytics, not byte source of truth, entitlement or compliance judgement |

Each consumer is independently authorised and receives only necessary fields. Errors do not prove commit or failure; logging success is not evidential acceptance; Audit receipts do not replace source measurement; Reporting outage cannot block ordinary Storage. Advanced event/analytics feeds are **conceptual**, not claimed as current `CONTRACT.md` exports.

## Safety, infrastructure and operational assurance

Use least-privilege S3 credentials and separate buckets/environments; the host owns administrative provisioning and secrets. Enforce TLS, controlled origin/CORS, bounded upload sizes, provider egress, presigned method/header constraints, risk-based stronger assurance and credential rotation. Do not equate an S3 `ETag` with SHA-256, a successful claim with content scanning, or an existing file with permission to deliver it. Guard confused-deputy actions, cross-tenant key probing, grant replay, metadata leakage, multipart exhaustion, visibility escalation, region misrouting, backup resurrection and operational denial-of-service.

**Approved quota model (STO-02):** the owning domain/entitlement authority supplies versioned effective bytes/object limits. Storage enforces atomic **reserve → upload → settle/release** across direct and multipart uploads; account for concurrent and abandoned reservations, expiry, failure and reconciliation. A strongly consistent small operational reservation index may use an existing host PostgreSQL service. It is **not** a business file catalogue. On admission uncertainty, refuse new quota-governed writes; do not automatically block authorised reads. Report technical results to owner; allowances, grace, pricing and exceptions remain owner policy.

**Approved recovery model (STO-03/07):** separately evidence refusal of new links, expiry of issued links, removal of live/staged/replica objects, cache purge, backup expiry and safe restore replay. State observed time, remaining exposure, provider-specific constraints and measured recovery-point/time objectives; no universal immediate revocation. Do not promise that a live deletion proves copies in caches, external recipients or backups are erased. Source owners and Privacy/Legal Compliance resolve lawful retention, holds and deletion. A restored backup must first reconcile tenant, region and surviving deletion manifests. Migrations require approved inventory, digest verification, access/revision transition, rollback and post-cutover erasure; never silently replicate across regions. No claim of UK GDPR compliance follows from technical controls alone.

**Provider and failure semantics (STO-04/05):** signed grants must derive from fresh trusted domain action/resource decisions with exact tenant/group/consumer/object, method, type, size and expiry. Use durable idempotency identifiers and limited technical reconciliation state for orphan uploads, unknown provider completions, replicas and high-risk operations. Where authoritative events require guaranteed delivery, define a Storage-owned durable outbox/reconciliation port; do not turn best-effort telemetry into evidential fact. Optional dependencies must have explicit disabled/unavailable modes.

## Standards and commercially permissive open source

**Owner-approved standards mapping (23 November 2026):** apply relevant controls, not a blanket certification claim.

| Reference | Storage design consequence |
|---|---|
| [ISO/IEC 27040:2024](../../../RESOURCES.md#ref-e80bacde), [27001:2022](../../../RESOURCES.md#ref-42fa42bb), [27002:2022](../../../RESOURCES.md#ref-d1765e3f) | Primary storage security lifecycle, risk governance, encryption/access controls, backup, evidence and disposal |
| [ISO/IEC 27017:2026](../../../RESOURCES.md#ref-48fc8ac4), [27018:2025](../../../RESOURCES.md#ref-3ffc7c99) where applicable | Cloud shared responsibility and conditional public-cloud personal-information safeguards |
| [NIST SP 800-209](../../../RESOURCES.md#ref-71d6aa98), [800-53 Rev.5](../../../RESOURCES.md#ref-5d98a8a6), [800-88 Rev.2](../../../RESOURCES.md#ref-ee67b17c) | Storage defence, control testing, backup and appropriately evidenced sanitisation |
| [NCSC Cloud Security Principles](../../../RESOURCES.md#ref-ca1f56e2), [ICO data-security guidance](../../../RESOURCES.md#ref-50823cb6), UK GDPR as applicable | UK national provider/security guidance and risk-appropriate lawful personal-data safeguards |
| [OWASP ASVS 5](../../../RESOURCES.md#ref-a1c367d2) L2 minimum, L3 where justified; [CSA CCM 4.1](../../../RESOURCES.md#ref-08c52c06) | Secure file handling, limits, scope, supplier control mapping and acceptance |
| [IETF RFC 9110](../../../RESOURCES.md#ref-96cfb1e6)/[9111](../../../RESOURCES.md#ref-b67b8213); [W3C WCAG 2.2 AA](../../../RESOURCES.md#ref-eb11cf7e) | Correct HTTP/caching behaviour and accessible optional screens |

**Approved open-source selection:** publicly available *complete* source, mature ongoing maintenance, commercially permissive licence, no open-core or delayed-source dependency. The core preferred adapter is [`@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner`](../../../RESOURCES.md#ref-4c3ccc5f) (**Apache-2.0**); [`@aws-sdk/lib-storage`](../../../RESOURCES.md#ref-aff2a60c) is optional for managed multipart. [Zod](../../../RESOURCES.md#ref-1e3efac4) (**MIT**) validates runtime input if aligned with platform conventions. [node-postgres/`pg`](../../../RESOURCES.md#ref-be910869) (**MIT**) is conditional for transactional reservations, preferably reusing host PostgreSQL. Reuse [OpenTelemetry JS](../../../RESOURCES.md#ref-8e380f73) (Apache-2.0) and [Pino](../../../RESOURCES.md#ref-5f05d959) (MIT) via platform Observability/Logging if selected; [Vitest](../../../RESOURCES.md#ref-c28ef17c), [fast-check](../../../RESOURCES.md#ref-ca191d3a) and [MSW](../../../RESOURCES.md#ref-203214f1) (MIT) are test-time options, not compulsory production dependencies. Prefer Node native cryptography over additional checksum packages.

Host-chosen production S3 can be Hetzner S3; independently test compatibility with fully open [SeaweedFS](../../../RESOURCES.md#ref-1bd76faa) or, if justified, [Apache Ozone](../../../RESOURCES.md#ref-c9b86bd5) (both Apache-2.0). Neither substitutes for provider-specific S3 conformance tests. MinIO **server** is not a preferred permissive choice (AGPL), and Redis, Neo4j, Elasticsearch or paid/open-core services are **not** required. Before a dependency is pinned, confirm the exact release's public source, licence/NOTICE, transitive licences, maintenance, security, Node compatibility and S3 behaviour; no library inventory is evidence of compliance or a completed package audit.

## Optional GUI and representative test-host composition

**Approved STO-01:** the **core is headless**. The published Storage contract provides **no screens**. The optional, independently authorised operator UI sits in the host's shared shell, using the same **sidebar → capability dashboard** pattern as Theme Manager in [`nuxt-layers-test/application-test-template`](../../../RESOURCES.md#ref-f1f7cc47) (README checked on `master` blob `9f7c3c72d71589b4fc81fa28f784f796c8918913`). The host owns menu entries, routes, branding, theme and tenant selection; Storage supplies optional public-contract-driven operating views. **Capabilities → Storage** and `/storage` are illustrative, **not** published routes or an automatic registration API. The template's unauthenticated Theme Manager test mode is for local testing, not production security.

| Screen | Public information/action; definitive owner | Permission |
|---|---|---|
| **Overview** | Storage usage, approved region, provider/backup readiness, pending work and observed time | Scoped read-only operator |
| **Usage & Quotas** | Storage byte/object/reservation measurements, source-owned limits; Reporting may supply independently labelled historical trends | Tenant/group operator; policy changes remain with entitlement owner |
| **Operations & Reconciliation** | Safe operation IDs, pending/multipart uploads, known/unknown claims and guarded idempotent retry | Operator read; elevated retry |
| **Backup, Deletion & Recovery** | Per-copy removal/backup evidence, restore readiness, impact preview and protected recovery command | Privileged, step-up/confirmation, source erasure/hold and Audit checks |
| **Provider Configuration** | Approved region, provider/bucket readiness, lifecycle policy, credential rotation *status* | Privileged; secrets managed by host, never displayed |
| **Activity & Evidence** | Logging sanitised diagnostics and Audit separately authorised accountable evidence | Independent access per source; no log-as-Audit or content browsing |

No generic browser/file downloader or exposure of raw keys/signed URLs. Provider/usage/backup views must distinguish **unconfigured, unauthorised, empty, stale, partial, unavailable, pending, degraded and unknown**. Never display zero for unavailable usage or healthy for missing backup evidence. Every read/action is authorised server-side for exact tenant, resource, operation and assurance; hiding the menu is insufficient. Reuse Theme Manager semantic tokens and localisation; meet WCAG 2.2 AA, accessible keyboard/focus/error handling, British English and responsive layouts. Disabling presentation leaves every headless contract operation usable.

**Representative journeys:** authorised operator opens Storage Overview from sidebar; examines quota reservation and source-owned allowance; resolves a pending multipart upload through guarded reconcile; or previews high-assurance recovery, with erasure replay verified before access. Logging and Audit panes show separately permitted, labelled diagnostic versus evidential sources.

## Conceptual acceptance scenarios — not executed

| Input / scenario | Expected output and authoritative boundary |
|---|---|
| Valid tenant-scoped bytes with matching SHA-256/size | Verified immutable key/claim; owning Media/consumer separately commits file record |
| Invalid checksum/type/size or forged caller/group/region | Refusal without cross-tenant disclosure, silent provider fallback or accepted claim |
| Two concurrent near-limit multipart uploads | Approved STO-02 atomic reservations admit only within effective allowance; current published `usage()` alone does **not** enforce |
| Repeated put/claim/remove, or provider timeout after multipart completion | Idempotent result or explicit pending/unknown and reconciliation; no invented success/failure |
| Owner authorises private download, then revokes access | Stop new grants; disclose residual validity of issued URLs; never promise instant purge |
| Copy to public visibility or replace published revision | Fresh source-owned publication authorisation and new immutable key; original link/cache remains separately governed |
| Hold/erasure instruction during backup or restore | Owner resolves conflicting policies; Storage prevents re-exposure until restore-erasure replay is verified |
| Usage query during outage or stale sampling | Unavailable/partial with measurement time; never zero-as-unavailable |
| Privileged recovery or sensitive configuration change | Server-side assurance, confirmation, safe status and required independent Audit receipt or pending/refusal |
| Unavailable Logging/Reporting, absent optional UI | Core byte operations continue; observability/reporting omitted or marked degraded; no mandatory menu |
| Unconfigured S3, mismatched region, untested substitute provider | Fail closed or explicit unsupported, not silent alternate storage |
| Optional GUI in host shell | Scoped sidebar entry, WCAG 2.2 AA, authorisation on server, no content/secret access, no reliance on test authentication |
| Invalid use as Media/Publisher catalogue or data-billing service | Unsupported: redirect to source owner or authoritative commercial capability |

## Decisions and completion boundaries

| ID | Owner-approved conceptual decision (23 November 2026) | Remaining implementation/assurance work |
|---|---|---|
| **STO-01** | Headless Storage with optional separate administrator/operator dashboard, no end-user file manager | Future UI public route/screen contract, independent role and accessibility acceptance |
| **STO-02** | Technical quota admission uses atomic byte/object reservations against domain-authorised effective limits | Versioned quota port, strongly consistent ledger design, concurrency/idempotency acceptance |
| **STO-03** | Granular measurable link, live/replica/cache, backup and restore-replay stages | Provider limits, retention and recovery objectives; live deletion is not whole-system erasure |
| **STO-04** | Trusted server-side action/resource grant binding and no public-link-as-permission | Reconcile current consumer-supplied decision shape and public URL semantics |
| **STO-05** | Minimal technical state for pending operations; reconcile orphans/ambiguous writes; durable owned outbox only where needed | Provider conformance, multipart limits and evidence delivery contract |
| **STO-06** | Acceptance requires CI/minimal host, isolation, signing, quota race, provider outage, restore and optional GUI evidence | Tests/builds **not executed**; implementation repository untouched |
| **STO-07** | Object backup/recovery stays with Storage; PostgreSQL, Temporal and platform disaster recovery stay with Infrastructure | Verify the root contract's backup lifecycle and 30-day claim, restoration evidence and governance alignment |

**Additional approvals:** standards selection, fully open commercially permissive library shortlist, public relationships with Error Normalisation, Logging, Audit and Reporting, and six optional operator screens are **owner-approved conceptual direction**, not verified current APIs.

**Conceptual review conclusion:** Storage's purpose, boundary, lifecycle, inputs/outputs, cooperation, provider/security constraints, GUI and acceptance requirements are defined; **no outstanding owner design choice is identified**. Conceptually complete **subject to final parallel-PR architectural reconciliation and governing/current-master validation**; **not** implementation-ready, not certified and **not merge-authorised**. This record has been reconciled with the current blueprint baseline; verify protected checks/CI and final mergeability before the authorised squash merge. The existing published root `CONTRACT.md` remains the integration authority until intentionally revised.
