import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { FormSubmitButton } from "@/components/ui/FormSubmitButton";

// Evitar errores TS
declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, eventType: value }));
  };

  return (
    <>
    <div className="p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-sora text-gray-900">
              Nombre Completo *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              autoComplete="name"
              placeholder="Tu nombre"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-sora text-gray-900">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-sora text-gray-900">
              Teléfono
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              autoComplete="tel"
              placeholder="+52 (55) 1234-5678"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventType" className="font-sora text-gray-900">
              Tipo de Evento *
            </Label>
            <Select
              required
              name="eventType"
              value={formData.eventType}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="font-sora bg-white/50 border-gray-300 focus:border-indigo-500"/>
              <SelectContent>
                <SelectItem value="boda">Boda</SelectItem>
                <SelectItem value="xv">XV Años</SelectItem>
                <SelectItem value="corporativo">Evento Corporativo</SelectItem>
                <SelectItem value="social">Evento Social</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            placeholder="Cuéntanos sobre tu evento..."
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
