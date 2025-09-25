import { useEffect, useRef, useState, useCallback } from "react";
import { Header } from "@/components/ui-app/Header";
import { Sidebar } from "@/components/ui-app/Sidebar";
import { ZoomControls } from "@/components/ui-app/ZoomControls";
import { ModalPlantillas } from "@/components/ui-app/ModalPlantillas";
import { ModalAyuda } from "@/components/ui-app/ModalAyuda";

const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";

const WORLD_WIDTH = 4000;
const WORLD_HEIGHT = 4000;

export default function App() {

  const canvasRef = useRef(null);
  const titleInputRef = useRef(null);

  const zoomInputRef = useRef(null);
  const zoomRef = useRef(1);
  const zoomingRef = useRef({ isZooming: false, isZoomOut: false });

  const [zoom, setZoom] = useState(1);
  const [isZoomInputVisible, setIsZoomInputVisible] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isZoomOut, setIsZoomOut] = useState(false);

  const [activeTool, setActiveTool] = useState("select");
  const [titleText, setTitleText] = useState(
    "Planificador de Salón de Fiestas"
  );
  const [isTitleEditing, setIsTitleEditing] = useState(false);

  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const [modalType, setModalType] = useState(null);

  const [panState, setPanState] = useState({
    isPanning: false,
    isMouseDown: false,
    lastMousePos: { x: 0, y: 0 },
  });

  const handleCopy = useCallback(() => console.log("Copiando..."), []);
  const handlePaste = useCallback(() => console.log("Pegando..."), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
  
      if (e.code === "Space") {
        setPanState((p) => ({ ...p, isPanning: true }));
        e.preventDefault();
      }

      if (e.key === "z" || e.key === "Z") {
        zoomingRef.current.isZooming = true;
        zoomingRef.current.isZoomOut = e.altKey || e.shiftKey;
        setIsZooming(true);
        setIsZoomOut(e.altKey || e.shiftKey);
      }

      if (e.key === "v" || e.key === "V") setActiveTool("select");
      else if (e.key === "m" || e.key === "M") setActiveTool("table");
      else if (e.key === "t" || e.key === "T") setActiveTool("text");
      if (e.key === "?") {
        e.preventDefault();
        setModalType("help");
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "z") console.log("Deshacer");
      if ((e.metaKey || e.ctrlKey) && e.key === "y") console.log("Rehacer");
      if ((e.metaKey || e.ctrlKey) && e.key === "c") handleCopy();
      if ((e.metaKey || e.ctrlKey) && e.key === "v") handlePaste();
    };

    const handleKeyUp = (e) => {
      if (e.code === "Space") setPanState((p) => ({ ...p, isPanning: false }));
      if (e.key === "z" || e.key === "Z") {
        zoomingRef.current.isZooming = false;
        zoomingRef.current.isZoomOut = false;
        setIsZooming(false);
        setIsZoomOut(false);
      }
    };

    const el = canvasRef.current;
    if (!el) return;

    const wheelHandler = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();

        const zoomIntensity = 0.25;
        const scaleFactor = Math.exp(-e.deltaY * zoomIntensity * 0.01);

        zoomRef.current = Math.min(Math.max(zoomRef.current * scaleFactor, 0.5), 3);

        requestAnimationFrame(() => {
          setZoom(zoomRef.current);
        });

        handleZoom(zoomRef.current, e.clientX, e.clientY);
      }
    };

    el.addEventListener("wheel", wheelHandler, { passive: false });

    const blockGesture = (e) => e.preventDefault();
    window.addEventListener("gesturestart", blockGesture, { passive: false });
    window.addEventListener("gesturechange", blockGesture, { passive: false });
    window.addEventListener("gestureend", blockGesture, { passive: false });

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
  
      window.removeEventListener("gesturestart", blockGesture);
      window.removeEventListener("gesturechange", blockGesture);
      window.removeEventListener("gestureend", blockGesture);

      el.removeEventListener("wheel", wheelHandler, { passive: false });
    };
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const wheelHandler = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const zoomIntensity = 0.25;
        const scaleFactor = Math.exp(-e.deltaY * zoomIntensity * 0.01);
        handleZoom(zoom * scaleFactor, e.clientX, e.clientY);
      }
    };

    el.addEventListener("wheel", wheelHandler, { passive: false });
    return () => el.removeEventListener("wheel", wheelHandler, { passive: false });
  }, [zoom]);

   // Ajusta el ancho del input de título dinámicamente
  useEffect(() => {
    if (isTitleEditing && titleInputRef.current) {
      titleInputRef.current.style.width = `${titleInputRef.current.scrollWidth}px`;
    }
  }, [isTitleEditing, titleText]);

  useEffect(() => {
    if (isZoomInputVisible && zoomInputRef.current) {
      zoomInputRef.current.focus();
    }
  }, [isZoomInputVisible]);

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  const getMinZoom = () => {
    if (!canvasRef.current) return 0.1;
    const viewportWidth = canvasRef.current.clientWidth;
    const viewportHeight = canvasRef.current.clientHeight;
    return Math.max(viewportWidth / WORLD_WIDTH, viewportHeight / WORLD_HEIGHT);
  };

  const handleZoom = (newZoom, clientX, clientY) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const minZoom = getMinZoom();
    const safeZoom = clamp(newZoom, minZoom, 3);

    setZoom(safeZoom);
  };

  // --- Mouse pan ---
  const handleMouseDown = (e) => {
    if (isZooming) {
      e.preventDefault();
      if (isZoomOut || e.altKey) {
        handleZoom(zoom / 1.2, e.clientX, e.clientY);
      } else {
        handleZoom(zoom * 1.2, e.clientX, e.clientY);
      }
      return;
    }

    if (panState.isPanning) {
      e.preventDefault();
      setPanState((p) => ({
        ...p,
        isMouseDown: true,
        lastMousePos: { x: e.clientX, y: e.clientY },
      }));
    }
  };

  const handleMouseMove = (e) => {
    if (panState.isMouseDown) {
      const dx = e.clientX - panState.lastMousePos.x;
      const dy = e.clientY - panState.lastMousePos.y;
      canvasRef.current.scrollLeft -= dx;
      canvasRef.current.scrollTop -= dy;
      setPanState((p) => ({
        ...p,
        lastMousePos: { x: e.clientX, y: e.clientY },
      }));
    }
  };

  const handleMouseUp = () =>
    setPanState((p) => ({ ...p, isMouseDown: false }));

  // --- Zoom controls ---
  const zoomIn = () => handleZoom(zoom * 1.2);
  const zoomOut = () => handleZoom(zoom / 1.2);

  const handleZoomChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) handleZoom(value / 100);
  };

  const handleZoomInputBlur = () => {
    setIsZoomInputVisible(false);
  };

  const handleZoomInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

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
    if (panState.isPanning && panState.isMouseDown) return "cursor-grabbing";
    if (panState.isPanning) return "cursor-grab";

    if (zoomingRef.current.isZooming) {
      return zoomingRef.current.isZoomOut ? "cursor-zoom-out" : "cursor-zoom-in";
    }

    switch (activeTool) {
      case "table": return "cursor-crosshair";
      case "text": return "cursor-text";
      default: return "cursor-default";
    }
  };

  return (
    <>
      <style>{`
        .cursor-grab { cursor: grab; }
        .cursor-grabbing { cursor: grabbing; }
        .cursor-zoom-in { cursor: zoom-in; }
        .cursor-zoom-out { cursor: zoom-out; }
        .cursor-crosshair { cursor: crosshair; }
        .cursor-text { cursor: text; }
        .cursor-default { cursor: default; }
      `}</style>

      <div className="relative w-screen h-screen bg-gray-100">
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

        <Sidebar
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          setModalOpen={setModalType}
        />

        <div
          ref={canvasRef}
          className={`absolute inset-0 ${getCursorClass()}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          // onWheel={handleWheel}
          style={{
            width: "100%",
            height: "100%",
            overflow: "scroll",
            background: "#f0f0f0",
            position: "relative",
          }}
        >
          <div
            style={{
              width: WORLD_WIDTH * zoom,
              height: WORLD_HEIGHT * zoom,
              background: `
            linear-gradient(-90deg, rgba(0,0,0,.08) 1px, transparent 1px),
            linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px)
          `,
              backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
            }}
          />
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

        <ModalPlantillas modalType={modalType} setModalType={setModalType} />
        <ModalAyuda modalType={modalType} setModalType={setModalType} />
      </div>
    </>
  );
}
