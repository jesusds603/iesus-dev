import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { myTheme, toggleTheme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number; delay: number}>>([]);

  // Generar partículas para el efecto
  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const handleClick = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const isDark = myTheme === "dark";

  return (
    <button 
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`
        relative group p-3 rounded-3xl transition-all duration-500 
        backdrop-blur-xl border-2 transform-gpu overflow-hidden
        ${isDark 
          ? "bg-gradient-to-br from-purple-900/30 to-cyan-900/20 border-cyan-400/40 shadow-glow-cyber" 
          : "bg-gradient-to-br from-pink-100/40 to-blue-100/30 border-blue-400/40 shadow-glow-cyber-light"
        }
        hover:scale-105 hover:shadow-glow-cyber-hover
        ${isAnimating ? 'animate-theme-switch' : ''}
      `}
    >
      {/* Fondo de universo/espacio */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        {/* Estrellas parpadeantes */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-twinkle ${
              isDark ? "bg-white/60" : "bg-blue-400/40"
            }`}
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
        
        {/* Nebulosa animada */}
        <div className={`absolute inset-0 rounded-3xl animate-nebula ${
          isDark 
            ? "bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-pink-500/10" 
            : "bg-gradient-to-br from-pink-300/20 via-blue-300/15 to-purple-300/20"
        }`} />
      </div>

      {/* Partículas orbitales */}
      <div className="absolute inset-0 rounded-3xl">
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`absolute w-1 h-1 rounded-full animate-orbit-particle ${
              isDark ? "bg-cyan-400/70" : "bg-blue-400/60"
            }`}
            style={{
              top: `${particle.y}%`,
              left: `${particle.x}%`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Icono central con efecto de transformación */}
      <div className="relative z-10">
        {/* Sol/Luna principal */}
        <div className={`
          relative transform transition-all duration-700
          ${isHovering ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
          ${isAnimating ? 'animate-celestial-transform' : ''}
        `}>
          {/* Icono principal */}
          <div className={`
            text-2xl transition-all duration-500
            ${isDark 
              ? "text-yellow-300 drop-shadow-glow-sun" 
              : "text-blue-600 drop-shadow-glow-moon"
            }
            ${isAnimating ? 'animate-pulse-rapid' : ''}
          `}>
            {isDark ? (
              // Sol con rayos
              <div className="relative">
                <div className="animate-spin-slow">☀️</div>
                <div className="absolute inset-0 animate-ping-sun">☀️</div>
              </div>
            ) : (
              // Luna con fases
              <div className="relative">
                <div className="animate-float-gentle">🌙</div>
                <div className="absolute inset-0 opacity-30 animate-pulse-moon">🌙</div>
              </div>
            )}
          </div>

          {/* Anillos orbitales */}
          <div className={`
            absolute inset-0 rounded-full border-2 animate-spin-slow
            ${isDark 
              ? "border-yellow-400/30 -inset-2" 
              : "border-blue-400/30 -inset-3"
            }
          `} />
          <div className={`
            absolute inset-0 rounded-full border animate-spin-slow-reverse
            ${isDark 
              ? "border-cyan-400/40 -inset-4" 
              : "border-purple-400/40 -inset-5"
            }
          `} />
        </div>

        {/* Partículas de energía */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1.5 h-1.5 rounded-full animate-energy-pulse
                ${isDark ? "bg-yellow-400/80" : "bg-blue-400/70"}
              `}
              style={{
                top: `${Math.cos(i * 60 * Math.PI / 180) * 20 + 50}%`,
                left: `${Math.sin(i * 60 * Math.PI / 180) * 20 + 50}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Efecto de pulso al hacer hover */}
      {isHovering && (
        <div className={`
          absolute inset-0 rounded-3xl animate-pulse-soft
          ${isDark 
            ? "bg-yellow-400/10" 
            : "bg-blue-400/10"
          }
        `} />
      )}

      {/* Efecto de onda al hacer click */}
      {isAnimating && (
        <div className={`
          absolute inset-0 rounded-3xl animate-ripple
          ${isDark 
            ? "bg-cyan-500/30" 
            : "bg-purple-500/30"
          }
        `} />
      )}

      {/* Tooltip futurista */}
      <div
        className={`
          absolute -bottom-14 left-1/2 transform -translate-x-1/2 
          px-4 py-2 rounded-xl text-sm font-bold opacity-0 
          group-hover:opacity-100 transition-all duration-500
          backdrop-blur-lg border
          ${isDark
            ? "bg-gray-900/80 text-cyan-300 border-cyan-500/30 shadow-glow-cyber-tooltip"
            : "bg-white/90 text-blue-600 border-blue-400/30 shadow-lg"
          }
        `}
      >
        {isDark ? "Activar Luz" : "Activar Oscuro"}
        <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
          isDark ? "bg-gray-900/80" : "bg-white/90"
        }`} />
        
        {/* Efecto de scanning en tooltip */}
        <div className={`
          absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent 
          transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] 
          transition-transform duration-1000
          ${isDark ? "via-cyan-400/10" : "via-blue-400/10"}
        `} />
      </div>

      {/* Efecto de conexión energética */}
      <div className={`
        absolute -inset-1 rounded-3xl bg-gradient-to-r from-transparent via-current to-transparent 
        opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-500
        ${isDark ? "text-cyan-400" : "text-blue-400"}
      `} />
    </button>
  );
};

export default ThemeToggle;