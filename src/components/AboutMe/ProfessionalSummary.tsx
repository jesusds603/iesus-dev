import React from "react";

interface ProfessionalSummaryProps {
  isDark: boolean;
  myLanguage: string;
}

const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({ isDark, myLanguage }) => {
  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm ${
      isDark ? "border-purple-500/30 bg-gray-800/40" : "border-purple-500/20 bg-white/60"
    }`}>
      <h4 className={`text-xl font-bold mb-3 ${
        isDark ? "text-purple-400" : "text-purple-600"
      }`}>
        {myLanguage === "eng" ? "Professional Summary" : "Resumen Profesional"}
      </h4>
      <p className={`leading-relaxed ${
        isDark ? "text-gray-300" : "text-gray-700"
      }`}>
        {myLanguage === "eng" 
          ? "Mathematician specialized in data science and software development. Experienced in quantitative analysis, application development, and mathematical modeling. Skilled in solving complex problems through logical-mathematical thinking and technological tools."
          : "Matemático especializado en ciencia de datos y desarrollo de software. Experto en análisis cuantitativo, desarrollo de aplicaciones y modelado matemático. Habilidoso en resolver problemas complejos mediante pensamiento lógico-matemático y herramientas tecnológicas."
        }
      </p>
    </div>
  );
};

export default ProfessionalSummary;