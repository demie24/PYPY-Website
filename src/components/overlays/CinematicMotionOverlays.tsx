import React from 'react';
import { ShieldAlert, AlertTriangle, ArrowDown, Activity, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { PROJECT_INFO_V2, Bus3D, IEEE39_3D_BUSES, V2_RESULTS_METRICS, AI_MODELS_V2 } from '../../data';

interface CinematicMotionOverlaysProps {
  progress: number; // 0.00 to 1.00
  selectedBus: Bus3D | null;
  onSelectBus: (bus: Bus3D | null) => void;
}

export const CinematicMotionOverlays: React.FC<CinematicMotionOverlaysProps> = ({
  progress,
  selectedBus,
  onSelectBus
}) => {
  // =============================================================
  // SCENE 01: INTRO (0.00 - 0.12)
  // =============================================================
  const scene1Active = progress < 0.14;
  let pypyScale = 1.0;
  let pypyOpacity = 1.0;
  let pypyTracking = '0.08em';
  let subtitleOpacity = 0.0;
  let subtitleTranslateY = 20;

  if (progress < 0.06) {
    pypyScale = 1.0;
    pypyOpacity = 1.0;
    pypyTracking = '0.08em';
    subtitleOpacity = Math.min(1, (progress / 0.06) * 1.5);
    subtitleTranslateY = (1 - progress / 0.06) * 20;
  } else if (progress < 0.10) {
    pypyScale = 1.0;
    pypyOpacity = 1.0;
    pypyTracking = '0.14em';
    subtitleOpacity = 1.0;
    subtitleTranslateY = 0;
  } else if (progress < 0.14) {
    const p = (progress - 0.10) / (0.14 - 0.10);
    pypyScale = 1.0 + p * 3.5;
    pypyOpacity = Math.max(0, 1.0 - p * 1.5);
    pypyTracking = `${0.14 + p * 0.3}em`;
    subtitleOpacity = Math.max(0, 1.0 - p * 2.0);
    subtitleTranslateY = -p * 30;
  }

  // =============================================================
  // SCENE 02: IEEE 39-BUS DIGITAL TWIN (0.12 - 0.24)
  // =============================================================
  const scene2Active = progress >= 0.12 && progress < 0.24;
  let s2Opacity = 0.0;
  let s2TranslateX = -40;
  if (progress >= 0.12 && progress < 0.16) {
    const p = (progress - 0.12) / (0.16 - 0.12);
    s2Opacity = p;
    s2TranslateX = (1 - p) * -40;
  } else if (progress >= 0.16 && progress < 0.20) {
    s2Opacity = 1.0;
    s2TranslateX = 0;
  } else if (progress >= 0.20 && progress < 0.24) {
    const p = (progress - 0.20) / (0.24 - 0.20);
    s2Opacity = Math.max(0, 1.0 - p * 1.5);
    s2TranslateX = p * -30;
  }

  // =============================================================
  // SCENE 03: THE THREAT (0.24 - 0.35)
  // =============================================================
  const scene3Active = progress >= 0.24 && progress < 0.35;
  let s3Text1Opacity = 0.0;
  let s3Text2Opacity = 0.0;
  let s3HudOpacity = 0.0;
  if (progress >= 0.24 && progress < 0.28) {
    const p = (progress - 0.24) / (0.28 - 0.24);
    s3Text1Opacity = p;
  } else if (progress >= 0.28 && progress < 0.32) {
    s3Text1Opacity = 1.0;
    const p = (progress - 0.28) / (0.32 - 0.28);
    s3Text2Opacity = p;
    s3HudOpacity = p;
  } else if (progress >= 0.32 && progress < 0.35) {
    s3Text1Opacity = 1.0;
    s3Text2Opacity = 1.0;
    s3HudOpacity = 1.0;
  }

  // =============================================================
  // SCENE 04: CYBER ATTACKS TRILOGY (0.35 - 0.48)
  // =============================================================
  const scene4Active = progress >= 0.35 && progress < 0.48;
  const attackProgress = (progress - 0.35) / (0.48 - 0.35); // 0 to 1
  let activeAttackIdx = 0; // 0: FDIA, 1: Breaker, 2: Load
  if (attackProgress >= 0.33 && attackProgress < 0.66) activeAttackIdx = 1;
  else if (attackProgress >= 0.66) activeAttackIdx = 2;

  const attackScenarios = [
    {
      code: "ATTACK 01 // FDIA",
      title: "FALSE DATA INJECTION",
      target: "Bus 5 Sensor Telemetry",
      equation: "||z - Hx|| < τ  (Stealth Residual Bypass)",
      desc: "Adversary injects coordinated false measurements into Bus 5 telemetry while mathematically canceling out classical residual detectors."
    },
    {
      code: "ATTACK 02 // BREAKER TRIP",
      title: "BREAKER MANIPULATION",
      target: "Transmission Line 0 (Bus 1 - Bus 2)",
      equation: "STATUS: LINE 0 TRIPPED // CASCADE RISK",
      desc: "Unauthorized digital trip signal forces circuit breaker open on critical inter-tie line, threatening cascade overloads onto adjacent paths."
    },
    {
      code: "ATTACK 03 // LOAD INFILTRATION",
      title: "LOAD ALTERATION",
      target: "Industrial Substations (Bus 4, 8, 20)",
      equation: "VOLTAGE SAG: < 0.90 p.u. DETECTED",
      desc: "Coordinated manipulation of reactive power demand across major consumer buses aiming to trigger voltage collapse cascade."
    }
  ];

  // =============================================================
  // SCENE 05: INTERACTIVE DIGITAL TWIN (0.48 - 0.60)
  // =============================================================
  const scene5Active = progress >= 0.48 && progress < 0.60;
  const currentInspectorBus = selectedBus || IEEE39_3D_BUSES["Bus_5"];

  // =============================================================
  // SCENE 06: AI DEFENCE ASSEMBLY (0.60 - 0.72)
  // =============================================================
  const scene6Active = progress >= 0.60 && progress < 0.72;
  const aiProgress = (progress - 0.60) / (0.72 - 0.60);

  // =============================================================
  // SCENE 07: AUTONOMOUS SELF-HEALING (0.72 - 0.83)
  // =============================================================
  const scene7Active = progress >= 0.72 && progress < 0.83;
  const healProgress = (progress - 0.72) / (0.83 - 0.72);
  let healStep = 1;
  if (healProgress >= 0.25 && healProgress < 0.50) healStep = 2;
  else if (healProgress >= 0.50 && healProgress < 0.75) healStep = 3;
  else if (healProgress >= 0.75) healStep = 4;

  // =============================================================
  // SCENE 08: EMPIRICAL RESULTS (0.83 - 0.93)
  // =============================================================
  const scene8Active = progress >= 0.83 && progress < 0.93;
  const resultsProgress = (progress - 0.83) / (0.93 - 0.83);

  // =============================================================
  // SCENE 09: FINAL STATEMENT & LIVE CTA (0.93 - 1.00)
  // =============================================================
  const scene9Active = progress >= 0.93;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-10 overflow-hidden">
      
      {/* Dynamic Red Threat Vignette in Scenes 03 and 04 */}
      {(scene3Active || scene4Active) && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at 70% 50%, rgba(239, 68, 68, 0.32) 0%, rgba(239, 68, 68, 0.10) 45%, transparent 80%)'
          }}
        />
      )}

      {/* ========================================================= */}
      {/* SCENE 01: INTRO (0.00 - 0.12)                             */}
      {/* ========================================================= */}
      {scene1Active && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div
            style={{
              transform: `scale(${pypyScale})`,
              opacity: pypyOpacity,
              letterSpacing: pypyTracking,
              transition: 'letter-spacing 0.08s linear'
            }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono tracking-widest text-blue-400 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>AI-DRIVEN CYBER-PHYSICAL DEFENCE</span>
            </div>

            <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-sans font-black tracking-tight text-white leading-none drop-shadow-[0_10px_35px_rgba(0,113,227,0.35)]">
              PYPY
            </h1>

            <div
              style={{
                opacity: subtitleOpacity,
                transform: `translate3d(0, ${subtitleTranslateY}px, 0)`
              }}
              className="space-y-2 pt-2"
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-sans font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 tracking-wider">
                {PROJECT_INFO_V2.descriptor}
              </h2>
              <p className="text-xs sm:text-sm md:text-base font-mono font-medium text-slate-400 tracking-widest uppercase max-w-xl mx-auto">
                {PROJECT_INFO_V2.subtitle}
              </p>
            </div>
          </div>

          {progress < 0.05 && (
            <div className="absolute bottom-10 flex flex-col items-center gap-2 text-slate-400 font-mono text-xs tracking-widest uppercase">
              <span>SCROLL TO ADVANCE CINEMATIC SCENE</span>
              <ArrowDown className="w-4 h-4 animate-bounce text-blue-400" />
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENE 02: IEEE 39-BUS DIGITAL TWIN (0.12 - 0.24)          */}
      {/* ========================================================= */}
      {scene2Active && (
        <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20">
          <div
            style={{
              opacity: s2Opacity,
              transform: `translate3d(${s2TranslateX}px, 0, 0)`
            }}
            className="max-w-2xl text-left space-y-3 pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/40 text-xs font-mono text-blue-400 shadow-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>SCENE 02 // DIGITAL TWIN NETWORK</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tight text-white leading-[0.92]">
                IEEE 39-BUS
              </h2>
              <h3 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-blue-400 leading-[0.92]">
                DIGITAL TWIN.
              </h3>
            </div>

            <p className="text-xs sm:text-sm font-mono text-slate-400 pt-2 max-w-lg leading-relaxed">
              New England 345 kV Bulk Power Grid. Real-time AC power flow simulated across 39 buses, 46 transmission corridors, and 10 synchronous generators.
            </p>
          </div>

          <div
            style={{ opacity: s2Opacity }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-slate-800/80 text-xs font-mono text-slate-400 pointer-events-auto"
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-200 font-bold">GRID NOMINAL: 50.00 HZ</span>
              </div>
              <div className="hidden md:inline text-slate-600">•</div>
              <div className="hidden md:inline">
                VOLTAGE: <strong className="text-slate-200">1.000 p.u. (SYNCHRONOUS PHASE LOCKED)</strong>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span>CONTINUE SCROLLING TO TRIGGER ATTACK SEQUENCE</span>
              <span className="text-blue-400 font-bold animate-pulse">↓</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENE 03: THE THREAT (0.24 - 0.35)                        */}
      {/* ========================================================= */}
      {scene3Active && (
        <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20">
          <div className="max-w-2xl text-left space-y-3 pointer-events-auto">
            <div
              style={{ opacity: s3Text1Opacity }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/50 text-xs font-mono font-bold text-red-400 shadow-md"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>SCENE 03 // ADVERSARIAL THREAT INTRUSION</span>
            </div>

            <div
              style={{ opacity: s3Text1Opacity }}
              className="text-5xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tight text-white leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
            >
              THE GRID <br />
              IS CONNECTED.
            </div>

            <div
              style={{ opacity: s3Text2Opacity }}
              className="text-5xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tight text-red-500 leading-none pt-3 drop-shadow-[0_0_45px_rgba(239,68,68,0.85)] origin-left"
            >
              SO IS <br />
              THE THREAT.
            </div>
          </div>

          <div
            style={{ opacity: s3HudOpacity }}
            className="self-end max-w-md w-full p-6 rounded-2xl bg-black/85 backdrop-blur-xl border border-red-500/60 shadow-[0_0_40px_rgba(239,68,68,0.35)] space-y-3 pointer-events-auto"
          >
            <div className="flex items-center justify-between border-b border-red-900/60 pb-2.5">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold">
                <AlertTriangle className="w-4 h-4 animate-ping text-red-500" />
                <span>INTRUSION // FDIA-BUS5-INJECTION</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-mono font-bold uppercase">
                ATTACK ACTIVE
              </span>
            </div>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="text-slate-300">Target Substation: <strong className="text-red-400">Bus 5 (Critical Substation)</strong></div>
              <div className="p-2.5 rounded-xl bg-red-950/50 border border-red-900/70 text-red-300 text-[11px]">
                <code>||z - Hx|| &lt; &tau; (Stealth BDD Bypass Active)</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENE 04: CYBER ATTACKS TRILOGY (0.35 - 0.48)             */}
      {/* ========================================================= */}
      {scene4Active && (
        <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20">
          <div className="max-w-2xl text-left space-y-3 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/50 text-xs font-mono font-bold text-red-400 shadow-md">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
              <span>{attackScenarios[activeAttackIdx].code}</span>
            </div>

            <h2 className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-white leading-none">
              {attackScenarios[activeAttackIdx].title}
            </h2>

            <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-lg leading-relaxed pt-2">
              {attackScenarios[activeAttackIdx].desc}
            </p>
          </div>

          <div className="self-end max-w-md w-full p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-red-500/60 shadow-2xl space-y-2 pointer-events-auto">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-red-400 font-bold uppercase">{attackScenarios[activeAttackIdx].target}</span>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-bold">ACTIVE CORRIDOR</span>
            </div>
            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-900/60 text-red-300 text-xs font-mono">
              <code>{attackScenarios[activeAttackIdx].equation}</code>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENE 05: INTERACTIVE DIGITAL TWIN (0.48 - 0.60)          */}
      {/* ========================================================= */}
      {scene5Active && (
        <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20">
          <div className="max-w-xl text-left space-y-3 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/40 text-xs font-mono text-blue-400 shadow-md">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <span>SCENE 05 // INTERACTIVE SCADA TELEMETRY</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-white">
              CLICK ANY SUBSTATION.
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400">
              Interactive 3D inspection. Click any bus node directly in space to inspect live SCADA telemetry:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {["Bus_1", "Bus_5", "Bus_16", "Bus_30", "Bus_39"].map((id) => (
                <button
                  key={id}
                  onClick={() => onSelectBus(IEEE39_3D_BUSES[id])}
                  className={`px-3 py-1 rounded-xl text-xs font-mono border transition-all ${
                    currentInspectorBus.id === id
                      ? 'bg-blue-600 text-white border-blue-400 font-bold'
                      : 'bg-black/60 text-slate-300 border-slate-700 hover:border-blue-400'
                  }`}
                >
                  {IEEE39_3D_BUSES[id].label} ({IEEE39_3D_BUSES[id].type})
                </button>
              ))}
            </div>
          </div>

          {/* Floating Telemetry Inspector */}
          <div className="self-end max-w-sm w-full p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-blue-500/50 shadow-2xl space-y-3 pointer-events-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">SUBSTATION TELEMETRY</span>
                <h4 className="text-base font-sans font-bold text-white">{currentInspectorBus.name}</h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border bg-blue-900/40 text-blue-300 border-blue-500/40">
                {currentInspectorBus.type}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[9px] text-slate-400 uppercase block">VOLTAGE</span>
                <span className="text-base font-bold text-blue-400">{currentInspectorBus.baseVoltage.toFixed(3)} p.u.</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[9px] text-slate-400 uppercase block">FREQUENCY</span>
                <span className="text-base font-bold text-emerald-400">50.00 Hz</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[9px] text-slate-400 uppercase block">ACTIVE POWER</span>
                <span className="text-base font-bold text-white">{currentInspectorBus.activePowerMW.toFixed(1)} MW</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[9px] text-slate-400 uppercase block">REACTIVE POWER</span>
                <span className="text-base font-bold text-white">{currentInspectorBus.reactivePowerMVAR.toFixed(1)} MVAR</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENE 06: AI DEFENCE ASSEMBLY (0.60 - 0.72)               */}
      {/* ========================================================= */}
      {scene6Active && (
        <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20">
          <div className="max-w-2xl text-left space-y-4 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/40 text-xs font-mono text-blue-400 shadow-md">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>SCENE 06 // AI MULTI-LAYER DEFENCE ASSEMBLY</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tight text-white leading-none">
                FOUR MODELS.
              </h2>
              <h3 className="text-5xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tight text-blue-400 leading-none pt-2">
                ONE DEFENCE SYSTEM.
              </h3>
            </div>

            <div className="space-y-2 pt-3 max-w-lg">
              {AI_MODELS_V2.map((m, idx) => (
                <div
                  key={m.id}
                  style={{
                    opacity: aiProgress >= idx * 0.25 ? 1 : 0.25,
                    transform: `translateX(${aiProgress >= idx * 0.25 ? 0 : -20}px)`,
                    transition: 'all 0.3s ease'
                  }}
                  className="p-3 rounded-xl bg-black/60 backdrop-blur-md border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center font-mono text-xs font-bold">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-sans font-bold text-white">{m.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">{m.role}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">{m.confidence}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENE 07: AUTONOMOUS SELF-HEALING (0.72 - 0.83)           */}
      {/* ========================================================= */}
      {scene7Active && (
        <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20">
          <div className="max-w-2xl text-left space-y-4 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-xs font-mono font-bold text-emerald-400 shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>SCENE 07 // CLOSED-LOOP IMMUNITY</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tight text-white leading-none">
                THE GRID
              </h2>
              <h3 className="text-5xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tight text-emerald-400 leading-none pt-2">
                RECOVERS.
              </h3>
            </div>

            {/* Pipeline Flow: DETECT → VALIDATE → DECIDE → RECOVER */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3 text-xs sm:text-sm font-mono font-black tracking-wider">
              {[
                { title: "DETECT", desc: "Bi-LSTM & GCN isolate corrupted sensor vector" },
                { title: "VALIDATE", desc: "PINN enforces Kirchhoff laws, rejecting bad data" },
                { title: "DECIDE", desc: "AC sandbox dry-runs mitigation in 12 ms" },
                { title: "RECOVER", desc: "FLISR rebalances power & restores 50.0 Hz nominal" }
              ].map((step, idx) => {
                const isPassed = healStep >= idx + 1;
                return (
                  <React.Fragment key={step.title}>
                    <div
                      className={`px-4 py-2 rounded-xl transition-all border ${
                        isPassed
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg scale-105'
                          : 'bg-black/60 text-slate-500 border-slate-800'
                      }`}
                    >
                      {step.title}
                    </div>
                    {idx < 3 && <span className="text-slate-600 font-bold">→</span>}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="self-end px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-400 font-mono text-xs flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GRID RESTORED: NOMINAL 50.00 HZ AC (ALL NODES IMMUNE)</span>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENE 08: EMPIRICAL RESULTS (0.83 - 0.93)                 */}
      {/* ========================================================= */}
      {scene8Active && (
        <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-14 lg:p-20">
          <div className="max-w-xl text-left space-y-3 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/40 text-xs font-mono text-blue-400 shadow-md">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>SCENE 08 // EMPIRICAL VALIDATION</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-white leading-none">
                PROVE THE
              </h2>
              <h3 className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-blue-400 leading-none">
                RESULTS.
              </h3>
            </div>
          </div>

          {/* Large Integrated Metrics (No Dashboard Cards) */}
          <div className="my-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full pointer-events-auto">
            {[
              { val: "99.81%", label: "Detection Accuracy", sub: "Multi-Model AI Consensus on FDIA" },
              { val: "12 ms", label: "Response Latency", sub: "Newton-Raphson Rehearsal (<150ms Limit)" },
              { val: "0%", label: "BDD Bypass", sub: "Zero Stealth Attacks Evade PINN Governor" },
              { val: "$420K", label: "Estimated Savings", sub: "Annual Blackout & Equipment Preservation" }
            ].map((m, idx) => {
              const isRevealed = resultsProgress >= idx * 0.10;
              return (
                <div
                  key={m.label}
                  style={{
                    opacity: isRevealed ? 1 : 0.35,
                    transform: `translateY(${isRevealed ? 0 : 20}px)`,
                    transition: 'all 0.35s ease'
                  }}
                  className="space-y-2 text-left"
                >
                  <div className="text-6xl sm:text-7xl font-sans font-black tracking-tight text-white leading-none">
                    {m.val}
                  </div>
                  <h4 className="text-base font-sans font-bold text-blue-400">{m.label}</h4>
                  <p className="text-xs font-mono text-slate-400">{m.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENE 09: FINAL PYPY & LIVE CTA (0.93 - 1.00)             */}
      {/* ========================================================= */}
      {scene9Active && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 pointer-events-auto">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-xs font-mono tracking-widest text-emerald-400 shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>SYSTEM SECURED • NOMINAL 50.0 HZ EQUILIBRIUM</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-7xl sm:text-9xl font-sans font-black tracking-tight text-white leading-none">
                PYPY
              </h2>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-sans font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 tracking-wider">
                {PROJECT_INFO_V2.descriptor}
              </h3>
            </div>

            <p className="text-xs sm:text-sm md:text-base font-mono font-medium text-slate-300 tracking-widest uppercase max-w-xl mx-auto">
              {PROJECT_INFO_V2.subtitle}
            </p>

            <div className="pt-4">
              <a
                href={PROJECT_INFO_V2.liveDashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-sans font-bold text-base text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/40 shadow-[0_10px_35px_rgba(0,113,227,0.45)] transition-all group"
              >
                <span>OPEN LIVE DASHBOARD</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="block text-xs font-mono text-slate-500 mt-2.5">
                Cloudflare Quick Tunnel: cleaner-simply-moss-respected.trycloudflare.com
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
