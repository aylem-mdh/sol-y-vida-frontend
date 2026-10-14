import { useState } from "react";
import { CheckCircle2, Clock3, MapPin, PlayCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { FinishVisitPayload, Visit } from "../../services/visitService";
import {
  createEmptyFinishForm,
  formatCoordinates,
  formatVisitDateTime,
  getVisitCheckInState,
} from "../../services/visitCheckInService";

type Props = {
  visit: Visit;
  onStart: (id: number) => Promise<void>;
  onFinish: (id: number, payload: Omit<FinishVisitPayload, "latitude" | "longitude">) => Promise<void>;
  language: string;
  busy?: boolean;
  address?: string;
  showWorkerName?: boolean;
};

export default function WorkerVisitActionCard({
  visit,
  onStart,
  onFinish,
  language,
  busy = false,
  address,
  showWorkerName = false,
}: Props) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [finishForm, setFinishForm] = useState(createEmptyFinishForm());
  const state = getVisitCheckInState(visit);
  const startCoordinates = formatCoordinates(visit.startLatitude, visit.startLongitude);
  const endCoordinates = formatCoordinates(visit.endLatitude, visit.endLongitude);

  async function handleFinish() {
    await onFinish(visit.id, {
      ...finishForm,
      visibleToFamily: true,
    });

    setExpanded(false);
    setFinishForm(createEmptyFinishForm());
  }

  return (
    <article className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-[#1F2937]">{visit.cliente}</p>
          <p className="mt-1 text-sm text-[#4B5563]">{formatVisitDateTime(visit.fecha, language)}</p>
          {showWorkerName && <p className="mt-1 text-xs text-[#6B7280]">{visit.trabajador}</p>}
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            state === "completed"
              ? "bg-[#ECFAF8] text-[#0F9E98]"
              : state === "inProgress"
              ? "bg-[#EEF6FF] text-[#0B4EA2]"
              : "bg-[#FFF7E8] text-[#A16207]"
          }`}
        >
          {state === "cancelled"
            ? t("pages.visits.statusCancelled")
            : state === "completed"
            ? t("pages.visits.checkOutCompleted")
            : state === "inProgress"
            ? t("pages.visits.checkInDone")
            : t("pages.visits.checkInPending")}
        </span>
      </div>

      {address && (
        <p className="mt-3 flex items-start gap-2 text-sm text-[#4B5563]">
          <MapPin className="mt-0.5 h-4 w-4 text-[#0F9E98]" />
          <span>{address}</span>
        </p>
      )}

      {visit.observaciones && <p className="mt-3 text-sm leading-6 text-[#4B5563]">{visit.observaciones}</p>}

      <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-[#4B5563] lg:grid-cols-2">
        <div className="rounded-xl border border-[#D8EFEA] bg-white p-3">
          <p className="flex items-center gap-2 font-semibold text-[#1F2937]"><PlayCircle className="h-4 w-4 text-[#0F9E98]" /> {t("pages.visits.checkInSection")}</p>
          {visit.startedAt ? (
            <>
              <p className="mt-2"><span className="font-semibold text-[#1F2937]">{t("pages.visits.startedAt")}:</span> {formatVisitDateTime(visit.startedAt, language)}</p>
              {startCoordinates && <p className="mt-1 text-[#0F9E98]">{t("pages.visits.locationRecorded")}</p>}
            </>
          ) : (
            <p className="mt-2 text-[#6B7280]">{t("pages.visits.checkInPending")}</p>
          )}
        </div>

        <div className="rounded-xl border border-[#D8EFEA] bg-white p-3">
          <p className="flex items-center gap-2 font-semibold text-[#1F2937]"><CheckCircle2 className="h-4 w-4 text-[#0F9E98]" /> {t("pages.visits.checkOutSection")}</p>
          {visit.endedAt ? (
            <>
              <p className="mt-2"><span className="font-semibold text-[#1F2937]">{t("pages.visits.endedAt")}:</span> {formatVisitDateTime(visit.endedAt, language)}</p>
              {endCoordinates && <p className="mt-1 text-[#0F9E98]">{t("pages.visits.locationRecorded")}</p>}
            </>
          ) : (
            <p className="mt-2 text-[#6B7280]">{state === "inProgress" ? t("pages.visits.checkOutPending") : t("pages.visits.checkOutNotAvailable")}</p>
          )}
        </div>
      </div>

      {state === "pending" && (
        <button
          onClick={() => void onStart(visit.id)}
          disabled={busy}
          className="mt-4 rounded-2xl border border-[#D8EFEA] bg-white px-4 py-3 text-sm font-semibold text-[#1F2937] transition duration-300 hover:bg-[#ECFAF8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? t("pages.visits.processing") : t("pages.visits.startCheckIn")}
        </button>
      )}

      {state === "inProgress" && (
        <div className="mt-4">
          <button
            onClick={() => setExpanded((current) => !current)}
            disabled={busy}
            className="rounded-2xl bg-[#0F9E98] px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#0B817C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {expanded ? t("pages.visits.hideFinishForm") : t("pages.visits.finishVisit")}
          </button>

          {expanded && (
            <div className="mt-4 grid grid-cols-1 gap-3">
              <textarea
                value={finishForm.assistanceReport}
                onChange={(event) => setFinishForm((current) => ({ ...current, assistanceReport: event.target.value }))}
                placeholder={t("pages.visits.reportRequired")}
                className="rounded-xl border border-[#D7E5E3] px-4 py-3"
                rows={3}
              />
              <textarea
                value={finishForm.careNotes ?? ""}
                onChange={(event) => setFinishForm((current) => ({ ...current, careNotes: event.target.value }))}
                placeholder={t("pages.visits.optionalNotes")}
                className="rounded-xl border border-[#D7E5E3] px-4 py-3"
                rows={2}
              />
              <button
                onClick={() => void handleFinish()}
                disabled={busy}
                className="rounded-2xl bg-[#0F9E98] px-4 py-3 font-semibold text-white transition duration-300 hover:bg-[#0B817C] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? t("pages.visits.processing") : t("pages.visits.finishVisit")}
              </button>
            </div>
          )}
        </div>
      )}

      {state === "completed" && (
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#0F9E98]">
          <Clock3 className="h-4 w-4" />
          <span>{t("pages.visits.completedStateHelp")}</span>
        </div>
      )}
    </article>
  );
}