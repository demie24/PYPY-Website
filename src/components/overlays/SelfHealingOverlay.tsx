import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Play, RotateCcw, ArrowRight } from 'lucide-react';

interface SelfHealingOverlayProps {
  isHealed: boolean;
  onTriggerHeal: () => void;
  onReset: () => void;
}

export const SelfHealingOverlay: React.FC<SelfHealingOverlayProps> = ({
  isHealed,
  onTriggerHeal,
  onReset
}) => {
  const [activeStep, setActiveStep] = useState<number>(isHealed ? 4 : 0); // 0: Standby, 1: DETECT, 2: VALIDATE, 3: DECIDE, 4: RECOVER
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const steps = [
    { label: "DETECT", desc: "Bi-LSTM & GCN isolate corrupted telemetry vector.", color: "text-blue-600" },
    { label: "VALIDATE", desc: "PINN enforces Kirchhoff laws, rejecting bad data.", color: "text-sky-600" },
    { label: "DECIDE", desc: "AC sandbox dry-runs mitigation in 12 ms.", color: "text-purple-600" },
    { label: "RECOVER", desc: "FLISR actuates breakers, restoring 50.0 Hz balance.", color: "text-emerald-600" }
  ];

  const handleStartHealing = () => {
    setIsRunning(true);
    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);
      setTimeout(() => {
        setActiveStep(3);
        setTimeout(() => {
          setActiveStep(4);
          setIsRunning(false);
          onTriggerHeal();
        }, 900);
      }, 900);
    }, 900);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsRunning(false);
    onReset();
  };

  return (
    <section
      id="self-healing"
      className="min-h-screen relative flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-24 sm:py-28 pointer-events-none select-none"
    >
      {/* Top Left: Bold Statement & Sequential Pipeline */}
      <div className="max-w-2xl text-left space-y-6 pointer-events-auto z-10">
        
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>06 // AUTONOMOUS RECOVERY</span>
        </div>

        {/* Statement: THE GRID RECOVERS. */}
        <div className="space-y-1 sm:space-y-2">
          <h2 className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-slate-900 leading-[0.95]">
            THE GRID
          </h2>
          <h3 className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-emerald-600 leading-[0.95]">
            RECOVERS.
          </h3>
        </div>

        {/* Closed-Loop Pipeline Flow: DETECT → VALIDATE → DECIDE → RECOVER */}
        <div className="pt-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono font-black tracking-wider">
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx + 1;
              const isPassed = activeStep > idx + 1;
              return (
                <React.Fragment key={step.label}>
                  <div
                    className={`px-3.5 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 border ${
                      isCurrent
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105'
                        : isPassed
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                          : 'bg-white/80 backdrop-blur-sm text-slate-500 border-slate-200'
                    }`}
                  >
                    <span>{step.label}</span>
                    {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>

                  {idx < steps.length - 1 && (
                    <span className="text-slate-300 font-bold">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Current Step Description Callout */}
          <div className="pt-3 min-h-[44px]">
            {activeStep > 0 && activeStep <= steps.length ? (
              <motion.p
                key={activeStep}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs sm:text-sm font-mono text-slate-600"
              >
                <strong className="text-slate-900">{steps[activeStep - 1].label}:</strong>{' '}
                {steps[activeStep - 1].desc}
              </motion.p>
            ) : (
              <p className="text-xs sm:text-sm font-mono text-slate-500">
                Click the button below to initiate closed-loop self-healing:
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 pt-2">
          {!isHealed && activeStep === 0 ? (
            <button
              onClick={handleStartHealing}
              disabled={isRunning}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-mono font-bold text-xs sm:text-sm hover:bg-emerald-500 transition-all flex items-center gap-2.5 shadow-md group"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>START SELF-HEALING SEQUENCE</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-5 py-3 rounded-2xl bg-white border border-slate-300 text-slate-700 font-mono font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all flex items-center gap-2 shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESET CYCLE</span>
            </button>
          )}

          {isHealed && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-mono font-bold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>GRID RESTORED (50.00 HZ AC)</span>
            </span>
          )}
        </div>

      </div>

      {/* Right Side: Open Negative Space Where Camera Smoothly Pulls Back as Grid Turns Green */}
      <div className="hidden lg:block w-1/2" />
    </section>
  );
};
