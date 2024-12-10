import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

function ReferencesSection() {
  const { myLanguage } = useLanguage(); // Obtenemos el idioma actual

  return (
    <div className="space-y-6">
      <div className="space-y-4 ">
        {/* Referencia 1 */}
        <div>
          <p className="font-semibold">
            {myLanguage === "eng"
              ? "Dr. Gabriel Purón Cid"
              : "Dr. Gabriel Purón Cid"}
          </p>
          <p>
            {myLanguage === "eng"
              ? "Director of the Central Region Headquarters of CIDE"
              : "Director de la sede Región Centro del CIDE"}
          </p>
          <p className="text-sm ">gabriel.puron@cide.edu</p>
        </div>

        {/* Referencia 2 */}
        <div>
          <p className="font-semibold">
            {myLanguage === "eng"
              ? "Mtro. Juan José Parres Córdova"
              : "Mtro. Juan José Parres Córdova"}
          </p>
          <p>
            {myLanguage === "eng"
              ? "State co-delegate of the OMM, Puebla"
              : "Codelegado estatal de la OMM, Puebla"}
          </p>
          <p className="text-sm ">parresmath@hotmail.com</p>
        </div>

        {/* Referencia 3 */}
        <div>
          <p className="font-semibold">
            {myLanguage === "eng"
              ? "Dr. María Araceli Juárez Ramírez"
              : "Dra. María Araceli Juárez Ramírez"}
          </p>
          <p>
            {myLanguage === "eng"
              ? "State delegate of the OMM, Puebla"
              : "Delegada estatal de la OMM, Puebla"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReferencesSection;
