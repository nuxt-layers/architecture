# Todo — conceptual capability specification

**Identity:** `todo` (catalogue alias `todo-manager`)  
**Classification:** lightweight application composition with a **minimal state-owning Todo service** and **optional separable presentation**; not a second Task capability or a stateless library.  
**Conceptual status:** **complete for the approved scope**, 23 November 2026. TODO-01–06, standards and fully open-source library recommendations, cross-capability contract boundaries, and GUI recommendations are owner-approved. **Implementation and governing adoption:** unverified; no published Todo root `CONTRACT.md` or installed runtime has been established.

**Authority and evidence:** accepted ADR-0009 (headless core/optional GUI), ADR-0012 (public contract and host composition), ADR-0016 (acyclic public dependencies), and the [normative Capability Standard](../../capability-standard.md). Opening governing `architecture-rules/master`: `d7f7c2ee051244b8c81325f5ff1267568d99aab1` (also latest checked); opening blueprint `master`: `8874cccf2f4faaa23b765a9a0a377a77951bc3da`; reconciled current blueprint `master`: `9dde68249f3e05f83872a4439a967f7363446784` (Theme Manager and Time & Attendance additions preserved). review protocol (former document: review protocol), [Task concept](../../capabilities/task/capability-record.md). These are conceptual interfaces, **not actual exported methods**.

## Purpose, classification and ownership

Todo organises small personal or shared **collections of work intentions**. Its basic service must work **without Task**. Where Task or another domain is composed, Todo can organise authorised references to their records but never acquires their decisions or source data.

| Mode | Todo owns | Another capability owns |
|---|---|---|
| **Native, no Task** | Named collections, collection membership/order and sparse items: short title, open/done checkbox, optional due date, revision and history appropriate to risk | Identity/access decisions, effective policy and time semantics remain with their proper owners |
| **Task-linked** | Collection, ordering and authorised Task reference; no second Task status | Task's work definition, assignee, priority, subtasks, progress, deadlines, verification and attributable Task history |
| **Other source reference** | Collection placement and opaque authorised reference | The originating domain's record, status, approval, lifecycle and evidence |

A Todo **native item marked done is only a ticked checkbox**, not a verified Task, completed Project milestone, approved Workflow, fulfilled Process or financial transaction. Derived list counts must label their basis and distinguish inaccessible or stale references.

This is not merely an optional Task screen: it owns a small durable lifecycle when Task is absent. It also is not a full second task-management service. A modest framework-independent/headless implementation with an optional Nuxt presentation is appropriate; the host can compose it without a new microservice, compulsory standalone package or universal navigation registry. The default deployment remains a modular monolith.

## Owned records, lifecycle and guarantees

- **Collection:** stable scoped ID, owner/tenant and permitted group context, name, sharing scope where allowed, revision, order/archival state and retention metadata.
- **Native item:** stable scoped ID, collection ID, short text, binary open/done, optional due date, position, recorded/effective timestamps as applicable, actor/provenance and revision.
- **Reference item:** collection membership/order plus source type, opaque source ID and safe provenance; source-qualified summary is fetched via its public contract, not saved as a competing source of truth.
- **History:** attributable material mutations, corrections and safe link/promotion references. Audit retains independent evidence custody; Todo does not claim permanent personal-data immutability against lawful erasure.

**Transitions:** create → amend/reorder → check/uncheck → archive/remove, with explicit authorised collection rename, share and delete. Apply optimistic revision checks, idempotency, field/scope validation and retention/legal hold. Shared collections must never imply access to a linked source. A missing mandatory persistence or access decision fails closed.

**Promote to Task (only when composed):** request explicit user-authorised conversion; map permitted native title/due-date fields to Task's public creation command; retain an idempotency/correlation reference and reconcile uncertain outcomes. Only after confirmed Task creation does Todo replace the active native item with a Task link while preserving allowable provenance. Do not keep two active work authorities or silently revert rich Tasks to basic items during outages. No automatic external-primary synchronisation.

**Unavailability:** no Task installed is a normal supported native mode. A temporarily inaccessible Task or other linked source displays *unavailable, stale or access denied* as appropriate; it does not create shadow Task copies or claim last-known status is current. A timeout after possible commit remains **unknown** until reconciled. Native Todo events are published via a durable owner-controlled outbox **only if external consumers require them**; no exactly-once transport guarantee.

## Idealised public input contract

| Source | Input / request | Necessity and checks |
|---|---|---|
| **User/host** | Create, rename, archive/delete collections; create/edit/check/uncheck/reorder/remove native items; link/unlink sources; conditional sharing and Task promotion | Core. Validate size/content, caller, expected revision, scope and idempotency; deny invalid/conflicting operations |
| **Host-provided IAM** | Trusted actor, tenant/group/resource scope, authentication assurance and server-side Authorisation decisions | Essential for protected use. Unknown/denied fails closed; client actions and source links never grant rights |
| **Host persistence** | Connection and transaction ports for Todo-owned schema/migrations and optional outbox | Essential for durable saved lists; no browser/local-memory fallback claimed as persisted |
| **Task** | Authorised identity, summary, due date, revision, qualified status and creation result | **Optional**. No Task means native Todo operates normally; outage/unknown must be explicit |
| **Other domain contracts** | Versioned authorised resource references and limited display/decision projections | Optional. Their owners retain finality and disclosure |
| **Configuration / Clock** | Effective collection, sharing, retention and display policy; date-only/time-zone interpretation | Conditional on feature; never invent mandatory policy or reinterpret a date as another instant |
| **Scheduler / Notifications / Integrations** | Optional reminder or provider status via approved host ports | Not required for the initial design; no direct provider SDK or promised delivery |

Every call carries only the appropriate trusted context: action and collection/source reference, allowed scope, relevant revision, time semantics, correlation/idempotency and source provenance. Do **not** impose a universal request object or accept an untrusted tenant/actor assertion as authority.

## Idealised public output contract

| Authorised consumer | Todo supplies | What it does **not** establish |
|---|---|---|
| **Host / optional GUI** | Collections; ordered native and linked items; native open/done state; source-qualified status, permitted commands, revisions, as-of/freshness/completeness and stable safe errors | Verified Task completion, another domain's approval, guaranteed current external status |
| **Task (optional)** | Explicit, validated native-item promotion request with source reference, permitted fields and idempotency/correlation | Todo cannot approve Task creation or set Task completion; Task returns authoritative result |
| **Reporting / Search** | Authorised scoped native item counts/transitions and link references with source attribution, versions, revisions, omissions and completeness | Source Task statistics or disclosure of restricted linked content |
| **Audit / Logging** | Purpose-minimised accountable change evidence or sanitised diagnostics through their own public inputs | Audit custody or diagnostic sink delivery without independent receipts |
| **Event consumers (conditional)** | Stable post-commit native collection/item/link event identity, revision, source and allowed payload | Exactly-once delivery, Task-owned changes or separate Todo 'Task completed' facts |

**Commands:** collection and native-item changes, link management, conditional sharing and promotion. Illustrative concepts include `createCollection`, `addNativeItem`, `setNativeDone`, `linkItem`, `reorder` and `promoteToTask`; **not shipped names**. Results distinguish committed, rejected/invalid, denied, conflict, unavailable and pending/unknown.

**Queries:** authorised list/detail/counts with bounded pagination/filtering, source type, revision, as-of time, freshness and visibility/coverage. Do not disclose another tenant's title, reference or even aggregate count.

**Events:** conditional native `collectionChanged`, `nativeItemChanged`, `linkChanged` facts after transaction commit. Subscriber replay/deduplication uses source event ID/revision. Task and other domains publish **their own** authoritative events. Host-composed Message Queue transports messages but does not own Todo events/outbox.

## Cross-capability public relationships

| Counterpart | Todo needs (input) | Todo supplies (output) | Boundary |
|---|---|---|---|
| **Task** (optional) | Authorised Task identity, projection, creation outcome and current version | Links, user-initiated create/promotion intents | Task owns rich work and verification; Task never requires Todo |
| **Identity / Authentication / Authorisation** | Trusted subject/session, tenant/group and resource/action decisions | Collection and linked-source scope for decisions | Rights checked server-side; no implicit group inheritance |
| **Configuration / Clock** | Effective settings and correct due-date/time semantics | Setting demands and date references | No second policy or time engine |
| **Project / Process / Workflow / domain owners** | Only authorised resource projections | Collection references, navigation intents | Todo cannot commit an external outcome |
| **Scheduler / Notifications** (optional) | Qualified execution/dispatch outcome | Permitted reminder intent if offered | No schedule engine or delivery claim |
| **Integrations** (deferred) | Source mappings, conflict/provider evidence | Explicit permitted import/export/sync intent | No implicit sync or external-primary replacement |
| **Privacy / Legal Compliance** | Valid retention, erasure, hold and disclosure rules | Minimal data inventory and recorded compliant actions | Rights/legal applicability assessed in context |
| **Storage / Content Security** (conditional) | Authorised safe content/attachment references if later linked | Validated link only | Todo owns no file bytes or scan verdicts |
| **Theme Manager / ui / Localisation** | Semantic styling, components, messages | Optional themed, accessible GUI | Host owns route and composition |

Dependencies remain directed and acyclic. Conditional cooperation is not automatically a package import. Only Todo's native records and collection membership/order are its source of truth.

### Error Normalisation, Logging, Audit and Reporting — conceptual public interfaces (23 November 2026)

| Counterpart | Todo sends through conceptual input | Returned public output | Operational rule |
|---|---|---|---|
| [**error-normalisation**](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) (pure library) | Owned versioned errors (validation, permission, conflict, storage, link/promotion), known/unknown outcome, approved mapping and disclosure context | Safe code/category, message key, separate user/diagnostic projections, **advisory** retry qualification | Stateless; cannot decide commit/retry, call services, log or audit |
| [**Logging**](../../services/logging/services-record.md) | Sanitised technical event, operation/latency, safe code, trusted scope and opaque correlation | Accepted/rejected/throttled/unavailable/uncertain diagnostic intake, scoped reads and sink health | No raw item notes/private Task content by default; ordinary outage does not undo Todo changes |
| [**Audit**](../../capabilities/audit/capability-record.md) | Risk-selected accountable sharing/permission, destructive action, promotion, sensitive access/export and override evidence with actor, assurance, outcome, event/revision and provenance | Independent accepted/pending/rejected/uncertain evidence receipt, integrity/coverage and authorised review | Mandatory evidence must gate/hold sensitive action or use an approved recoverable pending pattern; logging/outbox receipts never substitute |
| [**Reporting**](../../capabilities/reporting/capability-record.md) | Scoped, revised native open/done changes, event IDs, provenance, as-of time, omission/coverage and permitted source references | Authorised derived counts/trends, report status, qualified coverage and exports | Native checkbox and verified Task completion are **separate metrics**; Reporting cannot alter source records |

Reporting outages never block native Todo work. Error and log responses cannot certify a commit. Audit acceptance is not proof of Todo success. Consumer retries and correction/replay must not double-count items. [Reciprocal source records](../../capabilities/task/capability-record.md) and those linked above describe their independent ownership; no private cross-schema reads.

## Security, privacy and recovery

Apply **OWASP ASVS 5 Level 2**, with Level 3 where the operation merits it. Authorise every read, collection membership/share change, native item mutation, linked-source projection and promotion server-side. Enforce tenant/field isolation and restrict personal notes from URLs, logs, analytics and cached cross-user projections. Validate untrusted text, source references, dates, pagination and links; use safe error messages.

Data collection must be minimal, with purpose, retention and controlled export/erasure. Privacy and Legal Compliance own applicable policy/legal interpretation, including UK GDPR/Data Protection Act 2018 where relevant, deletion exceptions and holds. Security, configuration and host secrets do not become Todo-owned services. Record browser storage/cookies in a future `STORAGE-REGISTER.md` where used; headless persisted state cannot depend on them.

Failed or timed-out persistence, Task promotion and source queries must preserve **known versus unknown** outcomes. Idempotency plus current-source reconciliation is required before retrying an uncertain action. Mandatory Audit failures have stronger fail-closed/recovery requirements than ordinary Logging/Reporting outages.

## Optional GUI and host integration

A separable GUI uses the representative [`nuxt-layers-test/application-test-template`](../../../RESOURCES.md#ref-8c941ad8) shell: host-owned, responsive **Capabilities → To-dos** sidebar entry opens the Todo dashboard (illustrative `/todos`). When Task is enabled, the host may show **Tasks → My To-dos** instead. An optional card on host `/admin` opens the capability; this is a derived test-host convention, not a universal registration API. The template's Theme Manager uses **local-only unauthenticated test mode**; never treat that as production access control.

| Screen | Essential? | Main purpose |
|---|---|---|
| **Todo dashboard/collections** | Yes, if GUI enabled | List/create/rename/archive authorised collections; show qualified counts and empty/denied/error state |
| **Collection/checklist detail** | Yes | Quick-add, native checkbox, edit, optional due date, reorder with keyboard controls, remove and open linked source |
| **Link or convert to Task** | Conditional | Pick authorised Task reference or request idempotent promotion; show uncertain/conflict state |
| **Sharing/settings** | Conditional | Controlled collection sharing and effective preferences under existing IAM/Configuration |
| **Audit/Reporting links** | Optional | Navigate to those capabilities' authorised screens rather than duplicating them |

**Journeys:** Without Task: open To-dos → create a collection → add/check native item. With Task: select linked record → show Task-qualified status → open Task-owned details. Convert only after explicit confirmation and Task response. Missing Task is normal native mode; an unavailable linked Task is shown as unavailable, **not** converted automatically.

Meet **WCAG 2.2 AA** using semantic lists/checkboxes, visible focus, screen-reader state changes, keyboard Move up/down (dragging optional), responsive presentation and clear loading/empty/stale/denied/unknown states. Use Theme Manager tokens, shared `ui` and Localisation; Clock formats dates. The headless contract remains operational with all screens disabled. The host owns routing, branding and access context, not Todo business state.

## Standards and open-source implementation guidance

| Source | Status | Use |
|---|---|---|
| [W3C WCAG 2.2 AA](../../../RESOURCES.md#ref-0d1f555e) and [WAI-ARIA/APG](../../../RESOURCES.md#ref-f076dce5) | WCAG required; ARIA guidance | Accessible optional GUI and native controls |
| [OWASP ASVS 5](../../../RESOURCES.md#ref-a1c367d2) | Governing L2 floor; L3 where applicable | Authentication, authorisation, validation and secure processing |
| UK GDPR, Data Protection Act 2018 and [ICO guidance](../../../RESOURCES.md#ref-f4808d92) | Applicable according to context | Privacy by design, minimisation, retention, individual rights |
| [RFC 5545 `VTODO`](../../../RESOURCES.md#ref-bb0f57a8) | Preferred **optional** interchange | Sparse title/status/due-date import/export with documented loss/mapping |
| [RFC 8984 JSCalendar](../../../RESOURCES.md#ref-0b86704e), [RFC 10051](../../../RESOURCES.md#ref-30c13a68), [RFC 4791 CalDAV](../../../RESOURCES.md#ref-7d20fd52) | Optional/deferred | Rich Task exchange and external connector design, not a mandatory Todo service |
| ISO 8601-1; [RFC 3339](../../../RESOURCES.md#ref-3379bb69), [RFC 9557](../../../RESOURCES.md#ref-a17e8f95) | Recommended via Clock | Date-only versus instant, offset, zone and DST |
| ISO 15489-1:2016 | Proportionate guidance | Attributable revisions, retention and records integrity |
| ISO/IEC 27001:2022, 27002:2022, 27701:2025 | Optional management guidance | Security/privacy controls; no claimed certification |
| EN 301 549 | Conditional jurisdiction/procurement | Assess legally applicable edition alongside WCAG rather than assuming the latest edition is binding |

**Owner-approved shortlist** (complete public community source, commercially permissive): [Zod](../../../RESOURCES.md#ref-1e3efac4) (MIT) for runtime validation; reuse [PostgreSQL](../../../RESOURCES.md#ref-fa79609e) (PostgreSQL Licence) and [`pg`](../../../RESOURCES.md#ref-be910869) (MIT) behind the host's persistence ports. [Kysely](../../../RESOURCES.md#ref-af839a5b) (MIT) is optional instead of handwritten SQL, **not in addition to another ORM**. [VueUse](../../../RESOURCES.md#ref-9507482e) and [TanStack Query](../../../RESOURCES.md#ref-51cb5e45) (MIT) are optional if host `ui`/Nuxt primitives prove insufficient; [TanStack Table](../../../RESOURCES.md#ref-af94a8b1), [SortableJS](../../../RESOURCES.md#ref-e7023281) and [uuid](../../../RESOURCES.md#ref-346e6d77) (MIT) are deferred unless a demonstrated need exists. Reuse Clock and existing UUID generation. No unnecessary Neo4j/Redis/Elasticsearch/OpenSearch deployment, graph engine or new search store; no open-core flagship, gated source or paid-essential enterprise feature. Recheck exact version, active maintenance, complete/transitive licences, advisories, release provenance and Node/Nuxt compatibility before selection. **No packages were installed or version-pinned during this review.**

## Conceptual acceptance cases

| Situation | Expected result |
|---|---|
| **No Task installed; create, reorder and tick items** | Todo persists sparse records and own revisions; core and optional GUI function independently |
| **Task linked; complete/verify elsewhere** | Todo shows Task-qualified state without duplicating its authority or events |
| **Task temporarily unreachable; source denied** | Native items remain usable; linked status unavailable/denied without leaking source details or inventing completion |
| **Promote item; request times out** | Idempotent Task reconciliation, no two active owners, visible unknown state until confirmed |
| **Two writers use stale revisions / another tenant reads list** | Conflict or denial; no silent overwrite, cross-tenant records or count leakage |
| **Invalid input or uncertain database commit** | Safe normalised error; no leaked payload; unknown commit reconciled before claiming save |
| **Logging/Reporting unavailable; valid native tick** | Todo succeeds independently, permitted degradation disclosed |
| **Policy-mandatory Audit capture unavailable** | Protected action denied/held or explicitly recoverable pending; never misreport independent custody |
| **Repeated/out-of-order native event** | Consumer deduplicates, authorised report coverage remains qualified |
| **Deletion/erasure under retention hold** | Authorised restriction and recorded outcome; no unsupported erasure guarantee |
| **GUI off or accessible test host on mobile** | Headless API works; sidebar/card/list journeys satisfy keyboard, screen-reader, responsive and Theme Manager requirements |
| **Unsupported workflow approval or external sync** | Never simulate external finality; disabled/explicitly unsupported until approved public integration |

These are conceptual acceptance criteria, **not executable test results**. CI/user must verify the future runtime, composition budget, security, schema, outbox, migrations, permissions and accessibility.

## Decisions, outstanding evidence and sign-off

**Owner-approved conceptual decisions (23 November 2026):** **TODO-01** independent sparse collection mode with optional Task links; **TODO-02** one authority for each work record and use of Task public contracts; **TODO-03** optional GUI and host-owned sidebar; **TODO-04** defer offline editing/bidirectional external synchronisation and extra reminder infrastructure; **TODO-05** minimal owned records and explicit safe linking/promotion/reconciliation; **TODO-06** native public commands/queries and conditional native change events. The standards, permissively licensed library shortlist, four specialist reciprocal boundaries and test-host GUI recommendations were approved subsequently in the review conversation. Former *Task-required/view-only* wording is superseded.

**No outstanding conceptual design decision blocks this approved scope.** Implementation kind (exact packaging), published `CONTRACT.md` names/versions, provider configuration, source and transitive licence checks, host acceptance, actual checks/CI, governing adoption and operational security/privacy evidence remain **future implementation or integration work**, not completed claims. If new independent business rules emerge, they require a new design decision rather than expanding Todo into Task.

**Review completion and merge are separate:** conceptual content is complete subject to final latest-`master` consistency, reciprocal/concurrent PR reconciliation and protected-branch/CI verification. This draft blueprint PR does not make governance normative. **Explicit owner merge authorisation is still required.**
