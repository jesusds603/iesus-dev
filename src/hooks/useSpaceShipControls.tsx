"use client";
import React, { createContext, useContext, useState } from "react";

export type KeysPressed = { [key: string]: boolean };

interface SpaceShipControlsContextType {
  keysPressed: KeysPressed;
  updateKey: (key: string, pressed: boolean) => void;
}

const SpaceShipControlsContext = createContext<SpaceShipControlsContextType | null>(null);

export function SpaceShipControlsProvider({ children }: { children: React.ReactNode }) {
  const [keysPressed, setKeysPressed] = useState<KeysPressed>({});

  // Función para actualizar el estado desde componentes externos
  const updateKey = (key: string, pressed: boolean) => {
    setKeysPressed(prev => ({ ...prev, [key]: pressed }));
  };

  // Listeners de teclado
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeysPressed((prev) => ({ ...prev, [event.key]: true }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeysPressed((prev) => ({ ...prev, [event.key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <SpaceShipControlsContext.Provider value={{ keysPressed, updateKey }}>
      {children}
    </SpaceShipControlsContext.Provider>
  );
}

export function useSpaceShipControls() {
  const context = useContext(SpaceShipControlsContext);
  if (!context) {
    throw new Error("useSpaceShipControls debe usarse dentro de SpaceShipControlsProvider");
  }
  return context;
}