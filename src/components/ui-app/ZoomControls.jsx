import { HelpCircle, Minus, Plus } from 'lucide-react';
import { Tooltip } from '@/components/ui-app/Tooltip';

export const ZoomControls = ({ zoom, zoomIn, zoomOut, isZoomInputVisible, setIsZoomInputVisible, handleZoomChange, handleZoomInputBlur, handleZoomInputKeyDown, zoomInputRef, setModalOpen }) => (
  <div className="fixed bottom-4 right-4 z-30 flex items-center p-2 bg-white rounded-lg shadow-xl border border-gray-200 space-x-2">
    <Tooltip content="Alejar" keys={['Z', 'Shift']} position="top">
      <button
        onClick={zoomOut}
        className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        aria-label="Alejar"
      >
        <Minus className="h-5 w-5" />
      </button>
    </Tooltip>
    
    {isZoomInputVisible ? (
      <input
        ref={zoomInputRef}
        type="text"
        defaultValue={Math.round(zoom * 100)}
        onBlur={handleZoomInputBlur}
        onKeyDown={handleZoomInputKeyDown}
        onChange={handleZoomChange}
        className="w-12 text-sm font-semibold text-gray-700 text-center bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
    ) : (
      <span
        onClick={() => setIsZoomInputVisible(true)}
        className="text-sm font-semibold text-gray-700 select-none w-12 text-center cursor-pointer hover:underline"
      >
        {Math.round(zoom * 100)}%
      </span>
    )}

    <Tooltip content="Acercar" keys={['Z']} position="top">
      <button
        onClick={zoomIn}
        className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        aria-label="Acercar"
      >
        <Plus className="h-5 w-5" />
      </button>
    </Tooltip>

    <div className="h-6 w-px bg-gray-300"></div> {/* Divisor */}

    <Tooltip content="Ayuda" keys={['?']} position="top">
      <button
        onClick={() => setModalOpen('help')}
        className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Ayuda"
      >
        <HelpCircle className="h-5 w-5" />
      </button>
    </Tooltip>
  </div>
);