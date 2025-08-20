import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/components/ImageWithFallback';

const projectVideos = [
  {
    title: "Boda Elegante",
    image: "https://images.unsplash.com/photo-1739909198159-a834175bd911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW52aXRhdGlvbiUyMGVsZWdhbnQlMjBkZXNpZ258ZW58MXx8fHwxNzU1NjU0NDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Premios Monarca",
    image: "https://images.unsplash.com/photo-1689773132576-6a3a36238cd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZXZlbnQlMjBpbnZpdGF0aW9uJTIwZ29sZHxlbnwxfHx8fDE3NTU2NTQ0NDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "XV Años Luxury",
    image: "https://images.unsplash.com/photo-1736482002168-153edd469de0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWluY2VhJUMzJUIxZXJhJTIwY2VsZWJyYXRpb24lMjBpbnZpdGF0aW9ufGVufDF8fHx8MTc1NTY1NDQ1MHww&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function AnimatedMockup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectVideos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x: x * 5, y: y * 5 });
  };

  return (
    <motion.div
      className="relative"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-60"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
          filter: 'blur(40px)',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="relative z-10 bg-white/20 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/30"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) translateZ(0px)`
        }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 relative overflow-hidden border border-white/20">
          <div className="aspect-[9/16] w-64 relative bg-white/5 rounded-xl overflow-hidden border border-white/10">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={projectVideos[currentIndex].image}
                alt={projectVideos[currentIndex].title}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                  <div className="text-white text-sm mb-1" style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600 }}>
                    {projectVideos[currentIndex].title}
                  </div>
                  <div className="text-white/80 text-xs" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Invitación Digital
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md border border-white/30">
                <div className="text-white/70 text-xs" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Live Preview
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-3 space-x-2">
          {projectVideos.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-indigo-500' : 'bg-white/30'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: index === currentIndex ? 1.2 : 0.8 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}