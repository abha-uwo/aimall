'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import RobotLoader from '@/components/RobotLoader';

const RobotScene = dynamic(() => import('@/components/RobotScene'), { ssr: false });

export default function ExperiencePage() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const scrollYRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setReady(true), 100);
    }
  }, [loading]);

  return (
    <>
      {/* Premium Loader */}
      <RobotLoader onFinished={() => setLoading(false)} />

      {/* Main Experience */}
      <AnimatePresence>
        {!loading && (
          <motion.main
            className="experience-page"
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* 3D Scene — fills viewport */}
            <div className="experience-scene-wrap">
              <RobotScene scrollY={scrollYRef} />
            </div>

            {/* UI Overlay — above 3D */}
            <div className="experience-ui-overlay">

              {/* Top bar */}
              <motion.div
                className="exp-topbar glass"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              >
                <Link href="/" className="exp-logo" style={{ textDecoration: 'none' }}>
                  AI-MALL<span className="logo-dot">.</span>
                </Link>
                <nav className="exp-nav">
                  <Link href="/about">About</Link>
                  <Link href="/products">A-Series™</Link>
                  <Link href="/partners">Partner With Us</Link>
                </nav>
                <Link href="/" className="btn-primary exp-nav-cta">Launch App</Link>
              </motion.div>

              {/* Left hero text */}
              <div className="exp-hero-left">
                <motion.div
                  className="exp-badge glass"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <span className="exp-badge-dot" />
                  Powered by AISA™
                </motion.div>

                <motion.h1
                  className="exp-headline"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.9, ease: 'easeOut' }}
                >
                  Meet Your<br />
                  <span className="exp-headline-accent">AI Entity.</span>
                </motion.h1>

                <motion.p
                  className="exp-subheadline"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.9 }}
                >
                  A new class of intelligent AI infrastructure.<br />
                  Built for the next generation of commerce.
                </motion.p>

                <motion.div
                  className="exp-cta-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                >
                  <Link href="/products">
                    <button className="btn-primary exp-cta-btn">
                      Explore A-Series™ →
                    </button>
                  </Link>
                  <Link href="/partners">
                    <button className="glass exp-cta-btn exp-cta-ghost">
                      Partner With Us
                    </button>
                  </Link>
                </motion.div>
              </div>

              {/* Right floating glass cards */}
              <div className="exp-cards-right">
                {[
                  { label: 'Intelligence Layer', value: 'AISA™', color: '#8b5cf6', delay: 1.0 },
                  { label: 'Commerce Stack', value: 'A-Series™', color: '#06b6d4', delay: 1.15 },
                  { label: 'AI Calling', value: 'Voice Engine', color: '#f59e0b', delay: 1.3 },
                ].map((card) => (
                  <motion.div
                    key={card.label}
                    className="exp-float-card glass"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: card.delay, duration: 0.8, ease: 'easeOut' }}
                    whileHover={{ scale: 1.04, x: -4 }}
                    style={{ borderColor: `${card.color}30` }}
                  >
                    <div className="exp-float-card-label">{card.label}</div>
                    <div className="exp-float-card-value" style={{ color: card.color }}>{card.value}</div>
                    <div className="exp-float-card-dot" style={{ backgroundColor: card.color }} />
                  </motion.div>
                ))}
              </div>

              {/* Bottom status bar */}
              <motion.div
                className="exp-status-bar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <span className="exp-status-item">
                  <span className="status-dot active" />
                  System Online
                </span>
                <span className="exp-status-item">AI Core: AISA™ v2</span>
                <span className="exp-status-item">↓ Scroll to Explore</span>
              </motion.div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
