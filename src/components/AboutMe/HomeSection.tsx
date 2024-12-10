import React, { useState } from "react";
import Image from "next/image";
import { FaCopy } from "react-icons/fa";
import Laptop from "../Laptop/LaptopIndex";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";

function HomeSection() {
  const [showModal, setShowModal] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();

  const handleModal = (info: string) => {
    setContactInfo(info);
    setShowModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contactInfo);
    alert(
      myLanguage === "esp"
        ? "¡Dirección copiada al portapapeles!"
        : "Address copied to clipboard!"
    );
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Traducciones
  const translations = {
    esp: {
      title: "Jesús Dávila Sánchez",
      subtitle: "Matemático Puro | Programador | Analista de Datos",
      email: "📧 Correo Electrónico",
      github: "🐱 Github",
      linkedin: "🔗 LinkedIn",
      contact: "Dirección de Contacto",
      copy: "Copiar",
      close: "Cerrar",
    },
    eng: {
      title: "Jesús Dávila Sánchez",
      subtitle: "Pure Mathematician | Developer | Data Analyst",
      email: "📧 Email",
      github: "🐱 Github",
      linkedin: "🔗 LinkedIn",
      contact: "Contact Address",
      copy: "Copy",
      close: "Close",
    },
  };

  const t = translations[myLanguage as "esp" | "eng"];

  // Tema y estilo dinámico
  const themeClasses =
    myTheme === "dark"
      ? "bg-gray-900 text-white"
      : "bg-white text-gray-900 shadow-md";

  return (
    <div className={`flex flex-col items-center p-6 rounded-lg `}>
      {/* Imagen */}
      <div className="w-[150px] h-[150px] rounded-full overflow-hidden border border-fuchsia-500 shadow-lg">
        <Image
          src="/miFoto.jpeg"
          alt="Jesús Dávila Sánchez"
          width={180}
          height={180}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Título y subtítulo */}

      <p className="mt-2 text-lg">{t.subtitle}</p>

      {/* Botones */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => handleModal("jesusds603@gmail.com")}
          className={`${
            myTheme === "dark"
              ? "bg-gradient-to-r from-blue-800 to-purple-800 text-white"
              : "bg-gradient-to-r from-blue-400 to-purple-400 text-black"
          } p-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300`}
        >
          {t.email}
        </button>
        <button
          onClick={() => handleModal("https://github.com/jesusds603")}
          className={`${
            myTheme === "dark"
              ? "bg-gradient-to-r from-green-800 to-teal-800 text-white"
              : "bg-gradient-to-r from-green-400 to-teal-400 text-black"
          } p-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300`}
        >
          {t.github}
        </button>
        <button
          onClick={() =>
            handleModal("https://www.linkedin.com/in/jesus-davila-373aa2248/")
          }
          className={`${
            myTheme === "dark"
              ? "bg-gradient-to-r from-blue-800 to-violet-800 text-white"
              : "bg-gradient-to-r from-blue-400 to-violet-400 text-black"
          } p-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300`}
        >
          {t.linkedin}
        </button>
      </div>

      {/* Laptop Component */}
      <div className="mt-8">
        <Laptop />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fade-in">
          <div
            className={`p-6 rounded-lg w-[300px] shadow-2xl transition-transform duration-300 transform hover:scale-105 ${
              myTheme === "dark"
                ? "bg-gradient-to-r from-fuchsia-800 to-pink-800 text-white"
                : "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100"
            }`}
          >
            {/* Encabezado del Modal */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                {t.contact}
              </h2>
              <button
                onClick={closeModal}
                className="text-3xl hover:text-red-500 transition-colors duration-300"
              >
                &times;
              </button>
            </div>

            {/* Información de contacto */}
            <p className="mb-6 text-center text-lg break-words whitespace-normal">
              {contactInfo}
            </p>

            {/* Botones del Modal */}
            <div className="flex justify-between items-center">
              <button
                onClick={copyToClipboard}
                className="flex items-center bg-gradient-to-r from-green-800 to-teal-900 text-white p-2 rounded-lg hover:from-green-500 hover:to-teal-600 transition-all duration-300"
              >
                <FaCopy className="mr-2" />
                {t.copy}
              </button>
              <button
                onClick={closeModal}
                className="bg-gradient-to-r from-red-700 to-pink-800 text-white p-2 rounded-lg hover:from-red-500 hover:to-pink-600 transition-all duration-300"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeSection;
