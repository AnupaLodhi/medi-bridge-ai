import { v4 as uuidv4 } from 'uuid';
import type { Request, Response } from 'express';
import { parsePrescription, generateSimplifiedExplanation, analyzeSafety } from '../services/prescriptionParser.js';
import { getVoiceResponse } from '../services/voiceAssistant.js';

const prescriptions: Map<string, Record<string, unknown>> = new Map();
const prescriptionHistory: Record<string, unknown>[] = [];

const MEDICINES = [
  { id: '1', name: 'Amoxicillin 500mg', genericName: 'Amoxicillin', category: 'Antibiotic', commonDosages: ['250mg', '500mg', '875mg'] },
  { id: '2', name: 'Paracetamol 650mg', genericName: 'Acetaminophen', category: 'Analgesic', commonDosages: ['500mg', '650mg'] },
  { id: '3', name: 'Omeprazole 20mg', genericName: 'Omeprazole', category: 'Antacid', commonDosages: ['10mg', '20mg', '40mg'] },
  { id: '4', name: 'Metformin 500mg', genericName: 'Metformin HCl', category: 'Antidiabetic', commonDosages: ['500mg', '850mg', '1000mg'] },
  { id: '5', name: 'Azithromycin 500mg', genericName: 'Azithromycin', category: 'Antibiotic', commonDosages: ['250mg', '500mg'] },
  { id: '6', name: 'Cetirizine 10mg', genericName: 'Cetirizine', category: 'Antihistamine', commonDosages: ['5mg', '10mg'] },
  { id: '7', name: 'Ibuprofen 400mg', genericName: 'Ibuprofen', category: 'NSAID', commonDosages: ['200mg', '400mg', '600mg'] },
  { id: '8', name: 'Atorvastatin 10mg', genericName: 'Atorvastatin', category: 'Statin', commonDosages: ['10mg', '20mg', '40mg'] },
  { id: '9', name: 'Amlodipine 5mg', genericName: 'Amlodipine', category: 'Antihypertensive', commonDosages: ['2.5mg', '5mg', '10mg'] },
  { id: '10', name: 'Pantoprazole 40mg', genericName: 'Pantoprazole', category: 'Antacid', commonDosages: ['20mg', '40mg'] },
];

const pharmacyQueue = [
  {
    id: 'q1',
    patientName: 'Rajesh Kumar',
    prescriptionId: 'rx-001',
    medicines: [{ name: 'Amoxicillin 500mg', dosage: '1 tablet twice daily', frequency: 'BD', duration: '5 days', purpose: 'Antibiotic', instructions: 'After food' }],
    status: 'pending' as const,
    receivedAt: new Date(Date.now() - 3600000).toISOString(),
    confidence: 92,
  },
  {
    id: 'q2',
    patientName: 'Priya Sharma',
    prescriptionId: 'rx-002',
    medicines: [
      { name: 'Metformin 500mg', dosage: '1 tablet twice daily', frequency: 'BD', duration: '30 days', purpose: 'Diabetes', instructions: 'With meals' },
      { name: 'Atorvastatin 10mg', dosage: '1 tablet at bedtime', frequency: 'HS', duration: '30 days', purpose: 'Cholesterol', instructions: 'At night' },
    ],
    status: 'pending' as const,
    receivedAt: new Date(Date.now() - 7200000).toISOString(),
    confidence: 88,
  },
  {
    id: 'q3',
    patientName: 'Mohammed Ali',
    prescriptionId: 'rx-003',
    medicines: [{ name: 'Paracetamol 650mg', dosage: '1 tablet as needed', frequency: 'SOS', duration: '3 days', purpose: 'Pain relief', instructions: 'Max 4 per day' }],
    status: 'verified' as const,
    receivedAt: new Date(Date.now() - 14400000).toISOString(),
    confidence: 95,
  },
];

export function analyzePrescription(req: Request, res: Response) {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Prescription text is required' });

  const { medicines, confidence, safetyAlerts } = parsePrescription(text);
  const analysis = {
    id: uuidv4(),
    rawText: text,
    medicines,
    confidence,
    safetyAlerts,
    simplifiedExplanation: generateSimplifiedExplanation(medicines),
    createdAt: new Date().toISOString(),
  };

  prescriptionHistory.unshift(analysis);
  res.json(analysis);
}

export function getHistory(_req: Request, res: Response) {
  res.json(prescriptionHistory);
}

export function createDigitalPrescription(req: Request, res: Response) {
  const data = req.body;
  const id = uuidv4();
  const qrCode = `MB-${id.slice(0, 8).toUpperCase()}`;

  const prescription = {
    id,
    qrCode,
    ...data,
    createdAt: new Date().toISOString(),
  };

  prescriptions.set(qrCode, prescription);
  res.json(prescription);
}

export function getPrescriptionByQR(req: Request, res: Response) {
  const rx = prescriptions.get(req.params.qrCode);
  if (!rx) return res.status(404).json({ message: 'Prescription not found' });
  res.json(rx);
}

export function searchMedicines(req: Request, res: Response) {
  const q = (req.query.q as string || '').toLowerCase();
  const results = MEDICINES.filter(m =>
    m.name.toLowerCase().includes(q) || m.genericName.toLowerCase().includes(q)
  );
  res.json(results);
}

export function getPharmacyQueue(_req: Request, res: Response) {
  res.json(pharmacyQueue);
}

export function verifyPrescription(req: Request, res: Response) {
  const item = pharmacyQueue.find(q => q.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Queue item not found' });
  item.status = 'verified';
  res.json(item);
}

export function getGenericAlternatives(req: Request, res: Response) {
  const name = req.params.name;
  const med = MEDICINES.find(m => m.name.toLowerCase().includes(name.toLowerCase()));
  if (!med) return res.json({ original: name, generics: [], savings: '0%' });

  const generics = MEDICINES.filter(m =>
    m.category === med.category && m.id !== med.id
  ).slice(0, 3);

  res.json({ original: med.name, generics, savings: '35-60%' });
}

export function voiceChat(req: Request, res: Response) {
  const { message, language } = req.body;
  if (!message) return res.status(400).json({ message: 'Message is required' });

  const { content, language: responseLang } = getVoiceResponse(message, language || 'en');

  res.json({
    id: uuidv4(),
    role: 'assistant',
    content,
    language: responseLang,
    timestamp: new Date().toISOString(),
  });
}

export function safetyAnalyze(req: Request, res: Response) {
  const { medicines } = req.body;
  const result = analyzeSafety(medicines || []);
  res.json(result);
}
