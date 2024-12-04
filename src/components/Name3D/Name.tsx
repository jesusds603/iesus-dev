import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, MeshPhongMaterialProps, useFrame } from "@react-three/fiber";
import { letter_E, letter_I, letter_S, letter_U } from "./positions";
import PlaneGroup from "./PlaneGradient";
import { Physics, useCylinder, useSphere } from "@react-three/cannon";
import RenderLetter from "./RenderLetter";
import Car from "./Car";
import Vehicle from "./Vehicle";
import type {
  CylinderArgs,
  CylinderProps,
  PlaneProps,
} from "@react-three/cannon";
import { Mesh } from "three";
import { Edges, GradientTexture } from "@react-three/drei";
import Spheres from "./Spheres";

export default function Name() {
  const width = 80; // Ancho del grupo de planos
  const length = 80; // Largo del grupo de planos
  const height = 20; // Altura de las paredes

  const yOffset = 14;

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

  // function Pillar(props: CylinderProps) {
  //   const args: CylinderArgs = [0.7, 0.7, 5, 16];
  //   const [ref] = useCylinder(
  //     () => ({
  //       args,
  //       mass: 10,
  //       type: "Dynamic",
  //       ...props,
  //     }),
  //     useRef<Mesh>(null)
  //   );
  //   return (
  //     <mesh ref={ref} castShadow>
  //       <cylinderGeometry args={args} />
  //       <meshNormalMaterial />
  //     </mesh>
  //   );
  // }

  return (
    <Canvas
      camera={{
        position: [0, 17, 30], // Posición inicial de la cámara
        fov: 75, // Campo de visión
        near: 0.1, // Distancia mínima para renderizar objetos
        far: 300, // Distancia máxima para renderizar objetos
      }}
      style={{
        width: "1200px", // Ancho fijo
        height: "600px", // Alto fijo
      }}
    >
      <hemisphereLight intensity={1} />
      <spotLight
        angle={Math.PI / 4}
        castShadow
        decay={0}
        intensity={1}
        penumbra={1}
        position={[0, 30, 0]}
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      <pointLight decay={0} intensity={1} position={[0, 20, 10]} />

      <Physics>
        <PlaneGroup width={width} length={length} height={height} />

        {/* <Car /> */}
        <Vehicle
          position={[-30, 1, 0]}
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
        <Pillar position={[-5, 2.5, -5]} />
        <Pillar position={[0, 2.5, -5]} />
        <Pillar position={[5, 2.5, -5]} /> */}

        <Spheres size={76} numSpheres={50} />
      </Physics>
    </Canvas>
  );
}
