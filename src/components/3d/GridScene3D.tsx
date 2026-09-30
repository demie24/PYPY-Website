import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { IEEE39_3D_BUSES, IEEE39_3D_LINES, Bus3D } from '../../data';
import { BusNode3D } from './BusNode3D';
import { TransmissionLine3D } from './TransmissionLine3D';
import { ParticleDust3D } from './ParticleDust3D';
import { CyberShieldRings3D } from './CyberShieldRings3D';

interface GridScene3DProps {
  currentSection: string;
  selectedBus: Bus3D | null;
  onSelectBus: (bus: Bus3D) => void;
  attackMode: 'none' | 'fdia' | 'breaker' | 'load';
  isHealed: boolean;
  selectedAiModel?: string;
}

// Continuous cinematic camera choreography linking all 8 story scenes
function CameraRig({
  currentSection,
  selectedBus,
  attackMode,
  isHealed
}: {
  currentSection: string;
  selectedBus: Bus3D | null;
  attackMode: string;
  isHealed: boolean;
}) {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 18));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    switch (currentSection) {
      case 'hero':
        // Scene 01: Central typography surrounded by floating nodes
        // Camera slowly dollies forward from 19 down towards 16.5 with subtle mouse parallax
        const heroZ = 18.2 - Math.min(2.5, t * 0.15);
        targetPos.current.set(pointer.x * 0.6, pointer.y * 0.4, Math.max(15.5, heroZ));
        targetLookAt.current.set(0, 0, 0);
        break;

      case 'problem':
        // Scene 02: Typography on the left, chaotic 3D anomaly on the right
        // Camera frames the disturbed substation corridor on the right
        targetPos.current.set(3.8 + pointer.x * 0.4, 0.2 + pointer.y * 0.3, 13.5);
        targetLookAt.current.set(3.5, 0.0, 0);
        break;

      case 'attacks':
        // Scene 03: Camera moves toward affected bus target
        if (attackMode === 'breaker') {
          targetPos.current.set(1.5, -1.6, 8.8);
          targetLookAt.current.set(1.5, -1.8, 0);
        } else if (attackMode === 'load') {
          targetPos.current.set(-2.5, 0.4, 9.5);
          targetLookAt.current.set(-2.5, 0.4, 0);
        } else if (attackMode === 'fdia') {
          // Bus 5 target
          targetPos.current.set(4.2, 0.1, 8.5);
          targetLookAt.current.set(4.2, 0.0, 0.5);
        } else {
          // Attack standby
          targetPos.current.set(2.8 + pointer.x * 0.4, 0.2, 13.0);
          targetLookAt.current.set(2.5, 0, 0);
        }
        break;

      case 'digital-twin':
        // Scene 04: Grid dominates the screen with smooth orbit or lock onto bus
        if (selectedBus) {
          targetPos.current.set(selectedBus.x * 0.6 + 1.2, selectedBus.y * 0.6, 9.5);
          targetLookAt.current.set(selectedBus.x, selectedBus.y, selectedBus.z);
        } else {
          // Smooth slow orbit around center
          const angle = t * 0.12;
          targetPos.current.set(Math.sin(angle) * 3.5, 0.8 + Math.cos(angle * 0.6) * 0.5, 14.5);
          targetLookAt.current.set(0, 0, 0);
        }
        break;

      case 'ai-defence':
        // Scene 05: Elevated 3/4 angle showing the 4 orbital defense rings revolving around the twin
        targetPos.current.set(3.0 + pointer.x * 0.5, 1.8 + pointer.y * 0.3, 16.5);
        targetLookAt.current.set(1.5, 0.2, 0);
        break;

      case 'self-healing':
        // Scene 06: Smooth pull-back as the network recovers to emerald green
        if (isHealed) {
          targetPos.current.set(0, 0.5, 17.5);
          targetLookAt.current.set(0, 0, 0);
        } else {
          targetPos.current.set(1.5, 0.2, 12.5);
          targetLookAt.current.set(1.5, 0.0, 0);
        }
        break;

      case 'results':
        // Scene 07: Stabilized grid in clean perspective behind large metrics
        targetPos.current.set(0, -0.6, 17.0);
        targetLookAt.current.set(0, 0, 0);
        break;

      case 'final':
      default:
        // Scene 08: Majestic wide perspective of the secured digital twin
        targetPos.current.set(0, 0.8, 19.5);
        targetLookAt.current.set(0, 0, 0);
        break;
    }

    // Smooth lerp for seamless, Apple-like cinematic transitions
    camera.position.lerp(targetPos.current, delta * 2.4);

    const currentLook = new THREE.Vector3(0, 0, 0);
    camera.getWorldDirection(currentLook);
    currentLook.multiplyScalar(10).add(camera.position);
    currentLook.lerp(targetLookAt.current, delta * 3.2);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

export const GridScene3D: React.FC<GridScene3DProps> = ({
  currentSection,
  selectedBus,
  onSelectBus,
  attackMode,
  isHealed,
  selectedAiModel
}) => {
  // Compromised nodes and lines based on attack
  const attackedBusIds = useMemo(() => {
    if (attackMode === 'fdia') return new Set(['Bus_5', 'Bus_4', 'Bus_6']);
    if (attackMode === 'breaker') return new Set(['Bus_1', 'Bus_2']);
    if (attackMode === 'load') return new Set(['Bus_4', 'Bus_8', 'Bus_20']);
    return new Set<string>();
  }, [attackMode]);

  const attackedLineIds = useMemo(() => {
    if (attackMode === 'fdia') return new Set(['L_line_7', 'L_line_9', 'L_line_10']);
    if (attackMode === 'breaker') return new Set(['L_line_0']);
    if (attackMode === 'load') return new Set(['L_line_5', 'L_line_14', 'L_line_31']);
    return new Set<string>();
  }, [attackMode]);

  const showAiRings = currentSection === 'ai-defence' || currentSection === 'self-healing';
  const isChaotic = currentSection === 'problem';
  const isHero = currentSection === 'hero';

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#f8fafc']} />
        <fog attach="fog" args={['#f8fafc', 22, 65]} />

        {/* Studio Lighting Setup */}
        <ambientLight intensity={1.15} />
        <directionalLight position={[14, 18, 22]} intensity={1.35} color="#ffffff" />
        <directionalLight position={[-14, -10, -10]} intensity={0.45} color="#94a3b8" />
        <pointLight position={[0, 8, 12]} intensity={0.65} color="#0071e3" />

        {/* Warning Light during Attack or Chaotic Scene */}
        {((attackMode !== 'none' && !isHealed) || isChaotic) && (
          <pointLight position={[4.2, 0.2, 5]} intensity={2.2} color="#ef4444" distance={16} />
        )}

        {/* Healthy Green Beacon when Recovered */}
        {isHealed && (
          <pointLight position={[0, 0, 8]} intensity={1.6} color="#10b981" distance={22} />
        )}

        <CameraRig
          currentSection={currentSection}
          selectedBus={selectedBus}
          attackMode={attackMode}
          isHealed={isHealed}
        />

        {/* Ambient Subtle Cyber Particles */}
        <ParticleDust3D count={260} />

        {/* Transmission Lines */}
        {IEEE39_3D_LINES.map((line) => {
          const fromBus = IEEE39_3D_BUSES[line.from];
          const toBus = IEEE39_3D_BUSES[line.to];
          if (!fromBus || !toBus) return null;

          const isLineAttacked = attackedLineIds.has(line.id) && !isHealed;
          const isHighlighted = selectedBus
            ? line.from === selectedBus.id || line.to === selectedBus.id
            : false;

          return (
            <TransmissionLine3D
              key={line.id}
              line={line}
              fromBus={fromBus}
              toBus={toBus}
              isAttacked={isLineAttacked}
              isHealed={isHealed}
              isHighlighted={isHighlighted}
              isChaotic={isChaotic}
            />
          );
        })}

        {/* 39 Bus Nodes */}
        {Object.values(IEEE39_3D_BUSES).map((bus) => {
          const isNodeAttacked = attackedBusIds.has(bus.id) && !isHealed;
          const isSelected = selectedBus?.id === bus.id;
          const isLineTarget = selectedBus
            ? IEEE39_3D_LINES.some(
                (l) =>
                  (l.from === selectedBus.id && l.to === bus.id) ||
                  (l.to === selectedBus.id && l.from === bus.id)
              )
            : false;

          return (
            <BusNode3D
              key={bus.id}
              bus={bus}
              isSelected={isSelected}
              isAttacked={isNodeAttacked}
              isHealed={isHealed}
              isLineTarget={isLineTarget}
              isChaotic={isChaotic}
              isHero={isHero}
              onSelect={onSelectBus}
            />
          );
        })}

        {/* 4 Orbital AI Defence Rings */}
        <CyberShieldRings3D active={showAiRings} selectedModel={selectedAiModel} />

      </Canvas>
    </div>
  );
};
