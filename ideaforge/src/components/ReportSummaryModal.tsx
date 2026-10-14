import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import {
  X,
  FileText,
  AlertTriangle,
  HelpCircle,
  ArrowRightCircle,
  Copy,
  Printer,
  Globe,
  Sparkles,
  ShieldAlert,
  Calendar,
  Building,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { api } from '../services/api';
import { LanguageCode } from '../types/health';

export const ReportSummaryModal: React.FC = () => {
  const {
    isSummaryModalOpen,
    setIsSummaryModalOpen,
    activeSummaryDoc,
    activeSummary,
    setActiveSummary,
    showToast,
    language,
    t,
  } = useHealth();

  const [activeTab, setActiveTab] = useState<'summary' | 'abnormal' | 'doctor_questions' | 'provenance'>('summary');
  const [translating, setTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isSummaryModalOpen || !activeSummaryDoc) return null;

  const handleLanguageChange = async (targetLang: LanguageCode) => {
    setTranslating(true);
    try {
      const res = await api.summarizeDocument(activeSummaryDoc.id, targetLang);
      setActiveSummary(res.summary);
      showToast(`Report translated to ${targetLang === 'te' ? 'Telugu' : targetLang === 'hi' ? 'Hindi' : 'English'}`, 'success');
    } catch (err) {
      showToast('Translation error occurred', 'error');
    } finally {
      setTranslating(false);
    }
  };

  const copyToClipboard = () => {
    if (!activeSummary) return;
    const text = `HEALTHSPHERE AI REPORT EXPLANATION
Document: ${activeSummaryDoc.title} (${activeSummaryDoc.documentDate})
Hospital/Lab: ${activeSummaryDoc.hospitalOrLabName || 'N/A'}

--- SIMPLE SUMMARY ---
${activeSummary.simpleSummary}

--- IMPORTANT FINDINGS ---
${activeSummary.importantFindings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

--- ABNORMAL VALUES ---
${activeSummary.abnormalValues.map((v) => `• ${v.name}: ${v.value} (Ref: ${v.range}) - ${v.context}`).join('\n')}

--- WHAT THIS MAY MEAN ---
${activeSummary.whatThisMayMean}

--- QUESTIONS FOR YOUR DOCTOR ---
${activeSummary.questionsToAskDoctor.map((q, i) => `${i + 1}. ${q}`).join('\n')}

--- RECOMMENDED NEXT STEP ---
${activeSummary.recommendedNextStep}

Disclaimer: For informational and patient understanding purposes only. Not a medical diagnosis.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Summary copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden my-auto max-h-[92vh] flex flex-col card-3d-raised">
        {/* Modal Top Header in Burgundy */}
        <div className="bg-gradient-to-r from-[#4c0519] via-[#881337] to-[#9f1239] px-6 py-5 text-white flex items-center justify-between border-b border-rose-300/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 text-rose-100 flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 text-rose-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg leading-tight text-white">{activeSummaryDoc.title}</h3>
                <span className="bg-white/20 text-white border border-white/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  AI Explained
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-rose-200/90 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rose-300" />
                  {activeSummaryDoc.documentDate}
                </span>
                {activeSummaryDoc.hospitalOrLabName && (
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-rose-300" />
                    {activeSummaryDoc.hospitalOrLabName}
                  </span>
                )}
                {activeSummaryDoc.doctorName && (
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-rose-300" />
                    {activeSummaryDoc.doctorName}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher inside Modal */}
            <div className="flex items-center bg-black/20 border border-white/20 rounded-xl p-0.5 text-xs">
              <button
                disabled={translating}
                onClick={() => handleLanguageChange('en')}
                className={`px-2 py-1 rounded font-bold transition-all cursor-pointer ${
                  activeSummary?.summaryLanguage === 'en' ? 'bg-white text-[#881337] shadow-xs' : 'text-rose-100 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                disabled={translating}
                onClick={() => handleLanguageChange('te')}
                className={`px-2 py-1 rounded font-bold transition-all cursor-pointer ${
                  activeSummary?.summaryLanguage === 'te' ? 'bg-white text-[#881337] shadow-xs' : 'text-rose-100 hover:text-white'
                }`}
              >
                తెలుగు
              </button>
              <button
                disabled={translating}
                onClick={() => handleLanguageChange('hi')}
                className={`px-2 py-1 rounded font-bold transition-all cursor-pointer ${
                  activeSummary?.summaryLanguage === 'hi' ? 'bg-white text-[#881337] shadow-xs' : 'text-rose-100 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>

            <button
              onClick={copyToClipboard}
              className="p-2 text-rose-100 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              title="Copy Summary"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-rose-100 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              title="Print Summary"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsSummaryModalOpen(false)}
              className="p-2 text-rose-100 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center border-b border-rose-200 bg-rose-50/60 px-6 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-3 px-3 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'summary' ? 'border-[#881337] text-[#881337] bg-white rounded-t-lg' : 'border-transparent text-slate-600 hover:text-rose-900'
            }`}
          >
            Overview & Meaning
          </button>
          <button
            onClick={() => setActiveTab('abnormal')}
            className={`py-3 px-3 text-xs font-bold border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'abnormal' ? 'border-[#881337] text-[#881337] bg-white rounded-t-lg' : 'border-transparent text-slate-600 hover:text-rose-900'
            }`}
          >
            <span>Abnormal Values</span>
            {activeSummary?.abnormalValues && activeSummary.abnormalValues.length > 0 && (
              <span className="bg-rose-100 text-[#881337] border border-rose-300 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {activeSummary.abnormalValues.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('doctor_questions')}
            className={`py-3 px-3 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'doctor_questions' ? 'border-[#881337] text-[#881337] bg-white rounded-t-lg' : 'border-transparent text-slate-600 hover:text-rose-900'
            }`}
          >
            Questions for Doctor
          </button>
          <button
            onClick={() => setActiveTab('provenance')}
            className={`py-3 px-3 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
              activeTab === 'provenance' ? 'border-[#881337] text-[#881337] bg-white rounded-t-lg' : 'border-transparent text-slate-600 hover:text-rose-900'
            }`}
          >
            Source Provenance & Raw Text
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {translating ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 border-4 border-[#881337] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm font-bold text-slate-800">Translating clinical summary...</p>
              <p className="text-xs text-rose-800">Adapting terminology into patient-friendly language</p>
            </div>
          ) : !activeSummary ? (
            <div className="py-16 text-center text-slate-500">
              <FileText className="w-10 h-10 mx-auto text-rose-400 mb-2" />
              <p className="text-sm font-semibold">Generating AI Health Summary...</p>
            </div>
          ) : (
            <>
              {activeTab === 'summary' && (
                <div className="space-y-6">
                  {/* Simple Summary */}
                  <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 card-3d">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#881337]" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-950">
                        {t.summary.simpleSummary}
                      </h4>
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-rose-950">
                      {activeSummary.simpleSummary}
                    </p>
                  </div>

                  {/* Important Findings */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                      {t.summary.importantFindings}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeSummary.importantFindings.map((finding, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3.5 bg-white border border-rose-200/80 rounded-xl card-3d"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <p className="text-xs font-medium text-slate-800 leading-normal">{finding}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What This May Mean */}
                  <div className="bg-rose-50/40 border border-rose-200 rounded-2xl p-5 card-3d">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-950 mb-2">
                      {t.summary.whatThisMayMean}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {activeSummary.whatThisMayMean}
                    </p>
                  </div>

                  {/* Recommended Next Step */}
                  <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/70 flex items-start gap-3 card-3d">
                    <ArrowRightCircle className="w-5 h-5 text-[#881337] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-rose-950 mb-0.5">{t.summary.nextSteps}</h5>
                      <p className="text-xs text-rose-900 leading-relaxed font-medium">
                        {activeSummary.recommendedNextStep}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'abnormal' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      {t.summary.abnormalValues}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      Compare your laboratory measurements against clinical target ranges
                    </span>
                  </div>

                  {activeSummary.abnormalValues.length === 0 ? (
                    <div className="p-8 text-center bg-emerald-50/60 border border-emerald-200 rounded-2xl card-3d">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-sm font-bold text-emerald-950">No Abnormal Values Flagged</p>
                      <p className="text-xs text-emerald-800 mt-1">
                        All extracted test parameters in this document fall within stated laboratory reference targets.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activeSummary.abnormalValues.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 card-3d"
                        >
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-[#881337] shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-bold text-slate-900">{item.name}</p>
                              <p className="text-[11px] text-rose-900 font-medium mt-0.5">{item.context}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 bg-white px-3.5 py-2 rounded-xl border border-rose-200 shadow-xs shrink-0 card-3d">
                            <div>
                              <span className="text-[10px] text-slate-400 block uppercase font-bold">Measured Value</span>
                              <span className="text-xs font-extrabold text-[#9f1239]">{item.value}</span>
                            </div>
                            <div className="border-l border-rose-100 pl-3">
                              <span className="text-[10px] text-slate-400 block uppercase font-bold">Standard Target</span>
                              <span className="text-xs font-medium text-slate-600">{item.range}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'doctor_questions' && (
                <div className="space-y-4">
                  <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4 card-3d">
                    <p className="text-xs text-rose-950 font-medium">
                      Take these questions to your next consultation with Dr. {activeSummaryDoc.doctorName || 'Murthy'} to make the most of your appointment.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {activeSummary.questionsToAskDoctor.map((q, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 bg-white border border-rose-200/80 rounded-xl card-3d"
                      >
                        <div className="w-5 h-5 rounded-full bg-rose-100 text-[#881337] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-rose-200">
                          {idx + 1}
                        </div>
                        <p className="text-xs font-semibold text-slate-800 leading-normal">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'provenance' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2">
                      Document Source Provenance
                    </h4>
                    <div className="space-y-2">
                      {activeSummary.sourceReferences.map((ref, idx) => (
                        <div key={idx} className="p-3 bg-white border border-rose-200 rounded-xl text-xs card-3d">
                          <p className="font-bold text-slate-900">{ref.documentTitle}</p>
                          <p className="text-slate-600 text-[11px] mt-0.5">
                            Section: <span className="font-medium text-slate-800">{ref.section}</span>
                            {ref.pageOrLine && ` | Location: ${ref.pageOrLine}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                        Raw Extracted OCR Text
                      </h4>
                      <span className="text-[10px] text-rose-800 font-mono">
                        Confidence: {activeSummaryDoc.confidenceScore}%
                      </span>
                    </div>
                    <pre className="p-4 bg-slate-950 text-rose-100 rounded-2xl text-[11px] font-mono whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed border border-rose-900/40">
                      {activeSummaryDoc.rawExtractedText}
                    </pre>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Persistent Clinical Disclaimer */}
          <div className="p-3 bg-rose-50/80 border border-rose-200 rounded-xl flex items-start gap-2.5 text-[11px] text-rose-950 shrink-0">
            <ShieldAlert className="w-4 h-4 text-[#881337] shrink-0 mt-0.5" />
            <span>
              <strong>Medical Disclaimer:</strong> This summary provides plain-language assistance to help you understand your reports. It does not constitute medical diagnosis, clinical judgment, or treatment prescription. Always consult your qualified healthcare provider.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
