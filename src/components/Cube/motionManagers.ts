//* Esta funcion nos dice cuantas unidades se debe mover para salir y para entrar segun la fila en la que esté sin importar la capa
export const getAmountSteps = (iz: number) => {
  if (iz === 1) return { zP: 1, zN: 3 };
  if (iz === 0) return { zP: 2, zN: 2 };
  if (iz === -1) return { zP: 3, zN: 1 };
  return { zP: 0, zN: 0 };
};

//* Esta función nos dice el tiempo en el que debe comenzar a moverse el cubo
export const getTimeStart = (ix: number, iy: number, iz: number) => {
  // Mapeo simplificado de tiempos
  const timeMap: { [key: string]: number } = {
    // Capa baja (iy = -1)
    '1,-1,-1': 1, '1,-1,0': 2, '1,-1,1': 3,
    '0,-1,-1': 4, '0,-1,0': 5, '0,-1,1': 6,
    '-1,-1,-1': 7, '-1,-1,0': 8, '-1,-1,1': 9,
    
    // Capa media (iy = 0)
    '1,0,-1': 15, '1,0,0': 16, '1,0,1': 17,
    '0,0,-1': 18, '0,0,0': 19, '0,0,1': 20,
    '-1,0,-1': 21, '-1,0,0': 22, '-1,0,1': 23,
    
    // Capa alta (iy = 1)
    '1,1,-1': 29, '1,1,0': 30, '1,1,1': 31,
    '0,1,-1': 32, '0,1,0': 33, '0,1,1': 34,
    '-1,1,-1': 35, '-1,1,0': 36, '-1,1,1': 37,
  };

  return timeMap[`${iz},${iy},${ix}`] || 1;
};