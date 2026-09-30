import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberShieldRings3DProps {
  active: boolean;
  selectedModel?: string;
}

export const CyberShieldRings3D: React.FC<CyberShieldRings3DProps> = ({ active, selectedModel }) => {
  const ring1Ref = useRef<THREE.Group>(null!);
  const ring2Ref = useRef<THREE.Group>(null!);
  const ring3Ref = useRef<THREE.Group>(null!);
  const ring4Ref = useRef<THREE.Group>(null!);

  const sat1Ref = useRef<THREE.Mesh>(null!);
  const sat2Ref = useRef<THREE.Mesh>(null!);
  const sat3Ref = useRef<THREE.Mesh>(null!);
  const sat4Ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!active) return;
    const t = state.clock.elapsedTime;

    // Continuous orbital rotations
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.18;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.14;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.16;
    if (ring4Ref.current) ring4Ref.current.rotation.z -= delta * 0.12;

    // Orbiting satellite beacons along the toruses
    if (sat1Ref.current) {
      sat1Ref.current.position.set(Math.cos(t * 1.2) * 8.8, Math.sin(t * 1.2) * 8.8, 0);
    }
    if (sat2Ref.current) {
      sat2Ref.current.position.set(Math.cos(t * 0.95) * 9.5, Math.sin(t * 0.95) * 9.5, 0);
    }
    if (sat3Ref.current) {
      sat3Ref.current.position.set(Math.cos(t * 1.1) * 10.2, Math.sin(t * 1.1) * 10.2, 0);
    }
    if (sat4Ref.current) {
      sat4Ref.current.position.set(Math.cos(t * 0.8) * 10.9, Math.sin(t * 0.8) * 10.9, 0);
    }
  });

  if (!active) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* Layer 1: Bi-LSTM Temporal Anomaly Detection Ring (Primary Blue) */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[8.8, 0.04, 16, 120]} />
          <meshBasicMaterial
            color="#0071e3"
            transparent
            opacity={selectedModel === 'bilstm' ? 0.95 : 0.45}
          />
        </mesh>
        {/* Orbiting Satellite Node */}
        <mesh ref={sat1Ref}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshBasicMaterial color="#0071e3" />
        </mesh>
      </group>

      {/* Layer 2: GCN Spatial Topology Localisation Lattice (Teal / Cyan) */}
      <group ref={ring2Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[9.5, 0.04, 16, 120]} />
          <meshBasicMaterial
            color="#0284c7"
            transparent
            opacity={selectedModel === 'gcn' ? 0.95 : 0.45}
          />
        </mesh>
        <mesh ref={sat2Ref}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      </group>

      {/* Layer 3: PINN Physics Kirchhoff Constraint Halo (Emerald Green) */}
      <group ref={ring3Ref} rotation={[0, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[10.2, 0.045, 16, 120]} />
          <meshBasicMaterial
            color="#10b981"
            transparent
            opacity={selectedModel === 'pinn' ? 0.95 : 0.5}
          />
        </mesh>
        <mesh ref={sat3Ref}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>

      {/* Layer 4: ST-GNN Spatio-Temporal Cascade Forecaster (Purple Accent) */}
      <group ref={ring4Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[10.9, 0.04, 16, 120]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={selectedModel === 'stgnn' ? 0.95 : 0.4}
          />
        </mesh>
        <mesh ref={sat4Ref}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshBasicMaterial color="#8b5cf6" />
        </mesh>
      </group>
    </group>
  );
};
