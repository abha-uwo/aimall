'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function CTASection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <section className="cta-section">
      <motion.div 
        className="cta-glass-container glass"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="cta-glow-bg" />
        <div className="cta-content">
          <motion.h2 className="cta-heading gradient-text">
            Partner Early → Join the <br />
            <span>A-Series™ Innovation Program</span>
          </motion.h2>

          <motion.div 
            className="cta-btn-wrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="cta-btn btn-primary glow-shadow">
              Reserve Your Access
              <div className="btn-light-burst" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
