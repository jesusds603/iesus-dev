import { Canvas } from "@react-three/fiber";
import React from "react";
import { MovingSphere } from "./MovingSphere";
import { OrbitControls, Plane, GradientTexture, Grid, Sky, Stars } from "@react-three/drei";
import Spaceship from "./SpaceShip/SpaceShip";
import * as THREE from "three";
import { FormState } from "./constants";
import { TouchControls } from "./SpaceShip/TouchControls";

function CanvasC({
  formState,
  simulationRunning,
  resetSimulation,
}: {
  formState: FormState;
  simulationRunning: boolean;
  resetSimulation: () => void;
}) {
  return (
    <div className="flex flex-col w-full">
    <Canvas
      style={{
        height: "60vh", // Altura relativa a la ventana
        width: "100%",
        minHeight: "500px", // Altura mínima aumentada
        maxHeight: "800px", // Altura máxima para pantallas grandes
      }}
      camera={{ position: [0, 20, 35], fov: 45 }} // Cámara más alta para mejor vista
    >
      {/* Iluminación mejorada */}
      <ambientLight intensity={0.5} />
      <pointLight position={[15, 25, 15]} intensity={1.0} color="#4f46e5" />
      <pointLight position={[-15, 15, -15]} intensity={0.7} color="#ec4899" />
      <pointLight position={[0, 10, 20]} intensity={0.6} color="#06b6d4" />
      <directionalLight
        position={[10, 20, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Skybox futurista optimizado */}
      <Sky 
        distance={300000}
        sunPosition={[5, 10, 5]}
        inclination={0.2}
        azimuth={0.25}
        mieCoefficient={0.005}
        mieDirectionalG={0.7}
        rayleigh={0.5}
        turbidity={8}
      />
      
      {/* Estrellas de fondo optimizadas */}
      <Stars 
        radius={200}
        depth={30}
        count={3000}
        factor={3}
        saturation={0.1}
        fade 
        speed={0.3}
      />

      {/* Planos de fondo optimizados para la nueva altura */}
      <group>
        {/* Plano principal más grande */}
        <Plane
          args={[300, 300, 60, 60]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -5, 0]}
          receiveShadow
        >
          <meshPhongMaterial 
            attach="material" 
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
            shininess={30}
          >
            <GradientTexture 
              stops={[0, 0.4, 0.8, 1]} 
              colors={["#0f172a", "#1e1b4b", "#312e81", "#4f46e5"]}
              size={1024}
            />
          </meshPhongMaterial>
        </Plane>

        {/* Grid interactivo más visible */}
        <Grid
          position={[0, -4.95, 0]}
          args={[300, 300]}
          cellSize={5}
          cellThickness={1.2}
          cellColor="#06b6d4"
          sectionSize={15}
          sectionThickness={2}
          sectionColor="#8b5cf6"
          fadeDistance={200}
          fadeStrength={1.5}
          infiniteGrid
        />

        {/* Planos de energía reposicionados */}
        <Plane
          args={[120, 120]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 50, 0]}
        >
          <meshBasicMaterial
            attach="material"
            side={THREE.DoubleSide}
            transparent
            opacity={0.25}
            color="#ec4899"
          />
        </Plane>

        <Plane
          args={[100, 100]}
          rotation={[-Math.PI / 2.3, 0.4, 0]}
          position={[30, 80, -40]}
        >
          <meshBasicMaterial
            attach="material"
            side={THREE.DoubleSide}
            transparent
            opacity={0.15}
            color="#8b5cf6"
          />
        </Plane>
      </group>

      {/* Ejes de referencia optimizados */}
      <group>
        {/* Eje X - Cyan (más largo) */}
        <mesh position={[150, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 300, 12]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
        
        {/* Eje Z - Purple (más largo) */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0, 150]}>
          <cylinderGeometry args={[0.15, 0.15, 300, 12]} />
          <meshBasicMaterial color="#8b5cf6" />
        </mesh>
        
        {/* Eje Y - Pink (más largo) */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 150, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 300, 12]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>

        {/* Marcadores de ejes mejorados */}
        {[-150, -100, -50, 50, 100, 150].map((pos) => (
          <group key={pos}>
            {/* Marcadores eje X */}
            <mesh position={[pos, 1, 0]}>
              <boxGeometry args={[0.8, 2, 0.8]} />
              <meshBasicMaterial color="#06b6d4" />
            </mesh>
            {/* Marcadores eje Z */}
            <mesh position={[0, 1, pos]}>
              <boxGeometry args={[0.8, 2, 0.8]} />
              <meshBasicMaterial color="#8b5cf6" />
            </mesh>
            {/* Marcadores eje Y */}
            <mesh position={[0, pos, 0]}>
              <boxGeometry args={[0.8, 2, 0.8]} />
              <meshBasicMaterial color="#ec4899" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Partículas flotantes optimizadas */}
      <group>
        {Array.from({ length: 40 }, (_, i) => {
          const angle = (i / 40) * Math.PI * 2;
          const radius = 60 + Math.random() * 80;
          const height = 20 + Math.random() * 60;
          
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                height,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[0.4 + Math.random() * 0.8, 12, 12]} />
              <meshBasicMaterial 
                color={i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#8b5cf6" : "#ec4899"}
                transparent
                opacity={0.5 + Math.random() * 0.3}
              />
            </mesh>
          );
        })}
      </group>

      {/* Esfera de energía central reposicionada */}
      <mesh position={[0, 25, 0]}>
        <sphereGeometry args={[12, 36, 36]} />
        <meshBasicMaterial
          color="#4f46e5"
          transparent
          opacity={0.08}
          wireframe
          wireframeLinewidth={1.5}
        />
      </mesh>

      {/* Objetos de simulación */}
      <MovingSphere
        formState={formState}
        startSimulation={simulationRunning}
        resetSimulation={resetSimulation}
      />
      
      <Spaceship />

      {/* Controles de cámara optimizados */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={true}
        minDistance={8}
        maxDistance={250}
        rotateSpeed={0.4}
        zoomSpeed={0.7}
        panSpeed={0.6}
        target={[0, 10, 0]}
        enableDamping={true}
        dampingFactor={0.05}
      />

      {/* Efectos atmosféricos mejorados */}
      <fog attach="fog" args={['#0f172a', 80, 300]} />
      
      {/* Efectos de post-procesado básicos */}
      <color attach="background" args={['#0f172a']} />
    </Canvas>

    {/* Controles táctiles debajo del Canvas */}
      <div className="flex justify-center p-4 bg-gradient-to-t from-gray-900 to-transparent">
        <TouchControls />
      </div>
    </div>
  );
}

export default CanvasC;