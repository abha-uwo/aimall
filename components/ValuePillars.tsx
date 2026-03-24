'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { LayoutGrid, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

const pillars = [
  {
    id: "01",
    title: "One Platform, Multiple AI Apps",
    desc: "A-Series™ delivers business-ready automation and cognitive intelligence through a unified interface designed for the modern age.",
    icon: <LayoutGrid size={22} />,
    color: '#3b82f6',
  },
  {
    id: "02",
    title: "Enterprise-Grade Architecture",
    desc: "Built for extreme scale, security, and plug-and-play integrations with mission-critical legacy and core systems.",
    icon: <ShieldCheck size={22} />,
    color: '#8b5cf6',
  },
  {
    id: "03",
    title: "Global AI Marketplace",
    desc: "A curated hub for enterprise and consumer AI applications, simplifying deployment at an unprecedented global scale.",
    icon: <ShoppingBag size={22} />,
    color: '#06b6d4',
  },
];

export default function ValuePillars() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-black py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* 🔮 Background Atmospheric Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto overflow-visible">
        {/* 🚨 RECALIBRATED 4-COLUMN GRID: 1.1x Header + 3x Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1fr 1fr 1fr', // Slightly reduced header to fit all 3 cards
          alignItems: 'stretch', 
          justifyContent: 'center',
          gap: '20px',
          width: '100%',
        }} className="pillars-rebalanced-grid" onMouseLeave={() => setHoveredIndex(null)}>
          
          {/* 🏛️ COLUMN 01: TEXT BLOCK (Anchored to Top/Bottom) */}
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            padding: '12px 10px 12px 0',
            textAlign: 'right',
            gridRow: '1',
            height: '100%' // Ensure full height for space-between
          }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', height: '100%', justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ 
                  color: '#3b82f6', 
                  fontSize: '11px', 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.4rem', 
                  display: 'block',
                  marginBottom: '2.5rem'
                }}>
                  Platform Vision
                </span>

                <h2 className="text-white font-black tracking-tight mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 0.95 }}>
                  WHY <br />
                  <span className="text-white/60">AI MALL?</span>
                </h2>

                <p className="text-white/40 text-[15px] font-medium leading-relaxed max-w-[320px]">
                  Next-gen infrastructure for <br />
                  <span className="text-white/80">tomorrow's AI enterprise.</span>
                </p>
              </div>

              <motion.a 
                href="/ecosystem"
                whileHover={{ x: -10 }} 
                className="group flex flex-row-reverse items-center gap-4 text-white/50 hover:text-white font-bold text-[11px] uppercase tracking-widest transition-all mb-2"
              >
                Explore Ecosystem
                <ArrowRight size={16} className="text-blue-500 group-hover:-translate-x-2 transition-transform" />
              </motion.a>
            </motion.div>
          </div>

          {/* 🃏 COLUMNS 02-04: SYSTEM MODULES */}
          {pillars.map((pillar, i) => {
            const isHovered = hoveredIndex === i;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;

            return (
              <CardItem key={i} pillar={pillar} isHovered={isHovered} isOtherHovered={isOtherHovered} i={i} onHover={setHoveredIndex} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CardItem({ pillar, isHovered, isOtherHovered, i, onHover }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function onMouseMove(event: any) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      onMouseEnter={() => onHover(i)}
      onMouseMove={onMouseMove}
      initial={{ x: 200, opacity: 0 }} // Recalibrated Right Swipe
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: i * 0.25, 
        duration: 1.6, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      animate={{
        scale: isHovered ? 1.02 : 1,
        opacity: isOtherHovered ? 0.6 : 1,
      }}
      style={{ 
        cursor: 'pointer',
        zIndex: isHovered ? 20 : 10,
        rotateX,
        rotateY,
        perspective: 1000
      }}
    >
      <div 
        style={{
          padding: '24px 20px',
          height: '100%',
          borderRadius: '20px',
          background: isHovered 
            ? `radial-gradient(400px circle at ${x.get() + 150}px ${y.get() + 150}px, rgba(255,255,255,0.06), transparent 80%), rgba(20, 20, 20, 0.4)`
            : 'rgba(20, 20, 20, 0.4)',
          border: isHovered ? `1px solid ${pillar.color}40` : '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(30px)',
          transition: 'border 0.4s ease, background 0.1s ease',
          boxShadow: isHovered 
            ? `0 30px 60px -12px rgba(0,0,0,0.8), 0 0 30px ${pillar.color}10` 
            : '0 10px 30px rgba(0,0,0,0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Glow on Hover */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 0% 0%, ${pillar.color}05, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.6s ease'
        }} />

        <div className="relative z-10">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '12px', 
              background: isHovered ? pillar.color : 'rgba(255,255,255,0.03)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: isHovered ? 'white' : pillar.color,
              transition: 'all 0.4s ease'
            }}>
              {pillar.icon}
            </div>
            <span style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              System Module {pillar.id}
            </span>
          </div>

          <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em' }}>
            {pillar.title}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.92rem', lineHeight: 1.6, fontWeight: 500 }}>
            {pillar.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
