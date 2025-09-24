import { useEffect, useRef } from 'react';
import { Download, Image, FileText, Save } from 'lucide-react';
import { Tooltip } from '@/components/ui-app/Tooltip';

export const Header = ({ titleText, isTitleEditing, setTitleText, setIsTitleEditing, isExportMenuOpen, setIsExportMenuOpen, handleExport, handleSave }) => {
  const titleInputRef = useRef(null);
  const headerRef = useRef(null);
  
  // Maneja el clic fuera del menú de exportación para cerrarlo
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsExportMenuOpen(false);
      }
    };
    if (isExportMenuOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExportMenuOpen]);

  useEffect(() => {
    if (isTitleEditing && titleInputRef.current) {
      titleInputRef.current.style.width = `${titleInputRef.current.scrollWidth}px`;
    }
  }, [isTitleEditing, titleText]);
  return (
    <header ref={headerRef} className="fixed top-4 left-4 px-6 py-3 bg-white flex items-center shadow-md rounded-xl border border-gray-200 z-30 max-w-max">
      <div className="flex items-center space-x-4">
        {/* Espacio para el logo */}
        <div className="flex items-center space-x-2 pr-4 border-r border-gray-300">
          {/* Aquí se integraría el componente AnimatedLogo de Astro */}
          <div className="w-6 h-6 bg-gray-800 rounded-full flex-shrink-0"></div>
          <span className="text-gray-800 font-bold text-xl">Sala</span>
        </div>
        <div className="flex items-center space-x-4">
          {isTitleEditing ? (
            <input
              ref={titleInputRef}
              type="text"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              onBlur={() => setIsTitleEditing(false)}
              onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }}
              className="text-lg font-bold text-gray-800 bg-transparent outline-none border-b-2 border-blue-500 min-w-[100px] transition-all duration-300"
              autoFocus
            />
          ) : (
            <h1
              className="text-lg font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => setIsTitleEditing(true)}
            >
              {titleText}
            </h1>
          )}
          <div className="h-6 w-px bg-gray-300"></div> {/* Divisor */}
          <div className="flex items-center space-x-2 relative">
            <Tooltip content="Guardar" keys={[]} position="bottom">
              <button
                onClick={handleSave}
                className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Guardar"
              >
                <Save className="w-5 h-5" />
              </button>
            </Tooltip>
            <Tooltip content="Exportar" keys={[]} position="bottom">
              <button
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Exportar"
              >
                <Download className="w-5 h-5" />
              </button>
            </Tooltip>
            <div className={`absolute top-full mt-2 right-0 p-2 bg-white rounded-lg shadow-xl border border-gray-200 z-40 flex flex-col space-y-2 transition-all duration-200 ease-out transform ${isExportMenuOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`}>
              <button
                onClick={() => handleExport('png')}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Image className="w-4 h-4" />
                <span>Imagen</span>
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};