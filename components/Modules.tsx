import { motion } from 'framer-motion';

const modules = [
  { name: "Aihome™", desc: "Automate your living space with intelligent controls." },
  { name: "AiOffice™", desc: "Digital productivity and task automation for modern teams." },
  { name: "AiDesk™", desc: "Customer support and experience reimagined through AI." },
  { name: "Aisales™", desc: "Intelligent lead generation and conversion pipeline." }
];

export default function Modules() {
  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: `
      .canvas-layout {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start; /* Text on LEFT */
        max-width: 1500px;
        margin: 0 auto;
        min-height: 100vh;
        padding-top: 15vh;
        padding-bottom: 10vh;
        padding-left: 20%; /* Moved closer to center */
        position: relative;
      }
      .canvas-wrap {
        width: 55%; 
        position: relative;
        z-index: 10;
        text-align: left;
      }
      .canvas-stack {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }
      .canvas-filament {
        position: relative;
        padding: 2.5rem;
        background: rgba(255,255,255,0.02);
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 1.5rem;
        cursor: pointer;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      }
      .canvas-filament:hover {
        background: rgba(255,255,255,0.05);
        border-color: rgba(6, 182, 212, 0.4);
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 40px 80px rgba(0,0,0,0.6), inset 0 0 30px rgba(6,182,212,0.05);
      }
      .canvas-filament:hover .canvas-pulse {
        transform: scale(1.5);
        background: white;
        box-shadow: 0 0 20px white;
      }
      .canvas-pulse {
        width: 8px;
        height: 8px;
        background: #06b6d4;
        border-radius: 50%;
        box-shadow: 0 0 15px #06b6d4;
        position: relative;
        transition: all 0.4s ease;
      }
      .canvas-pulse::after {
        content: '';
        position: absolute;
        inset: -10px;
        border: 1px solid rgba(6, 182, 212, 0.2);
        border-radius: 50%;
        animation: canvas-flare 2s infinite linear;
      }
      @keyframes canvas-flare {
        0% { transform: scale(1); opacity: 0; }
        50% { opacity: 0.5; }
        100% { transform: scale(4); opacity: 0; }
      }
      @media (max-width: 900px) {
        .canvas-layout { padding-top: 55vh; justify-content: center; padding-right: 1.5rem; }
        .canvas-wrap { max-width: 100%; }
      }
    `}} />

    <section className="modules-section relative" id="modules">
      <div className="canvas-layout">
        <motion.div 
          className="canvas-wrap"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="canvas-header" style={{ marginBottom: '3rem' }}>
            <motion.span 
              initial={{ opacity: 0, letterSpacing: '1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ duration: 1.2 }}
              style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, display: 'block', marginBottom: '1rem' }}
            >
              Execution Layer
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'white', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, whiteSpace: 'nowrap' }}
            >
              Intelligent Performance.
            </motion.h2>
          </div>

          <div className="canvas-stack">
            {modules.map((mod, i) => (
              <motion.div 
                key={i} 
                className="canvas-filament"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="canvas-pulse" />
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 800, 
                    marginBottom: '0.6rem',
                    background: 'linear-gradient(to right, #ffffff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                  }}>
                    {mod.name}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, margin: 0, fontWeight: 400 }}>{mod.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
