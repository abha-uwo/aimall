'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 1000 }) => {
  const [points, setPoints] = useState<Float32Array | null>(null);
  
  useEffect(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 15;
        p[i * 3 + 1] = (Math.random() - 0.5) * 15;
        p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    setPoints(p);
  }, [count]);

  if (!points) return null;

  return (
    <Points positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
};

const Rig = ({ children }: { children: React.ReactNode }) => {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const { x, y } = state.mouse;
    const scroll = typeof window !== 'undefined' ? window.scrollY : 0;
    
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.2, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.1, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, scroll * 0.005, 0.05);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, -scroll * 0.002, 0.05);
  });
  
  return <group ref={group}>{children}</group>;
};

export default function Scene3D() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#020205']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#5d5ae6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#9b51e0" />
        
        <Rig>
          <Sphere position={[0, 0, 0]} args={[1.5, 32, 32]}>
            <meshStandardMaterial color="#5d5ae6" metalness={0.7} roughness={0.2} />
          </Sphere>
          
          <Float speed={3} rotationIntensity={1} floatIntensity={1}>
             <Sphere position={[4, 2, -3]} args={[0.5, 32, 32]}>
                <meshStandardMaterial color="#9b51e0" metalness={0.8} roughness={0.1} />
             </Sphere>
          </Float>

          <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
             <Sphere position={[-4, -2, -2]} args={[0.8, 32, 32]}>
                <meshStandardMaterial color="#2e71f2" metalness={0.8} roughness={0.1} />
             </Sphere>
          </Float>

          <ParticleField />
        </Rig>
      </Canvas>
    </div>
  );
}
