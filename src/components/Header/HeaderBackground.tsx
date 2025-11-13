import React from "react";
import { useTheme } from "@/hooks/useTheme";

const HeaderBackground = () => {
  const { myTheme } = useTheme();

  return (
    <div className="absolute inset-0 overflow-hidden rounded-b-3xl">
      {/* Gradiente animado existente */}
      <div
        className={`absolute inset-0 animate-gradient-x ${
          myTheme === "dark"
            ? "bg-gradient-to-r from-cyan-900/15 via-purple-900/10 to-pink-900/15"
            : "bg-gradient-to-r from-blue-100/40 via-purple-100/30 to-pink-100/40"
        }`}
      ></div>
      
      {/* === NUEVAS ANIMACIONES 2D FUTURISTAS === */}
      
      {/* Orbitales circulares animados */}
      <div className="absolute inset-0">
        {/* Orbital grande */}
        <div className={`absolute top-1/2 left-0 w-4 h-4 rounded-full animate-orbit-large ${
          myTheme === "dark" ? "bg-cyan-400/70 shadow-glow-cyan" : "bg-blue-400/70"
        }`}></div>
        
        {/* Orbital mediano */}
        <div className={`absolute top-1/3 right-0 w-3 h-3 rounded-full animate-orbit-medium ${
          myTheme === "dark" ? "bg-purple-400/60 shadow-glow-purple" : "bg-purple-400/60"
        }`} style={{ animationDelay: '1.5s' }}></div>
        
        {/* Orbital pequeño */}
        <div className={`absolute bottom-1/4 left-0 w-2 h-2 rounded-full animate-orbit-small ${
          myTheme === "dark" ? "bg-pink-400/50 shadow-glow-pink" : "bg-pink-400/50"
        }`} style={{ animationDelay: '3s' }}></div>
      </div>

      

      {/* Rayos de energía horizontales */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 w-full h-0.5 animate-energy-beam ${
          myTheme === "dark" 
            ? "bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-glow-cyan" 
            : "bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
        }`} style={{ animationDelay: '0.5s' }}></div>
        
        <div className={`absolute bottom-1/3 w-full h-0.5 animate-energy-beam-reverse ${
          myTheme === "dark" 
            ? "bg-gradient-to-r from-transparent via-purple-400/60 to-transparent shadow-glow-purple" 
            : "bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"
        }`} style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Partículas de datos flotantes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-data-particle ${
              myTheme === "dark" 
                ? "bg-cyan-400/40 shadow-glow-cyan" 
                : "bg-blue-400/40"
            }`}
            style={{
              top: `${20 + (i * 10)}%`,
              left: `${(i * 15)}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + (i * 0.5)}s`
            }}
          ></div>
        ))}
      </div>

      {/* Efecto de scanning vertical */}
      <div className={`absolute inset-0 w-0.5 h-full animate-scan ${
        myTheme === "dark" 
          ? "bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent shadow-glow-cyan" 
          : "bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
      }`}></div>

      {/* Efecto de partículas flotantes existente */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-1/6 w-1 h-1 rounded-full ${
          myTheme === "dark" ? "bg-cyan-400/60 animate-float-slow" : "bg-blue-400/60 animate-float-slow"
        }`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full ${
          myTheme === "dark" ? "bg-purple-400/50 animate-float-medium" : "bg-purple-400/50 animate-float-medium"
        }`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 right-1/5 w-0.5 h-0.5 rounded-full ${
          myTheme === "dark" ? "bg-pink-400/40 animate-float-fast" : "bg-pink-400/40 animate-float-fast"
        }`} style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Línea de conexión animada existente */}
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 ${
          myTheme === "dark"
            ? "bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-glow-line animate-pulse-glow"
            : "bg-gradient-to-r from-transparent via-blue-400/40 to-transparent shadow-glow-line-light animate-pulse-glow"
        }`}
      ></div>
    </div>
  );
};

export default HeaderBackground;