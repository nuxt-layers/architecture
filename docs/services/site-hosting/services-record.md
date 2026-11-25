# Site Hosting — Service Record

**Artefact classification:** technical service (CLS-08, owner-approved 24 November 2026), not hosting infrastructure; optional administration screens. Established Platform responsibility in the governing catalogue, pending governing reconciliation.  
**Conceptual status:** **Complete and owner-approved** (SH-01–SH-06, standards, open-source direction, diagnostic/evidence/reporting boundaries and presentation, 23 November 2026).  
**Implementation status:** Unverified. The [`nuxt-layers/site-hosting`](https://github.com/nuxt-layers/site-hosting) repository exists, but no root published `CONTRACT.md` or operational API was verified; this is an **idealised conceptual contract**, not an implemented API.  
**Review:** draft PR #135 in [`architecture-blueprint-review`](https://github.com/nuxt-layers/architecture-blueprint-review). This blueprint is non-normative; accepted governing ADRs and the Capability Standard take precedence.  
**Canonical path:** `docs/services/site-hosting/services-record.md`. The public identifier remains `site-hosting`.

## Purpose and ownership

**Purpose:** Decide which verified hostname may serve which site, and resolve a trusted incoming hostname to that site's opaque reference. Support host-assigned platform domains and tenant-managed exact custom domains without binding the capability to a proxy, certificate authority, DNS registrar or cloud provider.

**Site Hosting alone owns:** installation-scoped hostname claims; unique reservations; scoped proof challenges and verification decisions; site bindings, aliases and primary-host selection; binding revisions; suspensions, transfers and release; trusted active-hostname resolution; source history and its durable change outbox. DNS proof establishes control evidence, **not** legal domain title or permission to access a tenant.

**Not owned here:** Identity's tenants/groups; Authentication's sessions; Authorisation's access decisions; Configuration's values; Publisher's content and canonical document addresses; SEO's redirects, sitemap and indexability; Federation's peer trust; Privacy/Legal Compliance's statutory decisions; Infrastructure's reverse proxy, deployment, certificate issuance/renewal, DNS-zone operations and provider credentials. A certificate or a reachable website alone cannot establish a valid site claim.

**Invariants:** Within one installation, a hostname has at most one active site binding. A parent tenant or domain owner gains no implicit access to child tenants or unrelated sites. Untrusted `Host` or forwarding headers never choose a tenant. Unknown, revoked, suspended and ambiguous hosts do not route to a guessed default tenant. Runtime routing does not need an interactive super-administrator session; protected content remains independently authorised.

## Native operations and lifecycle

1. **Register:** Canonicalise and validate the exact DNS hostname with public-suffix/IDNA policy. Reject invalid or reserved names, IP-literal custom domains, conflicting claims and wildcard custom domains. A host may explicitly configure installation-owned platform hostnames.
2. **Prove control:** Issue unpredictable, bounded, expiring, claim/site/operation-scoped challenges. Prefer DNS TXT; permit constrained HTTP proof only when safely supported by the host. Record trusted observation, method, origin, time and qualification. DNS presence is evidence, not perpetual ownership.
3. **Bind and activate:** Move through `reserved → proof-pending → verified → activation-pending → active`. An active mapping requires separately trusted confirmation that the host applied **the matching route revision** and that the necessary TLS identity/readiness is valid. A provisioning request or accepted command is **not** an applied route.
4. **Maintain:** Select one primary hostname per site and explicitly verified exact aliases; schedule revalidation on policy cadence, material change or takeover signals; reconcile DNS/proxy/TLS drift. Suspended, failed, unknown and revalidation-required states remain distinct.
5. **Withdraw or transfer:** Authorised release/suspension withdraws resolution and requests host route removal. A transfer requires authorised release by the current controller or an independently reviewed recovery/dispute procedure, never a second claim alone. Use revisioned transitions and observable rollback/reconciliation.

**Recovery:** Provider timeout, DNS failure, expired proof or unconfirmed TLS produces a qualified **pending/unknown/degraded** result, never invented success or rollback. Writes use expected revisions and idempotency keys; external retry is allowed only when the source can do so safely. Missing trusted ingress, required authorisation or critical owner state fails closed. Optional delivery systems may be unavailable without corrupting the claim register.

**Persistence:** Site Hosting owns its schema, claim history and durable event outbox through a host-provided storage connection. Persist only necessary, isolated evidence. Record revisions and disposal/hold obligations; never expose challenge secrets, provider credentials, raw requests or another tenant's claim information in public reads.

## Public input contract — what Site Hosting accepts

These are **approved logical interfaces**, not fixed TypeScript exports, HTTP paths or installed provider adapters.

| Producer / input | Required information and source authority | Failure and absence |
|---|---|---|
| **Administrator commands** | Scoped site/tenant target, trusted caller, operation (`register`, `issue-proof`, `verify`, `activate`, `set-primary`, `suspend`, `release`, `transfer-request`), expected revision and idempotency reference | Authorisation denial, conflict, invalid state or uncertain provider evidence returns an explicit safe result; no takeover or leakage |
| **Host request resolver** | Canonical external authority from a validated ingress/proxy trust chain and configured platform-domain context | Spoofed/conflicting forwarding data or unknown host is rejected; never silently fall back to another tenant |
| **Identity, Authentication and Authorisation** | Qualified tenant/site lifecycle, actor/assurance and resource/action permission decisions | Protected writes fail closed on absent, stale or uncertain required decisions |
| **Configuration** | Approved versioned site preferences, allowed aliases, domain policy, revalidation rules and effective scope | Security floors remain Site Hosting's responsibility; invalid mandatory settings block affected changes |
| **DNS/HTTP verification adapter** | Bounded TXT/default or explicitly permitted HTTP observations, trust/TTL/provenance, checked time and failure state | Stale, poisoned, inaccessible or contradictory evidence is not verified control |
| **Infrastructure/host adapter** | Applied/rejected/pending route revision, trusted ingress context, certificate identity/TLS readiness, withdrawal and reconciliation evidence | No activation without matching confirmed applied state; unknown stays pending |
| **Privacy and Legal Compliance** | Qualified retention, disclosure, lawful-hold, jurisdiction and transfer rules | Mandatory constraints must be met; no unsupported legal conclusion |
| **Clock / Scheduler** | Trusted time interpretation and scheduled revalidation trigger/receipt | Missed mandatory checks require explicit stale/unverified treatment, not silent continuation |
| **Other owners** | Optional Publisher/SEO/Federation endpoint context and qualified consumer requests | Context does not override hostname claims or another capability's ownership |

**Common validation:** exact-host matching only initially; safe IDNA and public-suffix handling, guarded DNS lookups and HTTP proof (SSRF/rebinding/redirect protection), bounded attempts, rate limits, hostile `Host` and `Forwarded` defence, trusted tenant context, data minimisation and server-side permissions. No universally mandated shared request object.

## Public output contract — what Site Hosting supplies

| Surface / consumer | Output and guarantee |
|---|---|
| **Trusted-host resolution** — host/router, authorised consumers | Active hostname → opaque site/tenant refs, canonical host, binding revision, source/freshness; otherwise explicit unknown, untrusted, suspended, forbidden, ambiguous or unavailable. **Not** a user-access grant |
| **Domain/status queries** — authorised administrators | Scoped claim and site association, primary/alias membership, proof result and expiry, desired/applied route state, independent TLS readiness, last check, revalidation action, revision and safe reason codes |
| **Verification result/challenge** — approved verifier, site manager | Expiring bounded challenge instructions and proof outcome; verification ≠ activation; never leak another claimant |
| **Desired routing plan** — trusted Infrastructure adapter | Authorised exact-host-to-site mapping, desired revision and withdrawal instructions; Infrastructure returns independently confirmed applied state |
| **Verified site-origin facts** — Publisher, SEO, Federation, host | Primary host, verified aliases, withdrawals, revision and effective time; cannot assert publication, indexability, peer trust or certificate issuance |
| **Committed lifecycle events** — Message Queue and approved subscribers | Illustrative `DomainClaimCreated`, `DomainProofVerified`, `HostnameBindingActivated`, `PrimaryHostnameChanged`, `HostnameBindingSuspended`, `HostnameBindingReleased`, `HostnameRevalidationRequired` with source event ID, tenant/site ref, revision, time and permitted provenance |
| **Scoped history and operational facts** — Audit, Logging, Observability, Reporting | Recipient-specific accountable decisions, safe diagnostics, qualified metrics and revisioned authorised aggregates; the claim register remains the sole business authority |

**Contract rules:** Commands report `accepted / pending / completed / rejected / unknown` accurately. Queries state scope, observed/effective time, revision, freshness and omissions. Events are emitted from committed owner state through its durable outbox, may be duplicated/out of order and support reconciliation; there is no exactly-once external delivery promise. A consumer event never grants access or changes hostname authority. Schemas, errors and codes require compatible versioning; unsupported registrar/certificate/zone actions return an explicit unsupported result.

## Cooperating capabilities — reciprocal information and ownership

| Cooperating owner | Information Site Hosting needs | Information Site Hosting provides |
|---|---|---|
| **Infrastructure / host** (essential for activation) | Trusted ingress and confirmed proxy/TLS applied state | Desired route/withdrawal revisions and approved hostname mappings; Infrastructure retains credentials and deployment |
| **Identity / Authentication / Authorisation** (essential for protected changes) | Tenant state, verified caller/assurance and access decisions | Resource/action context, binding associations and accountable decisions; no access grants |
| **Configuration** (conditional) | Effective, approved site/domain policy | Verified status and security-validation outcomes, not a competing settings store |
| **Publisher / SEO** (optional) | Published content-address context and redirect requirements | Verified site origins, primary/alias and withdrawal changes; no content rewriting or SEO policy |
| **Federation** (optional) | Protocol endpoint requirements | Verified local origin changes; no remote peer trust assertion |
| **Privacy / Legal Compliance** (conditional) | Applicable purpose, retention, disclosure/hold requirements | Domain evidence and disposition facts subject to qualified obligations |
| **Clock / Scheduler / Message Queue** | Trusted time, approved recheck execution, event transport | Revalidation requests/results and committed events; transport does not own claims |
| **Notifications / Workflow** (optional) | Approved delivery/approval outcomes | Proof expiry, transfer or incident prompts, never assumed approval |
| **Error Normalisation / Logging / Audit / Reporting / Observability** | Safe projection, diagnostic/evidence/analytical public ports and qualified receipts | Source-owned error and outcome context, sanitised technical events, accountable actions, revisioned facts and measured health |

Interactions use **directional host-composed public contracts**, not cyclical package imports. The conceptual host integration must respect ADR-0012's public one-operation composition and 50-line Nuxt host limit, with acyclic dependencies. Optional consumers failing must not disable valid core trusted routing. See related reciprocal capability records; their draft PRs remain provisional until reconciled.

## Error normalisation, Logging, Audit and Reporting

**Approved Site Hosting-side contracts (23 November 2026).** The four interfaces have distinct purposes and return separate receipts. Exact shipped adapters remain unverified.

| Recipient | Site Hosting input to its public contract | Output returned and boundary |
|---|---|---|
| **`error-normalisation` library** | Versioned source-owned code/definition, trusted known or uncertain outcome, bounded permitted context, disclosure purpose and correlation | Pure safe category, message key, public/technical projection and **advisory** retry classification; **no** network, state, business retry, logging, audit or reporting |
| **`logging`** | Sanitised DNS/HTTP, proxy/TLS, ingress, rate and reconciliation diagnostics with code, severity, trusted scope/time and correlation | Accepted/rejected/throttled/uncertain intake, scoped log lookup, sink/loss health; **not** a binding result or audit receipt |
| **`audit`** | Trusted attempts, authorisations/denials, verification, transfers, activation, suspension/release and significant policy changes with actor/assurance, source revision/event, time and outcome | Evidence acceptance/pending/rejection/uncertainty, evidence ID, authorised timeline and integrity/coverage; **not** proof that Audit owns the domain fact |
| **`reporting`** | Authorised tenant/site-scoped lifecycle status, verification outcomes, activation delays, correction markers, source revision, cut-off and unknown/coverage details | Authorised reports/aggregates/exports, run status, freshness/completeness; **not** business state, live routing, audit custody or rights to private tables |

**Examples:** A DNS timeout leaves proof `unknown`, with safe error and optional diagnostic log; Reporting must not count it as a confirmed ownership failure. A confirmed activation commits the binding, emits a revisioned event, and supplies independent Audit evidence and Reporting facts; a lost routine log/report does not reverse it. A denied transfer creates no binding change, hides other tenants' details, and sends proportionate security Audit evidence. When critical Audit capture is required, durably hand over the evidence or hold the sensitive operation safely according to policy. The source decides actual outcomes and safe retries; a timeout never proves rollback.

Source and recipient contracts: [error-normalisation](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs), [logging](../../services/logging/services-record.md), [audit](../../capabilities/audit/capability-record.md), [reporting](../../capabilities/reporting/capability-record.md).

## Security, privacy and legal controls

Apply **OWASP ASVS 5 Level 2**, with applicable Level 3 controls for takeover/privileged operations. Protect against hostile Host/Forwarded headers, SSRF/DNS rebinding, dangling DNS records, Unicode confusables, replay, CSRF, cross-tenant information disclosure, unsafe wildcard routing and domain-transfer abuse. Enforce separate access for viewing, registering, switching primary, transferring, releasing and operating infrastructure. Sensitive changes may require fresh phishing-resistant assurance and Audit evidence.

Use least privilege, provider-secret custody outside this capability, rate limits, scoped challenge expiry and revocation, secure storage, safe error projection and trustworthy logs without secrets. Keep personal/business-linked domain records proportionate, isolated, purpose-limited and held/disposed under Privacy/Legal Compliance decisions. A DNS answer or domain record alone cannot establish legal title.

**Accepted ADR-0014 provider requirements:** The **application**, not this capability, must verify hosting/storage provider security before use and at least annually or upon material provider change; record region, evidence and check date in the application's `RESOURCES.md`. Required provider evidence includes service/region-scoped ISO/IEC 27001 certification **or** SOC 2 Type II, a data processing agreement, published subprocessors, encryption in transit/at rest, timely breach notification and deletion assurances. Each tenant's data-region choice governs all copies/backups. A transfer outside the UK follows UK adequacy rules or an appropriate IDTA/SCC addendum and transfer risk assessment. A non-compliant provider must not be used; preserve provider-neutral Site Hosting ports. These **mandatory provider checks** are distinct from optional certification of the platform itself. Do not claim legal, security certification or live-provider compliance from this specification.

**Independent readiness indicators:** proof, binding, DNS observation, applied proxy route and TLS certificate status are separate; each carries checked time, provenance and uncertainty. Never show a global “healthy” result derived from an attempted operation alone.

## Applicable standards and guidance

Adopted as **conceptual design guidance**, not certification:

| Standards body / reference | Design use and owner |
|---|---|
| **IETF DNS:** [RFC 1034](https://www.rfc-editor.org/rfc/rfc1034), [1035](https://www.rfc-editor.org/rfc/rfc1035), [2181](https://www.rfc-editor.org/rfc/rfc2181); **IDNA2008** [5890–5892](https://www.rfc-editor.org/rfc/rfc5890); **DNSSEC** [4033–4035](https://www.rfc-editor.org/rfc/rfc4033) | Site Hosting: DNS naming/verification and safe IDNs; DNSSEC evidence when supported, not mandatory for all domains |
| **IETF HTTP:** [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110), [7239](https://www.rfc-editor.org/rfc/rfc7239) | Site Hosting and host: trusted authority and proxy forwarding boundaries |
| **IETF TLS 1.3:** [RFC 9846](https://www.rfc-editor.org/rfc/rfc9846) (supersedes 8446), [9525](https://www.rfc-editor.org/rfc/rfc9525) (service identity), [8555](https://www.rfc-editor.org/rfc/rfc8555) (ACME), [8659](https://www.rfc-editor.org/rfc/rfc8659) (CAA) | **Infrastructure:** certificate/TLS operations; Site Hosting: consume qualified readiness |
| **CA/Browser Forum TLS Baseline Requirements; ICANN transfer policy** | Certificate provider/Infrastructure: public trust; registrars: external ownership transfer. Neither constitutes Site Hosting site-binding authority |
| **OWASP ASVS 5; ISO/IEC 27001/27002/27017; UK NCSC Cloud Security Principles** | Secure access, domain takeover defence, records, supplier controls, resilience and cloud management; do not imply ISO certification |
| **UK GDPR and ICO privacy-by-design; applicable UK legislation** | Privacy and Legal Compliance qualify applicable obligations, retention and disclosure |
| **W3C WCAG 2.2 AA, WAI-ARIA 1.2; ETSI EN 301 549 and applicable UK accessibility duties** | Optional GUI accessibility, including keyboard, focus, status messages, semantic forms and effective date/version applicability |

Implement against the **effective maintained editions**, relevant errata and deployment law. Public Suffix List data is operational input, not a replacement for protocol/registry rules; IDNA UTS #46 processing is not unconditionally equivalent to IDNA2008.

## Open-source development direction

**Owner-approved minimal selection policy:** use wholly public source for the released functionality, commercially permissive licences (MIT/BSD/ISC/Apache-2.0 or equivalent), active maintenance and **no required proprietary, source-available, delayed community or feature-gated flagship component**. Pin reviewed versions; inspect matching release source, licence/NOTICE, transitive licensing, advisories, compatibility, container support and lockfile before adding dependencies.

| Candidate | Licence / purpose | Decision |
|---|---|---|
| Node.js built-ins: `node:dns/promises`, WHATWG `URL`, `node:crypto`, `fetch` | Existing Node open-source runtime; DNS TXT observation, URL/host parsing, scoped challenges and optional safe HTTP proof | **Prefer built-in** |
| [`tldts`](https://github.com/remusao/tldts) | MIT; registrable-domain/public-suffix checking | **Preferred**; not proof of domain control |
| [Zod](https://github.com/colinhacks/zod) | MIT; request/schema validation | Use existing platform validator; **Zod only if needed** |
| [`pg`](https://github.com/brianc/node-postgres) / [Kysely](https://github.com/kysely-org/kysely) | MIT; PostgreSQL access / optional typed SQL | Reuse existing owner-scoped persistence port; Kysely is optional |
| [`tr46`](https://github.com/jsdom/tr46) / [Undici](https://github.com/nodejs/undici) | MIT; optional Unicode conversion / bounded HTTP client | Only when justified by verified security requirements |
| [Pino](https://github.com/pinojs/pino) / [jose](https://github.com/panva/jose) | MIT; diagnostic logging / optional signed-token interoperability | Prefer Logging's public interface and built-in crypto; no mandatory new dependency |
| [Caddy](https://github.com/caddyserver/caddy) / [Traefik Proxy](https://github.com/traefik/traefik) | Apache-2.0 / MIT open-source proxy products | **Infrastructure only**, behind existing Coolify/provider-neutral handover; no proxy migration or proprietary feature requirement |

Do not add a separate DNS daemon, Redis, Elasticsearch, Neo4j or certificate provider dependency for ordinary domain proof and routing. This shortlist is **not** an assertion that every future transitive package/version has already passed a licence audit.

## Optional GUI and application integration

**Decision:** Optional **Site Hosting** dashboard, headless operation always available. The [`application-test-template`](https://github.com/nuxt-layers-test/application-test-template) on `master` has a shared shell, homepage `/`, test dashboard `/admin`, responsive **Capabilities** sidebar linking to **Theme Manager** (`/theme-manager`), top bar and Appearance controls. A derived test host should add **Site Hosting** alongside Theme Manager. The link opens the capability dashboard **inside the same shell**, not a new application. The reference template's unauthenticated Theme Manager `test` mode is local-only, not a production IAM example.

| Logical screen / illustrative route | Function via public interfaces |
|---|---|
| **Dashboard** `/site-hosting` | Site-scoped domain totals, primary hostname, proof/DNS/proxy/TLS readiness, warnings and next action |
| **Domains** `/site-hosting/domains` | Authorised searchable list, site and status, register action |
| **Add/verify** `/site-hosting/domains/new` | Guided exact-host entry, DNS TXT instructions/copy, proof check, pending route/TLS and result |
| **Domain detail** `/site-hosting/domains/:domainId` | Proof history, primary/aliases, recheck, suspension, release, controlled transfer and impact confirmation |
| **Routing health** `/site-hosting/health` | Site-scoped desired/applied revisions, verified status and safe reconciliation, without global host secrets |
| **Activity** `/site-hosting/activity` | Source-owned changes and links to separately authorised Audit/Logging/Reporting views |

These are **logical views and suggested routes**, not implemented page names or necessarily six separate files. The host owns menu registration, route selection and integration; Site Hosting owns bounded presentation and calls **only its public contract**. A future `CONTRACT.md` must describe optional presentation exports, route/menu contributions and a headless disable switch. The host must not import private implementation files or reimplement verification.

Hide unauthorised links **and** enforce all deep-link, API, export and action checks server-side; use fresh assurance for transfers, release and primary changes. Unknown or pending external effects must remain visible as such. Apply Theme Manager's semantic presentation vocabulary, WCAG 2.2 AA, keyboard/mobile/screen-reader support, internationalisation and safe status announcements. Never persist challenges or private domain associations in unsafe browser storage. Missing optional panels should degrade gracefully.

**INF-02 separation:** all Infrastructure administration, even read-only global infrastructure status and exports, belongs **only** to explicitly authorised installation host super-administrators. Site managers may see their own **redacted site-scoped** route/TLS readiness; they cannot manage proxy configuration, certificates or global diagnostics. The trusted hostname router has **no GUI dependency**.

## Representative conceptual acceptance scenarios

| Input or condition | Required outcome |
|---|---|
| Valid authorised exact-domain claim | Unique reserved claim and expiring challenge; not live |
| Valid DNS TXT proof, proxy/TLS incomplete | Verified proof and **activation pending**, not active |
| Host confirms matching route revision and valid TLS readiness | Active binding/query and committed activation event |
| Two independent sites claim the same host | Second claim rejected without revealing first claimant |
| Spoofed `Host` / `Forwarded` or unknown host | Rejected; never resolves to a private tenant default |
| Retry with same idempotency key | Same safe result; no second claim or event |
| Provider/DNS timeout or lost delivery | Unknown/pending with timestamps; safe reconcile/replay, no false rollback |
| Tenant closure, revoked proof or domain release | Scoped suspension/withdrawal; host reconciliation requested |
| Primary hostname changes with published content | Revisioned site-origin event; SEO/Publisher retain their own policy and content |
| Unauthorised transfer or global proxy request | Denial, safe redacted error, appropriate Audit evidence; no privilege escalation |
| Logging or Reporting unavailable | Relevant panel signals missing data; core binding/route remains valid |
| Site manager follows reference sidebar and wizard | Accessible in-shell dashboard; all deep links/API actions enforced server-side |
| No GUI or optional Federation/Notifications | Headless trusted routing and mandatory checks still work |
| Asked to issue TLS certificate or modify DNS zone directly | Unsupported by Site Hosting; Infrastructure/registrar boundary preserved |

## Decisions, evidence and completion

**Approved:** SH-01 installation-scoped unique claims and separate readiness; SH-02 default DNS TXT proof, bounded optional HTTP and safe transfers; SH-03 exact verified hostnames, one primary/approved aliases and no initial wildcards; SH-04 trusted applied proxy/TLS evidence; SH-05 optional tenant Domains GUI with INF-02 separation; SH-06 versioned public commands/queries/outbox events and idempotent reconciliation. The applicable standards, minimal permissive open-source direction and independent Error Normalisation/Logging/Audit/Reporting contract boundaries are also owner-approved, as is the optional sidebar-to-dashboard presentation design.

**Conceptual disposition:** The ownership, lifecycle, public input/output, dependencies, security, GUI and acceptance criteria are **complete for conceptual design**. No unresolved alternative requires another conceptual decision. This record does **not** declare a working installation, approved runtime contract, successful provider integration, certification or permission to merge.

**Technical checks still required:** Verify implementation evidence for accepted ADR-0014 provider assurance/region policy; validate IDNA/public-suffix and DNSSEC behaviour; prove hostname transfer, SSRF/rebinding and trusted proxy boundary safety; verify actual Coolify/proxy applied-route and certificate-ready evidence; review provider/data retention and release-specific licences. These are technical validation rather than reopened architecture questions.

**Implementation and acceptance still required:** Published root `nuxt-layers/site-hosting/CONTRACT.md`; versioned exports, provider adapters, capability-owned persistence/outbox, `STORAGE-REGISTER.md`, threat model, independently usable minimal host (ADR-0012), ≤50-line composition, error and event schemas, negative-path tenant/proxy/transfer tests, outage/replay recovery, GUI WCAG 2.2 AA/i18n, monitoring, and CI evidence. CI/user, not this conceptual review, executes builds/tests.

**Review and merge:** Keep PR #135 in draft until current-master governing/blueprint and overlapping reciprocal changes are reconciled, links/statuses and branch checks are validated, and the owner separately authorises any protected squash merge. The record's approval is **conceptual**, not merge approval.
