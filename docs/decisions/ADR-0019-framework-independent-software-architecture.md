# ADR-0019 — Framework-independent software architecture

**Status:** Accepted  
**Accepted:** 2026-11-25

## Why

Responsibility, packaging, composition and deployment are independent. Nuxt-specific rules do not fit every reusable service, library or composition.

## The decision

- Apply the [Common Engineering Standard](../standards/engineering-standard.md) to maintained software artefacts and the Capability, Nuxt Layer, Composition and TypeScript Package standards cumulatively where relevant.
- Recognise eight artefact kinds: architecture, capability, composition, infrastructure, library, presentation, service and adapter. Kind, classification, ownership, implementation and deployment are distinct.
- Preserve ownership, public boundaries, acyclic dependencies, provider-neutral ports, security and the modular-monolith default. Technical services may own bounded technical facts; presentation may own presentation-specific state but not business facts. Infrastructure owns environment provisioning and operational authority, not domain persistence.
- Independently consumable artefacts publish a self-contained root CONTRACT.md. Adopt a common validated artefact.json through a separately reconciled schema and compatibility migration; retain existing capability.json and published identifiers until that migration is approved.
- Keep one canonical specification per responsibility. Git and pull requests retain superseded proposals and review history. Transfer still-applicable requirements before removing obsolete documents.
- Apply ADR-0012's 50-line capability-specific integration ceiling to independent capability consumers as well as Nuxt hosts and adapters. Libraries need no artificial initialisation. Complete application compositions measure integration cost without a universal application-wide ceiling.
- Do not repackage completed implementations solely for classification.

## Adopting it

The architecture and applicable engineering requirements are accepted. The [Common Engineering Standard](../standards/engineering-standard.md), [Nuxt Layer Standard](../standards/nuxt-layer-standard.md), [Composition Standard](../standards/composition-standard.md) and [TypeScript Package Standard](../standards/typescript-package-standard.md) apply cumulatively. The [Artefact Definition](../artefact-definition.md) and conceptual schema are adopted through the consolidation PR under ADR-0004 and ADR-0010. Implementation descriptor compatibility migration remains separately gated.

## Guardrails

Discovery never grants access, proves readiness or installs a component. No change transfers domain ownership or weakens security. Preserve existing accepted ADRs except where explicitly amended by an accepted decision. Do not remove live requirements, unresolved decisions, required compliance records or another active branch's work.
