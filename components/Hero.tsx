'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

import { LayoutGrid, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

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
  const layer2X = useTransform(springX, (val: number) => val * 0.1);
  const layer2Y = useTransform(springY, (val: number) => val * 0.1);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const line1 = "The Unified Marketplace";
  const line2 = "for Enterprise AI";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: "easeOut" }
    }
  } as any;

  const AnimatedText = ({ text, className, style }: { text: string, className?: string, style?: any }) => {
    return (
      <motion.div
        variants={{
          visible: { transition: { staggerChildren: 0.03 } }
        } as any}
        className={className}
        style={style}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={charVariants}
            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <section 
      ref={targetRef} 
      className="hero-section relative overflow-hidden bg-black flex items-center justify-center pt-24 pb-12" 
      style={{ minHeight: '100vh', perspective: '1000px' }}
    >
      {/* 🌌 Atmospheric Background with Parallax */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1: Slow Parallax */}
        <motion.div 
          style={{ x: layer1X, y: layer1Y }}
          className="absolute top-[20%] left-1/4 w-[60vw] h-[60vh] bg-blue-600/10 rounded-full blur-[120px]" 
        />
        
        {/* Layer 2: Fast Parallax Blobs */}
        <motion.div 
          style={{ x: layer2X, y: layer2Y }}
          className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vh] bg-purple-600/10 rounded-full blur-[100px]" 
        />

        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ x: layer2X, y: layer2Y }}
          className="absolute top-[40%] right-[20%] w-[30vw] h-[30vh] bg-indigo-500/10 rounded-full blur-[80px]" 
        />

        {/* 🔮 Background Mesh / Grid */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <motion.div
        style={{ scale, opacity, y: yTranslate, zIndex: 10 }}
        className="w-full max-w-7xl px-4 flex flex-col items-center text-center"
      >
        {/* 🏷️ Interactive Platform Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          style={{
            marginBottom: '2rem',
            padding: '0.6rem 1.25rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            cursor: 'default',
            width: 'fit-content',
            alignSelf: 'center',
            margin: '0 auto 2rem auto'
          }}
        >
          <div style={{ 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            background: '#60a5fa',
            boxShadow: '0 0 10px #60a5fa' 
          }} className="animate-pulse" />
          <span style={{ 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            fontWeight: 700, 
            letterSpacing: '0.15em', 
            color: 'white' 
          }}>
            Enterprise Intelligence Platform
          </span>
        </motion.div>

        {/* 🔥 Compact Powerful Headline */}
        <motion.h1 
          className="relative group cursor-default"
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex flex-col space-y-0 items-center">
            <AnimatedText 
              text={line1}
              style={{ 
                fontSize: 'clamp(1.8rem, 5vw, 3.8rem)', // Further reduced
                lineHeight: 1.0,
                fontWeight: 900, 
                fontFamily: "'Inter', sans-serif",
                color: 'white',
                letterSpacing: '-0.02em'
              }}
            />
            
            <AnimatedText 
              text={line2}
              style={{ 
                fontSize: 'clamp(1.8rem, 5vw, 3.8rem)', // Further reduced
                lineHeight: 1.0,
                fontWeight: 900, 
                fontFamily: "'Inter', sans-serif",
                color: 'transparent',
                backgroundImage: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.6))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                letterSpacing: '-0.02em'
              }}
            />
          </div>

          {/* ✨ Text Shimmer Effect Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-overlay opacity-30">
            <motion.div 
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
            />
          </div>
        </motion.h1>

        {/* 📋 Minimal Subtitle - Pushed down, bold, and larger as requested */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            color: 'white',
            opacity: 0.7, 
            maxWidth: '800px', 
            margin: '2rem auto 0 auto', 
            textAlign: 'center', 
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            fontWeight: 500, 
            lineHeight: 1.6, 
            letterSpacing: '0.01em',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          Unified infrastructure for the worlds most advanced AI models. 
          Built for the speed of modern enterprise.
        </motion.p>

        {/* 🔘 Premium CTAs - Styled properly as buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ 
            marginTop: '2rem', 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            gap: '1.25rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Link href="/demo">
            <MagneticButton>
              <button
                style={{
                  padding: '1.2rem 3rem',
                  background: 'white',
                  color: 'black',
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.3s ease',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Request Access
              </button>
            </MagneticButton>
          </Link>
          <Link href="/solutions">
            <MagneticButton>
              <button
                style={{
                  padding: '1.2rem 3rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                Explore Solutions
              </button>
            </MagneticButton>
          </Link>
        </motion.div>
      </motion.div>

      {/* 🔮 Background Glow Accents */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full h-[30%] bg-gradient-to-t from-[#6366f1]/20 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full h-[20%] bg-gradient-to-b from-[#a855f7]/10 to-transparent pointer-events-none blur-3xl" />
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const springXOffset = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springYOffset = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const midX = clientX - (left + width / 2);
    const midY = clientY - (top + height / 2);
    x.set(midX * 0.35);
    y.set(midY * 0.35);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: springXOffset, y: springYOffset, position: 'relative' }}
    >
      {children}
    </motion.div>
  );
}

