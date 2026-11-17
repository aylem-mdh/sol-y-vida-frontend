const CONSENT_KEY = "syv_cookie_consent";
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export const analyticsConfigured = Boolean(MEASUREMENT_ID);

let loaded = false;

export function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? Boolean(JSON.parse(raw).analytics) : false;
  } catch {
    return false;
  }
}

// Solo se carga Google Analytics si hay ID configurado y la persona ha aceptado las cookies de analÃ­tica.
export function initAnalytics(): void {
  if (loaded || !MEASUREMENT_ID || !hasAnalyticsConsent()) return;
  loaded = true;
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  };
  w.gtag("js", new Date());
  w.gtag("config", MEASUREMENT_ID, { anonymize_ip: true });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

export function trackEvent(name: string, params: Record<string, string> = {}): void {
  const w = window as GtagWindow;
  if (loaded && w.gtag) {
    w.gtag("event", name, params);
  }
}
