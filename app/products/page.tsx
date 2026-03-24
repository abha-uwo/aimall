'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Components
import Navbar from '@/components/Navbar';
import ProductHero from '@/components/ProductHero';
import ProductModules from '@/components/ProductModules';
import ComingSoon from '@/components/ComingSoon';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import 3D Scene
const ProductScene3D = dynamic(() => import('@/components/ProductScene3D'), { ssr: false });

export default function ProductShowcase() {
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
        { autoAlpha: 0, scale: 0.95, filter: "blur(10px)" },
        { 
          autoAlpha: 1, 
          scale: 1, 
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
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
    <main className="product-page relative" ref={containerRef}>
      <motion.div className="progress-bar" style={{ scaleX }} />
      
      <div className="product-content-wrapper pt-32">
        <div className="product-scroll-container">
          <ProductHero />
          <ProductModules />
          <ComingSoon />
          <CTASection />
          <Footer />
        </div>
      </div>
    </main>
  );
}
