"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";
import AnimatedName from "./AnimatedName";
import AnimatedDivider from "./AnimatedDivider";

const AnimatedHero: React.FC = () => {
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, 3500); // Aparece después de las animaciones del nombre

    return () => clearTimeout(timer);
  }, []);

  const isDark = myTheme === "dark";

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 relative overflow-hidden">
      {/* Fondo animado futurista */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${
          isDark 
            ? "bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/10" 
            : "bg-gradient-to-br from-blue-50 via-purple-50/40 to-cyan-50/30"
        }`}></div>
        
        {/* Partículas animadas */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${
                isDark ? "bg-cyan-400/20" : "bg-blue-400/20"
              }`}
              style={{
                width: Math.random() * 6 + 2 + 'px',
                height: Math.random() * 6 + 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: Math.random() * 5 + 's'
              }}
            ></div>
          ))}
        </div>

        {/* Efectos de grid sutil */}
        <div className={`absolute inset-0 ${
          isDark ? "bg-grid-white/[0.02]" : "bg-grid-gray-900/[0.02]"
        } bg-[size:60px_60px]`}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Nombre con animaciones espectaculares */}
        <AnimatedName isDark={isDark} />

        {/* Línea decorativa animada */}
        <AnimatedDivider isDark={isDark} />

        {/* Descripción */}
        <div className={`transform transition-all duration-1000 delay-100 ${
          isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className={`text-2xl md:text-3xl mb-12 max-w-2xl mx-auto font-light leading-relaxed ${
            isDark ? "text-gray-200" : "text-gray-700"
          }`}>
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 animate-gradient-flow">
              {myLanguage === "eng" ? "Full-Stack Developer" : "Desarrollador Full-Stack"}
            </span>
            <br />
            <span className="text-xl md:text-2xl">
              {myLanguage === "eng" ? "Mathematician | 3D Enthusiast" : "Matemático | Entusiasta del 3D"}
            </span>
          </p>

          {/* Botones animados */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="#about"
              className={`group relative px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-105 overflow-hidden ${
                isDark
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-2xl shadow-cyan-500/25"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">
                {myLanguage === "eng" ? "About Me" : "Sobre Mí"}
              </span>
            </Link>
            
            <Link 
              href="#projects"
              className={`group relative px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-105 border-2 ${
                isDark
                  ? "border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-2xl hover:shadow-cyan-400/20"
                  : "border-blue-400 text-blue-600 hover:bg-blue-400/10 hover:shadow-2xl"
              }`}
            >
              <span className="relative z-10">
                {myLanguage === "eng" ? "Explore Projects" : "Explorar Proyectos"}
              </span>
              <div className={`absolute inset-0 rounded-2xl border-2 ${
                isDark ? "border-cyan-400/30" : "border-blue-400/30"
              } animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </Link>
          </div>
        </div>

        {/* Flecha indicadora */}
        <div className={`mt-16 transform transition-all duration-1000 delay-700 ${
          isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className={`animate-bounce text-4xl ${
            isDark ? "text-cyan-400" : "text-blue-500"
          }`}>
            ↓
          </div>
          <p className={`text-sm mt-2 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            {myLanguage === "eng" ? "Scroll to explore" : "Desplaza para explorar"}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-flow {
          background-size: 200% 200%;
          animation: gradient-flow 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default AnimatedHero;