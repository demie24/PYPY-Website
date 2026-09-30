import React from 'react';
import { 
  ShieldCheck, 
  Presentation, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PROJECT_INFO } from '../data';

interface AppleHeroProps {
  onOpenKeynote: () => void;
  onExploreTopology: () => void;
}

export const AppleHero: React.FC<AppleHeroProps> = ({ onOpenKeynote, onExploreTopology }) => {
  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Style Top Eyebrow Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#f5f5f7] border border-black/[0.04] text-[#1d1d1f] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span>{PROJECT_INFO.institution} • Final Year Project 2026</span>
          </span>
        </motion.div>

        {/* Apple Keynote Massive Typography */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1d1d1f] leading-[1.08]"
          >
            PYPY Smart Grid. <br />
            <span className="apple-gradient-vibrant">Kecerdasan Siber-Fizikal.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-2xl text-[#86868b] max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Sistem imun AI pelbagai lapisan berasaskan Digital Twin IEEE 39-Bus yang menggabungkan pengesanan siri masa, topologi graf, hukum analitikal Kirchhoff, dan pintu kelulusan keselamatan berautonomi.
          </motion.p>

          {/* Action CTAs (Apple Pill Buttons) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={onOpenKeynote}
              className="apple-button-primary text-sm sm:text-base !py-3.5 !px-7 shadow-lg shadow-blue-500/20"
            >
              <Presentation className="w-5 h-5 text-amber-300" />
              <span>Buka Mod Slaid Viva</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onExploreTopology}
              className="apple-button-secondary text-sm sm:text-base !py-3.5 !px-7"
            >
              <Activity className="w-5 h-5 text-[#0071e3]" />
              <span>Terokai Topologi IEEE-39</span>
            </button>
          </motion.div>
        </div>

        {/* Apple Bento Grid 4 Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          
          <div className="apple-card p-7 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center mb-6">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
                100.0%
              </div>
              <div className="text-xs font-bold text-[#0071e3] uppercase tracking-wider mt-1">
                AC Solver Convergence
              </div>
              <p className="text-xs text-[#86868b] mt-2.5 leading-relaxed">
                Penyelesai aliran kuasa AC Newton-Raphson mencapai kestabilan penuh pada kesemua 39 bas dan 46 talian.
              </p>
            </div>
          </div>

          <div className="apple-card p-7 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#10b981]/10 text-[#10b981] flex items-center justify-center mb-6">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
                0.0%
              </div>
              <div className="text-xs font-bold text-[#10b981] uppercase tracking-wider mt-1">
                Data Leakage Overlap
              </div>
              <p className="text-xs text-[#86868b] mt-2.5 leading-relaxed">
                Algoritma partisi blok label kronologi membasmi 99.48% kebocoran data tersembunyi berbanding kaedah rawak biasa.
              </p>
            </div>
          </div>

          <div className="apple-card p-7 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center mb-6">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
                13.47 ms
              </div>
              <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-wider mt-1">
                Sandbox Dry-Run Speed
              </div>
              <p className="text-xs text-[#86868b] mt-2.5 leading-relaxed">
                Simulasi keselamatan aliran kuasa pantas mengesahkan kestabilan grid sebelum pemutus litar fizikal digerakkan.
              </p>
            </div>
          </div>

          <div className="apple-card p-7 flex flex-col justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center mb-6">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
                13.33%
              </div>
              <div className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider mt-1">
                Blackout Under Stress
              </div>
              <p className="text-xs text-[#86868b] mt-2.5 leading-relaxed">
                Kadar pemadaman ditekan secara drastik dalam ujian penilaian dwi-arah patogen-imun adversarial.
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
