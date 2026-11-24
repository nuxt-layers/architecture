# Composition Standard

**Status:** Proposed under ADR-0019.

A suite, application or deployment composition selects and connects documented public components. It may be headless, Nuxt-based or declarative. It owns application decisions, route placement and branding where relevant, and justified configuration or technical coordination state, not another capability's domain facts.

Declare required and optional components, provider selection, compatibility, trusted caller context, configuration, dependency edges, entry points, readiness, failure and recovery. Required prerequisites fail closed; optional ones have an explicit absence mode. Keep source-owned authorisation, persistence and business outcomes intact. Cross-capability orchestration must not duplicate authoritative state.

Reusable suites expose one documented composition operation; complete applications measure integration complexity. Do not conceal capability-specific wiring or evade ADR-0012. Acceptance proves complete journeys, partial failures, tenant isolation, accessibility where relevant and independent composition from the public contract. Deployment compositions additionally prove operational configuration and recovery.
