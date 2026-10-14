import type { TFunction } from "i18next";

export type FamilyVisitStatusKey = "scheduled" | "inProgress" | "completed" | "cancelled" | "unknown";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .toLowerCase();
}

export function getLocale(language: string) {
  return language === "es" ? "es-ES" : language === "fr" ? "fr-FR" : language === "de" ? "de-DE" : "en-US";
}

export function getVisitStatusKey(status: string): FamilyVisitStatusKey {
  const normalized = normalize(status);

  if (["programada", "scheduled", "planifiee", "geplant"].includes(normalized)) {
    return "scheduled";
  }

  if (["encurso", "en curso", "in progress", "en cours", "laufend"].includes(normalized)) {
    return "inProgress";
  }

  if (["completada", "completed", "terminee", "abgeschlossen"].includes(normalized)) {
    return "completed";
  }

  if (["cancelada", "cancelled", "annulee", "storniert"].includes(normalized)) {
    return "cancelled";
  }

  return "unknown";
}

export function getVisitStatusLabel(status: string, t: TFunction) {
  return t(`familyPortal.visitStatus.${getVisitStatusKey(status)}`);
}

export function formatDate(value: string, language: string) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(getLocale(language), {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value: string, language: string) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(getLocale(language), {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function getReportTitle(title: string, reportId: number, t: TFunction) {
  const normalized = normalize(title);
  const generatedByPortal = /^informe\s+visita\s*#\s*\d+$/i.test(normalized);

  if (generatedByPortal) {
    return t("familyPortal.generated.visitReportTitle", { id: reportId });
  }

  return title;
}

export function getReportDetailText(detail: string, t: TFunction) {
  const normalized = normalize(detail);

  if (normalized === "checklist de cuidados completado.") {
    return t("familyPortal.generated.checklistCompleted");
  }

  if (normalized === "checklist de cuidados pendiente de validacion.") {
    return t("familyPortal.generated.checklistPending");
  }

  if (normalized === "sin detalles adicionales.") {
    return t("familyPortal.generated.noExtraDetails");
  }

  return detail;
}
