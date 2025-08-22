// src/components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
// import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/Label';
import { Send } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Aquí conectarías tu lógica de envío real (ej. a un servicio de email)
    // Por ahora, simulamos el envío:
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Resetear el formulario después de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', eventType: '', message: '' });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl min-h-[580px] flex items-center justify-center">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="inline-flex p-4 rounded-full bg-indigo-600 mb-4"
          >
            <Send className="text-white" size={24} />
          </motion.div>
          <h3 className="font-sora font-semibold text-2xl text-gray-900 mb-2">
            ¡Mensaje Enviado!
          </h3>
          <p className="font-sora text-gray-600">
            Te contactaremos dentro de las próximas 24 horas.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-sora text-gray-900">Nombre Completo *</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} required className="font-sora bg-white/50 border-gray-300 focus:border-indigo-500" placeholder="Tu nombre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sora text-gray-900">Email *</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required className="font-sora bg-white/50 border-gray-300 focus:border-indigo-500" placeholder="tu@email.com" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-sora text-gray-900">Teléfono</Label>
              <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="font-sora bg-white/50 border-gray-300 focus:border-indigo-500" placeholder="+52 (55) 1234-5678" />
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="eventType" className="font-sora text-gray-900">Tipo de Evento *</Label>
              <Select required value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
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
            </div> */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="font-sora text-gray-900">Mensaje *</Label>
            {/* <Textarea id="message" value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} required rows={4} className="font-sora bg-white/50 border-gray-300 focus:border-indigo-500 resize-none" placeholder="Cuéntanos sobre tu evento..." /> */}
          </div>
          {/* <Button type="submit" disabled={isSubmitting} className="font-sora font-semibold w-full bg-indigo-600 text-white hover:bg-indigo-700 py-3">
            <Send size={16} className="mr-2" />
            <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
          </Button> */}
        </form>
      )}
    </div>
  );
}