# Common Engineering Standard

**Status:** Proposed under ADR-0019.

All maintained artefacts declare their purpose, public boundary, dependencies, compatibility, applicable security and privacy obligations, and evidence of correct behaviour. Apply the specialised standards cumulatively. Existing accepted ADRs remain authoritative until reconciliation.

## Documentation

Keep one current canonical specification per responsibility. Integrate approved changes into that specification; remove obsolete wording, repeated review notes, superseded proposals and duplicate status narratives. Preserve current constraints, unresolved decisions and required evidence. Use Git commits and pull requests for history, not archive directories or pointer files. Keep active plans only while needed. Do not confuse conceptual approval with implemented or verified behaviour. Retain applicable legal, security, operational and audit records; this is a source documentation rule, not a retention override.

Use plain British English, short sections and concise contracts. Independently consumable artefacts publish a root CONTRACT.md and a validated artefact.json after the migration is approved. A contract is sufficient for consumption without private source. Package metadata is authoritative for installation dependencies; the artefact descriptor declares architectural relationships.

## Engineering

Declare public dependencies and prevent cycles. Use supported toolchains, protected branches, pull requests, reproducible CI and current accepted development revisions under ADR-0008 and ADR-0013. Test public behaviour, independent consumption, compatibility, security and operational failure modes proportionate to risk. Prefer permissively licensed maintained dependencies; avoid unnecessary repositories and frameworks. Apply existing Security, Privacy and Presentation standards where relevant. Document performance requirements and verify them at appropriate boundaries.
