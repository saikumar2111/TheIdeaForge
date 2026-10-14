import React, { useState, useRef } from 'react';
import { useHealth } from '../context/HealthContext';
import {
  Activity,
  ShieldCheck,
  Globe,
  ChevronDown,
  User,
  ArrowRight,
  LayoutDashboard,
  Sparkles,
  Camera,
  Upload,
  X,
  Phone,
  Calendar,
  Heart,
  Droplet,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Edit2,
  Save,
  Check,
} from 'lucide-react';
import { LanguageCode } from '../types/health';
import { api } from '../services/api';
import { HealthSphereLogoIcon } from './HealthSphereLogoIcon';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    currentView,
    setCurrentView,
    user,
    setIsAuthModalOpen,
    loginAsDemo,
    logout,
    refreshData,
    showToast,
  } = useHealth();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [isEditingBasicDetails, setIsEditingBasicDetails] = useState(false);
  const [editName, setEditName] = useState(user?.name || 'Rajesh K. Sharma');
  const [editDob, setEditDob] = useState(user?.dob || '1979-05-14');
  const [editGender, setEditGender] = useState(user?.gender || 'Male');
  const [editBloodGroup, setEditBloodGroup] = useState(user?.bloodGroup || 'B Positive');
  const [editEmergency, setEditEmergency] = useState(user?.emergencyContact || '+91 98490 12345 (Spouse - Priya)');
  const [isSavingDetails, setIsSavingDetails] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preset 3D avatars for 1-click photo assignment
  const avatarPresets = [
    {
      id: 'avatar_1',
      name: 'Executive Portrait',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'avatar_2',
      name: 'Clinical Portrait',
      url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'avatar_3',
      name: 'Casual Portrait',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'avatar_4',
      name: 'Professional Portrait',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'avatar_5',
      name: 'Senior Portrait',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    },
    {
      id: 'avatar_6',
      name: 'Modern Portrait',
      url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    },
  ];

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, JPEG, WEBP)', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        await api.updateHealthProfile({ profilePicture: base64 });
        await refreshData();
        showToast('Profile picture uploaded successfully!', 'success');
      } catch (err) {
        showToast('Failed to update profile picture', 'error');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetAvatar = async (avatarUrl: string) => {
    try {
      await api.updateHealthProfile({ profilePicture: avatarUrl });
      await refreshData();
      showToast('Profile picture selected successfully!', 'success');
    } catch (err) {
      showToast('Failed to set profile picture', 'error');
    }
  };

  const handleSaveBasicDetails = async () => {
    setIsSavingDetails(true);
    try {
      await api.updateHealthProfile({
        name: editName,
        dob: editDob,
        gender: editGender,
        bloodGroup: editBloodGroup,
        emergencyContact: editEmergency,
      });
      await refreshData();
      setIsEditingBasicDetails(false);
      showToast('Basic user details saved successfully!', 'success');
    } catch (err) {
      showToast('Failed to save user details', 'error');
    } finally {
      setIsSavingDetails(false);
    }
  };

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  // Calculate age from DOB
  const calculateAge = (dobString?: string) => {
    if (!dobString) return '46';
    const birthYear = new Date(dobString).getFullYear();
    const currentYear = new Date().getFullYear();
    if (isNaN(birthYear)) return '46';
    return `${currentYear - birthYear}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-rose-200/80 shadow-[0_4px_20px_-4px_rgba(76,5,25,0.06)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9f1239] via-[#881337] to-[#4c0519] flex items-center justify-center text-white shadow-md shadow-rose-950/25 group-hover:scale-105 transition-all border-t border-rose-400/35 border-b-2 border-[#2b020c]">
            <HealthSphereLogoIcon className="w-6 h-6 drop-shadow-xs" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">HealthSphere</span>
              <span className="bg-[#881337] text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase shadow-2xs">AI</span>
            </div>
            <p className="text-[11px] font-medium text-rose-900/70 leading-none mt-0.5">Personal Health Copilot</p>
          </div>
        </div>

        {/* Center Nav for Landing Page */}
        {currentView === 'landing' && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => {
                const el = document.getElementById('how-it-works');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-rose-900 transition-colors cursor-pointer"
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-rose-900 transition-colors cursor-pointer"
            >
              {t.nav.features}
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('privacy');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-rose-900 transition-colors cursor-pointer"
            >
              {t.nav.privacy}
            </button>
            <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full badge-3d-burgundy shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-700" />
              <span>FHIR & ABDM Aligned</span>
            </div>
          </nav>
        )}

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Language Selector: only displayed inside the app/dashboard, removed from front page */}
          {currentView !== 'landing' && (
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="btn-3d-secondary flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#881337]" />
                <span>{languages.find((l) => l.code === language)?.native || 'English'}</span>
                <ChevronDown className="w-3 h-3 text-rose-700" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-rose-200 py-1.5 z-50 animate-in fade-in zoom-in-95 card-3d">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs font-medium flex items-center justify-between hover:bg-rose-50 transition-colors cursor-pointer ${
                        language === l.code ? 'text-[#881337] font-bold bg-rose-50/80' : 'text-slate-700'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* User state / Action Buttons */}
          {user && currentView !== 'landing' ? (
            <div className="flex items-center gap-2">
              {/* Profile Button with 3D design and Profile Picture upload / basic details modal */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(true)}
                  className="btn-3d-profile flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer group text-left relative"
                  title="Click to view basic patient details & add profile photo"
                >
                  {/* 3D Beveled Profile Picture / Avatar Slot */}
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-gradient-to-br from-[#9f1239] via-[#881337] to-[#4c0519] text-white flex items-center justify-center text-xs font-bold shrink-0 ring-2 ring-rose-400/80 shadow-md">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[11px] font-black">{user.name.charAt(0)}</span>
                    )}

                    {/* Camera indicator if picture is not set */}
                    {!user.profilePicture && (
                      <span className="absolute inset-0 bg-[#4c0519]/80 flex items-center justify-center">
                        <Camera className="w-3.5 h-3.5 text-rose-200 animate-pulse" />
                      </span>
                    )}
                  </div>

                  {/* User Name & Status Span */}
                  <span className="flex flex-col min-w-0 pr-1">
                    <span className="text-xs font-extrabold text-[#4c0519] truncate max-w-[125px] leading-tight block">
                      {user.name}
                    </span>
                    <span className="text-[9px] font-semibold text-rose-700/80 flex items-center gap-1 leading-none">
                      {user.profilePicture ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                          <span>Patient Profile</span>
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping inline-block" />
                          <span className="text-rose-900 font-bold underline">Add Photo</span>
                        </>
                      )}
                    </span>
                  </span>

                  <ChevronDown className="w-3.5 h-3.5 text-rose-700/70 group-hover:text-rose-900 transition-transform shrink-0" />
                </button>
              </div>

              <button
                onClick={logout}
                className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1.5 rounded-md hover:bg-rose-50 transition-colors cursor-pointer hidden md:inline-block"
              >
                {t.nav.signOut}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-[#881337] rounded-xl transition-all cursor-pointer"
              >
                <span>{t.nav.signIn}</span>
              </button>

              <button
                onClick={() => {
                  if (user) {
                    setCurrentView('overview');
                  } else {
                    setIsAuthModalOpen(true);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold btn-3d-burgundy rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>{user ? 'Enter Health Console' : t.buildProfileCTA}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hidden File Input for Profile Photo Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleProfilePicUpload}
        className="hidden"
      />

      {/* 3D User Basic Details & Profile Picture Modal */}
      {profileModalOpen && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setProfileModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden z-10 card-3d-raised max-h-[92vh] flex flex-col">
            {/* Modal Top Burgundy Header */}
            <div className="bg-gradient-to-r from-[#4c0519] via-[#881337] to-[#9f1239] p-5 text-white flex items-center justify-between border-b border-rose-300/30 relative">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                  <User className="w-4 h-4 text-rose-200" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold tracking-tight">Patient Basic Details</h3>
                  <p className="text-[11px] text-rose-200 font-medium">Personal Health Record • HealthSphere AI</p>
                </div>
              </div>
              <button
                onClick={() => setProfileModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
              {/* Profile Picture Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-rose-50/70 to-white border border-rose-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* 3D Avatar with Camera Overlay */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative group cursor-pointer shrink-0"
                    title="Click to upload profile picture"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-[#9f1239] via-[#881337] to-[#4c0519] text-white flex items-center justify-center text-3xl font-extrabold ring-4 ring-rose-200 shadow-xl">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{user.name.charAt(0)}</span>
                      )}
                    </div>
                    {/* Hover Camera icon */}
                    <div className="absolute inset-0 bg-[#4c0519]/75 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 mb-0.5 text-rose-200" />
                      <span className="text-[9px] font-bold">Upload</span>
                    </div>
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 p-2 rounded-full btn-3d-burgundy shadow-md cursor-pointer ring-2 ring-white"
                      title="Upload photo"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Profile Photo Status & Upload CTAs */}
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <h4 className="text-base font-extrabold text-slate-900">{user.name}</h4>
                      {user.profilePicture ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Photo Set
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-900 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded-full animate-pulse">
                          <AlertTriangle className="w-3 h-3 text-rose-700" />
                          Photo Required
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>

                    <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 text-xs font-bold btn-3d-burgundy rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                      </button>

                      <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">or choose preset below</span>
                    </div>
                  </div>
                </div>

                {/* Preset 3D Avatars (Instant 1-Click Pick) */}
                <div className="mt-3.5 pt-3 border-t border-rose-100">
                  <p className="text-[11px] font-bold text-rose-900 uppercase tracking-wider mb-2">
                    Quick 3D Avatar Selection:
                  </p>
                  <div className="grid grid-cols-6 gap-2">
                    {avatarPresets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPresetAvatar(preset.url)}
                        className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer group ${
                          user.profilePicture === preset.url
                            ? 'border-[#881337] ring-2 ring-rose-400 scale-105'
                            : 'border-rose-200 hover:border-rose-400 opacity-80 hover:opacity-100'
                        }`}
                        title={preset.name}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                        {user.profilePicture === preset.url && (
                          <div className="absolute inset-0 bg-[#881337]/40 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* User Basic Details Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-rose-100">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-rose-900">
                    Essential Health & Identity Details
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingBasicDetails(!isEditingBasicDetails)}
                    className="text-xs font-semibold text-rose-800 hover:text-rose-950 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>{isEditingBasicDetails ? 'Cancel Edit' : 'Edit Details'}</span>
                  </button>
                </div>

                {isEditingBasicDetails ? (
                  /* Edit Form */
                  <div className="space-y-3 p-3.5 rounded-xl bg-rose-50/50 border border-rose-200">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-rose-200 rounded-lg focus:ring-2 focus:ring-[#881337] outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Date of Birth</label>
                        <input
                          type="date"
                          value={editDob}
                          onChange={(e) => setEditDob(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-rose-200 rounded-lg focus:ring-2 focus:ring-[#881337] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Gender</label>
                        <select
                          value={editGender}
                          onChange={(e) => setEditGender(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-rose-200 rounded-lg focus:ring-2 focus:ring-[#881337] outline-none"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Blood Group</label>
                        <input
                          type="text"
                          value={editBloodGroup}
                          onChange={(e) => setEditBloodGroup(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-rose-200 rounded-lg focus:ring-2 focus:ring-[#881337] outline-none"
                          placeholder="e.g. B Positive"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Emergency Contact</label>
                        <input
                          type="text"
                          value={editEmergency}
                          onChange={(e) => setEditEmergency(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-rose-200 rounded-lg focus:ring-2 focus:ring-[#881337] outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handleSaveBasicDetails}
                        disabled={isSavingDetails}
                        className="px-4 py-2 text-xs font-bold btn-3d-burgundy rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{isSavingDetails ? 'Saving...' : 'Save Details'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Display Cards Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-rose-100/90 shadow-2xs card-3d">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Full Name</span>
                      <span className="font-extrabold text-slate-900 text-sm">{user.name}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-rose-100/90 shadow-2xs card-3d">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Date of Birth & Age</span>
                      <span className="font-extrabold text-slate-900">
                        {user.dob || '1979-05-14'} <span className="text-rose-800 font-semibold text-xs">({calculateAge(user.dob)} yrs)</span>
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-rose-100/90 shadow-2xs card-3d">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Gender</span>
                      <span className="font-bold text-slate-900">{user.gender || 'Male'}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-rose-100/90 shadow-2xs card-3d">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Blood Group</span>
                      <span className="font-bold text-[#881337] bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-200 inline-block font-mono">
                        {user.bloodGroup || 'B Positive'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-rose-100/90 shadow-2xs card-3d">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">ABHA Health ID</span>
                      <span className="font-mono font-bold text-rose-950 text-[11px] block truncate">
                        {user.abhaId || '91-4521-8932-1104@abdm'}
                      </span>
                      <span className="text-[9px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        ABDM Verified
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-rose-100/90 shadow-2xs card-3d">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Emergency Contact</span>
                      <span className="font-bold text-slate-800 text-[11px] block truncate">
                        {user.emergencyContact || '+91 98490 12345 (Spouse)'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-rose-100/90 shadow-2xs card-3d sm:col-span-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Language Preference</span>
                        <span className="text-[10px] font-bold text-[#881337] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          {languages.find((l) => l.code === language)?.native || 'English'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {languages.map((l) => (
                          <button
                            key={l.code}
                            type="button"
                            onClick={() => {
                              setLanguage(l.code);
                              showToast(`Language set to ${l.label}`, 'info');
                            }}
                            className={`flex-1 py-1 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer text-center ${
                              language === l.code
                                ? 'btn-3d-burgundy shadow-xs'
                                : 'bg-rose-50/70 text-slate-700 hover:bg-rose-100 border border-rose-200/80'
                            }`}
                          >
                            {l.native}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Clinical Snapshot Tags */}
              <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">Key Health Attributes:</span>
                  <span className="text-[10px] text-rose-800 font-semibold">FHIR Condition Set</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 font-medium text-slate-700 text-[11px]">
                    Diagnosis: Type 2 Diabetes (E11.9)
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 font-medium text-slate-700 text-[11px]">
                    Diagnosis: Hyperlipidemia (E78.5)
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 font-bold text-emerald-800 text-[11px]">
                    Allergies: No Known Drug Allergies (NKDA)
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Action Footer */}
            <div className="p-4 bg-slate-50 border-t border-rose-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setProfileModalOpen(false);
                  setCurrentView('profile');
                }}
                className="px-4 py-2 text-xs font-bold btn-3d-burgundy rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Full Medical Record</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setProfileModalOpen(false);
                    logout();
                  }}
                  className="px-3 py-2 text-xs font-semibold text-rose-800 hover:bg-rose-100/60 rounded-xl transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-bold btn-3d-secondary rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
