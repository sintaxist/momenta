import { motion } from 'motion/react';
import { Button } from './ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#D4AF37] rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#D4AF37] rounded-full opacity-30 animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-[#D4AF37] rounded-full opacity-10 animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-[#D4AF37] rounded-full opacity-25 animate-float-delayed"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl mb-6 text-[#F5F5F5] leading-tight"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Transformando Eventos en{' '}
          <span className="text-[#D4AF37]">Experiencias Digitales</span>{' '}
          Inolvidables
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl mb-12 text-[#F5F5F5] opacity-90 max-w-4xl mx-auto leading-relaxed"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          Diseño y desarrollo de plataformas web exclusivas para bodas, eventos corporativos y momentos únicos.{' '}
          <span className="text-[#D4AF37]">Por Alejandro Canek, UI/UX Engineer.</span>
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button 
            size="lg" 
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#1A1A1A] px-12 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#D4AF37]/20"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Cotizar Mi Evento
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#D4AF37] rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}