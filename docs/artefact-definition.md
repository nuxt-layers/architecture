# Artefact definition

The [common schema](../schemas/artefact.schema.json) uses JSON Schema Draft 2020-12 and schema version 1. See [schema guidance](../schemas/README.md). The conceptual profile is adopted for this repository; legacy compatibility is preserved. Implementation descriptor migration remains separately gated.

## Conceptual profile

Each approved conceptual artefact has a stable lowercase kebab-case ID, kind, classification, design record, intended public interface identifiers, contract requirements, relationships, governing decisions and unresolved relationships. Kind, responsibility classification, ownership, implementation and deployment are distinct. The six software artefact kinds are capability, composition, library, presentation, service and adapter (ADR-0019). Governing architecture and infrastructure specifications are not software artefacts and do not have artefact descriptors. A required contract can be fulfilled through a host port; optional requirements identify absence behaviour. Information exchange, specialisation and composition do not establish actual package or runtime dependencies. Interface identifiers are discovery labels, not shipped symbols. No progress, release, operational status or verification evidence belongs in conceptual descriptors.

The [generated index](architecture-index.json) supports selective retrieval and reverse discovery. Validate unique IDs and interfaces, known relationship targets, design paths and applicable accepted ADRs. Missing declared edges do not prove independence.

## Implementation profiles

Legacy and explicit implementation profiles describe actual public contracts, versions, provider requirements and separate Nuxt extends edges. Independently consumable artefacts publish root CONTRACT.md; package metadata remains authoritative for installation dependencies. Check version compatibility, known required dependencies, optional absence behaviour, repository and contract presence, and the combined acyclic actual dependency graph. Schema validation alone does not establish runtime facts.

Existing capability.json and published identifiers remain in force until separately approved compatibility migration and independent consumer verification. Preserve UUID-generator as a legacy published identifier with canonical descriptor ID uuid-generator. Governing architecture and infrastructure documents are retrieved separately from the software artefact index. Discovery never grants access, installs components or proves readiness. Defined, available, installed, configured, operational, enabled and authorised are distinct observations; evidence stays with its owner.
