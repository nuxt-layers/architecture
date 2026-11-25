# Verification — conceptual capability specification

**Capability:** `verification` (exact directory); **proposed Platform** responsibility, headless first with optional presentation.  
**Conceptual status:** **Complete; owner-approved principles and design direction through 23 November 2026.** VER-01–VER-12, the seven additional dispositions, public input/output model, standards/library guidance, four cross-cutting interfaces and host GUI direction have been approved in this review conversation. Exact runtime signatures, profiles, provider choices and non-production test evidence remain **implementation work**, not conceptual blockers.  
**Implementation:** No independently verified `nuxt-layers/verification` repository, root `CONTRACT.md`, released API, provider certification or operational acceptance. This is a **non-normative blueprint**, subordinate to accepted ADRs, normative standards and subsequently approved implementation contracts.  
**Opening authority:** `architecture-rules/master` `d7f7c2ee051244b8c81325f5ff1267568d99aab1`; blueprint `master` `8874cccf2f4faaa23b765a9a0a377a77951bc3da` (revalidate before merge).  
**Evidence:** Identity, age and eligibility (former review: identity age eligibility assurance) · International jurisdictions (former review: verification international jurisdictions) · [Draft PR #148](https://github.com/nuxt-layers/architecture-blueprint-review/pull/148).

## Purpose, authority and exclusions

Verification assesses evidence about people, organisations, age thresholds, representation and attributed claims, then publishes **purpose-limited, provenance-qualified findings**. It owns requests, challenges, local issuer/method trust evaluation, its own attestation/status lifecycle, rechecks, restricted evidence references, disclosure decisions within its remit and attributable histories. It owns **no national register, original external fact or general identity dossier**. A valid proof or issuer signature is not necessarily an accurate current fact, legal mandate, acceptable age-assurance method, entitlement or authorisation.

Identity owns local principals, tenants, groups and membership; Authentication owns sessions and authentication assurance; Authorisation owns access decisions; Credentials owns locally issued credentials and their registry; Assessment owns marking/admission, Training achievement, Qualification awards, Marketplace seller standing and Recruitment hiring. Legal Compliance qualifies legal duties; Integrations/host owns provider transport and secrets. Federation transports assertions but cannot transfer trust from one Node/Hub to another. **No generic `verified: true` flag, worldwide trust score, cross-party identity tracker or automatically portable permission.** Age assurance is a claim type, not an independently required layer.

A bounded service owning trust decisions and history is a capability, not a stateless library. Framework, repository, Nuxt adapter and deployment remain separate choices (ADR-0001/0009/0012/0016). Native operation must not depend on a commercial provider or GUI.

### Approved principles (VER-01–VER-12)

| ID | Owner-approved principle | Consequence |
|---|---|---|
| VER-01 | Separate Verification from Identity, Authentication and Authorisation | Proofing does not create principal, session or access rights |
| VER-02 | Verification is a candidate capability | Reuse bounded evidence/trust lifecycle; no implementation mandate |
| VER-03 | Identity, age, representation and eligibility are distinct claims | Claims carry method, purpose, assurance and independent limits |
| VER-04 | Minimise raw identity documents | Prefer qualified attestations and restricted source references |
| VER-05 | Issuer, method, assurance, validity, provenance and revocation matter | No anonymous, timeless or binary proof status |
| VER-06 | Multiple providers and methods | Explicit alternative routes, provider-absence and refusal semantics |
| VER-07 | Standards-based profiles where appropriate | Evaluate, do not universally mandate, VC and OpenID profiles |
| VER-08 | No automatic portable membership or merchant standing | Receiving domain and local IAM decide independently |
| VER-09 | Each receiving Node judges trust locally | No transitive Federation/Hub authority |
| VER-10 | Bounded status freshness and re-verification | Risk-specific rechecks, expiry and invalidation |
| VER-11 | Privacy-preserving threshold/age proofs | No default real-name disclosure or cross-party tracking |
| VER-12 | Legal age-assurance efficacy is distinct from cryptographic correctness | Legal Compliance qualifies legal method effectiveness |



## Native service, records and lifecycle

**Authoritative records:** scoped request/challenge, assessment and attestation; issuer/verification policy evaluation and revision; evidence pointers and retained minimal proof; source-status observations with freshness; appeals/rechecks and linked corrections; committed state transitions and outbox history. Store records via a Verification-owned schema and host-supplied persistence port. Source documents, civil/business facts, credential issuance and domain eligibility stay with their owning authorities.

**Native steps:** accept authorised purpose-specific request → offer approved, accessible methods and anti-replay challenge → validate proof/issuer/subject, evidence source and bounded trust policy → issue qualified attestation **or** refused/unsupported/indeterminate outcome → serve authorised status/recheck/revocation → publish committed changes. Local proof checks may operate without an external service **only where substantiation is defensible**; otherwise state unsupported/unknown. No provider absence may lower a security or legal floor.

**States:** request `created → pending challenge/presentation → assessing → qualified | refused | indeterminate | cancelled`. Attestation `issued → active → suspended | expired | revoked | superseded`; re-verification generates a linked new version. Trust policy `effective → revised | suspended | withdrawn` with versioned time. Historical decisions remain visible as *then known*, not silently rewritten. Assess separately source-document validity, signature/key status, issuer mandate, holder binding, source fact, local reliance scope, status freshness and receiving domain permission.

**Failure and recovery:** classify invalid, expired, revoked, suspended, unsupported, unavailable, indeterminate, stale and contradictory evidence without equating these with verified success. Challenge replay fails; repeated commands are idempotent. Remote timeout cannot establish whether a provider committed: preserve pending/uncertain result and reconcile. Emergency key compromise or provider withdrawal can suspend affected assessments, trigger bounded recheck and notify authorised consumers; overdue background tasks are detected on read. Offline acceptance is allowed only within explicit risk-based time bounds. Review/appeal is distinct from domain eligibility appeal.

## Contract-wide invariants

Across applicable commands and queries carry: trusted tenant/organisation, subject or holder binding, claim type/value or threshold, purpose and relying audience, independently established caller/Authentication assurance and server-side Authorisation result, policy revision, jurisdiction, method/issuer/evidence provenance, correlation/idempotency and Clock-defined occurred/observed/checked/effective/expiry times. **No universal request DTO is mandated.** Each result states whether it is accepted, committed/completed, refused or unknown; version, claim scope, source status, freshness, caveats and disclosure limits are never silently discarded. Cross-tenant, cross-purpose and cross-audience use is denied unless independently authorised and lawful. A received event alone never authorises an operation.

## Idealised public input contract (owner-approved conceptual VER-I01–I10)

These are **business-level surfaces, not deployed endpoint names**. Caller requests alone do not authorise themselves. Unless indicated otherwise, lack of required trust/permission yields refusal or `indeterminate`, never a positive claim.

| Interface / source and supplied facts | Purpose, owner and validation/absence semantics |
|---|---|
| **VER-I01 OpenVerification** — authorised holder or relying domain: subject reference, requested claim/threshold, purpose, audience, jurisdiction, policy, acceptable methods, expiry | Verification owns request/challenge; check caller authority, legal purpose, threshold validity, subject binding and policy. Unsupported claim/absent policy → unsupported/denied; no inferred consent |
| **VER-I02 SubmitPresentation** — holder or approved proofing service: challenge, signed/attributed assertion, evidence class and binding, issuer/key/method, source times | Verification checks challenge, schema, authenticity, issuer, holder, scope, duplicate/replay and provenance. Untrusted/mismatched/stale/contradictory proof → refused or indeterminate; raw documents minimised |
| **VER-I03 EvaluateIssuerTrust** — Assessment, Credentials, Qualification or other relying domain: named issuer/source, authenticated evidence, intended use, audience/institution, jurisdiction, required assurance and policy revision | Verification owns **qualified trust finding**, including issuer identity and supported scope/mandate; domain owns acceptance of result, degree/mark, formal recognition or award. Missing trustworthy status → indeterminate, not sufficient |
| **VER-I04 VerifyClaim/Threshold** — authorised relying domain: precise age threshold/band, identity or representation claim, method requirements, audience and acceptable recency | Verification checks presentation or attestation only for the requested scope; rejects unsupported threshold and audience mismatch; returns minimised assertion, not full DOB or dossier by default |
| **VER-I05 CheckAttestationStatus** — authorised relying party: attestation reference, audience, status freshness/risk bound and effective time | Verification evaluates its status plus required source/issuer revocation. Unknown, unavailable, past-bound check or exceeded maximum staleness → indeterminate/stale; no fallback to valid |
| **VER-I06 RecheckOrChallenge** — authorised holder/domain/operator: attestation ID, changed circumstance, corrective evidence, recheck reason | Verification owns new evaluation/version, dispute flag and linked outcome. Original event and source evidence not silently overwritten |
| **VER-I07 ManageTrustPolicy** — privileged issuer-risk administrator: trusted issuers/keys, methods, claim scope, reliance conditions, effective dates and incident constraints | Verification validates actor/approval, non-weakening floors, source, policy revision and tenant/risk scope. Unreviewed trust expansion cannot silently take effect |
| **VER-I08 SuspendRevokeSupersede** — authorised operator, qualified issuer status or holder withdrawal: target, reason, effective time, provenance | Verification changes **its own** attestation status, not an independently issued credential/source record; replays idempotent, contradictory evidence routes to investigation |
| **VER-I09 ProviderEvidencePort** — Integrations/host: authenticated provider response, external issuer identity, provider request reference, observed/effective timestamps, revocation data, error/fees | Integrations owns transport/authentic callback and secret handling; Verification owns admissibility and trust. Unavailable/rate-limited/malformed/late source → pending/indeterminate/reconciliation |
| **VER-I10 RightsAndEvidenceOperations** — qualified data subject/controller/legal process: access, correction, erasure, export, retention hold, appeals and lawful basis | Verification validates requester, purpose and legal constraints; fulfils only its records; never promises deletion of externally controlled evidence or lawful audit holds |

An originating event from another capability is untrusted input until authenticated, authorised, semantically validated and reconciled with authoritative state.


## Idealised public output contract (owner-approved conceptual VER-O01–O09)

| Output and permitted consumers | Meaning, guarantees, limits and disclosure |
|---|---|
| **VER-O01 Request/challenge result** to holder or authorised relying domain | Request ID, required method/claim, audience, challenge expiry, pending/refused/unsupported status; no implication of verification completion |
| **VER-O02 QualifiedAttestation** to authorised same-purpose relying party | Claim semantics/value (e.g. `age >= 18`), opaque subject binding, issuer, evaluated method/assurance, scope/audience, policy/version, source and check times, expiry, caveats, revocation reference; *never* implicit access/merchant eligibility |
| **VER-O03 IssuerTrustEvaluation** to requesting domain | `sufficient | insufficient | rejected | indeterminate`, scoped issuer/source authenticity and verified mandate if actually substantiated; provenance, trust policy revision, signature/key and status observations, freshness and restrictions. Not proof of examination/award authority |
| **VER-O04 StatusResult** to authorised relying party | `valid | invalid | expired | revoked | suspended | unsupported | unavailable | indeterminate`, last check, staleness bound, evaluation time and reason; `valid` only in declared claim/scope/time, not universal fact |
| **VER-O05 DomainEvidenceHandoff** to Assessment, Qualification, Credentials, Marketplace, Recruitment, Publisher or other consented domain | Minimal purpose-limited evidence packet, method, caveats and effective time; receiving owner makes domain acceptance and subsequent action decision |
| **VER-O06 Review/recheck result** to holder, authorised reviewer and related relying owner | New version, dispute/appeal state, reason code, original/new relationship and necessary invalidation; no hidden deletion of prior decisions |
| **VER-O07 Committed lifecycle events** to approved subscribers through capability-owned durable outbox | `VerificationRequested`, `AttestationQualified`, `AttestationRefused`, `AttestationSuspended`, `AttestationRevoked`, `AttestationExpired`, `IssuerTrustChanged`, `RecheckRequired`; schema/version, reference, scope and time, **no raw evidence**. Delivery can repeat/out-of-order; consumers deduplicate and re-evaluate |
| **VER-O08 Data-rights/reporting projections** to authorised controller/data subject/Reporting | Purpose-limited, minimised case/status aggregates and lawful exports with redaction; never broad public claimant search |
| **VER-O09 Provider health/expense and operational diagnostics** to authorised operations, Audit/Logging/Observability | Reconciliation state, failure class, provider attribution, measured cost and correlation, excluding evidence secrets; provider receipt is not human/legal acceptance |

Queries must disclose authorised scope, provenance, effective/check times and whether the view is complete or derived; they cannot turn unknown into false or old data into current proof. Commands return **accepted vs committed/completed** distinctly with idempotent retry and recoverable error code. Events express committed owner facts only, never an exactly-once distributed guarantee.


## Cross-capability public inputs and outputs

The following are **logical host-composed ports/events**, not automatic package imports. Required decisions fail closed when absent; optional cooperation degrades only its feature. Contract and Nuxt-extension edges must remain acyclic.

| Partner | Verification receives | Verification supplies; authority and absence |
|---|---|---|
| **Identity** | Trusted opaque principal, tenant, membership and controller references | Evidence of identity/representation; Identity alone owns standing, membership and tenant recovery |
| **Authentication** | Holder/session binding, authentication assurance and recency | Proofed attributes, **not** credentials or sessions; protected operations demand adequate independently checked assurance |
| **Authorisation** | Trusted server-side actor/resource/action decision | Qualified claim/status for subsequent decisions; missing authorisation → deny/hold |
| **Configuration / Privacy / Legal Compliance** | Effective versions of allowed methods, purpose, lawful basis, disclosure, retention, jurisdiction and mandatory floors | Assessment/evidence for policy and rights operations; absence of essential legal/scope permission → hold, not local rule invention |
| **Credentials** | Issuer-owned credential content and public revocation/status evidence | Authenticity, local scope/trust/freshness of presentations; no duplicate issuer register or credential revocation |
| **Assessment / Course / Training / Qualification** | Intended instrument/use, source issuer/centre, recognition or mandate context | `EvaluateIssuerTrust`: scoped sufficient/insufficient/rejected/indeterminate with source, issuer, method, effective time, freshness and caveats; Assessment owns grades and external evidence admission, Training achievement and Qualification award authority |
| **Marketplace / Recruitment / Publisher / Attendance / other domains** | Their legally justified age/KYB/representation/guardian checks and relying purpose | Minimal qualified attributes for **their** seller, hiring, content and safeguarding decisions; no automatic domain acceptance |
| **Integrations / external issuers** | Authenticated attributed provider assertions, callback/source status, error/cost and effective/observed timestamps | Provider verification/recheck requests and reconciliation needs; no assumed positive result on outage |
| **Federation / Node / Hub** | Remotely presented assertion, issuer and peer provenance | Local trust evaluation only; recipient Node independently checks issuer, audience, holder, status and rights |
| **Workflow / Scheduler / Notifications / Message Queue / Clock** | Optional review coordination, due triggers, delivery feedback, outbox transport and temporal semantics | Recheck/appeal work requests, notification intents and durable committed changes; Verification still owns decisions/status |
| **Error Normalisation** (stateless library) | Verification supplies approved versioned source error definitions, failure truth, safe context, mapping and disclosure profile | Pure safe code, category, message key and *advisory* retry classification; library cannot change outcomes, create retries or retain state |
| **Logging** | Verification supplies sanitised structured provider/process diagnostics, safe correlation, source and severity | Accepted/rejected/throttled/uncertain logging receipt, authorised diagnostics and sink health; no source evidence, raw documents or assurance from log receipt |
| **Audit** | Verification supplies **accountable** trust decisions, qualified claims/revocations, policy changes, privileged evidence access and appeals with outcome, actor, tenant, revision and times | Evidence intake/receipt, integrity/completeness and authorised histories; Audit never verifies the underlying person/claim. For mandatory evidence, failed intake follows fail-closed/approved recovery policy |
| **Reporting** | Verification supplies authorised minimised status/read models, revision, as-of/check times, coverage, unknowns and correction events | Derived report/runs, trends, exports, freshness/lineage and limits; no private table access, unqualified success count or dependency on Reporting for native checks |
| **Observability** | Minimal metrics/traces and technical health | Monitoring feedback, not verification fact or accountable evidence |

**Separation example:** Provider timeout → Verification records `indeterminate/unavailable`; Error Normalisation produces a safe message; Logging records the fault; Audit receives an evidence-qualified event only where needed; Reporting later counts affected requests with unknown/freshness made explicit. None can convert the failure to success. Verification publishes through its **own durable outbox**; Message Queue may transport events, with duplicates/reordering handled by consumers. Business delivery and evidence receipts are separate acknowledgements.

## Provider selection, privacy, assurance and compliance

Use multiple replaceable local/remote methods selected by claim, jurisdiction, relying purpose, policy, effectiveness, accessibility and cost. Transport, keys, billing and external contracts belong to host/Integrations; Verification owns evaluation and policy. Migration/withdrawal must preserve evidence provenance and require rechecks when methods differ. Issuer admission and trust-root changes require effective versioning, scoped privileged approval and emergency withdrawal, never transitive Hub trust.

Prefer externally held originals and minimal locally retained attestations, especially for national IDs and biometrics. Any sensitive original held locally requires its own justified custody, controller/processor allocation, encryption, authorised access, retention, deletion and jurisdictional transfer assessment. Restrict reuse to approved purpose, audience and lawful basis. Avoid linkable identifiers/status callbacks across unrelated relying parties. Protect against forged evidence, replay, compromised keys, spoofing, fraudulent representation, provider surveillance, tenant enumeration, coercion and inaccessible mandatory methods; provide accessible alternatives and independent evidence reconsideration.

Security follows governing OWASP ASVS 5.0 Level 2 plus relevant Level 3 controls, least privilege and strong server-side assurance; privacy follows minimisation, storage and rights requirements, UK GDPR/GDPR where applicable. Legal Compliance owns interpretation of UK Online Safety/Ofcom, DVS, eIDAS and other local obligations with effective dates; **protocol validation does not establish statutory efficacy, certification, lawful transfer or permission**. Expose documented unsupported jurisdictions and qualified unknown outcomes rather than promise universal compliance. Future implementation publishes `CONTRACT.md` and `STORAGE-REGISTER.md` and documents any cookies, caches, third-party processing and lawful holds.

## Standards and trust-framework references

**Approved conceptual guidance, not a universal implementation protocol or certification.** Pin version and effective date for each selected profile; regularly revalidate jurisdictional applicability. Architecture-governing accepted ADRs and normative standards take precedence.

| Source / version | Design relevance and disposition |
|---|---|
| [W3C Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model/), W3C Data Integrity and JOSE/COSE securing recommendations (May 2025) | **Preferred portable-claim conceptual model**: issuer, holder, subject, scope, verifiable proof and provenance. Optional interoperable credential formats; not mandatory for every native/provider check |
| [W3C Bitstring Status List 1.0](https://www.w3.org/TR/vc-bitstring-status-list/) (May 2025) | Preferred **eligible** privacy-preserving credential status/revocation pattern; suitability and maximum status staleness depend on policy |
| [OpenID4VP 1.0](https://openid.net/specs/openid-4-verifiable-presentations-1_0-final.html) (July 2025), [OpenID4VCI 1.0](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-final.html) (September 2025), [OpenID4VC HAIP 1.0](https://openid.net/specs/openid4vc-high-assurance-interoperability-profile-1_0-final.html) (December 2025) | Selectable wallet presentation, Credentials-owned issuance and high-assurance interoperability **profiles**. Verification should not become credential issuer by adopting issuance protocol |
| [IETF RFC 9901](https://datatracker.ietf.org/doc/rfc9901/) (November 2025) | Selective-disclosure JWT mechanism; age-band, threshold and purpose-minimised proof where the chosen credential profile supports it |
| [ISO/IEC 18013-5:2021](https://www.iso.org/standard/69084.html), ISO/IEC TS 18013-7 | Mobile driving licence and remote presentation evidence; optional source adapters with local issuer trust and holder/audience checks |
| [NIST SP 800-63-4](https://csrc.nist.gov/pubs/sp/800/63/4/final), [63A-4](https://csrc.nist.gov/pubs/sp/800/63/A/4/final), 63B-4, 63C-4 (July 2025) | Assurance vocabulary, identity-proofing evaluation and federation boundaries. 63B authentication assurance belongs to Authentication; identity-proofing levels are not session assurance |
| [ISO/IEC TS 29003:2018](https://www.iso.org/standard/62290.html), [ISO/IEC 30107-3:2023](https://www.iso.org/standard/79520.html) | General identity-proofing and biometric presentation-attack testing; biometric standards apply **only** where biometrics are deliberately used |
| [UK Digital Verification Services Trust Framework 1.0](https://www.gov.uk/government/publications/uk-digital-verification-services-trust-framework-1-0), [GPG 45 v1.0](https://www.gov.uk/government/publications/how-to-check-someones-identity-1-0) (2026) | UK trust/certification, approved identity methods and evidence confidence; map exact effective version, service role and UKAS certification applicability. Transition from statutory gamma 0.4 must be considered |
| [Ofcom highly effective age assurance guidance](https://www.ofcom.org.uk/online-safety/protecting-children/age-assurance) | For legally relevant UK age checks, evaluate technical accuracy, robustness, reliability, fairness, accessibility and effectiveness, not just valid signed proofs |
| [EU eIDAS as amended by Regulation (EU) 2024/1183](https://ec.europa.eu/digital-building-blocks/sites/pages/viewpage.action?pageId=915932148), EUDI Wallet implementing acts and [EU age-verification blueprint](https://ec.europa.eu/digital-building-blocks/sites/pages/viewpage.action?pageId=930451135) | EU electronic-identity trust, wallet and selective-disclosure profiles; applicability, issuer registers and effective dates are jurisdiction-/service-specific |
| [ETSI TS 119 461](https://www.etsi.org/standards), [ISO/IEC 27001:2022](https://www.iso.org/standard/27001), [ISO/IEC 27701:2025](https://www.iso.org/standard/27701), [ISO/IEC 29100:2024](https://www.iso.org/standard/85938.html) | Trust-service identity proofing, security governance, privacy management and privacy design; framework alignment does **not** assert certification |

**Contract mapping:** VER-I01/I04 receive proof purpose, confidence, method and jurisdictional policy; I02/I09 validate credential/profile, presenter binding, authenticity and provenance; I03/I07 evaluate local issuer assurance, trust lists and mandates; I05/I08 apply freshness, status/revocation and emergency change; I10 manages lawful privacy rights. VER-O02/O03/O04/O05 preserve typed claim, evidence profile and policy version, assurance, scope, checked/effective/expiry times, caveats and qualified status; VER-O07 publishes minimised committed status changes. **Neither standards selection nor a successful cryptographic check may turn source truth into a business decision.**

**Adoption priority:** baseline selected semantic and assurance concepts now; defer concrete credential/wallet cryptographic wire profile and certifications until there is a demonstrated interoperability or legal requirement. Legal Compliance must qualify region/service obligations, not hard-code one country's rule into the Verification core. Maintain updated standards evidence and record any locally binding legislative or certification profile separately.


### Conditional international deployment profiles

Earlier jurisdiction research identifies China national internet identity credentials (2025 service; [official CAC measures](https://www.cac.gov.cn/2025-05/23/c_1749711107835487.htm)), sector-specific minors/real-name duties and PIPL/cross-border constraints; Russia Gosuslugi/MAX age-check mechanisms, 436-FZ/149-FZ and 2025 localisation amendments; Saudi Nafath/Absher national identity, PDPL and e-commerce/merchant standing. These are research examples, not verified present-day legal conclusions or selected providers. A technically valid national claim cannot establish local legal applicability, permission, anonymity or lawful overseas hosting. Use qualified age/merchant attributes where lawful, separately resolve required real-name evidence, residency/transfers, issuer trust and permitted disclosures. Each Node independently validates issuer/audience/subject binding, revocation and freshness; Hub trust is not transitive. Recheck national law, service category, enforcement date, onboarding/availability, child safeguards, accuracy/accreditation and transfer/retention obligations at deployment. No universal provider, compelled account linkage or assumption of zero-knowledge support.

## Open-source library guidance

**Approved selection direction, not installed dependencies.** The requirement is complete community source, free commercial use and permissive licensing; confirm release-specific and transitive obligations. Source availability and advertised licences were checked against the linked public projects; transitive dependencies, release tags, security posture and compatibility must be revalidated at selection. Do not equate a free hosted tier or partially source-available enterprise distribution with a qualifying library. MIT, Apache-2.0 and BSD-3-Clause are acceptable subject to attribution/NOTICE/patent provisions.

| Candidate / source | Licence | Appropriate role | Disposition |
|---|---|---|---|
| [panva/jose](https://github.com/panva/jose) | MIT | Mature JWS/JWT/JWE/JWK/JWKS crypto formats | **Preferred narrow crypto building block**; key governance and trust semantics remain with Verification/host |
| [ajv-validator/ajv](https://github.com/ajv-validator/ajv) | MIT | JSON Schema validation of versioned requests/provider responses | **Preferred** at externally published boundaries |
| [panva/openid-client](https://github.com/panva/openid-client) | MIT | Higher-level OAuth 2/OIDC provider integration | **Conditional**; do not duplicate Authentication. [oauth4webapi](https://github.com/panva/oauth4webapi), MIT, is a lower-level *alternative*, not automatic second dependency |
| [openwallet-foundation-labs/identity-common-ts](https://github.com/openwallet-foundation-labs/identity-common-ts) | Apache-2.0 | SD-JWT and OpenID4VC low-level credential building blocks | **Preferred interoperability candidate**, subject to post-September 2026 consolidation API/release stability review |
| [openwallet-foundation/credo-ts](https://github.com/openwallet-foundation/credo-ts) | Apache-2.0 | Full OpenID4VC, VC and identity-agent framework | **Conditional architecture comparison** if wallet/agent functionality genuinely required; avoid taking on its wider framework lifecycle without justification |
| [decentralized-identity/veramo](https://github.com/decentralized-identity/veramo) | Apache-2.0 | Extensible verifiable-data and DID platform | **Alternative**, not required baseline; possible overreach for narrow trust service |
| [Sphereon OID4VC](https://github.com/Sphereon-Opensource/OID4VC) | Apache-2.0 | OpenID4VC issuance/presentation protocol components | **Conditional alternative**; evaluate package release maturity and compatibility before choosing |
| [digitalbazaar/vc](https://github.com/digitalbazaar/vc) / [jsonld.js](https://github.com/digitalbazaar/jsonld.js) | BSD-3-Clause | W3C VC and JSON-LD processing | **Conditional format adapter**; check exact version, VC model and security suite support (VC code documents earlier VC 1.0 behaviour) |
| [openwallet-foundation-labs/mdoc-ts](https://github.com/openwallet-foundation-labs/mdoc-ts) | Apache-2.0 | ISO 18013 mobile document verification | **Conditional** only when an mDL/mDoc provider is required |

**Maintenance warning:** `openwallet-foundation/oid4vc-ts` and `openwallet-foundation/sd-jwt-js` explicitly ended standalone feature development in **September 2026** following migration into Identity Common TS; do **not** select their old repositories as newly maintained foundational dependencies merely because their existing releases remain available.

**Preferred minimal starting stack:** use `jose` + `Ajv` for claims with standard JWT/JSON proof formats; reuse existing Authentication/Integrations public ports; add either Identity Common TS *or* one compatible specialised OpenID4VC implementation only when selected credential profiles require it. Prefer narrowly scoped libraries before Credo/Veramo-sized frameworks. Use PostgreSQL through the capability-owned persistence port for local request, attestation, status and historical records; no Redis, Elasticsearch, Neo4j or proprietary verification platform is required.

**Ownership restrictions:** libraries supply cryptographic operations, format validation and optional protocols, **never** issuer accreditation, effective local trust policy, legal sufficiency, source authority, age-assurance efficacy, consent, eligibility, access or claim-lifecycle decisions. Credential issuance remains with Credentials. No open-source library alone guarantees current authoritative civil/organisation records, regulated proofing or free provider access.

**Selection acceptance gate:** verify exact selected release licence and complete source parity (no commercial-core feature split), transitive dependency licences, reproducible tagged builds, maintained releases/security policy, Node 26/TypeScript 6 fit and package provenance; independently evaluate proof/status/replay and negative paths using CI/user-owned tests, not assistant-run local tests. Keep core provider-neutral, optional adapters replaceable, and avoid a single framework owning multiple capability boundaries.


## Presentation and host integration

**Approved conceptual direction:** headless core; optional restricted management and holder screens. Actual reference: [application-test-template](https://github.com/nuxt-layers-test/application-test-template) `master` has `/` without sidebar, shared collapsible **Capabilities** sidebar for non-home routes, Theme Manager at `/theme-manager`, and launcher cards on `/admin`. [Theme Manager `CONTRACT.md`](https://github.com/nuxt-layers/theme-manager/blob/master/CONTRACT.md) documents its public presentation vocabulary and presently incomplete independent host-composition integration. These are **reference patterns**, not Verification implementation contracts. Its unauthenticated local test mode must not be used for real proofing data.

**Host responsibility:** Compose a Verification public headless port once (ADR-0012), supply authorised caller/tenant/Clock/provider/persistence inputs, optionally expose a **Verification** sidebar link and `/admin` launch card, and select route prefix. An illustrative `/verification` opens the capability dashboard in the existing responsive, themed host shell. Verification owns its screens and published public queries/commands, not navigation or another tenant's session. Host may enable headless-only or contextual proof widget without a standalone dashboard. All final paths, permission identifiers and Nuxt exports await implementation.

| Screen (illustrative prefix `/verification`) | Audience and public contract |
|---|---|
| **Dashboard** `/` | Permitted case summary, urgent review/recheck, expiry, freshness and provider status from VER-O01/O04/O06/O09; no sensitive dossier |
| **Requests** `/requests`, **New** `/new` | Authorised bounded request search, purpose/claim/method selection, initiate VER-I01 and display VER-O01 |
| **Case detail** `/requests/:id` | Minimal VER-O02/O03/O04 status, scope, provenance, checked time and caveats; permitted VER-I05 recheck |
| **Evidence review** `/reviews` | Qualified staff only: VER-I02/I06, indeterminate evidence, secondary review and attributable decisions |
| **My verifications** `/mine` | Holder-only claim status, disclosures, correction or appeal through VER-I06/I10 |
| **Appeals** `/appeals` | Independent evidence reconsideration and VER-O06 history; not a domain eligibility override |
| **Issuer trust** `/issuers` | Privileged versioned trust policy, supported methods, emergency controls, VER-I03/I07/I08 |
| **Providers** `/providers` | Privileged safe provider health, reconciliation and costs from VER-O09; no secrets |
| **Settings** `/settings` | Privileged permitted jurisdiction/freshness/retention rules; cannot weaken governing/legal floors |

**Contextual entry:** Marketplace age/KYB, recruitment or Assessment verification should show a small Verification-owned accessible request/status contribution within the owning domain's journey, without conferring its approval. Hide actions the user cannot perform but always authorise on the server; no all-person search. Dashboard counts distinguish unknown/unavailable from zero, show freshness and avoid sensitive personal facts. Use Theme Manager semantic tokens, WCAG 2.2 AA, keyboard/screen-reader/reduced-motion/high-contrast support, BCP 47 localisation, CLDR/Clock formatting, safe error message keys and clear alternative proofing methods. Consent/lawful-purpose notices must come from approved Privacy/Legal Compliance inputs; prevent unsafe browser caching or tracking.

## Conceptual acceptance criteria

| Scenario | Required result / owner |
|---|---|
| Valid locally assessable age-threshold proof | VER-O02 minimal threshold claim, no date of birth by default; Verification |
| Unapproved issuer, expired/revoked evidence, stale or unavailable status | Rejected/expired/revoked/indeterminate with freshness; never “verified”; Verification |
| Two Nodes independently receive a signed claim | Different local trust findings permitted; Federation merely transports |
| Verified representative requests tenant control | Qualified claim only; Identity/Authorisation separately control ownership and access |
| Marketplace/Assessment relies on attestation | Receives limited evidence; Marketplace decides seller status, Assessment marking/admission, Qualification award |
| Tenant outsider reads request or staff lacks evidence permission | No existence leak; server denies and emits proportionate accountable evidence |
| Duplicate/replayed challenge or provider timeout after possible write | Replay rejected, retry idempotent, uncertain remote outcome reconciled without duplicate successful claim |
| Holder disputes claim or issuer key compromised | Linked correction/recheck/revocation history and scoped consumer invalidation, not historical overwrite |
| Unsupported regulated claim or no qualified provider | Explicit unsupported/indeterminate; approved local capability remains available for other claims |
| Mandatory Audit intake unavailable | Affected sensitive transition fails closed or uses expressly approved durable recovery; does not misstate custody |
| Reporting/Logging outage | Verification retains correct domain outcome; distinguishes missing diagnostic/report delivery |
| GUI enabled/disabled and contextual age flow | Host navigation and public-ports-only screens when enabled; no UI dependency headlessly; domain owns its decision |
| Mobile, screen reader, alternate locale/method and provider outage | Accessible journey, safe status/fallback and preserved audience/tenant/assurance checks |

## Decisions, gaps and sign-off

**Owner-approved conceptual:** VER-01–VER-12 above; public VER-I01–I10 and VER-O01–O09 direction, source-side/reciprocal authority constraints, error-normalisation/logging/audit/reporting separation, optional GUI, permissive library strategy and standards guidance. The seven approved follow-on dispositions are: **(1)** defensible native checks with explicit unsupported regulated claims; **(2)** external-first sensitive evidence custody; **(3)** risk-bounded offline validity; **(4)** purpose/audience/lawful-basis-limited reuse; **(5)** locally approved/versioned trust roots; **(6)** separate evidence reconsideration from domain appeals; **(7)** qualified, configurable jurisdiction profiles. These are decisions, not unresolved proposals.

**Existing neighbouring directions:** Assessment's approved purpose-specific `EvaluateIssuerTrust`; Credentials, Qualification, Course, Attendance, Federation, Identity, Integrations, Recruitment and Marketplace records contain reciprocal notes with their **own** established/approved/proposed statuses, not automatically upgraded here. Preserve them through any parallel merge. The adjacent Assessment, Credentials and Marketplace records received bounded proposals in this PR; other related interfaces are captured here and must be reconciled as their own reviews complete.

**Deferred engineering, not missing conceptual ownership:** select exact key/credential protocol and security suite, providers and lawful custody agreements, jurisdiction applicability/certification, numerical assurance and offline/recheck thresholds, retention schedules, API shapes/routes/types, error catalogue, one-call host integration, optional GUI packaging, storage register, detailed threat/data-protection evidence, reviewer independence controls and operational incident runbooks. Release versions/security/transitive licence compatibility and Node/TS alignment require validation before implementation. CI/user (not assistant) executes builds, tests, accessibility checks and acceptance. No verification service or compliance is claimed.

**Conceptual completion:** The specification is independently understandable and owner-approved **as a design**, subject to mandatory current-master architectural/document/PR checks and **explicit separate merge approval**. This statement does not certify operational readiness. Related authority: [Identity](../identity/capability-record.md), [Authentication](../authentication/capability-record.md), [Authorisation](../authorisation/capability-record.md), [Assessment](../assessment/capability-record.md), [Credentials](../credentials/capability-record.md), [Qualification](../qualification/capability-record.md), [Integrations](../../services/integrations/services-record.md), [Federation](../../services/federation/services-record.md), [Marketplace](../marketplace/capability-record.md), [Audit](../audit/capability-record.md), [Logging](../../services/logging/services-record.md), [Reporting](../reporting/capability-record.md), [Error Normalisation](../../libraries/error-normalisation/CONTRACT.md).

## FAC-D01 — Party authority

[Party](../party/capability-record.md) consumes purpose-limited qualified attestations of legal identifiers, status or representation, with issuer, scope, validity and revocation evidence. Verification owns its findings, not Party's local identity lifecycle or external registry truth. A verification finding never itself grants a domain role or access.
