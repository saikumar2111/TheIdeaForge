import React, { useState, useEffect } from 'react';
import { useHealth } from '../../context/HealthContext';
import {
  Clock,
  Calendar,
  Filter,
  ArrowUpDown,
  FileText,
  Pill,
  FlaskConical,
  HeartPulse,
  Sparkles,
  ChevronRight,
  X,
  Building,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { api } from '../../services/api';
import { TimelineEvent } from '../../types/health';

export const TimelineView: React.FC = () => {
  const { openSummaryForDoc } = useHealth();
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTimeline = async () => {
    setLoading(true);
    try {
      const res = await api.getTimeline(sortOrder, selectedType);
      setEvents(res.events);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, [sortOrder, selectedType]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'prescription':
        return <Pill className="w-4 h-4 text-emerald-600" />;
      case 'lab_report':
        return <FlaskConical className="w-4 h-4 text-[#881337]" />;
      case 'discharge':
        return <HeartPulse className="w-4 h-4 text-[#9f1239]" />;
      default:
        return <Clock className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Interactive Health Timeline</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chronological continuum of your clinical encounters, diagnostic reports, and prescription milestones.
          </p>
        </div>

        {/* Sort & Order Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="px-3 py-1.5 text-xs font-bold btn-3d-secondary rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Milestones' },
          { id: 'prescription', label: 'Prescriptions' },
          { id: 'lab_report', label: 'Lab Reports' },
          { id: 'discharge', label: 'Discharges' },
          { id: 'consultation', label: 'Consultations' },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              selectedType === type.id
                ? 'btn-3d-burgundy shadow-xs'
                : 'bg-white text-slate-700 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-3 border-[#881337] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold text-rose-900">Loading timeline events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="p-12 text-center bg-white border border-rose-200 rounded-3xl card-3d">
          <Clock className="w-10 h-10 text-rose-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-800">No events found in selected category</p>
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-8 border-l-3 border-[#881337]/30 space-y-8 my-4">
          {events.map((event) => {
            const isAttention = event.severity === 'attention';
            return (
              <div key={event.id} className="relative group">
                {/* 3D Node circle */}
                <div
                  className={`absolute -left-[32px] sm:-left-[41px] top-1.5 w-4.5 h-4.5 rounded-full ring-4 ring-rose-100 shadow-md transition-transform group-hover:scale-125 ${
                    isAttention ? 'bg-amber-500' : 'bg-gradient-to-br from-[#9f1239] to-[#881337]'
                  }`}
                />

                {/* Event Card in 3D */}
                <div
                  onClick={() => setSelectedEvent(event)}
                  className="bg-white p-5 rounded-3xl border border-rose-200/80 hover:border-rose-400 shadow-sm hover:shadow-xl transition-all cursor-pointer card-3d"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-rose-100 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
                        {getEventIcon(event.eventType)}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#881337] bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full badge-3d-burgundy">
                        {event.eventType.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{event.title}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-rose-900 shrink-0 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-rose-600" />
                      <span>{event.eventDate}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 font-medium leading-relaxed">{event.summary}</p>

                  {/* Relevant Findings badges */}
                  {event.relevantFindings.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {event.relevantFindings.map((finding, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold text-slate-800 bg-rose-50/70 border border-rose-200 px-2 py-0.5 rounded-md"
                        >
                          {finding}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 pt-2 text-[11px] text-[#881337] font-bold flex items-center justify-between">
                    <span>Source: {event.documentTitle}</span>
                    <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      View details <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Event Details Drawer Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-rose-200 space-y-4 card-3d-raised">
            <div className="flex items-center justify-between pb-3 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#881337] bg-rose-50 px-2 py-0.5 rounded badge-3d-burgundy">
                  {selectedEvent.eventType.replace('_', ' ')}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-medium text-slate-500">{selectedEvent.eventDate}</span>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-base font-extrabold text-slate-900">{selectedEvent.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed bg-rose-50/40 p-3.5 rounded-xl border border-rose-200/60">
              {selectedEvent.summary}
            </p>

            {selectedEvent.relevantFindings.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-rose-900 mb-1.5">
                  Extracted Clinical Findings
                </h4>
                <div className="space-y-1">
                  {selectedEvent.relevantFindings.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#881337]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Source: {selectedEvent.documentTitle}</span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-xs font-bold btn-3d-burgundy rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
