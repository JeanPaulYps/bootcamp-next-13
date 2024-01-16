import Link from "next/link";
import React from "react";

function RestaurantCard({
  name,
  description,
  price,
  cuisine,
  location,
  image,
  restaurantURL,
}: {
  name: string;
  description: string;
  price: string;
  cuisine: string;
  location: string;
  image: string;
  restaurantURL: string;
}) {
  return (
    <Link href={`/restaurant/${restaurantURL}`}>
      <div className="border-b flex pb-5">
        <img src={image} alt="" className="w-44 rounded" />
        <div className="pl-5">
          <h2 className="text-3xl">{name}</h2>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2 text-sm">{description}</p>
          </div>
          <div className="mb-9">
            <div className="font-light flex text-reg">
              <p className="mr-4">{price}</p>
              <p className="mr-4">{cuisine}</p>
              <p className="mr-4">{location}</p>
            </div>
          </div>
          <div className="text-red-600">
            <p>View more information</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;
