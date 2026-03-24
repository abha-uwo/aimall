'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Stars, PhoneCall } from 'lucide-react';

const soonItems = [
  {
    name: "AISA™",
    status: "Autonomous AI Agent",
    description: "Real-time workflows, voice interactions, memory layers.",
    badge: "In Development",
    icon: <Stars size={28} />,
    color: "#a855f7"
  },
  {
    name: "AI Calling™",
    status: "Voice Intelligence Engine",
    description: "24×7 AI calling for sales, support, onboarding.",
    badge: "Coming Soon",
    icon: <PhoneCall size={28} />,
    color: "#22d3ee"
  }
];

export default function ComingSoon() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="coming-soon-section">
      <div className="section-header">
        <motion.h2 
          className="section-title gradient-text glow-effect"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Expansions & Next-Gen Intelligence
        </motion.h2>
      </div>

      <motion.div 
        className="coming-soon-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {soonItems.map((item, index) => (
          <motion.div 
            key={index}
            className="soon-card glass"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="soon-glow-pulse" style={{ backgroundColor: item.color }} />
            <div className="soon-badge">
              <span className="shimmer-text">{item.badge}</span>
            </div>
            <div className="soon-icon" style={{ color: item.color }}>
              {item.icon}
            </div>
            <h3 className="soon-name">{item.name}</h3>
            <div className="soon-status-tag" style={{ borderBottomColor: item.color }}>
              {item.status}
            </div>
            <p className="soon-desc">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
