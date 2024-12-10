"use client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import "tailwindcss/tailwind.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const collatzSequence = (n: number): number[] => {
  const sequence = [];
  while (n !== 1 && n > 1) {
    sequence.push(n);
    if (n % 2 === 0) {
      n = Math.floor(n / 2);
    } else {
      n = 3 * n + 1;
    }
  }
  if (n === 1) {
    sequence.push(1);
  }
  return sequence;
};

const Page: React.FC = () => {
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();
  const [number, setNumber] = useState<number>(10);
  const [sequence, setSequence] = useState<number[]>([]);
  const [tableData, setTableData] = useState<{ step: number; value: number }[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const generateGraph = () => {
    if (number < 1) {
      setError(
        myLanguage === "eng"
          ? "Enter a number greater than 0."
          : "Ingrese un número mayor que 0."
      );
      setSequence([]);
      setTableData([]);
      return;
    }

    setError(null);
    const seq = collatzSequence(number);
    setSequence(seq);
    const data = seq.map((value, index) => ({ step: index + 1, value }));
    setTableData(data);
  };

  const maxIndex = sequence.indexOf(Math.max(...sequence));

  const chartData = {
    labels: sequence.map((_, index) => index + 1),
    datasets: [
      {
        label: "Collatz",
        data: sequence,
        borderColor:
          myTheme === "dark"
            ? "rgba(54, 162, 235, 0.6)" // Gráfica
            : "rgba(54, 162, 235, 1)",
        backgroundColor:
          myTheme === "dark"
            ? "rgba(54, 162, 235, 0.5)"
            : "rgba(234, 180, 247, 1)",
        pointBackgroundColor: sequence.map((_, index) =>
          index === maxIndex
            ? "#ff33ff"
            : myTheme === "dark"
            ? "white"
            : "black"
        ),
        pointBorderColor:
          myTheme === "dark"
            ? "rgba(54, 162, 235, 0.2)"
            : "rgba(54, 162, 235, 1)",
        pointRadius: sequence.map((_, index) => (index === maxIndex ? 5 : 3)),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: myLanguage === "eng" ? "Steps" : "Pasos",
          color: myTheme === "dark" ? "#ffffff" : "#000000",
        },
      },
      y: {
        title: {
          display: true,
          text: myLanguage === "eng" ? "Value" : "Valor",
          color: myTheme === "dark" ? "#ffffff" : "#000000",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: myTheme === "dark" ? "#ffffff" : "#000000",
        },
      },
    },
  };

  const columns = Math.ceil(tableData.length / 10);
  const rows = 10;

  const themeClasses =
    myTheme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black";
  const borderClasses =
    myTheme === "dark" ? "border-teal-400" : "border-gray-400";
  const buttonClasses =
    myTheme === "dark" ? "bg-teal-400 text-white" : "bg-teal-700 text-white";

  return (
    <div className={`mx-auto p-1 min-h-screen `}>
      <h1 className="text-3xl font-bold text-center mb-4">
        {myLanguage === "eng"
          ? "Collatz Conjecture Graph"
          : "Gráfico de la Conjetura de Collatz"}
      </h1>

      <div className="flex flex-col items-center mb-4">
        <input
          type="number"
          className={`p-2 m-2 border ${borderClasses} rounded ${themeClasses}`}
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />
        <button
          onClick={generateGraph}
          className={`p-2 m-2 rounded ${buttonClasses}`}
        >
          {myLanguage === "eng" ? "Generate Graph" : "Generar Gráfico"}
        </button>
      </div>

      {error ? (
        <div className="text-red-500 text-center mb-4">{error}</div>
      ) : (
        <>
          <div
            className={`p-4 rounded-xl border ${borderClasses} ${themeClasses} mb-4 w-full`}
            style={{ height: "500px" }}
          >
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className={`text-lg `}>
            {myLanguage === "eng" ? (
              <span>
                The{" "}
                <span className="font-bold text-yellow-400">
                  Collatz Conjecture
                </span>{" "}
                is a mathematical hypothesis that suggests that starting with
                any positive integer, if the number is even, divide it by 2, and
                if it's odd, multiply it by 3 and add 1. The conjecture claims
                that, no matter the starting number, the sequence will always
                eventually reach 1.
              </span>
            ) : (
              <span>
                La{" "}
                <span className="font-bold text-yellow-400">
                  Conjetura de Collatz
                </span>{" "}
                es una hipótesis matemática que sugiere que, comenzando con
                cualquier número entero positivo, si el número es par, divídelo
                entre 2, y si es impar, multiplícalo por 3 y súmale 1. La
                conjetura afirma que, sin importar el número inicial, la
                secuencia siempre llegará eventualmente al 1.
              </span>
            )}
          </div>

          <div className=" p-4 rounded-md font-mono">
            <BlockMath math="n_0 = \text{initial number}" />
            <BlockMath
              math="n_{k+1} = \left\{
          \begin{array}{ll}
          \frac{n_k}{2} & \text{if } n_k \text{ is even} \\
          3n_k + 1 & \text{if } n_k \text{ is odd}
          \end{array}
        \right."
            />

            <p>
              {" "}
              {myLanguage === "eng"
                ? "The sequence continues until "
                : "La sucesión termina hasta que "}{" "}
              <InlineMath math=" n_k = 1." />
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${borderClasses} w-full`}>
            <h2 className="text-xl font-semibold text-teal-400 mb-2 text-center">
              {myLanguage === "eng"
                ? "Sequence Steps"
                : "Pasos de la Secuencia"}
            </h2>

            <div className="flex flex-wrap">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <table
                  className={`table-auto m-2 border ${borderClasses}`}
                  key={colIndex}
                >
                  <thead>
                    <tr>
                      <th className={`border ${borderClasses} px-4 py-2`}>
                        {myLanguage === "eng" ? "Step" : "Paso"}
                      </th>
                      <th className={`border ${borderClasses} px-4 py-2`}>
                        {myLanguage === "eng" ? "Value" : "Valor"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData
                      .slice(colIndex * rows, (colIndex + 1) * rows)
                      .map((data) => (
                        <tr
                          key={data.step}
                          className={
                            data.value === Math.max(...sequence)
                              ? "bg-ff33ff"
                              : ""
                          }
                        >
                          <td className={`border ${borderClasses} px-4 py-2`}>
                            {data.step}
                          </td>
                          <td className={`border ${borderClasses} px-4 py-2`}>
                            {data.value}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
