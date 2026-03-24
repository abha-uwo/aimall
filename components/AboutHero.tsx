'use client';

import React from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export default function AboutHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 40);
    mouseY.set((clientY / innerHeight - 0.5) * 40);
  }

  const title = "About AI-Mall™";

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden" 
      onMouseMove={handleMouseMove}
    >
      {/* 🔮 HERO SPECIFIC AMBIENT OBJECTS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
        >
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[25%] w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" 
          />
          <motion.div 
            animate={{ 
              y: [0, 40, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[25%] w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" 
          />
        </motion.div>
        
        {/* Subtle Central Glow for Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 text-center px-6">
        <div className="mb-6">
          <motion.h1 
            className="text-white font-black tracking-tighter leading-[0.9]"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)' }}
          >
            {title.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-[0.2em] overflow-hidden py-2 px-1">
                <motion.span
                  initial={{ y: "100%", opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.6 + i * 0.15,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="inline-block gradient-text"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
          className="text-white/40 font-medium tracking-widest uppercase text-xs md:text-sm mt-8 max-w-xl mx-auto"
        >
          Powering the Next Generation of AI Commerce
        </motion.p>

        {/* Cinematic Vertical Line Decor */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 60, opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="w-[1px] bg-white mx-auto mt-20"
        />
      </div>
    </section>
  );
}
