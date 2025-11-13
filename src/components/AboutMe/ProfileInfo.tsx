import React from "react";
import ContactItem from "./ContactItem";

// Define a proper type for profileData instead of using 'any'
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

interface ProfileInfoProps {
  profileData: ProfileData;
  isDark: boolean;
  myLanguage: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData, isDark }) => {
  return (
    <div className="flex-1 text-center lg:text-left">
      <h3 className={`text-3xl font-bold mb-3 bg-clip-text text-transparent ${
        isDark
          ? "bg-gradient-to-r from-cyan-400 to-purple-400"
          : "bg-gradient-to-r from-blue-600 to-purple-600"
      }`}>
        {profileData.name}
      </h3>
      
      <p className={`text-xl mb-6 font-medium ${
        isDark ? "text-cyan-300" : "text-blue-600"
      }`}>
        {profileData.title}
      </p>

      {/* Línea decorativa */}
      <div className={`w-20 h-1 rounded-full mx-auto lg:mx-0 mb-6 ${
        isDark 
          ? "bg-gradient-to-r from-cyan-400 to-purple-400" 
          : "bg-gradient-to-r from-blue-500 to-purple-500"
      }`}></div>

      {/* Información de contacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContactItem icon="📍" text={profileData.location} isDark={isDark} />
        <ContactItem icon="📧" text={profileData.email} isDark={isDark} />
        <ContactItem icon="📱" text={profileData.phone} isDark={isDark} />
        <ContactItem icon="🌐" text={profileData.website} isDark={isDark} />
        <ContactItem icon="💼" text={profileData.linkedin} isDark={isDark} />
        <ContactItem icon="⚡" text={profileData.github} isDark={isDark} />
      </div>
    </div>
  );
};

export default ProfileInfo;