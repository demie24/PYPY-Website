import React from 'react';
import { ShieldCheck, ExternalLink, ArrowRight } from 'lucide-react';
import { PROJECT_INFO_V2 } from '../data';

interface NavigationV2Props {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

export const NavigationV2: React.FC<NavigationV2Props> = ({ currentSection, onNavigate }) => {
  const navSections = [
    { id: 'hero', label: '01 / OVERVIEW' },
    { id: 'problem', label: '02 / THREAT' },
    { id: 'attacks', label: '03 / ATTACKS' },
    { id: 'digital-twin', label: '04 / DIGITAL TWIN' },
    { id: 'ai-defence', label: '05 / AI DEFENCE' },
    { id: 'self-healing', label: '06 / SELF-HEALING' },
    { id: 'results', label: '07 / RESULTS' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 pointer-events-none transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Brand: PYPY CYBERSECURITY SMART GRID */}
        <div 
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3 cursor-pointer group bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-black text-sm tracking-tight text-slate-900">PYPY</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-50 text-blue-600 font-semibold border border-blue-200/60">
                3D TWIN
              </span>
            </div>
            <span className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase -mt-0.5">
              CYBERSECURITY SMART GRID
            </span>
          </div>
        </div>

        {/* Apple-style Navigation Pills (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm">
          {navSections.map((sec) => {
            const isActive = currentSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onNavigate(sec.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-200/80 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </nav>

        {/* Live Dashboard Button */}
        <a
          href={PROJECT_INFO_V2.liveDashboardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white btn-pypy-primary flex items-center gap-2 group shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">OPEN LIVE DASHBOARD</span>
          <span className="sm:hidden">DASHBOARD</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </a>

      </div>
    </header>
  );
};
