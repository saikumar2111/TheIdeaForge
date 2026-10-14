import React from 'react';
import { useHealth } from '../../context/HealthContext';
import {
  FileText,
  Pill,
  FlaskConical,
  Clock,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  PlusCircle,
  CheckCircle2,
  Calendar,
  Building,
  UserCheck,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { user, profileData, setCurrentView, openSummaryForDoc, t } = useHealth();

  const stats = profileData?.summaryStats || {
    totalDocuments: 3,
    activeMedications: 4,
    totalObservations: 8,
    abnormalObservations: 5,
    timelineEventsCount: 4,
  };

  const observations = profileData?.observations || [];
  const abnormalObs = observations.filter((o) => o.interpretationStatus === 'abnormal' || o.interpretationStatus === 'critical');
  const medications = profileData?.medications || [];
  const activeMeds = medications.filter((m) => m.recordedStatus === 'active');
  const clinicalRecords = profileData?.clinicalRecords || [];

  return (
    <div className="space-y-6">
      {/* 3D Header Banner in Burgundy */}
      <div className="banner-3d-burgundy rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-rose-400/20 via-rose-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/20 text-rose-100 text-xs font-semibold mb-3 shadow-inner backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span className="text-white font-medium">HealthSphere AI Copilot Active • Spatial Clinical Insights</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            {t.dashboard.welcome}, <span className="text-rose-100">{user?.name || 'Patient'}</span>
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-rose-50 font-normal leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            {t.dashboard.subGreeting} You currently have{' '}
            <strong className="text-white font-bold underline decoration-rose-300/60">
              {stats.totalDocuments} indexed medical records
            </strong>
            , <strong className="text-white font-bold">{activeMeds.length} active prescriptions</strong>, and{' '}
            <strong className="text-amber-200 font-bold">{abnormalObs.length} lab markers</strong> requiring clinician review.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentView('upload')}
              className="px-4 py-2.5 text-xs font-bold btn-3d-secondary rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#881337]" />
              <span className="text-[#630820] font-extrabold">{t.dashboard.quickUpload}</span>
            </button>
            <button
              onClick={() => setCurrentView('copilot')}
              className="px-4 py-2.5 text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md backdrop-blur-xs hover:border-white/70"
            >
              <Sparkles className="w-4 h-4 text-rose-200" />
              <span className="text-white font-extrabold">{t.dashboard.askCopilot}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setCurrentView('documents')}
          className="p-5 metric-card-3d cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.dashboard.totalDocs}</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#881337] flex items-center justify-center group-hover:scale-105 transition-transform border border-rose-200 shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-3">{stats.totalDocuments}</p>
          <p className="text-[11px] text-[#881337] font-semibold mt-1 flex items-center gap-1">
            <span>OCR vision indexed</span>
            <ChevronRight className="w-3 h-3" />
          </p>
        </div>

        <div
          onClick={() => setCurrentView('prescriptions')}
          className="p-5 metric-card-3d cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.dashboard.activeMeds}</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform border border-emerald-200 shadow-2xs">
              <Pill className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-3">{activeMeds.length}</p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <span>Dr. Murthy regimen</span>
            <ChevronRight className="w-3 h-3" />
          </p>
        </div>

        <div
          onClick={() => setCurrentView('lab_reports')}
          className="p-5 metric-card-3d cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.dashboard.analyzedLabs}</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#9f1239] flex items-center justify-center group-hover:scale-105 transition-transform border border-rose-200 shadow-2xs">
              <FlaskConical className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-3">{stats.totalObservations}</p>
          <p className="text-[11px] text-[#9f1239] font-semibold mt-1 flex items-center gap-1">
            <span>{abnormalObs.length} need attention</span>
            <ChevronRight className="w-3 h-3" />
          </p>
        </div>

        <div
          onClick={() => setCurrentView('timeline')}
          className="p-5 metric-card-3d cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.dashboard.timelineEntries}</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform border border-purple-200 shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 mt-3">{stats.timelineEventsCount}</p>
          <p className="text-[11px] text-purple-700 font-semibold mt-1 flex items-center gap-1">
            <span>Chronological record</span>
            <ChevronRight className="w-3 h-3" />
          </p>
        </div>
      </div>

      {/* Abnormal Values to Discuss with Healthcare Professional */}
      {abnormalObs.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50/90 to-rose-50/70 border border-amber-200/90 rounded-2xl p-5 sm:p-6 shadow-md card-3d">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-950">{t.dashboard.criticalObservations}</h3>
                <p className="text-[11px] text-amber-800">
                  Documented parameters outside standard reference intervals — bring these to your doctor review
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('lab_reports')}
              className="text-xs font-bold text-[#881337] hover:underline cursor-pointer"
            >
              View Full Lab Panel &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {abnormalObs.slice(0, 3).map((obs) => (
              <div
                key={obs.id}
                className="bg-white p-3.5 rounded-xl border border-rose-200/80 shadow-xs flex flex-col justify-between card-3d"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{obs.testName}</span>
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                      Elevated
                    </span>
                  </div>
                  <p className="text-lg font-black text-[#9f1239]">
                    {obs.value} <span className="text-xs font-medium text-slate-500">{obs.unit}</span>
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-rose-100 text-[10px] text-slate-500 flex justify-between">
                  <span>Standard: {obs.referenceRange}</span>
                  <span className="truncate max-w-[120px]">{obs.sourceLocation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid: Active Medications & Recent Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Medical Records */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-rose-200/80 shadow-sm space-y-4 card-3d">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#881337]" />
              <span>{t.dashboard.recentDocs}</span>
            </h3>
            <button
              onClick={() => setCurrentView('documents')}
              className="text-xs font-bold text-[#881337] hover:underline cursor-pointer"
            >
              {t.dashboard.viewAll} &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {profileData?.summaryStats.totalDocuments ? (
              <div className="space-y-3">
                {/* Document 1 */}
                <div className="p-4 rounded-xl border border-rose-200/70 hover:border-rose-300 transition-colors bg-[#FAF5F6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 card-3d">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100/70 text-[#881337] flex items-center justify-center shrink-0 border border-rose-200">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Comprehensive Metabolic & Lipid Profile</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Apollo Diagnostics Laboratory • 18-Oct-2025</p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-[#881337] bg-rose-100/80 border border-rose-200 px-2 py-0.5 rounded-full">
                        HbA1c 7.1% • LDL 157 mg/dL
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const doc = {
                        id: 'doc_101',
                        userId: user?.id || 'usr_1',
                        documentType: 'lab_report' as const,
                        title: 'Comprehensive Metabolic & Lipid Profile',
                        originalFilename: 'Apollo_Diagnostics_Lipid_Metabolic_Report_Oct2025.pdf',
                        mimeType: 'application/pdf',
                        fileSize: 420100,
                        documentDate: '2025-10-18',
                        hospitalOrLabName: 'Apollo Diagnostics Laboratory',
                        doctorName: 'Dr. Sudheer Reddy',
                        patientName: user?.name,
                        processingStatus: 'processed' as const,
                        confidenceScore: 96,
                        rawExtractedText: '',
                        createdAt: '',
                      };
                      openSummaryForDoc(doc);
                    }}
                    className="px-3 py-1.5 text-xs font-bold btn-3d-burgundy rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-rose-200" />
                    <span>Explain My Report</span>
                  </button>
                </div>

                {/* Document 2 */}
                <div className="p-4 rounded-xl border border-rose-200/70 hover:border-rose-300 transition-colors bg-[#FAF5F6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 card-3d">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100/70 text-[#881337] flex items-center justify-center shrink-0 border border-rose-200">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Endocrinology & Cardiology Prescription</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">MaxCure Specialty Hospital • 22-Oct-2025</p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Metformin, Atorvastatin, Telmisartan, Aspirin
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const doc = {
                        id: 'doc_102',
                        userId: user?.id || 'usr_1',
                        documentType: 'prescription' as const,
                        title: 'Endocrinology & Cardiology Prescription',
                        originalFilename: 'MaxCure_Hospital_Prescription_Oct2025.jpg',
                        mimeType: 'image/jpeg',
                        fileSize: 685400,
                        documentDate: '2025-10-22',
                        hospitalOrLabName: 'MaxCure Specialty Hospital',
                        doctorName: 'Dr. V. R. Murthy',
                        patientName: user?.name,
                        processingStatus: 'processed' as const,
                        confidenceScore: 92,
                        rawExtractedText: '',
                        createdAt: '',
                      };
                      openSummaryForDoc(doc);
                    }}
                    className="px-3 py-1.5 text-xs font-bold btn-3d-burgundy rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-rose-200" />
                    <span>Explain My Report</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500">
                <p className="text-xs">No medical records uploaded yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Active Medications & Diagnoses */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-rose-200/80 shadow-sm space-y-4 card-3d">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Pill className="w-4 h-4 text-[#881337]" />
              <span>Current Medications ({activeMeds.length})</span>
            </h3>
            <button
              onClick={() => setCurrentView('prescriptions')}
              className="text-xs font-bold text-[#881337] hover:underline cursor-pointer"
            >
              Manage &rarr;
            </button>
          </div>

          <div className="space-y-2.5">
            {activeMeds.slice(0, 4).map((med) => (
              <div
                key={med.id}
                className="p-3 rounded-xl bg-rose-50/50 border border-rose-200/80 flex items-center justify-between gap-2 card-3d"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{med.medicationName}</span>
                    <span className="text-[10px] font-semibold text-rose-900 bg-white px-1.5 py-0.5 rounded border border-rose-200">
                      {med.strength}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{med.frequency}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full shrink-0 border border-emerald-200">
                  Active
                </span>
              </div>
            ))}
          </div>

          {/* Clinical Diagnoses snippet */}
          <div className="pt-3 border-t border-rose-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2">
              Documented Diagnoses
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {clinicalRecords.map((cr) => (
                <span
                  key={cr.id}
                  className="text-[11px] font-semibold text-slate-800 bg-white border border-rose-200 px-2.5 py-1 rounded-lg shadow-2xs"
                >
                  {cr.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 bg-rose-50/70 border border-rose-200/90 rounded-2xl flex items-start gap-3 text-xs text-rose-950 card-3d">
        <ShieldAlert className="w-4 h-4 text-[#881337] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#4c0519]">{t.dashboard.disclaimerTitle}: </span>
          <span>{t.dashboard.disclaimerText}</span>
        </div>
      </div>
    </div>
  );
};
