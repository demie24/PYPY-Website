import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, RotateCcw, AlertTriangle, Zap } from 'lucide-react';
import { ATTACK_SCENARIOS_V2 } from '../../data';

interface AttacksOverlayProps {
  currentAttack: 'none' | 'fdia' | 'breaker' | 'load';
  onSelectAttack: (attack: 'none' | 'fdia' | 'breaker' | 'load') => void;
}

export const AttacksOverlay: React.FC<AttacksOverlayProps> = ({
  currentAttack,
  onSelectAttack
}) => {
  const selectedScenario = ATTACK_SCENARIOS_V2.find((s) => s.id === currentAttack) || ATTACK_SCENARIOS_V2[0];
  const isAttackActive = currentAttack !== 'none';

  return (
    <section
      id="attacks"
      className="min-h-screen relative flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-24 sm:py-28 pointer-events-none select-none"
    >
      {/* Top Left: Bold Statement & Floating Attack Selectors */}
      <div className="max-w-3xl text-left space-y-4 pointer-events-auto z-10">
        
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs">
          <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
          <span>03 // ATTACK SIMULATION</span>
        </div>

        {/* Large Statement: CHOOSE AN ATTACK */}
        <div className="space-y-1">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-slate-900 leading-none">
            CHOOSE AN ATTACK.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-500 pt-1">
            Trigger a real-world adversarial intrusion into the IEEE 39-Bus digital twin:
          </p>
        </div>

        {/* Floating Interactive Attack Selectors (Not Boring Cards) */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {ATTACK_SCENARIOS_V2.map((scenario) => {
            const isActive = currentAttack === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => onSelectAttack(scenario.id)}
                className={`group relative px-5 py-3 rounded-2xl font-mono text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-3 border shadow-sm ${
                  isActive
                    ? 'bg-red-600 text-white border-red-600 shadow-md scale-105'
                    : 'bg-white/90 backdrop-blur-md text-slate-800 border-slate-200 hover:border-red-400 hover:bg-red-50/50'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isActive ? 'bg-white animate-ping' : 'bg-red-500 group-hover:scale-125 transition-transform'
                  }`}
                />
                <span className="tracking-wide uppercase font-sans font-black">{scenario.name}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-red-700/80 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {scenario.id.toUpperCase()}
                </span>
              </button>
            );
          })}

          {isAttackActive && (
            <button
              onClick={() => onSelectAttack('none')}
              className="px-4 py-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs sm:text-sm font-mono font-bold hover:bg-emerald-100 flex items-center gap-2 transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET GRID</span>
            </button>
          )}
        </div>

      </div>

      {/* Bottom Floating Minimal Attack HUD (Only Visible When An Attack is Engaged) */}
      <div className="pointer-events-auto max-w-lg z-10 self-start sm:self-end">
        <AnimatePresence mode="wait">
          {isAttackActive ? (
            <motion.div
              key={selectedScenario.id}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-red-200 shadow-lg space-y-3"
            >
              <div className="flex items-center justify-between border-b border-red-100 pb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                    {selectedScenario.codeName}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold uppercase">
                  ACTIVE INTRUSION
                </span>
              </div>

              <div className="space-y-1 font-sans text-xs">
                <div className="text-slate-900 font-bold">
                  Target: <span className="text-red-600">{selectedScenario.target}</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {selectedScenario.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Affected Substation: <strong className="text-slate-900">{selectedScenario.targetBuses.join(', ')}</strong></span>
                <span className="text-blue-600 font-semibold">Camera Locked Target</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>GRID NORMAL • SELECT AN ATTACK VECTOR ABOVE TO OBSERVE REACTION</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};
