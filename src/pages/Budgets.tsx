import { useEffect, useMemo, useRef, useState } from "react";
import { isAxiosError } from "axios";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { createBudget, getBudgets, approveBudget, downloadBudgetPdf, type Budget } from "../services/budgetService";
import { Download, LoaderCircle } from "lucide-react";
import { getClients } from "../services/clientService";
import { useTranslation } from "react-i18next";
import { getServiceTariffs, updateServiceTariff, type ServiceTariff } from "../services/serviceTariffService";

type DraftLine = { serviceTariffId: number; quantity: number; daysPerMonth: number; notes: string };

type Role = "admin" | "family" | "client";

type ClientOption = { id: number; nombre: string; apellidos: string };

export default function Budgets() {
  const { t } = useTranslation();
  const storedRole = localStorage.getItem("role");
  const isAdmin = storedRole === "admin";
  const role: Role = isAdmin ? "admin" : storedRole === "client" ? "client" : "family";
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [tariffs, setTariffs] = useState<ServiceTariff[]>([]);
  const [lines, setLines] = useState<DraftLine[]>([{ serviceTariffId: 0, quantity: 4, daysPerMonth: 20, notes: "" }]);
  const [search, setSearch] = useState("");
  const [loadingBudgets, setLoadingBudgets] = useState(false);
  const [loadingClients, setLoadingClients] = useState(false);
  const [budgetsError, setBudgetsError] = useState(false);
  const [clientsError, setClientsError] = useState(false);
  const [downloadingIds, setDownloadingIds] = useState<Set<number>>(new Set());
  const [downloadError, setDownloadError] = useState(false);
  const [tariffError, setTariffError] = useState(false);
  const [budgetCreateError, setBudgetCreateError] = useState(false);
  const [savingTariffIds, setSavingTariffIds] = useState<Set<number>>(new Set());
  const savingTariffRef = useRef<Set<number>>(new Set());
  const [tariffSaveMessage, setTariffSaveMessage] = useState<{ type: "success" | "error"; key: string } | null>(null);
  const [form, setForm] = useState({
    clientId: 0,
    hours: 20,
    hourlyRate: 18,
    vatPercent: 21,
    description: "",
    directDebitReceiptEnabled: true,
    directDebitIbanLast4: "",
  });

  useEffect(() => {
    loadBudgets();
    if (isAdmin) {
      loadClients();
      loadTariffs();
    }
  }, [isAdmin]);

  async function loadBudgets() {
    try {
      setLoadingBudgets(true);
      setBudgetsError(false);
      const data = await getBudgets();
      setBudgets(data);
    } catch (error) {
      console.error(error);
      setBudgets([]);
      setBudgetsError(true);
    } finally {
      setLoadingBudgets(false);
    }
  }

  async function loadClients() {
    try {
      setLoadingClients(true);
      setClientsError(false);
      const data = await getClients();
      setClients(data);
      if (data.length > 0) {
        setForm((current) => ({ ...current, clientId: current.clientId || data[0].id }));
      }
    } catch (error) {
      console.error(error);
      setClients([]);
      setClientsError(true);
    } finally {
      setLoadingClients(false);
    }
  }

  async function loadTariffs() {
    try {
      setTariffError(false);
      const data = await getServiceTariffs();
      setTariffs(data);
      setLines((current) => current.map((line, index) => index === 0 && !line.serviceTariffId
        ? { ...line, serviceTariffId: data.find((tariff) => tariff.code === "home-care")?.id ?? data[0]?.id ?? 0 }
        : line));
    } catch (error) {
      console.error(error);
      setTariffError(true);
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return budgets.filter((budget) => `${budget.cliente} ${budget.description ?? ""}`.toLowerCase().includes(q));
  }, [budgets, search]);

  async function create() {
    if (!form.clientId || lines.length === 0 || lines.some((line) =>
      !line.serviceTariffId || line.quantity <= 0 || line.daysPerMonth <= 0 || line.daysPerMonth > 31)) {
      alert(t("budgetsPage.errors.required"));
      return;
    }

    try {
      setBudgetCreateError(false);
      await createBudget({
        ...form,
        lines: lines.map(({ serviceTariffId, quantity, daysPerMonth, notes }) => ({
          serviceTariffId,
          quantity,
          daysPerMonth,
          notes: notes.trim() || undefined,
        })),
      });
      await loadBudgets();
    } catch (error) {
      console.error(error);
      setBudgetCreateError(true);
    }
  }

  const hasClients = clients.length > 0;
  const disableBudgetCreation = loadingClients || clientsError || !hasClients;

  async function approve(id: number) {
    await approveBudget(id);
    await loadBudgets();
  }

  async function downloadPdf(id: number) {
    setDownloadError(false);
    setDownloadingIds((current) => new Set(current).add(id));
    try {
      await downloadBudgetPdf(id);
    } catch {
      setDownloadError(true);
    } finally {
      setDownloadingIds((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
    }

  }

  function addLine() {
    setLines((current) => [...current, {
      serviceTariffId: tariffs[0]?.id ?? 0,
      quantity: 1,
      daysPerMonth: 1,
      notes: "",
    }]);
  }

  async function saveTariff(tariff: ServiceTariff) {
    if (savingTariffRef.current.has(tariff.id)) return;

    const isPersonalized = tariff.code === "personalized";
    const name = tariff.name.trim();
    const isValidAmount = (amount: number) => Number.isFinite(amount) && amount >= 0 && amount <= 100000;
    if (!isValidAmount(tariff.basePrice) || !isValidAmount(tariff.initialSupplement)
      || (isPersonalized && (name.length === 0 || name.length > 100))) {
      setTariffSaveMessage({ type: "error", key: "budgetsPage.tariffSaveInvalid" });
      return;
    }

    savingTariffRef.current.add(tariff.id);
    setSavingTariffIds((current) => new Set(current).add(tariff.id));
    setTariffSaveMessage(null);
    try {
      const roundMoney = (amount: number) => Math.round(amount * 100) / 100;
      const updated = await updateServiceTariff(tariff.id, {
        ...(isPersonalized ? { name } : {}),
        basePrice: roundMoney(tariff.basePrice),
        initialSupplement: roundMoney(tariff.initialSupplement),
      });
      setTariffs((current) => current.map((item) => item.id === updated.id ? updated : item));
      setTariffSaveMessage({ type: "success", key: "budgetsPage.tariffSaved" });
    } catch (error) {
      // Log only the status: the Axios error object carries the Authorization header.
      const status = isAxiosError(error) ? error.response?.status : undefined;
      console.error("Tariff save failed", status ?? "network error");
      setTariffSaveMessage({
        type: "error",
        key: status === 400 ? "budgetsPage.tariffSaveInvalid"
          : status === 401 ? "budgetsPage.tariffSaveUnauthorized"
          : status === 403 ? "budgetsPage.tariffSaveForbidden"
          : "budgetsPage.tariffSaveServerError",
      });
    } finally {
      savingTariffRef.current.delete(tariff.id);
      setSavingTariffIds((current) => {
        const next = new Set(current);
        next.delete(tariff.id);
        return next;
      });
    }
  }

  const formatMoney = (amount: number) => `${amount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
  const monthlyLineTotal = (line: DraftLine) => {
    const tariff = tariffs.find((item) => item.id === line.serviceTariffId);
    return tariff ? Math.round((tariff.basePrice + tariff.initialSupplement) * line.quantity * line.daysPerMonth * 100) / 100 : 0;
  };
  const monthlySubtotal = lines.reduce((sum, line) => sum + monthlyLineTotal(line), 0);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.budgets")}
          subtitle={t("budgetsPage.subtitle")}
          name={isAdmin ? t("profiles.adminName") : t("profiles.familyName")}
          role={isAdmin ? t("roles.admin") : role === "client" ? t("roles.client") : t("roles.family")}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("budgetsPage.searchPlaceholder")}
        />

        {/* A 401 clears the stored session, which hides the admin section, so this message lives outside it. */}
        {tariffSaveMessage?.key === "budgetsPage.tariffSaveUnauthorized" && (
          <p role="alert" className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">{t(tariffSaveMessage.key)}</p>
        )}

        {isAdmin && (
          <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <h2 className="text-xl font-bold text-[#1F2937]">{t("budgetsPage.newBudget")}</h2>
            {budgetCreateError && <p role="alert" className="mt-3 text-sm text-red-700">{t("budgetsPage.createError")}</p>}
            {tariffError && <p role="alert" className="mt-3 text-sm text-red-700">{t("budgetsPage.tariffsError")}</p>}

            {clientsError && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                <p>{t("budgetsPage.clientsLoadError")}</p>
                <p className="mt-1 text-red-600">{t("budgetsPage.backendHint")}</p>
              </div>
            )}

            {!clientsError && !loadingClients && !hasClients && (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-800">
                {t("budgetsPage.noClientsAvailable")}
              </div>
            )}

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              <select value={form.clientId} onChange={(e) => setForm((c) => ({ ...c, clientId: Number(e.target.value) }))} disabled={disableBudgetCreation} className="rounded-xl border border-[#D7E5E3] px-4 py-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400">
                {clients.map((client) => <option key={client.id} value={client.id}>{client.nombre} {client.apellidos}</option>)}
              </select>
              <input type="number" value={form.vatPercent} onChange={(e) => setForm((c) => ({ ...c, vatPercent: Number(e.target.value) }))} placeholder={t("budgetsPage.vat")} disabled={disableBudgetCreation} className="rounded-xl border border-[#D7E5E3] px-4 py-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400" />
              <input value={form.directDebitIbanLast4} onChange={(e) => setForm((c) => ({ ...c, directDebitIbanLast4: e.target.value }))} placeholder={t("budgetsPage.ibanLast4")} disabled={disableBudgetCreation} className="rounded-xl border border-[#D7E5E3] px-4 py-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400" />
              <input value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} placeholder={t("forms.common.description")} disabled={disableBudgetCreation} className="rounded-xl border border-[#D7E5E3] px-4 py-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400" />
            </div>
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-[#1F2937]">{t("budgetsPage.lines")}</h3>
              {lines.map((line, index) => {
                const tariff = tariffs.find((item) => item.id === line.serviceTariffId);
                return (
                  <div key={index} className="grid grid-cols-1 gap-3 rounded-2xl border border-[#D8EFEA] p-4 md:grid-cols-6">
                    <select aria-label={t("budgetsPage.service")} value={line.serviceTariffId} onChange={(event) => setLines((current) => current.map((item, i) => i === index ? { ...item, serviceTariffId: Number(event.target.value) } : item))} disabled={disableBudgetCreation || tariffs.length === 0} className="rounded-xl border border-[#D7E5E3] bg-amber-100 px-3 py-2 md:col-span-2">
                      {tariffs.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                    <label className="text-xs font-medium text-[#4B5563]">{tariff?.unit === "€/km" ? t("budgetsPage.kilometers") : t("budgetsPage.hours")}
                      <input aria-label={tariff?.unit === "€/km" ? t("budgetsPage.kilometers") : t("budgetsPage.hours")} type="number" min="0.01" step="0.01" value={line.quantity} onChange={(event) => setLines((current) => current.map((item, i) => i === index ? { ...item, quantity: Number(event.target.value) } : item))} className="mt-1 w-full rounded-xl border border-[#D7E5E3] bg-amber-100 px-3 py-2" />
                    </label>
                    <label className="text-xs font-medium text-[#4B5563]">{t("budgetsPage.daysPerMonth")}
                      <input aria-label={t("budgetsPage.daysPerMonth")} type="number" min="0.01" max="31" step="0.01" value={line.daysPerMonth} onChange={(event) => setLines((current) => current.map((item, i) => i === index ? { ...item, daysPerMonth: Number(event.target.value) } : item))} className="mt-1 w-full rounded-xl border border-[#D7E5E3] bg-amber-100 px-3 py-2" />
                    </label>
                    <div className="rounded-xl bg-emerald-100 px-3 py-2 text-sm">
                      <p className="text-xs text-[#4B5563]">{t("budgetsPage.applicablePrice")}</p>
                      <p className="font-semibold">{tariff ? `${formatMoney(tariff.basePrice + tariff.initialSupplement)} ${tariff.unit}` : "—"}</p>
                      <p className="mt-1 text-xs text-[#4B5563]">{t("budgetsPage.monthlyLineTotal")}</p>
                      <p className="font-bold">{formatMoney(monthlyLineTotal(line))}</p>
                    </div>
                    <label className="text-xs font-medium text-[#4B5563]">{t("budgetsPage.observations")}
                      <input aria-label={t("budgetsPage.observations")} value={line.notes} maxLength={1000} onChange={(event) => setLines((current) => current.map((item, i) => i === index ? { ...item, notes: event.target.value } : item))} className="mt-1 w-full rounded-xl border border-[#D7E5E3] bg-amber-100 px-3 py-2" />
                    </label>
                    <button type="button" aria-label={t("budgetsPage.removeLine")} onClick={() => setLines((current) => current.filter((_, i) => i !== index))} className="text-sm font-semibold text-red-700">{t("budgetsPage.removeLine")}</button>
                  </div>
                );
              })}
              <button type="button" onClick={addLine} disabled={disableBudgetCreation || tariffs.length === 0} className="rounded-xl border border-[#D8EFEA] px-4 py-2 font-semibold text-[#0F817C] disabled:opacity-50">{t("budgetsPage.addLine")}</button>
              <p className="rounded-xl bg-emerald-100 p-3 text-right font-bold text-[#1F2937]">{t("budgetsPage.monthlySubtotal")}: {formatMoney(monthlySubtotal)}</p>
            </div>
            {isAdmin && tariffs.length > 0 && (
              <details className="mt-6 rounded-2xl border border-[#D8EFEA] p-4">
                <summary className="cursor-pointer font-semibold text-[#1F2937]">{t("budgetsPage.manageTariffs")}</summary>
                <div className="mt-4 space-y-3">
                  {tariffs.map((tariff) => (
                    <div key={tariff.id} className="grid grid-cols-1 items-center gap-2 md:grid-cols-5">
                      {tariff.code === "personalized" ? (
                        <input aria-label={`${t("budgetsPage.service")} ${tariff.code}`} value={tariff.name} maxLength={100} onChange={(event) => setTariffs((current) => current.map((item) => item.id === tariff.id ? { ...item, name: event.target.value } : item))} className="rounded-lg bg-amber-100 px-3 py-2 md:col-span-2" />
                      ) : <span className="md:col-span-2">{tariff.name}</span>}
                      <label className="text-xs">{t("budgetsPage.basePrice")}
                        <input aria-label={`${t("budgetsPage.basePrice")} ${tariff.code}`} type="number" min="0" step="0.01" value={tariff.basePrice} onChange={(event) => setTariffs((current) => current.map((item) => item.id === tariff.id ? { ...item, basePrice: Number(event.target.value) } : item))} className="mt-1 w-full rounded-lg bg-amber-100 px-3 py-2" />
                      </label>
                      <label className="text-xs">{t("budgetsPage.supplement")}
                        <input aria-label={`${t("budgetsPage.supplement")} ${tariff.code}`} type="number" min="0" step="0.01" value={tariff.initialSupplement} onChange={(event) => setTariffs((current) => current.map((item) => item.id === tariff.id ? { ...item, initialSupplement: Number(event.target.value) } : item))} className="mt-1 w-full rounded-lg bg-amber-100 px-3 py-2" />
                      </label>
                      <button type="button" disabled={savingTariffIds.has(tariff.id)} aria-busy={savingTariffIds.has(tariff.id)} onClick={() => void saveTariff(tariff)} className="rounded-lg border border-[#D8EFEA] px-3 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50">{savingTariffIds.has(tariff.id) ? t("forms.common.saving") : t("budgetsPage.saveTariff")}</button>
                    </div>
                  ))}
                </div>
                {tariffSaveMessage?.type === "success" && <p role="status" className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-800">{t(tariffSaveMessage.key)}</p>}
                {tariffSaveMessage?.type === "error" && tariffSaveMessage.key !== "budgetsPage.tariffSaveUnauthorized" && <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{t(tariffSaveMessage.key)}</p>}
              </details>
            )}
            <button onClick={create} disabled={disableBudgetCreation || tariffs.length === 0} className="mt-4 rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{t("budgetsPage.createBudget")}</button>
          </section>
        )}

        <section className="mt-6 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
          {downloadError && <p role="alert" className="mb-4 text-sm text-red-700">{t("budgetPdf.error")}</p>}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-[#1F2937]">{t("budgetsPage.history")}</h2>
          </div>

          <div className="mt-4 space-y-3">
            {loadingBudgets ? (
              <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">{t("forms.common.saving")}</div>
            ) : budgetsError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
                <p>{t("budgetsPage.budgetsLoadError")}</p>
                <p className="mt-1 text-red-600">{t("budgetsPage.backendHint")}</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">{t("budgetsPage.empty")}</div>
            ) : filtered.map((budget) => (
              <article key={budget.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-[#1F2937]">{budget.cliente}</p>
                    {budget.lines?.length ? (
                      <div className="mt-1 space-y-1 text-sm text-[#4B5563]">
                        {budget.lines.map((line) => <p key={line.id}>{line.serviceName}: {line.quantity} {line.unit === "€/km" ? "km" : "h"} x {line.daysPerMonth} {t("budgetsPage.daysShort")} — {formatMoney(line.monthlyTotal)}{line.notes ? ` · ${line.notes}` : ""}</p>)}
                      </div>
                    ) : <p className="mt-1 text-sm text-[#4B5563]">{budget.hours}h x {budget.hourlyRate.toFixed(2)} EUR</p>}
                    <p className="text-sm text-[#4B5563]">{t("budgetsPage.base")}: {budget.subtotal.toFixed(2)} EUR | {t("budgetsPage.vatLabel")}: {budget.vatAmount.toFixed(2)} EUR | {t("budgetsPage.total")}: {budget.total.toFixed(2)} EUR</p>
                    <p className="text-sm text-[#4B5563]">{t("budgetsPage.monthlyEstimate")}: {budget.monthlyEstimate.toFixed(2)} EUR</p>
                    <p className="text-xs text-[#6B7280]">{t("budgetsPage.directDebit")}: {budget.directDebitReceiptEnabled ? `${t("common.yes")} (****${budget.directDebitIbanLast4 ?? ""})` : t("common.no")}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${budget.isApproved ? "bg-[#ECFAF8] text-[#0F9E98]" : "bg-[#FFF5E8] text-[#9A5A13]"}`}>
                      {budget.isApproved ? t("budgetsPage.approved") : t("budgetsPage.pending")}
                    </span>
                    <button type="button" onClick={() => void downloadPdf(budget.id)} disabled={downloadingIds.has(budget.id)} aria-label={t("budgetPdf.download")} title={t("budgetPdf.download")} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#D8EFEA] bg-white text-[#0F9E98] disabled:cursor-wait disabled:opacity-60">
                      {downloadingIds.has(budget.id) ? <LoaderCircle size={18} className="animate-spin" /> : <Download size={18} />}
                    </button>
                    {isAdmin && !budget.isApproved && (
                      <button onClick={() => approve(budget.id)} className="text-xs font-semibold text-[#0F9E98]">{t("budgetsPage.approve")}</button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
