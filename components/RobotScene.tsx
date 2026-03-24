'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, ContactShadows, Stars, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

// === PROCEDURAL ROBOT ===
function RobotHead({ mouseRef }: { mouseRef: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<THREE.Group>(null);
  const visorRef = useRef<THREE.Mesh>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const [mx, my] = mouseRef.current;

    // Follow mouse subtly
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mx * 0.4, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -my * 0.2, 0.05);

    // Eye glow pulse
    if (eyeLeftRef.current && eyeRightRef.current) {
      const mat = eyeLeftRef.current.material as THREE.MeshStandardMaterial;
      const mat2 = eyeRightRef.current.material as THREE.MeshStandardMaterial;
      const pulse = 0.8 + Math.sin(t * 2) * 0.4 + Math.sin(t * 7) * 0.2;
      mat.emissiveIntensity = pulse;
      mat2.emissiveIntensity = pulse;
    }
  });

  const metalMat = { roughness: 0.05, metalness: 0.95, color: '#b8c0cc' };
  const darkMat = { roughness: 0.1, metalness: 0.9, color: '#1e2030' };

  return (
    <group ref={groupRef} position={[0, 0.8, 0]}>
      {/* Skull */}
      <mesh castShadow>
        <boxGeometry args={[0.72, 0.78, 0.68]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>
      {/* Forehead bevel */}
      <mesh position={[0, 0.38, 0.05]} castShadow>
        <boxGeometry args={[0.6, 0.06, 0.5]} />
        <meshStandardMaterial roughness={0.05} metalness={1} color="#a0a8b8" />
      </mesh>
      {/* Visor panel */}
      <mesh ref={visorRef} position={[0, 0.05, 0.35]}>
        <boxGeometry args={[0.55, 0.25, 0.04]} />
        <meshStandardMaterial roughness={0} metalness={0} color="#060c26" transparent opacity={0.9} envMapIntensity={2} />
      </mesh>
      {/* Eyes */}
      <mesh ref={eyeLeftRef} position={[-0.16, 0.07, 0.37]}>
        <boxGeometry args={[0.14, 0.07, 0.02]} />
        <meshStandardMaterial emissive="#06b6d4" emissiveIntensity={1.2} color="#000" roughness={0} metalness={0} />
      </mesh>
      <mesh ref={eyeRightRef} position={[0.16, 0.07, 0.37]}>
        <boxGeometry args={[0.14, 0.07, 0.02]} />
        <meshStandardMaterial emissive="#8b5cf6" emissiveIntensity={1.2} color="#000" roughness={0} metalness={0} />
      </mesh>
      {/* Jaw */}
      <mesh position={[0, -0.32, 0.1]} castShadow>
        <boxGeometry args={[0.55, 0.14, 0.5]} />
        <meshStandardMaterial {...darkMat} />
      </mesh>
      {/* Chin accent */}
      <mesh position={[0, -0.37, 0.3]}>
        <boxGeometry args={[0.3, 0.03, 0.12]} />
        <meshStandardMaterial emissive="#8b5cf6" emissiveIntensity={0.8} color="#1e2030" roughness={0} metalness={1} />
      </mesh>
      {/* Ear panels */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.38, 0.05, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.07, 0.42, 0.55]} />
            <meshStandardMaterial {...darkMat} />
          </mesh>
          <mesh position={[side * 0.015, 0.06, 0.2]}>
            <boxGeometry args={[0.05, 0.08, 0.08]} />
            <meshStandardMaterial emissive={side === -1 ? "#06b6d4" : "#8b5cf6"} emissiveIntensity={1} color="#000" roughness={0} metalness={0} />
          </mesh>
        </group>
      ))}
      {/* Antenna crown */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.22, 8]} />
        <meshStandardMaterial metalness={1} roughness={0.05} color="#c0c8d8" />
      </mesh>
      <mesh position={[0, 0.63, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial emissive="#8b5cf6" emissiveIntensity={2} color="#000" roughness={0} metalness={0} />
      </mesh>
    </group>
  );
}

function RobotBody() {
  const bodyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!bodyRef.current) return;
    const t = state.clock.getElapsedTime();
    // Breathing
    bodyRef.current.scale.x = 1 + Math.sin(t * 1.2) * 0.008;
    bodyRef.current.scale.z = 1 + Math.sin(t * 1.2) * 0.005;
  });

  const metalMat = { roughness: 0.05, metalness: 0.95, color: '#b8c0cc' };
  const darkMat = { roughness: 0.1, metalness: 0.9, color: '#1a1e2e' };
  const accentMat = { roughness: 0.05, metalness: 0.8, color: '#8090aa' };

  return (
    <group ref={bodyRef} position={[0, -0.2, 0]}>
      {/* Torso */}
      <mesh castShadow>
        <boxGeometry args={[0.82, 1.0, 0.46]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>
      {/* Chest plate */}
      <mesh position={[0, 0.2, 0.24]} castShadow>
        <boxGeometry args={[0.64, 0.5, 0.06]} />
        <meshStandardMaterial roughness={0.02} metalness={1} color="#d0d8e8" />
      </mesh>
      {/* Chest Arc reactor glow */}
      <mesh position={[0, 0.18, 0.28]}>
        <cylinderGeometry args={[0.1, 0.1, 0.03, 32]} />
        <meshStandardMaterial emissive="#06b6d4" emissiveIntensity={3} color="#000" roughness={0} metalness={0} transparent opacity={0.9} />
      </mesh>
      {/* Chest reactor ring */}
      <mesh position={[0, 0.18, 0.275]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.015, 16, 64]} />
        <meshStandardMaterial emissive="#8b5cf6" emissiveIntensity={2} color="#000" roughness={0} metalness={0} />
      </mesh>
      {/* Side vents */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.36, 0.0, 0.24]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[0, -0.15 + i * 0.15, 0]}>
              <boxGeometry args={[0.06, 0.04, 0.07]} />
              <meshStandardMaterial emissive="#8b5cf6" emissiveIntensity={0.6} color="#1a1e2e" roughness={0.1} metalness={0.9} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Shoulder joints */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.5, 0.4, 0]} castShadow>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshStandardMaterial roughness={0.05} metalness={1} color="#c8d0e0" />
        </mesh>
      ))}
      {/* Neck joint */}
      <mesh position={[0, 0.56, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.2, 24]} />
        <meshStandardMaterial {...accentMat} />
      </mesh>
      {/* Collar panels */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.22, 0.52, 0.12]} castShadow>
          <boxGeometry args={[0.22, 0.08, 0.2]} />
          <meshStandardMaterial {...metalMat} />
        </mesh>
      ))}
      {/* Abs panel definition */}
      {[-1, 1].map((_si, si) =>
        [0, 1].map((_ri, ri) => (
          <mesh key={`abs-${si}-${ri}`} position={[(-0.5 + si) * 0.22, -0.1 - ri * 0.18, 0.24]}>
            <boxGeometry args={[0.18, 0.13, 0.04]} />
            <meshStandardMaterial {...darkMat} />
          </mesh>
        ))
      )}
      {/* Waist */}
      <mesh position={[0, -0.54, 0]} castShadow>
        <boxGeometry args={[0.72, 0.12, 0.38]} />
        <meshStandardMaterial {...accentMat} />
      </mesh>
    </group>
  );
}

function RobotArm({ side }: { side: number }) {
  const armRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!armRef.current) return;
    const t = state.clock.getElapsedTime();
    armRef.current.rotation.x = Math.sin(t * 0.8 + (side === -1 ? 0 : Math.PI)) * 0.06;
    armRef.current.rotation.z = side * 0.12 + Math.sin(t * 1.1 + (side === -1 ? 0 : Math.PI)) * 0.04;
  });

  const metalMat = { roughness: 0.06, metalness: 0.95, color: '#b0bac8' };
  const darkMat = { roughness: 0.1, metalness: 0.9, color: '#1a1e2e' };

  return (
    <group ref={armRef} position={[side * 0.62, -0.3, 0]}>
      {/* Upper arm */}
      <mesh position={[0, -0.22, 0]} castShadow>
        <boxGeometry args={[0.2, 0.44, 0.2]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>
      {/* Elbow joint */}
      <mesh position={[0, -0.46, 0]} castShadow>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial roughness={0.05} metalness={1} color="#d0d8e8" />
      </mesh>
      {/* Forearm */}
      <mesh position={[0, -0.72, 0]} castShadow>
        <boxGeometry args={[0.165, 0.48, 0.165]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>
      {/* Forearm stripe */}
      <mesh position={[side * -0.06, -0.72, 0]}>
        <boxGeometry args={[0.04, 0.4, 0.18]} />
        <meshStandardMaterial emissive={side === -1 ? "#06b6d4" : "#8b5cf6"} emissiveIntensity={1.2} color="#000" roughness={0} metalness={0} />
      </mesh>
      {/* Wrist */}
      <mesh position={[0, -0.98, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.09, 0.1, 20]} />
        <meshStandardMaterial {...darkMat} />
      </mesh>
      {/* Hand */}
      <mesh position={[0, -1.12, 0]} castShadow>
        <boxGeometry args={[0.19, 0.2, 0.12]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>
    </group>
  );
}

function RobotLegs() {
  const legsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!legsRef.current) return;
    const t = state.clock.getElapsedTime();
    legsRef.current.rotation.x = Math.sin(t * 0.5) * 0.02;
  });

  const metalMat = { roughness: 0.06, metalness: 0.95, color: '#b0bac8' };

  return (
    <group ref={legsRef} position={[0, -1.1, 0]}>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.24, 0, 0]}>
          {/* Hip joint */}
          <mesh position={[0, 0.08, 0]} castShadow>
            <sphereGeometry args={[0.12, 20, 20]} />
            <meshStandardMaterial roughness={0.05} metalness={1} color="#d0d8e8" />
          </mesh>
          {/* Thigh */}
          <mesh position={[0, -0.28, 0]} castShadow>
            <boxGeometry args={[0.22, 0.56, 0.22]} />
            <meshStandardMaterial {...metalMat} />
          </mesh>
          {/* Knee */}
          <mesh position={[0, -0.58, 0.04]} castShadow>
            <boxGeometry args={[0.24, 0.12, 0.28]} />
            <meshStandardMaterial roughness={0.04} metalness={1} color="#c8d0e0" />
          </mesh>
          {/* Shin */}
          <mesh position={[0, -0.84, 0]} castShadow>
            <boxGeometry args={[0.19, 0.52, 0.19]} />
            <meshStandardMaterial {...metalMat} />
          </mesh>
          {/* Shin stripe */}
          <mesh position={[0, -0.84, 0.1]}>
            <boxGeometry args={[0.06, 0.38, 0.04]} />
            <meshStandardMaterial emissive={side === -1 ? "#8b5cf6" : "#06b6d4"} emissiveIntensity={0.8} color="#000" roughness={0} metalness={0} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -1.16, 0.06]} castShadow>
            <boxGeometry args={[0.24, 0.12, 0.36]} />
            <meshStandardMaterial roughness={0.05} metalness={0.95} color="#a8b0c0" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function FullRobot({ mouseRef }: { mouseRef: React.MutableRefObject<[number, number]> }) {
  const robotRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!robotRef.current) return;
    const t = state.clock.getElapsedTime();
    // Global floating
    robotRef.current.position.y = -0.5 + Math.sin(t * 0.8) * 0.05;
    // Very subtle sway
    robotRef.current.rotation.y = THREE.MathUtils.lerp(
      robotRef.current.rotation.y,
      mouseRef.current[0] * 0.3,
      0.03
    );
  });

  return (
    <group ref={robotRef} position={[0, -0.5, 0]} scale={0.95}>
      <RobotHead mouseRef={mouseRef} />
      <RobotBody />
      <RobotArm side={-1} />
      <RobotArm side={1} />
      <RobotLegs />
    </group>
  );
}

// === FLOATING PARTICLES ===
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1800;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      [0.54, 0.36, 0.96], // purple
      [0.23, 0.51, 0.96], // blue
      [0.02, 0.71, 0.83], // cyan
      [1, 1, 1],          // white
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.015) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.6} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// === NEON HALO BEHIND ROBOT ===
function NeonHalo() {
  const haloRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!haloRef.current) return;
    const t = state.clock.getElapsedTime();
    haloRef.current.rotation.z = t * 0.15;
    const mat = haloRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.8 + Math.sin(t * 1.5) * 0.3;
  });

  return (
    <group position={[0, -0.3, -0.8]}>
      {/* Outer halo ring */}
      <mesh ref={haloRef} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 120]} />
        <meshStandardMaterial emissive="#8b5cf6" emissiveIntensity={0.6} color="#000" roughness={0} metalness={0} transparent opacity={0.7} />
      </mesh>
      {/* Inner halo ring */}
      <mesh rotation={[0.3, 0, 0.4]}>
        <torusGeometry args={[1.6, 0.01, 16, 100]} />
        <meshStandardMaterial emissive="#06b6d4" emissiveIntensity={0.5} color="#000" roughness={0} metalness={0} transparent opacity={0.5} />
      </mesh>
      {/* Glow disc */}
      <mesh position={[0, 0, -0.3]} rotation={[0, 0, 0]}>
        <circleGeometry args={[2.5, 64]} />
        <meshStandardMaterial
          emissive="#8b5cf6"
          emissiveIntensity={0.15}
          color="#000"
          roughness={1}
          metalness={0}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// === CAMERA CONTROLLER (scroll-based) ===
function CameraController({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scroll = scrollY.current;

    // Idle cinematic drift (always active)
    const idleX = Math.sin(t * 0.2) * 0.15;
    const idleY = Math.sin(t * 0.15) * 0.08;

    // Scroll phase
    const phase = Math.min(scroll / 800, 1);

    // Phase 0 → 0.5: zoom in
    const zoom = THREE.MathUtils.lerp(5.5, 3.2, Math.min(phase * 2, 1));
    // Phase 0.5 → 1: orbit around
    const orbitAngle = Math.max(0, (phase - 0.5) * 2) * Math.PI * 0.6;

    const targetX = Math.sin(orbitAngle) * zoom + idleX;
    const targetZ = Math.cos(orbitAngle) * zoom;
    const targetY = idleY + phase * 0.3;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
    camera.lookAt(0, -0.2, 0);
  });

  return null;
}

// === GROUND REFLECTOR ===
function GroundReflector() {
  return (
    <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={8}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#0a0a14"
        metalness={0.8}
        mirror={0}
      />
    </mesh>
  );
}

// === MAIN SCENE EXPORT ===
interface RobotSceneProps {
  scrollY: React.MutableRefObject<number>;
}

export default function RobotScene({ scrollY }: RobotSceneProps) {
  const mouseRef = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2
      ];
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="robot-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 52 }}
        shadows
        gl={{ antialias: true, toneMappingExposure: 1.2 }}
      >
        <CameraController scrollY={scrollY} />

        {/* Lighting */}
        <ambientLight intensity={0.3} />
        {/* Key light */}
        <directionalLight position={[3, 4, 3]} intensity={2.5} castShadow color="#ffffff" shadow-mapSize={[2048, 2048]} />
        {/* Rim light left */}
        <pointLight position={[-4, 2, -2]} intensity={3} color="#8b5cf6" />
        {/* Rim light right */}
        <pointLight position={[4, 1, -1]} intensity={2} color="#06b6d4" />
        {/* Fill light */}
        <pointLight position={[0, -2, 3]} intensity={1} color="#3b82f6" />
        {/* Top back light */}
        <spotLight position={[0, 5, -3]} intensity={4} angle={0.4} penumbra={0.8} color="#c4b5fd" castShadow />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Scene elements */}
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.08}>
          <FullRobot mouseRef={mouseRef} />
        </Float>

        <NeonHalo />
        <FloatingParticles />
        <GroundReflector />
        <ContactShadows position={[0, -2.45, 0]} opacity={0.5} scale={6} blur={2.5} far={4} />

        {/* Distant stars */}
        <Stars radius={60} depth={30} count={2000} factor={3} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
