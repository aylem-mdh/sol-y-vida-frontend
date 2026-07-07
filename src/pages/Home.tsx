import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="relative min-h-screen overflow-hidden bg-[#071B3B]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#072B61] via-[#0B4EA2] to-[#06152E]" />

        <div
          className="absolute top-0 right-0 h-screen w-[55%] bg-no-repeat"
          style={{
            backgroundImage: "url('/hero.png')",
            backgroundSize: "contain",
            backgroundPosition: "right top",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071B3B] via-[#071B3B]/85 to-transparent" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-8">
          <Header />

          <p className="mt-8 text-orange-400 tracking-[0.15em] font-semibold text-sm md:text-base">
            TORREMOLINOS · BENALMÁDENA · FUENGIROLA · MIJAS · ALHAURÍN
          </p>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-20 pb-20">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 rounded-full bg-[#16C6C6]/10 backdrop-blur-md border border-[#16C6C6]/30 text-[#16C6C6] text-sm font-semibold">
              {t("home.badge")}
            </div>

            <h1 className="mt-8 text-5xl md:text-7xl font-bold text-white leading-tight">
              {t("home.title1")}
              <span className="text-orange-400">{t("home.title2")}</span>
            </h1>

            <p className="mt-6 text-xl text-blue-100 leading-relaxed max-w-2xl">
              {t("home.text")}
            </p>

            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl transition"
              >
                {t("home.btn1")}
              </Link>

              <Link
                to="/services"
                className="bg-[#16C6C6]/10 backdrop-blur-md border border-[#16C6C6]/30 text-[#16C6C6] px-8 py-4 rounded-2xl font-semibold hover:bg-[#16C6C6]/20 transition"
              >
                {t("home.btn2")}
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {[
                ["25+", "Familias"],
                ["128+", "Servicios"],
                ["4.8", "Rating"],
                ["24h", "Soporte"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
                >
                  <p className="text-3xl font-bold text-[#16C6C6]">{value}</p>
                  <p className="text-blue-100 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}