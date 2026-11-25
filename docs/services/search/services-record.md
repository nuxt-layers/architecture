# Search — Service Record

**Artefact classification:** Technical service (CLS-09, approved 24 November 2026). **Prior governing/review classification:** Platform capability candidate in the governing catalogue; **Platform responsibility owner-approved conceptually** (SEARCH-01–07, 23 November 2026).  
**Design status:** **Conceptual review complete and owner-approved**, including public contract, sources, standards, permissive libraries, operational relationships and GUI. Not an implemented capability, published Search runtime API, governing-catalogue promotion, compliance certification or merge approval.  
**Review:** Draft PR #132 · review protocol (former document: review protocol). Opening governing `master`: `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint: `85c67c33e3e93d12bed5ffc14f78fb7d7bff8995`. Recheck current masters before merge.

## Purpose, authority and lifecycle

Search provides **permission-safe discovery across capabilities** through versioned, replaceable, derived indexes. It owns source registrations, approved projection mappings, indexing/reconciliation/checkpoints, relevance/ranking, bounded query/facet/suggestion services, locally applied suppression, index generation/recovery, application receipts, operational status and its own committed outbox.

**It does not own** original publications, posts, products, venue listings, prices, inventory, bookings, rights, permissions, Metadata's vocabularies or inferred truth, Moderation decisions, source transactional outboxes, provider secrets, Logging's diagnostics, Audit's accountable evidence, Reporting's analysis or SEO's public metadata. Results are **candidates**, not permission grants or guarantees of current source detail, price, availability or business action.

**Native operation:** host registers an eligible source → Search validates contract and projection → consumes source snapshot/committed changes → applies idempotent revisioned updates or rejects/quarantines them → answers scoped queries → reconciles gaps → handles correction, withdrawal, expiry, privacy erasure and local suppression → safely rebuilds/activates/retire index generations. Applied status is distinct from queued/accepted; late/duplicate revision cannot resurrect withdrawn content. Source-native reads remain usable during Search outages.

Local search requires neither Federation, a Hub, external providers, AI nor a GUI. **Optional Federation** supplies verified permitted envelopes and peer withdrawal evidence; Search controls local admission and indexing. A Hub is host composition, not a required central authority. Remote metadata is untrusted and may be stale. Semantic/vector/AI enrichment is optional, purpose-limited and must never expand access or turn relevance into source fact.

## Contract-governed eligible sources

Search indexes only **explicitly authorised fields and records through the actual record owner's published root `CONTRACT.md`**, or through an approved host adapter to that documented public interface. The source contract and host policy determine permissible visibility and reuse, not the name of a capability, a visible webpage or an accessible feed.

Source registration checks owner, root-contract reference/version, canonical resource IDs, revision/publication/expiry, tenant/site/venue/owning-group and per-item permissions, safe projected fields, language, provenance, rights/licence, jurisdiction, retention, reconciliation and withdrawal/erasure. Missing approved read/change/disclosure surfaces mean **no indexing** until the source owner establishes them. No private table imports or unauthorised crawling.

| Example | Eligible public information and owner | Verified state |
|---|---|---|
| **Publisher** articles, pages and news | Published site/type/locale/path, current revision, permitted summary, feeds and withdrawal events | [Publisher root `CONTRACT.md`](../../../RESOURCES.md#ref-332e0d6b) offers published document/list/feed/sitemap/address reads and committed outbox; a dedicated Search adapter is **not** verified |
| **Shop, Product, Marketplace** | Shop storefront context; Product owns canonical definitions; Marketplace approved public seller/venue listings and withdrawal; Pricing and Inventory/Booking own price/availability | Shop/Marketplace conceptual records reviewed; root runtime contracts not verified. Shop is composition, not a second product/listing master |
| **Forums, comments, public news feeds** | Owner-approved, moderated public posts/comments or permitted RSS/Atom, canonical attribution, revisions and removals | Owning forum/comment root contract unverified. External feeds require authorised Integrations/Federation/host adapter, terms and reuse rights; public visibility alone grants none |
| **Help, Booking, Recruitment, Billing and others** | Only source-owned, authorised, minimised discovery projections, with current owner detail/action rechecks | Each source's actual public contract and policy control admission |

## Idealised inbound public contract

The identifiers are **conceptual surfaces, not implemented export names**. Use trusted server-resolved caller, tenant, resource owner, assurance, policy revision, source version/time, opaque correlation and idempotency where applicable; user input never establishes permission.

| ID | Input and cooperating owner | Required meaning |
|---|---|---|
| **SRC-01** | **Register source** — authorised host/source | Contract version, schema, allowlisted fields, effective visibility, licensing, retention, reconciliation and withdrawal paths; reject unsafe/incomplete registrations |
| **SRC-02** | **Source snapshot, change and retraction** — Publisher, Marketplace, Product, other owner | Stable source ID, tenant/owner scope, source-issued revision, published state, permissible data/locale, provenance and committed correction/withdrawal; authenticate, minimise, deduplicate and apply revision order |
| **SRC-03** | **Current access/disclosure** — Identity/Authentication/Authorisation, source | Trusted actor/group and item/field permission. Unknown or outdated protected access fails closed |
| **SRC-04** | **Query** — authorised user/host/domain | Bounded terms, permitted sources, locale, filters, sort, safe fields and scope-bound cursor; validate DSL/cost/rates |
| **SRC-05** | **Correct, suppress, erase or reconcile** — source, Privacy, Moderation, authorised operators | Versioned resource, scope, accountable instruction/effective time; validate authority, prioritise retractions and distinguish local from source deletion |
| **SRC-06** | **Federated descriptor** — optional Federation | Verified origin, collection, peer/rights, revision, expiry and withdrawal; reject private/untrusted/incompatible records |
| **SRC-07** | **Enrichment** — optional Metadata, Localisation, Location | Approved terms, language, geo and provenance-qualified taxonomy/ontology relationships; no inferred permission |
| **SRC-08** | **Effective policy and maintenance** — Configuration/Clock/host/operator | Source allowlist, relevance, quotas, retention, provider settings, pause, rebuild, reconcile and retire; cannot weaken security floors |

## Idealised outbound public contract

| ID | Output and consumer | Meaning / limit |
|---|---|---|
| **SRCH-01** | **Search response** — host/user/domains | Ranked authorised candidate IDs and canonical owner links, safe titles/excerpts/highlights, pagination, source revision/provenance, qualified freshness/completeness; never definitive business truth |
| **SRCH-02** | **Contextual discovery** — Shop, Marketplace, Publisher, Help, domains | Related items, safe suggestions, possible duplicates and exact reference lookup; owner rechecks current detail/action permission |
| **SRCH-03** | **Facets/counts** — authorised UI | Values derived **inside** caller's permission scope, with suppression where small-group/existence inference is possible; not business reporting |
| **SRCH-04** | **Index application receipt** — source, Federation, Privacy, Moderation | Accepted/queued, applied, rejected or uncertain; checkpoint, source revision and generation; never proof of origin or remote erasure |
| **SRCH-05** | **Index and source health** — authorised operator/Observability/Reporting | Coverage, index age, gap/rebuild status, failures, provider degradation and cost where relevant; not source authority |
| **SRCH-06** | **Search-owned committed events** — approved bus consumers | Registration, index generation, local suppression and configuration state changes; own durable outbox when needed, not reissued domain events |
| **SRCH-07** | **Restricted index export** — privileged operator | Index definitions, mappings, checkpoints and permitted derived snapshots; scope, source rights and data minimisation enforced |

**Interaction semantics:** all commands require current authority and return explicit accepted/applied/refused/unknown outcomes; every result cursor binds to scope, filters and generation; events are at-least-once and require deduplication/replay reconciliation. Source reads and actions must re-authorise at the source. No distributed exactly-once or instantaneous remote erasure guarantee.

## Cross-capability inputs and outputs

| Cooperating owner | Information supplied to Search | Search returns / ownership boundary |
|---|---|---|
| IAM (Identity, Authentication, Authorisation) | Trusted caller/tenant/group, assurance and permission decisions | Authorised discovery only; IAM owns access grants |
| Publisher and domain owners | Owner-approved published versioned projections, correction, retraction and current owner reads | Candidates, freshness, index application; domain remains final truth |
| Metadata, Localisation, Location | Optional terms/synonyms, locale, qualified ontology and geo metadata | Permission-safe matching and facets; no new canonical metadata |
| Federation | Verified public peer descriptors and withdrawal | Local index status; Federation retains peer trust and transport |
| Moderation, Content Security, Privacy, Legal Compliance | Safety/restriction, erasure and applicable rights/retention rules | Local suppression and application receipts; no adjudication or statutory guarantee |
| Configuration, Clock | Settings precedence, provider/source policy and canonical instants | Qualified indexed-at, expiry and active settings; no security override |
| Message Queue, Scheduler, Workflow, Temporal Gateway | Host-composed event transport and optional recovery/scheduling services | Search-owned handlers and checkpoints; no imported source outboxes |
| Caching, SEO, UI/Theme Manager, Help | Scoped cache and optional host presentation; SEO's public metadata | Safe candidate links and invalidation; not a second SEO/presentation owner |

All relationships are directional **public ports** resolved by a thin host, not mandatory cross-package imports. Keep ADR-0012's one-operation/50-line Nuxt-specific composition budget.

### Errors, Logging, Audit and Reporting

| Partner | Search supplies | Partner supplies | Boundary |
|---|---|---|---|
| [Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) | Search-owned versioned error definitions, known/uncertain query/index outcome, mapping and safe disclosure/correlation | Pure normalised code/category/message key, restricted projections and **advisory** retry qualifier | Library owns no state, retries, logs, audit records or source outcome |
| [Logging](../logging/services-record.md) | Sanitised structured query, ingestion, provider/rebuild diagnostics and opaque correlation | Accepted/rejected/unknown diagnostic receipt, scoped lookup and sink health | No raw private queries, records, snippets, credentials; log receipt not index completion |
| [Audit](../../capabilities/audit/capability-record.md) | Risk-selected attributable security/privileged source changes, export, suppression and access decisions with actual outcome | Evidence intake/integrity status and authorised review | Routine queries not automatically audited; critical required evidence uses fail-closed or approved recovery |
| [Reporting](../../capabilities/reporting/capability-record.md) | Permitted aggregated Search-owned source coverage, lag, throughput, failure/latency, cut-off and completeness | Authorised reports, execution/export status, KPIs, provenance and gaps | Hits are not orders, bookings or verified publications; no private query history by default |

A timeout may mean the index outcome is **unknown**. Error Normalisation makes that safe to explain; Logging gets separate technical evidence; Audit receives risk-selected accountable facts; Reporting receives qualified aggregates. None changes Search's actual state or proves another system's success. Logging/Reporting outages normally do not block Search; mandatory Audit protections remain risk-enforced. The normaliser is an approved conceptual **stateless library**, not a verified runtime package.

## Security, privacy and recovery

- **Inside-query enforcement:** tenant, owning group, item and field access must constrain retrieval **before** lexical/vector/geospatial top-N, ranking, facets, suggestions and counts. Global top-N followed by access filtering is forbidden. Guard against timing, scores, snippets, autocomplete, low-count inferences, scope-crossing cache keys and exports. Fail closed on unknown protected authority.
- Protect query parsing, stored and remote text, highlighting, embeddings and feeds against injection/prompt manipulation; bound cost, rate, sizes and traversal. Scope cache entries and invalidate on revocation. Owner-authoritative detail/action always rechecks access.
- Apply source corrections, erasure, withdrawal, expiry and Moderation restrictions to serving **and rebuilding generations** and optional vector/cache copies under documented bounds. Preserve tombstones across replay and switch generation only after security/completeness checks. Third-party and backup erasure have their own documented evidence/bounds; legal holds do not authorise disclosure.
- Inventory every index, vector/provider store, cache and backup in `STORAGE-REGISTER.md`: owner, tenant, fields, classification, purpose, region, retention, erasure and recovery. Minimise stored projections; disable private query-history, profiling and personal analytics by default absent approved lawful basis/policy.
- Apply OWASP ASVS 5 Level 2 (risk-based L3), governing isolation, WCAG 2.2 AA and applicable privacy/UK GDPR/sector obligations through responsible owners. Do not claim certification or compliance without assessment.
- Provider-neutral engine and rollback; health covers source gaps, checkpoints, index generations, lag and qualified unavailable/stale status. Missing source data must not appear as a definitive zero-results answer. Host manages credentials and infrastructure.

## Optional GUI and test-host presentation

**Headless is the default**. The host may expose a Search dashboard, embedded search bar or restricted operator screens. The representative [application test template](../../../RESOURCES.md#ref-f1f7cc47) documents homepage `/`, test/admin entry `/admin`, collapsible sidebar/mobile overlay and Theme Manager at `/theme-manager`. A **derived** test app can add sidebar **Search** → illustrative `/search`; route, menu and security remain host-owned. The template's unauthenticated Theme Manager **test mode cannot be used as production authorisation**.

| Optional screen | Purpose and consuming public interfaces |
|---|---|
| **Search dashboard/results** | Public/authenticated query, allowed source filters, snippets and links, source/freshness and qualified result status: SRC-04 → SRCH-01/02/03 |
| **Contextual search** | Shop, Marketplace, Publisher, forums, Help, Booking: host passes trusted scope and reopens owner detail via its public contract |
| **Sources and index overview** | Restricted index registration, revision, coverage, lag, failure and generation from SRCH-05 |
| **Source administration** | Restricted source approval, fields, visibility, licensing, enable/pause/retire: SRC-01/08 → SRCH-04/05 |
| **Index operations/recovery** | Restricted reconcile/rebuild, generation activation and clear queued-versus-applied feedback: SRC-05/08 → SRCH-04/05 |
| **Suppression/withdrawal status** | Restricted scoped removal receipts, pending/unknown status and links to owner-held cases: SRC-05 → SRCH-04/05 |

Menus never confer authority: production management requires server-side IAM, tenant/resource scope, role and risk-appropriate assurance even on direct URL/API access. Use Theme Manager tokens, WCAG 2.2 AA, keyboard/focus and screen-reader status support, responsive mobile navigation, BCP 47/CLDR/RTL, safe query URLs, and distinct loading/empty/partial/stale/unavailable/unauthorised states. No screen is required for a headless host.

## Approved standards and permissive open-source foundations

**Required governing baseline:** accepted ADRs, OWASP ASVS 5 L2 (risk-based L3), W3C WCAG 2.2 AA, BCP 47 and in-query security; applicable UK GDPR/data-protection and jurisdiction-specific law. Standards guide engineering, not automatic legal compliance or purchased certifications.

**Approved design references:** ISO/IEC 25010:2023 (quality/performance), ISO/IEC 27001:2022 and 27002:2022 with NIST SP 800-53 (security), ISO/IEC 27701:2025 and UK ICO (privacy), W3C SKOS and ISO 25964 (Metadata-owned vocabularies), W3C PROV-O (origin/lineage), Unicode UAX #29 / UTS #10 (multilingual word boundaries/collation), ISO 9241-210:2019 (usability) and HTTP RFC 9110/9111 (transport/cache). **Conditional only:** RFC 9309 robots controls for authorised crawling (**not** reuse permission), RFC 4287/5005 Atom/news feeds, W3C DCAT 3 for catalogue exchange, W3C SPARQL or NISO SRU/CQL for specialist interoperability and ISO/IEC 42001:2023 for deployed AI governance. None forces a search backend or new capability.

**Owner's strict technology rule:** select active, mature, fully publicly sourced flagship functionality under commercially permissive PostgreSQL, Apache-2.0, MIT or BSD licences, including required plugins/dependencies. Avoid deliberately limited or delayed open-core editions.

| Role | Recommended technology | Boundary |
|---|---|---|
| **First choice** | [PostgreSQL full-text search](../../../RESOURCES.md#ref-9e6cf77c) + upstream `pg_trgm`, PostgreSQL licence | Already hosted, SQL security scopes; benchmark relevance/scale before introducing anything else |
| **Conditional specialist engine** | [Apache OpenSearch](../../../RESOURCES.md#ref-133dccf8) or [Apache Solr](../../../RESOURCES.md#ref-3a3c8cfe), Apache-2.0 | Only when measured scale, language or retrieval needs warrant an extra service; verify plugins and in-query filters |
| **Optional custom-library engine** | [Apache Lucene](../../../RESOURCES.md#ref-6f0b2c64), Apache-2.0; [Tantivy](../../../RESOURCES.md#ref-29ee9c92), MIT | Dedicated Java/Rust integration only with proven need |
| **Optional language/semantic extension** | [pgvector](../../../RESOURCES.md#ref-863156a4) and [PGroonga](../../../RESOURCES.md#ref-b46ff366), PostgreSQL licence | Vectors/multilingual processing with equivalent security and data-transfer controls |
| **Local public subset / NLP only** | [MiniSearch](../../../RESOURCES.md#ref-58227ec0), MIT; [FlexSearch](../../../RESOURCES.md#ref-788e2bc4), Apache-2.0; [winkNLP](../../../RESOURCES.md#ref-1a833bc8), MIT | Browser search cannot enforce protected server permissions |

**Defer:** newer `pg_textsearch` until sufficient maturity/benchmark evidence. **Exclude for the requested licence model:** Elasticsearch non-permissive distribution; Meilisearch open-core mixed MIT/Business Source Licence; AGPL ParadeDB `pg_search`; GPL Typesense, Manticore and Xapian. GPL software can be genuinely open source yet not permissively licensed. Version, dependency/plugin licence, security upkeep, source completeness, PostgreSQL compatibility and deployment cost are verified before provider adoption; the shortlist is not installed or benchmarked.

## Conceptual acceptance scenarios (not executed)

1. Published Publisher revision indexes and links with provenance; revision/withdrawal erases protected visibility in live and rebuilt generations.
2. Cross-tenant/group access, revoked membership and private fields do not leak through hits, vector top-N, excerpts, facets, counts, suggestions, timing or caches.
3. Out-of-order/duplicated committed changes are idempotent and missing revisions reconcile without resurrecting retracted records.
4. Shop/Marketplace result remains a candidate: Product/Pricing/Inventory/Booking/Order owners check current details/actions; moderated forum/feed and source licence restrictions apply.
5. Provider outage or stale source yields honest incomplete status, not fabricated zero matches, and source-native fallback.
6. Invalid/untrusted remote descriptors, unsafe source registration and unauthorised index commands/export are refused and risk-selected events audited.
7. Error Normalisation returns safe outcomes, Logging gets only minimised diagnostics, Audit gets attributable evidence and Reporting gets versioned scoped aggregates with uncertainty.
8. User and operator GUI: authorised sidebar route, safe direct URL, accessible keyboard/mobile/themed/i18n results, scoped operator controls and explicit accepted-versus-applied progress.
9. Headless native service works with Federation, AI, specialist engines and Reporting absent; host wiring respects ADR-0012; source owner contracts remain independent.
10. Implementation CI must verify real relevance, multilingual handling, p95 latency, revocation/erasure bounds, rebuild rollback, provider compatibility and storage/retention; no tests or builds were run during this conceptual review.

## Decisions and delivery status

**Owner-approved conceptual decisions (23 November 2026):**
- **SEARCH-01:** independent Platform indexing/retrieval responsibility, not a domain master, Hub or stateless library.
- **SEARCH-02:** PostgreSQL full-text and `pg_trgm` native first, replaceable provider interface, evidence-led specialist engines.
- **SEARCH-03:** source-contract-governed versioned minimal projections, committed owner changes, replay, reconciliation and candidate-only results.
- **SEARCH-04:** permission inside query/top-N/facets, safe caches, protected revocation and suppression, fail-closed uncertainty.
- **SEARCH-05:** optional Federation, vector and AI; local search independent.
- **SEARCH-06:** headless core with six optional, authorised user/context/admin screens following derived test-host sidebar conventions.
- **SEARCH-07:** public acyclic ports and separate domain, IAM, Metadata, Privacy, Moderation, Error Normalisation, Logging, Audit and Reporting authority.

**Further approved:** public `CONTRACT.md` governs source scope (Shop, Marketplace, published content, forums, news feeds); international/specialist design standards; strict complete, active, commercially permissive OSS selection; normalisation/diagnostic/evidence/analytics contracts and GUI presentation. **No unresolved conceptual design decisions remain** under the agreed review scope.

**Outstanding implementation and pre-merge checks:** (1) verify/create independently usable Search root `CONTRACT.md` and missing source runtime contracts/adapters; (2) benchmark/select versions and set measured latency, freshness, revocation and storage-retention targets; (3) implement provider security/rebuild/outbox/storage register and CI-backed contract, isolation, accessibility and recovery tests; (4) recheck latest accepted governing ADRs and blueprint `master`, overlapping open PRs, reciprocal documentation, links, conflicts, protected branch and CI/mergeability; (5) obtain **separate explicit merge approval**, then verify the squash-merge result. These are **not reasons to reopen agreed conceptual ownership**.

**Conclusion:** Search's **conceptual specification is complete and owner-approved**. Implementation, operational assurance, governing-catalogue adoption and draft PR #132 merge remain separate work. Git history preserves superseded drafts; this document is the single current specification.

## SEO versus application Search — 23 November 2026 (draft PR #133)

**Proposed reciprocal boundary, not a published integration.** [SEO conceptual specification](../seo/services-record.md). Search owns internal discovery indexes, ranking, permitted snippets/facets and tenant-scoped authorised results; SEO's recommended initial scope owns external crawler-facing head, sitemap and robots projections from verified public source facts, **not** a custom redirect handler; Publisher retains its document redirects and SEO-05 is owner-approved (23 November 2026): no SEO custom redirect authoring/serving in its initial release. SEO can expose revisioned public search-presentation hints and change notifications but cannot confer access or guarantee search-engine indexing. Search may use public-safe metadata where suitable, yet must independently validate source-owner permissions and freshness; neither capability should require the other's package or adopt a second source master. External search-engine operator guidelines are conditional guidance, not authority for Search to override resource-owner permission, source freshness or the IETF/HTML public interoperability rules.
