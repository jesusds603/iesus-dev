import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { IoGameController } from "react-icons/io5";
import {
  TbHexagonNumber7Filled,
  TbMathFunction,
  TbMathXDivide2,
} from "react-icons/tb";
import { VscGraphLine, VscRunAll } from "react-icons/vsc";

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
    name: "About",
    link: "/about",
    icon: AiOutlineUser,
    labelEn: "About me",
    labelEs: "Sobre mí",
    submenus: [],
  },
  // {
  //   name: "Dashboards",
  //   link: "/dashboards",
  //   icon: AiOutlineUser,
  //   labelEn: "Dashboards",
  //   labelEs: "Dashboards",
  //   submenus: [],
  // },
  {
    name: "Hanoi",
    link: "/hanoi",
    icon: IoGameController,
    labelEn: "Hanoi Tower",
    labelEs: "Torre de Hanoi",
    submenus: [],
  },
  {
    name: "Freefall",
    link: "/freefall",
    icon: IoGameController,
    labelEn: "Free Fall Simulator",
    labelEs: "Simulador de Caída Libre",
    submenus: [],
  },
  {
    name: "Snake",
    link: "/snake",
    icon: IoGameController,
    labelEn: "Snake",
    labelEs: "Snake",
    submenus: [],
  },
  {
    name: "Plane-Block",
    link: "/plane-block",
    icon: IoGameController,
    labelEn: "Plane-Block",
    labelEs: "Plane-Block",
    submenus: [],
  },
  {
    name: "Math",
    link: "/math",
    icon: TbMathFunction,
    labelEn: "Math",
    labelEs: "Matemáticas",
    submenus: [
      {
        name: "Probability",
        link: "/math/probability",
        icon: VscGraphLine,
        labelEn: "Probability Distributions",
        labelEs: "Distribuciones de Probabilidad",
      },
      {
        name: "Collatz",
        link: "/math/collatz",
        icon: TbMathXDivide2,
        labelEn: "Collatz",
        labelEs: "Collatz",
      },
      {
        name: "Primes",
        link: "/math/primes",
        icon: TbHexagonNumber7Filled,
        labelEn: "Primes",
        labelEs: "Primos",
      },
    ],
  },
  {
    name: "Animations",
    link: "/animations",
    icon: VscRunAll,
    labelEn: "Animations",
    labelEs: "Animaciones",
    submenus: [],
  },
];
