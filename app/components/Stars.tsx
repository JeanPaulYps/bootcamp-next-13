import { Review } from "@prisma/client";
import { calculateAverage } from "@utils/calculationUtils";
import { getReviewRatings } from "@utils/transformUtils";
import Image from "next/image";
import React from "react";

const starsSource: Record<string, string> = {
  empty: "/icons/empty-star.png",
  half: "/icons/half-star.png",
  full: "/icons/full-star.png",
};

function Stars({ reviews, rating }: { reviews?: Review[]; rating?: number }) {
  const ratingReview = reviews
    ? calculateAverage(getReviewRatings(reviews))
    : rating ?? 0;
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((ratingReview - i).toFixed(1));

      if (difference <= 0.2) stars.push(starsSource["empty"]);
      else if (difference > 0.2 && difference <= 0.6)
        stars.push(starsSource["half"]);
      else stars.push(starsSource["full"]);
    }

    return stars.map((star, index) => (
      <Image
        src={star}
        alt=""
        className="w-4 h-4 mr-1"
        width={0}
        height={0}
        key={index}
      />
    ));
  };
  return <div className="flex items-center">{renderStars()}</div>;
}

export default Stars;
