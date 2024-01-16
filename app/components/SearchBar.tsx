"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState<string>("");
  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        onChange={(event) => {
          setLocation(event.target.value);
        }}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={() => {
          if (location) {
            router.push(`/search?city=${location}`);
          }
        }}
      >
        Let's go
      </button>
    </div>
  );
}

export default SearchBar;
