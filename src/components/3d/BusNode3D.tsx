import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Bus3D } from '../../data';

interface BusNode3DProps {
  bus: Bus3D;
  isSelected: boolean;
  isAttacked: boolean;
  isHealed: boolean;
  isLineTarget: boolean;
  isChaotic?: boolean;
  isHero?: boolean;
  onSelect: (bus: Bus3D) => void;
}

export const BusNode3D: React.FC<BusNode3DProps> = ({
  bus,
  isSelected,
  isAttacked,
  isHealed,
  isLineTarget,
  isChaotic = false,
  isHero = false,
  onSelect
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // Determine dynamic node color
  const baseColor = bus.type === 'generator' ? '#0071e3' : bus.type === 'load' ? '#10b981' : '#64748b';
  const activeColor = isAttacked
    ? '#ef4444'
    : isHealed
      ? '#10b981'
      : isSelected
        ? '#0071e3'
        : isLineTarget
          ? '#f59e0b'
          : baseColor;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    // Base position
    let posX = bus.x;
    let posY = bus.y;
    let posZ = bus.z;

    // Hero ambient float: nodes slowly drift around the central typography
    if (isHero) {
      posX += Math.sin(t * 0.4 + bus.number) * 0.12;
      posY += Math.cos(t * 0.35 + bus.number * 0.8) * 0.14;
      posZ += Math.sin(t * 0.25 + bus.number * 0.5) * 0.18;
    }

    // Problem section chaotic behaviour: compromised nodes move forward towards camera
    if (isChaotic) {
      const isVulnerable = [4, 5, 6, 7, 8].includes(bus.number);
      if (isVulnerable) {
        // Move towards camera with subtle chaotic oscillation
        posZ += 1.2 + Math.sin(t * 3.5 + bus.number) * 0.25;
        posX += Math.cos(t * 2.8 + bus.number) * 0.1;
      }
    }

    // Smoothly interpolate group position
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, posX, delta * 3);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, posY, delta * 3);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, posZ, delta * 3);

    // Micro rotation
    if (meshRef.current) {
      if (bus.type === 'generator') {
        meshRef.current.rotation.y += delta * 1.5;
        meshRef.current.rotation.x += delta * 0.8;
      } else {
        meshRef.current.rotation.y += delta * 0.6;
      }
    }

    // Ring animation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.9;
      if (isAttacked || (isChaotic && [4, 5, 6].includes(bus.number))) {
        const s = 1 + Math.sin(t * 7) * 0.25;
        ringRef.current.scale.set(s, s, s);
      } else {
        ringRef.current.scale.set(1, 1, 1);
      }
    }
  });

  return (
    <group ref={groupRef} position={[bus.x, bus.y, bus.z]}>
      {/* Interactive Hit Sphere */}
      <mesh
        visible={false}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(bus);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshBasicMaterial />
      </mesh>

      {/* Visual Rotating Core Node */}
      <group ref={meshRef}>
        {bus.type === 'generator' ? (
          // Generator Cyber Crystal (Octahedron - Blue)
          <mesh scale={hovered || isSelected ? 1.35 : 1.05}>
            <octahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial
              color={activeColor}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        ) : bus.type === 'load' ? (
          // Load Substation Beacon (Sphere - Emerald Green)
          <mesh scale={hovered || isSelected ? 1.3 : 1.0}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial
              color={activeColor}
              roughness={0.2}
              metalness={0.4}
            />
          </mesh>
        ) : (
          // Junction Node (Slate Dodecahedron)
          <mesh scale={hovered || isSelected ? 1.25 : 0.85}>
            <dodecahedronGeometry args={[0.13, 0]} />
            <meshStandardMaterial
              color={activeColor}
              roughness={0.3}
              metalness={0.3}
            />
          </mesh>
        )}
      </group>

      {/* Outer Precision Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.24, 0.26, 24]} />
        <meshBasicMaterial
          color={activeColor}
          side={THREE.DoubleSide}
          transparent
          opacity={isAttacked ? 0.95 : hovered || isSelected ? 0.9 : 0.3}
        />
      </mesh>

      {/* Attacked Warning Indicator Wave */}
      {(isAttacked || (isChaotic && [4, 5, 6].includes(bus.number))) && (
        <mesh>
          <sphereGeometry args={[0.48, 16, 16]} />
          <meshBasicMaterial
            color="#ef4444"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      )}

      {/* Floating 3D Engineering Tag (Only when hovered, selected, or attacked) */}
      {(isSelected || hovered || isAttacked || bus.isSlack) && (
        <Html
          distanceFactor={18}
          position={[0, 0.35, 0]}
          center
          pointerEvents="none"
        >
          <div
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider select-none transition-all duration-200 whitespace-nowrap shadow-sm ${
              isAttacked
                ? 'bg-red-50 text-red-700 border border-red-300 scale-105'
                : isSelected || hovered
                  ? 'bg-blue-50 text-blue-700 border border-blue-300 scale-105'
                  : 'bg-white/95 text-slate-700 border border-slate-200'
            }`}
          >
            {bus.label}
          </div>
        </Html>
      )}
    </group>
  );
};
