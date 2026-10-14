import axios from "axios";
import type { TFunction } from "i18next";

import type { FinishVisitPayload, Visit } from "./visitService";

export type VisitCheckInState = "pending" | "inProgress" | "completed" | "cancelled";

export type CoordinatesPayload = {
  latitude: number;
  longitude: number;
};

export function getVisitCheckInState(visit: Visit): VisitCheckInState {
  if (visit.estado?.toLowerCase().includes("cancel")) {
    return "cancelled";
  }

  if (visit.endedAt) {
    return "completed";
  }

  if (visit.startedAt) {
    return "inProgress";
  }

  return "pending";
}

export function getVisitCheckInStateLabel(visit: Visit, t: TFunction) {
  const state = getVisitCheckInState(visit);

  if (state === "cancelled") {
    return t("pages.visits.statusCancelled");
  }

  if (state === "completed") {
    return t("pages.visits.checkOutCompleted");
  }

  if (state === "inProgress") {
    return t("pages.visits.checkInDone");
  }

  return t("pages.visits.checkInPending");
}

export function getVisitLocale(language: string) {
  return language === "es" ? "es-ES" : language === "fr" ? "fr-FR" : language === "de" ? "de-DE" : "en-US";
}

export function formatVisitDateTime(value: string, language: string) {
  return new Intl.DateTimeFormat(getVisitLocale(language), {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatCoordinates(latitude?: number, longitude?: number) {
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    return null;
  }

  return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
}

export async function getCurrentCoordinates() {
  return new Promise<CoordinatesPayload>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("gps_not_supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
}

export function getGeolocationErrorMessage(error: unknown, t: TFunction) {
  if (error instanceof GeolocationPositionError) {
    if (error.code === error.PERMISSION_DENIED) {
      return t("pages.visits.errors.gpsPermissionDenied");
    }

    if (error.code === error.TIMEOUT) {
      return t("pages.visits.errors.gpsTimeout");
    }

    if (error.code === error.POSITION_UNAVAILABLE) {
      return t("pages.visits.errors.gpsUnavailable");
    }
  }

  if (error instanceof Error && error.message === "gps_not_supported") {
    return t("pages.visits.errors.gpsNotSupported");
  }

  return t("pages.visits.errors.gpsGeneric");
}

export function getVisitMutationErrorMessage(error: unknown, phase: "start" | "finish", t: TFunction) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const code = typeof error.response?.data?.code === "string" ? error.response.data.code : undefined;

    if (status === 401) {
      return t("pages.visits.errors.unauthenticated");
    }

    if (status === 403) {
      return t("pages.visits.errors.forbidden");
    }

    if (status === 404) {
      return t("pages.visits.errors.notFound");
    }

    if (status === 400 && code) {
      if (code === "invalid_coordinates") {
        return t("pages.visits.errors.invalidCoordinates");
      }

      if (code === "visit_already_started") {
        return t("pages.visits.errors.visitAlreadyStarted");
      }

      if (code === "visit_already_finished") {
        return t("pages.visits.errors.visitAlreadyFinished");
      }

      if (code === "visit_not_started") {
        return t("pages.visits.errors.visitNotStarted");
      }

      if (code === "visit_already_completed") {
        return t("pages.visits.errors.visitAlreadyCompleted");
      }

      if (code === "visit_cancelled") {
        return t("pages.visits.errors.visitCancelled");
      }

      if (code === "client_location_not_configured") {
        return t("pages.visits.errors.clientLocationNotConfigured");
      }

      if (code === "visit_outside_allowed_radius") {
        const distanceMeters = Number(error.response?.data?.distanceMeters);
        const allowedRadiusMeters = Number(error.response?.data?.allowedRadiusMeters);

        return t("pages.visits.errors.visitOutsideAllowedRadius", {
          distance: Number.isFinite(distanceMeters) ? Math.round(distanceMeters) : 0,
          allowed: Number.isFinite(allowedRadiusMeters) ? Math.round(allowedRadiusMeters) : 0,
        });
      }

      if (code === "visit_finish_requirements") {
        return t("pages.visits.errors.finishRequirements");
      }
    }

    if (!error.response) {
      return t("pages.visits.errors.network");
    }
  }

  return phase === "start" ? t("pages.visits.startError") : t("pages.visits.finishError");
}

export function createEmptyFinishForm(): Omit<FinishVisitPayload, "latitude" | "longitude" | "visibleToFamily"> {
  return {
    assistanceReport: "",
    careNotes: "",
  };
}