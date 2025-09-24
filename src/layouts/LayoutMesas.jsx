import { useEffect, useRef, useState, useCallback } from 'react';
import { Header } from '@/components/ui-app/Header';
import { Sidebar } from '@/components/ui-app/Sidebar';
import { ZoomControls } from '@/components/ui-app/ZoomControls';
import { ModalPlantillas } from '@/components/ui-app/ModalPlantillas';
import { ModalAyuda } from '@/components/ui-app/ModalAyuda';

// Definimos las variables globales para la configuración de Firebase
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
// const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;


// Componente principal de la aplicación
export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isZoomInputVisible, setIsZoomInputVisible] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isZoomOut, setIsZoomOut] = useState(false);
  const [activeTool, setActiveTool] = useState('select');
  const [titleText, setTitleText] = useState('Planificador de Salón de Fiestas');
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'templates' o 'help'
  
  const titleInputRef = useRef(null);
  const zoomInputRef = useRef(null);
  const canvasRef = useRef(null);
  const worldRef = useRef(null);

  const [panState, setPanState] = useState({ isPanning: false, isMouseDown: false, lastMousePos: { x: 0, y: 0 } });

  // Manejo de eventos para copiar y pegar
  const handleCopy = useCallback(() => {
    console.log('Copiando elemento(s) seleccionado(s)...');
  }, []);

  const handlePaste = useCallback(() => {
    console.log('Pegando elemento(s)...');
  }, []);

  // Manejo de eventos de teclado (panning, zoom, herramientas)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        setPanState(prevState => ({ ...prevState, isPanning: true }));
        e.preventDefault();
      }
      if (e.key === 'z' || e.key === 'Z') {
        setIsZooming(true);
        setIsZoomOut(e.shiftKey);
      }
      // Atajos de teclado para herramientas
      if (e.key === 'v' || e.key === 'V') {
        setActiveTool('select');
      } else if (e.key === 'm' || e.key === 'M') {
        setActiveTool('table');
      } else if (e.key === 't' || e.key === 'T') {
        setActiveTool('text');
      }
      // Atajo de teclado para ayuda
      if (e.key === '?') {
        e.preventDefault();
        setModalType('help');
      }

      // Atajos de teclado para deshacer/rehacer
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        console.log('Deshacer');
      } else if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'Z') {
        console.log('Rehacer');
      }
      // Atajos de teclado para copiar/pegar
      if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
        handleCopy();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
        handlePaste();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setPanState(prevState => ({ ...prevState, isPanning: false }));
      }
      if (e.key === 'z' || e.key === 'Z') {
        setIsZooming(false);
        setIsZoomOut(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleCopy, handlePaste]); 

  // Función para manejar el zoom con centrado y límites
  const handleZoom = (newZoom) => {
    if (!canvasRef.current || !worldRef.current) return;
    
    const worldElement = worldRef.current;
    const canvasElement = canvasRef.current;
    const oldZoom = zoom;

    const viewportCenter = {
      x: canvasElement.offsetWidth / 2,
      y: canvasElement.offsetHeight / 2,
    };
    
    const newPosition = {
      x: viewportCenter.x - (viewportCenter.x - position.x) * newZoom / oldZoom,
      y: viewportCenter.y - (viewportCenter.y - position.y) * newZoom / oldZoom,
    };

    const worldWidth = 4000;
    const worldHeight = 4000;
    const minX = canvasElement.offsetWidth - (worldWidth * newZoom);
    const minY = canvasElement.offsetHeight - (worldHeight * newZoom);
    const maxX = 0;
    const maxY = 0;
    
    setPosition({
      x: Math.min(maxX, Math.max(minX, newPosition.x)),
      y: Math.min(maxY, Math.max(minY, newPosition.y))
    });

    setZoom(newZoom);
  };
  
  // Manejo de eventos del mouse para el pan y zoom
  const handleMouseDown = (e) => {
    if (panState.isPanning) {
      e.preventDefault();
      setPanState(prevState => ({ ...prevState, isMouseDown: true, lastMousePos: { x: e.clientX, y: e.clientY } }));
    } 
  };
  const handleMouseMove = (e) => {
    if (panState.isPanning && panState.isMouseDown) {
      const dx = e.clientX - panState.lastMousePos.x;
      const dy = e.clientY - panState.lastMousePos.y;
      
      const newX = position.x + dx;
      const newY = position.y + dy;
      
      const viewportWidth = canvasRef.current.offsetWidth;
      const viewportHeight = canvasRef.current.offsetHeight;
      const worldWidth = 4000 * zoom;
      const worldHeight = 4000 * zoom;
      
      const minX = viewportWidth - worldWidth;
      const minY = viewportHeight - worldHeight;
      const maxX = 0;
      const maxY = 0;
      
      setPosition({
        x: Math.min(Math.max(newX, minX), maxX),
        y: Math.min(Math.max(newY, minY), maxY),
      });
      
      setPanState(prevState => ({ ...prevState, lastMousePos: { x: e.clientX, y: e.clientY } }));
    }
  };
  const handleMouseUp = () => {
    setPanState(prevState => ({ ...prevState, isMouseDown: false, lastMousePos: { x: 0, y: 0 } }));
    if (isZooming) {
      if (isZoomOut) {
        handleZoom(Math.max(0.3, zoom - 0.5));
      } else {
        handleZoom(Math.min(15, zoom + 0.5));
      }
    }
  };

  // Manejo del zoom con gestos de trackpad y scroll
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.ctrlKey) {
      const newZoom = e.deltaY > 0 ? zoom - 0.1 : zoom + 0.1;
      handleZoom(Math.min(15, Math.max(0.3, newZoom)));
    } else {
      const dx = -e.deltaX * 1.5;
      const dy = -e.deltaY * 1.5;
      
      const newX = position.x + dx;
      const newY = position.y + dy;

      const viewportWidth = canvasRef.current.offsetWidth;
      const viewportHeight = canvasRef.current.offsetHeight;
      const worldWidth = 4000 * zoom;
      const worldHeight = 4000 * zoom;
      const minX = viewportWidth - worldWidth;
      const minY = viewportHeight - worldHeight;
      const maxX = 0;
      const maxY = 0;

      setPosition({
        x: Math.min(Math.max(newX, minX), maxX),
        y: Math.min(Math.max(newY, minY), maxY),
      });
    }
  };

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
        canvasElement.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
        if (canvasElement) {
            canvasElement.removeEventListener('wheel', handleWheel, { passive: false });
        }
    };
  }, [handleWheel]);

  // Botones de zoom
  const zoomIn = () => handleZoom(Math.min(15, zoom + 0.5));
  const zoomOut = () => handleZoom(Math.max(0.3, zoom - 0.5));

  // Ajusta el ancho del input de título dinámicamente
  useEffect(() => {
    if (isTitleEditing && titleInputRef.current) {
      titleInputRef.current.style.width = `${titleInputRef.current.scrollWidth}px`;
    }
  }, [isTitleEditing, titleText]);

  const handleTitleChange = (e) => {
    setTitleText(e.target.value);
  };
  
  const handleTitleBlur = () => {
    setIsTitleEditing(false);
  };

  // Manejo del input de zoom
  const handleZoomChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 30 && value <= 1500) {
      handleZoom(value / 100);
    }
  };

  const handleZoomInputBlur = () => {
    setIsZoomInputVisible(false);
  };

  const handleZoomInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  useEffect(() => {
    if (isZoomInputVisible && zoomInputRef.current) {
      zoomInputRef.current.focus();
    }
  }, [isZoomInputVisible]);

  // Funciones de Header
  const handleExport = (type) => {
    console.log(`Exportando como ${type}`);
    setIsExportMenuOpen(false);
  };

  const handleSave = () => {
    console.log('Guardando en la nube...');
  };

  // Determinar la clase del cursor
  const getCursorClass = () => {
    if (panState.isPanning && panState.isMouseDown) return 'cursor-grabbing';
    if (panState.isPanning) return 'cursor-grab';
    if (isZooming) return isZoomOut ? 'cursor-zoom-out' : 'cursor-zoom-in';
    switch(activeTool) {
      case 'table':
        return 'cursor-crosshair';
      case 'text':
        return 'cursor-text';
      case 'select':
      default:
        return 'cursor-default';
    }
  };
  
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
          body {
            font-family: 'Sora', sans-serif;
            padding: 0;
            margin: 0;
            overflow: hidden;
            width: 100vw;
            height: 100vh;
          }
          .cursor-grab { cursor: grab; }
          .cursor-grabbing { cursor: grabbing; }
          .cursor-zoom-in { cursor: zoom-in; }
          .cursor-zoom-out { cursor: zoom-out; }
          .cursor-crosshair { cursor: crosshair; }
          .cursor-text { cursor: text; }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.15s ease-out forwards;
          }

          /* Estilos del modal */
          .modal-backdrop {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(12px);
            z-index: 51;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease-in-out;
          }
          .modal-backdrop.is-visible {
            opacity: 1;
            pointer-events: auto;
          }
          .modal-content {
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 1.5rem;
            padding: 2rem;
            max-width: 56rem;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
            transform: scale(0.95);
            transition: transform 0.3s ease-in-out;
          }
          .modal-backdrop.is-visible .modal-content {
            transform: scale(1);
          }
        `}
      </style>
      <div className="relative w-screen h-screen font-sans bg-gray-100">
        <Header 
          titleText={titleText} 
          isTitleEditing={isTitleEditing} 
          setTitleText={setTitleText} 
          setIsTitleEditing={setIsTitleEditing}
          isExportMenuOpen={isExportMenuOpen}
          setIsExportMenuOpen={setIsExportMenuOpen}
          handleExport={handleExport}
          handleSave={handleSave}
        />
        
        <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} setModalOpen={setModalType} />
        
        {/* Área del canvas */}
        <div
          ref={canvasRef}
          className={`absolute inset-0 ${getCursorClass()}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* El div principal con la cuadrícula que se transformará */}
          <div
            ref={worldRef}
            className="absolute origin-top-left"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transition: panState.lastMousePos.x === 0 ? 'transform 0.1s ease-out' : 'none',
              background: 'linear-gradient(-90deg, rgba(0, 0, 0, .08) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .08) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              width: '4000px', // Tamaño del "mundo" del canvas
              height: '4000px',
            }}
          >
              {/* Aquí se agregarán las mesas y otros elementos del salón */}
          </div>
        </div>
        
        <ZoomControls 
          zoom={zoom} 
          zoomIn={zoomIn} 
          zoomOut={zoomOut}
          isZoomInputVisible={isZoomInputVisible}
          setIsZoomInputVisible={setIsZoomInputVisible}
          handleZoomChange={handleZoomChange}
          handleZoomInputBlur={handleZoomInputBlur}
          handleZoomInputKeyDown={handleZoomInputKeyDown}
          zoomInputRef={zoomInputRef}
          setModalOpen={setModalType}
        />

        <ModalPlantillas modalType={modalType} setModalType={setModalType}/>

        <ModalAyuda modalType={modalType} setModalType={setModalType}/>
      </div>
    </>
  );
}
