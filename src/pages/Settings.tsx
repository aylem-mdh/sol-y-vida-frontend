import { useEffect, useState } from "react";
import { LifeBuoy, LogOut, Phone, ShieldCheck, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { getFamilyProfile, updateFamilyProfile, type FamilyProfile } from "../services/familyPortalService";
import { useTranslation } from "react-i18next";

type DashboardRole = "admin" | "worker" | "family";

export default function Settings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const storedRole = localStorage.getItem("role");
  const role = storedRole === "worker" ? "worker" : storedRole === "family" ? "family" : "admin";
  const [profile, setProfile] = useState<FamilyProfile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (role !== "family") {
      return;
    }

    loadProfile();
  }, [role]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  async function loadProfile() {
    try {
      const familyProfile = await getFamilyProfile();
      setProfile(familyProfile);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveProfile() {
    if (!profile) {
      return;
    }

    try {
      setSaving(true);
      const updated = await updateFamilyProfile({
        email: profile.email,
        phone: profile.phone,
        preferredContact: profile.preferredContact,
        notes: profile.notes,
        notificationsEnabled: profile.notificationsEnabled,
      });
      setProfile(updated);
    } catch (error) {
      console.error(error);
      alert(t("settingsPage.errors.save"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role={role as DashboardRole} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.settings")}
          subtitle={t("settingsPage.topbar.subtitle")}
          name={role === "admin" ? t("profiles.adminName") : role === "worker" ? t("profiles.workerName") : t("profiles.familyName")}
          role={role === "admin" ? t("roles.admin") : role === "worker" ? t("roles.worker") : t("roles.family")}
        />

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7 xl:col-span-2">
            <h2 className="text-2xl font-bold text-[#1F2937]">{t("settingsPage.sections.operational")}</h2>
            {role === "family" && profile ? (
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4"><p className="text-sm font-semibold text-[#1F2937]">{t("settingsPage.family.linkedFamily")}</p><p className="mt-2 text-sm text-[#4B5563]">{profile.fullName}</p></div>
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4"><p className="text-sm font-semibold text-[#1F2937]">{t("settingsPage.family.caredPerson")}</p><p className="mt-2 text-sm text-[#4B5563]">{profile.clientName}</p></div>
                <label className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#374151]">
                  <span className="font-semibold text-[#1F2937]">{t("settingsPage.family.operationalEmail")}</span>
                  <input value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} className="mt-3 w-full rounded-xl border border-[#D7E5E3] bg-white px-4 py-3 outline-none focus:border-[#0F9E98]" />
                </label>
                <label className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#374151]">
                  <span className="font-semibold text-[#1F2937]">{t("settingsPage.family.contactPhone")}</span>
                  <input value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} className="mt-3 w-full rounded-xl border border-[#D7E5E3] bg-white px-4 py-3 outline-none focus:border-[#0F9E98]" />
                </label>
                <label className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#374151]">
                  <span className="font-semibold text-[#1F2937]">{t("settingsPage.family.preferredChannel")}</span>
                  <select value={profile.preferredContact} onChange={(event) => setProfile({ ...profile, preferredContact: event.target.value })} className="mt-3 w-full rounded-xl border border-[#D7E5E3] bg-white px-4 py-3 outline-none focus:border-[#0F9E98]">
                    <option>{t("settingsPage.family.channelPhone")}</option>
                    <option>{t("settingsPage.family.channelEmail")}</option>
                  </select>
                </label>
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4"><p className="text-sm font-semibold text-[#1F2937]">{t("settingsPage.family.activePlan")}</p><p className="mt-2 text-sm text-[#4B5563]">{profile.servicePlan}</p></div>
                <label className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#374151] md:col-span-2">
                  <span className="font-semibold text-[#1F2937]">{t("settingsPage.family.coordinationNotes")}</span>
                  <textarea value={profile.notes} onChange={(event) => setProfile({ ...profile, notes: event.target.value })} rows={4} className="mt-3 w-full rounded-xl border border-[#D7E5E3] bg-white px-4 py-3 outline-none focus:border-[#0F9E98]" />
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm font-semibold text-[#1F2937] md:col-span-2">
                  <input type="checkbox" checked={profile.notificationsEnabled} onChange={(event) => setProfile({ ...profile, notificationsEnabled: event.target.checked })} />
                  {t("settingsPage.family.keepNotifications")}
                </label>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4"><p className="text-sm font-semibold text-[#1F2937]">{t("settingsPage.labels.activeRole")}</p><p className="mt-2 text-sm text-[#4B5563]">{role === "admin" ? t("roles.admin") : role === "worker" ? t("roles.worker") : t("roles.family")}</p></div>
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4"><p className="text-sm font-semibold text-[#1F2937]">{t("settingsPage.labels.supportChannel")}</p><p className="mt-2 text-sm text-[#4B5563]">{t("branding.supportPhone")}</p></div>
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4"><p className="text-sm font-semibold text-[#1F2937]">{t("settingsPage.labels.operationalEmail")}</p><p className="mt-2 text-sm text-[#4B5563]">{t("branding.supportEmail")}</p></div>
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4"><p className="text-sm font-semibold text-[#1F2937]">{t("settingsPage.labels.protectedEnvironment")}</p><p className="mt-2 text-sm text-[#4B5563]">{t("settingsPage.labels.protectedEnvironmentText")}</p></div>
              </div>
            )}
          </article>

          <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <h3 className="text-xl font-bold text-[#1F2937]">{t("settingsPage.sections.quickActions")}</h3>
            <div className="mt-5 space-y-3">
              <button onClick={() => navigate("/contact")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"><span className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><LifeBuoy className="h-4 w-4 text-[#0F9E98]" /> {t("settingsPage.actions.contactSupport")}</span><span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span></button>
              <button onClick={() => navigate(role === "admin" ? "/workers" : "/documentation")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"><span className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><UserCog className="h-4 w-4 text-[#0F9E98]" /> {role === "admin" ? t("settingsPage.actions.reviewTeam") : t("settingsPage.actions.viewDocumentation")}</span><span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span></button>
              <button onClick={() => navigate("/contact")} className="flex w-full items-center justify-between rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] px-4 py-3.5 text-left"><span className="flex items-center gap-2 text-sm font-semibold text-[#1F2937]"><Phone className="h-4 w-4 text-[#0F9E98]" /> {t("settingsPage.actions.phoneSupport")}</span><span className="text-xs font-semibold text-[#0F9E98]">{t("reportsPage.actions.open")}</span></button>
            </div>

            <div className="mt-6 rounded-2xl border border-[#F7D7AA] bg-[#FFF5E8] p-4 text-sm text-[#9A5A13]">
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4" />
                <p>{t("settingsPage.labels.sensitiveConfigInfo")}</p>
              </div>
            </div>

            {role === "family" && profile && (
              <button onClick={saveProfile} disabled={saving} className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-[#D8EFEA] bg-[#F7FCFB] px-5 py-3 font-semibold text-[#1F2937] transition duration-300 hover:bg-[#ECFAF8] disabled:bg-slate-100">
                {saving ? t("forms.common.saving") : t("settingsPage.actions.saveProfile")}
              </button>
            )}

            <button onClick={logout} className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white transition duration-300 hover:bg-[#0B817C]">
              <LogOut className="mr-2 h-4 w-4" /> {t("common.logout")}
            </button>
          </article>
        </section>
      </main>
    </div>
  );
}