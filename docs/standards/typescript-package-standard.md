# TypeScript Package Standard

**Status:** Normative under ADR-0019.

Framework-independent packages expose deliberate public exports, types, supported runtimes, failure behaviour, dependencies and a self-contained contract. No artificial Nuxt host or dependency is required. Apply the Capability Standard when the package owns capability behaviour.

| Subtype | Requirements |
|---|---|
| Capability service | One composition entry point, owned invariants and persistence where needed, independent consumer and integration acceptance; 50-line capability-specific integration ceiling |
| Stateless library | Direct exports, no owned durable records or provider lifecycle, deterministic behaviour where applicable, unit and independent consumer tests |
| Infrastructure integration library or adapter | Explicit configuration, provider lifecycle and failure semantics, real-provider acceptance, no transferred domain authority |

Apply ADR-0011 and ADR-0015 to the appropriate subtype. Separate deployment requires justification; a TypeScript service need not be a microservice. Document security, supported Node/browser runtimes and compatibility as applicable.
