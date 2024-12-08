"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Tipos de posición y contexto
type Position = {
  x: number;
  y: number;
  z: number;
};

interface SphereContextType {
  posSphere: Position;
  updatePosSphere: (newPosSphere: Position) => void;
  timeS: number;
  updateTimeS: (newTimeS: number) => void;
}

// Crear el contexto
const SphereContext = createContext<SphereContextType | undefined>(undefined);

// Proveedor del contexto
export const SphereProvider = ({ children }: { children: ReactNode }) => {
  const [posSphere, setPosSphere] = useState<Position>({ x: 0, y: 0, z: 0 });
  const [timeS, setTimeS] = useState<number>(0);

  const updatePosSphere = (newPosSphere: Position) =>
    setPosSphere(newPosSphere);
  const updateTimeS = (newTimeS: number) => setTimeS(newTimeS);

  return (
    <SphereContext.Provider
      value={{ posSphere, updatePosSphere, timeS, updateTimeS }}
    >
      {children}
    </SphereContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useSphere = (): SphereContextType => {
  const context = useContext(SphereContext);
  if (context === undefined) {
    throw new Error("useSphere must be used within a SphereProvider");
  }
  return context;
};
