import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Cpu, 
  Network, 
  Scale, 
  Activity, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Code,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { AI_MODELS, AiModelInfo } from '../data';

export const AiDetectionSection: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>("lstm");
  const [animatedConfidence, setAnimatedConfidence] = useState<number>(0);
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Animate counter upwards when in view
  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = 98.7;
    const duration = 1800; // ms
    const stepTime = 20;
    const increment = (end - start) / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedConfidence(end);
        clearInterval(timer);
      } else {
        setAnimatedConfidence(Number(start.toFixed(1)));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView]);

  // The 4 core detection models requested: LSTM, GNN, PINN, ST-GNN
  const coreModels = AI_MODELS.filter((m) => 
    ["lstm", "gnn", "pinn", "stgnn"].includes(m.id)
  );

  const activeModel = AI_MODELS.find((m) => m.id === selectedModelId) || coreModels[0];

  return (
    <section id="ai-defence" ref={containerRef} className="py-24 sm:py-32 bg-[#fbfbfd] border-t border-black/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#8b5cf6]/10 text-[#8b5cf6] mb-4"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Enjin Pengesanan Kecerdasan Buatan Multi-Model</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight uppercase"
          >
            Pertahanan AI Pelbagai Lapisan.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#86868b] leading-relaxed font-normal"
          >
            Sinergi 4 model kecerdasan buatan termaju yang menggabungkan pembelajaran siri masa temporal, pemodelan topologi graf spatial, dan hukum fizik kuasa elektrik.
          </motion.p>
        </div>

        {/* Large Prominent Confidence Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="apple-card p-8 sm:p-10 mb-12 bg-white border-black/[0.08] shadow-xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Big Animated Counter */}
            <div className="lg:col-span-5 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-black/[0.06] pb-6 lg:pb-0 lg:pr-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#86868b] block mb-2">
                DETECTION CONFIDENCE
              </span>
              <div className="flex items-baseline justify-center lg:justify-start gap-1">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-[#0071e3]">
                  {animatedConfidence}%
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#86868b] mt-2 font-medium">
                Ketepatan konsensus enjin multi-model dalam mengasingkan anomali siber daripada fluktuasi beban biasa.
              </p>
            </div>

            {/* Performance Bars for 4 Models */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#1d1d1f] mb-3">
                Prestasi Model Terverifikasi (Chapter 4 Benchmark)
              </h4>

              {coreModels.map((model) => (
                <div key={model.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-[#1d1d1f]">
                      {model.acronym} — <span className="text-[#86868b] font-normal">{model.name}</span>
                    </span>
                    <span className="font-mono font-black text-[#0071e3]">
                      {model.accuracyPercent}%
                    </span>
                  </div>

                  <div className="w-full bg-[#f5f5f7] h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${model.accuracyPercent}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      className="bg-gradient-to-r from-[#0071e3] to-[#06b6d4] h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

        {/* 4 Interactive Model Bento Cards: LSTM, GNN, PINN, ST-GNN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {coreModels.map((model) => {
            const isSelected = selectedModelId === model.id;
            return (
              <motion.div
                key={model.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedModelId(model.id)}
                className={`apple-card p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#0071e3] shadow-lg ring-2 ring-[#0071e3]/20 bg-white scale-[1.02]'
                    : 'bg-white hover:border-black/[0.12] shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${model.badgeColor}`}>
                      {model.acronym}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#86868b]">
                      {model.accuracyPercent}%
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#1d1d1f] mb-1">
                    {model.acronym}
                  </h3>
                  <h4 className="text-xs font-semibold text-[#86868b] mb-3">
                    {model.name}
                  </h4>

                  <p className="text-xs text-[#515154] leading-relaxed line-clamp-3 mb-4">
                    {model.role}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/[0.04] flex items-center justify-between text-xs font-bold text-[#0071e3]">
                  <span>Lihat Perincian</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Deep-Dive Card for Active Selected Model */}
        <motion.div
          key={activeModel.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="apple-card p-6 sm:p-10 bg-white border-black/[0.08] shadow-xl relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 pb-6 border-b border-black/[0.06]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${activeModel.badgeColor}`}>
                  {activeModel.acronym} Architecture
                </span>
                <span className="text-xs text-[#86868b] font-mono">
                  Dimensi Input: {activeModel.inputDim}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">
                {activeModel.name} ({activeModel.acronym})
              </h3>
              <p className="text-sm text-[#0071e3] font-bold mt-0.5">
                {activeModel.type}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] text-right">
              <span className="text-[10px] font-black uppercase text-[#86868b] block">Metrik Utama</span>
              <span className="text-xs font-mono font-bold text-[#1d1d1f]">
                {activeModel.metric}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#86868b] mb-1">
                  Peranan & Tanggungjawab Dalam PYPY:
                </h4>
                <p className="text-sm text-[#1d1d1f] leading-relaxed">
                  {activeModel.role}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#86868b] mb-1">
                  Mengapa Model Ini Penting:
                </h4>
                <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
                  {activeModel.whyItMatters}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60">
                <h5 className="text-xs font-black uppercase text-[#0071e3] mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Keupayaan Pengesanan Khusus</span>
                </h5>
                <p className="text-xs text-[#1e293b] leading-relaxed">
                  {activeModel.keyFeature}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#1d1d1f] mb-3">
                  <Code className="w-4 h-4 text-[#0071e3]" />
                  <span>Asas Matematik & Formula</span>
                </div>
                
                <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] font-mono text-xs text-[#0071e3] overflow-x-auto leading-relaxed shadow-xs">
                  {activeModel.formulaOrConcept}
                </div>

                <p className="text-[11px] text-[#86868b] mt-3 leading-relaxed">
                  Struktur ini dipasang ke dalam paip pertahanan selari untuk memastikan tiada anomali telemetri terlepas.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#86868b]">Senibina: {activeModel.architecture}</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
