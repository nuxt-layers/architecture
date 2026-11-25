# Template Engine — Stateless Library Record

**Name:** `template-engine`  
**Classification:** **Stateless library candidate**; proposed design, not an established implemented capability.  
**Status:** Conceptual classification and documentation relocation approved 21 November 2026; no implementation repository, published contract, release or tests verified.  
**Authority:** [Governing catalogue](../../catalogue.md) and [Capability Standard](../../capability-standard.md).

## Purpose and responsibilities

Provide deterministic, bounded **parsing, validation, compilation and expansion** of templates against an explicit caller-supplied data object and approved schema. Support structured and escaped outputs without assuming any business context. Configuration, Publisher or another **owning capability** stores template definitions and versions and decides who may read, edit, apply and publish them.

The library does **not** own template records or revisions, approval/workflow state, live data lookups, report calculations, notifications, publishing, saved generated documents, access control or any provider integration. Rendering is a pure transformation, not a business-state transition.

## Conceptual public inputs and outputs

| Input | Source and validation | Output |
|---|---|---|
| Template source with declared syntax/version and allowed helpers | Owning domain supplies authorised template snapshot; reject unsupported syntax, unsafe expressions and excessive size | Parsed/compiled representation with version and bounded structural diagnostics |
| Template AST and explicit named input bindings | Caller supplies already authorised, validated data; require schema/type and approved escaping context | Expanded text or safe structured content, with typed missing-binding/invalid-value outcomes |
| Template schema, escaping policy, locale and limits | Caller selects supported output context, bound time/size/depth, helper allowlist and locale | Declared compatibility, warnings and explicit failures; never silently downgrade safety |

**Operations:** validate/compile, discover supported syntax/helpers, render; no domain commands, persistent queries, events, outbox or service port. A small in-process ephemeral compilation cache is an implementation detail only and conveys no shared persistence or authoritative state. Determinism requires explicitly supplied data, locale and any time-dependent values.

## Security and failure

Prohibit arbitrary JavaScript or code execution, prototype traversal, filesystem/network access, ambient credentials, unbounded loops/recursion and implicit domain queries. Escape for the selected output context (HTML, text, URLs etc.) and refuse unsupported contexts; a rendered result is **not** independently authorised, approved or safe to publish without the caller's controls. Apply bounded CPU/memory/output limits and typed errors for malformed templates, unsupported helpers, missing values and policy violations.

## Relationships and presentation

- **[Page Builder](../../presentation/page-builder/presentation-record.md) (candidate):** consumes stateless evaluation of a restricted Liquid-compatible profile (PB-06 approved; grammar and implementation unverified); the caller supplies scoped, typed data, output context, explicit locale/time and evaluation limits; library returns validation, safe evaluation and diagnostics (detailed contract PB-11–PB-16 approved). Approved STD-PB-07 requires a versioned documented Liquid compatibility profile owned by this library; exact grammar and library choice remain implementation work. Approved PB-25 provides a contextual expression editor with supported variable/filter help, validation and safe sample preview; the library itself supplies no GUI. No Shopify-specific data objects, code execution, data lookup, template persistence or reverse dependency is implied.
- **Configuration / Publisher / other domains:** own template definitions, authorised data selection, version, approval, lifecycle and output records.
- **Rich Text:** handles supported formatted-text source/trees separately; do not silently turn template output into trusted safe rich text without revalidation.
- **Content Editor / UI / Export:** may present, preview or convert caller-authorised results; this library has no routes, screens, GUI or dashboard.
- **Audit / Logging:** authoritative domain reports business changes and access evidence; library may return scrubbed technical diagnostics to the caller.

## Conceptual acceptance scenarios

1. Same template, bound inputs, locale and version produce equivalent output.
2. Missing/invalid binding returns a typed result, never a background data lookup.
3. Hostile expression or recursive expansion is rejected within resource limits.
4. Unauthorised data is withheld by caller; library cannot override a denied disclosure.
5. Changing or publishing a template is handled by the owning capability, never this package.

**Open implementation work:** Publish exact grammar, escaping contexts, stable error types and resource limits; select permissively licensed open-source components and demonstrate independent acceptance. Candidate classification does not assert operational availability or amend governing authority.
