import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  function changeLang(lang: string) {
    i18n.changeLanguage(lang);
  }

  return (
    <header className="relative z-50 w-full">
      <div className="relative flex items-center w-full justify-between">
        {/* LOGO */}
        <div className="z-20 shrink-0">
          <img
            src="/logo.png"
            alt="Sol y Vida"
            className="h-20 sm:h-44 w-auto object-contain drop-shadow-xl"
          />
        </div>

        {/* BOTÓN HAMBURGUESA (MÓVIL) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto md:hidden bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg border border-[#DDF7F5]"
        >
          {menuOpen ? (
            <X size={24} className="text-[#0F9E98]" />
          ) : (
            <Menu size={24} className="text-[#0F9E98]" />
          )}
        </button>

        {/* MENÚ ESCRITORIO */}
        <nav className="hidden md:flex items-center gap-5 bg-white/95 backdrop-blur-xl border border-[#CFEFEA] px-8 py-4 rounded-full shadow-2xl absolute left-1/2 -translate-x-1/2">
          <Link
            to="/"
            className="text-black font-semibold hover:text-[#F2A74B] transition text-sm lg:text-base"
          >
            {t("common.home")}
          </Link>

          <Link
            to="/services"
            className="text-black font-semibold hover:text-[#F2A74B] transition text-sm lg:text-base"
          >
            {t("common.services")}
          </Link>

          <Link
            to="/about"
            className="text-black font-semibold hover:text-[#F2A74B] transition text-sm lg:text-base"
          >
            {t("common.about")}
          </Link>

          <Link
            to="/contact"
            className="text-black font-semibold hover:text-[#F2A74B] transition text-sm lg:text-base"
          >
            {t("common.contact")}
          </Link>

          <div className="w-px h-6 bg-[#6EBEE7]" />

          <select
            value={i18n.language}
            onChange={(e) => changeLang(e.target.value)}
            className="bg-white text-black border border-[#7CCEFF] rounded-xl px-3 py-2 outline-none text-sm lg:text-base"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
          </select>

          <Link
            to="/login"
            className="bg-[#FFD8A6] hover:bg-[#FFC57D] text-black px-4 lg:px-5 py-2 rounded-lg lg:rounded-xl font-bold transition text-sm lg:text-base"
          >
            {t("common.login")}
          </Link>
        </nav>
      </div>

      {/* MENÚ MÓVIL */}
      {menuOpen && (
        <div className="md:hidden absolute top-full right-4 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#DDF7F5] p-4 z-40">
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-black hover:text-[#0F9E98] transition text-sm"
            >
              {t("common.home")}
            </Link>

            <Link
              to="/services"
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-black hover:text-[#0F9E98] transition text-sm"
            >
              {t("common.services")}
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-black hover:text-[#0F9E98] transition text-sm"
            >
              {t("common.about")}
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-black hover:text-[#0F9E98] transition text-sm"
            >
              {t("common.contact")}
            </Link>

            <select
              value={i18n.language}
              onChange={(e) => changeLang(e.target.value)}
              className="border border-[#7CCEFF] rounded-lg px-3 py-2 text-sm"
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
            </select>

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-[#FFD8A6] hover:bg-[#FFC57D] text-center text-black py-2 rounded-lg font-bold transition text-sm"
            >
              {t("common.login")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}