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

  // Audio setup
  const sound = useRef<THREE.Audio | null>(null);

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

  const randomAngle = Math.random() * Math.PI * 2; // Ángulo entre 0 y 2π
  const forceX = Math.cos(randomAngle) * 200;
  const forceZ = Math.sin(randomAngle) * 200;

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    // Si han pasado más de 5 segundos desde el último cambio
    if (elapsedTime - lastSwitchTime.current > 15) {
      // Resetear el tiempo de alternancia
      lastSwitchTime.current = elapsedTime;
    }

    // Alternar tipo de objeto basado en el tiempo transcurrido
    if (elapsedTime - lastSwitchTime.current <= 4) {
      setTypeObj(() => "Static");
    } else if (
      elapsedTime - lastSwitchTime.current > 4 &&
      elapsedTime - lastSwitchTime.current <= 15
    ) {
      setTypeObj(() => "Dynamic");
      api.applyForce([forceX, 0, forceZ], [0, 0, 0]);
    }

    // Si es "Static", reiniciar la posición
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
