import React from 'react';
import { useHealth } from '../../context/HealthContext';
import {
  Settings,
  Globe,
  Shield,
  RotateCcw,
  Download,
  AlertTriangle,
  Lock,
  CheckCircle2,
  FileText,
  User,
} from 'lucide-react';
import { api } from '../../services/api';
import { LanguageCode } from '../../types/health';

export const SettingsView: React.FC = () => {
  const { language, setLanguage, user, showToast, refreshData } = useHealth();

  const handleResetDemo = async () => {
    try {
      await api.resetDemo();
      showToast('Synthetic patient dataset re-initialized to baseline', 'success');
      await refreshData();
    } catch (err) {
      showToast('Reset failed', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Settings & Privacy Safeguards</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure interface language, manage patient privacy parameters, and audit platform security controls.
        </p>
      </div>

      {/* Language Preference */}
      <div className="bg-white p-6 rounded-3xl border border-rose-200/80 shadow-md space-y-4 card-3d">
        <div className="flex items-center gap-3 pb-3 border-b border-rose-100">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#881337] border border-rose-200 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Application Language</h3>
            <p className="text-xs text-slate-500">Select language for interface labels, summaries, and Copilot explanations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { code: 'en' as LanguageCode, label: 'English', desc: 'Global Healthcare Terminology' },
            { code: 'te' as LanguageCode, label: 'Telugu (తెలుగు)', desc: 'ప్రాంతీయ భాషా వివరణలు' },
            { code: 'hi' as LanguageCode, label: 'Hindi (हिन्दी)', desc: 'सरल भारतीय भाषाई सहायता' },
          ].map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code);
                showToast(`Language set to ${l.label}`, 'info');
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer card-3d ${
                language === l.code
                  ? 'bg-rose-50 border-[#881337] ring-2 ring-rose-400 shadow-md'
                  : 'bg-white border-rose-200 hover:border-rose-300'
              }`}
            >
              <p className="text-sm font-extrabold text-slate-900">{l.label}</p>
              <p className="text-[11px] text-rose-900/70 mt-1">{l.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Sandbox Management */}
      <div className="bg-white p-6 rounded-3xl border border-rose-200/80 shadow-md space-y-4 card-3d">
        <div className="flex items-center gap-3 pb-3 border-b border-rose-100">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#881337] border border-rose-200 flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Synthetic Demo Sandbox</h3>
            <p className="text-xs text-slate-500">Reset health records back to standard evaluation baseline</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-rose-50/50 rounded-2xl border border-rose-200/80">
          <div>
            <p className="text-xs font-bold text-slate-900">Restore Synthetic Clinical Dataset</p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Re-loads Dr. Rajesh K. Sharma sample records (Apollo Lipid Panel, MaxCure Prescription, CARE Discharge).
            </p>
          </div>
          <button
            onClick={handleResetDemo}
            className="px-4 py-2 text-xs font-bold btn-3d-secondary rounded-xl transition-all cursor-pointer shrink-0"
          >
            Reset Demo Records
          </button>
        </div>
      </div>

      {/* Security & HIPAA Compliance Architecture Disclosures */}
      <div className="bg-white p-6 rounded-3xl border border-rose-200/80 shadow-md space-y-4 card-3d">
        <div className="flex items-center gap-3 pb-3 border-b border-rose-100">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#9f1239] to-[#881337] text-white flex items-center justify-center">
            <Shield className="w-5 h-5 text-rose-100" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Security Architecture & Privacy Safeguards</h3>
            <p className="text-xs text-slate-500">Platform technical controls, encryption parameters, and regulatory alignment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200/70 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>AES-256 Record Encryption</span>
            </div>
            <p className="text-[11px] text-slate-600">
              All uploaded diagnostic PDFs and prescriptions are encrypted in transit via TLS 1.3 and at rest with envelope encryption.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200/70 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero LLM Training Policy</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Health documents are processed in ephemeral server memory. Records are never used to train generalized language models.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200/70 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>HL7 FHIR R4 Compliant Model</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Extracted findings follow open interoperability standards for seamless portability into clinical EHR gateways.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200/70 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Provenance & Source Citations</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Every summary finding links directly to the underlying document line and section to enable patient verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
