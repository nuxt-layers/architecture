# Workforce Scheduling — Capability Record

**Status:** FAC-D03 and EMP-03 owner-approved Domain responsibility; conceptual only. No implementation or published contract verified.

## Purpose and authority

Own planned shifts, roster definitions, assignment offers/acceptance, rostering-specific availability, coverage, conflicts, revisions, approved changes, publication and withdrawal. Employment owns contractual engagement, working patterns, leave entitlements and approved establishment capacity; Time & Attendance owns actual observations and approved actual-time statements; Qualification/Verification supply qualified competence evidence; Facility/Booking own resource/reservation authority; Scheduler executes technical triggers. No payroll, attendance, employment contract, calendar master or technical job engine. A shift is not evidence of work, pay entitlement, permission or legal compliance.

## Native behaviour and lifecycle

Define required coverage, role/position and location/time zone, planned interval and capacity; gather current permitted availability, engagement, leave, competence and resource evidence; draft assignments and detect overlap, rest and working-time constraints under qualified rules; independently authorise/publish a version; notify and collect acknowledgement/acceptance where required; permit revisioned swaps, amendments, cancellation and coverage exceptions with current validation. Distinguish offered, accepted, published, withdrawn, conflict and unknown. Handle ambiguous DST times explicitly through Clock, overnight intervals and effective rule versions. Manual rostering is sufficient; optional bounded optimisation supplies explainable suggestions, never automatically commits assignments or weakens legal/contractual constraints. External roster authority only by explicit scope/effective-period designation, with reconciliation and safe migration.

## Conceptual public contracts

| Input | Output / semantics |
|---|---|
| Employment: eligible engagement/position, contractual pattern, leave and approved capacity references | Validated eligibility/hold and proposed/published assignment references; no engagement or staffing allocation mutation |
| Worker/authorised scheduler: scoped availability, preferences, proposed shift or swap, expected revision | Availability or assignment revision and accepted/rejected/conflict/unknown result |
| Facility/Booking: qualified resource and location availability/reservation | Coverage/constraint evidence, no booking claim unless independently confirmed |
| Qualification/Verification and Legal Compliance: current scope/validity and applicable constraints | Qualified eligibility/constraint finding; mandatory unknown blocks affected assignment |
| Publish/amend/withdraw roster with authority and effective time | Version-pinned planned shift and scoped change notices |
| Time & Attendance | Planned interval, assignment/revision and change evidence; actual-time comparison supplied independently, no automatic approval |
| Payroll/Reporting/Project | Permitted planned totals/coverage and source references; not approved actual hours, cost recognition or pay |
| Scheduler/Notifications | Due action or authorised notice intent; qualified attempt/delivery receipt, not shift acceptance |

Events: RosterPublished, ShiftAssignmentChanged, ShiftWithdrawn, CoverageExceptionRaised; source-owned outbox and versioned references. Essential scoped access, own persistence, qualified time and eligibility/constraints for consequential assignments. Optional resource/qualification/provider/notice integrations as appropriate; explicit absence and no reverse imports.

## Cross-cutting contract rules
Use trusted tenant/resource/actor and current server-side access decisions, opaque owner references, explicit purpose, source revision, effective and recorded times, correlation and idempotency. Commands use optimistic revision checks; uncertain commits require read-back with the original operation identity. Separate receipt, acceptance, completion and independent downstream acknowledgement. Durable mutations and their source-owned outbox commit atomically. Host supplies scoped persistence, migrations remain owner-owned, no shared schemas or private imports. Required missing evidence fails closed for the affected operation; optional adapters have explicit absent/degraded modes. Logging receives minimised diagnostics, Audit independently receives accountable events, Reporting derives authorised projections, Error Normalisation does not decide retries. Apply governing OWASP ASVS 5 L2 with applicable L3 controls, WCAG 2.2 AA, i18n, Privacy and Legal Compliance; no blanket compliance claim. Provider adapters are selected through documented ports, not mandatory Nuxt inheritance. Prefer commercially permissive, source-complete dependencies and existing platform contracts; exact versions/licences and threat models are implementation gates. Optional screens are host-mounted through the existing sidebar/dashboard convention; headless operation is independent and ADR-0012's Nuxt composition budget applies. No package, deployment or implementation is asserted.

## Optional GUI and acceptance

Roster dashboard, week/calendar view, coverage and conflicts, worker availability/offers, swaps and revision history; accessible non-drag alternative and time-zone display. Verify manual roster without provider, overlapping shift and rest constraints, DST ambiguity, leave/qualification changes, concurrent swap, withdrawal, unknown notification, actual time differing from plan, no implied payroll, cross-tenant isolation, accessible keyboard/mobile and headless composition.
