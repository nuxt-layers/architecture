# Party — Capability Record

**Status:** FAC-D01 owner-approved conceptual Domain responsibility. Implementation, governing adoption and published contract unverified.

## Purpose and authority

Maintain tenant-scoped identities and qualified legal/commercial references for natural persons and organisations, including counterparties without application accounts. Own local party IDs, legal form/name and identifier assertions, source-qualified address/contact references, effective dates, relationship to optional Identity/Profile references, duplicate/merge/split/correction history and scoped representation evidence references. External registries own actual registered facts; Verification owns attestations, Identity owns digital standing and Profile owns canonical personal descriptors. Only when no existing owner supplies necessary non-account contact facts may Party store minimised purpose-bound contact data. Do not infer global identity, legal existence, tax status, authority, access or commercial role from a record. Buyer/seller/employer/payer/beneficiary roles remain owned by the respective transaction or engagement owner. Party is not CRM, a contracts master, a permissions service or a public directory.

## Lifecycle and native behaviour

Register a local reference with party type, tenant, purpose and provenance; distinguish unverified, qualified, disputed, stale, inactive and superseded assertions. Validate syntax separately from truth. Attach qualified evidence with scope, source and observation/effective times; update with new revisions rather than rewriting historical transaction snapshots. Review possible duplicates locally; merge only with explicit authority, preserve aliases, source references and correction history, allow reviewed split/recovery. Link/unlink an account only with independently authorised evidence. Close or restrict records under retention, holds and rights rules; notify consumers of changes without automatically changing their commitments. Native manual evidence intake requires no external registry. Optional provider lookup through Integrations preserves source authority, effective dates, conflicts and unknown results. No cross-tenant matching by default; protected identity matching requires explicit separate lawful purpose and approval.

## Conceptual public contracts

| Input / source | Output / owner semantics |
|---|---|
| Register/amend party, legal form/name, identifier namespace, scoped contact references, expected revision, provenance | Party ID/revision and accepted/rejected/unknown result; no legal attestation |
| Verification or permitted registry evidence, claim scope, issuer, validity and expiry | Qualified local assertion/history or disputed/indeterminate outcome; external truth remains external |
| Identity/Profile authorised linking evidence | Link/unlink result, opaque reference and scoped disclosure; no membership or duplicated profile |
| Consumer requests permitted party snapshot for a stated purpose and effective date | Versioned minimal legal/name/address/identifier/representation evidence; redacted/unknown/stale explicit |
| Merge/split/correct/restrict/close with independent approval and rights constraints | Source-owned revision, aliases and qualified outcome; immutable historical references remain resolvable where lawful |
| Privacy/Legal Compliance requests and hold constraints | Qualified disposition receipts by custody, partial/unavailable explicit |

Order, Billing, Invoice, Accounting, Subscription, Employment, Recruitment, Membership and Payment Gateway consume purpose-limited party references; each independently owns role and transaction facts. Party needs trusted access context and own persistence per durable operation; optional Verification, Identity/Profile, Integrations and Clock through host ports. No mandatory reverse imports. Publish PartyRegistered, PartyAssertionChanged, PartyLinkChanged, PartyMergedOrSplit, PartyRestricted events as conceptual names with revision and minimal references, not personal payloads.

## Cross-cutting contract rules
Use trusted tenant/resource/actor and current server-side access decisions, opaque owner references, explicit purpose, source revision, effective and recorded times, correlation and idempotency. Commands use optimistic revision checks; uncertain commits require read-back with the original operation identity. Separate receipt, acceptance, completion and independent downstream acknowledgement. Durable mutations and their source-owned outbox commit atomically. Host supplies scoped persistence, migrations remain owner-owned, no shared schemas or private imports. Required missing evidence fails closed for the affected operation; optional adapters have explicit absent/degraded modes. Logging receives minimised diagnostics, Audit independently receives accountable events, Reporting derives authorised projections, Error Normalisation does not decide retries. Apply governing OWASP ASVS 5 L2 with applicable L3 controls, WCAG 2.2 AA, i18n, Privacy and Legal Compliance; no blanket compliance claim. Provider adapters are selected through documented ports, not mandatory Nuxt inheritance. Prefer commercially permissive, source-complete dependencies and existing platform contracts; exact versions/licences and threat models are implementation gates. Optional screens are host-mounted through the existing sidebar/dashboard convention; headless operation is independent and ADR-0012's Nuxt composition budget applies. No package, deployment or implementation is asserted.

## Optional GUI and acceptance

Party dashboard: search authorised local parties, create/edit, evidence and validity, duplicate review, links/history, privacy/closure and exceptions. No globally discoverable party list. Verify accountless buyer/supplier, same person in independent tenants without leakage, disputed registry assertion, expiry, correction without rewriting invoice snapshots, authorised link/unlink, merge/split recovery, denied representation, provider outage, hold/erasure, unknown write reconciliation, independent headless consumption and accessibility.
