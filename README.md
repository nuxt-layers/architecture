# Nuxt Layers Architecture

> **Summary:** the authoritative platform architecture, governing rules and approved conceptual artefact designs. Implemented contracts and technical detail remain with their owning repositories.

> **AI-driven development.** Nuxt Layers is an experimental initiative in which AI does the principal architecture, development, testing, security assessment and documentation, under human direction. The project owner decides requirements, governance, acceptance and releases. Every contribution meets the same standards, whatever its origin. See [Contributing](CONTRIBUTING.md).

## Principles

The ecosystem consists of bounded capabilities with public contracts. Nuxt Layers are one implementation option; applications compose the capabilities they need. Every capability and application:

- is organised around bounded capabilities with clear public contracts, keeping private implementation inside each layer;
- keeps all contract and Nuxt extension dependencies explicit, one-way and free of cycles; composes capabilities by default and permits documented, controlled specialisation under ADR-0016;
- keeps infrastructure replaceable where practical;
- enforces security on the server, to **OWASP ASVS 5.0** Level 2 at least, with Level 3 for security-sensitive operations;
- designs for privacy from the start;
- meets **WCAG 2.2** Level AA, with semantic markup, and lets people customise presentation without breaking accessibility;
- designs for internationalisation from the start, with **BCP 47** language tags and **Unicode CLDR** locale data through **ECMA-402** (the `Intl` API).

## Which document wins

Where documents conflict, authority descends in this order:

1. an accepted Architecture Decision Record, for the decision it settles;
2. the [Architecture](docs/standards/architecture-standard.md) overview;
3. the [Capability Standard](docs/standards/capability-standard.md);
4. the cross-cutting baselines: identity, security, privacy, presentation;
5. approved conceptual artefact designs, for intended responsibilities and boundaries;
6. owner-maintained implemented contracts and technical specifications, for supported integration and implementation detail;
7. implementation and verification evidence, for actual behaviour, not architectural authority.

Reconcile conflicts between conceptual intent and implemented contracts; consumers use the actual public contract rather than assuming intended interfaces already exist.

## Where things live

This repository holds governing architecture and approved conceptual designs. Each implementation repository owns its root `CONTRACT.md`, detailed technical specifications and implementation. Suite implementation processes stay with the integration owner. Only software artefacts have conceptual artefact descriptors; governing architecture and infrastructure specifications remain Markdown documents. Conceptual descriptors and generated indexes support selective discovery ([ADR-0004](docs/decisions/ADR-0004-documentation-placement.md)). Reviewed external references are listed in [Resources](RESOURCES.md). Development plans, progress and implementation verification evidence remain outside this repository ([ADR-0010](docs/decisions/ADR-0010-documentation-style.md)).

## Documents

| Document | Covers |
|---|---|
| [Platform Charter](docs/platform-charter.md) | The platform's aims, principles and blueprint review objectives |
| [Architecture](docs/standards/architecture-standard.md) | The model, invariants, deployment, routes, security and privacy in brief |
| [Capability Standard](docs/standards/capability-standard.md) | Capabilities, implementations, repositories, contracts, manifests, testing and consumption |
| [Identity and Access](docs/standards/identity-and-access-standard.md) | Identity, groups, memberships, ownership and authorisation |
| [Security](docs/standards/security-standard.md) | The security baseline and data-store controls |
| [Privacy](docs/standards/privacy-standard.md) | Data protection by design |
| [Presentation, Internationalisation and Accessibility](docs/standards/presentation-standard.md) | Design tokens, languages, WCAG and the screen checklist |
| [Artefact Catalogue](docs/catalogue.md) | All 93 software artefacts and separate governing/operational specifications |
| [Architecture index](docs/architecture-index.json) | Machine-readable discovery and relationships |
| [Artefact definition](docs/artefact-definition.md) | Common schema and conceptual/implementation boundaries |
| [Common Engineering Standard](docs/standards/engineering-standard.md) | Cross-artefact engineering requirements |
| [Nuxt Layer Standard](docs/standards/nuxt-layer-standard.md) | Nuxt-specific requirements |
| [Composition Standard](docs/standards/composition-standard.md) | Host assembly requirements |
| [TypeScript Package Standard](docs/standards/typescript-package-standard.md) | Package-specific requirements |
| [Decisions](docs/decisions/) | One file per Architecture Decision Record, in number order; ADR-0008 governs development integration, ADR-0013 the development toolchain baseline, ADR-0014 hosting and storage providers, ADR-0015 infrastructure integration libraries, and ADR-0016 controlled specialisation |
| [Resources](RESOURCES.md) | Verified, accessible external documents relied on |
