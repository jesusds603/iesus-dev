"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { tabs, getProfileData, getExperienceData, skillsData, getEducationData, getAchievementsData } from "./aboutData";
import { renderProfileContent, renderExperienceContent, renderSkillsContent, renderEducationContent, renderAchievementsContent } from "./renderFunctions";

const AboutPanel: React.FC = () => {
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isDark = myTheme === "dark";

  // Obtener datos dinámicos basados en el idioma
  const profileData = getProfileData(myLanguage);
  const experienceData = getExperienceData(myLanguage);
  const educationData = getEducationData(myLanguage);
  const achievementsData = getAchievementsData(myLanguage);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileContent(isDark, myLanguage, profileData);
      case "experience":
        return renderExperienceContent(isDark, experienceData);
      case "skills":
        return renderSkillsContent(isDark, myLanguage, skillsData);
      case "education":
        return renderEducationContent(isDark, educationData);
      case "achievements":
        return renderAchievementsContent(isDark, achievementsData);
      default:
        return null;
    }
  };

  return (
    <section id="about" className={`py-20 px-6 ${
      isDark 
        ? "bg-gradient-to-br from-purple-900/20 to-cyan-900/20" 
        : "bg-gradient-to-br from-purple-50 to-cyan-50"
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className={`text-5xl font-bold mb-4 bg-clip-text text-transparent ${
            isDark 
              ? "bg-gradient-to-r from-purple-400 to-pink-400" 
              : "bg-gradient-to-r from-purple-600 to-pink-600"
          }`}>
            {myLanguage === "eng" ? "About Me" : "Sobre Mí"}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}>
            {myLanguage === "eng" 
              ? "Discover my journey, skills, and achievements in technology and mathematics"
              : "Descubre mi trayectoria, habilidades y logros en tecnología y matemáticas"
            }
          </p>
        </div>

        <div className={`bg-gradient-to-br backdrop-blur-sm rounded-3xl border ${
          isDark 
            ? "from-gray-800/60 to-gray-900/60 border-cyan-500/20 shadow-2xl shadow-cyan-500/10"
            : "from-white/80 to-blue-50/80 border-blue-500/20 shadow-2xl"
        } overflow-hidden`}>
          {/* Tabs Navigation */}
          <div className={`border-b ${
            isDark ? "border-cyan-500/20" : "border-blue-500/20"
          }`}>
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-8 py-6 font-semibold transition-all duration-500 flex-shrink-0 ${
                    activeTab === tab.id
                      ? isDark
                        ? "bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400"
                        : "bg-blue-500/20 text-blue-600 border-b-2 border-blue-500"
                      : isDark
                        ? "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                        : "text-gray-600 hover:text-blue-500 hover:bg-blue-500/10"
                  }`}
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <span>{myLanguage === "eng" ? tab.labelEn : tab.labelEs}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            <div className="transform transition-all duration-500">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPanel;