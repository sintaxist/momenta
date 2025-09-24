import { useEffect, useRef, useState } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import { MousePointer2, Table, TextCursorInput, Undo2, Redo2 } from 'lucide-react';

// Definimos las variables globales para la configuración de Firebase
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
// const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Componente para los tooltips
const Tooltip = ({ children, content, keys = [] }) => {
  const [show, setShow] = useState(false);
  const showTimeout = useRef(null);

  const handleMouseEnter = () => {
    showTimeout.current = setTimeout(() => {
      setShow(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(showTimeout.current);
    setShow(false);
  };

  const getStyledContent = () => {
    const parts = content.split(' ');
    const elements = [];
    parts.forEach((part, index) => {
      const trimmedPart = part.trim();
      const isKey = keys.includes(trimmedPart);
      if (isKey) {
        elements.push(
          <span key={index} className="px-1 py-0.5 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm flex-shrink-0">
            {trimmedPart}
          </span>
        );
      } else if (trimmedPart === '+') {
        elements.push(<span key={index} className="mx-1 text-gray-400">+</span>);
      } else if (trimmedPart !== '') {
        elements.push(<span key={index} className="flex-shrink-0">{part}</span>);
      }
    });
    return elements;
  };

  return (
    <div className="relative flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {show && (
        <div className="absolute z-50 px-3 py-1.5 text-sm text-white bg-gray-800 rounded-md shadow-lg -right-2 transform translate-x-full whitespace-nowrap flex items-center space-x-1 animate-fadeIn">
          {getStyledContent()}
          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
        </div>
      )}
    </div>
  );
};

// Componente para el encabezado
const Header = ({ titleText, isTitleEditing, setTitleText, setIsTitleEditing }) => {
  const titleInputRef = useRef(null);
  useEffect(() => {
    if (isTitleEditing && titleInputRef.current) {
      titleInputRef.current.style.width = `${titleInputRef.current.scrollWidth}px`;
    }
  }, [isTitleEditing, titleText]);
  return (
    <header className="fixed top-4 left-4 px-6 py-3 bg-white flex items-center shadow-md rounded-xl border border-gray-200 z-30 max-w-max">
      <div className="flex items-center space-x-8">
        {isTitleEditing ? (
          <input
            ref={titleInputRef}
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            onBlur={() => setIsTitleEditing(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }}
            className="text-xl font-bold text-gray-800 bg-transparent outline-none border-b-2 border-blue-500 min-w-[100px]"
            autoFocus
          />
        ) : (
          <h1
            className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setIsTitleEditing(true)}
          >
            {titleText}
          </h1>
        )}
        {/* <div className="text-sm text-gray-500">
          ID de Usuario: <span className="font-mono text-gray-700">{userId}</span>
        </div> */}
      </div>
    </header>
  );
};

// Configuración de los botones del sidebar
const sidebarConfig = {
  tools: [
    {
      id: 'select',
      title: 'Seleccionar',
      key: 'V',
      icon: <MousePointer2 className="h-6 w-6" />,
      action: (setActiveTool) => setActiveTool('select'),
    },
    {
      id: 'table',
      title: 'Crear mesa',
      key: 'M',
      icon: <Table className="h-6 w-6" />,
      action: (setActiveTool) => setActiveTool('table'),
    },
    {
      id: 'text',
      title: 'Texto',
      key: 'T',
      icon: <TextCursorInput className="h-6 w-6" />,
      action: (setActiveTool) => setActiveTool('text'),
    },
  ],
  actions: [
    {
      id: 'undo',
      title: 'Deshacer',
      key: '⌘ + Z',
      icon: <Undo2 className="h-6 w-6" />,
      action: () => console.log('Deshacer'),
    },
    {
      id: 'redo',
      title: 'Rehacer',
      key: '⌘ + Shift + Z',
      icon: <Redo2 className="h-6 w-6" />,
      action: () => console.log('Rehacer'),
    },
  ],
};

// Componente para el menú lateral
const Sidebar = ({ activeTool, setActiveTool }) => (
  <aside className="fixed top-1/2 -translate-y-1/2 left-4 z-20 flex flex-col items-center space-y-2">
    <div className="flex flex-col p-2 bg-white rounded-xl shadow-lg border border-gray-200 space-y-2">
      {sidebarConfig.tools.map((item) => (
        <Tooltip key={item.id} content={`${item.title} ${item.key}`} keys={item.key.split(' ').filter(p => p !== '+')}>
          <button
            onClick={() => item.action(setActiveTool)}
            className={`p-2 rounded-md ${activeTool === item.id ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-600'} hover:bg-gray-200 transition-colors`}
          >
            {item.icon}
          </button>
        </Tooltip>
      ))}
    </div>
    <div className="flex flex-col p-2 bg-white rounded-xl shadow-lg border border-gray-200 space-y-2">
      {sidebarConfig.actions.map((item) => (
        <Tooltip key={item.id} content={`${item.title} ${item.key}`} keys={item.key.split(' ').filter(p => p !== '+')}>
          <button
            onClick={item.action}
            className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            {item.icon}
          </button>
        </Tooltip>
      ))}
    </div>
  </aside>
);

// Componente para los controles de zoom
const ZoomControls = ({ zoom, zoomIn, zoomOut, isZoomInputVisible, setIsZoomInputVisible, handleZoomChange, handleZoomInputBlur, handleZoomInputKeyDown, zoomInputRef }) => (
  <div className="fixed bottom-4 right-4 z-30 flex items-center p-2 bg-white rounded-lg shadow-xl border border-gray-200 space-x-2">
    <button
      onClick={zoomOut}
      title="Alejar (Z + Shift + Click)"
      className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      aria-label="Alejar"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
    
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
        title="Haz clic para cambiar el porcentaje de zoom"
      >
        {Math.round(zoom * 100)}%
      </span>
    )}

    <button
      onClick={zoomIn}
      title="Acercar (Z + Click)"
      className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      aria-label="Acercar"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>
);

// Inicialización de la app de Firebase
// const firebaseApp = Object.keys(firebaseConfig).length > 0 ? initializeApp(firebaseConfig) : null;
// const auth = firebaseApp ? getAuth(firebaseApp) : null;
// const db = firebaseApp ? getFirestore(firebaseApp) : null;

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [userId, setUserId] = useState('user-not-authenticated');
  const [isAuthReady, setIsAuthReady] = useState(true);
  const [titleText, setTitleText] = useState('Planificador de Salón de Fiestas');
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isZoomInputVisible, setIsZoomInputVisible] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isZoomOut, setIsZoomOut] = useState(false);
  const [activeTool, setActiveTool] = useState('select');
  const titleInputRef = useRef(null);
  const zoomInputRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Autenticación con Firebase
  useEffect(() => {
    // if (!auth) {
    //   setIsAuthReady(true);
    //   return;
    // }
    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //   if (!user) {
    //     try {
    //       if (initialAuthToken) {
    //         await signInWithCustomToken(auth, initialAuthToken);
    //       } else {
    //         await signInAnonymously(auth);
    //       }
    //     } catch (error) {
    //       console.error("Error signing in:", error);
    //     }
    //   }
    //   setUserId(auth.currentUser?.uid || 'user-not-authenticated');
    //   setIsAuthReady(true);
    // });

    // return () => unsubscribe();
  }, []);

  // Función para manejar el zoom con centrado y límites
  const handleZoom = (newZoom) => {
    if (!canvasRef.current) return;
    
    const oldZoom = zoom;
    const viewportWidth = canvasRef.current.offsetWidth;
    const viewportHeight = canvasRef.current.offsetHeight;

    const viewportCenter = {
      x: (viewportWidth / 2 - position.x) / oldZoom,
      y: (viewportHeight / 2 - position.y) / oldZoom,
    };
    
    const newPosition = {
      x: viewportWidth / 2 - viewportCenter.x * newZoom,
      y: viewportHeight / 2 - viewportCenter.y * newZoom,
    };

    const worldWidth = 4000;
    const worldHeight = 4000;
    const minX = viewportWidth - (worldWidth * newZoom);
    const minY = viewportHeight - (worldHeight * newZoom);
    const maxX = 0;
    const maxY = 0;
    
    setPosition({
      x: Math.min(maxX, Math.max(minX, newPosition.x)),
      y: Math.min(maxY, Math.max(minY, newPosition.y))
    });

    setZoom(newZoom);
  };

  // Manejo de eventos de teclado (panning, zoom, herramientas)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        setIsPanning(true);
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

      // Atajos de teclado para deshacer/rehacer
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        // Lógica para deshacer
        console.log('Deshacer');
      } else if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'Z') {
        // Lógica para rehacer
        console.log('Rehacer');
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setIsPanning(false);
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
  }, []); 

  // Manejo de eventos del mouse para el pan y zoom
  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    if (isPanning) {
      e.preventDefault();
      setLastMousePos({ x: e.clientX, y: e.clientY });
    } 
  };

  const handleMouseMove = (e) => {
    if (isPanning && isMouseDown) {
      if (lastMousePos.x === 0 && lastMousePos.y === 0) {
        setLastMousePos({ x: e.clientX, y: e.clientY });
        return;
      }
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      
      const newX = position.x + dx;
      const newY = position.y + dy;
      
      const viewportWidth = canvasRef.current.offsetWidth;
      const viewportHeight = canvasRef.current.offsetHeight;
      const worldWidth = 4000 * zoom;
      const worldHeight = 4000 * zoom;
      
      const minX = Math.min(0, viewportWidth - worldWidth);
      const minY = Math.min(0, viewportHeight - worldHeight);
      const maxX = Math.max(0, viewportWidth - worldWidth);
      const maxY = Math.max(0, viewportHeight - worldHeight);
      
      setPosition({
        x: Math.min(Math.max(newX, minX), maxX),
        y: Math.min(Math.max(newY, minY), maxY),
      });
      
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setLastMousePos({ x: 0, y: 0 });

    if (isZooming) {
      if (isZoomOut) {
        handleZoom(Math.max(0.3, zoom - 0.5));
      } else {
        handleZoom(Math.min(15, zoom + 0.5));
      }
    }
  };

  // Manejo del zoom con gestos de trackpad
  const handleWheel = (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
        const newZoom = e.deltaY > 0 ? zoom - 0.1 : zoom + 0.1;
        handleZoom(Math.min(15, Math.max(0.3, newZoom)));
    } else {
        const dx = -e.deltaX * 0.5;
        const dy = -e.deltaY * 0.5;
        
        const newX = position.x + dx;
        const newY = position.y + dy;

        const viewportWidth = canvasRef.current.offsetWidth;
        const viewportHeight = canvasRef.current.offsetHeight;
        const worldWidth = 4000 * zoom;
        const worldHeight = 4000 * zoom;
        const minX = Math.min(0, viewportWidth - worldWidth);
        const minY = Math.min(0, viewportHeight - worldHeight);
        const maxX = Math.max(0, viewportWidth - worldWidth);
        const maxY = Math.max(0, viewportHeight - worldHeight);

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

  // Determinar la clase del cursor
  const getCursorClass = () => {
    if (isPanning && isMouseDown) return 'cursor-grabbing';
    if (isPanning) return 'cursor-grab';
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
        `}
      </style>
      <div className="relative w-screen h-screen font-sans bg-gray-100">
        <Header 
          titleText={titleText} 
          isTitleEditing={isTitleEditing} 
          setTitleText={setTitleText} 
          setIsTitleEditing={setIsTitleEditing} 
          userId={userId} 
          isAuthReady={isAuthReady}
        />
        
        <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
        
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
            className="absolute origin-top-left"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transition: lastMousePos.x === 0 ? 'transform 0.1s ease-out' : 'none',
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
        />
      </div>
    </>
  );
}
