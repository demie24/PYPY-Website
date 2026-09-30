import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  ShieldAlert, 
  Cpu, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  CheckCircle2, 
  Radio, 
  Zap,
  ArrowRight,
  Flame,
  Clock,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ATTACK_SCENARIOS, AttackType } from '../data';

type SimulationState = 
  | 'normal' 
  | 'attack_injected' 
  | 'anomaly_detected' 
  | 'ai_analysis' 
  | 'operator_decision' 
  | 'grid_recovery';

export const AttackSimulationSection: React.FC = () => {
  const [selectedAttack, setSelectedAttack] = useState<AttackType>(ATTACK_SCENARIOS[0]);
  const [simState, setSimState] = useState<SimulationState>('normal');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [confidenceScore, setConfidenceScore] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const steps = [
    { key: 'normal', label: 'NORMAL GRID', num: 1, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { key: 'attack_injected', label: 'ATTACK INJECTED', num: 2, color: 'text-red-600 bg-red-50 border-red-200' },
    { key: 'anomaly_detected', label: 'ANOMALY DETECTED', num: 3, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { key: 'ai_analysis', label: 'AI ANALYSIS', num: 4, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
    { key: 'operator_decision', label: 'OPERATOR DECISION', num: 5, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { key: 'grid_recovery', label: 'GRID RECOVERY', num: 6, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  ];

  const currentStepIdx = steps.findIndex((s) => s.key === simState);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setConfidenceScore(0);
    setSimState('normal');

    // Step 1 -> Step 2: Attack injected (after 800ms)
    timerRef.current = setTimeout(() => {
      setSimState('attack_injected');

      // Step 2 -> Step 3: Anomaly detected (after 1400ms)
      timerRef.current = setTimeout(() => {
        setSimState('anomaly_detected');

        // Step 3 -> Step 4: AI Analysis & Confidence (after 1500ms)
        timerRef.current = setTimeout(() => {
          setSimState('ai_analysis');
          setConfidenceScore(98.7);

          // Step 4 -> Step 5: Operator Decision & Sandbox (after 1800ms)
          timerRef.current = setTimeout(() => {
            setSimState('operator_decision');

            // Step 5 -> Step 6: Grid Recovery (after 1800ms)
            timerRef.current = setTimeout(() => {
              setSimState('grid_recovery');
              setIsRunning(false);
            }, 1800);

          }, 1800);

        }, 1500);

      }, 1400);

    }, 800);
  };

  const resetSimulation = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsRunning(false);
    setSimState('normal');
    setConfidenceScore(0);
  };

  return (
    <section id="simulation" className="py-24 sm:py-32 bg-white border-t border-black/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-600 mb-4"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Demonstrasi Interaktif Masa Nyata</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight uppercase"
          >
            Simulate Cyber Attacks.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#86868b] leading-relaxed font-normal"
          >
            Pilih vektor serangan dan laksanakan simulasi untuk memerhatikan tindak balas berantai: suntikan serangan, pengesanan AI multi-model, validasi sandbox AC, hingga pemulihan kendiri autonomi.
          </motion.p>
        </div>

        {/* Attack Type Selector Tabs (FDIA, BREAKER, LOAD) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {ATTACK_SCENARIOS.map((scenario) => {
            const isSelected = selectedAttack.id === scenario.id;
            return (
              <button
                key={scenario.id}
                disabled={isRunning}
                onClick={() => {
                  setSelectedAttack(scenario);
                  resetSimulation();
                }}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#1d1d1f] text-white shadow-lg scale-[1.02]'
                    : 'bg-[#f5f5f7] text-[#515154] hover:bg-white hover:border-black/[0.08] border border-transparent'
                }`}
              >
                <ShieldAlert className={`w-4 h-4 ${isSelected ? 'text-red-400' : 'text-[#86868b]'}`} />
                <span>{scenario.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-black/[0.06] text-[#86868b]'
                }`}>
                  {scenario.target.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Simulation Card Console */}
        <div className="apple-card p-6 sm:p-10 bg-gradient-to-b from-[#fbfbfd] via-white to-[#fbfbfd] shadow-2xl border-black/[0.08] relative overflow-hidden">
          
          {/* Top Bar with Run Button & State Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold text-[#86868b] uppercase">Sasaran Terpilih:</span>
                <span className="text-xs font-mono font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                  {selectedAttack.target}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1d1d1f] tracking-tight">
                {selectedAttack.name} Demonstrator
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={resetSimulation}
                disabled={isRunning}
                className="apple-button-secondary text-xs !py-3 !px-4 flex items-center gap-1.5"
                title="Tetapkan Semula ke Grid Normal"
              >
                <RotateCcw className="w-4 h-4 text-[#86868b]" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={runSimulation}
                disabled={isRunning}
                className={`apple-button-primary text-xs sm:text-sm !py-3 !px-6 shadow-xl flex items-center gap-2 ${
                  isRunning 
                    ? 'opacity-60 cursor-not-allowed bg-[#86868b]' 
                    : 'shadow-blue-500/25'
                }`}
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isRunning ? 'SIMULASI SEDANG BERJALAN...' : 'RUN SIMULATION'}</span>
              </button>
            </div>
          </div>

          {/* Sequence Progress Bar: NORMAL -> ATTACK -> ANOMALY -> AI -> DECISION -> RECOVERY */}
          <div className="my-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
              {steps.map((st, idx) => {
                const isActive = st.key === simState;
                const isPassed = currentStepIdx > idx;

                return (
                  <div
                    key={st.key}
                    className={`p-3 rounded-xl border text-center transition-all duration-300 relative ${
                      isActive 
                        ? `${st.color} shadow-md scale-[1.03] font-black` 
                        : isPassed
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-700 font-bold opacity-90'
                          : 'bg-[#f5f5f7] border-black/[0.04] text-[#86868b] font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="text-[10px] font-mono">0{st.num}</span>
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />}
                      {isActive && <span className="w-2 h-2 rounded-full bg-current animate-ping" />}
                    </div>
                    <span className="text-[11px] uppercase tracking-tight block">
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Visual Arena: Simulated Substation Mesh & Telemetry Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visual Grid State Canvas (7 Cols) */}
            <div className="lg:col-span-7 apple-card p-6 bg-white border-black/[0.06] shadow-sm flex flex-col justify-between relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.04]">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${
                    simState === 'normal' || simState === 'grid_recovery'
                      ? 'bg-[#10b981]'
                      : simState === 'attack_injected'
                        ? 'bg-red-500 animate-ping'
                        : 'bg-amber-500 animate-pulse'
                  }`} />
                  <span className="text-xs font-bold font-mono uppercase text-[#1d1d1f]">
                    Status Grid: {simState.replace('_', ' ')}
                  </span>
                </div>

                <span className="text-xs font-mono text-[#86868b]">
                  {simState === 'grid_recovery' ? 'GRID SECURED' : 'IEEE 39-Bus Cluster'}
                </span>
              </div>

              {/* Simplified Visual Cluster Representation */}
              <div className="h-64 sm:h-72 w-full my-4 relative flex items-center justify-center">
                
                <svg viewBox="0 0 600 280" className="w-full h-full select-none">
                  {/* Grid Lines */}
                  <line 
                    x1="120" y1="140" x2="280" y2="80" 
                    stroke={simState === 'attack_injected' ? "#ef4444" : "#cbd5e1"} 
                    strokeWidth={simState === 'attack_injected' ? "3" : "2"}
                    className={simState === 'attack_injected' ? "animate-pulse" : ""}
                  />
                  <line 
                    x1="280" y1="80" x2="460" y2="140" 
                    stroke={simState === 'normal' || simState === 'grid_recovery' ? "#10b981" : "#cbd5e1"} 
                    strokeWidth="2" 
                  />
                  <line 
                    x1="120" y1="140" x2="280" y2="200" 
                    stroke="#cbd5e1" 
                    strokeWidth="2" 
                  />
                  <line 
                    x1="280" y1="200" x2="460" y2="140" 
                    stroke="#cbd5e1" 
                    strokeWidth="2" 
                  />

                  {/* Connecting bus nodes */}
                  {/* Bus 1 */}
                  <g transform="translate(120, 140)">
                    <circle r="18" fill="#f0fdf4" stroke="#10b981" strokeWidth="2.5" />
                    <text y="4" textAnchor="middle" className="text-[12px] font-bold fill-[#10b981]">B1</text>
                  </g>

                  {/* Bus 5 (Target of FDIA) */}
                  <g transform="translate(280, 80)">
                    {simState === 'attack_injected' && (
                      <circle r="36" fill="#fee2e2" opacity="0.6" className="animate-ping" />
                    )}
                    <circle 
                      r="22" 
                      fill={
                        simState === 'attack_injected' 
                          ? '#fee2e2' 
                          : simState === 'anomaly_detected' 
                            ? '#fef3c7' 
                            : simState === 'grid_recovery' 
                              ? '#dcfce7' 
                              : '#f0fdf4'
                      } 
                      stroke={
                        simState === 'attack_injected' 
                          ? '#ef4444' 
                          : simState === 'anomaly_detected' 
                            ? '#f59e0b' 
                            : '#10b981'
                      } 
                      strokeWidth={simState === 'attack_injected' ? "3.5" : "2.5"} 
                    />
                    <text y="5" textAnchor="middle" className="text-[12px] font-black fill-[#1d1d1f]">
                      {simState === 'attack_injected' ? '!' : 'B5'}
                    </text>
                  </g>

                  {/* Bus 4 */}
                  <g transform="translate(280, 200)">
                    <circle r="18" fill="#f0fdf4" stroke="#10b981" strokeWidth="2.5" />
                    <text y="4" textAnchor="middle" className="text-[12px] font-bold fill-[#10b981]">B4</text>
                  </g>

                  {/* Bus 39 / Slack Gen */}
                  <g transform="translate(460, 140)">
                    <rect x="-18" y="-18" width="36" height="36" rx="10" fill="#e0f2fe" stroke="#0071e3" strokeWidth="2.5" />
                    <text y="4" textAnchor="middle" className="text-[12px] font-bold fill-[#0071e3]">G30</text>
                  </g>
                </svg>

                {/* Overlay Floating Status Alert */}
                {simState === 'attack_injected' && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-4 p-3 rounded-xl bg-red-600 text-white text-xs font-bold shadow-lg flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4 animate-bounce" />
                    <span>SUNTIKAN DATA PALSU DILAKUKAN KE ATAS BUS 5</span>
                  </motion.div>
                )}

                {simState === 'grid_recovery' && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-4 p-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>GRID STABIL: PEMULIHAN SELESAI (100% RECOVERY)</span>
                  </motion.div>
                )}

              </div>

              {/* Bottom State Caption */}
              <div className="p-3 rounded-xl bg-[#f5f5f7] text-xs text-[#515154] leading-relaxed">
                {simState === 'normal' && "Grid beroperasi dalam keadaan nominal. Aliran kuasa AC seimbang pada semua 39 bas."}
                {simState === 'attack_injected' && `Vektor serangan ${selectedAttack.name} disuntik. Data telemetri voltan dipinda untuk mencetuskan kekeliruan pembacaan.`}
                {simState === 'anomaly_detected' && "Pengesan anomali berasaskan Bad Data Residual mencatatkan sisihan abnormal. Amaran aras pertama dicetuskan."}
                {simState === 'ai_analysis' && "Enjin AI (LSTM + GNN + PINN) mengesahkan serangan berniat jahat dengan tahap keyakinan 98.7%."}
                {simState === 'operator_decision' && "PPO + DQN meluluskan pelan pembetulan setelah disahkan lulus ujian AC Restoration Sandbox (13.47 ms)."}
                {simState === 'grid_recovery' && "Tindakan pemulihan dilaksanakan. Grid kembali ke voltan nominal 1.005 p.u. Status: GRID SECURED."}
              </div>

            </div>

            {/* Live Telemetry Log & Metrics (5 Cols) */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              
              {/* AI Confidence Card */}
              <div className="apple-card p-5 bg-white border-black/[0.06] shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#86868b]">
                    Keyakinan Pengesanan AI
                  </span>
                  <Cpu className="w-4 h-4 text-[#0071e3]" />
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-black text-[#1d1d1f]">
                    {confidenceScore > 0 ? `${confidenceScore}%` : '--'}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    {confidenceScore > 0 ? 'High Confidence' : 'Menunggu Isyarat'}
                  </span>
                </div>

                <div className="w-full bg-[#f5f5f7] h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#0071e3] to-[#06b6d4] h-full transition-all duration-700 ease-out"
                    style={{ width: `${confidenceScore}%` }}
                  />
                </div>
              </div>

              {/* Sandbox Rehearsal Stat */}
              <div className="apple-card p-5 bg-white border-black/[0.06] shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#86868b]">
                    AC Restoration Sandbox
                  </span>
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
                
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-[#1d1d1f]">
                    13.47 ms
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Target &lt; 150 ms (PASSED)
                  </span>
                </div>
                <p className="text-[11px] text-[#86868b] mt-1">
                  Pengesahan aliran kuasa Newton-Raphson sebelum arahan pemutus litar dihantar.
                </p>
              </div>

              {/* Attack Narrative Box */}
              <div className="apple-card p-5 bg-[#f5f5f7] border-black/[0.04]">
                <h4 className="text-xs font-extrabold uppercase text-[#1d1d1f] mb-1">
                  Kesan Serangan & Pertahanan:
                </h4>
                <p className="text-xs text-[#515154] leading-relaxed mb-2">
                  <strong>Kesan:</strong> {selectedAttack.impact}
                </p>
                <p className="text-xs text-[#0071e3] font-semibold leading-relaxed">
                  <strong>Tindakan PYPY:</strong> {selectedAttack.defenseAction}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
