"use client";

import React, { createContext, useState, useContext } from "react";

// Tipo de contexto actualizado para usar "myTheme" con valores 'dark' o 'light'
interface ThemeContextType {
  myTheme: "dark" | "light";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook useTheme actualizado
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Componente ThemeProvider actualizado
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Inicializamos el estado con "dark" por defecto
  const [myTheme, setMyTheme] = useState<"dark" | "light">("dark");

  // Función para alternar entre los temas
  const toggleTheme = () => {
    setMyTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ myTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
