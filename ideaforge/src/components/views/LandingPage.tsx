import React from 'react';
import { useHealth } from '../../context/HealthContext';
import {
  FileText,
  Clock,
  Sparkles,
  ShieldCheck,
  Languages,
  CheckCircle2,
  ArrowRight,
  UploadCloud,
  FileCheck2,
  Activity,
  Layers,
  HeartPulse,
  Lock,
  ChevronRight,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { ThreeDHealthSphere } from '../ThreeDHealthSphere';
import { HealthSphereLogoIcon } from '../HealthSphereLogoIcon';

export const LandingPage: React.FC = () => {
  const { t, setIsAuthModalOpen, loginAsDemo } = useHealth();

  return (
    <div className="min-h-screen bg-[#FAF5F6] text-[#221016] selection:bg-rose-200 selection:text-rose-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(136,19,55,0.18),rgba(250,245,246,0))] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-3d-burgundy text-xs font-semibold mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-700" />
              <span>3D Spatial Medical Intelligence • Patient-First</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#2A0510] tracking-tight leading-[1.15]">
              {t.heroHeadline}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#6B4B53] leading-relaxed font-normal">
              {t.heroSubheadline}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold btn-3d-burgundy rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.buildProfileCTA}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={loginAsDemo}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold btn-3d-secondary rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Activity className="w-4 h-4 text-rose-700" />
                <span>{t.exploreDemoCTA}</span>
              </button>
            </div>

            <p className="mt-4 text-xs text-rose-900/60 font-medium">
              Zero setup required • Instant preview with realistic clinical 3D records
            </p>
          </div>

          {/* 3D Interactive Spatial Health Model + Dashboard Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mx-auto max-w-6xl">
            {/* Left 3D Interactive Canvas Sphere */}
            <div className="lg:col-span-5 rounded-2xl p-5 card-3d flex flex-col justify-between bg-gradient-to-b from-white to-[#FDF4F6] relative overflow-hidden min-h-[360px] sm:min-h-[420px]">
              <div className="flex items-center justify-between pb-3 border-b border-rose-100 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#881337] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-950">
                    3D HealthSphere Orbit
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Real-time Spatial 3D
                </span>
              </div>

              <div className="flex-1 w-full my-2 relative">
                <ThreeDHealthSphere />
              </div>

              <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-rose-900 z-10">
                <span className="font-semibold text-[11px]">Rotational Biomarker Projection</span>
                <button
                  onClick={loginAsDemo}
                  className="text-xs font-bold text-[#881337] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Explore in 3D <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Medical Dashboard Preview Widget with 3D Depth */}
            <div className="lg:col-span-7 rounded-2xl card-3d overflow-hidden flex flex-col justify-between bg-white border border-rose-200/90 shadow-2xl">
              <div className="bg-[#2D030D] px-4 py-3 border-b border-rose-950 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-xs" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-xs" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-xs" />
                  <span className="text-xs font-mono text-rose-200/80 ml-2">HealthSphere 3D Intelligence Console</span>
                </div>
                <span className="text-[10px] bg-rose-900/60 text-rose-200 border border-rose-700/60 px-2 py-0.5 rounded font-mono font-bold">
                  ACTIVE PREVIEW
                </span>
              </div>

              <div className="p-5 sm:p-6 bg-[#FCF8F9] space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#881337]" />
                    <span>Processed Clinical Records</span>
                  </h3>
                  <button
                    onClick={loginAsDemo}
                    className="text-xs text-[#881337] font-bold hover:underline cursor-pointer"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 bg-white rounded-xl border border-rose-200/80 shadow-xs flex items-center justify-between hover:border-rose-400 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-rose-50 text-[#881337] flex items-center justify-center shrink-0 border border-rose-200/60">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Apollo Diagnostics • Lipid & Metabolic Panel</p>
                        <p className="text-[11px] text-[#7A5B63]">18-Oct-2025 • Fasting Sugar & Cholesterol</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-rose-900 bg-rose-100/70 border border-rose-200 px-2 py-0.5 rounded-full">
                      2 Elevated
                    </span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-rose-200/80 shadow-xs flex items-center justify-between hover:border-rose-400 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-rose-50 text-[#881337] flex items-center justify-center shrink-0 border border-rose-200/60">
                        <HeartPulse className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">MaxCure Specialty Hospital • Rx Dr. Murthy</p>
                        <p className="text-[11px] text-[#7A5B63]">22-Oct-2025 • 4 Active Prescriptions</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                </div>

                {/* 3D Timeline Snippet */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#881337]" />
                    <span>Chronological Health Milestones</span>
                  </h4>
                  <div className="relative pl-6 border-l-2 border-rose-300 space-y-3">
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#881337] ring-4 ring-white" />
                      <p className="text-xs font-bold text-slate-900">Oct 2025: Endocrinology & Cardiology Prescription</p>
                      <p className="text-[11px] text-[#6B4B53]">Metformin 500mg BID + Atorvastatin 20mg QHS initiated.</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-amber-600 ring-4 ring-white" />
                      <p className="text-xs font-bold text-slate-900">Oct 2025: Metabolic Profile (HbA1c 7.1%, LDL 157 mg/dL)</p>
                      <p className="text-[11px] text-[#6B4B53]">Apollo Lab flagged elevated glycemic & lipid parameters.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-rose-100 flex items-center justify-between">
                <span className="text-[11px] text-[#7A5B63] font-medium">Multilingual: English • Telugu • Hindi</span>
                <button
                  onClick={loginAsDemo}
                  className="px-4 py-2 text-xs font-bold btn-3d-burgundy rounded-lg transition-all cursor-pointer"
                >
                  Enter Clinical Console &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Architecture Principles Section */}
      <section className="py-16 bg-white border-y border-rose-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#881337] mb-2">Trust & Safety Principles</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2A0510] tracking-tight">
              Clinical Rigor with Structural Clarity
            </h3>
            <p className="text-sm text-[#6B4B53] mt-2">
              We never fabricate diagnoses or guess missing values. Every extraction links back to its verified paper source.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FCF8F9] border border-rose-200/80 card-3d">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center mb-4 shadow-xs">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">AI Document Understanding</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed">
                Multimodal vision OCR extracts medications, dosages, units, and laboratory values with preserved confidence scoring.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FCF8F9] border border-rose-200/80 card-3d">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center mb-4 shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Unified Health Timeline</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed">
                Transforms scattered PDF reports and paper slips into an organized chronological health record.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FCF8F9] border border-rose-200/80 card-3d">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center mb-4 shadow-xs">
                <Languages className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Plain-Language Explanations</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed">
                Clear, empathetic breakdowns in English, Telugu, and Hindi so patients and families truly understand their health.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FCF8F9] border border-rose-200/80 card-3d">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center mb-4 shadow-xs">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Privacy-First Architecture</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed">
                Strict patient-level data isolation, encrypted storage, and ABDM & FHIR-ready resource modeling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#FAF5F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#881337] mb-2">How It Works</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2A0510] tracking-tight">
              From Paper Slips to Actionable Knowledge in 4 Steps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl btn-3d-burgundy flex items-center justify-center text-lg font-bold shadow-lg mb-4">
                1
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">Upload Records</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed">
                Drop your PDF or image files (lab tests, prescriptions, discharge summaries, or certificates).
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl btn-3d-burgundy flex items-center justify-center text-lg font-bold shadow-lg mb-4">
                2
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">Extract & Verify</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed">
                Vision OCR structures medicine names, dosages, reference ranges, and test values with confidence scores.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl btn-3d-burgundy flex items-center justify-center text-lg font-bold shadow-lg mb-4">
                3
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">Understand with AI</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed">
                Read plain-language summaries, out-of-range value explanations, and targeted questions for your doctor.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl btn-3d-burgundy flex items-center justify-center text-lg font-bold shadow-lg mb-4">
                4
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">Track Over Time</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed">
                Build a unified timeline and export FHIR bundles or link your mock ABHA identifier seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Matrix Section */}
      <section id="features" className="py-20 bg-white border-t border-rose-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#881337] mb-2">Comprehensive Features</h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2A0510] tracking-tight">
              Engineered for Real-World Medical Records
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-rose-200/80 card-3d bg-[#FCF8F9]">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center mb-4 shadow-xs">
                <UploadCloud className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Smart Medical OCR</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed mb-4">
                Identifies document type automatically. Parses test measurements, units, reference limits, and doctor instructions with manual correction capability.
              </p>
              <span className="text-[11px] font-bold text-[#881337] flex items-center gap-1">
                Field validation & confidence tags &rarr;
              </span>
            </div>

            <div className="p-6 rounded-2xl border border-rose-200/80 card-3d bg-[#FCF8F9]">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center mb-4 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">AI Report Summaries</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed mb-4">
                &ldquo;Explain My Report&rdquo; generates plain-language insights, flags abnormal parameters, and drafts meaningful follow-up questions for your physician.
              </p>
              <span className="text-[11px] font-bold text-[#881337] flex items-center gap-1">
                Zero clinical hallucinations &rarr;
              </span>
            </div>

            <div className="p-6 rounded-2xl border border-rose-200/80 card-3d bg-[#FCF8F9]">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center mb-4 shadow-xs">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Prescription Intelligence</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed mb-4">
                Tracks active vs completed medications, dosages, frequency, and instructions with source prescription linking and verification status.
              </p>
              <span className="text-[11px] font-bold text-[#881337] flex items-center gap-1">
                Prevents medication confusion &rarr;
              </span>
            </div>

            <div className="p-6 rounded-2xl border border-rose-200/80 card-3d bg-[#FCF8F9]">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center mb-4 shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Interactive Health Timeline</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed mb-4">
                Chronological and reverse-chronological milestones of doctor visits, diagnostic imaging, lab analyses, and discharge summaries with category filters.
              </p>
              <span className="text-[11px] font-bold text-[#881337] flex items-center gap-1">
                Full historical continuity &rarr;
              </span>
            </div>

            <div className="p-6 rounded-2xl border border-rose-200/80 card-3d bg-[#FCF8F9]">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center mb-4 shadow-xs">
                <Languages className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Multilingual Localization</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed mb-4">
                Full interface and AI summary support in English, Telugu (తెలుగు), and Hindi (हिन्दी) for patients and families across India.
              </p>
              <span className="text-[11px] font-bold text-[#881337] flex items-center gap-1">
                Accessible healthcare communication &rarr;
              </span>
            </div>

            <div className="p-6 rounded-2xl border border-rose-200/80 card-3d bg-[#FCF8F9]">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center mb-4 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">ABDM & FHIR Architecture</h4>
              <p className="text-xs text-[#6B4B53] leading-relaxed mb-4">
                Structured according to HL7 FHIR R4 resources (Patient, DiagnosticReport, Observation, MedicationRequest) with simulated ABHA linking gateway.
              </p>
              <span className="text-[11px] font-bold text-[#881337] flex items-center gap-1">
                Interoperable health data model &rarr;
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Disclaimers Section */}
      <section id="privacy" className="py-16 bg-[#FAF5F6] border-t border-rose-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 bg-white border border-rose-200/80 rounded-2xl card-3d space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Medical Safety & Regulatory Statement</h4>
                <p className="text-xs text-[#7A5B63]">Transparent AI healthcare ethics</p>
              </div>
            </div>

            <p className="text-xs text-[#6B4B53] leading-relaxed">
              <strong>HealthSphere AI</strong> is designed strictly to assist individuals in organizing, understanding, and communicating health records. It does <strong>not</strong> provide diagnostic medical claims, nor does it recommend changing prescription dosages. In case of emergency or severe symptoms (such as acute chest pain, shortness of breath, or loss of consciousness), immediately contact local emergency healthcare services.
            </p>

            <div className="pt-2 border-t border-rose-100 flex flex-wrap gap-4 text-xs text-[#6B4B53]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                No selling of personal health data
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Transparent source citations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Patient-controlled deletion
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-[#24030B] text-rose-200/70 py-12 border-t border-rose-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#881337] text-white flex items-center justify-center font-bold shadow-md border border-rose-500/30">
              <HealthSphereLogoIcon className="w-5 h-5 drop-shadow-xs" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">HealthSphere AI</p>
              <p className="text-xs text-rose-300/60">3D Personal Health Copilot • Prototype Release</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button onClick={loginAsDemo} className="hover:text-rose-100 transition-colors cursor-pointer">
              Launch HealthSphere Console
            </button>
            <span>•</span>
            <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-rose-100 transition-colors cursor-pointer">
              Sign In
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
