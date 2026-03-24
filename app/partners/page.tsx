'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Components
import Navbar from '@/components/Navbar';
import PartnerHero from '@/components/PartnerHero';
import WhyPartner from '@/components/WhyPartner';
import PartnershipStreams from '@/components/PartnershipStreams';
import CalloutBanner from '@/components/CalloutBanner';
import PartnerCTA from '@/components/PartnerCTA';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import 3D Scene
const PartnerScene3D = dynamic(() => import('@/components/PartnerScene3D'), { ssr: false });

export default function PartnerPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Cinematic scroll reveal animations for all sections
    const sections = gsap.utils.toArray('section');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { autoAlpha: 0, y: 50, filter: "blur(10px)" },
        { 
          autoAlpha: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax mouse move for 3D scene
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 10;
      const y = (clientY / window.innerHeight - 0.5) * 10;
      
      gsap.to('.partner-canvas-container', {
        x: x / 2,
        y: y / 2,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="partner-page" ref={containerRef}>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Navbar />
      
      <div className="partner-content-wrapper">
        <PartnerScene3D />
        
        <div className="partner-scroll-container">
          <PartnerHero />
          <WhyPartner />
          <PartnershipStreams />
          <CalloutBanner />
          <PartnerCTA />

          <Footer />
        </div>
      </div>
    </main>
  );
}
