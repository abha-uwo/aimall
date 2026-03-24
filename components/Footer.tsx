'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-universal glass-footer">
      <div className="footer-glow-base" />
      <div className="footer-container">
        <div className="footer-top-grid">
          <div className="footer-brand-side">
            <Link href="/" className="footer-logo" style={{ textDecoration: 'none' }}>
              AI-MALL<span className="logo-dot">.</span>
            </Link>
            <p className="footer-tagline">
              Powering the Next Generation <br />
              of Global AI Commerce.
            </p>
          </div>

          <div className="footer-links-side">
            <div className="footer-links-group">
              <h4>Platform</h4>
              <Link href="/">Home</Link>
              <Link href="/products">A-Series™</Link>
              <Link href="/partners">Partner With Us</Link>
            </div>
            <div className="footer-links-group">
              <h4>Company</h4>
              <Link href="/about">About Us</Link>
              <Link href="#contact">Contact Us</Link>
            </div>
            <div className="footer-links-group">
              <h4>Ecosystem</h4>
              <span>Vision</span>
              <span>Ecosystem</span>
            </div>
          </div>
        </div>

        <div className="footer-legal-bar">
          <div className="footer-trademarks">
             AI-Mall™ | A-Series™ | UWO™ | AISA™ are proprietary trademarks.
          </div>
          <div className="footer-copyright">
            All rights reserved © Unified Web Options.
          </div>
        </div>
      </div>
    </footer>
  );
}
