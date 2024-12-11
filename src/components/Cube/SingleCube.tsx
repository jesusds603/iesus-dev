import { Box, Edges, GradientTexture } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
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

    if (timeElapsed.current < 1) {
      const rotationAngle = -(timeElapsed.current / 1) * (Math.PI / 2);

      if (iy === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 1 && timeElapsed.current < 2) {
      const rotationAngle = -(timeElapsed.current - 1) * (Math.PI / 2);

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 2 && timeElapsed.current < 3) {
      const rotationAngle = -(timeElapsed.current - 2) * (Math.PI / 2);

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 3 && timeElapsed.current < 4) {
      const rotationAngle = -(timeElapsed.current - 3) * (Math.PI / 2);

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 4 && timeElapsed.current < 5) {
      const rotationAngle = -(timeElapsed.current - 4) * (Math.PI / 2);

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0) {
        if (groupRef.current) {
          groupRef.current.position.z += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 5 && timeElapsed.current < 6) {
      const rotationAngle = -(timeElapsed.current - 5) * (Math.PI / 2);

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz !== 1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 6 && timeElapsed.current < 7) {
      const rotationAngle = -(timeElapsed.current - 6) * (Math.PI / 2);

      if (iy === -1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === -1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 7 && timeElapsed.current < 8) {
      const rotationAngle = -(timeElapsed.current - 7) * (Math.PI / 2);

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 8 && timeElapsed.current < 9) {
      const rotationAngle = -(timeElapsed.current - 8) * (Math.PI / 2);

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 9 && timeElapsed.current < 10) {
      const rotationAngle = -(timeElapsed.current - 9) * (Math.PI / 2);

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz !== 1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 10 && timeElapsed.current < 11) {
      const rotationAngle = -(timeElapsed.current - 10) * (Math.PI / 2);

      if (iy === 0 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 0 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 11 && timeElapsed.current < 12) {
      const rotationAngle = -(timeElapsed.current - 11) * (Math.PI / 2);

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 12 && timeElapsed.current < 13) {
      const rotationAngle = -(timeElapsed.current - 12) * (Math.PI / 2);

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 13 && timeElapsed.current < 14) {
      const rotationAngle = -(timeElapsed.current - 13) * (Math.PI / 2);

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.y += delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }
    } else if (timeElapsed.current >= 14 && timeElapsed.current < 15) {
      const rotationAngle = -(timeElapsed.current - 14) * (Math.PI / 2);

      if (iy === 1 && iz === 1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === 0) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
        }

        if (boxRef.current) {
          boxRef.current.rotation.set(rotationAngle, 0, 0);
        }
      }

      if (iy === 1 && iz === -1) {
        if (groupRef.current) {
          groupRef.current.position.z -= delta;
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
