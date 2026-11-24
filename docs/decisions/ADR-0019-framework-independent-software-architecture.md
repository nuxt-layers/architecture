# ADR-0019 — Framework-independent software architecture

**Status:** Proposed for governing adoption; platform owner approved the direction on 24 November 2026.

## Why

Responsibility, packaging, composition and deployment are independent. Nuxt-specific rules do not fit every reusable service, library or composition.

## Decision

- Apply the Common Engineering Standard to all maintained software artefacts. Apply the Capability, Nuxt Layer, Composition and TypeScript Package standards cumulatively where relevant.
- Preserve ownership, public boundaries, acyclic dependencies, provider-neutral ports, security and the modular-monolith default.
- Define independently consumable artefacts through a self-contained root CONTRACT.md and a validated artefact.json. Existing capability.json remains supported during migration.
- Keep one current canonical specification per responsibility. Git and pull requests retain superseded proposals and review history. Transfer still-applicable requirements before deleting obsolete documents.
- Retain ADR-0012's Nuxt budget; propose the same 50-line ceiling for independent capability service composition. Libraries need no artificial initialisation. Count hidden integration wiring; complete application compositions report integration cost without a universal application-wide limit.
- No mandatory repackaging of completed implementations solely for classification.

## Adoption

Adopt the [Common Engineering Standard](../engineering-standard.md), [Nuxt Layer Standard](../nuxt-layer-standard.md), [Composition Standard](../composition-standard.md), [TypeScript Package Standard](../typescript-package-standard.md) and [Artefact Definition](../artefact-definition.md) after reconciling the existing Capability Standard and accepted ADRs. Until adoption, existing accepted decisions govern. The working blueprint remains non-normative.

## Guardrails

Discovery never grants access, proves readiness or installs a component. Do not remove live architectural decisions, unresolved requirements, required compliance evidence or another active branch's work. Do not create a parallel history archive in the current tree.
