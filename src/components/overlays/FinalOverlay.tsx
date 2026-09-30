import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { PROJECT_INFO_V2 } from '../../data';

export const FinalOverlay: React.FC = () => {
  return (
    <section
      id="final"
      className="min-h-screen relative flex flex-col justify-between items-center text-center px-6 sm:px-12 py-24 sm:py-28 pointer-events-none select-none"
    >
      {/* Top Status */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pointer-events-auto"
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>AUTONOMOUS CYBER-PHYSICAL IMMUNITY • IEEE 39-BUS SECURED</span>
        </div>
      </motion.div>

      {/* Main Closing Editorial Typography */}
      <div className="my-auto max-w-5xl mx-auto space-y-6 pointer-events-auto z-10">
        
        {/* Large Statement: PYPY CYBERSECURITY SMART GRID */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1 sm:space-y-3"
        >
          <h2 className="text-6xl sm:text-8xl lg:text-[7.5rem] font-sans font-black text-slate-900 tracking-tight leading-[0.92]">
            PYPY
          </h2>
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-blue-600 uppercase tracking-tight">
            CYBERSECURITY SMART GRID
          </h3>
        </motion.div>

        {/* Descriptor */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg font-mono font-semibold text-slate-600 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed"
        >
          AI-DRIVEN CYBER-PHYSICAL DEFENCE
        </motion.p>

        {/* Final CTA: OPEN LIVE DASHBOARD → */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="pt-4"
        >
          <a
            href={PROJECT_INFO_V2.liveDashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-sans font-bold text-base text-white btn-pypy-primary shadow-lg hover:shadow-xl transition-all group"
          >
            <span>OPEN LIVE DASHBOARD</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </a>
          <span className="block text-xs font-mono text-slate-400 mt-2.5">
            Cloudflare Quick Tunnel: score-civilization-gnome-association.trycloudflare.com
          </span>
        </motion.div>

      </div>

      {/* Footer Metadata */}
      <div className="w-full max-w-5xl mx-auto pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-2 pointer-events-auto">
        <div>
          <span className="text-slate-800 font-bold">{PROJECT_INFO_V2.institution}</span> • {PROJECT_INFO_V2.faculty}
        </div>
        <div>
          Author: <span className="text-blue-600 font-bold">{PROJECT_INFO_V2.author}</span> • Sesi {PROJECT_INFO_V2.academicYear}
        </div>
      </div>
    </section>
  );
};
