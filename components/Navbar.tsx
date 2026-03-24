'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Home, Info, Rocket, Users, MessageSquare } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'A-Series™', href: '/products', icon: Rocket },
  { name: 'Partners', href: '/partners', icon: Users },
  { name: 'Contact', href: '#contact', icon: MessageSquare },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: '2rem 1.5rem',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* 🏷️ Logo */}
        <Link href="/" style={{ pointerEvents: 'auto', textDecoration: 'none' }}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={{
              fontSize: '1.25rem',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            AI-MALL<span style={{ color: '#3b82f6' }}>.</span>
          </motion.div>
        </Link>

        {/* 🧭 Navigation Hub */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(32px)',
          borderRadius: '1rem',
          pointerEvents: 'auto',
          position: 'relative'
        }}>
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              onMouseEnter={() => setHoveredPath(item.href)}
              onMouseLeave={() => setHoveredPath(null)}
              style={{
                position: 'relative',
                padding: '0.625rem 1.25rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: hoveredPath === item.href ? 'white' : 'rgba(255, 255, 255, 0.5)',
                transition: 'color 0.3s ease',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <AnimatePresence>
                {hoveredPath === item.href && (
                  <motion.div
                    layoutId="nav-hover"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '0.75rem',
                      zIndex: 0
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
              <item.icon size={14} style={{ position: 'relative', zIndex: 1 }} />
              <span style={{ position: 'relative', zIndex: 1 }}>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* 🚀 CTA */}
        <div style={{ pointerEvents: 'auto' }}>
          <Link href="/experience" style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.625rem 1.5rem',
                background: 'white',
                color: 'black',
                fontSize: '0.75rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Launch App
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}


