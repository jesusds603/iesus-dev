import React, { useMemo } from "react";
import SphereU from "./SphereU";

interface SpheresProps {
  radius: number; // Tamaño del área, no se usa directamente en la curva
  numSpheres: number; // Número total de esferas
  startPoint: [number, number, number]; // Punto inicial (a, b, c)
  endPoint: [number, number, number]; // Punto final (d, e, f)
  width: number; // Ancho del camino
}

export default function Spheres({
  radius,
  numSpheres,
  startPoint,
  endPoint,
  width,
}: SpheresProps) {
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

    const [ax, ay, az] = startPoint;
    const [dx, dy, dz] = endPoint;

    // Longitud del camino
    const pathLength = Math.sqrt(
      (dx - ax) ** 2 + (dy - ay) ** 2 + (dz - az) ** 2
    );

    return new Array(numSpheres).fill(null).map((_, i) => {
      // Fracción del camino basada en el índice
      const t = i / (numSpheres - 1);

      // Interpolación lineal para calcular la posición central del camino
      const x = ax + t * (dx - ax);
      const y = ay + t * (dy - ay);
      const z = az + t * (dz - az);

      // Desplazamiento sinusoidal para agregar variación
      const offset = Math.sin(t * Math.PI * 2) * width; // Amplitud sinusoidal según el ancho
      const perpendicularX = offset * ((dz - az) / pathLength); // Proyección en el eje X
      const perpendicularZ = offset * (-(dx - ax) / pathLength); // Proyección en el eje Z

      // Radio y colores
      const colorIndex = Math.floor(i / (numSpheres / gradients.length));
      const colors = gradients[colorIndex];

      return {
        position: [x + perpendicularX, y, z + perpendicularZ],
        radius,
        colors,
      };
    });
  }, [numSpheres, startPoint, endPoint, width]);

  return (
    <>
      {spheres.map((sphere, i) => (
        <SphereU key={i} {...sphere} />
      ))}
    </>
  );
}
