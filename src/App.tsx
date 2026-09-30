import React, { useState, useEffect } from 'react';
import { GridScene3D } from './components/3d/GridScene3D';
import { NavigationV2 } from './components/NavigationV2';
import { HeroOverlay } from './components/overlays/HeroOverlay';
import { ProblemOverlay } from './components/overlays/ProblemOverlay';
import { AttacksOverlay } from './components/overlays/AttacksOverlay';
import { DigitalTwinOverlay } from './components/overlays/DigitalTwinOverlay';
import { AiDefenceOverlay } from './components/overlays/AiDefenceOverlay';
import { SelfHealingOverlay } from './components/overlays/SelfHealingOverlay';
import { ResultsOverlay } from './components/overlays/ResultsOverlay';
import { FinalOverlay } from './components/overlays/FinalOverlay';
import { Bus3D } from './data';

export function App() {
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [selectedBus, setSelectedBus] = useState<Bus3D | null>(null);
  const [attackMode, setAttackMode] = useState<'none' | 'fdia' | 'breaker' | 'load'>('none');
  const [isHealed, setIsHealed] = useState<boolean>(false);
  const [selectedAiModel, setSelectedAiModel] = useState<string>('bilstm');

  // Scroll spy to update currentSection and trigger 3D camera transitions
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero',
        'problem',
        'attacks',
        'digital-twin',
        'ai-defence',
        'self-healing',
        'results',
        'final'
      ];

      const scrollPosition = window.scrollY + window.innerHeight * 0.45;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            setCurrentSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setCurrentSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-blue-600 selection:text-white font-sans">
      
      {/* 3D WebGL Canvas Layer (Fixed in Background) */}
      <GridScene3D
        currentSection={currentSection}
        selectedBus={selectedBus}
        onSelectBus={(bus) => {
          setSelectedBus(bus);
          // If in digital twin section, ensure it stays in view
          if (currentSection !== 'digital-twin') {
            handleNavigate('digital-twin');
          }
        }}
        attackMode={attackMode}
        isHealed={isHealed}
        selectedAiModel={selectedAiModel}
      />

      {/* Futuristic Sci-Fi Navigation HUD */}
      <NavigationV2
        currentSection={currentSection}
        onNavigate={handleNavigate}
      />

      {/* Cinematic Scroll Storytelling Overlays */}
      <main className="relative z-10">
        
        {/* Section 01: Hero */}
        <HeroOverlay onExplore={() => handleNavigate('problem')} />

        {/* Section 02: The Problem */}
        <ProblemOverlay />

        {/* Section 03: Cyber Attacks */}
        <AttacksOverlay
          currentAttack={attackMode}
          onSelectAttack={(attack) => {
            setAttackMode(attack);
            setIsHealed(false);
          }}
        />

        {/* Section 04: Digital Twin */}
        <DigitalTwinOverlay
          selectedBus={selectedBus}
          onSelectBus={(bus) => setSelectedBus(bus)}
        />

        {/* Section 05: AI Defence */}
        <AiDefenceOverlay
          selectedAiModel={selectedAiModel}
          onSelectAiModel={(model) => setSelectedAiModel(model)}
        />

        {/* Section 06 & 07: Self-Healing & Closed-Loop */}
        <SelfHealingOverlay
          isHealed={isHealed}
          onTriggerHeal={() => {
            setIsHealed(true);
            setAttackMode('none');
          }}
          onReset={() => {
            setIsHealed(false);
            setAttackMode('none');
          }}
        />

        {/* Section 08: Results & Validation */}
        <ResultsOverlay />

        {/* Section 09 & 10: Final Statement & Live Dashboard Link */}
        <FinalOverlay />

      </main>

    </div>
  );
}

export default App;
