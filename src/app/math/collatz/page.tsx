"use client";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
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
    <div className={`mx-auto p-1 `}>
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
