import { MutableRefObject, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// Interfaz para partículas con velocidad
interface ParticleMesh extends THREE.Mesh {
  velocity?: THREE.Vector3;
}

interface EngineParticlesProps {
  groupRef: MutableRefObject<THREE.Group>;
}

export function EngineParticles({ groupRef }: EngineParticlesProps) {
  // Crear partículas usando useMemo para evitar recreación
  const particles = useMemo(() => {
    const particleGroup = new THREE.Group();
    const particleCount = 50;
    const geometry = new THREE.SphereGeometry(0.1, 8, 8);
    const material = new THREE.MeshBasicMaterial({ 
      color: "#00ffff",
      transparent: true,
      opacity: 0.7
    });
    
    for (let i = 0; i < particleCount; i++) {
      const particle = new THREE.Mesh(geometry, material) as ParticleMesh;
      
      // Posición aleatoria en la parte trasera
      particle.position.set(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2,
        -8 - Math.random() * 5
      );
      
      // Velocidad aleatoria
      particle.velocity = new THREE.Vector3(
        0,
        0,
        -2 - Math.random() * 3
      );
      
      particleGroup.add(particle);
    }
    
    return particleGroup;
  }, []);

  // Añadir partículas al grupo principal
  useEffect(() => {
    groupRef.current.add(particles);
    
    return () => {
      groupRef.current.remove(particles);
    };
  }, [groupRef, particles]);

  // Animación de partículas de propulsión
  useFrame((state) => {
    particles.children.forEach((child) => {
      // Verificar que el hijo sea una malla y tenga velocidad
      if (child instanceof THREE.Mesh && (child as ParticleMesh).velocity) {
        const particle = child as ParticleMesh;
        
        // Mover partícula
        particle.position.add(particle.velocity!);
        
        // Reiniciar partícula si sale demasiado
        if (particle.position.z < -15) {
          particle.position.set(
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2,
            -8
          );
          particle.velocity!.z = -2 - Math.random() * 3;
        }
        
        // Efecto de parpadeo
        const opacity = 0.3 + Math.sin(state.clock.elapsedTime * 10 + particle.position.z) * 0.4;
        if (particle.material instanceof THREE.MeshBasicMaterial) {
          particle.material.opacity = opacity;
        }
      }
    });
  });

  return null;
}