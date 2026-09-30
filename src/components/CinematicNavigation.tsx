import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { PROJECT_INFO_V2 } from '../data';
import { scrollToProgress } from '../hooks/useSmoothScroll';

export interface ChapterDef {
  id: number;
  code: string;
  shortTitle: string;
  fullTitle: string;
  targetProgress: number;
  min: number;
  max: number;
}

export const CHAPTERS: ChapterDef[] = [
  { id: 1, code: '01', shortTitle: 'INTRO', fullTitle: '01 // INTRODUCTION', targetProgress: 0.02, min: 0.00, max: 0.12 },
  { id: 2, code: '02', shortTitle: 'GRID', fullTitle: '02 // IEEE 39-BUS TWIN', targetProgress: 0.16, min: 0.12, max: 0.24 },
  { id: 3, code: '03', shortTitle: 'THREAT', fullTitle: '03 // ADVERSARIAL THREAT', targetProgress: 0.28, min: 0.24, max: 0.35 },
  { id: 4, code: '04', shortTitle: 'ATTACKS', fullTitle: '04 // ATTACK VECTORS', targetProgress: 0.40, min: 0.35, max: 0.48 },
  { id: 5, code: '05', shortTitle: 'SCADA', fullTitle: '05 // SCADA TELEMETRY', targetProgress: 0.52, min: 0.48, max: 0.60 },
  { id: 6, code: '06', shortTitle: 'AI DEFENCE', fullTitle: '06 // AI DEFENCE ASSEMBLY', targetProgress: 0.65, min: 0.60, max: 0.72 },
  { id: 7, code: '07', shortTitle: 'HEALING', fullTitle: '07 // AUTONOMOUS HEALING', targetProgress: 0.77, min: 0.72, max: 0.83 },
  { id: 8, code: '08', shortTitle: 'RESULTS', fullTitle: '08 // EMPIRICAL VALIDATION', targetProgress: 0.87, min: 0.83, max: 0.93 },
  { id: 9, code: '09', shortTitle: 'SECURED', fullTitle: '09 // SYSTEM SECURED', targetProgress: 0.96, min: 0.93, max: 1.00 },
];

interface CinematicNavigationProps {
  progress: number;
}

export const CinematicNavigation: React.FC<CinematicNavigationProps> = ({ progress }) => {
  // Find active chapter based on current scroll progress
  const activeChapter = CHAPTERS.find(c => progress >= c.min && progress < c.max) || CHAPTERS[CHAPTERS.length - 1];
  const percent = Math.min(100, Math.round(progress * 100));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 pointer-events-none transition-all">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
        
        {/* Top Bar: Brand, Current Scene, Live Dashboard */}
        <div className="flex items-center justify-between pointer-events-auto">
          
          {/* Brand Kicker */}
          <div 
            onClick={() => scrollToProgress(0)}
            className="flex items-center gap-3 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-800 text-xs font-mono cursor-pointer hover:border-blue-500/50 transition-colors shadow-lg"
          >
            <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tight">PYPY</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider -mt-0.5">
                CYBERSECURITY SMART GRID
              </span>
            </div>
          </div>

          {/* Active Chapter HUD */}
          <div className="hidden md:flex items-center gap-3 bg-black/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800 text-xs font-mono text-slate-300 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-bold text-white tracking-wider">{activeChapter.fullTitle}</span>
            <span className="text-slate-700">|</span>
            <span className="text-blue-400 font-bold">{percent}% TIMELINE</span>
          </div>

          {/* Live Dashboard Button */}
          <a
            href={PROJECT_INFO_V2.liveDashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/40 flex items-center gap-2 shadow-lg transition-all group pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">LIVE DASHBOARD</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>

        </div>

        {/* Floating Chapter Jump Bar: 01 to 09 */}
        <div className="flex items-center justify-center pointer-events-auto">
          <div className="flex items-center gap-1 sm:gap-1.5 bg-black/80 backdrop-blur-xl px-2.5 sm:px-3.5 py-1.5 rounded-full border border-slate-800/90 shadow-2xl">
            {CHAPTERS.map((chap) => {
              const isActive = activeChapter.id === chap.id;
              return (
                <button
                  key={chap.id}
                  onClick={() => scrollToProgress(chap.targetProgress)}
                  title={`${chap.code}: ${chap.fullTitle}`}
                  className={`group relative px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(0,113,227,0.6)] scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{chap.code}</span>
                  <span className="hidden xl:inline ml-1 font-normal opacity-85 text-[10px]">
                    {chap.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </header>
  );
};
