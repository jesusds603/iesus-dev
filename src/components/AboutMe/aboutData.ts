export const tabs = [
  { id: "profile", labelEn: "Profile", labelEs: "Perfil", icon: "👤" },
  { id: "experience", labelEn: "Experience", labelEs: "Experiencia", icon: "💼" },
  { id: "skills", labelEn: "Skills", labelEs: "Habilidades", icon: "⚡" },
  { id: "education", labelEn: "Education", labelEs: "Educación", icon: "🎓" },
  { id: "achievements", labelEn: "Achievements", labelEs: "Logros", icon: "🏆" },
];

export const getProfileData = (myLanguage: string) => ({
  name: "Jesús Dávila Sánchez",
  title: myLanguage === "eng" ? "Mathematician | Data Scientist | Software Developer" : "Matemático | Científico de Datos | Desarrollador de Software",
  location: "San Andrés Calpan, Puebla, México",
  email: "jesusds603@gmail.com",
  phone: "+52 227 101 5557",
  website: "iesus-dev.com",
  linkedin: "linkedin.com/in/jesus-davila-373aa2248",
  github: "github.com/jesusds603"
});

export const getExperienceData = (myLanguage: string) => [
  {
    period: "2025 -- Present",
    title: myLanguage === "eng" ? "Android Application Developer" : "Desarrollador de Aplicaciones Android",
    company: myLanguage === "eng" ? "Personal Project" : "Proyecto Personal",
    description: myLanguage === "eng" 
      ? "Designed and developed comprehensive management application using Kotlin and Jetpack Compose. Implemented MVVM architecture with Room database."
      : "Diseñé y desarrollé una aplicación de gestión integral usando Kotlin y Jetpack Compose. Implementé arquitectura MVVM con base de datos Room."
  },
  {
    period: "2024",
    title: myLanguage === "eng" ? "Full Stack Developer" : "Desarrollador Full Stack",
    company: "iesus-dev.com",
    description: myLanguage === "eng"
      ? "Developed responsive portfolio with React.js, Next.js, and Three.js. Created interactive 3D simulations and mathematical visualizations."
      : "Desarrollé portfolio responsivo con React.js, Next.js y Three.js. Creé simulaciones 3D interactivas y visualizaciones matemáticas."
  },
  {
    period: "2023",
    title: myLanguage === "eng" ? "Machine Learning Algorithm Developer" : "Desarrollador de Algoritmos ML",
    company: myLanguage === "eng" ? "State Government of Aguascalientes" : "Gobierno del Estado de Aguascalientes",
    description: myLanguage === "eng"
      ? "Collaborated in developing AI algorithms for population needs assessment. Conducted data analysis for evidence-based public policy."
      : "Colaboré en el desarrollo de algoritmos de IA para evaluación de necesidades poblacionales. Realicé análisis de datos para políticas públicas basadas en evidencia."
  }
];

export const skillsData = {
  programming: ["Python", "JavaScript", "Kotlin", "SQL", "R"],
  web: ["React", "Next.js", "Three.js", "Node.js"],
  dataScience: ["pandas", "numpy", "scikit-learn", "PySpark"],
  mobile: ["Android Studio", "Jetpack Compose"],
  tools: ["Docker", "Git", "Linux", "Excel"],
  mathematics: ["Algebra", "Analysis", "Differential Equations"]
};

export const getEducationData = (myLanguage: string) => [
  {
    period: "2023 -- 2024",
    degree: myLanguage === "eng" ? "Master's in Public Policy Analysis Methods" : "Maestría en Métodos de Análisis de Políticas Públicas",
    institution: "CIDE, Aguascalientes"
  },
  {
    period: "2016 -- 2022", 
    degree: myLanguage === "eng" ? "Bachelor's in Mathematics" : "Licenciatura en Matemáticas",
    institution: "BUAP, Puebla"
  }
];

export const getAchievementsData = (myLanguage: string) => [
  myLanguage === "eng" ? "Bronze Medal - National Mathematics Olympiad for Secondary Schools (2014)" : "Medalla de Bronce - Olimpiada Nacional de Matemáticas para Secundarias (2014)",
  myLanguage === "eng" ? "Honorable Mention - Pierre Fermat National Contest (5th national place, 2014)" : "Mención Honorífica - Concurso Nacional Pierre Fermat (5° lugar nacional, 2014)",
  myLanguage === "eng" ? "State Finalist - Mexican Mathematics Olympiad (2012-2015)" : "Finalista Estatal - Olimpiada Mexicana de Matemáticas (2012-2015)",
  myLanguage === "eng" ? "Certified Instructor - Mathematics Olympiads, FCFM-BUAP (2017-2020)" : "Instructor Certificado - Olimpiadas de Matemáticas, FCFM-BUAP (2017-2020)"
];