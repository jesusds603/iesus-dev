import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

interface MenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ isMenuOpen, toggleMenu }) => {
  const { myTheme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <button 
      onClick={toggleMenu}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`
        relative z-10 text-2xl p-3 rounded-2xl transition-all duration-500 
        backdrop-blur-lg border-2 group
        ${
          myTheme === "dark"
            ? "bg-black/30 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/25 hover:border-cyan-400/60 hover:shadow-glow-cyan-button"
            : "bg-white/40 border-blue-500/40 text-blue-600 hover:bg-blue-500/20 hover:border-blue-400/60 hover:shadow-glow-blue-button"
        }
        hover:scale-110 hover:rotate-12
        transform-gpu overflow-hidden
      `}
    >
      {/* Efecto de brillo interno */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
        myTheme === "dark" ? "via-cyan-400/20" : "via-blue-400/20"
      }`}></div>
      
      {isMenuOpen ? (
        <AiOutlineClose className="transform transition-transform duration-700 group-hover:rotate-90" />
      ) : (
        <AiOutlineMenu className="transform transition-transform duration-700 group-hover:rotate-180" />
      )}
      
      {/* Efecto de pulso sutil */}
      {isMenuOpen && (
        <div
          className={`absolute inset-0 rounded-2xl ${
            myTheme === "dark"
              ? "bg-cyan-500/15 animate-ping-slow"
              : "bg-blue-500/15 animate-ping-slow"
          }`}
        ></div>
      )}
    </button>
  );
};

export default MenuButton;