import { calculateAverage } from "@utils/calculationUtils";
import { getReviewRatings } from "@utils/transformUtils";
import Link from "next/link";
import React from "react";
import { RestaurantCardType } from "../page";
import Price from "./price";
import Stars from "./Stars";

interface Props {
  restaurant: RestaurantCardType;
}

function RestaurantCard({ restaurant }: Props) {
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img src={restaurant.main_image} alt="" className="w-full h-36" />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <Stars reviews={restaurant.Review} />
            {/* <div className="flex mb-2">
              {/(getReviewRatings(restaurant.Review)).toFixed(1)}
            </div> */}
            <p className="ml-2">{restaurant.Review.length} reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
}

export default RestaurantCard;
