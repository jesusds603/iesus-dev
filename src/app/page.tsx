"use client"; // Asegura que el código de este archivo se ejecute del lado del cliente

import React from "react";
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

  const backgroundClass = myTheme === "dark" ? "text-white" : "text-gray-800";

  // Clases de estilo para el título y la descripción
  const headingClass =
    myTheme === "dark"
      ? "text-yellow-400 shadow-lg hover:text-yellow-500 transition-all duration-500 transform hover:scale-110"
      : "text-blue-600 shadow-lg hover:text-blue-500 transition-all duration-500 transform hover:scale-110";
  const descriptionClass =
    myTheme === "dark"
      ? "text-gray-300 hover:text-gray-100 transition-all duration-500"
      : "text-gray-700 hover:text-gray-500 transition-all duration-500";

  const subjects = rawSubjects(myLanguage, myTheme);

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${backgroundClass}`}
    >
      <header className="text-center">
        <h1 className={`text-4xl font-bold ${headingClass}`}>IesusDev</h1>
        <p className={`text-lg mt-2 ${descriptionClass}`}>
          {myLanguage === "eng" ? "My Personal Web" : "Mi Web Personal"}
        </p>
      </header>

      <main className="flex flex-col items-center w-full">
        <div className="flex flex-col md:flex-row w-full px-10">
          <Laptop />
          <Name />
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2   xl:grid-cols-3 w-full mt-4 px-10">
          {subjects.map((subject, index) => (
            <Card
              key={index}
              title={subject.title}
              description={subject.description}
              gradientColor={subject.gradientColor}
              link={subject.link}
              imageUrl={subject.imageUrl}
            />
          ))}
        </div>

        {/* <CV /> */}
      </main>
    </div>
  );
};

export default Home;
