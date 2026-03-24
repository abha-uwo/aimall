'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Components
import Navbar from '@/components/Navbar';
import AboutHero from '@/components/AboutHero';
import CompanyOverview from '@/components/CompanyOverview';
import MissionSection from '@/components/MissionSection';
import WhatWeAreBuilding from '@/components/WhatWeAreBuilding';
import LeadershipSection from '@/components/LeadershipSection';
import Footer from '@/components/Footer';
import AboutBackground from '@/components/AboutBackground';

// Dynamically import 3D Scene
const AboutScene3D = dynamic(() => import('@/components/AboutScene3D'), { ssr: false });

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Cinematic reveal animations for sections
    const sections = gsap.utils.toArray('section');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { autoAlpha: 0, y: 50, filter: "blur(10px)" },
        { 
          autoAlpha: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <main className="about-page relative bg-black" ref={containerRef}>
      <AboutBackground />
      <Navbar />
      <motion.div className="progress-bar" style={{ scaleX }} />
      
      <div className="about-content-wrapper relative z-10">
        <AboutHero />
        <CompanyOverview />
        <MissionSection />
        <WhatWeAreBuilding />
        <LeadershipSection />
        <Footer />
      </div>
    </main>
  );
}
