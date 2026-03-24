'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RobotLoaderProps {
  onFinished: () => void;
}

export default function RobotLoader({ onFinished }: RobotLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  // Draw animated energy core on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let frame = 0;

    const draw = () => {
      canvas.width = 180;
      canvas.height = 180;
      ctx.clearRect(0, 0, 180, 180);

      const cx = 90, cy = 90;
      frame++;

      // Outer pulsing ring
      const outerPulse = Math.sin(frame * 0.04) * 8;
      const grad1 = ctx.createRadialGradient(cx, cy, 20, cx, cy, 55 + outerPulse);
      grad1.addColorStop(0, 'rgba(139, 92, 246, 0.0)');
      grad1.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)');
      grad1.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 55 + outerPulse, 0, Math.PI * 2);
      ctx.fillStyle = grad1;
      ctx.fill();

      // Energy core — layered glowing orb
      const corePulse = Math.sin(frame * 0.05) * 5;
      const grad2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30 + corePulse);
      grad2.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad2.addColorStop(0.2, 'rgba(200, 180, 255, 0.85)');
      grad2.addColorStop(0.5, 'rgba(139, 92, 246, 0.7)');
      grad2.addColorStop(0.8, 'rgba(59, 130, 246, 0.4)');
      grad2.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 30 + corePulse, 0, Math.PI * 2);
      ctx.fillStyle = grad2;
      ctx.fill();

      // Orbiting particles
      for (let i = 0; i < 6; i++) {
        const angle = (frame * 0.03) + (i * Math.PI * 2 / 6);
        const radius = 44 + Math.sin(frame * 0.07 + i) * 5;
        const px = cx + Math.cos(angle) * radius;
        const py = cy + Math.sin(angle) * radius;
        const pgrad = ctx.createRadialGradient(px, py, 0, px, py, 4);
        pgrad.addColorStop(0, 'rgba(220, 200, 255, 0.9)');
        pgrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = pgrad;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  // Progress counter
  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      val += Math.random() * 3 + 1;
      if (val >= 100) {
        val = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onFinished, 800);
        }, 400);
      } else {
        setProgress(Math.floor(val));
      }
    }, 35);
    return () => clearInterval(interval);
  }, [onFinished]);

  const circumference = 2 * Math.PI * 70;
  const strokeDash = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="robot-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Background gradient mesh */}
          <div className="loader-bg-mesh" />

          {/* Loader ring + core */}
          <div className="loader-center">
            <div className="loader-ring-wrap">
              <svg className="loader-svg" viewBox="0 0 160 160" width="160" height="160">
                {/* Track */}
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                {/* Progress arc */}
                <circle
                  cx="80" cy="80" r="70"
                  fill="none"
                  stroke="url(#loaderGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDash}
                  transform="rotate(-90 80 80)"
                  style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                />
                <defs>
                  <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Energy core canvas */}
              <canvas ref={canvasRef} className="loader-core-canvas" />
            </div>

            <div className="loader-percent">{progress}<span>%</span></div>
            <div className="loader-label">Initializing AI Experience</div>
          </div>

          {/* Bottom wordmark */}
          <div className="loader-wordmark">AI-MALL<span>.</span></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
