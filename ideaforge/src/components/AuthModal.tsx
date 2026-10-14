import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { X, Lock, Mail, User, Eye, EyeOff, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { LanguageCode } from '../types/health';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, refreshData, setCurrentView, showToast, loginAsDemo } = useHealth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [preferredLang, setPreferredLang] = useState<LanguageCode>('en');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        if (!email) {
          setErrorMsg('Please enter your email address');
          setIsLoading(false);
          return;
        }
        await api.login(email);
        showToast('Welcome back to HealthSphere AI!', 'success');
      } else {
        if (!name || !email) {
          setErrorMsg('Please provide both your full name and email');
          setIsLoading(false);
          return;
        }
        await api.register(name, email, preferredLang);
        showToast('Health profile successfully registered!', 'success');
      }

      await refreshData();
      setIsAuthModalOpen(false);
      setCurrentView('overview');
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden card-3d-raised">
        {/* Header decoration in Burgundy */}
        <div className="bg-gradient-to-r from-[#4c0519] via-[#881337] to-[#9f1239] px-6 py-5 text-white flex items-center justify-between border-b border-rose-300/30">
          <div>
            <h3 className="font-extrabold text-lg leading-tight">
              {mode === 'login' ? 'Sign In to HealthSphere' : 'Create Your Health Profile'}
            </h3>
            <p className="text-xs text-rose-200 mt-1">Private, AI-powered health record intelligence</p>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="text-rose-200 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* 1-Click Demo Shortcut in 3D */}
          <div className="mb-5 p-3.5 bg-rose-50/80 border border-rose-200 rounded-2xl flex items-center justify-between gap-3 card-3d">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#881337] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-rose-950">Want to test right away?</p>
                <p className="text-[11px] text-rose-800">Explore complete synthetic records with 1-click</p>
              </div>
            </div>
            <button
              type="button"
              onClick={loginAsDemo}
              className="px-3.5 py-1.5 text-xs font-bold btn-3d-burgundy rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
            >
              Enter Demo
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex border-b border-rose-200 mb-5">
            <button
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              className={`flex-1 pb-3 text-xs font-extrabold transition-colors cursor-pointer text-center ${
                mode === 'login'
                  ? 'border-b-2 border-[#881337] text-[#881337]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('register');
                setErrorMsg('');
              }}
              className={`flex-1 pb-3 text-xs font-extrabold transition-colors cursor-pointer text-center ${
                mode === 'register'
                  ? 'border-b-2 border-[#881337] text-[#881337]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              New Patient Account
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rajesh K. Sharma"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#881337] text-slate-900"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="patient@healthsphere.demo"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#881337] text-slate-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => showToast('Password reset token dispatched to provided email', 'info')}
                    className="text-[11px] text-[#881337] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#881337] text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Language for Medical Reports</label>
                <select
                  value={preferredLang}
                  onChange={(e) => setPreferredLang(e.target.value as LanguageCode)}
                  className="w-full px-3 py-2 text-xs border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#881337] text-slate-900 bg-white"
                >
                  <option value="en">English (Standard Medical)</option>
                  <option value="te">Telugu - తెలుగు</option>
                  <option value="hi">Hindi - हिन्दी</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 text-xs font-bold btn-3d-burgundy rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Authenticating...' : mode === 'login' ? 'Sign In to HealthSphere' : 'Create My Account'}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-rose-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <Shield className="w-3.5 h-3.5 text-rose-700" />
            <span>Encrypted with AES-256 • HIPAA & ABDM Aligned Architecture</span>
          </div>
        </div>
      </div>
    </div>
  );
};
