'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Components
import Hero from '@/components/Hero';
import ValuePillars from '@/components/ValuePillars';
import SneakPeek from '@/components/SneakPeek';
import Modules from '@/components/Modules';
import Vision from '@/components/Vision';
import Footer from '@/components/Footer';
import PartnerCTA from '@/components/PartnerCTA';
import AmbientBackground from '@/components/AmbientBackground';

export default function Home() {
  const scrollRef = useRef(0);

  useEffect(() => {
    document.body.style.overflow = 'auto';

    const fn = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <main className="main-content">
      <AmbientBackground />
      <div className="site-content">
        <div className="scroll-container home-scroll-container relative z-10">
          <div id="hero"><Hero /></div>
          <div id="value"><ValuePillars /></div>
          <div id="sneak"><SneakPeek /></div>
          <div id="modules"><Modules /></div>
          <div id="partners"><PartnerCTA /></div>
          <div id="vision"><Vision /></div>
          <div id="contact"><Footer /></div>
        </div>
      </div>
    </main>
  );
}
