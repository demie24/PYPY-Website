import React, { useState } from 'react';
import { ShieldCheck, Activity, AlertTriangle, RotateCcw, Info, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// IEEE 39-Bus New England exact coordinates
const busData: Record<string, { x: number; y: number; label: string; name: string; isGen?: boolean; isLoad?: boolean; baseV: number }> = {
  "Bus_1": { x: 1359, y: 753, label: "B1", name: "Bus 1", isLoad: true, baseV: 1.038 },
  "Bus_2": { x: 1161, y: 705, label: "B2", name: "Bus 2", isLoad: false, baseV: 1.048 },
  "Bus_3": { x: 1165, y: 592, label: "B3", name: "Bus 3", isLoad: true, baseV: 1.030 },
  "Bus_4": { x: 1294, y: 503, label: "B4", name: "Bus 4", isLoad: true, baseV: 1.004 },
  "Bus_5": { x: 1520, y: 506, label: "B5", name: "Bus 5", isLoad: false, baseV: 1.005 },
  "Bus_6": { x: 1695, y: 435, label: "B6", name: "Bus 6", isLoad: false, baseV: 1.007 },
  "Bus_7": { x: 1832, y: 515, label: "B7", name: "Bus 7", isLoad: true, baseV: 0.997 },
  "Bus_8": { x: 1678, y: 581, label: "B8", name: "Bus 8", isLoad: true, baseV: 0.996 },
  "Bus_9": { x: 1703, y: 685, label: "B9", name: "Bus 9", isLoad: false, baseV: 1.028 },
  "Bus_10": { x: 1505, y: 254, label: "B10", name: "Bus 10", isLoad: false, baseV: 1.017 },
  "Bus_11": { x: 1668, y: 329, label: "B11", name: "Bus 11", isLoad: false, baseV: 1.013 },
  "Bus_12": { x: 1494, y: 313, label: "B12", name: "Bus 12", isLoad: true, baseV: 1.000 },
  "Bus_13": { x: 1314, y: 311, label: "B13", name: "Bus 13", isLoad: false, baseV: 1.014 },
  "Bus_14": { x: 1186, y: 401, label: "B14", name: "Bus 14", isLoad: false, baseV: 1.012 },
  "Bus_15": { x: 963, y: 386, label: "B15", name: "Bus 15", isLoad: true, baseV: 1.015 },
  "Bus_16": { x: 740, y: 410, label: "B16", name: "Bus 16", isLoad: true, baseV: 1.012 },
  "Bus_17": { x: 772, y: 520, label: "B17", name: "Bus 17", isLoad: false, baseV: 1.004 },
  "Bus_18": { x: 969, y: 553, label: "B18", name: "Bus 18", isLoad: true, baseV: 0.993 },
  "Bus_19": { x: 517, y: 431, label: "B19", name: "Bus 19", isLoad: false, baseV: 1.050 },
  "Bus_20": { x: 308, y: 466, label: "B20", name: "Bus 20", isLoad: true, baseV: 0.991 },
  "Bus_21": { x: 752, y: 303, label: "B21", name: "Bus 21", isLoad: true, baseV: 1.032 },
  "Bus_22": { x: 678, y: 201, label: "B22", name: "Bus 22", isLoad: false, baseV: 1.050 },
  "Bus_23": { x: 517, y: 238, label: "B23", name: "Bus 23", isLoad: true, baseV: 1.045 },
  "Bus_24": { x: 621, y: 333, label: "B24", name: "Bus 24", isLoad: true, baseV: 1.038 },
  "Bus_25": { x: 964, y: 758, label: "B25", name: "Bus 25", isLoad: true, baseV: 1.058 },
  "Bus_26": { x: 747, y: 730, label: "B26", name: "Bus 26", isLoad: true, baseV: 1.052 },
  "Bus_27": { x: 697, y: 623, label: "B27", name: "Bus 27", isLoad: true, baseV: 1.038 },
  "Bus_28": { x: 561, y: 764, label: "B28", name: "Bus 28", isLoad: true, baseV: 1.050 },
  "Bus_29": { x: 638, y: 823, label: "B29", name: "Bus 29", isLoad: false, baseV: 1.050 },
  "Bus_30": { x: 1211, y: 803, label: "G30", name: "Gen 30 (Slack)", isGen: true, baseV: 1.048 },
  "Bus_31": { x: 1900, y: 405, label: "G31", name: "Gen 31", isGen: true, baseV: 0.982 },
  "Bus_32": { x: 1585, y: 162, label: "G32", name: "Gen 32", isGen: true, baseV: 0.983 },
  "Bus_33": { x: 350, y: 374, label: "G33", name: "Gen 33", isGen: true, baseV: 0.997 },
  "Bus_34": { x: 100, y: 461, label: "G34", name: "Gen 34", isGen: true, baseV: 1.012 },
  "Bus_35": { x: 655, y: 100, label: "G35", name: "Gen 35", isGen: true, baseV: 1.049 },
  "Bus_36": { x: 357, y: 173, label: "G36", name: "Gen 36", isGen: true, baseV: 1.064 },
  "Bus_37": { x: 979, y: 865, label: "G37", name: "Gen 37", isGen: true, baseV: 1.028 },
  "Bus_38": { x: 509, y: 900, label: "G38", name: "Gen 38", isGen: true, baseV: 1.027 },
  "Bus_39": { x: 1567, y: 763, label: "G39", name: "Gen 39", isGen: true, baseV: 1.030 }
};

const linesData = [
  { id: "L_line_0", from: "Bus_1", to: "Bus_2" },
  { id: "L_line_1", from: "Bus_1", to: "Bus_39" },
  { id: "L_line_2", from: "Bus_2", to: "Bus_3" },
  { id: "L_line_3", from: "Bus_2", to: "Bus_25" },
  { id: "L_line_4", from: "Bus_2", to: "Bus_30" },
  { id: "L_line_5", from: "Bus_3", to: "Bus_4" },
  { id: "L_line_6", from: "Bus_3", to: "Bus_18" },
  { id: "L_line_7", from: "Bus_4", to: "Bus_5" },
  { id: "L_line_8", from: "Bus_4", to: "Bus_14" },
  { id: "L_line_9", from: "Bus_5", to: "Bus_6" },
  { id: "L_line_10", from: "Bus_5", to: "Bus_8" },
  { id: "L_line_11", from: "Bus_6", to: "Bus_7" },
  { id: "L_line_12", from: "Bus_6", to: "Bus_11" },
  { id: "L_line_13", from: "Bus_6", to: "Bus_31" },
  { id: "L_line_14", from: "Bus_7", to: "Bus_8" },
  { id: "L_line_15", from: "Bus_8", to: "Bus_9" },
  { id: "L_line_16", from: "Bus_9", to: "Bus_39" },
  { id: "L_line_17", from: "Bus_10", to: "Bus_11" },
  { id: "L_line_18", from: "Bus_10", to: "Bus_13" },
  { id: "L_line_19", from: "Bus_10", to: "Bus_32" },
  { id: "L_line_20", from: "Bus_12", to: "Bus_11" },
  { id: "L_line_21", from: "Bus_12", to: "Bus_13" },
  { id: "L_line_22", from: "Bus_13", to: "Bus_14" },
  { id: "L_line_23", from: "Bus_14", to: "Bus_15" },
  { id: "L_line_24", from: "Bus_15", to: "Bus_16" },
  { id: "L_line_25", from: "Bus_16", to: "Bus_17" },
  { id: "L_line_26", from: "Bus_16", to: "Bus_19" },
  { id: "L_line_27", from: "Bus_16", to: "Bus_21" },
  { id: "L_line_28", from: "Bus_16", to: "Bus_24" },
  { id: "L_line_29", from: "Bus_17", to: "Bus_18" },
  { id: "L_line_30", from: "Bus_17", to: "Bus_27" },
  { id: "L_line_31", from: "Bus_19", to: "Bus_20" },
  { id: "L_line_32", from: "Bus_19", to: "Bus_33" },
  { id: "L_line_33", from: "Bus_20", to: "Bus_34" },
  { id: "L_line_34", from: "Bus_21", to: "Bus_22" },
  { id: "L_line_35", from: "Bus_22", to: "Bus_23" },
  { id: "L_line_36", from: "Bus_22", to: "Bus_35" },
  { id: "L_line_37", from: "Bus_23", to: "Bus_24" },
  { id: "L_line_38", from: "Bus_23", to: "Bus_36" },
  { id: "L_line_39", from: "Bus_25", to: "Bus_26" },
  { id: "L_line_40", from: "Bus_25", to: "Bus_37" },
  { id: "L_line_41", from: "Bus_26", to: "Bus_27" },
  { id: "L_line_42", from: "Bus_26", to: "Bus_28" },
  { id: "L_line_43", from: "Bus_26", to: "Bus_29" },
  { id: "L_line_44", from: "Bus_28", to: "Bus_29" },
  { id: "L_line_45", from: "Bus_29", to: "Bus_38" }
];

export const AppleTopology: React.FC = () => {
  const [scenario, setScenario] = useState<'nominal' | 'fdia' | 'breaker'>('nominal');
  const [selectedBus, setSelectedBus] = useState<string>("Bus_5");

  const isFdia = scenario === 'fdia';
  const isBreaker = scenario === 'breaker';

  const busInfo = selectedBus ? busData[selectedBus] : null;

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Apple Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0071e3]/10 text-[#0071e3] mb-3">
          <Activity className="w-3.5 h-3.5" />
          <span>Interactive IEEE-39 Bus Digital Twin</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">
          Topologi Elektrik Masa Nyata.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#86868b]">
          Sentuh mana-mana nod bas untuk memeriksa voltan atau uji senario serangan siber untuk melihat tindak balas sistem imun.
        </p>
      </div>

      {/* Scenario Switcher Buttons (Apple Style Pills) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setScenario('nominal')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            scenario === 'nominal'
              ? 'bg-[#10b981] text-white shadow-md shadow-emerald-500/20'
              : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-[#f5f5f7]'
          }`}
        >
          🟢 Grid Normal (Baseline)
        </button>

        <button
          onClick={() => {
            setScenario('fdia');
            setSelectedBus('Bus_5');
          }}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            scenario === 'fdia'
              ? 'bg-[#ef4444] text-white shadow-md shadow-red-500/20'
              : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-[#f5f5f7]'
          }`}
        >
          🔴 Uji Serangan FDIA (Bus 5)
        </button>

        <button
          onClick={() => setScenario('breaker')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
            scenario === 'breaker'
              ? 'bg-[#8b5cf6] text-white shadow-md shadow-purple-500/20'
              : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-[#f5f5f7]'
          }`}
        >
          🟣 Uji Pemulihan Pemutus Litar (L_line_0)
        </button>
      </div>

      {/* Apple Card with SVG Canvas */}
      <div className="apple-card p-4 sm:p-8 relative overflow-hidden bg-white shadow-xl">
        
        {/* Top Status Bar in Canvas */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-black/[0.04]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-xs font-bold text-[#1d1d1f]">
              {isFdia ? "⚠️ FDIA Anomaly Detected on Bus 5" : isBreaker ? "⚡ Autonomous Recovery Complete (GRID SECURED)" : "Nominal Telemetry Streaming"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#86868b]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              Nominal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
              Target FDIA
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
              Open Breaker
            </span>
          </div>
        </div>

        {/* The SVG Grid Diagram */}
        <div className="relative w-full h-[480px] sm:h-[580px] flex items-center justify-center">
          <svg 
            viewBox="0 0 2000 980" 
            className="w-full h-full select-none"
            role="group"
          >
            <defs>
              <pattern id="apple-dots" width="36" height="36" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="#e5e5ea" />
              </pattern>
            </defs>

            <rect width="2000" height="980" fill="url(#apple-dots)" />

            {/* Lines */}
            {linesData.map((line) => {
              const from = busData[line.from];
              const to = busData[line.to];
              if (!from || !to) return null;

              const isTripped = isBreaker && line.id === "L_line_0";

              return (
                <g key={line.id}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    className={isTripped ? "stroke-amber-500 stroke-[3] stroke-dasharray-[10,8]" : "apple-topology-wire"}
                  />

                  {!isTripped && (
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      className="apple-topology-flow"
                    />
                  )}

                  {isTripped && (
                    <text 
                      x={(from.x + to.x) / 2} 
                      y={(from.y + to.y) / 2} 
                      className="fill-amber-600 font-extrabold text-[20px] stroke-white stroke-[5px] paint-order-stroke text-anchor-middle"
                    >
                      RESTORED
                    </text>
                  )}
                </g>
              );
            })}

            {/* Buses */}
            {Object.entries(busData).map(([id, bus]) => {
              const isTargetFdia = isFdia && id === "Bus_5";
              const isSelected = selectedBus === id;

              return (
                <g
                  key={id}
                  transform={`translate(${bus.x} ${bus.y})`}
                  className="cursor-pointer group"
                  onClick={() => setSelectedBus(id)}
                >
                  {isTargetFdia && (
                    <circle r="44" className="stroke-[#ef4444] stroke-2 fill-red-500/15 animate-ping" />
                  )}

                  {bus.isGen ? (
                    <rect 
                      x="-22" 
                      y="-22" 
                      width="44" 
                      height="44" 
                      rx="12"
                      className={`transition-all duration-300 ${
                        isTargetFdia 
                          ? "fill-[#fee2e2] stroke-[#ef4444] stroke-[3]"
                          : isSelected 
                            ? "fill-[#dbeafe] stroke-[#0071e3] stroke-[4]"
                            : "fill-[#f0fdf4] stroke-[#10b981] stroke-[2.5] hover:stroke-[4]"
                      }`}
                    />
                  ) : (
                    <circle 
                      r="20" 
                      className={`transition-all duration-300 ${
                        isTargetFdia 
                          ? "fill-[#fee2e2] stroke-[#ef4444] stroke-[3]"
                          : isSelected 
                            ? "fill-[#dbeafe] stroke-[#0071e3] stroke-[4]"
                            : "fill-[#f0fdf4] stroke-[#10b981] stroke-[2.5] hover:stroke-[4]"
                      }`}
                    />
                  )}

                  <text 
                    y="6"
                    className={`font-black text-[18px] text-anchor-middle ${
                      isTargetFdia ? "fill-[#ef4444]" : "fill-[#10b981]"
                    }`}
                  >
                    {isTargetFdia ? "!" : bus.isGen ? "G" : bus.isLoad ? "↓" : "•"}
                  </text>

                  <text 
                    y={['Bus_22','Bus_20','Bus_16','Bus_30'].includes(id) ? 44 : -32}
                    className="font-bold text-[20px] fill-[#1d1d1f] text-anchor-middle stroke-white stroke-[4px] paint-order-stroke"
                  >
                    {bus.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Apple Inspector Card */}
          {busInfo && (
            <div className="absolute bottom-4 left-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-lg max-w-xs animate-fade-in">
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="text-sm font-extrabold text-[#1d1d1f]">
                  {busInfo.name}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0071e3]/10 text-[#0071e3]">
                  {busInfo.isGen ? "Generator" : busInfo.isLoad ? "Load Substation" : "Junction"}
                </span>
              </div>
              <div className="text-xs text-[#86868b] flex justify-between gap-4 mt-2">
                <span>Voltan Semasa:</span>
                <strong className={isFdia && selectedBus === "Bus_5" ? "text-red-500 font-mono" : "text-[#10b981] font-mono"}>
                  {isFdia && selectedBus === "Bus_5" ? "0.882 p.u. (DEVIATION)" : `${busInfo.baseV.toFixed(3)} p.u.`}
                </strong>
              </div>
            </div>
          )}

        </div>

      </div>

    </section>
  );
};
