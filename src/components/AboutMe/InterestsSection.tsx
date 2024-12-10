import React from "react";
import { useTheme } from "@/hooks/useTheme"; // Importamos el hook para el tema
import { FaFileCode, FaDocker } from "react-icons/fa"; // Importamos los íconos
import { TbMathIntegrals } from "react-icons/tb";
import { useLanguage } from "@/hooks/useLanguage";
import { MdOutlineHistoryEdu } from "react-icons/md";

function InterestsSection() {
  const { myTheme } = useTheme(); // Obtenemos el tema actual
  const { myLanguage } = useLanguage();

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
            <TbMathIntegrals
              className={`text-[36px] ${
                myTheme === "dark" ? "text-teal-400" : "text-teal-800"
              }`}
            />
            <span>{myLanguage === "eng" ? "Mathematics" : "Matemáticas"}</span>
          </li>
          <li
            className={`flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ${hoverClasses}`}
          >
            <FaFileCode
              className={`text-[36px] ${
                myTheme === "dark" ? "text-teal-400" : "text-teal-800"
              }`}
            />
            <span>{myLanguage === "eng" ? "Coding" : "Programación"}</span>
          </li>
          <li
            className={`flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ${hoverClasses}`}
          >
            <MdOutlineHistoryEdu
              className={`text-[36px] ${
                myTheme === "dark" ? "text-teal-400" : "text-teal-800"
              }`}
            />
            <span>
              {myLanguage === "eng"
                ? "Education and Mentory"
                : "Educación y Mentoría"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InterestsSection;
