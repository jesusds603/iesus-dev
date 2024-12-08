"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls, Plane, Line } from "@react-three/drei";
import { Vector3 } from "three";
import * as THREE from "three";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import Spaceship from "@/components/SpaceShip";
import { useShip } from "../../../context/useShip";
import { useSphere } from "../../../context/useSphere";

interface FormState {
  initialX: string;
  initialY: string;
  initialZ: string;
  angle: string;
  velocity: string;
  theta: string; // Ángulo en el plano XZ
  mass: string;
  gravity: string;
}

const defaultState: FormState = {
  initialX: "0",
  initialY: "0",
  initialZ: "0",
  angle: "45",
  velocity: "10",
  theta: "0", // Dirección inicial en el plano XZ
  mass: "1",
  gravity: "9.81",
};

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

const StyledInput: React.FC<StyledInputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-row items-center mt-1 w-full">
      <label className="text-teal-200 font-semibold mr-2">{label}:</label>
      <input
        {...props}
        className="p-1 rounded-lg bg-gray-700 text-white border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-[50px]"
      />
    </div>
  );
};

const MovingSphere = ({
  formState,
  startSimulation,
  resetSimulation,
}: {
  formState: FormState;
  startSimulation: boolean;
  resetSimulation: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [time, setTime] = useState(0);
  const [trajectory, setTrajectory] = useState<THREE.Vector3[]>([]);
  const [maxPosition, setMaxPosition] = useState<{
    x: number;
    y: number;
    z: number;
  } | null>(null);
  const { updatePosSphere, updateTimeS } = useSphere();

  useEffect(() => {
    if (startSimulation) {
      setTime(0);
      setTrajectory([]);
      setMaxPosition(null);
      if (meshRef.current) {
        meshRef.current.position.set(
          parseFloat(formState.initialX),
          parseFloat(formState.initialY),
          parseFloat(formState.initialZ)
        );
      }
    }
  }, [
    startSimulation,
    formState.initialX,
    formState.initialY,
    formState.initialZ,
  ]);

  useFrame(() => {
    if (startSimulation && meshRef.current) {
      const t = time + 0.02;
      const angle = parseFloat(formState.angle);
      const theta = parseFloat(formState.theta);
      const velocity = parseFloat(formState.velocity);
      const gravity = parseFloat(formState.gravity);
      const mass = parseFloat(formState.mass);

      const v0x =
        velocity *
        Math.cos((angle * Math.PI) / 180) *
        Math.cos((theta * Math.PI) / 180);
      const v0z =
        velocity *
        Math.cos((angle * Math.PI) / 180) *
        Math.sin((theta * Math.PI) / 180);
      const v0y = velocity * Math.sin((angle * Math.PI) / 180);

      const x = parseFloat(formState.initialX) + v0x * t;
      const z = parseFloat(formState.initialZ) + v0z * t;
      let y = parseFloat(formState.initialY) + v0y * t - 0.5 * gravity * t * t;

      const vx = v0x;
      const vy = v0y - gravity * t;
      const vz = v0z;
      const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);

      let kineticEnergy = 0.5 * mass * speed * speed;
      let potentialEnergy = mass * gravity * y;

      const tFloor =
        (parseFloat(formState.velocity) *
          Math.sin((parseFloat(formState.angle) * Math.PI) / 180) +
          Math.sqrt(
            (parseFloat(formState.velocity) *
              Math.sin((parseFloat(formState.angle) * Math.PI) / 180)) **
              2 +
              2 * parseFloat(formState.gravity) * parseFloat(formState.initialY)
          )) /
        parseFloat(formState.gravity);
      const xFloor = parseFloat(formState.initialX) + v0x * tFloor;
      const zFloor = parseFloat(formState.initialZ) + v0z * tFloor;

      if (y >= 0) {
        meshRef.current.position.set(x, y, z);
        setTrajectory((old) => [...old, new Vector3(x, y, z)]);
        setTime(t);
      } else {
        y = 0;
        potentialEnergy = 0;
        meshRef.current.position.set(x, y, z);
        setTime(t);
        resetSimulation(); //* Stop simulation
      }

      updatePosSphere({
        x: meshRef.current.position.x,
        y: meshRef.current.position.y,
        z: meshRef.current.position.z,
      });

      updateTimeS(t);

      const tMax = v0y > 0 ? v0y / gravity : 0; // Consideramos tMax solo si v0y es positivo
      const yMax =
        v0y > 0
          ? parseFloat(formState.initialY) + (v0y * v0y) / (2 * gravity)
          : parseFloat(formState.initialY); // Consideramos yMax solo si v0y es positivo

      if (t >= tMax && !maxPosition) {
        const xMax = parseFloat(formState.initialX) + v0x * tMax;
        const zMax = parseFloat(formState.initialZ) + v0z * tMax;
        setMaxPosition({ x: xMax, y: yMax, z: zMax });
      }
    }
  });

  return (
    <>
      <Sphere ref={meshRef} args={[1, 16, 16]}>
        <meshStandardMaterial color="red" />
      </Sphere>

      {trajectory.length > 1 && (
        <Line points={trajectory} color="yellow" lineWidth={2} />
      )}

      {maxPosition && (
        <Sphere
          position={[maxPosition.x, maxPosition.y, maxPosition.z]}
          args={[2, 16, 16]}
        >
          <meshStandardMaterial color="blue" />
        </Sphere>
      )}
    </>
  );
};

const Page = () => {
  const [formState, setFormState] = useState<FormState>(defaultState);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [sliderTime, setSliderTime] = useState(0);
  const { position, updatePosition } = useShip();
  const { posSphere, timeS } = useSphere();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleStartSimulation = () => {
    setSimulationRunning(true);
  };

  const resetSimulation = () => {
    setSimulationRunning(false);
  };

  const setShipPosition = (x: number, y: number, z: number) => {
    updatePosition({ x, y, z });
  };

  const v0x =
    parseFloat(formState.velocity) *
    Math.cos((parseFloat(formState.angle) * Math.PI) / 180) *
    Math.cos((parseFloat(formState.theta) * Math.PI) / 180);
  const v0z =
    parseFloat(formState.velocity) *
    Math.cos((parseFloat(formState.angle) * Math.PI) / 180) *
    Math.sin((parseFloat(formState.theta) * Math.PI) / 180);
  const v0y =
    parseFloat(formState.velocity) *
    Math.sin((parseFloat(formState.angle) * Math.PI) / 180);

  const tMax = v0y > 0 ? v0y / parseFloat(formState.gravity) : 0;
  const yMax =
    v0y > 0
      ? parseFloat(formState.initialY) +
        (v0y * v0y) / (2 * parseFloat(formState.gravity))
      : parseFloat(formState.initialY);

  const tFloor =
    (parseFloat(formState.velocity) *
      Math.sin((parseFloat(formState.angle) * Math.PI) / 180) +
      Math.sqrt(
        (parseFloat(formState.velocity) *
          Math.sin((parseFloat(formState.angle) * Math.PI) / 180)) **
          2 +
          2 * parseFloat(formState.gravity) * parseFloat(formState.initialY)
      )) /
    parseFloat(formState.gravity);
  const xFloor = parseFloat(formState.initialX) + v0x * tFloor;
  const zFloor = parseFloat(formState.initialZ) + v0z * tFloor;

  // Calcula la energía total inicial
  const initialVelocity = parseFloat(formState.velocity);
  const initialY = parseFloat(formState.initialY);
  const mass = parseFloat(formState.mass);
  const gravity = parseFloat(formState.gravity);

  const initialKineticEnergy = 0.5 * mass * Math.pow(initialVelocity, 2);
  const initialPotentialEnergy = mass * gravity * initialY;
  const totalEnergy = initialKineticEnergy + initialPotentialEnergy;

  // Valores ajustados para la posición final
  const finalY = posSphere.y < 0 ? 0 : posSphere.y;
  const finalKineticEnergy =
    posSphere.y <= 0
      ? totalEnergy
      : 0.5 *
        mass *
        (v0x * v0x +
          (v0y - gravity * timeS) * (v0y - gravity * timeS) +
          v0z * v0z);
  const finalPotentialEnergy =
    posSphere.y < 0 ? 0 : mass * gravity * posSphere.y;

  //* Para la calculadora que calcula valores en función de t
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderTime(parseFloat(e.target.value));
  };

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setSliderTime(newTime);
  };

  const calculateValuesAtTime = (t: number) => {
    const angle = parseFloat(formState.angle);
    const theta = parseFloat(formState.theta);
    const velocity = parseFloat(formState.velocity);
    const gravity = parseFloat(formState.gravity);
    const mass = parseFloat(formState.mass);

    const v0x =
      velocity *
      Math.cos((angle * Math.PI) / 180) *
      Math.cos((theta * Math.PI) / 180);
    const v0z =
      velocity *
      Math.cos((angle * Math.PI) / 180) *
      Math.sin((theta * Math.PI) / 180);
    const v0y = velocity * Math.sin((angle * Math.PI) / 180);

    const x = parseFloat(formState.initialX) + v0x * t;
    const z = parseFloat(formState.initialZ) + v0z * t;
    let y = parseFloat(formState.initialY) + v0y * t - 0.5 * gravity * t * t;

    const vx = v0x;
    const vy = v0y - gravity * t;
    const vz = v0z;
    const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);

    let kineticEnergy = 0.5 * mass * speed * speed;
    let potentialEnergy = mass * gravity * y;

    // if (y < 0) {
    //   y = 0;
    //   potentialEnergy = 0;
    // }

    return {
      position: { x, y, z },
      velocity: { vx, vy, vz },
      kineticEnergy,
      potentialEnergy,
      totalEnergy: kineticEnergy + potentialEnergy,
    };
  };

  const valuesAtTime = calculateValuesAtTime(sliderTime);

  //* RETURN
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col rounded-xl border-2 border-teal-400 p-4 bg-gray-800 space-y-4 md:max-w-md mx-auto mt-4 w-full md:w-[200px]">
          <h2 className="text-xl font-semibold text-teal-400 mb-4 text-center">
            Configuración Inicial
          </h2>
          <StyledInput
            label={
              <>
                <InlineMath math="x_{0}" /> (m)
              </>
            }
            type="text"
            name="initialX"
            value={formState.initialX}
            onChange={handleChange}
          />
          <StyledInput
            label={
              <>
                <InlineMath math="y_{0}" /> (m)
              </>
            }
            type="text"
            name="initialY"
            value={formState.initialY}
            onChange={handleChange}
          />
          <StyledInput
            label={
              <>
                <InlineMath math="z_{0}" /> (m)
              </>
            }
            type="text"
            name="initialZ"
            value={formState.initialZ}
            onChange={handleChange}
          />
          <StyledInput
            label={
              <>
                <InlineMath math="\varphi" /> (°)
              </>
            }
            type="text"
            name="angle"
            value={formState.angle}
            onChange={handleChange}
          />
          <StyledInput
            label={
              <>
                <InlineMath math="v_{0}" /> (m/s)
              </>
            }
            type="text"
            name="velocity"
            value={formState.velocity}
            onChange={handleChange}
          />
          <StyledInput
            label={
              <>
                <InlineMath math="\theta" /> (°)
              </>
            }
            type="text"
            name="theta"
            value={formState.theta}
            onChange={handleChange}
          />
          <StyledInput
            label={
              <>
                <InlineMath math="m" /> (kg)
              </>
            }
            type="text"
            name="mass"
            value={formState.mass}
            onChange={handleChange}
          />
          <StyledInput
            label={
              <>
                <InlineMath math="g" /> (
                <InlineMath math="m/s^{2}" />)
              </>
            }
            type="text"
            name="gravity"
            value={formState.gravity}
            onChange={handleChange}
          />

          <button
            onClick={handleStartSimulation}
            className="w-full py-2 px-4 my-2 bg-[#280a7a] hover:bg-[#1C86EE] text-white font-semibold rounded-lg transition duration-300 ease-in-out"
          >
            Iniciar
          </button>
          {/* <button
            onClick={() =>
              setShipPosition(
                parseFloat(formState.initialX),
                parseFloat(formState.initialY) + 10,
                parseFloat(formState.initialZ)
              )
            }
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Posición Inicial + 10
          </button>

          <button
            onClick={() =>
              setShipPosition(
                parseFloat(formState.initialX) + v0x * tMax,
                yMax + 10,
                parseFloat(formState.initialZ) + v0z * tMax
              )
            }
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Altura Máxima + 10
          </button>

          <button
            onClick={() => setShipPosition(xFloor, 10, zFloor)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Posición Final + 10
          </button> */}
        </div>

        <div className="flex flex-col w-full mt-2 md:mt-0 md:ml-2">
          <div className="flex flex-wrap md:flex-nowrap">
            <div className="flex flex-col relative w-full md:w-[49%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400">
              <h2 className="text-lg font-semibold text-white mb-2">
                Información actual
              </h2>
              <div>
                <InlineMath math="t" />
                {`: ${timeS.toFixed(2)} `} <InlineMath math="s" />
              </div>
              <div className="break-words">
                Posición esfera: <InlineMath math="x" />
                {`: ${posSphere.x.toFixed(2)}, Y: ${posSphere.y.toFixed(
                  2
                )}, Z: ${posSphere.z.toFixed(2)}`}
              </div>
              <div className="break-words">
                Posición nave:
                {` X: ${position.x.toFixed(2)}, Y: ${position.y.toFixed(
                  2
                )}, Z: ${position.z.toFixed(2)}`}
              </div>
              <div className="break-words">{`Energía Cinética: ${finalKineticEnergy.toFixed(
                2
              )} J`}</div>
              <div className="break-words">{`Energía Potencial: ${finalPotentialEnergy.toFixed(
                2
              )} J`}</div>
              <div className="break-words">{`Energía Total: ${totalEnergy.toFixed(
                2
              )} J`}</div>
            </div>

            <div className="flex flex-col w-full md:w-[49%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400">
              <h2 className="text-lg font-semibold text-white mb-2">
                Información absoluta
              </h2>
              <div className="break-words">{`Altura máxima: ${yMax.toFixed(
                2
              )}`}</div>
              <div className="break-words">
                Posición máxima:
                {` X: ${(parseFloat(formState.initialX) + v0x * tMax).toFixed(
                  2
                )}, Y: ${(parseFloat(formState.initialZ) + v0z * tMax).toFixed(
                  2
                )}, Z: ${yMax.toFixed(2)}`}
              </div>
              <div className="break-words">{`Tiempo de altura máxima: ${tMax.toFixed(
                2
              )}`}</div>
              <div className="break-words">{`Posición final: ${xFloor.toFixed(
                2
              )}, ${zFloor.toFixed(2)}, 0`}</div>
              <div className="break-words">{`Tiempo de posición final: ${tFloor.toFixed(
                2
              )}`}</div>
              <div className="break-words">{`Energía Cinética Inicial: ${initialKineticEnergy} J`}</div>
              <div className="break-words">{`Energía Potencial Inicial: ${initialPotentialEnergy.toFixed(
                2
              )} J`}</div>
            </div>
          </div>

          <Canvas
            style={{
              height: "400px",
              width: "100%",
            }}
          >
            <ambientLight />
            <MovingSphere
              formState={formState}
              startSimulation={simulationRunning}
              resetSimulation={resetSimulation}
            />
            <OrbitControls />
            <Plane
              args={[100000, 100000]}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0, 0]}
            >
              <meshStandardMaterial
                attach="material"
                color="lightblue"
                side={THREE.DoubleSide}
              />
            </Plane>
            <gridHelper
              args={[100000, 100000, "#000000", "#CA49F9"]}
              position={[0, 0, 0]}
            />
            <Spaceship />
          </Canvas>
        </div>
      </div>

      <div className="w-full flex flex-col mt-4">
        <div className="w-full mt-4 px-4">
          <h1 className="text-xl font-bold text-teal-400 my-2">Calculadora</h1>
          <label htmlFor="timeSlider" className="text-white font-semibold">
            Tiempo (t): {sliderTime.toFixed(2)} s
          </label>
          <div className="flex flex-row">
            <p className="flex flex-row mr-2">
              0 <InlineMath math="s" />
            </p>
            <input
              id="timeSlider"
              type="range"
              min="0"
              max={tFloor}
              step="0.01"
              value={sliderTime}
              onChange={handleSliderChange}
              className="w-full mt-2"
            />

            <p className="flex flex-row ml-2">
              {tFloor.toFixed(2)}
              <InlineMath math="s" />
            </p>
          </div>

          <div className="mt-2">
            <label
              htmlFor="timeInput"
              className="text-white font-semibold mr-2"
            >
              Tiempo (t):
            </label>
            <input
              id="timeInput"
              type="number"
              min="0"
              max={tFloor}
              step="0.01"
              value={sliderTime}
              onChange={handleTimeInputChange}
              className="p-1 rounded-lg bg-gray-700 text-white border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-[100px]"
            />
          </div>
        </div>

        <div className="flex flex-col relative w-full md:w-[49%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400 mt-4 ">
          <h2 className="text-lg font-semibold text-white mb-2">
            Información a Tiempo <InlineMath math="t" />
          </h2>
          <div>
            <InlineMath math="t" /> = {sliderTime.toFixed(2)} s
          </div>
          <div className="break-words">
            {<InlineMath math="x" />} = {valuesAtTime.position.x.toFixed(2)},
            {"   "}
            {<InlineMath math="y" />} = {valuesAtTime.position.y.toFixed(2)},
            {"   "}
            {<InlineMath math="z" />} = {valuesAtTime.position.z.toFixed(2)}
          </div>
          <div className="break-words">
            {<InlineMath math="v_x" />} = {valuesAtTime.velocity.vx.toFixed(2)},
            {"   "}
            {<InlineMath math="v_y" />} = {valuesAtTime.velocity.vy.toFixed(2)},
            {"   "}
            {<InlineMath math="v_z" />} = {valuesAtTime.velocity.vz.toFixed(2)}
          </div>
          <div className="break-words">
            {" "}
            {<InlineMath math="v" />} ={" "}
            {Math.sqrt(
              valuesAtTime.velocity.vx ** 2 +
                valuesAtTime.velocity.vy ** 2 +
                valuesAtTime.velocity.vz ** 2
            ).toFixed(2)}
          </div>
          <div className="break-words">
            <InlineMath math="E_k" /> = {valuesAtTime.kineticEnergy.toFixed(2)}{" "}
            J
          </div>
          <div className="break-words">
            <InlineMath math="E_p" /> ={" "}
            {valuesAtTime.potentialEnergy.toFixed(2)} J
          </div>
          <div className="break-words">
            <InlineMath math="E_t" /> = {valuesAtTime.totalEnergy.toFixed(2)} J
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col">
        <h1 className="text-xl font-bold text-teal-400 my-2">Fórmulas</h1>
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="flex flex-col w-full md:w-[33%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400">
            <h2 className="text-lg font-semibold text-white mb-2">
              Velocidad Inicial
            </h2>
            <BlockMath math="v_{0x} = v_{0} \cdot \cos(\varphi) \cdot \cos(\theta)" />
            <BlockMath math="v_{0y} = v_{0} \cdot \sin(\varphi)" />
            <BlockMath math="v_{0z} = v_{0} \cdot \cos(\varphi) \cdot \sin(\theta)" />

            <h2 className="text-lg font-semibold text-white mb-2">Posición</h2>
            <BlockMath math="x(t) = x_0 + v_{0x} \cdot t" />
            <BlockMath math="y(t) = y_0 + v_{0y} \cdot t - \frac{1}{2} g t^2" />
            <BlockMath math="z(t) = z_0 + v_{0z} \cdot t" />

            <h2 className="text-lg font-semibold text-white mb-2">
              Velocidad en Función del Tiempo
            </h2>
            <BlockMath math="v_{x}(t) = v_{0x}" />
            <BlockMath math="v_{y}(t) = v_{0y} - g \cdot t" />
            <BlockMath math="v_{z}(t) = v_{0z}" />

            <h2 className="text-lg font-semibold text-white mb-2">Energía</h2>
            <BlockMath math="E_k = \frac{1}{2} m v^2" />
            <BlockMath math="E_p = m g y" />
            <BlockMath math="E_t = E_k + E_p" />
          </div>

          <div className="flex flex-col w-full md:w-[33%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400">
            <h2 className="text-lg font-semibold text-white mb-2">
              Altura Máxima
            </h2>
            <BlockMath math="y_{max} = y_0 + \frac{v_{0y}^2}{2g}" />
            <BlockMath math="t_{max} = \frac{v_{0y}}{g}" />
            <BlockMath math="x_{max} = x_0 + v_{0x} \cdot t_{max}" />
            <BlockMath math="z_{max} = z_0 + v_{0z} \cdot t_{max}" />
            <h2 className="text-lg font-semibold text-white mb-2">
              Velocidades en Altura Máxima
            </h2>
            <BlockMath math="v_{x}(t_{max}) = v_{0x}" />
            <BlockMath math="v_{y}(t_{max}) = 0" />
            <BlockMath math="v_{z}(t_{max}) = v_{0z}" />

            <BlockMath math="v(t_{max}) = \sqrt{v_{0x}^2 + v_{0z}^2}" />
          </div>

          <div className="flex flex-col w-full md:w-[33%] p-2 m-1 bg-black rounded-xl border-2 border-teal-400">
            <h2 className="text-lg font-semibold text-white mb-2">
              Posición Final
            </h2>
            <BlockMath math="x_{final} = x_0 + v_{0x} \cdot t_{floor}" />
            <BlockMath math="y_{final} = 0" />
            <BlockMath math="z_{final} = z_0 + v_{0z} \cdot t_{floor}" />
            <BlockMath math="t_{floor} = \frac{v_{0y} + \sqrt{v_{0y}^2 + 2gy_0}}{g}" />
            <h2 className="text-lg font-semibold text-white mb-2">
              Velocidades en Posición Final
            </h2>
            <BlockMath math="v_{x}(t_{floor}) = v_{0x}" />
            <BlockMath math="v_{y}(t_{floor}) = v_{0y} - g \cdot t_{floor}" />
            <BlockMath math="v_{z}(t_{floor}) = v_{0z}" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
