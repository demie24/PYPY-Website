import React, { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { CinematicGridCanvas } from './components/3d/CinematicGridCanvas';
import { CinematicMotionOverlays } from './components/overlays/CinematicMotionOverlays';
import { CinematicNavigation } from './components/CinematicNavigation';
import { Bus3D } from './data';

export function App() {
  const { progress } = useSmoothScroll();
  const [selectedBus, setSelectedBus] = useState<Bus3D | null>(null);

  return (
    <div className="relative bg-[#06090f] text-white selection:bg-blue-600 selection:text-white font-sans">
      
      {/* Fixed Fullscreen Motion Viewport */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden z-20 pointer-events-none">
        
        {/* Layer 1: 3D Interactive WebGL Digital Twin & Cinematic Camera */}
        <CinematicGridCanvas
          progress={progress}
          selectedBus={selectedBus}
          onSelectBus={setSelectedBus}
        />

        {/* Layer 2: Motion Design Typography & Storytelling Overlays */}
        <CinematicMotionOverlays
          progress={progress}
          selectedBus={selectedBus}
          onSelectBus={setSelectedBus}
        />

        {/* Layer 3: Minimal Cinematic Navigation & Chapter HUD */}
        <CinematicNavigation progress={progress} />

        {/* Bottom Fine Progress Line (Apple Style) */}
        <div className="fixed bottom-0 left-0 right-0 h-[2px] bg-slate-800/60 z-50 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-red-500 transition-all duration-75"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

      </div>

      {/* Virtual Scroll Height Track Driving the Timeline (900vh = 100vh per scene) */}
      <div className="relative w-full h-[900vh] -z-10 pointer-events-none" />

    </div>
  );
}

export default App;
