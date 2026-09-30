import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  Info, 
  Table as TableIcon, 
  TrendingUp, 
  Award, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { CHAPTER4_METRICS } from '../data';

export const Chapter4Metrics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chart' | 'leakage' | 'gnn'>('chart');

  return (
    <section className="ops-dashboard">
      
      {/* Hero Header */}
      <div className="ops-hero">
        <div>
          <div className="ops-live-label">
            <span className="ops-live-dot" /> Empirical Thesis Verification
          </div>
          <h1>Bab 4: Keputusan & Perbincangan Empirikal</h1>
          <p>Pengesahan data tanpa kebocoran, kadar konvergens solver AC, dan penanda aras berbilang model.</p>
        </div>
        <div className="ops-hero-status">
          <span className="ops-status-badge status-healthy">
            <ShieldCheck size={16} /> Audit Status: PASS
          </span>
          <div>
            <strong>10,400 Sampel</strong>
            <span>8 Kelas Operasi & Serangan</span>
          </div>
        </div>
      </div>

      {/* 4 Summary Highlight KPI Cards */}
      <div className="ops-kpi-grid">
        <article className="ops-card ops-kpi ops-tone-safe">
          <div className="ops-kpi-icon"><Award /></div>
          <div>
            <p className="ops-eyebrow">AC Solver Convergence</p>
            <p className="ops-kpi-value">100.0%</p>
            <p className="ops-muted">Newton-Raphson Baseline & Sandbox</p>
          </div>
        </article>

        <article className="ops-card ops-kpi ops-tone-info">
          <div className="ops-kpi-icon"><CheckCircle2 /></div>
          <div>
            <p className="ops-eyebrow">Data Leakage Overlap</p>
            <p className="ops-kpi-value">0.0%</p>
            <p className="ops-muted">Audit Pembahagian Kronologi Tulen</p>
          </div>
        </article>

        <article className="ops-card ops-kpi ops-tone-purple">
          <div className="ops-kpi-icon"><TrendingUp /></div>
          <div>
            <p className="ops-eyebrow">Sandbox Rehearsal Latency</p>
            <p className="ops-kpi-value">13.47 ms</p>
            <p className="ops-muted">Purata 20 lelaran AC dry-run</p>
          </div>
        </article>

        <article className="ops-card ops-kpi ops-tone-safe">
          <div className="ops-kpi-icon"><ShieldCheck /></div>
          <div>
            <p className="ops-eyebrow">Adversarial Blackout</p>
            <p className="ops-kpi-value">13.33%</p>
            <p className="ops-muted">Kadar minimum di bawah stres patogen</p>
          </div>
        </article>
      </div>

      {/* Metric Sub-Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('chart')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'chart'
              ? 'bg-[#17324d] text-white shadow-sm'
              : 'bg-white text-[#557187] border border-[#dce9ef] hover:bg-[#edf8f8]'
          }`}
        >
          <BarChart3 size={15} />
          <span>Prestasi Pengelasan LSTM (F1-Score)</span>
        </button>

        <button
          onClick={() => setActiveTab('leakage')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'leakage'
              ? 'bg-[#17324d] text-white shadow-sm'
              : 'bg-white text-[#557187] border border-[#dce9ef] hover:bg-[#edf8f8]'
          }`}
        >
          <TableIcon size={15} />
          <span>Audit Kebocoran Data (Jadual 4.3)</span>
        </button>

        <button
          onClick={() => setActiveTab('gnn')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'gnn'
              ? 'bg-[#17324d] text-white shadow-sm'
              : 'bg-white text-[#557187] border border-[#dce9ef] hover:bg-[#edf8f8]'
          }`}
        >
          <TrendingUp size={15} />
          <span>GNN Model vs Heuristik (Jadual 4.5)</span>
        </button>
      </div>

      {/* Tab 1: Recharts Bar Chart */}
      {activeTab === 'chart' && (
        <section className="ops-card p-6 sm:p-8">
          <div className="ops-section-title">
            <div className="ops-section-heading">
              <span className="ops-section-icon"><BarChart3 /></span>
              <div>
                <h2>Ketepatan Pengesanan LSTM Mengikut Kelas Serangan</h2>
                <p>Metrik Precision, Recall dan F1-Score di bawah pembahagian blok label kronologi.</p>
              </div>
            </div>
            <span className="ops-status-badge status-healthy">FDIA & DOS: 1.00 F1-Score</span>
          </div>

          <div className="h-72 sm:h-84 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHAPTER4_METRICS.lstmPerformance} margin={{ top: 15, right: 30, left: 0, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="#dce9ef" />
                <XAxis dataKey="attackClass" tick={{ fill: '#668096', fontSize: 11 }} angle={-15} textAnchor="end" />
                <YAxis domain={[0, 1.1]} tick={{ fill: '#668096', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#dce9ef', borderRadius: '12px', color: '#17324d', fontSize: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }} />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                <Bar dataKey="precision" name="Precision" fill="#13848b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="recall" name="Recall" fill="#20b89d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="f1" name="F1-Score" fill="#318ecf" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="ops-explainer mt-6">
            <Info size={16} />
            <span><strong>Nota Kejujuran Saintifik:</strong> Pada kelas <code>REPLAY</code>, Precision mencatat 0.50 manakala Recall 1.00 kerana sifat telemetri ulangan meniru profil beban statik biasa. Ini membuktikan batasan model temporal tunggal dan menjustifikasikan sepenuhnya integrasi pengesahan fizik (PINN) dan analisis topologi spatial (GNN).</span>
          </div>
        </section>
      )}

      {/* Tab 2: Data Leakage Table */}
      {activeTab === 'leakage' && (
        <section className="ops-card p-6 sm:p-8 overflow-hidden">
          <div className="ops-section-title">
            <div className="ops-section-heading">
              <span className="ops-section-icon"><TableIcon /></span>
              <div>
                <h2>Jadual 4.3: Perbandingan Kebocoran Data (Data Leakage Audit)</h2>
                <p>Kaedah rawak biasa (Random Window Overlap) vs Kaedah PYPY (Chronological Partition).</p>
              </div>
            </div>
            <span className="ops-demo-pill">0.0% Leakage</span>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#dce9ef] text-[#7890a2] font-extrabold uppercase text-[11px]">
                  <th className="py-3 px-4">Pasangan Pembahagian</th>
                  <th className="py-3 px-4 text-[#bd3e47]">Kaedah Biasa (Random Window Overlap)</th>
                  <th className="py-3 px-4 text-[#08785f]">Kaedah PYPY (Chronological Overlap)</th>
                  <th className="py-3 px-4">Kadar Penyingkiran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f5] font-medium">
                {CHAPTER4_METRICS.leakageAuditTable.map((row, i) => (
                  <tr key={i} className="hover:bg-[#f6fafb] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#17324d]">{row.pair}</td>
                    <td className="py-3.5 px-4 text-[#bd3e47] font-mono font-semibold">{row.randomSplit}</td>
                    <td className="py-3.5 px-4 text-[#08785f] font-mono font-black">{row.chronoSplit}</td>
                    <td className="py-3.5 px-4 text-[#16858a] font-bold">{row.reduction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-[#dbf8ed] border border-[#a9ead7] text-xs text-[#08785f] mt-6">
            <strong>Kelebihan Semasa Viva:</strong> Menjawab terus keraguan panel penilai terhadap kesahihan metrik pembelajaran mesin pada siri masa.
          </div>
        </section>
      )}

      {/* Tab 3: GNN Raw vs Post-processed Comparison */}
      {activeTab === 'gnn' && (
        <section className="ops-card p-6 sm:p-8 overflow-hidden">
          <div className="ops-section-title">
            <div className="ops-section-heading">
              <span className="ops-section-icon"><TrendingUp /></span>
              <div>
                <h2>Jadual 4.5: Penilaian GNN (Model Mentah vs Pasca-Proses Heuristik)</h2>
                <p>Membezakan kuasa pembelajaran rangkaian neural tulen dengan peraturan topologi graf.</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#dce9ef] text-[#7890a2] font-extrabold uppercase text-[11px]">
                  <th className="py-3 px-4">Metrik Penilaian</th>
                  <th className="py-3 px-4 text-[#17324d]">GNN Mentah (Raw Output)</th>
                  <th className="py-3 px-4 text-[#7859bc]">GNN + Heuristik Graf</th>
                  <th className="py-3 px-4">Perbezaan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2f5] font-medium">
                {CHAPTER4_METRICS.gnnComparison.map((row, i) => (
                  <tr key={i} className="hover:bg-[#f6fafb] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#17324d]">{row.metric}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#557187]">{row.rawModel}%</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#7859bc]">{row.heuristic}%</td>
                    <td className="py-3.5 px-4 font-bold text-[#08785f]">
                      {row.heuristic >= row.rawModel ? `+${(row.heuristic - row.rawModel).toFixed(2)}%` : `${(row.heuristic - row.rawModel).toFixed(2)}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </section>
  );
};
