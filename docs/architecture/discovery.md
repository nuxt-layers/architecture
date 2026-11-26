# Artefact discovery and register

**Status:** Approved conceptual direction (ARCH-01–24), subject to accepted governing ADRs and standards. Conceptual schema adoption does not establish implemented interfaces.

## Authority and inventory

The [catalogue](../catalogue.md) and [architecture index](../architecture-index.json) provide conceptual discovery, not runtime authority. Keep stable identifiers, purpose, ownership, classification, intended interfaces and relationships distinct from actual implementation, deployment, operational status and verification evidence. Actual evidence remains with its owner. Unknown evidence is not proof of absence. Changes require bounded rationale, compatibility, security and consumer impact under accepted governing rules.

## Machine-readable definition

Use the proposed centrally versioned JSON Schema Draft 2020-12 and root artefact.json after governing adoption. Until then retain required Nuxt capability.json and published CONTRACT.md/package exports for non-Nuxt artefacts. Do not create a competing blueprint schema. Descriptor metadata must agree with contracts; package.json owns installation dependencies. Conceptual entries need not imply published packages. Contract IDs/versions, required/optional providers, stable identities and separate inheritance edges support validation, not installation or access.

## Application discovery (CD-01–08)

Generate a read-only application-owned inventory at build/composition time from explicitly selected trusted packages, public metadata and checked host declarations; no separate persistent registry capability or runtime scan of repositories. Validate identifiers, duplicate contributions, supported versions, required providers, optional absence, and combined directed acyclic dependencies under ADR-0016. Service dependencies and Nuxt extends are separate edges; declarative specialisation counts where it creates actual dependencies. Events, typed resource references and composition alone do not imply reverse code dependencies. An actual imported contract still counts.

Record defined, available, installed, selected/composed, configured/initialised, operational, enabled and authorised independently; public/restricted resource publication is another dimension. Owner-provided scoped health with observation time establishes readiness, not installation. Evaluate permission per actor/action/tenant/resource/assurance at request time; no global authorised flag. Identity may operate refusal-only when providers are absent; Publisher owns registered document types, schema and allowed actions; Configuration owns declarations and effective values; external connector installation does not establish a tenant connection. Runtime archetype activation and publication remain with owners.

Discovery cannot install code, register routes automatically, execute untrusted declarations, reveal secrets/private exports or grant permissions. Host owns navigation; permission checks remain server-side. Optional authenticated diagnostics expose only redacted scoped metadata. Generate/hash once per build/deployment where possible; invalidate on deployment changes, reuse authorised request-scoped feature queries and SSR hydration without global user state or repeated menu network calls. Support headless/offline/non-Nuxt use without a new hosting service.

## Acceptance

- Missing required provider or incompatible version/cycle fails validation; optional missing provider follows documented absence.
- Disabled presentation leaves core independent; no duplicate routes.
- Installed connector without account is unavailable for that tenant; absent Authorisation denies protected operations.
- Group switch, logout or revocation re-evaluates actions/navigation without cross-user cache leakage.
- Anonymous users see only owner-approved public content.
- Inventory reports contract provenance and uncertainty without claiming runtime verification.

CD-01/03/04/06/07/08 are now aligned with the approved discovery direction; CD-02's earlier no-universal-schema recommendation is superseded by the approved schema proposal, not by accepted governance yet. CD-05 remains accepted ADR-0016. Exact descriptor compatibility and implementation acceptance remain outstanding. Potential independent model/metamodel definitions, procedure/case responsibilities and BPMN/DMN/CMMN/flowchart support require separate ownership evidence; do not infer new packages from discovery.

## FAC-10 — Conceptual dependency evidence and validation

The primary catalogue/register index all 99 canonical nodes. This is a conceptual graph, not a lockfile or declaration of delivered package dependencies. The record review identified the following specific required contract/implementation edges; the direction is consumer → provider.

| Consumer | Provider | Evidence / edge type |
|---|---|---|
| authorisation | clock | reported current package requirement |
| iam-integration | identity | required member contract |
| iam-integration | authentication | required member contract |
| iam-integration | authorisation | required member contract |
| iam-integration | profile | required member contract |
| export | rich-text | required safe-tree input contract |

All endpoints exist in the inventory; the above explicit subgraph was checked by depth-first traversal across 99 nodes and has no directed cycle. No mandatory Nuxt inheritance edge was established by this conceptual review. This does **not** prove the eventual combined package/extension graph acyclic. Unlisted nodes have no extracted fixed edge in this limited subgraph, not a claim that they have no dependencies.

### Host-bound operation dependencies

The host declares and validates selected providers for each operation: trusted caller/access and persistence for protected durable changes; qualified legal/privacy inputs where applicable; clock semantics for timed facts; source evidence for downstream decisions. Required absent/unknown inputs block the affected action. Optional providers must declare an absence mode. These structural port requirements do not imply package imports; the provider may be selected by composition.

| Consumer group | Required or conditional source contracts / information flows |
|---|---|
| IAM members | Identity standing, Authentication assurance, Authorisation resource decisions, Profile disclosure; independently supplied ports; bootstrap restricted separately |
| Accounting, Billing, Invoice, Order, Checkout, Subscription, Payment Gateway | Party and source commitments, charge/document/payment/settlement evidence; each owner independently accepts and reconciles; external authority explicitly scoped |
| Employment, Recruitment, Job, Payroll, Workforce Scheduling, Time & Attendance | Qualified Party/engagement, budget/establishment, position, planned roster and approved actual-time facts; no reciprocal imports |
| Course, Enrolment, Assessment, Attendance, Training, Qualification, Credentials | Versioned offering, admission, assessment/presence, learning finding, award and issued proof; optional source pathways explicitly supported |
| Asset, Product, Facility, Inventory, Warehouse, Logistics, Manufacturing, Quality | Source identity, resource and stock evidence, operational requests, independent quality disposition, committed movement and Accounting valuation |
| Publisher, Media, Comments Engine, Moderation, Content Security, Search, SEO, Federation | Owner-authorised source revision and visibility; detection, case decision and source enforcement separate; derived indexing/publication transport |
| Process, Workflow, Task, Project, Scheduler, Message Queue | Source business decision, approval evidence, accountable work, timed attempt and transport acknowledgement; no completion inference |
| Privacy, Legal Compliance, Audit, Logging, Observability, Reporting | Qualified rules/rights and independent evidence/diagnostics/analytics; no synchronous universal interception or private stores |
| Presentation and compositions | Host-selected source public contracts; no reverse mandatory dependency from headless owner to UI; no automatic privileged routes |
| Libraries and adapters | Pure input/output contracts and provider-specific ports; no domain state acquisition or reverse mandatory imports |

### Runtime cycles and acceptance

IAM bootstrap must use separately authorised host operations, not require a normal authenticated session to establish the first principal. Revocation and evidence receipt must not synchronously depend on their own source change; use source outbox and bounded reconciliation. Audit capture rules distinguish required durable evidence from independent custody acknowledgement; no recursive Audit-of-Audit call chain. Workflow and source transitions use version-bound outcomes rather than each waiting for the other's commit. Billing/Invoice/Accounting acknowledgements and Privacy disposition receipts are asynchronous or independently read back; deduplicate by source revision and operation identity. Event feedback loops require explicit causation, consumer-effect deduplication, bounded retries and termination conditions.

Before implementation acceptance, require a complete per-selected-host manifest of actual required/optional contract IDs and versions, provider bindings, package imports and Nuxt extends; reject unknown mandatory providers, incompatible versions and combined cycles. Validate bootstrapping, synchronous calls and event feedback separately. No root implementation contracts were re-audited for this conceptual pass, so full package/extension and runtime validation remains an explicit acceptance gate rather than a claimed result.

## Architectural relationships

- [application-composition](application-composition.md): Host generates inventory from explicitly selected trusted artefacts.
- [identity](../capabilities/identity/capability-record.md): Discovery must distinguish refusal-only operation and trusted identity context.
- [authorisation](../capabilities/authorisation/capability-record.md): Per-operation permission remains independently evaluated.
- [publisher](../capabilities/publisher/capability-record.md): Document-type registration remains source-owned.
- [configuration](../capabilities/configuration/capability-record.md): Declarations and effective values remain source-owned.

### Unresolved matters

- Selected-host contract, package and extension graphs: Actual dependencies and compatibility require implemented contract and host evidence; conceptual information exchanges do not prove them.
