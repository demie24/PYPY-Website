import React, { useState } from 'react';
import { 
  GitBranch, 
  ShieldAlert, 
  Cpu, 
  Scale, 
  Workflow, 
  ShieldCheck, 
  Radio, 
  AlertTriangle,
  CheckCircle,
  Code2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { FLOW_STEPS } from '../data';

export const ArchitectureFlow: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const activeStep = FLOW_STEPS[selectedStepIndex];

  return (
    <section className="ops-dashboard">
      
      {/* Hero Intro */}
      <div className="ops-hero">
        <div>
          <div className="ops-live-label">
            <span className="ops-live-dot" /> Cyber-Physical Pipeline
          </div>
          <h1>Seni Bina Pertahanan Siber-Fizikal</h1>
          <p>Aliran menyeluruh gelung tertutup dari telemetri mentah sehingga pengesahan pemulihan grid.</p>
        </div>
        <div className="ops-hero-status">
          <span className="ops-status-badge status-healthy">
            <ShieldCheck size={16} /> 6 Fasa Pengesahan
          </span>
          <div>
            <strong>IEEE 39-Bus</strong>
            <span>46 Branches Monitored</span>
          </div>
        </div>
      </div>

      {/* 6 Step Cards Indicator */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {FLOW_STEPS.map((step, idx) => {
          const isSelected = idx === selectedStepIndex;
          return (
            <button
              key={step.step}
              onClick={() => setSelectedStepIndex(idx)}
              className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                isSelected 
                  ? 'bg-[#17324d] text-white border-[#17324d] shadow-md scale-[1.02]'
                  : 'bg-white border-[#dce9ef] text-[#17324d] hover:bg-[#edf8f8] hover:border-[#77cdd1]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#e5edf1] text-[#70889b]'
                }`}>
                  Fasa 0{step.step}
                </span>
                {idx === 0 && <ShieldAlert className="w-4 h-4 opacity-75" />}
                {idx === 1 && <Cpu className="w-4 h-4 opacity-75" />}
                {idx === 2 && <Scale className="w-4 h-4 opacity-75" />}
                {idx === 3 && <Workflow className="w-4 h-4 opacity-75" />}
                {idx === 4 && <AlertTriangle className="w-4 h-4 opacity-75" />}
                {idx === 5 && <ShieldCheck className="w-4 h-4 opacity-75" />}
              </div>

              <div className="text-xs font-bold leading-snug line-clamp-2">
                {step.title.replace(/^\d+\.\s*/, '')}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Flow Stage Card */}
      <section className="ops-card p-6 sm:p-8">
        <div className="ops-section-title">
          <div className="ops-section-heading">
            <span className="ops-section-icon"><Workflow /></span>
            <div>
              <h2>{activeStep.title}: {activeStep.subtitle}</h2>
              <p>Topik MQTT Autoritatif: <strong>{activeStep.mqttTopic}</strong></p>
            </div>
          </div>
          <span className="ops-demo-pill">
            <Sparkles size={14} /> {activeStep.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
          
          <div className="lg:col-span-7 space-y-4">
            <div>
              <p className="ops-eyebrow mb-1">Penerangan Tindakan Fasa</p>
              <p className="text-sm sm:text-base text-[#17324d] font-medium leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fbfc] border border-[#e1eaee]">
              <p className="ops-eyebrow mb-1">Perincian Teknikal & Algoritma</p>
              <p className="text-xs sm:text-sm text-[#557187] leading-relaxed">
                {activeStep.technicalDetails}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-[#edfbf9] to-[#f4fafc] border border-[#b5e9d8] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#159474] mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Prinsip Keselamatan Siber-Fizikal</span>
              </div>
              <p className="text-xs sm:text-sm text-[#17324d] font-medium leading-relaxed">
                {activeStep.safetyCheck}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#d6eaeb] flex items-center justify-between text-[11px] text-[#7890a2] font-mono">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#16858a]" />
                <span>Audit Trail: Pass</span>
              </span>
              <span>Langkah {activeStep.step} daripada 6</span>
            </div>
          </div>

        </div>
      </section>

    </section>
  );
};
