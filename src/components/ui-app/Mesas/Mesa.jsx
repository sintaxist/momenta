import { useState, useRef, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';
import fitty from 'fitty'; // <--- Importamos fitty

import { Invitado } from './Invitado';

export const MESA_DIMENSIONS = {
  rectangle: { width: 300, height: 180 },
  square: { width: 250, height: 250 },
  circle: { width: 250, height: 250 },
};
const GUEST_COUNT = 10;

// Función para calcular la posición de los invitados
const calculateGuestPositions = (shape, dimensions) => {
  const positions = [];
  const { width, height } = dimensions;

  if (shape === 'circle') {
    const radius = width / 2;
    for (let i = 0; i < GUEST_COUNT; i++) {
      const angle = (i / GUEST_COUNT) * 2 * Math.PI;
      positions.push({
        left: radius + (radius + 30) * Math.cos(angle),
        top: radius + (radius + 30) * Math.sin(angle),
      });
    }
  } else { // Rectángulo y Cuadrado
    const perimeter = 2 * (width + height);
    
    // Simplificación: distribuimos en los 4 lados. Puedes mejorar esta lógica si lo necesitas.
    const horizontalCount = Math.ceil(GUEST_COUNT / 4); // invitados arriba y abajo
    const verticalCount = Math.floor(GUEST_COUNT / 4); // invitados en los lados

    // Arriba y Abajo
    for(let i = 1; i <= horizontalCount; i++) {
        const x = (width / (horizontalCount + 1)) * i;
        positions.push({ left: x, top: -30 }); // Arriba
        positions.push({ left: x, top: height + 30 }); // Abajo
    }
    // Izquierda y Derecha
    for(let i = 1; i <= verticalCount; i++) {
        const y = (height / (verticalCount + 1)) * i;
        positions.push({ left: -30, top: y }); // Izquierda
        positions.push({ left: width + 30, top: y }); // Derecha
    }
  }
  return positions;
};


export const Mesa = ({ tableData, onUpdate, isSelected, onSelect }) => {
  const { id, shape, label, x, y } = tableData;
  const [isEditing, setIsEditing] = useState(false);
  const [labelText, setLabelText] = useState(label);

  const nodeRef = useRef(null);
  const textContainerRef = useRef(null);
  const fittyRef = useRef(null);

  const dimensions = MESA_DIMENSIONS[shape];
  const guestPositions = calculateGuestPositions(shape, dimensions);

  // Efecto para inicializar y actualizar Fitty
  useEffect(() => {
    if (textContainerRef.current) {
      fittyRef.current = fitty(textContainerRef.current, {
        minSize: 12,
        maxSize: 50,
        multiLine: true,
      });
    }
    // Cleanup
    return () => fittyRef.current?.unsubscribe();
  }, []);

  // Forzar reajuste de fitty cuando el texto cambia
  useEffect(() => {
    fittyRef.current?.fit();
  }, [labelText, isEditing]);


  const handleStopDrag = (e, data) => {
    onUpdate(id, { x: data.x, y: data.y });
  };
  
  const handleLabelClick = () => {
    if (isSelected) {
      setIsEditing(true);
    }
  };

  const handleLabelBlur = () => {
    setIsEditing(false);
    if (labelText.trim() === '') {
        setLabelText(label); // Revertir si está vacío
    } else {
        onUpdate(id, { label: labelText });
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.target.blur(); // El onBlur se encargará del resto
    }
  };

  const handleContainerClick = (e) => {
    e.stopPropagation(); // Evita que el clic se propague al canvas y deseleccione
    onSelect();
  };

  const shapeClasses = {
    rectangle: 'rounded-lg',
    square: 'rounded-lg',
    circle: 'rounded-full',
  };

  // Clases para el contorno de selección
  const selectionClasses = isSelected ? 'outline outline-4 outline-offset-4 outline-blue-500 rounded-lg' : '';

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x, y }}
      onStop={handleStopDrag}
      onStart={onSelect}
      handle=".handle"
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className={`absolute group cursor-pointer ${selectionClasses}`}
        style={{ width: dimensions.width, height: dimensions.height }}
        onClick={handleContainerClick}
      >
        {guestPositions.map((pos, index) => <Invitado key={index} style={{ top: pos.top, left: pos.left }} />)}
        
        <div
          className={`handle w-full h-full bg-white border-2 border-gray-300 shadow-md flex items-center justify-center p-4
            ${shapeClasses[shape]}`}
        >
          <div
            ref={textContainerRef}
            onClick={handleLabelClick}
            className={`w-full h-full flex items-center justify-center text-center 
              ${isEditing ? 'ring-2 ring-blue-400 rounded-md' : ''} 
              ${isSelected ? 'cursor-text' : 'cursor-move'}`}
            style={{ whiteSpace: 'pre-wrap', lineHeight: '1.1' }}
          >
            {isEditing ? (
              <textarea
                value={labelText}
                onChange={(e) => setLabelText(e.target.value)}
                onBlur={handleLabelBlur}
                onKeyDown={handleKeyDown}
                className="text-center bg-transparent w-full h-full resize-none focus:outline-none"
                style={{ fontSize: 'inherit', fontFamily: 'inherit', lineHeight: 'inherit' }}
                autoFocus
              />
            ) : (
              <span>{labelText}</span>
            )}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

