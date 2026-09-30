// data.ts - Core Data & Definitions for PYPY FYP Viva Presentation & Storytelling Showcase

export interface BusNode {
  id: string;
  number: number;
  x: number;
  y: number;
  label: string;
  name: string;
  isGen?: boolean;
  isLoad?: boolean;
  isSlack?: boolean;
  baseVoltage: number; // in p.u.
  activePowerMW: number;
  reactivePowerMVAR: number;
}

export interface TransmissionLine {
  id: string;
  from: string;
  to: string;
  lengthKm?: number;
  normalFlowMW: number;
  isTrafo?: boolean;
}

export interface AiModelInfo {
  id: string;
  name: string;
  acronym: string;
  type: string;
  role: string;
  accentColor: string;
  badgeColor: string;
  inputDim: string;
  architecture: string;
  keyFeature: string;
  metric: string;
  accuracyPercent: number;
  description: string;
  whyItMatters: string;
  formulaOrConcept: string;
}

export interface PipelineStage {
  id: string;
  step: number;
  name: string;
  tagline: string;
  component: string;
  description: string;
  action: string;
  color: string;
}

export interface AttackType {
  id: string;
  name: string;
  target: string;
  description: string;
  impact: string;
  defenseAction: string;
}

export const PROJECT_INFO = {
  title: "PYPY",
  shortTitle: "PYPY",
  tagline: "PROTECT YOUR POWER. PROTECT YOURSELF.",
  subtitle: "AI-DRIVEN CYBER-PHYSICAL DEFENCE FOR SMART GRID DIGITAL TWIN",
  institution: "Universiti Malaysia Perlis (UniMAP)",
  faculty: "Fakulti Teknologi Kejuruteraan Elektrik & Elektronik (FTKE)",
  programme: "Diploma Kejuruteraan Elektrik / Komputer",
  author: "demie24",
  supervisor: "Penyelia Projek FYP",
  academicYear: "2026",
  gridModel: "IEEE 39-Bus New England Transmission Grid",
  microservicesCount: 19,
  liveDashboardUrl: "https://score-civilization-gnome-association.trycloudflare.com",
  exhibitionUrl: "https://score-civilization-gnome-association.trycloudflare.com",
  githubUrl: "https://github.com/demie24/PYPY"
};

// Exact New England IEEE 39-Bus normalized layout coordinates for 2000 x 980 canvas
export const IEEE39_BUSES: Record<string, BusNode> = {
  "Bus_1": { id: "Bus_1", number: 1, x: 1359, y: 753, label: "B1", name: "Bus 1 (Load Substation)", isLoad: true, baseVoltage: 1.038, activePowerMW: 97.6, reactivePowerMVAR: 44.2 },
  "Bus_2": { id: "Bus_2", number: 2, x: 1161, y: 705, label: "B2", name: "Bus 2 (Junction)", baseVoltage: 1.048, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_3": { id: "Bus_3", number: 3, x: 1165, y: 592, label: "B3", name: "Bus 3 (Load Substation)", isLoad: true, baseVoltage: 1.030, activePowerMW: 322.0, reactivePowerMVAR: 2.4 },
  "Bus_4": { id: "Bus_4", number: 4, x: 1294, y: 503, label: "B4", name: "Bus 4 (Load Substation)", isLoad: true, baseVoltage: 1.004, activePowerMW: 500.0, reactivePowerMVAR: 184.0 },
  "Bus_5": { id: "Bus_5", number: 5, x: 1520, y: 506, label: "B5", name: "Bus 5 (Junction)", baseVoltage: 1.005, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_6": { id: "Bus_6", number: 6, x: 1695, y: 435, label: "B6", name: "Bus 6 (Junction)", baseVoltage: 1.007, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_7": { id: "Bus_7", number: 7, x: 1832, y: 515, label: "B7", name: "Bus 7 (Load Substation)", isLoad: true, baseVoltage: 0.997, activePowerMW: 233.8, reactivePowerMVAR: 84.0 },
  "Bus_8": { id: "Bus_8", number: 8, x: 1678, y: 581, label: "B8", name: "Bus 8 (Load Substation)", isLoad: true, baseVoltage: 0.996, activePowerMW: 522.0, reactivePowerMVAR: 176.6 },
  "Bus_9": { id: "Bus_9", number: 9, x: 1703, y: 685, label: "B9", name: "Bus 9 (Junction)", baseVoltage: 1.028, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_10": { id: "Bus_10", number: 10, x: 1505, y: 254, label: "B10", name: "Bus 10 (Junction)", baseVoltage: 1.017, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_11": { id: "Bus_11", number: 11, x: 1668, y: 329, label: "B11", name: "Bus 11 (Junction)", baseVoltage: 1.013, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_12": { id: "Bus_12", number: 12, x: 1494, y: 313, label: "B12", name: "Bus 12 (Load Substation)", isLoad: true, baseVoltage: 1.000, activePowerMW: 8.5, reactivePowerMVAR: 88.0 },
  "Bus_13": { id: "Bus_13", number: 13, x: 1314, y: 311, label: "B13", name: "Bus 13 (Junction)", baseVoltage: 1.014, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_14": { id: "Bus_14", number: 14, x: 1186, y: 401, label: "B14", name: "Bus 14 (Junction)", baseVoltage: 1.012, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_15": { id: "Bus_15", number: 15, x: 963, y: 386, label: "B15", name: "Bus 15 (Load Substation)", isLoad: true, baseVoltage: 1.015, activePowerMW: 320.0, reactivePowerMVAR: 153.0 },
  "Bus_16": { id: "Bus_16", number: 16, x: 740, y: 410, label: "B16", name: "Bus 16 (Load Substation)", isLoad: true, baseVoltage: 1.012, activePowerMW: 329.0, reactivePowerMVAR: 32.3 },
  "Bus_17": { id: "Bus_17", number: 17, x: 772, y: 520, label: "B17", name: "Bus 17 (Junction)", baseVoltage: 1.004, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_18": { id: "Bus_18", number: 18, x: 969, y: 553, label: "B18", name: "Bus 18 (Load Substation)", isLoad: true, baseVoltage: 0.993, activePowerMW: 158.0, reactivePowerMVAR: 30.0 },
  "Bus_19": { id: "Bus_19", number: 19, x: 517, y: 431, label: "B19", name: "Bus 19 (Junction)", baseVoltage: 1.050, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_20": { id: "Bus_20", number: 20, x: 308, y: 466, label: "B20", name: "Bus 20 (Load Substation)", isLoad: true, baseVoltage: 0.991, activePowerMW: 680.0, reactivePowerMVAR: 103.0 },
  "Bus_21": { id: "Bus_21", number: 21, x: 752, y: 303, label: "B21", name: "Bus 21 (Load Substation)", isLoad: true, baseVoltage: 1.032, activePowerMW: 274.0, reactivePowerMVAR: 115.0 },
  "Bus_22": { id: "Bus_22", number: 22, x: 678, y: 201, label: "B22", name: "Bus 22 (Junction)", baseVoltage: 1.050, activePowerMW: 0.0, reactivePowerMVAR: 0.0 },
  "Bus_23": { id: "Bus_23", number: 23, x: 517, y: 238, label: "B23", name: "Bus 23 (Load Substation)", isLoad: true, baseVoltage: 1.045, activePowerMW: 247.5, reactivePowerMVAR: 84.6 },
  "Bus_24": { id: "Bus_24", number: 24, x: 621, y: 333, label: "B24", name: "Bus 24 (Load Substation)", isLoad: true, baseVoltage: 1.038, activePowerMW: 308.6, reactivePowerMVAR: -92.2 },
  "Bus_25": { id: "Bus_25", number: 25, x: 964, y: 758, label: "B25", name: "Bus 25 (Load Substation)", isLoad: true, baseVoltage: 1.058, activePowerMW: 224.0, reactivePowerMVAR: 47.2 },
  "Bus_26": { id: "Bus_26", number: 26, x: 747, y: 730, label: "B26", name: "Bus 26 (Load Substation)", isLoad: true, baseVoltage: 1.052, activePowerMW: 139.0, reactivePowerMVAR: 17.0 },
  "Bus_27": { id: "Bus_27", number: 27, x: 697, y: 623, label: "B27", name: "Bus 27 (Load Substation)", isLoad: true, baseVoltage: 1.038, activePowerMW: 281.0, reactivePowerMVAR: 75.5 },
  "Bus_28": { id: "Bus_28", number: 28, x: 561, y: 764, label: "B28", name: "Bus 28 (Load Substation)", isLoad: true, baseVoltage: 1.050, activePowerMW: 206.0, reactivePowerMVAR: 27.6 },
  "Bus_29": { id: "Bus_29", number: 29, x: 638, y: 823, label: "B29", name: "Bus 29 (Load Substation)", isLoad: true, baseVoltage: 1.050, activePowerMW: 283.5, reactivePowerMVAR: 26.9 },
  "Bus_30": { id: "Bus_30", number: 30, x: 1211, y: 803, label: "G30", name: "Gen 30 (Slack Generator)", isGen: true, isSlack: true, baseVoltage: 1.048, activePowerMW: 250.0, reactivePowerMVAR: 145.0 },
  "Bus_31": { id: "Bus_31", number: 31, x: 1900, y: 405, label: "G31", name: "Gen 31 (Nuclear Generator)", isGen: true, baseVoltage: 0.982, activePowerMW: 560.0, reactivePowerMVAR: 85.0 },
  "Bus_32": { id: "Bus_32", number: 32, x: 1585, y: 162, label: "G32", name: "Gen 32 (Thermal Generator)", isGen: true, baseVoltage: 0.983, activePowerMW: 650.0, reactivePowerMVAR: 205.0 },
  "Bus_33": { id: "Bus_33", number: 33, x: 350, y: 374, label: "G33", name: "Gen 33 (Hydro Generator)", isGen: true, baseVoltage: 0.997, activePowerMW: 632.0, reactivePowerMVAR: 108.0 },
  "Bus_34": { id: "Bus_34", number: 34, x: 100, y: 461, label: "G34", name: "Gen 34 (Gas Turbine)", isGen: true, baseVoltage: 1.012, activePowerMW: 508.0, reactivePowerMVAR: 167.0 },
  "Bus_35": { id: "Bus_35", number: 35, x: 655, y: 100, label: "G35", name: "Gen 35 (Combined Cycle)", isGen: true, baseVoltage: 1.049, activePowerMW: 650.0, reactivePowerMVAR: 211.0 },
  "Bus_36": { id: "Bus_36", number: 36, x: 357, y: 173, label: "G36", name: "Gen 36 (Coal Thermal)", isGen: true, baseVoltage: 1.064, activePowerMW: 560.0, reactivePowerMVAR: 100.0 },
  "Bus_37": { id: "Bus_37", number: 37, x: 979, y: 865, label: "G37", name: "Gen 37 (Wind/Hydro Hub)", isGen: true, baseVoltage: 1.028, activePowerMW: 540.0, reactivePowerMVAR: 0.0 },
  "Bus_38": { id: "Bus_38", number: 38, x: 509, y: 900, label: "G38", name: "Gen 38 (Gas Turbine)", isGen: true, baseVoltage: 1.027, activePowerMW: 830.0, reactivePowerMVAR: 22.0 },
  "Bus_39": { id: "Bus_39", number: 39, x: 1567, y: 763, label: "G39", name: "Gen 39 (Major Grid Interconnect)", isGen: true, baseVoltage: 1.030, activePowerMW: 1000.0, reactivePowerMVAR: 88.0 }
};

export const IEEE39_LINES: TransmissionLine[] = [
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

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "monitor",
    step: 1,
    name: "MONITOR",
    tagline: "Authoritative Telemetry Ingestion",
    component: "Digital Twin IEEE 39-Bus",
    description: "Digital Twin mengira keadaan aliran kuasa AC penuh dan menerbitkan telemetri 39 bas pada topik MQTT 'pypy/grid/telemetry'.",
    action: "Menjana vektor voltan, arus, kuasa aktif/reaktif dan status pemutus litar secara langsung.",
    color: "#0071e3"
  },
  {
    id: "detect",
    step: 2,
    name: "DETECT",
    tagline: "Multi-Model Parallel Inference",
    component: "LSTM, GNN, ST-GNN & PINN",
    description: "4 model AI menganalisis siri masa 156-dimensi dan struktur topologi graf serentak untuk mengesan pencerobohan siber.",
    action: "Mengasingkan corak FDIA licik yang cuba mengelirukan Bad Data Detector konvensional.",
    color: "#06b6d4"
  },
  {
    id: "validate",
    step: 3,
    name: "VALIDATE",
    tagline: "Physics-Informed KCL/KVL Verification",
    component: "PINN & Dynamic TRUST Engine",
    description: "Mengesahkan ketidaksamaan kuasa fizikal di setiap bas dan mengira skor kepercayaan sensor (TRUST Score) secara analitikal.",
    action: "Menolak amaran palsu yang berpunca daripada variasi beban biasa berbanding serangan berniat jahat.",
    color: "#8b5cf6"
  },
  {
    id: "decide",
    step: 4,
    name: "DECIDE",
    tagline: "Dual-Policy RL Consensus & Safety Gate",
    component: "PPO + DQN Consensus & AI Orchestrator",
    description: "Kedua-dua model PPO dan DQN mesti mencapai konsensus sebelum usul pemulihan diuji dalam AC Restoration Sandbox.",
    action: "Menguatkuasakan tempoh bertenang 5.2s dan menolak sebarang tindakan yang berisiko mencetuskan blackout.",
    color: "#f59e0b"
  },
  {
    id: "recover",
    step: 5,
    name: "RECOVER",
    tagline: "Physical Actuation & Convergence Proof",
    component: "Digital Twin State Execution",
    description: "Arahan kawalan yang diluluskan dilaksanakan ke atas pemutus litar, dan telemetri baharu mengesahkan 'GRID SECURED'.",
    action: "Grid dipulihkan sepenuhnya ke keadaan nominal dengan aliran kuasa AC yang stabil.",
    color: "#10b981"
  }
];

export const ATTACK_SCENARIOS: AttackType[] = [
  {
    id: "fdia",
    name: "FDIA ATTACK",
    target: "Bus 5 Telemetry (+0.15 Bias)",
    description: "Penyerang menyuntik ralat bias voltan palsu ke atas penderia Bus 5 untuk mengelirukan penganggar keadaan.",
    impact: "Penurunan ketara TRUST Score, peningkatan ketara ralat rekonstruksi, pemicuan amaran GRID_DEVIATION.",
    defenseAction: "AI Detection mengenal pasti Bus 5. Pintu keselamatan menolak pengasingan yang tidak perlu bagi mengelakkan gangguan kuasa."
  },
  {
    id: "breaker",
    name: "BREAKER ATTACK",
    target: "Line L_line_0 (Bus 1 - Bus 2)",
    description: "Arahan tanpa kebenaran membuka suis pemutus litar pada talian penghantaran utama L_line_0.",
    impact: "Kehilangan sambungan fizikal, lonjakan beban pada talian bersebelahan, status breaker menjadi OPEN.",
    defenseAction: "PPO & DQN merancang pemulihan. Sandbox AC menyemak aliran kuasa (13.47 ms), Orchestrator meluluskan CLOSE, grid disahkan stabil."
  },
  {
    id: "load",
    name: "LOAD MANIPULATION",
    target: "Substation Reactive Power Overload",
    description: "Manipulasi berskala besar ke atas beban reaktif di beberapa bas pengguna serentak.",
    impact: "Ketidakstabilan voltan sistem, penurunan voltan di bawah 0.90 p.u., amaran ST-GNN propagation.",
    defenseAction: "ST-GNN menjejak penularan riak kuasa. Logik FLISR menyeimbangkan semula aliran kuasa tanpa pemadaman meluas."
  }
];

export const AI_MODELS: AiModelInfo[] = [
  {
    id: "lstm",
    name: "Long Short-Term Memory",
    acronym: "LSTM",
    type: "Temporal & Reconstruction Anomaly Detection",
    role: "Menganalisis siri masa tetingkap W=20 untuk mengesan anomali tingkah laku sensor dan variasi dinamik.",
    accentColor: "border-indigo-500",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    inputDim: "156 elemen (39 Bas × 4 Ciri: P, Q, V, Theta)",
    architecture: "Multi-layer Bi-LSTM + Dense Reconstruction Head",
    keyFeature: "Pengesanan 100% tepat bagi DOS, FDIA, N-1 Generator, N-1 Line, dan N-2.",
    metric: "1.0000 Recall pada FDIA & DOS",
    accuracyPercent: 99.2,
    description: "Memproses tetingkap masa bergerak tanpa kebocoran data untuk mengenali perubahan drastik atau drift perlahan.",
    whyItMatters: "Pengesan berasaskan ambang statik biasa mudah diperdaya; LSTM menangkap dinamik gelinciran gelombang dan aliran fasa masa.",
    formulaOrConcept: "h_t = \\sigma(W_x x_t + W_h h_{t-1} + b) \\rightarrow e_t = ||x_t - \\hat{x}_t||^2"
  },
  {
    id: "gnn",
    name: "Graph Neural Network",
    acronym: "GNN",
    type: "Spatial Topology & Node-Level Anomaly Localisation",
    role: "Memodelkan topologi elektrik fizikal sebagai graf di mana bas adalah nod dan talian transmisi adalah sisi.",
    accentColor: "border-purple-500",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    inputDim: "39 Nod (Ciri Bas) + 46 Sisi (Ciri Talian Kuasa & Transformer)",
    architecture: "Graph Convolutional Network (GCN) + Edge-Feature Passing",
    keyFeature: "Memetakan anomali secara spatial ke nod sasaran khusus (contoh: Bus 5 yang diserang).",
    metric: "86.42% Weighted F1-Score",
    accuracyPercent: 86.4,
    description: "Menghubungkan hukum sambungan talian elektrik terus ke dalam perwakilan terbenam rangkaian neural.",
    whyItMatters: "Sekiranya penyerang mengubah data di satu bas, GNN mengesan ketidakharmonian topologi dengan bas bersebelahan serta-merta.",
    formulaOrConcept: "H^{(l+1)} = \\sigma\\left(\\tilde{D}^{-\\frac{1}{2}} \\tilde{A} \\tilde{D}^{-\\frac{1}{2}} H^{(l)} W^{(l)}\\right)"
  },
  {
    id: "stgnn",
    name: "Spatio-Temporal GNN",
    acronym: "ST-GNN",
    type: "Propagation Dynamics & Spatio-Temporal Risk",
    role: "Menggabungkan keupayaan temporal dan topologi graf untuk menjejak penularan kerosakan merentasi masa dan ruang.",
    accentColor: "border-cyan-500",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    inputDim: "Tetingkap Temporal Ruang (39 Nod × 4 Ciri × 20 Timesteps)",
    architecture: "Spatial Graph Convolution + Temporal Gated Convolutional Blocks (TCN)",
    keyFeature: "Mengesan riak gangguan (disturbance ripple) yang merebak dari titik serangan ke kawasan sekitar.",
    metric: "MSE Rendah & Kepekaan Penularan",
    accuracyPercent: 91.5,
    description: "Mencegah fenomena cascading blackout dengan meramal arah aliran ketidakstabilan sebelum pemutus litar lain terpelantik.",
    whyItMatters: "Kerosakan grid merebak pantas mengikut aliran kuasa; ST-GNN meramalkan impak seterusnya dalam pecahan saat.",
    formulaOrConcept: "\\mathcal{G} = (\\mathcal{V}, \\mathcal{E}, W) \\ast_{\\mathcal{G}} X_t \\otimes \\text{TemporalConv}(X)"
  },
  {
    id: "pinn",
    name: "Physics-Informed Neural Network",
    acronym: "PINN & Physics",
    type: "Analytical KCL / KVL & Y-Bus Consistency Check",
    role: "Menghukum model jika meramalkan nilai voltan atau arus yang melanggar Hukum Arus & Voltan Kirchhoff (KCL/KVL).",
    accentColor: "border-emerald-500",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    inputDim: "Matriks Admitans Grid Y-bus (39×39) + Vektor Keadaan Telemetri",
    architecture: "Loss = \\mathcal{L}_{data} + \\lambda \\mathcal{L}_{physics} (KCL/KVL Residuals)",
    keyFeature: "Penyingkiran halusinasi AI; menjamin keputusan AI mematuhi hukum fizik elektrik.",
    metric: "100% Kepatuhan Had Fizikal Nominal",
    accuracyPercent: 100.0,
    description: "Mengira residual ketidakseimbangan kuasa (power mismatch) KCL di setiap bas untuk membongkar cubaan penyamaran data palsu.",
    whyItMatters: "Penyerang cerdik boleh menipu model pembelajaran mesin biasa, tetapi mereka TIDAK BOLEH menipu hukum fizik asas tenaga elektrik.",
    formulaOrConcept: "\\mathcal{L}_{physics} = \\sum_{i=1}^{N_{bus}} \\left| P_i - V_i \\sum_{j} V_j (G_{ij}\\cos\\theta_{ij} + B_{ij}\\sin\\theta_{ij}) \\right|"
  },
  {
    id: "rl_consensus",
    name: "PPO & DQN Dwi-Polisi Tetulang",
    acronym: "PPO / DQN",
    type: "Reinforcement Learning Autonomous Recovery",
    role: "Mempelajari tindakan pemulihan optimal (contohnya menyambung semula talian terpelantik secara selamat).",
    accentColor: "border-amber-500",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    inputDim: "Vektor Keadaan Grid 72-Dimensi melalui deterministic 9-bin compatibility encoder",
    architecture: "Proximal Policy Optimization (PPO) + Deep Q-Network (DQN)",
    keyFeature: "Mewajibkan konsensus dwi-agen sebelum sesuatu tindakan diserahkan kepada sandbox pengesahan.",
    metric: "Kadar Pengurangan Pemadaman ke 13.3%",
    accuracyPercent: 94.2,
    description: "Mengelakkan tindakan terburu-buru dengan memadankan dasar PPO dan DQN bagi mengurangkan beban kognitif pengendali.",
    whyItMatters: "Satu model RL boleh mempunyai bias; konsensus dwi-agen menjamin kestabilan strategi kawalan.",
    formulaOrConcept: "L^{CLIP}(\\theta) = \\hat{\\mathbb{E}}_t \\left[ \\min(r_t(\\theta)\\hat{A}_t, \\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon)\\hat{A}_t) \\right]"
  },
  {
    id: "orchestrator",
    name: "AI Orchestrator & Safety Gate",
    acronym: "Orchestrator",
    type: "Deterministic Safety Gatekeeper & Action Veto",
    role: "Pintu kelulusan mutlak yang mengawal tindakan fizikal pada pemutus litar grid dengan sokongan AC Restoration Sandbox.",
    accentColor: "border-rose-500",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    inputDim: "Cadangan Tindakan + Konteks Ancaman + Keputusan Sandbox AC + Status Cooldown",
    architecture: "Deterministic Rule-based Safety Governor with AC Power Flow Sandbox Rehearsal",
    keyFeature: "Kuasa VETO 100% terhadap cadangan pemulihan yang tidak selamat atau bertindih.",
    metric: "100% Reject Unsafe Reconnection",
    accuracyPercent: 100.0,
    description: "Memastikan pematuhan had voltan (0.95 - 1.05 p.u.) dan menguatkuasakan tempoh rehat pemutus litar (5.2s cooldown guard).",
    whyItMatters: "Menghapuskan risiko AI terlajak bertindak yang boleh merosakkan transformer atau aset penjanaan.",
    formulaOrConcept: "\\text{Action Approved} \\iff \\text{SandboxPass} \\land \\text{CooldownExpired} \\land \\text{OutageVerified} \\land \\neg\\text{Veto}"
  }
];

export const CHAPTER4_METRICS = {
  keyStats: [
    { label: "Overall Detection Confidence", value: "98.7%", sub: "Multi-Model AI Fusion on Verified Callsets", color: "text-[#0071e3]" },
    { label: "IEEE Monitored Buses", value: "39", sub: "New England Digital Twin (46 branches, 10 gen)", color: "text-[#10b981]" },
    { label: "Solver Latency Target", value: "<150 ms", sub: "13.47 ms Average Sandbox AC Power Flow Dry-Run", color: "text-[#8b5cf6]" },
    { label: "AI Defence Architecture", value: "5-LAYER", sub: "Temporal, Graph Spatial, PINN, Threat Fusion, Safety Gate", color: "text-[#06b6d4]" },
    { label: "Autonomous Recovery Rate", value: "100%", sub: "Verified Test Scenarios without Overvoltage", color: "text-[#10b981]" },
    { label: "Data Leakage Overlap", value: "0.0%", sub: "Chronological Label-Block Partition Audit (Table 4.3)", color: "text-[#0071e3]" }
  ],

  leakageAuditTable: [
    { pair: "Train vs Test", randomSplit: "99.46% (7,227 tetingkap tercemar)", chronoSplit: "0.0% (0 tetingkap)", reduction: "100.0% Dihapuskan" },
    { pair: "Train vs Validation", randomSplit: "99.75% (7,248 tetingkap tercemar)", chronoSplit: "0.0% (0 tetingkap)", reduction: "100.0% Dihapuskan" },
    { pair: "Validation vs Test", randomSplit: "99.23% (1,545 tetingkap tercemar)", chronoSplit: "0.0% (0 tetingkap)", reduction: "100.0% Dihapuskan" }
  ],

  lstmPerformance: [
    { attackClass: "DOS", precision: 1.0, recall: 1.0, f1: 1.0 },
    { attackClass: "FDIA", precision: 1.0, recall: 1.0, f1: 1.0 },
    { attackClass: "N1_GEN", precision: 1.0, recall: 1.0, f1: 1.0 },
    { attackClass: "N1_LINE", precision: 1.0, recall: 1.0, f1: 1.0 },
    { attackClass: "N2_TRIP", precision: 1.0, recall: 1.0, f1: 1.0 },
    { attackClass: "VOLT_DROP", precision: 1.0, recall: 1.0, f1: 1.0 },
    { attackClass: "REPLAY", precision: 0.50, recall: 1.0, f1: 0.67 }
  ],

  gnnComparison: [
    { metric: "Ketepatan (Accuracy)", rawModel: 86.60, heuristic: 86.41 },
    { metric: "Ketepatan Berwajaran (Precision)", rawModel: 80.67, heuristic: 86.50 },
    { metric: "Kebolehan Mengesan (Recall)", rawModel: 86.60, heuristic: 86.41 },
    { metric: "F1-Score Berwajaran", rawModel: 82.57, heuristic: 86.42 },
    { metric: "F1-Score Makro", rawModel: 82.08, heuristic: 85.98 }
  ]
};

export const CHAPTER4_DATA = CHAPTER4_METRICS;

export interface FlowStep {
  step: number;
  title: string;
  subtitle: string;
  phase: string;
  badge: string;
  mqttTopic: string;
  description: string;
  technicalDetails: string;
  safetyCheck: string;
}

export const FLOW_STEPS: FlowStep[] = [
  {
    step: 1,
    title: "1. Pengambilan Telemetri",
    subtitle: "Digital Twin Telemetry Stream",
    phase: "Pemantauan",
    badge: "Fasa 1: Ingestion",
    mqttTopic: "pypy/grid/telemetry",
    description: "Digital Twin IEEE 39-Bus mengira aliran kuasa AC dan menerbitkan vektor telemetri 156-dimensi secara masa nyata ke atas broker MQTT.",
    technicalDetails: "Vektor merangkumi P (MW), Q (MVAR), V (p.u.), dan fasa voltan theta untuk kesemua 39 bas transmisi New England.",
    safetyCheck: "Penyerapan data disahkan tanpa kebocoran masa (temporal leakage free) dengan pembahagian label blok kronologi."
  },
  {
    step: 2,
    title: "2. Pengesanan AI Selari",
    subtitle: "Multi-Model Parallel Inference",
    phase: "Pengesanan",
    badge: "Fasa 2: Detection",
    mqttTopic: "pypy/ai/detection",
    description: "Model Bi-LSTM dan GNN menganalisis siri masa temporal dan struktur topologi spatial serentak untuk mengesan pencerobohan siber.",
    technicalDetails: "Bi-LSTM memproses tetingkap gelongsor W=20 sementara GNN mengira konvolusi spatial pada 39 nod dan 46 talian penghantaran.",
    safetyCheck: "100% recall pada serangan FDIA dan Denial-of-Service tanpa bergantung pada andaian BDD linear konvensional."
  },
  {
    step: 3,
    title: "3. Pengesahan Fizik Elektrik",
    subtitle: "PINN & Physics Residual Check",
    phase: "Pengesahan",
    badge: "Fasa 3: Validation",
    mqttTopic: "pypy/physics/validation",
    description: "Enjin PINN mengira ketidaksamaan kuasa KCL/KVL untuk membezakan perubahan beban biasa dengan manipulasi data berniat jahat.",
    technicalDetails: "Pengiraan residual admitans Y-bus pada setiap bas: r_i = |P_i - V_i sum(V_j Y_ij cos(theta_ij))|.",
    safetyCheck: "Menolak amaran palsu (false alarms) bagi memelihara ketersediaan bekalan elektrik tanpa pengasingan yang tidak perlu."
  },
  {
    step: 4,
    title: "4. Penilaian Skor Ancaman",
    subtitle: "Dynamic TRUST Score Engine",
    phase: "Penilaian",
    badge: "Fasa 4: Scoring",
    mqttTopic: "pypy/threat/score",
    description: "Menggabungkan kebarangkalian anomali AI dan baki fizik menjadi skor kepercayaan penderia pundi (TRUST Score 0.0 - 1.0).",
    technicalDetails: "Penderia Bus 5 yang dimanipulasi mencatatkan penurunan TRUST score secara mendadak ke paras kritikal 0.12.",
    safetyCheck: "Isyarat telemetri tercemar diasingkan serta-merta daripada kitaran anggaran keadaan grid."
  },
  {
    step: 5,
    title: "5. Konsensus RL & Pintu Keselamatan",
    subtitle: "PPO + DQN & Sandbox Rehearsal",
    phase: "Keputusan",
    badge: "Fasa 5: Consensus",
    mqttTopic: "pypy/decision/consensus",
    description: "Kedua-dua model PPO dan DQN mencapai konsensus tindakan, kemudian diuji dalam AC Restoration Sandbox (13.47 ms).",
    technicalDetails: "Ujian kering Newton-Raphson mengesahkan aliran kuasa tidak melanggar had voltan (0.95 - 1.05 p.u.) sebelum suis ditutup.",
    safetyCheck: "Kuasa VETO 100% menolak tindakan berbahaya, diperkuat oleh tempoh bertenang 5.2s bagi menyekat breaker hunting."
  },
  {
    step: 6,
    title: "6. Pemulihan Kendiri Berautonomi",
    subtitle: "Autonomous Physical Actuation",
    phase: "Pemulihan",
    badge: "Fasa 6: Recovery",
    mqttTopic: "pypy/actuation/result",
    description: "Arahan pemulihan dilaksanakan pada pemutus litar fizikal dan telemetri seterusnya mengesahkan status 'GRID SECURED'.",
    technicalDetails: "Pemutus litar disambung semula secara berperingkat tanpa lonjakan voltan atau lonjakan beban terlampau.",
    safetyCheck: "100% pemulihan berjaya dalam semua senario ujian piawai dengan kestabilan voltan terjamin."
  }
];

export const VIVA_SLIDES = [
  {
    id: 1,
    slideNumber: "Slaid 01",
    category: "Pengenalan & Profil FYP",
    title: "Sistem Imun Siber-Fizikal AI Untuk Grid Pintar",
    subtitle: "Protect Your Power, Protect Yourself (PYPY) — Universiti Malaysia Perlis",
    keyPoints: [
      "Calon: demie24 | Program: Diploma Kejuruteraan Elektrik / Komputer, UniMAP.",
      "Latar Belakang: Transformasi grid elektrik konvensional kepada Smart Grid membawa pendedahan ancaman siber kritikal.",
      "Objektif Teras: Mereka bentuk platform simulasi Digital Twin berbilang agen AI yang mampu mengesan, mengasingkan, dan memulihkan grid secara automatik dan selamat."
    ],
    vivaSpeakerNotes: "Selamat pagi kepada barisan panel penilai. Hari ini saya mempersembahkan projek FYP bertajuk PYPY: AI-Driven Cyber-Physical Immune System for Smart Grid. Projek ini menangani isu keselamatan siber kritikal pada grid kuasa negara menggunakan pendekatan sistem imun AI teragih.",
    highlightStat: { label: "Model Penanda Aras", value: "IEEE 39-Bus", color: "text-[#0071e3]" }
  },
  {
    id: 2,
    slideNumber: "Slaid 02",
    category: "Pernyataan Masalah",
    title: "Ancaman Siber-Fizikal & Batasan Sistem Sedia Ada",
    subtitle: "Mengapa Pengesan Anomali Biasa Gagal Melindungi Grid?",
    keyPoints: [
      "Serangan Suntikan Data Palsu (FDIA): Penyerang memanipulasi ukuran voltan/kuasa sehingga mengelirukan Bad Data Detector (BDD) konvensional.",
      "Manipulasi Pemutus Litar (Breaker Manipulation): Perintah berniat jahat membuka talian penting boleh mencetuskan pemadaman bersiri (Cascading Blackout).",
      "Kelemahan Model AI Tunggal: AI biasa mudah berhalusinasi atau mencetuskan 'false trip' tanpa menyemak had fizik sebenar."
    ],
    vivaSpeakerNotes: "Panel yang dihormati, masalah utama sistem SCADA sedia ada ialah algoritma semakan residu konvensional tidak dapat membezakan antara variasi beban fizikal dengan serangan FDIA yang terancang.",
    highlightStat: { label: "Sasaran Kajian", value: "FDIA & Breaker Attack", color: "text-red-500" }
  },
  {
    id: 3,
    slideNumber: "Slaid 03",
    category: "Konsep & Falsafah Reka Bentuk",
    title: "Metafora Sistem Imun Siber-Fizikal (Cyber-Physical Immune)",
    subtitle: "Pertahanan Bertingkat: Patogen, Antibodi AI & Pintu Keselamatan",
    keyPoints: [
      "Patogen (Pathogen): Serangan siber FDIA, DoS, Replay, dan pelantikan pemutus litar yang disengajakan.",
      "Tindak Balas Imun: Barisan 4 model AI selari (LSTM, GNN, ST-GNN, PINN) mengesan anomali dari aspek masa, topologi, dan hukum fizik.",
      "Pintu Kelulusan Keselamatan (Safety Gating): Tiada amaran AI dibenarkan menggerakkan suis tanpa melepasi AC Restoration Sandbox dan kelulusan Orchestrator."
    ],
    vivaSpeakerNotes: "Kami menerapkan analogi biologi: serangan disifatkan sebagai patogen, manakala gabungan model AI bertindak sebagai sel imun. Amaran pengesanan hanya memberikan 'konteks', bukan 'kuasa mutlak' untuk menggerakkan suis fizikal.",
    highlightStat: { label: "Bilangan Mikroservis", value: "19 Perkhidmatan", color: "text-purple-600" }
  },
  {
    id: 4,
    slideNumber: "Slaid 04",
    category: "Seni Bina Sistem",
    title: "Aliran Gelung Tertutup (End-to-End Closed-Loop Architecture)",
    subtitle: "Dari Telemetri Sebenar ke Pengesahan Pemulihan Fizikal",
    keyPoints: [
      "Digital Twin IEEE 39-Bus: Membina persekitaran simulasi AC sebenar dengan 39 bas, 46 talian, 10 generator, dan 21 beban.",
      "Bas Mesej MQTT: Menghubungkan telemetri pada topik 'pypy/grid/telemetry' dengan kependaman sub-saat.",
      "Gelung Tertutup Sah: Serangan → Pengesanan AI → Penilaian Ancaman → Konsensus RL → Sandbox AC → Kelulusan Orchestrator → Grid Stabil."
    ],
    vivaSpeakerNotes: "Rajah ini memaparkan aliran runtime sebenar. Bermula dari Digital Twin yang menerbitkan telemetri penuh, disaring selari oleh 4 model, digabungkan dalam Threat Scorer, dirancang oleh konsensus PPO/DQN, disahkan dalam Sandbox AC, dan akhirnya diluluskan oleh AI Orchestrator.",
    highlightStat: { label: "Topik MQTT Autoritatif", value: "pypy/grid/telemetry", color: "text-[#06b6d4]" }
  },
  {
    id: 5,
    slideNumber: "Slaid 05",
    category: "Kecerdasan Buatan Selari",
    title: "Multi-Model AI Detection & Physics Validation",
    subtitle: "Menggabungkan Kekuatan Analisis Masa, Graf, dan Hukum Kirchhoff",
    keyPoints: [
      "LSTM: Analisis 156-dimensi tetingkap masa untuk mengesan anomali temporal (F1 = 1.00 pada FDIA & DoS).",
      "GNN & ST-GNN: Memetakan grid sebagai graf nod-sisi untuk mengesan lokasi anomali bas dan corak penularan.",
      "PINN (Physics-Informed): Menguatkuasakan hukum KCL/KVL untuk menghalang kesilapan halusinasi model AI."
    ],
    vivaSpeakerNotes: "Di sini kita dapat melihat keunikan projek ini. Setiap model menutup kelemahan model lain. LSTM hebat dalam siri masa, GNN hebat dalam topologi nod, manakala PINN memastikan model tidak melanggar hukum elektrik asas Kirchhoff.",
    highlightStat: { label: "Dimensi Vektor Input", value: "156 Elemen", color: "text-[#10b981]" }
  },
  {
    id: 6,
    slideNumber: "Slaid 06",
    category: "Kajian Metodologi Bab 4",
    title: "Pencegahan Kebocoran Data (Data Leakage Resolution)",
    subtitle: "Inovasi Pembahagian Blok Label Kronologi (Chronological Partitions)",
    keyPoints: [
      "Isu Industri: Kaedah 'random sliding-window split' biasa menyebabkan 99.48% kebocoran data tersembunyi antara data latih dan data ujian.",
      "Penyelesaian PYPY: Algoritma pembahagian blok kronologi sebelum proses 'windowing' membasmi pertindihan sepenuhnya.",
      "Hasil Audit: 0.0% pertindihan tetingkap sampel, menghasilkan metrik prestasi AI yang telus, tulen, dan boleh dipertahankan secara saintifik."
    ],
    vivaSpeakerNotes: "Ini adalah sumbangan saintifik utama dalam Bab 4 tesis saya. Dalam kebanyakan kajian, pembahagian rawak biasa menyebabkan 99% data tetingkap bocor. Dalam kajian ini, kami membuktikan bahawa pembahagian kronologi menghapuskan kebocoran kepada 0.0% tepat.",
    highlightStat: { label: "Kebocoran Data", value: "0.0% (Tulen)", color: "text-[#0071e3]" }
  },
  {
    id: 7,
    slideNumber: "Slaid 07",
    category: "Keputusan Eksperimen Bab 4",
    title: "Prestasi Pengesanan & Keseimbangan Model",
    subtitle: "Analisis Ketepatan Sebenar Di Bawah Pembahagian Data Telus",
    keyPoints: [
      "Pengesanan Cemerlang: 100% precision dan recall bagi kelas DOS, FDIA, kerosakan generator N-1, dan trip talian N-1.",
      "Penemuan Kejujuran Akademik: Kelas Replay mencatat F1 0.67 kerana profil data ulangan menyerupai keadaan statik beban biasa.",
      "GNN Spatial: Model asas GNN mencapai F1 82.57%, dan meningkat kepada 86.42% apabila digandingkan dengan heuristik komponen terhubung."
    ],
    vivaSpeakerNotes: "Berdasarkan jadual penilaian Bab 4, model mencapai 100% recall pada serangan teras. Kami juga merekodkan batasan model siri masa pada serangan Replay secara telus.",
    highlightStat: { label: "FDIA F1-Score", value: "1.0000", color: "text-[#0071e3]" }
  },
  {
    id: 8,
    slideNumber: "Slaid 08",
    category: "Keselamatan & Pintu Sandbox AC",
    title: "AC Restoration Sandbox & Multi-Agent Safety",
    subtitle: "Ujian Kering Pantas 13.47 ms Sebelum Sebarang Tindakan Fizikal",
    keyPoints: [
      "100% Penolakan Percubaan Bahaya: Sandbox berjaya menolak 100% cubaan penyambungan semula talian yang belum diasingkan atau tidak stabil.",
      "Kependaman Sangat Rendah: Ujian kering aliran kuasa AC selesai dalam purata 13.47 ms (20 lelaran lejar).",
      "Pengawal Kestabilan (5.2s Cooldown): Menghalang pergerakan suis berulang-kali (breaker hunting) yang boleh merosakkan geganti fizikal."
    ],
    vivaSpeakerNotes: "Inilah benteng keselamatan terpenting. Sebelum pemutus litar ditutup semula, Sandbox AC menjalankan simulasi pantas 13.47 milisaat. Sekiranya aliran kuasa menunjukkan ketidakstabilan, arahan dibatalkan serta-merta.",
    highlightStat: { label: "Kependaman Sandbox", value: "13.47 ms", color: "text-[#10b981]" }
  },
  {
    id: 9,
    slideNumber: "Slaid 09",
    category: "Demonstrasi Langsung (Live Demo)",
    title: "Hub Demonstrasi Operasi Sebenar & Exhibition Mode",
    subtitle: "Ujian Masa Nyata Pada Digital Twin IEEE 39-Bus",
    keyPoints: [
      "Sedia Untuk Ujian Viva: Menjalankan 19 perkhidmatan kontena Docker yang sihat.",
      "Senario 1: Suntikan FDIA pada Bus 5 → Pengesanan kritikal, penurunan TRUST score, penolakan tindakan merbahaya.",
      "Senario 2: Manipulasi Pemutus Litar L_line_0 → Pengesanan kehilangan talian, konsensus pemulihan PPO/DQN, sandbox pass, dan pengesahan pemulihan automatik 'GRID SECURED'."
    ],
    vivaSpeakerNotes: "Sekiranya panel penilai ingin menyaksikan demonstrasi langsung, sistem sedia dibuka pada pelayan tempatan port 3001.",
    highlightStat: { label: "Status Stack", value: "19/19 Sihat", color: "text-[#10b981]" }
  },
  {
    id: 10,
    slideNumber: "Slaid 10",
    category: "Kesimpulan & Hala Tuju",
    title: "Kesimpulan, Impak FYP & Cadangan Masa Depan",
    subtitle: "Penyelidikan Lengkap Dari Teori Sehingga Sistem Berfungsi Penuh",
    keyPoints: [
      "Pencapaian Objektif: Berjaya membina Digital Twin IEEE 39-Bus dengan pertahanan AI pelbagai lapisan dan pintu keselamatan yang terbukti berkesan.",
      "Sumbangan Utama: Reka bentuk seni bina imun siber-fizikal berasaskan MQTT dan penyelesaian kebocoran data siri masa.",
      "Hala Tuju Masa Depan: Pengujian pada perkakasan sebenar (Hardware-in-the-Loop / HIL) dengan relay perlindungan fizikal dan protokol IEC 61850."
    ],
    vivaSpeakerNotes: "Secara kesimpulannya, projek PYPY membuktikan bahawa integrasi AI dengan kawalan pintu keselamatan fizik adalah penyelesaian terbaik bagi melindungi infrastruktur grid pintar negara. Terima kasih, saya membuka sesi soal jawab.",
    highlightStat: { label: "Keputusan Akhir", value: "VIVA READY", color: "text-purple-600" }
  }
];
