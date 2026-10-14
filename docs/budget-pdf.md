# Budget PDF download

## Previous implementation

The main application could create, approve and list budgets but had no PDF endpoint or
download control. Printing an HTML page is not used as the PDF implementation. No alternate
worktree implementation was merged.

## Contract and permissions

`GET /api/Budgets/{id}/pdf` generates a real binary PDF server-side with PDFsharp (MIT).
It returns `application/pdf`, an attachment named `presupuesto-{id}.pdf`, and no-store
cache headers. The query is shared with budget listing to avoid differing ownership rules.

- Administrators can download approved and pending budgets for any client.
- Clients and families can download only approved budgets of their linked client.
- An excluded/unknown budget ID returns 404, without exposing its data.
- A worker or an account without a client/family link is forbidden; anonymous access is unauthorized.

No creation, calculation or approval contract changes. The PDF uses persisted Hours,
HourlyRate, VatPercent, Subtotal, VatAmount, Total and MonthlyEstimate without recalculating
or saving anything. No model field or migration is added.

## Content and runtime

The document includes Sol y Vida branding, budget ID, date, approval state, client name,
description, hours, hourly rate, base, VAT rate/amount, total, monthly estimate and the
existing masked last-four debit information. Monetary values use Spanish formatting and
EUR. Long text wraps and continues on A4 pages with a page identifier footer; Unicode text
and accented names are preserved. It is not an invoice or a tax-invoice numbering system.

The locally verified runtime is Windows with installed Arial fonts, which PDFsharp uses
through its Windows font resolver. Linux/containers were not validated; they require an
explicit licensed font resolver/assets before using this generator there. No production
deployment or font configuration outside the local environment was performed.

The existing budget UI downloads through authenticated Axios as a Blob and does not put
JWTs in URLs. PDF buttons appear on visible budget rows, with progress and generic errors.
Unexpected response types and failed requests are not saved as PDF files. Existing admin
creation/approval and client role/navigation remain intact.

## Executed Recovery checks

The existing runner has a `--budget-pdf` mode, guarded by explicit Recovery authorization
and the active API PID with a confirmed SQL session in SolVidaRecoveryDemoDb. Every run uses
a fresh `budgetpdf.validation.*@example.test` namespace, with approved, pending, foreign
and long-description budgets. It does not reuse demo or real accounts, seed generally,
send email or execute other feature modes.

PDF content is parsed with PdfPig, independently from PDFsharp. Checks cover the PDF
signature, MIME/attachment/cache headers, stored values (20 x 18 EUR, base 360.00,
VAT 75.60, total 435.60), Unicode, approval/debit presentation, multipage descriptions,
text inside page bounds and unchanged database values. Admin and client browser downloads
are saved temporarily and opened with the reader, not inferred from button visibility.

Negative cases include foreign/pending PDFs for client/family, worker/unlinked/anonymous
access and nonexistent IDs. Error UI is verified with browser interception, not claimed
as a real server outage. All fixture rows and temporary downloaded PDFs are removed after
the run; only its unique namespace is cleaned.