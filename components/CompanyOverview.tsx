'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function CompanyOverview() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <section className="overview-section">
      <style dangerouslySetInnerHTML={{ __html: `
        .overview-section {
          padding: 20vh 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        .overview-container {
           max-width: 1200px;
           width: 90%;
           display: flex;
           flex-direction: row;
           gap: 8rem;
           align-items: flex-start;
           position: relative;
        }
        .overview-title-block {
          flex: 0 0 45%;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 30vh;
        }
        .overview-title-label {
          color: #3b82f6;
          font-size: 0.8rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.5em;
          margin-bottom: 2rem;
        }
        .overview-content-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4rem;
          padding-top: 1rem;
        }
        .divider-line {
          position: absolute;
          left: 45%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
        }
        .overview-text p {
          font-size: 1.4rem;
          line-height: 1.6;
          font-weight: 400;
          color: rgba(255,255,255,0.4);
          transition: color 0.5s ease;
        }
        .overview-text p strong {
          color: white;
          font-weight: 700;
        }
        @media (max-width: 1000px) {
          .overview-container { flex-direction: column; gap: 4rem; }
          .overview-title-block { flex: 1; position: static; }
          .divider-line { display: none; }
        }
      `}} />

      <div className="overview-container">
        <div className="divider-line" />
        
        <motion.div 
          className="overview-title-block"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="overview-title-label">Ecosystem Architecture</span>
          <h2 className="text-white font-black tracking-tighter leading-none" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
            Empowering <br />
            <span className="text-white/40">Commerce.</span>
          </h2>
        </motion.div>

        <motion.div 
          className="overview-content-block"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          <div className="overview-text">
            <p>
              AI-Mall™ is a <strong>next-generation AI commerce layer</strong> built under UWO (Unified Web Options).
            </p>
            <p className="mt-8">
              We consolidate AI applications, automation stacks, and partner innovations into a unified ecosystem designed for enterprises, creators, and global technology companies.
            </p>
          </div>
          
          {/* Subtle Decorative Circle */}
          <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center mt-12">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
