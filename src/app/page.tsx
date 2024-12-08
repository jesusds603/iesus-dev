"use client"; // Asegura que el código de este archivo se ejecute del lado del cliente

import React, { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import Card from "@/components/Card/Card";
import { subjects as rawSubjects } from "@/components/Card/subjects";
import Name from "@/components/Name3D/Name";
import Laptop from "@/components/Laptop/LaptopIndex";
import CV from "@/components/CV";

const Home: React.FC = () => {
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();

  const backgroundClass = myTheme === "dark" ? " text-white" : "text-gray-800";

  const subjects = rawSubjects(myLanguage);

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${backgroundClass}`}
    >
      <header className="text-center">
        <h1 className="text-4xl font-bold">IesusDev</h1>
        <p className="text-lg mt-2">
          {myLanguage === "eng" ? "My Personal Web" : "Mi Web Personal"}
        </p>
        {/* <Boxes /> Aquí se renderiza el componente Boxes */}
        {/* <button
          onClick={() =>
            setColorBox((prev) => (prev === "#f44cec" ? "#07c5cb" : "#f44cec"))
          }
        >
          +
        </button> */}
      </header>

      <main className="flex flex-col items-center w-full">
        <div className="flex flex-col md:flex-row w-full max-w-4xl">
          <Laptop />
          <Name />
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full max-w-4xl mt-4">
          {subjects.map((subject, index) => (
            <Card
              key={index}
              title={subject.title}
              description={subject.description}
              gradientColor={subject.gradientColor}
              link={subject.link}
            />
          ))}
        </div>

        <CV />
      </main>
    </div>
  );
};

export default Home;
