import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";
import Head from "next/head";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import RestaurantCard from "./components/RestaurantCard";

const prisma = new PrismaClient();

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  Review: Review[];
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants: RestaurantCardType[] = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      Review: true,
    },
  });

  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} />
        ))}
      </div>
    </>
  );
}
