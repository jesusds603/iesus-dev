import React from "react";
import Image from "next/image";

interface ProfilePhotoProps {
  isDark: boolean;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ isDark }) => {
  return (
    <div className="flex-shrink-0 relative group">
      {/* Marco ovalado con efecto de brillo */}
      <div className={`relative w-48 h-60 rounded-[50%] overflow-hidden ${
        isDark 
          ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20" 
          : "bg-gradient-to-br from-blue-500/10 to-purple-500/10"
      } p-1 shadow-2xl`}>
        {/* Efecto de borde animado */}
        <div className={`absolute inset-0 rounded-[50%] border-2 ${
          isDark ? "border-cyan-400/40" : "border-blue-400/30"
        } animate-pulse opacity-60`}></div>
        
        {/* Contenedor ovalado para la imagen */}
        <div className="w-full h-full rounded-[50%] overflow-hidden relative">
          <Image
            src="/miFoto.jpeg"
            alt="Jesús Dávila Sánchez"
            width={192}
            height={240}
            className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110"
            priority
          />
          
          {/* Overlay de gradiente */}
          <div className={`absolute inset-0 rounded-[50%] bg-gradient-to-t ${
            isDark 
              ? "from-gray-900/30 to-transparent" 
              : "from-white/20 to-transparent"
          }`}></div>
        </div>
      </div>
      
      {/* Efecto de partículas alrededor de la foto */}
      <div className="absolute -inset-4 rounded-[50%] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              isDark ? "bg-cyan-400/20" : "bg-blue-400/20"
            }`}
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `orbit ${Math.random() * 10 + 5}s linear infinite`,
              animationDelay: Math.random() * 3 + 's'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePhoto;