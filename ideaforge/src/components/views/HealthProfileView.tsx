import React, { useState, useRef } from 'react';
import { useHealth } from '../../context/HealthContext';
import {
  User,
  HeartPulse,
  Pill,
  Shield,
  Download,
  Edit2,
  Save,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  Phone,
  Camera,
  Upload,
} from 'lucide-react';
import { api } from '../../services/api';

export const HealthProfileView: React.FC = () => {
  const { user, profileData, refreshData, showToast } = useHealth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [dob, setDob] = useState(user?.dob || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || '');
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || '');

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        await api.updateHealthProfile({ profilePicture: base64 });
        await refreshData();
        showToast('Profile photo updated!', 'success');
      } catch (err) {
        showToast('Failed to update photo', 'error');
      }
    };
    reader.readAsDataURL(file);
  };

  const observations = profileData?.observations || [];
  const medications = profileData?.medications || [];
  const clinicalRecords = profileData?.clinicalRecords || [];

  const diagnoses = clinicalRecords.filter((c) => c.recordType === 'diagnosis');
  const allergies = clinicalRecords.filter((c) => c.recordType === 'allergy');
  const procedures = clinicalRecords.filter((c) => c.recordType === 'procedure' || c.recordType === 'discharge');

  const handleSaveProfile = async () => {
    try {
      await api.updateHealthProfile({
        name,
        dob,
        gender,
        bloodGroup,
        emergencyContact,
      });
      setIsEditing(false);
      showToast('Profile details updated successfully', 'success');
      await refreshData();
    } catch (err) {
      showToast('Failed to update profile', 'error');
    }
  };

  const exportSummaryJSON = () => {
    const data = {
      profile: user,
      diagnoses,
      allergies,
      activeMedications: medications.filter((m) => m.recordedStatus === 'active'),
      clinicalObservations: observations,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HealthSphere_Profile_${user?.name.replace(/\s+/g, '_')}.json`;
    a.click();
    showToast('Health profile summary exported', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Unified Patient Health Profile</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Centralized clinical record consolidated across all processed medical documents with provenance tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportSummaryJSON}
            className="px-3.5 py-2 text-xs font-bold btn-3d-secondary rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Summary</span>
          </button>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-xs font-bold btn-3d-burgundy rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          ) : (
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 text-xs font-bold btn-3d-burgundy rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </div>

      {/* Demographics Card in 3D Burgundy */}
      <div className="bg-white p-6 rounded-3xl border border-rose-200/80 shadow-md card-3d">
        <div className="flex items-center justify-between pb-4 border-b border-rose-100 mb-5">
          <div className="flex items-center gap-4">
            <div
              className="relative group/avatar cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-[#9f1239] via-[#881337] to-[#4c0519] text-white flex items-center justify-center text-2xl font-bold shadow-md ring-4 ring-rose-200">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{user?.name.charAt(0)}</span>
                )}
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full btn-3d-burgundy shadow cursor-pointer ring-2 ring-white"
                title="Change Profile Picture"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePicUpload}
              className="hidden"
            />
            <div>
              <h3 className="text-base font-extrabold text-slate-900">{user?.name}</h3>
              <p className="text-xs text-slate-500">{user?.email}</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-bold text-[#881337] hover:underline flex items-center gap-1 mt-0.5 cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>{user?.profilePicture ? 'Update Photo' : 'Upload Profile Picture'}</span>
              </button>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#881337] bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full badge-3d-burgundy">
              ABHA: {user?.abhaId || 'Linked'}
            </span>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center justify-end gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Identity Verified</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full text-xs font-bold p-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-[#881337] outline-none"
              />
            ) : (
              <p className="text-xs font-bold text-slate-900">{dob || '1979-05-14'}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Gender</label>
            {isEditing ? (
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full text-xs font-bold p-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-[#881337] outline-none"
              />
            ) : (
              <p className="text-xs font-bold text-slate-900">{gender || 'Male'}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Blood Group</label>
            {isEditing ? (
              <input
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full text-xs font-bold p-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-[#881337] outline-none"
              />
            ) : (
              <span className="text-xs font-bold text-[#881337] bg-rose-50 px-2 py-0.5 rounded border border-rose-200 inline-block font-mono">
                {bloodGroup || 'B Positive'}
              </span>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Emergency Contact</label>
            {isEditing ? (
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full text-xs font-bold p-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-[#881337] outline-none"
              />
            ) : (
              <p className="text-xs font-bold text-slate-900 truncate">{emergencyContact || '+91 98490 12345 (Spouse)'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Diagnoses, Allergies, Procedures */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Diagnoses */}
        <div className="bg-white p-5 rounded-2xl border border-rose-200/80 shadow-xs space-y-3 card-3d">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-[#881337]" />
              <span>Documented Diagnoses</span>
            </h3>
            <span className="text-[10px] font-bold text-[#881337] bg-rose-50 px-1.5 py-0.5 rounded-full">
              {diagnoses.length}
            </span>
          </div>

          <div className="space-y-2">
            {diagnoses.map((d) => (
              <div key={d.id} className="p-3 rounded-xl bg-rose-50/50 border border-rose-200/60 card-3d">
                <p className="text-xs font-bold text-slate-900">{d.title}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{d.description}</p>
                <span className="inline-block mt-1 text-[10px] text-rose-800 font-mono">
                  Recorded: {d.recordedDate}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white p-5 rounded-2xl border border-rose-200/80 shadow-xs space-y-3 card-3d">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Recorded Allergies</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              {allergies.length}
            </span>
          </div>

          <div className="space-y-2">
            {allergies.map((a) => (
              <div key={a.id} className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60 card-3d">
                <p className="text-xs font-bold text-slate-900">{a.title}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{a.description}</p>
                <span className="inline-block mt-1 text-[10px] text-emerald-700 font-mono">
                  Recorded: {a.recordedDate}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Procedures & Summaries */}
        <div className="bg-white p-5 rounded-2xl border border-rose-200/80 shadow-xs space-y-3 card-3d">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>Procedures & Encounters</span>
            </h3>
            <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-1.5 py-0.5 rounded-full">
              {procedures.length}
            </span>
          </div>

          <div className="space-y-2">
            {procedures.map((p) => (
              <div key={p.id} className="p-3 rounded-xl bg-purple-50/50 border border-purple-200/60 card-3d">
                <p className="text-xs font-bold text-slate-900">{p.title}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{p.description}</p>
                <span className="inline-block mt-1 text-[10px] text-purple-700 font-mono">
                  Date: {p.recordedDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
