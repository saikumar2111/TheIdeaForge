import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import {
  Pill,
  Clock,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Calendar,
  ShieldAlert,
  Search,
  ExternalLink,
} from 'lucide-react';
import { Medication } from '../../types/health';

export const PrescriptionsView: React.FC = () => {
  const { profileData, showToast, setCurrentView } = useHealth();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');
  const [search, setSearch] = useState('');
  const [localMeds, setLocalMeds] = useState<Medication[]>(profileData?.medications || []);

  React.useEffect(() => {
    if (profileData?.medications) {
      setLocalMeds(profileData.medications);
    }
  }, [profileData]);

  const toggleStatus = (id: string) => {
    setLocalMeds((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = m.recordedStatus === 'active' ? 'completed' : 'active';
          showToast(`Medication status updated to ${next}`, 'info');
          return { ...m, recordedStatus: next as any };
        }
        return m;
      })
    );
  };

  const filtered = localMeds.filter((m) => {
    const matchesFilter = filter === 'all' || m.recordedStatus === filter;
    const matchesSearch =
      m.medicationName.toLowerCase().includes(search.toLowerCase()) ||
      (m.prescribingClinician && m.prescribingClinician.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Prescriptions & Medication Intelligence</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track active vs completed medicines, dosage instructions, and source prescriptions.
          </p>
        </div>

        {/* Safety Alert Badge */}
        <div className="flex items-center gap-2 p-2.5 bg-rose-50 border border-rose-200/80 rounded-xl text-xs text-rose-950 font-medium badge-3d-burgundy">
          <ShieldAlert className="w-4 h-4 text-[#881337] shrink-0" />
          <span>Do not adjust dosages without your doctor's confirmation.</span>
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
            placeholder="Search medications by name or doctor..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#881337] text-slate-900 bg-rose-50/30"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'active' ? 'btn-3d-burgundy shadow-xs' : 'bg-rose-50/60 text-slate-700 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            Active Regimen ({localMeds.filter((m) => m.recordedStatus === 'active').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'completed' ? 'btn-3d-burgundy shadow-xs' : 'bg-rose-50/60 text-slate-700 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            Completed / Stopped
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === 'all' ? 'btn-3d-burgundy shadow-xs' : 'bg-rose-50/60 text-slate-700 hover:bg-rose-100 border border-rose-200/60'
            }`}
          >
            All ({localMeds.length})
          </button>
        </div>
      </div>

      {/* Medication Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((med) => {
          const isActive = med.recordedStatus === 'active';
          return (
            <div
              key={med.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between card-3d ${
                isActive ? 'bg-white border-rose-200/80 shadow-md' : 'bg-slate-50/70 border-slate-200 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-slate-900">{med.medicationName}</span>
                    <span className="text-[10px] font-bold text-[#881337] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md font-mono">
                      {med.strength}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleStatus(med.id)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-emerald-100/80 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300'
                    }`}
                  >
                    {isActive ? 'Mark Completed' : 'Reactivate'}
                  </button>
                </div>

                {/* Dosage & Timing */}
                <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-xs text-slate-700 space-y-1 my-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Dosage & Frequency:</span>
                    <span className="font-bold text-slate-900">{med.dosage} • {med.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Duration:</span>
                    <span className="font-semibold text-slate-800">{med.duration}</span>
                  </div>
                  {med.instructions && (
                    <div className="pt-1.5 border-t border-rose-100 text-[11px] text-rose-950 font-medium">
                      💡 {med.instructions}
                    </div>
                  )}
                </div>

                <div className="space-y-1 text-xs text-slate-500">
                  {med.prescribingClinician && (
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-rose-600" />
                      <span>{med.prescribingClinician}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-600" />
                    <span>Prescription Date: {med.prescriptionDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-mono">Source ID: {med.documentId}</span>
                <button
                  onClick={() => setCurrentView('documents')}
                  className="text-xs font-bold text-[#881337] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Source Document</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
