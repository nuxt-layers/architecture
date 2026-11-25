# Product — canonical conceptual capability record

**Classification:** Domain capability candidate. **Owner approval:** PRO-01–PRO-13 and supplementary design recommendations approved, 22 November 2026. **Status:** conceptually complete, subject to cross-review reconciliation and pre-merge checks; **not** implemented, merged or an independently published root `CONTRACT.md`. Direct lookup of `nuxt-layers/product` returned 404; this does not prove no implementation exists elsewhere. **Authority:** [architecture-rules](https://github.com/nuxt-layers/architecture-rules) accepted baseline `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint review opening `master` `361566988ac53c55f6135e8acfa46cd5b013d7a0`. [draft PR #122](https://github.com/nuxt-layers/architecture-blueprint-review/pull/122). Governing accepted ADRs and Capability Standard override this conceptual record.

## Purpose and authoritative ownership

Product defines **what an item is**, independent of whether it is sold, stocked, manufactured or licensed. Its native catalogue covers physical goods, materials, components, intermediates, consumables, services and digital items, including non-saleable items (**PRO-01**).

Product owns catalogue-scoped stable identities; canonical matching and aliases; product families/models, variants and configuration constraints; approved descriptions and factual attributes; identifiers and SKU namespaces; dimensional units and technical specifications; design/engineering bills of materials (**eBOM**), substitutions and version effectivity; virtual commercial bundles and definitions of prepacked physical kits; source-qualified compliance *claims* and document/media references; product approval, revision and retirement (**PRO-02–PRO-06, PRO-09–PRO-13**).

**Ownership exclusions:** Inventory owns actual stock, lot/serial instances, conversions and genealogy; Manufacturing owns executable mBOMs, routings and work orders; Quality owns inspections and technical dispositions; Marketplace owns seller offers, condition, listing and publication; Order owns accepted obligations and line snapshots; Pricing owns monetary prices, offers/discounts and pricing rules; Accounting owns valuation and journals; Asset owns individually managed equipment and rights; Warehouse/Logistics own handling execution; Legal Compliance and qualified authorities own legal interpretation/certification. Media owns file contents, Localisation language adaptation, Publisher publication, and IAM access decisions. Product never turns an identifier, engineering specification or certificate claim into evidence of stock, sale rights, delivery, financial value or regulatory compliance.

**Examples:** A unique used vehicle may reference a common Product model while its individual condition and seller listing remain with Inventory/Asset and Marketplace. A virtual bundle describes components but creates no stock; a prepacked kit becomes physical stock only when Inventory records the conversion. A service or digital item need not have stock or serials. Handmade or unlabelled goods need not carry a GTIN.

## Identity, design and lifecycle

- **Authority and sharing (PRO-09):** Every organisation controls its catalogue. An optional governed shared catalogue can be referenced using permissioned, source-revision-pinned links and scoped local overlays, never implicit cross-tenant writes or disclosure. Record original authority, alias precedence, override proposals and conflicts. Internal opaque IDs are authoritative within scope; trade identifiers, vendor SKUs and names are qualified evidence, not globally unique substitutes.
- **Variants (PRO-02, PRO-12):** Support finite named variants and versioned rules for permitted configurable/build-to-order combinations. Reject invalid combinations; do not materialise every theoretical variant. SKU uniqueness applies within a declared organisation/catalogue namespace.
- **Engineering design (PRO-03, PRO-10):** Product approves and versions the eBOM and design specifications. Workflow may coordinate reviews but does not approve Product state on its own. Manufacturing pins approved source revisions and owns production execution. Component substitutions, quantities, units and effective dates are validated; composition cycles, incompatible units/versions and inaccessible components block approval.
- **Bundles and kits (PRO-04):** Keep versioned virtual bundle definitions distinct from potentially stock-managed physical kit definitions. Product never promises availability, allocates components or posts inventory movement.
- **Matching (PRO-05):** Return confirmed match, distinct creation, pending review, ambiguous candidates or refusal with safe reasons. Compare source identifiers, item type, attributes, scope and provenance. Never silently merge records; merge/split needs controlled aliases, mapping, approval and traceable migration.
- **Lifecycle (PRO-06):** Draft/proposed → submitted → approved/effective → superseded or retired; rejection/withdrawal preserves appropriate evidence. Approved revisions are immutable. Corrections, reactivation and design changes create attributable transitions. Authorised historical lookups must continue to resolve pinned versions without rewriting existing orders, stock or manufacturing work.
- **Claims and content (PRO-11, PRO-13):** Product records technical requirements, attributed declarations and certificate/evidence references, not compliance verdicts. Mandatory legal controls can hold publication/approval. Factual meaning is Product-owned; source-linked translations belong to Localisation, seller marketing to Marketplace and publication to Publisher. Translations reference the original revision.

**Native service:** Product provides create/edit/match, validation, review/approval, immutable revision retrieval, permitted exports and retirement with Product-owned persistence and a committed outbox. These functions work without Inventory, Manufacturing, Marketplace, Pricing, Reporting, external PIMs or a GUI.

**Provider-neutral imports (PRO-07):** Integrations may supply supplier feeds, ERP/PIM claims and source identifiers. Distinguish Product's local master from staged imports and explicitly declared external masters. Capture data licence, mapping, origin, authority, freshness, conflicts, revocation and last *confirmed* remote sync. Provider failure leaves qualified local approved records readable; uncertain remote writes remain pending/unknown until reconciled. No external provider is mandatory.

## Approved conceptual public contract

**This is business-level design, not shipped function names or routes.** A future implementation root `CONTRACT.md` must publish exact types, public exports, permissions, configuration, versions, errors, event schemas and absence behaviour.

### Inputs — commands, evidence and context

| Source and requirement | What Product accepts | Boundary and failure rule |
|---|---|---|
| Authorised client/editor/Marketplace intake, per operation | Create/propose, edit, match, submit, approve/reject, activate, revise, retire; item classification, identity, units, attributes, variants, eBOMs, bundles and evidence | Validate shape, ownership, source rights, effective revision and domain invariants; ambiguity or conflicting approval fails/holds without partial write |
| Host with Identity/Authentication/Authorisation, mandatory for protected operations | Trusted caller/tenant/catalogue scope, decision, assurance, resource/action and delegated context | Server-side least privilege, separation of duties and fresh decisions; denied/unknown mandatory authority fails closed |
| Configuration, Clock and qualified Legal Compliance/Privacy, conditional by action | Approved schema/vocabulary, review/sharing/retention rules, time/effectivity, market obligations | Apply effective revision; mandatory unresolved safety/legal conditions block affected actions |
| Product's approved component records, mandatory for an eBOM/bundle | Pinned component IDs/revisions, quantity/units, substitutions and effectiveness | Validate graph, scope, dimensions and compatibility; reject cycles or missing/inaccessible parts |
| Supplier/Integrations, optional | Attributed supplier/PIM claims, cross-references, source licences and sync receipts | Stage conflicting/stale/untrusted evidence; provider result is not Product approval |
| Manufacturing/Quality, optional | Feasibility, design-change and non-conformity proposals | Advisory only; Product decides its own engineering revision; Quality retains inspection decision |
| Metadata/Localisation/Media/Publisher, optional | Controlled attributes, source-linked translations and rights-qualified media/publication references | Do not claim ownership of source files, language service or publication status |

**Commands:** create/propose, amend, match/alias, submit/review/approve/reject, change variant/eBOM/bundle, activate/supersede/retire and import reconciliation. Use expected revision, correlation and idempotency for retries; distinguish request accepted, Product state committed and remote synchronisation confirmed. Only Product authorises and commits Product decisions.

### Outputs — authorised queries, decisions and committed events

| Consumer | Product supplies | Guarantee and limitation |
|---|---|---|
| Inventory, Manufacturing, Quality, Order, Marketplace, Pricing, Asset, Warehouse and authorised hosts | Stable canonical item/family/variant identities, type, approved version/effective time, technical attributes, UoM, tracking *requirements* and provenance | Scope- and field-authorised, revision-qualified Product facts only; no stock, price, execution or compliance verdict |
| Manufacturing, Quality and Inventory where relevant | Immutable approved eBOM with component revisions, quantities, units and substitutions | Design intent only; executable work, consumption and production results belong elsewhere |
| Marketplace, Order, Pricing and Inventory | Virtual bundle/prepacked kit classification and pinned component structure | Does not create stock, price or accepted fulfilment obligation |
| Marketplace, Integrations and editors | Confirmed/ambiguous/pending/refused match decision, mappings and safe reasons | Proposed matches do not authorise listing; cross-catalogue evidence remains protected |
| Search, UI, Reporting and authorised integrators | Paginated catalogue reads, as-of history, safe search/export projections, operation and synchronisation status | Explicit rights, source revisions, completeness, freshness, effective and observation times |
| Message Queue subscribers, Audit and other authorised consumers | Product-owned committed events such as `ProductProposed`, `ProductApproved`, `ProductRevisionEffective`, `ProductCompositionChanged`, `ProductMatchResolved`, `ProductRetired` | Product's own transactionally committed outbox; events have identity, version, scope, effective time, correlation and source sequence where available; duplicate/late delivery is possible |

**Queries:** resolve by opaque ID and revision/as-of time, list/search authorised catalogue, variants, specifications, BOMs/bundles, decisions/history, import/operation status and permitted export. Use bounded pagination and safe redaction; search indexes are not authoritative.

**Shared invariants:** No universal request object is imposed, but each interaction carries the necessary trusted caller/scope, resource and revision, schema/contract version, source/provenance, applicable policy and time basis, correlation/idempotency and explicit unknown/partial state. Publishing an event is not permission. No exactly-once distributed guarantee; consumers deduplicate by event ID/revision and refetch authoritative facts when needed.

### Cooperating capability inputs and outputs

Cooperation uses public ports, queries and events, not circular package imports or private tables.

| Capability | Product receives | Product supplies; dependency |
|---|---|---|
| IAM, Configuration, Clock | Trusted caller/access, catalogue policy, time semantics | Scoped business decisions; mandatory context only for protected/applicable operations |
| Inventory | Tracking and conversion reference enquiries, item corrections | Versioned identifiers, units, serial/lot requirements, kit structures; optional |
| Manufacturing | Design change/feasibility proposals | Approved engineering eBOM/specification and source revisions; optional |
| Quality | Inspection findings and proposed changes | Technical acceptance characteristics and design revisions; optional |
| Marketplace | Seller submissions, identifier/match requests | Approved canonical match or ambiguity/refusal, variant and item revisions; optional |
| Order | Seller-specific accepted item/offer references and required characteristics | Pinned Product item/variant/bundle definitions, approved units and source-qualified trade identifiers; Order owns seller-specific accepted obligations, changes and returns; optional |
| Pricing | Product/category/variant-context enquiries | Versioned pricing dimensions and bundle composition, **not amounts**; optional |
| Warehouse/Logistics | Handling and packaging enquiries | Approved size, weight and handling specifications where known; optional |
| Asset | Model references and proposed corrections | Model identity, specifications and revisions; optional |
| Accounting/Billing/Invoice | Classification/identity enquiries | Historical item descriptor, UoM and reference, **not financial postings**; optional |
| Metadata/Localisation/Media/Publisher | Controlled vocabularies, translations, evidence/media and publishing references | Canonical meaning, qualified revision and source references; optional |
| Suppliers/Integrations | Claims, licensed catalogue data and provider status | Qualified imports, approved exports, reconciliation and conflicts; optional |
| Legal Compliance/Privacy/Content Security/Moderation | Qualified restrictions, privacy/safety decisions and permissible evidence | Classified claims, evidence and scoped Product operation outcomes; conditional controls |
| Process/Workflow/Scheduler/Message Queue | Approval coordination, activation trigger and event transport | Product-owned committed decisions/outbox; orchestration/transport optional as appropriate |
| Search/Observability | Queries, technical measurements and platform status | Rights-qualified search projections, source events and telemetry; optional |

### Error Normalisation, Logging, Audit and Reporting

These interfaces are owner-approved on the **Product** side. The adjacent conceptual records retain their own independent status: [error-normalisation](../../libraries/error-normalisation/CONTRACT.md), [Logging](../../services/logging/services-record.md), [Audit](../audit/capability-record.md), [Reporting](../reporting/capability-record.md).

| Consumer | Product passes into its public interface | Product receives or can consume back | Non-overlapping responsibility |
|---|---|---|---|
| **error-normalisation** (stateless library) | Source-owned stable error code/definition, trusted operation/correlation, explicit mapping and disclosure policy | Deterministic safe error category, `messageKey`, advisory retry class, sanitised API/technical projections | Product decides outcome, idempotency, actual retry and recovery; the library persists nothing |
| **Logging** | Bounded technical diagnostics for validation/BOM/import/provider faults, safe severity/source/correlation, no secrets or drawings | Intake accepted/rejected/throttled/unavailable/unknown, authorised diagnostic queries and sink/drop health | Diagnostics are **not** business confirmation or Audit evidence |
| **Audit** | Risk-selected, attributable approvals/denials, revision/BOM/merge/retirement, privileged export and sharing changes; actual source outcome, outbox event/revision/checkpoint, actor/scope and minimised evidence | Durable evidence receipt, scope-qualified integrity/coverage and authorised review status | Audit owns custody and verification, never Product's committed state; mandatory capture policy may block sensitive actions |
| **Reporting** | Authorised source-revisioned counts/states, approval/change history, match uncertainty, data quality, import/sync metrics, Product events and provenance/freshness/coverage | Report definitions, execution/results, derived trends, refresh completeness and controlled exports | Reporting cannot amend Product or infer stock, prices or legal compliance without those other sources |

Product commit, diagnostic acknowledgement, Audit receipt, event delivery and Reporting refresh are **different outcomes**. Failure of ordinary Logging/Reporting does not undo a Product transaction. Required security/Audit capture must follow configured risk controls and fail closed where mandated.

## Standards and legal applicability

Adopt a **small common core**, with standards and statutory requirements activated by category, market, edition and effective period. Product records applicable identifiers, version, issuer, jurisdiction, source, evidence and verified/unverified/unknown status; Legal Compliance determines enforceable duties, while qualified issuers alone certify.

| Source / standards | Design use |
|---|---|
| [GS1](https://ref.gs1.org/standards/): GTIN, General Specifications, Global Data Model, GDSN, Digital Link | Scheme-qualified trade identifiers and catalogue exchange when applicable; not required for handmade, service or digital items |
| ISO 80000; [UN/CEFACT Recommendation 20](https://unece.org/code-list-recommendations) | Dimensionally correct units and portable trade codes |
| ISO/IEC 11179; ISO 8000 series | Attribute definitions, metadata quality, source and completeness |
| ISO 10007 configuration management; ISO 10303 STEP | Approved engineering changes and optional CAD/product exchange; STEP is **not** the universal Product model |
| IEC 61360 Common Data Dictionary; IEC 82474 material declarations | Conditional industrial/electrical attributes and materials evidence |
| [Schema.org Product/ProductGroup](https://schema.org/ProductGroup); [W3C JSON-LD 1.1](https://www.w3.org/TR/json-ld/); [W3C PROV-O](https://www.w3.org/TR/prov-o/) | Approved structured-data exports, product grouping and evidence provenance |
| [W3C SHACL](https://www.w3.org/TR/shacl/); [JSON Schema](https://json-schema.org/); [OpenAPI](https://spec.openapis.org/) | Conditional semantic validation, exchange schemas and optional HTTP adapters; transport-neutral business contract |
| [W3C WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/); BCP 47, Unicode CLDR and ECMA-402 | Accessible, language-aware optional screens |
| OWASP ASVS 5 Level 2 baseline (Level 3 where critical); ISO/IEC 27001 guidance | Threat modelling, least privilege, protected import and security controls; no certification claim |
| [BSI](https://www.bsigroup.com/) BS/BS EN/BS ISO adoption; [UK OPSS](https://www.gov.uk/government/organisations/office-for-product-safety-and-standards) | Applicable UK standards and product marking/safety by sector and market; GB and NI may differ |
| EU General Product Safety Regulation 2023/988 and [Ecodesign for Sustainable Products Regulation (EU) 2024/1781](https://eur-lex.europa.eu/eli/reg/2024/1781/oj/eng) | Conditional product-safety/traceability and Digital Product Passport readiness according to product-specific effective requirements |

Additional automotive, food, construction, chemicals, batteries, medical device and other sector profiles are **conditional**, not assumed universal. A claimed certificate, GS1 match or external specification is not itself a compliance decision.

## Fully open-source, commercially permissive implementation candidates

**Approved selection rule:** Required source code must be fully public and free under permissive commercial terms (MIT, Apache-2.0, BSD-3-Clause or PostgreSQL Licence). Exclude restricted-source/open-core requirements, proprietary flagship services and community editions missing needed functions. Review exact releases, transitive licences, activity, security and platform compatibility before selection; these are candidates, not installed or verified production dependencies.

| Need | Candidate and licence | Selection rule |
|---|---|---|
| Authoritative persistence, version and transactional outbox | [PostgreSQL](https://www.postgresql.org/about/licence/) (PostgreSQL Licence) | Reuse platform Persistence/Infrastructure; no second catalogue/search/graph server |
| Type-safe database access | [Kysely](https://github.com/kysely-org/kysely) (MIT) or [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) (Apache-2.0) | Choose **one only if** common Persistence does not already provide it |
| Runtime schemas | [Zod](https://github.com/colinhacks/zod) (MIT); [Ajv](https://github.com/ajv-validator/ajv) (MIT) | Prefer one; add Ajv when published JSON Schema supplier interchange justifies it |
| Exact quantities | [decimal.js](https://github.com/MikeMcl/decimal.js) (MIT) | Explicit unit/rounding policy, string/decimal serialisation; no financial valuation |
| BOM/kit graph checks | [@dagrejs/graphlib](https://github.com/dagrejs/graphlib) (MIT) | In-process bounded cycle checking; database remains source |
| Units and item IDs | [convert-units](https://github.com/convert-units/convert-units) (MIT); [uuid](https://github.com/uuidjs/uuid) (MIT) | Optional; verify compound/offset units, precision, approved vocabulary and reuse shared IDs |
| Optional Vue tables/fetching | [TanStack Table](https://github.com/TanStack/table) and [TanStack Query](https://github.com/TanStack/query) (MIT) | Only if host UI does not already provide comparable features |
| Optional accessible BOM diagram | [Vue Flow](https://github.com/bcakmakoglu/vue-flow) (MIT core); [Dagre](https://github.com/dagrejs/dagre) (MIT) | Accessible hierarchical table is baseline; no paid Pro examples/features |
| Optional structured/supplier mapping | [jsonld.js](https://github.com/digitalbazaar/jsonld.js) (BSD-3-Clause), [N3.js](https://github.com/rdfjs/N3.js) (MIT), [JSONata](https://github.com/jsonata-js/jsonata) (MIT) | Only for real JSON-LD/RDF/supplier exchange; bound complexity and validate all mapped output |

**Minimum suggested stack:** existing Persistence/PostgreSQL, one validator, decimal.js and Graphlib; reuse platform Clock, IAM, Message Queue, Integrations and Theme Manager. **Do not introduce** Neo4j, Redis, Elasticsearch, an independent PIM, a workflow engine, vector search or a second Product store simply to implement this capability. Confirm latest licence/source tree, package tags, SBOM, security and Node/TypeScript compatibility before pinning.

## Configuration, security, privacy and reliability

**Policy:** Configuration/host supplies catalogue scopes, attribute/schema rules, unit vocabulary, identifier namespaces, approvals/separation of duties, shared-master overlays, retention, import adapters, public visibility and effective policy. Product validates domain invariants; organisational settings cannot weaken legal/security floors. No implicit user preference or provider assertion grants catalogue authority.

**Security/privacy:** server-side resource/tenant/cross-catalogue authorisation (including exports and derived counts), risk-proportionate approval/assurance, least privilege, safe external input with XSS/SSRF/import limits, source licence and permitted media rights, GDPR/UK GDPR minimisation/retention/redaction and protected engineering IP. Prohibit cross-tenant inference through searches, candidate matching or reporting. Respect legal holds and independent historical retention. Capture attributable decisions and safe technical diagnostics without storing raw secrets or full supplier payloads in logs.

**Reliability:** PostgreSQL transactional Product state/outbox, source-revision optimistic concurrency, idempotent writes, bounded paginated reads/graph traversal, explicit effective date/time and clock quality, safe cached source projections invalidated by committed events, out-of-order replay tolerance, recovery by operation status and reconciliation after uncertain provider writes. Separate accepted from completed/delivered. Standard Product error codes include denied/wrong scope, invalid definition/unit/configuration, composition cycle, duplicate ambiguity, revision conflict, not effective, unavailable source, policy hold and unknown operation status. Normalised safe messages must not expose restricted item existence. Search, Logging and Reporting outages do not corrupt Product truth.

## Optional GUI and host presentation (PRO-08)

**Headless is mandatory; UI is optional and independently disabled.** Verified `nuxt-layers-test/application-test-template` `master` supplies a shared shell, homepage `/`, test dashboard `/admin`, responsive collapsible **Capabilities** sidebar, a Theme Manager link `/theme-manager`, a top-bar Appearance menu and `Not signed in` placeholder. Its Theme Manager `test` mode is **local-only and unauthenticated**, not safe for production. Product is not installed there. Theme Manager's published [root contract](https://github.com/nuxt-layers/theme-manager/blob/master/CONTRACT.md) also flags its own outstanding host-composition gaps; do not copy private providers.

**Target presentation:** host adds **Capabilities → Products → Product dashboard**, suggested configurable base `/products`. Host owns navigation, routing and enablement; Product supplies optional separable views through public Product ports. The sidebar is not an authorisation grant.

| View / suggested route | Purpose and public operations |
|---|---|
| **Dashboard** `/products` | Authorised catalogue counts, pending reviews, recent revisions and import/data-quality issues; link to optional Reporting without depending on it |
| **Catalogue** `/products/catalogue` | Filtered/paginated search by category, item type, identifier, status and scope; proposal/create |
| **Detail/editor** `/products/catalogue/:id` or `/new` | Approved descriptions/specifications, source references, editable draft, UoM validation, evidence and submit |
| **Families/variants** detail tab | Finite variants, valid configuration rules, source-qualified SKU and revision |
| **Engineering eBOM** detail tab | Accessible component hierarchy, quantity/substitution validation, revisions, cycle warning; optional graph with equivalent accessible table |
| **Bundles/kits** detail tab | Virtual/stocked definition and components, with optional Inventory link for actual stock |
| **Reviews** `/products/reviews` | Reviewer queue, match ambiguity, sharing/engineering change requests, diff/approve/reject with risk-appropriate separation of duties |
| **History** detail tab | Compare immutable revisions, effective times and provenance; separate Audit proof links |
| **Imports** `/products/imports` | Supplier match/conflicts, connection status, unknown remote completion and safe reconciliation via Integrations |
| **Settings** `/products/settings` | Catalogue policy, types, approved identifiers, sharing and effective configuration |

Use qualified viewer/editor/engineer/reviewer/admin **policy decisions**, not hard-coded role permissions. Re-authorise every server query and command. The GUI must distinguish loading/empty/denied/draft/pending/approved/rejected/retired/stale/unknown, show safe field errors and revision conflicts, and expose unavailable neighbour actions as unavailable. Use Theme Manager semantic tokens, WCAG 2.2 AA, keyboard and screen-reader alternatives, mobile/zoom/reduced motion, locale-aware units/date/number presentation and source-linked translation status. No sensitive prefetching or unbounded cache.

**Host composition:** a future Nuxt adapter documents one public composition operation and ≤50 lines of capability-specific host wiring (accepted ADR-0012); exact route names, feature detection, ports and disable controls belong to implementation. Derived test app adds Product navigation and scenarios without changing the shared template; public deployment uses real IAM, not the local test fixture.

## Conceptual acceptance criteria

These examples describe expected behaviour, **not** tests executed.

| Scenario/input | Expected authoritative outcome |
|---|---|
| Editor creates a non-sale raw material, service or digital definition | Product accepts valid scoped drafts and revisions without stock, shop or provider |
| Approve grade-specific material with dimensional UoM | Validated immutable approved item with no implied inventory quantity |
| Engineer changes approved vehicle eBOM while production is underway | New pinned Product revision; prior Manufacturing jobs retain their source version |
| Configure finite variants and a build-to-order combination | Valid permitted combination; invalid or cyclic/unsafe configuration rejected |
| Import seller GTIN with conflicting attributes, or handmade item without GTIN | Ambiguous candidate held; valid identifier-free proposal supported |
| Define virtual bundle and prepacked kit | Structures only; Inventory alone records consumption or creation |
| Quality submits non-conforming tolerance evidence | Product stages a change proposal; Quality disposition remains independent |
| Two editors or duplicate approval retries collide | Explicit revision conflict or same idempotent outcome; no silent double-approval |
| Wrong-tenant caller queries unpublished design | Denied without existence/count disclosure, even through searches |
| External PIM times out during a write | Pending/unknown sync, safe reconciliation, no false remote success |
| Retired item is referenced by an older Order | Authorised pinned historical revision remains resolvable |
| Audit required for high-risk Product approval | Product commits only under the approved capture policy; Audit receipt distinguished from source commit |
| Logging or Reporting unavailable | Native catalogue still works, technical loss/coverage uncertainty is disclosed |
| Host sidebar opens Product without optional neighbouring layers | Authorised dashboard and editor work; absent neighbour actions are disabled |
| Mobile/keyboard/screen-reader review flow | Accessible form, table and decision feedback; no graph-only interaction |

## Decisions, consistency and completion gates

**Owner-approved:** PRO-01 canonical catalogue scope; PRO-02 versioned families/variants/specifications/units; PRO-03 engineering eBOM authority; PRO-04 virtual bundle versus stocked kit; PRO-05 match/proposal ambiguity; PRO-06 native lifecycle/historical revisions; PRO-07 qualified external master/import; PRO-08 optional GUI/headless; PRO-09 tenant-owned master plus governed shared references; PRO-10 Product-owned engineering approval with optional Workflow; PRO-11 source-attributed compliance claims with Legal Compliance/issuer authority; PRO-12 finite and constrained variants with scoped SKU; PRO-13 canonical content/translation/merchandising separation. Supplementary standards, permissive-source library selection, Error Normalisation/Logging/Audit/Reporting boundaries, security and presentation recommendations approved.

**No further Product conceptual decision is identified in this review.** The source-of-truth model, native operation, public inputs/outputs, optional dependencies, lifecycle, provider uncertainty, security/privacy/compliance, standards, library candidates, GUI and conceptual acceptance are defined above. This is **conceptual completion**, not evidence of a built package or permission to merge.

**Remaining implementation/evidence work:** establish and inspect a Product implementation repo; publish independently usable root `CONTRACT.md` with exact public exports, versioned command/query/event schemas and security/absence modes; verify sector standards and licence conditions; implement/validate store/outbox/units/variant/graph logic and UI if chosen; obtain tests/CI and operational acceptance. Reconciled with merged Order [#113](https://github.com/nuxt-layers/architecture-blueprint-review/pull/113) and Quality [#127](https://github.com/nuxt-layers/architecture-blueprint-review/pull/127). Order owns accepted seller-scoped obligations, separate seller orders for multi-seller checkout, amendments and returns; external UBL/Peppol/GS1 trading messages remain optional adapters and do not transfer Product catalogue authority. Quality owns inspections and dispositions, not engineering design approval. Pending Pricing [#119](https://github.com/nuxt-layers/architecture-blueprint-review/pull/119) remains independently governed; reconcile later master changes before merge. Verify current branch protection, conflicts, CI, architecture and changed-file scope immediately before merge. **Separate explicit owner merge approval is required.** The draft PR remains open and unmerged. Evolution belongs in this canonical record and relevant reciprocal public-contract sections, not disconnected review notes.

## Reciprocal conceptual interface — Pricing (22 November 2026, draft PR #119)

**Status: Pricing PRI-01–PRI-07 and five supplementary pricing solutions owner-approved conceptually on 22 November 2026; not implemented, and this does not approve the neighbouring capability review.** [Pricing](../pricing/capability-record.md) is the authority for versioned commercial tariffs, effective price lists, discounts, coupon rules, currency/rounding policy and attributable quote calculations; it does not own product identity, saleability, catalogue units or availability. The partner supplies its own scoped, effective, revisioned source facts where relevant; Pricing returns qualified price/quote, source revision, calculation evidence, currency, tax/FX certainty and expiry. Missing, stale, unauthorised or contradictory mandatory input prevents a definitive claim; a quote, order, assessed charge, payment and posted invoice are distinct facts. Integrate through public acyclic contracts/ports/events, not private schemas or an inferred package import. Preserve existing independently approved partner decisions; proposals in active parallel PRs require reconciliation before merge.

## Reciprocal standards interface — Pricing (22 November 2026)

**Pricing standards application (approved conceptual direction, 22 November 2026):** [Pricing](../pricing/capability-record.md#security-compliance-internationalisation-and-standards) consumes Product-owned units, category/eligibility data and optional GS1 trade-item identifiers, supplying effective selling/unit-price evidence where applicable. Product retains identity and units; public shop presentation, not Product's private model, combines authorised Pricing outputs with jurisdiction-specific display duties supplied by Legal Compliance. Do not infer a final total from missing mandatory charges.


## Reciprocal persistent Shopping Basket line reference — 23 November 2026

**Status:** SB-01–SB-08 **owner-approved conceptually on 23 November 2026**; runtime Product/Shopping Basket integration remains unverified. [Shopping Basket](../shopping-basket/capability-record.md) persists selected Product/variant IDs, immutable source revisions, chosen permitted options, quantities and source observation time as **intent**. Product alone supplies identity, variant/configuration/unit validation, effective/retired or replaced revision and disclosure restrictions through its published read/validation contract. On stale/unknown/withdrawn Product, Basket flags retained intent and cannot claim sellability at checkout; version and qualification errors are explicit. Product does not import Basket or own its holder/line lifecycle. The future root contracts must align precise ID/revision shapes, visibility scopes, validation result and failure semantics. Existing PRO-01–13 approvals are unchanged.


## Reciprocal conceptual interface — Reviews (23 November 2026)

**Status: Reviews REV-D01–REV-D08 owner-approved conceptually on 23 November 2026 in [draft PR #130](https://github.com/nuxt-layers/architecture-blueprint-review/pull/130); not a published implementation contract or governing adoption.** [Reviews](../reviews/capability-record.md) may consume Product-owned product/variant identity, tenant/resource reference, allowed review scope, effective revision and lifecycle/visibility status. Reviews independently owns attributed ratings, review text, verification *assessment*, subject replies and derived reputation summaries, and supplies authorised revisioned review-list/aggregate queries and committed publication/withdrawal signals. Product does not inherit review state or assert that a rating validates a product or a purchase; Order/Booking/service owners separately establish verification evidence. Missing/stale Product facts block source-dependent publication or yield unknown, and public display must honour redaction and completeness rules. Contracts remain directional without cyclic package imports.

## Reciprocal Shop catalogue presentation — 23 November 2026

**Status: Owner-approved Shop-side integration in [draft PR #134](https://github.com/nuxt-layers/architecture-blueprint-review/pull/134), preserving approved PRO boundaries.** [Shop](../../compositions/shop/compositions-record.md) displays permissioned, source-revision-qualified Product definitions and routes canonical product matching/creation through Product. Shop does not own identifiers, variant truth, product approvals, shared catalogue overlays, stock or sale price. Marketplace seller submission is owner-routed to Marketplace/Product. An unavailable, superseded or ambiguous Product revision cannot be silently treated as sale-ready. No new Product runtime interface is asserted.


## Warehouse reciprocal interface — 23 November 2026 (draft PR #149)

**Status: proposed Warehouse-side conceptual contract; not independently approved or implemented.** [Warehouse](../warehouse/capability-record.md) owns physical receiving, inspection/count evidence, bin/staging work, put-away, picking, packing, occupancy and physical custody acknowledgements. Product owns item/packaging/BOM definitions and physical-versus-virtual bundle classification; Warehouse handles goods against versions, not catalogue changes. Consumers must use versioned authorised public contracts, distinguish observed/queued/physically completed from independently confirmed source-owner outcomes, and reconcile duplicate/unknown provider results. This note **does not approve or complete** the neighbouring capability's independent review; see Warehouse draft PR #149.

## Checkout reciprocal conceptual interface — 24 November 2026

**Checkout-side conceptual interface owner-approved (24 November 2026):** [Checkout PR #151](https://github.com/nuxt-layers/architecture-blueprint-review/pull/151), [conceptual contract](../checkout/capability-record.md). Checkout consumes current saleable definition, options and version from Product; no checkout-owned product master. Product receives source-qualified item/offer requests, not order or stock authority. Existing approved decisions remain authoritative; host-bound public ports only.
