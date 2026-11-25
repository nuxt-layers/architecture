# Payroll — Capability Record

**Status:** FAC-D02 and EMP-02 owner-approved independent Domain responsibility; conceptual only. No payroll engine, jurisdiction coverage, provider or published API verified.

## Purpose and authority

Own versioned payroll calculations and approvals, pay runs, earnings, gross/net, lawful deductions and contributions, employer liabilities, adjustments, pay statements and qualified filing/disbursement instructions and receipts. Employment owns engagement, approved pay basis, contractual working patterns and leave; Time & Attendance owns approved actual-time statements; Party supplies qualified employer/payee references; Legal Compliance qualifies applicable legal/tax regime; Accounting owns recognition, ledger and bank settlement. Payroll does not own bank credentials, general payments, statutory interpretation, employment terms or source hours. Payment Gateway's approved payment scope does not imply wage disbursement support.

## Native and external authority

One designated authority per employer, pay regime, fact and effective period. Native calculations require verified jurisdiction-specific rule/version coverage, exact decimal money/currency and deterministic rounding, approved effective inputs, statutory treatment and verified acceptance; unsupported rules fail closed. Native manual intake can retain qualified externally prepared results without claiming native computation. External providers via Integrations may be authoritative for declared facts; preserve mappings, source revisions, reconciliation, cutover and read-back, no silent local fallback or duplicate pay run. Secrets remain with host/provider connection owner.

## Lifecycle

Configure qualified pay regime and periods; obtain employer/payee and engagement, pay basis, approved time/leave and prior adjustment evidence; validate completeness and eligibility; calculate draft with line provenance; reconcile exceptions; independently approve and lock revision; issue permitted statements; submit separate filing/payment instructions only with authority; distinguish accepted, paid/settled, filed/acknowledged, rejected, pending and unknown. Correct via versioned adjustment/reversal and amended filing/statement, never overwrite prior approved history. Uncertain transfers require reconciliation before retry. Separate maker/checker, least privilege and restricted payroll evidence. No general payroll access via project cost reports.

## Conceptual public interfaces

| Input | Output / semantics |
|---|---|
| Employment: engagement revision, employer/payee, pay basis, effective dates, approved contractual leave | Input acceptance/hold and qualified pay-run reference, no engagement mutation |
| Time & Attendance: approved statement ID/revision, period, units, supersession | Accepted/held/rejected exact revision, amendment reconciliation; not automatic pay entitlement |
| Legal Compliance/Privacy: qualified regime, rule/effective period, filing duties, disclosure/retention | Supported/unsupported or hold, rule provenance and required controls |
| Authorised payroll operator: calculate/review/approve/adjust run with expected version and authority | Itemised gross/net/liabilities, calculation evidence and approved/unknown status |
| External payroll/disbursement/filing provider | Qualified submission and reconciliation receipts; transport is not successful payment or statutory filing |
| Accounting | Authorised aggregate posting evidence, liability/adjustment references and reconciliation; Accounting supplies independent posting/settlement status |
| Employee/authorised delegate | Own permitted statement and correction request/result; no co-worker payroll disclosure |

Events: PayrollRunApproved, PayrollAdjustmentApproved, PayrollStatementIssued, PayrollSubmissionStatusChanged with minimal references/revision; no raw payslip content. Essential per operation: trusted authorisation, qualified legal regime, employer/payee and relevant input evidence, own store. Optional provider, Accounting handoff, Notifications and Reporting through host ports. Filing/disbursement may remain pending without corrupting approved calculation.

## Cross-cutting contract rules
Use trusted tenant/resource/actor and current server-side access decisions, opaque owner references, explicit purpose, source revision, effective and recorded times, correlation and idempotency. Commands use optimistic revision checks; uncertain commits require read-back with the original operation identity. Separate receipt, acceptance, completion and independent downstream acknowledgement. Durable mutations and their source-owned outbox commit atomically. Host supplies scoped persistence, migrations remain owner-owned, no shared schemas or private imports. Required missing evidence fails closed for the affected operation; optional adapters have explicit absent/degraded modes. Logging receives minimised diagnostics, Audit independently receives accountable events, Reporting derives authorised projections, Error Normalisation does not decide retries. Apply governing OWASP ASVS 5 L2 with applicable L3 controls, WCAG 2.2 AA, i18n, Privacy and Legal Compliance; no blanket compliance claim. Provider adapters are selected through documented ports, not mandatory Nuxt inheritance. Prefer commercially permissive, source-complete dependencies and existing platform contracts; exact versions/licences and threat models are implementation gates. Optional screens are host-mounted through the existing sidebar/dashboard convention; headless operation is independent and ADR-0012's Nuxt composition budget applies. No package, deployment or implementation is asserted.

## Optional GUI and acceptance

Protected Payroll dashboard with periods, input reconciliation, draft calculation, exceptions, independent approval, filings/disbursements, adjustments and restricted employee statements. Verify exact rounding and version-pinned rules; unsupported regime refusal; missing actual hours; late timesheet correction; duplicate run and unknown transfer; provider cutover without double pay; restricted cost projection; employment termination with outstanding obligations; holds, employee rights and headless operation. Deployment requires qualified jurisdiction-specific legal and technical acceptance, not a universal payroll assurance.
