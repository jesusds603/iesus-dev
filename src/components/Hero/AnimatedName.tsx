"use client";
import React, { useState, useEffect, useRef } from "react";

interface AnimatedNameProps {
  isDark: boolean;
}

const AnimatedName: React.FC<AnimatedNameProps> = ({ isDark }) => {
  const [animationStage, setAnimationStage] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const nameRef = useRef<HTMLDivElement>(null);

  const fullName = "IESUS\nDEV";
  const typingSpeed = 100;
  const stageDelay = 400;

  useEffect(() => {
    const startAnimations = async () => {
      // Stage 1: Typing animation
      setDisplayText("");
      
      for (let i = 0; i <= fullName.length; i++) {
        setDisplayText(fullName.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, typingSpeed));
      }
      
      setAnimationStage(1);
      
      // Stage 2: Gradient animation
      await new Promise(resolve => setTimeout(resolve, stageDelay));
      setAnimationStage(2);
      
      // Stage 3: Bounce animation
      await new Promise(resolve => setTimeout(resolve, stageDelay));
      setAnimationStage(3);
      
      // Stage 4: Final state with continuous effects
      await new Promise(resolve => setTimeout(resolve, stageDelay));
      setAnimationStage(4);
    };

    startAnimations();
  }, []);

  const getAnimationClasses = () => {
    const baseClasses = "font-black tracking-tighter bg-clip-text text-transparent";
    
    switch (animationStage) {
      case 0: // Typing
        return `${baseClasses} ${
          isDark
            ? "bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        } typing-cursor`;
      
      case 1: // Just typed
        return `${baseClasses} ${
          isDark
            ? "bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        } animate-pulse`;
      
      case 2: // Gradient flow
        return `${baseClasses} ${
          isDark
            ? "bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-flow"
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-flow"
        }`;
      
      case 3: // Bounce
        return `${baseClasses} ${
          isDark
            ? "bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-bounce-gentle"
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-bounce-gentle"
        }`;
      
      case 4: // Final with multiple effects
        return `${baseClasses} ${
          isDark
            ? "bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-flow hover:animate-float-gentle"
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-flow hover:animate-float-gentle"
        } transform transition-transform duration-500 hover:scale-105`;
      
      default:
        return baseClasses;
    }
  };

  const renderParticles = () => {
    if (animationStage < 2) return null;
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              isDark ? "bg-cyan-400/30" : "bg-blue-400/30"
            }`}
            style={{
              width: Math.random() * 8 + 2 + 'px',
              height: Math.random() * 8 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `particle-float ${Math.random() * 8 + 4}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's',
              opacity: animationStage >= 3 ? 1 : 0.5
            }}
          ></div>
        ))}
      </div>
    );
  };

  const renderGlowEffect = () => {
    if (animationStage < 3) return null;
    
    return (
      <>
        <div className={`absolute inset-0 blur-xl opacity-30 ${
          isDark 
            ? "bg-gradient-to-r from-cyan-400/40 via-purple-400/40 to-pink-400/40" 
            : "bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30"
        } rounded-lg animate-pulse-slow`}></div>
        <div className={`absolute -inset-4 blur-2xl opacity-20 ${
          isDark 
            ? "bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20" 
            : "bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15"
        } rounded-lg animate-glow`}></div>
      </>
    );
  };

  return (
    <div className="relative mb-8" ref={nameRef}>
      {/* Efectos de fondo */}
      {renderGlowEffect()}
      
      {/* Partículas flotantes */}
      {renderParticles()}
      
      {/* Nombre principal */}
      <div className="relative z-10">
        <h1 className={`text-7xl md:text-9xl font-black mb-4 leading-none whitespace-pre-line ${getAnimationClasses()}`}>
          {displayText || fullName}
        </h1>
      </div>

      {/* Efecto de reflexión (solo en etapa final) */}
      {/* // Reemplaza la parte del efecto de reflexión en AnimatedName.tsx */}
        {animationStage >= 4 && (
        <div className="absolute -inset-4 overflow-hidden pointer-events-none">
            {/* Onda de energía que se expande */}
            <div className={`absolute inset-0 rounded-full border-2 ${
            isDark ? "border-cyan-400/20" : "border-blue-400/20"
            } animate-energy-wave-1`}></div>
            <div className={`absolute inset-0 rounded-full border-2 ${
            isDark ? "border-purple-400/15" : "border-purple-400/15"
            } animate-energy-wave-2`}></div>
            <div className={`absolute inset-0 rounded-full border-2 ${
            isDark ? "border-pink-400/10" : "border-pink-400/10"
            } animate-energy-wave-3`}></div>
        </div>
        )}

        <style jsx>{`
        @keyframes energy-wave-1 {
            0% { 
            transform: scale(0.8); 
            opacity: 0.8;
            }
            100% { 
            transform: scale(1.4); 
            opacity: 0;
            }
        }
        
        @keyframes energy-wave-2 {
            0%, 33% { 
            transform: scale(0.8); 
            opacity: 0.6;
            }
            100% { 
            transform: scale(1.6); 
            opacity: 0;
            }
        }
        
        @keyframes energy-wave-3 {
            0%, 66% { 
            transform: scale(0.8); 
            opacity: 0.4;
            }
            100% { 
            transform: scale(1.8); 
            opacity: 0;
            }
        }
        
        .animate-energy-wave-1 {
            animation: energy-wave-1 3s ease-out infinite;
        }
        
        .animate-energy-wave-2 {
            animation: energy-wave-2 3s ease-out infinite;
            animation-delay: 1s;
        }
        
        .animate-energy-wave-3 {
            animation: energy-wave-3 3s ease-out infinite;
            animation-delay: 2s;
        }
        `}</style>      
    </div>
  );
};

export default AnimatedName;