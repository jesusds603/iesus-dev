import React, { useRef } from "react";
import { Sphere, GradientTexture } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

interface SphereUProps {
  position: number[];
  radius: number;
  colors: string[];
}

export default function SphereU({ position, radius, colors }: SphereUProps) {
  const [ref, api] = useSphere(
    () => ({
      mass: 10,
      position: [position[0], position[1], position[2]],
      radius,
      velocity: [
        (Math.random() - 0.5) * 200, // X axis velocity
        -50, // Y axis velocity (ajustado para posibles movimientos verticales menores)
        (Math.random() - 0.5) * 200, // Z axis velocity
      ],
      restitution: 1, // Coeficiente de restitución para mayor rebote
    }),
    useRef<Mesh>(null)
  );

  const timeElapsed = useRef(0);
  const lastForceTime = useRef(0); // Mantiene un registro del último tiempo de aplicación de fuerza

  // Dirección de la fuerza aleatoria en X o Z
  const getRandomForceDirection = () => (Math.random() < 0.5 ? 1 : -1); // -1 o 1 aleatorio

  const forceMagnitude = 1500; // Magnitud de la fuerza a aplicar

  useFrame((_, delta) => {
    timeElapsed.current += delta; // Lleva un registro del tiempo transcurrido

    if (
      timeElapsed.current > 2 &&
      timeElapsed.current - lastForceTime.current >= 2
    ) {
      // Si han pasado más de 5 segundos y han transcurrido al menos 5 segundos desde la última aplicación de fuerza
      const axis = Math.random() < 0.5 ? "x" : "z"; // Aleatoriamente en el eje X o Z
      const forceDirection = getRandomForceDirection();

      if (axis === "x") {
        api.applyForce([forceDirection * forceMagnitude, 500, 0], [0, 0, 0]);
      } else {
        api.applyForce([0, 500, forceDirection * forceMagnitude], [0, 0, 0]);
      }

      lastForceTime.current = timeElapsed.current; // Actualiza el último tiempo en el que se aplicó la fuerza
    }
  });

  return (
    <Sphere ref={ref} args={[radius, 32, 32]}>
      <meshPhysicalMaterial
        emissive={"#ffffff"}
        emissiveIntensity={0.04}
        metalness={0.9}
        roughness={0.6}
        transmission={1}
        opacity={0.7}
        transparent={true}
        reflectivity={0.9}
        clearcoatRoughness={0.05}
        clearcoat={1}
      >
        <GradientTexture stops={[0, 1]} colors={colors} size={1024} />
      </meshPhysicalMaterial>
    </Sphere>
  );
}
