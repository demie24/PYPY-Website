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
