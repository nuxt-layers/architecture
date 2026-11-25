# API Gateway — conceptual classification review

**Status:** CLS-11 conceptual review complete; API-01 and associated conceptual recommendations owner-approved, 24 November 2026. Retain the optional application composition classification. No implementation, independent package, public runtime API or governing adoption is asserted.

## Purpose and justification

Expose selected, versioned public HTTP APIs of a composed application through a consistent, secure external boundary. Consumers may be browser applications, trusted machine clients or approved external integrations. Do not require internal capability calls to traverse a network gateway. Begin with the host's ordinary route composition and existing ingress, not a new microservice. The governing catalogue's API routing/exposure candidate does not establish an independently reusable runtime.

## Classification alternatives

| Form | Appropriate when | Decision |
|---|---|---|
| Application composition | Host selects published API contributions and attaches shared middleware; no independently owned gateway lifecycle | **Approved initial form (API-01)** |
| Technical service | Multiple hosts demonstrably need independent routing policy, lifecycle, quotas and reconciliation beyond ordinary composition | Conditional future review; not approved |
| Infrastructure | TLS, reverse proxy, network ingress, load balancing and deployment | Existing Infrastructure responsibility; no duplicate gateway |
| Adapter | Provider-specific protocol translation | Use an adapter when required; not the general gateway |

**API-01 — owner-approved (24 November 2026):** retain the composition placement, as an optional host API-exposure composition pattern. If the independent reusable wiring is not justified, consolidate the specification into [Application Composition](../../architecture/application-composition.md) rather than creating a package. No separate gateway-owned database, business API, global permission engine or mandatory network hop.

## Authority and exclusions

| Owner | Boundary |
|---|---|
| Host/application composition | Explicit selected routes, versions, audience, routing context, CORS and transport policy; no automatic private-route exposure |
| Infrastructure | Ingress/TLS, trusted proxy chain, network controls, deployment and operational readiness |
| Site Hosting | Verified hostname-to-site binding and withdrawal; not ingress configuration |
| Authentication / Authorisation / Identity | Trusted caller, assurance, current tenant/subject and server-side resource/action decisions |
| Source capability or service | Published operation semantics, validation, permissions, idempotency, transaction outcomes and committed events |
| Configuration | Approved settings and provenance within non-relaxable security floors |
| Integrations | External-provider connection and callback lifecycle; no general public API ownership |
| Logging / Observability / Audit | Their independent diagnostic, telemetry and accountable evidence boundaries |

API exposure is not a permission grant. The source owner revalidates resource authority and protected operations; no client-supplied tenant or forwarded identity is trusted. IAM Integration remains a suite composition, not a mandatory gateway.

## Conceptual public input/output contract

| Input | Output / failure |
|---|---|
| Trusted host selects operation ID/version, public contract, method/path, audience, request/response schema, security and size/rate policies | Validated route manifest, duplicate/conflict/unsupported-version findings; refuse ambiguous or missing mandatory registrations |
| Request with bounded headers/body, credentials where required, method/path and trusted ingress | Canonical route and scoped caller/context, or safe rejection; never forward uncontrolled identity or arbitrary upstream URLs |
| Source owner's current access decision and validated result | Contract-qualified response/status; preserve denied, unavailable, conflict and unknown outcomes; no invented success |
| Authorised operator requests diagnostics | Redacted registration/readiness, route errors, limits and correlation; no payload, credentials or cross-tenant leakage |

These are logical surfaces, not imposed function signatures. Internal calls use documented public ports without HTTP loopback or private schema access. Describe supported external APIs with versioned OpenAPI where appropriate; schemas and operation semantics remain source-owned.

## Native behaviour and security

Select → validate route/version conflicts and public schemas → mount explicit routes → authenticate and qualify context → apply bounded transport checks → invoke source public operation → return its authorised result → record minimised diagnostics → reconcile deployment and retire routes safely. Required absent owner/decision fails closed. Rate limits, timeouts, body/header size, pagination, safe error projection and abuse controls are explicit; distributed rate-limiting state may use a suitable shared technical provider if justified, never a new business store.

Reject path traversal, request smuggling ambiguities, untrusted forwarding headers, arbitrary destination selection, unsupported methods, unsafe redirects and unexpected content types. Browser CORS/CSRF and credential handling follow accepted security rules; machine clients use approved authentication, scoped credentials and replay protections. Do not retry uncertain mutations unless the source contract establishes safe idempotency and reconciliation. Do not cache protected responses across tenant/actor scopes. Preserve privacy, legal constraints, source-owned outboxes and explicit partial outcomes. Use accepted OWASP ASVS baseline and relevant API security threat modelling; no certification implied.

## Composition, dependencies and presentation

Essential per exposed operation: host route/ingress, source public contract and applicable trusted access context. Optional: Site Hosting for multi-site resolution, Error Normalisation for safe errors, Logging/Observability for diagnostics, Audit for selected accountable changes, Configuration for approved policies. No mandatory reverse dependencies or separate deployment; accepted ADR-0012 and ADR-0016 govern integration. ADR-0019 remains proposed. No end-user dashboard; optional restricted operator diagnostics may be part of the existing host/Infrastructure experience, not a separate management authority. Source API documentation may be exposed only to permitted audiences.

## Conceptual acceptance and approved decision

Verify duplicate route/version rejection, public-only registration, headless internal consumption without a gateway, correct tenant and caller binding, denied/degraded paths, input limits, safe errors, source idempotency and unknown outcomes, route withdrawal, redacted diagnostics, no private imports, and absence of cyclic dependencies. Test through a representative composed host; no tests or builds were executed here.

**API-01 is owner-approved: retain the optional application composition.** A technical service or independent package requires additional evidence and separate approval. Any future consolidation into Application Composition requires a reviewed reuse decision. CLS-11 and API-01 are conceptually resolved.
