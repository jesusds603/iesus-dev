// import React from "react";
// import { useTheme } from "@/hooks/useTheme";

// // Gradiente de fondo principal según el tema
// export const MainBackgroundGradient = () => {
//   const { myTheme } = useTheme();

//   return (
//     <div
//       className={`absolute inset-0 w-full h-full bg-gradient-to-b ${
//         myTheme === "dark" ? "from-black" : "from-gray-200"
//       } to-transparent  transition-all duration-100 ease-in-out opacity-100`}
//     ></div>
//   );
// };

// // Capa de fondo adicional con gradiente según el tema (capa 1)
// export const AdditionalBackgroundLayer1 = () => {
//   const { myTheme } = useTheme();

//   return (
//     <div
//       className={`absolute inset-0 w-full h-full bg-gradient-to-r ${
//         myTheme === "dark"
//           ? "from-emerald-950 to-purple-950"
//           : "from-emerald-200 to-purple-200"
//       } opacity-10`}
//     ></div>
//   );
// };

// // Capa de fondo adicional con gradiente según el tema (capa 2)
// export const AdditionalBackgroundLayer2 = () => {
//   const { myTheme } = useTheme();

//   return (
//     <div
//       className={`absolute inset-0 w-full h-full bg-gradient-to-tr ${
//         myTheme === "dark"
//           ? "from-teal-800 to-fuchsia-950"
//           : "from-teal-300 to-purple-300"
//       } opacity-30`}
//     ></div>
//   );
// };
