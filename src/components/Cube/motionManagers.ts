//* Esta funcion nos dice cuantas unidades se debe mover para salir y para entrar segun la fila en la que esté sin importar la capa
export const getAmountSteps = (iz: number) => {
  if (iz === 1) {
    return {
      zP: 1,
      zN: 3,
    };
  }

  if (iz === 0) {
    return {
      zP: 2,
      zN: 2,
    };
  }

  if (iz === -1) {
    return {
      zP: 3,
      zN: 1,
    };
  }

  return {
    zP: 0,
    zN: 0,
  };
};

//* Esta función nos dice el tiempo en el que debe comenzar a moverse el cubo
// Los intervalos de tiempo no dependen de los segundos
export const getTimeStart = (ix: number, iy: number, iz: number) => {
  // Cubo en medio de la primer fila
  if (iz === 1 && ix === 0) {
    return 1 + (iy + 1) * 8;
  }

  // Cubo a la derecha de la primer fila
  if (iz === 1 && ix === 1) {
    return 2 + (iy + 1) * 8;
  }

  // Cubo a la izquierda de la primer fila
  if (iz === 1 && ix === -1) {
    return 3 + (iy + 1) * 8;
  }

  // Cubo en medio de la segunda fila
  if (iz === 0 && ix === 0) {
    return 9 + (iy + 1) * 8;
  }

  // Cubo a la izquierda de la segunda fila
  if (iz === 0 && ix === -1) {
    return 10 + (iy + 1) * 8;
  }

  // Cubo a la derecha de la segunda fila
  if (iz === 0 && ix === 1) {
    return 11 + (iy + 1) * 8;
  }

  // Cubo a la izquierda de la tercera fila
  if (iz === -1 && ix === -1) {
    return 17 + (iy + 1) * 8;
  }

  // Cubo a la derecha de la tercera fila
  if (iz === -1 && ix === 1) {
    return 18 + (iy + 1) * 8;
  }

  // Cubo en medio de la tercera fila
  if (iz === -1 && ix === 0) {
    return 19 + (iy + 1) * 8;
  }

  return 1;
};

// Por capa
// 2 | 3 | 1     ix=-1
// 3 | 1 | 2     ix= 0
// 1 | 2 | 3     ix= 1

//z=-1|0 | 1
