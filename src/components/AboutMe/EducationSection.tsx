import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

function EducationSection() {
  const { myLanguage } = useLanguage(); // Obtenemos el idioma actual

  return (
    <div className="space-y-8">
      {/* Maestría */}
      <div className="border-b pb-6">
        <h3 className="text-2xl font-bold text-teal-500">
          {myLanguage === "eng"
            ? "Master's in Methods for Policy Analysis (2 semesters)"
            : "Maestría en Métodos para el Análisis de Políticas Públicas (2 semestres)"}
        </h3>
        <p className="text-lg">{myLanguage === "eng" ? "CIDE" : "CIDE"}</p>
        <p className="text-sm">
          {myLanguage === "eng"
            ? "2023 – 2024 | Aguascalientes"
            : "2023 – 2024 | Aguascalientes"}
        </p>
      </div>

      {/* Licenciatura */}
      <div>
        <h3 className="text-2xl font-bold text-teal-500">
          {myLanguage === "eng"
            ? "Bachelor's in Mathematics"
            : "Licenciatura en Matemáticas"}
        </h3>
        <p className="text-lg">
          {myLanguage === "eng"
            ? "Benemérita Autonomous University of Puebla (BUAP)"
            : "Benemérita Universidad Autónoma de Puebla (BUAP)"}
        </p>
        <p className="text-sm">
          {myLanguage === "eng"
            ? "2016 – 2022 | Puebla"
            : "2016 – 2022 | Puebla"}
        </p>
      </div>
    </div>
  );
}

export default EducationSection;
