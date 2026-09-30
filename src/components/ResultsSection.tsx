import React from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Database,
  BarChart2,
  FileCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CHAPTER4_DATA } from '../data';

export const ResultsSection: React.FC = () => {
  const metrics = [
    {
      value: "98.7%",
      label: "Detection Confidence",
      sublabel: "Konsensus Multi-Model AI",
      color: "text-[#0071e3]"
    },
    {
      value: "39",
      label: "IEEE Buses",
      sublabel: "Topologi New England Piawai",
      color: "text-[#06b6d4]"
    },
    {
      value: "<150 ms",
      label: "Solver Target",
      sublabel: "13.47 ms Terukur Sebenar",
      color: "text-[#10b981]"
    },
    {
      value: "5-LAYER",
      label: "AI Defence",
      sublabel: "LSTM + GNN + PINN + ST-GNN + RL",
      color: "text-[#8b5cf6]"
    },
    {
      value: "100%",
      label: "Successful Recovery",
      sublabel: "Senario Ujian Serangan",
      color: "text-[#10b981]"
    },
    {
      value: "0.0%",
      label: "Data Leakage",
      sublabel: "Pemisahan Kronologi Ketat",
      color: "text-[#0071e3]"
    }
  ];

  const modelComparisons = [
    { model: "Conventional Bad Data Detector", score: 48.2, color: "bg-slate-300" },
    { model: "Standard Random Forest", score: 78.4, color: "bg-slate-400" },
    { model: "Isolated Vanilla GNN", score: 86.4, color: "bg-purple-400" },
    { model: "Standalone Bi-LSTM", score: 91.2, color: "bg-blue-400" },
    { model: "PYPY Multi-Model Framework", score: 98.7, color: "bg-gradient-to-r from-[#0071e3] to-[#06b6d4]" }
  ];

  return (
    <section id="results" className="py-24 sm:py-32 bg-[#fbfbfd] border-t border-black/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 mb-4"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Keputusan Empirikal & Pengesahan Viva (Bab 4)</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight uppercase"
          >
            Keputusan Yang Terbukti.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#86868b] leading-relaxed font-normal"
          >
            Data penanda aras yang telah diverifikasi daripada Bab 4 tesis FYP membuktikan kestabilan, kepantasan pemulihan, dan sifar kebocoran data.
          </motion.p>
        </div>

        {/* Big Apple-Style Metric Cards Grid (6 Big Numbers) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="apple-card p-6 sm:p-8 bg-white border-black/[0.06] shadow-sm hover:shadow-xl hover:border-black/[0.12] transition-all duration-300 text-center flex flex-col justify-between"
            >
              <div>
                <span className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight ${metric.color} block mb-2`}>
                  {metric.value}
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-[#1d1d1f] tracking-tight">
                  {metric.label}
                </h3>
              </div>
              <p className="text-xs text-[#86868b] mt-2 font-medium">
                {metric.sublabel}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Benchmark Comparisons & Audit Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* F1 Comparison Bar Visual (7 Cols) */}
          <div className="lg:col-span-7 apple-card p-6 sm:p-8 bg-white border-black/[0.06] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-6">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-[#0071e3]" />
                  <h3 className="text-base sm:text-lg font-black text-[#1d1d1f]">
                    Perbandingan F1-Score Pengesanan Serangan
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#0071e3] bg-blue-50 px-2 py-0.5 rounded-full">
                  Table 4.3 Verified
                </span>
              </div>

              <div className="space-y-4">
                {modelComparisons.map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#1d1d1f]">{item.model}</span>
                      <span className="font-mono font-black text-[#1d1d1f]">{item.score}%</span>
                    </div>

                    <div className="w-full bg-[#f5f5f7] h-3 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`${item.color} h-full rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-black/[0.04] text-xs text-[#86868b] flex items-center justify-between">
              <span>Keberkesanan Gabungan Multi-Model</span>
              <strong className="text-[#0071e3]">+20.3% Lebih Unggul Berbanding Random Forest</strong>
            </div>
          </div>

          {/* Academic Integrity & Latency (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Chronological Leakage Audit Card */}
            <div className="apple-card p-6 bg-white border-black/[0.06] shadow-sm">
              <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-600 uppercase mb-3">
                <FileCheck className="w-4 h-4" />
                <span>Audit Integriti Akademik (Table 4.4)</span>
              </div>

              <h4 className="text-base font-black text-[#1d1d1f] mb-1">
                Sifar Kebocoran Masa (0.0% Leakage)
              </h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">
                Pemisahan data latihan dan ujian dilakukan secara urutan masa kronologi (<code className="text-[#0071e3]">temporal split</code>), bukan rawak (<code className="text-red-500">random shuffle</code>) yang lazimnya menghasilkan keputusan palsu yang terlampau optimistik.
              </p>

              <div className="p-3 rounded-xl bg-[#f5f5f7] text-[11px] font-mono text-[#515154] space-y-1">
                <div className="flex justify-between">
                  <span>Kaedah Pembahagian:</span>
                  <strong className="text-emerald-700">Chronological Split</strong>
                </div>
                <div className="flex justify-between">
                  <span>Kebocoran Data Masa Depan:</span>
                  <strong className="text-emerald-700">0.00% (Tiada)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Pengesahan Pemeriksa:</span>
                  <strong className="text-[#0071e3]">LULUS VIVA</strong>
                </div>
              </div>
            </div>

            {/* Substation Solver Latency Card */}
            <div className="apple-card p-6 bg-white border-black/[0.06] shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#0071e3] uppercase">
                  <Clock className="w-4 h-4" />
                  <span>Kelajuan Simulasi AC</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600">Table 4.5</span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-[#1d1d1f]">13.47 ms</span>
                <span className="text-xs text-[#86868b]">purata masa penyelesaian</span>
              </div>

              <p className="text-xs text-[#86868b] leading-relaxed">
                Penyelesai aliran kuasa Newton-Raphson mencapai konvergens dalam 13.47 ms, jauh di bawah had ambang SCADA 150 ms.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
