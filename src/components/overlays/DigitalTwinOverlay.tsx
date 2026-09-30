import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircuitBoard, Zap, Activity } from 'lucide-react';
import { Bus3D, IEEE39_3D_BUSES } from '../../data';

interface DigitalTwinOverlayProps {
  selectedBus: Bus3D | null;
  onSelectBus: (bus: Bus3D) => void;
}

export const DigitalTwinOverlay: React.FC<DigitalTwinOverlayProps> = ({
  selectedBus,
  onSelectBus
}) => {
  const current = selectedBus || IEEE39_3D_BUSES["Bus_5"];
  const quickBuses = ["Bus_1", "Bus_5", "Bus_16", "Bus_30", "Bus_39"];

  return (
    <section
      id="digital-twin"
      className="min-h-screen relative flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-24 sm:py-28 pointer-events-none select-none"
    >
      {/* Top Left: Large Editorial Statement */}
      <div className="max-w-xl text-left space-y-4 pointer-events-auto z-10">
        
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs">
          <CircuitBoard className="w-3.5 h-3.5 text-blue-600" />
          <span>04 // DIGITAL TWIN ARCHITECTURE</span>
        </div>

        {/* Large Typography: IEEE 39-BUS DIGITAL TWIN */}
        <div className="space-y-1">
          <h2 className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-slate-900 leading-[0.95]">
            IEEE 39-BUS
          </h2>
          <h3 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-blue-600 leading-[0.95]">
            DIGITAL TWIN.
          </h3>
        </div>

        <p className="text-xs sm:text-sm font-mono text-slate-500 pt-1">
          Interactive cyber-physical representation. Click any 3D node in space or select a critical bus below:
        </p>

        {/* Quick Substation Selector Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {quickBuses.map((id) => {
            const b = IEEE39_3D_BUSES[id];
            const isCurrent = current.id === id;
            return (
              <button
                key={id}
                onClick={() => onSelectBus(b)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all border shadow-xs ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-white/90 backdrop-blur-md text-slate-700 border-slate-200 hover:border-blue-400'
                }`}
              >
                {b.label} ({b.type === 'generator' ? 'Gen' : 'Sub'})
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Right: Clean, Minimal Telemetry Inspector */}
      <div className="self-end pointer-events-auto max-w-sm w-full z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-slate-200/90 shadow-lg space-y-3.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block">
                  SCADA TELEMETRY
                </span>
                <h4 className="text-base font-sans font-bold text-slate-900">
                  {current.name}
                </h4>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                current.type === 'generator'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : current.type === 'load'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {current.type}
              </span>
            </div>

            {/* Compact Numbers */}
            <div className="grid grid-cols-2 gap-2 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase font-semibold block">VOLTAGE</span>
                <span className="text-base font-bold text-blue-600">{current.baseVoltage.toFixed(3)} p.u.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase font-semibold block">FREQUENCY</span>
                <span className="text-base font-bold text-emerald-600">50.00 Hz</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase font-semibold block">ACTIVE POWER</span>
                <span className="text-base font-bold text-slate-800">{current.activePowerMW.toFixed(1)} MW</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[9px] text-slate-400 uppercase font-semibold block">REACTIVE POWER</span>
                <span className="text-base font-bold text-slate-800">{current.reactivePowerMVAR.toFixed(1)} MVAR</span>
              </div>
            </div>

            {/* Status Footer */}
            <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Nominal Grid State</span>
              </span>
              <span className="text-blue-600 font-semibold">{current.id}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
};
