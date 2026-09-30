import React, { useState } from 'react';
import { 
  GitMerge, 
  ShieldAlert, 
  Scale, 
  UserCheck, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  Clock,
  Layers,
  AlertTriangle,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DecisionSelfHealingSection: React.FC = () => {
  const [activeLoopStep, setActiveLoopStep] = useState<number>(3); // default at stabilized green

  const loopSteps = [
    {
      step: 0,
      title: "THREAT DETECTED",
      colorName: "RED",
      badge: "Infiltration Trigger",
      bgClass: "from-red-500/10 via-white to-white",
      borderColor: "border-red-500",
      accentText: "text-red-600",
      pillBg: "bg-red-500 text-white",
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      gridState: "Kritikal (Serangan Aktif)",
      voltagePU: "0.882 p.u. (DEVIASI)",
      description: "Anomali dikesan serentak oleh model Bi-LSTM dan GNN pada telemetri bus. Isyarat amaran 'GRID_DEVIATION' diterbitkan ke broker MQTT.",
      safetyPrinciple: "Pengasingan awal isyarat untuk mengelakkan pencemaran data ke bahagian grid lain."
    },
    {
      step: 1,
      title: "THREAT SCORING",
      colorName: "AMBER",
      badge: "Physics Validation",
      bgClass: "from-amber-500/10 via-white to-white",
      borderColor: "border-amber-500",
      accentText: "text-amber-600",
      pillBg: "bg-amber-500 text-white",
      icon: <Scale className="w-5 h-5 text-amber-500" />,
      gridState: "Penilaian (Physics Residues)",
      voltagePU: "Residual = 0.042 (> Ambang)",
      description: "Enjin PINN mengira baki ketidaksamaan fizik mengikut KCL/KVL dan TRUST Engine menetapkan skor keyakinan sensor Bus 5 turun ke 0.12.",
      safetyPrinciple: "Menolak amaran palsu yang diakibatkan oleh perubahan beban biasa berbanding serangan terancang."
    },
    {
      step: 2,
      title: "OPERATOR VETO / APPROVAL",
      colorName: "BLUE",
      badge: "Dual RL Consensus",
      bgClass: "from-blue-500/10 via-white to-white",
      borderColor: "border-[#0071e3]",
      accentText: "text-[#0071e3]",
      pillBg: "bg-[#0071e3] text-white",
      icon: <UserCheck className="w-5 h-5 text-[#0071e3]" />,
      gridState: "Sandbox Testing (13.47 ms)",
      voltagePU: "AC Power Flow Simulated",
      description: "Konsensus PPO + DQN mencadangkan penutupan semula talian. Pelan diuji dalam AC Restoration Sandbox (13.47 ms) sebelum veto operator.",
      safetyPrinciple: "Tiada tindakan fizikal dihantar ke pemutus litar sebelum simulasi AC membuktikan konvergens sifar risiko blackout."
    },
    {
      step: 3,
      title: "GRID STABILIZED",
      colorName: "GREEN",
      badge: "Self-Healing Complete",
      bgClass: "from-emerald-500/10 via-white to-white",
      borderColor: "border-emerald-500",
      accentText: "text-emerald-600",
      pillBg: "bg-emerald-500 text-white",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      gridState: "GRID SECURED (Nominal)",
      voltagePU: "1.005 p.u. (STABIL)",
      description: "Arahan diluluskan dilaksanakan. Sistem imun menguatkuasakan tempoh bertenang 5.2s bagi menyekat serangan berulang. Grid disahkan stabil 100%.",
      safetyPrinciple: "Keadaan voltan dan frekuensi kembali berada di antara 0.95 p.u. dan 1.05 p.u. tanpa sebarang blackout."
    }
  ];

  const current = loopSteps[activeLoopStep];

  return (
    <section id="decision" className="py-24 sm:py-32 bg-white border-t border-black/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 mb-4"
          >
            <GitMerge className="w-3.5 h-3.5" />
            <span>Gelung Keputusan Siber-Fizikal (Cyber-Physical Feedback Loop)</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight uppercase"
          >
            Membuat Keputusan & Pemulihan Kendiri.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#86868b] leading-relaxed font-normal"
          >
            PYPY bukan sekadar mengesan anomali; ia mengorkestrasi pemulihan fizikal secara automatik dengan sokongan simulasi maya berketepatan tinggi.
          </motion.p>
        </div>

        {/* Visual Color Transition Flow: RED -> AMBER -> BLUE -> GREEN */}
        <div className="mb-10">
          <div className="text-center text-xs font-extrabold uppercase tracking-widest text-[#86868b] mb-4">
            Peralihan Status Grid Fizikal:
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {loopSteps.map((step) => {
              const isSelected = activeLoopStep === step.step;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveLoopStep(step.step)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 relative flex flex-col justify-between ${
                    isSelected 
                      ? `${step.borderColor} shadow-xl scale-[1.03] bg-white ring-2 ring-black/[0.05]` 
                      : 'bg-[#f5f5f7] border-black/[0.04] hover:bg-white hover:border-black/[0.08]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${step.pillBg}`}>
                      {step.colorName}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#86868b]">
                      0{step.step + 1}
                    </span>
                  </div>

                  <div>
                    <h4 className={`text-xs sm:text-sm font-black tracking-tight mb-1 ${
                      isSelected ? step.accentText : 'text-[#1d1d1f]'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-[#86868b] font-medium">
                      {step.badge}
                    </p>
                  </div>

                  {isSelected && (
                    <motion.div 
                      layoutId="loop-indicator"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#0071e3] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Deep Feedback Loop Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className={`apple-card p-6 sm:p-10 bg-gradient-to-br ${current.bgClass} border-2 ${current.borderColor} shadow-2xl relative overflow-hidden`}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${current.pillBg}`}>
                    Fasa {current.step + 1}: {current.title}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#86868b]">
                    Status: {current.gridState}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">
                  {current.badge}
                </h3>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
                <span className="text-xs text-[#86868b] font-semibold">Bacaan Telemetri:</span>
                <span className={`text-xs font-mono font-black ${current.accentText}`}>
                  {current.voltagePU}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
              
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#86868b] mb-1.5">
                    Proses Di Sebalik Tabir:
                  </h4>
                  <p className="text-base text-[#1d1d1f] font-normal leading-relaxed">
                    {current.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-black/[0.06]">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0071e3] mb-1">
                    Prinsip Keselamatan Siber-Fizikal:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
                    {current.safetyPrinciple}
                  </p>
                </div>
              </div>

              {/* Two Critical Innovation Cards (Sandbox & Cooldown) */}
              <div className="lg:col-span-5 space-y-3">
                
                <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0071e3] mb-1">
                    <Clock className="w-4 h-4" />
                    <span>AC Restoration Sandbox (13.47 ms)</span>
                  </div>
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    Simulasi aliran kuasa Newton-Raphson dijalankan dalam peti pasir sebelum memetik pemutus litar sebenar. Menolak cadangan yang berisiko trip.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-600 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Tempoh Bertenang 5.2s (Anti-Hunting)</span>
                  </div>
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    Menghalang penyerang daripada menghantar arahan buka-tutup berulang kali yang boleh merosakkan pemutus litar mekanikal pencawang.
                  </p>
                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
