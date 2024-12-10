"use client";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { subjects as rawSubjects } from "@/components/Card/subjects";
import Card from "@/components/Card/Card";

function page() {
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();
  const subjects = rawSubjects(myLanguage, myTheme);

  // Filtramos los subjects para que solo contengan los títulos deseados
  const filteredSubjects = subjects.filter((subject) => {
    const titles = ["Collatz", "Prime Numbers", "Números Primos"];
    return titles.includes(subject.title);
  });

  return (
    <div className={`flex flex-col items-center min-h-[calc(100vh-64px)]`}>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2   xl:grid-cols-3 w-full mt-4 px-10">
        {filteredSubjects.map((subject, index) => (
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
    </div>
  );
}

export default page;
