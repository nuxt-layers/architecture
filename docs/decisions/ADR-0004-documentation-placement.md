# ADR-0004 — Documentation Placement

**Status:** Accepted  
**Date:** 2026-10-09  
**Amended:** 2026-10-23: ADR-0010 documentation order and group model placement  
**Amended:** 2026-10-26: external references and no pointer files  
**Amended:** 2026-11-25: centralised conceptual architecture, distributed implementation and selective discovery

> **Summary:** the architecture repository owns approved conceptual designs and governing rules. Implementation repositories own implemented contracts and technical detail. Development management and implementation verification evidence remain outside the architecture repository.

## Why

A single architectural authority enables whole-platform discovery without reading every implementation repository. Conceptual intent and implemented behaviour must remain distinct to avoid duplication, false implementation claims and architectural drift.

## The decision

A document lives with whoever is responsible for keeping it true.

| Location | Holds |
|---|---|
| `nuxt-layers/architecture-rules` | Platform principles, standards, ADRs, approved conceptual designs for all eight artefact kinds, intended public boundaries and relationships, conceptual descriptors and generated discovery indexes. Architectural requirements and acceptance criteria, not execution results |
| Owning implementation repository, `nuxt-layers/[ARTEFACT-NAME]` | Root `CONTRACT.md` for independently consumable artefacts, implemented descriptors subject to approved migration, implementation, detailed technical specifications, data models, threat models, storage registers and owner-specific processes |
| Suite or application implementation repository | Implemented composition contracts, wiring, cross-capability implementation processes and deployment-specific specifications; conceptual suite and application architecture remains central |
| Implementation and designated test repositories; CI and acceptance environments | Tests, execution results, implementation verification evidence and acceptance reports |
| Development register, GitHub and implementation `PLAN.md` where needed | Development progress, plans, sequencing decisions and operational delivery management |

1. Accepted ADRs and applicable normative standards govern conceptual designs. Approved conceptual designs govern intended artefact boundaries; implemented public contracts describe actual supported integration. Reconcile divergence explicitly; neither a design nor an index proves implementation or verification.
2. Each conceptual artefact directory holds its canonical design record and, following schema adoption, an individual `artefact.json` validated against the common schema. Generated indexes are derived, never independent authority.
3. Actual development status, plans, release and operational status and implementation verification evidence must not be recorded in conceptual descriptors or architecture indexes. A shared schema may define standardised vocabulary for use outside conceptual records.
4. ADRs remain concise and name the detailed authoritative document where appropriate. Follow [ADR-0010](ADR-0010-documentation-style.md).
5. Reviewed external architectural documents are recorded in `RESOURCES.md` at verified immutable revisions. Each implementation repository identifies applicable governing ADRs there. Live software dependencies follow current accepted master under ADR-0008.
6. Structured discovery may identify repositories, design paths, contract paths and artefact relationships without claiming their availability or recording volatile implementation state. These identifiers are not reviewed external reference pins.
7. Ecosystem rules are not restated in implementation repositories. Moved or removed detail leaves no pointer files; update affected references and retain only accessible reviewed external references.
8. Retrieve the compact architecture index and target design first, then applicable governing rules and relevant public contracts. Inspect private implementation only for the target task or a separately justified investigation.

## Adopting it

Reconcile and migrate the approved blueprint into the governing repository before retiring the working blueprint. Until migration and governing reconciliation are complete, existing governing decisions remain authoritative; unadopted blueprint records must not be treated as implemented contracts. Schema and implementation descriptor migration remain separately gated under ADR-0019.

## What follows

| Gains | Costs |
|---|---|
| One discoverable conceptual architecture | Maintain structured definitions and validate derived indexes |
| Implementation detail stays with its owner | Reconcile design and contract changes explicitly |
| Focused development context | Retrieve relevant contracts and governing material as needed |

## Guardrails

- External Markdown references remain restricted to `RESOURCES.md` and reviewed references must be revision-specific.
- The [group model](../identity.md) remains central under ADR-0003.
- Do not duplicate live contracts or import implementation evidence into the architecture repository.
- A generated catalogue is a discovery view, not a competing specification.
