import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { BiMath } from "react-icons/bi";
import { FaTools } from "react-icons/fa";
import {
  GiConwayLifeGlider,
  GiFallingBoulder,
  GiMaterialsScience,
} from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { IoMdPlanet } from "react-icons/io";
import { MdCompareArrows, MdAccountCircle } from "react-icons/md";
import { PiMathOperationsDuotone } from "react-icons/pi";
import {
  TbHexagonNumber7Filled,
  TbMathFunction,
  TbMathFunctionY,
  TbMathXDivide2,
  TbMathIntegral,
  TbBrandMatrix,
} from "react-icons/tb";

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
  {
    name: "Math",
    link: "/math",
    icon: TbMathFunction,
    labelEn: "Math",
    labelEs: "Matemáticas",
    submenus: [
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
    name: "Freefall",
    link: "/freefall",
    icon: IoGameController,
    labelEn: "Free Fall Simulator",
    labelEs: "Simulador de Caída Libre",
    submenus: [],
  },
  {
    name: "Hanoi",
    link: "/hanoi",
    icon: IoGameController,
    labelEn: "Hanoi Tower",
    labelEs: "Torre de Hanoi",
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
];
