import { X } from "lucide-react";
import { Modal } from "@/components/ui-app/Modal";

export const ModalAyuda = ({ setModalType, modalType }) => {
    return (
        <Modal isOpen={modalType === 'help'} onClose={() => setModalType(null)}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-sora font-bold text-2xl md:text-3xl text-gray-900">
              Atajos de Teclado y Ayuda
            </h3>
            <button
              onClick={() => setModalType(null)}
              className="inline-flex items-center gap-x-2 text-gray-600 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 px-3 py-1.5 rounded-full transition-colors duration-300 flex-shrink-0"
            >
              <X className="w-6 h-6" />
              <span className="text-sm font-medium">Cerrar</span>
            </button>
          </div>
          
          <div className="font-sora text-gray-700">
            <h4 className="font-semibold text-lg text-gray-900 mb-2 mt-4">Navegación</h4>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center space-x-2">
                <span className="flex items-center space-x-2">
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">Espacio</span>
                  <span>+</span>
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">Click</span>
                </span>
                <span>- Mover el lienzo</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="flex items-center space-x-2">
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">Z</span>
                  <span>+</span>
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">Click</span>
                </span>
                <span>- Acercar (Zoom In)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="flex items-center space-x-2">
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">Z</span>
                  <span>+</span>
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">Shift</span>
                  <span>+</span>
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">Z</span>
                </span>
                <span>- Alejar (Zoom Out)</span>
              </li>
            </ul>

            <h4 className="font-semibold text-lg text-gray-900 mb-2">Herramientas</h4>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center space-x-2">
                <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">V</span>
                <span>- Seleccionar</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">M</span>
                <span>- Crear mesa</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">T</span>
                <span>- Texto</span>
              </li>
            </ul>

            <h4 className="font-semibold text-lg text-gray-900 mb-2">Acciones</h4>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center space-x-2">
                <span className="flex items-center space-x-2">
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">⌘</span>
                  <span>+</span>
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">Z</span>
                </span>
                <span>- Deshacer</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="flex items-center space-x-2">
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">⌘</span>
                  <span>+</span>
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">Shift</span>
                  <span>+</span>
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">Z</span>
                </span>
                <span>- Rehacer</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="flex items-center space-x-2">
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">⌘</span>
                  <span>+</span>
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">C</span>
                </span>
                <span>- Copiar</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="flex items-center space-x-2">
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">⌘</span>
                  <span>+</span>
                  <span className="px-2 py-1 border border-gray-600 rounded-md bg-gray-700 text-xs text-white shadow-sm">V</span>
                </span>
                <span>- Pegar</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">Contacto</h4>
              <p>Si encuentras algún problema o tienes sugerencias, no dudes en contactarme.</p>
            </div>
          </div>
        </Modal>
    )
}