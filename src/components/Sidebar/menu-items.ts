import { AiFillHome } from "react-icons/ai";
import { IoGameController } from "react-icons/io5";
import {
  TbHexagonNumber7Filled,
  TbMathFunction,
  TbMathXDivide2,
} from "react-icons/tb";
import { VscGraphLine, VscRunAll, VscProject } from "react-icons/vsc";

// *Lista de menús y submenús
export const menuItems = [
  {
    name: "Home",
    link: "/",
    icon: AiFillHome,
    labelEn: "Home",
    labelEs: "Inicio",
    submenus: [],
  },
  {
    name: "Projects",
    link: "#", // Cambiado a "#" para que no navegue
    icon: VscProject,
    labelEn: "Projects",
    labelEs: "Proyectos",
    submenus: [
      {
        name: "Games",
        link: "#", // Cambiado a "#" para que no navegue
        icon: IoGameController,
        labelEn: "Games",
        labelEs: "Juegos",
        submenus: [
          {
            name: "Hanoi",
            link: "/projects/games/hanoi",
            icon: IoGameController,
            labelEn: "Hanoi Tower",
            labelEs: "Torre de Hanoi",
          },
          {
            name: "Freefall",
            link: "/projects/games/freefall",
            icon: IoGameController,
            labelEn: "Free Fall Simulator",
            labelEs: "Simulador de Caída Libre",
          },
          {
            name: "Snake",
            link: "/projects/games/snake",
            icon: IoGameController,
            labelEn: "Snake",
            labelEs: "Snake",
          },
          {
            name: "Plane-Block",
            link: "/projects/games/plane-block",
            icon: IoGameController,
            labelEn: "Plane-Block",
            labelEs: "Plane-Block",
          },
        ],
      },
      {
        name: "Math",
        link: "#", // Cambiado a "#" para que no navegue
        icon: TbMathFunction,
        labelEn: "Math",
        labelEs: "Matemáticas",
        submenus: [
          {
            name: "Probability",
            link: "/projects/math/probability",
            icon: VscGraphLine,
            labelEn: "Probability Distributions",
            labelEs: "Distribuciones de Probabilidad",
          },
          {
            name: "Collatz",
            link: "/projects/math/collatz",
            icon: TbMathXDivide2,
            labelEn: "Collatz",
            labelEs: "Collatz",
          },
          {
            name: "Primes",
            link: "/projects/math/primes",
            icon: TbHexagonNumber7Filled,
            labelEn: "Primes",
            labelEs: "Primos",
          },
        ],
      },
      {
        name: "Animations",
        link: "/projects/animations", // Este SÍ navega porque no tiene submenús
        icon: VscRunAll,
        labelEn: "Animations",
        labelEs: "Animaciones",
        submenus: [],
      },
    ],
  },
];