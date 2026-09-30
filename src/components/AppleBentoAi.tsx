import React, { useState } from 'react';
import { Cpu, ChevronRight, Zap, X, Sigma, Sparkles, Layers, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AI_MODELS, AiModelInfo } from '../data';

export const AppleBentoAi: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<AiModelInfo | null>(null);

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Apple Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#06b6d4]/10 text-[#06b6d4] mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Multi-Layered Intelligence Architecture</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">
          Enjin AI, Fizik & Pintu Keselamatan.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#86868b]">
          Enam teras pintar yang saling melengkapi untuk memastikan grid kebal daripada anomali dan serangan penyamaran data.
        </p>
      </div>

      {/* Apple Bento Grid (6 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AI_MODELS.map((model, idx) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="apple-card p-8 flex flex-col justify-between group cursor-pointer"
            onClick={() => setSelectedModel(model)}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f5f5f7] text-[#1d1d1f] border border-black/[0.04]">
                  {model.acronym}
                </span>
                <span className="text-xs font-semibold text-[#10b981] flex items-center gap-1">
                  <span>{model.metric}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-[#1d1d1f] mb-1 group-hover:text-[#0071e3] transition-colors">
                {model.name}
              </h3>
              
              <p className="text-xs font-bold text-[#0071e3] mb-3">
                {model.type}
              </p>

              <p className="text-sm text-[#86868b] leading-relaxed mb-6 font-normal">
                {model.role}
              </p>
            </div>

            <div className="pt-4 border-t border-black/[0.04] flex items-center justify-between text-xs text-[#0071e3] font-semibold">
              <span>Perincian Rumus & Sains</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Apple Sheet Modal for Deep Dive */}
      <AnimatePresence>
        {selectedModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="apple-card max-w-2xl w-full p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto bg-white"
            >
              <button
                onClick={() => setSelectedModel(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-[#86868b] hover:text-[#1d1d1f] bg-[#f5f5f7] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0071e3]/10 text-[#0071e3]">
                  {selectedModel.acronym}
                </span>
                <span className="text-xs text-[#86868b] font-medium">
                  {selectedModel.type}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] mb-2 tracking-tight">
                {selectedModel.name}
              </h3>

              <p className="text-sm text-[#86868b] leading-relaxed mb-6">
                {selectedModel.description}
              </p>

              {/* Math Formula Card */}
              <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] mb-5 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#0071e3] font-bold text-xs uppercase tracking-wider mb-2">
                  <Sigma className="w-4 h-4" />
                  <span>Formulasi Matematik / Logik Teras:</span>
                </div>
                <div className="overflow-x-auto py-1 text-[#1d1d1f] font-semibold">
                  <code>{selectedModel.formulaOrConcept}</code>
                </div>
              </div>

              {/* Why It Matters */}
              <div className="p-5 rounded-2xl bg-[#0071e3]/5 border border-[#0071e3]/15 mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0071e3] mb-1.5 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  <span>Mengapa Penting untuk Smart Grid?</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#1d1d1f] leading-relaxed">
                  {selectedModel.whyItMatters}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedModel(null)}
                  className="apple-button-primary text-xs !py-2.5 !px-6"
                >
                  Tutup
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
