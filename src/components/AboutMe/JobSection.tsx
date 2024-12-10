import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";

function JobSection() {
  const { myTheme } = useTheme(); // Obtén el tema actual
  const { myLanguage } = useLanguage(); // Obtén el idioma actual

  // Definir clases dinámicas para el tema y el idioma
  const themeClasses =
    myTheme === "dark"
      ? "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white"
      : "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-black";
  const hoverClasses =
    myTheme === "dark"
      ? "hover:bg-gradient-to-r from-gray-800 to-gray-700"
      : "hover:bg-gradient-to-r from-blue-200 to-purple-300";

  // Traducciones dinámicas
  const translations = {
    esp: {
      job1Title: "Desarrollador de algoritmo de machine learning",
      job1Company: "CGEDPP, Gobierno Estatal de Aguascalientes",
      job1Date: "2023 - Aguascalientes, México",
      job2Title: "Experiencia en competencias matemáticas y entrenamiento",
      job2Company: "FCFM-BUAP, Centro de Ciencias de Sinaloa, IPN",
      job2Date: "2012 - 2020 | Puebla, Sinaloa, México D.F.",
    },
    eng: {
      job1Title: "Machine Learning Algorithm Developer",
      job1Company: "CGEDPP, State Government of Aguascalientes",
      job1Date: "2023 - Aguascalientes, Mexico",
      job2Title: "Mathematics Competition Experience and Training",
      job2Company: "FCFM-BUAP, Centro de Ciencias de Sinaloa, IPN",
      job2Date: "2012 - 2020 | Puebla, Sinaloa, Mexico D.F.",
    },
  };

  const t = translations[myLanguage as "esp" | "eng"];

  return (
    <div className={`space-y-8 p-4 rounded-lg shadow-lg ${themeClasses}`}>
      {/* Primer trabajo */}
      <div
        className={`border-b pb-6 transition-transform duration-300 ${hoverClasses} rounded-lg p-4`}
      >
        <h3
          className={`text-2xl font-bold ${
            myTheme === "dark" ? "text-teal-400" : "text-teal-800"
          } hover:text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text`}
        >
          {t.job1Title}
        </h3>
        <p
          className={`text-lg p-2 rounded-md transition-all duration-300 ${
            myTheme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-teal-500 hover:to-blue-500"
              : "bg-gradient-to-r from-teal-300 to-blue-300 hover:from-teal-400 hover:to-blue-400"
          }`}
        >
          {t.job1Company}
        </p>

        <p
          className={`text-sm p-2 rounded-md transition-all duration-300 ${
            myTheme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-teal-500 hover:to-blue-500"
              : "bg-gradient-to-r from-teal-300 to-blue-300 hover:from-teal-400 hover:to-blue-400"
          }`}
        >
          {t.job1Date}
        </p>

        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li
            className={`p-2 rounded-md transition-all duration-300 ${
              myTheme === "dark"
                ? "hover:bg-gradient-to-r from-rose-700 to-pink-600"
                : "hover:bg-gradient-to-r from-green-200 to-blue-300"
            }`}
          >
            {myLanguage === "eng"
              ? "I collaborated in the development of an artificial intelligence algorithm to perform a needs assessment for the population, contributing to the formulation of data-driven public policies, as part of the public policy clinic of the Master's program at CIDE."
              : "Colaboré en el desarrollo de un algoritmo de inteligencia artificial para realizar un diagnóstico de necesidades de la población contribuyendo a la formulación de políticas públicas basadas en datos, como parte de la clínica de políticas públicas de la maestría en el CIDE."}
          </li>
        </ul>
      </div>

      {/* Segundo trabajo */}
      <div
        className={`border-b pb-6 transition-transform duration-300 ${hoverClasses} rounded-lg p-4`}
      >
        <h3
          className={`text-2xl font-bold ${
            myTheme === "dark" ? "text-teal-400" : "text-teal-800"
          } hover:text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text`}
        >
          {t.job2Title}
        </h3>
        <p
          className={`text-lg p-2 rounded-md transition-all duration-300 ${
            myTheme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-teal-500 hover:to-blue-500"
              : "bg-gradient-to-r from-teal-300 to-blue-300 hover:from-teal-400 hover:to-blue-400"
          }`}
        >
          {t.job2Company}
        </p>

        <p
          className={`text-sm p-2 rounded-md transition-all duration-300 ${
            myTheme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-teal-500 hover:to-blue-500"
              : "bg-gradient-to-r from-teal-300 to-blue-300 hover:from-teal-400 hover:to-blue-400"
          }`}
        >
          {t.job2Date}
        </p>

        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li
            className={`p-2 rounded-md transition-all duration-300 ${
              myTheme === "dark"
                ? "hover:bg-gradient-to-r from-rose-700 to-pink-600"
                : "hover:bg-gradient-to-r from-green-200 to-blue-300"
            }`}
          >
            {myLanguage === "eng"
              ? "Mathematics Olympiad coach at FCFM-BUAP (2017-2020), preparing students for the state stages of the OMM and OMMEB through teaching techniques that promote logical and creative thinking."
              : "Entrenador de olimpiadas de matemáticas en la FCFM-BUAP (2017-2020), preparando estudiantes para las etapas estatales de la OMM y OMMEB mediante técnicas didácticas que fomentan el pensamiento lógico y creativo."}
          </li>
          <li
            className={`p-2 rounded-md transition-all duration-300 ${
              myTheme === "dark"
                ? "hover:bg-gradient-to-r from-rose-700 to-pink-600"
                : "hover:bg-gradient-to-r from-green-200 to-blue-300"
            }`}
          >
            {myLanguage === "eng"
              ? "Bronze medalist in the National Mathematics Olympiad for Secondary Schools (2014) and participant in several national competitions, including the National Pierre Fermat Contest, where I received an honorable mention (5th place) in 2014."
              : "Medallista de bronce en la Olimpiada Nacional de Matemáticas para Secundarias (2014) y participante en varias competencias nacionales, incluyendo el Concurso Nacional Pierre Fermat, donde obtuve una mención honorífica (5to lugar) en 2014."}
          </li>
          <li
            className={`p-2 rounded-md transition-all duration-300 ${
              myTheme === "dark"
                ? "hover:bg-gradient-to-r from-rose-700 to-pink-600"
                : "hover:bg-gradient-to-r from-green-200 to-blue-300"
            }`}
          >
            {myLanguage === "eng"
              ? "State finalist in the Mexican Mathematics Olympiad (2012-2015), representing Puebla in the regional and national stages."
              : "Finalista estatal en la Olimpiada Mexicana de Matemáticas (2012-2015), representando a Puebla en las etapas regionales y nacionales."}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default JobSection;
