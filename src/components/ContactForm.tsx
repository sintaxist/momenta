"use client";

import { useState, useEffect } from "react";
import { FormSubmitButton } from "@/components/ui/FormSubmitButton";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { name, email, eventType } = formData;
    setIsFormValid(
      !!(
        name.trim() &&
        email.trim() &&
        eventType &&
        !errors.email &&
        !errors.phone
      )
    );
  }, [formData, errors]);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        error = "Correo inválido. Ej: usuario@dominio.com";
      }
    }
    if (name === "phone") {
      const phoneRegex = /^[0-9()+\-\s]*$/;
      if (value && !phoneRegex.test(value)) {
        error = "El teléfono solo puede contener números y símbolos válidos";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

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
        headers: { "Content-Type": "application/json" },
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

  const inputStyles =
    "flex h-11 w-full rounded-md border border-gray-300 bg-white/60 px-3 py-2 text-[15px] font-sora ring-offset-background placeholder:text-gray-400 focus:border-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <>
      <div className="p-8 max-w-[470px] rounded-3xl bg-white/50 backdrop-blur-xl border border-gray-200 shadow-lg shadow-gray-200/80 flex justify-center w-full m-auto lg:m-0">
        <form
          onSubmit={handleSubmit}
          className="space-y-5 w-full flex flex-col"
        >
          {/* Nombre */}
          <div className="space-y-1">
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

          {/* Email */}
          <div className="space-y-1">
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
              className={`${inputStyles} ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="font-sora text-sm font-medium text-gray-900"
            >
              Teléfono
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              autoComplete="tel"
              placeholder="+52 (55) 1234-5678"
              className={`${inputStyles} ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Tipo de evento */}
          <div className="space-y-1">
            <label
              htmlFor="eventType"
              className="font-sora text-sm font-medium text-gray-900"
            >
              Tipo de Evento *
            </label>
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
          </div>

          {/* Mensaje */}
          <div className="space-y-1">
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

          {/* Botón */}
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
