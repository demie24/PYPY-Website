import React, { useState } from 'react';
import { 
  CircuitBoard, 
  Activity, 
  Zap, 
  Sparkles, 
  Info, 
  Layers, 
  Eye, 
  Search, 
  Gauge, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { IEEE39_BUSES, IEEE39_LINES, BusNode } from '../data';

export const DigitalTwinSection: React.FC = () => {
  const [selectedBusId, setSelectedBusId] = useState<string>("Bus_5");
  const [hoveredBusId, setHoveredBusId] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'generators' | 'loads'>('all');
  const [showPowerFlows, setShowPowerFlows] = useState<boolean>(true);

  const activeBusId = hoveredBusId || selectedBusId;
  const currentBus = IEEE39_BUSES[activeBusId] || IEEE39_BUSES["Bus_5"];

  // Find all lines connected to active bus
  const connectedLines = IEEE39_LINES.filter(
    (l) => l.from === activeBusId || l.to === activeBusId
  );

  const connectedBusIds = new Set<string>();
  connectedLines.forEach((l) => {
    connectedBusIds.add(l.from);
    connectedBusIds.add(l.to);
  });

  return (
    <section id="digital-twin" className="py-24 sm:py-32 bg-[#fbfbfd] border-t border-black/[0.04] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#06b6d4]/10 text-[#06b6d4] mb-4"
          >
            <CircuitBoard className="w-3.5 h-3.5" />
            <span>Model Kembar Digital Maya Penuh</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight uppercase"
          >
            Kembar Digital IEEE 39-Bus.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#86868b] leading-relaxed font-normal"
          >
            Replikasi tepat sistem grid transmisi New England dengan 39 bas, 10 janakuasa, dan 46 talian penghantaran kuasa elektrik AC berketepatan tinggi.
          </motion.p>
        </div>

        {/* Filter Controls & Toggle Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 p-1 bg-[#f5f5f7] rounded-full border border-black/[0.04]">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-[#1d1d1f] shadow-sm'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              Semua 39 Bas
            </button>
            <button
              onClick={() => setFilterMode('generators')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterMode === 'generators'
                  ? 'bg-white text-[#0071e3] shadow-sm'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              10 Janakuasa (G30 - G39)
            </button>
            <button
              onClick={() => setFilterMode('loads')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterMode === 'loads'
                  ? 'bg-white text-[#10b981] shadow-sm'
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              Pencawang Beban Utama
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPowerFlows(!showPowerFlows)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                showPowerFlows
                  ? 'bg-blue-50 text-[#0071e3] border-blue-200'
                  : 'bg-white text-[#86868b] border-black/[0.08]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{showPowerFlows ? 'Aliran Kuasa Animasi: AKTIF' : 'Aliran Kuasa: DIMATIKAN'}</span>
            </button>

            <span className="hidden sm:inline text-xs font-mono text-[#86868b]">
              39 Bas • 46 Talian AC
            </span>
          </div>
        </div>

        {/* Full-Width Interactive Topology Canvas Card */}
        <div className="apple-card p-4 sm:p-8 bg-white shadow-2xl relative overflow-hidden border-black/[0.08]">
          
          {/* Top Canvas Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-black/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
              <span className="text-xs font-bold text-[#1d1d1f]">
                Topologi Masa Nyata: {currentBus.name} dipilih
              </span>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-[11px] font-bold text-[#86868b]">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-md bg-[#0071e3] text-white flex items-center justify-center text-[8px]">G</div>
                <span>Janakuasa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                <span>Pencawang Beban</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <span>Nod Persimpangan</span>
              </div>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="relative w-full h-[520px] sm:h-[620px] flex items-center justify-center bg-gradient-to-b from-[#fdfdfe] to-[#f8f9fa] rounded-2xl border border-black/[0.03]">
            <svg 
              viewBox="0 0 2000 980" 
              className="w-full h-full select-none"
            >
              <defs>
                <pattern id="dt-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="#e5e5ea" />
                </pattern>
                <filter id="bus-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <rect width="2000" height="980" fill="url(#dt-dots)" />

              {/* Transmission Lines (All 46 lines) */}
              {IEEE39_LINES.map((line) => {
                const from = IEEE39_BUSES[line.from];
                const to = IEEE39_BUSES[line.to];
                if (!from || !to) return null;

                const isConnectedToActive = line.from === activeBusId || line.to === activeBusId;

                return (
                  <g key={line.id}>
                    {/* Underlying Wire */}
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={isConnectedToActive ? "#0071e3" : "#cbd5e1"}
                      strokeWidth={isConnectedToActive ? "3.5" : "1.8"}
                      strokeDasharray={line.isTrafo ? "6,4" : undefined}
                      opacity={isConnectedToActive ? 1 : 0.65}
                      className="transition-all duration-300"
                    />

                    {/* Animated Flow Pulse (Forward or Reverse based on MW direction) */}
                    {showPowerFlows && (
                      <line
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={isConnectedToActive ? "#06b6d4" : "#0071e3"}
                        strokeWidth={isConnectedToActive ? "4" : "2"}
                        strokeDasharray="8,16"
                        strokeLinecap="round"
                        className="apple-topology-flow"
                        opacity={isConnectedToActive ? 0.9 : 0.4}
                      />
                    )}

                    {/* Flow Label on Connected Lines */}
                    {isConnectedToActive && (
                      <text
                        x={(from.x + to.x) / 2}
                        y={(from.y + to.y) / 2 - 8}
                        className="fill-[#0071e3] font-mono font-bold text-[14px] text-anchor-middle stroke-white stroke-[4px] paint-order-stroke"
                      >
                        {Math.abs(line.normalFlowMW).toFixed(0)} MW
                      </text>
                    )}
                  </g>
                );
              })}

              {/* 39 Bus Nodes */}
              {Object.entries(IEEE39_BUSES).map(([id, bus]) => {
                const isSelected = id === selectedBusId;
                const isHovered = id === hoveredBusId;
                const isActive = id === activeBusId;
                const isConnected = connectedBusIds.has(id);

                // Filter logic
                if (filterMode === 'generators' && !bus.isGen) return null;
                if (filterMode === 'loads' && !bus.isLoad) return null;

                const nodeColor = bus.isGen ? "#0071e3" : bus.isLoad ? "#10b981" : "#64748b";

                return (
                  <g
                    key={id}
                    transform={`translate(${bus.x} ${bus.y})`}
                    className="cursor-pointer group"
                    onClick={() => setSelectedBusId(id)}
                    onMouseEnter={() => setHoveredBusId(id)}
                    onMouseLeave={() => setHoveredBusId(null)}
                  >
                    {/* Glowing Aura if Active or Connected */}
                    {(isActive || isConnected) && (
                      <circle 
                        r={isActive ? 38 : 28} 
                        fill={isActive ? "#0071e3" : "#06b6d4"} 
                        opacity={isActive ? 0.2 : 0.12} 
                        className="animate-pulse"
                      />
                    )}

                    {/* Generator Icon / Shape */}
                    {bus.isGen ? (
                      <rect 
                        x="-20" 
                        y="-20" 
                        width="40" 
                        height="40" 
                        rx="12"
                        fill={isActive ? "#0071e3" : "#e0f2fe"}
                        stroke={isActive ? "#005bb5" : "#0284c7"}
                        strokeWidth={isActive ? "3.5" : "2"}
                        className="transition-all duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <circle 
                        r={bus.isLoad ? 17 : 13}
                        fill={isActive ? "#10b981" : bus.isLoad ? "#dcfce7" : "#f1f5f9"}
                        stroke={isActive ? "#059669" : bus.isLoad ? "#10b981" : "#94a3b8"}
                        strokeWidth={isActive ? "3.5" : "2"}
                        className="transition-all duration-300 group-hover:scale-110"
                      />
                    )}

                    {/* Glyph inside Node */}
                    <text 
                      y="5"
                      className={`font-black text-[16px] text-anchor-middle select-none ${
                        isActive ? "fill-white" : bus.isGen ? "fill-[#0284c7]" : bus.isLoad ? "fill-[#059669]" : "fill-slate-600"
                      }`}
                    >
                      {bus.isGen ? "G" : bus.isLoad ? "L" : "•"}
                    </text>

                    {/* Bus Label text */}
                    <text 
                      y={['Bus_22','Bus_20','Bus_16','Bus_30'].includes(id) ? 38 : -26}
                      className={`font-black text-[17px] text-anchor-middle stroke-white stroke-[4px] paint-order-stroke select-none ${
                        isActive ? "fill-[#0071e3]" : "fill-[#1d1d1f]"
                      }`}
                    >
                      {bus.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Floating Apple Telemetry HUD Inspector (Top-Left of Diagram) */}
            <div className="absolute top-4 left-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-xl max-w-sm w-full animate-fade-in z-20">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#86868b]">
                    Pemeriksa Telemetri
                  </span>
                  <h4 className="text-base font-black text-[#1d1d1f]">
                    {currentBus.name}
                  </h4>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                  currentBus.isGen 
                    ? 'bg-blue-50 text-[#0071e3] border-blue-200' 
                    : currentBus.isLoad 
                      ? 'bg-emerald-50 text-[#10b981] border-emerald-200' 
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  {currentBus.isGen ? 'Janakuasa' : currentBus.isLoad ? 'Beban' : 'Persimpangan'}
                </span>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="p-2 rounded-xl bg-[#f5f5f7]">
                  <span className="text-[9px] font-bold text-[#86868b] uppercase block">Voltan Bas</span>
                  <span className="text-xs font-mono font-black text-[#1d1d1f]">
                    {currentBus.baseVoltage.toFixed(3)} p.u.
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[#f5f5f7]">
                  <span className="text-[9px] font-bold text-[#86868b] uppercase block">Kuasa Aktif (P)</span>
                  <span className="text-xs font-mono font-black text-[#0071e3]">
                    {currentBus.activePowerMW > 0 ? `${currentBus.activePowerMW.toFixed(1)} MW` : '0.0 MW'}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[#f5f5f7]">
                  <span className="text-[9px] font-bold text-[#86868b] uppercase block">Reaktif (Q)</span>
                  <span className="text-xs font-mono font-black text-[#8b5cf6]">
                    {currentBus.reactivePowerMVAR !== 0 ? `${currentBus.reactivePowerMVAR.toFixed(1)} MV` : '0.0 MV'}
                  </span>
                </div>
              </div>

              {/* Connected Lines List */}
              <div className="mt-3 pt-3 border-t border-black/[0.04] text-[11px] text-[#86868b]">
                <span className="font-semibold text-[#1d1d1f]">Sambungan Talian ({connectedLines.length}): </span>
                <span>
                  {connectedLines.map((l) => `${l.from.replace('Bus_', 'B')} ⇄ ${l.to.replace('Bus_', 'B')}`).join(', ')}
                </span>
              </div>
            </div>

            {/* Bottom-Right Helper Instruction */}
            <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] text-[11px] font-semibold text-[#86868b] shadow-sm">
              <Info className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Klik mana-mana bas untuk menukar fokus telemetri</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
