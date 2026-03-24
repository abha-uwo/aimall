import { motion, Variants } from 'framer-motion';
import { Target, Zap, Globe } from 'lucide-react';

const visionStats = [
  { icon: <Target size={18} />, label: 'AI Strategy', val: 'Enterprise' },
  { icon: <Zap size={18} />, label: 'Automation', val: 'Fast-Track' },
  { icon: <Globe size={18} />, label: 'Reach', val: 'Global' },
];

export default function Vision() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, x: 0, filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: `
      .horizon-layout {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start; 
        max-width: 1500px;
        margin: 0 auto;
        min-height: 100vh;
        padding-top: 15vh;
        padding-bottom: 10vh;
        padding-left: 18%; /* Reduced gap */
        position: relative;
      }
      .horizon-wrap {
        width: 45%; 
        position: relative;
        z-index: 10;
      }
      .horizon-layer {
        position: relative;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .horizon-layer:hover {
        padding-left: 2rem;
        border-bottom-color: rgba(139, 92, 246, 0.4);
      }
      .horizon-anchor {
        width: 25px;
        height: 2.5px;
        background: #8b5cf6;
        margin-bottom: 0.8rem;
        box-shadow: 0 0 10px #8b5cf6;
      }
      @media (max-width: 900px) {
        .horizon-layout { padding-top: 55vh; justify-content: center; padding-left: 1.5rem; }
        .horizon-wrap { max-width: 100%; }
      }
    `}} />
    
    <section className="vision-section relative overflow-hidden" id="vision">
      {/* 🔮 Robot Anchor Aura */}
      <motion.div 
        initial={{ opacity: 0 }} whileInView={{ opacity: 0.3 }} transition={{ duration: 2 }}
        style={{
          position: 'absolute', left: '-10%', top: '10%', width: '800px', height: '800px',
          background: 'radial-gradient(circle, #8b5cf6 0%, #06b6d4 50%, transparent 70%)',
          filter: 'blur(120px)', zIndex: -1, pointerEvents: 'none'
        }} 
      />

      <div className="horizon-layout">
        <motion.div 
          className="horizon-wrap"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="horizon-header" style={{ marginBottom: '2.5rem' }}>
            <motion.span 
              variants={itemVariants}
              style={{ color: 'white', letterSpacing: '-0.02em', textTransform: 'uppercase', fontSize: 'clamp(2.5rem, 6vw, 3.2rem)', fontWeight: 900, display: 'block', marginBottom: '0.5rem' }}
            >
              Infinite Potential
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.3rem)', lineHeight: 1.1, color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              The Vision.
            </motion.h2>
          </div>

          <div className="horizon-layers">
            <motion.div className="horizon-layer" variants={itemVariants}>
              <div className="horizon-anchor" />
              <p style={{ color: '#e2e8f0', fontSize: '1.15rem', lineHeight: 1.4, fontWeight: 300, margin: 0 }}>
                "AI-Mall is designed as a <span style={{ color: '#8b5cf6', fontWeight: 600 }}>multi-layer intelligent commerce fabric</span> that powers the next wave of digital transformation."
              </p>
            </motion.div>

            <motion.div className="horizon-layer" variants={itemVariants}>
              <div className="horizon-anchor" style={{ background: '#06b6d4', boxShadow: '0 0 10px #06b6d4' }} />
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                From automation to analytics to AI-driven decisioning — we unify everything into a <span style={{ color: 'white', fontWeight: 500 }}>single operating canvas.</span>
              </p>
            </motion.div>

            <motion.div className="horizon-stats-grid" variants={itemVariants} style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '3rem'
            }}>
              {visionStats.map((stat) => (
                <div key={stat.label} style={{ 
                  padding: '1.5rem', background: 'rgba(255,255,255,0.02)', 
                  borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#06b6d4', display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>{stat.icon}</div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>{stat.val}</div>
                  <div style={{ color: '#64748b', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.1em' }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
