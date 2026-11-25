# Location — Capability Record

**Classification:** Platform capability (owner-approved conceptual responsibility).  
**Status:** Owner-approved conceptual design, consolidated for continued review on 22 November 2026. Its responsibility, public-contract boundaries and the five implementation-guiding refinements of 22 November 2026 have explicit owner approval. **Not** an implemented or published Location package or root `CONTRACT.md`; no operational readiness, legal certification or runtime acceptance claimed.  
**Adopted baseline:** merged PR #98 (21 November 2026). **Refinement under review:** draft PR #87, reconciled to newer `master` without restoring its superseded text.  
**Authority:** [Governing catalogue](../../catalogue.md), [Capability Standard](../../capability-standard.md), accepted ADR-0009, ADR-0011, ADR-0012 and ADR-0016, plus the applicable security/privacy/presentation standards. Review protocol (former document: review protocol). Architectural opening baselines: governing `b920ce0d8b361de000a6739a16123dbdc56df7a7`; blueprint `6dac83a03da8704f7945ee1bc894f2248300445a`. Pre-merge baseline check (22 November 2026): governing `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint `5487cdadceedc23ff3bf1fc76843bfe97cc51c32`.

## Purpose and ownership

Location provides a **reusable, tenant-scoped register of places and geographic references**, their versioned geometry, quality, provenance, permitted disclosure and spatial queries. It has independent value to Assets, Events, Booking, Logistics, Publisher, Search and other consumers. The stateful capability is justified by stewardship of stable place references, lifecycle and sharing; coordinate mathematics alone would not justify a new capability.

**Location owns:** Opaque scoped place IDs, names/aliases, place types, point/line/polygon geometry, coordinate-reference metadata, declared precision/accuracy, optional entrance references, spatial relationships, source attestations, verification status, effective/recorded time, revision/redirect history, and Location-owned associations/map pins. **Place verification attests to the quality of its described location evidence, never to safety, legal title or a resource's actual physical presence.** It is authoritative for the **representation it maintains**, not the physical correctness of every external source claim.

**Other owners retain:** Personal residential/contact addresses (Profile) and customer/supplier or order delivery instructions (their respective domain); postal deliverability (postal/dispatch evidence), property title, physical site tenancy, building safety/accessibility/occupancy, asset custody and placement decisions, reservations, logistics dispatch, routing/navigation, publication, media, personal-device geolocation, file bytes and file/document lifecycles. Location may hold a *qualified address descriptor or source reference* for its own place, but must not become the master of another owner's address record. A map pin, place point or proximity result never proves a safe entrance, accessible route, valid delivery address, booking capacity or legal entitlement.

**Sharing:** Private by default to the owning tenant. An expressly authorised public/shared place reference may be reused across tenants; tenant-specific annotations, resource associations and access rights remain isolated. No global canonical place identity or implicit cross-tenant grant is assumed. External OSM objects, Google Place IDs, UPRNs and other source IDs are attributed external identifiers, not Location IDs.

## Native behaviour, lifecycle and invariants

Native services must work with manually supplied coordinates **without** Google, OpenStreetMap servers, online geocoding, mapping tiles, a routing provider or a GUI. Maintain register → validate → verify/activate → revise/merge/supersede → restrict/retire, preserving authorised historical references. A merge redirects references without silently rewriting past Booking/Event/Asset facts. Distinguish proposed/unverified, verified, restricted, retired, ambiguous, stale and unavailable.

Validate geometry, CRS, latitude/longitude ranges and ordering, topology, distance units, source evidence, revision preconditions and idempotency. Coordinates are always accompanied by CRS and declared accuracy; approximate centroids are not verified entrances. GeoJSON RFC 7946 exchange uses **longitude then latitude**, WGS 84 coordinates. Calculated straight-line distance is not driving/walking distance or travel time. Every result carries available provenance, precision, freshness and effective-time meaning. Missing or conflicting providers do not silently invent certainty. Native persistence and committed lifecycle events/outbox belong to Location.

## Idealised public input contract

These are **semantic surfaces**, not published TypeScript function names or existing HTTP endpoints.

| Surface | Caller supplies | What Location enforces |
|---|---|---|
| **Register place** | Trusted tenant/actor, name/type, geometry or manual coordinates, CRS, source, declared accuracy and requested disclosure | Identity/authorisation, geometry validation, provenance, scoped stable ID, revision and committed event |
| **Revise / verify / restrict / merge / retire** | Place ID, expected revision, authorised action, evidence, effective time, reason and idempotency key | Server permission, review/step-up where applicable, conflicts, immutable history and non-disclosing errors |
| **Resolve / search / nearby / spatial operations** | Place or external reference, area/bounds/radius/point, filters, requested precision and trusted caller scope | Tenant/resource filtering **before** search results, clustering or ranking; explicit units, limits and uncertainty |
| **Associate resource or map pin** | Place/geometry and typed opaque source resource ID/revision, permitted display metadata, actor, intended audience | Location association rights **and** source-owner eligibility; no implied file/viewer permission |
| **Import / export geography** | Authorised scope, format, fields, CRS, licence/provenance, disclosure precision and batch intent | Preview, validation, source attribution, per-item outcomes, no unsafe writes or cross-tenant bulk leaks |
| **Optional external evidence / policy** | Provider-neutral geocoder/map/survey evidence through Integrations; host Configuration, Clock, Privacy/Legal Compliance and IAM context | Explicit source confidence/terms, permitted processing, time semantics, provider absence/failure |
| **Optional mobile observation** | Explicit Recentre action and **host-provided** temporary device fix; optional heading/sensor/declination observations | Fix and heading validation; neither device permission nor continuous tracking is owned by Location |

## Idealised public output contract

| Output | Consumer and meaning |
|---|---|
| **PlaceReference / PlaceRevision** | Stable scoped place ID, current or requested revision, type/name, permitted geometry/CRS/accuracy, provenance, status and effective/recorded times |
| **Geographic query** | Authorised places, nearest results, distance, containment/intersection, spatial relationships and ambiguity/accuracy limitations |
| **Associations / map pins** | Location-owned association ID, place/geometry, typed source owner+opaque resource ID, optional pinned revision, redacted metadata and authorised display/view intent |
| **History / change events** | Revisions, merges/redirects, verified decisions and committed location/pin lifecycle events through a **Location-owned durable outbox** for interested consumers |
| **GIS exchange | Permitted GeoJSON/GeoPackage features and attributed data; optional read-only OGC API — Features and bulk formats, with errors/licence restrictions |
| **Diagnostics / evidence / report inputs** | Sanitised technical diagnostics to Logging, attributable risk-selected significant action evidence to Audit, authorised source datasets to Reporting |
| **Mobile map result** | Validated ephemeral position/accuracy/freshness and map-centre suggestion; true north and qualified optional magnetic/grid interpretation; refusal/unsupported/stale errors |
| **Status and errors** | Structured safe validation, conflict, denied/non-disclosing, unavailable, partial import, stale and uncertain outcomes; optional provider health |

**Interaction guarantees:** Calls and events carry trusted tenant/caller/correlation scope and appropriate revision/idempotency semantics. Protected reads and writes are authorised server-side; returned results cannot reveal private coordinates through counts, map tiles, autocomplete, exports or error messages. At-least-once event relays require replay-safe consumers. An event is a change fact, not an authorisation grant. Failure to reach an optional provider never prevents native place management.

## Cooperating capabilities and reciprocal information

| Capability | Location receives | Location supplies / ownership boundary |
|---|---|---|
| **Identity / Authentication / Authorisation / IAM Integration** | Trusted subject, tenant/group, assurance and access decisions | Scoped resources/actions; no duplicate identity, session or permission policy |
| **Configuration, Clock, Privacy, Legal Compliance** | Effective preferences/provider policies, date/CRS presentation context, applicable disclosure/retention constraints | Validation/status and qualified facts; domain-specific lawful processing remains with appropriate owners |
| **Asset / Facility / Manufacturing** | Authorised asset, site, entrance or zone references and the purpose for requesting coordinates; Facility-owned layout/closure evidence when needed | Place IDs, geometry, proximity, source/precision/revision and **only Location-owned descriptive constraints**. Asset owns stewardship/placement; Facility owns approved site-relative floor plans, traversable networks, closures and safe-use restrictions; Manufacturing owns production transfer planning. Neither a point nor straight-line distance authorises a physical route |
| **Events / Booking** | Venue/event/booking references, planned times, status and changes | Versioned place/venue reference and authorised geographic restrictions; event capacity, fire/accessibility suitability and booking availability come from actual domain owners. Preserve Events EVT-09 (former review: events contract attendance and handover) |
| **Logistics / Warehouse / Inventory** | Depot, stop, facility/bin or delivery-point references and permitted associations | Versioned place geometry, address candidates, precision and changes. Logistics owns multi-stop route optimisation, dispatch and shipment evidence; a separately selected routing adapter supplies road-network matrices/ETAs. Warehouse owns operational bins/tasks; Inventory owns stock movement. No location query guarantees reachability or delivery |
| **Publisher / Media / Gallery** | Authorised publication and media IDs, current status/revision and permitted viewer/thumbnail intent; Gallery is presentation over Publisher/Media | Location-managed pin/georeference; content, publication and viewer rights stay with owners |
| **Storage / File Library / other file owners** | Storage's byte service **only when Location itself owns an attachment**; pure [File Library](../../libraries/file-library/stateless-library-record.md) metadata/validation conventions; other owners' typed file IDs | Pin association or Location-owned annotation attachment; no raw object-key map pins or separate document catalogue |
| **Integrations / external mapping** | Optional geocoding, tiles, mapping, provider status and licensed geographical evidence | Place/query requests through approved adapters; external providers retain their directory and usage rules |
| **Search / Publisher / Marketplace / Federation** | Permitted source references, public/disclosure context | Authorised geographical index/public/share projections, qualified by source and privacy |
| **Logging** | Intake/availability status when used | Minimal structured coordinate-safe diagnostics: validation/provider failures, correlation IDs; not the business change ledger |
| **Audit** | Evidence receipts/references and qualified verification status | Significant attributable create/edit/verify/share/merge/retire, privileged exports and policy outcomes, using the appropriate source outbox/evidence contract; Audit owns custody |
| **Reporting** | Qualified report references/results when requested | Authorised versioned spatial datasets and metadata for aggregates; Reporting owns derived reports, disclosures and snapshots |
| **Message Queue / Scheduler / Workflow** | Optional transport, scheduled work and review decisions through public host ports | Durable source events and qualified actions; Location retains authoritative outcomes and outbox |

These are conceptual relationships, **not mandatory dependencies on every listed capability**. Location must remain independently useful where optional consumers are absent. Never read another capability's private database or import its internal implementation.

## GIS standards, providers and open-source implementation candidates

**Geographic model and exchange:** ISO 19107 (spatial geometry), 19111 (coordinate references), 19112 (geographic identifiers), 19115-1 (metadata), 19157-1 (quality), 19155 (place identifiers), 19160 (addresses as external references); OGC Simple Features, OGC API — Features/Common, RFC 7946 GeoJSON and W3C Spatial Data on the Web guidance. Adopt relevant UK BS 7666, UPRN/USRN external references, EPSG:27700 British National Grid and UK GEMINI where used. Accessibility WCAG 2.2 AA; legal/security baseline includes applicable UK/EU GDPR and governing OWASP ASVS 5 Level 2. Standards are design guidance, not implementation/certification claims.

**Provider-neutral mapping:** Prefer an open-source/OpenStreetMap data ecosystem as the open-data option; optional Google Maps Platform via Integrations. Provider-specific terms, OSM ODbL obligations, tile-server usage policies, caching/attribution and Google content restrictions are distinct from source-code licences. Host chooses permitted provider by function; Location's own references and native operations survive withdrawal. No automatic compatibility with provider-specific APIs is asserted.

**QGIS and ArcGIS exchange:** Primary planned standards-based interoperability with QGIS; secondary with ArcGIS. GeoJSON and OGC GeoPackage import/export carry stable external mapping, declared CRS, provenance, geometry quality and feature revisions. Where justified, offer **read-only, access-controlled** OGC API — Features; GIS edits pass Location's normal revision-checked commands, not raw database writes. FlatGeobuf for large vectors, GeoTIFF for raster and Esri-specific formats remain optional. Never silently convert coordinates, publish private pins or redistribute data against licence.

**Commercially permissive, publicly sourced candidates (subject to implementation-time dependency/security review):**

| Library | Licence | Candidate responsibility |
|---|---|---|
| Turf.js | MIT | Pure spatial geometry operations |
| Proj4js | MIT | Supported CRS transformations |
| RBush | MIT | Optional in-memory spatial indexing, never security/persistence authority |
| OpenLayers | BSD-2-Clause | Preferred optional map/geometric editor |
| MapLibre GL JS | BSD-3-Clause | Optional sophisticated vector-map viewer, not compulsory alongside OpenLayers |
| GeoPackage-JS | MIT | Portable GIS import/export |
| GDAL/OGR core | MIT-style | Optional isolated advanced import/export; check each enabled driver and dependencies |
| FlatGeobuf, PMTiles, Martin, GeoTIFF.js | Permissive upstream licences; verify version | Conditional large-vector, static tiles, vector-tile serving or raster uses |

The strict permissive shortlist **excludes GPL-licensed PostGIS and QGIS as embedded library dependencies**, though both are genuinely open source and can be used commercially; QGIS remains an external interchange target. Do not assert that PostGIS is source-restricted or mandatory. Native PostgreSQL persistence and justified indexes are initially preferable; any spatial extension is an evaluated, separately approved implementation choice. External tiles, imagery and source datasets need independent licence review.

## Location-bound media, documents and generic file attachments

**Owner-approved extension:** Display permitted photos/videos, albums, published articles, PDFs, XLSX and other owner-managed files as pin types on a map. Location owns **pin placement, association ID, disclosure, revision and lifecycle**, not the underlying content. A pin references `{sourceCapability, resourceId, revision?}` and optionally qualified metadata, never a raw Storage key or durable signed URL.

Media owns image/video records, thumbnails, variants and safety; Gallery provides grids/lightboxes; Publisher owns published articles/album records, publication/withdrawal and addresses; Storage owns bytes, without a file catalogue or content access decisions. Domain source owners retain their own business/private documents. **Location may itself own a minimal attachment record** for a file uploaded only to its own annotation; otherwise it references an external owner.

The approved independent [`file-library` stateless library record](../../libraries/file-library/stateless-library-record.md) defines shared metadata types, validation, safe filenames/content-type/size/checksums and common attachment error/receipt semantics. Source owners expose consistent upload-intent/claim, authorised list/get, preview/download and detach/delete commands; each owns permissions, retention/hold, record versions, recovery and outbox. The helper has **no storage, ports, database, GUI or domain events**. Do not revive the retired `document` capability (former review: document directory removal 2026 11 17).

**Display and change:** Map filters/layers for Places, Photos, Albums, Published Documents and Files; accessible list alternative; permitted thumbnails, attribution and *Open / View / Download* only through current source-authorised intents. Source withdrawal, quarantine, permission loss or erasure hides/redacts pin content without leaking origin; a changed event is not proof of access. Bulk georeferencing from EXIF or file metadata is untrusted evidence, must be confirmed and may need coordinate coarsening. Pin removal never directly deletes an external source resource. Import/export/reconciliation handle partial success and source licences.

## Optional GUI, navigation and mobile controls

**Host integration:** The [test application template](../../../RESOURCES.md#ref-8c941ad8) provides `/` homepage, `/admin` dashboard/sidebar and `/theme-manager` example. The **host** owns branding, top bar, menu, routes, responsive sidebar and trusted IAM/site composition. A sidebar **Locations** entry opens the capability dashboard (illustrative `/locations` route). Location owns its optional screens/components using Theme Manager's semantic tokens and shared UI controls. The shell never reimplements Location's authorisation or business endpoints. A headless host with `presentation: false` retains all core services and security; Nuxt composition targets ADR-0012's single-call/50-line host budget.

| Screen / reusable component | Authorised purpose |
|---|---|
| **Locations dashboard** | Scoped overview, quality/review backlog, provider exceptions and navigation |
| **Place register** | Search/filter/list with optional spatial/map switch; permitted results only |
| **Place create, detail, geometry editor** | Coordinates/CRS/provenance, map placement, textual geometry alternative, revision history and validated edit |
| **Quality / reconciliation** | Confirm sources, compare conflicting coordinates, merge/supersede/restrict/retire with appropriate separation of duties |
| **GIS import/export** | Validate GeoJSON/GeoPackage, preview CRS/field mapping, source and privacy limitations, per-item errors |
| **Optional settings / provider status** | Show effective Configuration/Integrations state and safe diagnostics, not a new policy or credential store |
| **PlacePicker / PinPicker / MapPinDetails** | Embed permitted place/media/document/file selection or summary in Asset, Booking, Events, Logistics and others; caller retains domain decision |

**Mobile map controls — owner-approved combined design:** A single **Recentre** button requests a one-time, permission-based device fix **through the host**, centres the map, and shows a temporary marker, accuracy circle and timestamp. On denied, stale, unavailable or inaccurate fixes, leave the map usable with manual coordinate/search fallback. No dedicated finder screen is required. Nearby search is a separate authorised, deliberate request.

A **Compass** arrow always indicates **true north relative to the current map bearing** and can reset the map north-up, even without sensors or geolocation. Distinguish grid north on projected maps where relevant. An **optional magnetic heading** is displayed only when calibrated device orientation/magnetometer data has a known north reference and suitable quality; conversion requires a position/date-dependent trusted geomagnetic declination model and, if relevant, grid convergence. GPS course is not the direction a stationary device faces. Unknown sensor readings show unavailable, not fabricated north. The host obtains sensor permissions; Location interprets qualified data; map presentation owns viewport controls. No continuous follow/trail, personal-history storage or implied rescue navigation.

**Accessibility/UX:** WCAG 2.2 AA, keyboard-operable geometry alternatives, labelled touch controls, readable lists and coordinates, no colour-only status, responsive mobile controls, internationalised units, non-map fallback. Distinguish loading, unavailable, denied, inaccurate, ambiguous, stale, conflicting, held and partial outcomes. Maps and tiles must not be necessary to use native Location services. Display appropriate safety/accuracy warnings. No client-side control alone confers permission.

## Security, privacy, failure and operations

- Validate all inputs and server-side operations under trusted tenant/actor/assurance, permit only relevant scope/precision, and fail closed when mandatory IAM decisions are absent. Shared public reference does not grant private pin/media/document access.
- Minimise precise coordinates and sensitive location data; avoid leaking personal device fixes through logs, analytics, URLs, referrers or persistent caches. Any server-side nearby request may send coordinates and must use an appropriate disclosed processing basis. No automatic tracking or background observation.
- Treat imported GIS/EXIF, file content and external provider results as untrusted; validate source rights, CRS, geometry, checksums and appropriate file quarantine/preview safety. Respect legal holds, retention, provider data licences and erasure.
- Use explicit idempotency, optimistic revisions, durable Location outbox, qualified audit evidence, minimal logging and owner-directed orphan cleanup. Provider loss is an explicit degraded condition, not silent substitution or permission bypass.
- Do not claim live geolocation, magnetometer compass precision, offline map availability, routing safety or emergency assistance beyond the capabilities of the device/host and available licensed data.

## Conceptual acceptance cases (not executed tests)

1. Valid manual place creates a stable scoped ID, revision, provenance and durable event without third-party maps; invalid/out-of-range/swapped coordinates or malformed polygons fail safely.
2. A private tenant or group place remains undiscoverable through exact ID, nearby result, tile, pin cluster, export or autocomplete; explicit controlled public reference sharing does not expose private annotations.
3. An authorised correction respects expected revision/idempotency; stale writes conflict, duplicate attempts do not duplicate state; merge redirects preserve historic Event/Booking/Asset references.
4. Conflicting geocoder candidates are marked uncertain; a provider outage leaves native queries usable and cannot invent a verified entrance or safe route.
5. An Asset position or Event venue links by public place reference without Location deciding custody, legal occupancy, accessibility or booking capacity.
6. GeoJSON/GeoPackage import validates CRS, mapping, provenance and licences; partial batch results and privacy-controlled exports remain explicit; QGIS works without being linked as a runtime library.
7. Photo, gallery album or published document pin is visible only with **both** permitted location and currently eligible source content; deletion, quarantine, unpublication and permission revocation suppress the viewer. A PDF/XLSX stored as bytes only is not globally browsable without an authoritative owner record.
8. Location-only attachment upload uses owner-issued record and Storage byte service; denied/held deletion and failed uploads return recoverable outcomes, never raw Storage keys as public pin IDs.
9. Sidebar opens the scoped Locations dashboard in the representative host; embedded place picker returns a reference, not a Booking/Asset decision; headless presentation-off mode retains native services.
10. Recentre prompts only on user action and shows accuracy/freshness or denial fallback; true-north reset operates without GPS; optional magnetic north never guesses when sensor/model confidence is missing. No personal position history or automatic public pins.


### Approved design refinements and resolved earlier questions (22 November 2026)

The formerly open questions from the superseded PR #87 are **not new blockers**: PR #98 approved private-by-default scoped sharing (old LOC-10), an optional common geodata/provider source rather than a global private gazetteer (old LOC-07), no compulsory indoor routing (old LOC-08), and no live movement/geofence trigger ownership by the place register (old LOC-09). These legacy numbers do **not** supersede the accepted LOC-01–LOC-10 numbering used in PR #98.

**Owner-approved implementation-guiding dispositions (22 November 2026):** These refine delivery guidance without changing the already approved responsibility boundaries or selecting specific libraries/providers.

1. **Provider and data governance:** Native manual place maintenance remains the reliable baseline. Use qualified external address/map evidence only through permitted source-specific adapters, with licence, precision, attribution, retention and withdrawal recorded. Avoid a mandatory Google/OSM dependency or a global shared private address book.
2. **Indoor maps and physical safety:** Location stores geographic positions and limited place relationships. Facility owns operational floor plans, navigable graphs and restrictions; Logistics owns business route planning via a qualified routing adapter. Unknown current restrictions must never become a positive safety/route assertion.
3. **Pins, files and publication:** Location records only its pin/association reference and necessary metadata. Source owners determine continuing visibility, permissions, file lifecycle, downloads and privacy; periodically revalidate and hide stale or revoked attachments.
4. **Position and privacy:** Recentre is one-time and user-initiated, with a temporary device fix and no location history by default. More advanced tracking or geofence automation requires a separate independently justified domain and legal/privacy review.
5. **Implementation choice:** Prefer the smallest replaceable provider ports and validated GeoJSON/GeoPackage interchange, selecting specific map libraries, spatial indexes and device providers only after evidence-based performance, security, licence and accessibility assessment. No mandatory extra infrastructure or bespoke GIS standard is justified now.

**Approval recorded:** The owner expressly approved all five recommendations on 22 November 2026. They are the agreed implementation-guiding direction, not evidence of a selected vendor, deployed implementation or completed acceptance. The Location conceptual responsibility, public inputs/outputs, cross-capability ownership and optional GUI were already approved through PR #98. Actual root `CONTRACT.md`, provider licence checks, storage/threat model, CI and host acceptance remain delivery obligations, not unresolved conceptual choices.

## Approval, remaining implementation work and merge gate

**Owner-approved conceptual decisions (21 November 2026):** LOC-01–LOC-08 boundaries and native/provider-neutral service; LOC-09 technical-investigation requirement and LOC-10 future implementation alignment; OSM/optional Google adapter principles; georeferenced media, publication and stored-file pin associations; retirement of a separate Document owner; source-owned attachment interfaces with approved `file-library` name/classification; and the combined mobile Recentre/Compass controls.

**Proposed implementation details, not separately adopted governing decisions:** Exact public function/export names, mapping/GIS library selection, route paths/UI component names, GeoPackage/OGC transport profile implementation, persistence/index choice, optional advanced map/sensor provider, and connector-specific licence arrangements. QGIS/ArcGIS data exchange is a stated design objective, not evidence of implemented compatibility.

**Completion meaning:** This record is an **owner-approved conceptual specification**, reconciled with its governing and reciprocal boundaries; it is **not** a published executable contract. Before implementation: write an independently usable root `CONTRACT.md`, explicit source-controlled ports and outbox/persistence, public exports, service permissions, privacy/threat model and storage register, exact provider formats and licence obligations, 50-line/single-call host composition, and CI/user-run contract/security/accessibility/negative acceptance. No implementation repository changes or local builds/tests are authorised by this review.

**Refinement and merge gate (PR #87):** The previous Location conceptual PR #98 is merged and its decisions are the baseline, not open proposals. Reconcile this refinement with the latest governing and blueprint `master`, preserving the approved Facility, Logistics and other reciprocal interfaces; check changed files, links, protected branch, mergeability and CI. Only explicit owner approval permits any merge. The original Events EVT-09 reciprocal requirement (former review: events contract attendance and handover) remains preserved. No implementation interface is claimed shipped.

## Office composition reciprocal note — 22 November 2026

**Status: Office conceptual direction OFF-01–05 and safeguards owner-approved 22 November 2026; integration remains non-normative and unimplemented (PR #112).** Office is a host organisational archetype/composition, not a location authority. It may display an authorised Location place ID/revision, entrance or qualified geographic descriptor for an organisational unit or shared workplace. Location supplies place quality, effective revision and disclosure constraints, not premises title, accessibility certification, occupancy or group membership. Remote offices have no required place; an unavailable map does not block organisational access. See the [Office conceptual composition contract](../../compositions/office/compositions-record.md). This note does not amend published interfaces or claim implementation evidence.
