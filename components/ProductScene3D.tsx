'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, MeshDistortMaterial, Line, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingModules() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create modular blocks
  const modules = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      size: 0.4 + Math.random() * 0.4,
      color: i % 2 === 0 ? "#5d5ae6" : "#9b51e0"
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {modules.map((m, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1.5} position={m.position}>
          <Box args={[m.size, m.size, m.size]}>
            <MeshDistortMaterial
              color={m.color}
              speed={2}
              distort={0.2}
              roughness={0}
              metalness={0.8}
              opacity={0.8}
              transparent
            />
          </Box>
        </Float>
      ))}
      
      {/* Neural connections */}
      {modules.map((m, i) => {
        if (i === modules.length - 1) return null;
        return (
          <Line
            key={`line-${i}`}
            points={[m.position, modules[i + 1].position]}
            color="#5d5ae6"
            lineWidth={0.5}
            transparent
            opacity={0.2}
          />
        );
      })}
    </group>
  );
}

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; 
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.012;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.025}
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ProductScene3D() {
  return (
    <div className="product-canvas-container">
      <Canvas camera={{ position: [0, 0, 6], fov: 65 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9b51e0" />
        {/* FloatingModules removed as requested */}
        <StarField />
      </Canvas>
    </div>
  );
}
