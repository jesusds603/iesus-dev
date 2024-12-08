// pages/cv.tsx
import React from "react";

export default function CV() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-6 mt-4">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-700 p-6 flex items-center">
          <img
            src="/miFoto.jpeg"
            alt="Jesús Dávila Sánchez"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-500"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-white">
              Jesús Dávila Sánchez
            </h1>
            <p className="text-lg text-gray-300">MATEMÁTICO PURO</p>
            <div className="mt-2 flex space-x-4">
              <a
                href="mailto:jesusds603@gmail.com"
                className="hover:text-blue-400"
              >
                📧 jesusds603@gmail.com
              </a>
              <a
                href="https://github.com/jesusds603"
                className="hover:text-blue-400"
              >
                🐱 Github
              </a>
              <a
                href="https://www.linkedin.com/in/jesus-davila-373aa2248/"
                className="hover:text-blue-400"
              >
                🔗 LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Experiencia */}
          <Section title="Experiencia">
            <Job
              title="Desarrollador de algoritmo de machine learning"
              company="CGEDPP, Gobierno Estatal de Aguascalientes"
              year="2023"
              location="Aguascalientes, México"
              description="Colaboré en el desarrollo de un algoritmo de inteligencia artificial para realizar un diagnóstico de necesidades de la población, contribuyendo a la formulación de políticas públicas basadas en datos, como parte de la clínica de políticas públicas de la maestría en el CIDE."
            />
            <Job
              title="Entrenador y Competidor en Matemáticas"
              company="FCFM-BUAP, IPN, Centro de Ciencias de Sinaloa"
              year="2012 - 2020"
              location="Puebla, México"
              description="Entrenador de olimpiadas matemáticas y medallista en competencias nacionales, como la Olimpiada Nacional de Matemáticas para Secundarias y el Concurso Pierre Fermat."
            />
          </Section>

          {/* Informática */}
          <Section title="Habilidades Informáticas">
            <Skill
              skill="Desarrollo Web"
              details="HTML, CSS, JavaScript, Node.js, React, Next.js, ThreeJs"
            />
            <Skill
              skill="Programación Python"
              details="Análisis de datos con numpy, pandas, sklearn, etc."
            />
            <Skill
              skill="Bases de Datos"
              details="SQL (Postgre), Excel, Supabase, PySpark"
            />
            <Skill
              skill="Linux y LaTeX"
              details="Uso avanzado y configuración de sistemas"
            />
          </Section>

          {/* Educación */}
          <Section title="Educación">
            <Education
              degree="Maestría en Métodos para el Análisis de Políticas Públicas"
              institution="CIDE"
              year="2023 - 2024"
              location="Aguascalientes"
            />
            <Education
              degree="Licenciatura en Matemáticas"
              institution="Benemérita Universidad Autónoma de Puebla (BUAP)"
              year="2016 - 2022"
              location="Puebla"
            />
          </Section>

          {/* Intereses */}
          <Section title="Intereses">
            <ul className="list-disc list-inside">
              <li>Matemáticas</li>
              <li>Políticas Públicas</li>
              <li>Programación y desarrollo de aplicaciones</li>
              <li>Análisis de Datos</li>
              <li>Blockchain</li>
            </ul>
          </Section>

          {/* Idiomas */}
          <Section title="Idiomas">
            <p>
              <span className="font-semibold">Inglés B2:</span> Nivel
              intermedio-alto.
            </p>
          </Section>

          {/* Referencias */}
          <Section title="Referencias">
            <p>
              Dr. Gabriel Purón Cid, Director de la sede Región Centro del CIDE
              <br />
              <span className="text-blue-400">gabriel.puron@cide.edu</span>
            </p>
            <p>
              Mtro. Juan José Parres Córdova, Codelegado estatal OMM Puebla
              <br />
              <span className="text-blue-400">parresmath@hotmail.com</span>
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

// Section Component
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-blue-400 mb-2">{title}</h2>
    <div>{children}</div>
  </div>
);

// Job Component
const Job = ({
  title,
  company,
  year,
  location,
  description,
}: {
  title: string;
  company: string;
  year: string;
  location: string;
  description: string;
}) => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-gray-400">
      {company} | {year} | {location}
    </p>
    <p className="mt-1 text-gray-300">{description}</p>
  </div>
);

// Skill Component
const Skill = ({ skill, details }: { skill: string; details: string }) => (
  <div className="mb-2">
    <span className="font-semibold">{skill}:</span> {details}
  </div>
);

// Education Component
const Education = ({
  degree,
  institution,
  year,
  location,
}: {
  degree: string;
  institution: string;
  year: string;
  location: string;
}) => (
  <div className="mb-4">
    <h3 className="font-semibold">{degree}</h3>
    <p className="text-gray-400">
      {institution} | {year} | {location}
    </p>
  </div>
);
