import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();

  function changeLang(lang: string) {
    i18n.changeLanguage(lang);
  }

  return (
    <header className="flex items-center gap-10 w-full">
      {/* LOGO */}

      <div className="z-20 shrink-0">
        <img
          src="/logo.png"
          alt="Sol y Vida"
          className="h-44 w-auto object-contain drop-shadow-xl"
        />
      </div>

      {/* MENÚ */}

      <div className="flex-1 flex justify-start ml-4">

        <nav className="w-fit flex items-center gap-5 bg-[#A9E1FF] border border-[#7CCEFF] px-6 py-4 rounded-2xl shadow-xl">

          <div className="flex items-center gap-5">

            <Link
              to="/"
              className="text-black font-semibold hover:text-[#F2A74B] transition"
            >
              {t("common.home")}
            </Link>

            <Link
              to="/services"
              className="text-black font-semibold hover:text-[#F2A74B] transition"
            >
              {t("common.services")}
            </Link>

            <Link
              to="/about"
              className="text-black font-semibold hover:text-[#F2A74B] transition"
            >
              {t("common.about")}
            </Link>

            <Link
              to="/contact"
              className="text-black font-semibold hover:text-[#F2A74B] transition"
            >
              {t("common.contact")}
            </Link>

          </div>

          <div className="w-px h-6 bg-[#6EBEE7]" />

          <select
            value={i18n.language}
            onChange={(e) => changeLang(e.target.value)}
            className="bg-white text-black border border-[#7CCEFF] rounded-xl px-3 py-2 outline-none"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>

          <Link
            to="/login"
            className="bg-[#FFD8A6] hover:bg-[#FFC57D] text-black px-5 py-2 rounded-xl font-bold transition"
          >
            {t("common.login")}
          </Link>

        </nav>

      </div>
    </header>
  );
}