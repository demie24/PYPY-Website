import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  Presentation, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PROJECT_INFO, IEEE39_BUSES, IEEE39_LINES } from '../data';

interface FinalConclusionSectionProps {
  onOpenKeynote: () => void;
  onOpenReport?: () => void;
}

export const FinalConclusionSection: React.FC<FinalConclusionSectionProps> = ({
  onOpenKeynote,
  onOpenReport
}) => {
  const stableLines = IEEE39_LINES.slice(0, 36);

  return (
    <section id="conclusion" className="relative py-28 sm:py-36 bg-gradient-to-b from-[#fbfbfd] via-[#f0fdf4]/40 to-[#fbfbfd] border-t border-black/[0.04] overflow-hidden">
      
      {/* Background Stable Green IEEE-39 Topology Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25 overflow-hidden flex items-center justify-center">
        <svg 
          viewBox="0 0 2000 980" 
          className="w-full h-full max-w-[1700px] select-none"
        >
          <defs>
            <radialGradient id="stable-green-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="1000" cy="490" r="700" fill="url(#stable-green-glow)" />

          {/* Green Stable Transmission Lines */}
          {stableLines.map((line) => {
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
                  stroke="#a7f3d0"
                  strokeWidth="1.5"
                />
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className="apple-topology-flow"
                  opacity="0.6"
                />
              </g>
            );
          })}

          {/* Stable Green Nodes */}
          {Object.values(IEEE39_BUSES).map((bus) => (
            <g key={bus.id} transform={`translate(${bus.x} ${bus.y})`}>
              <circle r="14" fill="#10b981" opacity="0.15" />
              <circle 
                r={bus.isGen ? 7 : 5} 
                fill="#10b981" 
                stroke="#ffffff" 
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-sm text-xs font-bold text-emerald-700 mb-8"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>GRID STABLE • SYSTEM IMMUNITY ACTIVE</span>
        </motion.div>

        {/* Large Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3 mb-6"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] tracking-tight uppercase leading-tight">
            PYPY DOESN'T JUST DETECT ATTACKS.
          </h2>

          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0071e3] via-[#06b6d4] to-[#10b981] tracking-tight uppercase leading-tight">
            IT HELPS THE GRID RESPOND.
          </h3>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base sm:text-xl font-normal text-[#86868b] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A smarter, safer and more resilient approach <br className="hidden sm:inline" />
          to cyber-physical smart grid defence.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href={PROJECT_INFO.liveDashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-button-primary text-sm sm:text-base !py-4 !px-8 shadow-xl shadow-blue-500/20 flex items-center gap-2"
          >
            <span>LAUNCH PYPY DASHBOARD</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>

          <button
            onClick={onOpenKeynote}
            className="apple-button-secondary text-sm sm:text-base !py-4 !px-8 bg-white/95 backdrop-blur-md flex items-center gap-2"
          >
            <Presentation className="w-4 h-4 text-[#0071e3]" />
            <span>MOD SLAID VIVA</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          </button>
        </motion.div>

        {/* Academic Presentation Footer Meta */}
        <div className="pt-8 border-t border-black/[0.06] w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#86868b] gap-4">
          <div className="text-left">
            <span className="font-bold text-[#1d1d1f] block">{PROJECT_INFO.institution}</span>
            <span>{PROJECT_INFO.faculty} • Sesi {PROJECT_INFO.academicYear}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-medium">
            <span className="px-3 py-1 rounded-full bg-white border border-black/[0.04]">
              Calon: {PROJECT_INFO.author}
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-black/[0.04] text-[#0071e3]">
              FYP Showcase Edition
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
