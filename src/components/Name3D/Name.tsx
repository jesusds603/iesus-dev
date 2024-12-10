import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { letter_E, letter_I, letter_S, letter_U } from "./positions";
import PlaneGroup from "./PlaneGradient";
import { Physics } from "@react-three/cannon";
import RenderLetter from "./RenderLetter";
import Vehicle2 from "./Vehicle2";
import Camera from "./Camera";
import Spheres from "./Spheres";

export default function Name() {
  const width = 80; // Ancho del grupo de planos
  const length = 80; // Largo del grupo de planos
  const height = 20; // Altura de las paredes

  const yOffset = 0.5;

  const [colorBox, setColorBox] = useState<[string, string]>([
    "#07c5cb",
    "#0ea287",
  ]); //azul

  // Cambiar el color automáticamente cada 5 segundos
  useEffect(() => {
    const colors = [
      ["#07c5cb", "#0ea287"],

      ["#54e346", "#d2db15"],
    ]; // Colores predefinidos
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % colors.length; // Incrementar y reiniciar índice circularmente
      setColorBox([colors[index][0], colors[index][1]]); // Actualizar color
    }, 3000); // Cada 5 segundos

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);

  return (
    <Canvas
      style={{
        // width: "800px", // Ancho fijo
        height: "400px", // Alto fijo
      }}
    >
      <hemisphereLight intensity={3} />
      <Camera />

      {/* <OrbitControls /> */}

      <Physics>
        <PlaneGroup width={width} length={length} height={height} />

        {/* <Car /> */}
        <Vehicle2
          position={[-20, 2, -30]}
          rotation={[0, 0, 0]}
          angularVelocity={[0, 1, 0]}
        />

        <RenderLetter
          positions={letter_I}
          xOffset={-14}
          yOffset={yOffset}
          colorBox={colorBox}
        />
        <RenderLetter
          positions={letter_E}
          xOffset={-8}
          yOffset={yOffset}
          colorBox={colorBox}
        />
        <RenderLetter
          positions={letter_S}
          xOffset={-2}
          yOffset={yOffset}
          colorBox={colorBox}
        />
        <RenderLetter
          positions={letter_U}
          xOffset={4}
          yOffset={yOffset}
          colorBox={colorBox}
        />
        <RenderLetter
          positions={letter_S}
          xOffset={10}
          yOffset={yOffset}
          colorBox={colorBox}
        />

        <Spheres
          radius={0.8}
          numSpheres={20}
          startPoint={[10, 15, -10]}
          endPoint={[5, 3, 10]}
          width={7}
        />
      </Physics>
    </Canvas>
  );
}
