import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { letter_E, letter_I, letter_S, letter_U } from "./positions";
import PlaneGroup from "./PlaneGradient";
import { Physics } from "@react-three/cannon";
import RenderLetter from "./RenderLetter";
import Vehicle2 from "./Vehicle2";

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
      camera={{
        position: [-15, 10, 15], // Posición inicial de la cámara
        fov: 75, // Campo de visión
        near: 0.1, // Distancia mínima para renderizar objetos
        far: 300, // Distancia máxima para renderizar objetos
      }}
      style={{
        width: "90vw", // Ancho fijo
        height: "60vh", // Alto fijo
      }}
    >
      <hemisphereLight intensity={0.7} />

      {/* <pointLight decay={0} intensity={1} position={[0, 20, 10]} /> */}
      {/* Luz que apunta desde arriba */}
      {/* <spotLight
        position={[0, 10, 0]} // Posición de la luz (directamente encima del origen)
        angle={Math.PI / 3} // Ángulo del cono de luz
        intensity={5} // Intensidad de la luz
        castShadow // Proyectar sombras
      /> */}

      {/* <OrbitControls /> */}

      <Physics>
        <PlaneGroup width={width} length={length} height={height} />

        {/* <Car /> */}
        <Vehicle2
          position={[-30, 2, -30]}
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
        {/* 
       
        {/* <Spheres size={76} numSpheres={50} /> */}
      </Physics>
    </Canvas>
  );
}
