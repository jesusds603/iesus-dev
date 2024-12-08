import React, { useRef, useState } from "react";
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
  const [typeObj, setTypeObj] = useState<"Dynamic" | "Static" | "Kinematic">(
    "Dynamic"
  );

  const [ref, api] = useSphere(
    () => ({
      mass: 0.1,
      position: [position[0], position[1], position[2]],
      radius,
      type: typeObj,
      gravity: typeObj === "Static" ? false : true, // Desactivar la gravedad si es estático
      linearDamping: typeObj === "Static" ? 1 : 0, // Aplicar solo cuando es estático
      angularDamping: typeObj === "Static" ? 1 : 0, // Aplicar solo cuando es estático
      friction: typeObj === "Static" ? 0 : 0.5, // Asegurar fricción cuando es dinámico
      restitution: 2, // Para controlar rebotes
    }),
    useRef<Mesh>(null)
  );

  const lastSwitchTime = useRef(0); // Referencia para guardar el tiempo de la última alternancia

  useFrame((state, delta) => {
    lastSwitchTime.current += delta;

    // Si han pasado más de 5 segundos desde el último cambio
    if (lastSwitchTime.current > 10) {
      // Resetear el tiempo de alternancia
      lastSwitchTime.current = 0;
    }

    // Alternar tipo de objeto basado en el tiempo transcurrido
    if (lastSwitchTime.current <= 3) {
      setTypeObj(() => "Static");
    } else if (lastSwitchTime.current > 3 && lastSwitchTime.current <= 10) {
      setTypeObj(() => "Dynamic");
    }

    if (typeObj === "Static") {
      api.position.set(position[0], position[1], position[2]); // Reinicia la posición si vuelve a estático
      api.velocity.set(0, 0, 0); // Asegurarse de que no haya velocidad residual
      api.angularVelocity.set(0, 0, 0); // Asegurarse de que no haya rotación residual
      api.rotation.set(0, 0, 0);
    }
  });

  return (
    <Sphere ref={ref} args={[radius, 16, 16]}>
      <meshPhongMaterial>
        <GradientTexture stops={[0, 1]} colors={colors} size={1024} />
      </meshPhongMaterial>
    </Sphere>
  );
}
