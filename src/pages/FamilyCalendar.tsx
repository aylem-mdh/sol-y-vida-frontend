import { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { getFamilyVisits, type FamilyVisit } from "../services/familyPortalService";
import { formatDateTime, getLocale, getVisitStatusLabel } from "../services/familyPortalPresentation";

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function fromDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatMonthLabel(date: Date, language: string) {
  return new Intl.DateTimeFormat(getLocale(language), { month: "long", year: "numeric" }).format(date);
}

type CalendarDay = {
  key: string | null;
  date: Date | null;
  dayNumber: number | null;
  inCurrentMonth: boolean;
  visits: FamilyVisit[];
};

function buildCalendarDays(cursor: Date, visitsByDay: Map<string, FamilyVisit[]>) {
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

export default function FamilyCalendar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const role = (localStorage.getItem("role") === "client" ? "client" : "family") as "client" | "family";

  const [visits, setVisits] = useState<FamilyVisit[]>([]);
  const [search, setSearch] = useState("");
  const [monthCursor, setMonthCursor] = useState(() => new Date());
  const [selectedDayKey, setSelectedDayKey] = useState(() => toDateKey(new Date()));

  const loadVisits = useCallback(async () => {
    try {
      const data = await getFamilyVisits();
      setVisits(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadVisits();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loadVisits]);

  const visibleVisits = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    const sorted = visits
      .slice()
      .sort(
        (left, right) =>
          new Date(left.scheduledAt ?? "").getTime() - new Date(right.scheduledAt ?? "").getTime(),
      );

    if (!normalized) {
      return sorted;
    }

    return sorted.filter((visit) =>
      `${visit.professional} ${visit.location} ${visit.status} ${visit.summary}`.toLowerCase().includes(normalized)
    );
  }, [search, visits]);

  const visitsByDay = useMemo(() => {
    return visibleVisits.reduce((accumulator, visit) => {
      if (!visit.scheduledAt) {
        return accumulator;
      }

      const visitDate = new Date(visit.scheduledAt);
      if (!Number.isFinite(visitDate.getTime())) {
        return accumulator;
      }

      const key = toDateKey(visitDate);
      const bucket = accumulator.get(key) ?? [];
      bucket.push(visit);
      accumulator.set(key, bucket);
      return accumulator;
    }, new Map<string, FamilyVisit[]>());
  }, [visibleVisits]);

  const calendarDays = useMemo(() => buildCalendarDays(monthCursor, visitsByDay), [monthCursor, visitsByDay]);

  const selectedDayVisits = useMemo(() => {
    return visitsByDay.get(selectedDayKey) ?? [];
  }, [selectedDayKey, visitsByDay]);

  const selectedDate = useMemo(() => fromDateKey(selectedDayKey), [selectedDayKey]);
  const todayKey = toDateKey(new Date());

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
      <Sidebar role={role} />

      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar
          title={t("sidebar.calendar")}
          subtitle={role === "client" ? t("familyPage.topbar.subtitleClient") : t("familyPage.topbar.subtitleFamily")}
          name={t("profiles.familyName")}
          role={role === "client" ? t("roles.client") : t("roles.family")}
          notificationPath="/notifications"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder={t("familyPage.topbar.searchPlaceholder")}
        />

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={previousMonth}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D8EFEA] bg-white text-[#0F9E98] transition duration-300 hover:bg-[#ECFAF8]"
                aria-label={t("agendaPage.previousMonth")}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#D8EFEA] bg-white px-4 py-2 text-sm font-semibold text-[#1F2937]">
                <Calendar className="h-4 w-4 text-[#0F9E98]" />
                {formatMonthLabel(monthCursor, i18n.language)}
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
                        <p className="truncate font-semibold text-[#1F2937]">{day.visits[0].professional}</p>
                        <p className="truncate">{day.visits[0].hour}</p>
                      </div>
                    ) : (
                      <div className="mt-auto text-[10px] text-[#9CA3AF] sm:text-xs">{t("agendaPage.free")}</div>
                    )}
                  </button>
                );
              })}
            </div>
          </article>

          <article className="rounded-[28px] border border-[#D8EFEA] bg-white p-6 shadow-[0_16px_36px_rgba(15,25,30,0.08)] sm:p-7">
            <h3 className="text-xl font-bold text-[#1F2937]">
              {new Intl.DateTimeFormat(getLocale(i18n.language), {
                weekday: "long",
                day: "2-digit",
                month: "long",
              }).format(selectedDate)}
            </h3>

            <div className="mt-4 space-y-3">
              {selectedDayVisits.length === 0 && (
                <div className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4 text-sm text-[#4B5563]">
                  {t("agendaPage.noDayVisits")}
                </div>
              )}

              {selectedDayVisits.map((visit) => (
                <div key={visit.id} className="rounded-2xl border border-[#E3F2EF] bg-[#FAFDFC] p-4">
                  <p className="font-semibold text-[#1F2937]">{visit.professional}</p>
                  <p className="mt-1 text-sm text-[#4B5563]">{visit.scheduledAt ? formatDateTime(visit.scheduledAt, i18n.language) : "-"}</p>
                  <p className="mt-1 text-xs text-[#6B7280]">{visit.location}</p>
                  <p className="mt-2 text-sm text-[#4B5563]">{visit.summary}</p>
                  <p className="mt-2 text-xs font-semibold text-[#0F9E98]">{getVisitStatusLabel(visit.status, t)}</p>

                  {visit.relatedReportId && (
                    <button
                      onClick={() => navigate(`/family/reports?reportId=${visit.relatedReportId}`)}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#D8EFEA] bg-white px-3 py-2 text-xs font-semibold text-[#1F2937] hover:bg-[#ECFAF8]"
                    >
                      <FileText className="h-4 w-4 text-[#0F9E98]" />
                      {t("reportsPage.actions.viewSummary")}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
