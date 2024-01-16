import { Cuisine, Location, PrismaClient } from "@prisma/client";
import Link from "next/link";
import React from "react";

function SearchSideBar({
  locations,
  cuisines,
  searchParameters,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParameters: { city?: string; cuisine?: string; price?: string };
}) {
  console.log(searchParameters);
  return (
    <div className="w-1/5 mr-5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: "search",
              query: { ...searchParameters, city: location.name },
            }}
            key={location.id}
          >
            <p className="font-light text-reg capitalize">{location.name}</p>
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: "search",
              query: { ...searchParameters, cuisine: cuisine.name },
            }}
            key={cuisine.id}
          >
            <p className="font-light text-reg capitalize">{cuisine.name}</p>
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: "search",
              query: { ...searchParameters, price: "cheap" },
            }}
          >
            <button className="border w-full text-reg font-light rounded-l p-2">
              $
            </button>
          </Link>
          <Link
            href={{
              pathname: "search",
              query: { ...searchParameters, price: "regular" },
            }}
          >
            <button className="border-r border-t border-b w-full text-reg font-light p-2">
              $$
            </button>
          </Link>
          <Link
            href={{
              pathname: "search",
              query: { ...searchParameters, price: "expensive" },
            }}
          >
            <button className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r">
              $$$
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchSideBar;
