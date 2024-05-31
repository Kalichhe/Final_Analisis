"use client";
import React, { useContext, useState, useEffect } from "react";
import { sourceContext } from "@/context/SourceContext";
import { destinationContext } from "@/context/DestinationContext";
import { carContext } from "@/context/CarContext";
import { motion } from "framer-motion";

function PackageInfo() {
  const { source } = useContext(sourceContext);
  const { destination } = useContext(destinationContext);
  const [showDetail, setShowDetail] = useState(false);
  const { car } = useContext(carContext);

  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const options = {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = now
      .toLocaleDateString("es-ES", options)
      .replace(".", "");
    setCurrentDateTime(formattedDate);
  }, []);

  const handleDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div className="p-6 border-2 rounded-2xl flex flex-col items-center justify-start bg-[#2d2d2d] shadow-lg w-full  mx-auto">
      <div className="w-full text-center mb-4">
        {source?.length !== 0 ? (
          <h2 className="text-2xl font-bold text-white mb-2">Llega hoy</h2>
        ) : (
          <h2 className="text-2xl font-bold text-white mb-2">
            No hay un envío disponible aún
          </h2>
        )}
      </div>
      <div className="w-full flex flex-col items-center mb-4">
        <div className="w-full flex items-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full shadow-lg">
            {source?.length !== 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  color="currentColor"
                >
                  <path d="M19.5 17.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m-10 0a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0" />
                  <path d="M14.5 17.5h-5M2 4h10c1.414 0 2.121 0 2.56.44C15 4.878 15 5.585 15 7v8.5m.5-9h1.801c.83 0 1.245 0 1.589.195c.344.194.557.55.984 1.262l1.699 2.83c.212.354.318.532.373.728c.054.197.054.403.054.816V15c0 .935 0 1.402-.201 1.75a1.5 1.5 0 0 1-.549.549c-.348.201-.815.201-1.75.201M2 13v2c0 .935 0 1.402.201 1.75a1.5 1.5 0 0 0 .549.549c.348.201.815.201 1.75.201M2 7h6m-6 3h4" />
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="M10.6 16q0-2.025.363-2.912T12.5 11.15q1.025-.9 1.563-1.562t.537-1.513q0-1.025-.687-1.7T12 5.7q-1.275 0-1.937.775T9.125 8.05L6.55 6.95q.525-1.6 1.925-2.775T12 3q2.625 0 4.038 1.463t1.412 3.512q0 1.25-.537 2.138t-1.688 2.012Q14 13.3 13.738 13.913T13.475 16zm1.4 6q-.825 0-1.412-.587T10 20t.588-1.412T12 18t1.413.588T14 20t-.587 1.413T12 22"
                />
              </svg>
            )}
          </div>
          {source?.length !== 0 ? (
            <div className="ml-4">
              <p className="text-lg font-semibold text-green-400">En camino</p>
              <p className="text-lg text-gray-200">
                Tu paquete está en el último tramo del recorrido.
              </p>
              <p className="text-sm text-gray-400">{currentDateTime}</p>
            </div>
          ) : (
            <div className="ml-4">
              <p className="text-lg font-semibold text-gray-400">En espera</p>
              <p className="text-lg text-gray-200">
                Aún no tenemos información de tu paquete.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full border-t border-gray-500 pt-4 mt-4">
        {source?.length !== 0 ? (
          <div>
            <div className="text-left mb-2">
              <p className="text-lg font-bold text-gray-200">
                Punto de origen:
              </p>
              <p className="text-lg text-gray-400">{source.name}</p>
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-gray-200">Destino:</p>
              <p className="text-lg text-gray-400">{destination.name}</p>
            </div>
            {!showDetail && (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <button
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-[blue-700]"
                  onClick={handleDetail}
                >
                  Detalle del envío
                </button>
              </motion.div>
            )}
            {showDetail && (
              <div className="mt-4">
                <motion.div
                  className="items-center justify-center flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <p className="text-xl font-bold text-gray-200">
                    Detalle del envío:
                  </p>
                  <p className="text-lg text-gray-400">
                    Tipo de vehículo asignado: {car.name}
                  </p>
                  <button
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                    onClick={handleDetail}
                  >
                    Ocultar detalle del envío
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        ) : (
          <p className="flex text-lg text-gray-200 justify-center">
            No hay datos de una entrega
          </p>
        )}
      </div>
    </div>
  );
}

export default PackageInfo;
