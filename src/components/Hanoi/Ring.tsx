// En components/Ring.tsx - agregar indicador de anillo superior
interface RingProps {
  size: number;
  color: string;
  isSelected: boolean;
  onClick: () => void;
  isDraggable: boolean;
  isTopRing: boolean;
}

const Ring: React.FC<RingProps> = ({ size, color, isSelected, onClick, isDraggable, isTopRing }) => {
  const ringWidth = 20 + size * 25;
  
  return (
    <div
      className={`
        relative h-6 rounded-lg transition-all duration-200
        ${isDraggable ? 'cursor-pointer hover:scale-105 hover:brightness-110' : 'cursor-not-allowed opacity-80'}
        ${isSelected ? 'ring-4 ring-yellow-400 ring-opacity-60 scale-110 z-50' : ''}
        ${isTopRing ? 'shadow-lg' : 'shadow-md'}
        border-2 border-white border-opacity-20
      `}
      style={{
        width: `${ringWidth}px`,
        backgroundColor: color,
        boxShadow: isSelected 
          ? `0 0 20px ${color}40, inset 0 2px 10px rgba(255,255,255,0.3)` 
          : `0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)`,
      }}
      onClick={isDraggable ? onClick : undefined}
      onContextMenu={(e) => {
        e.preventDefault();
        if (isSelected && isDraggable) onClick();
      }}
      title={!isDraggable ? "Solo puedes mover el anillo superior" : `Anillo tamaño ${size}`}
    >
      {/* Efecto de brillo interno */}
      <div 
        className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/20 to-transparent"
      />
      
      {/* Indicador de anillo superior */}
      {isTopRing && (
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
      )}
      
      {/* Texto del tamaño */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xs font-bold drop-shadow-md">
          {size}
        </span>
      </div>
    </div>
  );
};

export default Ring