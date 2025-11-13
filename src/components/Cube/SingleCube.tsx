import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, Color, Material } from "three";
import { getAmountSteps, getTimeStart } from "./motionManagers";

// Define a type for materials with emissiveIntensity
interface CustomMaterial extends Material {
  emissiveIntensity?: number;
}

function SingleCube({
  position,
  relative,
}: {
  position: [number, number, number];
  relative: [number, number, number];
}) {
  const groupRef = useRef<Group>(null);
  const boxRef = useRef<Mesh>(null);
  const innerGlowRef = useRef<Mesh>(null);
  const [x, y, z] = position;
  const [ix, iy, iz] = relative;
  const timeElapsed = useRef(0);

  const amountSteps = useMemo(() => getAmountSteps(iz), [iz]);
  const timeStart = useMemo(() => getTimeStart(ix, iy, iz), [ix, iy, iz]);

  // Colores morado y rosa en gradientes
  const colors = useMemo(() => {
    // Determinar si es morado o rosa basado en la posición
    const isPurple = (Math.abs(ix) + Math.abs(iy) + Math.abs(iz)) % 2 === 0;
    
    if (isPurple) {
      return {
        primary: '#8B5CF6',    // Morado vibrante
        secondary: '#A855F7',  // Morado más claro para glow
        accent: '#C4B5FD',     // Morado pastel para detalles
        dark: '#6D28D9'        // Morado oscuro
      };
    } else {
      return {
        primary: '#EC4899',    // Rosa vibrante
        secondary: '#F472B6',  // Rosa más claro para glow
        accent: '#FBCFE8',     // Rosa pastel para detalles
        dark: '#BE185D'        // Rosa oscuro
      };
    }
  }, [ix, iy, iz]);

  // Material principal con efectos mejorados
  const mainMaterialProps = useMemo(() => ({
    transparent: true,
    opacity: 0.95,
    shininess: 150,
    specular: new Color(0xffffff),
    emissive: new Color(colors.primary).multiplyScalar(0.3),
    reflectivity: 0.5,
  }), [colors.primary]);

  // Material para el glow interno
  const glowMaterialProps = useMemo(() => ({
    transparent: true,
    opacity: 0.4,
    emissive: new Color(colors.secondary),
    emissiveIntensity: 0.8,
  }), [colors.secondary]);

  useFrame((_, delta) => {
    if (!groupRef.current || !boxRef.current || !innerGlowRef.current) return;

    timeElapsed.current += delta;

    if (timeElapsed.current >= 30) {
      timeElapsed.current = 0;
      groupRef.current.position.set(x, y, z);
    }

    if (
      timeElapsed.current >= timeStart * 0.5 &&
      timeElapsed.current < (timeStart + 7) * 0.5
    ) {
      const rotationAngle = -(timeElapsed.current - timeStart * 0.5) * Math.PI;

      // Movimiento en z+
      if (
        timeElapsed.current >= timeStart * 0.5 &&
        timeElapsed.current < timeStart * 0.5 + amountSteps.zP * 0.5
      ) {
        groupRef.current.position.z += delta * 2;
      }

      // Movimiento en y+
      if (
        timeElapsed.current >= timeStart * 0.5 + amountSteps.zP * 0.5 &&
        timeElapsed.current < timeStart * 0.5 + amountSteps.zP * 0.5 + 3 * 0.5
      ) {
        groupRef.current.position.y += delta * 2;
      }

      // Movimiento en z-
      if (
        timeElapsed.current >=
          timeStart * 0.5 + amountSteps.zP * 0.5 + 3 * 0.5 &&
        timeElapsed.current < timeStart * 0.5 + 7 * 0.5
      ) {
        groupRef.current.position.z -= delta * 2;
      }

      // Rotación suavizada
      boxRef.current.rotation.x = rotationAngle;
      innerGlowRef.current.rotation.x = rotationAngle;
      
      // Efecto de escala pulsante durante la animación
      const scale = 1 + Math.sin(rotationAngle * 3) * 0.15;
      const glowScale = 1 + Math.sin(rotationAngle * 4) * 0.1;
      
      boxRef.current.scale.setScalar(scale);
      innerGlowRef.current.scale.setScalar(glowScale);

      // Efecto de brillo intermitente
      const pulseIntensity = 0.3 + Math.sin(rotationAngle * 2) * 0.2;
      if (boxRef.current.material) {
        const material = boxRef.current.material as CustomMaterial;
        material.emissiveIntensity = pulseIntensity;
      }
    } else {
      // Reset cuando no está animando
      boxRef.current.scale.setScalar(1);
      innerGlowRef.current.scale.setScalar(1);
      if (boxRef.current.material) {
        const material = boxRef.current.material as CustomMaterial;
        material.emissiveIntensity = 0.3;
      }
    }
  });

  return (
    <group ref={groupRef} position={[x, y, z]}>
      {/* Cubo principal con material mejorado */}
      <mesh ref={boxRef} castShadow receiveShadow>
        <boxGeometry args={[0.85, 0.85, 0.85]} />
        <meshPhongMaterial
          color={colors.primary}
          {...mainMaterialProps}
        />
      </mesh>

      {/* Glow interno - cubo ligeramente más pequeño */}
      <mesh ref={innerGlowRef} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshPhongMaterial
          color={colors.secondary}
          {...glowMaterialProps}
        />
      </mesh>
    </group>
  );
}

export default SingleCube;