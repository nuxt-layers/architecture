# Metadata — Capability Record

**Classification:** Platform capability. **Conceptual status:** complete; owner-approved on 22 November 2026 (MET-01–MET-08, standards, permissible open-source criteria, Apache AGE design and GUI). **Implementation:** unverified; no root `nuxt-layers/metadata/CONTRACT.md` could be retrieved from `master`. **Review:** draft PR #95, not merged. **Authority:** accepted governing ADRs, especially ADR-0012 (independent contracts and durable events), ADR-0016 (acyclic composition), ADR-0017 (tenant boundaries) and ADR-0018 (policy ownership), and the governing capability standard. Conceptual names below are **proposed interfaces**, not existing code exports. The latest governing `master` was checked on 22 November 2026 at `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; the blueprint `master` advanced to `f7a10d74540e911af78aa11454c58c6a7794920c` during pre-merge review; the Metadata branch reconciles this baseline through a preserving merge commit. Recheck the target baseline before the squash merge.

## Purpose and ownership

Metadata is the common, independently usable home for **governed tags, categories, taxonomies, semantic vocabularies, ontologies and optional cross-resource classification assignments**. It gives cooperating capabilities consistent terms and machine-readable relationships without making every capability depend on Metadata.

**Metadata owns** vocabulary and ontology definitions; term identifiers, labels, synonyms, hierarchies, typed links, version and approval state; declared semantic axioms/rules; versioned reasoning results and explanations; opted-in assignments; mapping provenance; and the operations, policy enforcement and outbox associated with these facts.

**Source owners** such as Publisher, Product, Course and Media continue to own the original resource, its content, validity, lifecycle, visibility and specialised business classifications. Identity/Authorisation own permissions; Localisation owns translation workflows; Configuration owns authorised settings; Search owns indexes; Audit owns evidence; Reporting owns derived reports. A semantic relationship or inferred fact **cannot grant access, publish content, certify a qualification, create an entitlement or establish a legal determination**. Purely local labels may remain with their domain owner.

Native operation must work without a third-party ontology provider, separate proprietary database, Search service, Reporting or administration GUI. The approved first release **includes complex ontology reasoning**, not merely graph traversal.

## Information model, policy and lifecycle

- **Vocabulary / Term:** stable scope-qualified ID, definition, category or tag type, preferred/alternative/hidden labels, language, aliases, status, effective time and revision. Term identity is independent of labels. Term codes are unique within their declared context, not globally.
- **Taxonomy / Relationship:** versioned broader/narrower/related/replacement or other approved typed links. A hierarchical cycle is invalid; not every semantic relationship is hierarchical. SKOS concept hierarchies and OWL class hierarchies have different meanings.
- **Ontology:** named, revisioned classes, properties, axioms, imports and supported inference rules, with an explicit, bounded reasoning profile and protected ownership.
- **Reasoning run / derived fact:** input and ontology revisions, profile, execution status, consistency checks, conclusions, explanation/proof references, provenance, completion/freshness and bounded resource use. **Asserted and inferred facts remain separate**. Missing information does not automatically mean false.
- **Assignment:** resource-owner type/reference, tenant/site scope, term, source revision, Metadata revision, origin, status and effective period. Metadata owns it only when the source explicitly opts in.
- **Mapping / import:** qualified external vocabulary ID, source version, correspondence, approval, confidence where applicable, provenance, conflict and revocation state.

Versioned lifecycle: vocabularies and terms **draft → active → deprecated → retired**; assignments **proposed → active → withdrawn** or rejected. Ontologies and reasoning runs have separate approval and execution states. A change uses expected revision, authorisation and idempotency. Retirement preserves permitted historical meaning; replacement never silently rewrites a historic assignment. Legal hold, retention and erasure constraints apply to all records.

**Policy boundary (ADR-0017/0018):** Metadata enforces mandatory tenant separation, relationship and inference safety, approval/version rules and restricted disclosure. Configuration may supply approved scoped options, never weaken invariants. Privacy/Legal Compliance provide applicable rights, lawful disclosure and retention constraints; source owners retain business decisions. Tenant parenthood, group membership and ontology hierarchy confer **no inherited data rights**. Critical uncertainty fails closed with an explicit recovery path.

**Page Builder navigation (PB-29–37 approved):** [Page Builder](../../presentation/page-builder/presentation-record.md) may request scoped, bounded taxonomy/assignment/semantic discovery with selector, term IDs, purpose and limits. Metadata returns qualified term/resource references, relationship provenance, revision, freshness and asserted/inferred distinction. Metadata owns no menu structure, ordering, route/address, publication or access grant. Source owners and Authorisation independently qualify visitor disclosure; absence of Metadata does not prevent manual menus.

## Public input contract — conceptual

| Source / operation | Information supplied | Metadata's response or rule |
|---|---|---|
| Trusted host and IAM | Authenticated caller, tenant/site/group, action, assurance, correlation and current access decision | Reject missing, conflicting, untrusted or unauthorised context; enforce server-side scope |
| Vocabulary steward | Create/modify/approve/deprecate/retire vocabularies, terms, labels, aliases, relationships; expected revision and reason | Validate labels, uniqueness, hierarchy, lifecycle, cardinality, permission and concurrency; return committed revision or stable failure |
| Ontology steward | Classes, properties, axioms, rules, profile, approval or withdrawal | Validate expressivity, shape constraints, rule safety, provenance, consistent revisions and resource quotas |
| Reasoning consumer | Ontology/snapshot ID, permitted entailment or consistency query, supported profile and limits | Return asserted-versus-inferred results, proof references, status, freshness and completeness; unsupported or inconsistent cases are explicit |
| Authorised classifier | Attach/withdraw terms for a qualified resource, expected owner/Metadata revisions, purpose and idempotency key | Consult source owner's eligibility and visibility, validate terms and policy, record assignment or reject without source-domain side effect |
| Source capability | Existence/eligibility, authoritative resource revision, visibility, withdrawal/deletion and permitted scope | Verify owner evidence and reconcile after withdrawal, race or delayed event; never resurrect the source |
| Configuration / Localisation / Privacy / Legal Compliance | Approved settings, translated labels, data-rights/legal applicability and effective versions | Apply within Metadata's constraints; no implied authorisation or statutory certification |
| Integrations | Staged vocabularies/ontologies, source-qualified mappings, provenance and provider revision | Quarantine, validate and review imports; provider cannot silently become master; partial/unknown results remain marked |
| Event transport / Clock | Valid temporal context and durable relay facilities where composed | Interpret time explicitly; relay committed Metadata outbox events without redefining ownership |

**Conceptual command/query families:** `createVocabulary`, `reviseTerm`, `changeRelationship`, `assignTerms`, `withdrawAssignment`, `validateOntology`, `evaluateEntailment`, `queryInferences`, `explainInference`, `getReasoningRun`, `listTerms`, `listAssignments`, `resolveTerm`, `importMappings`, `exportVocabulary`. Names are illustrative; the future root contract defines actual signatures and permission/error catalogue.

## Public output contract — conceptual

| Consumer | Information supplied by Metadata | Important limit |
|---|---|---|
| Publisher, Content Editor and opted-in domain capabilities | Filtered vocabularies/terms, validated selections, assignment receipts and eligible authorised resource classifications | Does not establish source publication or business validity |
| Ontology/query consumers | Versioned ontology definitions, asserted and inferred relations, entailment/consistency results, explanations, reasoning run/limit/status | Inferencing cannot create permissions, source facts or legal conclusions |
| Search / SEO | Public-safe terms, semantic facets and committed changes for reindexing; freshness/provenance | Recheck source owner visibility; indexes can lag |
| Reporting | Authorised term use, classification coverage, ontology/reasoning activity, validation exceptions, revisions and events | Derived aggregates are Reporting-owned; source data stays with Metadata |
| Audit | Significant committed/attempted classification, ontology, policy, import/export and access-action evidence with minimal provenance | Audit receipt/custody separate from Metadata business outcome |
| Logging / Observability | Sanitised technical event codes, severity, operation, latency, reasoner/AGE failure and correlation | Diagnostics are neither Audit evidence nor classification truth |
| Message Queue / subscribed consumers | Committed `VocabularyChanged`, `TermChanged`, `RelationshipChanged`, `OntologyChanged`, `ReasoningRunCompleted`, `ReasoningInvalidated`, `AssignmentChanged`, `AssignmentWithdrawn` event families | Capability-owned transactional outbox; at-least-once delivery, replay and deduplication, never fictitious distributed exactly-once |
| Imports/exports and stewards | Versioned RDF/JSON-LD/SKOS-compatible interchange, mapping review and reconciliation status | External mappings remain qualified and revocable; no unauthorised bulk disclosure |

Responses identify source and revision, tenant/visibility scope, provenance, relevant time, status (`confirmed`, `pending`, `stale`, `unknown`, `inconsistent`, `unsupported`) and safe error reason. A successful validation is **not** a grant to edit an owner resource. Source-owner visibility must be current at disclosure time. Permission changes invalidate stale reads and cached projections; do not leak hidden resource counts.

## Cooperating capabilities: boundaries and reciprocal information

| Capability | Metadata needs | Metadata supplies |
|---|---|---|
| Identity, Authentication, Authorisation / IAM Integration | Trusted caller, tenant and access decisions | Scoped results and access-denied outcomes; **no semantic permission inheritance** |
| Publisher, Product, Course, Media, Marketplace and other source owners | Public resource existence, revision, eligibility, visibility, withdrawal and domain intent | Optional shared classifications, validated term selections and qualified semantic context; never ownership transfer |
| Content Editor / UI | Host editing context and presentation facilities | Authorised term/relationship selectors and validation; editor never becomes taxonomy store |
| Configuration, Clock, Localisation | Approved policies/preferences; time semantics; localised presentation | Effective settings, stable term/source labels and time-qualified outcomes |
| Search, SEO | Optional index/publication needs and indexing state | Public-safe, revisioned terms, facets, ontology-derived links and invalidations |
| Integrations / Federation | Qualified imports/identities/provider status | Authorised exports, mapping and provenance results; federated nodes do not become trusted owners |
| Privacy, Legal Compliance | Applicable minimisation, disclosure, legal hold, retention/erasure rules | Scoped classification/ontology references and compliant action statuses, not legal advice or adjudication |
| Message Queue / Scheduler / Workflow | Optional durable transport, scheduling or approved orchestration | Committed events, qualified execution/reconciliation status; these services do not own Metadata's facts |
| **error-normalisation library** | Safe pure formatting of Metadata's structured failure context | Input failure state/code, safe correlation and approved message data; library returns stable sanitised code, retryability and message key; **no storage or logging** |
| **Logging** | Diagnostic intake receipt, sink health, scoped technical reads | Small sanitised reasoner, AGE, validation, latency and retry diagnostics. Ordinary log failure cannot undo committed Metadata work |
| **Audit** | Evidence intake acceptance/uncertainty, verified receipt reference and authorised evidence queries | Risk-selected event source, action, actor, tenant, scope, revision, outcome, times and before/after **references** via approved intake/outbox; mandatory evidence failure must be visible/reconciled |
| **Reporting** | Report definitions, run/export status, derived summaries, cutoff/freshness and failed-refresh results | Authorised revisioned term/assignment/ontology/validation/reasoning projections and change events; Reporting cannot change source facts |

All edges are **host-wired public-contract cooperation**, not direct private-store access, mandatory package imports or cycles. Metadata's own operational dashboard works without Reporting. Audit evidence is not Logging. An error-normalisation library is a pure helper, not a new capability with state. The owner-approved conceptual [error-normalisation library CONTRACT](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) was located on the newer blueprint `master`; its pure `Normalise`, `Classify`, `Validate and resolve`, `Sanitise/project`, `Prepare message` and `Correlate` input surfaces return safe normalised errors, classifications, version results, projections and message references. The eventual package root exports remain unverified.

## Reasoning and graph-storage architecture

**Approved first-release design:** support complex ontology reasoning: OWL-style declared classes/properties/axioms, entailment, inconsistency detection, explainable inference, revision-bound recomputation and bounded safe failure. A graph query is not by itself a proof. The reasoner works on a permission-filtered, versioned semantic snapshot and returns `asserted` versus `inferred` with evidence and reasoning-profile identifiers; it must not treat missing information as false.

**Approved storage direction:** PostgreSQL remains the authoritative capability-owned data store; **Apache AGE** (Apache 2.0) is the preferred PostgreSQL property-graph extension for graph links, traversal and knowledge-graph projections. AGE uses openCypher and **does not implement OWL inference, SHACL or SPARQL**. Select exactly one authoritative representation for each asserted fact: an AGE projection must be rebuildable, revisioned and invalidated when source facts change; any authoritative graph writes require explicit transaction/ownership rules. Avoid maintaining competing editable copies.

**Semantic execution boundary:** retain a **replaceable native reasoning/validation adapter**, investigating Apache Jena first for breadth while verifying actual OWL conformance. Java/other runtime only if needed; no second mandatory graph database. N3.js is favoured for RDF interchange and Comunica is optional for bounded SPARQL queries. Do not expose unrestricted Cypher, SPARQL update, private graph schema or cross-tenant graph traversal through Metadata's public API.

**Compatibility gates:** verify exact Apache AGE build with PostgreSQL 18, supported extension APIs, transactions, tenancy/access controls, migrations, backup and restore, performance, invalidation, reasoner quotas, replay and recovery. Production compatibility and performance are **not yet tested**.

## Standards — owner-approved design baseline

Use published standards as **design references**, not as unproven certification claims. A final `CONTRACT.md` must identify the **actual supported conformance profile** and any intentional limitations.

| Source / standard | Mandatory design contribution or conditional use |
|---|---|
| W3C [SKOS](../../../RESOURCES.md#ref-ceaf9e24), ISO [25964](../../../RESOURCES.md#ref-926d8bf3) | Core controlled vocabularies, concepts, preferred/alternate labels, hierarchy and cross-vocabulary mappings |
| W3C [OWL 2](../../../RESOURCES.md#ref-7854321a) and [OWL 2 Profiles](../../../RESOURCES.md#ref-c8ffae91) | **Core first-release logical reasoning**. **OWL 2 RL is a recommended profile candidate**, not yet selected or claimed conformant; assess EL/QL for specialist needs. Full profile conformance requires actual normative semantics and evidence |
| W3C [RDF/RDFS](../../../RESOURCES.md#ref-1d5b21c8) and [JSON-LD 1.1](../../../RESOURCES.md#ref-a03bb42b) | Core semantic representation and interoperable import/export; no prescribed storage engine |
| W3C [SPARQL 1.1](../../../RESOURCES.md#ref-5f7e8b5e) | Core semantic query design; expose only controlled, authorised supported operations |
| W3C [SHACL](../../../RESOURCES.md#ref-6dc528a5) | Core structural validation; distinguish closed-world shape validation from OWL open-world logic |
| W3C [PROV-O](../../../RESOURCES.md#ref-20aa2e25) | Core source, revision, agent, transformation and inferred-proof provenance |
| ISO [704](../../../RESOURCES.md#ref-e23b09be), ISO [1087](../../../RESOURCES.md#ref-d3820482) | Core terminology quality, concept identity and definitions |
| ISO/IEC [11179](../../../RESOURCES.md#ref-a1ff3730) | Core registry, stewardship, identity, version and approval reference |
| IETF [BCP 47](../../../RESOURCES.md#ref-699eef87), WCAG 2.2 AA, OWASP ASVS 5 | Language-labelled terms, accessible interfaces and secure capability boundary |
| W3C [DCAT 3](../../../RESOURCES.md#ref-00ce33b2), [Data on the Web Best Practices](../../../RESOURCES.md#ref-b37ccf4d), [Dublin Core](../../../RESOURCES.md#ref-9657f4eb) | Conditional dataset/metadata catalogue exchange and description |
| ISO/IEC 21838, ISO/IEC 19763 | Conditional top-level ontology/metamodel alignment and registration |
| UK [Data Standards Authority](../../../RESOURCES.md#ref-44ad251a), [Data Quality Framework](../../../RESOURCES.md#ref-386eb998) and government DCAT/Dublin Core profiles | UK interoperability, quality, publication and stewardship guidance; apply sector mandates only when relevant |
| ANSI/NISO [Z39.19](../../../RESOURCES.md#ref-0ab87b96), OGC [GeoSPARQL](../../../RESOURCES.md#ref-a6c83f6b) | Conditional controlled vocabulary and geospatial semantics; Location remains owner of geometry |

**Maturity watch:** emerging RDF 1.2 / SHACL 1.2 draft material should be monitored, **not** declared already adopted normative Recommendations. In all profiles, tests must distinguish asserted versus inferred facts, entailment/consistency, constraint validation, provenance, multilingual data, cancellation/timeout and access isolation.

## Open-source selection and candidates — approved procurement policy

Only adopt **fully public, actively maintained, commercially permissive open-source source code** (e.g. MIT, Apache 2.0, BSD, suitable BSD-style Eclipse Distribution and PostgreSQL licences) with no paid-feature gate, source-delay, proprietary service dependency or restricted flagship core. Verify exact release and transitive dependencies, build source, notices/SBOM, licences, CVEs, maturity, runtime and production performance **before implementation**. Exclude open-core/source-available vendor-gated dependencies, including the owner's specifically rejected Neo4j, Redis and Elasticsearch options. An open client SDK alone is insufficient.

| Candidate (official source) | Role and disposition |
|---|---|
| [Apache AGE](../../../RESOURCES.md#ref-0f60ec0d) — Apache 2.0 | **Approved preferred** PostgreSQL graph extension; property graph only, subject to PostgreSQL 18 validation |
| [Apache Jena](../../../RESOURCES.md#ref-7ab49d9e) — Apache 2.0 | **First reasoning/validation candidate**; mature RDF/SPARQL/SHACL/rules; generic OWL reasoner **does not automatically prove full OWL 2 RL compliance** |
| [Eclipse RDF4J](../../../RESOURCES.md#ref-da697d6a) — EDL 1.0 | Mature alternative semantic framework; verify actual OWL coverage and runtime |
| [N3.js](../../../RESOURCES.md#ref-8c4508c1) — MIT | Preferred Node RDF parsing, writing and streaming; **not** reasoner |
| [Comunica](../../../RESOURCES.md#ref-6c3e4b82) — MIT | Optional SPARQL/query adapter; neither owner store nor reasoner |
| [Oxigraph](../../../RESOURCES.md#ref-6a0f1548) — MIT/Apache 2.0 | Permissive RDF engine, **lower-priority benchmark**, not mandatory second graph store; check production maturity |
| [ELK](../../../RESOURCES.md#ref-0a6b05e3) — Apache 2.0; [Whelk](../../../RESOURCES.md#ref-a943427f) — BSD 3-Clause | Specialist reasoner candidates; validate exact EL/RL/other coverage, do not assume general OWL |
| [pySHACL](../../../RESOURCES.md#ref-4293e39b) — Apache 2.0; [RDFLib](../../../RESOURCES.md#ref-94601d7a) — BSD 3-Clause | Independent SHACL and RDF validation/reference tools |
| [shacl-engine](../../../RESOURCES.md#ref-7316cf52) — MIT | Optional Node-local SHACL validator, subject to independent conformance fixtures |
| [OWLAPI](../../../RESOURCES.md#ref-5eeb6944), [ONT-API](../../../RESOURCES.md#ref-9bb6c5a8) | Optional OWL ontology interfaces; choose commercially permissive licence option for exact modules and check dependencies |
| [ROBOT](../../../RESOURCES.md#ref-a91eaa59), [Protégé](../../../RESOURCES.md#ref-2649f4d9) — BSD family | Optional open-source ontology engineering, review and reference tools; do not replace host GUI |
| [Apache Lucene](../../../RESOURCES.md#ref-6f0b2c64) — Apache 2.0 | Optional **via Search capability**, never a duplicate Metadata indexing service |

**Library acceptance:** independently demonstrate exact first-release OWL reasoning and explanation behaviour, safe SHACL/query execution, RDF/SKOS interchange, provenance, rule resource limits, tenant scoping, durability, license notices and recoverability; do not infer conformance merely because an RDF store or OWL parser is present.

## Optional GUI and headless operation — approved presentation direction

**Reference inspected:** `nuxt-layers-test/application-test-template/master`: [README](../../../RESOURCES.md#ref-8c941ad8), [host shell](../../../RESOURCES.md#ref-a4ce9d0c) and [dashboard](../../../RESOURCES.md#ref-96cb2d87). The reference has a separate homepage `/`, capability test dashboard `/admin`, collapsible **Capabilities** sidebar, Theme Manager at `/theme-manager`, responsive navigation and host-owned branding/appearance. It is **local test-only**, with no production IAM; a universal automatic menu registration API was **not verified**.

**Approved pattern:** when installed and authorised, the host adds **Capabilities → Metadata** to its existing sidebar and an optional Metadata card to `/admin`, leading to a host-chosen dashboard (illustratively `/metadata`; **not a mandated route**). The host owns navigation, branding, authentication context and routing; Theme Manager owns appearance tokens; UI provides accessible controls; Metadata owns screens' domain actions; Authorisation owns permissions. No second app shell, login system or theme service. The GUI is separable; all core operations, including first-release reasoning, remain headless.

| Screen / section | Purpose and public-contract basis |
|---|---|
| **Dashboard** | Scoped vocabulary/ontology summaries, activity, health, stale/inconsistent warnings, pending imports/reasoning; Metadata native summary, not mandatory Reporting |
| **Vocabularies** | Terms, tags, hierarchical categories, synonyms, multilingual labels, draft/approval/retirement via revisioned taxonomy commands |
| **Ontology editor** | Classes, properties, axioms, rules, graph and accessible table editing, model version/validation; **first-release function if GUI enabled** |
| **Reasoning explorer** | Bounded entailment/consistency queries, asserted/inferred comparison, explanation/provenance, pending/stale/unsupported results; **first-release function if GUI enabled** |
| **Assignments** | Authorised resource classifications, revisions, bulk operations with source-owner eligibility and visibility rechecks |
| **Import/export and mappings** | Staging, RDF/OWL/SKOS/JSON-LD validation, conflict/provenance review, approvals, provider failure and safe export |
| **History/recovery** | Revisions, deprecation/replacement, reasoning status, reconciliation and appropriate Audit links |
| **Settings** | Approved scope policy, adapter/reasoner status, quotas and configuration; cannot weaken mandatory controls |

**Permissions:** viewer, classifier, vocabulary steward, ontology steward, approver and administrator are **conceptual permission groups**, not existing IAM roles. Never infer rights from semantic hierarchies. Sensitive edits may require step-up and explicit confirmation. On source owner UI (e.g. Content Editor), expose an **optional contextual tag/category picker** using Metadata read/validate and owner write contracts; avoid another editing dashboard.

**States and accessibility:** loading, empty, forbidden/not-found, revision-conflict, unknown source, stale graph, pending reasoning, inconsistent ontology, unsupported profile, quota/timeout, failed import, revocation and unavailable adapter must be accurately shown. Include source revision, as-of time, provenance and asserted/inferred labels; do not claim a queued action is committed. Meet WCAG 2.2 AA, keyboard and screen-reader interaction, reduced motion, accessible visual-graph **and equivalent tree/table**, BCP 47/i18n and Theme Manager semantic appearance. Never leak private resource counts or source evidence through autocomplete, explanations, exports or inaccessible graph nodes.

**GUI acceptance:** derived test host (not modified by this review) provides sidebar/dashboard navigation without losing existing Theme Manager; mobile/keyboard access; no unauthorised route/data; first-release ontology editor and explanation functionality; clean permission revocation and failure states; headless still works if GUI or Reporting disabled; one-call/50-line host composition preserved.

## Failure semantics, evidence and acceptance

- **Mutation:** authorised, scope-checked, expected revision and idempotent. Stable conflicts, permission denials, unsupported profile, invalid ontology and unavailable owner produce safe normalised errors; no partial pretend-success.
- **Reasoning:** bounded execution with explicitly versioned input; stale/unknown/inconsistent outcomes not silently accepted as true or false. Duplicate completion and rule retries do not double-apply conclusions. Revise/retract and invalidate derived views after source changes.
- **Source lifecycle:** owner deletion/withdrawal/permission revocation prevents newly public assignments; reconcile out-of-order events and concurrent revisions, no cross-capability atomic commit promise or resource resurrection.
- **Import/provider outage:** native vocabularies and reasoner remain available; imports are staged and verified; revoked provider and unknown external outcome marked clearly.
- **Events:** capability-owned transactional outbox, at-least-once relay and consumer deduplication; Audit accepts accountable evidence independently and Logging is optional for routine diagnostics.
- **Security/quality:** tenant and nested-tenant separation, Privacy rights, cross-scope and aggregate leakage, unsupported/unbounded queries, hostile ontology import/SSRF and injection, retention/hold handling, recovery, keyboard GUI and no dependency cycles.
- **Proof required later:** independent contract/unit/integration/security/acceptance tests including OWL/SHACL/SPARQL interoperability fixtures; PostgreSQL 18/AGE compatibility, graph-store reconstruction, source permission races, reasoner performance, explicit provenance; `CONTRACT.md` sufficient for independent consumer plus one-operation/50-line Nuxt composition. **CI or user runs tests; this review executes none.**

## Approved decisions and remaining gates

| Decision | Approved outcome |
|---|---|
| **MET-01** | Metadata remains separate Platform authority for shared taxonomies, ontologies and opted-in classifications |
| **MET-02** | Flat tags, hierarchical categories, synonyms, multilingual labels, controlled links **and complex native ontology reasoning in first release** |
| **MET-03** | Domain owner remains sole authority for resources and domain-specific classifications; opt-in shared assignments only |
| **MET-04** | Native-first operation, governed source-qualified imports/exports/mappings and provider withdrawal/reconciliation |
| **MET-05** | Headless core; optional host-driven dashboard and contextual selectors |
| **MET-06** | Revision-aware source eligibility and conservative reconciliation; no fictional distributed atomicity |
| **MET-07** | Later full published root contract, protected composition, durable outbox and implementation evidence |
| **MET-08** | Later security, semantic, lifecycle, accessibility and minimal-consumer acceptance evidence |

**Further owner approvals recorded on 22 November 2026:** standards baseline; strict full-source commercially permissive open-source procurement policy; Apache AGE as preferred PostgreSQL graph extension with replaceable reasoning engine; safe separation from error-normalisation, Logging, Audit and Reporting; eight-screen optional sidebar-to-dashboard GUI concept and first-release ontology/reasoning views. Exact executable OWL profile, runtime adapter and Nuxt route signatures remain engineering validations, **not reopened conceptual design choices**.

**Conceptual review:** **complete** against the approved questions and decisions. **Not operationally ready:** root implementation `CONTRACT.md`, actual interfaces, installed AGE build, reasoning conformance, performance, legal qualification and tests have not been established. **Not merge-ready by this statement:** blueprint master advanced, with overlapping Publisher, Search, Logging, Audit, Reporting, UI, catalogue and register changes. The preceding content was reconciled against the newer baseline using additive reciprocal notes and preserved master content; verify current Git mergeability, branch protection and CI before squash merge. **No merge authorised.**


## Search review — reciprocal conceptual interface (23 November 2026; draft PR #132)

**Status: Proposed Search-side specification, not an implemented or independently approved adapter.** [Search conceptual contract](../../services/search/services-record.md) defines a replaceable, tenant- and scope-filtered derived index. The originating capability retains authoritative resource and disclosure decisions; Search accepts only minimised revisioned projections, permission/withdrawal evidence and scoped reconciliation, and returns candidate references, qualified freshness/coverage and index-application receipts rather than source finality. All sensitive snippets, suggestions, counts, facets, vector results and caches require visibility-safe query-time filtering; source action/detail requests must be reauthorised. Interfaces are host-composed and directional, with no circular package import. Existing approved decisions remain unchanged; differences must be reconciled before PR #132 merges.

## SEO reciprocal public projection — 23 November 2026 (draft PR #133)

**Proposed SEO-side cooperation; does not amend Metadata's approved conceptual ownership or claim shipped integration.** [SEO conceptual specification](../../services/seo/services-record.md). Metadata optionally provides versioned, approved, public-safe semantic terms, classifications and explainable, non-speculative inferences. SEO may transform these into source-verified structured-data/search presentation only where the owning Publisher/domain capability separately confirms current public visibility, factual applicability and locale. Metadata never sets indexability, domain authority or canonical URLs; SEO never edits vocabularies/assignments. Retired terms, withdrawn assignments, stale inference and revoked source visibility invalidate the SEO enrichment without blocking minimal safe native SEO. Validate any public semantic projection against W3C JSON-LD 1.1 and approved Schema.org vocabulary, with source-confirmed factual truth, locale and current visibility; schema validity by itself does not establish search-engine rich-result eligibility. Host-wired contracts remain acyclic.
