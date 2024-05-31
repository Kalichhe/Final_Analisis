"use client";
import React, { use } from "react";
import Image from "next/image";
import { useState, useContext } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { sourceContext } from "@/context/SourceContext";
import { destinationContext } from "@/context/DestinationContext";

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const { source, setSource } = useContext(sourceContext);
  const { destination, setDestination } = useContext(destinationContext);

  const getLatAndLng = (place, type) => {
    if (place == null) {
      return;
    }

    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (place, status) => {
      if (status === "OK" && place.geometry && place.geometry.location) {
        if (type == "source") {
          setSource({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        } else {
          setDestination({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name,
          });
        }
      }
    });
  };

  return (
    <div className="bg-[#333333] p-3 rounded-lg mt-4 flex items-center gap-4 w-full">
      <Image
        src={type == "source" ? "/source2-pin.png" : "/destination.png"} //Comprobamos si el tipo es source o destination y asignamos la imagen correspondiente
        alt="source"
        width={type == "source" ? 33 : 28}
        height={type == "source" ? 33 : 28}
      />

      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: (place) => {
            getLatAndLng(place, type);
            setValue(place);
          },
          placeholder:
            type == "source"
              ? "Ingresa tu ubicación actual"
              : "Ingresa tu destino",
          isClearable: true,
          className:
            "bg-transparent w-full outline-none border-none text-[18px] placeholder-slate-400 rounded-lg text-white text-bold",
          components: {
            DropdownIndicator: false,
            NoOptionsMessage: () => (
              <span style={{ color: "#888" }} className="ml-3">
                No encontramos esa ubicación
              </span>
            ),
            LoadingMessage: () => (
              <span style={{ color: "#888" }}>Cargando...</span>
            ),
          },
          styles: {
            control: (provided) => {
              return {
                ...provided,
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
              };
            },
            option: (provided, state) => {
              return {
                ...provided,
                backgroundColor: state.isFocused ? "#575757" : "#282828",
                color: "#ffffff",
                padding: "10px",
                cursor: "pointer",
              };
            },
            menu: (provided) => {
              return {
                ...provided,
                backgroundColor: "#282828",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              };
            },
            singleValue: (provided) => {
              return {
                ...provided,
                color: "white", // Mantener el color del texto blanco
              };
            },
            input: (provided) => {
              //Estilos del input
              return {
                ...provided,
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                boxShadow: "none",
                caretColor: "gray",
              };
            },
          },
        }}
      />
    </div>
  );
}

export default InputItem;
