"use client";

import React, { createContext, useState, useContext } from "react";

interface LanguageContextType {
  myLanguage: string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [myLanguage, setMyLanguage] = useState("eng");

  const toggleLanguage = () => {
    setMyLanguage((prevLanguage) => (prevLanguage === "eng" ? "esp" : "eng"));
  };

  return (
    <LanguageContext.Provider value={{ myLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
