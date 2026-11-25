# ADR-0010 — Documentation Style

**Status:** Accepted  
**Date:** 2026-10-21  
**Accepted:** 2026-10-22  
**Amended:** 2026-10-25: documents that stay true without upkeep; one file for external links, one for plans  
**Amended:** 2026-10-26: `CONTRACT.md` listed with the other files; `RESOURCES.md` and `PLAN.md` at the repository root; the documentation style standard folded in  
**Amended:** 2026-11-04: an application's `RESOURCES.md` also records its hosting and storage providers (ADR-0014)  
**Amended:** 2026-11-13: use conventional summaries only where useful  
**Amended:** 2026-11-25: conceptual descriptors, generated indexes and separate development evidence

> **Summary:** every document should be quick to read and hard to misread, and should stay true without being edited. Brevity comes first. Verified external reference pins and changing status stay in their designated files; live development dependencies follow ADR-0008.

## Why

Our documents are accurate but often long and dense. Readers, human and AI alike, spend time finding the decision inside the detail.

## The decision

Every document in the ecosystem follows these rules:

| Rule | In practice |
|---|---|
| **Summary first** | Begin substantial documents with a brief **Summary** stating their purpose or main conclusion; omit it when the document is already sufficiently short |
| **Brevity** | Cut every word that does not change the meaning |
| **Plain language** | Everyday words; a term or piece of jargon is explained where it first appears |
| **Say it once** | Every rule a reader needs is stated once, in one place; elsewhere, link to it |
| **Principles first** | Examples only where they help |
| **Short sections** | One idea each, under a clear heading |
| **Tables for comparisons** | Options, owners, gains and costs side by side |
| **Lists for steps and sets** | Numbered for order, bullets otherwise |
| **Bold for key terms** | Sparingly, so the eye can scan |
| **British spelling** | Throughout |

An ADR reads in this order: **Summary**, **Why**, **The decision**, **Adopting it**, **What follows** (gains and costs, as a table), and **Guardrails** where needed. Omit the summary if it adds nothing.

### Documents that stay true

Keeping versions, pins and status up to date across many files costs time and tokens and does nothing for the product. So each repository keeps changing facts in a few files at its root, each with one job; other documentation lives under `docs/` unless ADR-0004 or the applicable standard assigns another location. Schemas, generated indexes, tooling and repository configuration use their designated paths:

| File | Holds | Never holds |
|---|---|---|
| `README.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md` | What the repository is and how to work with it, in general terms. Links only to the repository's own documents | Version numbers, release names, pinned commits, status, plans or links outside the repository |
| `RESOURCES.md` | Every accessible external architectural document relied on, one row each, identifying the verified revision reviewed (tag or commit). Live software dependencies follow ADR-0008. This is the only place external architectural links and verified revisions appear; software dependency resolution follows ADR-0008. In an application, also each hosting and storage provider's region, assurance evidence and date checked ([ADR-0014](ADR-0014-hosting-and-storage-providers.md)) | Anything else |
| `PLAN.md` | Owner-specific implementation work while needed; programme-level progress and sequencing belong in the separate development register and GitHub | Architecture repository plans or status; decision reasoning |
| `CHANGELOG.md` | Major changes, newest first, with dates; formal release versions resume when the release lifecycle is approved | Plans, status, reasoning or links |
| `STORAGE-REGISTER.md` | Actual storage mechanisms owned or caused by the capability, including cookies, browser storage and server stores: purpose, contents, operational essentiality and fallback, retention, scope, controls and consent-relevant facts. Required when storage exists (Privacy §5) | Plans, proposed storage presented as implemented, or jurisdiction-specific legal conclusions |
| `CONTRACT.md` | An independently consumable artefact's concise, self-contained implemented public integration contract in its owning repository ([ADR-0012](ADR-0012-trivial-composition.md) §6); a suite describes the members it composes without release pins during development | Development plans or duplicated progress tracking; any other repository's versions, plans or links; what it needs from elsewhere is named through `RESOURCES.md` |
| Conceptual design record and `artefact.json` | Approved intended responsibility, boundaries and relationships; descriptor follows the adopted common schema | Actual development progress, release or operational status, implementation verification evidence or copied live contracts |
| Common schema and generated architecture index | Shared validation vocabulary and derived discovery; schema may define development-status vocabulary for external use | Actual progress values or independent architectural claims in generated views |
| Implementation descriptor | Actual public metadata in the owning implementation repository, subject to approved schema migration | Competing conceptual authority or verification claims unsupported by evidence |

Architectural acceptance criteria and approval status are not implementation verification evidence or development progress. Keep execution evidence in CI and designated acceptance environments. Preserve required legal, security and audit records in their owning systems.

Every other document refers to an external document by its entry in `RESOURCES.md`, with a short note on why, never by its own link. During development, `CONTRACT.md` describes current composition without release pins (ADR-0008). Structured repository identifiers and relative contract or design paths used for discovery are not external reviewed-reference pins; see ADR-0004.

## Adopting it

New documents follow it from the start. Existing documents, and each repository's files and Markdown check, are brought into line by the first piece of work that next changes that repository, never by a chat of its own.

## What follows

| Gains | Costs |
|---|---|
| Faster reading and review | Rewriting older documents over time |
| Fewer misreadings by people and AI | Editing for brevity takes effort |
| A verified reference update touches one file, not many | Readers follow one more step to reach an external document |
