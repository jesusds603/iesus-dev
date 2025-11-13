import React from "react";
import ProfilePhoto from "./ProfilePhoto";
import ProfileInfo from "./ProfileInfo";
import ProfessionalSummary from "./ProfessionalSummary";
import SkillCategory from "./SkillCategory";

// Define interfaces for all data types
interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
}

interface ExperienceItem {
  title: string;
  period: string;
  company: string;
  description: string;
}

interface SkillsData {
  programming: string[];
  web: string[];
  dataScience: string[];
  mobile: string[];
  tools: string[];
  mathematics: string[];
}

interface EducationItem {
  degree: string;
  period: string;
  institution: string;
}

// Update function signatures with proper types
export const renderProfileContent = (
  isDark: boolean, 
  myLanguage: string, 
  profileData: ProfileData
) => (
  <div className="space-y-6">
    <div className={`p-6 rounded-2xl border backdrop-blur-sm ${
      isDark ? "border-cyan-500/30 bg-gray-800/40" : "border-blue-500/20 bg-white/60"
    }`}>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <ProfilePhoto isDark={isDark} />
        <ProfileInfo profileData={profileData} isDark={isDark} myLanguage={myLanguage} />
      </div>
    </div>
    <ProfessionalSummary isDark={isDark} myLanguage={myLanguage} />
  </div>
);

export const renderExperienceContent = (
  isDark: boolean, 
  experienceData: ExperienceItem[]
) => (
  <div className="space-y-6">
    {experienceData.map((exp, index) => (
      <div key={index} className={`p-6 rounded-2xl border backdrop-blur-sm transform transition-all duration-500 hover:scale-105 ${
        isDark ? "border-green-500/30 bg-gray-800/40" : "border-green-500/20 bg-white/60"
      }`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className={`text-xl font-bold ${
            isDark ? "text-green-400" : "text-green-600"
          }`}>
            {exp.title}
          </h3>
          <span className={`text-sm px-3 py-1 rounded-full ${
            isDark ? "bg-green-500/20 text-green-300" : "bg-green-500/10 text-green-700"
          }`}>
            {exp.period}
          </span>
        </div>
        <p className={`font-semibold mb-2 ${
          isDark ? "text-gray-200" : "text-gray-800"
          }`}>
          {exp.company}
        </p>
        <p className={`leading-relaxed ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}>
          {exp.description}
        </p>
      </div>
    ))}
  </div>
);

export const renderSkillsContent = (
  isDark: boolean, 
  myLanguage: string, 
  skillsData: SkillsData
) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <SkillCategory 
      title={myLanguage === "eng" ? "Programming" : "Programación"} 
      skills={skillsData.programming} 
      color="cyan" 
      isDark={isDark} 
    />
    <SkillCategory 
      title="Web Development" 
      skills={skillsData.web} 
      color="purple" 
      isDark={isDark} 
    />
    <SkillCategory 
      title="Data Science" 
      skills={skillsData.dataScience} 
      color="pink" 
      isDark={isDark} 
    />
    <SkillCategory 
      title={myLanguage === "eng" ? "Mobile Development" : "Desarrollo Móvil"} 
      skills={skillsData.mobile} 
      color="green" 
      isDark={isDark} 
    />
    <SkillCategory 
      title="Tools" 
      skills={skillsData.tools} 
      color="blue" 
      isDark={isDark} 
    />
    <SkillCategory 
      title={myLanguage === "eng" ? "Mathematics" : "Matemáticas"} 
      skills={skillsData.mathematics} 
      color="yellow" 
      isDark={isDark} 
    />
  </div>
);

export const renderEducationContent = (
  isDark: boolean, 
  educationData: EducationItem[]
) => (
  <div className="space-y-6">
    {educationData.map((edu, index) => (
      <div key={index} className={`p-6 rounded-2xl border backdrop-blur-sm ${
        isDark ? "border-blue-500/30 bg-gray-800/40" : "border-blue-500/20 bg-white/60"
      }`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className={`text-xl font-bold ${
            isDark ? "text-blue-400" : "text-blue-600"
          }`}>
            {edu.degree}
          </h3>
          <span className={`text-sm px-3 py-1 rounded-full ${
            isDark ? "bg-blue-500/20 text-blue-300" : "bg-blue-500/10 text-blue-700"
          }`}>
            {edu.period}
          </span>
        </div>
        <p className={`font-semibold ${
          isDark ? "text-gray-200" : "text-gray-800"
        }`}>
          {edu.institution}
        </p>
      </div>
    ))}
  </div>
);

export const renderAchievementsContent = (
  isDark: boolean, 
  achievementsData: string[]
) => (
  <div className="space-y-4">
    {achievementsData.map((achievement, index) => (
      <div key={index} className={`p-4 rounded-xl border backdrop-blur-sm transform transition-all duration-300 hover:scale-105 ${
        isDark ? "border-yellow-500/30 bg-gray-800/40" : "border-yellow-500/20 bg-white/60"
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            isDark ? "bg-yellow-500/20" : "bg-yellow-500/10"
          }`}>
            <span className="text-lg">🏆</span>
          </div>
          <p className={`flex-1 ${
            isDark ? "text-gray-200" : "text-gray-800"
          }`}>
            {achievement}
          </p>
        </div>
      </div>
    ))}
  </div>
);