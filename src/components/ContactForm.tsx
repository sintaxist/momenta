'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { FormSubmitButton } from '@/components/ui/FormSubmitButton';
import * as Icons from '@/components/ui/Icons.ts';

// Pequeño componente auxiliar para renderizar los SVGs de forma segura
const Icon = ({ svgString, className = '' }: { svgString: string; className?: string }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: svgString }} />
);

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', eventType: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', type: '', visible: false });

  useEffect(() => {
    const { name, email, eventType, message } = formData;
    // ✅ CAMBIO: La validación ahora comprueba si los campos obligatorios están llenos
    if (name.trim() && email.trim() && eventType && message.trim()) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData]);

  const showSnackbar = (message: string, type: 'success' | 'error') => {
    setSnackbar({ message, type, visible: true });
    setTimeout(() => {
      setSnackbar(prev => ({ ...prev, visible: false }));
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);

    // ✅ CAMBIO: Recolectamos los datos directamente del formulario para asegurar que no vayan vacíos
    const formElement = e.currentTarget;
    const data = Object.fromEntries(new FormData(formElement).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        showSnackbar(result.message, 'success');
        formElement.reset();
        setFormData({ name: '', email: '', phone: '', eventType: '', message: '' });
      } else {
        showSnackbar(result.message || 'Ocurrió un error en el servidor.', 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showSnackbar('Error de conexión. Inténtalo de nuevo.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <>
      <div 
        id="snackbar" 
        className={`snackbar ${snackbar.visible ? 'is-visible' : ''}`}
        style={{ 
          backgroundColor: snackbar.type === 'success' ? 'var(--chart-4)' : 'var(--destructive)',
        }}
      >
        <Icon 
          svgString={snackbar.type === 'success' ? Icons.CheckCircle2 : Icons.XCircle} 
          className="w-6 h-6" 
        />
        <span className="font-sora">{snackbar.message}</span>
      </div>

      {/* ✅ CAMBIO: Se quita la clase min-h-[580px] */}
      <div className="p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {/* ... inputs del formulario ... */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-sora text-gray-900">Nombre Completo *</Label>
              <Input id="name" name="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required className="font-sora bg-white/50 border-gray-300 focus:border-indigo-500" placeholder="Tu nombre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sora text-gray-900">Email *</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required className="font-sora bg-white/50 border-gray-300 focus:border-indigo-500" placeholder="tu@email.com" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-sora text-gray-900">Teléfono</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="font-sora bg-white/50 border-gray-300 focus:border-indigo-500" placeholder="+52 (55) 1234-5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventType" className="font-sora text-gray-900">Tipo de Evento *</Label>
              <Select required name="eventType" value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                <SelectTrigger className="font-sora bg-white/50 border-gray-300 focus:border-indigo-500">
                  <SelectValue placeholder="Selecciona tu evento" />
                </SelectTrigger>
                <SelectContent className="font-sora bg-white border-gray-200">
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
            <Label htmlFor="message" className="font-sora text-gray-900">Mensaje *</Label>
            <Textarea id="message" name="message" value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} required rows={4} className="font-sora bg-white/50 border-gray-300 focus:border-indigo-500 resize-none" placeholder="Cuéntanos sobre tu evento..." />
          </div>
          
          {/* ✅ CAMBIO: El botón ahora se deshabilita si el formulario no es válido */}
          <FormSubmitButton isSubmitting={isSubmitting} disabledButton={!isFormValid} />
        </form>
      </div>

      <style>{`
        /* Estilos del loader (sin cambios) */
        .btn-loader { display: flex; justify-content: center; align-items: center; gap: 8px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; background-color: white; animation: pulse-dot 1.4s ease-in-out infinite; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse-dot { 0%, 100% { transform: scale(0.8); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 1; } }
        
        /* ✅ CAMBIO: Estilos y animación para el Snackbar */
        .snackbar {
          position: fixed; top: 1rem; left: 50%;
          transform: translateX(-50%) translateY(-5rem);
          opacity: 0;
          padding: 1rem;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          transition: transform 0.4s ease-out, opacity 0.4s ease-out;
        }
        .snackbar.is-visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      `}</style>
    </>
  );
}