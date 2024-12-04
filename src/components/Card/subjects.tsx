export const subjects = (myLanguage: string) => [
  {
    title: myLanguage === "eng" ? "Hanoi Tower" : "Torre de Hanoi",
    description:
      myLanguage === "eng"
        ? "Play with the known Hanoi Tower and get rewards"
        : "Juega con la conocida torre de Hanoi y obtén recompensas",

    gradientColor:
      "linear-gradient(135deg, hsl(180, 70%, 50%), hsl(180, 70%, 60%))",
    link: "/hanoi",
  },
  {
    title: myLanguage === "eng" ? "Snake" : "Serpiente",
    description:
      myLanguage === "eng"
        ? "Play the classical snake game and get rewards"
        : "Juega al clásico juego de la serpiente y obtén recompensas",
    gradientColor:
      "linear-gradient(rgb(17, 24, 39), rgb(88, 28, 135), rgb(124, 58, 237))",
    link: "/snake",
  },
  {
    title: "Plane Block",
    description:
      myLanguage === "eng"
        ? "A simple 2D game where you control a plane and must shoot down enemy aircraft while avoiding their attacks."
        : "Un sencillo juego 2D donde controlas un avión y debes derribar naves enemigas mientras evitas sus ataques.",
    gradientColor:
      "conic-gradient(at left center, rgb(234, 179, 8), rgb(168, 85, 247), rgb(59, 130, 246))",
    link: "/plane-block",
  },
  {
    title: "Collatz",
    description:
      myLanguage === "eng"
        ? "Visualize the Collatz conjecture algorithm for any number"
        : "Visualiza el algoritmo de la conjetura de Collatz para el número que quieras",
    gradientColor:
      "linear-gradient(135deg, hsl(0, 70%, 50%), hsl(0, 70%, 60%))",
    link: "/math/collatz",
  },
  {
    title: myLanguage === "eng" ? "Prime Numbers" : "Números Primos",
    description:
      myLanguage === "eng"
        ? "Graph and calculate sequences of prime numbers"
        : "Grafica y calcula sucesiones de números primos",
    gradientColor:
      "linear-gradient(135deg, hsl(90, 70%, 50%), hsl(90, 70%, 60%))",
    link: "/math/primes",
  },
];
