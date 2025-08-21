'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';

const projectData = [
  {
    title: "Boda Elegante",
    video: "https://videos.pexels.com/video-files/7989667/7989667-hd_1080_1920_25fps.mp4"
  },
  {
    title: "Premios Monarca",
    video: "https://videos.pexels.com/video-files/5925286/5925286-uhd_1440_2560_24fps.mp4"
  },
  {
    title: "XV Años Luxury",
    video: "https://videos.pexels.com/video-files/5390857/5390857-uhd_1440_2732_30fps.mp4"
  }
];

export function AnimatedMockup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectData.length);
    }, 4000); // Cambiamos cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Una animación sutil cuando el video cambia
    controls.start({
      scale: [1, 1.02, 1],
      rotateY: [0, 3, 0],
      transition: { duration: 0.6, ease: "easeInOut" }
    });
  }, [currentIndex, controls]);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Elementos flotantes decorativos (bajo consumo) */}
      <motion.div
        className="absolute -top-8 -left-8 bg-indigo-500/80 p-3 rounded-xl shadow-lg"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-6 bg-white/20 rounded-sm"></div>
      </motion.div>

      <motion.div
        className="absolute -bottom-12 -right-12 bg-purple-500/80 p-4 rounded-2xl shadow-xl"
        animate={{ y: [5, -5, 5], rotate: [2, -2, 2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="font-sora text-white text-sm font-semibold">RSVP</div>
      </motion.div>

      {/* Marco del teléfono */}
      <motion.div
        animate={controls}
        className="relative w-80 h-[580px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-gray-700"
      >
        {/* Pantalla */}
        <div className="w-full h-full bg-black rounded-[2.2rem] overflow-hidden relative">
          
          {/* Contenido del video */}
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <video
              src={projectData[currentIndex].video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Overlay con información y controles */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {/* Controles de ventana (como en tu mockup original) */}
            <div className="flex space-x-1.5 p-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            {/* Overlay con título (como en tu mockup original) */}
            <div className="p-4 bg-gradient-to-t from-black/60 to-transparent">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                <div className="font-sora text-white text-sm font-semibold mb-1">
                  {projectData[currentIndex].title}
                </div>
                <div className="font-sora text-white/80 text-xs">
                  Invitación Digital
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}