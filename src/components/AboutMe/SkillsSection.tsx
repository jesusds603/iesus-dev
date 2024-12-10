import React from "react";
import { useTheme } from "@/hooks/useTheme"; // Importamos el hook para el tema
import { useLanguage } from "@/hooks/useLanguage";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaPython, FaDocker } from "react-icons/fa"; // Importamos los íconos
import { GrFedora } from "react-icons/gr";
import { HiMiniLanguage } from "react-icons/hi2";
import { IoLogoHtml5 } from "react-icons/io5";
import { PiSigmaThin } from "react-icons/pi";

function SkillsSection() {
  const { myTheme } = useTheme(); // Obtenemos el tema actual
  const { myLanguage } = useLanguage(); // Obtenemos el tema actual

  // Definir clases dinámicas para el tema
  const themeClasses =
    myTheme === "dark"
      ? "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white"
      : "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-black";

  const hoverClasses =
    myTheme === "dark"
      ? "hover:bg-gradient-to-r from-gray-800 to-gray-700"
      : "hover:bg-gradient-to-r from-blue-200 to-purple-300";

  return (
    <div className={`space-y-8 p-4 rounded-lg shadow-lg ${themeClasses}`}>
      <div className="border-b pb-6">
        <ul className="pl-6 mt-2 space-y-2">
          <li
            className={`flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ${hoverClasses}`}
          >
            <IoLogoHtml5
              className={`text-[36px] w-[40px] ${
                myTheme === "dark" ? "text-teal-400" : "text-teal-800"
              }`}
            />
            <span>
              {myLanguage === "eng"
                ? "Web Development using HTML, CSS, JavaScript, NodeJs, React, NextJs, ThreeJs"
                : "Desarrollo Web con HTML, CSS, JavaScript, NodeJs, React, NextJs, ThreeJs"}
            </span>
          </li>
          <li
            className={`flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ${hoverClasses}`}
          >
            <FaPython
              className={`text-[36px] w-[40px] ${
                myTheme === "dark" ? "text-teal-400" : "text-teal-800"
              }`}
            />
            <span>
              {myLanguage === "eng"
                ? "Coding with Python and Data Analysys (numpy, pandas, matplotlib, etc)"
                : "Programación en Python y análisis de datos (numoy, pandas, matplotlib, etc)."}
            </span>
          </li>
          <li
            className={`flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ${hoverClasses}`}
          >
            <BiLogoPostgresql
              className={`text-[36px] w-[40px] ${
                myTheme === "dark" ? "text-teal-400" : "text-teal-800"
              }`}
            />
            <span>
              {myLanguage === "eng"
                ? "Database management: SQL, Excel, JSON, PySpark"
                : "Manejo de bases de datos: SQL, Excel, JSON, PySpark"}
            </span>
          </li>
          <li
            className={`flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ${hoverClasses}`}
          >
            <FaDocker
              className={`text-[36px] w-[40px] ${
                myTheme === "dark" ? "text-teal-400" : "text-teal-800"
              }`}
            />
            <span>Docker</span>
          </li>
          <li
            className={`flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ${hoverClasses}`}
          >
            <GrFedora
              className={`text-[36px] w-[40px] ${
                myTheme === "dark" ? "text-teal-400" : "text-teal-800"
              }`}
            />
            <span>
              {myLanguage === "eng"
                ? "Linux knowledge"
                : "Conocimientos de Linux"}
            </span>
          </li>
          <li
            className={`flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ${hoverClasses}`}
          >
            <HiMiniLanguage
              className={`text-[36px] w-[40px] ${
                myTheme === "dark" ? "text-teal-400" : "text-teal-800"
              }`}
            />
            <span>{myLanguage === "eng" ? "English B1" : "Inglés B1"}</span>
          </li>
          <li
            className={`flex items-center justify-start space-x-2 p-2 rounded-md transition-all duration-300 ${hoverClasses}`}
          >
            <PiSigmaThin
              className={`text-[36px] w-[40px]  ${
                myTheme === "dark" ? "text-teal-400" : "text-teal-800"
              }`}
            />
            <span className="break-words whitespace-normal left-1">
              {myLanguage === "eng"
                ? "Mathematical logical thinking. Knowledge of advanced mathematics (abstract algebra, calculus, analysis, differential equations, linear programming, linear algebra, etc.)."
                : "Pensamiento lógico matemático. Conocimientos de matemática avanzada (álgebra abstracta, cálculo, análisis, ecuaciones diferenciales, programación lineal, álgebra lineal, etc."}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SkillsSection;
