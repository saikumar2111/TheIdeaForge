import {
  MedicalDocument,
  UserProfile,
  MedicalObservation,
  Medication,
  ClinicalRecord,
  TimelineEvent,
  AISummary,
  ChatMessage,
  LanguageCode,
} from '../types/health';

export interface HealthProfileResponse {
  profile: UserProfile;
  summaryStats: {
    totalDocuments: number;
    activeMedications: number;
    totalObservations: number;
    abnormalObservations: number;
    timelineEventsCount: number;
  };
  observations: MedicalObservation[];
  medications: Medication[];
  clinicalRecords: ClinicalRecord[];
}

export const api = {
  // Auth
  async login(email: string): Promise<{ user: UserProfile; token: string }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  async register(name: string, email: string, preferredLanguage?: LanguageCode): Promise<{ user: UserProfile; token: string }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, preferredLanguage }),
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  async getMe(): Promise<{ user: UserProfile }> {
    const res = await fetch('/api/auth/me');
    if (!res.ok) throw new Error('Failed to get session');
    return res.json();
  },

  async logout(): Promise<void> {
    await fetch('/api/auth/logout', { method: 'POST' });
  },

  // Documents
  async getDocuments(): Promise<{ documents: MedicalDocument[] }> {
    const res = await fetch('/api/documents');
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json();
  },

  async getDocument(id: string): Promise<{
    document: MedicalDocument;
    summary: AISummary | null;
    observations: MedicalObservation[];
    medications: Medication[];
    clinicalRecords: ClinicalRecord[];
  }> {
    const res = await fetch(`/api/documents/${id}`);
    if (!res.ok) throw new Error('Failed to fetch document');
    return res.json();
  },

  async deleteDocument(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete document');
    return res.json();
  },

  async uploadDocument(payload: {
    originalFilename: string;
    mimeType?: string;
    fileSize?: number;
    documentType?: string;
    rawText?: string;
    base64Data?: string;
    documentDate?: string;
    hospitalOrLabName?: string;
    doctorName?: string;
  }): Promise<{
    document: MedicalDocument;
    summary: AISummary;
    observations: MedicalObservation[];
    medications: Medication[];
    clinicalRecords: ClinicalRecord[];
    timelineEvent: TimelineEvent;
  }> {
    const res = await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Document processing failed');
    }
    return res.json();
  },

  async updateExtraction(id: string, payload: any): Promise<{ success: boolean; document: MedicalDocument }> {
    const res = await fetch(`/api/documents/${id}/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update extraction');
    return res.json();
  },

  // AI Summarize
  async summarizeDocument(id: string, language: LanguageCode): Promise<{ summary: AISummary }> {
    const res = await fetch(`/api/documents/${id}/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language }),
    });
    if (!res.ok) throw new Error('Failed to summarize document');
    return res.json();
  },

  // Copilot Chat
  async sendChatMessage(message: string, language: LanguageCode): Promise<{ message: ChatMessage; chatHistory: ChatMessage[] }> {
    const res = await fetch('/api/copilot/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language }),
    });
    if (!res.ok) throw new Error('Chat failed');
    return res.json();
  },

  async getChatHistory(): Promise<{ messages: ChatMessage[] }> {
    const res = await fetch('/api/copilot/history');
    if (!res.ok) throw new Error('Failed to get history');
    return res.json();
  },

  async clearChatHistory(): Promise<void> {
    await fetch('/api/copilot/clear', { method: 'POST' });
  },

  // Health Profile
  async getHealthProfile(): Promise<HealthProfileResponse> {
    const res = await fetch('/api/health-profile');
    if (!res.ok) throw new Error('Failed to get profile');
    return res.json();
  },

  async updateHealthProfile(updates: Partial<UserProfile>): Promise<{ profile: UserProfile }> {
    const res = await fetch('/api/health-profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // Timeline
  async getTimeline(sort: 'asc' | 'desc' = 'desc', type?: string): Promise<{ events: TimelineEvent[] }> {
    const q = new URLSearchParams();
    if (sort) q.set('sort', sort);
    if (type && type !== 'all') q.set('type', type);
    const res = await fetch(`/api/timeline?${q.toString()}`);
    if (!res.ok) throw new Error('Failed to get timeline');
    return res.json();
  },

  // FHIR / ABDM Interop
  async getFhirMetadata(): Promise<any> {
    const res = await fetch('/api/interop/fhir/metadata');
    if (!res.ok) throw new Error('Failed to get FHIR capability statement');
    return res.json();
  },

  async exportFhirBundle(): Promise<any> {
    const res = await fetch('/api/interop/fhir/export', { method: 'POST' });
    if (!res.ok) throw new Error('Failed to export FHIR bundle');
    return res.json();
  },

  async linkMockAbha(abhaAddress?: string): Promise<{ success: boolean; message: string; abhaId: string; profile: UserProfile }> {
    const res = await fetch('/api/interop/abha/mock-import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ abhaAddress }),
    });
    if (!res.ok) throw new Error('Failed to link ABHA ID');
    return res.json();
  },

  async resetDemo(): Promise<void> {
    await fetch('/api/demo/reset', { method: 'POST' });
  },
};
