import React from 'react';
import { 
  Activity, 
  ExternalLink, 
  Play, 
  Terminal, 
  CheckCircle2, 
  ShieldCheck, 
  Radio, 
  Layers, 
  Zap, 
  AlertTriangle 
} from 'lucide-react';
import { PROJECT_INFO } from '../data';

export const LiveDemoHub: React.FC = () => {
  return (
    <section id="demo" className="py-16 sm:py-24 border-b border-slate-200/60 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/30 mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>Pusat Demonstrasi Langsung (Live Demo)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pelancar Demo Viva Pada Sistem Sebenar
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Gunakan panduan dan pautan pantas ini untuk mendemonstrasikan sistem beroperasi secara langsung di hadapan panel penilai FYP.
          </p>
        </div>

        {/* 2 Primary Launch Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Card 1: Exhibition Mode */}
          <div className="p-8 rounded-3xl border bg-gradient-to-br from-brand-indigo/10 via-brand-purple/5 to-transparent dark:from-slate-900 dark:to-scada-card border-brand-indigo/30 shadow-glow-indigo flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-brand-indigo text-white shadow-sm">
                  Disyorkan untuk Viva
                </span>
                <span className="text-xs font-mono text-brand-cyan font-bold">Cloudflare Live</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                Exhibition & Forensics Mode
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Antara muka khas pameran dengan paparan skrin penuh, visualisasi topologi IEEE 39-Bus hidup, butang pelancaran serangan satu-klik, dan pengesahan pemulihan automatik berperingkat.
              </p>
            </div>

            <a
              href={PROJECT_INFO.exhibitionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-2xl text-sm font-bold flex items-center justify-center gap-3 transition-all duration-200 bg-gradient-to-r from-brand-indigo to-brand-purple hover:opacity-95 text-white shadow-md hover:scale-[1.02] active:scale-95"
            >
              <Play className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Buka Live Exhibition Mode</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
            </a>
          </div>

          {/* Card 2: PYPY Operations Control Center */}
          <div className="p-8 rounded-3xl border bg-gradient-to-br from-brand-cyan/10 via-brand-emerald/5 to-transparent dark:from-slate-900 dark:to-scada-card border-brand-cyan/30 shadow-glow-cyan flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-brand-cyan text-slate-900 shadow-sm">
                  Kawalan Penuh SCADA
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">19 Perkhidmatan</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                PYPY Control Center & Telemetri
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Papan pemuka SCADA penuh memaparkan status 19 mikroservis, graf telemetri voltan 39 bas secara langsung, matriks risiko GNN/ST-GNN, dan log peristiwa audit AI Orchestrator.
              </p>
            </div>

            <a
              href={PROJECT_INFO.liveDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-2xl text-sm font-bold flex items-center justify-center gap-3 transition-all duration-200 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700 shadow-md hover:scale-[1.02] active:scale-95"
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>Buka Live Control Center</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
            </a>
          </div>

        </div>

        {/* 3-Step Demo Script for Student in Viva */}
        <div className="p-6 sm:p-8 rounded-3xl border bg-white dark:bg-scada-card border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Skrip 3 Langkah Pembentangan Live Demo Bersama Panel Penilai
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-brand-indigo">
                <span>LANGKAH 1</span>
                <span className="text-[10px] font-mono bg-indigo-500/10 px-2 py-0.5 rounded">Baseline</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Tunjukkan Grid Berada dalam Keadaan Nominal
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Tunjukkan kepada penilai bahawa semua 19 servis sihat, pemutus litar adalah <code>CLOSED</code>, dan voltan bas berada pada julat selamat ~1.04 p.u.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-rose-500">
                <span>LANGKAH 2</span>
                <span className="text-[10px] font-mono bg-rose-500/10 px-2 py-0.5 rounded">Serangan FDIA</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Uji Serangan Suntikan Data Palsu (Bus 5)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Lancarkan FDIA (+0.15 bias). Tunjukkan bagaimana amaran kritikal diaktifkan, skor TRUST menjunam, tetapi sistem <strong>menolak</strong> tindakan berbahaya (Safety Gating).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-500">
                <span>LANGKAH 3</span>
                <span className="text-[10px] font-mono bg-emerald-500/10 px-2 py-0.5 rounded">Pemulihan</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Uji Pemulihan Pemutus Litar (L_line_0)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Pelantik pemutus litar, segera tekan STOP. Tonton konsensus PPO/DQN, sandbox check lulus, arahan CLOSE diluluskan, dan paparan <strong>GRID SECURED</strong> muncul!
              </p>
            </div>

          </div>

          {/* Quick Terminal Emergency Command */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-brand-purple" />
              <span>Arahan Henti Kecemasan (Terminal):</span>
            </span>
            <code className="px-3 py-1.5 rounded-xl bg-slate-900 text-brand-cyan font-mono text-[11px] overflow-x-auto">
              docker exec smart_grid_mqtt mosquitto_pub -t grid/attack -m &apos;{JSON.stringify({ action: "STOP" })}&apos;
            </code>
          </div>

        </div>

      </div>
    </section>
  );
};
