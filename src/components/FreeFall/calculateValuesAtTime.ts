import { FormState } from "./constants";

export const calculateValuesAtTime = (t: number, formState: FormState) => {
  const angle = parseFloat(formState.angle);
  const theta = parseFloat(formState.theta);
  const velocity = parseFloat(formState.velocity);
  const gravity = parseFloat(formState.gravity);
  const mass = parseFloat(formState.mass);

  const v0x =
    velocity *
    Math.cos((angle * Math.PI) / 180) *
    Math.cos((theta * Math.PI) / 180);
  const v0z =
    velocity *
    Math.cos((angle * Math.PI) / 180) *
    Math.sin((theta * Math.PI) / 180);
  const v0y = velocity * Math.sin((angle * Math.PI) / 180);

  const x = parseFloat(formState.initialX) + v0x * t;
  const z = parseFloat(formState.initialZ) + v0z * t;
  const y = parseFloat(formState.initialY) + v0y * t - 0.5 * gravity * t * t;

  const vx = v0x;
  const vy = v0y - gravity * t;
  const vz = v0z;
  const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);

  const kineticEnergy = 0.5 * mass * speed * speed;
  const potentialEnergy = mass * gravity * y;

  // if (y < 0) {
  //   y = 0;
  //   potentialEnergy = 0;
  // }

  return {
    position: { x, y, z },
    velocity: { vx, vy, vz },
    kineticEnergy,
    potentialEnergy,
    totalEnergy: kineticEnergy + potentialEnergy,
  };
};
