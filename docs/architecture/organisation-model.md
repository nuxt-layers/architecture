# Organisation Model — Architecture

**Catalogue name:** `organisation-model` · **Canonical record:** `docs/architecture/organisation-model.md`  
**Status:** Owner-approved **conceptual design**, OM-D01–OM-D06 (22 November 2026); **non-normative**, not an implemented or released artefact. No separate implementation repository or published root `CONTRACT.md` was verified.  
**Artefact classification:** architecture / organisational archetype model (CLS-05, owner-approved 24 November 2026). No independent package, service or database is approved. A future definition-owning capability requires a separate evidence-based classification decision.  
**Authority:** Accepted ADRs and normative [Capability Standard](../standards/capability-standard.md) prevail. Opening `architecture/master` `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint `master` `361566988ac53c55f6135e8acfa46cd5b013d7a0`. Review protocol (former document: review protocol).

## Purpose, classification and ownership

Define and validate **reusable organisational archetypes**: company, club, committee, department, office, business and domain-specific variants. Definitions describe typed fields, **position types**, **non-authoritative relationship types**, requested capability/role profiles and proposed configuration defaults. Their meaning, permitted structures and version history can be reused without coupling to Nuxt or a database.

**Classification gate (OM-D01):** Static validation is a stateless schema library responsibility. An organisation's approved archetype selection and overrides are **Configuration-owned**; host application composition provides feature wiring and navigation. Promote a distinct Model definition-owner only if several independent consumers demonstrably need one governed catalogue with authoring, approval, immutable publication, effective-time resolution, compatibility and migration history that existing owners cannot supply. This is a future **evidence and classification gate**, not approval of a standalone capability. The current artefact remains architecture. Prefer a modular monolith and the smallest integration surface.

| Definition semantics conditionally owned by Model | Facts and decisions that Model **never** owns |
|---|---|
| Namespaced archetype IDs, fields/constraints, definition versions, provenance and compatibility | **Identity:** tenant/group IDs, group tree, actual memberships, standing and digital ownership |
| Position/relationship **types** and validation of allowed shapes | Actual appointments, reporting chains, service relationships, real directors or legal entities — the relevant existing governance/domain owner, not an invented Model register |
| **Suggested** roles, feature selection and default settings | **Authorisation:** grants/access decisions; **Subscription:** commercial entitlements; **Configuration:** applied selections/settings; **host:** provisioning, enablement and routes |
| Definition publication/retirement events **only if** Model becomes their durable owner | **Workflow:** approval process; **Audit:** evidence custody; **Metadata:** domain vocabulary/ontology; **Publisher:** human-readable policies/publications; **Legal Compliance/Verification:** qualified legal status |

**Non-negotiable:** A template, reporting relationship or position title does not grant rights, make a person an officer or alter Identity's group hierarchy. Organisation type, tenant, bill-to entity, entitlement, provisioned capability and personal authorisation are distinct. A parent tenant has no implicit child-data access. No copied private domain records or shadow IAM hierarchy.

## Native behaviour, versions and lifecycle

If a distinct catalogue is justified, its conceptual information is: `ArchetypeDefinition` (namespace/id, fields and constraints), `Revision` (immutable version/digest, approval/source, effective interval and status), `PositionType`, `RelationshipType` (typed endpoints/direction; expressly **not** an access grant), `SelectionProposal` (suggestions only), and `MigrationDescriptor` (compatibility, affected references and owner actions). These are **business-level values**, not fixed storage types.

**Lifecycle (OM-D02):** draft → validated → awaiting approval where required → published/effective → superseded/retired; rejected/withdrawn drafts remain distinct. Published revisions are immutable, historically resolvable where lawful and versioned by effectivity through Clock. Compare changes for breaking compatibility; a new revision **never silently updates an applied selection**. Migration needs impact preview, proper authorisation, owner sign-off, expected revision, idempotency and recovery. Retiring a referenced version cannot erase its authorised history.

**Minimum services:** schema validation (always); type and reference checks; version/compatibility assessment; safe definition lookup/export; and, *only after the classification gate passes*, guarded draft management, publication/retirement, reconciliation and provenance-preserving committed change events. Unknown schema/dialect, untrusted actor/scope, conflicting revisions, invalid or stale approval, unsupported migration and uncertain provider outcomes must fail with explicit safe results. Missing optional UI/Reporting/Metadata must not interrupt core validation.

**Provider/infrastructure mode:** no third-party provider is essential. Treat imported catalogues as untrusted, versioned data with verified provenance, licensing, withdrawal, compatibility and exit/export paths. Use existing platform persistence, Clock and event ports; a PostgreSQL-backed Model store and its transactional outbox are **conditional** on independently owned durable publication. Neither a new graph database nor queue/search engine is required.

## Approved idealised public input contract

These **eight logical inputs are the planned business contract**, not shipped routes, functions or `CONTRACT.md` exports. Sources must supply trusted evidence where required; merely receiving an event is not authorisation.

| ID | Incoming information / source | Validation and absence behaviour |
|---|---|---|
| **OM-I01** Define/validate | Author or host supplies archetype name/namespace, typed fields, structural and relationship types, proposed defaults, expected revision | Bound size, complexity, dialect and references; reject invalid, unsafe or incompatible schemas |
| **OM-I02** Govern/publish | Trusted actor and Authentication assurance; Authorisation decision; Workflow approval bound to exact revision; intended effective time | Recheck at commit; missing/stale approval or rights **denies**, not publishes |
| **OM-I03** Resolve organisation | Identity supplies authoritative tenant/group reference, standing and scope | Missing, stale or contradictory binding context blocks protected actions |
| **OM-I04** Resolve applied choice | Configuration supplies approved selected version, settings, overrides, source and revision | Configuration is **sole effective-selection owner**; Model defaults cannot override mandatory policy |
| **OM-I05** Evaluate role hints | Authorisation provides registered roles/permissions and independently evaluated access result | Unknown role/profile fails safely; template cannot issue grants |
| **OM-I06** Evaluate feature hints | Subscription, host and domains supply entitlement, installation, provisioning, enablement and readiness separately | Unavailable/unknown is not enabled, paid, authorised or completed |
| **OM-I07** Apply constraints | Legal Compliance, Privacy and where needed Verification supply qualified jurisdiction, restriction, retention and claim evidence | No unverified legal status, permission or privacy exemption |
| **OM-I08** Import/migrate | Authorised owner supplies source version/provenance, target revision, impact scope and idempotency reference | Validate compatibility and affected-owner approval; return held/conflict/unknown where appropriate |

## Approved idealised public output contract

| ID | Information supplied / permitted consumers | Guarantee and limit |
|---|---|---|
| **OM-O01** Definition resolution → Configuration/host/authorised domains | Namespaced immutable schema, version, digest, provenance, effective/retirement status; **not** actual group standing |
| **OM-O02** Validation/compatibility → editors and integrations | Safe codes/`messageKey`, field errors, warnings and migration compatibility; **not** a legal decision |
| **OM-O03** Proposed composition → host and Organisation Console | Suggested menus, capability selections, role/default profiles and unmet prerequisites; **not** licence, enablement or access |
| **OM-O04** Relationship vocabulary → authorised consumers | Position/edge **type** labels, direction and allowed shapes; **not** actual appointments or reporting chains |
| **OM-O05** Change result → authorised operators | Accepted/rejected/held/pending/committed, version, correlation, effective time and recovery; **accepted is not completed** |
| **OM-O06** Committed lifecycle facts → subscribers/Audit/Reporting | Published/superseded/retired definition events, source revision, provenance, tenant scope; **only if Model owns the durable commit/outbox** |
| **OM-O07** Inventory/history/export → authorised consumers | Scope-limited definitions, immutable revisions and lineage with completeness, freshness and disclosure rules; **not** foreign tenant data |

**Interaction guarantees:** Commands are server-authorised, revision-conditional, idempotent and explicit about uncertain completion. Queries enforce scope, effective time, provenance, version, freshness and completeness; invisible records are not asserted absent. Events follow committed source-owned changes, through the owner's outbox and Message Queue transport; delivery can be delayed, repeated or out of order. Consumers deduplicate and recheck permissions; no exactly-once cross-system guarantee. If Model remains a library/composition, it has **no Model-owned durable publication commands/events**.

Carry tenant/group reference, caller/assurance, owner resource, source version/digest, applicable policy and Clock time, expected revision, correlation/idempotency and provider evidence **only where relevant**; no universal envelope. Never expose private database or SDK types. Breaking public changes require contract/version compatibility review.

## Cross-capability cooperation and failure boundaries

These are **public-interface relationships**, not necessarily imports, Nuxt `extends` or a dependency cycle.

| Partner | Model needs **from** partner | Model supplies **to** partner |
|---|---|---|
| [Identity](../capabilities/identity/capability-record.md) | Trusted tenant/group IDs, standing and memberships where relevant | Definitions tied to authoritative references, never a replacement hierarchy |
| Authentication / [Authorisation](../capabilities/authorisation/capability-record.md) | Trusted caller, assurance, permissions and access verdict | Role **requests**, scoped operation result; no grants |
| [Configuration](../capabilities/configuration/capability-record.md) | Applied selected archetype version, approved overrides, revision | Validated definition, suggested defaults, version/compatibility |
| Host / [Organisation Console](../presentation/organisation-console/presentation-record.md) | Audience, navigation, enabled features and presentation context | Labels, definition previews, allowed menu hints and status |
| Subscription / relevant domains | Entitled, installed, enabled and ready states | Suggested combinations, unmet prerequisites; no provisioning decisions |
| Workflow / Clock | Review outcome and effective-time semantics | Version-bound approval request, source/effective-time references |
| Privacy / Legal Compliance / Verification | Applicable binding, disclosure, retention and qualified claims | Minimised schema descriptors and relevant provenance |
| Metadata / Localisation / Search | Optional vocabulary, translations, derived indexing | Approved typed labels, schema and revisions; no ontology/index ownership |
| [Error Normalisation](../libraries/error-normalisation/stateless-library-record.md) | Stateless safe public/technical error projection and advisory retry classification | Source-owned versioned codes, actual/uncertain outcome, permitted context |
| [Logging](../services/logging/services-record.md) | Diagnostic intake/delivery/health status | Sanitised technical fault, latency, severity and correlation only |
| [Audit](../capabilities/audit/capability-record.md) | Distinct evidence receipt, integrity and coverage result | Risk-selected attributable attempt/denial/approval/committed outcome and revision |
| [Reporting](../capabilities/reporting/capability-record.md) | Derived report status, lineage, freshness, completeness, authorised aggregates | Scoped definition/version/compatibility and committed change facts; **Configuration** supplies actual adoption/selected version |
| Observability / Message Queue | Optional metrics/traces and transport acknowledgement | Safe technical measurements or committed source-owned events |

**Operation-specific requirements:** Pure schema validation requires no live IAM, Subscription or database. Protected publication/binding requires Identity context, Authentication assurance, Authorisation and Configuration as applicable. Commercial features need independent Subscription/host facts. Workflow is conditional on governed approvals; legal/privacy/verification constraints apply to the particular jurisdiction/operation. Reporting, GUI and ordinary technical diagnostics remain optional. If Model definition metadata is absent, the Console hides or marks only the dependent archetype view unavailable; it must never invent organisational rights, feature enablement or a substitute group state. Mandatory risk-based Audit evidence may require an operation to hold/fail closed when its receipt guarantee is unavailable. Unknown mandatory input never silently becomes permission.

**Separate outcomes:** Model owns business error meanings, revision and recovery truth. Error Normalisation only maps errors; its retry advice never initiates retries. Logging receipt proves diagnostic intake only; Audit receipt proves qualified evidence acceptance only; Reporting output is derived and cannot rewrite source facts. If Configuration owns the actual selection change, **Configuration** emits its source events and evidence; Model must not invent a publication success. Reporting absence or sink outages do not invalidate otherwise completed Model operations. Preserve tenant isolation, minimised disclosure, revisions, uncertainty and deduplication across all four.

## Security, policy, privacy and resilience

Respect governing OWASP ASVS 5 L2 (higher for critical operations), server-side deny-by-default access, separation of duties for publish approval where applicable and scoped tenant isolation. Client labels, typed roles, parentage or a displayed menu never confer access. Validate hostile schemas against injection, code execution, prototype pollution, recursive/cyclic references, oversized inputs and unauthorised remote `$ref` fetches. Do not store secrets or unnecessary personal profiles in structural definitions.

Distinguish immutable invariants, permitted approved settings (Configuration), enforced domain access rules (Authorisation), qualified legal constraints (Legal Compliance), privacy/disclosure/retention rules (Privacy) and human-readable published policies (Publisher). Missing mandatory evidence, revocation or stale authority blocks protected actions. Retention, portability, erasure, legal holds and export are delegated to the actual information owners with lawful handling of historical evidence. No ISO certification or legal compliance is claimed.

Use source revisions and effective dates for reproducibility, bounded retries, idempotent reconciliation, safe failures and explicit pending/unknown states. Technical Logging, Reporting and presentation failures must not quietly change authoritative outcomes.

## Standards and permissive software guidance

**Design references** (guidance, not automatic certification or mandatory implementation):

| Reference / official source | Application |
|---|---|
| W3C [Organization Ontology](../../RESOURCES.md#organization-ontology) | **Primary semantic reference** for organisational units, posts and types; never reassign actual membership to Model |
| ISO [19440:2020](../../RESOURCES.md#194402020); ISO/IEC/IEEE [42010:2022](../../RESOURCES.md#420102022) | Enterprise structural constructs and clear architectural viewpoints |
| ISO/IEC [11179](../../RESOURCES.md#11179--wwwisoorgstandard78915html) | Registry naming, metadata meaning, field versions and provenance where warranted |
| [JSON Schema Draft 2020-12](../../RESOURCES.md#json-schema-draft-2020-12) | Preferred JSON-based structural validation profile |
| W3C [SKOS](../../RESOURCES.md#skos), [SHACL](../../RESOURCES.md#shacl), [PROV-O](../../RESOURCES.md#prov-o) | Optional vocabulary, graph validation and provenance interoperability; use stable SHACL Recommendation, not an experimental draft as mandatory |
| ISO [8601](../../RESOURCES.md#8601--wwwisoorgstandard70907html), IETF [RFC 8785](../../RESOURCES.md#rfc-8785) and [RFC 9457](../../RESOURCES.md#rfc-9457) | Time, optional canonical JSON digests and HTTP-safe error representation when those transports are selected |
| ISO/IEC [27001/27002](../../RESOURCES.md#isoiec-270022022), [27701](../../RESOURCES.md#isoiec-277012025); UK [NCSC](../../RESOURCES.md#ncsc), [ICO](../../RESOURCES.md#ico) | Security and privacy-by-design guidance alongside applicable law |
| W3C [WCAG 2.2](../../RESOURCES.md#w3c-wcag-22), European [EN 301 549](../../RESOURCES.md#en-301-549) | Accessible optional administration; WCAG 2.2 AA is the platform baseline |

**Commercially permissive, fully public upstream source candidates; no dependency approved for installation:**

| Project and upstream source | Licence | Adopt only if needed for |
|---|---|---|
| [Ajv](../../RESOURCES.md#ajv) | MIT | **Preferred JSON Schema validator**, including supported 2020-12 dialect |
| [TypeBox](../../RESOURCES.md#typebox), [ajv-formats](../../RESOURCES.md#ajv-formats) | MIT | Optional TypeScript-authored schemas and format checks; avoid maintaining duplicate schema languages |
| [jsondiffpatch](../../RESOURCES.md#jsondiffpatch), [JSON Schema $Ref Parser](../../RESOURCES.md#json-schema-ref-parser) | MIT | Conditional version preview and bounded/locally allowlisted reference resolution; diff alone does not prove compatibility |
| [uuid](../../RESOURCES.md#uuid), [Graphology](../../RESOURCES.md#graphology) | MIT | Optional IDs (reuse platform UUID service first) and **in-memory** structural/graph checks; no shadow group graph |
| [PostgreSQL](../../RESOURCES.md#postgresql) + [node-postgres](../../RESOURCES.md#node-postgres--pg), optionally [Drizzle ORM](../../RESOURCES.md#drizzle-orm) | PostgreSQL licence + MIT; Drizzle Apache-2.0 | **Only** after a justified durable definition lifecycle; use existing Persistence/Infrastructure boundaries |

**Minimal approach:** Ajv for JSON schemas; optionally TypeBox and format validation. Use existing platform Clock, UUID, Persistence, IAM and Audit functions. Do not introduce Neo4j, Redis, Elasticsearch, another search/graph/cache server, an unrelated policy engine, or a dedicated workflow engine. Open-source availability, upstream activity, exact version, all transitive licences, notices, SBOM, security advisories and Node/TypeScript compatibility require verification **at adoption**; this shortlist is not a completed dependency audit. No untrusted remote schema fetch or arbitrary executable extension.

## Optional GUI and host presentation

**Approved OM-D05: headless by default; only an optional authorised definition-administration interface.** Organisation Console remains the presentation for **actual** organisations, memberships, settings, services and governance. Do not create a second organisation-management dashboard.

**Verified reference pattern:** `nuxt-layers-test/application-test-template` on `master` provides `/`, `/admin`, responsive/collapsible/mobile **Capabilities** sidebar, Theme Manager at `/theme-manager`, branded top bar, Theme Manager Appearance controls and a **Not signed in** placeholder. Its `nuxt.config.ts` uses `extends: ['@nuxt-layers/theme-manager']` and `themeManager.mode: 'test'`. This is a **local-only, unauthenticated test mode**, never a production authorisation pattern. Derived hosts configure their own navigation and acceptance; Theme Manager's [root contract](../../RESOURCES.md#theme-manager--contractmd) describes semantic styling and known ADR-0012 gaps.

| Optional screen / illustrative host route | Purpose and conceptual interface |
|---|---|
| Dashboard `/organisation-models` | Scoped definitions, versions, draft/review state and safe action links; OM-O01/O05/O07 |
| Library/detail `/organisation-models/library`, `/:id` | Browse read-authorised archetypes, relationship **types** and history; OM-O01/O04/O07 |
| Definition editor `/organisation-models/new`, `/:id/edit` | Define schema, positions, relationship types and default requests; OM-I01, OM-O02/O03 |
| Validation and preview (editor tab) | Schema errors, compatibility and presentation preview; OM-O02/O03 |
| Version comparison `/:id/versions` | Immutable versions, effective dates, compatibility and migration risk; OM-O01/O02 |
| Publication/review `/organisation-models/review` | **Conditional** exact-version approval, publish/retire and evidence; OM-I02/O05/O06 |
| Migration impact `/:id/migration` | **Conditional** preview and owner-controlled migration; OM-I08/O02/O05 |
| Export/history (detail action) | Scoped export/provenance; OM-O07, no mandatory separate page |

**Host integration:** Add an optional, labelled `Organisation Models` sidebar item under **Capabilities**, beside Theme Manager; link to its dashboard. Host owns paths, route guards, branding, context, navigation, feature availability and theming assembly. Future separately packaged Nuxt presentation must publish route disable/override, presentation entry points, permissions and headless behaviour in its own `CONTRACT.md`; meet ADR-0012's **one composition operation and ≤50 lines** host integration. A schema-library/Configuration implementation can instead use a **host-rendered** editor with the same public validation outcomes; hide unsupported publish/migration actions rather than simulate them.

**Accessibility and safety:** WCAG 2.2 AA, keyboard/reader-friendly forms and structural diffs, responsive layout, reduced motion, Theme Manager semantic styling (no second theme engine), i18n-ready en-GB messages. Server-side checks for each distinct read/create/edit/approve/publish/retire/migrate/export action, assurance and separation of duties. Clear empty/loading/denied/stale/conflict/unavailable/unknown states; safe error messages, unsaved-draft warnings, retry/reconciliation and tenant-switch cache invalidation. No secrets in client storage; document any added browser persistence in its owner STORAGE-REGISTER.

## Conceptual acceptance and challenge

| Scenario | Required result / source owner |
|---|---|
| Valid schema without IAM or database | Safe deterministic validation; authoring library/host, **no false durable publication** |
| Approved revision published where service exists | Immutable revision, version-bound approval, source-owned committed result; Model **if independent** |
| Group selects archetype | Configuration owns effective selection; Identity remains group/member owner |
| Template requests administrator or feature | No grant, licence or enablement; independent Authorisation/Subscription/host decision |
| Stale approval, conflicting revision or invalid schema | Refusal and actionable safe error; no partial commit |
| Failed provider, timeout or replay | Qualified unknown/held and idempotent reconciliation; no invented delivery/commit |
| Retired definition or historical-time read | Original provenance/version or explicit unavailable; no silent replacement |
| Unauthorised tenant, revoked session or indirect access | Deny/minimise; no leaked existence, cached information or inferred hierarchy rights |
| Audit evidence mandated but unavailable | Hold/fail closed under risk policy; independent evidence receipt required |
| Logging or Reporting unavailable | No false Model failure; affected diagnostics/report explicitly degraded |
| Export, report or optional GUI absent | Headless authorisation/validation still works; no private store access |
| Host sidebar/edit/screens in local test template | Correct guarded dashboard, accessible navigation, Theme Manager styling, per-action denial and responsive states; production IAM cannot use local unauthenticated test mode |
| Attempt to create real reporting link, appointment, legal officer or access grant | Unsupported by Model; refer to authoritative governance/domain owner |

**Independent challenge:** The proposed design does not justify separate storage or a second IAM/metadata/permissions/organisation registry. Relationships with Configuration, host, Console, Workflow and other services remain directional and public. Risk controls, event commitment, reporting and GUI do not introduce private access or a package cycle. Conceptual acceptance is **not** test evidence.

## Approved decisions, open gates and handover

**Owner-approved 22 November 2026:** **OM-D01** provisional Platform boundary/no default new service; **OM-D02** immutable definition revisions, effective-time compatibility and separately approved migration; **OM-D03** Model owns type definitions, **not** real posts or reporting chains; **OM-D04** Configuration owns applied archetype selections; **OM-D05** headless core and optional restricted editor, with everyday organisation management in Organisation Console; **OM-D06** durable lifecycle events **only** for state genuinely owned by Model. Standards, open-source evaluation, reciprocal error/Logging/Audit/Reporting boundaries and representative GUI pattern refine those approved principles.

**Resolved conceptual authority:** No further owner decision is needed for those six choices. **Conditional future engineering gate:** evidence that multiple consumers need an independent versioned publication catalogue; identify an existing governance/domain owner for any actual appointments *before* expanding those records. Neither is permission to invent a new capability.

**Implementation/acceptance work (not completed):** Create/publish a root `CONTRACT.md` **only if** a separate implementation is authorised; prove public contract compatibility and ADR-0012 host composition; verify exact dependencies and licences, threat model, schema attacks, tenant isolation, migrations and GUI WCAG/i18n via CI/user testing. Reconcile overlapping unmerged reviews, especially Organisation Console, and current catalogue/register against accepted governing changes. Recheck current `master`, Git conflicts, checks and changed files immediately before merge. No implementation edits, tests/builds or merge have been performed here. **Conceptual record is complete for owner review, not certified implementation or merge approval.**

## Architectural relationships

- [configuration](../capabilities/configuration/capability-record.md): Configuration owns applied archetype selections and overrides.
- [identity](../capabilities/identity/capability-record.md): Identity owns actual tenant/group references and membership.
- [authentication](../capabilities/authentication/capability-record.md): Protected operations use trusted assurance where applicable.
- [authorisation](../capabilities/authorisation/capability-record.md): Suggested role profiles never grant access.
- [subscription](../capabilities/subscription/capability-record.md): Commercial entitlement is independently determined.
- [application-composition](application-composition.md): Host assembles selected features and navigation.
- [organisation-console](../presentation/organisation-console/presentation-record.md): Console presents actual organisation information and optional definition previews.
- [workflow](../capabilities/workflow/capability-record.md): Operation-specific approval, temporal, disclosure and qualified evidence boundaries.
- [clock](../services/clock/services-record.md): Operation-specific approval, temporal, disclosure and qualified evidence boundaries.
- [privacy](../capabilities/privacy/capability-record.md): Operation-specific approval, temporal, disclosure and qualified evidence boundaries.
- [legal-compliance](../capabilities/legal-compliance/capability-record.md): Operation-specific approval, temporal, disclosure and qualified evidence boundaries.
- [verification](../capabilities/verification/capability-record.md): Operation-specific approval, temporal, disclosure and qualified evidence boundaries.
- [metadata](../capabilities/metadata/capability-record.md): Optional vocabulary, translation and derived indexing of definitions.
- [localisation](../capabilities/localisation/capability-record.md): Optional vocabulary, translation and derived indexing of definitions.
- [search](../services/search/services-record.md): Optional vocabulary, translation and derived indexing of definitions.
- [error-normalisation](../libraries/error-normalisation/stateless-library-record.md): Conditional diagnostic, evidence, reporting and transport exchanges preserve source authority.
- [logging](../services/logging/services-record.md): Conditional diagnostic, evidence, reporting and transport exchanges preserve source authority.
- [audit](../capabilities/audit/capability-record.md): Conditional diagnostic, evidence, reporting and transport exchanges preserve source authority.
- [reporting](../capabilities/reporting/capability-record.md): Conditional diagnostic, evidence, reporting and transport exchanges preserve source authority.
- [observability](../services/observability/services-record.md): Conditional diagnostic, evidence, reporting and transport exchanges preserve source authority.
- [message-queue](../services/message-queue/services-record.md): Conditional diagnostic, evidence, reporting and transport exchanges preserve source authority.

### Unresolved matters

- Independent definition catalogue and durable publication interfaces: Requires separate evidence-based classification; no independent service or package approved.
- Owner of actual appointments and reporting chains: Must identify an existing governance or domain owner before expanding the records.
