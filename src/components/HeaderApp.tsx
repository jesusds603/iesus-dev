"use client";
import React from "react";
import { useMenu } from "@/hooks/useMenu";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdLanguage } from "react-icons/md"; // Icono de lenguaje
import Link from "next/link";

const HeaderApp = () => {
  const { isMenuOpen, toggleMenu } = useMenu();
  const { myTheme, toggleTheme } = useTheme();
  const { myLanguage, toggleLanguage } = useLanguage(); // Usar el estado del idioma del proveedor

  const themeClasses =
    myTheme === "dark"
      ? "text-white bg-gray-800 border-gray-800"
      : "text-gray-900 bg-gray-200 border-gray-300";

  const buttonClasses = `text-2xl p-2 rounded-full transition-transform duration-300 ${
    myTheme === "dark" ? "text-yellow-400" : "text-blue-600"
  }`;

  return (
    <div
      className={`fixed h-[48px] z-30 top-0 left-0 w-full flex items-center justify-between p-0 ${themeClasses}`}
    >
      {/* Menu button */}
      <button onClick={toggleMenu} className={buttonClasses}>
        {isMenuOpen ? (
          <AiOutlineClose className="transform transition-transform duration-500" />
        ) : (
          <AiOutlineMenu className="transform transition-transform duration-500" />
        )}
      </button>

      {/* Brand logo or title */}
      <Link href={"/"} className="text-xl font-semibold">
        IesusDev
      </Link>

      {/* Actions: Toggle theme and Language switch */}
      <div className="flex items-center space-x-3">
        <button onClick={toggleTheme} className={buttonClasses}>
          {myTheme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        {/* Language toggle button */}
        <button
          onClick={toggleLanguage}
          className={`flex items-center ${buttonClasses}`}
        >
          <MdLanguage className="mr-1" />{" "}
          {/* Espaciado a la derecha del icono */}
          <span className="font-medium">
            {myLanguage === "eng" ? "EN" : "ES"}
          </span>{" "}
          {/* Muestra el idioma actual */}
        </button>
      </div>
    </div>
  );
};

export default HeaderApp;
