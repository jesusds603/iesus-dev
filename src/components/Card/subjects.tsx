export const subjects = (myLanguage: string, myTheme: string) => [
  {
    title: myLanguage === "eng" ? "About Me" : "Sobre Mí",
    description:
      myLanguage === "eng"
        ? "Play with the known Hanoi Tower and get rewards"
        : "Juega con la conocida torre de Hanoi y obtén recompensas",

    gradientColor:
      myTheme === "dark"
        ? "bg-gradient-to-r from-pink-800 via-red-800 to-yellow-800"
        : "bg-gradient-to-r from-pink-300 via-red-300 to-yellow-300",
    link: "/about",
  },
  {
    title: myLanguage === "eng" ? "Hanoi Tower" : "Torre de Hanoi",
    description:
      myLanguage === "eng"
        ? "Play with the known Hanoi Tower and get rewards"
        : "Juega con la conocida torre de Hanoi y obtén recompensas",

    gradientColor:
      myTheme === "dark"
        ? "bg-gradient-to-r from-pink-800 via-purple-800 to-indigo-900"
        : "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400",
    link: "/hanoi",
  },
  {
    title: myLanguage === "eng" ? "Snake" : "Serpiente",
    description:
      myLanguage === "eng"
        ? "Play the classical snake game and get rewards"
        : "Juega al clásico juego de la serpiente y obtén recompensas",
    gradientColor:
      myTheme === "dark"
        ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black"
        : "bg-gradient-to-r from-gray-500 via-gray-400 to-slate-400",
    link: "/snake",
  },
  {
    title: "Plane Block",
    description:
      myLanguage === "eng"
        ? "A simple 2D game where you control a plane and must shoot down enemy aircraft while avoiding their attacks."
        : "Un sencillo juego 2D donde controlas un avión y debes derribar naves enemigas mientras evitas sus ataques.",
    gradientColor:
      myTheme === "dark"
        ? "bg-gradient-to-r from-rose-700 via-red-600 to-red-700"
        : "bg-gradient-to-r from-rose-400 via-red-300 to-red-400",
    link: "/plane-block",
  },
  {
    title: "Collatz",
    description:
      myLanguage === "eng"
        ? "Visualize the Collatz conjecture algorithm for any number"
        : "Visualiza el algoritmo de la conjetura de Collatz para el número que quieras",
    gradientColor:
      myTheme === "dark"
        ? "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-800 via-emerald-800 to-teal-800"
        : "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200",
    link: "/math/collatz",
  },
  {
    title: myLanguage === "eng" ? "Prime Numbers" : "Números Primos",
    description:
      myLanguage === "eng"
        ? "Graph and calculate sequences of prime numbers"
        : "Grafica y calcula sucesiones de números primos",
    gradientColor:
      myTheme === "dark"
        ? "bg-gradient-to-r from-sky-900 via-rose-900 to-lime-900"
        : "bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400",
    link: "/math/primes",
  },
];
