# Warehouse — conceptual capability specification

**Classification:** Domain capability, with optional Nuxt presentation and an independently usable headless service.  
**Conceptual status:** **Owner-approved design direction, 23 November 2026**, including public contracts, standards, permissive-library policy, operational boundaries and GUI recommendations. This is a consolidated conceptual specification in draft PR #149, **not** a published implementation contract, governing adoption, certification or operational acceptance. Unresolved policy/application choices are identified below.  
**Authority and evidence:** Accepted ADRs and normative documents in [architecture-rules](../../../RESOURCES.md#ref-6d4a7ae1) govern. Governing `master` (rechecked 23 November 2026): `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint opening `master`: `8874cccf2f4faaa23b765a9a0a377a77951bc3da`; reconciled blueprint `master`: `2c2e95a5d5f25443bba1718bb04f53bdd836064d`. The review branch preserves newer neighbouring conceptual records through an additive reconciliation commit. `nuxt-layers/warehouse` and its root `CONTRACT.md` were not retrievable (404); no actual Warehouse API, package, tests or deployed integration has been verified.

## Purpose, authority and exclusions

Warehouse manages **physical warehouse work and evidence**: receiving and inspection, put-away and replenishment, picking, packing, loading preparation, physical handovers, bin/staging management, counting work, occupancy, assignments and operational exceptions. It supports a single stockroom or multiple sites and optional external custodians. Its independently meaningful work, custody and correction lifecycles justify a domain capability, not a stateless library or a new application shell.

Warehouse owns its work instructions and status, operational bin and staging identities, capacity/handling constraints, physical observations, acknowledgements, discrepancy cases and historical correction evidence. It does **not** own the following decisions:

| Owner | Authoritative responsibility, not inferred from Warehouse work |
|---|---|
| **Inventory** | Stock-account positions, reservations, holds, lot/serial stock genealogy and committed receipt/issue/transfer/conversion; only Inventory changes quantity-bearing stock facts. |
| **Product** | Item definitions, units, packaging, BOMs and physical versus virtual kits. |
| **Order** | Purchase/sale obligations, fulfilment acceptance and returns. |
| **Manufacturing** | Production orders, work-centre execution, routing, production quality/rework and WIP processing. Warehouse handles materials, including simple **stock-only** kitting under Product and Inventory contracts. |
| **Logistics** | Shipment, route, carrier/transport custody and qualified delivery evidence. |
| **Facility / Location** | Facility site/floor/zone geometry, circulation safety and effective closures; Location's qualified place references. Warehouse owns its operational **bin/staging resources**, not a second site graph. |
| **Asset / Booking** | Managed equipment identity/suitability and time-based resource reservations. |
| **Accounting / Billing / Invoice** | Recognised valuation and journals, service tariffs/charges and issued invoices. Warehouse supplies measured cost **drivers**, not financial postings. |
| **Identity / Authentication / Authorisation** | Trusted tenant/group and subject, session assurance and resource access decisions; Warehouse enforces its own domain and physical safety rules. |
| **Task / Workflow / Scheduler** | Generic delegated work/approval orchestration and timed execution; Warehouse alone owns physical work progress and outcome. |

A tenant, group, site, warehouse, bin, stock owner, legal title claimant, custodian and worker are different concepts. Neither site/tenant hierarchy nor 3PL possession implies access, legal title or the right to post stock. An observed scan is evidence **only**: not a stock movement, carrier acceptance, production release or commercial completion.

## Owned information, lifecycle and native operation

| Authoritative Warehouse record | Lifecycle and safeguards |
|---|---|
| **Warehouse/bin/staging definition** | Register → validate → active/restricted → retire; operational code, Facility reference, permitted uses, capacity, environmental and handling constraints, effective revision. Qualified Facility safety decisions take precedence. |
| **Physical work and assignment** | Requested → validated → assigned → started/held → evidence submitted → physically completed/cancelled/exception → closed. Keep source intent, worker/equipment, priority, quantity/unit, permitted steps, version and reason. |
| **Physical evidence** | Scan, manual count, condition, lot/serial observation, packaging and weight/dimensions, device/actor, original event and receipt time, referenced files and provenance. Append corrections; do not rewrite history. |
| **Physical handover and occupancy** | Proposed → witnessed/acknowledged or disputed → reconciled; record custody claims, source, storage location/time, space/pallet use and physical handling, not legal title. |
| **Discrepancy and recovery** | Reported → held/investigated → reconciled/corrected → closed; include shortage, damage, unsafe bin, stale work, duplicate/offline scan, stock-owner disagreement and 3PL uncertainty. |
| **Approved local work rules** | Versioned operational constraints, batch/wave priorities, bounded allocation and capacity estimates; Configuration supplies effective values, Warehouse interprets its own rules without weakening safety/security floors. |

**Native minimum:** create/retire handling locations; plan, allocate, start, pause and complete work; record scans/inspections/counts, pick/pack and handling, physical custody and occupancy; open/correct discrepancies; provide work queues, scoped read models and durable events. A persistent authoritative store, trusted caller/access context and relevant mandatory handling rules are required; the host supplies infrastructure, not domain logic.

Without Inventory, Warehouse may manage **non-stock physical work** but cannot declare stock receipt/issue committed. Without Logistics it may pack and stage parcels, not verify carrier acceptance. Without Manufacturing it cannot execute production. An external WMS, barcode device, 3PL, complex map and GUI are **not mandatory**.

**Independent outcomes:** `observed` and `queued_offline` describe evidence intake; `physically_completed` describes a committed Warehouse fact. `pending_owner`, `confirmed_by_owner`, `rejected_by_owner` and `unknown_reconcile` describe **separate** Inventory/Logistics/Manufacturing results. Unknown is never silently converted into success/failure. Idempotency, expected revisions, durable recording and reconciled retries prevent duplicate completion; corrections append counter-evidence or compensating instructions.

## Idealised public input contract

These are **business-level public interfaces**, not fixed endpoint names or verified exports. Each input includes trusted scope, source/version and relevant policy, time and operation correlation; exact fields depend on its purpose, not a universal envelope. **Requiredness is per operation.**

| Supplier / input | Facts, requests or evidence Warehouse consumes | Validation, absence or disagreement |
|---|---|---|
| **Host, IAM and authorised operator** | Trusted tenant/group/site and caller assurance, request-time access decision; register work, allocate/assign, start/hold/complete, scan/inspect/count/pack/handoff, correct and export with reason, expected revision and idempotency. | **Essential** for protected actions. Denied/unknown scope, unsafe or malformed quantities, stale revision and insufficient assurance → refuse safely; a received event or barcode never grants permission. |
| **Inventory** | Authoritative item/lot/serial stock position, holds, reservations and independently committed movements/results. | **Conditional essential for stock work**. Missing/contradictory confirmation → pending/exception; no shadow stock write. |
| **Product / Order** | Versioned item, unit and packaging/BOM definitions; fulfilment/return demand, line quantities, cancelled/changed obligations. | **Conditional** for product- and order-linked work. Unsupported bundle/units or stale demand → hold or replan. |
| **Logistics / Manufacturing** | Versioned loading, shipment/collection and transport plan; approved production-stage material-handling demand and applicable release. | **Conditional** by operation. A plan is not carrier acceptance; handling does not grant production or quality authority. |
| **Facility / Location / Asset / Booking** | Site geometry/approved passage and closures; qualified place references; equipment suitability and approved time-based reservations. | **Conditional** when applicable. Unknown mandatory access/safety/resource capacity → hold, not guess. |
| **Configuration, Privacy, Legal Compliance, Clock** | Approved work rules and policy versions, applicable hazard/food/pharmaceutical constraints, lawful purpose/retention, effective timestamps and timezone interpretation. | **Conditional** by site/goods/activity; unknown mandatory clearance or contradictory rule → stop unsafe action for qualified review. |
| **Integrations, device, 3PL / Storage** | Authenticated scans, external custody acknowledgements/IDs, source sequence, evidence attachments and provider status. | **Optional or conditional**. Verify origin, mapping, replay, freshness and purpose; unavailable mandatory proof → pending. |
| **Task / Workflow / Scheduler** | Delegated general activities/approval result and schedule trigger. | **Optional**; neither trigger nor approval automatically completes Warehouse work. |

A Warehouse command identifies resource, requested transition, version, trusted scope, expected/observed quantity and unit where needed, evidence/provenance, safe correlation and idempotency. Reject unsupported or outdated actions and keep failures separate from remote-provider uncertainty.

## Idealised public output contract

| Output / permitted consumers | Meaning and limits |
|---|---|
| **Warehouse work and queue** → operators, supervisors, Task/Workflow, originating domains | Authoritative physical work status, source reference, assignment, revision, reasons and progress; **not** order/stock/shipment finality. |
| **Bins, staging, occupancy and capacity** → Warehouse users, Facility, planners and Reporting | Operational constraints, measured space/time usage, estimated usable capacity and freshness; not authoritative item quantity, Facility geometry or safety certification. |
| **Receipt, inspection and count evidence** → Inventory, Order, Manufacturing, Audit | Observed units, lots/serials, condition and discrepancies with timestamp, operator/source and correction history; Inventory decides quantity posting. |
| **Picked, packed and ready evidence** → Order, Inventory, Logistics | Items/parcel references, dimensions, packaging, staging and readiness; only Logistics verifies transport handoff/delivery. |
| **Custody/3PL reconciliation evidence** → Logistics, Inventory, authorised custodian, Audit | Witnessed/remote acknowledgements, disagreement, pending status and provenance; **no title transfer or liability determination**. |
| **Storage/handling cost drivers** → Billing, Accounting, Logistics, Reporting | Pallet/space days, handling/labour activity and related physical measurements; no tariff, capitalisation, GL or invoice decision. |
| **Authorised operational views/exports** → Warehouse users, Reporting/Search and eligible oversight | Scoped work/exception history, source revisions, as-of time, freshness/completeness, redaction and export restrictions; derived reports belong to Reporting. |
| **Committed events** → Message Queue relay, other owners, Audit and authorised projections | Warehouse-owned changes only, with stable event identity, aggregate/revision, actor/source, tenant/scope, occurrence/recorded time and correlation; never another owner's decision. |

**Commands:** register/change/retire bin; plan/assign/start/hold/resume/cancel/complete work; submit scans/counts/inspection; confirm physical pick, pack, put-away, staging or handover; record occupancy; open/reconcile/correct discrepancy; qualified export. Respond with `committed`, `accepted_pending`, `pending_external_owner`, `rejected`, `conflict` or `unknown_reconcile` and a stable safe code/reference. **Queries:** authorised queue, work/custody timeline, bins/capacity, counts, parcel/readiness, occupancy and exception provenance; mark partial, stale or unknown data. **Events:** conceptual families `WarehouseWorkCreated/Assigned/Closed`, `HandlingObserved`, `ReceivingInspected`, `PutAwayCompleted`, `PickCompleted`, `PackCompleted`, `HandoffAcknowledged`, `CountEvidenceSubmitted`, `WarehouseDiscrepancyRaised`, `WarehouseWorkCorrected` and `OccupancyRecorded`. Exact names and structures remain implementation-alignment work.

Warehouse commits its state and **own durable outbox**. Message Queue relays events; recipients handle duplicates, out-of-order changes, schema versions and reconciliation via owner's queries. No cross-capability exactly-once guarantee. Queries and events disclose only authorised tenant/purpose data, with effective/observed/receipt times, confidence and source provenance where material.

## Cooperating capabilities and cross-cutting contracts

The input/output tables above define the main domain exchanges. All connections are **public contract or port** relationships, not private imports; reciprocal views/events do not create package cycles. The originator always owns its facts.

| Supporting component | Warehouse input to it → output back | Responsibility and failure rule |
|---|---|---|
| **error-normalisation** (stateless library) | Warehouse-owned error/code, known or uncertain outcome, approved mapping and disclosure context → safe versioned error code, message key, diagnostic/public projection and advisory retry category. | Warehouse decides action, retry, idempotency and finality. Library stores nothing and emits no events/logs. |
| **Logging** | Sanitised source/operation/severity, correlation and technical failure → intake/rejection/uncertain delivery status and authorised diagnostic queries. | Logging owns technical records, **not** Warehouse completion or Audit integrity. Ordinary log outage does not undo committed work. |
| **Audit** | Risk-selected attributable operation/decision, high-risk correction, override, custody or access evidence → distinct evidence receipt, integrity/review status and authorised lookup. | Audit owns evidence custody, not original business truth. Mandatory evidence failure follows an explicit hold/recovery rule; a log is not a substitute. |
| **Reporting** | Authorised Warehouse read models, source revision, units, time window, quality and committed change hints → qualified report definitions/results/exports and refresh status. | Reporting owns derivatives, not operational work; missing source data is unknown/partial, never zero or success. |
| **Observability / Search / Notification** | Qualified health/trace attributes, indexable public projections and authorised notice requests → diagnostic/projection/dispatch results. | Optional consumers; neither becomes a Warehouse source of truth. |
| **Storage / Clock / Message Queue** | Evidence-file references, timestamps and committed outbox events ↔ qualified byte handling, time semantics and delivery progress. | Infrastructure through public ports; Storage holds bytes, Warehouse owns records; transport acknowledgment does not imply recipient decision. |

**Provider lifecycle:** support a usable native mode; select optional device/3PL adapters through explicit scoped configuration; qualify provider evidence, identities, mappings, effective agreements, price/cost claims, import/export, version, rate limits, duplicate webhooks, reconciliation cursors and withdrawal/revocation. Disconnections and migration preserve Warehouse history. If a provider cannot prove the operation, expose `unknown_reconcile`; never silently adopt its claim as Warehouse, Inventory or Logistics authority.

## Configuration, security, privacy and compliance

Apply OWASP ASVS 5 Level 2 and relevant Level 3 protections, trusted server-side Authorisation, least privilege, tenant/site isolation, actor/assurance attribution, protected changes and segregation of duties for material overrides. Distinguish mandatory technical and safety floors, applicable legal rules, independently approved organisational policy and bounded Configuration settings. Neither configuration nor staff role can override Facility's qualified safety closures or applicable handling restrictions.

Threats include forged/duplicated scans, barcode injection, device/3PL impersonation, false carrier acknowledgements, stale instructions, unauthorised location or stock disclosure, out-of-scope exports, unsound units/conversions, insider adjustments and loss of evidence. A scan is not a credential. Validate producer, quantities/units, lot/serial references, revisions, attachments and source provenance. Use protected corrections, held discrepancies, access-controlled exports, safe normalised errors, minimised technical logs and attributable Audit evidence.

Privacy and legal evaluation cover worker/device location monitoring, personal data minimisation, lawful purpose, retention/erasure and legal holds, dangerous/regulated goods, food/medicines, bonded/consignment storage and contractual custody liability, taking jurisdiction and effective dates into account. Unknown required clearance blocks unsafe handling. A design that references a standard **does not certify compliance**.

## Standards and permissive library policy

**Standards-informed requirements (WSTD-01–08; approved conceptual direction, not certifications):**

| Requirement | Reference and design consequence |
|---|---|
| **WSTD-01 identification** | GS1 General Specifications (GTIN, GLN, SSCC and compatible barcode labels). Accept recognised interoperable identifiers **without requiring** GS1 registration in all native operations. |
| **WSTD-02 events** | GS1 EPCIS 2.0 / Core Business Vocabulary where partner exchange needs it: event meaning, product/location/time, source/version and provenance. No automatic authority from imported events. |
| **WSTD-03 quality** | ISO 9001 principles: inspections, discrepancies, corrective evidence and attributable history. |
| **WSTD-04 safe handling** | UK HSE HSG76/HSG136, BS EN 15635, ISO 45001 and applicable PUWER/LOLER/manual handling duties; Facility/Asset/qualified safety actors retain their decisions. |
| **WSTD-05 conditional sectors** | ISO 22000/HACCP food handling; MHRA GDP pharmaceuticals; COSHH and applicable hazardous-goods, RFID/ISO 1736x or 3PL controls only when relevant. |
| **WSTD-06 secure/private** | OWASP ASVS 5, ISO/IEC 27001/27701 and applicable UK GDPR/Data Protection Act/ICO worker-monitoring guidance. Governance sets the mandatory floor; standards do not substitute for legal determination. |
| **WSTD-07 accessible** | W3C WCAG 2.2 AA, WAI-ARIA where relevant, BCP 47/Unicode CLDR/ECMA-402 and Theme Manager semantics; accessible manual alternative to scanning. |
| **WSTD-08 resilient** | ISO 22301 and ISO 28000 principles, calibrated measurement/unit handling (ISO 80000), verifiable recovery, custody and provider failure. |

**Approved technology-selection policy (WLIB-01–05):** select complete public-source, mature/actively maintained and **commercially permissive** dependencies (MIT/Apache 2.0/BSD/PostgreSQL style), review each selected release and transitive licence/security posture; reuse existing platform security, Clock, Temporal Gateway, Scheduler, Message Queue/PGMQ, Logging and Audit rather than duplicate infrastructure; keep vendor details behind replaceable ports; exclude open-core feature requirements, restricted community editions and proprietary mandatory services. Avoid parallel Redis, Elasticsearch, Neo4j or additional WMS as a required authority.

**Preferred candidates, not installed or version-approved:** PostgreSQL for capability-owned records, **one** SQL layer (Kysely preferred; Drizzle as alternative), Zod for TypeScript validation, Ajv conditionally for external JSON Schema, bwip-js for barcode generation, TanStack Query/Virtual for optional complex Vue views and OpenLayers for optional 2D visualisation. Browser barcode decoding (e.g. html5-qrcode) and separate GS1/EPCIS libraries require a fresh maintenance, licence and compatibility review; exclude complete open-core platforms. Temporal, pgmq and pg_cron are reused through existing architectural boundaries, not imported as Warehouse business owners. No new repository or library integration is authorised by this conceptual choice.

## Optional GUI and host integration

**Approved conceptual presentation:** optional Warehouse-owned screens, independently disableable; host owns application shell, top bar, navigation, branding, route mount and trusted context. In the inspected `nuxt-layers-test/application-test-template`, `app/app.vue` supplies a responsive collapsible **Capabilities** sidebar containing **Theme Manager** → `/theme-manager`; `/admin` is the test dashboard. A derived test host would add **Warehouse → `/warehouse`** and a dashboard card. These are **suggested routes, not published exports**. The reference host is local-only and its unauthenticated Theme Manager test mode is not a production IAM model. Warehouse must not duplicate host navigation or create a second theme.

| Screen | Main job and boundary |
|---|---|
| **Dashboard** | Site selector, due/assigned/blocked work, inbound/outbound and exceptions, separate physical versus owner-confirmed status; entry to next action. |
| **Receive & inspect** | Expected versus counted items, lot/serial, damage, scan/manual input and discrepancies; Inventory status shown separately. |
| **Put-away / replenishment / locations** | Source/destination bin, capacity, constraints and approved Facility path/closure; optional 2D plan, not Facility geometry editor. |
| **Picking** | Assigned batches, step-by-step item/bin/quantity confirmation, shortage/partial handling; respect Inventory holds. |
| **Packing & dispatch staging** | Carton composition, measurements, labels, load/handover and collection plan; Logistics carrier acceptance shown separately. |
| **Stocktake & reconciliation** | Count evidence, variances, review/override and linked Inventory posting result; no direct stock ledger edit. |
| **Custody, occupancy & 3PL** | Pallet/space intervals, handling measurements, external acknowledgements and disputes; not financial tariffs or title. |
| **Exceptions & administration** | Correction/recovery, work and bin rules, provider status, authorised evidence/export and Audit links; protected supervisor/admin permissions. |

**First-release GUI:** dashboard, receiving, put-away, picking, packing/dispatch, counting, location management, exceptions and limited administration. Advanced 2D routing, full 3PL portal, specialised workforce analytics and a generic reporting builder are optional later integrations.

**Desktop/supervisor:** existing host sidebar/header; authorised warehouse/site context, prioritised queues, capacity, discrepancy and management views. **Handheld/operator:** task-first, one clear next step, large touch targets, scan and equivalent manual entry, usable on intermittent connections. On every screen explicitly distinguish `observed`, `queued offline`, `physically completed`, `pending Inventory/Logistics`, `confirmed by owner` and `unknown/reconcile`. Validate server-side after offline reconnection; show safe field errors, expected versus observed and accessible corrective actions. Tenant/context changes reauthorise actions and clear stale selections.

Presentation consumes **only** authorised Warehouse and peer public commands/queries/events, not private tables; hide unauthorised navigation as a convenience only. Use Theme Manager semantic tokens, WCAG 2.2 AA, keyboard/screen reader/touch support, manual scan fallback, text status beyond colour, reduced motion and locale-aware numbers/dates. Headless consumers receive the same authoritative service with presentation disabled. Actual route/permission/message keys and one-call integration must be published in the future root `CONTRACT.md` and demonstrate ADR-0012's **50-line host budget** (Nuxt adapter included).

## Conceptual acceptance cases

| Input / scenario | Expected output and owning authority |
|---|---|
| Operator receives 20 of 22 expected units | Warehouse commits a 20-unit count plus shortage; Inventory receipt remains **pending** until Inventory validates and posts it. |
| Authorised pick of four reserved items, repeated scan | Warehouse records one physical pick, deduplicates replay and returns the earlier outcome; Inventory separately commits any stock issue. |
| Pack completed; carrier has not acknowledged | Warehouse reports parcel measurements and readiness; Logistics retains unconfirmed carrier custody. |
| Production material requested | Warehouse stages/records physical handoff, Manufacturing decides production outcome, Inventory commits WIP/stock changes. |
| Different tenant or unauthorised deep link | Denied without data disclosure or mutation; protected denial evidence routed appropriately. |
| Unsafe Facility closure, stale revision or incompatible unit | Work is held/refused with safe reason; no unsupported route or stock write. |
| Offline duplicate scan or expired session | Queue is **unverified**; reconnect revalidates identity, revision, duplicate status and authoritative result. |
| Uncertain 3PL timeout after possible acknowledgement | `unknown_reconcile` and qualified provider correlation; no presumed success or unsafe duplicate handoff. |
| Damaged stocktake / approved correction | Warehouse keeps original observation and attributable correction; Inventory decides variance movement, Accounting decides financial treatment, Audit preserves evidence. |
| Five pallet-days occupied | Warehouse supplies measured source period and capacity use; Billing/Accounting decide tariff and GL. |
| Unsupported production release or direct quantity adjustment | Explicit refusal pointing to Manufacturing/Inventory, not a shadow action. |
| Operator and supervisor use GUI; presentation switched off | Permission-scoped sidebar/dashboard/handheld interactions meet accessibility; headless work continues without any Warehouse UI. |
| Log sink unavailable / Audit mandatory intake uncertain / Reporting source missing | Warehouse does not equate diagnostic status with work completion; apply documented critical Audit hold/recovery and report derived data as partial/unknown. |

These are conceptual acceptance conditions; tests, CI, deployment and legal qualification remain separate.

## Decisions, alignment and completion

**Owner-approved conceptual principles (WHE-01–08):** WHE-01 Warehouse physical-work authority distinct from Inventory stock; WHE-02 operational bins distinct from Facility geometry; WHE-03 material handling distinct from Manufacturing; WHE-04 physical custody evidence distinct from legal title/3PL transport decisions; WHE-05 native/headless and optional role-based GUI; WHE-06 public commands/queries/events, owner outbox and explicit outcomes; WHE-07 physical occupancy/cost drivers without Accounting/Billing authority; WHE-08 attributable corrections, offline/provider reconciliation and protected assurance. The approval is for these boundaries, **not** for unverified implementation details or a universal 3PL contract.

**Remaining deployment/jurisdiction choices, not blockers to this conceptual boundary:** exact 3PL contractual liability and disputed title/custody process; regulated/hazardous/temperature qualification procedures; workers' monitoring purpose/retention and local law; which external shared-warehousing services ship initially; final device/vendor selection, routes, message schemas and published method names. Each requires qualified authority and versioned configuration before the relevant operation is enabled; unknown mandatory rules fail closed. Do not silently claim all tenants or goods types are supported.

**Implementation/acceptance handover:** establish the actual repository and independently usable root `CONTRACT.md`; specify literal imports, one-call composition, caller/access/clock/storage ports, permissions, optional Nuxt screens, errors and migration/version compatibility; prove tenant/safety checks, irreversible/uncertain handling, outbox, provider reconciliation, accessibility and minimal consumer CI. Align peer contracts and reciprocal notes without circular dependencies. Conceptual sign-off neither merges PR #149 nor confirms an operational capability.

**Scope of this review:** Warehouse canonical record, working catalogue/register and dated proposed reciprocal notes to Inventory, Product, Order, Logistics, Manufacturing, Facility and Accounting, all in PR #149. Accepted ADRs and earlier neighbouring owner-approved decisions retain their authority. Subsequent concurrent `master` changes must be rechecked before merge.
