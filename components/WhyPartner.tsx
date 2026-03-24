'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Globe, Cpu, Users, Award, Handshake, ShieldCheck } from 'lucide-react';

const reasons = [
  {
    title: "Global Marketplace Access",
    desc: "Access to a global multi-category marketplace for AI tools and services.",
    icon: <Globe size={28} />,
    color: "#8b5cf6"
  },
  {
    title: "API Future Readiness",
    desc: "Seamlessly integrate with the AI-Mall ecosystem through standardized APIs.",
    icon: <Cpu size={28} />,
    color: "#3b82f6"
  },
  {
    title: "Vast Distribution",
    desc: "Direct distribution to SMBs, enterprises, and independent creators.",
    icon: <Users size={28} />,
    color: "#06b6d4"
  },
  {
    title: "Brand Visibility",
    desc: "Get listed and showcased prominently under the AI-Mall™ global brand.",
    icon: <Award size={28} />,
    color: "#ec4899"
  },
  {
    title: "Joint Opportunities",
    desc: "Participate in joint GTM strategies and global co-marketing initiatives.",
    icon: <Handshake size={28} />,
    color: "#f59e0b"
  },
  {
    title: "IP Governance",
    desc: "Securely manage IP through UWO-supported governance frameworks.",
    icon: <ShieldCheck size={28} />,
    color: "#10b981"
  }
];

export default function WhyPartner() {
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
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <section className="why-partner-section">
      <div className="section-header centered">
        <motion.h2 
          className="section-title gradient-text-white glow-effect"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Why Partner With Us?
        </motion.h2>
      </div>

      <motion.div 
        className="reasons-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {reasons.map((reason, index) => (
          <motion.div 
            key={index}
            className="reason-card-wrapper"
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="glass reason-card-inner" style={{ borderColor: `${reason.color}22` }}>
              <div 
                className="reason-icon-wrap" 
                style={{ backgroundColor: `${reason.color}15`, color: reason.color }}
              >
                {reason.icon}
              </div>
              <h3 className="reason-card-title">{reason.title}</h3>
              <p className="reason-card-desc">{reason.desc}</p>
              <div className="depth-reflection" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
