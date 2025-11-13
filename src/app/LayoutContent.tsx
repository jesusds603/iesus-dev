"use client";
import React, { useRef, useEffect } from "react";
import { useMenu } from "@/hooks/useMenu";
import { useTheme } from "@/hooks/useTheme";
import Sidebar from "@/components/Sidebar/Sidebar";
import LayoutBackground from "./LayoutBackground";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { isMenuOpen, closeMenu } = useMenu();
  const { myTheme } = useTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const textColorClass = myTheme === "dark" ? "text-white" : "text-black";

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <div className={`flex ${textColorClass}`}>
      {/* Sidebar */}
      <div ref={sidebarRef}>
        <Sidebar />
      </div>
      
      {/* Main content */}
      <main
        className={`relative flex-1 p-1 overflow-y-auto overflow-x-clip mt-[60px] transition-all duration-300`}
      >
        <LayoutBackground />

        {/* Overlay para cuando el menú está abierto */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30"
            onClick={closeMenu}
          />
        )}

        {/* Renderizar contenido principal */}
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
};

export default LayoutContent;