const directionMap: Record<string, Direction> = {
  a: "x-",
  d: "x+",
  s: "y+",
  w: "y-",
};

// Types
interface Position {
  x: number;
  y: number;
}

type Direction = "x+" | "x-" | "y+" | "y-";

interface Plane {
  position: Position;
  direction: Direction;
}

// interface PlayerPlane extends Plane {
//   // Aquí puedes agregar cualquier otra propiedad que necesites
//   name: string;
// }

interface Bullet {
  position: Position;
  direction: Direction;
}

interface Star {
  position: Position;
}

interface Planet {
  position: Position;
}

export { directionMap };

export type { Position, Direction, Plane, Bullet, Star, Planet };
