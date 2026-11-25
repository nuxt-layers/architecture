# Profile — canonical conceptual capability record

**Capability:** `profile` · **Class:** Foundation · **Conceptual status:** owner-approved design principles and review specification; implementation alignment and review acceptance outstanding · **Review:** draft PR #123, 22 November 2026. This file is the **single current statement** of the Profile design. Earlier discussion and superseded proposals remain in Git history, not appended as competing requirements.

**Authority and evidence:** [architecture-rules](../../../RESOURCES.md#ref-6d4a7ae1) master `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint master `361566988ac53c55f6135e8acfa46cd5b013d7a0`, both rechecked 22 November 2026. Accepted governance and the [Capability Standard](../../capability-standard.md) take precedence. Published implementation evidence: [`nuxt-layers/profile/CONTRACT.md`](../../../RESOURCES.md#ref-d369f0ce), repository master `dcb758c477f46f16d3934a00f98101aff1e9412d`, **contract v2, in active development**. Published behaviour is documented, **not independently runtime-verified**.

## Purpose and authoritative boundary

Profile is the authoritative service for a **person's ordinary descriptive information and controlled disclosure**: names, contact attributes, person-owned locale/time-zone preferences, visibility choices, contact verification, group-departure attribution and Profile-owned personal-data lifecycle. It can run **headlessly**; its screens are optional.

Profile owns the personal record, its revisions, verification challenges and evidence, disclosure rules, permitted departure snapshots, Profile-specific rights-request parts and holds, per-person encrypted-key references, and its own committed events/outbox.

It **does not own** Identity principals or memberships; Authentication credentials, login identifiers, sessions or assurance; Authorisation permissions; Privacy consent or legal restrictions; Notifications delivery; organisation settings; employment or booking source records; legal interpretation; Audit custody; Reporting aggregates; or a global cross-capability rights-case master.

**Non-negotiable isolation:** one canonical personal source record **per person within an Identity authority**, with purpose-specific contextual views. Neither tenant parentage, organisation ownership, membership nor shared contact details give general access to the record. A Profile email need not be the sign-in email. Names or contact matches do not establish unique identity, account ownership or account-recovery rights.

## Approved decisions and lifecycle

The owner approved **PRO-01–PRO-05 and the supplementary design directions** on 22 November 2026. They are binding on this conceptual review but do not declare a new implementation API or authorise merger of the PR.

| Decision | Approved rule | Consequence |
|---|---|---|
| **PRO-01 — data rights** | **IAM Integration** is the one global coordinator for multi-source access, correction, restriction and erasure cases. | Profile decides and reports **only its source-owned part**. The **published v2 implementation still coordinates declared external parts**: preserve compatibility until an explicit versioned migration and revised host orchestration. |
| **PRO-02 — contact and communication** | Profile owns personal destinations, verification, channel choices and quiet hours; Privacy owns consent, objections and suppression; Notifications owns dispatch/delivery. | Verify the current destination and current lawful permission **at send time**. A verified address or telephone number is neither account proof nor unrestricted delivery consent. Shared/delegated destinations need specific authority. |
| **PRO-03 — contextual views** | One personal record per Identity authority; multiple strictly purpose-scoped presentation projections and narrowly justified overrides. | No duplicate person masters, inferred cross-context links or employer/tenant permissions. Employment, Gaming and other domains retain their own specialist records and public handles. |
| **PRO-04 — erasure and federation** | Never silently reuse retired/erased person identifiers; require lawful, source-specific handling of live data, backups, indexes and legal holds. Federation/linkage across installations is **not automatic**. | Record verified disposal or qualified exceptions without claiming immediate deletion when backups or holds remain. External links require specific lawful authority, provenance, scope and withdrawal handling. |
| **PRO-05 — duplicate/orphan account claims** | A person can request to claim an inaccessible, unlinked, orphaned or accidentally duplicated account. | **Identity** owns principals, linking, consolidation and retirement; **Authentication** verifies control/recovery assurance; **Authorisation** approves consequential transfers; **IAM Integration** coordinates multi-owner steps; **Profile supplies only bounded evidence and transfers its own authorised attributes**. |

**Claim safeguards (PRO-05):** matching name, email or phone only suggests a candidate and **never** discloses its existence or triggers an automatic merge. Use graduated independent evidence, step-up/phishing-resistant authentication where available, rate limits, confidential notices to existing owners where safe, dispute/challenge and appeal, independent high-risk review, source-by-source approval, traceable reversible stages and legal-hold preservation. An unproven claim stays denied or pending review; no takeover, password reset, membership transfer or resurrection of erased records. Exact evidence thresholds, arbitration and reversible stages remain **detailed implementation-design work**, not unapproved conceptual principles.

### Native operations and guarantees

- **Person lifecycle:** provision only on trusted, idempotent Identity person creation; process pause, closure, group departures, rename/disposal and final owner-qualified erasure. Group departure does **not** itself erase the person. Replays cannot repeat side effects; erased identifiers cannot be reprovisioned.
- **Personal attributes:** validated, revisioned values and removal. Published fields use OpenID Connect-style `name`, `given_name`, `family_name`, `preferred_username`, `locale`, `zoneinfo`, `email`, `phone_number`. A user assertion is not official/legal identity proof.
- **Disclosure:** decide afresh using viewer, subject, purpose, current Identity standing/relationship, tenant/group context, Authorisation and applicable Privacy constraints. Published audience choices are `group`, `tenant`, `nobody`; initial name audience `group`, other fields `nobody`. Choices are ceilings, **not grants**. Published display purposes: `listing`, `attribution`, `administration`. Unknown/hidden results do not disclose protected existence.
- **Verification and departures:** time-limited contact challenge confirms possession of a particular saved value, invalidated on change; departure attribution follows applicable policy and the person's anonymity choice.
- **Rights and holds:** Profile exports and settles only Profile information; foreign owners settle their own parts. Distinguish request acceptance, processing, pending/held/partially completed, refusal with reason, completion and archived evidence. The host coordinates closure/erasure via IAM/Identity, **not a Profile self-erasure HTTP route**. Held closed information becomes unavailable for ordinary reading.
- **Encryption and resilience:** per-person versioned wrapped keys, verified rewrap/retirement, secure erasure and explicit backup/retention treatment. PostgreSQL transactions and Profile-owned durable outbox; correlation/idempotency, optimistic revisions, safe replay/retry and explicit `unknown` where an external outcome is uncertain. Missing database, key, identity decision or valid time fails closed; no plaintext, stale-permission or cross-tenant fallback.

## Public contract — inputs, outputs and publication status

**Published** below means documented in Profile's root `CONTRACT.md`; **planned** means the owner-approved *ideal public responsibility*, **not** an implemented callable method. Business relationships are composed via host ports rather than importing all neighbouring capabilities.

| Surface | Input received | Output supplied | Status |
|---|---|---|---|
| **Composition** | `composeProfile`: PostgreSQL database/roles, host key wrapper, disclosure context; HTTP requires subject resolver; conditional access decision, notifier, Clock and rights-part ports | Initialisation or typed composition failure, protected server services and optional presentation | **Published** |
| **Own details** | Trusted person context, attribute patch, optional `expectedVersion` | `getOwnProfile` snapshot/version; `updateProfile` committed result or conflict | **Published** |
| **Restricted display** | Viewer, subject(s), purpose, optional group and fresh trusted disclosure context | `viewProfile` and `lookupProfileDisplayNames` return permitted projection or safe hidden/unavailable status; batch limit **200** | **Published** |
| **Visibility and departure** | Attribute audiences or departure anonymity choice; trusted group event | `setProfileDisclosure`, `listProfileDepartures`, `anonymiseProfileDeparture`; permitted display/snapshot | **Published** |
| **Contact verification** | Authenticated request against saved contact value, fresh sign-in and verification code | `startProfileContactVerification` / `confirmProfileContactVerification`, bounded verified state or refusal | **Published** |
| **Person/group lifecycle** | Trusted `provisionProfileRecord`, departure, pause, close, group rename/disposal commands, event/command ID | Applied/duplicate result, Profile-only state transition and durable event | **Published** |
| **Rights and holds** | `openProfileRequest`, request-part outcomes, legal hold, export, erase/maintenance and host-declared parts | `exportProfileData`, request/part status/archive, Profile erasure/hold outcomes; foreign parts separately attributed | **Published v2**; **PRO-01** changes global coordinator ownership |
| **Personal channel preferences** | Self's channel/quiet-hour choices and qualified purpose, identity and Privacy decisions | Current permitted destination/channel/quiet-hour projection | **Planned PRO-02**; existing verified contact fields alone do not implement this |
| **Context-specific views** | Explicit subject, tenant/group, purpose and permitted contextual override | Revisioned, non-replicated authorised personal projection | **Planned PRO-03 extension** of existing disclosure |
| **Account claim assistance** | Identity/IAM-approved claim, Authentication proof, Authorisation decision, transfer scope, dispute/hold and version | Minimised evidence, conflict/hold and **Profile-owned** eligible transfer/denial receipt, never principal merge or credential recovery | **Planned PRO-05** |
| **Events, diagnostics and analytics** | Committed Profile state changes, delivery/maintenance calls and authorised queries | Source-owned outbox/relay, operator work, qualified technical/evidence/report projections | **Outbox and maintenance published**; cross-capability adapters **planned** |

**Current published server entry points** also include `eraseProfile` (operator/server-only), `relayProfileOutbox`, `rewrapProfileKeys`, `profileKeyVersionsInUse`, `profileTasks`, `runProfileMaintenance`, request-part settlement, request archives and legal-hold functions. Their use does not imply a public browser erasure/hold operation. Public package entry points include `@nuxt-layers/profile/contracts`, `/capability`, `/presentation` and `/tailwind.css`; other internal paths remain private.

**Published HTTP API:** `GET/PATCH /api/profile/me`, `PUT /api/profile/me/disclosure`, departure list/anonymisation, `GET /api/profile/me/export`, `POST /api/profile/display-names`, `GET /api/profile/people/:subjectId`, own requests/archive and contact verification send/confirm. The existing HTTP routes publish **no account claim/merge, privileged hold review or direct self-erasure**. Current API errors use `ProfileErrorBody` with `unauthenticated`, `forbidden`, `insufficient-assurance`, `validation-failed`, `conflict`, `rate-limited`, `unavailable`; an alternative error format requires versioned migration.

**Interactions:** commands carry the trusted actor or origin, exact target, purpose/scope, expected revision where relevant, correlation and idempotency key; queries enforce visibility at read time; committed events contain only minimally necessary identifiers, type, revision and time, with no raw contact details, exported personal records or secrets. Retry after uncertain results must check authoritative status before repeating an effect. No exactly-once distributed delivery promise. Specific ID types, deadlines and port parameters follow the published v2 contract until a deliberate revision.

## Cooperating capabilities — reciprocal input/output

Only the **necessary operation-specific context** is required; this table does **not** create mandatory imports or a universal shared context type. Source and consumer remain separately authoritative.

| Cooperator | Profile receives | Profile supplies |
|---|---|---|
| [Identity](../identity/capability-record.md) | Opaque person identity/standing, group and tenant relations, departures, closure and approved claim/link decisions | Authorised display, Profile lifecycle, restricted claim evidence and only Profile-owned transfer result; no account or membership merge |
| [Authentication](../authentication/capability-record.md) | Signed-in subject, `authenticatedAt`, assurance and protected claim-recovery proof | Limited approved attribute confirmation; never login credentials or authenticator secrets |
| [Authorisation](../authorisation/capability-record.md) | Fresh action/resource/delegation decision, scoped group/tenant permissions | Permission needs and authorised projection; a preference never grants access |
| [IAM Integration](../../compositions/iam-integration/compositions-record.md) | Identity-wide rights/closure case routing and correlation (not privacy legal eligibility or decision authority) | Profile's source-owned rights part, claim evidence, hold/export/erasure and source-only transfer disposition |
| [Privacy](../privacy/capability-record.md) and [Legal Compliance](../../capabilities/legal-compliance/capability-record.md) | Lawful purpose, consent/suppression, subject rights, retention, jurisdiction and legal holds | Profile processing evidence, restricted disclosures, own hold/rights outcomes |
| [Configuration](../configuration/capability-record.md) | Registered **non-personal** application/group defaults | Current person-owned preferences; no duplicate Profile values in Configuration |
| [Clock](../../services/clock/services-record.md) and [Localisation](../localisation/capability-record.md) | Valid instants, calendar/zone handling, locale fallback and translations | Permitted locale and time-zone preference; Profile does not implement another clock |
| [Notifications](../../services/notifications/services-record.md) | Verification send result and permitted message delivery state | Fresh purpose-scoped contact/verified value, channel/quiet hours **when implemented**; Privacy independently decides sending constraints |
| [Theme Manager](../../presentation/theme-manager/presentation-record.md) | Semantic presentation tokens and effective theme | Authorised individual presentation choices where Profile owns them; Theme Manager decides effective theme |
| [Booking](../booking/capability-record.md), [Attendance](../attendance/capability-record.md), [Employment](../employment/capability-record.md), [Gaming](../../compositions/gaming/compositions-record.md) | Domain association and source-specific rights outcome where justified | Minimum permitted personal/display fields; these domains keep guest information, workforce records and public gaming handles independently |
| [Message Queue](../../services/message-queue/services-record.md), [Scheduler](../../services/scheduler/services-record.md), [Workflow](../workflow/capability-record.md) | Relay acknowledgement, timed execution and coordinator status | Durable Profile events, maintenance tasks and Profile-only outcomes; no source-authority transfer |
| Integrations, Search and Reporting | Provenanced approved import or limited projection request | Scoped, revocable projections and invalidations; no public person-directory mirror |

**Unknown/stale/unavailable policy or standing:** no private disclosure or risky transfer. A consent or verification record is not a general-purpose access grant. If a neighbour's independent review is still draft, reconcile its final public contract before merge, particularly Privacy PR #120.

### Error normalisation, Logging, Audit and Reporting

These have **four different public responsibilities**. Profile retains the meaning and outcome of its own operations.

| Integration | Profile supplies (consumer input) | Profile receives (consumer output) | Authority and failure rule |
|---|---|---|---|
| [`error-normalisation`](../../libraries/error-normalisation/stateless-library-record.md#conceptual-public-contract-inputs-and-outputs) — pure stateless library | Stable Profile error definitions, source outcome, approved context/mapping and disclosure rules | Deterministic safe code/class, `messageKey`, public/diagnostic projection and **advisory** retry qualification | Library creates **no** logs, events, stored facts or decisions. Its contract is conceptual, not a published implemented package; current `ProfileErrorBody` stays valid |
| [Logging](../../services/logging/services-record.md) | Sanitised error code, opaque correlation, latency, degraded port/relay state | Accepted/rejected/throttled/unavailable/unknown diagnostic receipt and permitted health/diagnostic query | No raw names, addresses, exports, tokens or codes; ordinary logging failure cannot reverse a committed Profile action |
| [Audit](../audit/capability-record.md) | Risk-selected committed edits, protected disclosures/denials, access decisions, rights/holds/erasure and claim/transfer events with actor, purpose, outcome and correlation | Independent evidence custody, integrity/coverage and accepted/pending/rejected/uncertain acknowledgement | Audit owns evidence, never Profile facts. Mandatory high-risk custody uses explicit hold/refusal/reconciliation policy; Logging is no substitute |
| [Reporting](../reporting/capability-record.md) | Authorised aggregate source facts: lifecycle, verification, disclosure, rights and claim outcomes with as-of, revision, denominators and completeness | Scoped derived trends, exports, freshness and known gaps | No bulk personal directory, counting logs as authoritative outcomes, inference of identity or small-cohort disclosure; report failure does not block Profile edits |

**Delivery:** Profile commits its own state/outbox first, then the host exposes separately minimised evidence and reporting projections through versioned ports. Audit and Reporting can independently decline inputs. Error normalisation performs no asynchronous actions; diagnostics are never an implicit security or transaction decision.

## Standards, security and regulatory design

**Status:** owner-approved design references, **not** certificates of compliance. Legal applicability is determined by jurisdiction, purpose and controller with Privacy/Legal Compliance; the accepted Nuxt Layers ADRs and normative Capability Standard remain authoritative.

| Reference | Required design consequence | Applicability |
|---|---|---|
| [UK GDPR and ICO guidance](../../../RESOURCES.md#ref-f4808d92), [Data Protection Act 2018](../../../RESOURCES.md#ref-de03a85c) as amended by the Data (Use and Access) Act 2025 | Lawful purpose, minimisation, transparency, rights, restriction/erasure, retention, privacy-by-default, accountability | **Binding when applicable**; qualified by Privacy and Legal Compliance |
| ISO/IEC **27701:2025**, **29100:2024**, **29134:2023**, ISO **31700-1:2023** | Privacy management, vocabulary, impact assessment of claims/linking and privacy by design | Selected design guidance |
| [OWASP ASVS 5](../../../RESOURCES.md#ref-a1c367d2), ISO/IEC **27001:2022 / 27002:2022** | Server enforcement, secure validation, secret/key protection, tenant isolation, incident/evidence security | Governing **ASVS L2 minimum**, risk-based L3 for critical controls; ISO supporting controls |
| NIST SP **800-63A-4/B-4/C-4** and [UK NCSC IAM guidance](../../../RESOURCES.md#ref-e3eec99e) | Proofing, account claiming/recovery, authentication assurance, phishing resistance, federation | Selected identity security guidance; IAM owns decisions |
| [W3C WCAG 2.2](../../../RESOURCES.md#ref-0d1f555e), ISO/IEC **40500:2025**, WAI-ARIA 1.2; ETSI EN **301 549 V4.1.1** | Keyboard/focus/assistive-technology support, accessible recovery, errors and consent, responsive views | Governing **WCAG 2.2 AA**; additional ICT requirements where legally/contractually applicable |
| [OpenID Connect Core 1.0](../../../RESOURCES.md#ref-e11b90d4) claims, IETF **RFC 9562**, **RFC 3339**, **BCP 47**, ECMA-402 / Unicode CLDR | OIDC-compatible personal field meaning, opaque UUIDv7 IDs, valid timestamps and localised language/zone formatting | Interoperability; Clock/Localisation own time/language mechanics |
| IETF **RFC 9457**, W3C [Verifiable Credentials 2.0](../../../RESOURCES.md#ref-51933823), W3C Community Group Data Privacy Vocabulary | Possible future standard HTTP errors, independently attested claims and data-purpose vocabulary | **Optional**, subject to compatibility, threat and governance review; Community Group outputs are not W3C Recommendations |

**Required controls:** per-attribute purpose, origin, revision, visibility and retention; privacy assessment for federation and sensitive claims; server-only permission/assurance checks; current tenant/group context; safe error non-enumeration and rate limits; origin/CSRF checks; protected operator functions; bounded lookup and verification attempts; minimised Audit and separate Logging; accessible forms and localisation; versioned events. Accepted ADR-0017/0018 forbid automatic authority through tenant hierarchy and relaxation of mandatory controls through settings. Do not infer a legal erasure decision from a button or equate contact possession with identity proof.

**Persistence/provider policy:** ideal interfaces are provider-neutral; published Profile v2 requires PostgreSQL 16 and host-wrapped per-person keys. There is no insecure in-memory persistence or plaintext-key fallback. Backup/key-retirement and legal-hold outcomes need independent validation. External providers must be optional, purpose-authorised and revocable. No mandatory Redis, Elasticsearch or Neo4j dependency.

## Open-source library selection

**Owner-approved dependency policy:** use complete, current public upstream source with a genuinely permissive licence (MIT, ISC, Apache-2.0 or an explicitly selectable permissive dual-licence branch), free commercial use, active maintenance, reproducible pinned versions, reviewed transitive dependencies and no open-core flagship restriction. Repository activity is evidence of maintenance, not proof of security. Assess exact releases and licence notices again at implementation.

| Library and source | Licence | Decision and owner |
|---|---|---|
| [Zod](../../../RESOURCES.md#ref-1e3efac4) | MIT | **Retain** Profile's established contract/validation tool |
| [node-postgres / pg](../../../RESOURCES.md#ref-be910869) | MIT | **Retain** established PostgreSQL driver/transaction port |
| [libsodium.js](../../../RESOURCES.md#ref-704cdd6c) | ISC | **Conditional** vetted cryptographic primitives only if Node crypto/host key wrapper are inadequate |
| [DOMPurify](../../../RESOURCES.md#ref-975d5876) | Apache-2.0 **or** MPL-2.0 | **Conditional** untrusted rich HTML only; select permissive Apache terms, otherwise plain text and framework escaping |
| [i18next](../../../RESOURCES.md#ref-b4adce2a) | MIT | **Optional** shared Localisation/host, not a second Profile translation engine |
| [Drizzle ORM](../../../RESOURCES.md#ref-03cb5387) | Apache-2.0 | **Optional** typed SQL if justified; do not add parallel persistence authority/migration stack |
| [Pino](../../../RESOURCES.md#ref-5f05d959) | MIT | Logging-owned, not an additional Profile logging stack |
| [openid-client](../../../RESOURCES.md#ref-67858133) / [SimpleWebAuthn](../../../RESOURCES.md#ref-b7bc28fb) | MIT | Authentication/IAM-owned OAuth/OIDC and passkey functions, **not** direct Profile dependencies |
| [@js-temporal/polyfill](../../../RESOURCES.md#ref-6bd89188) | ISC | Clock-owned time semantics; reuse Clock port |

[axe-core](../../../RESOURCES.md#ref-802ea31e) is an open-source accessibility testing tool under **MPL-2.0 (weak copyleft)**, **excluded** from the *strict permissive-only* shortlist unless separately approved. Avoid source-available, delayed/community-limited, non-commercial, BSL/SSPL/AGPL and proprietary/open-core flagship dependencies. No extra infrastructure service is justified by Profile's current scope.

**Pre-adoption checks:** exact upstream source/licence and security advisories, transitive terms, Node 26/TypeScript 6/Nuxt 4 compatibility, import footprint, operational failure, and ADR-0012 single composition/50-line host budget. No packages installed during conceptual review.

## GUI and host presentation

**Approved:** Profile offers optional UI components/pages; the server contract works without presentation. Profile owns its forms and self-service workflows, while the **host** owns navigation/sidebar, route exposure, branding, authentication wiring and shell. Theme Manager provides semantic design tokens. Server-side authorisation is independent of link visibility.

**Inspected reference:** [`nuxt-layers-test/application-test-template`](../../../RESOURCES.md#ref-f1f7cc47) master (tree `8b7b142b84b5ec2379d4e2e727914fe344187d64`). Its [app shell](../../../RESOURCES.md#ref-a4ce9d0c) has a home route outside the test shell, responsive collapsible **Capabilities** sidebar with **Theme Manager → `/theme-manager`**, top Appearance menu and `/admin` dashboard. The current template does **not** include Profile; its **Not signed in** indicator is only a placeholder and Theme Manager's unauthenticated test mode is **local-only**, not a production security pattern.

**Privacy Centre boundary:** The host may direct a verified person or guest from Profile/account settings to Privacy's subject-facing Centre. Privacy owns consent, specialist rights decisions and policy; Profile retains its personal-data forms and source-owned data-rights actions. Neither user-facing link grants access to another person's case, and IAM Integration's global case routing does not duplicate Privacy's legal case authority.

**Host integration:** a Profile-derived test application adds **Capabilities → Profile → `/profile`** and optionally a tile on `/admin`; production may additionally place **My profile** in the user menu. The host composes the public Profile entry points only; do not modify the shared test template merely to document the concept.

| Screen | Purpose | Publication |
|---|---|---|
| **My Profile dashboard and details** | Summary; edit names, contact fields, locale/zone, verification and disclosure | **Published** `/profile`; richer card layout **planned refinement** |
| **Other person's permitted view** | Purpose-limited display, no existence leak | **Published** `/profile/people/:subjectId` |
| **Departures** | Former group display/anonymity | **Published** `/profile/departures` |
| **My data and requests** | Open/check allowed requests, permitted download and route to closure | **Published** `/profile/requests`; global IAM case progress **planned** |
| **Contact preferences** | Channel and quiet-hour choices; clearly distinguish Privacy consent | **Planned PRO-02** within Profile, no current dedicated endpoint |
| **Claim a duplicate/orphan account** | Private claim, step-up, dispute, review and status | **Planned PRO-05**, owning journey in Identity/IAM; no current Profile claim route |
| **Account closure** | Protected host/IAM closure and rights journey | Published Profile provides **host-owned `closeAccount` route link**, not direct erasure |
| **Privileged rights/hold and claim review** | Restricted source-part, legal-hold and disputed-claim review | **Planned separate operator console**, server-only ports, never an ordinary Profile tab |

Existing public presentation includes `ProfilePersonName`, `ProfileGroupName` (override by host), `useProfile` and related composables. The published options `profile.presentation: false` and `profile.pages.enabled: false` disable optional UI or pages without disabling headless services; page paths can be configured.

**Presentation acceptance:** responsive sidebar, clear forms, screen-reader announcements, keyboard/focus and reduced-motion support; WCAG 2.2 AA and BCP 47 locale handling; semantic Theme Manager CSS in light/dark; version conflicts and errors in plain language; sensitive actions with recent sign-in; no private values in titles, analytics or logs; clear pending/held/partial rights results; safe names placeholder and browser cache clearing on account switch. Operator permissions and tenant scope are enforced on the server.

## Representative acceptance cases

| Scenario | Required result |
|---|---|
| Trusted provisioning replay | One protected person record; stable idempotent repeat; no resurrected erased identifier |
| Self edit versus stale revision | Valid edit commits/revisions; stale version conflicts without lost update |
| Hidden name, paused group or unknown standing | Safe non-disclosing projection; no unauthorised existence leak |
| Parent-tenant operator attempts child person's private contact | Refused without independently authorised exact permission and purpose |
| Contact changed after challenge issued | Previous code invalid; no false verification or delivery permission |
| Disclosure versus consent | Visibility choice alone never authorises Notifications to send |
| Profile rights part completes before Booking part | IAM global case remains incomplete; source outcomes separately evidenced |
| Closure with active lawful hold and retained backup | Ordinary access denied; only qualified source disposal/exception recorded, no false universal erasure |
| Duplicate claim based on matching email | No candidate enumeration, silent linking or automatic transfer |
| Verified disputed duplicate claim | Strong proof, independent review, source-specific transfer/hold, recorded notice and appeal, no credential takeover |
| Group departed/disposed event replay | Stable permitted attribution and lawful retention/disposal |
| Database, key wrapper, policy or Clock outage | Typed unavailable/held; no plaintext or stale-authority fallback |
| Accountless Attendance guest | No mandatory permanent Profile record |
| Mandatory Audit custody unavailable | Explicit risk-selected refusal/held/reconciliation state; no substitution by Logging |
| Reporting or routine Logging unavailable | Committed Profile operation remains authoritative; independent qualified diagnostic/report status |
| Host disables Profile pages | All authorised headless public services remain functional |
| Derived app opens Profile via sidebar | Correct `/profile` page, theme, sign-in and responsive/accessibility behaviours |

These are **conceptual acceptance criteria**, not reports of executed tests. CI and the user validate implementations; no local builds/tests are performed here.

## Completeness, integration gaps and handover

**Conceptual coverage:** the owner-approved PRO-01–PRO-05 principles, independent boundary and lifecycle, input/output surfaces, neighbours' reciprocal responsibilities, security/privacy and standards, dependency policy, optional GUI and test-host layout, error-normalisation/Logging/Audit/Reporting roles and representative acceptance scenarios are specified. Prior decisions for Configuration CFG-05–08, Notifications NOT-01–10, Attendance ATT-09/10, Booking and Authentication AUT-11 are respected as separate owners' decisions, not silently recast as independently approved Profile implementation contracts.

**Still required before calling the review fully complete:**

1. **Implementation contract alignment:** design a backwards-compatible move from published Profile multi-part rights coordination to IAM Integration global coordination, and specify versioned PRO-02 channel/quiet-hour, PRO-03 contextual-view and PRO-05 claim/transfer inputs, outputs and status semantics. Verify the exact shared ADR-0012 access-decision/caller shapes and the published `CONTRACT.md` against the target version. No new Profile HTTP route may be claimed shipped without implementation evidence.
2. **Safety detail:** qualify claim proof thresholds, contested-case arbitration, appeal, notice and source-owner transfer/rollback; distinguish live, backup, derived and held erasure; verify per-person key retirement, event privacy, safe asynchronous outcomes and mandatory Audit receipt policy.
3. **Parallel review reconciliation:** verify reciprocal contracts with independently reviewed neighbours, notably Privacy draft PR #120, plus Logging, Audit, Reporting and the error-normalisation library; preserve their established public authority and avoid merge collisions.
4. **Technical and architectural validation:** recheck `architecture-rules/master`, blueprint `master`, accepted ADR status, PR conflicts, source/contract revisions, relevant CI, host's **single composition/50-line budget**, security/accessibility acceptance and versioned compatibility. CI/user run tests. Never infer validation from GitHub's mergeable flag alone.
5. **Owner-controlled merge:** keep PR #123 **draft and unmerged** until explicit final approval and required checks. The conceptual decisions are approved; this is **not yet a validated implementation or complete PR handover**.

**Working-document discipline:** all subsequent accepted Profile findings go into the appropriate existing section of this canonical record, replacing superseded language. Update only materially affected reciprocal records with bounded changes and reconcile active parallel reviews before merge; do not accumulate duplicate historical notes.

## Theme Manager reciprocal design — 23 November 2026 (draft PR #142)

**Status: Theme Manager TM-03 owner-approved conceptual neighbour interface (23 November 2026); this does not revise Profile's separately approved decisions or prove implementation.** [Theme Manager's owner-approved conceptual contract](../../presentation/theme-manager/presentation-record.md) owns theme vocabulary, effective resolution and validity; Under approved TM-03, Profile owns optional per-person, per-scope cross-device selected-theme **reference** persistence with consent and revision, never effective theme or its definition. Theme Manager checks current readability, permission, scope and accessibility and owns selection precedence/application; unavailable or revoked preferences fall back to session-only/default behaviour. Current Theme Manager instead uses a browser cookie and host-managed cross-device choice. A future public interface must reconcile Profile's published contract. No package cycle or implicit cross-tenant preference inheritance.

## User presentation reciprocal note (23 November 2026)

**Status: proposed, not an implemented interface or an approval of the User review.** [User conceptual presentation](../../presentation/user/presentation-record.md) consumes this capability's **published, source-owned** public read and guarded command/status interfaces for an accessible, group-scoped administrative dashboard. Profile alone owns personal attributes, contact verification, visibility and purpose-restricted disclosure; User may render only fresh authorised projections, never a duplicate directory, sign-in identifier or implicit member-wide contact disclosure. Missing, denied or stale owner outcomes fail closed. The User presentation owns no business state, authoritative events or outbox; contract dependency direction remains via host composition, not a reciprocal package import. Exact public wiring is subject to implementation contract and independent acceptance.

## FAC-D01 — Party authority

[Party](../party/capability-record.md) owns scoped legal/commercial party references, not canonical Profile descriptors. Profile supplies only purpose-authorised descriptive/contact projections by opaque reference. Party may own minimised necessary accountless contact facts only where no existing owner supplies them; no copying a canonical Profile or global cross-tenant matching.
