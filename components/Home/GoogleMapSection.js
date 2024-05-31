"use client";
import React, { useEffect, useContext, useState, use } from "react";
import { motion } from "framer-motion";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OVERLAY_LAYER,
  OverlayView,
} from "@react-google-maps/api";
import { sourceContext } from "@/context/SourceContext";
import { destinationContext } from "@/context/DestinationContext";
import { carContext } from "@/context/CarContext";
import mapStyles from "@/app/styles/mapStyles";

function GoogleMapSection({ shouldDrawRoute }) {
  const { source, setSource } = useContext(sourceContext);
  const { destination, setDestination } = useContext(destinationContext);
  const { car, setCar } = useContext(carContext);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const containerStyle = {
    width: "100%",
    height: "800px",
    borderRadius: "15px",
    overflow: "hidden",
    border: "3px solid #e5e7eb",
    boxSizing: "border-box",
  };

  const [center, setCenter] = useState({
    lat: 6.23184,
    lng: -75.609578,
  });

  const [map, setMap] = React.useState(null);

  const [directionsRoutePoints, setDirectionsRoutePoints] = useState([]);

  useEffect(() => {
    if (source?.length != [] && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });

      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
  }, [source, destination]);

  useEffect(() => {
    if (destination?.length != [] && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
    //if (source?.length != [] && destination?.length != []) {
    //  drawRoute();
    //}
  }, [source, destination]);

  useEffect(() => {
    if (
      shouldDrawRoute == true &&
      source?.length != [] &&
      destination?.length != []
    ) {
      drawRoute();

      const api_distance =
        google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(source.lat, source.lng),
          new google.maps.LatLng(destination.lat, destination.lng)
        );
      setDistance((api_distance / 1000).toFixed(2)); // Convert to km
      shouldDrawRoute = false;

      console.log("Drawing route updated, status: " + shouldDrawRoute);
    }
  }, [shouldDrawRoute, source, destination]);

  const drawRoute = () => {
    let travelMode = "";
    console.log(car);

    if (car.name === "Carro" || car.name === "Moto" || car.name === "Camión") {
      travelMode = "DRIVING";
    } else if (car.name === "Bicicleta") {
      travelMode = "BICYCLING"; // Not working
    } else if (car.name === "Malumeta") {
      travelMode = "WALKING";
    } else if (car.name === "Metro") {
      travelMode = "TRANSIT";
    }
    console.log(travelMode);

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode[travelMode],
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsRoutePoints(result);
          const api_duration = result.routes[0].legs[0].duration.text;
          setDuration(api_duration);
        } else {
          console.error("Error getting directions");
        }
      }
    );
  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ styles: mapStyles }}
      >
        {source?.length != [] ? (
          <MarkerF
            position={{ lat: source.lat, lng: source.lng }}
            icon={{
              url: "/source2-pin.png",
              scaledSize: new window.google.maps.Size(50, 55),
            }}
          >
            <OverlayView
              position={{ lat: source.lat, lng: source.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                className="p-2 bg-black font-bold inline-block rounded-xl shadow-md opacity-75"
                style={{ whiteSpace: "nowrap" }}
              >
                <p className="text-white text-[16px]">{source.label}</p>
              </div>
            </OverlayView>
          </MarkerF>
        ) : null}

        {destination?.length != [] ? (
          <MarkerF
            position={{ lat: destination.lat, lng: destination.lng }}
            icon={{
              url: "/destination-pin.png",
              scaledSize: new window.google.maps.Size(55, 58),
            }}
          >
            <OverlayView
              position={{ lat: destination.lat, lng: destination.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                className="p-2 bg-black font-bold inline-block rounded-xl shadow-md opacity-75"
                style={{ whiteSpace: "nowrap" }}
              >
                <p className="text-white text-[16px]">{destination.label}</p>
              </div>
            </OverlayView>
          </MarkerF>
        ) : null}
        <DirectionsRenderer
          directions={directionsRoutePoints}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#F8F8F8", // f7a911
              strokeOpacity: 0.9,
              strokeWeight: 5,
            },
          }}
        />

        {distance && distance !== "" && (
          <OVERLAY_LAYER>
            <motion.div
              className="p-2.5 bg-[#fcd581] font-bold inline-block rounded-md shadow-md"
              style={{ position: "absolute", bottom: "3.5px", left: "10px" }} // Para setear el contenedor en la esquina inferior izquierda
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <p className="text-black text-[16px]">
                Distancia de recorrido: {distance} Kilometros
              </p>
              <p className="text-black text-[16px]">
                Duracion del recorrido: {duration}
              </p>
            </motion.div>
          </OVERLAY_LAYER>
        )}

        <></>
      </GoogleMap>
    </motion.div>
  );
}

export default GoogleMapSection;
