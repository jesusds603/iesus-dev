import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";

export default function CarLoader() {
  const car = useLoader(OBJLoader, "/Porsche_911_GT2.obj");

  useEffect(() => {
    if (car && car.children.length > 17) {
      car.children[0].material = new THREE.MeshStandardMaterial({
        color: 0xc80eee,
      }); // *Parte baja Lateral Izq

      car.children[1].material = new THREE.MeshStandardMaterial({
        color: 0xc80eee,
      }); // *Parte Baja Lateral Der

      car.children[2].material = new THREE.MeshStandardMaterial({
        color: 0x667f7d,
      }); // *Cola Alta

      car.children[3].material = new THREE.MeshPhongMaterial({
        color: 0x21f0e2,
        opacity: 0.2,
        transparent: true,
      }); // *Espejos y Luces Delanteras

      car.children[5].material = new THREE.MeshStandardMaterial({
        color: 0xb10392,
      }); // *Partes Laterales Frontales

      car.children[6] = new THREE.MeshStandardMaterial({
        color: 0x7d054e,
      }); // *Cofre Delantero

      car.children[7].material = new THREE.MeshStandardMaterial({
        color: 0xf53e7e,
      }); // *Asientos

      car.children[8].material = new THREE.MeshStandardMaterial({
        color: 0xf53e7e,
      }); // *Puerta Izquierda y espejo

      car.children[17].material = new THREE.MeshStandardMaterial({
        color: 0xf53e7e,
      }); // *Puerta Derecha y Espejo

      car.children[9].material = new THREE.MeshStandardMaterial({
        color: 0x4e66f5,
      }); // *Parte Baja Trasera y Frontal

      car.children[14].material = new THREE.MeshStandardMaterial({
        color: 0xf03975,
      }); // *Cuerpo Superior y lateral trasero

      // Llantas
      car.children[15].material = new THREE.MeshStandardMaterial({
        color: 0x111111,
      }); // *Llanta Trasera Izquierda

      car.children[4].material = new THREE.MeshStandardMaterial({
        color: 0x111111,
      }); // *Llanta Trasera Derecha

      car.children[16].material = new THREE.MeshStandardMaterial({
        color: 0x111111,
      }); // *Llanta Delantera Izquierda

      car.children[18].material = new THREE.MeshStandardMaterial({
        color: 0x111111,
      }); // *LLanta Delantera Derecha

      // Frenos
      car.children[10].material = new THREE.MeshStandardMaterial({
        color: 0x999999,
      }); // *Freno llanta delantera izquierda

      car.children[11].material = new THREE.MeshStandardMaterial({
        color: 0x999999,
      }); // *Freno llanta trasera izquierda

      car.children[12].material = new THREE.MeshStandardMaterial({
        color: 0x999999,
      }); // *Freno llanta trasera derecha

      car.children[13].material = new THREE.MeshStandardMaterial({
        color: 0x999999,
      }); // *Freno llanta delantera derecha
    } else {
      console.error("No se pudo encontrar el objeto en car.children[17]");
    }
  }, [car]);

  // Devolver los grupos
  return car;
}

// Crear los grupos fuera de CarLoader
// const WheelsFront = new THREE.Group();
// WheelsFront.add(car.children[16]); // Llanta Delantera Izquierda
// WheelsFront.add(car.children[18]); // Llanta Delantera Derecha
// WheelsFront.add(car.children[10]); // Freno Delantero Izquierdo
// WheelsFront.add(car.children[13]); // Freno Delantero Derecho

// const WheelsBack = new THREE.Group();
// WheelsBack.add(car.children[15]); // Llanta Trasera Izquierda
// WheelsBack.add(car.children[4]); // Llanta Trasera Derecha
// WheelsBack.add(car.children[11]); // Freno Trasero Izquierdo
// WheelsBack.add(car.children[12]); // Freno Trasero Derecho

// const Chasis = new THREE.Group();
// Chasis.add(car.children[0]); // Parte baja Lateral Izq
// Chasis.add(car.children[1]); // Parte Baja Lateral Der
// Chasis.add(car.children[2]); // Cola Alta
// Chasis.add(car.children[3]); // Cola Alta
// Chasis.add(car.children[5]); // Cola Alta
// Chasis.add(car.children[6]); // Cola Alta
// Chasis.add(car.children[7]); // Cola Alta
// Chasis.add(car.children[8]); // Cola Alta
// Chasis.add(car.children[17]); // Cola Alta
// Chasis.add(car.children[14]); // Cola Alta
