'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function LeadershipSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <section className="leadership-section relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .leadership-section {
          padding: 20vh 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .leadership-main-title {
          font-size: 0.8rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.6em;
          color: #3b82f6;
          margin-bottom: 6rem;
        }
        .founder-block {
          max-width: 800px;
          text-align: center;
          position: relative;
          z-index: 10;
        }
        .founder-name-monument {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          color: white;
          line-height: 1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        .founder-title-label {
          font-size: 1.1rem;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 3rem;
          display: block;
        }
        .founder-quote {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.5);
          max-width: 600px;
          margin: 0 auto;
        }
        .leadership-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          filter: blur(80px);
          z-index: -1;
        }
      `}} />

      <motion.span 
        initial={{ opacity: 0, letterSpacing: '0.2em' }}
        whileInView={{ opacity: 1, letterSpacing: '0.6em' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="leadership-main-title"
      >
        Executive Authority
      </motion.span>

      <div className="leadership-glow" />

      <motion.div 
        className="founder-block"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <h3 className="founder-name-monument">
          Gurumukh P. Ahuja
        </h3>
        <span className="founder-title-label">Founder & Chief Architect</span>

        <p className="founder-quote">
          A visionary leader building a global ecosystem of AI, consciousness-based intelligence, and scalable digital infrastructure.
        </p>

        {/* Decorative elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="mt-16 w-12 h-12 border border-blue-500/20 rounded-full mx-auto"
        />
      </motion.div>
    </section>
  );
}
