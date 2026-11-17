import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ContactActions from "../seo/ContactActions";
import { publishedLocalPages } from "../../seo";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#FFE6BF] border-t border-[#FFD4A3] mt-20">
      <ContactActions />
      <div className="max-w-7xl mx-auto px-8 pt-10">
        <nav aria-label={t("contactActions.areas")}>
          <h2 className="text-lg font-bold text-black">{t("contactActions.areas")}</h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {publishedLocalPages.map((page) => (
              <li key={page.slug}>
                <Link to={`/${page.slug}`} className="font-semibold text-[#0B6F6A] hover:underline">
                  {page.municipality}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-[#F29A38]/15 p-2.5 text-[#F29A38] sm:p-3">
            <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">{t("footer.partnerName")}</h2>
            <p className="mt-2 text-base font-semibold text-black sm:text-lg">
              {t("footer.vitalyTitle")}
            </p>
            <p className="mt-3 text-black">
              {t("footer.vitalyText")}
            </p>
            <a
              href="https://vitaly.es"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center rounded-2xl bg-[#F29A38] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(242,154,56,0.28)] transition duration-300 hover:bg-[#E28727] sm:px-6 sm:py-3 sm:text-base"
            >
              {t("footer.moreInfo")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}