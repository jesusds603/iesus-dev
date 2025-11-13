"use client";
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import Card from "@/components/Card/Card";
import { subjects as rawSubjects } from "@/components/Card/subjects";
import Link from "next/link";

const Home: React.FC = () => {
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();

  const backgroundClass = myTheme === "dark" ? "text-white" : "text-gray-800";
  const subjects = rawSubjects(myLanguage, myTheme);

  return (
    <div className={`flex flex-col min-h-screen ${backgroundClass}`}>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-6xl md:text-8xl font-bold mb-6 tracking-tight ${
            myTheme === "dark" 
              ? "text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text" 
              : "text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text"
          }`}>
            IESUS DEV
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${
            myTheme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            {myLanguage === "eng" 
              ? "Full-Stack Developer | Mathematician | 3D Enthusiast" 
              : "Desarrollador Full-Stack | Matemático | Entusiasta del 3D"
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/animations"
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                myTheme === "dark"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-glow-cyan-button"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              }`}
            >
              {myLanguage === "eng" ? "View Animations" : "Ver Animaciones"}
            </Link>
            
            <Link 
              href="/projects"
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 border-2 ${
                myTheme === "dark"
                  ? "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                  : "border-blue-400 text-blue-600 hover:bg-blue-400/10"
              }`}
            >
              {myLanguage === "eng" ? "My Projects" : "Mis Proyectos"}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Technologies Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 ${
            myTheme === "dark" ? "text-cyan-400" : "text-blue-600"
          }`}>
            {myLanguage === "eng" ? "Technologies & Skills" : "Tecnologías & Habilidades"}
          </h2>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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
        </div>
      </section>

      {/* About Section */}
      <section className={`py-16 px-6 ${
        myTheme === "dark" ? "bg-gray-900/50" : "bg-gray-100/50"
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-8 ${
            myTheme === "dark" ? "text-purple-400" : "text-purple-600"
          }`}>
            {myLanguage === "eng" ? "About Me" : "Sobre Mí"}
          </h2>
          
          <div className={`text-lg leading-relaxed space-y-4 ${
            myTheme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            <p>
              {myLanguage === "eng" 
                ? "I'm a passionate Full-Stack Developer with a strong background in Mathematics. I specialize in creating modern web applications using cutting-edge technologies like Next.js, React, Three.js, and more."
                : "Soy un Desarrollador Full-Stack apasionado con una sólida formación en Matemáticas. Me especializo en crear aplicaciones web modernas usando tecnologías de vanguardia como Next.js, React, Three.js y más."
              }
            </p>
            
            <p>
              {myLanguage === "eng"
                ? "My unique combination of mathematical thinking and development skills allows me to solve complex problems and create efficient, scalable solutions."
                : "Mi combinación única de pensamiento matemático y habilidades de desarrollo me permite resolver problemas complejos y crear soluciones eficientes y escalables."
              }
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link 
              href="/contact"
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                myTheme === "dark"
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-pink-400 text-white hover:bg-pink-500"
              }`}
            >
              {myLanguage === "eng" ? "Get In Touch" : "Contáctame"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;