'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Float, Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ... existing RobotHead and RobotBody ...
function RobotHead({ mouseRef }: { mouseRef: React.MutableRefObject<[number, number]> }) {
  const gr = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  const blinkL = useRef<THREE.Mesh>(null);
  const blinkR = useRef<THREE.Mesh>(null);
  const blink = useRef({ next: 3, active: false, t: 0 });

  useFrame((state) => {
    if (!gr.current) return;
    const t = state.clock.getElapsedTime();
    const b = blink.current;

    gr.current.rotation.y = THREE.MathUtils.lerp(gr.current.rotation.y, mouseRef.current[0] * 0.2, 0.05);
    gr.current.rotation.x = THREE.MathUtils.lerp(gr.current.rotation.x, -mouseRef.current[1] * 0.1, 0.05);

    if (!b.active && t > b.next) { b.active = true; b.t = 0; }
    if (b.active) {
      b.t += 0.2;
      const s = b.t < Math.PI ? Math.max(0, Math.sin(b.t)) : 1;
      if (blinkL.current) blinkL.current.scale.y = s;
      if (blinkR.current) blinkR.current.scale.y = s;
      if (b.t >= Math.PI) { b.active = false; b.next = t + 2 + Math.random() * 5; }
    }

    [eyeL, eyeR].forEach((r, i) => {
       if (r.current) {
         (r.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 2 + Math.sin(t * 2 + i) * 0.8;
       }
    });
  });

  return (
    <group ref={gr} position={[0, 0.88, 0]}>
      <mesh>
        <sphereGeometry args={[0.52, 32, 32]} />
        <meshPhysicalMaterial roughness={0.05} metalness={0.2} color="#ffffff" sheen={1} sheenRoughness={0.1} clearcoat={1} />
      </mesh>
      
      <mesh position={[0, 0, 0.42]}>
        <sphereGeometry args={[0.35, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshPhysicalMaterial roughness={0} metalness={1} color="#0a0e1a" transparent opacity={0.9} transmission={1} thickness={1} />
      </mesh>

      <mesh ref={eyeL} position={[-0.18, 0.1, 0.44]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial emissive="#8b5cf6" emissiveIntensity={3} color="#1a0033" />
      </mesh>
      <mesh ref={eyeR} position={[0.18, 0.1, 0.44]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial emissive="#06b6d4" emissiveIntensity={3} color="#001a1d" />
      </mesh>

      <mesh ref={blinkL} position={[-0.18, 0.1, 0.45]}>
        <planeGeometry args={[0.22, 0.22]} />
        <meshStandardMaterial color="#050a14" transparent opacity={1} depthWrite={false} />
      </mesh>
      <mesh ref={blinkR} position={[0.18, 0.1, 0.45]}>
        <planeGeometry args={[0.22, 0.22]} />
        <meshStandardMaterial color="#050a14" transparent opacity={1} depthWrite={false} />
      </mesh>

      <mesh position={[0, -0.15, 0.46]}>
        <torusGeometry args={[0.12, 0.012, 12, 32, Math.PI * 0.5]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={5} />
      </mesh>

      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.55, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.14, 32, 32]} />
            <meshStandardMaterial roughness={0.1} color="#ffffff" />
          </mesh>
          <mesh position={[s * 0.02, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.08, 0.015, 16, 32]} />
            <meshStandardMaterial color={s === -1 ? "#8b5cf6" : "#06b6d4"} emissive={s === -1 ? "#8b5cf6" : "#06b6d4"} emissiveIntensity={3} />
          </mesh>
        </group>
      ))}

    </group>
  );
}

function RobotBody() {
  return (
    <group position={[0, -0.28, 0]}>
      <mesh>
        <boxGeometry args={[0.75, 0.8, 0.45]} />
        <meshPhysicalMaterial roughness={0.15} color="#ffffff" sheen={0.8} />
      </mesh>
      
      <mesh position={[0, 0.15, 0.23]}>
        <boxGeometry args={[0.55, 0.35, 0.05]} />
        <meshPhysicalMaterial roughness={0.1} color="#f0f0f0" />
      </mesh>

      <mesh position={[0, 0.15, 0.26]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 32]} />
        <meshStandardMaterial color="#000" emissive="#06b6d4" emissiveIntensity={8} transparent opacity={0.9} />
      </mesh>
      
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.48, 0.3, 0]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial roughness={0.15} color="#ffffff" />
          </mesh>
          <group position={[s * 0.6, -0.05, 0]}>
            <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.4}>
              <mesh><capsuleGeometry args={[0.08, 0.4, 8, 16]} /><meshStandardMaterial color="#ffffff" /></mesh>
            </Float>
          </group>
        </group>
      ))}

      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.22, 32]} />
        <meshStandardMaterial roughness={0.1} color="#ffffff" />
      </mesh>
    </group>
  );
}

function CinematicEnvironment() {
  return (
    <>
      <React.Suspense fallback={null}>
        <Environment preset="night" />
      </React.Suspense>
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} intensity={8} angle={0.3} penumbra={1} color="#ffffff" />
      <spotLight position={[-10, 5, -10]} intensity={5} angle={0.5} penumbra={1} color="#8b5cf6" />
      <pointLight position={[0, 5, 5]} intensity={2} color="#06b6d4" />
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      <CloudParticles count={600} size={0.03} color="#ffffff" speed={0.02} opacity={0.4} />
      <CloudParticles count={300} size={0.12} color="#8b5cf6" speed={0.05} opacity={0.15} />
      <CloudParticles count={150} size={0.08} color="#06b6d4" speed={0.03} opacity={0.2} />
    </>
  );
}

function CloudParticles({ count, size, color, speed, opacity }: { count: number; size: number; color: string; speed: number; opacity: number }) {
  const points = useRef<THREE.Points>(null);
  const posArr = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * speed;
      points.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.8;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={posArr} itemSize={3} args={[posArr, 3]} />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function DataAtmosphere() {
  const points = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      pos: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5] as [number, number, number],
      size: 0.1 + Math.random() * 0.2
    }));
  }, []);

  return (
    <group>
      {points.map((p, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1} position={p.pos}>
          <mesh>
            <octahedronGeometry args={[p.size]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#8b5cf6" : "#06b6d4"} emissive={i % 2 === 0 ? "#8b5cf6" : "#06b6d4"} emissiveIntensity={0.5} transparent opacity={0.6} metalness={1} roughness={0} />
          </mesh>
        </Float>
      ))}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

function SceneController({ mouseRef, pathname }: { mouseRef: React.MutableRefObject<[number, number]>, pathname: string }) {
  const { camera } = useThree();
  const insideRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Standard setup: Centered on Face for Hero
    camera.position.set(0, 0.35, 2.5);
    camera.lookAt(0, 0.4, 0);

    // Subtle background camera movement
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2, 
      }
    });

    tl.to(camera.position, { y: -2, z: 8, ease: "none", duration: 10 });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [camera, pathname]);

  useFrame((state) => {
    if (insideRef.current) {
      const t = state.clock.getElapsedTime();
      insideRef.current.position.x = (mouseRef.current[0] * 0.5); 
      insideRef.current.position.y = (-mouseRef.current[1] * 0.3) + Math.sin(t * 0.5) * 0.1; 
      insideRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <group ref={insideRef}>
      <DataAtmosphere />
    </group>
  );
}

export default function HomeRobotScene() {
  const mouseRef = useRef<[number, number]>([0, 0]);
  const pathname = usePathname();

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouseRef.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  return (
    <div className="canvas-container">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ fov: 45 }}>
        <React.Suspense fallback={null}>
          <group>
            <CinematicEnvironment />
            <SceneController mouseRef={mouseRef} pathname={pathname} />
          </group>
        </React.Suspense>
      </Canvas>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2, background: "radial-gradient(circle at 50% 50%, #0a0a20 0%, #020205 100%)" }} />
    </div>
  );
}

