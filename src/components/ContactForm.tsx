"use client";

import { useState, useEffect } from "react";
import { FormSubmitButton } from "@/components/ui/FormSubmitButton";

// Evitar errores TS
declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

// Componente auxiliar para renderizar SVG desde un string
const Icon = ({
  svgString,
  className = "",
}: {
  svgString: string;
  className?: string;
}) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: svgString }} />
);

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { name, email, eventType } = formData;
    setIsFormValid(!!(name.trim() && email.trim() && eventType));
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);

    const formElement = e.currentTarget;

    const formDataObj = new FormData(formElement);
    const data = Object.fromEntries(formDataObj.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const eventType = response.ok ? "success" : "error";
      const event = new CustomEvent("show-snackbar", {
        bubbles: true,
        composed: true,
        detail: { message: result.message, type: eventType },
      });

      formElement.dispatchEvent(event);

      if (response.ok) {
        formElement.reset();
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          message: "",
        });
        if (window.clarity) {
          window.clarity("set", "form_interaction", "contact_form_submitted");
          window.clarity("event", "form_submission_success");
        }
      }
    } catch {
      const event = new CustomEvent("show-snackbar", {
        bubbles: true,
        composed: true,
        detail: {
          message: "Error de conexión. Inténtalo de nuevo.",
          type: "error",
        },
      });
      formElement.dispatchEvent(event);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Clases base para los inputs para mantener consistencia
  const inputStyles =
    "flex h-10 w-full rounded-md border border-gray-300 bg-white/50 px-3 py-2 text-base font-sora ring-offset-background placeholder:text-gray-400 focus:border-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <>
      {/* ... Tu Snackbar no necesita cambios ... */}

      <div className="p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="font-sora text-sm font-medium text-gray-900"
              >
                Nombre Completo *
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoComplete="name"
                placeholder="Tu nombre"
                className={inputStyles}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="font-sora text-sm font-medium text-gray-900"
              >
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                placeholder="tu@email.com"
                className={inputStyles}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="font-sora text-sm font-medium text-gray-900"
              >
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                autoComplete="tel"
                placeholder="+52 (55) 1234-5678"
                className={inputStyles}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="eventType"
                className="font-sora text-sm font-medium text-gray-900"
              >
                Tipo de Evento *
              </label>
              <div className="relative w-full">
                <select
                  id="eventType"
                  name="eventType"
                  required
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className={`${inputStyles} appearance-none`}
                >
                  <option value="" disabled>
                    Selecciona tu evento
                  </option>
                  <option value="boda">Boda</option>
                  <option value="xv">XV Años</option>
                  <option value="corporativo">Evento Corporativo</option>
                  <option value="social">Evento Social</option>
                  <option value="otro">Otro</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="font-sora text-sm font-medium">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              placeholder="Cuéntanos sobre tu evento..."
              className={`${inputStyles} resize-none min-h-[80px]`}
            />
          </div>

        <FormSubmitButton
          isSubmitting={isSubmitting}
          disabledButton={!isFormValid}
        />
        </form>
      </div>

      <style>{`
        .btn-loader {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: white;
          animation: pulse-dot 1.4s ease-in-out infinite;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </>
  );
}
