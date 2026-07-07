import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-soft">
      <div className="pt-8 px-6 max-w-7xl mx-auto">
        <Header />
      </div>

      {/* HERO */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800">
          {t("contactTitle")}
        </h1>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          {t("contactSubtitle")}
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* INFO */}
          <section className="bg-white rounded-3xl shadow-md p-10">
            <h2 className="text-3xl font-bold text-gray-800">
              {t("contactInfo")}
            </h2>

            <div className="mt-8 space-y-6 text-lg text-gray-600">
              <div>
                <p className="font-semibold text-gray-800">
                  📞 {t("phone")}
                </p>
                <a
                  href="tel:+34626406477"
                  className="text-primary hover:underline"
                >
                  +34 626 40 64 77
                </a>
              </div>

              <div>
                <p className="font-semibold text-gray-800">✉️ Email</p>
                <p>solyvidacare@gmail.com</p>
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  📍 {t("coverage")}
                </p>
                <p>
                  Torremolinos · Benalmádena · Fuengirola · Mijas · Alhaurín de
                  la Torre
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  🕒 {t("schedule")}
                </p>
                <p>{t("scheduleValue")}</p>
              </div>
            </div>

            <button className="mt-10 w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition">
              WhatsApp
            </button>
          </section>

          {/* FORM */}
          <section className="bg-white rounded-3xl shadow-md p-10">
            <h2 className="text-3xl font-bold text-gray-800">
              {t("sendMessage")}
            </h2>

            <form className="mt-8 space-y-5">
              <input
                type="text"
                placeholder={t("name")}
                className="w-full border border-gray-200 rounded-xl px-4 py-4"
              />

              <input
                type="tel"
                placeholder={t("phone")}
                className="w-full border border-gray-200 rounded-xl px-4 py-4"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-200 rounded-xl px-4 py-4"
              />

              <textarea
                placeholder={t("messagePlaceholder")}
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-4"
              />

              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition">
                {t("sendButton")}
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}