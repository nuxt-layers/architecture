# Facility — conceptual capability record

**Classification:** Stateful, responsibility-owning **Domain capability candidate**; independently useful without Manufacturing or GIS. **Conceptual status:** **Complete and owner-approved, 21 November 2026** (FAC-01–FAC-10, standards baseline, preferred open-source shortlist, reciprocal Logging/Audit/Reporting boundaries and advisory GUI). **Repository status:** draft Facility PR #107 awaits reconciliation and explicit merge approval. This blueprint is not an implemented API, published root `CONTRACT.md`, safety certificate or acceptance test result. consistency review (former review: facility independent consistency review 2026 11 21) · merged foundation #105. Accepted governing ADRs and Capability Standard take precedence.

## Purpose, authority and exclusions

Facility describes **operational premises, approved layout, usable space, permitted circulation and physical-zone restrictions** for factories, warehouses, offices, schools, laboratories and venues. It supports owned, leased, shared and externally managed premises. Its site operator/steward, legal owner and property manager may differ; scopes, delegations and source evidence must identify who may approve which changes. Shared landlord and tenant layouts never imply cross-tenant visibility.

**Facility owns:** site/building/floor/room/zone operational identifiers and hierarchy; locally measured 2D layouts and effective revisions; doors, passages, lifts, stairs, gates, lanes, crossings and connected networks; pedestrian, accessible, trolley, forklift/AGV and vehicle eligibility; clearance, load, direction, time and protective-closure controls; effective operational usable-area designations; qualified attestation, approval, evidence references, corrections and publication. It decides **which passage is eligible under known, effective constraints**, not whether movement has occurred or whether all current physical hazards are absent.

**Other authorities remain separate:** [Asset](../asset/capability-record.md) owns managed building/equipment identity, legal and custodial relationships, condition and maintenance; [Location](../location/capability-record.md) owns reusable place/geospatial references, not physical access permission; [Manufacturing](../manufacturing/capability-record.md) owns production operations, work-centre routing, movement demand and dispatch; [Warehouse](../warehouse/capability-record.md) owns handling, staging and custody tasks; Inventory alone commits stock quantities/positions/movements; Logistics owns external delivery/carriage; Booking owns reservations; Quality's separate review determines its inspection/disposition authority, not Facility's closures. Authorisation owns caller access decisions while Facility enforces additional domain restrictions. Qualified statutory, fire, accessibility and occupational safety authorities own their certifications and emergency decisions.

Under **FAC-09/FAC-10**, Facility does **not** own live headcounts, attendance, bookings, material movements, maintenance execution, fire certification, certified evacuation routing, cleaning, utilities or room-service requests. Use existing capabilities where appropriate; reconsider a separate facilities-services domain only through a distinct review. Optional declared room occupancy/capacity is not a live count or legal certificate.

## Native operating model and lifecycle

**Minimum native service:** authorised, measured local 2D plans; site/floor/zone registers; manual passage/restriction editing; topology validation; qualified review; effective publication; scoped route eligibility; closure and revision history. It must work without CAD, GIS, live sensors, Manufacturing, Warehouse, SaaS providers, 3D or collaboration services.

- **Site:** draft → validated → operationally approved → active → restricted/suspended → retired, with stewardship, tenant, scope, time and external building/place references.
- **Plan/circulation revision:** draft → validated → qualified attestation → approved → effective/active → superseded/archived. Active revisions are immutable snapshots; activation is atomic within Facility. Future-dated changes and revised historical corrections retain explicit effective and recorded times. Concurrent edits require expected revision, compare/rebase or conflict resolution, never silent overwrite.
- **Restrictions:** authorised planned/urgent imposition → effective restriction → qualified review → independently authorised release or replacement. Record affected area/links, vehicle/person class, source, severity, reason, start, review/expiry time and evidence. **Expiry or a favourable sensor reading never automatically reopens a hazard.** Protective closure can become effective immediately without waiting for an external Audit service; the evidence obligation remains durable and subject to reconciliation.
- **Evidence:** plan source, rights, survey date/accuracy, measured versus estimated properties, scale, units, source/approver authority, provider observations, correction lineage and confidence. Contradictory sensor/third-party evidence is quarantined or disputed, not silently promoted.

**Invariants:** explicit scale/units and coherent graph nodes/edges for approved layouts; source-qualified permissions; scoped unique identities; non-overlapping effective published revisions; no operational route over an effectively closed or unapproved edge; deny/unknown rather than positive qualification for stale, missing or contradictory safety information; revision fencing, idempotency, least privilege, tenant/programme isolation and immutable correction history. A historical plan remains an authorised historical fact, **not** today's permission.

## Scaled 2D editor and circulation model

Provide a **replaceable, accessible 2D editor** that can draw or import a source plan, measure/calibrate its scale, maintain dimensions and controlled layers, mark walls/openings, zones, doors, equipment *references*, stations, storage and loading points, passages, crossing types, directions, clearance/load/slope/turn constraints and floor-to-floor connections. Model pedestrian, wheelchair, trolley, forklift, AGV and other vehicle classes explicitly; unknown dimensions prevent unwarranted distance or safe-route conclusions. Machine footprints link to Asset identities and Manufacturing work centres but never update those owners by editing a symbol.

Separate source drawings, Facility-controlled operational topology and temporary restrictions. SVG/DXF/PDF, raster plans, GIS/BIM, external sensors and 3D are **optional provider-neutral adapters**; import bytes may belong to a separate File/Storage owner. Check malware, embedded content, copyright, units, CRS, precision, source rights and lineage. Unscaled/unverified drawings can be draft visualisations, **never** automatically approved travel networks.

For a route eligibility query, accept authorised source/destination zone references, movement type and dimensions, effective time and constraints; return **eligible, blocked or unknown**, with a qualified graph/candidate, exclusions, reasons, plan/restriction revisions and data confidence. Facility does not optimise Manufacturing dispatch or command machine safety controllers. A reusable stateless graph solver may calculate paths, but neither a shortest path nor an apparently drawn corridor grants physical safety or confirms travel. On closure/revision changes, consuming capabilities requalify cached suggestions or stop/re-plan affected movement.

## Planned published input contract

This is the **idealised meaning** of public ports, not invented shipped endpoints, types or method names.

| Source / owner | Input to Facility | Requirement / validation |
|---|---|---|
| Qualified Facility operator, surveyor and safety authority | Create site; draw/import/validate plan; attest, submit/approve/activate revision; set or release restrictions; correction/retirement | Essential for affected operation; authorise scope and separation of duties, verify revision and evidence; reject incomplete approval |
| Asset | Managed building/equipment identity, placement references, physical condition and maintenance restrictions | Conditional for registered assets; stale hazard evidence cannot justify passage |
| Location | Place, entrance, geographic coordinates/CRS and source accuracy | Optional for local plans; explicit reconciliation if inconsistent |
| Manufacturing | Work-centre references, machine footprint, movement class and transfer demand | Optional; no ownership of production orders or movement outcome |
| Warehouse / Inventory | Handling and staging requirements; bin references and safely relevant stock/storage constraints | Optional; never commit stock or custody from Facility |
| Logistics / Booking / Quality | Vehicle and gate requirements; authorised room use; inspection findings/qualified hazards | Conditional when composed; observation or booking alone does not create a Facility closure or permission |
| Configuration, Clock, Identity, Authentication, Authorisation, Legal Compliance | Policies, trusted tenant/caller/delegation, applicable assurance, time/zone and mandatory jurisdictional restrictions | Essential for relevant protected and qualified operations; fail closed if required rights or safety policy unknown |
| Optional Integrations, Content Security, file sources or sensors | Scanned plans, provider identity, measurements, alarm/door observations and source quality | Optional and untrusted until independently validated; disagreement triggers reconciliation |

Common applicable context: owner/tenant/resource scope; trusted actor/assurance/delegation; target revision; policy version; effective time and observation time; reason; idempotency/correlation; source, evidence rights, quality and disclosure class. **No universal mandatory request object.** An incoming event does not authorise a command.

## Planned published output contract

| Consumer | Facility supplies | Limit |
|---|---|---|
| Host, authorised operators and GUIs | Scoped site hierarchy; measured layout/revision, usable zones, approved restrictions, approval history and permitted editor data | Not a certified as-built survey; redaction prevents geometry inference |
| Manufacturing | Eligible site graph, adjacency, station/zone references and effective restriction changes | Manufacturing owns production dispatch and execution |
| Warehouse | Passage/gate/loading eligibility, class/clearance constraints and closure updates | Warehouse owns handling; Inventory confirms stock |
| Logistics and carriers | Authorised gate/loading-zone and vehicle class eligibility | Does not confirm a shipment or delivery |
| Asset / Location / Booking / Quality | Facility associations, space suitability, active restrictions and relevant change events | Never changes those domains' authoritative data |
| Audit | Attributable committed plan approvals, closures/releases, security-sensitive decisions and correction events, with source IDs/evidence | Audit independently accepts, preserves and verifies evidence |
| Logging / Observability | Bounded, sanitised errors, processing status, latency and health/correlation | Diagnostics are not Audit evidence |
| Reporting / Search | Authorised revisioned areas, closure intervals, usability and safe aggregate/index references | Derived reports/indexes are never Facility's safety authority |
| Workflow, Notifications, Message Queue | Review/action requests, authorised exception notices, committed Facility outbox events | These services coordinate/deliver; Facility commits its own decision |

Every protected output is permission-checked, and, where meaningful, records source identity/version, effective-as-of and observed-at time, redaction, completeness, uncertainty and applicable movement class. No hidden-room adjacency, small-group inference or unrestricted blueprint export.

### Commands, queries, events and failure/recovery

**Commands:** register/change site; create/import/calibrate/edit/validate draft; attest/approve/activate/supersede; impose/extend/release restriction; reconcile source observation; revise operating scope; retire site; request scoped export. Require idempotency, expected revision, domain invariants, trusted authority and evidence. Return distinct **rejected, validated, awaiting approval, committed, pending or unknown** results; no external attempt implies completion.

**Queries:** authorised site/floor/zone/plan; effective or historic topology; movement eligibility and blocked reasons; revisions and evidence; restrictions/reconciliation queue; disclosure-specific drawing or export. State freshness and whether result is current, historical, observed or confirmed.

**Committed events:** e.g. `FacilitySiteActivated`, `LayoutRevisionActivated`, `LayoutRevisionSuperseded`, `ZoneRestrictionImposed`, `ZoneRestrictionReleased`, `TraversalEligibilityChanged`, `FacilityAuthorityChanged`, `FacilityEvidenceChallenged`, `FacilityCorrectionRecorded`. Publish **after Facility commit from its own durable outbox**. Message Queue is transport only. Deliver at least once; consumers deduplicate, tolerate late/reordered events, reconcile gaps and requalify cached plans. Never promise distributed exactly-once delivery. Unknown provider state or a remote timeout remains explicitly uncertain; protect the relevant area conservatively.

## Logging, Audit, Reporting and other cooperation

| Partner | Facility sends | Facility receives / distinct owner |
|---|---|---|
| **Logging** | Sanitised technical error/severity/operation/time/correlation for import, geometry, graph or provider failures; no confidential drawing or credential | Logging receipt (accepted/rejected/throttled/unknown), scoped diagnostics and delivery health. Ordinary logger failure cannot reverse a valid Facility change or satisfy a mandatory Audit obligation |
| **Audit** | Risk-selected attributable approval, restriction, override and correction assertions from Facility's committed change/outbox, with actor/delegation, scope, cause, source event, outcome, revision and timestamps | Audit receipt (accepted/pending/rejected/uncertain), authorised timelines, evidence integrity and coverage/gap status. Facility owns operational facts; Audit owns custody, retention and investigation. Protective closure proceeds during an Audit outage while durable capture/reconciliation remains pending; stricter rules may block subsequent release |
| **Reporting** | Authorised, minimal site/space, closure duration, restriction and effective revision facts/events | Reporting owns definitions, snapshots, aggregates, exports and distribution; sends report reference/status/freshness/lineage. Its absence cannot block Facility. Reauthorise retained reports, small-cohort data, hidden-room geometry and exports |
| **Authorisation / IAM integration** | Resource/action/scope and domain-specific restriction result | Trusted identity, tenancy, assurance, delegation and independent authorisation; no menu item is an access grant |
| **Clock / Configuration / Legal Compliance** | Effective operational evidence and qualified policy results | Time-zone semantics, configurable options and mandatory legal/safety floors; policy cannot weaken statutory requirements |
| **Workflow / Notification / Scheduler / MQ** | Approvals/action-required, future effective tasks and committed events | Generic orchestration, delivery or scheduling status; no operational decision transfer |
| **Search / Observability / Integrations / Content Security** | Authorised redacted references, performance, provider exceptions and import evidence | Derived indexes/telemetry, qualified external observations, scanning results and provider provenance; optional |

Use public contracts and host composition, not private stores, circular imports or copies of another authority. Optional ports must degrade visibly. The Facility state/approval boundary remains independent of Logging, Reporting, GIS and SaaS systems; risk-selected evidence obligations to Audit remain durable rather than best effort.

## Security, safety, standards and open-source choices

**Threats/controls:** adversarial plans and measured dimensions, stale route caches, spoofed sensor signals, unauthorised approval/override, tenant or client-programme crossover, hidden-room inference, leaked CAD/PDF/thumbnail/map tiles/exports, and misleading 'safe' assertions. Enforce resource-aware server-side access, qualified source authority and dual-control when required; redact geometry at source; record attributable changes; minimise personal data, retention and transfers under applicable UK GDPR/other jurisdiction. A Facility restriction is not a fire marshal's certificate, live occupancy assessment or authorised evacuation instruction.

**Owner-approved standards reference baseline (21 November 2026):**

| Concern | Principal references / meaning |
|---|---|
| Governance/definitions | ISO 41011:2024, ISO 41001:2018 (+ 2024 amendment): operating responsibilities, consistent terminology; **not** FAC-10 service expansion |
| Controlled built-asset information | ISO 19650-1:2018, -3:2020, -5:2020 and -6:2025 where applicable: plan revision, security-minded exchange and safety information |
| Indoor graph | [OGC IndoorGML 2.0](https://docs.ogc.org/is/22-045r5/22-045r5.html): topology/navigation concepts, not a required storage or wire format |
| Interoperability/coordinates | [buildingSMART IFC](https://technical.buildingsmart.org/standards/ifc/) / ISO 16739-1:2024, ISO 19111:2019, ISO 19115-1:2014, IETF RFC 7946: optional BIM/GIS exchange, CRS and source accuracy |
| Workplace/physical access | ISO 45001:2018, ISO 21542:2021, where relevant UK BS 8300-2:2018, BS 9999:2017, HSE L24/HSG136 and jurisdictional fire legislation; competent people set applicable limits |
| Web accessibility | [W3C WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) (governing), WAI-ARIA/APG; SVG 2 as a presentation reference (Candidate Recommendation, not final Recommendation) |
| Information security and resilience | ISO/IEC 27001:2022; conditional ISA/IEC 62443 (industrial devices) and ISO 22301:2019 (continuity) |

Use standards as **design guidance** with explicitly qualified jurisdiction, version and professional evidence—not blanket certification. Relevant British legislation, safety duties and authorised competent-person decisions govern actual premises.

**Owner-approved preferred *candidate* open-source tools (21 November 2026), not installed/pinned/accepted releases:** [Konva.js](https://github.com/konvajs/konva) (MIT, preferred Canvas 2D editor), [Graphology](https://github.com/graphology/graphology) (MIT, graph processing) and [RBush](https://github.com/mourner/rbush) (MIT, spatial lookup); conditional [polygon-clipping](https://github.com/mfogel/polygon-clipping) (MIT, polygon Boolean operations) and [Turf.js](https://github.com/Turfjs/turf) (MIT, geographic analysis with correct CRS semantics). [SVG.js](https://github.com/svgdotjs/svg.js) (MIT) is an **alternative** editor, not a second default renderer. Optional: [PDF.js](https://github.com/mozilla/pdf.js) (Apache-2.0) for PDF, [OpenLayers](https://github.com/openlayers/openlayers) (BSD-2-Clause) or [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js) (BSD-3-Clause) for geographic views, [Yjs](https://github.com/yjs/yjs) (MIT) for collaborative **draft** editing and [Three.js](https://github.com/mrdoob/three.js) (MIT) for deferred 3D view. [dxf-parser](https://github.com/gdsestimating/dxf-parser) (MIT) remains conditional on maintenance/coverage assessment; IFC parsing requires a separate verified adapter. Any graph/path library is **replaceable computation only**, never safety or domain authority. Exclude paid/open-core locked services, proprietary source lag, mandatory GIS/CAD/3D and new graph/search/cache servers without a demonstrated need. Before dependency adoption, verify source-to-package parity, licence/transitive notices, pinned release maintenance, security and real drawing performance. External tiles, maps and CAD files may have independent licences.

## Advisory GUI and host composition

The [application test template](https://github.com/nuxt-layers-test/application-test-template/blob/master/README.md) documents a homepage at `/`, an admin/test dashboard at `/admin`, responsive collapsible sidebar and [Theme Manager](https://github.com/nuxt-layers/theme-manager/blob/master/CONTRACT.md) at `/theme-manager`. **Host owns** branding, sidebar, authentication context, routes and composition; **Facility owns** optional domain screens/validation and public contract. A sidebar **Facility** entry leads to its authorised dashboard; exact route names, grouping and screen counts are **advisory**, not prescribed. The reference app's unauthenticated Theme Manager test mode is local-only and must never be inherited in production; its published contract notes an ADR-0012 integration gap, not proof of compliant completed composition.

| Possible view | Public contract workflow |
|---|---|
| **Facility dashboard** | Site selector, active plan/version, restrictions, urgent closures, approvals and reconciliation; explicit unknown/stale/permission states |
| **Sites / buildings / zones** | Authorised hierarchy, operator/stewardship scope, links to Asset and Location |
| **Floor plan viewer** | Layered approved 2D drawing, controlled redaction, spatial relationships and **accessible zone/edge table** |
| **Draft layout editor** | Draw/import, calibrate, edit walls/doors/zones/graph links, set dimensions, validate, compare and submit—**saving never activates** |
| **Circulation** | Select permitted movement mode/dimensions, origin/destination and effective time; inspect eligible/blocked/unknown paths and reasons |
| **Restrictions / closures** | Qualified immediate protective restriction and **separate** reopening, source/effective interval and reconciliation |
| **Approvals / revisions** | Draft/validating/awaiting approval/approved/active/superseded states, source evidence, conflict/compare and qualified approval |
| **Administration / evidence** | Scoped delegates, policy/visibility, source lineage, authorised export, Audit links and technical diagnostic links |

An editor can combine a site/floor picker, layered plan, tools, object properties, dimension/constraint forms, validation errors, changes/diff and a separate submit/approve action; a text/table alternative must support the same essential tasks. Contextual panels may link from Manufacturing work centres, Warehouse staging, Asset equipment or Logistics gates while calling each owning public port. Users see only permitted actions and data; real permission checks occur **server-side** for every command/query. Use Theme Manager's semantic vocabulary, WCAG 2.2 AA keyboard/focus/text equivalents, high contrast/forced-colour and reduced motion, responsive touch, internationalisation, unit selection and Clock-qualified effective dates. Offline drafts remain pending and visibly stale until reconciled; no offline closure is falsely confirmed as effective. Never leak classified geometry through canvas cache, thumbnails, exports, ARIA labels or counts. Headless operation remains supported.

## Conceptual acceptance cases

| Scenario | Required result / authority |
|---|---|
| Leased or shared premises | Facility operates scoped premises without owning Asset title or other tenants' geometry |
| Only Facility installed | Local scaled plan, draft→qualified approval→active circulation work without CAD, GIS or Manufacturing |
| Unscaled or hostile imported plan | Quarantine/draft-only; no approved graph or false measurement |
| Forklift enters pedestrian-only, closed or low-clearance edge | Blocked/unknown with explanation; no route asserted safe |
| Urgent corridor hazard, Audit/Reporting offline | Facility commits closure and durable Audit obligation; dependent routes invalidate; no premature reopening |
| Restriction timer expires without source-backed clearance | Still blocked/uncertain until authorised release |
| Manufacturing requests transfer | Facility returns permitted network; Manufacturing plans, Warehouse handles if selected, Inventory commits stock; no invented completion |
| Confidential room or cross-tenant query/export | Denied/redacted without count, adjacency, route, thumbnail or report inference |
| Duplicate approval, stale revision or access-policy failure | Idempotent duplicate, explicit conflict/denial or unknown; no silent overwrite |
| Sensor contradicts a barrier; provider withdraws | Dispute/quarantine; keep protective state and provenance, expose reconciliation |
| Past versus current plan requested | Explicit historic effective snapshot, never confused with present permissions |
| Unqualified evacuation/certification request | No certified evacuation promise; defer to competent specialist authority |
| GUI/viewer/editor/approvals | Shared sidebar leads to permitted dashboard; draft editor and qualified approvals are separate; keyboard/table fallback; restricted users cannot infer hidden areas |

## Decision and acceptance status

**Approved:** FAC-01 site operating authority; FAC-02 versioned layout/qualified approval; FAC-03 protective closure and explicit reopening; FAC-04 qualified route eligibility, not movement execution; FAC-05 tenant/programme confidentiality; FAC-06 provider-neutral 2D editor and optional adapters; FAC-07 public ports and durable outbox; FAC-08 host-managed GUI and headless mode; FAC-09 exclusions of attendance, booking, stock/maintenance and statutory certification; FAC-10 deliberate **deferral** of wider facilities services. The owner also approved the standards reference framework, open-source preferred shortlist, Logging/Audit/Reporting public-contract boundaries and GUI as **advisory**, not fixed implementation.

**No remaining conceptual ownership decision is required for this scope.** Detailed CAD/BIM parsing, topology/precision, version-pinned library choice, local sensor trust, large-plan performance, keyboard editor design and source-content licence review are **technical investigations**. The future implementation must publish a standalone root `CONTRACT.md`, database/outbox/adapters and one-operation host composition under accepted architecture, then verify consumer contracts, safe recovery, isolation/permission adversarial cases, protected exports, route revision invalidation, accessibility and CI. No tests, operational guarantees or deployment are asserted here. The draft PR requires current-master architectural/Git reconciliation and **separate explicit squash-merge approval**.

## Office archetype reciprocal note — 22 November 2026

**Status: Office conceptual direction OFF-01–05 and safeguards owner-approved 22 November 2026 (PR #112); not a changed published Facility contract.** An Office host dashboard may show authorised Facility-owned premises, site/room/zone references, current operational layout and effective restrictions beside separate Identity groups, Location places, Asset property records and Booking reservations. Office is a composition, never a Facility safety authority, and cannot infer route safety, available occupancy or access rights from an office label or menu. Facility's existing owner-approved lifecycle, emergency closures and protected public queries remain authoritative. See [Office conceptual record](../../compositions/office/compositions-record.md).


## Warehouse reciprocal interface — 23 November 2026 (draft PR #149)

**Status: proposed Warehouse-side conceptual contract; not independently approved or implemented.** [Warehouse](../warehouse/capability-record.md) owns physical receiving, inspection/count evidence, bin/staging work, put-away, picking, packing, occupancy and physical custody acknowledgements. Facility owns approved site geometry, access passages and effective closures; Warehouse owns warehouse bins and physical tasks referencing approved zones without copying the Facility graph. Consumers must use versioned authorised public contracts, distinguish observed/queued/physically completed from independently confirmed source-owner outcomes, and reconcile duplicate/unknown provider results. This note **does not approve or complete** the neighbouring capability's independent review; see Warehouse draft PR #149.
