import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  Table as TableIcon, 
  TrendingUp, 
  Award, 
  Info 
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

export const AppleMetrics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chart' | 'leakage' | 'gnn'>('chart');

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Apple Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#10b981]/10 text-[#10b981] mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Chapter 4: Results & Discussion</span>
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">
          Penemuan & Pengesahan Empirikal.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#86868b]">
          Keputusan eksperimen daripada artifak JSON sebenar tanpa kebocoran data (zero leakage).
        </p>
      </div>

      {/* Apple Segmented Tab Switcher */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1 bg-[#f5f5f7] rounded-full border border-black/[0.04]">
          <button
            onClick={() => setActiveTab('chart')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'chart'
                ? 'bg-white text-[#1d1d1f] shadow-sm'
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#0071e3]" />
            <span>Prestasi LSTM (F1-Score)</span>
          </button>

          <button
            onClick={() => setActiveTab('leakage')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'leakage'
                ? 'bg-white text-[#1d1d1f] shadow-sm'
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <TableIcon className="w-4 h-4 text-[#10b981]" />
            <span>Audit Kebocoran Data (Jadual 4.3)</span>
          </button>

          <button
            onClick={() => setActiveTab('gnn')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'gnn'
                ? 'bg-white text-[#1d1d1f] shadow-sm'
                : 'text-[#86868b] hover:text-[#1d1d1f]'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#8b5cf6]" />
            <span>GNN vs Heuristik (Jadual 4.5)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Recharts Bar Chart */}
      {activeTab === 'chart' && (
        <div className="apple-card p-6 sm:p-10 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-extrabold text-[#1d1d1f]">
                Ketepatan Pengelasan LSTM Mengikut Kelas Serangan
              </h3>
              <p className="text-xs text-[#86868b] mt-1">
                Precision, Recall, dan F1-Score di bawah pembahagian kronologi tulen (1,416 sampel ujian).
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#10b981]/10 text-[#10b981] self-start sm:self-auto">
              FDIA & DOS: 1.00 F1-Score
            </span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHAPTER4_METRICS.lstmPerformance} margin={{ top: 20, right: 30, left: 0, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                <XAxis dataKey="attackClass" tick={{ fill: '#86868b', fontSize: 11 }} angle={-15} textAnchor="end" />
                <YAxis domain={[0, 1.1]} tick={{ fill: '#86868b', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: 'rgba(0,0,0,0.08)', borderRadius: '16px', color: '#1d1d1f', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }} />
                <Legend wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }} />
                <Bar dataKey="precision" name="Precision" fill="#0071e3" radius={[6, 6, 0, 0]} />
                <Bar dataKey="recall" name="Recall" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="f1" name="F1-Score" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] text-xs text-[#515154] leading-relaxed flex items-start gap-3">
            <Info className="w-5 h-5 text-[#0071e3] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#1d1d1f]">Nota Kejujuran Saintifik Bab 4:</strong> Pada kelas <code>REPLAY</code>, Precision mencatat 0.50 manakala Recall 1.00 kerana serangan Replay menggunakan semula data siri masa lama yang menyerupai beban statik biasa. Penemuan ini secara saintifik membuktikan batasan model temporal tunggal dan menjustifikasikan sepenuhnya mengapa PYPY menggabungkan pengesahan fizik (PINN) dan topologi spatial (GNN).
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Data Leakage Table */}
      {activeTab === 'leakage' && (
        <div className="apple-card p-6 sm:p-10 bg-white overflow-hidden">
          <h3 className="text-xl font-extrabold text-[#1d1d1f] mb-1">
            Jadual 4.3: Perbandingan Kebocoran Data (Data Leakage Audit)
          </h3>
          <p className="text-xs text-[#86868b] mb-8">
            Audit membuktikan pembahagian rawak biasa mencemarkan data ujian sehingga 99.75%, manakala kaedah PYPY menghapuskannya kepada 0.0%.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-black/[0.06] text-[#86868b] font-bold uppercase text-[11px]">
                  <th className="py-3.5 px-4">Pasangan Pembahagian</th>
                  <th className="py-3.5 px-4 text-[#ef4444]">Kaedah Biasa (Random Window Overlap)</th>
                  <th className="py-3.5 px-4 text-[#10b981]">Kaedah PYPY (Chronological Overlap)</th>
                  <th className="py-3.5 px-4">Kadar Penyingkiran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] font-medium">
                {CHAPTER4_METRICS.leakageAuditTable.map((row, i) => (
                  <tr key={i} className="hover:bg-[#f5f5f7] transition-colors">
                    <td className="py-4 px-4 font-bold text-[#1d1d1f]">{row.pair}</td>
                    <td className="py-4 px-4 text-[#ef4444] font-mono font-semibold">{row.randomSplit}</td>
                    <td className="py-4 px-4 text-[#10b981] font-mono font-black">{row.chronoSplit}</td>
                    <td className="py-4 px-4 text-[#0071e3] font-bold">{row.reduction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/20 text-xs text-[#10b981] font-medium">
            <strong>Kelebihan Semasa Viva:</strong> Menjawab terus persoalan panel penilai mengenai kebolehpercayaan model AI tanpa sebarang pertindihan data latih dan data ujian.
          </div>
        </div>
      )}

      {/* Tab 3: GNN Comparison Table */}
      {activeTab === 'gnn' && (
        <div className="apple-card p-6 sm:p-10 bg-white overflow-hidden">
          <h3 className="text-xl font-extrabold text-[#1d1d1f] mb-1">
            Jadual 4.5: Penilaian GNN (Model Mentah vs Pasca-Proses Heuristik)
          </h3>
          <p className="text-xs text-[#86868b] mb-8">
            Membezakan kapasiti tulen model pembelajaran mendalam dengan peraturan heuristik topologi graf.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-black/[0.06] text-[#86868b] font-bold uppercase text-[11px]">
                  <th className="py-3.5 px-4">Metrik Penilaian</th>
                  <th className="py-3.5 px-4 text-[#1d1d1f]">GNN Mentah (Raw Output)</th>
                  <th className="py-3.5 px-4 text-[#8b5cf6]">GNN + Heuristik Graf</th>
                  <th className="py-3.5 px-4">Peningkatan Prestasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] font-medium">
                {CHAPTER4_METRICS.gnnComparison.map((row, i) => (
                  <tr key={i} className="hover:bg-[#f5f5f7] transition-colors">
                    <td className="py-4 px-4 font-bold text-[#1d1d1f]">{row.metric}</td>
                    <td className="py-4 px-4 font-mono font-semibold text-[#86868b]">{row.rawModel}%</td>
                    <td className="py-4 px-4 font-mono font-bold text-[#8b5cf6]">{row.heuristic}%</td>
                    <td className="py-4 px-4 font-bold text-[#10b981]">
                      {row.heuristic >= row.rawModel ? `+${(row.heuristic - row.rawModel).toFixed(2)}%` : `${(row.heuristic - row.rawModel).toFixed(2)}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </section>
  );
};
