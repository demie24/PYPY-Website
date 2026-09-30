import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { IEEE39_3D_BUSES, IEEE39_3D_LINES, Bus3D, Line3D, AI_MODELS_V2 } from '../../data';

interface CinematicGridCanvasProps {
  progress: number; // 0.00 to 1.00
  selectedBus: Bus3D | null;
  onSelectBus: (bus: Bus3D | null) => void;
}

// -------------------------------------------------------------
// Master Continuous Camera Choreography across all 9 Scenes
// -------------------------------------------------------------
function CameraMotion({
  progress,
  selectedBus
}: {
  progress: number;
  selectedBus: Bus3D | null;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 24));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // --- SCENE 01: INTRO (0.00 - 0.12) ---
    if (progress < 0.12) {
      const p = progress / 0.12;
      const z = THREE.MathUtils.lerp(24, 20, p);
      targetPos.current.set(Math.sin(t * 0.2) * 0.4, Math.cos(t * 0.15) * 0.3, z);
      targetLook.current.set(0, 0, 0);
    }
    // --- SCENE 02: IEEE 39-BUS THE GRID (0.12 - 0.24) ---
    else if (progress < 0.24) {
      const p = (progress - 0.12) / (0.24 - 0.12);
      const z = THREE.MathUtils.lerp(20, 16.0, p);
      targetPos.current.set(0, -0.2, z);
      targetLook.current.set(0, 0, 0);
    }
    // --- SCENE 03: THE THREAT INFECTION (0.24 - 0.35) ---
    else if (progress < 0.35) {
      const p = (progress - 0.24) / (0.35 - 0.24);
      const diveZ = THREE.MathUtils.lerp(16.0, 13.5, p);
      const jitter = p > 0.2 ? Math.sin(t * 36) * 0.02 * p : 0;
      targetPos.current.set(0.6 + jitter, 0.1 + jitter, diveZ);
      targetLook.current.set(0.6, 0, 0);
    }
    // --- SCENE 04: CYBER ATTACKS TRILOGY (0.35 - 0.48) ---
    else if (progress < 0.48) {
      targetPos.current.set(0.6, 0, 15.5);
      targetLook.current.set(0.6, 0, 0);
    }
    // --- SCENE 05: INTERACTIVE DIGITAL TWIN (0.48 - 0.60) ---
    else if (progress < 0.60) {
      if (selectedBus) {
        // Soft focus without losing right-side composition
        targetPos.current.set(0.6, 0.1, 14.5);
        targetLook.current.set(0.6, 0, 0);
      } else {
        // Slow cinematic orbit on the right-hand network
        const p = (progress - 0.48) / (0.60 - 0.48);
        const orbitAngle = t * 0.15 + p * Math.PI;
        targetPos.current.set(
          0.6 + Math.sin(orbitAngle) * 0.6,
          Math.cos(orbitAngle * 0.5) * 0.4,
          15.5
        );
        targetLook.current.set(0.6, 0, 0);
      }
    }
    // --- SCENE 06: AI DEFENCE ASSEMBLY (0.60 - 0.72) ---
    else if (progress < 0.72) {
      targetPos.current.set(0.6, 0.3, 16.0);
      targetLook.current.set(0.6, 0, 0);
    }
    // --- SCENE 07: AUTONOMOUS SELF-HEALING (0.72 - 0.83) ---
    else if (progress < 0.83) {
      const p = (progress - 0.72) / (0.83 - 0.72);
      const pullZ = THREE.MathUtils.lerp(15.5, 17.0, p);
      targetPos.current.set(0.6, 0.1, pullZ);
      targetLook.current.set(0.6, 0, 0);
    }
    // --- SCENE 08: EMPIRICAL RESULTS (0.83 - 0.93) ---
    else if (progress < 0.93) {
      targetPos.current.set(0, 0, 18.0);
      targetLook.current.set(0, 0, 0);
    }
    // --- SCENE 09: FINAL STATEMENT & LIVE CTA (0.93 - 1.00) ---
    else {
      targetPos.current.set(0, 0, 20.0);
      targetLook.current.set(0, 0, 0);
    }

    // Smooth lerp for buttery 60fps movement
    camera.position.lerp(targetPos.current, delta * 3.8);

    const currentLook = new THREE.Vector3(0, 0, 0);
    camera.getWorldDirection(currentLook);
    currentLook.multiplyScalar(10).add(camera.position);
    currentLook.lerp(targetLook.current, delta * 4.6);
    camera.lookAt(targetLook.current);
  });

  return null;
}

// -------------------------------------------------------------
// Dynamic 3D Bus Node Component
// -------------------------------------------------------------
function DynamicBusNode({
  bus,
  progress,
  isSelected,
  onSelect
}: {
  bus: Bus3D;
  progress: number;
  isSelected: boolean;
  onSelect: (bus: Bus3D) => void;
}) {
  const meshRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  const isBus5 = bus.id === "Bus_5";
  const isCoreNode = [1, 2, 3, 4, 5, 30].includes(bus.number);

  // Attack status logic across scenes
  const isThreatScene = progress >= 0.24 && progress < 0.35;
  const isAttacksScene = progress >= 0.35 && progress < 0.48;
  const isHealingScene = progress >= 0.72 && progress < 0.83;
  const isHealedState = progress >= 0.83;

  // Specific attack vector highlighting
  let isUnderAttack = false;
  if (isThreatScene && isBus5) {
    isUnderAttack = true;
  } else if (isAttacksScene) {
    const pAttack = (progress - 0.35) / (0.48 - 0.35);
    if (pAttack < 0.33 && ['Bus_4', 'Bus_5', 'Bus_6'].includes(bus.id)) {
      isUnderAttack = true;
    } else if (pAttack >= 0.33 && pAttack < 0.66 && ['Bus_1', 'Bus_2'].includes(bus.id)) {
      isUnderAttack = true;
    } else if (pAttack >= 0.66 && ['Bus_4', 'Bus_8', 'Bus_20'].includes(bus.id)) {
      isUnderAttack = true;
    }
  }

  // Healing progress
  const healingProgress = isHealingScene ? (progress - 0.72) / (0.83 - 0.72) : isHealedState ? 1 : 0;
  const isNodeRestored = isHealedState || (isHealingScene && healingProgress > 0.5);

  // Dynamic Color
  const baseColor = bus.type === 'generator' ? '#38bdf8' : bus.type === 'load' ? '#10b981' : '#94a3b8';
  let nodeColor = baseColor;
  if (isUnderAttack && !isNodeRestored) {
    nodeColor = '#ef4444';
  } else if (isNodeRestored || isHealingScene) {
    nodeColor = bus.type === 'generator' ? '#38bdf8' : '#10b981';
  } else if (isSelected) {
    nodeColor = '#0071e3';
  }

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (meshRef.current) {
      if (bus.type === 'generator') {
        meshRef.current.rotation.y += delta * 1.6;
        meshRef.current.rotation.x += delta * 0.8;
      } else {
        meshRef.current.rotation.y += delta * 0.7;
      }

      // Chaotic physical vibration during attack
      if (isUnderAttack && !isNodeRestored) {
        meshRef.current.position.x = Math.sin(t * 38) * 0.08;
        meshRef.current.position.y = Math.cos(t * 32) * 0.08;
        meshRef.current.position.z = Math.sin(t * 40) * 0.06;
      } else {
        meshRef.current.position.y = Math.sin(t * 0.7 + bus.number) * 0.04;
      }
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.7;
      if (isUnderAttack && !isNodeRestored) {
        const s = 1.0 + Math.sin(t * 10) * 0.25;
        ringRef.current.scale.set(s, s, s);
      } else if (isSelected) {
        const s = 1.0 + Math.sin(t * 4) * 0.15;
        ringRef.current.scale.set(s, s, s);
      } else {
        ringRef.current.scale.set(1, 1, 1);
      }
    }
  });

  // Scale and opacity across scenes
  let nodeScale = 1.0;
  let nodeOpacity = 1.0;

  if (progress < 0.12) {
    // Scene 01: Core nodes visible as a small cluster
    if (isCoreNode) {
      nodeScale = 0.55 + (progress / 0.12) * 0.35;
      nodeOpacity = 0.35 + (progress / 0.12) * 0.65;
    } else {
      nodeScale = 0.001;
      nodeOpacity = 0.0;
    }
  } else if (progress < 0.18) {
    const p = (progress - 0.12) / (0.18 - 0.12);
    nodeScale = isCoreNode ? 0.9 + p * 0.1 : p * 1.0;
    nodeOpacity = isCoreNode ? 1.0 : p * 1.0;
  } else {
    nodeScale = (isUnderAttack && !isNodeRestored) || isSelected ? 1.35 : 1.0;
    nodeOpacity = 1.0;
  }

  if (nodeOpacity <= 0.01) return null;

  return (
    <group position={[bus.x, bus.y, bus.z]} scale={nodeScale}>
      {/* Click Hit Sphere for Scene 05 */}
      <mesh
        visible={false}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(bus);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshBasicMaterial />
      </mesh>

      {/* Visual Rotating Core Node */}
      <group ref={meshRef}>
        {bus.type === 'generator' ? (
          <mesh>
            <octahedronGeometry args={[0.26, 0]} />
            <meshStandardMaterial
              color={nodeColor}
              emissive={nodeColor}
              emissiveIntensity={0.7}
              roughness={0.15}
              metalness={0.7}
              transparent
              opacity={nodeOpacity}
            />
          </mesh>
        ) : bus.type === 'load' ? (
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial
              color={nodeColor}
              emissive={nodeColor}
              emissiveIntensity={0.6}
              roughness={0.2}
              metalness={0.5}
              transparent
              opacity={nodeOpacity}
            />
          </mesh>
        ) : (
          <mesh>
            <dodecahedronGeometry args={[0.14, 0]} />
            <meshStandardMaterial
              color={nodeColor}
              emissive={nodeColor}
              emissiveIntensity={isUnderAttack && !isNodeRestored ? 0.95 : 0.45}
              roughness={0.25}
              metalness={0.4}
              transparent
              opacity={nodeOpacity}
            />
          </mesh>
        )}
      </group>

      {/* Precision Orbiting Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.28, 0.31, 24]} />
        <meshBasicMaterial
          color={nodeColor}
          side={THREE.DoubleSide}
          transparent
          opacity={isUnderAttack && !isNodeRestored ? 0.95 : nodeOpacity * 0.45}
        />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// Expanding Red Threat Zone Sphere around Bus 5
// -------------------------------------------------------------
function ThreatZoneSphere({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerWaveRef = useRef<THREE.Mesh>(null!);

  const isThreatActive = progress >= 0.24 && progress < 0.48;
  const isHealingActive = progress >= 0.72;

  useFrame((state) => {
    if (!isThreatActive || isHealingActive) return;
    const t = state.clock.elapsedTime;

    if (outerWaveRef.current) {
      const cycle = (t * 1.8) % 1;
      const s = 1.0 + cycle * 4.2;
      outerWaveRef.current.scale.set(s, s, s);
      const mat = outerWaveRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - cycle) * 0.75;
    }

    if (meshRef.current) {
      const breath = 1.0 + Math.sin(t * 8) * 0.1;
      meshRef.current.scale.set(2.8 * breath, 2.8 * breath, 2.8 * breath);
    }
  });

  if (!isThreatActive || isHealingActive) return null;

  const bus5 = IEEE39_3D_BUSES["Bus_5"];

  return (
    <group position={[bus5.x, bus5.y, bus5.z]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshBasicMaterial color="#ef4444" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={outerWaveRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.58, 36]} />
        <meshBasicMaterial color="#ef4444" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// Dynamic 3D Transmission Line with Packet Pulses
// -------------------------------------------------------------
function DynamicLine({
  line,
  progress
}: {
  line: Line3D;
  progress: number;
}) {
  const pulseRef = useRef<THREE.Mesh>(null!);
  const fromBus = IEEE39_3D_BUSES[line.from];
  const toBus = IEEE39_3D_BUSES[line.to];

  const start = useMemo(() => new THREE.Vector3(fromBus.x, fromBus.y, fromBus.z), [fromBus]);
  const end = useMemo(() => new THREE.Vector3(toBus.x, toBus.y, toBus.z), [toBus]);

  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.z += 0.18;
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
  }, [curve]);

  // Attack status logic
  const isBus5Line = line.from === 'Bus_5' || line.to === 'Bus_5';
  const isLine0 = line.id === 'L_line_0';
  const isLoadLine = ['L_line_5', 'L_line_14', 'L_line_31'].includes(line.id);

  const isThreatScene = progress >= 0.24 && progress < 0.35;
  const isAttacksScene = progress >= 0.35 && progress < 0.48;
  const isHealingScene = progress >= 0.72 && progress < 0.83;
  const isHealedState = progress >= 0.83;

  let isLineAttacked = false;
  let isLineDisconnected = false;

  if (isThreatScene && isBus5Line) {
    isLineAttacked = true;
  } else if (isAttacksScene) {
    const pAttack = (progress - 0.35) / (0.48 - 0.35);
    if (pAttack < 0.33 && isBus5Line) isLineAttacked = true;
    else if (pAttack >= 0.33 && pAttack < 0.66 && isLine0) {
      isLineAttacked = true;
      isLineDisconnected = true;
    } else if (pAttack >= 0.66 && isLoadLine) isLineAttacked = true;
  }

  const isRestored = isHealedState || (isHealingScene && (progress - 0.72) / (0.83 - 0.72) > 0.5);

  const activeColor = isRestored
    ? '#10b981'
    : isLineAttacked
      ? '#ef4444'
      : '#0284c7';

  // Packet animation
  useFrame((state) => {
    if (pulseRef.current && !isLineDisconnected) {
      const speed = isLineAttacked ? 1.4 : isRestored ? 0.65 : 0.45;
      const t = (state.clock.elapsedTime * speed) % 1;
      const pos = curve.getPoint(t);
      pulseRef.current.position.copy(pos);
    }
  });

  let lineOpacity = 0.35;
  if (progress < 0.12) {
    const isCoreLine = ['Bus_1', 'Bus_2', 'Bus_3', 'Bus_4', 'Bus_5'].includes(line.from) &&
                       ['Bus_1', 'Bus_2', 'Bus_3', 'Bus_4', 'Bus_5'].includes(line.to);
    lineOpacity = isCoreLine ? 0.2 * (progress / 0.12) : 0.0;
  } else if (progress < 0.18) {
    const p = (progress - 0.12) / (0.18 - 0.12);
    lineOpacity = 0.2 + p * 0.18;
  } else if (isLineAttacked) {
    lineOpacity = isLineDisconnected ? 0.2 : 0.95;
  } else if (isRestored) {
    lineOpacity = 0.55;
  }

  if (lineOpacity <= 0.01) return null;

  return (
    <group>
      <primitive
        object={new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({
            color: activeColor,
            transparent: true,
            opacity: lineOpacity
          })
        )}
      />

      {/* Energy Packet */}
      {progress > 0.10 && !isLineDisconnected && (
        <mesh ref={pulseRef}>
          <sphereGeometry args={[isLineAttacked ? 0.08 : 0.05, 8, 8]} />
          <meshBasicMaterial
            color={isRestored ? '#10b981' : isLineAttacked ? '#ef4444' : '#38bdf8'}
            transparent
            opacity={0.9}
          />
        </mesh>
      )}
    </group>
  );
}

// -------------------------------------------------------------
// 4 Assembling AI Orbital Defence Rings in Scene 06
// -------------------------------------------------------------
function AiShieldRings({ progress }: { progress: number }) {
  const isAiScene = progress >= 0.58 && progress < 0.74;
  const ring1 = useRef<THREE.Group>(null!);
  const ring2 = useRef<THREE.Group>(null!);
  const ring3 = useRef<THREE.Group>(null!);
  const ring4 = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!isAiScene) return;
    if (ring1.current) ring1.current.rotation.z += delta * 0.18;
    if (ring2.current) ring2.current.rotation.x += delta * 0.14;
    if (ring3.current) ring3.current.rotation.y += delta * 0.16;
    if (ring4.current) ring4.current.rotation.z -= delta * 0.12;
  });

  if (!isAiScene) return null;

  // Progressive assembly as user scrolls through Scene 06
  const p = (progress - 0.58) / (0.74 - 0.58);
  const ring1Opacity = Math.min(0.9, p * 3.5);
  const ring2Opacity = Math.min(0.9, Math.max(0, (p - 0.25) * 3.5));
  const ring3Opacity = Math.min(0.9, Math.max(0, (p - 0.50) * 3.5));
  const ring4Opacity = Math.min(0.9, Math.max(0, (p - 0.75) * 3.5));

  return (
    <group position={[0, 0, 0]}>
      {/* Ring 1: Bi-LSTM Temporal Shield */}
      <group ref={ring1}>
        <mesh>
          <torusGeometry args={[8.8, 0.04, 16, 100]} />
          <meshBasicMaterial color="#0071e3" transparent opacity={ring1Opacity} />
        </mesh>
      </group>

      {/* Ring 2: GCN Spatial Topology Shield */}
      <group ref={ring2} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[9.5, 0.04, 16, 100]} />
          <meshBasicMaterial color="#0284c7" transparent opacity={ring2Opacity} />
        </mesh>
      </group>

      {/* Ring 3: PINN Physics Governor Shield */}
      <group ref={ring3} rotation={[0, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[10.2, 0.045, 16, 100]} />
          <meshBasicMaterial color="#10b981" transparent opacity={ring3Opacity} />
        </mesh>
      </group>

      {/* Ring 4: ST-GNN Cascade Dynamics Shield */}
      <group ref={ring4} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[10.9, 0.04, 16, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={ring4Opacity} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// Master Cinematic WebGL Canvas
// -------------------------------------------------------------
export const CinematicGridCanvas: React.FC<CinematicGridCanvasProps> = ({
  progress,
  selectedBus,
  onSelectBus
}) => {
  const isThreatOrAttack = (progress >= 0.24 && progress < 0.48);
  const isHealing = progress >= 0.72 && progress < 0.83;
  const isHealed = progress >= 0.83;

  // Dynamic 3D staging to guarantee clean negative space for typography
  let netX = 0;
  let netY = 0;
  let netZ = 0;
  let netScale = 1.0;

  if (progress < 0.12) {
    // Scene 01: Centered minimal cluster
    netX = 0;
    netY = 0;
    netZ = 0;
    netScale = 0.32 + (progress / 0.12) * 0.22;
  } else if (progress < 0.24) {
    // Scene 02: Smooth shift to right (+4.8) leaving left 50% clean for IEEE 39-BUS DIGITAL TWIN
    const p = (progress - 0.12) / (0.24 - 0.12);
    netX = THREE.MathUtils.lerp(0, 4.8, p);
    netY = THREE.MathUtils.lerp(0, -0.2, p);
    netZ = 0;
    netScale = THREE.MathUtils.lerp(0.54, 0.84, p);
  } else if (progress < 0.35) {
    // Scene 03: The Threat (Bus 5 is on the right)
    netX = 4.8;
    netY = -0.1;
    netZ = 0;
    netScale = 0.84;
  } else if (progress < 0.48) {
    // Scene 04: Cyber Attacks Trilogy
    netX = 4.8;
    netY = -0.1;
    netZ = 0;
    netScale = 0.84;
  } else if (progress < 0.60) {
    // Scene 05: SCADA Telemetry (Click Any Substation)
    netX = 4.8;
    netY = 0;
    netZ = 0;
    netScale = 0.84;
  } else if (progress < 0.72) {
    // Scene 06: AI Defence Assembly (Four Models. One Defence System.)
    netX = 4.8;
    netY = 0.1;
    netZ = 0;
    netScale = 0.82;
  } else if (progress < 0.83) {
    // Scene 07: Autonomous Self-Healing (The Grid Recovers.)
    netX = 4.8;
    netY = 0;
    netZ = 0;
    netScale = 0.84;
  } else if (progress < 0.93) {
    // Scene 08: Empirical Results — elevate grid to upper half (+4.2) and push deep into background (-12)
    const p = (progress - 0.83) / (0.93 - 0.83);
    netX = THREE.MathUtils.lerp(4.8, 0, p);
    netY = THREE.MathUtils.lerp(0, 4.2, p);
    netZ = THREE.MathUtils.lerp(0, -12.0, p);
    netScale = THREE.MathUtils.lerp(0.84, 0.42, p);
  } else {
    // Scene 09: Final Statement — drop grid to lower center (-3.2) so PYPY title floats above
    netX = 0;
    netY = -3.2;
    netZ = -6.0;
    netScale = 0.50;
  }

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 24], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#050811']} />
        <fog attach="fog" args={['#050811', 18, 55]} />

        {/* Ambient & Studio Lights */}
        <ambientLight intensity={0.55} />
        <directionalLight position={[12, 16, 20]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-12, -10, -10]} intensity={0.4} color="#0284c7" />

        {/* Dynamic Scene Lighting */}
        <pointLight position={[0, 4, 8]} intensity={1.1} color="#0071e3" distance={25} />

        {/* High Voltage Threat Crimson Flash */}
        {isThreatOrAttack && !isHealing && (
          <pointLight position={[4.2, 0, 5]} intensity={4.5} color="#ef4444" distance={20} />
        )}

        {/* Emerald Green Recovery Beacon */}
        {(isHealing || isHealed) && (
          <pointLight position={[0, 0, 8]} intensity={2.5} color="#10b981" distance={25} />
        )}

        {/* Master Camera Choreography */}
        <CameraMotion progress={progress} selectedBus={selectedBus} />

        {/* The IEEE 39-Bus Network Group with Dynamic Staging */}
        <group position={[netX, netY, netZ]} scale={netScale}>
          {/* 4 AI Orbital Shield Rings */}
          <AiShieldRings progress={progress} />

          {/* 46 Transmission Lines */}
          {IEEE39_3D_LINES.map((line) => (
            <DynamicLine key={line.id} line={line} progress={progress} />
          ))}

          {/* 39 Bus Nodes */}
          {Object.values(IEEE39_3D_BUSES).map((bus) => (
            <DynamicBusNode
              key={bus.id}
              bus={bus}
              progress={progress}
              isSelected={selectedBus?.id === bus.id}
              onSelect={onSelectBus}
            />
          ))}

          {/* Threat Shockwave Sphere */}
          <ThreatZoneSphere progress={progress} />
        </group>
      </Canvas>
    </div>
  );
};
