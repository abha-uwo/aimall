'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function MissionSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <section className="mission-section">
      <style dangerouslySetInnerHTML={{ __html: `
        .mission-section {
          padding: 30vh 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          z-index: 10;
        }
        .mission-visual-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mission-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.03);
        }
        .mission-label {
          color: #3b82f6;
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.8rem;
          margin-bottom: 4rem;
          display: block;
        }
        .mission-text-monument {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
        }
        .mission-glow-behind {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
          z-index: -1;
          filter: blur(80px);
        }
        .section-divider-glow {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(93, 90, 230, 0.4), transparent);
          position: absolute;
          top: 0;
          box-shadow: 0 0 20px rgba(93, 90, 230, 0.2);
        }
      `}} />

      <div className="section-divider-glow" />

      {/* 🚀 SPATIAL BACKGROUND ELEMENTS */}
      <div className="mission-visual-bg">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 180] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="mission-ring w-[600px] h-[600px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, -180] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="mission-ring w-[900px] h-[900px] border-dashed" 
        />
        <div className="mission-glow-behind" />
      </div>

      <div className="mission-content relative z-10 px-6">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mission-label"
        >
          Institutional Creed
        </motion.span>

        <div className="mission-text-monument">
          <motion.p 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="mission-text gradient-text leading-[1.1] font-black tracking-tight"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          >
            To accelerate AI adoption by eliminating complexity and delivering ready-to-deploy digital intelligence.
          </motion.p>
        </div>

        {/* Floating Decorative Dots */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mt-20 flex justify-center gap-4"
        >
          <div className="w-1 h-1 rounded-full bg-blue-500/50" />
          <div className="w-1 h-1 rounded-full bg-purple-500/50" />
          <div className="w-1 h-1 rounded-full bg-blue-500/50" />
        </motion.div>
      </div>
    </section>
  );
}
