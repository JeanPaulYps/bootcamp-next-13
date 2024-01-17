import Stars from "@/app/components/Stars";
import { Review } from "@prisma/client";
import { calculateAverage } from "@utils/calculationUtils";
import { getReviewRatings } from "@utils/transformUtils";
import React from "react";

function Rating({ reviews }: { reviews: Review[] }) {
  console.log(reviews);
  const average = calculateAverage(getReviewRatings(reviews));
  console.log(average);
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="text-reg ml-3">{average.toPrecision(2)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} Reviews</p>
      </div>
    </div>
  );
}

export default Rating;
