# Contributing

Nuxt Layers is an experimental, AI-driven, specification-led open-source engineering initiative. AI performs engineering under human direction; the project owner retains authority for scope, architectural decisions, risk acceptance, merges and releases. Human and AI contributions meet the same standards. Multiple assistants do not, by themselves, constitute independent verification.

This protocol applies to maintained artefacts and independent consumer and integration repositories adopting the architecture. It describes development process, not a new source of architectural authority. Follow the document hierarchy in [README.md](README.md), accepted ADRs and applicable standards.

## Development request

A task may be initiated with:

> Working architecture repository: `nuxt-layers/architecture`
>
> Target artefact: `scheduler`
>
> Task: Implement the approved conceptual design.
>
> Apply the governing development protocol, retrieve the applicable architectural context and public contracts, establish the current implementation baseline and proceed within the approved architectural boundaries.

The artefact ID selects the approved design, not a package, deployment or permission. The task determines the authorised change scope.

## Development protocol

### 1. Establish current baselines

- Retrieve and record the current accepted architecture `master` commit. Resolve the target in [the architecture index](docs/architecture-index.json); check its canonical ID, kind, classification, descriptor and design record. Resolve ambiguity before making ownership or implementation assumptions.
- Identify the owning implementation repository, if one exists; verify its current accepted `master`, relevant open work, branch policies, existing public contract, implementation metadata, technical specifications, tests and CI configuration. If no implementation exists, record that fact and follow the applicable repository provisioning and owner acceptance process.
- Establish the actual implementation and dependency baseline from repository evidence. Do not infer available packages, exports, configuration, dependencies or operational readiness from conceptual descriptors. Preserve unrelated work. Record exact revisions and material assumptions in the implementation PR or owner-specific plan, not the architecture repository.

### 2. Retrieve relevant architectural context

- Read the target `artefact.json` and canonical design record. Use the index's required contracts and outgoing/incoming relationships to identify relevant neighbouring owners and affected consumers. Follow referenced accepted ADRs and applicable standards; retrieve additional records only where needed to resolve an actual boundary or integration question.
- Treat conceptual interface identifiers as discovery labels, not shipped APIs. Information exchange, composition and specialisation do not imply direct imports; distinguish required contracts, optional absence behaviour and actual runtime/build/extension dependencies. Missing graph edges do not prove independence. Check unresolved relationships relevant to the task.
- Retrieve current published root `CONTRACT.md` files from relevant implementation owners at their accepted revisions. Use those contracts for consumption; do not ingest their private source or entire repositories unless wider inspection is expressly authorised. Inspect the target repository's own relevant files, symbols and tests selectively.
- If a required contract is missing, insufficient or inconsistent, identify the gap and affected work. Do not invent exports, bypass ownership, fabricate providers or claim integration. Implement independent portions or use documented host ports and test-only fakes where valid; escalate a genuinely blocking gap.

### 3. Define the implementation specification

Derive a bounded implementation specification and acceptance criteria from the approved design, applicable ADRs, actual public contracts and baseline. Cover responsibility, exclusions, public inputs/outputs and failure semantics, owned state and lifecycle where applicable, required and optional ports, configuration, security/privacy risks, presentation where relevant, performance and affected consumers. Trace requirements to their governing source. Reuse existing specifications when sufficient; do not create duplicate plans or documents.

Keep actual technical specifications, root consumer contract, storage register where applicable, implementation progress and execution evidence in their designated owning repositories or development register under [ADR-0004](docs/decisions/ADR-0004-documentation-placement.md) and [ADR-0010](docs/decisions/ADR-0010-documentation-style.md).

### 4. Implement within approved boundaries

Apply the [Common Engineering Standard](docs/engineering-standard.md) and the applicable [Capability](docs/capability-standard.md), [Nuxt Layer](docs/nuxt-layer-standard.md), [Composition](docs/composition-standard.md) and [TypeScript Package](docs/typescript-package-standard.md) standards cumulatively. Follow the [Security](docs/security.md), [Privacy](docs/privacy.md), [Identity and Access](docs/identity.md) and [Presentation, Internationalisation and Accessibility](docs/presentation.md) baselines as applicable. Use the accepted toolchain in [ADR-0013](docs/decisions/ADR-0013-development-toolchain-baseline.md).

Implement the smallest coherent solution that meets the specification. Preserve explicit ownership, public boundaries, provider neutrality, fail-closed security and acyclic dependencies. Do not introduce unnecessary frameworks, packages, repositories or infrastructure. Retain existing descriptor compatibility until migration is approved. Keep changes on a focused branch; update actual public contracts and affected technical documentation in the same change.

### 5. Prepare independent verification

Define and maintain reproducible checks proportionate to risk: static analysis, type checking, unit and contract tests, integration and end-to-end tests, security, privacy, accessibility, internationalisation and performance checks where applicable. Include negative paths, absent or failing providers, and relevant recovery and isolation cases.

Prove independent consumption from the root `CONTRACT.md` alone, without private source or undocumented setup. Apply [ADR-0012](docs/decisions/ADR-0012-trivial-composition.md): one documented composition operation and the applicable 50-line capability-specific integration ceiling, including relevant adapters; use the required minimal consumer or host and report measured integration cost. Do not impose artificial initialisation on libraries or a universal application-wide ceiling on complete compositions. Verify affected public interfaces and integrated consumer behaviour against current accepted dependency revisions.

CI or the project owner's local environment executes tests and builds. AI prepares checks, reviews available results and identifies failures; it does not claim to have executed them. For architecture changes, arrange the applicable Markdown, schema and generated index checks described in [schema guidance](schemas/README.md). Do not claim a check passed without evidence.

### 6. Review and accept

Open a focused PR against the protected default branch. Record the target and governing/implementation revisions, scope, relevant requirements and contracts, decisions, affected consumers, acceptance criteria, available verification evidence and unresolved risks. Inspect the actual diff, confirm the branch baseline and applicable CI status, and resolve defects before requesting acceptance. Distinguish passed, failed, pending, not run and not applicable checks; a green provider CI alone does not prove independent consumption, security or integrated readiness.

The project owner accepts changes through the protected-branch workflow. Use squash merges under repository policy; never bypass protection, force-push accepted history or treat AI output as approval. Do not continuously poll PRs by default. Follow [ADR-0008](docs/decisions/ADR-0008-independent-layer-delivery.md) for immediate affected-consumer propagation, acceptance testing and fixing forward. Formal releases require a separately accepted lifecycle.

### 7. Correct architecture only on evidence

If implementation exposes a genuine conceptual deficiency or incompatible governing requirement, document the concrete conflict, evidence, affected owners/consumers, consequences and smallest proposed correction. Do not silently alter ownership, security requirements, accepted ADRs or approved designs to fit code. Continue unaffected work where possible; obtain owner acceptance of the architectural correction through an architecture PR before relying on it. Update canonical records, descriptors, applicable ADRs and derived index together; then resume implementation against the accepted revision. Routine implementation choices within approved boundaries do not require new architectural decisions.

## Accountability and notices

Treat AI-generated code as untrusted until reviewed and verified. Do not claim audits, conformance, production readiness or independent review without evidence. Report limitations and known risks; never expose credentials or sensitive data to AI tools or commit them to source control. Follow [SECURITY.md](SECURITY.md).

Participating repositories display a concise AI-driven development notice near the top of their README, linking to this [development protocol](https://github.com/nuxt-layers/architecture/blob/master/CONTRIBUTING.md). Identify independent test harnesses as consumer verification projects. This methodology does not change licence or contributor obligations.

The objective is secure, maintainable, standards-compliant software demonstrated through reproducible implementation and acceptance evidence, not through the development method alone.
