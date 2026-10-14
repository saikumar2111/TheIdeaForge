import React, { useState, useEffect } from 'react';
import { useHealth } from '../../context/HealthContext';
import {
  FileText,
  Search,
  Filter,
  Trash2,
  Sparkles,
  ExternalLink,
  Calendar,
  Building,
  UserCheck,
  CheckCircle2,
  FileCode,
  AlertCircle,
  PlusCircle,
  X,
} from 'lucide-react';
import { api } from '../../services/api';
import { MedicalDocument } from '../../types/health';

export const DocumentsView: React.FC = () => {
  const { openSummaryForDoc, setCurrentView, showToast, refreshData } = useHealth();
  const [documents, setDocuments] = useState<MedicalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [rawTextDoc, setRawTextDoc] = useState<MedicalDocument | null>(null);
  const [docToDelete, setDocToDelete] = useState<MedicalDocument | null>(null);

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await api.getDocuments();
      setDocuments(res.documents);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleDelete = async () => {
    if (!docToDelete) return;
    try {
      await api.deleteDocument(docToDelete.id);
      showToast('Document removed safely', 'info');
      setDocToDelete(null);
      await fetchDocs();
      await refreshData();
    } catch (err) {
      showToast('Delete failed', 'error');
    }
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = categoryFilter === 'all' || doc.documentType === categoryFilter;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.hospitalOrLabName && doc.hospitalOrLabName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.doctorName && doc.doctorName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Medical Records Vault</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access your encrypted clinical reports, prescriptions, and discharge records with instant AI explanations.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('upload')}
          className="px-4 py-2.5 text-xs font-bold btn-3d-burgundy rounded-xl shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload Record</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-rose-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 card-3d">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-rose-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records by test name, hospital, doctor..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#881337] focus:border-transparent text-slate-900 bg-rose-50/30"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Records' },
            { id: 'lab_report', label: 'Lab Reports' },
            { id: 'prescription', label: 'Prescriptions' },
            { id: 'discharge_summary', label: 'Discharge' },
            { id: 'diagnostic_report', label: 'Imaging' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                categoryFilter === cat.id
                  ? 'btn-3d-burgundy shadow-xs'
                  : 'bg-rose-50/60 text-slate-700 hover:bg-rose-100 border border-rose-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-3 border-[#881337] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold text-rose-900">Loading medical records...</p>
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="p-12 text-center bg-white border border-rose-200 rounded-2xl card-3d">
          <FileText className="w-12 h-12 text-rose-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-800">No medical documents found</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or upload a new record.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-rose-200/80 hover:border-rose-300 shadow-xs hover:shadow-xl transition-all p-5 flex flex-col justify-between card-3d"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#881337] bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full badge-3d-burgundy">
                    {doc.documentType.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>OCR {doc.confidenceScore}%</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">{doc.title}</h3>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{doc.documentDate}</span>
                  </div>

                  {doc.hospitalOrLabName && (
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{doc.hospitalOrLabName}</span>
                    </div>
                  )}

                  {doc.doctorName && (
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{doc.doctorName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="mt-5 pt-4 border-t border-rose-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setRawTextDoc(doc)}
                    className="p-2 text-slate-400 hover:text-rose-900 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="View Raw OCR Text"
                  >
                    <FileCode className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDocToDelete(doc)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => openSummaryForDoc(doc)}
                  className="px-3 py-1.5 text-xs font-bold btn-3d-burgundy rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-200" />
                  <span>Explain Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Raw OCR Text Modal */}
      {rawTextDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-rose-200 max-h-[85vh] flex flex-col card-3d-raised">
            <div className="flex items-center justify-between pb-3 border-b border-rose-100">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Raw OCR Extraction Text</h3>
                <p className="text-xs text-rose-800">{rawTextDoc.title} • Confidence: {rawTextDoc.confidenceScore}%</p>
              </div>
              <button onClick={() => setRawTextDoc(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <pre className="mt-4 p-4 bg-slate-950 text-rose-100 rounded-xl text-xs font-mono whitespace-pre-wrap overflow-y-auto flex-1 leading-relaxed border border-rose-900/40">
              {rawTextDoc.rawExtractedText}
            </pre>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {docToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 space-y-4 card-3d-raised">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#881337] flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Confirm Document Deletion</h4>
                <p className="text-xs text-slate-500">This will remove the document and its linked timeline entries.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-rose-50/50 p-3 rounded-xl border border-rose-200">
              Are you sure you want to delete <strong>{docToDelete.title}</strong>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDocToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-700 hover:bg-rose-800 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
