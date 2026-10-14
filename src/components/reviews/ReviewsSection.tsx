import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getPublicReviews, submitReview, type Review } from "../../services/reviewService";

export default function ReviewsSection() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "saving" | "success" | "error">("idle");
  const role = localStorage.getItem("role");
  const canSubmit = Boolean(localStorage.getItem("token") && (role === "client" || role === "family"));

  useEffect(() => {
    let active = true;
    getPublicReviews()
      .then((data) => {
        if (active) setReviews(data);
      })
      .catch(() => {
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (comment.trim().length < 10) {
      setSubmitState("error");
      return;
    }

    setSubmitState("saving");
    try {
      await submitReview({ rating, comment: comment.trim() });
      setComment("");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <section className="bg-white px-4 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#F29A38] sm:text-sm">{t("publicHome.reviews.label")}</p>
          <h2 className="mt-3 text-3xl font-bold text-[#1F2937] sm:text-4xl">{t("publicHome.reviews.title")}</h2>
          <p className="mt-4 text-sm leading-7 text-[#4B5563] sm:text-base">{t("publicHome.reviews.description")}</p>
        </div>

        {loading ? (
          <p className="mt-8 text-sm text-[#4B5563]">{t("publicHome.reviews.loading")}</p>
        ) : loadError ? (
          <p role="alert" className="mt-8 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{t("publicHome.reviews.loadError")}</p>
        ) : reviews.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-[#D8EFEA] bg-[#F7FCFB] p-5 text-sm text-[#4B5563]">{t("publicHome.reviews.empty")}</p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-3xl border border-[#D8EFEA] bg-[#F7FCFB] p-6">
                <div className="flex gap-1" aria-label={`${review.rating} ${t("publicHome.reviews.stars")}`}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} size={18} fill={index < review.rating ? "#F29A38" : "none"} className={index < review.rating ? "text-[#F29A38]" : "text-[#CBD5E1]"} />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-[#4B5563]">“{review.comment}”</p>
                <p className="mt-5 text-sm font-bold text-[#1F2937]">{review.authorName}</p>
              </article>
            ))}
          </div>
        )}

        {canSubmit && (
          <form onSubmit={handleSubmit} className="mt-10 max-w-2xl rounded-3xl border border-[#D8EFEA] bg-[#F7FCFB] p-6">
            <h3 className="text-xl font-bold text-[#1F2937]">{t("publicHome.reviews.submitTitle")}</h3>
            <label className="mt-5 block text-sm font-semibold text-[#1F2937]">
              {t("publicHome.reviews.rating")}
              <select value={rating} onChange={(event) => setRating(Number(event.target.value))} className="mt-2 block w-full rounded-xl border border-[#D7E5E3] bg-white px-4 py-3">
                {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value}/5</option>)}
              </select>
            </label>
            <label className="mt-4 block text-sm font-semibold text-[#1F2937]">
              {t("publicHome.reviews.comment")}
              <textarea value={comment} onChange={(event) => setComment(event.target.value)} minLength={10} maxLength={1000} required rows={4} className="mt-2 block w-full rounded-xl border border-[#D7E5E3] bg-white px-4 py-3 font-normal" />
            </label>
            {submitState === "success" && <p role="status" className="mt-3 text-sm text-[#0F817C]">{t("publicHome.reviews.submitted")}</p>}
            {submitState === "error" && <p role="alert" className="mt-3 text-sm text-red-700">{t("publicHome.reviews.submitError")}</p>}
            <button type="submit" disabled={submitState === "saving"} className="mt-5 rounded-2xl bg-[#0F9E98] px-5 py-3 font-semibold text-white disabled:opacity-60">
              {submitState === "saving" ? t("publicHome.reviews.submitting") : t("publicHome.reviews.submit")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
