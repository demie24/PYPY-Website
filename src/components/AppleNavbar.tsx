import React from 'react';
import { ShieldCheck, Presentation, ExternalLink, Sparkles, LayoutGrid, Cpu, BarChart3, GitBranch } from 'lucide-react';
import { PROJECT_INFO } from '../data';

interface AppleNavbarProps {
  currentTab: 'overview' | 'topology' | 'flow' | 'models' | 'metrics';
  setCurrentTab: (tab: 'overview' | 'topology' | 'flow' | 'models' | 'metrics') => void;
  onOpenKeynote: () => void;
}

export const AppleNavbar: React.FC<AppleNavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenKeynote
}) => {
  return (
    <header className="sticky top-0 z-50 apple-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => setCurrentTab('overview')}
          >
            <div className="w-8 h-8 rounded-xl bg-[#0071e3] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#1d1d1f]">
                PYPY
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-[#0071e3]/10 text-[#0071e3]">
                FYP UniMAP
              </span>
            </div>
          </div>

          {/* Navigation Links (Apple Clean Segmented Control) */}
          <nav className="hidden md:flex items-center space-x-1 p-1 bg-[#f5f5f7] rounded-full border border-black/[0.04]">
            <button
              onClick={() => setCurrentTab('overview')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                currentTab === 'overview'
                  ? 'bg-white text-[#1d1d1f] shadow-sm'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              Pengenalan
            </button>

            <button
              onClick={() => setCurrentTab('topology')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                currentTab === 'topology'
                  ? 'bg-white text-[#1d1d1f] shadow-sm'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              Topologi IEEE-39
            </button>

            <button
              onClick={() => setCurrentTab('flow')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                currentTab === 'flow'
                  ? 'bg-white text-[#1d1d1f] shadow-sm'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              Aliran Gelung
            </button>

            <button
              onClick={() => setCurrentTab('models')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                currentTab === 'models'
                  ? 'bg-white text-[#1d1d1f] shadow-sm'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              Enjin AI
            </button>

            <button
              onClick={() => setCurrentTab('metrics')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                currentTab === 'metrics'
                  ? 'bg-white text-[#1d1d1f] shadow-sm'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              Keputusan Bab 4
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Apple Keynote Viva Presentation Button */}
            <button
              onClick={onOpenKeynote}
              className="apple-button-primary text-xs !py-2 !px-4"
            >
              <Presentation className="w-3.5 h-3.5 text-amber-300" />
              <span>Mod Slaid Viva</span>
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            </button>

            {/* Link to Real Dashboard Container */}
            <a
              href={PROJECT_INFO.liveDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button-secondary text-xs !py-2 !px-3.5 hidden sm:inline-flex"
            >
              <span>Port 3001</span>
              <ExternalLink className="w-3 h-3 text-[#86868b]" />
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};
