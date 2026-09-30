import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleDust3D: React.FC<{ count?: number }> = ({ count = 300 }) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Scatter in a 3D volume around the grid
      pos[i * 3] = (Math.random() - 0.5) * 36;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Soft subtle CAD grid dust: slate-400 and soft blue
      const r = Math.random();
      if (r > 0.6) {
        col[i * 3] = 0.58; col[i * 3 + 1] = 0.64; col[i * 3 + 2] = 0.72; // Slate 400
      } else if (r > 0.3) {
        col[i * 3] = 0.0; col[i * 3 + 1] = 0.44; col[i * 3 + 2] = 0.89; // Subtle blue
      } else {
        col[i * 3] = 0.06; col[i * 3 + 1] = 0.72; col[i * 3 + 2] = 0.51; // Subtle emerald
      }
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.01;
      pointsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </points>
  );
};
