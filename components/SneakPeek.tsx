import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const modules = [
  { title: "Aibiz™", icon: "💼", color: "#5d5ae6", id: "01" },
  { title: "Aistream™", icon: "📡", color: "#9b51e0", id: "02" },
  { title: "AIHIRE™", icon: "🤝", color: "#2e71f2", id: "03" },
  { title: "Aistudio™", icon: "🎨", color: "#ec4899", id: "04" },
];

export default function SneakPeek() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-black py-32 px-6 md:px-12 lg:px-24 overflow-hidden" id="sneak">
      <div className="max-w-7xl mx-auto">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 4fr',
          gap: '40px',
          alignItems: 'stretch'
        }}>
          {/* 📐 SECTION HEADER (Vertical alignment for the horizontal grid) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '12px 0',
            textAlign: 'right'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', height: '100%', justifyContent: 'space-between' }}
            >
              <div>
                <span style={{ color: '#5d5ae6', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 800, display: 'block', marginBottom: '1.2rem', letterSpacing: '0.4rem' }}>
                  Next Gen
                </span>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'white', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>
                  Preview <br />
                  <span style={{ opacity: 0.5 }}>A-Series™.</span>
                </h2>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
                Explore All Modules
              </p>
            </motion.div>
          </div>

          {/* 🃏 HORIZONTAL CARDS GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }} onMouseLeave={() => setHoveredIndex(null)}>
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
      initial={{ x: 200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay: i * 0.2, 
        duration: 1.4, 
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
          padding: '32px 24px',
          height: '100%',
          borderRadius: '24px',
          background: isHovered 
            ? `radial-gradient(400px circle at ${x.get() + 150}px ${y.get() + 150}px, rgba(255,255,255,0.06), transparent 80%), rgba(20, 20, 20, 0.4)`
            : 'rgba(20, 20, 20, 0.5)',
          border: isHovered ? `1px solid ${mod.color}50` : '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(30px)',
          transition: 'border 0.4s ease, background 0.1s ease',
          boxShadow: isHovered 
            ? `0 30px 60px -12px rgba(0,0,0,0.8), 0 0 40px ${mod.color}15` 
            : '0 10px 30px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 50% 10%, ${mod.color}10, transparent 60%)`,
          opacity: isHovered ? 1 : 0.3,
          transition: 'opacity 0.6s ease'
        }} />

        <div className="relative z-10 flex flex-col items-center">
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '16px', 
            background: isHovered ? mod.color : 'rgba(255,255,255,0.04)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'white',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            marginBottom: '2rem',
            transform: isHovered ? 'scale(1.1) translateY(-5px)' : 'scale(1) translateY(0)',
            boxShadow: isHovered ? `0 15px 30px ${mod.color}40` : 'none'
          }}>
            {mod.icon}
          </div>
          
          <span style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.2rem', marginBottom: '1rem' }}>
            System Module {mod.id}
          </span>

          <h3 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            {mod.title}
          </h3>
          
          <div style={{ 
            opacity: isHovered ? 1 : 0.4, 
            transition: 'all 0.4s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: mod.color,
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1rem'
          }}>
            Experience <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
