import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export default function AboutBackground() {
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  // Spring smooth movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  function onMouseMove(event: React.MouseEvent) {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 60);
    mouseY.set((clientY / innerHeight - 0.5) * 60);
  }

  const orbs = useMemo(() => [
    { size: 400, color: 'rgba(59, 130, 246, 0.1)', x: '10%', y: '15%', delay: 0 },
    { size: 500, color: 'rgba(139, 92, 246, 0.08)', x: '70%', y: '10%', delay: 1 },
    { size: 300, color: 'rgba(6, 182, 212, 0.05)', x: '20%', y: '60%', delay: 2 },
    { size: 450, color: 'rgba(168, 85, 247, 0.05)', x: '80%', y: '50%', delay: 0.5 },
    { size: 350, color: 'rgba(59, 130, 246, 0.06)', x: '40%', y: '80%', delay: 1.5 },
  ], []);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black"
      style={{ perspective: '1200px' }}
      onMouseMove={onMouseMove as any}
    >
      {/* 🔮 ANIMATED GRID */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
        }}
      />

      {/* 🌫️ MOVING GRADIENT MESH */}
      <motion.div 
        style={{ 
          x: springX, 
          y: springY,
          opacity: 0.4
        }}
        className="absolute inset-0"
      >
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.delay
            }}
            style={{
              position: 'absolute',
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              filter: 'blur(100px)',
              borderRadius: '50%',
            }}
          />
        ))}
      </motion.div>

      {/* 📡 FLOATING GLASS SHAPES */}
      <motion.div style={{ y: backgroundY, rotateX: backgroundRotate }} className="absolute inset-0 opacity-10">
        <div className="absolute top-[20%] left-[15%] w-64 h-64 border border-white/10 rounded-full blur-[2px]" />
        <div className="absolute top-[60%] right-[10%] w-96 h-96 border border-white/5 rounded-full blur-[1px]" />
        <div className="absolute bottom-[10%] left-[40%] w-48 h-48 border border-white/10 rotate-45" />
      </motion.div>

      {/* ✨ SUBTLE PARTICLES */}
      <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
    </div>
  );
}
