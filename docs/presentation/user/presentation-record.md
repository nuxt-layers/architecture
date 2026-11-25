# User — Presentation Record

**Artefact classification:** Presentation (CLS-10, approved 24 November 2026); existing governing responsibility labels and conditional future service proposals do not alter this blueprint placement.

**Capability:** `user` · **Class:** Presentation · **Conceptual status:** complete, with USER-01–USER-06 and subsequent interface, standards, library, diagnostic and GUI recommendations owner-approved on 23 November 2026. **Implementation and acceptance:** unverified. **Repository decision:** a separate User package is conditional, not assumed.

**Authority and evidence:** [Architecture Rules](../../../RESOURCES.md#ref-6d4a7ae1) `master` `d7f7c2ee051244b8c81325f5ff1267568d99aab1` and [blueprint](../../../RESOURCES.md#ref-d6e3a458) opening `master` `8874cccf2f4faaa23b765a9a0a377a77951bc3da`, reconciled with newer `master` `4c4fc52af5fc8ba19e20cf5360e8f416ef28c4e6` (23 November 2026). Accepted ADRs and normative Capability Standard supersede this non-normative blueprint; especially ADR-0005/0006/0009/0012/0016/0017/0018. Actual development evidence: root [Identity](../../../RESOURCES.md#ref-59d75cad), [Profile](../../../RESOURCES.md#ref-d369f0ce), [Authorisation](../../../RESOURCES.md#ref-4753322f) contracts; no independent `nuxt-layers/user/CONTRACT.md` verified. The [reference application template](../../../RESOURCES.md#ref-8c941ad8) and [Theme Manager contract](../../../RESOURCES.md#ref-484ee610) are presentation evidence, not an integrated User runtime.

## 1. Purpose and boundary

Provide one clear, reusable **group-scoped administrative experience** for permitted people, memberships, invitations, governed changes and access summaries. The host selects the active tenant/group and provides navigation; User presents data through the owning capabilities' public interfaces. It is **not** a new kind of user account, a directory, a business service or a replacement for IAM's existing presentation.

User may keep **transient UI state**: selection, filters, pagination, forms, loading and accessibility feedback. It owns **no authoritative records**, business decisions, durable store, policy engine, domain commands, domain events, outbox, background jobs, credentials or independent rights/erasure lifecycle. Disable it without affecting headless IAM. Separate packaging is justified only when reuse is demonstrably better than composing published IAM screens in the host; no separate repository or package is approved merely by this record.

**Newer baseline reconciliation:** The accepted [UI conceptual record](../ui/presentation-record.md) owns generic accessible widgets; User owns only domain-specific administration journeys assembled through those public components. The host still owns sidebar/routes and Theme Manager owns semantic styles. The newer Audit, Logging, Profile, Reporting and Error Normalisation reciprocal notes are retained alongside User-specific additions, not overwritten.

**Source-of-truth boundaries:**

| Owner | Authoritative responsibility |
|---|---|
| [Identity](../../capabilities/identity/capability-record.md) | Principals, standing, tenant/group relationships, memberships, invitations, group governance, ownership and source events |
| [Authentication](../../capabilities/authentication/capability-record.md) | Login identifiers, sessions, authenticators, recency, assurance and recovery |
| [Authorisation](../../capabilities/authorisation/capability-record.md) | Permission definitions, roles, grants, scoped access decisions and governed access changes |
| [Profile](../../capabilities/profile/capability-record.md) | Descriptive person attributes, contact verification, visibility, purpose-limited disclosure and Profile-specific data rights |
| [IAM Integration](../../compositions/iam-integration/compositions-record.md) | Coordination of protected cross-owner claims, closure, recovery and data-rights cases |
| Host/application | Application routes, sidebar, branding, caller/context wiring and feature selection; never owner-domain enforcement |

A group, tenant parent, administrator label, creator reference, subscription or successful sign-in alone grants no access. Authorisation and the originating server service decide again at each protected action. Identity's last eligible human owner and governance safeguards cannot be bypassed by a UI.

## 2. Native presentation behaviour

User displays the **current authorised projection** for a selected group: eligible members and invitations, permitted Profile labels, available actions and truthful source status. Membership and access changes are **requests**, not User-owned transitions. The owning capability validates input, actor, tenant, scope, recency/assurance, policy, revision and idempotency, then reports acceptance, approval pending, rejection, completion or an uncertain outcome.

On scope switching, sign-out, revocation or changed disclosure, clear stale data and request a fresh authorised projection. Missing permission, missing source, contradictory facts and unknown outcome fail safely; never convert a timeout into a successful or rolled-back transaction. Retry protected mutations only under the source owner's documented reconciliation and idempotency rules. Absent optional Profile/Reporting/Audit removes that enrichment; missing Identity or Authorisation makes protected group administration unavailable.

## 3. Idealised public contract

These are **logical presentation interfaces**. They do not assert callable User APIs or replace published owner contracts. Inputs and outputs preserve authority, source provenance, disclosure purpose, scope, revision and freshness. No mandatory universal request object is introduced.

### Inputs User consumes

| Public source | Required facts or operation input | Absence, staleness and validation |
|---|---|---|
| Host | Enabled navigation, requested route, trusted tenant/group context, branding, approved display settings, return path | Validate identifiers, route and return path; prompt for eligible scope rather than guessing; disabled GUI registers no User route |
| Authentication / caller resolver | Trusted actor, session validity, authenticated-at and assurance evidence | Missing/expired → sign-in; insufficient assurance → owner-controlled step-up; unknown → no protected action |
| Identity | Scoped principal/group/tenant/membership/invitation status, eligible governance operations, issued change/status references | Check source and revision; hide protected existence; missing or conflicting standing stops action |
| Authorisation | Fresh actor–action–resource decision, obligations and permissible manageability | Denied/unavailable closes protected read or mutation; client visibility is never enforcement |
| Profile | Purpose-specific authorised display names, contact/attribute projections, visibility and revision | Conditional; hidden stays hidden, cannot infer account identity from matching contact details |
| IAM Integration | Authorised case initiation/status for multi-owner actions | Conditional; no independent User merge, closure or recovery |
| Privacy / Legal Compliance | Applicable consent, disclosure, rights, retention, lawful purpose and qualified jurisdiction constraints | Conditional on operation; unresolved sensitive constraints block disclosure/action |
| Configuration, Clock, Theme Manager, UI/localisation | Effective permitted presentation settings, dates/timezones, message vocabulary, design tokens | Safe **presentation-only** fallback; cannot relax permission or legal constraints |
| Audit / Reporting | Authorised evidence/history and derived report queries and status | Optional, scoped and source-qualified; never unlock hidden personal records |

### Outputs User supplies

| Consumer | Contractual output | Meaning and limits |
|---|---|---|
| Host / signed-in viewer | Registered optional menu/view metadata, accessible dashboard, scoped people/invitation/detail projections, status/messages and navigation | Presentation, not a record export or authoritative identity statement |
| Identity | Scoped invitation, membership and governance **intents**, expected revision and correlation/idempotency reference | Identity alone enforces and commits; source status may be pending/unknown |
| Authorisation | Eligible role/grant/change **intents** or owner-page navigation | Authorisation alone decides and records permissions |
| Profile / IAM Integration | Authorised view/change or protected case **intents** | Each source owns disclosure, processing and outcome |
| Logging | Redacted **UI-only** technical diagnostics where configured | Logging receipt is not proof of a domain change |
| Audit | Authorised request to **view** source-backed evidence; only a trusted server records any separately defined UI-security event | Source capabilities report their own significant mutations; never duplicate source Audit evidence |
| Reporting | Authorised report/view/refresh/export selection and qualified filters | Reporting owns report jobs/results; underlying IAM owners supply source facts |
| User / localisation | Safe error code/message reference, field hint, status and optional recovery instruction | Never expose raw exceptions, credentials, provider text or protected existence |

**Interactions:** Queries reauthorise tenant/group, actor, purpose, disclosure and filters at read time; paginate server-side where needed and include timestamp/revision, provenance and completeness. Commands use published owner operations with trusted caller, permission, expected revision, correlation and idempotency as relevant. User emits **no domain event**; source-owned committed events can invalidate UI views through composed public ports. Duplicate, delayed or out-of-order notifications prompt source rechecks, not assumed exactly-once delivery.

**Guarantees:** Unknown, hidden, not-found, denied, stale, conflict, rate-limited, pending, partially complete and unavailable are distinct safe states where disclosure permits. Owner-issued evidence—not an HTTP response alone—determines committed status. User retains no independent historic copy, cross-tenant cache or permission snapshot.

## 4. Cooperating capability and failure matrix

| Relationship | User needs | User offers back | Criticality |
|---|---|---|---|
| Identity / Authentication / Authorisation | Current scoped identity, session/assurance and permission decisions | Owner-command intent or step-up navigation, never own decision | **Required** for protected group management; fail closed |
| Profile | Minimal permitted display projection | Purpose-scoped reads and authorised edits | **Conditional**; show source-approved opaque identifiers or omit personal fields when absent |
| IAM Integration | Source-owned case status | Approved cross-owner case initiation/navigation | **Conditional**; omit protected workflows when absent |
| Privacy / Legal Compliance | Applicable lawful disclosure and restrictions | Context for qualified owner-controlled decision | **Conditional** to operation; block disputed sensitive actions |
| Configuration, Clock, Theme Manager, UI/localisation | Display settings, semantic tokens and localised time/message presentation | View/component configuration, no policy authority | **Optional** presentation composition |
| Error Normalisation, Logging, Audit, Reporting | Safe error projections, diagnostics receipts, evidence and report results | Pure error input, redacted UI diagnostics, authorised evidence/report queries | Optional interaction as specified below; mandatory domain-owner evidence remains independent of User UI |

Information flows are **not package dependencies by default**. Public ports and host composition must preserve the acyclic graph. No other capability imports User's business state because it has none.

## 5. Error, diagnostics, audit and reporting contracts

| Partner | What User passes | What User receives | What it never does |
|---|---|---|---|
| [Error Normalisation](../../libraries/error-normalisation/stateless-library-record.md) | Source-issued error, versioned mapping, explicit known/unknown outcome, approved disclosure profile and opaque correlation | Pure, stable safe code/category, `messageKey`/field hint, separate user/technical projection and **advisory** retry qualification | Does not decide commit or retry, translate text, store anything, send logs/events/audit/reports |
| [Logging](../../services/logging/services-record.md) | Bounded redacted **presentation** failures: route/action class, safe code, severity, source time/correlation | Diagnostic acceptance/denial, reference and authorised health/query status | Does not own business result or accountable evidence; never log contact details, secrets or protected IDs |
| [Audit](../../capabilities/audit/capability-record.md) | Scoped authorised evidence reads; any distinct UI-security event must be defined and sourced by a trusted server under Audit taxonomy | Permitted source evidence, integrity/receipt and status, with provenance and completeness | User does not fabricate or duplicate Identity/Authorisation/Profile/Authentication mutation evidence |
| [Reporting](../../capabilities/reporting/capability-record.md) | Authorised report selection, tenant/group/date/status filters, view/refresh/export intent | Authorised aggregate/result/export reference, as-of time, freshness, lineage, coverage and suppression status | Does not become a membership, permission or personal-data owner; report access is independently authorised |

An example flow: User submits a protected role-change request to Authorisation. Authorisation decides and commits or records pending/unknown, sends its own required evidence to Audit and relevant technical diagnostics to Logging. User displays the source result, optionally normalises a safe failure message, and offers independent authorised Audit/Reporting views. No four-stage logging/audit/reporting pipeline is created; lack of Reporting must not prevent an access change, and an Audit requirement is never fulfilled by a Logging receipt.

The Error Normalisation [conceptual contract](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) is **not** a published package root `CONTRACT.md`. Logging, Audit and Reporting are conceptual neighbours; no runtime integration with User is claimed.

## 6. GUI and host composition

**Presentation requirement:** Yes, an optional user-facing **administration GUI**, with an administrator/operator dashboard and a headless absence mode. The [test-application template](../../../RESOURCES.md#ref-8c941ad8) provides the reference: homepage `/` without admin sidebar, host dashboard `/admin` with collapsible desktop/mobile navigation, a Theme Manager sidebar link to `/theme-manager`, shared top bar and Theme Manager-backed appearance. A derived host adds a labelled **Users** item, illustrative path **`/admin/users`**; this is a proposed route, not a verified User endpoint.

**Screen inventory** (route names are illustrative and host-configurable):

| Screen | Content/action | Priority and authority |
|---|---|---|
| Users dashboard (`/admin/users`) | Current permitted group, source-qualified counts, pending invitations/changes, shortcuts and freshness warnings | **Essential**; Identity/Authorisation |
| People and memberships (`.../people`) | Scoped search, paginated list, standing, membership status, permitted actions | **Essential**; Identity, with Profile-approved labels |
| Person detail (`.../people/:subjectId`) | Permitted profile, group memberships and governed action links | **Essential**; Identity/Profile; hidden/not-found safe |
| Invitations (`.../invitations`) | Issue invitation, list pending/expired/accepted status, cancel/resend only if published | **Essential** where invitations enabled; Identity |
| Membership change (dialog or owner route) | Reason, confirmation, version check, step-up/approval and owner status | **Essential** where permitted; Identity and governance |
| Roles/access (`.../access`) | Scoped effective permissions and links to owner-provided role/grant views | **Recommended**, conditional on Authorisation public presentation |
| Governance/approvals (`.../governance`) | Pending owner decisions and last-owner safeguards | **Conditional**, through owner IAM governance |
| Activity/history (`.../activity`) | Authorised Audit evidence, optional Reporting summaries and export links | **Optional**, never new User history source |
| My account / recovery / rights | Links into existing Profile, Authentication, Identity or IAM Integration workflows | **Conditional links**; no duplicate credential/rights screens |

**Layout and navigation:** Host owns branded header, sidebar, sign-in indicator, route selection and accessible tenant/group switcher. User supplies reusable dashboard and views through documented public exports or host slots; do not copy private test-template code or override Theme Manager. The host determines registered pages and optional presentation enablement; routes and server operations are **separately** access-controlled. Read-only and no-permission views are supported. Do not expose direct “delete user”, force merge, unapproved bulk grants or authenticator editing from the generic dashboard.

**Interaction quality:** On sign-in, select only permitted contexts. Switching scope clears previous data and reloads; source-confirmed empty differs from unavailable/incomplete. Pending approvals must not look complete. For unknown mutation results, offer status recheck rather than blind resubmission. Use host sidebar overlay on mobile, semantic tables/forms, focus restoration, keyboard controls, accessible live messages and responsive layout; meet WCAG 2.2 AA in all supported modes. Use Theme Manager public semantic styles, not private CSS or an alternative theme authority. BCP 47/CLDR/Intl and Clock resolve language/time presentation.

**Test-host limitation:** the template's Theme Manager `test` mode uses an unauthenticated test actor and is local-only; it **cannot secure User**. Its authentication indicator is presently a placeholder. Theme Manager's current root contract identifies an ADR-0012 host-composition gap. Never claim this template proves User integration.

**Future packaged presentation contract:** Document self-contained installation, supported owner contract versions, optional `presentation` and `pages.enabled` switches, configurable routes, composition entry point, supplied caller/access ports, public view/slot exports, permission/error and localisation semantics, disablement, security headers, and storage register. A Nuxt layer must meet ADR-0012's one-call composition and **50-line capability-specific host budget**. No current User implementation/root contract is verified.

## 7. Security, privacy, policy and resilience

- **Security:** OWASP ASVS 5.0 Level 2 minimum (Level 3 for critical operations), current server-side access for every read/mutation, CSRF/origin checks, least privilege, safe invitation rate limits, anti-enumeration, IDOR and cross-tenant defences, session/assurance recency and qualified high-risk approvals. Never trust menu visibility or user-submitted actor/scope as authorisation.
- **Privacy:** Profile and Privacy control disclosed fields and lawful purpose; a group association is not a right to private contact details. Minimise fields in lists, URLs, metrics, diagnostics, exports and browser caches. Do not persist personal directory data in browser storage. Classify any future cookies/storage in an implementation `STORAGE-REGISTER.md` and assess retention, legal holds and rights with the owning capabilities.
- **Policies:** Identity/Authorisation enforce governance and security invariants; Configuration handles only validated approved settings, not security or legal reinterpretation. Legal Compliance supplies qualified applicable duties; conflicting/unknown critical duties hold unsafe actions. Parent tenants have no inherited child-data access (ADR-0017); executable policy ownership remains with each service (ADR-0018).
- **Resilience:** source-owned idempotency, optimistic versions, status rechecks and redacted failures; no fake offline data authority, duplicate audit/outbox or local compensation mechanism. Unknown state is displayed honestly and refreshed through a trusted source. Retention and historical reconstruction belong to source owners.

## 8. Standards and open-source dependencies

**Required project baseline:** [W3C WCAG 2.2 AA](../../../RESOURCES.md#ref-eb11cf7e), [OWASP ASVS 5](../../../RESOURCES.md#ref-a1c367d2), BCP 47, Unicode CLDR and ECMA-402; [WAI-ARIA 1.2](../../../RESOURCES.md#ref-90f5e4b1) with informative [APG](../../../RESOURCES.md#ref-54e6f5b0) for custom controls. **Design references:** ISO 9241-210/11 (human-centred usability), [NIST SP 800-63-4](../../../RESOURCES.md#ref-ec4142c5) and UK NCSC secure administration (owner IAM assurance/privilege), ISO/IEC 27001/27002 and 29100/27701 (security/privacy governance). **Conditional duties:** UK GDPR, Data Protection Act 2018 and applicable public-sector accessibility/EN 301 549 requirements, with qualified legal interpretation. **Optional protocols:** OpenID Connect, SCIM RFC 7643/7644 and RFC 9457 only through compatible, versioned owner contracts. Standards alignment does not certify a runtime or assert legal compliance.

**Fully open-source, commercially permissive implementation candidates (not adopted dependencies):**

| Candidate (upstream) | Licence | Decision and use |
|---|---|---|
| [Reka UI](../../../RESOURCES.md#ref-12355446) | MIT | Preferred accessible **unstyled** primitives if the platform `ui` capability has gaps |
| [Nuxt UI v4](../../../RESOURCES.md#ref-b0f34541) | MIT | Alternative **complete** UI toolkit, only if adopted by shared `ui`/Theme Manager architecture; avoid competing stacks |
| [TanStack Table](../../../RESOURCES.md#ref-af94a8b1) | MIT | Conditional advanced directory table, with owner-authorised server pagination |
| [VeeValidate](../../../RESOURCES.md#ref-bd5a7590) | MIT | Conditional complex administration forms |
| [Zod](../../../RESOURCES.md#ref-1e3efac4) | MIT | Reuse existing published owner schemas where available |
| [VueUse](../../../RESOURCES.md#ref-9507482e) | MIT | Optional Vue utilities; never persist sensitive state casually |
| [Vue I18n](../../../RESOURCES.md#ref-4941c780) | MIT | Only if host has no suitable localisation mechanism |
| [Lucide](../../../RESOURCES.md#ref-c5624441) | ISC | Optional icons where shared `ui` has none |
| [TanStack Query](../../../RESOURCES.md#ref-51cb5e45) | MIT | Only if Nuxt data fetching is inadequate; isolate/invalidate tenant-scoped caches |
| [Playwright](../../../RESOURCES.md#ref-12180955) | Apache-2.0 | CI/browser acceptance only, not a runtime dependency |

**Licensing gate:** require current complete upstream source and commercially permissive licences, including transitive dependencies. Do not adopt open-core/delayed-source paid-feature packages. Newer PrimeVue/PrimeUI commercial development does not qualify; old MIT versions are not a current flagship. OpenVue needs maturity evidence. axe-core is fully open source but **MPL-2.0**, not strictly permissive, so not on this shortlist. Recheck specific release licence, dependency/security status, maintenance and Nuxt 4 compatibility before implementation. No Neo4j, Redis, Elasticsearch, external IAM engine or new data store is justified.

## 9. Conceptual acceptance criteria — not executed

| Scenario / input | Required safe output or behaviour | Authoritative owner |
|---|---|---|
| Eligible administrator selects group | Scoped members/invitations, current permissions and accurate counts | Identity, Authorisation |
| Same person switches between unrelated tenants | Previous data cleared; independent scope authorisation, no inherited parent access | Identity, Authorisation, Profile |
| Unauthorised URL, search or hidden Profile field | Non-disclosing refusal; no protected existence or contact data revealed | Identity, Profile, Authorisation |
| Invite submitted twice with matching idempotency reference | Owner-backed duplicate/accepted status, not two uncontrolled side effects | Identity |
| Last verified human tenant owner removal | Denied or routed into lawful governed recovery; never bypassed by User | Identity |
| Sensitive role change needs approval/step-up | Owner-authenticated assurance; pending shown until authoritative completion | Authentication, Authorisation/Identity |
| Stale membership revision or revoked access | Conflict/denial, safe refresh and no stale cached access | Identity, Authorisation |
| Owner unavailable after mutation submission | Unknown result, source status reconciliation, no blind resubmit | Originating owner |
| Cross-owner claim, closure or data-rights request | Routes to IAM Integration/source owners; no User account merge/erase | IAM Integration and source owners |
| Invalid invitation and UI rendering error | Safe source error/message, no raw secrets; only redacted UI technical diagnostic | Originating owner, Error Normalisation, Logging |
| Successful sensitive change and requested history | Single source-owned qualified Audit event; authorised evidence view; log not mistaken for audit | Originating owner, Audit |
| Report request outside scope or unavailable Reporting | Fail closed on disclosure; admin workflows remain functional | Reporting/Authorisation |
| GUI disabled or headless host | No User route/sidebar/screens; IAM contracts continue unchanged | Host and IAM |
| Mobile, keyboard, theme and locale variations | Accessible focus, semantics, messages, contrast, responsive views and localised times | User presentation/host, Theme Manager/Clock |

These are **conceptual acceptance requirements**, not executed test results. Before implementation acceptance verify exact owner `CONTRACT.md` APIs, 50-line composition, route security, threat model, WCAG/manual testing, storage register, privacy, cross-tenant protections, source-result reconciliation, performance of scoped list fetch/reload and CI results.

## 10. Decisions, open work and completion

**Owner-approved conceptual decisions (23 November 2026):** **USER-01** — User is presentation-only across owner public contracts. **USER-02** — group-scoped dashboard/administration views. **USER-03** — no User business commands, durable records or domain events. **USER-04** — current authorisation and disclosure, safe failure and conditional Profile/IAM views. **USER-05** — host-selectable, accessible/localised and disableable GUI. **USER-06** — no independent package until reusable value and a complete public contract warrant it. Subsequent owner approvals cover the above contract mapping, standards, permissive libraries, diagnostics/evidence/reporting and test-template GUI direction. This is approval of **conceptual content only**, not permission to merge or a claim of shipped behaviour.

**No outstanding conceptual ownership conflict identified.** **Design/implementation gates remain:** choose host composition versus separate presentation package using actual existing exported screens; verify exact published IAM ports, route and permission names and compatible error/status representations; document a self-contained root contract if packaged; reconcile concurrent IAM, Logging/Audit/Reporting/Error Normalisation reviews without overwriting their approved decisions; verify performance, security, privacy, a11y, CI and minimal-host integration. These are implementation/acceptance investigations, **not** new User domain ownership.

**Completion:** Conceptual specification complete for owner review; implementation, tested integration, compliance and final PR acceptance are **not complete**. This draft PR must undergo a current-`master` Git **and architectural** consistency check, protected checks, reciprocal-file conflict reconciliation and **explicit merge approval** before any squash merge.
