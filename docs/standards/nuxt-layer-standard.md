# Nuxt Layer Standard

**Status:** Normative under ADR-0019.

Apply to any public Nuxt framework contribution in addition to the applicable responsibility standard.

Preserve ADR-0009, ADR-0012 and ADR-0016: headless capability behaviour remains independent of optional presentation; server-side security remains authoritative. Document exported routes, plugins, composables, configuration, registration, precedence, disabling and controlled extends edges where applicable. Hosts own route placement and branding. Never expose private schemas or bypass source authority through Nuxt merging.

A Nuxt capability and any Nuxt adapter for a capability retain the 50-line complete capability-specific host integration ceiling, one composition operation and independent minimal-host CI acceptance. Document framework compatibility and test inherited behaviour, duplicate registrations, optional presentation and absence modes. Existing capability.json remains required until a migration is formally adopted.
