"use client";
import React from "react";
import { useMenu } from "@/hooks/useMenu";
import { useTheme } from "@/hooks/useTheme";
import Sidebar from "@/components/Sidebar/Sidebar";
import LayoutBackground from "./LayoutBackground";

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { isMenuOpen } = useMenu();
  const { myTheme } = useTheme();

  const textColorClass = myTheme === "dark" ? "text-white" : "text-black";

  return (
    <div className={`flex ${textColorClass}`}>
      <Sidebar />
      <main
        className={`relative flex-1 p-1 overflow-y-auto overflow-x-clip mt-[48px] ${
          isMenuOpen ? "ml-[240px] w-[calc(100vw-240px)]" : "w-full"
        } `}
      >
        <LayoutBackground />

        {/* Renderizar contenido principal */}
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
};

export default LayoutContent;
