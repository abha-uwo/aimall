'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CalloutBanner() {
  return (
    <section className="callout-banner-section">
      <motion.div 
        className="banner-inner glass glow-shadow"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="banner-gradient-bg" />
        <div className="banner-light-streak-container">
            <div className="light-streak" />
            <div className="light-streak second" />
        </div>
        
        <div className="banner-content">
          <motion.h3 
            className="banner-text shimmer-text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            AISA™ & AI Calling — In Progress. Early collaboration available.
          </motion.h3>
        </div>
      </motion.div>
    </section>
  );
}
