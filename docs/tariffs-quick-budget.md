# Tariff catalog and quick budgets

The commercial tariff catalog is separate from operational `Services` records. This
keeps existing assigned/demo services and their rates unchanged. The initial catalog
contains the eight approved entries, with zero initial supplements and units of €/hora
or €/km.

Administrators can read and edit prices and initial supplements. Only the personalized
tariff name can be changed. A budget line takes a tariff snapshot at creation so future
catalog edits do not change existing budgets. There is no delete endpoint for tariffs.

Quick-budget lines store service name, unit, base price, initial supplement, applicable
price, quantity, days per month, monthly total and observations. Monthly line total is
`(base price + initial supplement) × quantity × days per month`; the km tariff uses
kilometres as its quantity. Budget subtotal is the sum of line totals.

Weekend and holiday tariffs are selected explicitly. No date-based classification,
holiday calendar, or automatic tariff switching is implemented.

The existing VAT percentage/default, subtotal/VAT/total calculation and approved-budget
PDF endpoint are reused. The PDF prints persisted line snapshots and budget totals;
historical budgets without lines continue to use their original hours/rate rendering.
The migration creates the tariff table and line table without changing operational
services or historical budgets.
