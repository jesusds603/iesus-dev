import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Componente Box que representa un cubo
function Box({
  colorBox,
  position,
  ...props
}: JSX.IntrinsicElements["mesh"] & {
  colorBox: [string, string];
  position: [number, number, number];
}) {
  const [typeObj, setTypeObj] = useState<"Dynamic" | "Static" | "Kinematic">(
    "Dynamic"
  );
  const lastSwitchTime = useRef(0); // Referencia para guardar el tiempo de la última alternancia

  const [ref, api] = useBox(
    () => ({
      mass: 20, // Si es estático, no tiene masa
      position,
      type: typeObj,
      gravity: typeObj === "Static" ? false : true, // Desactivar la gravedad si es estático
      linearDamping: typeObj === "Static" ? 1 : 0, // Aplicar solo cuando es estático
      angularDamping: typeObj === "Static" ? 1 : 0, // Aplicar solo cuando es estático
      friction: typeObj === "Static" ? 0 : 0.5, // Asegurar fricción cuando es dinámico
      restitution: 2, // Para controlar rebotes
    }),
    useRef<THREE.Mesh>(null)
  );

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

  // Define un shader básico para el gradiente
  const material = new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: new THREE.Color(colorBox[0]) }, // Color inicial
      color2: { value: new THREE.Color(colorBox[1]) }, // Color final
    },
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      uniform vec3 color1;
      uniform vec3 color2;
      void main() {
        float mixValue = (vPosition.y + 0.5) / 1.0; // Normaliza Y para crear el gradiente
        gl_FragColor = vec4(mix(color1, color2, mixValue), 1.0);
      }
    `,
  });

  return (
    <mesh ref={ref} {...props} castShadow>
      <boxGeometry args={[0.99, 0.99, 0.99]} />
      <primitive attach="material" object={material} />
    </mesh>
  );
}

export default Box;
