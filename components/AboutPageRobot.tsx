'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPageRobot() {
  const robotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!robotRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Move from Bottom-Right to Mid-Left to Center/Right
    tl.to(robotRef.current, {
      x: "-50vw", // Glide Left
      y: "-20vh", // Float Up slightly
      rotation: 5,
      scale: 1.2,
      duration: 2
    }, 0.5);

    tl.to(robotRef.current, {
      x: "10vw", // Glide back toward right
      y: "-40vh", // Float Up more
      rotation: -5,
      scale: 1.5,
      duration: 2
    }, 3.0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <motion.div
        ref={robotRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -20, 0] // Floating pulse (overrides GSAP y if not careful, better use margin or nested div)
        }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 1 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          width: '600px',
          height: '600px',
          position: 'absolute',
          right: '5%',
          bottom: '10%'
        }}
      >
        <img 
          src="/about-robot.svg" 
          alt="About Robot" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </motion.div>
    </div>
  );
}
