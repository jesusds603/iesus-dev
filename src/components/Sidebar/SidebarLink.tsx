import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMenu } from "@/hooks/useMenu";

const SidebarLink = ({
  href,
  icon: Icon,
  labelEn,
  labelEs,
  myLanguage,
  myTheme,
  index,
}: {
  href: string;
  icon: React.ElementType;
  labelEn: string;
  labelEs: string;
  myLanguage: string;
  myTheme: string;
  index: number;
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { closeMenu } = useMenu();
  const router = useRouter();

  useEffect(() => {
    setIsActive(window.location.pathname === href);
  }, [href]);

  const isDark = myTheme === "dark";
  const label = myLanguage === "eng" ? labelEn : labelEs;

  const baseClasses = `
    relative flex items-center py-1.5 px-4 cursor-pointer rounded-lg 
    transition-all duration-300 transform-gpu overflow-hidden
    ${isActive ? 'scale-[1.02]' : 'scale-100'}
  `;

  const themeClasses = isDark
    ? `
        text-white/70
        hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-rose-500/10
        hover:text-pink-300
        ${isActive ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-300' : ''}
      `
    : `
        text-gray-600
        hover:bg-gradient-to-r hover:from-pink-500/8 hover:to-rose-500/8
        hover:text-pink-600
        ${isActive ? 'bg-gradient-to-r from-pink-500/15 to-rose-500/15 text-pink-600' : ''}
      `;

  const handleLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    closeMenu();
    router.push(href);
  };

  return (
    <div 
      className="relative"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div
        className={`${baseClasses} ${themeClasses} animate-slide-in-left`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLinkClick}
      >
        {/* Icono */}
        <div className={`relative z-10 p-1 rounded transition-all duration-300 ${
          isDark 
            ? 'bg-black/15 text-pink-400' 
            : 'bg-white/20 text-pink-500'
        } ${isActive ? 'scale-110' : ''}`}>
          <Icon className="text-base" />
        </div>

        {/* Texto */}
        <div className="flex items-center w-full relative z-10">
          <span className="mx-3 flex-1 font-medium text-xs tracking-wide">{label}</span>
        </div>

        {/* Indicador de actividad */}
        {isActive && (
          <div
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-1 h-1 rounded-full ${
              isDark ? 'bg-pink-400' : 'bg-pink-500'
            }`}
          ></div>
        )}
      </div>
    </div>
  );
};

export default SidebarLink;