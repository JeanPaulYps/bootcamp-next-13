import { Review } from "@prisma/client";

export const getReviewRatings = (reviews: Review[]) =>
  reviews.map((review) => review.rating);
