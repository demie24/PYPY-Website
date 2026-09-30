import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2 } from 'lucide-react';

export const ResultsOverlay: React.FC = () => {
  const metrics = [
    {
      value: "99.81%",
      label: "Detection Accuracy",
      sub: "Multi-model consensus across all FDIA & DoS vectors",
      color: "text-blue-600"
    },
    {
      value: "12 ms",
      label: "Response Latency",
      sub: "Real-time AC sandbox Newton-Raphson rehearsal (<150ms limit)",
      color: "text-slate-900"
    },
    {
      value: "0%",
      label: "BDD Bypass",
      sub: "Zero stealth attacks penetrate Kirchhoff PINN governor",
      color: "text-blue-600"
    },
    {
      value: "$420K",
      label: "Estimated Savings",
      sub: "Annual blackout mitigation & critical transformer protection",
      color: "text-emerald-600"
    }
  ];

  return (
    <section
      id="results"
      className="min-h-screen relative flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-24 sm:py-28 pointer-events-none select-none"
    >
      {/* Top Left: Large Editorial Statement */}
      <div className="max-w-xl text-left space-y-4 pointer-events-auto z-10">
        
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs">
          <Trophy className="w-3.5 h-3.5 text-blue-600" />
          <span>07 // EMPIRICAL VALIDATION</span>
        </div>

        {/* Large Statement: PROVE THE RESULTS. */}
        <div className="space-y-1 sm:space-y-2">
          <h2 className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-slate-900 leading-[0.95]">
            PROVE THE
          </h2>
          <h3 className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-blue-600 leading-[0.95]">
            RESULTS.
          </h3>
        </div>

        <p className="text-sm font-sans text-slate-600 leading-relaxed max-w-md">
          Rigorous experimental benchmarks conducted on the IEEE 39-Bus New England power system prove deterministic cyber-physical immunity under live SCADA constraints.
        </p>

      </div>

      {/* Metrics Integrated Directly as Large Typography (No Generic Dashboard Cards) */}
      <div className="w-full max-w-5xl my-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 pointer-events-auto z-10 pt-6">
        {metrics.map((m, idx) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2 text-left"
          >
            {/* Massive Integrated Metric Number */}
            <div className={`text-6xl sm:text-7xl lg:text-7xl font-sans font-black tracking-tight leading-none ${m.color}`}>
              {m.value}
            </div>

            {/* Label */}
            <h4 className="text-base sm:text-lg font-sans font-bold text-slate-900 tracking-tight pt-1">
              {m.label}
            </h4>

            {/* Supporting Description */}
            <p className="text-xs font-mono text-slate-500 leading-relaxed">
              {m.sub}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Viva Validation Note */}
      <div className="pointer-events-auto z-10 self-start">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>VIVA EVALUATION READY • FULL CHAPTER 4 REPRODUCIBILITY</span>
        </div>
      </div>

    </section>
  );
};
