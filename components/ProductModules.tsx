'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { LineChart, PlayCircle, Cpu, Briefcase, Pencil, Megaphone, HelpCircle, Laptop } from 'lucide-react';

const products = [
  {
    name: "Aibiz™",
    description: "Business Intelligence OS. Real-time analytics, forecasting, and automated reporting.",
    icon: <LineChart size={32} />,
    color: "#5d5ae6"
  },
  {
    name: "Aistream™",
    description: "Media & Content Automation. Autogenerate, manage, and distribute content at scale.",
    icon: <PlayCircle size={32} />,
    color: "#9b51e0"
  },
  {
    name: "Aicraft™",
    description: "Workflow & Task Automation. Build autonomous workflows with zero human friction.",
    icon: <Cpu size={32} />,
    color: "#2e71f2"
  },
  {
    name: "AiOffice™",
    description: "Smart Workspace Suite. Meetings, docs, scheduling, and collaboration powered by AI.",
    icon: <Briefcase size={32} />,
    color: "#06b6d4"
  },
  {
    name: "Aistudio™",
    description: "Creative Engine. Design, audio, video, and campaign generation.",
    icon: <Pencil size={32} />,
    color: "#eb4899"
  },
  {
    name: "AiSales™",
    description: "Sales Acceleration Platform. Prospecting, outreach automation, and intelligent pipelines.",
    icon: <Megaphone size={32} />,
    color: "#f59e0b"
  },
  {
    name: "AiDesk™",
    description: "Support Automation. AI-powered helpdesk with autonomous ticket resolution.",
    icon: <HelpCircle size={32} />,
    color: "#10b981"
  },
  {
    name: "Aihome™",
    description: "Personal AI Suite. For consumers, productivity, finance, and home automation.",
    icon: <Laptop size={32} />,
    color: "#ef4444"
  }
];

export default function ProductModules() {
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

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="product-modules-section">
      <div className="section-header">
        <motion.h2 
          className="section-title gradient-text glow-effect"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          A-Series™ Core Modules
        </motion.h2>
      </div>

      <motion.div 
        className="product-modules-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {products.map((p, index) => (
          <motion.div 
            key={index}
            className="product-card-wrapper"
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="glass product-card-inner" style={{ borderColor: `${p.color}22` }}>
              <div 
                className="card-glow-bg" 
                style={{ background: `radial-gradient(circle at center, ${p.color}15, transparent 70%)` }}
              />
              <div className="product-icon-wrap" style={{ color: p.color }}>
                {p.icon}
              </div>
              <h3 className="product-card-name">{p.name}</h3>
              <p className="product-card-desc">{p.description}</p>
              <div className="depth-reflection" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
