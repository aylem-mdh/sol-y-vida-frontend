# Worker self profile

## Contract

`GET /api/Workers/me` returns the existing WorkerDto for the authenticated worker.
`PUT /api/Workers/me` accepts only `nombre`, `apellidos`, and `telefono` and returns
the updated WorkerDto. Names are required, trimmed, and limited to 100 characters.
Phone is required, validated as a phone number, trimmed, and limited to 30 characters.
Unknown JSON properties are rejected with 400, rather than silently ignored.

Both endpoints require the worker role and resolve ownership only through the JWT
NameIdentifier and Worker.UserId. Email matching is not an ownership fallback. Target
IDs in a query string cannot select a different worker. Missing links, inactive worker
records, inactive accounts and accounts no longer carrying the worker role are refused.
No session returns 401; other roles return 403. An administrator continues to manage
workers through the existing administrative endpoints, not this self-service route.

## Field ownership

| Fields | Self profile |
|---|---|
| Nombre, Apellidos, Telefono | Editable |
| Email | Read-only; authentication/assignment identity must not change here |
| DNI, FechaNacimiento | Official personal data; excluded from self updates |
| Especialidad, FechaAlta, Activo | Administrative; excluded from self updates |
| Id, UserId, role, permissions, visits, assigned clients | Never accepted in self updates |

Settings displays name, surname and phone inputs, with email, DNI and specialty in
read-only inputs. Birth date and administrative dates/status are not added to the UI.
Updating the personal name also synchronizes User.Nombre, not the account email,
password, role or activation state. A JWT already issued retains its display-name claim
until the next login; no token is replaced or printed during profile saving.

No model field, migration, SMTP configuration or new administrative update capability
is introduced. Client and family profile contracts remain separate and unchanged.

## Verification

The existing Recovery check project has a `--worker-profile` mode. It requires
`SOLYVIDA_RECOVERY_CHECKS=1` and `SOLYVIDA_RECOVERY_API_PID` matching the local API whose
SQL session is confirmed in SolVidaRecoveryDemoDb. Each run creates a unique
`workerprofile.validation.*@example.test` namespace and removes only its own fixtures.

Executed checks cover own GET/PUT, browser save/reload, English labels with unchanged
field permissions, anonymous/other-role/other-worker refusals, unknown fields and invalid
input, missing UserId links despite matching email, inactive workers with existing JWTs,
and unchanged identity, password, administrative fields and client assignments.

Fresh synthetic accounts and known fixture relations are used; existing demo or real
accounts are never reused. No email is sent. Full portal and visit checks are separate
and are not rerun by this focused mode.