// ParagraphPosition.tsx
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";

interface ParagraphPositionProps {
  position: { x: number; y: number };
}

const ParagraphPosition: React.FC<ParagraphPositionProps> = ({ position }) => {
  const { myLanguage } = useLanguage();
  const { myTheme } = useTheme();

  return (
    <p
      style={{
        color: myTheme === "dark" ? "white" : "black",
        backgroundColor:
          myTheme === "dark"
            ? "rgba(0, 0, 0, 0.5)"
            : "rgba(255, 255, 255, 0.8)",
        padding: "10px",
        borderRadius: "8px",
        position: "absolute",
        top: "10px",
        right: "10px",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      {myLanguage === "eng"
        ? `Position: [${position.x}, ${position.y}]`
        : `Posición: [${position.x}, ${position.y}]`}
    </p>
  );
};

export default ParagraphPosition;
