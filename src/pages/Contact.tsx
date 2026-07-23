import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { getFamilyProfile, submitFamilyContactRequest } from "../services/familyPortalService";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const role = localStorage.getItem("role");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (role !== "family") {
      return;
    }

    hydrateFamilyContact();
  }, [role]);

  async function hydrateFamilyContact() {
    try {
      const profile = await getFamilyProfile();
      setForm((current) => ({
        ...current,
        fullName: current.fullName || profile.fullName,
        email: current.email || profile.email,
        phone: current.phone || profile.phone,
        subject: current.subject || t("contactPage.followUpSubject", { clientName: profile.clientName }),
      }));
    } catch (error) {
      console.error(error);
    }
  }

  function updateField(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      alert(t("contactPage.alerts.required"));
      return;
    }

    try {
      setSending(true);
      await submitFamilyContactRequest(form);
      alert(t("contactPage.alerts.success"));
      setForm((current) => ({
        ...current,
        subject: role === "family" ? current.subject : "",
        message: "",
      }));
    } catch (error) {
      console.error(error);
      alert(t("contactPage.alerts.error"));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ECFAF8_0%,#F7FCFB_45%,#FFFFFF_100%)]">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Header />
      </div>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-14 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <section className="rounded-[32px] border border-[#D6F1EE] bg-white/95 p-7 shadow-[0_20px_55px_rgba(15,158,152,0.08)] backdrop-blur-sm sm:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F29A38] sm:text-sm">
              {t("branding.company")}
            </p>
            <h1 className="mt-4 text-3xl font-bold text-[#1F2937] sm:text-4xl lg:text-[2.7rem] lg:leading-[1.1]">
              {t("contactPage.title")}
            </h1>
            <p className="mt-5 text-lg font-semibold text-[#1F2937]">{t("contactPage.subtitle")}</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
              {t("contactPage.description")}
            </p>

            <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
              <article className="group rounded-2xl border border-[#E7F6F4] bg-white p-5 shadow-[0_10px_26px_rgba(15,158,152,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#C5EAE5] hover:shadow-[0_18px_36px_rgba(15,158,152,0.14)] sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#DDF7F5] p-3 text-[#0F9E98] transition duration-300 group-hover:bg-[#0F9E98] group-hover:text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{t("contactPage.phoneLabel")}</p>
                    <a href={`tel:${t("branding.supportPhoneRaw")}`} className="mt-1 block text-base font-semibold text-[#1F2937] sm:text-lg">
                      {t("branding.supportPhone")}
                    </a>
                  </div>
                </div>
              </article>

              <article className="group rounded-2xl border border-[#E7F6F4] bg-white p-5 shadow-[0_10px_26px_rgba(15,158,152,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#C5EAE5] hover:shadow-[0_18px_36px_rgba(15,158,152,0.14)] sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#DDF7F5] p-3 text-[#0F9E98] transition duration-300 group-hover:bg-[#0F9E98] group-hover:text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{t("contactPage.emailLabel")}</p>
                    <a href={`mailto:${t("branding.supportEmail")}`} className="mt-1 block text-base font-semibold text-[#1F2937] sm:text-lg">
                      {t("branding.supportEmail")}
                    </a>
                  </div>
                </div>
              </article>

              <article className="group rounded-2xl border border-[#E7F6F4] bg-white p-5 shadow-[0_10px_26px_rgba(15,158,152,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#C5EAE5] hover:shadow-[0_18px_36px_rgba(15,158,152,0.14)] sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#DDF7F5] p-3 text-[#0F9E98] transition duration-300 group-hover:bg-[#0F9E98] group-hover:text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{t("contactPage.addressLabel")}</p>
                    <p className="mt-1 text-base font-semibold text-[#1F2937] sm:text-lg">{t("contactPage.addressStreet")}</p>
                    <p className="text-sm text-[#4B5563] sm:text-base">{t("contactPage.addressCity")}</p>
                  </div>
                </div>
              </article>

              <article className="group rounded-2xl border border-[#E7F6F4] bg-white p-5 shadow-[0_10px_26px_rgba(15,158,152,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#C5EAE5] hover:shadow-[0_18px_36px_rgba(15,158,152,0.14)] sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#DDF7F5] p-3 text-[#0F9E98] transition duration-300 group-hover:bg-[#0F9E98] group-hover:text-white">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{t("contactPage.websiteLabel")}</p>
                    <a
                      href={`https://${t("branding.website")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block text-base font-semibold text-[#1F2937] sm:text-lg"
                    >
                      {t("branding.website")}
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="rounded-[32px] border border-[#F8E4C8] bg-white p-7 shadow-[0_22px_58px_rgba(242,154,56,0.12)] sm:p-10 lg:p-12">
            <h2 className="text-3xl font-bold text-[#1F2937] sm:text-4xl">{t("contactPage.form.title")}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#4B5563] sm:text-base sm:leading-8">
              {t("contactPage.form.description")}
            </p>

            <form className="mt-8 space-y-4 sm:mt-10 sm:space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#374151]">{t("contactPage.form.fullName")}</span>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  placeholder={t("contactPage.form.fullNamePlaceholder")}
                  className="w-full rounded-xl border border-[#D7E5E3] bg-white px-4 py-3.5 text-[#1F2937] outline-none transition duration-300 placeholder:text-[#9CA3AF] focus:border-[#0F9E98] focus:ring-2 focus:ring-[#0F9E98]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#374151]">{t("contactPage.form.email")}</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder={t("contactPage.form.emailPlaceholder")}
                  className="w-full rounded-xl border border-[#D7E5E3] bg-white px-4 py-3.5 text-[#1F2937] outline-none transition duration-300 placeholder:text-[#9CA3AF] focus:border-[#0F9E98] focus:ring-2 focus:ring-[#0F9E98]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#374151]">{t("contactPage.form.phone")}</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder={t("contactPage.form.phonePlaceholder")}
                  className="w-full rounded-xl border border-[#D7E5E3] bg-white px-4 py-3.5 text-[#1F2937] outline-none transition duration-300 placeholder:text-[#9CA3AF] focus:border-[#0F9E98] focus:ring-2 focus:ring-[#0F9E98]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#374151]">{t("contactPage.form.subject")}</span>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(event) => updateField("subject", event.target.value)}
                  placeholder={t("contactPage.form.subjectPlaceholder")}
                  className="w-full rounded-xl border border-[#D7E5E3] bg-white px-4 py-3.5 text-[#1F2937] outline-none transition duration-300 placeholder:text-[#9CA3AF] focus:border-[#0F9E98] focus:ring-2 focus:ring-[#0F9E98]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#374151]">{t("contactPage.form.message")}</span>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder={t("contactPage.form.messagePlaceholder")}
                  className="w-full rounded-xl border border-[#D7E5E3] bg-white px-4 py-3.5 text-[#1F2937] outline-none transition duration-300 placeholder:text-[#9CA3AF] focus:border-[#0F9E98] focus:ring-2 focus:ring-[#0F9E98]/20"
                />
              </label>

              <button
                type="submit"
                disabled={sending}
                className="mt-2 w-full rounded-2xl bg-[#0F9E98] px-6 py-4 text-base font-semibold text-white shadow-[0_16px_32px_rgba(15,158,152,0.28)] transition duration-300 hover:bg-[#0B817C] hover:shadow-[0_22px_40px_rgba(15,158,152,0.32)] sm:text-lg"
              >
                {sending ? t("contactPage.form.sending") : t("contactPage.form.submit")}
              </button>
            </form>
          </section>
        </div>

        <div className="pointer-events-none mx-auto mt-12 h-20 w-full max-w-3xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(15,158,152,0.14)_0%,rgba(15,158,152,0)_70%)] sm:mt-16" />
      </main>

      <Footer />
    </div>
  );
}