# Publisher — capability specification

**Classification:** Platform capability. **Conceptual status:** Complete; owner-approved Publisher decisions (22 November 2026). **Implementation and merge:** Separate verification and explicit merge approval required. **Authority:** Accepted ADRs (particularly 0009, 0012, 0017 and 0018) and the [Capability Standard](https://github.com/nuxt-layers/architecture-rules/blob/master/docs/capability-standard.md) prevail over this blueprint.

**Evidence:** [Publisher published root `CONTRACT.md`](https://github.com/nuxt-layers/publisher/blob/master/CONTRACT.md), implementation `master` `3f4c60a256a6bea9ba9836e58138efbbc69097af` (contract blob `6d51c98cf2fcd40e0de4f476540a63b260f76b42`); documented, **not runtime-verified**. Governing opening baseline `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint opening baseline `361566988ac53c55f6135e8acfa46cd5b013d7a0`. Review protocol (former document: review protocol).

## Purpose, boundaries and native operation

Publisher is the **authoritative owner of the publication lifecycle** for host-registered document types: articles, posts, pages, notices, help content, albums and authorised rendered representations. It owns each document's tenant/site/type association, author reference, validated content, immutable versions/digests, draft/review/publication status, revision-bound approval, schedules, locale variants it accepts, canonical and former addresses, links/backlinks, safe listings/feeds, restrictions, controlled deletion and **transactional outbox**.

Publisher does **not** own the business facts described by a document: Orders owns orders, Accounting owns invoices, Course owns educational facts, Credentials owns award/credential truth, Recruitment owns requisitions, and other domains retain their records. Nor does Publisher own Identity, Profile display names, Media file bytes, Metadata vocabularies, legal applicability, Privacy consent decisions, Moderation cases, SEO/Search indexes, external syndication transport, Audit evidence custody, or the editorial GUI. The duplicate generic Document master remains retired. A policy or notice becoming published **never activates legal, privacy or executable business controls** (ADR-0018).

**Page Builder relationship (candidate):** [Page Builder](../../presentation/page-builder/presentation-record.md) owns the composition model and visual authoring, not publication. Approved PB-01 registers structured pages, reusable sections and templates as Publisher document types, using Publisher's existing validation, revisions, approval, persistence and address services; exact type-contract review remains outstanding. The approved conceptual contract supplies schema/validated composition, component revision references and explicit lifecycle intent; Publisher returns authorised revisions, public addresses and actual transition outcomes (PB-11–PB-16 approved). Approved STD-PB-01–07 require accessible authored content/metadata preservation and applicable policy checks; approved PB-19/21 leave committed document lifecycle evidence and outcome with Publisher, not Page Builder. Approved PB-24/26 expose authorised Publisher page lists, history and revision-bound lifecycle controls through Page Builder, preserving Publisher ownership. No reverse runtime dependency or new Publisher API is implied.

**Navigation extension (PB-29–37 approved):** Page Builder supplies validated versioned menu document definitions (manual items and bounded discovery rules), revision-bound lifecycle requests and target references. Publisher owns saved definitions, approval/publication, canonical page addresses and source events. Dynamic results can change under an unchanged approved rule; no competing publication authority or new Publisher API asserted.

**Native mode:** The host registers validated types and composes Publisher with PostgreSQL, trusted caller/site resolution and server-side Authorisation. Publisher works headlessly without Content Editor, Workflow for types not requiring approvals, SEO, Search, Reporting or external transport. Types requiring approval cannot bypass unavailable approval authority. Missing optional Media resolution prevents affected assets from being exposed; without the optional event transport, committed source events remain in the Publisher-owned outbox. Scheduled execution needs a configured task runner; no implied in-memory substitute or automatic remote delivery.

**Lifecycle:** draft creation → versioned editing → submission/review and exact-revision approval where configured → scheduled or immediate publication → unpublish/withdraw/archive → deliberate reopen/restore or permitted deletion. Expiry, retention and safety/legal holds are independent constraints, not additional evidence of approval. Publication and scheduled execution recheck *current* permission, digest approval, applicable rights and restrictions. A restored or translated revision never inherits stale approval. Address collisions across the same site/type/locale surface fail atomically; backlink impact is displayed and consequential changes require acknowledgement.

## Public published contract and approved extensions

The following names and capabilities are **documented in the implementation's root contract**, not independently verified by tests. No conceptual feature in this record is automatically an existing API.

| Interface | Inputs from host/consumer | Outputs and guarantees |
|---|---|---|
| `composePublisher`, `definePublisherDocumentType` | PostgreSQL pool; registered bounded types; trusted `resolveCaller`, `resolveSite`, mandatory `decide`; conditional approval/policy/asset/title/clock/publish ports | Composed headless services, schema/migrations and scheduled maintenance/outbox relay tasks; invalid composition fails |
| `createPublisherDocument`, import | Trusted site/type/actor, validated content or source import | Draft document and initial revision; **not published** |
| `transitionPublisherDocument` | ID, `expectedVersion`, action: `save`, `submit`, `withdraw`, `publish`, `unpublish`, `archive`, `reopen` or `restore`; schedule/backlink acknowledgement where relevant | Version-conditioned actual transition or safe typed refusal/conflict; approval for a different digest cannot be reused |
| `deletePublisherDocument`, subject-data export/erasure | Authorised document/version or subject-rights request | Controlled delete, personal-data export or scoped erasure result; retention/hold may prevent removal |
| Published reads and address resolution | Site/type/path, list/feed filters and published visibility | Safe public document/tree, listings, addresses, redirects, RSS/Atom and sitemap; hidden/cross-site treated as absent |
| Administration reads | Trusted, authorised caller/site, type, document, history, backlinks, preview or schema request | Permission-scoped drafts, history, rich-text profiles, approved preview, document type definitions and safe action context |
| Typed `usePublisher()` and optional `/api/publisher` | Authorised client calls through host/API | Same bounded public functionality; HTTP API can be disabled without disabling server functions |
| Publisher transactional outbox | Publisher-owned **committed** create/edit/review/schedule/publish/address/unpublish/delete/import/erasure/retention changes | At-least-once source event relay when transport exists; stable ID and replay handling belong to consumers |

**Published permissions:** `publisher.<type>.view-draft`, `.edit`, `.publish`, `.delete`. **Published error categories:** unauthenticated, forbidden, not-found, insufficient-assurance, validation-failed, conflict, unavailable. Content is bounded, validated safe rich-text **tree**, never arbitrary HTML; sensitive personal fields are withheld on public reads. Public operation success means local Publisher authority only.

### Approved conceptual additions — not currently published calls

| Approved interface direction | Input | Output / boundary |
|---|---|---|
| **Unified source/translation acceptance** (PUB-02, PUB-P05) | Registered type, trusted source owner/reference and revision/digest, locale, provenance, licence/rights and validation | Publisher-owned new/updated **draft or locale variant** only; independent approval and publication, no transfer of source business authority |
| **Publication eligibility and restriction evaluation** (PUB-01, PUB-P01–02) | Target document/revision, current approvals, effective time, identity, safety, consent, privacy/legal hold and policy evidence | Permitted, held/refused, pending or unknown with policy/version/provenance and **actual** transition receipt; unknown mandatory gate never permits exposure |
| **Typed attachment references** (PUB-03) | Scoped Media ID/type, accessible description, viewer permission and live asset eligibility | Validated reference/backlinks, withheld or revoked access; Media owns bytes and file access; existing `assets.resolve` is **image-only**, not a general file contract |
| **Rights, retention and evidence outcomes** (PUB-04) | Authorised subject request, qualified purpose/jurisdiction, retention class, verified preservation hold | Completed/refused/pending/unknown erasure/export/retention status; preserve minimal lawful Audit evidence independently; cannot recall external copies |
| **Visibility revalidation** (PUB-P03) | Trusted site, document, viewer purpose, revision/time and disclosure scope | Versioned public eligibility/visibility and authorised content/reference; source truth for SEO/Search/cache/federated rechecks |
| **Idempotent transitions/reconciliation** (PUB-P04) | Source command/idempotency, expected revision, prior event, attempt/remote evidence | Same authoritative result on replay or explicit pending/unknown requiring reconciliation; no duplicate revision/approval/address |
| **External delivery status** (PUB-05) | Integrations per-destination attempt/acknowledgement and reconciliation evidence | Local publication remains distinct from remote pending/confirmed/failed/unknown; cannot promise deletion from remote platforms |

**Common contract rules:** Commands validate trusted tenant/site/actor, action, assurance, version, eligibility and disclosure policy at the server. Queries independently authorise and state source revision, effective time, scope, freshness/coverage and limitations. Events describe only **committed Publisher facts**, carry safe IDs/digests/time/correlation and no document bodies or secrets, and tolerate duplicate, late or reordered delivery. A timed-out command is not automatically rolled back. Do **not** impose one universal request DTO or expose private tables. Actual API signatures, versions and optional adapters belong in a later implementation `CONTRACT.md` change.

## Approved design rules and failure semantics

The owner accepted **PUB-01–PUB-05**, **PUB-P01–PUB-P05**, the recommended resolutions of **PUB-O01–PUB-O05**, and all supplementary safeguards on 22 November 2026. The former PUB-O issues are **resolved conceptual decisions**, not remaining alternatives.

1. **Safety and conflicting constraints (PUB-01 / former PUB-O01):** enforce all applicable constraints, re-evaluating before scheduled exposure. Unknown/stale mandatory permission, approval, content-safety or legal/privacy decision blocks unsafe change. A hold prohibiting *deletion* need not require *continued public visibility*. Record applicable policy version, effective date, source and decision.
2. **Source and locale provenance (PUB-02 / former PUB-O02):** a common, guarded acceptance path handles authored/imported/generated/translated candidates. Verify source revision, provenance, review and rights; stale or untrusted inputs cannot silently become published. Localisation proposes; Publisher owns accepted locale revisions and their publication.
3. **Media custody (PUB-03 / former PUB-O03):** support permitted file types by typed references, enforce live access at association and disclosure, and remove a revoked asset from public output without deleting its parent document solely for that reason. The current image-only API stays unchanged until versioned expansion.
4. **Lawful retention (PUB-04 / former PUB-O04):** qualified Privacy/Legal Compliance obligations govern deletion and preservation independently. Publisher records true source outcomes; Audit retains independently lawful evidence, never an unrestricted shadow copy. Unknown external copies/exports are not promised erased.
5. **External distribution (PUB-05 / former PUB-O05):** Integrations owns provider delivery, attempts, status and retries. Publisher owns local publish/withdraw decisions and source events. A provider receipt proves only what the provider contract actually confirms; delayed withdrawal remains uncertain and escalatable.
6. **Supplementary PUB-P01–P05:** coherent revision/locale/approval/exposure receipt, evidence-backed protection and unknown states, authorised live-visibility query, replay-safe durable change facts and one editorial lifecycle for human/domain-generated content. No new separate CMS, document capability, workflow engine or provider-specific package is justified.

**Security invariants:** Tenant and site isolation at every read, write and event; permission cannot override type, current revision, safety or legal checks; deleted/hidden documents and private drafts never leak through reads, feeds, redirects, errors, preview, logging or outbox. Source-controlled address changes are atomic. Recheck withdrawn/revoked Media, policy changes and downstream visibility. Critical evidence collection may gate high-risk commands when required; ordinary optional integration failure does not fabricate failed or successful publication.

## Cooperating capabilities: public inputs and outputs

These are **host-composed directional public contracts**, not mandatory Nuxt package dependencies. Reciprocals retain their own authority. Where noted, an interface is an approved design rather than an implemented adapter.

| Cooperating owner | Information Publisher needs | Information Publisher supplies | Requirement |
|---|---|---|---|
| Identity, Authentication, Authorisation and host/site | Trusted subject, tenant/site, assurance and resource/action access verdict | Scope/action request and source-authoritative decision context | Essential to protected operations |
| Configuration | Effective presentation, policy settings and provenance | Type/use context; host retains type declaration | Host-supplied, conditional |
| [Workflow](../workflow/capability-record.md) | Exact-digest approvals, expiry/revocation | Digest, approval request, actual publication status | Required for approval types |
| [Clock](../../services/clock/services-record.md), [Scheduler](../../services/scheduler/services-record.md) | Time semantics and due task execution | Due maintenance/relay/schedule tasks and actual execution outcomes | Scheduler required for timed work |
| [Media](../media/capability-record.md), [Rich Text](../../libraries/rich-text/stateless-library-record.md) | Safe structured tree, asset/file access and availability | Document/file relationships, reference and withdrawal impact | Required for referenced content |
| [Privacy](../privacy/capability-record.md), [Legal Compliance](../../capabilities/legal-compliance/capability-record.md) | Qualified rights, consent, retention, jurisdiction, holds and effective policies | Actual exposure, erasure, preservation and exception outcomes | Conditional mandatory |
| [Content Security](../../services/content-security/services-record.md), [Moderation](../moderation/capability-record.md) | Revision-based content findings and case restriction/reinstatement intent | Authorised content references and enacted restriction results | Conditional mandatory |
| [Localisation](../localisation/capability-record.md) | Reviewed locale candidate and source digest | Source text/revision and accepted locale variant/status | Optional |
| [Metadata](../metadata/capability-record.md), [Profile](../profile/capability-record.md) | Qualified taxonomy references, permitted author display | Document/revision reference and authorised byline context | Optional |
| [Content Editor](../../presentation/content-editor/presentation-record.md), [Gallery](../../presentation/gallery/presentation-record.md), [Help](../../presentation/help/presentation-record.md), public host | Editor commands or visitor read | Type schemas, drafts, history, preview, safe public tree/list/feed, receipts | Optional presentation |
| [SEO](../../services/seo/services-record.md), [Search](../../services/search/services-record.md), [Federation](../../services/federation/services-record.md), [Location](../location/capability-record.md), [Comments Engine](../../capabilities/comments-engine/capability-record.md), caches | Reconciliation or indexing status where needed | Canonical URL, locale/revision, visibility checks, safe projection and withdrawal events | Optional derived consumers |
| [Message Queue](../../services/message-queue/services-record.md), [Integrations](../../services/integrations/services-record.md), Notifications | Transport, provider delivery/withdrawal evidence | Durable source event IDs and authorised content changes | Optional; outbox remains Publisher-owned |
| [Export](../../libraries/export/stateless-library-record.md), Storage | Rendered output/byte handling where configured | Permitted safe-tree revision and file references | Optional |
| Course, Assessment, Credentials, Recruitment and other domain owners | Authorised source facts, type/revision, generation intent and provenance | Publisher document reference and actual exposure status, not business fact authority | Conditional |

### Error Normalisation, Logging, Audit, Reporting

| Contract | Publisher submits or exposes | Returned result / authority |
|---|---|---|
| [Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md) ([proposed contract](../../libraries/error-normalisation/CONTRACT.md)) | Source-owned code and known/unknown outcome, approved mappings, trust/correlation and disclosure rule | Pure safe category, message key, public/technical projection and **advisory** retry. No state, logging, retries or false rollback assertion |
| [Logging](../../services/logging/services-record.md) | Sanitised source/operation/severity/correlation for schedule, DB, outbox, delivery and permission-processing failures; no bodies/secrets | Independent accepted/rejected/uncertain diagnostic intake, scoped logs and sink health; **not** proof of publication or Audit custody |
| [Audit](../audit/capability-record.md) | Risk-selected committed document/revision, approval, permission, publish, withdrawal, hold, address, deletion or erasure facts, with event IDs, trusted actor/time/digest and minimal evidence | Independent accepted/pending/rejected/uncertain evidence receipt, integrity/coverage/gap/retention evidence; critical capture can gate operation if governing risk policy requires |
| [Reporting](../reporting/capability-record.md) | Authorised and minimised source counts, state, revision, approval/schedule/withdraw times, outcomes, exclusions, coverage/freshness | Scoped derived reports/trends/snapshots; **not** current publication truth or permission to reveal unpublished/other-tenant data |

**Four different facts:** Publisher's committed outcome, Logging's diagnostic receipt, Audit's evidence receipt, and Reporting's derived snapshot are not interchangeable. Error Normalisation adds **no fifth receipt**. On a timed-out scheduled publication, Publisher returns the known or unknown state and reconciliation reference; others classify, log, witness or analyse it without asserting commit success. Missing Logging or Reporting never blocks Publisher. Critical Audit evidence follows an independently specified risk policy; delayed ordinary intake remains reconcilable. Consumers reauthorise source reads and never access Publisher's private tables.

**Privacy reciprocal boundary (PRIV-01–08, owner-approved):** Publisher owns authored, reviewed, effective and translated notices and provides versioned publication evidence through its public contract. Privacy owns purpose-specific consent, the binding of a choice to its effective notice/version, withdrawal and legal rights decisions; a published notice alone does not permit collection or establish lawful processing. The host displays notices in the separate subject Privacy Centre and contextual cookie/storage choice screens, with accessible alternatives. Each owner enforces its own permitted disclosures; neither service reads the other's private store. These are conceptual integration responsibilities, not verified runtime adapters. See [Privacy](../privacy/capability-record.md).

## Configuration, security, privacy and operations

Host-registered type definitions and schemas are versioned and validated. Effective policy and optional feature settings come from trusted host/Configuration; Publisher does not own their source. Sensitive operations may require phishing-resistant assurance, independent review and separation of duties according to applicable policy. Apply OWASP ASVS 5 L2 (L3 for critical operations), CSRF/origin protection, limited request sizes, URL/asset scheme validation, safe-tree rendering, least-privilege PostgreSQL roles, tenant guards, typed errors, minimised personal data and secrets-free events/diagnostics. Public redirects, feeds, previews, import and export cannot bypass exposure rules.

Apply GDPR/UK GDPR, Online Safety and related duties **only where qualified Legal Compliance determines applicability** for organisation, service, data, jurisdiction and time. Publication of a legal document does not grant compliance. Record purpose-bound erasure/export outcomes and preservation proof, with independently retained Audit evidence as allowed. Operations must expose due-task backlog, outbox lag, stale approval, blocked items, address conflicts, unknown provider status, external withdrawal reconciliation, retention exceptions, degraded dependencies and evidenced recovery. Publisher's documented schema is PostgreSQL-owned; its root contract does not require cookies/browser storage.

## External standards and specialist guidance

| Reference | Use and actual owner |
|---|---|
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) AA; [ATAG 2.0](https://www.w3.org/TR/ATAG20/) | Accessible published views and editing controls; Content Editor/host implement presentation, Publisher checks relevant content constraints |
| [WHATWG HTML](https://html.spec.whatwg.org/), [W3C JSON-LD 1.1](https://www.w3.org/TR/json-ld11/), [schema.org](https://schema.org/) | Semantic host rendering and optional SEO/Metadata projections; never arbitrary unsafe source HTML |
| [BCP 47](https://www.rfc-editor.org/info/bcp47), [Unicode CLDR](https://unicode.org/reports/tr35/) | Locale identifiers, translated variant metadata, dates/language presentation via Localisation/Clock |
| [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110), [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986), [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457), [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562) | HTTP semantics, canonical URLs, optional compatible Problem Details and UUIDv7 |
| [RFC 4287 Atom](https://www.rfc-editor.org/rfc/rfc4287), [RSS 2.0](https://www.rssboard.org/rss-specification), [RFC 9309 robots](https://www.rfc-editor.org/rfc/rfc9309) | Feed correctness and SEO-controlled crawler directives; **robots is not access control** |
| [ActivityStreams 2.0](https://www.w3.org/TR/activitystreams-core/), [ActivityPub](https://www.w3.org/TR/activitypub/) | Optional Federation protocol, **not** mandatory Publisher service |
| [ISO 15489-1](https://www.iso.org/standard/62542.html), [ISO 23081](https://committee.iso.org/sites/tc46sc11/home/projects/published/iso-23081-metadata-for-records.html) | Records lifecycle, provenance and retention metadata; Publisher remains document authority, Audit independently owns evidence |
| [OWASP ASVS 5.0](https://asvs.owasp.org/), [ISO/IEC 27001](https://www.iso.org/standard/27001), [NIST SSDF](https://csrc.nist.gov/pubs/sp/800/218/final) | Security acceptance and assurance guidance, without asserting certification |
| [ISO/IEC 27701](https://www.iso.org/standard/27701), [ICO privacy-by-design guidance](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/guide-to-accountability-and-governance/data-protection-by-design-and-by-default/) | Privacy management aligned with Privacy/Legal Compliance |
| [ISO/IEC 25010](https://www.iso.org/standard/78176.html) | Reliability, security, performance and maintainability acceptance |
| [UK GDPR / Data Protection Act 2018](https://www.legislation.gov.uk/ukpga/2018/12/contents), [Data (Use and Access) Act 2025](https://www.legislation.gov.uk/ukpga/2025/18/contents), [Online Safety Act 2023](https://www.legislation.gov.uk/ukpga/2023/50/contents), [Ofcom](https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/online-safety-regulatory-documents), [public-sector accessibility regulations](https://www.legislation.gov.uk/uksi/2018/952/contents) | Conditional, jurisdiction/service-specific qualified obligations; not universal Publisher settings |

**Applicability:** accepted platform standards first; technical specifications when corresponding outputs are offered; optional federation/structured data only when used; statutes only when legally applicable. None of these references alone proves implementation compliance or certification.

## Genuinely open-source, commercially permissive libraries

**Gate:** complete public source for required functionality, viable commercial use and modification (MIT, Apache-2.0, BSD, ISC or PostgreSQL licence), active maintenance, no essential paid-only features, and source/release/dependency licence/security checks before installation. A public repository or an open core alone is not sufficient.

| Candidate (licence) | Recommendation and scope |
|---|---|
| [Zod](https://github.com/colinhacks/zod) (MIT) | **Keep** documented schema validation; no parallel source of document type authority |
| [PostgreSQL](https://www.postgresql.org/about/licence/) (PostgreSQL) + [node-postgres](https://github.com/brianc/node-postgres) (MIT) | **Keep** owned storage, version checks and transactional outbox; no second database |
| [Ajv](https://github.com/ajv-validator/ajv) (MIT), [Kysely](https://github.com/kysely-org/kysely) (MIT) | Optional only for real JSON Schema interoperability or demonstrated SQL maintainability benefit |
| [unified](https://github.com/unifiedjs/unified), [remark](https://github.com/remarkjs/remark) (MIT) | Conditional Markdown intake, converting to canonical [Rich Text](../../libraries/rich-text/stateless-library-record.md) safe tree |
| [rehype-sanitize](https://github.com/rehypejs/rehype-sanitize) (MIT); [DOMPurify](https://github.com/cure53/DOMPurify) (Apache-2.0 OR MPL-2.0) | Alternative restricted HTML-import sanitisation only, not permission to store unsafe HTML; check exact dependency licence |
| [feed](https://github.com/jpmonette/feed) (MIT), [uuid](https://github.com/uuidjs/uuid) (MIT) | Optional RSS/Atom and UUIDv7 helpers if platform functions do not suffice |
| [Temporal](https://github.com/temporalio/temporal) and [TypeScript SDK](https://github.com/temporalio/sdk-typescript) (MIT); [pg-boss](https://github.com/timgit/pg-boss) (MIT) | **Shared Scheduler/Workflow/Message Queue choices only**, no second Publisher job engine |
| [ProseMirror](https://code.haverbeke.berlin/prosemirror/prosemirror) (MIT), [Lexical](https://github.com/facebook/lexical) (MIT) | Optional **Content Editor** evaluation, not Publisher runtime dependencies |

Do **not** adopt Neo4j, Redis, Elasticsearch or another CMS/document store for Publisher; the owner excludes restricted core-vs-paid offerings. BullMQ Pro and Tiptap paid-only functionality are unnecessary, and CKEditor 5's GPL/commercial arrangement is not the requested permissive model. Validate licence and full-source posture for the *exact version* and all required functionality; conceptual selection is not package adoption or proof of current maintenance.

## GUI and representative host integration

**Publisher is fully headless** under ADR-0009 and its root `CONTRACT.md`: **no Publisher-owned GUI pages, components, styles or message catalogue**. This does **not** mean it lacks the documented optional HTTP API. A host owns the **Publisher** navigation item, page routes and public article rendering; generic [Content Editor](../../presentation/content-editor/presentation-record.md) owns reusable editorial views. [Theme Manager](https://github.com/nuxt-layers/theme-manager/blob/master/CONTRACT.md#screens) and `ui` supply semantic presentation, not publication authority.

**Verified example:** [`nuxt-layers-test/application-test-template`](https://github.com/nuxt-layers-test/application-test-template), `master` tree `8b7b142b84b5ec2379d4e2e727914fe344187d64`: [README](https://github.com/nuxt-layers-test/application-test-template/blob/master/README.md), [`app/app.vue`](https://github.com/nuxt-layers-test/application-test-template/blob/master/app/app.vue) and [`app/pages/admin.vue`](https://github.com/nuxt-layers-test/application-test-template/blob/master/app/pages/admin.vue). It has a separate `/` homepage, `/admin` dashboard, collapsible **Capabilities** sidebar, `/theme-manager` item and Theme Manager styling. A **derived** Publisher test application (suggested `nuxt-layers-test/publisher-test`) would add a **Publisher** item → host-owned `/publisher` and optional `/admin` card; do not modify the generic template merely for this review.

| Logical GUI | Host route / suitable presentation |
|---|---|
| Publisher dashboard | `/publisher`: authorised draft/review/scheduled/published/held counts and pending actions |
| Document library | `/publisher/documents`: search/filter, create/import by authorised type/site/locale |
| Generic editor | `/publisher/documents/:id`, optional `/publisher/new`: safe field/rich-text editing, preview, versioned save |
| Review, approval, scheduling and actions | Document tabs/dialogues or optional filtered review queue; actual Workflow approval and Publisher transitions |
| Revisions, translations, attachments, backlinks | Document tabs with history/conflicts, source-bound locale, live Media eligibility and withdrawal impact |
| Issues/reconciliation | `/publisher/issues` or dashboard queue: held/failed/unknown schedule, outbox and external destination status; authorised links to specialist consoles |
| Public articles/lists/preview | Host-owned public pages and authorised no-store/noindex previews, rendered from safe trees; **not** Publisher GUI routes |

Keep three primary views (dashboard, library, editor); prefer tabs/panels rather than numerous stand-alone pages. Navigation visibility is helpful but **never security**: the host must guard route access, and Publisher reauthorises every action, field and read. Meet WCAG 2.2 AA, keyboard/screen reader support, responsive/mobile, Theme Manager semantic tokens, BCP 47 languages and accessible conflict/unknown-state messages. Draft previews are protected and non-cacheable; noindex alone is not authorisation.

**Test safety:** the shared template is **local-only**, deliberately shows “Not signed in” and uses Theme Manager unauthenticated test mode. Publisher test host must use synthetic data, scoped test-only authorisation and cannot be publicly deployed without real IAM. No test app or implementation UI has been created by this review.

## Conceptual acceptance scenarios

| Input / condition | Required Publisher response |
|---|---|
| Valid type, trusted site/caller, permitted creation | Draft v1 returned; not public |
| Correct current digest approval + applicable policies | Only Publisher commits published revision/address/outbox; downstream may lag |
| Previously approved revision edited or translation becomes stale | Approval invalid; source revision must be rechecked and independently accepted |
| Concurrent edit or retried command | Version conflict or same idempotent result, never duplicate public state |
| Other-tenant, hidden or unauthorised document | Safe not-found/denied according to disclosure policy, no existence leak |
| Due scheduled publication with expired approval/unknown safety result | Remains held/pending/refused and reconcilable; no unintended exposure |
| Revoked, quarantined or unsupported attachment | Asset withheld; parent document not automatically deleted; unsupported image port refuses non-image |
| Moderation/Legal/Privacy restriction or erasure under verified preservation hold | Actual enforced visibility outcome; prohibited deletion refused with minimal evidence |
| External syndication timeout or lost outbox acknowledgement | Local state unchanged; remote/delivery state explicitly unknown and replay safe |
| Logging or Reporting unavailable | Core publish continues when otherwise safe; cannot fabricate diagnostic or report |
| Mandatory high-risk Audit guarantee unavailable | Risk-classified protected operation does not complete without required evidence guarantee |
| Content Editor absent | Headless server operations remain independently usable |
| Test host sidebar displayed with absent IAM | No uncontrolled publisher writes; production must be server-authorised |

## Decision status, implementation gap and handover

**Established (documented/governed):** PUB-E01–E05 — Publisher document master; headless Content Editor separation; trusted caller/site and resource actions, exact-version/digest approval; owned PostgreSQL persistence/outbox; safe public tree/address/feeds, hidden-as-absent semantics. Governing accepted ADRs include 0001, 0002, 0008, 0009, 0011, 0012, 0017 and 0018.

**Owner-approved conceptual:** PUB-A01–A06 (host-registered types, retirement of duplicate Document master, generic Content Editor, domain/legal/moderation and Media authority boundaries, Publisher-owned adopted locale variants under LOC-R06/R07); PUB-01–05; PUB-P01–P05; and resolutions of former PUB-O01–O05. Standards, minimal permissive-library shortlist, error/diagnostic/evidence/report boundaries and host GUI follow these approved directions. **No outstanding conceptual ownership alternative identified.**

**Implementation alignment, not conceptual incompleteness:** independently update and verify the actual Publisher root `CONTRACT.md` and runtime for source/locale candidate acceptance, richer eligibility/policy receipts, public visibility query, typed non-image attachments, explicit idempotency, reconciliation, provider status and required assurance; preserve API compatibility and source authority. Verify 50-line host composition, tenant isolation, authorised previews, outbox replay, time/expiry, safe content, WCAG 2.2 AA, privacy/retention and critical Audit via CI/owner-run acceptance. Record legal jurisdiction and provider-specific guarantees before deployment.

**Review finding:** **Conceptual specification complete** subject to mandatory final current-master / adjacent-PR / docs / Git / CI reconciliation. This finding does not assert implementation readiness, legal compliance or certification. The PR remains draft and **merge is not authorised**.


## Search review — reciprocal conceptual interface (23 November 2026; draft PR #132)

**Status: Search conceptual review complete and owner-approved on 23 November 2026, including source scope, reciprocal contracts and optional presentation; no implemented Search adapter asserted.** Publisher's retrieved root `CONTRACT.md` exposes public published reads, RSS/Atom feeds, sitemap/address reads and committed outbox facts; these are source evidence, not a published Search ingestion function. [Search conceptual contract](../../services/search/services-record.md) defines a replaceable, tenant- and scope-filtered derived index. The originating capability retains authoritative resource and disclosure decisions; Search accepts only minimised revisioned projections, permission/withdrawal evidence and scoped reconciliation, and returns candidate references, qualified freshness/coverage and index-application receipts rather than source finality. All sensitive snippets, suggestions, counts, facets, vector results and caches require visibility-safe query-time filtering; source action/detail requests must be reauthorised. Interfaces are host-composed and directional, with no circular package import. Existing approved decisions remain unchanged; differences must be reconciled before PR #132 merges.

## SEO reciprocal conceptual interface — 23 November 2026 (draft PR #133)

**Proposed SEO-side alignment, not an implemented Publisher contract amendment or change to Publisher's approved source authority.** [SEO conceptual specification](../../services/seo/services-record.md). Publisher remains authoritative for publication, revisions, public eligibility, current/former addresses, `resolvePublisherPath` redirects, rendered head source values and `listPublisherSitemapEntries`. SEO consumes only source-confirmed site/locale/revision/visibility/address evidence to create validated crawler-facing head, canonical, sitemap and robots projections; derived indexability must not expose drafts, withdrawn or erased documents. Host route precedence keeps Publisher-owned redirects intact. The recommended SEO initial scope has **no custom redirect-authoring or serving interface**: Publisher's existing document redirect resolver remains authoritative. A later non-Publisher redirect extension would require separate explicit delegation, collision checks and approval; SEO-05 is owner-approved (23 November 2026) for the initial release: Publisher exclusively owns document-address redirects; SEO has no independent redirect editing/serving surface. Publisher change events invalidate SEO projections but do not authorise public disclosure; reconciliation consults current Publisher source facts. The conceptual GUI relationship follows the same separation: the host may expose an SEO sidebar dashboard and Content Editor may embed a contextual SEO tab that accepts only an authorised Publisher document reference and revision. It reads and edits SEO-owned assignments through SEO's public contract; Publisher still owns the document/editor slot, publication and addresses, and an SEO preview can never make a draft public. These are optional proposed presentation interfaces, not new implemented Publisher methods. The published Publisher root contract does not yet define a final SEO handoff: preserve existing behaviour pending explicit implementation alignment. The handoff should preserve WHATWG HTML semantics and IETF URL/HTTP rules, align Publisher's authoritative source revision with Sitemaps.org `lastmod` and canonical outputs, and never transfer source visibility or redirect ownership to SEO.

## `site-hosting` reciprocal interface — 23 November 2026 (SH-01–SH-06 owner-approved concept; integration unverified; PR #135)

Publisher owns published document revisions, visibility and canonical document addresses. Site Hosting owns verified site hostname/tenant binding, primary/alias status and host change events; changes in domain hosting neither publish drafts nor transfer Publisher's content authority. Host composition supplies verified origins to Publisher, and SEO owns derived redirects and sitemap output. This proposal does not change Publisher's own accepted lifecycle. [Site Hosting proposal](../../services/site-hosting/services-record.md).

## Storage reciprocal interface — 23 November 2026 (STO-01–07 owner-approved concept, PR #136)

Publisher owns document identity, publication, version, references and disclosure; Storage holds only scoped immutable bytes through the source-approved Files interface. Publisher/Media checks access and backlink/retention constraints before storage deletion or delivery; neither public object key nor URL is a durable document identifier. Storage provider uncertainty is propagated as unavailable/pending, not false publication. See [Storage conceptual contract](../../services/storage/services-record.md). STO-01–07 are owner-approved Storage conceptual direction, not a published runtime contract change or completion of this capability's independent review.


## Workflow conceptual review — reciprocal alignment (23 November 2026; draft PR #150)

**Status: Proposed Workflow-side consolidation, not new approval of this neighbouring capability or an implemented integration.** [Workflow's idealised public contract](../workflow/capability-record.md) keeps human review-route definitions, approver eligibility/assignment, delegation and qualified approval evidence with Workflow; each originator retains its own authoritative source record and final decision. Publisher owns content revision, digest and publication; Workflow provides bound approval evidence which Publisher must verify against current digest and eligibility before publishing.

Dependencies are host-composed public ports/events, not private storage or automatic package imports. Resolve concurrent draft changes against latest master before merging.
