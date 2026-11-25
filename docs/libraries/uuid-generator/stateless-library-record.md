# UUID Generator — Stateless Library Record

**Catalogue name:** `UUID-generator`  
**Canonical path:** `docs/libraries/uuid-generator/stateless-library-record.md` (CLS-13); catalogue identifier unchanged.
**Classification:** **Stateless library candidate**; not a domain-state-owning capability or Nuxt Layer.  
**Status:** Owner-approved documentation classification and relocation, 21 November 2026; implementation, root contract, tests, releases and operational status are unverified.  
**Authority:** [Governing catalogue](https://github.com/nuxt-layers/architecture-rules/blob/master/docs/catalogue.md), [Capability Standard](https://github.com/nuxt-layers/architecture-rules/blob/master/docs/capability-standard.md).

## Purpose and boundaries

Supply reusable UUID creation and validation, including UUIDv7, with clearly specified standards-compliant encoding and version/variant semantics. Return generated identifiers and typed validation errors. Callers own the identities, business entities, database constraints and any meaningful allocation lifecycle.

The library **does not** own users, object records, a central identifier registry, unique allocation service, database, session/credential secrets, domain policies, routes, dashboards or access decisions. Generating a UUID does **not** guarantee that no collision is possible and does not reserve an entity identifier; source-owning capabilities enforce their own uniqueness/transaction constraints.

## Conceptual public inputs and outputs

| Operation/input | Output and contract |
|---|---|
| Generate UUID (requested supported version, preferably v7 where appropriate) | UUID string/bytes conforming to the declared RFC version and variant, or explicit unsupported/entropy failure |
| Parse/validate supplied UUID | Canonical representation or typed malformed/unsupported-version result; do not infer entity existence or authorisation |
| Format/convert supported representation | Canonical text/bytes, with explicit strictness rules and errors |
| Optional test-only clock/entropy injection | Reproducible test fixtures; production defaults use secure platform primitives and adequate entropy |

UUIDv7 time ordering is useful for sorting but **not** proof of globally monotonic order, precise event chronology, trusted timestamp, identity or authentication. If per-process monotonic sequencing is added, it must remain ephemeral and explicitly documented, not a persisted registry or domain authority. The caller owns any global ordering guarantees.

## Safety, dependencies and consumers

Use a mature, permissively licensed, fully open-source implementation or well-reviewed platform primitives; follow RFC 9562 and cryptographically secure random generation where required. Fail clearly if secure entropy is unavailable; never substitute `Math.random()` for security-sensitive UUID generation. No network, data store, workflow, outbox, infrastructure provider lifecycle or independent UI is required.

**Consumers:** Identity, Publisher, domain capabilities, infrastructure adapters and application code may request identifiers, but each remains authoritative for its own records and security. UUIDs are not secrets or authorisation credentials; reveal no assurance of ownership or permission.

## Conceptual acceptance scenarios

1. Generated UUIDv7 validates for version, variant, canonical format and expected timestamp encoding.
2. Invalid input is rejected without lookup or mutation.
3. Missing secure entropy fails explicitly.
4. Two callers can use the library independently without shared database, service registration or Nuxt runtime.
5. The owner of an entity enforces uniqueness and rejects an actual conflict; generation alone records no business event.

**Open implementation work:** Confirm chosen library/package name, public signatures, interoperability, collision-handling guidance and independent evidence. This candidate record does not assert an approved implementation or governing promotion.
