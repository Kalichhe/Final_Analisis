"use client";
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import SearchSection from "@/components/Home/SearchSection";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [shouldDrawRoute, setShouldDrawRoute] = useState(false);

  const handleSearch = () => {
    setShouldDrawRoute(true);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5 ">
      <head>
        <title>Patho Delivery</title>
      </head>
      <div>
        <SearchSection onSearch={handleSearch} />
      </div>
      <div className="col-span-2">
        <GoogleMapSection shouldDrawRoute={shouldDrawRoute} />
      </div>
    </div>
  );
}
