import api from "./api";

export interface Review {
  id: number;
  authorName: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export async function getPublicReviews() {
  const response = await api.get<Review[]>("/Reviews");
  return response.data;
}

export async function submitReview(payload: Pick<Review, "rating" | "comment">) {
  await api.post("/Reviews", payload);
}

export async function getReviewsForModeration() {
  const response = await api.get<Review[]>("/Reviews/moderation");
  return response.data;
}

export async function moderateReview(id: number, status: "approved" | "rejected") {
  await api.put(`/Reviews/${id}/moderation`, { status });
}
