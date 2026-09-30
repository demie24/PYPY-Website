import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { DigitalTwinSection } from './components/DigitalTwinSection';
import { AttackSimulationSection } from './components/AttackSimulationSection';
import { AiDetectionSection } from './components/AiDetectionSection';
import { DecisionSelfHealingSection } from './components/DecisionSelfHealingSection';
import { ResultsSection } from './components/ResultsSection';
import { FinalConclusionSection } from './components/FinalConclusionSection';
import { AppleKeynoteModal } from './components/AppleKeynoteModal';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isKeynoteOpen, setIsKeynoteOpen] = useState<boolean>(false);

  // Smooth scroll to section
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll listener to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'hero',
        'problem',
        'architecture',
        'digital-twin',
        'simulation',
        'ai-defence',
        'decision',
        'results',
        'conclusion'
      ];

      const scrollPosition = window.scrollY + 280;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          if (scrollPosition >= el.offsetTop) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#fbfbfd] text-[#1d1d1f] min-h-screen flex flex-col justify-between selection:bg-[#0071e3] selection:text-white font-sans antialiased">
      
      {/* Apple Minimal Sticky Navigation */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenKeynote={() => setIsKeynoteOpen(true)}
      />

      {/* Main Interactive Storytelling Flow */}
      <main className="flex-1">
        
        {/* 1. Hero Introduction */}
        <HeroSection
          onExplore={() => handleNavigate('problem')}
          onWatchDemo={() => handleNavigate('simulation')}
        />

        {/* 2. The Problem: Cyber Attacks & False Telemetry Chain */}
        <ProblemSection />

        {/* 3. PYPY Architecture: MONITOR -> DETECT -> VALIDATE -> DECIDE -> RECOVER */}
        <ArchitectureSection />

        {/* 4. Digital Twin: Full-width Interactive IEEE 39-Bus Topology */}
        <DigitalTwinSection />

        {/* 5. Cyber Attack Simulation Sandbox: FDIA, Breaker, Load */}
        <AttackSimulationSection />

        {/* 6. AI Detection: LSTM, GNN, PINN, ST-GNN & 98.7% Confidence */}
        <AiDetectionSection />

        {/* 7. Decision & Self-Healing: Feedback Loop & RED -> AMBER -> BLUE -> GREEN */}
        <DecisionSelfHealingSection />

        {/* 8. Results: Large Animated Metrics & Chapter 4 Benchmarks */}
        <ResultsSection />

        {/* 9. Final Conclusion: Statement & Action Buttons */}
        <FinalConclusionSection
          onOpenKeynote={() => setIsKeynoteOpen(true)}
        />

      </main>

      {/* Presentation Viva Slide Deck Modal */}
      {isKeynoteOpen && (
        <AppleKeynoteModal onClose={() => setIsKeynoteOpen(false)} />
      )}

    </div>
  );
}

export default App;
