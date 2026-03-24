'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function PartnerHero() {
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
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  return (
    <section className="partner-hero-section">
      <motion.div 
        className="partner-hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="partner-hero-title gradient-text-white"
          variants={itemVariants}
        >
          Co-Build the Future <br />
          <span>of Global AI Commerce.</span>
        </motion.h1>

        <motion.p 
          className="partner-hero-subheading"
          variants={itemVariants}
        >
          We’re onboarding select technology companies, SaaS providers, automation studios, and AI product teams for early integration into AI-Mall.
        </motion.p>

        <motion.div 
          className="partner-hero-badges"
          variants={itemVariants}
        >
            <span className="partner-badge glass">Select Partnerships</span>
            <span className="partner-badge glass">Early Integration</span>
            <span className="partner-badge glass">Global Access</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
