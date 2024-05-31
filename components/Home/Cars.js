"use client";
import React, { useContext, useState } from "react";
import CarList from "@/app/data/CarList";
import Image from "next/image";
import { motion } from "framer-motion";
import { carContext } from "@/context/CarContext";

function Cars() {
  //const [selectedCar, setSelectedCar] = useState(null);
  const { car, setCar } = useContext(carContext);

  return (
    <div className="mt-3">
      <div
        className="grid grid-cols-3 
      md:grid-cols-2
      lg:grid-cols-3
      m-1 p-2"
      >
        {CarList.map((item, index) => (
          <motion.div
            key={index}
            className={`border-white border-2 rounded-xl p-2 flex flex-col items-center 
            justify-center cursor-pointer hover:bg-[#fcd581] hover:border-[#fcd581] 
            transition-all duration-300 ease-in-out m-3
            ${car?.name === item.name ? "bg-[#fcd581]" : ""}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
            onClick={() => setCar(item)}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
              priority={true}
            />
            <h2 className="text-[15px] text-white">{item.name}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
