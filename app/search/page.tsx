import {
  Cuisine,
  Location,
  PRICE,
  Prisma,
  PrismaClient,
  Restaurant,
  Review,
} from "@prisma/client";
import { calculateAverage } from "@utils/calculationUtils";
import { getReviewRatings } from "@utils/transformUtils";
import Link from "next/link";
import React from "react";
import NavBar from "../components/NavBar";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

type RestaurantDetail = Pick<
  Restaurant,
  "id" | "main_image" | "name" | "price" | "description" | "slug"
> & {
  cuisine: { name: string };
  location: { name: string };
  Review: Review[];
};

const prisma = new PrismaClient();

const searchRestaurant = async ({
  city,
  cuisine,
  price,
}: {
  city?: string;
  cuisine?: string;
  price?: string;
}): Promise<RestaurantDetail[]> => {
  let whereQuery: Prisma.RestaurantWhereInput = {};
  if (!city && !cuisine && !price) {
    return [];
  }

  if (city) {
    whereQuery.location = {
      name: city.toLowerCase(),
    };
  }
  if (cuisine) {
    whereQuery.cuisine = {
      name: cuisine.toLowerCase(),
    };
  }
  if (price) {
    const priceVerified = price.toUpperCase() as PRICE;
    if (priceVerified in PRICE) {
      whereQuery.price = priceVerified;
    }
  }

  const restaurantsInCity = await prisma.restaurant.findMany({
    where: whereQuery,
    select: {
      id: true,
      main_image: true,
      name: true,
      description: true,
      slug: true,
      cuisine: {
        select: { name: true },
      },
      Review: true,
      price: true,
      location: {
        select: {
          name: true,
        },
      },
    },
  });
  return restaurantsInCity;
};

const getLocations = async (): Promise<Location[]> => {
  const locations: Location[] = await prisma.location.findMany();
  return locations;
};

const getCuisines = async (): Promise<Cuisine[]> => {
  const cuisines: Cuisine[] = await prisma.cuisine.findMany();
  return cuisines;
};

async function Search({
  searchParams: { city, cuisine, price },
}: {
  searchParams: { city?: string; cuisine?: string; price?: string };
}) {

  const restaurants = await searchRestaurant({
    city,
    cuisine,
    price,
  });

  const locations = await getLocations();
  const cuisines = await getCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParameters={{ city, cuisine, price }}
        />
        <div className="w-5/6">
          {restaurants.length === 0 ? (
            <p>No restaurant found</p>
          ) : (
            restaurants.map((restaurant) => (
              <RestaurantCard
                name={restaurant.name}
                image={restaurant.main_image}
                description={restaurant.description}
                cuisine={restaurant.cuisine.name}
                location={restaurant.location.name}
                price={restaurant.price}
                restaurantURL={restaurant.slug}
                reviews={restaurant.Review}
                key={restaurant.id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
