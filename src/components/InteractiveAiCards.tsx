import React, { useState } from 'react';
import { 
  Cpu, 
  ChevronRight, 
  Zap, 
  X, 
  Sigma, 
  Sparkles,
  Layers,
  Scale,
  Workflow,
  ShieldCheck
} from 'lucide-react';
import { AI_MODELS, AiModelInfo } from '../data';

export const InteractiveAiCards: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'detection' | 'physics' | 'recovery'>('all');
  const [selectedModalModel, setSelectedModalModel] = useState<AiModelInfo | null>(null);

  const filteredModels = AI_MODELS.filter((model) => {
    if (filter === 'all') return true;
    if (filter === 'detection') return model.id === 'lstm' || model.id === 'gnn' || model.id === 'stgnn';
    if (filter === 'physics') return model.id === 'pinn';
    if (filter === 'recovery') return model.id === 'rl_consensus' || model.id === 'orchestrator';
    return true;
  });

  return (
    <section className="ops-dashboard">
      
      {/* Hero Header */}
      <div className="ops-hero">
        <div>
          <div className="ops-live-label">
            <span className="ops-live-dot" /> Multi-Model Intelligence
          </div>
          <h1>Model AI, Fizik & Kawalan Keselamatan</h1>
          <p>Kombinasi model siri masa, rangkaian saraf graf, dan hukum analitikal Kirchhoff.</p>
        </div>
        
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-white border border-[#dce9ef]">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'all' ? 'bg-[#17324d] text-white' : 'text-[#668096] hover:bg-[#edf8f8]'
            }`}
          >
            Semua (6)
          </button>
          <button
            onClick={() => setFilter('detection')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'detection' ? 'bg-[#17324d] text-white' : 'text-[#668096] hover:bg-[#edf8f8]'
            }`}
          >
            Pengesanan (3)
          </button>
          <button
            onClick={() => setFilter('physics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'physics' ? 'bg-[#17324d] text-white' : 'text-[#668096] hover:bg-[#edf8f8]'
            }`}
          >
            Pengesahan Fizik (1)
          </button>
          <button
            onClick={() => setFilter('recovery')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'recovery' ? 'bg-[#17324d] text-white' : 'text-[#668096] hover:bg-[#edf8f8]'
            }`}
          >
            Pemulihan RL (2)
          </button>
        </div>
      </div>

      {/* 6 AI Cards in Authentic ops-card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredModels.map((model) => (
          <article
            key={model.id}
            className="ops-card p-6 flex flex-col justify-between hover:translate-y-[-2px] transition-all hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#e4f7f5] text-[#13848b] border border-[#afe5ef]">
                  {model.acronym}
                </span>
                <span className="text-xs font-mono font-bold text-[#159474]">
                  {model.metric}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-[#17324d] mb-1">
                {model.name}
              </h3>
              <p className="text-xs font-bold text-[#16858a] mb-3">
                {model.type}
              </p>

              <p className="text-xs text-[#557187] leading-relaxed mb-4">
                {model.role}
              </p>

              <div className="p-3 rounded-xl bg-[#f8fbfc] border border-[#e1eaee] space-y-1.5 mb-4 text-[11px] font-mono">
                <div className="text-[#668096]">
                  <strong className="text-[#17324d]">Input:</strong> {model.inputDim}
                </div>
                <div className="text-[#668096] truncate">
                  <strong className="text-[#17324d]">Seni Bina:</strong> {model.architecture}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedModalModel(model)}
              className="ops-details-button flex items-center justify-center gap-1.5"
            >
              <span>Lihat Rumus & Perincian Saintifik</span>
              <ChevronRight size={14} />
            </button>
          </article>
        ))}
      </div>

      {/* Deep Dive Modal */}
      {selectedModalModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17324d]/60 backdrop-blur-sm">
          <div className="max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-white border border-[#dce9ef] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedModalModel(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#668096] hover:text-[#17324d] bg-[#f1f8fa]"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#dff7f4] text-[#16858a] border border-[#afe5ef]">
                {selectedModalModel.acronym}
              </span>
              <span className="text-xs text-[#7890a2] font-mono">
                {selectedModalModel.type}
              </span>
            </div>

            <h3 className="text-2xl font-black text-[#17324d] mb-2">
              {selectedModalModel.name}
            </h3>

            <p className="text-sm text-[#557187] leading-relaxed mb-5">
              {selectedModalModel.description}
            </p>

            {/* Formula Snippet */}
            <div className="p-4 rounded-2xl bg-[#17324d] text-white border border-[#24455a] font-mono text-xs sm:text-sm mb-5 shadow-inner">
              <div className="flex items-center gap-2 text-[#20b89d] mb-2 font-bold text-xs uppercase tracking-wider">
                <Sigma size={16} />
                <span>Formulasi Matematik / Logik Teras:</span>
              </div>
              <div className="overflow-x-auto py-1 text-amber-200 font-semibold">
                <code>{selectedModalModel.formulaOrConcept}</code>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#edfbf9] border border-[#a9ead7] mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#08785f] mb-1.5 flex items-center gap-1.5">
                <Zap size={14} />
                <span>Mengapa Komponen Ini Wajib Ada dalam Smart Grid?</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#17324d] leading-relaxed">
                {selectedModalModel.whyItMatters}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedModalModel(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#17324d] text-white hover:bg-[#234b6e]"
              >
                Tutup Perincian
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
