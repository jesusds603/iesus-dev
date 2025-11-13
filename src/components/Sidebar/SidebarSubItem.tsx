import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import SidebarLink from "./SidebarLink";
import { useMenu } from "@/hooks/useMenu";

interface SidebarSubItemProps {
  item: {
    name: string;
    link: string;
    icon: React.ElementType;
    labelEn: string;
    labelEs: string;
    submenus?: Array<{
      name: string;
      link: string;
      icon: React.ElementType;
      labelEn: string;
      labelEs: string;
    }>;
  };
  myLanguage: string;
  myTheme: string;
  index: number;
}

const SidebarSubItem: React.FC<SidebarSubItemProps> = ({
  item,
  myLanguage,
  myTheme,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { closeMenu } = useMenu();
  const router = useRouter();

  useEffect(() => {
    setIsActive(window.location.pathname === item.link);
  }, [item.link]);

  const isDark = myTheme === "dark";
  const label = myLanguage === "eng" ? item.labelEn : item.labelEs;

  const baseClasses = `
    relative flex items-center py-2 px-4 cursor-pointer rounded-xl 
    transition-all duration-400 transform-gpu overflow-hidden
    ${isActive ? 'scale-[1.02]' : 'scale-100'}
  `;

  const themeClasses = isDark
    ? `
        text-white/80 backdrop-blur-sm
        hover:bg-gradient-to-r hover:from-purple-500/15 hover:to-pink-500/15
        hover:shadow-glow-sidebar-subitem
        ${isActive ? 'bg-gradient-to-r from-purple-500/25 to-pink-500/25 shadow-glow-sidebar-subitem' : ''}
      `
    : `
        text-gray-700 backdrop-blur-sm
        hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10
        hover:shadow-glow-sidebar-subitem-light
        ${isActive ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-glow-sidebar-subitem-light' : ''}
      `;

  const toggleExpansion = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleLinkClick = (event: React.MouseEvent, link: string) => {
    event.preventDefault();
    closeMenu();
    router.push(link);
  };

  return (
    <div 
      className="relative"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        className={`${baseClasses} ${themeClasses} animate-slide-in-left`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icono */}
        <div className={`relative z-10 p-1.5 rounded-lg transition-all duration-300 ${
          isDark 
            ? 'bg-black/20 text-purple-400' 
            : 'bg-white/30 text-purple-600'
        } ${isActive ? 'scale-110' : ''}`}>
          <item.icon className="text-lg" />
        </div>

        {/* Texto */}
        <div 
          className="flex items-center w-full relative z-10 cursor-pointer"
          onClick={(e) => handleLinkClick(e, item.link)}
        >
          <span className="mx-3 flex-1 font-medium text-sm tracking-wide">{label}</span>
        </div>

        {/* Flecha para sub-submenús */}
        {item.submenus && item.submenus.length > 0 && (
          <div 
            className={`relative z-10 p-1 rounded transition-all duration-300 ${
              isDark ? 'bg-black/15' : 'bg-white/25'
            } ${isExpanded ? 'rotate-180 bg-purple-500/20' : ''}`}
            onClick={toggleExpansion}
          >
            {isExpanded ? (
              <IoIosArrowDown className="text-base" />
            ) : (
              <IoIosArrowForward className="text-base" />
            )}
          </div>
        )}

        {/* Indicador de actividad */}
        {isActive && (
          <div
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
              isDark ? 'bg-purple-400 shadow-glow-purple' : 'bg-purple-500'
            }`}
          ></div>
        )}
      </div>

      {/* Sub-submenús */}
      {isExpanded && item.submenus && item.submenus.length > 0 && (
        <div className="ml-6 mt-1 space-y-1 animate-expand">
          {item.submenus.map((submenu, subIndex) => (
            <SidebarLink
              key={submenu.link}
              href={submenu.link}
              icon={submenu.icon}
              labelEn={submenu.labelEn}
              labelEs={submenu.labelEs}
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

export default SidebarSubItem;