import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export const ProblemOverlay: React.FC = () => {
  return (
    <section
      id="problem"
      className="min-h-screen relative flex items-center justify-between px-6 sm:px-12 lg:px-20 py-24 sm:py-28 pointer-events-none select-none"
    >
      {/* Left Column: Huge Editorial Statement with Intentional Negative Space */}
      <div className="max-w-2xl w-full text-left space-y-6 pointer-events-auto z-10">
        
        {/* Scene Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-50 text-red-700 border border-red-200/80 shadow-xs"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          <span>02 // THE THREAT</span>
        </motion.div>

        {/* Large Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 sm:space-y-2"
        >
          <div className="text-5xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tight leading-[0.95] text-slate-900">
            THE GRID <br />
            IS CONNECTED.
          </div>

          <div className="text-5xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tight leading-[0.95] pt-4 sm:pt-6">
            <span className="text-slate-900 block">SO IS</span>
            <span className="text-red-600 block">THE THREAT.</span>
          </div>
        </motion.div>

        {/* Storytelling Context */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-base font-normal text-slate-600 leading-relaxed font-sans max-w-lg pt-2"
        >
          Modern smart grids interconnect millions of cyber-physical telemetry points. Sophisticated adversaries craft false data injection attacks (FDIA) that manipulate power flows while mathematically canceling out legacy Bad Data Detection (BDD) residuals.
        </motion.p>

        {/* Minimal Engineering Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm border border-red-200/80 text-xs font-mono text-red-700 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>FDIA BYPASS EQUATION: ||z - Hx|| &lt; &tau;</span>
        </motion.div>

      </div>

      {/* Right Side: Completely Open Negative Space for the 3D Chaotic Anomaly to Shine */}
      <div className="hidden lg:block w-1/2" />
    </section>
  );
};
