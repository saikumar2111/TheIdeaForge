/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HealthProvider, useHealth } from './context/HealthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { AuthModal } from './components/AuthModal';
import { ReportSummaryModal } from './components/ReportSummaryModal';
import { LandingPage } from './components/views/LandingPage';
import { OverviewView } from './components/views/OverviewView';
import { UploadStudioView } from './components/views/UploadStudioView';
import { DocumentsView } from './components/views/DocumentsView';
import { HealthProfileView } from './components/views/HealthProfileView';
import { PrescriptionsView } from './components/views/PrescriptionsView';
import { LabReportsView } from './components/views/LabReportsView';
import { TimelineView } from './components/views/TimelineView';
import { CopilotChatView } from './components/views/CopilotChatView';
import { AbdmFhirView } from './components/views/AbdmFhirView';
import { SettingsView } from './components/views/SettingsView';
import { HealthBackgroundAnimation } from './components/HealthBackgroundAnimation';
import {
  Menu,
  Bell,
  Search,
  Sparkles,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Globe,
} from 'lucide-react';
import { LanguageCode } from './types/health';

const DashboardContent: React.FC = () => {
  const { currentView, setCurrentView, user, language, setLanguage, t } = useHealth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const renderActiveView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewView />;
      case 'upload':
        return <UploadStudioView />;
      case 'documents':
        return <DocumentsView />;
      case 'profile':
        return <HealthProfileView />;
      case 'prescriptions':
        return <PrescriptionsView />;
      case 'lab_reports':
        return <LabReportsView />;
      case 'timeline':
        return <TimelineView />;
      case 'copilot':
        return <CopilotChatView />;
      case 'abdm_fhir':
        return <AbdmFhirView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5F6] flex flex-col selection:bg-rose-200 selection:text-rose-950">
      {/* Top Main Navbar */}
      <Navbar />

      {/* Main Dashboard Workspace */}
      <div className="flex-1 flex w-full">
        {/* Collapsible Sidebar */}
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Dashboard Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Sub-Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-rose-200/80 gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-rose-50 md:hidden cursor-pointer"
                  title="Open Navigation"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#881337] bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider badge-3d-burgundy">
                      Patient Record Portal
                    </span>
                    <span className="text-xs text-rose-300 hidden sm:inline">•</span>
                    <span className="text-xs text-rose-900/70 font-medium hidden sm:inline flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-rose-600" />
                      {currentDateFormatted}
                    </span>
                  </div>
                  <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                    {user?.name || 'Personal Health Workspace'}
                  </h1>
                </div>
              </div>

              {/* Header Right Tools */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Search in dashboard */}
                <div className="relative hidden lg:block w-64">
                  <Search className="w-3.5 h-3.5 text-rose-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search records, medications..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#881337] text-slate-900 shadow-2xs"
                  />
                </div>

                {/* Notifications Bell */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotificationPopup(!showNotificationPopup)}
                    className="p-2 rounded-xl bg-white border border-rose-200 hover:bg-rose-50 text-slate-700 shadow-xs transition-colors cursor-pointer relative card-3d"
                    title="Health Notifications"
                  >
                    <Bell className="w-4 h-4 text-rose-900" />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-600 ring-2 ring-white animate-pulse" />
                  </button>

                  {showNotificationPopup && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-rose-200 p-4 z-50 animate-in fade-in card-3d">
                      <div className="flex items-center justify-between pb-2 border-b border-rose-100">
                        <span className="text-xs font-bold text-slate-900">Clinical Alerts (2)</span>
                        <span className="text-[10px] text-rose-800 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Active</span>
                      </div>
                      <div className="mt-3 space-y-2.5 text-xs">
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                          <p className="font-bold text-amber-950">HbA1c & Lipid Checkup Needed</p>
                          <p className="text-[11px] text-amber-800 mt-0.5">
                            Dr. Murthy recommended a 3-month review on 20-Jan-2026.
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                          <p className="font-bold text-rose-950">ABHA Linked Successfully</p>
                          <p className="text-[11px] text-rose-800 mt-0.5">
                            3 clinical documents synchronized with local repository.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active Sub-View */}
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <HealthProvider>
      <HealthBackgroundAnimation opacity={0.65} />
      <MainAppRouter />
      <AuthModal />
      <ReportSummaryModal />
      <ToastContainer />
    </HealthProvider>
  );
}

const MainAppRouter: React.FC = () => {
  const { currentView } = useHealth();

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-[#FAF5F6]">
        <Navbar />
        <LandingPage />
      </div>
    );
  }

  return <DashboardContent />;
};
