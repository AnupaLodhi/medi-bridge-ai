export interface ParsedMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  purpose: string;
  instructions: string;
}

export interface PrescriptionAnalysis {
  id: string;
  rawText: string;
  medicines: ParsedMedicine[];
  confidence: number;
  safetyAlerts: SafetyAlert[];
  simplifiedExplanation: string;
  createdAt: string;
}

export interface SafetyAlert {
  type: 'missing_dosage' | 'unclear_handwriting' | 'medicine_confusion' | 'drug_interaction';
  severity: 'low' | 'medium' | 'high';
  message: string;
  confidence: number;
}

export interface DigitalPrescription {
  id: string;
  qrCode: string;
  patientName: string;
  patientAge: number;
  doctorName: string;
  doctorLicense: string;
  medicines: PrescriptionMedicine[];
  notes: string;
  voiceInstructions?: string;
  validUntil: string;
  createdAt: string;
}

export interface PrescriptionMedicine {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  commonDosages: string[];
}

export interface VoiceMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  language: string;
  timestamp: string;
}

export interface PharmacyQueueItem {
  id: string;
  patientName: string;
  prescriptionId: string;
  medicines: ParsedMedicine[];
  status: 'pending' | 'verified' | 'dispensed';
  receivedAt: string;
  confidence: number;
}

export interface HealthRecord {
  id: string;
  type: 'prescription' | 'lab' | 'visit';
  title: string;
  date: string;
  provider: string;
  summary: string;
}

export interface MedicationReminder {
  id: string;
  medicineName: string;
  dosage: string;
  time: string;
  frequency: string;
  enabled: boolean;
}

export type PortalType = 'patient' | 'doctor' | 'pharmacy';

export type SupportedLanguage =
  | 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'mr' | 'bn' | 'ml' | 'gu' | 'pa';

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  hi: 'Hindi',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  mr: 'Marathi',
  bn: 'Bengali',
  ml: 'Malayalam',
  gu: 'Gujarati',
  pa: 'Punjabi',
};
