import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import {
  ShieldCheck,
  Download,
  Copy,
  Check,
  Code2,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  FileJson,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { api } from '../../services/api';

export const AbdmFhirView: React.FC = () => {
  const { user, refreshData, showToast } = useHealth();
  const [abhaInput, setAbhaInput] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  const [fhirBundle, setFhirBundle] = useState<any>(null);
  const [loadingFhir, setLoadingFhir] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLinkAbha = async () => {
    setIsLinking(true);
    try {
      const res = await api.linkMockAbha(abhaInput || undefined);
      showToast(res.message, 'success');
      await refreshData();
    } catch (err: any) {
      showToast('ABHA simulation error: ' + err.message, 'error');
    } finally {
      setIsLinking(false);
    }
  };

  const handleFetchFhir = async () => {
    setLoadingFhir(true);
    try {
      const bundle = await api.exportFhirBundle();
      setFhirBundle(bundle);
      showToast('FHIR R4 Bundle constructed and validated', 'success');
    } catch (err: any) {
      showToast('Failed to export FHIR bundle', 'error');
    } finally {
      setLoadingFhir(false);
    }
  };

  const handleCopyFhir = () => {
    if (!fhirBundle) return;
    navigator.clipboard.writeText(JSON.stringify(fhirBundle, null, 2));
    setCopied(true);
    showToast('FHIR JSON copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadFhir = () => {
    if (!fhirBundle) return;
    const blob = new Blob([JSON.stringify(fhirBundle, null, 2)], { type: 'application/fhir+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HealthSphere_FHIR_Bundle_${user?.id}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            ABDM & FHIR R4 Interoperability Gateway
          </h2>
          <span className="badge-3d-burgundy text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            ABDM Ready
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Standards-based healthcare exchange architecture compliant with HL7 FHIR R4 and Ayushman Bharat Digital Mission data modeling.
        </p>
      </div>

      {/* ABDM / ABHA ID Gateway Card */}
      <div className="bg-white p-6 rounded-3xl border border-rose-200/80 shadow-md space-y-4 card-3d">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-rose-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#9f1239] to-[#881337] text-white flex items-center justify-center font-bold shadow-sm">
              <ShieldCheck className="w-5 h-5 text-rose-100" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">ABHA (Ayushman Bharat Health Account) Linking</h3>
              <p className="text-xs text-slate-500">
                Simulated Consent Manager link flow for national health records federation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                user?.abhaStatus === 'verified'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}
            >
              {user?.abhaStatus === 'verified' ? '● ABHA Verified' : '○ Not Linked'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-rose-950 mb-1">
              Active ABHA Address (PHR Identifier)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={abhaInput || user?.abhaId || ''}
                onChange={(e) => setAbhaInput(e.target.value)}
                placeholder="e.g. 91-4521-8932-1104@abdm"
                className="flex-1 px-3 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#881337] font-mono text-slate-900 bg-rose-50/20"
              />
              <button
                disabled={isLinking}
                onClick={handleLinkAbha}
                className="px-4 py-2 text-xs font-bold btn-3d-burgundy disabled:opacity-50 rounded-xl transition-all cursor-pointer shrink-0 shadow-xs"
              >
                {isLinking ? 'Linking...' : 'Link ABHA'}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Simulates OAuth2 consent negotiation with ABDM Unified Health Interface (UHI).
            </p>
          </div>

          <div className="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-200/80 text-xs space-y-1 surface-3d-inset">
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold">Linked Providers (HIPs):</span>
              <span className="font-bold text-slate-900">Apollo, MaxCure, CARE Hospitals</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold">Consent Artifact:</span>
              <span className="font-mono text-[11px] text-[#881337] font-bold">CA-NDHM-99824-OK</span>
            </div>
          </div>
        </div>
      </div>

      {/* FHIR R4 Bundle Exporter */}
      <div className="bg-white p-6 rounded-3xl border border-rose-200/80 shadow-md space-y-4 card-3d">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-rose-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#881337] border border-rose-200 flex items-center justify-center font-bold">
              <FileJson className="w-5 h-5 text-[#881337]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">HL7 FHIR R4 Clinical Bundle Generation</h3>
              <p className="text-xs text-slate-500">
                Maps patient demographics, observations, prescriptions, and conditions to standard FHIR schemas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!fhirBundle ? (
              <button
                disabled={loadingFhir}
                onClick={handleFetchFhir}
                className="px-4 py-2 text-xs font-bold btn-3d-burgundy rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Code2 className="w-4 h-4" />
                <span>Generate FHIR Bundle</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyFhir}
                  className="px-3 py-1.5 text-xs font-bold btn-3d-secondary rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                </button>
                <button
                  onClick={handleDownloadFhir}
                  className="px-3.5 py-1.5 text-xs font-bold btn-3d-burgundy rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .json</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FHIR JSON Viewer */}
        {fhirBundle ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-rose-900 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              <span>Bundle Type: {fhirBundle.type}</span>
              <span>Total Entries: {fhirBundle.total} FHIR Resources</span>
            </div>
            <pre className="p-4 bg-slate-950 text-rose-100 rounded-2xl text-xs font-mono max-h-96 overflow-y-auto leading-relaxed border border-rose-900/40">
              {JSON.stringify(fhirBundle, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="p-6 text-center bg-rose-50/40 rounded-2xl border border-rose-200/60 text-xs text-rose-900">
            <p>Click "Generate FHIR Bundle" to construct a compliant JSON package representing this patient's full health history.</p>
          </div>
        )}
      </div>
    </div>
  );
};
