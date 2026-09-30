import React, { useState } from 'react';

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

// IEEE 39-Bus transmission lines and transformers
const linesData = [
  { id: "L_line_0", from: "Bus_1", to: "Bus_2", power: 172.5 },
  { id: "L_line_1", from: "Bus_1", to: "Bus_39", power: -140.2 },
  { id: "L_line_2", from: "Bus_2", to: "Bus_3", power: 150.1 },
  { id: "L_line_3", from: "Bus_2", to: "Bus_25", power: 220.4 },
  { id: "L_line_4", from: "Bus_2", to: "Bus_30", power: -250.0 },
  { id: "L_line_5", from: "Bus_3", to: "Bus_4", power: 90.5 },
  { id: "L_line_6", from: "Bus_3", to: "Bus_18", power: 85.3 },
  { id: "L_line_7", from: "Bus_4", to: "Bus_5", power: 110.2 },
  { id: "L_line_8", from: "Bus_4", to: "Bus_14", power: 130.4 },
  { id: "L_line_9", from: "Bus_5", to: "Bus_6", power: -180.1 },
  { id: "L_line_10", from: "Bus_5", to: "Bus_8", power: 95.0 },
  { id: "L_line_11", from: "Bus_6", to: "Bus_7", power: 120.3 },
  { id: "L_line_12", from: "Bus_6", to: "Bus_11", power: 145.8 },
  { id: "L_line_13", from: "Bus_6", to: "Bus_31", power: -560.0 },
  { id: "L_line_14", from: "Bus_7", to: "Bus_8", power: 65.2 },
  { id: "L_line_15", from: "Bus_8", to: "Bus_9", power: 50.4 },
  { id: "L_line_16", from: "Bus_9", to: "Bus_39", power: -80.0 },
  { id: "L_line_17", from: "Bus_10", to: "Bus_11", power: 45.0 },
  { id: "L_line_18", from: "Bus_10", to: "Bus_13", power: 60.1 },
  { id: "L_line_19", from: "Bus_10", to: "Bus_32", power: -650.0 },
  { id: "L_line_20", from: "Bus_12", to: "Bus_11", power: -75.4 },
  { id: "L_line_21", from: "Bus_12", to: "Bus_13", power: 85.0 },
  { id: "L_line_22", from: "Bus_13", to: "Bus_14", power: 110.0 },
  { id: "L_line_23", from: "Bus_14", to: "Bus_15", power: 90.0 },
  { id: "L_line_24", from: "Bus_15", to: "Bus_16", power: 120.0 },
  { id: "L_line_25", from: "Bus_16", to: "Bus_17", power: 70.0 },
  { id: "L_line_26", from: "Bus_16", to: "Bus_19", power: 140.0 },
  { id: "L_line_27", from: "Bus_16", to: "Bus_21", power: 130.0 },
  { id: "L_line_28", from: "Bus_16", to: "Bus_24", power: 105.0 },
  { id: "L_line_29", from: "Bus_17", to: "Bus_18", power: 80.0 },
  { id: "L_line_30", from: "Bus_17", to: "Bus_27", power: 95.0 },
  { id: "L_line_31", from: "Bus_19", to: "Bus_20", power: 210.0 },
  { id: "L_line_32", from: "Bus_19", to: "Bus_33", power: -630.0 },
  { id: "L_line_33", from: "Bus_20", to: "Bus_34", power: -500.0 },
  { id: "L_line_34", from: "Bus_21", to: "Bus_22", power: 180.0 },
  { id: "L_line_35", from: "Bus_22", to: "Bus_23", power: 90.0 },
  { id: "L_line_36", from: "Bus_22", to: "Bus_35", power: -650.0 },
  { id: "L_line_37", from: "Bus_23", to: "Bus_24", power: 115.0 },
  { id: "L_line_38", from: "Bus_23", to: "Bus_36", power: -560.0 },
  { id: "L_line_39", from: "Bus_25", to: "Bus_26", power: 140.0 },
  { id: "L_line_40", from: "Bus_25", to: "Bus_37", power: -540.0 },
  { id: "L_line_41", from: "Bus_26", to: "Bus_27", power: 125.0 },
  { id: "L_line_42", from: "Bus_26", to: "Bus_28", power: 105.0 },
  { id: "L_line_43", from: "Bus_26", to: "Bus_29", power: 80.0 },
  { id: "L_line_44", from: "Bus_28", to: "Bus_29", power: 60.0 },
  { id: "L_line_45", from: "Bus_29", to: "Bus_38", power: -830.0 }
];

interface Ieee39TopologyProps {
  activeAttack: string | null;
  targetBus?: string | null;
  trippedLine?: string | null;
}

export const Ieee39Topology: React.FC<Ieee39TopologyProps> = ({
  activeAttack,
  targetBus,
  trippedLine
}) => {
  const [selectedBus, setSelectedBus] = useState<string | null>("Bus_1");

  const busInfo = selectedBus ? busData[selectedBus] : null;

  return (
    <div className="relative w-full h-full min-h-[480px] flex flex-col justify-between overflow-hidden">
      
      {/* SVG Canvas for IEEE 39-Bus */}
      <svg 
        viewBox="0 0 2000 980" 
        className="w-full h-full max-h-[500px] select-none"
        role="group" 
        aria-label="IEEE 39-Bus New England Transmission Grid"
      >
        <defs>
          <pattern id="dot-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#cadce5" />
          </pattern>
        </defs>

        <rect width="2000" height="980" fill="url(#dot-grid)" opacity="0.6" />

        {/* Transmission Lines */}
        {linesData.map((line) => {
          const from = busData[line.from];
          const to = busData[line.to];
          if (!from || !to) return null;

          const isTripped = trippedLine === line.id;
          const tone = isTripped ? "warning" : "safe";

          return (
            <g key={line.id}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={isTripped ? "stroke-amber-500 stroke-[4] stroke-dasharray-[12,8]" : "ex-wire"}
              />
              
              {!isTripped && (
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className="ex-flow"
                />
              )}

              {isTripped && (
                <text 
                  x={(from.x + to.x) / 2} 
                  y={(from.y + to.y) / 2} 
                  className="fill-amber-600 font-extrabold text-[22px] stroke-white stroke-[6px] paint-order-stroke text-anchor-middle"
                >
                  OPEN
                </text>
              )}
            </g>
          );
        })}

        {/* Buses */}
        {Object.entries(busData).map(([id, bus]) => {
          const isTarget = targetBus === id;
          const isCompromised = activeAttack && isTarget;
          const isSelected = selectedBus === id;

          const tone = isCompromised 
            ? "ex-danger" 
            : bus.baseV < 0.95 || bus.baseV > 1.05 
              ? "ex-warning" 
              : "ex-safe";

          return (
            <g
              key={id}
              transform={`translate(${bus.x} ${bus.y})`}
              className={`ex-bus ${tone} ${isSelected ? 'scale-125' : ''}`}
              onClick={() => setSelectedBus(id)}
            >
              {isCompromised && (
                <circle r="44" className="stroke-rose-500 stroke-2 fill-rose-500/20 animate-ping" />
              )}

              {bus.isGen ? (
                <rect x="-24" y="-24" width="48" height="48" rx="14" />
              ) : (
                <circle r="22" />
              )}

              <text className="ex-node-symbol" y="7">
                {isCompromised ? "!" : bus.isGen ? "G" : bus.isLoad ? "↓" : "·"}
              </text>

              <text 
                className="ex-node-label" 
                y={['Bus_22','Bus_20','Bus_16','Bus_30'].includes(id) ? 48 : -36}
              >
                {bus.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Selected Bus Floating Inspector (Exact matching .ex-inspector from dashboard) */}
      <div className="ex-inspector">
        {busInfo ? (
          <>
            <strong>{busInfo.name}</strong>
            <span>
              Voltan: <strong>{busInfo.baseV.toFixed(3)} p.u.</strong> (Nominal 1.00)
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">
              {busInfo.isGen ? "⚡ Generator Bus" : busInfo.isLoad ? "🏢 Load Substation" : "🔗 Transmission Junction"}
            </span>
            <button onClick={() => setSelectedBus(null)} title="Tutup">×</button>
          </>
        ) : (
          <span>Klik mana-mana bas untuk memeriksa voltan dan jenis beban</span>
        )}
      </div>

    </div>
  );
};
