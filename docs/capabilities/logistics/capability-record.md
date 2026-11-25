# Logistics — Capability Record

**Classification:** Domain capability (approved conceptual boundary). **Conceptual status:** Complete for the owner-approved scope (LGS-01–LGS-09, LGS-11, LGS-12); not implemented or merged. **Implementation gate:** LGS-10 remains open and is **not owner-approved**. **Review:** draft PR #89. This record specifies the intended public contract, not existing callable endpoints. No accessible `nuxt-layers/logistics` root `CONTRACT.md` has been verified.

## Purpose and ownership

Logistics plans, authorises and executes the movement of goods. It owns **despatch management, shipment/consignment records, parcels and transport legs, multi-stop/vehicle route optimisation, carrier assignments, handovers, tracking, delivery/return evidence, transport exceptions, claims and freight-service cost evidence**. It supports customer fulfilment, inbound deliveries, inter-site transfers, repairs, subcontracted processing and returns, including one-person manual deliveries without a carrier integration.

Its authoritative records include shipment and despatch plans; parcel/handling-unit and transport-leg IDs; planned and released routes; assigned vehicles/stops; loading/collection instructions; custody observations; tracking events with provenance; verification outcomes; exceptions and corrections; quotations, transport tariffs and charge evidence. A carrier's claim that something was delivered is **not** proof that Warehouse received it, Inventory moved it, an Order was fulfilled, title changed or Accounting posted it.

**Clear exclusions:** Order owns commercial commitments; Warehouse owns physical picking/packing/loading/receiving, storage and occupancy; Inventory owns canonical stock movements, quantities, lots/serial genealogy and stock custody accounts; Location owns place and geospatial references, **not** routing/navigation calculations; a separate approved routing provider/adapter supplies road distances, geometry and travel-time matrices; Asset owns vehicle identity/condition; Booking owns reserved resources; Accounting owns valuation, landed-cost allocation and journals; Pricing/Billing/Invoice/Payment Gateway own customer commercial charges and settlement; Integrations owns carrier/3PL credentials, transports and vendor mappings; Legal Compliance and qualified regulators own legal interpretation and clearances. Logistics owns transport decisions and evidence, not these other authorities.

## Operating lifecycle and despatch

1. Receive authorised transport intent and check tenant, effective restrictions, contents, destination, stock/warehouse readiness and commercial or resource prerequisites as applicable.
2. Prepare a despatch wave; group parcels, transport legs and stops; allocate services or vehicles; produce route proposals, manifests, labels and loading/collection instructions.
3. Distinguish **planned → readiness checked → approved → released → physically handed over → in transit → reported delivered → verified delivered**. Record failed, refused, lost, damaged, partial, disputed and returning outcomes independently. A release is not a physical collection; packed is not handed over.
4. Track checkpoints, delivery attempts, proof and changes. Reconcile partial deliveries and returns by parcel/handling unit and leg. A parent shipment closes only when every required child has a qualified terminal outcome.
5. Preserve original claims and append reasoned, authorised corrections. After physical handover, cancellation means interception/return requested, **not** erasing a consignment.
6. Reconcile accepted-but-unknown carrier bookings by idempotency key and remote reference before retrying. Provider delays, contradiction, replay or unverified proof remain visible as unknown/pending/exception; optional carrier failure permits suitably evidenced manual transport.

**Despatch Management is integral to Logistics (LGS-12).** A despatcher is a permission-scoped role, not an Identity subtype or separate capability. Logistics plans the load/route, confirms required owner decisions, approves/holds/releases despatch and tracks custody; it never silently books another owner's resources, loads a Warehouse parcel or issues Inventory stock. Missing mandatory authorisation or readiness **holds release**.

## Route optimisation (LGS-11)

**Essential business function:** single-vehicle Travelling Salesman Problem (TSP) and multi-vehicle Vehicle Routing Problem (VRP), with pickups, deliveries, capacity (weight/volume), time windows, priorities, service durations, depot start/end, vehicle/driver eligibility, working hours, mode and access restrictions, pickup-before-delivery and hard safety/legal constraints. Optimise time, distance, cost or utilisation subject to explicit approved objectives; hard restrictions cannot be traded away for a better score.

**Input:** versioned shipments/stops, destination references, operational objectives, capacities, time windows, policy, resources and availability from Asset/Booking, prepared goods from Warehouse, fulfilment needs from Order, and **source-qualified road time/distance matrices and route geometry from an optional routing provider/adapter**. Capture matrix departure assumptions, mode, freshness and provider/version. Location supplies the versioned place/geometry references; the routing adapter calculates road-network paths and matrices. **Logistics decides which vehicle serves which stop and in what order**, and remains responsible for route/service suitability and approvals.

**Output:** versioned **candidate** route plans containing assigned vehicles, ordered stops, estimated arrivals, duration/distance/cost, objective, constraint results, infeasible/unassigned stops, uncertainty, provenance and solver revision. Feasible does not mean globally optimal or legally authorised. A dispatcher reviews/adjusts and explicitly approves/publishes a route after checking permissions, resource allocations, upstream versions and mandatory constraints.

Re-planning proposes a new revision after delays, cancellations or breakdowns; it preserves completed visits and custody, and does not silently change active driver instructions. Distinguish solver timeout, impossible constraints, stale matrix and provider outage. Manual sequencing remains available without fabricating road travel figures. Bound optimisation computation and tenant quotas.

**Libraries are candidates, not mandated:** [VROOM](../../../RESOURCES.md#ref-3f30cade) (BSD-2-Clause) for constrained VRP, [OR-Tools](../../../RESOURCES.md#ref-7011995a) (Apache-2.0) as an alternative; [Valhalla](../../../RESOURCES.md#ref-1d240d0a) (MIT) as an optional routing-provider adapter composed for Logistics (not Location's owned place register). Verify releases, dependency licences and source completeness before selection.

## Idealised public input contract

| Source / public input | Facts or commands supplied | Requirement and failure |
|---|---|---|
| **Host, IAM, Clock, Configuration** | Trusted tenant, organisation, caller, assurance and resource/action decision; qualified time and approved effective service/proof/retention policy | **Essential for protected operations**; missing or denied authority fails closed; time/policy must be traceable |
| **Operator / despatcher** | Request/revise/cancel shipment, despatch wave, route optimisation, plan approval/release, checkpoint, delivery/return/exception and cost correction; expected revision, evidence and idempotency | Required per operation; reject unauthorised/stale/conflicting commands; do not confuse command accepted with business completion |
| **Order or relevant requesting domain** | Delivery/collection obligations, recipient, promised terms, cancellation and return intent | Conditional on business origin; withdrawn/stale obligation places affected work on hold |
| **Warehouse** | Packed parcels, measurements, readiness, loading/handover/receipt and discrepancies | Conditional on Warehouse operation; readiness is not proof of carrier custody |
| **Inventory** | Stock issue/receipt/transfer references, lot/serial and stock account/quantity decisions | Conditional on stock-bearing work; Logistics cannot change stock balances |
| **Location; optional routing provider/adapter** | Location: versioned place/geometry, CRS, accuracy, provenance. Routing adapter: road-network geometry, travel matrix, timing assumptions and freshness | Place authority conditional where composed; road-network optimisation requires qualified routing data, with manual sequencing fallback and no inferred travel time |
| **Asset / Booking** | Vehicle suitability, capacity, driver/resource eligibility and approved reservations | Conditional for local fleet; missing allocation blocks the affected assignment |
| **Integrations / carrier / 3PL** | Verified booking IDs, rates, scans, signatures, tracking, documents and charge claims | **Optional**; validate signatures, source, version, replay, freshness and contradictions |
| **Legal Compliance / Privacy / qualified authority** | Route/contents restrictions, customs/controlled-goods release, retention and disclosure limits | Required where applicable; uncertain clearance holds movement, no Logistics self-certification |
| **Task / Workflow / Scheduler** | Approved assignments, workflow outcomes and operational timing | Conditional to configured automation; no alternate approval authority |

## Idealised public output contract

| Public output | Consumers / meaning |
|---|---|
| **Shipment, parcel and leg read models** | Authorised Order, Warehouse, Inventory, support and Reporting: versioned Logistics state, provenance and partial/unknown outcomes; **not** their own business completion |
| **Despatch plans, manifests and instructions** | Despatchers, Warehouse and carrier: readiness, hold/approval/release, assigned vehicle/driver, physical handover status |
| **Route candidate and published itinerary** | Despatcher/driver: ordered stops, constraints, infeasibility, estimates, approval, revision and uncertainty |
| **Tracking and ETA** | Operators and narrowly authorised customers: checkpoints, estimates and limited location, with source and precision |
| **Delivery / return / loss / dispute evidence** | Order, Inventory, Warehouse, customer service and Audit: partial outcomes, reported versus verified proof and corrections |
| **Freight quote, charge and claim evidence** | Accounting, Billing, Invoice, Pricing and contracting owners: currency, rate reference, estimated/quoted/incurred/invoiced/disputed amounts, payer/payee and allocation references; **no journal or customer charge decision** |
| **Exception / reconciliation work** | Operators, Workflow/Task and authorised supervisors: failures, unknown state, cause, pending approvals and resolution |
| **Authorised documents / exports** | Carrier, recipient and qualified reviewers: manifest, label, proof or transport reference with privacy minimisation |
| **Committed Logistics events** | Message Queue relay, other owners, Audit and Reporting: owned facts through Logistics' durable outbox; not commands to alter consumer-owned records |

**Public commands:** create/change/cancel/split shipment; prepare/check/approve/hold/release despatch; optimise/compare/approve/publish/replan routes; tender/assign carrier; record handover/checkpoint/attempt/proof/exception/return; attach/reconcile costs and remote IDs; authorised correction/archive. **Queries:** permitted shipment/leg/parcel timelines, despatch queue, resource/route candidates, live status and discrepancies, proof, freight evidence and retention-qualified exports. **Events:** `ShipmentPlanned`, `TenderAccepted`, `DespatchReleased`, `HandoffRecorded`, `CheckpointRecorded`, `DeliveryEvidenceReceived`, `DeliveryVerified`, `ReturnVerified`, `ShipmentExceptionRaised`, `FreightEvidenceRecorded`, `ShipmentCorrected`, `RoutePlanProposed`, `RoutePlanApproved`, `RoutePlanPublished`, `RoutePlanRevised` and relevant despatch readiness/hold/reconciliation facts. These are **conceptual event names**, not verified code exports.

Commands return `accepted`, `committed`, `pending_provider`, `pending_verification`, `rejected` or `unknown_reconcile` with safe reasons. Queries and events include tenant/organisation scope, aggregate/revision, event identity, actor/source, provenance, relevant policy/schema version, qualified occurrence/receipt time, correlation and freshness. No cross-capability exactly-once guarantee: consumers deduplicate, reconcile delays/replays and keep their own decisions. Logistics owns the committed transactional outbox; Message Queue relays it.

## Cooperating capability boundaries

| Capability | Logistics needs from it | Logistics sends / makes available to it |
|---|---|---|
| **Order** | Versioned fulfilment/return obligations | Dispatch/route progress, proof, exceptions and estimates; no automatic Order acceptance |
| **Warehouse** | Physical packing, load/readiness, handling and receipts | Manifests, loading sequence, carrier instructions and handover evidence |
| **Inventory** | Stock issue/receipt/transfer decisions and genealogy references | Transport custody, issue/return/loss evidence; **Inventory** alone changes quantities and stock accounts |
| **Location; routing adapter** | Location provides authorised place precision and geometry, not route safety or navigation. A separate routing adapter provides qualified paths/matrices if enabled | Logistics supplies stop/place references and routing inputs; owns dispatch, planned route selection and allocation |
| **Asset / Booking** | Fleet suitability, availability and capacity reservations | Candidate/published demand and usage evidence, no asset mutation or implicit booking |
| **Integrations** | Carrier/3PL identity mapping and verified external responses | Transport intent, booking/cancellation/reconciliation requests; native manual fallback |
| **Accounting / Billing / Invoice / Pricing** | Approved classification or relevant billable terms where needed | Evidence of transport service, estimated/actual costs, variance/disputes; no financial posting or price decision |
| **Legal Compliance / Privacy** | Applicable jurisdictional controls, qualified clearance and disclosure/retention decisions | Holds, restricted-movement status, document and evidence references |
| **IAM / Configuration / Clock** | Trusted authority, policy scopes/revisions, time semantics | Scoped domain action context, evidence and health; cannot bypass those owners |
| **Workflow / Task / Scheduler / MQ** | Approved assignments/automation and relay services | Qualified tasks, approvals requested, schedules and committed outbox events |
| **Logging** | Diagnostic submission/health result | **Logistics → Logging:** sanitised technical failures, retries and correlation; no raw address/signature/secret; accepted log ≠ business success |
| **Audit** | Evidence intake result, integrity/coverage and authorised review reference | **Logistics → Audit:** despatch/route approvals, delegated action, handover, verified proof, overrides, sensitive disclosure, exceptions, corrections |
| **Reporting** | Derived KPIs, report status/results where wanted | **Logistics → Reporting:** versioned authorised shipment, route, despatch, delivery, cost and correction feeds; no direct DB access |
| **Observability** | Common health/tracing service where composed | Technical timings, resource usage and health measures; separate from Audit/Reporting |

**Outbound direction is primary.** Logging returns diagnostic intake/health, Audit returns evidence intake/verification and Reporting returns analyses. These return flows do **not** imply shared domain authority. Routine Logging/Reporting outages must not roll back transport. Audit-critical operations use risk-tier policy: if a required evidential guarantee is unavailable, fail closed or remain explicitly pending; ordinary accountable events may be delivered asynchronously via the durable outbox and reconciled. Audit receipt proves evidence acceptance, **not** actual delivery.

All interactions are logical public contracts composed by the host or messaging platform, not mandatory direct package imports. Keep dependency graphs acyclic. Prior approved Inventory-side external processing, in-transit and disputed custody requirements remain authoritative **within Inventory's own scope**.

**Latest cross-capability reconciliation (21 November 2026):** The now-approved Location concept owns place/geometry references, CRS, precision and provenance; it explicitly **excludes routing/navigation and road-time promises**. Road-network calculations therefore belong to an optional replaceable routing adapter/service consumed by Logistics, without creating a separate mandatory Logistics capability. The newly established Facility concept owns authorised site-layout and internal circulation restrictions; Manufacturing owns production operation/transfer instructions and Warehouse owns physical internal handling. Logistics owns **external transport and inter-site shipment execution**, including subcontractor carriage, but must not silently claim to route internal factory movements or override Facility access/safety rules. An approved internal-to-external handover can reference these owners' evidence. None of this changes Inventory's stock authority.

## Governance, privacy, security and reliability

- **Security:** OWASP ASVS 5 L2, L3 for justified critical operations; server-side tenant/resource/action and assurance enforcement for every read/mutation; scoped delegated drivers and carriers. Tracking numbers alone are not public access credentials. No cross-tenant disclosure through search, status or public ETA.
- **Evidence:** Retain reported, witnessed, signed, photographed, recipient-acknowledged and independently verified proof as distinct classes with source, time, confidence, corrections and dispute trail. Tenant-configurable requirements must never weaken legal/security minima.
- **Privacy:** Minimise/encrypt names, phone numbers, addresses, signatures, location history and vehicle/driver data; enforce effective retention, holds and lawful subject-rights outcomes through Privacy and Legal Compliance.
- **Contracts and charges:** Logistics manages operational carrier choice, rate references, authorised capacity and transport charges. Binding contracting/procurement/legal liabilities remain with the responsible commercial authority. Warehouse owns occupancy/handling; Logistics owns transport-specific detention/demurrage/movement cost evidence; Billing and Accounting own charges and recognition.
- **Regulated transport:** Apply qualified effective/jurisdiction-specific customs, dangerous-goods, sanctions and trade requirements before dispatch; Logistics coordinates hold/document references, **never** declares itself a customs/legal authority.
- **Failure:** Persist before publishing owned events. Return explicit unknown/reconcile after provider timeouts, never blind retry of a possibly accepted booking. Correct by append-only superseding facts, preserve chronology. Manual carrier-free mode and authorised manual route sequencing continue when optional integrations fail; unavailable mandatory trust/policy/persistence blocks unsafe mutation.
- **Commercial and policy separation:** Configuration stores approved scoped rules, while Logistics enforces domain rules; legal requirements and non-overridable assurance floors take precedence. Tenant ownership, billing party, commercial entitlement, provisioning and caller access remain different concerns.

## Optional GUI — advisory presentation guidance

The shared [application-test-template](../../../RESOURCES.md#ref-f1f7cc47) is a **reference**, not a production requirement. Its host shell has a collapsible **Capabilities** sidebar linking to Theme Manager, shared header/Appearance control, an `/admin` test dashboard and a separate `/` homepage. A consuming host **could** add **Capabilities → Logistics** to open a Logistics dashboard (illustrative path `/logistics`) using the same shell; host owns navigation, branding and route placement. Theme Manager test mode must not be deployed publicly.

These **recommended**, non-prescriptive screens can be combined, renamed, omitted or rearranged by the host according to audience:

| Screen | Suggested task and public surface |
|---|---|
| Dashboard | Summary of planned/in transit/late work, held despatches and exceptions using authorised queries; optional Reporting-owned KPIs |
| **Despatch workbench** | Readiness queue, group/wave shipments, load plans, hold/approve/release, manifests and handover |
| **Route planner** | Interactive multi-vehicle/stop map **and accessible list**, constraint warnings, unassigned stops, candidate comparison and approved publication |
| Shipments | Search parcels/legs, tracking, history, labels and proof |
| Live operations | Active route, delayed stop and exception feeds; controlled revision/replanning |
| Returns and exceptions | Damage/loss/partial returns, disputes, proof review and reconciliation |
| Freight costs | Quote versus actual/claimed/disputed transport evidence, not Accounting journals |
| Reports | Optional Reporting-owned authorised results and freshness warnings |
| Settings | Carrier/3PL adapters, domain policies, evidence requirements, service restrictions |
| Mobile driver/warehouse | Assigned next stop, handover scan, proof, manual input, exception; offline **queued ≠ confirmed** until server validation |
| Recipient tracking | Narrow authorised minimal status, no guessable cross-tenant detail |

Logistics may publish optional screen components, navigation metadata, message keys, loading/denied/error states and public action bindings. The **host** chooses presentation, and a headless consumer receives equivalent domain services. Optional presentation does not override the ADR-0012 one-call/≤50-line Nuxt host integration budget where applicable. Use Theme Manager semantic tokens, accessible large targets, keyboard/assistive technology, WCAG 2.2 AA, non-colour-only warnings, reduced motion, BCP 47/CLDR translations and Clock-based time display. Every screen and action is server-authorised; hidden links are not security. Missing optional Location/Reporting/carrier/routing providers have honest degraded/manual states.

## Standards and open-source implementation references

**Approved direction, not a compliance or library-adoption claim.** Use [GS1 EPCIS/CBV](../../../RESOURCES.md#ref-1bbbdbc6) for interoperable traceability event mapping; GS1 SSCC/GLN/GTIN for externally identified handling units, locations and goods; [UN/CEFACT transport models](../../../RESOURCES.md#ref-4b03c321) for multimodal information and document mappings; [ISO 28000](../../../RESOURCES.md#ref-c7f3ad87) for supply-chain security risk; [W3C PROV-O](../../../RESOURCES.md#ref-20aa2e25) for provenance, with verifiable credentials optional. Preserve internal native identifiers and events; identify external key namespaces, source, format version and validity instead of forcing every delivery through EPCIS.

Apply **only where applicable**: CMR/eCMR international road documents; WCO Data Model for customs; IATA ONE Record/Cargo-XML for air cargo; IMO FAL for maritime reporting; ISO 6346 container IDs and ISO 17363 container RFID; ADR dangerous goods, UK Electronic Trade Documents Act 2023, relevant UK operator licensing and carriage restrictions, UK GDPR/Data Protection Act, and applicable overseas law. Qualified Legal Compliance/regulatory owners determine requirements by effective date, mode, jurisdiction and cargo. W3C WCAG 2.2 AA, BCP 47/CLDR, RFC 3339 time interchange and RFC 9457 HTTP problems apply in relevant presentation/API designs.

**Minimal candidate stack:** `pg` (MIT) for capability-owned PostgreSQL transactions and stores; Zod (MIT) for runtime data validation. Consider Drizzle (Apache-2.0) or Ajv (MIT) only if typed queries/JSON Schema exchange justify them; Undici (MIT) or fast-xml-parser (MIT) for provider adapters; bwip-js (MIT) for barcodes; ZXing-C++ (Apache-2.0) with a separately verified maintained WASM adapter for scanning. Location may use Turf (MIT), H3 (Apache-2.0), MapLibre (BSD-3-Clause) and PMTiles (BSD-3-Clause) for its own geographic work. Logistics may consume optional Valhalla (MIT) or OSRM (BSD-2-Clause) road-routing services through a separate provider-neutral routing adapter; no Location ownership of navigation is implied. Reuse existing Temporal Gateway, Scheduler, Workflow, Message Queue and Observability; do **not** add a second queue/solver service without evidence.

**Full-source/permissive licence rule:** Only adopt complete publicly available source for the exact required functions, with no mandatory premium modules, SaaS lock-in or delayed public code. Check pinned version, transitive dependencies, release and security status, build reproducibility and Node/TS compatibility. Open-core OpenEPCIS and GraphHopper commercial API reliance, stale ZXing-JS and GPL-licensed PostGIS are **not approved defaults** under the stated strict criterion; map tiles and OSM data have **separate licences**. A reference library is not a binding dependency or an approved LGS-10 choice.

## Conceptual acceptance examples

| Situation | Required business behaviour |
|---|---|
| One company van, no carrier API | Authorised manual route, despatch, witness handover and qualified signed delivery without external transport service |
| 100 stops across several vehicles | TSP/VRP candidate honours capacities, working hours, time windows and pickup-before-delivery; lists infeasible/unassigned stops |
| New urgent delivery mid-trip | New proposed route version retains completed stops and custody; no silent active-driver reassignment |
| Three parcels; only two collected | Record two real handovers and one waiting parcel; parent not fully despatched |
| Provider says delivered without sufficient proof; recipient disputes | Mark reported/unverified and open an exception; no automatic Order or Inventory completion |
| Freight quote £50; carrier invoice £65; customer charge £40 | Preserve three distinct facts and explain variance; no automatic journal or customer invoice change |
| Inventory rejects issue or legal customs hold applies | Block affected despatch; do not alter stock or self-certify legal clearance |
| Carrier booking times out; duplicate event arrives later | Return unknown/reconcile, deduplicate and preserve source chronology; no blind repeat booking |
| Revoked driver synchronises offline scan | Reject unauthorised update; keep attempted evidence/recovery path, no confirmed handover |
| Routing provider unavailable or no feasible route | Explain uncertainty, allow authorised manual stop order without fabricated road-time estimate |
| Cross-tenant tracking lookup | Deny protected information, expose only explicitly authorised minimal public status |
| Audit-critical release and Audit evidence intake unavailable | Hold/fail closed according to effective risk-tier policy; routine Logging or Reporting outage does not undo committed transport |
| Report and audit after route correction | Reporting recomputes from authoritative revision, Audit retains linked correction, Logging retains only safe diagnostics |
| GUI disabled | Same validated headless commands/queries/events remain available; no required sidebar or map |

## Decision status, completeness and handover

| Decision | Owner-approved conceptual scope |
|---|---|
| **LGS-01** | Native shipment/transport/handover/delivery authority |
| **LGS-02** | Separate Order, Warehouse, Inventory, Accounting and Location ownership |
| **LGS-03** | Multi-leg, partial, lost, damaged, disputed and reverse outcomes |
| **LGS-04** | Provider-neutral carriers/3PL and manual operation |
| **LGS-05** | Distinct estimated/quoted/incurred/invoiced/disputed freight evidence |
| **LGS-06** | Logistics carrier booking/tariffs; binding contracts stay with commercial/legal owners |
| **LGS-07** | Warehouse occupancy versus Logistics transport charges versus Billing/Accounting decisions |
| **LGS-08** | Risk-based verified proof, delegation and privacy/security minimums |
| **LGS-09** | Coordinated legal/customs holds, without self-certification |
| **LGS-11** | Essential TSP/VRP multi-vehicle route planning and safe replanning; no mandated solver |
| **LGS-12** | Essential Despatch Management inside Logistics; despatcher is an authorised role |

**LGS-10 — OPEN, NOT APPROVED:** Future implementation/contract acceptance must still define precise root `CONTRACT.md` exports, schemas, typed failures, dependencies and absence modes, actual adapter/solver selection and legal/licence review, provider uncertainty, durable outbox and retention model, independent consumer, Nuxt host budget where applicable, security and CI/acceptance evidence. This is **not an unresolved conceptual ownership principle** and should not be misrepresented as approved or implemented.

**Conceptual completion assessment:** All approved responsibilities, public input/output surfaces, reciprocal owners, security/privacy, provider failures, standards, advisory GUI and representative acceptance cases are covered. Separate technical, implementation and pre-merge reconciliation gates remain. The original draft PR must remain open until separately authorised merge; changes to concurrent Location/other proposals require current-master architectural reconciliation before merge. No implementation package or tested runtime API is claimed.


### Facility loading-site reciprocity — 21 November 2026 (approved concept, PR #107)

[Facility's conceptual public contract](../facility/capability-record.md) qualifies facility gates, loading points, vehicle/visitor class and internal permitted circulation, with source-qualified revisions, closure and access restrictions. Logistics owns shipment, carrier and external transfer decisions, and may request eligibility for vehicle dimensions/arrival times; a permitted site entrance does not establish despatch or delivery. Site-wide restricted geometry stays confidential; no new hard package dependency is implied. The Logistics review is governed by its approved record; Facility implementation remains unverified.


## Reciprocal interface — Order independent conceptual review (22 November 2026, draft PR #113)

**Status: Order-side conceptual contract ORD-01–ORD-11 owner-approved 22 November 2026; implementation and this neighbour's independent contract approval are not implied.** [Order's canonical public conceptual contract](../order/capability-record.md) owns versioned sales/purchase commitments, accepted seller-scoped order lines (multi-seller checkout uses shared correlation with distinct seller orders), amendments, cancellation, returns and commercial obligation status. A tenant-scoped Business Contacts/Parties authority supplies current counterparty facts (exact capability allocation remains subject to its own review); long-term contract terms and physical/service performance evidence have separate owners. Order exposes scoped commands, authorised queries and durable committed events. This neighbour retains its own authoritative decisions: an Order never proves stock, transport, charges, issued invoices, payment, postings, scheme rights or entitlements. Exchange only versioned, provenance-rich, tenant-authorised public information, with explicit stale/unknown outcomes. Preserve this neighbour's own decisions and reconcile any differing provisional PR before its approval or merge.

**Standards alignment (Order-side approved conceptual scope):** Order's optional UBL/Peppol/GS1 exchange profiles can carry agreed delivery requirements and authoritative order references; Logistics alone owns delivery execution/proof, and externally acknowledged order receipt must not imply transport completion.



## Warehouse reciprocal interface — 23 November 2026 (draft PR #149)

**Status: proposed Warehouse-side conceptual contract; not independently approved or implemented.** [Warehouse](../warehouse/capability-record.md) owns physical receiving, inspection/count evidence, bin/staging work, put-away, picking, packing, occupancy and physical custody acknowledgements. Logistics alone owns shipment/route/carrier tender, verified transport acceptance and delivery; Warehouse provides measured packages, readiness and witnessed loading/handoff. Consumers must use versioned authorised public contracts, distinguish observed/queued/physically completed from independently confirmed source-owner outcomes, and reconcile duplicate/unknown provider results. This note **does not approve or complete** the neighbouring capability's independent review; see Warehouse draft PR #149.
