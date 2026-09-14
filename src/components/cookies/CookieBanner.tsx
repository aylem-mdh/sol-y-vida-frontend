import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

// ── Almacenamiento ────────────────────────────────────────────────────────────

const STORAGE_KEY = "syv_cookie_consent";

interface ConsentRecord {
  decided: boolean;
  necessary: boolean; // siempre true; reservado para futuras categorías
  timestamp: string;
}

function getStoredConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentRecord;
  } catch {
    return null;
  }
}

function saveConsent(): void {
  const record: ConsentRecord = {
    decided: true,
    necessary: true,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

// ── Evento global para abrir el panel desde el Footer ─────────────────────────
// Footer llama: window.dispatchEvent(new CustomEvent("openCookieSettings"))

export const OPEN_COOKIE_SETTINGS_EVENT = "openCookieSettings";

// ── Componente ────────────────────────────────────────────────────────────────

export default function CookieBanner() {
  // bannerVisible: true cuando el usuario no ha tomado ninguna decisión aún
  const [bannerVisible, setBannerVisible] = useState(false);
  // panelOpen: true cuando se muestra el modal de configuración
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent || !consent.decided) {
      setBannerVisible(true);
    }

    // Escucha el evento lanzado desde el Footer ("Configurar cookies")
    function handleOpenSettings() {
      setPanelOpen(true);
    }

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    };
  }, []);

  // ── Acciones ────────────────────────────────────────────────────────────────

  function acceptAll() {
    saveConsent();
    setBannerVisible(false);
    setPanelOpen(false);
  }

  function reject() {
    saveConsent(); // sólo cookies técnicas, que son las únicas existentes
    setBannerVisible(false);
    setPanelOpen(false);
  }

  function savePreferences() {
    saveConsent();
    setBannerVisible(false);
    setPanelOpen(false);
  }

  // No renderizar nada si no hay banner ni panel
  if (!bannerVisible && !panelOpen) return null;

  return (
    <>
      {/* ── Modal de configuración ─────────────────────────────────────────── */}
      {panelOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-panel-title"
        >
          {/* Fondo */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setPanelOpen(false)}
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-lg rounded-[28px] bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.18)] sm:p-8">
            <div className="flex items-center justify-between">
              <h2
                id="cookie-panel-title"
                className="text-xl font-bold text-[#1F2937]"
              >
                Configuración de cookies
              </h2>
              <button
                onClick={() => setPanelOpen(false)}
                aria-label="Cerrar panel de configuración de cookies"
                className="rounded-full p-2 text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#1F2937] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F9E98]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-[#4B5563]">
              Puedes gestionar tus preferencias de cookies a continuación. Las
              cookies técnicas son necesarias para el funcionamiento del sitio y
              no pueden desactivarse.{" "}
              <Link
                to="/cookies"
                className="font-medium text-[#0F9E98] hover:underline"
                onClick={() => setPanelOpen(false)}
              >
                Política de Cookies
              </Link>
            </p>

            {/* Categoría: cookies técnicas (siempre activas) */}
            <div className="mt-6 rounded-2xl border border-[#E3F1EF] bg-[#FCFEFE] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#1F2937]">
                    Cookies técnicas
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                    Necesarias para el correcto funcionamiento del sitio web
                    (sesión, seguridad, preferencias básicas). No pueden
                    desactivarse.
                  </p>
                </div>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-[#DDF7F5] px-3 py-1 text-xs font-semibold text-[#0F9E98]">
                  Siempre activas
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={savePreferences}
                className="rounded-2xl bg-[#0F9E98] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0A7F7A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F9E98]"
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Banner inferior ────────────────────────────────────────────────── */}
      {bannerVisible && !panelOpen && (
        <div
          role="region"
          aria-label="Aviso de uso de cookies"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#D8EFEA] bg-white/96 shadow-[0_-8px_32px_rgba(15,158,152,0.12)] backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8 lg:px-10">
            {/* Icono + texto */}
            <div className="flex flex-1 items-start gap-3">
              <Cookie
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0F9E98]"
                aria-hidden="true"
              />
              <p className="text-sm leading-6 text-[#4B5563]">
                Utilizamos cookies propias y de terceros para mejorar tu
                experiencia de navegación.{" "}
                <Link
                  to="/cookies"
                  className="font-medium text-[#0F9E98] hover:underline"
                >
                  Política de Cookies
                </Link>
              </p>
            </div>

            {/* Botones */}
            <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:flex-shrink-0">
              <button
                onClick={() => setPanelOpen(true)}
                className="rounded-2xl border border-[#D1D5DB] bg-white px-4 py-2 text-sm font-semibold text-[#4B5563] transition hover:border-[#0F9E98] hover:text-[#0F9E98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F9E98]"
              >
                Configurar
              </button>
              <button
                onClick={reject}
                className="rounded-2xl border border-[#D1D5DB] bg-white px-4 py-2 text-sm font-semibold text-[#4B5563] transition hover:border-[#6B7280] hover:text-[#1F2937] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B7280]"
              >
                Rechazar
              </button>
              <button
                onClick={acceptAll}
                className="rounded-2xl bg-[#0F9E98] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0A7F7A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F9E98]"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
