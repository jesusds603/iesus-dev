import React, { useMemo } from "react";
import SphereU from "./SphereU";

interface SpheresProps {
  size: number;
  numSpheres: number;
}

export default function Spheres({ size, numSpheres }: SpheresProps) {
  const spheres = useMemo(() => {
    const gradients: string[][] = [
      ["#ff0000", "#ff7f00"], // Rojo a Naranja
      ["#ff7f00", "#ffff00"], // Naranja a Amarillo
      ["#ffff00", "#7fff00"], // Amarillo a Amarillo-verde
      ["#7fff00", "#00ff00"], // Amarillo-verde a Verde
      ["#00ff00", "#00ff7f"], // Verde a Verde cian
      ["#00ff7f", "#00ffff"], // Verde cian a Cian
      ["#00ffff", "#007fff"], // Cian a Azul cian
      ["#007fff", "#0000ff"], // Azul cian a Azul
      ["#0000ff", "#7f00ff"], // Azul a Azul-violeta
      ["#7f00ff", "#ff00ff"], // Azul-violeta a Magenta
    ];

    const numColumns = Math.floor(Math.sqrt(numSpheres)); // Número de columnas basado en la raíz cuadrada
    const numRows = Math.ceil(numSpheres / numColumns); // Número de filas
    const spacing = size / (numColumns + 1); // Espaciado entre esferas

    return new Array(numSpheres).fill(null).map((_, i) => {
      // Calculamos la posición en la cuadrícula
      const x = (i % numColumns) * spacing - size / 2; // Columna
      const y = 10; // Altura fija para todas las esferas
      const z = Math.floor(i / numColumns) * spacing - size / 2; // Fila

      const radius = 0.5;
      const colorIndex = Math.floor(i / (numSpheres / gradients.length));
      const colors = gradients[colorIndex];

      return { position: [x, y, z], radius, colors };
    });
  }, [numSpheres, size]);

  return (
    <>
      {spheres.map((sphere, i) => (
        <SphereU key={i} {...sphere} />
      ))}
    </>
  );
}
