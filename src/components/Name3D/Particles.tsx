import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, useSphere } from "@react-three/cannon";
import * as THREE from "three";

function Particle({ startTime }: { startTime: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const [timeElapsed, setTimeElapsed] = useState(0); // Para acumular el tiempo transcurrido

  useFrame((_, delta) => {
    setTimeElapsed((prev) => prev + delta); // Acumula el tiempo usando delta
    if (timeElapsed >= startTime && timeElapsed <= startTime + 10) {
      const t = (timeElapsed - startTime) / 10; // Normalizar entre 0 y 1
      if (ref.current) {
        // Interpolar la posición hacia el origen
        ref.current.position.x = -30 + t * 30;
        ref.current.position.z = 30 - t * 30;
        ref.current.position.y = 10; // Mantener la altura constante
      }
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Particles() {
  return (
    <group>
      {Array.from({ length: 100 }).map((_, i) => (
        <Particle key={i} startTime={i * 0.1} /> // Cada partícula aparece en un momento diferente
      ))}
    </group>
  );
}
