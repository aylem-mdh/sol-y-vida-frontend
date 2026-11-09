import { useEffect, useMemo, useRef, useState } from "react";
import { isAxiosError } from "axios";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { createBudget, createBudgetAgreement, getBudgets, updateBudgetStatus, deleteBudget, downloadAcceptancePdf, downloadBudgetPdf, type Budget, type BudgetStatus } from "../services/budgetService";
import { Download, FileCheck2, LoaderCircle, Trash2 } from "lucide-react";
import { getClients } from "../services/clientService";
import { useTranslation } from "react-i18next";
import { getServiceTariffs, updateServiceTariff, type ServiceTariff } from "../services/serviceTariffService";

type DraftLine = { serviceTariffId: number; quantity: string; daysPerMonth: string; notes: string };
type ParsedLine = Omit<DraftLine, "quantity" | "daysPerMonth"> & { quantity: number | null; daysPerMonth: number | null };

function parseLineNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(trimmed)) return null;
  const number = Number(trimmed.replace(",", "."));
  return Number.isFinite(number) ? number : null;
}

function isValidLine(line: ParsedLine): line is ParsedLine & { quantity: number; daysPerMonth: number } {
  return line.quantity !== null && line.quantity >= 0.01 && line.quantity <= 100000
    && line.daysPerMonth !== null && line.daysPerMonth >= 0.01 && line.daysPerMonth <= 31;
}

type Role = "admin" | "family" | "client";

type ClientOption = { id: number; nombre: string; apellidos: string };

function BudgetStatusEditor({ budget, onSaved }: { budget: Budget; onSaved: () => Promise<void> }) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<BudgetStatus>(budget.isApproved ? "accepted" : budget.isRejected ? "rejected" : "pending");
  const [date, setDate] = useState(budget.acceptanceDate ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  async function save() {
    setSaving(true);
    setError(false);
    try {
      await updateBudgetStatus(budget.id, status, date);
      await onSaved();
    } catch (error) {
      console.error("Budget status update failed", isAxiosError(error) ? error.response?.status : "error");
      setError(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-2 text-sm">
      <label>{t("budgetStatus.change")}
        <select value={status} onChange={(event) => setStatus(event.target.value as BudgetStatus)} disabled={saving} className="mt-1 block w-full rounded-lg border p-2">
          <option value="pending">{t("budgetStatus.pending")}</option>
          <option value="accepted">{t("budgetStatus.accepted")}</option>
          <option value="rejected">{t("budgetStatus.rejected")}</option>
        </select>
      </label>
      {status === "accepted" && (
        <label>{t("budgetStatus.acceptanceDate")}
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} disabled={saving} className="mt-1 block w-full rounded-lg border p-2" />
        </label>
      )}
      <button type="button" disabled={saving} onClick={() => void save()} className="rounded-lg border border-[#D8EFEA] px-3 py-2 font-semibold text-[#0F817C] disabled:opacity-50">
        {saving ? t("forms.common.saving") : t("budgetStatus.save")}
      </button>
      {error && <p role="alert" className="text-red-700">{t("budgetStatus.error")}</p>}
    </div>
  );
}

export default function Budgets() {
  const { t } = useTranslation();
  const storedRole = localStorage.getItem("role");
  const isAdmin = storedRole === "admin";
  const role: Role = isAdmin ? "admin" : storedRole === "client" ? "client" : "family";
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [tariffs, setTariffs] = useState<ServiceTariff[]>([]);
  const [lines, setLines] = useState<DraftLine[]>([{ serviceTariffId: 0, quantity: "4", daysPerMonth: "20", notes: "" }]);
  const [search, setSearch] = useState("");
  const [loadingBudgets, setLoadingBudgets] = useState(false);
  const [loadingClients, setLoadingClients] = useState(false);
  const [budgetsError, setBudgetsError] = useState(false);
  const [clientsError, setClientsError] = useState(false);
  const [downloadingIds, setDownloadingIds] = useState<Set<number>>(new Set());
  const [downloadingAcceptanceIds, setDownloadingAcceptanceIds] = useState<Set<number>>(new Set());
  const [downloadError, setDownloadError] = useState(false);
  const [selectedAgreementBudgetIds, setSelectedAgreementBudgetIds] = useState<Set<number>>(new Set());
  const [agreementPaymentMethod, setAgreementPaymentMethod] = useState("");
  const [agreementFirstPaymentDate, setAgreementFirstPaymentDate] = useState("");
  const [creatingAgreement, setCreatingAgreement] = useState(false);
  const [agreementError, setAgreementError] = useState(false);
  const [agreementSuccess, setAgreementSuccess] = useState(false);
  const [tariffError, setTariffError] = useState(false);
  const [budgetCreateError, setBudgetCreateError] = useState<string | null>(null);
  const [budgetCreateSuccess, setBudgetCreateSuccess] = useState(false);
  const [creatingBudget, setCreatingBudget] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const [savingTariffIds, setSavingTariffIds] = useState<Set<number>>(new Set());
  const savingTariffRef = useRef<Set<number>>(new Set());
  const [tariffSaveMessage, setTariffSaveMessage] = useState<{ type: "success" | "error"; key: string } | null>(null);
  const [form, setForm] = useState({
    clientId: 0,
    hours: 20,
    hourlyRate: 18,
    vatPercent: 21,
    description: "",
    directDebitReceiptEnabled: false,
    directDebitIbanLast4: "",
    serviceStartDate: "",
    serviceEndDate: "",
    serviceType: "",
    serviceDays: "",
    serviceStartTime: "",
    serviceEndTime: "",
    serviceAddress: "",
    serviceCity: "",
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
    setBudgetCreateSuccess(false);
    setBudgetCreateError(null);
    if (!form.clientId || lines.length === 0 || lines.some((line) => !line.serviceTariffId)) {
      setBudgetCreateError(t("budgetsPage.errors.required"));
      return;
    }
    const parsedLines = lines.map((line) => ({
      ...line,
      quantity: parseLineNumber(line.quantity),
      daysPerMonth: parseLineNumber(line.daysPerMonth),
    }));
    if (!parsedLines.every(isValidLine)) {
      setBudgetCreateError(t("budgetsPage.invalidLineNumbers"));
      return;
    }
    if (!Number.isFinite(form.vatPercent) || form.vatPercent < 0 || form.vatPercent > 100) {
      setBudgetCreateError(t("budgetsPage.invalidVat"));
      return;
    }
    if ((form.serviceStartDate && form.serviceEndDate && form.serviceStartDate > form.serviceEndDate)
      || (form.serviceStartTime && form.serviceEndTime && form.serviceStartTime >= form.serviceEndTime)) {
      setBudgetCreateError(t("budgetDetails.invalidPeriod"));
      return;
    }
    const iban = form.directDebitIbanLast4.trim();
    if (form.directDebitReceiptEnabled && !/^\d{4}$/.test(iban)) {
      setBudgetCreateError(t("budgetsPage.invalidIban"));
      return;
    }

    try {
      setCreatingBudget(true);
      await createBudget({
        clientId: form.clientId,
        vatPercent: form.vatPercent,
        description: form.description.trim() || undefined,
        directDebitReceiptEnabled: form.directDebitReceiptEnabled,
        directDebitIbanLast4: form.directDebitReceiptEnabled ? iban : undefined,
        serviceStartDate: form.serviceStartDate || undefined,
        serviceEndDate: form.serviceEndDate || undefined,
        serviceType: form.serviceType.trim() || undefined,
        serviceDays: form.serviceDays.trim() || undefined,
        serviceStartTime: form.serviceStartTime || undefined,
        serviceEndTime: form.serviceEndTime || undefined,
        serviceAddress: form.serviceAddress.trim() || undefined,
        serviceCity: form.serviceCity.trim() || undefined,
        lines: parsedLines.map(({ serviceTariffId, quantity, daysPerMonth, notes }) => ({
          serviceTariffId,
          quantity,
          daysPerMonth,
          notes: notes.trim() || undefined,
        })),
      });
      setBudgetCreateSuccess(true);
      setForm((current) => ({ ...current, description: "", directDebitIbanLast4: "" }));
      await loadBudgets();
    } catch (error) {
      const status = isAxiosError(error) ? error.response?.status : undefined;
      console.error("Budget creation failed", status ?? "network error");
      setBudgetCreateError(serverErrorMessage(error) ?? t("budgetsPage.createError"));
    } finally {
      setCreatingBudget(false);
    }
  }

  function serverErrorMessage(error: unknown): string | null {
    if (!isAxiosError(error) || error.response?.status !== 400) return null;
    const data = error.response.data as unknown;
    if (typeof data === "string" && data.trim()) return data;
    if (data && typeof data === "object") {
      const { errors, message, title } = data as { errors?: Record<string, string[]>; message?: string; title?: string };
      const first = errors ? Object.values(errors).flat()[0] : undefined;
      return first ?? message ?? title ?? null;
    }
    return null;
  }

  const hasClients = clients.length > 0;
  const disableBudgetCreation = loadingClients || clientsError || !hasClients;
  const selectedAgreementClientId = budgets.find((budget) => selectedAgreementBudgetIds.has(budget.id))?.clientId;

  async function remove(id: number) {
    if (!window.confirm(t("budgetsPage.deleteConfirm"))) return;
    setDeleteError(false);
    setDeletingIds((current) => new Set(current).add(id));
    try {
      await deleteBudget(id);
      setBudgets((current) => current.filter((budget) => budget.id !== id));
    } catch (error) {
      console.error("Budget deletion failed", isAxiosError(error) ? error.response?.status : "error");
      setDeleteError(true);
    } finally {
      setDeletingIds((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
    }
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

  async function downloadAcceptance(id: number) {
    setDownloadError(false);
    setDownloadingAcceptanceIds((current) => new Set(current).add(id));
    try {
      await downloadAcceptancePdf(id);
    } catch (error) {
      console.error("Acceptance PDF download failed", isAxiosError(error) ? error.response?.status : "error");
      setDownloadError(true);
    } finally {
      setDownloadingAcceptanceIds((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
    }
  }

  async function createAgreement() {
    if (selectedAgreementBudgetIds.size === 0) return;
    setCreatingAgreement(true);
    setAgreementError(false);
    setAgreementSuccess(false);
    try {
      await createBudgetAgreement({
        budgetIds: [...selectedAgreementBudgetIds],
        paymentMethod: agreementPaymentMethod.trim() || undefined,
        firstPaymentDate: agreementFirstPaymentDate || undefined,
      });
      setSelectedAgreementBudgetIds(new Set());
      setAgreementPaymentMethod("");
      setAgreementFirstPaymentDate("");
      setAgreementSuccess(true);
      await loadBudgets();
    } catch (error) {
      console.error("Budget agreement creation failed", isAxiosError(error) ? error.response?.status : "error");
      setAgreementError(true);
    } finally {
      setCreatingAgreement(false);
    }
  }

  function addLine() {
    setLines((current) => [...current, {
      serviceTariffId: tariffs[0]?.id ?? 0,
      quantity: "1",
      daysPerMonth: "1",
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
    const quantity = parseLineNumber(line.quantity);
    const daysPerMonth = parseLineNumber(line.daysPerMonth);
    return tariff && quantity !== null && daysPerMonth !== null
      ? Math.round((tariff.basePrice + tariff.initialSupplement) * quantity * daysPerMonth * 100) / 100 : 0;
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
            {budgetCreateError && <p role="alert" className="mt-3 text-sm text-red-700">{budgetCreateError}</p>}
            {budgetCreateSuccess && <p role="status" className="mt-3 text-sm font-medium text-emerald-800">{t("budgetsPage.createSuccess")}</p>}
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
              <label className="flex items-center gap-2 rounded-xl border border-[#D7E5E3] px-4 py-3 text-sm md:col-span-1">
                <input type="checkbox" checked={form.directDebitReceiptEnabled} onChange={(e) => setForm((c) => ({ ...c, directDebitReceiptEnabled: e.target.checked }))} disabled={disableBudgetCreation} />
                {t("budgetsPage.directDebitToggle")}
              </label>
              {form.directDebitReceiptEnabled && (
                <input value={form.directDebitIbanLast4} inputMode="numeric" maxLength={4} onChange={(e) => setForm((c) => ({ ...c, directDebitIbanLast4: e.target.value.replace(/\D/g, "") }))} placeholder={t("budgetsPage.ibanLast4")} disabled={disableBudgetCreation} className="rounded-xl border border-[#D7E5E3] px-4 py-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400" />
              )}
              <input value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} placeholder={t("forms.common.description")} disabled={disableBudgetCreation} className="rounded-xl border border-[#D7E5E3] px-4 py-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400" />
            </div>
            <h3 className="mt-5 font-semibold text-[#1F2937]">{t("budgetDetails.title")}</h3>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
              <input aria-label={t("budgetDetails.serviceType")} value={form.serviceType} onChange={(event) => setForm((current) => ({ ...current, serviceType: event.target.value }))} placeholder={t("budgetDetails.serviceType")} maxLength={200} disabled={disableBudgetCreation} className="rounded-xl border border-[#D7E5E3] px-4 py-3" />
              <label className="text-sm">{t("budgetDetails.startDate")}<input type="date" value={form.serviceStartDate} onChange={(event) => setForm((current) => ({ ...current, serviceStartDate: event.target.value }))} disabled={disableBudgetCreation} className="mt-1 block w-full rounded-xl border border-[#D7E5E3] px-4 py-3" /></label>
              <label className="text-sm">{t("budgetDetails.endDate")}<input type="date" value={form.serviceEndDate} onChange={(event) => setForm((current) => ({ ...current, serviceEndDate: event.target.value }))} disabled={disableBudgetCreation} className="mt-1 block w-full rounded-xl border border-[#D7E5E3] px-4 py-3" /></label>
              <input aria-label={t("budgetDetails.days")} value={form.serviceDays} onChange={(event) => setForm((current) => ({ ...current, serviceDays: event.target.value }))} placeholder={t("budgetDetails.days")} maxLength={200} disabled={disableBudgetCreation} className="rounded-xl border border-[#D7E5E3] px-4 py-3" />
              <label className="text-sm">{t("budgetDetails.startTime")}<input type="time" value={form.serviceStartTime} onChange={(event) => setForm((current) => ({ ...current, serviceStartTime: event.target.value }))} disabled={disableBudgetCreation} className="mt-1 block w-full rounded-xl border border-[#D7E5E3] px-4 py-3" /></label>
              <label className="text-sm">{t("budgetDetails.endTime")}<input type="time" value={form.serviceEndTime} onChange={(event) => setForm((current) => ({ ...current, serviceEndTime: event.target.value }))} disabled={disableBudgetCreation} className="mt-1 block w-full rounded-xl border border-[#D7E5E3] px-4 py-3" /></label>
              <input aria-label={t("budgetDetails.address")} value={form.serviceAddress} onChange={(event) => setForm((current) => ({ ...current, serviceAddress: event.target.value }))} placeholder={t("budgetDetails.address")} maxLength={250} disabled={disableBudgetCreation} className="rounded-xl border border-[#D7E5E3] px-4 py-3" />
              <input aria-label={t("budgetDetails.city")} value={form.serviceCity} onChange={(event) => setForm((current) => ({ ...current, serviceCity: event.target.value }))} placeholder={t("budgetDetails.city")} maxLength={120} disabled={disableBudgetCreation} className="rounded-xl border border-[#D7E5E3] px-4 py-3" />
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
                      <input aria-label={tariff?.unit === "€/km" ? t("budgetsPage.kilometers") : t("budgetsPage.hours")} type="text" inputMode="decimal" value={line.quantity} onChange={(event) => setLines((current) => current.map((item, i) => i === index ? { ...item, quantity: event.target.value } : item))} className="mt-1 w-full rounded-xl border border-[#D7E5E3] bg-amber-100 px-3 py-2" />
                    </label>
                    <label className="text-xs font-medium text-[#4B5563]">{t("budgetsPage.daysPerMonth")}
                      <input aria-label={t("budgetsPage.daysPerMonth")} type="text" inputMode="decimal" value={line.daysPerMonth} onChange={(event) => setLines((current) => current.map((item, i) => i === index ? { ...item, daysPerMonth: event.target.value } : item))} className="mt-1 w-full rounded-xl border border-[#D7E5E3] bg-amber-100 px-3 py-2" />
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
            <button type="button" onClick={() => void create()} disabled={disableBudgetCreation || tariffs.length === 0 || creatingBudget} className="mt-4 rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{t("budgetsPage.createBudget")}</button>
          </section>
        )}

        <section className="mt-6 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
          {downloadError && <p role="alert" className="mb-4 text-sm text-red-700">{t("budgetPdf.error")}</p>}
          {agreementError && <p role="alert" className="mb-4 text-sm text-red-700">{t("budgetAgreement.error")}</p>}
          {agreementSuccess && <p role="status" className="mb-4 text-sm text-emerald-800">{t("budgetAgreement.created")}</p>}
          {deleteError && <p role="alert" className="mb-4 text-sm text-red-700">{t("budgetsPage.deleteError")}</p>}
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
                        {budget.lines.map((line) => <p key={line.id}>{line.serviceName}: {line.quantity} {line.unit === "€/km" ? "km" : line.unit} x {line.daysPerMonth} {t("budgetsPage.daysShort")} — {formatMoney(line.monthlyTotal)}{line.notes ? ` · ${line.notes}` : ""}</p>)}
                      </div>
                    ) : <p className="mt-1 text-sm text-[#4B5563]">{budget.hours}h x {budget.hourlyRate.toFixed(2)} EUR</p>}
                    <p className="text-sm text-[#4B5563]">{t("budgetsPage.base")}: {budget.subtotal.toFixed(2)} EUR | {t("budgetsPage.vatLabel")}: {budget.vatAmount.toFixed(2)} EUR | {t("budgetsPage.total")}: {budget.total.toFixed(2)} EUR</p>
                    <p className="text-sm text-[#4B5563]">{t("budgetsPage.monthlyEstimate")}: {budget.monthlyEstimate.toFixed(2)} EUR</p>
                    <p className="text-xs text-[#6B7280]">{t("budgetsPage.directDebit")}: {budget.directDebitReceiptEnabled ? `${t("common.yes")} (****${budget.directDebitIbanLast4 ?? ""})` : t("common.no")}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ${budget.isApproved ? "bg-green-50 text-green-800" : budget.isRejected ? "bg-red-50 text-red-800" : "bg-yellow-50 text-yellow-800"}`}>
                      <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${budget.isApproved ? "bg-green-600" : budget.isRejected ? "bg-red-600" : "bg-yellow-500"}`} />
                      {budget.isApproved ? t("budgetStatus.accepted") : budget.isRejected ? t("budgetStatus.rejected") : t("budgetStatus.pending")}
                    </span>
                    <button type="button" onClick={() => void downloadPdf(budget.id)} disabled={downloadingIds.has(budget.id)} aria-label={t("budgetPdf.download")} title={t("budgetPdf.download")} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#D8EFEA] bg-white text-[#0F9E98] disabled:cursor-wait disabled:opacity-60">
                      {downloadingIds.has(budget.id) ? <LoaderCircle size={18} className="animate-spin" /> : <Download size={18} />}
                    </button>
                    {isAdmin && budget.isApproved && (
                      <button type="button" onClick={() => void downloadAcceptance(budget.id)} disabled={downloadingAcceptanceIds.has(budget.id) || !budget.agreementId} aria-label={t("budgetPdf.acceptanceDownload")} title={budget.agreementId ? t("budgetPdf.acceptanceDownload") : t("budgetAgreement.assignFirst")} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-green-200 bg-white text-green-700 disabled:cursor-not-allowed disabled:opacity-50">
                        {downloadingAcceptanceIds.has(budget.id) ? <LoaderCircle size={18} className="animate-spin" /> : <FileCheck2 size={18} />}
                      </button>
                    )}
                    {isAdmin && budget.isApproved && !budget.agreementId && (
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={selectedAgreementBudgetIds.has(budget.id)}
                          disabled={creatingAgreement || (selectedAgreementClientId !== undefined && selectedAgreementClientId !== budget.clientId)}
                          onChange={(event) => {
                            const checked = event.target.checked;
                            setSelectedAgreementBudgetIds((current) => {
                              const next = new Set(current);
                              if (checked) next.add(budget.id);
                              else next.delete(budget.id);
                              return next;
                            });
                            setAgreementSuccess(false);
                          }}
                        />
                        {t("budgetAgreement.select")}
                      </label>
                    )}
                    {isAdmin && (
                      <button type="button" onClick={() => void remove(budget.id)} disabled={deletingIds.has(budget.id)} aria-label={t("budgetsPage.delete")} title={t("budgetsPage.delete")} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60">
                        {deletingIds.has(budget.id) ? <LoaderCircle size={18} className="animate-spin" /> : <Trash2 size={18} />}
                      </button>
                    )}
                    {isAdmin && <BudgetStatusEditor key={`${budget.id}-${budget.isApproved}-${budget.isRejected}-${budget.acceptanceDate}`} budget={budget} onSaved={loadBudgets} />}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {isAdmin && selectedAgreementBudgetIds.size > 0 && (
            <div className="mt-5 grid grid-cols-1 gap-3 rounded-xl border border-[#D8EFEA] bg-[#FAFDFC] p-4 md:grid-cols-3">
              <p className="font-semibold md:col-span-3">{t("budgetAgreement.title", { count: selectedAgreementBudgetIds.size })}</p>
              <input value={agreementPaymentMethod} maxLength={200} onChange={(event) => setAgreementPaymentMethod(event.target.value)} placeholder={t("budgetAgreement.paymentMethod")} className="rounded-lg border px-3 py-2" />
              <label className="text-sm">{t("budgetAgreement.firstPaymentDate")}<input type="date" value={agreementFirstPaymentDate} onChange={(event) => setAgreementFirstPaymentDate(event.target.value)} className="mt-1 block w-full rounded-lg border px-3 py-2" /></label>
              <button type="button" onClick={() => void createAgreement()} disabled={creatingAgreement} className="rounded-lg bg-[#0F817C] px-3 py-2 font-semibold text-white disabled:opacity-50">{creatingAgreement ? t("forms.common.saving") : t("budgetAgreement.create")}</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
