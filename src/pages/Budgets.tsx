import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { createBudget, getBudgets, approveBudget, type Budget } from "../services/budgetService";
import { getClients } from "../services/clientService";
import { useTranslation } from "react-i18next";

type Role = "admin" | "family";

type ClientOption = { id: number; nombre: string; apellidos: string };

export default function Budgets() {
  const { t } = useTranslation();
  const role = (localStorage.getItem("role") === "family" ? "family" : "admin") as Role;
  const isAdmin = role === "admin";
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [search, setSearch] = useState("");
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
    }
  }, [isAdmin]);

  async function loadBudgets() {
    const data = await getBudgets();
    setBudgets(data);
  }

  async function loadClients() {
    const data = await getClients();
    setClients(data);
    if (data.length > 0) {
      setForm((current) => ({ ...current, clientId: current.clientId || data[0].id }));
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return budgets.filter((budget) => `${budget.cliente} ${budget.description ?? ""}`.toLowerCase().includes(q));
  }, [budgets, search]);

  async function create() {
    if (!form.clientId || form.hours <= 0 || form.hourlyRate <= 0) {
      alert(t("budgetsPage.errors.required"));
      return;
    }

    await createBudget(form);
    await loadBudgets();
  }

  async function approve(id: number) {
    await approveBudget(id);
    await loadBudgets();
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.budgets")}
          subtitle={t("budgetsPage.subtitle")}
          name={isAdmin ? t("profiles.adminName") : t("profiles.familyName")}
          role={isAdmin ? t("roles.admin") : t("roles.family")}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("budgetsPage.searchPlaceholder")}
        />

        {isAdmin && (
          <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <h2 className="text-xl font-bold text-[#1F2937]">{t("budgetsPage.newBudget")}</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              <select value={form.clientId} onChange={(e) => setForm((c) => ({ ...c, clientId: Number(e.target.value) }))} className="rounded-xl border border-[#D7E5E3] px-4 py-3">
                {clients.map((client) => <option key={client.id} value={client.id}>{client.nombre} {client.apellidos}</option>)}
              </select>
              <input type="number" value={form.hours} onChange={(e) => setForm((c) => ({ ...c, hours: Number(e.target.value) }))} placeholder={t("budgetsPage.hours")} className="rounded-xl border border-[#D7E5E3] px-4 py-3" />
              <input type="number" value={form.hourlyRate} onChange={(e) => setForm((c) => ({ ...c, hourlyRate: Number(e.target.value) }))} placeholder={t("budgetsPage.hourlyRate")} className="rounded-xl border border-[#D7E5E3] px-4 py-3" />
              <input type="number" value={form.vatPercent} onChange={(e) => setForm((c) => ({ ...c, vatPercent: Number(e.target.value) }))} placeholder={t("budgetsPage.vat")} className="rounded-xl border border-[#D7E5E3] px-4 py-3" />
              <input value={form.directDebitIbanLast4} onChange={(e) => setForm((c) => ({ ...c, directDebitIbanLast4: e.target.value }))} placeholder={t("budgetsPage.ibanLast4")} className="rounded-xl border border-[#D7E5E3] px-4 py-3" />
              <input value={form.description} onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} placeholder={t("forms.common.description")} className="rounded-xl border border-[#D7E5E3] px-4 py-3" />
            </div>
            <button onClick={create} className="mt-4 rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white">{t("budgetsPage.createBudget")}</button>
          </section>
        )}

        <section className="mt-6 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-[#1F2937]">{t("budgetsPage.history")}</h2>
          </div>

          <div className="mt-4 space-y-3">
            {filtered.map((budget) => (
              <article key={budget.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-[#1F2937]">{budget.cliente}</p>
                    <p className="mt-1 text-sm text-[#4B5563]">{budget.hours}h x {budget.hourlyRate.toFixed(2)} EUR</p>
                    <p className="text-sm text-[#4B5563]">{t("budgetsPage.base")}: {budget.subtotal.toFixed(2)} EUR | {t("budgetsPage.vatLabel")}: {budget.vatAmount.toFixed(2)} EUR | {t("budgetsPage.total")}: {budget.total.toFixed(2)} EUR</p>
                    <p className="text-sm text-[#4B5563]">{t("budgetsPage.monthlyEstimate")}: {budget.monthlyEstimate.toFixed(2)} EUR</p>
                    <p className="text-xs text-[#6B7280]">{t("budgetsPage.directDebit")}: {budget.directDebitReceiptEnabled ? `${t("common.yes")} (****${budget.directDebitIbanLast4 ?? ""})` : t("common.no")}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${budget.isApproved ? "bg-[#ECFAF8] text-[#0F9E98]" : "bg-[#FFF5E8] text-[#9A5A13]"}`}>
                      {budget.isApproved ? t("budgetsPage.approved") : t("budgetsPage.pending")}
                    </span>
                    {isAdmin && !budget.isApproved && (
                      <button onClick={() => approve(budget.id)} className="text-xs font-semibold text-[#0F9E98]">{t("budgetsPage.approve")}</button>
                    )}
                  </div>
                </div>
              </article>
            ))}
            {filtered.length === 0 && <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">{t("budgetsPage.noResults")}</div>}
          </div>
        </section>
      </main>
    </div>
  );
}
