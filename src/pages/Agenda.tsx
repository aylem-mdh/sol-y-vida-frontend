import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Clock3, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { getVisits, type Visit } from "../services/visitService";
import { getCurrentUserIdFromToken } from "../utils/authClaims";

type CalendarDay = {
  key: string | null;
  date: Date | null;
  dayNumber: number | null;
  inCurrentMonth: boolean;
  visits: Visit[];
};

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function fromDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatTime(value: string, language: string) {
  return new Date(value).toLocaleTimeString(
    language === "es" ? "es-ES" : language === "fr" ? "fr-FR" : language === "de" ? "de-DE" : "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

function formatMonthLabel(date: Date, language: string) {
  return new Intl.DateTimeFormat(
    language === "es" ? "es-ES" : language === "fr" ? "fr-FR" : language === "de" ? "de-DE" : "en-US",
    { month: "long", year: "numeric" }
  ).format(date);
}

function getLocale(language: string) {
  return language === "es" ? "es-ES" : language === "fr" ? "fr-FR" : language === "de" ? "de-DE" : "en-US";
}

function formatDateTime(value: string, language: string) {
  return new Intl.DateTimeFormat(getLocale(language), {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function translateVisitStatus(status: string | undefined, t: (key: string) => string) {
  const normalized = (status ?? "").trim().toLowerCase();

  if (!normalized) {
    return t("agendaPage.scheduled");
  }

  if (
    normalized.includes("program") ||
    normalized.includes("scheduled") ||
    normalized.includes("planif") ||
    normalized.includes("geplant")
  ) {
    return t("agendaPage.scheduled");
  }

  if (
    normalized.includes("inici") ||
    normalized.includes("start") ||
    normalized.includes("démarr") ||
    normalized.includes("gestart")
  ) {
    return t("pages.visits.start");
  }

  if (
    normalized.includes("final") ||
    normalized.includes("finish") ||
    normalized.includes("termin") ||
    normalized.includes("beendet")
  ) {
    return t("pages.visits.finish");
  }

  return status ?? t("agendaPage.scheduled");
}

function buildCalendarDays(cursor: Date, visitsByDay: Map<string, Visit[]>) {
  const monthStart = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
  const firstWeekdayOffset = (monthStart.getDay() + 6) % 7;
  const totalCells = Math.ceil((firstWeekdayOffset + monthEnd.getDate()) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index): CalendarDay => {
    const dayIndex = index - firstWeekdayOffset + 1;

    if (dayIndex < 1 || dayIndex > monthEnd.getDate()) {
      return {
        key: null,
        date: null,
        dayNumber: null,
        inCurrentMonth: false,
        visits: [],
      };
    }

    const date = new Date(cursor.getFullYear(), cursor.getMonth(), dayIndex);
    const key = toDateKey(date);

    return {
      key,
      date,
      dayNumber: dayIndex,
      inCurrentMonth: true,
      visits: visitsByDay.get(key) ?? [],
    };
  });
}

export default function Agenda() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [search, setSearch] = useState("");
  const [monthCursor, setMonthCursor] = useState(() => new Date());
  const [selectedDayKey, setSelectedDayKey] = useState(() => toDateKey(new Date()));

  const currentUserId = getCurrentUserIdFromToken();

  useEffect(() => {
    loadVisits();
  }, []);

  async function loadVisits() {
    try {
      const data = await getVisits();
      setVisits(data);
    } catch (error) {
      console.error(error);
    }
  }

  const visibleVisits = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = visits.filter((visit) => {
      if (currentUserId != null && visit.workerId !== currentUserId) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const address = (visit as Visit & { direccion?: string; address?: string }).direccion ?? (visit as Visit & { direccion?: string; address?: string }).address ?? "";
      const text = `${visit.cliente} ${visit.trabajador} ${visit.observaciones} ${visit.fecha} ${address}`.toLowerCase();
      return text.includes(normalizedSearch);
    });

    return filtered.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }, [currentUserId, search, visits]);

  const visitsByDay = useMemo(() => {
    return visibleVisits.reduce((accumulator, visit) => {
      const key = toDateKey(new Date(visit.fecha));
      const bucket = accumulator.get(key) ?? [];
      bucket.push(visit);
      accumulator.set(key, bucket);
      return accumulator;
    }, new Map<string, Visit[]>());
  }, [visibleVisits]);

  const calendarDays = useMemo(() => buildCalendarDays(monthCursor, visitsByDay), [monthCursor, visitsByDay]);

  const selectedDayVisits = useMemo(() => {
    return visitsByDay.get(selectedDayKey) ?? [];
  }, [selectedDayKey, visitsByDay]);

  const selectedDate = useMemo(() => fromDateKey(selectedDayKey), [selectedDayKey]);

  const upcomingVisits = useMemo(() => {
    const now = new Date();

    return visibleVisits
      .filter((visit) => new Date(visit.fecha).getTime() >= now.getTime())
      .slice(0, 6);
  }, [visibleVisits]);

  const todayKey = toDateKey(new Date());
  const todayVisits = visitsByDay.get(todayKey) ?? [];
  const weekDayLabels = useMemo(() => {
    const base = new Date(2024, 0, 1);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(base.getFullYear(), base.getMonth(), base.getDate() + index);
      return new Intl.DateTimeFormat(getLocale(i18n.language), { weekday: "short" }).format(date);
    });
  }, [i18n.language]);

  function previousMonth() {
    const nextCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1);
    setMonthCursor(nextCursor);
    setSelectedDayKey(toDateKey(nextCursor));
  }

  function nextMonth() {
    const nextCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1);
    setMonthCursor(nextCursor);
    setSelectedDayKey(toDateKey(nextCursor));
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role="worker" />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("agendaPage.title")}
          subtitle={t("agendaPage.subtitle")}
          name={t("profiles.workerName")}
          role={t("roles.worker")}
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("agendaPage.searchPlaceholder")}
        />

        <section className="mt-8 rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1F2937]">{t("agendaPage.title")}</h2>
              <p className="mt-2 text-sm text-[#4B5563]">{t("agendaPage.subtitle")}</p>
            </div>

            <button
              onClick={() => navigate("/visits")}
              className="inline-flex items-center justify-center rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white transition duration-300 hover:bg-[#0B817C]"
            >
              {t("agendaPage.openVisitLog")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
              <p className="text-sm font-semibold text-[#1F2937]">{t("agendaPage.visibleServices")}</p>
              <p className="mt-2 text-3xl font-bold text-[#0F9E98]">{visibleVisits.length}</p>
            </div>
            <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
              <p className="text-sm font-semibold text-[#1F2937]">{t("agendaPage.todayServices")}</p>
              <p className="mt-2 text-3xl font-bold text-[#0F9E98]">{todayVisits.length}</p>
            </div>
            <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
              <p className="text-sm font-semibold text-[#1F2937]">{t("agendaPage.upcomingServices")}</p>
              <p className="mt-2 text-3xl font-bold text-[#0F9E98]">{upcomingVisits.length}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[26px] border border-[#D8EFEA] bg-[#FCFFFE] p-5">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D8EFEA] bg-white text-[#0F9E98] transition duration-300 hover:bg-[#ECFAF8]"
                  aria-label={t("agendaPage.previousMonth")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D8EFEA] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937]">
                    <Calendar className="h-4 w-4 text-[#0F9E98]" />
                    {formatMonthLabel(monthCursor, i18n.language)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D8EFEA] bg-white text-[#0F9E98] transition duration-300 hover:bg-[#ECFAF8]"
                  aria-label={t("agendaPage.nextMonth")}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B7280] sm:gap-2 sm:text-xs">
                {weekDayLabels.map((day) => (
                  <div key={day} className="py-2">{day}</div>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-1 sm:gap-2">
                {calendarDays.map((day, index) => {
                  const isSelected = day.key === selectedDayKey;
                  const isToday = day.key === todayKey;

                  if (!day.inCurrentMonth || !day.key || !day.dayNumber) {
                    return <div key={`empty-${index}`} className="h-24 rounded-2xl border border-transparent bg-transparent" />;
                  }

                  return (
                    <button
                      key={day.key}
                      onClick={() => setSelectedDayKey(day.key ?? todayKey)}
                      className={`flex min-h-[5rem] flex-col overflow-hidden rounded-2xl border p-2 text-left transition duration-300 sm:min-h-[6.5rem] sm:p-3 ${
                        isSelected
                          ? "border-[#0F9E98] bg-[#ECFAF8] shadow-[0_12px_24px_rgba(15,158,152,0.16)]"
                          : isToday
                          ? "border-[#F7D7AA] bg-[#FFF8EC]"
                          : "border-[#D8EFEA] bg-white hover:bg-[#F7FCFB]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-base font-bold leading-none ${isSelected ? "text-[#0B4EA2]" : "text-[#1F2937]"}`}>{day.dayNumber}</span>
                        {day.visits.length > 0 && (
                          <span className="rounded-full bg-[#0F9E98] px-2 py-0.5 text-[10px] font-bold leading-none text-white">
                            {day.visits.length}
                          </span>
                        )}
                      </div>

                      {day.visits.length > 0 ? (
                        <div className="mt-2 space-y-1 overflow-hidden text-[10px] leading-tight text-[#4B5563] sm:text-xs">
                          <p className="truncate font-semibold text-[#1F2937]">{day.visits[0].cliente}</p>
                          <p className="truncate">{formatTime(day.visits[0].fecha, i18n.language)}</p>
                        </div>
                      ) : (
                        <p className="mt-2 break-words text-[10px] font-medium leading-tight text-[#94A3B8] sm:text-xs">{t("agendaPage.free")}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </article>

            <article className="rounded-[26px] border border-[#D8EFEA] bg-white p-5">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-[#0F9E98]" />
                <h3 className="text-xl font-bold text-[#1F2937]">{t("agendaPage.dayServices")}</h3>
              </div>

              <p className="mt-2 text-sm text-[#4B5563]">
                {selectedDate.toLocaleDateString(
                  i18n.language === "es" ? "es-ES" : i18n.language === "fr" ? "fr-FR" : i18n.language === "de" ? "de-DE" : "en-US",
                  {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>

              <div className="mt-4 space-y-3">
                {selectedDayVisits.map((visit) => {
                  const visitAddress = (visit as Visit & { direccion?: string; address?: string }).direccion ?? (visit as Visit & { direccion?: string; address?: string }).address;

                  return (
                    <div key={visit.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[#1F2937]">{visit.cliente}</p>
                          <p className="mt-1 text-sm text-[#4B5563]">{formatTime(visit.fecha, i18n.language)} · {translateVisitStatus(visit.estado, t)}</p>
                        </div>
                        <span className="rounded-full bg-[#ECFAF8] px-3 py-1 text-xs font-semibold text-[#0F9E98]">
                          {visit.trabajador}
                        </span>
                      </div>

                      {visitAddress && (
                        <p className="mt-3 flex items-start gap-2 text-sm text-[#4B5563]">
                          <MapPin className="mt-0.5 h-4 w-4 text-[#0F9E98]" />
                          <span>{visitAddress}</span>
                        </p>
                      )}

                      {visit.observaciones && (
                        <p className="mt-3 text-sm leading-6 text-[#4B5563]">{visit.observaciones}</p>
                      )}

                      <button
                        onClick={() => navigate("/visits")}
                        className="mt-4 inline-flex items-center rounded-2xl border border-[#D8EFEA] bg-white px-4 py-2.5 text-sm font-semibold text-[#1F2937] transition duration-300 hover:bg-[#ECFAF8]"
                      >
                        {t("agendaPage.openVisitDetails")}
                        <ArrowRight className="ml-2 h-4 w-4 text-[#0F9E98]" />
                      </button>
                    </div>
                  );
                })}

                {selectedDayVisits.length === 0 && (
                  <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-5 text-sm text-[#4B5563]">
                    {t("agendaPage.noDayVisits")}
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-[#E3F2EF] pt-5">
                <h4 className="text-sm font-bold uppercase tracking-[0.14em] text-[#6B7280]">{t("agendaPage.upcomingList")}</h4>
                <div className="mt-3 space-y-3">
                  {upcomingVisits.map((visit) => (
                    <div key={visit.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                      <p className="font-semibold text-[#1F2937]">{visit.cliente}</p>
                      <p className="mt-1 text-sm text-[#4B5563]">{formatDateTime(visit.fecha, i18n.language)}</p>
                    </div>
                  ))}
                  {upcomingVisits.length === 0 && (
                    <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#4B5563]">
                      {t("agendaPage.noUpcoming")}
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}