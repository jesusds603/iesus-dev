import React from "react";
import { StyledInput } from "./StyledInput";
import { InlineMath } from "react-katex";
import { FormState } from "./constants";

function InitialConfiguration({
  formState,
  handleChange,
  handleStartSimulation,
}: {
  formState: FormState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartSimulation: () => void;
}) {
  return (
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
  );
}

export default InitialConfiguration;
