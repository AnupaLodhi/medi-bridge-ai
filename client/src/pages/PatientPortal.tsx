import { useState, useRef } from 'react';
import { PageHeader, Card, Button, StatCard, EmptyState } from '../components/Layout';
import PrescriptionResult from '../components/PrescriptionResult';
import { api } from '../services/api';
import { useAccessibility } from '../context/AccessibilityContext';
import type { PrescriptionAnalysis, MedicationReminder, HealthRecord } from '../types';
import {
  Upload, Camera, History, Bell, FileHeart, ScanLine,
  Pill, Clock, Loader2, AlertCircle,
} from 'lucide-react';

const mockReminders: MedicationReminder[] = [
  { id: '1', medicineName: 'Amoxicillin 500mg', dosage: '1 tablet', time: '08:00 AM', frequency: 'Twice daily', enabled: true },
  { id: '2', medicineName: 'Amoxicillin 500mg', dosage: '1 tablet', time: '08:00 PM', frequency: 'Twice daily', enabled: true },
  { id: '3', medicineName: 'Paracetamol 650mg', dosage: '1 tablet', time: '02:00 PM', frequency: 'As needed', enabled: false },
];

const mockRecords: HealthRecord[] = [
  { id: '1', type: 'prescription', title: 'Amoxicillin Prescription', date: '2026-06-01', provider: 'Dr. Sharma', summary: 'Antibiotic course for respiratory infection' },
  { id: '2', type: 'visit', title: 'General Checkup', date: '2026-05-15', provider: 'Dr. Patel', summary: 'Routine health assessment, vitals normal' },
  { id: '3', type: 'lab', title: 'Blood Test Results', date: '2026-05-10', provider: 'City Lab', summary: 'CBC within normal range' },
];

type Tab = 'scan' | 'history' | 'reminders' | 'records';

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState<Tab>('scan');
  const [prescriptionText, setPrescriptionText] = useState('Tab Amoxicillin 500mg BD x 5 Days');
  const [analysis, setAnalysis] = useState<PrescriptionAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<PrescriptionAnalysis[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { simplifiedLanguage } = useAccessibility();

  const handleAnalyze = async (text?: string) => {
    setLoading(true);
    setError('');
    try {
      const result = await api.analyzePrescription(text || prescriptionText);
      setAnalysis(result);
      setHistory((prev) => [result, ...prev]);
    } catch {
      setError('Failed to analyze prescription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrescriptionText(`[Uploaded: ${file.name}] Tab Amoxicillin 500mg BD x 5 Days\nCap Omeprazole 20mg OD x 14 Days`);
      handleAnalyze(`Tab Amoxicillin 500mg BD x 5 Days\nCap Omeprazole 20mg OD x 14 Days`);
    }
  };

  const handleCameraScan = () => {
    setPrescriptionText('Tab Amoxicillin 500mg BD x 5 Days');
    handleAnalyze();
  };

  const tabs = [
    { id: 'scan' as Tab, label: 'Scan Prescription', icon: <ScanLine className="w-4 h-4" /> },
    { id: 'history' as Tab, label: 'History', icon: <History className="w-4 h-4" /> },
    { id: 'reminders' as Tab, label: 'Reminders', icon: <Bell className="w-4 h-4" /> },
    { id: 'records' as Tab, label: 'Health Records', icon: <FileHeart className="w-4 h-4" /> },
  ];

  return (
    <>
      <PageHeader
        title="Patient Portal"
        subtitle="Upload or scan your prescription to understand your medications clearly."
        badge="Patient"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Active Prescriptions" value={history.length || 1} icon={<Pill className="w-5 h-5" />} />
          <StatCard label="Reminders Set" value={2} icon={<Bell className="w-5 h-5" />} />
          <StatCard label="Health Records" value={3} icon={<FileHeart className="w-5 h-5" />} />
          <StatCard label="Next Reminder" value="8:00 AM" icon={<Clock className="w-5 h-5" />} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-gray-200 mb-6 pb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-navy text-navy'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'scan' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card>
                <h3 className="font-semibold text-navy mb-4">Upload or Scan Prescription</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-navy hover:bg-accent/30 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-navy" />
                    <span className="text-sm font-medium text-navy">Upload Image</span>
                    <span className="text-xs text-gray-500">PNG, JPG, PDF</span>
                  </button>
                  <button
                    onClick={handleCameraScan}
                    className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-navy hover:bg-accent/30 transition-colors"
                  >
                    <Camera className="w-8 h-8 text-navy" />
                    <span className="text-sm font-medium text-navy">Use Camera</span>
                    <span className="text-xs text-gray-500">Scan prescription</span>
                  </button>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileUpload} />

                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Or enter prescription text manually
                </label>
                <textarea
                  value={prescriptionText}
                  onChange={(e) => setPrescriptionText(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none"
                  placeholder="e.g., Tab Amoxicillin 500mg BD x 5 Days"
                />
                <Button onClick={() => handleAnalyze()} disabled={loading || !prescriptionText} className="mt-3 w-full">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : 'Analyze Prescription'}
                </Button>
              </Card>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
            </div>

            <div>
              {analysis ? (
                <PrescriptionResult analysis={analysis} simplified={simplifiedLanguage} />
              ) : (
                <Card>
                  <EmptyState
                    icon={<ScanLine className="w-6 h-6" />}
                    title="No Prescription Analyzed Yet"
                    description="Upload, scan, or enter your prescription text to get a clear explanation of your medications."
                    action={<Button onClick={() => handleAnalyze()} disabled={loading}>Try Example Prescription</Button>}
                  />
                </Card>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {(history.length > 0 ? history : []).map((item) => (
              <Card key={item.id}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-navy">{item.medicines.map(m => m.name).join(', ')}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => setAnalysis(item)}
                    className="text-sm text-navy font-medium hover:underline"
                  >
                    View Details
                  </button>
                </div>
                <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">{item.rawText}</p>
              </Card>
            ))}
            {history.length === 0 && (
              <Card>
                <EmptyState
                  icon={<History className="w-6 h-6" />}
                  title="No Prescription History"
                  description="Your analyzed prescriptions will appear here."
                />
              </Card>
            )}
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="space-y-3 max-w-lg">
            {mockReminders.map((reminder) => (
              <Card key={reminder.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${reminder.enabled ? 'bg-accent' : 'bg-gray-100'}`}>
                      <Bell className={`w-5 h-5 ${reminder.enabled ? 'text-navy' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-navy">{reminder.medicineName}</p>
                      <p className="text-sm text-gray-500">{reminder.dosage} · {reminder.time} · {reminder.frequency}</p>
                    </div>
                  </div>
                  <span className={`w-9 h-5 rounded-full ${reminder.enabled ? 'bg-navy' : 'bg-gray-200'} relative`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${reminder.enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'records' && (
          <div className="space-y-3">
            {mockRecords.map((record) => (
              <Card key={record.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-accent text-navy text-xs font-medium rounded capitalize">{record.type}</span>
                      <span className="text-xs text-gray-500">{record.date}</span>
                    </div>
                    <p className="font-medium text-navy mt-1">{record.title}</p>
                    <p className="text-sm text-gray-500">{record.provider}</p>
                    <p className="text-sm text-gray-600 mt-1">{record.summary}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
