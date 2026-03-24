'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function PartnerCTA() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <section className="partner-cta-section" style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '5%' }}>
      <motion.div 
        className="partner-cta-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ maxWidth: '800px', background: 'transparent', border: 'none' }}
      >
        <div className="partner-cta-glow-bg" />
        <div className="partner-cta-content" style={{ textAlign: 'right' }}>
          <motion.h2 
            className="partner-cta-heading"
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1.2, ease: "backOut" }}
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, color: 'white', marginBottom: '2rem' }}
          >
            Join the Next Era <br />
            <span style={{ opacity: 0.5, fontSize: '0.6em', letterSpacing: '0.1em', display: 'block', marginTop: '1rem' }}>of Integrated AI Commerce.</span>
          </motion.h2>

          <motion.div 
            className="partner-cta-btn-wrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <button className="partner-cta-btn btn-primary glow-shadow">
              Apply for Partnership →
              <div className="partner-btn-light-burst" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
