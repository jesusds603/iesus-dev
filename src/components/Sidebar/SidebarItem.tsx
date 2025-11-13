import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import SidebarSubItem from "./SidebarSubItem";
import { useMenu } from "@/hooks/useMenu";

// Define interfaces for menu items
interface MenuItem {
  name: string;
  link: string;
  icon: React.ElementType;
  labelEn: string;
  labelEs: string;
  submenus: MenuItem[];
}

interface SidebarItemProps {
  item: MenuItem;
  myLanguage: string;
  myTheme: string;
  index: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  myLanguage,
  myTheme,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { closeMenu } = useMenu();
  const router = useRouter();

  useEffect(() => {
    setIsActive(window.location.pathname === item.link);
  }, [item.link]);

  const isDark = myTheme === "dark";
  const label = myLanguage === "eng" ? item.labelEn : item.labelEs;

  // Determinar si el item es navegable o solo desplegable
  const isNavigable = item.link !== "#" && item.submenus.length === 0;
  const isExpandable = item.submenus.length > 0;

  const baseClasses = `
    relative flex items-center py-3 px-4 rounded-2xl 
    transition-all duration-500 transform-gpu overflow-hidden
    ${isActive ? 'scale-[1.02]' : 'scale-100'}
    ${isNavigable ? 'cursor-pointer' : 'cursor-default'}
  `;

  const themeClasses = isDark
    ? `
        text-white/90 backdrop-blur-sm border border-white/10
        ${isNavigable ? 'hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-400/30 hover:shadow-glow-sidebar-item' : ''}
        ${isActive ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border-cyan-400/50 shadow-glow-sidebar-item' : ''}
      `
    : `
        text-gray-800 backdrop-blur-sm border border-gray-200/50
        ${isNavigable ? 'hover:bg-gradient-to-r hover:from-blue-500/15 hover:to-purple-500/15 hover:border-blue-400/40 hover:shadow-glow-sidebar-item-light' : ''}
        ${isActive ? 'bg-gradient-to-r from-blue-500/25 to-purple-500/25 border-blue-400/60 shadow-glow-sidebar-item-light' : ''}
      `;

  const toggleExpansion = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isExpandable) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleItemClick = (event: React.MouseEvent) => {
    if (isNavigable) {
      event.preventDefault();
      closeMenu();
      router.push(item.link);
    } else if (isExpandable) {
      toggleExpansion(event);
    }
  };

  return (
    <div 
      className="relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`${baseClasses} ${themeClasses} animate-slide-in-left`}
        onClick={handleItemClick}
      >
        {/* Icono con efecto */}
        <div className={`relative z-10 p-2 rounded-xl transition-all duration-300 ${
          isDark 
            ? 'bg-black/30 text-cyan-400' 
            : 'bg-white/50 text-blue-600'
        } ${isActive ? 'scale-110 rotate-12' : ''}`}>
          <item.icon className="text-xl" />
        </div>

        {/* Texto del label */}
        <div className="flex items-center w-full relative z-10">
          <span className="mx-3 flex-1 font-medium tracking-wide">{label}</span>
        </div>

        {/* Flecha para submenús */}
        {isExpandable && (
          <div 
            className={`relative z-10 p-1 rounded-lg transition-all duration-300 ${
              isDark ? 'bg-black/20' : 'bg-white/30'
            } ${isExpanded ? 'rotate-180 bg-cyan-500/20' : ''}`}
            onClick={toggleExpansion}
          >
            {isExpanded ? (
              <IoIosArrowDown className="text-lg" />
            ) : (
              <IoIosArrowForward className="text-lg" />
            )}
          </div>
        )}

        {/* Indicador de actividad */}
        {isActive && (
          <div
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full ${
              isDark ? 'bg-cyan-400 shadow-glow-cyan' : 'bg-blue-500 shadow-glow-blue'
            }`}
          ></div>
        )}
      </div>

      {/* Submenús con animación */}
      {isExpanded && isExpandable && (
        <div className="ml-6 mt-2 space-y-1 animate-expand">
          {item.submenus.map((submenu, subIndex) => (
            <SidebarSubItem
              key={submenu.link}
              item={submenu}
              myLanguage={myLanguage}
              myTheme={myTheme}
              index={subIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;