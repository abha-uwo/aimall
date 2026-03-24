'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-black py-24 px-6 overflow-hidden border-t border-white/5" id="contact">
      {/* 🔮 Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* 🏷️ Brand Branding */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white mb-6 block">
              AI-MALL<span className="text-blue-500">.</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Pioneering the next generation of global AI commerce through unified intelligent infrastructure.
            </p>
          </div>

          {/* 🧭 Platform Links */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">Platform</h4>
            <div className="flex flex-col gap-4">
              {['Home', 'A-Series™', 'Partnerships', 'Documentation'].map((link) => (
                <Link key={link} href="#" className="text-white/30 hover:text-white text-sm font-medium transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* 🏛️ Company Links */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">Company</h4>
            <div className="flex flex-col gap-4">
              {['About Us', 'Contact', 'Vision', 'Careers'].map((link) => (
                <Link key={link} href="#" className="text-white/30 hover:text-white text-sm font-medium transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* 💠 Social / Legal */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">Ecosystem</h4>
            <div className="flex flex-col gap-4 text-white/30 text-sm font-medium">
              <span>Vision 2030</span>
              <span>Open Source</span>
              <span>Global Reach</span>
            </div>
          </div>
        </div>

        {/* 📜 Legal Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.1em]">
            AI-Mall™ | A-Series™ | UWO™ | AISA™ are proprietary trademarks.
          </p>
          <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.1em]">
            © 2026 Unified Web Options. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
