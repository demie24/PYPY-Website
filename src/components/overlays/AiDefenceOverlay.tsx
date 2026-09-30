import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, ShieldCheck, ArrowRight } from 'lucide-react';
import { AI_MODELS_V2 } from '../../data';

interface AiDefenceOverlayProps {
  selectedAiModel: string;
  onSelectAiModel: (id: string) => void;
}

export const AiDefenceOverlay: React.FC<AiDefenceOverlayProps> = ({
  selectedAiModel,
  onSelectAiModel
}) => {
  const activeModel = AI_MODELS_V2.find((m) => m.id === selectedAiModel) || AI_MODELS_V2[0];

  return (
    <section
      id="ai-defence"
      className="min-h-screen relative flex items-center justify-between px-6 sm:px-12 lg:px-20 py-24 sm:py-28 pointer-events-none select-none"
    >
      {/* Left Column: Bold Statement & Sequential Models List (No Rectangular Cards) */}
      <div className="max-w-xl w-full text-left space-y-6 pointer-events-auto z-10">
        
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs">
          <BrainCircuit className="w-3.5 h-3.5 text-blue-600" />
          <span>05 // MULTI-LAYER AI SHIELD</span>
        </div>

        {/* Statement: FOUR MODELS. ONE DEFENCE SYSTEM. */}
        <div className="space-y-1 sm:space-y-2">
          <h2 className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-slate-900 leading-[0.95]">
            FOUR MODELS.
          </h2>
          <h3 className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-blue-600 leading-[0.95]">
            ONE DEFENCE <br />SYSTEM.
          </h3>
        </div>

        <p className="text-sm font-sans text-slate-600 leading-relaxed max-w-md">
          Four specialized neural layers operate in harmonious consensus around the digital twin, securing telemetry across temporal sequence, spatial topology, and non-linear Kirchhoff AC physics.
        </p>

        {/* Sequential Model Introduction (Typography & Orbital Indicators, No Bulky Cards) */}
        <div className="space-y-2 pt-2">
          {AI_MODELS_V2.map((model, idx) => {
            const isSelected = selectedAiModel === model.id;
            return (
              <div
                key={model.id}
                onClick={() => onSelectAiModel(model.id)}
                className={`cursor-pointer transition-all duration-300 p-3 rounded-2xl border flex items-center justify-between group ${
                  isSelected
                    ? 'bg-white/95 backdrop-blur-md border-blue-500 shadow-md translate-x-1.5'
                    : 'bg-white/60 backdrop-blur-sm border-slate-200/80 hover:border-slate-300 hover:bg-white/90'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                  }`}>
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className={`text-base font-sans font-bold leading-tight ${isSelected ? 'text-blue-600' : 'text-slate-900'}`}>
                      {model.name}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      {model.role}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {model.confidence}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">
                    CONFIDENCE
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Model Deep Dive Pill */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModel.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-3.5 rounded-xl bg-slate-900 text-white text-xs font-mono space-y-1 shadow-md"
          >
            <div className="flex items-center justify-between text-blue-400 font-bold">
              <span>{activeModel.layer.toUpperCase()}</span>
              <span className="text-emerald-400">{activeModel.metric}</span>
            </div>
            <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
              {activeModel.description}
            </p>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Right Side: Open Space Where 4 3D Orbital Defence Rings Revolves Around the Digital Twin */}
      <div className="hidden lg:block w-1/2" />
    </section>
  );
};
