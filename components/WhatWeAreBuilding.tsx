'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Layers, Cuboid, MessageSquare, Mic, Terminal } from 'lucide-react';

const buildingItems = [
  {
    title: "A multi-category AI marketplace",
    icon: <Layers size={32} />,
    color: "#5d5ae6"
  },
  {
    title: "A-Series™ — our flagship SaaS product suite",
    icon: <Cuboid size={32} />,
    color: "#9b51e0"
  },
  {
    title: "AISA™ — conversational AI assistant (in progress)",
    icon: <MessageSquare size={32} />,
    color: "#2e71f2"
  },
  {
    title: "AI Calling™ — autonomous AI voice agents (coming soon)",
    icon: <Mic size={32} />,
    color: "#eb4899"
  },
  {
    title: "ACOS™ — Autonomous Commerce OS (patent-ready framework)",
    icon: <Terminal size={32} />,
    color: "#06b6d4"
  }
];

export default function WhatWeAreBuilding() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="building-section relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .building-section {
          padding: 20vh 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .building-main-title {
          font-size: 0.8rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.6em;
          color: #3b82f6;
          margin-bottom: 8rem;
          text-align: center;
        }
        .building-items-stack {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .building-row {
          display: grid;
          grid-template-columns: 100px 1fr 100px;
          align-items: center;
          padding: 3rem 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .building-row:hover {
          background: rgba(255,255,255,0.02);
          padding-left: 4rem;
          padding-right: 4rem;
        }
        .building-row-icon {
          font-size: 2rem;
          opacity: 0.4;
          transition: all 0.5s ease;
        }
        .building-row:hover .building-row-icon {
          opacity: 1;
          transform: scale(1.2) rotate(10deg);
        }
        .building-row-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          transition: all 0.5s ease;
        }
        .building-row:hover .building-row-title {
          color: white;
          padding-left: 2rem;
        }
        .building-row-status {
          font-size: 0.7rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          color: rgba(255,255,255,0.1);
          text-align: right;
        }
        .building-row:hover .building-row-status {
          color: #3b82f6;
        }
        .row-hover-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--x) var(--y), rgba(59, 130, 246, 0.05) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .building-row:hover .row-hover-glow {
          opacity: 1;
        }
      `}} />

      <motion.span 
        initial={{ opacity: 0, letterSpacing: '0.2em' }}
        whileInView={{ opacity: 1, letterSpacing: '0.6em' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="building-main-title"
      >
        Development Pipeline
      </motion.span>

      <div className="building-items-stack">
        {buildingItems.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty('--x', `${x}px`);
              e.currentTarget.style.setProperty('--y', `${y}px`);
            }}
            className="building-row group"
          >
            <div className="row-hover-glow" />
            
            <div className="building-row-icon" style={{ color: item.color }}>
              {item.icon}
            </div>

            <h3 className="building-row-title">
              {item.title}
            </h3>

            <div className="building-row-status">
              ACTIVE_ENV
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Spatial Elements */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
