import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ArrowRight, 
  ShieldAlert, 
  Activity, 
  Flame, 
  FileWarning, 
  ZapOff,
  Radio,
  TrendingDown
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ProblemSection: React.FC = () => {
  const [activeChainStep, setActiveChainStep] = useState(1);

  const attackChain = [
    {
      step: 1,
      name: "CYBER ATTACK",
      badge: "Infiltration",
      color: "border-red-400 bg-red-50 text-red-700",
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      title: "Penyerang Menyusup Rangkaian PMU/SCADA",
      detail: "Penyerang berniat jahat menyusup saluran komunikasi telemetri dan memalsukan isyarat ukuran voltan di pencawang."
    },
    {
      step: 2,
      name: "FALSE TELEMETRY",
      badge: "FDIA Manipulation",
      color: "border-amber-400 bg-amber-50 text-amber-700",
      icon: <FileWarning className="w-5 h-5 text-amber-500" />,
      title: "Penyeludupan Data Palsu (FDIA)",
      detail: "Ukuran voltan Bus 5 dipinda sebanyak +0.15 p.u. secara licik sehingga lolos daripada semakan sisa kuadratik biasa (Bad Data Detector)."
    },
    {
      step: 3,
      name: "GRID INSTABILITY",
      badge: "Cascading Imbalance",
      color: "border-purple-400 bg-purple-50 text-purple-700",
      icon: <Activity className="w-5 h-5 text-purple-500" />,
      title: "Ketidakstabilan Kuasa & Salah Tafsir",
      detail: "Penganggar keadaan grid menghasilkan anggaran voltan songsang, mencetuskan arahan pelantikan geganti pemutus litar yang tidak sepatutnya."
    },
    {
      step: 4,
      name: "REAL-WORLD IMPACT",
      badge: "Blackout Risk",
      color: "border-rose-500 bg-rose-50 text-rose-800",
      icon: <ZapOff className="w-5 h-5 text-rose-600" />,
      title: "Pemadaman Bersiri (Cascading Blackout)",
      detail: "Beban bertumpu ke talian bersebelahan yang terbeban, mencetuskan kerosakan transformer dan gangguan bekalan elektrik meluas kepada masyarakat."
    }
  ];

  return (
    <section id="problem" className="py-24 sm:py-32 bg-gradient-to-b from-[#fbfbfd] via-[#f7f8fa] to-[#fbfbfd] border-t border-black/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-600 mb-4"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Cabaran Keselamatan Kritikal</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] tracking-tight uppercase leading-tight"
          >
            SMART GRIDS ARE BECOMING MORE CONNECTED. <br />
            <span className="text-red-600">AND MORE VULNERABLE.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-base sm:text-xl text-[#86868b] max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Penyepaduan Internet of Things (IoT), PMU, dan automasi komunikasi IP membuka ruang serangan yang mampu melumpuhkan grid fizikal melalui manipulasi data maya.
          </motion.p>
        </div>

        {/* Visual Attack Chain (4 Steps) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative mb-16">
          {attackChain.map((chain, idx) => (
            <motion.div
              key={chain.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onClick={() => setActiveChainStep(chain.step)}
              className={`apple-card p-7 cursor-pointer transition-all duration-300 relative ${
                activeChainStep === chain.step 
                  ? 'border-red-500 shadow-xl ring-2 ring-red-500/20 bg-white scale-[1.02]' 
                  : 'bg-white hover:border-black/[0.12]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${chain.color}`}>
                  {chain.badge}
                </span>
                <span className="text-xs font-mono font-bold text-[#86868b]">
                  0{chain.step}
                </span>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-[#f5f5f7] flex items-center justify-center mb-4">
                {chain.icon}
              </div>

              <h3 className="text-base font-extrabold text-[#1d1d1f] mb-2">
                {chain.name}
              </h3>

              <h4 className="text-xs font-bold text-slate-800 mb-2 leading-snug">
                {chain.title}
              </h4>

              <p className="text-xs text-[#86868b] leading-relaxed">
                {chain.detail}
              </p>

              {idx < attackChain.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-black/[0.08] items-center justify-center text-[#86868b] shadow-sm">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Interactive Suspicious Node Threat Callout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="apple-card p-6 sm:p-8 bg-gradient-to-r from-red-50 via-white to-amber-50 border-red-200 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black text-[#1d1d1f]">
                  Anomali Nyata: Mengapa Pengesan Anomali Biasa Terperdaya?
                </h4>
                <p className="text-xs sm:text-sm text-[#86868b] mt-0.5">
                  Serangan FDIA menyelaraskan ralat suntikan mengikut matriks topologi Jacobian, menyebabkan <code className="text-red-600 font-bold">||z - Hx|| &lt; &tau;</code> tetap dipenuhi.
                </p>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-white border border-red-200 text-xs font-mono font-bold text-red-600 shadow-sm flex items-center gap-2 self-start sm:self-auto">
              <Radio className="w-4 h-4 animate-ping" />
              <span>BAD DATA DETECTOR BYPASSED</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
