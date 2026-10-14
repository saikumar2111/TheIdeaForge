import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import {
  FlaskConical,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
  Calendar,
  ExternalLink,
  Info,
} from 'lucide-react';
import { MedicalObservation } from '../../types/health';

export const LabReportsView: React.FC = () => {
  const { profileData, setCurrentView } = useHealth();
  const [filter, setFilter] = useState<'all' | 'abnormal' | 'normal'>('all');
  const [search, setSearch] = useState('');
  const [activeTrendMarker, setActiveTrendMarker] = useState<string>('HbA1c');

  const observations = profileData?.observations || [];

  const filtered = observations.filter((obs) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'abnormal' && (obs.interpretationStatus === 'abnormal' || obs.interpretationStatus === 'borderline' || obs.interpretationStatus === 'critical')) ||
      (filter === 'normal' && obs.interpretationStatus === 'normal');

    const matchesSearch =
      obs.testName.toLowerCase().includes(search.toLowerCase()) ||
      obs.sourceLocation.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Trend markers comparison
  const trendData: Record<string, { unit: string; target: string; points: { date: string; value: number; label: string }[] }> = {
    HbA1c: {
      unit: '%',
      target: '< 6.5%',
      points: [
        { date: 'Jul 2024', value: 7.6, label: 'CARE Admission' },
        { date: 'Jan 2025', value: 7.3, label: 'Routine Check' },
        { date: 'Oct 2025', value: 7.1, label: 'Apollo Panel' },
      ],
    },
    'Fasting Glucose': {
      unit: 'mg/dL',
      target: '< 100 mg/dL',
      points: [
        { date: 'Jul 2024', value: 145, label: 'Inpatient Evaluation' },
        { date: 'Jan 2025', value: 134, label: 'Clinic Follow-up' },
        { date: 'Oct 2025', value: 128, label: 'Apollo Panel' },
      ],
    },
    'LDL Cholesterol': {
      unit: 'mg/dL',
      target: '< 100 mg/dL',
      points: [
        { date: 'Jul 2024', value: 172, label: 'Angiogram Workup' },
        { date: 'Oct 2025', value: 157, label: 'Apollo Panel' },
      ],
    },
    'Total Cholesterol': {
      unit: 'mg/dL',
      target: '< 200 mg/dL',
      points: [
        { date: 'Jul 2024', value: 255, label: 'Inpatient Workup' },
        { date: 'Oct 2025', value: 238, label: 'Apollo Panel' },
      ],
    },
  };

  const currentTrend = trendData[activeTrendMarker] || trendData['HbA1c'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Diagnostic Lab Reports & Trends</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Catalog of measured biochemical indicators, reference boundaries, and longitudinal glycemic & lipid trajectories.
        </p>
      </div>

      {/* Longitudinal Trend Chart Card in 3D */}
      <div className="bg-white p-6 rounded-3xl border border-rose-200/80 shadow-md space-y-4 card-3d">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#881337]" />
            <h3 className="text-sm font-bold text-slate-900">Health Marker Trajectory</h3>
            <span className="text-[11px] text-rose-800 font-semibold">• Target: {currentTrend.target}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {Object.keys(trendData).map((marker) => (
              <button
                key={marker}
                onClick={() => setActiveTrendMarker(marker)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTrendMarker === marker
                    ? 'btn-3d-burgundy shadow-xs'
                    : 'bg-rose-50/60 text-slate-700 hover:bg-rose-100 border border-rose-200/60'
                }`}
              >
                {marker}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Trend Bars */}
        <div className="p-5 bg-rose-50/50 rounded-2xl border border-rose-200/70 surface-3d-inset">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {currentTrend.points.map((pt, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-rose-200/80 shadow-xs card-3d">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">{pt.date}</span>
                <p className="text-xl font-black text-slate-900 mt-1">
                  {pt.value} <span className="text-xs font-semibold text-[#881337]">{currentTrend.unit}</span>
                </p>
                <p className="text-[11px] text-rose-900 font-medium mt-1 truncate">{pt.label}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-rose-600" />
            <span>Trending downward following initiation of lifestyle modifications and targeted medical therapy.</span>
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-rose-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 card-3d">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search test name (e.g. Glucose, Creatinine, LDL)..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#881337] text-slate-900 bg-rose-50/30"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'all' ? 'btn-3d-burgundy shadow-xs' : 'bg-rose-50/60 text-slate-700 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            All Parameters ({observations.length})
          </button>
          <button
            onClick={() => setFilter('abnormal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'abnormal' ? 'btn-3d-burgundy shadow-xs' : 'bg-rose-50/60 text-slate-700 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            Needs Discussion
          </button>
          <button
            onClick={() => setFilter('normal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'normal' ? 'btn-3d-burgundy shadow-xs' : 'bg-rose-50/60 text-slate-700 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            Normal Only
          </button>
        </div>
      </div>

      {/* Observations Table */}
      <div className="bg-white rounded-3xl border border-rose-200/80 shadow-sm overflow-hidden card-3d">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-rose-50/80 text-rose-950 font-bold border-b border-rose-200">
              <tr>
                <th className="p-4">Test Parameter</th>
                <th className="p-4">Result</th>
                <th className="p-4">Reference Range</th>
                <th className="p-4">Interpretation</th>
                <th className="p-4">Report Date</th>
                <th className="p-4">Source Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-100">
              {filtered.map((obs) => {
                const isAbnormal = obs.interpretationStatus === 'abnormal' || obs.interpretationStatus === 'critical';
                const isBorderline = obs.interpretationStatus === 'borderline';
                return (
                  <tr key={obs.id} className="hover:bg-rose-50/40 transition-colors">
                    <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                      <FlaskConical className="w-3.5 h-3.5 text-[#881337] shrink-0" />
                      <span>{obs.testName}</span>
                    </td>
                    <td className="p-4 font-black text-slate-900">
                      <span className={isAbnormal ? 'text-[#9f1239]' : isBorderline ? 'text-amber-600' : 'text-slate-900'}>
                        {obs.value}
                      </span>{' '}
                      <span className="text-[11px] font-normal text-slate-500">{obs.unit}</span>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{obs.referenceRange}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          isAbnormal
                            ? 'bg-rose-100 text-[#881337] border border-rose-300'
                            : isBorderline
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {isAbnormal && <AlertTriangle className="w-3 h-3 text-[#881337]" />}
                        {obs.interpretationStatus}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{obs.observationDate}</td>
                    <td className="p-4 text-slate-400 font-mono text-[10px]">{obs.sourceLocation}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
