"use client";
import React from "react";
import { Plane } from "@/components/PlaneBlock/constants";

interface EnemyPlanesInfoProps {
  enemyPlanes: Plane[];
}

const EnemyPlanesInfo: React.FC<EnemyPlanesInfoProps> = ({ enemyPlanes }) => {
  return (
    <div className="w-full max-w-md mx-auto my-4 p-4 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-center text-lg font-bold mb-4">Enemy Planes Info</h2>
      <table className="w-full text-left table-fixed">
        <thead>
          <tr>
            <th className="w-1/4 p-2 border-b border-gray-600">Plane</th>
            <th className="w-1/2 p-2 border-b border-gray-600">Position</th>
            <th className="w-1/4 p-2 border-b border-gray-600">Direction</th>
          </tr>
        </thead>
        <tbody>
          {enemyPlanes.map((plane, index) => (
            <tr key={index} className="bg-gray-700 even:bg-gray-600">
              <td className="p-1 font-bold text-center">Plane {index + 1}</td>
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
