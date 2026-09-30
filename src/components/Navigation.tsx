import React, { useState, useEffect } from 'react';
import { ShieldCheck, ExternalLink, Presentation, Sparkles, ArrowRight } from 'lucide-react';
import { PROJECT_INFO } from '../data';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenKeynote: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  onOpenKeynote
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'SYSTEM' },
    { id: 'problem', label: 'THREATS' },
    { id: 'architecture', label: 'HOW IT WORKS' },
    { id: 'digital-twin', label: 'DIGITAL TWIN' },
    { id: 'simulation', label: 'SIMULATION' },
    { id: 'ai-defence', label: 'AI DEFENCE' },
    { id: 'results', label: 'RESULTS' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'apple-glass shadow-sm py-2.5' 
        : 'bg-white/70 backdrop-blur-md py-3.5 border-b border-black/[0.04]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => onNavigate('hero')}
          >
            <div className="w-8 h-8 rounded-xl bg-[#0071e3] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-lg font-black tracking-tight text-[#1d1d1f]">
                PYPY
              </span>
              <span className="text-[10px] font-bold tracking-wider text-[#86868b] uppercase">
                Grid
              </span>
            </div>
          </div>

          {/* Navigation Links (Apple Clean Segmented Text) */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 bg-[#f5f5f7] rounded-full border border-black/[0.04]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#0071e3] shadow-sm'
                      : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Slaid Viva & Open Dashboard */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenKeynote}
              className="apple-button-secondary text-xs !py-1.5 !px-3.5 flex items-center gap-1.5"
            >
              <Presentation className="w-3.5 h-3.5 text-[#0071e3]" />
              <span className="hidden sm:inline">Mod Slaid Viva</span>
              <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            </button>

            <a
              href={PROJECT_INFO.liveDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button-primary text-xs !py-1.5 !px-4 flex items-center gap-1.5 shadow-sm"
            >
              <span>OPEN DASHBOARD</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
