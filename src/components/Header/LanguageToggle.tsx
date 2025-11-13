import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { MdLanguage } from "react-icons/md";

interface LanguageToggleProps {
  myLanguage: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ myLanguage }) => {
  const { myTheme } = useTheme();
  const { toggleLanguage } = useLanguage();
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [letters, setLetters] = useState<Array<{char: string; x: number; y: number; delay: number}>>([]);

  // Generar letras flotantes para el efecto
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const newLetters = Array.from({ length: 8 }, (_, i) => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setLetters(newLetters);
  }, []);

  const handleClick = () => {
    setIsAnimating(true);
    toggleLanguage();
    setTimeout(() => setIsAnimating(false), 800);
  };

  const isDark = myTheme === "dark";
  const currentLang = myLanguage === "eng" ? "EN" : "ES";
  const targetLang = myLanguage === "eng" ? "ES" : "EN";

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`
        relative group p-3 rounded-3xl transition-all duration-500 
        backdrop-blur-xl border-2 transform-gpu overflow-hidden
        ${isDark 
          ? "bg-gradient-to-br from-green-900/30 to-teal-900/20 border-emerald-400/40 shadow-glow-linguistic" 
          : "bg-gradient-to-br from-lime-100/40 to-cyan-100/30 border-green-400/40 shadow-glow-linguistic-light"
        }
        hover:scale-105 hover:shadow-glow-linguistic-hover
        ${isAnimating ? 'animate-language-switch' : ''}
      `}
    >
      {/* Fondo de texto global */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        {/* Letras flotantes aleatorias */}
        {letters.map((letter, i) => (
          <div
            key={i}
            className={`absolute text-xs font-mono opacity-20 animate-float-letter ${
              isDark ? "text-emerald-300" : "text-green-600"
            }`}
            style={{
              top: `${letter.y}%`,
              left: `${letter.x}%`,
              animationDelay: `${letter.delay}s`,
              animationDuration: `${8 + Math.random() * 8}s`
            }}
          >
            {letter.char}
          </div>
        ))}
        
        {/* Patrón de código binario */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute text-[8px] font-mono animate-binary-scroll ${
                isDark ? "text-cyan-300" : "text-teal-600"
              }`}
              style={{
                top: `${(i * 8)}%`,
                left: "10%",
                animationDelay: `${i * 0.5}s`
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"} {Math.random() > 0.5 ? "1" : "0"} {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>

        {/* Onda de lenguaje */}
        <div className={`absolute inset-0 rounded-3xl animate-language-wave ${
          isDark 
            ? "bg-gradient-to-r from-emerald-500/5 via-teal-500/10 to-green-500/5" 
            : "bg-gradient-to-r from-lime-300/10 via-cyan-300/15 to-green-300/10"
        }`} />
      </div>

      {/* Icono central con efecto de traducción */}
      <div className="relative z-10 flex items-center space-x-3">
        {/* Icono del planeta/lenguaje */}
        <div className={`
          relative transform transition-all duration-700
          ${isHovering ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
          ${isAnimating ? 'animate-globe-spin' : ''}
        `}>
          {/* Icono principal */}
          <div className={`
            text-2xl transition-all duration-500
            ${isDark 
              ? "text-emerald-300 drop-shadow-glow-language" 
              : "text-green-600 drop-shadow-glow-language-light"
            }
            ${isAnimating ? 'animate-translate-pulse' : ''}
          `}>
            <MdLanguage />
          </div>

          {/* Anillos de comunicación */}
          <div className={`
            absolute inset-0 rounded-full border animate-pulse-ring
            ${isDark 
              ? "border-emerald-400/40 -inset-2" 
              : "border-green-400/40 -inset-2"
            }
          `} />
          <div className={`
            absolute inset-0 rounded-full border-2 animate-pulse-ring-delayed
            ${isDark 
              ? "border-teal-400/30 -inset-4" 
              : "border-cyan-400/30 -inset-4"
            }
          `} />
        </div>

        {/* Texto del idioma con efecto de transformación */}
        <div className="relative">
          {/* Idioma actual */}
          <div className={`
            relative font-bold tracking-widest transition-all duration-500
            ${isHovering ? 'tracking-wider scale-105' : 'tracking-normal scale-100'}
            ${isDark ? "text-emerald-300" : "text-green-600"}
            ${isAnimating ? 'animate-language-flip' : ''}
          `}>
            {currentLang}
            
            {/* Efecto de desvanecimiento del idioma objetivo */}
            {isAnimating && (
              <div className={`
                absolute inset-0 animate-target-language
                ${isDark ? "text-teal-400" : "text-cyan-600"}
              `}>
                {targetLang}
              </div>
            )}
          </div>

          {/* Indicador de cambio */}
          <div className={`
            absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse-communication
            ${isDark 
              ? "bg-emerald-400 shadow-glow-emerald" 
              : "bg-green-400 shadow-glow-green"
            }
          `}>
            {/* Punto central activo */}
            <div className={`
              absolute inset-1 rounded-full animate-ping-communication
              ${isDark ? "bg-teal-300" : "bg-cyan-300"}
            `} />
          </div>
        </div>
      </div>

      {/* Partículas de traducción */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1.5 h-1.5 rounded-full animate-translation-particle
              ${isDark ? "bg-emerald-400/80" : "bg-green-400/70"}
            `}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Efecto de onda de sonido */}
      {isHovering && (
        <div className={`
          absolute inset-0 rounded-3xl animate-sound-wave
          ${isDark 
            ? "bg-emerald-400/5" 
            : "bg-green-400/5"
          }
        `} />
      )}

      {/* Efecto de traducción instantánea al hacer click */}
      {isAnimating && (
        <div className={`
          absolute inset-0 rounded-3xl animate-translation-burst
          ${isDark 
            ? "bg-teal-500/20" 
            : "bg-cyan-500/20"
          }
        `} />
      )}

      {/* Tooltip de traducción avanzado */}
      <div
        className={`
          absolute -bottom-16 left-1/2 transform -translate-x-1/2 
          px-4 py-2 rounded-xl text-sm font-bold opacity-0 
          group-hover:opacity-100 transition-all duration-500
          backdrop-blur-lg border
          ${isDark
            ? "bg-gray-900/80 text-emerald-300 border-emerald-500/30 shadow-glow-linguistic-tooltip"
            : "bg-white/90 text-green-600 border-green-400/30 shadow-lg"
          }
        `}
      >
        <div className="flex items-center space-x-2">
          <span>{currentLang}</span>
          <div className={`
            w-1 h-1 rounded-full animate-pulse
            ${isDark ? "bg-emerald-400" : "bg-green-400"}
          `} />
          <span>{myLanguage === "eng" ? "Switch to Spanish" : "Cambiar a English"}</span>
        </div>
        
        <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
          isDark ? "bg-gray-900/80" : "bg-white/90"
        }`} />
        
        {/* Efecto de onda en tooltip */}
        <div className={`
          absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent 
          transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] 
          transition-transform duration-1000
          ${isDark ? "via-emerald-400/10" : "via-green-400/10"}
        `} />
      </div>

      {/* Efecto de conexión global */}
      <div className={`
        absolute -inset-1 rounded-3xl bg-gradient-to-r from-transparent via-current to-transparent 
        opacity-15 blur-sm group-hover:opacity-30 transition-opacity duration-500
        ${isDark ? "text-emerald-400" : "text-green-400"}
      `} />
    </button>
  );
};

export default LanguageToggle;