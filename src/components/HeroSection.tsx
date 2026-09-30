import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  Zap, 
  Activity, 
  CircuitBoard, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { IEEE39_BUSES, IEEE39_LINES } from '../data';

interface HeroSectionProps {
  onExplore: () => void;
  onWatchDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onWatchDemo }) => {
  // Subset of lines for hero visual elegance
  const heroLines = IEEE39_LINES.slice(0, 32);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#fbfbfd] via-[#f7f9fc] to-[#fbfbfd] pt-8 pb-16">
      
      {/* Background Interactive IEEE 39-Bus Mesh Visualization */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 sm:opacity-50 overflow-hidden flex items-center justify-center">
        <svg 
          viewBox="0 0 2000 980" 
          className="w-full h-full max-w-[1700px] scale-105 sm:scale-100 select-none transition-transform duration-1000"
        >
          <defs>
            <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0071e3" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0071e3" stopOpacity="0" />
            </radialGradient>
            <pattern id="hero-dot-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#d2d2d7" opacity="0.6" />
            </pattern>
          </defs>

          <rect width="2000" height="980" fill="url(#hero-dot-grid)" />
          <circle cx="1000" cy="490" r="800" fill="url(#hero-glow)" />

          {/* Connected Network Transmission Lines with Animated Pulses */}
          {heroLines.map((line) => {
            const from = IEEE39_BUSES[line.from];
            const to = IEEE39_BUSES[line.to];
            if (!from || !to) return null;

            return (
              <g key={line.id}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className="apple-topology-flow"
                  opacity="0.8"
                />
              </g>
            );
          })}

          {/* Network Bus Nodes with Soft Glowing Halos */}
          {Object.values(IEEE39_BUSES).map((bus) => (
            <g key={bus.id} transform={`translate(${bus.x} ${bus.y})`}>
              <circle r="12" fill="#0071e3" opacity="0.1" className="animate-pulse" />
              <circle 
                r={bus.isGen ? 7 : 5} 
                fill={bus.isGen ? "#0071e3" : "#10b981"} 
                stroke="#ffffff" 
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Floating System Status Cards (Required) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] shadow-sm text-xs font-bold text-[#1d1d1f]"
          >
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span>SYSTEM ONLINE</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] shadow-sm text-xs font-bold text-[#0071e3]"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>DIGITAL TWIN ACTIVE</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] shadow-sm text-xs font-bold text-[#8b5cf6]"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AI DEFENCE READY</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] shadow-sm text-xs font-bold text-[#06b6d4]"
          >
            <CircuitBoard className="w-3.5 h-3.5" />
            <span>39 IEEE BUSES</span>
          </motion.div>

        </div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-2 mb-6"
        >
          <div className="inline-block">
            <span className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#0071e3] drop-shadow-sm">
              PYPY
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1d1d1f] uppercase leading-tight">
            PROTECT YOUR POWER. <br />
            <span className="apple-gradient-vibrant">PROTECT YOURSELF.</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-lg font-bold tracking-widest uppercase text-[#86868b] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          AI-DRIVEN CYBER-PHYSICAL DEFENCE <br className="hidden sm:inline" />
          FOR SMART GRID DIGITAL TWIN
        </motion.p>

        {/* Buttons: EXPLORE PYPY & WATCH DEMO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onExplore}
            className="apple-button-primary text-sm sm:text-base !py-4 !px-8 shadow-xl shadow-blue-500/20"
          >
            <span>EXPLORE PYPY</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onWatchDemo}
            className="apple-button-secondary text-sm sm:text-base !py-4 !px-8 bg-white/90 backdrop-blur-sm"
          >
            <Play className="w-4 h-4 text-[#0071e3] fill-[#0071e3]" />
            <span>RUN SIMULATION</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
