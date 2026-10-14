# Client invitations

## Current delivery boundary

The API creates an inactive client account with an empty password hash. A cryptographically
random activation token expires after 24 hours. Newly issued tokens are stored as SHA-256
hashes and are consumed atomically. Previously issued tokens remain compatible. Activating
an active account or reusing/expiring a token cannot overwrite its password. New passwords
must contain at least 12 characters and at most 72 UTF-8 bytes (BCrypt limit).

The administrator must enable portal access when creating the client. Account/client email
checks run in the same serializable transaction. A conflict does not change an existing
account. SMTP delivery runs after commit: delivery failure leaves the account pending,
not duplicated. Use the existing resend action rather than repeating the client creation.
Resend is refused for an active account; it never clears an existing password. Resending
a pending invitation invalidates the previous link.

No token is returned by client endpoints or public password recovery. Forgotten-password
requests return the same message for existing and nonexistent accounts. For a pending
account they send an activation link, not a password-reset shortcut.

## External configuration required

Configure these API environment variables or equivalent .NET user secrets. Do not put
credentials in appsettings, frontend VITE variables, Git, command history, or screenshots.

| Variable | Required value |
|---|---|
| `Email__Enabled` | `true` to enable actual SMTP delivery; absent/false disables it |
| `Email__SmtpHost` | SMTP host supplied by the chosen provider |
| `Email__SmtpPort` | SMTP TLS port, normally 587 or 465 |
| `Email__Security` | `StartTls` for 587 or `SslOnConnect` for 465; TLS is mandatory |
| `Email__Username` | Provider-approved sending identity |
| `Email__Password` | SMTP app password/credential supplied through a secret store |
| `Email__FromAddress` | Provider-authorized sender, e.g. `solyvidacare@gmail.com` |
| `Email__FrontendBaseUrl` | Trusted frontend origin, without query/fragment; locally `http://localhost:5173` |

If Gmail is chosen, its SMTP settings are `smtp.gmail.com`, 587/StartTls. The account owner
must enable two-step verification and obtain an app password, subject to their account
policy. This code uses SMTP authentication, not OAuth. Never provide the account's normal
password to the assistant. Other providers require their own SMTP credentials and sender
verification, with SPF/DKIM/DMARC where applicable.

No provider or credentials were configured in this recovery environment. Real delivery
therefore remains blocked, not simulated. Restart the local API after externally setting
configuration; verify Recovery again before any write. Do not configure/send to real
clients during recovery validation.

## Observable outcomes

Client account actions return `invitationDeliveryStatus`: `notConfigured`, `failed`, or
`sent`. `sent` means SMTP accepted the message, not that the inbox received it. Missing
configuration causes no network send. A failure logs no recipient, exception body, URL,
token, or password; the administrator sees a retryable status.

Links use `/activate-account#token=...` or `/reset-password#token=...`. The fragment is not
sent in HTTP requests/referrers. Treat browser history and email content as sensitive.
Do not enable SMTP protocol logging or EF sensitive-data logging. Legacy query links
remain supported, but new links do not place tokens in server request URLs.

## Recovery-only checks

The regression check project `tests/ClientInvitation.RecoveryChecks` requires explicit
`SOLYVIDA_RECOVERY_CHECKS=1`, the main Development API on 7131, its exact Recovery startup
guard, and disabled email delivery. It creates fresh synthetic accounts with a unique
`invitation.validation.*@example.test` prefix and never reuses demo accounts. It verifies
creation, duplicate refusal, hashed tokens, expiry, single-use activation/reset, password
preservation on resend, uniform recovery responses and direct client login. Tokens and
passwords are never printed. It does not verify mailbox delivery.

Before real-delivery completion: configure the provider externally, use a dedicated
synthetic mailbox controlled by the tester, inspect the delivered link, activate via the
browser, verify login and expiry/replay, and check logs contain no sensitive values.