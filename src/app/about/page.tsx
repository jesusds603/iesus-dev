"use client";
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import Section from "@/components/AboutMe/Section";
import HomeSection from "@/components/AboutMe/HomeSection";
import JobSection from "@/components/AboutMe/JobSection";
import SkillsSection from "@/components/AboutMe/SkillsSection";
import InterestsSection from "@/components/AboutMe/InterestsSection";
import EducationSection from "@/components/AboutMe/EducationSection";
import ReferencesSection from "@/components/AboutMe/ReferencesSection";

export default function page() {
  const [activeSection, setActiveSection] = useState(0);
  const { myLanguage } = useLanguage();

  const sections = [
    {
      id: "home",
      title:
        myLanguage === "eng"
          ? "Hi! I'm Jesús Dávila Sánchez"
          : "¡Hola! Soy Jesús Dávila Sánchez",
      content: <HomeSection />,
    },
    {
      id: "experiencia",
      title:
        myLanguage === "eng"
          ? "Professional experience"
          : "Experiencia Profesional",
      content: <JobSection />,
    },
    {
      id: "habilidades",
      title:
        myLanguage === "eng" ? "Informatic Skills" : "Habilidades Informáticas",
      content: <SkillsSection />,
    },
    {
      id: "interests",
      title: myLanguage === "eng" ? "Interests" : "Intereses",
      content: <InterestsSection />,
    },
    {
      id: "educacion",
      title: myLanguage === "eng" ? "Education" : "Educación",
      content: <EducationSection />,
    },
    {
      id: "referencias",
      title: myLanguage === "eng" ? "References" : "Referencias",
      content: <ReferencesSection />,
    },
  ];

  const handleNavigation = (direction: "left" | "right") => {
    if (direction === "left" && activeSection > 0) {
      setActiveSection(activeSection - 1);
    } else if (direction === "right" && activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  return (
    <div className="h-full font-sans">
      <div className="h-full flex items-center">
        <Section
          id={sections[activeSection].id}
          title={sections[activeSection].title}
          children={sections[activeSection].content}
          activeSection={activeSection}
          totalSections={sections.length}
          handleNavigation={handleNavigation}
        />
      </div>
    </div>
  );
}
