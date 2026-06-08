import type {
  PrescriptionAnalysis,
  DigitalPrescription,
  VoiceMessage,
  PharmacyQueueItem,
  Medicine,
  SupportedLanguage,
} from '../types';

const API_BASE = '/api';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }
  return res.json();
}

export const api = {
  analyzePrescription: (text: string, imageBase64?: string) =>
    fetchJSON<PrescriptionAnalysis>('/prescriptions/analyze', {
      method: 'POST',
      body: JSON.stringify({ text, imageBase64 }),
    }),

  getPrescriptionHistory: () =>
    fetchJSON<PrescriptionAnalysis[]>('/prescriptions/history'),

  createDigitalPrescription: (data: Omit<DigitalPrescription, 'id' | 'qrCode' | 'createdAt'>) =>
    fetchJSON<DigitalPrescription>('/prescriptions/digital', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getPrescriptionByQR: (qrCode: string) =>
    fetchJSON<DigitalPrescription>(`/prescriptions/qr/${qrCode}`),

  searchMedicines: (query: string) =>
    fetchJSON<Medicine[]>(`/medicines/search?q=${encodeURIComponent(query)}`),

  getPharmacyQueue: () =>
    fetchJSON<PharmacyQueueItem[]>('/pharmacy/queue'),

  verifyPrescription: (id: string) =>
    fetchJSON<PharmacyQueueItem>(`/pharmacy/verify/${id}`, { method: 'POST' }),

  getGenericAlternatives: (medicineName: string) =>
    fetchJSON<{ original: string; generics: Medicine[]; savings: string }>(
      `/pharmacy/generics/${encodeURIComponent(medicineName)}`
    ),

  sendVoiceMessage: (message: string, language: SupportedLanguage, history: VoiceMessage[]) =>
    fetchJSON<VoiceMessage>('/voice/chat', {
      method: 'POST',
      body: JSON.stringify({ message, language, history }),
    }),

  getSafetyAnalysis: (medicines: string[]) =>
    fetchJSON<{ alerts: import('../types').SafetyAlert[]; overallConfidence: number }>(
      '/safety/analyze',
      { method: 'POST', body: JSON.stringify({ medicines }) }
    ),
};
