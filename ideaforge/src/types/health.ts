export type LanguageCode = 'en' | 'te' | 'hi';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  preferredLanguage: LanguageCode;
  abhaId?: string;
  abhaStatus?: 'unlinked' | 'linked' | 'verified';
  emergencyContact?: string;
  profilePicture?: string;
}

export interface MedicalObservation {
  id: string;
  userId: string;
  documentId: string;
  testName: string;
  value: string;
  numericValue?: number;
  unit: string;
  referenceRange: string;
  interpretationStatus: 'normal' | 'borderline' | 'abnormal' | 'critical' | 'indeterminate';
  observationDate: string;
  sourceLocation: string;
  verificationStatus: 'unverified' | 'user_confirmed' | 'clinician_verified';
}

export interface Medication {
  id: string;
  userId: string;
  documentId: string;
  medicationName: string;
  strength: string;
  dosage: string;
  route: string;
  frequency: string;
  duration: string;
  recordedStatus: 'active' | 'completed' | 'discontinued' | 'unknown';
  prescribingClinician?: string;
  instructions: string;
  verificationStatus: 'unverified' | 'user_confirmed';
  prescriptionDate: string;
}

export interface ClinicalRecord {
  id: string;
  userId: string;
  documentId: string;
  recordType: 'diagnosis' | 'procedure' | 'discharge' | 'allergy' | 'encounter';
  title: string;
  description: string;
  recordedDate: string;
  sourceLocation: string;
  verificationStatus: 'unverified' | 'user_confirmed';
}

export interface AbnormalValueItem {
  name: string;
  value: string;
  range: string;
  context: string;
}

export interface SourceReferenceItem {
  documentTitle: string;
  section: string;
  pageOrLine?: string;
}

export interface AISummary {
  id: string;
  userId: string;
  documentId: string;
  simpleSummary: string;
  importantFindings: string[];
  abnormalValues: AbnormalValueItem[];
  whatThisMayMean: string;
  questionsToAskDoctor: string[];
  recommendedNextStep: string;
  sourceReferences: SourceReferenceItem[];
  summaryLanguage: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  userId: string;
  documentId: string;
  eventType: 'lab_report' | 'prescription' | 'discharge' | 'consultation' | 'diagnostic_imaging' | 'certificate';
  eventDate: string;
  title: string;
  summary: string;
  relevantFindings: string[];
  severity: 'normal' | 'attention' | 'critical' | 'neutral';
  documentTitle: string;
}

export interface MedicalDocument {
  id: string;
  userId: string;
  documentType: 'prescription' | 'lab_report' | 'discharge_summary' | 'diagnostic_report' | 'medical_certificate' | 'other';
  title: string;
  originalFilename: string;
  mimeType: string;
  fileSize: number;
  documentDate: string;
  hospitalOrLabName?: string;
  doctorName?: string;
  patientName?: string;
  processingStatus: 'pending' | 'processing' | 'processed' | 'failed';
  confidenceScore: number;
  rawExtractedText: string;
  previewDataUrl?: string;
  createdAt: string;
  summaryId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: string;
  citations?: Array<{
    documentTitle: string;
    section: string;
    finding: string;
  }>;
  suggestedFollowUps?: string[];
}
