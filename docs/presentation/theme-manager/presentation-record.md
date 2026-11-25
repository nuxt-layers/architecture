# Theme Manager — Presentation Record

**Artefact classification:** Presentation (CLS-10, approved 24 November 2026); existing governing responsibility labels and conditional future service proposals do not alter this blueprint placement.

**Governing responsibility:** Foundation; blueprint presentation artefact with headless theme-management core and optional management GUI. **Catalogue name:** `theme-manager`; **blueprint directory:** `docs/presentation/theme-manager/`. **Conceptual review:** complete for the scope of this review; TM-01–TM-06 owner-approved on 23 November 2026. **Implementation:** established but not fully aligned with governing architecture. **Review PR:** #142 remains draft and requires separate merge approval. Conceptual approval does **not** imply completed implementation, passing tests, legal compliance or normative adoption.

**Evidence and authority:** [Architecture Rules](../../../RESOURCES.md#ref-6d4a7ae1) `master` at `d7f7c2ee051244b8c81325f5ff1267568d99aab1` (23 November 2026); [Blueprint](../../../RESOURCES.md#ref-d6e3a458) opening/current `master` at `8874cccf2f4faaa23b765a9a0a377a77951bc3da`; [Theme Manager implementation `CONTRACT.md`](../../../RESOURCES.md#ref-484ee610) at implementation `master` `1333f2ee1734d741acb088ec24a69125848c1527`. The hierarchy is **accepted ADRs → governing standards → approved published contracts → implementation evidence → conceptual proposals**. Relevant accepted ADRs: **0009** (presentation/headless), **0012** (trivial host composition), **0016** (acyclic dependencies), **0017–0018** (tenancy and policy); also the [Capability Standard](../../capability-standard.md) and [Presentation Standard](../../presentation.md). Recheck baselines at merge; the hashes above document the review, not a permanent version pin.

## 1. Purpose, ownership and scope

Theme Manager is the **sole authority for theme definitions, semantic design-token vocabulary, theme validity, effective-theme resolution and application**. It gives all application and capability screens a common accessible presentation. The default-only headless service is useful without a management GUI, database or external theme vendor.

It owns the bundled/system themes; optional managed theme records, revisions, ownership references, visibility and lifecycle; theme creation, validation, selection, preview, application and fallback; semantic colours and presentation properties; and authoritative results of theme changes. Permitted theme properties include colours, typography, spacing, sizing, density, radii, borders, shadows, effects and motion, always subject to accessibility limits.

It **does not own** identity, authentication, access policies, generic configuration or personal profiles; host routes, sidebar, branding and first-paint colour-mode choice; generic UI controls, translations, media bytes, asset ownership, legal decisions, logs, audit custody or reports. Other capabilities consume its **public semantic tokens**, never private internal styling code or a competing theme-selection engine.

**Approved preferences boundary (TM-03):** Profile owns optional personal cross-device **theme references**; Configuration owns an approved site/tenant default **reference** and provenance; Theme Manager alone validates each reference against the current scope and rights and resolves/applies the actual theme. The host coordinates permitted system/light/dark preference and initial rendering. No direct Profile/Configuration theme-definition duplication or cyclic package dependency.

## 2. Native modes, state and behaviour

| Mode | Intended behaviour | Current evidence |
|---|---|---|
| **Bundled default / headless** | Accessible system theme works without managed storage, optional GUI or external services | Bundled default works now |
| **Managed standalone production** | Optional production store, protected management and public one-call composition | Conceptually approved; implementation alignment outstanding |
| **IAM-enabled managed production** | Trusted caller and server-side access decisions through common public ports | Current internal providers exist; compliant public integration missing |
| **Local development test** | Seeded template, in-memory store and unrestricted test actor for local acceptance only | Implemented; prohibited when `NODE_ENV=production`; must not be publicly exposed |

Managed themes have an opaque ID, schema/token version, validated definition, trusted tenant/owner reference, visibility, lifecycle (`draft`, `published`, `archived`), revision, timestamps and justified change provenance. System themes are read-only; updates through new software releases are not user editing. A published theme is **not** automatically public or authorised for every user. Private drafts remain private; archived/deleted/inaccessible themes must not be newly selected.

**Approved resolution order:** authorised transient preview → valid readable personal selection → valid approved site/tenant default → bundled accessible default. A current access denial, withdrawn consent, unsafe definition or unknown scope overrides stale preference references. The **implemented** order is narrower: preview → browser `active-theme-id` cookie → bundled default. Cross-device Profile preference and site default are **not implemented public APIs**.

Creation needs an accessible readable template and valid owner; edits preserve authorised ownership and validate the canonical definition. Controlled lifecycle transitions, revision checks, idempotent writes and committed-event handling are **approved target behaviour**, not existing guarantees. Distinguish request receipt, committed managed record, selected reference and actual effective theme. An unknown persistence outcome stays **uncertain** pending reconciliation; do not blindly repeat a risky write or report success.

## 3. Public contracts — what exists today

The following are described in the [published implementation contract](../../../RESOURCES.md#ref-484ee610). They are **documented surfaces**, not proof of full independent host acceptance.

| Direction | Public interface | Input / output |
|---|---|---|
| **Client commands and state** | `useThemeRuntime()` | `activate(runtimeTheme)`, `preview(runtimeTheme)`, `clearPreview()`, `useDefault()`, `failToDefault(reason)`; exposes `effectiveTheme`, `activeTheme`, `activeThemeName`, `selectedThemeId` and `error` |
| **Client management** | `useThemeManagement()` | `listThemes()`, `loadTheme(id)`, `createTheme`, `updateTheme`, `deleteTheme`, `previewTheme`, `stopPreview`; reads and writes are subject to server checks |
| **HTTP queries** | `GET /api/themes`, `GET /api/themes/:id` | Scoped `ThemeSummary[]` or validated definition; unreadable items are excluded or return `404` |
| **HTTP writes** | `POST /api/themes`, `PUT /api/themes/:id`, `DELETE /api/themes/:id` | Canonical theme JSON for create/edit (maximum **256 KiB**); success `{ success: true, id }` |
| **Capabilities** | `GET /api/theme-manager/capabilities` | `{ storage: boolean }` tells the UI whether managed storage is available |
| **Public definitions** | `/contracts` exports | `parseThemeDefinition`, `parsePersistedTheme`, `serializeThemeDefinition`, `summarizeTheme`, `themeDefinitionToRuntime`, `createThemeApplication`, published types and `THEME_MODES` |
| **Presentation** | `@nuxt-layers/theme-manager/presentation.css`, `SemanticPresentationTheme` v1 | Light/dark semantic CSS classes and tokens for the host and every capability screen; built-in default always available |
| **Optional screens / asset** | `/theme-manager`, `/theme-manager/:id`, `/theme-manager/new`, `/theme-manager-logo.png` | Existing theme library, editor and decorative logo; host decides route exposure |

**Vocabulary:** `fill`, `pen`, `edge` and effects with semantic roles (`base`, `primary`, `secondary`, `tertiary`, `accent`, `muted`, `floor`, `input`, `link`, `success`, `info`, `warning`, `error`, `notification`) and defined states (`default`, `hover`, `active`, `selected`, `visited`, `disabled`, plus applicable focus/pressed/on/error/loading/shadow). Public classes carry **meaning**, not literal colours or mode names; the layer publishes `presentation.css` and applies light `:root` and dark `html.dark` values. Do not import internal CSS files or redefine tokens in `ui`.

**Existing HTTP errors:** `400` invalid, `403` forbidden/system theme, `404` absent or unreadable, `409` duplicate ID, `413` oversized body, `503` missing managed store, `500` other errors including missing provider integration. Deeper stable error codes are a proposed alignment, not already published.

**Current critical integration limit:** `ThemeRepository` (`findById/list/save/delete`), `ThemeActorContextProvider` (actor, groups, organisations) and `ThemeAuthorizationService` (`isAllowed`) are **internal provider interfaces**, not package-exported host composition APIs. The default mode is `iam`, but no compliant `resolveCaller`/`decide`, owned PostgreSQL store, one-call public composition or minimal-host example is shipped. Managed operations require these internal providers and otherwise fail closed; an independent consumer must **not** import them. A future implementation must correct this under ADR-0012 without reclassifying an internal symbol as published.

Current permissions: `theme.read/create/edit/delete/publish/share` are checked as relevant; `theme.use/assign/import/export` names are declared but **not enforced or exposed as equivalent complete endpoints**. Client selection currently relies on readability and the cookie. Theme editor contrast badges are **warnings**, not enforced accessible-save checks. The GUI has hard-coded English messages and no public `presentation: false` switch.

**Current storage:** `active-theme-id` is a client-readable first-party cookie, `SameSite=Lax`, `path=/`, up to **365 days**, with no explicit `Secure`/`HttpOnly` setting in this implementation. Optional themes are stored through a host-supplied repository; in local test mode storage is ephemeral. Persistent selection is not essential to rendering. [`STORAGE-REGISTER.md`](../../../RESOURCES.md#ref-abb576ad) remains the factual storage inventory.

## 4. Idealised public inputs, outputs and changes

These are **approved conceptual responsibilities**, not published function signatures. Each operation uses only necessary trusted fields: tenant/scope, actor or service authority, resource ID, schema/revision, time, correlation/idempotency and safe disclosure classification.

| Input owner | Information Theme Manager needs | Absence / security behaviour |
|---|---|---|
| Host / editor | Composition and enabled mode; trusted active site; theme-create/edit/preview/select/publish/share/archive/delete request; expected revision and optional idempotency key | Reject malformed/oversized values; default-only operation without managed storage |
| Identity / Authentication / Authorisation | Trustworthy actor, tenant and group/organisation scope, assurance, and resource-action decisions | Protected management denies missing/ambiguous decisions; ancestor group membership never grants automatic access |
| Profile / Configuration | Permitted personal selected-theme reference / approved site-default reference, scope and revision | Missing, withdrawn or invalid reference safely falls back; these owners never apply themes |
| Host presentation | Requested light/dark/system mode, OS contrast/motion constraints, locale/direction and first-paint coordination | Stay accessible in supported modes; host does not reimplement theme logic |
| Privacy / Legal Compliance | Applicable lawful storage/consent, retention, disclosure, deletion and hold constraints | Block risky operations if mandatory decision is unknown; no blanket cookie exemption |
| Media / Storage / Clock | Optional authorised asset refs and delivery; trusted event/revision time when required | Accessible text/default without media; no media-byte ownership or clock authority |

| Outbound contract | Recipient and meaning |
|---|---|
| **Effective theme and presentation** | Host/`ui`/other capability screens receive versioned semantic token values, supported modes, effective selection/fallback status and public CSS; no hidden theme or tenant data |
| **Protected queries** | Authorised editors receive filtered theme summaries/details, lifecycle and revision, validation/contrast findings, with privacy-safe non-enumerating refusals |
| **Commands and safe errors** | Caller receives known rejected/committed/uncertain outcome, safe reason/message reference, applicable revision and correlation; acceptance is not proof of application |
| **Committed event facts** | When required, Audit/MQ/reporting/cache consumers receive minimal versioned tenant-scoped changes from a **Theme Manager-owned durable outbox after commit**; transport and reports do not change themes |
| **Authorised portable theme data** | Optional versioned import/export with validation and rights checks; not yet published, never include secrets, personal Profile records or media bytes |

**Command and query principles:** enforce token schema, accessibility, owner/scope, policy, authorisation and expected revision on the server; use atomic transitions and idempotency; never infer a committed write from a timeout. Queries recheck current read/use rights and avoid tenant enumeration. Client preview is isolated and transient. Event transport may retry/replay; consumers deduplicate, but the underlying state transition occurs only once. No durable event is needed for ordinary browser preview or a system/light/dark toggle. The current root contract explicitly states **no events and no scheduled tasks**.

**[Page Builder](../page-builder/presentation-record.md) reciprocal interface:** PB-01–16 and STD-PB-01–07 approved: Page Builder consumes effective semantic vocabulary, tokens, variants and compatibility checks; supplies token/variant references and layout appearance requirements only. Theme Manager retains theme validation and effective selection; compatible theme changes restyle pages without document changes. ATAG/WCAG accessible defaults and contrast support; approved PB-22–28 reuse the host Appearance control and Theme Manager's public theme administration, not a second theme editor; no competing theme store or reverse dependency.

**Navigation extension (PB-29–37 approved):** Page Builder uses Theme Manager semantic tokens and approved variants for reusable navigation bars, nested disclosures, footer/side navigation and breadcrumbs. Theme Manager retains styling/contrast authority; no competing theme settings.

## 5. Relationships with other capabilities

A relationship is a **public information boundary**, not a compulsory import or another owner of Theme Manager state. The host composes required providers and optional consumers; all edges remain acyclic (ADR-0016).

| Other owner | Supplies Theme Manager | Receives from Theme Manager |
|---|---|---|
| **Host / UI / screen owners** | Host shell, Appearance control and routing; `ui` supplies general accessible controls | Semantic tokens, effective visual state, optional GUI and fallback; host/`ui` never own theme definitions |
| **Identity, Authentication, Authorisation** | Trusted actor/tenant/assurance and scoped access decisions | Theme resource, owner, visibility, required action and guarded outcome |
| **Profile / Configuration** | Optional personal selection reference / approved site-default reference | Live validation and fallback/selection result; no duplicate resolved theme |
| **Privacy, Legal Compliance** | Purpose/consent, retention, erasure, disclosure and holds | Scoped storage purpose, change evidence and operations constrained by policy |
| **Media, Storage** | Optional asset availability/delivery; persistence infrastructure under host composition | References only; no asset bytes or media authority |
| **Clock / Localisation** | Trusted effective time and locale/direction/message services | Timing provenance and localisable message keys; token meaning remains language-independent |
| **Workflow, Scheduler, Message Queue** | Conditional approved workflow or timed command, transport for committed events | Authoritative guarded outcome/committed facts; no transfer of theme ownership or outbox |
| **Observability** | Optional host-wired metrics/tracing | Bounded health, latency, fallback and error signals |
| **Error Normalisation, Logging, Audit, Reporting** | Independent pure error interpretation, diagnostic/evidence receipts, qualified reporting requests/status | See explicit boundaries below; none may declare a theme change committed |

### Error Normalisation, Logging, Audit and Reporting

The owner **approved these responsibility boundaries** on 23 November 2026. The suggested integration shapes remain **advisory** and do not introduce mandatory direct dependencies. The canonical [Error Normalisation library record](../../libraries/error-normalisation/stateless-library-record.md) has a [proposed conceptual contract](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs), but no verified shipped implementation. Logging and Reporting have conceptual contracts; Audit remains conceptual with no verified root `CONTRACT.md`.

| Owner | Theme Manager sends | Theme Manager receives; boundary |
|---|---|---|
| **Error Normalisation** — stateless library | Known source-owned validation, permission or store error, mapping, proven/uncertain outcome, safe correlation and permitted disclosure profile | Pure result: stable code, category, message key, bounded public/diagnostic projections and **advisory** retry hint. No event, log, persistence, translation or business decision is made by the library |
| **Logging** | Minimal structured technical severity, operation, source `theme-manager`, safe error code, latency/health and opaque correlation | Intake accepted/rejected/uncertain status and authorised diagnostics. Log failure ordinarily does not undo a valid theme command; log acceptance proves no theme outcome |
| **Audit** | Risk-selected actor/tenant/source-event and authoritative outcome/revision for publish, privileged share, visibility/ownership changes, sensitive delete/export or relevant privileged denials | Independent evidence receipt, integrity/uncertainty and authorised review, **not** proof of commit. Mandatory evidence follows approved fail-closed/recovery control. Ordinary preview/mode toggles are not automatically audited |
| **Reporting** | Authorised public theme summary, lifecycle/version, provenance and lawfully derived aggregates or committed facts | Qualified report/run/export status; Reporting owns analytics, never private theme data, authoritative edits or inferred business facts from logging/audit custody |

**Example:** a publish command checks rights and validates, then commits Theme Manager state. A failed attempt returns a safe error and may generate a technical log. A committed high-risk change may generate protected Audit evidence and an outbox fact. Reporting can later query an authorised view. **Neither a log receipt, Audit intake nor report success establishes the theme operation's result.** Unknown storage outcomes remain unknown until reconciled.

## 6. Security, privacy, accessibility and standards

**Required platform floor:** **WCAG 2.2 Level AA / ISO/IEC 40500:2025** (accessible colours, meaningful boundaries, focus, keyboard, reflow/zoom and motion preferences); **OWASP ASVS 5 L2**, L3 for critical security operations as required; locale/translation support with **BCP 47, CLDR/UTS #35 and ECMA-402**. Accessibility checks must apply to supported light/dark, high-contrast or forced-colour contexts as relevant; the existing editor's warning badge is not enforcement, and token checks alone cannot certify a whole composed page.

| External guidance | Design use; no automatic blanket claim |
|---|---|
| [W3C WAI-ARIA 1.2](../../../RESOURCES.md#ref-67eee3fb), [Authoring Practices](../../../RESOURCES.md#ref-f076dce5), [ATAG 2.0](../../../RESOURCES.md#ref-9dbe26fd) | Accessible editor/picker components, keyboard interactions, feedback and authoring assistance; native HTML first |
| [W3C CSS Custom Properties](../../../RESOURCES.md#ref-63ef0de9), [CSS Color 4](../../../RESOURCES.md#ref-a582bbf2), [CSS Color Adjustment](../../../RESOURCES.md#ref-0faec43f), [Media Queries 5](../../../RESOURCES.md#ref-d71ad712) | Variables, colour modes, forced colours, OS preferences and motion, behind **unchanged published semantic CSS vocabulary** |
| [W3C Design Tokens Community Group 2025.10](../../../RESOURCES.md#ref-58aea18f) | Stable **Community Group** format for optional future versioned interoperability; **not** a W3C Recommendation or mandate to migrate runtime definitions |
| [ISO 9241-171:2025](../../../RESOURCES.md#ref-7b6be755), [ISO/IEC 30071-1:2019](../../../RESOURCES.md#ref-23e1c516), [ISO 9241-210:2019](../../../RESOURCES.md#ref-059e6b51) | Human-centred and inclusive interaction design and development process |
| [ETSI EN 301 549](../../../RESOURCES.md#ref-5b23dd33), [UK Public Sector Bodies Accessibility Regulations](../../../RESOURCES.md#ref-20c7b15f), [Equality Act 2010](../../../RESOURCES.md#ref-517049ab) | Contextual regulatory/procurement standards; Legal Compliance establishes service/jurisdiction and **applicable edition** (including after ETSI V4.1.1 in 2026); not every private host is a public-sector body |
| [ISO/IEC 27001](../../../RESOURCES.md#ref-42fa42bb), [ICO data protection by design](../../../RESOURCES.md#ref-4ec87ed3), [ICO storage technologies](../../../RESOURCES.md#ref-e467565a) | Risk management and jurisdiction-specific UK GDPR/PECR storage, consent and retention assessment; no automatic ISO certification or cookie exemption |

**Enforcement:** reject or safely resolve inaccessible tokens **before save, publication and application**; preserve an accessible default and clear localisable failure status. Protect management with server-side caller scope and `theme.read/create/edit/delete/publish/share` decisions, tenant isolation, adequate assurance for high-risk sharing, minimised provenance, no-cache/anti-framing administrative responses and risk-appropriate Audit evidence. An actor-provided owner ID, group hierarchy, theme visibility or user-selected preference is **not itself authorisation**. Keep source secrets, inaccessible theme names, raw private definitions and personal Profile data out of public responses, exports, diagnostics and events.

**Privacy and storage:** document every cookie and persistence purpose in the owning `STORAGE-REGISTER.md`; obtain Privacy/Legal Compliance's decision on lawful storage, consent or exemption, duration, withdrawal and deletion/holds. Operate in bundled-default/session-only mode where optional persistence is not justified. The published `active-theme-id` 365-day cookie and current on-activation write need policy/implementation review. Unknown mandatory legal constraints block risky operations; Theme Manager does not decide legal interpretation.

## 7. Advisory open-source library candidates

**No adoption is required.** Public-source projects with permissive **MIT** or **Apache-2.0** core licences are candidates for bounded improvements; verify actual version, complete transitive licence closure, maintenance, security and Nuxt compatibility before use. Do not introduce a partially closed enterprise stack or replace existing functioning code.

| Candidate (licence) | Possible use | Caution |
|---|---|---|
| [Culori](../../../RESOURCES.md#ref-2150b3bd) (MIT), [Color.js](../../../RESOURCES.md#ref-5cd843eb) (MIT), **or** [Colord](../../../RESOURCES.md#ref-af31f265) (MIT) | Colour parsing/conversion, CSS colour spaces, gamut and contrast calculations | Choose **one** only if existing validation has a proven gap; Color.js version/API maturity requires checking |
| [Adobe Leonardo](../../../RESOURCES.md#ref-435cfa63) (Apache-2.0) | Accessible palette generation in the optional editor | Does not replace deterministic final accessibility enforcement |
| [Reka UI](../../../RESOURCES.md#ref-12355446) (MIT) | Optional accessible Vue primitives | Reuse the existing `ui` public components first |
| [VueUse](../../../RESOURCES.md#ref-9507482e) (MIT), [Nuxt Color Mode](../../../RESOURCES.md#ref-5a839ea2) (MIT) | Browser state/preferences; host first-paint mode handling | Never take over effective theme authority or conflict with existing host `html.dark` and storage |
| [Style Dictionary](../../../RESOURCES.md#ref-5846c58c) (Apache-2.0) | Future build-time design-token import/export | No mandatory runtime format or migration |
| [Zod](../../../RESOURCES.md#ref-1e3efac4) (MIT) | Optional validation/schema tooling | Reuse functioning validators instead of adding a second definition of truth |

[axe-core](../../../RESOURCES.md#ref-802ea31e) is source-available and commercially usable under **MPL-2.0** (weak copyleft), **not** MIT/Apache-style permissive; excluded from the strict shortlist. This is a licence distinction, not a judgement that it is proprietary or inappropriate for separately approved test-only use.

## 8. GUI: existing screens, host composition and exploration

**Approved TM-06:** optional management UI, host-owned navigation, headless core. **Existing host pattern:** [`nuxt-layers-test/application-test-template`](../../../RESOURCES.md#ref-f1f7cc47) has a home page `/`, separate `/admin` test dashboard, responsive collapsible **Capabilities → Theme Manager** sidebar link to `/theme-manager`, and host-owned `TestAppearanceMenu` in the top bar. `app/app.vue` owns shell/navigation/`html.dark`; Theme Manager owns its library/editor screens. The template's `Not signed in` test shell and unauthenticated fixture must never be treated as production IAM.

| User need | Screen and current status |
|---|---|
| **Ordinary theme/mode selection** | Host top-bar Appearance picker; no dashboard required for a personal preference |
| **Browse, use and manage themes** | Existing **Theme Library** `/theme-manager` with bundled read-only default and available managed theme cards, Use/Create/Edit as authorised; sufficient as the capability dashboard |
| **Create/edit/preview** | Existing `/theme-manager/new` and `/theme-manager/:id`: name/description; light/dark/both preview; optional whole-app preview (off by default); colour, typography, spacing, radii, borders, shadows, effects, motion, responsive, assets and raw tabs; save/cancel/delete, validation and unsaved-exit protection |
| **Publication/share/history/restore** | **Optional future** contextual views/actions if managed lifecycle and public contracts justify them; no claim that complete screens/endpoints currently exist |
| **Default-only / disabled optional UI** | No management sidebar link necessary; public `presentation: false` switch remains future alignment |

**Verified editor behaviour:** [`ThemePreviewComponents.vue`](../../../RESOURCES.md#ref-b5f7afa5) renders examples of buttons, tabs, listbox, links, forms and statuses with **“[role] colours”** buttons. Those currently navigate to the selected **semantic role** in [`ThemeEditorColours.vue`](../../../RESOURCES.md#ref-c0267327)'s Fill/Pen/Edge **state matrix**; [`ThemeColourField.vue`](../../../RESOURCES.md#ref-95e68ca1) contains the existing swatch, native colour input and exact value field. The example itself is **not presently a direct colour picker**.

**Owner-approved exploratory UI recommendation, advisory and not authorised for implementation:** simplify colour editing by letting **Inspect colours** select an example's **semantic role + Fill/Pen/Edge channel + state + light/dark mode**, then open a compact colour inspector (swatch/value/contrast and affected components). Immediately update the isolated draft preview, not authoritative live state. Distinguish simulated hover/focus/selected states and separate inspect mode from ordinary working demo controls. Keep an **Advanced** state matrix for precise values, unseen roles/states and equivalent keyboard/screen-reader access; do **not** delete the semantic model or underlying validation. An edit to a shared token must clearly show its impact across all examples. Offer reversible changes, cancel/reset and safe accessible fallback; whole-app preview stays opt-in. On mobile, the inspector may be a drawer or bottom sheet. Use existing `draft.setColour` and other internal editing behaviour where suitable; **do not invent a new public API or mandate a redesign**.

**Presentation acceptance:** maintain responsive host/sidebar composition, screen-reader/keyboard focus and selection, live accessible validation, readable independent editor even with a bad draft, localised error/help strings, light/dark/forced-colour/motion behaviours, permission guards and no private storage access from the client. No GUI/browser usability run occurred; the exploration is from source inspection. A future user study can compare speed to locate a colour, correct recognition of impacted tokens, error recovery, narrow viewport and non-pointer parity.

## 9. Conceptual acceptance cases (not executed tests)

| Case | Expected outcome |
|---|---|
| No session, management store or GUI | Bundled accessible default renders; protected management unavailable |
| Valid authorised editable theme | Protected draft revision commits, and only authorised readers see it |
| Stale revision/repeated request/unknown persistence result | Conflict or idempotent previous result; uncertain outcome reconciled rather than invented; no double mutation |
| Unsafe token, focus/contrast or reflow combination | Refused or safely corrected before save/use/publish; no inaccessible application |
| Private, deleted, archived or wrong-tenant selected theme | No metadata leak; safe fallback and clear status |
| Denied privileged share/publish; missing IAM/mandatory legal decision | Fail closed, no unauthorised state change or false committed event |
| Valid committed change and transport retries | One authoritative transition; optional durable outbox fact may be replayed/deduplicated |
| Profile absent, cookie unavailable/consent withdrawn, or default invalid | Valid scoped session/default behaviour; no unjustified persistence or cross-tenant inheritance |
| Illegal export/delete under hold | Denied with safe error; no bypass of retention, consent or permissions |
| Optional GUI disabled / host Appearance control | Core tokens and safe resolution continue; host retains navigation/first-paint authority |
| Preview specimen selected in **proposed Inspect mode** | Existing role/channel/state/mode updated in draft; all affected components reflect it; demo controls work when Inspect disabled |
| Unseen token or inaccessible draft in proposed editor | Advanced matrix/non-pointer path stays available; editor remains legible; no unsafe silent save |

Acceptance requires versioned public-contract and minimal-host integration checks, tenant/access and data-disclosure tests, accessibility checks in composed screens (not contrast arithmetic alone), locale and storage-policy checks, migration/revision/idempotency tests, and CI/user validation. **No tests or builds were run as part of this conceptual PR.**

## 10. Approved decisions, outstanding implementation and completion

| Decision | Owner-approved conceptual resolution (23 November 2026) |
|---|---|
| **TM-01** | Keep a Foundation, responsibility-owning headless theme authority with separable optional GUI |
| **TM-02** | Enforce accessibility validation on save, publication and application with safe fallback/versioned migration |
| **TM-03** | Profile persists personal selection references, Configuration approved site defaults; Theme Manager validates/resolves/applies; host owns mode/first paint |
| **TM-04** | Versioned managed lifecycle, revision conflict/idempotent writes and committed events/outbox when needed |
| **TM-05** | Scope-safe sharing/publication, tenancy, privacy/retention and separate production IAM/standalone versus local test modes |
| **TM-06** | Host Appearance/sidebar pattern; optional library/editor, disabled-presentation artefact and translated accessible UI |

**Advisory rather than directive:** the colour-inspector exploration (approved as a recommendation), optional library choices and future nice-to-have management screens have **not** been authorised as implementation changes. No additional conceptual approval is required to *close this review's documentation scope*; future material design changes should be explicitly evaluated, not silently treated as TM-01–TM-06.

**Known implementation work (separate PRs only):** make the root `CONTRACT.md` independently integrable with a standard single composition operation, capability-owned store, trusted caller and `decide`, minimal-host within the governing composition budget; enforce accessible save/use; translate screens; support turning off optional presentation; reconcile personal/site preference and lawful storage; protect/high-risk lifecycle changes with revisions, idempotency and optional outbox; publish any new import/export, assignment or reporting surface **only when implemented**. Review current `STORAGE-REGISTER.md`, provider-neutral contracts, fallbacks and test-mode guardrails. Full acceptance evidence and production/legal assurance remain future work; none is claimed here.

**Conceptual completion checklist:** purpose/classification and exclusions; native/default and managed behaviour; existing versus idealised inputs/outputs, commands/queries/events; dependency and reciprocity; access/privacy; standards; optional permissive OSS; actual GUI and proposed UX; conceptual acceptance; owner-approved TM decisions; implementation gaps and status are **covered**. There is no unapproved conceptual owner-choice blocker recorded. This document is ready for final architectural/technical PR review, **not** a claim of released software or permission to merge.

**Merge gate:** recheck current governing/blueprint masters and related parallel PRs, complete final content/link/scope/conflict review, verify checks and ownership, then seek **explicit separate owner approval** for squash merge of draft PR #142. Keep history in Git instead of adding further narrative appendices to this record.
