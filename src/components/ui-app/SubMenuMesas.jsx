// Componente para los íconos de las formas
const ShapeIcon = ({ shape }) => {
  if (shape === 'rectangle') return <div className="w-8 h-5 border-2 border-gray-600 rounded-sm" />;
  if (shape === 'square') return <div className="w-6 h-6 border-2 border-gray-600 rounded-sm" />;
  if (shape === 'circle') return <div className="w-6 h-6 border-2 border-gray-600 rounded-full" />;
  return null;
};

export const SubmenuMesas = ({ onSelectShape }) => {
  const shapes = [
    { id: 'rectangle', name: 'Rectangular' },
    { id: 'square', name: 'Cuadrada' },
    { id: 'circle', name: 'Circular' },
  ];

  return (
    <div className="absolute left-full top-0 ml-3 p-3 bg-white rounded-xl shadow-lg border border-gray-200 w-60">
      <h3 className="text-sm font-semibold text-gray-500 mb-2 px-1">Forma de la mesa</h3>
      <div className="space-y-1">
        {shapes.map((shape) => (
          <button
            key={shape.id}
            onClick={() => onSelectShape(shape.id)}
            className="w-full flex items-center space-x-3 p-2 text-left rounded-md hover:bg-gray-100 transition-colors"
          >
            <ShapeIcon shape={shape.id} />
            <span className="text-gray-700">{shape.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};