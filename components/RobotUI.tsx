'use client';

import React, { useMemo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type RobotUIProps = {
  scrollRef: React.MutableRefObject<number>;
  density?: number; 
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function RobotUI({ scrollRef, density = 10 }: RobotUIProps) {
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(0);

  // Smooth position tracking (matches the Hape-style movement logic)
  useEffect(() => {
    const fn = () => {
      const scroll = window.scrollY;
      const width = Math.min(window.innerWidth, 1440);
      
      // Hidden in Hero (0 - 300)
      if (scroll < 300) {
        setScale(0);
        setOpacity(0);
      } 
      // Value Pillars: LEFT (300 - 1800)
      else if (scroll < 1800) {
        setTargetX(-width * 0.26);
        setTargetY(0);
        setScale(width < 768 ? 0.75 : 1);
        setOpacity(1);
      }
      // Modules: RIGHT (1800 - 4500)
      else if (scroll < 4500) {
        setTargetX(width * 0.26);
        setTargetY(0);
        setScale(width < 768 ? 0.75 : 1);
        setOpacity(1);
      }
      // Vision/Footer: LEFT (4500+)
      else {
        setTargetX(-width * 0.26);
        setTargetY(0);
        setScale(width < 768 ? 0.75 : 1);
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', fn, { passive: true });
    fn(); // Initial run
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const hearts = useMemo(() => {
    const count = clamp(density, 8, 18);
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: (Math.random() * 2 - 1) * 200, 
      y: 100 + Math.random() * 250, 
      size: 10 + Math.random() * 20,
      opacity: 0.4 + Math.random() * 0.5,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      drift: (Math.random() * 2 - 1) * 30
    }));
  }, [density]);

  return (
    <motion.div
      className="robot-persistent-ui"
      animate={{ 
        x: targetX,
        y: targetY,
        scale: scale,
        opacity: opacity
      }}
      transition={{ type: "spring", stiffness: 45, damping: 18, mass: 1.2 }}
      style={{
        position: 'fixed',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      {/* Floating hearts particle system */}
      <div className="hearts-system">
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="mini-heart"
            style={{
              position: 'absolute',
              left: h.x,
              top: h.y,
              opacity: h.opacity,
            }}
            animate={{
              y: [-0, -280],
              x: [0, h.drift],
              opacity: [h.opacity, 0.2, 0],
            }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <div className="heart-shape" style={{ width: h.size, height: h.size }} />
          </motion.div>
        ))}
      </div>

      {/* Main Robot Graphic */}
      <motion.div 
        className="robot-hero-root"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ pointerEvents: 'auto' }}
      >
        <div className="robot-floating-card-bg" />

        <div className="robot-stack">
          {/* Head & Face */}
          <div className="robot-head-shell">
            <div className="antenna antenna-l">
              <div className="stalk" />
              <div className="glow-cyan" />
            </div>
            <div className="antenna antenna-r">
              <div className="stalk" />
              <div className="glow-cyan" />
            </div>

            <div className="head-body">
              <div className="gloss-overlay" />
              <div className="screen-face">
                <div className="eyes-box">
                  <div className="eye-dash" />
                  <div className="eye-dash" />
                </div>
                <div className="smile-curve" />
              </div>
              <div className="blush-spot l" />
              <div className="blush-spot r" />
            </div>
          </div>

          <div className="neck-spacer" />

          {/* Torso & Interaction */}
          <div className="robot-torso-shell">
            <div className="body-plate">
              <div className="chest-badge" />
              
              <div className="arm l" />
              <div className="arm r" />

              <div className="interaction-center">
                <div className="robot-hand" />
                
                {/* GIFT HEART */}
                <motion.div
                  className="central-heart-gift"
                  animate={{ 
                    scale: [1, 1.08, 1],
                    filter: ["drop-shadow(0 0 10px rgba(236,72,153,0.3))", "drop-shadow(0 0 25px rgba(236,72,153,0.6))", "drop-shadow(0 0 10px rgba(236,72,153,0.3))"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="heart-3d-look">
                    <div className="h-core" />
                    <div className="h-left" />
                    <div className="h-right" />
                  </div>
                  <div className="heart-face-mini">
                    <div className="mini-eyes"><span /> <span /></div>
                    <div className="mini-smile" />
                  </div>
                </motion.div>

                <div className="robot-hand" />
              </div>

              <div className="feet-base">
                <div className="foot-block" />
                <div className="foot-block" />
              </div>
            </div>
          </div>
        </div>

        <div className="ground-shadow" />
      </motion.div>
    </motion.div>
  );
}
