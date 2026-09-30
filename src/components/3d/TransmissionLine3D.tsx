import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line3D, Bus3D } from '../../data';

interface TransmissionLine3DProps {
  line: Line3D;
  fromBus: Bus3D;
  toBus: Bus3D;
  isAttacked: boolean;
  isHealed: boolean;
  isHighlighted: boolean;
  isChaotic?: boolean;
}

export const TransmissionLine3D: React.FC<TransmissionLine3DProps> = ({
  line,
  fromBus,
  toBus,
  isAttacked,
  isHealed,
  isHighlighted,
  isChaotic = false
}) => {
  const pulseRef = useRef<THREE.Mesh>(null!);

  const isChaoticLine = useMemo(() => {
    if (!isChaotic) return false;
    const chaoticBuses = ['Bus_4', 'Bus_5', 'Bus_6', 'Bus_7', 'Bus_8'];
    return chaoticBuses.includes(line.from) || chaoticBuses.includes(line.to);
  }, [isChaotic, line.from, line.to]);

  const start = useMemo(() => new THREE.Vector3(fromBus.x, fromBus.y, fromBus.z), [fromBus]);
  const end = useMemo(() => new THREE.Vector3(toBus.x, toBus.y, toBus.z), [toBus]);

  // Curve / mid-point with subtle depth sag for realistic electrical transmission lines
  const points = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.z += 0.15;
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(24);
  }, [start, end]);

  const curveObject = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.z += 0.15;
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  // Determine line color
  const activeColor = (isAttacked || isChaoticLine) && !isHealed
    ? '#ef4444'
    : isHealed
      ? '#10b981'
      : isHighlighted
        ? '#0071e3'
        : '#94a3b8';

  // Animate power pulse along the curve
  useFrame((state) => {
    if (pulseRef.current) {
      const speed = Math.max(0.2, Math.abs(line.normalFlowMW) / 400);
      const t = (state.clock.elapsedTime * speed * (isChaoticLine ? 0.8 : 0.4)) % 1;
      const pos = curveObject.getPoint(t);
      pulseRef.current.position.copy(pos);
    }
  });

  const lineObject = useMemo(() => {
    const isRed = (isAttacked || isChaoticLine) && !isHealed;
    const mat = new THREE.LineBasicMaterial({
      color: activeColor,
      transparent: true,
      opacity: isRed ? 0.88 : isHighlighted ? 0.9 : 0.28,
    });
    return new THREE.Line(geometry, mat);
  }, [geometry, activeColor, isAttacked, isChaoticLine, isHealed, isHighlighted]);

  const isWarning = (isAttacked || isChaoticLine) && !isHealed;

  return (
    <group>
      {/* Base Wire Line */}
      <primitive object={lineObject} />

      {/* Flowing Energy Packet Pulse */}
      {!isWarning && (
        <mesh ref={pulseRef}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial
            color={isHealed ? '#10b981' : isHighlighted ? '#0071e3' : '#0284c7'}
            transparent
            opacity={0.9}
          />
        </mesh>
      )}

      {/* Attacked Warning Glitch Pulse */}
      {isWarning && (
        <mesh ref={pulseRef}>
          <sphereGeometry args={[0.065, 8, 8]} />
          <meshBasicMaterial
            color="#ef4444"
            transparent
            opacity={0.95}
          />
        </mesh>
      )}
    </group>
  );
};
