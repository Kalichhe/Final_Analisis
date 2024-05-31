"use client";
import React from "react";
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import PackageInfo from "@/components/Package/PackageInfo";
import { carContext } from "@/context/CarContext";
import { useContext, useState } from "react";

function page() {
  const { car, setCar } = useContext(carContext);
  const [selectedCar, setSelectedCar] = useState(null);
  console.log("car", car);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5 ">
      <head>
        <title>Patho Package</title>
      </head>
      <PackageInfo />
      <div className="col-span-2">
        <GoogleMapSection shouldDrawRoute={true} />
      </div>
    </div>
  );
}

export default page;
