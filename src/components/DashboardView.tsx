import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Gauge, 
  HeartPulse, 
  CircuitBoard, 
  Zap, 
  Activity, 
  Bot, 
  Radio, 
  Workflow, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  Clock3, 
  Cpu, 
  Terminal, 
  Play, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { Ieee39Topology } from './Ieee39Topology';
import { PROJECT_INFO } from '../data';

type Scenario = 'nominal' | 'fdia' | 'breaker_recovered';

export const DashboardView: React.FC = () => {
  const [scenario, setScenario] = useState<Scenario>('nominal');
  const [showTechnical, setShowTechnical] = useState(false);

  // Dynamic state based on scenario
  const isAttack = scenario === 'fdia';
  const isRecovered = scenario === 'breaker_recovered';

  const status = isAttack ? "Critical" : isRecovered ? "Recovering" : "Healthy";
  const activeAttack = isAttack ? "TARGETED_FDIA" : null;
  const threatScore = isAttack ? 100 : 0;
  const recoveryState = isRecovered ? "RESTORED" : "MONITORING";
  const openBreakers = isAttack ? 0 : isRecovered ? 0 : 0;
  const minVoltage = isAttack ? 0.882 : 1.038;
  const latestAlert = isAttack ? { type: "TARGETED_FDIA", suspect_node: "Bus_5", severity: "CRITICAL" } : null;

  const stages = [
    { label: "Attack", detail: isAttack ? "TARGETED_FDIA" : "No attack", done: isAttack || isRecovered, active: isAttack },
    { label: "Detection", detail: isAttack ? "Bus_5 anomaly" : "AI monitoring", done: isAttack || isRecovered, active: isAttack },
    { label: "Threat", detail: isAttack ? "Score 100 (CRITICAL)" : "Nominal", done: isAttack || isRecovered, active: false },
    { label: "Validation", detail: isAttack ? "Physical fault rejected" : "KCL/KVL consistent", done: isAttack || isRecovered, active: false },
    { label: "Proposal", detail: isRecovered ? "CLOSE L_line_0" : "Monitoring", done: isRecovered, active: false },
    { label: "Approval", detail: isRecovered ? "APPROVAL Granted" : "Not required", done: isRecovered, active: false },
    { label: "Execution", detail: isRecovered ? "CLOSE confirmed" : "Standby", done: isRecovered, active: false },
    { label: "Stabilized", detail: isAttack ? "Isolating threat" : "Grid within limits", done: !isAttack, active: false },
  ];

  const timeline = isAttack ? [
    { time: "09:08:12", title: "FDIA Threat Evaluated", detail: "Threat Scorer: CRITICAL (100/100) on Bus_5", tone: "danger" },
    { time: "09:08:11", title: "Targeted FDIA Detected", detail: "LSTM & GNN flagged Bus_5 reconstruction error", tone: "danger" },
    { time: "09:08:10", title: "Adversarial Injection Started", detail: "Telemetry deviation injected on Bus_5", tone: "danger" }
  ] : isRecovered ? [
    { time: "09:08:25", title: "Grid Secured", detail: "Newer telemetry confirms breaker CLOSED & finite powerflow", tone: "safe" },
    { time: "09:08:24", title: "Orchestrator Approval", detail: "AC sandbox dry-run passed (13.47 ms) & cooldown expired", tone: "safe" },
    { time: "09:08:22", title: "PPO/DQN Consensus Proposal", detail: "Proposed CLOSE on L_line_0", tone: "purple" },
    { time: "09:08:20", title: "Breaker Trip Detected", detail: "L_line_0 observed OPEN by Digital Twin", tone: "warning" }
  ] : [
    { time: "Live", title: "System Nominal", detail: "All 39 buses within 0.95 - 1.05 p.u. limits", tone: "safe" },
    { time: "Live", title: "MQTT Telemetry Flowing", detail: "Authoritative IEEE-39 solver publishing at 1 Hz", tone: "info" }
  ];

  const services = [
    ["postgres", "PostgreSQL", "online"],
    ["redis", "Redis", "online"],
    ["mqtt", "MQTT Broker", "online"],
    ["gateway", "Gateway API", "online"],
    ["dashboard", "Dashboard", "online"],
    ["digital_twin", "Digital Twin", "online"],
    ["celery_worker", "Celery Worker", "online"],
    ["celery_beat", "Celery Beat", "online"],
    ["ai_detection", "AI Detection", "healthy"],
    ["threat_scorer", "Threat Scorer", "healthy"],
    ["self_healing", "Self-Healing", "healthy"],
    ["ai_orchestrator", "AI Orchestrator", "healthy"],
    ["ai_lstm", "LSTM Temporal", "healthy"],
    ["ai_gnn", "GNN Spatial", "healthy"],
    ["ai_stgnn", "ST-GNN Spatio-Temporal", "healthy"],
    ["ai_pinn", "PINN Physics", "healthy"],
    ["ai_fusion", "AI Fusion", "healthy"],
    ["physics_validation", "TRUST / Physics", "healthy"],
    ["recovery_policy", "PPO + DQN Policy", "healthy"],
  ];

  return (
    <div className="ops-dashboard">
      
      {/* Viva Interactive Scenario Selector Banner */}
      <div className="p-4 rounded-2xl border border-brand-indigo/30 bg-gradient-to-r from-brand-indigo/10 via-brand-purple/10 to-transparent flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-indigo text-white flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-800">
              Interaktif Pembentangan Viva: Simulasi Mod Dashboard Sebenar
            </h3>
            <p className="text-[11px] text-slate-500">
              Pilih senario di bawah untuk menunjukkan bagaimana papan pemuka anda bertindak balas secara langsung di hadapan penilai:
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScenario('nominal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              scenario === 'nominal'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            1. Keadaan Normal (Baseline)
          </button>

          <button
            onClick={() => setScenario('fdia')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              scenario === 'fdia'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            2. Serangan FDIA (Bus 5)
          </button>

          <button
            onClick={() => setScenario('breaker_recovered')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              scenario === 'breaker_recovered'
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            3. Pemulihan Breaker & Grid Secured
          </button>

          <a
            href={PROJECT_INFO.liveDashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-slate-900 text-white hover:bg-slate-800"
          >
            <span>Live Container (3001)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Real ops-hero banner */}
      <section className="ops-hero">
        <div>
          <div className="ops-live-label">
            <span className="ops-live-dot" /> Live cyber-physical overview
          </div>
          <h1>PYPY Smart Grid Cyber Defense</h1>
          <p>Understand the grid, AI decision, and recovery outcome at a glance.</p>
        </div>
        <div className="ops-hero-status">
          <span className={`ops-status-badge status-${status.toLowerCase()}`}>
            <ShieldCheck size={17} /> {status}
          </span>
          <div>
            <strong>IEEE 39-Bus</strong>
            <span>39 buses · 46 lines · 10 generators</span>
          </div>
          <div>
            <strong>Solver: CONVERGED</strong>
            <span>Newton-Raphson AC powerflow</span>
          </div>
        </div>
      </section>

      {/* Real ops-kpi-grid (8 KPI cards) */}
      <section className="ops-kpi-grid" aria-label="Key grid indicators">
        
        <article className={`ops-card ops-kpi ${isAttack ? "ops-tone-danger" : "ops-tone-safe"}`}>
          <div className="ops-kpi-icon" aria-hidden="true"><ShieldCheck /></div>
          <div>
            <p className="ops-eyebrow">Active attack</p>
            <p className="ops-kpi-value">{activeAttack || "None"}</p>
            <p className="ops-muted">{isAttack ? "Defense chain is responding" : "No active attack detected"}</p>
          </div>
        </article>

        <article className={`ops-card ops-kpi ${threatScore >= 75 ? "ops-tone-danger" : threatScore >= 40 ? "ops-tone-warning" : "ops-tone-safe"}`}>
          <div className="ops-kpi-icon" aria-hidden="true"><Gauge /></div>
          <div>
            <p className="ops-eyebrow">Threat score</p>
            <p className="ops-kpi-value">{threatScore}/100</p>
            <p className="ops-muted">{isAttack ? "CRITICAL severity" : "Low nominal risk"}</p>
          </div>
        </article>

        <article className={`ops-card ops-kpi ${isRecovered ? "ops-tone-safe" : "ops-tone-purple"}`}>
          <div className="ops-kpi-icon" aria-hidden="true"><HeartPulse /></div>
          <div>
            <p className="ops-eyebrow">Recovery state</p>
            <p className="ops-kpi-value">{recoveryState}</p>
            <p className="ops-muted">{isRecovered ? "Orchestrator approval granted" : "Safety-gated monitoring"}</p>
          </div>
        </article>

        <article className={`ops-card ops-kpi ${openBreakers ? "ops-tone-warning" : "ops-tone-safe"}`}>
          <div className="ops-kpi-icon" aria-hidden="true"><CircuitBoard /></div>
          <div>
            <p className="ops-eyebrow">Open breakers</p>
            <p className="ops-kpi-value">{openBreakers}</p>
            <p className="ops-muted">46 branches monitored</p>
          </div>
        </article>

        <article className={`ops-card ops-kpi ${minVoltage < 0.9 ? "ops-tone-danger" : "ops-tone-info"}`}>
          <div className="ops-kpi-icon" aria-hidden="true"><Zap /></div>
          <div>
            <p className="ops-eyebrow">Minimum voltage</p>
            <p className="ops-kpi-value">{minVoltage.toFixed(3)} pu</p>
            <p className="ops-muted">Safe target ≥ 0.90 pu</p>
          </div>
        </article>

        <article className="ops-card ops-kpi ops-tone-info">
          <div className="ops-kpi-icon" aria-hidden="true"><Activity /></div>
          <div>
            <p className="ops-eyebrow">Maximum current</p>
            <p className="ops-kpi-value">0.842 pu</p>
            <p className="ops-muted">Highest observed branch</p>
          </div>
        </article>

        <article className={`ops-card ops-kpi ${isAttack ? "ops-tone-danger" : "ops-tone-safe"}`}>
          <div className="ops-kpi-icon" aria-hidden="true"><Bot /></div>
          <div>
            <p className="ops-eyebrow">AI alerts</p>
            <p className="ops-kpi-value">{isAttack ? "1 Active" : "0"}</p>
            <p className="ops-muted">{latestAlert ? `${latestAlert.type} · ${latestAlert.suspect_node}` : "No current anomaly"}</p>
          </div>
        </article>

        <article className="ops-card ops-kpi ops-tone-safe">
          <div className="ops-kpi-icon" aria-hidden="true"><Radio /></div>
          <div>
            <p className="ops-eyebrow">Service signals</p>
            <p className="ops-kpi-value">19/19</p>
            <p className="ops-muted">Confirmed healthy & live</p>
          </div>
        </article>

      </section>

      {/* Real ops-flow-card */}
      <section className="ops-card ops-flow-card">
        <div className="ops-section-title">
          <div className="ops-section-heading">
            <span className="ops-section-icon"><Workflow /></span>
            <div>
              <h2>Closed-loop defense flow</h2>
              <p>Follow what PYPY knows, validates, and executes—step by step.</p>
            </div>
          </div>
          <span className="ops-demo-pill"><Sparkles size={14} /> Demo guide</span>
        </div>

        <div className="ops-flow" role="list">
          {stages.map((stage, index) => (
            <div className="ops-flow-wrap" key={stage.label}>
              <div className={`ops-flow-step ${stage.done ? "is-done" : ""} ${stage.active ? "is-active" : ""}`} role="listitem">
                <span>{stage.done ? <Check size={16} /> : index + 1}</span>
                <strong>{stage.label}</strong>
                <small>{stage.detail}</small>
              </div>
              {index < stages.length - 1 && <ArrowRight className="ops-flow-arrow" size={18} />}
            </div>
          ))}
        </div>

        <div className="ops-explainer">
          <Info size={16} />
          <span><strong>Safety first:</strong> an AI alert never opens a breaker directly. PYPY requires threat context, physical evidence, sandbox validation, and orchestrator approval.</span>
        </div>
      </section>

      {/* Real ops-main-grid (Topology + Side Stack) */}
      <div className="ops-main-grid">
        
        {/* Left: IEEE-39 Topology */}
        <section className="ops-card ops-topology-card">
          <div className="ops-section-title">
            <div className="ops-section-heading">
              <span className="ops-section-icon"><CircuitBoard /></span>
              <div>
                <h2>Live IEEE-39 topology</h2>
                <p>Breaker and bus conditions from Digital Twin telemetry.</p>
              </div>
            </div>
            <div className="ops-legend">
              <span><i className="safe" /> Healthy</span>
              <span><i className="warning" /> Open</span>
              <span><i className="danger" /> Threat</span>
            </div>
          </div>

          <div className="ops-topology">
            <Ieee39Topology 
              activeAttack={activeAttack}
              targetBus={isAttack ? "Bus_5" : null}
              trippedLine={null}
            />
          </div>
        </section>

        {/* Right: Side Stack (Insights + Timeline) */}
        <aside className="ops-side-stack">
          
          <section className="ops-card ops-insight-card">
            <div className="ops-section-title">
              <div className="ops-section-heading">
                <span className="ops-section-icon"><Bot /></span>
                <div>
                  <h2>AI & recovery insight</h2>
                  <p>Plain-language explanation of the current decision.</p>
                </div>
              </div>
            </div>

            <div className="ops-insight-summary">
              <span className={`ops-insight-icon ${isAttack ? "danger" : "safe"}`}>
                {isAttack ? <AlertTriangle /> : <CheckCircle2 />}
              </span>
              <div>
                <strong>{isAttack ? "TARGETED_FDIA detected" : isRecovered ? "Grid recovery completed" : "Grid operating normally"}</strong>
                <p>{isAttack ? "AI is monitoring Bus_5. Recovery remains safety-gated and bad telemetry is isolated." : isRecovered ? "Autonomous restoration validated via AC Sandbox and confirmed by Digital Twin." : "No active cyber attack or unresolved physical isolation is visible."}</p>
              </div>
            </div>

            <dl className="ops-insight-list">
              <div><dt>Suspect node</dt><dd>{isAttack ? "Bus_5" : "None"}</dd></div>
              <div><dt>Recommended action</dt><dd>{isRecovered ? "CLOSE L_line_0" : isAttack ? "Isolate & Reject Reconnection" : "Continue monitoring"}</dd></div>
              <div><dt>Approval</dt><dd className={isRecovered ? "text-safe" : ""}>{isRecovered ? "Granted (APPROVAL)" : isAttack ? "Vetoed (UNSAFE)" : "Not required"}</dd></div>
            </dl>

            <button className="ops-details-button" onClick={() => setShowTechnical(!showTechnical)}>
              {showTechnical ? "Hide" : "Show"} technical evidence
            </button>

            {showTechnical && (
              <pre className="ops-technical">
                {JSON.stringify({
                  telemetry_source: "pypy/grid/telemetry",
                  grid_bus_count: 39,
                  active_attack: activeAttack,
                  threat_score: threatScore,
                  orchestrator_decision: isRecovered ? "APPROVAL" : isAttack ? "REJECTION" : "MONITORING",
                  cooldown_guard_s: 5.2,
                  sandbox_dry_run_ms: 13.47,
                  convergence_status: "PASS"
                }, null, 2)}
              </pre>
            )}
          </section>

          <section className="ops-card ops-timeline-card">
            <div className="ops-section-title">
              <div className="ops-section-heading">
                <span className="ops-section-icon"><Clock3 /></span>
                <div>
                  <h2>Defense timeline</h2>
                  <p>Newest verified event first.</p>
                </div>
              </div>
            </div>

            <div className="ops-timeline">
              {timeline.map((item, index) => (
                <div className="ops-timeline-item" key={index}>
                  <span className={`ops-tone-${item.tone}`} />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                    <time>{item.time}</time>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </aside>

      </div>

      {/* Real ops-services-card (All 19 microservices) */}
      <section className="ops-card ops-services-card">
        <div className="ops-section-title">
          <div className="ops-section-heading">
            <span className="ops-section-icon"><Cpu /></span>
            <div>
              <h2>Service health & readiness</h2>
              <p>Infrastructure, grid digital twin, AI models, fusion, and recovery readiness.</p>
            </div>
          </div>
          <span className="ops-service-count">19 confirmed live</span>
        </div>

        <div className="ops-services-grid">
          {services.map(([id, label, state]) => (
            <div className="ops-service" key={id}>
              <span className="healthy"><Check size={13} /></span>
              <div>
                <strong>{label}</strong>
                <small>Healthy · Live</small>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
