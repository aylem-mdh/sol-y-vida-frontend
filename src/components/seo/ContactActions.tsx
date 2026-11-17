import { MessageCircle, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { trackEvent } from "../../lib/analytics";

const PHONE = "+34626406477";
const WHATSAPP = "https://wa.me/34626406477";

export default function ContactActions() {
  const { t } = useTranslation();
  const message = encodeURIComponent(t("contactActions.whatsappMessage"));

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:right-6">
      <a
        href={`tel:${PHONE}`}
        onClick={() => trackEvent("phone_click", { location: "floating_button" })}
        aria-label={t("contactActions.call")}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F29A38] text-white shadow-[0_12px_28px_rgba(242,154,56,0.45)] transition hover:bg-[#E28727] md:hidden"
      >
        <Phone className="h-6 w-6" aria-hidden="true" />
      </a>
      <a
        href={`${WHATSAPP}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { location: "floating_button" })}
        aria-label={t("contactActions.whatsapp")}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.4)] transition hover:bg-[#1EBE5A]"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </a>
    </div>
  );
}
