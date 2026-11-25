# SEO — Service Record

**Artefact classification:** technical service (CLS-07, owner-approved 24 November 2026); provider-neutral, headless core with optional administration UI. Established Platform responsibility in the governing catalogue, pending governing reconciliation.  
**Status:** Conceptual design complete and owner-approved (23 November 2026); implementation, package exports, runtime conformance and acceptance are unverified. This is **not** a published SEO `CONTRACT.md`.  
**Authority:** [Nuxt Layers governing rules](https://github.com/nuxt-layers/architecture-rules) (accepted ADRs and Capability Standard) prevail. [Publisher's published root contract](https://github.com/nuxt-layers/publisher/blob/master/CONTRACT.md) is implementation evidence; [Site Hosting](../site-hosting/services-record.md), [Metadata](../../capabilities/metadata/capability-record.md) and other unmerged conceptual records are proposed interfaces until independently approved/published. Review maintained in [draft PR #133](https://github.com/nuxt-layers/architecture-blueprint-review/pull/133). Governing baseline checked: `d7f7c2ee051244b8c81325f5ff1267568d99aab1`.

## 1. Purpose and unique ownership

SEO governs **search-engine presentation and crawler discovery of resources that their own capabilities have already approved for publication**. It owns versioned SEO assignments and site-level search policies; validated indexability and canonical/alternate *projections*; crawler-facing head descriptors, XML sitemaps, `robots.txt`; derived structured-data projections; generation/reconciliation state, source-specific feedback and committed SEO change events. SEO operates natively without a search provider, analytics service or GUI.

**Unambiguous ownership:** Publisher owns documents, publication and withdrawal, revision, actual current/former document URLs, source head information, its `resolvePublisherPath` redirects and `listPublisherSitemapEntries`. Site Hosting owns verified domain/site bindings and primary origins; the host owns route mounting/ingress. Other resource owners control their public eligibility. Metadata owns vocabulary and fact assignments; Localisation owns translations; Media owns asset rights; Search owns internal search indexes; Reporting owns derived analytics; Audit owns evidence custody; Logging owns technical diagnostics. SEO does not publish content, own URL or domain identity, assign resource access, own Redirect records or guarantee crawling, rich results, ranking or indexing.

**Agreed SEO-05:** No custom redirect editor, redirect-authoring API, serving route or `SeoRedirectChanged` event in SEO's initial release. Publisher owns document redirects; Site Hosting/host owns domain/ingress routing. A new narrowly delegated non-Publisher redirect capability would require a separate owner decision. An SEO dashboard may show *read-only* Publisher redirect diagnostics through Publisher's authorised contract.

## 2. Native information model and lifecycle

| SEO-owned record or projection | Essential meaning |
|---|---|
| Site policy | Tenant/site-qualified approval, origin reference, crawler/robots and index defaults, sitemap limits, locale/canonical presentation rules, revision and effective time. Privacy, source visibility, legal and security floors cannot be relaxed. |
| Resource SEO assignment | Qualified source owner/resource/site/locale and revision; approved search title/description, robots directive, canonical *proposal*, preview references, selected Schema.org projection, approval status, provenance, expiry and version. This is **not** a second publication or address master. |
| Generated public artefacts | Head descriptors, canonical/hreflang links, sitemap/index, robots directives and public JSON-LD; source/site revision, creation time, freshness, completeness, suppressed/unknown status. These are rebuildable outputs, not authoritative content. |
| Rebuild and reconciliation state | Source cursor, invalidation reason, idempotent job/attempt, generated artefact revision, error/unknown outcome, bounded retry, repair and optional provider submission state. |

SEO assignment lifecycle: `draft → validated → approved → active → superseded/withdrawn`; invalid/conflicting decisions remain rejected or pending. Artefacts move `pending → generated → served` or `failed/stale/suppressed`. The source owner's publication/visibility and Site Hosting's active verified origin **always take precedence**. A removed/restricted/unknown source cannot be restored to public output through a cached SEO override. Events indicate something *may* have changed: SEO rechecks the authoritative source before public release. Required unavailable authority fails closed; optional enrichment/provider failures allow only a safe, already-authorised minimal presentation. Store minimal permitted evidence, follow retention/erasure and make regeneration deterministic and bounded.

## 3. Planned public input contract

These are **logical interface categories**, not implemented endpoints or TypeScript exports. Every operation carries the necessary trusted tenant/site, source identity/revision, caller/authorisation, correlation, effective time, idempotency, version and provenance. Reject cross-tenant, stale and contradictory input without leaking hidden resource existence.

| Provider → SEO | Supplied input and required handling |
|---|---|
| **Host and Site Hosting** | Trusted request-site mapping, verified active primary/alias origin, binding revision, domain suspension/transfer; without authoritative origin, suppress absolute public URLs. Untrusted `Host`/forwarding headers confer no site authority. |
| **Publisher / other public resource owner** | Site-qualified visible resource, current canonical address intent, public source head values, revised/modified time, locale, withdrawal/deletion and committed publication/address events. The owner decides eligibility; SEO revalidates before output. Publisher's existing reads and redirects are preserved. |
| **Authorised SEO caller / Configuration** | Propose/validate/approve/withdraw an SEO assignment; set site-level rules; request rebuild/reconciliation or optional provider submission. Validate permissions, step-up, version preconditions, approval and idempotency. Return committed, pending, rejected, conflict or unknown accurately. |
| **IAM, Privacy, Legal Compliance** | Trusted caller/site access and applicable security, legal disclosure, retention and provider-sharing restrictions. Missing mandatory decisions fail closed. |
| **Metadata, Localisation, Media** (optional) | Approved, public-safe source facts and vocabulary, confirmed public translations/alternate URLs, licensed public image references. Validate factual authority, source visibility and freshness; do not infer publication from a semantic assignment. |
| **Clock, Scheduler, Message Queue and persistence ports** | Time semantics, scheduled rebuilding and committed event transport. SEO owns state/outbox and deduplication; transport neither owns SEO events nor proves public eligibility. |
| **Integrations** (optional) | Authorised verified webmaster/search provider property and quota, submission acknowledgement, errors/observations and credential context. Credentials remain with authorised integration/host; timeout is **unknown**, not automatic failure or indexing proof. |

## 4. Planned public output contract

| Consumer ← SEO | Output and limits |
|---|---|
| **Host renderer / Publisher composition** | Effective, validated SEO title/description, robots/index directives, canonical/alternate links, Open Graph and eligible JSON-LD with source revision and freshness. Host resolves overlaps with Publisher's existing head output once, using Publisher as safe fallback when SEO is absent. Previews are private and `noindex`. |
| **Host crawler routes** | `getSitemap`-style XML and sitemap indexes, `getRobots`-style text and safe status, based on public eligible resources and verified origins. Host mounts **one** authoritative route per endpoint; SEO has no redirect-serving route. |
| **SEO administration / Content Editor** | Authorised list/detail/preview/validation, approved site settings, SEO issue and rebuild status, source-owner reference, revision conflict and change receipt; no source content mutation. |
| **Publisher / other source owners** | SEO validation, effective projection status, invalidation and generation outcomes with owner/revision references, never publication or routing commands. |
| **Message Queue / subscribed consumers** | Committed, versioned `SeoAssignmentChanged`, `SeoDirectiveChanged`, `SeoProjectionInvalidated`, `SeoArtefactBuilt` (illustrative) from an **SEO-owned durable transactional outbox**; qualified source/site/revision, event ID, correlation and time. At-least-once; duplicate/reordered delivery expected. |
| **Integrations** (optional) | Explicitly approved sitemap submissions/status queries; `queued/submitted/acknowledged/failed/unknown` are provider-processing states, **not indexed/ranked**. |
| **Error Normalisation, Logging, Audit, Reporting, Observability** | Distinct pure error handling, technical diagnostics, accountable evidence, authorised business facts and performance measurements, as specified below. |

**Commands** mutate SEO state subject to permission, expected revision, idempotency and durable result; **queries** reveal only authorised source-qualified facts, completeness and as-of status; **events** follow committed SEO decisions and must be independently reconcilable after delayed/lost transport. Responses distinguish `confirmed/pending/stale/suppressed/unsupported/failed/unknown` as applicable. An event receipt, HTTP success or timeout never independently proves a business or remote-provider outcome. Contract types and version/compatibility rules belong in the future published root `CONTRACT.md`; avoid circular imports with Publisher, Site Hosting or host.

## 5. Cooperating capability contracts

| Capability | Required input to SEO → information supplied back | Obligation |
|---|---|---|
| Publisher | Verified public resource/address/status/revision and change events → validated SEO head/sitemap information, issue feedback and regeneration status | Required for Publisher content; Publisher keeps redirects, documents and actual addresses. |
| Site Hosting | Active verified domain/primary origin and binding changes → canonical/sitemap/robots projections | Required to serve absolute public artefacts; domain changes invalidate projections. Its conceptual interface remains subject to separate review. |
| Metadata / Localisation / Media | Approved factual metadata, live translations, eligible assets → semantic head/JSON-LD, hreflang and public preview validation | Optional/conditional; missing or revoked data simply removes that enrichment. |
| Configuration / IAM / Authorisation / Privacy / Legal Compliance | Site settings, trusted caller/assurance, access and applicable restrictions → effective scoped SEO settings/status and qualified evidence | Mandatory where applicable; no security floor can be disabled. |
| Search | No essential inbound dependency → optional source-verified public metadata and invalidations | Search separately validates permissions for internal indexes. |
| Scheduler / Clock / Message Queue | Trusted time, bounded scheduling, delivery of committed source events → SEO rebuild jobs, outbox facts, reconciliation | Host-composed ports; SEO owns decisions and state. |
| Integrations | Qualified optional provider connection, receipts and errors → authorised submission commands and known/unknown state | No paid provider or remote API required for native operation. |
| Content Editor / UI / Theme Manager | Editor context, accessible controls and semantic styling → SEO panel and dashboard via public contracts | Optional presentation; host owns shell and navigation. |
| Logging / Audit / Reporting / Observability | Accepted public intake, authorised read and health interfaces → SEO-safe diagnostic/evidence/analysis/metric submissions | Each owns its own store and derived service; none becomes SEO's source of truth. |

### SEO error, diagnostics, accountable evidence and analytical reporting — public contract

| Partner | SEO sends (input) | SEO or authorised reader receives (output) |
|---|---|---|
| **`error-normalisation` pure library** | Versioned SEO-owned validation, build, policy or provider error plus approved mapping, known/uncertain source outcome, disclosure allowlist and trusted correlation | Stable safe code, category, message key, separate public/technical projection and **advisory** retry classification. It has **no state, network, events, logging, audit or retry side effect**. |
| **Logging** | Small structured redacted generation/validation/provider diagnostics, code/severity, duration and correlation | Qualified accepted/rejected/throttled/unavailable/uncertain intake, protected log query and loss/backlog/sink status. Receipt is **not** business or Audit proof. |
| **Audit** | Risk-selected source assertions: significant site-wide indexability/robots change and approval, access denial, privileged settings/provider operation, protected export. Include trusted actor/assurance, site, operation, known/uncertain outcome, source revision/event ID, time and correlation | Separate accepted/pending/rejected/uncertain evidence receipt, provenance, integrity/coverage and authorised redacted history. Mandatory evidence requires a durable approved capture/reconciliation path or protective denial; it cannot be replaced by Logging. |
| **Reporting** | Authorised revisioned facts with site/tenant, cutoff, denominators, completeness, suppressed/eligible public coverage, metadata/structured-data issues, sitemap rebuild/freshness and provider submission *state* | Authorised report definitions/execution/export and qualified coverage/quality trends, freshness, omissions and source cutoff. Reporting cannot claim ranking, search traffic or actual external indexing from these facts. |
| **Observability** | Bounded latency/health/metric/trace attributes with safe correlation | Independent technical measurements and alerts, not a second log, Audit register or SEO rule owner. |

These calls are **independent public integrations**; the error helper does not dispatch to the others. Ordinary Logging/Reporting unavailability does not undo a committed SEO change. Mandatory Audit capture follows approved risk policy. Avoid raw credentials, hidden page titles, private resource identifiers, untrusted provider text and cross-tenant aggregates in all outputs.

## 6. Standards and legal baseline

**Owner-approved conceptual standards hierarchy:** accepted governing security/accessibility and applicable law set minimum requirements; established interoperable web specifications define formats; search-provider instructions are **optional, changeable guidance**, never universal standards.

| Authority | SEO requirement |
|---|---|
| [WHATWG HTML](https://html.spec.whatwg.org/multipage/) | Semantic, safely escaped server-rendered head, `title`, `meta`, canonical and alternate link elements. |
| [IETF RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html) | Correct robots exclusion syntax/groups; **robots cannot enforce access control or deindexing**. |
| [Sitemaps.org](https://www.sitemaps.org/protocol.html) | Valid absolute eligible URLs, XML escaping, evidence-based `lastmod`, 50,000 URLs / 50 MB uncompressed per file, partition/index as needed. It is an industry protocol. |
| [IETF RFC 3986](https://www.rfc-editor.org/rfc/rfc3986.html), [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html), [RFC 8820](https://www.rfc-editor.org/rfc/rfc8820.html), [WHATWG URL](https://url.spec.whatwg.org/) | Safe URL/IDNA handling, canonical origin from Site Hosting, preservation of Publisher's HTTP response and redirects; no competing URI owner. |
| [W3C JSON-LD 1.1](https://www.w3.org/TR/json-ld11/), [Schema.org](https://schema.org/) | Valid public structured data from source-confirmed facts; Schema.org is a collaborative vocabulary, not proof of a Google rich result. |
| [IETF BCP 47](https://www.rfc-editor.org/info/bcp47/), Unicode CLDR | Locale tags and reciprocal source-confirmed `hreflang` links; no draft or unconfirmed translation discovery. |
| [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/), ISO/IEC 40500:2025 | Accessible keyboard/screen-reader/responsive administrative presentation, light/dark contrast and semantic markup. |
| [OWASP ASVS 5](https://asvs.owasp.org/) | Governing security L2 baseline and applicable L3 controls for sensitive operations. |
| UK GDPR / Data Protection Act 2018, [ICO privacy by design](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/guide-to-accountability-and-governance/data-protection-by-design-and-by-default/), Equality Act and public-sector accessibility regulations | Apply qualified jurisdiction/processing obligations through Privacy/Legal Compliance. Standards adoption is not certification or automatic legal compliance. |
| [Google Search Central](https://developers.google.com/search/docs/essentials), [Bing](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a), [IndexNow](https://www.indexnow.org/documentation), [Open Graph](https://ogp.me/), [Core Web Vitals](https://web.dev/articles/vitals) | Treat provider guidance, optional discovery notification, social preview and UX metrics as **distinct** from formal specifications. No guaranteed crawl, indexing, ranking or traffic. |

## 7. Fully open-source library strategy

**Owner-approved selection strategy, not package adoption.** All *required* behaviour must use fully publicly accessible community source with commercially permissive licences, no delayed-source/proprietary core, paid feature gates or required SaaS. Validate exact version, transitive licences/NOTICE, advisories, maintenance and compatibility with Node 26, TypeScript 6 and Nuxt 4 before implementation. Do not install libraries simply because they are available.

| Candidate (source / licence) | Preferred role and restriction |
|---|---|
| [Unhead](https://github.com/unjs/unhead) — MIT | **Preferred:** reuse the host's existing head management, not a second renderer; SEO supplies validated descriptors. |
| [sitemap.js](https://github.com/ekalinin/sitemap.js) — MIT | **Preferred:** framework-neutral XML generation behind SEO-authorised URL and policy checks. |
| [schema-dts](https://github.com/google/schema-dts) — Apache-2.0 | **Preferred:** Schema.org types; cannot establish factual truth or runtime safety. |
| [Ajv](https://github.com/ajv-validator/ajv) — MIT | Conditional JSON Schema validation **only** if existing host validation is insufficient. |
| [parse5](https://github.com/inikulin/parse5) — MIT | Optional HTML conformance inspection, preferably in development/CI, not runtime scraping. |
| [`@nuxtjs/robots`](https://github.com/nuxt-modules/robots), [`@nuxtjs/sitemap`](https://github.com/nuxt-modules/sitemap), [nuxt-schema-org](https://github.com/harlan-zw/nuxt-schema-org) — MIT | **Optional alternative** Nuxt presentation adapters; must not register conflicting routes, independently discover hidden URLs or own policy; use either sitemap.js **or** an equivalent sitemap module as primary generator. |
| Native WHATWG URL and small tested robots formatter | **Preferred over extra dependencies** for basic parsing and `robots.txt` generation. |

[`@nuxtjs/seo`](https://github.com/harlan-zw/nuxt-seo) itself has a publicly available MIT module and is a useful reference; its separately commercial Pro offering is not a required part of this design. **Do not install the umbrella** as native SEO authority because its bundled sitemap, robots, site settings and other modules can duplicate Publisher, Configuration, Site Hosting and SEO. Do not adopt the archived Nuxt 2 sitemap module or add an old standalone robots parser / C++ runtime parser without demonstrated need. No Redis, Neo4j, Elasticsearch, commercial crawler service or new mandatory database is required.

## 8. Security, privacy, performance and failure handling

Enforce trusted site/tenant isolation in state, caches, routes, provider connections, reports and previews. Protect against host-header spoofing, IDNA ambiguity, SSRF/rebinding, unsafe URL schemes, XSS in rendered metadata/JSON-LD, XML injection, path traversal, public leak of unpublished records, provider-credential exposure, cache poisoning, redirect-loop *observation* and crawler-driven load exhaustion. Robots and `noindex` are signals to crawlers, **not** access controls or guaranteed deletion. Withdrawn content requires source-owner response/corrective policy, SEO suppression and cache invalidation. Bound sitemap size, task concurrency, retries and provider quotas.

Use cached **revision-qualified** public artefacts where disclosure remains safe and promptly invalidate on source withdrawal, domain revocation or permission restriction. Do not serve stale permissive metadata after a protection change. Isolate external provider outages from safe native page rendering. Preserve source-versus-receipt time, uncertain provider state, failure classification, per-site freshness and authorised recovery. Protect private previews with server-side authorisation, `no-store` and `noindex`; public admin pages must never leak source content or hidden counts. Report performance and health through Observability/Reporting without making SEO own host rendering or asserting external search rank.

## 9. Optional GUI and host composition

**Headless core mandatory; administration optional.** [`nuxt-layers-test/application-test-template`](https://github.com/nuxt-layers-test/application-test-template/blob/master/README.md) demonstrates a public `/` home, `/admin` test workspace, shared top bar, collapsible/mobile sidebar and Theme Manager's Appearance menu and `/theme-manager` route. A host sidebar **SEO** item opens a scoped dashboard (illustrative production `/seo`, derived-test `/admin/seo`); actual mounting and menu belong to the host and must be configurable. Theme Manager supplies semantic tokens, not a second theme system. **Its local unauthenticated test mode is not suitable for production** and its current published contract flags a composition gap; the SEO proposal does not imply that gap is resolved.

| Screen | Function and source contract |
|---|---|
| **SEO dashboard** | Site-qualified metadata coverage, valid/suppressed public resource counts, sitemap freshness, issues and last update; accurate as-of and unknown states. |
| **Page SEO** | List authorised Publisher/other public resource references; edit/review/approve SEO-owned titles, descriptions, canonical proposals, robots directives and Open Graph; source revision conflict and private noindex preview. |
| **Sitemaps & crawling** | View sitemap/index partitions, `robots.txt`, generation, source withdrawal and retry/rebuild state. **Read-only Publisher redirect cross-link**, never SEO redirect editing. |
| **Structured data & languages** | Preview/validate authorised Schema.org JSON-LD, media, `hreflang` and canonical consistency; do not edit source Metadata/Media/Localisation. |
| **Site SEO settings** | Scope/site policy, permitted crawler directives, sitemap limits, approval and activation status, with step-up where required. |
| **Operations & providers** | Reconciliation, rebuild jobs, optional provider submission/unknown status, safe Retry, contextual links to authorised Logging, Audit and Reporting views; no duplicate explorers or unsupported rank claims. |

**Contextual integration:** Optionally show an SEO tab/panel inside [Content Editor](../../presentation/content-editor/presentation-record.md), supplied only an authorised Publisher document/site reference and revision. The panel calls SEO's **public** commands/queries, never private storage; Publisher still owns content, publication and addresses. Without Content Editor, the SEO dashboard works independently; without SEO UI, native serving still works. No admin navigation appears on public reader pages.

**Access/presentation:** illustrative actions `seo.view/edit/approve/site-policy/rebuild/provider-manage/view-operations` require server-side permission, tenant and assurance on each API and deep link; names and risk requirements need final root contract. Viewer, editor, approver, operator and provider administrator remain distinct. High-impact site-wide indexing policy requires freshness/independent approval where policy demands. Use WCAG 2.2 AA, responsive UI, keyboard focus, accessible statuses, i18n/Clock dates, semantic Theme Manager tokens, source-of-truth links, clear empty/pending/unknown states and no private data in browser telemetry. Support `presentation: false` and a single host-wired composition operation within ADR-0012's 50-line budget, no duplicate routes.

## 10. Conceptual acceptance criteria

| Scenario | Required result |
|---|---|
| Verified site + current public Publisher item | Valid, eligible head and sitemap output with confirmed origin/source revision; Publisher keeps canonical content/address and redirect authority. |
| Draft preview, withdrawal, deletion or restricted visibility | Private/noindex preview if authorised; public sitemap, JSON-LD and head suppress hidden content promptly; no stale permissive cache, resource-enumeration or redirect disclosure. |
| Domain primary transfer, alias removal or revocation | Recompute/suppress absolute canonical, sitemap and `hreflang`; no invented origin. |
| SEO assignment/version conflict or denied policy edit | Safe normalised error, no unauthorised change; independently audited denial where required. |
| Replayed/lost/out-of-order Publisher/SEO event | Deduplicate; reconcile authoritative source revision; SEO-owned outbox preserves committed changes and qualified gaps. |
| Sitemap/robots/JSON-LD/locale validation failure | Safe errors, accurate generation status, protected diagnostic, valid bounded outputs and source-preserving fallback. |
| Missing optional Metadata, Localisation, Media, provider or GUI | Safe basic native SEO remains functional; optional controls/enrichments absent, not silently fabricated. |
| Search provider submission timeout/receipt | Unknown or acknowledged submission; no claim of indexing, rank or rich results. |
| Logging down, Audit mandatory, Reporting delayed | Technical diagnostic outage does not undo SEO commit; mandatory Audit follows durable/deny policy; reports disclose cutoffs and incompleteness. |
| Test-template host with SEO menu and Content Editor | Scoped sidebar dashboard, optional editor tab, valid accessible mobile/light/dark operation, independent server permissions, Theme Manager styling and no SEO redirect editor. |
| Presentation disabled | No SEO admin pages or sidebar entries; headless metadata, sitemap and robots still available. |
| New dependency adoption | Only full public permissive source, verified version/dependencies/security compatibility, no required proprietary SaaS, no duplicate route owner or package cycle. |

## 11. Decision status and completion boundary

**Owner-approved conceptual directions (23 November 2026):** **SEO-01** independent Platform, headless native service and optional GUI; **SEO-02** SEO-only public metadata/robots/sitemap presentation and source-authoritative Publisher/other owners; **SEO-03** fail-closed source eligibility, domain and privacy; **SEO-04** durable committed SEO outbox, qualified provider state and reconciliation; **SEO-05** Publisher owns all document redirects and SEO has no own redirect surface in its first release. The standards baseline, fully open-source minimal dependency strategy, distinct error/Logging/Audit/Reporting contracts and shared-host sidebar/Content Editor GUI direction were subsequently approved. Approval covers **conceptual design**, not actual exports, implementation, conformity certification or a merge.

**Conceptual completeness:** purpose, unique ownership, information model, lifecycle, public inputs/outputs, commands/queries/events, errors, cross-capability relations, provider neutrality, standards, security/legal, optional GUI and representative acceptance are specified. **No further substantive owner choice is required for the initial SEO scope.**

**Implementation alignment remains:** publish and verify a self-contained `nuxt-layers/seo/CONTRACT.md`, actual root exports and versioning; settle Publisher `head` and sitemap handoff/field precedence with an optional host-wired port, preserve `resolvePublisherPath`; agree current active-origin input with separately reviewed Site Hosting; verify minimal-host ADR-0012/0016 composition, outbox, persistence, tests, licence/NOTICE and Node/TS/Nuxt release compatibility. Do not confuse these with unapproved new ownership. The Publisher root contract was inspected; an SEO root contract and executable acceptance have **not** been verified.

**Review and merge:** Keep [PR #133](https://github.com/nuxt-layers/architecture-blueprint-review/pull/133) open pending comparison with updated blueprint `master`, concurrently modified reciprocal records, full-link/diff review, protected checks and explicit owner authorisation for squash merge. No implementation repositories were edited, builds/tests run or merge performed. Git history preserves earlier proposals; this record is the **current** specification, not a sequence of historical notes.

## `site-hosting` reciprocal interface — 23 November 2026 (SH-01–SH-06 owner-approved concept; integration unverified; PR #135)

`site-hosting` supplies source-owned verified exact-host site origins, primary host/alias changes, activation and withdrawals with revisions; SEO may derive site-host-aware redirect/sitemap/search projections, but must not verify host ownership or treat DNS/cert readiness as Publisher publication. Publisher owns canonical document addresses/public visibility, SEO owns search-engine projections and Site Hosting owns host mappings. Concurrent [SEO draft PR #133](https://github.com/nuxt-layers/architecture-blueprint-review/pull/133) is provisional and must be reconciled before merging. [Site Hosting proposal](../site-hosting/services-record.md).
