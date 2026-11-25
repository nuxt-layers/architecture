# Common artefact schema

Conceptual profile adopted under ADR-0019; implementation compatibility migration remains separately gated. Legacy and explicit implementation profiles retain their previous structure; existing capability.json remains unchanged.

Conceptual descriptors declare intended responsibilities, interface identifiers and public-contract requirements, not implemented package dependencies. A required contract may be supplied through a host port rather than a direct import. Optional requirements specify an absence mode and may be essential for a selected feature. Information exchange, composition and specialisation are distinct from actual implementation dependencies. Missing declared edges do not prove independence. Actual package, runtime/build, Nuxt extension and version compatibility validation belongs to implementation and host acceptance.

The generated [architecture index](../docs/architecture-index.json) is derived from conceptual descriptors. Retrieve the index and relevant descriptor/design record first, then accepted ADRs and actual published contracts as needed. Interface identifiers are conceptual discovery labels, not shipped symbols. Reverse edges are derived, not separately maintained. Unresolved details remain in individual descriptors. Do not edit the index manually.

From the repository root, use Node.js 26:

`node scripts/architecture-index.mjs --write`

`node scripts/architecture-index.mjs --check`

Supply `--governing-root <path>` to verify referenced accepted ADRs from a checkout of the governing repository (automatic after consolidation if docs/decisions exists). The existing [legacy example](artefact.example.json) and actual [conceptual descriptor](../docs/libraries/rich-text/artefact.json) illustrate the two boundaries. Formal JSON Schema conformance is required; implementation migration checks remain separate. No separate fixture directory or package toolchain is needed for conceptual discovery.

Implementation descriptor compatibility migration remains separately gated.
