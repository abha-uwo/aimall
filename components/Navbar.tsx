'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { Home } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav
      className="navbar glass"
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
    >
      <div className="nav-container">
        <Link href="/" className="logo" style={{ textDecoration: 'none' }}>
          AI-MALL<span className="logo-dot">.</span>
        </Link>
        
        <div className="nav-links">
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Home size={18} color="#94a3b8" />
          </Link>
          <Link href="/about" style={{ textDecoration: 'none' }}>
            <span>About Us</span>
          </Link>
          <Link href="/products" style={{ textDecoration: 'none' }}>
            <span>A-Series™</span>
          </Link>
          <Link href="/partners" style={{ textDecoration: 'none' }}>
            <span>Partners</span>
          </Link>
          <Link href="#contact" style={{ textDecoration: 'none' }}>
            <span>Contact Us</span>
          </Link>
        </div>
        
        <Link href="/experience" style={{ textDecoration: 'none' }}>
          <button className="nav-cta glass">Launch App</button>
        </Link>
      </div>
    </motion.nav>
  );
}


