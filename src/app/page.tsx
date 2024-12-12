"use client"; // Asegura que el código de este archivo se ejecute del lado del cliente

import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import Card from "@/components/Card/Card";
import { subjects as rawSubjects } from "@/components/Card/subjects";
import Name from "@/components/Name3D/Name";
import Laptop from "@/components/Laptop/LaptopIndex";
import CubeMain from "@/components/Cube/CubeMain";
// import CV from "@/components/CV";

const Home: React.FC = () => {
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();

  const backgroundClass = myTheme === "dark" ? "text-white" : "text-gray-800";

  // Clases de estilo para el título y la descripción

  const subjects = rawSubjects(myLanguage, myTheme);

  return (
    <div className={`flex flex-col  min-h-screen ${backgroundClass}`}>
      <header className="grid gap-6 grid-cols-1 sm:grid-cols-2 justify-between place-items-center">
        <span
          className={`${
            myTheme === "dark"
              ? "text-teal-300 hover:text-teal-400"
              : "text-fuchsia-900 hover:text-fuchsia-800"
          } p-8 text-[100px] text-center font-bold rounded-lg hover:scale-110 shadow-lg transition-all duration-500 transform`}
        >
          <h2 className={` items-center $`}>IESUS</h2>
          <h2 className={` items-center $`}>DEV</h2>
        </span>
        <CubeMain />
      </header>

      <main className="flex flex-col items-center w-full">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full mt-4 px-10">
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
