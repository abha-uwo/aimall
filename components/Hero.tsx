'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { LayoutGrid, ShieldCheck, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY };
};

export default function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { mouseX, mouseY } = useMousePosition();
  
  // Parallax layers
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const layer1X = useTransform(springX, (val: number) => val * 0.05);
  const layer1Y = useTransform(springY, (val: number) => val * 0.05);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const line1 = "The Unified Marketplace";
  const line2 = "for Enterprise AI";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 90 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      ref={targetRef} 
      className="hero-section relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-black" 
      style={{ perspective: '1200px' }}
    >
      {/* 🌌 Refined Particle / Light Leak Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ x: layer1X, y: layer1Y }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/5 rounded-full blur-[150px]" 
        />
        <motion.div 
          style={{ x: layer1X, y: layer1Y }}
          className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/5 rounded-full blur-[150px]" 
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ scale, opacity, y: yTranslate }}
        className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center"
      >
        {/* 🏷️ Smart Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-10 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-2 group cursor-pointer hover:border-white/20 transition-colors"
        >
          <Sparkles size={14} className="text-blue-400 group-hover:rotate-12 transition-transform" />
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/80">
            Next-Gen AI Ecosystem 2026
          </span>
          <ArrowRight size={12} className="text-white/40 group-hover:translate-x-1 transition-transform" />
        </motion.div>

        {/* 💎 Title with Mask Reveal */}
        <div className="flex flex-col items-center mb-8">
          <motion.h1 className="flex flex-col">
            <div className="overflow-hidden py-2">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tighter leading-[0.9] text-white"
              >
                {line1}
              </motion.div>
            </div>
            <div className="overflow-hidden py-2">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                className="text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tighter leading-[0.9] bg-gradient-to-b from-white via-white/70 to-white/30 bg-clip-text text-transparent"
              >
                {line2}
              </motion.div>
            </div>
          </motion.h1>
        </div>

        {/* 📜 Strategic Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-lg md:text-xl text-white/50 leading-relaxed font-medium mb-12"
        >
          A frictionless layer for deploying, scaling, and orchestrating 
          <span className="text-white/90"> enterprise-grade intelligence.</span> 
          The future of AI commerce starts here.
        </motion.p>

        {/* 🎬 Premium CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          <Link href="/access" className="w-full sm:w-auto">
            <MagneticButton>
              <button className="w-full px-10 py-5 bg-white text-black font-bold rounded-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500 scale-100 active:scale-95">
                Launch Platform
              </button>
            </MagneticButton>
          </Link>
          
          <Link href="/docs" className="w-full sm:w-auto">
            <MagneticButton>
              <button className="w-full px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 scale-100 active:scale-95">
                View Blueprint
              </button>
            </MagneticButton>
          </Link>
        </motion.div>
      </motion.div>

      {/* 🛸 Bottom Glow Section */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none blur-[100px]" />
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const midX = clientX - (left + width / 2);
    const midY = clientY - (top + height / 2);
    x.set(midX * 0.4);
    y.set(midY * 0.4);
  };

  const handleReset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleReset}
      style={{ x: springX, y: springY }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

