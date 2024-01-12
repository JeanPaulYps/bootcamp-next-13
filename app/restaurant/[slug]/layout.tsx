import React, { PropsWithChildren } from "react";
import Header from "./components/Header";

function RestaurantLayout({
  children,
  params: { slug },
}: { params: { slug: string } } & PropsWithChildren) {
  return (
    <main>
      <Header name={slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
}

export default RestaurantLayout;
