import Link from "next/link";
import React from "react";

function RestaurantNavbar() {
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href="" className="mr-7">
        {" "}
        Overview{" "}
      </Link>
      <Link href="" className="mr-7">
        {" "}
        Menu{" "}
      </Link>
    </nav>
  );
}

export default RestaurantNavbar;
