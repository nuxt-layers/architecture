# Rich Text — Stateless Library Record

**Name:** `rich-text`  
**Classification:** Framework-independent **stateless library**, not a responsibility-owning capability, Nuxt layer or service.  
**Status:** Agreed architecture under accepted ADR-0011 and the normative Capability Standard. This record is a conceptual reconciliation of a **documented, not independently tested** implementation contract; it is not a claim of runtime acceptance.  
**Canonical implementation repository:** [`nuxt-layers/rich-text`](../../../RESOURCES.md#ref-19783b8e).  
**Authority:** [Accepted ADR-0011](../../decisions/ADR-0011-shared-rich-text-and-configurable-copy.md) and [Capability Standard](../../capability-standard.md).  
**Review:** Draft conceptual PR #104; previous library relocation #102 and standardisation #103.

## Purpose, authority and exclusions

Provide a single restricted Markdown dialect, declared field profiles, deterministic normalisation, validation, a safe structured content tree and discoverable format rules for callers that expressly support **formatted** text. The format is CommonMark with GFM tables/strikethrough, subject to the accepted profiles. A plain name, title, label or other unformatted field stays a normal length-bounded string and ordinary form control.

The library owns only **format syntax and deterministic transformation rules**, not content, documents, document identifiers, permissions, tenants, moderation decisions, configuration values or operational evidence. It has **no durable records, domain decisions, lifecycle, storage, outbox, events, provider ports, background jobs, routes, screens, independent GUI or host composition call**. It cannot publish, approve, retain, disclose, authorise or attest content. It **never emits rendered HTML**. The source owner validates every save on the server, controls its own revisions/lifecycle and authorises operations. `ui` (or the consuming host) draws the safe tree; `content-editor` optionally edits formatted fields. A capability may import the package without treating it as another capability.

## Public inbound contract — published functions and conceptual meaning

The existing [root implementation `CONTRACT.md`](../../../RESOURCES.md#ref-81a9491d) documents these exports; their actual execution was not tested in this review.

| Function or input | Caller supplies | Expected interpretation / failure |
|---|---|---|
| `richTextSchema({ profile, max })` | Declared formatted-field profile and maximum source length | Zod string schema normalises and checks source; invalid declaration or invalid text fails validation; maximum supported length is `RICH_TEXT_MAX_LENGTH` (1,000,000) |
| `normaliseRichText(source)` | Source Markdown string | Unicode NFC and LF line endings; normalise before standalone checks |
| `checkRichText(source, { profile, max })` | **Normalised** source, supported profile and field maximum | Detect profile violations, unsafe characters and length issues before a save; check is not an authorisation decision |
| `parseRichText(source, profile)` | Source string and supported profile | Produces safe `RichTextNode[]` for reading, including degradation of unsupported syntax to text; **reading tolerance never permits storing rejected input** |
| `richTextFields(schema)` | A caller's Zod schema | Discover formatted field path, profile and maximum, including nested array path notation; plain strings excluded |
| `richTextFieldSchema`, `richTextTreeSchema`, `richTextNodeSchema` | Field declaration or externally received tree | Validate metadata and tree shape; maximum declared tree depth `RICH_TEXT_MAX_DEPTH` (64) |
| `safeHref(href)` | Candidate link destination | Report whether the format keeps a link; does not certify destination integrity, permission or trust |
| Public format/profile constants and types | Package consumers | Declared supported syntax, schemes, limits and stable structural shapes; use documented package-root exports, not private internals |

**Profiles:** `inline` permits a single paragraph's emphasis, strong, links and line breaks; `block` adds headings, lists and quotations; `document` additionally permits tables, strikethrough, code, rules, `asset:` images and `doc:` links. Every formatted field declares **both** a profile and maximum source length. Disallowed constructs are refused at save time even where tolerant reading represents them as text. Raw HTML is always text.

**Links:** the published format permits credential-free `https:`, `mailto:`, site-relative `/path`, `doc:<uuid>` and `asset:<id>` for images with alt text. Unsafe/unsupported schemes such as `javascript:`, `data:`, `http:` and protocol-relative links are not activated. **A safe syntax is not proof that a referenced page, document or asset is authorised or available.** Owning capabilities/hosts must resolve references through their authorised public contracts.

## Public outbound contract

| Output | Consumer and permitted conclusion | Provenance, authority and limitations |
|---|---|---|
| Normalised Markdown source / Zod validation result | Source-owning capability, form integration | Deterministic format check only; owner still authorises, versions and persists |
| `RichTextCheck`: `problems`, `outside`, `documentIds`, `assetIds` | Owners/editors; identify invalid source, disallowed syntax and references requiring independent resolution | Diagnostics and extracted identifiers **do not** establish reference existence, safety, ownership or permission |
| `RichTextNode[]` safe tree | `ui`, host, authorised export consumer | Structured non-HTML tree; it is not a publication or disclosure permission. Text values are always rendered as text |
| `richTextFields` descriptors | `content-editor`, generic schema-driven forms | Paths, allowed profile and maximum are UI hints; server retains enforcement |
| Field/tree schemas, profiles, types, constants | Consumers implementing parsers, viewers and validation | Versioned compatibility boundary; no implicit widening of supported format |

**Published problem codes:** `too-long`, `unsafe-characters`, `not-in-profile`, `more-than-one-paragraph`, `image-without-alt`, `image-not-asset`. Consumers map codes to their own localised messages; do not interpolate rejected untrusted source into diagnostics, logs or HTML. Unexpected inputs, malformed declarations, unsupported versions and failed schema validation must return or surface explicit typed/validated failure via the owning caller. The current root contract documents actual named exports but **does not document a separate format version negotiation API**; future interoperability/version negotiations are an implementation-alignment matter, not a shipped feature.

## Processing and safety invariants

1. **Save path:** owning capability chooses field profile/maximum from its authoritative schema; receives untrusted source; normalises/checks on the server; checks caller and operation authorisation, tenant isolation, content policy, references, revision preconditions and any required external decisions; then alone accepts/persists the revision and emits domain events/outbox where warranted. A `rich-text` check cannot bypass any of those gates.
2. **Read path:** owner authorises scope/disclosure and supplies content for parsing; `rich-text` yields a safe tree; `ui` or host safely renders only recognised node kinds, never raw node text as markup. Consumer revalidates externally supplied trees. A missing/withdrawn `doc:` or `asset:` reference is resolved or withheld by the owner, never guessed by this library.
3. **Limits:** bound source length and tree depth; reject forbidden characters and over-profile constructs for saving. `parseRichText` is documented never to throw and may present unsupported/deep syntax as text, which is different from the save-time validation rule. Do not claim computational resource limits beyond the documented bounds without evidence.
4. **Statelessness:** same inputs and library format version have equivalent output independent of caller, tenant, time, network or hidden configuration. No retries, idempotency keys, background recovery or provider failures exist inside the library; callers handle concurrent revisions and external failures.
5. **Versioning:** document source dialect, tree compatibility, declaration/profile changes, public problem codes and migrations in `CONTRACT.md` and release metadata. **Widening permitted syntax or loosening a profile requires a new ADR** (ADR-0011); tightening is a breaking change requiring consumer compatibility review. Existing stored documents must not be silently reinterpreted under a new policy.
6. **Assurance:** syntactic safety does not perform phishing detection, URL reputation, sensitive-data classification, copyright/legal analysis, malware scanning, moderation or access control. Editors and displays remain subject to WCAG 2.2 AA, localisation and Theme Manager semantics at the presentation boundary.

**Page Builder (approved PB-01–16 and STD-PB-01–07):** [Page Builder](../../presentation/page-builder/presentation-record.md) supplies text/field profile and validation context and consumes validated safe trees; preserve accessibility metadata during composition/import/export. No new rich-text format, implicit trust of template output or reverse dependency.

## Cross-capability relationships and reciprocal public interfaces

| Partner | Information supplied **to** Rich Text | Output received / who remains authoritative | Dependency |
|---|---|---|---|
| `publisher` | Markdown, declared schema/profile and max | Validation diagnostics and safe trees; Publisher owns document, references, revisions, permissions, publication and outbox | Package use for formatted fields; no reverse dependency |
| `profile`, `configuration`, other domain owners | Their formatted-field sources and declarations, if adopted | Same format/validation; source owners retain values, policy, persistence and tenancy | Conditional package use; adoption per owner contract |
| `content-editor` | Source being edited; profile, maximum and schema-derived descriptors | Allowed formatting controls and validated edit intent; editor owns no stored document or approval | Consumer package use, no library dependency on editor |
| `ui` / host | Safe-tree output from a permitted source, including validated external trees | Accessible rendering; viewer/host resolves links, media, locale and Theme Manager styles | Consumer-only |
| `export` | Authorised safe tree, selected format and caller-supplied options | Export library makes output bytes; source owner controls disclosure, retention and delivery | Consumer-only; no durable file in Rich Text |
| `media` / asset provider, source domain | No direct provider interaction | Host resolves `asset:` and `doc:` references under independent access checks | Via caller only |
| `content-security` / `moderation` | No mandatory bidirectional call | Domain owner may seek additional safety verdicts/case decisions independently of format validation | Optional owner orchestration only |
| `authorisation`, `audit`, `logging`, `reporting` | No runtime library calls required | Owning capability enforces permissions, produces accountable audit evidence, emits bounded operational logs and supplies authorised reporting data. Rich Text creates none | No direct runtime edges |

There is **no** mandatory dependency on Identity, Clock, Configuration, Scheduler, Workflow, Message Queue, external integrations or infrastructure from within `rich-text`. These may matter to the **owning capability**, not to a pure parse/check library. The platform's publisher/editor/UI/export edges must remain directional, public and acyclic.

## Presentation and GUI

**No Rich Text dashboard, sidebar menu, admin screen, setting, route or independent GUI is justified.** The representative host (`nuxt-layers-test/application-test-template`) may expose *Content Editor* from its sidebar and display formatted-field tools contextually. The field editor restricts controls to the declared profile; a normal `textarea` is also valid. `ui`/host renders safe-tree previews and views. Host navigation, theme, i18n, responsive layout and keyboard/screen-reader accessibility belong to those presentation owners. A Rich Text test/demo page, if ever added, is not a production-facing library screen.

## Conceptual acceptance cases (not locally run tests)

| Input / context | Expected result and output | Authority |
|---|---|---|
| Plain title/name | Normal string; no Rich Text profile or parser use | Field-owning capability |
| Inline source with emphasis and valid `https:` link | Normalised source accepted; safe phrasing tree | Rich Text syntax; owner save decision |
| Inline heading/table or multiple paragraphs | `not-in-profile` or `more-than-one-paragraph`; save refused | Rich Text check; owner |
| Document image without alt or without an `asset:` target | `image-without-alt` or `image-not-asset`; save refused | Rich Text check; owner |
| Unsafe link scheme, raw HTML or forbidden characters | Unsafe destinations are not activated; raw HTML is inert text rather than executable markup; forbidden characters cause a save validation problem. Do not confuse rendering safety with permission to save. | Rich Text + owner |
| CRLF source before direct check | Caller normalises first or uses `richTextSchema`; direct check on unnormalised input may flag characters | Library/owner |
| Valid syntax, unauthorised tenant or stale revision | No committed change despite successful format check; source returns denied/conflict | Owning capability |
| `doc:` or `asset:` reference to withdrawn/private resource | Extracted reference is not authority to disclose; host/owner resolves or withholds it | Referenced owner |
| Missing optional editor/export/safety provider | Library parse/check remains available; optional feature disabled/fails in caller's own contract | Caller |
| Repeated parsing and read of over-depth syntax | Deterministic bounded safe tree; unsupported/deep constructs treated as text, no implicit save permission | Library |
| Required format widened or existing public behaviour narrowed | Explicit architectural approval/compatibility process before change, no silent migration | Governance and package owner |

## Review decisions and evidence status

- **Established/accepted:** ADR-0011, Capability Standard; library classification, three profiles, no HTML output, per-field save validation, contextual editor, separate renderer and no stored library state.
- **Documented but not executed here:** implementation root `CONTRACT.md` names API exports, problem codes, concrete dialect and hard limits; runtime behaviour, package builds, automated tests and cross-consumer integration are **unverified**.
- **Agreed earlier:** canonical stateless library record classification and location through merged PRs #102/#103.
- **Proposed in draft #104:** this detailed contract alignment and reciprocal notes, pending project-owner review.
- **Implementation alignment:** clarify package format/version compatibility, unsupported-schema failure semantics and acceptance evidence in the implementation's future public contract/release lifecycle; no change authorised here.
- **Open architectural decisions:** none newly required for existing scope. Any future profile widening or new provider/business responsibility requires a separate governing decision; it must not be smuggled into this review.

## UI renderer reciprocity — 23 November 2026 (draft PR #146)

**Status: proposed UI conceptual interface, not a change to accepted ADR-0011 or shipped Rich Text functions.** [UI conceptual record](../../presentation/ui/presentation-record.md) treats validated `RichTextNode[]` as data to draw through semantic escaped rendering, with owner-authorised resolution of `doc:` and `asset:` references. Rich Text alone owns syntax/format/profile validation; UI never asserts publication, permission, safety of an external reference or saving authority. Host and source capabilities remain responsible for disclosure and server checks. Renderer availability and exact exports require implementation alignment.
