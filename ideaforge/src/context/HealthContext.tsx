import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, LanguageCode, MedicalDocument, AISummary } from '../types/health';
import { api, HealthProfileResponse } from '../services/api';
import { translations, Translations } from '../i18n/translations';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface HealthContextType {
  user: UserProfile | null;
  loading: boolean;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  currentView: string;
  setCurrentView: (view: string) => void;
  profileData: HealthProfileResponse | null;
  refreshData: () => Promise<void>;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  activeSummaryDoc: MedicalDocument | null;
  setActiveSummaryDoc: (doc: MedicalDocument | null) => void;
  activeSummary: AISummary | null;
  setActiveSummary: (summary: AISummary | null) => void;
  isSummaryModalOpen: boolean;
  setIsSummaryModalOpen: (open: boolean) => void;
  openSummaryForDoc: (doc: MedicalDocument) => Promise<void>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isDemoMode: boolean;
  setIsDemoMode: (demo: boolean) => void;
  loginAsDemo: () => Promise<void>;
  logout: () => Promise<void>;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [currentView, setCurrentView] = useState<string>('landing');
  const [profileData, setProfileData] = useState<HealthProfileResponse | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeSummaryDoc, setActiveSummaryDoc] = useState<MedicalDocument | null>(null);
  const [activeSummary, setActiveSummary] = useState<AISummary | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (user) {
      api.updateHealthProfile({ preferredLanguage: lang }).catch(() => {});
    }
  };

  const refreshData = async () => {
    try {
      const data = await api.getHealthProfile();
      setProfileData(data);
      if (data.profile) {
        setUser(data.profile);
        if (data.profile.preferredLanguage) {
          setLanguageState(data.profile.preferredLanguage);
        }
      }
    } catch (err) {
      console.error('Failed to load health profile:', err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        await refreshData();
      } catch (err) {
        console.error('Init error:', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const openSummaryForDoc = async (doc: MedicalDocument) => {
    setActiveSummaryDoc(doc);
    setIsSummaryModalOpen(true);
    try {
      const fullDoc = await api.getDocument(doc.id);
      if (fullDoc.summary) {
        setActiveSummary(fullDoc.summary);
      } else {
        const generated = await api.summarizeDocument(doc.id, language);
        setActiveSummary(generated.summary);
      }
    } catch (err) {
      console.error('Error opening report summary:', err);
      showToast('Could not load report summary', 'error');
    }
  };

  const loginAsDemo = async () => {
    try {
      const res = await api.login('rajesh.sharma@healthsphere.demo');
      setUser(res.user);
      setIsDemoMode(true);
      setIsAuthModalOpen(false);
      setCurrentView('overview');
      await refreshData();
      showToast('Logged into Dr. Sarah Jenkins synthetic health profile', 'info');
    } catch (err) {
      showToast('Demo login failed', 'error');
    }
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    setCurrentView('landing');
    showToast('Signed out safely', 'info');
  };

  const t = translations[language] || translations.en;

  return (
    <HealthContext.Provider
      value={{
        user,
        loading,
        language,
        setLanguage,
        t,
        currentView,
        setCurrentView,
        profileData,
        refreshData,
        toasts,
        showToast,
        removeToast,
        activeSummaryDoc,
        setActiveSummaryDoc,
        activeSummary,
        setActiveSummary,
        isSummaryModalOpen,
        setIsSummaryModalOpen,
        openSummaryForDoc,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isDemoMode,
        setIsDemoMode,
        loginAsDemo,
        logout,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
