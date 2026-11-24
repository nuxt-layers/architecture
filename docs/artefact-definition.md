# Artefact definition

**Status:** Proposed schema version 1 under ADR-0019.

Use JSON and the [schema](../schemas/artefact.schema.json). The [example](../schemas/artefact.example.json) is illustrative, not an implemented package. Independently consumable artefacts publish artefact.json at their root; conceptual catalogue entries may use the same structure without claiming a repository or published contract.

IDs are stable lowercase kebab-case identifiers. Kind and subtype describe responsibility form; classification describes role; implementation and deployment are independent. Ownership identifies the primary authority, not access rights. Provides lists public contract IDs and versions; requires identifies the provider artefact, required contract and compatible version range, plus optionality. Extends declares Nuxt inheritance separately. Package installation details stay in package.json.

Validate JSON Schema Draft 2020-12, unique IDs (including provided contracts within an artefact), compatible version ranges, known required dependencies and the combined acyclic dependency graph. Validate repository and CONTRACT.md presence for published artefacts. Schema validation alone cannot establish these graph or runtime facts. Unknown required dependencies fail discovery validation; optional unresolved dependencies must have an absence mode. No automatic route registration, installation or permissions.

Defined, available, installed, configured, operational, enabled and authorised are separate observations; do not encode them as one static maturity enum. Keep evidence in its authoritative source. Existing capability.json remains in force until a compatibility mapping and migration are approved.
