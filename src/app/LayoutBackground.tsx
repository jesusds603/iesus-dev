import React from "react";
import { useTheme } from "@/hooks/useTheme";

function LayoutBackground() {
  const { myTheme } = useTheme();

  // Definir colores de fondo y gradientes según el tema
  const backgroundFromColor = myTheme === "dark" ? "from-black" : "from-white";
  const circleFromColor = myTheme === "dark" ? "from-black" : "from-pink-400";

  return (
    <div>
      {/* Capas de fondo principal con colores condicionados */}
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-to-b ${backgroundFromColor} to-transparent opacity-100`}
      ></div>
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-to-r ${
          myTheme === "dark"
            ? "from-emerald-950 to-purple-800 "
            : "from-emerald-300 to-purple-300 "
        } opacity-20`}
      ></div>
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-to-tr ${
          myTheme === "dark"
            ? "from-teal-600 to-purple-700"
            : "from-teal-300 to-purple-200"
        }  opacity-10`}
      ></div>

      {/* Círculos fijos con efecto de gota de agua y gradientes condicionados */}
      <div
        className={`fixed top-[200px] right-[0px] transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-gradient-to-r ${circleFromColor} via-pink-800 to-fuchsia-600 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-teal-400 border-opacity-50 border-t-0 border-l-0"></div>
      </div>
      <div
        className={`fixed top-[80px] left-2 w-[180px] h-[180px] rounded-full bg-gradient-to-tr ${circleFromColor} to-fuchsia-700 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-white border-opacity-50 border-b-0 border-l-0"></div>
      </div>
      <div
        className={`fixed top-[300px] left-[100px] w-[200px] h-[200px] rounded-full bg-gradient-to-tl ${circleFromColor} via-gray-900 to-teal-500 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-cyan-400 border-opacity-50 border-b-0 border-r-0"></div>
      </div>
      <div
        className={`fixed bottom-[100px] right-[50px] w-[90px] h-[90px] rounded-full bg-gradient-to-bl ${circleFromColor} via-gray-900 to-cyan-500 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-cyan-200 border-opacity-50 border-t-0 border-r-0"></div>
      </div>
      <div
        className={`fixed top-[400px] right-[100px] w-[150px] h-[150px] rounded-full bg-gradient-to-b ${circleFromColor} via-green-600 to-cyan-400 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-pink-200 border-opacity-50 border-t-0 border-l-0"></div>
      </div>
      <div
        className={`fixed bottom-[100px] left-[80px] w-[70px] h-[70px] rounded-full bg-gradient-to-br ${circleFromColor} via-gray-900 to-indigo-500 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-indigo-200 border-opacity-50 border-t-0 border-l-0"></div>
      </div>
      <div
        className={`fixed bottom-[200px] left-[200px] w-[60px] h-[60px] rounded-full bg-gradient-to-l ${circleFromColor} via-lime-700 to-lime-500 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-lime-200 border-opacity-50 border-b-0 border-r-0"></div>
      </div>
      <div
        className={`fixed top-[150px] left-[250px] w-[90px] h-[90px] rounded-full bg-gradient-to-b ${circleFromColor} via-yellow-800 to-yellow-500 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-yellow-200 border-opacity-50 border-b-0 border-r-0"></div>
      </div>
      <div
        className={`fixed bottom-[150px] right-[250px] w-[90px] h-[90px] rounded-full bg-gradient-to-b ${circleFromColor} via-yellow-800 to-yellow-500 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-yellow-200 border-opacity-50 border-b-0 border-r-0"></div>
      </div>
      <div
        className={`fixed bottom-[150px] left-[250px] w-[180px] h-[180px] rounded-full bg-gradient-to-b ${circleFromColor} via-lime-400 to-emerald-500 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-yellow-200 border-opacity-50 border-b-0 border-r-0"></div>
      </div>

      <div
        className={`fixed bottom-[300px] left-[550px] w-[180px] h-[180px] rounded-full bg-gradient-to-b ${circleFromColor} via-sky-700 to-violet-500 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-yellow-200 border-opacity-50 border-b-0 border-r-0"></div>
      </div>

      <div
        className={`fixed top-[200px] left-[850px] w-[180px] h-[180px] rounded-full bg-gradient-to-b ${circleFromColor} via-black to-cyan-400 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-yellow-200 border-opacity-50 border-b-0 border-r-0"></div>
      </div>

      <div
        className={`fixed bottom-[100px] right-[550px] w-[280px] h-[280px] rounded-full bg-gradient-to-b ${circleFromColor} via-pink-600 to-transparent opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-yellow-200 border-opacity-50 border-b-0 border-r-0"></div>
      </div>
      <div
        className={`fixed top-[380px] left-[900px] w-[240px] h-[240px] rounded-full bg-gradient-to-tr ${circleFromColor} to-fuchsia-700 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-white border-opacity-50 border-b-0 border-l-0"></div>
      </div>
      <div
        className={`fixed top-[300px] left-[600px] w-[200px] h-[200px] rounded-full bg-gradient-to-tl ${circleFromColor} via-gray-900 to-teal-500 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-cyan-400 border-opacity-50 border-b-0 border-r-0"></div>
      </div>
      <div
        className={`fixed bottom-[100px] right-[300px] w-[90px] h-[90px] rounded-full bg-gradient-to-bl ${circleFromColor} via-gray-900 to-cyan-500 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-cyan-200 border-opacity-50 border-t-0 border-r-0"></div>
      </div>
      <div
        className={`fixed bottom-[400px] right-[500px] w-[150px] h-[150px] rounded-full bg-gradient-to-b ${circleFromColor} via-green-600 to-cyan-400 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-pink-200 border-opacity-50 border-t-0 border-l-0"></div>
      </div>
      <div
        className={`fixed bottom-[600px] left-[700px] w-[70px] h-[70px] rounded-full bg-gradient-to-br ${circleFromColor} via-gray-900 to-indigo-500 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-indigo-200 border-opacity-50 border-t-0 border-l-0"></div>
      </div>
      <div
        className={`fixed bottom-[300px] left-[600px] w-[60px] h-[60px] rounded-full bg-gradient-to-l ${circleFromColor} via-lime-700 to-lime-500 opacity-60 shadow-lg`}
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-lime-200 border-opacity-50 border-b-0 border-r-0"></div>
      </div>
    </div>
  );
}

export default LayoutBackground;
