"use client";
import React from "react";
import { Plane } from "@/components/PlaneBlock/constants";
import { useLanguage } from "@/hooks/useLanguage";

interface EnemyPlanesInfoProps {
  enemyPlanes: Plane[];
}

const EnemyPlanesInfo: React.FC<EnemyPlanesInfoProps> = ({ enemyPlanes }) => {
  const { myLanguage } = useLanguage();

  return (
    <div className="w-full max-w-md mx-auto my-4 p-4 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-center text-lg font-bold mb-4">
        {myLanguage === "eng"
          ? "Enemy Planes Info"
          : "Información de los aviones enemigos"}
      </h2>
      <table className="w-full text-left table-fixed">
        <thead>
          <tr>
            <th className="w-1/4 p-2 border-b border-gray-600">
              {myLanguage === "eng" ? "Plane" : "Avión"}
            </th>
            <th className="w-1/2 p-2 border-b border-gray-600">
              {myLanguage === "eng" ? "Position" : "Posición"}
            </th>
            <th className="w-1/4 p-2 border-b border-gray-600">
              {myLanguage === "eng" ? "Direction" : "Dirección"}
            </th>
          </tr>
        </thead>
        <tbody>
          {enemyPlanes.map((plane, index) => (
            <tr key={index} className="bg-gray-700 even:bg-gray-600">
              <td className="p-1 font-bold text-center">
                {myLanguage === "eng" ? "Plane" : "Avión"} {index + 1}
              </td>
              <td className="p-1 text-center">
                ({plane.position.x}, {plane.position.y})
              </td>
              <td className="p-1 text-center">{plane.direction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnemyPlanesInfo;
