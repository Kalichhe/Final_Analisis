"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const headerMenu = [
    {
      id: 1,
      name: "Viaje",
      icon: "/trip-w.png",
      path: "/",
    },
    {
      id: 2,
      name: "Paquetes",
      icon: "/package-w.png",
      path: "package",
    },
    {
      id: 3,
      name: "Soporte",
      icon: "/support.png",
      path: "support",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="p-2 pb-0.5 pl-3 border-b-[4px] border-gray-200">
      <div className="flex items-center">
        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/logo-patho-w.png"
            alt="logo-patho"
            width={60}
            height={60}
          />
          <Image src="/logo-w.png" alt="logo" width={90} height={70} />
        </motion.div>
        <div className="md:hidden flex justify-center">
          <div className="absolute right-3 top-5">
            <button onClick={toggleMenu}>
              <Image src="/menu-icon.png" alt="Menu" width={32} height={32} />
            </button>
          </div>
        </div>
        {/* Menu normal de pantallas grandes*/}
        <motion.div
          className="hidden md:flex items-center gap-6 ml-5"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {headerMenu.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Image src={item.icon} alt={item.name} width={32} height={32} />
              <Link href={item.path}>
                <h2 className="font-bold text-[19px]">{item.name}</h2>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-14 right-3 bg-[#101010] shadow-lg rounded-md p-4 z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            {headerMenu.map((item) => (
              <div key={item.id} className="flex items-center gap-2 mt-3">
                <Image src={item.icon} alt={item.name} width={32} height={32} />
                <Link href={item.path}>
                  <h2 className="font-bold text-[19px]">{item.name}</h2>
                </Link>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
