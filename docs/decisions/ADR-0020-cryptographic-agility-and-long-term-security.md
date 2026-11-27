# ADR-0020 — Cryptographic agility and long-term security

**Status:** Proposed for governing adoption (owner-approved direction 27 November 2026).

## Why

Long-lived confidential information faces harvest-now-decrypt-later risk. Advances in quantum computing, classical algorithms and automated attacks may invalidate today's cryptographic assumptions. Algorithm replacement must be an architectural property rather than an emergency redesign.

## Decision

- Make cryptographic agility mandatory wherever cryptography protects persistent information, trust relationships or long-lived signatures. Preserve versioned algorithms and key formats, migration, historical verification, rotation, revocation and recoverability.
- Risk-prioritise migration to reviewed interoperable post-quantum and hybrid protocols. Never silently downgrade or invent cryptography. Do not claim information-theoretic protection for computational encryption or platform-wide P=NP resistance.
- Preserve data and credential ownership; Infrastructure provides environment facilities and qualified evidence, not business key authority. Independent recovery custody is risk-based.
- Mandatory security controls must pass production-representative local acceptance before release; production-specific evidence is still required. Zero additional local expenditure and deferred commercial activation remain programme constraints.

## Adoption

Normative controls are in [Security Standard §8](../standards/security-standard.md#8-secrets-and-cryptography). Environment applicability and implementation candidates are in the [Infrastructure specification](../infrastructure/infrastructure/infrastructure-record.md#cryptographic-technology-and-implementation-candidates). Exact dependencies, supported protocols and operational evidence belong to owning implementation repositories. No universal cryptographic package, hardware purchase, FIPS validation or universal post-quantum availability is implied.
