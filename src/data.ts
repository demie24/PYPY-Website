// PYPY V2 3D Showcase & Presentation Data
export interface Bus3D {
  id: string;
  number: number;
  label: string;
  name: string;
  type: 'generator' | 'load' | 'junction';
  x: number;
  y: number;
  z: number;
  baseVoltage: number; // in p.u.
  activePowerMW: number;
  reactivePowerMVAR: number;
  isSlack?: boolean;
}

export interface Line3D {
  id: string;
  from: string;
  to: string;
  normalFlowMW: number;
  isTrafo?: boolean;
}

export interface AttackScenarioV2 {
  id: 'fdia' | 'breaker' | 'load';
  name: string;
  codeName: string;
  badge: string;
  target: string;
  description: string;
  anomalyPattern: string;
  aiResponse: string;
  targetBuses: string[];
  targetLines: string[];
}

export const PROJECT_INFO_V2 = {
  title: "PYPY",
  descriptor: "CYBERSECURITY SMART GRID",
  fullName: "PYPY CYBERSECURITY SMART GRID",
  tagline: "PROTECT YOUR POWER. PROTECT YOURSELF.",
  subtitle: "AI-DRIVEN CYBER-PHYSICAL DEFENCE FOR SMART GRID DIGITAL TWIN",
  institution: "Universiti Malaysia Perlis (UniMAP)",
  faculty: "Fakulti Teknologi Kejuruteraan Elektrik & Elektronik (FTKE)",
  author: "demie24",
  academicYear: "2026",
  liveDashboardUrl: "https://crop-colleagues-achievement-academy.trycloudflare.com",
};

// Precise 3D spatial mapping of IEEE 39-Bus New England System
// Normalized around origin (x: -8 to +8, y: -4 to +4, z: -2.5 to +2.5 for layered depth)
export const IEEE39_3D_BUSES: Record<string, Bus3D> = {
  "Bus_1": { id: "Bus_1", number: 1, label: "B1", name: "Bus 1 (Load Substation)", type: 'load', x: 2.8, y: -2.1, z: -0.4, baseVoltage: 1.038, activePowerMW: 97.6, reactivePowerMVAR: 44.2 },
  "Bus_2": { id: "Bus_2", number: 2, label: "B2", name: "Bus 2 (Junction)", type: 'junction', x: 1.3, y: -1.7, z: 0.2, baseVoltage: 1.048, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_3": { id: "Bus_3", number: 3, label: "B3", name: "Bus 3 (Load Substation)", type: 'load', x: 1.3, y: -0.8, z: -0.5, baseVoltage: 1.030, activePowerMW: 322.0, reactivePowerMVAR: 2.4 },
  "Bus_4": { id: "Bus_4", number: 4, label: "B4", name: "Bus 4 (Load Substation)", type: 'load', x: 2.4, y: 0.0, z: -0.2, baseVoltage: 1.004, activePowerMW: 500.0, reactivePowerMVAR: 184.0 },
  "Bus_5": { id: "Bus_5", number: 5, label: "B5", name: "Bus 5 (Critical Substation)", type: 'junction', x: 4.2, y: 0.0, z: 0.6, baseVoltage: 1.005, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_6": { id: "Bus_6", number: 6, label: "B6", name: "Bus 6 (Junction)", type: 'junction', x: 5.6, y: 0.5, z: 0.1, baseVoltage: 1.007, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_7": { id: "Bus_7", number: 7, label: "B7", name: "Bus 7 (Load Substation)", type: 'load', x: 6.7, y: -0.1, z: -0.6, baseVoltage: 0.997, activePowerMW: 233.8, reactivePowerMVAR: 84.0 },
  "Bus_8": { id: "Bus_8", number: 8, label: "B8", name: "Bus 8 (Load Substation)", type: 'load', x: 5.5, y: -0.7, z: -0.3, baseVoltage: 0.996, activePowerMW: 522.0, reactivePowerMVAR: 176.6 },
  "Bus_9": { id: "Bus_9", number: 9, label: "B9", name: "Bus 9 (Junction)", type: 'junction', x: 5.7, y: -1.5, z: 0.4, baseVoltage: 1.028, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_10": { id: "Bus_10", number: 10, label: "B10", name: "Bus 10 (Junction)", type: 'junction', x: 4.1, y: 2.0, z: 0.8, baseVoltage: 1.017, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_11": { id: "Bus_11", number: 11, label: "B11", name: "Bus 11 (Junction)", type: 'junction', x: 5.4, y: 1.4, z: 0.5, baseVoltage: 1.013, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_12": { id: "Bus_12", number: 12, label: "B12", name: "Bus 12 (Load Substation)", type: 'load', x: 4.0, y: 1.5, z: -0.3, baseVoltage: 1.000, activePowerMW: 8.5, reactivePowerMVAR: 88.0 },
  "Bus_13": { id: "Bus_13", number: 13, label: "B13", name: "Bus 13 (Junction)", type: 'junction', x: 2.5, y: 1.5, z: 0.3, baseVoltage: 1.014, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_14": { id: "Bus_14", number: 14, label: "B14", name: "Bus 14 (Junction)", type: 'junction', x: 1.5, y: 0.8, z: 0.2, baseVoltage: 1.012, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_15": { id: "Bus_15", number: 15, label: "B15", name: "Bus 15 (Load Substation)", type: 'load', x: -0.3, y: 0.9, z: -0.4, baseVoltage: 1.015, activePowerMW: 320.0, reactivePowerMVAR: 153.0 },
  "Bus_16": { id: "Bus_16", number: 16, label: "B16", name: "Bus 16 (Load Substation)", type: 'load', x: -2.1, y: 0.7, z: -0.5, baseVoltage: 1.012, activePowerMW: 329.0, reactivePowerMVAR: 32.3 },
  "Bus_17": { id: "Bus_17", number: 17, label: "B17", name: "Bus 17 (Junction)", type: 'junction', x: -1.8, y: -0.2, z: 0.4, baseVoltage: 1.004, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_18": { id: "Bus_18", number: 18, label: "B18", name: "Bus 18 (Load Substation)", type: 'load', x: -0.3, y: -0.5, z: -0.2, baseVoltage: 0.993, activePowerMW: 158.0, reactivePowerMVAR: 30.0 },
  "Bus_19": { id: "Bus_19", number: 19, label: "B19", name: "Bus 19 (Junction)", type: 'junction', x: -3.9, y: 0.5, z: 0.7, baseVoltage: 1.050, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_20": { id: "Bus_20", number: 20, label: "B20", name: "Bus 20 (Load Substation)", type: 'load', x: -5.6, y: 0.2, z: -0.6, baseVoltage: 0.991, activePowerMW: 680.0, reactivePowerMVAR: 103.0 },
  "Bus_21": { id: "Bus_21", number: 21, label: "B21", name: "Bus 21 (Load Substation)", type: 'load', x: -2.0, y: 1.6, z: -0.3, baseVoltage: 1.032, activePowerMW: 274.0, reactivePowerMVAR: 115.0 },
  "Bus_22": { id: "Bus_22", number: 22, label: "B22", name: "Bus 22 (Junction)", type: 'junction', x: -2.6, y: 2.4, z: 0.5, baseVoltage: 1.050, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_23": { id: "Bus_23", number: 23, label: "B23", name: "Bus 23 (Load Substation)", type: 'load', x: -3.9, y: 2.1, z: -0.4, baseVoltage: 1.045, activePowerMW: 247.5, reactivePowerMVAR: 84.6 },
  "Bus_24": { id: "Bus_24", number: 24, label: "B24", name: "Bus 24 (Load Substation)", type: 'load', x: -3.1, y: 1.3, z: -0.5, baseVoltage: 1.038, activePowerMW: 308.6, reactivePowerMVAR: -92.2 },
  "Bus_25": { id: "Bus_25", number: 25, label: "B25", name: "Bus 25 (Load Substation)", type: 'load', x: -0.3, y: -2.2, z: -0.2, baseVoltage: 1.058, activePowerMW: 224.0, reactivePowerMVAR: 47.2 },
  "Bus_26": { id: "Bus_26", number: 26, label: "B26", name: "Bus 26 (Load Substation)", type: 'load', x: -2.0, y: -1.9, z: -0.4, baseVoltage: 1.052, activePowerMW: 139.0, reactivePowerMVAR: 17.0 },
  "Bus_27": { id: "Bus_27", number: 27, label: "B27", name: "Bus 27 (Load Substation)", type: 'load', x: -2.4, y: -1.0, z: -0.6, baseVoltage: 1.038, activePowerMW: 281.0, reactivePowerMVAR: 75.5 },
  "Bus_28": { id: "Bus_28", number: 28, label: "B28", name: "Bus 28 (Load Substation)", type: 'load', x: -3.5, y: -2.2, z: -0.3, baseVoltage: 1.050, activePowerMW: 206.0, reactivePowerMVAR: 27.6 },
  "Bus_29": { id: "Bus_29", number: 29, label: "B29", name: "Bus 29 (Load Substation)", type: 'load', x: -2.9, y: -2.7, z: -0.5, baseVoltage: 1.050, activePowerMW: 283.5, reactivePowerMVAR: 26.9 },
  // Generators elevated on positive Z-layer (+1.2 to +1.8) for dramatic digital twin architecture
  "Bus_30": { id: "Bus_30", number: 30, label: "G30", name: "Gen 30 (Slack Reference)", type: 'generator', x: 1.7, y: -2.5, z: 1.4, baseVoltage: 1.048, activePowerMW: 250.0, reactivePowerMVAR: 145.0, isSlack: true },
  "Bus_31": { id: "Bus_31", number: 31, label: "G31", name: "Gen 31 (Nuclear Turbine)", type: 'generator', x: 7.2, y: 0.8, z: 1.5, baseVoltage: 0.982, activePowerMW: 560.0, reactivePowerMVAR: 85.0 },
  "Bus_32": { id: "Bus_32", number: 32, label: "G32", name: "Gen 32 (Thermal Station)", type: 'generator', x: 4.7, y: 2.8, z: 1.6, baseVoltage: 0.983, activePowerMW: 650.0, reactivePowerMVAR: 205.0 },
  "Bus_33": { id: "Bus_33", number: 33, label: "G33", name: "Gen 33 (Hydro Plant)", type: 'generator', x: -5.3, y: 1.0, z: 1.4, baseVoltage: 0.997, activePowerMW: 632.0, reactivePowerMVAR: 108.0 },
  "Bus_34": { id: "Bus_34", number: 34, label: "G34", name: "Gen 34 (Gas Turbine)", type: 'generator', x: -7.2, y: 0.3, z: 1.6, baseVoltage: 1.012, activePowerMW: 508.0, reactivePowerMVAR: 167.0 },
  "Bus_35": { id: "Bus_35", number: 35, label: "G35", name: "Gen 35 (Combined Cycle)", type: 'generator', x: -2.8, y: 3.3, z: 1.5, baseVoltage: 1.049, activePowerMW: 650.0, reactivePowerMVAR: 211.0 },
  "Bus_36": { id: "Bus_36", number: 36, label: "G36", name: "Gen 36 (Coal Thermal)", type: 'generator', x: -5.2, y: 2.7, z: 1.7, baseVoltage: 1.064, activePowerMW: 560.0, reactivePowerMVAR: 100.0 },
  "Bus_37": { id: "Bus_37", number: 37, label: "G37", name: "Gen 37 (Wind/Hydro Hub)", type: 'generator', x: -0.2, y: -3.0, z: 1.3, baseVoltage: 1.028, activePowerMW: 540.0, reactivePowerMVAR: 0.0 },
  "Bus_38": { id: "Bus_38", number: 38, label: "G38", name: "Gen 38 (Gas Peaker)", type: 'generator', x: -4.0, y: -3.3, z: 1.6, baseVoltage: 1.027, activePowerMW: 830.0, reactivePowerMVAR: 22.0 },
  "Bus_39": { id: "Bus_39", number: 39, label: "G39", name: "Gen 39 (Major Interconnect)", type: 'generator', x: 4.6, y: -2.2, z: 1.8, baseVoltage: 1.030, activePowerMW: 1000.0, reactivePowerMVAR: 88.0 }
};

export const IEEE39_3D_LINES: Line3D[] = [
  { id: "L_line_0", from: "Bus_1", to: "Bus_2", normalFlowMW: 172.5 },
  { id: "L_line_1", from: "Bus_1", to: "Bus_39", normalFlowMW: -140.2 },
  { id: "L_line_2", from: "Bus_2", to: "Bus_3", normalFlowMW: 150.1 },
  { id: "L_line_3", from: "Bus_2", to: "Bus_25", normalFlowMW: 220.4 },
  { id: "L_line_4", from: "Bus_2", to: "Bus_30", normalFlowMW: -250.0, isTrafo: true },
  { id: "L_line_5", from: "Bus_3", to: "Bus_4", normalFlowMW: 90.5 },
  { id: "L_line_6", from: "Bus_3", to: "Bus_18", normalFlowMW: 85.3 },
  { id: "L_line_7", from: "Bus_4", to: "Bus_5", normalFlowMW: 110.2 },
  { id: "L_line_8", from: "Bus_4", to: "Bus_14", normalFlowMW: 130.4 },
  { id: "L_line_9", from: "Bus_5", to: "Bus_6", normalFlowMW: -180.1 },
  { id: "L_line_10", from: "Bus_5", to: "Bus_8", normalFlowMW: 95.0 },
  { id: "L_line_11", from: "Bus_6", to: "Bus_7", normalFlowMW: 120.3 },
  { id: "L_line_12", from: "Bus_6", to: "Bus_11", normalFlowMW: 145.8 },
  { id: "L_line_13", from: "Bus_6", to: "Bus_31", normalFlowMW: -560.0, isTrafo: true },
  { id: "L_line_14", from: "Bus_7", to: "Bus_8", normalFlowMW: 65.2 },
  { id: "L_line_15", from: "Bus_8", to: "Bus_9", normalFlowMW: 50.4 },
  { id: "L_line_16", from: "Bus_9", to: "Bus_39", normalFlowMW: -80.0 },
  { id: "L_line_17", from: "Bus_10", to: "Bus_11", normalFlowMW: 45.0 },
  { id: "L_line_18", from: "Bus_10", to: "Bus_13", normalFlowMW: 60.1 },
  { id: "L_line_19", from: "Bus_10", to: "Bus_32", normalFlowMW: -650.0, isTrafo: true },
  { id: "L_line_20", from: "Bus_12", to: "Bus_11", normalFlowMW: -75.4 },
  { id: "L_line_21", from: "Bus_12", to: "Bus_13", normalFlowMW: 85.0 },
  { id: "L_line_22", from: "Bus_13", to: "Bus_14", normalFlowMW: 110.0 },
  { id: "L_line_23", from: "Bus_14", to: "Bus_15", normalFlowMW: 90.0 },
  { id: "L_line_24", from: "Bus_15", to: "Bus_16", normalFlowMW: 120.0 },
  { id: "L_line_25", from: "Bus_16", to: "Bus_17", normalFlowMW: 70.0 },
  { id: "L_line_26", from: "Bus_16", to: "Bus_19", normalFlowMW: 140.0 },
  { id: "L_line_27", from: "Bus_16", to: "Bus_21", normalFlowMW: 130.0 },
  { id: "L_line_28", from: "Bus_16", to: "Bus_24", normalFlowMW: 105.0 },
  { id: "L_line_29", from: "Bus_17", to: "Bus_18", normalFlowMW: 80.0 },
  { id: "L_line_30", from: "Bus_17", to: "Bus_27", normalFlowMW: 95.0 },
  { id: "L_line_31", from: "Bus_19", to: "Bus_20", normalFlowMW: 210.0 },
  { id: "L_line_32", from: "Bus_19", to: "Bus_33", normalFlowMW: -630.0, isTrafo: true },
  { id: "L_line_33", from: "Bus_20", to: "Bus_34", normalFlowMW: -500.0, isTrafo: true },
  { id: "L_line_34", from: "Bus_21", to: "Bus_22", normalFlowMW: 180.0 },
  { id: "L_line_35", from: "Bus_22", to: "Bus_23", normalFlowMW: 90.0 },
  { id: "L_line_36", from: "Bus_22", to: "Bus_35", normalFlowMW: -650.0, isTrafo: true },
  { id: "L_line_37", from: "Bus_23", to: "Bus_24", normalFlowMW: 115.0 },
  { id: "L_line_38", from: "Bus_23", to: "Bus_36", normalFlowMW: -560.0, isTrafo: true },
  { id: "L_line_39", from: "Bus_25", to: "Bus_26", normalFlowMW: 140.0 },
  { id: "L_line_40", from: "Bus_25", to: "Bus_37", normalFlowMW: -540.0, isTrafo: true },
  { id: "L_line_41", from: "Bus_26", to: "Bus_27", normalFlowMW: 125.0 },
  { id: "L_line_42", from: "Bus_26", to: "Bus_28", normalFlowMW: 105.0 },
  { id: "L_line_43", from: "Bus_26", to: "Bus_29", normalFlowMW: 80.0 },
  { id: "L_line_44", from: "Bus_28", to: "Bus_29", normalFlowMW: 60.0 },
  { id: "L_line_45", from: "Bus_29", to: "Bus_38", normalFlowMW: -830.0, isTrafo: true }
];

export const ATTACK_SCENARIOS_V2: AttackScenarioV2[] = [
  {
    id: 'fdia',
    name: "False Data Injection Attack",
    codeName: "FDIA-BUS5-INFILTRATION",
    badge: "Stealth Sensor Manipulation",
    target: "Bus 5 Substation Sensor Telemetry",
    description: "An adversary injects +0.15 p.u. false voltage bias into Bus 5 telemetry while obeying Jacobian topology matrix to deceive conventional Bad Data Detectors.",
    anomalyPattern: "Residual error ||z - Hx|| remains below classical threshold, but PINN physics loss spikes to 0.428.",
    aiResponse: "Bi-LSTM temporal window flags drift; GCN localises to Bus 5; PINN invalidates Kirchhoff equality; Trust score dropped to 0.12.",
    targetBuses: ["Bus_5", "Bus_4", "Bus_6"],
    targetLines: ["L_line_7", "L_line_9", "L_line_10"]
  },
  {
    id: 'breaker',
    name: "Breaker Manipulation",
    codeName: "BREAKER-TRIP-L0",
    badge: "Physical Line Disconnection",
    target: "Transmission Line L_line_0 (Bus 1 - Bus 2)",
    description: "Unauthorized digital trip signal forces circuit breaker open on critical inter-tie line, threatening cascade overloads.",
    anomalyPattern: "Zero active power flow on Line 0; rapid overload surge onto adjacent branch Line 1.",
    aiResponse: "Dual PPO-DQN consensus proposes re-closing line. 13.47 ms AC sandbox verifies zero voltage collapse risk before actuation.",
    targetBuses: ["Bus_1", "Bus_2", "Bus_39"],
    targetLines: ["L_line_0", "L_line_1"]
  },
  {
    id: 'load',
    name: "Load Manipulation",
    codeName: "LOAD-VOLTAGE-COLLAPSE",
    badge: "Coordinated Reactive Infiltration",
    target: "Industrial Load Substations (Bus 4, 8, 20)",
    description: "Coordinated manipulation of reactive power demand across major consumer buses aiming to trigger voltage collapse cascade.",
    anomalyPattern: "Voltage sag below 0.90 p.u. propagating rapidly across spatial neighbours.",
    aiResponse: "ST-GNN traces ripple propagation velocity; FLISR rebalancing protocol redispatches reactive VAR reserves to halt cascade.",
    targetBuses: ["Bus_4", "Bus_8", "Bus_20"],
    targetLines: ["L_line_5", "L_line_14", "L_line_31"]
  }
];

export const AI_MODELS_V2 = [
  {
    id: "bilstm",
    name: "Bi-Directional LSTM",
    role: "Temporal Anomaly Detection",
    layer: "Layer 01: Temporal Sequence",
    formula: "h_t = \\sigma(W x_t + U h_{t-1} + b)",
    metric: "1.0000 Recall on FDIA & DoS",
    confidence: "99.2%",
    color: "#0071e3",
    description: "Evaluates 156-dimensional telemetry time series (W=20) to detect micro-deviations before classical detectors register abnormal residuals."
  },
  {
    id: "gcn",
    name: "Graph Convolutional Network",
    role: "Spatial Topology Localisation",
    layer: "Layer 02: Spatial Topology",
    formula: "H^{(l+1)} = \\sigma(\\tilde{D}^{-\\frac{1}{2}} \\tilde{A} \\tilde{D}^{-\\frac{1}{2}} H^{(l)} W^{(l)})",
    metric: "86.42% Weighted F1-Score",
    confidence: "86.4%",
    color: "#0284c7",
    description: "Represents 39 buses as nodes and 46 lines as edges, pinpointing the physical origin of injected corruption across interconnected substations."
  },
  {
    id: "pinn",
    name: "Physics-Informed Neural Network",
    role: "Kirchhoff KCL / KVL Consistency",
    layer: "Layer 03: Physics Governor",
    formula: "\\mathcal{L}_{PINN} = \\mathcal{L}_{data} + \\lambda \\sum |P_i - V_i \\sum V_j Y_{ij} \\cos \\theta_{ij}|",
    metric: "100% Physical Constraint Adherence",
    confidence: "97.8%",
    color: "#10b981",
    description: "Enforces non-linear AC power flow laws at every bus. AI hallucinations and mathematically crafted false data are instantly invalidated."
  },
  {
    id: "stgnn",
    name: "Spatio-Temporal GNN",
    role: "Cascade Ripple Forecaster",
    layer: "Layer 04: Cascade Dynamics",
    formula: "\\mathcal{G}_{st} = \\text{SpatialGraphConv}(X) \\circledast \\text{TemporalGatedConv}(X)",
    metric: "Low-latency Cascade Prediction",
    confidence: "91.5%",
    color: "#8b5cf6",
    description: "Tracks disturbance propagation trajectories across transmission corridors, providing proactive lead time for corrective self-healing."
  }
];

export const V2_RESULTS_METRICS = [
  { value: "99.81%", label: "Detection Accuracy", sub: "Multi-Model AI Consensus across all FDIA & DoS vectors", accent: "text-blue-600" },
  { value: "12 ms", label: "Response Latency", sub: "Real-time AC Sandbox Newton-Raphson Rehearsal (<150ms SCADA limit)", accent: "text-blue-600" },
  { value: "0%", label: "BDD Bypass", sub: "Stealth attack vectors completely eliminated via Kirchhoff PINN validation", accent: "text-blue-600" },
  { value: "$420K", label: "Estimated Savings", sub: "Annual blackout prevention & critical asset preservation", accent: "text-emerald-600" }
];
