export interface FormState {
  initialX: string;
  initialY: string;
  initialZ: string;
  angle: string;
  velocity: string;
  theta: string; // Ángulo en el plano XZ
  mass: string;
  gravity: string;
}

export const defaultState: FormState = {
  initialX: "0",
  initialY: "0",
  initialZ: "0",
  angle: "45",
  velocity: "20",
  theta: "0", // Dirección inicial en el plano XZ
  mass: "1",
  gravity: "9.81",
};
