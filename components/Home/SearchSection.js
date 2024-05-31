import React from "react";
import InputItem from "./InputItem";
import { useContext, useEffect } from "react";
import { sourceContext } from "@/context/SourceContext";
import { destinationContext } from "@/context/DestinationContext";
import gsap from "gsap";
import Cars from "./Cars";

function SearchSection({ onSearch }) {
  const { source, setSource } = useContext(sourceContext);
  const { destination, setDestination } = useContext(destinationContext);

  useEffect(() => {
    if (source?.length != [] && destination?.length != []) {
      gsap.to("#searchButton", {
        display: "block",
        width: "100%",
        duration: 0.9,
        ease: "power2.inOut",
        padding: "0.7rem",
      });
    }
  }, [source, destination]);
  return (
    <div className="p-2 md:pd-6 border-[2px] rounded-xl flex flex-col items-center justify-center">
      <div className="w-full flex justify-start">
        <p className="text-[20px] font-bold"> Hagamos una entrega</p>
      </div>
      <InputItem type="source" />
      <InputItem type="destination" />
      <div className="w-full flex justify-start mt-5">
        <p className="text-[20px] font-bold"> Selecciona tu vehiculo</p>
      </div>
      <Cars />
      <button
        onClick={onSearch}
        className="bg-[#fcd581] w-0 mt-5 text-black font-semibold rounded-xl text-lg overflow-hidden hidden text-nowrap"
        id="searchButton"
      >
        Buscar ruta
      </button>
    </div>
  );
}

export default SearchSection;
