"use client";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import CubeMain from "@/components/Cube/CubeMain";
import Laptop from "@/components/Laptop/Laptop";
import Name from "@/components/Name3D/Name";
import Link from "next/link";

const AnimationsPage: React.FC = () => {
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();

  const backgroundClass = myTheme === "dark" ? "text-white bg-gray-900" : "text-gray-800 bg-white";

  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <Link 
          href="/"
          className={`inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-all duration-300 ${
            myTheme === "dark" 
              ? "text-cyan-400 hover:bg-cyan-400/10" 
              : "text-blue-600 hover:bg-blue-400/10"
          }`}
        >
          <span>←</span>
          {myLanguage === "eng" ? "Back to Home" : "Volver al Inicio"}
        </Link>

        <h1 className={`text-5xl md:text-6xl font-bold text-center mb-4 ${
          myTheme === "dark" 
            ? "text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text" 
            : "text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text"
        }`}>
          {myLanguage === "eng" ? "3D Animations" : "Animaciones 3D"}
        </h1>
        
        <p className={`text-xl text-center max-w-2xl mx-auto mb-12 ${
          myTheme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>
          {myLanguage === "eng" 
            ? "Explore my interactive 3D creations and animations built with Three.js and React Three Fiber"
            : "Explora mis creaciones 3D interactivas y animaciones construidas con Three.js y React Three Fiber"
          }
        </p>
      </div>

      {/* Animations Grid */}
      <div className="container mx-auto px-6 pb-16">
        {/* Cube Animation Section */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold mb-6 text-center ${
            myTheme === "dark" ? "text-cyan-400" : "text-blue-600"
          }`}>
            {myLanguage === "eng" ? "Interactive Cube" : "Cubo Interactivo"}
          </h2>
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 shadow-2xl">
            <CubeMain />
          </div>
        </section>

        {/* Laptop and Name Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Laptop Animation */}
          <section>
            <h2 className={`text-3xl font-bold mb-6 text-center ${
              myTheme === "dark" ? "text-purple-400" : "text-purple-600"
            }`}>
              {myLanguage === "eng" ? "Animated Laptop" : "Laptop Animada"}
            </h2>
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-3xl p-6 shadow-2xl h-full">
              <Laptop />
            </div>
          </section>

          {/* 3D Name Animation */}
          <section>
            <h2 className={`text-3xl font-bold mb-6 text-center ${
              myTheme === "dark" ? "text-pink-400" : "text-pink-600"
            }`}>
              {myLanguage === "eng" ? "3D Name" : "Nombre 3D"}
            </h2>
            <div className="bg-gradient-to-br from-pink-900/30 to-cyan-900/30 rounded-3xl p-6 shadow-2xl h-full">
              <Name />
            </div>
          </section>
        </div>

        {/* Description Section */}
        <section className={`max-w-4xl mx-auto text-center p-8 rounded-3xl ${
          myTheme === "dark" ? "bg-gray-800/50" : "bg-gray-100/50"
        }`}>
          <h3 className={`text-2xl font-bold mb-4 ${
            myTheme === "dark" ? "text-green-400" : "text-green-600"
          }`}>
            {myLanguage === "eng" ? "About These Animations" : "Sobre Estas Animaciones"}
          </h3>
          
          <div className={`text-lg leading-relaxed space-y-4 ${
            myTheme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            <p>
              {myLanguage === "eng"
                ? "These 3D animations showcase my skills in modern web technologies, 3D graphics, and interactive user experiences. Each animation is built with performance and visual appeal in mind."
                : "Estas animaciones 3D muestran mis habilidades en tecnologías web modernas, gráficos 3D y experiencias de usuario interactivas. Cada animación está construida pensando en el rendimiento y el atractivo visual."
              }
            </p>
            
            <p>
              {myLanguage === "eng"
                ? "Built with React Three Fiber, Three.js, and custom shaders, these projects demonstrate the power of combining mathematics with creative coding."
                : "Construidas con React Three Fiber, Three.js y shaders personalizados, estos proyectos demuestran el poder de combinar matemáticas con programación creativa."
              }
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnimationsPage;