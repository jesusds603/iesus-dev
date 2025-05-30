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
    imageUrl: "/cards/about.png",
  },
  // {
  //   title: myLanguage === "eng" ? "Dashboards" : "Dashboards",
  //   description:
  //     myLanguage === "eng"
  //       ? "Visualization of different type data in dashboards with graphs and analytics"
  //       : "Visualización de distintos tipos de datos en dashboards con gráficas y analíticas",

  //   gradientColor:
  //     myTheme === "dark"
  //       ? "bg-gradient-to-r from-green-600 via-blue-800 to-purple-900"
  //       : "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
  //   link: "/dashboards",
  //   imageUrl: "/cards/pie_graph.png",
  // },
  {
    title: myLanguage === "eng" ? "Hanoi Tower" : "Torre de Hanoi",
    description:
      myLanguage === "eng"
        ? "Play with the known Hanoi Tower and try making the minimum amount of moves."
        : "Juega con la conocida torre de Hanoi e intenta hacer la mínima cantidad de movimientos.",

    gradientColor:
      myTheme === "dark"
        ? "bg-gradient-to-r from-pink-800 via-purple-800 to-indigo-900"
        : "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400",
    link: "/hanoi",
    imageUrl: "/cards/hanoi.png",
  },
  {
    title:
      myLanguage === "eng"
        ? "Probability Distributions"
        : "Distribuciones de Proababilidad",
    description:
      myLanguage === "eng"
        ? "Visualize and understand how probability distributions work with examples and simple animations"
        : "Visualiza y comprende cómo funcionan las distribuciones de probabilidad con ejemplos y animaciones sencillas",

    gradientColor:
      myTheme === "dark"
        ? "bg-gradient-to-r from-blue-900 via-blue-800 to-gray-900"
        : "bg-gradient-to-r from-blue-600 via-blue-500 to-gray-600",
    link: "/math/probability",
    imageUrl: "/cards/binomial.png",
  },
  {
    title:
      myLanguage === "eng"
        ? "3D Free Fall Calculator"
        : "Calculadora 3D de Caída Libre",

    description:
      myLanguage === "eng"
        ? "Simulate the motion of a particle in free fall or projectile motion in a 3D environment. Observe the particle's movement in real-time, while tracking the position, velocity, and time in all three dimensions. "
        : "Simula el movimiento de una partícula en caída libre o tiro proyectado en un entorno 3D. Observa el movimiento de la partícula en tiempo real, mientras sigues la posición, velocidad y tiempo en las tres dimensiones.",

    gradientColor:
      myTheme === "dark"
        ? "bg-gradient-to-r from-pink-800 via-purple-800 to-indigo-900"
        : "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400",

    link: "/freefall",
    imageUrl: "/cards/freefall.png",
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
    imageUrl: "/cards/snake.png",
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
    imageUrl: "/cards/plane.png",
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
    imageUrl: "/cards/collatz.png",
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
    imageUrl: "/cards/primes.png",
  },
];
