"use client";
import EducationSection from "@/components/AboutMe/EducationSection";
import HomeSection from "@/components/AboutMe/HomeSection";
import InterestsSection from "@/components/AboutMe/InterestsSection";
import JobSection from "@/components/AboutMe/JobSection";
import ReferencesSection from "@/components/AboutMe/ReferencesSection";
import Section from "@/components/AboutMe/Section";
import SkillsSection from "@/components/AboutMe/SkillsSection";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";

export default function Page() {
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
          activeSection={activeSection}
          totalSections={sections.length}
          handleNavigation={handleNavigation}
        >
          {sections[activeSection].content}
        </Section>
      </div>
    </div>
  );
}
