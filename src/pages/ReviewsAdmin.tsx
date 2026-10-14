import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { getReviewsForModeration, moderateReview, type Review } from "../services/reviewService";
import { useTranslation } from "react-i18next";

export default function ReviewsAdmin() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState(false);

  async function load() {
    try {
      setError(false);
      setReviews(await getReviewsForModeration());
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    let active = true;
    getReviewsForModeration()
      .then((data) => {
        if (active) setReviews(data);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  async function moderate(id: number, status: "approved" | "rejected") {
    try {
      await moderateReview(id, status);
      await load();
    } catch {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)] lg:flex">
      <Sidebar role="admin" />
      <main className="flex-1 p-4 pt-16 sm:p-6 sm:pt-20 lg:p-8 lg:pt-8">
        <Topbar title={t("publicHome.reviews.adminTitle")} subtitle={t("publicHome.reviews.adminSubtitle")} name={t("profiles.adminName")} role={t("roles.admin")} />
        {error && <p role="alert" className="mt-8 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{t("publicHome.reviews.adminError")}</p>}
        <section className="mt-8 space-y-4">
          {reviews.length === 0 && <p className="rounded-2xl border border-[#D8EFEA] bg-white p-5 text-sm text-[#4B5563]">{t("publicHome.reviews.adminEmpty")}</p>}
          {reviews.map((review) => (
            <article key={review.id} className="rounded-3xl border border-[#D8EFEA] bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-[#1F2937]">{review.authorName} · {review.rating}/5</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-[#6B7280]">{review.status}</p>
                </div>
                {review.status === "pending" && (
                  <div className="flex gap-2">
                    <button type="button" onClick={() => void moderate(review.id, "approved")} className="rounded-xl bg-[#0F9E98] px-3 py-2 text-sm font-semibold text-white">{t("publicHome.reviews.approve")}</button>
                    <button type="button" onClick={() => void moderate(review.id, "rejected")} className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700">{t("publicHome.reviews.reject")}</button>
                  </div>
                )}
              </div>
              <p className="mt-4 text-sm leading-7 text-[#4B5563]">{review.comment}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
