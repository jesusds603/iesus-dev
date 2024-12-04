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
    name: "Account",
    link: "/account",
    icon: MdAccountCircle,
    labelEn: "Account",
    labelEs: "Cuenta",
    submenus: [],
  },
  {
    name: "About",
    link: "/about",
    icon: AiOutlineUser,
    labelEn: "About",
    labelEs: "Acerca de",
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
        name: "Calculators",
        link: "/math/calculators", // No link here since it's just a parent menu
        icon: BiMath,
        labelEn: "Calculators",
        labelEs: "Calculadoras",
        submenus: [
          {
            name: "Scientific",
            link: "/math/calculators/scientific",
            icon: GiMaterialsScience,
            labelEn: "Scientific",
            labelEs: "Científica",
          },
          {
            name: "Conversions",
            link: "/math/calculators/conversions",
            icon: MdCompareArrows,
            labelEn: "Conversions",
            labelEs: "Conversiones",
          },
          {
            name: "Matrix",
            link: "/math/calculators/matrix",
            icon: TbBrandMatrix,
            labelEn: "Matrix",
            labelEs: "Matrices",
          },
          {
            name: "Equations",
            link: "/math/calculators/equations",
            icon: PiMathOperationsDuotone,
            labelEn: "Equation System",
            labelEs: "Sistema de Ecuaciones",
          },
          {
            name: "Derivatives",
            link: "/math/calculators/derivatives",
            icon: TbMathFunctionY,
            labelEn: "Derivatives",
            labelEs: "Derivadas",
          },
          {
            name: "Integrals",
            link: "/math/calculators/integrals",
            icon: TbMathIntegral,
            labelEn: "Integrals",
            labelEs: "Integrales",
          },
        ],
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
    name: "Games",
    link: "/games",
    icon: IoGameController,
    labelEn: "Games",
    labelEs: "Juegos",
    submenus: [
      {
        name: "Conway",
        link: "/games/conway",
        icon: GiConwayLifeGlider,
        labelEn: "Conway",
        labelEs: "Conway",
      },
      {
        name: "Hanoi Tower",
        link: "/games/hanoi",
        icon: TbHexagonNumber7Filled,
        labelEn: "Hanoi",
        labelEs: "Hanoi",
      },
    ],
  },
  {
    name: "Physics",
    link: "/physics",
    icon: AiOutlineUser,
    labelEn: "Physics",
    labelEs: "Física",
    submenus: [
      {
        name: "Freefall",
        link: "/physics/freefall",
        icon: GiFallingBoulder,
        labelEn: "Freefall",
        labelEs: "Caída libre",
      },
    ],
  },
  {
    name: "NatalChart",
    link: "/natal-chart",
    icon: IoMdPlanet,
    labelEn: "Natal Chart",
    labelEs: "Carta Natal",
    submenus: [],
  },
  {
    name: "Tools",
    link: "/tools",
    icon: FaTools,
    labelEn: "Tools",
    labelEs: "Herramientas",
    submenus: [],
  },
];
