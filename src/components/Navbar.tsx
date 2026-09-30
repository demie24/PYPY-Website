import React from 'react';
import { 
  ShieldCheck, 
  Presentation, 
  ExternalLink, 
  Activity, 
  Cpu, 
  BarChart3, 
  GitBranch, 
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { PROJECT_INFO } from '../data';

interface NavbarProps {
  currentTab: 'dashboard' | 'flow' | 'models' | 'metrics';
  setCurrentTab: (tab: 'dashboard' | 'flow' | 'models' | 'metrics') => void;
  onOpenSlideMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSlideMode
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#dce9ef] shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Authentic PYPY Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentTab('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#167b83] to-[#20b89d] flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-[#17324d]">
                  PYPY Grid
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#dff7f4] text-[#16858a] border border-[#afe5ef]">
                  FYP UniMAP
                </span>
              </div>
              <p className="text-[10px] font-medium text-[#668096] hidden sm:block">
                Cyber-Physical Immune System for Smart Grid
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Dashboard Aesthetic) */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-[#17324d] text-white shadow-sm'
                  : 'text-[#557187] hover:bg-[#edf8f8] hover:text-[#167b83]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Operasi</span>
            </button>

            <button
              onClick={() => setCurrentTab('flow')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                currentTab === 'flow'
                  ? 'bg-[#17324d] text-white shadow-sm'
                  : 'text-[#557187] hover:bg-[#edf8f8] hover:text-[#167b83]'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              <span>Aliran Pertahanan</span>
            </button>

            <button
              onClick={() => setCurrentTab('models')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                currentTab === 'models'
                  ? 'bg-[#17324d] text-white shadow-sm'
                  : 'text-[#557187] hover:bg-[#edf8f8] hover:text-[#167b83]'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Enjin AI & Fizik</span>
            </button>

            <button
              onClick={() => setCurrentTab('metrics')}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                currentTab === 'metrics'
                  ? 'bg-[#17324d] text-white shadow-sm'
                  : 'text-[#557187] hover:bg-[#edf8f8] hover:text-[#167b83]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Keputusan Bab 4</span>
            </button>

          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Viva Presentation Slaid Button */}
            <button
              onClick={onOpenSlideMode}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all bg-gradient-to-r from-[#167b83] to-[#20b89d] text-white shadow-sm hover:opacity-95 hover:scale-105 active:scale-95"
            >
              <Presentation className="w-4 h-4" />
              <span>Mod Slaid Viva</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" />
            </button>

            {/* Direct Link to Live Dashboard Container */}
            <a
              href={PROJECT_INFO.liveDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border border-[#d6eaeb] bg-white text-[#17324d] hover:bg-[#f1f8fa]"
            >
              <span>OPEN DASHBOARD</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#16858a]" />
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};
