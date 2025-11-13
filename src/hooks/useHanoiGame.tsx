import { useState, useCallback } from 'react';

export type Tower = number[];

interface UseHanoiGameProps {
  initialRings?: number;
  myLanguage: string;
}

export const useHanoiGame = ({ initialRings = 5, myLanguage }: UseHanoiGameProps) => {
  const [numRings, setNumRings] = useState(initialRings);
  const [towers, setTowers] = useState<Tower[]>([
    Array.from({ length: initialRings }, (_, i) => initialRings - i),
    [],
    [],
  ]);
  const [moveCount, setMoveCount] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({
    type: '',
    text: '',
  });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedRing, setSelectedRing] = useState<{ towerIndex: number; ring: number } | null>(null);

  const minMoves = 2 ** numRings - 1;

  // Función para verificar victoria
  const checkWin = useCallback((towerState: Tower[]) => {
    const targetTower = towerState[2];
    if (targetTower.length !== numRings) return false;
    
    // Verificar que los anillos estén en orden descendente (mayor abajo, menor arriba)
    for (let i = 0; i < targetTower.length - 1; i++) {
      if (targetTower[i] <= targetTower[i + 1]) {
        return false;
      }
    }
    return true;
  }, [numRings]);

  const moveRing = useCallback((from: number, to: number) => {
    if (towers[from].length === 0) return false;

    const newTowers = towers.map(tower => [...tower]);
    const ring = newTowers[from].pop() as number;

    // ✅ CORRECCIÓN: Solo permitir mover si la torre destino está vacía O 
    // el anillo a mover es MENOR que el anillo superior de la torre destino
    if (newTowers[to].length === 0 || ring < newTowers[to][newTowers[to].length - 1]) {
      newTowers[to].push(ring);
      setTowers(newTowers);
      setMessage({ type: '', text: '' });

      if (from !== to) {
        setMoveCount(prev => prev + 1);
      }

      // Verificar victoria
      if (checkWin(newTowers)) {
        const winMessage = moveCount + 1 <= minMoves
          ? myLanguage === "eng"
            ? `🎉 Amazing! You solved it in the minimum moves (${minMoves})!`
            : `🎉 ¡Increíble! Lo resolviste en movimientos mínimos (${minMoves})!`
          : myLanguage === "eng"
            ? `Congratulations! You solved the Tower of Hanoi in ${moveCount + 1} moves.`
            : `¡Felicidades! Resolviste la Torre de Hanoi en ${moveCount + 1} movimientos.`;

        setMessage({ type: 'success', text: winMessage });
      }
      return true;
    } else {
      setMessage({
        type: 'error',
        text: myLanguage === "eng"
          ? "❌ Invalid move! You can't place a larger ring on a smaller one."
          : "❌ ¡Movimiento no válido! No puedes colocar un anillo más grande sobre uno más pequeño.",
      });
      return false;
    }
  }, [towers, numRings, moveCount, minMoves, myLanguage, checkWin]);

  const handleRingChange = useCallback((newNumRings: number) => {
    setNumRings(newNumRings);
    setTowers([Array.from({ length: newNumRings }, (_, i) => newNumRings - i), [], []]);
    setMoveCount(0);
    setMessage({ type: '', text: '' });
    setSelectedRing(null);
  }, []);

  const resetGame = useCallback((rings: number = numRings) => {
    setTowers([Array.from({ length: rings }, (_, i) => rings - i), [], []]);
    setMoveCount(0);
    setMessage({ type: '', text: '' });
    setSelectedRing(null);
  }, [numRings]);

  const selectRing = useCallback((towerIndex: number, ring: number) => {
    // ✅ Solo permitir seleccionar el anillo superior de cada torre
    if (ring === towers[towerIndex][towers[towerIndex].length - 1]) {
      setSelectedRing({ towerIndex, ring });
      setIsDragging(true);
    }
  }, [towers]);

  const dropRing = useCallback((towerIndex: number) => {
    if (!selectedRing) return;

    const success = moveRing(selectedRing.towerIndex, towerIndex);
    setSelectedRing(null);
    setIsDragging(false);
    return success;
  }, [selectedRing, moveRing]);

  const cancelDrag = useCallback(() => {
    setSelectedRing(null);
    setIsDragging(false);
  }, []);

  return {
    numRings,
    towers,
    moveCount,
    message,
    minMoves,
    selectedRing,
    isDragging,
    moveRing,
    handleRingChange,
    resetGame,
    selectRing,
    dropRing,
    cancelDrag,
  };
};