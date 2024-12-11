import { Box, Edges, GradientTexture } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";

function SingleCube({
  position,
  relative,
}: {
  position: [number, number, number];
  relative: [number, number, number];
}) {
  const groupRef = useRef<Group>(null);
  const boxRef = useRef<Mesh>(null);
  const [x, y, z] = position;
  const [ix, iy, iz] = relative; // Posición relativa al centro, nunca cambia para cada cubo
  const timeElapsed = useRef(0); // Tiempo transcurrido en el ciclo

  // Se actualiza la posición Y en cada frame
  useFrame((_, delta) => {
    timeElapsed.current += delta;

    if (timeElapsed.current >= 16) {
      // Resetea el tiempo cada 10 segundos
      timeElapsed.current = 0;
      if (groupRef.current) {
        groupRef.current.position.set(x, y, z);
      }
    }

    if (timeElapsed.current < 0.5) {
      // Primer fila de abajo avanza uno en z+
      const rotationAngle = -(timeElapsed.current / 1) * Math.PI;

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 0.5 && timeElapsed.current < 1) {
      // Primer fila de abajo avanza uno en y+
      // Segunda fila de abajo avanza uno en z+

      const rotationAngle = -(timeElapsed.current - 0.5) * Math.PI;

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 1 && timeElapsed.current < 1.5) {
      // Primer fila de abajo avanza dos en y+
      // Segunda fila de abajo avanza dos en z+
      // Tercer fila de abajo avanza uno en z+
      const rotationAngle = -(timeElapsed.current - 1) * Math.PI;

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 1.5 && timeElapsed.current < 2) {
      // Primer fila de abajo avanza tres en y+
      // Segunda fila de abajo avanza uno en y+
      // Tercer fila de abajo avanza dos en z+
      const rotationAngle = -(timeElapsed.current - 1.5) * Math.PI;

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 2 && timeElapsed.current < 2.5) {
      // Primer fila de abajo avanza uno en z-
      // Segunda fila de abajo avanza dos en y+
      // Tercer fila de abajo avanza tres en z+
      const rotationAngle = -(timeElapsed.current - 2) * Math.PI;

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 2.5 && timeElapsed.current < 3) {
      // Primer fila de abajo avanza dos en z-
      // Segunda fila de abajo avanza tres en y+
      // Tercer fila de abajo avanza uno en y+
      const rotationAngle = -(timeElapsed.current - 2.53) * Math.PI;

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 3 && timeElapsed.current < 3.5) {
      // Primer fila de abajo avanza tres en z-
      // Segunda fila de abajo avanza uno en z-
      // Tercer fila de abajo avanza dos en y+
      const rotationAngle = -(timeElapsed.current - 3) * Math.PI;

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 3.5 && timeElapsed.current < 4) {
      // Segunda fila de abajo avanza dos en z-
      // Tercer fila de abajo avanza tres en y+
      // Primer fila de en medio avanza uno en z+
      const rotationAngle = -(timeElapsed.current - 3) * Math.PI;

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 4 && timeElapsed.current < 4.5) {
      // Tercer fila de abajo avanza uno en z-
      // Primer fila de en medio avanza uno en y+
      // Segunda fila de en medio avanza uno en z+
      const rotationAngle = -(timeElapsed.current - 4) * Math.PI;

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 4.5 && timeElapsed.current < 5) {
      // Primer fila de en medio avanza dos en y+
      // Segunda fila de en medio avanza dos en z+
      // Tercera fila de en medio avanza uno en z+
      const rotationAngle = -(timeElapsed.current - 4.5) * Math.PI;

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 5 && timeElapsed.current < 5.5) {
      // Primer fila de en medio avanza tres en y+
      // Segunda fila de en medio avanza uno en y+
      // Tercera fila de en medio avanza dos en z+
      const rotationAngle = -(timeElapsed.current - 5) * Math.PI;

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 5.5 && timeElapsed.current < 6) {
      // Primer fila de en medio avanza uno en z-
      // Segunda fila de en medio avanza dos en y+
      // Tercera fila de en medio avanza tres en z+
      const rotationAngle = -(timeElapsed.current - 5.5) * Math.PI;

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 6 && timeElapsed.current < 6.5) {
      // Primer fila de en medio avanza dos en z-
      // Segunda fila de en medio avanza tres en y+
      // Tercera fila de en medio avanza uno en y+
      const rotationAngle = -(timeElapsed.current - 6) * Math.PI;

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 6.5 && timeElapsed.current < 7) {
      // Primer fila de en medio avanza tres en z-
      // Segunda fila de en medio avanza uno en z-
      // Tercera fila de en medio avanza dos en y+
      const rotationAngle = -(timeElapsed.current - 6.5) * Math.PI;

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 7 && timeElapsed.current < 7.5) {
      // Segunda fila de en medio avanza dos en z-
      // Tercera fila de en medio avanza tres en y+
      // Primera fila de arriba avanza uno en z+
      const rotationAngle = -(timeElapsed.current - 7) * Math.PI;

      if (iy === 0 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 7.5 && timeElapsed.current < 8) {
      // Tercera fila de en medio avanza uno en z-
      // Primera fila de arriba avanza uno en y+
      // Segunda fila de arriba avanza uno en z+
      const rotationAngle = -(timeElapsed.current - 7.5) * Math.PI;

      if (iy === 0 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
      if (iy === 1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 8 && timeElapsed.current < 8.5) {
      // Primera fila de arriba avanza dos en y+
      // Segunda fila de arriba avanza dos en z+
      // Tercera fila de arriba avanza uno en z+
      const rotationAngle = -(timeElapsed.current - 8) * Math.PI;

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
      if (iy === 1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
      if (iy === 1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 8.5 && timeElapsed.current < 9) {
      // Primera fila de arriba avanza tres en y+
      // Segunda fila de arriba avanza uno en y+
      // Tercera fila de arriba avanza dos en z+
      const rotationAngle = -(timeElapsed.current - 8.5) * Math.PI;

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
      if (iy === 1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
      if (iy === 1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 9 && timeElapsed.current < 9.5) {
      // Primera fila de arriba avanza uno en z-
      // Segunda fila de arriba avanza dos en y+
      // Tercera fila de arriba avanza tres en z+
      const rotationAngle = -(timeElapsed.current - 9) * Math.PI;

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
      if (iy === 1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
      if (iy === 1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 9.5 && timeElapsed.current < 10) {
      // Primera fila de arriba avanza dos en z-
      // Segunda fila de arriba avanza tres en y+
      // Tercera fila de arriba avanza uno en y+
      const rotationAngle = -(timeElapsed.current - 9.5) * Math.PI;

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
      if (iy === 1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
      if (iy === 1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 10 && timeElapsed.current < 10.5) {
      // Primera fila de arriba avanza tres en z-
      // Segunda fila de arriba avanza uno en z-
      // Tercera fila de arriba avanza dos en y+
      const rotationAngle = -(timeElapsed.current - 10) * Math.PI;

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
      if (iy === 1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
      if (iy === 1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 10.5 && timeElapsed.current < 11) {
      // Segunda fila de arriba avanza dos en z-
      // Tercera fila de arriba avanza tres en y+
      const rotationAngle = -(timeElapsed.current - 10.5) * Math.PI;

      if (iy === 1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
      if (iy === 1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 11 && timeElapsed.current < 11.5) {
      // Tercera fila de arriba avanza uno en z-
      const rotationAngle = -(timeElapsed.current - 11) * Math.PI;

      if (iy === 1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta * 2;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    }
  });

  // Aplicar las posiciones x, y, z al grupo
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  }, [x, y, z]);

  return (
    <group ref={groupRef} key={`${x}-${y}-${z}`}>
      <Box
        ref={boxRef}
        // Clave única para React
        args={[1, 1, 1]} // Tamaño del cubo: 1x1x1
      >
        <meshPhongMaterial attach="material">
          <GradientTexture stops={[0, 1]} colors={["#ef37ef", "#b568ee"]} />
        </meshPhongMaterial>

        <Edges color="#ffffff" />
      </Box>
    </group>
  );
}

export default SingleCube;
