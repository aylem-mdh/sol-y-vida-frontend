# Client service catalog

Previously the client's My services menu opened family follow-up, which reads visits.
The operational Services API was limited to administrators and assigned workers. Neither
provided an independent client catalog.

## Minimal catalog contract

- `GET /api/Services/catalog`: read-only list for authenticated role `client`.
- `GET /api/Services/catalog/{id}`: read-only detail under the same filter; excluded IDs return 404.
- `/client/services`: client-only frontend route, reached from My services.

Available catalog entries are existing Service records with `Activo=true` and both
`AssignedClientId` and `AssignedWorkerId` null. This deliberately separates general catalog
templates from operational assignments. No Visit record is needed. No field or migration
is introduced. To publish a general entry, an administrator creates/enables an unassigned
service through the existing service-management contract. Assigning or disabling it removes
it from the client catalog; it does not delete or modify its operational data.

The response contains only id, nombre, descripcion, categoria, precioPorHora,
duracionMinutos and frecuencia. Notes, client/worker IDs, relationships, operational dates
and audit timestamps are never serialized by this contract. Catalog descriptions are
catalog-facing text; administrators must not place personal information in them.

## Permissions and compatibility

Existing operational GET /Services and GET /Services/{id} remain AdminOrWorker. Existing
POST, PUT and DELETE remain AdminOnly. Client, worker and family mutation attempts are
forbidden; anonymous requests are unauthorized. Family does not receive catalog access
through this change. Admin/worker screens are unchanged. Visit calendar and follow-up
remain separate portal features.

The client screen provides search, detail, loading, empty and failure states. Search is
available on desktop and mobile. The table scrolls within its container on narrow screens;
it does not enlarge the whole page. No create, edit or delete control appears for clients.

## Recovery verification

The existing Recovery runner has a `--client-catalog` mode, requiring explicit authorization
and the API PID with a confirmed SQL session in SolVidaRecoveryDemoDb. It creates fresh
synthetic accounts and catalog/assigned/inactive entries under a unique
`catalog.validation.*` namespace. Both synthetic clients have zero visits.

Executed checks cover list/detail, exact response fields, rejection of excluded IDs,
private operational API denial, admin-only management, disabling and deletion, navigation,
search, modal detail, empty/error states, and desktop/mobile rendering. Missing/failure UI
is tested with browser interception, not presented as a real API outage. Fixtures are
cleaned by their own unique namespace, leaving existing accounts and records intact.

No SMTP settings or mail delivery are involved. No other validated module is rerun.