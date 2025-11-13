"use client";
import React from "react";
import { useMenu } from "@/hooks/useMenu";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import HeaderBackground from "./HeaderBackground";
import MenuButton from "./MenuButton";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

const HeaderApp = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();

  return (
    <div
      className={`fixed h-[70px] z-50 top-0 left-0 w-full flex items-center justify-between px-6 backdrop-blur-xl ${
        myTheme === "dark"
          ? "bg-black/60 border-b border-cyan-500/30"
          : "bg-white/80 border-b border-blue-500/30"
      } shadow-2xl`}
    >
      <HeaderBackground />
      
      <MenuButton 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
      />
      
      <Logo closeMenu={closeMenu} />
      
      <div className="flex items-center space-x-5 relative z-10">
        <ThemeToggle />
        <LanguageToggle myLanguage={myLanguage} />
      </div>
    </div>
  );
};

export default HeaderApp;