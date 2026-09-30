import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { PROJECT_INFO_V2 } from '../../data';

interface HeroOverlayProps {
  onExplore?: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({ onExplore }) => {
  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col justify-between items-center text-center px-6 sm:px-12 py-24 sm:py-28 pointer-events-none select-none"
    >
      {/* Top Kicker: Brand & Digital Twin Metadata */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-3 pt-4 sm:pt-6"
      >
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-[11px] font-mono tracking-widest text-slate-700 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="font-bold text-slate-900">{PROJECT_INFO_V2.title}</span>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-600 uppercase">{PROJECT_INFO_V2.descriptor}</span>
          <span className="text-slate-300">•</span>
          <span className="text-blue-600 font-bold">IEEE 39-BUS</span>
        </div>
      </motion.div>

      {/* Main Central Typography: Big, Confident, Editorial */}
      <div className="my-auto max-w-5xl mx-auto space-y-6 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 sm:space-y-2"
        >
          {/* First Phrase */}
          <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-sans font-black tracking-tight leading-[0.92]">
            <span className="text-slate-900 block">PROTECT YOUR</span>
            <span className="text-blue-600 block">POWER.</span>
          </div>

          {/* Second Phrase */}
          <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-sans font-black tracking-tight leading-[0.92] pt-2 sm:pt-4">
            <span className="text-slate-900 block">PROTECT</span>
            <span className="text-blue-600 block">YOURSELF.</span>
          </div>
        </motion.div>

        {/* Project Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="text-xs sm:text-sm md:text-base font-mono font-semibold text-slate-500 uppercase tracking-widest max-w-2xl mx-auto pt-2 leading-relaxed"
        >
          {PROJECT_INFO_V2.subtitle}
        </motion.p>
      </div>

      {/* Bottom Minimal Cue */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        onClick={onExplore}
        className="pointer-events-auto cursor-pointer flex flex-col items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors group pb-2"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase font-semibold">
          SCROLL TO EXPLORE STORY
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-slate-400 group-hover:text-blue-600 transition-colors" />
      </motion.div>
    </section>
  );
};
