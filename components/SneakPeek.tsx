'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Cpu, Globe, Zap, Palette } from 'lucide-react';

const modules = [
  { title: "Aibiz™", icon: <Globe size={32} />, color: "#3b82f6", id: "01", desc: "Corporate Strategy" },
  { title: "Aistream™", icon: <Zap size={32} />, color: "#8b5cf6", id: "02", desc: "Data Streaming" },
  { title: "AIHIRE™", icon: <Cpu size={32} />, color: "#06b6d4", id: "03", desc: "Talent Sourcing" },
  { title: "Aistudio™", icon: <Palette size={32} />, color: "#ec4899", id: "04", desc: "Creative Suite" },
];

export default function SneakPeek() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-black py-40 px-6 overflow-hidden" id="sneak">
      {/* 🔮 Background Accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-16">
          {/* 📐 Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-purple-500 text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                Next Generation
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                Preview <span className="text-white/30 italic">A-Series™.</span>
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/40 text-sm font-bold uppercase tracking-[0.2em]"
            >
              Deployment Ready 2026
            </motion.p>
          </div>

          {/* 🃏 Cards Container */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {modules.map((mod, i) => (
              <ProjectCard 
                key={i} 
                mod={mod} 
                i={i} 
                isHovered={hoveredIndex === i}
                isOtherHovered={hoveredIndex !== null && hoveredIndex !== i}
                onHover={setHoveredIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ mod, i, isHovered, isOtherHovered, onHover }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

  function onMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const midX = event.clientX - (rect.left + rect.width / 2);
    const midY = event.clientY - (rect.top + rect.height / 2);
    x.set(midX);
    y.set(midY);
  }

  return (
    <motion.div
      onMouseEnter={() => onHover(i)}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: i * 0.1, 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      style={{ 
        rotateX,
        rotateY,
        perspective: 1000,
        zIndex: isHovered ? 20 : 10
      }}
      className="relative aspect-[4/5]"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          opacity: isOtherHovered ? 0.4 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full rounded-[40px] bg-[#0a0a0a] border border-white/5 backdrop-blur-3xl p-8 flex flex-col items-center justify-between group cursor-pointer overflow-hidden transition-colors hover:border-white/20"
      >
        {/* Glow Overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${mod.color}20, transparent 70%)`
          }}
        />

        <div className="w-full h-full relative z-10 flex flex-col items-center justify-between">
          <div className="w-full flex justify-between items-start">
            <span className="text-[10px] font-black text-white/20 tracking-[0.3em] uppercase">
              {mod.id} / SEC
            </span>
            <div className="text-white/20 group-hover:text-white transition-colors">
              <ArrowUpRight size={20} />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <motion.div 
              animate={{ 
                y: isHovered ? -10 : 0,
                color: isHovered ? mod.color : "#fff" 
              }}
              className="p-6 bg-white/5 rounded-[32px] group-hover:bg-white/10 transition-colors"
            >
              {mod.icon}
            </motion.div>
            <div className="text-center">
              <h3 className="text-3xl font-black text-white tracking-tighter mb-1">
                {mod.title}
              </h3>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30">
                {mod.desc}
              </p>
            </div>
          </div>

          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
             <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2, delay: i * 0.2 }}
                className="h-full bg-white/20"
                style={{ backgroundColor: mod.color }}
             />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
