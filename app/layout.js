"use client";
import { Outfit, Cabin, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { LoadScript } from "@react-google-maps/api";
import { sourceContext } from "@/context/SourceContext";
import { destinationContext } from "@/context/DestinationContext";
import { useState, useContext } from "react";
import { carContext } from "@/context/CarContext";

const cabin = Cabin({
  subsets: ["latin"],
  style: "normal",
});

const roboto = Roboto({
  subsets: ["latin"],
  style: "normal",
  weight: "700",
});

export default function RootLayout({ children }) {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [car, setCar] = useState("");
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </head>
      <body className={roboto.className}>
        <Header />
        <sourceContext.Provider value={{ source, setSource }}>
          <destinationContext.Provider value={{ destination, setDestination }}>
            <carContext.Provider value={{ car, setCar }}>
              <LoadScript
                libraries={["places"]}
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
              >
                {children}
              </LoadScript>
            </carContext.Provider>
          </destinationContext.Provider>
        </sourceContext.Provider>
      </body>
    </html>
  );
}
