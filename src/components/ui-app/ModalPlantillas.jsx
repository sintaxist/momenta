import { X } from "lucide-react";
import { Modal } from "@/components/ui-app/Modal";

export const ModalPlantillas = ({ setModalType, modalType }) => {
  return (
    <Modal
      isOpen={modalType === "templates"}
      onClose={() => setModalType(null)}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-bold text-2xl md:text-3xl text-gray-900">
          Plantillas
        </h3>
        <button
          onClick={() => setModalType(null)}
          className="inline-flex items-center gap-x-2 text-gray-600 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 px-3 py-1.5 rounded-full transition-colors duration-300 flex-shrink-0"
        >
          <X className="w-6 h-6" />
          <span className="text-sm font-medium">Cerrar</span>
        </button>
      </div>
      <p className="font-sora font-normal text-gray-700 leading-relaxed">
        Aquí vendrán las plantillas de salones de fiestas.
      </p>
    </Modal>
  );
};
