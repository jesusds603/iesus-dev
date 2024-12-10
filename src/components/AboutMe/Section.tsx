import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Section = ({
  id,
  title,
  children,
  activeSection,
  totalSections,
  handleNavigation,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  activeSection: number;
  totalSections: number;
  handleNavigation: (direction: "left" | "right") => void;
}) => (
  <section
    id={id}
    className="relative flex items-center justify-center h-[calc(100vh-64px)] w-full p-8 text-center border border-teal-400"
  >
    {/* Botón Izquierda */}
    {activeSection > 0 && (
      <button
        onClick={() => handleNavigation("left")}
        className="absolute left-4 p-2 rounded-full bg-gradient-to-r from-gray-900 via-blue-800 to-blue-700 text-white hover:bg-teal-600"
      >
        <FaArrowLeft size={64} />
      </button>
    )}

    {/* Contenido Desplazable */}
    <div className="w-full sm:w-[90%] h-full overflow-y-auto p-4">
      <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        {title}
      </h2>
      <div className="text-left">{children}</div>
    </div>

    {/* Botón Derecha */}
    {activeSection < totalSections - 1 && (
      <button
        onClick={() => handleNavigation("right")}
        className="absolute right-4 p-2 rounded-full bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 text-white hover:bg-teal-600"
      >
        <FaArrowRight size={64} />
      </button>
    )}
  </section>
);

export default Section;
