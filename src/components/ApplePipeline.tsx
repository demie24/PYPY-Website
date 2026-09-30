import React, { useState } from 'react';
import { 
  GitBranch, 
  ShieldAlert, 
  Cpu, 
  Scale, 
  Workflow, 
  ShieldCheck, 
  AlertTriangle, 
  Radio, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FLOW_STEPS } from '../data';

export const ApplePipeline: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = FLOW_STEPS[activeStepIdx];

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Apple Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8b5cf6]/10 text-[#8b5cf6] mb-3">
          <GitBranch className="w-3.5 h-3.5" />
          <span>Gelung Tertutup (Closed-Loop Defense Pipeline)</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">
          Aliran Pertahanan Gelung Tertutup.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#86868b]">
          Bagaimana data telemetri ditapis, diuji secara fizik, dan diluluskan secara selamat sebelum sebarang pemutus litar fizikal digerakkan.
        </p>
      </div>

      {/* Horizontal Apple Segmented Steps Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {FLOW_STEPS.map((step, idx) => {
          const isSelected = idx === activeStepIdx;
          return (
            <button
              key={step.step}
              onClick={() => setActiveStepIdx(idx)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#0071e3] shadow-lg shadow-blue-500/10 scale-[1.03]'
                  : 'bg-[#f5f5f7] border-black/[0.04] hover:bg-white hover:border-black/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-[#0071e3] text-white' : 'bg-black/[0.06] text-[#86868b]'
                }`}>
                  Langkah 0{step.step}
                </span>
                {idx === 0 && <ShieldAlert className={`w-4 h-4 ${isSelected ? 'text-[#0071e3]' : 'text-[#86868b]'}`} />}
                {idx === 1 && <Cpu className={`w-4 h-4 ${isSelected ? 'text-[#0071e3]' : 'text-[#86868b]'}`} />}
                {idx === 2 && <Scale className={`w-4 h-4 ${isSelected ? 'text-[#0071e3]' : 'text-[#86868b]'}`} />}
                {idx === 3 && <Workflow className={`w-4 h-4 ${isSelected ? 'text-[#0071e3]' : 'text-[#86868b]'}`} />}
                {idx === 4 && <AlertTriangle className={`w-4 h-4 ${isSelected ? 'text-[#0071e3]' : 'text-[#86868b]'}`} />}
                {idx === 5 && <ShieldCheck className={`w-4 h-4 ${isSelected ? 'text-[#0071e3]' : 'text-[#86868b]'}`} />}
              </div>

              <div className={`text-xs font-bold leading-tight line-clamp-2 ${isSelected ? 'text-[#0071e3]' : 'text-[#1d1d1f]'}`}>
                {step.title.replace(/^\d+\.\s*/, '')}
              </div>
            </button>
          );
        })}
      </div>

      {/* Step Detail Card with Smooth Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="apple-card p-6 sm:p-10 bg-white"
        >
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-black/[0.06]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0071e3]/10 text-[#0071e3]">
                  {activeStep.badge}
                </span>
                <span className="text-xs text-[#86868b] font-mono">
                  Fasa: {activeStep.phase}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight">
                {activeStep.title}: {activeStep.subtitle}
              </h3>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f5f7] border border-black/[0.04] text-xs font-mono font-medium text-[#1d1d1f]">
              <Radio className="w-3.5 h-3.5 text-[#0071e3] animate-pulse" />
              <span className="text-[#86868b]">MQTT:</span>
              <span className="font-bold text-[#0071e3]">{activeStep.mqttTopic}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-1.5">
                  Tindakan Fasa
                </h4>
                <p className="text-base text-[#1d1d1f] font-normal leading-relaxed">
                  {activeStep.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#86868b] mb-1">
                  Perincian Teknikal & Algoritma
                </h4>
                <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
                  {activeStep.technicalDetails}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10b981] mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Prinsip Keselamatan Siber-Fizikal</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1d1d1f] font-medium leading-relaxed">
                  {activeStep.safetyCheck}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs text-[#86868b]">
                <span className="font-semibold text-[#0071e3]">Audit Status: VERIFIED</span>
                <span>Langkah {activeStep.step} daripada 6</span>
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

    </section>
  );
};
