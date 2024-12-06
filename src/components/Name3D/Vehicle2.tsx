import type { BoxProps, WheelInfoOptions } from "@react-three/cannon";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { Chassis2 } from "./Chassis2";
import { Wheel2 } from "./Wheel2";

export type VehicleProps = Required<
  Pick<BoxProps, "angularVelocity" | "position" | "rotation">
> & {
  back?: number;
  force?: number;
  front?: number;
  height?: number;
  maxBrake?: number;
  radius?: number;
  steer?: number;
  width?: number;
};

function Vehicle2({
  angularVelocity,
  back = -1.15,
  force = -2000,
  front = 1.3,
  height = -0.04,
  maxBrake = 50,
  position,
  radius = 0.5,
  rotation,
  steer = 0.5,
  width = 1.2,
}: VehicleProps) {
  const scale = 1;
  const chassisDimensions: [number, number, number] = [
    1.8 * scale,
    1.5 * scale,
    4.1 * scale,
  ]; // [Width, Height, Length]
  const radiusW = scale * radius;

  const wheels = [
    useRef<Group>(null),
    useRef<Group>(null),
    useRef<Group>(null),
    useRef<Group>(null),
  ];

  const wheelInfo: WheelInfoOptions = {
    axleLocal: [-1.2, 0, 0], // This is inverted for asymmetrical wheel models (left v. right sided)
    customSlidingRotationalSpeed: -30,
    dampingCompression: 4.4,
    dampingRelaxation: 10,
    directionLocal: [0, -1, 0], // set to same as Physics Gravity
    frictionSlip: 1,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    radius: radiusW * 0.8,
    suspensionRestLength: 0.3,
    suspensionStiffness: 30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfo1: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [
      -chassisDimensions[0] * 0.55,
      -scale / 2,
      chassisDimensions[2] * 0.3,
    ],
    isFrontWheel: true,
  };
  const wheelInfo2: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [
      chassisDimensions[0] * 0.55,
      -scale / 2,
      chassisDimensions[2] * 0.3,
    ],
    isFrontWheel: true,
  };
  const wheelInfo3: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [
      -chassisDimensions[0] * 0.55,
      -scale / 2,
      -chassisDimensions[2] * 0.3,
    ],
    isFrontWheel: false,
  };
  const wheelInfo4: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [
      chassisDimensions[0] * 0.55,
      -scale / 2,
      -chassisDimensions[2] * 0.3,
    ],
    isFrontWheel: false,
  };

  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      angularVelocity,
      args: chassisDimensions,
      mass: 1000,
      // onCollide: (e) => console.log("bonk", e.body.userData),
      position,
      rotation,
    }),
    useRef<Mesh>(null)
  );

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
      wheels,
    }),
    useRef<Group>(null)
  );

  const [currentStep, setCurrentStep] = useState(0); // Paso actual en la secuencia
  const timeElapsed = useRef(0); // Tiempo transcurrido dentro del paso actual

  const sequence = [
    { force: -1000, steering: 0.0, duration: 4 },
    { force: -800, steering: 0.1, duration: 2 },
    { force: -900, steering: 0.2, duration: 4 },
    { force: -900, steering: 0.1, duration: 3 },
    { force: -1200, steering: 0.1, duration: 3 },
    { force: -1000, steering: 0.1, duration: 4 },
    { force: -1100, steering: 0.2, duration: 4 },
  ];

  useFrame((_, delta) => {
    const step = sequence[currentStep];
    if (!step) return;

    timeElapsed.current += delta;

    // Aplicar fuerza y dirección de giro
    vehicleApi.applyEngineForce(step.force, 2); // Llanta trasera izquierda
    vehicleApi.applyEngineForce(step.force, 3); // Llanta trasera derecha
    vehicleApi.setSteeringValue(step.steering, 0); // Llanta delantera izquierda
    vehicleApi.setSteeringValue(step.steering, 1); // Llanta delantera derecha

    // Verificar si hemos completado el intervalo del paso actual
    if (timeElapsed.current >= step.duration) {
      timeElapsed.current = 0; // Reiniciar el tiempo transcurrido
      setCurrentStep((prev) => (prev + 1) % sequence.length); // Siguiente paso o reiniciar

      if (currentStep === sequence.length - 1) {
        // Reiniciar posición al finalizar la secuencia
        chassisApi.position.set(-30, 1, 0);
        chassisApi.rotation.set(0, 0, 0);
        chassisApi.velocity.set(0, 0, 0);
        chassisApi.angularVelocity.set(0, 0, 0);
      }
    }
  });

  return (
    <group ref={vehicle}>
      <Chassis2 ref={chassisBody} dimensions={chassisDimensions} />
      <Wheel2
        ref={wheels[0]}
        radius={radiusW}
        chassisDimensions={chassisDimensions}
        leftSide
      />
      <Wheel2
        ref={wheels[1]}
        radius={radiusW}
        chassisDimensions={chassisDimensions}
      />
      <Wheel2
        ref={wheels[2]}
        radius={radiusW}
        chassisDimensions={chassisDimensions}
        leftSide
      />
      <Wheel2
        ref={wheels[3]}
        radius={radiusW}
        chassisDimensions={chassisDimensions}
      />
    </group>
  );
}

export default Vehicle2;
