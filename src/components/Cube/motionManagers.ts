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
  // * Capa baja
  // Cubo en medio de la primer fila
  if (iz === 1 && iy === -1 && ix === 0) {
    return 1;
  }

  // Cubo a la derecha de la primer fila
  if (iz === 1 && iy === -1 && ix === 1) {
    return 2;
  }

  // Cubo a la izquierda de la primer fila
  if (iz === 1 && iy === -1 && ix === -1) {
    return 3;
  }

  // Cubo en medio de la segunda fila
  if (iz === 0 && iy === -1 && ix === 0) {
    return 4;
  }

  // Cubo a la izquierda de la segunda fila
  if (iz === 0 && iy === -1 && ix === -1) {
    return 5;
  }

  // Cubo a la derecha de la segunda fila
  if (iz === 0 && iy === -1 && ix === 1) {
    return 6;
  }

  // Cubo a la izquierda de la tercera fila
  if (iz === -1 && iy === -1 && ix === -1) {
    return 7;
  }

  // Cubo a la derecha de la tercera fila
  if (iz === -1 && iy === -1 && ix === 1) {
    return 8;
  }

  // Cubo en medio de la tercera fila
  if (iz === -1 && iy === -1 && ix === 0) {
    return 9;
  }

  // * Capa media
  // Cubo en medio de la primer fila
  if (iz === 1 && iy === 0 && ix === 0) {
    return 15;
  }

  // Cubo a la derecha de la primer fila
  if (iz === 1 && iy === 0 && ix === 1) {
    return 16;
  }

  // Cubo a la izquierda de la primer fila
  if (iz === 1 && iy === 0 && ix === -1) {
    return 17;
  }

  // Cubo en medio de la segunda fila
  if (iz === 0 && iy === 0 && ix === 0) {
    return 18;
  }

  // Cubo a la izquierda de la segunda fila
  if (iz === 0 && iy === 0 && ix === -1) {
    return 19;
  }

  // Cubo a la derecha de la segunda fila
  if (iz === 0 && iy === 0 && ix === 1) {
    return 20;
  }

  // Cubo a la izquierda de la tercera fila
  if (iz === -1 && iy === 0 && ix === -1) {
    return 21;
  }

  // Cubo a la derecha de la tercera fila
  if (iz === -1 && iy === 0 && ix === 1) {
    return 22;
  }

  // Cubo en medio de la tercera fila
  if (iz === -1 && iy === 0 && ix === 0) {
    return 23;
  }

  // * Capa alta
  // Cubo en medio de la primer fila
  if (iz === 1 && iy === 1 && ix === 0) {
    return 29;
  }

  // Cubo a la derecha de la primer fila
  if (iz === 1 && iy === 1 && ix === 1) {
    return 30;
  }

  // Cubo a la izquierda de la primer fila
  if (iz === 1 && iy === 1 && ix === -1) {
    return 31;
  }

  // Cubo en medio de la segunda fila
  if (iz === 0 && iy === 1 && ix === 0) {
    return 32;
  }

  // Cubo a la izquierda de la segunda fila
  if (iz === 0 && iy === 1 && ix === -1) {
    return 33;
  }

  // Cubo a la derecha de la segunda fila
  if (iz === 0 && iy === 1 && ix === 1) {
    return 34;
  }

  // Cubo a la izquierda de la tercera fila
  if (iz === -1 && iy === 1 && ix === -1) {
    return 35;
  }

  // Cubo a la derecha de la tercera fila
  if (iz === -1 && iy === 1 && ix === 1) {
    return 36;
  }

  // Cubo en medio de la tercera fila
  if (iz === -1 && iy === 1 && ix === 0) {
    return 37;
  }

  return 1;
};

// Por capa
// 2 | 3 | 1     ix=-1
// 3 | 1 | 2     ix= 0
// 1 | 2 | 3     ix= 1

//z=-1|0 | 1
