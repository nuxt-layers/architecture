# File Library — Stateless Library Record

**Canonical proposed name:** `file-library`  
**Proposed package:** `@nuxt-layers/file-library` (not implemented or published)  
**Implementation classification:** Stateless, framework-independent library; **not** an independently stateful capability or Nuxt Layer.  
**Status:** Owner-approved conceptual requirement and naming, 21 November 2026. No repository, published code, `CONTRACT.md`, acceptance tests or releases are asserted.  
**Review:** Location draft PR #98.  
**Authority:** [Capability Standard](../../standards/capability-standard.md), [ADR-0011](../../decisions/ADR-0011-shared-rich-text-and-configurable-copy.md), [ADR-0012](../../decisions/ADR-0012-trivial-composition.md), [ADR-0016](../../decisions/ADR-0016-controlled-layer-specialisation-and-composition.md), and retired Document decision (former review: document directory removal 2026 11 17). This blueprint record is non-normative until the required governing adoption.

## Purpose

Supply one small, reusable **attachment contract and pure helper functions** for capabilities that attach uploaded files to their own resources. Support PDFs, XLSX and other explicitly allowed file types as well as media, without building another document management, storage or publishing capability.

The **consistent public attachment interface is a requirement** for capabilities that elect to support attachments. Packaging the common logic in this independently reusable library is the approved preferred design; implementation may split its pure functions into shared modules if that avoids unjustified packaging.

## Ownership and exclusions

| Concern | Owner |
|---|---|
| Attachment schema, safe filenames/content-type rules, bounded format/size/checksum validation, typed references, predictable failure types and pure normalisation | **File Library** — reusable specifications and stateless functions |
| Uploaded object bytes, streaming, checksums, object keys and short-lived delivery | **Storage**, via its existing public `StorageService` |
| Authoritative attachment record and ID, parent-resource association, audience and permission decisions, accepted upload, lifecycle, revisions, privacy, retention/holds, disposal, recovery and outbox | **Originating capability**: Location, Asset, Project, Invoice, Audit, Publisher, Media or another actual source owner, as appropriate |
| Editing/publishing a document, published addresses and document lifecycle | **Publisher**; Content Editor supplies editorial presentation |
| Images, safe renditions, image access and quarantine | **Media**; Gallery supplies optional visual presentation |
| Upload widgets, file lists, preview/download controls and PDF/XLSX viewers | **`ui` or owning presentation**, consuming public owner contracts, not this library |

**Must not own or provide:** records, databases, object storage, external-provider ports, credentials, authorisation decisions, domain workflows, scheduled jobs, events, outboxes, application routes, screens, or a universal file catalogue. Do not revive the retired `document` capability or silently broaden Media/Publisher's published contracts.

## Conceptual public input/output

The library accepts values as data; it never retrieves authenticated actors or opens Storage itself.

| Pure input/helper | Output |
|---|---|
| Candidate attachment details: safe display name, declared MIME type, permitted type list, size and checksum | Validated, normalised metadata or stable typed validation errors |
| Originating owner, opaque attachment ID, parent-resource reference, optional revision and relevant disclosure-safe metadata | Typed attachment reference suitable for use by Location/map pins and other consumers |
| Upload/claim request and corresponding technical outcome supplied by the owning capability | Validated payload/receipt shapes, state-transition checks and reproducible error classification |
| Optional permitted preview/download description supplied by owner | Bounded description and response types; **never** an access grant or durable signed URL |
| Capability's declared file rules and trusted technical metadata | Deterministic eligibility/format checks; never a permission decision |

**Owning capability's required public operations (not File Library runtime services):**
1. `requestUpload`: authorise purpose/parent, validate type/size/quota and obtain an upload intent through Storage.
2. `confirmUpload`: verify Storage claim and safely commit an owner-scoped attachment record with stable ID; reconcile duplicate/incomplete results.
3. `listAttachments` / `getAttachment`: return authorised records scoped to the parent.
4. `requestPreview` / `requestDownload`: resolve current owner permission and eligibility, return short-lived delivery or an explicit refusal.
5. `detachAttachment` / `deleteAttachment`: handle association removal separately from byte deletion; enforce holds, retention and owner policy.
6. Optional `replaceAttachment` / `listRevisions` only when the domain actually needs file versioning.

These names describe conceptual operations, **not published TypeScript function names**. Owner interfaces may adopt equivalent names if they preserve these semantics.

## Failure, trust and lifecycle requirements

- The owner must authenticate and authorise each protected operation and validate source-specific permission at every open/download. Neither a map pin nor a Storage URL grants broader access.
- Treat names, MIME declarations, file content, EXIF metadata and imported coordinates as untrusted. Apply safe file-type/content inspection and scanning/quarantine where needed; control potentially dangerous PDF or spreadsheet preview execution.
- Validate tenant/group scope, size limits, checksums, content types and quota admission; protect against oversized, malformed or decompression-bomb content.
- On partial upload, claim, database write, remote unavailability or cancellation, the owner reconciles or cleans up orphaned objects. The library can provide deterministic state checks but **cannot** execute retries or guarantee transactions across systems.
- Respect current legal holds, retention, privacy, deletion and public redistribution licences. A detached pin does not automatically erase the source file; deleting a source resource must invalidate exposed pin/preview references.
- Emit lifecycle events only from the **source owner** through its committed outbox. Audit/Logging consume proportionate evidence/diagnostics; no File Library events.
- Browser-based previews must be supplied by authorised viewers, with download fallback where preview support is unavailable.

## Location interaction

Location can own an attachment record for a file uploaded solely for a Location-owned annotation, using Storage for bytes and File Library for shared validation/reference semantics. Otherwise Location stores only a **typed opaque source resource reference**, associated place/geometry, pin lifecycle and disclosure rules. Media/Publisher/other record owners remain authoritative. Location never persists a raw Storage object key or short-lived signed download URL in a map pin.

## Compatibility and proposed acceptance

- Pure TypeScript/JavaScript, no Nuxt/browser/runtime dependency, external network access or persistence; no mandatory implementation coupling to Storage's internal source.
- Upstream candidates and dependencies must be complete, commercially permissively licensed open source; examine licences and transitive dependencies before implementation.
- Contract/negative scenarios: malformed filename/type/size/checksum, untrusted MIME, stale/duplicate confirmation, cross-tenant isolation (enforced by the owner), forbidden download, held deletion, orphan cleanup, source revocation and embedded Location pin privacy.
- Verify common shapes with **at least two distinct consumers** (Location and another owner) before publishing. Host or CI performs acceptance tests; none have been run as part of this architectural record.

## Next steps

1. Propose the library entry in the working catalogue/register and, separately, an appropriate governing change; do not claim normative adoption from this conceptual review.
2. Specify an independently usable `CONTRACT.md` with pure functions/exports, validated schemas, stable errors, compatibility expectations and no hidden runtime requirements before building the package.
3. Implement only the minimal shared code justified by multiple consumers, while preserving all source-owner and Storage boundaries.
