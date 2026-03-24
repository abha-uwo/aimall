'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function AmbientBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement
  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate stable random values for blobs
  const blobs = useMemo(() => [
    { color: 'rgba(59, 130, 246, 0.15)', size: '40vw', x: '10%', y: '20%', duration: 20 },
    { color: 'rgba(139, 92, 246, 0.1)', size: '50vw', x: '50%', y: '60%', duration: 25 },
    { color: 'rgba(99, 102, 241, 0.12)', size: '45vw', x: '80%', y: '10%', duration: 22 },
  ], []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] bg-black overflow-hidden">
      {/* 🔮 Animated Ambient Blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute blur-[120px] rounded-full"
          style={{
            background: blob.color,
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* 🔦 Interactive Mouse Spotlight */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background: useMemo(() => `radial-gradient(1000px circle at var(--x) var(--y), rgba(59, 130, 246, 0.08), transparent 80%)`, []),
          // Using a CSS variable set by motion
        } as any}
        animate={{
          '--x': `${springX.get()}px`,
          '--y': `${springY.get()}px`,
        } as any}
      />

      {/* 💠 Deep Particle Field */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px] h-[1px] bg-blue-400/30 rounded-full"
          initial={{ 
            x: Math.random() * 100 + 'vw', 
            y: Math.random() * 100 + 'vh',
            opacity: Math.random() * 0.4 
          }}
          animate={{
            y: [null, '-100vh'],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 20
          }}
        />
      ))}

      {/* 💠 Fast Floating Accents */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`fast-${i}`}
          className="absolute w-1 h-32 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent blur-[2px]"
          initial={{ 
            x: Math.random() * 100 + 'vw', 
            y: '110vh',
            opacity: 0 
          }}
          animate={{
            y: '-20vh',
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}

      {/* 🔮 Background Mesh / Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
    </div>
  );
}
