import { Send } from "@/components/ui/Icons.ts";

// Definimos las props que el botón aceptará
interface FormSubmitButtonProps {
  isSubmitting: boolean;
  disabledButton: boolean;
}

export function FormSubmitButton({ isSubmitting, disabledButton }: FormSubmitButtonProps) {
  const loader = (
    <div className="flex items-center justify-center gap-x-2">
      <div className="btn-loader">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <span>Enviando...</span>
    </div>
  );

  return (
    // Usamos un botón normal de HTML con las clases de Tailwind que ya tenías
    <button
      type="submit"
      disabled={isSubmitting || disabledButton}
      className="font-sora font-semibold w-full bg-indigo-600 text-white hover:bg-indigo-700 py-3 relative overflow-hidden inline-flex items-center justify-center rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
    >
      {isSubmitting ? loader : (
        <div className="flex items-center justify-center space-x-2">
          <span
            className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-current"
            dangerouslySetInnerHTML={{ __html: Send }}
          />
          <span>Enviar Mensaje</span>
        </div>
      )}
    </button>
  );
}