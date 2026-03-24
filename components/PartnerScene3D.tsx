'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Line, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 12;
  
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      size: 0.15 + Math.random() * 0.2,
      color: i % 3 === 0 ? "#8b5cf6" : "#ffffff"
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1} position={node.position}>
          <Sphere args={[node.size, 32, 32]}>
            <MeshDistortMaterial
              color={node.color}
              speed={2}
              distort={0.3}
              roughness={0}
              metalness={0.8}
              emissive={node.color}
              emissiveIntensity={0.5}
            />
          </Sphere>
        </Float>
      ))}

      {/* Dynamic Connections */}
      {nodes.map((n1, i) => {
        const connections = [];
        for(let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dist = new THREE.Vector3(...n1.position).distanceTo(new THREE.Vector3(...n2.position));
            if (dist < 5) {
                connections.push(
                    <Line
                        key={`line-${i}-${j}`}
                        points={[n1.position, n2.position]}
                        color="#8b5cf6"
                        lineWidth={0.5}
                        transparent
                        opacity={0.15}
                    />
                );
            }
        }
        return connections;
      })}
    </group>
  );
}

function GlobalStarfield() {
    const pointsRef = useRef<THREE.Points>(null);
    const particleCount = 2000;

    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            pos[i] = (Math.random() - 0.5) * 25;
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

export default function PartnerScene3D() {
  return (
    <div className="partner-canvas-container">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
        {/* NeuralNodes removed as requested */}
        <GlobalStarfield />
      </Canvas>
    </div>
  );
}
