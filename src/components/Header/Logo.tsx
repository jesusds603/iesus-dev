import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";

interface LogoProps {
  closeMenu: () => void;
}

const Logo: React.FC<LogoProps> = ({ closeMenu }) => {
  const { myTheme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      href={"/"}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`
        relative z-10 text-3xl font-bold tracking-widest transition-all duration-700
        group transform-gpu
        ${
          myTheme === "dark"
            ? "text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text hover:from-cyan-300 hover:via-purple-300 hover:to-pink-300"
            : "text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text hover:from-blue-500 hover:via-purple-500 hover:to-pink-500"
        }
        hover:scale-110 hover:tracking-wider
      `}
      onClick={closeMenu}
    >
      IesusDev
      
      {/* Efecto de subrayado animado */}
      <div
        className={`absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-700 ${
          myTheme === "dark" ? "shadow-glow-cyan" : "shadow-glow-blue"
        } ${isHovering ? 'w-full' : 'w-0'}`}
      ></div>
      
      {/* Efecto de partículas alrededor del logo */}
      <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-cyan-400/60 group-hover:scale-150 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
      <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-purple-400/60 group-hover:scale-150 transition-transform duration-300 opacity-0 group-hover:opacity-100" style={{ transitionDelay: '100ms' }}></div>
    </Link>
  );
};

export default Logo;