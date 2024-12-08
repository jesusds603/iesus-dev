"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Tipos
type Position = {
  x: number;
  y: number;
  z: number;
};

interface ShipContextType {
  position: Position;
  updatePosition: (newPosition: Position) => void;
}

// Crear el contexto
const ShipContext = createContext<ShipContextType | undefined>(undefined);

// Proveedor del contexto
export const ShipProvider = ({ children }: { children: ReactNode }) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0, z: 0 });

  const updatePosition = (newPosition: Position) => setPosition(newPosition);

  return (
    <ShipContext.Provider value={{ position, updatePosition }}>
      {children}
    </ShipContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useShip = (): ShipContextType => {
  const context = useContext(ShipContext);
  if (context === undefined) {
    throw new Error("useShip must be used within a ShipProvider");
  }
  return context;
};
