'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Layers, Cuboid, Workflow, Code, Building, Globe2 } from 'lucide-react';

const streams = [
  {
    name: "SaaS Vendor Integration",
    icon: <Layers size={32} />,
    color: "#6366f1"
  },
  {
    name: "AI Tool Providers",
    icon: <Cuboid size={32} />,
    color: "#8b5cf6"
  },
  {
    name: "Automation Agencies",
    icon: <Workflow size={32} />,
    color: "#3b82f6"
  },
  {
    name: "Developer Ecosystems",
    icon: <Code size={32} />,
    color: "#ec4899"
  },
  {
    name: "Enterprise Solutions Teams",
    icon: <Building size={32} />,
    color: "#f43f5e"
  },
  {
    name: "Global MNC Integrations",
    icon: <Globe2 size={32} />,
    color: "#fb923c"
  }
];

export default function PartnershipStreams() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const tileVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="partnership-streams-section">
      <div className="section-header centered">
        <motion.h2 
          className="section-title gradient-text-white glow-effect"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Partnership Streams
        </motion.h2>
      </div>

      <motion.div 
        className="streams-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {streams.map((stream, index) => (
          <motion.div 
            key={index}
            className="stream-tile glass"
            variants={tileVariants}
            whileHover={{ y: -5, scale: 1.05, rotate: 1 }}
          >
            <div className="stream-glow-bg" style={{ backgroundColor: stream.color }} />
            <div className="stream-tile-content">
              <div className="stream-icon" style={{ color: stream.color }}>
                {stream.icon}
              </div>
              <h3 className="stream-name">{stream.name}</h3>
            </div>
            <div className="stream-reflection" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
