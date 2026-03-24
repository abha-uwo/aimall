'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function ProductHero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, filter: "blur(10px)" },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <section className="product-hero-section">
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="product-hero-title gradient-text">
          Your All-In-One AI <br />
          <span>Operating Layer for Business.</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="product-hero-copy">
          <p>
            A-Series™ consolidates automation, insights, and AI-driven execution into an integrated portfolio of purpose-built applications.
          </p>
          <p className="mt">
            Each module is optimized for speed, reliability, and enterprise-grade outcomes.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
