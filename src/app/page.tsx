"use client";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { menuItems } from "@/components/Sidebar/menu-items";
import AnimatedHero from "@/components/Hero/AnimatedHero";
import ProjectTree from "@/components/Projects/ProjectTree";
import AboutPanel from "@/components/AboutMe/AboutPanel";

const Home: React.FC = () => {
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();
  
  const projectsItem = menuItems.find(item => item.name === "Projects");

  return (
    <div className="min-h-screen">
      <AnimatedHero />
      
      {/* Projects Tree Section */}
      <section id="projects" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex justify-center">
          <ProjectTree 
            projects={projectsItem} 
            myLanguage={myLanguage} 
            myTheme={myTheme} 
          />
        </div>
      </section>

      {/* About Section con el nuevo panel */}
      <AboutPanel />
    </div>
  );
};

export default Home;