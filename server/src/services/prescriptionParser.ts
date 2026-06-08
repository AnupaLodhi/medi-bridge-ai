interface ParsedMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  purpose: string;
  instructions: string;
}

interface SafetyAlert {
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  confidence: number;
}

const MEDICINE_DB: Record<string, { purpose: string; category: string }> = {
  amoxicillin: { purpose: 'Treats bacterial infections', category: 'Antibiotic' },
  paracetamol: { purpose: 'Relieves pain and reduces fever', category: 'Analgesic' },
  omeprazole: { purpose: 'Reduces stomach acid production', category: 'Antacid' },
  metformin: { purpose: 'Controls blood sugar in type 2 diabetes', category: 'Antidiabetic' },
  azithromycin: { purpose: 'Treats bacterial infections', category: 'Antibiotic' },
  cetirizine: { purpose: 'Relieves allergy symptoms', category: 'Antihistamine' },
  ibuprofen: { purpose: 'Reduces pain, fever, and inflammation', category: 'NSAID' },
  atorvastatin: { purpose: 'Lowers cholesterol levels', category: 'Statin' },
  amlodipine: { purpose: 'Treats high blood pressure', category: 'Calcium Channel Blocker' },
  pantoprazole: { purpose: 'Reduces stomach acid production', category: 'Antacid' },
};

const FREQUENCY_MAP: Record<string, string> = {
  od: 'Once daily',
  bd: 'Twice daily (morning and evening)',
  tds: 'Three times daily',
  qid: 'Four times daily',
  hs: 'At bedtime',
  sos: 'As needed',
  stat: 'Immediately',
};

function parseFrequency(text: string): string {
  const lower = text.toLowerCase();
  for (const [abbr, full] of Object.entries(FREQUENCY_MAP)) {
    if (new RegExp(`\\b${abbr}\\b`, 'i').test(lower)) return full;
  }
  return 'As directed by doctor';
}

function parseDuration(text: string): string {
  const match = text.match(/(?:x|for)\s*(\d+)\s*(days?|weeks?|months?)/i);
  if (match) return `${match[1]} ${match[2]}`;
  return 'As directed';
}

function parseDosage(text: string): string {
  const formMatch = text.match(/\b(tab|cap|syr|inj|susp|oint)\.?\s*/i);
  const mgMatch = text.match(/(\d+(?:\.\d+)?)\s*mg/i);
  const form = formMatch ? formMatch[1].charAt(0).toUpperCase() + formMatch[1].slice(1).toLowerCase() : 'Dose';
  const mg = mgMatch ? ` ${mgMatch[1]}mg` : '';
  const freq = parseFrequency(text);
  if (form.toLowerCase() === 'tab') return `1 tablet${mg}, ${freq.toLowerCase()}`;
  if (form.toLowerCase() === 'cap') return `1 capsule${mg}, ${freq.toLowerCase()}`;
  return `${form}${mg}, ${freq.toLowerCase()}`;
}

function extractMedicineName(text: string): string {
  const cleaned = text.replace(/\b(tab|cap|syr|inj|susp|oint)\.?\s*/gi, '');
  const nameMatch = cleaned.match(/([A-Za-z]+(?:\s+\d+(?:\.\d+)?\s*mg)?)/i);
  if (nameMatch) {
    const name = nameMatch[1].trim();
    const mgMatch = text.match(/(\d+(?:\.\d+)?)\s*mg/i);
    return mgMatch ? `${name.split(/\d/)[0].trim()} ${mgMatch[1]}mg` : name;
  }
  return text.trim();
}

export function parsePrescription(rawText: string): { medicines: ParsedMedicine[]; confidence: number; safetyAlerts: SafetyAlert[] } {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  const medicines: ParsedMedicine[] = [];
  const safetyAlerts: SafetyAlert[] = [];

  for (const line of lines) {
    const name = extractMedicineName(line);
    const key = name.toLowerCase().split(/\s+/)[0];
    const info = MEDICINE_DB[key] || { purpose: 'As prescribed by your doctor', category: 'General' };
    const frequency = parseFrequency(line);
    const duration = parseDuration(line);
    const dosage = parseDosage(line);

    medicines.push({
      name,
      dosage,
      frequency,
      duration,
      purpose: info.purpose,
      instructions: `Take ${name} ${frequency.toLowerCase()} for ${duration}. ${info.purpose}.`,
    });

    if (!line.match(/\d+\s*mg/i)) {
      safetyAlerts.push({
        type: 'missing_dosage',
        severity: 'medium',
        message: `Dosage amount not clearly specified for ${name}. Please verify with the prescribing doctor.`,
        confidence: 72,
      });
    }
  }

  if (rawText.match(/[a-z]{3,}/i) && rawText.match(/[^\w\s.]/)) {
    safetyAlerts.push({
      type: 'unclear_handwriting',
      severity: 'low',
      message: 'Some characters in the prescription may be unclear. AI interpretation confidence may be reduced.',
      confidence: 68,
    });
  }

  const confidence = Math.min(96, 85 + medicines.length * 3 - safetyAlerts.length * 5);

  return { medicines, confidence, safetyAlerts };
}

export function generateSimplifiedExplanation(medicines: ParsedMedicine[]): string {
  if (medicines.length === 0) return 'No medicines detected in the prescription.';
  const parts = medicines.map(m =>
    `Your doctor has prescribed ${m.name} to ${m.purpose.toLowerCase()}. Take it ${m.frequency.toLowerCase()} for ${m.duration}.`
  );
  return parts.join(' ');
}

export function analyzeSafety(medicineNames: string[]): { alerts: SafetyAlert[]; overallConfidence: number } {
  const alerts: SafetyAlert[] = [];
  const names = medicineNames.map(n => n.toLowerCase());

  if (names.some(n => n.includes('amoxicillin')) && names.some(n => n.includes('azithromycin'))) {
    alerts.push({
      type: 'drug_interaction',
      severity: 'high',
      message: 'Both Amoxicillin and Azithromycin are antibiotics. Taking two antibiotics simultaneously may not be necessary and could increase side effects.',
      confidence: 88,
    });
  }

  if (names.some(n => n.includes('ibuprofen')) && names.some(n => n.includes('omeprazole'))) {
    alerts.push({
      type: 'drug_interaction',
      severity: 'low',
      message: 'Ibuprofen may cause stomach irritation. Omeprazole is often co-prescribed to protect the stomach lining.',
      confidence: 91,
    });
  }

  const similarPairs = [
    ['amlodipine', 'amlodipin'],
    ['metformin', 'metformine'],
  ];
  for (const [a, b] of similarPairs) {
    if (names.some(n => n.includes(a)) && names.some(n => n.includes(b))) {
      alerts.push({
        type: 'medicine_confusion',
        severity: 'high',
        message: `Possible medicine name confusion detected between similar-sounding medications.`,
        confidence: 76,
      });
    }
  }

  const overallConfidence = Math.max(60, 95 - alerts.length * 10);
  return { alerts, overallConfidence };
}
