import React, { useState, useRef } from 'react';
import { useHealth } from '../../context/HealthContext';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FileUp,
  X,
  Edit2,
  Save,
  Clock,
  Building,
  UserCheck,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { api } from '../../services/api';
import { MedicalObservation, Medication } from '../../types/health';

export const UploadStudioView: React.FC = () => {
  const { refreshData, showToast, setCurrentView, openSummaryForDoc, t } = useHealth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('lab_report');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Extracted preview state for user review & correction
  const [extractedResult, setExtractedResult] = useState<{
    document: any;
    summary: any;
    observations: MedicalObservation[];
    medications: Medication[];
  } | null>(null);

  const [isEditingFields, setIsEditingFields] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedHospital, setEditedHospital] = useState('');
  const [editedDoctor, setEditedDoctor] = useState('');

  // Sample Documents for 1-Click Evaluation
  const samplePresets = [
    {
      title: 'Thyroid Function Panel (Free T3, T4, TSH)',
      type: 'lab_report',
      hospital: 'Dr. Lal PathLabs, Hyderabad',
      doctor: 'Dr. Neha Kulkarni, MD',
      text: `DR. LAL PATHLABS - CLINICAL BIOCHEMISTRY
Patient: Rajesh K. Sharma | Age: 46 M | Date: 12-Nov-2025
Ref: Dr. Neha Kulkarni, MD (Endocrinology)

TEST NAME                       RESULT     UNIT        REFERENCE RANGE     FLAG
TSH (Ultrasensitive)            6.42       uIU/mL      0.35 - 4.94         HIGH
Free Triiodothyronine (FT3)     3.10       pg/mL       1.71 - 3.71         NORMAL
Free Thyroxine (FT4)            1.18       ng/dL       0.70 - 1.48         NORMAL

Interpretation: Mild subclinical hypothyroidism. TSH elevation with normal peripheral thyroid hormone levels. Recommend re-evaluation in 8 weeks or clinical correlation.`,
    },
    {
      title: 'Pulmonology Prescription (Asthma & Inhaler)',
      type: 'prescription',
      hospital: 'Apollo Hospitals Jubilee Hills',
      doctor: 'Dr. Vikram Chandra, MD (Pulmonology)',
      text: `APOLLO HOSPITALS JUBILEE HILLS
Department of Pulmonology
Date: 05-Nov-2025 | Patient: Rajesh Sharma, 46M

Rx:
1. Budecort 200 Inhaler (Budesonide) - 2 puffs twice daily (Morning & Night) after mouth rinsing x 60 days.
2. Tab. Montair-LC (Montelukast 10mg + Levocetirizine 5mg) - 1 tablet once daily at bedtime x 30 days.
3. Foracort Rotacaps 200 - 1 cap inhalation SOS (during acute wheezing episodes).

Advice:
- Peak Flow meter self-monitoring twice daily.
- Rinse mouth with warm water thoroughly after steroid inhaler use.
- Avoid dust mite and cold air exposure.`,
    },
    {
      title: 'Orthopedic Day-Care Arthroscopy Summary',
      type: 'discharge_summary',
      hospital: 'KIMS Hospitals, Secunderabad',
      doctor: 'Dr. P. S. Rao, MS (Ortho), MCh',
      text: `KIMS HOSPITALS - DAY CARE DISCHARGE SUMMARY
Admission Date: 10-Aug-2025 | Discharge Date: 10-Aug-2025
Patient: Rajesh K. Sharma | IP No: DC-25-10492

Diagnosis:
Right Knee Degenerative Medial Meniscus Tear (Grade II).

Procedure:
Right Knee Diagnostic Arthroscopy + Partial Meniscectomy performed under spinal anesthesia.

Discharge Status:
Hemodynamically stable. Knee wrapped in compression bandage. Tolerating oral fluids and ambulating with partial weight bearing with walker assistance.`,
    },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = async (file: File) => {
    // Validate type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf')) {
      showToast('Please upload a PDF or JPG/PNG image file', 'error');
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showToast('File size must be under 10MB', 'error');
      return;
    }

    setIsProcessing(true);
    setUploadProgress(15);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        setUploadProgress(45);
        const base64Data = reader.result as string;

        try {
          const res = await api.uploadDocument({
            originalFilename: file.name,
            mimeType: file.type || 'application/pdf',
            fileSize: file.size,
            documentType: selectedCategory,
            base64Data,
            documentDate: new Date().toISOString().split('T')[0],
          });

          setUploadProgress(100);
          setExtractedResult({
            document: res.document,
            summary: res.summary,
            observations: res.observations,
            medications: res.medications,
          });

          setEditedTitle(res.document.title);
          setEditedDate(res.document.documentDate);
          setEditedHospital(res.document.hospitalOrLabName || '');
          setEditedDoctor(res.document.doctorName || '');

          showToast('Medical document processed with Vision OCR!', 'success');
          await refreshData();
        } catch (err: any) {
          showToast(err.message || 'Processing failed', 'error');
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setIsProcessing(false);
      showToast('File read failed', 'error');
    }
  };

  const loadPresetSample = async (preset: typeof samplePresets[0]) => {
    setIsProcessing(true);
    setUploadProgress(30);

    try {
      const res = await api.uploadDocument({
        originalFilename: `${preset.title.replace(/\s+/g, '_')}.pdf`,
        mimeType: 'application/pdf',
        fileSize: 345000,
        documentType: preset.type,
        rawText: preset.text,
        hospitalOrLabName: preset.hospital,
        doctorName: preset.doctor,
        documentDate: '2025-11-12',
      });

      setUploadProgress(100);
      setExtractedResult({
        document: res.document,
        summary: res.summary,
        observations: res.observations,
        medications: res.medications,
      });

      setEditedTitle(res.document.title);
      setEditedDate(res.document.documentDate);
      setEditedHospital(res.document.hospitalOrLabName || '');
      setEditedDoctor(res.document.doctorName || '');

      showToast(`Loaded sample: ${preset.title}`, 'success');
      await refreshData();
    } catch (err: any) {
      showToast('Preset load failed: ' + err.message, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveCorrections = async () => {
    if (!extractedResult) return;
    try {
      await api.updateExtraction(extractedResult.document.id, {
        title: editedTitle,
        documentDate: editedDate,
        hospitalOrLabName: editedHospital,
        doctorName: editedDoctor,
        verifiedObservations: extractedResult.observations,
        verifiedMedications: extractedResult.medications,
      });
      setIsEditingFields(false);
      showToast('Corrections confirmed and indexed!', 'success');
      await refreshData();
    } catch (err) {
      showToast('Update failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{t.upload.title}</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.upload.subtitle}</p>
      </div>

      {/* 1-Click Evaluation Presets */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-50 to-rose-100/60 border border-rose-200/90 rounded-3xl shadow-sm card-3d">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#881337]" />
            <h4 className="text-xs font-bold text-[#4c0519] uppercase tracking-wider">
              Instant Hackathon Demo Test Presets (Zero File Prep)
            </h4>
          </div>
          <span className="text-[10px] font-bold text-[#881337] bg-white px-2 py-0.5 rounded border border-rose-200 shadow-2xs">
            Synthetic Clinical Records
          </span>
        </div>
        <p className="text-xs text-rose-950/80 mb-3">
          Click any clinical document below to simulate an immediate OCR extraction pipeline without needing your own files:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {samplePresets.map((preset, idx) => (
            <button
              key={idx}
              disabled={isProcessing}
              onClick={() => loadPresetSample(preset)}
              className="p-3 bg-white hover:bg-rose-50/80 border border-rose-200 hover:border-rose-300 rounded-2xl text-left transition-all shadow-xs cursor-pointer disabled:opacity-50 group card-3d"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase text-[#881337] bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                  {preset.type.replace('_', ' ')}
                </span>
                <FileUp className="w-3.5 h-3.5 text-rose-400 group-hover:text-rose-700 transition-colors" />
              </div>
              <p className="text-xs font-bold text-slate-900 group-hover:text-rose-950 line-clamp-1">{preset.title}</p>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">{preset.hospital}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Drag & Drop Zone */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-200/80 shadow-md space-y-6 card-3d">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-rose-900 mb-1">
              {t.upload.docCategory}
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'lab_report', label: 'Lab Report' },
                { id: 'prescription', label: 'Prescription' },
                { id: 'discharge_summary', label: 'Discharge Summary' },
                { id: 'diagnostic_report', label: 'Diagnostic Imaging' },
                { id: 'medical_certificate', label: 'Medical Certificate' },
                { id: 'other', label: 'Other Document' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'btn-3d-burgundy shadow-xs'
                      : 'bg-rose-50/60 text-slate-700 hover:bg-rose-100 border border-rose-200/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Drop zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onDragOver={handleDrag}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center card-3d ${
            dragActive
              ? 'border-[#881337] bg-rose-50/90 scale-[0.99]'
              : 'border-rose-300 hover:border-rose-400 bg-[#FAF5F6] hover:bg-rose-50/40'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9f1239] via-[#881337] to-[#4c0519] text-white flex items-center justify-center mb-4 shadow-lg ring-4 ring-rose-200">
            <UploadCloud className="w-8 h-8" />
          </div>

          <p className="text-sm font-extrabold text-slate-900">
            {t.upload.dragDropText} <span className="text-[#881337] underline">{t.upload.browseFiles}</span>
          </p>
          <p className="text-xs text-rose-900/60 mt-1 font-medium">{t.upload.supportedFormats}</p>

          {isProcessing && (
            <div className="mt-6 w-full max-w-xs space-y-2">
              <div className="w-full bg-rose-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#9f1239] to-[#881337] h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs font-bold text-[#881337] animate-pulse">
                {t.upload.analyzingDocument} ({uploadProgress}%)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Review & Extracted Results Studio */}
      {extractedResult && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-200 shadow-xl space-y-6 animate-in fade-in card-3d-raised">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-rose-100 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5 text-[#881337]" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{t.upload.reviewExtracted}</h3>
                <p className="text-xs text-slate-500">{t.upload.ocrNotice}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-[#881337] text-xs font-bold badge-3d-burgundy">
                <span>{t.upload.confidenceScore}:</span>
                <span className="font-mono text-rose-950">{extractedResult.document.confidenceScore}%</span>
              </div>

              {!isEditingFields ? (
                <button
                  onClick={() => setIsEditingFields(true)}
                  className="px-3 py-1.5 text-xs font-bold btn-3d-secondary rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Correct Fields</span>
                </button>
              ) : (
                <button
                  onClick={handleSaveCorrections}
                  className="px-3 py-1.5 text-xs font-bold btn-3d-burgundy rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Corrections</span>
                </button>
              )}
            </div>
          </div>

          {/* Editable Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-rose-50/50 rounded-2xl border border-rose-200">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Document Title</label>
              {isEditingFields ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full text-xs font-bold bg-white border border-rose-200 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#881337] outline-none"
                />
              ) : (
                <p className="text-xs font-bold text-slate-900">{editedTitle}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Report Date</label>
              {isEditingFields ? (
                <input
                  type="date"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                  className="w-full text-xs font-bold bg-white border border-rose-200 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#881337] outline-none"
                />
              ) : (
                <p className="text-xs font-bold text-slate-900">{editedDate}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Hospital / Lab</label>
              {isEditingFields ? (
                <input
                  type="text"
                  value={editedHospital}
                  onChange={(e) => setEditedHospital(e.target.value)}
                  className="w-full text-xs font-bold bg-white border border-rose-200 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#881337] outline-none"
                />
              ) : (
                <p className="text-xs font-bold text-slate-900">{editedHospital || 'Not Specified'}</p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Prescribing Doctor</label>
              {isEditingFields ? (
                <input
                  type="text"
                  value={editedDoctor}
                  onChange={(e) => setEditedDoctor(e.target.value)}
                  className="w-full text-xs font-bold bg-white border border-rose-200 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#881337] outline-none"
                />
              ) : (
                <p className="text-xs font-bold text-slate-900">{editedDoctor || 'Not Specified'}</p>
              )}
            </div>
          </div>

          {/* Extracted Observations Table (if lab report) */}
          {extractedResult.observations.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2">
                Extracted Lab Values ({extractedResult.observations.length})
              </h4>
              <div className="overflow-x-auto border border-rose-200 rounded-2xl card-3d">
                <table className="w-full text-left text-xs">
                  <thead className="bg-rose-50/80 text-rose-950 font-bold border-b border-rose-200">
                    <tr>
                      <th className="p-3">Test Parameter</th>
                      <th className="p-3">Measured Value</th>
                      <th className="p-3">Reference Range</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-100">
                    {extractedResult.observations.map((obs, i) => (
                      <tr key={i} className="hover:bg-rose-50/30">
                        <td className="p-3 font-bold text-slate-900">{obs.testName}</td>
                        <td className="p-3 font-semibold text-slate-800">
                          {obs.value} {obs.unit}
                        </td>
                        <td className="p-3 text-slate-600">{obs.referenceRange}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              obs.interpretationStatus === 'abnormal'
                                ? 'bg-rose-100 text-[#881337] border border-rose-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            {obs.interpretationStatus}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400 font-mono text-[10px]">{obs.sourceLocation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Extracted Medications (if prescription) */}
          {extractedResult.medications.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2">
                Extracted Medications ({extractedResult.medications.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extractedResult.medications.map((m, i) => (
                  <div key={i} className="p-3.5 bg-rose-50/50 border border-rose-200 rounded-xl card-3d">
                    <p className="text-xs font-bold text-slate-900">{m.medicationName} ({m.strength})</p>
                    <p className="text-[11px] text-slate-600 mt-1">{m.dosage} • {m.frequency}</p>
                    <p className="text-[10px] text-[#881337] font-semibold mt-0.5">Instructions: {m.instructions}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-rose-100 gap-3">
            <button
              onClick={() => {
                setExtractedResult(null);
                showToast('Discarded current preview', 'info');
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              {t.upload.cancel}
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openSummaryForDoc(extractedResult.document)}
                className="px-4 py-2 text-xs font-bold btn-3d-secondary rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#881337]" />
                <span>Explain With AI</span>
              </button>

              <button
                onClick={() => {
                  showToast('Document confirmed in health timeline!', 'success');
                  setCurrentView('timeline');
                }}
                className="px-5 py-2 text-xs font-bold btn-3d-burgundy rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t.upload.saveToProfile}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
