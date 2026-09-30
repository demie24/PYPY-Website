import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Scale, 
  Workflow, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Radio,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PIPELINE_STAGES } from '../data';

export const ArchitectureSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Auto-play through stages if user desires
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const stagesData = [
    {
      id: "monitor",
      step: 1,
      name: "MONITOR",
      tagline: "Authoritative Telemetry Ingestion",
      component: "Digital Twin IEEE 39-Bus",
      icon: <Activity className="w-5 h-5 text-[#0071e3]" />,
      pillColor: "bg-[#0071e3]/10 text-[#0071e3] border-[#0071e3]/20",
      accentBg: "from-blue-500/10 to-transparent",
      description: "Digital Twin mengira keadaan aliran kuasa AC penuh masa nyata dan menerbitkan telemetri 39 bas pada topik MQTT 'pypy/grid/telemetry'.",
      action: "Menjana vektor voltan, arus, kuasa aktif/reaktif dan status pemutus litar secara langsung.",
      techSpecs: [
        { label: "Protokol", value: "MQTT (pypy/grid/telemetry)" },
        { label: "Dimensi Vektor", value: "156 elemen (39 nod × 4 dimensi)" },
        { label: "Frekuensi Sampel", value: "Masa Nyata (Synchronous Stream)" },
        { label: "Enjin Fizik", value: "PandaPower / Newton-Raphson AC" }
      ],
      safetyFeature: "Penyerapan data telemetri selamat tanpa kebocoran kronologi."
    },
    {
      id: "detect",
      step: 2,
      name: "DETECT",
      tagline: "Multi-Model Parallel Inference",
      component: "LSTM, GNN & ST-GNN AI Enjin",
      icon: <Cpu className="w-5 h-5 text-[#06b6d4]" />,
      pillColor: "bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20",
      accentBg: "from-cyan-500/10 to-transparent",
      description: "4 model AI menganalisis siri masa temporal dan struktur topologi spatial serentak untuk mengesan pencerobohan siber.",
      action: "Mengasingkan corak FDIA licik dan manipulasi pemutus litar yang cuba memperdaya Bad Data Detector konvensional.",
      techSpecs: [
        { label: "Model Temporal", value: "Bi-LSTM (Window W=20)" },
        { label: "Model Topologi", value: "GCN (39 nod, 46 sisi)" },
        { label: "Model Penularan", value: "ST-GNN (Spatio-Temporal)" },
        { label: "Keyakinan Enjin", value: "98.7% Multi-Model Consensus" }
      ],
      safetyFeature: "Pengesanan serentak 100% tepat bagi serangan FDIA dan Denial-of-Service."
    },
    {
      id: "validate",
      step: 3,
      name: "VALIDATE",
      tagline: "Physics-Informed KCL/KVL Verification",
      component: "PINN & Dynamic TRUST Engine",
      icon: <Scale className="w-5 h-5 text-[#8b5cf6]" />,
      pillColor: "bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20",
      accentBg: "from-purple-500/10 to-transparent",
      description: "Mengesahkan ketidaksamaan kuasa fizikal mengikut Hukum Kirchhoff di setiap bas dan mengira skor kepercayaan sensor secara analitikal.",
      action: "Menolak amaran palsu yang berpunca daripada fluktuasi beban biasa berbanding serangan berniat jahat.",
      techSpecs: [
        { label: "Validasi Fizik", value: "Hukum Arus & Voltan Kirchhoff (KCL/KVL)" },
        { label: "Metrik Kepercayaan", value: "TRUST Score (0.0 - 1.0 dinamik)" },
        { label: "Formula Baki", value: "Residual Kuasa Aktif & Reaktif (PINN)" },
        { label: "Pengasingan", value: "Penderia Bus 5 disahkan tidak dipercayai" }
      ],
      safetyFeature: "PINN memastikan undang-undang fizik kuasa elektrik dihormati sebelum tindakan diambil."
    },
    {
      id: "decide",
      step: 4,
      name: "DECIDE",
      tagline: "Dual-Policy Consensus & Safety Gate",
      component: "PPO + DQN Consensus & AI Orchestrator",
      icon: <Workflow className="w-5 h-5 text-[#f59e0b]" />,
      pillColor: "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20",
      accentBg: "from-amber-500/10 to-transparent",
      description: "Model PPO dan DQN menilai usul pemulihan. Pintu keselamatan menguji pelan dalam AC Restoration Sandbox sebelum kelulusan.",
      action: "Menguatkuasakan tempoh bertenang 5.2s dan menolak sebarang tindakan yang berisiko mencetuskan pemadaman bersiri.",
      techSpecs: [
        { label: "Algoritma RL", value: "PPO (Policy Gradient) + Double DQN" },
        { label: "Pra-Pengujian", value: "AC Restoration Sandbox (Newton-Raphson)" },
        { label: "Latensi Sandbox", value: "13.47 ms (Sasaran < 150 ms)" },
        { label: "Integriti Kawalan", value: "Tempoh Bertenang 5.2s (Anti-Hunting)" }
      ],
      safetyFeature: "Veto automatik jika cadangan pemulihan melanggar had kestabilan voltan atau frekuensi."
    },
    {
      id: "recover",
      step: 5,
      name: "RECOVER",
      tagline: "Physical Actuation & Convergence Proof",
      component: "Digital Twin State Execution",
      icon: <ShieldCheck className="w-5 h-5 text-[#10b981]" />,
      pillColor: "bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20",
      accentBg: "from-emerald-500/10 to-transparent",
      description: "Arahan kawalan yang diluluskan dilaksanakan ke atas pemutus litar, dan telemetri baharu mengesahkan 'GRID SECURED'.",
      action: "Grid dipulihkan sepenuhnya ke keadaan nominal dengan aliran kuasa AC yang terbukti stabil.",
      techSpecs: [
        { label: "Tindakan Fizikal", value: "Tutup Semula Pemutus Litar / Pengasingan Substation" },
        { label: "Status Akhir", value: "GRID SECURED (Voltan 0.95 - 1.05 p.u.)" },
        { label: "Kadar Kejayaan", value: "100% Pemulihan Senario Ujian" },
        { label: "Gelung Pertahanan", value: "Tertutup Penuh (End-to-End Closed-Loop)" }
      ],
      safetyFeature: "Pengesahan konvergens penuh membuktikan kestabilan mutlak grid pasca pemulihan."
    }
  ];

  const current = stagesData[activeStep];

  return (
    <section id="architecture" className="py-24 sm:py-32 bg-white border-t border-black/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0071e3]/10 text-[#0071e3] mb-4"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Seni Bina Gelung Tertutup (Closed-Loop Pipeline)</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight uppercase"
          >
            Bagaimana PYPY Berfungsi.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#86868b] leading-relaxed font-normal"
          >
            Dari penerimaan telemetri sehingga penguatkuasaan pemulihan kendiri berautonomi, setiap peringkat dilindungi oleh lapisan pengesahan fizik dan kecerdasan buatan.
          </motion.p>
        </div>

        {/* Large Horizontal Interactive Pipeline: MONITOR -> DETECT -> VALIDATE -> DECIDE -> RECOVER */}
        <div className="relative mb-12">
          
          {/* Background Connecting Track */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-[#f5f5f7] -translate-y-1/2 z-0 rounded-full" />
          
          {/* Animated Glowing Signal Traveling Along Track */}
          <div 
            className="hidden lg:block absolute top-1/2 h-1 bg-gradient-to-r from-[#0071e3] via-[#06b6d4] to-[#10b981] -translate-y-1/2 z-0 rounded-full transition-all duration-700 ease-out"
            style={{ 
              width: `${(activeStep / (stagesData.length - 1)) * 100}%`,
              boxShadow: '0 0 12px rgba(0, 113, 227, 0.4)'
            }}
          />

          {/* 5 Stage Horizontal Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {stagesData.map((stage, idx) => {
              const isSelected = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsAutoPlay(false);
                  }}
                  className={`apple-card p-4 sm:p-5 text-left transition-all duration-300 relative flex flex-col justify-between group ${
                    isSelected 
                      ? 'border-[#0071e3] shadow-lg shadow-blue-500/10 scale-[1.03] bg-white ring-2 ring-[#0071e3]/20' 
                      : isPast
                        ? 'bg-[#fbfbfd] border-black/[0.08] hover:border-black/[0.16]'
                        : 'bg-[#f5f5f7] border-black/[0.04] opacity-80 hover:opacity-100 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                      isSelected ? 'bg-[#0071e3] text-white border-[#0071e3]' : 'bg-white text-[#86868b] border-black/[0.06]'
                    }`}>
                      0{stage.step}
                    </span>
                    <div className="p-1.5 rounded-xl bg-white shadow-xs group-hover:scale-110 transition-transform">
                      {stage.icon}
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-sm sm:text-base font-black tracking-tight ${
                      isSelected ? 'text-[#0071e3]' : 'text-[#1d1d1f]'
                    }`}>
                      {stage.name}
                    </h3>
                    <p className="text-[11px] text-[#86868b] font-medium line-clamp-1 mt-0.5">
                      {stage.component}
                    </p>
                  </div>

                  {isSelected && (
                    <motion.div 
                      layoutId="active-stage-indicator"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#0071e3] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detailed Focus Card for Active Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="apple-card p-6 sm:p-10 bg-gradient-to-br from-white via-white to-[#f7f9fc] border-black/[0.08] shadow-xl relative overflow-hidden"
          >
            {/* Subtle Gradient Glow in Corner */}
            <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br ${current.accentBg} blur-3xl pointer-events-none`} />

            {/* Top Bar of Stage Detail */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${current.pillColor}`}>
                    Langkah 0{current.step}: {current.name}
                  </span>
                  <span className="text-xs font-mono font-medium text-[#86868b]">
                    {current.component}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1d1d1f] tracking-tight">
                  {current.tagline}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                    isAutoPlay 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-white text-[#86868b] border-black/[0.08] hover:text-[#1d1d1f]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isAutoPlay ? 'Auto-Advancing' : 'Main Automatik'}</span>
                </button>
              </div>
            </div>

            {/* Body Grid: Description & Technical Specifications */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 relative z-10">
              
              {/* Left Column: Description & Action */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#86868b] mb-2">
                    Fungsi & Pelaksanaan Fasa
                  </h4>
                  <p className="text-base sm:text-lg text-[#1d1d1f] font-normal leading-relaxed">
                    {current.description}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0071e3] mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tindakan Sistem</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
                    {current.action}
                  </p>
                </div>

                {/* Safety Check Box */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-emerald-900 uppercase">
                      Jaminan Keselamatan Siber-Fizikal
                    </h5>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      {current.safetyFeature}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Technical Specs Table */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#86868b] mb-3">
                    Parameter Teknikal (Chapter 4 Verified)
                  </h4>
                  
                  <div className="space-y-2.5">
                    {current.techSpecs.map((spec, i) => (
                      <div 
                        key={i} 
                        className="p-3 rounded-xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-[#86868b]">{spec.label}</span>
                        <span className="font-mono font-bold text-[#1d1d1f] text-right ml-2">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Stage Navigation CTA */}
                <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-xs text-[#86868b]">
                    Peringkat {current.step} daripada 5
                  </span>

                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % stagesData.length)}
                    className="apple-button-primary text-xs !py-1.5 !px-3.5 flex items-center gap-1"
                  >
                    <span>Langkah Seterusnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
