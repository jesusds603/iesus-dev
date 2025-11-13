"use client";
import React, { useState, useEffect } from "react";

interface AnimatedDividerProps {
  isDark: boolean;
}

const AnimatedDivider: React.FC<AnimatedDividerProps> = ({ isDark }) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 2500); // Aparece después de que termine la animación del nombre

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-32 h-1 mx-auto mb-8 rounded-full overflow-hidden transform transition-all duration-1000 ${
      isAnimated ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
    }`}>
      {/* Línea principal */}
      <div className={`w-full h-full ${
        isDark 
          ? "bg-gradient-to-r from-cyan-400 to-purple-400" 
          : "bg-gradient-to-r from-blue-500 to-purple-500"
      } animate-pulse`}></div>
      
      {/* Efecto de brillo que se mueve */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-sweep ${
        isDark ? "opacity-30" : "opacity-50"
      }`}></div>

      <style jsx>{`
        @keyframes sweep {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-sweep {
          animation: sweep 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedDivider;