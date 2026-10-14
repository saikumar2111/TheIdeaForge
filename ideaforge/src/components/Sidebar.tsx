import React from 'react';
import { useHealth } from '../context/HealthContext';
import {
  LayoutDashboard,
  User,
  UploadCloud,
  FileText,
  Pill,
  FlaskConical,
  Clock,
  Sparkles,
  ShieldCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { currentView, setCurrentView, t } = useHealth();

  const navItems = [
    { id: 'overview', label: t.nav.overview, icon: LayoutDashboard },
    { id: 'profile', label: t.nav.profile, icon: User },
    { id: 'upload', label: t.nav.upload, icon: UploadCloud, highlight: true },
    { id: 'documents', label: t.nav.documents, icon: FileText },
    { id: 'prescriptions', label: t.nav.prescriptions, icon: Pill },
    { id: 'lab_reports', label: t.nav.labReports, icon: FlaskConical },
    { id: 'timeline', label: t.nav.timeline, icon: Clock },
    { id: 'copilot', label: t.nav.copilot, icon: Sparkles, badge: 'AI' },
    { id: 'abdm_fhir', label: t.nav.abdmFhir, icon: ShieldCheck },
    { id: 'settings', label: t.nav.settings, icon: Settings },
  ];

  const handleNavClick = (id: string) => {
    setCurrentView(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 md:top-18 z-40 h-[100dvh] md:h-[calc(100vh-4.5rem)] bg-white/95 border-r border-rose-200/80 transition-all duration-300 flex flex-col justify-between shrink-0 select-none shadow-[4px_0_20px_-4px_rgba(76,5,25,0.04)] ${
          collapsed ? 'w-18' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Navigation list */}
        <div className="p-3 space-y-1.5 overflow-y-auto flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer group relative ${
                  isActive
                    ? 'bg-rose-50/90 text-rose-950 font-bold border border-rose-200 shadow-2xs'
                    : 'text-slate-600 hover:bg-rose-50/50 hover:text-rose-900'
                } ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                    isActive ? 'text-[#881337]' : 'text-slate-400 group-hover:text-rose-700'
                  }`}
                />

                {!collapsed && <span className="truncate flex-1 text-left">{item.label}</span>}

                {!collapsed && item.badge && (
                  <span className="bg-gradient-to-r from-rose-700 to-[#881337] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer / Sidebar Collapse Toggle */}
        <div className="p-3 border-t border-rose-100 bg-rose-50/40 shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex items-center justify-center w-full py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white border border-rose-200/60 shadow-2xs transition-all cursor-pointer text-xs font-semibold gap-1.5"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-[#881337]" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 text-[#881337]" />
                <span>Collapse Navigation</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
