import React from "react";

interface CellSizeSelectorProps {
  cellSize: number;
  onChange: (size: number) => void;
}

const CellSizeSelector: React.FC<CellSizeSelectorProps> = ({
  cellSize,
  onChange,
}) => {
  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(event.target.value));
  };

  return (
    <div className="my-2">
      <label className="mr-2 font-semibold">Tamaño de celda:</label>
      <select
        value={cellSize}
        onChange={handleSizeChange}
        className="p-2 border border-gray-300 rounded bg-white text-gray-700"
      >
        {Array.from({ length: 21 }, (_, i) => i + 10).map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CellSizeSelector;
