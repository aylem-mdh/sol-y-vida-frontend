import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();

  function changeLang(lang: string) {
    i18n.changeLanguage(lang);
  }

  return (
    <header className="flex items-center gap-10 w-full">
      <div className="z-20 shrink-0">
        <img
          src="/logo.png"
          alt="Sol y Vida"
          className="h-32 w-auto object-contain drop-shadow-xl"
        />
      </div>

      <div className="flex-1 flex justify-start ml-4">
        <nav className="w-fit flex items-center gap-5 bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-4 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white hover:text-orange-300 transition">
              {t("common.home")}
            </Link>

            <Link
              to="/services"
              className="text-white hover:text-orange-300 transition"
            >
              {t("common.services")}
            </Link>

            <Link
              to="/about"
              className="text-white hover:text-orange-300 transition"
            >
              {t("common.about")}
            </Link>

            <Link
              to="/contact"
              className="text-white hover:text-orange-300 transition"
            >
              {t("common.contact")}
            </Link>
          </div>

          <div className="w-px h-6 bg-white/20" />

          <select
            value={i18n.language}
            onChange={(e) => changeLang(e.target.value)}
            className="bg-white/10 text-[#16C6C6] border border-white/20 rounded-xl px-3 py-2 outline-none"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>

          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-semibold transition"
          >
            {t("common.login")}
          </Link>
        </nav>
      </div>
    </header>
  );
}